import React from 'react'
import styled from 'styled-components'
import { InfoIcon, FontFamilyBold } from '@optune/react-base-components'

// STyles
import {
  ForegroundColor,
  BackgroundColor,
  ColorSecondary40,
  ColorSecondary10,
} from '../../../styles/color'

export const Text = styled.p`
  position: relative;
  color: ${({ warning }) => (warning ? ForegroundColor.error : ForegroundColor.secondary)};
  margin: 2px 14px;
  text-align: ${({ left }) => (left ? 'left' : 'center')};

  & b {
    font-family: ${FontFamilyBold};
    font-weight: bold;
  }

  & i {
    font-style: italic;
  }
`

export const SubMediumInfoText = styled.p`
  position: relative;
  color: ${({ warning }) => (warning ? ForegroundColor.error : ColorSecondary40)};
  font-size: 14px;
  font-weight: 500;
  margin: ${({ margin }) => margin || '2px 14px'};
  text-align: ${({ left }) => (left ? 'left' : 'center')};
  line-height: 120%;
`

export const TextLink = styled.a`
  color: ${ColorSecondary10};

  &:hover {
    color: ${ForegroundColor.hover};
  }
`

export const IconContainer = styled.a`
  position: relative;
  top: 6px;
  left: 10px;
`

export const InfoText = ({
  children,
  onInfo,
  className = 'font-medium-regular',
  left,
  warning,
}) => (
  <Text className={className} warning={warning} left={left}>
    {onInfo ? <TextLink onClick={onInfo}>{children}</TextLink> : children}
    {onInfo && (
      <IconContainer onClick={onInfo}>
        <InfoIcon className="normal interactive" />
      </IconContainer>
    )}
  </Text>
)
