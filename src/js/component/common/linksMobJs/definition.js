import { createComponent } from '../../../mobjs';
import { linksMobJs } from './linksMobJs';
import { linksMobJsButton } from './linksMobJsButton';

export const paramsMobJsDef = createComponent({
    name: 'links-mobjs',
    component: linksMobJs,
    exportState: ['section'],
    state: {
        section: () => ({
            value: '',
            type: String,
        }),
    },
    child: [paramsMobJsButtonDef],
});

export const paramsMobJsButtonDef = createComponent({
    name: 'links-mobjs-button',
    component: linksMobJsButton,
    exportState: ['label', 'url'],
    state: {
        label: () => ({
            value: '',
            type: String,
        }),
        url: () => ({
            value: '',
            type: String,
        }),
    },
});
