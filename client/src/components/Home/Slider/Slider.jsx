import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../Spinner/LoadingSpinner'
import { Link } from 'react-router'
import { motion } from 'framer-motion'

// Variants for staggered text animation
const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
    },
}

const textItemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const imageVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut', delay: 0.1 } },
}

const Slider = () => {
    const axiosSecure = useAxiosSecure()
    const [activeIdx, setActiveIdx] = useState(0)

    const { data: slides = [], isLoading } = useQuery({
        queryKey: ['advertised-medicines'],
        queryFn: async () => {
            const res = await axiosSecure.get('/medicines/advertised')
            return res.data
        },
    })

    return (
        <div className="max-w-7xl shadow-lg border border-white  mx-auto rounded-xl py-10 px-6">
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000 }}
                    loop
                    className="rounded-lg"
                    onSwiper={(sw) => setActiveIdx(sw.realIndex)}
                    onSlideChange={(sw) => setActiveIdx(sw.realIndex)}
                >
                    {slides.map((slide, i) => (
                        <SwiperSlide key={slide._id}>
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 p-6 md:p-10">
                                {/* Left: Text */}
                                <motion.div
                                    className="flex-[2] w-full text-center md:text-left space-y-4 md:space-y-6 break-words max-w-full"
                                    variants={containerVariant}
                                    initial="hidden"
                                    animate={activeIdx === i ? 'visible' : 'hidden'}
                                >
                                    <motion.h3
                                        className="text-xl sm:text-2xl lg:text-4xl font-bold text-[#25A8D6] leading-snug"
                                        variants={textItemVariant}
                                    >
                                        {slide.name}
                                    </motion.h3>

                                    <motion.p
                                        className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl"
                                        variants={textItemVariant}
                                    >
                                        {slide.description || 'No description provided.'}
                                    </motion.p>

                                    <motion.div
                                        className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start"
                                        variants={textItemVariant}
                                    >
                                        <Link to="/shop">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="btn btn-info w-full sm:w-auto"
                                            >
                                                Go to Shop
                                            </motion.button>
                                        </Link>
                                        <Link to="/discounted-products">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="btn btn-outline btn-info w-full sm:w-auto"
                                            >
                                                Discounted Products
                                            </motion.button>
                                        </Link>
                                    </motion.div>
                                </motion.div>

                                {/* Right: Image */}
                                <motion.div
                                    className="flex-[1] w-full md:w-1/3"
                                    initial="hidden"
                                    animate={activeIdx === i ? 'visible' : 'hidden'}
                                    variants={imageVariant}
                                >
                                    <img
                                        src={slide.image}
                                        alt={slide.name}
                                        className="w-full object-contain rounded-lg"
                                    />
                                </motion.div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    )
}

export default Slider
