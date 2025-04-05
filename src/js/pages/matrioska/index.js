import { html, MobJs } from '@mobJs';
import { Matrioska } from '../../component/pages/matrioska/definition';

MobJs.useComponent([Matrioska]);

export const matrioska_page = () => {
    return html` <page-matrioska> </page-matrioska> `;
};
