//@ts-check

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 * @import { AnimatedPatternN1 } from './type';
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
import { animatedPatternN1Animation } from './animation/animation';

/** @type {MobComponent<AnimatedPatternN1>} */
export const AnimatedPatternN1Fn = ({
    onMount,
    html,
    getState,
    setRef,
    getRef,
}) => {
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
            prevRoute: '#animatedPatternN0?version=3&activeId=3',
            nextRoute: '#scrollerN0?version=0&activeId=0',
            color: 'white',
        });

        /** Title */
        updateAnimationTitle({
            align: 'left',
            title: 'Animated pattern N1',
            color: 'white',
        });

        /**
         * Code button
         */
        const { animatedPatternN1 } = getLegendData();
        const { source } = animatedPatternN1;
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

        const destroyAnimation = animatedPatternN1Animation({
            canvas,
            ...getState(),
        });

        mobCore.useFrame(() => {
            wrap.classList.add('active');
        });

        return () => {
            resetQuickNavState();
            resetAnimationTitle();
            resetCodeButton();
            document.body.style.background = '';
            destroyAnimation();
        };
    });

    return html`
        <div>
            <div class="c-canvas">
                <div
                    class="c-canvas__wrap c-canvas__wrap--wrapped"
                    ${setRef('wrap')}
                >
                    <canvas ${setRef('canvas')}></canvas>
                </div>
            </div>
        </div>
    `;
};
