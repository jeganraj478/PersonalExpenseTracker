import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Expense from './Components/Expense';
import Budget from './Components/Budget';
import Category from './Components/Category'
import Dashboard from './Components/Dashboard';

import { QueryClient,QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient=new QueryClient();

const router=createBrowserRouter([
  {
    path:'/',
    element:<Dashboard />
  },
  {
    path:'/expense',
    element:<Expense />
  },
  {
    path:'/category',
    element:<Category />
  },
  {
    path:'/budget',
    element:<Budget />
  }

])


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
   

  );
}

export default App;
