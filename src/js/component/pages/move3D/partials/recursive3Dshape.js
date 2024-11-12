//@ts-check

import { html, staticProps } from '../../../../mobjs';

/** @type{(arg0: {data: import("../type").Move3DChildren[], root: boolean, childrenId: string}) => string} */
export const Recursive3Dshape = ({ data, root, childrenId }) => {
    return data
        .map(({ children, props }) => {
            return html`<move-3d-item
                name="${childrenId}-${props.id}"
                ${staticProps({
                    root,
                    ...props,
                })}
            >
                ${Recursive3Dshape({ data: children, root: false, childrenId })}
            </move-3d-item>`;
        })
        .join('');
};
