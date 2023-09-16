import { html, instanceName, useSlot } from '../mobjs';

export const wrapper = () => {
    return html`
        <code-overlay ${instanceName('codeOverlay')}></code-overlay>
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
            <debug-button ${useSlot('debug')}></debug-button>
        </mob-footer>
        <page-transition ${instanceName('page-transition')}></page-transition>
    `;
};
