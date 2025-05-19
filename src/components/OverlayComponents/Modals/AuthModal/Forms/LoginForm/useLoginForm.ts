import * as Yup from 'yup';

import { useForm } from '@/hooks/useForm';
import { getValidationText, Validation } from '@/utils/validation';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required(getValidationText(Validation.Required))
        .email(getValidationText(Validation.Email)),
    password: Yup.string()
        .required(getValidationText(Validation.Required))
});

type FormValues = Yup.InferType<typeof validationSchema>;

const initialValues: FormValues = {
    email: '',
    password: '',
}

export const useLoginForm = () => {
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