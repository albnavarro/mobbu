import { createComponentDefinition } from '../../../../mobjs';
import { horizontalScrollerSection } from './horizontalScrollerSection';

export const horizontalScrollerSectionDef = createComponentDefinition({
    name: 'horizontalScrollerSection',
    component: horizontalScrollerSection,
    exportState: ['id', 'pinClass'],
    state: {
        id: () => ({
            id: -1,
            type: Number,
        }),
        pinClass: () => ({
            id: '',
            type: String,
        }),
    },
});
