import { fromObject } from '@mobJs';
import { DebugTreeItem } from './item/definition';

/**
 * @import {StaticProps} from "@mobJsType"
 */

/**
 * @param {object} params
 * @param {import('./item/type').DebugTreeItemType['props'][]} params.data
 * @param {StaticProps<import('./item/type').DebugTreeItemType>} params.staticProps
 * @returns {string}
 */
export const generateTreeComponents = ({ data, staticProps }) => {
    return data
        .map(({ id, componentName, instanceName, children }) => {
            return fromObject({
                component: DebugTreeItem,
                modules: staticProps(
                    /** @type {import('./item/type').DebugTreeItemType['props']} */ ({
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
