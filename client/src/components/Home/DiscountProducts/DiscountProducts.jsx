import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { FaCartPlus } from 'react-icons/fa'
import Container from '../../container/Container'
import { Autoplay } from 'swiper/modules'
import Button from '../../Button/Button'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import LoadingSpinner from '../../Spinner/LoadingSpinner'
import useAuth from '../../../hooks/useAuth'
import { Fade } from 'react-awesome-reveal';
import Heading from '../../Elements/Heading'

const DiscountProducts = () => {
    const { user } = useAuth()
    const [addedToCartIds, setAddedToCartIds] = useState([])
    const axiosSecure = useAxiosSecure()

    // Fetch discounted products using TanStack Query
    const { data: discountProducts = [], isLoading } = useQuery({
        queryKey: ['discountedMedicines'],
        queryFn: async () => {
            const res = await axiosSecure.get('/medicines/discounted')
            return res.data
        }
    })

    const handleAddToCart = async (medicine) => {
        const cartItem = {
            ...medicine,
            medicineId: medicine._id,
            userEmail: user?.email,
            quantity: 0,
            subtotal: 0,
        }
        delete cartItem._id

        try {
            const res = await axiosSecure.post('/carts', cartItem)
            if (res.data.insertedId) {
                toast.success(`${medicine.name} added to cart`)
                setAddedToCartIds(prev => [...prev, medicine._id])
            }
        } catch (err) {
            toast.error('Failed to add to cart')
        }
    }

    return (
        <>

            <Heading title={"Discounted Medicines"}></Heading>
            {isLoading ? (
                <LoadingSpinner></LoadingSpinner>
            ) : (
                <Swiper
                    spaceBetween={16}
                    slidesPerView={1.2}
                    breakpoints={{
                        640: { slidesPerView: 2.2 },
                        1024: { slidesPerView: 3.2 },
                    }}
                    grabCursor={true}
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                >
                    {discountProducts.map(product => {
                        const discount = product.discount
                        const newPrice = product.price
                        const oldPrice = Math.round(newPrice / (1 - discount / 100))

                        return (
                            <SwiperSlide key={product._id}>
                                <div className='
                                border border-white rounded-2xl shadow hover:shadow-lg transition-transform 
                                p-6 text-center space-y-4 my-5 relative group hover:scale-[1.02] overflow-hidden
                                flex flex-col items-center'
                                >
                                    {/* Responsive Image */}
                                    <div className='w-full h-48 md:h-56 lg:h-64 overflow-hidden rounded-md'>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className='w-full h-full object-contain '
                                        />
                                    </div>

                                    <h3 className='text-lg font-semibold'>{product.name}</h3>

                                    <div className='flex items-center gap-2 mt-1'>
                                        <p className='text-[#25A8D6] font-bold text-md'>৳{newPrice}</p>
                                        <p className='line-through text-sm'>৳{oldPrice}</p>
                                    </div>

                                    <div className='absolute top-3 left-3 bg-gradient-to-r from-[#6BDCF6] to-[#25A8D6] text-white text-xs font-semibold px-2 py-1 rounded-full'>
                                        -{discount}%
                                    </div>

                                    <Button
                                        wideFull={true}
                                        onClick={() => handleAddToCart(product)}
                                        disabled={addedToCartIds.includes(product._id)}
                                        label={
                                            <span className='flex items-center justify-center gap-2'>
                                                <FaCartPlus />
                                                Add To Cart
                                            </span>
                                        }
                                    />
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            )}
        </>
    )

}

export default DiscountProducts
