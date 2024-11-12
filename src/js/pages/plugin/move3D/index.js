import { Move3D } from '../../../component/pages/move3D/definition';
import { html, useComponent } from '../../../mobjs';

useComponent([Move3D]);

export const move3DRoute = async () => {
    return html`<div>
        <move-3d></move-3d>
        <move-3d></move-3d>
    </div>`;
};
