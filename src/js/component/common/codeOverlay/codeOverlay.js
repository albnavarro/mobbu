export const CodeOverlay = ({ render, onMount }) => {
    onMount(({ element }) => {
        console.log(element);
    });

    return render(/* HTML */ ` <div class="code-overlay">overlay</div> `);
};
