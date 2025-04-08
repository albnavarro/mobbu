// @ts-check

import { ATTR_PROPS } from './constant';
import { setStaticProps } from './modules/staticProps';

/**
 * @param {{[key:string]:any}} props
 * @returns {string}
 *
 * @description
 * Set static props
 *
 * @example
 * ```javascript
 * <MyComponent
 *     ${staticProps({
 *         gutter: 1,
 *         ...
 *     })}
 * ></MyComponent>
 *
 * ```
 *
 */
export const staticProps = (props = {}) => {
    return `${ATTR_PROPS}="${setStaticProps(props)}"`;
};

/**
 * @param {number} num
 * @param {number} lower
 * @param {number} upper
 * @returns {number}
 */
export const clamp = (num, lower, upper) => {
    return Math.min(Math.max(num, lower), upper);
};
