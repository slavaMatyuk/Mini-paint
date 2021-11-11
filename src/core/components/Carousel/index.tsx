import * as React from 'react';
import { useState } from 'react';
import StyledCarouselButton from './styles/StyledCarouselButton';
import StyledCarouselSlide from './styles/StyledCarouselSlide';
import StyledCarouselWrap from './styles/StyledCarouselWrap';
import StyledFlexWrapper from './styles/StyledFlexWrapper';
import StyledRelativeWrap from './styles/StyledRelativeWrap';

interface CarouselProps {
  children: JSX.Element[];
}

const Carousel = ({ children }: CarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const activeSlide = children.map((slide, index) => (
    <StyledCarouselSlide active={currentSlide === index} key={+index}>
      {slide}
    </StyledCarouselSlide>
  ));

  const handleLeft = () => setCurrentSlide((currentSlide - 1 + activeSlide.length) % activeSlide.length);
  const handleRight = () => setCurrentSlide((currentSlide + 1) % activeSlide.length);

  return (
    <StyledRelativeWrap>
      <StyledFlexWrapper>
        <StyledCarouselWrap currentSlide={currentSlide}>
          {activeSlide}
        </StyledCarouselWrap>
      </StyledFlexWrapper>
      <StyledCarouselButton type="button" onClick={handleLeft}>
        ❮
      </StyledCarouselButton>
      <StyledCarouselButton type="button" onClick={handleRight}>
        ❯
      </StyledCarouselButton>
    </StyledRelativeWrap>
  );
};

export default Carousel;