// React
import React, { useState, useCallback } from 'react'

// Model
import { validateUrl, validateEmail } from '/imports/model'

// React Components
import { Row, Column } from '@optune/react-base-components'

// Atoms
import { InfoText } from '../../atoms/text/InfoText'
import { InputField } from '../../atoms/forms/InputField'
import { TextArea } from '../../atoms/forms/TextArea'
import { MediumText } from '../../atoms/text/MediumText'

// Styles
import styled from 'styled-components'

const PlatformText = styled(MediumText)`
  margin: 0;
`

const getValues = ({ isEmail, isName, isText }) => (value) =>
  (isName && { name: value }) ||
  (isText && { text: value }) ||
  (isEmail && { email: value }) || { url: value }

const getValidateValue = ({ isEmail, isName, isText }) => (value) =>
  (isName && value > '') ||
  (isText && value > '') ||
  (isEmail && validateEmail(value)) ||
  (!isEmail && !isText && !isName && validateUrl(value))

export const LinkInput = ({
  infoText,
  errorText,
  isEmail,
  isUrl,
  isText,
  isName,
  isSmall,
  linkInput,
  platform,
  placeholder,
  noValidate,
  setLinkInput,
  rows,
}) => {
  const [error, setError] = useState(null)

  const getValue = useCallback(getValues({ isEmail, isName, isText, isUrl }))
  const validateValue = useCallback(getValidateValue({ isEmail, isName, isText, isUrl }))

  const value =
    (isName && linkInput?.name) ||
    (isText && (linkInput?.text || linkInput?.url)) ||
    (isEmail && (linkInput?.email || linkInput?.username || linkInput?.url)) ||
    (!isText && !isEmail && !isName && linkInput?.url) ||
    ''

  /*
   * Valid email, text or url on change and on blur
   */

  const handleValueChange = (e) => {
    const values = getValue(e.target.value)
    const valid = validateValue(e.target.value)

    setLinkInput({ ...values, touched: true, valid })
    setError(null)
  }

  const handleValueBlur = (e) => {
    const values = getValue(event.target.value)
    const valid = validateValue(e.target.value)

    if (valid) {
      setError(null)
      setLinkInput({ ...values, touched: true, valid: true })
    } else {
      setError(errorText)
    }
  }

  return (
    <Row center marginTop>
      <Column fullwidth center>
        {isUrl ? (
          <InputField
            fullwidth
            type="text"
            touched={linkInput.touched}
            error={!!error}
            value={value}
            onChange={handleValueChange}
            onBlur={handleValueBlur}
            placeholder={placeholder}
            small={isSmall}
            margin={0.05}
          />
        ) : isText ? (
          <TextArea
            type="text"
            rows={rows ? rows : 10}
            touched={linkInput.touched}
            error={!!error}
            value={value}
            onChange={handleValueChange}
            onBlur={handleValueBlur}
            placeholder={placeholder}
            small={isSmall}
          />
        ) : isName ? (
          <InputField
            fullwidth
            type="text"
            touched={linkInput.touched}
            error={!!error}
            value={value}
            onChange={handleValueChange}
            onBlur={handleValueBlur}
            placeholder={placeholder}
            small={isSmall}
            margin={0.05}
          />
        ) : (
          <InputField
            fullwidth
            type="text"
            touched={linkInput.touched}
            error={!!error}
            value={value}
            onChange={handleValueChange}
            onBlur={handleValueBlur}
            placeholder={placeholder}
            small={isSmall}
            margin={0.05}
          />
        )}
        <InfoText style={{ position: 'absolute' }} warning={!!error}>
          {error || infoText}
        </InfoText>
      </Column>
    </Row>
  )
}
