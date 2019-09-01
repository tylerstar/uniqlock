import React from 'react';
import Clock from '../components/Clock';
import Menu from "../components/Menu";
import Music from "../components/Music";
import './MainPage.css';

const MainPage = () => {
  return (
    <div className="main-page">
      <Menu className="menu"/>
      <Music />
      <Clock />
    </div>
  );
};

export default MainPage;