import React, { useContext } from 'react';
import { AuthContext } from '../../../../providers/AuthProvider';
import cover from "../../../../assets/images/cover.jpg"

const CommonProfile = () => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return (
            <div className="flex justify-center items-center h-full min-h-screen">
                <p className="text-lg">Loading user data...</p>
            </div>
        );
    }



    const role = user.role || 'Customer';

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 ">
            <div className="w-full max-w-3xl border border-white rounded-xl shadow-lg overflow-hidden">
                {/* Cover Photo */}
                <div className="relative h-40">
                    <img
                        src={cover}
                        alt="Cover"
                        className="w-full h-full object-cover"
                    />
                    {/* Profile Image */}
                    <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                        <img
                            src={user.photoURL || 'https://via.placeholder.com/150'}
                            alt="Profile"
                            className="w-32 h-32 rounded-full  object-cover shadow-md"
                        />
                    </div>
                </div>

                {/* User Info */}
                <div className="pt-20 pb-8 px-6 text-center">
                    <h2 className="text-2xl font-bold mb-2">{user.displayName || 'No Name'}</h2>
                    <p className=" mb-1">
                        <strong>Email:</strong> {user.email}
                    </p>
                    <p className=" mb-4">
                        <strong>Role:</strong> {role}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CommonProfile;
