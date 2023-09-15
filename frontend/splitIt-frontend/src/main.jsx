import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import App from './App.jsx'
import Root from './routes/root'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import './index.css'
import ErrorPage from './routes/error-page'
import Groups from './routes/groups'
import GroupPage from './routes/groupPage'
import LoginPage from './routes/loginPage'
import RegisterPage from './routes/registerPage'

const router = createBrowserRouter(
  [
    {
      path : '/',
      element : <Root/>,
      errorElement : <ErrorPage/>,
      children: [
        {
          path: "groups",
          element: <Groups />,
        },
        {
          path: "groups/:groupName",
          element: <GroupPage />
        },
        {
          path : "login",
          element : <LoginPage/>
        },
        {
          path: "register",
          element : <RegisterPage/>
        }
      ],
    },
    
  ]
);
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
    <RouterProvider router = {router}/>
  </Provider>,
)
