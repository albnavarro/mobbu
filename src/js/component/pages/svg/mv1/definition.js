import { createComponent } from '../../../../mobjs';
import { OnlyDesktop } from '../../../common/onlyDesktop/definition';
import { Mv1Component } from './mv1';

export const Mv1Def = createComponent({
    name: 'mv1-component',
    component: Mv1Component,
    exportState: ['logo', 'sideShape'],
    state: {
        logo: () => ({
            value: '',
            type: String,
        }),
        sideShape: () => ({
            value: '',
            type: String,
        }),
    },
    child: [OnlyDesktop],
});
