import { FC } from 'react';
import { MdDeleteOutline } from 'react-icons/md';

import { FeedbackWrapper } from '@/components/Form/Feedback/FeedbackWrapper';
import { Input } from '@/components/FormControls/Input';
import { Typography } from '@/components/Typography';
import { Label } from '@/components/Form/Label';
import { Row } from '@/components/Form/Row';

import styles from './QuizOptions.module.scss';
import { DragAndDropArea } from '@/components/DragAndDropArea';
import { FileFormats } from '@/constants/files';
import { Image } from '@/components/Image';
import { FORM_CONFIG } from '@/constants/formConfig';
import { Button } from '@/components/Button';


const imageFormats: FileFormats[] = [FileFormats.JPG, FileFormats.PNG];

type Props = {
    title: string;
    titleError?: string;
    description: string,
    descriptionError?: string;
    imageUrl: string;
    imageUrlError?: string;
    onTitleChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
    onImageChange: (files: File[]) => void;
    onImageClear: () => void;
}

export const QuizOptions: FC<Props> = ({
    title, titleError, description, descriptionError, imageUrl, imageUrlError,
    onTitleChange, onDescriptionChange, onImageChange, onImageClear
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
                        <Typography textId="editor.options.fields.image" />
                    </Label>
                    <FeedbackWrapper errors={imageUrlError}>
                        {!!imageUrl ? (
                            <div className={styles.image}>
                                <Image src={imageUrl} />

                                <Button
                                    variant="icon"
                                    className={styles.imageDeleteAction}
                                    onClick={onImageClear}
                                >
                                    <MdDeleteOutline />
                                </Button>
                            </div>
                        ) : (
                            <DragAndDropArea
                                acceptedFormats={imageFormats}
                                maxSizeInMB={FORM_CONFIG.quiz.image.maxSizeInMb}
                                onFilesChange={onImageChange}
                            />
                        )}
                    </FeedbackWrapper>
                </Row>

            </div>
        </div>
    );
}
