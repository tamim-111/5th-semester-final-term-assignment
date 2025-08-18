import React from "react";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaCapsules, FaLaptopMedical, FaUsers, FaAward, FaHeadset } from 'react-icons/fa';
import Container from "../../container/Container";
import { Fade } from "react-awesome-reveal";
import Heading from "../../Elements/Heading";
import { Link } from "react-router";

const About = () => {
    return (
        <>
            <Fade duration={3000}>
                {/* Page header */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <Heading title={"About MedEasy"}></Heading>
                    <p className="text-lg -mt-8 max-w-3xl mx-auto leading-relaxed ">
                        MedEasy is your trusted online pharmacy — making healthcare simple, affordable, and accessible.
                        From prescription medicines to wellness products, we deliver right to your doorstep with care and convenience.
                    </p>
                </div>

                {/* Why Choose Us */}
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 mb-24">
                    <img
                        src="https://medeasy.health/_next/image?url=https%3A%2F%2Fapi.medeasy.health%2Fmedia%2Fsliders%2Fadp-3.png&w=3840&q=100"
                        alt="Pharmacist assisting a patient"
                        className="rounded-2xl shadow-xl w-full md:w-1/2 object-cover"
                        loading="lazy"
                    />

                    <article className="md:w-1/2 space-y-6 text-center">
                        <h2 className="text-4xl font-bold text-[#25A8D6]">Why Choose MedEasy?</h2>
                        <p className="leading-relaxed ">
                            We combine modern technology with expert healthcare support to make your pharmacy experience seamless.
                            Order prescriptions, consult with pharmacists, and get medicines delivered without leaving your home.
                        </p>
                        <p className="leading-relaxed ">
                            Quality and trust are at the heart of everything we do. All medicines are sourced from licensed suppliers,
                            ensuring safety and authenticity with every order.
                        </p>
                    </article>
                </div>

                {/* Company Timeline */}
                <section className="mb-24 px-4">
                    <h2 className="text-4xl font-bold text-center mb-10 text-[#25A8D6]">Our Journey</h2>
                    <VerticalTimeline>
                        <VerticalTimelineElement
                            contentStyle={{ background: '#f9fafb', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                            contentArrowStyle={{ borderRight: '7px solid #e5e7eb' }}
                            date="2015"
                            iconStyle={{ background: '#25A8D6', color: '#fff' }}
                            icon={<FaCapsules />}
                        >
                            <h3 className="text-black font-semibold">Founded MedEasy</h3>
                            <p className="text-gray-700">Started with a vision to simplify access to essential medicines for everyone.</p>
                        </VerticalTimelineElement>

                        <VerticalTimelineElement
                            contentStyle={{ background: '#f9fafb', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                            contentArrowStyle={{ borderRight: '7px solid #e5e7eb' }}
                            date="2018"
                            iconStyle={{ background: '#25A8D6', color: '#fff' }}
                            icon={<FaLaptopMedical />}
                        >
                            <h3 className="text-black font-semibold">Launched Online Platform</h3>
                            <p className="text-gray-700">Introduced our website & app, making it easy to order medicines online.</p>
                        </VerticalTimelineElement>

                        <VerticalTimelineElement
                            contentStyle={{ background: '#f9fafb', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                            contentArrowStyle={{ borderRight: '7px solid #e5e7eb' }}
                            date="2020"
                            iconStyle={{ background: '#25A8D6', color: '#fff' }}
                            icon={<FaUsers />}
                        >
                            <h3 className="text-black font-semibold">1 Million+ Patients Served</h3>
                            <p className="text-gray-700">A milestone showing the trust of patients across the country.</p>
                        </VerticalTimelineElement>

                        <VerticalTimelineElement
                            contentStyle={{ background: '#f9fafb', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                            contentArrowStyle={{ borderRight: '7px solid #e5e7eb' }}
                            date="2022"
                            iconStyle={{ background: '#25A8D6', color: '#fff' }}
                            icon={<FaHeadset />}
                        >
                            <h3 className="text-black font-semibold">24/7 Customer Support</h3>
                            <p className="text-gray-700">Launched round-the-clock pharmacist consultations and support.</p>
                        </VerticalTimelineElement>

                        <VerticalTimelineElement
                            contentStyle={{ background: '#f9fafb', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                            contentArrowStyle={{ borderRight: '7px solid #e5e7eb' }}
                            date="2024"
                            iconStyle={{ background: '#25A8D6', color: '#fff' }}
                            icon={<FaAward />}
                        >
                            <h3 className="text-black font-semibold">Awarded Best Online Pharmacy</h3>
                            <p className="text-gray-700">Recognized for safe, affordable, and accessible healthcare solutions.</p>
                        </VerticalTimelineElement>
                    </VerticalTimeline>
                </section>

                {/* Call to Action */}
                <div className="text-center">
                    <Link to='/shop'>
                        <button className="btn btn-info">Explore Medicines</button>
                    </Link>
                </div>
            </Fade>
        </>
    );
};

export default About;
