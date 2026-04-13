import { htmlObject } from '@mobJs';

export const MyComponent = ({ setRef, repeat, bindProps, bindEffect }) => {
    /**
     * My component structure
     */

    /**
     * Isolated render block
     */
    const renderList = {
        tag: 'ul',
        modules: setRef('scroller'),
        content: repeat({
            observe: () => proxi.list,
            render: ({ current }) => {
                return htmlObject({
                    component: SearchOverlayListItem,
                    modules: bindProps(() => ({
                        active: proxi.activeRoute.route === current.value.uri,
                        uri: current.value.uri,
                        breadCrumbs: current.value.breadCrumbs,
                        count: current.value.count,
                        title: current.value.title,
                    })),
                });
            },
        }),
    };

    /**
     * Main render
     */
    return htmlObject({
        className: 'c-search-list',
        modules: setRef('screen'),
        content: [
            {
                tag: 'span',
                className: 'loader',
                modules: bindEffect({
                    toggleClass: {
                        active: () => proxi.loading,
                    },
                }),
                content: 'fetch data',
            },
            {
                tag: 'input',
                className: 'scrollbar',
                attributes: {
                    type: 'range',
                    id: 'test',
                    name: 'test',
                    min: 0,
                    max: 100,
                    value: 0,
                    step: 0.5,
                },
                modules: setRef('scrollbar'),
            },
            renderList,
        ],
    });
};
