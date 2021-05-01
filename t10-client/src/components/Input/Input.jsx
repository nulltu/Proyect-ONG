import React, { useState } from 'react';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styles from './Input.module.css';

const PASSWORD = 'password';
const TEXT = 'text';

const Input = (
  {
    register,
    name,
    type,
    error,
    placeholder,
    defaultValue,
    Element,
    label,
    custom,
    testId,
    search,
  },
  // eslint-disable-next-line no-unused-vars
  ref,
) => {
  const [viewPassword, setViewPassword] = useState(false);
  const theme = useSelector((state) => state.theme.dataThemeDefault);

  const changePassword = () => {
    setViewPassword(!viewPassword);
  };

  return (
    <div className="field" style={{ position: 'relative' }}>
      {label && <p className="mb-1">{label}</p>}
      {type === PASSWORD && (
        <button
          type="button"
          className={styles.passBtn}
          onClick={changePassword}
        >
          <i
            className={viewPassword ? 'fa fa-eye-slash' : 'fa fa-eye'}
            id=""
            style={{ color: theme.lettersColor }}
          />
        </button>
      )}
      {search && (
        <button type="submit" className={styles.passBtn}>
          <i className="fa fa-search" style={{ color: theme.lettersColor }} />
        </button>
      )}
      {custom || (
        <Element
          style={{
            ...(error
              ? { border: '2px solid red' }
              : { border: '1px solid #ededed' }),
            ...{ color: theme.lettersColor },
          }}
          type={type !== PASSWORD ? type : viewPassword ? TEXT : PASSWORD}
          name={name}
          ref={register}
          placeholder={placeholder}
          defaultValue={defaultValue}
          data-testid={testId}
        />
      )}
      <span className={styles.error}>{error && error.message}</span>
    </div>
  );
};

Input.propTypes = {
  register: propTypes.func.isRequired,
  name: propTypes.string.isRequired,
  type: propTypes.string,
  error: propTypes.objectOf(propTypes.string),
  placeholder: propTypes.string,
  defaultValue: propTypes.string,
  Element: propTypes.string,
  label: propTypes.string,
  custom: propTypes.element,
  testId: propTypes.string,
  search: propTypes.bool,
};

Input.defaultProps = {
  type: 'text',
  error: undefined,
  placeholder: '',
  defaultValue: '',
  testId: '',
  Element: 'input',
  label: undefined,
  custom: undefined,
  search: false,
};

export default Input;
