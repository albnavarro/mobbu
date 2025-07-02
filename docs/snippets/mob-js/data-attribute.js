import { html } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ getState }) => {
    const { label } = getState();

    return html`
        <div>
            <my-child-component
                data-label="${label}"
                data-title="my title"
            ></my-child-component>
        </div>
    `;
};
