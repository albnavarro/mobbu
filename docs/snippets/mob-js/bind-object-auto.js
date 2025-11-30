import { html } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ bindObject, repeat, getProxi }) => {
    const proxi = getProxi();

    return html`
        <div>
            ${repeat({
                observe: 'data',
                render: ({ current }) => {
                    return html`<div class="item">
                        <div class="item__inner">
                            ${bindObject`value: ${() => current.value.label}.`}
                        </div>
                        <div>
                            <!-- trigger repeater proxi for automatic cleanup -->
                            ${bindObject`${() => (proxi.isExpanded ? 'close' : 'expand')}, ${() => current.value && ''}`}
                        </div>
                    </div>`;
                },
            })}
        </div>
    `;
};
