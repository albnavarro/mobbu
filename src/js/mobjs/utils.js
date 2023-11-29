// @ts-check

import { ATTR_PROPS } from './constant';
import { getComponentList } from './mainStore/actions/componentList';
import { setStaticProps } from './temporaryData/staticProps';

/**
 * @return {Object} Return Object with
 * key: component name in uppercase.
 * value: component name original
 *
 * @description
 * Get component Object with name in uppercase and the value is the original name.
 * Name in uppercase is necessary for element.tagName
 */
export const getComponentsReference = () => {
    const componentList = getComponentList();

    return Object.keys(componentList)
        .map((key) => ({
            [key.toUpperCase()]: key,
        }))
        .reduce((previous, current) => {
            return { ...previous, ...current };
        }, {});
};

/**
 * @param {{String:any}|{}} props
 * @returns {String}
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
