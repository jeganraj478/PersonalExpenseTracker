import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Expense from './Components/Expense';
import Budget from './Components/Budget';
import Category from './Components/Category'
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Signup from './Components/Signup'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools';
import Auth from './Components/Auth';

const queryClient = new QueryClient();

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    },
    {
      element: <Auth />,
      children: [

        {
          path: '/expense-dashboard',
          element: <Dashboard />
        },
        {
          path: '/expense',
          element: <Expense />
        },
        {
          path: '/category',
          element: <Category />
        },
        {
          path: '/budget',
          element: <Budget />
        }
      ]
    },
    {
      path: '*',
      element: <p>404 Error - Not Found</p>
    }

  ])
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>


  );
}

export default App;
