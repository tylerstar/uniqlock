import React from 'react';
import { connect } from "react-redux";
import Clock from '../components/Clock';
import Menu from "../components/Menu";
import Music from "../components/Music";
import './MainPage.css';

const MainPage = ({ currentSeries, currentColour }) => {
  const style = {
    "background-color": currentColour
  };

  return (
    <div className="main-page" style={style}>
      <Menu className="menu" />
      <Music />
      <Clock series={currentSeries} />
    </div>
  );
};

const mapState = state => ({
  currentSeries: state.media.currentSeries,
  currentColour: state.media.currentColour
});
export default connect(
  mapState
)(MainPage);