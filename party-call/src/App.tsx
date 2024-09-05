import { Route, Routes } from "react-router-dom"
import Layout from "./pages/Layout"
import LandingPage from "./pages/LandingPage/LandingPage"
import FindEventsPage from "./pages/FindEventsPage/FindEventsPage"
import EventDetailsPage from "./pages/EventDetailsPage/EventDetailsPage"
import LoginBox from "./components/Login/LoginBox"

function App() {

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<LandingPage/>}/>
          <Route path={"find-events"} element={<FindEventsPage/>}/>
          <Route path="events/:eventName" element={<EventDetailsPage/>}/>
          <Route path="login" element={<LoginBox/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
