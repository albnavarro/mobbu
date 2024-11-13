import { Move3DPage } from '../../../component/pages/move3D/page/definition';
import { html, staticProps, useComponent } from '../../../mobjs';
import { move3DShape1 } from '../../../component/pages/move3D/shape/shape1';

useComponent([Move3DPage]);

export const move3DRoute = async () => {
    return html`<move-3d-page
        ${staticProps({ data: move3DShape1 })}
    ></move-3d-page> `;
};
