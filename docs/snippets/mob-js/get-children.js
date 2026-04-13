import { html, htmlObject, MobJs } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ onMount, getChildren }) => {
    onMount(() => {
        const childrensId = getChildren('child-component');

        childrensId.forEach((childID) => {
            MobJs.setStateById(childID, 'state', 'value');
        });
    });

    return htmlObject({
        className: 'section',
        content: [
            {
                component: MyChildComponent,
            },
            {
                component: MyChildComponent,
            },
            {
                component: MyChildComponent,
            },
            {
                component: MyChildComponent,
            },
            {
                component: MyChildComponent,
            },
        ],
    });
};
