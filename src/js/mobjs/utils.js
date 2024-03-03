// @ts-check

import { ATTR_PROPS } from './constant';
import { setStaticProps } from './temporaryData/staticProps';

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
