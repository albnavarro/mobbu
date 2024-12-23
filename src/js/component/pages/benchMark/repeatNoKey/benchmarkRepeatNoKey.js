//@ts-check

import {
    hideFooterShape,
    showFooterShape,
} from '../../../common/shapes/shapUtils';
import { benchMarkGarbagePartial } from '../partials/benchMarkGarbagePartial';
import { benchMarkListPartial } from '../partials/benchMarkListPartial';

/**
 * @import { MobComponent, ReturnBindProps } from '../../../../mobjs/type';
 **/

/** @type {MobComponent<import('../type').BenchMark>} */
export const BenchMarkRepeatNoKyFn = ({
    onMount,
    html,
    delegateEvents,
    bindText,
    bindProxi,
    getProxi,
    setRef,
    getRef,
    getState,
    setState,
    updateState,
    bindProps,
    watch,
    repeat,
}) => {
    const proxi = getProxi();

    onMount(() => {
        const { loading } = getRef();
        hideFooterShape();

        watch('isLoading', (value) => {
            loading.classList.toggle('active', value);
        });

        return () => {
            showFooterShape();
        };
    });

    return html`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">Repeat ( without key ):</h3>
            <h2 class="benchmark__head__title">
                Generate components performance
            </h2>
            ${benchMarkGarbagePartial()}
            ${benchMarkListPartial({
                setRef,
                getRef,
                setState,
                updateState,
                delegateEvents,
                getState,
            })}

            <div class="benchmark__head__time">
                ${bindText`components generate in <strong>${'time'}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${repeat({
                bind: 'data',
                useSync: true,
                render: ({ html, sync, current }) => {
                    return html`
                        <benchmark-fake-component
                            ${bindProps({
                                bind: ['counter'],
                                /** @returns{ReturnBindProps<import('../fakeComponent/type').BenchMarkFakeComponent>} */
                                props: ({ counter, data }, index) => {
                                    return {
                                        index,
                                        label: data[index]?.label,
                                        counter,
                                    };
                                },
                            })}
                            ${sync()}
                        >
                            <div>
                                ${bindProxi`proxi: ${() => proxi.data[current.index].label}`}
                            </div>
                        </benchmark-fake-component>
                    `;
                },
            })}
        </div>
    </div>`;
};
