import { htmlObject } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ onMount, getProxi, bindProps }) => {
    const proxiState = getProxi();

    onMount(() => {
        setTimeout(() => {
            proxiState.counter++;
        }, 500);

        return () => {};
    });

    // use function
    return htmlObject({
        component: MyChildComponent,
        modules: bindProps({
            observe: ['counter'],
            props: ({ counter }, value, index) => {
                return {
                    childProp3: value.myProp,
                    childProp4: counter,
                };
            },
        }),
    });
};
