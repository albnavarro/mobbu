import { createProps } from '../../../baseComponent/mainStore/actions/props';

export const Legend = ({ onMount, render, props }) => {
    onMount(({ element }) => {
        console.log(element);
    });

    const { title, description, type, source } = props;
    return render(/* HTML */ `
        <div class="c-legend">
            <h2 class="c-legend__title">${title}</h2>
                <h4 class="c-legend__type">
                    Type: <span class="fw-400">${type}</span>
                </h4>
                <p class="c-legend__description">${description}</p>
                <CodeButton
                    data-props="${createProps({
                        js: '/codeExample/layout/navigation/script.js',
                        style: 'green',
                    })}"
                >
                </CodeButton>
            </div>
        </div>
    `);
};
