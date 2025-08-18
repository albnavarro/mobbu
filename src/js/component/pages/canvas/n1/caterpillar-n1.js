//@ts-check

/**
 * @import {MobComponent} from '@mobJsType';
 * @import {CaterpillarN1} from './type';
 * @import {AnimationTitle} from '@commonComponent/animation-title/type';
 */

import { MobCore } from '@mobCore';
import { html } from '@mobJs';
import { canvasBackground } from '@utils/canvas-utils';
import { caterpillarN1Animation } from './animation/animation';

/** @type {MobComponent<CaterpillarN1>} */
export const CaterpillarN1Fn = ({
    onMount,
    getState,
    getRef,
    setRef,
    bindEffect,
    getProxi,
    staticProps,
}) => {
    const proxi = getProxi();
    document.body.style.background = canvasBackground;

    onMount(() => {
        const { canvas } = getRef();

        const destroyAnimation = caterpillarN1Animation({
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
                            title: 'Canvas Mouse interaction 02/<span>Canvas 2d</span>',
                            list: ['Spring', 'TimeTween', 'AsyncTimeline'],
                        })
                    )}
                ></animation-title>
            </div>
        </div>
    `;
};
