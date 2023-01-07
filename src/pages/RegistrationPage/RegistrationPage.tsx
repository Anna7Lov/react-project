import * as Yup from 'yup';
import { useFormik } from 'formik';
import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Title } from '../../components/shared/Title/Title';
import './RegistrationPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserAction } from '../../rdx/user/actions';
import { selectUsers } from '../../rdx/user/selectors';

interface RegistrationFormValues {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const phoneRules = /^\+?\d{7,13}$/;
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

export const RegistrationPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const list = useSelector(selectUsers);
  const [isGreetingVisible, setIsGreetingVisible] = useState(false);
  const [inputType, setInputType] = useState<string>('password');

  const onPasswordVisibilityClick = useCallback(() => {
    inputType === 'password' ? setInputType('text') : setInputType('password');
  }, [inputType]);

  const registrationFormSchema: Yup.SchemaOf<RegistrationFormValues> = Yup.object().shape({
    name: Yup
      .string()
      .max(25, 'Max length 25 characters')
      .required('Required'),

    lastName: Yup
      .string()
      .max(25, 'Max length 25 characters')
      .required('Required'),

    email: Yup
      .string()
      .email('Please enter a valid email')
      .required('Required')
      .test('Unique Email', 'Email already exists',
        (value) => {
          if (list) {
            return !list.some((user) => (user.email === value));
          }
          return true;
        }),

    phone: Yup
      .string()
      .matches(phoneRules, {
        message: '7-12 digits, + is allowed only at the beginning'
      })
      .required('Required'),

    password: Yup
      .string()
      .min(6, 'Min length 6 characters')
      .matches(passwordRules, {
        message:
          'At least 1 uppercase, 1 lowercase letter and 1 digit'
      })
      .required('Required'),

    confirmPassword: Yup
      .string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required')
  });

  const onSubmit = (values: RegistrationFormValues):
  void => {
    const newUser = {
      name: values.name,
      lastName: values.lastName,
      phone: values.phone,
      email: values.email,
      password: values.password,
      favouriteRecipes: []
    };
    dispatch(registerUserAction(newUser));
    setIsGreetingVisible(true);
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
    onSubmit
  });

  return (
    <div className="registration">
      {isGreetingVisible ? <div className='greeting'>You have successfully registered and can log in on next step. Wait please.</div> : null}
      <div className="registration__header">
        <div className="registration__header-inner">
          <span>Cooking Food & Drink</span>
          <a
            href="mailto:suppport@cooking.com"
            className="registration__company-email"
          >
            suppport@cooking.com
          </a>
        </div>
      </div>
      <div className="registration__title">
        <Title title="Create an account" />
      </div>
      <div className="registration__items">
        <form className="registration__form" noValidate autoComplete="off" onSubmit={handleSubmit}>
          <div className="registration__item">
            <input
              name="name"
              placeholder="Name *"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`registration__input ${errors.name && touched.name
                  ? 'registration__input-error'
                  : ''
                }`}
            />
            {errors.name && touched.name
              ? (<div className="registration__error">{errors.name}</div>)
              : null}
          </div>

          <div className="registration__item">
            <input
              name="lastName"
              placeholder="Last Name *"
              type="text"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`registration__input ${errors.email && touched.email
                  ? 'registration__input-error'
                  : ''
                }`}
            />
            {errors.email && touched.email
              ? (<div className="registration__error">{errors.lastName}</div>)
              : null}
          </div>

          <div className="registration__item">
            <input
              name="phone"
              placeholder="Phone +4917755511222 *"
              type="tel"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`registration__input ${errors.phone && touched.phone
                  ? 'registration__input-error'
                  : ''
                }`}
            />
            {errors.phone && touched.phone
              ? (<div className="registration__error">{errors.phone}</div>)
              : null}
          </div>

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
          </div>

          <div className="registration__password">
            <input
              name="confirmPassword"
              placeholder="Confirm password *"
              type={inputType}
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`registration__input ${errors.confirmPassword && touched.confirmPassword
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
            {errors.confirmPassword && touched.confirmPassword
              ? (<div className="registration__error">{errors.confirmPassword}</div>)
              : null}
          </div>

          <button type="submit" className="registration__button" disabled={isSubmitting}>
            Sign in
          </button>
        </form>

        <div>
          <span className="registration__text">Already have an account? </span>
          <Link to={'/login'} className="registration__link">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};
