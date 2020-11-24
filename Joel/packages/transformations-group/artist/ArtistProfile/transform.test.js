/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-undef */

// Npm imports
import { assert } from 'chai'

import { LinkCategory } from '../../../constants/LinkCategory'

import { transform } from './transform'

import getTestNameFromFilepath from '../../../test/utils/getTestNameFromFilepath'

const filename = getTestNameFromFilepath(__filename)

describe(`${filename}`, () => {
  it('empty artist', () => {
    const doc = transform({
      artist: {
        something: 'test',
      },
    })

    assert.isDefined(doc)
    assert.isUndefined(doc.something)
    assert.isUndefined(doc.calendarPublicFeed)
    assert.isUndefined(doc.calendarPublicWebsite)
    assert.isUndefined(doc.managerFee)
    assert.isUndefined(doc.facebook)
    assert.isUndefined(doc.instagram)
    assert.isUndefined(doc.soundcloud)
    assert.isUndefined(doc.spotify)
    assert.isUndefined(doc.itunes)
    assert.isUndefined(doc.soundLink)
    assert.isUndefined(doc.website)
    assert.isUndefined(doc.otherLink)
    assert.isUndefined(doc.techRider)
    assert.isUndefined(doc.genres)
    assert.isUndefined(doc.hospitalityRider)
  })

  it('artist with values', () => {
    const doc = transform({
      artist: {
        something: 'test',
        name: 'Artist Test',
        slug: 'Artist-Test',
        managerSettings: {
          agencyCommission: 31,
          managerCommission: 32,
          otherCommission: 33,
          otherCommissionDescription: 'Test Other Commission',
          showAgencyCommissionToArtist: false,
          internalComment: 'Test Comment',
        },
        links: [
          {
            url: 'https://www.facebook.com/test',
            category: LinkCategory.SOCIALMEDIA,
            tags: ['facebook'],
          },
          {
            url: 'https://soundcloud.com/test',
            category: LinkCategory.SOUND,
            tags: ['soundcloud'],
          },
          {
            url: 'http://www.testdj.com',
            category: LinkCategory.WEBSITE,
          },
          {
            url: 'http://www.other.com',
            category: LinkCategory.OTHER,
          },
        ],
        techRider: [
          {
            item: '1x Mixer',
            quantity: 1,
          },
        ],
        hospitalityRider: [
          {
            item: 'Doppelzimmer mit Frühstück',
            quantity: 1,
          },
        ],
        genres: [{ name: 'Techno' }],
      },
    })

    assert.isDefined(doc)
    assert.isUndefined(doc.something)
    assert.equal(doc.name, 'Artist Test')
    assert.equal(doc.slug, 'Artist-Test')
    assert.equal(doc.managerSettingsAgencyCommission, 31)
    assert.equal(doc.managerSettingsManagerCommission, 32)
    assert.equal(doc.managerSettingsOtherCommission, 33)
    assert.equal(doc.managerSettingsOtherCommissionDescription, 'Test Other Commission')
    assert.isNotTrue(doc.managerSettingsShowAgencyCommissionToArtist)
    assert.isTrue(doc.managerSettingsArtistCanEditBooking)
    assert.equal(doc.managerSettingsInternalComment, 'Test Comment')
    assert.equal(doc.facebook, 'https://www.facebook.com/test')
    assert.equal(doc.soundcloud, 'https://soundcloud.com/test')
    assert.equal(doc.website, 'http://www.testdj.com')
    assert.equal(doc.otherLink, 'http://www.other.com')
    assert.equal(doc.techRider, '1x Mixer')
    assert.equal(doc.hospitalityRider, 'Doppelzimmer mit Frühstück')
    assert.equal(doc.genres, ['Techno'])
    assert.isUndefined(doc.instagram)
    assert.isUndefined(doc.soundLink)
    assert.lengthOf(doc.attachments, 0)
  })
})
