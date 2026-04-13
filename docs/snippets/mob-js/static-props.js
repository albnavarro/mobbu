import { htmlObject } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ getState, staticProps }) => {
    const { label } = getState();

    return htmlObject({
        component: MyChildComponent,
        modules: staticProps({
            childProp1: label,
            childProp2: { prop: 2 },
        }),
    });
};
