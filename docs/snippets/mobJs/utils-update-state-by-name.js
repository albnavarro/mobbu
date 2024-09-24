// @ts-ignore
import { updateStateByName } from './mobjs';

/**
 * @type {import('./mobjs/type').mobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ onMount, html }) => {
    /**
     * @type {import('./mobjs/type').UpdateStateByName<import('./otherComponent/type').OtherComponent>}
     */
    const setOtherComponentState = updateStateByName('otherComponent');

    onMount(() => {
        setOtherComponentState('myState', (value) => (value += 1));
        setOtherComponentState('myState2', (value) => (value += 1));
        return () => {};
    });

    return html` <div></div> `;
};