import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Title } from '../../components/shared/Title/Title';
import { useDispatch } from 'react-redux';
import { registerUserAction } from '../../rdx/user/actions';
import { useThemeContext } from '../../hooks/useThemeContext';
import { UserModel } from '../../services/userTypes';
import { registrationFormSchema } from '../../validationSchemas';
import { HeaderSecondary } from '../../components/shared/HeaderSecondary/HeaderSecondary';
import { InputItem } from '../../components/shared/InputItem/InputItem';
import { ButtonLarge } from '../../components/shared/ButtonLarge/ButtonLarge';
import './RegistrationPage.scss';

export interface RegistrationFormValues {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegistrationPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useThemeContext();
  const [isSuccessfulRegistrationVisible, setIsSuccessfulRegistrationVisible] = useState(false);

  const onRegistrationFormSubmit = (values: RegistrationFormValues):
  void => {
    const newUser: UserModel = {
      id: uuidv4(),
      name: values.name,
      lastName: values.lastName,
      phone: values.phone,
      email: values.email,
      password: values.password,
      favoriteRecipes: [],
      theme: 'light',
      language: 'en',
      ratingList: []
    };
    dispatch(registerUserAction(newUser));
    setIsSuccessfulRegistrationVisible(true);
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit
  } = useFormik<RegistrationFormValues>({
    initialValues: {
      name: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: registrationFormSchema,
    onSubmit: onRegistrationFormSubmit
  });

  return (
    <div className={theme === 'dark' ? 'registration dark-registration' : 'registration'}>
      {isSuccessfulRegistrationVisible
        ? <div className='registration__successful'>
          You have successfully registered and can log in on next step. Wait please.
        </div>
        : null}
      <HeaderSecondary />
      <div className="registration__title">
        <Title title="Create an account" />
      </div>
      <div className="registration__items">
        <form noValidate onSubmit={handleSubmit}>
          <InputItem
            name="name"
            placeholder="Name *"
            type="text"
            value={values.name}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors.name}
            touched={touched.name}
          />

          <InputItem
            name="lastName"
            placeholder="Last Name *"
            type="text"
            value={values.lastName}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors.lastName}
            touched={touched.lastName}
          />

          <InputItem
            name="phone"
            placeholder="Phone +4917755511222 *"
            type="tel"
            value={values.phone}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors.phone}
            touched={touched.phone}
          />

          <InputItem
            name="email"
            placeholder="Email *"
            type="email"
            value={values.email}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors.email}
            touched={touched.email}
          />

          <InputItem
            name="password"
            placeholder="Password *"
            type="password"
            value={values.password}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors.password}
            touched={touched.password}
          />

          <InputItem
            name="confirmPassword"
            placeholder="Confirm password *"
            type="password"
            value={values.confirmPassword}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors.confirmPassword}
            touched={touched.confirmPassword}
          />

          <ButtonLarge
            isDisabled={isSubmitting}
            title="Sign up"
          />
        </form>

        <div className='registration__info'>
          <span className="registration__text">Already have an account? </span>
          <Link to={'/login'} className="registration__link">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};
