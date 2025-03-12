import { html } from '../../../src/js/mobjs';

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({ onMount, getProxi, bindProps }) => {
    const proxiState = getProxi();

    onMount(() => {
        setTimeout(() => {
            proxiState.counter++;
        }, 500);

        return () => {};
    });

    return html`
        <div>
            <my-child-component
                ${bindProps({
                    bind: ['counter'],
                    props: () => {
                        return {
                            counter: proxiState.counter,
                        };
                    },
                })}
            ></my-child-component>
        </div>
    `;
};
