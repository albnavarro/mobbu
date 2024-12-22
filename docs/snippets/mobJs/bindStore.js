import { mainStore } from '../../../src/js/mobjs';

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({
    html,
    getProxi,
    bindProxi,
    bindStore,
    invalidate,
}) => {
    bindStore(mainStore);
    const proxiState = getProxi();

    return html`
        <div>
            ${bindProxi`route ${() => proxiState.beforeRouteChange.route}`}
        </div>
        <div>
            ${invalidate({
                bind: 'beforeRouteChange',
                render: ({ html }) => {
                    return proxiState.beforeRouteChange.route === 'home'
                        ? html`<h2>home</h2>`
                        : '';
                },
            })}
        </div>
    `;
};
