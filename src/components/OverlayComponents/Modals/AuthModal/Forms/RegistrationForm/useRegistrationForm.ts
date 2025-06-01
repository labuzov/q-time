import * as Yup from 'yup';

import { useForm } from '@/hooks/useForm';
import { getValidationText, Validation } from '@/utils/validation';
import { FORM_CONFIG } from '@/constants/formConfig';

const getValidationSchema = () => Yup.object().shape({
    email: Yup.string()
        .required(getValidationText(Validation.Required))
        .email(getValidationText(Validation.Email)),
    password: Yup.string()
        .required(getValidationText(Validation.Required))
        .min(FORM_CONFIG.auth.password.min, getValidationText(Validation.MinLength, { value: FORM_CONFIG.auth.password.min }))
        .max(FORM_CONFIG.auth.password.max, getValidationText(Validation.MaxLength, { value: FORM_CONFIG.auth.password.max }))
});

type Schema = ReturnType<typeof getValidationSchema>
type FormValues = Yup.InferType<Schema>;

const initialValues: FormValues = {
    email: '',
    password: '',
}

export const useRegistrationForm = () => {
    const {
        values, isValid, errors,
        setFieldValue, validate
    } = useForm({ initialValues, validationSchema: getValidationSchema() });

    return {
        values,
        isValid,
        errors,
        setFieldValue,
        validate
    }
}