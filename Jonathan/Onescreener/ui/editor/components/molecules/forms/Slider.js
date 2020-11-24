/* eslint-disable react/prop-types */
import React from 'react'
import ReactSlider from 'react-slick'
import styled, { css } from 'styled-components'
import { useMediaQuery } from 'react-responsive'

import { MediaMobile, MediaSmall } from '@optune/react-base-components'

import { Page, getImageUrl } from '@optune/onescreener-base-components'

import { BigText } from '../../atoms/text/BigText'
import { InfoText } from '../../atoms/text/InfoText'

import { ForegroundColor, BackgroundColor } from '../../../styles/color'
import { SelectShadow } from '../../../styles/shadow'

const BorderSize = 4

export const SlideSize = {
  oversized: { size: 50, scale: 2 },
  desktop: { breakpoint: 1200, size: 50, scale: 2 },
  medium: { breakpoint: 900, size: 50, scale: 2 },
  small: { breakpoint: 660, size: 50, scale: 2 },
}

const sliderSettings = {
  dots: true,
  centerMode: true,
  infinite: true,
  lazyLoad: true,
  slidesToShow: 1, // Oversized
  swipeToSlide: true,
  speed: 500,
  // responsive: [
  //   {
  //     breakpoint: SlideSize.desktop.breakpoint,
  //     settings: {
  //       slidesToShow: 1,
  //     },
  //   },
  //   {
  //     breakpoint: SlideSize.medium.breakpoint,
  //     settings: {
  //       slidesToShow: 1,
  //     },
  //   },
  //   {
  //     breakpoint: SlideSize.small.breakpoint,
  //     settings: {
  //       slidesToShow: 1,
  //     },
  //   },
  // ],
}

const SliderComponent = styled(ReactSlider)`
  position: relative;
  width: 80%;
  margin: 0 auto;

  & .slick-next:before,
  .slick-prev:before {
    color: ${ForegroundColor.base};
  }
`

const Slide = styled.div`
  position: relative;
  height: calc(${SlideSize.oversized.size}vh + ${BorderSize * 2}px);
  margin-bottom: ${({ isMobile }) => (isMobile ? '5rem' : 0)};

  @media (max-width: ${SlideSize.desktop.breakpoint}px) {
    height: calc(${SlideSize.desktop.size}vh + ${BorderSize * 2}px);
  }
  @media (max-width: ${SlideSize.medium.breakpoint}px) {
    height: calc(${SlideSize.medium.size}vh + ${BorderSize * 2}px);
  }
  @media (max-width: ${SlideSize.small.breakpoint}px) {
    height: calc(${SlideSize.small.size}vh + ${BorderSize * 2}px);
  }
`

const SlideContainer = styled.div`
  position: relative;
  margin: 0 auto;
  padding: ${BorderSize}px;

  width: calc(${SlideSize.oversized.size}vw + ${BorderSize * 2}px);

  @media (max-width: ${SlideSize.desktop.breakpoint}px) {
    width: calc(${SlideSize.desktop.size}vw + ${BorderSize * 2}px);
  }
  @media (max-width: ${SlideSize.medium.breakpoint}px) {
    width: calc(${SlideSize.medium.size}vw + ${BorderSize * 2}px);
  }
  @media (max-width: ${SlideSize.small.breakpoint}px) {
    width: calc(${SlideSize.small.size}vw + ${BorderSize * 2}px);
  }

  height: 100%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.11);
`

