import { animationTitleDef } from '../component/common/animationTitle/definition';
import { codeButtonComponentDef } from '../component/common/codeButton/definition';
import { codeOverlayDef } from '../component/common/codeOverlay/definition';
import { mLogo1SvgDef } from '../component/common/mLogo1/definition';
import { quickNavDef } from '../component/common/nextPage/definition';
import { routeLoaderDef } from '../component/common/routeLoader/definition';
import { scrollDownLabelDef } from '../component/common/scrolldownLabel/definition';
import { footerComponentDef } from '../component/layout/footer/definition';
import { headerComponentDef } from '../component/layout/header/definition';
import { navigationComponentDef } from '../component/layout/navigation/definition';
import { html, staticProps, useComponent } from '../mobjs';
import { loadTextContent } from '../utils/utils';

useComponent([
    codeOverlayDef,
    headerComponentDef,
    navigationComponentDef,
    footerComponentDef,
    quickNavDef,
    routeLoaderDef,
    animationTitleDef,
    mLogo1SvgDef,
    scrollDownLabelDef,
    codeButtonComponentDef,
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
