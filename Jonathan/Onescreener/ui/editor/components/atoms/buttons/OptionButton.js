// React
import styled, { css } from 'styled-components'

// Styles
import { ForegroundColor, BackgroundColor } from '../../../styles/color'

// Atoms
import { Button } from './Button'

export const OptionButton = styled(Button)`
  margin: 0 0.5rem;
  line-height: 1;
  width: 40px;
  height: 40px;
  border-width: 2px;
  border-style: ${({ selected }) => (selected ? 'solid' : 'none')};
  border-color: ${({ selected }) => {
    selected && ForegroundColor.hover
  }};

  &:hover {
    ${({ selected }) =>
      !selected &&
      css`
        border: 2px solid ${ForegroundColor.hover};
        background-color: ${BackgroundColor.secondary};
        color: ${ForegroundColor.hover};
      `}
  }
`
