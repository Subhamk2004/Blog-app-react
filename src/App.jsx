import './App.css'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
//  It allows these components to dispatch actions to the Redux store

import authService from './appwrite/auth.js';
import { login, logout } from './Store/authSlice';
import {Header, Footer} from './Components/index.js';
import { Outlet } from'react-router-dom';



function App() {

  let [loading, setLoading] = useState(true);
// the above is a loading state, which is true by default when we will get data from appwrite we will set it to false,
// until then we will see a loading screen

  let dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        console.log('logged in');
        dispatch(login({userData}));
      }
      else{
        console.log('not logged in');
        dispatch(logout());
      }
    })
    .finally(() => setLoading(false))
  }, []);

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block '>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : (null);
}

export default App
