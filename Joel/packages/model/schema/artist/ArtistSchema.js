// Meteor imports
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

// Constants
import Role from '../constants/Role'
import ArtistRole from '../constants/ArtistRole'

import { ArtistType, ExtendedArtistType } from '../constants/ArtistType'
import { AttachmentCategory } from '../constants/AttachmentCategory'
import { Currency } from '../constants/Currency'
import { GroupStatus } from '../constants/GroupStatus'
import { LinkCategory } from '../constants/LinkCategory'
import { InvitationStatus } from '../constants/InvitationStatus'

// Sub Schemas
import Attachment from './subschemas/Attachment'
import Connection from './subschemas/Connection'
import Link from './subschemas/Link'
import UserRelation from './subschemas/UserRelation'
import Collaborator from './subschemas/Collaborator'

// Artist schema definition
export const ArtistSchema = new SimpleSchema({
  // Mandatory fields
  name: {
    type: String,
  },

  status: {
    type: String,
    defaultValue: GroupStatus.ACTIVE,
    allowedValues: Object.values(GroupStatus),
  },

  type: {
    type: String,
    defaultValue: ArtistType.UNKNOWN,
    allowedValues: Object.values(ArtistType),
  },

  extendedTypes: {
    type: Array,
    defaultValue: [],
  },
  'extendedTypes.$': {
    type: String,
    allowedValues: Object.values(ExtendedArtistType),
  },

  // Optional fields
  attachments: {
    type: [
      Attachment.schema([
        AttachmentCategory.BIOGRAPHY,
        AttachmentCategory.CONTRACT,
        AttachmentCategory.ITINARY,
        AttachmentCategory.HOSPITALITYRIDER,
        AttachmentCategory.OTHER,
        AttachmentCategory.PRESSPIC,
        AttachmentCategory.PRESSKIT,
        AttachmentCategory.TECHRIDER,
        AttachmentCategory.PROFILEPIC,
      ]),
    ],
    optional: true,
  },

  baseCurrency: {
    type: String,
    allowedValues: Object.values(Currency),
    optional: true,
  },

  connections: {
    type: [Connection],
    optional: true,
  },

  description: {
    type: String,
    optional: true,
    //max: 300,
  },

  biography: {
    type: String,
    optional: true,
  },

  links: {
    type: [
      Link.schema([
        LinkCategory.ONESCREENER,
        LinkCategory.OTHER,
        LinkCategory.SOCIALMEDIA,
        LinkCategory.SOUND,
        LinkCategory.WEBSITE,
      ]),
    ],
    optional: true,
  },

  minFee: {
    type: Number,
    optional: true,
    min: 0,
  },
  minFeeCurrency: {
    type: String,
    optional: true,
    autoValue() {
      if (!this.field('minFee').isSet) {
        this.unset()
      }
      return this.value
    },
    allowedValues: Object.values(Currency),
    custom() {
      let exception = undefined
      if (!this.isSet && this.field('minFee').isSet) {
        exception = 'expectedString'
      }
      return exception
    },
  },

  musicLabel: {
    type: String,
    optional: true,
  },

  residencies: {
    type: [Object],
    optional: true,
  },
  'residencies.$.venueId': {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  'residencies.$.private': {
    type: Boolean,
    optional: true,
    defaultValue: false,
  },

  socialSecurityNr: {
    type: String,
    optional: true,
    // REMARK: As the custom validation is dependend on the origin of the country,
    // this check will done on the application level in the Meteor.methods section.
  },

  genres: {
    type: [Object],
    optional: true,
  },
  'genres.$.name': {
    type: String,
  },
  'genres.$.experience': {
    type: Number,
    decimal: true,
    optional: true,
    defaultValue: 1.0,
    min: 0.0,
    max: 1.0,
  },

  techRider: {
    type: [Object],
    optional: true,
  },
  'techRider.$.item': {
    type: String,
  },
  'techRider.$.quantity': {
    type: Number,
    min: 1,
    defaultValue: 1,
  },

  hospitalityRider: {
    type: [Object],
    optional: true,
  },
  'hospitalityRider.$.item': {
    type: String,
  },
  'hospitalityRider.$.quantity': {
    type: Number,
    min: 1,
    defaultValue: 1,
  },

  manager: {
    type: Object,
    optional: true,
  },
  'manager.fee': {
    // Deprecated
    type: Number,
    min: 0,
    max: 100,
    decimal: true,
    optional: true,
  },

  managerSettings: {
    type: Object,
    optional: true,
  },
  'managerSettings.agencyCommission': {
    type: Number,
    min: 0,
    max: 100,
    decimal: true,
    optional: true,
  },
  'managerSettings.managerCommission': {
    type: Number,
    min: 0,
    max: 100,
    decimal: true,
    optional: true,
  },
  'managerSettings.otherCommission': {
    type: Number,
    min: 0,
    max: 100,
    decimal: true,
    optional: true,
  },
  'managerSettings.otherCommissionDescription': {
    type: String,
    optional: true,
  },
  'managerSettings.showAgencyCommissionToArtist': {
    type: Boolean,
    optional: true,
    defaultValue: true,
  },
  'managerSettings.artistCanEditBooking': {
    type: Boolean,
    optional: true,
    defaultValue: true,
  },
  'managerSettings.internalComment': {
    type: String,
    optional: true,
  },

  settings: {
    type: Object,
    optional: true,
  },
  'settings.showPrivateInfoToManager': {
    type: Boolean,
    optional: true,
    defaultValue: false,
    // should be false but due to compatibility issues with existing solution set to true.
  },
  'settings.publicProfile': {
    type: Boolean,
    optional: true,
    defaultValue: true,
  },
  'settings.booking': {
    type: Object,
    optional: true,
    defaultValue: {},
  },
  'settings.defaultBookingStatus': {
    type: String,
    optional: true,
  },
  'settings.defaultBookingIsPublished': {
    type: Boolean,
    optional: true,
    defaultValue: true,
  },

  members: {
    type: [
      Collaborator({
        allowedStatusValues: [
          InvitationStatus.INVITED_NEW,
          InvitationStatus.ACCEPTED,
          InvitationStatus.DECLINED,
        ],
        defaultStatusValue: InvitationStatus.INVITED_NEW,
        allowedRoleValues: Object.values(ArtistRole),
        defaultRoleValue: ArtistRole.MEMBER,
      }),
    ],
    optional: true,
  },

  // User Reference
  users: {
    type: [UserRelation],
    optional: true,
  },

  // Test Flags
  isTest: {
    type: Boolean,
    defaultValue: false,
    optional: true,
  },

  isTestData: {
    type: Boolean,
    defaultValue: false,
    optional: true,
  },
})
