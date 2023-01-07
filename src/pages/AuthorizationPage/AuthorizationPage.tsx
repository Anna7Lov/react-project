import * as Yup from 'yup';
import { useFormik } from 'formik';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Title } from '../../components/shared/Title/Title';
import { loginUserAction } from '../../rdx/user/actions';
import { selectUsers } from '../../rdx/user/selectors';
import './AuthorizationPage.scss';

interface AuthorizationFormValues {
  email: string;
  password: string;
}

export const authorizationFormSchema: Yup.SchemaOf<AuthorizationFormValues> = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email').required('Required'),
  password: Yup.string().required('Required')
});

export const AuthorizationPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(selectUsers);
  const [inputType, setInputType] = useState('password');
  const [authorizationError, setAuthorizationError] = useState<null | string>(null);

  const onPasswordVisibilityClick = useCallback(() => {
    inputType === 'password' ? setInputType('text') : setInputType('password');
  }, [inputType]);

  const onAuthorizationFormSubmit = (values: AuthorizationFormValues): void => {    
    if (users.length) {
      for (const user of users) {
        if (values.email === user.email && values.password === user.password) {
          dispatch(loginUserAction(user));
          navigate('/');
        } else {
          setAuthorizationError('Authorization data is incorrect');
        }
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
    <div className="authorization">
      <div className="authorization__header">
        <div className="authorization__header-inner">
          <span>Cooking Food & Drink</span>
          <a
            href="mailto:suppport@cooking.com"
            className="authorization__company-email"
          >
            suppport@cooking.com
          </a>
        </div>
      </div>

      <div className="authorization__title">
        <Title title="Log in" />
      </div>
      <div className="authorization__items">
        <form className="authorization__form" noValidate autoComplete="off" onSubmit={handleSubmit}>
          <div className="registration__item">
            <input
              name="email"
              placeholder="Email *"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`registration__input ${errors.email && touched.email
                  ? 'registration__input-error'
                  : ''
                }`}
            />
            {errors.email && touched.email
              ? (<div className="registration__error">{errors.email}</div>)
              : null}
          </div>

          <div className="registration__password">
            <input
              name="password"
              placeholder="Password *"
              type={inputType}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`registration__input ${errors.password && touched.password
                  ? 'registration__input-error'
                  : ''
                }`}
            />
            <span
              className={
                inputType === 'password'
                  ? 'registration__visibility invisible'
                  : 'registration__visibility visible'
              }
              onClick={onPasswordVisibilityClick}
            ></span>
            {errors.password && touched.password
              ? (<div className="registration__error">{errors.password}</div>)
              : null}
            {authorizationError
              ? <div className="authorization__error">{authorizationError}</div>
              : null}
          </div>
          <button type="submit" className="authorization__button">
            Log in
          </button>
        </form>
        <div className="authorization__content">
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
