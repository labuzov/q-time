import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';

import { getValidationText, Validation } from '@/utils/validation';
import { useLoading } from '@/hooks/useLoading';
import { useForm } from '@/hooks/useForm';
import { quizApi } from '@/api/quizApi';
import { QuestionDto, QuizDto } from '@/@types/quiz';
import { firebaseAuth } from '@/firebaseConfig';


const minQuestionsCount = 1;
const maxQuestionsLength = 20;

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
    questions: Yup.array<QuestionDto, QuestionDto>()
        .min(minQuestionsCount, getValidationText(Validation.MinQuestionsLength, { value: minQuestionsCount }))
        .max(maxQuestionsLength, getValidationText(Validation.MaxQuestionsLength, { value: maxQuestionsLength }))
});

type Schema = ReturnType<typeof getValidationSchema>
type FormValues = Yup.InferType<Schema>;

const initialValues: FormValues = {
    title: '',
    description: '',
    imageUrl: '',
    questions: []
}

export const useQuizEditorPage = () => {
    const { isLoading, isCompletedOnce, addToLoading } = useLoading();
    const { id } = useParams<{ id: string }>();
    const {
        values, isValid, errors,
        setFieldValue, setValues, validate
    } = useForm({
        initialValues,
        validationSchema: getValidationSchema()
    })

    const isNew = !id || id === 'new';

    useEffect(() => {
        addToLoading(init);
    }, [])

    const init = async () => {
        if (isNew) return;

        const quizRequest = loadQuiz(id);
        const questionsRequest = loadQuestions(id);

        await Promise.all([quizRequest, questionsRequest]);
    }

    const loadQuiz = async (id: string) => {
        const quizData = await quizApi.getQuizById(id);
        if (!quizData) return;

        setValues({
            title: quizData.title ?? '',
            description: quizData.description ?? '',
            imageUrl: quizData.image ?? '',
        });
    }

    const loadQuestions = async (id: string) => {
        const questionsData = await quizApi.getQuizQuestions(id);
        if (!questionsData?.length) return;

        setFieldValue('questions', questionsData);
    }

    const addQuestion = (question: QuestionDto) => {
        const newQuestions = [...(values.questions ?? []), question];

        setFieldValue('questions', newQuestions);
    }

    const editQuestion = (questionIndex: number, question: QuestionDto) => {
        const newQuestions = values.questions?.map((item, index) => {
            if (index === questionIndex) return question;
            return item;
        });

        setFieldValue('questions', newQuestions);
    }

    const removeQuestion = (questionIndex: number) => {
        const newQuestions = values.questions?.filter((_, index) => {
            if (index === questionIndex) return false;
            return true;
        });

        setFieldValue('questions', newQuestions);
    }

    const submit = async () => {
        const quiz: QuizDto = {
            title: values.title,
            description: values.description,
            image: values.imageUrl ?? '',
            createdBy: firebaseAuth.currentUser?.uid ?? ''
        };
        const questions: QuestionDto[] = values.questions ?? [];

        if (isNew) {
            await quizApi.createQuiz(quiz, questions);
        } else {
            await quizApi.updateQuiz(id, quiz, questions);
        }
    }

    return {
        isLoading,
        isCompletedOnce,
        isNew,
        values,
        errors,
        isValid,
        setFieldValue,
        validate,
        addQuestion,
        editQuestion,
        removeQuestion,
        submit
    }
}