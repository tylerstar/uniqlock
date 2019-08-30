import React from 'react';
import { connect } from "react-redux";
import Clock from '../components/Clock';
import Menu from "../components/Menu";
import Music from "../components/Music";
import './MainPage.css';

const MainPage = ({ currentSeries }) => {
  return (
    <div className="main-page">
      <Menu className="menu"/>
      <Music />
      <Clock series={currentSeries} />
    </div>
  );
};

const mapState = state => ({
  currentSeries: state.media.currentSeries,
});
export default connect(
  mapState
)(MainPage);