import { html } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ onMount, getProxi, bindProps }) => {
    const proxiState = getProxi();

    onMount(() => {
        setTimeout(() => {
            proxiState.counter++;
        }, 500);

        return () => {};
    });

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
};
