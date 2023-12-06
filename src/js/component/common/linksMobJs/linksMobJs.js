const items = [
    "<strong class='is-green'>Main params:</strong>",
    "<a href='/#mobJs_html'>html</a>",
    "<a href='/#mobJs_onMount'>onMount/Destroy</a>",
    "<a href='/#mobJs_getState'>getState</a>",
    "<a href='/#mobJs_setState'>setState</a>",
    "<a href='/#mobJs_watch'>watch</a>",
    "<a href='/#mobJs_watchSync'>watchSync</a>",
    "<a href='/#mobJs_staticProps'>staticProps</a>",
    "<a href='/#mobJs_bindProps'>bindProps</a>",
    "<a href='/#mobJs_bindEvents'>bindEvents</a>",
    "<a href='/#mobJs_delegateEvents'>delegateEvents</a>",
    "<a href='/#mobJs_repeat'>reactive list (repeat)</a>",
    "<strong class='is-green'>Secondary params:</strong>",
    "<a href='/#mobJs_unBind'>unBind</a>",
    "<a href='/#mobJs_emit'>emit</a>",
    "<a href='/#mobJs_emitAsync'>emitAsync</a>",
    "<a href='/#mobJs_computed'>computed</a>",
    "<a href='/#mobJs_remove'>remove</a>",
    "<a href='/#mobJs_removeDom'>removeDOM</a>",
    "<a href='/#mobJs_getChildren'>getChildren</a>",
    "<a href='/#mobJs_freezeProp'>freezeProp</a>",
    "<a href='/#mobJs_unFreezeProp'>unFreezeProp</a>",
    "<a href='/#mobJs_getParentId'>getParentId</a>",
    "<a href='/#mobJs_watchParent'>watchParent</a>",
    "<a href='/#mobJs_syncParent'>syncParent</a>",
];

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const linksMobJs = ({ html, staticProps }) => {
    return html`<div class="c-params-mobjs">
        <mob-list ${staticProps({ items, style: 'small', dots: false })}>
        </mob-list>
    </div>`;
};
