"use strict";(()=>{var NC=Object.create;var Gc=Object.defineProperty;var PC=Object.getOwnPropertyDescriptor;var AC=Object.getOwnPropertyNames;var OC=Object.getPrototypeOf,$C=Object.prototype.hasOwnProperty;var LC=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),To=(e,t)=>{for(var r in t)Gc(e,r,{get:t[r],enumerable:!0})},DC=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of AC(t))!$C.call(e,n)&&n!==r&&Gc(e,n,{get:()=>t[n],enumerable:!(o=PC(t,n))||o.enumerable});return e};var FC=(e,t,r)=>(r=e!=null?NC(OC(e)):{},DC(t||!e||!e.__esModule?Gc(r,"default",{value:e,enumerable:!0}):r,e));var oT=LC((PJ,rT)=>{function Hv(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{let r=e[t],o=typeof r;(o==="object"||o==="function")&&!Object.isFrozen(r)&&Hv(r)}),e}var tc=class{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}};function Uv(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function fo(e,...t){let r=Object.create(null);for(let o in e)r[o]=e[o];return t.forEach(function(o){for(let n in o)r[n]=o[n]}),r}var HI="</span>",Fv=e=>!!e.scope,UI=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){let r=e.split(".");return[`${t}${r.shift()}`,...r.map((o,n)=>`${o}${"_".repeat(n+1)}`)].join(" ")}return`${t}${e}`},Hu=class{constructor(t,r){this.buffer="",this.classPrefix=r.classPrefix,t.walk(this)}addText(t){this.buffer+=Uv(t)}openNode(t){if(!Fv(t))return;let r=UI(t.scope,{prefix:this.classPrefix});this.span(r)}closeNode(t){Fv(t)&&(this.buffer+=HI)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}},Bv=(e={})=>{let t={children:[]};return Object.assign(t,e),t},Uu=class e{constructor(){this.rootNode=Bv(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){let r=Bv({scope:t});this.add(r),this.stack.push(r)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,r){return typeof r=="string"?t.addText(r):r.children&&(t.openNode(r),r.children.forEach(o=>this._walk(t,o)),t.closeNode(r)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(r=>typeof r=="string")?t.children=[t.children.join("")]:t.children.forEach(r=>{e._collapse(r)}))}},Gu=class extends Uu{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,r){let o=t.root;r&&(o.scope=`language:${r}`),this.add(o)}toHTML(){return new Hu(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}};function Ys(e){return e?typeof e=="string"?e:e.source:null}function Gv(e){return zo("(?=",e,")")}function GI(e){return zo("(?:",e,")*")}function qI(e){return zo("(?:",e,")?")}function zo(...e){return e.map(r=>Ys(r)).join("")}function JI(e){let t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function Ju(...e){return"("+(JI(e).capture?"":"?:")+e.map(o=>Ys(o)).join("|")+")"}function qv(e){return new RegExp(e.toString()+"|").exec("").length-1}function YI(e,t){let r=e&&e.exec(t);return r&&r.index===0}var XI=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function Yu(e,{joinWith:t}){let r=0;return e.map(o=>{r+=1;let n=r,s=Ys(o),i="";for(;s.length>0;){let a=XI.exec(s);if(!a){i+=s;break}i+=s.substring(0,a.index),s=s.substring(a.index+a[0].length),a[0][0]==="\\"&&a[1]?i+="\\"+String(Number(a[1])+n):(i+=a[0],a[0]==="("&&r++)}return i}).map(o=>`(${o})`).join(t)}var KI=/\b\B/,Jv="[a-zA-Z]\\w*",Xu="[a-zA-Z_]\\w*",Yv="\\b\\d+(\\.\\d+)?",Xv="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Kv="\\b(0b[01]+)",QI="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",ZI=(e={})=>{let t=/^#![ ]*\//;return e.binary&&(e.begin=zo(t,/.*\b/,e.binary,/\b.*/)),fo({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(r,o)=>{r.index!==0&&o.ignoreMatch()}},e)},Xs={begin:"\\\\[\\s\\S]",relevance:0},eM={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[Xs]},tM={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[Xs]},rM={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},oc=function(e,t,r={}){let o=fo({scope:"comment",begin:e,end:t,contains:[]},r);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});let n=Ju("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:zo(/[ ]+/,"(",n,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},oM=oc("//","$"),nM=oc("/\\*","\\*/"),sM=oc("#","$"),iM={scope:"number",begin:Yv,relevance:0},aM={scope:"number",begin:Xv,relevance:0},cM={scope:"number",begin:Kv,relevance:0},lM={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[Xs,{begin:/\[/,end:/\]/,relevance:0,contains:[Xs]}]},uM={scope:"title",begin:Jv,relevance:0},pM={scope:"title",begin:Xu,relevance:0},mM={begin:"\\.\\s*"+Xu,relevance:0},dM=function(e){return Object.assign(e,{"on:begin":(t,r)=>{r.data._beginMatch=t[1]},"on:end":(t,r)=>{r.data._beginMatch!==t[1]&&r.ignoreMatch()}})},ec=Object.freeze({__proto__:null,APOS_STRING_MODE:eM,BACKSLASH_ESCAPE:Xs,BINARY_NUMBER_MODE:cM,BINARY_NUMBER_RE:Kv,COMMENT:oc,C_BLOCK_COMMENT_MODE:nM,C_LINE_COMMENT_MODE:oM,C_NUMBER_MODE:aM,C_NUMBER_RE:Xv,END_SAME_AS_BEGIN:dM,HASH_COMMENT_MODE:sM,IDENT_RE:Jv,MATCH_NOTHING_RE:KI,METHOD_GUARD:mM,NUMBER_MODE:iM,NUMBER_RE:Yv,PHRASAL_WORDS_MODE:rM,QUOTE_STRING_MODE:tM,REGEXP_MODE:lM,RE_STARTERS_RE:QI,SHEBANG:ZI,TITLE_MODE:uM,UNDERSCORE_IDENT_RE:Xu,UNDERSCORE_TITLE_MODE:pM});function hM(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function fM(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function gM(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=hM,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function bM(e,t){Array.isArray(e.illegal)&&(e.illegal=Ju(...e.illegal))}function yM(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function vM(e,t){e.relevance===void 0&&(e.relevance=1)}var TM=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");let r=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=r.keywords,e.begin=zo(r.beforeMatch,Gv(r.begin)),e.starts={relevance:0,contains:[Object.assign(r,{endsParent:!0})]},e.relevance=0,delete r.beforeMatch},SM=["of","and","for","in","not","or","if","then","parent","list","value"],_M="keyword";function Qv(e,t,r=_M){let o=Object.create(null);return typeof e=="string"?n(r,e.split(" ")):Array.isArray(e)?n(r,e):Object.keys(e).forEach(function(s){Object.assign(o,Qv(e[s],t,s))}),o;function n(s,i){t&&(i=i.map(a=>a.toLowerCase())),i.forEach(function(a){let c=a.split("|");o[c[0]]=[s,xM(c[0],c[1])]})}}function xM(e,t){return t?Number(t):CM(e)?0:1}function CM(e){return SM.includes(e.toLowerCase())}var Vv={},jo=e=>{console.error(e)},Wv=(e,...t)=>{console.log(`WARN: ${e}`,...t)},qn=(e,t)=>{Vv[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Vv[`${e}/${t}`]=!0)},rc=new Error;function Zv(e,t,{key:r}){let o=0,n=e[r],s={},i={};for(let a=1;a<=t.length;a++)i[a+o]=n[a],s[a+o]=!0,o+=qv(t[a-1]);e[r]=i,e[r]._emit=s,e[r]._multi=!0}function EM(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw jo("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),rc;if(typeof e.beginScope!="object"||e.beginScope===null)throw jo("beginScope must be object"),rc;Zv(e,e.begin,{key:"beginScope"}),e.begin=Yu(e.begin,{joinWith:""})}}function wM(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw jo("skip, excludeEnd, returnEnd not compatible with endScope: {}"),rc;if(typeof e.endScope!="object"||e.endScope===null)throw jo("endScope must be object"),rc;Zv(e,e.end,{key:"endScope"}),e.end=Yu(e.end,{joinWith:""})}}function IM(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function MM(e){IM(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),EM(e),wM(e)}function RM(e){function t(i,a){return new RegExp(Ys(i),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(a?"g":""))}class r{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(a,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,a]),this.matchAt+=qv(a)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);let a=this.regexes.map(c=>c[1]);this.matcherRe=t(Yu(a,{joinWith:"|"}),!0),this.lastIndex=0}exec(a){this.matcherRe.lastIndex=this.lastIndex;let c=this.matcherRe.exec(a);if(!c)return null;let l=c.findIndex((d,f)=>f>0&&d!==void 0),p=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,p)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(a){if(this.multiRegexes[a])return this.multiRegexes[a];let c=new r;return this.rules.slice(a).forEach(([l,p])=>c.addRule(l,p)),c.compile(),this.multiRegexes[a]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(a,c){this.rules.push([a,c]),c.type==="begin"&&this.count++}exec(a){let c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(a);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){let p=this.getMatcher(0);p.lastIndex=this.lastIndex+1,l=p.exec(a)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function n(i){let a=new o;return i.contains.forEach(c=>a.addRule(c.begin,{rule:c,type:"begin"})),i.terminatorEnd&&a.addRule(i.terminatorEnd,{type:"end"}),i.illegal&&a.addRule(i.illegal,{type:"illegal"}),a}function s(i,a){let c=i;if(i.isCompiled)return c;[fM,yM,MM,TM].forEach(p=>p(i,a)),e.compilerExtensions.forEach(p=>p(i,a)),i.__beforeBegin=null,[gM,bM,vM].forEach(p=>p(i,a)),i.isCompiled=!0;let l=null;return typeof i.keywords=="object"&&i.keywords.$pattern&&(i.keywords=Object.assign({},i.keywords),l=i.keywords.$pattern,delete i.keywords.$pattern),l=l||/\w+/,i.keywords&&(i.keywords=Qv(i.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),a&&(i.begin||(i.begin=/\B|\b/),c.beginRe=t(c.begin),!i.end&&!i.endsWithParent&&(i.end=/\B|\b/),i.end&&(c.endRe=t(c.end)),c.terminatorEnd=Ys(c.end)||"",i.endsWithParent&&a.terminatorEnd&&(c.terminatorEnd+=(i.end?"|":"")+a.terminatorEnd)),i.illegal&&(c.illegalRe=t(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map(function(p){return kM(p==="self"?i:p)})),i.contains.forEach(function(p){s(p,c)}),i.starts&&s(i.starts,a),c.matcher=n(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=fo(e.classNameAliases||{}),s(e)}function eT(e){return e?e.endsWithParent||eT(e.starts):!1}function kM(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return fo(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:eT(e)?fo(e,{starts:e.starts?fo(e.starts):null}):Object.isFrozen(e)?fo(e):e}var NM="11.11.1",qu=class extends Error{constructor(t,r){super(t),this.name="HTMLInjectionError",this.html=r}},zu=Uv,jv=fo,zv=Symbol("nomatch"),PM=7,tT=function(e){let t=Object.create(null),r=Object.create(null),o=[],n=!0,s="Could not find the language '{}', did you forget to load/include a language module?",i={disableAutodetect:!0,name:"Plain text",contains:[]},a={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Gu};function c(x){return a.noHighlightRe.test(x)}function l(x){let N=x.className+" ";N+=x.parentNode?x.parentNode.className:"";let O=a.languageDetectRe.exec(N);if(O){let F=R(O[1]);return F||(Wv(s.replace("{}",O[1])),Wv("Falling back to no-highlight mode for this block.",x)),F?O[1]:"no-highlight"}return N.split(/\s+/).find(F=>c(F)||R(F))}function p(x,N,O){let F="",B="";typeof N=="object"?(F=x,O=N.ignoreIllegals,B=N.language):(qn("10.7.0","highlight(lang, code, ...args) has been deprecated."),qn("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),B=x,F=N),O===void 0&&(O=!0);let Q={code:F,language:B};k("before:highlight",Q);let U=Q.result?Q.result:d(Q.language,Q.code,O);return U.code=Q.code,k("after:highlight",U),U}function d(x,N,O,F){let B=Object.create(null);function Q(W,G){return W.keywords[G]}function U(){if(!re.keywords){Ye.addText(we);return}let W=0;re.keywordPatternRe.lastIndex=0;let G=re.keywordPatternRe.exec(we),ce="";for(;G;){ce+=we.substring(W,G.index);let _e=Ct.case_insensitive?G[0].toLowerCase():G[0],et=Q(re,_e);if(et){let[br,RC]=et;if(Ye.addText(ce),ce="",B[_e]=(B[_e]||0)+1,B[_e]<=PM&&(ui+=RC),br.startsWith("_"))ce+=G[0];else{let kC=Ct.classNameAliases[br]||br;oe(G[0],kC)}}else ce+=G[0];W=re.keywordPatternRe.lastIndex,G=re.keywordPatternRe.exec(we)}ce+=we.substring(W),Ye.addText(ce)}function J(){if(we==="")return;let W=null;if(typeof re.subLanguage=="string"){if(!t[re.subLanguage]){Ye.addText(we);return}W=d(re.subLanguage,we,!0,Sp[re.subLanguage]),Sp[re.subLanguage]=W._top}else W=h(we,re.subLanguage.length?re.subLanguage:null);re.relevance>0&&(ui+=W.relevance),Ye.__addSublanguage(W._emitter,W.language)}function q(){re.subLanguage!=null?J():U(),we=""}function oe(W,G){W!==""&&(Ye.startScope(G),Ye.addText(W),Ye.endScope())}function te(W,G){let ce=1,_e=G.length-1;for(;ce<=_e;){if(!W._emit[ce]){ce++;continue}let et=Ct.classNameAliases[W[ce]]||W[ce],br=G[ce];et?oe(br,et):(we=br,U(),we=""),ce++}}function me(W,G){return W.scope&&typeof W.scope=="string"&&Ye.openNode(Ct.classNameAliases[W.scope]||W.scope),W.beginScope&&(W.beginScope._wrap?(oe(we,Ct.classNameAliases[W.beginScope._wrap]||W.beginScope._wrap),we=""):W.beginScope._multi&&(te(W.beginScope,G),we="")),re=Object.create(W,{parent:{value:re}}),re}function Ee(W,G,ce){let _e=YI(W.endRe,ce);if(_e){if(W["on:end"]){let et=new tc(W);W["on:end"](G,et),et.isMatchIgnored&&(_e=!1)}if(_e){for(;W.endsParent&&W.parent;)W=W.parent;return W}}if(W.endsWithParent)return Ee(W.parent,G,ce)}function ke(W){return re.matcher.regexIndex===0?(we+=W[0],1):(Uc=!0,0)}function Ne(W){let G=W[0],ce=W.rule,_e=new tc(ce),et=[ce.__beforeBegin,ce["on:begin"]];for(let br of et)if(br&&(br(W,_e),_e.isMatchIgnored))return ke(G);return ce.skip?we+=G:(ce.excludeBegin&&(we+=G),q(),!ce.returnBegin&&!ce.excludeBegin&&(we=G)),me(ce,W),ce.returnBegin?0:G.length}function Ue(W){let G=W[0],ce=N.substring(W.index),_e=Ee(re,W,ce);if(!_e)return zv;let et=re;re.endScope&&re.endScope._wrap?(q(),oe(G,re.endScope._wrap)):re.endScope&&re.endScope._multi?(q(),te(re.endScope,W)):et.skip?we+=G:(et.returnEnd||et.excludeEnd||(we+=G),q(),et.excludeEnd&&(we=G));do re.scope&&Ye.closeNode(),!re.skip&&!re.subLanguage&&(ui+=re.relevance),re=re.parent;while(re!==_e.parent);return _e.starts&&me(_e.starts,W),et.returnEnd?0:G.length}function St(){let W=[];for(let G=re;G!==Ct;G=G.parent)G.scope&&W.unshift(G.scope);W.forEach(G=>Ye.openNode(G))}let yo={};function cs(W,G){let ce=G&&G[0];if(we+=W,ce==null)return q(),0;if(yo.type==="begin"&&G.type==="end"&&yo.index===G.index&&ce===""){if(we+=N.slice(G.index,G.index+1),!n){let _e=new Error(`0 width match regex (${x})`);throw _e.languageName=x,_e.badRule=yo.rule,_e}return 1}if(yo=G,G.type==="begin")return Ne(G);if(G.type==="illegal"&&!O){let _e=new Error('Illegal lexeme "'+ce+'" for mode "'+(re.scope||"<unnamed>")+'"');throw _e.mode=re,_e}else if(G.type==="end"){let _e=Ue(G);if(_e!==zv)return _e}if(G.type==="illegal"&&ce==="")return we+=`
`,1;if(Hc>1e5&&Hc>G.index*3)throw new Error("potential infinite loop, way more iterations than matches");return we+=ce,ce.length}let Ct=R(x);if(!Ct)throw jo(s.replace("{}",x)),new Error('Unknown language: "'+x+'"');let MC=RM(Ct),zc="",re=F||MC,Sp={},Ye=new a.__emitter(a);St();let we="",ui=0,vo=0,Hc=0,Uc=!1;try{if(Ct.__emitTokens)Ct.__emitTokens(N,Ye);else{for(re.matcher.considerAll();;){Hc++,Uc?Uc=!1:re.matcher.considerAll(),re.matcher.lastIndex=vo;let W=re.matcher.exec(N);if(!W)break;let G=N.substring(vo,W.index),ce=cs(G,W);vo=W.index+ce}cs(N.substring(vo))}return Ye.finalize(),zc=Ye.toHTML(),{language:x,value:zc,relevance:ui,illegal:!1,_emitter:Ye,_top:re}}catch(W){if(W.message&&W.message.includes("Illegal"))return{language:x,value:zu(N),illegal:!0,relevance:0,_illegalBy:{message:W.message,index:vo,context:N.slice(vo-100,vo+100),mode:W.mode,resultSoFar:zc},_emitter:Ye};if(n)return{language:x,value:zu(N),illegal:!1,relevance:0,errorRaised:W,_emitter:Ye,_top:re};throw W}}function f(x){let N={value:zu(x),illegal:!1,relevance:0,_top:i,_emitter:new a.__emitter(a)};return N._emitter.addText(x),N}function h(x,N){N=N||a.languages||Object.keys(t);let O=f(x),F=N.filter(R).filter(D).map(q=>d(q,x,!1));F.unshift(O);let B=F.sort((q,oe)=>{if(q.relevance!==oe.relevance)return oe.relevance-q.relevance;if(q.language&&oe.language){if(R(q.language).supersetOf===oe.language)return 1;if(R(oe.language).supersetOf===q.language)return-1}return 0}),[Q,U]=B,J=Q;return J.secondBest=U,J}function v(x,N,O){let F=N&&r[N]||O;x.classList.add("hljs"),x.classList.add(`language-${F}`)}function b(x){let N=null,O=l(x);if(c(O))return;if(k("before:highlightElement",{el:x,language:O}),x.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",x);return}if(x.children.length>0&&(a.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(x)),a.throwUnescapedHTML))throw new qu("One of your code blocks includes unescaped HTML.",x.innerHTML);N=x;let F=N.textContent,B=O?p(F,{language:O,ignoreIllegals:!0}):h(F);x.innerHTML=B.value,x.dataset.highlighted="yes",v(x,O,B.language),x.result={language:B.language,re:B.relevance,relevance:B.relevance},B.secondBest&&(x.secondBest={language:B.secondBest.language,relevance:B.secondBest.relevance}),k("after:highlightElement",{el:x,result:B,text:F})}function T(x){a=jv(a,x)}let _=()=>{E(),qn("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function S(){E(),qn("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let C=!1;function E(){function x(){E()}if(document.readyState==="loading"){C||window.addEventListener("DOMContentLoaded",x,!1),C=!0;return}document.querySelectorAll(a.cssSelector).forEach(b)}function w(x,N){let O=null;try{O=N(e)}catch(F){if(jo("Language definition for '{}' could not be registered.".replace("{}",x)),n)jo(F);else throw F;O=i}O.name||(O.name=x),t[x]=O,O.rawDefinition=N.bind(null,e),O.aliases&&L(O.aliases,{languageName:x})}function M(x){delete t[x];for(let N of Object.keys(r))r[N]===x&&delete r[N]}function A(){return Object.keys(t)}function R(x){return x=(x||"").toLowerCase(),t[x]||t[r[x]]}function L(x,{languageName:N}){typeof x=="string"&&(x=[x]),x.forEach(O=>{r[O.toLowerCase()]=N})}function D(x){let N=R(x);return N&&!N.disableAutodetect}function $(x){x["before:highlightBlock"]&&!x["before:highlightElement"]&&(x["before:highlightElement"]=N=>{x["before:highlightBlock"](Object.assign({block:N.el},N))}),x["after:highlightBlock"]&&!x["after:highlightElement"]&&(x["after:highlightElement"]=N=>{x["after:highlightBlock"](Object.assign({block:N.el},N))})}function V(x){$(x),o.push(x)}function I(x){let N=o.indexOf(x);N!==-1&&o.splice(N,1)}function k(x,N){let O=x;o.forEach(function(F){F[O]&&F[O](N)})}function P(x){return qn("10.7.0","highlightBlock will be removed entirely in v12.0"),qn("10.7.0","Please use highlightElement now."),b(x)}Object.assign(e,{highlight:p,highlightAuto:h,highlightAll:E,highlightElement:b,highlightBlock:P,configure:T,initHighlighting:_,initHighlightingOnLoad:S,registerLanguage:w,unregisterLanguage:M,listLanguages:A,getLanguage:R,registerAliases:L,autoDetection:D,inherit:jv,addPlugin:V,removePlugin:I}),e.debugMode=function(){n=!1},e.safeMode=function(){n=!0},e.versionString=NM,e.regex={concat:zo,lookahead:Gv,either:Ju,optional:qI,anyNumberOfTimes:GI};for(let x in ec)typeof ec[x]=="object"&&Hv(ec[x]);return Object.assign(e,ec),e},Jn=tT({});Jn.newInstance=()=>tT({});rT.exports=Jn;Jn.HighlightJS=Jn;Jn.default=Jn});var u={};To(u,{ANIMATION_STOP_REJECT:()=>ll,checkType:()=>Le,createStore:()=>WE,debounce:()=>So,getFps:()=>zE,getInstantFps:()=>jE,getTime:()=>Yt,getTypeName:()=>ls,getUnivoqueId:()=>Ie,mustMakeSomething:()=>HE,normalizeWheel:()=>Si,shouldMakeSomething:()=>UE,store:()=>Tw,throttle:()=>pi,useCache:()=>QE,useDebounce:()=>So,useFps:()=>XE,useFrame:()=>GE,useFrameIndex:()=>YE,useLinkedList:()=>Sw,useLoad:()=>KE,useMouseClick:()=>tw,useMouseDown:()=>rw,useMouseMove:()=>nw,useMouseUp:()=>iw,useMouseWheel:()=>cw,useNextFrame:()=>JE,useNextLoop:()=>Dt,useNextTick:()=>qE,usePointerDown:()=>fw,usePointerLeave:()=>vw,usePointerMove:()=>gw,usePointerOut:()=>yw,usePointerOver:()=>hw,usePointerUp:()=>bw,useResize:()=>ZE,useScroll:()=>lw,useScrollEnd:()=>dw,useScrollImmediate:()=>uw,useScrollStart:()=>mw,useScrollThrottle:()=>pw,useTouchEnd:()=>aw,useTouchMove:()=>sw,useTouchStart:()=>ow,useVisibilityChange:()=>ew});var Yt=()=>typeof globalThis>"u"?Date.now():globalThis.performance.now(),_p=16.666666666666668;var pi=(e,t)=>{let r,o;return function(){let n=this,s=arguments;o?(clearTimeout(r),r=setTimeout(function(){Yt()-o>=t&&(e.apply(n,s),o=Yt())},t-(Yt()-o))):(e.apply(n,s),o=Yt())}};var So=function(t,r=200){let o;return function(){let n=()=>Reflect.apply(t,this,arguments);clearTimeout(o),o=setTimeout(n,r)}};function ie(e){if(!e)return 0;let t=e.offsetHeight,r=getComputedStyle(e);return t+=Number.parseInt(r.marginTop)+Number.parseInt(r.marginBottom),t}function De(e){if(!e)return 0;let t=e.offsetWidth,r=getComputedStyle(e);return t+=Number.parseInt(r.marginLeft)+Number.parseInt(r.marginRight),t}function le(e){if(!e)return{top:0,left:0};let t=e.getBoundingClientRect();return{top:t.top+window.scrollY,left:t.left+window.scrollY}}function Et(e){return e?e.getBoundingClientRect():{bottom:0,height:0,left:0,right:0,top:0,width:0,x:0,y:0}}function _o(e,t){let r=t?.parentNode;for(;r;){if(r===e)return!0;r=r?.parentNode}return!1}function xo(e){let t=globalThis.getComputedStyle(e),r=t.transform||t.mozTransform;if(r==="none"||r===void 0)return{x:0,y:0,z:0};let o=r.includes("3d")?"3d":"2d",n=r.match(/matrix.*\((.+)\)/)[1].split(", ");if(o==="2d")return{x:n[4],y:n[5],z:0};if(o==="3d")return{x:n[12],y:n[13],z:n[14]}}function qc(e){return typeof Node=="object"?e instanceof Node:e&&typeof e=="object"&&typeof e.nodeType=="number"&&typeof e.nodeName=="string"}var Ie=()=>`_${Math.random().toString(36).slice(2,9)}`;function xp(e){var t=e.getBoundingClientRect();return t.top>=0&&t.bottom<=window.innerHeight}var Jc=(e,t,r)=>Math.min(Math.max(e,t),r);var mi=new Set,Dt=e=>{mi.add(e),mi.size===1&&setTimeout(()=>{mi.forEach(t=>{t()}),mi.clear()})};var Yc="UNTYPED",Cp="STRING",Ep="NUMBER",wp="OBJECT",Ip="FUNCTION",di="ARRAY",Mp="BOOLEAN",Rp="ELEMENT",kp="HTMLELEMENT",Np="NODELIST";var xe={isString:e=>Object.prototype.toString.call(e)==="[object String]",isNumber:e=>Object.prototype.toString.call(e)==="[object Number]"&&Number.isFinite(e),isObject:e=>Object.prototype.toString.call(e)==="[object Object]",isFunction:e=>Object.prototype.toString.call(e)==="[object Function]",isArray:e=>Object.prototype.toString.call(e)==="[object Array]",isBoolean:e=>Object.prototype.toString.call(e)==="[object Boolean]",isElement:e=>e instanceof Element||e instanceof Document,isHTMLElement:e=>e instanceof HTMLElement,isSet:e=>e instanceof Set,isMap:e=>e instanceof Map,isNodeList:e=>Object.prototype.isPrototypeOf.call(NodeList.prototype,e)},ls=e=>{switch(e){case String:case Cp:return"String";case Number:case Ep:return"Number";case Object:case wp:return"Object";case Function:case Ip:return"Function";case Array:case di:return"Array";case Boolean:case Mp:return"Boolean";case Element:case Rp:return"Element";case HTMLElement:case kp:return"HTMLElement";case NodeList:case Np:return"NodeList";case Set:case"SET":return"Set";case Map:case"MAP":return"Map";case"ANY":return"ANY";default:return Yc}},Le=(e,t)=>{switch(e){case String:case Cp:return xe.isString(t);case Number:case Ep:return xe.isNumber(t);case Object:case wp:return xe.isObject(t);case Function:case Ip:return xe.isFunction(t);case Array:case di:return xe.isArray(t);case Boolean:case Mp:return xe.isBoolean(t);case Element:case Rp:return xe.isElement(t);case HTMLElement:case kp:return xe.isHTMLElement(t);case NodeList:case Np:return xe.isNodeList(t);case Set:case"SET":return xe.isSet(t);case Map:case"MAP":return xe.isMap(t);case"ANY":return!0;default:return!0}};var WC=(e,t)=>e.size===t.size&&[...e.keys()].every(r=>e.get(r)===t.get(r)),jC=(e,t)=>e.size===t.size&&[...e].every(r=>t.has(r)),zC=(e,t)=>{if(e.length!==t.length)return!1;let r=new Set([...e,...t]);for(let o of r){let n=e.filter(i=>i===o).length,s=t.filter(i=>i===o).length;if(n!==s)return!1}return!0},Pp=(e,t,r=!1)=>{if(e===null||t===null)return e===t;let n=e,s=t;if(r||(Array.isArray(e)&&(n=[...e].toSorted()),Array.isArray(t)&&(s=[...t].toSorted())),typeof n!="object"||typeof s!="object")return n===s;let i=Object.getOwnPropertyNames(n),a=Object.getOwnPropertyNames(s);if(i.length!==a.length)return!1;for(let c of i){let l=n[c],p=s[c];if(typeof l=="object"&&typeof p=="object"){if(Pp(l,p,r))continue;return!1}if(l!==p)return!1}return!0},Xc=(e,t,r)=>{switch(e){case"ANY":return Pp(t,r);case di:case Array:return zC(t,r);case"SET":case Set:return jC(t,r);case"MAP":case Map:return WC(t,r);default:return t===r}};var hi="UPDATE";var Me={};To(Me,{extractKeysFromArray:()=>Zc,extractkeyFromProp:()=>Fr,getCurrentDependencies:()=>Kc,getFirstCurrentDependencies:()=>Qc,initializeCurrentDependencies:()=>us,setCurrentDependencies:()=>gi});var Jo=[],fi=!1,us=()=>{fi=!0,Jo.length=0},Kc=()=>(fi=!1,[...Jo]),Qc=()=>(fi=!1,[...Jo]?.[0]??"missing_prop"),gi=e=>{!fi||!e||Jo.includes(e)||(Jo=[...Jo,e])},Fr=e=>Le(String,e)?e:(us(),e(),Qc()),Zc=e=>e.map(t=>Le(String,t)?t:(us(),t(),Qc()));var bi=new Map,Yo=({callBackWatcher:e,prop:t,newValue:r,oldValue:o,validationValue:n,instanceId:s})=>{for(let{prop:i,fn:a,wait:c}of e.values())if(i===t&&!c&&a(r,o,n),s&&i===t&&c){let l=bi.get(s)??new Map,p=l.has(t);if(l.set(t,{newValue:r,oldValue:o,validationValue:n}),p)return;bi.set(s,l),Dt(()=>{let d=bi.get(s),f=d?.get(t);(f.newValue!==void 0||f.newValue!==null)&&a(f.newValue,f.oldValue,f.validationValue),d?.delete(t),d?.size===0&&bi.delete(s)})}},Ap=async({callBackWatcher:e,prop:t,newValue:r,oldValue:o,validationValue:n})=>{for(let{prop:s,fn:i}of e.values())s===t&&await i(r,o,n)};var HC="padding: 10px;",Fe=()=>HC;var yr=(e,t=new WeakMap)=>{if(e===null||typeof e!="object"||typeof Element<"u"&&e instanceof Element)return e;if(t.has(e))return t.get(e);if(e instanceof Date)return new Date(e);if(e instanceof RegExp)return new RegExp(e.source,e.flags);if(Array.isArray(e)){let o=[];return t.set(e,o),e.forEach((n,s)=>{o[s]=yr(n,t)}),o}if(typeof e=="function")return e;if(e instanceof Map){let o=new Map;return t.set(e,o),e.forEach((n,s)=>{o.set(yr(s,t),yr(n,t))}),o}if(e instanceof Set){let o=new Set;return t.set(e,o),e.forEach(n=>{o.add(yr(n,t))}),o}let r=Object.create(Object.getPrototypeOf(e));return t.set(e,r),Object.getOwnPropertyNames(e).forEach(o=>{let n=Object.getOwnPropertyDescriptor(e,o);n&&("value"in n?Object.defineProperty(r,o,{...n,value:yr(n.value,t)}):Object.defineProperty(r,o,n))}),Object.getOwnPropertySymbols(e).forEach(o=>{let n=Object.getOwnPropertyDescriptor(e,o);n&&("value"in n?Object.defineProperty(r,o,{...n,value:yr(n.value,t)}):Object.defineProperty(r,o,n))}),r};var el="store_shallow_copy",tl="store_custom_copy",rl="store_deep_copy",Xo=el,yi=()=>Xo===tl||Xo===rl;var He=new Map,ne=e=>{if(Xo===el){let t=He.get(e);return t?{...t}:void 0}if(Xo===tl){let t=He.get(e);return t?{...t,store:{...t.store},validationStatusObject:{...t.validationStatusObject}}:void 0}if(Xo===rl){let t=He.get(e);return t?{...t,store:yr(t.store),validationStatusObject:yr(t.validationStatusObject)}:void 0}return He.get(e)},Pe=(e,t)=>{He.set(e,t)},Op=e=>{He.delete(e)};var ol=(e,t)=>{console.warn(`%c MobStore supports an object with a depth of up to 2 levels, set 'Any' type to use obj as value, the input object has ${e} level`,t)};var $p=(e,t)=>{console.warn(`%c MobStore, trying to execute set() method: store.${e} not exist`,t)},Lp=(e,t,r)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: setProp methods doesn't allow objects as value, ${JSON.stringify(t)} is an Object, use 'Any' type for custom object`,r)},Dp=(e,t)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: '${JSON.stringify(e)}' is an objects`,t)},Fp=(e,t,r,o)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: ${t} is not a ${ls(r)}`,o)},Bp=(e,t,r)=>{console.warn(`%c trying to execute setObj method on '${e}' propierties: setObj methods allow only objects as value, ${t} is not an Object`,r)},Vp=(e,t)=>{console.warn(`%c trying to execute setObj data method on '${e}' propierties: store propierties '${e}' is not an object`,t)},Wp=(e,t,r)=>{console.warn(`%c trying to execute setObj data method: one of these keys '${e}' not exist in store.${t}`,r)},jp=(e,t,r)=>{console.warn(`%c trying to execute setObj data method on '${e}' propierties: '${JSON.stringify(t)}' have a depth > 1, nested obj is not allowed`,r)},zp=(e,t,r,o,n)=>{console.warn(`%c trying to execute setObj data method on ${e}.${t} propierties: ${r} is not a ${ls(o)}`,n)},Hp=(e,t)=>{console.warn(`%c trying to execute get data method: store.${e} not exist`,t)},nl=(e,t)=>{console.warn(`%c trying to execute set data method: store.${e} not exist`,t)},Up=(e,t)=>{console.warn(`%c one of the keys [${e}] is already used as a computed target, or there is a circular dependencies`,t)},Gp=(e,t)=>{console.warn(`%c MobStore error: the property ${e} to watch doesn't exist in store`,t)},qp=(e,t)=>{console.warn(`%c Validation Object error: validation function return undefined or have you used Object instead '${t}' ?`,e)};var Jp=(e,t)=>{console.warn(`%c MobStore error: the property ${e} should readOnly with proxi, maybe is a mobJs props.`,t)},sl=(e,t)=>{console.warn(`%c MobStore error: the property ${e} fail validation during definition.`,t)};var ps=e=>{if(!xe.isObject(e))return 0;let t=Object.values(e);return t.length===0?1:Math.max(...t.map(r=>ps(r)))+1},Yp=(e,t=!0)=>Object.fromEntries(Object.entries(e).map(([r,o])=>{if(xe.isObject(o)&&t)return[r,Yp(o,!1)];if(xe.isFunction(o)){let n=o();if(xe.isObject(n)&&"value"in n&&["validate","type","skipEqual"].some(s=>s in n))return[r,n.value]}return[r,o]})),Xp=(e,t,r,o=!0)=>Object.fromEntries(Object.entries(e).map(([n,s])=>{if(xe.isObject(s)&&o)return[n,Xp(s,t,r,!1)];if(xe.isFunction(s)){let i=s();if(xe.isObject(i)&&"value"in i&&t in i){let a=xe.isString(i[t])?i[t].toUpperCase():i[t];return[n,a]}}return[n,r]})),Kp=({data:e,depth:t,logStyle:r})=>t>2?(ol(t,r),{}):Yp(e),Ko=({data:e,prop:t,depth:r,logStyle:o,fallback:n})=>r>2?(ol(r,o),{}):Xp(e,t,n),Qp=({value:e})=>Le(Map,e)?new Map(e):Le(Set,e)?new Set(e):Le(Object,e)?{...e}:Le(Array,e)?[...e]:e,Qo=({instanceId:e,prop:t})=>{let r=ne(e);if(!r)return!1;let{callBackComputed:o}=r,n=[...o].some(({prop:s})=>t===s);return n&&console.warn(`${t} is used as computed, explicit set is disallowed.`),n};var UC=({instanceId:e,prop:t,val:r,fireCallback:o=!0,useStrict:n=!0,initalizeStep:s=!1})=>{let i=ne(e);if(!i)return;let{type:a,fnTransformation:c,store:l,fnValidate:p,strict:d,validationStatusObject:f,skipEqual:h,callBackWatcher:v,bindInstanceBy:b}=i,T=Fe(),_=a[t]==="ANY";if(xe.isObject(r)&&!_){Lp(t,r,T);return}if(xe.isObject(l[t])&&!_){Dp(t,T);return}let S=l[t],C=c[t]?.(r,S)??r;if(!Le(a[t],C)){Fp(t,C,a[t],T);return}let w=p[t]?.(C,S);!w&&s&&sl(t,T),!(d[t]&&!w&&n||(f[t]=w,(h[t]?Xc(a[t],S,C):!1)&&!s))&&(l[t]=C,Pe(e,{...i,store:l,validationStatusObject:f}),o&&!s&&(Yo({callBackWatcher:v,prop:t,newValue:C,oldValue:S,validationValue:f[t],instanceId:e}),vr({instanceId:e,prop:t}),b.forEach(A=>{vr({instanceId:A,prop:t})})))},GC=({instanceId:e,prop:t,val:r,fireCallback:o=!0,useStrict:n=!0,initalizeStep:s=!1})=>{let i=ne(e);if(!i)return;let{store:a,type:c,strict:l,fnTransformation:p,fnValidate:d,validationStatusObject:f,skipEqual:h,callBackWatcher:v,bindInstanceBy:b}=i,T=Fe();if(!xe.isObject(r)){Bp(t,r,T);return}if(!xe.isObject(a[t])){Vp(t,T);return}let _=Object.keys(r),S=Object.keys(a[t]);if(!_.every(I=>S.includes(I))){Wp(_,t,T);return}let E=Object.fromEntries(Object.entries(r).map(I=>{let[k,P]=I,x=a[t][k];return[k,p[t][k]?.(P,x)??P]}));if(!Object.entries(E).map(I=>{let[k,P]=I,x=Le(c[t][k],P);return x||zp(t,k,P,c[t][k],T),x}).every(I=>I===!0))return;let M=Object.entries(E).map(I=>{let[k,P]=I,x=a[t][k];return l[t][k]&&n?{strictCheck:d[t][k]?.(P,x),item:I}:{strictCheck:!0,item:I}}).filter(({strictCheck:I})=>I===!0);if(M.length===0)return;let R=Object.fromEntries(M.map(({item:I})=>I).map(([I,k])=>[I,k]));Object.entries(R).forEach(I=>{let[k,P]=I,x=a[t][k],N=d[t][k]?.(P,x);!N&&s&&sl(t,T),N===void 0&&qp(T,"ANY"),f[t][k]=N});let L=a[t],D={...a[t],...R};Object.keys(R).every(I=>h[t][I]===!0)&&Object.entries(D).every(([I,k])=>{let P=c[t][I]==="ANY";if(ps(k)>1&&!P){jp(t,E,T);return}return Xc(c[t][I],L[I],k)})&&!s||(a[t]=D,Pe(e,{...i,store:a,validationStatusObject:f}),o&&!s&&(Yo({callBackWatcher:v,prop:t,newValue:a[t],oldValue:L,validationValue:f[t],instanceId:e}),vr({instanceId:e,prop:t}),b.forEach(I=>{vr({instanceId:I,prop:t})})))},Tr=({instanceId:e,prop:t,value:r,fireCallback:o=!0,clone:n=!1,useStrict:s=!0,action:i,initalizeStep:a=!1})=>{let c=ne(e);if(!c)return;let{store:l,type:p}=c;if(!l)return;let d=Fe();if(!(t in l)){$p(t,d);return}let f=n?Qp({value:l[t]}):l[t],h=i===hi?r(f):r,v=p[t]==="ANY";if(xe.isObject(f)&&!v){GC({instanceId:e,prop:t,val:h,fireCallback:o,useStrict:s,initalizeStep:a});return}UC({instanceId:e,prop:t,val:h,fireCallback:o,useStrict:s,initalizeStep:a})},Zp=({instanceId:e,prop:t,value:r})=>{let o=ne(e);if(!o)return;let{store:n,callBackWatcher:s}=o,i=n[t];n[t]=r,Pe(e,{...o,store:n}),Yo({callBackWatcher:s,prop:t,newValue:r,oldValue:i,validationValue:!0,instanceId:e})},em=({store:e,bindInstance:t})=>t.reduce((r,o)=>{let n=ne(o);if(!n)return r;let{store:s}=n;return{...r,...s}},e),qC=e=>{let t=ne(e);if(!t)return;let{computedPropsQueque:r,callBackComputed:o,store:n,bindInstance:s}=t,i=[...o??[]].filter(({keys:l})=>[...r].find(p=>l.includes(p))),a=em({store:n,bindInstance:s}),c=i.map(({prop:l,keys:p,fn:d})=>{let f=Object.fromEntries(p.map(h=>[h,a[h]]));return{prop:l,value:d(f)}});Pe(e,{...t,computedPropsQueque:new Set,computedRunning:!1}),c.forEach(({prop:l,value:p})=>{Tr({instanceId:e,prop:l,value:p,action:"SET"})})},vr=({instanceId:e,prop:t})=>{let r=ne(e);if(!r)return;let{callBackComputed:o,computedPropsQueque:n,computedRunning:s}=r;if(!(!o||o.size===0)&&(n.add(t),Pe(e,{...r,computedPropsQueque:n}),!s)){let i=ne(e);if(!i)return;Pe(e,{...i,computedRunning:!0}),Dt(()=>qC(e))}},JC=({instanceId:e,prop:t,keys:r,fn:o})=>{let n=ne(e);if(!n)return;let{callBackComputed:s}=n,i=[...s].reduce((a,{prop:c,keys:l})=>l.includes(t)&&r.includes(c)&&!a,!1);if(r.includes(t)||i){Up(r,Fe());return}s.add({prop:t,keys:r,fn:o}),Pe(e,{...n,callBackComputed:s})},YC=({instanceId:e,prop:t,keys:r,callback:o})=>{let n=ne(e);if(!n)return;let{store:s,bindInstance:i}=n,a=em({store:s,bindInstance:i}),c=Object.fromEntries(r.map(p=>{if(p in a)return[p,a[p]]}).filter(p=>p!==void 0)),l=o(c);Tr({instanceId:e,prop:t,value:l,fireCallback:!1,clone:!1,action:"SET"})},tm=({instanceId:e,prop:t,keys:r,callback:o})=>{let n=r.length===0?(us(),o({}),Kc()):r;YC({instanceId:e,prop:t,keys:n,callback:o}),JC({instanceId:e,prop:t,keys:n,fn:o})};var rm=e=>{let{store:t}=e,r=Object.entries(t).reduce((o,n)=>{let[s,i]=n;return xe.isObject(i)?{...o,[s]:{}}:o},{});return{...e,validationStatusObject:r}},om=(e,t)=>{let{store:r}=t;Object.entries(r).forEach(o=>{let[n,s]=o;Tr({instanceId:e,prop:n,value:s,fireCallback:!1,useStrict:!1,action:"SET",initalizeStep:!0})})};var XC=({state:e,prop:t,callback:r,wait:o})=>{let{store:n,callBackWatcher:s}=e,i=Fe();if(!n)return{state:void 0,unsubscribeId:""};if(!(t in n))return Gp(t,i),{state:void 0,unsubscribeId:""};let a=Ie();return s.set(a,{fn:r,prop:t,wait:o}),{state:{...e,callBackWatcher:s},unsubscribeId:a}},KC=({instanceId:e,unsubscribeId:t})=>{let r=ne(e);if(!r)return;let{callBackWatcher:o}=r;o&&(o.delete(t),Pe(e,{...r,callBackWatcher:o}))},nm=({instanceId:e,prop:t,callback:r,wait:o})=>{let n=ne(e);if(!n)return()=>{};let{state:s,unsubscribeId:i}=XC({state:n,prop:t,callback:r,wait:o});return s?(Pe(e,s),()=>{KC({instanceId:e,unsubscribeId:i})}):()=>{}},sm=({instanceId:e,prop:t,callback:r,wait:o})=>{let n=ne(e);if(!n)return()=>{};let{bindInstance:s,unsubscribeBindInstance:i}=n;if(!s||s.length===0)return nm({instanceId:e,prop:t,callback:r,wait:o});let a=[e,...s].find(p=>{let d=ne(p)?.store;return d&&t in d})??"",c=nm({instanceId:a,prop:t,callback:r,wait:o}),l=ne(e);return l?(Pe(e,{...l,unsubscribeBindInstance:[...i,c]}),()=>{c();let p=ne(e);p&&Pe(e,{...p,unsubscribeBindInstance:i.filter(d=>d!==c)})}):()=>{}};var im=e=>{let t=ps(e);return{callBackWatcher:new Map,callBackComputed:new Set,computedPropsQueque:new Set,validationStatusObject:{},dataDepth:t,computedRunning:!1,store:Kp({data:e,depth:t,logStyle:Fe()}),type:Ko({data:e,prop:"type",depth:t,logStyle:Fe(),fallback:Yc}),fnTransformation:Ko({data:e,prop:"transform",depth:t,logStyle:Fe(),fallback:r=>r}),fnValidate:Ko({data:e,prop:"validate",depth:t,logStyle:Fe(),fallback:()=>!0}),strict:Ko({data:e,prop:"strict",depth:t,logStyle:Fe(),fallback:!1}),skipEqual:Ko({data:e,prop:"skipEqual",depth:t,logStyle:Fe(),fallback:!0}),proxiObject:void 0,bindInstance:[],bindInstanceBy:[],unsubscribeBindInstance:[],proxiReadOnlyProp:new Set}};var am=e=>{let t=ne(e);if(!t)return{};let{store:r}=t;return r??{}},lm=e=>{let t=ne(e);if(!t)return{};let{bindInstance:r}=t;return!r||r.length===0?am(e):Object.fromEntries([...r,e].flatMap(o=>Object.entries(am(o))))},cm=({instanceId:e,prop:t})=>{let r=ne(e);if(!r)return;let o=r?.store;if(o&&t in o)return o[t];Hp(t,Fe())},um=({instanceId:e,prop:t})=>{let r=ne(e);if(!r)return;let{bindInstance:o}=r;if(!o||o.length===0)return cm({instanceId:e,prop:t});let n=[e,...o].find(s=>{let i=He.get(s)?.store;return i&&t in i})??"";return cm({instanceId:n,prop:t})};var pm=({instanceId:e,prop:t})=>{let r=ne(e);if(!r)return;let{store:o,callBackWatcher:n,validationStatusObject:s,bindInstanceBy:i}=r;o&&(t in o?(Yo({callBackWatcher:n,prop:t,newValue:o[t],oldValue:o[t],validationValue:s[t],instanceId:e}),vr({instanceId:e,prop:t}),i.forEach(a=>{vr({instanceId:a,prop:t})})):nl(t,Fe()))},vi=({instanceId:e,prop:t})=>{let r=ne(e);if(!r)return;let{bindInstance:o}=r;if(!o||o.length===0){pm({instanceId:e,prop:t});return}let n=[e,...o].find(s=>{let i=He.get(s)?.store;return i&&t in i})??"";pm({instanceId:n,prop:t})},mm=async({instanceId:e,prop:t})=>{let r=ne(e);if(!r)return new Promise(a=>a(""));let{store:o,callBackWatcher:n,validationStatusObject:s,bindInstanceBy:i}=r;return o?t in o?(await Ap({callBackWatcher:n,prop:t,newValue:o[t],oldValue:o[t],validationValue:s[t],instanceId:e}),vr({instanceId:e,prop:t}),i.forEach(a=>{vr({instanceId:a,prop:t})}),{success:!0}):(nl(t,Fe()),{success:!1}):{success:!1}},dm=async({instanceId:e,prop:t})=>{let r=ne(e);if(!r)return new Promise(s=>s(""));let{bindInstance:o}=r;if(!o||o.length===0)return mm({instanceId:e,prop:t});let n=[e,...o].find(s=>{let i=He.get(s)?.store;return i&&t in i})??"";return mm({instanceId:n,prop:t})};var hm=({instanceId:e})=>{let t=ne(e);if(!t)return;let{validationStatusObject:r}=t;return r},fm=({instanceId:e})=>{let t=ne(e);if(!t)return;let{store:r}=t;console.log(r)},gm=({instanceId:e})=>{let t=ne(e);if(!t)return;let{validationStatusObject:r}=t;console.log(r)},bm=({instanceId:e})=>{let t=ne(e);console.log(t)};var ym=({instanceId:e})=>{let t=Fe(),r=He.get(e);if(!r)return{};let{bindInstance:o,proxiObject:n,proxiReadOnlyProp:s}=r;if(n)return n;let i=r?.store,a=new Proxy(i,{set(p,d,f){let h=yi()?He.get(e)?.store??p:p;if(!h)return!1;if(d in h){let v=Qo({instanceId:e,prop:d}),b=s.has(d);return b&&Jp(d,t),v||b?!1:(Tr({instanceId:e,prop:d,value:f,fireCallback:!0,clone:!1,action:"SET"}),!0)}return!1},get(p,d){let f=yi()?He.get(e)?.store??p:p;return!f||!(d in f)?!1:(gi(d),f[d])}});if(!o||o.length===0)return Pe(e,{...r,proxiObject:a}),a;let c=o.map(p=>{let f=He.get(p)?.store??{};return new Proxy(f,{set(){return!1},get(h,v){let b=yi()?He.get(p)?.store??h:h;return!b||!(v in b)?!1:(gi(v),b[v])}})}),l=new Proxy([a,...c],{set(p,d,f){let h=p.find(v=>d in v);return h?(Reflect.set(h,d,f),!0):!1},get(p,d){let f=p.find(h=>d in h);return f?Reflect.get(f,d):!1}});return Pe(e,{...r,proxiObject:l}),l};var QC=({selfId:e,bindId:t})=>{let r=ne(t);if(!r)return;let{bindInstanceBy:o}=r,n=[...o,e];Pe(t,{...r,bindInstanceBy:n})},vm=({selfId:e,bindId:t})=>{let r=ne(t);if(!r)return;let{bindInstanceBy:o}=r,n=o.filter(s=>s!==e);Pe(t,{...r,bindInstanceBy:n})},ZC=({bindStores:e,selfStore:t})=>{let o=[...Le(Array,e)?e.map(n=>n.get()):[e.get()],t.store];o.forEach((n,s)=>{o.forEach((i,a)=>{if(s<=a)return;let c=Object.keys(n).filter(l=>Object.keys(i).includes(l));c.length>0&&console.warn(`bindStore: prop conflict on following prop: '${c}', bind store key must be univoque'`)})})},Tm=({value:e,instanceId:t})=>{let r=ne(t);if(!r)return;ZC({bindStores:e,selfStore:r});let{bindInstance:o}=r;if(!o)return;let n=Le(Array,e)?e.map(i=>i.getId()):[e.getId()],s=[...o,...n];Pe(t,{...r,bindInstance:s}),n.forEach(i=>{QC({selfId:t,bindId:i})})};var Sm=e=>{let t=He.get(e);if(!t)return;t.callBackWatcher.clear(),t.callBackComputed.clear(),t.computedPropsQueque.clear(),t.store={},t.proxiObject=null;let{unsubscribeBindInstance:r,bindInstance:o}=t;r.forEach(n=>{n?.()}),o.forEach(n=>{vm({selfId:e,bindId:n})}),Op(e)};var _m=({instanceId:e,values:t})=>{let r=ne(e);if(!r)return;let{proxiReadOnlyProp:o}=r;t.forEach(n=>{o.add(n)}),Pe(e,r)};var Ti=(e={})=>{let t=Ie(),r=im(e),o=rm(r);return Pe(t,o),om(t,r),{getId:()=>t,bindStore:n=>{Tm({value:n,instanceId:t})},get:()=>lm(t),getProp:n=>um({instanceId:t,prop:n}),set:(n,s,{emit:i=!0,usePropAsString:a=!1}={})=>{let c=a?n:Fr(n);Qo({instanceId:t,prop:c})||Tr({instanceId:t,prop:c,value:s,fireCallback:i??!0,clone:!1,action:"SET"})},update:(n,s,{emit:i=!0,clone:a=!1,usePropAsString:c=!1}={})=>{let l=c?n:Fr(n);Qo({instanceId:t,prop:l})||Tr({instanceId:t,prop:l,value:s,fireCallback:i??!0,clone:a,action:hi})},getProxi:()=>ym({instanceId:t}),quickSetProp:(n,s)=>{Qo({instanceId:t,prop:n})||Zp({instanceId:t,prop:n,value:s})},watch:(n,s,{wait:i=!1,immediate:a=!1}={})=>{let c=Fr(n),l=sm({instanceId:t,prop:c,callback:s,wait:i});return a&&Dt(()=>{vi({instanceId:t,prop:c})}),l},computed:(n,s,i=[],{usePropAsString:a=!1}={})=>{let c=a?n:Fr(n),l=Zc(i);tm({instanceId:t,prop:c,keys:l,callback:s}),Dt(()=>{vi({instanceId:t,prop:c})})},emit:n=>{let s=Fr(n);vi({instanceId:t,prop:s})},emitAsync:async n=>{let s=Fr(n);return dm({instanceId:t,prop:s})},setProxiReadOnlyProp:n=>{_m({instanceId:t,values:n})},getValidation:()=>hm({instanceId:t}),debug:()=>{bm({instanceId:t})},debugStore:()=>{fm({instanceId:t})},debugValidate:()=>{gm({instanceId:t})},destroy:()=>{Sm(t)}}};var Te=Ti({usePassive:()=>({value:!1,type:Boolean}),currentFrame:()=>({value:0,type:Number}),instantFps:()=>({value:60,type:Number}),requestFrame:()=>({value:()=>{},type:Function}),deferredNextTick:()=>({value:!0,type:Boolean}),throttle:()=>({value:60,type:Number}),spinYMaxValue:()=>({value:2.5,type:Number}),spinXMaxValue:()=>({value:2.5,type:Number})});var il=!1,ms=new Map;function xm(){if(ms.size===0){globalThis.removeEventListener("DOMContentLoaded",xm),il=!1;return}for(let e of ms.values())e();ms.clear()}function eE(){il||(il=!0,globalThis.addEventListener("DOMContentLoaded",xm,{passive:!1}))}var tE=e=>{let t=Ie();return ms.set(t,e),typeof globalThis<"u"&&eE(),()=>ms.delete(t)},Cm=tE;function Si(e){let t=0,r=0,o=0,n=0;return"detail"in e&&(r=e.detail),"wheelDelta"in e&&(r=-e.wheelDelta/120),"wheelDeltaY"in e&&(r=-e.wheelDeltaY/120),"wheelDeltaX"in e&&(t=-e.wheelDeltaX/120),"axis"in e&&e.axis===e.HORIZONTAL_AXIS&&(t=r,r=0),o=t*10,n=r*10,"deltaY"in e&&(n=e.deltaY),"deltaX"in e&&(o=e.deltaX),(o||n)&&e.deltaMode&&(e.deltaMode==1?(o*=40,n*=40):(o*=800,n*=800)),o&&!t&&(t=o<1?-1:1),n&&!r&&(r=n<1?-1:1),{spinX:t,spinY:r,pixelX:o,pixelY:n}}function rE({type:e,event:t}){let r=t;return e==="touchend"&&"changedTouches"in t?r.changedTouches[0]:"touches"in r?r.touches[0]:t}function oE({type:e,event:t}){let r=t;return e==="touchend"&&"changedTouches"in t?r.changedTouches[0]:"touches"in r?r.touches[0]:t}function Vr(e){let t=!1,r=new Map,{usePassive:o}=Te.get();Te.watch("usePassive",()=>{globalThis.removeEventListener(e,n),t=!1,s()});function n(a){if(r.size===0){globalThis.removeEventListener(e,n),t=!1;return}let c=a.type,{pageX:l,pageY:p}=rE({type:c,event:a}),{clientX:d,clientY:f}=oE({type:c,event:a}),h=a.target,v={page:{x:l,y:p},client:{x:d,y:f},target:h,type:c,preventDefault:()=>o?()=>{}:a.preventDefault()};if(c==="wheel"){let b=Te.getProp("spinYMaxValue"),T=Te.getProp("spinXMaxValue"),{spinX:_,spinY:S,pixelX:C,pixelY:E}=Si(a);Object.assign(v,{spinX:Jc(_,-T,T),spinY:Jc(S,-b,b),pixelX:C,pixelY:E})}for(let b of r.values())b(v)}function s(){t||(t=!0,o=Te.getProp("usePassive"),globalThis.addEventListener(e,n,{passive:o}))}return a=>{let c=Ie();return r.set(c,a),typeof globalThis<"u"&&s(),()=>r.delete(c)}}var Em=Vr("click"),wm=Vr("mousedown"),Im=Vr("touchstart"),Mm=Vr("mousemove"),Rm=Vr("touchmove"),km=Vr("mouseup"),Nm=Vr("touchend"),Pm=Vr("wheel");var Co=0,Xe=new Map,nE=(e={},t=()=>{})=>{let r=Ie();return Xe.set(r,{el:e,fn:t,data:new Map,freeze:{active:!1,atFrame:0}}),{id:r,unsubscribe:()=>{if(Xe.has(r)){let o=Xe.get(r);if(!o)return;let n=o.data.size;if(Xe.delete(r),!n)return;Co=Co-n}}}},sE=({id:e,callBackObject:t,frame:r})=>{if(!Xe.has(e))return;let{currentFrame:o}=Te.get(),n=Xe.get(e);if(!n?.data)return;let{data:s}=n;s.has(r+o)||(s.set(r+o,t),Co++)},iE=e=>{Xe.has(e)&&Xe.delete(e)},aE=e=>{let t=Xe.get(e);if(!t||t.freeze.active)return;let{currentFrame:r}=Te.get();t.freeze={active:!0,atFrame:r}},cE=({id:e,update:t=!0})=>{let r=Xe.get(e);if(!r||!r.freeze.active)return;if(!t){r.freeze={active:!1,atFrame:0};return}let{currentFrame:o}=Te.get(),{atFrame:n}=r.freeze,s=[];for(let[i,a]of r.data){let c=i+o-n;r.data.delete(i),s.push({frame:c,value:a})}s.forEach(({frame:i,value:a})=>{r.data.set(i,a)}),s.length=0,r.freeze={active:!1,atFrame:0}},lE=e=>{let t=Xe.get(e);if(!t)return;let r=t.data.size;Co=Co-r,t.data.clear()},uE=e=>Xe.get(e)??{},pE=e=>{for(let t of Xe.values()){let{data:r,fn:o,el:n,freeze:s}=t,i=r.get(e);i&&!s.active&&(o(i,n),r.delete(e),Co--)}},mE=({id:e,obj:t={}})=>{if(!Xe.has(e))return;let r=Xe.get(e);if(!r)return;let{el:o,fn:n,freeze:s}=r;s.active||n(t,o)},dE=()=>Co,hE=e=>{for(let[t,r]of Xe){let{data:o,fn:n,el:s,freeze:i}=r,a=new Map;for(let[c,l]of o)a.set(c-e,l),o.delete(c);Xe.set(t,{data:a,fn:n,el:s,freeze:i})}},Zo={add:nE,get:uE,update:sE,remove:iE,clean:lE,fire:pE,fireObject:mE,getCacheCounter:dE,updateFrameId:hE,freeze:aE,unFreeze:cE};var al=!1,_i=new Map;function Am(){if(_i.size===0){globalThis.removeEventListener("visibilitychange",Am),al=!1;return}let e={visibilityState:document.visibilityState};for(let t of _i.values())t(e)}function fE(){al||(al=!0,globalThis.addEventListener("visibilitychange",Am,{passive:!1}))}var gE=e=>{let t=Ie();return _i.set(t,e),typeof globalThis<"u"&&fE(),()=>_i.delete(t)},xi=gE;var ds=[],bE=(e=()=>{},t=100)=>{ds.push({cb:e,priority:t})},yE=({time:e,fps:t})=>{ds.length!==0&&(ds.sort((r,o)=>r.priority-o.priority),ds.forEach(({cb:r})=>r({time:e,fps:t})),ds.length=0)},wt={add:bE,fire:yE};var cl=[],vE=e=>{cl.push(e)},TE=()=>{let e=[...cl];return cl.length=0,e},en={add:vE,get:TE};var Wr=new Map,SE=e=>{let t=[...Wr.entries()];Wr.clear(),t.forEach(([r,o])=>{Wr.set(r-e,o)})},_E=({currentFrame:e,time:t,fps:r})=>{let o=Wr.get(e)??[];!o||o.length===0||(o.forEach(n=>n({time:t,fps:r})),Wr.delete(e))},xE=(e,t)=>{let r=t+Te.getProp("currentFrame"),o=Wr.get(r)??[];Wr.set(r,[...o,e]),Te.emit("requestFrame")},CE=()=>Wr.size,tn={add:xE,fire:_E,updateKeys:SE,getAmountOfFrameToFire:CE};var ll="animationStop",Om=()=>{globalThis.addEventListener("unhandledrejection",e=>{e.reason===ll&&e.preventDefault()})};var $m=!1,Ci=({force:e=!1,duration:t=30}={})=>{if($m&&!e){let{instantFps:r}=Te.get();return new Promise(o=>{o({averageFPS:r})})}return new Promise(r=>{let o=[],s=0,i=0,a=0,c=0,l=0,p=d=>{if(d*=.001,c===0){c=d,requestAnimationFrame(p);return}let f=d-c;c=d;let h=Number.isFinite(1/f)?1/f:60,v=Math.max(h,60);a+=v-(o[s]||0),o[s++]=v,i=Math.max(i,s),s%=25;let b=Math.round(a/i);if(l++,l>=t){Te.quickSetProp("instantFps",b),$m=!0,r({averageFPS:b});return}requestAnimationFrame(p)};requestAnimationFrame(p)})};Ci();var ul=1e7,Bm=2e3,hl=!1,jr=[],Ke=Yt(),Lm=0,pl=0,ml=0,fl=0,dl=0,rn=!1,lt=60,Ri=lt,Ei=0,wi=0,Sr=0,Ii=!1,Mi=!1,EE=()=>lt<Ri/5*3,wE=()=>lt<Ri/5*4,IE=()=>{!EE()||Ii||(Ii=!0,setTimeout(()=>{Ii=!1},4e3))},ME=()=>{!wE()||Mi||(Mi=!0,setTimeout(()=>{Mi=!1},4e3))};xi(({visibilityState:e})=>{rn=e==="visible"});Om();Te.watch("requestFrame",()=>{ki()});var Dm=()=>{Sr===ul&&(Sr=0,Te.quickSetProp("currentFrame",Sr),tn.updateKeys(ul),Zo.updateFrameId(ul)),wt.fire({time:Ke,fps:lt}),jr=[...jr,...en.get()],hl=!1,jr.length>0||tn.getAmountOfFrameToFire()>0||Zo.getCacheCounter()>0||Ke<Bm?ki():(rn=!0,Sr=0,fl=Ke,Te.quickSetProp("currentFrame",Sr))},Fm=e=>{Ke=e,ml=Ke-pl,rn&&(Lm+=ml),pl+=ml,Ke=Math.round(pl-Lm);let t=Math.round(1e3/lt);dl=Math.abs(Ke-fl-t);let r=dl>100?dl:0;Ke=Ke-r,fl=Ke,rn?(wi=Ke,Ei=0,lt=Te.getProp("instantFps")):Ei++,Ke>wi+1e3&&!rn&&(lt=Ke>Bm?Math.round(Ei*1e3/(Ke-wi)):Te.getProp("instantFps"),wi=Ke,Ei=0,lt=lt<30?Te.getProp("instantFps"):lt),lt>Ri&&(Ri=lt),IE(),ME(),jr.forEach(n=>n({time:Ke,fps:lt})),tn.fire({currentFrame:Sr,time:Ke,fps:lt}),Zo.fire(Sr),Sr++,Te.quickSetProp("currentFrame",Sr),jr.length=0,rn=!1,Te.getProp("deferredNextTick")?Dt(()=>Dm()):Dm()},ki=()=>{hl||(typeof globalThis>"u"?setTimeout(()=>Fm(Yt()),_p):requestAnimationFrame(Fm),hl=!0)},Ft={add:s=>{jr.push(s),ki()},addMultiple:(s=[])=>{jr=[...jr,...s],ki()},getFps:()=>lt,mustMakeSomething:()=>Ii,shouldMakeSomething:()=>Mi};var gl=!1,Ni=new Map,bl=()=>{},Vm=window.innerHeight,Wm=window.innerWidth;function RE(){if(Ni.size===0){window.removeEventListener("resize",bl),gl=!1;return}let e=window.innerHeight,t=window.innerWidth,r=e!==Vm,o=t!==Wm;Vm=e,Wm=t;let n={scrollY:window.scrollY,windowsHeight:e,windowsWidth:t,documentHeight:document.documentElement.scrollHeight,verticalResize:r,horizontalResize:o};for(let s of Ni.values())s(n)}function kE(){gl||(gl=!0,bl=So(()=>RE()),window.addEventListener("resize",bl,{passive:!1}))}var NE=e=>{let t=Ie();return Ni.set(t,e),typeof globalThis<"u"&&kE(),()=>Ni.delete(t)},jm=NE;var yl=!1,Pi=new Map,PE="UP",Um="DOWN",zm=window.scrollY,hs=window.scrollY,vl=Um,Hm={scrollY:hs,direction:vl};function Gm(){if(Pi.size===0){window.removeEventListener("scroll",Gm),yl=!1;return}zm=hs,hs=window.scrollY,vl=hs>zm?Um:PE,Hm={scrollY:hs,direction:vl};for(let e of Pi.values())e(Hm)}function AE(){yl||(yl=!0,window.addEventListener("scroll",Gm,{passive:!0}))}var OE=e=>{let t=Ie();return Pi.set(t,e),typeof globalThis<"u"&&AE(),()=>Pi.delete(t)},_r=OE;var Tl=!1,Ai=new Map,qm=()=>{};function $E(e){if(Ai.size===0){qm(),Tl=!1;return}Ft.add(()=>{wt.add(()=>{for(let t of Ai.values())t(e)},0)})}function LE(){Tl||(Tl=!0,qm=_r($E))}var DE=e=>{let t=Ie();return Ai.set(t,e),typeof globalThis<"u"&&LE(),()=>Ai.delete(t)},Jm=DE;var Sl=!1,Oi=new Map,Ym,Xm=()=>{};function FE(e){if(Oi.size===0){Xm(),Sl=!1;return}Ft.add(()=>{wt.add(()=>{for(let t of Oi.values())t(e)},0)})}function BE(){Sl||(Sl=!0,Ym=pi(e=>FE(e),Te.getProp("throttle")),Xm=_r(Ym))}var VE=e=>{let t=Ie();return Oi.set(t,e),typeof globalThis<"u"&&BE(),()=>Oi.delete(t)},Km=VE;var Qm=()=>{},Zm=()=>{},ed=()=>{};function td(e){let t=!1,r=new Map,o=!1;function n(){if(o=!1,r.size===0){Zm(),e==="START"&&Qm(),t=!1;return}Ft.add(()=>{wt.add(()=>{let a={scrollY:window.scrollY};if(e==="END")for(let c of r.values())c(a)},0)})}function s(){t||(t=!0,ed=So(()=>n()),Zm=_r(ed),e==="START"&&(Qm=_r(({scrollY:a})=>{let c={scrollY:a};if(!o){o=!0;for(let l of r.values())l(c)}})))}return a=>{let c=Ie();return r.set(c,a),typeof globalThis<"u"&&s(),()=>r.delete(c)}}var rd=td("START"),od=td("END");function on(e){let t=!1,r=new Map;function o(i){if(r.size===0){globalThis.removeEventListener(e,o),t=!1;return}for(let a of r.values())a(i)}function n(){t||(t=!0,globalThis.addEventListener(e,o))}return i=>{let a=Ie();return r.set(a,i),typeof globalThis<"u"&&n(),()=>r.delete(a)}}var nd=on("pointerover"),sd=on("pointerdown"),id=on("pointermove"),ad=on("pointerup"),cd=on("pointerout"),ld=on("pointerleave");var Be=Symbol("LinkedList.setNext"),Ve=Symbol("LinkedList.setPrev"),$i="after",_l="before",nn=class{#n=null;#t=null;constructor(t){this.data=t}get next(){return this.#n}[Be](t){this.#n=t}get prev(){return this.#t}[Ve](t){this.#t=t}dispose(){this.data=null,this.#n=null,this.#t=null}},sn=class e{#n=null;#t=null;#i=0;#l=new WeakSet;addLast(t){let r=new nn(t);return this.#l.add(r),this.#n?(this.#t&&this.#t[Be](r),r[Ve](this.#t),this.#t=r,this.#i++,this):(this.#n=r,this.#t=r,this.#i++,this)}addFirst(t){let r=new nn(t);return this.#l.add(r),this.#n?(r[Be](this.#n),this.#n[Ve](r),this.#n=r,this.#i++,this):(this.#n=r,this.#t=r,this.#i++,this)}removeNode(t){return!t||!this.#l.has(t)?this:t===this.#n?this.removeFirst():t===this.#t?this.removeLast():(t.prev&&t.prev[Be](t.next),t.next&&t.next[Ve](t.prev),t.dispose(),this.#i--,this)}removeFirst(){if(this.#n===null)return this;let t=this.#n;return this.#n=this.#n.next,this.#n&&this.#n[Ve](null),this.#n===null&&(this.#t=null),t.dispose(),this.#i--,this}removeLast(){if(this.#t===null)return this;let t=this.#t;return this.#t=this.#t.prev,this.#t&&this.#t[Be](null),this.#t===null&&(this.#n=null),t.dispose(),this.#i--,this}insertAfter(t,r){if(!t||!this.#l.has(t))return this;let o=new nn(r);return this.#l.add(o),o[Ve](t),o[Be](t.next),t.next&&t.next[Ve](o),t[Be](o),t===this.#t&&(this.#t=o),this.#i++,this}insertBefore(t,r){if(!t||!this.#l.has(t))return this;let o=new nn(r);return this.#l.add(o),o[Be](t),o[Ve](t.prev),t.prev&&t.prev[Be](o),t[Ve](o),t===this.#n&&(this.#n=o),this.#i++,this}move(t,r,o=$i){return!this.#l.has(t)||!this.#l.has(r)?this:t===r?this:o===$i&&r.next===t?this:o===_l&&r.prev===t?this:(t.prev&&t.prev[Be](t.next),t.next&&t.next[Ve](t.prev),t===this.#n&&(this.#n=t.next),t===this.#t&&(this.#t=t.prev),o==$i&&(t[Ve](r),t[Be](r.next),r.next&&r.next[Ve](t),r[Be](t),r===this.#t&&(this.#t=t)),o==_l&&(t[Ve](r.prev),t[Be](r),r.prev&&r.prev[Be](t),r[Ve](t),r===this.#n&&(this.#n=t)),this)}moveAfter(t,r){return this.move(t,r,$i)}moveBefore(t,r){return this.move(t,r,_l)}swap(t,r){if(!this.#l.has(t)||!this.#l.has(r))return this;if(t===r)return this;if(t.next===r)return this.moveAfter(t,r);if(r.next===t)return this.moveAfter(r,t);let o=t.prev,n=t.next,s=r.prev,i=r.next,a=t===this.#n,c=t===this.#t,l=r===this.#n,p=r===this.#t;return o&&o[Be](n),n&&n[Ve](o),s&&s[Be](i),i&&i[Ve](s),t[Ve](s),t[Be](i),r[Ve](o),r[Be](n),s&&s[Be](t),i&&i[Ve](t),o&&o[Be](r),n&&n[Ve](r),a?this.#n=r:l&&(this.#n=t),c?this.#t=r:p&&(this.#t=t),this}find(t){let r=this.#n,o;for(;r!==null;){if(t(r)){o=r;break}r=r.next}return o}filter(t){let r=this.#n,o=new e,n=0;for(;r!==null;)t(r,n)&&o.addLast(r.data),r=r.next,n++;return o}map(t){let r=this.#n,o=new e,n=0;for(;r!==null;)o.addLast(t(r,n)),r=r.next,n++;return o}*[Symbol.iterator](){let t=this.#n;for(;t;)yield t,t=t.next}traverse(t){let r=this.#n;for(;r!==null;)t(r),r=r.next;return this}async traverseAsync(t){let r=this.#n;for(;r!==null;)await t(r),r=r.next;return this}traverseReverse(t){let r=this.#t;for(;r!==null;)t(r),r=r.prev;return this}async traverseReverseAsync(t){let r=this.#t;for(;r!==null;)await t(r),r=r.prev;return this}execute(t){return t(this),this}async executeAsync(t){return await t(this),this}print(){let t=this.#n,r=[];for(;t!==null;)r.push(t.data),t=t.next;return console.log(r),this}clear(){let t=this.#n,r=[];for(;t!==null;)r.push(t),t=t.next;for(let o of r)o.dispose();return this.#n=null,this.#t=null,this.#i=0,r.length=0,this}reverse(){let t=this.#n;for(this.#n=this.#t,this.#t=t;t!==null;){let r=t.next,o=t.prev;t[Be](o),t[Ve](r),t=r}return this}toArray(){let t=[],r=this.#n;for(;r!==null;)t.push(r.data),r=r.next;return t}toArrayReverse(){let t=[],r=this.#t;for(;r!==null;)t.push(r.data),r=r.prev;return t}get first(){return this.#n}get last(){return this.#t}get size(){return this.#i}};function WE(e){return Ti(e)}function jE(){return Te.getProp("instantFps")}function zE(){return Ft.getFps()}function HE(){return Ft.mustMakeSomething()}function UE(){return Ft.shouldMakeSomething()}function GE(e=()=>{}){return Ft.add(e)}function qE(e=()=>{}){return wt.add(e)}function JE(e=()=>{}){return en.add(e)}function YE(e=()=>{},t=0){return tn.add(e,t)}async function XE({force:e=!1,duration:t=30}={}){return await Ci({force:e,duration:t})}function KE(e=()=>{}){return Cm(e)}var QE=Zo;function ZE(e=()=>{}){return jm(e)}function ew(e=()=>{}){return xi(e)}function tw(e=()=>{}){return Em(e)}function rw(e=()=>{}){return wm(e)}function ow(e=()=>{}){return Im(e)}function nw(e=()=>{}){return Mm(e)}function sw(e=()=>{}){return Rm(e)}function iw(e=()=>{}){return km(e)}function aw(e=()=>{}){return Nm(e)}function cw(e=()=>{}){return Pm(e)}function lw(e=()=>{}){return Jm(e)}function uw(e=()=>{}){return _r(e)}function pw(e=()=>{}){return Km(e)}function mw(e=()=>{}){return rd(e)}function dw(e=()=>{}){return od(e)}function hw(e=()=>{}){return nd(e)}function fw(e=()=>{}){return sd(e)}function gw(e=()=>{}){return id(e)}function bw(e=()=>{}){return ad(e)}function yw(e=()=>{}){return cd(e)}function vw(e=()=>{}){return ld(e)}var Tw=Te;function Sw(){return new sn}var m={};To(m,{afterRouteChange:()=>hd,beforeRouteChange:()=>dd,componentMap:()=>j,createComponent:()=>Qh,eventDelegationMap:()=>Ao,getActiveParams:()=>bd,getActiveRoute:()=>gd,getChildrenIdByName:()=>zi,getComponentNameById:()=>Vd,getDebugMode:()=>Kh,getIdByInstanceName:()=>rr,getNumberOfActiveInvalidate:()=>Zg,getNumberOfActiveRepeater:()=>eb,getParentIdById:()=>ys,getPropsFromParent:()=>ya,getRoot:()=>pa,getStateById:()=>nr,getStateByName:()=>ph,getTree:()=>Hd,inizializeApp:()=>Qg,loadUrl:()=>Kg,mainStore:()=>de,onRouteLoading:()=>fd,removeAndDestroyById:()=>pt,setStateById:()=>Tn,setStateByName:()=>qh,staticProps:()=>va,tempDelegateEventMap:()=>xs,tick:()=>Er,updateStateByName:()=>Yh,useComponent:()=>ta,useMethodArrayByName:()=>qd,useMethodByName:()=>hn,watchById:()=>It});var an="activeRoute",cn="activeParams",Eo="beforeRouteChange",ln="afterRouteChange",Xt="routeIsLoading",ft="parserAsync",zr="default",ud="repeater",pd="invalidate",md="render_component";var de=u.createStore({[an]:()=>({value:{route:"",templateName:""},type:"any",skipEqual:!1}),[cn]:()=>({value:{},type:"any",skipEqual:!1}),[Eo]:()=>({value:{currentRoute:"",currentTemplate:"",nextRoute:"",nextTemplate:""},type:"any",skipEqual:!1}),[ln]:()=>({value:{currentRoute:"",currentTemplate:"",previousRoute:"",previousTemplate:""},type:"any",skipEqual:!1}),[Xt]:()=>({value:!1,type:Boolean}),[ft]:{element:()=>({value:document.createElement("div"),type:HTMLElement,skipEqual:!1}),parentId:()=>({value:"",type:String,skipEqual:!1}),persistent:()=>({value:!1,type:Boolean,skipEqual:!1}),source:()=>({value:zr,type:String,skipEqual:!1})}}),un=()=>{de.set(ft,{element:document.createElement("div"),parentId:"",persistent:!1,source:zr},{emit:!1})};var dd=e=>de.watch(Eo,({currentRoute:t,currentTemplate:r,nextRoute:o,nextTemplate:n})=>{e({currentRoute:t,currentTemplate:r,nextRoute:o,nextTemplate:n})}),hd=e=>de.watch(ln,({currentRoute:t,currentTemplate:r,previousRoute:o,previousTemplate:n})=>{e({currentRoute:t,currentTemplate:r,previousRoute:o,previousTemplate:n})}),fd=e=>de.watch(Xt,t=>{e(t)}),gd=()=>{let{activeRoute:e}=de.get();return e},bd=()=>{let{activeParams:e}=de.get();return e};var j=new Map;var Y=new Map;var yd=({componentId:e,repeatId:t})=>{let r=Y.get(t);if(!r)return;let{componentChildren:o}=r;Y.set(t,{...r,componentChildren:[...o,e]})},vd=({componentId:e,repeatId:t})=>{let r=Y.get(t);if(!r)return;let{componentChildren:o}=r;Y.set(t,{...r,componentChildren:o.filter(n=>n!==e)})},xl=({repeatId:e})=>{let t=Y.get(e);if(!t)return[];let{componentChildren:r}=t;return r},Td=({repeatId:e})=>{let t=Y.get(e);if(!t)return!1;let{componentChildren:r}=t;return r.length>0};var Sd=new WeakMap,_d=({element:e,id:t})=>{Sd.set(e,t)},pn=({element:e})=>Sd.get(e);var xd=({id:e="",newElement:t=document.createElement("div")})=>{if(!e||e==="")return;let r=j.get(e);r&&(j.set(e,{...r,element:t}),_d({element:t,id:e}))},fs=({id:e=""})=>!e||e===""?void 0:j.get(e)?.element,Cd=({element:e})=>e?pn({element:e}):"",Cl=({keyValue:e="",repeatId:t=""})=>e?.length===0?[]:xl({repeatId:t}).map(n=>j.get(n)).filter(n=>n!==void 0).filter(n=>`${n.key}`==`${e}`).map(({element:n,id:s})=>({element:n,id:s})),El=({id:e,repeatId:t})=>!e||e===""?[]:xl({repeatId:t}).map(o=>j.get(o)).filter(o=>o!==void 0).map(o=>o.id);var Ed="data-mobjs",wo="componentid",Li="bindtextid",Di="bindobjectid";var mn="staticprops",Fi="bindprops",wd="name",Id="name",Md="slot",Bt="repeaterchild";var Kt="currentRepeaterValue",Qt="repeatPropBind",Bi="bindevents",Zt="weakbindevents",dn="bindeffect",Rd="parentid";var er="bindrefid",xr="bindrefname",Vi="invalidateid",Wi="mobjsrepeat";var tr={current:{},index:-1},kd="QUEQUE_BINDPROPS",wl="QUEQUE_REPEATER",Il="QUEQUE_INVALIDATE";var Hr=new Map;var gs=({id:e})=>{if(!Y.has(e))return;if(Hr.has(e)){let r=Hr.get(e);r?.removeCustomComponent(),r?.remove(),Hr.delete(e)}return Y.get(e)?.element};var ji=({id:e="",value:t})=>{if(!e||e==="")return;let r=j.get(e);r&&j.set(e,{...r,currentRepeaterState:t})},Nd=({rootNode:e,currentNode:t})=>{if(!(!t||!e.contains(t)))return t.parentElement===e?t:Nd({rootNode:e,currentNode:t.parentElement})},_w=({rootNode:e,node:t})=>{if(e)return Nd({rootNode:e,currentNode:t.parentElement})},Vt=({id:e=""})=>{if(!e||e==="")return tr;let r=j.get(e)?.currentRepeaterState;return r||tr};var Pd=({id:e="",repeatId:t="",element:r})=>{if(!e||e==="")return;let o=j.get(e);if(!o)return;let n=gs({id:t}),s=_w({rootNode:n,node:r});j.set(e,{...o,repeaterInnerWrap:s})},bs=({id:e})=>!e||e===""?void 0:j.get(e)?.repeaterInnerWrap;var zi=({id:e="",componentName:t=""})=>{if(!e||e==="")return[];let o=j.get(e)?.child;return o?o?.[t]??[]:(console.warn("getChildIdById failed no id found"),[])};var Ad=({children:e,key:t,current:r,currentUnivoque:o,useIndex:n=!1})=>{let s=n?r:o,i=e.map(l=>{let{index:p,current:d}=Vt({id:l?.[0]});return{index:p,key:d?.[t],items:l}});return s.map((l,p)=>({index:p,key:l?.[t]})).map(l=>{let p=n?"index":"key";return i.find(d=>d[p]===l[p])}).filter(l=>l!==void 0).map(({items:l})=>l)};var Od="",$d,Ld=({contentId:e=""})=>{Od=e};var Dd=()=>{$d=document?.querySelector(Od)},Hi=()=>$d;var Ur=new Map,Fd=({instanceName:e,id:t})=>{let r=Ur.get(e)??[];Ur.set(e,[...r,t])},Bd=({instanceName:e,id:t})=>{let r=Ur.get(e);if(!r)return;let o=r.filter(n=>n!==t);o.length===0&&Ur.delete(e),o.length>0&&Ur.set(e,o)},Ml=({instanceName:e})=>Ur.get(e)??[];var Vd=(e="")=>{if(!e||e==="")return;let r=j.get(e)?.componentName;return r||(console.warn("getComponentNameById failed no id found"),null)},Wd=e=>{if(!e)return"name-not-found";let t=pn({element:e})??"",r=j.get(t);return r?r.componentName:"name-not-found"},rr=(e="")=>e?Ml({instanceName:e})?.[0]:void 0,jd=(e="")=>e?Ml({instanceName:e})??[]:[];var Ui=(e="")=>{if(!e||e==="")return!1;let r=j.get(e)?.element;return r?!Hi()?.contains(r):!1};var zd=({chunk:e})=>e.reduce((t,r)=>{let[o,n]=r,{child:s,componentName:i,instanceName:a}=n,c=new Set(Object.values(s??{}).flat()),l=[];for(let p of j.entries()){let[d]=p;c.has(d)&&l.push(p)}return[...t,{id:o,componentName:i,instanceName:a,children:zd({chunk:l})}]},[]),Hd=()=>{let e=[...j.entries()].filter(([,t])=>!t?.parentId||t?.parentId==="");return zd({chunk:e})};var Ud=({id:e,name:t,fn:r})=>{if(!e||e==="")return;let o=j.get(e),n=o?.methods;if(n){if(t in n){console.warn(`Method ${t}, is already used by ${e}`);return}j.set(e,{...o,methods:{...n,[t]:r}})}},Gd=({id:e})=>{if(!e||e==="")return{};let r=j.get(e)?.methods;return r?Object.keys(r).length===0?(console.warn(`no methods available for ${e} component`),{}):r:{}},hn=e=>{let t=rr(e);if(!t||t==="")return;let r=Gd({id:t});if(Object.keys(r).length===0){console.warn(`no methods available for ${e} component`);return}return r},qd=e=>jd(e).map(r=>Gd({id:r})).filter(r=>Object.keys(r).length>0);function*or(e){if(e){yield e;for(let t of e.children)yield*or(t)}}function xw(e,t){let r=[];for(let o of or(e)){if(r.length>0&&t)break;o?.getIsPlaceholder?.()&&r.push(o)}return r}var Gr=(e,t=!0)=>{let r=[],o=e||document.body;for(let n of o.children)r=[...r,...xw(n,t)];return r};var Io=new Set,Jd=!1,Yd=e=>{Io.add(e)},Xd=e=>{Io.delete(e)},Kd=e=>{let t;for(let r of Io)if(e?.contains(r)&&r.getIsPlaceholder()){t=r;break}return t?(Io.delete(t),[t]):[]},Qd=({element:e})=>[...Io].filter(t=>e.contains(t)&&e!==t&&t.getIsPlaceholder?.())??[],Zd=({element:e})=>[...Io].filter(t=>e.contains(t)&&e!==t&&t.getIsPlaceholder?.()&&t?.getSlotPosition?.())??[],eh=()=>Io.size;var ut=e=>{Jd=e},Wt=()=>Jd;var th=({currentChild:e,id:t="",componentName:r=""})=>{let o=e?.[r]??[];return e[r]=[...o,t],e},rh=({currentChild:e,id:t="",componentName:r=""})=>{let o=e?.[r]??[];return e[r]=o.filter(n=>t!==n),e},oh=({props:e,store:t})=>{Object.entries(e).forEach(([r,o])=>{t.set(r,o)})},Gi=({prop:e,componentName:t,action:r})=>{console.warn(`Props: ${e}, component: ${t}, action: ${r}: Props can only be modified from outside the component."`)};var ys=(e="")=>{if(!e||e==="")return;let r=j.get(e)?.parentId;if(r)return r},nh=({id:e=""})=>{if(!e||e==="")return;let t=j.get(e),r=t?.parentId,o=t?.componentName??"";if(!r)return;let n=j.get(r);if(!n)return;let{child:s}=n;s&&j.set(r,{...n,child:{...s,...th({currentChild:s,id:e,componentName:o})}})},sh=({element:e,id:t})=>{if(!e)return;if(!0){Gr(e,!1).forEach(n=>{n.setParentId(t)});return}Qd({element:e}).forEach(o=>{o.setParentId(t)})},fn=({element:e})=>{if(!e)return;let t=e.parentNode,r;for(;t&&!r;)r=pn({element:t}),r||(t=t.parentNode);return r??""},Rl=({moduleScopeId:e,targetComponentId:t})=>{if(e===t)return!0;let r=j.get(e);if(!r)return!1;let o=r?.parentId??"";return Rl({moduleScopeId:o,targetComponentId:t})};var _t=new Map,vs=new Map;var ih=({componentId:e})=>{if(e)for(let[t,r]of _t){let{componentId:o}=r;o===e&&_t.delete(t)}};var Qe=new Map;var be=new Map;var ah=({id:e})=>{if(Qe.has(e)){let t=Qe.get(e);if(!t)return;t.forEach(({invalidateId:r})=>{be.has(r)&&be.delete(r)}),Qe.delete(e)}};var Ze=new Map;var ch=({id:e})=>{if(Ze.has(e)){let t=Ze.get(e);if(!t)return;t.forEach(({repeatId:r})=>{Y.has(r)&&Y.delete(r)}),Ze.delete(e)}};var lh=({id:e,parentId:t,componentName:r})=>{if(!e)return;let o=j.get(t??"");if(!o)return;let{child:n}=o;!t||!n||j.set(t,{...o,child:{...n,...rh({currentChild:n,id:e,componentName:r})}})};var gn=new Set;var uh=e=>{gn.delete(e)};var pt=({id:e=""})=>{if(!e||e==="")return;let t=j.get(e);if(!t)return;let{parentId:r,componentName:o,child:n,element:s,state:i,destroy:a,parentPropsWatcher:c,componentRepeatId:l,instanceName:p,persistent:d}=t;Object.values(n??{}).flat().forEach(f=>{pt({id:f})}),lh({id:e,parentId:r,componentName:o}),a?.(),i.destroy(),c&&c.forEach(f=>f()),ah({id:e}),ch({id:e}),l&&l.length>0&&vd({componentId:e,repeatId:l}),p&&p.length>0&&Bd({instanceName:p,id:e}),d||uh(e),ih({componentId:e}),s?.removeCustomComponent?.(),s?.remove(),t.methods=null,t.refs=null,t.repeaterInnerWrap=null,t.element=null,t.currentRepeaterState=null,t.state=null,j.delete(e)};var nr=(e="")=>!e||e===""?void 0:j.get(e)?.state?.get();var ph=(e="")=>{let t=rr(e);return t||console.warn(`component ${e}, not found`),nr(t)};var bn=({id:e="",prop:t})=>{if(!e||e==="")return;let r=j.get(e);if(!r)return;let{freezedPros:o}=r;o&&j.set(e,{...r,freezedPros:[...new Set([...o,t])]})},qr=({id:e="",prop:t})=>{if(!e||e==="")return;let r=j.get(e);if(!r)return;let{freezedPros:o}=r;o&&j.set(e,{...r,freezedPros:o.filter(n=>n!==t)})},Mo=({id:e="",prop:t})=>{if(!e||e==="")return!1;let o=j.get(e)?.freezedPros;return o?o.includes(t):!1};var mh=({repeatId:e,host:t})=>{let r=Y.get(e);if(!r)return;let o=t.parentNode;r.initialRenderWithoutSync.forEach(n=>{o.append(n)}),Y.set(e,{...r,element:o,initialRenderWithoutSync:[]}),Hr.set(e,t)};var dh=()=>{customElements.define("mobjs-repeat",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){if(Wt())return;let{dataset:t}=this.shadowRoot?.host??{};if(t){let r=this.shadowRoot?.host,o=r?.getAttribute(Wi)??"";mh({repeatId:o,host:r})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var Jr=new Map;var hh=({invalidateId:e,host:t})=>{let r=be.get(e);if(!r)return;let o=t.parentNode;be.set(e,{...r,element:o}),Jr.set(e,t)};var fh=()=>{customElements.define("mobjs-invalidate",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:e}=this.shadowRoot?.host??{};if(e){let t=this.shadowRoot?.host,r=t.getAttribute(Vi)??"";hh({invalidateId:r,host:t})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var Yr=new Set,gh=e=>{Yr.add(e)},bh=()=>{Yr.clear()},yh=({element:e})=>[...Yr].find(t=>{let r=!t?.getSlotName?.()&&e.contains(t);return r&&Yr.delete(t),r}),vh=({name:e,element:t})=>[...Yr].find(r=>{let o=r?.getSlotName?.()===e&&t.contains(r);return o&&Yr.delete(r),o}),Th=()=>[...Yr],qi=()=>Yr.size;var Sh=()=>{customElements.define("mobjs-slot",class extends HTMLElement{#n;constructor(){super(),this.attachShadow({mode:"open"}),this.#n="",this.isSlot=!0;let{dataset:e}=this.shadowRoot?.host??{};e&&(this.#n=this.shadowRoot?.host.getAttribute(Id))}connectedCallback(){let e=this.shadowRoot?.host;e&&gh(e)}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}getSlotName(){return this.#n}})};var kl=new Set,_h=e=>{kl.add(e)},Ji=()=>[...kl],Yi=e=>kl.delete(e);var xh=e=>{Object.entries(e).forEach(([t,r])=>{let{connectedCallback:o,disconnectedCallback:n,adoptedCallback:s,attributeChangedCallback:i,style:a,attributeToObserve:c}=r.componentParams;customElements.define(t,class extends HTMLElement{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#_;static get observedAttributes(){return c}constructor(){super(),this.attachShadow({mode:"open"}),this.active=!1,this.#t=u.getUnivoqueId(),this.#i={},this.#n=t,this.#l=!0,this.isUserComponent=!0,this.#r="",this.#e="";let l=this.shadowRoot?.host;if(!l)return;let p=Wt();if(p&&!!1&&_h(l),p||(this.#a&&!this.active&&(this.style.visibility="hidden"),!this.shadowRoot))return;if(a){let f=document.createElement("style");f.textContent=a,this.shadowRoot.append(f)}let d=document.createElement("slot");this.shadowRoot.append(d)}getComponentName(){return this.#n}setId(l){this.#t=l}getId(){return this.#t}getParentId(){return this.#f}setParentId(l){this.#f=l}getIsPlaceholder(){return this.#l}getInstanceName(){return this.#d}getStaticPropsId(){return this.#u}getDynamicPropsid(){return this.#s}getBindEventsId(){return this.#c}getCurrentKey(){return this.#h}setDynamicPropsFromSlotId(l){this.#r=l}getDynamicPropsFromSlotId(){return this.#r}setPropsFromSlotId(l){this.#e=l}getPropsFromSlotId(){return this.#e}setRepeatValue(l){this.#p=l}getRepeatValue(){return this.#p}getSlotPosition(){return this.#a}getDelegateEventId(){return this.#g}getRepeaterPropBind(){return this.#m??void 0}setRepeaterPropBind(l){this.#m=l}getComponentRepeatId(){return this.#o}getBindRefId(){return this.#x}getBindRefName(){return this.#_}resetParams(){this.active=!1,this.#t="",this.#i={}}disablePlaceHolderState(){this.#l=!1}inizializeCustomComponent(l){this.active||(this.active=!0,this.#t=l.id,this.#i=l,this.#l=!1,o?.({context:this,params:this.#i}))}connectedCallback(){if(!Wt()&&this.#l){let p=this.shadowRoot?.host;p&&([this.#d,this.#u,this.#s,this.#h,this.#c,this.#p,this.#a,this.#f,this.#o,this.#g,this.#m,this.#x,this.#_]=[wd,mn,Fi,"key",Bi,Kt,Md,Rd,Bt,Zt,Qt,er,xr].map(d=>p.getAttribute(d)??"")),Yd(p);return}}disconnectedCallback(){if(!this.shadowRoot)return;let l=this.shadowRoot?.host;Xd(l),Yi(l),this.active&&(n?.({context:this,params:this.#i}),this.resetParams())}removeCustomComponent(){!this.shadowRoot||!this.active||this.parentElement?.removeChild(this)}adoptedCallback(){!this.shadowRoot||!this.active||s?.({context:this,params:this.#i})}attributeChangedCallback(l,p,d){!this.shadowRoot||!this.active||i?.({name:l,oldValue:p,newValue:d,context:this,params:this.#i})}})})};var It=(e="",t="",r=()=>{},{wait:o=!1}={})=>(!e||e==="")&&(!t||t==="")?void 0:j.get(e)?.state?.watch(t,r,{wait:o??!1});function Qr(){return new Promise(e=>u.useNextLoop(()=>e()))}var Ro=new Map,Eh=()=>Ro.size===0,Nl=1e3,wh=e=>{if(Ro.size>=Nl)return console.warn(`maximum loop event reached: (${Nl})`),()=>{};let t=u.getUnivoqueId();return Ro.set(t,e),()=>Ro.delete(t)},Ch=()=>Ro.size===0||Ro.size>=Nl,Mt=async({debug:e=!1,previousResolve:t}={})=>{if(await Qr(),e&&Ro.forEach(r=>{console.log(r)}),Ch()&&t){t();return}return new Promise(r=>{if(Ch()){r();return}Mt({debug:e,previousResolve:t??r})})};var ko=new Map,Mh=()=>ko.size===0,Pl=1e3,Rh=e=>{if(ko.size>=Pl)return console.warn(`maximum loop event reached: (${Pl})`),()=>{};let t=u.getUnivoqueId();return ko.set(t,e),()=>ko.delete(t)},Ih=()=>ko.size===0||ko.size>=Pl,Rt=async({debug:e=!1,previousResolve:t}={})=>{if(await Qr(),e&&ko.forEach(r=>{console.log(r)}),Ih()&&t){t();return}return new Promise(r=>{if(Ih()){r();return}Rt({debug:e,previousResolve:t??r})})};var yn=({id:e})=>{let t=Qe.get(e);return t?t.map(r=>r.invalidateId).map(r=>be.get(r)).flatMap(r=>r?.observed).filter(r=>r!==void 0):[]};var vn=({id:e})=>{let t=Ze.get(e);return t?t.map(r=>r.repeatId).map(r=>Y.get(r)).map(r=>r?.observed).filter(r=>r!==void 0):[]};var Ki=new Map,kh=(e,t)=>{Ki.set(e,t)},Qi=new Map,Nh=({host:e,componentId:t,bindTextId:r})=>{Qi.set(e,{componentId:t,bindTextId:r})},Ph=e=>e.match(/(?<=\[).+?(?=])/g),Ah=e=>e.split("[")?.[0],Ew=({previous:e,current:t})=>{let r=Ph(t);return r&&r?.length>0?r.reduce((n,s)=>n?.[s],e[Ah(t)]):e?.[t]},Oh=(e,t,...r)=>{let o=nr(e),n=r.map(s=>s.split(".").reduce((a,c)=>Ew({previous:a,current:c})??a,o));return t.raw.reduce((s,i,a)=>s+i+(n?.[a]??""),"")},$h=()=>{[...Qi].forEach(([e,{bindTextId:t}])=>{let r=e.parentElement;if(!r){Ki.delete(t);return}let o=Ki.get(t);o&&(Ki.delete(t),ww({...o,element:r}),e?.removeCustomComponent?.(),e?.remove(),r=null)}),Qi.clear()},Lh=()=>Qi.size,ww=({id:e,render:t,props:r,element:o})=>{let n=!1,s=new WeakRef(o),i=vn({id:e}),a=yn({id:e}),l=[...new Set([...r,...i,...a])].map(p=>{let f=p.split(".")?.[0],h=Ph(f),b=h&&h?.length>0?Ah(f):f;if(b)return It(e,b,async()=>{await Rt(),await Mt(),!n&&(n=!0,u.useNextLoop(()=>{u.useFrame(()=>{s.deref()&&!s.deref()?.isConnected&&(l.forEach(T=>{T&&T()}),l.length=0),s.deref()&&s.deref()?.isConnected&&(s.deref().textContent="",s.deref().insertAdjacentHTML("afterbegin",t())),n=!1})}))})})};var Dh=()=>{customElements.define("mobjs-bind-text",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:e}=this.shadowRoot?.host??{};if(e){let t=this.shadowRoot?.host??document.createElement("div"),r=t?.getAttribute(wo)??"",o=t?.getAttribute(Li)??"";Nh({host:t,componentId:r,bindTextId:o})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var Zi=new Map,Fh=(e,t)=>{Zi.set(e,t)},Al=new Map,Bh=({host:e,componentId:t,bindObjectId:r})=>{Al.set(e,{componentId:t,bindObjectId:r})},Vh=e=>e.map(t=>"observe"in t?Me.extractkeyFromProp(t.observe):(Me.initializeCurrentDependencies(),"value"in t?t?.value():t(),Me.getFirstCurrentDependencies())),Wh=(e,...t)=>e.raw.reduce((r,o,n)=>t?.[n]&&"value"in t[n]?r+o+(t?.[n]?.value?.()??""):r+o+(t?.[n]?.()??""),""),jh=()=>{[...Al].forEach(([e,{bindObjectId:t}])=>{let r=e.parentElement;if(!r){Zi.delete(t);return}let o=Zi.get(t);o&&(Zi.delete(t),Iw({...o,element:r}),e?.removeCustomComponent?.(),e?.remove(),r=null)}),Al.clear()},Iw=({id:e,keys:t,render:r,element:o})=>{let n=!1,s=new WeakRef(o),i=vn({id:e}),a=yn({id:e}),l=[...new Set([...t,...i,...a])].map(p=>It(e,p,async()=>{await Rt(),await Mt(),!n&&(n=!0,u.useNextLoop(()=>{u.useFrame(()=>{s.deref()&&!s.deref()?.isConnected&&(l.forEach(d=>{d&&d()}),l.length=0),s.deref()&&s.deref()?.isConnected&&(s.deref().textContent="",s.deref().insertAdjacentHTML("afterbegin",r())),n=!1})}))}))};var zh=()=>{customElements.define("mobjs-bind-object",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:e}=this.shadowRoot?.host??{};if(e){let t=this.shadowRoot?.host??document.createElement("div"),r=t?.getAttribute(wo)??"",o=t?.getAttribute(Di)??"";Bh({host:t,componentId:r,bindObjectId:o})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var ea={},No=()=>ea,Hh=new Set,Uh=()=>{ea=[...Hh.values()].reduce((e,t)=>({...e,...t}),{}),console.log(`component loaded:${Object.keys(ea).length}`),xh(ea),Sh(),fh(),dh(),Dh(),zh()},ta=e=>{!e||e?.length===0||e.forEach(t=>{Hh.add(t)})};var ra=({componentName:e,propName:t})=>(No()?.[e]?.componentParams?.exportState??[]).includes(t),Gh=({componentName:e})=>No()?.[e]?.componentParams?.exportState??[];var Tn=(e="",t="",r,{emit:o=!0}={})=>{if((!e||e==="")&&(!t||t==="")&&!r||Mo({id:e,prop:t}))return;let s=j.get(e),i=s?.state,a=s?.componentName??"";if(!ra({componentName:a,propName:t})){console.warn(`setStateById failed ${t} in: ${a} is not exportable, maybe a slot bind state that not exist here?`);return}if(!i){console.warn(`setStateById failed no id found on prop: ${t}`);return}i.set(t,r,{emit:o})};var qh=(e="")=>{let t=rr(e);return t||console.warn(`component ${e}, not found`),(r,o,{emit:n=!0}={})=>Tn(t,r,o,{emit:n})};var Jh=(e="",t="",r,{emit:o=!0,clone:n=!1}={})=>{if((!e||e==="")&&(!t||t==="")&&!r||Mo({id:e,prop:t}))return;let i=j.get(e),a=i?.state,c=i?.componentName??"";if(!ra({componentName:c,propName:t})){console.warn(`updateStateById failed ${t} in: ${c} is not exportable, maybe a slot bind state that not exist here?`);return}if(!a){console.warn(`updateStateById failed no id found on prop: ${t}`);return}a.update(t,r,{emit:o,clone:n})};var Yh=(e="")=>{let t=rr(e);return t||console.warn(`component ${e}, not found`),(r,o,{emit:n=!0,clone:s=!1}={})=>Jh(t,r,o,{emit:n,clone:s})};var Ol={scoped:!1,maxParseIteration:5e3,debug:!1},Xh=e=>{Ol={...Ol,...e}},kt=()=>Ol,Kh=()=>{let{debug:e}=kt();return e},Qh=({tag:e="",component:t=()=>"",props:r={},state:o={},bindStore:n,scoped:s,connectedCallback:i=()=>{},disconnectedCallback:a=()=>{},adoptedCallback:c=()=>{},attributeToObserve:l=[],attributeChangedCallback:p=()=>{},style:d="",child:f=[]})=>(ta(f),{[e]:{componentFunction:t,componentParams:{exportState:Object.keys(r),scoped:s,state:{...r,...o},bindStore:n,connectedCallback:i,disconnectedCallback:a,adoptedCallback:c,attributeToObserve:l,attributeChangedCallback:p,style:d,child:f}}});var Zh=[],ef="",tf="",rf=e=>{Zh=[...e]},Sn=({hash:e=""})=>Zh.find(({hash:t})=>e===t),of=({hash:e=""})=>{ef=e},oa=()=>ef,nf=({hash:e=""})=>{tf=e},sf=()=>tf;function Mw(e){let t=[];for(let r of or(e))r?.isUserComponent&&r?.getSlotPosition?.()&&t.push(r);return t}var af=e=>{let t=[],r=e||document.body;for(let o of r.children)t=[...t,...Mw(o)];return t};function Rw(e){let t=[];for(let r of or(e))r?.isSlot&&r?.getSlotName?.()&&t.push(r);return t}var cf=e=>{let t=[],r=e||document.body;for(let o of r.children)t=[...t,...Rw(o)];return t};function kw(e,t){for(let r of or(e))if(r?.isSlot&&r?.getSlotName?.()===t)return r;return null}var lf=(e,t)=>{let r=e||document.body;for(let o of r.children){let n=kw(o,t);if(n)return n}return null};function Nw(e){for(let t of or(e))if(t?.isSlot&&!t?.getSlotName?.())return t;return null}var uf=e=>{let t=e||document.body;for(let r of t.children){let o=Nw(r);if(o)return o}return null};var Ts=new Map,Po=e=>{let t=u.getUnivoqueId();return Ts.set(t,e),t},pf=(e="")=>{if(!e)return tr;let t=Ts.get(e);return Ts.delete(e),t??tr};var g=(e,...t)=>e.reduce((r,o,n)=>r+o+(t[n]===void 0?"":t[n]),"").replaceAll(/>\s+</g,"><").trim();var na=({components:e,current:t,index:r,observe:o,repeatId:n,key:s})=>{e.forEach(i=>{i.deref()?.hasAttribute(Kt)||i.deref()?.setAttribute(Kt,Po({current:t,index:r})),i.deref()?.hasAttribute("key")||i.deref()?.setAttribute("key",`${s}`),i.deref()?.hasAttribute(Qt)||i.deref()?.setAttribute(Qt,`${o}`),i.deref()?.hasAttribute(Bt)||i.deref()?.setAttribute(Bt,`${n}`)})},sa=({components:e,current:t,index:r,observe:o,repeatId:n,key:s})=>{e.forEach(i=>{if(i.hasAttribute(Bt)){Yi(i);return}i.setAttribute(Kt,Po({current:t,index:r})),i.setAttribute("key",`${s}`),i.setAttribute(Qt,`${o}`),i.setAttribute(Bt,`${n}`)})},Zr=({stringDOM:e,parent:t,position:r})=>{ut(!0);let o=document.createRange().createContextualFragment(e);ut(!1),o&&(r==="afterend"&&t.after(o),r==="beforebegin"&&t.before(o),r==="afterbegin"&&t.prepend(o),r==="beforeend"&&t.append(o))},Ss=({elements:e,parent:t,position:r})=>{let o=new DocumentFragment;ut(!0),e.forEach(n=>{n&&o.append(n)}),ut(!1),r==="afterend"&&t.after(o),r==="beforebegin"&&t.before(o),r==="afterbegin"&&t.prepend(o),r==="beforeend"&&t.append(o)};var Aw=({element:e,content:t})=>{let{debug:r}=kt();if(e.parentNode){let o=document.createElement("template");o.innerHTML=t;let n=o.content.firstElementChild;return n?.disablePlaceHolderState?.(),n&&e.after(n),r&&e.insertAdjacentHTML("afterend",`<!--  ${e.tagName.toLowerCase()} --> `),n}},Ow=({element:e})=>{Th().forEach(r=>{r?.removeCustomComponent(),r?.remove()})},$w=({element:e})=>{if(!!1&&qi()===0)return;let t=af(e);t.length!==0&&[...t].forEach(r=>{let o=r?.getSlotPosition(),n=vh({name:o,element:e});n&&(n.parentNode?.insertBefore(r,n),n?.removeCustomComponent(),n?.remove())})},Lw=({element:e,content:t})=>{let r=Aw({element:e,content:t});if(r){let o=e.getId(),n=e?.getDelegateEventId(),s=e?.getBindRefId(),i=e?.getBindRefName(),a=yh({element:r});a&&(Ss({parent:a,elements:[...e.childNodes],position:"afterend"}),a.remove()),a||Ss({parent:r,elements:[...e.childNodes],position:"afterbegin"}),$w({element:r}),Ow({element:r}),n&&n.length>0&&r.setAttribute(Zt,n),s&&s.length>0&&r.setAttribute(er,s),i&&i.length>0&&r.setAttribute(xr,i);let{debug:c}=kt();c&&r.setAttribute(Ed,o??"")}return e.remove(),r},mf=({element:e,content:t})=>({newElement:Lw({element:e,content:t})});var $l=0,df=()=>{$l+=1},Ll=()=>$l,hf=()=>{$l=0},Dl=({element:e,currentSelectors:t})=>{if(t.length>0){let r=t[0],o=t.slice(1);return{componentToParse:r,parseSourceArray:o}}else{let r=Kd(e),o=r?.[0],n=r.slice(1);return{componentToParse:o,parseSourceArray:n}}};var ff=({cb:e=()=>{},id:t})=>{if(!t)return;let r=j.get(t);r&&j.set(t,{...r,destroy:e})};var _s=new Map,gf=({id:e,cb:t=()=>{}})=>{_s.set(e,t)},Fl=async({id:e,element:t})=>{let o=await _s.get(e)?.({element:t});ff({cb:o,id:e}),_s.delete(e)};var _n=new Map,Bl=1e5,xn=e=>{if(_n.size>=Bl)return console.warn(`maximum loop event reached: (${Bl})`),()=>{};let t=u.getUnivoqueId();return _n.set(t,e),()=>_n.delete(t)},bf=()=>_n.size===0||_n.size>=Bl,Er=async({debug:e=!1,previousResolve:t}={})=>{if(await Qr(),e&&_n.forEach(r=>{console.log(r)}),bf()&&t){t();return}return new Promise(r=>{if(bf()){r();return}Er({debug:e,previousResolve:t??r})})};var Vl=!0,ia=()=>{Vl=!0},aa=()=>{Vl=!1},ca=()=>Vl;var Cn=new Map,yf=(e=[])=>{let t=Le(Object,e)?[e]:e,r=u.getUnivoqueId();return Cn.set(r,t),r},vf=({element:e,componentId:t,bindEventsId:r})=>{let o=Cn.get(r);o&&(o.forEach(n=>{let[s]=Object.keys(n),[i]=Object.values(n);!s||!i||e.addEventListener(s,async a=>{if(!ca())return;aa(),await Er(),ia();let c=Vt({id:t});i(a,c?.current,c?.index)})}),Cn.delete(r))},Tf=()=>{Cn.clear()};var la=({id:e="",unWatchArray:t=[]})=>{let r=j.get(e);if(!r)return;let{parentPropsWatcher:o}=r;o&&j.set(e,{...r,parentPropsWatcher:[...o,...t]})},Sf=({id:e=""})=>{if(!e||e==="")return;(j.get(e)?.parentPropsWatcher??[]).forEach(o=>{o()})};var _f=e=>{if(!("props"in e)){console.warn("bindProps not valid");return}let r=e?.observe?e.observe.map(s=>Me.extractkeyFromProp(s)):(Me.initializeCurrentDependencies(),u.checkType(Function,e.props)&&e.props({},{},0),Me.getCurrentDependencies());if(r.length===0){console.warn("bindProps not valid, no dependencies found");return}let o={...e,observe:r},n=u.getUnivoqueId();return _t.set(n,{...o,componentId:"",propsId:n}),n},ua=({componentId:e,observe:t,props:r,currentParentId:o,fireCallback:n})=>{if(!o)return;let s=nr(o);if(!s)return;let i=Object.keys(s);if(t.every(d=>i.includes(d))||console.warn(`bind props error: Some prop ${JSON.stringify(t)} doesn't exist`),!j.has(e))return;let l=Vt({id:e}),p=r?.(s,l.current,l?.index);p&&Object.entries(p).forEach(([d,f])=>{Tn(e,d,f,{emit:n})})},xf=({propsId:e,repeatPropBind:t,componentId:r})=>{if(!e)return;let o=_t.get(e);o&&(_t.set(e,{...o,componentId:r}),vs.set(r,e),Wl({componentId:r,repeatPropBind:t,inizilizeWatcher:!1}))};var Wl=async({componentId:e,repeatPropBind:t,inizilizeWatcher:r})=>{let o=vs.get(e);if(!o)return;r&&vs.delete(e);let n=_t.get(o);if(!n)return;let{observe:s,props:i,parentId:a}=n,c=t&&t?.length>0&&!s.includes(t)?[...s,t]:[...s];if(r||ua({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!1}),!r&&!Mh()&&(await Rt(),ua({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!0})),!r&&!Eh()&&(await Mt(),ua({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!0})),!r)return;let l=!1,p=c.map(d=>It(a,d,async()=>{if(await Rt(),await Mt(),l)return;let f=xn({state:d,id:e,type:kd});l=!0,u.useNextLoop(()=>{ua({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!0}),l=!1,f()})}));if(la({id:e,unWatchArray:p.filter(d=>d!==void 0)}),!!r)for(let[d,f]of _t){let{componentId:h}=f;h===e&&_t.delete(d)}},Cf=()=>{_t.clear(),vs.clear()};var sr=({id:e,container:t})=>{let o=j.get(e)?.child;if(!o)return;Object.values(o??{}).flat().forEach(s=>{let i=j.get(s),a=i?.element,c=i?.id??"";if(a&&t?.contains(a)&&a!==t){pt({id:s});return}else sr({id:c,container:t})})};var jl=new Map,Dw=e=>(u.checkType(Array,e)?e:[e]).map(r=>Me.extractkeyFromProp(r)),Fw=({toggleClass:e,toggleStyle:t,toggleAttribute:r})=>(Me.initializeCurrentDependencies(),Object.values(t).forEach(o=>o()),Object.values(e).forEach(o=>o()),Object.values(r).forEach(o=>o()),Me.getCurrentDependencies()),Mf=({data:e,id:t})=>{let o=(u.checkType(Array,e)?e:[e]).map(({observe:i,toggleClass:a,toggleStyle:c,toggleAttribute:l})=>({observe:i?Dw(i):Fw({toggleStyle:c??{fake:()=>""},toggleClass:a??{fake:()=>{}},toggleAttribute:l??{fake:()=>{}}}),toggleClass:a??{},toggleStyle:c??{},toggleAttribute:l??{}})),n={parentId:t,items:o},s=u.getUnivoqueId();return jl.set(s,n),s},Rf=e=>{[...e.querySelectorAll(`[${dn}]`)].forEach(r=>{let o=r.getAttribute(dn);if(!o)return;let n=jl.get(o);n&&(r.removeAttribute(dn),Bw({data:n,element:r}),jl.delete(o))})},Ef=({ref:e,data:t})=>{t&&Object.entries(t).forEach(([r,o])=>{e.deref()&&e.deref().classList.toggle(r,o?.())})},wf=({ref:e,data:t})=>{Object.entries(t).forEach(([r,o])=>{e.deref()&&(e.deref().style[r]=o?.()??"")})},If=({ref:e,data:t})=>{Object.entries(t).forEach(([r,o])=>{if(!e.deref())return;let n=o?.();if(u.checkType(Boolean,n)){e.deref()[r]=n;return}if(!n){e.deref().removeAttribute(r);return}e.deref()?.setAttribute(r,n)})},Bw=({data:e,element:t})=>{let r=new WeakRef(t),{parentId:o}=e,{items:n}=e,s=n.flatMap(({observe:i,toggleClass:a,toggleStyle:c,toggleAttribute:l})=>{let p=!1,d=vn({id:o}),f=yn({id:o});return[...new Set([...i,...d,...f])].map(v=>(a&&u.useFrame(()=>{Ef({ref:r,data:a})}),c&&u.useFrame(()=>{wf({ref:r,data:c})}),l&&u.useFrame(()=>{If({ref:r,data:l})}),It(o,v,async()=>{if(await Rt(),await Mt(),r.deref()&&!r.deref()?.isConnected){s.forEach(b=>{b&&b()}),s.length=0;return}p||(p=!0,u.useNextLoop(()=>{u.useFrame(()=>{a&&r.deref()&&Ef({ref:r,data:a}),c&&r.deref()&&wf({ref:r,data:c}),l&&r.deref()&&If({ref:r,data:l}),p=!1})}))})))})};var kf=({element:e})=>{let t=e.querySelectorAll(`[${er}]`),r={};return[...t].reduce((o,n)=>{let s=n.getAttribute(er),i=n.getAttribute(xr);if(n.removeAttribute(er),n.removeAttribute(xr),!i)return o;let a=i in o?[...o[i],{element:n,scopeId:s}]:[{element:n,scopeId:s}];return{...o,[i]:a}},r)},Vw=e=>[...new Set(e.toSorted((t,r)=>t===r||!t||!r?0:t.compareDocumentPosition(r)&2?1:-1))],Ww=({refs:e,refName:t,element:r})=>({...e,[t]:Vw([...e[t],r])}),Nf=e=>{Object.entries(e).forEach(([t,r])=>{r.forEach(({element:o,scopeId:n})=>{let s=j.get(n);if(!s)return;let{refs:i}=s;if(!i)return;let a=t in i?Ww({refs:i,refName:t,element:o}):{...i,[t]:[o]};j.set(n,{...s,refs:a})})})},zl=({id:e})=>{let t=j.get(e);if(!t)return{};let{refs:r,element:o}=t;if(!r)return{};let n=Object.entries(r).map(([s,i])=>({name:s,collection:i.filter(a=>o.contains(a))})).reduce((s,i)=>({...s,[i.name]:i.collection}),{});return j.set(e,{...t,refs:n}),n},Pf=({id:e})=>{let t=zl({id:e});return Object.entries(t).reduce((r,[o,n])=>({...r,[o]:n?.[0]}),{})};var Af=document.createElement("div"),Of=({element:e})=>{Af=e},pa=()=>Af;var xs=new Map,Ao=new WeakMap,Hl=[],$f=[],Lf=(e=[])=>{let t=Le(Object,e)?[e]:e,r=u.getUnivoqueId();return xs.set(r,t),r},jw=e=>{let t=e?.parentNode;for(;t;){if(Ao.has(t))return{target:t,data:Ao.get(t)};t=t?.parentNode}return{target:void 0,data:void 0}},zw=e=>Ao.get(e)?{target:e,data:Ao.get(e)}:jw(e);async function Hw(e,t){let r=t?.target;if(!r||!ca())return;aa(),await Er(),ia();let{target:o,data:n}=zw(r);if(!n||!document.contains(o))return;let s=n.find(({event:l})=>l===e);if(!s)return;let{callback:i}=s,a=Cd({element:o}),c=a?Vt({id:a}):tr;Object.defineProperty(t,"target",{value:o}),Object.defineProperty(t,"currentTarget",{value:r}),i(t,c?.current,c?.index)}var Df=async e=>{await Rt(),await Mt(),[...e.parentNode?.querySelectorAll(`[${Zt}]`)??[]].forEach(n=>{let s=n.getAttribute(Zt)??"";n.removeAttribute(Zt);let i=xs.get(s);xs.delete(s);let a=i?.flatMap(c=>Object.entries(c).map(l=>{let[p,d]=l;return Hl.includes(p)||Hl.push(p),{event:p,callback:d}}));Ao.set(n,a)});let o=pa();Hl.forEach(n=>{$f.includes(n)||($f.push(n),o.addEventListener(n,Hw.bind(null,n)))})};var En="repeater",ma="invalidate",eo=({moduleParentElement:e,skipInitialized:t=!1,onlyInitialized:r=!1,componentId:o,module:n})=>{let s=n===En?Y.entries():be.entries(),i=[];for(let a of s){let[c,{element:l,initialized:p,scopeId:d,initializeModule:f,unsubscribe:h}]=a;if(o&&!Rl({moduleScopeId:d??"",targetComponentId:o})||t&&p||r&&!p)continue;l&&e?.contains(l)&&e!==l&&i.push({moduleId:c,initializeModule:f,unsubscribe:n===En?[h]:h})}return i};var Ff=({id:e,repeatId:t})=>{if(!Ze.has(e))return;let r=Ze.get(e);if(!r)return;let o=r.filter(n=>n.repeatId!==t);Y.has(t)&&Y.delete(t),Ze.set(e,o)};var to=({id:e,repeatParent:t})=>{eo({moduleParentElement:t,skipInitialized:!1,onlyInitialized:!0,componentId:e,module:En}).forEach(({unsubscribe:o,moduleId:n})=>{o.forEach(s=>{s()}),Ff({id:e,repeatId:n})})};var da=({repeatParent:e,id:t})=>{if(!e)return;eo({moduleParentElement:e,skipInitialized:!0,onlyInitialized:!1,componentId:t,module:En}).forEach(({initializeModule:o})=>{o()})};var Bf=({invalidateId:e,unsubscribe:t})=>{let r=be.get(e);r&&be.set(e,{...r,unsubscribe:t})};var Vf=({id:e,invalidateId:t})=>{if(!Qe.has(e))return;let r=Qe.get(e);if(!r)return;let o=r.filter(n=>n.invalidateId!==t);be.has(t)&&be.delete(t),Qe.set(e,o)};var ro=({id:e,invalidateParent:t})=>{eo({moduleParentElement:t,skipInitialized:!1,onlyInitialized:!0,componentId:e,module:ma}).forEach(({unsubscribe:o,moduleId:n})=>{o.forEach(s=>{s()}),Vf({id:e,invalidateId:n})})};var Ul=({id:e})=>{if(!be.has(e))return;if(Jr.has(e)){let r=Jr.get(e);r?.removeCustomComponent(),r?.remove(),Jr.delete(e)}return be.get(e)?.element};var ha=({invalidateParent:e,id:t})=>{if(!e)return;eo({moduleParentElement:e,skipInitialized:!0,onlyInitialized:!1,componentId:t,module:ma}).forEach(({initializeModule:o})=>{o()})};var Wf=async({observe:e=[],beforeUpdate:t=()=>Promise.resolve(),afterUpdate:r=()=>{},watch:o,id:n,invalidateId:s,persistent:i=!1,renderFunction:a})=>{let c=!1,l=fn({element:Ul({id:s})});r();let p=e.map(d=>o(d,async()=>{if(c)return;bn({id:n,prop:d});let h=Ul({id:s}),v=xn({state:d,id:n,type:Il}),b=wh({state:d,id:n,type:Il});c=!0,u.useNextLoop(async()=>{if(!h){qr({id:n,prop:d});return}await t(),ro({id:n,invalidateParent:h}),to({id:n,repeatParent:h}),sr({id:l??n,container:h}),h.textContent="",Zr({stringDOM:a(),parent:h,position:"afterbegin"}),de.set(ft,{element:h,parentId:l??n,persistent:i,source:pd},{emit:!1}),await de.emitAsync(ft),un(),c=!1,v(),b(),ha({invalidateParent:h,id:n}),da({repeatParent:h,id:n}),qr({id:n,prop:d}),r()})}));Bf({invalidateId:s,unsubscribe:p})};var jf=e=>(u.checkType(Array,e)?e:[e]).map(r=>Me.extractkeyFromProp(r));var zf=({invalidateId:e,initializeModule:t})=>{let r=be.get(e);r&&be.set(e,{...r,initializeModule:t,unsubscribe:[()=>{}]})};var Hf=({invalidateId:e})=>{let t=be.get(e);t&&be.set(e,{...t,initialized:!0})};var Uf=({invalidateId:e,scopeId:t,observe:r})=>{be.set(e,{element:void 0,initialized:!1,observed:r,scopeId:t,initializeModule:()=>{},unsubscribe:[()=>{}]})};var Gf=({repeatId:e,unsubscribe:t})=>{let r=Y.get(e);r&&Y.set(e,{...r,unsubscribe:t})};var wn=new Set,qf=({id:e,state:t,container:r})=>{wn.add({id:e,state:t,container:r})},Jf=({id:e,state:t,container:r})=>{r&&wn.forEach(o=>{e===o.id&&t===o.state&&r===o.container&&wn.delete(o)})},Yf=({id:e="",state:t="",container:r})=>[...wn].some(n=>e===n.id&&t===n.state&&r===n.container);var Kf=(e=[],t=[],r="")=>e.filter(o=>{let n=o?.[r];return!t.some(s=>s?.[r]===n)}),Qf=(e,t,r)=>e.map((o,n)=>{let s=o?.[r];return!t.some(a=>a?.[r]===s)?{isNewElement:!0,keyValue:o?.[r],index:n}:{isNewElement:!1,keyValue:o?.[r],index:n}}),Xf=({arr:e=[],key:t=""})=>e.every(r=>u.checkType(Object,r)&&t in r),Zf=({current:e,previous:t,key:r})=>Xf({arr:e,key:r})&&Xf({arr:t,key:r}),fa=({data:e=[],key:t=""})=>e.filter((r,o,n)=>n.findIndex(s=>s?.[t]===r?.[t])===o),ga=({children:e,previousChildren:t=[]})=>{let r={};return t.length===0?Object.values(e.reduce((o,n)=>{let{index:s}=Vt({id:n});return s in o?{...o,[s]:[...o[s],n]}:{...o,[s]:[n]}},r)):Object.values(e.reduce((o,n)=>{let{index:s}=Vt({id:n}),i=t.includes(n)?`${s}`:`_${s}`,a=o?.[i];return a?{...o,[i]:[...a,n]}:{...o,[i]:[n]}},r))};var In=new Map,ba=(e={})=>{let t=u.getUnivoqueId();return In.set(t,e),t},ya=(e="")=>{let t=In.get(e);return In.delete(e),t??{}};var eg=()=>{In.clear()};var va=(e={})=>`${mn}="${ba(e)}"`,Ta=(e,t,r)=>Math.min(Math.max(e,t),r);var Gl=({repeatId:e})=>{let t=Y.get(e);return t?t.currentData:[]};var Uw="index",Oo=({observe:e,hasKey:t,key:r="",keyValue:o="",index:n,repeatId:s})=>{let i=Gl({repeatId:s}),a=t?i?.find(p=>p[r]===o):i?.[n],c=a,l=a;return new Proxy({},{get(p,d){Me.setCurrentDependencies(e);let f=Gl({repeatId:s}),h=Math.max(f?.length-1,0);if(d===Uw){if(t){let v=f?.findIndex(b=>b[r]===o);return Ta(v,0,h)}return Ta(n,0,h)}return t?(l=c??l,c=f?.find(v=>v[r]===o),c??l):(l=c??l,c=f?.[Ta(n,0,h)],c??l)},set(){return!1}})};var tg=({diff:e,current:t,previousLenght:r,render:o,state:n,repeatId:s})=>{let i=document.createRange();return[...Array.from({length:e}).keys()].map((c,l)=>{let p=t?.[l+r],d=l+r,f=Oo({observe:n,hasKey:!1,index:d,repeatId:s}),h=o({initialIndex:d,initialValue:p,current:f,sync:()=>""}),v=Wt();ut(!0);let b=i.createContextualFragment(h);if(ut(v),!1){let T=Gr(b,!1).map(_=>new WeakRef(_));na({components:T,current:p,index:d,observe:n,repeatId:s,key:void 0})}return sa({components:Ji(),current:p,index:d,observe:n,repeatId:s,key:void 0}),b.firstElementChild}).filter(c=>c!==null)},Gw=({initialIndex:e,initialValue:t,state:r,repeatId:o})=>`${Kt}="${Po({current:t,index:e})}"
    ${Qt}="${r}" ${Bt}="${o}"`,rg=({diff:e,previousLenght:t,current:r,state:o,repeatId:n,render:s})=>[...Array.from({length:e}).keys()].map((i,a)=>{let c=a+t,l=r?.[c]?{...r?.[c]}:{},p=Oo({observe:o,hasKey:!1,index:c,repeatId:n});return s({sync:()=>Gw({initialIndex:c,initialValue:l,repeatId:n,state:o}),initialIndex:c,initialValue:l,current:p})}).join(""),og=({currentValue:e,index:t,state:r,repeatId:o,key:n,keyValue:s,render:i})=>{let a=Oo({observe:r,hasKey:!0,key:n,keyValue:s,index:t,repeatId:o}),c=Wt();ut(!0);let l=document.createRange().createContextualFragment(i({initialIndex:t,initialValue:e,current:a,sync:()=>""}));if(ut(c),!1){let p=Gr(l,!1).map(d=>new WeakRef(d));na({components:p,current:e,index:t,observe:r,repeatId:o,key:s})}return sa({components:Ji(),current:e,index:t,observe:r,repeatId:o,key:s}),l.firstElementChild},qw=({keyValue:e,index:t,currentValue:r,state:o,repeatId:n})=>` ${"key"}="${e}"
    ${Qt}="${o}"
    ${Kt}="${Po({current:r,index:t})}"
    ${Bt}="${n}"`,ng=({currentValue:e,index:t,state:r,repeatId:o,key:n,keyValue:s,render:i})=>{let a={...e},c=Oo({observe:r,hasKey:!0,key:n,keyValue:s,index:t,repeatId:o});return i({initialIndex:t,initialValue:a,current:c,sync:()=>qw({currentValue:a,index:t,keyValue:s,repeatId:o,state:r})})},sg=({currentUnique:e,render:t,observe:r,repeatId:o,key:n="",hasKey:s})=>{let i=document.createRange();return e.map((c,l)=>{let p=Oo({observe:r,hasKey:s,key:n,keyValue:s?c?.[n]:"",index:l,repeatId:o}),d=Wt();ut(!0);let f=i.createContextualFragment(t({initialIndex:l,initialValue:c,current:p,sync:()=>""}));if(ut(d),!1){let h=Gr(f,!1).map(v=>new WeakRef(v));na({components:h,current:c,index:l,observe:r,repeatId:o,key:s?c?.[n]:""})}return sa({components:Ji(),current:c,index:l,observe:r,repeatId:o,key:s?c?.[n]:""}),f.firstElementChild}).filter(c=>c!==null)},ig=({currentUnique:e,key:t="",observe:r,repeatId:o,hasKey:n,render:s})=>e.map((a,c)=>{let l=()=>`${Kt}="${Po({current:a,index:c})}"
                            ${"key"}="${n?a?.[t]:""}"
                            ${Qt}="${r}"
                            ${Bt}="${o}"`,p=Oo({observe:r,hasKey:n,key:t,keyValue:n?a?.[t]:"",index:c,repeatId:o});return s({sync:l,initialIndex:c,initialValue:a,current:p})}).join("");var Sa=({repeatId:e,id:t})=>{let r=Y.get(e);if(!r)return;let{element:o,observed:n}=r;if(!o)return;let s=[...o.children],a=nr(t)[n];Y.set(e,{...r,nativeDOMChildren:s.map((c,l)=>({index:l,value:a[l],element:c}))})},Cs=({repeatId:e})=>{let t=Y.get(e);if(!t)return[];let{nativeDOMChildren:r}=t;return r};var Mn=({repeatId:e,currentData:t})=>{let r=Y.get(e);r&&Y.set(e,{...r,currentData:t})};var Jw=({element:e,container:t})=>{let r=Wd(e);t.insertAdjacentHTML("beforeend",`<!-- ${r} --> `)},ag=({state:e="",current:t=[],previous:r=[],repeaterParentElement:o=document.createElement("div"),key:n="",id:s="",render:i,repeatId:a,useSync:c})=>{let l=fa({data:t,key:n});Mn({repeatId:a,currentData:l});let p=Kf(r,l,n),d=p.map(T=>{let _=T?.[n];return Cl({keyValue:_,repeatId:a})}).filter(T=>T.length>0),f=d.length>0;d.forEach(T=>{let _=T[0].element,S=T[0].id;if(!S)return;let C=bs({id:S}),E=C??_;ro({id:s,invalidateParent:E}),to({id:s,repeatParent:E}),T.forEach(({id:w})=>{pt({id:w})}),C&&C.remove()}),f||Cs({repeatId:a}).filter(S=>p.map(C=>C?.[n]).includes(S.value?.[n])).forEach(S=>{let{element:C}=S;ro({id:s,invalidateParent:C}),to({id:s,repeatParent:C}),sr({id:s,container:C})});let h=Qf(l,r,n).map(({keyValue:T,isNewElement:_,index:S})=>{if(_)return{keyValue:T,isNewElement:_,index:S,wrapper:void 0};let C=Cl({keyValue:T,repeatId:a}),E=C[0]?.element?bs({id:C[0]?.id??""}):Cs({repeatId:a}).find(M=>M.value?.[n]===T)?.element;return{keyValue:T,isNewElement:_,index:S,persistentElement:C,persistentDOMwrapper:E}});o.replaceChildren();let v=document.createRange(),b=new DocumentFragment;return h.forEach(({isNewElement:T,keyValue:_,index:S,persistentElement:C,persistentDOMwrapper:E})=>{if(!T){let{debug:R}=kt();E&&b.append(E);let L=C?.[0]?.element;!E&&L&&(b.append(L),R&&Jw({element:C[0]?.element,container:o}));return}let w=l?.[S],M=c?ng({currentValue:w,index:S,state:e,repeatId:a,key:n,keyValue:_,render:i}):og({currentValue:w,index:S,state:e,repeatId:a,key:n,keyValue:_,render:i}),A=Wt();if(ut(!0),c){let R=v.createContextualFragment(M);b.append(R)}!c&&M&&b.append(M),ut(A)}),o.append(b),l};var Yw=e=>{let t=e.lastElementChild;if(!t)return;let r=t.nextSibling;for(;r;){let o=r.nextSibling;r.nodeType===Node.COMMENT_NODE&&r.remove(),r=o}},cg=({state:e="",current:t=[],previous:r=[],repeaterParentElement:o=document.createElement("div"),render:n,repeatId:s,id:i,useSync:a,currentChildren:c})=>{Mn({repeatId:s,currentData:t});let l=t.length,p=r.length,d=l-p;if(d>0){let f=a?rg({diff:d,previousLenght:p,current:t,state:e,repeatId:s,render:n}):tg({diff:d,current:t,previousLenght:p,render:n,state:e,repeatId:s});a&&Zr({stringDOM:f,parent:o,position:"beforeend"}),a||Ss({elements:f,parent:o,position:"beforeend"})}if(d<0){let f=ga({children:c});f.filter((_,S)=>S>=t.length).forEach(_=>{_.forEach(S=>{let C=fs({id:S}),E=bs({id:S}),w=E??C;ro({id:i,invalidateParent:w}),to({id:i,repeatParent:w}),pt({id:S}),E&&E.remove()})});let{debug:v}=kt();if(v&&Yw(o),f.length>0)return t;let b=Cs({repeatId:s});if(!b)return t;b.filter(({index:_})=>_>=t.length).forEach(_=>{let{element:S}=_;ro({id:i,invalidateParent:S}),to({id:i,repeatParent:S}),sr({id:i,container:S}),S.remove()})}return t};var lg=async({state:e="",persistent:t,repeaterParentElement:r=document.createElement("div"),current:o=[],previous:n=[],key:s="",id:i,fallBackParentId:a="",render:c,repeatId:l,useSync:p,currentChildren:d=[]})=>{let v=(Zf({current:o,previous:n,key:s})?ag:cg)({state:e,current:o,previous:n,repeaterParentElement:r,key:s,id:i,render:c,repeatId:l,useSync:p,currentChildren:d});return de.set(ft,{element:r,parentId:a??i,persistent:t,source:ud},{emit:!1}),await de.emitAsync(ft),un(),v};var ug=({state:e="",setState:t,persistent:r=!1,watch:o,clean:n=!1,beforeUpdate:s,afterUpdate:i,key:a="",id:c="",repeatId:l="",render:p,useSync:d=!1})=>{let f=fs({id:c}),h=gs({id:l}),v=h?fn({element:h})??"":"";return i(),o(e,async(T,_)=>{if(!u.checkType(Array,T))return;let S=gs({id:l}),C=xn({state:e,id:c,type:wl}),E=Rh({state:e,id:c,type:wl});if(bn({id:c,prop:e}),Yf({id:c,state:e,container:S})){qr({id:c,prop:e}),t(e,_,{emit:!1}),C(),E();return}let M=El({id:c,repeatId:l});f&&await s(),n&&(M.forEach(V=>{pt({id:V})}),S&&(S.textContent="")),S&&qf({id:c,state:e,container:S});let A=await lg({state:e,persistent:r,repeaterParentElement:S??document.createElement("div"),current:T,previous:n?[]:_,key:a,id:c,fallBackParentId:v,render:p,repeatId:l,useSync:d,currentChildren:n?[]:M}),R=El({id:c,repeatId:l}),L=a&&a!=="",D=ga({children:R,previousChildren:M}),$=L?[...Ad({children:D,key:a,current:T,currentUnivoque:A})]:D;$.forEach((V,I)=>{V.forEach(k=>{let P=A?.[I];if(!P)return;let x=L?T.findIndex(N=>`${N?.[a]}`==`${A?.[I]?.[a]}`):I;ji({id:k,value:{current:P,index:x}})})}),u.useNextLoop(async()=>{f&&i(),Jf({id:c,state:e,container:S}),qr({id:c,prop:e}),C(),E(),ha({invalidateParent:S,id:c}),da({repeatParent:S,id:c}),$.length===0&&Sa({repeatId:l,id:c})})})};var pg=({repeatId:e,persistent:t,state:r,setState:o,emit:n,watch:s,clean:i,beforeUpdate:a,afterUpdate:c,key:l,id:p,render:d,useSync:f})=>{let h=ug({state:r,setState:o,persistent:t,emit:n,watch:s,clean:i,beforeUpdate:a,afterUpdate:c,key:l,id:p,repeatId:e,render:d,useSync:f});Gf({repeatId:e,unsubscribe:h})};var mg=({repeatId:e,initializeModule:t})=>{let r=Y.get(e);r&&Y.set(e,{...r,initializeModule:t,unsubscribe:()=>{}})};var dg=({repeatId:e})=>{let t=Y.get(e);t&&Y.set(e,{...t,initialized:!0})};var hg=({repeatId:e,initialDOMRender:t})=>{let r=Y.get(e);r&&Y.set(e,{...r,initialRenderWithoutSync:t})};var fg=({repeatId:e,scopeId:t,observe:r})=>{Y.set(e,{element:void 0,initialized:!1,scopeId:t,observed:r,nativeDOMChildren:[],componentChildren:[],currentData:[],initialRenderWithoutSync:[],initializeModule:()=>{},unsubscribe:()=>{}})};var gg=({repeatId:e,scopeId:t})=>{let r=Ze.get(t)??[];Ze.set(t,[...r,{repeatId:e}])};var bg=({invalidateId:e,scopeId:t})=>{let r=Qe.get(t)??[];Qe.set(t,[...r,{invalidateId:e}])};var yg=({getState:e,setState:t,updateState:r,getProxi:o,emit:n,emitAsync:s,computed:i,watch:a,id:c,key:l,bindEventsId:p,debug:d})=>({bindEventsId:p,key:l,id:c,getState:e,setState:t,updateState:r,getProxi:o,emit:n,emitAsync:s,computed:i,watch:a,debug:d,repeatIdArray:[],renderComponent:async({attachTo:h,component:v,position:b="afterbegin",clean:T=!0})=>{T&&(sr({id:c,container:h}),h.textContent=""),h.insertAdjacentHTML(b,v),de.set(ft,{element:h,parentId:c,persistent:Ui(c),source:md},{emit:!1}),await de.emitAsync(ft),un()},getChildren:h=>zi({id:c,componentName:h}),freezeProp:h=>{let v=Me.extractkeyFromProp(h);return bn({id:c,prop:v.toString()})},unFreezeProp:h=>{let v=Me.extractkeyFromProp(h);return qr({id:c,prop:v.toString()})},unBind:()=>Sf({id:c}),bindProps:h=>{let v="props"in h?h:{props:h};return`${Fi}="${_f({...v,parentId:c})}" `},staticProps:h=>` ${mn}="${ba(h)}" `,remove:()=>{pt({id:c})},removeDOM:h=>{sr({id:c,container:h}),h.textContent=""},getParentId:()=>ys(c),watchParent:(h,v)=>{let b=It(ys(c),h,v);b&&la({id:c,unWatchArray:[b]})},onMount:h=>gf({id:c,cb:h}),bindEvents:h=>`${Bi}="${yf(h)}"`,delegateEvents:h=>`${Zt}="${Lf(h)}"`,bindEffect:h=>`${dn}="${Mf({data:h,id:c})}"`,addMethod:(h,v)=>{Ud({id:c,name:h,fn:v})},setRef:h=>`${er}="${c}" ${xr}="${h}"`,getRef:()=>Pf({id:c}),getRefs:()=>zl({id:c}),bindText:(h,...v)=>{let b=u.getUnivoqueId(),T=()=>Oh(c,h,...v);return kh(b,{id:c,render:T,props:v}),`<mobjs-bind-text ${wo}="${c}" ${Li}="${b}"></mobjs-bind-text>${T()}`},bindObject:(h,...v)=>{let b=Vh(v),T=u.getUnivoqueId(),_=()=>Wh(h,...v);return Fh(T,{id:c,keys:b,render:_}),`<mobjs-bind-object ${wo}="${c}" ${Di}="${T}"></mobjs-bind-object>${_()}`},invalidate:({observe:h,render:v,beforeUpdate:b=()=>Promise.resolve(),afterUpdate:T=()=>{}})=>{let _=jf(h),S=u.getUnivoqueId(),C=`${Vi}=${S}`,E=()=>v(),w=!1;return bg({invalidateId:S,scopeId:c}),Uf({invalidateId:S,scopeId:c,observe:_}),zf({invalidateId:S,initializeModule:()=>{w||(Wf({observe:_,watch:a,beforeUpdate:b,afterUpdate:T,persistent:Ui(c),id:c,invalidateId:S,renderFunction:E}),w=!0,Hf({invalidateId:S}))}}),`<mobjs-invalidate ${C} style="display:none;"></mobjs-invalidate>${E()}`},repeat:({observe:h,clean:v=!1,beforeUpdate:b=()=>Promise.resolve(),afterUpdate:T=()=>{},key:_="",render:S,useSync:C=!1})=>{let E=Me.extractkeyFromProp(h),w=u.getUnivoqueId(),M=_!=="";gg({repeatId:w,scopeId:c}),fg({repeatId:w,scopeId:c,observe:E});let A=e()?.[E],R=M?fa({data:A,key:_}):A;Mn({repeatId:w,currentData:R});let L=C?ig({currentUnique:R,key:_,observe:E,repeatId:w,hasKey:M,render:S}):"",D=C?[]:sg({currentUnique:R,render:S,observe:E,repeatId:w,key:_,hasKey:M}),$=!1;return hg({repeatId:w,initialDOMRender:D}),mg({repeatId:w,initializeModule:()=>{$||(pg({repeatId:w,persistent:Ui(c),state:E,setState:t,emit:n,watch:a,clean:v,beforeUpdate:b,afterUpdate:T,key:_,id:c,render:S,useSync:C}),$=!0,dg({repeatId:w}),Td({repeatId:w})||Sa({repeatId:w,id:c}))}}),`<mobjs-repeat ${Wi}="${w}" style="display:none;"></mobjs-repeat>${L}`}});var ql=({componentName:e,currentProps:t={}})=>{let o=No()?.[e]?.componentParams?.exportState??[];return Object.entries(t).filter(([n])=>o.includes(n)).reduce((n,s)=>{let[i,a]=s;return{...n,[i]:a}},{})};var vg=({element:e,parentIdForced:t})=>{let r=e.getId(),o=e.getInstanceName(),n=e.getParentId(),s=fn({element:e}),i=e.getStaticPropsId(),a=e.getDynamicPropsid(),c=e.getBindEventsId(),l=e.getRepeatValue(),p=e.getComponentRepeatId(),d=e.getCurrentKey()??"",f=e.getComponentName(),h=i?.split(" ").join(""),v=ya(h),b={...e.dataset},T=e.getRepeaterPropBind(),_=pf(l);return{element:e,props:{...ql({componentName:f,currentProps:b}),...ql({componentName:f,currentProps:v})},id:r,componentName:f,instanceName:o,key:d,dynamicPropsId:a,repeatPropBind:T,bindEventsId:c,currentRepeatValue:_,parentId:s,componentRepeatId:p}};var Tg=e=>{gn.add(e)};var Sg=({element:e,instanceName:t="",props:r={},state:o={},bindStore:n,methods:s={},key:i="",currentRepeaterState:a=tr,repeaterInnerWrap:c,repeatPropBind:l="",componentRepeatId:p="",parentPropsWatcher:d=[()=>{}],refs:f={},destroy:h=()=>{},freezedPros:v=[],persistent:b=!1,child:T={},parentId:_="",id:S="",componentName:C=""})=>{let E=u.createStore(o);oh({props:r,store:E}),n&&E.bindStore(n),b||Tg(S),p&&p.length>0&&yd({componentId:S,repeatId:p}),t&&t.length>0&&Fd({instanceName:t,id:S});let w=Gh({componentName:C}),M=new Set(w);return E.setProxiReadOnlyProp(w),j.set(S,{element:e,componentName:C,instanceName:t,destroy:h,parentPropsWatcher:d,refs:f,methods:s,key:i,currentRepeaterState:a,repeaterInnerWrap:c,repeatPropBind:l,componentRepeatId:p,persistent:b,id:S,parentId:_,freezedPros:v,child:T,state:E}),{getState:()=>E.get(),setState:(A="",R={},{emit:L=!0}={})=>{let D=Mo({id:S,prop:A}),$=Me.extractkeyFromProp(A),V=M.has($);V&&Gi({prop:$,componentName:C,action:"updateState"}),!(D||V)&&E.set($,R,{emit:L??!0,usePropAsString:!0})},updateState:(A="",R=()=>{},{emit:L=!0,clone:D=!1}={})=>{let $=Mo({id:S,prop:A}),V=Me.extractkeyFromProp(A),I=M.has(V);I&&Gi({prop:V,componentName:C,action:"updateState"}),!($||I)&&E.update(V,R,{emit:L??!0,clone:D??!1,usePropAsString:!0})},getProxi:()=>E.getProxi(),emit:(A="")=>E.emit(A),emitAsync:async(A="")=>await E.emitAsync(A),computed:(A="",R=()=>{},L=[])=>{let D=Me.extractkeyFromProp(A);if(M.has(D)){Gi({prop:D,componentName:C,action:"computed"});return}return E.computed(D,R,L,{usePropAsString:!0})},watch:(A="",R=()=>{},{wait:L=!1,immediate:D=!1}={})=>E.watch(A,R,{wait:L??!1,immediate:D??!1}),debug:()=>E.debug()}};var _g=({id:e})=>(Qe.get(e)??[]).map(({invalidateId:r})=>{let o=be.get(r);if(o)return{invalidateId:r,initializeModule:o.initializeModule}}).filter(r=>r!==void 0);var xg=({id:e})=>(Ze.get(e)??[]).map(({repeatId:r})=>{let o=Y.get(r);if(o)return{repeatId:r,initializeModule:o.initializeModule}}).filter(r=>r!==void 0);var Cg=async({element:e,persistent:t=!1,parentIdForced:r="",source:o=zr})=>{let{debug:n}=kt();n&&console.log("parse source:",o);let s=No(),i=[],a=Dl({element:e,currentSelectors:[]}),c=a.parseSourceArray,l=a?.componentToParse;for(;l;){let d=l.getComponentName(),f=s?.[d]?.componentFunction,h=s?.[d]?.componentParams,{scoped:v,bindStore:b}=h,{props:T,id:_,componentName:S,instanceName:C,key:E,dynamicPropsId:w,currentRepeatValue:M,bindEventsId:A,parentId:R,componentRepeatId:L,repeatPropBind:D}=vg({element:l,parentIdForced:r}),$=h?.state??{},{getState:V,setState:I,updateState:k,getProxi:P,emit:x,emitAsync:N,computed:O,watch:F,debug:B}=Sg({element:l,props:T,state:$,id:_,componentName:S,instanceName:C,key:E,repeatPropBind:D,persistent:t,parentId:R,componentRepeatId:L,bindStore:b});nh({id:_}),L&&L?.length>0&&(ji({id:_,value:M}),Pd({id:_,repeatId:L,element:l})),xf({propsId:w,repeatPropBind:D,componentId:_});let Q=yg({getState:V,setState:I,updateState:k,getProxi:P,emit:x,emitAsync:N,computed:O,watch:F,id:_,key:E,bindEventsId:A,debug:B}),U=await f(Q),J=l.classList,{newElement:q}=mf({content:U,element:l});if(bh(),J.length>0&&q?.classList.add(...J),!0,!q)return;xd({id:_,newElement:q});let oe=_g({id:_}),te=xg({id:_});A&&vf({element:q,componentId:_,bindEventsId:A});let me=v??kt().scoped;me&&await Fl({id:_,element:q}),q?.inizializeCustomComponent?.(Q),i.push({onMount:async()=>{me||await Fl({id:_,element:q})},initializeBindPropsWatcher:()=>{Wl({componentId:_,repeatPropBind:D,inizilizeWatcher:!0})},fireInvalidateFunction:oe.length>0?()=>{oe.forEach(({initializeModule:Ne})=>{Ne?.()})}:()=>{},fireRepeatFunction:te.length>0?()=>{te.forEach(({initializeModule:Ne})=>{Ne?.()})}:()=>{}});let Ee=Dl({element:e,currentSelectors:c});c=Ee.parseSourceArray,l=Ee.componentToParse;let ke=Ll()===kt().maxParseIteration;if(df(),ke){console.warn(`dom parse reached max parse limit: ${Ll()}`);break}}let p=kf({element:e});Object.keys(p).length>0&&Nf(p);for(let d of i.toReversed()){let{onMount:f,initializeBindPropsWatcher:h,fireInvalidateFunction:v,fireRepeatFunction:b}=d;await f(),b(),v(),h()}i.length=0,c.length=0,l=null,Df(e),Rf(e),$h(),jh()};var Es=async({element:e,persistent:t=!1,parentIdForced:r="",source:o=zr})=>{await Cg({element:e,persistent:t,parentIdForced:r,source:o}),hf()},Eg=()=>{de.watch(ft,async({element:e,parentId:t,persistent:r=!1,source:o=zr})=>{await Es({element:e,parentIdForced:t??"",persistent:r,source:o})})};var wg=()=>{eg(),Tf(),Cf()};var Ig,Mg,Rg=({fn:e})=>{e&&(Mg=e)},kg=({fn:e})=>{e&&(Ig=e)},Ng=()=>Mg,Pg=()=>Ig;var Ag=!0,Og=e=>{Ag=e},$g=()=>Ag;var Lg=()=>{for(let e of gn)pt({id:e})};var Dg=new Map,Fg=({route:e,params:t})=>Object.entries(t).reduce((r,[o,n])=>`${r}-${o}-${n}`,e),Bg=async({route:e="",templateName:t="",isBrowserNavigation:r=!1,params:o={},skipTransition:n})=>{de.set(Xt,!0),await Er();let s=Hi();if(!s||!(s instanceof HTMLElement))return;let{activeRoute:i,activeParams:a}=de.get(),c=Fg({route:e,params:o}),l=Fg({route:i.route,params:a}),p=window.scrollY;Dg.set(l,p);let d=Dg.get(c)??0;de.set(Eo,{currentRoute:i.route,currentTemplate:i.templateName,nextRoute:e,nextTemplate:t});let f=!1,h=de.watch(Eo,()=>{f=!0});wg(),de.set(an,{route:e,templateName:t}),de.set(cn,o);let v=Sn({hash:e}),b=n||v?.skipTransition,T=v?.props??{},_=await v?.layout?.({params:o,props:T})??"",S=Ng(),C=s.cloneNode(!0);S&&C&&!b&&(await S({oldNode:C,oldRoute:i.route,newRoute:e,oldTemplateName:i.templateName,newTemplateName:t}),s?.parentNode?.insertBefore(C,s)),s.replaceChildren(),Lg(),Zr({stringDOM:_,parent:s,position:"afterbegin"}),await Es({element:s}),b||(s.style.visibility=""),f||de.set(ln,{currentRoute:e,currentTemplate:t,previousRoute:i.route,previousTemplate:i.templateName}),$g()&&r?scrollTo(0,d):scrollTo(0,0),document.body.dataset.route=e,document.body.dataset.template=t;let E=Pg();E&&!b&&(await E({oldNode:C,newNode:s,oldRoute:i.route,newRoute:e,oldTemplateName:i.templateName,newTemplateName:t}),C.remove()),C=null,h?.(),de.set(Xt,!1)};var Vg=({route:e})=>e,Wg=e=>{Vg=e},jg=({route:e})=>{let t=Vg({route:e});return{route:t,isRedirect:t!==e}};var zg=({hash:e=""})=>{let t=oa(),r=sf();return e===""?t:Sn({hash:e})?e:r},Hg=({hash:e=""})=>Sn({hash:e})?.templateName??"",Ug=({hash:e=""})=>Sn({hash:e})?.restoreScroll??!0;var Gg="",qg=!0,wr="",Jg="",oo,Yl,ws,Xl=e=>e.replace("?","").replace("/",""),Yg=e=>e.replace("#","").replace("/","").replace(".",""),Xw=e=>e.split("&").reduce((t,r)=>{let o=r.split("="),n=Xl(o?.[0]??""),s=o?.[1];return n&&n.length>0?{...t,[n]:s}:t},{}),Kw=e=>e&&Object.entries(e).reduce((t,[r,o],n)=>`${t}${n===0?"":"&"}${r}=${o}`,"");document.addEventListener("click",e=>{if(!e.target)return;e.target.closest("a")&&de.getProp(Xt)&&e.preventDefault()},{passive:!1});var _a=async({shouldLoadRoute:e=!0}={})=>{let t=globalThis.location.hash,r={hash:t},{routeIsLoading:o}=de.get();if(o){globalThis.location.hash=Gg.replace("#","");return}ws||history.replaceState({nextId:r},"",t);let{route:n,isRedirect:s}=jg({route:t});s&&history.replaceState({nextId:r},"",`#${n}`);let i=n.split("?"),a=Xl(i?.[1]??"");Jg=wr,wr=Yg(i?.[0]??"");let c=Xw(oo??a),l=oo||Object.keys(a).length>0?`?${oo??a}`:"";oo=void 0;let p=zg({hash:wr}),d=Hg({hash:wr&&wr.length>0?wr:oa()}),f=wr===Jg&&l.length===0&&!qg;e&&!f&&(Gg=`#${wr}${l}`,await Bg({route:p,templateName:d,isBrowserNavigation:Ug({hash:wr})&&!!ws,params:c,skipTransition:!!(ws??Yl)})),e||(de.set(an,{route:p,templateName:d}),de.set(cn,c)),Yl=void 0,u.useNextLoop(()=>{qg=!1})},Xg=()=>{_a(),globalThis.history.scrollRestoration="manual",globalThis.addEventListener("popstate",e=>{ws=e?.state?.nextId}),globalThis.addEventListener("hashchange",async()=>{await Qr(),_a()})},Kg=({url:e,params:t,skipTransition:r})=>{if(!e||de.getProp(Xt))return;Yl=r;let o=e.split("?"),n=Yg(o?.[0]??""),s=Kw(t),i=Xl(o?.[1]??""),a=s??i;oo=a.length>0?a:"",ws=void 0,globalThis.location.hash=oo&&oo.length>0?`${n}?${oo}`:n,globalThis.dispatchEvent(new HashChangeEvent("hashchange"))};var Qg=async({rootId:e,wrapper:t,contentId:r,routes:o=[],afterInit:n=()=>{},redirect:s=({route:f})=>f,index:i="home",pageNotFound:a="pageNotFound",beforePageTransition:c,pageTransition:l,restoreScroll:p=!0,componentDefaultProps:d={scoped:!1,maxParseIteration:1e4,debug:!1}})=>{Xh(d);let f=document.querySelector(e),h=await t();Wg(s),!(!r||!f)&&(Ld({contentId:r}),Of({element:f}),kg({fn:l}),Rg({fn:c}),Og(p),Eg(),Uh(),rf(o),of({hash:i}),nf({hash:a}),Zr({stringDOM:h,parent:f,position:"afterbegin"}),Dd(),_a({shouldLoadRoute:!1}),await Es({element:f,persistent:!0}),u.useFrameIndex(()=>{u.useNextTick(()=>{n()})},5),Xg())};var Zg=()=>be.size;var eb=()=>Y.size;var fe={};To(fe,{clamp:()=>tt,getDefault:()=>cI,mq:()=>uI,printDefault:()=>lI,setDefault:()=>aI});var $o={default:{tension:20,mass:1,friction:5,velocity:0,precision:.01},gentle:{tension:120,mass:1,friction:14,velocity:0,precision:.01},wobbly:{tension:180,mass:1,friction:12,velocity:0,precision:.01},bounce:{tension:200,mass:3,friction:5,velocity:0,precision:.01},scroller:{tension:10,mass:1,friction:5,velocity:0,precision:.5}};var he={easeLinear:"easeLinear",easeInQuad:"easeInQuad",easeOutQuad:"easeOutQuad",easeInOutQuad:"easeInOutQuad",easeInCubic:"easeInCubic",easeOutCubic:"easeOutCubic",easeInOutCubic:"easeInOutCubic",easeInQuart:"easeInQuart",easeOutQuart:"easeOutQuart",easeInOutQuart:"easeInOutQuart",easeInQuint:"easeInQuint",easeOutQuint:"easeOutQuint",easeInOutQuint:"easeInOutQuint",easeInSine:"easeInSine",easeOutSine:"easeOutSine",easeInOutSine:"easeInOutSine",easeInExpo:"easeInExpo",easeOutExpo:"easeOutExpo",easeInOutExpo:"easeInOutExpo",easeInCirc:"easeInCirc",easeOutCirc:"easeOutCirc",easeInOutCirc:"easeInOutCirc",easeInElastic:"easeInElastic",easeOutElastic:"easeOutElastic",easeInOutElastic:"easeInOutElastic",easeInBack:"easeInBack",easeOutBack:"easeOutBack",easeInOutBack:"easeInOutBack",easeInBounce:"easeInBounce",easeOutBounce:"easeOutBounce",easeInOutBounce:"easeInOutBounce"},Rs="min",tb="max",Ql="desktop",ks="easeLinear",Is="default",Zl={xSmall:320,small:360,medium:600,tablet:768,desktop:992,large:1200,xLarge:1600,xxLarge:1980},eu=10,Ms=.06,tu="#ff0000",ru="#14df3b",ou=8,nu=10,su=1e3,iu=!1,Zw=!1,eI=!1,tI=.01,rI=.06,rb=e=>{let t=We({prop:"deferredNextTick",value:e?.deferredNextTick,defaultValue:u.store.getProp("deferredNextTick"),type:Boolean}),r=We({prop:"usePassive",value:e?.usePassive,defaultValue:u.store.getProp("usePassive"),type:Boolean}),o=We({prop:"throttle",value:e?.throttle,defaultValue:u.store.getProp("throttle"),type:Number}),n=oI(e?.mq??{}),s=We({prop:"defaultMq.value",value:e?.defaultMq?.value,defaultValue:Ql,type:String}),i=We({prop:"defaultMq.type",value:e?.defaultMq?.type,defaultValue:Rs,type:String}),a=We({prop:"sequencer.duration",value:e?.sequencer?.duration,defaultValue:eu,type:Number}),c=Kl(e?.sequencer?.ease,"sequencer"),l=We({prop:"scrolTrigger.springConfig",value:e?.scrollTrigger?.springConfig,defaultValue:Is,type:String}),p=We({prop:"scrolTrigger.lerpConfig",value:e?.scrollTrigger?.lerpConfig,defaultValue:Ms,type:Number}),d=We({prop:"scrolTrigger.markerColor.startEnd",value:e?.scrollTrigger?.markerColor?.startEnd,defaultValue:tu,type:String}),f=We({prop:"scrolTrigger.markerColor.item",value:e?.scrollTrigger?.markerColor?.item,defaultValue:ru,type:String}),h=We({prop:"parallax.defaultRange",value:e?.parallax?.defaultRange,defaultValue:ou,type:Number}),v=We({prop:"parallax.springConfig",value:e?.parallax?.springConfig,defaultValue:Is,type:String}),b=We({prop:"parallax.lerpConfig",value:e?.parallax?.lerpConfig,defaultValue:Ms,type:Number}),T=We({prop:"parallaxTween.duration",value:e?.parallaxTween?.duration,defaultValue:nu,type:Number}),_=Kl(e?.parallaxTween?.ease,"parallaxTween"),S=We({prop:"tween.duration",value:e?.tween?.duration,defaultValue:su,type:Number}),C=Kl(e?.tween?.ease,"tween"),E=We({prop:"tween.relative",value:e?.tween?.relative,defaultValue:iu,type:Boolean}),w=We({prop:"spring.relative",value:e?.spring?.relative,defaultValue:Zw,type:Boolean}),M=We({prop:"lerp.relative",value:e?.lerp?.relative,defaultValue:eI,type:Boolean}),A=We({prop:"lerp.precision",value:e?.lerp?.precision,defaultValue:tI,type:Number}),R=We({prop:"lerp.velocity",value:e?.lerp?.velocity,defaultValue:rI,type:Number});return{deferredNextTick:t,throttle:o,usePassive:r,mq:n,defaultMq:{value:s,type:i},sequencer:{duration:a,ease:c},scrollTrigger:{springConfig:l,lerpConfig:p,markerColor:{startEnd:d,item:f}},parallax:{defaultRange:h,springConfig:v,lerpConfig:b},parallaxTween:{duration:T,ease:_},tween:{duration:S,ease:C,relative:E},spring:{relative:w,config:e?.spring?.config?{...$o,...e.spring.config}:$o},lerp:{relative:M,precision:A,velocity:R}}},We=({prop:e,value:t,defaultValue:r,type:o})=>{let n=u.checkType(o,t);return n||console.warn(`handleSetUp error: ${e}: ${t}, is not valid must be a ${u.getTypeName(o)}`),n?t:r},oI=e=>{let t=u.checkType(Object,e)&&Object.values(e).every(r=>u.checkType(Number,r));return t||console.warn("handleSetUp error: mq must be an object as { ..., String: Number }"),t?e:Zl},Kl=(e,t)=>{let r=Object.keys(he).includes(e);return!r&&e!==void 0&&e!==null&&console.warn(`handleSetUp error: ${t}.ease properties is not valid`),r?e:ks};var mt=(e,t,r=!0)=>{e=(n=>{let s;try{s=JSON.parse(JSON.stringify(n))}catch{s=Object.assign({},n)}return s})(e);let o=n=>n&&typeof n=="object";return!o(e)||!o(t)?t:(Object.keys(t).forEach(n=>{let s=e[n],i=t[n];Array.isArray(s)&&Array.isArray(i)?r?(e[n]=s.map((a,c)=>i.length<=c?a:mt(a,i[c],r)),i.length>s.length&&(e[n]=e[n].concat(i.slice(s.length)))):e[n]=s.concat(i):o(s)&&o(i)?e[n]=mt(Object.assign({},s),i,r):e[n]=i}),e)};function ob(){return{deferredNextTick:u.store.getProp("deferredNextTick"),throttle:u.store.getProp("throttle"),usePassive:u.store.getProp("usePassive"),mq:Zl,defaultMq:{value:Ql,type:Rs},sequencer:{duration:eu,ease:ks},scrollTrigger:{springConfig:Is,lerpConfig:Ms,markerColor:{startEnd:tu,item:ru}},parallax:{defaultRange:ou,springConfig:Is,lerpConfig:Ms},parallaxTween:{duration:nu,ease:ks},tween:{duration:su,ease:ks,relative:iu},spring:{relative:!1,config:$o},lerp:{relative:!1,precision:.01,velocity:.06}}}var ue=(()=>{let e=ob();return{set:n=>{e=rb(mt(ob(),n)),"usePassive"in n&&u.store.set("usePassive",e.usePassive),"deferredNextTick"in n&&u.store.set("deferredNextTick",e.deferredNextTick),"throttle"in n&&u.store.set("throttle",e.throttle)},get:n=>(n in e||console.warn(`handleSetUp: ${n} is not a setup propierties`),e[n]),print:()=>{console.log("Writable props:"),console.log(e)}}})();var nI=(e="desktop")=>window.innerWidth<ue.get("mq")[e],sI=(e="desktop")=>window.innerWidth>=ue.get("mq")[e],iI=(e="desktop")=>ue.get("mq")[e],ge={max:nI,min:sI,getBreackpoint:iI};var Se=e=>{if(u.checkType(Number,e))return Math.round(e*1e4)/1e4||0;if(Math.abs(e)<1){let t=Number.parseInt(e.toString().split("e-")[1]);t&&(e*=Math.pow(10,t-1),e="0."+Array.from({length:t}).join("0")+e.toString().slice(2))}else{let t=Number.parseInt(e.toString().split("+")[1]);t>20&&(t-=20,e/=Math.pow(10,t),e+=Array.from({length:t+1}).join("0"))}return Number.parseFloat(Number.parseFloat(e).toFixed(4))},tt=(e,t,r)=>Math.min(Math.max(e,t),r),nb=(e,t,r)=>(1-r)*e+r*t,no=(e,t)=>{let r=Object.keys(e).toSorted(),o=Object.keys(t).toSorted();return r.length===o.length&&r.every((n,s)=>n===o[s])},Ns=(e,t)=>{let r=[];for(let o=0;o<e.length;o+=t){let n=e.slice(o,o+t);r.push(n)}return r},sb=(e,t)=>e.map(r=>r[t]);function aI(e){ue.set(e)}function cI(e){return ue.get(e)}function lI(){ue.print()}function uI(e,t){switch(e){case"min":return ge.min(t);case"max":return ge.max(t);case"get":return ge.getBreackpoint(t)}}var H={};To(H,{createLerp:()=>wI,createMasterSequencer:()=>_I,createScrollerTween:()=>TI,createSequencer:()=>SI,createSpring:()=>EI,createStaggers:()=>xI,createTimeTween:()=>CI});var xa=e=>e.map(t=>(t.settled||(t.fromValue=t.currentValue),t)),Ir=e=>e.map(t=>(t.fromValue=t.toValue,t.currentValue=t.toValue,t)),Rn=e=>e.map(t=>(t.toValue=t.currentValue,t.fromValue=t.currentValue,t)),Mr=(e,t)=>{let r=Object.keys(e);return t.map(o=>{if(r.includes(o.prop)){let n=o.fromValue,s=o.toValue;o.fromValue=s,o.toValue=n}return o})},kn=(e,t)=>e.map(r=>(r.toValue=t?r.toValue+r.currentValue:r.toValue,r));var au=(e,t)=>e.map(r=>(r.shouldUpdate&&(r.toValProcessed=t?r.toValue+1e-5:r.toValue-r.fromValue+1e-5),r));var Ca="radial",ir="start";var Nn="center",Pn="edges",An="random",ib="MERGE_FROM_UP",cu="MERGE_FROM_DOWN",Lo="equal",Do="start";var Fo="center",On={type:Lo,each:0,waitComplete:!1,from:ir,grid:{col:1,row:1,direction:"col"}},Ge={index:0,frame:0};var y={PX:"px",VH:"vh",VW:"vw",WPERCENT:"w",HPERCENT:"h",DEGREE:"deg",PLUS_HEIGHT:"+height",PLUS_HEIGHT_HALF:"+halfHeight",PLUS_WIDTH:"+width",PLUS_WIDTH_HALF:"+halfWidth",MINUS_HEIGHT:"-height",MINUS_HEIGHT_HALF:"-halfHeight",MINUS_WIDTH:"-width",MINUS_WIDTH_HALF:"-halfWidth",POSITION_BOTTOM:"bottom",POSITION_TOP:"top",POSITION_LEFT:"left",POSITION_RIGHT:"right",DIRECTION_VERTICAL:"vertical",DIRECTION_HORIZONTAL:"horizontal",TYPE_PARALLAX:"parallax",TYPE_SCROLLTRIGGER:"scrolltrigger",PROP_VERTICAL:"y",PROP_HORIZONTAL:"x",PROP_ROTATE:"rotate",PROP_ROTATEY:"rotateY",PROP_ROTATEX:"rotateX",PROP_ROTATEZ:"rotateZ",PROP_OPACITY:"opacity",PROP_SCALE:"scale",PROP_SCALE_X:"scaleX",PROP_SCALE_Y:"scaleY",PROP_TWEEN:"tween",TWEEN_TWEEN:"parallaxTween",TWEEN_TIMELINE:"sequencer",ALIGN_START:"start",ALIGN_TOP:"top",ALIGN_RIGHT:"right",ALIGN_CENTER:"center",ALIGN_BOTTOM:"bottom",ALIGN_LEFT:"left",ALIGN_END:"end",IN_STOP:"in-stop",IN_BACK:"in-back",OUT_STOP:"out-stop",OUT_BACK:"out-back",EASE_SPRING:"spring",EASE_LERP:"lerp",EASE_PRECISION:.001,SCROLL_UP:"up",SCROLL_DOWN:"down",ON_LEAVE:"ON_LEAVE",ON_LEAVE_BACK:"ON_LEAVE_BACK",ON_ENTER:"ON_ENTER",ON_ENTER_BACK:"ON_ENTER_BACK",ON_NOOP:"ON_NOOP"};var Rr=e=>e.map(t=>`${t} | `).join(""),so=(e,t,r)=>{console.warn(`${e}: ${JSON.stringify(t)} and to ${JSON.stringify(r)} is not equal`)},Nt=e=>{console.warn(`stagger col of grid is out of range, it must be less than ${e} ( staggers length )`)},kr=e=>{console.warn(`tween | sequencer: ${e} is not valid value, must be a number or a Function that return a number`)},ab=e=>{console.warn(`sequencer, start option: ${e} value is not valid, must be a Number`)},cb=e=>{console.warn(`sequencer, end option: ${e} value is not valid, must be a Number`)},lb=()=>{console.warn("relative prop is not allowed inside a timeline")},ub=e=>{console.warn(`Timeline Supend: ${e()} is not a valid value, must be a boolean`)},pb=()=>{console.warn("SyncTimeline: in revese ( or yoyo mode) only goTo || goFromTo || set action is allowed. Using goFrom makes no sense in this context. Enable forceFromTo to use from action in reverse mode")},mb=e=>{console.warn(`timeline setTween: ${e} is not an array of tween`)},db=e=>{console.warn(`timeline setTween: ${e} is not a string`)},hb=e=>{console.warn(`asyncTimeline.setTween() label: ${e} not found`)},fb=()=>{console.warn("setTween fail")},gb=e=>{console.warn(`label ${e} not founded`)},bb=e=>{console.warn(`sequencer.add(fn,time) ${e}: fn must be Function`)},yb=e=>{console.warn(`sequencer.add(fn,time) ${e}: time must be a Number`)},lu=e=>{console.warn(`${e} doesn't exist in spring configuration list`)},vb=()=>{console.warn("Spring configProps: all prop must be a positive Number")},Tb=e=>{console.warn(`Spring config: ${e}: config must have friction/mass/precision/tesnion props and must be a number`)},Bo=e=>{console.warn(`${e} doesn't exist in tweens ease function`)},Ea=()=>{console.warn("stagger each must be a Number ")},Sb=e=>{console.warn(`stagger, row/col: ${e} value is not valid, must be a Number`)},_b=()=>{console.warn("Stagger error: waitComplete propierties must be a Boolean")},xb=()=>{console.warn("Stagger error: in grid option direction should be a string radial/col/row")};var Cb=()=>{console.warn("Stagger error: in col/row direction 'from' propierties must be a string start/end/center/edges or a number")},Eb=e=>{console.warn(`Stagger error: from: ${e} is not a valid value, must be a string start/end/center/edges or a number or a Object {x:Number,y:Number}`)},wb=e=>{console.warn(`duration error: ${e} is not valid duration must be a number`)},Ib=e=>{console.warn(`duration error: ${e} is not valid duration must be a number or a Function that return a number`)},Mb=e=>{console.warn(`repeat error: ${e} is not valid repeat value must be a Number`)};var Rb=e=>{console.warn(`data inizializiation error; ${e} is not a valid value, must be a string`)},kb=e=>{console.warn(`data inizializiation error; ${e} is not a valid value, must be a number`)},Nb=()=>{console.warn("createStaggers error: items array can not be empty")},Pb=()=>{console.warn("createStaggers error: each element of the array must be an Element or an Object")},Ab=()=>{console.warn(`screateStaggers error: type should be: ${Lo} || ${ir} || ${"end"} || ${Fo}`)},Ob=e=>{console.warn(`createStagger:  each must be between 1 and ${e}`)},$b=(e,t)=>{console.warn(`${t}: relative prop: ${e} is not a valid parameter, must be a boolean `)},uu=(e,t)=>{console.warn(`${t}: '${e}' is not Boolean`)},Lb=(e,t)=>{console.warn(`${t}: '${e}' is not String`)},Db=(e,t)=>{console.warn(`${t}: '${e}' is not Number`)},Fb=(e,t)=>{console.warn(`${t}: '${e}' is not Function`)},Bb=()=>{console.warn("Lerp error: velocity is not valid, must be a Number greater than 0 and less than 1")},Vb=()=>{console.warn("Lerp error: precision is not valid, must be a number greater than 0")},Ln=e=>{console.warn(`asyncTimeline error: ${e} cannot be used inside group`)},Wb=e=>{console.warn(`${e} value must be a string`)},jb=()=>{console.warn("tween added to asyncTimeline or used inside sync() method must be instance of HandleLerp | HandleTween | HandleSpring")},zb=()=>{console.warn("asyncTimeline arror: delay must be a Number")},Hb=e=>{console.warn(`${e} not found`)},Ub=e=>{console.warn(`timeline add async function, ${e} is not a function `)},Gb=(e,t)=>{console.warn(`${t} direction: ${e} is not valid value: must be ${y.DIRECTION_VERTICAL} | ${y.DIRECTION_HORIZONTAL}`)},qb=e=>{console.warn(`scrollTrigger error; ${e} propierties: value must be a Object like { position: top|bottom|left|right, value: () => { return Number} } `)},Jb=()=>{console.warn("scrollTrigger error; dynamicRange propierties: value must be a Function that return a Number")},Yb=()=>{console.warn("parallax|scrolTrigger error: tween is not valid, must be an instance of HandleSequencer || ParallaxTween")},Xb=(e,t)=>{console.warn(`parallax error align propierties: ${e} is not valid must be one of ${Rr(t)} or a Number between 0 and 100`)},Kb=(e,t)=>{console.warn(`parallax error align propierties: ${e} is not valid must be one of ${Rr(t)}`)},Qb=(e,t)=>{console.warn(`${t}: '${e}' is not Number, must be a number between 0 and 100`)},Zb=(e,t)=>{console.warn(`parallax error type propierties: ${e} is not valid must be one of ${Rr(t)}`)},ey=(e,t)=>{console.warn(`parallax/scrollTrigger error propierties props: ${e} is not valid must be one of ${Rr(t)} or a custom css propierites like margin|line-height|...`)},ty=(e,t)=>{console.warn(`parallax error easeType props: ${e} is not valid must be one of ${Rr(t)}`)},ry=(e,t,r)=>{console.warn(`${r} error easeType props: ${e} is not valid must be one of ${Rr(t)}`)},oy=()=>{console.warn('Scrolltrigger warning: spring animation is only available for native properties and scrollerTween, Check that with the "propierties" property set to "tween" no HandleSequencer is associated with the "tween" property')},ny=(e,t)=>{console.warn(`parallax/scrollTrigger error springConfig props: ${e} is not valid must be one of ${Rr(t)}`)},sy=e=>{console.warn(`parallax error range propierties, current value: ${e}, the value must be a number between 0 and 9.99`)},iy=e=>{console.warn(`scrollTrigger error range propierties: ${e} is not a String`)},pu=(e,t,r,o)=>{console.warn(`${o} error ${r} propierties: ${e} is not valid must be one of ${Rr(t)}`)},ay=()=>{console.warn("Parallax warning: if propierties is a tween the only choice is ParallaxTween, HandleSequencer or empty tween propierites is not allowed inside a parallax")},cy=()=>{console.warn("parallax/ScrollTrrigger error: velocity is not valid, must be a Number greater than 0 and less than 1")},ly=()=>{console.warn('parallax/ScrollTrrigger warning:  The property is "tween" but no tween has been associated, associate a tween with the "tween" property')},uy=()=>{console.warn('parallax/ScrollTrrigger: there is tween associated but pros "propierties" is not set to "tween"')},py=(e,t)=>{console.warn(`${e}: ${t} is not a function`)},mu=(e,t,r)=>{console.warn(`scrollTrigger error range : with '${t}' propierties ${e} is not valid, add one of the following unit misure: ${Rr(r)}, es: 45deg|100px|50vw etc..`)},my=e=>{console.warn(`scrollTrigger error range : with custom css propierties '${e}' no unit misure is necessary, the default unit misure will be used (px). Only '-' for negative value is allowed`)},dy=(e,t)=>{console.warn(`scrollTrigger error range : with '${t}' propierties ${e} is not valid no unit misure is necessary. Only '-' for negative value is allowed`)};var jt={[he.easeLinear]:(e,t,r,o)=>r*e/o+t,[he.easeInQuad]:(e,t,r,o)=>r*(e/=o)*e+t,[he.easeOutQuad]:(e,t,r,o)=>-r*(e/=o)*(e-2)+t,[he.easeInOutQuad]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e+t:-r/2*(--e*(e-2)-1)+t,[he.easeInCubic]:(e,t,r,o)=>r*(e/=o)*e*e+t,[he.easeOutCubic]:(e,t,r,o)=>r*((e=e/o-1)*e*e+1)+t,[he.easeInOutCubic]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e+t:r/2*((e-=2)*e*e+2)+t,[he.easeInQuart]:(e,t,r,o)=>r*(e/=o)*e*e*e+t,[he.easeOutQuart]:(e,t,r,o)=>-r*((e=e/o-1)*e*e*e-1)+t,[he.easeInOutQuart]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e*e+t:-r/2*((e-=2)*e*e*e-2)+t,[he.easeInQuint]:(e,t,r,o)=>r*(e/=o)*e*e*e*e+t,[he.easeOutQuint]:(e,t,r,o)=>r*((e=e/o-1)*e*e*e*e+1)+t,[he.easeInOutQuint]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e*e*e+t:r/2*((e-=2)*e*e*e*e+2)+t,[he.easeInSine]:(e,t,r,o)=>-r*Math.cos(e/o*(Math.PI/2))+r+t,[he.easeOutSine]:(e,t,r,o)=>r*Math.sin(e/o*(Math.PI/2))+t,[he.easeInOutSine]:(e,t,r,o)=>-r/2*(Math.cos(Math.PI*e/o)-1)+t,[he.easeInExpo]:(e,t,r,o)=>e===0?t:r*Math.pow(2,10*(e/o-1))+t,[he.easeOutExpo]:(e,t,r,o)=>e===o?t+r:r*(-Math.pow(2,-10*e/o)+1)+t,[he.easeInOutExpo]:(e,t,r,o)=>e===0?t:e===o?t+r:(e/=o/2)<1?r/2*Math.pow(2,10*(e-1))+t:r/2*(-Math.pow(2,-10*--e)+2)+t,[he.easeInCirc]:(e,t,r,o)=>-r*(Math.sqrt(1-(e/=o)*e)-1)+t,[he.easeOutCirc]:(e,t,r,o)=>r*Math.sqrt(1-(e=e/o-1)*e)+t,[he.easeInOutCirc]:(e,t,r,o)=>(e/=o/2)<1?-r/2*(Math.sqrt(1-e*e)-1)+t:r/2*(Math.sqrt(1-(e-=2)*e)+1)+t,[he.easeInElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o)===1?t+r:(s||(s=o*.3),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),-(i*Math.pow(2,10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s))+t)},[he.easeOutElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o)===1?t+r:(s||(s=o*.3),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),i*Math.pow(2,-10*e)*Math.sin((e*o-n)*(2*Math.PI)/s)+r+t)},[he.easeInOutElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o/2)===2?t+r:(s||(s=o*(.3*1.5)),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),e<1?-.5*(i*Math.pow(2,10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s))+t:i*Math.pow(2,-10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s)*.5+r+t)},[he.easeInBack]:(e,t,r,o,n=1.70158)=>r*(e/=o)*e*((n+1)*e-n)+t,[he.easeOutBack]:(e,t,r,o,n=1.70158)=>r*((e=e/o-1)*e*((n+1)*e+n)+1)+t,easeInOutBack:(e,t,r,o,n=1.70158)=>(e/=o/2)<1?r/2*(e*e*(((n*=1.525)+1)*e-n))+t:r/2*((e-=2)*e*(((n*=1.525)+1)*e+n)+2)+t,[he.easeInBounce]:(e,t,r,o)=>r-jt[he.easeOutBounce](o-e,0,r,o)+t,[he.easeOutBounce]:(e,t,r,o)=>(e/=o)<1/2.75?r*(7.5625*e*e)+t:e<2/2.75?r*(7.5625*(e-=1.5/2.75)*e+.75)+t:e<2.5/2.75?r*(7.5625*(e-=2.25/2.75)*e+.9375)+t:r*(7.5625*(e-=2.625/2.75)*e+.984375)+t,[he.easeInOutBounce]:(e,t,r,o)=>e<o/2?jt[he.easeInBounce](e*2,0,r,o)*.5+t:jt[he.easeOutBounce](e*2-o,0,r,o)*.5+r*.5+t};var gt=e=>e in jt?jt[e]:(Bo(e),jt[ue.get("tween").ease]);var hy=e=>e?e.replaceAll(/[\s#$()*+,.?[\\\]^{|}-]/g,String.raw`\$&`):"",du=e=>/^[+-]?\d+(\.\d+)?$/.test(e),fy=e=>/^\d+\.\d+$|^\d+$/.test(e),Ae=(e,t)=>{let r=new RegExp(`^${hy(t)}$`,"i");return(e.match(r)||[]).length},ar=(e,t)=>{let r=new RegExp(`[0-9]${t}$`,"i");return(e.match(r)||[]).length},hu=(e,t)=>e.some(r=>{let o=new RegExp(`[0-9]${r}$`,"i");return(t.match(o)||[]).length}),fu=(e,t)=>e.some(r=>{let o=new RegExp(`^${hy(r)}$`,"i");return(t.match(o)||[]).length});var gy=e=>e&&(Ae(e,y.PROP_VERTICAL)?y.PROP_VERTICAL:Ae(e,y.PROP_HORIZONTAL)?y.PROP_HORIZONTAL:Ae(e,y.PROP_ROTATE)?y.PROP_ROTATE:Ae(e,y.PROP_ROTATEY)?y.PROP_ROTATEY:Ae(e,y.PROP_ROTATEX)?y.PROP_ROTATEX:Ae(e,y.PROP_OPACITY)?y.PROP_OPACITY:Ae(e,y.PROP_SCALE)?y.PROP_SCALE:Ae(e,y.PROP_SCALE_X)?y.PROP_SCALE_X:Ae(e,y.PROP_SCALE_Y)?y.PROP_SCALE_Y:Ae(e,y.PROP_TWEEN)?y.PROP_TWEEN:e),by=e=>{if(e){if(ar(e,y.PX))return y.PX;if(ar(e,y.VH))return y.VH;if(ar(e,y.VW))return y.VW}return""},wa=e=>Ae(e,y.POSITION_TOP)?y.POSITION_TOP:Ae(e,y.POSITION_BOTTOM)?y.POSITION_BOTTOM:Ae(e,y.POSITION_LEFT)?y.POSITION_LEFT:Ae(e,y.POSITION_RIGHT)?y.POSITION_RIGHT:"",yy=e=>ar(e,y.PX)?y.PX:ar(e,y.VH)?y.VH:ar(e,y.VW)?y.VW:ar(e,y.WPERCENT)?y.WPERCENT:ar(e,y.HPERCENT)?y.HPERCENT:ar(e,y.DEGREE)?y.DEGREE:y.PX;var zt=e=>u.checkType(Number,e)||u.checkType(Function,e)&&u.checkType(Number,e()),Ma=({start:e,end:t})=>{let r=u.checkType(Number,e),o=u.checkType(Number,t);return r||ab(e),o||cb(t),r&&o},io=e=>{let t=u.checkType(Number,e);return!t&&e&&wb(e),t?e:ue.get("sequencer").duration},Ra=e=>{let t=u.checkType(Number,e);return!t&&e&&Mb(e),t&&e?e:1},vy=e=>{let t=e&&e in jt;return!t&&e&&Bo(e),t?e:ue.get("sequencer").ease},Ty=e=>{let t=e&&e in jt;return!t&&e&&Bo(e),t?gt(e):gt(ue.get("parallaxTween").ease)},Sy=(e,t)=>{let r=u.checkType(String,e),o=u.checkType(Number,t);return r||Rb(e),o||kb(t),r&&o},_y=e=>{if(!e)return;let t=u.checkType(Number,e);return t||Ea(),t},xy=e=>{if(!e)return;let r=[ir,"end",Nn,Pn,An].includes(e),o=u.checkType(Number,e),n=u.checkType(Object,e),s=r||o||n;return s||Eb(e),s},bu=e=>{if(!e)return;let t=u.checkType(Number,e);return t||Sb(e),t},Cy=e=>{if(!e)return;let r=[Ca,"row","col"].includes(e);return r||xb(),r},Ey=e=>{if(!e)return;let t=u.checkType(Boolean,e);return t||_b(),t},wy=(e=[])=>{let t=u.checkType(Array,[...e])&&e.length>0;return t||Nb(),t},Iy=(e=[])=>u.checkType(Array,[...e])&&e.length>0?e:[],My=e=>{if(!e)return;let r=[Lo,Do,"end",Fo].includes(e);if(!r){Ab();return}return r};var ao=(e,t)=>{let r=u.checkType(Boolean,e);return!r&&e&&$b(e,t),r?e:ue.get(t).relative},ka=e=>{let t=e&&e in jt;return!t&&e&&Bo(e),t?gt(e):gt(ue.get("tween").ease)},Na=e=>{let t=e&&e in jt;return!t&&e&&Bo(e),t?e:ue.get("tween").ease},yu=e=>{let{config:t}=ue.get("spring"),r=e&&e in t,o=r?t[e]:{},s=(r?u.checkType(Object,o)&&"tension"in o&&"mass"in o&&"friction"in o&&"velocity"in o&&"precision"in o:!1)?Object.values(o).every(i=>u.checkType(Number,i)&&i>=0):null;return!r&&e&&lu(e),!s&&r&&Tb(e),s?t[e]:t.default},Ry=e=>{let{config:t}=ue.get("spring"),r=e&&e in t;return!r&&e&&lu(e),r},vu=e=>{let t=u.checkType(Object,e)&&Object.values(e).every(r=>u.checkType(Number,r)&&r>=0);return!t&&e&&vb(),t?e:{}},Tu=e=>{let r=u.checkType(Function,e)?e():e,o=u.checkType(Number,r);return!o&&e&&Ib(e),o?r:ue.get("tween").duration},Pt=(e,t)=>{let r=u.checkType(Boolean,e);return!r&&e&&uu(e,t),r&&e===!0},pe=(e,t,r)=>{let o=u.checkType(Boolean,e);return!o&&e&&uu(e,t),o?e:r},Pa=(e,t,r)=>{let o=u.checkType(String,e);return!o&&e&&Lb(e,t),o?e:r},cr=(e,t,r)=>{let o=u.checkType(Number,e);return!o&&e&&Db(e,t),o?e:r},dt=(e,t,r)=>{let o=u.checkType(Function,e);return!o&&e&&Fb(e,t),o?e:r},Aa=e=>{let t=u.checkType(Number,e)&&e>0&&e<=1;return!t&&e&&Bb(),t?e:ue.get("lerp").velocity},Oa=e=>{let t=u.checkType(Number,e);return!t&&e&&Vb(),t?e:ue.get("lerp").precision},ky=(e,t)=>{let r=u.checkType(String,e);return!r&&e&&Wb(t),r},As=e=>{let t=u.checkType(Number,e);return!t&&e&&zb(),t?e:void 0},Os=e=>{let t=e?.getType?.()&&(e.getType()==="LERP"||e.getType()==="SPRING"||e.getType()==="TWEEN");return!t&&e&&jb(),t},Ny=(e,t)=>{e===-1&&Hb(t)},co=(e,t,r)=>{let o=u.checkType(Function,e);return!o&&e&&py(r,e),o?e:t},Py=e=>{let t=u.checkType(Function,e);return!t&&e&&Ub(e),t?e:({resolve:r})=>{r()}},Ay=e=>{let t=u.checkType(Array,e);return!t&&e&&mb(e),t},Oy=e=>{let t=u.checkType(String,e);return!t&&e&&db(e),t},Dn=(e,t=!1)=>{let o=u.checkType(Element,e)?e:document.querySelector(e);return t?o??globalThis:o??document.createElement("div")},Su=e=>u.checkType(Element,e)?e:document.querySelector(e),$s=(e,t)=>{if(!e)return y.DIRECTION_VERTICAL;let o=[y.DIRECTION_VERTICAL,y.DIRECTION_HORIZONTAL].includes(e);return!o&&e&&Gb(e,t),o?e:y.DIRECTION_VERTICAL},_u=(e,t)=>{let r=[y.POSITION_TOP,y.POSITION_LEFT,y.POSITION_RIGHT,y.POSITION_BOTTOM],o=u.checkType(Object,e),n=o&&u.checkType(String,e?.position)&&r.includes(e.position),s=o&&u.checkType(Function,e.value)&&u.checkType(Number,e.value()),i=o&&n&&s;return i||qb(t),i?e:null},$y=e=>{let t=u.checkType(Function,e)&&u.checkType(Number,e?.());return!t&&e&&Jb(),t?e:void 0},Ly=e=>{let t=e?.getType?.()&&(e.getType()===y.TWEEN_TWEEN||e.getType()===y.TWEEN_TIMELINE);return!t&&e&&Yb(),t?e:{}},Dy=e=>{if(!e&&e!==0)return y.ALIGN_CENTER;let t=[y.ALIGN_START,y.ALIGN_TOP,y.ALIGN_RIGHT,y.ALIGN_CENTER,y.ALIGN_BOTTOM,y.ALIGN_LEFT,y.ALIGN_END],r=t.includes(e)||u.checkType(Number,e);return!r&&e&&Xb(e,t),r?e:y.ALIGN_CENTER},Fy=e=>{if(!e)return!1;let t=[y.IN_BACK,y.IN_STOP,y.OUT_BACK,y.OUT_STOP],r=t.includes(e);return!r&&e&&Kb(e,t),r?e:!1},xu=(e,t,r)=>{if(e==null)return r;let o=u.checkType(Number,e);return!o&&e&&Qb(e,t),o?e:r},By=e=>{if(!e)return y.TYPE_PARALLAX;let t=e?.toLowerCase(),r=[y.TYPE_PARALLAX,y.TYPE_SCROLLTRIGGER],o=r.includes(t);return!o&&t&&Zb(t,r),o?t:y.TYPE_PARALLAX},Vy=(e,t)=>(()=>{if(t===y.TYPE_PARALLAX){let o=fy(e),n=u.checkType(Number,Number(e))&&o&&e>=0&&e<10;return!n&&e&&sy(e),n?10-e:10-ue.get("parallax").defaultRange}else{let o=u.checkType(String,e);return!o&&e&&iy(e),o?e:"0px"}})(),Vo=(e,t,r)=>{let o=ue.get("defaultMq").value;if(!e)return o;let n=ue.get("mq"),s=Object.keys(n),i=u.checkType(String,e)&&s.includes(e);return!i&&e&&pu(e,s,t,r),i?e:o},Wo=(e,t,r)=>{let o=ue.get("defaultMq").type;if(!e)return o;let n=[tb,Rs],s=u.checkType(String,e)&&n.includes(e);return!s&&e&&pu(e,n,t,r),s?e:o},Wy=(e,t,r,o)=>{if(!e&&o)return{propierties:y.PROP_VERTICAL,shouldTrackOnlyEvents:!0};if(!e&&r)return{propierties:y.PROP_VERTICAL,shouldTrackOnlyEvents:!1};let n=t===y.TYPE_SCROLLTRIGGER&&!e,s=[y.PROP_VERTICAL,y.PROP_HORIZONTAL,y.PROP_ROTATE,y.PROP_ROTATEY,y.PROP_ROTATEX,y.PROP_ROTATEZ,y.PROP_OPACITY,y.PROP_SCALE,y.PROP_SCALE_X,y.PROP_SCALE_Y,y.PROP_TWEEN],i=u.checkType(String,e);!i&&e&&ey(e,s);let a=t===y.TYPE_PARALLAX&&e===y.PROP_TWEEN&&!r;!r&&!o&&e===y.PROP_TWEEN&&ly(),(r||o)&&e!==y.PROP_TWEEN&&uy(),a&&ay();let c=a?y.PROP_VERTICAL:e,l=gy(c);return{propierties:i?l??y.PROP_VERTICAL:y.PROP_VERTICAL,shouldTrackOnlyEvents:n}},jy=e=>{if(!e)return y.EASE_LERP;let t=[y.EASE_SPRING,y.EASE_LERP],r=t.includes(e);r||ty(e,t);let o=r?e:y.EASE_LERP;return r?e:o},$a=(e,t)=>{let r=[y.EASE_SPRING,y.EASE_LERP],o=r.includes(e);return!o&&e&&ry(e,r,t),o?e:y.EASE_LERP},zy=(e,t)=>{let r=t===y.TYPE_PARALLAX?ue.get("parallax").springConfig:ue.get("scrollTrigger").springConfig;if(!e)return r;let o=ue.get("spring").config,n=Object.keys(o),s=n.includes(e);return!s&&e&&ny(e,n),s?e:r},Hy=(e,t)=>{let r=u.checkType(Number,Number(e))&&e>0&&e<=1;!r&&e&&cy();let o=t===y.TYPE_PARALLAX?ue.get("parallax").lerpConfig:ue.get("scrollTrigger").lerpConfig;return r?e:o},Uy=(e,t)=>{let r=[y.PX,y.VW,y.VH,y.WPERCENT,y.HPERCENT];if(t===y.PROP_VERTICAL||t===y.PROP_HORIZONTAL){let n=hu(r,e);return n||mu(e,t,r),n?e:"0px"}if(t===y.PROP_ROTATE||t===y.PROP_ROTATEX||t===y.PROP_ROTATEY||t===y.PROP_ROTATEZ){let n=hu([y.DEGREE],e);return n||mu(e,t,[y.DEGREE]),n?e:"0"}if(t===y.PROP_SCALE||t===y.PROP_SCALE_X||t===y.PROP_SCALE_Y){let n=du(e);return n||dy(e,t),n?e:"0"}let o=du(e);return o||my(t),o?e:"0"};var La=e=>{let{instantFps:t}=u.store.get(),r=Math.round(e*(t/60));return e===1&&r===0?e:r},At=e=>({type:My(e?.stagger?.type)?e.stagger.type:On.type,each:_y(e?.stagger?.each)?e.stagger.each:On.each,from:xy(e?.stagger?.from)?e?.stagger?.from:Do,grid:{col:bu(e?.stagger?.grid?.col)?e.stagger.grid.col:On.grid.col,row:bu(e?.stagger?.grid?.row)?e.stagger.grid.row:On.grid.row,direction:Cy(e?.stagger?.grid?.direction)?e.stagger.grid.direction:"col"},waitComplete:Ey(e?.stagger?.waitComplete)?e.stagger.waitComplete:On.waitComplete}),lr=(e,t)=>e.length>t.length?e:t;var Ls=e=>e%2,pI=e=>Math.floor(Math.random()*e),mI=(e,t,r)=>{let o=new Set(e.slice(0,r).map(i=>i.frame));return e.map((i,a)=>a*t).filter(i=>!o.has(i))},dI=(e,t,r,o=[])=>{let{from:n,each:s}=r,i=La(s);if(n===An)return{index:e,frame:o[pI(o.length)]};if(n===ir)return{index:e,frame:e*i};if(n==="end")return{index:e,frame:(t-1-e)*i};if(n===Nn){let a=Math.trunc(t/2);return e>a?{index:e,frame:(e-a)*i}:e<a?Ls(t)===0&&a-e===1?{index:e,frame:0}:Ls(t)===0?{index:e,frame:(a-e-1)*i}:{index:e,frame:(a-e)*i}:{index:e,frame:0}}if(n===Pn){let a=Math.trunc(t/2);return e>a?{index:e,frame:(t-a-1-(e-a))*i}:e<a?Ls(t)===0&&a-e===1?{index:e,frame:(a-1)*i}:Ls(t)===0?{index:e,frame:(t-a-(a-e))*i}:{index:e,frame:(t-a-1-(a-e))*i}:Ls(t)?{index:e,frame:a*i}:{index:e,frame:(a-1)*i}}if(n&&Le(Number,n)){let a=n>=t?t-1:n;return e>a?{index:e,frame:(e-a)*s}:e<a?{index:e,frame:(a-e)*s}:{index:e,frame:0}}return{index:0,frame:0}},Gy=(e,t,r)=>{if(t.grid.direction==="row"){let o=Ns(e,r);return[...[...Array.from({length:t.grid.col}).keys()].reduce((s,i,a)=>[...s,...sb(o,a)],[])].flat()}else return e},qy=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=r?.grid?.col<=1?e.length:r.grid.col,i=r?.grid?.row<=1?e.length:r.grid.row,c=Gy(e,r,s).map(b=>b&&b!==void 0?b:{index:0,frame:0}),p=Gy(t,r,s).map(b=>b&&b!==void 0?b:{index:0,frame:0}),d=r.grid.direction==="row"?i:s,f=Ns(c,d),h=f[0];return h.forEach((b,T)=>{let{index:_,frame:S}=dI(T,f[0].length,r,mI(h,r.each,T));b.index=_,b.frame=S,S>=o.frame&&(o={index:_,frame:S}),S<=n.frame&&(n={index:_,frame:S})}),f.forEach(b=>{b.forEach((T,_)=>{T&&(T.index=f[0][_].index,T.frame=f[0][_].frame)})}),f.flat().forEach((b,T)=>{c[T].index=b.index,c[T].frame=b.frame,p.length>0&&(p[T].index=b.index,p[T].frame=b.frame)}),{staggerArray:c,staggerArrayOnComplete:p,fastestStagger:n,slowlestStagger:o}};var hI=(e,t,r)=>e.reduce((o,n,s)=>{let i=Math.abs(s-r),a=n.reduce((c,l,p)=>p<t-i||p>t+i?c:[...c,l],[]);return[...o,a]},[]),fI=(e,t,r,o)=>e.reduce((n,s,i)=>{let a=Math.abs(i-r),c=[];if(i>=r&&i<=r*2)return[...n,c];let l=t-a,p=t+a;for(let f=0;f<a;f++)Da(o,r+f,l)&&c.push(o[r+f][l]),Da(o,r+f,p)&&c.push(o[r+f][p]),f>0&&(Da(o,r-f,l)&&c.push(o[r-f][l]),Da(o,r-f,p)&&c.push(o[r-f][p]));let d=c.filter(f=>f!=null);return[...n,d]},[]),Da=(e,t,r)=>e[t]!==void 0&&e[t][r]!==void 0,Cu=(e,t)=>{let{col:r}=t.grid,{x:o,y:n}=t.from,s=Ns(e,r);[...Array.from({length:r}).keys()].forEach(()=>{s.push([])});let i=hI(s,o,n),a=fI(i,o,n,s),c=i.reduce((h,v,b)=>{let T=[...i[b],...a[b]];return h.push(T),h},[]),l=c.length;return{cleanArray:((n>=l/2?ib:cu)===cu?c.reduce((h,v,b)=>{if(b<n)return h;if(b===n){let T=[...c[b]];return h.push(T),h}else{let T=c[n-(b-n)]??[],_=[...c[b],...T];return h.push(_),h}},[]):c.reduce((h,v,b)=>{if(b>n)return h;if(b===n){let T=[...c[b]];return h.push(T),h}else{let T=c[n+(n-b)]??[],_=[...c[b],...T];return h.push(_),h}},[]).toReversed()).reduce((h,v)=>v.length===0?h:[...h,v],[])}};var gI=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{u.checkType(Object,r?.from)||(r.from={}),u.checkType(Number,r?.from?.x)||(r.from={...r.from,x:0}),u.checkType(Number,r?.from?.y)||(r.from={...r.from,y:0});let{cleanArray:s}=Cu(e,r),i=0;s.forEach((p,d)=>{p.forEach(f=>{let h=La(r.each),v=d*h;f.index=i,f.frame=v,v>=o.frame&&(o={index:i,frame:v}),v<=n.frame&&(n={index:i,frame:v}),i++})});let a=(()=>{if(t.length>0){let{cleanArray:p}=Cu(t,r);return p.flat()}else return[]})(),c=s.flat(),l=a.flat();return c.forEach((p,d)=>{l.length>0&&(l[d].index=p.index,l[d].frame=p.frame)}),{staggerArray:c,staggerArrayOnComplete:l,fastestStagger:n,slowlestStagger:o}},bI=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=[ir,"end",Nn,Pn,An];return(!u.checkType(String,r?.from)&&!u.checkType(Number,r?.from)||u.checkType(String,r?.from)&&!s.includes(r?.from))&&(Cb(),r.from=ir),qy({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})},Ot=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=r?.grid?.direction===Ca?gI({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n}):bI({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n}),i=s.staggerArray,a=s.staggerArrayOnComplete,c=s.fastestStagger,l=s.slowlestStagger;return{staggerArray:i,staggerArrayOnComplete:a,fastestStagger:c,slowlestStagger:l}};var Fn=({stagger:e,callback:t,callbackCache:r,callBackObject:o,useStagger:n})=>{if(e.each===0||!n){u.useFrame(()=>{t.forEach(({cb:s})=>{s(o)})}),u.useFrame(()=>{r.forEach(({cb:s})=>{u.useCache.fireObject({id:s,obj:o})})});return}t.forEach(({cb:s,frame:i})=>{u.useFrameIndex(()=>{s(o)},i)}),r.forEach(({cb:s,frame:i})=>{u.useCache.update({id:s,callBackObject:o,frame:i})})},Bn=({onComplete:e,callback:t,callbackCache:r,callbackOnComplete:o,callBackObject:n,stagger:s,slowlestStagger:i,fastestStagger:a,useStagger:c})=>{if(s.each===0||!c){e(),u.useNextFrame(()=>{t.forEach(({cb:l})=>{l(n)}),r.forEach(({cb:l})=>{u.useCache.fireObject({id:l,obj:n})}),o.forEach(({cb:l})=>{l(n)})});return}t.forEach(({cb:l,frame:p},d)=>{u.useFrameIndex(()=>{if(s.waitComplete){d===i.index&&(l(n),e());return}d===a.index&&(l(n),e())},p)}),r.forEach(({cb:l,frame:p},d)=>{u.useFrameIndex(()=>{if(s.waitComplete){d===i.index&&(u.useCache.fireObject({id:l,obj:n}),e());return}d===a.index&&(u.useCache.fireObject({id:l,obj:n}),e())},p)}),o.forEach(({cb:l,frame:p})=>{u.useFrameIndex(()=>{l(n)},p+1)})};var Ds=u.createStore({id:0});var ht=(e,t)=>{let{id:r}=Ds.get(),o=[...t,{cb:e,id:r,index:-1,frame:-1}],n=r;return Ds.quickSetProp("id",r+1),{arrayOfCallbackUpdated:o,unsubscribeCb:s=>s.map(({id:i,cb:a,index:c,frame:l})=>(i===n&&(a=()=>{}),{id:i,cb:a,index:c,frame:l}))}},ur=(e,t,r,o)=>{let{id:n}=Ds.get(),{id:s,unsubscribe:i}=u.useCache.add(e,t),a=[...r,{cb:s,id:n,index:-1,frame:-1}];o.push(i);let c=n;return Ds.quickSetProp("id",n+1),{arrayOfCallbackUpdated:a,unsubscribeCache:o,unsubscribeCb:l=>(i(),l.map(({id:p,cb:d,index:f,frame:h})=>(p===c&&(d=""),{id:p,cb:d,index:f,frame:h})))}};var lo=e=>Object.keys(e).map(t=>{if(!zt(e[t]))return kr(`${t}: ${e[t]}`),{prop:t,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let r=u.checkType(Number,e[t])?e[t]:e[t]?.()??0;return{prop:t,toValue:r,toFn:e[t],toIsFn:u.checkType(Function,e[t]),settled:!1}}),Vn=e=>Object.keys(e).map(t=>{if(!zt(e[t]))return kr(`${t}: ${e[t]}`),{prop:t,fromValue:0,currentValue:0,fromFn:()=>0,fromIsFn:!1,settled:!1};let r=u.checkType(Number,e[t])?e[t]:e[t]?.()??0;return{prop:t,fromValue:r,currentValue:r,fromFn:e[t],fromIsFn:u.checkType(Function,e[t]),settled:!1}}),Wn=(e,t)=>Object.keys(e).map(r=>{if(!zt(t[r])||!zt(e[r]))return kr(`${r}: ${t[r]} || ${r}: ${e[r]}`),{prop:r,fromValue:0,fromFn:()=>0,fromIsFn:!1,currentValue:0,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let o=u.checkType(Number,e[r])?e[r]:e[r]?.()??0,n=u.checkType(Number,t[r])?t[r]:t[r]?.()??0;return{prop:r,fromValue:o,fromFn:e[r],fromIsFn:u.checkType(Function,e[r]),currentValue:o,toValue:n,toFn:t[r],toIsFn:u.checkType(Function,t[r]),settled:!1}}),Nr=e=>Object.keys(e).map(t=>{if(!zt(e[t]))return kr(`${t}: ${e[t]}`),{prop:t,fromValue:0,fromFn:()=>0,fromIsFn:!1,currentValue:0,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let r=u.checkType(Number,e[t])?e[t]:e[t]?.()??0;return{prop:t,fromValue:r,fromFn:e[t],fromIsFn:u.checkType(Function,e[t]),currentValue:r,toValue:r,toFn:e[t],toIsFn:u.checkType(Function,e[t]),settled:!1}});var jn=({validationFunction:e,defaultRafInit:t})=>{u.useFrame(()=>{u.useNextTick(({time:r,fps:o})=>{let n=e.findLast(({validation:s})=>s());if(t(r,o),n){n?.callback(),console.log("custom tween run function extrecuted");return}})})};var uo=(e,t)=>{console.log(`stagger on ${e} loaded at: ${t} fps`)};var zn=(e,t,r,o)=>(u.checkType(Number,e)||Ea(),e>0&&t&&(r.length>0||o.length>0));var Fa=e=>{u.useFrame(()=>{u.useNextTick(({time:t,fps:r})=>{e(t,r)})})};var Oe=(e,t)=>Object.fromEntries(e.map(r=>{let o=r[t];return[r.prop,typeof o=="number"?o:Number.parseFloat(o)]})),Hn=e=>e.map(t=>t.toIsFn?{[t.prop]:t.toFn}:{[t.prop]:Number.parseFloat(t.toValue)}).reduce((t,r)=>({...t,...r}),{}),Un=e=>e.map(t=>t.fromIsFn?{[t.prop]:t.fromFn}:{[t.prop]:Number.parseFloat(t.fromValue)}).reduce((t,r)=>({...t,...r}),{});var Gn=(e,t)=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o}:r}),Eu=(e,t)=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o,shouldUpdate:!0}:{...r,shouldUpdate:!1}});var Jy=({values:e,fps:t,velocity:r,precision:o})=>e.map(n=>{if(n.settled)return n;let{currentValue:s,toValue:i}=n,a=nb(s,i,r/t*60),c=Se(a);return Number(Math.abs(i-c).toFixed(4))<=o?{...n,currentValue:i,settled:!0}:{...n,currentValue:c,settled:!1}});var Pr=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#_;#v;#y;#T;#R;#S;constructor(t){this.#n=At(t??{}),this.#t=ao(t?.relative,"lerp"),this.#i=Aa(t?.velocity),this.#l=Oa(t?.precision),this.#d=u.getUnivoqueId(),this.#u=!1,this.#s=void 0,this.#c=void 0,this.#r=void 0,this.#e=[],this.#p=[],this.#a=[],this.#h=[],this.#f=[],this.#o=[],this.#g=[],this.#m=!1,this.#x=!0,this.#_=!0,this.#v=!1,this.#y=!1,this.#T={reverse:!1,velocity:this.#i,precision:this.#l,relative:this.#t,immediate:!1},this.#R=Ge,this.#S=Ge;let r=t?.data;r&&this.setData(r)}#w(t,r){this.#u=!0,this.#e=Jy({values:this.#e,fps:r,velocity:this.#i,precision:this.#l});let o=Oe(this.#e,"currentValue");if(this.#m||Fn({stagger:this.#n,callback:this.#a,callbackCache:this.#h,callBackObject:o,useStagger:this.#_}),this.#e.every(s=>s.settled===!0)){let s=()=>{this.#u=!1,this.#e=[...this.#e].map(a=>({...a,fromValue:a.toValue})),this.#s?.(!0),this.#r=void 0,this.#c=void 0,this.#s=void 0,this.#m=!1,this.#u=!1},i=Oe(this.#e,"toValue");Bn({onComplete:s,callback:this.#a,callbackCache:this.#h,callbackOnComplete:this.#f,callBackObject:i,stagger:this.#n,slowlestStagger:this.#R,fastestStagger:this.#S,useStagger:this.#_});return}u.useFrame(()=>{u.useNextTick(({time:s,fps:i})=>{this.#u&&this.#w(s,i)})})}#A(t,r){this.#w(t,r)}async#k(){if(zn(this.#n.each,this.#x,this.#h,this.#a)){let{averageFPS:t}=await u.useFps();uo("lerp",t);let r=lr(this.#h,this.#a);if(this.#n.grid.col>r.length){Nt(r.length),this.#x=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=Ot({arrayDefault:r,arrayOnStop:this.#f,stagger:this.#n,slowlestStagger:this.#R,fastestStagger:this.#S});this.#h.length>this.#a.length?this.#h=o:this.#a=o,this.#f=n,this.#R=i,this.#S=s,this.#x=!1}return{ready:!0}}async#O(t,r){this.#y||(this.#s=t,this.#c=r,this.#x&&(this.#y=!0,await this.#k(),this.#y=!1),jn({validationFunction:this.#o,defaultRafInit:(o,n)=>this.#A(o,n)}))}clearCurretPromise(){this.#m||(this.#c?.(u.ANIMATION_STOP_REJECT),this.#r=void 0,this.#c=void 0,this.#s=void 0,this.#u=!1)}stop({clearCache:t=!0,updateValues:r=!0}={}){this.#m&&(this.#m=!1),r&&(this.#e=Rn(this.#e)),this.unFreezeStagger(),t&&this.#h.forEach(({cb:o})=>u.useCache.clean(o)),this.#c&&(this.#c(u.ANIMATION_STOP_REJECT),this.#r=void 0,this.#c=void 0,this.#s=void 0),this.#u=!1}freezeStagger(){this.#v||(this.#h.forEach(({cb:t})=>u.useCache.freeze(t)),this.#v=!0)}unFreezeStagger({updateFrame:t=!0}={}){this.#v&&(this.#h.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:t})),this.#v=!1)}pause(){this.#m||(this.#m=!0,this.#u=!1,this.#e=xa(this.#e),this.freezeStagger())}resume(){this.#m&&(this.#m=!1,this.unFreezeStagger(),!this.#u&&this.#s&&Fa((t,r)=>this.#A(t,r)))}setData(t){this.#e=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,fromValue:n,currentValue:n,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#p=this.#e.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#e=mt(this.#e,this.#p)}#E(t){let r={...this.#T,...t},{velocity:o,precision:n,relative:s}=r;return this.#t=ao(s,"lerp"),this.#i=Aa(o),this.#l=Oa(n),r}goTo(t,r={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#_=!0;let o=lo(t);return this.#N(o,t,r)}goFrom(t,r={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#_=!0;let o=Vn(t);return this.#N(o,t,r)}goFromTo(t,r,o={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);if(this.#_=!0,!no(t,r))return so("lerp goFromTo:",t,r),new Promise(s=>s);let n=Wn(t,r);return this.#N(n,t,o)}set(t,r={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#_=!1;let o=Nr(t);return this.#N(o,t,r)}setImmediate(t,r={}){if(this.#u&&this.stop({clearCache:!1,updateValues:!1}),this.#m)return;this.#_=!1;let o=Nr(t);this.#e=Gn(o,this.#e);let{reverse:n}=this.#E(r??{});Pt(n,"reverse")&&(this.#e=Mr(t,this.#e)),this.#e=kn(this.#e,this.#t),this.#e=Ir(this.#e)}#N(t,r,o={}){this.#e=Gn(t,this.#e);let{reverse:n,immediate:s}=this.#E(o??{});if(Pt(n,"reverse")&&(this.#e=Mr(r,this.#e)),this.#e=kn(this.#e,this.#t),Pt(s,"immediate "))return this.#u&&this.stop({updateValues:!1}),this.#e=Ir(this.#e),Promise.resolve();let i=!this.#u&&!this.#r;return i&&(this.#r=new Promise((a,c)=>{this.#O(a,c)})),i&&this.#r?this.#r:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return Oe(this.#e,"currentValue")}getInitialData(){return Oe(this.#p,"currentValue")}getFrom(){return Oe(this.#e,"fromValue")}getTo(){return Oe(this.#e,"toValue")}getFromNativeType(){return Un(this.#e)}getToNativeType(){return Hn(this.#e)}getType(){return"LERP"}getId(){return this.#d}isActive(){return this.#u}updateVelocity(t){this.#i=Aa(t),this.#T=mt(this.#T,{velocity:this.#i})}updatePrecision(t){this.#i=Oa(t),this.#T=mt(this.#T,{precision:this.#l})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ht(t,this.#a);return this.#a=r,()=>this.#a=o(this.#a)}subscribeCache(t,r){let{arrayOfCallbackUpdated:o,unsubscribeCb:n,unsubscribeCache:s}=ur(t,r,this.#h,this.#g);return this.#h=o,this.#g=s,()=>this.#h=n(this.#h)}validateInitialization({validation:t,callback:r}){let o=[...this.#o,{validation:t,callback:r}];return this.#o=o,()=>this.#o=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ht(t,this.#f);return this.#f=r,()=>this.#f=o(this.#f)}destroy(){this.#r&&this.stop(),this.#f=[],this.#o=[],this.#a=[],this.#h=[],this.#e=[],this.#r=void 0,this.#g.forEach(t=>t()),this.#g=[]}};var Ba=({each:e,useStagger:t,isLastDraw:r,callBackObject:o,callback:n,callbackCache:s,callbackOnStop:i})=>{e===0||t===!1?(u.useFrame(()=>{n.forEach(({cb:a})=>a(o))}),u.useFrame(()=>{s.forEach(({cb:a})=>{u.useCache.fireObject({id:a,obj:o})})})):(n.forEach(({cb:a,frame:c})=>{u.useFrameIndex(()=>a(o),c)}),s.forEach(({cb:a,frame:c})=>{u.useCache.update({id:a,callBackObject:o,frame:c})})),r&&(e===0||t===!1?u.useFrame(()=>{i.forEach(({cb:a})=>a(o))}):i.forEach(({cb:a,frame:c})=>{u.useFrameIndex(()=>a(o),c+1)}))};var Fs=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;constructor(t){this.#n=Ty(t?.ease),this.#t=io(t?.duration),this.#i=At(t),this.#l=[],this.#d=[],this.#u=[],this.#s=[],this.#c=[],this.#r="parallaxTween";let r=t?.from||null;r&&this.setData(r),t?.to&&this.goTo(t.to)}inzializeStagger(){if(this.#i.each>0&&(this.#s.length>0||this.#u.length>0)){let t=lr(this.#s,this.#u);if(this.#i.grid.col>t.length){Nt(t.length);return}let{staggerArray:r,staggerArrayOnComplete:o}=Ot({arrayDefault:t,arrayOnStop:this.#d,stagger:this.#i,slowlestStagger:Ge,fastestStagger:Ge});this.#s.length>this.#u.length?this.#s=r:this.#u=r,this.#d=o}}draw({partial:t,isLastDraw:r}){this.#l=[...this.#l].map(n=>{let{toIsFn:s,toFn:i,toValue:a,fromIsFn:c,fromFn:l,fromValue:p}=n,d=s?i():a,f=c?l():p,h=d-f,v=this.#n(t,f,h,this.#t);return{...n,currentValue:Se(v)}});let o=Oe(this.#l,"currentValue");u.useNextTick(()=>{Ba({each:this.#i.each,useStagger:!0,isLastDraw:r,callBackObject:o,callback:this.#u,callbackCache:this.#s,callbackOnStop:this.#d})})}setData(t){let r=Object.entries(t);return this.#l=r.map(o=>{let[n,s]=o;return{prop:n,toValue:s,toValProcessed:s,fromValue:s,currentValue:s,settled:!1,fromFn:()=>0,toFn:()=>0}}),this}#e(t){this.#l=this.#l.map(r=>{let o=t.find(n=>n.prop===r.prop);return o?{...r,...o}:{...r}})}goTo(t){let r=lo(t);return this.#e(r),this}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ht(t,this.#u);return this.#u=r,()=>this.#u=o(this.#u)}onStop(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ht(t,this.#d);return this.#d=r,()=>this.#d=o(this.#d)}subscribeCache(t,r){let{arrayOfCallbackUpdated:o,unsubscribeCb:n,unsubscribeCache:s}=ur(t,r,this.#s,this.#c);return this.#s=o,this.#c=s,()=>this.#s=n(this.#s)}getDuration(){return this.#t}getType(){return this.#r}destroy(){this.#l=[],this.#d=[],this.#u=[],this.#s=[],this.#c.forEach(t=>t()),this.#c=[]}};var Bs=class{#n="sequencer";#t;constructor(){this.#t=[]}draw({partial:t,isLastDraw:r,useFrame:o}){this.#t.forEach(n=>{n.draw({partial:t,isLastDraw:r,useFrame:o})})}add(t){this.#t.push(t)}inzializeStagger(){this.#t.forEach(t=>{t.inzializeStagger()})}setDuration(t){this.#t.forEach(r=>{r.setDuration(t)})}getDuration(){return this.#t.length>0?this.#t[0].getDuration():0}setStretchFactor(t){this.#t.forEach(r=>{r.setStretchFactor(t)})}getLabels(){return this.#t.flatMap(t=>t.getLabels())}resetLastValue(){this.#t.forEach(t=>t.resetLastValue())}disableStagger(){this.#t.forEach(t=>{t.disableStagger()})}cleanCachedId(){this.#t.forEach(t=>{t.cleanCachedId()})}freezeCachedId(){this.#t.forEach(t=>{t.freezeCachedId()})}unFreezeCachedId(){this.#t.forEach(t=>{t.unFreezeCachedId()})}getType(){return this.#n}destroy(){this.#t.forEach(t=>{t.destroy()}),this.#t=[]}};var Yy=(e,t)=>Object.keys(e).map(r=>zt(e[r])?{prop:r,toValue:e[r],ease:gt(t)}:(kr(`${r}: ${e[r]}`),{prop:r,toValue:0,ease:gt(t)})),Xy=(e,t)=>Object.keys(e).map(r=>zt(e[r])?{prop:r,fromValue:e[r],ease:gt(t)}:(kr(`${r}: ${e[r]}`),{prop:r,fromValue:0,ease:gt(t)})),Ky=(e,t,r)=>Object.keys(e).map(o=>!zt(t[o])||!zt(e[o])?(kr(`${o}: ${t[o]} || ${o}: ${e[o]}`),{prop:o,fromValue:0,toValue:0,ease:gt(r)}):{prop:o,fromValue:e[o],toValue:t[o],ease:gt(r)});var je={BACKWARD:"backward",FORWARD:"forward",NONE:"none"};var wu={fromValue:{get:"toValue",set:"fromValue"},toValue:{get:"toValue",set:"toValue"}},Qy=(e,t,r,o)=>e.slice(0,t).reduceRight((n,{values:s})=>{let i=s.find(({prop:a,active:c})=>c&&a===r);return i&&!n&&n!==0?i[wu[o].get]:n},void 0),Zy=(e,t,r,o)=>e.slice(t+1).reduce((n,{start:s,values:i})=>i.find(c=>c.prop===r&&c.active)&&s<=o?!1:n,!0);var ev=({timeline:e,valuesState:t,partial:r})=>t.map(o=>{let n=e.reduce((_,{start:S,end:C,values:E},w)=>{let M=E.find(({prop:V})=>V===o.prop);if(!M||!M?.active||Object.keys(_).length>0||o.settled)return _;let{prop:A,toValue:R,fromValue:L,ease:D}=M;return Zy(e,w,A,r)?{toValue:R,fromValue:L,start:S,end:C,ease:D}:_},{});if(Object.keys(n).length===0)return o;let{start:s,end:i,toValue:a,fromValue:c,ease:l}=n,p=u.checkType(Number,a)?a:a(),d=u.checkType(Number,c)?c:c(),f=i-s,h=r<i?d:p,v=r>=s&&r<=i?l(r-s,d,p-d,f):h,b=Number.isNaN(v)?h:v,T=Se(b);return{...o,currentValue:T,settled:!0}});var Iu=({timeline:e,activeProp:t})=>e.map((r,o)=>{let{values:n,propToFind:s}=r,i=n.map(a=>{let{prop:c,active:l}=a;if(!l||!t.includes(c)||!s||s.length===0)return a;let p=Qy(e,o,c,s);return!p&&p!==0?a:{...a,[wu[s].set]:p}});return{...r,values:i}});var Mu=(e,t)=>e.toSorted((r,o)=>r?.[t]-o?.[t]);var Va=({timeline:e,values:t,start:r,end:o,duration:n,propToFind:s})=>{let i=e.length===0?0:1,a=[...e,{values:t,start:r??0,end:o??n,priority:i,propToFind:s}],c=Mu(a,"start");return Mu(c,"priority")};var Wa=({data:e,values:t})=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o,active:!0}:{prop:r.prop,active:!1}});var Vs=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;constructor(t){this.#n=[],this.#t=[],this.#i=[],this.#l=[],this.#d=[],this.#u=[],this.#s=[],this.#c=[],this.#r=io(t?.duration),this.#e="sequencer",this.#p={start:0,end:this.#r,ease:vy(t?.ease)},this.#a=!0,this.#h=!0,this.#f="none",this.#o=0,this.#g=At(t),this.#m=!0,this.#x=!1;let r=t?.data||null;r&&this.setData(r)}inzializeStagger(){if(!this.#x){if(this.#g.each>0&&(this.#d.length>0||this.#l.length>0)){let t=lr(this.#d,this.#l);if(this.#g.grid.col>t.length){Nt(t.length);return}let{staggerArray:r,staggerArrayOnComplete:o}=Ot({arrayDefault:t,arrayOnStop:this.#u,stagger:this.#g,slowlestStagger:Ge,fastestStagger:Ge});this.#d.length>this.#l.length?this.#d=r:this.#l=r,this.#u=o}this.#x=!0}}draw({partial:t=0,isLastDraw:r=!1,useFrame:o=!1,direction:n=je.NONE}){if(o){this.#_({partial:t,isLastDraw:r,direction:n});return}u.useNextTick(()=>this.#_({partial:t,isLastDraw:r,direction:n}))}#_({partial:t=0,isLastDraw:r=!1,direction:o=je.NONE}){this.#a&&(this.#o=t,this.#v(t)),!this.#a&&this.#o&&(!o||o===je.NONE)&&(this.#f=t>=this.#o?je.FORWARD:je.BACKWARD),!this.#a&&(o===je.BACKWARD||o===je.FORWARD)&&(this.#f=o),this.#n=[...this.#n].map(s=>({...s,settled:!1})),this.#n=ev({timeline:this.#t,valuesState:this.#n,partial:t});let n=Oe(this.#n,"currentValue");Ba({each:this.#g.each,useStagger:this.#m,isLastDraw:r,callBackObject:n,callback:this.#l,callbackCache:this.#d,callbackOnStop:this.#u}),this.#y(t),this.#m=!0,this.#o=t,this.#a=!1}resetLastValue(){this.#a=!0,this.#o=0}#v(t=0){this.#h&&(this.#s.forEach(({fn:r,time:o})=>{let n={shouldFire:t>=o,direction:je.FORWARD},s={shouldFire:t<=o,direction:je.BACKWARD};if(!(n.shouldFire||s.shouldFire))return;let a=n.shouldFire?n.direction:s.direction;r({direction:a,value:t,isForced:!0})}),this.#h=!1)}#y(t=0){this.#s.forEach(({fn:r,time:o})=>{let n=this.#f===je.FORWARD&&t>o&&this.#o<=o,s=this.#f===je.BACKWARD&&t<o&&this.#o>=o;(n||s)&&r({direction:this.#f,value:t,isForced:!1})})}setStretchFactor(t=0){let r=t/this.#r;this.#t=[...this.#t].map(o=>{let{start:n,end:s}=o;return{...o,start:Se(n*r),end:Se(s*r)}}),this.#i=[...this.#i].map(o=>{let{time:n}=o;return{...o,time:Se(n*r)}}),this.#s=[...this.#s].map(o=>{let{time:n}=o;return{...o,time:Se(n*r)}})}setData(t={}){return this.#n=Object.entries(t).map(r=>{let[o,n]=r,s=Sy(o,n),i=s?n:0;return{prop:s?o:"invalidProp",toValue:i,fromValue:i,currentValue:i,active:!1,settled:!1,ease:gt(ue.get("sequencer").ease)}}),this.goTo(t,{start:0,end:0}),this}goTo(t,r){let o={...this.#p,...r},{start:n,end:s,ease:i}=o;if(!Ma({start:n,end:s}))return this;let a=Yy(t,i),c=Wa({data:a,values:this.#n}),l=Object.keys(t),p=Va({timeline:this.#t,values:c,start:n,end:s,duration:this.#r,propToFind:"fromValue"});return this.#t=Iu({timeline:p,activeProp:l}),this}goFrom(t,r){let o={...this.#p,...r},{start:n,end:s,ease:i}=o;if(!Ma({start:n,end:s}))return this;let a=Xy(t,i),c=Wa({data:a,values:this.#n}),l=Object.keys(t),p=Va({timeline:this.#t,values:c,start:n,end:s,duration:this.#r,propToFind:"toValue"});return this.#t=Iu({timeline:p,activeProp:l}),this}goFromTo(t,r,o){let n={...this.#p,...o},{start:s,end:i,ease:a}=n;if(!Ma({start:s,end:i}))return this;if(!no(t,r))return so("sequencer goFromTo:",t,r),this;let c=Ky(t,r,a),l=Wa({data:c,values:this.#n});return this.#t=Va({timeline:this.#t,values:l,start:s,end:i,duration:this.#r,propToFind:""}),this}label(t="",r=0){return this.#i.push({name:t,time:r}),this}getLabels(){return this.#i}add(t=()=>{},r=0){let o=u.checkType(Function,t),n=u.checkType(Number,r),s=o&&n;return o||bb(t),n||yb(r),s?(this.#s.push({fn:t,time:r}),this):this}subscribe(t=()=>{}){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ht(t,this.#l);return this.#l=r,()=>this.#l=o(this.#l)}onStop(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ht(t,this.#u);return this.#u=r,()=>this.#u=o(this.#u)}subscribeCache(t,r=()=>{}){let{arrayOfCallbackUpdated:o,unsubscribeCb:n,unsubscribeCache:s}=ur(t,r,this.#d,this.#c);return this.#d=o,this.#c=s,()=>this.#d=n(this.#d)}getDuration(){return this.#r}setDuration(t=0){this.#r=t}getType(){return this.#e}cleanCachedId(){this.#d.forEach(({cb:t})=>u.useCache.clean(t))}freezeCachedId(){this.#d.forEach(({cb:t})=>u.useCache.freeze(t))}unFreezeCachedId(){this.#d.forEach(({cb:t})=>u.useCache.unFreeze({id:t,update:!0}))}disableStagger(){this.#m=!1}destroy(){this.#n=[],this.#t=[],this.#l=[],this.#d=[],this.#u=[],this.#s=[],this.#c.forEach(t=>t()),this.#c=[]}};var tv=({values:e,tension:t,friction:r,mass:o,precision:n,fps:s})=>e.map(i=>{let{currentValue:a,toValue:c,velocity:l}=i,p=-t*(a-c),d=-r*l,f=(p+d)/o,h=l+f*1/s,v=a+h*1/s,b=Se(v),T=Math.abs(h)<=.1,_=t===0?!0:Math.abs(c-b)<=n;return T&&_?{...i,currentValue:c,velocity:h,settled:!0}:{...i,currentValue:b,velocity:h,settled:!1}});var Ht=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#_;#v;#y;#T;#R;constructor(t){this.#n=At(t??{}),this.#t=ao(t?.relative,"spring"),this.#i=yu(t?.config),this.updateConfigProp(t?.configProps??{}),this.#l=u.getUnivoqueId(),this.#d=!1,this.#u=void 0,this.#s=void 0,this.#c=void 0,this.#r=[],this.#e=[],this.#p=[],this.#a=[],this.#h=[],this.#f=[],this.#o=[],this.#g=!1,this.#m=!0,this.#x=!0,this.#_=!1,this.#v=!1,this.#y={reverse:!1,configProps:this.#i,relative:this.#t,immediate:!1},this.#T=Ge,this.#R=Ge;let r=t?.data;r&&this.setData(r)}#S(t,r,o,n,s,i){this.#d=!0,this.#r=tv({values:this.#r,tension:o,friction:n,mass:s,precision:i,fps:r});let a=Oe(this.#r,"currentValue");if(this.#g||Fn({stagger:this.#n,callback:this.#p,callbackCache:this.#a,callBackObject:a,useStagger:this.#x}),this.#r.every(l=>l.settled===!0)){let l=()=>{this.#r=[...this.#r].map(d=>({...d,fromValue:d.toValue})),this.#u?.(!0),this.#c=void 0,this.#s=void 0,this.#u=void 0,this.#g=!1,this.#d=!1},p=Oe(this.#r,"toValue");Bn({onComplete:l,callback:this.#p,callbackCache:this.#a,callbackOnComplete:this.#h,callBackObject:p,stagger:this.#n,slowlestStagger:this.#T,fastestStagger:this.#R,useStagger:this.#x});return}u.useFrame(()=>{u.useNextTick(({time:l,fps:p})=>{this.#d&&this.#S(l,p,o,n,s,i)})})}#w(t,r){this.#r=[...this.#r].map(a=>({...a,velocity:Math.trunc(this.#i.velocity)}));let o=this.#i.tension,n=this.#i.friction,s=Math.max(1,this.#i.mass),i=this.#i.precision;this.#S(t,r,o,n,s,i)}async#A(){if(zn(this.#n.each,this.#m,this.#a,this.#p)){let{averageFPS:t}=await u.useFps();uo("spring",t);let r=lr(this.#a,this.#p);if(this.#n.grid.col>r.length){Nt(r.length),this.#m=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=Ot({arrayDefault:r,arrayOnStop:this.#h,stagger:this.#n,slowlestStagger:this.#T,fastestStagger:this.#R});this.#a.length>this.#p.length?this.#a=o:this.#p=o,this.#h=n,this.#T=i,this.#R=s,this.#m=!1}return{ready:!0}}async#k(t,r){this.#v||(this.#u=t,this.#s=r,this.#m&&(this.#v=!0,await this.#A(),this.#v=!1),jn({validationFunction:this.#f,defaultRafInit:(o,n)=>this.#w(o,n)}))}clearCurretPromise(){this.#g||(this.#s?.(u.ANIMATION_STOP_REJECT),this.#c=void 0,this.#s=void 0,this.#u=void 0,this.#d=!1)}stop({clearCache:t=!0,updateValues:r=!0}={}){this.#g&&(this.#g=!1),r&&(this.#r=Rn(this.#r)),this.unFreezeStagger(),t&&this.#a.forEach(({cb:o})=>u.useCache.clean(o)),this.#s&&(this.#s(u.ANIMATION_STOP_REJECT),this.#c=void 0,this.#s=void 0,this.#u=void 0),this.#d=!1}freezeStagger(){this.#_||(this.#a.forEach(({cb:t})=>u.useCache.freeze(t)),this.#_=!0)}unFreezeStagger({updateFrame:t=!0}={}){this.#_&&(this.#a.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:t})),this.#_=!1)}pause(){this.#g||(this.#g=!0,this.#d=!1,this.#r=xa(this.#r),this.freezeStagger())}resume(){this.#g&&(this.#g=!1,this.unFreezeStagger(),!this.#d&&this.#u&&Fa((t,r)=>this.#w(t,r)))}setData(t){this.#r=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,fromValue:n,velocity:this.#i.velocity,currentValue:n,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#e=this.#r.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#r=mt(this.#r,this.#e)}#O(t){let o=ue.get("spring").config,n=Ry(t?.config)?o?.[t?.config??"default"]??$o.default:this.#y.configProps,s=vu(t?.configProps),i={...n,...s},a={reverse:t?.reverse??this.#y.reverse,relative:t?.relative??this.#y.relative,immediate:t?.immediate??this.#y.immediate,configProps:i},{relative:c}=a;return this.#i=i,this.#t=c,a}goTo(t,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!0;let o=lo(t);return this.#E(o,t,r)}goFrom(t,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!0;let o=Vn(t);return this.#E(o,t,r)}goFromTo(t,r,o={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);if(this.#x=!0,!no(t,r))return so("spring goFromTo:",t,r),new Promise(s=>s);let n=Wn(t,r);return this.#E(n,t,o)}set(t,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!1;let o=Nr(t);return this.#E(o,t,r)}setImmediate(t,r={}){if(this.#d&&this.stop({clearCache:!1,updateValues:!1}),this.#g)return;this.#x=!1;let o=Nr(t);this.#r=Gn(o,this.#r);let{reverse:n}=this.#O(r??{});Pt(n,"reverse")&&(this.#r=Mr(t,this.#r)),this.#r=kn(this.#r,this.#t),this.#r=Ir(this.#r)}#E(t,r,o={}){this.#r=Gn(t,this.#r);let{reverse:n,immediate:s}=this.#O(o);if(Pt(n,"reverse")&&(this.#r=Mr(r,this.#r)),this.#r=kn(this.#r,this.#t),Pt(s,"immediate "))return this.#d&&this.stop({updateValues:!1}),this.#r=Ir(this.#r),Promise.resolve();let i=!this.#d&&!this.#c;return i&&(this.#c=new Promise((a,c)=>{this.#k(a,c)})),i&&this.#c?this.#c:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return Oe(this.#r,"currentValue")}getInitialData(){return Oe(this.#e,"currentValue")}getFrom(){return Oe(this.#r,"fromValue")}getTo(){return Oe(this.#r,"toValue")}getFromNativeType(){return Un(this.#r)}getToNativeType(){return Hn(this.#r)}getType(){return"SPRING"}getId(){return this.#l}isActive(){return this.#d}updateConfigProp(t={}){let r=vu(t);this.#i={...this.#i,...r},this.#y=mt(this.#y,{configProps:r})}updateConfig(t){this.#i=yu(t),this.#y=mt(this.#y,{configProps:this.#i})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ht(t,this.#p);return this.#p=r,()=>this.#p=o(this.#p)}subscribeCache(t,r){let{arrayOfCallbackUpdated:o,unsubscribeCb:n,unsubscribeCache:s}=ur(t,r,this.#a,this.#o);return this.#a=o,this.#o=s,()=>this.#a=n(this.#a)}validateInitialization({validation:t,callback:r}){let o=[...this.#f,{validation:t,callback:r}];return this.#f=o,()=>this.#f=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ht(t,this.#h);return this.#h=r,()=>this.#h=o(this.#h)}destroy(){this.#c&&this.stop(),this.#h=[],this.#f=[],this.#p=[],this.#a=[],this.#r=[],this.#c=void 0,this.#o.forEach(t=>t()),this.#o=[]}};var rv=({values:e,timeElapsed:t,duration:r,ease:o})=>e.map(n=>{if(n.shouldUpdate){let s=o(t,n.fromValue,n.toValProcessed,r);return{...n,currentValue:Se(s)}}return{...n,currentValue:n.fromValue}});var Ar=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#_;#v;#y;#T;#R;#S;#w;#A;#k;constructor(t){this.#n=ka(t?.ease),this.#t=Tu(t?.duration),this.#i=ao(t?.relative,"tween"),this.#l=At(t??{}),this.#d=u.getUnivoqueId(),this.#u=!1,this.#s=void 0,this.#c=void 0,this.#r=void 0,this.#e=[],this.#p=[],this.#a=[],this.#h=[],this.#f=[],this.#o=[],this.#g=[],this.#m=!1,this.#x=0,this.#_=0,this.#v=0,this.#y=!0,this.#T=!0,this.#R=!1,this.#S=!1,this.#w={duration:this.#t,ease:Na(t?.ease),relative:this.#i,reverse:!1,immediate:!1},this.#A=Ge,this.#k=Ge;let r=t?.data;r&&this.setData(r)}#O(t){this.#u=!0,this.#m&&(this.#v=t-this.#x-this.#_),this.#_=t-this.#x-this.#v,Math.round(this.#_)>=this.#t&&(this.#_=this.#t),this.#e=rv({values:this.#e,timeElapsed:this.#_,duration:this.#t,ease:this.#n});let r=Math.round(this.#_)===this.#t,o=Oe(this.#e,"currentValue");if(this.#m||Fn({stagger:this.#l,callback:this.#a,callbackCache:this.#h,callBackObject:o,useStagger:this.#T}),r){Bn({onComplete:()=>{this.#e=[...this.#e].map(s=>s.shouldUpdate?{...s,toValue:s.currentValue,fromValue:s.currentValue}:s),this.#s?.(!0),this.#r=void 0,this.#c=void 0,this.#s=void 0,this.#v=0,this.#m=!1,this.#u=!1},callback:this.#a,callbackCache:this.#h,callbackOnComplete:this.#f,callBackObject:o,stagger:this.#l,slowlestStagger:this.#A,fastestStagger:this.#k,useStagger:this.#T});return}u.useFrame(()=>{u.useNextTick(({time:n})=>{this.#u&&this.#O(n)})})}#E(t){this.#x=t,this.#O(t)}async#N(){if(zn(this.#l.each,this.#y,this.#h,this.#a)){let{averageFPS:t}=await u.useFps();uo("tween",t);let r=lr(this.#h,this.#a);if(this.#l.grid.col>r.length){Nt(r.length),this.#y=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=Ot({arrayDefault:r,arrayOnStop:this.#f,stagger:this.#l,slowlestStagger:this.#A,fastestStagger:this.#k});this.#h.length>this.#a.length?this.#h=o:this.#a=o,this.#f=n,this.#A=i,this.#k=s,this.#y=!1}return{ready:!0}}async#P(t,r){this.#S||(this.#s=t,this.#c=r,this.#y&&(this.#S=!0,await this.#N(),this.#S=!1),jn({validationFunction:this.#o,defaultRafInit:o=>this.#E(o)}))}clearCurretPromise(){this.#m||(this.#c?.(u.ANIMATION_STOP_REJECT),this.#r=void 0,this.#c=void 0,this.#s=void 0,this.#u=!1)}stop({clearCache:t=!0,updateValues:r=!0}={}){this.#v=0,this.#m=!1,r&&(this.#e=Rn(this.#e)),this.unFreezeStagger(),t&&this.#h.forEach(({cb:o})=>u.useCache.clean(o)),this.#c&&(this.#c(u.ANIMATION_STOP_REJECT),this.#r=void 0,this.#c=void 0,this.#s=void 0),this.#u=!1}freezeStagger(){this.#R||(this.#h.forEach(({cb:t})=>u.useCache.freeze(t)),this.#R=!0)}unFreezeStagger({updateFrame:t=!0}={}){this.#R&&(this.#h.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:t})),this.#R=!1)}pause(){this.#m||(this.#m=!0,this.freezeStagger())}resume(){this.#m&&(this.#m=!1,this.unFreezeStagger())}setData(t){this.#e=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,toValueOnPause:n,toValProcessed:n,fromValue:n,currentValue:n,shouldUpdate:!1,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#p=this.#e.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,shouldUpdate:!1,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#e=mt(this.#e,this.#p)}#b(){this.#e=[...this.#e].map(t=>t.shouldUpdate?{...t,fromValue:t.currentValue}:t)}#D(t){let r={...this.#w,...t},{ease:o,duration:n,relative:s}=r;return this.#n=ka(o),this.#i=ao(s,"tween"),this.#t=Tu(n),r}goTo(t,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!0;let o=lo(t);return this.#B(o,t,r)}goFrom(t,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!0;let o=Vn(t);return this.#B(o,t,r)}goFromTo(t,r,o={}){if(this.stop({clearCache:!1,updateValues:!0}),this.#T=!0,!no(t,r))return so("tween goFromTo:",t,r),new Promise(s=>s);let n=Wn(t,r);return this.#B(n,t,o)}set(t,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!1;let o=Nr(t),n=r?{...r,duration:1}:{duration:1};return this.#B(o,t,n)}setImmediate(t,r={}){if(this.stop({clearCache:!1,updateValues:!1}),this.#m)return;this.#T=!1;let o=Nr(t),n=r?{...r,duration:1}:{duration:1};this.#e=Eu(o,this.#e);let{reverse:s}=this.#D(n);Pt(s,"reverse")&&(this.#e=Mr(t,this.#e)),this.#e=au(this.#e,this.#i),this.#e=Ir(this.#e)}#B(t,r,o={}){this.#e=Eu(t,this.#e);let{reverse:n,immediate:s}=this.#D(o);if(Pt(n,"reverse")&&(this.#e=Mr(r,this.#e)),this.#e=au(this.#e,this.#i),Pt(s,"immediate "))return this.#u&&(this.stop({clearCache:!1,updateValues:!1}),this.#b()),this.#e=Ir(this.#e),Promise.resolve();let i=!this.#u&&!this.#r;return i&&(this.#r=new Promise((a,c)=>{this.#P(a,c)})),i&&this.#r?this.#r:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return Oe(this.#e,"currentValue")}getInitialData(){return Oe(this.#p,"currentValue")}getFrom(){return Oe(this.#e,"fromValue")}getTo(){return Oe(this.#e,"toValue")}getFromNativeType(){return Un(this.#e)}getToNativeType(){return Hn(this.#e)}getType(){return"TWEEN"}getId(){return this.#d}isActive(){return this.#u}updateEase(t){this.#n=ka(t),this.#w=mt(this.#w,{ease:t})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ht(t,this.#a);return this.#a=r,()=>this.#a=o(this.#a)}subscribeCache(t,r){let{arrayOfCallbackUpdated:o,unsubscribeCb:n,unsubscribeCache:s}=ur(t,r,this.#h,this.#g);return this.#h=o,this.#g=s,()=>this.#h=n(this.#h)}validateInitialization({validation:t,callback:r}){let o=[...this.#o,{validation:t,callback:r}];return this.#o=o,()=>this.#o=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ht(t,this.#f);return this.#f=r,()=>this.#f=o(this.#f)}destroy(){this.#r&&this.stop(),this.#f=[],this.#o=[],this.#a=[],this.#h=[],this.#e=[],this.#r=void 0,this.#g.forEach(t=>t()),this.#g=[]}};var yI=({each:e,duration:t,numItem:r,index:o,eachByNumItem:n})=>{if(e===1){let d=t/r,f=Se(o*d),h=Se(f+d);return{start:f,end:h}}let i=t/r*n,a=t-i,c=r-1>0?r-1:1,p=a/c*o;return{start:Se(p),end:Se(i+p)}},vI=({duration:e,numItem:t,index:r,eachByNumItem:o,type:n})=>{let i=e/t*r,c=(e-(e-i))/t*o;if(n===Do)return{start:0,end:Se(e-(i-c))};if(n===Fo){let l=(i-c)/2;return{start:Se(l),end:Se(e-l)}}return n==="end"?{start:Se(i-c),end:Se(e)}:{start:0,end:e}},ov=e=>{let t=Iy(e?.items),r=At(e),o=io(e?.duration),n=10,s=r?.each||1,i=[...t].map((h,v)=>({item:h,start:0,end:o,index:v}));if(!wy(t))return i;r.grid?.col>t.length&&(Nt(t.length),s=1),u.checkType(Number,s)&&(s>n||s<1)&&(Ob(n),s=1);let{staggerArray:a}=Ot({arrayDefault:[...t].map(h=>({item:h})),arrayOnStop:[],stagger:r,slowlestStagger:Ge,fastestStagger:Ge}),c=a.filter(({item:h})=>u.checkType(Element,h)||u.checkType(Object,h)||u.checkType(Element,h?.deref?.()));if(c.length===0)return Pb(),i;let l=c.map(({frame:h})=>h),p=[...new Set(l)].toSorted((h,v)=>h-v),d=p.length;return c.map(({item:h,frame:v})=>{let b=p.indexOf(v),T=s*d/n,{start:_,end:S}=r.type===Lo?yI({each:s,duration:o,numItem:d,index:b,eachByNumItem:T}):r.type===Do||r.type==="end"||r.type===Fo?vI({duration:o,numItem:d,index:b,eachByNumItem:T,type:r.type}):{start:0,end:o};return{item:h,start:_,end:S,index:b}})};function TI(e){return new Fs(e)}function SI(e){return new Vs(e)}function _I(){return new Bs}function xI(e){return ov(e)}function CI(e){return new Ar(e)}function EI(e){return new Ht(e)}function wI(e){return new Pr(e)}var Ce={};To(Ce,{createAsyncTimeline:()=>MI,createSyncTimeline:()=>II});var ee=()=>{},ja=(...e)=>t=>e.reduce((r,o)=>r.then(o),Promise.resolve(t));var za=({data:e,filterBy:t})=>Object.entries(e).map(r=>{let[o,n]=r,s=o in t;return{data:{[o]:n},active:s}}).filter(({active:r})=>r).map(({data:r})=>r).reduce((r,o)=>({...r,...o}),{});var po=({timeline:e,tween:t,index:r})=>{let o=t?.getId?.(),n=t?.getInitialData?.()||{},s=e.slice(0,r).reduce((i,a)=>{let c=a.find(({data:d})=>d?.tween?.getId?.()===o);c?.data?.tween?.setImmediate?.(c?.data?.valuesTo);let l=c?.data?.tween?.getToNativeType?.(),p=l&&c?za({data:l,filterBy:c.data.valuesTo}):{};return{...i,...p}},n);return t.setImmediate(n),s};var Ru=({mainReject:e,mainResolve:t,isStopped:r,previousSessionId:o,currentSessionId:n,isInPause:s,tween:i,stepFunction:a,action:c,addToActiveTween:l})=>{if(r()||o!==n()){e();return}let p=l(i),d=i&&i?.validateInitialization?i.validateInitialization({validation:()=>s(),callback:()=>i.pause?.()}):ee;a[c]().then(()=>t({resolve:!0})).catch(()=>{}).finally(()=>{p(),d()})};var Ws=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#_;#v;#y;#T;#R;#S;#w;#A;#k;#O;#E;#N;#P;#b;#D;#B;#I;constructor(t){this.#n=Ra(t?.repeat),this.#t=pe(t?.yoyo,"asyncTimeline: yoyo",!1),this.#i=pe(t?.freeMode,"asyncTimeline: freeMode",!1),this.#l=pe(t?.autoSet,"asyncTimeline: autoSet",!0),this.#d=pe(t?.inheritProps,"asyncTimeline: inheritProps",!0),this.#u=pe(t?.forceFromTo,"asyncTimeline: forceFromTo",!1),this.#s=[],this.#c=[],this.#r=[],this.#e=!1,this.#p={id:-1,tween:void 0,callback:()=>{},action:"",valuesFrom:{},valuesTo:{},prevValueTo:{},prevValueSettled:!1,tweenProps:{},groupProps:{},labelProps:{}},this.#a={active:!1,index:-1,isReverse:!1,callback:void 0},this.#h=1,this.#f=void 0,this.#o=0,this.#g=0,this.#m=1,this.#x=!1,this.#_=!1,this.#v=!1,this.#y=!1,this.#T=!1,this.#R=!1,this.#S=!0,this.#w=0,this.#A=0,this.#k=0,this.#O=!1,this.#E=[],this.#N=!1,this.#P=0,this.#b=[],this.#D=[],this.#B=void 0,this.#I=void 0}#F(){let t=this.#s[this.#g],r=this.#E;if(this.#E=[],!t)return;this.#s[this.#g]=t.map(i=>{let{data:a}=i,{tween:c,valuesTo:l,prevValueSettled:p}=a;if(c&&c?.getToNativeType&&!p){let d=c.getToNativeType(),f=za({data:d,filterBy:l});return{...i,data:{...a,prevValueTo:f,prevValueSettled:!0}}}return i});let o=t.map(i=>{let{data:a}=i,{tween:c,callback:l,action:p,valuesFrom:d,valuesTo:f,tweenProps:h,id:v}=a,b={...h};delete b.delay;let{active:T,index:_}=this.#a,S=Number.isNaN(_)?!1:T&&_&&this.#g<_;S&&(b.immediate=!0),h&&"relative"in h&&h.relative&&(h.relative=!1,lb()),this.#E.push({id:v,action:p});let C=r.find(({id:w,action:M})=>w===v&&M===p),E={set:()=>(this.#y||c?.clearCurretPromise?.(),c?.[p](d,b)),goTo:()=>(this.#y||c?.clearCurretPromise?.(),c?.[p](f,b)),goFrom:()=>(this.#y||c?.clearCurretPromise?.(),c?.[p](d,b)),goFromTo:()=>(this.#y||c?.clearCurretPromise?.(),c?.[p](d,f,b)),add:()=>C?new Promise(w=>w({resolve:!0})):new Promise(w=>{if(S){w({resolve:!0});return}let M=this.getDirection();l({direction:M,loop:this.#m}),w({resolve:!0})}),addAsync:()=>{this.#R=!0;let w=this.#w;return C?new Promise(M=>M({resolve:!0})):new Promise((M,A)=>{if(S){M({resolve:!0});return}let R=this.getDirection();l({direction:R,loop:this.#m,resolve:()=>{if(w===this.#w){M({resolve:!0});return}A()}})})},createGroup:()=>new Promise(w=>w({resolve:!0})),closeGroup:()=>new Promise(w=>w({resolve:!0})),label:()=>new Promise(w=>w({resolve:!0})),suspend:()=>{if(C)return new Promise(A=>A({resolve:!0}));let w=u.checkType(Boolean,l());w||ub(l);let M=w?l():!0;return new Promise(A=>{!S&&M&&(this.#T=!0),A({resolve:!0})})}};return new Promise((w,M)=>{let A=S?!1:h?.delay,R=this.#w;if(A){let L=u.getTime();requestAnimationFrame(()=>{this.#L({start:L,deltaTimeOnpause:0,delay:A,mainReject:M,mainResolve:w,previousSessionId:R,tween:c,stepFunction:E,action:p})});return}Ru({mainReject:M,mainResolve:w,isStopped:()=>this.#S,isInPause:()=>this.#y,addToActiveTween:L=>this.#Y(L),currentSessionId:()=>this.#w,previousSessionId:R,tween:c,stepFunction:E,action:p})})}),s=this.#s[this.#g].some(i=>i.data.groupProps?.waitComplete)?"all":"race";Promise[s](o).then(()=>{if(this.#T||this.#S)return;let{active:i,index:a,isReverse:c,callback:l}=this.#a;if(l&&i&&this.#g===a-1){this.#Q(),this.#m++,l();return}if(i&&c&&this.#g===a-1&&this.reverseNext(),this.#x){this.#x=!1,this.#g=this.#s.length-this.#g-1,this.#Q(),this.#H(),this.#F();return}if(this.#g<this.#s.length-1){this.#g++,this.#F();return}if(this.#m<this.#n||this.#n===-1){if(i&&a===this.#s.length&&!this.#i){let p=this.#r.map(({tween:d})=>{let f=po({timeline:this.#s,tween:d,index:this.#s.length});return new Promise((h,v)=>{d.set(f).then(()=>h({resolve:!0})).catch(()=>v())})});Promise.all(p).then(()=>{this.#C()}).catch(()=>{});return}this.#C();return}this.#D.forEach(({cb:p})=>p()),this.#S=!0,this.#B&&en.add(()=>{wt.add(()=>{this.#B?.({resolve:!0})})})}).catch(i=>{i&&console.log(i)}).finally(()=>{this.#R=!1})}#L({start:t,deltaTimeOnpause:r,delay:o,mainReject:n,mainResolve:s,previousSessionId:i,tween:a,stepFunction:c,action:l}){let p=u.getTime(),d=p-t;if(this.#y&&(r=p-this.#k),d-r>=o||this.#S||this.#x){Ru({mainReject:n,mainResolve:s,isStopped:()=>this.#S,isInPause:()=>this.#y,addToActiveTween:f=>this.#Y(f),currentSessionId:()=>this.#w,previousSessionId:i,tween:a,stepFunction:c,action:l});return}requestAnimationFrame(()=>{this.#L({start:t,deltaTimeOnpause:r,delay:o,mainReject:n,mainResolve:s,previousSessionId:i,tween:a,stepFunction:c,action:l})})}#C(){if(this.#m>0){let t=this.getDirection();this.#b.forEach(({cb:r})=>r({direction:t,loop:this.#m}))}this.#m++,this.#g=0,this.#Q(),(this.#t||this.#_)&&this.#H(),this.#_=!1,this.#F()}#Y(t){let r=t?.getId&&t.getId();if(!r)return ee;let o=this.#A;return this.#A++,this.#c.push({tween:t,uniqueId:r,id:o}),()=>{this.#c=this.#c.filter(({id:n})=>n!==o)}}#H(){this.#v=!this.#v,this.#s=this.#s.toReversed().map(t=>t.toReversed().map(r=>{let{data:o}=r,{action:n,valuesFrom:s,prevValueTo:i,valuesTo:a}=o,c=a;switch(n){case"goTo":return{...r,data:{...o,valuesTo:i,prevValueTo:c}};case"goFromTo":return{...r,data:{...o,valuesFrom:a,valuesTo:s}};case"goFrom":return this.#u||(pb(),this.stop()),{...r,data:{...o,valuesFrom:a,valuesTo:s}}}return r}))}#M(t){let r=this.#s.findIndex(o=>o[0]?.group&&o[0].group===this.#f);if(r!==-1){this.#s[r].push({group:this.#f,data:t});return}this.#s.push([{group:this.#f,data:t}])}#W(t){let r=t?.getId?.();if(this.#r.find(({id:s})=>s===r))return;let n={id:r,tween:t};this.#r.push(n)}#$(){this.#r.forEach(({tween:t})=>t.resetData())}set(t,r={},o={}){if(!Os(t))return this;o.delay=As(o?.delay);let n=this.#d?po({timeline:this.#s,tween:t,index:this.#s.length}):{};return this.#o++,this.#M({...this.#p,id:this.#o,tween:t,action:"set",valuesTo:{...n,...r},valuesFrom:{...n,...r},tweenProps:o,groupProps:{waitComplete:this.#e}}),this.#W(t),this}goTo(t,r={},o={}){if(!Os(t))return this;o.delay=As(o?.delay);let n=po({timeline:this.#s,tween:t,index:this.#s.length}),s=this.#d||this.#u?n:{};return this.#o++,this.#u?this.#M({...this.#p,id:this.#o,tween:t,action:"goFromTo",valuesFrom:{...s},valuesTo:{...s,...r},tweenProps:o??{},groupProps:{waitComplete:this.#e}}):this.#M({...this.#p,id:this.#o,tween:t,action:"goTo",valuesTo:{...s,...r},tweenProps:o??{},groupProps:{waitComplete:this.#e}}),this.#W(t),this}goFrom(t,r={},o={}){if(!Os(t))return this;o.delay=As(o?.delay);let n=po({timeline:this.#s,tween:t,index:this.#s.length}),s=this.#d||this.#u?n:{};return this.#o++,this.#u?this.#M({...this.#p,id:this.#o,tween:t,action:"goFromTo",valuesFrom:{...s,...r},valuesTo:{...s},tweenProps:o??{},groupProps:{waitComplete:this.#e}}):this.#M({...this.#p,id:this.#o,tween:t,action:"goFrom",valuesFrom:{...s,...r},tweenProps:o,groupProps:{waitComplete:this.#e}}),this.#W(t),this}goFromTo(t,r={},o={},n={}){if(!Os(t))return this;n.delay=As(n?.delay);let s=this.#d?po({timeline:this.#s,tween:t,index:this.#s.length}):{};return this.#o++,this.#M({...this.#p,id:this.#o,tween:t,action:"goFromTo",valuesFrom:{...s,...r},valuesTo:{...s,...o},tweenProps:n,groupProps:{waitComplete:this.#e}}),this.#W(t),this}add(t=ee){let r=co(t,()=>{},"timeline add function");return this.#f?(Ln("add"),this):(this.#o++,this.#M({...this.#p,id:this.#o,callback:r,action:"add",groupProps:{waitComplete:this.#e}}),this)}addAsync(t){let r=Py(t);return this.#f?(Ln("addAsync"),this):(this.#o++,this.#M({...this.#p,id:this.#o,callback:r,action:"addAsync",groupProps:{waitComplete:this.#e}}),this)}createGroup(t={}){return this.#f?(Ln("createGroup"),this):(this.#o++,this.#M({...this.#p,id:this.#o,action:"createGroup",groupProps:t}),this.#e=t?.waitComplete??!1,this.#f=this.#h++,this)}closeGroup(){return this.#f=void 0,this.#o++,this.#M({...this.#p,id:this.#o,action:"closeGroup"}),this.#e=!1,this}suspend(t=()=>!0){return this.#f?(Ln("suspend"),this):(this.#o++,this.#M({...this.#p,id:this.#o,callback:t,action:"suspend",groupProps:{waitComplete:this.#e}}),this)}label(t={}){return this.#f?(Ln("label"),this):ky(t?.name,"asyncTimeline label:")?(this.#o++,this.#M({...this.#p,id:this.#o,action:"label",labelProps:t,groupProps:{waitComplete:this.#e}}),this):this}#U(){this.#O||(this.#O=!0,this.#r.forEach(({tween:t})=>{let r=t.getInitialData();this.#o++,this.#s=[[{group:void 0,data:{...this.#p,id:this.#o,tween:t,action:"set",valuesFrom:r,valuesTo:r,groupProps:{waitComplete:this.#e}}}],...this.#s]}),this.#r.forEach(({tween:t})=>{let r=po({timeline:this.#s,tween:t,index:this.#s.length});this.#o++,this.#s.push([{group:void 0,data:{...this.#p,id:this.#o,tween:t,action:"set",valuesFrom:r,valuesTo:r,groupProps:{waitComplete:this.#e}}}])}))}setTween(t="",r=[]){this.stop();let o=Ay(r),n=Oy(t);if(!o||!n)return Promise.reject(new Error("timeline setTween: props is wrong"));let s=new Set(r.map(c=>c?.getId?.())),i=this.#r.filter(({id:c})=>s.has(c)),a=this.#s.findIndex(c=>{let[l]=c;return l.data.labelProps?.name===t});return a===-1?(hb(t),Promise.reject(new Error(`asyncTimeline.setTween() label: ${t} not found`))):new Promise(c=>{let l=i.map(({tween:p})=>{let d=po({timeline:this.#s,tween:p,index:a});return new Promise((f,h)=>{p.set(d).then(()=>f({resolve:!0})).catch(()=>h())})});Promise.all(l).then(()=>{c({resolve:!0})}).catch(()=>{fb()})})}#G(){this.#I&&(this.#I(u.ANIMATION_STOP_REJECT),this.#I=void 0)}async#re(){if(this.#N)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#N=!0,await u.useFps(),this.#N=!1}async playFrom(t){return await this.#re(),this.#K(t,!1)}async playFromReverse(t){return await this.#re(),this.#K(t,!0)}#K(t,r){return new Promise((o,n)=>{this.playReverse({forceYoYo:!1,resolve:o,reject:n,callback:()=>{this.#s.length===0||this.#R||(this.#v&&this.#H(),this.#g=0,this.#a={isReverse:r,active:!0,index:u.checkType(String,t)?this.#s.findIndex(s=>{let[i]=s;return i.data.labelProps?.name===t}):t,callback:void 0},u.checkType(String,t)&&Ny(this.#a.index,t),this.#F())}})})}async play(){return await this.#re(),new Promise((t,r)=>{if(this.#l&&this.#U(),this.#i){if(this.#s.length===0||this.#R)return;this.stop(),this.#S=!1,this.#v&&this.#H(),this.#w++,u.useFrameIndex(()=>{this.#I=r,this.#B=t,this.#F()},1);return}this.playReverse({forceYoYo:!1,callback:()=>{this.stop(),this.#S=!1;let o=this.#r.map(({tween:n})=>{let s=n.getInitialData();return new Promise((i,a)=>{n.set(s).then(()=>i({resolve:!0})).catch(()=>a())})});Promise.all(o).then(()=>{this.#I=r,this.#B=t,this.#F()}).catch(()=>{})}})})}async playReverse({forceYoYo:t=!0,callback:r,resolve:o=null,reject:n=null}={}){return await this.#re(),new Promise((s,i)=>{let a=o??s,c=n??i,l=t;this.#l&&this.#U(),!(this.#s.length===0||this.#R)&&(this.stop(),this.#S=!1,l&&(this.#_=!0),this.#a={active:!0,index:this.#s.length,isReverse:!1,callback:r},this.#m--,this.#w++,u.useFrameIndex(()=>{this.#B=a,this.#I=c,this.#F()},1))})}reverseNext(){this.#x=!0}stop({clearCache:t=!0}={}){this.#S=!0,this.#g=0,this.#m=1,this.#G(),this.#x=!1,this.#Q(),this.#_=!1,this.#y=!1,this.#T=!1,this.#R=!1,this.#k=0,this.#r.forEach(({tween:r})=>{r?.stop?.({clearCache:t})}),this.#v&&this.#H(),this.#v=!1,this.#i||this.#$()}pause(){this.#y||(this.#y=!0,this.#k=u.getTime(),this.#se())}resume(){if(this.#y&&(this.#y=!1,this.#k=0,this.#ee()),this.#T){if(this.#T=!1,this.#k=0,this.#g<=this.#s.length-2){this.#g++,this.#F();return}this.#g===this.#s.length-1&&(this.#g=this.#t&&!this.#v?1:0,this.#Q(),this.#t&&this.#H(),this.#m++,this.#F())}}#se(){this.#c.forEach(({tween:t})=>{t?.pause?.()})}#ee(){this.#c.forEach(({tween:t})=>{t?.resume?.()})}#Q(){this.#a={active:!1,index:-1,isReverse:!1,callback:void 0}}get(){return this.#c}isActive(){return!this.#S}isPaused(){return this.#y}isSuspended(){return this.#T}getDirection(){return this.#S?je.NONE:this.#v?je.BACKWARD:je.FORWARD}onLoopEnd(t){this.#b.push({cb:t,id:this.#P});let r=this.#P;return()=>{this.#b=this.#b.filter(o=>o.id!==r)}}onComplete(t){this.#D.push({cb:t,id:this.#P});let r=this.#P;return this.#P++,()=>{this.#D=this.#D.filter(o=>o.id!==r)}}destroy(){this.#r.forEach(({tween:t})=>{t?.destroy?.()}),this.#s=[],this.#c=[],this.#D=[],this.#b=[],this.#r=[],this.#g=0,this.#a={active:!1,callback:void 0,index:-1,isReverse:!1}}};var js=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#_;#v;#y;#T;#R;#S;#w;#A;#k;constructor(t={}){this.#n=io(t?.duration),this.#t=pe(t?.yoyo,"syncTimeline: yoyo",!1),this.#i=Ra(t?.repeat),this.#l=[],this.#d=0,this.#u=0,this.#s=0,this.#c=0,this.#r=0,this.#e=0,this.#p=!1,this.#a=!1,this.#h=!1,this.#f=0,this.#o=0,this.#g=10,this.#m=!0,this.#x=!1,this.#_=!1,this.#v=!1,this.#y=!1,this.#T=0,this.#R=[],this.#S=[],this.#w=[],this.#A=void 0,this.#k=void 0}#O(t,r){if(this.#m||this.#v)return;let o=!this.#i||this.#i>=2&&this.#f===this.#i-1?0:1e3/r/2;this.#y&&(this.#c=t-this.#d-this.#u-this.#e),this.#u=Math.trunc(t-this.#d-this.#c-this.#e);let n=this.#p?this.#r-(this.#u-this.#r):this.#u;if(this.#y||(this.#s=tt(n,0,this.#n),this.#x||(this.#l.forEach(i=>{i.draw({partial:this.#s,isLastDraw:!1,useFrame:!0,direction:this.getDirection()})}),this.#w.forEach(({cb:i})=>{i({time:this.#s,direction:this.getDirection()})}))),this.#x=!1,this.#o++,n<=this.#n-o&&n>=0+o&&!this.#m){this.#_=!1,this.#E();return}if(this.#F(),this.#a){this.#p=!0,this.#r=0,this.#e=0,this.#a=!1,this.#E();return}let s=this.getDirection();if(u.useNextFrame(()=>{!this.#v&&!this.#_&&this.#o>this.#g&&(this.#_=!0,this.#f++,this.#o=0,this.#R.forEach(({cb:i})=>i({direction:s,loop:this.#f})))}),!this.#i||this.#f===this.#i-1&&this.#o>this.#g){let i=this.#s;this.#l.forEach(a=>{a.draw({partial:i,isLastDraw:!0,useFrame:!0,direction:this.getDirection()})}),this.#m=!0,this.#N(),this.#d=t,this.#p&&(this.#p=!1),this.#S.forEach(({cb:a})=>a()),this.#A&&this.#A(!0);return}if(this.#t){this.reverse(),this.#E();return}if(this.#h){this.#N(),this.#d=t,this.#p||(this.#h=!this.#h),this.#u=this.#n,this.#s=this.#n,this.#c=this.#n,this.#E();return}this.#N(),this.#d=t,this.#p&&(this.#h=!this.#h),this.#E()}#E(){u.useFrame(()=>{u.useNextTick(({time:t,fps:r})=>{this.#v||this.#O(t,r)})})}#N(){this.#u=0,this.#c=0,this.#s=0,this.#r=0,this.#e=0}#P(t){let r=this.#l.reduce((o,n)=>n.getLabels().find(({name:a})=>a===t)||o,{name:"",time:0});return r||gb(t),r.time}#b(){this.#k&&(this.#k(u.ANIMATION_STOP_REJECT),this.#k=void 0)}play(t={}){this.resume();let r=t?.useCurrent;return r||this.stop(),new Promise((o,n)=>{if(!this.#v&&(this.#b(),this.#A=o,this.#k=n,!(!this.#m&&!this.#p&&r))){if(!this.#m&&this.#p&&r){this.reverse();return}this.#D()}})}playFrom(t=0){return this.resume(),this.stop(),new Promise((r,o)=>{if(this.#v)return;let s=u.checkType(Number,t)?t:this.#P(t);this.#b(),this.#A=r,this.#k=o,this.#D(s)})}#D(t=0){this.#F(),this.#N(),this.#s=t,this.#e=-this.#s,this.#h=!1,this.#o=0,this.#v=!0,this.#I(t)}playFromReverse(t){return this.resume(),this.stop(),new Promise((r,o)=>{if(this.#v)return;let s=u.checkType(Number,t)?t:this.#P(t);this.#b(),this.#A=r,this.#k=o,this.#B(s,!0)})}playReverse(t={}){this.resume();let r=t?.useCurrent;return r||this.stop(),new Promise((o,n)=>{if(!this.#v&&(this.#b(),this.#A=o,this.#k=n,!(!this.#m&&this.#p&&r))){if(!this.#m&&!this.#p&&r){this.reverse();return}this.#B(this.#n,!0)}})}#B(t=0){this.#F(),this.#u=t,this.#s=t,this.#c=t,this.#r=0,this.#e=0,this.#a=!0,this.#h=!0,this.#x=!0,this.#o=0,this.#v=!0,this.#I(t)}async#I(t){if(this.#i===0)return;let{averageFPS:r}=await u.useFps();uo("sequencer",r),this.#p=!1,this.#l.forEach(o=>{o.inzializeStagger(),o.disableStagger(),o.draw({partial:t,isLastDraw:!1,useFrame:!0,direction:this.getDirection()})}),u.useFrame(()=>{u.useNextTick(({time:o,fps:n})=>{this.#d=o,this.#v=!1,this.#m=!1,this.#y=!1,this.#f=0,this.#O(o,n)})})}pause({freezeCache:t=!0}={}){if(!(this.#m||this.#y||this.#v)&&(this.#m=!1,this.#y=!0,t)){this.#l.forEach(r=>{r.freezeCachedId()});return}}resume({unFreezeCache:t=!0}={}){if(!(this.#m||!this.#y||this.#v)&&(this.#y=!1,t)){this.#l.forEach(r=>{r.unFreezeCachedId()});return}}reverse(){this.#y&&this.resume(),!(this.#m||this.#v)&&(this.#F(),this.#p=!this.#p,this.#p?this.#r=this.#u:this.#e+=this.#u-this.#s)}stop({clearCache:t=!0}={}){if(this.resume(),this.#m=!0,this.#b(),t){this.#l.forEach(r=>{r.cleanCachedId()});return}this.#l.forEach(r=>{r.draw({partial:this.#s,isLastDraw:!0,useFrame:!0,direction:this.getDirection()})})}add(t){return t.setStretchFactor(this.#n),this.#l.push(t),this}setDuration(t){return this.#n=t,this}#F(){this.#l.forEach(t=>t.resetLastValue())}isActive(){return!this.#m}isPaused(){return this.#y}getDirection(){return this.#m?je.NONE:this.#p?je.BACKWARD:je.FORWARD}getTime(){return this.#s}onLoopEnd(t=()=>{}){this.#R.push({cb:t,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#R=this.#R.filter(o=>o.id!==r)}}onComplete(t=()=>{}){this.#S.push({cb:t,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#S=this.#S.filter(o=>o.id!==r)}}onUpdate(t=()=>{}){this.#w.push({cb:t,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#w=this.#w.filter(o=>o.id!==r)}}destroy(){this.stop(),this.#l.forEach(t=>t.destroy()),this.#l=[],this.#w=[],this.#R=[],this.#S=[]}};function II(e){return new js(e)}function MI(e){return new Ws(e)}var ze={};To(ze,{createParallax:()=>OI,createScrollTrigger:()=>$I});var RI=({prevValue:e,value:t,maxVal:r})=>t>=r&&e<=r&&r>=0||t<=r&&e>=r&&r<=0?y.ON_LEAVE:t>r&&e<=r&&r<=0||t<r&&e>=r&&r>=0?y.ON_ENTER_BACK:t>=0&&e<=0&&r<=0||t<=0&&e>=0&&r>=0?y.ON_LEAVE_BACK:t>0&&t<r&&e<=0&&r>=0||t<0&&e>=0&&r<=0?y.ON_ENTER:y.ON_NOOP;function nv({prevValue:e,value:t,maxVal:r,onEnter:o,onEnterBack:n,onLeave:s,onLeaveBack:i}){({[y.ON_LEAVE]:()=>{s&&s()},[y.ON_ENTER_BACK]:()=>{n&&n()},[y.ON_LEAVE_BACK]:()=>{i&&i()},[y.ON_ENTER]:()=>{o&&o()},[y.ON_NOOP]:()=>{}})[RI({prevValue:e,value:t,maxVal:r})]()}var kI=({startMarker:e,endMarker:t,label:r})=>{if(!e&&!t){let o=r.replaceAll(/^[^a-z]+|[^\w.:-]+/gi,"-"),n=document.createElement("span");n.className+=`p-marker p-marker--start  p-marker-${o}`,n.innerHTML=`start ${o}`;let s=document.createElement("span");s.className+=`p-marker p-marker--end  p-marker-${o}`,s.innerHTML=`end ${o}`,document.body.append(n),document.body.append(s);let i=document.querySelector(`.p-marker--start.p-marker-${o}`),a=document.querySelector(`.p-marker--end.p-marker-${o}`);return{lastStartMarker:i??void 0,lastEndMarkerEl:a??void 0}}return{lastStartMarker:e,lastEndMarkerEl:t}},NI=({screen:e})=>{if(e===globalThis)return{top:0,right:0,bottom:0,left:0};let t=e.getBoundingClientRect();return{top:t.top,right:document.documentElement.clientWidth-(t.left+e.offsetWidth),bottom:window.innerHeight-(t.top+e.offsetHeight),left:t.left}},PI=({startPoint:e,direction:t,invertSide:r,top:o,bottom:n,left:s,right:i})=>t===y.DIRECTION_VERTICAL?r?{right:0,width:"100vw",height:"3px",top:`${e+o}px`,padding:"0 30px",pointerEvents:"none"}:{right:0,width:"100vw",height:"3px",bottom:`${e+n}px`,padding:"0 30px",pointerEvents:"none"}:r?{top:0,height:"100vw",width:"3px",left:`${e+s}px`,padding:"30px 0",pointerEvents:"none"}:{top:0,height:"100vw",width:"3px",right:`${e+i}px`,padding:"30px 0",pointerEvents:"none"},AI=({startPoint:e,endPoint:t,direction:r,invertSide:o,top:n,bottom:s,left:i,right:a})=>r===y.DIRECTION_VERTICAL?o?{right:0,width:"100vw",height:"3px",top:`${e+t+n}px`,padding:"0 30px",pointerEvents:"none"}:{right:0,width:"100vw",height:"3px",bottom:`${e+t+s}px`,padding:"0 30px",pointerEvents:"none"}:o?{top:0,height:"100vw",width:"3px",left:`${e+t+i}px`,padding:"30px 0",pointerEvents:"none"}:{top:0,height:"100vw",width:"3px",right:`${e+t+a}px`,padding:"30px 0",pointerEvents:"none"},sv=({startMarker:e,endMarker:t,startPoint:r,endPoint:o,screen:n,direction:s,invertSide:i,label:a})=>{let{lastStartMarker:c,lastEndMarkerEl:l}=kI({startMarker:e,endMarker:t,label:a}),{top:p,right:d,bottom:f,left:h}=NI({screen:n}),v=PI({startPoint:r,direction:s,invertSide:i,top:p,bottom:f,left:h,right:d}),b=AI({startPoint:r,endPoint:o,direction:s,invertSide:i,top:p,bottom:f,left:h,right:d}),T={position:"fixed",zIndex:"99999",background:ue.get("scrollTrigger")?.markerColor?.startEnd||"#ff0000",fontSize:"14px",whiteSpace:"nowrap",textTransform:"uppercase"};return u.useFrame(()=>{Object.assign(c?.style,{...T,...v}),Object.assign(l?.style,{...T,...b})}),{startMarker:c,endMarker:l}};var iv=({marker:e,direction:t,invertSide:r})=>{if(!e)return{};let n=`3px ${ue.get("scrollTrigger")?.markerColor?.item||"#14df3b"} solid`;return t===y.DIRECTION_VERTICAL?r?{borderBottom:n}:{borderTop:n}:r?{borderRight:n}:{borderLeft:n}};var Ha=class{#n=0;#t=0;#i=0;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#_;#v;#y;#T;#R;#S;#w;#A;#k;#O;#E;#N;#P;#b;#D;#B;#I;#F;#L;#C;#Y;#H;#M;#W;#$;constructor(){this.#l=void 0,this.#d=0,this.#u=()=>0,this.#s=()=>0,this.#c=y.DIRECTION_VERTICAL,this.#r=0,this.#e=void 0,this.#p=void 0,this.#a=void 0,this.#o=void 0,this.#g=!1,this.#m=!1,this.#x=!1,this.#_=()=>{},this.#v=()=>{},this.#y=()=>{},this.#T=!0,this.#h=void 0,this.#f=globalThis,this.#M="left",this.#$=!0,this.#W=!1,this.#R=["flex","flex-shrink","flex-basis","float","display","grid-area","grid-column-start","grid-column-end","grid-row-start","grid-row-end","box-sizing","order","place-self","align-self","justify-self"],this.#S=["font-size","padding","margin","line-height","white-space"],this.#w=["text-align"],this.#A=["z-index","pointer-events"],this.#k=["transform","position","translate","rotate","scale"],this.#O=["none","static"],this.#E=!1,this.#N=0,this.#P=0,this.#b=!1,this.#D=1.5,this.#B=!1,this.#I=!1,this.#F=0,this.#L=0,this.#C=!1,this.#Y=0,this.#H=3}init(t){this.#e=t.item,this.#h=t.marker,this.#f=t.screen,this.#b=t.animatePin,this.#$=t.anticipatePinOnLoad,this.#B=t.forceTranspond,this.#l=t.invertSide,this.#c=t.direction,this.#u=t.getStart,this.#s=t.getEnd,this.#t=this.#u(),this.#d=this.#s(),this.#P=window.scrollY,this.#n=t?.scrollerHeight,this.#ue(),this.#M=this.#c===y.DIRECTION_VERTICAL?"top":"left",this.#E=!0,this.#T=!0,this.#re(),this.#se(),this.#K(),this.#U(),this.#v=u.useScrollStart(()=>{this.#E&&this.#f!==globalThis&&this.#m&&this.#o&&u.useFrame(()=>{this.#o&&(this.#o.style.transition="transform .85s cubic-bezier(0, 0.68, 0.45, 1.1)")})}),this.#_=u.useScroll(({scrollY:r})=>{if(this.#E&&this.#f!==globalThis&&this.#f!==document.documentElement){this.#c===y.DIRECTION_VERTICAL&&this.#ue();let o=r-this.#P;if(this.#P=r,this.#m&&this.#o&&this.#p){let{verticalGap:n}=this.#p.get(),s=n-o;this.#p.setData({collision:0,verticalGap:s}),u.useFrame(()=>{this.#o&&(this.#o.style.transform=`translate(0px,${s}px)`)})}}})}#U(){this.#p=new Ht({data:{collision:0,verticalGap:0},config:"wobbly"}),this.#y=this.#p.subscribe(({collision:t,verticalGap:r})=>{this.#c===y.DIRECTION_VERTICAL&&this.#o?this.#o.style.transform=`translate(0px, ${t}px)`:this.#o&&(this.#o.style.transform=`translate(${t}px, ${r}px)`)})}#G(){this.#o&&this.#p&&this.#p.set({collision:0,verticalGap:0}).catch(()=>{})}#re(){this.#e||(this.#e=document.createElement("div"));let t=document.createElement("div");t.classList.add("pin-wrapper");let r=document.createElement("div");r.classList.add("pin"),t.append(r);let o=this.#e?.parentNode;o&&o.insertBefore(t,this.#e),r.append(this.#e),this.#a=this.#e.closest(".pin-wrapper"),this.#o=this.#e.closest(".pin");let n=this.#Q(),s=this.#j(),i=iv({marker:this.#h,invertSide:this.#l,direction:this.#c}),a={display:"table"};u.useFrame(()=>{!this.#o||!this.#a||(Object.assign(this.#a.style,{...i}),Object.assign(this.#o.style,{...a,...s,...n}))}),this.#oe()}#K(){if(!this.#o||!this.#a)return;let t=this.#a.offsetHeight,r=this.#a.offsetWidth;this.#a.style.height=`${t}px`,this.#a.style.width=`${r}px`,this.#o.style.height=`${t}px`,this.#o.style.width=`${r}px`}#se(){if(!this.#e)return;let t=globalThis.getComputedStyle(this.#e),r=this.#R.reduce((o,n)=>({...o,[n]:t.getPropertyValue(n)}),{});u.useFrame(()=>{this.#a&&Object.assign(this.#a.style,r)})}#ee(t,r){let o=t.parentNode;if(o)for(;o!==null&&o!==document;){let n=getComputedStyle(o);if(n[r]&&!this.#O.includes(n[r]))return{[r]:n[r]};o=o.parentNode}}#Q(){return this.#o?this.#w.map(r=>this.#ee(this.#o,r)).filter(r=>r!==null).reduce((r,o)=>({...r,...o}),{})??{}:{}}#oe(){if(this.#B){this.#W=!0;return}this.#W=this.#k.map(t=>{let r=this.#ee(this.#a,t);if(!r)return!1;let[o]=Object.keys(r),[n]=Object.values(r);return o==="position"?n==="fixed"||n==="absolute":!0}).includes(!0)}#ie(){this.#t=this.#u(),this.#d=this.#s()}#ue(){this.#ie(),this.#f!==globalThis&&(this.#t-=this.#c===y.DIRECTION_VERTICAL?Et(this.#f).top:Et(this.#f).left),this.#i=this.#l?this.#t:this.#n-this.#t,this.#r=this.#l?-Math.trunc(this.#d):Math.trunc(this.#d)}destroy(){this.#E&&(this.#p?.stop?.(),this.#y(),this.#_(),this.#v(),this.#p?.destroy?.(),this.#p=null,this.#F=0,this.#I=!1,this.#x=!1,this.#m=!1,this.#g=!1,this.#o&&this.#a&&(this.#a.parentNode?.insertBefore(this.#e,this.#a),this.#o.remove(),this.#a.remove(),this.#a=void 0,this.#o=void 0,this.#E=!1))}#ce(){return this.#a?this.#c===y.DIRECTION_VERTICAL?Et(this.#a).top-this.#i:Et(this.#a).left-this.#i:0}#fe(){let t=this.#ce();this.#be(t)}#pe(){let t=this.#l?this.#ce()-this.#d:this.#ce()+this.#d;this.#be(t)}#be(t){u.useFrame(()=>{if(!this.#o||!this.#M)return;let r=this.#o?.style??{};r[this.#M]=`${this.#i}px`}),this.#b&&!this.#T&&this.#o&&this.#p&&this.#p.goFrom({collision:t}).then(()=>{this.#ge()}).catch(()=>{})}#ge(){u.useFrame(()=>{this.#o&&(this.#o.style.transform="translate(0px, 0px)")})}#X(){this.#G(),u.useFrame(()=>{this.#o&&(this.#o.style.transition="",this.#o.style.position="relative",this.#o.style.top="",this.#o.style.left="")})}#q(){this.#G(),u.useFrame(()=>{this.#o&&(this.#o.style.transition="",this.#o.style.position="relative",this.#c===y.DIRECTION_VERTICAL?(this.#o.style.left="",this.#o.style.top=`${this.#r}px`):(this.#o.style.top="",this.#o.style.left=`${this.#r}px`))})}#J(){if(!this.#o)return;let t=this.#c===y.DIRECTION_VERTICAL?Et(this.#o).left:Et(this.#o).top,r=this.#c===y.DIRECTION_VERTICAL?"left":"top";u.useFrame(()=>{this.#o&&(this.#o.style.position="fixed",this.#o.style[r]=`${t}px`,this.#I=!0,this.#C=!0)})}#j(){if(!this.#e)return{};let t=globalThis.getComputedStyle(this.#e);return this.#A.reduce((r,o)=>({...r,[o]:t.getPropertyValue(o)}),{})}#Z(){if(!this.#e)return{};let t=globalThis.getComputedStyle(this.#e);return this.#S.reduce((r,o)=>({...r,[o]:t.getPropertyValue(o)}),{})}#te(){return this.#S.reduce((t,r)=>({...t,[r]:""}),{})}#V(){if(this.#W){let t=this.#Q(),r=this.#j(),o=this.#Z();u.useFrame(()=>{this.#o&&(Object.assign(this.#o.style,{...r,...t}),this.#e&&Object.assign(this.#e.style,o),document.body.append(this.#o))})}}#ne(){!this.#W||!this.#e||!this.#a||u.useFrame(()=>{this.#o&&(Object.assign(this.#e.style,this.#te()),this.#a?.append(this.#o))})}#me(t){let r=this.#C&&this.#Y<3?this.#L:tt(Math.abs(t-this.#N),0,250);return this.#C&&this.#Y<this.#H?this.#Y++:(this.#Y=0,this.#C=!1),this.#L=r,r*this.#D}#z(t,r){if(this.#b&&!this.#T||this.#T&&!this.#$)return{anticipateBottom:0,anticipateInnerIn:0,anticipateInnerOut:0};let o=this.#me(t),n=r===y.SCROLL_UP?0:o,s=r===y.SCROLL_UP?0:o*2,i=r===y.SCROLL_UP?o:0;return{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}}#ve(t,r){if(this.#b&&!this.#T||this.#T&&!this.#$)return{anticipateBottom:0,anticipateInnerIn:0,anticipateInnerOut:0};let o=this.#me(t),n=r===y.SCROLL_UP?o:0,s=r===y.SCROLL_UP?o*2:0,i=r===y.SCROLL_UP?0:o;return{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}}onScroll(t){if(!this.#E||!this.#a)return;if(this.#I&&this.#F<this.#H){this.#F++;return}else this.#F=0,this.#I=!1;let r=this.#N>t?y.SCROLL_UP:y.SCROLL_DOWN,o=this.#c===y.DIRECTION_VERTICAL?Et(this.#a).top:Et(this.#a).left,{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}=this.#l?this.#ve(t,r):this.#z(t,r),a=this.#l?o<this.#t-n:o>this.#n-this.#t+n,c=this.#l?o>=this.#t-s&&o<=this.#t+i+this.#d:o<=this.#n-this.#t+s&&this.#n-o<=this.#d+i+this.#t;if(a)this.#x||(this.#X(),this.#ne(),this.#x=!0,this.#m=!1,this.#g=!1);else if(c){if(!this.#m){this.#J();let l=r===y.SCROLL_DOWN&&!this.#l||r===y.SCROLL_UP&&this.#l;this.#V(),l?this.#fe():this.#pe(),this.#x=!1,this.#m=!0,this.#g=!1}}else this.#g||(this.#q(),this.#ne(),this.#x=!1,this.#m=!1,this.#g=!0);this.#N=t,this.#T=!1}};var av=()=>{console.warn("parallax prop checker: value in start or end prop with no unit misure is not allowed, failed operation, use vh in vertical mode or vw in horizontal or px")},cv=()=>{console.warn("parallax prop checker: value in start or end in vh is not allowed in horizontal mode, use vw or px")},lv=()=>{console.warn("parallax prop checker: value in start or end in vw is not allowed in vertical mode, use vh or px")};var ku=()=>({numberVal:0,unitMisure:"",additionalVal:"",position:""}),uv=({invert:e,endValInNumber:t,scrollerHeight:r,isNegative:o,startPoint:n,isFromTopLeft:s})=>{let i=t*o-n,a=r-t*o-n;return e?s?i:a:s?a:i},pv=({invert:e,scrollerHeight:t,screenUnit:r,endValInNumber:o,isNegative:n,startPoint:s,isFromTopLeft:i})=>e?i?t-r*(100-o*n)-s:r*(100-o*n)-s:i?t-r*o*n-s:r*o*n-s,mv=({offset:e,height:t,gap:r,wScrollTop:o,wHeight:n})=>e+t>o-r&&e<o+(n+r),dv=(e,t)=>{let r=e.find(c=>[...c].some(l=>!Number.isNaN(Number.parseFloat(l)))),o=by(r);if(r&&!o)return av(),ku();if(r&&o===y.VH&&t===y.DIRECTION_HORIZONTAL)return cv(),ku();if(r&&o===y.VW&&t===y.DIRECTION_VERTICAL)return lv(),ku();let n=[y.PLUS_HEIGHT,y.PLUS_HEIGHT_HALF,y.PLUS_WIDTH,y.PLUS_WIDTH_HALF,y.MINUS_HEIGHT,y.MINUS_HEIGHT_HALF,y.MINUS_WIDTH,y.MINUS_WIDTH_HALF],s=e.find(c=>fu(n,c)),i=[y.POSITION_BOTTOM,y.POSITION_TOP,y.POSITION_LEFT,y.POSITION_RIGHT],a=e.find(c=>fu(i,c));return{numberVal:r||0,unitMisure:o,additionalVal:s??"",position:a??y.POSITION_BOTTOM}},hv=(e,t,r)=>{let n=String(t).split(" "),{numberVal:s,unitMisure:i,additionalVal:a,position:c}=dv(n,r),p=String(s).charAt(0)==="-"?-1:1,f=Number.parseFloat(String(s).replaceAll(/^\D+/g,""))??0;return i===y.PX?{value:f*p,additionalVal:a,position:wa(c)}:{value:e*f*p,additionalVal:a,position:wa(c)}},fv=(e,t,r,o,n,s)=>{let a=String(t).split(" "),{numberVal:c,unitMisure:l,additionalVal:p,position:d}=dv(a,s),h=String(c).charAt(0)==="-"?-1:1,b=Number.parseFloat(String(c).replaceAll(/^\D+/g,""))??0,T=wa(d),_=T===y.POSITION_TOP||T===y.POSITION_LEFT;return l===y.PX?{value:uv(n?{invert:!0,endValInNumber:b,scrollerHeight:o,isNegative:h,startPoint:r,isFromTopLeft:_}:{invert:!1,endValInNumber:b,scrollerHeight:o,isNegative:h,startPoint:r,isFromTopLeft:_}),additionalVal:p,position:T}:{value:pv(n?{invert:!0,scrollerHeight:o,screenUnit:e,endValInNumber:b,isNegative:h,startPoint:r,isFromTopLeft:_}:{invert:!1,scrollerHeight:o,screenUnit:e,endValInNumber:b,isNegative:h,startPoint:r,isFromTopLeft:_}),additionalVal:p,position:T}},Nu=(e,t,r,o)=>{let n=String(t);return Ae(n,y.PLUS_HEIGHT_HALF)?e+r/2:Ae(n,y.PLUS_HEIGHT)?e+r:Ae(n,y.PLUS_WIDTH_HALF)?e+o/2:Ae(n,y.PLUS_WIDTH)?e+o:Ae(n,y.MINUS_HEIGHT_HALF)?e-r/2:Ae(n,y.MINUS_HEIGHT)?e-r:Ae(n,y.MINUS_WIDTH_HALF)?e-o/2:Ae(n,y.MINUS_WIDTH)?e-o:e},gv=({switchPropierties:e,isReverse:t,value:r})=>{switch(e){case y.IN_STOP:return!t&&r>0||t&&r<0?0:r;case y.IN_BACK:return!t&&r>0||t&&r<0?-r:r;case y.OUT_STOP:return!t&&r<0||t&&r>0?0:r;case y.OUT_BACK:return!t&&r<0||t&&r>0?-r:r;default:return r}},bv=(e,t)=>e===y.PROP_OPACITY?1-t:-t,Pu=({callback:e,pin:t,ease:r,useThrottle:o})=>t?u.useScrollImmediate(e):r&&o?u.useScrollThrottle(e):u.useScroll(e);var mo=class{#n=!1;#t=!1;#i=0;#l=0;#d=0;#u=0;#s=0;#c=0;#r=0;#e;#p;#a;#h;#f;#o;#g;#m;#x;#_;#v;#y;#T;#R;#S;#w;#A;#k;#O;#E;#N;#P;#b;#D;#B;#I;#F;#L;#C;#Y;#H;#M;#W;#$;#U;#G;#re;#K;#se;#ee;#Q;#oe;#ie;#ue;#ce;#fe;#pe;#be;#ge;#X;#q;#J;#j;#Z;#te;#V;#ne;#me;#z;#ve;#de;#he;#le;#Ee;#Te;#ye;#Ce;#we;#Ie;#ke;#ae;constructor(t){this.#e=window.innerWidth,this.#p=window.innerHeight,this.#a=800,this.#h=0,this.#f=()=>{},this.#o=()=>{},this.#g=()=>{},this.#m=()=>{},this.#x=()=>{},this.#_=void 0,this.#v=void 0,this.#y=void 0,this.#T=0,this.#R=!1,this.#S=void 0,this.#w=!0,this.#A=!1,this.#k=!1,this.#O=!1,this.#E=void 0,this.#N="",this.#P=0,this.#b=0,this.#D=()=>{},this.#B=()=>{},this.#M=!1,this.#I=pe(t?.pin,"Scrolltrigger pin propierties error:",!1),this.#F=pe(t?.animatePin,"Scrolltrigger animatePin propierties error:",!1),this.#L=pe(t?.forceTranspond,"Scrolltrigger forceTranspond propierties error:",!1),this.#C=pe(t?.anticipatePinOnLoad,"Scrolltrigger anticipatePinOnLoad propierties error:",!1),this.#Y=Pa(t?.start,"Scrolltrigger start propierties error:","bottom 0px"),this.#H=Pa(t?.end,"Scrolltrigger end propierties error:","top"),this.#W=Pa(t?.marker,"Scrolltrigger marker propierties error:",void 0),this.#$=t?.dynamicStart?_u(t.dynamicStart,"dynamicStart"):null,this.#U=t?.dynamicEnd?_u(t.dynamicEnd,"dynamicEnd"):null,this.#G=$y(t?.dynamicRange),this.#re=pe(t?.animateAtStart,"Scrolltrigger animateAtStart propierties error:",!1),this.#K=co(t?.onEnter,!1,"Scrolltrigger onEnter propierties error"),this.#se=co(t?.onEnterBack,!1,"Scrolltrigger onEnterBack propierties error"),this.#ee=co(t?.onLeave,!1,"Scrolltrigger onLeave propierties error"),this.#Q=co(t?.onLeaveBack,!1,"Scrolltrigger onLeaveBack propierties error"),this.#oe=co(t?.onTick,!1,"Scrolltrigger onTickCallback propierties error"),this.#ie=Dy(t?.align),this.#ue=Fy(t?.onSwitch),this.#ce=pe(t?.reverse,"Parallax reverse propierties error:",!1),this.#fe=xu(t?.opacityStart,"Parallax opacityStart propierties error:",100),this.#pe=xu(t?.opacityEnd,"Parallax opacityEnd propierties error:",0),this.#be=pe(t?.limiterOff,"Parallax|Scrolltrigger limiterOff propierties error:",!1),this.#ge=t?.useWillChange,this.#X=Ly(t?.tween);let r=this.#X?.getType&&this.#X.getType()===y.TWEEN_TIMELINE,o=this.#X?.getType&&this.#X.getType()===y.TWEEN_TWEEN;this.#q=Dn(t?.item,!1),this.#J=Dn(t?.scroller,!0),this.#j=Dn(t?.screen,!0),this.#Z=Su(t?.trigger),this.#te=Su(t?.applyTo),this.#V=$s(t?.direction,"Parallax/Scrolltrigger"),this.#ne=pe(t?.disableForce3D,"Parallax|Scrolltrigger disableForce3D propierties error:",!1),this.#me=pe(t?.useThrottle,"Parallax|Scrolltrigger useThrottle propierties error:",!1),this.#z=By(t?.type),this.#ve=cr(t?.perspective,"Parallax|Scrolltrigger perspective propierties error:",0),this.#de=Vo(t?.breakpoint,"breakpoint","parallax/scrolltrigger"),this.#he=Wo(t?.queryType,"queryType","parallax/scrolltrigger");let{propierties:n,shouldTrackOnlyEvents:s}=Wy(t?.propierties,this.#z,o,r);this.#le=n,this.#Ee=s,this.#Te=s?"100px":Vy(t?.range,this.#z),this.#ye=pe(t?.ease,"Parallax|Scrolltrigger ease propierties error:",!1),r&&t?.easeType===y.EASE_SPRING&&oy(),this.#Ce=r?y.EASE_LERP:jy(t?.easeType),this.#we=zy(t?.springConfig,this.#z),this.#Ie=Hy(t?.lerpConfig,this.#z),this.#ke=this.#Ce===y.EASE_SPRING?{configProps:{precision:y.EASE_PRECISION}}:{precision:y.EASE_PRECISION},this.#ae=this.#Ce===y.EASE_SPRING?new Ht:new Pr}init(){if(this.#n){console.warn("Parallax/scrollTrigger: The init() method cannot be launched more than once. If you are passing the instance to components like horizontalScroller or smoothScroller via the children property, they will initialize the instance.");return}this.#n=!0,this.#je(),this.#Oe(),this.#Ae(),this.#$e(),this.#Le(),this.#Fe(),this.setPerspective(),this.#le===y.PROP_TWEEN&&(this.#Te=this.#X?.getDuration?this.#X.getDuration():0,this.#G=()=>this.#Te,this.#X?.inzializeStagger?.()),this.#z==y.TYPE_SCROLLTRIGGER&&(this.#be=!0,this.#Pe(),this.#Me()),this.#ye&&(this.#g=u.useScrollStart(()=>{this.#ne||(this.#O=!0)}),this.#m=u.useScrollEnd(()=>{u.useFrame(()=>{u.useNextTick(()=>{this.#xe()})})}),this.#J===globalThis&&(this.#o=Pu({pin:this.#I,ease:this.#ye,useThrottle:this.#me,callback:()=>{this.#xe()}})),this.#xe()),this.#ye||(this.#J===globalThis&&(this.#o=Pu({pin:this.#I,ease:this.#ye,useThrottle:this.#me,callback:()=>{this.#_e(),this.#Se()}})),this.#_e(),this.#Se(),this.#m=u.useScrollEnd(()=>{this.#Se({forceRender:!0})})),this.#J!==globalThis&&this.#W&&(this.#x=u.useScroll(()=>{this.#Me()})),this.#f=u.useResize(({horizontalResize:t})=>{t&&this.refresh()}),this.#I&&(this.#E=new Ha,ge[this.#he](this.#de)&&u.useNextTick(()=>{this.#De(),this.#E?.init(this.#Ne()),this.#E?.onScroll(this.#c)}))}#Ne(){return{item:this.#q,marker:this.#W,screen:this.#j,animatePin:this.#F,anticipatePinOnLoad:this.#C,forceTranspond:this.#L,invertSide:this.#M,direction:this.#V,scrollerHeight:this.#r,getStart:()=>this.#P,getEnd:()=>this.#b}}setScroller(t){this.#J=Dn(t,!0)}setScreen(t){this.#j=Dn(t,!0)}setDirection(t){this.#V=$s(t,"Parallax/Scrolltrigger")}setBreakPoint(t){this.#de=Vo(t,"breakpoint","Parallax/Scrolltrigger")}setQueryType(t){this.#he=Wo(t,"queryType","Parallax/Scrolltrigger")}setPerspective(){if(this.#ve&&this.#q&&this.#q.parentNode){let t={perspective:`${this.#ve}px`,"transform-style":"preserve-3d"},r=this.#q.parentNode;Object.assign(r.style,t)}}#je(){let t=y.PROP_SCALE||y.PROP_SCALE_X||y.PROP_SCALE_Y||y.PROP_OPACITY?1:0;switch(this.#ae.setData({val:t}),this.#D=this.#ae.subscribe(({val:r})=>{r!==this.#y&&(this.#le===y.PROP_TWEEN&&this.#X?.draw?(this.#X.draw({partial:r,isLastDraw:!1,useFrame:!1}),this.#y=r,this.#w=!1):this.#Re(r),u.useNextTick(()=>{this.#oe&&this.#oe({value:r,parentIsMoving:!0})}))}),this.#B=this.#ae.onComplete(({val:r})=>{this.#O=!1,this.#le===y.PROP_TWEEN&&this.#X?.draw?this.#X.draw({partial:r,isLastDraw:!0,useFrame:!1}):this.#Re(r),u.useNextTick(()=>{this.#oe&&this.#oe({value:r,parentIsMoving:!1})})}),this.#Ce){case y.EASE_LERP:{this.#Ie&&"updateVelocity"in this.#ae&&this.#ae?.updateVelocity?.(this.#Ie);break}case y.EASE_SPRING:{this.#we&&"updateConfig"in this.#ae&&this.#ae?.updateConfig?.(this.#we);break}}}#Pe(){if(this.#G){let t=this.#G();this.#h=Number.isNaN(t)?0:Number.parseFloat(t),this.#N=y.PX}else{let t=String(this.#Te),o=t.charAt(0)==="-"?-1:1,n=Uy(t,this.#le);this.#h=Number.parseFloat(n.replaceAll(/^\D+/g,""))*o,this.#N=yy(n)}}#Me(){let t=this.#r/100;if(this.#$&&this.#$?.position&&this.#$?.value?.()!==void 0){let{position:l,value:p}=this.#$,d=p();Number.isNaN(d)||(this.#Y=`${l} ${d}px`)}let{value:r,additionalVal:o,position:n}=hv(t,this.#Y,this.#V);if(this.#M=n===y.POSITION_TOP||n===y.POSITION_LEFT,this.#P=Nu(r,o,this.#V===y.DIRECTION_VERTICAL?this.#u:this.#s,this.#V===y.DIRECTION_VERTICAL?this.#s:this.#u),this.#U&&this.#U?.position&&this.#U?.value?.()!==void 0){let{position:l,value:p}=this.#U,d=p();Number.isNaN(d)||(this.#H=`${l} ${d}px`)}let{value:s,additionalVal:i,position:a}=fv(t,this.#H,this.#P,this.#r,this.#M,this.#V),c=this.#M?a===y.POSITION_BOTTOM||a===y.POSITION_RIGHT?-1:1:a===y.POSITION_BOTTOM||a===y.POSITION_RIGHT?1:-1;this.#b=Nu(s,i,this.#V===y.DIRECTION_VERTICAL?this.#u*c:this.#s*c,this.#V===y.DIRECTION_VERTICAL?this.#s*c:this.#u*c),this.#ze(),this.#M&&(this.#P-=this.#u)}#ze(){if(this.#W){let{startMarker:t,endMarker:r}=sv({startMarker:this.#_,endMarker:this.#v,startPoint:this.#P,endPoint:this.#b,screen:this.#j,direction:this.#V,invertSide:this.#M,label:this.#W});this.#_=t,this.#v=r}}#Ae(){let t=this.#Z??this.#q;if(!t)return;let r=0,o=0,n=0;this.#Z&&(r=xo(this.#Z)?.x??0,o=xo(this.#Z)?.y??0,n=xo(this.#Z)?.z??0),t.style.transform="",this.#V===y.DIRECTION_VERTICAL?this.#i=this.#J===globalThis?Math.trunc(le(t).top):Math.trunc(le(t).top)-le(this.#J).top:this.#i=this.#J===globalThis?Math.trunc(le(t).left):Math.trunc(le(t).left)-le(this.#J).left,this.#j&&this.#j!==globalThis&&(this.#i-=this.#V===y.DIRECTION_VERTICAL?Math.trunc(le(this.#j).top):Math.trunc(Et(this.#j).left)),this.#Z&&(r!==0||o!==0||n!==0)&&(this.#Z.style.transform=`translate3D(${r}px, ${o}px, ${n}px)`)}#Oe(){this.#j===globalThis||!this.#j||(this.#l=this.#V===y.DIRECTION_VERTICAL?Math.trunc(le(this.#j).top):Math.trunc(Et(this.#j).left))}#$e(){let t=this.#Z??this.#q;t&&(this.#u=this.#V===y.DIRECTION_VERTICAL?Math.trunc(t.offsetHeight):Math.trunc(t.offsetWidth))}#Le(){let t=this.#Z??this.#q;t&&(this.#s=this.#V===y.DIRECTION_VERTICAL?Math.trunc(t.offsetWidth):Math.trunc(t.offsetHeight))}#De(){this.#J&&(this.#J===globalThis?this.#c=this.#V===y.DIRECTION_VERTICAL?this.#J.scrollY:this.#J.scrollX:this.#c=this.#V===y.DIRECTION_VERTICAL?-le(this.#J).top:-le(this.#J).left)}#Fe(){this.#j&&(this.#e=window.innerWidth,this.#p=window.innerHeight,this.#j===globalThis?this.#r=this.#V===y.DIRECTION_VERTICAL?window.innerHeight:window.innerWidth:this.#r=this.#V===y.DIRECTION_VERTICAL?Math.trunc(this.#j.offsetHeight):Math.trunc(this.#j.offsetWidth))}refresh(){this.#I&&this.#E&&this.#E.destroy(),this.#Oe(),this.#Ae(),this.#$e(),this.#Le(),this.#Fe(),this.#z==y.TYPE_SCROLLTRIGGER&&(this.#Me(),this.#G&&this.#Pe(),this.#I&&this.#E&&ge[this.#he](this.#de)&&this.#E?.init(this.#Ne())),this.#y=void 0,this.#w=!0,ge[this.#he](this.#de)?this.#ye?this.#xe():(this.#_e(),this.#Se({forceRender:!0})):(this.#ye&&this.#ae?.stop?.(),u.useFrameIndex(()=>{this.#te?(this.#Ve(this.#te),Object.assign(this.#te.style,this.#We())):(this.#Ve(this.#q),this.#q&&Object.assign(this.#q.style,this.#We()))},3))}move({value:t,parentIsMoving:r=!1}){if(!ge[this.#he](this.#de)||!t)return;this.#k=!0;let o=this.#He(t);if(this.#ye)this.#xe(o);else{this.#_e(o);let n=this.#A||this.#w||void 0;this.#Se({forceRender:n,parentIsMoving:r})}}triggerScrollStart(){this.#ye&&(this.#ne||(this.#O=!0))}triggerScrollEnd(){this.#ye||this.#Se({forceRender:!0})}#He(t){if(t!==void 0)return this.#j!==globalThis?t+this.#l:t}stopMotion(){this.#ae?.stop?.()}#_e(t){if(!ge[this.#he](this.#de)||(t?this.#c=-t:this.#De(),this.#A=mv({offset:this.#i,height:this.#u,gap:this.#a,wScrollTop:this.#c,wHeight:this.#r}),!this.#A&&!this.#be&&this.#z===y.TYPE_PARALLAX))return;this.#I&&this.#E&&this.#E.onScroll(this.#c),this.#z===y.TYPE_SCROLLTRIGGER?this.#d=Se(this.#Ue()):this.#le===y.PROP_OPACITY?this.#d=Se(this.#qe()):this.#d=Number.isNaN(Number.parseInt(this.#ie))?Se(this.#Je()/2):Se(this.#Ye()/2);let r=this.#ce&&this.#z!==y.TYPE_SCROLLTRIGGER?bv(this.#le,this.#d):this.#d;this.#d=this.#z===y.TYPE_SCROLLTRIGGER?r:this.#Xe(r)}#xe(t){if(!ge[this.#he](this.#de)||(this.#_e(t),!this.#R&&!this.#w&&this.#z===y.TYPE_SCROLLTRIGGER)||!this.#A&&!this.#w&&this.#z===y.TYPE_PARALLAX)return;let r=this.#w&&!this.#re?"set":"goTo";this.#ae&&this.#ae[r]({val:this.#d},this.#ke).catch(()=>{})}#Se({forceRender:t=!1,parentIsMoving:r=!1}={}){ge[this.#he](this.#de)&&u.useFrame(()=>{this.#d===this.#y&&!t||!this.#A&&!t||(!this.#ne&&!this.#k&&(this.#O=!t),!this.#ne&&this.#k&&(this.#O=r&&this.#A),this.#le===y.PROP_TWEEN?(this.#X.draw({partial:this.#d,isLastDraw:!this.#O,useFrame:!1}),this.#y=this.#d,this.#w=!1):this.#Re(this.#d),u.useNextTick(()=>{this.#oe&&this.#oe({value:this.#d,parentIsMoving:this.#O})}))})}#Ue(){let t=this.#M?-(this.#c+this.#P+this.#b-(this.#i+this.#b)):-(this.#c+this.#r-this.#P-(this.#i+this.#b)),r=this.#b/100*this.#h,o=t/100*this.#h,n=this.#ce?this.#M?r-o:o:this.#M?o:r-o,s=r>0?-tt(n,0,r):-tt(n,r,0);if(this.#R=this.#S!==s,this.#S=s,!this.#R&&!this.#w)return this.#d;let i=s*100/this.#b;switch((this.#K||this.#se||this.#ee||this.#Q)&&nv({prevValue:this.#T,value:n,maxVal:r,onEnter:this.#K,onEnterBack:this.#se,onLeave:this.#ee,onLeaveBack:this.#Q}),this.#T=n,this.#le){case y.PROP_HORIZONTAL:case y.PROP_VERTICAL:return this.#Ge(i);case y.PROP_SCALE:case y.PROP_SCALE_X:case y.PROP_SCALE_Y:case y.PROP_OPACITY:return 1-i;default:return-i}}#Ge(t){switch(this.#N){case y.VW:return this.#e/100*-t;case y.VH:return this.#p/100*-t;case y.WPERCENT:return this.#V===y.DIRECTION_VERTICAL?this.#s/100*-t:this.#u/100*-t;case y.HPERCENT:return this.#V===y.DIRECTION_VERTICAL?this.#u/100*-t:this.#s/100*-t;default:return-t}}#qe(){let t=this.#r/100*this.#pe,r=this.#r-this.#r/100*this.#fe,o=this.#ie==y.ALIGN_START?-this.#c*-1:(this.#c+t-this.#i)*-1,n=this.#ie==y.ALIGN_START?1-o/this.#i:1-o/(this.#r-r-t);return tt(n,0,1)}#Je(){let t=Number(this.#Te),r=Number.isNaN(t)?0:t,o=this.#V===y.DIRECTION_VERTICAL?document.documentElement.scrollHeight:document.documentElement.scrollWidth;switch(this.#ie){case y.ALIGN_START:return(this.#c+this.#l)/r;case y.ALIGN_TOP:case y.ALIGN_LEFT:return(this.#c-this.#i)/r;case y.ALIGN_CENTER:return(this.#c+(this.#r/2-this.#u/2)-this.#i)/r;case y.ALIGN_BOTTOM:case y.ALIGN_RIGHT:return(this.#c+(this.#r-this.#u)-this.#i)/r;case y.ALIGN_END:return-(o-(this.#c+this.#r))/r;default:return 0}}#Ye(){let t=Number(this.#ie),r=Number(this.#Te);return(this.#c+this.#r/100*t-this.#i)/r}#Xe(t){return gv({switchPropierties:this.#ue,isReverse:this.#ce,value:t})}#Re(t){this.#te?Object.assign(this.#te.style,this.#Be(t)):this.#q&&Object.assign(this.#q.style,this.#Be(t)),this.#y=t,this.#w=!1}#Be(t){if(this.#Ee)return;let r=this.#O?"translate3D(0px, 0px, 0px)":"";this.#t=this.#ge?u.mustMakeSomething():!1;let o=this.#t&&this.#O?"transform":"",n=u.shouldMakeSomething()?Math.round(t):t;switch(this.#le){case y.PROP_VERTICAL:return{transform:`${r} translateY(${n}px)`,willChange:o};case y.PROP_HORIZONTAL:return{transform:`${r} translateX(${n}px)`,willChange:o};case y.PROP_ROTATE:return{transform:`${r} rotate(${n}deg)`,willChange:o};case y.PROP_ROTATEY:return{transform:`${r} rotateY(${n}deg)`,willChange:o};case y.PROP_ROTATEX:return{transform:`${r} rotateX(${n}deg)`,willChange:o};case y.PROP_ROTATEZ:return{transform:`${r} rotateZ(${n}deg)`,willChange:o};case y.PROP_OPACITY:return{opacity:`${t}`};case y.PROP_SCALE:{let s=this.#z===y.TYPE_SCROLLTRIGGER?t:1+t/1e3;return{transform:`${r} scale(${s})`,willChange:o}}case y.PROP_SCALE_X:{let s=this.#z===y.TYPE_SCROLLTRIGGER?t:1+t/1e3;return{transform:`${r} scaleX(${s})`,willChange:o}}case y.PROP_SCALE_Y:{let s=this.#z===y.TYPE_SCROLLTRIGGER?t:1+t/1e3;return{transform:`${r} scaleY(${s})`,willChange:o}}default:return{[this.#le.toLowerCase()]:`${t}px`}}}#Ve(t){this.#X&&t&&(t.style="")}#We(){if(!this.#Ee)switch(this.#le){case y.PROP_VERTICAL:case y.PROP_HORIZONTAL:case y.PROP_ROTATE:case y.PROP_ROTATEY:case y.PROP_ROTATEX:case y.PROP_ROTATEZ:case y.PROP_SCALE:return{transform:""};case y.PROP_OPACITY:return{opacity:""};default:return{[this.#le.toLowerCase()]:""}}}destroy(){this.#ae?.stop?.(),this.#o(),this.#g(),this.#m(),this.#f(),this.#D(),this.#B(),this.#x(),this.#ae?.destroy?.(),this.#ae=null,this.#G=()=>{},this.#$?.value&&(this.#$.value=()=>0),this.#U?.value&&(this.#U.value=()=>0),this.#K=()=>{},this.#se=()=>{},this.#ee=()=>{},this.#Q=()=>{},this.#oe=()=>{},this.#I&&this.#E&&this.#E?.destroy?.(),this.#_&&this.#_?.remove?.(),this.#v&&this.#v?.remove?.(),this.#_=void 0,this.#v=void 0,this.#E=void 0,this.#d=0;let t=this.#te??this.#q;t&&"style"in t&&(t.style=""),this.#q=null,this.#J=null,this.#j=null,this.#Z=null,this.#te=null}};function OI(e){return new mo({...e,type:y.TYPE_PARALLAX})}function $I(e){return new mo({...e,type:y.TYPE_SCROLLTRIGGER})}var Au=window.innerHeight,Ou=document.body.offsetHeight,ho=!1,$u=!0,Ut=window.scrollY,zs=!0,Gt=!1,Lu=()=>{},Du=()=>{},Ga=()=>{},Ua,yv=()=>{document.body.classList.remove("is-whelling")},LI=()=>{document.body.classList.add("is-whelling")};fe.setDefault({usePassive:!1});var DI=({velocity:e,rootElement:t})=>{let r=H.createLerp({data:{scrollValue:window.scrollY},precision:1,velocity:.1});Ua=t;let o=r.subscribe(({scrollValue:d})=>{Gt||window.scrollTo({top:Math.round(d),left:0,behavior:"instant"})});r.onComplete(()=>{Ut=window.scrollY});let n=u.useMouseWheel(d=>{if(Gt)return;d.preventDefault(),zs=!1,LI();let f=d.spinY??0,h=fe.clamp(f*e+Ut,0,Ou-Au);Ut=h,r.goTo({scrollValue:h}).catch(()=>{})}),s=u.useMouseWheel(({preventDefault:d})=>{$u&&d()}),i=u.useMouseWheel(u.debounce(()=>{yv()},500)),a=u.useScrollEnd(()=>{let d=window.scrollY;Ut=d,r.setImmediate({scrollValue:d})}),c=u.useScroll(()=>{if(!zs)return;let d=window.scrollY;Ut=d,r.setImmediate({scrollValue:d})}),l=u.usePointerDown(()=>{Gt||(yv(),r.stop(),Ut=window.scrollY,zs=!0)}),p=new ResizeObserver(()=>{r.stop(),r.setImmediate({scrollValue:window.scrollY}),Ut=window.scrollY,Au=window.innerHeight,Ou=document.body.offsetHeight});return p.observe(t),{destroy:()=>{ho=!1,Ut=0,zs=!0,Gt=!1,Ua&&(p.unobserve(Ua),p.disconnect()),r?.stop(),r?.destroy(),r=null,Ua=null,o(),c(),a(),n(),l(),i(),s(),Lu=()=>{},Du=()=>{},Ga=()=>{}},stop:()=>{r.stop(),Ut=window.scrollY},update:()=>{r.setImmediate({scrollValue:window.scrollY})}}},qa=({velocity:e=100,rootElement:t=document.createElement("div")}={})=>{ho||(Ut=window.scrollY,ho=!0,Gt=!1,Au=window.innerHeight,Ou=document.body.offsetHeight,$u=!0,zs=!1,{destroy:Lu,stop:Du,update:Ga}=DI({velocity:e,rootElement:t}))},pr=()=>{!ho||Gt||(Du(),Gt=!0)},qt=()=>{!ho||!Gt||(Gt=!1)},Hs=()=>{!ho||!Gt||(Ga(),Ut=window.scrollY,Gt=!1)},Fu=()=>{ho&&Ga()},Bu=()=>{Lu()},vv=()=>{$u=!0};var Tv=()=>ho;var Sv="easeOutQuad",Us=new Ar({ease:Sv,data:{val:0}}),Ja=!1,Vu=!1;Us.subscribe(({val:e})=>{window.scrollTo({top:e,left:0,behavior:"auto"}),Fu()});var Wu=()=>{Vu&&(document.body.style.overflow=""),Us?.updateEase?.(Sv),Hs()},ju=()=>{Ja&&(Us.stop(),Wu())};u.useMouseWheel(()=>{ju()});u.useMouseDown(()=>{ju()});u.useTouchStart(()=>{ju()});var Or={to:(t,r)=>{if(typeof globalThis>"u")return;let o=t?qc(t)||u.checkType(Number,t)?qc(t)?le(t).top:t:(console.warn(`bodyScroll ${t} is not valid target, must be a node or a number`),0):0,n=cr(r?.duration,"bodyScroll: duration",500);return Vu=pe(r?.overflow,"bodyScroll: overflow",!1),Na(r?.ease)&&Us?.updateEase?.(r?.ease),Vu&&(document.body.style.overflow="hidden"),new Promise(s=>{Ja=!0,pr(),Us.goFromTo({val:window.scrollY},{val:o},{duration:n}).then(()=>{Wu(),Ja=!1,s(!0)}).catch(()=>{Wu(),Ja=!1,s(!0)})})}};var Gs={END:"END",START:"START",CENTER:"CENTER"};var FI=e=>{switch(e){case Gs.END:return"align-items:flex-end;";case Gs.CENTER:return"align-items:center;";default:return"align-items:flex-start;"}},_v=({mainContainer:e,queryType:t,breakpoint:r,container:o,trigger:n,row:s,column:i,shadow:a,useSticky:c,columnHeight:l,columnWidth:p,columnAlign:d})=>{let f=ge.getBreackpoint(r),h="user-select:none",v=c?"relative":"absolute",b=c?"position:sticky;top:0;":"",T=FI(d),_=p?`width:${p}vw;`:"",S=`
      @media (${t}-width:${f}px){${o}{position:relative;${h}}}@media (${t}-width:${f}px){${n}{z-index:10;position:${v};pointer-events:none;overflow:hidden;top:0;left:0;right:0}}@media (${t}-width:${f}px){${s}{--sectionheight:${l}vh}}@media (${t}-width:${f}px){${s}{display:flex;height:100vh;${b}${T}}}@media (${t}-width:${f}px){${i}{height:var(--sectionheight);flex:0 0 auto;${_}}}.${a}{display:none}@media (${t}-width:${f}px){.${a}{width:100%;display:block;pointer-events:none}}.${a}{display:none}@media (${t}-width:${f}px){.${a}{pointer-events:none;display:block;position:absolute;left:0;right:0}.${a}--end,.${a}--in-center,.${a}--left,.${a}--out-center{opacity:0;border:1px red dashed;width:25%}.${a}--end.debug,.${a}--in-center.debug,.${a}--left.debug,.${a}--out-center.debug{opacity:1}.${a}--in-center{position:absolute;top:0;right:0;padding:0 40px;text-align:center}.${a}--out-center{position:absolute;top:0;right:0;padding:0 40px;text-align:center}.${a}--left{position:absolute;top:0;left:50%;transform:translateX(-50%);padding:0 40px;text-align:center}.${a}--end{position:absolute;top:0;left:0;padding-left:40px}}`,C=document.createElement("div");C.classList.add("scroller-style");let E=document.createElement("style");E.append(document.createTextNode(S)),C.append(E),e.prepend(C)};var qs=class{#n=!0;#t=0;#i=!1;#l=0;#d=100;#u=100;#s=!1;#c=0;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#_;#v;#y;#T;#R;#S;#w;#A;#k;#O;#E;#N;#P;#b;#D;#B;#I;#F;#L;#C;#Y;#H;#M;#W;#$;#U;#G;#re;#K;#se;#ee;#Q;#oe;#ie;#ue;#ce;#fe;#pe;constructor(t){this.#r=()=>{},this.#pe=0,this.#F=t?.container??"",this.#W=[],this.#$=!1,this.#U=0,this.#G={},this.#re=0,this.#K=t?.children||[],this.#e=pe(t?.useDrag,"HorizontalScroller: useDrag",!1),this.#p=cr(t?.threshold,"HorizontalScroller: threshold",30),this.#a=pe(t?.useWillChange,"HorizontalScroller: useWillChange",!1),this.#h=Vo(t?.breakpoint,"breakpoint","horizontalScroller"),this.#f=Wo(t?.queryType,"queryType","horizontalScroller"),this.#o=pe(t?.forceTranspond,"HorizontalScroller: forceTranspond",!1),this.#g=pe(t?.addCss,"HorizontalScroller: addCss",!0),this.#m=pe(t?.animateAtStart,"HorizontalScroller: animateAtStart",!1),this.#x=pe(t?.ease,"HorizontalScroller: ease",!1),this.#_=$a(t?.easeType??"","HorizontalScroller"),this.#v=pe(t?.useSticky,"HorizontalScroller: useSticky",!1),this.#y=pe(t?.animatePin,"HorizontalScroller: animatePin",!1),this.#T=pe(t?.reverse,"HorizontalScroller: reverse",!1),this.#R=pe(t?.useThrottle,"HorizontalScroller: useThrottle",!1),this.#S=cr(t?.columnHeight,"HorizontalScroller: columnHeight",100),this.#w=cr(t?.columnWidth,"HorizontalScroller: columnWidth",null),this.#A=t?.columnAlign?t.columnAlign.toUpperCase():Gs.START,this.#k=dt(t?.onEnter,"HorizontalScroller: onEnter",ee),this.#O=dt(t?.onEnterBack,"HorizontalScroller: onEnterBack",ee),this.#E=dt(t?.onLeave,"HorizontalScroller: onLeave",ee),this.#N=dt(t?.onLeaveBack,"HorizontalScroller: onLeaveBack",ee),this.#P=dt(t?.afterInit,"HorizontalScroller: afterInit",ee),this.#b=dt(t?.afterRefresh,"HorizontalScroller: afterRefresh",ee),this.#D=dt(t?.afterDestroy,"HorizontalScroller: afterDestroy",ee),this.#B=dt(t?.onTick,"HorizontalScroller: onTick",void 0),this.#I=u.checkType(String,t.root)?document.querySelector(t.root):t.root,this.#I||(this.#n=!1,console.warn("horizontal custom: root node not found")),this.#I.querySelector(this.#F)||(this.#n=!1,console.warn("horizontal custom: container node not found")),this.#L=this.#I.querySelector(t.trigger),this.#L||(this.#n=!1,console.warn("horizontal custom: trigger node not found")),this.#C=this.#I.querySelector(t.row),this.#C||(this.#n=!1,console.warn("horizontal custom: row node not found")),this.#Y=this.#I.querySelectorAll(t.column),this.#Y.length===0&&(this.#n=!1,console.warn("horizontal custom: column nodeList not found")),this.#H=this.#I.querySelectorAll("[data-shadow]");let o=t?.shadowClass||"shadow";this.#M=o.replace(".",""),this.#W=this.#C.querySelectorAll("a, button"),this.#K.forEach(n=>{this.#C&&n.setScroller(this.#C),n.setDirection("horizontal"),n.setBreakPoint(this.#h),n.setQueryType(this.#f),n.init()}),this.#g&&_v({mainContainer:this.#I,queryType:this.#f,breakpoint:this.#h,container:this.#F,trigger:t?.trigger??"trigger",row:t.row,column:t.column,shadow:this.#M,useSticky:this.#v,columnHeight:this.#S,columnWidth:this.#w,columnAlign:this.#A}),this.#se=n=>{if(!this.#i)return;let{movementX:s}=n,i=this.#T?s:-s;this.#X(i)},this.#ee=()=>{ge[this.#f](this.#h)&&(pr(),this.#s&&this.#C&&(this.#C.style.cursor="move"),this.#i=!0,this.#pe=this.#c)},this.#Q=()=>{qt(),this.#i=!1,u.useFrame(()=>{this.#C&&(this.#C.style.cursor="")})},this.#oe=()=>{qt(),this.#i=!1,u.useFrame(()=>{this.#C&&(this.#C.style.cursor="")})},this.#ie=n=>{ge[this.#f](this.#h)&&(pr(),this.#l=-n.touches[0].clientX,this.#i=!0,this.#pe=this.#c)},this.#ue=()=>{qt(),this.#i=!1},this.#ce=n=>{let s=-n.touches[0].clientX,i=this.#T?-s+this.#l:s-this.#l;this.#X(i),this.#l=s,this.#s&&n.cancelable&&n.defaultPrevented&&n.preventDefault()},this.#fe=n=>{Math.abs(this.#c-this.#pe)>this.#p&&n.preventDefault()}}init(){this.#n&&ja(this.#te.bind(this),this.#Z.bind(this),this.#V.bind(this),this.#me.bind(this))().then(()=>{this.#z(),this.#e&&this.#J(),u.useResize(({horizontalResize:t})=>this.onResize(t)),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#P?.(),this.#K.forEach(t=>{t.refresh()})})},3)})}#be(){[...this.#W].forEach(t=>t.setAttribute("draggable","false"))}#ge(){[...this.#W].forEach(t=>t.removeAttribute("draggable"))}#X(t){this.#s&&u.useFrame(()=>window.scrollBy({top:t,left:0,behavior:"instant"}))}#q(){let t=window.scrollY;this.#s=this.#t-this.#u<t&&this.#t+this.#d+this.#U>t+window.innerHeight}#J(){this.#r=u.useScroll(()=>this.#q()),this.#q(),this.#C.addEventListener("click",this.#fe,{passive:!1}),this.#C.addEventListener("mousedown",this.#ee,{passive:!0}),this.#C.addEventListener("mouseup",this.#Q,{passive:!0}),this.#C.addEventListener("mouseleave",this.#oe,{passive:!0}),this.#C.addEventListener("touchstart",this.#ie,{passive:!0}),this.#C.addEventListener("touchend",this.#ue,{passive:!0}),this.#C.addEventListener("mousemove",this.#se,{passive:!0}),this.#C.addEventListener("touchmove",this.#ce,{passive:!0})}#j(){this.#r(),this.#C.removeEventListener("click",this.#fe),this.#C.removeEventListener("mousedown",this.#ee),this.#C.removeEventListener("mouseup",this.#Q),this.#C.removeEventListener("mouseleave",this.#oe),this.#C.removeEventListener("touchstart",this.#ie),this.#C.removeEventListener("touchend",this.#ue),this.#C.removeEventListener("mousemove",this.#se),this.#C.removeEventListener("touchmove",this.#ce)}#Z(){return!this.#L||!this.#I||!this.#C?new Promise(t=>{t(!0)}):new Promise(t=>{u.useFrame(()=>{let r=this.#U;this.#re=100*(r-window.innerWidth)/r,r>0&&(this.#L.style.height=`${r}px`,this.#I.style.height=`${r}px`,this.#C.style.width=`${r}px`),t(!0)})})}#te(){return new Promise(t=>{u.useFrame(()=>{if(!ge[this.#f](this.#h)){t(!0);return}this.#U=[...this.#Y].map(r=>De(r)).reduce((r,o)=>r+o,0),t(!0)})})}#V(){return this.#L?new Promise(t=>{u.useFrame(()=>{if(!ge[this.#f](this.#h)||!this.#H){t(!0);return}let r=[...this.#H].map(o=>{let n=o.dataset.shadow,s=Object.hasOwn(o.dataset,"debug"),i=s?"debug":"",a=s?`left left : ${n}`:"",c=s?`in center : ${n}`:"",l=s?`center out : ${n}`:"",p=s?`in out : ${n}`:"";return` <div
                            class="${this.#M} ${this.#M}--${n}"
                            data-shadow="${n}"
                        >
                            <span
                                class="${this.#M}--in-center ${i}"
                            >
                                ${c}
                            </span>
                            <span
                                class="${this.#M}--out-center ${i}"
                            >
                                ${l}
                            </span>
                            <span
                                class="${this.#M}--left ${i}"
                            >
                                ${a}
                            </span>
                            <span
                                class="${this.#M}--end ${i}"
                            >
                                ${p}
                            </span>
                        </div>`}).join("");this.#L.innerHTML=r,t(!0)})}):new Promise(t=>{t(!0)})}#ne(){this.#L&&(this.#L.innerHTML="")}#me(){return new Promise(t=>{if(!ge[this.#f](this.#h)){t(!0);return}u.useFrame(()=>{this.#H&&([...this.#H].forEach(r=>{let o=this.#re/100,n=r.dataset.shadow,s=De(r),i=ie(this.#C),a=xo(this.#C)?.x??0,c=this.#T?this.#U-(r.getBoundingClientRect().right-a):r.getBoundingClientRect().left-a,l=window.innerWidth/window.innerHeight,p=window.innerWidth-window.innerHeight,d=c/l,f=c-c/l,h=this.#I.querySelector(`.${this.#M}[data-shadow="${n}"]`),v=h?.querySelector(`.${this.#M}--in-center`),b=h?.querySelector(`.${this.#M}--out-center`),T=h?.querySelector(`.${this.#M}--left`),_=h?.querySelector(`.${this.#M}--end`),S=window.innerWidth>window.innerHeight?window.innerHeight:0,C=window.innerWidth>window.innerHeight?window.innerHeight/2:0,E=c===0?0:d+f/o-p/o,w=(()=>{let R=window.innerWidth>window.innerHeight?p/o:p/o+window.innerWidth/l;return c===0?0:R})(),M=(()=>{let R=s/l,L=(s-s/l)/o;return R+L+w})(),A=M/2+C;this.#v&&(this.#L.style["margin-top"]=`-${i}px`),h&&(h.style.top=`${E}px`),v&&(v.style.height=`${A}px`),b&&(b.style.height=`${A}px`),b&&(b.style.top=`${A}px`),T&&(T.style.height=`${w}px`),_&&(_.style.height=`${M+S}px`),h&&(h.style.height=`${w}px`)}),t(!0))})})}#z(){if(!this.#L||!ge[this.#f](this.#h))return;let t=new mo({type:"scrolltrigger",item:this.#C,useWillChange:this.#a,trigger:this.#L,propierties:"x",breakpoint:"xSmall",pin:!this.#v,animatePin:this.#y,ease:this.#x,forceTranspond:this.#o,useThrottle:this.#R,easeType:this.#_,springConfig:"scroller",animateAtStart:this.#m,reverse:this.#T,dynamicRange:()=>-(this.#U-window.innerWidth),dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>this.#U},onTick:({value:r,parentIsMoving:o})=>{let n=r??0,s=Math.abs(-Math.round(n*100/(this.#U-window.innerWidth)));this.#c=n,this.#B&&this.#B({value:n,parentIsMoving:o,percent:this.#T?100-s:s}),this.#K.forEach(i=>{i.move({value:n,parentIsMoving:o})})},onEnter:this.#k,onEnterBack:this.#O,onLeave:this.#E,onLeaveBack:this.#N});t.init(),this.#$=!0,this.#G=t,this.#t=le(this.#L).top,this.#be()}#ve(){ja(this.#te.bind(this),this.#Z.bind(this),this.#V.bind(this),this.#me.bind(this))().then(()=>{this.#z(),this.#de()})}#de(){u.useFrameIndex(()=>{u.useNextTick(()=>{this.#b?.(),this.#K.forEach(t=>{t?.refresh?.()})})},3)}refresh(){return!this.#$||!ge[this.#f](this.#h)?new Promise(t=>t(!0)):new Promise(t=>{ja(this.#te.bind(this),this.#Z.bind(this),this.#me.bind(this))().then(()=>{this.#G?.stopMotion?.(),this.#t=le(this.#L).top,this.#$&&(this.#G?.refresh?.(),this.#de()),t(!0)})})}#he({destroyAll:t=!1}){(this.#$||t)&&(this.#G?.destroy?.(),this.#G=null,this.#L&&(this.#L.style.height=""),this.#I&&(this.#I.style.height=""),this.#L&&(this.#L.style.marginTop=""),this.#ne(),this.#ge(),this.#$=!1,u.useFrameIndex(()=>{if(this.#C&&(this.#C.style.width="",this.#C.style.transform=""),t&&this.#I){this.#e&&this.#j();let r=this.#I.querySelector(".scroller-style");r&&r.remove(),this.#I=null,this.#L=null,this.#C=null,this.#Y=[],this.#H=[],this.#P=ee,this.#b=ee,this.#B=ee,this.#k=ee,this.#O=ee,this.#E=ee,this.#N=ee,this.#G=null,this.#$=!1,this.#W=[],this.#I=null,this.#F=null,this.#L=null,this.#C=null,u.useNextTick(()=>{this.#D?.(),this.#D=ee,this.#K.forEach(o=>{o?.destroy?.(),o=null}),this.#K=[]})}},3))}onResize(t){this.#$&&ge[this.#f](this.#h)?t&&this.refresh():!this.#$&&ge[this.#f](this.#h)?this.#ve():this.#$&&!ge[this.#f](this.#h)&&this.#he({destroyAll:!1})}destroy(){this.#he({destroyAll:!0})}};var Js=new Map,Ya=e=>{let t=u.checkType(Element,e);return t||console.warn(`slide utils ${e} is not a valid Dom element`),t},BI=e=>{let t=new Ar({ease:"easeOutQuad",data:{val:0}});return{tween:t,unsubscribe:t.subscribe(({val:r})=>{e.style.height=`${r}px`})}},$r={subscribe:n=>{if(!Ya(n))return()=>{};if(Js.has(n))return console.warn(`slide utils ${n} is alredysubscribed`),()=>{};let i=BI(n);return Js.set(n,i),()=>{i.unsubscribe();let{tween:a}=i;a.destroy(),Js.delete(n)}},reset:n=>{Ya(n)&&(n.style.height="0",n.style.overflow="hidden")},up:async n=>{if(!Ya(n))return new Promise(c=>c(!0));let s=Js.get(n);if(!s)return console.warn("slide element not exist in slide store"),new Promise(c=>c(!0));let{tween:i}=s,a=ie(n);await i.goFromTo({val:a},{val:0},{duration:500})},down:async n=>{if(!Ya(n))return new Promise(l=>l(!0));let s=Js.get(n);if(!s)return console.warn("slide element not exist in slide store"),new Promise(l=>l(!0));let{tween:i}=s,{val:a}=i.get();n.style.height="auto";let c=ie(n);n.style.height=`${a}px`,await i.goTo({val:c},{duration:500}),u.useNextTick(()=>{n.style.height="auto"})}};var xt=class{#n=!0;#t=0;#i=0;#l=0;#d=0;#u=0;#s=30;#c=0;#r=!1;#e=0;#p=0;#a;#h;#f;#o;#g;#m;#x;#_;#v;#y;#T;#R;#S;#w;#A;#k;#O;#E;#N;#P;#b;#D;#B;#I;#F;#L;#C;#Y;#H;#M;#W=!1;#$;#U;#G;#re=0;#K=0;#se;#ee;#Q;constructor(t){this.#a=ee,this.#h=ee,this.#f=ee,this.#o=ee,this.#g=ee,this.#m=ee,this.#x=ee,this.#_=ee,this.#v=ee,this.#y=ee,this.#T=ee,this.#R=ee,this.#S={},this.#w=ee,this.#A=ee,this.#k=$s(t?.direction,"SmoothScroller"),this.#O=!1,this.#E=$a(t?.easeType??"","SmoothScroller"),this.#N=Vo(t?.breakpoint,"breakpoint","SmoothScroller"),this.#P=Wo(t?.queryType,"queryType","SmoothScroller"),this.#b=u.checkType(String,t?.scroller)?document.querySelector(t.scroller):t.scroller,this.#b||(console.warn("SmoothScroller: scroller node not found"),this.#n=!1),this.#D=t?.screen?u.checkType(String,t.screen)?document.querySelector(t.screen):t.screen:document.documentElement,this.#D||(this.#n=!1,console.warn("SmoothScroller: screen node not found")),this.#B=pe(t?.scopedEvent,"SmoothScroller: scopedEvent",!1),this.#I=cr(t?.speed,"SmoothScroller: speed",60),this.#F=pe(t?.drag,"SmoothScroller: drag",!1),this.#L=dt(t?.onTick,"SmoothScroller: onTick",ee),this.#C=dt(t?.onUpdate,"SmoothScroller: onUpdate",ee),this.#Y=dt(t?.onSwipe,"SmoothScroller: onSwipe",ee),this.#ee=pe(t?.useSwipe,"SmoothScroller: useSwipe",!1),this.#Q=pe(t?.revertSwipeDirection,"SmoothScroller: revertSwipeDirection",!1),this.#se=pe(t?.useHorizontalScroll,"SmoothScroller: useBothAxis",!1),this.#H=dt(t?.afterRefresh,"SmoothScroller: afterRefresh",ee),this.#M=dt(t?.afterInit,"SmoothScroller: afterInit",ee),this.#$=t?.children||[],this.#$.forEach(r=>{r.setScroller(this.#b),r.setDirection(this.#k),r.setScreen(this.#D),r.setBreakPoint(this.#N),r.setQueryType(this.#P),r.init()}),this.#U=r=>{this.#ie();let{spinY:o}=u.normalizeWheel(r);this.#J({spinY:o})},this.#G=r=>{let{clientX:o,clientY:n}=r.touches?r.touches[0]:r;this.#X({client:{x:o,y:n}})},this.#R=u.useMouseWheel(u.debounce(()=>{this.#oe()},500))}#oe(){this.#b&&this.#b.classList.remove("is-whelling")}#ie(){this.#b&&this.#b.classList.add("is-whelling")}#ue(){return this.#c>0}init(){this.#n&&(this.#E===y.EASE_SPRING?this.#S=new Ht:(this.#S=new Pr,this.#S.updateVelocity(.1)),this.#B&&(this.#b.addEventListener("wheel",this.#U,{passive:!0}),this.#b.addEventListener("mousemove",this.#G,{passive:!0}),this.#b.addEventListener("touchmove",this.#G,{passive:!0})),this.#B||(this.#_=u.useMouseWheel(t=>{this.#ce(t),this.#V(t)}),this.#v=u.useMouseMove(t=>this.#te(t)),this.#y=u.useTouchMove(t=>this.#te(t))),this.#a=u.useResize(()=>this.refresh()),this.#h=u.useScrollStart(()=>this.#ge()),this.#f=u.useScrollEnd(()=>this.#ge()),this.#o=u.useTouchStart(t=>this.#j(t)),this.#g=u.useTouchEnd(t=>this.#Z(t)),this.#m=u.useMouseDown(t=>this.#j(t)),this.#x=u.useMouseUp(t=>this.#Z(t)),this.#b.addEventListener("mouseleave",()=>{qt()}),this.#F&&(this.#T=u.useMouseClick(({target:t,preventDefault:r})=>{this.#me({target:t,preventDefault:r})})),this.#be(),ge[this.#P](this.#N)&&(this.#fe(),this.#ge()),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#O||(this.#M?.({shouldScroll:this.#ue()}),this.#$.forEach(t=>{t.refresh()}))})},3))}#ce({pixelX:t}){if(!(!this.#ee||!t||this.#W||this.#Y.length===0)&&Math.abs(t)>40){this.#W=!0;let r=t>0?-1:1,o=this.#Q?r:r*-1;this.#Y({direction:o,move:n=>this.move(n).catch(()=>{})}),setTimeout(()=>{this.#W=!1},500)}}#fe(){if(!this.#b)return;this.#b.style["user-select"]="none",[...this.#b.querySelectorAll("a, button")].forEach(r=>{r.setAttribute("draggable","false"),r.style["user-select"]="none"})}#pe(){if(!this.#b)return;this.#b.style["user-select"]="",[...this.#b.querySelectorAll("a, button")].forEach(r=>{r.removeAttribute("draggable"),r.style["user-select"]=""})}#be(){this.#S&&(this.#S.setData({val:0}),this.#w=this.#S.subscribe(({val:t})=>{this.#b.style.transform=this.#k==y.DIRECTION_VERTICAL?`translate3d(0px, 0px, 0px) translateY(${-Math.trunc(t)}px)`:`translate3d(0px, 0px, 0px) translateX(${-Math.trunc(t)}px)`,this.#$.forEach(r=>{r.triggerScrollStart()}),u.useNextTick(()=>{this.#L({value:-t,percent:this.#i,parentIsMoving:!0}),this.#$.forEach(r=>{r.move({value:-t,parentIsMoving:!0})})})}),this.#A=this.#S.onComplete(({val:t})=>{this.#b.style.transform=this.#k==y.DIRECTION_VERTICAL?`translateY(${-Math.trunc(t)}px)`:`translateX(${-Math.trunc(t)}px)`,u.useNextTick(()=>{this.#L({value:-t,percent:this.#i,parentIsMoving:!1}),this.#$.forEach(r=>{r.triggerScrollEnd(),r.move({value:-t,parentIsMoving:!1})})})}))}#ge(){this.#D&&(this.#l=this.#D===document.documentElement?window.innerWidth:De(this.#D),this.#d=this.#D===document.documentElement?window.innerHeight:ie(this.#D),this.#c=this.#k===y.DIRECTION_VERTICAL?this.#b.offsetHeight-this.#d:this.#b.offsetWidth-this.#l,this.#ne())}#X({client:t}){!this.#r||!this.#F||(this.#e=this.#p,this.#p=this.#z({x:t?.x??0,y:t?.y??0}),this.#t+=Math.round(this.#e-this.#p),this.#ne())}#q(){return this.#k===y.DIRECTION_HORIZONTAL?this.#l/1920:this.#d/1080}#J({spinY:t=0}){if(!ge[this.#P](this.#N))return;this.#r=!1;let r=this.#q(),o=tt(t,-1,1);this.#t+=o*this.#I*r,this.#ne()}#j({target:t,client:r}){ge[this.#P](this.#N)&&(t===this.#b||_o(this.#b,t))&&(this.#u=this.#t,this.#r=!0,this.#e=this.#z({x:r?.x??0,y:r?.y??0}),this.#p=this.#z({x:r?.x??0,y:r?.y??0}))}#Z(){this.#r=!1}#te({target:t,client:r,preventDefault:o}){if((t===this.#b||_o(this.#b,t))&&this.#r&&this.#F){o(),this.#e=this.#p,this.#p=this.#z({x:r?.x??0,y:r?.y??0});let n=Math.round(this.#e-this.#p);this.#t+=n,this.#ne()}}#V({target:t,spinY:r=0,spinX:o=0,preventDefault:n}){if(ge[this.#P](this.#N)&&(this.#ie(),t===this.#b||_o(this.#b,t))){this.#r=!1,n?.(),pr();let s=Math.abs(this.#re-o),i=Math.abs(this.#K-r),a=this.#se&&!this.#ee&&s>i?o:r;if(Math.abs(a)===0)return;let c=this.#q();this.#t+=tt(a,-1,1)*this.#I*tt(c,1,10),this.#ne(),this.#K=r,this.#re=o}}move(t){return ge[this.#P](this.#N)?(this.#i=t,this.#t=this.#i*this.#c/100,this.#S.goTo({val:this.#t})):new Promise(r=>r())}set(t){ge[this.#P](this.#N)&&(this.#i=t,this.#t=this.#i*this.#c/100,this.#S.set({val:this.#t}))}#ne(){let t=this.#t*100/this.#c;this.#i=tt(t,0,100),this.#t=tt(this.#t,0,this.#c),this.#S.goTo({val:this.#t}).catch(()=>{}),this.#C?.({value:-this.#t,percent:this.#i,parentIsMoving:!0})}#me({target:t,preventDefault:r}){ge[this.#P](this.#N)&&(t===this.#b||_o(this.#b,t))&&Math.abs(this.#t-this.#u)>this.#s&&r()}#z({x:t,y:r}){return!t||!r?0:this.#k===y.DIRECTION_VERTICAL?r:t}refresh(){if(!ge[this.#P](this.#N)){this.#pe(),this.#S?.stop?.(),u.useFrame(()=>{u.useNextTick(()=>{this.#b.style.transform=""})});return}this.#ge(),this.#fe(),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#H?.({shouldScroll:this.#ue()}),this.#$.forEach(t=>{t.refresh()})})},2)}destroy(){this.#O=!0,this.#pe(),this.#a(),this.#h(),this.#f(),this.#o(),this.#g(),this.#m(),this.#x(),this.#_(),this.#v(),this.#y(),this.#T(),this.#w(),this.#A(),this.#R(),this.#S?.destroy(),this.#S=null,this.#$.forEach(t=>{t?.destroy?.()}),this.#$=[],this.#L=ee,this.#C=ee,this.#H=ee,this.#M=ee,this.#B&&(this.#b?.removeEventListener("wheel",this.#U),this.#b?.removeEventListener("mousemove",this.#G),this.#b?.removeEventListener("touchmove",this.#G)),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#b=null,this.#D=null})},3)}};var xv=!1,VI=new Set(["scrollerN0","scrollerN1"]),Cv=()=>{let e=document.querySelector("#root");e&&(qa({rootElement:e}),m.mainStore.watch("beforeRouteChange",()=>{pr(),vv()}),m.mainStore.watch("afterRouteChange",()=>{let t=m.getActiveRoute()?.route;xv=VI.has(t),u.useFrameIndex(()=>{if(xv){Bu();return}!Tv()&&qa({rootElement:e}),Hs()},30)}))};function rt(){let e=navigator.userAgent,t=e.includes("Safari");return e.includes("Chrome")&&t&&(t=!1),t}function ot(){let e=navigator.userAgent,t=e.includes("Firefox");return e.includes("Chrome")&&t&&(t=!1),t}function Ev(){let e=navigator.userAgent,t=document.body;if(/chrome|chromium|crios/i.test(e)){t.classList.add("is-chrome");return}if(/firefox|fxios/i.test(e)){t.classList.add("is-firefox");return}if(/safari/i.test(e)){t.classList.add("is-safari");return}if(/edg/i.test(e)){t.classList.add("is-edge");return}}var qe=async({source:e})=>{let t=await fetch(e);if(!t.ok)return console.warn(`${e} not found`),{success:!1,data:""};let r={};try{r=await t.text()}catch(o){return console.warn(o),{success:!1,data:r}}return{success:!0,data:r}},$t=async({source:e})=>{let t=await fetch(e);if(!t.ok)return console.warn(`${e} not found`),{success:!1,data:""};let r={};try{r=await t.json()}catch(o){return console.warn(o),{success:!1,data:r}}return{success:!0,data:r}};function Jt(e,t){return Math.floor(Math.random()*(t-e+1)+e)}var wv=e=>new XMLSerializer().serializeToString(e).replaceAll(' xmlns="http://www.w3.org/1999/xhtml"',"");var Iv,Mv={},WI="./asset/svg/icons/",jI=[{name:"gitHubIcon",source:"icon-github.svg"},{name:"searchIcons",source:"search.svg"},{name:"historyIcons",source:"history.svg"},{name:"starOutline",source:"star-outline.svg"},{name:"previous",source:"previous.svg"},{name:"close",source:"close.svg"},{name:"up",source:"up.svg"},{name:"swap",source:"swap.svg"},{name:"selectAll",source:"select-all.svg"}],mr=()=>Iv,bt=()=>Mv,Rv=async()=>{let{success:e,data:t}=await $t({source:"./data/common.json"});e||console.warn("data fail to load"),Iv=t},kv=async()=>{let e=jI.map(({name:r,source:o})=>qe({source:`${WI}${o}`}).then(n=>({name:r,result:n})));Mv=(await Promise.all(e)).map(({name:r,result:o})=>o.success?{name:r,data:o.data}:{name:r,data:"icon load error"}).reduce((r,{name:o,data:n})=>({...r,[o]:n}),{})};var Nv=()=>g`
        <div class="error-page">
            <div class="error-page__content">
                <h1 class="error-page__title title-big">Page not found</h1>
                <a class="error-page__link" href="./#home">back to home</a>
            </div>
        </div>
    `;var Pv=({screenElement:e,scrollerElement:t,hideControls:r})=>{let o=new xt({screen:e,scroller:t,direction:"horizontal",drag:!0,useHorizontalScroll:!0,easeType:"lerp",breakpoint:"small",afterInit:({shouldScroll:n})=>{r(n)},afterRefresh:({shouldScroll:n})=>{r(n)}});return o.init(),{destroy:()=>{o.destroy()},refresh:()=>{o.refresh()}}};var zI=e=>e<10?`0${e}`:`${e}`,Av=({setRef:e,getRef:t,onMount:r,bindEffect:o,getProxi:n})=>{let s=n(),i=()=>{},a=()=>{};return r(()=>{let{screenElement:c,scrollerElement:l}=t();return{destroy:i,refresh:a}=Pv({screenElement:c,scrollerElement:l,hideControls:p=>{s.showControls=p}}),u.useNextLoop(()=>{a()}),setTimeout(()=>{s.isMounted=!0},500),()=>{i(),i=()=>{},a=()=>{}}}),g`<div class="l-links">
        <div class="l-links__under-container">
            <div
                class="l-links__under is-white"
                ${o({toggleClass:{"is-visible":()=>s.isMounted}})}
            >
                ${s.title}
            </div>
        </div>
        <div class="l-links__grid">
            <div class="l-links__row l-links__row" ${e("screenElement")}>
                <div
                    class="l-links__row__white"
                    ${o({toggleClass:{active:()=>s.isMounted}})}
                >
                    <h6 class="l-links__over is-black">${s.title}</h6>
                </div>
                <div
                    class="l-links__title"
                    ${o({toggleClass:{"is-visible":()=>s.isMounted}})}
                >
                    <h1 class="title-big">${s.title}</h1>
                </div>
                <div
                    class="l-links__scroller"
                    ${e("scrollerElement")}
                    ${o({toggleClass:{"use-drag-cursor":()=>s.showControls}})}
                >
                    <ul class="l-links__list">
                        ${s.items.map((c,l)=>`
                                    <li class="l-links__list__item">
                                        <a
                                            class="l-links__list__link index-${l} ${l%2?"is-odd":"is-even"}"
                                            href="${c.url}"
                                            ${o({toggleClass:{active:()=>s.isMounted}})}
                                        >
                                            <span
                                                class="l-links__list__counter index-${l}"
                                                >${zI(l)}</span
                                            >
                                            <span class="index-${l}"
                                                >${c.title}</span
                                            >
                                        </a>
                                    </li>
                                `).join("")}
                    </ul>
                </div>
            </div>
            <h6
                class="l-links__scroll"
                ${o({toggleClass:{active:()=>s.showControls}})}
            >
                Scroll or drag
            </h6>
        </div>
    </div>`};var Ov=m.createComponent({tag:"layout-links",component:Av,props:{title:()=>({value:"",type:String}),items:()=>({value:[],type:Array})},state:{isMounted:()=>({value:!1,type:Boolean}),showControls:()=>({value:!1,type:Boolean})}});m.useComponent([Ov]);var Xa=async({props:e})=>{let{source:t}=e,{data:r}=await $t({source:t});return g` <div class="l-links">
        <layout-links
            ${m.staticProps({title:r.title,items:r.items})}
        ></layout-links>
    </div>`};var $v=()=>g`
        <div class="c-doc-container">
            <div class="c-doc-container__left-sidebar"></div>
            <div class="c-doc-container__content">
                <mobjs-slot name="docs"></mobjs-slot>
            </div>
            <div class="c-doc-container__right-sidebar">
                <mobjs-slot name="section-title-small"></mobjs-slot>
                <mobjs-slot name="section-title"></mobjs-slot>
                <mobjs-slot name="section-links"></mobjs-slot>
            </div>
        </div>
    `;var Ka=m.createComponent({tag:"doc-container",component:$v});var Lv=()=>g`
        <div class="c-doc-title">
            <h2><mobjs-slot></mobjs-slot></h2>
        </div>
    `;var Qa=m.createComponent({tag:"doc-title",component:Lv,state:{}});var Dv=()=>g`
        <div class="c-doc-title-small">
            <mobjs-slot></mobjs-slot>
        </div>
    `;var Za=m.createComponent({tag:"doc-title-small",component:Dv,state:{}});var nT=FC(oT(),1);var Ku=nT.default;var sT="[A-Za-z$_][0-9A-Za-z$_]*",AM=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],OM=["true","false","null","undefined","NaN","Infinity"],iT=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],aT=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],cT=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],$M=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],LM=[].concat(cT,iT,aT);function lT(e){let t=e.regex,r=(O,{after:F})=>{let B="</"+O[0].slice(1);return O.input.indexOf(B,F)!==-1},o=sT,n={begin:"<>",end:"</>"},s=/<[A-Za-z0-9\\._:-]+\s*\/>/,i={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(O,F)=>{let B=O[0].length+O.index,Q=O.input[B];if(Q==="<"||Q===","){F.ignoreMatch();return}Q===">"&&(r(O,{after:B})||F.ignoreMatch());let U,J=O.input.substring(B);if(U=J.match(/^\s*=/)){F.ignoreMatch();return}if((U=J.match(/^\s+extends\s+/))&&U.index===0){F.ignoreMatch();return}}},a={$pattern:sT,keyword:AM,literal:OM,built_in:LM,"variable.language":$M},c="[0-9](_?[0-9])*",l=`\\.(${c})`,p="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${p})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${p})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},f={className:"subst",begin:"\\$\\{",end:"\\}",keywords:a,contains:[]},h={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"xml"}},v={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"css"}},b={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"graphql"}},T={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,f]},S={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},C=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,h,v,b,T,{match:/\$\d+/},d];f.contains=C.concat({begin:/\{/,end:/\}/,keywords:a,contains:["self"].concat(C)});let E=[].concat(S,f.contains),w=E.concat([{begin:/(\s*)\(/,end:/\)/,keywords:a,contains:["self"].concat(E)}]),M={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:w},A={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},R={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...iT,...aT]}},L={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},D={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[M],illegal:/%/},$={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function V(O){return t.concat("(?!",O.join("|"),")")}let I={match:t.concat(/\b/,V([...cT,"super","import"].map(O=>`${O}\\s*\\(`)),o,t.lookahead(/\s*\(/)),className:"title.function",relevance:0},k={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},P={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},M]},x="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",N={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(x)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[M]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:a,exports:{PARAMS_CONTAINS:w,CLASS_REFERENCE:R},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),L,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,h,v,b,T,S,{match:/\$\d+/},d,R,{scope:"attr",match:o+t.lookahead(":"),relevance:0},N,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[S,e.REGEXP_MODE,{className:"function",begin:x,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:w}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:n.begin,end:n.end},{match:s},{begin:i.begin,"on:begin":i.isTrulyOpeningTag,end:i.end}],subLanguage:"xml",contains:[{begin:i.begin,end:i.end,skip:!0,contains:["self"]}]}]},D,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[M,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},k,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[M]},I,$,A,P,{match:/\$[(.]/}]}}Ku.registerLanguage("javascript",lT);var uT=async({ref:e,source:t})=>{if(!e)return;let{success:r,data:o}=await qe({source:t});if(!r){e.textContent="something went wrong";return}e.textContent=o,Ku.highlightElement(e),e.style.height=""},DM=()=>getComputedStyle(document.documentElement).getPropertyValue("--snippet-line-height-value"),pT=({onMount:e,setRef:t,getRef:r,delegateEvents:o,bindEffect:n,getProxi:s,bindObject:i})=>{let a=s(),c=DM(),l="20rem",p=Number(a.numLines)>15,d=p?"use-expand":"",f=`${a.numLines*Number(c)}rem`;return e(async()=>{let{codeEl:h}=r();return a.awaitLoad?await uT({ref:h,source:a.source}):uT({ref:h,source:a.source}),()=>{}}),g`<div
        class="snippet"
        style="--snippet-height:${f};--closed-height:${l}"
    >
        <code
            ${n({toggleClass:{close:()=>p&&!a.isExpanded,open:()=>p&&a.isExpanded}})}
        >
            <pre
                ${t("codeEl")}
                style="height:${p?l:f}"
            >
                 Loading snippet ...</pre
            >
        </code>
        <button
            class="snippet__expand ${d}"
            ${!p&&"disabled"}
            ${o({click:()=>{a.isExpanded=!a.isExpanded}})}
        >
            ${i`${()=>a.isExpanded?"close":"expand"}`}
        </button>
    </div>`};var mT=m.createComponent({tag:"mob-snippet",component:pT,props:{source:()=>({value:"",type:String}),numLines:()=>({value:1,type:Number}),awaitLoad:()=>({value:!1,type:Boolean})},state:{contentIsLoaded:()=>({value:!1,type:Boolean}),isExpanded:()=>({value:!1,type:Boolean})}});var Ks="debug_component",nc="debug_filter_list",sc="debug_overlay",ic="debug_tree",Qs="quick_nav",Zs="scroll_down_label",ei="scroll_to",dT="header",ac="mob_navigation",ti="mob_navigation_container",cc="search_overlay",ri="search_overlay_list",Ho="search_overlay_header",lc="right-sidebar",uc="animation-description",pc="route-loader",Yn="custom-history";var hT=({id:e,label:t,element:r,isSection:o,isNote:n})=>{m.useMethodByName(ei)?.addItem?.({id:e,label:t,element:r,isSection:o,isNote:n})},fT=e=>{m.useMethodByName(ei)?.setActiveLabel?.(e)};function FM({label:e}){return e?.length>0}var BM=async({id:e,label:t,element:r,isSection:o,isNote:n})=>{await m.tick(),hT({id:e,label:t,element:r,isSection:o,isNote:n}),xp(r)&&!o&&fT(t)},gT=({getState:e,onMount:t})=>{let{style:r,line:o,id:n,label:s,isSection:i,isNote:a}=e(),c=o?"spacer--line":"";return t(({element:l})=>{FM({label:s})&&BM({id:n,label:s,element:l,isSection:i,isNote:a})}),g`<div id="${n}" class="spacer spacer--${r} ${c}">
        <span></span>
    </div>`};var bT=m.createComponent({tag:"mob-spacer",component:gT,props:{style:()=>({value:"x-small",type:String,validate:e=>["x-small","small","medium","big"].includes(e),strict:!0}),line:()=>({value:!1,type:Boolean}),id:()=>({value:"",type:String}),label:()=>({value:"",type:String}),isSection:()=>({value:!1,type:Boolean}),isNote:()=>({value:!1,type:Boolean})}});var yT=({getState:e,delegateEvents:t})=>{let{content:r,anchor:o}=e();return g`<div>
        <button
            type="button"
            class="anchor-button"
            ${t({click:()=>{let n=document.querySelector(o);if(!n)return;let s=le(n).top-50;Or.to(s)}})}
        >
            ${r}
            <span class="anchor-button__arrow">
                <span class="anchor-button__arrow__start"></span>
                <span class="anchor-button__arrow__end"></span>
            </span>
        </button>
    </div>`};var vT=m.createComponent({tag:"anchor-button",component:yT,props:{anchor:()=>({value:"",type:String}),content:()=>({value:"",type:String})}});var VM=({items:e,links:t})=>t?e.map(({label:r,url:o})=>g`<li>
                          <a href="${o}" class="list-links">
                              ${r}
                              <span class="list-links__arrow">
                                  <span class="list-links__arrow__start"></span>
                                  <span class="list-links__arrow__end"></span>
                              </span>
                          </a>
                      </li>`).join(""):e.map(r=>g` <li>${r}</li> `).join(""),TT=({getState:e})=>{let{style:t,color:r,items:o,links:n}=e(),s=`is-${r}`;return g`<ul class="ul ul--${t} ${s} ${n?"use-links":"use-default"}">
        ${VM({items:o,links:n})}
    </ul>`};var ST=m.createComponent({tag:"mob-list",component:TT,props:{style:()=>({value:"medium",type:String,validate:e=>["small","medium","big"].includes(e),strict:!0}),dots:()=>({value:!0,type:Boolean}),links:()=>({value:!1,type:Boolean}),color:()=>({value:"black",type:String,validate:e=>["white","black","grey","hightlight"].includes(e)}),items:()=>({value:[],type:Array})}});var _T=({getState:e})=>{let{style:t,color:r,boxed:o,note:n}=e(),s=r==="inherit"?"":`is-${r}`;return g`<p
        class="p p--${t} ${o?"p--boxed":""} ${n?"p--note":""} ${s}"
    >
        <mobjs-slot></mobjs-slot>
    </p>`};var xT=m.createComponent({tag:"mob-paragraph",component:_T,props:{style:()=>({value:"medium",type:String,validate:e=>["small","medium","big"].includes(e),strict:!0}),color:()=>({value:"inherit",type:String,validate:e=>["inherit","white","hightlight","black"].includes(e)}),boxed:()=>({value:!1,type:Boolean}),note:()=>({value:!1,type:Boolean})}});var WM=e=>e.length>0?g`<span class="title-index">${e}</span>`:"",CT=({getProxi:e})=>{let t=e(),r=t.color==="inherit"?"":`is-${t.color}`,o=t.isBold?"is-bold":"",n=t.isSection?"is-section":"";return g`<${t.tag} class="${r} ${o} ${n}">
            ${WM(t.index)}
            <span class="title-content">
                <mobjs-slot></mobjs-slot>
            </span>
        </${t.tag}>`};var ET=m.createComponent({tag:"mob-title",component:CT,props:{tag:()=>({value:"h1",type:String}),color:()=>({value:"inherit",type:String,validate:e=>["inherit","white","black"].includes(e)}),isSection:()=>({value:!1,type:Boolean}),isBold:()=>({value:!1,type:Boolean}),index:()=>({value:"",type:String})}});var jM=({data:e,staticProps:t,awaitLoadSnippet:r})=>e.map(o=>{let{component:n,props:s,content:i}=o;return g`
                <${n} ${t({...s,awaitLoad:r})}>
                    ${i??""}
                </${n}>
            `}).join(""),zM=async({source:e,data:t})=>{if(t&&t.length>0)return t;let{success:r,data:o}=await $t({source:e});return r?o.data:[]},wT=async({getState:e,staticProps:t})=>{let{source:r,data:o}=e(),n=await zM({source:r,data:o}),{awaitLoadSnippet:s,usePadding:i}=e();return g`
        <section class="html-content ${i?"use-padding":""}">
            ${jM({data:n,staticProps:t,awaitLoadSnippet:s})}
        </section>
    `};var HM=async({proxi:e})=>{let{success:t,data:r}=await qe({source:e.url});t&&(e.source=r)},IT=({getProxi:e,invalidate:t,onMount:r})=>{let o=e();return r(()=>{HM({proxi:o})}),g`
        <div class="c-doc-svg ${o.className}">
            ${t({observe:()=>o.source,render:()=>o.source})}
        </div>
    `};var MT=m.createComponent({tag:"doc-svg",component:IT,props:{className:()=>({value:"",type:String}),url:()=>({value:"",type:String})},state:{source:()=>({value:g`<span class="c-doc-svg__loading">
                    loading image ...
                </span>`,type:String})}});var mc=m.createComponent({tag:"html-content",component:wT,props:{source:()=>({value:"",type:String}),data:()=>({value:[],type:Array}),awaitLoadSnippet:()=>({value:!1,type:Boolean}),useTriangle:()=>({value:!0,type:Boolean}),usePadding:()=>({value:!0,type:Boolean})},child:[ST,xT,ET,mT,bT,vT,MT]});var RT=({bindEffect:e,getProxi:t})=>{let r=t(),o=r.isSection?"is-section":"",n=r.isNote?"is-note":"";return g`
        <button
            type="button"
            class="${o} ${n}"
            ${e({toggleClass:{active:()=>r.active}})}
        >
            <span>${r.label}</span>
        </button>
    `};var kT=m.createComponent({tag:"scroll-to-button",component:RT,props:{label:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean}),isSection:()=>({value:!1,type:Boolean}),isNote:()=>({value:!1,type:Boolean})}});var oi=!1;function UM({delegateEvents:e,bindProps:t,proxi:r}){return r.anchorItems.map(o=>{let n=o.isSection||o.isNote?"":e({click:async()=>{let{id:s,label:i,element:a}=o,c=s==="start"?0:le(a).top-50;oi=!0,r.activeLabel=i,await Or.to(c),setTimeout(()=>{oi=!1},1e3)}});return g`
                <li>
                    <scroll-to-button
                        ${n}
                        ${t(()=>({active:r.activeLabel===o.label,label:o.label,isSection:o.isSection??!1,isNote:o.isNote??!1}))}
                    >
                    </scroll-to-button>
                </li>
            `}).join("")}var NT=({proxi:e,direction:t,winHeight:r})=>{u.useFrame(()=>{u.useNextTick(()=>{if(t==="DOWN"){let o=e.anchorItems.findLast(({top:n,isNote:s})=>!s&&n<window.scrollY+r-200);e.activeLabel=o?o.label:""}if(t==="UP"){let o=e.anchorItems.findLast(({top:n,isNote:s})=>!s&&n<window.scrollY+200);e.activeLabel=o?o.label:""}})})},PT=({onMount:e,delegateEvents:t,bindProps:r,invalidate:o,computed:n,addMethod:s,updateState:i,getProxi:a})=>{let c=a(),l="DOWN",p=window.innerHeight;return s("addItem",({id:d,label:f,element:h,isSection:v,isNote:b})=>{i("anchorItemsToBeComputed",T=>[...T,{id:d,label:f,element:h,isSection:v,isNote:b}])}),s("setActiveLabel",d=>{oi||(c.activeLabel=d)}),e(()=>{if(fe.mq("max","desktop"))return;n(()=>c.anchorItems,()=>c.anchorItemsToBeComputed.map(b=>({...b,top:le(b.element).top})));let d=u.useScrollThrottle(({direction:b})=>l=b),f=new ResizeObserver(u.debounce(()=>{u.useFrame(()=>{u.useNextTick(()=>{p=window.innerHeight})}),c.anchorItems.forEach(b=>{b.top=le(b.element).top})},200));f.observe(m.getRoot());let h=c.updateAnchorOnWheel?u.useMouseWheel(u.debounce(()=>{oi||NT({proxi:c,direction:l,winHeight:p})},600)):()=>{},v=u.useScrollEnd(()=>{oi||NT({proxi:c,direction:l,winHeight:p})});return()=>{h(),d(),v(),f.unobserve(m.getRoot()),f.disconnect(),f=null}}),g`
        <div class="c-scroll-to">
            <ul>
                ${o({observe:()=>c.anchorItems,render:()=>UM({delegateEvents:t,bindProps:r,proxi:c})})}
            </ul>
        </div>
    `};var AT=m.createComponent({tag:"scroll-to",component:PT,state:{activeLabel:()=>({value:"",type:String}),updateAnchorOnWheel:()=>({value:!1,type:Boolean}),anchorItemsToBeComputed:()=>({value:[],type:Array}),anchorItems:()=>({value:[],type:Array,transform:e=>e.toSorted(function(t,r){let{element:o}=t,{element:n}=r;return o===n||!o||!n?0:o.compareDocumentPosition(n)&2?1:-1})})},child:[kT]});var dc=({breadCrumbs:e})=>e.map((t,r)=>r===e.length-1?g`<a href="${t.url}" class="breadcrumbs__arrow">
                          <div class="breadcrumbs__arrow__start"></div>
                          <div class="breadcrumbs__arrow__end"></div>
                      </a>
                      <a class="breadcrumbs__link" href="${t.url}"
                          >${t.title}</a
                      >`:g`<a class="breadcrumbs__link" href="${t.url}"
                      >${t.title}</a
                  >`).join("");var hc=e=>{m.useMethodByName(lc)?.updateList(e??[])};m.useComponent([Ka,Za,AT,Qa,mc]);var $e=async({props:e})=>{let{source:t,title:r,breadCrumbs:o,rightSidebar:n}=e,{data:s}=await $t({source:t});return hc(n??[]),g` <doc-container>
        <div>
            <html-content
                slot="docs"
                ${m.staticProps({data:s.data,useMaxWidth:!0})}
            ></html-content>
            <doc-title-small slot="section-title-small"
                ><div>
                    ${dc({breadCrumbs:o})}<span>${r}</span>
                </div></doc-title-small
            >
            <scroll-to name="${ei}" slot="section-links"></scroll-to>
            <doc-title slot="section-title">${r}</doc-title>
        </div>
    </doc-container>`};m.useComponent([Ka,Za,Qa,mc]);var se=async({props:e})=>{let{source:t,title:r,breadCrumbs:o,rightSidebar:n}=e,{data:s}=await $t({source:t});return hc(n??[]),g`<doc-container>
        <div>
            <html-content
                slot="docs"
                ${m.staticProps({data:s.data,useMaxWidth:!0})}
            ></html-content>
            <doc-title-small slot="section-title-small"
                ><div>
                    ${dc({breadCrumbs:o})}<span>${r}</span>
                </div></doc-title-small
            >
            <doc-title slot="section-title">${r}</doc-title>
        </div>
    </doc-container>`};var OT=({weakPathElement:e,weakScrollerElement:t,wrapElement:r,setActiveItem:o,weakScreenElement:n})=>{let s={ax:53,ay:70,bx:64,by:80,cx:89,cy:87,dx:100,dy:100,ex:0,ey:100,fx:10,fy:77,gx:17,gy:84},i={ax:-1,ay:-1,bx:1,by:1,cx:-1,cy:-1,dx:1,dy:1,ex:1,ey:1,fx:-1,fy:-1,gx:1,gy:1},a=H.createSequencer({data:{...s}});a.goTo({fy:90,ay:90,cy:70},{start:0,end:3.5}).goTo({gy:70,by:80},{start:2,end:5}).goTo({fy:90,ay:100,cy:90},{start:4,end:7.5}).goTo({ay:120,fy:80,cy:80},{start:7.5,end:10}).goTo({gy:100,by:100},{start:6,end:10}).add(()=>{o(1)},0).add(({direction:h,isForced:v})=>{v||h==="backward"||o(2)},1.5).add(({direction:h,isForced:v})=>{v||h==="backward"||o(3)},5.5).add(({direction:h,isForced:v})=>{v||h==="backward"||o(4)},9.5).add(({direction:h,isForced:v})=>{v||h==="forward"||o(1)},1.5).add(({direction:h,isForced:v})=>{v||h==="forward"||o(2)},5).add(({direction:h,isForced:v})=>{v||h==="forward"||o(3)},9),a.subscribe(({ax:h,ay:v,bx:b,by:T,cx:_,cy:S,dx:C,dy:E,ex:w,ey:M,fx:A,fy:R,gx:L,gy:D})=>{s.ax=h,s.ay=v,s.bx=b,s.by=T,s.cx=_,s.cy=S,s.dx=C,s.dy=E,s.ex=w,s.ey=M,s.fx=A,s.fy=R,s.gx=L,s.gy=D});let c=H.createTimeTween({data:{...i}});c.subscribe(({ax:h,ay:v,bx:b,by:T,cx:_,cy:S,dx:C,dy:E,ex:w,ey:M,fx:A,fy:R,gx:L,gy:D})=>{i.ax=h,i.ay=v,i.bx=b,i.by=T,i.cx=_,i.cy=S,i.dx=C,i.dy=E,i.ex=w,i.ey=M,i.fx=A,i.fy=R,i.gx=L,i.gy=D});let l=Ce.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(c,{ax:()=>Jt(-3,3),ay:()=>Jt(-3,3),bx:()=>Jt(-3,3),by:()=>Jt(-3,3),cx:()=>Jt(-3,3),cy:()=>Jt(-3,3),dx:()=>0,dy:()=>0,ex:()=>0,ey:()=>0,fx:()=>Jt(-3,3),fy:()=>Jt(-3,3),gx:()=>Jt(-3,3),gy:()=>Jt(-3,3)},{duration:3e3});l.play();let p=!0,d=()=>{if(!p)return;let h={x:s.ax+i.ax,y:s.ay+i.ay},v={x:s.bx+i.bx,y:s.by+i.by},b={x:s.cx+i.cx,y:s.cy+i.cy},T={x:s.dx+i.dx,y:s.dy+i.dy},_={x:s.ex+i.ex,y:s.ey+i.ey},S={x:s.fx+i.fx,y:s.fy+i.fy},C={x:s.gx+i.gx,y:s.gy+i.gy};e.deref()&&(e.deref().style.clipPath=`polygon(${h.x}% ${h.y}%, ${v.x}% ${v.y}%, ${b.x}% ${b.y}%, ${T.x}% ${T.y}%,${_.x}% ${_.y}%,${S.x}% ${S.y}%,${C.x}% ${C.y}%)`,u.useNextFrame(()=>d()))};u.useFrame(()=>d());let f=ze.createScrollTrigger({item:r,dynamicStart:{position:"right",value:()=>De(n?.deref()??document.createElement("div"))},dynamicEnd:{position:"right",value:()=>De(t?.deref()??document.createElement("div"))??0},reverse:!1,propierties:"tween",ease:!1,tween:a});return{pathScroller:f,pathSequencer:a,pathTween:c,pathTimeline:l,stopLoop:()=>{p=!1},destroy:()=>{f.destroy(),f=null,a.destroy(),a=null,c.destroy(),c=null,l.destroy(),l=null}}};var $T=({title_1:e,title_2:t})=>{let r=H.createScrollerTween({from:{x:0},to:{x:30}});r.subscribe(({x:i})=>{e.style.transform=`translate3d(0,0,0) translate(${i}px, 0px)`}),r.onStop(({x:i})=>{e.style.transform=`translate(${i}px, 0px)`});let o=ze.createParallax({item:e,propierties:"tween",tween:r,ease:!1,align:"start"}),n=H.createScrollerTween({from:{x:0},to:{x:-30}});n.subscribe(({x:i})=>{t.style.transform=`translate3d(0,0,0) translateX(${i}px)`}),n.onStop(({x:i})=>{t.style.transform=`translateX(${i}px)`});let s=ze.createParallax({item:t,propierties:"tween",tween:n,ease:!1,align:"start"});return{title1parallax:o,title2parallax:s,title1tween:r,title2tween:n}};var fc=({title:e})=>{let t=H.createScrollerTween({from:{x:0},to:{x:-60}});t.subscribe(({x:o})=>{e.deref()&&(e.deref().style.transform=`translate3d(0,0,0) translateX(${o}px)`)}),t.onStop(({x:o})=>{e.deref()&&(e.deref().style.transform=`translateX(${o}px)`)});let r=ze.createParallax({item:e.deref(),propierties:"tween",tween:t,ease:!1,align:"center"});return{sectionContentScroller:r,destroy:()=>{r.destroy(),r=null}}};var LT=({screenElement:e,scrollerElement:t,pathElement:r,wrapElement:o,title_1:n,title_2:s,section2_title:i,section3_title:a,section4_title:c,setActiveItem:l,onMove:p,onScrollEnd:d})=>{let f=new WeakRef(t),h=new WeakRef(i),v=new WeakRef(a),b=new WeakRef(c),T=new WeakRef(r),_=new WeakRef(e),{pathScroller:S,pathSequencer:C,pathTimeline:E,pathTween:w,stopLoop:M,destroy:A}=OT({weakPathElement:T,weakScrollerElement:f,wrapElement:o,setActiveItem:l,weakScreenElement:_}),{title1parallax:R,title2parallax:L,title1tween:D,title2tween:$}=$T({title_1:n,title_2:s}),{sectionContentScroller:V,destroy:I}=fc({title:h}),{sectionContentScroller:k,destroy:P}=fc({title:v}),{sectionContentScroller:x,destroy:N}=fc({title:b}),O=new xt({screen:e,scroller:t,direction:"horizontal",drag:!0,easeType:"lerp",breakpoint:"small",useHorizontalScroll:!0,useSwipe:!1,revertSwipeDirection:!1,children:[S,R,L,V,k,x],onUpdate:({value:F})=>{p(F),d()}});return O.init(),setTimeout(()=>{O?.refresh?.()},500),{goTo:F=>{O?.move?.(F).catch(()=>{})},destroy:()=>{O.destroy(),O=null,C.destroy(),S.destroy(),E.destroy(),w.destroy(),R.destroy(),L.destroy(),D.destroy(),$.destroy(),V.destroy(),k.destroy(),M(),A(),I(),P(),N()}}};var DT=({elements:e})=>{let t=H.createSpring({data:{x:0},stagger:{each:5}});return e.map(o=>o.querySelector("svg")).forEach(o=>{o&&(t.subscribe(({x:n})=>{o.style.transform=`translate3D(0,0,0) translateY(${-n}px)`}),t.onComplete(({x:n})=>{o.style.transform=`translateY(${-n}px)`}))}),{svgSpring:t,destroySvgSpring:()=>{t.destroy(),t=null}}};var si=()=>{},ni=e=>Promise.resolve(e),FT=()=>{},Qu={1:0,2:100/3,3:100/3*2,4:100},GM=({setRef:e,getState:t})=>{let{titleTop:r,titleBottom:o}=t().block_1;return g`
        <section
            class="l-about__section l-about__section l-about__section--first "
        >
            <div class="l-about__section__top has-overflow">
                <h1 class="title-big" ${e("title_1")}>${r}</h1>
            </div>
            <div class="l-about__section__bottom has-overflow">
                <h1 class="title-biggest" ${e("title_2")}>
                    ${o}
                </h1>
            </div>
        </section>
    `},qM=({setRef:e,getState:t})=>{let{title:r,copy:o}=t().block_2;return g`
        <section class="l-about__section">
            <div class="l-about__section__top has-overflow">
                <div class="l-about__section__left"></div>
                <div class="l-about__section__right">
                    <h1 class="title-biggest" ${e("section2_title")}>
                        ${r}
                    </h1>
                </div>
            </div>
            <div class="l-about__section__bottom has-overflow">
                <div class="l-about__section__right">
                    <p class="l-about__section__copy">${o}</p>
                </div>
            </div>
        </section>
    `},JM=({setRef:e,getState:t})=>{let{title:r,copy:o}=t().block_3;return g`
        <section class="l-about__section">
            <div class="l-about__section__top has-overflow">
                <div class="l-about__section__left"></div>
                <div class="l-about__section__right">
                    <h1 class="title-biggest" ${e("section3_title")}>
                        ${r}
                    </h1>
                </div>
            </div>
            <div class="l-about__section__bottom has-overflow">
                <div class="l-about__section__right">
                    <p class="l-about__section__copy">${o}</p>
                </div>
            </div>
        </section>
    `},YM=({setRef:e,getState:t})=>{let{title:r,items:o}=t().block_4;return g`
        <section class="l-about__section l-about__section--last">
            <div class="l-about__section__top">
                <h1 class="title-biggest" ${e("section4_title")}>
                    ${r}
                </h1>
            </div>
            <div class="l-about__section__bottom">
                <ul class="l-about__list">
                    ${o.map(n=>g` <li>[ ${n} ]</li> `).join("")}
                </ul>
            </div>
        </section>
    `},XM=({proxi:e,delegateEvents:t,bindEffect:r})=>g`
        <ul class="l-about__nav">
            ${e.navItem.map(({index:o,label:n})=>g`
                        <li class="l-about__nav__item">
                            <button
                                class="l-about__nav__button"
                                ${t({click:()=>{si(Qu[o]),FT()}})}
                                ${r({toggleClass:{active:()=>e.activenavItem===o}})}
                            >
                                ${n}
                            </button>
                        </li>
                    `).join("")}
        </ul>
    `,KM=()=>g`
        <div class="l-about__square">
            <div class="l-about__square__legend"><h4>Scroll or Drag</h4></div>
            <span class="l-about__square__angle top-left"></span>
            <span class="l-about__square__angle top-right"></span>
            <span class="l-about__square__angle bottom-left"></span>
            <span class="l-about__square__angle bottom-right"></span>
        </div>
    `,BT=({onMount:e,setRef:t,getRef:r,getRefs:o,getState:n,bindEffect:s,delegateEvents:i,getProxi:a})=>{let c=a(),l=4,p=!1;return e(()=>{let{screenElement:d,scrollerElement:f,wrapElement:h,title_1:v,title_2:b,section2_title:T,section3_title:_,section4_title:S,pathElement:C}=r(),{svg:E}=o(),w=0,M=!1,A=0,{svgSpring:R,destroySvgSpring:L}=DT({elements:E});ni=async V=>{if(u.shouldMakeSomething()||p){R.stop(),p=!0,setTimeout(()=>{p=!1},2e3);return}let k=-Math.abs(V/30);await R.goTo({x:k}).catch(()=>{})},FT=()=>{ni(3e3),setTimeout(()=>{ni(0)},500)};let{destroy:D,goTo:$}=LT({screenElement:d,scrollerElement:f,pathElement:C,wrapElement:h,title_1:v,title_2:b,section2_title:T,section3_title:_,section4_title:S,setActiveItem:V=>{c.activenavItem=V},onMove:V=>{M||(w=V),M=!0,A=w-V,ni(A)},onScrollEnd:u.useDebounce(()=>{M=!1,A=0,ni(A)},500)});return si=$,c.isMounted=!0,()=>{si=()=>{},D(),L()}}),g`<div
        class="l-about"
        style="--number-of-section:${l}"
        ${s({toggleClass:{active:()=>c.isMounted}})}
    >
        <div class="l-about__sqaure-container">${KM()}</div>
        <span class="l-about__background">
            <div
                class="l-about__about-svg l-about__about-svg--bottom"
                ${t("svg")}
            >
                ${c.aboutSvg}
            </div>
        </span>
        <div
            class="l-about__about-svg l-about__about-svg--back"
            ${t("svg")}
        >
            ${c.aboutSvg}
        </div>
        <div
            class="l-about__shape l-about__shape--front"
            ${t("pathElement")}
        >
            <div class="l-about__about-svg l-about__about-svg--front">
                ${c.aboutSvg}
            </div>
        </div>
        <div class="l-about__screen" ${t("screenElement")}>
            <div class="l-about__scroller" ${t("scrollerElement")}>
                <div class="l-about__wrap" ${t("wrapElement")}>
                    ${GM({setRef:t,getState:n})}
                    ${qM({setRef:t,getState:n})}
                    ${JM({setRef:t,getState:n})}
                    ${YM({setRef:t,getState:n})}
                </div>
            </div>
        </div>
        <button
            type="button"
            class="l-about__prev"
            ${s({toggleAttribute:{disabled:()=>c.activenavItem==1}})}
            ${i({click:()=>{si(Qu[fe.clamp(1,4,c.activenavItem-1)])}})}
        ></button>
        ${XM({bindEffect:s,delegateEvents:i,proxi:c})}
        <button
            type="button"
            class="l-about__next"
            ${s({toggleAttribute:{disabled:()=>c.activenavItem==4}})}
            ${i({click:()=>{si(Qu[fe.clamp(1,4,c.activenavItem+1)])}})}
        ></button>
    </div>`};var VT=m.createComponent({tag:"about-component",component:BT,props:{block_1:()=>({value:{titleTop:"",titleBottom:""},type:"any"}),block_2:()=>({value:{title:"",copy:""},type:"any"}),block_3:()=>({value:{title:"",copy:""},type:"any"}),block_4:()=>({value:{title:"",items:[""]},type:"any"}),aboutSvg:()=>({value:"",type:String})},state:{navItem:()=>({value:[{index:1,label:"about"},{index:2,label:"why"},{index:3,label:"what"},{index:4,label:"inspiration"}],type:Array}),activenavItem:()=>({value:1,type:Number,transform:e=>fe.clamp(e,1,4)}),isMounted:()=>({value:!1,type:Boolean})}});m.useComponent([VT]);var WT=async()=>{let{data:e}=await $t({source:"./data/about/index.json"}),{data:t}=await qe({source:"./asset/svg/about.svg?v=0.1"});return g`<about-component
        ${m.staticProps({block_1:e.block_1,block_2:e.block_2,block_3:e.block_3,block_4:e.block_4,aboutSvg:t})}
    ></about-component> `};var jT=({getProxi:e,bindObject:t,delegateEvents:r,onMount:o,id:n,bindEffect:s})=>{let i=e();return o(()=>()=>{}),g`<div
        class="benchmark-fake"
        ${s({toggleClass:{selected:()=>i.isSelected}})}
    >
        <div class="benchmark-fake__row">
            <strong>id:</strong><br />
            ${n}
        </div>
        <div class="benchmark-fake__row">
            ${t`<strong>index:</strong><br/> ${()=>i.index}`}
        </div>
        <div class="benchmark-fake__row">
            ${t`<strong>label:</strong><br/> ${()=>i.label}`}
        </div>
        <div class="benchmark-fake__row">
            ${t`<strong>counter: </strong><br/> ${()=>i.counter}`}
        </div>
        <div class="benchmark-fake__row">
            <button
                class="benchmark-fake__button"
                type="button"
                ${r({click:()=>{i.isSelected=!i.isSelected}})}
            >
                Select
            </button>
        </div>
    </div> `};var gc=m.createComponent({tag:"benchmark-fake-component",component:jT,props:{counter:0,label:"",index:0},state:{isSelected:!1}});var yt=(e=1001)=>({state:{counter:()=>({value:0,type:Number}),data:()=>({value:[],type:Array,validate:t=>t.length<e,strict:!0,skipEqual:!1}),time:()=>({value:0,type:Number,transform:t=>Math.round(t),skipEqual:!1}),isLoading:()=>({value:!1,type:Boolean}),currentIndex:()=>({value:-1,type:Number})},child:[gc]});var ep=e=>{for(let t=e.length-1;t>0;t--){let r=Math.floor(Math.random()*(t+1));[e[t],e[r]]=[e[r],e[t]]}return e},ii=e=>{let t=u.checkType(Number,e)?e:0;return[...Array.from({length:t}).keys()].map(r=>({label:`comp-${r+1}`}))},Zu=({proxi:e,value:t,useShuffle:r=!1})=>{e.isLoading=!0,u.useFrameIndex(()=>{u.useNextTick(async()=>{let o=performance.now();e.data=r?ep(ii(t)):ii(t),await m.tick();let s=performance.now()-o;e.time=s,e.isLoading=!1})},2)},vt=({delegateEvents:e,setRef:t,getRef:r,bindEffect:o,proxi:n})=>g`
        <div
            class="benchmark__loading"
            ${o({observe:"isLoading",toggleClass:{active:()=>n.isLoading}})}
        >
            generate components
        </div>
        <div class="benchmark__head__controls">
            <input
                class="benchmark__head__input"
                type="text"
                placeholder="Number of component"
                ${t("input")}
                ${e({keydown:s=>{if(s.keyCode===13){s.preventDefault();let i=Number(s.target?.value??0);Zu({proxi:n,value:i})}}})}
            />
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{let{input:s}=r(),i=Number(s?.value??0);Zu({proxi:n,value:i})}})}
            >
                Generate components
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{Zu({proxi:n,value:n.data.length,useShuffle:!0})}})}
            >
                Shuffle array
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{n.counter=n.counter+1}})}
            >
                Update counter
            </button>
        </div>
    `;var zT=({onMount:e,delegateEvents:t,bindText:r,invalidate:o,getState:n,staticProps:s,setRef:i,getRef:a,bindProps:c,bindEffect:l,getProxi:p})=>{let d=p();return e(()=>()=>{a()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">Invalidate:</h3>
            <h2 class="benchmark__head__title">
                Generate components performance
            </h2>
            <p>
                Invalidate a large list of components with 5 reactive elements
                inside.<br />
                ( max component <strong>1000</strong> ).
            </p>
            ${vt({setRef:i,getRef:a,proxi:d,delegateEvents:t,bindEffect:l})}

            <div class="benchmark__head__time">
                ${r`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${o({observe:()=>d.data,render:()=>{let{data:f}=n();return g`
                        ${f.map(({label:h},v)=>g`
                                    <benchmark-fake-component
                                        ${s({label:h,index:v})}
                                        ${c(()=>({counter:d.counter}))}
                                    ></benchmark-fake-component>
                                `).join("")}
                    `}})}
        </div>
    </div>`};var HT=m.createComponent({tag:"benchmark-invalidate",component:zT,...yt()});var bc=(e=1e3)=>g`
        <p>
            Generates and updates a large list of components with 5 reactive
            elements inside.<br />
            ( max component <strong>${e}</strong> ).
        </p>
    `;var UT=({onMount:e,delegateEvents:t,bindObject:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindEffect:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">Repeat ( with key ):</h3>
            <h2 class="benchmark__head__title">
                Generate components performance
            </h2>
            ${bc()}
            ${vt({setRef:o,getRef:n,delegateEvents:t,bindEffect:a,proxi:l})}

            <div class="benchmark__head__time">
                ${r`components generate in <strong>${()=>l.time}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${i({observe:()=>l.data,useSync:!0,key:"label",render:({sync:p,current:d})=>g`
                              <benchmark-fake-component
                                  ${s({observe:["counter"],props:({counter:f},h,v)=>({index:v,label:h.label,counter:f})})}
                                  ${p()}
                              >
                              </benchmark-fake-component>
                          `})}
        </div>
    </div>`};var GT=m.createComponent({tag:"benchmark-repeat-key",component:UT,...yt()});var qT=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindObject:a,bindEffect:c,getProxi:l})=>{let p=l();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat ( nested with key ):
            </h3>
            <p class="benchmark__head__title">
                Repater without component with the same repeater with component
                inside<br />
                ( max value <strong>10</strong> ).
            </p>
            ${vt({setRef:o,getRef:n,delegateEvents:t,bindEffect:c,proxi:p})}

            <div class="benchmark__head__time">
                ${r`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${i({observe:()=>p.data,key:"label",useSync:!0,render:({current:d})=>g`<div class="benchmark__static-item">
                        <div class="benchmark__static-item__inner">
                            ${a`label: ${()=>d.value.label}`}
                        </div>
                        <div>
                            ${i({observe:()=>p.data,useSync:!0,key:"label",render:({sync:f,current:h})=>g`
                                        <benchmark-fake-component
                                            ${s(()=>({index:h.index,label:h.value.label,counter:p.counter}))}
                                            ${f()}
                                        >
                                        </benchmark-fake-component>
                                    `})}
                        </div>
                    </div>`})}
        </div>
    </div>`};var JT=m.createComponent({tag:"benchmark-repeat-key-nested",component:qT,...yt(31)});var YT=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindEffect:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">Repeat ( without key ):</h3>
            <h2 class="benchmark__head__title">
                Generate components performance
            </h2>
            ${bc()}
            ${vt({setRef:o,getRef:n,delegateEvents:t,bindEffect:a,proxi:l})}

            <div class="benchmark__head__time">
                ${r`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${i({observe:()=>l.data,useSync:!0,render:({sync:p,current:d})=>g`
                              <benchmark-fake-component
                                  ${s({observe:["counter"],props:({counter:f},h,v)=>({index:v,label:h.label,counter:f})})}
                                  ${p()}
                              >
                              </benchmark-fake-component>
                          `})}
        </div>
    </div>`};var XT=m.createComponent({tag:"benchmark-repeat-no-key",component:YT,...yt()});var Lt=u.createStore({data:()=>({value:[],type:Array,validate:e=>e.length<1001,strict:!0,skipEqual:!1}),counter:()=>({value:0,type:Number}),time:()=>({value:0,type:Number,transform:e=>Math.round(e),skipEqual:!1}),isLoading:()=>({value:!1,type:Boolean})});var tp=({value:e,useShuffle:t=!1})=>{Lt.set("isLoading",!0),u.useFrameIndex(()=>{u.useNextTick(async()=>{let r=performance.now();Lt.set("data",t?ep(ii(e)):ii(e)),await m.tick();let n=performance.now()-r;Lt.set("time",n),Lt.set("isLoading",!1)})},2)},KT=({delegateEvents:e,setRef:t,getRef:r,getState:o,bindEffect:n})=>g`
        <div
            class="benchmark__loading"
            ${n({observe:"isLoading",toggleClass:{active:()=>o().isLoading}})}
        >
            generate components
        </div>
        <div class="benchmark__head__controls">
            <input
                class="benchmark__head__input"
                type="text"
                placeholder="Number of component"
                ${t("input")}
                ${e({keydown:s=>{if(s.code.toLowerCase()==="enter"){s.preventDefault();let i=Number(s.target?.value??0);tp({value:i})}}})}
            />
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{let{input:s}=r(),i=Number(s?.value??0);tp({value:i})}})}
            >
                Generate components
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{let{data:s}=o();tp({value:s.length,useShuffle:!0})}})}
            >
                Shuffle array
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{Lt.update("counter",s=>s+1)}})}
            >
                Update counter
            </button>
        </div>
    `;var QT=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,getState:s,bindProps:i,repeat:a,bindEffect:c,getProxi:l})=>{let p=l();return e(()=>()=>{n()?.input.remove(),Lt.set("data",[]),Lt.set("time",0),Lt.set("counter",0)}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat bind external store ( without key ):
            </h3>
            <h2 class="benchmark__head__title">
                Generate components performance
            </h2>
            <p class="benchmark__head__title">
                Use extrernal store as state ( bindStore module ).<br />
                ( max value <strong>1000</strong> ).
            </p>
            ${KT({setRef:o,getRef:n,delegateEvents:t,getState:s,bindEffect:c})}

            <div class="benchmark__head__time">
                ${r`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${a({observe:()=>p.data,useSync:!0,render:({sync:d,current:f})=>g`
                              <benchmark-fake-component
                                  ${i({observe:["counter"],props:({counter:h},v,b)=>({index:b,label:v.label,counter:h})})}
                                  ${d()}
                              >
                              </benchmark-fake-component>
                          `})}
        </div>
    </div>`};var ZT=m.createComponent({tag:"benchmark-repeat-no-key-bind-store",component:QT,bindStore:Lt,child:[gc]});var eS=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindObject:a,bindEffect:c,getProxi:l})=>{let p=l();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat ( nested without key ):
            </h3>
            <p class="benchmark__head__title">
                Repater without component with the same repeater with component
                inside<br />
                ( max value <strong>10</strong> ).
            </p>
            ${vt({setRef:o,getRef:n,delegateEvents:t,bindEffect:c,proxi:p})}

            <div class="benchmark__head__time">
                ${r`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${i({observe:()=>p.data,useSync:!0,render:({current:d})=>g`<div class="benchmark__static-item">
                        <div class="benchmark__static-item__inner">
                            ${a`label: ${()=>d.value.label}`}
                        </div>
                        <div>
                            ${i({observe:()=>p.data,useSync:!0,render:({sync:f,current:h})=>g`
                                        <benchmark-fake-component
                                            ${s(()=>({index:h.index,label:h.value.label,counter:p.counter}))}
                                            ${f()}
                                        >
                                        </benchmark-fake-component>
                                    `})}
                        </div>
                    </div>`})}
        </div>
    </div>`};var tS=m.createComponent({tag:"benchmark-repeat-key-no-nested",component:eS,...yt(31)});var yc=(e=1e3)=>g`
        <p>
            Generates and updates a large list of vanilla HTML element with 4
            reactive elements inside.<br />
            ( max component <strong>${e}</strong> ).
        </p>
    `;var rS=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,repeat:s,bindEffect:i,bindObject:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat no component ( without key ):
            </h3>
            <h2 class="benchmark__head__title">
                Generate vanilla html performance
            </h2>
            ${yc(1e3)}
            ${vt({setRef:o,getRef:n,delegateEvents:t,bindEffect:i,proxi:l})}

            <div class="benchmark__head__time">
                ${r`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${s({observe:()=>l.data,render:({current:p})=>g`
                        <div
                            class="benchmark-fake"
                            ${i({observe:[()=>l.currentIndex],toggleClass:{selected:()=>p.index===l.currentIndex}})}
                        >
                            <div class="benchmark-fake__row">
                                ${a`<strong>index:</strong><br/> ${()=>p.index}`}
                            </div>
                            <div class="benchmark-fake__row">
                                ${a`<strong>label:</strong><br/> ${()=>p.value.label}`}
                            </div>
                            <div class="benchmark-fake__row">
                                ${a`<strong>counter: </strong><br/> ${()=>l.counter}`}
                            </div>
                            <div class="benchmark-fake__row">
                                <button
                                    class="benchmark-fake__button"
                                    type="button"
                                    ${t({click:()=>{l.currentIndex=l.currentIndex===p.index?-1:p.index}})}
                                >
                                    Select
                                </button>
                            </div>
                        </div>
                    `})}
        </div>
    </div>`};var oS=m.createComponent({tag:"benchmark-repeat-no-component-no-key",component:rS,...yt(1001)});var nS=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,repeat:s,bindEffect:i,bindObject:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat no component ( with key ):
            </h3>
            <h2 class="benchmark__head__title">
                Generate vanilla html performance
            </h2>
            ${yc(1e3)}
            ${vt({setRef:o,getRef:n,delegateEvents:t,bindEffect:i,proxi:l})}

            <div class="benchmark__head__time">
                ${r`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${s({observe:()=>l.data,key:"label",render:({current:p})=>g`
                        <div
                            class="benchmark-fake"
                            ${i({observe:[()=>l.currentIndex],toggleClass:{selected:()=>p.index===l.currentIndex}})}
                        >
                            <div class="benchmark-fake__row">
                                ${a`<strong>index:</strong><br/> ${()=>p.index}`}
                            </div>
                            <div class="benchmark-fake__row">
                                ${a`<strong>label:</strong><br/> ${()=>p.value.label}`}
                            </div>
                            <div class="benchmark-fake__row">
                                ${a`<strong>counter: </strong><br/> ${()=>l.counter}`}
                            </div>
                            <div class="benchmark-fake__row">
                                <button
                                    class="benchmark-fake__button"
                                    type="button"
                                    ${t({click:()=>{l.currentIndex=l.currentIndex===p.index?-1:p.index}})}
                                >
                                    Select
                                </button>
                            </div>
                        </div>
                    `})}
        </div>
    </div>`};var sS=m.createComponent({tag:"benchmark-repeat-no-component-with-key",component:nS,...yt(1001)});m.useComponent([HT,XT,GT,JT,tS,ZT,oS,sS]);var Lr=async({props:e})=>{let{rootComponent:t}=e;return g`<div class="l-benchMark"><${t}></${t}></div>`};var ye=({active:e=!0,nextRoute:t="",prevRoute:r="",backRoute:o=""})=>{let n=m.useMethodByName(Qs);n.update("active",e),n.update("nextRoute",t),n.update("prevRoute",r),n.update("backRoute",o)};m.beforeRouteChange(()=>{let e=m.useMethodByName(Qs);e.update("active",!1),e.update("nextRoute",""),e.update("prevRoute",""),e.update("backRoute","")});var nt="rgba(255, 255, 255, 0)",st=({disableOffcanvas:e})=>{let t="OffscreenCanvas"in globalThis&&!e;return{useOffscreen:t,context:t?"bitmaprenderer":"2d"}},it=({useOffscreen:e,canvas:t})=>{let r=e?new OffscreenCanvas(t.width,t.height):null,o=e?r?.getContext("2d"):null;return{offscreen:r,offScreenCtx:o}},at=({useOffscreen:e,offscreen:t,ctx:r})=>{if(e&&t&&r){let o=t.transferToImageBitmap();r.transferFromImageBitmap(o)}},Xn=e=>"roundRect"in e;var go=({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:n,gutter:s})=>{let i={row:0,col:-1,items:[]};return[...Array.from({length:t*r+t}).keys()].reduce(a=>{let{row:c,col:l,items:p}=a,d=l<r?l+1:0,f=d===0?c+1:c,h=(o+s)*d,v=(n+s)*f;return{row:f,col:d,items:[...p,{width:o,height:n,x:h,y:v,centerX:h+o/2,centerY:v+n/2,offsetXCenter:Uo({canvasWidth:e.width,width:o,gutter:s,numberOfColumn:r}),offsetYCenter:Go({canvasHeight:e.height,height:n,gutter:s,numberOfRow:t}),gutter:s,numberOfColumn:r}]}},i)},Uo=({canvasWidth:e,width:t,gutter:r,numberOfColumn:o})=>e/2-(t+r)*o/2,Go=({canvasHeight:e,height:t,gutter:r,numberOfRow:o})=>e/2-(t+r)*(o+1)/2;var X=u.createStore({activeNavigationSection:()=>({value:"",type:String,skipEqual:!1}),navigationIsOpen:()=>({value:!1,type:Boolean})});X.set("activeNavigationSection","");var iS=({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:n,gutter:s,fill:i,disableOffcanvas:a,stagger:c,reorder:l})=>{let{useOffscreen:p,context:d}=st({disableOffcanvas:a}),f=!0,h=e.getContext(d,{alpha:!0}),v=m.getActiveRoute(),{offscreen:b,offScreenCtx:T}=it({useOffscreen:p,canvas:e}),_=p?T:h,S=Xn(_);_=null,e.width=e.clientWidth,e.height=e.clientHeight;let C=go({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:n,gutter:s}).items,E=l?C.map(($,V)=>({...$,scale:1,rotate:0,hasFill:i.includes(V)})).toSorted($=>$.hasFill?-1:1).toReversed():C.map(($,V)=>{let I=i.includes(V);return{...$,scale:1,rotate:0,hasFill:I}}),w=H.createTimeTween({ease:"easeInOutQuad",stagger:c,data:{scale:1,rotate:0}});E.forEach($=>{w.subscribeCache($,({scale:V,rotate:I})=>{$.rotate=I,$.scale=V})});let M=()=>{if(!h)return;p&&b&&(b.width=e.width,b.height=e.height);let $=p?T:h;$&&(e.width=e.width,E.forEach(({x:V,y:I,width:k,height:P,rotate:x,scale:N,hasFill:O,offsetXCenter:F,offsetYCenter:B})=>{let Q=Math.PI/180*x,U=Math.cos(Q)*N,J=Math.sin(Q)*N;$.setTransform(U,J,-J,U,Math.floor(F+V),Math.floor(B+I)),S?($.beginPath(),$.roundRect(Math.floor(-k/2),Math.floor(-P/2),k,P,5)):($.beginPath(),$.rect(Math.floor(-k/2),Math.floor(-P/2),k,P)),O?($.fillStyle="#000000",$.fill()):($.strokeStyle="#000",$.fillStyle="rgba(238, 238, 238, 0.9)",$.stroke(),$.fill()),$.setTransform(1,0,0,1,0,0)}),at({useOffscreen:p,offscreen:b,ctx:h}))},A=Ce.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).label({name:"label1"}).goTo(w,{scale:1.5,rotate:90},{duration:1e3}).goTo(w,{scale:.5},{duration:500}).goTo(w,{rotate:180,scale:1.2},{duration:500}).goTo(w,{scale:1.3},{duration:500}).goTo(w,{scale:1},{duration:1200});A.onLoopEnd(({direction:$,loop:V})=>{console.log(`loop end: ${$}, ${V}`)}),A.play();let R=()=>{M(),f&&u.useNextFrame(()=>R())};u.useFrame(()=>{R()});let L=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,E.forEach($=>{let{width:V,height:I,gutter:k,numberOfColumn:P}=$;$.offsetXCenter=Uo({canvasWidth:e.width,width:V,gutter:k,numberOfColumn:P}),$.offsetYCenter=Go({canvasHeight:e.height,height:I,gutter:k,numberOfRow:t})}),u.useFrame(()=>M())}),D=X.watch("navigationIsOpen",$=>{if($){A?.pause(),f=!1;return}setTimeout(async()=>{f=!0,m.getActiveRoute().route===v.route&&(A?.resume(),u.useFrame(()=>R()))},500)});return()=>{w.destroy(),A.destroy(),L(),D(),w=null,A=null,h=null,b=null,T=null,C=[],f=!1,E=null,d=null}};var aS=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s})=>{let i=s();return document.body.style.background=nt,e(()=>{let{canvas:a}=o(),c=iS({canvas:a,...t()});return u.useFrame(()=>{i.isMounted=!0}),()=>{c(),document.body.style.background=""}}),g`
        <div>
            <div class="c-canvas">
                <div
                    class="c-canvas__wrap"
                    ${n({toggleClass:{active:()=>i.isMounted}})}
                >
                    <canvas ${r("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var cS=m.createComponent({tag:"animatedpattern-n0",component:aS,props:{numberOfRow:()=>({value:10,type:Number}),numberOfColumn:()=>({value:10,type:Number}),cellWidth:()=>({value:window.innerHeight/16,type:Number}),cellHeight:()=>({value:window.innerHeight/16,type:Number}),gutter:()=>({value:1,type:Number}),fill:()=>({value:[16,27,38,49,60,71,82,93],type:Array}),stagger:()=>({value:{each:5,grid:{col:11,row:11,direction:"row"},waitComplete:!1},type:"any"}),reorder:()=>({value:!0,type:Boolean}),disableOffcanvas:()=>({value:!!(ot()||rt()),type:Boolean})},state:{isMounted:!1}});var rp=[{animation:{},description:"<strong>Canvas</strong>: AsyncTimeline - Animated pattern v0",nav:{prevRoute:"#async-timeline",nextRoute:"#animatedPatternN0?version=1&activeId=1",backRoute:"#canvas-overview"}},{description:"<strong>Canvas</strong>: AsyncTimeline - Animated pattern v1",animation:{fill:[0,13,20,45,65,71,72,73,74,75,76,77,83,92,96,113,117,134,138,155,156,157,158,159,189,209],gutter:1,numberOfColumn:20,numberOfRow:10,cellWidth:window.innerHeight/18,cellHeight:window.innerHeight/18,stagger:{each:2,from:"random",waitComplete:!1},reorder:!1},nav:{prevRoute:"#animatedPatternN0?version=0&activeId=0",nextRoute:"#animatedPatternN0?version=2&activeId=2",backRoute:"#canvas-overview"}},{description:"<strong>Canvas</strong>: AsyncTimeline - Animated pattern v2",animation:{fill:[0,13,20,45,65,71,72,73,74,75,76,77,83,92,96,113,117,134,138,155,156,157,158,159,189,209],gutter:1,numberOfColumn:10,numberOfRow:10,stagger:{each:10,from:"edges",waitComplete:!1},reorder:!1},nav:{prevRoute:"#animatedPatternN0?version=1&activeId=1",nextRoute:"#animatedPatternN0?version=3&activeId=3",backRoute:"#canvas-overview"}},{description:"<strong>Canvas</strong>: AsyncTimeline - Animated pattern v3",animation:{fill:[],gutter:1,numberOfColumn:12,numberOfRow:13,cellWidth:window.innerHeight/22,cellHeight:window.innerHeight/22,stagger:{each:20,from:{x:6,y:6},grid:{col:13,row:13,direction:"radial"},waitComplete:!1},reorder:!1},nav:{prevRoute:"#animatedPatternN0?version=2&activeId=2",nextRoute:"#animatedPatternN1",backRoute:"#canvas-overview"}}];var ve=e=>{m.useMethodByName(uc)?.updateRawContent?.(e)};m.beforeRouteChange(()=>{ve("")});m.useComponent([cS]);var lS=({params:e})=>{let{version:t}=e,r=rp[Math.max(0,Math.min(Number(t),rp.length-1))];return r?(ye({active:!0,prevRoute:r.nav.prevRoute,nextRoute:r.nav.nextRoute,backRoute:r.nav.backRoute}),ve(r.description),g`<div class="l-padding">
        <animatedpattern-n0
            ${m.staticProps({...r.animation})}
        ></animatedpattern-n0>
    </div>`):""};var uS=({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:n,gutter:s,fill:i,disableOffcanvas:a})=>{let{useOffscreen:c,context:l}=st({disableOffcanvas:a}),p=!0,{top:d,left:f}=le(e),h=e.getContext(l,{alpha:!0}),v=m.getActiveRoute(),{offscreen:b,offScreenCtx:T}=it({useOffscreen:c,canvas:e});e.width=e.clientWidth,e.height=e.clientHeight;let _=go({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:n,gutter:s}).items,S=_.map((I,k)=>({...I,scale:0,mouseX:0,mouseY:0,hasFill:i.includes(k)})).toSorted(I=>I.hasFill?-1:1),C=H.createLerp({data:{mouseX:0,mouseY:0}});S.forEach(I=>{C.subscribeCache(I,({mouseX:k,mouseY:P})=>{I.mouseX=k,I.mouseY=P})});let E=H.createTimeTween({ease:"easeInOutSine",stagger:{each:5,from:"center",waitComplete:!1},data:{scale:0}});S.forEach(I=>{E.subscribeCache(I,({scale:k})=>{I.scale=k})});let w=()=>{if(!h)return;c&&b&&(b.width=e.width,b.height=e.height);let I=c?T:h;I&&(e.width=e.width,S.forEach(({x:k,y:P,width:x,height:N,mouseX:O,mouseY:F,scale:B,hasFill:Q,offsetXCenter:U,offsetYCenter:J})=>{if(!Q)return;let q=O-(e.width-(x+s)*r)/2,oe=F-(e.height-(N+s)*t)/2,te=(k-q)/250,me=(P-oe)/250,Ee=Math.sqrt(Math.pow(Math.abs(te),2)+Math.pow(Math.abs(me),2)),ke=fe.clamp(Math.abs(Ee),0,2),Ne=0,Ue=Math.cos(Ne)*(ke+B),St=Math.sin(Ne)*(ke+B);I.setTransform(Ue,St,-St,Ue,Math.floor(U+k),Math.floor(J+P)),I.beginPath(),I.rect(Math.floor(-x/2),Math.floor(-N/2),x,N),I.fillStyle="#000000",I.fill(),I.setTransform(1,0,0,1,0,0)}),I.globalCompositeOperation="destination-out",S.forEach(({x:k,y:P,width:x,height:N,mouseX:O,mouseY:F,scale:B,hasFill:Q,offsetXCenter:U,offsetYCenter:J})=>{if(Q)return;let q=O-(e.width-(x+s)*r)/2,oe=F-(e.height-(N+s)*t)/2,te=(k-q)/250,me=(P-oe)/250,Ee=Math.sqrt(Math.pow(Math.abs(te),2)+Math.pow(Math.abs(me),2)),ke=fe.clamp(Math.abs(Ee),0,2),Ne=0,Ue=Math.cos(Ne)*(ke+B),St=Math.sin(Ne)*(ke+B);I.setTransform(Ue,St,-St,Ue,Math.floor(U+k),Math.floor(J+P)),I.beginPath(),I.rect(Math.floor(-x/2),Math.floor(-N/2),x,N),I.fill(),I.setTransform(1,0,0,1,0,0)}),at({useOffscreen:c,offscreen:b,ctx:h}))},M=Ce.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(E,{scale:.3},{duration:1e3});M.play();let A=({x:I,y:k})=>{C.goTo({mouseX:I-f,mouseY:k-d}).catch(()=>{})},R=u.useMouseMove(({client:I})=>{let{x:k,y:P}=I;A({x:k,y:P})}),L=u.useTouchMove(({client:I})=>{let{x:k,y:P}=I;A({x:k,y:P})}),D=()=>{w(),p&&u.useNextFrame(()=>D())};u.useFrame(()=>{D()});let $=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,d=le(e).top,f=le(e).left,S.forEach(I=>{let{width:k,height:P,gutter:x,numberOfColumn:N}=I;I.offsetXCenter=Uo({canvasWidth:e.width,width:k,gutter:x,numberOfColumn:N}),I.offsetYCenter=Go({canvasHeight:e.height,height:P,gutter:x,numberOfRow:t})}),u.useFrame(()=>w())}),V=X.watch("navigationIsOpen",I=>{if(I){M?.stop(),p=!1;return}setTimeout(async()=>{p=!0,m.getActiveRoute().route===v.route&&(M?.play(),u.useFrame(()=>D()))},500)});return()=>{E.destroy(),M.destroy(),C.destroy(),$(),R(),L(),V(),E=null,M=null,C=null,h=null,b=null,T=null,_=[],p=!1,S=null,l=null}};var pS=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s})=>{let i=s();return document.body.style.background=nt,e(()=>{let{canvas:a}=o(),c=uS({canvas:a,...t()});return u.useFrame(()=>{i.isMounted=!0}),()=>{document.body.style.background="",c()}}),g`
        <div>
            <div class="c-canvas">
                <div
                    class="c-canvas__wrap"
                    ${n({toggleClass:{active:()=>i.isMounted}})}
                >
                    <canvas ${r("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var mS=m.createComponent({tag:"animatedpattern-n1",component:pS,props:{numberOfRow:7,numberOfColumn:15,cellWidth:window.innerHeight/13,cellHeight:window.innerHeight/13,gutter:window.innerHeight/150,fill:[2,18,10,27,21,22,23,24,25,25,26,37,42,53,58,69,74,85,86,87,88,89,90,44,60,65,98,108],disableOffcanvas:()=>({value:!!(ot()||rt()),type:Boolean})},state:{isMounted:!1}});m.useComponent([mS]);var dS=()=>(ye({active:!0,prevRoute:"#animatedPatternN0?version=3&activeId=3",nextRoute:"#scrollerN0?version=0&activeId=0",backRoute:"#canvas-overview"}),ve("<strong>Canvas</strong>: TimeTween Lerp & AsyncTimeline"),g`<div class="l-padding">
        <animatedpattern-n1></animatedpattern-n1>
    </div>`);function QM({width:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}function ZM({height:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}var hS=({canvas:e,amountOfPath:t,width:r,height:o,fill:n,stroke:s,opacity:i,spacerY:a,intialRotation:c,perpetualRatio:l,mouseMoveRatio:p,disableOffcanvas:d})=>{let{useOffscreen:f,context:h}=st({disableOffcanvas:d}),v=!0,b=e.getContext(h,{alpha:!0}),{left:T}=le(e),_=m.getActiveRoute(),{offscreen:S,offScreenCtx:C}=it({useOffscreen:f,canvas:e}),E=!1;e.width=e.clientWidth,e.height=e.clientHeight;let w=[...Array.from({length:t}).keys()].map((P,x)=>{let N=x,O=N<t/2?t-N:N,F=O-(t-O);return{width:Math.floor(QM({width:r,relativeIndex:F,amountOfPath:t})),height:Math.floor(ZM({height:o,relativeIndex:F,amountOfPath:t})),fill:n,stroke:s,opacity:F*i,rotate:0,y:0,relativeIndex:F,index:x}}),M=w.splice(0,w.length/2).concat(w.toReversed()),A=H.createSpring({data:{rotate:0,y:0},stagger:{each:5,from:"center"}});[...M].forEach(P=>{A.subscribeCache(P,({rotate:x})=>{P.rotate=x})});let R=({time:P=0})=>{if(!b)return;f&&S&&(S.width=e.width,S.height=e.height);let x=f?C:b;if(!x)return;let N=e.width/2,O=e.height/2;e.width=e.width,M.forEach(({width:F,height:B,opacity:Q,rotate:U,relativeIndex:J,index:q})=>{let oe=Math.sin(P/1e3)*l*J,te=q<t/2?oe+15*J/2:-oe-15*J/2,me=q<t/2?-1:1,Ee=1,ke=Math.PI/180*(U-c),Ne=Math.cos(ke)*Ee,Ue=Math.sin(ke)*Ee;x.setTransform(Ne,Ue,-Ue,Ne,N,O+B/2),E?(x.beginPath(),x.roundRect(-(F*me)/2,-B/2+te+a(q<t/2),F,B,[200,0])):(x.beginPath(),x.rect(-(F*me)/2,-B/2+te+a(q<t/2),F,B)),x.strokeStyle=`rgba(0, 0, 0, ${Q})`,x.fillStyle="rgba(238, 238, 238, 0)",x.stroke(),x.fill(),x.setTransform(1,0,0,1,0,0)}),at({useOffscreen:f,offscreen:S,ctx:b})},L=({time:P=0})=>{R({time:P}),v&&u.useNextFrame(({time:x})=>L({time:x}))};u.useFrame(({time:P})=>{L({time:P})});let D=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,T=le(e).left,u.useFrame(({time:P})=>{R({time:P})})}),$=({x:P})=>{let x=P-e.width/2-T;A.goTo({rotate:x/p}).catch(()=>{})},V=u.useMouseMove(({client:P})=>{let{x}=P;$({x})}),I=u.useTouchMove(({client:P})=>{let{x}=P;$({x})}),k=X.watch("navigationIsOpen",P=>{if(P){A?.pause(),v=!1;return}setTimeout(()=>{v=!0,A?.resume(),m.getActiveRoute().route===_.route&&u.useFrame(({time:N})=>L({time:N}))},500)});return()=>{A.destroy(),D(),V(),I(),k(),b=null,S=null,C=null,A=null,w=[],v=!1,M=null,h=null}};var fS=({onMount:e,setRef:t,getRef:r,getState:o,bindEffect:n,getProxi:s})=>{let i=s();return document.body.style.background=nt,e(()=>{let{canvas:a}=r(),c=hS({canvas:a,...o()});return u.useFrame(()=>{i.isMounted=!0}),()=>{c(),document.body.style.background=""}}),g`
        <div>
            <div class="c-canvas">
                <div
                    class="c-canvas__wrap"
                    ${n({toggleClass:{active:()=>i.isMounted}})}
                >
                    <canvas ${t("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var gS=m.createComponent({tag:"caterpillar-n0",component:fS,props:{nextRoute:()=>({value:"",type:String}),prevRoute:()=>({value:"",type:String}),amountOfPath:17,width:window.innerHeight/30,height:window.innerHeight/30,radius:0,fill:[-1],stroke:"#000",opacity:.05,spacerY:e=>e?300:-400,intialRotation:33,perpetualRatio:6,mouseMoveRatio:10,disableOffcanvas:()=>({value:!!(ot()||rt()),type:Boolean})},state:{isMounted:!1}});m.useComponent([gS]);var bS=()=>(ye({active:!0,prevRoute:"",nextRoute:"#caterpillarN1",backRoute:"#canvas-overview"}),ve("<strong>Canvas</strong>: spring animation"),g`<div class="l-padding">
        <caterpillar-n0></caterpillar-n0>
    </div>`);var yS=({canvas:e,numItems:t,width:r,height:o,fill:n,opacity:s,radius:i,rotationDuration:a,rotationEach:c,centerEach:l,disableOffcanvas:p})=>{let{useOffscreen:d,context:f}=st({disableOffcanvas:p}),h=!0,v=e.getContext(f,{alpha:!0}),{top:b,left:T}=le(e),_=m.getActiveRoute(),{offscreen:S,offScreenCtx:C}=it({useOffscreen:d,canvas:e}),E=!0;e.width=e.clientWidth,e.height=e.clientHeight;let w=[...Array.from({length:t}).keys()].map((x,N)=>{let O=N>=t/2?t/2+(t/2-N):N,F=n.includes(N)?1:O*s;return{width:O*r,height:O*o,x:0,y:0,hasFill:n.includes(N),opacity:F,radius:i,rotate:0,relativeIndex:O}}),M=H.createTimeTween({data:{rotate:0},stagger:{each:c,from:"center"},ease:"easeLinear",relative:!0});[...w].forEach(x=>{M.subscribeCache(x,({rotate:N})=>{x.rotate=N})});let A=H.createSpring({data:{x:0,y:0},stagger:{each:l,from:"end"}});[...w].forEach(x=>{A.subscribeCache(x,({x:N,y:O})=>{x.x=N,x.y=O})});let R=()=>{if(!v)return;d&&S&&(S.width=e.width,S.height=e.height);let x=d?C:v;x&&(e.width=e.width,w.forEach(({width:N,height:O,x:F,y:B,rotate:Q,hasFill:U,opacity:J},q)=>{let oe=w.length-q,te=e.width/2,me=e.height/2,Ee=1,ke=Math.PI/180*Q,Ne=Math.cos(ke)*Ee,Ue=Math.sin(ke)*Ee;x.setTransform(Ne,Ue,-Ue,Ne,te+F+oe*F/20,me+B+oe*B/20),E?(x.beginPath(),x.roundRect(Math.round(-N/2),Math.round(-O/2),N,O,[40,40])):(x.beginPath(),x.rect(Math.round(-N/2),Math.round(-O/2),N,O)),U?x.fillStyle="#000":(x.strokeStyle="#000",x.fillStyle=`rgba(238, 238, 238, ${J})`,x.stroke()),x.fill(),x.setTransform(1,0,0,1,0,0)}),at({useOffscreen:d,offscreen:S,ctx:v}))},L=Ce.createAsyncTimeline({repeat:-1,yoyo:!1,autoSet:!1});L.goTo(M,{rotate:360},{duration:a}),L.play();let D=()=>{R(),h&&u.useNextFrame(()=>D())};u.useFrame(()=>D());let $=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,b=le(e).top,T=le(e).left,R()}),V=({x,y:N})=>{let O=window.innerWidth,F=window.innerHeight,B=x-e.width/2-T,Q=N-e.height/2-b;A.goTo({x:fe.clamp(B,-O/2+400+T,O/2-400-T),y:fe.clamp(Q,-F/2+200+b,F/2-200-b)}).catch(()=>{})},I=u.useMouseMove(({client:x})=>{let{x:N,y:O}=x;V({x:N,y:O})}),k=u.useTouchMove(({client:x})=>{let{x:N,y:O}=x;V({x:N,y:O})}),P=X.watch("navigationIsOpen",x=>{if(x){h=!1,L?.pause(),M?.pause(),A?.pause();return}setTimeout(()=>{h=!0,m.getActiveRoute().route===_.route&&(L?.resume(),M?.resume(),A?.resume(),u.useFrame(()=>D()))},500)});return()=>{M.destroy(),A.destroy(),L.destroy(),$(),I(),k(),P(),M=null,A=null,L=null,v=null,S=null,C=null,h=!1,w=null,f=null}};var vS=({onMount:e,getState:t,getRef:r,setRef:o,bindEffect:n,getProxi:s})=>{let i=s();return document.body.style.background=nt,e(()=>{let{canvas:a}=r(),c=yS({canvas:a,...t()});return u.useFrame(()=>{i.isMounted=!0}),()=>{c(),document.body.style.background=""}}),g`
        <div>
            <div class="c-canvas">
                <div
                    class="c-canvas__wrap"
                    ${n({toggleClass:{active:()=>i.isMounted}})}
                >
                    <canvas ${o("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var TS=m.createComponent({tag:"caterpillar-n1",component:vS,props:{numItems:20,width:window.innerHeight/30,height:window.innerHeight/30,fill:[14],opacity:1,radius:0,rotationEach:15,centerEach:3,rotationDuration:5e3,disableOffcanvas:()=>({value:!!(ot()||rt()),type:Boolean})},state:{isMounted:!1}});m.useComponent([TS]);var SS=()=>(ye({active:!0,prevRoute:"#caterpillarN0",nextRoute:"#caterpillarN2",backRoute:"#canvas-overview"}),ve("<strong>Canvas</strong>: Spring & AnsyncTimeline"),g`<div class="l-padding">
        <caterpillar-n1></caterpillar-n1>
    </div>`);var op=({value:e,direction:t,isForced:r})=>{r||console.log(`current: ${e}, direction: ${t}`)},_S=({canvas:e,numItems:t,width:r,height:o,radius:n,fill:s,opacity:i,xAmplitude:a,yAmplitude:c,duration:l,friction:p,rotationDefault:d,disableOffcanvas:f})=>{let{useOffscreen:h,context:v}=st({disableOffcanvas:f}),b=!0,T=e.getContext(v,{alpha:!0}),_=d,S=m.getActiveRoute(),{offscreen:C,offScreenCtx:E}=it({useOffscreen:h,canvas:e}),w=!0,M=[...Array.from({length:t}).keys()].map((I,k)=>{let P=k>=t/2?t/2+(t/2-k):k,x=r+r/3*P,N=o+o/3*P,O=s.includes(k)?1:(t-k)*i;return{width:x,height:N,x:0,y:0,hasFill:s.includes(k),opacity:O,radius:n,rotate:0}});e.width=e.clientWidth,e.height=e.clientHeight;let A=H.createSequencer({stagger:{each:7},data:{x:l/4,rotate:0},duration:l}).goTo({x:l+l/4},{start:0,end:l,ease:"easeLinear"}).goTo({rotate:()=>-_},{start:0,end:5,ease:"easeInOutBack"}).goTo({rotate:0},{start:5,end:l,ease:"easeInOutBack"}).label("mylabel",2).add(({isForced:I,direction:k})=>{op({isForced:I,direction:k,value:1})},1).add(({isForced:I,direction:k})=>{op({isForced:I,direction:k,value:5})},5).add(({isForced:I,direction:k})=>{op({isForced:I,direction:k,value:9})},9);M.forEach(I=>{A.subscribeCache(I,({x:k,rotate:P})=>{let x=k/p,N=2/(3-Math.cos(2*x)),O=N*Math.cos(x)*a,F=N*Math.sin(2*x)/2*c;I.x=O,I.y=F,I.rotate=P})});let R=Ce.createSyncTimeline({repeat:-1,yoyo:!1,duration:4e3}).add(A);R.onLoopEnd(({loop:I,direction:k})=>{console.log(`loop end: ${I} , ${k}`)});let L=()=>{if(!T)return;h&&C&&(C.width=e.width,C.height=e.height);let I=h?E:T;I&&(e.width=e.width,M.forEach(({width:k,height:P,x,y:N,rotate:O,hasFill:F,opacity:B})=>{let Q=e.width/2,U=e.height/2,J=1,q=Math.PI/180*O,oe=Math.cos(q)*J,te=Math.sin(q)*J;I.setTransform(oe,te,-te,oe,Q+x,U+N),w?(I.beginPath(),I.roundRect(Math.round(-k/2),Math.round(-P/2),k,P,[40,40])):(I.beginPath(),I.rect(Math.round(-k/2),Math.round(-P/2),k,P)),F?I.fillStyle="#000000":(I.strokeStyle=`rgba(0, 0, 0, ${B})`,I.fillStyle="rgba(238, 238, 238, 0)",I.stroke()),I.fill(),I.setTransform(1,0,0,1,0,0)}),at({useOffscreen:h,offscreen:C,ctx:T}))},D=()=>{L(),b&&u.useNextFrame(()=>D())};u.useFrame(()=>D()),R.play();let $=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,L()}),V=X.watch("navigationIsOpen",I=>{if(I){b=!1,R?.pause();return}setTimeout(()=>{b=!0,m.getActiveRoute().route===S.route&&(R?.resume(),u.useFrame(()=>D()))},500)});return{destroy:()=>{b=!1,$(),V(),A.destroy(),A=null,R.destroy(),R=null,T=null,C=null,E=null,M=null,v=null},play:()=>{R.play()},playReverse:()=>{R.playReverse()},playUseCurrent:()=>{R.play({useCurrent:!0})},playReverseUseCurrent:()=>{R.playReverse({useCurrent:!0})},playFromLabel:()=>{R.playFrom("mylabel")},plaFromLabelReverse:()=>{R.playFromReverse("mylabel")},stop:()=>R.stop(),pause:()=>R.pause(),resume:()=>R.resume(),reverse:()=>R.reverse(),setRotation:I=>_=I}};function eR({buttons:e}){return Object.entries(e).map(([t,r])=>{let{label:o}=r;return g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn ${t}"
                >
                    ${o}
                </button>
            </li>`}).join("")}var xS=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s,delegateEvents:i})=>{let a=s();return document.body.style.background=nt,e(({element:c})=>{let{canvas:l,rangeValue:p,rotationButton:d}=o(),f=_S({canvas:l,...t()}),{destroy:h,setRotation:v}=f;return Object.entries(a.buttons).forEach(([b,T])=>{let{method:_}=T;c.querySelector(`.${b}`)?.addEventListener("click",()=>f?.[_]())}),d.addEventListener("change",()=>{let b=d.value;v(Number(b)),p.textContent=b}),u.useFrame(()=>{a.isMounted=!0}),()=>{document.body.style.background="",h()}}),g`
        <div>
            <div class="c-canvas">
                <div
                    class="c-canvas__wrap"
                    ${n({toggleClass:{active:()=>a.isMounted}})}
                >
                    <button
                        type="button"
                        class="c-canvas__controls__open"
                        ${i({click:()=>{a.controlsActive=!0}})}
                    >
                        show controls
                    </button>
                    <ul
                        class="c-canvas__controls"
                        ${n({toggleClass:{active:()=>a.controlsActive}})}
                    >
                        <button
                            type="button"
                            class="c-canvas__controls__close"
                            ${i({click:()=>{a.controlsActive=!1}})}
                        ></button>
                        ${eR({buttons:a.buttons})}
                        <li class="c-canvas__controls__item is-like-button">
                            <label class="c-canvas__controls__label">
                                deg:
                                <span
                                    class="js-range-value"
                                    ${r("rangeValue")}
                                    >${a.rotationDefault}</span
                                >
                            </label>
                            <div class="c-canvas__controls__range">
                                <input
                                    type="range"
                                    min="0"
                                    max="720"
                                    value="${a.rotationDefault}"
                                    step="1"
                                    ${r("rotationButton")}
                                />
                            </div>
                        </li>
                    </ul>
                    <canvas ${r("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var tR=10,rR={"js-CN2-play":{label:"play",method:"play"},"js-CN2-playReverse":{label:"play reverse",method:"playReverse"},"js-CN2-play-current":{label:"go forward if is backward",method:"playUseCurrent"},"js-CN2-playReverse-current":{label:"go backward if is forward",method:"playReverseUseCurrent"},"js-CN2-play-label":{label:"play from label",method:"playFromLabel"},"js-CN2-playReverse-label":{label:"play from label reverse",method:"plaFromLabelReverse"},"js-CN2-reverse":{label:"reverse",method:"reverse"},"js-CN2-stop":{label:"stop",method:"stop"},"js-CN2-pause":{label:"pause",method:"pause"},"js-CN2-resume":{label:"resume",method:"resume"}},CS=m.createComponent({tag:"caterpillar-n2",component:xS,props:{numItems:20,width:window.innerHeight/13,height:window.innerHeight/13,radius:0,fill:[2],opacity:.03,xAmplitude:500,yAmplitude:400,duration:10,rotationDefault:166,friction:tR/2/Math.PI,disableOffcanvas:()=>({value:!!(ot()||rt()),type:Boolean})},state:{isMounted:!1,controlsActive:()=>({value:!1,type:Boolean}),buttons:()=>({value:rR,type:"Any"})}});m.useComponent([CS]);var ES=()=>(ye({active:!0,prevRoute:"#caterpillarN1",nextRoute:"#async-timeline",backRoute:"#canvas-overview"}),ve("<strong>Canvas</strong>: Sequencer & SyncTimeline"),g`<div class="l-padding">
        <caterpillar-n2></caterpillar-n2>
    </div>`);var vc=()=>{m.useMethodByName(Zs).update(!0)},Tc=()=>{m.useMethodByName(Zs).update(!1)};var wS=({canvas:e,canvasScroller:t,numberOfRow:r,numberOfColumn:o,cellWidth:n,cellHeight:s,gutter:i,fill:a,stagger:c,reorder:l,disableOffcanvas:p})=>{let{useOffscreen:d,context:f}=st({disableOffcanvas:p}),h=!0,v=H.createMasterSequencer(),b=e.getContext(f,{alpha:!0}),T=m.getActiveRoute(),{offscreen:_,offScreenCtx:S}=it({useOffscreen:d,canvas:e}),C=d?S:b,E=Xn(C);C=null,e.width=e.clientWidth,e.height=e.clientHeight;let w=go({canvas:e,numberOfRow:r,numberOfColumn:o,cellWidth:n,cellHeight:s,gutter:i}).items,M=l?w.map((k,P)=>({...k,scale:0,rotate:0,hasFill:a.includes(P)})).toSorted(k=>k.hasFill?-1:1):w.map((k,P)=>({...k,scale:0,rotate:0,hasFill:a.includes(P)})),A=H.createStaggers({items:M,stagger:c}),R=A.map(({item:k,start:P,end:x})=>{let N=k.hasFill?1.1:1,O=H.createSequencer({data:{scale:0}}).goTo({scale:N},{start:P,end:x,ease:"easeInOutQuad"}),F=O.subscribe(({scale:B})=>{k.scale=B});return v.add(O),{sequencer:O,unsubscribe:F}}),L=()=>{if(!b)return;d&&_&&(_.width=e.width,_.height=e.height);let k=d?S:b;k&&(e.width=e.width,M.forEach(({x:P,y:x,width:N,height:O,rotate:F,scale:B,hasFill:Q,offsetXCenter:U,offsetYCenter:J})=>{let q=Math.PI/180*F,oe=Math.cos(q)*B,te=Math.sin(q)*B;k.setTransform(oe,te,-te,oe,Math.floor(U+P),Math.floor(J+x)),E?(k.beginPath(),k.roundRect(Math.floor(-N/2),Math.floor(-O/2),N,O,5)):(k.beginPath(),k.rect(Math.floor(-N/2),Math.floor(-O/2),N,O)),Q?(k.fillStyle="#000000",k.fill()):(k.strokeStyle="#000",k.fillStyle="rgb(238, 238, 238)",k.fill(),E||(k.strokeStyle="#ccc")),k.setTransform(1,0,0,1,0,0)}),at({useOffscreen:d,offscreen:_,ctx:b}))},D=ze.createScrollTrigger({trigger:t,propierties:"tween",tween:v,dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>ie(t)},reverse:!0,ease:!0,easeType:"lerp"});D.init();let $=()=>{L(),h&&u.useNextFrame(()=>$())};u.useFrame(()=>{$()});let V=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,M.forEach(k=>{let{width:P,height:x,gutter:N,numberOfColumn:O}=k;k.offsetXCenter=Uo({canvasWidth:e.width,width:P,gutter:N,numberOfColumn:O}),k.offsetYCenter=Go({canvasHeight:e.height,height:x,gutter:N,numberOfRow:r})}),u.useFrame(()=>L())}),I=X.watch("navigationIsOpen",k=>{if(k){h=!1;return}setTimeout(async()=>{h=!0,m.getActiveRoute().route===T.route&&u.useFrame(()=>$())},500)});return()=>{V(),I(),R.forEach(({sequencer:k,unsubscribe:P})=>{k.destroy(),P()}),R=[],v.destroy(),v=null,A=[],D.destroy(),D=null,b=null,_=null,S=null,w=[],h=!1,M=null,f=null}};var IS=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s})=>{let i=s();return document.body.style.background=nt,e(()=>{vc();let{canvas:a,canvasScroller:c}=o();window.scrollTo(0,0);let l=wS({canvas:a,canvasScroller:c,...t()});return u.useFrame(()=>{i.isMounted=!0}),()=>{l(),Tc(),document.body.style.background=""}}),g`
        <div>
            <div class="c-canvas c-canvas--fixed ">
                <div
                    class="c-canvas__wrap"
                    ${n({toggleClass:{active:()=>i.isMounted}})}
                >
                    <canvas ${r("canvas")}></canvas>
                </div>
            </div>
            <div class="c-canvas-scroller" ${r("canvasScroller")}></div>
        </div>
    `};var MS=m.createComponent({tag:"scroller-n0",component:IS,props:{numberOfRow:()=>({value:10,type:Number}),numberOfColumn:()=>({value:10,type:Number}),cellWidth:()=>({value:window.innerHeight/16,type:Number}),cellHeight:()=>({value:window.innerHeight/16,type:Number}),gutter:()=>({value:1,type:Number}),fill:()=>({value:[36,37,38,39,40,47,51,58,62,69,73,80,81,82,83,84],type:Array}),stagger:()=>({value:{type:"equal",each:6,from:"random"},type:"Any"}),reorder:()=>({value:!0,type:Boolean}),disableOffcanvas:()=>({value:!!(ot()||rt()),type:Boolean})},state:{isMounted:!1}});var np=[{animation:{},description:"<strong>Canvas</strong>: ScrollTrigger & createStagger v0",nav:{prevRoute:"#animatedPatternN1",nextRoute:"#scrollerN0?version=1&activeId=1",backRoute:"#canvas-overview"}},{description:"<strong>Canvas</strong>: ScrollTrigger & createStagger v1",animation:{stagger:{type:"end",each:1,from:{x:0,y:0},grid:{col:11,row:10,direction:"radial"}},reorder:!1},nav:{prevRoute:"#scrollerN0?version=0&activeId=0",nextRoute:"#scrollerN0?version=2&activeId=2",backRoute:"#canvas-overview"}},{description:"<strong>Canvas</strong>: ScrollTrigger & createStagger v2",animation:{stagger:{type:"equal",each:7,from:"center",grid:{col:11,row:10,direction:"col"}},reorder:!1},nav:{prevRoute:"#scrollerN0?version=1&activeId=1",nextRoute:"#scrollerN0?version=3&activeId=3",backRoute:"#canvas-overview"}},{description:"<strong>Canvas</strong>: ScrollTrigger & createStagger v3",animation:{stagger:{type:"equal",each:3,from:"end",grid:{col:11,row:10,direction:"row"}},reorder:!1},nav:{prevRoute:"#scrollerN0?version=2&activeId=2",nextRoute:"#scrollerN0?version=4&activeId=4",backRoute:"#canvas-overview"}},{description:"<strong>Canvas</strong>: ScrollTrigger & createStagger v4",animation:{stagger:{type:"equal",each:2,from:"end"},reorder:!1},nav:{prevRoute:"#scrollerN0?version=3&activeId=3",nextRoute:"#scrollerN1",backRoute:"#canvas-overview"}}];m.useComponent([MS]);var RS=({params:e})=>{let{version:t}=e,r=np[Math.max(0,Math.min(Number(t),np.length-1))];return r?(ye({active:!0,prevRoute:r.nav.prevRoute,nextRoute:r.nav.nextRoute,backRoute:r.nav.backRoute}),ve(r.description),g`<div>
        <scroller-n0
            ${m.staticProps({...r.animation})}
        ></scroller-n0>
    </div>`):""};function oR({width:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}function nR({height:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}var kS=({canvas:e,canvasScroller:t,amountOfPath:r,width:o,height:n,opacity:s,intialRotation:i,endRotation:a,disableOffcanvas:c})=>{let{useOffscreen:l,context:p}=st({disableOffcanvas:c}),d=!0,f=e.getContext(p,{alpha:!0}),h=m.getActiveRoute(),{offscreen:v,offScreenCtx:b}=it({useOffscreen:l,canvas:e}),T=!1;e.width=e.clientWidth,e.height=e.clientHeight;let _=[...Array.from({length:r}).keys()].map((R,L)=>{let D=L>=r/2?r/2+(r/2-L):L;return{width:Math.floor(oR({width:o,relativeIndex:D,amountOfPath:r})),height:Math.floor(nR({height:n,relativeIndex:D,amountOfPath:r})),opacity:D*s,rotate:0,relativeIndex:D,index:L}}),S=H.createScrollerTween({from:{rotate:0},to:{rotate:a},stagger:{each:5,from:"center"}});[..._].forEach(R=>{S.subscribeCache(R,({rotate:L})=>{R.rotate=L})});let C=()=>{if(!f)return;l&&v&&(v.width=e.width,v.height=e.height);let R=l?b:f;if(!R)return;let L=e.width/2,D=e.height/2;e.width=e.width,_.forEach(({width:$,height:V,opacity:I,rotate:k,index:P})=>{let x=_.length/2-P,N=1,O=Math.PI/180*(k-i),F=Math.cos(O)*N,B=Math.sin(O)*N;R.setTransform(F,B,-B,F,L,D+x*19),T?(R.beginPath(),R.roundRect(-$/2,-V/2+x*19,$,V,150)):(R.beginPath(),R.rect(Math.round(-$/2),Math.round(-V/2),$,V)),R.strokeStyle="#000",R.fillStyle=`rgba(238, 238, 238, ${I})`,R.stroke(),R.fill(),R.setTransform(1,0,0,1,0,0)}),at({useOffscreen:l,offscreen:v,ctx:f})},E=ze.createScrollTrigger({trigger:t,propierties:"tween",tween:S,dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>ie(t)},ease:!0,easeType:"spring"});E.init();let w=()=>{C(),d&&u.useNextFrame(()=>w())};u.useFrame(()=>{w()});let M=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,u.useFrame(()=>{C()})}),A=X.watch("navigationIsOpen",R=>{if(R){d=!1;return}setTimeout(()=>{d=!0,m.getActiveRoute().route===h.route&&u.useFrame(()=>w())},500)});return()=>{S.destroy(),M(),A(),S.destroy(),S=null,E.destroy(),E=null,f=null,v=null,b=null,S=null,d=!1,_=null,p=null}};var NS=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s})=>{let i=s();return document.body.style.background=nt,e(()=>{vc();let{canvas:a,canvasScroller:c}=o(),l=kS({canvas:a,canvasScroller:c,...t()});return u.useFrame(()=>{i.isMounted=!0}),()=>{l(),Tc(),document.body.style.background=""}}),g`
        <div>
            <div class="c-canvas c-canvas--fixed ">
                <div
                    class="c-canvas__wrap"
                    ${n({toggleClass:{active:()=>i.isMounted}})}
                >
                    <canvas ${r("canvas")}></canvas>
                </div>
            </div>
            <div class="c-canvas-scroller" ${r("canvasScroller")}></div>
        </div>
    `};var PS=m.createComponent({tag:"scroller-n1",component:NS,props:{amountOfPath:17,width:15,height:40,radius:0,opacity:.05,intialRotation:33,endRotation:720,disableOffcanvas:()=>({value:!!(ot()||rt()),type:Boolean})},state:{isMounted:!1}});m.useComponent([PS]);var AS=()=>(ye({active:!0,prevRoute:"#scrollerN0?version=4&activeId=4",nextRoute:"",backRoute:"#canvas-overview"}),ve("<strong>Canvas</strong>: ScrollTrigger"),g`<div class="l-padding">
        <scroller-n1></scroller-n1>
    </div>`);var OS=({getProxi:e,bindEffect:t})=>{let r=e();return g`
        <button
            type="button"
            class="c-dynamic-list-button"
            ${t({observe:"active",toggleClass:{active:()=>r.active}})}
        >
            ${r.label}
        </button>
    `};var Kn=m.createComponent({tag:"dynamic-list-button",component:OS,props:{label:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean})}});var Sc=[{key:"a",label:"A"},{key:"b",label:"B"},{key:"c",label:"C"},{key:"d",label:"D"}],$S=[{key:"f",label:"F"},{key:"b",label:"B"},{key:"e",label:"E"},{key:"c",label:"C"},{key:"b",label:"B"},{key:"a",label:"A"},{key:"g",label:"G"},{key:"h",label:"H"},{key:"d",label:"D"},{key:"b",label:"B"}],LS=[{key:"m",label:"M"},{key:"q",label:"Q"},{key:"z",label:"Z"},{key:"i",label:"I"},{key:"b",label:"B"},{key:"e",label:"E"},{key:"n",label:"N"},{key:"a",label:"A"},{key:"g",label:"G"},{key:"h",label:"H"},{key:"l",label:"L"},{key:"j",label:"J"},{key:"d",label:"D"}],DS=[{key:"h",label:"H"},{key:"f",label:"F"},{key:"a",label:"A"},{key:"d",label:"D"}],Qn=[[{key:4}],[{key:20},{key:10},{key:10},{key:6},{key:10},{key:10},{key:30}],[{key:3},{key:20},{key:5},{key:20},{key:5},{key:5},{key:5},{key:5},{key:60},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:10},{key:5}]];var sR=[{buttonLabel:"sample1",data:$S},{buttonLabel:"salmple2",data:LS},{buttonLabel:"sample3",data:DS},{buttonLabel:"Initial",data:Sc}],iR=[{label:"repeater with key",key:"key",clean:!1},{label:"repeater without key",key:"",clean:!1},{label:"repeater clear",key:"",clean:!0}];function aR({staticProps:e,delegateEvents:t,bindProps:r,proxi:o}){return sR.map((n,s)=>{let{data:i,buttonLabel:a}=n;return g`
                <dynamic-list-button
                    class="c-dynamic-list__top__button"
                    ${e({label:a})}
                    ${t({click:async()=>{o.data=i,o.activeSample=s,await m.tick()}})}
                    ${r(()=>({active:s===o.activeSample}))}
                ></dynamic-list-button>
            `}).join("")}function cR({bindProps:e,staticProps:t,proxi:r}){return iR.map((o,n)=>{let{key:s,clean:i,label:a}=o;return g`
                <dynamic-list-repeater
                    ${t({listId:n,key:s,clean:i,label:a})}
                    ${e(()=>({data:r.data,counter:r.counter}))}
                ></dynamic-list-repeater>
            `}).join("")}var FS=({updateState:e,staticProps:t,bindProps:r,delegateEvents:o,invalidate:n,bindText:s,getProxi:i})=>{let a=i();return g`
        <div class="c-dynamic-list">
            <div class="c-dynamic-list__header">
                <div class="c-dynamic-list__top">
                    ${aR({delegateEvents:o,staticProps:t,bindProps:r,proxi:a})}
                    <dynamic-list-button
                        class="c-dynamic-list__top__button"
                        ${t({label:"+ counter ( max: 10 )"})}
                        ${o({click:async()=>{e("counter",c=>c+1)}})}
                    ></dynamic-list-button>
                    <dynamic-list-button
                        class="c-dynamic-list__top__button"
                        ${t({label:"- counter: ( min 0 )"})}
                        ${o({click:async()=>{e("counter",c=>c>0?c-=1:c)}})}
                    ></dynamic-list-button>
                </div>
            </div>

            <!-- Invalidate -->
            <div class="c-dynamic-list__invalidate">
                <h4 class="c-dynamic-list__invalidate__title">
                    Invalidate component on counter mutation:
                </h4>
                <div class="c-dynamic-list__invalidate__wrap">
                    ${n({observe:()=>a.counter,render:()=>g`<div class="validate-test-wrapper">
                                <dynamic-list-card-inner
                                    ${r(()=>({key:`${a.counter}`}))}
                                ></dynamic-list-card-inner>
                            </div>`})}
                </div>
            </div>

            <div class="c-dynamic-list__counter">
                <h4>List counter</h4>
                <span>${s`${"counter"}`}</span>
            </div>

            <!-- Repeaters -->
            <div class="c-dynamic-list__container">
                <div class="c-dynamic-list__grid">
                    ${cR({bindProps:r,staticProps:t,proxi:a})}
                </div>
            </div>
        </div>
    `};function lR({staticProps:e,bindProps:t,delegateEvents:r,current:o,proxi:n}){return g`
        <div class="c-dynamic-list-repeater__item">
            <dynamic-list-card
                ${e({parentListId:n.listId})}
                ${t(()=>({counter:n.counter,label:o.value.label,index:o.index}))}
                ${r({click:()=>{console.log(o.value?.label,o.index)}})}
            >
                <dynamic-slotted-label
                    slot="card-label-slot"
                    ${t(()=>({label:`label: ${o.value.label} <br/> counter: ${n.counter}`}))}
                >
                </dynamic-slotted-label>
            </dynamic-list-card>
        </div>
    `}var BS=({staticProps:e,bindProps:t,delegateEvents:r,repeat:o,getProxi:n})=>{let s=n(),i=s.key.length>0?s.key:void 0;return g`
        <div class="c-dynamic-list-repeater">
            <h4 class="c-dynamic-list-repeater__title">${s.label}</h4>
            <div class="c-dynamic-list-repeater__list">
                ${o({observe:()=>s.data,clean:s.clean,key:i,afterUpdate:()=>{console.log("repeater updated")},render:({current:a})=>lR({staticProps:e,bindProps:t,delegateEvents:r,current:a,proxi:s})})}
            </div>
        </div>
    `};function uR(e){return[...Array.from({length:e}).keys()].map(t=>t+1)}var pR=({staticProps:e,delegateEvents:t,proxi:r})=>g`
        ${uR(r.counter).map(o=>g`
                    <div class="validate-test-wrapper">
                        <dynamic-list-card-inner
                            ${e({key:`${o}`})}
                            ${t({click:()=>{console.log("invalidate inside reepater click")}})}
                        >
                        </dynamic-list-card-inner>
                    </div>
                `).join("")}
    `,VS=({onMount:e,key:t,staticProps:r,bindProps:o,id:n,delegateEvents:s,invalidate:i,repeat:a,bindText:c,bindEffect:l,getProxi:p,computed:d})=>{let f=p(),h=0;d(()=>f.innerDataUnivoque,()=>f.innerData.filter((b,T,_)=>_.map(({key:S})=>S).indexOf(b.key)===T)),e(async()=>((async()=>(await m.tick(),f.isMounted=!0))(),()=>{}));let v=f.isFull?"is-full":"";return g`
        <div
            class="c-dynamic-card ${v}"
            ${l({toggleClass:{active:()=>f.isMounted,"is-selected":()=>f.isSelected}})}
        >
            <div class="c-dynamic-card__container">
                <p class="c-dynamic-card__title">card content</p>
                <dynamic-list-button
                    class="c-dynamic-card__button"
                    ${s({click:()=>{f.isSelected=!f.isSelected}})}
                    ${o(()=>({active:f.isSelected}))}
                >
                    Select
                </dynamic-list-button>
                <div class="id">id: ${n}</div>
                <div class="parentId">list index: ${f.parentListId}</div>
                <div class="index">${c`index: ${"index"}`}</div>
                <div class="label">${c`label: ${"label"}`}</div>
                <div class="counter">${c`counter: ${"counter"}`}</div>
                <div class="key">key: ${t.length>0?t:"no-key"}</div>
                <mobjs-slot name="card-label-slot"></mobjs-slot>
                <dynamic-list-empty>
                    <dynamic-list-counter
                        slot="empty-slot"
                        ${r({parentListId:f.parentListId})}
                        ${o(()=>({counter:f.counter}))}
                    />
                </dynamic-list-empty>

                <!-- Inner repeater -->
                <div class="c-dynamic-card__repeater-container">
                    <p><strong>Inner repeater:</strong></p>
                    <dynamic-list-button
                        class="c-dynamic-card__button"
                        ${s({click:async()=>{h=h<Qn.length-1?h+1:0,f.innerData=Qn[h],await m.tick()}})}
                    >
                        Update:
                    </dynamic-list-button>

                    <!-- repeater by key -->
                    <div class="c-dynamic-card__repeater">
                        ${a({observe:()=>f.innerDataUnivoque,key:"key",render:({current:b})=>g`<dynamic-list-card-inner
                                    ${o(()=>({key:`${b.value.key}`}))}
                                ></dynamic-list-card-inner>`})}
                    </div>

                    <!-- repeater no key -->
                    <div class="c-dynamic-card__repeater">
                        ${a({observe:()=>f.innerData,render:({current:b})=>g`<dynamic-list-card-inner
                                    ${o(()=>({key:`${b.value.key}`}))}
                                ></dynamic-list-card-inner>`})}
                    </div>
                </div>

                <!-- Invalidate -->
                <div class="c-dynamic-card__invalidate">
                    <p>
                        <strong
                            >Inner invalidate<br />
                            on counter mutation:</strong
                        >
                    </p>
                    <div class="c-dynamic-card__invalidate__wrap">
                        ${i({observe:()=>f.counter,render:()=>pR({delegateEvents:s,staticProps:r,proxi:f})})}
                    </div>
                </div>
            </div>
        </div>
    `};var WS=({bindText:e})=>g`<span class="dynamic-list-card-inner">
        <span>${e`${"key"}`}</span>
    </span>`;var _c=m.createComponent({tag:"dynamic-list-card-inner",component:WS,props:{key:()=>({value:"",type:String})}});var jS=({getState:e,bindText:t})=>{let{parentListId:r}=e();return g`<div class="dynamic-counter">
        <p class="c-dynamic-counter__title">Nested:</p>
        <p class="c-dynamic-counter__subtitle">(slotted)</p>
        <p class="c-dynamic-counter__list">list index: ${r}</p>
        <span>${t`${"counter"}`}</span>
    </div>`};var zS=m.createComponent({tag:"dynamic-list-counter",component:jS,props:{parentListId:()=>({value:-1,type:Number}),counter:()=>({value:0,type:Number})}});var HS=()=>g`<div class="c-dynamic-list-empty">
        <p>empty comp</p>
        <mobjs-slot name="empty-slot"></mobjs-slot>
    </div>`;var US=m.createComponent({tag:"dynamic-list-empty",component:HS});var GS=m.createComponent({tag:"dynamic-list-card",component:VS,props:{parentListId:()=>({value:-1,type:Number}),isFull:()=>({value:!1,type:Boolean}),label:()=>({value:"-",type:String}),index:()=>({value:-1,type:Number}),counter:()=>({value:1,type:Number})},state:{innerData:()=>({value:Qn[0],type:Array}),innerDataUnivoque:()=>({value:Qn[0],type:Array}),isSelected:()=>({value:!1,type:Boolean}),isMounted:()=>({value:!1,type:Boolean})},child:[zS,US,_c,Kn]});var qS=({bindText:e})=>g`<div class="c-dynamic-list-slotted-label">
        <p class="content">${e`slotted: ${"label"}`}</p>
    </div>`;var JS=m.createComponent({tag:"dynamic-slotted-label",component:qS,props:{label:()=>({value:"",type:String})}});var YS=m.createComponent({tag:"dynamic-list-repeater",component:BS,props:{data:()=>({value:[],type:Array}),key:()=>({value:"",type:String}),clean:()=>({value:!1,type:Boolean}),listId:()=>({value:-1,type:Number}),counter:()=>({value:-1,type:Number}),label:()=>({value:"",type:String})},child:[GS,JS]});var XS=m.createComponent({tag:"dynamic-list",component:FS,state:{counter:()=>({value:1,type:Number,validate:e=>e<=10&&e>=0,strict:!0}),data:()=>({value:Sc,type:Array}),activeSample:()=>({value:3,type:Number})},child:[Kn,YS,_c]});m.useComponent([XS]);var KS=()=>g` <dynamic-list> </dynamic-list> `;var QS=({refs:e})=>{let t=H.createTimeTween({data:{opacity:0,scale:.5},duration:2e3,ease:"easeOutQuart",stagger:{each:8,from:"end"}}),r=H.createTimeTween({data:{scale:1},duration:6e3,ease:"easeInOutQuad",stagger:{each:12,from:"end"}});e.forEach(i=>{t.subscribeCache(i,({scale:a,opacity:c})=>{i.style.scale=`${a}`,i.style.opacity=`${c}`}),r.subscribeCache(i,({scale:a})=>{i.style.scale=`${a}`})});let o=Ce.createAsyncTimeline({repeat:1,autoSet:!1}).goTo(t,{opacity:1,scale:1}),n=Ce.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(r,{scale:1.1}),s=X.watch("navigationIsOpen",i=>{if(i){o.isActive()&&o.pause(),n.isActive()&&n.pause();return}o.isActive()&&o.resume(),n.isActive()&&n.resume()});return{playIntro:()=>o?.play(),playSvg:()=>{n?.play()},destroy:()=>{s(),t.destroy(),t=null,o.destroy(),o=null,r.destroy(),r=null,n.destroy(),n=null}}};var mR=async({playIntro:e,playSvg:t})=>{await e(),t()},ZS=({onMount:e,getProxi:t})=>{let r=t(),{svg:o}=r;return e(({element:n})=>{let s=[...n.querySelectorAll('[ref="svg_group"]')],{destroy:i,playIntro:a,playSvg:c}=QS({refs:s});return setTimeout(()=>{mR({playIntro:a,playSvg:c})},500),()=>{i()}}),g`<div class="l-index">
        <div class="l-index__logo">${o}</div>
    </div>`};var e_=m.createComponent({tag:"home-component",component:ZS,props:{svg:()=>({value:"",type:String})},state:{isMounted:()=>({value:!1,type:Boolean})}});m.useComponent([e_]);var t_=async()=>{let{data:e}=await qe({source:"./asset/svg/ms_nord.svg?v=1.3"});return g`
        <home-component
            ${m.staticProps({svg:e})}
        ></home-component>
    `};var r_=[{state:"level1",maxItem:10,ref:"level1_counter",label_plus:"level1 +",label_minus:"level1 -"},{state:"level2",maxItem:10,ref:"level2_counter",label_plus:"level2 +",label_minus:"level2 -"},{state:"level3",maxItem:6,ref:"level3_counter",label_plus:"level3 +",label_minus:"level3 -"}];function dR(e){return Math.floor(Math.random()*e)}var xc=({delegateEvents:e,updateState:t,invalidate:r,proxi:o})=>g`
        ${r_.map(n=>g` <div class="matrioska__head__item">
                    <dynamic-list-button
                        class="matrioska__button"
                        ${e({click:async()=>{t(n.state,s=>s.slice(0,-1))}})}
                        >${n.label_minus}</dynamic-list-button
                    >
                    <dynamic-list-button
                        class="matrioska__button"
                        ${e({click:async()=>{t(n.state,s=>[...s,{key:dR(1e3),value:u.getUnivoqueId()}])}})}
                        >${n.label_plus}</dynamic-list-button
                    >
                    <div class="matrioska__head__counter">
                        ${r({observe:n.state,render:()=>{let s=o?.[n.state];return g`
                                    Number of items: ${s.length} ( max
                                    ${n.maxItem} )
                                `}})}
                    </div>
                </div>`).join("")}
        <div class="matrioska__head__cta-counter">
            <dynamic-list-button
                class="matrioska__button"
                ${e({click:()=>{t("counter",n=>n+1)}})}
                >Increment counter</dynamic-list-button
            >
        </div>
    `;var Zn=e=>{m.useMethodByName(e).toggleActive()};var o_=({repeat:e,staticProps:t,bindProps:r,delegateEvents:o,proxi:n})=>g`
        <div class="matrioska__level matrioska__level--3">
            ${e({observe:()=>n.level3,render:({current:s})=>{let i=u.getUnivoqueId(),a=u.getUnivoqueId();return g`
                        <div
                            class="matrioska__item-wrap matrioska__item-wrap--3"
                        >
                            <matrioska-item
                                class="matrioska-item--3"
                                name="${i}"
                                ${t({level:"level 3"})}
                                ${r(()=>({key:`${s.value.key}`,value:`${s.value.value}`,index:s.index,counter:n.counter}))}
                                ${o({click:()=>{Zn(i)}})}
                            >
                            </matrioska-item>
                            <matrioska-item
                                class="matrioska-item--3"
                                name="${a}"
                                ${t({level:"level 3"})}
                                ${r(()=>({key:`${s.value.key}`,value:`${s.value.value}`,index:s.index,counter:n.counter}))}
                                ${o({click:()=>{Zn(a)}})}
                            >
                            </matrioska-item>
                        </div>
                    `}})}
        </div>
    `;var n_=({repeat:e,staticProps:t,bindProps:r,delegateEvents:o,proxi:n})=>g`
        <div class="matrioska__level matrioska__level--2">
            ${e({observe:()=>n.level2,render:({current:s})=>g`
                        <div
                            class="matrioska__item-wrap matrioska__item-wrap--2"
                        >
                            <matrioska-item
                                class="matrioska-item--2"
                                ${t({level:"level 2"})}
                                ${r(()=>({key:`${s.value.key}`,value:`${s.value.value}`,index:s.index,counter:n.counter}))}
                            >
                                ${o_({repeat:e,staticProps:t,delegateEvents:o,bindProps:r,proxi:n})}
                            </matrioska-item>
                        </div>
                    `})}
        </div>
    `;var s_=({delegateEvents:e,updateState:t,repeat:r,staticProps:o,bindProps:n,invalidate:s,getProxi:i})=>{let a=i();return g`<div class="matrioska">
        <div class="matrioska__head">
            ${xc({delegateEvents:e,updateState:t,invalidate:s,proxi:a})}
        </div>
        <h4 class="matrioska__head__title">
            Nested repater like matrioska in same component.
            <span> First/Second/third level repeater without key. </span>
            <span> Third level use shuffle order. </span>
        </h4>
        <div class="matrioska__body">
            <div class="matrioska__level matrioska__level--1">
                ${r({observe:()=>a.level1,render:({current:c})=>g`
                            <div
                                class="matrioska__item-wrap matrioska__item-wrap--1"
                            >
                                <matrioska-item
                                    class="matrioska-item--1"
                                    ${o({level:"level 1"})}
                                    ${n(()=>({key:`${c.value.key}`,value:`${c.value.value}`,index:c.index,counter:a.counter}))}
                                >
                                    ${n_({repeat:r,staticProps:o,bindProps:n,delegateEvents:e,proxi:a})}
                                </matrioska-item>
                            </div>
                        `})}
            </div>
        </div>
    </div>`};var i_=({getProxi:e,bindText:t,id:r,bindEffect:o,addMethod:n})=>{let s=e();return n("toggleActive",()=>{s.active=!s.active}),g`<matrioska-item
        class="matrioska-item"
        ${o({toggleClass:{active:()=>s.active}})}
    >
        <div class="matrioska-item__info">
            <h4 class="matrioska-item__level">${s.level}:</h4>
            <h6 class="matrioska-item__key">
                ${t`key: <span>${"key"}</span>`}
            </h6>
            <h6 class="matrioska-item__key">
                ${t`index: <span>${"index"}</span>`}
            </h6>
            <h6 class="matrioska-item__value">
                ${t`Value: <span>${"value"}</span>`}
            </h6>
            <h6 class="matrioska-item__value">
                ${t`counter: <span>${"counter"}</span>`}
            </h6>
            <h6 class="matrioska-item__value">
                Component id: <span>${r}</span>
            </h6>
        </div>
        <div class="matrioska-item__child">
            <mobjs-slot></mobjs-slot>
        </div>
    </matrioska-item>`};var a_=m.createComponent({tag:"matrioska-item",component:i_,props:{level:()=>({value:"",type:String}),key:()=>({value:"",strict:!0,type:String}),index:()=>({value:0,strict:!0,type:Number}),value:()=>({value:"",type:String}),counter:()=>({value:-1,type:Number})},state:{active:()=>({value:!1,type:Boolean})},style:":host { display: block; } "});var c_=({staticProps:e,delegateEvents:t,invalidate:r,bindProps:o,proxi:n})=>g` <div class="matrioska__level matrioska__level--3">
        ${r({observe:"level3",render:()=>n.level3.map((s,i)=>{let a=u.getUnivoqueId(),c=u.getUnivoqueId();return g`
                            <div
                                class="matrioska__item-wrap matrioska__item-wrap--3"
                            >
                                <matrioska-item
                                    class="matrioska-item--3"
                                    name="${a}"
                                    ${e({level:"level 3",value:s.value,index:i,key:`${s.key}`})}
                                    ${o(()=>({counter:n.counter}))}
                                    ${t({click:()=>{Zn(a)}})}
                                >
                                </matrioska-item>
                                <matrioska-item
                                    class="matrioska-item--3"
                                    name="${c}"
                                    ${e({level:"level 3",index:i,value:s.value,key:`${s.key}`})}
                                    ${o(()=>({counter:n.counter}))}
                                    ${t({click:()=>{Zn(c)}})}
                                >
                                </matrioska-item>
                            </div>
                        `}).join("")})}
    </div>`;var l_=({staticProps:e,bindProps:t,delegateEvents:r,invalidate:o,proxi:n})=>g`
        <div class="matrioska__level matrioska__level--2">
            ${o({observe:()=>n.level2,render:()=>n.level2.map((s,i)=>g`
                                <div
                                    class="matrioska__item-wrap matrioska__item-wrap--2"
                                >
                                    <matrioska-item
                                        class="matrioska-item--2"
                                        ${e({level:"level 2",index:i,key:`${s.key}`,value:`${s.value}`})}
                                        ${t(()=>({counter:n.counter}))}
                                    >
                                        ${c_({staticProps:e,delegateEvents:r,invalidate:o,bindProps:t,proxi:n})}
                                    </matrioska-item>
                                </div>
                            `).join("")})}
        </div>
    `;var u_=({delegateEvents:e,updateState:t,staticProps:r,bindProps:o,invalidate:n,getProxi:s})=>{let i=s();return g`<div class="matrioska">
        <div class="matrioska__head">
            ${xc({delegateEvents:e,updateState:t,invalidate:n,proxi:i})}
        </div>
        <h4 class="matrioska__head__title">
            Nested invalidate like matrioska in same component.
        </h4>
        <div class="matrioska__body">
            <div class="matrioska__level matrioska__level--1">
                ${n({observe:"level1",render:()=>i.level1.map((a,c)=>g`
                                    <div
                                        class="matrioska__item-wrap matrioska__item-wrap--1"
                                    >
                                        <matrioska-item
                                            class="matrioska-item--1"
                                            ${r({level:"level 1",key:`${a.key}`,index:c,value:`${a.value}`})}
                                            ${o(()=>({counter:i.counter}))}
                                        >
                                            ${l_({staticProps:r,bindProps:o,delegateEvents:e,invalidate:n,proxi:i})}
                                        </matrioska-item>
                                    </div>
                                `).join("")})}
            </div>
        </div>
    </div>`};var hR=e=>{for(let t=e.length-1;t>0;t--){let r=Math.floor(Math.random()*(t+1));[e[t],e[r]]=[e[r],e[t]]}return e},p_={state:{level1:()=>({value:[{key:1,value:u.getUnivoqueId()}],type:Array,validate:e=>e.length<=10,strict:!0}),level2:()=>({value:[{key:1,value:u.getUnivoqueId()},{key:2,value:u.getUnivoqueId()}],type:Array,validate:e=>e.length<=10,strict:!0}),level3:()=>({value:[{key:1,value:u.getUnivoqueId()},{key:2,value:u.getUnivoqueId()}],type:Array,transform:(e,t)=>e>t?hR(e):e,validate:e=>e.length<=6,strict:!0}),counter:()=>({value:0,type:Number})},child:[Kn,a_]},m_=m.createComponent({tag:"page-matrioska-repeat",component:s_,...p_}),d_=m.createComponent({tag:"page-matrioska-invalidate",component:u_,...p_});m.useComponent([m_,d_]);var h_=()=>g` <page-matrioska-repeat> </page-matrioska-repeat> `,f_=()=>g` <page-matrioska-invalidate> </page-matrioska-invalidate> `;var sp=0,fR=({indicators:e,proxi:t})=>[...e].map((r,o)=>ze.createScrollTrigger({item:r,pin:!0,animateAtStart:!1,animatePin:!0,useThrottle:!0,ease:!1,dynamicStart:{position:"right",value:()=>window.innerWidth+sp-De(r)*(o+1)},dynamicEnd:{position:"right",value:()=>{let n=e.length-(o-2);return window.innerWidth/10*9*n}},onEnter:()=>{t.currentIdFromScroll=o},onLeaveBack:()=>{t.currentIdFromScroll=o-1}})),g_=({pins:e})=>{e.forEach(t=>t.refresh())},gR=({titles:e})=>[...e].map(t=>ze.createParallax({item:t,propierties:"x",reverse:!0,range:9})),b_=({nav:e})=>{e.classList.add("active"),[...document.querySelectorAll(".js-indicator")].forEach(r=>{r.classList.add("active")})},y_=({nav:e})=>{e.classList.remove("active"),[...document.querySelectorAll(".js-indicator")].forEach(r=>{r.classList.remove("active")})},v_=({indicators:e,titles:t,nav:r,animatePin:o,proxi:n,rootRef:s})=>{let i=fR({indicators:e,proxi:n}),a=gR({titles:t}),c=document.querySelector(".l-navcontainer__side");sp=De(c)/2;let l=u.useResize(()=>{sp=De(c)/2}),p=new qs({root:s,container:".js-container",row:".js-row",column:".js-column",trigger:".js-trigger",shadowClass:".shadowClass",useWillChange:!0,useDrag:!0,useSticky:!o,useThrottle:!0,animateAtStart:!1,ease:!1,easeType:"lerp",addCss:!0,columnHeight:70,columnWidth:100,columnAlign:"center",animatePin:o,breakpoint:"tablet",children:[...i,...a],onEnter:()=>{g_({pins:i}),b_({nav:r})},onEnterBack:()=>{g_({pins:i}),b_({nav:r})},onLeave:()=>{y_({nav:r})},onLeaveBack:()=>{y_({nav:r})}});return p.init(),{destroy:()=>{i.forEach(d=>{d?.destroy()}),i=[],a.forEach(d=>{d?.destroy()}),a=[],p.destroy(),p=null,l()},refresh:()=>p.refresh()}};var bR=(e,t)=>e===0?1:e===t-1?-1:0,yR=({numOfCol:e,pinIsVisible:t,staticProps:r})=>{let o=t?"":"hidden";return[...Array.from({length:e}).keys()].map((n,s)=>g`
                <horizontal-scroller-section
                    ${r({id:s,pinClass:o})}
                ></horizontal-scroller-section>
            `).join("")},vR=({numOfCol:e,proxi:t,staticProps:r,delegateEvents:o})=>[...Array.from({length:e}).keys()].map((n,s)=>g`
                <horizontal-scroller-button
                    ${r({id:s})}
                    ${o({click:()=>t.currentId=s})}
                ></horizontal-scroller-button>
            `).join(""),T_=({onMount:e,watch:t,staticProps:r,delegateEvents:o,setRef:n,getRef:s,getProxi:i})=>{let a=i();return e(({element:c})=>{if(fe.mq("max","desktop"))return;let l=10,p=[...c.querySelectorAll(".js-indicator")],d=c.querySelector(".js-nav"),f=[...c.querySelectorAll(".js-title h1")],{destroy:h}=v_({rootRef:s().js_root,indicators:p,titles:f,nav:d,animatePin:a.animatePin,proxi:a});return window.scrollTo(0,0),t(()=>a.currentId,(v,b)=>{let T=c.querySelector(`.shadowClass--section-${v} .shadowClass--in-center`),{top:_}=le(T),S=ie(T),C=Number.parseInt(v)===0?window.innerHeight+1:_+S-window.innerHeight,E=Math.max(1,Math.abs(v-b)),w=2e3,A=1+(l-E)/l*.9,R=E/l*w*A;Or.to(C+bR(v,l),{duration:R})}),()=>{h()}}),fe.mq("max","desktop")?g`<div><only-desktop></only-desktop></div>`:g`<div class="l-h-scroller">
        <only-desktop></only-desktop>
        <div class="l-h-scroller__top">scroll down</div>
        <ul class="l-h-scroller__nav js-nav" ${n("js_nav")}>
            ${vR({numOfCol:10,proxi:a,staticProps:r,delegateEvents:o})}
        </ul>
        <div class="l-h-scroller__root js-root" ${n("js_root")}>
            <div
                class="l-h-scroller__container js-container"
                ${n("js_container")}
            >
                <div class="l-h-scroller__row js-row" ${n("js_root")}>
                    ${yR({numOfCol:10,pinIsVisible:!a.animatePin,staticProps:r})}
                </div>
                <div
                    class="l-h-scroller__trigger js-trigger"
                    ${n("js_trigger")}
                ></div>
            </div>
        </div>
        <div class="l-h-scroller__bottom">scroll up</div>
    </div>`};var S_=({getProxi:e})=>{let t=e();return g`
        <li>
            <button
                type="button"
                data-id="${t.id}"
                class="l-h-scroller__nav__btn"
            >
                ${t.id}
            </button>
        </li>
    `};var __=m.createComponent({tag:"horizontal-scroller-button",component:S_,props:{id:()=>({value:-1,type:Number})}});var x_=({getState:e})=>{let{id:t,pinClass:r}=e();return g`
        <section
            class="l-h-scroller__column js-column"
            data-shadow="section-${t}"
        >
            <div class="l-h-scroller__wrap">
                <span class="l-h-scroller__indicator js-indicator ${r}">
                    <span></span>
                </span>
                <div class="l-h-scroller__title js-title">
                    <h1>${t}</h1>
                </div>
            </div>
        </section>
    `};var C_=m.createComponent({tag:"horizontal-scroller-section",component:x_,props:{id:()=>({value:-1,type:Number}),pinClass:()=>({value:"",type:String})}});var E_=m.createComponent({tag:"horizontal-scroller",component:T_,props:{animatePin:()=>({value:!1,type:Boolean})},state:{currentId:()=>({value:0,type:Number,skipEqual:!1}),currentIdFromScroll:()=>({value:0,type:Number})},child:[__,C_]});m.useComponent([E_]);var w_=async()=>(ye({active:!0,prevRoute:"",nextRoute:"",backRoute:""}),g`<div>
        <horizontal-scroller
            ${m.staticProps({animatePin:!1})}
        ></horizontal-scroller>
    </div>`);var I_=({getState:e})=>{let{fill:t}=e();return g`
        <svg
            viewBox="0 0 105.83333 105.83334"
            version="1.1"
            id="svg1713"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:svg="http://www.w3.org/2000/svg"
            fill=${t}
        >
            <path
                d="M 314.66331,372.25958 93.889916,264.46734 -120.06656,385.22612 -85.772782,141.94851 -266.73739,-24.219674 -24.76928,-66.781266 77.344916,-290.23763 192.59565,-73.264538 436.67031,-45.199981 265.93107,131.45836 Z"
                transform="matrix(0.13816225,0,0,0.13816225,41.19189,46.490067)"
            />
        </svg>
    `};var M_=m.createComponent({tag:"svg-star",component:I_,props:{fill:()=>({value:"#000000",type:String})}});var TR=({delegateEvents:e,bindEffect:t,bindObject:r,proxi:o})=>g`<div
        class="c-move3d-page__controls"
        ${t({toggleClass:{active:()=>o.controlsActive}})}
    >
        <button
            type="button"
            class="c-canvas__controls__close"
            ${e({click:()=>{o.controlsActive=!1}})}
        ></button>
        <div class="c-move3d-page__controls__block">
            <div class="c-move3d-page__controls__range">
                <input
                    type="range"
                    value=${o.factor}
                    ${e({input:n=>{let s=n.target.value??0;o.factor=Number(s)}})}
                />
            </div>
            <div>${r`factor: ${()=>o.factor}`}</div>
        </div>
        <div class="c-move3d-page__controls__block">
            <div class="c-move3d-page__controls__range">
                <input
                    type="range"
                    value=${o.xDepth}
                    ${e({input:n=>{let s=n.target.value??0;o.xDepth=Number(s)}})}
                />
            </div>
            <div>${r`xDepth: ${()=>o.xDepth}`}</div>
        </div>
        <div class="c-move3d-page__controls__block">
            <div class="c-move3d-page__controls__range">
                <input
                    type="range"
                    value=${o.xLimit}
                    max=${o.xLimit}
                    ${e({input:n=>{let s=n.target.value??0;o.xLimit=Number(s)}})}
                />
            </div>
            <div>${r`xLimit: ${()=>o.xLimit}`}</div>
        </div>
        <div class="c-move3d-page__controls__block">
            <div class="c-move3d-page__controls__range">
                <input
                    type="range"
                    value=${o.yDepth}
                    ${e({input:n=>{let s=n.target.value??0;o.yDepth=Number(s)}})}
                />
            </div>
            <div>${r`yDepth: ${()=>o.yDepth}`}</div>
        </div>
        <div class="c-move3d-page__controls__block">
            <div class="c-move3d-page__controls__range">
                <input
                    type="range"
                    value=${o.yLimit}
                    max=${o.yLimit}
                    ${e({input:n=>{let s=n.target.value??0;o.yLimit=Number(s)}})}
                />
            </div>
            <div>${r`yLimit: ${()=>o.yLimit}`}</div>
        </div>
        <div class="c-move3d-page__controls__block">
            <button
                type="button"
                class="c-move3d-page__controls__button"
                ${e({click:()=>{o.debug=!o.debug}})}
            >
                Toggle Debug
            </button>
        </div>
    </div>`,R_=({bindProps:e,delegateEvents:t,bindObject:r,getProxi:o,bindEffect:n})=>{let s=o();return g`<div>
        <button
            type="button"
            class="c-move3d-page__controls__open"
            ${t({click:()=>{s.controlsActive=!0}})}
        >
            show controls
        </button>
        ${TR({delegateEvents:t,bindEffect:n,bindObject:r,proxi:s})}
        <move-3d
            ${e(()=>({shape:s.data,xDepth:s.xDepth,yDepth:s.yDepth,xLimit:s.xLimit,yLimit:s.yLimit,factor:s.factor,debug:s.debug}))}
        ></move-3d>
    </div>`};var SR=({debug:e,id:t})=>e?g`<span class="c-move3d-item__debug">${t}</span>`:"",ip=({data:e,root:t,childrenId:r,debug:o})=>e.map(({children:n,props:s})=>g`<move-3d-item
                name="${r}"
                ${m.staticProps({root:t,...s})}
            >
                ${SR({debug:o,id:s.id})}
                ${ip({data:n??[],root:!1,childrenId:r,debug:o})}
            </move-3d-item>`).join("");var ap=({element:e})=>({height:ie(e),width:De(e),offSetLeft:le(e).left,offSetTop:le(e).top}),k_=({childrenId:e})=>m.useMethodArrayByName(e).map(r=>o=>r?.move?.(o)),N_=({ratio:e})=>({get3dItemUnit:t=>`min(${t}px, calc((((100vw) * ${t}) / ${e} )))`});var es=()=>{},P_=({onMount:e,setRef:t,getRef:r,watch:o,computed:n,invalidate:s,getProxi:i,bindEffect:a})=>{let c=u.getUnivoqueId(),l=i(),p=0,d=0,f=0,h=0,v=0,b=0,T=0,_=0,S=!1,C=!1,E={x:0,y:0},w=0,M=es,A=es,R=es,L=es,D=es,$=es,V=[],I=H.createSpring({data:{delta:0,ax:0,ay:0}}),k=()=>{S=!1},P=()=>{let{vw:B,vh:Q}=l.centerToViewoport||l.drag?{vw:window.innerWidth,vh:window.innerHeight}:{vw:d,vh:p},U=E.x,J=E.y,{xgap:q,ygap:oe}=S?C?(C=!1,{xgap:0,ygap:0}):{xgap:U-v,ygap:J-T}:{xgap:0,ygap:0};S&&(b+=q,_+=oe);let{xInMotion:te,yInMotion:me}=S?{xInMotion:b,yInMotion:_}:{xInMotion:U,yInMotion:J},{ax:Ee,ay:ke}=l.centerToViewoport||l.drag?{ax:-(B/2-te)/l.xDepth,ay:(Q/2-me)/l.yDepth}:{ax:-(B/2-(te-f))/l.xDepth,ay:(Q/2-(me-h))/l.yDepth};v=U,T=J;let Ne=Ee>l.xLimit||Ee<-l.xLimit,Ue=ke>l.yLimit||ke<-l.yLimit;Ne&&(b-=q),Ue&&(_-=oe);let St=fe.clamp(Ee,-l.xLimit,l.xLimit),yo=fe.clamp(ke,-l.yLimit,l.yLimit),cs=Math.sqrt(Math.pow(Math.abs(yo),2)+Math.pow(Math.abs(St),2));I.goTo({delta:cs,ax:St,ay:yo}).catch(()=>{}),V.forEach(Ct=>{Ct({delta:cs,factor:l.factor})})},x=B=>{w!==B&&(E.y-=w,w=B,E.y+=w),P()},N=({page:B})=>B.y>h&&B.y<h+p&&B.x>f&&B.x<f+d,O=({page:B})=>{N({page:B})&&(S=!0,C=!0)},F=()=>{$(),$=l.useScroll?u.useScroll(({scrollY:B})=>{x(B)}):()=>{}};return e(({element:B})=>{let{container:Q}=r();l.afterInit(B);let U=I.subscribe(({delta:te,ax:me,ay:Ee})=>{Q.style.transform=`translate3D(0,0,0) rotateY(${me}deg) rotateX(${Ee}deg)`,l.onUpdate({delta:te,deltaX:me,deltaY:Ee})}),J=I.onComplete(({ax:te,ay:me})=>{Q.style.transform=`rotateY(${te}deg) rotateX(${me}deg)`}),q=u.useMouseMove(({page:te})=>{E={x:te.x,y:te.y},P()}),oe=u.useResize(()=>{({height:p,width:d,offSetTop:h,offSetLeft:f}=ap({element:B}))});return o(()=>l.drag,te=>{if(D(),L(),R(),A(),M(),te){b=window.innerWidth/2,_=window.innerHeight/2,M=u.useTouchStart(({page:me})=>{O({page:me})}),A=u.useTouchEnd(()=>{k()}),R=u.useMouseDown(({page:me})=>{O({page:me})}),L=u.useMouseUp(()=>{k()}),D=u.useTouchMove(({page:me})=>{E={x:me.x,y:me.y},P()});return}},{immediate:!0}),o(()=>l.useScroll,(te,me)=>{if(te){F();return}te!==me&&$()}),n(()=>l.useScroll,()=>!l.drag&&!l.centerToViewoport),u.useNextLoop(()=>{({height:p,width:d,offSetTop:h,offSetLeft:f}=ap({element:B})),E={x:window.innerWidth/2,y:window.innerHeight/2},P()}),()=>{U(),J(),oe(),q(),$(),M(),A(),R(),L(),D(),I.destroy(),V=[],I=null,p=null,d=null,f=null,h=null,v=null,b=null,T=null,_=null,S=null,C=null,E=null,w=null}}),g`<div
        class="c-move-3d"
        ${a({toggleClass:{"move3D--drag":()=>l.drag}})}
    >
        <div
            class="c-move-3d__scene"
            ${a({toggleStyle:{perspective:()=>`${l.perspective}px`}})}
        >
            <div class="c-move-3d__container" ${t("container")}>
                ${s({observe:[()=>l.shape,()=>l.debug],afterUpdate:()=>{V=k_({childrenId:c})},render:()=>ip({data:l.shape,root:!0,childrenId:c,debug:l.debug})})}
            </div>
        </div>
    </div>`};var cp=({startRotation:e,range:t,delta:r,limit:o})=>Number.parseFloat((t*r/o-e).toFixed(2)),A_=({rotate:e,anchorPoint:t,baseRotateX:r,baseRotateY:o})=>{if(!e||!t)return{rotateX:0,rotateY:0};switch(e.toUpperCase()){case"X":return(()=>{switch(t.toUpperCase()){case"BOTTOM":return{rotateX:r,rotateY:0};case"TOP":return{rotateX:-r,rotateY:0};default:return{rotateX:0,rotateY:0}}})();case"Y":return(()=>{switch(t.toUpperCase()){case"LEFT":return{rotateX:0,rotateY:o};case"RIGHT":return{rotateX:0,rotateY:-o};default:return{rotateX:0,rotateY:0}}})();case"XY":return(()=>{switch(t.toUpperCase()){case"TOP-LEFT":return{rotateX:-r,rotateY:o};case"TOP-RIGHT":return{rotateX:-r,rotateY:-o};case"BOTTOM-LEFT":return{rotateX:r,rotateY:o};case"BOTTOM-RIGHT":return{rotateX:r,rotateY:-o};default:return{rotateX:0,rotateY:0}}})();default:return{rotateX:0,rotateY:0}}};var _R=e=>e?.tagName.length===0?"":g`
        <div class="c-move3d-item__component ${e?.className}">
            <${e.tagName} ${m.staticProps(e?.props??{})}>
            </${e.tagName}>
        </div>`,xR=({delta:e,factor:t,initialRotate:r,depth:o,range:n,rotate:s,anchorPoint:i,lerp:a})=>{let c=Math.round(o*e/t),l={startRotation:r??0,range:n??20,delta:e,limit:t},p=cp(l),d=cp(l),f={rotate:s??"center",anchorPoint:i,baseRotateX:p,baseRotateY:d},{rotateX:h,rotateY:v}=A_(f);a.goTo({depth:c,rotateX:h,rotateY:v}).catch(()=>{})},O_=({getState:e,addMethod:t,onMount:r})=>{let{root:o,anchorPoint:n,animate:s,depth:i,rotate:a,width:c,height:l,offsetX:p,offsetY:d,range:f,initialRotate:h,initialDepth:v,classList:b,component:T}=e(),_=o?"is-root":"is-children",S=`--item-width:${c};`,C=`--item-height:${l};`,E=`--offset-x:${p};`,w=`--offset-y:${d};`,M=H.createLerp({data:{depth:0,rotateX:0,rotateY:0}});return t("move",({delta:A,factor:R})=>{s&&xR({delta:A,factor:R,initialRotate:h,depth:i,range:f,rotate:a,anchorPoint:n,lerp:M})}),r(({element:A})=>{let R=M.subscribe(({depth:$,rotateX:V,rotateY:I})=>{let k=$+v;A.style.transform=`translate3D(0,0,${k}px) rotateX(${V}deg) rotateY(${I}deg)`}),L=M.onComplete(({depth:$,rotateX:V,rotateY:I})=>{let k=$+v;A.style.transform=`translateZ(${k}px) rotateX(${V}deg) rotateY(${I}deg)`}),D=v;return A.style.transform=`translateZ(${D}px)`,()=>{R(),L(),M.destroy(),M=null}}),g`<div
        class="c-move3d-item ${_} anchor-${n}"
        style="${S}${C}${E}${w}"
    >
        <div class="c-move3d-item__content ${b}"></div>
        ${_R({tagName:T?.tagName??"",className:T?.className??"",props:T?.props??{}})}
        <mobjs-slot></mobjs-slot>
    </div>`};var $_=m.createComponent({tag:"move-3d-item",component:O_,props:{root:()=>({value:!0,type:Boolean}),depth:()=>({value:0,type:Number}),rotate:()=>({value:"x",type:String}),width:()=>({value:"0px",type:String}),height:()=>({value:"0px",type:String}),offsetX:()=>({value:"0px",type:String}),offsetY:()=>({value:"0px",type:String}),range:()=>({value:20,type:Number}),anchorPoint:()=>({value:"center",type:String}),animate:()=>({value:!0,type:Boolean}),initialRotate:()=>({value:0,type:Number}),initialDepth:()=>({value:0,type:Number}),classList:()=>({value:"",type:String}),component:{tagName:()=>({value:"",type:String}),className:()=>({value:"",type:String}),props:()=>({value:"",type:"any"})}},state:{id:()=>({value:"",type:String})}});var ts=m.createComponent({tag:"move-3d",component:P_,props:{drag:()=>({value:!1,type:Boolean}),centerToViewoport:()=>({value:!1,type:Boolean}),perspective:()=>({value:700,type:Number}),xDepth:()=>({value:20,type:Number,validate:e=>e>1,strict:!0}),yDepth:()=>({value:20,type:Number,validate:e=>e>1,strict:!0}),xLimit:()=>({value:1e4,type:Number}),yLimit:()=>({value:1e4,type:Number}),factor:()=>({value:45,type:Number,validate:e=>e>1,strict:!0}),shape:()=>({value:[],type:Array}),debug:()=>({value:!1,type:Boolean}),afterInit:()=>({value:()=>{},type:Function}),onUpdate:()=>({value:()=>{},type:Function})},state:{useScroll:()=>({value:!0,type:Boolean})},child:[$_]});var L_=m.createComponent({tag:"move-3d-page",component:R_,props:{data:()=>({value:[],type:Array})},state:{xDepth:()=>({value:20,type:Number}),yDepth:()=>({value:20,type:Number}),xLimit:()=>({value:1e3,type:Number}),yLimit:()=>({value:1e3,type:Number}),perspective:()=>({value:700,type:Number}),debug:()=>({value:!1,type:Boolean}),factor:()=>({value:45,type:Number,validate:e=>e>1,strict:!0}),controlsActive:()=>({value:!1,type:Boolean})},child:[ts]});m.useComponent([L_,M_]);var D_=async({props:e})=>{let{data:t,prevRoute:r,nextRoute:o}=e;return ye({active:!0,prevRoute:r,nextRoute:o,backRoute:"#plugin-overview"}),ve("<strong>Move#d:</strong> css && js 3d shape"),g`<move-3d-page
        ${m.staticProps({data:t})}
    ></move-3d-page> `};var{get3dItemUnit:z}=N_({ratio:1980}),F_=[{props:{id:0,depth:0,anchorPoint:"center",classList:"move3d-square",animate:!0,width:z(150),height:z(150)},children:[{props:{id:1,depth:200,width:z(150),height:z(150),rotate:"",anchorPoint:"center",initialDepth:100,classList:"move3d-square has-star pippo",component:{tagName:"svg-star",className:"move3d-square__star",props:{fill:"#f28f3b"}},animate:!0},children:[]},{props:{id:2,depth:200,width:z(80),height:z(80),offsetX:z(40),offsetY:z(40),rotate:"",initialDepth:200,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:3,depth:200,width:z(80),height:z(80),offsetX:z(-10),offsetY:z(80),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:4,depth:200,width:z(80),height:z(80),offsetX:z(80),offsetY:z(80),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:5,depth:200,width:z(80),height:z(80),offsetX:z(-10),offsetY:z(-10),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:6,depth:200,width:z(80),height:z(80),offsetX:z(80),offsetY:z(-10),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:7,depth:100,width:z(150),height:z(150),rotate:"x",range:20,anchorPoint:"bottom",classList:"move3d-square",animate:!0},children:[{props:{id:8,depth:0,width:z(150),height:z(150),rotate:"x",range:30,anchorPoint:"bottom",classList:"move3d-square",animate:!0},children:[]}]},{props:{id:9,depth:100,width:z(150),height:z(150),rotate:"x",range:20,anchorPoint:"top",classList:"move3d-square",animate:!0},children:[{props:{id:10,depth:0,width:z(150),height:z(150),rotate:"x",range:20,anchorPoint:"top",classList:"move3d-square",animate:!0},children:[]}]},{props:{id:11,depth:100,width:z(150),height:z(150),rotate:"y",range:20,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[{props:{id:12,depth:0,width:z(150),height:z(150),rotate:"y",range:30,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[{props:{id:13,depth:0,width:z(150),height:z(150),rotate:"y",range:40,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[]}]}]},{props:{id:13,depth:100,width:z(150),height:z(150),rotate:"y",range:20,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[{props:{id:14,depth:0,width:z(150),height:z(150),rotate:"y",range:30,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[{props:{id:15,depth:0,width:z(150),height:z(150),rotate:"y",range:40,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[]}]}]},{props:{id:16,depth:150,rotate:"xy",width:z(150),height:z(150),offsetX:z(20),offsetY:z(20),range:20,anchorPoint:"bottom-left",classList:"move3d-square",animate:!0},children:[{props:{id:17,depth:100,rotate:"",width:z(150),height:z(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:18,depth:150,rotate:"xy",width:z(150),height:z(150),offsetX:z(20),offsetY:z(20),range:20,anchorPoint:"bottom-right",classList:"move3d-square",animate:!0},children:[{props:{id:19,depth:100,rotate:"",width:z(150),height:z(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:20,depth:150,rotate:"xy",width:z(150),height:z(150),offsetX:z(20),offsetY:z(20),range:20,anchorPoint:"top-left",classList:"move3d-square",animate:!0},children:[{props:{id:21,depth:100,rotate:"",width:z(150),height:z(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:22,depth:150,rotate:"xy",width:z(150),height:z(150),offsetX:z(20),offsetY:z(20),range:20,anchorPoint:"top-right",classList:"move3d-square",animate:!0},children:[{props:{id:23,depth:100,rotate:"",width:z(150),height:z(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]}]}];var B_={shape1:{prevRoute:"",nextRoute:"#plugin-dragger",data:F_}};var V_=({getState:e})=>{let{content:t}=e();return g`${t}`};var rs=m.createComponent({tag:"any-component",component:V_,props:{content:()=>({value:"",type:String})}});var W_=({elements:e})=>{let t=180/Math.PI,r=window.innerWidth,o=window.innerHeight,n=0,s=0,i=0,a=0,c=H.createSpring({data:{x:0,y:0},stagger:{each:3,from:"start"}});e.forEach(f=>{c.subscribe(({x:h,y:v})=>{f.style.translate=`${h}px ${v}px`})});let l=H.createSpring({data:{rotation:0},stagger:{each:8,from:"start"}});e.forEach(f=>{f&&l.subscribeCache(f,({rotation:h})=>{f.style.rotate=`${h}deg`})});let p=u.useResize(()=>{r=window.innerWidth,o=window.innerHeight}),d=u.useMouseMove(({client:f})=>{let{x:h,y:v}=f,b=v-n,T=h-s;if(Math.abs(T)>10||Math.abs(b)>10){n=v,s=h;let S=Math.atan2(b,T)*t+180,C=Math.abs(i-S);C>180&&i<S&&(a-=C),C>180&&i>S&&(a+=C);let E=S+a+90;l.goTo({rotation:E}),i=S}c.goTo({x:h-r/2,y:v-o/2})});return{destroy:()=>{c.destroy(),c=null,l.destroy(),l=null,p(),d(),r=null,o=null,n=null,s=null,i=null,a=null}}};var CR=5,j_=({onMount:e,getRefs:t,setRef:r})=>{let{starOutline:o}=bt(),n=[...Array.from({length:CR}).keys()].map(()=>`<span class='mouse-trail__item' ${r("star")}>${o}</span>`).join("");return e(()=>{let{star:s}=t(),{destroy:i}=W_({elements:s});return()=>{i()}}),g`<div class="mouse-trail">${n}</div>`};var Cc=m.createComponent({tag:"mouse-trail",component:j_});var os=({svg:e,id:t})=>{let r=document.createRange().createContextualFragment(e),o=r.querySelectorAll('[type="layer"]'),n=r.querySelectorAll('[type="delete"]');return[...o].forEach(i=>{i.id!==t&&i.remove()}),[...n].forEach(i=>{i.remove()}),wv(r)};var z_=({u0:e,u1:t,o:r,o_b:o,m1:n,m2:s,m3:i,m4:a,b1:c,b1_b:l,b3:p,b4:d,b5:f,sign:h,m1_b:v,m3_b:b,m4_b:T,b1_stone:_,m1_stone:S})=>[{props:{id:0,depth:200,anchorPoint:"center",classList:"",animate:!0},children:[{props:{id:1,depth:-500,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:e}}},children:[]},{props:{id:1,depth:-50,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:t}}},children:[]},{props:{id:2,depth:20,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:r}}},children:[]},{props:{id:2,depth:21,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:o}}},children:[]},{props:{id:3,depth:150,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:n}}},children:[]},{props:{id:3,depth:150,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:v}}},children:[]},{props:{id:6,depth:155,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:a}}},children:[]},{props:{id:6,depth:155,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:T}}},children:[]},{props:{id:6,depth:170,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:S}}},children:[]},{props:{id:4,depth:180,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:s}}},children:[]},{props:{id:4,depth:180,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:h}}},children:[]},{props:{id:5,depth:100,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:i}}},children:[]},{props:{id:5,depth:100,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:b}}},children:[]},{props:{id:6,depth:50,anchorPoint:"center",initialDepth:1,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:c}}},children:[]},{props:{id:6,depth:51,anchorPoint:"center",initialDepth:1,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:l}}},children:[]},{props:{id:7,depth:120,anchorPoint:"center",initialDepth:20,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:_}}},children:[]},{props:{id:8,depth:100,initialDepth:10,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:p}}},children:[]},{props:{id:10,depth:170,anchorPoint:"center",initialDepth:10,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:d}}},children:[]},{props:{id:11,depth:100,anchorPoint:"center",initialDepth:1,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:f}}},children:[]}]}];m.useComponent([ts,rs,Cc]);var H_=async()=>{let{data:e}=await qe({source:"./asset/svg/lettering-mob.svg?v=0.9"}),[t,r,o,n,s,i,a,c,l,p,d,f,h,v,b,T,_,S,C]=["U0_block","U1_block","O_block","O_b_block","M1_block","M1_b_block","M2_block","M3_block","M3_b_block","M4_block","M4_b_block","B1_block","B1_b_block","B3_block","B4_block","B5_block","sign","Bstone_1_block","Mstone_1_block"].map(w=>os({svg:e,id:w}));return ye({active:!0,prevRoute:"#rdp-01",nextRoute:"#mob-02",backRoute:"#svg-overview"}),ve("<strong>Svg</strong>: Mob lettering"),g`<div class="l-mob-01">
        <mouse-trail></mouse-trail>
        <move-3d
            ${m.staticProps({shape:z_({u0:t,u1:r,o,o_b:n,m1:s,m2:a,m3:c,m4:p,b1:f,b1_b:h,b3:v,b4:b,b5:T,sign:_,m1_b:i,m3_b:l,m4_b:d,b1_stone:S,m1_stone:C}),xDepth:100,yDepth:30,factor:20,xLimit:20,yLimit:20,drag:!0,perspective:1e3})}
        ></move-3d>
    </div>`};var U_=()=>fe.mq("min","desktop"),G_="#home",lp=null;m.afterRouteChange(({currentRoute:e})=>{e!=="onlyDesktop"&&(lp=m.getActiveParams(),G_=e)});var q_=({onMount:e,getProxi:t,bindEffect:r,watch:o})=>{let n=t();return n.active=U_(),e(()=>{let s=u.useResize(()=>{n.active=U_()});return o(()=>n.active,i=>{i&&m.loadUrl({url:G_,params:lp??{}})}),()=>{s(),lp=null}}),g`
        <a
            href="#home"
            class="l-only-desktop__link"
            ${r({toggleClass:{active:()=>n.active}})}
        >
            home page
        </a>
    `};var J_=m.createComponent({tag:"only-desktop-cta",component:q_,state:{active:()=>({value:!1,type:Boolean,skipEqual:!1})}});m.useComponent([J_]);var Y_=async()=>{let{data:e}=await qe({source:"./asset/svg/lettering-mob-only-desktop.svg?v=0.1"});return g`
        <div class="l-only-desktop">
            <div class="l-only-desktop__content">
                <h2 class="l-only-desktop__title">ops...<br /></h2>
                <p>
                    This site is designed<br />
                    for a desktop experience,<br />
                    the minimum resolution is
                    <strong>992px</strong>.<br /><br />
                    <strong>
                        Please resize your browser<br />
                        or use a different device.
                    </strong>
                </p>
                <h3 class="l-only-desktop__title">My apologies ...</h3>
                <div>
                    <only-desktop-cta></only-desktop-cta>
                </div>
                <div class="l-only-desktop__svg">${e}</div>
            </div>
        </div>
    `};var up=({canvas:e,disableOffcanvas:t})=>{let{useOffscreen:r,context:o}=st({disableOffcanvas:t}),n=!0,s=e.getContext(o,{alpha:!0}),i=m.getActiveRoute(),{offscreen:a,offScreenCtx:c}=it({useOffscreen:r,canvas:e}),l=r?c:s,p=Xn(l);l=null,e.width=e.clientWidth,e.height=e.clientHeight;let d=10,f=10,h=window.innerHeight/18,v=window.innerHeight/18,T=go({canvas:e,numberOfRow:d,numberOfColumn:f,cellWidth:h,cellHeight:v,gutter:1}).items,_=T.map(P=>({...P,scale:1,rotate:0})),S=({row:P,col:x})=>{let N=(f+1)*P;return _[N+x]},E={...S({row:1,col:1}),scale:1,rotate:0},M={...S({row:4,col:5}),scale:1,rotate:0},A=H.createTimeTween({ease:"easeInOutQuad",stagger:{each:10,from:"edges"},data:{scale:1,rotate:0}}),R=H.createTimeTween({data:E,duration:1e3,ease:"easeInOutBack"}),L=H.createSpring({data:M});_.forEach(P=>{A.subscribeCache(P,({scale:x,rotate:N})=>{P.rotate=N,P.scale=x})}),R.subscribe(P=>{E=P}),L.subscribe(P=>{M=P});let D=Ce.createAsyncTimeline({repeat:-1,autoSet:!1,yoyo:!0});D.goTo(A,{scale:.2,rotate:90},{duration:1e3});let $=Ce.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1});$.goTo(R,{x:S({row:1,col:8}).x,rotate:360,scale:2}).createGroup({waitComplete:!1}).goTo(R,{y:S({row:8,col:8}).y,rotate:180}).goTo(L,{y:S({row:0,col:8}).y},{delay:500}).closeGroup().label({name:"my-label"}).createGroup({waitComplete:!1}).goTo(R,{x:S({row:8,col:1}).x,rotate:0,scale:1}).goTo(L,{rotate:360,scale:2},{delay:0}).closeGroup().createGroup({waitComplete:!1}).goTo(R,{y:S({row:1,col:1}).y,rotate:-180},{duration:1e3}).goTo(L,{rotate:0,y:S({row:8,col:8}).y,scale:1},{delay:200}).closeGroup();let V=()=>{if(!s)return;r&&a&&(a.width=e.width,a.height=e.height);let P=r?c:s;if(P){e.width=e.width,_.forEach(({x,y:N,width:O,height:F,rotate:B,scale:Q,offsetXCenter:U,offsetYCenter:J},q)=>{if(q===40){let Ee=Math.PI/180*E.rotate,ke=Math.cos(Ee)*E.scale,Ne=Math.sin(Ee)*E.scale;P.setTransform(ke,Ne,-Ne,ke,Math.floor(E.offsetXCenter+E.x),Math.floor(E.offsetYCenter+E.y)),p?(P.beginPath(),P.roundRect(Math.floor(-E.width/2),Math.floor(-E.height/2),Math.floor(E.width),E.height,5)):(P.beginPath(),P.rect(Math.floor(-E.width/2),Math.floor(-E.height/2),Math.floor(E.width),Math.floor(E.height))),P.fillStyle="#000000",P.fill()}let oe=Math.PI/180*B,te=Math.cos(oe)*Q,me=Math.sin(oe)*Q;P.setTransform(te,me,-me,te,Math.floor(U+x),Math.floor(J+N)),p?(P.beginPath(),P.roundRect(Math.floor(-O/2),Math.floor(-F/2),O,F,5)):(P.beginPath(),P.rect(Math.floor(-O/2),Math.floor(-F/2),O,F)),P.fillStyle="rgba(238, 238, 238, 0.9)",P.fill()});{let x=Math.PI/180*M.rotate,N=Math.cos(x)*M.scale,O=Math.sin(x)*M.scale;P.setTransform(N,O,-O,N,Math.floor(M.offsetXCenter+M.x),Math.floor(M.offsetYCenter+M.y)),p?(P.beginPath(),P.roundRect(Math.floor(-M.width/2),Math.floor(-M.height/2),Math.floor(M.width),Math.floor(M.height),5)):(P.beginPath(),P.rect(Math.floor(-M.width/2),Math.floor(-M.height/2),Math.floor(M.width),Math.floor(M.height))),P.fillStyle="#a86464",P.fill()}at({useOffscreen:r,offscreen:a,ctx:s})}},I=()=>{V(),n&&u.useNextFrame(()=>I())};u.useFrame(()=>{I()});let k=X.watch("navigationIsOpen",u.useDebounce(P=>{if(P){$.pause(),D.pause(),n=!1;return}setTimeout(async()=>{m.getActiveRoute().route===i.route&&($.resume(),D.resume(),n=!0,u.useFrame(()=>I()))},200)},200));return{destroy:()=>{k(),s=null,a=null,c=null,T=[],n=!1,A?.destroy?.(),R?.destroy?.(),L?.destroy?.(),$?.destroy?.(),D?.destroy?.(),_=null,E=null,M=null,o=null,A=null,R=null,L=null,$=null,D=null},play:()=>{$.play(),D.isActive()||D.play()},playReverse:()=>{$.playReverse(),D.isActive()||D.play()},playFromLabel:()=>{$.setTween("my-label",[R,L]).then(()=>{$.playFrom("my-label").then(()=>{console.log("resolve promise playFrom")})}),D.isActive()||D.play()},playFromLabelReverse:()=>{$.setTween("my-label",[R,L]).then(()=>{$.playFromReverse("my-label").then(()=>{console.log("resolve promise playFrom")})}),D.isActive()||D.play()},revertNext:()=>{$.reverseNext()},pause:()=>{$.pause(),D.pause()},resume:()=>{$.resume(),D.resume()},stop:()=>{$.stop(),D.stop()}}};function ER({buttons:e}){return Object.entries(e).map(([t,r])=>{let{label:o}=r;return g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn ${t}"
                >
                    ${o}
                </button>
            </li>`}).join("")}var X_=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s,delegateEvents:i})=>{let a=s();document.body.style.background=nt;let c={},l=()=>{};return e(({element:p})=>{let{canvas:d}=o();c=up({canvas:d,...t()}),l=c.destroy;let f=u.useResize(()=>{l(),c=up({canvas:d,...t()}),l=c.destroy,c?.play?.()});return Object.entries(a.buttons).forEach(([h,v])=>{let{method:b}=v;p.querySelector(`.${h}`)?.addEventListener("click",()=>c?.[b]())}),u.useFrame(()=>{a.isMounted=!0}),c?.play?.(),()=>{f(),l(),document.body.style.background=""}}),g`
        <div>
            <div class="c-canvas">
                <div
                    class="c-canvas__wrap"
                    ${n({toggleClass:{active:()=>a.isMounted}})}
                >
                    <button
                        type="button"
                        class="c-canvas__controls__open"
                        ${i({click:()=>{a.controlsActive=!0}})}
                    >
                        show controls
                    </button>
                    <ul
                        class="c-canvas__controls"
                        ${n({toggleClass:{active:()=>a.controlsActive}})}
                    >
                        <button
                            type="button"
                            class="c-canvas__controls__close"
                            ${i({click:()=>{a.controlsActive=!1}})}
                        ></button>
                        ${ER({buttons:a.buttons})}
                    </ul>
                    <canvas ${r("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var wR={"js-async-timeline-play":{label:"play",method:"play"},"js-async-timeline-playReverse":{label:"play reverse",method:"playReverse"},"js-async-timeline-play-label":{label:"play from label",method:"playFromLabel"},"js-async-timeline-playReverse-label":{label:"play from label reverse",method:"playFromLabelReverse"},"js-async-timeline-pause":{label:"pause",method:"pause"},"js-async-timeline-resume":{label:"resume",method:"resume"},"js-async-timeline-revert-next":{label:"revert next",method:"revertNext"},"js-async-timeline-stop":{label:"stop",method:"stop"}},K_=m.createComponent({tag:"async-timeline",component:X_,props:{disableOffcanvas:()=>({value:!!(ot()||rt()),type:Boolean})},state:{isMounted:!1,controlsActive:()=>({value:!1,type:Boolean}),buttons:()=>({value:wR,type:"Any"})}});m.useComponent([K_]);var Q_=()=>(ye({active:!0,prevRoute:"#caterpillarN2",nextRoute:"#animatedPatternN0?version=0&activeId=0",backRoute:"#canvas-overview"}),ve("<strong>Canvas</strong>: TimeTween Spring & AsyncTimeline"),g`<div class="l-padding">
        <async-timeline></async-timeline>
    </div>`);var Z_=({letter_d:e,letter_p:t,letter_r:r,letter_r_shadow:o,letter_d_shadow:n,letter_p_shadow:s,letter_r_pieces:i,letter_d_pieces:a,letter_p_pieces:c,letter_r_fill:l,letter_d_fill:p,letter_p_fill:d})=>[{props:{id:0,depth:200,anchorPoint:"center",classList:"",animate:!0},children:[{props:{id:0,depth:100,offsetX:"-2",offsetY:"-2",anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:e}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:n}}},children:[]},{props:{id:0,depth:40,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:a}}},children:[]},{props:{id:0,depth:100,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:p}}},children:[]},{props:{id:0,depth:-100,initialDepth:-1,offsetX:"-10",anchorPoint:"right",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:r}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:o}}},children:[]},{props:{id:0,depth:20,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:i}}},children:[]},{props:{id:0,depth:30,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:l}}},children:[]}]},{props:{id:0,depth:-100,initialDepth:-1,offsetX:"-10",anchorPoint:"right",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:t}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:s}}},children:[]},{props:{id:0,depth:20,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:c}}},children:[]},{props:{id:0,depth:30,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:d}}},children:[]}]}]}]}];m.useComponent([ts,rs,Cc]);var ex=async()=>{let{data:e}=await qe({source:"./asset/svg/rdp.svg?v=0.4"}),[t,r,o,n,s,i,a,c,l,p,d,f]=["letter_d","letter_r","letter_p","letter_r_shadow","letter_d_shadow","letter_p_shadow","letter_r_pieces","letter_d_pieces","letter_p_pieces","letter_r_fill","letter_d_fill","letter_p_fill"].map(v=>os({svg:e,id:v}));return ye({active:!0,prevRoute:"",nextRoute:"#mob-01",backRoute:"#svg-overview"}),ve("<strong>Svg</strong>: RDP lettering"),g`<div class="l-rdp-01">
        <mouse-trail></mouse-trail>
        <move-3d
            ${m.staticProps({shape:Z_({letter_d:t,letter_r:r,letter_p:o,letter_r_shadow:n,letter_d_shadow:s,letter_p_shadow:i,letter_r_pieces:a,letter_d_pieces:c,letter_p_pieces:l,letter_r_fill:p,letter_d_fill:d,letter_p_fill:f}),xDepth:100,yDepth:30,factor:20,xLimit:20,yLimit:20,drag:!0,perspective:1e3})}
        ></move-3d>
    </div>`};var tx=({screenElement:e,scrollerElement:t,layer01:r,layer02:o,layer04:n})=>{let s=ze.createParallax({item:r,align:"center",range:3,propierties:"x",ease:!1}),i=ze.createParallax({item:o,align:"center",range:5,propierties:"x",ease:!1}),a=ze.createParallax({item:n,align:"center",range:7,propierties:"x",ease:!1}),c=new xt({screen:e,scroller:t,direction:"horizontal",drag:!0,useHorizontalScroll:!0,easeType:"lerp",breakpoint:"small",children:[s,i,a]});return c.init(),c.set(55),{destroy:()=>{c.destroy(),s.destroy(),i.destroy(),a.destroy(),c=null,s=null,i=null,a=null}}};var rx=({getState:e,onMount:t,setRef:r,getRef:o})=>{let{layer01:n,layer02:s,layer03:i,layer04:a}=e();return t(()=>{let{screen:c,scroller:l,layer01:p,layer02:d,layer04:f}=o(),{destroy:h}=tx({screenElement:c,scrollerElement:l,layer01:p,layer02:d,layer04:f});return()=>{h()}}),g`<div class="mobbu2025">
        <div class="mobbu2025__screen" ${r("screen")}>
            <div class="mobbu2025__scroller" ${r("scroller")}>
                <div
                    class="mobbu2025__layer no-pointer-event"
                    ${r("layer04")}
                >
                    ${a}
                </div>
                <div class="mobbu2025__layer">${i}</div>
                <div
                    class="mobbu2025__layer no-pointer-event"
                    ${r("layer02")}
                >
                    ${s}
                </div>
                <div
                    class="mobbu2025__layer no-pointer-event"
                    ${r("layer01")}
                >
                    ${n}
                </div>
            </div>
        </div>
    </div>`};var ox=m.createComponent({tag:"mobbu-2025",component:rx,props:{layer01:()=>({value:"",type:String}),layer02:()=>({value:"",type:String}),layer03:()=>({value:"",type:String}),layer04:()=>({value:"",type:String})}});m.useComponent([ox]);var nx=async()=>{let{data:e}=await qe({source:"./asset/svg/lettering-mob-2025.svg?v=0.9"}),[t,r,o,n]=["layer-01","layer-02","layer-03","layer-04"].map(i=>os({svg:e,id:i}));return ye({active:!0,prevRoute:"#mob-01",nextRoute:"",backRoute:"#svg-overview"}),ve("<strong>Svg</strong>: Mobbu2025 parallax /  <strong>[ drag or scroll ]</strong>"),g`<div class="l-mob-02">
        <mobbu-2025
            ${va({layer01:t,layer02:r,layer03:o,layer04:n})}
        ></mobbu-2025>
    </div>`};var sx="TOP-LEFT",ix="TOP-RIGHT",ax="BOTTOM-LEFT",cx="BOTTOM-RIGHT",lx="CENTER";var ux=({align:e,root:t,child:r,perspective:o,usePrespective:n,maxLowDepth:s=-200,maxHightDepth:i=200,onDepthChange:a=()=>{},depthFactor:c=30})=>{let l=0,p=0,d=0,f=0,h=0,v=r.offsetWidth,b=r.offsetHeight,T=t.offsetWidth,_=t.offsetHeight,S=(v-T)/2,C=(b-_)/2,E={x:0,y:0},w=!1,M=!1,A=30,R=()=>{if(n&&o>0){let U=o/(o-d);S=(v-T/U)/2,C=(b-_/U)/2}else S=(v-T)/2,C=(b-_)/2};R();let L={xValue:0,yValue:0},D=H.createSpring({data:{x:0,y:0,z:0}});switch(e){case sx:{L={xValue:S,yValue:C},p=v,l=b;break}case ix:{L={xValue:-S,yValue:C},p=-v,l=b;break}case ax:{L={xValue:S,yValue:-C},p=v,l=-b;break}case cx:{L={xValue:-S,yValue:-C},p=-v,l=-b;break}}let $=D.subscribe(({x:U,y:J,z:q})=>{r&&(r.style.transform=`translate3D(${U}px, ${J}px, ${q}px)`)});D.set({x:L.xValue,y:L.yValue}),[...t.querySelectorAll("a, button")].forEach(U=>{U.setAttribute("draggable","false"),U.style.userSelect="none"});let I=({page:U,target:J})=>{(J===r||_o(r,J))&&(w=!0,M=!0,E={x:U.x,y:U.y})},k=({page:U})=>{let{x:J,y:q}=U,{xgap:oe,ygap:te}=w?M?(M=!1,{xgap:0,ygap:0}):{xgap:J-f,ygap:q-h}:{xgap:0,ygap:0},me=S>0?fe.clamp(p+oe,-S,S):fe.clamp(p+oe,S,-S),Ee=C>0?fe.clamp(l+te,-C,C):fe.clamp(l+te,C,-C),ke=w?me:p,Ne=w?Ee:l,{xComputed:Ue,yComputed:St}=w?{xComputed:ke,yComputed:Ne}:{xComputed:J,yComputed:q};p=ke,l=Ne,f=J,h=q,w&&(L={xValue:Ue,yValue:St},D.goTo({x:Ue,y:St}).catch(()=>{}))},P=u.useTouchStart(({page:U,target:J})=>{I({page:U,target:J})}),x=u.useMouseDown(({page:U,target:J})=>{I({page:U,target:J})}),N=u.useTouchEnd(()=>{w=!1}),O=u.useMouseUp(()=>{w=!1}),F=u.useMouseMove(({page:U})=>{k({page:U})}),B=u.useTouchMove(({page:U})=>{k({page:U})});t.addEventListener("click",U=>{let{x:J,y:q}=E,oe=Math.abs(f-J)>A,te=Math.abs(h-q)>A;(oe||te)&&U.preventDefault()},!1),n&&r.addEventListener("wheel",U=>{let{spinY:J}=u.normalizeWheel(U);d=fe.clamp(d+J*c,s,i),R(),a({depth:d}),D.goTo({z:d}).catch(()=>{})},{passive:!0});let Q=u.useResize(()=>{v=r.offsetWidth,b=r.offsetHeight,T=t.offsetWidth,_=t.offsetHeight,R()});return{destroy:()=>{$(),P(),N(),x(),O(),F(),B(),Q(),D.destroy(),D=null,t=null,r=null}}};var px=({getProxi:e,setRef:t,getRef:r,bindEffect:o,onMount:n})=>{let s=e();return n(({element:i})=>{let{child:a}=r(),c=a.firstChild;if(!c)return;let l=ux({align:s.align,root:i,child:c,usePrespective:s.usePrespective,perspective:s.perspective,maxLowDepth:s.maxLowDepth,maxHightDepth:s.maxHightDepth,depthFactor:s.depthFactor,onDepthChange:s.onDepthChange});return s.afterInit({root:i}),()=>{l.destroy(),c=null}}),g`<div class="c-dragger ${s.rootClass}">
        <!-- Root border -->
        <mobjs-slot name="root-slot"></mobjs-slot>

        <!-- Child -->
        <div
            class="c-dragger__wrapper ${s.childClass}"
            ${t("child")}
            ${o({toggleStyle:{perspective:()=>`${s.perspective}px`}})}
        >
            <mobjs-slot name="child-slot"></mobjs-slot>
        </div>
    </div>`};var mx=m.createComponent({tag:"c-dragger",component:px,props:{rootClass:()=>({value:"",type:String}),childClass:()=>({value:"",type:String}),initialZoom:()=>({value:1,type:Number}),ease:()=>({value:!0,type:Boolean}),align:()=>({value:lx,type:String,transform:e=>e.toUpperCase()}),usePrespective:()=>({value:!0,type:Boolean}),perspective:()=>({value:600,type:Number}),depthFactor:()=>({value:30,type:Number}),maxLowDepth:()=>({value:-200,type:Number}),maxHightDepth:()=>({value:200,type:Number}),afterInit:()=>({value:()=>{},type:Function}),onDepthChange:()=>({value:()=>{},type:Function})}});m.useComponent([mx,rs]);var dx=!1,hx=()=>{ye({active:!0,prevRoute:"#move3D-shape1",nextRoute:"#math-animation-01",backRoute:"#plugin-overview"});let e=g`
        <div class="dragger-border">
            <div class="dragger-border__top-left"></div>
            <div class="dragger-border__top-right"></div>
            <div class="dragger-border__bottom-left"></div>
            <div class="dragger-border__bottom-right"></div>
        </div>
    `,t=g`<div class="dragger-child">
        <div class="dragger-child-1">
            <a class="dragger-child__link" href="#">link test</a>
            <span class="dragger-child-1__diagonal"> </span>
        </div>
        <div class="dragger-child-2">
            <span class="dragger-child-2__diagonal"> </span>
        </div>
    </div>`;return ve("<strong>Dragger:</strong> Drag and zoom"),g`<div class="l-dragger">
        <c-dragger
            ${m.staticProps({rootClass:"dragger-component",childClass:"",align:"CENTER",maxHightDepth:200,maxLowDepth:-1e3,afterInit:({root:o})=>{dx&&console.log(o)},onDepthChange:({depth:o})=>{dx&&console.log(o)}})}
        >
            <!-- Root border -->
            <any-component
                slot="root-slot"
                ${m.staticProps({content:e})}
            ></any-component>

            <!-- Child -->
            <any-component
                slot="child-slot"
                ${m.staticProps({content:t})}
            ></any-component>
        </c-dragger>
    </div>`};var fx=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=(ie(t)-100)/2,s=3,i=2*Math.PI*s,a=0,c=(n-a)/i,l=1e3*s,p=e.map(b=>ie(b)/2),d=H.createSequencer({ease:"easeLinear",stagger:{each:6},data:{angleInRadian:0,scale:0}}).goTo({angleInRadian:i},{start:0,end:10,ease:"easeLinear"}).goTo({scale:1},{start:0,end:4,ease:"easeOutQuad"}).goTo({scale:0},{start:9,end:10,ease:"easeOutQuad"});e.forEach((b,T)=>{let _=b.firstChild;d.subscribeCache(b,({angleInRadian:S,scale:C})=>{let E=a+c*S,w=E*Math.cos(S),M=E*Math.sin(S);b.style.transform=`translate3D(0px,0px,0px) translate(${w-p[T]}px, ${M-p[T]}px)`,_&&(_.style.scale=`${C}`)})});let f=Ce.createSyncTimeline({repeat:-1,yoyo:!1,duration:l}).add(d);function h(){if(!o||!r)return;let b=r.width/2,T=r.height/2,_=200;o.clearRect(0,0,r.width,r.height),o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let S=0;S<=_;S++){let C=i/_*S,E=a+c*C,w=b+E*Math.cos(C),M=T+E*Math.sin(C);S===0?o.moveTo(w,M):o.lineTo(w,M)}o.stroke()}let v=u.useResize(()=>{r.width=r.clientWidth,r.height=r.clientHeight,h()});return h(),{play:()=>{f.play()},resume:()=>{f.resume()},stop:()=>{f.pause()},destroy:()=>{f.stop(),d.destroy(),f.destroy(),v(),o=null,d=null,f=null,e=null}}};var gx=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=H.createSpring({stagger:{each:6},data:{x:0}}),s=.06,i=ie(t)/2-100,a=e.map(h=>ie(h)/2);e.forEach((h,v)=>{n.subscribeCache(h,({x:b})=>{let T=Math.sin(b*s)*i,_=Math.cos(b*s)*i;h.style.transform=`translate3D(0px,0px,0px) translate(${T-a[v]}px, ${_-a[v]}px)`})}),n.set({x:0});let c=0,l=!1,p=()=>{let h=60/u.getFps();c+=h,n&&(n.goTo({x:c}).catch(()=>{}),l&&u.useNextFrame(()=>p()))};function d(){if(!o||!r)return;r.width=r.width;let h=r.width/2,v=r.height/2;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath(),o.arc(h,v,i,0,2*Math.PI),o.stroke()}let f=u.useResize(()=>{d()});return d(),{play:()=>{l||(l=!0,p())},resume:()=>{l||(l=!0,p())},stop:()=>{l=!1},destroy:()=>{n.destroy(),f(),o=null,n=null,e=null,c=null,l=null}}};var bx=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=e.map(h=>ie(h)/2),s=De(t)/2-100,i=ie(t),a=10,c=a/2/Math.PI,l=H.createSequencer({stagger:{each:5},data:{x:a/4,scale:0},duration:a}).goTo({x:a+a/4},{start:0,end:a,ease:"easeLinear"}).goTo({scale:1},{start:0,end:1.5,ease:"easeOutQuad"}).goTo({scale:0},{start:1.5,end:5,ease:"easeInQuad"}).goTo({scale:1},{start:5,end:8.5,ease:"easeOutQuad"}).goTo({scale:0},{start:8.5,end:10,ease:"easeInQuad"});e.forEach((h,v)=>{let b=h.firstChild;l.subscribeCache(h,({x:T,scale:_})=>{let S=T/c,C=2/(3-Math.cos(2*S)),E=C*Math.cos(S)*s,w=C*Math.sin(2*S)/2*i;h.style.transform=`translate3D(0px,0px,0px) translate(${E-n[v]}px, ${w-n[v]}px)`,b&&(b.style.scale=`${_}`)})});let p=Ce.createSyncTimeline({repeat:-1,yoyo:!1,duration:3e3}).add(l);function d(){if(!o||!r)return;r.width=r.width;let h=r.width/2,v=r.height/2,b=200;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let T=0;T<=b;T++){let _=T/b*2*Math.PI,S=2/(3-Math.cos(2*_)),C=S*Math.cos(_)*s,E=S*Math.sin(2*_)/2*i;T===0?o.moveTo(h+C,v+E):o.lineTo(h+C,v+E)}o.stroke()}let f=u.useResize(()=>{d()});return d(),{play:()=>{p.play()},resume:()=>{p.resume()},stop:()=>{p.pause()},destroy:()=>{p.stop(),l.destroy(),p.destroy(),f(),o=null,l=null,p=null,e=null}}};function IR(e,t,r,o=2e3){let n=0,s=e,i=0;for(let a=1;a<=o;a++){let c=r/o*a,l=e*Math.cos(t*c),p=l*Math.cos(c),d=l*Math.sin(c),f=p-s,h=d-i;n+=Math.hypot(f,h),s=p,i=d}return n}var yx=(e,t)=>t===0?e:yx(t,e%t);function MR(e,t){let r=yx(e,t),o=t/r;return 2*Math.PI*o}var vx=({targets:e,container:t,canvas:r}={},...o)=>{let[n,s,i,a]=o;if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let c=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let l=(ie(t)-100)/2,p=n/s,d=MR(n,s),f=IR(l,p,d),h=i*(f/l),v=e.map(A=>ie(A)/2),b=H.createSequencer({ease:"easeLinear",stagger:{each:a},data:{angleInRadian:0,scale:1}}).goTo({angleInRadian:d},{start:0,end:10,ease:"easeLinear"}),T=[],_=0,S=0;for(;S<d&&d>0&&p>0;)S=(Math.PI/2+_*Math.PI)/p,S>=0&&T.push(S),_++;let C=0;T.forEach(A=>{let R=A/d*10,L=Math.abs((R-C)/2);C=R;let D=Math.max(0,R-L),$=R,V=Math.min(10,R+L);V>D&&(b.goTo({scale:0},{start:D,end:$,ease:"easeInQuad"}),b.goTo({scale:1},{start:$,end:V,ease:"easeOutQuad"}))}),e.forEach((A,R)=>{let L=A.firstChild;b.subscribeCache(A,({angleInRadian:D,scale:$})=>{let V=l*Math.cos(p*D),I=V*Math.cos(D),k=V*Math.sin(D);A.style.transform=`translate3D(0px,0px,0px) translate(${I-v[R]}px, ${k-v[R]}px)`,L&&(L.style.scale=`${$}`)})});let E=Ce.createSyncTimeline({repeat:-1,yoyo:!1,duration:h}).add(b);function w(){if(!c||!r)return;let A=r.width/2,R=r.height/2,L=2e3*s;c.clearRect(0,0,r.width,r.height),c.setLineDash([3,7]),c.lineDashOffset=3,c.strokeStyle="rgba(0, 0, 0, 0.5)",c.lineWidth=1,c.beginPath();for(let D=0;D<=L;D++){let $=d/L*D,V=l*Math.cos(p*$),I=A+V*Math.cos($),k=R+V*Math.sin($);D===0?c.moveTo(I,k):c.lineTo(I,k)}c.stroke()}let M=u.useResize(()=>{r.width=r.clientWidth,r.height=r.clientHeight,w()});return w(),{play:()=>{E.play()},resume:()=>{E.resume()},stop:()=>{E.pause()},destroy:()=>{E.stop(),b.destroy(),E.destroy(),M(),c=null,b=null,E=null,e=null}}};var Tx=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=De(t)-200,s=ie(t)/3,i=2,a=n/(2*Math.PI*i),c=1500*i,l=e.map(v=>ie(v)/2),p=H.createSequencer({ease:"easeLinear",stagger:{each:6},data:{x:0,scale:0}}).goTo({x:n},{start:0,end:10,ease:"easeLinear"}).goTo({scale:1},{start:0,end:10/i/2,ease:"easeOutQuad"}).goTo({scale:0},{start:10-10/i/2,end:10,ease:"easeOutQuad"});e.forEach((v,b)=>{let T=0,_=v.firstChild,S=-l[b]-n/2;p.subscribeCache(v,({x:C,scale:E})=>{let w=Math.sign(C-T)||1,M=Math.sin(C/a)*s*w;v.style.transform=`translate3D(0px,0px,0px) translate(${C+S}px, ${M-l[b]}px)`,_&&(_.style.scale=`${E}`),T=C})});let d=Ce.createSyncTimeline({repeat:-1,yoyo:!0,duration:c}).add(p);function f(){if(!o||!r)return;r.width=r.width;let v=r.width/2,b=r.height/2,T=200,_=T*2;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let S=0;S<=_;S++){let{x:C,y:E}=(()=>{if(S<=T){let w=S/T*n,M=Math.sin(w/a)*s;return{x:w,y:M}}if(S>T){let M=(_-S)/T*n,A=Math.sin(M/a)*s*-1;return{x:M,y:A}}return{x:0,y:0}})();S===0?o.moveTo(v+C-n/2,b+E):o.lineTo(v+C-n/2,b+E)}o.stroke()}let h=u.useResize(()=>{f()});return f(),{play:()=>{d.play()},resume:()=>{d.resume()},stop:()=>{d.pause()},destroy:()=>{d.stop(),p.destroy(),d.destroy(),h(),o=null,p=null,d=null,e=null}}};var pp={sin:Tx,circle:gx,infinite:bx,archimede:fx,rosaDiGrandi:vx};var Sx=()=>({play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}});var _x=({getProxi:e,setRef:t,getRef:r,getRefs:o,delegateEvents:n,onMount:s})=>{let i=e(),a=i.showNavigation?"active":"",c=3,l=c/i.numberOfStaggers,p=Array.from({length:i.numberOfStaggers}).map((T,_)=>({size:c-l*_,opacity:1/_})),d=Sx(),{destroy:f,play:h,stop:v,resume:b}=d;return s(({element:T})=>{let{target:_}=o(),{canvas:S}=r();u.useFrame(()=>{({destroy:f,play:h,stop:v,resume:b}=pp[i.name]({targets:_,container:T,canvas:S},...i.args)),h()});let C=u.useResize(()=>{v(),f(),{destroy:f,play:h,stop:v,resume:b}=pp[i.name]({targets:_,container:T,canvas:S},...i.args),h()});return()=>{f(),C(),f=null,h=null,v=null,b=null}}),g`<div class="c-math">
        <canvas class="c-math__canvas" ${t("canvas")}></canvas>
        <div class="c-math__nav ${a}">
            <button
                type="button"
                class="c-math__play"
                ${n({click:()=>{b()}})}
            ></button>
            <button
                type="button"
                class="c-math__stop"
                ${n({click:()=>{v()}})}
            ></button>
        </div>
        <div class="c-math__circle-container">
            ${p.map(({size:T,opacity:_})=>g`<span
                        class="c-math__circle"
                        ${t("target")}
                        style="width:${T}rem;height:${T}rem;opacity:${_}"
                        ><span class="c-math__circle__inner"></span
                    ></span>`).join("")}
        </div>
    </div>`};var Ec=m.createComponent({tag:"math-animation",component:_x,props:{name:()=>({value:"",type:String}),showNavigation:()=>({value:!0,type:Boolean}),numberOfStaggers:()=>({value:5,type:Number}),args:()=>({value:[],type:Array})}});m.useComponent([Ec]);var xx=async({props:e})=>{let{names:t}=e;return t.length>4&&console.warn("math layout, max item excedded"),ye({active:!0,prevRoute:"#plugin-dragger",nextRoute:"#rosa-di-grandi",backRoute:"#plugin-overview"}),ve("<strong>Math:</strong> trigonometry based animation"),g`<div class="l-math">
        ${t.map(o=>g`<div class="l-math__item">
                    <math-animation
                        ${m.staticProps({name:o})}
                    ></math-animation>
                </div>`).join("")}
    </div>`};var RR=({proxi:e,delegateEvents:t,bindObject:r})=>g`
        <li class="l-rosa__controls__item">
            <span for="numerators" class="l-rosa__controls__label">
                ${r`numerators: <strong>${()=>e.numeratorsLabel}</strong>`}
            </span>
            <div class="l-rosa__controls__range">
                <input
                    id="numerators"
                    type="range"
                    min="0"
                    max="10"
                    value="${e.numerators}"
                    step="1"
                    ${t({input:o=>{let{target:n}=o;if(!n)return;let s=n.value;e.numeratorsLabel=Number(s)},change:o=>{let{target:n}=o;if(!n)return;let s=n.value;e.numerators=Number(s)}})}
                />
            </div>
        </li>
        <li class="l-rosa__controls__item">
            <span for="denominator" class="l-rosa__controls__label">
                ${r`denominator: <strong>${()=>e.denominatorLabel}</strong>`}
            </span>
            <div class="l-rosa__controls__range">
                <input
                    type="range"
                    id="denominator"
                    min="0"
                    max="10"
                    value="${e.denominator}"
                    step="1"
                    ${t({input:o=>{let{target:n}=o;if(!n)return;let s=n.value;e.denominatorLabel=Number(s)},change:o=>{let{target:n}=o;if(!n)return;let s=n.value;e.denominator=Number(s)}})}
                />
            </div>
        </li>
    `,Cx=({getProxi:e,delegateEvents:t,invalidate:r,bindEffect:o,getRef:n,setRef:s,bindObject:i})=>{let a=e();return g`<div class="l-rosa">
        <button
            type="button"
            class="l-rosa__controls__open"
            ${t({click:()=>{a.controlsActive=!0}})}
        >
            show controls
        </button>
        <ul
            class="l-rosa__controls"
            ${o({toggleClass:{active:()=>a.controlsActive}})}
        >
            <button
                type="button"
                class="l-rosa__controls__close"
                ${t({click:()=>{a.controlsActive=!1}})}
            ></button>
            ${RR({proxi:a,getRef:n,setRef:s,delegateEvents:t,bindObject:i})}
        </ul>
        <div class="l-rosa__wrap">
            ${r({observe:[()=>a.numerators,()=>a.denominator],render:()=>g`
                        <math-animation
                            ${m.staticProps({name:"rosaDiGrandi",showNavigation:!1,numberOfStaggers:10,args:[a.numerators,a.denominator,a.duration,a.staggerEach]})}
                        ></math-animation>
                    `})}
        </div>
    </div>`};var Ex=m.createComponent({tag:"rosa-di-grandi-page",component:Cx,state:{numerators:()=>({value:2,type:Number}),denominator:()=>({value:3,type:Number}),numeratorsLabel:()=>({value:2,type:Number}),denominatorLabel:()=>({value:3,type:Number}),duration:()=>({value:500,type:Number}),staggerEach:()=>({value:4,type:Number}),controlsActive:()=>({value:!1,type:Boolean})},child:[Ec]});m.useComponent([Ex]);var wx=async()=>(ye({active:!0,prevRoute:"#math-animation-01",nextRoute:"",backRoute:"#plugin-overview"}),ve("<strong>Rosa di Grandi</strong>"),g`<rosa-di-grandi-page></rosa-di-grandi-page>`);var dp="home",Ic="about",Z="template-mobJs-component",Re="template-doc-default",ns="template-listing",ct="template-animation",Tt="template-test",Mc=new Set([Z,Re]),ae=[{url:"./#mobJs-overview",title:"mobJs"},{url:"./#mobJs-component",title:"component"}],Je=[{url:"./#mobJs-overview",title:"mobJs"}],mp=[{url:"./#mobCore-overview",title:"mobCore"}],Dr=[{url:"./#mobMotion-overview",title:"mobMotion"}],wc=[{label:"store",url:"#mobCore-store"},{label:"events",url:"#mobCore-events"},{label:"defaults",url:"#mobCore-defaults"}],K=[{label:"initialization",url:"#mobJs-initialization"},{label:"component",url:"#mobJs-component"},{label:"routing",url:"#mobJs-routing"},{label:"tick",url:"#mobJs-tick"},{label:"memory management",url:"#mobJs-memory-management"},{label:"utils",url:"#mobJs-utils"},{label:"debug",url:"#mobJs-debug"}],dr=[{label:"tween/spring/lerp",url:"#mobMotion-tween-spring-lerp"},{label:"AsyncTimeline",url:"#mobMotion-async-timeline"},{label:"sequencer",url:"#mobMotion-sequencer"},{label:"SyncTimeline",url:"#mobMotion-sync-timeline"},{label:"CreateStagger",url:"#mobMotion-create-stagger"},{label:"ScrollTrigger",url:"#mobMotion-scrolltrigger"},{label:"Parallax",url:"#mobMotion-parallax"},{label:"Stagger",url:"#mobMotion-stagger"},{label:"Default",url:"#mobMotion-defaults"}],Rc=[{hash:"pageNotFound",layout:Nv,props:{}},{hash:"onlyDesktop",layout:Y_,props:{}},{hash:"about",layout:WT,templateName:Ic,props:{}},{hash:"canvas-overview",layout:Xa,templateName:ns,props:{source:"./data/canvas/data.json"}},{hash:"animatedPatternN0",layout:lS,templateName:ct,props:{}},{hash:"animatedPatternN1",layout:dS,templateName:ct,props:{}},{hash:"caterpillarN0",layout:bS,templateName:ct,props:{}},{hash:"caterpillarN1",layout:SS,templateName:ct,props:{}},{hash:"caterpillarN2",layout:ES,templateName:ct,props:{}},{hash:"async-timeline",layout:Q_,templateName:ct,props:{}},{hash:"scrollerN0",layout:RS,templateName:ct,props:{}},{hash:"scrollerN1",layout:AS,templateName:ct,props:{}},{hash:"dynamic-list",layout:KS,templateName:Tt,skipTransition:!0,props:{source:"./data/mob-js/general-repeat-test.json",breadCrumbs:Je,title:"( test ) repeat & invalidate",section:"mobJs"}},{hash:"matrioska-repeat",layout:h_,templateName:Tt,skipTransition:!0,props:{source:"./data/mob-js/matrioska.json",breadCrumbs:Je,title:"( test ) matrioska repeat",section:"mobJs"}},{hash:"matrioska-invalidate",layout:f_,templateName:Tt,skipTransition:!0,props:{source:"./data/mob-js/matrioska.json",breadCrumbs:Je,title:"( test ) matrioska invalidate",section:"mobJs"}},{hash:"home",layout:t_,templateName:dp,props:{}},{hash:"mobCore-overview",layout:$e,skipTransition:!0,templateName:Re,props:{source:"./data/mob-core/overview.json",title:"mobCore",breadCrumbs:[],section:"mobCore",rightSidebar:wc}},{hash:"mobCore-defaults",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-core/defaults.json",title:"Defaults",breadCrumbs:mp,section:"mobCore",rightSidebar:wc}},{hash:"mobCore-events",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-core/events.json",title:"Events",breadCrumbs:mp,section:"mobCore",rightSidebar:wc}},{hash:"mobCore-store",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-core/store.json",title:"Store",breadCrumbs:mp,section:"mobCore",rightSidebar:wc}},{hash:"mobJs-overview",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-js/overview.json",title:"mobJs",breadCrumbs:[],section:"mobJs",rightSidebar:K}},{hash:"mobJs-initialization",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-js/initialization.json",title:"initialization",breadCrumbs:Je,section:"mobJs",rightSidebar:K}},{hash:"mobJs-component",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-js/component.json",title:"component",breadCrumbs:Je,section:"mobJs",rightSidebar:K}},{hash:"mobJs-routing",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-js/routing.json",title:"routing",breadCrumbs:Je,section:"mobJs",rightSidebar:K}},{hash:"mobJs-benchmark-invalidate",layout:Lr,templateName:Tt,skipTransition:!0,props:{rootComponent:"benchmark-invalidate",breadCrumbs:Je,source:"./data/mob-js/benchmark-invalidate.json",title:"( test ) benchmark invalidate",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-key",layout:Lr,templateName:Tt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-key",breadCrumbs:Je,source:"./data/mob-js/benchmark-repeat-without-key.json",title:"( test ) benchmark repeat without key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key",layout:Lr,templateName:Tt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key",breadCrumbs:Je,source:"./data/mob-js/benchmark-repeat-key.json",title:"( test ) benchmark repeat key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-component-no-key",layout:Lr,templateName:Tt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-component-no-key",breadCrumbs:Je,source:"./data/mob-js/benchmark-repeat-no-component-no-key.json",title:"( test ) benchmark repeat no component no key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-component-with-key",layout:Lr,templateName:Tt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-component-with-key",breadCrumbs:Je,source:"./data/mob-js/benchmark-repeat-no-component-with-key.json",title:"( test ) benchmark repeat no component with key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-key-nested",layout:Lr,templateName:Tt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key-no-nested",breadCrumbs:Je,source:"./data/mob-js/benchmark-repeat-without-key-nested.json",title:"( test ) benchmark repeat nested without key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key-nested",layout:Lr,templateName:Tt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key-nested",breadCrumbs:Je,source:"./data/mob-js/benchmark-repeat-key-nested.json",title:"( test ) benchmark repeat nested with key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key-bind-store",layout:Lr,templateName:Tt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-key-bind-store",breadCrumbs:Je,source:"./data/mob-js/benchmark-repeat-external.json",title:"( test ) benchmark repeat bindStore",section:"mobJs"}},{hash:"mobJs-tick",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-js/tick.json",title:"tick",breadCrumbs:Je,section:"mobJs",rightSidebar:K}},{hash:"mobJs-utils",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-js/utils.json",title:"utils",breadCrumbs:Je,section:"mobJs",rightSidebar:K}},{hash:"mobJs-memory-management",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-js/memory-management.json",title:"memory management",breadCrumbs:Je,section:"mobJs",rightSidebar:K}},{hash:"mobJs-debug",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-js/debug.json",title:"debug",breadCrumbs:Je,section:"mobJs",rightSidebar:K}},{hash:"mobJs-onMount",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/on-mount.json",title:"onMount",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-getState",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/get-state.json",title:"getState",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-setState",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/set-state.json",title:"setState",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-updateState",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/update-state.json",title:"updateState",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-getProxi",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/get-proxi.json",title:"getProxi",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-watch",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/watch.json",title:"watch",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-staticProps",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/static-props.json",title:"staticProps",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-dataAttribute",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/data-attribute.json",title:"dataAttribute",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-bindProps",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/bind-props.json",title:"bindProps",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-bindEvents",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/bind-events.json",title:"bindEvents",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-delegateEvents",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/delegate-events.json",title:"delegateEvents",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-bindtext",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/bind-text.json",title:"bindText",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-bindObject",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/bind-object.json",title:"bindObject",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-bind-effect",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/bind-effect.json",title:"bindEffect",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-methods",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/methods.json",title:"add methods",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-useMethodByName",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/use-method-by-name.json",title:"useMethodByName",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-useMethodArrayByName",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/use-method-array-by-name.json",title:"useMethodArrayByName",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-setStateByName",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/set-state-by-name.json",title:"setStateByName",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-updateStateByName",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/update-state-by-name.json",title:"updateStateByName",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-refs",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/refs.json",title:"refs",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-runtime",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/runtime.json",title:"renderComponent",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-repeat",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/repeat.json",title:"repeat",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-invalidate",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/invalidate.json",title:"invalidate",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-invalidate-vs-repeater",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/invalidate-vs-repeater.json",title:"invalidate vs repeater",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-web-component",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/web-component.json",title:"webComponent",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-slot",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/slot.json",title:"slot",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-unBind",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/unbind.json",title:"unBind",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-emit",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/emit.json",title:"emit",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-emitAsync",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/emit-async.json",title:"emitAsync",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-computed",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/computed.json",title:"computed",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-bindStore",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/bind-store.json",title:"bindStore",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-removeDom",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/remove-dom.json",title:"removeDom",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-remove",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/remove.json",title:"remove",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-getChildren",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/get-children.json",title:"getChildren",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-freezeProp",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/freeze-prop.json",title:"freezeProp",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-unFreezeProp",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/unfreeze-prop.json",title:"unFreezeProp",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-getParentId",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/get-parent-id.json",title:"getParentId",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-watchParent",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/watch-parent.json",title:"watchParent",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-instanceName",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/instance-name.json",title:"instanceName",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobJs-class-list",templateName:Z,layout:se,skipTransition:!0,props:{source:"./data/mob-js/class-list.json",title:"classList",breadCrumbs:ae,section:"mobJs",rightSidebar:K}},{hash:"mobMotion-stagger",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-motion/stagger.json",title:"Stagger",breadCrumbs:Dr,section:"mobMotion",rightSidebar:dr}},{hash:"mobMotion-defaults",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-motion/defaults.json",title:"Defaults",breadCrumbs:Dr,section:"mobMotion",rightSidebar:dr}},{hash:"mobMotion-overview",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-motion/overview.json",title:"mobMotion",breadCrumbs:[],section:"mobMotion",rightSidebar:dr}},{hash:"mobMotion-parallax",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-motion/parallax.json",title:"Parallax",breadCrumbs:Dr,section:"mobMotion",rightSidebar:dr}},{hash:"mobMotion-sequencer",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-motion/sequencer.json",title:"Sequencer",breadCrumbs:Dr,section:"mobMotion",rightSidebar:dr}},{hash:"mobMotion-scrolltrigger",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-motion/scroll-trigger.json",title:"ScrollTrigger",breadCrumbs:Dr,section:"mobMotion",rightSidebar:dr}},{hash:"mobMotion-sync-timeline",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-motion/sync-timeline.json",title:"Synctimeline",breadCrumbs:Dr,section:"mobMotion",rightSidebar:dr}},{hash:"mobMotion-create-stagger",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-motion/create-stagger.json",title:"CreateStagger",breadCrumbs:Dr,section:"mobMotion",rightSidebar:dr}},{hash:"mobMotion-async-timeline",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-motion/async-timeline.json",title:"Asynctimeline",breadCrumbs:Dr,section:"mobMotion",rightSidebar:dr}},{hash:"mobMotion-tween-spring-lerp",layout:$e,templateName:Re,skipTransition:!0,props:{source:"./data/mob-motion/tween-spring-lerp.json",title:"TimeTween Spring Lerp",breadCrumbs:Dr,section:"mobMotion",rightSidebar:dr}},{hash:"horizontalScroller",layout:w_,templateName:ct,restoreScroll:!1,props:{source:"./data/plugin/horizontal-scroller.json",title:"HorizontalScroller"}},{hash:"move3D-shape1",templateName:ct,layout:D_,props:B_.shape1},{hash:"plugin-dragger",layout:hx,templateName:ct,props:{}},{hash:"math-animation-01",layout:xx,templateName:ct,props:{names:["circle","sin","infinite","archimede"]}},{hash:"rosa-di-grandi",layout:wx,templateName:ct,props:{}},{hash:"plugin-overview",layout:Xa,templateName:ns,props:{source:"./data/plugin/data.json"}},{hash:"svg-overview",layout:Xa,templateName:ns,props:{source:"./data/svg/data.json"}},{hash:"mob-01",layout:H_,templateName:ct,props:{}},{hash:"mob-02",layout:nx,templateName:ct,props:{}},{hash:"rdp-01",layout:ex,templateName:ct,props:{}}];var Ix=0;m.beforeRouteChange(()=>{Ix=window.scrollY});var kR=new Set([Z,Re,ns,Ic,Tt]),NR=new Set([Z,Re,ns,Ic,dp,Tt]),Mx=async({oldNode:e,oldTemplateName:t})=>{e.classList.remove("current-route"),e.classList.add("fake-content"),e.style.position="fixed",e.style.zIndex="10",e.style.top=kR.has(t)?"var(--header-height)":"0",e.style.left=NR.has(t)?"calc(var(--header-height)/2)":"0",e.style.right="0",e.style.transform=`translateY(-${Ix}px)`,e.style.minHeight="calc(100vh - var(--header-height) - var(--footer-height))"},Rx=async({oldNode:e,newNode:t,oldRoute:r,newRoute:o})=>{if(r===o)return;let n=m.getRoot();n.style.pointerEvents="none",t.style.opacity="0";let s=H.createTimeTween({data:{opacity:1},duration:200}),i=H.createTimeTween({data:{opacity:0},duration:300});s.subscribe(({opacity:c})=>{e.style.opacity=c}),i.subscribe(({opacity:c})=>{t.style.opacity=c});let a=Ce.createAsyncTimeline({repeat:1}).createGroup({waitComplete:!0}).goTo(s,{opacity:0}).goTo(i,{opacity:1}).closeGroup();await a.play(),a.destroy(),a=null,t.style.removeProperty("opacity"),t.classList.add("current-route"),u.useFrameIndex(()=>{n.style.pointerEvents=""},10)};var kx=()=>{let e=window.innerWidth-document.documentElement.clientWidth;document.documentElement.style.setProperty("--scrollbar-with",`${e}px`)},Nx=()=>{kx(),u.useResize(()=>{kx()})};var Px=({getProxi:e,bindEffect:t,bindText:r,watch:o,addMethod:n})=>{let s=e();return n("updateRawContent",i=>{s.rawContent=i.length===0?"":`${i} | <strong>fps: ${u.getInstantFps()}</strong>`}),o(()=>s.rawContent,i=>{let a=i.length>0;if(!a){s.visible=!1,s.content="";return}s.content=`${i}`,a&&(s.visible=!0)},{immediate:!0}),g`<p
        class="animation-description"
        ${t({toggleClass:{visible:()=>s.visible&&!s.navigationIsOpen}})}
    >
        ${r`${"content"}`}
    </p>`};var Ax=m.createComponent({tag:"animation-description",component:Px,bindStore:X,state:{rawContent:()=>({value:"",type:String}),content:()=>({value:"",type:String}),visible:()=>({value:!0,type:Boolean})}});var ci=!0,PR=({proxi:e,emit:t})=>{e.selectedNodes.forEach(r=>{let o=e.linkedList.find(n=>n.data.id===r);o&&(e.linkedList=e.linkedList.removeNode(o),e.currentNode=null,t(()=>e.currentNode)),o=null}),e.selectedNodes.clear(),t(()=>e.selectedNodes)},Ox=({proxi:e,emit:t,direction:r="up"})=>{e.selectedNodes.forEach(o=>{let n=e.linkedList.find(s=>s.data.id===o);n&&r==="up"&&n?.prev&&e.linkedList.moveBefore(n,n.prev),n&&r==="down"&&n?.next&&e.linkedList.moveAfter(n,n.next),n=null}),t(()=>e.linkedList)},AR=({proxi:e,emit:t})=>{if(e.selectedNodes.size!==2)return;let r=e.selectedNodes[Symbol.iterator](),o=r.next().value,n=r.next().value,s=e.linkedList.find(a=>a.data.id===o),i=e.linkedList.find(a=>a.data.id===n);!s||!i||(e.linkedList.swap(s,i),t(()=>e.linkedList),s=null,i=null)},OR=({proxi:e,delegateEvents:t,bindEffect:r,emit:o})=>{let n=bt().close,s=bt().previous,i=bt().up,a=bt().swap,c=bt().selectAll;return g`
        <ul class="c-custom-history__nav">
            <li class="c-custom-history__prev">
                <button
                    type="button"
                    ${r({toggleClass:{active:()=>!!(e.currentNode&&e.currentNode?.prev!==null)}})}
                    ${t({click:()=>{m.mainStore.getProp("routeIsLoading")||e.currentNode?.prev&&(ci=!1,e.currentNode=e.currentNode?.prev)}})}
                >
                    ${s}
                </button>
            </li>
            <li class="c-custom-history__next">
                <button
                    type="button"
                    ${r({toggleClass:{active:()=>!!(e.currentNode&&e.currentNode?.next!==null)}})}
                    ${t({click:()=>{m.mainStore.getProp("routeIsLoading")||e.currentNode?.next&&(ci=!1,e.currentNode=e.currentNode?.next)}})}
                >
                    ${s}
                </button>
            </li>
            <li class="c-custom-history__remove">
                <button
                    type="button"
                    ${r({toggleClass:{active:()=>e.selectedNodes.size>0}})}
                    ${t({click:()=>{PR({proxi:e,emit:o}),e.selectAllOn=!1}})}
                >
                    ${n}
                </button>
            </li>
            <li class="c-custom-history__up">
                <button
                    type="button"
                    ${r({toggleClass:{active:()=>e.selectedNodes.size===1}})}
                    ${t({click:()=>{Ox({emit:o,proxi:e,direction:"up"})}})}
                >
                    ${i}
                </button>
            </li>
            <li class="c-custom-history__down">
                <button
                    type="button"
                    ${r({toggleClass:{active:()=>e.selectedNodes.size===1}})}
                    ${t({click:()=>{Ox({emit:o,proxi:e,direction:"down"})}})}
                >
                    ${i}
                </button>
            </li>
            <li class="c-custom-history__swap">
                <button
                    type="button"
                    ${r({toggleClass:{active:()=>e.selectedNodes.size===2}})}
                    ${t({click:()=>{AR({proxi:e,emit:o})}})}
                >
                    ${a}
                </button>
            </li>
            <li class="c-custom-history__select-all">
                <button
                    type="button"
                    ${r({toggleClass:{active:()=>e.linkedList.size>0,"should-add":()=>e.selectAllOn}})}
                    ${t({click:()=>{e.selectAllOn=!e.selectAllOn}})}
                >
                    ${c}
                </button>
            </li>
        </ul>
    `},$x=({getProxi:e,computed:t,repeat:r,bindEffect:o,addMethod:n,staticProps:s,delegateEvents:i,bindProps:a,watch:c,emit:l})=>{let p=e();return c(()=>p.currentNode,d=>{m.loadUrl({url:d?.data.url,params:d?.data?.params,skipTransition:!0})}),t(()=>p.listParsed,()=>p.linkedList.toArray()),n("toggle",()=>{p.active=!p.active}),n("addRouteWithoutUpdate",({id:d})=>{p.currentNode=p.linkedList.find(f=>f.data.id===d),ci=!1,p.active=!1}),n("addSelectedNodes",({id:d,add:f})=>{f?p.selectedNodes.add(d):p.selectedNodes.delete(d),l(()=>p.selectedNodes)}),m.afterRouteChange(()=>{let d=m.getActiveParams(),f=m.getActiveRoute()?.route;if(ci&&f!==p.currentNode?.data.url){if(p.linkedList.size>=20){let h=p.linkedList.first;h&&(p.selectedNodes.delete(h.data.id),l(()=>p.selectedNodes)),p.linkedList.removeFirst(),h=null}p.currentNode&&(p.linkedList=p.linkedList.insertAfter(p.currentNode,{id:u.getUnivoqueId(),url:f,params:d}),p.currentNode=p.currentNode.next),p.currentNode||(p.linkedList=p.linkedList.addLast({id:u.getUnivoqueId(),url:f,params:d}),p.currentNode=p.linkedList.last)}ci=!0}),g`
        <div
            class="c-custom-history"
            ${o({toggleClass:{active:()=>p.active}})}
        >
            <div class="custom-history__head">
                <h5>Custom history navigation ( max 20 )</h5>
            </div>
            <button
                class="c-custom-history__close"
                ${i({click:()=>p.active=!1})}
            ></button>
            ${OR({proxi:p,delegateEvents:i,bindEffect:o,emit:l})}
            <div class="c-custom-history__container">
                ${r({observe:()=>p.listParsed,key:"id",render:({current:d})=>g`<history-item
                            ${s({id:d.value.id,url:d.value.url})}
                            ${a(()=>({active:p.currentNode?.data.id===d.value.id,forceSelect:p.selectAllOn}))}
                        ></history-item>`})}
            </div>
        </div>
    `};var Lx=()=>{hn(Yn)?.toggle()},Dx=({id:e})=>{hn(Yn)?.addRouteWithoutUpdate({id:e})},Fx=({id:e,add:t})=>{hn(Yn)?.addSelectedNodes({id:e,add:t})};function $R(e="",t=30){return e.length>t?`${e.slice(0,Math.max(0,t))} ...`:e}var Bx=({getProxi:e,delegateEvents:t,bindEffect:r,watch:o})=>{let n=e();return o(()=>n.checked,s=>{Fx({id:n.id,add:s})}),o(()=>n.forceSelect,s=>n.checked=s),g`<div class="c-history-item">
        <div class="c-history-item__checkbox">
            <input
                type="checkbox"
                id="${n.id}"
                ${r({toggleAttribute:{checked:()=>n.checked}})}
                ${t({click:s=>{n.checked=s.target.checked}})}
            />
            <span class="checkbox-control"></span>
        </div>
        <button
            type="button"
            class="c-history-item__button"
            ${t({click:()=>{Dx({id:n.id})}})}
            ${r({toggleClass:{active:()=>n.active}})}
        >
            ${$R(n.url)}
        </button>
    </div>`};var Vx=m.createComponent({tag:"history-item",component:Bx,props:{id:()=>({value:"",type:String}),url:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean}),forceSelect:()=>({value:!1,type:Boolean})},state:{checked:()=>({value:!1,type:Boolean})}});var Wx=m.createComponent({tag:"custom-history",component:$x,state:{linkedList:()=>({value:new sn,type:"any",skipEqual:!1}),listParsed:()=>({value:[],type:Array,skipEqual:!1}),currentNode:()=>({value:void 0,type:"any",skipEqual:!1}),selectedNodes:()=>({value:new Set,type:Set,skipEqual:!1}),active:()=>({value:!1,type:Boolean}),selectAllOn:()=>({value:!1,type:Boolean})},child:[Vx]});var ss="reset",hr="tree",li="filter_component";var fr=({screen:e,scroller:t,scrollbar:r})=>{let o;return{init:()=>{o||(o=new xt({screen:e,scroller:t,direction:"vertical",drag:!0,scopedEvent:!1,breakpoint:"desktop",onTick:({percent:n})=>{r.value=`${n}`},afterRefresh:({shouldScroll:n})=>{r?.classList.toggle("hide-scrollbar",!n)}}),o.init())},destroy:()=>{o?.destroy(),o=null},refresh:()=>{o?.refresh()},updateScroller:()=>{if(!o)return;let n=ie(t),s=ie(e),i=De(r),a=s/n*i;r.style.setProperty("--thumb-width",`${a}px`),o?.refresh()},move:n=>{o&&o.move(n).catch(()=>{})},goToTop:()=>{o?.set(0)}}};var is=u.createStore({currentId:()=>({value:"",type:String})});var jx=e=>e?[...e].reduce((t,r)=>`${t}.${r}`,""):"",zx=e=>Object.keys(e).reduce((t,r)=>`${t} ${r},`,""),LR=e=>Object.entries(e).map(([t,r])=>g`<div>
                <strong>${t}:</strong>
                ${r.map(o=>g`${o}, `).join(".")}
            </div>`).join(""),DR=e=>e?e.map(t=>`${t}, `).join(""):"",Hx=e=>Object.entries(e).map(([t,r])=>g`<div>
                <strong>${t}:</strong>
                ${JSON.stringify(r)}
            </div>`).join(""),FR=({getState:e})=>{let{id:t}=e();if(t===ss)return"";let r=m.componentMap.get(t);return r?g`<div>
        <!-- Basic props -->
        <div><strong>id</strong>: ${t}</div>
        <div><strong>parent id</strong>: ${r.parentId}</div>
        <div>
            <strong>component root</strong>:
            ${r.element.tagName}${jx(r.element.classList)}
        </div>
        <div><strong>componentName</strong>: ${r.componentName}</div>
        <div><strong>instance name:</strong>: ${r.instanceName}</div>
        <div><strong>methods:</strong>: ${zx(r.methods)}</div>
        <div><strong>refs:</strong>: ${zx(r.refs)}</div>
        <div><strong>persistent:</strong>: ${r.persistent}</div>

        <!-- Children -->
        <h3 class="c-debug-component__section-title">Children:</h3>
        <div>${LR(r?.child??{})}</div>

        <!-- Repeater -->
        <h3 class="c-debug-component__section-title">Repeater props:</h3>
        <div>
            <strong>component repeater id</strong>: ${r.componentRepeatId}
        </div>
        <div><strong>repeater state bind</strong>: ${r.repeatPropBind}</div>
        <div>
            <strong>repeater inner wrapper</strong>:
            ${r?.repeaterInnerWrap?.tagName}${jx(r?.repeaterInnerWrap?.classList)}
        </div>
        <div><strong>repeat key</strong>: ${r.key}</div>
        <div>
            <strong>repeat current state</strong>:
            ${JSON.stringify(r.currentRepeaterState?.current)}
        </div>
        <div>
            <strong>repeat current index</strong>:
            ${JSON.stringify(r.currentRepeaterState?.index)}
        </div>

        <!-- State -->
        <h3 class="c-debug-component__section-title">State:</h3>
        <div>
            <strong>Freezed prop:</strong>
            ${DR(r?.freezedPros)}
        </div>
        <div>
            <h4 class="c-debug-component__section-subtitle">
                States current values:
            </h4>
            ${Hx(r.state.get())}
        </div>
        <div>
            <h4 class="c-debug-component__section-subtitle">
                States current validation:
            </h4>
            ${Hx(r.state.getValidation())}
        </div>
    </div>`:"component not found"},BR=({getRef:e})=>{let{screen:t,scroller:r,scrollbar:o}=e();o.addEventListener("input",()=>{c(o.value)});let n=fr({screen:t,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},Ux=({onMount:e,addMethod:t,getState:r,invalidate:o,setRef:n,getRef:s,watch:i,getProxi:a,emit:c})=>{let l=a();t("updateId",d=>{l.id=d,is.set("currentId",d)}),t("refreshId",()=>{c(()=>l.id)});let p;return e(()=>{let{destroy:d,updateScroller:f,move:h,refresh:v}=BR({getRef:s});return p=h,i(()=>l.id,async()=>{await m.tick(),v(),f(),p(0)}),()=>{d?.()}}),g`<div class="c-debug-component" ${n("screen")}>
        <input
            type="range"
            id="test"
            name="test"
            min="0"
            max="100"
            value="0"
            step=".5"
            ${n("scrollbar")}
            class="c-debug-component__scrollbar"
        />
        <div class="c-debug-component__container" ${n("scroller")}>
            ${o({observe:()=>l.id,render:()=>FR({getState:r})})}
        </div>
    </div>`};var Gx=m.createComponent({tag:"debug-component",component:Ux,state:{id:()=>({value:ss,type:String,skipEqual:!1})}});var qx=e=>{m.useMethodByName(nc)?.refreshList?.({testString:e})};var hp=async(e="")=>{await m.tick(),qx(e)},Jx=({onMount:e,setRef:t,getRef:r,delegateEvents:o})=>(e(()=>(hp(),()=>{r()?.input.remove()})),g`<div class="c-debug-filter-head">
        <span class="c-debug-filter-head__title">Filter by tag</span>
        <input
            type="text"
            class="c-debug-filter-head__input"
            value=""
            ${t("input")}
            ${o({keydown:n=>{if(n.code.toLowerCase()==="enter"){n.preventDefault();let s=n.target.value;hp(s)}}})}
        />
        <button
            class="c-debug-filter-head__button"
            type="button"
            ${o({click:()=>{let{input:n}=r(),s=n.value;hp(s)}})}
        >
            find
        </button>
    </div>`);var Yx=m.createComponent({tag:"debug-filter-head",component:Jx});var VR=async({getRef:e})=>{await m.tick();let{screen:t,scroller:r,scrollbar:o}=e(),n=fr({screen:t,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},Xx=e=>`~${e}`,WR=({testString:e})=>{let t=e.replaceAll("~","").split(" ").filter(r=>r!=="")??"";return(()=>{let r=[];for(let o of m.componentMap.values())t.every(s=>o.componentName.includes(s))&&r.push(o);return r})().map(({id:r,componentName:o,instanceName:n})=>({id:r,active:!1,tag:(()=>{let s=t.reduce((i,a,c)=>i.replaceAll(new RegExp(`(?<!~)${a.toLowerCase()}`,"g"),`${Xx(c)}`),o);return t.reduce((i,a,c)=>i.replaceAll(`${Xx(c)}`,`<span class="match-string">${a}</span>`),s)})(),name:n}))},Kx=({onMount:e,setRef:t,getRef:r,addMethod:o,repeat:n,staticProps:s,bindProps:i,bindEffect:a,getProxi:c,computed:l})=>{let p=c(),d=()=>{},f=()=>{},h=()=>{},v=()=>{};return l(()=>p.noResult,()=>p.data.length===0&&!p.isLoading),o("refreshList",async({testString:b})=>{p.isLoading=!0,await m.tick(),u.useNextTick(async()=>{p.data=WR({testString:b}),await m.tick(),h?.(),v?.(),p.isLoading=!1})}),e(()=>{let{scrollbar:b}=r();return b.addEventListener("input",()=>{f(b.value)}),(async()=>({destroy:d,move:f,refresh:h,updateScroller:v}=await VR({getRef:r})))(),()=>{d?.(),d=()=>{},h=()=>{},v=()=>{},f=()=>{}}}),g`
        <div class="c-debug-filter-list">
            <div class="c-debug-filter-list__list" ${t("screen")}>
                <input
                    type="range"
                    id="test"
                    name="test"
                    min="0"
                    max="100"
                    value="0"
                    step=".5"
                    ${t("scrollbar")}
                    class="c-debug-filter-list__scrollbar"
                />
                <span
                    class="c-debug-filter-list__status"
                    ${a({toggleClass:{visible:()=>p.isLoading}})}
                    >Generate list</span
                >
                <span
                    class="c-debug-filter-list__status"
                    ${a({toggleClass:{visible:()=>p.noResult}})}
                    >no result</span
                >
                <div
                    class="c-debug-filter-list__scroller"
                    ${t("scroller")}
                >
                    ${n({observe:()=>p.data,key:"id",useSync:!0,render:({sync:b,current:T})=>g`
                                <debug-filter-list-item
                                    ${s({id:T.value.id,name:T.value.name})}
                                    ${i(()=>({tag:T.value.tag}))}
                                    ${b()}
                                ></debug-filter-list-item>
                            `})}
                </div>
            </div>
        </div>
    `};var gr=e=>{m.useMethodByName(Ks)?.updateId(e)},Qx=()=>{m.useMethodByName(Ks)?.refreshId()};var Zx=({delegateEvents:e,bindText:t,bindEffect:r,getProxi:o,computed:n})=>{let s=o();return n(()=>s.active,()=>s.id===s.currentId),g`
        <div class="c-debug-filter-list-item">
            <span class="c-debug-filter-list-item__id">${s.id}</span> |
            <span class="c-debug-filter-list-item__tag"
                >${t`${"tag"}`}</span
            >
            |
            <span class="c-debug-filter-list-item__name">${s.name}</span>
            <button
                type="button"
                class="c-debug-filter-list-item__expand"
                ${e({click:()=>{gr(s.id)}})}
            >
                [ > ]
            </button>
            <span
                class="c-debug-tree-item__selected"
                ${r({toggleClass:{active:()=>s.active}})}
            ></span>
        </div>
    `};var e0=m.createComponent({tag:"debug-filter-list-item",component:Zx,bindStore:is,props:{id:()=>({value:"",type:String}),tag:()=>({value:"",type:String}),name:()=>({value:"",type:String})},state:{active:()=>({value:!1,type:Boolean})}});var t0=m.createComponent({tag:"debug-filter-list",component:Kx,state:{data:()=>({value:[],type:Array}),isLoading:()=>({value:!0,type:Boolean}),noResult:()=>({value:!1,type:Boolean})},child:[e0]});var r0=({invalidate:e,getProxi:t})=>{let r=t();return g`<div class="c-debug-head">
        <div class="c-debug-head__general">
            ${e({observe:()=>r.active,render:()=>r.active?g`
                        <div>
                            <strong> Debug activated: </strong>
                            ${m.getDebugMode()}
                        </div>
                        <div class="c-debug-head__total">
                            <strong>Number of component</strong>:
                            ${m.componentMap.size} ( excluded generated
                            debug )
                        </div>
                        <div class="c-debug-head__repeater">
                            <strong>Active repeater: </strong>:
                            ${m.getNumberOfActiveRepeater()}
                        </div>
                        <div class="c-debug-head__invalidate">
                            <strong>Active invalidate: </strong>:
                            ${m.getNumberOfActiveInvalidate()}
                        </div>
                    `:""})}
        </div>
        <div class="c-debug-head__search">
            <div>
                <debug-search></debug-search>
            </div>
        </div>
    </div>`};var o0=({setRef:e,getRef:t,delegateEvents:r})=>g`<div class="c-debug-search">
        <div>
            <span class="c-debug-search__label">
                <strong>Search by ID:</strong>
            </span>
            <input
                class="c-debug-search__input"
                type="text"
                ${e("id_input")}
                ${r({keydown:o=>{if(o.code.toLowerCase()==="enter"){o.preventDefault();let n=o.target.value;gr(n??"")}}})}
            />
            <button
                class="c-debug-search__button"
                type="button"
                ${r({click:()=>{let{id_input:o}=t(),n=o.value;gr(n??"")}})}
            >
                find
            </button>
        </div>
        <div>
            <span class="c-debug-search__label">
                <strong>Search by InstanceName:</strong>
            </span>
            <input
                class="c-debug-search__input"
                type="text"
                ${e("instance_input")}
                ${r({keydown:o=>{if(o.code.toLowerCase()==="enter"){o.preventDefault();let n=o.target.value,s=m.getIdByInstanceName(n);gr(s??"")}}})}
            />
            <button
                class="c-debug-search__button"
                type="button"
                ${r({click:()=>{let{instance_input:o}=t(),n=o.value,s=m.getIdByInstanceName(n);gr(s??"")}})}
            >
                find
            </button>
            <div>
                <span class="c-debug-search__label">
                    <strong>Clear:</strong>
                </span>
                <button
                    class="c-debug-search__button"
                    type="button"
                    ${r({click:()=>{let{instance_input:o,id_input:n}=t();o.value="",n.value="",gr(ss)}})}
                >
                    clear
                </button>
            </div>
            <div>
                <span class="c-debug-search__label">
                    <strong>Refresh:</strong>
                </span>
                <button
                    class="c-debug-search__button"
                    type="button"
                    ${r({click:()=>{Qx()}})}
                >
                    refresh component
                </button>
            </div>
        </div>
    </div>`;var n0=m.createComponent({tag:"debug-search",component:o0});var s0=m.createComponent({tag:"debug-head",component:r0,props:{active:()=>({value:!1,type:Boolean})},state:{shouldUpdate:()=>({value:!0,type:Boolean,skipEqual:!1})},child:[n0]});var kc=()=>{m.mainStore.debugStore(),console.log("componentMap",m.componentMap),console.log("Tree structure:",m.getTree()),console.log("bindEventMap",Cn),console.log("currentListValueMap",Ts),console.log("activeRepeatMap",wn),console.log("onMountCallbackMap",_s),console.log("staticPropsMap",In),console.log("dynamicPropsMap",_t),console.log("eventDelegationMap",m.eventDelegationMap),console.log("tempDelegateEventMap",m.tempDelegateEventMap),console.log("invalidateIdHostMap",Jr.size),console.log("invalidateIdsMap",Qe),console.log("invalidateInstancesMap",be),console.log("repeatIdHostMap",Hr),console.log("repeatIdsMap",Ze),console.log("repeatInstancesMap",Y),console.log("userChildPlaceholderSize",eh()),console.log("slotPlaceholderSize",qi()),console.log("bindTextPlaceholderMapSize",Lh()),console.log("instanceMap",Ur)};var i0=({delegateEvents:e,addMethod:t,bindProps:r,invalidate:o,bindEffect:n,getProxi:s,onMount:i})=>{let a=s();return t("toggle",()=>{a.active=!a.active}),i(()=>{let c=m.beforeRouteChange(()=>{a.active=!1,a.listType=hr});return()=>{c()}}),g`<div
        class="c-debug-overlay"
        ${n({toggleClass:{active:()=>a.active}})}
    >
        <button
            class="c-debug-overlay__background"
            type="button"
            ${e({click:()=>{a.active=!1,a.listType=hr}})}
        ></button>
        <button
            type="button"
            class="c-debug-overlay__close"
            ${e({click:()=>{a.active=!1,a.listType=hr}})}
        ></button>
        <div class="c-debug-overlay__grid">
            <button
                type="button"
                class="c-debug-overlay__log"
                ${e({click:()=>{kc()}})}
            >
                console log
            </button>

            <div class="c-debug-overlay__head">
                <debug-head
                    ${r(()=>({active:a.active}))}
                ></debug-head>
            </div>
            <div class="c-debug-overlay__list">
                <div class="c-debug-overlay__list__header">
                    <div>
                        ${o({observe:[()=>a.listType,()=>a.active],render:()=>a.listType===hr&&a.active?g`<div
                                        class="c-debug-overlay__list__title"
                                    >
                                        Tree structure
                                    </div>`:a.listType===li&&a.active?g`<debug-filter-head></debug-filter-head>`:""})}
                    </div>

                    <div class="c-debug-overlay__list__ctas">
                        <button
                            type="button"
                            class="c-debug-overlay__list__toggle"
                            ${e({click:()=>{a.listType=hr}})}
                            ${n({toggleClass:{active:()=>a.listType===hr}})}
                        >
                            Tree
                        </button>
                        <button
                            type="button"
                            class="c-debug-overlay__list__toggle"
                            ${e({click:()=>{a.listType=li}})}
                            ${n({toggleClass:{active:()=>a.listType===li}})}
                        >
                            Filter
                        </button>
                    </div>
                </div>
                <div>
                    ${o({observe:[()=>a.listType,()=>a.active],render:()=>a.listType===hr&&a.active?g`
                                    <debug-tree
                                        name="${ic}"
                                    ></debug-tree>
                                `:a.listType===li&&a.active?g`
                                    <debug-filter-list
                                        name="${nc}"
                                    ></debug-filter-list>
                                `:""})}
                </div>
            </div>
            <div class="c-debug-overlay__component">
                <debug-component name="${Ks}"></debug-component>
            </div>
        </div>
    </div>`};var Nc=({data:e,staticProps:t})=>e.map(({id:r,componentName:o,instanceName:n,children:s})=>g`<debug-tree-item
                ${t({id:r,componentName:o,instanceName:n,children:s})}
            ></debug-tree-item>`).join("");var jR=async({getRef:e})=>{await m.tick();let{screen:t,scroller:r,scrollbar:o}=e(),n=fr({screen:t,scroller:r,scrollbar:o}),s=n.destroy,i=n.refresh,a=n.move,c=n.updateScroller;return n.init(),c(),a(0),{destroy:s,refresh:i,move:a,updateScroller:c}},a0=({onMount:e,invalidate:t,staticProps:r,setRef:o,getRef:n,addMethod:s,bindEffect:i,getProxi:a})=>{let c=a(),l=()=>{},p=()=>{},d=()=>{},f=()=>{};return e(()=>{let{scrollbar:h}=n();return h.addEventListener("input",()=>{f(h.value)}),s("refresh",()=>{p?.(),d?.()}),(async()=>(c.isLoading=!0,await m.tick(),l?.(),c.data=m.getTree(),{destroy:l,move:f,refresh:p,updateScroller:d}=await jR({getRef:n}),c.isLoading=!1))(),()=>{l?.(),l=()=>{},p=()=>{},d=()=>{},f=()=>{}}}),g`
        <div class="c-debug-tree">
            <div class="c-debug-tree__list" ${o("screen")}>
                <input
                    type="range"
                    id="test"
                    name="test"
                    min="0"
                    max="100"
                    value="0"
                    step=".5"
                    ${o("scrollbar")}
                    class="c-debug-tree__scrollbar"
                />
                <span
                    class="c-debug-tree__status"
                    ${i({toggleClass:{visible:()=>c.isLoading}})}
                    >Generate tree</span
                >
                <div class="c-debug-tree__scroller" ${o("scroller")}>
                    ${t({observe:()=>c.data,render:()=>Nc({data:c.data,staticProps:r})})}
                </div>
            </div>
        </div>
    `};var c0=()=>{m.useMethodByName(ic)?.refresh()};var zR=e=>e>0?`( ${e} ) `:"",l0=({id:e,value:t})=>{let o=m.componentMap.get(e)?.child;if(!o)return!1;let n=Object.values(o).flat();return n.includes(t)?!0:n.some(i=>l0({id:i,value:t}))},u0=({onMount:e,staticProps:t,getRef:r,setRef:o,delegateEvents:n,watch:s,bindEffect:i,getProxi:a,computed:c})=>{let l=a(),p=l.children.length>0?"has-children":"";return c(()=>l.isActive,()=>l.id===l.currentId),c(()=>l.hasActiveChildren,()=>l0({id:l.id,value:l.currentId})),e(()=>{let{content:d}=r(),f=$r.subscribe(d);return $r.reset(d),s(()=>l.isOpen,async h=>{await $r[h?"down":"up"](d),c0()}),()=>{f()}}),g`<div class="c-debug-tree-item">
        <div
            class="c-debug-tree-item__head ${p}"
            ${n({click:()=>{l.isOpen=!l.isOpen}})}
            ${i([{toggleClass:{open:()=>l.isOpen}},{toggleClass:{"has-children-selected":()=>l.hasActiveChildren}}])}
        >
            <span class="c-debug-tree-item__id">${l.id}</span> |
            <span class="c-debug-tree-item__component"
                >${l.componentName}</span
            >
            |
            <span class="c-debug-tree-item__instance"
                >${l.instanceName}</span
            >
            <span>${zR(l.children.length)}</span>
            <button
                type="button"
                class="c-debug-tree-item__expand"
                ${n({click:()=>{gr(l.id)}})}
            >
                [ > ]
            </button>
            <span
                class="c-debug-tree-item__selected"
                ${i({toggleClass:{active:()=>l.isActive}})}
            ></span>
        </div>
        <div class="c-debug-tree-item__content" ${o("content")}>
            ${Nc({data:l.children,staticProps:t})}
        </div>
    </div>`};var p0=m.createComponent({tag:"debug-tree-item",component:u0,bindStore:is,props:{id:()=>({value:"",type:String}),componentName:()=>({value:"",type:String}),instanceName:()=>({value:"",type:String}),children:()=>({value:[],type:Array})},state:{isOpen:()=>({value:!1,type:Boolean}),isActive:()=>({value:!1,type:Boolean}),hasActiveChildren:()=>({value:!1,type:Boolean})}});var m0=m.createComponent({tag:"debug-tree",component:a0,state:{data:()=>({value:[],type:Array}),isLoading:()=>({value:!1,type:Boolean})},child:[p0]});var d0=m.createComponent({tag:"debug-overlay",component:i0,state:{active:()=>({value:!1,type:Boolean}),listType:()=>({value:hr,type:String})},child:[m0,Gx,s0,Yx,t0]});var fp=()=>{},Pc=()=>{},Ac=()=>{},Oc=()=>{},HR=({staticProps:e,bindProps:t,proxi:r})=>r.data.map(o=>{let{label:n,url:s,isLabel:i}=o;return i?g`<p class="c-params-mobjs__label">${n}</p>`:g`<li>
                      <links-mobjs-button
                          ${e({label:n,url:s})}
                          ${t(()=>({active:r.activeSection===s}))}
                      ></links-mobjs-button>
                  </li>`}).join(""),h0=({staticProps:e,setRef:t,getRef:r,onMount:o,bindProps:n,invalidate:s,bindEffect:i,getProxi:a})=>{let c=mr(),l=a(),p={[Z]:c.sideBarLinks.mobJsComponentParams};return o(()=>{let{screenEl:d,scrollerEl:f,scrollbar:h}=r(),v=!1;h.addEventListener("input",()=>{Ac?.(h.value)}),X.watch("navigationIsOpen",T=>{let{templateName:_}=m.getActiveRoute();_ in p&&(l.shift=T)});let b=m.afterRouteChange(async({currentTemplate:T,currentRoute:_})=>{let S=p?.[T]??[];if(l.data=S,await m.tick(),l.activeSection=_,S.length>0){if(l.hide=!1,v){Oc();return}({init:fp,destroy:Pc,move:Ac,updateScroller:Oc}=fr({screen:d,scroller:f,scrollbar:h})),v=!0,fp(),Oc(),Ac(0)}S.length===0&&(l.hide=!0,Pc?.(),v=!1)});return()=>{Pc?.(),b(),fp=()=>{},Pc=()=>{},Ac=()=>{},Oc=()=>{}}}),g`<div
        class="c-params-mobjs"
        ${t("screenEl")}
        ${i({toggleClass:{hide:()=>l.hide,shift:()=>l.shift}})}
    >
        <input
            type="range"
            id="test"
            name="test"
            min="0"
            max="100"
            value="0"
            step=".5"
            ${t("scrollbar")}
            class="c-params-mobjs__scrollbar"
        />
        <ul ${t("scrollerEl")}>
            ${s({observe:()=>l.data,render:()=>HR({staticProps:e,bindProps:n,proxi:l})})}
        </ul>
    </div>`};var f0=({getProxi:e,bindEffect:t})=>{let r=e();return g` <a
        href="./#${r.url}"
        ${t({toggleClass:{current:()=>r.active}})}
        ><span>${r.label}</span></a
    >`};var g0=m.createComponent({tag:"links-mobjs-button",component:f0,props:{label:()=>({value:"",type:String}),url:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean})}});var b0=m.createComponent({tag:"links-mobjs",component:h0,child:[g0],state:{data:()=>({value:[],type:Array}),activeSection:()=>({value:"",type:String}),hide:()=>({value:!1,type:Boolean}),shift:()=>({value:!1,type:Boolean})}});var y0=({getProxi:e,bindEffect:t,addMethod:r})=>{let o=e();return r("update",(n,s)=>{o[n]=s}),g`<div
        class="c-quick-nav-container"
        ${t([{toggleClass:{active:()=>o.active}}])}
    >
        <a
            class="c-quick-nav c-quick-nav--back"
            ${t({toggleClass:{"is-disable":()=>!o.backRoute},toggleAttribute:{href:()=>{let n=o.backRoute;return n.length>0?n:null}}})}
        ></a>
        <a
            class="c-quick-nav c-quick-nav--prev"
            ${t({toggleClass:{"is-disable":()=>!o.prevRoute},toggleAttribute:{href:()=>{let n=o.prevRoute;return n.length>0?n:null}}})}
        ></a>
        <a
            class="c-quick-nav c-quick-nav--next"
            ${t({toggleClass:{"is-disable":()=>!o.nextRoute},toggleAttribute:{href:()=>{let n=o.nextRoute;return n&&n.length>0?n:null}}})}
        ></a>
    </div>`};var v0=m.createComponent({tag:"quick-nav",component:y0,state:{active:()=>({value:!1,type:Boolean}),backRoute:()=>({value:"",type:String}),prevRoute:()=>({value:"",type:String}),nextRoute:()=>({value:"",type:String})}});var UR=({proxi:e,bindEffect:t})=>e.data.map(({label:r,url:o})=>{let n=o.replaceAll("#","");return g`
                <li class="right-sidebar__item">
                    <a
                        href="${o}"
                        class="right-sidebar__link"
                        ${t({toggleClass:{active:()=>e.activeRoute.route===n}})}
                        >${r}</a
                    >
                </li>
            `}).join(""),T0=({getProxi:e,invalidate:t,addMethod:r,computed:o,bindEffect:n})=>{let s=e();return r("updateList",i=>{s.data=i}),m.afterRouteChange(({currentTemplate:i})=>{Mc.has(i)||(s.data=[])}),o(()=>s.isVisible,()=>s.data.length>0),g`<div
        class="right-sidebar"
        ${n({toggleClass:{visible:()=>s.isVisible}})}
    >
        <div class="right-sidebar__title">Sections:</div>
        <ul class="right-sidebar__list">
            ${t({observe:()=>s.data,render:()=>UR({proxi:s,bindEffect:n})})}
        </ul>
    </div>`};var S0=m.createComponent({tag:"right-sidebar",component:T0,bindStore:[m.mainStore],state:{data:()=>({value:[],type:Array}),isVisible:()=>({value:!1,type:Boolean})}});var _0=({onMount:e,getProxi:t,bindEffect:r,addMethod:o})=>{let n=t();return o("skip",()=>{n.skip=!1}),e(({element:s})=>{n.isDisable=!0;let i=H.createTimeTween({data:{opacity:1,scale:1},duration:500});i.subscribe(({opacity:l,scale:p})=>{s.style.opacity=l,s.style.transform=`scale(${p})`});let a=m.beforeRouteChange(async()=>{n.skip||(n.isDisable=!1,await i.set({opacity:1}),i.goTo({scale:1}))}),c=m.afterRouteChange(async()=>{await i.goTo({opacity:0,scale:.9}).catch(()=>{}),n.isDisable=!0});return()=>{i.destroy(),i=null,a(),c()}}),g`
        <div
            class="c-loader center-viewport"
            ${r({toggleClass:{disable:()=>n.isDisable}})}
        >
            <span class="c-loader__inner"></span>
        </div>
    `};var x0=m.createComponent({tag:"route-loader",component:_0,state:{isLoading:()=>({value:!1,type:Boolean}),isDisable:()=>({value:!1,type:Boolean}),skip:()=>({value:!0,type:Boolean})}});var C0=({getProxi:e,bindEffect:t,addMethod:r})=>{let o=e();return r("update",n=>{o.active=n}),g`
        <div
            class="c-scroller-down-label"
            ${t({toggleClass:{active:()=>o.active}})}
        >
            Scroll down
        </div>
    `};var E0=m.createComponent({tag:"scroll-down-label",component:C0,state:{active:()=>({value:!1,type:Boolean})}});var w0=()=>{m.useMethodByName(Ho)?.setInputFocus()},gp=e=>{m.useMethodByName(Ho)?.updateCurrentSearchFromSuggestion(e)},I0=e=>{m.useMethodByName(Ho)?.shouldCloseSuggestion(e)},$c=()=>{m.useMethodByName(Ho)?.closeSuggestion()};var M0=({proxi:e})=>{e.active=!1,$c()},GR=({currentTarget:e})=>{e&&I0(e)},R0=({getProxi:e,delegateEvents:t,bindEffect:r,addMethod:o,bindObject:n,staticProps:s})=>{let i=e();return o("toggle",()=>{i.active=!i.active}),g`<div
        class="search-overlay"
        ${r({toggleClass:{active:()=>i.active}})}
    >
        <button
            class="search-overlay__background"
            type="button"
            ${t({click:()=>{M0({proxi:i})}})}
        ></button>
        <button
            type="button"
            class="search-overlay__close"
            ${t({click:()=>{M0({proxi:i})}})}
        ></button>

        <!-- Main content -->
        <div
            class="search-overlay__grid"
            ${t({click:a=>{GR({currentTarget:a.currentTarget})}})}
        >
            <!-- Title -->
            <h2 class="search-overlay__title">Search</h2>

            <!-- Header -->
            <div class="search-overlay__header">
                <search-overlay-header
                    name="${Ho}"
                ></search-overlay-header>
            </div>
            <div class="search-overlay__current-search">
                <p>
                    ${n`search for: <strong>${()=>i.currentSearch}</strong>`}
                </p>
            </div>

            <!-- List -->
            <div class="search-overlay__list">
                <search-overlay-list
                    ${s({updatePrentSearchKey:a=>{i.currentSearch=a}})}
                    name="${ri}"
                ></search-overlay-list>
            </div>
        </div>
    </div>`};var k0=e=>{m.useMethodByName(ri)?.update(e)},N0=()=>{m.useMethodByName(ri)?.reset()};var qR=async({currentSearch:e})=>{k0(e)},bp=({getRef:e})=>{let{search_input:t}=e(),r=t.value;qR({currentSearch:r})},P0=({getRef:e,proxi:t})=>{N0();let{search_input:r}=e();r.value="",t.suggestionListData=[]},A0=e=>`~${e}`,JR=({currentSearch:e,proxi:t})=>{let o=mr().suggestion;e.length===0&&(t.suggestionListData=[]);let s=e.split(" ").slice(-1).join("").replaceAll("~","").split(" ").filter(i=>i!=="")??"";t.suggestionListData=(o.filter(({word:i})=>s.some(a=>i.toLowerCase().includes(a.toLowerCase())))??[]).map(({word:i})=>({word:i,wordHiglight:(()=>{let a=s.reduce((c,l,p)=>c.toLowerCase().replaceAll(new RegExp(`(?<!~)${l.toLowerCase()}`,"g"),`${A0(p)}`),i);return s.reduce((c,l,p)=>c.replaceAll(`${A0(p)}`,`<span class="match-string">${l}</span>`),a)})()}))},O0=({delegateEvents:e,getRef:t,setRef:r,getProxi:o,bindProps:n,addMethod:s,onMount:i,computed:a,bindEffect:c})=>{let l=o();return a(()=>l.suggestionListActive,()=>l.suggestionListData.length>0),i(()=>{let{search_input:p,suggestionElement:d}=t();s("updateCurrentSearchFromSuggestion",f=>{let v=p.value.split(" "),b=v.length===0?f:`${v.slice(0,-1).join(" ")} ${f}`;p.value=b.trimStart(),l.suggestionListData=[],p.focus()}),s("shouldCloseSuggestion",f=>{d!==f&&!d.contains(f)&&(l.suggestionListData=[])}),s("closeSuggestion",()=>{l.suggestionListData=[]}),s("setInputFocus",async()=>{setTimeout(()=>{p.focus()},300)})}),g`<div class="search-overlay-header">
        <div class="search-overlay-header__input-container">
            <input
                type="text"
                class="search-overlay-header__input"
                ${r("search_input")}
                ${e({keyup:u.useDebounce(p=>{if(p.code.toLowerCase()==="enter"){p.preventDefault(),bp({getRef:t,proxi:l}),l.suggestionListData=[];return}if(p.code.toLowerCase()==="escape"){p.preventDefault(),l.suggestionListData=[];return}let d=p.target.value;JR({currentSearch:d,proxi:l})},60)})}
            />
            <div
                class="search-overlay-header__suggestion-container"
                ${r("suggestionElement")}
                ${c({toggleClass:{active:()=>l.suggestionListActive}})}
            >
                <search-overlay-suggestion
                    ${n(()=>({list:l.suggestionListData}))}
                ></search-overlay-suggestion>
            </div>
        </div>

        <!-- Submit -->
        <button
            type="button"
            class="search-overlay-header__button"
            ${e({click:()=>{bp({getRef:t,proxi:l})},keydown:p=>{p.code.toLowerCase()==="enter"&&bp({getRef:t,proxi:l})}})}
        >
            submit
        </button>

        <!-- Reset -->
        <button
            type="button"
            class="search-overlay-header__button"
            ${e({click:()=>{P0({getRef:t,proxi:l})},keydown:p=>{p.code.toLowerCase()==="enter"&&P0({getRef:t,proxi:l})}})}
        >
            reset
        </button>
    </div>`};var $0=({getProxi:e,repeat:t,bindProps:r})=>{let o=e();return g`<div>
        <div class="search-overlay-suggestion">
            <ul class="search-overlay-suggestion__list">
                ${t({observe:()=>o.list,key:"word",render:({current:n})=>g`
                            <search-overlay-suggestion-item
                                ${r(()=>({word:n.value.word,wordHiglight:n.value.wordHiglight}))}
                            >
                            </search-overlay-suggestion-item>
                        `})}
            </ul>
        </div>
    </div>`};var YR=({code:e,word:t})=>{if(e.toLowerCase()==="enter"){gp(t);return}if(e.toLowerCase()==="escape"){$c();return}},L0=({getProxi:e,delegateEvents:t,bindObject:r})=>{let o=e();return g`
        <li class="search-overlay-suggestion__item">
            <button
                type="button"
                class="search-overlay-suggestion__button"
                ${t({click:()=>{gp(o.word)},keydown:n=>{n.preventDefault(),YR({code:n.code,word:o.word})}})}
            >
                ${r`${()=>o.wordHiglight}`}
            </button>
        </li>
    `};var D0=m.createComponent({tag:"search-overlay-suggestion-item",component:L0,props:{word:()=>({value:"",type:String}),wordHiglight:()=>({value:"",type:String})}});var F0=m.createComponent({tag:"search-overlay-suggestion",component:$0,props:{list:()=>({value:[],type:Array})},child:[D0]});var B0=m.createComponent({tag:"search-overlay-header",component:O0,state:{suggestionListActive:()=>({value:!1,type:Boolean}),suggestionListData:()=>({value:[],type:Array})},child:[F0]});var XR=async({source:e,uri:t,title:r,section:o,breadCrumbs:n})=>{let s=await fetch(e);return s.ok?{success:!0,data:(await s.json()).data,uri:t,title:r,section:o,breadCrumbs:n}:(console.warn(`${e} not found`),{success:!1,data:[{component:"",props:{}}],uri:t,title:r,section:o,breadCrumbs:[]})},KR=new Set(["mob-title","mob-paragraph","mob-list"]),QR=new Set(["mob-title","mob-paragraph"]),ZR=new Set(["mob-list"]),V0=async({currentSearch:e=""})=>{let t=Rc.filter(({props:a})=>a?.source&&a?.title).map(({hash:a,props:c})=>({fn:XR({source:c.source??"",uri:a??"uri not forud",title:c.title??"title not found",section:c.section??"title not found",breadCrumbs:c.breadCrumbs??[]})})),r=await Promise.all(t.map(({fn:a})=>a)),o=[],n=r.filter(({success:a})=>a).map(({data:a,uri:c,title:l,section:p,breadCrumbs:d})=>{let v=a.reduce((b,T)=>{if(!T)return b;let{component:_}=T;return _?T.component==="html-content"?T?.props?.data?[...b,T.props.data]:b:[...b,T]:b},o).flat().filter(({component:b})=>KR.has(b)).flatMap(b=>QR.has(b?.component)?b.content:ZR.has(b?.component)?b?.props?.links?b.props.items.map(({label:T})=>T):b.props.items:b);return{uri:c,title:l,section:p,breadCrumbs:d,data:v}}),s=e.split(" ");return n.filter(a=>{let c=a.data.join(" ");return s.every(l=>c.toLowerCase().includes(l.toLowerCase()))}).toSorted(a=>a.title.toLowerCase().includes(e.toLowerCase())?-1:1).map(({title:a,uri:c,section:l,breadCrumbs:p,data:d})=>{let f=d.join("").toLowerCase().split(e.toLowerCase()),h=p.length>0?p.reduce((v,b,T)=>{let _=T>0?"/":"";return`${v}${_}${b.title}`},""):a;return{title:a,uri:c,section:l,breadCrumbs:h,count:f?.length??0}})};var ek=({getRef:e})=>{let{screen:t,scroller:r,scrollbar:o}=e();o.addEventListener("input",()=>{c(o.value)});let n=fr({screen:t,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},W0=({getProxi:e,repeat:t,setRef:r,getRef:o,onMount:n,watch:s,addMethod:i,bindEffect:a,invalidate:c,bindProps:l})=>{let p=e();i("update",async f=>{p.loading||(p.loading=!0,p.noResult=!1,p.list=await V0({currentSearch:f}),p.loading=!1,p.noResult=p.list.length===0,p.updatePrentSearchKey(f))}),i("reset",()=>{p.updatePrentSearchKey(""),p.list=[]});let d;return n(()=>{let{destroy:f,updateScroller:h,move:v,refresh:b}=ek({getRef:o});return d=v,s(()=>p.list,async()=>{await m.tick(),b(),h(),d(0)}),()=>{f?.()}}),g`<div class="search-overlay-list" ${r("screen")}>
        <span
            class="search-overlay-list__loading"
            ${a({toggleClass:{active:()=>p.loading}})}
            >fetch data</span
        >
        <input
            type="range"
            id="test"
            name="test"
            min="0"
            max="100"
            value="0"
            step=".5"
            ${r("scrollbar")}
            class="search-overlay-list__scrollbar"
        />

        <!-- no result -->
        <div>
            ${c({observe:()=>p.noResult,render:()=>p.noResult?g`
                              <ul class="search-overlay-list__ul">
                                  <li class="search-overlay-list__item">
                                      <div class="search-overlay-list__section">
                                          <p><strong>no result</strong></p>
                                      </div>
                                  </li>
                              </ul>
                          `:""})}
        </div>

        <!-- result list -->
        <ul class="search-overlay-list__ul" ${r("scroller")}>
            ${t({observe:()=>p.list,render:({current:f})=>g`
                        <search-overlay-list-item
                            ${l(()=>({active:p.activeRoute.route===f.value.uri,uri:f.value.uri,breadCrumbs:f.value.breadCrumbs,count:f.value.count,title:f.value.title}))}
                        >
                        </search-overlay-list-item>
                    `})}
        </ul>
    </div>`};var Lc=()=>{m.useMethodByName(cc)?.toggle()};var tk=({uri:e})=>{m.loadUrl({url:e}),Lc()},j0=({getProxi:e,bindEffect:t,delegateEvents:r,bindObject:o})=>{let n=e();return g`
        <li
            class="search-overlay-list__item"
            ${t({toggleClass:{current:()=>n.active}})}
        >
            <button
                type="button"
                class="search-overlay-list__button"
                ${r({click:()=>{tk({uri:n.uri})}})}
            >
                <div class="search-overlay-list__section">
                    <p>
                        ${o`<strong>${()=>n.breadCrumbs}</strong> (${()=>n.count})`}
                    </p>
                </div>
                <div class="search-overlay-list__title">
                    <h6>${o`${()=>n.title}`}</h6>
                </div>
            </button>
        </li>
    `};var z0=m.createComponent({tag:"search-overlay-list-item",component:j0,props:{uri:()=>({value:"",type:String}),breadCrumbs:()=>({value:"",type:String}),title:()=>({value:"",type:String}),count:()=>({value:0,type:Number}),active:()=>({value:!1,type:Boolean})}});var H0=m.createComponent({tag:"search-overlay-list",component:W0,bindStore:m.mainStore,props:{updatePrentSearchKey:()=>({value:()=>{},type:Function})},state:{list:()=>({value:[],type:Array}),loading:()=>({value:!1,type:Boolean}),noResult:()=>({value:!1,type:Boolean})},child:[z0]});var U0=m.createComponent({tag:"search-overlay",component:R0,state:{active:()=>({value:!1,type:Boolean}),currentSearch:()=>({value:"",type:String})},child:[B0,H0]});var G0=()=>g`
        <div class="test-grid">
            <div class="test-grid__grid">
                <span></span><span></span><span></span><span></span><span></span
                ><span></span><span></span><span></span><span></span
                ><span></span><span></span><span></span>
            </div>
            <div class="test-grid__cont"><span>test</span></div>
        </div>
    `;var q0=m.createComponent({tag:"test-scss-grid",component:G0});var bo=()=>{let{templateName:e}=m.getActiveRoute();return Mc.has(e)?0:40};var J0=()=>{m.useMethodByName(sc)?.toggle()};var rk=["Alberto Navarro","Milan, Italy",'<a href="https://github.com/albnavarro/" target="_blank">[ github ]</a>','<a href="https://www.linkedin.com/in/alberto-navarro74/" target="_blank">[ linkedin ]</a>'],ok=()=>g`
        <ul class="l-footer__bio">
            ${rk.map(e=>g` <li class="l-footer__bio__item">${e}</li> `).join("")}
        </ul>
    `,Y0=({delegateEvents:e,getProxi:t,onMount:r,bindEffect:o})=>{let n=t();return r(()=>{u.useFrameIndex(()=>{n.isMounted=!0},bo())}),g`
        <footer
            class="l-footer"
            ${o({toggleClass:{"is-visible":()=>n.isMounted}})}
        >
            <div class="l-footer__container">
                ${ok()}
                <div class="l-footer__debug">
                    <debug-button
                        class="c-button-debug"
                        ${e({click:()=>{J0()}})}
                    >
                        Debug App</debug-button
                    >
                    <debug-button
                        class="c-button-console"
                        ${e({click:()=>{kc()}})}
                    >
                        Log
                    </debug-button>
                </div>
            </div>
        </footer>
    `};var X0=()=>g`
        <button type="button" class="c-btn-debug">
            <mobjs-slot></mobjs-slot>
        </button>
    `;var K0=m.createComponent({tag:"debug-button",component:X0});var Q0=m.createComponent({tag:"mob-footer",component:Y0,child:[K0],state:{isMounted:()=>({value:!1,type:Boolean})}});var Dc=()=>{m.useMethodByName(ti)?.scrollTop()},Fc=()=>{m.useMethodByName(ti)?.refresh()};var as=({fireCallback:e=!0}={})=>{m.useMethodByName(ac)?.closeAllAccordion({fireCallback:e})};function nk(){m.loadUrl({url:"home"}),as(),X.set("navigationIsOpen",!1),Dc()}var Z0=({delegateEvents:e,bindEffect:t,getProxi:r,onMount:o,addMethod:n})=>{let s=r();return o(({element:i})=>{n("getHeaderHeight",()=>ie(i)),u.useFrameIndex(()=>{s.isMounted=!0},bo())}),g`
        <header
            class="l-header"
            ${t({toggleClass:{"is-visible":()=>s.isMounted}})}
        >
            <div class="l-header__container">
                <div class="l-header__grid">
                    <div class="l-header__toggle">
                        <mob-header-toggle></mob-header-toggle>
                    </div>
                    <button
                        type="button"
                        class="l-header__title"
                        ${e({click:()=>{nk()}})}
                    >
                        <div class="l-header__title-container">
                            <h3
                                ${t({toggleClass:{"is-visible":()=>s.isMounted}})}
                            >
                                <span>Mob</span>Project
                            </h3>
                            <h5
                                ${t({toggleClass:{"is-visible":()=>s.isMounted}})}
                            >
                                v 1.0
                            </h5>
                        </div>
                    </button>
                    <div class="l-header__main-menu">
                        <header-main-menu></header-main-menu>
                    </div>
                    <div
                        class="l-header__utils"
                        ${t({toggleClass:{"is-visible":()=>s.isMounted}})}
                    >
                        <mob-header-utils></mob-header-utils>
                    </div>
                </div>
            </div>
        </header>
    `};var eC=({delegateEvents:e,bindEffect:t,getProxi:r,onMount:o})=>{let n=r();return o(()=>{u.useFrameIndex(()=>{n.isMounted=!0},bo())}),g`
        <button
            class="hamburger hamburger--squeeze"
            type="button"
            ${e({click:()=>{X.update("navigationIsOpen",s=>!s),n.navigationIsOpen||qt()}})}
            ${t([{toggleClass:{"is-open":()=>n.navigationIsOpen}},{toggleClass:{"is-visible":()=>n.isMounted}}])}
        >
            <div
                class="hamburger__box"
                ${t([{toggleClass:{"is-visible":()=>n.isMounted}}])}
            >
                <div class="hamburger-inner"></div>
            </div>
        </button>
    `};var tC=m.createComponent({tag:"mob-header-toggle",component:eC,bindStore:X,state:{isMounted:()=>({value:!1,type:Boolean})}});var sk=({event:e})=>{let t=e.target;console.log(t);let{url:r}=t?.dataset??"";m.loadUrl({url:r}),X.set("navigationIsOpen",!1)};function ik({delegateEvents:e}){let t=mr().header,{links:r}=t,o={github:bt().gitHubIcon};return r.map(n=>{let{svg:s,url:i,internal:a}=n;return g`<li class="l-header__sidenav__item">
                ${a?g`
                          <button
                              type="button"
                              data-url="${i}"
                              class="l-header__sidenav__link"
                              ${e({click:c=>{sk({event:c})}})}
                          >
                              ${o[s]}
                          </button>
                      `:g`
                          <a
                              href="${i}"
                              target="_blank"
                              class="l-header__sidenav__link"
                          >
                              ${o[s]}
                          </a>
                      `}
            </li>`}).join("")}var rC=({delegateEvents:e})=>g`
        <ul class="l-header__sidenav">
            <li class="l-header__sidenav__item">
                <history-cta></history-cta>
            </li>
            <li class="l-header__sidenav__item">
                <search-cta></search-cta>
            </li>
            ${ik({delegateEvents:e})}
        </ul>
    `;var ak=()=>{Lc(),w0()},oC=({delegateEvents:e})=>{let t=bt().searchIcons;return g`<button
        type="button"
        class="search-cta"
        ${e({click:()=>{ak()}})}
    >
        ${t}
    </button>`};var nC=m.createComponent({tag:"search-cta",component:oC});var sC=({delegateEvents:e})=>{let t=bt().historyIcons;return g`<button
        type="button"
        class="history-cta"
        ${e({click:()=>{Lx()}})}
    >
        ${t}
    </button>`};var iC=m.createComponent({tag:"history-cta",component:sC});var aC=m.createComponent({tag:"mob-header-utils",component:rC,child:[nC,iC]});var ck=({delegateEvents:e,staticProps:t})=>mr().footer.nav.map(({label:o,url:n,section:s})=>g`<li class="header-main-menu__item">
                <header-main-menu-button
                    ${e({click:()=>{m.loadUrl({url:n}),X.set("navigationIsOpen",!1)}})}
                    ${t({label:o,section:s})}
                ></header-main-menu-button>
            </li> `).join(""),cC=({delegateEvents:e,staticProps:t,getProxi:r,onMount:o,bindEffect:n})=>{let s=r();return o(()=>{u.useFrameIndex(()=>{s.isMounted=!0},10)}),g`
        <ul
            class="header-main-menu"
            ${n({toggleClass:{"is-visible":()=>s.isMounted}})}
        >
            ${ck({delegateEvents:e,staticProps:t})}
        </ul>
    `};var lC=({getProxi:e,bindEffect:t,computed:r})=>{let o=e();return r(()=>o.active,()=>o.section===o.activeNavigationSection),g`
        <button
            type="button"
            class="header-main-menu__button"
            ${t({toggleClass:{current:()=>o.active}})}
        >
            ${o.label}
        </button>
    `};var uC=m.createComponent({tag:"header-main-menu-button",component:lC,bindStore:X,props:{label:()=>({value:"",type:String}),section:()=>({value:"",type:String})},state:{active:()=>({value:!1,type:Boolean})}});var pC=m.createComponent({tag:"header-main-menu",component:cC,child:[uC],state:{isMounted:()=>({value:!1,type:Boolean})}});var mC=m.createComponent({tag:"mob-header",component:Z0,state:{isMounted:()=>({value:!1,type:Boolean})},child:[pC,aC,tC]});var yp=0,dC=({root:e})=>{let t=e.querySelector(".l-navcontainer__wrap"),r=e.querySelector(".l-navcontainer__scroll"),o=e.querySelector(".l-navcontainer__percent"),n=200,s=new xt({screen:t,scroller:r,direction:"vertical",drag:!0,scopedEvent:!1,onUpdate:({percent:i})=>{let{navigationIsOpen:a}=X.get();a&&(yp=Math.round(i)/100,o.style.transform=`translateZ(0) scaleX(${yp})`)}});return s.init(),X.watch("activeNavigationSection",i=>{let a=document.querySelector(`[data-sectionname='${i}']`);if(!a)return;let c=document.querySelector(".l-header"),l=document.querySelector(".l-footer"),p=ie(r),d=ie(c),f=ie(l),v=100*a.offsetTop/(p-window.innerHeight+d+f);setTimeout(()=>{X.getProp("navigationIsOpen")||s.set(v)},400)}),X.watch("navigationIsOpen",i=>{if(i){o.style.transform=`translateZ(0) scaleX(${yp})`;return}o.style.transform="translateZ(0) scaleX(0)"}),{scrollNativationToTop:()=>{setTimeout(()=>{s.move(0).catch(()=>{}),o.style.transform="translateZ(0) scaleX(0)"},n)},refreshScroller:()=>{s.refresh()}}};function lk({main:e,proxi:t}){t.isOpen=!1,u.useFrame(()=>{document.body.style.overflow="",e.classList.remove("shift")})}function uk({main:e,proxi:t}){Fc(),t.isOpen=!0,u.useFrame(()=>{document.body.style.overflow="hidden",e.classList.add("shift")})}function pk({main:e}){e.addEventListener("click",()=>{X.set("navigationIsOpen",!1),qt()})}var mk=()=>{Dc(),as();let{navigationIsOpen:e}=X.get();e||Or.to(0)},hC=({onMount:e,addMethod:t,delegateEvents:r,bindEffect:o,getProxi:n})=>{let s=n();return e(({element:i})=>{let a=document.querySelector("main.main");X.watch("navigationIsOpen",p=>{if(p&&a){uk({main:a,proxi:s});return}lk({main:a,proxi:s})}),pk({main:a});let{scrollNativationToTop:c,refreshScroller:l}=dC({root:i});return t("scrollTop",c),t("refresh",l),u.useFrameIndex(()=>{s.isMounted=!0},bo()),()=>{}}),g`
        <div
            class="l-navcontainer"
            ${o({toggleClass:{active:()=>s.isOpen}})}
        >
            <div
                class="l-navcontainer__side"
                ${o({toggleClass:{"is-visible":()=>s.isMounted}})}
            >
                <div class="l-navcontainer__percent"></div>
                <button
                    class="l-navcontainer__totop"
                    ${r({click:()=>{mk()}})}
                ></button>
            </div>
            <div class="l-navcontainer__wrap">
                <div class="l-navcontainer__scroll">
                    <mob-navigation
                        name="${ac}"
                    ></mob-navigation>
                </div>
            </div>
        </div>
    `};function dk({data:e,staticProps:t,bindProps:r,proxi:o}){return e.map((n,s)=>{let{label:i,url:a,activeId:c,children:l,section:p,sectioName:d,scrollToSection:f,forceChildren:h,hide:v}=n;return p?g`
                    <mob-navigation-label
                        ${t({label:i,sectioName:d,hide:!!v})}
                    ></mob-navigation-label>
                `:l?g`
                      <mob-navigation-submenu
                          ${t({headerButton:{label:i,url:a,id:s},children:l,callback:({forceClose:b=!1})=>{if(b){o.currentAccordionId=-1;return}o.currentAccordionId=s}})}
                          ${r(()=>({isOpen:o.currentAccordionId===s}))}
                      >
                      </mob-navigation-submenu>
                  `:g`
                      <li class="l-navigation__item">
                          <mob-navigation-button
                              ${t({label:i,url:a,scrollToSection:f??"no-scroll",activeId:c??-1,forceChildren:h??[]})}
                          ></mob-navigation-button>
                      </li>
                  `}).join("")}var fC=({staticProps:e,setState:t,bindProps:r,addMethod:o,getProxi:n})=>{let s=n(),{navigation:i}=mr();return o("closeAllAccordion",({fireCallback:a=!0}={})=>{t(()=>s.currentAccordionId,-1,{emit:a})}),g`
        <nav class="l-navigation">
            <ul class="l-navigation__list">
                ${dk({data:i,staticProps:e,bindProps:r,proxi:s})}
            </ul>
        </nav>
    `};var gC=({bindEffect:e,getProxi:t})=>{let r=t();return g`
        <div
            class="l-navigation__label"
            data-sectionname="${r.sectioName}"
            ${e({toggleClass:{active:()=>r.sectioName===r.activeNavigationSection,hide:()=>!!r.hide}})}
        >
            ${r.label}
        </div>
    `};var bC=m.createComponent({tag:"mob-navigation-label",component:gC,bindStore:X,props:{label:()=>({value:"",type:String}),sectioName:()=>({value:"",type:String}),hide:()=>({value:!1,type:Boolean})}});function hk({proxi:e,staticProps:t}){return e.children.map(r=>{let{label:o,url:n,scrollToSection:s,activeId:i}=r;return g`
                <li class="l-navigation__submenu__item">
                    <mob-navigation-button
                        ${t({label:o,url:n,subMenuClass:"l-navigation__link--submenu",scrollToSection:s,activeId:i??-1,callback:()=>{e.callback({forceClose:!1})}})}
                    ></mob-navigation-button>
                </li>
            `}).join("")}var yC=({onMount:e,staticProps:t,bindProps:r,watch:o,setRef:n,getRef:s,getProxi:i})=>{let a=i(),{label:c,url:l,activeId:p}=a.headerButton;return e(()=>{let{content:d}=s();return $r.subscribe(d),$r.reset(d),o(()=>a.isOpen,async f=>{await $r[f?"down":"up"](d),Fc(),!f&&as({fireCallback:!1})},{immediate:!0}),()=>{}}),g`
        <li class="l-navigation__item has-child">
            <mob-navigation-button
                ${t({label:c,url:l,arrowClass:"l-navigation__link--arrow",fireRoute:!1,activeId:p??-1,callback:()=>{a.callback({forceClose:a.isOpen})}})}
                ${r(()=>({isOpen:a.isOpen}))}
            ></mob-navigation-button>
            <ul class="l-navigation__submenu" ${n("content")}>
                ${hk({proxi:a,staticProps:t})}
            </ul>
        </li>
    `};var vC=({delegateEvents:e,getProxi:t,bindEffect:r})=>{let o=t(),{label:n,url:s,arrowClass:i,subMenuClass:a,fireRoute:c,callback:l,scrollToSection:p,activeId:d,forceChildren:f}=o;return m.afterRouteChange(({currentRoute:h})=>{u.useFrame(()=>{let b=s.split("?")?.[0]??"",T=m.getActiveParams(),_=d===-1||T?.activeId===`${d}`,S=h===b&&_,C=f.includes(h);o.isCurrent=S||C,S&&c&&(l(),X.set("activeNavigationSection",p))})}),g`
        <button
            type="button"
            class="l-navigation__link  ${i} ${a}"
            ${e({click:()=>{l(),c&&(m.loadUrl({url:s}),X.set("navigationIsOpen",!1))}})}
            ${r({toggleClass:{active:()=>o.isOpen,current:()=>o.isCurrent}})}
        >
            ${n}
        </button>
    `};var Bc=m.createComponent({tag:"mob-navigation-button",component:vC,props:{label:()=>({value:"",type:String}),url:()=>({value:"",type:String}),arrowClass:()=>({value:"",type:String}),subMenuClass:()=>({value:"",type:String}),fireRoute:()=>({value:!0,type:Boolean}),callback:()=>({value:()=>{},type:Function}),isOpen:()=>({value:!1,type:Boolean}),scrollToSection:()=>({value:"",type:String}),activeId:()=>({value:-1,type:Number}),forceChildren:()=>({value:[],type:Array})},state:{isCurrent:()=>({value:!1,type:Boolean})}});var TC=m.createComponent({tag:"mob-navigation-submenu",component:yC,props:{callback:()=>({value:()=>{},type:Function}),headerButton:()=>({value:{},type:"Any"}),children:()=>({value:[],type:Array}),isOpen:()=>({value:!1,type:Boolean})},child:[Bc]});var SC=m.createComponent({tag:"mob-navigation",component:fC,state:{currentAccordionId:()=>({value:-1,type:Number,skipEqual:!1})},child:[bC,TC,Bc]});var _C=m.createComponent({tag:"mob-navigation-container",component:hC,child:[SC],state:{isOpen:()=>({value:!1,type:Boolean}),isMounted:()=>({value:!1,type:Boolean})}});m.useComponent([mC,_C,Q0,v0,x0,E0,b0,d0,q0,U0,S0,Ax,Wx]);var xC=async()=>g`
        ${""}
        <custom-history name="${Yn}"></custom-history>
        <debug-overlay name="${sc}"></debug-overlay>
        <mob-header name="${dT}"></mob-header>
        <mob-navigation-container
            name="${ti}"
        ></mob-navigation-container>
        <main class="main">
            <div class="container">
                <div class="inner-wrap">
                    <div id="content"></div>
                </div>
            </div>
        </main>
        <mob-footer> </mob-footer>
        <quick-nav name="${Qs}"></quick-nav>
        <route-loader name="${pc}"></route-loader>
        <scroll-down-label name="${Zs}"></scroll-down-label>
        <links-mobjs></links-mobjs>
        <right-sidebar name="${lc}"></right-sidebar>
        <search-overlay name="${cc}"></search-overlay>
        <animation-description
            name="${uc}"
        ></animation-description>
    `;var vp=0,Tp=document.querySelector(".js-main-loader-track"),CC=(e=60)=>{let t=()=>{if(vp++,!Tp)return;let r=100*vp/e;if(Tp.style.transform=`scaleX(${r/100})`,vp>=e){Tp=null;return}u.useNextFrame(()=>{t()})};u.useFrame(()=>{t()})};var EC=e=>{m.useMethodByName(pc).skip(e)};var wC=60,IC=()=>fe.mq("max","desktop"),fk=()=>{u.useResize(()=>{IC()&&m.loadUrl({url:"onlyDesktop"})})},Wc=document.body.querySelector(".js-main-loader"),jc=document.body.querySelector(".js-main-loader-background"),Vc=H.createTimeTween({data:{opacity:1},duration:1e3});Wc&&jc&&[Wc,jc].forEach(e=>{Vc?.subscribe(({opacity:t})=>{e.style.opacity=t})});var gk=async()=>{await Rv(),await kv(),CC(wC),await u.useFps({duration:wC,force:!0}),m.inizializeApp({rootId:"#root",contentId:"#content",wrapper:xC,routes:Rc,index:"home",pageNotFound:"pageNotFound",beforePageTransition:Mx,pageTransition:Rx,afterInit:async()=>{await Vc.goTo({opacity:0}),Vc.destroy(),Vc=null,Wc?.remove(),jc?.remove(),Wc=null,jc=null,Nx(),fk(),EC(!1)},redirect:({route:e})=>IC()?"onlyDesktop":e,restoreScroll:!0,componentDefaultProps:{scoped:!1,maxParseIteration:1e4,debug:!1}})};u.useLoad(()=>{Ev(),fe.setDefault({deferredNextTick:!0}),gk(),Cv()});})();
//# sourceMappingURL=main.js.map
