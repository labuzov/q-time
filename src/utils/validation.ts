import { TOptions } from 'i18next';

import i18n from '@/i18n/i18n';


export const enum Validation {
    Invalid = 'validation.invalid',
    Required = 'validation.required',
    Email = 'validation.email',
    MinLength = 'validation.minLength',
    MaxLength = 'validation.maxLength'
}

type Options = TOptions;

export const getValidationText = (text: Validation, options?: Options) => {
    console.log(i18n.isInitialized, i18n.t(text, options))
    return i18n.t(text, options);
}