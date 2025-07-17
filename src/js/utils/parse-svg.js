import { serializeFragment } from '../mob/mob-js/parse/steps/utils';

/**
 * @param {object} params
 * @param {string} params.svg
 * @param {string} params.id
 * @returns String
 */
export const parseSvg = ({ svg, id }) => {
    const fragment = document.createRange().createContextualFragment(svg);
    const layers = fragment.querySelectorAll('[type="layer"]');
    const layerToRemove = fragment.querySelectorAll('[type="delete"]');

    [...layers].forEach((layer) => {
        const currentId = layer.id;
        if (currentId !== id) layer.remove();
    });

    [...layerToRemove].forEach((layer) => {
        layer.remove();
    });

    const serialized = serializeFragment(fragment);

    return serialized;
};
