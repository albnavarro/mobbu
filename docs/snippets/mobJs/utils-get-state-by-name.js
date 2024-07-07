// @ts-ignore
import { setStateByName } from './mobjs';

/**
 * @type {import('./mobjs/type').mobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ onMount, html }) => {
    /**
     * @type {import('./mobjs/type').SetStateByName<import('./otherComponent/type').OtherComponent>}
     */
    const setOtherComponentState = setStateByName('otherComponent');

    onMount(() => {
        setOtherComponentState('myState', value);
        setOtherComponentState('myState2', value2);
        return () => {};
    });

    return html` <div></div> `;
};
