import { CodeOverlay } from './codeOverlay';
import { CodeOverlayButton } from './codeOverlayButton';

const validContent = ['js', 'scss', 'html'];

export const codeOverlayComponentDef = {
    CodeOverlay: {
        componentFunction: CodeOverlay,
        componentParams: {
            props: {
                contents: [...validContent],
            },
            state: {
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
                    validate: (val) => {
                        return [...validContent, ''].includes(val);
                    },
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
