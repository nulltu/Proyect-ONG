import React, { useState } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import slidesActions from '../../redux/actions/slidesActions';
import './slider.css';
import HeaderSlider from './HeaderSlider';
import SliderFrame from './SliderFrame';
import AddSlider from './AddSlider';
import EditSlider from './EditSlider';

const Slider = (props) => {
  const [toggleMenu, setToggleMenu] = useState(0);
  const [selectedSlide, setSelectedSlide] = useState(null);
  const { slides, getDataSlides } = props;

  return (
    <>
      {toggleMenu === 0 ? (
        <div className="mainContainer">
          <HeaderSlider setToggleMenu={setToggleMenu} />
          {slides.map((obj) => (
            <SliderFrame
              key={obj.id}
              slide={obj}
              getDataSlides={getDataSlides}
              setSelectedSlide={setSelectedSlide}
              setToggleMenu={setToggleMenu}
            />
          ))}
        </div>
      ) : toggleMenu === 1 ? (
        <AddSlider
          getDataSlides={getDataSlides}
          setToggleMenu={setToggleMenu}
        />
      ) : (
        <EditSlider
          selectedSlide={selectedSlide}
          setSelectedSlide={setSelectedSlide}
          getDataSlides={getDataSlides}
          setToggleMenu={setToggleMenu}
        />
      )}
    </>
  );
};

const mapDispatchToProps = {
  getDataSlides: slidesActions.getDataSlides,
};

const mapStateToProps = (state) => ({
  slides: state.slides.dataSlides,
});

Slider.propTypes = {
  slides: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      image: propTypes.string.isRequired,
      description: propTypes.string.isRequired,
      organizationId: propTypes.number.isRequired,
    }),
  ).isRequired,
  getDataSlides: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Slider);
