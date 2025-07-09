// @ts-nocheck
import { routes } from 'src/js/pages';

/**
 * @param {object} params
 * @param {string} params.source
 * @param {string} params.uri
 * @param {string} params.title
 * @returns {Promise<{ success: boolean; data: any; uri: string; title: string }>}
 */
export const executeFetch = async ({ source, uri, title, section }) => {
    const response = await fetch(source);
    if (!response.ok) {
        console.warn(`${source} not found`);
        return {
            success: false,
            data: '',
            uri,
            title,
            section,
        };
    }

    const data = await response.json();

    return {
        success: true,
        data: data.data,
        uri,
        title,
        section,
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
        .filter(({ props }) => {
            return props?.source && props?.title;
        })
        .map(({ name, props }) => {
            return {
                fn: executeFetch({
                    source: props.source ?? '',
                    uri: name ?? 'uri not forud',
                    title: props.title ?? 'title not found',
                    section: props.section ?? 'title not found',
                }),
            };
        });

    const result = await Promise.all(pageList.map(({ fn }) => fn));

    const resultParsed = result
        .filter(({ success }) => success)
        .map(({ data, uri, title, section }) => {
            /**
             * Extract HTMl-content
             */
            const dataParsed = data.reduce((previous, current) => {
                const { component } = current;
                if (!component) return previous;

                const isHTMLContent = current.component === 'html-content';

                if (!isHTMLContent) {
                    return [...previous, current];
                }

                return [...previous, current.props.data];
            }, []);

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
                data: filterDataByContent,
            };
        });

    /**
     * Get filtered result
     */
    const searchResult = resultParsed
        .filter((item) => {
            return item.data.some((row) => {
                return row.toLowerCase().includes(currentSearch.toLowerCase());
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
        .map(({ title, uri, section, data }) => {
            /**
             * Number of occurrence in copies
             */
            const count = data
                .join('')
                .toLowerCase()
                .split(currentSearch.toLowerCase());

            return { title, uri, section, count: count?.length ?? 0 };
        });

    return searchResult;
};
