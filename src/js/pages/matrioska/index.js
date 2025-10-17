import { html, MobJs } from '@mobJs';
import {
    MatrioskaInvalidate,
    MatrioskaRepeat,
} from '@pagesComponent/matrioska/definition';

MobJs.useComponent([MatrioskaRepeat, MatrioskaInvalidate]);

export const matrioska_repeat_page = () => {
    return html` <page-matrioska-repeat> </page-matrioska-repeat> `;
};

export const matrioska_invalidate_page = () => {
    return html` <page-matrioska-invalidate> </page-matrioska-invalidate> `;
};
