import { html } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ getProxi, bindObject, invalidate }) => {
    const proxi = getProxi();

    return html`
        <div>
            ${bindObject`route: ${() => proxi.afterRouteChange.currentRoute}.`}
        </div>
        <div>
            ${invalidate({
                observe: () => proxi.beforeRouteChange,
                render: () => {
                    return proxi.afterRouteChange.currentRoute === 'home'
                        ? html`<h2>home</h2>`
                        : '';
                },
            })}
        </div>
    `;
};
