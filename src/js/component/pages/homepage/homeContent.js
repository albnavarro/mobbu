export const HomeContent = ({ onMount, render }) => {
    onMount(({ element }) => {
        console.log(element);
    });

    return render(/* HTML */ ` <div class="l-index__content"></div> `);
};
