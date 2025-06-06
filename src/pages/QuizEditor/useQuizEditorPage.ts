import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';

import { getValidationText, Validation } from '@/utils/validation';
import { useLoadingStatus } from '@/hooks/useLoadingStatus';
import { useLoading } from '@/hooks/useLoading';
import { useForm } from '@/hooks/useForm';
import { quizApi } from '@/api/quizApi';
import { firebaseAuth } from '@/firebaseConfig';
import { FORM_CONFIG } from '@/constants/formConfig';
import { QuestionDto, QuizDto } from '@/@types/quiz';
import { convertImageToBase64 } from '@/utils/files';


const getValidationSchema = () => Yup.object().shape({
    title: Yup.string()
        .required(getValidationText(Validation.Required))
        .min(FORM_CONFIG.quiz.title.min, getValidationText(Validation.MinLength, { value: FORM_CONFIG.quiz.title.min }))
        .max(FORM_CONFIG.quiz.title.max, getValidationText(Validation.MaxLength, { value: FORM_CONFIG.quiz.title.max })),
    description: Yup.string()
        .required(getValidationText(Validation.Required))
        .min(FORM_CONFIG.quiz.description.min, getValidationText(Validation.MinLength, { value: FORM_CONFIG.quiz.description.min }))
        .max(FORM_CONFIG.quiz.description.max, getValidationText(Validation.MaxLength, { value: FORM_CONFIG.quiz.description.max })),
    imageUrl: Yup.string(),
    questions: Yup.array<QuestionDto, QuestionDto>()
        .min(FORM_CONFIG.questions.minCount, getValidationText(Validation.MinQuestionsLength, { value: FORM_CONFIG.questions.minCount }))
        .max(FORM_CONFIG.questions.maxCount, getValidationText(Validation.MaxQuestionsLength, { value: FORM_CONFIG.questions.maxCount }))
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
        setFieldValue, setFieldValues, validate
    } = useForm({
        initialValues,
        validationSchema: getValidationSchema()
    });
    const { status, setStatus } = useLoadingStatus();

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
        if (!quizData) {
            setStatus('notFound');
            return;
        };

        if (quizData.createdBy !== firebaseAuth.currentUser?.uid) {
            setStatus('forbidden');
            return;
        }

        setFieldValues({
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

    const setImage = (files: File[]) => {
        const file = files[0];
        if (!file) return;

        convertImageToBase64(file, (base64) => {
            setFieldValue('imageUrl', base64);
        });
    }

    const submit = async () => {
        const quiz: QuizDto = {
            title: values.title,
            description: values.description,
            image: values.imageUrl ?? '',
            createdBy: firebaseAuth.currentUser?.uid ?? '',
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
        status,
        setFieldValue,
        validate,
        addQuestion,
        editQuestion,
        removeQuestion,
        setImage,
        submit
    }
}