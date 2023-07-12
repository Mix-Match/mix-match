import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from './pages/Root';
import Login from './pages/Login';
import Signup from './pages/Signup';
// import Main from './pages/Main';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      // { path: "/", element: <Home /> },
      { path: "/", element: <Login />},
      { path: "/main", element: <Main />},
      { path: "/signup", element: <Signup />}
    ],
  },
]);

export default function App() {
  return (
  <RouterProvider router={router}/>
  );
}
