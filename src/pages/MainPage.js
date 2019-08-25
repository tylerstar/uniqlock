import React from 'react';
import Clock from '../components/Clock';
import Menu from "../components/Menu";
import Music from "../components/Music";

const MainPage = () => {
  return (
    <>
      <Menu/>
      <Music/>
      <Clock/>
    </>
  );
};

export default MainPage;