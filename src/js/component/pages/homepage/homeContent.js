export const HomeContent = ({ onMount, render }) => {
    onMount(({ element }) => {
        console.log(element);
    });

    return render(/* HTML */ `
        <div class="l-index__content">
            <h1>Lorem ipsum</h1>
            <h3>Lorem ipsum dolor sit amet</h3>
        </div>
    `);
};
