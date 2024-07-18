import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import apiConfig from '../../api/apiConfig';
import tmdbApi, { category, movieType } from '../../api/tmdbApi';
import Button, { OutlineButton } from '../button/Button';
import './hero-slide.scss';

SwiperCore.use([Autoplay]);

const HeroSlide = () => {
    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 };
            try {
                const response = await tmdbApi.getMoviesList(movieType.popular, { params });
                setMovieItems(response.results);
                console.log(response);
            } catch (error) {
                console.log('error:', error);
            }
        };
        getMovies();
    }, []);

    return (
        <div className="hero-slide">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 6000 }}
                loop={true} 
            >
                {movieItems.map((item, index) => (
                    <SwiperSlide key={index}>
                        {({ isActive }) => (
                            <HeroSlideItem item={item} className={isActive ? 'active' : ''} />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

const HeroSlideItem = ({ item, className }) => {
    const history = useHistory();
    const background = apiConfig.originalImage(item.backdrop_path || item.poster_path);

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);
        const videos = await tmdbApi.getVideos(category.movie, item.id);

        if (videos.results.length > 0) {
            const videoSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
            modal.querySelector('.modal__content > iframe').setAttribute('src', videoSrc);
        } else {
            modal.querySelector('.modal__content').innerHTML = 'No trailer';
        }

        modal.classList.toggle('active');
    };

    return (
        <div className={`hero-slide__item ${className}`} style={{ backgroundImage: `url(${background})` }}>
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button onClick={() => history.push('/movie/' + item.id)}>Watch now</Button>
                        <OutlineButton onClick={setModalActive}>Watch trailer</OutlineButton>
                    </div>
                </div>
                <div className="hero-slide__item__content__poster">
                    <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                </div>
            </div>
        </div>
    );
};

export default HeroSlide;
