//@ts-check

import { html } from '@mobJs';

/**
 * @import { StaticProps } from '@mobJsType';
 **/

/**
 * @param {object} params
 * @param {import('./DebugTreeItem/type').DebugTreeItem['state'][]} params.data
 * @param {StaticProps<import('./DebugTreeItem/type').DebugTreeItem>} params.staticProps
 *
 * @return { string }
 */
export const generateTreeComponents = ({ data, staticProps }) => {
    return data
        .map(({ id, componentName, instanceName, children }) => {
            return html`<debug-tree-item
                ${staticProps({
                    id,
                    componentName,
                    instanceName,
                    children,
                })}
            ></debug-tree-item>`;
        })
        .join('');
};
