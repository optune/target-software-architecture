import React from 'react'

// Stripe
import { CardElement as StripeCardElement } from '@stripe/react-stripe-js'

import { CardElement, CardStyle } from './CardElementStyle'

export const CardInput = () => (
  <CardElement label="Card details">
    <StripeCardElement
      className="card-input-field"
      options={{
        style: CardStyle,
        hidePostalCode: true,
      }}
    />
  </CardElement>
)
