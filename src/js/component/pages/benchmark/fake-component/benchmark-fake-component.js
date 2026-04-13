//@ts-check

import { htmlObject } from '@mobJs';

/**
 * @import {MobComponent} from "@mobJsType"
 */

/** @type {MobComponent<import('./type').BenchMarkFakeComponentType>} */
export const BenchMarkFakeComponentFn = ({
    getProxi,
    bindObject,
    delegateEvents,
    onMount,
    id,
    bindEffect,
}) => {
    const proxiState = getProxi();

    onMount(() => {
        // eslint-disable-next-line unicorn/consistent-function-scoping
        return () => {};
    });

    return htmlObject({
        className: 'c-benchmark-fake',
        modules: bindEffect({
            toggleClass: { selected: () => proxiState.isSelected },
        }),
        content: [
            {
                className: 'row',
                content: `<strong>id:</strong><br /> ${id}`,
            },
            {
                className: 'row',
                content: bindObject`<strong>index:</strong><br/> ${() => proxiState.index}`,
            },
            {
                className: 'row',
                content: bindObject`<strong>label:</strong><br/> ${() => proxiState.label}`,
            },
            {
                className: 'row',
                content: bindObject`<strong>counter: </strong><br/> ${() => proxiState.counter}`,
            },
            {
                className: 'row',
                content: {
                    tag: 'button',
                    attributes: { type: 'button' },
                    modules: delegateEvents({
                        click: () => {
                            proxiState.isSelected = !proxiState.isSelected;
                        },
                    }),
                    content: 'select',
                },
            },
        ],
    });
};
