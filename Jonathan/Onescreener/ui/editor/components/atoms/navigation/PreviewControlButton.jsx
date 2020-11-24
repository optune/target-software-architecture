import React from 'react'
import styled, { css } from 'styled-components'

// Styles
import { BackgroundColor, ForegroundColor } from '../../../styles/color'

const ControlButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px 20px;
  margin: 0;
  width: 80px;
  height: 60px;
  background-color: ${BackgroundColor.secondary};
  color: ${({ isSelected }) =>
    isSelected ? ForegroundColor.accentInvert : ForegroundColor.secondary};
  transition: color 0.5s, background-color 0.3s;

  & svg.icon {
    & * {
      fill: ${({ isSelected }) =>
        isSelected ? ForegroundColor.accentInvert : ForegroundColor.secondary};
      stroke: ${({ isSelected }) =>
        isSelected ? ForegroundColor.accentInvert : ForegroundColor.secondary};
      &[fill='none'] {
        fill: none;
      }
    }
  }

  &:hover {
    ${({ selected }) =>
      !selected &&
      css`
        background-color: ${BackgroundColor.hover};
        color: ${ForegroundColor.hover};

        & svg.icon {
          & * {
            fill: ${ForegroundColor.hover};
            stroke: ${ForegroundColor.hover};
            &[fill='none'] {
              fill: none;
            }
          }
        }
      `}
  }
`

export const PreviewControlButton = ({ Icon, label, isSelected, onClick }) => (
  <ControlButton type="button" onClick={onClick} isSelected={isSelected}>
    <Icon className="interactive" />
    {label}
  </ControlButton>
)
