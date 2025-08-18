import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import Heading from "../../Elements/Heading";

const Review = () => {
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.3,
    });

    return (
        <section ref={ref} className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Heading */}
            <Heading title={"Our Achievements"} />

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center mt-8">
                {/* Patients */}
                <div className="flex flex-col items-center">
                    <p className="text-3xl sm:text-4xl lg:text-6xl font-bold ">
                        {inView ? <CountUp end={1000000} duration={2} separator="," /> : "0"}+
                    </p>
                    <p className="text-sm sm:text-base mt-2">Satisfied Patients</p>
                </div>

                {/* Medicines */}
                <div className="flex flex-col items-center">
                    <p className="text-3xl sm:text-4xl lg:text-6xl font-bold ">
                        {inView ? <CountUp end={2000} duration={2} separator="," /> : "0"}+
                    </p>
                    <p className="text-sm sm:text-base mt-2">Medicines Available</p>
                </div>

                {/* Orders */}
                <div className="flex flex-col items-center">
                    <p className="text-3xl sm:text-4xl lg:text-6xl font-bold ">
                        {inView ? <CountUp end={8500000} duration={2} separator="," /> : "0"}+
                    </p>
                    <p className="text-sm sm:text-base mt-2">Orders Delivered</p>
                </div>

                {/* Rating */}
                <div className="flex flex-col items-center">
                    <p className="text-3xl sm:text-4xl lg:text-6xl font-bold ">4.8/5</p>
                    <p className="text-sm sm:text-base mt-2">Customer Rating</p>
                </div>

                {/* Years of Service */}
                <div className="flex flex-col items-center">
                    <p className="text-3xl sm:text-4xl lg:text-6xl font-bold ">
                        {inView ? <CountUp end={10} duration={2} /> : "0"}
                    </p>
                    <p className="text-sm sm:text-base mt-2">Years of Service</p>
                </div>

                {/* Online Support */}
                <div className="flex flex-col items-center">
                    <p className="text-3xl sm:text-4xl lg:text-6xl font-bold ">24/7</p>
                    <p className="text-sm sm:text-base mt-2">Online Support</p>
                </div>
            </div>
        </section>
    );
};

export default Review;
