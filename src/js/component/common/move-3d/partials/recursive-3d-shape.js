//@ts-check

import { html, MobJs } from '@mobJs';

/**
 * @param {object} params
 * @param {boolean} params.debug
 * @param {number} [params.id]
 * @returns {string}
 */
const getDebug = ({ debug, id }) => {
    return debug ? html`<span class="c-move3d-item__debug">${id}</span>` : '';
};

/** @type{(arg0: {data: import("../type").Move3DChildren[], root: boolean, childrenId: string, debug: boolean} ) => string} */
export const Recursive3Dshape = ({ data, root, childrenId, debug }) => {
    return data
        .map(({ children, props }) => {
            return html`<move-3d-item
                name="${childrenId}"
                ${MobJs.staticProps({
                    root,
                    ...props,
                })}
            >
                ${getDebug({ debug, id: props.id })}
                ${Recursive3Dshape({
                    data: children,
                    root: false,
                    childrenId,
                    debug,
                })}
            </move-3d-item>`;
        })
        .join('');
};
