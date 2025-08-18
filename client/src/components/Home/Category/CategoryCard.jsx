import React from 'react'
import { Link } from 'react-router'
import { Fade } from 'react-awesome-reveal';

const CategoryCard = ({ id, name, image, count }) => {
    return (
        <>

            <div className="border border-white rounded-2xl shadow hover:shadow-lg transition-transform hover:scale-105 flex flex-col items-center p-6 text-center space-y-4">

                {/* Icon / Image */}
                <div className="w-20 h-20 flex items-center justify-center bg-[#e0f7ff] rounded-full">
                    <img
                        src={image}
                        alt={name}
                        className="w-12 h-12 object-contain"
                    />
                </div>

                {/* Title & Count */}
                <div className="space-y-1">
                    <h3 className="text-lg md:text-xl font-semibold text-[#25A8D6]">{name}</h3>
                    <p className="text-sm">{count} medicines</p>
                </div>

                {/* Button */}
                <Link to={`/categoryDetails/${id}`} className="w-full">
                    <button className="btn btn-info w-full mt-2">Explore</button>
                </Link>
            </div>
        </>
    )
}

export default CategoryCard
