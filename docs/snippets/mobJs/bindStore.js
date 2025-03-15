import { html, MobJs } from '../../../src/js/mobjs';

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({
    getProxi,
    bindObject,
    bindStore,
    invalidate,
}) => {
    bindStore(MobJs.mainStore);
    // bindStore([mainStore, otherStore]);
    const proxiState = getProxi();

    return html`
        <div>
            ${bindObject`route: ${{
                value: () => proxiState.beforeRouteChange.route,
            }}.`}
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
