import React from 'react';
import Banner from './Banner/Banner';
import OurCommiunity from './OurCommiunity/OurCommiunity';
import Testimonials from './StudentsTestimonials/Testimonials';
import HappyStudents from './HappyStudents/HappyStudents';
import WhatYouLearn from './WhatYouLearn/WhatYouLearn';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            
            <HappyStudents></HappyStudents>
            <Testimonials></Testimonials>
            <OurCommiunity></OurCommiunity>
            <WhatYouLearn></WhatYouLearn>
        </div>
    );
};

export default Home;