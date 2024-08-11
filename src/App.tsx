import {BrowserRouter, Route, Routes} from "react-router-dom"
import HomePage from "./pages/home"
import LoginPage from "./pages/login"
import Adminpage from "./pages/Admin"
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<Adminpage></Adminpage>} />
      </Routes>
    </BrowserRouter>
  )
}