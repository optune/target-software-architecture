/* eslint-disable react/display-name */
import React, { Fragment, useState, useEffect, memo } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Location, navigate } from '@reach/router'
import styled, { css } from 'styled-components'
import { useTranslation } from 'react-i18next'

import { MediaSmall, ZIndex2 } from '@optune/react-base-components'
import { NotMediaSmall } from '@optune/onescreener-base-components'

// Styles
import { BackgroundColor } from '../../../styles/color'

// Icons
import { BackIcon } from '../../atoms/icons/navigation/Back'
import { CancelIcon } from '../../atoms/icons/navigation/Cancel'

// Atoms
import { Button } from '../../atoms/buttons/Button'
import { NavButton } from '../../atoms/navigation/NavButton'
import { PreviewButton } from '../../atoms/navigation/PreviewButton'
import { SettingsButton } from '../../atoms/navigation/SettingsButton'

// Molecules
import { DomainBarLink } from '../domain/DomainBarLink'

// Containers
import { AskPlanModal } from '../../../containers/overlays/modals/plan/AskPlanModal'
import { NotNowModal } from '../../../containers/overlays/modals/plan/NotNowModal'

// Redux Actions
import { connect } from 'react-redux'
import { actionCreators as pageActions } from '/imports/actions/Page'

const BottomNavigation = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  padding: 0;
  z-index: ${ZIndex2};
  background: ${BackgroundColor.secondary};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.11);
`

const NavigationContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const NavigationMenu = styled.div`
  flex: 1;
`

const NavigationPreview = styled.div`
  flex: 1;
  display: none;
  justify-content: center;
  align-items: center;

  @media ${NotMediaSmall} {
    display: flex;
  }
`

const NavigationBar = styled.ul`
  position: relative;
  max-width: 1200px;
  height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 0.5rem 0 1rem;

  @media ${MediaSmall} {
    padding-bottom: 0.5rem;
  }
`

const NavigationItem = styled.li`
  display: flex;
  justify-content: center;
  flex-grow: ${({ primary }) => (primary ? 2 : 1)};
  width: 30%;
  position: relative;

  @media ${MediaSmall} {
    width: 20%;
  }
`

const SubmitButton = styled(Button)`
  width: 180px;

  ${({ borderNone }) =>
    borderNone &&
    css`
      border-radius: 0;
    `}

  @media ${MediaSmall} {
    width: auto;
    min-width: 100px;
  }
`

const StyledBackIcon = styled(BackIcon)`
  &.icon {
    width: 8px !important;
    height: 16px !important;
    margin-${({ invert }) => (invert ? 'left' : 'right')}: 12px;
    ${({ invert }) =>
      invert &&
      css`
        transform: rotateY(180deg);
      `}
  }
`

const StyledCancelIcon = styled(CancelIcon)`
  &.icon {
    width: 14.2px !important;
    height: 14.2px !important;
    margin-right: 13.9px;
  }
`

const Loading = styled.div`
  border: 2px solid transparent;
  border-radius: 50%;
  border-top: 2px solid #fff;
  width: 24px;
  height: 24px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const handleSubmit = ({
  dirty,
  event,
  isProPlanRequired,
  onNavigateToPage,
  onSave,
  onSubmit,
  onSubmitFinished,
  setPageSaving,
  setSavedModalOpen,
}) => {
  event.preventDefault()

  if (dirty) {
    setPageSaving(true)

    onSave((values) => onSubmit({ variables: { values } }))
      ?.then((result) => onSubmitFinished(result.data))
      .then(() => {
        setPageSaving(false)
        if (!isProPlanRequired) {
          setSavedModalOpen(true)
          setTimeout(() => {
            setSavedModalOpen(false)
          }, 2000)
          navigate('/edit')
        }
      })
      .catch((error) => onSubmitFinished({ error }))
  } else {
    onNavigateToPage()
  }
}

