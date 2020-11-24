// Meteor imports
import { Random } from 'meteor/random'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

// Constants
import { SharedContentCategory } from '../../constants/rights/SharedContentCategory'
import CollaboratorRight from '../../constants/rights/CollaboratorRight'
import NegotiationStatus from '../../constants/NegotiationStatus'
import InvitationStatus from '../../constants/InvitationStatus'

// Subschemas
import UserProfile from './UserProfile'

// User Relation schema definition
const CollaboratorSchemaWithRole = ({
  allowedStatusValues,
  defaultStatusValue,
  allowedRoleValues,
  defaultRoleValue,
}) => ({
  ...CollaboratorSchema({ allowedStatusValues, defaultStatusValue }),
  role: {
    type: String,
    defaultValue: defaultRoleValue,
    allowedValues: allowedRoleValues,
  },
})

const CollaboratorSchema = ({ allowedStatusValues, defaultStatusValue }) => ({
  // Mandatory fields
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoValue() {
      if (!this.isSet) this.value = Random.id()

      return this.value
    },
  },
  rights: {
    type: [Object],
    defaultValue: [],
  },
  'rights.$.category': {
    type: String,
    allowedValues: Object.values(SharedContentCategory),
  },
  'rights.$.right': {
    type: String,
    allowedValues: Object.values(CollaboratorRight),
    optional: true,
  },
  'rights.$.list': {
    type: [Object],
    optional: true,
  },
  'rights.$.list.$._id': {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },

  status: {
    type: String,
    defaultValue: defaultStatusValue,
    allowedValues: allowedStatusValues,
  },
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true, // Mandatory, but in case of a new invitation not known at the moment of creation
  },

  // Optional fields
  dueDate: {
    type: Date,
    optional: true,
  },

  invitation: {
    type: Object,
    optional: true,
  },

  'invitation.email': {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },

  'invitation.contactId': {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
  },

  'invitation.firstName': {
    type: String,
  },

  'invitation.lastName': {
    type: String,
    optional: true,
  },
  'invitation.groupName': {
    type: String,
    optional: true,
  },

  'invitation.personalMessage': {
    type: String,
    optional: true,
  },

  'invitation.secretLink': {
    type: String,
    optional: true,
  },

  addedAt: {
    type: Date,
  },
  addedBy: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  requestedAt: {
    type: Date,
    optional: true,
  },
  requestedBy: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
  },
  respondedAt: {
    type: Date,
    optional: true,
  },
  respondedBy: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
  },
})

export default ({ allowedStatusValues, defaultStatusValue, allowedRoleValues, defaultRoleValue }) =>
  new SimpleSchema(
    allowedRoleValues && defaultRoleValue
      ? CollaboratorSchemaWithRole({
          allowedStatusValues,
          defaultStatusValue,
          allowedRoleValues,
          defaultRoleValue,
        })
      : CollaboratorSchema({
          allowedStatusValues,
          defaultStatusValue,
        })
  )
