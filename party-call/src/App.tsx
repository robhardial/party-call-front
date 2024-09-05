import { Route, Routes } from "react-router-dom"
import Layout from "./pages/Layout"
import LandingPage from "./pages/LandingPage/LandingPage"
import FindEventsPage from "./pages/FindEventsPage/FindEventsPage"
import EventDetailsPage from "./pages/EventDetailsPage/EventDetailsPage"

function App() {

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<LandingPage/>}/>
          <Route path={"find-events"} element={<FindEventsPage/>}/>
          <Route path="events/:eventName" element={<EventDetailsPage/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
