import { useFormik, FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../rdx/user/selectors';
import { editUserDataAction } from '../../../rdx/user/actions';
import { editDataFormSchema } from '../../../validationSchemas';
import { UserModel } from '../../../services/userTypes';
import { EditDataFormValues } from '../../../componentsItemsTypes';
import { ButtonSmall } from '../../shared/ButtonSmall/ButtonSmall';
import { InputItem } from '../../shared/InputItem/InputItem';
import './PersonalData.scss';

export const PersonalData = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [isDataEditing, setIsDataEditing] = useState<boolean>(false);
  const { t } = useTranslation();

  const onEditButtonClick = useCallback(() => {
    setIsDataEditing(true);
  }, []);

  const onDataEdit = useCallback((
    values: EditDataFormValues,
    actions: FormikHelpers<EditDataFormValues>): void => {
    const editedUser: Omit<
    UserModel,
    'id' | 'password' | 'favoriteRecipes' | 'theme' | 'language' | 'ratingList'
    > = values;
    if (
      editedUser.name !== currentUser?.name ||
      editedUser.lastName !== currentUser?.lastName ||
      editedUser.phone !== currentUser?.phone ||
      editedUser.email !== currentUser?.email
    ) {
      dispatch(editUserDataAction(editedUser));
    }
    setIsDataEditing(false);
    actions.setSubmitting(false);
  }, [currentUser]);

  const onDataEditCancel = (): void => {
    setIsDataEditing(false);
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
  } = useFormik<EditDataFormValues>({
    initialValues: {
      name: currentUser?.name ?? '',
      lastName: currentUser?.lastName ?? '',
      phone: currentUser?.phone ?? '',
      email: currentUser?.email ?? ''
    },
    validationSchema: editDataFormSchema,
    onSubmit: onDataEdit,
    onReset: onDataEditCancel,
    enableReinitialize: true
  });

  return (
    <div className="personal-data">
      {isDataEditing
        ? (<form
          noValidate
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
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

          <div className="personal-data__form-buttons">
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
        : (<div className="personal-data__content">
          <p className="personal-data__item">
            {currentUser?.name} {currentUser?.lastName}
          </p>
          <p className="personal-data__item">{currentUser?.phone}</p>
          <p className="personal-data__item">{currentUser?.email}</p>
          <ButtonSmall
            type="submit"
            onButtonSmallClick={onEditButtonClick}
            title={t('editSmallButton')}
            additionalClass="button-main"
            isDisabled={isSubmitting}
          />
        </div>
          )}
    </div>
  );
};
