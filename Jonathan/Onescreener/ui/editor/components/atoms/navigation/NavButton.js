/* eslint-disable react/prop-types */
import React, { useState, Fragment } from 'react'
import { Link } from '@reach/router'
import { MediaSmall } from '@optune/react-base-components'

import { Button } from '../buttons/Button'

import styled, { css } from 'styled-components'

// Modal
import { ConfirmModal } from '../../../containers/overlays/modals/ConfirmModal'

const StyledButton = styled(Button)`
  min-width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ isButtonBar }) => (isButtonBar ? '0.5rem 1rem' : '1rem 1rem')};
  max-height: ${({ hasNavbar }) => (hasNavbar ? '46px' : 'auto')};
  // line-height: 1;
  width: 100%;

  @media ${MediaSmall} {
    min-width: 80px;
    padding: 0.5rem 1rem;
  }
`

const ConfirmDiv = styled.div`
  ${({ maxWidth }) =>
    maxWidth &&
    css`
      max-width: 280px;
      width: 100%;
    `}
`

export const NavButton = ({
  children,
  dirty,
  disabled,
  external,
  hasConfirm,
  href,
  maxWidth,
  isButtonBar,
  mutation,
  onCancel,
  onCancelSave,
  hasNavbar,
  navigateToPage,
  navigate,
  onSave,
  onSaveFinished,
  refetchQuery,
  secondary,
  setSaved,
  shadow,
  ...other
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleConfirm = () => (hasConfirm ? setIsModalOpen(true) : onCancel())
  return (
    <Fragment>
      {hasConfirm && mutation && (
        <ConfirmModal
          show={isModalOpen}
          dirty={dirty}
          disabled={disabled}
          mutation={mutation}
          navigateToPage={navigateToPage}
          navigate={navigate}
          onCancel={onCancel}
          onCancelSave={onCancelSave}
          onClose={() => setIsModalOpen(false)}
          onSave={onSave}
          onSaveFinished={onSaveFinished}
          setSaved={setSaved}
          refetchQuery={refetchQuery}
        />
      )}

      {(external && (
        <a href={href} target="_blank" rel="noopener noreferrer">
          <StyledButton
            shadow={shadow}
            secondary={secondary}
            hasNavbar={hasNavbar}
            isButtonBar={isButtonBar}
            {...other}
          >
            {children}
          </StyledButton>
        </a>
      )) ||
        (mutation && dirty && (
          <ConfirmDiv onClick={handleConfirm} maxWidth={maxWidth}>
            <StyledButton
              shadow={shadow}
              secondary={secondary}
              hasNavbar={hasNavbar}
              isButtonBar={isButtonBar}
              {...other}
            >
              {children}
            </StyledButton>
          </ConfirmDiv>
        )) || (
          <Link to={href}>
            <StyledButton
              shadow={shadow}
              secondary={secondary}
              hasNavbar={hasNavbar}
              isButtonBar={isButtonBar}
              {...other}
            >
              {children}
            </StyledButton>
          </Link>
        )}
    </Fragment>
  )
}
