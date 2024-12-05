import Modal from "@mui/material/Modal";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import { Controller, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import PropTypes from "prop-types";

import {
	StyledBigImage,
	StyledCloseIcon,
	StyledGallery,
	StyledMobileImage,
	StyledOverlayImage,
	StyledOverlaySwiper,
	StyledOverlaySwiperSlide,
	StyledSmallImage,
	StyledSwiper,
	StyledSwiperSlide,
} from "./ProductGallery.styles";

function ProductGallery({ images }) {
	const isMobile = useMediaQuery(theme => theme.breakpoints.down("md"));

	const [open, setOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleOpen = index => {
		setCurrentIndex(index);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			{isMobile ? (
				<StyledSwiper
					spaceBetween={30}
					pagination={{
						clickable: true,
					}}
					modules={[Pagination, Controller]}
				>
					{images &&
						images.map((url, index) => (
							<StyledSwiperSlide onClick={() => handleOpen(index)} key={index}>
								<StyledMobileImage src={url} />
							</StyledSwiperSlide>
						))}
				</StyledSwiper>
			) : (
				<StyledGallery>
					{images &&
						images.map((url, index) =>
							index < 2 ? (
								<StyledBigImage onClick={() => handleOpen(index)} key={index} src={url} />
							) : (
								<StyledSmallImage onClick={() => handleOpen(index)} key={index} src={url} />
							),
						)}
				</StyledGallery>
			)}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<>
					<StyledCloseIcon fontSize="large" onClick={handleClose} />
					<StyledOverlaySwiper navigation modules={[Navigation, Controller]} initialSlide={currentIndex}>
						{images &&
							images.map((url, index) => (
								<StyledOverlaySwiperSlide key={index}>
									<StyledOverlayImage src={url} />
								</StyledOverlaySwiperSlide>
							))}
					</StyledOverlaySwiper>
				</>
			</Modal>
		</>
	);
}

ProductGallery.propTypes = {
	images: PropTypes.arrayOf(PropTypes.string),
};

export default ProductGallery;
