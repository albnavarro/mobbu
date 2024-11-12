import { html, staticProps } from '../../../../mobjs';

/** @type{(arg0: {data: import("../type").Move3DChildren[], root: boolean}) => string} */
export const Recursive3Dshape = ({ data, root }) => {
    return data
        .map(({ children, props }) => {
            return html`<move-3d-item
                ${staticProps({
                    root,
                    ...props,
                })}
            >
                ${Recursive3Dshape({ data: children, root: false })}
            </move-3d-item>`;
        })
        .join('');
};
