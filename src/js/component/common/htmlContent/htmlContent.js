/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const HtmlContent = ({ html, staticProps }) => {
    return html`
        <section class="html-content" ref="section">
            <mob-title> h1 </mob-title>
            <mob-title ${staticProps({ tag: 'h2' })}> h2 </mob-title>
            <mob-title ${staticProps({ tag: 'h3' })}> h3 </mob-title>
            <mob-paragraph ${staticProps({ style: 'big' })}>big</mob-paragraph>
            <mob-paragraph ${staticProps({ style: 'medium' })}
                >medium</mob-paragraph
            >
            <mob-paragraph ${staticProps({ style: 'small' })}
                >small</mob-paragraph
            >
            <mob-snippet>my code</mob-snippet>
        </section>
    `;
};
