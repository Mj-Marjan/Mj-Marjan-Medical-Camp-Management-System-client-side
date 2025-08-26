import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Banner from '../Components/Slider/Banner';
import LatestCamp from '../Components/LatestCamps/LatestCamp';
import FeedbackAndRatings from '../Components/FeedbackAndRatings/FeedbackAndRating';
import MedicalTips from '../Components/MedicalTips/MedicalTips';
import TeamSlider from '../Pages/Team/TeamSlider';
import FaqSection from '../Pages/FaqSection/FaqSection';
import UpcomingCamps from '../Pages/UpcomingCamps';
import ContactSection from '../Pages/ContactSection';

const Home = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000, // animation duration in ms
            once: true,     // animation runs only once
        });
    }, []);

    return (
        <div>
            <div data-aos="fade-down">
                <Banner />
            </div>

            <div data-aos="fade-up">
                <LatestCamp />
            </div>

            <div data-aos="zoom-in">
                <FeedbackAndRatings />
            </div>

            <div data-aos="fade-right">
                <MedicalTips />
            </div>

            <div data-aos="flip-left">
                <FaqSection />
            </div>

            <div data-aos="fade-up">
                <TeamSlider />
            </div>

            {/* Add more sections as needed */}
            <div data-aos="fade-up">
                <UpcomingCamps />
            </div>
            <div data-aos="zoom-in">
                <ContactSection />
            </div>
        </div>
    );
};

export default Home;
