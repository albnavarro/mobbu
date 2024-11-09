//@ts-check

import { createComponent } from '../../../mobjs';
import { FooterShapeV1 } from '../../common/shapes/definition';
import { HomeComponentFn } from './home';

export const HomeComponent = createComponent({
    name: 'home-component',
    component: HomeComponentFn,
    exportState: ['svg', 'svgRight', 'svgLeft'],
    state: {
        svgLeft: () => ({
            value: '',
            type: String,
        }),
        svgRight: () => ({
            value: '',
            type: String,
        }),
        svg: () => ({
            value: '',
            type: String,
        }),
    },
    child: [FooterShapeV1],
});
