//@ts-check

/**
 * @import { MobComponent } from '../../../mobjs/type';
 * @import { StaticProps, DelegateEvents, BindProps } from '../../../mobjs/type';
 * @import { DynamicList } from './type';
 * @import { DynamicListButton } from './button/type';]
 * @import { DynamicListRepeater } from './repeaters/type';]
 **/

import { html, MobJs } from '../../../mobjs';
import {
    FreezeMobPageScroll,
    UnFreezeAndUPdateMobPageScroll,
} from '../../../mobMotion/plugin';
import { startData, state1, state2, state3 } from './data';

const buttons = [
    {
        buttonLabel: 'sample1',
        data: state1,
    },
    {
        buttonLabel: 'salmple2',
        data: state2,
    },
    {
        buttonLabel: 'sample3',
        data: state3,
    },
    {
        buttonLabel: 'Initial',
        data: startData,
    },
];

const repeaters = [
    {
        label: 'repeater with key',
        key: 'key',
        clean: false,
    },
    {
        label: 'repeater without key',
        key: '',
        clean: false,
    },
    {
        label: 'repeater clear',
        key: '',
        clean: true,
    },
];

/**
 * @param {object} param
 * @param {StaticProps} param.staticProps
 * @param {DelegateEvents} param.delegateEvents
 * @param {BindProps<DynamicList,DynamicListButton>} param.bindProps
 * @param {DynamicList['state']} param.proxi
 */
function getButton({ staticProps, delegateEvents, bindProps, proxi }) {
    return buttons
        .map((column, index) => {
            const { data, buttonLabel } = column;

            return html`
                <dynamic-list-button
                    class="c-dynamic-list__top__button"
                    ${staticProps({ label: buttonLabel })}
                    ${delegateEvents({
                        click: async () => {
                            FreezeMobPageScroll();
                            proxi.data = data;
                            proxi.activeSample = index;

                            await MobJs.tick();
                            UnFreezeAndUPdateMobPageScroll();
                        },
                    })}
                    ${bindProps({
                        props: () => {
                            return {
                                active: index === proxi.activeSample,
                            };
                        },
                    })}
                ></dynamic-list-button>
            `;
        })
        .join('');
}

/**
 * @param {object} param
 * @param {StaticProps} param.staticProps
 * @param {BindProps<DynamicList, DynamicListRepeater>} param.bindProps
 * @param {DynamicList['state']} param.proxi
 */
function getRepeaters({ bindProps, staticProps, proxi }) {
    return repeaters
        .map((item, index) => {
            const { key, clean, label } = item;

            return html`
                <dynamic-list-repeater
                    ${staticProps({
                        listId: index,
                        key,
                        clean,
                        label,
                    })}
                    ${bindProps({
                        props: () => {
                            return {
                                data: proxi.data,
                                counter: proxi.counter,
                            };
                        },
                    })}
                ></dynamic-list-repeater>
            `;
        })
        .join('');
}

/** @type {MobComponent<DynamicList>} */
export const DynamicListFn = ({
    updateState,
    staticProps,
    bindProps,
    delegateEvents,
    invalidate,
    bindText,
    getProxi,
}) => {
    const proxi = getProxi();

    return html`
        <div class="c-dynamic-list">
            <div class="c-dynamic-list__header">
                <div class="c-dynamic-list__top">
                    ${getButton({
                        delegateEvents,
                        staticProps,
                        bindProps,
                        proxi,
                    })}
                    <dynamic-list-button
                        class="c-dynamic-list__top__button"
                        ${staticProps({ label: '+ counter ( max: 10 )' })}
                        ${delegateEvents({
                            click: async () => {
                                updateState('counter', (prev) => {
                                    return prev + 1;
                                });
                            },
                        })}
                    ></dynamic-list-button>
                    <dynamic-list-button
                        class="c-dynamic-list__top__button"
                        ${staticProps({ label: '- counter: ( min 0 )' })}
                        ${delegateEvents({
                            click: async () => {
                                updateState('counter', (prev) => {
                                    if (prev > 0) return (prev -= 1);
                                    return prev;
                                });
                            },
                        })}
                    ></dynamic-list-button>
                </div>
            </div>

            <!-- Invalidate -->
            <div class="c-dynamic-list__invalidate">
                <h4 class="c-dynamic-list__invalidate__title">
                    Invalidate component on counter mutation:
                </h4>
                <div class="c-dynamic-list__invalidate__wrap">
                    ${invalidate({
                        bind: 'counter',
                        render: () => {
                            return html`<div class="validate-test-wrapper">
                                <dynamic-list-card-inner
                                    ${bindProps({
                                        props: () => {
                                            return {
                                                key: `${proxi.counter}`,
                                            };
                                        },
                                    })}
                                ></dynamic-list-card-inner>
                            </div>`;
                        },
                    })}
                </div>
            </div>

            <div class="c-dynamic-list__counter">
                <h4>List counter</h4>
                <span>${bindText`${'counter'}`}</span>
            </div>

            <!-- Repeaters -->
            <div class="c-dynamic-list__container">
                <div class="c-dynamic-list__grid">
                    ${getRepeaters({ bindProps, staticProps, proxi })}
                </div>
            </div>
        </div>
    `;
};
