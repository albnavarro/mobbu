import { html } from '@mobJs';

/**
 * Use variable for lsp reference.
 */
export const childInstanceName = 'child_name';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = () => {
    return html`
        <div>
            <my-child-component name="${child_name}"></my-child-component>
        </div>
    `;
};
