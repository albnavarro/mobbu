import { htmlObject } from '@mobJs';

/**
 * @param {string} index
 * @returns {HTMLElement}
 */
const getIndex = (index) => {
    return index.length > 0
        ? htmlObject({
              tag: 'span',
              className: 'title-index',
              content: index,
          })
        : htmlObject({});
};

/** @type {import('@mobJsType').MobComponent<import('./type').Title>} */
export const TitleFunction = ({ getSelfProxi }) => {
    const proxi = getSelfProxi();

    const colorClass = proxi.color === 'inherit' ? '' : `is-${proxi.color}`;
    const boldClass = proxi.isBold ? `u-weight-bold` : '';
    const sectionClass = proxi.isSection ? `is-section` : '';

    return htmlObject({
        tag: proxi.tag,
        className: [colorClass, boldClass, sectionClass],
        content: [
            getIndex(proxi.index),
            {
                tag: 'span',
                className: 'title-content',
                content: {
                    tag: 'mobjs-slot',
                },
            },
        ],
    });
};
