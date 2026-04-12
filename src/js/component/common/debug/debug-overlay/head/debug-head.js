/**
 * @import {MobComponent} from "@mobJsType"
 */

import { fromObject, MobJs } from '@mobJs';
import { DebugSearch } from './search/definition';

const leftContent = () => [
    {
        content: [
            {
                tag: 'strong',
                content: 'Debug activated:',
            },
            `${MobJs.getDebugMode()}`,
        ],
    },
    {
        content: [
            {
                tag: 'strong',
                content: 'Number of component',
            },
            `${MobJs.componentMap.size} ( excluded generated debug )`,
        ],
    },
    {
        content: [
            {
                tag: 'strong',
                content: 'Active repeater:',
            },
            `${MobJs.getNumberOfActiveRepeater()}`,
        ],
    },
    {
        content: [
            {
                tag: 'strong',
                content: 'Active invalidate:',
            },
            `${MobJs.getNumberOfActiveInvalidate()}`,
        ],
    },
];

/** @type {MobComponent<import('./type').DebugHeadType>} */
export const DebugHeadFn = ({ invalidate, getProxi }) => {
    const proxi = getProxi();

    return fromObject({
        className: 'c-debug-head',
        content: [
            {
                className: 'general',
                content: invalidate({
                    observe: () => proxi.active,
                    render: () => {
                        if (!proxi.active) return '';

                        /**
                         * Recompile left component every update
                         *
                         * - Extranl data i sused inside
                         */
                        return fromObject({
                            content: leftContent(),
                        });
                    },
                }),
            },
            {
                className: 'search',
                content: {
                    content: {
                        component: DebugSearch,
                    },
                },
            },
        ],
    });
};
