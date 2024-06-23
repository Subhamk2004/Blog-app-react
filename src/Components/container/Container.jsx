import React from 'react'

function Container({children}) {
  return (
    <div className=' w-full max-w-7xl mx-auto '>
        {children}
    </div>
  )
}

export default Container

// Container components in React that accept children are like managers in a restaurant. They handle the behind-the-scenes work (data fetching, logic) while letting the child components (chefs, waiters) focus on the presentation (UI).

//  This keeps things organized, reusable, and adaptable for your React application.
