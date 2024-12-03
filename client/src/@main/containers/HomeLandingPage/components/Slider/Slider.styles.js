import styled from "styled-components";

export const ContainerWrapper = styled.div`
background-color: #000;
padding-bottom: 105px;

.swiper-pagination-bullet {
    width: 18px;
    height: 18px;
    border: 2px solid #fff;
    box-sizing: border-box;
    opacity: 1;
    background-color: transparent;

    &.swiper-pagination-bullet-active {
        background-color: #fff;
    }
}

.swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet,
.swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet {
    margin: 0 11px;
}

.swiper-pagination-fraction,
.swiper-pagination-custom,
.swiper-horizontal > .swiper-pagination-bullets,
.swiper-pagination-bullets.swiper-pagination-horizontal {
    bottom: 78px;
    left: 68px;
}

.swiper-pagination {
    text-align: left;
}
`;
