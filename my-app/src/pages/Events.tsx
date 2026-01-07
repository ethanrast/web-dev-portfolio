import React from 'react';
import logo from './logo.svg';
import '../App.css';
import Navigation from '../nav-components/NavigationUser';
import Main from '../components/UserHomeMain';
import EventsList from '../components/EventList';

function Events() {
  return (
    <div className="App row ">
      <Navigation />
      <EventsList />
    </div>
  );
}

export default Events;