import { loadJsonContent, loadTextContent } from '@utils/utils.js';

/** @type {import('./type.d.ts').CommonData} */
let commonData;

/** @type {Record<string, string>} */
let icons = {};

const iconsPath = './asset/svg/icons/';

/** @type {{ name: string; source: string }[]} */
const iconsToLoad = [
    { name: 'gitHubIcon', source: 'icon-github.svg' },
    { name: 'scrollIcon', source: 'scroll_arrow.svg' },
    { name: 'searchIcons', source: 'search.svg' },
    { name: 'starOutline', source: 'star-outline.svg' },
];

export const getCommonData = () => commonData;
export const getIcons = () => icons;

/**
 * Load common data.
 */
export const loadData = async () => {
    const { success, data } = await loadJsonContent({
        source: './data/common.json',
    });

    if (!success) {
        console.warn('data fail to load');
    }

    commonData = data;
};

/**
 * Load icons.
 *
 * @returns {Promise<void>}
 */
export const loadIcons = async () => {
    /**
     * Get an array of promises that return an object with status and data
     */
    const promisesArray = iconsToLoad.map(({ name, source }) =>
        loadTextContent({ source: `${iconsPath}${source}` }).then((result) => ({
            name,
            result,
        }))
    );

    /**
     * Fetch all icons.
     */
    const results = await Promise.all(promisesArray);

    /**
     * Transform array into object with key as name and icons as value.
     */
    icons = results
        .map(({ name, result }) =>
            result.success
                ? { name, data: result.data }
                : { name, data: 'icon load error' }
        )
        .reduce((previous, { name, data }) => {
            return { ...previous, [name]: data };
        }, {});
};
