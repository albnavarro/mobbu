import { roundRectCustom } from './utils.js';

let ctx = null;

onmessage = (e) => {
    const {
        steamDataReorded,
        time,
        radius,
        spacerY,
        amountOfPath,
        intialRotation,
        perpetualRatio,
        canvasWidth,
        canvasHeight,
        canvas,
    } = e.data;

    if (canvas) {
        ctx = canvas.getContext('2d');
        return;
    }

    if (canvasWidth && canvas) {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
    }

    /**
     * Get center of canvas.
     */
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    /**
     * Clear rpevious render.
     */
    ctx.fillStyle = '#f6f6f6';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    steamDataReorded.forEach(
        ({
            width,
            height,
            fill,
            opacity,
            stroke,
            rotate,
            relativeIndex,
            index: i,
        }) => {
            /**
             * Center canvas on bottom right of the screen.
             */
            ctx.save();

            /**
             * Pertual movment based on timeframe.
             */
            const offset =
                Math.sin(time / 1000) * perpetualRatio * relativeIndex;

            /**
             * Invert perpetual movment by the two half of array and set multiplier.
             */
            const offsetInverse =
                i < amountOfPath / 2
                    ? offset + (15 * relativeIndex) / 2
                    : -offset - (15 * relativeIndex) / 2;

            /**
             * Space between tho half
             */
            const centerDirection = i < amountOfPath / 2 ? -1 : 1;

            /**
             * Center canvas in the screen
             */
            ctx.translate(centerX + width / 2, centerY + height / 2);
            ctx.rotate((Math.PI / 180) * (rotate - intialRotation));
            ctx.translate(
                parseInt(-centerX - width / 2),
                parseInt(-centerY - height / 2)
            );

            /**
             * Set oapcity
             */
            ctx.globalAlpha = opacity;

            /**
             * Shape
             */
            roundRectCustom(
                ctx,
                centerX - (width * centerDirection) / 2,
                centerY - height / 2 + offsetInverse + spacerY,
                width,
                height,
                radius
            );

            /**
             * Color.
             */
            ctx.strokeStyle = stroke;
            ctx.stroke();
            ctx.fillStyle = fill;
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.restore();
        }
    );
};
