// Meteor
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

// Constants
import { ExtendedArtistType } from '../../../constants/ArtistType'
import { AttachmentCategory } from '../../../constants/AttachmentCategory'

// Sub Schemas
import Attachment from '../../../schemas/subschemas/Attachment'

export const schema = new SimpleSchema({
  name: {
    type: String,
  },

  types: {
    type: [String],
    defaultValue: [],
    allowedValues: Object.values(ExtendedArtistType),
  },

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

  description: {
    type: String,
    optional: true,
  },

  musicLabel: {
    type: String,
    optional: true,
  },

  genres: {
    type: [String],
    optional: true,
  },
})
