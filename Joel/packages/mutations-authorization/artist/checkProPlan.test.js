/* eslint-env mocha */

import { assert } from 'chai'

// Meteor
import { resetDatabase } from 'meteor/xolvio:cleaner'
import { Random } from 'meteor/random'

// Model
import {
  BillingProduct,
  BillingServiceType,
  BillingPlanUpdateStatus,
  Billings,
} from 'meteor/optune:meteor-model'

import { checkProPlan } from './checkProPlan'

import getTestNameFromFilepath from '../../test/utils/getTestNameFromFilepath'

const filename = getTestNameFromFilepath(__filename)

const artistIdProPlan = Random.id()
const artistIdStarterPlan = Random.id()

describe(`${filename}`, () => {
  before(() => resetDatabase(null))

  before(() => {
    Billings.insert({
      groupId: artistIdProPlan,
      products: [
        BillingProduct.ARTIST_OPTUNE_PROFESSIONAL,
        BillingProduct.ARTIST_ONESCREENER_TRIAL,
      ],
      serviceType: BillingServiceType.STRIPE_ARTIST,
      planUpdatedBy: Random.id(),
      planUpdateStatus: BillingPlanUpdateStatus.PLAN_UPDATED,
    })

    Billings.insert({
      groupId: artistIdProPlan,
      products: [BillingProduct.ARTIST_OPTUNE_STARTER],
      serviceType: BillingServiceType.STRIPE_ARTIST,
      planUpdatedBy: Random.id(),
      planUpdateStatus: BillingPlanUpdateStatus.CREDIT_CARD_UPDATED,
    })
  })

  it('check artist with pro plan', () => {
    assert.isTrue(checkProPlan({ artist: { _id: artistIdProPlan } }))
  })

  it('check artist without pro plan', () => {
    assert.throws(
      () =>
        checkProPlan({
          artist: { _id: artistIdStarterPlan, name: 'Test Artist Starter' },
        }),
      /Artists.notInProPlan/
    )
  })

  it('check artist without billing', () => {
    assert.throws(
      () =>
        checkProPlan({
          artist: { _id: Random.id(), name: 'Test Artist Starter' },
        }),
      /Artists.notInProPlan/
    )
  })
})
