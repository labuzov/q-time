import * as Yup from 'yup';

import { useForm } from '@/hooks/useForm';
import { getValidationText, Validation } from '@/utils/validation';
import { QuestionDto } from '@/@types/quiz';


const getValidationSchema = (minAnswersCount: number, maxAnswersCount: number) => Yup.object().shape({
    title: Yup.string()
        .required(getValidationText(Validation.Required))
        .min(6, getValidationText(Validation.MinLength, { value: 6 }))
        .max(100, getValidationText(Validation.MaxLength, { value: 100 })),
    answers: Yup.array().of(
        Yup.object().shape({
            id: Yup.string().required(),
            title: Yup.string()
                .required(getValidationText(Validation.Required))
                .max(50, getValidationText(Validation.MaxLength, { value: 50 })),
            isCorrect: Yup.boolean().required()
        })
    ).required()
    .min(minAnswersCount, getValidationText(Validation.MinArrayLength, { value: minAnswersCount }))
    .max(maxAnswersCount, getValidationText(Validation.MaxArrayLength, { value: maxAnswersCount }))
});

type Schema = ReturnType<typeof getValidationSchema>
type FormValues = Yup.InferType<Schema>;

const getInitialValues = (question?: QuestionDto): FormValues => {
    return {
        title: question?.title ?? '',
        answers: question?.answers ?? []
    }
}

export const useQuizQuestionModalForm = (question?: QuestionDto, minAnswersCount?: number, maxAnswersCount?: number) => {
    const {
        values, isValid, errors,
        setFieldValue, setValues, validate
    } = useForm({
        initialValues: getInitialValues(question),
        validationSchema: getValidationSchema(minAnswersCount || 2, maxAnswersCount || 4)
    });

    const isAnswerItemError = (answers: unknown): answers is { title: string }[] => {
        if (Array.isArray(answers) && answers.length) {
            return true;
        }

        return false;
    }

    return {
        values,
        isValid,
        errors,
        isAnswerItemError,
        setFieldValue,
        setValues,
        validate
    }
}