const ActionButton = ({
  buttonText,
  dirty,
  disabled,
  mutation,
  onNavigateToPage,
  onSave,
  onSaveFinished,
  isProPlanRequired,
  refetchQuery,
  setPageSaving,
  setSavedModalOpen,
}) => {
  const refetchQueries =
    (refetchQuery && Array.isArray(refetchQuery) && refetchQuery.map((query) => ({ query }))) ||
    (refetchQuery && [{ query: refetchQuery }]) ||
    []
  const [mutate] = useMutation(mutation, { refetchQueries })

  return (
    <SubmitButton
      data-cy="mutate"
      secondary={!dirty}
      disabled={disabled}
      onClick={(event) =>
        handleSubmit({
          dirty,
          event,
          isProPlanRequired,
          onNavigateToPage,
          onSave,
          onSubmit: mutate,
          onSubmitFinished: (result) => {
            onSaveFinished && onSaveFinished(result)
          },
          setPageSaving,
          setSavedModalOpen,
        })
      }
    >
      {buttonText}
    </SubmitButton>
  )
}

const mapStateToProps = ({ page }) => ({
  isPreviewModalOpen: page.isPreviewModalOpen,
  isPageSaving: page.isPageSaving,
})

const mapDispatchToProps = (dispatch) => ({
  onPreviewContentChanged: (previewContent) =>
    dispatch(pageActions.setPreviewContent(previewContent)),
  setPreviewModalOpen: (isPreviewModalOpen) =>
    dispatch(pageActions.setPreviewModalOpen(isPreviewModalOpen)),
  setPageSaving: (isPageSaving) => dispatch(pageActions.setPageSaving(isPageSaving)),
  setSavedModalOpen: (isSavedModalOpen) =>
    dispatch(pageActions.setSavedModalOpen(isSavedModalOpen)),
})

const ButtonBarComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  memo(
    ({
      actionHide,
      backToPage,
      backToText,
      contentType,
      dirty,
      disabled,
      hasConfirmOnCancel,
      forceBackButton,
      location,
      mutation,
      onUpgradeAction,
      navigateAction,
      navigateToPage,
      navigateToText,
      onCancel,
      onCancelSave,
      onCancelPlanUpgrade,
      onSave,
      onSaveFinished,
      processing,
      processingText,
      refetchQuery,
      saveText,
      isPreviewModalOpen,
      isProPlanRequired,
      isPageSaving,
      setPageSaving,
      setPreviewModalOpen,
      setSavedModalOpen,
      withPreview,
      withSettings,
    }) => {
      const [isAskPlanModalOpen, setIsAskPlanModalOpen] = useState(false)
      const [isNotNowModalOpen, setIsNotNowModalOpen] = useState(false)

      // Texts incl default
      const { t } = useTranslation()
      const tBackToText =
        backToText || (forceBackButton && t('navigate.back')) || t('navigate.cancel')
      const tSaveText = saveText || t('navigate.save')
      const tNavigateToText = navigateToText || t('navigate.back')

      // Allow to use back button in preview
      window.onpopstate = (e) => {
        setPreviewModalOpen({ browserAction: true })
      }

      useEffect(() => {
        if (isPreviewModalOpen.show) {
          // Add the same path again to avoid leaving page if the user presses the browser's back button
          navigate(location.pathname)
        } else if (!isPreviewModalOpen.browserAction) {
          // Go back in history on regular closing of preview
          window.history.back()
        }
      }, [isPreviewModalOpen.show])

      const handleNavigate = () => navigateToPage && navigate(navigateToPage)

      return (
        <Fragment>
          <BottomNavigation>
            <NavigationContainer>
              <NavigationMenu>
                <NavigationBar>
                  <NavigationItem>
                    {(withSettings && (
                      <SettingsButton
                        onClick={() => {
                          navigate('/settings')
                        }}
                        buttonText={'Settings'}
                      />
                    )) ||
                      ((dirty || forceBackButton) && backToPage && (
                        <NavButton
                          secondary
                          href={backToPage}
                          disabled={processing || disabled}
                          dirty={dirty}
                          hasConfirm={hasConfirmOnCancel}
                          isButtonBar
                          mutation={mutation}
                          navigateToPage={navigateToPage}
                          navigate={navigate}
                          hasNavbar
                          onCancel={() => {
                            handleNavigate()
                            onCancel?.()
                          }}
                          onCancelSave={onCancelSave}
                          onSave={onSave}
                          onSaveFinished={onSaveFinished}
                          refetchQuery={refetchQuery}
                        >
                          {!backToText && !forceBackButton && <StyledCancelIcon />}
                          {forceBackButton && <StyledBackIcon />}
                          {tBackToText}
                        </NavButton>
                      ))}
                  </NavigationItem>

                  <NavigationItem primary>
                    <NotNowModal show={isNotNowModalOpen} />
                    <AskPlanModal
                      show={isAskPlanModalOpen}
                      contentType={contentType}
                      mutation={mutation}
                      onCancel={onCancelPlanUpgrade}
                      onConfirm={onUpgradeAction}
                      onClose={() => setIsAskPlanModalOpen(false)}
                      onSaveFinished={() => {
                        setIsNotNowModalOpen(true)
                        setTimeout(() => {
                          setIsNotNowModalOpen(false)
                        }, 3000)
                      }}
                    />
                    {(!dirty && onUpgradeAction && (
                      <SubmitButton
                        primary
                        disabled={processing || disabled || isAskPlanModalOpen}
                        onClick={(e) => {
                          e.preventDefault()
                          setIsAskPlanModalOpen(true)
                        }}
                      >
                        {(processing && processingText) ||
                          (!dirty && !onUpgradeAction && tNavigateToText) ||
                          tSaveText}
                      </SubmitButton>
                    )) ||
                      (mutation && !actionHide && (
                        <ActionButton
                          disabled={processing || disabled}
                          buttonText={
                            (processing && processingText) ||
                            (isPageSaving && <Loading />) ||
                            (!dirty && (
                              <Fragment>
                                {tNavigateToText !== t('navigate.continue') && <StyledBackIcon />}
                                {tNavigateToText}
                                {tNavigateToText === t('navigate.continue') && (
                                  <StyledBackIcon invert />
                                )}
                              </Fragment>
                            )) ||
                            tSaveText
                          }
                          isProPlanRequired={isProPlanRequired}
                          setPageSaving={setPageSaving}
                          setSavedModalOpen={setSavedModalOpen}
                          dirty={dirty}
                          mutation={mutation}
                          onNavigateToPage={handleNavigate}
                          onSave={onSave}
                          onSaveFinished={(result) => {
                            if (isProPlanRequired) setIsAskPlanModalOpen(true)
                            return onSaveFinished && onSaveFinished(result)
                          }}
                          refetchQuery={refetchQuery}
                        />
                      )) ||
                      (navigateAction && (
                        <SubmitButton
                          primary
                          disabled={processing || disabled}
                          onClick={(e) => {
                            e.preventDefault()
                            navigateAction()
                          }}
                        >
                          {saveText}
                        </SubmitButton>
                      )) ||
                      (navigateToPage && (
                        <NavButton secondary href={navigateToPage} hasNavbar>
                          {(processing && processingText) || (
                            <Fragment>
                              {' '}
                              {!navigateToText && <StyledBackIcon />} {tNavigateToText}
                            </Fragment>
                          )}
                        </NavButton>
                      ))}
                  </NavigationItem>

                  <NavigationItem>
                    {withPreview && (
                      <PreviewButton
                        isBlinking
                        onShowPreview={() => {
                          setPreviewModalOpen({
                            show: !isPreviewModalOpen.show,
                            browserAction: false,
                          })
                        }}
                        buttonText={t('preview.buttonText')}
                      />
                    )}
                  </NavigationItem>
                </NavigationBar>
              </NavigationMenu>
              <NavigationPreview>
                <DomainBarLink hideLoading />
              </NavigationPreview>
            </NavigationContainer>
          </BottomNavigation>
        </Fragment>
      )
    }
  )
)

export const ButtonBar = (props) => (
  <Location>
    {({ location, navigate }) => (
      <ButtonBarComponent {...props} location={location} navigate={navigate} />
    )}
  </Location>
)
