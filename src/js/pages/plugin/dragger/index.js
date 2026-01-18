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
        <div class="dragger-border">
            <h3 class="dragger-border__title">Drag and zoom</h3>
            <div class="dragger-border__top-left"></div>
            <div class="dragger-border__top-right"></div>
            <div class="dragger-border__bottom-left"></div>
            <div class="dragger-border__bottom-right"></div>
        </div>
    `;

    /**
     * Child
     */
    const childContent = html`<div class="dragger-child-container">
        <div class="dragger-child dragger-child--1"></div>
        <div class="dragger-child dragger-child--2"></div>
        <div class="dragger-child dragger-child--3"></div>
        <div class="dragger-child dragger-child--4"></div>
        <div class="dragger-child dragger-child--5"></div>
        <div class="dragger-child dragger-child--6"></div>
        <div class="dragger-child dragger-child--7"></div>
        <div class="dragger-child dragger-child--8"></div>
        <div class="dragger-child dragger-child--9"></div>
        <div class="dragger-child dragger-child--10"></div>
        <div class="dragger-child dragger-child--svg">${svg}</div>
    </div>`;

    return html`<div class="l-dragger">
        <div class="background-shape">${bg}</div>
        <c-dragger
            ${MobJs.staticProps(
                /** @type {import('@commonComponent/dragger/type').Dragger['props']} */
                ({
                    rootClass: 'dragger-component',
                    containerClass: '.l-dragger',
                    childrenClass: '.dragger-child',
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
