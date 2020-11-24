// Meteor
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

// Subschemas
import Connection from '../../../schemas/subschemas/Connection'
import UserRelation from '../../../schemas/subschemas/UserRelation'

// Transformation schemas
import { ArtistAttachmentsSchema } from '../ArtistAttachments/index'
import { ArtistDetailsSchema } from '../ArtistDetails/index'
import { ArtistLinksSchema } from '../ArtistLinks/index'
import { ArtistSettingsSchema } from '../ArtistSettings/index'
import { AgencyArtistSettingsSchema } from '../AgencyArtistSettings/index'

export const schema = new SimpleSchema([
  {
    // Identification
    _id: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    },

    slug: {
      type: String,
      optional: true,
    },

    // Integrations
    connections: {
      type: [Connection],
      optional: true,
    },

    // Specifications
    biography: {
      type: String,
      optional: true,
    },

    techRider: {
      type: String,
      optional: true,
    },

    hospitalityRider: {
      type: String,
      optional: true,
    },
  },

  // Artist attachments, details & links
  ArtistAttachmentsSchema,
  ArtistDetailsSchema,
  ArtistLinksSchema,

  // Artist settings for artist and agency
  ArtistSettingsSchema,
  AgencyArtistSettingsSchema,

  {
    // User relation & test flag
    users: {
      type: [UserRelation],
      optional: true,
    },

    isTestData: {
      type: Boolean,
      defaultValue: false,
      optional: true,
    },
  },
])
