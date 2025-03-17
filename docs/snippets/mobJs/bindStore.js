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

    /**
     * Get proxi after bindStore !
     */
    const proxiState = getProxi();

    return html`
        <div>
            ${bindObject`route: ${() => proxiState.beforeRouteChange.route}.`}
        </div>
        <div>
            ${invalidate({
                bind: 'beforeRouteChange',
                render: () => {
                    return proxiState.beforeRouteChange.route === 'home'
                        ? html`<h2>home</h2>`
                        : '';
                },
            })}
        </div>
    `;
};
