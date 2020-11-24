import React from 'react'
import styled, { css } from 'styled-components'

// Styles
import { BackgroundColor, ForegroundColor, ColorSecondary90 } from '../../../styles/color'

// Components
import { NotMediaSmall } from '@optune/react-base-components'

// Icons
import { EditIcon } from '../icons/navigation/Edit'

export const ButtonHeight = 32

const Edit = styled.button`
  width: ${ButtonHeight}px;
  height: ${ButtonHeight}px;
  min-width: ${ButtonHeight}px;
  min-width: ${ButtonHeight}px;
  background-color: ${BackgroundColor.secondary};
  border-radius: 50%;
  border: 1px solid ${ColorSecondary90};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin: 0 0.5rem;

  & svg.icon {
    width: 1.2rem;
    height: 1.2rem;

    & * {
      fill: ${({ editIcon }) => (editIcon ? 'white' : ForegroundColor.secondary)};
      stroke: ${ForegroundColor.secondary};
      &[fill='none'] {
        fill: none;
      }
    }
  }
  @media ${NotMediaSmall} {
    ${({ editIcon }) =>
      css`
        &:hover {
          color: ${ForegroundColor.hover};
          background-color: ${BackgroundColor.hover};
          font-weight: 600;

          & svg.icon {
            & * {
              fill: ${ForegroundColor.hover};
              stroke: ${ForegroundColor.hover};
              &[fill='none'] {
                fill: none;
              }
            }
          }
        }
      `}
  }

  display: flex;
  justify-content: center;
  align-items: center;
`

export const EditButton = ({ onEdit, hidden, Icon, title, ...other }) => (
  <Edit onClick={onEdit} hidden={hidden} title={title} editIcon={!Icon} {...other}>
    {Icon ? <Icon /> : <EditIcon />}
  </Edit>
)
