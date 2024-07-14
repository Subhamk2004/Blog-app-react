import React from 'react'
import { Container, Logo, LogoutBtn } from '../index.js'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Header() {
  let authStatus = useSelector((state) => state.auth.status)

  let navigate = useNavigate()

  let navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus
    },
    {
      name: 'Sign Up',
      slug: '/signup',
      active: !authStatus
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus
    }
  ]

  let a = 10;
  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                  onClick={() => navigate(item.slug)}
                  className='inline-block px-4 py-2 font-semibold rounded-md text-white bg-gray-800 hover:bg-gray-950'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
            {/* the above is a very common react syntax in which we take a variable in {var && ()} if the var condition is true or false based on that the condition in the () is executed */}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header

// Link and useNavigate from React Router for navigation

// The navItems array defines the navigation items, each with a name, slug (URL), and an active status that depends on the authentication state.

// This return statement renders the header:

// It uses the Container component for layout
// The Logo is linked to the home page
// It maps over navItems, rendering buttons for active items
// Each button uses the navigate function to change routes when clicked
// If authenticated, it shows a LogoutBtn