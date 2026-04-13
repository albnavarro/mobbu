import { htmlObject } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ onMount, removeDOM, setRef, getRef }) => {
    onMount(() => {
        const { myDiv } = getRef();

        setTimeout(() => {
            removeDOM(myDiv);
        }, 1000);
    });

    return htmlObject({
        className: 'main',
        content: {
            modules: setRef('myDiv'),
            content: {
                component: MyChildComponent,
            },
        },
    });
};
