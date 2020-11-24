// React
import styled from 'styled-components'

// Styles
import { BackgroundColor, ForegroundColor } from '../../../styles/color'

// Atoms
import { Button } from './Button'

export const UpgradeButton = styled(Button)`
  padding: 1rem 2rem;
  margin: 1rem auto;
  color: ${ForegroundColor.primary};
  background-color: ${BackgroundColor.primary};
  cursor: pointer;

  &[disabled] {
    color: ${BackgroundColor.disabled};
    background-color: ${ForegroundColor.disabled};
  }
`
