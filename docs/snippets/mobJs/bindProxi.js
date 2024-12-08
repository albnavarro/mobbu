/**
export type BindProxi = (TemplateStringsArray, ...any) => string;
**/

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({ html, getProxi, bindProxi }) => {
    const proxiState = getProxi();

    return html`
        <div>
            <div>
                ${bindProxi`<h1>title</h1> ${() => proxiState.state} / ${() => proxiState.state2}`}
            </div>

            <!-- Use with slot -->
            <title-component
                >${bindProxi`text ${() => proxiState.state}`}</title-component
            >
        </div>
    `;
};
