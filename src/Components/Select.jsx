import React, { useId } from 'react'

function Select({
    options,
    label,
    className = '',
    ...props
    
}, ref) {
    let id = useId()
    return (
        <div className='w-full'>
            {label && <label htmlFor={id} className=''></label>}
            <select
                {...props}
                id={id}
                className={`block w-full bg-gray-200 text-gray-700 
                    border ${className}`}
                ref={ref}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                        </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)

// The above is a a simple example of how to use forwardRef.