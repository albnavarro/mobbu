import { html } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ getState, watch, getPoxi }) => {
    const { label } = getState();
    const proxi = getPoxi();

    /**
     * With proxi as key
     */
    const unwatch = watch(
        () => proxi.myState,
        (newValue, oldValue) => {
            console.log(newValue, oldValue);
        }
    );

    /**
     * Use string as key
     */
    const unwatch = watch('myState', (newValue, oldValue) => {
        console.log(newValue, oldValue);
    });

    return html`
        <div>
            <h2>${label}</h2>
        </div>
    `;
};
