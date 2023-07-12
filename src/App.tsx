import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from './pages/Root';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Main from './pages/Main';
import Popular from './pages/Popular';
import Favorites from './pages/Favorites';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Login />},
      { path: "/favorites", element: <Favorites />},
      { path: "/main", element: <Main />},
      { path: "/popular", element: <Popular />},
      { path: "/signup", element: <Signup />}
    ],
  },
]);

export default function App() {
  return (
  <RouterProvider router={router}/>
  );
}
