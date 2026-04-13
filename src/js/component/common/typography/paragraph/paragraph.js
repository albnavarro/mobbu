import { htmlObject } from '@mobJs';

/** @type {import('@mobJsType').MobComponent<import('./type').Paragraph>} */
export const ParagraphFn = ({ getState }) => {
    const { style, color, boxed, note } = getState();
    const colorClass = color === 'inherit' ? '' : `is-${color}`;
    const boxedClass = boxed ? `p-boxed` : '';
    const noteClass = note ? `p-note` : '';

    return htmlObject({
        tag: 'p',
        className: ['p', `p-${style}`, boxedClass, noteClass, colorClass],
        content: {
            tag: 'mobjs-slot',
        },
    });
};
