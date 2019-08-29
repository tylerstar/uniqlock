import React, { useState, useEffect } from 'react';
import Clock from '../components/Clock';
import Menu from "../components/Menu";
import Music from "../components/Music";
import './MainPage.css';

const MainPage = () => {
  const [series, setSeries] = useState(2);

  const getRandomSeries = () => {
    const series = [2, 3, 4, 5, 6];
    return series[Math.floor(Math.random() * series.length)];
  };

  return (
    <div className="main-page">
      <Menu className="menu" />
      <Music />
      <Clock series={series} />
    </div>
  );
};

export default MainPage;