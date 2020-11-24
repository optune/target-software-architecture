import React from 'react'
import { CardExpiryElement } from '@stripe/react-stripe-js'

import { CardElement, CardStyle } from './CardElementStyle'

export const CardExpiryInput = () => (
  <CardElement>
    <CardExpiryElement className="card-input-field" style={CardStyle} />
  </CardElement>
)
