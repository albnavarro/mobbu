/**
 * Normally these utilities are passed directly as component
 * parameters, since the wrapper is not a component
 * we can make use of global utilities.
 */
import { staticProps, html } from '../mobjs';

export const wrapper = () => {
    return html`
        <my-header></my-header>
        <main class="main">
            <!-- Page root -->
            <div id="content"></div>
        </main>
        <my-footer ${staticProps({ myProp: 'content' })}></my-footer>
    `;
};
