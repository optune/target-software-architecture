import styled, { css } from 'styled-components'

import { Button } from '../buttons/Button'
import { ColorWhite, ColorSecondary10 } from '../../../styles/color'

export const ShareButton = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  padding: ${({ icon }) => (icon ? '4px 24px 4px 8px' : '4px 24px')};
  margin: 0;
  width: 100%;
  color: ${ColorSecondary10};
  background-color: ${ColorWhite};
  border-radius: 0px;

  & svg.icon {
    height: 32px;
    width: 32px;
    margin-right: 10px;

    & * {
      fill: none;
      stroke: ${ColorSecondary10};
      transition: fill 0.1s ease-out, stroke 0.1s ease-out;
    }
  }

  &:hover {
    ${({ selected, disabled }) =>
      !selected &&
      !disabled &&
      css`
        & svg {
          & * {
            stroke: ${ColorWhite};
          }
        }
      `}
  }
`
