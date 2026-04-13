import { html, htmlObject } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({
    staticProps,
    onMount,
    setRef,
    getRef,
    getRefs,
}) => {
    onMount(() => {
        const { list, myComponent } = getRef();
        const { listItem } = getRefs();

        console.log(list); // <ul>
        console.log(listItem); // [<li>,<li>,<li>,<li>,<li>,<li>,<li>,<li>,<li>,]
        console.log(myComponent); // first node of <my-component>
    });

    return htmlObject({
        className: 'main',
        content: [
            {
                tag: 'ul',
                modules: setRef('list'),
                content: [
                    {
                        tag: 'li',
                        modules: setRef('listItem'),
                        content: '1',
                    },
                    {
                        tag: 'li',
                        modules: setRef('listItem'),
                        content: '2',
                    },
                    {
                        tag: 'li',
                        modules: setRef('listItem'),
                        content: '3',
                    },
                    {
                        tag: 'li',
                        modules: setRef('listItem'),
                        content: '4',
                    },
                    {
                        tag: 'li',
                        modules: setRef('listItem'),
                        content: '5',
                    },
                    {
                        tag: 'li',
                        modules: setRef('listItem'),
                        content: '6',
                    },
                ],
            },
            {
                component: ChildComponent,
                modules: [
                    setRef('myComponent'),
                    staticProps({ prop: 'my-prop' }),
                ],
                content: 'my content',
            },
        ],
    });
};
