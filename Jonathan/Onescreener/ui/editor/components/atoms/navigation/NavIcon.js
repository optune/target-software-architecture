import React from 'react'
import { Link } from '@reach/router'

import { AddIcon, ColorHarlequin, ColorWhite, ColorHaiti } from '@optune/react-base-components'

import styled from 'styled-components'

const NavButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-decoration: none;
  margin: 0;
  padding: 0;
  font-size: 28px;
  height: 40px;
  width: 40px;
  background-color: ${ColorHarlequin};
  border: 0px solid black;
  border-radius: 50%;
  opacity: 1;
  cursor: pointer;
  box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.75);
  transition: background-color 0.3s ease-out;

  &:hover {
    cursor: pointer;
    background-color: ${ColorHaiti};

    & svg {
      & path,
      line,
      circle,
      polygon,
      polyline,
      rect,
      ellipse {
        fill: ${ColorHarlequin};
        stroke: ${ColorHarlequin};

        &[fill='none'] {
          fill: none;
        }
        &[stroke='none'] {
          stroke: none;
        }
      }
    }
  }
`

export const NavIcon = ({ href }) => (
  <NavButton to={href}>
    <AddIcon className="small white" />
  </NavButton>
)
