import { htmlObject, MobJs } from '@mobJs';
import { Move3DItem } from '../move-3d-item/definition';

/**
 * @param {object} params
 * @param {boolean} params.debug
 * @param {number} [params.id]
 * @returns {HTMLElement}
 */
const getDebug = ({ debug, id }) => {
    return debug
        ? htmlObject({
              tag: 'span',
              className: 'debug',
              content: `${id}`,
          })
        : htmlObject({});
};

/** @type{(arg0: {data: import("../type").Move3DChildren[], root: boolean, childrenId: string, debug: boolean} ) => HTMLElement[]} */
export const Recursive3Dshape = ({ data, root, childrenId, debug }) => {
    return data.map(({ children, props }) => {
        return htmlObject({
            component: Move3DItem,
            attributes: { name: childrenId },
            modules: MobJs.staticProps(
                /** @type {import('../move-3d-item/type').Move3DItem['state']} */ ({
                    root,
                    ...props,
                })
            ),
            content: [
                getDebug({ debug, id: props.id }),
                Recursive3Dshape({
                    data: children ?? [],
                    root: false,
                    childrenId,
                    debug,
                }),
            ],
        });
    });
};
