import { html } from '../../../mobjs';
import { loadJsonContent } from '../../../utils/utils';

const getComponents = ({ data, staticProps, delegateEvents }) => {
    return data
        .map((item) => {
            const { component, props, content } = item;

            return html`
                <${component} ${staticProps(props)}
                ${delegateEvents({
                    click: () => {
                        console.log('pippo');
                    },
                })}>
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
    staticProps,
    delegateEvents,
}) => {
    const { source } = getState();

    const { success, data } = await loadJsonContent({ source });
    if (!success) return '';

    return html`
        <section class="html-content">
            ${getComponents({ data: data.data, staticProps, delegateEvents })}
        </section>
    `;
};
