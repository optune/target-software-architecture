// React
import React from 'react'
import { useTranslation } from 'react-i18next'

// React Components
import { Row, Column } from '@optune/react-base-components'

// Atoms
import { BigText } from '@ui-library/editor/atoms/text/BigText'
import { SubTitle } from '@ui-library/editor/atoms/text/SubTitle'
import { InfoPlayer } from '@ui-library/editor/molecules/common/InfoPlayer'

// Molecules
import { ButtonBar } from '@ui-library/editor/molecules/forms/ButtonBar'

// Organisms
import { PageContainer } from '@ui-library/editor/organisms/PageContainer'

// Settings
import { Settings } from './Settings'

// Containers
import { LinkList } from './LinkList'

// Constaints
import { infoVideoLinks } from '@ui-library/editor/atoms/links/utils/infoVideoLink'

export const Links = ({
  links,
  mutation,
  setList,
  navigate,
  onPreviewContentChanged,
  previewContent,
  refetch,
  refetchQuery,
  settings,
  showSettings,
}) => {
  const { t } = useTranslation()
  const {
    border,
    dirty,
    handleSave,
    linksColors,
    position,
    setBorder,
    setLinksColors,
    setPosition,
    setShape,
    setSize,
    shape,
    size,
  } = settings

  return (
    <PageContainer>
      <SubTitle>{t('edit.links.subtitle')}</SubTitle>
      <BigText>{t('edit.links.title')}</BigText>

      {/*
       * Button to open video infos
       */}

      <InfoPlayer video={infoVideoLinks.LINKS} />

      {/*
       * Links list with add option
       */}
      <Row center marginBottom>
        <Column fullwidth center>
          <LinkList
            dirty={dirty}
            links={links}
            mutation={mutation}
            navigate={navigate}
            onListChanged={setList}
            onSave={handleSave}
            refetch={refetch}
            refetchQuery={refetchQuery}
          />
        </Column>
      </Row>

      {showSettings ? (
        <Settings
          border={border}
          linksColors={linksColors}
          position={position}
          setBorder={setBorder}
          setLinksColors={setLinksColors}
          setPosition={setPosition}
          setShape={setShape}
          setSize={setSize}
          shape={shape}
          size={size}
        />
      ) : null}
      {/*
       * Form Actions
       */}
      <ButtonBar
        backToPage="/edit"
        dirty={dirty}
        hasConfirmOnCancel
        mutation={mutation}
        navigateToPage="/edit"
        onCancel={() => onPreviewContentChanged(null)}
        onSave={handleSave}
        previewContent={previewContent}
        refetchQuery={refetchQuery}
        withPreview
      />
    </PageContainer>
  )
}
