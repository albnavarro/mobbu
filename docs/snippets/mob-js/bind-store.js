import { html, MobJs } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
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
                observe: () => proxi.beforeRouteChange,
                render: () => {
                    return proxiState.beforeRouteChange.route === 'home'
                        ? html`<h2>home</h2>`
                        : '';
                },
            })}
        </div>
    `;
};
