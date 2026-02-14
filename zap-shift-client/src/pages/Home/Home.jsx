import React from 'react';
import Banner from './Banner';
import OurServices from '../../components/services/OurServices';
import BrandSlider from '../../components/brands/BrandSlider';
import Benefits from '../../components/benefits/Benefits';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <OurServices></OurServices>
            <BrandSlider></BrandSlider>
         <Benefits></Benefits>
        </div>
    );
};

export default Home;