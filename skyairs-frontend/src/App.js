import { useGlobalContext } from "./context"
import { Loading } from "./components/Loading"

import Navbar from "./components/nav"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Search from "./components/search/search"
import Flight from "./components/flight/flight"

function App() {
  const { loading } = useGlobalContext()
  return (
    <BrowserRouter>
      
      {loading && <Loading />}
      <Routes>
        <Route path="/" element={<Flight />} exact></Route>
        <Route
          path="/search"
          element={<Search />}
        />
        <Route
          path="review"
          element={<Search />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
