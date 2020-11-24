// Meteor imports
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

// Constants
import { LinkCategory } from '../../constants/LinkCategory'

// Utils
import adjustUrl from '../../utils/adjustUrl'

// Link schema definition
export const LinkDefinition = (allowedValues = [LinkCategory.OTHER]) => ({
  // Mandatory fields
  category: {
    type: String,
    defaultValue: LinkCategory.OTHER,
    allowedValues,
  },

  url: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    autoValue() {
      return adjustUrl(this.value)
    },
  },

  // Optional fields
  tags: {
    type: [String],
    optional: true,
  },
})

// Link Factory to provide Link subschema with custom
// validation rules (allowedValues)
const Link = {
  schema: allowedValues => new SimpleSchema(LinkDefinition(allowedValues)),
}

export default Link
