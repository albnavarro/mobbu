import { Matrioska } from '../../component/pages/matrioska/definition';
import { html, MobJs } from '../../mob/mobjs';

MobJs.useComponent([Matrioska]);

export const matrioska_page = () => {
    return html` <page-matrioska> </page-matrioska> `;
};
