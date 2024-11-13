//@ts-check

/**
 * @import { MobComponent} from '../../../../mobjs/type';
 **/

/** @type {MobComponent<import('./type').Move3DPage>} */
export const Move3DPagefn = ({ onMount, html, bindProps }) => {
    onMount(() => {});

    return html`<div>
        <move-3d
            ${bindProps({
                bind: ['data'],
                /** @returns{Partial<import('../type').Move3D>} */
                props: ({ data }) => {
                    return {
                        shape: data,
                    };
                },
            })}
        ></move-3d>
        <move-3d
            ${bindProps({
                bind: ['data'],
                /** @returns{Partial<import('../type').Move3D>} */
                props: ({ data }) => {
                    return {
                        shape: data,
                    };
                },
            })}
        ></move-3d>
    </div>`;
};
