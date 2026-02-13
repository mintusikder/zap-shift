import React from 'react';
import Banner from './Banner';
import OurServices from '../../components/services/OurServices';
import BrandSlider from '../../components/brands/BrandSlider';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <OurServices></OurServices>
            <BrandSlider></BrandSlider>
        </div>
    );
};

export default Home;