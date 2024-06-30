//@ts-check

import { createComponent } from '../../../mobjs';
import { HomeComponentFn } from './home';

export const HomeComponent = createComponent({
    name: 'home-component',
    component: HomeComponentFn,
    exportState: ['svg'],
    state: {
        svg: () => ({
            value: '',
            type: String,
        }),
    },
});
