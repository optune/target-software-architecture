// React
import React from 'react'
import styled, { css } from 'styled-components'

import { PlusSignIcon } from '../icons/info/PlusSign'

// Styles
import { ForegroundColor, BackgroundColor } from '../../../styles/color'

// React Components
import { MediaSmall } from '@optune/react-base-components'

const StyledProTag = styled.div`
  position: absolute;
  top: 3px;
  left: -23px;
  padding: 3px 24px;
  font-size: 9px;
  line-height: 11px;
  transform: rotate(-45deg);
  color: ${ForegroundColor.accent};
  background-color: ${BackgroundColor.accent};
`

export const Button = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  color: black;
  background-color: transparent;
  overflow: hidden;

  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};

  margin-right: ${({ noMargin }) => (noMargin ? '0' : '1rem')};
  margin-bottom: 1rem;
  max-width: 300px;
  min-width: 95px;
  width: auto;
  height: 42px;
  padding-left: 1.5rem;
  padding-right: 1.5rem;

  /* Secondary/80 */
  border: 1px solid #bec4d2;
  border-radius: 2px;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};

  &:hover {
    ${({ disabled }) =>
      !disabled &&
      css`
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.1);
        transition: border 0.2s ease-out;
      `}
  }
`

const Icon = styled(PlusSignIcon)`
  min-width: 10px;
  min-height: 10px;
  max-width: 10px;
  max-height: 10px;
  width: auto;
  height: auto;
  margin-right: 0.5rem;
`

const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media ${MediaSmall} {
    font-size: 1.2rem;
  }
`

export const AddContentButton = ({
  children,
  id,
  isProFeature,
  hasProPlan,
  disabled,
  ...other
}) => (
  <Button disabled={disabled} data-cy={id} {...other}>
    <InnerContainer>
      <Icon />
      {children}
    </InnerContainer>
    {isProFeature && !hasProPlan && <StyledProTag>PRO</StyledProTag>}{' '}
  </Button>
)
