//@ts-check

import { createComponent } from '../../../mobjs';
import { DocTitleFn } from './docSide';

export const DocTitle = createComponent({
    name: 'doc-title',
    component: DocTitleFn,
    state: {},
});
