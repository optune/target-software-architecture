import React, { useState, Fragment } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

// Atoms
import { HrefLink } from '../../atoms/links/HrefLink'

// Styles
import { BackgroundColor, ForegroundColor } from '../../../styles/color'

// Modals
import { PublishModal as PublishModalComponent } from '../../../containers/overlays/modals/PublishModal'

// Utils
import { mapToNewDomainFormat } from '/imports/api'

// GraphQL
import { PAGE_DOMAIN } from '../../../graphql/queries'
import { PUBLISH } from '../../../graphql/mutations'

// Mixins
import { withQuery } from '../../../mixins/withQuery'
import { withMutation } from '../../../mixins/withMutation'

const Container = styled.div`
  display: flex;
  align-items: center;
`

const CustomLink = styled(HrefLink)`
  margin-left: 1rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${ForegroundColor.accent};
    background-color: ${ForegroundColor.hover};
    border-color: ${ForegroundColor.hover};
  }
`

const CustomText = styled.h3`
  font-size: 1rem;
  color: #0a1c3b;
  font-weight: 500;
  cursor: default;
`

// @TODO: if no problem, merge deleteModal and publsihModal (mb confirm as well)
const PublishModal = withMutation(
  PUBLISH,
  PAGE_DOMAIN
)(({ show, redirecting, setRedirecting, onClose, onCancel, domainName, mutate }) => (
  <PublishModalComponent
    show={show}
    redirecting={redirecting}
    onClose={onClose}
    onCancel={onCancel}
    onAction={() => {
      setRedirecting(true)
      mutate({ domainName }).then(() => {
        onCancel()
        setRedirecting(false)
      })
    }}
  />
))

export const DomainBarLink = withQuery(PAGE_DOMAIN)(({ page, domain }) => {
  const {
    name,
    url,
    isSubdomain,
    status: { deployed },
  } = domain || { status: {} }

  const { hasChanged } = page

  const [open, setOpen] = useState(false)
  const [redirecting, setRedirecting] = useState(false)

  const { t } = useTranslation()

  return (
    <Fragment>
      <PublishModal
        show={open}
        redirecting={redirecting}
        setRedirecting={setRedirecting}
        onCancel={() => {
          window.open(url, '_blank')
          setOpen(false)
        }}
        onClose={() => {
          setOpen(false)
        }}
        domainName={name}
      />
      <Container>
        <CustomText>{isSubdomain ? mapToNewDomainFormat(name) : name}</CustomText>
        <CustomLink
          onClick={
            hasChanged || !deployed
              ? () => {
                  setOpen(true)
                }
              : null
          }
          href={!hasChanged && deployed ? url : '#!'}
          target={!hasChanged && deployed ? '__blank' : ''}
        >
          {t('navigate.domain')}
        </CustomLink>
      </Container>
    </Fragment>
  )
})
