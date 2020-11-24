import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

const StyledText = styled.span`
  font-feature-settings: 'tnum' on, 'lnum' on, 'zero' on;
`

export const AmountText = ({ className, amount, currency }) => {
  const { i18n } = useTranslation()
  return (
    <StyledText className={className}>
      {Intl.NumberFormat(i18n.language, {
        style: 'currency',
        currency: currency || 'USD',
        minimumFractionDigits: amount === 0 ? 0 : 2,
        maximumFractionDigits: amount === 0 ? undefined : 2,
      }).format(amount)}
    </StyledText>
  )
}

AmountText.propTypes = {
  amount: PropTypes.number,
  className: PropTypes.string,
  currency: PropTypes.string,
}
