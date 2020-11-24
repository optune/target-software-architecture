import React from 'react'
import styled from 'styled-components'

// Styles
import { ForegroundColor, ColorSecondary10 } from '../../../styles/color'

// Icons
import { SettingsIcon } from '../../atoms/icons/navigation/Settings'

const Button = styled.button`
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

  & svg.icon {
    & * {
      fill: none;
      stroke: ${ColorSecondary10};
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
`

const Settings = styled(SettingsIcon)`
  margin: 0 auto;
  padding: 0;
  height: 25px;
  width: 24px;
`

export const SettingsButton = ({ onClick, buttonText }) => (
  <Button type="button" onClick={onClick}>
    <Settings className="light" />
    {buttonText}
  </Button>
)
