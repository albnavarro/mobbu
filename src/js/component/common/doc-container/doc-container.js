import { html } from '@mobJs';

/**
 * @import {MobComponent} from '@mobJsType';
 */

/** @type {MobComponent<import('./type').DocContainer>} */
export const DocContainerFn = ({ getState, staticProps }) => {
    const { rightSidebarData } = getState();

    return html`
        <div class="c-doc-container">
            <div class="c-doc-container__right-sidebar">
                <right-sidebar
                    ${staticProps(
                        /** @type {Partial<import('@commonComponent/right-sidebar/type').RightSidebar['state']>} */
                        ({
                            data: rightSidebarData,
                        })
                    )}
                ></right-sidebar>
            </div>
            <div class="c-doc-container__content">
                <mobjs-slot name="docs"></mobjs-slot>
            </div>
            <div class="c-doc-container__side">
                <mobjs-slot name="section-title-small"></mobjs-slot>
                <mobjs-slot name="section-title"></mobjs-slot>
                <mobjs-slot name="section-links"></mobjs-slot>
            </div>
        </div>
    `;
};
