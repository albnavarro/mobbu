//@ts-check

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 * @import { CaterpillarN1 } from './type';
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
import { caterpillarN1Animation } from './animation/animation';

/** @type {MobComponent<CaterpillarN1>} */
export const CaterpillarN1Fn = ({
    onMount,
    html,
    getState,
    getRef,
    setRef,
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
            prevRoute: '#caterpillarN0',
            nextRoute: '#caterpillarN2',
            color: 'white',
        });

        /** Title */
        updateAnimationTitle({
            align: 'left',
            title: 'Caterpillar N1',
            color: 'white',
        });

        /**
         * Code button
         */
        const { caterpillarN1 } = getLegendData();
        const { source } = caterpillarN1;
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

        const destroyAnimation = caterpillarN1Animation({
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
                <div
                    class="c-canvas__wrap c-canvas__wrap--wrapped c-canvas__wrap--border"
                    ${setRef('wrap')}
                >
                    <canvas ${setRef('canvas')}></canvas>
                </div>
            </div>
        </div>
    `;
};
