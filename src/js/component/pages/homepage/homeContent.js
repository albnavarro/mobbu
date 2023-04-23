export const HomeContent = ({ onMount, render }) => {
    onMount(({ element }) => {
        console.log(element);
    });

    return render(/* HTML */ `
        <div class="l-index__content">
            <h1 class="l-index__content__title">Lorem ipsum</h1>
        </div>
    `);
};
