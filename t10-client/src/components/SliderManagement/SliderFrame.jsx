import React from 'react';
import propTypes from 'prop-types';
import Swal from 'sweetalert2';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import connect from '../../axios/axios.config';
import './slider.css';
import {
  PATH_ENDPOINT_SLIDES,
  STATUS_SUCCESS,
  STATUS_NOT_FOUND,
} from '../../constants/constants';

const SliderFrame = ({
  slide: { id, image, description, organizationId },
  setSelectedSlide,
  setToggleMenu,
  getDataSlides,
}) => {
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: '¿Seguro quiere borrar el slide?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    });
    if (result.isConfirmed) {
      try {
        const response = await connect.delete(`${PATH_ENDPOINT_SLIDES}/${id}`);
        if (response.status === STATUS_SUCCESS) {
          await Swal.fire({
            text: 'Slide Borrado',
            icon: 'success',
          });
          getDataSlides();
          setToggleMenu(0);
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
      } catch (err) {
        await Swal.fire({
          text: 'Error!',
          icon: 'error',
        });
        getDataSlides();
        setToggleMenu(0);
      }
    }
  };

  return (
    <div className="frameContainer">
      <img className="imgContainer" alt="Imagen" src={image} />
      <p className="txtStyle">{description}</p>
      <div className="iconsContainer">
        <EditOutlined
          className="iconStyle"
          title="Editar Slider"
          onClick={() => {
            setSelectedSlide({ id, image, description, organizationId });
            setToggleMenu(2);
          }}
        />
        <DeleteOutlined
          className="iconStyle"
          title="Borrar Slider"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};

SliderFrame.propTypes = {
  slide: propTypes.shape({
    id: propTypes.number.isRequired,
    image: propTypes.string.isRequired,
    description: propTypes.string.isRequired,
    organizationId: propTypes.number.isRequired,
  }).isRequired,
  setSelectedSlide: propTypes.func.isRequired,
  setToggleMenu: propTypes.func.isRequired,
  getDataSlides: propTypes.func.isRequired,
};

export default SliderFrame;
