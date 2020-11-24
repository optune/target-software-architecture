// React
import React from 'react'
import PropTypes from 'prop-types'
import ReactSelect from 'react-select'

import { FontSizeBig, FontFamilyRegular, FontFamilyBold } from '@optune/react-base-components'

import { ForegroundColor, BackgroundColor } from '../../../styles/color'
import { SelectShadow } from '../../../styles/shadow'

const inputStyle = (isPlaceholder) => ({
  color: ForegroundColor.light,
  backgroundColor: BackgroundColor.secondary,
  overflow: 'show',
  transition: 'color 0.3s, background-color 0.3s, border-color 0.3s',
  width: '100%',
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  fontSize: '1.2rem',
  lineHeight: 1,
})

const optionStyle = (isFocused) => ({
  backgroundColor: isFocused ? BackgroundColor.hover : BackgroundColor.secondary,
  color: isFocused ? ForegroundColor.hover : ForegroundColor.secondary,
  borderBottom: `1px solid ${ForegroundColor.light}`,
  fontFamily: FontFamilyRegular,
  fontSize: '1.1rem',
  fontWeight: 'bold',
  letterSpacing: 0.2,
  width: '100%',
  paddingTop: '0.8rem',
  paddingBottom: '0.8rem',
  paddingLeft: '1.2rem',
  paddingRight: '1.2rem',

  '&:last-child': {
    borderBottom: 'none',
  },
})

export const styles = {
  control: (style, state) => {
    return {
      ...style,
      backgroundColor: BackgroundColor.secondary,
      borderRadius: '0.2rem',
      borderColor: ForegroundColor.light,
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0,
      boxShadow: SelectShadow,
      minHeight: 0,
    }
  },

  container: (style, state) => {
    return {
      ...style,
      padding: 0,
      backgroundColor: 'transparent',
      margin: '0.5rem 0',
    }
  },

  menu: (style, state) => {
    return {
      ...style,
      backgroundColor: BackgroundColor.secondary,
    }
  },

  menuList: (style, state) => {
    return {
      ...style,
      backgroundColor: BackgroundColor.secondary,
      paddingBottom: 0,
      paddingTop: 0,
    }
  },

  valueContainer: (style, state) => {
    return {
      ...style,
      margin: 0,
      padding: 0,
    }
  },

  option: (style, state) => {
    return {
      ...style,
      ...optionStyle(state.isFocused),
    }
  },
  input: (style, state) => {
    return {
      ...style,
      ...inputStyle(),
    }
  },
  placeholder: (style, state) => {
    return {
      ...style,
      ...inputStyle(true),
      color: ForegroundColor.secondary,
    }
  },
  singleValue: (style, state) => {
    return {
      ...style,
      ...inputStyle(),
    }
  },
  dropdownIndicator: (style) => ({
    ...style,
    padding: '0 5px',
  }),
  clearIndicator: (style) => ({
    ...style,
    padding: '0 5px',
  }),
}

export const Select = ({
  isClearable,
  label,
  onBlur,
  name,
  options,
  placeholder,
  readonly,
  value,
}) => {
  const selectValue = options.find((option) => option.value === value)

  return (
    <ReactSelect
      value={selectValue}
      isSearchable
      isClearable={isClearable}
      name={name}
      onChange={(option) => !!onBlur && onBlur(option ? option.value : '')}
      options={options}
      placeholder={placeholder || `${label || name} ...`}
      styles={styles}
      isDisabled={readonly}
      classNamePrefix="select"
    />
  )
}

Select.propTypes = {
  isClearable: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  placeholder: PropTypes.string,
  readonly: PropTypes.bool,
  value: PropTypes.string,
}

Select.defaultProps = {
  isClearable: true,
}
