import styled, { css } from 'styled-components';

interface ICarouselProps {
  currentSlide: number;
}

const StyledCarouselWrap = styled.div<ICarouselProps>`
  display: flex;
  cursor: grab;
  ${(props) => props.currentSlide
    && css`
      transform: translateX(-${props.currentSlide * 100}%);
    `};
  transition: all 0.5s ease;
`;

export default StyledCarouselWrap;
