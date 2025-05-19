import * as Yup from 'yup';

import { useForm } from '@/hooks/useForm';
import { getValidationText, Validation } from '@/utils/validation';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required(getValidationText(Validation.Required))
        .email(getValidationText(Validation.Email)),
    password: Yup.string()
        .required(getValidationText(Validation.Required))
        .min(6, getValidationText(Validation.MinLength, { value: 6 }))
        .max(32, getValidationText(Validation.MaxLength, { value: 30 }))
});

type FormValues = Yup.InferType<typeof validationSchema>;

const initialValues: FormValues = {
    email: '',
    password: '',
}

export const useRegistrationForm = () => {
    const {
        values, isValid, errors,
        setFieldValue, validate
    } = useForm({ initialValues, validationSchema });

    return {
        values,
        isValid,
        errors,
        setFieldValue,
        validate
    }
}