// Meteor imports
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

// Constants
import ArtistRole from '../../../constants/ArtistRole'
import CollaboratorRight from '../../../constants/rights/CollaboratorRight'

export const schema = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
  },
  canSeeDeal: {
    type: Boolean,
    defaultValue: true,
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
    optional: true,
  },
  personalMessage: {
    type: String,
    optional: true,
  },
  right: {
    type: String,
    allowedValues: [CollaboratorRight.MANAGER, CollaboratorRight.READONLY],
    defaultValue: CollaboratorRight.MANAGER,
  },
  role: {
    type: String,
    defaultValue: ArtistRole.MEMBER,
    allowedValues: Object.values(ArtistRole),
  },
})
