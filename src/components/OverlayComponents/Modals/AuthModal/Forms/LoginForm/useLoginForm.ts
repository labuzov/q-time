import * as Yup from 'yup';

import { useForm } from '@/hooks/useForm';
import { getValidationText, Validation } from '@/utils/validation';

const getValidationSchema = () => Yup.object().shape({
    email: Yup.string()
        .required(getValidationText(Validation.Required))
        .email(getValidationText(Validation.Email)),
    password: Yup.string()
        .required(getValidationText(Validation.Required))
});

type Schema = ReturnType<typeof getValidationSchema>
type FormValues = Yup.InferType<Schema>;

const initialValues: FormValues = {
    email: '',
    password: '',
}

export const useLoginForm = () => {
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