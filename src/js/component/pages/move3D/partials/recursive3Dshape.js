//@ts-check

import { html, staticProps } from '../../../../mobjs';

const getDebug = ({ debug, id }) => {
    return debug ? html`<span class="c-move3d-item__debug">${id}</span>` : '';
};

/** @type{(arg0: {data: import("../type").Move3DChildren[], root: boolean, childrenId: string, debug: boolean}) => string} */
export const Recursive3Dshape = ({ data, root, childrenId, debug }) => {
    return data
        .map(({ children, props }) => {
            return html`<move-3d-item
                name="${childrenId}"
                ${staticProps({
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
