export const CaterpillarCanvas = ({ onMount, render }) => {
    onMount(({ element }) => {
        console.log(element);
    });

    return render(/* HTML */ `
        <div class="caterpillar-canvas">
            <canvas></canvas>
        </div>
    `);
};
