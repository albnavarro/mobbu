import { core } from '../../../../../mobbu';

export const caterpillarCanvasAnimation = ({ canvas }) => {
    let isActive = true;

    const unsubscribeResize = core.useResize(() => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        draw();
    });

    const draw = () => {
        console.log('draw');
    };

    const loop = () => {
        draw();

        if (!isActive) return;
        core.useNextFrame(() => loop());
    };

    core.useFrame(() => loop());

    return () => {
        unsubscribeResize();
        isActive = false;
    };
};
