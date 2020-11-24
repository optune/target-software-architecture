import React from 'react'
import ReactModal from 'react-modal'
import styled, { css } from 'styled-components'

import { ColorStormGray } from '../../../styles/color'
import { MediaSmall } from '@optune/onescreener-base-components'

const ModalContainer = styled.div`
  ${({ bottomModal }) =>
    bottomModal &&
    css`
      @media ${MediaSmall} {
        position: absolute;
        bottom: 0;
        width: 100%;
      }
    `}
`

export const Modal = ({
  children,
  label,
  settings,
  onClose,
  show,
  isPreviewMobile,
  style,
  bottomModal,
}) => {
  !style && (style = isPreviewMobile ? { content: { backgroundColor: ColorStormGray } } : {})

  return (
    <ReactModal
      isOpen={show}
      className={`modal content ${settings}`}
      overlayClassName={`modal overlay ${settings}`}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      contentLabel={label}
      style={style}
    >
      <ModalContainer data-cy="modal" className="animated fadeIn" bottomModal={bottomModal}>
        {children}
      </ModalContainer>
    </ReactModal>
  )
}

Modal.defaultProps = {
  settings: 'normal',
}
