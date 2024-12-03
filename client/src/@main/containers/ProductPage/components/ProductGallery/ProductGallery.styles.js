import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import CloseIcon from '@mui/icons-material/Close';

export const StyledBigImage = styled('img')`
	width: 100%;
	height: 100%;
	grid-column-start: 0;
	grid-column-end: span 3;
	object-fit: cover;
	cursor: zoom-in;
`;

export const StyledSmallImage = styled('img')`
	width: 100%;
	height: 100%;
	grid-column-start: 0;
	grid-column-end: span 2;
	object-fit: cover;
	cursor: zoom-in;
`;

export const StyledGallery = styled(Box)`
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	align-items: center;
	gap: 10px;
	margin-bottom: 20px;
`;

export const StyledSwiper = styled(Swiper)`
	margin-bottom: 20px;

	& .swiper-pagination-bullet-active {
		background: #000;
	}
`;

export const StyledSwiperSlide = styled(SwiperSlide)`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 80%;
	min-height: 294px;
	max-height: 460px;
`;

export const StyledMobileImage = styled('img')`
	width: 100%;
	height: 100%;
	min-width: 183px;
	max-width: 290px;
	min-height: 294px;
	object-fit: cover;

	${(props) => props.theme.breakpoints.up('sm')} {
		max-height: 603px;
		max-width: 400px;
	}
`;

export const StyledOverlaySwiper = styled(Swiper)`
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;

	& .swiper-button-prev {
		color: #fff;
	}

	& .swiper-button-prev:hover {
		color: #000;
	}

	& .swiper-button-next {
		color: #fff;
	}

	& .swiper-button-next:hover {
		color: #000;
	}
`;

export const StyledOverlaySwiperSlide = styled(SwiperSlide)`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	position: relative;
`;

export const StyledCloseIcon = styled(CloseIcon)`
	cursor: pointer;
	color: #fff;
	position: absolute;
	top: 5px;
	right: 5px;
	z-index: 2;

	& :hover {
		color: #000;
	}
`;

export const StyledOverlayImage = styled('img')`
	width: 100%;
	height: 100%;
	min-width: 183px;
	max-width: 320px;
	min-height: 294px;
	object-fit: cover;

	${(props) => props.theme.breakpoints.up('sm')} {
		max-height: 630px;
		max-width: 500px;
	}
`;
