import { FC } from 'react';

import { FeedbackWrapper } from '@/components/Form/Feedback/FeedbackWrapper';
import { Input } from '@/components/FormControls/Input';
import { Typography } from '@/components/Typography';
import { Label } from '@/components/Form/Label';
import { Row } from '@/components/Form/Row';

import styles from './QuizOptions.module.scss';


type Props = {
    title: string;
    titleError?: string;
    description: string,
    descriptionError?: string;
    imageUrl: string;
    imageUrlError?: string;
    onTitleChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
    onImageUrlChange: (value: string) => void;
}

export const QuizOptions: FC<Props> = ({
    title, titleError, description, descriptionError, imageUrl, imageUrlError,
    onTitleChange, onDescriptionChange, onImageUrlChange
}) => {


    return (
        <div className={styles.options}>
            <div className={styles.paper}>
                <Typography textId="editor.options.title" variant="h5" className={styles.title} />

                <Row>
                    <Label>
                        <Typography textId="editor.options.fields.title" />
                    </Label>
                    <FeedbackWrapper errors={titleError}>
                        <Input
                            value={title}
                            isInvalid={!!titleError}
                            placeholder="editor.options.fields.title.placeholder"
                            onChange={e => onTitleChange(e.currentTarget.value)}
                        />
                    </FeedbackWrapper>
                </Row>

                <Row>
                    <Label>
                        <Typography textId="editor.options.fields.description" />
                    </Label>
                    <FeedbackWrapper errors={descriptionError}>
                        <Input
                            value={description}
                            isInvalid={!!descriptionError}
                            placeholder="editor.options.fields.description.placeholder"
                            onChange={e => onDescriptionChange(e.currentTarget.value)}
                        />
                    </FeedbackWrapper>
                </Row>

                <Row>
                    <Label>
                        <Typography textId="editor.options.fields.imageUrl" />
                    </Label>
                    <FeedbackWrapper errors={imageUrlError}>
                        <Input
                            value={imageUrl}
                            isInvalid={!!imageUrlError}
                            placeholder="editor.options.fields.imageUrl.placeholder"
                            onChange={e => onImageUrlChange(e.currentTarget.value)}
                        />
                    </FeedbackWrapper>
                </Row>

            </div>
        </div>
    );
}
