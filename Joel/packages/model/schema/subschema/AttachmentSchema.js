// Meteor imports
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

// Constants
import { AttachmentCategory } from '../../constants/AttachmentCategory'

// Attachment schema definition
export const AttachmentDefinition = (allowedValues = [AttachmentCategory.OTHER]) => ({
  // Mandatory fields
  category: {
    type: String,
    defaultValue: AttachmentCategory.OTHER,
    allowedValues,
  },

  file: {
    type: Object,
    blackbox: true,
  },

  // Optional fields
  tags: {
    type: [String],
    optional: true,
  },
})

// Attachment Factory to provide Attachment subschema with custom
// validation rules (allowedValues)
const Attachment = {
  schema: allowedValues => new SimpleSchema(AttachmentDefinition(allowedValues)),
}

export default Attachment
