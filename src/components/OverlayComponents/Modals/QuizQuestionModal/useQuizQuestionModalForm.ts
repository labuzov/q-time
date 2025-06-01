import * as Yup from 'yup';

import { useForm } from '@/hooks/useForm';
import { getValidationText, Validation } from '@/utils/validation';
import { QuestionDto } from '@/@types/quiz';
import { FORM_CONFIG } from '@/constants/formConfig';


const getValidationSchema = (minAnswersCount: number, maxAnswersCount: number) => Yup.object().shape({
    title: Yup.string()
        .required(getValidationText(Validation.Required))
        .min(FORM_CONFIG.questions.title.min, getValidationText(Validation.MinLength, { value: FORM_CONFIG.questions.title.min }))
        .max(FORM_CONFIG.questions.title.max, getValidationText(Validation.MaxLength, { value: FORM_CONFIG.questions.title.max })),
    answers: Yup.array().of(
        Yup.object().shape({
            id: Yup.string().required(),
            title: Yup.string()
                .required(getValidationText(Validation.Required))
                .min(FORM_CONFIG.answers.title.min, getValidationText(Validation.MinLength, { value: FORM_CONFIG.answers.title.min }))
                .max(FORM_CONFIG.answers.title.max, getValidationText(Validation.MaxLength, { value: FORM_CONFIG.answers.title.max })),
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

export const useQuizQuestionModalForm = (minAnswersCount: number, maxAnswersCount: number, question?: QuestionDto) => {
    const {
        values, isValid, errors,
        setFieldValue, setValues, validate
    } = useForm({
        initialValues: getInitialValues(question),
        validationSchema: getValidationSchema(minAnswersCount, maxAnswersCount)
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