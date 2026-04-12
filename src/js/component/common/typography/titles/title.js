import { fromObject } from '@mobJs';

/**
 * @param {string} index
 * @returns {string}
 */
const getIndex = (index) => {
    return index.length > 0
        ? fromObject({
              tag: 'span',
              className: 'title-index',
              content: index,
          })
        : ``;
};

/** @type {import('@mobJsType').MobComponent<import('./type').Title>} */
export const TitleFn = ({ getProxi }) => {
    const proxi = getProxi();

    const colorClass = proxi.color === 'inherit' ? '' : `is-${proxi.color}`;
    const boldClass = proxi.isBold ? `u-weight-bold` : '';
    const isSectionClass = proxi.isSection ? `is-section` : '';

    return fromObject({
        tag: proxi.tag,
        className: [colorClass, boldClass, isSectionClass],
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
