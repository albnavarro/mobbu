import { AnyComponent } from '@commonComponent/any-component/definition';
import { Dragger } from '@commonComponent/dragger/definition';
import { OnlyTablet } from '@commonComponent/only-tablet/definition';
import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { H1Standalone } from '@commonComponent/typography/h1-standalone/definition';
import { htmlObject, MobJs } from '@mobJs';
import { MobMotionCore } from '@mobMotion';
import { loadTextContent } from '@utils/utils';

const useLog = false;

/** @type {import('@mobJsType').Page} */
export const DraggerRoute = async () => {
    const { data: bg } = await loadTextContent({
        source: './asset/svg/lettering-mob.svg?v=1.3',
    });

    if (MobMotionCore.mq('max', 'medium')) {
        return htmlObject({
            content: [
                {
                    className: 'l-background-shape',
                    content: bg,
                },
                {
                    component: OnlyTablet,
                },
            ],
        });
    }

    const { data: svg } = await loadTextContent({
        source: './asset/svg/ms_nord_compact.svg?v=1.3',
    });

    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: '#move3D-shape1',
        nextRoute: '#math-animation-01',
        backRoute: '#plugin-overview',
    });

    /**
     * Container border
     */
    const rootContent = /* HTML */ `
        <div class="borders">
            <h3 class="title">Drag and zoom</h3>
            <div class="top-left"></div>
            <div class="top-right"></div>
            <div class="bottom-left"></div>
            <div class="bottom-right"></div>
        </div>
    `;

    /**
     * Child
     */
    const childContent = /* HTML */ `<div class="child-container">
        <div class="child is-1"></div>
        <div class="child is-2"></div>
        <div class="child is-3"></div>
        <div class="child is-4"></div>
        <div class="child is-5"></div>
        <div class="child is-6"></div>
        <div class="child is-7"></div>
        <div class="child is-8"></div>
        <div class="child is-9"></div>
        <div class="child is-10"></div>
        <div class="child is-svg">${svg}</div>
    </div>`;

    return htmlObject({
        tag: 'main',
        content: {
            className: 'l-dragger',
            content: [
                {
                    component: H1Standalone,
                    modules: MobJs.staticProps(
                        /** @type {import('@commonComponent/typography/h1-standalone/type').H1Standalone['props']} */ ({
                            text: 'Dragger',
                        })
                    ),
                },
                {
                    className: 'l-background-shape',
                    content: bg,
                },
                {
                    component: Dragger,
                    modules: MobJs.staticProps(
                        /** @type {import('@commonComponent/dragger/type').Dragger['props']} */
                        ({
                            rootClass: 'dragger-component',
                            containerClass: '.l-dragger',
                            childrenClass: '.child',
                            align: 'CENTER',
                            maxHightDepth: 140,
                            maxLowDepth: -200,
                            perspective: 300,
                            hideThreshold: 10,
                            afterInit: ({ root }) => {
                                if (useLog) console.log(root);
                            },
                            onDepthChange: ({ depth }) => {
                                if (useLog) console.log(depth);
                            },
                        })
                    ),
                    content: [
                        /**
                         * Root border
                         */
                        {
                            component: AnyComponent,
                            slotPosition: 'root-slot',
                            modules: MobJs.staticProps({
                                content: rootContent,
                            }),
                        },

                        /**
                         * Child
                         */
                        {
                            component: AnyComponent,
                            slotPosition: 'child-slot',
                            modules: MobJs.staticProps({
                                content: childContent,
                            }),
                        },
                    ],
                },
            ],
        },
    });
};
