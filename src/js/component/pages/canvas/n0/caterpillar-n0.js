//@ts-check

/**
 * @import {MobComponent} from '@mobJsType';
 * @import {CaterpillarN0} from './type';
 * @import {AnimationTitle} from '@commonComponent/animation-title/type';
 */

import { MobCore } from '@mobCore';
import { html } from '@mobJs';
import { canvasBackground } from '@utils/canvas-utils';
import { caterpillarN0Animation } from './animation/animation';

/** @type {MobComponent<CaterpillarN0>} */
export const CaterpillarN0Fn = ({
    onMount,
    setRef,
    getRef,
    getState,
    bindEffect,
    getProxi,
    staticProps,
}) => {
    const proxi = getProxi();
    document.body.style.background = canvasBackground;

    onMount(() => {
        const { canvas } = getRef();

        /**
         * Animation.
         */
        const destroyAnimation = caterpillarN0Animation({
            canvas,
            ...getState(),
        });

        MobCore.useFrame(() => {
            proxi.isMounted = true;
        });

        return () => {
            destroyAnimation();
            document.body.style.background = '';
        };
    });

    return html`
        <div>
            <div class="c-canvas">
                <div
                    class="c-canvas__wrap"
                    ${bindEffect({
                        toggleClass: { active: () => proxi.isMounted },
                    })}
                >
                    <canvas ${setRef('canvas')}></canvas>
                </div>
                <animation-title
                    ${staticProps(
                        /** @type {AnimationTitle['state']} */ ({
                            title: 'Canvas Mouse interaction 01',
                            list: ['Spring', 'AsyncTimeline'],
                        })
                    )}
                ></animation-title>
            </div>
        </div>
    `;
};
