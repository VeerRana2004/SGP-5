import { atom } from 'recoil';

export const language = atom({
    key: 'language',
    default: 'javascript',
});

export const cmtheme = atom({
    key: 'cmtheme',
    default: 'dracula',
});
