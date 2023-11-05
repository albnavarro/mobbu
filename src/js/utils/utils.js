export function detectSafari() {
    const userAgentString = navigator.userAgent;
    let safariAgent = userAgentString.includes('Safari');
    const chromeAgent = userAgentString.includes('Chrome');
    if (chromeAgent && safariAgent) safariAgent = false;

    return safariAgent;
}

export function detectFirefox() {
    const userAgentString = navigator.userAgent;
    let firefixAgent = userAgentString.includes('Firefox');
    const chromeAgent = userAgentString.includes('Chrome');
    if (chromeAgent && firefixAgent) firefixAgent = false;

    return firefixAgent;
}

export const loadTextContent = async ({ source }) => {
    const response = await fetch(source);
    if (!response.ok) {
        console.warn(`${source} not found`);

        return {
            success: false,
            data: '',
        };
    }
    const data = await response.text();
    return {
        success: true,
        data,
    };
};

export const loadJsonContent = async ({ source }) => {
    const response = await fetch(source);
    if (!response.ok) {
        console.warn(`${source} not found`);

        return {
            success: false,
            data: '',
        };
    }
    const data = await response.json();
    return {
        success: true,
        data,
    };
};
