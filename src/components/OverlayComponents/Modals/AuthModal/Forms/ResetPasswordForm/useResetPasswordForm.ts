import * as Yup from 'yup';

import { useForm } from '@/hooks/useForm';
import { getValidationText, Validation } from '@/utils/validation';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required(getValidationText(Validation.Required))
        .email(getValidationText(Validation.Email)),
});

type FormValues = Yup.InferType<typeof validationSchema>;

const initialValues: FormValues = {
    email: '',
}

export const useResetPasswordForm = () => {
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