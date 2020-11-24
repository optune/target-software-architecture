// React
import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

// Atoms
import { AmountText } from '../../atoms/text/AmountText'
import { InfoText } from '../../atoms/text/InfoText'

// Styles
import { ForegroundColor, ColorSecondary10 } from '../../../styles/color'

const ContainerPlanHeader = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 24px;
  margin-left: auto;
  margin-right: auto;
`

const StyledPlanProduct = styled.p`
  text-align: center;
  font-size: 24px;
`

const StyledPlanInfoText = styled(InfoText)`
  margin-top: 14px;
  margin-bottom: ${({ marginBottom }) => marginBottom || '58px'};
  color: ${ColorSecondary10};
  font-size: 16px;
  line-height: 140%;
`

export const PlanHeader = ({ plan, isSelection, infoText, marginBottom }) => {
  const { t } = useTranslation()

  return (
    <ContainerPlanHeader>
      <StyledPlanProduct className={'font-small-bold'}>
        {plan.type?.toUpperCase() || isSelection
          ? plan?.product?.toUpperCase()
          : `Your ${plan?.product?.toUpperCase()} subscription`}
      </StyledPlanProduct>

      {infoText && (
        <StyledPlanInfoText marginBottom={marginBottom}>{t(infoText)}</StyledPlanInfoText>
      )}
    </ContainerPlanHeader>
  )
}
