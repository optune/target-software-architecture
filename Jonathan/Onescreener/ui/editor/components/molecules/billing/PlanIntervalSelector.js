// React
import React from 'react'
import styled, { keyframes } from 'styled-components'
import { useTranslation } from 'react-i18next'

// Styles
import { ForegroundColor, BackgroundColor, ColorSecondary40 } from '../../../styles/color'
import { FontFamilyBold } from '../../../styles/font'

// Atoms
import { AmountText } from '../../atoms/text/AmountText'

// Molecules
import { ButtonSelect } from '../forms/ButtonSelect'

/*
 * Styled components
 */

const ContainerSelectInterval = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  justify-content: center;
  margin-bottom: 15px;
`

const bounceAnimation = keyframes`
  0%   { transform: scale(1,1)      translateY(0); }
  2%  { transform: scale(1.05,.95) translateY(0); }
  6%  { transform: scale(.95,1.05) translateY(-5px); }
  10%  { transform: scale(1.02,.98) translateY(0); }
  12%  { transform: scale(1,1)      translateY(-2px); }
  14%  { transform: scale(1,1)      translateY(0); }
  100% { transform: scale(1,1)      translateY(0); }
`

const StyledSavingButton = styled.button`
  position: absolute;
  bottom: -32px;
  right: -28px;
  font-family: ${FontFamilyBold};
  font-size: 0.8rem;
  line-height: 1.1;
  padding: 0.5rem 2rem 0.3rem;
  width: auto;

  background-color: ${BackgroundColor.accent};
  color: ${ForegroundColor.accent};
  box-shadow: 6px 6px 0px rgba(39, 226, 0, 0.2);

  opacity: ${({ show }) => (show ? 1 : 0)};

  &:hover {
    background-color: ${BackgroundColor.hover};
  }

  z-index: 1000;
  transition: opacity 0.5s ease-out ${({ show }) => (show ? 3 : 0)}s, background-color 0.25s ease;
  animation: ${bounceAnimation} 8s ease infinite;
  animation-delay: 0.5s;
  transform-origin: bottom;
`
const StyledSavingText = styled.span`
  font-size: 16px;
  color: ${ColorSecondary40};
  margin: 12px 0 15px;
  text-align: center;
`

const formatSavings = ({ i18n, currency, planPreview }) =>
  Intl.NumberFormat(i18n.language, {
    style: 'currency',
    currency: currency || 'USD',
    minimumFractionDigits: planPreview?.savings === 0 ? 0 : 2,
    maximumFractionDigits: planPreview?.savings === 0 ? undefined : 2,
  }).format(planPreview?.savings)

const getSavingsText = (savings) => ({
  month: `Switch to yearly billing and save ${savings}`,
  year: `Billed yearly, ${savings} saved!`,
})

export const PlanIntervalSelector = ({
  className,
  disabled,
  value,
  onChange,
  planPreview,
  currency,
}) => {
  const { t, i18n } = useTranslation()

  const savings = formatSavings({ i18n, currency, planPreview })
  const savingText = getSavingsText(savings)[value]

  const intervalOptions = [
    {
      label: t('billing.plan.interval.options.monthly'),
      value: 'month',
    },
    {
      label: t('billing.plan.interval.options.yearly'),
      value: 'year',
    },
  ]

  return (
    <ContainerSelectInterval className={className}>
      <ButtonSelect
        name="interval"
        disabled={disabled}
        value={value}
        onChange={onChange}
        options={intervalOptions}
      />

      <StyledSavingText>{savingText}</StyledSavingText>

      {/* {!disabled && (
        <StyledSavingButton
          show={value === 'month' && !!planPreview}
          onClick={() => onChange('year')}
        >
          {t('billing.plan.interval.savingsYearly')}
          <br />
          {!!planPreview?.savings && (
            <StyledSavingAmount>
              <AmountText amount={planPreview?.savings} currency={currency} />
            </StyledSavingAmount>
          )}
        </StyledSavingButton>
      )} */}
    </ContainerSelectInterval>
  )
}
