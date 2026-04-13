import { htmlObject } from '@mobJs';
import {
    MatrioskaInvalidate,
    MatrioskaRepeat,
} from '@pagesComponent/matrioska/definition';

export const matrioska_repeat_page = () => {
    return htmlObject({
        component: MatrioskaRepeat,
    });
};

export const matrioska_invalidate_page = () => {
    return htmlObject({
        component: MatrioskaInvalidate,
    });
};
