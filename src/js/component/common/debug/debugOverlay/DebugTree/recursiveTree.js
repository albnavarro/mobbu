import { html } from '../../../../../mobjs';

/**
 * @import { StaticProps } from '../../../../../mobjs/type';
 **/

/**
 * @param {object} params
 * @param {import('./DebugTreeItem/type').DebugTreeItem[]} params.data
 * @param {StaticProps<import('./DebugTreeItem/type').DebugTreeItem>} params.data
 *
 * @return { string }
 */
export const generateTree = ({ data, staticProps }) => {
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
