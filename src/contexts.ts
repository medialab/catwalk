import {createContext} from 'react';
import type {SupportedLanguages} from '../i18n';

export const LangContext = createContext<SupportedLanguages>('en');
