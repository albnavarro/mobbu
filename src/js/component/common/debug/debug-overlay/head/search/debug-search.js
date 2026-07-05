/**
 * @import {MobComponent} from '@mobJsType'
 */

import { htmlObject, MobJs } from '@mobJs';
import { RESET_FILTER_DEBUG } from '../../constant';
import {
    refreshDebugComponentById,
    updateDebugComponentById,
} from '../../debug-component/utils';

/** @type {MobComponent<import('./type').DebugSearchType>} */
export const DebugSearchFunction = ({ setRef, getRef, delegateEvents }) => {
    /**
     * Search by id
     */
    const searchById = [
        {
            tag: 'label',
            className: 'label',
            attributes: { for: 'component_id' },
            content: {
                tag: 'strong',
                content: 'Search by ID:',
            },
        },
        {
            tag: 'input',
            attributes: {
                type: 'text',
                id: 'component_id',
                name: 'component_id',
            },
            modules: [
                setRef('id_input'),
                delegateEvents({
                    keydown: (/** @type {KeyboardEvent} */ event) => {
                        if (event?.code?.toLowerCase() === 'enter') {
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
            attributes: {
                type: 'button',
                'arial-label': 'search by component id',
                'aria-controls': 'component_id',
            },
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
            tag: 'label',
            className: 'label',
            attributes: { for: 'instance_name' },
            content: {
                tag: 'strong',
                content: 'Search by InstanceName:',
            },
        },
        {
            tag: 'input',
            attributes: {
                type: 'text',
                id: 'instance_name',
                name: 'instance_name',
            },
            modules: [
                setRef('instance_input'),
                delegateEvents({
                    keydown: (/** @type {KeyboardEvent} */ event) => {
                        if (event?.code?.toLowerCase() === 'enter') {
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
            attributes: {
                type: 'button',
                'arial-label': 'search by instance name',
                'aria-controls': 'instance_name',
            },
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
            tag: 'label',
            className: 'label',
            attributes: { for: 'clear_component' },
            content: {
                tag: 'strong',
                content: 'Clear',
            },
        },
        {
            tag: 'button',
            attributes: {
                type: 'button',
                id: 'clear_component',
                name: 'clear_component',
            },
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
            tag: 'label',
            className: 'label',
            attributes: { for: 'refresh_component' },
            content: {
                tag: 'strong',
                content: 'Refresh',
            },
        },
        {
            tag: 'button',
            attributes: {
                type: 'button',
                id: 'refresh_component',
                name: 'refresh_component',
            },
            modules: delegateEvents({
                click: () => {
                    refreshDebugComponentById();
                },
            }),
            content: 'refresh component',
        },
    ];

    return htmlObject({
        className: ['c-debug-search'],
        attributes: { role: 'search', 'aria-label': 'Search component' },
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
