
import * as Yup from 'yup';
import { store } from './rdx';
import { RegistrationFormValues } from './pages/RegistrationPage/RegistrationPage';
import { AuthorizationFormValues } from './pages/AuthorizationPage/AuthorizationPage';
import { EditDataFormValues } from './components/profile/PersonalData/PersonalData';
import { EditPasswordFormValues } from './components/profile/PasswordChange/PasswordChange';

const phoneRules = /^\+?\d{7,12}$/;
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

export const registrationFormSchema: Yup.SchemaOf<RegistrationFormValues> =
Yup.object().shape({
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
    .test('Unique Email', 'Email already exists',
      (value) => {
        const state = store.getState();
        if (state.user.users) {
          return !state.user.users.some((user) => (user.email === value));
        }
        return true;
      })
    .required('Required'),

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

export const authorizationFormSchema: Yup.SchemaOf<AuthorizationFormValues> =
Yup.object().shape({
  email: Yup.string().email('Please enter a valid email').required('Required'),
  password: Yup.string().required('Required')
});

export const editDataFormSchema: Yup.SchemaOf<EditDataFormValues> =
Yup.object().shape({
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
    .test('Unique Email', 'Email already exists',
      (value) => {
        const state = store.getState();
        if (state.user.users && state.user.currentUser && value !== state.user.currentUser.email) {
          return !state.user.users.some((user) => (user.email === value));
        }
        return true;
      })
    .required('Required'),

  phone: Yup
    .string()
    .matches(phoneRules, {
      message: '7-12 digits, + is allowed only at the beginning'
    })
    .required('Required')
});

export const editPasswordFormSchema: Yup.SchemaOf<EditPasswordFormValues> =
Yup.object().shape({
  password: Yup
    .string()
    .test('Correct Password', 'Wrong password',
      (value) => {
        const state = store.getState();
        if (state.user.currentUser && state.user.currentUser.password === value) {
          return true;
        }
        return false;
      })
    .required('Required'),

  newPassword: Yup
    .string()
    .min(6, 'Min length 6 characters')
    .matches(passwordRules, {
      message:
        'At least 1 uppercase, 1 lowercase letter and 1 digit'
    })
    .required('Required'),

  confirmNewPassword: Yup
    .string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Required')
});
