import { htmlObject } from '@mobJs';

/**
 * @import {
 *   BindProps,
 *   ProxiSelfState,
 *   ReturnBindProps,
 *   StaticProps
 * } from '@mobJsType'
 */

/**
 * @param {object} params
 * @param {import('./item/type').DebugTreeItemType['props'][]} params.data
 * @param {StaticProps<import('./item/type').DebugTreeItemType>} params.staticProps
 * @param {BindProps<import('./item/type').DebugTreeItemType> | null} [params.bindProps]
 * @param {ProxiSelfState<import('./item/type').DebugTreeItemType> | null} [params.proxi]
 * @returns {HTMLElement[]}
 */
export const generateTreeComponents = ({
    data,
    staticProps,
    bindProps = null,
    proxi = null,
}) => {
    return data.map(({ id, componentName, instanceName, children }) => {
        return bindProps && proxi
            ? /**
               * Is child of another tree-item
               *
               * - Has bindProps and shoub be hidden or visible
               */
              htmlObject({
                  /**
                   * Use tag instead component to prevent dependency cycle
                   */
                  tag: 'debug-tree-item',
                  modules: [
                      staticProps(
                          /** @type {import('./item/type').DebugTreeItemType['props']} */ ({
                              id,
                              componentName,
                              instanceName,
                              children,
                          })
                      ),
                      bindProps(
                          /** @returns {ReturnBindProps<import('./item/type').DebugTreeItemType>} */
                          () => ({
                              focusable: proxi?.isOpen,
                          })
                      ),
                  ],
              })
            : /**
               * First level tree.
               *
               * - Is not chil dof another tree-item.
               */
              htmlObject({
                  /**
                   * Use tag instead component to prevent dependency cycle
                   */
                  tag: 'debug-tree-item',
                  modules: [
                      staticProps(
                          /** @type {import('./item/type').DebugTreeItemType['props']} */ ({
                              id,
                              componentName,
                              instanceName,
                              children,
                              focusable: true,
                          })
                      ),
                  ],
              });
    });
};
