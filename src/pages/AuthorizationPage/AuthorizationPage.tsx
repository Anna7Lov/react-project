import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUserAction } from '../../rdx/user/actions';
import { selectUsers } from '../../rdx/user/selectors';
import { useThemeContext } from '../../hooks/useThemeContext';
import { authorizationFormSchema } from '../../validationSchemas';
import { AuthorizationFormValues } from '../../componentsItemsTypes';
import { HeaderSecondary } from '../../components/shared/HeaderSecondary/HeaderSecondary';
import { Title } from '../../components/shared/Title/Title';
import { InputItem } from '../../components/shared/InputItem/InputItem';
import { ButtonLarge } from '../../components/shared/ButtonLarge/ButtonLarge';
import './AuthorizationPage.scss';

export const AuthorizationPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(selectUsers);
  const theme = useThemeContext();
  const [authorizationError, setAuthorizationError] = useState<null | string>(null);

  const onAuthorizationFormSubmit = (values: AuthorizationFormValues): void => {
    if (users.length) {
      const user = users.find((u) =>
        values.email === u.email && values.password === u.password);
      if (user) {
        dispatch(loginUserAction(user));
        navigate('/');
      } else {
        setAuthorizationError('Authorization data is incorrect');
      }
    } else {
      setAuthorizationError('Authorization data is incorrect');
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit
  } = useFormik<AuthorizationFormValues>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: authorizationFormSchema,
    onSubmit: onAuthorizationFormSubmit
  });

  return (
    <div className={theme === 'dark' ? 'authorization dark-authorization' : 'authorization'}>
      <HeaderSecondary />
      <div className="authorization__title">
        <Title title="Log in" />
      </div>
      <div className="authorization__items">
        <form noValidate onSubmit={handleSubmit}>
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

          <ButtonLarge
            title="Log in"
          />

          <div className="authorization__error">
            {authorizationError
              ? <div className="authorization__error-text">{authorizationError}</div>
              : null}
          </div>
        </form>

        <div className="authorization__info">
          <span className="authorization__text">
            Don’t you have an account?{' '}
          </span>
          <Link to={'/signup'} className="authorization__link">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};
