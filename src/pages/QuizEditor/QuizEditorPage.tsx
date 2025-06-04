import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';

import { Container } from '@/components/Container';
import { Breakpoints } from '@/constants/screen';
import { Loading } from '@/components/Loading';
import { Typography } from '@/components/Typography';
import { Button } from '@/components/Button';
import { InViewAnimation } from '@/components/InViewAnimation';

import styles from './QuizEditorPage.module.scss';
import { useQuizEditorPage } from './useQuizEditorPage';
import { QuizQuestions } from './Questions/QuizQuestions';
import { QuizOptions } from './QuizOptions/QuizOptions';
import { ForbiddenPage } from '../Errors/403ForbiddenPage';
import { NotFoundPage } from '../Errors/404NotFoundPage';


const QuizEditorPage: FC = () => {
    useProtectedRoute();
    const navigate = useNavigate();
    const {
        values, errors, isValid, isLoading, isCompletedOnce, isNew, status,
        setFieldValue, validate, addQuestion, editQuestion, removeQuestion, setImage, submit
    } = useQuizEditorPage();

    const handleSubmit = async () => {
        if (!await (validate())) return;

        await submit();
        navigate(ROUTES.myQuizzes.get());
    }

    if (!isCompletedOnce) return (
        <Loading fillContainer />
    );

    if (status === 'forbidden') return (
        <ForbiddenPage />
    );

    if (status === 'notFound') return (
        <NotFoundPage />
    );

    return (
        <Container maxWidth={Breakpoints.XL}>
            <div className={styles.content}>
                <InViewAnimation className={styles.header} variant="opacity">
                    <div className={styles.info}>
                        <Typography
                            textId={isNew ? 'editor.title.new' : 'editor.title.edit'}
                            variant="h3"
                        />
                    </div>

                    <div className={styles.actions}>
                        <Button
                            disabled={isLoading || !isValid}
                            onClick={handleSubmit}
                        >
                            <Typography textId="editor.button.save" />
                        </Button>
                    </div>
                </InViewAnimation>

                <div className={styles.forms}>
                    <InViewAnimation className={styles.options} variant="translateTop" duration={0.2}>
                        <QuizOptions
                            title={values.title}
                            titleError={errors.title}
                            description={values.description}
                            descriptionError={errors.description}
                            imageUrl={values.imageUrl ?? ''}
                            imageUrlError={errors.imageUrl}
                            onTitleChange={v => setFieldValue('title', v)}
                            onDescriptionChange={v => setFieldValue('description', v)}
                            onImageChange={v => setImage(v)}
                            onImageClear={() => setFieldValue('imageUrl', '')}
                        />
                    </InViewAnimation>
                    <InViewAnimation className={styles.questions} variant="translateTop" duration={0.2}>
                        <QuizQuestions
                            questions={values.questions ?? []}
                            onAdd={addQuestion}
                            onEdit={editQuestion}
                            onRemove={removeQuestion}
                        />
                    </InViewAnimation>
                </div>
            </div>
        </Container>
    );
}

export default QuizEditorPage;
