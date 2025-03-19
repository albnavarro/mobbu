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

    // use object
    return html`
        <div>
            <my-child-component
                ${bindProps({
                    props: () => {
                        return {
                            counter: proxiState.counter,
                        };
                    },
                })}
            ></my-child-component>
        </div>
    `;

    // use function
    return html`
        <div>
            <my-child-component
                ${bindProps(() => ({
                    counter: proxiState.counter,
                }))}
            ></my-child-component>
        </div>
    `;
};
