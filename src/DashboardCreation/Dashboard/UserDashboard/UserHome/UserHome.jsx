import React, { useContext } from 'react';
import { AuthContext } from '../../../../providers/AuthProvider';

const UserHome = () => {
    const {user} = useContext(AuthContext);
    return (
        <div>
            <div>
                <h1 className="text-3xl">
                    <span>Hi, welcome</span>
                </h1>
            </div>
        </div>
    );
};

export default UserHome;