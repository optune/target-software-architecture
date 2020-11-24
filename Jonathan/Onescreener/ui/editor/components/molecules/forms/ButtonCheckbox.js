import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Field } from 'formik'

import { MediaSmall } from '@optune/onescreener-base-components'

// Styles
import { BackgroundColor, ForegroundColor, ColorStormGray } from '../../../styles/color'
import { ButtonShadow } from '../../../styles/shadow'

const ButtonList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0.5rem 0 16px;

  & > li {
    margin: 3px;
  }

  @media ${MediaSmall} {
    margin: 1rem 0 24px;
  }
`

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  background-color: ${({ selected }) =>
    (selected && BackgroundColor.selected) || BackgroundColor.base};
  color: ${({ selected }) => (selected && ForegroundColor.selected) || ForegroundColor.secondary};
  width: auto;
  overflow: none;
  border-radius: 2px;
  border: none;
  box-shadow: none;
  padding: ${({ small }) => (small ? '0.35rem 0.6rem' : '0.5rem 1.2rem')};

  &:hover:not([disabled]) {
    color: ${ForegroundColor.hover};
    background-color: ${BackgroundColor.hover};
  }

  transition: color 0.3s ease-out, background-color 0.3s ease-out;

  @media ${MediaSmall} {
    font-size: 14px;
    box-shadow: ${ButtonShadow};
  }
`

export const ButtonCheckbox = ({ name, onChange, options, small, value }) => {
  const [values, setValues] = useState(value)

  const handleChange = (optionValue) => {
    const newValues = [...values]

    const optionValueIndex = values.findIndex((val) => val === optionValue)
    if (optionValueIndex === -1) {
      newValues.push(optionValue)
    } else {
      newValues.splice(optionValueIndex, 1)
    }
    setValues(newValues)
    onChange(newValues)
  }

  return (
    <ButtonList data-cy={`checkbox-${name}`}>
      {options.map((option) => (
        <li key={option.value}>
          <Button
            data-cy={`option-${option.value}`}
            secondary
            selected={values.includes(option.value)}
            onClick={(e) => {
              e.preventDefault()
              handleChange(option.value)
            }}
            small={small}
            type="button"
          >
            {option.label}
          </Button>
        </li>
      ))}
    </ButtonList>
  )
}

ButtonCheckbox.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.array,
  value: PropTypes.arrayOf(PropTypes.string),
}

ButtonCheckbox.defaultProps = {
  options: [],
}
