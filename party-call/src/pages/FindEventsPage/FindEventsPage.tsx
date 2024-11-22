import React from "react";
import EventsList from "../../components/EventsList/EventsList";
import FindEventsBanner from "../../components/FindEvents/FindEventsBanner";
import "./FindEventsPage.css";

const FindEventsPage: React.FC = () => {
  return (
    <div>
      <FindEventsBanner />
      <h1 className="events-title">Explore Events</h1>
      <EventsList />
    </div>
  );
};

export default FindEventsPage;
