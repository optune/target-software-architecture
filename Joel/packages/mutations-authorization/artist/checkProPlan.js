// Meteor
import { Meteor } from 'meteor/meteor'

// Model
import { BillingProduct, Billings } from 'meteor/optune:meteor-model'

export const checkProPlan = ({ artist }) => {
  if (Meteor.isServer) {
    const billing = Billings.findOne({ groupId: artist._id })

    if (
      !billing ||
      !billing.products.find(
        (product) => product === BillingProduct.ARTIST_OPTUNE_PROFESSIONAL
      )
    ) {
      throw new Meteor.Error(
        'Artists.notInProPlan',
        `The OpTuNE Pro Plan is required to use this feature, but none could be found for the artist ${artist.name}.`
      )
    }
  }

  return true
}
