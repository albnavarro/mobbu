<my-child-component
    ${bindEvents({
        click: (event, index) => {
            setState('counter', (value) => (value += 1));
            event.preventDefault(); 
        },
        onmouseenter: (event, index) => {
            setState('counter', (value) => (value += 1));
        },
    })}
></my-child-component>
