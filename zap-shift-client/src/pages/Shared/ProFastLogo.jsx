import React from 'react';
import logo from '../../assets/logo/logo.png';
const ProFastLogo = () => {
    return (
        <div className='flex items-center gap-2'>
            <img src={logo} alt="" />
            <p className="text-xl font-bold">Pro Fast</p>
        </div>
    );
};

export default ProFastLogo;