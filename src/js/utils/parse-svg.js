/**
 * @param {object} params
 * @param {string} params.svg
 * @param {string} params.id
 * @returns {Element}
 */
export const parseSvg = ({ svg, id }) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svg, 'image/svg+xml');

    /**
     * Extract svg element
     */
    const svgElement = doc.documentElement;
    const layers = svgElement.querySelectorAll('[type="layer"]');
    const layersToRemove = svgElement.querySelectorAll('[type="delete"]');

    for (const layer of layers) {
        if (layer.id !== id) {
            layer.remove();
        }
    }

    for (const layer of layersToRemove) {
        layer.remove();
    }

    /**
     * Return SVG element
     */
    return svgElement;
};
