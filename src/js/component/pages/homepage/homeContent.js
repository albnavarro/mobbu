export const HomeContent = ({ onMount, render }) => {
    onMount(({ element }) => {
        console.log(element);
    });

    return render(/* HTML */ `
        <div class="l-index__content">
            <h1 class="l-index__content__title">Lorem ipsum</h1>
            <div class="l-index__content__row">
                <h3 class="is-green">Lorem ipsum dolor sit amet</h3>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it
                </p>
            </div>
            <div class="l-index__content__row">
                <h3 class="is-green">Lorem ipsum dolor sit amet</h3>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it
                </p>
            </div>
        </div>
    `);
};
