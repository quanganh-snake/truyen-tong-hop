import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

function Home() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [listComics, setListComics] = useState([]);

	useEffect(() => {
		const getAllComics = async () => {
			try {
				setLoading(true);
				const res = await fetch(`http://localhost:8069/api/v1`);
				if (res.status !== 200) {
					setLoading(false);
					setError(true);
				}
				const data = await res.json();
				setListComics(data);
				setLoading(false);
				setError(false);
			} catch (error) {}
		};
		getAllComics();
	}, []);

	return (
		<>
			<div className="banner h-[440px] mb-4 rounded-lg shadow-md">
				<img src="https://i.pinimg.com/originals/f6/5b/1a/f65b1a8f5bd4469bd01b384894c1c0fb.jpg" className="h-full w-full object-cover rounded-lg" alt="" />
			</div>
			<h2 className="mb-3">Truyện Đề Cử</h2>
			<Swiper
				slidesPerView={5}
				autoplay={{
					delay: 3000,
					disableOnInteraction: false,
				}}
				centeredSlides={true}
				spaceBetween={30}
				navigation={true}
				modules={[Autoplay, Pagination, Navigation]}
				className="mySwiper"
			>
				{listComics &&
					listComics.length > 0 &&
					listComics.map((comic) => (
						<SwiperSlide key={comic.name}>
							<img src={comic.image} alt={comic.name} />
						</SwiperSlide>
					))}
			</Swiper>
			<h2>Truyện Mới Cập Nhật</h2>
		</>
	);
}

export default Home;
