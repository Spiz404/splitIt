import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider, useSelector } from 'react-redux'
import store from './store'
import App from './App.jsx'
import Root from './routes/root'
import {
  createBrowserRouter,
  RouterProvider,
  redirect
} from 'react-router-dom';


import ErrorPage from './routes/error-page'
import Groups from './routes/groups'
import GroupPage from './routes/groupPage'
import LoginPage from './routes/loginPage'
import RegisterPage from './routes/registerPage'
import InvitationPage from './routes/invitationPage'


const Index = () => {
  
  const {isLogged} = useSelector((state) => state.user);
  const {fulfilledRegistration} = useSelector((state) => state.registration);

  const router = createBrowserRouter(
    [
      {
        path : '/',
        element : <Root/>,
        errorElement : <ErrorPage/>,
        children: [
          {
            path: "groups",
            element: <Groups />
            
          },
          {
            path: "groups/:groupName",
            element: <GroupPage />
          },
          {
            path : "login",
            loader : () => (isLogged  ? redirect('/groups') : null),
            element : <LoginPage/>
          },
          {
            path: "register",
            loader : () => (fulfilledRegistration ? redirect('/login') : null),
            element : <RegisterPage/>
          },
          {
            path : 'groups/invite/:invitationLink',
            element : <InvitationPage/>
          }
        ],
      },
      
    ]
  );

  return <RouterProvider router = {router}/>
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
    <Index/>
  </Provider>,
)
