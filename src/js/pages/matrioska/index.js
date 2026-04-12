import { fromObject, MobJs } from '@mobJs';
import {
    MatrioskaInvalidate,
    MatrioskaRepeat,
} from '@pagesComponent/matrioska/definition';

MobJs.useComponent([MatrioskaRepeat, MatrioskaInvalidate]);

export const matrioska_repeat_page = () => {
    return fromObject({
        component: MatrioskaRepeat,
    });
};

export const matrioska_invalidate_page = () => {
    return fromObject({
        component: MatrioskaInvalidate,
    });
};
