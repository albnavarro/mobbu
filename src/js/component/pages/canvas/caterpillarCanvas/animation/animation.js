import { core } from '../../../../../mobbu';

export const caterpillarCanvasAnimation = ({ canvas }) => {
    console.log(canvas);

    const unsubscribeResize = core.useResize(() => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        draw();
    });

    const draw = () => {
        console.log('draw');
    };

    return () => {
        unsubscribeResize();
    };
};
