// React
import React, { useState, useEffect, useCallback, Fragment } from 'react'
import { navigate } from '@reach/router'
import { useTranslation } from 'react-i18next'
import { sortableContainer, sortableElement } from 'react-sortable-hoc'
import styled from 'styled-components'

// API
import { Platform, orderList, removeItem } from '/imports/api'

// React Components
import { Row } from '@optune/react-base-components'

// Atoms
import { MediumText } from '@ui-library/editor/atoms/text/MediumText'
import { InfoText } from '@ui-library/editor/atoms/text/InfoText'
// Molecules

import { LinkItem } from '@ui-library/editor/molecules/cards/LinkItem'

// Styles
import { ForegroundColor } from '../../styles/color'

// Containers
import { AddLink } from './AddLink'

import { OptuneInfo, getOptuneInfo } from '../overlays/OptuneInfo'

// Modal
import { AddTextModal } from '../../containers/overlays/modals/AddTextModal'
import { AddLinkModal } from '../../containers/overlays/modals/AddLinkModal'

// GraphQL
import { CHANGE_LINKS } from '../../graphql/mutations'
import { PAGE } from '../../graphql/queries'
import { withMutation } from '../../mixins/withMutation'

const Container = styled.div`
  display: contents;

  .list {
    position: relative;
    width: 90%;
    list-style-type: none;
  }

  .empty {
    color: ${ForegroundColor.secondary};
    padding: 1rem 2rem;
    margin: 1rem 0;
  }

  .container-limit {
    margin-bottom: 2rem;
  }
`

const hasListChanged = ({ list, initialList }) => {
  if (!initialList) return false

  if (list?.length !== initialList.length) return true

  const changed = list.reduce(
    (changed, link, index) =>
      changed ||
      link.type !== initialList[index].type ||
      link.platform !== initialList[index].platform ||
      link.url !== initialList[index].url ||
      link.name !== initialList[index].name ||
      link.username !== initialList[index].username ||
      link.text !== initialList[index].text,
    false
  )

  return changed
}

const mapLink = ({ platform, name, username, url, text }, sequenceNr) => ({
  platform,
  username,
  name,
  url,
  text,
  sequenceNr,
})

/*
 * Sortable List
 */

const SortableItem = sortableElement(LinkItem)
const SortableList = sortableContainer(
  ({ list, onEditItem, onPreviewItem, onRemoveItem, tooltip }) => (
    <ul className="list">
      {list.map((item, index) => (
        <SortableItem
          key={`item-${index}`}
          index={index}
          isFirst={index === 0}
          isLast={index === list.length - 1}
          name={item.name}
          onEditItem={() => onEditItem(item)}
          onPreviewItem={() => onPreviewItem(item)}
          onRemoveItem={() => onRemoveItem(index)}
          tooltip={tooltip}
          {...item}
        />
      ))}
    </ul>
  )
)

// Limit of links allowed
const LINK_LIMIT = 7

/*
 * Link List Component
 */

export const LinkList = withMutation(
  CHANGE_LINKS,
  PAGE
)(({ mutate, mutation, refetchQuery, refetch, links, dirty, navigate, onSave, onListChanged }) => {
  const { t } = useTranslation()

  const [initialList, setInitialList] = useState()
  const [list, setList] = useState(links.list)

  // Edit Link
  const [selectedItem, setSelectedItem] = useState()

  const [optuneInfo, setOptuneInfo] = useState({ show: false })

  const listChanged = hasListChanged({ list, initialList })

  useEffect(() => {
    if (initialList) {
      if (listChanged) {
        setInitialList(list)
        mutate({ list: list?.map(mapLink) }).then(() => {
          onListChanged(list)
        })
      }
    } else {
      setInitialList(links.list)
    }
  }, [listChanged])

  const handleClose = useCallback(() => {
    setSelectedItem()
  }, [])

  const handleSave = useCallback(
    (newItem) => {
      setList(
        list?.map((item) =>
          item.platform === selectedItem.platform ? { ...item, ...newItem } : item
        )
      )
      setSelectedItem()
    },
    [listChanged, selectedItem]
  )

  return (
    <Container>
      {/*
       * Add link options
       */}
      <Row center marginTop>
        <AddLink
          links={links}
          setList={(newList) => {
            setList(newList)
            setInitialList(newList)
          }}
          setOptuneInfo={setOptuneInfo}
          dirty={dirty}
          mutation={mutation}
          refetchQuery={refetchQuery}
          onSave={onSave}
          limit={list?.length}
        />
      </Row>
      {/*
       * Active link list
       */}
      <Fragment>
        {!list.length && <p className="empty">{t('edit.links.emptyList')}</p>}
        {list.length >= LINK_LIMIT && (
          <div className="container-limit">
            <MediumText>{t('edit.links.add.limitReached.label', { limit: LINK_LIMIT })}</MediumText>
            <InfoText>{t('edit.links.add.limitReached.info')}</InfoText>
          </div>
        )}
        <SortableList
          list={list}
          distance={2}
          onEditItem={(item) => {
            if (item.platform === Platform.OPTUNEARTISTPROFILE) {
              setOptuneInfo({
                show: true,
                onAction: () =>
                  window.open(
                    `${Meteor.settings.public.OPTUNE_DOMAIN}/artist/${item.username}`,
                    '_self'
                  ),
                platform: Platform.OPTUNEARTISTPROFILE,
              })
            } else if (item.platform === Platform.OPTUNEBOOKINGS) {
              setOptuneInfo({
                show: true,
                onAction: () => window.open(Meteor.settings.public.OPTUNE_DOMAIN, '_self'),
                platform: Platform.OPTUNEBOOKINGS,
              })
            } else if (item.platform === Platform.OPTUNEREQUESTFORM) {
              navigate('/edit/links/bookingrequest')
            } else {
              setSelectedItem(item)
            }
          }}
          onPreviewItem={(item) => item.url && window.open(item.url, '_blank')}
          onRemoveItem={(index) => setList(removeItem({ list, index }))}
          onSortEnd={({ oldIndex, newIndex }) => {
            setList(orderList({ list, oldIndex, newIndex }))
          }}
          tooltip={{
            edit: t('edit.links.tooltip.edit'),
            editInOptune: t('edit.links.tooltip.editInOptune'),
            preview: t('edit.links.tooltip.preview'),
            remove: t('edit.links.tooltip.remove'),
          }}
        />
      </Fragment>
      {/*
       * Optune info modal
       */}
      <OptuneInfo
        onAction={optuneInfo.onAction}
        onClose={() => setOptuneInfo({ show: false })}
        show={optuneInfo.show}
        {...getOptuneInfo({ platform: optuneInfo.platform, t })}
      />

      {selectedItem?.platform === Platform.ABOUT ? (
        <AddTextModal
          show={!!selectedItem}
          item={selectedItem}
          links={links}
          mutation={CHANGE_LINKS}
          onCancel={handleClose}
          onClose={handleClose}
          onSave={handleSave}
          onSaveFinished={(result) => setList(result.addLink)}
          platform={Platform.ABOUT}
          refetchQuery={PAGE}
          mode={'UPDATE'}
          limit={list?.length}
        />
      ) : (
        <AddLinkModal
          show={!!selectedItem}
          item={selectedItem}
          links={links}
          mutation={CHANGE_LINKS}
          onCancel={handleClose}
          onClose={handleClose}
          onSave={handleSave}
          onSaveFinished={(result) => setList(result.addLink)}
          platform={selectedItem?.platform}
          refetchQuery={PAGE}
          mode={'UPDATE'}
          limit={list?.length}
        />
      )}
    </Container>
  )
})
