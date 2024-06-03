import { AnimationTitle } from '../component/common/animationTitle/definition';
import { CodeButton } from '../component/common/codeButton/definition';
import { CodeOverlay } from '../component/common/codeOverlay/definition';
import { CebugButton } from '../component/common/debug/definition';
import { MLogo1 } from '../component/common/mLogo1/definition';
import { QuickNav } from '../component/common/nextPage/definition';
import { RouteLoader } from '../component/common/routeLoader/definition';
import { ScrollDownLabel } from '../component/common/scrolldownLabel/definition';
import { footerComponentDef } from '../component/layout/footer/definition';
import { headerComponentDef } from '../component/layout/header/definition';
import { navigationComponentDef } from '../component/layout/navigation/definition';
import { html, staticProps, useComponent } from '../mobjs';
import { loadTextContent } from '../utils/utils';

useComponent([
    CodeOverlay,
    headerComponentDef,
    navigationComponentDef,
    footerComponentDef,
    QuickNav,
    RouteLoader,
    AnimationTitle,
    MLogo1,
    ScrollDownLabel,
    CodeButton,
    CebugButton,
]);

export const wrapper = async () => {
    const { data: svg } = await loadTextContent({
        source: './asset/svg/logo.svg',
    });

    return html`
        <!-- <div class="test-grid"> -->
        <!--     <div class="test-grid__grid"> -->
        <!--         <span></span><span></span><span></span><span></span><span></span -->
        <!--         ><span></span><span></span><span></span><span></span -->
        <!--         ><span></span><span></span><span></span> -->
        <!--     </div> -->
        <!--     <div class="test-grid__cont"><span>test</span></div> -->
        <!-- </div> -->

        <code-overlay name="codeOverlay"></code-overlay>
        <mob-header></mob-header>
        <mob-navigation-container></mob-navigation-container>
        <main class="main">
            <div class="container">
                <div class="inner-wrap">
                    <div id="content"></div>
                </div>
            </div>
        </main>
        <mob-footer>
            <debug-button slot="debug"></debug-button>
        </mob-footer>
        <quick-nav name="quick_nav"></quick-nav>
        <route-loader></route-loader>
        <animation-title name="animation_title"></animation-title>
        <m-logo-1 name="m1_logo" ${staticProps({ svg })}></m-logo-1>
        <scroll-down-label name="scroll_down_label"></scroll-down-label>
        <code-button name="global-code-button"></code-button>
    `;
};
