import { html, MobJs } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ onMount }) => {
    /**
     * @type {import('@mobJsType').SetStateByName<import('./otherComponent/type').OtherComponent>}
     */
    const setOtherComponentState = MobJs.setStateByName('otherComponent');

    onMount(() => {
        setOtherComponentState('myState', value);
        setOtherComponentState('myState2', value2);
        return () => {};
    });

    return html` <div></div> `;
};
