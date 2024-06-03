import { mobCore } from '../../../mobCore';
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
 * Get data from props or fetch.
 */
const getData = async ({ source, data }) => {
    if (data && data.length > 0) return data;

    const { success, data: currentData } = await loadJsonContent({ source });
    if (!success) return [];

    return currentData.data;
};

const getLoader = ({ data, bindProps }) => {
    if (data && data.length > 0) return '';

    return html`
        <mob-loader
            ${bindProps({
                bind: ['contentIsLoaded'],
                props: ({ contentIsLoaded }) => {
                    return { shouldRemove: contentIsLoaded };
                },
            })}
        ></mob-loader>
    `;
};

/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const HtmlContentFn = async ({
    html,
    getState,
    setState,
    staticProps,
    bindProps,
    onMount,
}) => {
    const { source, data } = getState();

    const currentData = await getData({ source, data });

    const { useMinHeight, useMaxWidth } = getState();
    const useMinHeightClass = useMinHeight ? 'is-min-100' : '';
    const useMaxWidthClass = useMaxWidth ? 'is-max-width' : '';

    onMount(async ({ element }) => {
        setState('contentIsLoaded', true);

        mobCore.useFrame(() => {
            element.classList.add('active');
        });
    });

    return html`
        <section class="html-content ${useMinHeightClass} ${useMaxWidthClass}">
            ${getLoader({ data, bindProps })}
            ${getComponents({ data: currentData, staticProps })}
        </section>
    `;
};
