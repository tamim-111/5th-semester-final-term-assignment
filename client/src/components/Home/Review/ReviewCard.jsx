import React from "react";

const ReviewCard = ({ review }) => {
    const { name, time, img, feedbacks } = review;

    return (
        <div className="bg-white shadow-md flex flex-col w-full max-w-lg p-6 mx-auto rounded-xl border border-[#e0f7ff] hover:shadow-lg hover:scale-[1.02] transition duration-300">
            {/* User Info */}
            <div className="flex items-center gap-4 mb-4">
                <img
                    src={img}
                    alt="Customer"
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#25A8D6]"
                />
                <div>
                    <h4 className="font-semibold text-[#25A8D6]">{name}</h4>
                    <span className="text-xs text-gray-500">{time}</span>
                </div>
            </div>

            {/* Feedback */}
            <div className="space-y-2 text-gray-700 text-sm leading-relaxed">
                {feedbacks.map((feedback, index) => (
                    <p key={index} className="italic">“{feedback}”</p>
                ))}
            </div>
        </div>
    );
};

export default ReviewCard;
