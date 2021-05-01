import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Swal from 'sweetalert2';
import styles from './EditOrganization.module.css';
import * as constants from '../../constants';
import organizationActions from '../../redux/actions/organizationActions';
import Input from '../Input';

const schema = Yup.object().shape({
  email: Yup.string().email('Ingresa un correo electrónico válido'),
  image: Yup.mixed().test(
    'fileFormat',
    'La extensión tiene que ser jpg, jpeg o png',
    (value) => {
      if (value[0]) {
        return value[0] && constants.SUPPORTED_FORMATS.includes(value[0].type);
      }
      return true;
    },
  ),
});

const EditLogoAndTitle = () => {
  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const organization = useSelector(
    (state) => state.organization.dataOrganization[0],
  );
  const [disabled, setDisabled] = useState(false);

  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme.dataThemeDefault);

  const onSubmit = async (data) => {
    setDisabled(!disabled);
    try {
      const image = data.image[0] || undefined;
      const response = await dispatch(
        organizationActions.putOrganization({ ...data, ...{ image } }),
      );
      if (response.status === constants.STATUS_CREATED) {
        setDisabled(false);
        Swal.fire({
          title: constants.UPDATED_OK,
          icon: 'success',
        });
        dispatch(organizationActions.getDataOrganization());
      }
    } catch (error) {
      Swal.fire({
        text: error.response.data.message,
        icon: 'error',
      });
      setDisabled(false);
    }
  };

  const formTitle = 'Editar Organizacion';

  return (
    <div className="container" style={{ minHeight: '90vh' }}>
      <div className="row align-items-center" style={{ minHeight: '85vh' }}>
        <div className="col-lg-12 main-content ">
          <div className={styles.formLogin}>
            <h2
              className={styles.formTitle}
              style={{ color: theme.lettersColor }}
            >
              {formTitle}
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              method="POST"
              id="titleAndImageForm"
              className="clearfix"
              style={{ color: theme.lettersColor }}
            >
              <div
                className="row d-flex"
                style={{ justifyContent: 'space-around' }}
              >
                <div className="col-12 col-md-6">
                  <Input
                    type="text"
                    name="name"
                    label="Nombre:"
                    placeholder="Nombre"
                    defaultValue={organization.name}
                    register={register}
                    error={errors.name}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <Input
                    type="text"
                    name="address"
                    label="Dirección:"
                    placeholder="Direccion"
                    defaultValue={organization.address}
                    register={register}
                    error={errors.address}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <Input
                    style={{ color: theme.lettersColor }}
                    Element="textarea"
                    cols={30}
                    type="textarea"
                    name="description"
                    label="Descripción:"
                    placeholder="Descripcion"
                    defaultValue={organization.description}
                    register={register}
                    error={errors.description}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <Input
                    Element="textarea"
                    type="text"
                    name="welcomeText"
                    label="Texto de bienvenida:"
                    placeholder="Texto de bienvenida"
                    defaultValue={organization.welcomeText}
                    register={register}
                    error={errors.welcomeText}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <Input
                    type="text"
                    name="phone"
                    label="Teléfono:"
                    placeholder="Telefono"
                    defaultValue={organization.phone}
                    register={register}
                    error={errors.phone}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <Input
                    type="email"
                    name="email"
                    label="Email:"
                    placeholder="Correo electronico"
                    defaultValue={organization.email}
                    register={register}
                    error={errors.email}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <Input
                    type="text"
                    name="facebookUrl"
                    label="Facebook:"
                    placeholder="Facebook"
                    register={register}
                    defaultValue={organization.facebookUrl}
                    error={errors.facebookUrl}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <Input
                    type="text"
                    name="instaUrl"
                    label="Instagram:"
                    placeholder="Instagram"
                    register={register}
                    defaultValue={organization.instaUrl}
                    error={errors.instaUrl}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <Input
                    type="text"
                    name="twitterUrl"
                    label="Twitter:"
                    placeholder="Twitter"
                    register={register}
                    defaultValue={organization.twitterUrl}
                    error={errors.twitterUrl}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <Input
                    type="file"
                    name="image"
                    label="Imagen:"
                    register={register}
                    error={errors.image}
                  />
                </div>
              </div>

              <div className="inline clearfix text-center">
                <button
                  type="submit"
                  value="Send Messager"
                  className="btn btn-primary mb-5"
                  disabled={disabled}
                >
                  Actualizar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditLogoAndTitle;
