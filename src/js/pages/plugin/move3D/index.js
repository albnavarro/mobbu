import { Move3DPage } from '../../../component/pages/move3D/page/definition';
import { html, staticProps, useComponent } from '../../../mobjs';

useComponent([Move3DPage]);

export const move3DRoute = async ({ props }) => {
    const { data, prevRoute, nextRoute } = props;

    return html`<move-3d-page
        ${staticProps({ data, prevRoute, nextRoute })}
    ></move-3d-page> `;
};
