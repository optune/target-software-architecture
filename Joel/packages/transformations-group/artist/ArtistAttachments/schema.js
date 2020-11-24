// Meteor
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

// Constants
import { AttachmentCategory } from '../../../constants/AttachmentCategory'

// Sub Schemas
import Attachment from '../../../schemas/subschemas/Attachment'

export const schema = new SimpleSchema({
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
  },
})
