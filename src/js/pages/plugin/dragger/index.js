import { AnyComponent } from '@commonComponent/any-component/definition';
import { Dragger } from '@commonComponent/dragger/definition';
import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { html, MobJs } from '@mobJs';

MobJs.useComponent([Dragger, AnyComponent]);

/** @type {import('@mobJsType').Page} */
export const DraggerRoute = () => {
    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: '#move3D-shape1',
        nextRoute: '',
        backRoute: '#plugin-overview',
        color: 'black',
    });

    /**
     * Container border
     */
    const rootContent = html`
        <div class="dragger-border">
            <div class="dragger-border__top-left"></div>
            <div class="dragger-border__top-right"></div>
            <div class="dragger-border__bottom-left"></div>
            <div class="dragger-border__bottom-right"></div>
        </div>
    `;

    /**
     * Child
     */
    const childContent = html`<div class="dragger-child"></div>`;

    return html`<div class="l-dragger">
        <c-dragger
            ${MobJs.staticProps(
                /** @type {import('@commonComponent/dragger/type').Dragger['props']} */
                ({
                    rootClass: 'dragger-component',
                    childClass: '',
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
