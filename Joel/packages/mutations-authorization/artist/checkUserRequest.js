// Meteor
import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'

// Model
import {
  // Constants
  GroupStatus,
  Role,
  UserAccountRole,

  // Collection
  Artists,

  // Utils
  getArtistRights,
} from 'meteor/optune:meteor-model'

// Error
import { throwNotFound } from '../Errors'

// Utils
import { checkProPlan } from './checkProPlan'

export const checkUserRequest = (
  { artistId, userId },
  options = {
    allowAdminOnly: false,
    checkArtistUserOnly: false,
    checkProPlanRequired: false,
  }
) => {
  const { allowAdminOnly, checkArtistUserOnly, checkProPlanRequired } = options

  let member = {}
  const isManager = Roles.userIsInRole(userId, [
    UserAccountRole.MANAGER,
    UserAccountRole.ADMIN,
  ])
  const isPromoter = Roles.userIsInRole(userId, UserAccountRole.PROMOTER)
  const isCollaborator = Roles.userIsInRole(
    userId,
    UserAccountRole.COLLABORATOR
  )

  const noCheck =
    checkArtistUserOnly && (isManager || isPromoter || isCollaborator)

  if (!noCheck) {
    /*
     * Get and check artist from user relation
     */

    const artistQuery = artistId ? { _id: artistId } : {}
    artistQuery.users = {
      $elemMatch: {
        userId,
        role: { $in: [Role.OWNER, Role.MANAGER, Role.MEMBER] },
      },
    }

    const artist = Artists.findOne(artistQuery)

    if (!artist) {
      throwNotFound('Artists', artistId)
    }

    if (artist.status === GroupStatus.CLOSED) {
      throw new Meteor.Error(
        'Artists.AccountClosed',
        `The account of the artist ${artist.name} has been closed.`
      )
    }

    /*
     * Check pro plan (artist only)
     */

    if (!isManager && checkProPlanRequired) {
      checkProPlan({ artist })
    }

    /*
     * Check artist member rights
     */

    const memberRights = getArtistRights({
      allowAdminOnly,
      members: artist.members,
      userId,
    })

    if (!isManager && memberRights.memberReadonly) {
      throw new Meteor.Error(
        'Artists.memberReadonly',
        `You do not have edit rights for the artist ${artist.name}`
      )
    }

    member = { artist, memberDealHidden: memberRights.memberDealHidden }
  }

  return member
}
