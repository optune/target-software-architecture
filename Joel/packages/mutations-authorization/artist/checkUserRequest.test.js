/* eslint-env mocha */

import { assert } from 'chai'

// Meteor
import { resetDatabase } from 'meteor/xolvio:cleaner'
import { Random } from 'meteor/random'

// Model
import {
  BillingProduct,
  BillingServiceType,
  Billings,
  Artists,
} from 'meteor/optune:meteor-model'

import { checkUserRequest } from './checkUserRequest'

// Test
import ArtistTests from '../../test/ArtistTests.test'
import getTestNameFromFilepath from '../../test/utils/getTestNameFromFilepath'

const filename = getTestNameFromFilepath(__filename)

let artistId

let artistUsersProPlan
let artistIdProPlan
let artistUsersStarterPlan
let artistIdStarterPlan

describe(`${filename}`, () => {
  before(() => resetDatabase(null))

  before(() => {
    artistUsersProPlan = ArtistTests.createArtistUsers({})
    let artists = ArtistTests.createArtist({
      artistUsers: artistUsersProPlan,
      prefix: 'Pro',
      withMembers: true,
      withProPlan: true,
    })
    artistIdProPlan = artists.artistId

    artistUsersStarterPlan = ArtistTests.createArtistUsers({})
    artists = ArtistTests.createArtist({
      artistUsers: artistUsersStarterPlan,
      prefix: 'Starter',
      withMembers: true,
      withProPlan: false,
    })
    artistIdStarterPlan = artists.artistId
  })

  describe('artist in pro plan', () => {
    it('check artist owner', () => {
      const data = checkUserRequest(
        {
          artistId: artistIdProPlan,
          userId: artistUsersProPlan.artistUserId,
        },
        { checkProPlanRequired: true }
      )

      assert.ok(data.artist)
      assert.isFalse(data.memberDealHidden)
    })

    it('check artist member', () => {
      const data = checkUserRequest(
        {
          artistId: artistIdProPlan,
          userId: artistUsersProPlan.artistMemberUserId,
        },
        { checkProPlanRequired: true }
      )

      assert.ok(data.artist)
      assert.isTrue(data.memberDealHidden)
    })

    it('check artist member readonly', () => {
      assert.throws(
        () =>
          checkUserRequest(
            {
              artistId: artistIdProPlan,
              userId: artistUsersProPlan.artistMemberReadonlyUserId,
            },
            { checkProPlanRequired: true }
          ),
        /Artists.memberReadonly/
      )
    })
  })

  describe('artist in starter plan', () => {
    it('check artist owner', () => {
      assert.throws(
        () =>
          checkUserRequest(
            {
              artistId: artistIdStarterPlan,
              userId: artistUsersStarterPlan.artistUserId,
            },
            { checkProPlanRequired: true }
          ),
        /Artists.notInProPlan/
      )
    })

    it('check artist member', () => {
      assert.throws(
        () =>
          checkUserRequest(
            {
              artistId: artistIdStarterPlan,
              userId: artistUsersStarterPlan.artistMemberUserId,
            },
            { checkProPlanRequired: true }
          ),
        /Artists.notInProPlan/
      )
    })

    it('check artist member readonly', () => {
      assert.throws(
        () =>
          checkUserRequest(
            {
              artistId: artistIdStarterPlan,
              userId: artistUsersStarterPlan.artistMemberReadonlyUserId,
            },
            { checkProPlanRequired: true }
          ),
        /Artists.notInProPlan/
      )
    })
  })

  describe('allow admin only', () => {
    it('check artist owner', () => {
      const data = checkUserRequest(
        {
          artistId,
          userId: artistUsersStarterPlan.artistUserId,
        },
        { allowAdminOnly: true }
      )

      assert.ok(data.artist)
      assert.isFalse(data.memberDealHidden)
    })

    it('check artist member', () => {
      assert.throws(
        () =>
          checkUserRequest(
            {
              artistId,
              userId: artistUsersStarterPlan.artistMemberUserId,
            },
            { allowAdminOnly: true }
          ),
        /Artists.memberReadonly/
      )
    })

    it('check artist member readonly', () => {
      assert.throws(
        () =>
          checkUserRequest(
            {
              artistId,
              userId: artistUsersStarterPlan.artistMemberReadonlyUserId,
            },
            { allowAdminOnly: true }
          ),
        /Artists.memberReadonly/
      )
    })
  })

  describe('as manager', () => {
    it('check artist users only', () => {
      const data = checkUserRequest(
        {
          artistId,
          userId: artistUsersStarterPlan.managerUserId,
        },
        { checkArtistUserOnly: true }
      )

      assert.deepEqual(data, {})
    })

    it('check all', () => {
      const data = checkUserRequest({
        artistId,
        userId: artistUsersStarterPlan.managerUserId,
      })

      assert.ok(data.artist)
      assert.isFalse(data.memberDealHidden)
    })
  })

  it('check readonly artist member with deal hidden', () => {
    assert.throws(() =>
      checkUserRequest(
        { userId: artistUsersStarterPlan.artistMemberReadonlyUserId },
        /Artists.memberReadonly/
      )
    )
  })

  it('check no artist', () => {
    assert.throws(
      () =>
        checkUserRequest({
          artistId: Random.id(),
          userId: artistUsersStarterPlan.artistUserId,
        }),
      /Artists.NotFound/
    )
  })
})
