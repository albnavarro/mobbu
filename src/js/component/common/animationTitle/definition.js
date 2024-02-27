import { createComponent } from '../../../mobjs';
import { AnimationTitle } from './animationTitle';

export const animationTitleDef = createComponent({
    name: 'animation-title',
    component: AnimationTitle,
    exportState: ['title', 'align', 'color'],
    state: {
        title: () => ({
            value: '',
            type: String,
        }),
        align: () => ({
            value: 'left',
            type: String,
            validate: (value) => {
                return ['left', 'right'].includes(value);
            },
        }),
        color: () => ({
            value: 'white',
            type: String,
            validate: (value) => {
                return ['white', 'black', 'highlight'].includes(value);
            },
        }),
    },
});
