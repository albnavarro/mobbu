import { MobJs } from '@mobJs';
import { routes } from '@pages/index';

/**
 * @param {object} params
 * @param {string} params.source
 * @param {string} params.uri
 * @param {string} params.title
 * @param {string} params.section
 * @param {{ title: string; url: string }[]} params.breadCrumbs
 * @returns {Promise<{
 *     success: boolean;
 *     data: import('./type').FetchData[];
 *     uri: string;
 *     title: string;
 *     section: string;
 *     breadCrumbs: { title: string; url: string }[];
 * }>}
 */
export const executeFetch = async ({
    source,
    uri,
    title,
    section,
    breadCrumbs,
}) => {
    const response = await fetch(source);
    if (!response.ok) {
        console.warn(`${source} not found`);
        return {
            success: false,
            data: [{ component: '', props: {} }],
            uri,
            title,
            section,
            breadCrumbs: [],
        };
    }

    const data = await response.json();

    return {
        success: true,
        data: data?.data ?? [{ component: '', props: {} }],
        uri,
        title,
        section,
        breadCrumbs,
    };
};

const validComponent = new Set(['mob-title', 'mob-paragraph', 'mob-list']);
const componentWithContent = new Set(['mob-title', 'mob-paragraph']);
const listComponent = new Set(['mob-list']);

/**
 * @param {object} params
 * @param {string} params.currentSearch
 */
export const fetchSearchResult = async ({ currentSearch = '' }) => {
    const pageList = routes
        .filter(({ pageName, props }) => {
            return props?.source && pageName;
        })
        .map(({ hash, pageName, props }) => {
            return {
                fn: executeFetch({
                    source: props.source ?? '',
                    uri: hash ?? 'uri not forud',
                    title: pageName ?? 'title not found',
                    section: props.section ?? 'title not found',
                    breadCrumbs: props.breadCrumbs ?? [],
                }),
            };
        });

    const result = await Promise.all(pageList.map(({ fn }) => fn));

    /**
     * @type import('./type').FetchData[]}
     */
    const initialState = [];

    const resultParsed = result
        .filter(({ success }) => success)
        .map(({ data, uri, title, section }) => {
            /**
             * Extract HTMl-content
             */
            const dataParsed = data.reduce((previous, current) => {
                if (!current) return previous;

                const { component } = current;
                if (!component) return previous;

                const isHTMLContent = current.component === 'html-content';

                if (!isHTMLContent) {
                    return [...previous, current];
                }

                if (!current?.props?.data) return previous;

                /**
                 * HTMLContent
                 */
                return [...previous, current.props.data];
            }, initialState);

            /**
             * Filter valid component
             */
            const filterDataByComponent = dataParsed
                .flat()
                .filter(({ component }) => {
                    return validComponent.has(component);
                });

            /**
             * Extract data content from component
             */
            const filterDataByContent = filterDataByComponent.flatMap(
                (item) => {
                    /*
                     * Title/paragraph
                     */
                    if (componentWithContent.has(item?.component)) {
                        return item.content;
                    }

                    /**
                     * List
                     */
                    if (listComponent.has(item?.component)) {
                        // liks
                        if (item?.props?.links) {
                            // @ts-ignore
                            return item.props.items.map(({ label }) => label);
                        }

                        return item.props.items;
                    }

                    return item;
                }
            );

            return {
                uri,
                title,
                section,
                breadCrumbs: MobJs.getPagePath({ hash: uri }),
                data: filterDataByContent,
            };
        });

    const currentSearchSplitted = currentSearch.split(' ');

    /**
     * Get filtered result
     */
    const searchResult = resultParsed
        .filter((item) => {
            const dataJoined = item.data.join(' ');
            return currentSearchSplitted.every((word) => {
                return dataJoined.toLowerCase().includes(word.toLowerCase());
            });
        })
        .toSorted((first) => {
            /**
             * Switch in first position item with title equal currentSearch
             */
            if (first.title.toLowerCase().includes(currentSearch.toLowerCase()))
                return -1;

            return 1;
        })
        .map(({ title, uri, section, breadCrumbs, data }) => {
            /**
             * Number of occurrence in copies
             */
            const count = data
                .join('')
                .toLowerCase()
                .split(currentSearch.toLowerCase());

            return {
                title,
                uri,
                section,
                breadCrumbs,
                count: count?.length ?? 0,
            };
        });

    return searchResult;
};
