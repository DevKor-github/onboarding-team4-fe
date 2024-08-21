import './index.css'
import ChatPage from './pages/ChatPage';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import ChatRoomList from './pages/ChatRoomList';
import Layout from './pages/Layout';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route index element={<ChatRoomList />} />
        <Route path='chat/:chatRoomId' element={<ChatPage />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}


export default App
