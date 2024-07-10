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

//  The use of forwardRef allows parent components to get a reference to the actual input element if needed.

// Why use forwardRef:

// Ref Forwarding: It allows a component to take a ref prop and pass it down to a child component.

// Reusability: It makes components more reusable, especially when they're meant to be used as wrappers for native elements like inputs.

// Imperative Actions: It enables parent components to perform imperative actions on child elements (like focusing an input).

// Composition: It helps in creating higher-order components that don't break the ref chain.