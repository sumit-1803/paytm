// Appbar.js
import React from 'react';

export const Appbar = ({ user }) => {
    console.log('User in Appbar:', user);

    const getInitials = (user) => {
        if (!user) return "";

        const { firstName, lastName } = user;
        return `${firstName[0]}${lastName[0]}`;
    };

    return (
        <div className="shadow h-14 flex justify-between items-center">
            <div className="flex flex-col justify-center h-full ml-4">
                PayTM
            </div>
            {user ? (
                <div className="flex items-center">
                    <div className="flex flex-col justify-center h-full mr-4">
                        Hello {user.firstName}
                    </div>
                    <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center mt-1 mr-2">
                        <div className="flex flex-col justify-center h-full text-xl text-white">
                            {getInitials(user)}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center">
                    <div className="flex flex-col justify-center h-full mr-4">
                        Hello Guest
                    </div>
                </div>
            )}
        </div>
    );
};