const Preview = styled.div`
  position: absolute;
  top: 4px;
  left: 4px;

  width: ${SlideSize.oversized.size * SlideSize.oversized.scale}vw;
  height: ${SlideSize.oversized.size * SlideSize.oversized.scale}vh;
  transform: scale(${1 / SlideSize.oversized.scale});
  transform-origin: top left;
  z-index: 1;

  @media (max-width: ${SlideSize.desktop.breakpoint}px) {
    width: ${SlideSize.desktop.size * SlideSize.desktop.scale}vw;
    height: ${SlideSize.desktop.size * SlideSize.desktop.scale}vh;
    transform: scale(${1 / SlideSize.desktop.scale});
  }

  @media (max-width: ${SlideSize.medium.breakpoint}px) {
    width: ${SlideSize.medium.size * SlideSize.medium.scale}vw;
    height: ${SlideSize.medium.size * SlideSize.medium.scale}vh;
    transform: scale(${1 / SlideSize.medium.scale});
  }

  @media (max-width: ${SlideSize.small.breakpoint}px) {
    width: ${SlideSize.small.size * SlideSize.small.scale}vw;
    height: ${SlideSize.small.size * SlideSize.small.scale}vh;
    transform: scale(${1 / SlideSize.small.scale});
  }
`

const PageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 1rem;

  border-radius: ${BorderSize}px;
  color: ${({ active }) => (active ? ForegroundColor.selected : ForegroundColor.secondary)};
  box-shadow: inset 0 0 ${BorderSize}px ${BorderSize}px
    ${({ active }) => (active ? BackgroundColor.accent : ForegroundColor.secondary)};

  cursor: pointer;
  z-index: 2;
`

const TitleText = styled(BigText)`
  margin-bottom: 0.5rem;
`

const PreviewSlide = styled.div`
  position: relative;
  width: 100%;
  ${({ isMobile }) =>
    !isMobile &&
    css`
      height: calc(100vh - 235px);
    `}
  display: flex;
  flex-flow: column;
  align-items: center;
  margin: 0 auto ${({ isMobile }) => (isMobile ? '6rem' : 0)};
  padding: ${({ isMobile }) => (isMobile ? '1rem 1rem 5rem' : '0 3rem')};
  background-color: ${BackgroundColor.secondary};
  border: 2px solid ${({ active }) => (active ? BackgroundColor.accent : BackgroundColor.secondary)};
  border-radius: ${({ isMobile }) => (isMobile ? '4px' : 0)};
  box-shadow: ${({ isMobile }) => (isMobile ? SelectShadow : 'none')};
`

const PreviewText = styled.div`
  position: relative;
  max-width: 100%;
  max-height: 20%;
  margin: 0 auto 1.5rem;
`

const PreviewImage = styled.img`
  position: relative;
  max-width: 100%;
  max-height: 80%;
  margin: 0 auto;
  cursor: pointer;
`

export const Slider = ({ slides, activeIndex }) => {
  const isMobile = useMediaQuery({ query: MediaSmall })

  return isMobile ? (
    slides.map(({ description, image, name, onSelect, page }, index) => {
      return image ? (
        <PreviewSlide key={index} active={index === activeIndex} isMobile>
          <TitleText>{name}</TitleText>
          <PreviewImage isMobile onClick={onSelect} src={getImageUrl(true)({ image })} />
          <InfoText>{description}</InfoText>
        </PreviewSlide>
      ) : (
        <Slide key={index} isMobile>
          <TitleText>{name}</TitleText>
          <SlideContainer isMobile>
            <Preview>
              <Page page={page} noBacklink />
            </Preview>
            <PageOverlay onClick={onSelect} active={index === activeIndex} />
          </SlideContainer>
        </Slide>
      )
    })
  ) : (
    <SliderComponent {...sliderSettings} initialSlide={activeIndex}>
      {slides.map(({ description, image, name, onSelect, page }, index) => {
        return image ? (
          <PreviewSlide key={index} active={index === activeIndex}>
            <PreviewText>
              <TitleText>{name}</TitleText>
              <InfoText>{description || <br />}</InfoText>
            </PreviewText>
            <PreviewImage onClick={onSelect} src={getImageUrl(true)({ image })} />
          </PreviewSlide>
        ) : (
          <Slide key={index}>
            <TitleText>{name}</TitleText>
            <SlideContainer>
              <Preview>
                <Page page={page} noBacklink />
              </Preview>
              <PageOverlay onClick={onSelect} active={index === activeIndex} />
            </SlideContainer>
          </Slide>
        )
      })}
    </SliderComponent>
  )
}
