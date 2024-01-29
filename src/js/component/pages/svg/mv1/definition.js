import { createComponent } from '../../../../mobjs';
import { Mv1Component } from './home';

export const Mv1Def = createComponent({
    name: 'mv1-component',
    component: Mv1Component,
    exportState: ['svg'],
    state: {
        svg: () => ({
            value: '',
            type: String,
        }),
    },
});
