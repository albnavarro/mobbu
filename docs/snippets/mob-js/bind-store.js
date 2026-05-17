import { html, htmlObject } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ getBoundedProxi, bindObject, invalidate }) => {
    const proxi = getBoundedProxi();

    return htmlObject({
        content: [
            {
                content: bindObject`route: ${() => proxi.afterRouteChange.currentRoute}.`,
            },
            {
                content: invalidate({
                    observe: () => proxi.beforeRouteChange,
                    render: () => {
                        return proxi.afterRouteChange.currentRoute === 'home'
                            ? html`<h2>home</h2>`
                            : '';
                    },
                }),
            },
        ],
    });
};
