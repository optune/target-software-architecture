import React from 'react'
import { CardNumberElement } from '@stripe/react-stripe-js'

import { CardElement, CardStyle } from './CardElementStyle'

export const CardNumberInput = () => (
  <CardElement>
    <CardNumberElement className="card-input-field" style={CardStyle} />
  </CardElement>
)
