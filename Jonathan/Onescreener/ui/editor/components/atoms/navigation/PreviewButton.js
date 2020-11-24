import React from 'react'
import styled, { keyframes, css } from 'styled-components'

// Styles
import { ForegroundColor, ColorSecondary10, ColorHarlequin } from '../../../styles/color'

import { NotMediaSmall } from '@optune/onescreener-base-components'

// Icons
import { PreviewIcon } from '../../atoms/icons/navigation/Preview'

function blinkingEffect() {
  return keyframes`
  to {
    stroke-dashoffset: 0;
  }`
  // return keyframes`
  //   50% {
  //     opacity: 0;
  //   }
  // `
}

const Button = styled.a`
  display: flex;
  flex-flow: column;
  align-items: center;
  /* vertical compensation for other buttons */
  margin: 0px 0px;
  color: ${ColorSecondary10};
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease-out;
  font-size: 13px;

  ${({ isBlinking }) =>
    isBlinking &&
    css`
      stroke-dasharray: 1000;
      stroke-dashoffset: 1000;
      animation: ${blinkingEffect} 5s linear alternate infinite;
      color: ${ColorHarlequin};
    `};

  & svg.icon {
    & * {
      fill: none;
      stroke-dasharray: 200;
      stroke: ${({ isBlinking }) => (isBlinking ? ColorHarlequin : ColorSecondary10)};
    }
  }

  &:hover {
    color: ${ForegroundColor.hover};
    & svg.icon {
      & * {
        stroke: ${ForegroundColor.hover};
      }
    }
  }

  @media ${NotMediaSmall} {
    display: none;
  }
`

const Preview = styled(PreviewIcon)`
  margin: 0 auto;
  padding: 0;
  height: 26px;
  width: 27px;
`

export const PreviewButton = ({ onShowPreview, buttonText, isBlinking }) => (
  <Button type="button" onClick={onShowPreview} isBlinking={isBlinking}>
    <Preview className="light" />
    {buttonText}
  </Button>
)
