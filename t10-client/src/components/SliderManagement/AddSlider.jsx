import React, { useState } from 'react';
import propTypes from 'prop-types';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import connect from '../../axios/axios.config';
import base64ToRawFile from '../../utils/base64ToRawFile';
import createFormData from '../../utils/createFormData';
import './slider.css';
import {
  PATH_ENDPOINT_SLIDES,
  STATUS_CREATED,
} from '../../constants/constants';

const imgFormats = ['image/jpeg', 'image/jpg', 'image/png'];

const AddSlider = ({ setToggleMenu, getDataSlides }) => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [warnImg, setWarnImg] = useState(false);
  const [warnDesc, setWarnDesc] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const handleFetch = async () => {
    setDisabled(true);
    const imageRawFile = base64ToRawFile(image, 'nD3jR19Ha');
    const formData = createFormData({
      organizationId: 1,
      description,
      image: imageRawFile,
    });
    try {
      const response = await connect.post(PATH_ENDPOINT_SLIDES, formData);
      if (response.status === STATUS_CREATED) {
        await Swal.fire({
          text: 'Slide Creado',
          icon: 'success',
        });
        setImage(null);
        setDescription('');
        getDataSlides();
        setToggleMenu(0);
      }
      setDisabled(false);
    } catch (err) {
      Swal.fire({
        text: 'Error!',
        icon: 'error',
      });
      setImage(null);
      setDescription('');
      getDataSlides();
      setToggleMenu(0);
      setDisabled(false);
    }
  };

  const inputsValidate = () => {
    let noErrors = true;
    if (!image) {
      setWarnImg(true);
      noErrors = false;
    }
    if (description === '') {
      setWarnDesc('Ingrese una descripcion');
      noErrors = false;
    }
    if (noErrors) {
      handleFetch();
    }
  };

  const handleFile = async (file) => {
    // eslint-disable-next-line no-undef
    const reader = new FileReader();
    reader.addEventListener('load', () => setImage(reader.result), false);
    reader.readAsDataURL(file.target.files[0]);
  };
  const theme = useSelector((state) => state.theme.dataThemeDefault);

  return (
    <div className="mainContainer">
      {image ? <img className="addImgStyle" alt="Imagen" /> : null}
      <div className="formContainer">
        <p className="addTitleStyle" style={{ color: theme.lettersColor }}>
          Descripción de la imagen
        </p>
        <textarea
          className={warnDesc ? 'areatextStyle1' : 'areatextStyle'}
          placeholder="Agregue una descripcion"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setWarnDesc(null);
          }}
        />
        {warnDesc ? <p className="warnTxtStyle">{warnDesc}</p> : null}
        <input
          className={warnImg ? 'inputFileStyle1' : 'inputFileStyle'}
          type="file"
          accept={imgFormats}
          multiple={false}
          onChange={(file) => {
            handleFile(file);
            setWarnImg(null);
          }}
        />
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
            onClick={() => {
              setImage(null);
              setDescription('');
              setToggleMenu(0);
            }}
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
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

AddSlider.propTypes = {
  setToggleMenu: propTypes.func.isRequired,
  getDataSlides: propTypes.func.isRequired,
};

export default AddSlider;
