import { fromObject } from '@mobJs';

/**
 * @import {StaticProps} from "@mobJsType"
 */

/**
 * @param {object} params
 * @param {import('./item/type').DebugTreeItem['props'][]} params.data
 * @param {StaticProps<import('./item/type').DebugTreeItem>} params.staticProps
 * @returns {string}
 */
export const generateTreeComponents = ({ data, staticProps }) => {
    return data
        .map(({ id, componentName, instanceName, children }) => {
            return fromObject({
                tag: 'debug-tree-item',
                modules: staticProps(
                    /** @type {import('./item/type').DebugTreeItem['props']} */ ({
                        id,
                        componentName,
                        instanceName,
                        children,
                    })
                ),
            });
        })
        .join('');
};
