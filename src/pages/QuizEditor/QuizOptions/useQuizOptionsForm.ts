import * as Yup from 'yup';

import { useForm } from '@/hooks/useForm';
import { getValidationText, Validation } from '@/utils/validation';
import { QuizDto } from '@/@types/quiz';

const getValidationSchema = () => Yup.object().shape({
    title: Yup.string()
        .required(getValidationText(Validation.Required))
        .min(10, getValidationText(Validation.MinLength, { value: 10 }))
        .max(60, getValidationText(Validation.MaxLength, { value: 60 })),
    description: Yup.string()
        .required(getValidationText(Validation.Required))
        .min(10, getValidationText(Validation.MinLength, { value: 10 }))
        .max(100, getValidationText(Validation.MaxLength, { value: 100 })),
    imageUrl: Yup.string()
        .max(500, getValidationText(Validation.MaxLength, { value: 500 })),
});

type Schema = ReturnType<typeof getValidationSchema>
type FormValues = Yup.InferType<Schema>;

const getInitialValues = (quiz: QuizDto | null): FormValues => {
    return {
        title: quiz?.title ?? '',
        description: quiz?.description ?? '',
        imageUrl: quiz?.image ?? '',
    }
}

export const useQuizOptionsForm = (quiz: QuizDto | null) => {
    const {
        values, isValid, errors,
        setFieldValue, setValues, validate
    } = useForm({
        initialValues: getInitialValues(quiz),
        validationSchema: getValidationSchema()
    });

    return {
        values,
        isValid,
        errors,
        setFieldValue,
        setValues,
        validate
    }
}