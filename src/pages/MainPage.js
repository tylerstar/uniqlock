import React from 'react';
import Clock from '../components/Clock';
import Menu from "../components/Menu";
import Music from "../components/Music";
import { MusicPlayerProvider } from "../contexts/MusicPlayContext";

const MainPage = () => {
  return (
    <>
      <Menu/>
      <MusicPlayerProvider>
        <Music/>
      </MusicPlayerProvider>
      <Clock/>
    </>
  );
};

export default MainPage;