import React from 'react'
import { CardCVCElement } from '@stripe/react-stripe-js'

import { CardElement, CardStyle } from './CardElementStyle'

export const CardCVCInput = () => (
  <CardElement>
    <CardCVCElement className="card-input-field" style={CardStyle} />
  </CardElement>
)
