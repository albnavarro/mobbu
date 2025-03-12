import { html, MobJs } from '../../../src/js/mobjs';

/**
 * @type {import('../../../src/js/mobjs/type').mobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ onMount }) => {
    /**
     * @type {import('./mobjs/type').UpdateStateByName<import('./other/type').OtherComponent>}
     */
    const setOtherComponentState = MobJs.updateStateByName('otherComponent');

    onMount(() => {
        setOtherComponentState('myState', (value) => (value += 1));
        setOtherComponentState('myState2', (value) => (value += 1));
        return () => {};
    });

    return html` <div></div> `;
};
