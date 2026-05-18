/**
 * @import {MobComponent} from "@mobJsType"
 */

import { htmlObject, MobJs, MobJsInternal } from '@mobJs';
import { DebugSearch } from './search/definition';

const leftContent = () => [
    {
        content: [
            {
                tag: 'strong',
                content: 'Debug activated: ',
            },
            `${MobJs.getDebugMode()}`,
        ],
    },
    {
        content: [
            {
                tag: 'strong',
                content: 'Number of component: ',
            },
            `${MobJsInternal.componentMap.size} ( excluded generated debug )`,
        ],
    },
    {
        content: [
            {
                tag: 'strong',
                content: 'Active repeater: ',
            },
            `${MobJsInternal.getNumberOfActiveRepeater()}`,
        ],
    },
    {
        content: [
            {
                tag: 'strong',
                content: 'Active invalidate: ',
            },
            `${MobJsInternal.getNumberOfActiveInvalidate()}`,
        ],
    },
];

/** @type {MobComponent<import('./type').DebugHeadType>} */
export const DebugHeadFn = ({ invalidate, getSelfProxi }) => {
    const proxi = getSelfProxi();

    return htmlObject({
        className: 'c-debug-head',
        content: [
            {
                className: 'general',
                content: invalidate({
                    observe: () => proxi.active,
                    render: () => {
                        if (!proxi.active) return htmlObject({});

                        /**
                         * Recompile left component every update
                         *
                         * - Extranl data i sused inside
                         */
                        return htmlObject({
                            content: leftContent(),
                        });
                    },
                }),
            },
            {
                className: 'search',
                content: invalidate({
                    observe: () => proxi.active,
                    render: () => {
                        if (!proxi.active) return htmlObject({});

                        /**
                         * Recompile left component every update
                         *
                         * - Extranl data i sused inside
                         */
                        return htmlObject({
                            component: DebugSearch,
                        });
                    },
                }),
            },
        ],
    });
};
