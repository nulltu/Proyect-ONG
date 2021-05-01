import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { yupResolver } from '@hookform/resolvers/yup';
import * as constants from '../../constants';
import EditNews from '../EditNews';
import entriesActions from '../../redux/actions/entriesActions';
import entriesTypeActions from '../../redux/actions/entriesTypeActions';

const schema = Yup.object().shape({
  projecttitle: Yup.string().required('El titulo es requerido'),
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
  typeId: Yup.string().required('El tipo es requerido'),
  editor: Yup.string().required('El contenido tiene que completarse'),
});

function FormNews({ setEdit, setCreate, entries, edit }) {
  const defaultVal = edit
    ? {
        projecttitle: entries.title,
        editor: entries.content,
        typeId: entries.typeId,
      }
    : {};

  const { register, errors, handleSubmit, control, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultVal,
  });
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    register('editor');
    dispatch(entriesTypeActions.getDataEntriesType());
  }, []);

  const cancel = () => {
    if (edit) {
      setEdit(false);
    } else {
      setCreate(false);
    }
  };

  const dataEntriesType = useSelector(
    (state) => state.entriesType.dataEntriesType,
  );
  const theme = useSelector((state) => state.theme.dataThemeDefault);

  const onSubmit = async (data) => {
    setDisabled(true);
    try {
      const response = await dispatch(
        edit
          ? entriesActions.updateEntries(data, entries.id)
          : entriesActions.createEntries(data),
      );

      if (response.status === constants.STATUS_CREATED) {
        Swal.fire({
          icon: 'success',
          title: edit ? constants.ENTRIES_UPDATED : constants.ENTRIES_CREATED,
        });
        document.getElementById('form').reset();
        await dispatch(entriesActions.getDataEntries());
        cancel();
      }
      setDisabled(false);
    } catch (error) {
      setDisabled(false);
      Swal.fire({
        icon: 'error',
        title: error?.response?.data.message,
      });
    }
  };
  return (
    <div>
      <main id="main" className="site-main">
        <div className="main-content">
          <div className="container">
            <div className="design-process-section" id="process-tab">
              <div className="tab-content">
                <div role="tabpanel" className="tab-pane active" id="basics">
                  <div className="start-form">
                    <form onSubmit={handleSubmit(onSubmit)} id="form">
                      <div className="field">
                        <span
                          className="label-desc"
                          style={{ color: theme.lettersColor }}
                        >
                          Título de la Entrada
                        </span>
                        <input
                          style={{ color: theme.lettersColor }}
                          type="text"
                          name="projecttitle"
                          id="projecttitle"
                          ref={register}
                        />
                        <span className="text-danger text-small d-block mb-2">
                          {errors?.projecttitle?.message}
                        </span>
                      </div>
                      <div className="">
                        <input
                          className=""
                          type="file"
                          name="image"
                          ref={register}
                        />
                        <span className="text-danger text-small d-block mb-2">
                          {errors?.image?.message}
                        </span>
                      </div>
                      <EditNews
                        content={entries ? entries.content : ''}
                        control={control}
                        setValue={setValue}
                      />
                      <span className="text-danger text-small d-block mb-2">
                        {errors?.editor?.message}
                      </span>
                      <div className="field">
                        <span
                          className="label-desc"
                          style={{ color: theme.lettersColor }}
                        >
                          Tipo
                        </span>
                        <div className="field-select field-cat">
                          <select
                            id="field-cat"
                            name="typeId"
                            defaultValue={entries ? entries.id : '-1'}
                            ref={register}
                            style={{ color: theme.lettersColor }}
                          >
                            {entries ? (
                              <option value="-1">Elegir Tipo</option>
                            ) : null}
                            {dataEntriesType.map((dataEntries) => (
                              <option
                                value={dataEntries.id}
                                style={{ color: '#000000' }}
                              >
                                {dataEntries.type}
                              </option>
                            ))}
                          </select>
                          <span className="text-danger text-small d-block mb-2">
                            {errors?.selectype?.message}
                          </span>
                        </div>
                      </div>
                      <div
                        style={{
                          margin: '0 auto 10px auto',
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
                            if (edit) {
                              setEdit(false);
                            } else {
                              setCreate(false);
                            }
                          }}
                          disabled={disabled}
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary mb-5"
                          disabled={disabled}
                        >
                          {edit ? 'Actualizar' : 'Enviar'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

FormNews.propTypes = {
  edit: PropTypes.bool,
  setEdit: PropTypes.func,
  setCreate: PropTypes.func,
  entries: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      typeId: PropTypes.number.isRequired,
    }),
  ),
};
FormNews.defaultProps = {
  edit: false,
  setEdit: () => {},
  setCreate: () => {},
  entries: {},
};
export default FormNews;
