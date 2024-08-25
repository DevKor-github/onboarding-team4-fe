import './index.css'
import ChatPage from './pages/ChatPage';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import ChatRoomListPage from './pages/ChatRoomListPage';
import Layout from './pages/Layout';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route index element={<ChatRoomListPage />} />
        <Route path='chat/:chatRoomId' element={<ChatPage />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}


export default App
