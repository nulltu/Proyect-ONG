import React from 'react';
import propTypes from 'prop-types';
import { PlusCircleOutlined } from '@ant-design/icons';
import './slider.css';

const HeaderSlider = ({ setToggleMenu }) => (
  <div className="headerContainer">
    <p className="titleStyle">Sliders</p>
    <PlusCircleOutlined
      className="iconStyle"
      title="Agregar Slider"
      onClick={() => setToggleMenu(1)}
    />
  </div>
);

HeaderSlider.propTypes = {
  setToggleMenu: propTypes.func.isRequired,
};

export default HeaderSlider;
