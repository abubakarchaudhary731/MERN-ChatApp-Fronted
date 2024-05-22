import React from 'react';

const AbInputField = ({
    label,
    name,
    type,
    value,
    onchange,
    placeholder,
    error,
    className,
}) => {
    return (
        <div>
            <label htmlFor={name}> {label} </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onchange}
                placeholder={placeholder}
                className={`w-full px-5 text-lg rounded-lg border-2 ${className}
                 bg-secondary border-lightGray outline-primary  focus:outline-0 focus:ring-primary focus:border-primary`}
            />
            <p className='text-sm text-red-500'> {error} </p>
        </div>
    );
};

export default AbInputField;
