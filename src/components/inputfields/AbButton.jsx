import React from 'react';

const AbButton = ({
    type = 'submit',
    className,
    text,
    handleClick,
}) => {
    return (
        <button
            onClick={handleClick}
            type={type}
            className={`bg-primary text-textColor text-center
                sm:font-bold text-[12px] lg:text-lg w-full sm:w-auto ${className}`}
        >
            {text}
        </button>
    );
};

export default AbButton;
