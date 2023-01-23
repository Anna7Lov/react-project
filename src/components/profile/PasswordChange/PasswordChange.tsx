import { useFormik, FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../rdx/user/selectors';
import { editUserPasswordAction } from '../../../rdx/user/actions';
import { editPasswordFormSchema } from '../../../validationSchemas';
import { UserModel } from '../../../services/userTypes';
import { ButtonSmall } from '../../shared/ButtonSmall/ButtonSmall';
import { InputItem } from '../../shared/InputItem/InputItem';
import './PasswordChange.scss';

export interface EditPasswordFormValues {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}

export const PasswordChange = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [isPasswordEditing, setIsPasswordEditing] = useState<boolean>(false);
  const { t } = useTranslation();

  const onChangePasswordButtonClick = useCallback(() => {
    setIsPasswordEditing(true);
  }, []);

  const onPasswordEdit = (
    values: EditPasswordFormValues,
    actions: FormikHelpers<EditPasswordFormValues>
  ): void => {
    const editedUserPassword: Pick<UserModel, 'password'> = {
      password: values.newPassword
    };
    if (editedUserPassword.password !== currentUser?.password) {
      dispatch(editUserPasswordAction(editedUserPassword));
    }
    setIsPasswordEditing(false);
    actions.setSubmitting(false);
    actions.resetForm();
  };

  const onPasswordEditCancel = (): void => {
    setIsPasswordEditing(false);
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    handleReset
  } = useFormik<EditPasswordFormValues>({
    initialValues: {
      password: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    validationSchema: editPasswordFormSchema,
    onSubmit: onPasswordEdit,
    onReset: onPasswordEditCancel
  });

  return (
    <div className="password-change">
      {isPasswordEditing
        ? (<form
          noValidate
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          <InputItem
            name="password"
            placeholder="Current password *"
            type="password"
            value={values.password}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors.password}
            touched={touched.password}
          />

          <InputItem
            name="newPassword"
            placeholder="New password *"
            type="password"
            value={values.newPassword}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors.newPassword}
            touched={touched.newPassword}
          />

          <InputItem
            name="confirmNewPassword"
            placeholder="Confirm new password *"
            type="password"
            value={values.confirmNewPassword}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors.confirmNewPassword}
            touched={touched.confirmNewPassword}
          />

          <div className="password-change__form-buttons">
            <ButtonSmall
              type="submit"
              title={t('saveButton')}
              additionalClass="button-ordinary"
              isDisabled={isSubmitting}
            />
            <ButtonSmall
              type="reset"
              title={t('cancelButton')}
              additionalClass="button-bright"
            />
          </div>
        </form>
          )
        : (
        <button
          className="password-change__button"
          onClick={onChangePasswordButtonClick}
        >
          {t('changePasswordButton')}
        </button>
          )}
    </div>
  );
};
