import { htmlObject } from '@mobJs';

/** @type {import('@mobJsType').MobComponent<import('./type').Paragraph>} */
export const ParagraphFunction = ({ getState }) => {
    const { style, color, boxed, note } = getState();
    const colorClass = color === 'inherit' ? '' : `is-${color}`;
    const boxedClass = boxed ? `is-boxed` : '';
    const noteClass = note ? `is-note` : '';

    return htmlObject({
        tag: 'p',
        className: [`is-${style}`, boxedClass, noteClass, colorClass],
        content: {
            tag: 'mobjs-slot',
        },
    });
};
