export const HomeContent = ({ onMount, render }) => {
    onMount(({ element }) => {
        console.log(element);
    });

    return render(/* HTML */ `
        <div class="l-index__content">
            <h1>Title</h1>
            <h2>Subtitle</h2>
            <h3>third title</h3>
            <p>Lorem ipsum dolor sit amet</p>
        </div>
    `);
};
