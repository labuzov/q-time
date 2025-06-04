import { useState, useRef } from 'react';
import { MdCloudUpload } from 'react-icons/md';
import classNames from 'classnames';

import { FileFormats } from '@/constants/files';
import { getFileFormatName } from '@/utils/files';

import styles from './DragAndDropArea.module.scss';
import { Typography } from '../Typography';


type Props = {
    text?: string;
    disabled?: boolean;
    isMultiple?: boolean;
    acceptedFormats?: FileFormats[];
    maxSizeInMB?: number;
    error?: string;
    onFilesChange?: (files: File[]) => Promise<void> | void;
};

export const DragAndDropArea = ({
    text, disabled, isMultiple, acceptedFormats, maxSizeInMB, onFilesChange
}: Props) => {
    const [isDragActive, setIsDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const accept = acceptedFormats?.join(',');
    const acceptText = acceptedFormats?.map(format => getFileFormatName(format)).join(', ');

    const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();

        setIsDragActive(true);
    }

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();

        setIsDragActive(false);
    }

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    }

    const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();

        setIsDragActive(false);

        const files = event.dataTransfer.files;

        if (files && files.length) {
            await handleFilesChange(files);
            event.dataTransfer.clearData();
        }
    }

    const handleInputFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files.length) {
            await handleFilesChange(files);
            event.target.value = '';
        }
    }

    const handleFilesChange = async (fileList: FileList) => {
        const files: File[] = [];
        // transfer from FileList to File[]
        for (let i = 0; i < fileList.length; i++) {
            const file = fileList.item(i);
            if (!file) continue;
            
            files.push(file);
        }

        if (files && files.length) {
            const byFormat = (file: File) => accept ? accept.includes(file.type) : true;
            const bySize = (file: File) => {
                if (!maxSizeInMB) return true;

                const maxSize = maxSizeInMB * 1024 * 1024;
                if (file.size > maxSize) return false;

                return true;
            }

            const acceptedFiles = files.filter(byFormat).filter(bySize);

            if (acceptedFiles.length) {
                await onFilesChange?.(acceptedFiles);
            }
        }
    }

    const handleWrapperClick = () => {
        inputRef.current?.click();
    }

    return (
        <>
            <div
                className={classNames(
                    styles.wrapper,
                    isDragActive && styles.active,
                    disabled && styles.disabled
                )}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleWrapperClick}
            >
                <div className={styles.content}>
                    <MdCloudUpload />
                    <Typography
                        textId={text || 'dnd.text'}
                        variant="caption"
                        className={styles.text}
                    />
                    <input
                        ref={inputRef}
                        type="file"
                        accept={accept}
                        multiple={isMultiple}
                        style={{ display: 'none' }}
                        onChange={handleInputFileChange}
                    />
                </div>
            </div>

            {(!!acceptedFormats?.length || !!maxSizeInMB) && (
                <div className={styles.options}>
                    {!!acceptedFormats?.length && (
                        <Typography variant="caption" textId="dnd.accept" textOptions={{ value: acceptText }} />
                    )}

                    {!!maxSizeInMB && (
                        <Typography variant="caption" textId="dnd.size" textOptions={{ value: maxSizeInMB + ' MB' }} />
                    )}
                </div>
            )}
        </>
    );
};
