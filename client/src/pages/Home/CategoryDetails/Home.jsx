import React from 'react';
import Slider from '../../../components/Home/Slider/Slider';
import Category from '../../../components/Home/Category/Category';
import DiscountProducts from '../../../components/Home/DiscountProducts/DiscountProducts';
import LatestNews from '../../../components/Home/LatestNews/LatestNews';
import FAQ from '../../../components/Home/FAQ/FAQ';
import { Helmet } from 'react-helmet'
import Review from '../../../components/Home/Review/Review';
import About from '../../../components/Home/About/About';
import ContactInfo from '../../../components/Home/ContactInfo/ContactInfo';
import Container from '../../../components/container/Container';
import VerticalSpace from '../../../components/container/VerticalSpace';
import { Fade } from 'react-awesome-reveal';

const Home = () => {
    return (
        <>
            <Helmet><title>MedEasy | Home</title></Helmet>
            <div>
                <Container>
                    <Slider></Slider>
                </Container>

                <Container>
                    <VerticalSpace>
                        <Fade duration={3000}>
                            <Category></Category>
                        </Fade>
                    </VerticalSpace>
                </Container>

                <Container>
                    <VerticalSpace>
                        <Fade duration={3000}>
                            <DiscountProducts></DiscountProducts>
                        </Fade>
                    </VerticalSpace>
                </Container>

                <Container>
                    <VerticalSpace>
                        <Fade duration={3000}>
                            <About></About>
                        </Fade>
                    </VerticalSpace>
                </Container>

                <Container>
                    <VerticalSpace>
                        <Fade duration={3000}>
                            <Review></Review>
                        </Fade>
                    </VerticalSpace>
                </Container>

                <Container>
                    <VerticalSpace>
                        <Fade duration={3000}>
                            <LatestNews></LatestNews>
                        </Fade>
                    </VerticalSpace>
                </Container>

                <Container>
                    <VerticalSpace>
                        <Fade duration={3000}>
                            <FAQ></FAQ>
                        </Fade>
                    </VerticalSpace>
                </Container>

                <Container>
                    <VerticalSpace>
                        <Fade duration={3000}>
                            <ContactInfo></ContactInfo>
                        </Fade>
                    </VerticalSpace>
                </Container>








            </div>
        </>

    );
};

export default Home;