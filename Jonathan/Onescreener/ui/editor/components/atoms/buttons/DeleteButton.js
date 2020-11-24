import React, { Fragment } from 'react'
import styled from 'styled-components'

// Styles
import { BackgroundColor, ForegroundColor } from '../../../styles/color'

// Components
import { NotMediaSmall } from '@optune/react-base-components'

// Icons
import { TrashIcon } from '../icons/control/Trash'

export const ButtonHeight = 32

const Delete = styled.button`
  width: ${ButtonHeight}px;
  height: ${ButtonHeight}px;
  background-color: rgba(${BackgroundColor.secondaryRGB}, 1);
  border-radius: 50%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.11);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin: 0 0.5rem;

  @media ${NotMediaSmall} {
    &:hover {
      color: ${ForegroundColor.hover};
      background-color: rgba(${BackgroundColor.hoverRGB}, 1);
      font-weight: 600;

      & svg {
        & * {
          fill: ${ForegroundColor.hover};
          stroke: ${ForegroundColor.hover};
          &[fill='none'] {
            fill: none;
          }
        }
      }
    }
  }

  display: flex;
  justify-content: center;
  align-items: center;
`

const Icon = styled(TrashIcon)`
  width: 1.2rem;
  height: 1.2rem;
`

export const DeleteButton = ({ onDelete, hidden, title }) => (
  <Delete onClick={onDelete} hidden={hidden} title={title}>
    <Icon />
  </Delete>
)
