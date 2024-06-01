import {
    Mv1Def,
    animatedPatternN0Def,
    animatedPatternN1Def,
    animationTitleDef,
    caterpillarN0Def,
    caterpillarN1Def,
    caterpillarN2Def,
    codeButtonComponentDef,
    codeOverlayButtonDef,
    codeOverlayDef,
    degubButtonComponentDef,
    docsContainerComponentDef,
    docsTitleComponentDef,
    docsTitleSmallComponentDef,
    dynamicCounterDef,
    dynamicListButtonDef,
    dynamicListCardDef,
    dynamicListDef,
    dynamicListEmptyDef,
    dynamicListLabelDef,
    dynamicListRepeaterDef,
    dynamicListSlotDef,
    footerComponentDef,
    footerNavButtonDef,
    footerNavDef,
    footerShaperV1Def,
    headerComponentDef,
    headerNavComponentDef,
    headerToggleComponentDef,
    homePageComponentDef,
    horizontalScrollerButtonDef,
    horizontalScrollerDef,
    horizontalScrollerSectionDef,
    htmlContentDef,
    listContentDef,
    loaderDef,
    mLogo1SvgDef,
    navigationButtonDef,
    navigationComponentDef,
    navigationDef,
    navigationLabelDef,
    navigationSubmenuDef,
    onlyDesktopDef,
    paragraphContentDef,
    paramsMobJsButtonDef,
    paramsMobJsDef,
    quickNavDef,
    routeLoaderDef,
    scrollDownLabelDef,
    scrollToButtonDef,
    scrollToDef,
    scrollerN0Def,
    scrollerN1Def,
    snippetContentDef,
    spacerContentDef,
    svgChild,
    titleContentDef,
} from '../component/componentList';
import { html, staticProps, useComponent } from '../mobjs';
import { loadTextContent } from '../utils/utils';

useComponent([
    codeOverlayDef,
    headerComponentDef,
    headerNavComponentDef,
    headerToggleComponentDef,
    navigationDef,
    footerComponentDef,
    footerNavDef,
    footerNavButtonDef,
    navigationComponentDef,
    navigationDef,
    navigationSubmenuDef,
    navigationButtonDef,
    navigationLabelDef,
    animationTitleDef,
    codeButtonComponentDef,
    codeOverlayDef,
    codeOverlayButtonDef,
    degubButtonComponentDef,
    docsContainerComponentDef,
    docsTitleComponentDef,
    docsTitleSmallComponentDef,
    htmlContentDef,
    paramsMobJsDef,
    paramsMobJsButtonDef,
    loaderDef,
    mLogo1SvgDef,
    quickNavDef,
    onlyDesktopDef,
    routeLoaderDef,
    scrollToButtonDef,
    scrollToDef,
    scrollDownLabelDef,
    footerShaperV1Def,
    snippetContentDef,
    spacerContentDef,
    listContentDef,
    paragraphContentDef,
    titleContentDef,
    animatedPatternN0Def,
    animatedPatternN1Def,
    caterpillarN0Def,
    caterpillarN1Def,
    caterpillarN2Def,
    dynamicListDef,
    dynamicListLabelDef,
    dynamicListSlotDef,
    dynamicListRepeaterDef,
    dynamicListEmptyDef,
    dynamicCounterDef,
    dynamicListCardDef,
    dynamicListButtonDef,
    homePageComponentDef,
    horizontalScrollerDef,
    horizontalScrollerButtonDef,
    horizontalScrollerSectionDef,
    scrollerN0Def,
    scrollerN1Def,
    svgChild,
    Mv1Def,
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
