import styled from 'styled-components';

interface ICarouselSlide {
  active?: boolean;
}

const StyledCarouselSlide = styled.div<ICarouselSlide>`
  flex: 0 0 auto;
  opacity: ${(props) => (props.active ? 1 : 0)};
  transition: all 0.5s ease;
  width: 100%;
`;

export default StyledCarouselSlide;
