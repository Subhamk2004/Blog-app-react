import React, { useId } from 'react'


// Below here, we're creating a functional component named Input using React.forwardRef. This allows the component to receive a ref and pass it down to a child element.

// The component accepts several props:

// label: For the input label text
// type: The input type, defaulting to 'text'
// className: Additional CSS classes, defaulting to an empty string
// ...props: This syntax collects any additional props passed to the component
// ref: This is the forwarded ref

let Input = React.forwardRef(function Input({
    label,
    type = 'text',
    className = '',
    ...props
}, ref) {
    let id = useId()
    return (
        <div className='mb-4'>
            {label && <label className='block text-gray-700 text-sm font-bold'
                htmlFor={id}>
                {label}
            </label>
            }
            <input
                type={type}
                className={`block w-full bg-gray-200 text-gray-700 
                    border ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})
export default Input