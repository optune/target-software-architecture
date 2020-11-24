import React from 'react'
import styled from 'styled-components'

// Styles
import { ForegroundColor } from '../../../styles/color'

// Icons
import { HintIcon } from '../../atoms/icons/info/Hint'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${({ margin }) => (margin ? margin : '0')};
`

const StyledHintIcon = styled(HintIcon)`
  width: 19px;
  height: 18px;
`

const HintLink = styled.a`
  padding: ${({ margin }) => (margin ? '0 0 0 11px' : '0 0 0.5rem 11px')};
  display: flex;
  justify-content: center;
  align-items: center;

  & svg.icon rect {
    stroke: transparent;
    fill: #53637f;
  }

  & svg.icon circle {
    fill: transparent;
    stroke: #53637f;
  }

  &:hover {
    & svg.icon circle {
      stroke: ${ForegroundColor.hover};
    }

    & svg.icon rect {
      fill: ${ForegroundColor.hover};
    }
  }
`

export const withHintLink = (WrappedComponent) => {
  const Component = ({ hintLink, margin, ...other }) => (
    <Wrapper margin={margin}>
      <WrappedComponent {...other} />
      {hintLink && (
        <HintLink margin={margin} href={hintLink} target={hintLink !== '#' && '__blank'}>
          <StyledHintIcon />
        </HintLink>
      )}
    </Wrapper>
  )

  return Component
}
