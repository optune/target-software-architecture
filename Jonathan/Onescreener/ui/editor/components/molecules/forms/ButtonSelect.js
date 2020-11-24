import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Field } from 'formik'

// Styles
import {
  BackgroundColor,
  ForegroundColor,
  ColorHarlequin,
  ColorWhite,
  ColorLightGreySecond,
  ColorSecondary10,
  ColorSecondary40,
} from '../../../styles/color'
import { MediaSmall } from '@optune/onescreener-base-components'

const StyledButtonList = styled.ul`
  display: flex;
  justify-content: center;
  margin: 0.5rem 0.2rem;

  ${({ double }) =>
    double &&
    css`
      align-items: center;
      & > li:first-child {
        margin-right: -1px;
        > button {
          border-radius: 4px 0px 0px 4px;
        }
      }

      & > li:nth-child(2) {
        > button {
          border-radius: 0px 4px 4px 0px;
        }
      }
    `}

  & > li {
    margin: ${({ double }) => (double ? '0' : '0 0.1rem')};
  }
`

const StyledButton = styled.button`
  position: relative;
  display: flex;
  box-sizing: border-box;
  min-height: 40px;
  justify-content: center;
  align-items: center;
  // font-size: ${({ small }) => (small ? '1rem' : '15px')};
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  background-color: ${({ selected }) => (selected && ColorWhite) || 'transparent'};
  color: ${({ selected }) => (selected && ColorSecondary10) || ColorSecondary40};
  width: auto;
  min-width: 80px;
  overflow: none;
  border-radius: 2px;
  border: ${({ selected }) =>
    (selected && `2px solid ${ColorHarlequin}`) || `1px solid ${ColorLightGreySecond}`};
  box-shadow: ${({ selected }) =>
    (selected && `0px 1px 3px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.15)`) || `none`};
  padding: ${({ small, hasProFeature }) => (hasProFeature && '0.5rem 3rem ') || '10px 24px'};
  overflow: hidden;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  z-index: ${({ selected }) => (selected ? '999' : '888')};
  ${({ selected }) =>
    !selected &&
    css`
      &:hover:not([disabled]) {
        color: ${ForegroundColor.hover};
        background-color: ${BackgroundColor.hover};
      }
    `}

  @media ${MediaSmall} {
    font-size: 16px;
  }

  transition: color 0.3s ease-out, background-color 0.3s ease-out;
`

const StyledProTag = styled.div`
  position: absolute;
  top: 10px;
  left: -14px;
  padding: 3px 24px;
  font-size: 9px;
  line-height: 1;
  transform: rotate(-45deg);
  color: ${ForegroundColor.accent};
  background-color: ${BackgroundColor.accent};
`

export const ButtonSelect = ({
  disabled,
  name,
  onChange,
  options = [],
  small,
  value,
  hasProFeature,
}) => {
  return (
    <StyledButtonList double={options.length === 2} data-cy={`select-${name}`}>
      {options.map((option) => (
        <li key={option.value}>
          <StyledButton
            data-cy={`option-${option.value}`}
            hasProFeature={hasProFeature}
            secondary
            disabled={disabled}
            selected={option.value === value}
            onClick={(e) => {
              e.preventDefault()
              onChange(option.value)
            }}
            small={small}
            type="button"
            double={options.length === 2}
          >
            {option.isProFeature && <StyledProTag>PRO</StyledProTag>}
            {option.label}
          </StyledButton>
        </li>
      ))}
    </StyledButtonList>
  )
}

ButtonSelect.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.array,
  value: PropTypes.string,
}
