// React
import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

// Atoms
import { AmountText } from '../../atoms/text/AmountText'

// Styles
import { ForegroundColor, BackgroundColor } from '../../../styles/color'
import { ButtonShadow } from '../../../styles/shadow'

const PlanList = styled.div`
  position: relative;
  width: 100%;
  max-width: 480px;
  background: ${BackgroundColor.secondary};
  padding: 1rem 1.5rem;
  border-radius: 0.2rem;
  box-shadow: ${ButtonShadow};

  display: grid;
  grid-template-columns: auto auto 15px;
  grid-row-gap: 0.3rem;
  align-items: flex-end;
`

const LabelText = styled.p`
  grid-column: 1/1;

  font-size: ${({ isTotal }) => (isTotal ? 1.4 : 1)}rem;
  color: ${({ isTotal }) => (isTotal ? ForegroundColor.base : ForegroundColor.secondary)};
  line-height: ${({ isTotal }) => (isTotal ? 1.2 : 1.4)};
  padding-right: 0.5rem;
`
const PriceText = styled.p`
  grid-column: 2/2;
  justify-self: flex-end;

  font-size: 1rem;
  color: ${({ isTotal }) => (isTotal ? ForegroundColor.base : ForegroundColor.secondary)};
  line-height: ${({ isTotal }) => (isTotal ? 1 : 1.4)};
`
const IntervalText = styled.p`
  grid-column: 2/2;
  justify-self: flex-end;
  align-self: self-start;

  line-height: 1;
  font-size: 1rem;
  padding-bottom: 0.5rem;
  margin-top: -4px;
`

const PriceIntervalSeparator = styled.p`
  grid-column: 3/3;
  line-height: 1.4;
  justify-self: center;
  font-size: 1rem;
`
const Price = styled.sub`
  font-size: ${({ isTotal }) => (isTotal ? 2 : 1.2)}rem;
  color: ${({ isTotal }) => (isTotal ? ForegroundColor.accentInvert : ForegroundColor.secondary)};
  margin-right: 5px;
`

const ContentText = styled.p`
  grid-column: 1/1;

  font-size: 0.8rem;
  color: ${ForegroundColor.secondary};
  padding-bottom: 0.5rem;
`

const PriceInfoText = styled.p`
  grid-column: 1/4;

  font-size: 0.8rem;
  color: ${ForegroundColor.secondary};
  margin-top: 1rem;
`

const PlanItem = ({ item, isTotal, isFirst, isForeignCurrency }) => (
  <Fragment>
    <LabelText
      isTotal={isTotal}
      className={isTotal ? 'font-small-bold' : 'font-small-regular text-light'}
    >
      {item.label}
    </LabelText>

    <PriceText
      isTotal={isTotal}
      unit={item.unit}
      className={isTotal ? 'font-small-bold' : 'font-small-regular text-light'}
    >
      {item.unit === 'free' && item.price === 0 ? (
        item.unit
      ) : (
        <Fragment>
          <Price isTotal={isTotal}>
            <AmountText amount={item.price} currency={item.currency} />
          </Price>
        </Fragment>
      )}
    </PriceText>

    <PriceIntervalSeparator
      className={isTotal ? 'font-small-bold' : 'font-small-regular text-light'}
    >
      {isForeignCurrency ? '* ' : ''}
    </PriceIntervalSeparator>

    {!!item.contents?.length && <ContentText>{item.contents.join(', ')}</ContentText>}

    {!isTotal && (item.unit !== 'free' || item.price > 0) && (
      <IntervalText className={isTotal ? 'font-small-bold' : 'font-small-regular text-light'}>
        {item.unit}
      </IntervalText>
    )}
  </Fragment>
)

export const Plan = ({ plan, hasTotal = true }) => {
  const { t } = useTranslation()

  return (
    <PlanList>
      {plan.planSubscriptions.map((planItem, pI) => (
        <PlanItem key={`plan-item-${pI}`} item={planItem} isForeignCurrency={plan.exchangeRate} />
      ))}

      {hasTotal && <PlanItem item={plan.planTotal} isTotal isForeignCurrency={plan.exchangeRate} />}

      {plan.exchangeRate && (
        <PriceInfoText>
          {t('billing.exchangeRate.info')}
          <br />
          {plan.exchangeRate}
        </PriceInfoText>
      )}
    </PlanList>
  )
}
