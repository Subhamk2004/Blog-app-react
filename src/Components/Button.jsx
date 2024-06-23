import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-green-500',
    textColor = 'text-white',
    className = '',
    ...props

}) {
  return (
    <button className={`p-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button

// this mfcking children is nothing but props.children or something like that.

// The rest operator (...props) at the end captures any other props that might be passed to the component.