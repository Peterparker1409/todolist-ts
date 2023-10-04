import { Routes, Route } from 'react-router-dom'
import TodoPage from './pages/TodoPage'
export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<TodoPage/>} />



      </Routes>
    </>
  )
}