import { FormikValues, useFormik } from 'formik'
import * as Yup from 'yup';


const emptyFunction = () => {};

type FormOptions<T> = {
    initialValues: T;
    validationSchema?: Yup.AnyObjectSchema;
}

export const useForm = <T extends FormikValues>({ initialValues, validationSchema }: FormOptions<T>) => {
    const { values, errors, isValid, validateForm, setFieldValue: setValue, setFieldError } = useFormik<T>({
        initialValues,
        validationSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: emptyFunction
    });

    const setFieldValue = (field: keyof T, value: unknown) => {
        setValue(field as string, value);
        setFieldError(field as string, undefined);
    }

    const validate = async () => {
        const errors = await validateForm(values);
        const isValid = !Object.keys(errors).length;

        return isValid;
    }

    return {
        values,
        errors,
        isValid,
        setFieldValue,
        validate
    };
}