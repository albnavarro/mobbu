//@ts-check

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 * @import { AnimatedPatternN0 } from './type';
 **/

import { getLegendData } from '../../../../data';
import { mobCore } from '../../../../mobCore';
import { motionCore } from '../../../../mobMotion';
import {
    resetAnimationTitle,
    updateAnimationTitle,
} from '../../../common/animationTitle/utils';
import {
    resetCodeButton,
    updateCodeButton,
} from '../../../common/codeButton/utils';
import {
    resetQuickNavState,
    updateQuickNavState,
} from '../../../common/quickNav/utils';
import { animatedPatternN0Animation } from './animation/animation';

/** @type {MobComponent<AnimatedPatternN0>} */
export const AnimatedPatternN0Fn = ({
    onMount,
    html,
    getState,
    setRef,
    getRef,
}) => {
    const { prevRoute, nextRoute, title } = getState();
    document.body.style.background = '#000000';

    onMount(() => {
        if (motionCore.mq('max', 'desktop')) {
            document.body.style.background = '';
            return;
        }

        const { wrap, canvas } = getRef();

        /** Quicknav */
        updateQuickNavState({
            active: true,
            prevRoute,
            nextRoute,
            color: 'white',
        });

        /** Title */
        updateAnimationTitle({
            align: 'left',
            title,
            color: 'white',
        });

        /**
         * Code button
         */
        const { animatedPatternN0 } = getLegendData();
        const { source } = animatedPatternN0;
        updateCodeButton({
            drawers: [
                {
                    label: 'description',
                    source: source.description,
                },
                {
                    label: 'definition',
                    source: source.definition,
                },
                {
                    label: 'component',
                    source: source.component,
                },
                {
                    label: 'animation',
                    source: source.animation,
                },
            ],
            color: 'white',
        });

        const destroyAnimation = animatedPatternN0Animation({
            canvas,
            ...getState(),
        });

        mobCore.useFrame(() => {
            wrap.classList.add('active');
        });

        return () => {
            destroyAnimation();
            resetQuickNavState();
            resetAnimationTitle();
            resetCodeButton();
            document.body.style.background = '';
        };
    });

    return html`
        <div>
            <div class="c-canvas">
                <div class="c-canvas__wrap" ${setRef('wrap')}>
                    <canvas ${setRef('canvas')}></canvas>
                </div>
            </div>
        </div>
    `;
};
