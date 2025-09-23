import React from 'react';
import Banner from '../components/Home/Banner';
import HowItWorksSection from '../components/Home/HowItWorksSection';
import Services from '../components/Home/Services';
import Partners from '../components/Home/Partners';
import Benefit from '../components/Home/Benefit';
import Marchent from '../components/Home/Marchent';

const HomePage = () => {
    return (
        <div>
            <Banner/>
            <HowItWorksSection/>
            <Services/>
            <div className="border-t-2 border-dotted border-gray-400 my-8"></div>
            <Partners/>
              <div className="border-t-2 border-dotted border-gray-400 my-8"></div>
            <Benefit/>
             <div className="border-t-2 border-dotted border-gray-400 my-8"></div>
             <Marchent/>
        </div>
    );
};

export default HomePage;