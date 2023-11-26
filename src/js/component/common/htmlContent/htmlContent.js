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
    if (!success) {
        return html`
            <section class="html-content">something went wrong</section>
        `;
    }

    const { useMinHeight } = getState();
    const useMinHeightClass = useMinHeight ? 'is-min-100' : '';

    onMount(async () => {
        setState('contentIsLoaded', true);
    });

    return html`
        <section class="html-content ${useMinHeightClass}">
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
