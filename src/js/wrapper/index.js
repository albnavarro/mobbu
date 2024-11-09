import { AnimationTitle } from '../component/common/animationTitle/definition';
import { CodeButton } from '../component/common/codeButton/definition';
import { CodeOverlay } from '../component/common/codeOverlay/definition';
import { MLogo1 } from '../component/common/mLogo1/definition';
import { QuickNav } from '../component/common/nextPage/definition';
import { RouteLoader } from '../component/common/routeLoader/definition';
import { ScrollDownLabel } from '../component/common/scrolldownLabel/definition';
import { ScrollToTop } from '../component/common/scrollToTop/definition';
import { Footer } from '../component/layout/footer/definition';
import { Header } from '../component/layout/header/definition';
import { NavigationContainer } from '../component/layout/navigation/definition';
import { html, staticProps, useComponent } from '../mobjs';
import { loadTextContent } from '../utils/utils';
import { LinksMobJs } from '../component/common/linksMobJs/definition';
import { OnlyDesktop } from '../component/common/onlyDesktop/definition';
import { DebugOverlay } from '../component/common/debug/debugOverlay/definition';
import { FooterShapeV1 } from '../component/common/shapes/definition';

useComponent([
    CodeOverlay,
    Header,
    NavigationContainer,
    Footer,
    QuickNav,
    RouteLoader,
    AnimationTitle,
    MLogo1,
    ScrollDownLabel,
    CodeButton,
    ScrollToTop,
    LinksMobJs,
    OnlyDesktop,
    DebugOverlay,
    FooterShapeV1,
]);

export const wrapper = async () => {
    const { data: svg } = await loadTextContent({
        source: './asset/svg/logo.svg',
    });

    const { data: svgLeft } = await loadTextContent({
        source: './asset/svg/footer_shape_left.svg',
    });

    const { data: svgRight } = await loadTextContent({
        source: './asset/svg/footer_shape_right.svg',
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

        <only-desktop></only-desktop>
        <debug-overlay name="debugOverlay"></debug-overlay>
        <code-overlay name="codeOverlay"></code-overlay>
        <mob-header></mob-header>
        <mob-navigation-container
            name="navigation-container"
        ></mob-navigation-container>
        <main class="main">
            <div class="container">
                <div class="inner-wrap">
                    <div id="content"></div>
                </div>
            </div>
        </main>
        <mob-footer> </mob-footer>
        <footer-shape-v1
            name="footer_shape_left"
            ${staticProps({ position: 'left', svg: svgLeft })}
        ></footer-shape-v1>
        <footer-shape-v1
            name="footer_shape_right"
            ${staticProps({ position: 'right', svg: svgRight })}
        ></footer-shape-v1>
        <quick-nav name="quick_nav"></quick-nav>
        <route-loader></route-loader>
        <animation-title name="animation_title"></animation-title>
        <m-logo-1 name="m1_logo" ${staticProps({ svg })}></m-logo-1>
        <scroll-down-label name="scroll_down_label"></scroll-down-label>
        <code-button name="global-code-button"></code-button>
        <scroll-to-top name="scroll-to-top"></scroll-to-top>
        <links-mobjs></links-mobjs>
    `;
};
