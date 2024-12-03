import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Container } from '@mui/material';
import NewCollection from './banners/NewCollection';
import EndSale from './banners/EndSale';
import EnjoyOff from './banners/EnjoyOff';

import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/css/autoplay';
import { ContainerWrapper } from './Slider.styles';

function Slider() {
	return (
		<ContainerWrapper>
			<Container maxWidth="lg">
				<Swiper
					modules={[Pagination, Scrollbar, A11y, Autoplay]}
					slidesPerView={1}
					autoplay
					pagination={{ clickable: true }}
					scrollbar={{ draggable: false }}
				>
					<SwiperSlide>
						<NewCollection />
					</SwiperSlide>
					<SwiperSlide>
						<EndSale />
					</SwiperSlide>
					<SwiperSlide>
						<EnjoyOff />
					</SwiperSlide>
				</Swiper>
			</Container>
		</ContainerWrapper>
	);
}

export default Slider;
