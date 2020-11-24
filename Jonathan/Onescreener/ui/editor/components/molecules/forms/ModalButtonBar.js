/* eslint-disable react/display-name */

// Node
import classNames from 'classnames'

// React
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Base Components
import { MediaSmall, ZIndex1 } from '@optune/react-base-components'

// Styles
import { ForegroundColor, BackgroundColor } from '../../../styles/color'

// Atoms
import { Button } from '../../atoms/buttons/Button'

const StickyButtonBar = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.5rem;
  margin-top: 3rem;
  background: ${BackgroundColor.secondary};

  @media ${MediaSmall} {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: ${ZIndex1};
  }
`

const SaveButton = styled(Button)`
  min-width: 180px;
  width: 100%;
`

const CancelButton = styled(Button)`
  margin: 0 30px;
`

export const ModalButtonBar = memo(
  ({
    cancelText,
    className,
    disablePrimaryButton,
    hidePrimaryButton,
    isKeyboardOpen,
    onCancel,
    onSave,
    primaryText,
  }) => (
    <StickyButtonBar
      className={classNames(className, 'row', {
        hidden: isKeyboardOpen,
      })}
    >
      {!!onCancel && (
        <CancelButton secondary type="button" onClick={onCancel}>
          {cancelText || 'Cancel'}
        </CancelButton>
      )}

      <SaveButton
        className={classNames({
          invisible: hidePrimaryButton,
        })}
        disabled={disablePrimaryButton}
        data-cy={onSave ? 'success' : 'submit'}
        type={onSave ? 'button' : 'submit'}
        onClick={!!onSave ? onSave : undefined}
      >
        {primaryText}
      </SaveButton>
    </StickyButtonBar>
  )
)

ModalButtonBar.propTypes = {
  cancelText: PropTypes.string,
  className: PropTypes.string,
  disablePrimaryButton: PropTypes.bool,
  hidePrimaryButton: PropTypes.bool,
  isKeyboardOpen: PropTypes.bool,
  onCancel: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onSave: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  primaryText: PropTypes.string,
  type: PropTypes.string,
}

// Required to be backwards compatible
ModalButtonBar.defaultProps = {
  cancelText: 'Cancel',
  disablePrimaryButton: false,
  hidePrimaryButton: false,
  isKeyboardOpen: false,
  primaryText: 'Add',
}
