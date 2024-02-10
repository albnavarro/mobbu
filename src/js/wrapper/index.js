import { html, staticProps } from '../mobjs';
import { loadTextContent } from '../utils/utils';

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
        <m-logo-1 name="m1_logo" ${staticProps({ svg })}></m-logo-1>
        <scroll-down-label name="scroll_down_label" />
    `;
};
