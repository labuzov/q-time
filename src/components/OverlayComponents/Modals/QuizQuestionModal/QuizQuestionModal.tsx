
import { QuestionDto } from '@/@types/quiz';
import { getRandomId } from '@/utils/random';

import { Button } from '@/components/Button';
import { Label } from '@/components/Form/Label';
import { Typography } from '@/components/Typography';
import { Input } from '@/components/FormControls/Input';
import { FeedbackWrapper } from '@/components/Form/Feedback/FeedbackWrapper';

import { useQuizQuestionModalForm } from './useQuizQuestionModalForm';
import { ModalProps, ModalBase } from '../../Modals';
import { ModalContent } from '../ModalContent';
import { ModalHeader } from '../ModalHeader';
import { ModalFooter } from '../ModalFooter';
import styles from './QuizQuestionModal.module.scss';
import { MdCheckCircleOutline, MdDeleteOutline } from 'react-icons/md';
import { Row } from '@/components/Form/Row';
import { Feedback } from '@/components/Form/Feedback';
import classNames from 'classnames';


export type QuizQuestionModalProps = ModalProps & {
    question?: QuestionDto;
    titleTextId?: string;
    minAnswersCount?: number;
    maxAnswersCount?: number;
    onSubmit?: (question: QuestionDto) => void;
}

export const QuizQuestionModal: React.FC<QuizQuestionModalProps> = ({
    question, titleTextId, minAnswersCount = 2, maxAnswersCount = 4,
    onClose, ...props
}) => {
    const {
        values, errors, isValid,
        setFieldValue, validate, isAnswerItemError
    } = useQuizQuestionModalForm(question);

    const handleSubmit = async () => {
        if (!await validate()) return;

        const questionDto: QuestionDto = {
            title: values.title,
            answers: values.answers,
            isEdited: true
        }

        onClose?.(questionDto);
    }

    const handleCancel = () => {
        onClose?.();
    }

    const handleAnswerAdd = () => {
        const answers = [...values.answers];
        answers.push({ id: getRandomId(), title: '', isCorrect: false });

        setFieldValue('answers', answers);
    }

    const handleAnswerTitleChange = (answerId: string, title: string) => {
        const answers = [...values.answers];

        const modifiedAnswers = answers.map(answer => {
            if (answer.id === answerId) answer.title = title;
            return answer;
        });

        setFieldValue('answers', modifiedAnswers);
    }

    const handleAnswerIsCorrectChange = (answerId: string, isCorrect: boolean) => {
        const answers = [...values.answers];

        const modifiedAnswers = answers.map(answer => {
            answer.isCorrect = answer.id === answerId && isCorrect;
            return answer;
        });

        setFieldValue('answers', modifiedAnswers);
    }

    const handleAnswerDelete = (answerId: string) => {
        const answers = [...values.answers];

        const filteredAnswers = answers.filter(answer => {
            if (answer.id === answerId) return false;
            return true;
        });

        setFieldValue('answers', filteredAnswers);
    }

    return (
        <ModalBase onClose={handleCancel} width={600} {...props}>
            <ModalHeader
                onClose={handleCancel}
            >
                <Typography textId={question ? 'modal.quiz.question.title.edit' : 'modal.quiz.question.title.new'} />
            </ModalHeader>
            <ModalContent>
                <Row className={styles.title}>
                    <Label>
                        <Typography textId="modal.quiz.question.fields.title" />
                    </Label>
                    <FeedbackWrapper errors={errors.title}>
                        <Input
                            value={values.title}
                            isInvalid={!!errors.title}
                            placeholder="modal.quiz.question.fields.title.placeholder"
                            onChange={e => setFieldValue('title', e.currentTarget.value)}
                        />
                    </FeedbackWrapper>
                </Row>
    
                <Row className={styles.answers}>
                    <Label>
                        <Typography textId="modal.quiz.question.fields.answer" />
                    </Label>

                    {values.answers?.map((answer, index) => {
                        const answerError = isAnswerItemError(errors.answers) ? errors.answers?.[index]?.title : '';

                        return (
                            <div className={styles.answersItem} key={answer.id}>
                                <div className={styles.answersItemNumber}>
                                    {index + 1}.
                                </div>
                                <div className={styles.answersItemField}>
                                    <FeedbackWrapper errors={answerError}>
                                        <Input
                                            value={answer.title}
                                            isInvalid={!!answerError}
                                            placeholder="modal.quiz.question.fields.answer.placeholder"
                                            onChange={e => handleAnswerTitleChange(answer.id, e.currentTarget.value)}
                                        />
                                    </FeedbackWrapper>
                                </div>
                                <div className={styles.answersItemActions}>
                                    <Button
                                        variant="secondary"
                                        className={classNames(
                                            styles.answersItemActionsItem,
                                            answer.isCorrect && styles.correct
                                        )}
                                        onClick={() => handleAnswerIsCorrectChange(answer.id, true)}
                                    >
                                        <MdCheckCircleOutline />
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        className={styles.answersItemActionsItem}
                                        onClick={() => handleAnswerDelete(answer.id)}
                                    >
                                        <MdDeleteOutline />
                                    </Button>
                                </div>
                            </div>
                        )
                    })}

                    {!isAnswerItemError(errors.answers) && (
                        <Feedback>
                            <>
                                {errors.answers}
                            </>
                        </Feedback>
                    )}

                    <div className={styles.answersActions}>
                        <Button
                            variant="text"
                            disabled={values.answers.length >= maxAnswersCount}
                            onClick={handleAnswerAdd}
                        >
                            <Typography textId="modal.quiz.question.button.add" />
                        </Button>
                    </div>
                </Row>
            </ModalContent>
            <ModalFooter>
                <Button
                    variant="secondary"
                    onClick={handleCancel}
                >
                    <Typography textId="modal.quiz.question.button.cancel" />
                </Button>
                <Button
                    disabled={!isValid}
                    onClick={handleSubmit}
                >
                    <Typography textId="modal.quiz.question.button.submit" />
                </Button>
            </ModalFooter>
        </ModalBase>
    );
}
