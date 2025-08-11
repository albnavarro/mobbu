import { html } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ getState, staticProps }) => {
    const { label } = getState();

    return html`
        <div>
            <my-child-component
                ${staticProps({
                    childProp1: label,
                    childProp2: { prop: 2 },
                })}
            ></my-child-component>
        </div>
    `;
};
