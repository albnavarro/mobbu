import { Matrioska } from '../../component/pages/matrioska/definition';
import { html, useComponent } from '../../mobjs';

useComponent([Matrioska]);

export const matrioska_page = () => {
    return html` <page-matrioska> </page-matrioska> `;
};
