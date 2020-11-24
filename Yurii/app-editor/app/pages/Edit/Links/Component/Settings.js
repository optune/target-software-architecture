// React
import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

// API
import { Size } from '/imports/api'

// React Components
import { Row, Column } from '@optune/react-base-components'

// Atoms
import { MediumText } from '../../atoms/text/MediumText'

// Molecules
import { CollapsibleBox } from '../../molecules/cards/CollapsibleBox'

import { LinePicker } from '../../molecules/forms/LinePicker'
import { SelectBorderPosition } from '../../molecules/forms/SelectBorderPosition'
import { SelectSize } from '../../molecules/forms/SelectSize'
import { ShapePicker } from '../../molecules/forms/ShapePicker'
import { LinksColorPicker } from '../../molecules/forms/LinksColorPicker'

export const Settings = ({
  border,
  linksColors,
  position,
  setBorder,
  setLinksColors,
  setPosition,
  setShape,
  setSize,
  shape,
  size,
}) => {
  const { t } = useTranslation()

  return (
    <CollapsibleBox
      layoutChildren={
        <Fragment>
          <Row center marginBottom>
            <Column third center>
              <MediumText>{t('edit.links.position.label')}</MediumText>
              <SelectBorderPosition position={position} onChange={setPosition} />
            </Column>
          </Row>

          <Row center marginBottom>
            <Column fullwidth center>
              <MediumText>{t('edit.links.shape.label')}</MediumText>
              <ShapePicker shape={shape} onChange={setShape} />
            </Column>
          </Row>

          <Row center marginBottom>
            <Column fullwidth center>
              <MediumText>{t('edit.links.style.label')}</MediumText>
              <LinePicker border={border} shape={shape} onChange={setBorder} />
            </Column>
          </Row>

          <Row center marginBottom>
            <Column twoThird center>
              <MediumText>{t('edit.links.size.label')}</MediumText>
              <SelectSize size={size} options={[Size.S, Size.M, Size.L]} onChange={setSize} />
            </Column>
          </Row>
        </Fragment>
      }
      positionChildren={
        <Row center marginBottom>
          <Column twoThird center>
            <MediumText>{t('edit.links.colorPicker.label')}</MediumText>
            <LinksColorPicker linksColors={linksColors} setLinksColors={setLinksColors} />
          </Column>
        </Row>
      }
    />
  )
}
