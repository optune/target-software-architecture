import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { Text } from './InfoText'

import { ColorHarlequin, ColorWhite } from '../../../styles/color'

const Label = styled.div`
  background-color: ${ColorHarlequin};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 13px;
  transform: rotate(-90deg);
`

const StyledText = styled(Text)`
  font-size: 16px;
  color: ${ColorWhite};
  text-transform: uppercase;
  font-size: 9px;
  font-weight: bold;
  margin: 0;
  padding: 0;
`

export const ProLabel = () => {
  const { t } = useTranslation()

  return (
    <Label>
      <StyledText>{t('edit.proLabel')}</StyledText>
    </Label>
  )
}
