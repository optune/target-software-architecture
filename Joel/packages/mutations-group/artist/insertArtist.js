/* eslint-disable no-undef */

// Meteor
import { Meteor } from 'meteor/meteor'
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { ValidatedMethod } from 'meteor/mdg:validated-method'

// Model
import {
  // Constants
  InvitationStatus,
  Role,
  // Collections
  Artists,
  ArtistGroups,
  // Utils
  getAttachments,
} from 'meteor/optune:meteor-model'

// Server Actions
import {
  removeAttachments,
  updateArtistGenres,
  updateCustomer,
  updateDocumentHistory,
} from 'meteor/optune:meteor-server-library'

// Error
import { checkUserRequest } from '../utils/Artist/checkUserRequest'
import { throwNotAllowed } from '../utils/Errors'

// @method Artist.update update fields of an existing artist
// @param { String } artistId the id of the artist to be modified
// @param { Artist } doc document containing the fields to be modified only (modifier)
export const updateArtist = new ValidatedMethod({
  name: 'Artist.update',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'Artist.update.accessDenied',
    message: 'Access Denied. You must be logged in to update artists',
    reason: 'Missing user login',
  },

  validate({ artistId, doc }) {
    // Validate the arguments to be a valid id
    new SimpleSchema({
      artistId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
      },
    }).validate({ artistId })

    const artistModifier = { $set: doc }
    Artists.simpleSchema().clean(artistModifier, { isModifier: true })
    Artists.simpleSchema().validate(artistModifier, { modifier: true })
  },

  run({ artistId, doc }) {
    // Get artist
    const { artist } = checkUserRequest(
      {
        artistId,
        userId: this.userId,
      },
      { allowAdminOnly: true }
    )

    const hasOwner = artist.users.find((u) => u.role === Role.OWNER)
    const user = artist.users.find((u) => u.userId === this.userId)

    // If no owner exists, viewers (booker and promoters) are allowed to update the artist
    if (hasOwner && user.role === Role.VIEWER) {
      throwNotAllowed(this.name, user.role, 'Artists', artistId)
    }
    if (
      user.role !== Role.VERIFIER &&
      (doc.verifiedBy !== undefined || doc.verifiedAt !== undefined)
    ) {
      throwNotAllowed(this.name, user.role, 'Artists', artistId)
    }

    if (hasOwner && user.role === Role.MANAGER) {
      const agency = ArtistGroups.findOne({
        'artists._id': artistId,
        'users.userId': this.userId,
      })

      if (
        !agency ||
        agency.artists.findIndex(
          (a) => a._id === artistId && a.status === InvitationStatus.ACCEPTED
        ) === -1
      ) {
        throw new Meteor.Error(
          `${this.name}.notInAcceptedState`,
          `Action not allowed. The owner of the artist (${artist._id}) has not
            yet accepted the invitation for the agency (${
              agency ? agency._id : 'undefined'
            }).`
        )
      }
    }

    /*
     * Set Modifier
     */
    const values = {
      ...doc,
      attachments: getAttachments(doc.attachments),
    }
    delete values.users
    delete values.members

    // Settings (only for artist)
    const isOwner = artist.users.find(
      (u) =>
        u.userId === this.userId && [Role.OWNER, Role.MEMBER].includes(u.role)
    )
    if (!isOwner) {
      delete values.settings
    }

    const isManager = artist.users.find(
      (u) => u.userId === this.userId && u.role === Role.MANAGER
    )
    if (!isManager) {
      delete values.managerSettings
    }

    const artistModifier = { $set: {}, $unset: {} }
    Object.keys(values).forEach((key) => {
      if (values[key] === null) {
        artistModifier.$unset[key] = ''
      } else {
        artistModifier.$set[key] = values[key]
      }
    })

    // Set slug to initial value (no update)
    artistModifier.$set.slug = artist.slug

    // Update artist
    Artists.update({ _id: artistId }, artistModifier)

    if (this.unblock) this.unblock()

    /*
     * Server-side only
     */

    if (!this.isSimulation) {
      const billingChanged =
        (doc.name && doc.name !== artist.name) ||
        (doc.email && doc.email !== artist.email)

      // Billing
      if (billingChanged) {
        const newArtist = Artists.findOne({ _id: artistId })

        updateCustomer({ group: artist, userId: this.userId }).catch(
          (error) => {
            console.error(error)
          }
        )
      }

      // Update artist genres
      updateArtistGenres({ newArtist: values, oldArtist: artist })

      // Update History
      updateDocumentHistory({ artist })

      // Remove attachments
      removeAttachments({
        newAttachments: values.attachments,
        oldAttachments: artist.attachments,
      })
    }
  },
})
