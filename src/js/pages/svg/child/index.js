import { html, staticProps } from '../../../mobjs';
import { loadTextContent } from '../../../utils/utils';

export const child = async () => {
    const { success, data } = await loadTextContent({
        source: './asset/svg/child.svg',
    });

    if (!success) {
        console.warn('fetch data fail');
        return [];
    }

    return html`<div>
        <svg-child ${staticProps({ svg: data })}></svg-child>
    </div>`;
};