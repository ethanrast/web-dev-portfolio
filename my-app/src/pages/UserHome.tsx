import React from 'react';
import logo from './logo.svg';
import '../App.css';
import Navigation from '../nav-components/NavigationUser';
import Main from '../components/UserHomeMain';

function UserHomePage() {
  return (
    <div className="App row ">
      <Navigation />
      <Main />
    </div>
  );
}

export default UserHomePage;