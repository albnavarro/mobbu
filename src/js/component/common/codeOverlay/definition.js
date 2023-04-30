import { CodeOverlay } from './codeOverlay';
import { CodeOverlayButton } from './codeOverlayButton';

const validContent = ['description', 'js', 'scss', 'html'];

export const codeOverlayComponentDef = {
    CodeOverlay: {
        componentFunction: CodeOverlay,
        componentParams: {
            props: {
                contents: [...validContent],
            },
            state: {
                description: () => ({
                    value: 'md url content',
                    type: String,
                }),

                js: () => ({
                    value: 'js url content',
                    type: String,
                }),
                scss: () => ({
                    value: 'scss url content',
                    type: String,
                }),
                html: () => ({
                    value: 'html url content',
                    type: String,
                }),
                activeContent: () => ({
                    value: '',
                    type: String,
                    skipEqual: false,
                    validate: (val) => {
                        return [...validContent, ''].includes(val);
                    },
                }),
                rawContent: () => ({
                    value: '',
                    type: String,
                }),
                isOpen: () => ({
                    value: false,
                    type: Boolean,
                }),
            },
        },
    },
    CodeOverlayButton: {
        componentFunction: CodeOverlayButton,
        componentParams: {
            props: {
                key: '',
                callback: () => {},
            },
        },
    },
};
