/**
 * @import {MobComponent} from "@mobJsType"
 */

import { fromObject, MobJs } from '@mobJs';
import { RESET_FILTER_DEBUG } from '../../constant';
import {
    refreshDebugComponentById,
    updateDebugComponentById,
} from '../../debug-component/utils';

/** @type {MobComponent<import('./type').DebugSearchType>} */
export const DebugSearchFn = ({ setRef, getRef, delegateEvents }) => {
    /**
     * Search by id
     */
    const searchById = [
        {
            className: 'label',
            content: {
                tag: 'strong',
                content: 'Search by ID:',
            },
        },
        {
            tag: 'input',
            attributes: { type: 'text', name: 'id' },
            modules: [
                setRef('id_input'),
                delegateEvents({
                    keydown: (/** @type {KeyboardEvent} */ event) => {
                        if (event.code.toLowerCase() === 'enter') {
                            event.preventDefault();

                            const id = /** @type {HTMLInputElement} */ (
                                event.currentTarget
                            ).value;

                            updateDebugComponentById(id ?? '');
                        }
                    },
                }),
            ],
        },
        {
            tag: 'button',
            attributes: { type: 'button' },
            modules: delegateEvents({
                click: () => {
                    const { id_input } = getRef();
                    const id = /** @type {HTMLInputElement} */ (id_input).value;

                    updateDebugComponentById(id ?? '');
                },
            }),
            content: 'find',
        },
    ];

    /**
     * Search by instance
     */
    const searchByIstance = [
        {
            className: 'label',
            content: {
                tag: 'strong',
                content: 'Search by InstanceName:',
            },
        },
        {
            tag: 'input',
            attributes: { type: 'text', name: 'instance' },
            modules: [
                setRef('instance_input'),
                delegateEvents({
                    keydown: (/** @type {KeyboardEvent} */ event) => {
                        if (event.code.toLowerCase() === 'enter') {
                            event.preventDefault();

                            const instanceName =
                                /** @type {HTMLInputElement} */ (
                                    event.currentTarget
                                ).value;

                            const id = MobJs.getIdByInstanceName(instanceName);
                            updateDebugComponentById(id ?? '');
                        }
                    },
                }),
            ],
        },
        {
            tag: 'button',
            attributes: { type: 'button' },
            modules: delegateEvents({
                click: () => {
                    const { instance_input } = getRef();
                    const instanceName = instance_input.value;
                    const id = MobJs.getIdByInstanceName(instanceName);
                    updateDebugComponentById(id ?? '');
                },
            }),
            content: 'find',
        },
    ];

    /**
     * Cleanactive component
     */
    const clear = [
        {
            className: 'label',
            content: {
                tag: 'strong',
                content: 'Clear',
            },
        },
        {
            tag: 'button',
            attributes: { type: 'button' },
            modules: delegateEvents({
                click: () => {
                    const { instance_input, id_input } = getRef();
                    instance_input.value = '';
                    id_input.value = '';
                    updateDebugComponentById(RESET_FILTER_DEBUG);
                },
            }),
            content: 'clear',
        },
    ];

    /**
     * Refresh active component
     */
    const refresh = [
        {
            className: 'label',
            content: {
                tag: 'strong',
                content: 'Refresh',
            },
        },
        {
            tag: 'button',
            attributes: { type: 'button' },
            modules: delegateEvents({
                click: () => {
                    refreshDebugComponentById();
                },
            }),
            content: 'refresh component',
        },
    ];

    return fromObject({
        className: 'c-debug-search',
        content: [
            {
                content: searchById,
            },
            {
                content: searchByIstance,
            },
            {
                content: clear,
            },
            {
                content: refresh,
            },
        ],
    });
};
