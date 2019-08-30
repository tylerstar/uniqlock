import React from 'react';
import { connect } from "react-redux";
import { Icon } from '@blueprintjs/core';
import "./Menu.css";

const Menu = ({ currentColour }) => {
  const style = {
    "backgroundColor": currentColour,
  };

  return (
    <div className="menu" style={style}>
      <span className="text">MENU</span>
      <Icon icon="arrow-left" className="arrow-left" color="white" />
    </div>
  );
};

const mapState = state => ({
  currentColour: state.media.currentColour
});
export default connect(
  mapState
)(Menu);