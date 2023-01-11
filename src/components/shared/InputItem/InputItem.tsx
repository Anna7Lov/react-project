import React, { useCallback, useState } from 'react';
import './InputItem.scss';

interface InputItemProps {
  name: string;
  placeholder: string;
  type: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | undefined;
  touched: boolean | undefined;
}

export const InputItem = ({
  name,
  placeholder,
  type,
  value,
  handleChange,
  handleBlur,
  error,
  touched
}: InputItemProps): JSX.Element => {
  const [passwordInputType, setPasswordInputType] = useState('password');

  const onPasswordVisibilityClick = useCallback(() => {
    passwordInputType === 'password'
      ? setPasswordInputType('text')
      : setPasswordInputType('password');
  }, [passwordInputType]);

  return (
    <div className="input-item">
      <input
        name={name}
        placeholder={placeholder}
        type={type === 'password' ? passwordInputType : type}
        autoComplete='on'
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`input-item__input ${
          error && touched ? 'input-item__input-error' : ''
        }`}
      />
      {type === 'password'
        ? (<span
          className={
            passwordInputType === 'password'
              ? 'input-item__visibility invisible'
              : 'input-item__visibility visible'
          }
          onClick={onPasswordVisibilityClick}
        ></span>
          )
        : null}
      {error && touched ? <p className="input-item__error">{error}</p> : null}
    </div>
  );
};
