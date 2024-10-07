/**
 * @import { MobComponent } from '../../../../mobjs/type';
 **/

/** @type{MobComponent<import('./type').DebugOverlay>} */
export const DebugOverlayFn = ({
    html,
    delegateEvents,
    addMethod,
    onMount,
    updateState,
    watchSync,
    setState,
    bindProps,
}) => {
    addMethod('toggle', () => {
        updateState('active', (value) => !value);
    });

    onMount(({ element }) => {
        watchSync('active', (value) => {
            element.classList.toggle('active', value);
        });

        return () => {};
    });

    return html`<div class="c-debug-overlay">
        <button
            class="c-debug-overlay__background"
            type="button"
            ${delegateEvents({
                click: () => {
                    setState('active', false);
                },
            })}
        ></button>
        <button
            type="button"
            class="c-debug-overlay__close"
            ${delegateEvents({
                click: () => {
                    setState('active', false);
                },
            })}
        ></button>
        <div class="c-debug-overlay__grid">
            <div class="c-debug-overlay__head">
                <debug-head
                    ${bindProps({
                        bind: ['active'],
                        /** @returns{import('./DebugTree/Debughead/type').DebugHead} */
                        props: ({ active }) => {
                            return {
                                active: active,
                            };
                        },
                    })}
                ></debug-head>
            </div>
            <div class="c-debug-overlay__tree">
                <debug-tree
                    name="debug_tree"
                    ${bindProps({
                        bind: ['active'],
                        props: ({ active }) => {
                            return {
                                active: active,
                            };
                        },
                    })}
                ></debug-tree>
            </div>
            <div class="c-debug-overlay__component">
                <debug-component></debug-component>
            </div>
        </div>
    </div>`;
};
