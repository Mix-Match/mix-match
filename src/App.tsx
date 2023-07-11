import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Root from './pages/Root'
import Login from './pages/Login';
import Signup from './pages/Signup';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      // { path: "/", element: <Home /> },
      // { path: "/main", element: <Main />},
      { path: "/login", element: <Login />},
      { path: "/signup", element: <Signup />}
    ],
  },
]);

export default function App() {
  return (
  <RouterProvider 
    router={router}>
  </RouterProvider>
  );

}
