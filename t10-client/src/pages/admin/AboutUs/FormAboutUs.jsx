import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { yupResolver } from '@hookform/resolvers/yup';
import * as constants from '../../../constants';
import EditNews from '../../../components/EditNews';
import historyAction from '../../../redux/actions/historyAction';
import entriesTypeActions from '../../../redux/actions/entriesTypeActions';
import Input from '../../../components/Input';

const schema = Yup.object().shape({
  editor: Yup.string().required('El contenido tiene que completarse'),
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

function FormNews({ setEdit, setCreate, historyData, edit }) {
  const defaultVal = edit
    ? {
        editor: historyData.text,
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

  const onSubmit = async (data) => {
    setDisabled(true);
    try {
      const response = await dispatch(
        edit
          ? historyAction.updateHistory(data, historyData.id)
          : historyAction.createHistory(data),
      );

      if (response.status === constants.STATUS_CREATED) {
        Swal.fire({
          icon: 'success',
          title: edit ? constants.HISTORY_UPDATED : constants.HISTORY_CREATED,
        });
        document.getElementById('form').reset();
        await dispatch(historyAction.getDataHistory());
        if (edit) {
          setEdit(false);
        } else {
          setCreate(false);
        }
      }
      setDisabled(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: error.response.data.message,
      });
      setDisabled(false);
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
                      <Input
                        custom={
                          <EditNews
                            content={historyData ? historyData.text : ''}
                            control={control}
                            setValue={setValue}
                          />
                        }
                        error={errors?.editor}
                      />
                      <Input
                        type="file"
                        name="image"
                        register={register}
                        error={errors?.image}
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
  historyData: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ),
};
FormNews.defaultProps = {
  edit: false,
  setEdit: () => {},
  setCreate: () => {},
  historyData: {},
};
export default FormNews;
