import { AnyComponent } from '@commonComponent/any-component/definition';
import { Dragger } from '@commonComponent/dragger/definition';
import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { html, MobJs } from '@mobJs';
import { loadTextContent } from '@utils/utils';

MobJs.useComponent([Dragger, AnyComponent]);
const useLog = false;

/** @type {import('@mobJsType').Page} */
export const DraggerRoute = async () => {
    const { data: svg } = await loadTextContent({
        source: './asset/svg/ms_nord_compact.svg?v=1.3',
    });

    const { data: bg } = await loadTextContent({
        source: './asset/svg/lettering-mob.svg?v=1.3',
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
    const rootContent = html`
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
    const childContent = html`<div class="child-container">
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

    return html`<div class="l-dragger">
        <div class="l-background-shape">${bg}</div>
        <c-dragger
            ${MobJs.staticProps(
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
            )}
        >
            <!-- Root border -->
            <any-component
                slot="root-slot"
                ${MobJs.staticProps({ content: rootContent })}
            ></any-component>

            <!-- Child -->
            <any-component
                slot="child-slot"
                ${MobJs.staticProps({ content: childContent })}
            ></any-component>
        </c-dragger>
    </div>`;
};
