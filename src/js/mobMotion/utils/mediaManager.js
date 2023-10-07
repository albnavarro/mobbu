// @ts-check

import { handleSetUp } from '../setup.js';

/**
 * @param { import('./type.js').mqValues } breackpoint
 * @return {Boolean}
 */
const max = (breackpoint = 'desktop') => {
    return window.innerWidth < handleSetUp.get('mq')[breackpoint];
};

/**
 * @param { import('./type.js').mqValues } breackpoint
 * @return {Boolean}
 */
const min = (breackpoint = 'desktop') => {
    return window.innerWidth >= handleSetUp.get('mq')[breackpoint];
};

/**
 * @param { import('./type.js').mqValues } breackpoint
 * @return {Number}
 */
const getBreackpoint = (breackpoint = 'desktop') => {
    return handleSetUp.get('mq')[breackpoint];
};

/**
 * @description
 *
 * @example
 *
 * ```js
 *   Property schema:
 *   mq.min([string])
 *   mq.max([string])
 *   mq.getBreackpoint([string])
 *
 *   const isDesktop = mq.min('desktop'); // true/false
 *   const isMobile = mq.min('desktop'); // true/false
 *   const desktopBreackPoint = mobbu.getBreackpoint('desktop'); // 992
 *
 * ```
 */
export const mq = (() => {
    return { max, min, getBreackpoint };
})();
