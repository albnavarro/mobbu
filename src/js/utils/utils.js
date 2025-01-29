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

export function setBrowserClass() {
    const userAgent = navigator.userAgent;
    const body = document.body;

    if (/chrome|chromium|crios/i.test(userAgent)) {
        body.classList.add('is-chrome');
        return;
    }

    if (/firefox|fxios/i.test(userAgent)) {
        body.classList.add('is-firefox');
        return;
    }

    if (/safari/i.test(userAgent)) {
        body.classList.add('is-safari');
        return;
    }

    if (/edg/i.test(userAgent)) {
        body.classList.add('is-edge');
        return;
    }
}

/**
 * @param {object} params
 * @param {string} params.source
 * @returns {Promise<{success:boolean, data: any}>}
 */
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

/**
 * @param {object} params
 * @param {string} params.source
 * @returns {Promise<{success:boolean, data: any}>}
 */
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
