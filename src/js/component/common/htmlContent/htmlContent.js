import { html } from '../../../mobjs';
import { loadJsonContent } from '../../../utils/utils';

const getComponents = ({ data, staticProps }) => {
    return data
        .map((item) => {
            const { component, props, content } = item;

            return html`
                <${component} ${staticProps(props)}>
                    ${content ?? ''}
                </${component}>
            `;
        })
        .join('');
};

/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const HtmlContent = async ({
    html,
    getState,
    setState,
    staticProps,
    bindProps,
    onMount,
}) => {
    const { source } = getState();

    const { success, data } = await loadJsonContent({ source });
    if (!success) return '';

    onMount(async () => {
        setState('contentIsLoaded', true);
    });

    return html`
        <section class="html-content">
            <mob-loader
                ${bindProps({
                    bind: ['contentIsLoaded'],
                    props: ({ contentIsLoaded }) => {
                        return { shouldRemove: contentIsLoaded };
                    },
                })}
            ></mob-loader>
            ${getComponents({ data: data.data, staticProps })}
        </section>
    `;
};
