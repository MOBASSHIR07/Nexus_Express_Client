import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from '../../assets/assets/banner/banner1.png'
import banner2 from '../../assets/assets/banner/banner2.png'
import banner3 from '../../assets/assets/banner/banner2.png'
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
    return (
        <div>
             <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false} >
                <div>
                    <img src={banner1} />
                    <p className="legend">Always on Time</p>
                </div>
                <div>
                    <img src={banner2} />
                    <p className="legend">Fast PickUp</p>
                </div>
                <div>
                    <img src={banner3} />
                    <p className="legend">Fast Delivery</p>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;