import { html, MobJs } from '../../../src/js/mobjs';

/**
 * @type {import('../../../src/js/mobjs/type').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ onMount }) => {
    /**
     * @type {import('./mobjs/type').SetStateByName<import('./otherComponent/type').OtherComponent>}
     */
    const setOtherComponentState = MobJs.setStateByName('otherComponent');

    onMount(() => {
        setOtherComponentState('myState', value);
        setOtherComponentState('myState2', value2);
        return () => {};
    });

    return html` <div></div> `;
};
