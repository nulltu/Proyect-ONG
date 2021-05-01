import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import connect from '../../axios/axios.config';
import './slider.css';
import {
  PATH_ENDPOINT_SLIDES,
  STATUS_SUCCESS,
  STATUS_NOT_FOUND,
} from '../../constants/constants';

const EditSlider = ({
  selectedSlide: { id, image, description, organizationId },
  setToggleMenu,
  getDataSlides,
  setSelectedSlide,
}) => {
  const [warnDesc, setWarnDesc] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const handleFetch = async () => {
    setDisabled(true);
    try {
      const response = await connect.put(`${PATH_ENDPOINT_SLIDES}/${id}`, {
        description,
        organizationId,
      });
      if (response.status === STATUS_SUCCESS) {
        await Swal.fire({
          text: 'Slide Actualizado',
          icon: 'success',
        });
        getDataSlides();
        setToggleMenu(0);
        setSelectedSlide(null);
      }
      if (response.status === STATUS_NOT_FOUND) {
        await Swal.fire({
          text: 'Slide no encontrado',
          icon: 'warning',
        });
        getDataSlides();
        setToggleMenu(0);
        setSelectedSlide(null);
      }
      setDisabled(false);
    } catch (err) {
      await Swal.fire({
        text: 'Error!',
        icon: 'error',
      });
      getDataSlides();
      setToggleMenu(0);
      setDisabled(false);
    }
  };

  const inputsValidate = () => {
    let noErrors = true;
    if (description === '') {
      setWarnDesc('Ingrese una descripcion');
      noErrors = false;
    }
    if (noErrors) {
      handleFetch();
    }
  };

  const handleReturn = () => {
    setWarnDesc(null);
    setToggleMenu(0);
    setSelectedSlide(null);
  };
  const theme = useSelector((state) => state.theme.dataThemeDefault);

  return (
    <div className="mainContainer">
      {image ? <img className="addImgStyle" alt="Imagen" src={image} /> : null}
      <div className="formContainer">
        <p className="addTitleStyle" style={{ color: theme.lettersColor }}>
          Descripcion de la imagen
        </p>
        <textarea
          className={warnDesc ? 'areatextStyle1' : 'areatextStyle'}
          placeholder="Agregue una descripción"
          style={{ color: theme.lettersColor }}
          value={description}
          maxLength="268"
          onChange={(e) => {
            setSelectedSlide({
              id,
              organizationId,
              image,
              description: e.target.value,
            });
            setWarnDesc(null);
          }}
        />
        {warnDesc ? <p className="warnTxtStyle">{warnDesc}</p> : null}
        <div
          style={{
            margin: '20px auto 10px auto',
            display: 'flex',
            justifyContent: 'center',
          }}
          className="inline clearfix "
        >
          <button
            style={{ margin: '0 10px', backgroundColor: 'red' }}
            type="submit"
            className="btn btn-primary"
            onClick={handleReturn}
            disabled={disabled}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn btn-primary mb-5"
            onClick={inputsValidate}
            disabled={disabled}
          >
            Actualizar
          </button>
        </div>
      </div>
    </div>
  );
};

EditSlider.propTypes = {
  selectedSlide: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    organizationId: PropTypes.number.isRequired,
  }).isRequired,
  setToggleMenu: PropTypes.func.isRequired,
  getDataSlides: PropTypes.func.isRequired,
  setSelectedSlide: PropTypes.func.isRequired,
};

export default EditSlider;
