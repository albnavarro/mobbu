import { html, MobJs } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ getProxi, bindObject, invalidate }) => {
    const proxi = getProxi();

    return html`
        <div>${bindObject`route: ${() => proxi.beforeRouteChange.route}.`}</div>
        <div>
            ${invalidate({
                observe: () => proxi.beforeRouteChange,
                render: () => {
                    return proxi.beforeRouteChange.route === 'home'
                        ? html`<h2>home</h2>`
                        : '';
                },
            })}
        </div>
    `;
};
