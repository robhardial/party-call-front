import { Route, Routes } from "react-router-dom"
import Layout from "./pages/Layout"
import LandingPage from "./pages/LandingPage/LandingPage"
import FindEventsBanner from "./components/FindEvents/FindEventsBanner"
import EventDetails from "./components/EventDetails/EventDetails"

function App() {

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<LandingPage/>}/>
          <Route path={"find-events"} element={<FindEventsBanner/>}/>
          <Route path="events/:eventName" element={<EventDetails/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
