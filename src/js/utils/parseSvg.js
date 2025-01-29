import { serializeFragment } from '../mobjs/parse/steps/utils';

/**
 * @param {object} params
 * @param {string} params.svg
 * @param {string} params.id
 * @returns string
 */
export const parseSvg = ({ svg, id }) => {
    let fragment = document.createRange().createContextualFragment(svg);
    const layers = fragment.querySelectorAll('[type]');

    [...layers].forEach((layer) => {
        const currentId = layer.id;
        if (currentId !== id) layer.remove();
    });

    const serialized = serializeFragment(fragment);
    // @ts-ignore
    fragment = null;

    return serialized;
};
