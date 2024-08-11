import { Route, Routes} from "react-router-dom"
import HomePage from "./pages/home"
import LoginPage from "./pages/login"
import Adminpage from "./pages/Admin"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
export default function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<Adminpage></Adminpage>} />
      </Routes>
    </QueryClientProvider>
  )
}