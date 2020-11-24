import React from 'react'
import styled from 'styled-components'

// Styles
import { ForegroundColor } from '../../../styles/color'

// Icons
import { HintIcon } from '../../atoms/icons/info/Hint'

import {
  InfoOverlay,
  InfoTitle,
  InfoText as InfoTextOverlay,
} from '../../../containers/overlays/Info'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: ${({ margin }) => (margin ? margin : '0')};
`

const StyledHintIcon = styled(HintIcon)`
  width: 19px;
  height: 18px;
`

const HintLink = styled.a`
  padding: ${({ margin }) => (margin ? '0 0 0 11px' : '0 0 0.8rem 11px')};
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

const PositionInfo = ({ show, header, infoText, onClose }) => (
  <InfoOverlay show={show} label="Position Info Modal" onClose={onClose} settings="light">
    <InfoTitle>{header}</InfoTitle>

    <InfoTextOverlay>{infoText}</InfoTextOverlay>
  </InfoOverlay>
)

export const withInfoModal = (WrappedComponent) => {
  class WithInfoModal extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        show: false,
      }
      this.onClick = this.onClick.bind(this)
    }

    onClick() {
      this.setState({ show: true })
    }

    render() {
      const { header, infoText } = this.props
      const { show } = this.state
      return (
        <Wrapper>
          <WrappedComponent {...this.props} />
          <HintLink onClick={this.onClick}>
            <StyledHintIcon />
          </HintLink>

          <PositionInfo
            show={show}
            header={header}
            infoText={infoText}
            onClose={() => this.setState({ show: false })}
          />
        </Wrapper>
      )
    }
  }

  return WithInfoModal
}
