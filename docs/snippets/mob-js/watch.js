import { html } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ onMount, getState, watch, setRef, getRef }) => {
    const { label } = getState();

    onMount(() => {
        const { labelRef } = getRef();

        /**
         * With proxi as key
         */
        const unwatch = watch(
            () => proxi.myState,
            (value) => {
                labelRef.classList.toggle('myClass', value);
            }
        );

        /**
         * Use string as key
         */
        const unwatch = watch('myState', (value) => {
            labelRef.classList.toggle('myClass', value);
        });

        return () => {};
    });

    return html`
        <div>
            <h2 ${setRef('labelRef')}>${label}</h2>
        </div>
    `;
};
