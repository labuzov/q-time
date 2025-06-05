import { FileFormats } from '@/constants/files';


export const getUIFileSize = (size: number) => {
    if (size == 0) return '0 Bytes';
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const k = 1024;
    const i = Math.floor(Math.log(size) / Math.log(k));

    return parseFloat((size / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export const getFileExtension = (fileName: string) => {
    return fileName.split('.').pop();
}

export const getFileFormatName = (format: FileFormats) => {
    switch (format) {
        case FileFormats.PNG: return 'PNG';
        case FileFormats.JPG: return 'JPG';
        default: {
            const exhaustiveCheck: never = format;
            return exhaustiveCheck;
        };
    }
}

export const convertImageToBase64 = (file: File, onSuccess: (base64: string) => void) => {
    if (!file.type.includes('image')) return;

    const img = new Image();

    img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const maxWidth = 800;
        const maxHeight = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
            if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
            }
        } else {
            if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
            }
        }

        canvas.width = width;
        canvas.height = height;

        ctx?.drawImage(img, 0, 0, width, height);

        const base64String = canvas.toDataURL('image/jpeg', 0.7);
        onSuccess(base64String);
    };

    const reader = new FileReader();

    reader.onload = (e) => {
        img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
}
