"use strict";(()=>{var SC=Object.create;var zc=Object.defineProperty;var xC=Object.getOwnPropertyDescriptor;var CC=Object.getOwnPropertyNames;var EC=Object.getPrototypeOf,wC=Object.prototype.hasOwnProperty;var IC=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),_o=(e,t)=>{for(var r in t)zc(e,r,{get:t[r],enumerable:!0})},MC=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of CC(t))!wC.call(e,n)&&n!==r&&zc(e,n,{get:()=>t[n],enumerable:!(o=xC(t,n))||o.enumerable});return e};var kC=(e,t,r)=>(r=e!=null?SC(EC(e)):{},MC(t||!e||!e.__esModule?zc(r,"default",{value:e,enumerable:!0}):r,e));var oT=IC((EJ,rT)=>{function zv(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{let r=e[t],o=typeof r;(o==="object"||o==="function")&&!Object.isFrozen(r)&&zv(r)}),e}var ec=class{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}};function Uv(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function go(e,...t){let r=Object.create(null);for(let o in e)r[o]=e[o];return t.forEach(function(o){for(let n in o)r[n]=o[n]}),r}var $I="</span>",Fv=e=>!!e.scope,LI=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){let r=e.split(".");return[`${t}${r.shift()}`,...r.map((o,n)=>`${o}${"_".repeat(n+1)}`)].join(" ")}return`${t}${e}`},ju=class{constructor(t,r){this.buffer="",this.classPrefix=r.classPrefix,t.walk(this)}addText(t){this.buffer+=Uv(t)}openNode(t){if(!Fv(t))return;let r=LI(t.scope,{prefix:this.classPrefix});this.span(r)}closeNode(t){Fv(t)&&(this.buffer+=$I)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}},Bv=(e={})=>{let t={children:[]};return Object.assign(t,e),t},Hu=class e{constructor(){this.rootNode=Bv(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){let r=Bv({scope:t});this.add(r),this.stack.push(r)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,r){return typeof r=="string"?t.addText(r):r.children&&(t.openNode(r),r.children.forEach(o=>this._walk(t,o)),t.closeNode(r)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(r=>typeof r=="string")?t.children=[t.children.join("")]:t.children.forEach(r=>{e._collapse(r)}))}},zu=class extends Hu{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,r){let o=t.root;r&&(o.scope=`language:${r}`),this.add(o)}toHTML(){return new ju(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}};function Js(e){return e?typeof e=="string"?e:e.source:null}function Gv(e){return Ho("(?=",e,")")}function DI(e){return Ho("(?:",e,")*")}function FI(e){return Ho("(?:",e,")?")}function Ho(...e){return e.map(r=>Js(r)).join("")}function BI(e){let t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function Gu(...e){return"("+(BI(e).capture?"":"?:")+e.map(o=>Js(o)).join("|")+")"}function qv(e){return new RegExp(e.toString()+"|").exec("").length-1}function VI(e,t){let r=e&&e.exec(t);return r&&r.index===0}var WI=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function qu(e,{joinWith:t}){let r=0;return e.map(o=>{r+=1;let n=r,s=Js(o),i="";for(;s.length>0;){let a=WI.exec(s);if(!a){i+=s;break}i+=s.substring(0,a.index),s=s.substring(a.index+a[0].length),a[0][0]==="\\"&&a[1]?i+="\\"+String(Number(a[1])+n):(i+=a[0],a[0]==="("&&r++)}return i}).map(o=>`(${o})`).join(t)}var jI=/\b\B/,Jv="[a-zA-Z]\\w*",Ju="[a-zA-Z_]\\w*",Yv="\\b\\d+(\\.\\d+)?",Xv="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Kv="\\b(0b[01]+)",HI="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",zI=(e={})=>{let t=/^#![ ]*\//;return e.binary&&(e.begin=Ho(t,/.*\b/,e.binary,/\b.*/)),go({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(r,o)=>{r.index!==0&&o.ignoreMatch()}},e)},Ys={begin:"\\\\[\\s\\S]",relevance:0},UI={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[Ys]},GI={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[Ys]},qI={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},rc=function(e,t,r={}){let o=go({scope:"comment",begin:e,end:t,contains:[]},r);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});let n=Gu("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:Ho(/[ ]+/,"(",n,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},JI=rc("//","$"),YI=rc("/\\*","\\*/"),XI=rc("#","$"),KI={scope:"number",begin:Yv,relevance:0},QI={scope:"number",begin:Xv,relevance:0},ZI={scope:"number",begin:Kv,relevance:0},eM={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[Ys,{begin:/\[/,end:/\]/,relevance:0,contains:[Ys]}]},tM={scope:"title",begin:Jv,relevance:0},rM={scope:"title",begin:Ju,relevance:0},oM={begin:"\\.\\s*"+Ju,relevance:0},nM=function(e){return Object.assign(e,{"on:begin":(t,r)=>{r.data._beginMatch=t[1]},"on:end":(t,r)=>{r.data._beginMatch!==t[1]&&r.ignoreMatch()}})},Za=Object.freeze({__proto__:null,APOS_STRING_MODE:UI,BACKSLASH_ESCAPE:Ys,BINARY_NUMBER_MODE:ZI,BINARY_NUMBER_RE:Kv,COMMENT:rc,C_BLOCK_COMMENT_MODE:YI,C_LINE_COMMENT_MODE:JI,C_NUMBER_MODE:QI,C_NUMBER_RE:Xv,END_SAME_AS_BEGIN:nM,HASH_COMMENT_MODE:XI,IDENT_RE:Jv,MATCH_NOTHING_RE:jI,METHOD_GUARD:oM,NUMBER_MODE:KI,NUMBER_RE:Yv,PHRASAL_WORDS_MODE:qI,QUOTE_STRING_MODE:GI,REGEXP_MODE:eM,RE_STARTERS_RE:HI,SHEBANG:zI,TITLE_MODE:tM,UNDERSCORE_IDENT_RE:Ju,UNDERSCORE_TITLE_MODE:rM});function sM(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function iM(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function aM(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=sM,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function cM(e,t){Array.isArray(e.illegal)&&(e.illegal=Gu(...e.illegal))}function lM(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function uM(e,t){e.relevance===void 0&&(e.relevance=1)}var pM=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");let r=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=r.keywords,e.begin=Ho(r.beforeMatch,Gv(r.begin)),e.starts={relevance:0,contains:[Object.assign(r,{endsParent:!0})]},e.relevance=0,delete r.beforeMatch},mM=["of","and","for","in","not","or","if","then","parent","list","value"],dM="keyword";function Qv(e,t,r=dM){let o=Object.create(null);return typeof e=="string"?n(r,e.split(" ")):Array.isArray(e)?n(r,e):Object.keys(e).forEach(function(s){Object.assign(o,Qv(e[s],t,s))}),o;function n(s,i){t&&(i=i.map(a=>a.toLowerCase())),i.forEach(function(a){let c=a.split("|");o[c[0]]=[s,hM(c[0],c[1])]})}}function hM(e,t){return t?Number(t):fM(e)?0:1}function fM(e){return mM.includes(e.toLowerCase())}var Vv={},jo=e=>{console.error(e)},Wv=(e,...t)=>{console.log(`WARN: ${e}`,...t)},Un=(e,t)=>{Vv[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Vv[`${e}/${t}`]=!0)},tc=new Error;function Zv(e,t,{key:r}){let o=0,n=e[r],s={},i={};for(let a=1;a<=t.length;a++)i[a+o]=n[a],s[a+o]=!0,o+=qv(t[a-1]);e[r]=i,e[r]._emit=s,e[r]._multi=!0}function gM(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw jo("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),tc;if(typeof e.beginScope!="object"||e.beginScope===null)throw jo("beginScope must be object"),tc;Zv(e,e.begin,{key:"beginScope"}),e.begin=qu(e.begin,{joinWith:""})}}function bM(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw jo("skip, excludeEnd, returnEnd not compatible with endScope: {}"),tc;if(typeof e.endScope!="object"||e.endScope===null)throw jo("endScope must be object"),tc;Zv(e,e.end,{key:"endScope"}),e.end=qu(e.end,{joinWith:""})}}function yM(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function vM(e){yM(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),gM(e),bM(e)}function TM(e){function t(i,a){return new RegExp(Js(i),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(a?"g":""))}class r{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(a,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,a]),this.matchAt+=qv(a)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);let a=this.regexes.map(c=>c[1]);this.matcherRe=t(qu(a,{joinWith:"|"}),!0),this.lastIndex=0}exec(a){this.matcherRe.lastIndex=this.lastIndex;let c=this.matcherRe.exec(a);if(!c)return null;let l=c.findIndex((d,f)=>f>0&&d!==void 0),p=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,p)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(a){if(this.multiRegexes[a])return this.multiRegexes[a];let c=new r;return this.rules.slice(a).forEach(([l,p])=>c.addRule(l,p)),c.compile(),this.multiRegexes[a]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(a,c){this.rules.push([a,c]),c.type==="begin"&&this.count++}exec(a){let c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(a);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){let p=this.getMatcher(0);p.lastIndex=this.lastIndex+1,l=p.exec(a)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function n(i){let a=new o;return i.contains.forEach(c=>a.addRule(c.begin,{rule:c,type:"begin"})),i.terminatorEnd&&a.addRule(i.terminatorEnd,{type:"end"}),i.illegal&&a.addRule(i.illegal,{type:"illegal"}),a}function s(i,a){let c=i;if(i.isCompiled)return c;[iM,lM,vM,pM].forEach(p=>p(i,a)),e.compilerExtensions.forEach(p=>p(i,a)),i.__beforeBegin=null,[aM,cM,uM].forEach(p=>p(i,a)),i.isCompiled=!0;let l=null;return typeof i.keywords=="object"&&i.keywords.$pattern&&(i.keywords=Object.assign({},i.keywords),l=i.keywords.$pattern,delete i.keywords.$pattern),l=l||/\w+/,i.keywords&&(i.keywords=Qv(i.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),a&&(i.begin||(i.begin=/\B|\b/),c.beginRe=t(c.begin),!i.end&&!i.endsWithParent&&(i.end=/\B|\b/),i.end&&(c.endRe=t(c.end)),c.terminatorEnd=Js(c.end)||"",i.endsWithParent&&a.terminatorEnd&&(c.terminatorEnd+=(i.end?"|":"")+a.terminatorEnd)),i.illegal&&(c.illegalRe=t(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map(function(p){return _M(p==="self"?i:p)})),i.contains.forEach(function(p){s(p,c)}),i.starts&&s(i.starts,a),c.matcher=n(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=go(e.classNameAliases||{}),s(e)}function eT(e){return e?e.endsWithParent||eT(e.starts):!1}function _M(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return go(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:eT(e)?go(e,{starts:e.starts?go(e.starts):null}):Object.isFrozen(e)?go(e):e}var SM="11.11.1",Uu=class extends Error{constructor(t,r){super(t),this.name="HTMLInjectionError",this.html=r}},Wu=Uv,jv=go,Hv=Symbol("nomatch"),xM=7,tT=function(e){let t=Object.create(null),r=Object.create(null),o=[],n=!0,s="Could not find the language '{}', did you forget to load/include a language module?",i={disableAutodetect:!0,name:"Plain text",contains:[]},a={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:zu};function c(x){return a.noHighlightRe.test(x)}function l(x){let P=x.className+" ";P+=x.parentNode?x.parentNode.className:"";let $=a.languageDetectRe.exec(P);if($){let B=A($[1]);return B||(Wv(s.replace("{}",$[1])),Wv("Falling back to no-highlight mode for this block.",x)),B?$[1]:"no-highlight"}return P.split(/\s+/).find(B=>c(B)||A(B))}function p(x,P,$){let B="",j="";typeof P=="object"?(B=x,$=P.ignoreIllegals,j=P.language):(Un("10.7.0","highlight(lang, code, ...args) has been deprecated."),Un("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),j=x,B=P),$===void 0&&($=!0);let X={code:B,language:j};L("before:highlight",X);let le=X.result?X.result:d(X.language,X.code,$);return le.code=X.code,L("after:highlight",le),le}function d(x,P,$,B){let j=Object.create(null);function X(V,U){return V.keywords[U]}function le(){if(!Y.keywords){je.addText(Me);return}let V=0;Y.keywordPatternRe.lastIndex=0;let U=Y.keywordPatternRe.exec(Me),ie="";for(;U;){ie+=Me.substring(V,U.index);let Ce=Ye.case_insensitive?U[0].toLowerCase():U[0],tt=X(Y,Ce);if(tt){let[br,TC]=tt;if(je.addText(ie),ie="",j[Ce]=(j[Ce]||0)+1,j[Ce]<=xM&&(li+=TC),br.startsWith("_"))ie+=U[0];else{let _C=Ye.classNameAliases[br]||br;pe(U[0],_C)}}else ie+=U[0];V=Y.keywordPatternRe.lastIndex,U=Y.keywordPatternRe.exec(Me)}ie+=Me.substring(V),je.addText(ie)}function ye(){if(Me==="")return;let V=null;if(typeof Y.subLanguage=="string"){if(!t[Y.subLanguage]){je.addText(Me);return}V=d(Y.subLanguage,Me,!0,is[Y.subLanguage]),is[Y.subLanguage]=V._top}else V=h(Me,Y.subLanguage.length?Y.subLanguage:null);Y.relevance>0&&(li+=V.relevance),je.__addSublanguage(V._emitter,V.language)}function ee(){Y.subLanguage!=null?ye():le(),Me=""}function pe(V,U){V!==""&&(je.startScope(U),je.addText(V),je.endScope())}function ve(V,U){let ie=1,Ce=U.length-1;for(;ie<=Ce;){if(!V._emit[ie]){ie++;continue}let tt=Ye.classNameAliases[V[ie]]||V[ie],br=U[ie];tt?pe(br,tt):(Me=br,le(),Me=""),ie++}}function ge(V,U){return V.scope&&typeof V.scope=="string"&&je.openNode(Ye.classNameAliases[V.scope]||V.scope),V.beginScope&&(V.beginScope._wrap?(pe(Me,Ye.classNameAliases[V.beginScope._wrap]||V.beginScope._wrap),Me=""):V.beginScope._multi&&(ve(V.beginScope,U),Me="")),Y=Object.create(V,{parent:{value:Y}}),Y}function Ie(V,U,ie){let Ce=VI(V.endRe,ie);if(Ce){if(V["on:end"]){let tt=new ec(V);V["on:end"](U,tt),tt.isMatchIgnored&&(Ce=!1)}if(Ce){for(;V.endsParent&&V.parent;)V=V.parent;return V}}if(V.endsWithParent)return Ie(V.parent,U,ie)}function De(V){return Y.matcher.regexIndex===0?(Me+=V[0],1):(Hc=!0,0)}function q(V){let U=V[0],ie=V.rule,Ce=new ec(ie),tt=[ie.__beforeBegin,ie["on:begin"]];for(let br of tt)if(br&&(br(V,Ce),Ce.isMatchIgnored))return De(U);return ie.skip?Me+=U:(ie.excludeBegin&&(Me+=U),ee(),!ie.returnBegin&&!ie.excludeBegin&&(Me=U)),ge(ie,V),ie.returnBegin?0:U.length}function Te(V){let U=V[0],ie=P.substring(V.index),Ce=Ie(Y,V,ie);if(!Ce)return Hv;let tt=Y;Y.endScope&&Y.endScope._wrap?(ee(),pe(U,Y.endScope._wrap)):Y.endScope&&Y.endScope._multi?(ee(),ve(Y.endScope,V)):tt.skip?Me+=U:(tt.returnEnd||tt.excludeEnd||(Me+=U),ee(),tt.excludeEnd&&(Me=U));do Y.scope&&je.closeNode(),!Y.skip&&!Y.subLanguage&&(li+=Y.relevance),Y=Y.parent;while(Y!==Ce.parent);return Ce.starts&&ge(Ce.starts,V),tt.returnEnd?0:U.length}function et(){let V=[];for(let U=Y;U!==Ye;U=U.parent)U.scope&&V.unshift(U.scope);V.forEach(U=>je.openNode(U))}let ut={};function Ct(V,U){let ie=U&&U[0];if(Me+=V,ie==null)return ee(),0;if(ut.type==="begin"&&U.type==="end"&&ut.index===U.index&&ie===""){if(Me+=P.slice(U.index,U.index+1),!n){let Ce=new Error(`0 width match regex (${x})`);throw Ce.languageName=x,Ce.badRule=ut.rule,Ce}return 1}if(ut=U,U.type==="begin")return q(U);if(U.type==="illegal"&&!$){let Ce=new Error('Illegal lexeme "'+ie+'" for mode "'+(Y.scope||"<unnamed>")+'"');throw Ce.mode=Y,Ce}else if(U.type==="end"){let Ce=Te(U);if(Ce!==Hv)return Ce}if(U.type==="illegal"&&ie==="")return Me+=`
`,1;if(jc>1e5&&jc>U.index*3)throw new Error("potential infinite loop, way more iterations than matches");return Me+=ie,ie.length}let Ye=A(x);if(!Ye)throw jo(s.replace("{}",x)),new Error('Unknown language: "'+x+'"');let ss=TM(Ye),Fr="",Y=B||ss,is={},je=new a.__emitter(a);et();let Me="",li=0,To=0,jc=0,Hc=!1;try{if(Ye.__emitTokens)Ye.__emitTokens(P,je);else{for(Y.matcher.considerAll();;){jc++,Hc?Hc=!1:Y.matcher.considerAll(),Y.matcher.lastIndex=To;let V=Y.matcher.exec(P);if(!V)break;let U=P.substring(To,V.index),ie=Ct(U,V);To=V.index+ie}Ct(P.substring(To))}return je.finalize(),Fr=je.toHTML(),{language:x,value:Fr,relevance:li,illegal:!1,_emitter:je,_top:Y}}catch(V){if(V.message&&V.message.includes("Illegal"))return{language:x,value:Wu(P),illegal:!0,relevance:0,_illegalBy:{message:V.message,index:To,context:P.slice(To-100,To+100),mode:V.mode,resultSoFar:Fr},_emitter:je};if(n)return{language:x,value:Wu(P),illegal:!1,relevance:0,errorRaised:V,_emitter:je,_top:Y};throw V}}function f(x){let P={value:Wu(x),illegal:!1,relevance:0,_top:i,_emitter:new a.__emitter(a)};return P._emitter.addText(x),P}function h(x,P){P=P||a.languages||Object.keys(t);let $=f(x),B=P.filter(A).filter(R).map(ee=>d(ee,x,!1));B.unshift($);let j=B.sort((ee,pe)=>{if(ee.relevance!==pe.relevance)return pe.relevance-ee.relevance;if(ee.language&&pe.language){if(A(ee.language).supersetOf===pe.language)return 1;if(A(pe.language).supersetOf===ee.language)return-1}return 0}),[X,le]=j,ye=X;return ye.secondBest=le,ye}function v(x,P,$){let B=P&&r[P]||$;x.classList.add("hljs"),x.classList.add(`language-${B}`)}function b(x){let P=null,$=l(x);if(c($))return;if(L("before:highlightElement",{el:x,language:$}),x.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",x);return}if(x.children.length>0&&(a.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(x)),a.throwUnescapedHTML))throw new Uu("One of your code blocks includes unescaped HTML.",x.innerHTML);P=x;let B=P.textContent,j=$?p(B,{language:$,ignoreIllegals:!0}):h(B);x.innerHTML=j.value,x.dataset.highlighted="yes",v(x,$,j.language),x.result={language:j.language,re:j.relevance,relevance:j.relevance},j.secondBest&&(x.secondBest={language:j.secondBest.language,relevance:j.secondBest.relevance}),L("after:highlightElement",{el:x,result:j,text:B})}function T(x){a=jv(a,x)}let S=()=>{C(),Un("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function _(){C(),Un("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let E=!1;function C(){function x(){C()}if(document.readyState==="loading"){E||window.addEventListener("DOMContentLoaded",x,!1),E=!0;return}document.querySelectorAll(a.cssSelector).forEach(b)}function w(x,P){let $=null;try{$=P(e)}catch(B){if(jo("Language definition for '{}' could not be registered.".replace("{}",x)),n)jo(B);else throw B;$=i}$.name||($.name=x),t[x]=$,$.rawDefinition=P.bind(null,e),$.aliases&&O($.aliases,{languageName:x})}function I(x){delete t[x];for(let P of Object.keys(r))r[P]===x&&delete r[P]}function N(){return Object.keys(t)}function A(x){return x=(x||"").toLowerCase(),t[x]||t[r[x]]}function O(x,{languageName:P}){typeof x=="string"&&(x=[x]),x.forEach($=>{r[$.toLowerCase()]=P})}function R(x){let P=A(x);return P&&!P.disableAutodetect}function F(x){x["before:highlightBlock"]&&!x["before:highlightElement"]&&(x["before:highlightElement"]=P=>{x["before:highlightBlock"](Object.assign({block:P.el},P))}),x["after:highlightBlock"]&&!x["after:highlightElement"]&&(x["after:highlightElement"]=P=>{x["after:highlightBlock"](Object.assign({block:P.el},P))})}function k(x){F(x),o.push(x)}function M(x){let P=o.indexOf(x);P!==-1&&o.splice(P,1)}function L(x,P){let $=x;o.forEach(function(B){B[$]&&B[$](P)})}function D(x){return Un("10.7.0","highlightBlock will be removed entirely in v12.0"),Un("10.7.0","Please use highlightElement now."),b(x)}Object.assign(e,{highlight:p,highlightAuto:h,highlightAll:C,highlightElement:b,highlightBlock:D,configure:T,initHighlighting:S,initHighlightingOnLoad:_,registerLanguage:w,unregisterLanguage:I,listLanguages:N,getLanguage:A,registerAliases:O,autoDetection:R,inherit:jv,addPlugin:k,removePlugin:M}),e.debugMode=function(){n=!1},e.safeMode=function(){n=!0},e.versionString=SM,e.regex={concat:Ho,lookahead:Gv,either:Gu,optional:FI,anyNumberOfTimes:DI};for(let x in Za)typeof Za[x]=="object"&&zv(Za[x]);return Object.assign(e,Za),e},Gn=tT({});Gn.newInstance=()=>tT({});rT.exports=Gn;Gn.HighlightJS=Gn;Gn.default=Gn});var u={};_o(u,{ANIMATION_STOP_REJECT:()=>al,checkType:()=>Le,createStore:()=>PE,debounce:()=>So,getFps:()=>OE,getInstantFps:()=>AE,getTime:()=>Yt,getTypeName:()=>cs,getUnivoqueId:()=>ke,mustMakeSomething:()=>$E,normalizeWheel:()=>Ti,shouldMakeSomething:()=>LE,store:()=>pw,throttle:()=>ui,useCache:()=>HE,useDebounce:()=>So,useFps:()=>WE,useFrame:()=>DE,useFrameIndex:()=>VE,useLinkedList:()=>mw,useLoad:()=>jE,useMouseClick:()=>GE,useMouseDown:()=>qE,useMouseMove:()=>YE,useMouseUp:()=>KE,useMouseWheel:()=>ZE,useNextFrame:()=>BE,useNextLoop:()=>Dt,useNextTick:()=>FE,usePointerDown:()=>iw,usePointerLeave:()=>uw,usePointerMove:()=>aw,usePointerOut:()=>lw,usePointerOver:()=>sw,usePointerUp:()=>cw,useResize:()=>zE,useScroll:()=>ew,useScrollEnd:()=>nw,useScrollImmediate:()=>tw,useScrollStart:()=>ow,useScrollThrottle:()=>rw,useTouchEnd:()=>QE,useTouchMove:()=>XE,useTouchStart:()=>JE,useVisibilityChange:()=>UE});var Yt=()=>typeof globalThis>"u"?Date.now():globalThis.performance.now(),Sp=16.666666666666668;var ui=(e,t)=>{let r,o;return function(){let n=this,s=arguments;o?(clearTimeout(r),r=setTimeout(function(){Yt()-o>=t&&(e.apply(n,s),o=Yt())},t-(Yt()-o))):(e.apply(n,s),o=Yt())}};var So=function(t,r=200){let o;return function(){let n=()=>Reflect.apply(t,this,arguments);clearTimeout(o),o=setTimeout(n,r)}};function ne(e){if(!e)return 0;let t=e.offsetHeight,r=getComputedStyle(e);return t+=Number.parseInt(r.marginTop)+Number.parseInt(r.marginBottom),t}function Fe(e){if(!e)return 0;let t=e.offsetWidth,r=getComputedStyle(e);return t+=Number.parseInt(r.marginLeft)+Number.parseInt(r.marginRight),t}function he(e){if(!e)return{top:0,left:0};let t=e.getBoundingClientRect();return{top:t.top+window.scrollY,left:t.left+window.scrollY}}function Et(e){return e?e.getBoundingClientRect():{bottom:0,height:0,left:0,right:0,top:0,width:0,x:0,y:0}}function as(e,t){let r=t?.parentNode;for(;r;){if(r===e)return!0;r=r?.parentNode}return!1}function xo(e){let t=globalThis.getComputedStyle(e),r=t.transform||t.mozTransform;if(r==="none"||r===void 0)return{x:0,y:0,z:0};let o=r.includes("3d")?"3d":"2d",n=r.match(/matrix.*\((.+)\)/)[1].split(", ");if(o==="2d")return{x:n[4],y:n[5],z:0};if(o==="3d")return{x:n[12],y:n[13],z:n[14]}}function Uc(e){return typeof Node=="object"?e instanceof Node:e&&typeof e=="object"&&typeof e.nodeType=="number"&&typeof e.nodeName=="string"}var ke=()=>`_${Math.random().toString(36).slice(2,9)}`;function xp(e){var t=e.getBoundingClientRect();return t.top>=0&&t.bottom<=window.innerHeight}var Gc=(e,t,r)=>Math.min(Math.max(e,t),r);var pi=new Set,Dt=e=>{pi.add(e),pi.size===1&&setTimeout(()=>{pi.forEach(t=>{t()}),pi.clear()})};var qc="UNTYPED",Cp="STRING",Ep="NUMBER",wp="OBJECT",Ip="FUNCTION",mi="ARRAY",Mp="BOOLEAN",kp="ELEMENT",Rp="HTMLELEMENT",Np="NODELIST";var Ee={isString:e=>Object.prototype.toString.call(e)==="[object String]",isNumber:e=>Object.prototype.toString.call(e)==="[object Number]"&&Number.isFinite(e),isObject:e=>Object.prototype.toString.call(e)==="[object Object]",isFunction:e=>Object.prototype.toString.call(e)==="[object Function]",isArray:e=>Object.prototype.toString.call(e)==="[object Array]",isBoolean:e=>Object.prototype.toString.call(e)==="[object Boolean]",isElement:e=>e instanceof Element||e instanceof Document,isHTMLElement:e=>e instanceof HTMLElement,isSet:e=>e instanceof Set,isMap:e=>e instanceof Map,isNodeList:e=>Object.prototype.isPrototypeOf.call(NodeList.prototype,e)},cs=e=>{switch(e){case String:case Cp:return"String";case Number:case Ep:return"Number";case Object:case wp:return"Object";case Function:case Ip:return"Function";case Array:case mi:return"Array";case Boolean:case Mp:return"Boolean";case Element:case kp:return"Element";case HTMLElement:case Rp:return"HTMLElement";case NodeList:case Np:return"NodeList";case Set:case"SET":return"Set";case Map:case"MAP":return"Map";case"ANY":return"ANY";default:return qc}},Le=(e,t)=>{switch(e){case String:case Cp:return Ee.isString(t);case Number:case Ep:return Ee.isNumber(t);case Object:case wp:return Ee.isObject(t);case Function:case Ip:return Ee.isFunction(t);case Array:case mi:return Ee.isArray(t);case Boolean:case Mp:return Ee.isBoolean(t);case Element:case kp:return Ee.isElement(t);case HTMLElement:case Rp:return Ee.isHTMLElement(t);case NodeList:case Np:return Ee.isNodeList(t);case Set:case"SET":return Ee.isSet(t);case Map:case"MAP":return Ee.isMap(t);case"ANY":return!0;default:return!0}};var PC=(e,t)=>e.size===t.size&&[...e.keys()].every(r=>e.get(r)===t.get(r)),AC=(e,t)=>e.size===t.size&&[...e].every(r=>t.has(r)),OC=(e,t)=>{if(e.length!==t.length)return!1;let r=new Set([...e,...t]);for(let o of r){let n=e.filter(i=>i===o).length,s=t.filter(i=>i===o).length;if(n!==s)return!1}return!0},Pp=(e,t,r=!1)=>{if(e===null||t===null)return e===t;let n=e,s=t;if(r||(Array.isArray(e)&&(n=[...e].toSorted()),Array.isArray(t)&&(s=[...t].toSorted())),typeof n!="object"||typeof s!="object")return n===s;let i=Object.getOwnPropertyNames(n),a=Object.getOwnPropertyNames(s);if(i.length!==a.length)return!1;for(let c of i){let l=n[c],p=s[c];if(typeof l=="object"&&typeof p=="object"){if(Pp(l,p,r))continue;return!1}if(l!==p)return!1}return!0},Jc=(e,t,r)=>{switch(e){case"ANY":return Pp(t,r);case mi:case Array:return OC(t,r);case"SET":case Set:return AC(t,r);case"MAP":case Map:return PC(t,r);default:return t===r}};var di="UPDATE";var Re={};_o(Re,{extractKeysFromArray:()=>Kc,extractkeyFromProp:()=>Br,getCurrentDependencies:()=>Yc,getFirstCurrentDependencies:()=>Xc,initializeCurrentDependencies:()=>ls,setCurrentDependencies:()=>fi});var Go=[],hi=!1,ls=()=>{hi=!0,Go.length=0},Yc=()=>(hi=!1,[...Go]),Xc=()=>(hi=!1,[...Go]?.[0]??"missing_prop"),fi=e=>{!hi||!e||Go.includes(e)||(Go=[...Go,e])},Br=e=>Le(String,e)?e:(ls(),e(),Xc()),Kc=e=>e.map(t=>Le(String,t)?t:(ls(),t(),Xc()));var gi=new Map,qo=({callBackWatcher:e,prop:t,newValue:r,oldValue:o,validationValue:n,instanceId:s})=>{for(let{prop:i,fn:a,wait:c}of e.values())if(i===t&&!c&&a(r,o,n),s&&i===t&&c){let l=gi.get(s)??new Map,p=l.has(t);if(l.set(t,{newValue:r,oldValue:o,validationValue:n}),p)return;gi.set(s,l),Dt(()=>{let d=gi.get(s),f=d?.get(t);(f.newValue!==void 0||f.newValue!==null)&&a(f.newValue,f.oldValue,f.validationValue),d?.delete(t),d?.size===0&&gi.delete(s)})}},Ap=async({callBackWatcher:e,prop:t,newValue:r,oldValue:o,validationValue:n})=>{for(let{prop:s,fn:i}of e.values())s===t&&await i(r,o,n)};var $C="padding: 10px;",Be=()=>$C;var yr=(e,t=new WeakMap)=>{if(e===null||typeof e!="object"||typeof Element<"u"&&e instanceof Element)return e;if(t.has(e))return t.get(e);if(e instanceof Date)return new Date(e);if(e instanceof RegExp)return new RegExp(e.source,e.flags);if(Array.isArray(e)){let o=[];return t.set(e,o),e.forEach((n,s)=>{o[s]=yr(n,t)}),o}if(typeof e=="function")return e;if(e instanceof Map){let o=new Map;return t.set(e,o),e.forEach((n,s)=>{o.set(yr(s,t),yr(n,t))}),o}if(e instanceof Set){let o=new Set;return t.set(e,o),e.forEach(n=>{o.add(yr(n,t))}),o}let r=Object.create(Object.getPrototypeOf(e));return t.set(e,r),Object.getOwnPropertyNames(e).forEach(o=>{let n=Object.getOwnPropertyDescriptor(e,o);n&&("value"in n?Object.defineProperty(r,o,{...n,value:yr(n.value,t)}):Object.defineProperty(r,o,n))}),Object.getOwnPropertySymbols(e).forEach(o=>{let n=Object.getOwnPropertyDescriptor(e,o);n&&("value"in n?Object.defineProperty(r,o,{...n,value:yr(n.value,t)}):Object.defineProperty(r,o,n))}),r};var Qc="store_shallow_copy",Zc="store_custom_copy",el="store_deep_copy",Jo=Qc,bi=()=>Jo===Zc||Jo===el;var Ue=new Map,re=e=>{if(Jo===Qc){let t=Ue.get(e);return t?{...t}:void 0}if(Jo===Zc){let t=Ue.get(e);return t?{...t,store:{...t.store},validationStatusObject:{...t.validationStatusObject}}:void 0}if(Jo===el){let t=Ue.get(e);return t?{...t,store:yr(t.store),validationStatusObject:yr(t.validationStatusObject)}:void 0}return Ue.get(e)},Pe=(e,t)=>{Ue.set(e,t)},Op=e=>{Ue.delete(e)};var tl=(e,t)=>{console.warn(`%c MobStore supports an object with a depth of up to 2 levels, set 'Any' type to use obj as value, the input object has ${e} level`,t)};var $p=(e,t)=>{console.warn(`%c MobStore, trying to execute set() method: store.${e} not exist`,t)},Lp=(e,t,r)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: setProp methods doesn't allow objects as value, ${JSON.stringify(t)} is an Object, use 'Any' type for custom object`,r)},Dp=(e,t)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: '${JSON.stringify(e)}' is an objects`,t)},Fp=(e,t,r,o)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: ${t} is not a ${cs(r)}`,o)},Bp=(e,t,r)=>{console.warn(`%c trying to execute setObj method on '${e}' propierties: setObj methods allow only objects as value, ${t} is not an Object`,r)},Vp=(e,t)=>{console.warn(`%c trying to execute setObj data method on '${e}' propierties: store propierties '${e}' is not an object`,t)},Wp=(e,t,r)=>{console.warn(`%c trying to execute setObj data method: one of these keys '${e}' not exist in store.${t}`,r)},jp=(e,t,r)=>{console.warn(`%c trying to execute setObj data method on '${e}' propierties: '${JSON.stringify(t)}' have a depth > 1, nested obj is not allowed`,r)},Hp=(e,t,r,o,n)=>{console.warn(`%c trying to execute setObj data method on ${e}.${t} propierties: ${r} is not a ${cs(o)}`,n)},zp=(e,t)=>{console.warn(`%c trying to execute get data method: store.${e} not exist`,t)},rl=(e,t)=>{console.warn(`%c trying to execute set data method: store.${e} not exist`,t)},Up=(e,t)=>{console.warn(`%c one of the keys [${e}] is already used as a computed target, or there is a circular dependencies`,t)},Gp=(e,t)=>{console.warn(`%c MobStore error: the property ${e} to watch doesn't exist in store`,t)},qp=(e,t)=>{console.warn(`%c Validation Object error: validation function return undefined or have you used Object instead '${t}' ?`,e)};var Jp=(e,t)=>{console.warn(`%c MobStore error: the property ${e} should readOnly with proxi, maybe is a mobJs props.`,t)},ol=(e,t)=>{console.warn(`%c MobStore error: the property ${e} fail validation during definition.`,t)};var us=e=>{if(!Ee.isObject(e))return 0;let t=Object.values(e);return t.length===0?1:Math.max(...t.map(r=>us(r)))+1},Yp=(e,t=!0)=>Object.fromEntries(Object.entries(e).map(([r,o])=>{if(Ee.isObject(o)&&t)return[r,Yp(o,!1)];if(Ee.isFunction(o)){let n=o();if(Ee.isObject(n)&&"value"in n&&["validate","type","skipEqual"].some(s=>s in n))return[r,n.value]}return[r,o]})),Xp=(e,t,r,o=!0)=>Object.fromEntries(Object.entries(e).map(([n,s])=>{if(Ee.isObject(s)&&o)return[n,Xp(s,t,r,!1)];if(Ee.isFunction(s)){let i=s();if(Ee.isObject(i)&&"value"in i&&t in i){let a=Ee.isString(i[t])?i[t].toUpperCase():i[t];return[n,a]}}return[n,r]})),Kp=({data:e,depth:t,logStyle:r})=>t>2?(tl(t,r),{}):Yp(e),Yo=({data:e,prop:t,depth:r,logStyle:o,fallback:n})=>r>2?(tl(r,o),{}):Xp(e,t,n),Qp=({value:e})=>Le(Map,e)?new Map(e):Le(Set,e)?new Set(e):Le(Object,e)?{...e}:Le(Array,e)?[...e]:e,Xo=({instanceId:e,prop:t})=>{let r=re(e);if(!r)return!1;let{callBackComputed:o}=r,n=[...o].some(({prop:s})=>t===s);return n&&console.warn(`${t} is used as computed, explicit set is disallowed.`),n};var LC=({instanceId:e,prop:t,val:r,fireCallback:o=!0,useStrict:n=!0,initalizeStep:s=!1})=>{let i=re(e);if(!i)return;let{type:a,fnTransformation:c,store:l,fnValidate:p,strict:d,validationStatusObject:f,skipEqual:h,callBackWatcher:v,bindInstanceBy:b}=i,T=Be(),S=a[t]==="ANY";if(Ee.isObject(r)&&!S){Lp(t,r,T);return}if(Ee.isObject(l[t])&&!S){Dp(t,T);return}let _=l[t],E=c[t]?.(r,_)??r;if(!Le(a[t],E)){Fp(t,E,a[t],T);return}let w=p[t]?.(E,_);!w&&s&&ol(t,T),!(d[t]&&!w&&n||(f[t]=w,(h[t]?Jc(a[t],_,E):!1)&&!s))&&(l[t]=E,Pe(e,{...i,store:l,validationStatusObject:f}),o&&!s&&(qo({callBackWatcher:v,prop:t,newValue:E,oldValue:_,validationValue:f[t],instanceId:e}),vr({instanceId:e,prop:t}),b.forEach(N=>{vr({instanceId:N,prop:t})})))},DC=({instanceId:e,prop:t,val:r,fireCallback:o=!0,useStrict:n=!0,initalizeStep:s=!1})=>{let i=re(e);if(!i)return;let{store:a,type:c,strict:l,fnTransformation:p,fnValidate:d,validationStatusObject:f,skipEqual:h,callBackWatcher:v,bindInstanceBy:b}=i,T=Be();if(!Ee.isObject(r)){Bp(t,r,T);return}if(!Ee.isObject(a[t])){Vp(t,T);return}let S=Object.keys(r),_=Object.keys(a[t]);if(!S.every(M=>_.includes(M))){Wp(S,t,T);return}let C=Object.fromEntries(Object.entries(r).map(M=>{let[L,D]=M,x=a[t][L];return[L,p[t][L]?.(D,x)??D]}));if(!Object.entries(C).map(M=>{let[L,D]=M,x=Le(c[t][L],D);return x||Hp(t,L,D,c[t][L],T),x}).every(M=>M===!0))return;let I=Object.entries(C).map(M=>{let[L,D]=M,x=a[t][L];return l[t][L]&&n?{strictCheck:d[t][L]?.(D,x),item:M}:{strictCheck:!0,item:M}}).filter(({strictCheck:M})=>M===!0);if(I.length===0)return;let A=Object.fromEntries(I.map(({item:M})=>M).map(([M,L])=>[M,L]));Object.entries(A).forEach(M=>{let[L,D]=M,x=a[t][L],P=d[t][L]?.(D,x);!P&&s&&ol(t,T),P===void 0&&qp(T,"ANY"),f[t][L]=P});let O=a[t],R={...a[t],...A};Object.keys(A).every(M=>h[t][M]===!0)&&Object.entries(R).every(([M,L])=>{let D=c[t][M]==="ANY";if(us(L)>1&&!D){jp(t,C,T);return}return Jc(c[t][M],O[M],L)})&&!s||(a[t]=R,Pe(e,{...i,store:a,validationStatusObject:f}),o&&!s&&(qo({callBackWatcher:v,prop:t,newValue:a[t],oldValue:O,validationValue:f[t],instanceId:e}),vr({instanceId:e,prop:t}),b.forEach(M=>{vr({instanceId:M,prop:t})})))},Tr=({instanceId:e,prop:t,value:r,fireCallback:o=!0,clone:n=!1,useStrict:s=!0,action:i,initalizeStep:a=!1})=>{let c=re(e);if(!c)return;let{store:l,type:p}=c;if(!l)return;let d=Be();if(!(t in l)){$p(t,d);return}let f=n?Qp({value:l[t]}):l[t],h=i===di?r(f):r,v=p[t]==="ANY";if(Ee.isObject(f)&&!v){DC({instanceId:e,prop:t,val:h,fireCallback:o,useStrict:s,initalizeStep:a});return}LC({instanceId:e,prop:t,val:h,fireCallback:o,useStrict:s,initalizeStep:a})},Zp=({instanceId:e,prop:t,value:r})=>{let o=re(e);if(!o)return;let{store:n,callBackWatcher:s}=o,i=n[t];n[t]=r,Pe(e,{...o,store:n}),qo({callBackWatcher:s,prop:t,newValue:r,oldValue:i,validationValue:!0,instanceId:e})},em=({store:e,bindInstance:t})=>t.reduce((r,o)=>{let n=re(o);if(!n)return r;let{store:s}=n;return{...r,...s}},e),FC=e=>{let t=re(e);if(!t)return;let{computedPropsQueque:r,callBackComputed:o,store:n,bindInstance:s}=t,i=[...o??[]].filter(({keys:l})=>[...r].find(p=>l.includes(p))),a=em({store:n,bindInstance:s}),c=i.map(({prop:l,keys:p,fn:d})=>{let f=Object.fromEntries(p.map(h=>[h,a[h]]));return{prop:l,value:d(f)}});Pe(e,{...t,computedPropsQueque:new Set,computedRunning:!1}),c.forEach(({prop:l,value:p})=>{Tr({instanceId:e,prop:l,value:p,action:"SET"})})},vr=({instanceId:e,prop:t})=>{let r=re(e);if(!r)return;let{callBackComputed:o,computedPropsQueque:n,computedRunning:s}=r;if(!(!o||o.size===0)&&(n.add(t),Pe(e,{...r,computedPropsQueque:n}),!s)){let i=re(e);if(!i)return;Pe(e,{...i,computedRunning:!0}),Dt(()=>FC(e))}},BC=({instanceId:e,prop:t,keys:r,fn:o})=>{let n=re(e);if(!n)return;let{callBackComputed:s}=n,i=[...s].reduce((a,{prop:c,keys:l})=>l.includes(t)&&r.includes(c)&&!a,!1);if(r.includes(t)||i){Up(r,Be());return}s.add({prop:t,keys:r,fn:o}),Pe(e,{...n,callBackComputed:s})},VC=({instanceId:e,prop:t,keys:r,callback:o})=>{let n=re(e);if(!n)return;let{store:s,bindInstance:i}=n,a=em({store:s,bindInstance:i}),c=Object.fromEntries(r.map(p=>{if(p in a)return[p,a[p]]}).filter(p=>p!==void 0)),l=o(c);Tr({instanceId:e,prop:t,value:l,fireCallback:!1,clone:!1,action:"SET"})},tm=({instanceId:e,prop:t,keys:r,callback:o})=>{let n=r.length===0?(ls(),o({}),Yc()):r;VC({instanceId:e,prop:t,keys:n,callback:o}),BC({instanceId:e,prop:t,keys:n,fn:o})};var rm=e=>{let{store:t}=e,r=Object.entries(t).reduce((o,n)=>{let[s,i]=n;return Ee.isObject(i)?{...o,[s]:{}}:o},{});return{...e,validationStatusObject:r}},om=(e,t)=>{let{store:r}=t;Object.entries(r).forEach(o=>{let[n,s]=o;Tr({instanceId:e,prop:n,value:s,fireCallback:!1,useStrict:!1,action:"SET",initalizeStep:!0})})};var WC=({state:e,prop:t,callback:r,wait:o})=>{let{store:n,callBackWatcher:s}=e,i=Be();if(!n)return{state:void 0,unsubscribeId:""};if(!(t in n))return Gp(t,i),{state:void 0,unsubscribeId:""};let a=ke();return s.set(a,{fn:r,prop:t,wait:o}),{state:{...e,callBackWatcher:s},unsubscribeId:a}},jC=({instanceId:e,unsubscribeId:t})=>{let r=re(e);if(!r)return;let{callBackWatcher:o}=r;o&&(o.delete(t),Pe(e,{...r,callBackWatcher:o}))},nm=({instanceId:e,prop:t,callback:r,wait:o})=>{let n=re(e);if(!n)return()=>{};let{state:s,unsubscribeId:i}=WC({state:n,prop:t,callback:r,wait:o});return s?(Pe(e,s),()=>{jC({instanceId:e,unsubscribeId:i})}):()=>{}},sm=({instanceId:e,prop:t,callback:r,wait:o})=>{let n=re(e);if(!n)return()=>{};let{bindInstance:s,unsubscribeBindInstance:i}=n;if(!s||s.length===0)return nm({instanceId:e,prop:t,callback:r,wait:o});let a=[e,...s].find(p=>{let d=re(p)?.store;return d&&t in d})??"",c=nm({instanceId:a,prop:t,callback:r,wait:o}),l=re(e);return l?(Pe(e,{...l,unsubscribeBindInstance:[...i,c]}),()=>{c();let p=re(e);p&&Pe(e,{...p,unsubscribeBindInstance:i.filter(d=>d!==c)})}):()=>{}};var im=e=>{let t=us(e);return{callBackWatcher:new Map,callBackComputed:new Set,computedPropsQueque:new Set,validationStatusObject:{},dataDepth:t,computedRunning:!1,store:Kp({data:e,depth:t,logStyle:Be()}),type:Yo({data:e,prop:"type",depth:t,logStyle:Be(),fallback:qc}),fnTransformation:Yo({data:e,prop:"transform",depth:t,logStyle:Be(),fallback:r=>r}),fnValidate:Yo({data:e,prop:"validate",depth:t,logStyle:Be(),fallback:()=>!0}),strict:Yo({data:e,prop:"strict",depth:t,logStyle:Be(),fallback:!1}),skipEqual:Yo({data:e,prop:"skipEqual",depth:t,logStyle:Be(),fallback:!0}),proxiObject:void 0,bindInstance:[],bindInstanceBy:[],unsubscribeBindInstance:[],proxiReadOnlyProp:new Set}};var am=e=>{let t=re(e);if(!t)return{};let{store:r}=t;return r??{}},lm=e=>{let t=re(e);if(!t)return{};let{bindInstance:r}=t;return!r||r.length===0?am(e):Object.fromEntries([...r,e].flatMap(o=>Object.entries(am(o))))},cm=({instanceId:e,prop:t})=>{let r=re(e);if(!r)return;let o=r?.store;if(o&&t in o)return o[t];zp(t,Be())},um=({instanceId:e,prop:t})=>{let r=re(e);if(!r)return;let{bindInstance:o}=r;if(!o||o.length===0)return cm({instanceId:e,prop:t});let n=[e,...o].find(s=>{let i=Ue.get(s)?.store;return i&&t in i})??"";return cm({instanceId:n,prop:t})};var pm=({instanceId:e,prop:t})=>{let r=re(e);if(!r)return;let{store:o,callBackWatcher:n,validationStatusObject:s,bindInstanceBy:i}=r;o&&(t in o?(qo({callBackWatcher:n,prop:t,newValue:o[t],oldValue:o[t],validationValue:s[t],instanceId:e}),vr({instanceId:e,prop:t}),i.forEach(a=>{vr({instanceId:a,prop:t})})):rl(t,Be()))},yi=({instanceId:e,prop:t})=>{let r=re(e);if(!r)return;let{bindInstance:o}=r;if(!o||o.length===0){pm({instanceId:e,prop:t});return}let n=[e,...o].find(s=>{let i=Ue.get(s)?.store;return i&&t in i})??"";pm({instanceId:n,prop:t})},mm=async({instanceId:e,prop:t})=>{let r=re(e);if(!r)return new Promise(a=>a(""));let{store:o,callBackWatcher:n,validationStatusObject:s,bindInstanceBy:i}=r;return o?t in o?(await Ap({callBackWatcher:n,prop:t,newValue:o[t],oldValue:o[t],validationValue:s[t],instanceId:e}),vr({instanceId:e,prop:t}),i.forEach(a=>{vr({instanceId:a,prop:t})}),{success:!0}):(rl(t,Be()),{success:!1}):{success:!1}},dm=async({instanceId:e,prop:t})=>{let r=re(e);if(!r)return new Promise(s=>s(""));let{bindInstance:o}=r;if(!o||o.length===0)return mm({instanceId:e,prop:t});let n=[e,...o].find(s=>{let i=Ue.get(s)?.store;return i&&t in i})??"";return mm({instanceId:n,prop:t})};var hm=({instanceId:e})=>{let t=re(e);if(!t)return;let{validationStatusObject:r}=t;return r},fm=({instanceId:e})=>{let t=re(e);if(!t)return;let{store:r}=t;console.log(r)},gm=({instanceId:e})=>{let t=re(e);if(!t)return;let{validationStatusObject:r}=t;console.log(r)},bm=({instanceId:e})=>{let t=re(e);console.log(t)};var ym=({instanceId:e})=>{let t=Be(),r=Ue.get(e);if(!r)return{};let{bindInstance:o,proxiObject:n,proxiReadOnlyProp:s}=r;if(n)return n;let i=r?.store,a=new Proxy(i,{set(p,d,f){let h=bi()?Ue.get(e)?.store??p:p;if(!h)return!1;if(d in h){let v=Xo({instanceId:e,prop:d}),b=s.has(d);return b&&Jp(d,t),v||b?!1:(Tr({instanceId:e,prop:d,value:f,fireCallback:!0,clone:!1,action:"SET"}),!0)}return!1},get(p,d){let f=bi()?Ue.get(e)?.store??p:p;return!f||!(d in f)?!1:(fi(d),f[d])}});if(!o||o.length===0)return Pe(e,{...r,proxiObject:a}),a;let c=o.map(p=>{let f=Ue.get(p)?.store??{};return new Proxy(f,{set(){return!1},get(h,v){let b=bi()?Ue.get(p)?.store??h:h;return!b||!(v in b)?!1:(fi(v),b[v])}})}),l=new Proxy([a,...c],{set(p,d,f){let h=p.find(v=>d in v);return h?(Reflect.set(h,d,f),!0):!1},get(p,d){let f=p.find(h=>d in h);return f?Reflect.get(f,d):!1}});return Pe(e,{...r,proxiObject:l}),l};var HC=({selfId:e,bindId:t})=>{let r=re(t);if(!r)return;let{bindInstanceBy:o}=r,n=[...o,e];Pe(t,{...r,bindInstanceBy:n})},vm=({selfId:e,bindId:t})=>{let r=re(t);if(!r)return;let{bindInstanceBy:o}=r,n=o.filter(s=>s!==e);Pe(t,{...r,bindInstanceBy:n})},zC=({bindStores:e,selfStore:t})=>{let o=[...Le(Array,e)?e.map(n=>n.get()):[e.get()],t.store];o.forEach((n,s)=>{o.forEach((i,a)=>{if(s<=a)return;let c=Object.keys(n).filter(l=>Object.keys(i).includes(l));c.length>0&&console.warn(`bindStore: prop conflict on following prop: '${c}', bind store key must be univoque'`)})})},Tm=({value:e,instanceId:t})=>{let r=re(t);if(!r)return;zC({bindStores:e,selfStore:r});let{bindInstance:o}=r;if(!o)return;let n=Le(Array,e)?e.map(i=>i.getId()):[e.getId()],s=[...o,...n];Pe(t,{...r,bindInstance:s}),n.forEach(i=>{HC({selfId:t,bindId:i})})};var _m=e=>{let t=Ue.get(e);if(!t)return;t.callBackWatcher.clear(),t.callBackComputed.clear(),t.computedPropsQueque.clear(),t.store={},t.proxiObject=null;let{unsubscribeBindInstance:r,bindInstance:o}=t;r.forEach(n=>{n?.()}),o.forEach(n=>{vm({selfId:e,bindId:n})}),Op(e)};var Sm=({instanceId:e,values:t})=>{let r=re(e);if(!r)return;let{proxiReadOnlyProp:o}=r;t.forEach(n=>{o.add(n)}),Pe(e,r)};var vi=(e={})=>{let t=ke(),r=im(e),o=rm(r);return Pe(t,o),om(t,r),{getId:()=>t,bindStore:n=>{Tm({value:n,instanceId:t})},get:()=>lm(t),getProp:n=>um({instanceId:t,prop:n}),set:(n,s,{emit:i=!0,usePropAsString:a=!1}={})=>{let c=a?n:Br(n);Xo({instanceId:t,prop:c})||Tr({instanceId:t,prop:c,value:s,fireCallback:i??!0,clone:!1,action:"SET"})},update:(n,s,{emit:i=!0,clone:a=!1,usePropAsString:c=!1}={})=>{let l=c?n:Br(n);Xo({instanceId:t,prop:l})||Tr({instanceId:t,prop:l,value:s,fireCallback:i??!0,clone:a,action:di})},getProxi:()=>ym({instanceId:t}),quickSetProp:(n,s)=>{Xo({instanceId:t,prop:n})||Zp({instanceId:t,prop:n,value:s})},watch:(n,s,{wait:i=!1,immediate:a=!1}={})=>{let c=Br(n),l=sm({instanceId:t,prop:c,callback:s,wait:i});return a&&Dt(()=>{yi({instanceId:t,prop:c})}),l},computed:(n,s,i=[],{usePropAsString:a=!1}={})=>{let c=a?n:Br(n),l=Kc(i);tm({instanceId:t,prop:c,keys:l,callback:s}),Dt(()=>{yi({instanceId:t,prop:c})})},emit:n=>{let s=Br(n);yi({instanceId:t,prop:s})},emitAsync:async n=>{let s=Br(n);return dm({instanceId:t,prop:s})},setProxiReadOnlyProp:n=>{Sm({instanceId:t,values:n})},getValidation:()=>hm({instanceId:t}),debug:()=>{bm({instanceId:t})},debugStore:()=>{fm({instanceId:t})},debugValidate:()=>{gm({instanceId:t})},destroy:()=>{_m(t)}}};var _e=vi({usePassive:()=>({value:!1,type:Boolean}),currentFrame:()=>({value:0,type:Number}),instantFps:()=>({value:60,type:Number}),requestFrame:()=>({value:()=>{},type:Function}),deferredNextTick:()=>({value:!0,type:Boolean}),throttle:()=>({value:60,type:Number}),spinYMaxValue:()=>({value:2.5,type:Number}),spinXMaxValue:()=>({value:2.5,type:Number})});var nl=!1,ps=new Map;function xm(){if(ps.size===0){globalThis.removeEventListener("DOMContentLoaded",xm),nl=!1;return}for(let e of ps.values())e();ps.clear()}function UC(){nl||(nl=!0,globalThis.addEventListener("DOMContentLoaded",xm,{passive:!1}))}var GC=e=>{let t=ke();return ps.set(t,e),typeof globalThis<"u"&&UC(),()=>ps.delete(t)},Cm=GC;function Ti(e){let t=0,r=0,o=0,n=0;return"detail"in e&&(r=e.detail),"wheelDelta"in e&&(r=-e.wheelDelta/120),"wheelDeltaY"in e&&(r=-e.wheelDeltaY/120),"wheelDeltaX"in e&&(t=-e.wheelDeltaX/120),"axis"in e&&e.axis===e.HORIZONTAL_AXIS&&(t=r,r=0),o=t*10,n=r*10,"deltaY"in e&&(n=e.deltaY),"deltaX"in e&&(o=e.deltaX),(o||n)&&e.deltaMode&&(e.deltaMode==1?(o*=40,n*=40):(o*=800,n*=800)),o&&!t&&(t=o<1?-1:1),n&&!r&&(r=n<1?-1:1),{spinX:t,spinY:r,pixelX:o,pixelY:n}}function qC({type:e,event:t}){let r=t;return e==="touchend"&&"changedTouches"in t?r.changedTouches[0]:"touches"in r?r.touches[0]:t}function JC({type:e,event:t}){let r=t;return e==="touchend"&&"changedTouches"in t?r.changedTouches[0]:"touches"in r?r.touches[0]:t}function Wr(e){let t=!1,r=new Map,{usePassive:o}=_e.get();_e.watch("usePassive",()=>{globalThis.removeEventListener(e,n),t=!1,s()});function n(a){if(r.size===0){globalThis.removeEventListener(e,n),t=!1;return}let c=a.type,{pageX:l,pageY:p}=qC({type:c,event:a}),{clientX:d,clientY:f}=JC({type:c,event:a}),h=a.target,v={page:{x:l,y:p},client:{x:d,y:f},target:h,type:c,preventDefault:()=>o?()=>{}:a.preventDefault()};if(c==="wheel"){let b=_e.getProp("spinYMaxValue"),T=_e.getProp("spinXMaxValue"),{spinX:S,spinY:_,pixelX:E,pixelY:C}=Ti(a);Object.assign(v,{spinX:Gc(S,-T,T),spinY:Gc(_,-b,b),pixelX:E,pixelY:C})}for(let b of r.values())b(v)}function s(){t||(t=!0,o=_e.getProp("usePassive"),globalThis.addEventListener(e,n,{passive:o}))}return a=>{let c=ke();return r.set(c,a),typeof globalThis<"u"&&s(),()=>r.delete(c)}}var Em=Wr("click"),wm=Wr("mousedown"),Im=Wr("touchstart"),Mm=Wr("mousemove"),km=Wr("touchmove"),Rm=Wr("mouseup"),Nm=Wr("touchend"),Pm=Wr("wheel");var Co=0,Xe=new Map,YC=(e={},t=()=>{})=>{let r=ke();return Xe.set(r,{el:e,fn:t,data:new Map,freeze:{active:!1,atFrame:0}}),{id:r,unsubscribe:()=>{if(Xe.has(r)){let o=Xe.get(r);if(!o)return;let n=o.data.size;if(Xe.delete(r),!n)return;Co=Co-n}}}},XC=({id:e,callBackObject:t,frame:r})=>{if(!Xe.has(e))return;let{currentFrame:o}=_e.get(),n=Xe.get(e);if(!n?.data)return;let{data:s}=n;s.has(r+o)||(s.set(r+o,t),Co++)},KC=e=>{Xe.has(e)&&Xe.delete(e)},QC=e=>{let t=Xe.get(e);if(!t||t.freeze.active)return;let{currentFrame:r}=_e.get();t.freeze={active:!0,atFrame:r}},ZC=({id:e,update:t=!0})=>{let r=Xe.get(e);if(!r||!r.freeze.active)return;if(!t){r.freeze={active:!1,atFrame:0};return}let{currentFrame:o}=_e.get(),{atFrame:n}=r.freeze,s=[];for(let[i,a]of r.data){let c=i+o-n;r.data.delete(i),s.push({frame:c,value:a})}s.forEach(({frame:i,value:a})=>{r.data.set(i,a)}),s.length=0,r.freeze={active:!1,atFrame:0}},eE=e=>{let t=Xe.get(e);if(!t)return;let r=t.data.size;Co=Co-r,t.data.clear()},tE=e=>Xe.get(e)??{},rE=e=>{for(let t of Xe.values()){let{data:r,fn:o,el:n,freeze:s}=t,i=r.get(e);i&&!s.active&&(o(i,n),r.delete(e),Co--)}},oE=({id:e,obj:t={}})=>{if(!Xe.has(e))return;let r=Xe.get(e);if(!r)return;let{el:o,fn:n,freeze:s}=r;s.active||n(t,o)},nE=()=>Co,sE=e=>{for(let[t,r]of Xe){let{data:o,fn:n,el:s,freeze:i}=r,a=new Map;for(let[c,l]of o)a.set(c-e,l),o.delete(c);Xe.set(t,{data:a,fn:n,el:s,freeze:i})}},Ko={add:YC,get:tE,update:XC,remove:KC,clean:eE,fire:rE,fireObject:oE,getCacheCounter:nE,updateFrameId:sE,freeze:QC,unFreeze:ZC};var sl=!1,_i=new Map;function Am(){if(_i.size===0){globalThis.removeEventListener("visibilitychange",Am),sl=!1;return}let e={visibilityState:document.visibilityState};for(let t of _i.values())t(e)}function iE(){sl||(sl=!0,globalThis.addEventListener("visibilitychange",Am,{passive:!1}))}var aE=e=>{let t=ke();return _i.set(t,e),typeof globalThis<"u"&&iE(),()=>_i.delete(t)},Si=aE;var ms=[],cE=(e=()=>{},t=100)=>{ms.push({cb:e,priority:t})},lE=({time:e,fps:t})=>{ms.length!==0&&(ms.sort((r,o)=>r.priority-o.priority),ms.forEach(({cb:r})=>r({time:e,fps:t})),ms.length=0)},wt={add:cE,fire:lE};var il=[],uE=e=>{il.push(e)},pE=()=>{let e=[...il];return il.length=0,e},Qo={add:uE,get:pE};var jr=new Map,mE=e=>{let t=[...jr.entries()];jr.clear(),t.forEach(([r,o])=>{jr.set(r-e,o)})},dE=({currentFrame:e,time:t,fps:r})=>{let o=jr.get(e)??[];!o||o.length===0||(o.forEach(n=>n({time:t,fps:r})),jr.delete(e))},hE=(e,t)=>{let r=t+_e.getProp("currentFrame"),o=jr.get(r)??[];jr.set(r,[...o,e]),_e.emit("requestFrame")},fE=()=>jr.size,Zo={add:hE,fire:dE,updateKeys:mE,getAmountOfFrameToFire:fE};var al="animationStop",Om=()=>{globalThis.addEventListener("unhandledrejection",e=>{e.reason===al&&e.preventDefault()})};var $m=!1,xi=({force:e=!1,duration:t=30}={})=>{if($m&&!e){let{instantFps:r}=_e.get();return new Promise(o=>{o({averageFPS:r})})}return new Promise(r=>{let o=[],s=0,i=0,a=0,c=0,l=0,p=d=>{if(d*=.001,c===0){c=d,requestAnimationFrame(p);return}let f=d-c;c=d;let h=Number.isFinite(1/f)?1/f:60,v=Math.max(h,60);a+=v-(o[s]||0),o[s++]=v,i=Math.max(i,s),s%=25;let b=Math.round(a/i);if(l++,l>=t){_e.quickSetProp("instantFps",b),$m=!0,r({averageFPS:b});return}requestAnimationFrame(p)};requestAnimationFrame(p)})};xi();var cl=1e7,Bm=2e3,ml=!1,Hr=[],Ke=Yt(),Lm=0,ll=0,ul=0,dl=0,pl=0,en=!1,ot=60,Mi=ot,Ci=0,Ei=0,_r=0,wi=!1,Ii=!1,gE=()=>ot<Mi/5*3,bE=()=>ot<Mi/5*4,yE=()=>{!gE()||wi||(wi=!0,setTimeout(()=>{wi=!1},4e3))},vE=()=>{!bE()||Ii||(Ii=!0,setTimeout(()=>{Ii=!1},4e3))};Si(({visibilityState:e})=>{en=e==="visible"});Om();_e.watch("requestFrame",()=>{ki()});var Dm=()=>{_r===cl&&(_r=0,_e.quickSetProp("currentFrame",_r),Zo.updateKeys(cl),Ko.updateFrameId(cl)),wt.fire({time:Ke,fps:ot}),Hr=[...Hr,...Qo.get()],ml=!1,Hr.length>0||Zo.getAmountOfFrameToFire()>0||Ko.getCacheCounter()>0||Ke<Bm?ki():(en=!0,_r=0,dl=Ke,_e.quickSetProp("currentFrame",_r))},Fm=e=>{Ke=e,ul=Ke-ll,en&&(Lm+=ul),ll+=ul,Ke=Math.round(ll-Lm);let t=Math.round(1e3/ot);pl=Math.abs(Ke-dl-t);let r=pl>100?pl:0;Ke=Ke-r,dl=Ke,en?(Ei=Ke,Ci=0,ot=_e.getProp("instantFps")):Ci++,Ke>Ei+1e3&&!en&&(ot=Ke>Bm?Math.round(Ci*1e3/(Ke-Ei)):_e.getProp("instantFps"),Ei=Ke,Ci=0,ot=ot<30?_e.getProp("instantFps"):ot),ot>Mi&&(Mi=ot),yE(),vE(),Hr.forEach(n=>n({time:Ke,fps:ot})),Zo.fire({currentFrame:_r,time:Ke,fps:ot}),Ko.fire(_r),_r++,_e.quickSetProp("currentFrame",_r),Hr.length=0,en=!1,_e.getProp("deferredNextTick")?Dt(()=>Dm()):Dm()},ki=()=>{ml||(typeof globalThis>"u"?setTimeout(()=>Fm(Yt()),Sp):requestAnimationFrame(Fm),ml=!0)},Ft={add:s=>{Hr.push(s),ki()},addMultiple:(s=[])=>{Hr=[...Hr,...s],ki()},getFps:()=>ot,mustMakeSomething:()=>wi,shouldMakeSomething:()=>Ii};var hl=!1,Ri=new Map,fl=()=>{},Vm=window.innerHeight,Wm=window.innerWidth;function TE(){if(Ri.size===0){window.removeEventListener("resize",fl),hl=!1;return}let e=window.innerHeight,t=window.innerWidth,r=e!==Vm,o=t!==Wm;Vm=e,Wm=t;let n={scrollY:window.scrollY,windowsHeight:e,windowsWidth:t,documentHeight:document.documentElement.scrollHeight,verticalResize:r,horizontalResize:o};for(let s of Ri.values())s(n)}function _E(){hl||(hl=!0,fl=So(()=>TE()),window.addEventListener("resize",fl,{passive:!1}))}var SE=e=>{let t=ke();return Ri.set(t,e),typeof globalThis<"u"&&_E(),()=>Ri.delete(t)},jm=SE;var gl=!1,Ni=new Map,xE="UP",Um="DOWN",Hm=window.scrollY,ds=window.scrollY,bl=Um,zm={scrollY:ds,direction:bl};function Gm(){if(Ni.size===0){window.removeEventListener("scroll",Gm),gl=!1;return}Hm=ds,ds=window.scrollY,bl=ds>Hm?Um:xE,zm={scrollY:ds,direction:bl};for(let e of Ni.values())e(zm)}function CE(){gl||(gl=!0,window.addEventListener("scroll",Gm,{passive:!0}))}var EE=e=>{let t=ke();return Ni.set(t,e),typeof globalThis<"u"&&CE(),()=>Ni.delete(t)},Sr=EE;var yl=!1,Pi=new Map,qm=()=>{};function wE(e){if(Pi.size===0){qm(),yl=!1;return}Ft.add(()=>{wt.add(()=>{for(let t of Pi.values())t(e)},0)})}function IE(){yl||(yl=!0,qm=Sr(wE))}var ME=e=>{let t=ke();return Pi.set(t,e),typeof globalThis<"u"&&IE(),()=>Pi.delete(t)},Jm=ME;var vl=!1,Ai=new Map,Ym,Xm=()=>{};function kE(e){if(Ai.size===0){Xm(),vl=!1;return}Ft.add(()=>{wt.add(()=>{for(let t of Ai.values())t(e)},0)})}function RE(){vl||(vl=!0,Ym=ui(e=>kE(e),_e.getProp("throttle")),Xm=Sr(Ym))}var NE=e=>{let t=ke();return Ai.set(t,e),typeof globalThis<"u"&&RE(),()=>Ai.delete(t)},Km=NE;var Qm=()=>{},Zm=()=>{},ed=()=>{};function td(e){let t=!1,r=new Map,o=!1;function n(){if(o=!1,r.size===0){Zm(),e==="START"&&Qm(),t=!1;return}Ft.add(()=>{wt.add(()=>{let a={scrollY:window.scrollY};if(e==="END")for(let c of r.values())c(a)},0)})}function s(){t||(t=!0,ed=So(()=>n()),Zm=Sr(ed),e==="START"&&(Qm=Sr(({scrollY:a})=>{let c={scrollY:a};if(!o){o=!0;for(let l of r.values())l(c)}})))}return a=>{let c=ke();return r.set(c,a),typeof globalThis<"u"&&s(),()=>r.delete(c)}}var rd=td("START"),od=td("END");function tn(e){let t=!1,r=new Map;function o(i){if(r.size===0){globalThis.removeEventListener(e,o),t=!1;return}for(let a of r.values())a(i)}function n(){t||(t=!0,globalThis.addEventListener(e,o))}return i=>{let a=ke();return r.set(a,i),typeof globalThis<"u"&&n(),()=>r.delete(a)}}var nd=tn("pointerover"),sd=tn("pointerdown"),id=tn("pointermove"),ad=tn("pointerup"),cd=tn("pointerout"),ld=tn("pointerleave");var Ve=Symbol("LinkedList.setNext"),We=Symbol("LinkedList.setPrev"),Oi="after",Tl="before",rn=class{#n=null;#t=null;constructor(t){this.data=t}get next(){return this.#n}[Ve](t){this.#n=t}get prev(){return this.#t}[We](t){this.#t=t}dispose(){this.data=null,this.#n=null,this.#t=null}},on=class e{#n=null;#t=null;#i=0;#l=new WeakSet;addLast(t){let r=new rn(t);return this.#l.add(r),this.#n?(this.#t&&this.#t[Ve](r),r[We](this.#t),this.#t=r,this.#i++,this):(this.#n=r,this.#t=r,this.#i++,this)}addFirst(t){let r=new rn(t);return this.#l.add(r),this.#n?(r[Ve](this.#n),this.#n[We](r),this.#n=r,this.#i++,this):(this.#n=r,this.#t=r,this.#i++,this)}removeNode(t){return!t||!this.#l.has(t)?this:t===this.#n?this.removeFirst():t===this.#t?this.removeLast():(t.prev&&t.prev[Ve](t.next),t.next&&t.next[We](t.prev),t.dispose(),this.#i--,this)}removeFirst(){if(this.#n===null)return this;let t=this.#n;return this.#n=this.#n.next,this.#n&&this.#n[We](null),this.#n===null&&(this.#t=null),t.dispose(),this.#i--,this}removeLast(){if(this.#t===null)return this;let t=this.#t;return this.#t=this.#t.prev,this.#t&&this.#t[Ve](null),this.#t===null&&(this.#n=null),t.dispose(),this.#i--,this}insertAfter(t,r){if(!t||!this.#l.has(t))return this;let o=new rn(r);return this.#l.add(o),o[We](t),o[Ve](t.next),t.next&&t.next[We](o),t[Ve](o),t===this.#t&&(this.#t=o),this.#i++,this}insertBefore(t,r){if(!t||!this.#l.has(t))return this;let o=new rn(r);return this.#l.add(o),o[Ve](t),o[We](t.prev),t.prev&&t.prev[Ve](o),t[We](o),t===this.#n&&(this.#n=o),this.#i++,this}move(t,r,o=Oi){return!this.#l.has(t)||!this.#l.has(r)?this:t===r?this:o===Oi&&r.next===t?this:o===Tl&&r.prev===t?this:(t.prev&&t.prev[Ve](t.next),t.next&&t.next[We](t.prev),t===this.#n&&(this.#n=t.next),t===this.#t&&(this.#t=t.prev),o==Oi&&(t[We](r),t[Ve](r.next),r.next&&r.next[We](t),r[Ve](t),r===this.#t&&(this.#t=t)),o==Tl&&(t[We](r.prev),t[Ve](r),r.prev&&r.prev[Ve](t),r[We](t),r===this.#n&&(this.#n=t)),this)}moveAfter(t,r){return this.move(t,r,Oi)}moveBefore(t,r){return this.move(t,r,Tl)}swap(t,r){if(!this.#l.has(t)||!this.#l.has(r))return this;if(t===r)return this;if(t.next===r)return this.moveAfter(t,r);if(r.next===t)return this.moveAfter(r,t);let o=t.prev,n=t.next,s=r.prev,i=r.next,a=t===this.#n,c=t===this.#t,l=r===this.#n,p=r===this.#t;return o&&o[Ve](n),n&&n[We](o),s&&s[Ve](i),i&&i[We](s),t[We](s),t[Ve](i),r[We](o),r[Ve](n),s&&s[Ve](t),i&&i[We](t),o&&o[Ve](r),n&&n[We](r),a?this.#n=r:l&&(this.#n=t),c?this.#t=r:p&&(this.#t=t),this}find(t){let r=this.#n,o;for(;r!==null;){if(t(r)){o=r;break}r=r.next}return o}filter(t){let r=this.#n,o=new e,n=0;for(;r!==null;)t(r,n)&&o.addLast(r.data),r=r.next,n++;return o}map(t){let r=this.#n,o=new e,n=0;for(;r!==null;)o.addLast(t(r,n)),r=r.next,n++;return o}*[Symbol.iterator](){let t=this.#n;for(;t;)yield t,t=t.next}traverse(t){let r=this.#n;for(;r!==null;)t(r),r=r.next;return this}async traverseAsync(t){let r=this.#n;for(;r!==null;)await t(r),r=r.next;return this}traverseReverse(t){let r=this.#t;for(;r!==null;)t(r),r=r.prev;return this}async traverseReverseAsync(t){let r=this.#t;for(;r!==null;)await t(r),r=r.prev;return this}execute(t){return t(this),this}async executeAsync(t){return await t(this),this}print(){let t=this.#n,r=[];for(;t!==null;)r.push(t.data),t=t.next;return console.log(r),this}clear(){let t=this.#n,r=[];for(;t!==null;)r.push(t),t=t.next;for(let o of r)o.dispose();return this.#n=null,this.#t=null,this.#i=0,r.length=0,this}reverse(){let t=this.#n;for(this.#n=this.#t,this.#t=t;t!==null;){let r=t.next,o=t.prev;t[Ve](o),t[We](r),t=r}return this}toArray(){let t=[],r=this.#n;for(;r!==null;)t.push(r.data),r=r.next;return t}toArrayReverse(){let t=[],r=this.#t;for(;r!==null;)t.push(r.data),r=r.prev;return t}get first(){return this.#n}get last(){return this.#t}get size(){return this.#i}};function PE(e){return vi(e)}function AE(){return _e.getProp("instantFps")}function OE(){return Ft.getFps()}function $E(){return Ft.mustMakeSomething()}function LE(){return Ft.shouldMakeSomething()}function DE(e=()=>{}){return Ft.add(e)}function FE(e=()=>{}){return wt.add(e)}function BE(e=()=>{}){return Qo.add(e)}function VE(e=()=>{},t=0){return Zo.add(e,t)}async function WE({force:e=!1,duration:t=30}={}){return await xi({force:e,duration:t})}function jE(e=()=>{}){return Cm(e)}var HE=Ko;function zE(e=()=>{}){return jm(e)}function UE(e=()=>{}){return Si(e)}function GE(e=()=>{}){return Em(e)}function qE(e=()=>{}){return wm(e)}function JE(e=()=>{}){return Im(e)}function YE(e=()=>{}){return Mm(e)}function XE(e=()=>{}){return km(e)}function KE(e=()=>{}){return Rm(e)}function QE(e=()=>{}){return Nm(e)}function ZE(e=()=>{}){return Pm(e)}function ew(e=()=>{}){return Jm(e)}function tw(e=()=>{}){return Sr(e)}function rw(e=()=>{}){return Km(e)}function ow(e=()=>{}){return rd(e)}function nw(e=()=>{}){return od(e)}function sw(e=()=>{}){return nd(e)}function iw(e=()=>{}){return sd(e)}function aw(e=()=>{}){return id(e)}function cw(e=()=>{}){return ad(e)}function lw(e=()=>{}){return cd(e)}function uw(e=()=>{}){return ld(e)}var pw=_e;function mw(){return new on}var m={};_o(m,{afterRouteChange:()=>hd,beforeRouteChange:()=>dd,componentMap:()=>W,createComponent:()=>Qh,eventDelegationMap:()=>Ao,getActiveParams:()=>bd,getActiveRoute:()=>gd,getChildrenIdByName:()=>ji,getComponentNameById:()=>Vd,getDebugMode:()=>Kh,getIdByInstanceName:()=>rr,getNumberOfActiveInvalidate:()=>Zg,getNumberOfActiveRepeater:()=>eb,getParentIdById:()=>bs,getPropsFromParent:()=>ba,getRoot:()=>ua,getStateById:()=>nr,getStateByName:()=>ph,getTree:()=>zd,inizializeApp:()=>Qg,loadUrl:()=>Kg,mainStore:()=>me,onRouteLoading:()=>fd,removeAndDestroyById:()=>st,setStateById:()=>yn,setStateByName:()=>qh,staticProps:()=>ya,tempDelegateEventMap:()=>Ss,tick:()=>Er,updateStateByName:()=>Yh,useComponent:()=>ea,useMethodArrayByName:()=>qd,useMethodByName:()=>mn,watchById:()=>It});var nn="activeRoute",sn="activeParams",Eo="beforeRouteChange",an="afterRouteChange",Xt="routeIsLoading",pt="parserAsync",zr="default",ud="repeater",pd="invalidate",md="render_component";var me=u.createStore({[nn]:()=>({value:{route:"",templateName:""},type:"any",skipEqual:!1}),[sn]:()=>({value:{},type:"any",skipEqual:!1}),[Eo]:()=>({value:{currentRoute:"",currentTemplate:"",nextRoute:"",nextTemplate:""},type:"any",skipEqual:!1}),[an]:()=>({value:{currentRoute:"",currentTemplate:"",previousRoute:"",previousTemplate:""},type:"any",skipEqual:!1}),[Xt]:()=>({value:!1,type:Boolean}),[pt]:{element:()=>({value:document.createElement("div"),type:HTMLElement,skipEqual:!1}),parentId:()=>({value:"",type:String,skipEqual:!1}),persistent:()=>({value:!1,type:Boolean,skipEqual:!1}),source:()=>({value:zr,type:String,skipEqual:!1})}}),cn=()=>{me.set(pt,{element:document.createElement("div"),parentId:"",persistent:!1,source:zr},{emit:!1})};var dd=e=>me.watch(Eo,({currentRoute:t,currentTemplate:r,nextRoute:o,nextTemplate:n})=>{e({currentRoute:t,currentTemplate:r,nextRoute:o,nextTemplate:n})}),hd=e=>me.watch(an,({currentRoute:t,currentTemplate:r,previousRoute:o,previousTemplate:n})=>{e({currentRoute:t,currentTemplate:r,previousRoute:o,previousTemplate:n})}),fd=e=>me.watch(Xt,t=>{e(t)}),gd=()=>{let{activeRoute:e}=me.get();return e},bd=()=>{let{activeParams:e}=me.get();return e};var W=new Map;var G=new Map;var yd=({componentId:e,repeatId:t})=>{let r=G.get(t);if(!r)return;let{componentChildren:o}=r;G.set(t,{...r,componentChildren:[...o,e]})},vd=({componentId:e,repeatId:t})=>{let r=G.get(t);if(!r)return;let{componentChildren:o}=r;G.set(t,{...r,componentChildren:o.filter(n=>n!==e)})},_l=({repeatId:e})=>{let t=G.get(e);if(!t)return[];let{componentChildren:r}=t;return r},Td=({repeatId:e})=>{let t=G.get(e);if(!t)return!1;let{componentChildren:r}=t;return r.length>0};var _d=new WeakMap,Sd=({element:e,id:t})=>{_d.set(e,t)},ln=({element:e})=>_d.get(e);var xd=({id:e="",newElement:t=document.createElement("div")})=>{if(!e||e==="")return;let r=W.get(e);r&&(W.set(e,{...r,element:t}),Sd({element:t,id:e}))},hs=({id:e=""})=>!e||e===""?void 0:W.get(e)?.element,Cd=({element:e})=>e?ln({element:e}):"",Sl=({keyValue:e="",repeatId:t=""})=>e?.length===0?[]:_l({repeatId:t}).map(n=>W.get(n)).filter(n=>n!==void 0).filter(n=>`${n.key}`==`${e}`).map(({element:n,id:s})=>({element:n,id:s})),xl=({id:e,repeatId:t})=>!e||e===""?[]:_l({repeatId:t}).map(o=>W.get(o)).filter(o=>o!==void 0).map(o=>o.id);var Ed="data-mobjs",wo="componentid",$i="bindtextid",Li="bindobjectid";var un="staticprops",Di="bindprops",wd="name",Id="name",Md="slot",Bt="repeaterchild";var Kt="currentRepeaterValue",Qt="repeatPropBind",Fi="bindevents",Zt="weakbindevents",pn="bindeffect",kd="parentid";var er="bindrefid",xr="bindrefname",Bi="invalidateid",Vi="mobjsrepeat";var tr={current:{},index:-1},Rd="QUEQUE_BINDPROPS",Cl="QUEQUE_REPEATER",El="QUEQUE_INVALIDATE";var Ur=new Map;var fs=({id:e})=>{if(!G.has(e))return;if(Ur.has(e)){let r=Ur.get(e);r?.removeCustomComponent(),r?.remove(),Ur.delete(e)}return G.get(e)?.element};var Wi=({id:e="",value:t})=>{if(!e||e==="")return;let r=W.get(e);r&&W.set(e,{...r,currentRepeaterState:t})},Nd=({rootNode:e,currentNode:t})=>{if(!(!t||!e.contains(t)))return t.parentElement===e?t:Nd({rootNode:e,currentNode:t.parentElement})},dw=({rootNode:e,node:t})=>{if(e)return Nd({rootNode:e,currentNode:t.parentElement})},Vt=({id:e=""})=>{if(!e||e==="")return tr;let r=W.get(e)?.currentRepeaterState;return r||tr};var Pd=({id:e="",repeatId:t="",element:r})=>{if(!e||e==="")return;let o=W.get(e);if(!o)return;let n=fs({id:t}),s=dw({rootNode:n,node:r});W.set(e,{...o,repeaterInnerWrap:s})},gs=({id:e})=>!e||e===""?void 0:W.get(e)?.repeaterInnerWrap;var ji=({id:e="",componentName:t=""})=>{if(!e||e==="")return[];let o=W.get(e)?.child;return o?o?.[t]??[]:(console.warn("getChildIdById failed no id found"),[])};var Ad=({children:e,key:t,current:r,currentUnivoque:o,useIndex:n=!1})=>{let s=n?r:o,i=e.map(l=>{let{index:p,current:d}=Vt({id:l?.[0]});return{index:p,key:d?.[t],items:l}});return s.map((l,p)=>({index:p,key:l?.[t]})).map(l=>{let p=n?"index":"key";return i.find(d=>d[p]===l[p])}).filter(l=>l!==void 0).map(({items:l})=>l)};var Od="",$d,Ld=({contentId:e=""})=>{Od=e};var Dd=()=>{$d=document?.querySelector(Od)},Hi=()=>$d;var Gr=new Map,Fd=({instanceName:e,id:t})=>{let r=Gr.get(e)??[];Gr.set(e,[...r,t])},Bd=({instanceName:e,id:t})=>{let r=Gr.get(e);if(!r)return;let o=r.filter(n=>n!==t);o.length===0&&Gr.delete(e),o.length>0&&Gr.set(e,o)},wl=({instanceName:e})=>Gr.get(e)??[];var Vd=(e="")=>{if(!e||e==="")return;let r=W.get(e)?.componentName;return r||(console.warn("getComponentNameById failed no id found"),null)},Wd=e=>{if(!e)return"name-not-found";let t=ln({element:e})??"",r=W.get(t);return r?r.componentName:"name-not-found"},rr=(e="")=>e?wl({instanceName:e})?.[0]:void 0,jd=(e="")=>e?wl({instanceName:e})??[]:[];var zi=(e="")=>{if(!e||e==="")return!1;let r=W.get(e)?.element;return r?!Hi()?.contains(r):!1};var Hd=({chunk:e})=>e.reduce((t,r)=>{let[o,n]=r,{child:s,componentName:i,instanceName:a}=n,c=new Set(Object.values(s??{}).flat()),l=[];for(let p of W.entries()){let[d]=p;c.has(d)&&l.push(p)}return[...t,{id:o,componentName:i,instanceName:a,children:Hd({chunk:l})}]},[]),zd=()=>{let e=[...W.entries()].filter(([,t])=>!t?.parentId||t?.parentId==="");return Hd({chunk:e})};var Ud=({id:e,name:t,fn:r})=>{if(!e||e==="")return;let o=W.get(e),n=o?.methods;if(n){if(t in n){console.warn(`Method ${t}, is already used by ${e}`);return}W.set(e,{...o,methods:{...n,[t]:r}})}},Gd=({id:e})=>{if(!e||e==="")return{};let r=W.get(e)?.methods;return r?Object.keys(r).length===0?(console.warn(`no methods available for ${e} component`),{}):r:{}},mn=e=>{let t=rr(e);if(!t||t==="")return;let r=Gd({id:t});if(Object.keys(r).length===0){console.warn(`no methods available for ${e} component`);return}return r},qd=e=>jd(e).map(r=>Gd({id:r})).filter(r=>Object.keys(r).length>0);function*or(e){if(e){yield e;for(let t of e.children)yield*or(t)}}function hw(e,t){let r=[];for(let o of or(e)){if(r.length>0&&t)break;o?.getIsPlaceholder?.()&&r.push(o)}return r}var qr=(e,t=!0)=>{let r=[],o=e||document.body;for(let n of o.children)r=[...r,...hw(n,t)];return r};var Io=new Set,Jd=!1,Yd=e=>{Io.add(e)},Xd=e=>{Io.delete(e)},Kd=e=>{let t;for(let r of Io)if(e?.contains(r)&&r.getIsPlaceholder()){t=r;break}return t?(Io.delete(t),[t]):[]},Qd=({element:e})=>[...Io].filter(t=>e.contains(t)&&e!==t&&t.getIsPlaceholder?.())??[],Zd=({element:e})=>[...Io].filter(t=>e.contains(t)&&e!==t&&t.getIsPlaceholder?.()&&t?.getSlotPosition?.())??[],eh=()=>Io.size;var nt=e=>{Jd=e},Wt=()=>Jd;var th=({currentChild:e,id:t="",componentName:r=""})=>{let o=e?.[r]??[];return e[r]=[...o,t],e},rh=({currentChild:e,id:t="",componentName:r=""})=>{let o=e?.[r]??[];return e[r]=o.filter(n=>t!==n),e},oh=({props:e,store:t})=>{Object.entries(e).forEach(([r,o])=>{t.set(r,o)})},Ui=({prop:e,componentName:t,action:r})=>{console.warn(`Props: ${e}, component: ${t}, action: ${r}: Props can only be modified from outside the component."`)};var bs=(e="")=>{if(!e||e==="")return;let r=W.get(e)?.parentId;if(r)return r},nh=({id:e=""})=>{if(!e||e==="")return;let t=W.get(e),r=t?.parentId,o=t?.componentName??"";if(!r)return;let n=W.get(r);if(!n)return;let{child:s}=n;s&&W.set(r,{...n,child:{...s,...th({currentChild:s,id:e,componentName:o})}})},sh=({element:e,id:t})=>{if(!e)return;if(!0){qr(e,!1).forEach(n=>{n.setParentId(t)});return}Qd({element:e}).forEach(o=>{o.setParentId(t)})},dn=({element:e})=>{if(!e)return;let t=e.parentNode,r;for(;t&&!r;)r=ln({element:t}),r||(t=t.parentNode);return r??""},Il=({moduleScopeId:e,targetComponentId:t})=>{if(e===t)return!0;let r=W.get(e);if(!r)return!1;let o=r?.parentId??"";return Il({moduleScopeId:o,targetComponentId:t})};var St=new Map,ys=new Map;var ih=({componentId:e})=>{if(e)for(let[t,r]of St){let{componentId:o}=r;o===e&&St.delete(t)}};var Qe=new Map;var be=new Map;var ah=({id:e})=>{if(Qe.has(e)){let t=Qe.get(e);if(!t)return;t.forEach(({invalidateId:r})=>{be.has(r)&&be.delete(r)}),Qe.delete(e)}};var Ze=new Map;var ch=({id:e})=>{if(Ze.has(e)){let t=Ze.get(e);if(!t)return;t.forEach(({repeatId:r})=>{G.has(r)&&G.delete(r)}),Ze.delete(e)}};var lh=({id:e,parentId:t,componentName:r})=>{if(!e)return;let o=W.get(t??"");if(!o)return;let{child:n}=o;!t||!n||W.set(t,{...o,child:{...n,...rh({currentChild:n,id:e,componentName:r})}})};var hn=new Set;var uh=e=>{hn.delete(e)};var st=({id:e=""})=>{if(!e||e==="")return;let t=W.get(e);if(!t)return;let{parentId:r,componentName:o,child:n,element:s,state:i,destroy:a,parentPropsWatcher:c,componentRepeatId:l,instanceName:p,persistent:d}=t;Object.values(n??{}).flat().forEach(f=>{st({id:f})}),lh({id:e,parentId:r,componentName:o}),a?.(),i.destroy(),c&&c.forEach(f=>f()),ah({id:e}),ch({id:e}),l&&l.length>0&&vd({componentId:e,repeatId:l}),p&&p.length>0&&Bd({instanceName:p,id:e}),d||uh(e),ih({componentId:e}),s?.removeCustomComponent?.(),s?.remove(),t.methods=null,t.refs=null,t.repeaterInnerWrap=null,t.element=null,t.currentRepeaterState=null,t.state=null,W.delete(e)};var nr=(e="")=>!e||e===""?void 0:W.get(e)?.state?.get();var ph=(e="")=>{let t=rr(e);return t||console.warn(`component ${e}, not found`),nr(t)};var fn=({id:e="",prop:t})=>{if(!e||e==="")return;let r=W.get(e);if(!r)return;let{freezedPros:o}=r;o&&W.set(e,{...r,freezedPros:[...new Set([...o,t])]})},Jr=({id:e="",prop:t})=>{if(!e||e==="")return;let r=W.get(e);if(!r)return;let{freezedPros:o}=r;o&&W.set(e,{...r,freezedPros:o.filter(n=>n!==t)})},Mo=({id:e="",prop:t})=>{if(!e||e==="")return!1;let o=W.get(e)?.freezedPros;return o?o.includes(t):!1};var mh=({repeatId:e,host:t})=>{let r=G.get(e);if(!r)return;let o=t.parentNode;r.initialRenderWithoutSync.forEach(n=>{o.append(n)}),G.set(e,{...r,element:o,initialRenderWithoutSync:[]}),Ur.set(e,t)};var dh=()=>{customElements.define("mobjs-repeat",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){if(Wt())return;let{dataset:t}=this.shadowRoot?.host??{};if(t){let r=this.shadowRoot?.host,o=r?.getAttribute(Vi)??"";mh({repeatId:o,host:r})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var Yr=new Map;var hh=({invalidateId:e,host:t})=>{let r=be.get(e);if(!r)return;let o=t.parentNode;be.set(e,{...r,element:o}),Yr.set(e,t)};var fh=()=>{customElements.define("mobjs-invalidate",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:e}=this.shadowRoot?.host??{};if(e){let t=this.shadowRoot?.host,r=t.getAttribute(Bi)??"";hh({invalidateId:r,host:t})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var Xr=new Set,gh=e=>{Xr.add(e)},bh=()=>{Xr.clear()},yh=({element:e})=>[...Xr].find(t=>{let r=!t?.getSlotName?.()&&e.contains(t);return r&&Xr.delete(t),r}),vh=({name:e,element:t})=>[...Xr].find(r=>{let o=r?.getSlotName?.()===e&&t.contains(r);return o&&Xr.delete(r),o}),Th=()=>[...Xr],Gi=()=>Xr.size;var _h=()=>{customElements.define("mobjs-slot",class extends HTMLElement{#n;constructor(){super(),this.attachShadow({mode:"open"}),this.#n="",this.isSlot=!0;let{dataset:e}=this.shadowRoot?.host??{};e&&(this.#n=this.shadowRoot?.host.getAttribute(Id))}connectedCallback(){let e=this.shadowRoot?.host;e&&gh(e)}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}getSlotName(){return this.#n}})};var Ml=new Set,Sh=e=>{Ml.add(e)},qi=()=>[...Ml],Ji=e=>Ml.delete(e);var xh=e=>{Object.entries(e).forEach(([t,r])=>{let{connectedCallback:o,disconnectedCallback:n,adoptedCallback:s,attributeChangedCallback:i,style:a,attributeToObserve:c}=r.componentParams;customElements.define(t,class extends HTMLElement{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#S;static get observedAttributes(){return c}constructor(){super(),this.attachShadow({mode:"open"}),this.active=!1,this.#t=u.getUnivoqueId(),this.#i={},this.#n=t,this.#l=!0,this.isUserComponent=!0,this.#r="",this.#e="";let l=this.shadowRoot?.host;if(!l)return;let p=Wt();if(p&&!!1&&Sh(l),p||(this.#a&&!this.active&&(this.style.visibility="hidden"),!this.shadowRoot))return;if(a){let f=document.createElement("style");f.textContent=a,this.shadowRoot.append(f)}let d=document.createElement("slot");this.shadowRoot.append(d)}getComponentName(){return this.#n}setId(l){this.#t=l}getId(){return this.#t}getParentId(){return this.#f}setParentId(l){this.#f=l}getIsPlaceholder(){return this.#l}getInstanceName(){return this.#d}getStaticPropsId(){return this.#u}getDynamicPropsid(){return this.#s}getBindEventsId(){return this.#c}getCurrentKey(){return this.#h}setDynamicPropsFromSlotId(l){this.#r=l}getDynamicPropsFromSlotId(){return this.#r}setPropsFromSlotId(l){this.#e=l}getPropsFromSlotId(){return this.#e}setRepeatValue(l){this.#p=l}getRepeatValue(){return this.#p}getSlotPosition(){return this.#a}getDelegateEventId(){return this.#g}getRepeaterPropBind(){return this.#m??void 0}setRepeaterPropBind(l){this.#m=l}getComponentRepeatId(){return this.#o}getBindRefId(){return this.#x}getBindRefName(){return this.#S}resetParams(){this.active=!1,this.#t="",this.#i={}}disablePlaceHolderState(){this.#l=!1}inizializeCustomComponent(l){this.active||(this.active=!0,this.#t=l.id,this.#i=l,this.#l=!1,o?.({context:this,params:this.#i}))}connectedCallback(){if(!Wt()&&this.#l){let p=this.shadowRoot?.host;p&&([this.#d,this.#u,this.#s,this.#h,this.#c,this.#p,this.#a,this.#f,this.#o,this.#g,this.#m,this.#x,this.#S]=[wd,un,Di,"key",Fi,Kt,Md,kd,Bt,Zt,Qt,er,xr].map(d=>p.getAttribute(d)??"")),Yd(p);return}}disconnectedCallback(){if(!this.shadowRoot)return;let l=this.shadowRoot?.host;Xd(l),Ji(l),this.active&&(n?.({context:this,params:this.#i}),this.resetParams())}removeCustomComponent(){!this.shadowRoot||!this.active||this.parentElement?.removeChild(this)}adoptedCallback(){!this.shadowRoot||!this.active||s?.({context:this,params:this.#i})}attributeChangedCallback(l,p,d){!this.shadowRoot||!this.active||i?.({name:l,oldValue:p,newValue:d,context:this,params:this.#i})}})})};var It=(e="",t="",r=()=>{},{wait:o=!1}={})=>(!e||e==="")&&(!t||t==="")?void 0:W.get(e)?.state?.watch(t,r,{wait:o??!1});function Zr(){return new Promise(e=>u.useNextLoop(()=>e()))}var ko=new Map,Eh=()=>ko.size===0,kl=1e3,wh=e=>{if(ko.size>=kl)return console.warn(`maximum loop event reached: (${kl})`),()=>{};let t=u.getUnivoqueId();return ko.set(t,e),()=>ko.delete(t)},Ch=()=>ko.size===0||ko.size>=kl,Mt=async({debug:e=!1,previousResolve:t}={})=>{if(await Zr(),e&&ko.forEach(r=>{console.log(r)}),Ch()&&t){t();return}return new Promise(r=>{if(Ch()){r();return}Mt({debug:e,previousResolve:t??r})})};var Ro=new Map,Mh=()=>Ro.size===0,Rl=1e3,kh=e=>{if(Ro.size>=Rl)return console.warn(`maximum loop event reached: (${Rl})`),()=>{};let t=u.getUnivoqueId();return Ro.set(t,e),()=>Ro.delete(t)},Ih=()=>Ro.size===0||Ro.size>=Rl,kt=async({debug:e=!1,previousResolve:t}={})=>{if(await Zr(),e&&Ro.forEach(r=>{console.log(r)}),Ih()&&t){t();return}return new Promise(r=>{if(Ih()){r();return}kt({debug:e,previousResolve:t??r})})};var gn=({id:e})=>{let t=Qe.get(e);return t?t.map(r=>r.invalidateId).map(r=>be.get(r)).flatMap(r=>r?.observed).filter(r=>r!==void 0):[]};var bn=({id:e})=>{let t=Ze.get(e);return t?t.map(r=>r.repeatId).map(r=>G.get(r)).map(r=>r?.observed).filter(r=>r!==void 0):[]};var Xi=new Map,Rh=(e,t)=>{Xi.set(e,t)},Ki=new Map,Nh=({host:e,componentId:t,bindTextId:r})=>{Ki.set(e,{componentId:t,bindTextId:r})},Ph=e=>e.match(/(?<=\[).+?(?=])/g),Ah=e=>e.split("[")?.[0],gw=({previous:e,current:t})=>{let r=Ph(t);return r&&r?.length>0?r.reduce((n,s)=>n?.[s],e[Ah(t)]):e?.[t]},Oh=(e,t,...r)=>{let o=nr(e),n=r.map(s=>s.split(".").reduce((a,c)=>gw({previous:a,current:c})??a,o));return t.raw.reduce((s,i,a)=>s+i+(n?.[a]??""),"")},$h=()=>{[...Ki].forEach(([e,{bindTextId:t}])=>{let r=e.parentElement;if(!r){Xi.delete(t);return}let o=Xi.get(t);o&&(Xi.delete(t),bw({...o,element:r}),e?.removeCustomComponent?.(),e?.remove(),r=null)}),Ki.clear()},Lh=()=>Ki.size,bw=({id:e,render:t,props:r,element:o})=>{let n=!1,s=new WeakRef(o),i=bn({id:e}),a=gn({id:e}),l=[...new Set([...r,...i,...a])].map(p=>{let f=p.split(".")?.[0],h=Ph(f),b=h&&h?.length>0?Ah(f):f;if(b)return It(e,b,async()=>{await kt(),await Mt(),!n&&(n=!0,u.useNextLoop(()=>{u.useFrame(()=>{s.deref()&&!s.deref()?.isConnected&&(l.forEach(T=>{T&&T()}),l.length=0),s.deref()&&s.deref()?.isConnected&&(s.deref().textContent="",s.deref().insertAdjacentHTML("afterbegin",t())),n=!1})}))})})};var Dh=()=>{customElements.define("mobjs-bind-text",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:e}=this.shadowRoot?.host??{};if(e){let t=this.shadowRoot?.host??document.createElement("div"),r=t?.getAttribute(wo)??"",o=t?.getAttribute($i)??"";Nh({host:t,componentId:r,bindTextId:o})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var Qi=new Map,Fh=(e,t)=>{Qi.set(e,t)},Nl=new Map,Bh=({host:e,componentId:t,bindObjectId:r})=>{Nl.set(e,{componentId:t,bindObjectId:r})},Vh=e=>e.map(t=>"observe"in t?Re.extractkeyFromProp(t.observe):(Re.initializeCurrentDependencies(),"value"in t?t?.value():t(),Re.getFirstCurrentDependencies())),Wh=(e,...t)=>e.raw.reduce((r,o,n)=>t?.[n]&&"value"in t[n]?r+o+(t?.[n]?.value?.()??""):r+o+(t?.[n]?.()??""),""),jh=()=>{[...Nl].forEach(([e,{bindObjectId:t}])=>{let r=e.parentElement;if(!r){Qi.delete(t);return}let o=Qi.get(t);o&&(Qi.delete(t),yw({...o,element:r}),e?.removeCustomComponent?.(),e?.remove(),r=null)}),Nl.clear()},yw=({id:e,keys:t,render:r,element:o})=>{let n=!1,s=new WeakRef(o),i=bn({id:e}),a=gn({id:e}),l=[...new Set([...t,...i,...a])].map(p=>It(e,p,async()=>{await kt(),await Mt(),!n&&(n=!0,u.useNextLoop(()=>{u.useFrame(()=>{s.deref()&&!s.deref()?.isConnected&&(l.forEach(d=>{d&&d()}),l.length=0),s.deref()&&s.deref()?.isConnected&&(s.deref().textContent="",s.deref().insertAdjacentHTML("afterbegin",r())),n=!1})}))}))};var Hh=()=>{customElements.define("mobjs-bind-object",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:e}=this.shadowRoot?.host??{};if(e){let t=this.shadowRoot?.host??document.createElement("div"),r=t?.getAttribute(wo)??"",o=t?.getAttribute(Li)??"";Bh({host:t,componentId:r,bindObjectId:o})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var Zi={},No=()=>Zi,zh=new Set,Uh=()=>{Zi=[...zh.values()].reduce((e,t)=>({...e,...t}),{}),console.log(`component loaded:${Object.keys(Zi).length}`),xh(Zi),_h(),fh(),dh(),Dh(),Hh()},ea=e=>{!e||e?.length===0||e.forEach(t=>{zh.add(t)})};var ta=({componentName:e,propName:t})=>(No()?.[e]?.componentParams?.exportState??[]).includes(t),Gh=({componentName:e})=>No()?.[e]?.componentParams?.exportState??[];var yn=(e="",t="",r,{emit:o=!0}={})=>{if((!e||e==="")&&(!t||t==="")&&!r||Mo({id:e,prop:t}))return;let s=W.get(e),i=s?.state,a=s?.componentName??"";if(!ta({componentName:a,propName:t})){console.warn(`setStateById failed ${t} in: ${a} is not exportable, maybe a slot bind state that not exist here?`);return}if(!i){console.warn(`setStateById failed no id found on prop: ${t}`);return}i.set(t,r,{emit:o})};var qh=(e="")=>{let t=rr(e);return t||console.warn(`component ${e}, not found`),(r,o,{emit:n=!0}={})=>yn(t,r,o,{emit:n})};var Jh=(e="",t="",r,{emit:o=!0,clone:n=!1}={})=>{if((!e||e==="")&&(!t||t==="")&&!r||Mo({id:e,prop:t}))return;let i=W.get(e),a=i?.state,c=i?.componentName??"";if(!ta({componentName:c,propName:t})){console.warn(`updateStateById failed ${t} in: ${c} is not exportable, maybe a slot bind state that not exist here?`);return}if(!a){console.warn(`updateStateById failed no id found on prop: ${t}`);return}a.update(t,r,{emit:o,clone:n})};var Yh=(e="")=>{let t=rr(e);return t||console.warn(`component ${e}, not found`),(r,o,{emit:n=!0,clone:s=!1}={})=>Jh(t,r,o,{emit:n,clone:s})};var Pl={scoped:!1,maxParseIteration:5e3,debug:!1},Xh=e=>{Pl={...Pl,...e}},Rt=()=>Pl,Kh=()=>{let{debug:e}=Rt();return e},Qh=({tag:e="",component:t=()=>"",props:r={},state:o={},bindStore:n,scoped:s,connectedCallback:i=()=>{},disconnectedCallback:a=()=>{},adoptedCallback:c=()=>{},attributeToObserve:l=[],attributeChangedCallback:p=()=>{},style:d="",child:f=[]})=>(ea(f),{[e]:{componentFunction:t,componentParams:{exportState:Object.keys(r),scoped:s,state:{...r,...o},bindStore:n,connectedCallback:i,disconnectedCallback:a,adoptedCallback:c,attributeToObserve:l,attributeChangedCallback:p,style:d,child:f}}});var Zh=[],ef="",tf="",rf=e=>{Zh=[...e]},vn=({hash:e=""})=>Zh.find(({hash:t})=>e===t),of=({hash:e=""})=>{ef=e},ra=()=>ef,nf=({hash:e=""})=>{tf=e},sf=()=>tf;function vw(e){let t=[];for(let r of or(e))r?.isUserComponent&&r?.getSlotPosition?.()&&t.push(r);return t}var af=e=>{let t=[],r=e||document.body;for(let o of r.children)t=[...t,...vw(o)];return t};function Tw(e){let t=[];for(let r of or(e))r?.isSlot&&r?.getSlotName?.()&&t.push(r);return t}var cf=e=>{let t=[],r=e||document.body;for(let o of r.children)t=[...t,...Tw(o)];return t};function _w(e,t){for(let r of or(e))if(r?.isSlot&&r?.getSlotName?.()===t)return r;return null}var lf=(e,t)=>{let r=e||document.body;for(let o of r.children){let n=_w(o,t);if(n)return n}return null};function Sw(e){for(let t of or(e))if(t?.isSlot&&!t?.getSlotName?.())return t;return null}var uf=e=>{let t=e||document.body;for(let r of t.children){let o=Sw(r);if(o)return o}return null};var vs=new Map,Po=e=>{let t=u.getUnivoqueId();return vs.set(t,e),t},pf=(e="")=>{if(!e)return tr;let t=vs.get(e);return vs.delete(e),t??tr};var g=(e,...t)=>e.reduce((r,o,n)=>r+o+(t[n]===void 0?"":t[n]),"").replaceAll(/>\s+</g,"><").trim();var oa=({components:e,current:t,index:r,observe:o,repeatId:n,key:s})=>{e.forEach(i=>{i.deref()?.hasAttribute(Kt)||i.deref()?.setAttribute(Kt,Po({current:t,index:r})),i.deref()?.hasAttribute("key")||i.deref()?.setAttribute("key",`${s}`),i.deref()?.hasAttribute(Qt)||i.deref()?.setAttribute(Qt,`${o}`),i.deref()?.hasAttribute(Bt)||i.deref()?.setAttribute(Bt,`${n}`)})},na=({components:e,current:t,index:r,observe:o,repeatId:n,key:s})=>{e.forEach(i=>{if(i.hasAttribute(Bt)){Ji(i);return}i.setAttribute(Kt,Po({current:t,index:r})),i.setAttribute("key",`${s}`),i.setAttribute(Qt,`${o}`),i.setAttribute(Bt,`${n}`)})},eo=({stringDOM:e,parent:t,position:r})=>{nt(!0);let o=document.createRange().createContextualFragment(e);nt(!1),o&&(r==="afterend"&&t.after(o),r==="beforebegin"&&t.before(o),r==="afterbegin"&&t.prepend(o),r==="beforeend"&&t.append(o))},Ts=({elements:e,parent:t,position:r})=>{let o=new DocumentFragment;nt(!0),e.forEach(n=>{n&&o.append(n)}),nt(!1),r==="afterend"&&t.after(o),r==="beforebegin"&&t.before(o),r==="afterbegin"&&t.prepend(o),r==="beforeend"&&t.append(o)};var Cw=({element:e,content:t})=>{let{debug:r}=Rt();if(e.parentNode){let o=document.createElement("template");o.innerHTML=t;let n=o.content.firstElementChild;return n?.disablePlaceHolderState?.(),n&&e.after(n),r&&e.insertAdjacentHTML("afterend",`<!--  ${e.tagName.toLowerCase()} --> `),n}},Ew=({element:e})=>{Th().forEach(r=>{r?.removeCustomComponent(),r?.remove()})},ww=({element:e})=>{if(!!1&&Gi()===0)return;let t=af(e);t.length!==0&&[...t].forEach(r=>{let o=r?.getSlotPosition(),n=vh({name:o,element:e});n&&(n.parentNode?.insertBefore(r,n),n?.removeCustomComponent(),n?.remove())})},Iw=({element:e,content:t})=>{let r=Cw({element:e,content:t});if(r){let o=e.getId(),n=e?.getDelegateEventId(),s=e?.getBindRefId(),i=e?.getBindRefName(),a=yh({element:r});a&&(Ts({parent:a,elements:[...e.childNodes],position:"afterend"}),a.remove()),a||Ts({parent:r,elements:[...e.childNodes],position:"afterbegin"}),ww({element:r}),Ew({element:r}),n&&n.length>0&&r.setAttribute(Zt,n),s&&s.length>0&&r.setAttribute(er,s),i&&i.length>0&&r.setAttribute(xr,i);let{debug:c}=Rt();c&&r.setAttribute(Ed,o??"")}return e.remove(),r},mf=({element:e,content:t})=>({newElement:Iw({element:e,content:t})});var Al=0,df=()=>{Al+=1},Ol=()=>Al,hf=()=>{Al=0},$l=({element:e,currentSelectors:t})=>{if(t.length>0){let r=t[0],o=t.slice(1);return{componentToParse:r,parseSourceArray:o}}else{let r=Kd(e),o=r?.[0],n=r.slice(1);return{componentToParse:o,parseSourceArray:n}}};var ff=({cb:e=()=>{},id:t})=>{if(!t)return;let r=W.get(t);r&&W.set(t,{...r,destroy:e})};var _s=new Map,gf=({id:e,cb:t=()=>{}})=>{_s.set(e,t)},Ll=async({id:e,element:t})=>{let o=await _s.get(e)?.({element:t});ff({cb:o,id:e}),_s.delete(e)};var Tn=new Map,Dl=1e5,_n=e=>{if(Tn.size>=Dl)return console.warn(`maximum loop event reached: (${Dl})`),()=>{};let t=u.getUnivoqueId();return Tn.set(t,e),()=>Tn.delete(t)},bf=()=>Tn.size===0||Tn.size>=Dl,Er=async({debug:e=!1,previousResolve:t}={})=>{if(await Zr(),e&&Tn.forEach(r=>{console.log(r)}),bf()&&t){t();return}return new Promise(r=>{if(bf()){r();return}Er({debug:e,previousResolve:t??r})})};var Fl=!0,sa=()=>{Fl=!0},ia=()=>{Fl=!1},aa=()=>Fl;var Sn=new Map,yf=(e=[])=>{let t=Le(Object,e)?[e]:e,r=u.getUnivoqueId();return Sn.set(r,t),r},vf=({element:e,componentId:t,bindEventsId:r})=>{let o=Sn.get(r);o&&(o.forEach(n=>{let[s]=Object.keys(n),[i]=Object.values(n);!s||!i||e.addEventListener(s,async a=>{if(!aa())return;ia(),await Er(),sa();let c=Vt({id:t});i(a,c?.current,c?.index)})}),Sn.delete(r))},Tf=()=>{Sn.clear()};var ca=({id:e="",unWatchArray:t=[]})=>{let r=W.get(e);if(!r)return;let{parentPropsWatcher:o}=r;o&&W.set(e,{...r,parentPropsWatcher:[...o,...t]})},_f=({id:e=""})=>{if(!e||e==="")return;(W.get(e)?.parentPropsWatcher??[]).forEach(o=>{o()})};var Sf=e=>{if(!("props"in e)){console.warn("bindProps not valid");return}let r=e?.observe?e.observe.map(s=>Re.extractkeyFromProp(s)):(Re.initializeCurrentDependencies(),u.checkType(Function,e.props)&&e.props({},{},0),Re.getCurrentDependencies());if(r.length===0){console.warn("bindProps not valid, no dependencies found");return}let o={...e,observe:r},n=u.getUnivoqueId();return St.set(n,{...o,componentId:"",propsId:n}),n},la=({componentId:e,observe:t,props:r,currentParentId:o,fireCallback:n})=>{if(!o)return;let s=nr(o);if(!s)return;let i=Object.keys(s);if(t.every(d=>i.includes(d))||console.warn(`bind props error: Some prop ${JSON.stringify(t)} doesn't exist`),!W.has(e))return;let l=Vt({id:e}),p=r?.(s,l.current,l?.index);p&&Object.entries(p).forEach(([d,f])=>{yn(e,d,f,{emit:n})})},xf=({propsId:e,repeatPropBind:t,componentId:r})=>{if(!e)return;let o=St.get(e);o&&(St.set(e,{...o,componentId:r}),ys.set(r,e),Bl({componentId:r,repeatPropBind:t,inizilizeWatcher:!1}))};var Bl=async({componentId:e,repeatPropBind:t,inizilizeWatcher:r})=>{let o=ys.get(e);if(!o)return;r&&ys.delete(e);let n=St.get(o);if(!n)return;let{observe:s,props:i,parentId:a}=n,c=t&&t?.length>0&&!s.includes(t)?[...s,t]:[...s];if(r||la({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!1}),!r&&!Mh()&&(await kt(),la({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!0})),!r&&!Eh()&&(await Mt(),la({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!0})),!r)return;let l=!1,p=c.map(d=>It(a,d,async()=>{if(await kt(),await Mt(),l)return;let f=_n({state:d,id:e,type:Rd});l=!0,u.useNextLoop(()=>{la({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!0}),l=!1,f()})}));if(ca({id:e,unWatchArray:p.filter(d=>d!==void 0)}),!!r)for(let[d,f]of St){let{componentId:h}=f;h===e&&St.delete(d)}},Cf=()=>{St.clear(),ys.clear()};var sr=({id:e,container:t})=>{let o=W.get(e)?.child;if(!o)return;Object.values(o??{}).flat().forEach(s=>{let i=W.get(s),a=i?.element,c=i?.id??"";if(a&&t?.contains(a)&&a!==t){st({id:s});return}else sr({id:c,container:t})})};var Vl=new Map,Mw=e=>(u.checkType(Array,e)?e:[e]).map(r=>Re.extractkeyFromProp(r)),kw=({toggleClass:e,toggleStyle:t,toggleAttribute:r})=>(Re.initializeCurrentDependencies(),Object.values(t).forEach(o=>o()),Object.values(e).forEach(o=>o()),Object.values(r).forEach(o=>o()),Re.getCurrentDependencies()),Mf=({data:e,id:t})=>{let o=(u.checkType(Array,e)?e:[e]).map(({observe:i,toggleClass:a,toggleStyle:c,toggleAttribute:l})=>({observe:i?Mw(i):kw({toggleStyle:c??{fake:()=>""},toggleClass:a??{fake:()=>{}},toggleAttribute:l??{fake:()=>{}}}),toggleClass:a??{},toggleStyle:c??{},toggleAttribute:l??{}})),n={parentId:t,items:o},s=u.getUnivoqueId();return Vl.set(s,n),s},kf=e=>{[...e.querySelectorAll(`[${pn}]`)].forEach(r=>{let o=r.getAttribute(pn);if(!o)return;let n=Vl.get(o);n&&(r.removeAttribute(pn),Rw({data:n,element:r}),Vl.delete(o))})},Ef=({ref:e,data:t})=>{t&&Object.entries(t).forEach(([r,o])=>{e.deref()&&e.deref().classList.toggle(r,o?.())})},wf=({ref:e,data:t})=>{Object.entries(t).forEach(([r,o])=>{e.deref()&&(e.deref().style[r]=o?.()??"")})},If=({ref:e,data:t})=>{Object.entries(t).forEach(([r,o])=>{if(!e.deref())return;let n=o?.();if(u.checkType(Boolean,n)){e.deref()[r]=n;return}if(!n){e.deref().removeAttribute(r);return}e.deref()?.setAttribute(r,n)})},Rw=({data:e,element:t})=>{let r=new WeakRef(t),{parentId:o}=e,{items:n}=e,s=n.flatMap(({observe:i,toggleClass:a,toggleStyle:c,toggleAttribute:l})=>{let p=!1,d=bn({id:o}),f=gn({id:o});return[...new Set([...i,...d,...f])].map(v=>(a&&u.useFrame(()=>{Ef({ref:r,data:a})}),c&&u.useFrame(()=>{wf({ref:r,data:c})}),l&&u.useFrame(()=>{If({ref:r,data:l})}),It(o,v,async()=>{if(await kt(),await Mt(),r.deref()&&!r.deref()?.isConnected){s.forEach(b=>{b&&b()}),s.length=0;return}p||(p=!0,u.useNextLoop(()=>{u.useFrame(()=>{a&&r.deref()&&Ef({ref:r,data:a}),c&&r.deref()&&wf({ref:r,data:c}),l&&r.deref()&&If({ref:r,data:l}),p=!1})}))})))})};var Rf=({element:e})=>{let t=e.querySelectorAll(`[${er}]`),r={};return[...t].reduce((o,n)=>{let s=n.getAttribute(er),i=n.getAttribute(xr);if(n.removeAttribute(er),n.removeAttribute(xr),!i)return o;let a=i in o?[...o[i],{element:n,scopeId:s}]:[{element:n,scopeId:s}];return{...o,[i]:a}},r)},Nw=e=>[...new Set(e.toSorted((t,r)=>t===r||!t||!r?0:t.compareDocumentPosition(r)&2?1:-1))],Pw=({refs:e,refName:t,element:r})=>({...e,[t]:Nw([...e[t],r])}),Nf=e=>{Object.entries(e).forEach(([t,r])=>{r.forEach(({element:o,scopeId:n})=>{let s=W.get(n);if(!s)return;let{refs:i}=s;if(!i)return;let a=t in i?Pw({refs:i,refName:t,element:o}):{...i,[t]:[o]};W.set(n,{...s,refs:a})})})},Wl=({id:e})=>{let t=W.get(e);if(!t)return{};let{refs:r,element:o}=t;if(!r)return{};let n=Object.entries(r).map(([s,i])=>({name:s,collection:i.filter(a=>o.contains(a))})).reduce((s,i)=>({...s,[i.name]:i.collection}),{});return W.set(e,{...t,refs:n}),n},Pf=({id:e})=>{let t=Wl({id:e});return Object.entries(t).reduce((r,[o,n])=>({...r,[o]:n?.[0]}),{})};var Af=document.createElement("div"),Of=({element:e})=>{Af=e},ua=()=>Af;var Ss=new Map,Ao=new WeakMap,jl=[],$f=[],Lf=(e=[])=>{let t=Le(Object,e)?[e]:e,r=u.getUnivoqueId();return Ss.set(r,t),r},Aw=e=>{let t=e?.parentNode;for(;t;){if(Ao.has(t))return{target:t,data:Ao.get(t)};t=t?.parentNode}return{target:void 0,data:void 0}},Ow=e=>Ao.get(e)?{target:e,data:Ao.get(e)}:Aw(e);async function $w(e,t){let r=t?.target;if(!r||!aa())return;ia(),await Er(),sa();let{target:o,data:n}=Ow(r);if(!n||!document.contains(o))return;let s=n.find(({event:l})=>l===e);if(!s)return;let{callback:i}=s,a=Cd({element:o}),c=a?Vt({id:a}):tr;Object.defineProperty(t,"target",{value:o}),Object.defineProperty(t,"currentTarget",{value:r}),i(t,c?.current,c?.index)}var Df=async e=>{await kt(),await Mt(),[...e.parentNode?.querySelectorAll(`[${Zt}]`)??[]].forEach(n=>{let s=n.getAttribute(Zt)??"";n.removeAttribute(Zt);let i=Ss.get(s);Ss.delete(s);let a=i?.flatMap(c=>Object.entries(c).map(l=>{let[p,d]=l;return jl.includes(p)||jl.push(p),{event:p,callback:d}}));Ao.set(n,a)});let o=ua();jl.forEach(n=>{$f.includes(n)||($f.push(n),o.addEventListener(n,$w.bind(null,n)))})};var xn="repeater",pa="invalidate",to=({moduleParentElement:e,skipInitialized:t=!1,onlyInitialized:r=!1,componentId:o,module:n})=>{let s=n===xn?G.entries():be.entries(),i=[];for(let a of s){let[c,{element:l,initialized:p,scopeId:d,initializeModule:f,unsubscribe:h}]=a;if(o&&!Il({moduleScopeId:d??"",targetComponentId:o})||t&&p||r&&!p)continue;l&&e?.contains(l)&&e!==l&&i.push({moduleId:c,initializeModule:f,unsubscribe:n===xn?[h]:h})}return i};var Ff=({id:e,repeatId:t})=>{if(!Ze.has(e))return;let r=Ze.get(e);if(!r)return;let o=r.filter(n=>n.repeatId!==t);G.has(t)&&G.delete(t),Ze.set(e,o)};var ro=({id:e,repeatParent:t})=>{to({moduleParentElement:t,skipInitialized:!1,onlyInitialized:!0,componentId:e,module:xn}).forEach(({unsubscribe:o,moduleId:n})=>{o.forEach(s=>{s()}),Ff({id:e,repeatId:n})})};var ma=({repeatParent:e,id:t})=>{if(!e)return;to({moduleParentElement:e,skipInitialized:!0,onlyInitialized:!1,componentId:t,module:xn}).forEach(({initializeModule:o})=>{o()})};var Bf=({invalidateId:e,unsubscribe:t})=>{let r=be.get(e);r&&be.set(e,{...r,unsubscribe:t})};var Vf=({id:e,invalidateId:t})=>{if(!Qe.has(e))return;let r=Qe.get(e);if(!r)return;let o=r.filter(n=>n.invalidateId!==t);be.has(t)&&be.delete(t),Qe.set(e,o)};var oo=({id:e,invalidateParent:t})=>{to({moduleParentElement:t,skipInitialized:!1,onlyInitialized:!0,componentId:e,module:pa}).forEach(({unsubscribe:o,moduleId:n})=>{o.forEach(s=>{s()}),Vf({id:e,invalidateId:n})})};var Hl=({id:e})=>{if(!be.has(e))return;if(Yr.has(e)){let r=Yr.get(e);r?.removeCustomComponent(),r?.remove(),Yr.delete(e)}return be.get(e)?.element};var da=({invalidateParent:e,id:t})=>{if(!e)return;to({moduleParentElement:e,skipInitialized:!0,onlyInitialized:!1,componentId:t,module:pa}).forEach(({initializeModule:o})=>{o()})};var Wf=async({observe:e=[],beforeUpdate:t=()=>Promise.resolve(),afterUpdate:r=()=>{},watch:o,id:n,invalidateId:s,persistent:i=!1,renderFunction:a})=>{let c=!1,l=dn({element:Hl({id:s})});r();let p=e.map(d=>o(d,async()=>{if(c)return;fn({id:n,prop:d});let h=Hl({id:s}),v=_n({state:d,id:n,type:El}),b=wh({state:d,id:n,type:El});c=!0,u.useNextLoop(async()=>{if(!h){Jr({id:n,prop:d});return}await t(),oo({id:n,invalidateParent:h}),ro({id:n,repeatParent:h}),sr({id:l??n,container:h}),h.textContent="",eo({stringDOM:a(),parent:h,position:"afterbegin"}),me.set(pt,{element:h,parentId:l??n,persistent:i,source:pd},{emit:!1}),await me.emitAsync(pt),cn(),c=!1,v(),b(),da({invalidateParent:h,id:n}),ma({repeatParent:h,id:n}),Jr({id:n,prop:d}),r()})}));Bf({invalidateId:s,unsubscribe:p})};var jf=e=>(u.checkType(Array,e)?e:[e]).map(r=>Re.extractkeyFromProp(r));var Hf=({invalidateId:e,initializeModule:t})=>{let r=be.get(e);r&&be.set(e,{...r,initializeModule:t,unsubscribe:[()=>{}]})};var zf=({invalidateId:e})=>{let t=be.get(e);t&&be.set(e,{...t,initialized:!0})};var Uf=({invalidateId:e,scopeId:t,observe:r})=>{be.set(e,{element:void 0,initialized:!1,observed:r,scopeId:t,initializeModule:()=>{},unsubscribe:[()=>{}]})};var Gf=({repeatId:e,unsubscribe:t})=>{let r=G.get(e);r&&G.set(e,{...r,unsubscribe:t})};var Cn=new Set,qf=({id:e,state:t,container:r})=>{Cn.add({id:e,state:t,container:r})},Jf=({id:e,state:t,container:r})=>{r&&Cn.forEach(o=>{e===o.id&&t===o.state&&r===o.container&&Cn.delete(o)})},Yf=({id:e="",state:t="",container:r})=>[...Cn].some(n=>e===n.id&&t===n.state&&r===n.container);var Kf=(e=[],t=[],r="")=>e.filter(o=>{let n=o?.[r];return!t.some(s=>s?.[r]===n)}),Qf=(e,t,r)=>e.map((o,n)=>{let s=o?.[r];return!t.some(a=>a?.[r]===s)?{isNewElement:!0,keyValue:o?.[r],index:n}:{isNewElement:!1,keyValue:o?.[r],index:n}}),Xf=({arr:e=[],key:t=""})=>e.every(r=>u.checkType(Object,r)&&t in r),Zf=({current:e,previous:t,key:r})=>Xf({arr:e,key:r})&&Xf({arr:t,key:r}),ha=({data:e=[],key:t=""})=>e.filter((r,o,n)=>n.findIndex(s=>s?.[t]===r?.[t])===o),fa=({children:e,previousChildren:t=[]})=>{let r={};return t.length===0?Object.values(e.reduce((o,n)=>{let{index:s}=Vt({id:n});return s in o?{...o,[s]:[...o[s],n]}:{...o,[s]:[n]}},r)):Object.values(e.reduce((o,n)=>{let{index:s}=Vt({id:n}),i=t.includes(n)?`${s}`:`_${s}`,a=o?.[i];return a?{...o,[i]:[...a,n]}:{...o,[i]:[n]}},r))};var En=new Map,ga=(e={})=>{let t=u.getUnivoqueId();return En.set(t,e),t},ba=(e="")=>{let t=En.get(e);return En.delete(e),t??{}};var eg=()=>{En.clear()};var ya=(e={})=>`${un}="${ga(e)}"`,va=(e,t,r)=>Math.min(Math.max(e,t),r);var zl=({repeatId:e})=>{let t=G.get(e);return t?t.currentData:[]};var Lw="index",Oo=({observe:e,hasKey:t,key:r="",keyValue:o="",index:n,repeatId:s})=>{let i=zl({repeatId:s}),a=t?i?.find(p=>p[r]===o):i?.[n],c=a,l=a;return new Proxy({},{get(p,d){Re.setCurrentDependencies(e);let f=zl({repeatId:s}),h=Math.max(f?.length-1,0);if(d===Lw){if(t){let v=f?.findIndex(b=>b[r]===o);return va(v,0,h)}return va(n,0,h)}return t?(l=c??l,c=f?.find(v=>v[r]===o),c??l):(l=c??l,c=f?.[va(n,0,h)],c??l)},set(){return!1}})};var tg=({diff:e,current:t,previousLenght:r,render:o,state:n,repeatId:s})=>{let i=document.createRange();return[...Array.from({length:e}).keys()].map((c,l)=>{let p=t?.[l+r],d=l+r,f=Oo({observe:n,hasKey:!1,index:d,repeatId:s}),h=o({initialIndex:d,initialValue:p,current:f,sync:()=>""}),v=Wt();nt(!0);let b=i.createContextualFragment(h);if(nt(v),!1){let T=qr(b,!1).map(S=>new WeakRef(S));oa({components:T,current:p,index:d,observe:n,repeatId:s,key:void 0})}return na({components:qi(),current:p,index:d,observe:n,repeatId:s,key:void 0}),b.firstElementChild}).filter(c=>c!==null)},Dw=({initialIndex:e,initialValue:t,state:r,repeatId:o})=>`${Kt}="${Po({current:t,index:e})}"
    ${Qt}="${r}" ${Bt}="${o}"`,rg=({diff:e,previousLenght:t,current:r,state:o,repeatId:n,render:s})=>[...Array.from({length:e}).keys()].map((i,a)=>{let c=a+t,l=r?.[c]?{...r?.[c]}:{},p=Oo({observe:o,hasKey:!1,index:c,repeatId:n});return s({sync:()=>Dw({initialIndex:c,initialValue:l,repeatId:n,state:o}),initialIndex:c,initialValue:l,current:p})}).join(""),og=({currentValue:e,index:t,state:r,repeatId:o,key:n,keyValue:s,render:i})=>{let a=Oo({observe:r,hasKey:!0,key:n,keyValue:s,index:t,repeatId:o}),c=Wt();nt(!0);let l=document.createRange().createContextualFragment(i({initialIndex:t,initialValue:e,current:a,sync:()=>""}));if(nt(c),!1){let p=qr(l,!1).map(d=>new WeakRef(d));oa({components:p,current:e,index:t,observe:r,repeatId:o,key:s})}return na({components:qi(),current:e,index:t,observe:r,repeatId:o,key:s}),l.firstElementChild},Fw=({keyValue:e,index:t,currentValue:r,state:o,repeatId:n})=>` ${"key"}="${e}"
    ${Qt}="${o}"
    ${Kt}="${Po({current:r,index:t})}"
    ${Bt}="${n}"`,ng=({currentValue:e,index:t,state:r,repeatId:o,key:n,keyValue:s,render:i})=>{let a={...e},c=Oo({observe:r,hasKey:!0,key:n,keyValue:s,index:t,repeatId:o});return i({initialIndex:t,initialValue:a,current:c,sync:()=>Fw({currentValue:a,index:t,keyValue:s,repeatId:o,state:r})})},sg=({currentUnique:e,render:t,observe:r,repeatId:o,key:n="",hasKey:s})=>{let i=document.createRange();return e.map((c,l)=>{let p=Oo({observe:r,hasKey:s,key:n,keyValue:s?c?.[n]:"",index:l,repeatId:o}),d=Wt();nt(!0);let f=i.createContextualFragment(t({initialIndex:l,initialValue:c,current:p,sync:()=>""}));if(nt(d),!1){let h=qr(f,!1).map(v=>new WeakRef(v));oa({components:h,current:c,index:l,observe:r,repeatId:o,key:s?c?.[n]:""})}return na({components:qi(),current:c,index:l,observe:r,repeatId:o,key:s?c?.[n]:""}),f.firstElementChild}).filter(c=>c!==null)},ig=({currentUnique:e,key:t="",observe:r,repeatId:o,hasKey:n,render:s})=>e.map((a,c)=>{let l=()=>`${Kt}="${Po({current:a,index:c})}"
                            ${"key"}="${n?a?.[t]:""}"
                            ${Qt}="${r}"
                            ${Bt}="${o}"`,p=Oo({observe:r,hasKey:n,key:t,keyValue:n?a?.[t]:"",index:c,repeatId:o});return s({sync:l,initialIndex:c,initialValue:a,current:p})}).join("");var Ta=({repeatId:e,id:t})=>{let r=G.get(e);if(!r)return;let{element:o,observed:n}=r;if(!o)return;let s=[...o.children],a=nr(t)[n];G.set(e,{...r,nativeDOMChildren:s.map((c,l)=>({index:l,value:a[l],element:c}))})},xs=({repeatId:e})=>{let t=G.get(e);if(!t)return[];let{nativeDOMChildren:r}=t;return r};var wn=({repeatId:e,currentData:t})=>{let r=G.get(e);r&&G.set(e,{...r,currentData:t})};var Bw=({element:e,container:t})=>{let r=Wd(e);t.insertAdjacentHTML("beforeend",`<!-- ${r} --> `)},ag=({state:e="",current:t=[],previous:r=[],repeaterParentElement:o=document.createElement("div"),key:n="",id:s="",render:i,repeatId:a,useSync:c})=>{let l=ha({data:t,key:n});wn({repeatId:a,currentData:l});let p=Kf(r,l,n),d=p.map(T=>{let S=T?.[n];return Sl({keyValue:S,repeatId:a})}).filter(T=>T.length>0),f=d.length>0;d.forEach(T=>{let S=T[0].element,_=T[0].id;if(!_)return;let E=gs({id:_}),C=E??S;oo({id:s,invalidateParent:C}),ro({id:s,repeatParent:C}),T.forEach(({id:w})=>{st({id:w})}),E&&E.remove()}),f||xs({repeatId:a}).filter(_=>p.map(E=>E?.[n]).includes(_.value?.[n])).forEach(_=>{let{element:E}=_;oo({id:s,invalidateParent:E}),ro({id:s,repeatParent:E}),sr({id:s,container:E})});let h=Qf(l,r,n).map(({keyValue:T,isNewElement:S,index:_})=>{if(S)return{keyValue:T,isNewElement:S,index:_,wrapper:void 0};let E=Sl({keyValue:T,repeatId:a}),C=E[0]?.element?gs({id:E[0]?.id??""}):xs({repeatId:a}).find(I=>I.value?.[n]===T)?.element;return{keyValue:T,isNewElement:S,index:_,persistentElement:E,persistentDOMwrapper:C}});o.replaceChildren();let v=document.createRange(),b=new DocumentFragment;return h.forEach(({isNewElement:T,keyValue:S,index:_,persistentElement:E,persistentDOMwrapper:C})=>{if(!T){let{debug:A}=Rt();C&&b.append(C);let O=E?.[0]?.element;!C&&O&&(b.append(O),A&&Bw({element:E[0]?.element,container:o}));return}let w=l?.[_],I=c?ng({currentValue:w,index:_,state:e,repeatId:a,key:n,keyValue:S,render:i}):og({currentValue:w,index:_,state:e,repeatId:a,key:n,keyValue:S,render:i}),N=Wt();if(nt(!0),c){let A=v.createContextualFragment(I);b.append(A)}!c&&I&&b.append(I),nt(N)}),o.append(b),l};var Vw=e=>{let t=e.lastElementChild;if(!t)return;let r=t.nextSibling;for(;r;){let o=r.nextSibling;r.nodeType===Node.COMMENT_NODE&&r.remove(),r=o}},cg=({state:e="",current:t=[],previous:r=[],repeaterParentElement:o=document.createElement("div"),render:n,repeatId:s,id:i,useSync:a,currentChildren:c})=>{wn({repeatId:s,currentData:t});let l=t.length,p=r.length,d=l-p;if(d>0){let f=a?rg({diff:d,previousLenght:p,current:t,state:e,repeatId:s,render:n}):tg({diff:d,current:t,previousLenght:p,render:n,state:e,repeatId:s});a&&eo({stringDOM:f,parent:o,position:"beforeend"}),a||Ts({elements:f,parent:o,position:"beforeend"})}if(d<0){let f=fa({children:c});f.filter((S,_)=>_>=t.length).forEach(S=>{S.forEach(_=>{let E=hs({id:_}),C=gs({id:_}),w=C??E;oo({id:i,invalidateParent:w}),ro({id:i,repeatParent:w}),st({id:_}),C&&C.remove()})});let{debug:v}=Rt();if(v&&Vw(o),f.length>0)return t;let b=xs({repeatId:s});if(!b)return t;b.filter(({index:S})=>S>=t.length).forEach(S=>{let{element:_}=S;oo({id:i,invalidateParent:_}),ro({id:i,repeatParent:_}),sr({id:i,container:_}),_.remove()})}return t};var lg=async({state:e="",persistent:t,repeaterParentElement:r=document.createElement("div"),current:o=[],previous:n=[],key:s="",id:i,fallBackParentId:a="",render:c,repeatId:l,useSync:p,currentChildren:d=[]})=>{let v=(Zf({current:o,previous:n,key:s})?ag:cg)({state:e,current:o,previous:n,repeaterParentElement:r,key:s,id:i,render:c,repeatId:l,useSync:p,currentChildren:d});return me.set(pt,{element:r,parentId:a??i,persistent:t,source:ud},{emit:!1}),await me.emitAsync(pt),cn(),v};var ug=({state:e="",setState:t,persistent:r=!1,watch:o,clean:n=!1,beforeUpdate:s,afterUpdate:i,key:a="",id:c="",repeatId:l="",render:p,useSync:d=!1})=>{let f=hs({id:c}),h=fs({id:l}),v=h?dn({element:h})??"":"";return i(),o(e,async(T,S)=>{if(!u.checkType(Array,T))return;let _=fs({id:l}),E=_n({state:e,id:c,type:Cl}),C=kh({state:e,id:c,type:Cl});if(fn({id:c,prop:e}),Yf({id:c,state:e,container:_})){Jr({id:c,prop:e}),t(e,S,{emit:!1}),E(),C();return}let I=xl({id:c,repeatId:l});f&&await s(),n&&(I.forEach(k=>{st({id:k})}),_&&(_.textContent="")),_&&qf({id:c,state:e,container:_});let N=await lg({state:e,persistent:r,repeaterParentElement:_??document.createElement("div"),current:T,previous:n?[]:S,key:a,id:c,fallBackParentId:v,render:p,repeatId:l,useSync:d,currentChildren:n?[]:I}),A=xl({id:c,repeatId:l}),O=a&&a!=="",R=fa({children:A,previousChildren:I}),F=O?[...Ad({children:R,key:a,current:T,currentUnivoque:N})]:R;F.forEach((k,M)=>{k.forEach(L=>{let D=N?.[M];if(!D)return;let x=O?T.findIndex(P=>`${P?.[a]}`==`${N?.[M]?.[a]}`):M;Wi({id:L,value:{current:D,index:x}})})}),u.useNextLoop(async()=>{f&&i(),Jf({id:c,state:e,container:_}),Jr({id:c,prop:e}),E(),C(),da({invalidateParent:_,id:c}),ma({repeatParent:_,id:c}),F.length===0&&Ta({repeatId:l,id:c})})})};var pg=({repeatId:e,persistent:t,state:r,setState:o,emit:n,watch:s,clean:i,beforeUpdate:a,afterUpdate:c,key:l,id:p,render:d,useSync:f})=>{let h=ug({state:r,setState:o,persistent:t,emit:n,watch:s,clean:i,beforeUpdate:a,afterUpdate:c,key:l,id:p,repeatId:e,render:d,useSync:f});Gf({repeatId:e,unsubscribe:h})};var mg=({repeatId:e,initializeModule:t})=>{let r=G.get(e);r&&G.set(e,{...r,initializeModule:t,unsubscribe:()=>{}})};var dg=({repeatId:e})=>{let t=G.get(e);t&&G.set(e,{...t,initialized:!0})};var hg=({repeatId:e,initialDOMRender:t})=>{let r=G.get(e);r&&G.set(e,{...r,initialRenderWithoutSync:t})};var fg=({repeatId:e,scopeId:t,observe:r})=>{G.set(e,{element:void 0,initialized:!1,scopeId:t,observed:r,nativeDOMChildren:[],componentChildren:[],currentData:[],initialRenderWithoutSync:[],initializeModule:()=>{},unsubscribe:()=>{}})};var gg=({repeatId:e,scopeId:t})=>{let r=Ze.get(t)??[];Ze.set(t,[...r,{repeatId:e}])};var bg=({invalidateId:e,scopeId:t})=>{let r=Qe.get(t)??[];Qe.set(t,[...r,{invalidateId:e}])};var yg=({getState:e,setState:t,updateState:r,getProxi:o,emit:n,emitAsync:s,computed:i,watch:a,id:c,key:l,bindEventsId:p,debug:d})=>({bindEventsId:p,key:l,id:c,getState:e,setState:t,updateState:r,getProxi:o,emit:n,emitAsync:s,computed:i,watch:a,debug:d,repeatIdArray:[],renderComponent:async({attachTo:h,component:v,position:b="afterbegin",clean:T=!0})=>{T&&(sr({id:c,container:h}),h.textContent=""),h.insertAdjacentHTML(b,v),me.set(pt,{element:h,parentId:c,persistent:zi(c),source:md},{emit:!1}),await me.emitAsync(pt),cn()},getChildren:h=>ji({id:c,componentName:h}),freezeProp:h=>{let v=Re.extractkeyFromProp(h);return fn({id:c,prop:v.toString()})},unFreezeProp:h=>{let v=Re.extractkeyFromProp(h);return Jr({id:c,prop:v.toString()})},unBind:()=>_f({id:c}),bindProps:h=>{let v="props"in h?h:{props:h};return`${Di}="${Sf({...v,parentId:c})}" `},staticProps:h=>` ${un}="${ga(h)}" `,remove:()=>{st({id:c})},removeDOM:h=>{sr({id:c,container:h}),h.textContent=""},getParentId:()=>bs(c),watchParent:(h,v)=>{let b=It(bs(c),h,v);b&&ca({id:c,unWatchArray:[b]})},onMount:h=>gf({id:c,cb:h}),bindEvents:h=>`${Fi}="${yf(h)}"`,delegateEvents:h=>`${Zt}="${Lf(h)}"`,bindEffect:h=>`${pn}="${Mf({data:h,id:c})}"`,addMethod:(h,v)=>{Ud({id:c,name:h,fn:v})},setRef:h=>`${er}="${c}" ${xr}="${h}"`,getRef:()=>Pf({id:c}),getRefs:()=>Wl({id:c}),bindText:(h,...v)=>{let b=u.getUnivoqueId(),T=()=>Oh(c,h,...v);return Rh(b,{id:c,render:T,props:v}),`<mobjs-bind-text ${wo}="${c}" ${$i}="${b}"></mobjs-bind-text>${T()}`},bindObject:(h,...v)=>{let b=Vh(v),T=u.getUnivoqueId(),S=()=>Wh(h,...v);return Fh(T,{id:c,keys:b,render:S}),`<mobjs-bind-object ${wo}="${c}" ${Li}="${T}"></mobjs-bind-object>${S()}`},invalidate:({observe:h,render:v,beforeUpdate:b=()=>Promise.resolve(),afterUpdate:T=()=>{}})=>{let S=jf(h),_=u.getUnivoqueId(),E=`${Bi}=${_}`,C=()=>v(),w=!1;return bg({invalidateId:_,scopeId:c}),Uf({invalidateId:_,scopeId:c,observe:S}),Hf({invalidateId:_,initializeModule:()=>{w||(Wf({observe:S,watch:a,beforeUpdate:b,afterUpdate:T,persistent:zi(c),id:c,invalidateId:_,renderFunction:C}),w=!0,zf({invalidateId:_}))}}),`<mobjs-invalidate ${E} style="display:none;"></mobjs-invalidate>${C()}`},repeat:({observe:h,clean:v=!1,beforeUpdate:b=()=>Promise.resolve(),afterUpdate:T=()=>{},key:S="",render:_,useSync:E=!1})=>{let C=Re.extractkeyFromProp(h),w=u.getUnivoqueId(),I=S!=="";gg({repeatId:w,scopeId:c}),fg({repeatId:w,scopeId:c,observe:C});let N=e()?.[C],A=I?ha({data:N,key:S}):N;wn({repeatId:w,currentData:A});let O=E?ig({currentUnique:A,key:S,observe:C,repeatId:w,hasKey:I,render:_}):"",R=E?[]:sg({currentUnique:A,render:_,observe:C,repeatId:w,key:S,hasKey:I}),F=!1;return hg({repeatId:w,initialDOMRender:R}),mg({repeatId:w,initializeModule:()=>{F||(pg({repeatId:w,persistent:zi(c),state:C,setState:t,emit:n,watch:a,clean:v,beforeUpdate:b,afterUpdate:T,key:S,id:c,render:_,useSync:E}),F=!0,dg({repeatId:w}),Td({repeatId:w})||Ta({repeatId:w,id:c}))}}),`<mobjs-repeat ${Vi}="${w}" style="display:none;"></mobjs-repeat>${O}`}});var Ul=({componentName:e,currentProps:t={}})=>{let o=No()?.[e]?.componentParams?.exportState??[];return Object.entries(t).filter(([n])=>o.includes(n)).reduce((n,s)=>{let[i,a]=s;return{...n,[i]:a}},{})};var vg=({element:e,parentIdForced:t})=>{let r=e.getId(),o=e.getInstanceName(),n=e.getParentId(),s=dn({element:e}),i=e.getStaticPropsId(),a=e.getDynamicPropsid(),c=e.getBindEventsId(),l=e.getRepeatValue(),p=e.getComponentRepeatId(),d=e.getCurrentKey()??"",f=e.getComponentName(),h=i?.split(" ").join(""),v=ba(h),b={...e.dataset},T=e.getRepeaterPropBind(),S=pf(l);return{element:e,props:{...Ul({componentName:f,currentProps:b}),...Ul({componentName:f,currentProps:v})},id:r,componentName:f,instanceName:o,key:d,dynamicPropsId:a,repeatPropBind:T,bindEventsId:c,currentRepeatValue:S,parentId:s,componentRepeatId:p}};var Tg=e=>{hn.add(e)};var _g=({element:e,instanceName:t="",props:r={},state:o={},bindStore:n,methods:s={},key:i="",currentRepeaterState:a=tr,repeaterInnerWrap:c,repeatPropBind:l="",componentRepeatId:p="",parentPropsWatcher:d=[()=>{}],refs:f={},destroy:h=()=>{},freezedPros:v=[],persistent:b=!1,child:T={},parentId:S="",id:_="",componentName:E=""})=>{let C=u.createStore(o);oh({props:r,store:C}),n&&C.bindStore(n),b||Tg(_),p&&p.length>0&&yd({componentId:_,repeatId:p}),t&&t.length>0&&Fd({instanceName:t,id:_});let w=Gh({componentName:E}),I=new Set(w);return C.setProxiReadOnlyProp(w),W.set(_,{element:e,componentName:E,instanceName:t,destroy:h,parentPropsWatcher:d,refs:f,methods:s,key:i,currentRepeaterState:a,repeaterInnerWrap:c,repeatPropBind:l,componentRepeatId:p,persistent:b,id:_,parentId:S,freezedPros:v,child:T,state:C}),{getState:()=>C.get(),setState:(N="",A={},{emit:O=!0}={})=>{let R=Mo({id:_,prop:N}),F=Re.extractkeyFromProp(N),k=I.has(F);k&&Ui({prop:F,componentName:E,action:"updateState"}),!(R||k)&&C.set(F,A,{emit:O??!0,usePropAsString:!0})},updateState:(N="",A=()=>{},{emit:O=!0,clone:R=!1}={})=>{let F=Mo({id:_,prop:N}),k=Re.extractkeyFromProp(N),M=I.has(k);M&&Ui({prop:k,componentName:E,action:"updateState"}),!(F||M)&&C.update(k,A,{emit:O??!0,clone:R??!1,usePropAsString:!0})},getProxi:()=>C.getProxi(),emit:(N="")=>C.emit(N),emitAsync:async(N="")=>await C.emitAsync(N),computed:(N="",A=()=>{},O=[])=>{let R=Re.extractkeyFromProp(N);if(I.has(R)){Ui({prop:R,componentName:E,action:"computed"});return}return C.computed(R,A,O,{usePropAsString:!0})},watch:(N="",A=()=>{},{wait:O=!1,immediate:R=!1}={})=>C.watch(N,A,{wait:O??!1,immediate:R??!1}),debug:()=>C.debug()}};var Sg=({id:e})=>(Qe.get(e)??[]).map(({invalidateId:r})=>{let o=be.get(r);if(o)return{invalidateId:r,initializeModule:o.initializeModule}}).filter(r=>r!==void 0);var xg=({id:e})=>(Ze.get(e)??[]).map(({repeatId:r})=>{let o=G.get(r);if(o)return{repeatId:r,initializeModule:o.initializeModule}}).filter(r=>r!==void 0);var Cg=async({element:e,persistent:t=!1,parentIdForced:r="",source:o=zr})=>{let{debug:n}=Rt();n&&console.log("parse source:",o);let s=No(),i=[],a=$l({element:e,currentSelectors:[]}),c=a.parseSourceArray,l=a?.componentToParse;for(;l;){let d=l.getComponentName(),f=s?.[d]?.componentFunction,h=s?.[d]?.componentParams,{scoped:v,bindStore:b}=h,{props:T,id:S,componentName:_,instanceName:E,key:C,dynamicPropsId:w,currentRepeatValue:I,bindEventsId:N,parentId:A,componentRepeatId:O,repeatPropBind:R}=vg({element:l,parentIdForced:r}),F=h?.state??{},{getState:k,setState:M,updateState:L,getProxi:D,emit:x,emitAsync:P,computed:$,watch:B,debug:j}=_g({element:l,props:T,state:F,id:S,componentName:_,instanceName:E,key:C,repeatPropBind:R,persistent:t,parentId:A,componentRepeatId:O,bindStore:b});nh({id:S}),O&&O?.length>0&&(Wi({id:S,value:I}),Pd({id:S,repeatId:O,element:l})),xf({propsId:w,repeatPropBind:R,componentId:S});let X=yg({getState:k,setState:M,updateState:L,getProxi:D,emit:x,emitAsync:P,computed:$,watch:B,id:S,key:C,bindEventsId:N,debug:j}),le=await f(X),ye=l.classList,{newElement:ee}=mf({content:le,element:l});if(bh(),ye.length>0&&ee?.classList.add(...ye),!0,!ee)return;xd({id:S,newElement:ee});let pe=Sg({id:S}),ve=xg({id:S});N&&vf({element:ee,componentId:S,bindEventsId:N});let ge=v??Rt().scoped;ge&&await Ll({id:S,element:ee}),ee?.inizializeCustomComponent?.(X),i.push({onMount:async()=>{ge||await Ll({id:S,element:ee})},initializeBindPropsWatcher:()=>{Bl({componentId:S,repeatPropBind:R,inizilizeWatcher:!0})},fireInvalidateFunction:pe.length>0?()=>{pe.forEach(({initializeModule:q})=>{q?.()})}:()=>{},fireRepeatFunction:ve.length>0?()=>{ve.forEach(({initializeModule:q})=>{q?.()})}:()=>{}});let Ie=$l({element:e,currentSelectors:c});c=Ie.parseSourceArray,l=Ie.componentToParse;let De=Ol()===Rt().maxParseIteration;if(df(),De){console.warn(`dom parse reached max parse limit: ${Ol()}`);break}}let p=Rf({element:e});Object.keys(p).length>0&&Nf(p);for(let d of i.toReversed()){let{onMount:f,initializeBindPropsWatcher:h,fireInvalidateFunction:v,fireRepeatFunction:b}=d;await f(),b(),v(),h()}i.length=0,c.length=0,l=null,Df(e),kf(e),$h(),jh()};var Cs=async({element:e,persistent:t=!1,parentIdForced:r="",source:o=zr})=>{await Cg({element:e,persistent:t,parentIdForced:r,source:o}),hf()},Eg=()=>{me.watch(pt,async({element:e,parentId:t,persistent:r=!1,source:o=zr})=>{await Cs({element:e,parentIdForced:t??"",persistent:r,source:o})})};var wg=()=>{eg(),Tf(),Cf()};var Ig,Mg,kg=({fn:e})=>{e&&(Mg=e)},Rg=({fn:e})=>{e&&(Ig=e)},Ng=()=>Mg,Pg=()=>Ig;var Ag=!0,Og=e=>{Ag=e},$g=()=>Ag;var Lg=()=>{for(let e of hn)st({id:e})};var Dg=new Map,Fg=({route:e,params:t})=>Object.entries(t).reduce((r,[o,n])=>`${r}-${o}-${n}`,e),Bg=async({route:e="",templateName:t="",isBrowserNavigation:r=!1,params:o={},skipTransition:n})=>{me.set(Xt,!0),await Er();let s=Hi();if(!s||!(s instanceof HTMLElement))return;let{activeRoute:i,activeParams:a}=me.get(),c=Fg({route:e,params:o}),l=Fg({route:i.route,params:a}),p=window.scrollY;Dg.set(l,p);let d=Dg.get(c)??0;me.set(Eo,{currentRoute:i.route,currentTemplate:i.templateName,nextRoute:e,nextTemplate:t});let f=!1,h=me.watch(Eo,()=>{f=!0});wg(),me.set(nn,{route:e,templateName:t}),me.set(sn,o);let v=vn({hash:e}),b=n||v?.skipTransition,T=v?.props??{},S=await v?.layout?.({params:o,props:T})??"",_=Ng(),E=s.cloneNode(!0);_&&E&&!b&&(await _({oldNode:E,oldRoute:i.route,newRoute:e,oldTemplateName:i.templateName,newTemplateName:t}),s?.parentNode?.insertBefore(E,s)),s.replaceChildren(),Lg(),eo({stringDOM:S,parent:s,position:"afterbegin"}),await Cs({element:s}),b||(s.style.visibility=""),f||me.set(an,{currentRoute:e,currentTemplate:t,previousRoute:i.route,previousTemplate:i.templateName}),$g()&&r?scrollTo(0,d):scrollTo(0,0),document.body.dataset.route=e,document.body.dataset.template=t;let C=Pg();C&&!b&&(await C({oldNode:E,newNode:s,oldRoute:i.route,newRoute:e,oldTemplateName:i.templateName,newTemplateName:t}),E.remove()),E=null,h?.(),me.set(Xt,!1)};var Vg=({route:e})=>e,Wg=e=>{Vg=e},jg=({route:e})=>{let t=Vg({route:e});return{route:t,isRedirect:t!==e}};var Hg=({hash:e=""})=>{let t=ra(),r=sf();return e===""?t:vn({hash:e})?e:r},zg=({hash:e=""})=>vn({hash:e})?.templateName??"",Ug=({hash:e=""})=>vn({hash:e})?.restoreScroll??!0;var Gg="",qg=!0,wr="",Jg="",no,ql,Es,Jl=e=>e.replace("?","").replace("/",""),Yg=e=>e.replace("#","").replace("/","").replace(".",""),Ww=e=>e.split("&").reduce((t,r)=>{let o=r.split("="),n=Jl(o?.[0]??""),s=o?.[1];return n&&n.length>0?{...t,[n]:s}:t},{}),jw=e=>e&&Object.entries(e).reduce((t,[r,o],n)=>`${t}${n===0?"":"&"}${r}=${o}`,"");document.addEventListener("click",e=>{if(!e.target)return;e.target.closest("a")&&me.getProp(Xt)&&e.preventDefault()},{passive:!1});var _a=async({shouldLoadRoute:e=!0}={})=>{let t=globalThis.location.hash,r={hash:t},{routeIsLoading:o}=me.get();if(o){globalThis.location.hash=Gg.replace("#","");return}Es||history.replaceState({nextId:r},"",t);let{route:n,isRedirect:s}=jg({route:t});s&&history.replaceState({nextId:r},"",`#${n}`);let i=n.split("?"),a=Jl(i?.[1]??"");Jg=wr,wr=Yg(i?.[0]??"");let c=Ww(no??a),l=no||Object.keys(a).length>0?`?${no??a}`:"";no=void 0;let p=Hg({hash:wr}),d=zg({hash:wr&&wr.length>0?wr:ra()}),f=wr===Jg&&l.length===0&&!qg;e&&!f&&(Gg=`#${wr}${l}`,await Bg({route:p,templateName:d,isBrowserNavigation:Ug({hash:wr})&&!!Es,params:c,skipTransition:!!(Es??ql)})),e||(me.set(nn,{route:p,templateName:d}),me.set(sn,c)),ql=void 0,u.useNextLoop(()=>{qg=!1})},Xg=()=>{_a(),globalThis.history.scrollRestoration="manual",globalThis.addEventListener("popstate",e=>{Es=e?.state?.nextId}),globalThis.addEventListener("hashchange",async()=>{await Zr(),_a()})},Kg=({url:e,params:t,skipTransition:r})=>{if(!e||me.getProp(Xt))return;ql=r;let o=e.split("?"),n=Yg(o?.[0]??""),s=jw(t),i=Jl(o?.[1]??""),a=s??i;no=a.length>0?a:"",Es=void 0,globalThis.location.hash=no&&no.length>0?`${n}?${no}`:n,globalThis.dispatchEvent(new HashChangeEvent("hashchange"))};var Qg=async({rootId:e,wrapper:t,contentId:r,routes:o=[],afterInit:n=()=>{},redirect:s=({route:f})=>f,index:i="home",pageNotFound:a="pageNotFound",beforePageTransition:c,pageTransition:l,restoreScroll:p=!0,componentDefaultProps:d={scoped:!1,maxParseIteration:1e4,debug:!1}})=>{Xh(d);let f=document.querySelector(e),h=await t();Wg(s),!(!r||!f)&&(Ld({contentId:r}),Of({element:f}),Rg({fn:l}),kg({fn:c}),Og(p),Eg(),Uh(),rf(o),of({hash:i}),nf({hash:a}),eo({stringDOM:h,parent:f,position:"afterbegin"}),Dd(),_a({shouldLoadRoute:!1}),await Cs({element:f,persistent:!0}),u.useFrameIndex(()=>{u.useNextTick(()=>{n()})},5),Xg())};var Zg=()=>be.size;var eb=()=>G.size;var ce={};_o(ce,{clamp:()=>rt,getDefault:()=>Zw,mq:()=>tI,printDefault:()=>eI,setDefault:()=>Qw});var $o={default:{tension:20,mass:1,friction:5,velocity:0,precision:.01},gentle:{tension:120,mass:1,friction:14,velocity:0,precision:.01},wobbly:{tension:180,mass:1,friction:12,velocity:0,precision:.01},bounce:{tension:200,mass:3,friction:5,velocity:0,precision:.01},scroller:{tension:10,mass:1,friction:5,velocity:0,precision:.5}};var de={easeLinear:"easeLinear",easeInQuad:"easeInQuad",easeOutQuad:"easeOutQuad",easeInOutQuad:"easeInOutQuad",easeInCubic:"easeInCubic",easeOutCubic:"easeOutCubic",easeInOutCubic:"easeInOutCubic",easeInQuart:"easeInQuart",easeOutQuart:"easeOutQuart",easeInOutQuart:"easeInOutQuart",easeInQuint:"easeInQuint",easeOutQuint:"easeOutQuint",easeInOutQuint:"easeInOutQuint",easeInSine:"easeInSine",easeOutSine:"easeOutSine",easeInOutSine:"easeInOutSine",easeInExpo:"easeInExpo",easeOutExpo:"easeOutExpo",easeInOutExpo:"easeInOutExpo",easeInCirc:"easeInCirc",easeOutCirc:"easeOutCirc",easeInOutCirc:"easeInOutCirc",easeInElastic:"easeInElastic",easeOutElastic:"easeOutElastic",easeInOutElastic:"easeInOutElastic",easeInBack:"easeInBack",easeOutBack:"easeOutBack",easeInOutBack:"easeInOutBack",easeInBounce:"easeInBounce",easeOutBounce:"easeOutBounce",easeInOutBounce:"easeInOutBounce"},Ms="min",tb="max",Xl="desktop",ks="easeLinear",ws="default",Kl={xSmall:320,small:360,medium:600,tablet:768,desktop:992,large:1200,xLarge:1600,xxLarge:1980},Ql=10,Is=.06,Zl="#ff0000",eu="#14df3b",tu=8,ru=10,ou=1e3,nu=!1,zw=!1,Uw=!1,Gw=.01,qw=.06,rb=e=>{let t=He({prop:"deferredNextTick",value:e?.deferredNextTick,defaultValue:u.store.getProp("deferredNextTick"),type:Boolean}),r=He({prop:"usePassive",value:e?.usePassive,defaultValue:u.store.getProp("usePassive"),type:Boolean}),o=He({prop:"throttle",value:e?.throttle,defaultValue:u.store.getProp("throttle"),type:Number}),n=Jw(e?.mq??{}),s=He({prop:"defaultMq.value",value:e?.defaultMq?.value,defaultValue:Xl,type:String}),i=He({prop:"defaultMq.type",value:e?.defaultMq?.type,defaultValue:Ms,type:String}),a=He({prop:"sequencer.duration",value:e?.sequencer?.duration,defaultValue:Ql,type:Number}),c=Yl(e?.sequencer?.ease,"sequencer"),l=He({prop:"scrolTrigger.springConfig",value:e?.scrollTrigger?.springConfig,defaultValue:ws,type:String}),p=He({prop:"scrolTrigger.lerpConfig",value:e?.scrollTrigger?.lerpConfig,defaultValue:Is,type:Number}),d=He({prop:"scrolTrigger.markerColor.startEnd",value:e?.scrollTrigger?.markerColor?.startEnd,defaultValue:Zl,type:String}),f=He({prop:"scrolTrigger.markerColor.item",value:e?.scrollTrigger?.markerColor?.item,defaultValue:eu,type:String}),h=He({prop:"parallax.defaultRange",value:e?.parallax?.defaultRange,defaultValue:tu,type:Number}),v=He({prop:"parallax.springConfig",value:e?.parallax?.springConfig,defaultValue:ws,type:String}),b=He({prop:"parallax.lerpConfig",value:e?.parallax?.lerpConfig,defaultValue:Is,type:Number}),T=He({prop:"parallaxTween.duration",value:e?.parallaxTween?.duration,defaultValue:ru,type:Number}),S=Yl(e?.parallaxTween?.ease,"parallaxTween"),_=He({prop:"tween.duration",value:e?.tween?.duration,defaultValue:ou,type:Number}),E=Yl(e?.tween?.ease,"tween"),C=He({prop:"tween.relative",value:e?.tween?.relative,defaultValue:nu,type:Boolean}),w=He({prop:"spring.relative",value:e?.spring?.relative,defaultValue:zw,type:Boolean}),I=He({prop:"lerp.relative",value:e?.lerp?.relative,defaultValue:Uw,type:Boolean}),N=He({prop:"lerp.precision",value:e?.lerp?.precision,defaultValue:Gw,type:Number}),A=He({prop:"lerp.velocity",value:e?.lerp?.velocity,defaultValue:qw,type:Number});return{deferredNextTick:t,throttle:o,usePassive:r,mq:n,defaultMq:{value:s,type:i},sequencer:{duration:a,ease:c},scrollTrigger:{springConfig:l,lerpConfig:p,markerColor:{startEnd:d,item:f}},parallax:{defaultRange:h,springConfig:v,lerpConfig:b},parallaxTween:{duration:T,ease:S},tween:{duration:_,ease:E,relative:C},spring:{relative:w,config:e?.spring?.config?{...$o,...e.spring.config}:$o},lerp:{relative:I,precision:N,velocity:A}}},He=({prop:e,value:t,defaultValue:r,type:o})=>{let n=u.checkType(o,t);return n||console.warn(`handleSetUp error: ${e}: ${t}, is not valid must be a ${u.getTypeName(o)}`),n?t:r},Jw=e=>{let t=u.checkType(Object,e)&&Object.values(e).every(r=>u.checkType(Number,r));return t||console.warn("handleSetUp error: mq must be an object as { ..., String: Number }"),t?e:Kl},Yl=(e,t)=>{let r=Object.keys(de).includes(e);return!r&&e!==void 0&&e!==null&&console.warn(`handleSetUp error: ${t}.ease properties is not valid`),r?e:ks};var it=(e,t,r=!0)=>{e=(n=>{let s;try{s=JSON.parse(JSON.stringify(n))}catch{s=Object.assign({},n)}return s})(e);let o=n=>n&&typeof n=="object";return!o(e)||!o(t)?t:(Object.keys(t).forEach(n=>{let s=e[n],i=t[n];Array.isArray(s)&&Array.isArray(i)?r?(e[n]=s.map((a,c)=>i.length<=c?a:it(a,i[c],r)),i.length>s.length&&(e[n]=e[n].concat(i.slice(s.length)))):e[n]=s.concat(i):o(s)&&o(i)?e[n]=it(Object.assign({},s),i,r):e[n]=i}),e)};function ob(){return{deferredNextTick:u.store.getProp("deferredNextTick"),throttle:u.store.getProp("throttle"),usePassive:u.store.getProp("usePassive"),mq:Kl,defaultMq:{value:Xl,type:Ms},sequencer:{duration:Ql,ease:ks},scrollTrigger:{springConfig:ws,lerpConfig:Is,markerColor:{startEnd:Zl,item:eu}},parallax:{defaultRange:tu,springConfig:ws,lerpConfig:Is},parallaxTween:{duration:ru,ease:ks},tween:{duration:ou,ease:ks,relative:nu},spring:{relative:!1,config:$o},lerp:{relative:!1,precision:.01,velocity:.06}}}var ae=(()=>{let e=ob();return{set:n=>{e=rb(it(ob(),n)),"usePassive"in n&&u.store.set("usePassive",e.usePassive),"deferredNextTick"in n&&u.store.set("deferredNextTick",e.deferredNextTick),"throttle"in n&&u.store.set("throttle",e.throttle)},get:n=>(n in e||console.warn(`handleSetUp: ${n} is not a setup propierties`),e[n]),print:()=>{console.log("Writable props:"),console.log(e)}}})();var Yw=(e="desktop")=>window.innerWidth<ae.get("mq")[e],Xw=(e="desktop")=>window.innerWidth>=ae.get("mq")[e],Kw=(e="desktop")=>ae.get("mq")[e],fe={max:Yw,min:Xw,getBreackpoint:Kw};var Se=e=>{if(u.checkType(Number,e))return Math.round(e*1e4)/1e4||0;if(Math.abs(e)<1){let t=Number.parseInt(e.toString().split("e-")[1]);t&&(e*=Math.pow(10,t-1),e="0."+Array.from({length:t}).join("0")+e.toString().slice(2))}else{let t=Number.parseInt(e.toString().split("+")[1]);t>20&&(t-=20,e/=Math.pow(10,t),e+=Array.from({length:t+1}).join("0"))}return Number.parseFloat(Number.parseFloat(e).toFixed(4))},rt=(e,t,r)=>Math.min(Math.max(e,t),r),nb=(e,t,r)=>(1-r)*e+r*t,so=(e,t)=>{let r=Object.keys(e).toSorted(),o=Object.keys(t).toSorted();return r.length===o.length&&r.every((n,s)=>n===o[s])},Rs=(e,t)=>{let r=[];for(let o=0;o<e.length;o+=t){let n=e.slice(o,o+t);r.push(n)}return r},sb=(e,t)=>e.map(r=>r[t]);function Qw(e){ae.set(e)}function Zw(e){return ae.get(e)}function eI(){ae.print()}function tI(e,t){switch(e){case"min":return fe.min(t);case"max":return fe.max(t);case"get":return fe.getBreackpoint(t)}}var z={};_o(z,{createLerp:()=>bI,createMasterSequencer:()=>dI,createScrollerTween:()=>pI,createSequencer:()=>mI,createSpring:()=>gI,createStaggers:()=>hI,createTimeTween:()=>fI});var Sa=e=>e.map(t=>(t.settled||(t.fromValue=t.currentValue),t)),Ir=e=>e.map(t=>(t.fromValue=t.toValue,t.currentValue=t.toValue,t)),In=e=>e.map(t=>(t.toValue=t.currentValue,t.fromValue=t.currentValue,t)),Mr=(e,t)=>{let r=Object.keys(e);return t.map(o=>{if(r.includes(o.prop)){let n=o.fromValue,s=o.toValue;o.fromValue=s,o.toValue=n}return o})},Mn=(e,t)=>e.map(r=>(r.toValue=t?r.toValue+r.currentValue:r.toValue,r));var su=(e,t)=>e.map(r=>(r.shouldUpdate&&(r.toValProcessed=t?r.toValue+1e-5:r.toValue-r.fromValue+1e-5),r));var xa="radial",ir="start";var kn="center",Rn="edges",Nn="random",ib="MERGE_FROM_UP",iu="MERGE_FROM_DOWN",Lo="equal",Do="start";var Fo="center",Pn={type:Lo,each:0,waitComplete:!1,from:ir,grid:{col:1,row:1,direction:"col"}},Ge={index:0,frame:0};var y={PX:"px",VH:"vh",VW:"vw",WPERCENT:"w",HPERCENT:"h",DEGREE:"deg",PLUS_HEIGHT:"+height",PLUS_HEIGHT_HALF:"+halfHeight",PLUS_WIDTH:"+width",PLUS_WIDTH_HALF:"+halfWidth",MINUS_HEIGHT:"-height",MINUS_HEIGHT_HALF:"-halfHeight",MINUS_WIDTH:"-width",MINUS_WIDTH_HALF:"-halfWidth",POSITION_BOTTOM:"bottom",POSITION_TOP:"top",POSITION_LEFT:"left",POSITION_RIGHT:"right",DIRECTION_VERTICAL:"vertical",DIRECTION_HORIZONTAL:"horizontal",TYPE_PARALLAX:"parallax",TYPE_SCROLLTRIGGER:"scrolltrigger",PROP_VERTICAL:"y",PROP_HORIZONTAL:"x",PROP_ROTATE:"rotate",PROP_ROTATEY:"rotateY",PROP_ROTATEX:"rotateX",PROP_ROTATEZ:"rotateZ",PROP_OPACITY:"opacity",PROP_SCALE:"scale",PROP_SCALE_X:"scaleX",PROP_SCALE_Y:"scaleY",PROP_TWEEN:"tween",TWEEN_TWEEN:"parallaxTween",TWEEN_TIMELINE:"sequencer",ALIGN_START:"start",ALIGN_TOP:"top",ALIGN_RIGHT:"right",ALIGN_CENTER:"center",ALIGN_BOTTOM:"bottom",ALIGN_LEFT:"left",ALIGN_END:"end",IN_STOP:"in-stop",IN_BACK:"in-back",OUT_STOP:"out-stop",OUT_BACK:"out-back",EASE_SPRING:"spring",EASE_LERP:"lerp",EASE_PRECISION:.001,SCROLL_UP:"up",SCROLL_DOWN:"down",ON_LEAVE:"ON_LEAVE",ON_LEAVE_BACK:"ON_LEAVE_BACK",ON_ENTER:"ON_ENTER",ON_ENTER_BACK:"ON_ENTER_BACK",ON_NOOP:"ON_NOOP"};var kr=e=>e.map(t=>`${t} | `).join(""),io=(e,t,r)=>{console.warn(`${e}: ${JSON.stringify(t)} and to ${JSON.stringify(r)} is not equal`)},Nt=e=>{console.warn(`stagger col of grid is out of range, it must be less than ${e} ( staggers length )`)},Rr=e=>{console.warn(`tween | sequencer: ${e} is not valid value, must be a number or a Function that return a number`)},ab=e=>{console.warn(`sequencer, start option: ${e} value is not valid, must be a Number`)},cb=e=>{console.warn(`sequencer, end option: ${e} value is not valid, must be a Number`)},lb=()=>{console.warn("relative prop is not allowed inside a timeline")},ub=e=>{console.warn(`Timeline Supend: ${e()} is not a valid value, must be a boolean`)},pb=()=>{console.warn("SyncTimeline: in revese ( or yoyo mode) only goTo || goFromTo || set action is allowed. Using goFrom makes no sense in this context. Enable forceFromTo to use from action in reverse mode")},mb=e=>{console.warn(`timeline setTween: ${e} is not an array of tween`)},db=e=>{console.warn(`timeline setTween: ${e} is not a string`)},hb=e=>{console.warn(`asyncTimeline.setTween() label: ${e} not found`)},fb=()=>{console.warn("setTween fail")},gb=e=>{console.warn(`label ${e} not founded`)},bb=e=>{console.warn(`sequencer.add(fn,time) ${e}: fn must be Function`)},yb=e=>{console.warn(`sequencer.add(fn,time) ${e}: time must be a Number`)},au=e=>{console.warn(`${e} doesn't exist in spring configuration list`)},vb=()=>{console.warn("Spring configProps: all prop must be a positive Number")},Tb=e=>{console.warn(`Spring config: ${e}: config must have friction/mass/precision/tesnion props and must be a number`)},Bo=e=>{console.warn(`${e} doesn't exist in tweens ease function`)},Ca=()=>{console.warn("stagger each must be a Number ")},_b=e=>{console.warn(`stagger, row/col: ${e} value is not valid, must be a Number`)},Sb=()=>{console.warn("Stagger error: waitComplete propierties must be a Boolean")},xb=()=>{console.warn("Stagger error: in grid option direction should be a string radial/col/row")};var Cb=()=>{console.warn("Stagger error: in col/row direction 'from' propierties must be a string start/end/center/edges or a number")},Eb=e=>{console.warn(`Stagger error: from: ${e} is not a valid value, must be a string start/end/center/edges or a number or a Object {x:Number,y:Number}`)},wb=e=>{console.warn(`duration error: ${e} is not valid duration must be a number`)},Ib=e=>{console.warn(`duration error: ${e} is not valid duration must be a number or a Function that return a number`)},Mb=e=>{console.warn(`repeat error: ${e} is not valid repeat value must be a Number`)};var kb=e=>{console.warn(`data inizializiation error; ${e} is not a valid value, must be a string`)},Rb=e=>{console.warn(`data inizializiation error; ${e} is not a valid value, must be a number`)},Nb=()=>{console.warn("createStaggers error: items array can not be empty")},Pb=()=>{console.warn("createStaggers error: each element of the array must be an Element or an Object")},Ab=()=>{console.warn(`screateStaggers error: type should be: ${Lo} || ${ir} || ${"end"} || ${Fo}`)},Ob=e=>{console.warn(`createStagger:  each must be between 1 and ${e}`)},$b=(e,t)=>{console.warn(`${t}: relative prop: ${e} is not a valid parameter, must be a boolean `)},cu=(e,t)=>{console.warn(`${t}: '${e}' is not Boolean`)},Lb=(e,t)=>{console.warn(`${t}: '${e}' is not String`)},Db=(e,t)=>{console.warn(`${t}: '${e}' is not Number`)},Fb=(e,t)=>{console.warn(`${t}: '${e}' is not Function`)},Bb=()=>{console.warn("Lerp error: velocity is not valid, must be a Number greater than 0 and less than 1")},Vb=()=>{console.warn("Lerp error: precision is not valid, must be a number greater than 0")},On=e=>{console.warn(`asyncTimeline error: ${e} cannot be used inside group`)},Wb=e=>{console.warn(`${e} value must be a string`)},jb=()=>{console.warn("tween added to asyncTimeline or used inside sync() method must be instance of HandleLerp | HandleTween | HandleSpring")},Hb=()=>{console.warn("asyncTimeline arror: delay must be a Number")},zb=e=>{console.warn(`${e} not found`)},Ub=e=>{console.warn(`timeline add async function, ${e} is not a function `)},Gb=(e,t)=>{console.warn(`${t} direction: ${e} is not valid value: must be ${y.DIRECTION_VERTICAL} | ${y.DIRECTION_HORIZONTAL}`)},qb=e=>{console.warn(`scrollTrigger error; ${e} propierties: value must be a Object like { position: top|bottom|left|right, value: () => { return Number} } `)},Jb=()=>{console.warn("scrollTrigger error; dynamicRange propierties: value must be a Function that return a Number")},Yb=()=>{console.warn("parallax|scrolTrigger error: tween is not valid, must be an instance of HandleSequencer || ParallaxTween")},Xb=(e,t)=>{console.warn(`parallax error align propierties: ${e} is not valid must be one of ${kr(t)} or a Number between 0 and 100`)},Kb=(e,t)=>{console.warn(`parallax error align propierties: ${e} is not valid must be one of ${kr(t)}`)},Qb=(e,t)=>{console.warn(`${t}: '${e}' is not Number, must be a number between 0 and 100`)},Zb=(e,t)=>{console.warn(`parallax error type propierties: ${e} is not valid must be one of ${kr(t)}`)},ey=(e,t)=>{console.warn(`parallax/scrollTrigger error propierties props: ${e} is not valid must be one of ${kr(t)} or a custom css propierites like margin|line-height|...`)},ty=(e,t)=>{console.warn(`parallax error easeType props: ${e} is not valid must be one of ${kr(t)}`)},ry=(e,t,r)=>{console.warn(`${r} error easeType props: ${e} is not valid must be one of ${kr(t)}`)},oy=()=>{console.warn('Scrolltrigger warning: spring animation is only available for native properties and scrollerTween, Check that with the "propierties" property set to "tween" no HandleSequencer is associated with the "tween" property')},ny=(e,t)=>{console.warn(`parallax/scrollTrigger error springConfig props: ${e} is not valid must be one of ${kr(t)}`)},sy=e=>{console.warn(`parallax error range propierties, current value: ${e}, the value must be a number between 0 and 9.99`)},iy=e=>{console.warn(`scrollTrigger error range propierties: ${e} is not a String`)},lu=(e,t,r,o)=>{console.warn(`${o} error ${r} propierties: ${e} is not valid must be one of ${kr(t)}`)},ay=()=>{console.warn("Parallax warning: if propierties is a tween the only choice is ParallaxTween, HandleSequencer or empty tween propierites is not allowed inside a parallax")},cy=()=>{console.warn("parallax/ScrollTrrigger error: velocity is not valid, must be a Number greater than 0 and less than 1")},ly=()=>{console.warn('parallax/ScrollTrrigger warning:  The property is "tween" but no tween has been associated, associate a tween with the "tween" property')},uy=()=>{console.warn('parallax/ScrollTrrigger: there is tween associated but pros "propierties" is not set to "tween"')},py=(e,t)=>{console.warn(`${e}: ${t} is not a function`)},uu=(e,t,r)=>{console.warn(`scrollTrigger error range : with '${t}' propierties ${e} is not valid, add one of the following unit misure: ${kr(r)}, es: 45deg|100px|50vw etc..`)},my=e=>{console.warn(`scrollTrigger error range : with custom css propierties '${e}' no unit misure is necessary, the default unit misure will be used (px). Only '-' for negative value is allowed`)},dy=(e,t)=>{console.warn(`scrollTrigger error range : with '${t}' propierties ${e} is not valid no unit misure is necessary. Only '-' for negative value is allowed`)};var jt={[de.easeLinear]:(e,t,r,o)=>r*e/o+t,[de.easeInQuad]:(e,t,r,o)=>r*(e/=o)*e+t,[de.easeOutQuad]:(e,t,r,o)=>-r*(e/=o)*(e-2)+t,[de.easeInOutQuad]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e+t:-r/2*(--e*(e-2)-1)+t,[de.easeInCubic]:(e,t,r,o)=>r*(e/=o)*e*e+t,[de.easeOutCubic]:(e,t,r,o)=>r*((e=e/o-1)*e*e+1)+t,[de.easeInOutCubic]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e+t:r/2*((e-=2)*e*e+2)+t,[de.easeInQuart]:(e,t,r,o)=>r*(e/=o)*e*e*e+t,[de.easeOutQuart]:(e,t,r,o)=>-r*((e=e/o-1)*e*e*e-1)+t,[de.easeInOutQuart]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e*e+t:-r/2*((e-=2)*e*e*e-2)+t,[de.easeInQuint]:(e,t,r,o)=>r*(e/=o)*e*e*e*e+t,[de.easeOutQuint]:(e,t,r,o)=>r*((e=e/o-1)*e*e*e*e+1)+t,[de.easeInOutQuint]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e*e*e+t:r/2*((e-=2)*e*e*e*e+2)+t,[de.easeInSine]:(e,t,r,o)=>-r*Math.cos(e/o*(Math.PI/2))+r+t,[de.easeOutSine]:(e,t,r,o)=>r*Math.sin(e/o*(Math.PI/2))+t,[de.easeInOutSine]:(e,t,r,o)=>-r/2*(Math.cos(Math.PI*e/o)-1)+t,[de.easeInExpo]:(e,t,r,o)=>e===0?t:r*Math.pow(2,10*(e/o-1))+t,[de.easeOutExpo]:(e,t,r,o)=>e===o?t+r:r*(-Math.pow(2,-10*e/o)+1)+t,[de.easeInOutExpo]:(e,t,r,o)=>e===0?t:e===o?t+r:(e/=o/2)<1?r/2*Math.pow(2,10*(e-1))+t:r/2*(-Math.pow(2,-10*--e)+2)+t,[de.easeInCirc]:(e,t,r,o)=>-r*(Math.sqrt(1-(e/=o)*e)-1)+t,[de.easeOutCirc]:(e,t,r,o)=>r*Math.sqrt(1-(e=e/o-1)*e)+t,[de.easeInOutCirc]:(e,t,r,o)=>(e/=o/2)<1?-r/2*(Math.sqrt(1-e*e)-1)+t:r/2*(Math.sqrt(1-(e-=2)*e)+1)+t,[de.easeInElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o)===1?t+r:(s||(s=o*.3),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),-(i*Math.pow(2,10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s))+t)},[de.easeOutElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o)===1?t+r:(s||(s=o*.3),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),i*Math.pow(2,-10*e)*Math.sin((e*o-n)*(2*Math.PI)/s)+r+t)},[de.easeInOutElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o/2)===2?t+r:(s||(s=o*(.3*1.5)),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),e<1?-.5*(i*Math.pow(2,10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s))+t:i*Math.pow(2,-10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s)*.5+r+t)},[de.easeInBack]:(e,t,r,o,n=1.70158)=>r*(e/=o)*e*((n+1)*e-n)+t,[de.easeOutBack]:(e,t,r,o,n=1.70158)=>r*((e=e/o-1)*e*((n+1)*e+n)+1)+t,easeInOutBack:(e,t,r,o,n=1.70158)=>(e/=o/2)<1?r/2*(e*e*(((n*=1.525)+1)*e-n))+t:r/2*((e-=2)*e*(((n*=1.525)+1)*e+n)+2)+t,[de.easeInBounce]:(e,t,r,o)=>r-jt[de.easeOutBounce](o-e,0,r,o)+t,[de.easeOutBounce]:(e,t,r,o)=>(e/=o)<1/2.75?r*(7.5625*e*e)+t:e<2/2.75?r*(7.5625*(e-=1.5/2.75)*e+.75)+t:e<2.5/2.75?r*(7.5625*(e-=2.25/2.75)*e+.9375)+t:r*(7.5625*(e-=2.625/2.75)*e+.984375)+t,[de.easeInOutBounce]:(e,t,r,o)=>e<o/2?jt[de.easeInBounce](e*2,0,r,o)*.5+t:jt[de.easeOutBounce](e*2-o,0,r,o)*.5+r*.5+t};var mt=e=>e in jt?jt[e]:(Bo(e),jt[ae.get("tween").ease]);var hy=e=>e?e.replaceAll(/[\s#$()*+,.?[\\\]^{|}-]/g,String.raw`\$&`):"",pu=e=>/^[+-]?\d+(\.\d+)?$/.test(e),fy=e=>/^\d+\.\d+$|^\d+$/.test(e),Ae=(e,t)=>{let r=new RegExp(`^${hy(t)}$`,"i");return(e.match(r)||[]).length},ar=(e,t)=>{let r=new RegExp(`[0-9]${t}$`,"i");return(e.match(r)||[]).length},mu=(e,t)=>e.some(r=>{let o=new RegExp(`[0-9]${r}$`,"i");return(t.match(o)||[]).length}),du=(e,t)=>e.some(r=>{let o=new RegExp(`^${hy(r)}$`,"i");return(t.match(o)||[]).length});var gy=e=>e&&(Ae(e,y.PROP_VERTICAL)?y.PROP_VERTICAL:Ae(e,y.PROP_HORIZONTAL)?y.PROP_HORIZONTAL:Ae(e,y.PROP_ROTATE)?y.PROP_ROTATE:Ae(e,y.PROP_ROTATEY)?y.PROP_ROTATEY:Ae(e,y.PROP_ROTATEX)?y.PROP_ROTATEX:Ae(e,y.PROP_OPACITY)?y.PROP_OPACITY:Ae(e,y.PROP_SCALE)?y.PROP_SCALE:Ae(e,y.PROP_SCALE_X)?y.PROP_SCALE_X:Ae(e,y.PROP_SCALE_Y)?y.PROP_SCALE_Y:Ae(e,y.PROP_TWEEN)?y.PROP_TWEEN:e),by=e=>{if(e){if(ar(e,y.PX))return y.PX;if(ar(e,y.VH))return y.VH;if(ar(e,y.VW))return y.VW}return""},Ea=e=>Ae(e,y.POSITION_TOP)?y.POSITION_TOP:Ae(e,y.POSITION_BOTTOM)?y.POSITION_BOTTOM:Ae(e,y.POSITION_LEFT)?y.POSITION_LEFT:Ae(e,y.POSITION_RIGHT)?y.POSITION_RIGHT:"",yy=e=>ar(e,y.PX)?y.PX:ar(e,y.VH)?y.VH:ar(e,y.VW)?y.VW:ar(e,y.WPERCENT)?y.WPERCENT:ar(e,y.HPERCENT)?y.HPERCENT:ar(e,y.DEGREE)?y.DEGREE:y.PX;var Ht=e=>u.checkType(Number,e)||u.checkType(Function,e)&&u.checkType(Number,e()),Ia=({start:e,end:t})=>{let r=u.checkType(Number,e),o=u.checkType(Number,t);return r||ab(e),o||cb(t),r&&o},ao=e=>{let t=u.checkType(Number,e);return!t&&e&&wb(e),t?e:ae.get("sequencer").duration},Ma=e=>{let t=u.checkType(Number,e);return!t&&e&&Mb(e),t&&e?e:1},vy=e=>{let t=e&&e in jt;return!t&&e&&Bo(e),t?e:ae.get("sequencer").ease},Ty=e=>{let t=e&&e in jt;return!t&&e&&Bo(e),t?mt(e):mt(ae.get("parallaxTween").ease)},_y=(e,t)=>{let r=u.checkType(String,e),o=u.checkType(Number,t);return r||kb(e),o||Rb(t),r&&o},Sy=e=>{if(!e)return;let t=u.checkType(Number,e);return t||Ca(),t},xy=e=>{if(!e)return;let r=[ir,"end",kn,Rn,Nn].includes(e),o=u.checkType(Number,e),n=u.checkType(Object,e),s=r||o||n;return s||Eb(e),s},fu=e=>{if(!e)return;let t=u.checkType(Number,e);return t||_b(e),t},Cy=e=>{if(!e)return;let r=[xa,"row","col"].includes(e);return r||xb(),r},Ey=e=>{if(!e)return;let t=u.checkType(Boolean,e);return t||Sb(),t},wy=(e=[])=>{let t=u.checkType(Array,[...e])&&e.length>0;return t||Nb(),t},Iy=(e=[])=>u.checkType(Array,[...e])&&e.length>0?e:[],My=e=>{if(!e)return;let r=[Lo,Do,"end",Fo].includes(e);if(!r){Ab();return}return r};var co=(e,t)=>{let r=u.checkType(Boolean,e);return!r&&e&&$b(e,t),r?e:ae.get(t).relative},ka=e=>{let t=e&&e in jt;return!t&&e&&Bo(e),t?mt(e):mt(ae.get("tween").ease)},Ra=e=>{let t=e&&e in jt;return!t&&e&&Bo(e),t?e:ae.get("tween").ease},gu=e=>{let{config:t}=ae.get("spring"),r=e&&e in t,o=r?t[e]:{},s=(r?u.checkType(Object,o)&&"tension"in o&&"mass"in o&&"friction"in o&&"velocity"in o&&"precision"in o:!1)?Object.values(o).every(i=>u.checkType(Number,i)&&i>=0):null;return!r&&e&&au(e),!s&&r&&Tb(e),s?t[e]:t.default},ky=e=>{let{config:t}=ae.get("spring"),r=e&&e in t;return!r&&e&&au(e),r},bu=e=>{let t=u.checkType(Object,e)&&Object.values(e).every(r=>u.checkType(Number,r)&&r>=0);return!t&&e&&vb(),t?e:{}},yu=e=>{let r=u.checkType(Function,e)?e():e,o=u.checkType(Number,r);return!o&&e&&Ib(e),o?r:ae.get("tween").duration},Pt=(e,t)=>{let r=u.checkType(Boolean,e);return!r&&e&&cu(e,t),r&&e===!0},ue=(e,t,r)=>{let o=u.checkType(Boolean,e);return!o&&e&&cu(e,t),o?e:r},Na=(e,t,r)=>{let o=u.checkType(String,e);return!o&&e&&Lb(e,t),o?e:r},cr=(e,t,r)=>{let o=u.checkType(Number,e);return!o&&e&&Db(e,t),o?e:r},at=(e,t,r)=>{let o=u.checkType(Function,e);return!o&&e&&Fb(e,t),o?e:r},Pa=e=>{let t=u.checkType(Number,e)&&e>0&&e<=1;return!t&&e&&Bb(),t?e:ae.get("lerp").velocity},Aa=e=>{let t=u.checkType(Number,e);return!t&&e&&Vb(),t?e:ae.get("lerp").precision},Ry=(e,t)=>{let r=u.checkType(String,e);return!r&&e&&Wb(t),r},Ps=e=>{let t=u.checkType(Number,e);return!t&&e&&Hb(),t?e:void 0},As=e=>{let t=e?.getType?.()&&(e.getType()==="LERP"||e.getType()==="SPRING"||e.getType()==="TWEEN");return!t&&e&&jb(),t},Ny=(e,t)=>{e===-1&&zb(t)},lo=(e,t,r)=>{let o=u.checkType(Function,e);return!o&&e&&py(r,e),o?e:t},Py=e=>{let t=u.checkType(Function,e);return!t&&e&&Ub(e),t?e:({resolve:r})=>{r()}},Ay=e=>{let t=u.checkType(Array,e);return!t&&e&&mb(e),t},Oy=e=>{let t=u.checkType(String,e);return!t&&e&&db(e),t},$n=(e,t=!1)=>{let o=u.checkType(Element,e)?e:document.querySelector(e);return t?o??globalThis:o??document.createElement("div")},vu=e=>u.checkType(Element,e)?e:document.querySelector(e),Os=(e,t)=>{if(!e)return y.DIRECTION_VERTICAL;let o=[y.DIRECTION_VERTICAL,y.DIRECTION_HORIZONTAL].includes(e);return!o&&e&&Gb(e,t),o?e:y.DIRECTION_VERTICAL},Tu=(e,t)=>{let r=[y.POSITION_TOP,y.POSITION_LEFT,y.POSITION_RIGHT,y.POSITION_BOTTOM],o=u.checkType(Object,e),n=o&&u.checkType(String,e?.position)&&r.includes(e.position),s=o&&u.checkType(Function,e.value)&&u.checkType(Number,e.value()),i=o&&n&&s;return i||qb(t),i?e:null},$y=e=>{let t=u.checkType(Function,e)&&u.checkType(Number,e?.());return!t&&e&&Jb(),t?e:void 0},Ly=e=>{let t=e?.getType?.()&&(e.getType()===y.TWEEN_TWEEN||e.getType()===y.TWEEN_TIMELINE);return!t&&e&&Yb(),t?e:{}},Dy=e=>{if(!e&&e!==0)return y.ALIGN_CENTER;let t=[y.ALIGN_START,y.ALIGN_TOP,y.ALIGN_RIGHT,y.ALIGN_CENTER,y.ALIGN_BOTTOM,y.ALIGN_LEFT,y.ALIGN_END],r=t.includes(e)||u.checkType(Number,e);return!r&&e&&Xb(e,t),r?e:y.ALIGN_CENTER},Fy=e=>{if(!e)return!1;let t=[y.IN_BACK,y.IN_STOP,y.OUT_BACK,y.OUT_STOP],r=t.includes(e);return!r&&e&&Kb(e,t),r?e:!1},_u=(e,t,r)=>{if(e==null)return r;let o=u.checkType(Number,e);return!o&&e&&Qb(e,t),o?e:r},By=e=>{if(!e)return y.TYPE_PARALLAX;let t=e?.toLowerCase(),r=[y.TYPE_PARALLAX,y.TYPE_SCROLLTRIGGER],o=r.includes(t);return!o&&t&&Zb(t,r),o?t:y.TYPE_PARALLAX},Vy=(e,t)=>(()=>{if(t===y.TYPE_PARALLAX){let o=fy(e),n=u.checkType(Number,Number(e))&&o&&e>=0&&e<10;return!n&&e&&sy(e),n?10-e:10-ae.get("parallax").defaultRange}else{let o=u.checkType(String,e);return!o&&e&&iy(e),o?e:"0px"}})(),Vo=(e,t,r)=>{let o=ae.get("defaultMq").value;if(!e)return o;let n=ae.get("mq"),s=Object.keys(n),i=u.checkType(String,e)&&s.includes(e);return!i&&e&&lu(e,s,t,r),i?e:o},Wo=(e,t,r)=>{let o=ae.get("defaultMq").type;if(!e)return o;let n=[tb,Ms],s=u.checkType(String,e)&&n.includes(e);return!s&&e&&lu(e,n,t,r),s?e:o},Wy=(e,t,r,o)=>{if(!e&&o)return{propierties:y.PROP_VERTICAL,shouldTrackOnlyEvents:!0};if(!e&&r)return{propierties:y.PROP_VERTICAL,shouldTrackOnlyEvents:!1};let n=t===y.TYPE_SCROLLTRIGGER&&!e,s=[y.PROP_VERTICAL,y.PROP_HORIZONTAL,y.PROP_ROTATE,y.PROP_ROTATEY,y.PROP_ROTATEX,y.PROP_ROTATEZ,y.PROP_OPACITY,y.PROP_SCALE,y.PROP_SCALE_X,y.PROP_SCALE_Y,y.PROP_TWEEN],i=u.checkType(String,e);!i&&e&&ey(e,s);let a=t===y.TYPE_PARALLAX&&e===y.PROP_TWEEN&&!r;!r&&!o&&e===y.PROP_TWEEN&&ly(),(r||o)&&e!==y.PROP_TWEEN&&uy(),a&&ay();let c=a?y.PROP_VERTICAL:e,l=gy(c);return{propierties:i?l??y.PROP_VERTICAL:y.PROP_VERTICAL,shouldTrackOnlyEvents:n}},jy=e=>{if(!e)return y.EASE_LERP;let t=[y.EASE_SPRING,y.EASE_LERP],r=t.includes(e);r||ty(e,t);let o=r?e:y.EASE_LERP;return r?e:o},Oa=(e,t)=>{let r=[y.EASE_SPRING,y.EASE_LERP],o=r.includes(e);return!o&&e&&ry(e,r,t),o?e:y.EASE_LERP},Hy=(e,t)=>{let r=t===y.TYPE_PARALLAX?ae.get("parallax").springConfig:ae.get("scrollTrigger").springConfig;if(!e)return r;let o=ae.get("spring").config,n=Object.keys(o),s=n.includes(e);return!s&&e&&ny(e,n),s?e:r},zy=(e,t)=>{let r=u.checkType(Number,Number(e))&&e>0&&e<=1;!r&&e&&cy();let o=t===y.TYPE_PARALLAX?ae.get("parallax").lerpConfig:ae.get("scrollTrigger").lerpConfig;return r?e:o},Uy=(e,t)=>{let r=[y.PX,y.VW,y.VH,y.WPERCENT,y.HPERCENT];if(t===y.PROP_VERTICAL||t===y.PROP_HORIZONTAL){let n=mu(r,e);return n||uu(e,t,r),n?e:"0px"}if(t===y.PROP_ROTATE||t===y.PROP_ROTATEX||t===y.PROP_ROTATEY||t===y.PROP_ROTATEZ){let n=mu([y.DEGREE],e);return n||uu(e,t,[y.DEGREE]),n?e:"0"}if(t===y.PROP_SCALE||t===y.PROP_SCALE_X||t===y.PROP_SCALE_Y){let n=pu(e);return n||dy(e,t),n?e:"0"}let o=pu(e);return o||my(t),o?e:"0"};var $a=e=>{let{instantFps:t}=u.store.get(),r=Math.round(e*(t/60));return e===1&&r===0?e:r},At=e=>({type:My(e?.stagger?.type)?e.stagger.type:Pn.type,each:Sy(e?.stagger?.each)?e.stagger.each:Pn.each,from:xy(e?.stagger?.from)?e?.stagger?.from:Do,grid:{col:fu(e?.stagger?.grid?.col)?e.stagger.grid.col:Pn.grid.col,row:fu(e?.stagger?.grid?.row)?e.stagger.grid.row:Pn.grid.row,direction:Cy(e?.stagger?.grid?.direction)?e.stagger.grid.direction:"col"},waitComplete:Ey(e?.stagger?.waitComplete)?e.stagger.waitComplete:Pn.waitComplete}),lr=(e,t)=>e.length>t.length?e:t;var $s=e=>e%2,rI=e=>Math.floor(Math.random()*e),oI=(e,t,r)=>{let o=new Set(e.slice(0,r).map(i=>i.frame));return e.map((i,a)=>a*t).filter(i=>!o.has(i))},nI=(e,t,r,o=[])=>{let{from:n,each:s}=r,i=$a(s);if(n===Nn)return{index:e,frame:o[rI(o.length)]};if(n===ir)return{index:e,frame:e*i};if(n==="end")return{index:e,frame:(t-1-e)*i};if(n===kn){let a=Math.trunc(t/2);return e>a?{index:e,frame:(e-a)*i}:e<a?$s(t)===0&&a-e===1?{index:e,frame:0}:$s(t)===0?{index:e,frame:(a-e-1)*i}:{index:e,frame:(a-e)*i}:{index:e,frame:0}}if(n===Rn){let a=Math.trunc(t/2);return e>a?{index:e,frame:(t-a-1-(e-a))*i}:e<a?$s(t)===0&&a-e===1?{index:e,frame:(a-1)*i}:$s(t)===0?{index:e,frame:(t-a-(a-e))*i}:{index:e,frame:(t-a-1-(a-e))*i}:$s(t)?{index:e,frame:a*i}:{index:e,frame:(a-1)*i}}if(n&&Le(Number,n)){let a=n>=t?t-1:n;return e>a?{index:e,frame:(e-a)*s}:e<a?{index:e,frame:(a-e)*s}:{index:e,frame:0}}return{index:0,frame:0}},Gy=(e,t,r)=>{if(t.grid.direction==="row"){let o=Rs(e,r);return[...[...Array.from({length:t.grid.col}).keys()].reduce((s,i,a)=>[...s,...sb(o,a)],[])].flat()}else return e},qy=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=r?.grid?.col<=1?e.length:r.grid.col,i=r?.grid?.row<=1?e.length:r.grid.row,c=Gy(e,r,s).map(b=>b&&b!==void 0?b:{index:0,frame:0}),p=Gy(t,r,s).map(b=>b&&b!==void 0?b:{index:0,frame:0}),d=r.grid.direction==="row"?i:s,f=Rs(c,d),h=f[0];return h.forEach((b,T)=>{let{index:S,frame:_}=nI(T,f[0].length,r,oI(h,r.each,T));b.index=S,b.frame=_,_>=o.frame&&(o={index:S,frame:_}),_<=n.frame&&(n={index:S,frame:_})}),f.forEach(b=>{b.forEach((T,S)=>{T&&(T.index=f[0][S].index,T.frame=f[0][S].frame)})}),f.flat().forEach((b,T)=>{c[T].index=b.index,c[T].frame=b.frame,p.length>0&&(p[T].index=b.index,p[T].frame=b.frame)}),{staggerArray:c,staggerArrayOnComplete:p,fastestStagger:n,slowlestStagger:o}};var sI=(e,t,r)=>e.reduce((o,n,s)=>{let i=Math.abs(s-r),a=n.reduce((c,l,p)=>p<t-i||p>t+i?c:[...c,l],[]);return[...o,a]},[]),iI=(e,t,r,o)=>e.reduce((n,s,i)=>{let a=Math.abs(i-r),c=[];if(i>=r&&i<=r*2)return[...n,c];let l=t-a,p=t+a;for(let f=0;f<a;f++)La(o,r+f,l)&&c.push(o[r+f][l]),La(o,r+f,p)&&c.push(o[r+f][p]),f>0&&(La(o,r-f,l)&&c.push(o[r-f][l]),La(o,r-f,p)&&c.push(o[r-f][p]));let d=c.filter(f=>f!=null);return[...n,d]},[]),La=(e,t,r)=>e[t]!==void 0&&e[t][r]!==void 0,Su=(e,t)=>{let{col:r}=t.grid,{x:o,y:n}=t.from,s=Rs(e,r);[...Array.from({length:r}).keys()].forEach(()=>{s.push([])});let i=sI(s,o,n),a=iI(i,o,n,s),c=i.reduce((h,v,b)=>{let T=[...i[b],...a[b]];return h.push(T),h},[]),l=c.length;return{cleanArray:((n>=l/2?ib:iu)===iu?c.reduce((h,v,b)=>{if(b<n)return h;if(b===n){let T=[...c[b]];return h.push(T),h}else{let T=c[n-(b-n)]??[],S=[...c[b],...T];return h.push(S),h}},[]):c.reduce((h,v,b)=>{if(b>n)return h;if(b===n){let T=[...c[b]];return h.push(T),h}else{let T=c[n+(n-b)]??[],S=[...c[b],...T];return h.push(S),h}},[]).toReversed()).reduce((h,v)=>v.length===0?h:[...h,v],[])}};var aI=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{u.checkType(Object,r?.from)||(r.from={}),u.checkType(Number,r?.from?.x)||(r.from={...r.from,x:0}),u.checkType(Number,r?.from?.y)||(r.from={...r.from,y:0});let{cleanArray:s}=Su(e,r),i=0;s.forEach((p,d)=>{p.forEach(f=>{let h=$a(r.each),v=d*h;f.index=i,f.frame=v,v>=o.frame&&(o={index:i,frame:v}),v<=n.frame&&(n={index:i,frame:v}),i++})});let a=(()=>{if(t.length>0){let{cleanArray:p}=Su(t,r);return p.flat()}else return[]})(),c=s.flat(),l=a.flat();return c.forEach((p,d)=>{l.length>0&&(l[d].index=p.index,l[d].frame=p.frame)}),{staggerArray:c,staggerArrayOnComplete:l,fastestStagger:n,slowlestStagger:o}},cI=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=[ir,"end",kn,Rn,Nn];return(!u.checkType(String,r?.from)&&!u.checkType(Number,r?.from)||u.checkType(String,r?.from)&&!s.includes(r?.from))&&(Cb(),r.from=ir),qy({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})},Ot=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=r?.grid?.direction===xa?aI({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n}):cI({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n}),i=s.staggerArray,a=s.staggerArrayOnComplete,c=s.fastestStagger,l=s.slowlestStagger;return{staggerArray:i,staggerArrayOnComplete:a,fastestStagger:c,slowlestStagger:l}};var Ln=({stagger:e,callback:t,callbackCache:r,callBackObject:o,useStagger:n})=>{if(e.each===0||!n){u.useFrame(()=>{t.forEach(({cb:s})=>{s(o)})}),u.useFrame(()=>{r.forEach(({cb:s})=>{u.useCache.fireObject({id:s,obj:o})})});return}t.forEach(({cb:s,frame:i})=>{u.useFrameIndex(()=>{s(o)},i)}),r.forEach(({cb:s,frame:i})=>{u.useCache.update({id:s,callBackObject:o,frame:i})})},Dn=({onComplete:e,callback:t,callbackCache:r,callbackOnComplete:o,callBackObject:n,stagger:s,slowlestStagger:i,fastestStagger:a,useStagger:c})=>{if(s.each===0||!c){e(),u.useNextFrame(()=>{t.forEach(({cb:l})=>{l(n)}),r.forEach(({cb:l})=>{u.useCache.fireObject({id:l,obj:n})}),o.forEach(({cb:l})=>{l(n)})});return}t.forEach(({cb:l,frame:p},d)=>{u.useFrameIndex(()=>{if(s.waitComplete){d===i.index&&(l(n),e());return}d===a.index&&(l(n),e())},p)}),r.forEach(({cb:l,frame:p},d)=>{u.useFrameIndex(()=>{if(s.waitComplete){d===i.index&&(u.useCache.fireObject({id:l,obj:n}),e());return}d===a.index&&(u.useCache.fireObject({id:l,obj:n}),e())},p)}),o.forEach(({cb:l,frame:p})=>{u.useFrameIndex(()=>{l(n)},p+1)})};var Ls=u.createStore({id:0});var ct=(e,t)=>{let{id:r}=Ls.get(),o=[...t,{cb:e,id:r,index:-1,frame:-1}],n=r;return Ls.quickSetProp("id",r+1),{arrayOfCallbackUpdated:o,unsubscribeCb:s=>s.map(({id:i,cb:a,index:c,frame:l})=>(i===n&&(a=()=>{}),{id:i,cb:a,index:c,frame:l}))}},ur=(e,t,r,o)=>{let{id:n}=Ls.get(),{id:s,unsubscribe:i}=u.useCache.add(e,t),a=[...r,{cb:s,id:n,index:-1,frame:-1}];o.push(i);let c=n;return Ls.quickSetProp("id",n+1),{arrayOfCallbackUpdated:a,unsubscribeCache:o,unsubscribeCb:l=>(i(),l.map(({id:p,cb:d,index:f,frame:h})=>(p===c&&(d=""),{id:p,cb:d,index:f,frame:h})))}};var uo=e=>Object.keys(e).map(t=>{if(!Ht(e[t]))return Rr(`${t}: ${e[t]}`),{prop:t,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let r=u.checkType(Number,e[t])?e[t]:e[t]?.()??0;return{prop:t,toValue:r,toFn:e[t],toIsFn:u.checkType(Function,e[t]),settled:!1}}),Fn=e=>Object.keys(e).map(t=>{if(!Ht(e[t]))return Rr(`${t}: ${e[t]}`),{prop:t,fromValue:0,currentValue:0,fromFn:()=>0,fromIsFn:!1,settled:!1};let r=u.checkType(Number,e[t])?e[t]:e[t]?.()??0;return{prop:t,fromValue:r,currentValue:r,fromFn:e[t],fromIsFn:u.checkType(Function,e[t]),settled:!1}}),Bn=(e,t)=>Object.keys(e).map(r=>{if(!Ht(t[r])||!Ht(e[r]))return Rr(`${r}: ${t[r]} || ${r}: ${e[r]}`),{prop:r,fromValue:0,fromFn:()=>0,fromIsFn:!1,currentValue:0,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let o=u.checkType(Number,e[r])?e[r]:e[r]?.()??0,n=u.checkType(Number,t[r])?t[r]:t[r]?.()??0;return{prop:r,fromValue:o,fromFn:e[r],fromIsFn:u.checkType(Function,e[r]),currentValue:o,toValue:n,toFn:t[r],toIsFn:u.checkType(Function,t[r]),settled:!1}}),Nr=e=>Object.keys(e).map(t=>{if(!Ht(e[t]))return Rr(`${t}: ${e[t]}`),{prop:t,fromValue:0,fromFn:()=>0,fromIsFn:!1,currentValue:0,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let r=u.checkType(Number,e[t])?e[t]:e[t]?.()??0;return{prop:t,fromValue:r,fromFn:e[t],fromIsFn:u.checkType(Function,e[t]),currentValue:r,toValue:r,toFn:e[t],toIsFn:u.checkType(Function,e[t]),settled:!1}});var Vn=({validationFunction:e,defaultRafInit:t})=>{u.useFrame(()=>{u.useNextTick(({time:r,fps:o})=>{let n=e.findLast(({validation:s})=>s());if(t(r,o),n){n?.callback(),console.log("custom tween run function extrecuted");return}})})};var po=(e,t)=>{console.log(`stagger on ${e} loaded at: ${t} fps`)};var Wn=(e,t,r,o)=>(u.checkType(Number,e)||Ca(),e>0&&t&&(r.length>0||o.length>0));var Da=e=>{u.useFrame(()=>{u.useNextTick(({time:t,fps:r})=>{e(t,r)})})};var Oe=(e,t)=>Object.fromEntries(e.map(r=>{let o=r[t];return[r.prop,typeof o=="number"?o:Number.parseFloat(o)]})),jn=e=>e.map(t=>t.toIsFn?{[t.prop]:t.toFn}:{[t.prop]:Number.parseFloat(t.toValue)}).reduce((t,r)=>({...t,...r}),{}),Hn=e=>e.map(t=>t.fromIsFn?{[t.prop]:t.fromFn}:{[t.prop]:Number.parseFloat(t.fromValue)}).reduce((t,r)=>({...t,...r}),{});var zn=(e,t)=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o}:r}),xu=(e,t)=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o,shouldUpdate:!0}:{...r,shouldUpdate:!1}});var Jy=({values:e,fps:t,velocity:r,precision:o})=>e.map(n=>{if(n.settled)return n;let{currentValue:s,toValue:i}=n,a=nb(s,i,r/t*60),c=Se(a);return Number(Math.abs(i-c).toFixed(4))<=o?{...n,currentValue:i,settled:!0}:{...n,currentValue:c,settled:!1}});var Pr=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#S;#v;#y;#T;#k;#_;constructor(t){this.#n=At(t??{}),this.#t=co(t?.relative,"lerp"),this.#i=Pa(t?.velocity),this.#l=Aa(t?.precision),this.#d=u.getUnivoqueId(),this.#u=!1,this.#s=void 0,this.#c=void 0,this.#r=void 0,this.#e=[],this.#p=[],this.#a=[],this.#h=[],this.#f=[],this.#o=[],this.#g=[],this.#m=!1,this.#x=!0,this.#S=!0,this.#v=!1,this.#y=!1,this.#T={reverse:!1,velocity:this.#i,precision:this.#l,relative:this.#t,immediate:!1},this.#k=Ge,this.#_=Ge;let r=t?.data;r&&this.setData(r)}#w(t,r){this.#u=!0,this.#e=Jy({values:this.#e,fps:r,velocity:this.#i,precision:this.#l});let o=Oe(this.#e,"currentValue");if(this.#m||Ln({stagger:this.#n,callback:this.#a,callbackCache:this.#h,callBackObject:o,useStagger:this.#S}),this.#e.every(s=>s.settled===!0)){let s=()=>{this.#u=!1,this.#e=[...this.#e].map(a=>({...a,fromValue:a.toValue})),this.#s?.(!0),this.#r=void 0,this.#c=void 0,this.#s=void 0,this.#m=!1,this.#u=!1},i=Oe(this.#e,"toValue");Dn({onComplete:s,callback:this.#a,callbackCache:this.#h,callbackOnComplete:this.#f,callBackObject:i,stagger:this.#n,slowlestStagger:this.#k,fastestStagger:this.#_,useStagger:this.#S});return}u.useFrame(()=>{u.useNextTick(({time:s,fps:i})=>{this.#u&&this.#w(s,i)})})}#A(t,r){this.#w(t,r)}async#R(){if(Wn(this.#n.each,this.#x,this.#h,this.#a)){let{averageFPS:t}=await u.useFps();po("lerp",t);let r=lr(this.#h,this.#a);if(this.#n.grid.col>r.length){Nt(r.length),this.#x=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=Ot({arrayDefault:r,arrayOnStop:this.#f,stagger:this.#n,slowlestStagger:this.#k,fastestStagger:this.#_});this.#h.length>this.#a.length?this.#h=o:this.#a=o,this.#f=n,this.#k=i,this.#_=s,this.#x=!1}return{ready:!0}}async#O(t,r){this.#y||(this.#s=t,this.#c=r,this.#x&&(this.#y=!0,await this.#R(),this.#y=!1),Vn({validationFunction:this.#o,defaultRafInit:(o,n)=>this.#A(o,n)}))}clearCurretPromise(){this.#m||(this.#c?.(u.ANIMATION_STOP_REJECT),this.#r=void 0,this.#c=void 0,this.#s=void 0,this.#u=!1)}stop({clearCache:t=!0,updateValues:r=!0}={}){this.#m&&(this.#m=!1),r&&(this.#e=In(this.#e)),this.unFreezeStagger(),t&&this.#h.forEach(({cb:o})=>u.useCache.clean(o)),this.#c&&(this.#c(u.ANIMATION_STOP_REJECT),this.#r=void 0,this.#c=void 0,this.#s=void 0),this.#u=!1}freezeStagger(){this.#v||(this.#h.forEach(({cb:t})=>u.useCache.freeze(t)),this.#v=!0)}unFreezeStagger({updateFrame:t=!0}={}){this.#v&&(this.#h.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:t})),this.#v=!1)}pause(){this.#m||(this.#m=!0,this.#u=!1,this.#e=Sa(this.#e),this.freezeStagger())}resume(){this.#m&&(this.#m=!1,this.unFreezeStagger(),!this.#u&&this.#s&&Da((t,r)=>this.#A(t,r)))}setData(t){this.#e=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,fromValue:n,currentValue:n,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#p=this.#e.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#e=it(this.#e,this.#p)}#E(t){let r={...this.#T,...t},{velocity:o,precision:n,relative:s}=r;return this.#t=co(s,"lerp"),this.#i=Pa(o),this.#l=Aa(n),r}goTo(t,r={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#S=!0;let o=uo(t);return this.#N(o,t,r)}goFrom(t,r={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#S=!0;let o=Fn(t);return this.#N(o,t,r)}goFromTo(t,r,o={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);if(this.#S=!0,!so(t,r))return io("lerp goFromTo:",t,r),new Promise(s=>s);let n=Bn(t,r);return this.#N(n,t,o)}set(t,r={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#S=!1;let o=Nr(t);return this.#N(o,t,r)}setImmediate(t,r={}){if(this.#u&&this.stop({clearCache:!1,updateValues:!1}),this.#m)return;this.#S=!1;let o=Nr(t);this.#e=zn(o,this.#e);let{reverse:n}=this.#E(r??{});Pt(n,"reverse")&&(this.#e=Mr(t,this.#e)),this.#e=Mn(this.#e,this.#t),this.#e=Ir(this.#e)}#N(t,r,o={}){this.#e=zn(t,this.#e);let{reverse:n,immediate:s}=this.#E(o??{});if(Pt(n,"reverse")&&(this.#e=Mr(r,this.#e)),this.#e=Mn(this.#e,this.#t),Pt(s,"immediate "))return this.#u&&this.stop({updateValues:!1}),this.#e=Ir(this.#e),Promise.resolve();let i=!this.#u&&!this.#r;return i&&(this.#r=new Promise((a,c)=>{this.#O(a,c)})),i&&this.#r?this.#r:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return Oe(this.#e,"currentValue")}getInitialData(){return Oe(this.#p,"currentValue")}getFrom(){return Oe(this.#e,"fromValue")}getTo(){return Oe(this.#e,"toValue")}getFromNativeType(){return Hn(this.#e)}getToNativeType(){return jn(this.#e)}getType(){return"LERP"}getId(){return this.#d}isActive(){return this.#u}updateVelocity(t){this.#i=Pa(t),this.#T=it(this.#T,{velocity:this.#i})}updatePrecision(t){this.#i=Aa(t),this.#T=it(this.#T,{precision:this.#l})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#a);return this.#a=r,()=>this.#a=o(this.#a)}subscribeCache(t,r){let{arrayOfCallbackUpdated:o,unsubscribeCb:n,unsubscribeCache:s}=ur(t,r,this.#h,this.#g);return this.#h=o,this.#g=s,()=>this.#h=n(this.#h)}validateInitialization({validation:t,callback:r}){let o=[...this.#o,{validation:t,callback:r}];return this.#o=o,()=>this.#o=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#f);return this.#f=r,()=>this.#f=o(this.#f)}destroy(){this.#r&&this.stop(),this.#f=[],this.#o=[],this.#a=[],this.#h=[],this.#e=[],this.#r=void 0,this.#g.forEach(t=>t()),this.#g=[]}};var Fa=({each:e,useStagger:t,isLastDraw:r,callBackObject:o,callback:n,callbackCache:s,callbackOnStop:i})=>{e===0||t===!1?(u.useFrame(()=>{n.forEach(({cb:a})=>a(o))}),u.useFrame(()=>{s.forEach(({cb:a})=>{u.useCache.fireObject({id:a,obj:o})})})):(n.forEach(({cb:a,frame:c})=>{u.useFrameIndex(()=>a(o),c)}),s.forEach(({cb:a,frame:c})=>{u.useCache.update({id:a,callBackObject:o,frame:c})})),r&&(e===0||t===!1?u.useFrame(()=>{i.forEach(({cb:a})=>a(o))}):i.forEach(({cb:a,frame:c})=>{u.useFrameIndex(()=>a(o),c+1)}))};var Ds=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;constructor(t){this.#n=Ty(t?.ease),this.#t=ao(t?.duration),this.#i=At(t),this.#l=[],this.#d=[],this.#u=[],this.#s=[],this.#c=[],this.#r="parallaxTween";let r=t?.from||null;r&&this.setData(r),t?.to&&this.goTo(t.to)}inzializeStagger(){if(this.#i.each>0&&(this.#s.length>0||this.#u.length>0)){let t=lr(this.#s,this.#u);if(this.#i.grid.col>t.length){Nt(t.length);return}let{staggerArray:r,staggerArrayOnComplete:o}=Ot({arrayDefault:t,arrayOnStop:this.#d,stagger:this.#i,slowlestStagger:Ge,fastestStagger:Ge});this.#s.length>this.#u.length?this.#s=r:this.#u=r,this.#d=o}}draw({partial:t,isLastDraw:r}){this.#l=[...this.#l].map(n=>{let{toIsFn:s,toFn:i,toValue:a,fromIsFn:c,fromFn:l,fromValue:p}=n,d=s?i():a,f=c?l():p,h=d-f,v=this.#n(t,f,h,this.#t);return{...n,currentValue:Se(v)}});let o=Oe(this.#l,"currentValue");u.useNextTick(()=>{Fa({each:this.#i.each,useStagger:!0,isLastDraw:r,callBackObject:o,callback:this.#u,callbackCache:this.#s,callbackOnStop:this.#d})})}setData(t){let r=Object.entries(t);return this.#l=r.map(o=>{let[n,s]=o;return{prop:n,toValue:s,toValProcessed:s,fromValue:s,currentValue:s,settled:!1,fromFn:()=>0,toFn:()=>0}}),this}#e(t){this.#l=this.#l.map(r=>{let o=t.find(n=>n.prop===r.prop);return o?{...r,...o}:{...r}})}goTo(t){let r=uo(t);return this.#e(r),this}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#u);return this.#u=r,()=>this.#u=o(this.#u)}onStop(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#d);return this.#d=r,()=>this.#d=o(this.#d)}subscribeCache(t,r){let{arrayOfCallbackUpdated:o,unsubscribeCb:n,unsubscribeCache:s}=ur(t,r,this.#s,this.#c);return this.#s=o,this.#c=s,()=>this.#s=n(this.#s)}getDuration(){return this.#t}getType(){return this.#r}destroy(){this.#l=[],this.#d=[],this.#u=[],this.#s=[],this.#c.forEach(t=>t()),this.#c=[]}};var Fs=class{#n="sequencer";#t;constructor(){this.#t=[]}draw({partial:t,isLastDraw:r,useFrame:o}){this.#t.forEach(n=>{n.draw({partial:t,isLastDraw:r,useFrame:o})})}add(t){this.#t.push(t)}inzializeStagger(){this.#t.forEach(t=>{t.inzializeStagger()})}setDuration(t){this.#t.forEach(r=>{r.setDuration(t)})}getDuration(){return this.#t.length>0?this.#t[0].getDuration():0}setStretchFactor(t){this.#t.forEach(r=>{r.setStretchFactor(t)})}getLabels(){return this.#t.flatMap(t=>t.getLabels())}resetLastValue(){this.#t.forEach(t=>t.resetLastValue())}disableStagger(){this.#t.forEach(t=>{t.disableStagger()})}cleanCachedId(){this.#t.forEach(t=>{t.cleanCachedId()})}freezeCachedId(){this.#t.forEach(t=>{t.freezeCachedId()})}unFreezeCachedId(){this.#t.forEach(t=>{t.unFreezeCachedId()})}getType(){return this.#n}destroy(){this.#t.forEach(t=>{t.destroy()}),this.#t=[]}};var Yy=(e,t)=>Object.keys(e).map(r=>Ht(e[r])?{prop:r,toValue:e[r],ease:mt(t)}:(Rr(`${r}: ${e[r]}`),{prop:r,toValue:0,ease:mt(t)})),Xy=(e,t)=>Object.keys(e).map(r=>Ht(e[r])?{prop:r,fromValue:e[r],ease:mt(t)}:(Rr(`${r}: ${e[r]}`),{prop:r,fromValue:0,ease:mt(t)})),Ky=(e,t,r)=>Object.keys(e).map(o=>!Ht(t[o])||!Ht(e[o])?(Rr(`${o}: ${t[o]} || ${o}: ${e[o]}`),{prop:o,fromValue:0,toValue:0,ease:mt(r)}):{prop:o,fromValue:e[o],toValue:t[o],ease:mt(r)});var ze={BACKWARD:"backward",FORWARD:"forward",NONE:"none"};var Cu={fromValue:{get:"toValue",set:"fromValue"},toValue:{get:"toValue",set:"toValue"}},Qy=(e,t,r,o)=>e.slice(0,t).reduceRight((n,{values:s})=>{let i=s.find(({prop:a,active:c})=>c&&a===r);return i&&!n&&n!==0?i[Cu[o].get]:n},void 0),Zy=(e,t,r,o)=>e.slice(t+1).reduce((n,{start:s,values:i})=>i.find(c=>c.prop===r&&c.active)&&s<=o?!1:n,!0);var ev=({timeline:e,valuesState:t,partial:r})=>t.map(o=>{let n=e.reduce((S,{start:_,end:E,values:C},w)=>{let I=C.find(({prop:k})=>k===o.prop);if(!I||!I?.active||Object.keys(S).length>0||o.settled)return S;let{prop:N,toValue:A,fromValue:O,ease:R}=I;return Zy(e,w,N,r)?{toValue:A,fromValue:O,start:_,end:E,ease:R}:S},{});if(Object.keys(n).length===0)return o;let{start:s,end:i,toValue:a,fromValue:c,ease:l}=n,p=u.checkType(Number,a)?a:a(),d=u.checkType(Number,c)?c:c(),f=i-s,h=r<i?d:p,v=r>=s&&r<=i?l(r-s,d,p-d,f):h,b=Number.isNaN(v)?h:v,T=Se(b);return{...o,currentValue:T,settled:!0}});var Eu=({timeline:e,activeProp:t})=>e.map((r,o)=>{let{values:n,propToFind:s}=r,i=n.map(a=>{let{prop:c,active:l}=a;if(!l||!t.includes(c)||!s||s.length===0)return a;let p=Qy(e,o,c,s);return!p&&p!==0?a:{...a,[Cu[s].set]:p}});return{...r,values:i}});var wu=(e,t)=>e.toSorted((r,o)=>r?.[t]-o?.[t]);var Ba=({timeline:e,values:t,start:r,end:o,duration:n,propToFind:s})=>{let i=e.length===0?0:1,a=[...e,{values:t,start:r??0,end:o??n,priority:i,propToFind:s}],c=wu(a,"start");return wu(c,"priority")};var Va=({data:e,values:t})=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o,active:!0}:{prop:r.prop,active:!1}});var Bs=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;constructor(t){this.#n=[],this.#t=[],this.#i=[],this.#l=[],this.#d=[],this.#u=[],this.#s=[],this.#c=[],this.#r=ao(t?.duration),this.#e="sequencer",this.#p={start:0,end:this.#r,ease:vy(t?.ease)},this.#a=!0,this.#h=!0,this.#f="none",this.#o=0,this.#g=At(t),this.#m=!0,this.#x=!1;let r=t?.data||null;r&&this.setData(r)}inzializeStagger(){if(!this.#x){if(this.#g.each>0&&(this.#d.length>0||this.#l.length>0)){let t=lr(this.#d,this.#l);if(this.#g.grid.col>t.length){Nt(t.length);return}let{staggerArray:r,staggerArrayOnComplete:o}=Ot({arrayDefault:t,arrayOnStop:this.#u,stagger:this.#g,slowlestStagger:Ge,fastestStagger:Ge});this.#d.length>this.#l.length?this.#d=r:this.#l=r,this.#u=o}this.#x=!0}}draw({partial:t=0,isLastDraw:r=!1,useFrame:o=!1,direction:n=ze.NONE}){if(o){this.#S({partial:t,isLastDraw:r,direction:n});return}u.useNextTick(()=>this.#S({partial:t,isLastDraw:r,direction:n}))}#S({partial:t=0,isLastDraw:r=!1,direction:o=ze.NONE}){this.#a&&(this.#o=t,this.#v(t)),!this.#a&&this.#o&&(!o||o===ze.NONE)&&(this.#f=t>=this.#o?ze.FORWARD:ze.BACKWARD),!this.#a&&(o===ze.BACKWARD||o===ze.FORWARD)&&(this.#f=o),this.#n=[...this.#n].map(s=>({...s,settled:!1})),this.#n=ev({timeline:this.#t,valuesState:this.#n,partial:t});let n=Oe(this.#n,"currentValue");Fa({each:this.#g.each,useStagger:this.#m,isLastDraw:r,callBackObject:n,callback:this.#l,callbackCache:this.#d,callbackOnStop:this.#u}),this.#y(t),this.#m=!0,this.#o=t,this.#a=!1}resetLastValue(){this.#a=!0,this.#o=0}#v(t=0){this.#h&&(this.#s.forEach(({fn:r,time:o})=>{let n={shouldFire:t>=o,direction:ze.FORWARD},s={shouldFire:t<=o,direction:ze.BACKWARD};if(!(n.shouldFire||s.shouldFire))return;let a=n.shouldFire?n.direction:s.direction;r({direction:a,value:t,isForced:!0})}),this.#h=!1)}#y(t=0){this.#s.forEach(({fn:r,time:o})=>{let n=this.#f===ze.FORWARD&&t>o&&this.#o<=o,s=this.#f===ze.BACKWARD&&t<o&&this.#o>=o;(n||s)&&r({direction:this.#f,value:t,isForced:!1})})}setStretchFactor(t=0){let r=t/this.#r;this.#t=[...this.#t].map(o=>{let{start:n,end:s}=o;return{...o,start:Se(n*r),end:Se(s*r)}}),this.#i=[...this.#i].map(o=>{let{time:n}=o;return{...o,time:Se(n*r)}}),this.#s=[...this.#s].map(o=>{let{time:n}=o;return{...o,time:Se(n*r)}})}setData(t={}){return this.#n=Object.entries(t).map(r=>{let[o,n]=r,s=_y(o,n),i=s?n:0;return{prop:s?o:"invalidProp",toValue:i,fromValue:i,currentValue:i,active:!1,settled:!1,ease:mt(ae.get("sequencer").ease)}}),this.goTo(t,{start:0,end:0}),this}goTo(t,r){let o={...this.#p,...r},{start:n,end:s,ease:i}=o;if(!Ia({start:n,end:s}))return this;let a=Yy(t,i),c=Va({data:a,values:this.#n}),l=Object.keys(t),p=Ba({timeline:this.#t,values:c,start:n,end:s,duration:this.#r,propToFind:"fromValue"});return this.#t=Eu({timeline:p,activeProp:l}),this}goFrom(t,r){let o={...this.#p,...r},{start:n,end:s,ease:i}=o;if(!Ia({start:n,end:s}))return this;let a=Xy(t,i),c=Va({data:a,values:this.#n}),l=Object.keys(t),p=Ba({timeline:this.#t,values:c,start:n,end:s,duration:this.#r,propToFind:"toValue"});return this.#t=Eu({timeline:p,activeProp:l}),this}goFromTo(t,r,o){let n={...this.#p,...o},{start:s,end:i,ease:a}=n;if(!Ia({start:s,end:i}))return this;if(!so(t,r))return io("sequencer goFromTo:",t,r),this;let c=Ky(t,r,a),l=Va({data:c,values:this.#n});return this.#t=Ba({timeline:this.#t,values:l,start:s,end:i,duration:this.#r,propToFind:""}),this}label(t="",r=0){return this.#i.push({name:t,time:r}),this}getLabels(){return this.#i}add(t=()=>{},r=0){let o=u.checkType(Function,t),n=u.checkType(Number,r),s=o&&n;return o||bb(t),n||yb(r),s?(this.#s.push({fn:t,time:r}),this):this}subscribe(t=()=>{}){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#l);return this.#l=r,()=>this.#l=o(this.#l)}onStop(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#u);return this.#u=r,()=>this.#u=o(this.#u)}subscribeCache(t,r=()=>{}){let{arrayOfCallbackUpdated:o,unsubscribeCb:n,unsubscribeCache:s}=ur(t,r,this.#d,this.#c);return this.#d=o,this.#c=s,()=>this.#d=n(this.#d)}getDuration(){return this.#r}setDuration(t=0){this.#r=t}getType(){return this.#e}cleanCachedId(){this.#d.forEach(({cb:t})=>u.useCache.clean(t))}freezeCachedId(){this.#d.forEach(({cb:t})=>u.useCache.freeze(t))}unFreezeCachedId(){this.#d.forEach(({cb:t})=>u.useCache.unFreeze({id:t,update:!0}))}disableStagger(){this.#m=!1}destroy(){this.#n=[],this.#t=[],this.#l=[],this.#d=[],this.#u=[],this.#s=[],this.#c.forEach(t=>t()),this.#c=[]}};var tv=({values:e,tension:t,friction:r,mass:o,precision:n,fps:s})=>e.map(i=>{let{currentValue:a,toValue:c,velocity:l}=i,p=-t*(a-c),d=-r*l,f=(p+d)/o,h=l+f*1/s,v=a+h*1/s,b=Se(v),T=Math.abs(h)<=.1,S=t===0?!0:Math.abs(c-b)<=n;return T&&S?{...i,currentValue:c,velocity:h,settled:!0}:{...i,currentValue:b,velocity:h,settled:!1}});var zt=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#S;#v;#y;#T;#k;constructor(t){this.#n=At(t??{}),this.#t=co(t?.relative,"spring"),this.#i=gu(t?.config),this.updateConfigProp(t?.configProps??{}),this.#l=u.getUnivoqueId(),this.#d=!1,this.#u=void 0,this.#s=void 0,this.#c=void 0,this.#r=[],this.#e=[],this.#p=[],this.#a=[],this.#h=[],this.#f=[],this.#o=[],this.#g=!1,this.#m=!0,this.#x=!0,this.#S=!1,this.#v=!1,this.#y={reverse:!1,configProps:this.#i,relative:this.#t,immediate:!1},this.#T=Ge,this.#k=Ge;let r=t?.data;r&&this.setData(r)}#_(t,r,o,n,s,i){this.#d=!0,this.#r=tv({values:this.#r,tension:o,friction:n,mass:s,precision:i,fps:r});let a=Oe(this.#r,"currentValue");if(this.#g||Ln({stagger:this.#n,callback:this.#p,callbackCache:this.#a,callBackObject:a,useStagger:this.#x}),this.#r.every(l=>l.settled===!0)){let l=()=>{this.#r=[...this.#r].map(d=>({...d,fromValue:d.toValue})),this.#u?.(!0),this.#c=void 0,this.#s=void 0,this.#u=void 0,this.#g=!1,this.#d=!1},p=Oe(this.#r,"toValue");Dn({onComplete:l,callback:this.#p,callbackCache:this.#a,callbackOnComplete:this.#h,callBackObject:p,stagger:this.#n,slowlestStagger:this.#T,fastestStagger:this.#k,useStagger:this.#x});return}u.useFrame(()=>{u.useNextTick(({time:l,fps:p})=>{this.#d&&this.#_(l,p,o,n,s,i)})})}#w(t,r){this.#r=[...this.#r].map(a=>({...a,velocity:Math.trunc(this.#i.velocity)}));let o=this.#i.tension,n=this.#i.friction,s=Math.max(1,this.#i.mass),i=this.#i.precision;this.#_(t,r,o,n,s,i)}async#A(){if(Wn(this.#n.each,this.#m,this.#a,this.#p)){let{averageFPS:t}=await u.useFps();po("spring",t);let r=lr(this.#a,this.#p);if(this.#n.grid.col>r.length){Nt(r.length),this.#m=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=Ot({arrayDefault:r,arrayOnStop:this.#h,stagger:this.#n,slowlestStagger:this.#T,fastestStagger:this.#k});this.#a.length>this.#p.length?this.#a=o:this.#p=o,this.#h=n,this.#T=i,this.#k=s,this.#m=!1}return{ready:!0}}async#R(t,r){this.#v||(this.#u=t,this.#s=r,this.#m&&(this.#v=!0,await this.#A(),this.#v=!1),Vn({validationFunction:this.#f,defaultRafInit:(o,n)=>this.#w(o,n)}))}clearCurretPromise(){this.#g||(this.#s?.(u.ANIMATION_STOP_REJECT),this.#c=void 0,this.#s=void 0,this.#u=void 0,this.#d=!1)}stop({clearCache:t=!0,updateValues:r=!0}={}){this.#g&&(this.#g=!1),r&&(this.#r=In(this.#r)),this.unFreezeStagger(),t&&this.#a.forEach(({cb:o})=>u.useCache.clean(o)),this.#s&&(this.#s(u.ANIMATION_STOP_REJECT),this.#c=void 0,this.#s=void 0,this.#u=void 0),this.#d=!1}freezeStagger(){this.#S||(this.#a.forEach(({cb:t})=>u.useCache.freeze(t)),this.#S=!0)}unFreezeStagger({updateFrame:t=!0}={}){this.#S&&(this.#a.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:t})),this.#S=!1)}pause(){this.#g||(this.#g=!0,this.#d=!1,this.#r=Sa(this.#r),this.freezeStagger())}resume(){this.#g&&(this.#g=!1,this.unFreezeStagger(),!this.#d&&this.#u&&Da((t,r)=>this.#w(t,r)))}setData(t){this.#r=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,fromValue:n,velocity:this.#i.velocity,currentValue:n,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#e=this.#r.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#r=it(this.#r,this.#e)}#O(t){let o=ae.get("spring").config,n=ky(t?.config)?o?.[t?.config??"default"]??$o.default:this.#y.configProps,s=bu(t?.configProps),i={...n,...s},a={reverse:t?.reverse??this.#y.reverse,relative:t?.relative??this.#y.relative,immediate:t?.immediate??this.#y.immediate,configProps:i},{relative:c}=a;return this.#i=i,this.#t=c,a}goTo(t,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!0;let o=uo(t);return this.#E(o,t,r)}goFrom(t,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!0;let o=Fn(t);return this.#E(o,t,r)}goFromTo(t,r,o={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);if(this.#x=!0,!so(t,r))return io("spring goFromTo:",t,r),new Promise(s=>s);let n=Bn(t,r);return this.#E(n,t,o)}set(t,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!1;let o=Nr(t);return this.#E(o,t,r)}setImmediate(t,r={}){if(this.#d&&this.stop({clearCache:!1,updateValues:!1}),this.#g)return;this.#x=!1;let o=Nr(t);this.#r=zn(o,this.#r);let{reverse:n}=this.#O(r??{});Pt(n,"reverse")&&(this.#r=Mr(t,this.#r)),this.#r=Mn(this.#r,this.#t),this.#r=Ir(this.#r)}#E(t,r,o={}){this.#r=zn(t,this.#r);let{reverse:n,immediate:s}=this.#O(o);if(Pt(n,"reverse")&&(this.#r=Mr(r,this.#r)),this.#r=Mn(this.#r,this.#t),Pt(s,"immediate "))return this.#d&&this.stop({updateValues:!1}),this.#r=Ir(this.#r),Promise.resolve();let i=!this.#d&&!this.#c;return i&&(this.#c=new Promise((a,c)=>{this.#R(a,c)})),i&&this.#c?this.#c:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return Oe(this.#r,"currentValue")}getInitialData(){return Oe(this.#e,"currentValue")}getFrom(){return Oe(this.#r,"fromValue")}getTo(){return Oe(this.#r,"toValue")}getFromNativeType(){return Hn(this.#r)}getToNativeType(){return jn(this.#r)}getType(){return"SPRING"}getId(){return this.#l}isActive(){return this.#d}updateConfigProp(t={}){let r=bu(t);this.#i={...this.#i,...r},this.#y=it(this.#y,{configProps:r})}updateConfig(t){this.#i=gu(t),this.#y=it(this.#y,{configProps:this.#i})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#p);return this.#p=r,()=>this.#p=o(this.#p)}subscribeCache(t,r){let{arrayOfCallbackUpdated:o,unsubscribeCb:n,unsubscribeCache:s}=ur(t,r,this.#a,this.#o);return this.#a=o,this.#o=s,()=>this.#a=n(this.#a)}validateInitialization({validation:t,callback:r}){let o=[...this.#f,{validation:t,callback:r}];return this.#f=o,()=>this.#f=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#h);return this.#h=r,()=>this.#h=o(this.#h)}destroy(){this.#c&&this.stop(),this.#h=[],this.#f=[],this.#p=[],this.#a=[],this.#r=[],this.#c=void 0,this.#o.forEach(t=>t()),this.#o=[]}};var rv=({values:e,timeElapsed:t,duration:r,ease:o})=>e.map(n=>{if(n.shouldUpdate){let s=o(t,n.fromValue,n.toValProcessed,r);return{...n,currentValue:Se(s)}}return{...n,currentValue:n.fromValue}});var Ar=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#S;#v;#y;#T;#k;#_;#w;#A;#R;constructor(t){this.#n=ka(t?.ease),this.#t=yu(t?.duration),this.#i=co(t?.relative,"tween"),this.#l=At(t??{}),this.#d=u.getUnivoqueId(),this.#u=!1,this.#s=void 0,this.#c=void 0,this.#r=void 0,this.#e=[],this.#p=[],this.#a=[],this.#h=[],this.#f=[],this.#o=[],this.#g=[],this.#m=!1,this.#x=0,this.#S=0,this.#v=0,this.#y=!0,this.#T=!0,this.#k=!1,this.#_=!1,this.#w={duration:this.#t,ease:Ra(t?.ease),relative:this.#i,reverse:!1,immediate:!1},this.#A=Ge,this.#R=Ge;let r=t?.data;r&&this.setData(r)}#O(t){this.#u=!0,this.#m&&(this.#v=t-this.#x-this.#S),this.#S=t-this.#x-this.#v,Math.round(this.#S)>=this.#t&&(this.#S=this.#t),this.#e=rv({values:this.#e,timeElapsed:this.#S,duration:this.#t,ease:this.#n});let r=Math.round(this.#S)===this.#t,o=Oe(this.#e,"currentValue");if(this.#m||Ln({stagger:this.#l,callback:this.#a,callbackCache:this.#h,callBackObject:o,useStagger:this.#T}),r){Dn({onComplete:()=>{this.#e=[...this.#e].map(s=>s.shouldUpdate?{...s,toValue:s.currentValue,fromValue:s.currentValue}:s),this.#s?.(!0),this.#r=void 0,this.#c=void 0,this.#s=void 0,this.#v=0,this.#m=!1,this.#u=!1},callback:this.#a,callbackCache:this.#h,callbackOnComplete:this.#f,callBackObject:o,stagger:this.#l,slowlestStagger:this.#A,fastestStagger:this.#R,useStagger:this.#T});return}u.useFrame(()=>{u.useNextTick(({time:n})=>{this.#u&&this.#O(n)})})}#E(t){this.#x=t,this.#O(t)}async#N(){if(Wn(this.#l.each,this.#y,this.#h,this.#a)){let{averageFPS:t}=await u.useFps();po("tween",t);let r=lr(this.#h,this.#a);if(this.#l.grid.col>r.length){Nt(r.length),this.#y=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=Ot({arrayDefault:r,arrayOnStop:this.#f,stagger:this.#l,slowlestStagger:this.#A,fastestStagger:this.#R});this.#h.length>this.#a.length?this.#h=o:this.#a=o,this.#f=n,this.#A=i,this.#R=s,this.#y=!1}return{ready:!0}}async#P(t,r){this.#_||(this.#s=t,this.#c=r,this.#y&&(this.#_=!0,await this.#N(),this.#_=!1),Vn({validationFunction:this.#o,defaultRafInit:o=>this.#E(o)}))}clearCurretPromise(){this.#m||(this.#c?.(u.ANIMATION_STOP_REJECT),this.#r=void 0,this.#c=void 0,this.#s=void 0,this.#u=!1)}stop({clearCache:t=!0,updateValues:r=!0}={}){this.#v=0,this.#m=!1,r&&(this.#e=In(this.#e)),this.unFreezeStagger(),t&&this.#h.forEach(({cb:o})=>u.useCache.clean(o)),this.#c&&(this.#c(u.ANIMATION_STOP_REJECT),this.#r=void 0,this.#c=void 0,this.#s=void 0),this.#u=!1}freezeStagger(){this.#k||(this.#h.forEach(({cb:t})=>u.useCache.freeze(t)),this.#k=!0)}unFreezeStagger({updateFrame:t=!0}={}){this.#k&&(this.#h.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:t})),this.#k=!1)}pause(){this.#m||(this.#m=!0,this.freezeStagger())}resume(){this.#m&&(this.#m=!1,this.unFreezeStagger())}setData(t){this.#e=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,toValueOnPause:n,toValProcessed:n,fromValue:n,currentValue:n,shouldUpdate:!1,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#p=this.#e.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,shouldUpdate:!1,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#e=it(this.#e,this.#p)}#b(){this.#e=[...this.#e].map(t=>t.shouldUpdate?{...t,fromValue:t.currentValue}:t)}#D(t){let r={...this.#w,...t},{ease:o,duration:n,relative:s}=r;return this.#n=ka(o),this.#i=co(s,"tween"),this.#t=yu(n),r}goTo(t,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!0;let o=uo(t);return this.#B(o,t,r)}goFrom(t,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!0;let o=Fn(t);return this.#B(o,t,r)}goFromTo(t,r,o={}){if(this.stop({clearCache:!1,updateValues:!0}),this.#T=!0,!so(t,r))return io("tween goFromTo:",t,r),new Promise(s=>s);let n=Bn(t,r);return this.#B(n,t,o)}set(t,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!1;let o=Nr(t),n=r?{...r,duration:1}:{duration:1};return this.#B(o,t,n)}setImmediate(t,r={}){if(this.stop({clearCache:!1,updateValues:!1}),this.#m)return;this.#T=!1;let o=Nr(t),n=r?{...r,duration:1}:{duration:1};this.#e=xu(o,this.#e);let{reverse:s}=this.#D(n);Pt(s,"reverse")&&(this.#e=Mr(t,this.#e)),this.#e=su(this.#e,this.#i),this.#e=Ir(this.#e)}#B(t,r,o={}){this.#e=xu(t,this.#e);let{reverse:n,immediate:s}=this.#D(o);if(Pt(n,"reverse")&&(this.#e=Mr(r,this.#e)),this.#e=su(this.#e,this.#i),Pt(s,"immediate "))return this.#u&&(this.stop({clearCache:!1,updateValues:!1}),this.#b()),this.#e=Ir(this.#e),Promise.resolve();let i=!this.#u&&!this.#r;return i&&(this.#r=new Promise((a,c)=>{this.#P(a,c)})),i&&this.#r?this.#r:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return Oe(this.#e,"currentValue")}getInitialData(){return Oe(this.#p,"currentValue")}getFrom(){return Oe(this.#e,"fromValue")}getTo(){return Oe(this.#e,"toValue")}getFromNativeType(){return Hn(this.#e)}getToNativeType(){return jn(this.#e)}getType(){return"TWEEN"}getId(){return this.#d}isActive(){return this.#u}updateEase(t){this.#n=ka(t),this.#w=it(this.#w,{ease:t})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#a);return this.#a=r,()=>this.#a=o(this.#a)}subscribeCache(t,r){let{arrayOfCallbackUpdated:o,unsubscribeCb:n,unsubscribeCache:s}=ur(t,r,this.#h,this.#g);return this.#h=o,this.#g=s,()=>this.#h=n(this.#h)}validateInitialization({validation:t,callback:r}){let o=[...this.#o,{validation:t,callback:r}];return this.#o=o,()=>this.#o=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#f);return this.#f=r,()=>this.#f=o(this.#f)}destroy(){this.#r&&this.stop(),this.#f=[],this.#o=[],this.#a=[],this.#h=[],this.#e=[],this.#r=void 0,this.#g.forEach(t=>t()),this.#g=[]}};var lI=({each:e,duration:t,numItem:r,index:o,eachByNumItem:n})=>{if(e===1){let d=t/r,f=Se(o*d),h=Se(f+d);return{start:f,end:h}}let i=t/r*n,a=t-i,c=r-1>0?r-1:1,p=a/c*o;return{start:Se(p),end:Se(i+p)}},uI=({duration:e,numItem:t,index:r,eachByNumItem:o,type:n})=>{let i=e/t*r,c=(e-(e-i))/t*o;if(n===Do)return{start:0,end:Se(e-(i-c))};if(n===Fo){let l=(i-c)/2;return{start:Se(l),end:Se(e-l)}}return n==="end"?{start:Se(i-c),end:Se(e)}:{start:0,end:e}},ov=e=>{let t=Iy(e?.items),r=At(e),o=ao(e?.duration),n=10,s=r?.each||1,i=[...t].map((h,v)=>({item:h,start:0,end:o,index:v}));if(!wy(t))return i;r.grid?.col>t.length&&(Nt(t.length),s=1),u.checkType(Number,s)&&(s>n||s<1)&&(Ob(n),s=1);let{staggerArray:a}=Ot({arrayDefault:[...t].map(h=>({item:h})),arrayOnStop:[],stagger:r,slowlestStagger:Ge,fastestStagger:Ge}),c=a.filter(({item:h})=>u.checkType(Element,h)||u.checkType(Object,h)||u.checkType(Element,h?.deref?.()));if(c.length===0)return Pb(),i;let l=c.map(({frame:h})=>h),p=[...new Set(l)].toSorted((h,v)=>h-v),d=p.length;return c.map(({item:h,frame:v})=>{let b=p.indexOf(v),T=s*d/n,{start:S,end:_}=r.type===Lo?lI({each:s,duration:o,numItem:d,index:b,eachByNumItem:T}):r.type===Do||r.type==="end"||r.type===Fo?uI({duration:o,numItem:d,index:b,eachByNumItem:T,type:r.type}):{start:0,end:o};return{item:h,start:S,end:_,index:b}})};function pI(e){return new Ds(e)}function mI(e){return new Bs(e)}function dI(){return new Fs}function hI(e){return ov(e)}function fI(e){return new Ar(e)}function gI(e){return new zt(e)}function bI(e){return new Pr(e)}var we={};_o(we,{createAsyncTimeline:()=>vI,createSyncTimeline:()=>yI});var Q=()=>{},Wa=(...e)=>t=>e.reduce((r,o)=>r.then(o),Promise.resolve(t));var ja=({data:e,filterBy:t})=>Object.entries(e).map(r=>{let[o,n]=r,s=o in t;return{data:{[o]:n},active:s}}).filter(({active:r})=>r).map(({data:r})=>r).reduce((r,o)=>({...r,...o}),{});var mo=({timeline:e,tween:t,index:r})=>{let o=t?.getId?.(),n=t?.getInitialData?.()||{},s=e.slice(0,r).reduce((i,a)=>{let c=a.find(({data:d})=>d?.tween?.getId?.()===o);c?.data?.tween?.setImmediate?.(c?.data?.valuesTo);let l=c?.data?.tween?.getToNativeType?.(),p=l&&c?ja({data:l,filterBy:c.data.valuesTo}):{};return{...i,...p}},n);return t.setImmediate(n),s};var Iu=({mainReject:e,mainResolve:t,isStopped:r,previousSessionId:o,currentSessionId:n,isInPause:s,tween:i,stepFunction:a,action:c,addToActiveTween:l})=>{if(r()||o!==n()){e();return}let p=l(i),d=i&&i?.validateInitialization?i.validateInitialization({validation:()=>s(),callback:()=>i.pause?.()}):Q;a[c]().then(()=>t({resolve:!0})).catch(()=>{}).finally(()=>{p(),d()})};var Vs=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#S;#v;#y;#T;#k;#_;#w;#A;#R;#O;#E;#N;#P;#b;#D;#B;#I;constructor(t){this.#n=Ma(t?.repeat),this.#t=ue(t?.yoyo,"asyncTimeline: yoyo",!1),this.#i=ue(t?.freeMode,"asyncTimeline: freeMode",!1),this.#l=ue(t?.autoSet,"asyncTimeline: autoSet",!0),this.#d=ue(t?.inheritProps,"asyncTimeline: inheritProps",!0),this.#u=ue(t?.forceFromTo,"asyncTimeline: forceFromTo",!1),this.#s=[],this.#c=[],this.#r=[],this.#e=!1,this.#p={id:-1,tween:void 0,callback:()=>{},action:"",valuesFrom:{},valuesTo:{},prevValueTo:{},prevValueSettled:!1,tweenProps:{},groupProps:{},labelProps:{}},this.#a={active:!1,index:-1,isReverse:!1,callback:void 0},this.#h=1,this.#f=void 0,this.#o=0,this.#g=0,this.#m=1,this.#x=!1,this.#S=!1,this.#v=!1,this.#y=!1,this.#T=!1,this.#k=!1,this.#_=!0,this.#w=0,this.#A=0,this.#R=0,this.#O=!1,this.#E=[],this.#N=!1,this.#P=0,this.#b=[],this.#D=[],this.#B=void 0,this.#I=void 0}#F(){let t=this.#s[this.#g],r=this.#E;if(this.#E=[],!t)return;this.#s[this.#g]=t.map(i=>{let{data:a}=i,{tween:c,valuesTo:l,prevValueSettled:p}=a;if(c&&c?.getToNativeType&&!p){let d=c.getToNativeType(),f=ja({data:d,filterBy:l});return{...i,data:{...a,prevValueTo:f,prevValueSettled:!0}}}return i});let o=t.map(i=>{let{data:a}=i,{tween:c,callback:l,action:p,valuesFrom:d,valuesTo:f,tweenProps:h,id:v}=a,b={...h};delete b.delay;let{active:T,index:S}=this.#a,_=Number.isNaN(S)?!1:T&&S&&this.#g<S;_&&(b.immediate=!0),h&&"relative"in h&&h.relative&&(h.relative=!1,lb()),this.#E.push({id:v,action:p});let E=r.find(({id:w,action:I})=>w===v&&I===p),C={set:()=>(this.#y||c?.clearCurretPromise?.(),c?.[p](d,b)),goTo:()=>(this.#y||c?.clearCurretPromise?.(),c?.[p](f,b)),goFrom:()=>(this.#y||c?.clearCurretPromise?.(),c?.[p](d,b)),goFromTo:()=>(this.#y||c?.clearCurretPromise?.(),c?.[p](d,f,b)),add:()=>E?new Promise(w=>w({resolve:!0})):new Promise(w=>{if(_){w({resolve:!0});return}let I=this.getDirection();l({direction:I,loop:this.#m}),w({resolve:!0})}),addAsync:()=>{this.#k=!0;let w=this.#w;return E?new Promise(I=>I({resolve:!0})):new Promise((I,N)=>{if(_){I({resolve:!0});return}let A=this.getDirection();l({direction:A,loop:this.#m,resolve:()=>{if(w===this.#w){I({resolve:!0});return}N()}})})},createGroup:()=>new Promise(w=>w({resolve:!0})),closeGroup:()=>new Promise(w=>w({resolve:!0})),label:()=>new Promise(w=>w({resolve:!0})),suspend:()=>{if(E)return new Promise(N=>N({resolve:!0}));let w=u.checkType(Boolean,l());w||ub(l);let I=w?l():!0;return new Promise(N=>{!_&&I&&(this.#T=!0),N({resolve:!0})})}};return new Promise((w,I)=>{let N=_?!1:h?.delay,A=this.#w;if(N){let O=u.getTime();requestAnimationFrame(()=>{this.#L({start:O,deltaTimeOnpause:0,delay:N,mainReject:I,mainResolve:w,previousSessionId:A,tween:c,stepFunction:C,action:p})});return}Iu({mainReject:I,mainResolve:w,isStopped:()=>this.#_,isInPause:()=>this.#y,addToActiveTween:O=>this.#Y(O),currentSessionId:()=>this.#w,previousSessionId:A,tween:c,stepFunction:C,action:p})})}),s=this.#s[this.#g].some(i=>i.data.groupProps?.waitComplete)?"all":"race";Promise[s](o).then(()=>{if(this.#T||this.#_)return;let{active:i,index:a,isReverse:c,callback:l}=this.#a;if(l&&i&&this.#g===a-1){this.#Q(),this.#m++,l();return}if(i&&c&&this.#g===a-1&&this.reverseNext(),this.#x){this.#x=!1,this.#g=this.#s.length-this.#g-1,this.#Q(),this.#z(),this.#F();return}if(this.#g<this.#s.length-1){this.#g++,this.#F();return}if(this.#m<this.#n||this.#n===-1){if(i&&a===this.#s.length&&!this.#i){let p=this.#r.map(({tween:d})=>{let f=mo({timeline:this.#s,tween:d,index:this.#s.length});return new Promise((h,v)=>{d.set(f).then(()=>h({resolve:!0})).catch(()=>v())})});Promise.all(p).then(()=>{this.#C()}).catch(()=>{});return}this.#C();return}this.#D.forEach(({cb:p})=>p()),this.#_=!0,this.#B&&Qo.add(()=>{wt.add(()=>{this.#B?.({resolve:!0})})})}).catch(i=>{i&&console.log(i)}).finally(()=>{this.#k=!1})}#L({start:t,deltaTimeOnpause:r,delay:o,mainReject:n,mainResolve:s,previousSessionId:i,tween:a,stepFunction:c,action:l}){let p=u.getTime(),d=p-t;if(this.#y&&(r=p-this.#R),d-r>=o||this.#_||this.#x){Iu({mainReject:n,mainResolve:s,isStopped:()=>this.#_,isInPause:()=>this.#y,addToActiveTween:f=>this.#Y(f),currentSessionId:()=>this.#w,previousSessionId:i,tween:a,stepFunction:c,action:l});return}requestAnimationFrame(()=>{this.#L({start:t,deltaTimeOnpause:r,delay:o,mainReject:n,mainResolve:s,previousSessionId:i,tween:a,stepFunction:c,action:l})})}#C(){if(this.#m>0){let t=this.getDirection();this.#b.forEach(({cb:r})=>r({direction:t,loop:this.#m}))}this.#m++,this.#g=0,this.#Q(),(this.#t||this.#S)&&this.#z(),this.#S=!1,this.#F()}#Y(t){let r=t?.getId&&t.getId();if(!r)return Q;let o=this.#A;return this.#A++,this.#c.push({tween:t,uniqueId:r,id:o}),()=>{this.#c=this.#c.filter(({id:n})=>n!==o)}}#z(){this.#v=!this.#v,this.#s=this.#s.toReversed().map(t=>t.toReversed().map(r=>{let{data:o}=r,{action:n,valuesFrom:s,prevValueTo:i,valuesTo:a}=o,c=a;switch(n){case"goTo":return{...r,data:{...o,valuesTo:i,prevValueTo:c}};case"goFromTo":return{...r,data:{...o,valuesFrom:a,valuesTo:s}};case"goFrom":return this.#u||(pb(),this.stop()),{...r,data:{...o,valuesFrom:a,valuesTo:s}}}return r}))}#M(t){let r=this.#s.findIndex(o=>o[0]?.group&&o[0].group===this.#f);if(r!==-1){this.#s[r].push({group:this.#f,data:t});return}this.#s.push([{group:this.#f,data:t}])}#W(t){let r=t?.getId?.();if(this.#r.find(({id:s})=>s===r))return;let n={id:r,tween:t};this.#r.push(n)}#$(){this.#r.forEach(({tween:t})=>t.resetData())}set(t,r={},o={}){if(!As(t))return this;o.delay=Ps(o?.delay);let n=this.#d?mo({timeline:this.#s,tween:t,index:this.#s.length}):{};return this.#o++,this.#M({...this.#p,id:this.#o,tween:t,action:"set",valuesTo:{...n,...r},valuesFrom:{...n,...r},tweenProps:o,groupProps:{waitComplete:this.#e}}),this.#W(t),this}goTo(t,r={},o={}){if(!As(t))return this;o.delay=Ps(o?.delay);let n=mo({timeline:this.#s,tween:t,index:this.#s.length}),s=this.#d||this.#u?n:{};return this.#o++,this.#u?this.#M({...this.#p,id:this.#o,tween:t,action:"goFromTo",valuesFrom:{...s},valuesTo:{...s,...r},tweenProps:o??{},groupProps:{waitComplete:this.#e}}):this.#M({...this.#p,id:this.#o,tween:t,action:"goTo",valuesTo:{...s,...r},tweenProps:o??{},groupProps:{waitComplete:this.#e}}),this.#W(t),this}goFrom(t,r={},o={}){if(!As(t))return this;o.delay=Ps(o?.delay);let n=mo({timeline:this.#s,tween:t,index:this.#s.length}),s=this.#d||this.#u?n:{};return this.#o++,this.#u?this.#M({...this.#p,id:this.#o,tween:t,action:"goFromTo",valuesFrom:{...s,...r},valuesTo:{...s},tweenProps:o??{},groupProps:{waitComplete:this.#e}}):this.#M({...this.#p,id:this.#o,tween:t,action:"goFrom",valuesFrom:{...s,...r},tweenProps:o,groupProps:{waitComplete:this.#e}}),this.#W(t),this}goFromTo(t,r={},o={},n={}){if(!As(t))return this;n.delay=Ps(n?.delay);let s=this.#d?mo({timeline:this.#s,tween:t,index:this.#s.length}):{};return this.#o++,this.#M({...this.#p,id:this.#o,tween:t,action:"goFromTo",valuesFrom:{...s,...r},valuesTo:{...s,...o},tweenProps:n,groupProps:{waitComplete:this.#e}}),this.#W(t),this}add(t=Q){let r=lo(t,()=>{},"timeline add function");return this.#f?(On("add"),this):(this.#o++,this.#M({...this.#p,id:this.#o,callback:r,action:"add",groupProps:{waitComplete:this.#e}}),this)}addAsync(t){let r=Py(t);return this.#f?(On("addAsync"),this):(this.#o++,this.#M({...this.#p,id:this.#o,callback:r,action:"addAsync",groupProps:{waitComplete:this.#e}}),this)}createGroup(t={}){return this.#f?(On("createGroup"),this):(this.#o++,this.#M({...this.#p,id:this.#o,action:"createGroup",groupProps:t}),this.#e=t?.waitComplete??!1,this.#f=this.#h++,this)}closeGroup(){return this.#f=void 0,this.#o++,this.#M({...this.#p,id:this.#o,action:"closeGroup"}),this.#e=!1,this}suspend(t=()=>!0){return this.#f?(On("suspend"),this):(this.#o++,this.#M({...this.#p,id:this.#o,callback:t,action:"suspend",groupProps:{waitComplete:this.#e}}),this)}label(t={}){return this.#f?(On("label"),this):Ry(t?.name,"asyncTimeline label:")?(this.#o++,this.#M({...this.#p,id:this.#o,action:"label",labelProps:t,groupProps:{waitComplete:this.#e}}),this):this}#U(){this.#O||(this.#O=!0,this.#r.forEach(({tween:t})=>{let r=t.getInitialData();this.#o++,this.#s=[[{group:void 0,data:{...this.#p,id:this.#o,tween:t,action:"set",valuesFrom:r,valuesTo:r,groupProps:{waitComplete:this.#e}}}],...this.#s]}),this.#r.forEach(({tween:t})=>{let r=mo({timeline:this.#s,tween:t,index:this.#s.length});this.#o++,this.#s.push([{group:void 0,data:{...this.#p,id:this.#o,tween:t,action:"set",valuesFrom:r,valuesTo:r,groupProps:{waitComplete:this.#e}}}])}))}setTween(t="",r=[]){this.stop();let o=Ay(r),n=Oy(t);if(!o||!n)return Promise.reject(new Error("timeline setTween: props is wrong"));let s=new Set(r.map(c=>c?.getId?.())),i=this.#r.filter(({id:c})=>s.has(c)),a=this.#s.findIndex(c=>{let[l]=c;return l.data.labelProps?.name===t});return a===-1?(hb(t),Promise.reject(new Error(`asyncTimeline.setTween() label: ${t} not found`))):new Promise(c=>{let l=i.map(({tween:p})=>{let d=mo({timeline:this.#s,tween:p,index:a});return new Promise((f,h)=>{p.set(d).then(()=>f({resolve:!0})).catch(()=>h())})});Promise.all(l).then(()=>{c({resolve:!0})}).catch(()=>{fb()})})}#G(){this.#I&&(this.#I(u.ANIMATION_STOP_REJECT),this.#I=void 0)}async#re(){if(this.#N)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#N=!0,await u.useFps(),this.#N=!1}async playFrom(t){return await this.#re(),this.#K(t,!1)}async playFromReverse(t){return await this.#re(),this.#K(t,!0)}#K(t,r){return new Promise((o,n)=>{this.playReverse({forceYoYo:!1,resolve:o,reject:n,callback:()=>{this.#s.length===0||this.#k||(this.#v&&this.#z(),this.#g=0,this.#a={isReverse:r,active:!0,index:u.checkType(String,t)?this.#s.findIndex(s=>{let[i]=s;return i.data.labelProps?.name===t}):t,callback:void 0},u.checkType(String,t)&&Ny(this.#a.index,t),this.#F())}})})}async play(){return await this.#re(),new Promise((t,r)=>{if(this.#l&&this.#U(),this.#i){if(this.#s.length===0||this.#k)return;this.stop(),this.#_=!1,this.#v&&this.#z(),this.#w++,u.useFrameIndex(()=>{this.#I=r,this.#B=t,this.#F()},1);return}this.playReverse({forceYoYo:!1,callback:()=>{this.stop(),this.#_=!1;let o=this.#r.map(({tween:n})=>{let s=n.getInitialData();return new Promise((i,a)=>{n.set(s).then(()=>i({resolve:!0})).catch(()=>a())})});Promise.all(o).then(()=>{this.#I=r,this.#B=t,this.#F()}).catch(()=>{})}})})}async playReverse({forceYoYo:t=!0,callback:r,resolve:o=null,reject:n=null}={}){return await this.#re(),new Promise((s,i)=>{let a=o??s,c=n??i,l=t;this.#l&&this.#U(),!(this.#s.length===0||this.#k)&&(this.stop(),this.#_=!1,l&&(this.#S=!0),this.#a={active:!0,index:this.#s.length,isReverse:!1,callback:r},this.#m--,this.#w++,u.useFrameIndex(()=>{this.#B=a,this.#I=c,this.#F()},1))})}reverseNext(){this.#x=!0}stop({clearCache:t=!0}={}){this.#_=!0,this.#g=0,this.#m=1,this.#G(),this.#x=!1,this.#Q(),this.#S=!1,this.#y=!1,this.#T=!1,this.#k=!1,this.#R=0,this.#r.forEach(({tween:r})=>{r?.stop?.({clearCache:t})}),this.#v&&this.#z(),this.#v=!1,this.#i||this.#$()}pause(){this.#y||(this.#y=!0,this.#R=u.getTime(),this.#se())}resume(){if(this.#y&&(this.#y=!1,this.#R=0,this.#ee()),this.#T){if(this.#T=!1,this.#R=0,this.#g<=this.#s.length-2){this.#g++,this.#F();return}this.#g===this.#s.length-1&&(this.#g=this.#t&&!this.#v?1:0,this.#Q(),this.#t&&this.#z(),this.#m++,this.#F())}}#se(){this.#c.forEach(({tween:t})=>{t?.pause?.()})}#ee(){this.#c.forEach(({tween:t})=>{t?.resume?.()})}#Q(){this.#a={active:!1,index:-1,isReverse:!1,callback:void 0}}get(){return this.#c}isActive(){return!this.#_}isPaused(){return this.#y}isSuspended(){return this.#T}getDirection(){return this.#_?ze.NONE:this.#v?ze.BACKWARD:ze.FORWARD}onLoopEnd(t){this.#b.push({cb:t,id:this.#P});let r=this.#P;return()=>{this.#b=this.#b.filter(o=>o.id!==r)}}onComplete(t){this.#D.push({cb:t,id:this.#P});let r=this.#P;return this.#P++,()=>{this.#D=this.#D.filter(o=>o.id!==r)}}destroy(){this.#r.forEach(({tween:t})=>{t?.destroy?.()}),this.#s=[],this.#c=[],this.#D=[],this.#b=[],this.#r=[],this.#g=0,this.#a={active:!1,callback:void 0,index:-1,isReverse:!1}}};var Ws=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#S;#v;#y;#T;#k;#_;#w;#A;#R;constructor(t={}){this.#n=ao(t?.duration),this.#t=ue(t?.yoyo,"syncTimeline: yoyo",!1),this.#i=Ma(t?.repeat),this.#l=[],this.#d=0,this.#u=0,this.#s=0,this.#c=0,this.#r=0,this.#e=0,this.#p=!1,this.#a=!1,this.#h=!1,this.#f=0,this.#o=0,this.#g=10,this.#m=!0,this.#x=!1,this.#S=!1,this.#v=!1,this.#y=!1,this.#T=0,this.#k=[],this.#_=[],this.#w=[],this.#A=void 0,this.#R=void 0}#O(t,r){if(this.#m||this.#v)return;let o=!this.#i||this.#i>=2&&this.#f===this.#i-1?0:1e3/r/2;this.#y&&(this.#c=t-this.#d-this.#u-this.#e),this.#u=Math.trunc(t-this.#d-this.#c-this.#e);let n=this.#p?this.#r-(this.#u-this.#r):this.#u;if(this.#y||(this.#s=rt(n,0,this.#n),this.#x||(this.#l.forEach(i=>{i.draw({partial:this.#s,isLastDraw:!1,useFrame:!0,direction:this.getDirection()})}),this.#w.forEach(({cb:i})=>{i({time:this.#s,direction:this.getDirection()})}))),this.#x=!1,this.#o++,n<=this.#n-o&&n>=0+o&&!this.#m){this.#S=!1,this.#E();return}if(this.#F(),this.#a){this.#p=!0,this.#r=0,this.#e=0,this.#a=!1,this.#E();return}let s=this.getDirection();if(u.useNextFrame(()=>{!this.#v&&!this.#S&&this.#o>this.#g&&(this.#S=!0,this.#f++,this.#o=0,this.#k.forEach(({cb:i})=>i({direction:s,loop:this.#f})))}),!this.#i||this.#f===this.#i-1&&this.#o>this.#g){let i=this.#s;this.#l.forEach(a=>{a.draw({partial:i,isLastDraw:!0,useFrame:!0,direction:this.getDirection()})}),this.#m=!0,this.#N(),this.#d=t,this.#p&&(this.#p=!1),this.#_.forEach(({cb:a})=>a()),this.#A&&this.#A(!0);return}if(this.#t){this.reverse(),this.#E();return}if(this.#h){this.#N(),this.#d=t,this.#p||(this.#h=!this.#h),this.#u=this.#n,this.#s=this.#n,this.#c=this.#n,this.#E();return}this.#N(),this.#d=t,this.#p&&(this.#h=!this.#h),this.#E()}#E(){u.useFrame(()=>{u.useNextTick(({time:t,fps:r})=>{this.#v||this.#O(t,r)})})}#N(){this.#u=0,this.#c=0,this.#s=0,this.#r=0,this.#e=0}#P(t){let r=this.#l.reduce((o,n)=>n.getLabels().find(({name:a})=>a===t)||o,{name:"",time:0});return r||gb(t),r.time}#b(){this.#R&&(this.#R(u.ANIMATION_STOP_REJECT),this.#R=void 0)}play(t={}){this.resume();let r=t?.useCurrent;return r||this.stop(),new Promise((o,n)=>{if(!this.#v&&(this.#b(),this.#A=o,this.#R=n,!(!this.#m&&!this.#p&&r))){if(!this.#m&&this.#p&&r){this.reverse();return}this.#D()}})}playFrom(t=0){return this.resume(),this.stop(),new Promise((r,o)=>{if(this.#v)return;let s=u.checkType(Number,t)?t:this.#P(t);this.#b(),this.#A=r,this.#R=o,this.#D(s)})}#D(t=0){this.#F(),this.#N(),this.#s=t,this.#e=-this.#s,this.#h=!1,this.#o=0,this.#v=!0,this.#I(t)}playFromReverse(t){return this.resume(),this.stop(),new Promise((r,o)=>{if(this.#v)return;let s=u.checkType(Number,t)?t:this.#P(t);this.#b(),this.#A=r,this.#R=o,this.#B(s,!0)})}playReverse(t={}){this.resume();let r=t?.useCurrent;return r||this.stop(),new Promise((o,n)=>{if(!this.#v&&(this.#b(),this.#A=o,this.#R=n,!(!this.#m&&this.#p&&r))){if(!this.#m&&!this.#p&&r){this.reverse();return}this.#B(this.#n,!0)}})}#B(t=0){this.#F(),this.#u=t,this.#s=t,this.#c=t,this.#r=0,this.#e=0,this.#a=!0,this.#h=!0,this.#x=!0,this.#o=0,this.#v=!0,this.#I(t)}async#I(t){if(this.#i===0)return;let{averageFPS:r}=await u.useFps();po("sequencer",r),this.#p=!1,this.#l.forEach(o=>{o.inzializeStagger(),o.disableStagger(),o.draw({partial:t,isLastDraw:!1,useFrame:!0,direction:this.getDirection()})}),u.useFrame(()=>{u.useNextTick(({time:o,fps:n})=>{this.#d=o,this.#v=!1,this.#m=!1,this.#y=!1,this.#f=0,this.#O(o,n)})})}pause({freezeCache:t=!0}={}){if(!(this.#m||this.#y||this.#v)&&(this.#m=!1,this.#y=!0,t)){this.#l.forEach(r=>{r.freezeCachedId()});return}}resume({unFreezeCache:t=!0}={}){if(!(this.#m||!this.#y||this.#v)&&(this.#y=!1,t)){this.#l.forEach(r=>{r.unFreezeCachedId()});return}}reverse(){this.#y&&this.resume(),!(this.#m||this.#v)&&(this.#F(),this.#p=!this.#p,this.#p?this.#r=this.#u:this.#e+=this.#u-this.#s)}stop({clearCache:t=!0}={}){if(this.resume(),this.#m=!0,this.#b(),t){this.#l.forEach(r=>{r.cleanCachedId()});return}this.#l.forEach(r=>{r.draw({partial:this.#s,isLastDraw:!0,useFrame:!0,direction:this.getDirection()})})}add(t){return t.setStretchFactor(this.#n),this.#l.push(t),this}setDuration(t){return this.#n=t,this}#F(){this.#l.forEach(t=>t.resetLastValue())}isActive(){return!this.#m}isPaused(){return this.#y}getDirection(){return this.#m?ze.NONE:this.#p?ze.BACKWARD:ze.FORWARD}getTime(){return this.#s}onLoopEnd(t=()=>{}){this.#k.push({cb:t,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#k=this.#k.filter(o=>o.id!==r)}}onComplete(t=()=>{}){this.#_.push({cb:t,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#_=this.#_.filter(o=>o.id!==r)}}onUpdate(t=()=>{}){this.#w.push({cb:t,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#w=this.#w.filter(o=>o.id!==r)}}destroy(){this.stop(),this.#l.forEach(t=>t.destroy()),this.#l=[],this.#w=[],this.#k=[],this.#_=[]}};function yI(e){return new Ws(e)}function vI(e){return new Vs(e)}var qe={};_o(qe,{createParallax:()=>EI,createScrollTrigger:()=>wI});var TI=({prevValue:e,value:t,maxVal:r})=>t>=r&&e<=r&&r>=0||t<=r&&e>=r&&r<=0?y.ON_LEAVE:t>r&&e<=r&&r<=0||t<r&&e>=r&&r>=0?y.ON_ENTER_BACK:t>=0&&e<=0&&r<=0||t<=0&&e>=0&&r>=0?y.ON_LEAVE_BACK:t>0&&t<r&&e<=0&&r>=0||t<0&&e>=0&&r<=0?y.ON_ENTER:y.ON_NOOP;function nv({prevValue:e,value:t,maxVal:r,onEnter:o,onEnterBack:n,onLeave:s,onLeaveBack:i}){({[y.ON_LEAVE]:()=>{s&&s()},[y.ON_ENTER_BACK]:()=>{n&&n()},[y.ON_LEAVE_BACK]:()=>{i&&i()},[y.ON_ENTER]:()=>{o&&o()},[y.ON_NOOP]:()=>{}})[TI({prevValue:e,value:t,maxVal:r})]()}var _I=({startMarker:e,endMarker:t,label:r})=>{if(!e&&!t){let o=r.replaceAll(/^[^a-z]+|[^\w.:-]+/gi,"-"),n=document.createElement("span");n.className+=`p-marker p-marker--start  p-marker-${o}`,n.innerHTML=`start ${o}`;let s=document.createElement("span");s.className+=`p-marker p-marker--end  p-marker-${o}`,s.innerHTML=`end ${o}`,document.body.append(n),document.body.append(s);let i=document.querySelector(`.p-marker--start.p-marker-${o}`),a=document.querySelector(`.p-marker--end.p-marker-${o}`);return{lastStartMarker:i??void 0,lastEndMarkerEl:a??void 0}}return{lastStartMarker:e,lastEndMarkerEl:t}},SI=({screen:e})=>{if(e===globalThis)return{top:0,right:0,bottom:0,left:0};let t=e.getBoundingClientRect();return{top:t.top,right:document.documentElement.clientWidth-(t.left+e.offsetWidth),bottom:window.innerHeight-(t.top+e.offsetHeight),left:t.left}},xI=({startPoint:e,direction:t,invertSide:r,top:o,bottom:n,left:s,right:i})=>t===y.DIRECTION_VERTICAL?r?{right:0,width:"100vw",height:"3px",top:`${e+o}px`,padding:"0 30px",pointerEvents:"none"}:{right:0,width:"100vw",height:"3px",bottom:`${e+n}px`,padding:"0 30px",pointerEvents:"none"}:r?{top:0,height:"100vw",width:"3px",left:`${e+s}px`,padding:"30px 0",pointerEvents:"none"}:{top:0,height:"100vw",width:"3px",right:`${e+i}px`,padding:"30px 0",pointerEvents:"none"},CI=({startPoint:e,endPoint:t,direction:r,invertSide:o,top:n,bottom:s,left:i,right:a})=>r===y.DIRECTION_VERTICAL?o?{right:0,width:"100vw",height:"3px",top:`${e+t+n}px`,padding:"0 30px",pointerEvents:"none"}:{right:0,width:"100vw",height:"3px",bottom:`${e+t+s}px`,padding:"0 30px",pointerEvents:"none"}:o?{top:0,height:"100vw",width:"3px",left:`${e+t+i}px`,padding:"30px 0",pointerEvents:"none"}:{top:0,height:"100vw",width:"3px",right:`${e+t+a}px`,padding:"30px 0",pointerEvents:"none"},sv=({startMarker:e,endMarker:t,startPoint:r,endPoint:o,screen:n,direction:s,invertSide:i,label:a})=>{let{lastStartMarker:c,lastEndMarkerEl:l}=_I({startMarker:e,endMarker:t,label:a}),{top:p,right:d,bottom:f,left:h}=SI({screen:n}),v=xI({startPoint:r,direction:s,invertSide:i,top:p,bottom:f,left:h,right:d}),b=CI({startPoint:r,endPoint:o,direction:s,invertSide:i,top:p,bottom:f,left:h,right:d}),T={position:"fixed",zIndex:"99999",background:ae.get("scrollTrigger")?.markerColor?.startEnd||"#ff0000",fontSize:"14px",whiteSpace:"nowrap",textTransform:"uppercase"};return u.useFrame(()=>{Object.assign(c?.style,{...T,...v}),Object.assign(l?.style,{...T,...b})}),{startMarker:c,endMarker:l}};var iv=({marker:e,direction:t,invertSide:r})=>{if(!e)return{};let n=`3px ${ae.get("scrollTrigger")?.markerColor?.item||"#14df3b"} solid`;return t===y.DIRECTION_VERTICAL?r?{borderBottom:n}:{borderTop:n}:r?{borderRight:n}:{borderLeft:n}};var Ha=class{#n=0;#t=0;#i=0;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#S;#v;#y;#T;#k;#_;#w;#A;#R;#O;#E;#N;#P;#b;#D;#B;#I;#F;#L;#C;#Y;#z;#M;#W;#$;constructor(){this.#l=void 0,this.#d=0,this.#u=()=>0,this.#s=()=>0,this.#c=y.DIRECTION_VERTICAL,this.#r=0,this.#e=void 0,this.#p=void 0,this.#a=void 0,this.#o=void 0,this.#g=!1,this.#m=!1,this.#x=!1,this.#S=()=>{},this.#v=()=>{},this.#y=()=>{},this.#T=!0,this.#h=void 0,this.#f=globalThis,this.#M="left",this.#$=!0,this.#W=!1,this.#k=["flex","flex-shrink","flex-basis","float","display","grid-area","grid-column-start","grid-column-end","grid-row-start","grid-row-end","box-sizing","order","place-self","align-self","justify-self"],this.#_=["font-size","padding","margin","line-height","white-space"],this.#w=["text-align"],this.#A=["z-index","pointer-events"],this.#R=["transform","position","translate","rotate","scale"],this.#O=["none","static"],this.#E=!1,this.#N=0,this.#P=0,this.#b=!1,this.#D=1.5,this.#B=!1,this.#I=!1,this.#F=0,this.#L=0,this.#C=!1,this.#Y=0,this.#z=3}init(t){this.#e=t.item,this.#h=t.marker,this.#f=t.screen,this.#b=t.animatePin,this.#$=t.anticipatePinOnLoad,this.#B=t.forceTranspond,this.#l=t.invertSide,this.#c=t.direction,this.#u=t.getStart,this.#s=t.getEnd,this.#t=this.#u(),this.#d=this.#s(),this.#P=window.scrollY,this.#n=t?.scrollerHeight,this.#ue(),this.#M=this.#c===y.DIRECTION_VERTICAL?"top":"left",this.#E=!0,this.#T=!0,this.#re(),this.#se(),this.#K(),this.#U(),this.#v=u.useScrollStart(()=>{this.#E&&this.#f!==globalThis&&this.#m&&this.#o&&u.useFrame(()=>{this.#o&&(this.#o.style.transition="transform .85s cubic-bezier(0, 0.68, 0.45, 1.1)")})}),this.#S=u.useScroll(({scrollY:r})=>{if(this.#E&&this.#f!==globalThis&&this.#f!==document.documentElement){this.#c===y.DIRECTION_VERTICAL&&this.#ue();let o=r-this.#P;if(this.#P=r,this.#m&&this.#o&&this.#p){let{verticalGap:n}=this.#p.get(),s=n-o;this.#p.setData({collision:0,verticalGap:s}),u.useFrame(()=>{this.#o&&(this.#o.style.transform=`translate(0px,${s}px)`)})}}})}#U(){this.#p=new zt({data:{collision:0,verticalGap:0},config:"wobbly"}),this.#y=this.#p.subscribe(({collision:t,verticalGap:r})=>{this.#c===y.DIRECTION_VERTICAL&&this.#o?this.#o.style.transform=`translate(0px, ${t}px)`:this.#o&&(this.#o.style.transform=`translate(${t}px, ${r}px)`)})}#G(){this.#o&&this.#p&&this.#p.set({collision:0,verticalGap:0}).catch(()=>{})}#re(){this.#e||(this.#e=document.createElement("div"));let t=document.createElement("div");t.classList.add("pin-wrapper");let r=document.createElement("div");r.classList.add("pin"),t.append(r);let o=this.#e?.parentNode;o&&o.insertBefore(t,this.#e),r.append(this.#e),this.#a=this.#e.closest(".pin-wrapper"),this.#o=this.#e.closest(".pin");let n=this.#Q(),s=this.#j(),i=iv({marker:this.#h,invertSide:this.#l,direction:this.#c}),a={display:"table"};u.useFrame(()=>{!this.#o||!this.#a||(Object.assign(this.#a.style,{...i}),Object.assign(this.#o.style,{...a,...s,...n}))}),this.#oe()}#K(){if(!this.#o||!this.#a)return;let t=this.#a.offsetHeight,r=this.#a.offsetWidth;this.#a.style.height=`${t}px`,this.#a.style.width=`${r}px`,this.#o.style.height=`${t}px`,this.#o.style.width=`${r}px`}#se(){if(!this.#e)return;let t=globalThis.getComputedStyle(this.#e),r=this.#k.reduce((o,n)=>({...o,[n]:t.getPropertyValue(n)}),{});u.useFrame(()=>{this.#a&&Object.assign(this.#a.style,r)})}#ee(t,r){let o=t.parentNode;if(o)for(;o!==null&&o!==document;){let n=getComputedStyle(o);if(n[r]&&!this.#O.includes(n[r]))return{[r]:n[r]};o=o.parentNode}}#Q(){return this.#o?this.#w.map(r=>this.#ee(this.#o,r)).filter(r=>r!==null).reduce((r,o)=>({...r,...o}),{})??{}:{}}#oe(){if(this.#B){this.#W=!0;return}this.#W=this.#R.map(t=>{let r=this.#ee(this.#a,t);if(!r)return!1;let[o]=Object.keys(r),[n]=Object.values(r);return o==="position"?n==="fixed"||n==="absolute":!0}).includes(!0)}#ie(){this.#t=this.#u(),this.#d=this.#s()}#ue(){this.#ie(),this.#f!==globalThis&&(this.#t-=this.#c===y.DIRECTION_VERTICAL?Et(this.#f).top:Et(this.#f).left),this.#i=this.#l?this.#t:this.#n-this.#t,this.#r=this.#l?-Math.trunc(this.#d):Math.trunc(this.#d)}destroy(){this.#E&&(this.#p?.stop?.(),this.#y(),this.#S(),this.#v(),this.#p?.destroy?.(),this.#p=null,this.#F=0,this.#I=!1,this.#x=!1,this.#m=!1,this.#g=!1,this.#o&&this.#a&&(this.#a.parentNode?.insertBefore(this.#e,this.#a),this.#o.remove(),this.#a.remove(),this.#a=void 0,this.#o=void 0,this.#E=!1))}#ce(){return this.#a?this.#c===y.DIRECTION_VERTICAL?Et(this.#a).top-this.#i:Et(this.#a).left-this.#i:0}#fe(){let t=this.#ce();this.#be(t)}#pe(){let t=this.#l?this.#ce()-this.#d:this.#ce()+this.#d;this.#be(t)}#be(t){u.useFrame(()=>{if(!this.#o||!this.#M)return;let r=this.#o?.style??{};r[this.#M]=`${this.#i}px`}),this.#b&&!this.#T&&this.#o&&this.#p&&this.#p.goFrom({collision:t}).then(()=>{this.#ge()}).catch(()=>{})}#ge(){u.useFrame(()=>{this.#o&&(this.#o.style.transform="translate(0px, 0px)")})}#X(){this.#G(),u.useFrame(()=>{this.#o&&(this.#o.style.transition="",this.#o.style.position="relative",this.#o.style.top="",this.#o.style.left="")})}#q(){this.#G(),u.useFrame(()=>{this.#o&&(this.#o.style.transition="",this.#o.style.position="relative",this.#c===y.DIRECTION_VERTICAL?(this.#o.style.left="",this.#o.style.top=`${this.#r}px`):(this.#o.style.top="",this.#o.style.left=`${this.#r}px`))})}#J(){if(!this.#o)return;let t=this.#c===y.DIRECTION_VERTICAL?Et(this.#o).left:Et(this.#o).top,r=this.#c===y.DIRECTION_VERTICAL?"left":"top";u.useFrame(()=>{this.#o&&(this.#o.style.position="fixed",this.#o.style[r]=`${t}px`,this.#I=!0,this.#C=!0)})}#j(){if(!this.#e)return{};let t=globalThis.getComputedStyle(this.#e);return this.#A.reduce((r,o)=>({...r,[o]:t.getPropertyValue(o)}),{})}#Z(){if(!this.#e)return{};let t=globalThis.getComputedStyle(this.#e);return this.#_.reduce((r,o)=>({...r,[o]:t.getPropertyValue(o)}),{})}#te(){return this.#_.reduce((t,r)=>({...t,[r]:""}),{})}#V(){if(this.#W){let t=this.#Q(),r=this.#j(),o=this.#Z();u.useFrame(()=>{this.#o&&(Object.assign(this.#o.style,{...r,...t}),this.#e&&Object.assign(this.#e.style,o),document.body.append(this.#o))})}}#ne(){!this.#W||!this.#e||!this.#a||u.useFrame(()=>{this.#o&&(Object.assign(this.#e.style,this.#te()),this.#a?.append(this.#o))})}#me(t){let r=this.#C&&this.#Y<3?this.#L:rt(Math.abs(t-this.#N),0,250);return this.#C&&this.#Y<this.#z?this.#Y++:(this.#Y=0,this.#C=!1),this.#L=r,r*this.#D}#H(t,r){if(this.#b&&!this.#T||this.#T&&!this.#$)return{anticipateBottom:0,anticipateInnerIn:0,anticipateInnerOut:0};let o=this.#me(t),n=r===y.SCROLL_UP?0:o,s=r===y.SCROLL_UP?0:o*2,i=r===y.SCROLL_UP?o:0;return{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}}#ve(t,r){if(this.#b&&!this.#T||this.#T&&!this.#$)return{anticipateBottom:0,anticipateInnerIn:0,anticipateInnerOut:0};let o=this.#me(t),n=r===y.SCROLL_UP?o:0,s=r===y.SCROLL_UP?o*2:0,i=r===y.SCROLL_UP?0:o;return{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}}onScroll(t){if(!this.#E||!this.#a)return;if(this.#I&&this.#F<this.#z){this.#F++;return}else this.#F=0,this.#I=!1;let r=this.#N>t?y.SCROLL_UP:y.SCROLL_DOWN,o=this.#c===y.DIRECTION_VERTICAL?Et(this.#a).top:Et(this.#a).left,{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}=this.#l?this.#ve(t,r):this.#H(t,r),a=this.#l?o<this.#t-n:o>this.#n-this.#t+n,c=this.#l?o>=this.#t-s&&o<=this.#t+i+this.#d:o<=this.#n-this.#t+s&&this.#n-o<=this.#d+i+this.#t;if(a)this.#x||(this.#X(),this.#ne(),this.#x=!0,this.#m=!1,this.#g=!1);else if(c){if(!this.#m){this.#J();let l=r===y.SCROLL_DOWN&&!this.#l||r===y.SCROLL_UP&&this.#l;this.#V(),l?this.#fe():this.#pe(),this.#x=!1,this.#m=!0,this.#g=!1}}else this.#g||(this.#q(),this.#ne(),this.#x=!1,this.#m=!1,this.#g=!0);this.#N=t,this.#T=!1}};var av=()=>{console.warn("parallax prop checker: value in start or end prop with no unit misure is not allowed, failed operation, use vh in vertical mode or vw in horizontal or px")},cv=()=>{console.warn("parallax prop checker: value in start or end in vh is not allowed in horizontal mode, use vw or px")},lv=()=>{console.warn("parallax prop checker: value in start or end in vw is not allowed in vertical mode, use vh or px")};var Mu=()=>({numberVal:0,unitMisure:"",additionalVal:"",position:""}),uv=({invert:e,endValInNumber:t,scrollerHeight:r,isNegative:o,startPoint:n,isFromTopLeft:s})=>{let i=t*o-n,a=r-t*o-n;return e?s?i:a:s?a:i},pv=({invert:e,scrollerHeight:t,screenUnit:r,endValInNumber:o,isNegative:n,startPoint:s,isFromTopLeft:i})=>e?i?t-r*(100-o*n)-s:r*(100-o*n)-s:i?t-r*o*n-s:r*o*n-s,mv=({offset:e,height:t,gap:r,wScrollTop:o,wHeight:n})=>e+t>o-r&&e<o+(n+r),dv=(e,t)=>{let r=e.find(c=>[...c].some(l=>!Number.isNaN(Number.parseFloat(l)))),o=by(r);if(r&&!o)return av(),Mu();if(r&&o===y.VH&&t===y.DIRECTION_HORIZONTAL)return cv(),Mu();if(r&&o===y.VW&&t===y.DIRECTION_VERTICAL)return lv(),Mu();let n=[y.PLUS_HEIGHT,y.PLUS_HEIGHT_HALF,y.PLUS_WIDTH,y.PLUS_WIDTH_HALF,y.MINUS_HEIGHT,y.MINUS_HEIGHT_HALF,y.MINUS_WIDTH,y.MINUS_WIDTH_HALF],s=e.find(c=>du(n,c)),i=[y.POSITION_BOTTOM,y.POSITION_TOP,y.POSITION_LEFT,y.POSITION_RIGHT],a=e.find(c=>du(i,c));return{numberVal:r||0,unitMisure:o,additionalVal:s??"",position:a??y.POSITION_BOTTOM}},hv=(e,t,r)=>{let n=String(t).split(" "),{numberVal:s,unitMisure:i,additionalVal:a,position:c}=dv(n,r),p=String(s).charAt(0)==="-"?-1:1,f=Number.parseFloat(String(s).replaceAll(/^\D+/g,""))??0;return i===y.PX?{value:f*p,additionalVal:a,position:Ea(c)}:{value:e*f*p,additionalVal:a,position:Ea(c)}},fv=(e,t,r,o,n,s)=>{let a=String(t).split(" "),{numberVal:c,unitMisure:l,additionalVal:p,position:d}=dv(a,s),h=String(c).charAt(0)==="-"?-1:1,b=Number.parseFloat(String(c).replaceAll(/^\D+/g,""))??0,T=Ea(d),S=T===y.POSITION_TOP||T===y.POSITION_LEFT;return l===y.PX?{value:uv(n?{invert:!0,endValInNumber:b,scrollerHeight:o,isNegative:h,startPoint:r,isFromTopLeft:S}:{invert:!1,endValInNumber:b,scrollerHeight:o,isNegative:h,startPoint:r,isFromTopLeft:S}),additionalVal:p,position:T}:{value:pv(n?{invert:!0,scrollerHeight:o,screenUnit:e,endValInNumber:b,isNegative:h,startPoint:r,isFromTopLeft:S}:{invert:!1,scrollerHeight:o,screenUnit:e,endValInNumber:b,isNegative:h,startPoint:r,isFromTopLeft:S}),additionalVal:p,position:T}},ku=(e,t,r,o)=>{let n=String(t);return Ae(n,y.PLUS_HEIGHT_HALF)?e+r/2:Ae(n,y.PLUS_HEIGHT)?e+r:Ae(n,y.PLUS_WIDTH_HALF)?e+o/2:Ae(n,y.PLUS_WIDTH)?e+o:Ae(n,y.MINUS_HEIGHT_HALF)?e-r/2:Ae(n,y.MINUS_HEIGHT)?e-r:Ae(n,y.MINUS_WIDTH_HALF)?e-o/2:Ae(n,y.MINUS_WIDTH)?e-o:e},gv=({switchPropierties:e,isReverse:t,value:r})=>{switch(e){case y.IN_STOP:return!t&&r>0||t&&r<0?0:r;case y.IN_BACK:return!t&&r>0||t&&r<0?-r:r;case y.OUT_STOP:return!t&&r<0||t&&r>0?0:r;case y.OUT_BACK:return!t&&r<0||t&&r>0?-r:r;default:return r}},bv=(e,t)=>e===y.PROP_OPACITY?1-t:-t,Ru=({callback:e,pin:t,ease:r,useThrottle:o})=>t?u.useScrollImmediate(e):r&&o?u.useScrollThrottle(e):u.useScroll(e);var ho=class{#n=!1;#t=!1;#i=0;#l=0;#d=0;#u=0;#s=0;#c=0;#r=0;#e;#p;#a;#h;#f;#o;#g;#m;#x;#S;#v;#y;#T;#k;#_;#w;#A;#R;#O;#E;#N;#P;#b;#D;#B;#I;#F;#L;#C;#Y;#z;#M;#W;#$;#U;#G;#re;#K;#se;#ee;#Q;#oe;#ie;#ue;#ce;#fe;#pe;#be;#ge;#X;#q;#J;#j;#Z;#te;#V;#ne;#me;#H;#ve;#de;#he;#le;#Ee;#Te;#ye;#Ce;#we;#Ie;#Re;#ae;constructor(t){this.#e=window.innerWidth,this.#p=window.innerHeight,this.#a=800,this.#h=0,this.#f=()=>{},this.#o=()=>{},this.#g=()=>{},this.#m=()=>{},this.#x=()=>{},this.#S=void 0,this.#v=void 0,this.#y=void 0,this.#T=0,this.#k=!1,this.#_=void 0,this.#w=!0,this.#A=!1,this.#R=!1,this.#O=!1,this.#E=void 0,this.#N="",this.#P=0,this.#b=0,this.#D=()=>{},this.#B=()=>{},this.#M=!1,this.#I=ue(t?.pin,"Scrolltrigger pin propierties error:",!1),this.#F=ue(t?.animatePin,"Scrolltrigger animatePin propierties error:",!1),this.#L=ue(t?.forceTranspond,"Scrolltrigger forceTranspond propierties error:",!1),this.#C=ue(t?.anticipatePinOnLoad,"Scrolltrigger anticipatePinOnLoad propierties error:",!1),this.#Y=Na(t?.start,"Scrolltrigger start propierties error:","bottom 0px"),this.#z=Na(t?.end,"Scrolltrigger end propierties error:","top"),this.#W=Na(t?.marker,"Scrolltrigger marker propierties error:",void 0),this.#$=t?.dynamicStart?Tu(t.dynamicStart,"dynamicStart"):null,this.#U=t?.dynamicEnd?Tu(t.dynamicEnd,"dynamicEnd"):null,this.#G=$y(t?.dynamicRange),this.#re=ue(t?.animateAtStart,"Scrolltrigger animateAtStart propierties error:",!1),this.#K=lo(t?.onEnter,!1,"Scrolltrigger onEnter propierties error"),this.#se=lo(t?.onEnterBack,!1,"Scrolltrigger onEnterBack propierties error"),this.#ee=lo(t?.onLeave,!1,"Scrolltrigger onLeave propierties error"),this.#Q=lo(t?.onLeaveBack,!1,"Scrolltrigger onLeaveBack propierties error"),this.#oe=lo(t?.onTick,!1,"Scrolltrigger onTickCallback propierties error"),this.#ie=Dy(t?.align),this.#ue=Fy(t?.onSwitch),this.#ce=ue(t?.reverse,"Parallax reverse propierties error:",!1),this.#fe=_u(t?.opacityStart,"Parallax opacityStart propierties error:",100),this.#pe=_u(t?.opacityEnd,"Parallax opacityEnd propierties error:",0),this.#be=ue(t?.limiterOff,"Parallax|Scrolltrigger limiterOff propierties error:",!1),this.#ge=t?.useWillChange,this.#X=Ly(t?.tween);let r=this.#X?.getType&&this.#X.getType()===y.TWEEN_TIMELINE,o=this.#X?.getType&&this.#X.getType()===y.TWEEN_TWEEN;this.#q=$n(t?.item,!1),this.#J=$n(t?.scroller,!0),this.#j=$n(t?.screen,!0),this.#Z=vu(t?.trigger),this.#te=vu(t?.applyTo),this.#V=Os(t?.direction,"Parallax/Scrolltrigger"),this.#ne=ue(t?.disableForce3D,"Parallax|Scrolltrigger disableForce3D propierties error:",!1),this.#me=ue(t?.useThrottle,"Parallax|Scrolltrigger useThrottle propierties error:",!1),this.#H=By(t?.type),this.#ve=cr(t?.perspective,"Parallax|Scrolltrigger perspective propierties error:",0),this.#de=Vo(t?.breakpoint,"breakpoint","parallax/scrolltrigger"),this.#he=Wo(t?.queryType,"queryType","parallax/scrolltrigger");let{propierties:n,shouldTrackOnlyEvents:s}=Wy(t?.propierties,this.#H,o,r);this.#le=n,this.#Ee=s,this.#Te=s?"100px":Vy(t?.range,this.#H),this.#ye=ue(t?.ease,"Parallax|Scrolltrigger ease propierties error:",!1),r&&t?.easeType===y.EASE_SPRING&&oy(),this.#Ce=r?y.EASE_LERP:jy(t?.easeType),this.#we=Hy(t?.springConfig,this.#H),this.#Ie=zy(t?.lerpConfig,this.#H),this.#Re=this.#Ce===y.EASE_SPRING?{configProps:{precision:y.EASE_PRECISION}}:{precision:y.EASE_PRECISION},this.#ae=this.#Ce===y.EASE_SPRING?new zt:new Pr}init(){if(this.#n){console.warn("Parallax/scrollTrigger: The init() method cannot be launched more than once. If you are passing the instance to components like horizontalScroller or smoothScroller via the children property, they will initialize the instance.");return}this.#n=!0,this.#je(),this.#Oe(),this.#Ae(),this.#$e(),this.#Le(),this.#Fe(),this.setPerspective(),this.#le===y.PROP_TWEEN&&(this.#Te=this.#X?.getDuration?this.#X.getDuration():0,this.#G=()=>this.#Te,this.#X?.inzializeStagger?.()),this.#H==y.TYPE_SCROLLTRIGGER&&(this.#be=!0,this.#Pe(),this.#Me()),this.#ye&&(this.#g=u.useScrollStart(()=>{this.#ne||(this.#O=!0)}),this.#m=u.useScrollEnd(()=>{u.useFrame(()=>{u.useNextTick(()=>{this.#xe()})})}),this.#J===globalThis&&(this.#o=Ru({pin:this.#I,ease:this.#ye,useThrottle:this.#me,callback:()=>{this.#xe()}})),this.#xe()),this.#ye||(this.#J===globalThis&&(this.#o=Ru({pin:this.#I,ease:this.#ye,useThrottle:this.#me,callback:()=>{this.#Se(),this.#_e()}})),this.#Se(),this.#_e(),this.#m=u.useScrollEnd(()=>{this.#_e({forceRender:!0})})),this.#J!==globalThis&&this.#W&&(this.#x=u.useScroll(()=>{this.#Me()})),this.#f=u.useResize(({horizontalResize:t})=>{t&&this.refresh()}),this.#I&&(this.#E=new Ha,fe[this.#he](this.#de)&&u.useNextTick(()=>{this.#De(),this.#E?.init(this.#Ne()),this.#E?.onScroll(this.#c)}))}#Ne(){return{item:this.#q,marker:this.#W,screen:this.#j,animatePin:this.#F,anticipatePinOnLoad:this.#C,forceTranspond:this.#L,invertSide:this.#M,direction:this.#V,scrollerHeight:this.#r,getStart:()=>this.#P,getEnd:()=>this.#b}}setScroller(t){this.#J=$n(t,!0)}setScreen(t){this.#j=$n(t,!0)}setDirection(t){this.#V=Os(t,"Parallax/Scrolltrigger")}setBreakPoint(t){this.#de=Vo(t,"breakpoint","Parallax/Scrolltrigger")}setQueryType(t){this.#he=Wo(t,"queryType","Parallax/Scrolltrigger")}setPerspective(){if(this.#ve&&this.#q&&this.#q.parentNode){let t={perspective:`${this.#ve}px`,"transform-style":"preserve-3d"},r=this.#q.parentNode;Object.assign(r.style,t)}}#je(){let t=y.PROP_SCALE||y.PROP_SCALE_X||y.PROP_SCALE_Y||y.PROP_OPACITY?1:0;switch(this.#ae.setData({val:t}),this.#D=this.#ae.subscribe(({val:r})=>{r!==this.#y&&(this.#le===y.PROP_TWEEN&&this.#X?.draw?(this.#X.draw({partial:r,isLastDraw:!1,useFrame:!1}),this.#y=r,this.#w=!1):this.#ke(r),u.useNextTick(()=>{this.#oe&&this.#oe({value:r,parentIsMoving:!0})}))}),this.#B=this.#ae.onComplete(({val:r})=>{this.#O=!1,this.#le===y.PROP_TWEEN&&this.#X?.draw?this.#X.draw({partial:r,isLastDraw:!0,useFrame:!1}):this.#ke(r),u.useNextTick(()=>{this.#oe&&this.#oe({value:r,parentIsMoving:!1})})}),this.#Ce){case y.EASE_LERP:{this.#Ie&&"updateVelocity"in this.#ae&&this.#ae?.updateVelocity?.(this.#Ie);break}case y.EASE_SPRING:{this.#we&&"updateConfig"in this.#ae&&this.#ae?.updateConfig?.(this.#we);break}}}#Pe(){if(this.#G){let t=this.#G();this.#h=Number.isNaN(t)?0:Number.parseFloat(t),this.#N=y.PX}else{let t=String(this.#Te),o=t.charAt(0)==="-"?-1:1,n=Uy(t,this.#le);this.#h=Number.parseFloat(n.replaceAll(/^\D+/g,""))*o,this.#N=yy(n)}}#Me(){let t=this.#r/100;if(this.#$&&this.#$?.position&&this.#$?.value?.()!==void 0){let{position:l,value:p}=this.#$,d=p();Number.isNaN(d)||(this.#Y=`${l} ${d}px`)}let{value:r,additionalVal:o,position:n}=hv(t,this.#Y,this.#V);if(this.#M=n===y.POSITION_TOP||n===y.POSITION_LEFT,this.#P=ku(r,o,this.#V===y.DIRECTION_VERTICAL?this.#u:this.#s,this.#V===y.DIRECTION_VERTICAL?this.#s:this.#u),this.#U&&this.#U?.position&&this.#U?.value?.()!==void 0){let{position:l,value:p}=this.#U,d=p();Number.isNaN(d)||(this.#z=`${l} ${d}px`)}let{value:s,additionalVal:i,position:a}=fv(t,this.#z,this.#P,this.#r,this.#M,this.#V),c=this.#M?a===y.POSITION_BOTTOM||a===y.POSITION_RIGHT?-1:1:a===y.POSITION_BOTTOM||a===y.POSITION_RIGHT?1:-1;this.#b=ku(s,i,this.#V===y.DIRECTION_VERTICAL?this.#u*c:this.#s*c,this.#V===y.DIRECTION_VERTICAL?this.#s*c:this.#u*c),this.#He(),this.#M&&(this.#P-=this.#u)}#He(){if(this.#W){let{startMarker:t,endMarker:r}=sv({startMarker:this.#S,endMarker:this.#v,startPoint:this.#P,endPoint:this.#b,screen:this.#j,direction:this.#V,invertSide:this.#M,label:this.#W});this.#S=t,this.#v=r}}#Ae(){let t=this.#Z??this.#q;if(!t)return;let r=0,o=0,n=0;this.#Z&&(r=xo(this.#Z)?.x??0,o=xo(this.#Z)?.y??0,n=xo(this.#Z)?.z??0),t.style.transform="",this.#V===y.DIRECTION_VERTICAL?this.#i=this.#J===globalThis?Math.trunc(he(t).top):Math.trunc(he(t).top)-he(this.#J).top:this.#i=this.#J===globalThis?Math.trunc(he(t).left):Math.trunc(he(t).left)-he(this.#J).left,this.#j&&this.#j!==globalThis&&(this.#i-=this.#V===y.DIRECTION_VERTICAL?Math.trunc(he(this.#j).top):Math.trunc(Et(this.#j).left)),this.#Z&&(r!==0||o!==0||n!==0)&&(this.#Z.style.transform=`translate3D(${r}px, ${o}px, ${n}px)`)}#Oe(){this.#j===globalThis||!this.#j||(this.#l=this.#V===y.DIRECTION_VERTICAL?Math.trunc(he(this.#j).top):Math.trunc(Et(this.#j).left))}#$e(){let t=this.#Z??this.#q;t&&(this.#u=this.#V===y.DIRECTION_VERTICAL?Math.trunc(t.offsetHeight):Math.trunc(t.offsetWidth))}#Le(){let t=this.#Z??this.#q;t&&(this.#s=this.#V===y.DIRECTION_VERTICAL?Math.trunc(t.offsetWidth):Math.trunc(t.offsetHeight))}#De(){this.#J&&(this.#J===globalThis?this.#c=this.#V===y.DIRECTION_VERTICAL?this.#J.scrollY:this.#J.scrollX:this.#c=this.#V===y.DIRECTION_VERTICAL?-he(this.#J).top:-he(this.#J).left)}#Fe(){this.#j&&(this.#e=window.innerWidth,this.#p=window.innerHeight,this.#j===globalThis?this.#r=this.#V===y.DIRECTION_VERTICAL?window.innerHeight:window.innerWidth:this.#r=this.#V===y.DIRECTION_VERTICAL?Math.trunc(this.#j.offsetHeight):Math.trunc(this.#j.offsetWidth))}refresh(){this.#I&&this.#E&&this.#E.destroy(),this.#Oe(),this.#Ae(),this.#$e(),this.#Le(),this.#Fe(),this.#H==y.TYPE_SCROLLTRIGGER&&(this.#Me(),this.#G&&this.#Pe(),this.#I&&this.#E&&fe[this.#he](this.#de)&&this.#E?.init(this.#Ne())),this.#y=void 0,this.#w=!0,fe[this.#he](this.#de)?this.#ye?this.#xe():(this.#Se(),this.#_e({forceRender:!0})):(this.#ye&&this.#ae?.stop?.(),u.useFrameIndex(()=>{this.#te?(this.#Ve(this.#te),Object.assign(this.#te.style,this.#We())):(this.#Ve(this.#q),this.#q&&Object.assign(this.#q.style,this.#We()))},3))}move({value:t,parentIsMoving:r=!1}){if(!fe[this.#he](this.#de)||!t)return;this.#R=!0;let o=this.#ze(t);if(this.#ye)this.#xe(o);else{this.#Se(o);let n=this.#A||this.#w||void 0;this.#_e({forceRender:n,parentIsMoving:r})}}triggerScrollStart(){this.#ye&&(this.#ne||(this.#O=!0))}triggerScrollEnd(){this.#ye||this.#_e({forceRender:!0})}#ze(t){if(t!==void 0)return this.#j!==globalThis?t+this.#l:t}stopMotion(){this.#ae?.stop?.()}#Se(t){if(!fe[this.#he](this.#de)||(t?this.#c=-t:this.#De(),this.#A=mv({offset:this.#i,height:this.#u,gap:this.#a,wScrollTop:this.#c,wHeight:this.#r}),!this.#A&&!this.#be&&this.#H===y.TYPE_PARALLAX))return;this.#I&&this.#E&&this.#E.onScroll(this.#c),this.#H===y.TYPE_SCROLLTRIGGER?this.#d=Se(this.#Ue()):this.#le===y.PROP_OPACITY?this.#d=Se(this.#qe()):this.#d=Number.isNaN(Number.parseInt(this.#ie))?Se(this.#Je()/2):Se(this.#Ye()/2);let r=this.#ce&&this.#H!==y.TYPE_SCROLLTRIGGER?bv(this.#le,this.#d):this.#d;this.#d=this.#H===y.TYPE_SCROLLTRIGGER?r:this.#Xe(r)}#xe(t){if(!fe[this.#he](this.#de)||(this.#Se(t),!this.#k&&!this.#w&&this.#H===y.TYPE_SCROLLTRIGGER)||!this.#A&&!this.#w&&this.#H===y.TYPE_PARALLAX)return;let r=this.#w&&!this.#re?"set":"goTo";this.#ae&&this.#ae[r]({val:this.#d},this.#Re).catch(()=>{})}#_e({forceRender:t=!1,parentIsMoving:r=!1}={}){fe[this.#he](this.#de)&&u.useFrame(()=>{this.#d===this.#y&&!t||!this.#A&&!t||(!this.#ne&&!this.#R&&(this.#O=!t),!this.#ne&&this.#R&&(this.#O=r&&this.#A),this.#le===y.PROP_TWEEN?(this.#X.draw({partial:this.#d,isLastDraw:!this.#O,useFrame:!1}),this.#y=this.#d,this.#w=!1):this.#ke(this.#d),u.useNextTick(()=>{this.#oe&&this.#oe({value:this.#d,parentIsMoving:this.#O})}))})}#Ue(){let t=this.#M?-(this.#c+this.#P+this.#b-(this.#i+this.#b)):-(this.#c+this.#r-this.#P-(this.#i+this.#b)),r=this.#b/100*this.#h,o=t/100*this.#h,n=this.#ce?this.#M?r-o:o:this.#M?o:r-o,s=r>0?-rt(n,0,r):-rt(n,r,0);if(this.#k=this.#_!==s,this.#_=s,!this.#k&&!this.#w)return this.#d;let i=s*100/this.#b;switch((this.#K||this.#se||this.#ee||this.#Q)&&nv({prevValue:this.#T,value:n,maxVal:r,onEnter:this.#K,onEnterBack:this.#se,onLeave:this.#ee,onLeaveBack:this.#Q}),this.#T=n,this.#le){case y.PROP_HORIZONTAL:case y.PROP_VERTICAL:return this.#Ge(i);case y.PROP_SCALE:case y.PROP_SCALE_X:case y.PROP_SCALE_Y:case y.PROP_OPACITY:return 1-i;default:return-i}}#Ge(t){switch(this.#N){case y.VW:return this.#e/100*-t;case y.VH:return this.#p/100*-t;case y.WPERCENT:return this.#V===y.DIRECTION_VERTICAL?this.#s/100*-t:this.#u/100*-t;case y.HPERCENT:return this.#V===y.DIRECTION_VERTICAL?this.#u/100*-t:this.#s/100*-t;default:return-t}}#qe(){let t=this.#r/100*this.#pe,r=this.#r-this.#r/100*this.#fe,o=this.#ie==y.ALIGN_START?-this.#c*-1:(this.#c+t-this.#i)*-1,n=this.#ie==y.ALIGN_START?1-o/this.#i:1-o/(this.#r-r-t);return rt(n,0,1)}#Je(){let t=Number(this.#Te),r=Number.isNaN(t)?0:t,o=this.#V===y.DIRECTION_VERTICAL?document.documentElement.scrollHeight:document.documentElement.scrollWidth;switch(this.#ie){case y.ALIGN_START:return(this.#c+this.#l)/r;case y.ALIGN_TOP:case y.ALIGN_LEFT:return(this.#c-this.#i)/r;case y.ALIGN_CENTER:return(this.#c+(this.#r/2-this.#u/2)-this.#i)/r;case y.ALIGN_BOTTOM:case y.ALIGN_RIGHT:return(this.#c+(this.#r-this.#u)-this.#i)/r;case y.ALIGN_END:return-(o-(this.#c+this.#r))/r;default:return 0}}#Ye(){let t=Number(this.#ie),r=Number(this.#Te);return(this.#c+this.#r/100*t-this.#i)/r}#Xe(t){return gv({switchPropierties:this.#ue,isReverse:this.#ce,value:t})}#ke(t){this.#te?Object.assign(this.#te.style,this.#Be(t)):this.#q&&Object.assign(this.#q.style,this.#Be(t)),this.#y=t,this.#w=!1}#Be(t){if(this.#Ee)return;let r=this.#O?"translate3D(0px, 0px, 0px)":"";this.#t=this.#ge?u.mustMakeSomething():!1;let o=this.#t&&this.#O?"transform":"",n=u.shouldMakeSomething()?Math.round(t):t;switch(this.#le){case y.PROP_VERTICAL:return{transform:`${r} translateY(${n}px)`,willChange:o};case y.PROP_HORIZONTAL:return{transform:`${r} translateX(${n}px)`,willChange:o};case y.PROP_ROTATE:return{transform:`${r} rotate(${n}deg)`,willChange:o};case y.PROP_ROTATEY:return{transform:`${r} rotateY(${n}deg)`,willChange:o};case y.PROP_ROTATEX:return{transform:`${r} rotateX(${n}deg)`,willChange:o};case y.PROP_ROTATEZ:return{transform:`${r} rotateZ(${n}deg)`,willChange:o};case y.PROP_OPACITY:return{opacity:`${t}`};case y.PROP_SCALE:{let s=this.#H===y.TYPE_SCROLLTRIGGER?t:1+t/1e3;return{transform:`${r} scale(${s})`,willChange:o}}case y.PROP_SCALE_X:{let s=this.#H===y.TYPE_SCROLLTRIGGER?t:1+t/1e3;return{transform:`${r} scaleX(${s})`,willChange:o}}case y.PROP_SCALE_Y:{let s=this.#H===y.TYPE_SCROLLTRIGGER?t:1+t/1e3;return{transform:`${r} scaleY(${s})`,willChange:o}}default:return{[this.#le.toLowerCase()]:`${t}px`}}}#Ve(t){this.#X&&t&&(t.style="")}#We(){if(!this.#Ee)switch(this.#le){case y.PROP_VERTICAL:case y.PROP_HORIZONTAL:case y.PROP_ROTATE:case y.PROP_ROTATEY:case y.PROP_ROTATEX:case y.PROP_ROTATEZ:case y.PROP_SCALE:return{transform:""};case y.PROP_OPACITY:return{opacity:""};default:return{[this.#le.toLowerCase()]:""}}}destroy(){this.#ae?.stop?.(),this.#o(),this.#g(),this.#m(),this.#f(),this.#D(),this.#B(),this.#x(),this.#ae?.destroy?.(),this.#ae=null,this.#G=()=>{},this.#$?.value&&(this.#$.value=()=>0),this.#U?.value&&(this.#U.value=()=>0),this.#K=()=>{},this.#se=()=>{},this.#ee=()=>{},this.#Q=()=>{},this.#oe=()=>{},this.#I&&this.#E&&this.#E?.destroy?.(),this.#S&&this.#S?.remove?.(),this.#v&&this.#v?.remove?.(),this.#S=void 0,this.#v=void 0,this.#E=void 0,this.#d=0;let t=this.#te??this.#q;t&&"style"in t&&(t.style=""),this.#q=null,this.#J=null,this.#j=null,this.#Z=null,this.#te=null}};function EI(e){return new ho({...e,type:y.TYPE_PARALLAX})}function wI(e){return new ho({...e,type:y.TYPE_SCROLLTRIGGER})}var Nu=window.innerHeight,Pu=document.body.offsetHeight,fo=!1,Au=!0,Ut=window.scrollY,js=!0,Gt=!1,Ou=()=>{},$u=()=>{},Ua=()=>{},za,yv=()=>{document.body.classList.remove("is-whelling")},II=()=>{document.body.classList.add("is-whelling")};ce.setDefault({usePassive:!1});var MI=({velocity:e,rootElement:t})=>{let r=z.createLerp({data:{scrollValue:window.scrollY},precision:1,velocity:.1});za=t;let o=r.subscribe(({scrollValue:d})=>{Gt||window.scrollTo({top:Math.round(d),left:0,behavior:"instant"})});r.onComplete(()=>{Ut=window.scrollY});let n=u.useMouseWheel(d=>{if(Gt)return;d.preventDefault(),js=!1,II();let f=d.spinY??0,h=ce.clamp(f*e+Ut,0,Pu-Nu);Ut=h,r.goTo({scrollValue:h}).catch(()=>{})}),s=u.useMouseWheel(({preventDefault:d})=>{Au&&d()}),i=u.useMouseWheel(u.debounce(()=>{yv()},500)),a=u.useScrollEnd(()=>{let d=window.scrollY;Ut=d,r.setImmediate({scrollValue:d})}),c=u.useScroll(()=>{if(!js)return;let d=window.scrollY;Ut=d,r.setImmediate({scrollValue:d})}),l=u.usePointerDown(()=>{Gt||(yv(),r.stop(),Ut=window.scrollY,js=!0)}),p=new ResizeObserver(()=>{r.stop(),r.setImmediate({scrollValue:window.scrollY}),Ut=window.scrollY,Nu=window.innerHeight,Pu=document.body.offsetHeight});return p.observe(t),{destroy:()=>{fo=!1,Ut=0,js=!0,Gt=!1,za&&(p.unobserve(za),p.disconnect()),r?.stop(),r?.destroy(),r=null,za=null,o(),c(),a(),n(),l(),i(),s(),Ou=()=>{},$u=()=>{},Ua=()=>{}},stop:()=>{r.stop(),Ut=window.scrollY},update:()=>{r.setImmediate({scrollValue:window.scrollY})}}},Ga=({velocity:e=100,rootElement:t=document.createElement("div")}={})=>{fo||(Ut=window.scrollY,fo=!0,Gt=!1,Nu=window.innerHeight,Pu=document.body.offsetHeight,Au=!0,js=!1,{destroy:Ou,stop:$u,update:Ua}=MI({velocity:e,rootElement:t}))},pr=()=>{!fo||Gt||($u(),Gt=!0)},qt=()=>{!fo||!Gt||(Gt=!1)},Hs=()=>{!fo||!Gt||(Ua(),Ut=window.scrollY,Gt=!1)},Lu=()=>{fo&&Ua()},Du=()=>{Ou()},vv=()=>{Au=!0};var Tv=()=>fo;var _v="easeOutQuad",zs=new Ar({ease:_v,data:{val:0}}),qa=!1,Fu=!1;zs.subscribe(({val:e})=>{window.scrollTo({top:e,left:0,behavior:"auto"}),Lu()});var Bu=()=>{Fu&&(document.body.style.overflow=""),zs?.updateEase?.(_v),Hs()},Vu=()=>{qa&&(zs.stop(),Bu())};u.useMouseWheel(()=>{Vu()});u.useMouseDown(()=>{Vu()});u.useTouchStart(()=>{Vu()});var Or={to:(t,r)=>{if(typeof globalThis>"u")return;let o=t?Uc(t)||u.checkType(Number,t)?Uc(t)?he(t).top:t:(console.warn(`bodyScroll ${t} is not valid target, must be a node or a number`),0):0,n=cr(r?.duration,"bodyScroll: duration",500);return Fu=ue(r?.overflow,"bodyScroll: overflow",!1),Ra(r?.ease)&&zs?.updateEase?.(r?.ease),Fu&&(document.body.style.overflow="hidden"),new Promise(s=>{qa=!0,pr(),zs.goFromTo({val:window.scrollY},{val:o},{duration:n}).then(()=>{Bu(),qa=!1,s(!0)}).catch(()=>{Bu(),qa=!1,s(!0)})})}};var Us={END:"END",START:"START",CENTER:"CENTER"};var kI=e=>{switch(e){case Us.END:return"align-items:flex-end;";case Us.CENTER:return"align-items:center;";default:return"align-items:flex-start;"}},Sv=({mainContainer:e,queryType:t,breakpoint:r,container:o,trigger:n,row:s,column:i,shadow:a,useSticky:c,columnHeight:l,columnWidth:p,columnAlign:d})=>{let f=fe.getBreackpoint(r),h="user-select:none",v=c?"relative":"absolute",b=c?"position:sticky;top:0;":"",T=kI(d),S=p?`width:${p}vw;`:"",_=`
      @media (${t}-width:${f}px){${o}{position:relative;${h}}}@media (${t}-width:${f}px){${n}{z-index:10;position:${v};pointer-events:none;overflow:hidden;top:0;left:0;right:0}}@media (${t}-width:${f}px){${s}{--sectionheight:${l}vh}}@media (${t}-width:${f}px){${s}{display:flex;height:100vh;${b}${T}}}@media (${t}-width:${f}px){${i}{height:var(--sectionheight);flex:0 0 auto;${S}}}.${a}{display:none}@media (${t}-width:${f}px){.${a}{width:100%;display:block;pointer-events:none}}.${a}{display:none}@media (${t}-width:${f}px){.${a}{pointer-events:none;display:block;position:absolute;left:0;right:0}.${a}--end,.${a}--in-center,.${a}--left,.${a}--out-center{opacity:0;border:1px red dashed;width:25%}.${a}--end.debug,.${a}--in-center.debug,.${a}--left.debug,.${a}--out-center.debug{opacity:1}.${a}--in-center{position:absolute;top:0;right:0;padding:0 40px;text-align:center}.${a}--out-center{position:absolute;top:0;right:0;padding:0 40px;text-align:center}.${a}--left{position:absolute;top:0;left:50%;transform:translateX(-50%);padding:0 40px;text-align:center}.${a}--end{position:absolute;top:0;left:0;padding-left:40px}}`,E=document.createElement("div");E.classList.add("scroller-style");let C=document.createElement("style");C.append(document.createTextNode(_)),E.append(C),e.prepend(E)};var Gs=class{#n=!0;#t=0;#i=!1;#l=0;#d=100;#u=100;#s=!1;#c=0;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#S;#v;#y;#T;#k;#_;#w;#A;#R;#O;#E;#N;#P;#b;#D;#B;#I;#F;#L;#C;#Y;#z;#M;#W;#$;#U;#G;#re;#K;#se;#ee;#Q;#oe;#ie;#ue;#ce;#fe;#pe;constructor(t){this.#r=()=>{},this.#pe=0,this.#F=t?.container??"",this.#W=[],this.#$=!1,this.#U=0,this.#G={},this.#re=0,this.#K=t?.children||[],this.#e=ue(t?.useDrag,"HorizontalScroller: useDrag",!1),this.#p=cr(t?.threshold,"HorizontalScroller: threshold",30),this.#a=ue(t?.useWillChange,"HorizontalScroller: useWillChange",!1),this.#h=Vo(t?.breakpoint,"breakpoint","horizontalScroller"),this.#f=Wo(t?.queryType,"queryType","horizontalScroller"),this.#o=ue(t?.forceTranspond,"HorizontalScroller: forceTranspond",!1),this.#g=ue(t?.addCss,"HorizontalScroller: addCss",!0),this.#m=ue(t?.animateAtStart,"HorizontalScroller: animateAtStart",!1),this.#x=ue(t?.ease,"HorizontalScroller: ease",!1),this.#S=Oa(t?.easeType??"","HorizontalScroller"),this.#v=ue(t?.useSticky,"HorizontalScroller: useSticky",!1),this.#y=ue(t?.animatePin,"HorizontalScroller: animatePin",!1),this.#T=ue(t?.reverse,"HorizontalScroller: reverse",!1),this.#k=ue(t?.useThrottle,"HorizontalScroller: useThrottle",!1),this.#_=cr(t?.columnHeight,"HorizontalScroller: columnHeight",100),this.#w=cr(t?.columnWidth,"HorizontalScroller: columnWidth",null),this.#A=t?.columnAlign?t.columnAlign.toUpperCase():Us.START,this.#R=at(t?.onEnter,"HorizontalScroller: onEnter",Q),this.#O=at(t?.onEnterBack,"HorizontalScroller: onEnterBack",Q),this.#E=at(t?.onLeave,"HorizontalScroller: onLeave",Q),this.#N=at(t?.onLeaveBack,"HorizontalScroller: onLeaveBack",Q),this.#P=at(t?.afterInit,"HorizontalScroller: afterInit",Q),this.#b=at(t?.afterRefresh,"HorizontalScroller: afterRefresh",Q),this.#D=at(t?.afterDestroy,"HorizontalScroller: afterDestroy",Q),this.#B=at(t?.onTick,"HorizontalScroller: onTick",void 0),this.#I=u.checkType(String,t.root)?document.querySelector(t.root):t.root,this.#I||(this.#n=!1,console.warn("horizontal custom: root node not found")),this.#I.querySelector(this.#F)||(this.#n=!1,console.warn("horizontal custom: container node not found")),this.#L=this.#I.querySelector(t.trigger),this.#L||(this.#n=!1,console.warn("horizontal custom: trigger node not found")),this.#C=this.#I.querySelector(t.row),this.#C||(this.#n=!1,console.warn("horizontal custom: row node not found")),this.#Y=this.#I.querySelectorAll(t.column),this.#Y.length===0&&(this.#n=!1,console.warn("horizontal custom: column nodeList not found")),this.#z=this.#I.querySelectorAll("[data-shadow]");let o=t?.shadowClass||"shadow";this.#M=o.replace(".",""),this.#W=this.#C.querySelectorAll("a, button"),this.#K.forEach(n=>{this.#C&&n.setScroller(this.#C),n.setDirection("horizontal"),n.setBreakPoint(this.#h),n.setQueryType(this.#f),n.init()}),this.#g&&Sv({mainContainer:this.#I,queryType:this.#f,breakpoint:this.#h,container:this.#F,trigger:t?.trigger??"trigger",row:t.row,column:t.column,shadow:this.#M,useSticky:this.#v,columnHeight:this.#_,columnWidth:this.#w,columnAlign:this.#A}),this.#se=n=>{if(!this.#i)return;let{movementX:s}=n,i=this.#T?s:-s;this.#X(i)},this.#ee=()=>{fe[this.#f](this.#h)&&(pr(),this.#s&&this.#C&&(this.#C.style.cursor="move"),this.#i=!0,this.#pe=this.#c)},this.#Q=()=>{qt(),this.#i=!1,u.useFrame(()=>{this.#C&&(this.#C.style.cursor="")})},this.#oe=()=>{qt(),this.#i=!1,u.useFrame(()=>{this.#C&&(this.#C.style.cursor="")})},this.#ie=n=>{fe[this.#f](this.#h)&&(pr(),this.#l=-n.touches[0].clientX,this.#i=!0,this.#pe=this.#c)},this.#ue=()=>{qt(),this.#i=!1},this.#ce=n=>{let s=-n.touches[0].clientX,i=this.#T?-s+this.#l:s-this.#l;this.#X(i),this.#l=s,this.#s&&n.cancelable&&n.defaultPrevented&&n.preventDefault()},this.#fe=n=>{Math.abs(this.#c-this.#pe)>this.#p&&n.preventDefault()}}init(){this.#n&&Wa(this.#te.bind(this),this.#Z.bind(this),this.#V.bind(this),this.#me.bind(this))().then(()=>{this.#H(),this.#e&&this.#J(),u.useResize(({horizontalResize:t})=>this.onResize(t)),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#P?.(),this.#K.forEach(t=>{t.refresh()})})},3)})}#be(){[...this.#W].forEach(t=>t.setAttribute("draggable","false"))}#ge(){[...this.#W].forEach(t=>t.removeAttribute("draggable"))}#X(t){this.#s&&u.useFrame(()=>window.scrollBy({top:t,left:0,behavior:"instant"}))}#q(){let t=window.scrollY;this.#s=this.#t-this.#u<t&&this.#t+this.#d+this.#U>t+window.innerHeight}#J(){this.#r=u.useScroll(()=>this.#q()),this.#q(),this.#C.addEventListener("click",this.#fe,{passive:!1}),this.#C.addEventListener("mousedown",this.#ee,{passive:!0}),this.#C.addEventListener("mouseup",this.#Q,{passive:!0}),this.#C.addEventListener("mouseleave",this.#oe,{passive:!0}),this.#C.addEventListener("touchstart",this.#ie,{passive:!0}),this.#C.addEventListener("touchend",this.#ue,{passive:!0}),this.#C.addEventListener("mousemove",this.#se,{passive:!0}),this.#C.addEventListener("touchmove",this.#ce,{passive:!0})}#j(){this.#r(),this.#C.removeEventListener("click",this.#fe),this.#C.removeEventListener("mousedown",this.#ee),this.#C.removeEventListener("mouseup",this.#Q),this.#C.removeEventListener("mouseleave",this.#oe),this.#C.removeEventListener("touchstart",this.#ie),this.#C.removeEventListener("touchend",this.#ue),this.#C.removeEventListener("mousemove",this.#se),this.#C.removeEventListener("touchmove",this.#ce)}#Z(){return!this.#L||!this.#I||!this.#C?new Promise(t=>{t(!0)}):new Promise(t=>{u.useFrame(()=>{let r=this.#U;this.#re=100*(r-window.innerWidth)/r,r>0&&(this.#L.style.height=`${r}px`,this.#I.style.height=`${r}px`,this.#C.style.width=`${r}px`),t(!0)})})}#te(){return new Promise(t=>{u.useFrame(()=>{if(!fe[this.#f](this.#h)){t(!0);return}this.#U=[...this.#Y].map(r=>Fe(r)).reduce((r,o)=>r+o,0),t(!0)})})}#V(){return this.#L?new Promise(t=>{u.useFrame(()=>{if(!fe[this.#f](this.#h)||!this.#z){t(!0);return}let r=[...this.#z].map(o=>{let n=o.dataset.shadow,s=Object.hasOwn(o.dataset,"debug"),i=s?"debug":"",a=s?`left left : ${n}`:"",c=s?`in center : ${n}`:"",l=s?`center out : ${n}`:"",p=s?`in out : ${n}`:"";return` <div
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
                        </div>`}).join("");this.#L.innerHTML=r,t(!0)})}):new Promise(t=>{t(!0)})}#ne(){this.#L&&(this.#L.innerHTML="")}#me(){return new Promise(t=>{if(!fe[this.#f](this.#h)){t(!0);return}u.useFrame(()=>{this.#z&&([...this.#z].forEach(r=>{let o=this.#re/100,n=r.dataset.shadow,s=Fe(r),i=ne(this.#C),a=xo(this.#C)?.x??0,c=this.#T?this.#U-(r.getBoundingClientRect().right-a):r.getBoundingClientRect().left-a,l=window.innerWidth/window.innerHeight,p=window.innerWidth-window.innerHeight,d=c/l,f=c-c/l,h=this.#I.querySelector(`.${this.#M}[data-shadow="${n}"]`),v=h?.querySelector(`.${this.#M}--in-center`),b=h?.querySelector(`.${this.#M}--out-center`),T=h?.querySelector(`.${this.#M}--left`),S=h?.querySelector(`.${this.#M}--end`),_=window.innerWidth>window.innerHeight?window.innerHeight:0,E=window.innerWidth>window.innerHeight?window.innerHeight/2:0,C=c===0?0:d+f/o-p/o,w=(()=>{let A=window.innerWidth>window.innerHeight?p/o:p/o+window.innerWidth/l;return c===0?0:A})(),I=(()=>{let A=s/l,O=(s-s/l)/o;return A+O+w})(),N=I/2+E;this.#v&&(this.#L.style["margin-top"]=`-${i}px`),h&&(h.style.top=`${C}px`),v&&(v.style.height=`${N}px`),b&&(b.style.height=`${N}px`),b&&(b.style.top=`${N}px`),T&&(T.style.height=`${w}px`),S&&(S.style.height=`${I+_}px`),h&&(h.style.height=`${w}px`)}),t(!0))})})}#H(){if(!this.#L||!fe[this.#f](this.#h))return;let t=new ho({type:"scrolltrigger",item:this.#C,useWillChange:this.#a,trigger:this.#L,propierties:"x",breakpoint:"xSmall",pin:!this.#v,animatePin:this.#y,ease:this.#x,forceTranspond:this.#o,useThrottle:this.#k,easeType:this.#S,springConfig:"scroller",animateAtStart:this.#m,reverse:this.#T,dynamicRange:()=>-(this.#U-window.innerWidth),dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>this.#U},onTick:({value:r,parentIsMoving:o})=>{let n=r??0,s=Math.abs(-Math.round(n*100/(this.#U-window.innerWidth)));this.#c=n,this.#B&&this.#B({value:n,parentIsMoving:o,percent:this.#T?100-s:s}),this.#K.forEach(i=>{i.move({value:n,parentIsMoving:o})})},onEnter:this.#R,onEnterBack:this.#O,onLeave:this.#E,onLeaveBack:this.#N});t.init(),this.#$=!0,this.#G=t,this.#t=he(this.#L).top,this.#be()}#ve(){Wa(this.#te.bind(this),this.#Z.bind(this),this.#V.bind(this),this.#me.bind(this))().then(()=>{this.#H(),this.#de()})}#de(){u.useFrameIndex(()=>{u.useNextTick(()=>{this.#b?.(),this.#K.forEach(t=>{t?.refresh?.()})})},3)}refresh(){return!this.#$||!fe[this.#f](this.#h)?new Promise(t=>t(!0)):new Promise(t=>{Wa(this.#te.bind(this),this.#Z.bind(this),this.#me.bind(this))().then(()=>{this.#G?.stopMotion?.(),this.#t=he(this.#L).top,this.#$&&(this.#G?.refresh?.(),this.#de()),t(!0)})})}#he({destroyAll:t=!1}){(this.#$||t)&&(this.#G?.destroy?.(),this.#G=null,this.#L&&(this.#L.style.height=""),this.#I&&(this.#I.style.height=""),this.#L&&(this.#L.style.marginTop=""),this.#ne(),this.#ge(),this.#$=!1,u.useFrameIndex(()=>{if(this.#C&&(this.#C.style.width="",this.#C.style.transform=""),t&&this.#I){this.#e&&this.#j();let r=this.#I.querySelector(".scroller-style");r&&r.remove(),this.#I=null,this.#L=null,this.#C=null,this.#Y=[],this.#z=[],this.#P=Q,this.#b=Q,this.#B=Q,this.#R=Q,this.#O=Q,this.#E=Q,this.#N=Q,this.#G=null,this.#$=!1,this.#W=[],this.#I=null,this.#F=null,this.#L=null,this.#C=null,u.useNextTick(()=>{this.#D?.(),this.#D=Q,this.#K.forEach(o=>{o?.destroy?.(),o=null}),this.#K=[]})}},3))}onResize(t){this.#$&&fe[this.#f](this.#h)?t&&this.refresh():!this.#$&&fe[this.#f](this.#h)?this.#ve():this.#$&&!fe[this.#f](this.#h)&&this.#he({destroyAll:!1})}destroy(){this.#he({destroyAll:!0})}};var qs=new Map,Ja=e=>{let t=u.checkType(Element,e);return t||console.warn(`slide utils ${e} is not a valid Dom element`),t},RI=e=>{let t=new Ar({ease:"easeOutQuad",data:{val:0}});return{tween:t,unsubscribe:t.subscribe(({val:r})=>{e.style.height=`${r}px`})}},$r={subscribe:n=>{if(!Ja(n))return()=>{};if(qs.has(n))return console.warn(`slide utils ${n} is alredysubscribed`),()=>{};let i=RI(n);return qs.set(n,i),()=>{i.unsubscribe();let{tween:a}=i;a.destroy(),qs.delete(n)}},reset:n=>{Ja(n)&&(n.style.height="0",n.style.overflow="hidden")},up:async n=>{if(!Ja(n))return new Promise(c=>c(!0));let s=qs.get(n);if(!s)return console.warn("slide element not exist in slide store"),new Promise(c=>c(!0));let{tween:i}=s,a=ne(n);await i.goFromTo({val:a},{val:0},{duration:500})},down:async n=>{if(!Ja(n))return new Promise(l=>l(!0));let s=qs.get(n);if(!s)return console.warn("slide element not exist in slide store"),new Promise(l=>l(!0));let{tween:i}=s,{val:a}=i.get();n.style.height="auto";let c=ne(n);n.style.height=`${a}px`,await i.goTo({val:c},{duration:500}),u.useNextTick(()=>{n.style.height="auto"})}};var xt=class{#n=!0;#t=0;#i=0;#l=0;#d=0;#u=0;#s=30;#c=0;#r=!1;#e=0;#p=0;#a;#h;#f;#o;#g;#m;#x;#S;#v;#y;#T;#k;#_;#w;#A;#R;#O;#E;#N;#P;#b;#D;#B;#I;#F;#L;#C;#Y;#z;#M;#W=!1;#$;#U;#G;#re=0;#K=0;#se;#ee;#Q;constructor(t){this.#a=Q,this.#h=Q,this.#f=Q,this.#o=Q,this.#g=Q,this.#m=Q,this.#x=Q,this.#S=Q,this.#v=Q,this.#y=Q,this.#T=Q,this.#k=Q,this.#_={},this.#w=Q,this.#A=Q,this.#R=Os(t?.direction,"SmoothScroller"),this.#O=!1,this.#E=Oa(t?.easeType??"","SmoothScroller"),this.#N=Vo(t?.breakpoint,"breakpoint","SmoothScroller"),this.#P=Wo(t?.queryType,"queryType","SmoothScroller"),this.#b=u.checkType(String,t?.scroller)?document.querySelector(t.scroller):t.scroller,this.#b||(console.warn("SmoothScroller: scroller node not found"),this.#n=!1),this.#D=t?.screen?u.checkType(String,t.screen)?document.querySelector(t.screen):t.screen:document.documentElement,this.#D||(this.#n=!1,console.warn("SmoothScroller: screen node not found")),this.#B=ue(t?.scopedEvent,"SmoothScroller: scopedEvent",!1),this.#I=cr(t?.speed,"SmoothScroller: speed",60),this.#F=ue(t?.drag,"SmoothScroller: drag",!1),this.#L=at(t?.onTick,"SmoothScroller: onTick",Q),this.#C=at(t?.onUpdate,"SmoothScroller: onUpdate",Q),this.#Y=at(t?.onSwipe,"SmoothScroller: onSwipe",Q),this.#ee=ue(t?.useSwipe,"SmoothScroller: useSwipe",!1),this.#Q=ue(t?.revertSwipeDirection,"SmoothScroller: revertSwipeDirection",!1),this.#se=ue(t?.useHorizontalScroll,"SmoothScroller: useBothAxis",!1),this.#z=at(t?.afterRefresh,"SmoothScroller: afterRefresh",Q),this.#M=at(t?.afterInit,"SmoothScroller: afterInit",Q),this.#$=t?.children||[],this.#$.forEach(r=>{r.setScroller(this.#b),r.setDirection(this.#R),r.setScreen(this.#D),r.setBreakPoint(this.#N),r.setQueryType(this.#P),r.init()}),this.#U=r=>{this.#ie();let{spinY:o}=u.normalizeWheel(r);this.#J({spinY:o})},this.#G=r=>{let{clientX:o,clientY:n}=r.touches?r.touches[0]:r;this.#X({client:{x:o,y:n}})},this.#k=u.useMouseWheel(u.debounce(()=>{this.#oe()},500))}#oe(){this.#b&&this.#b.classList.remove("is-whelling")}#ie(){this.#b&&this.#b.classList.add("is-whelling")}#ue(){return this.#c>0}init(){this.#n&&(this.#E===y.EASE_SPRING?this.#_=new zt:(this.#_=new Pr,this.#_.updateVelocity(.1)),this.#B&&(this.#b.addEventListener("wheel",this.#U,{passive:!0}),this.#b.addEventListener("mousemove",this.#G,{passive:!0}),this.#b.addEventListener("touchmove",this.#G,{passive:!0})),this.#B||(this.#S=u.useMouseWheel(t=>{this.#ce(t),this.#V(t)}),this.#v=u.useMouseMove(t=>this.#te(t)),this.#y=u.useTouchMove(t=>this.#te(t))),this.#a=u.useResize(()=>this.refresh()),this.#h=u.useScrollStart(()=>this.#ge()),this.#f=u.useScrollEnd(()=>this.#ge()),this.#o=u.useTouchStart(t=>this.#j(t)),this.#g=u.useTouchEnd(t=>this.#Z(t)),this.#m=u.useMouseDown(t=>this.#j(t)),this.#x=u.useMouseUp(t=>this.#Z(t)),this.#b.addEventListener("mouseleave",()=>{qt()}),this.#F&&(this.#T=u.useMouseClick(({target:t,preventDefault:r})=>{this.#me({target:t,preventDefault:r})})),this.#be(),fe[this.#P](this.#N)&&(this.#fe(),this.#ge()),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#O||(this.#M?.({shouldScroll:this.#ue()}),this.#$.forEach(t=>{t.refresh()}))})},3))}#ce({pixelX:t}){if(!(!this.#ee||!t||this.#W||this.#Y.length===0)&&Math.abs(t)>40){this.#W=!0;let r=t>0?-1:1,o=this.#Q?r:r*-1;this.#Y({direction:o,move:n=>this.move(n).catch(()=>{})}),setTimeout(()=>{this.#W=!1},500)}}#fe(){if(!this.#b)return;this.#b.style["user-select"]="none",[...this.#b.querySelectorAll("a, button")].forEach(r=>{r.setAttribute("draggable","false"),r.style["user-select"]="none"})}#pe(){if(!this.#b)return;this.#b.style["user-select"]="",[...this.#b.querySelectorAll("a, button")].forEach(r=>{r.removeAttribute("draggable"),r.style["user-select"]=""})}#be(){this.#_&&(this.#_.setData({val:0}),this.#w=this.#_.subscribe(({val:t})=>{this.#b.style.transform=this.#R==y.DIRECTION_VERTICAL?`translate3d(0px, 0px, 0px) translateY(${-Math.trunc(t)}px)`:`translate3d(0px, 0px, 0px) translateX(${-Math.trunc(t)}px)`,this.#$.forEach(r=>{r.triggerScrollStart()}),u.useNextTick(()=>{this.#L({value:-t,percent:this.#i,parentIsMoving:!0}),this.#$.forEach(r=>{r.move({value:-t,parentIsMoving:!0})})})}),this.#A=this.#_.onComplete(({val:t})=>{this.#b.style.transform=this.#R==y.DIRECTION_VERTICAL?`translateY(${-Math.trunc(t)}px)`:`translateX(${-Math.trunc(t)}px)`,u.useNextTick(()=>{this.#L({value:-t,percent:this.#i,parentIsMoving:!1}),this.#$.forEach(r=>{r.triggerScrollEnd(),r.move({value:-t,parentIsMoving:!1})})})}))}#ge(){this.#D&&(this.#l=this.#D===document.documentElement?window.innerWidth:Fe(this.#D),this.#d=this.#D===document.documentElement?window.innerHeight:ne(this.#D),this.#c=this.#R===y.DIRECTION_VERTICAL?this.#b.offsetHeight-this.#d:this.#b.offsetWidth-this.#l,this.#ne())}#X({client:t}){!this.#r||!this.#F||(this.#e=this.#p,this.#p=this.#H({x:t?.x??0,y:t?.y??0}),this.#t+=Math.round(this.#e-this.#p),this.#ne())}#q(){return this.#R===y.DIRECTION_HORIZONTAL?this.#l/1920:this.#d/1080}#J({spinY:t=0}){if(!fe[this.#P](this.#N))return;this.#r=!1;let r=this.#q(),o=rt(t,-1,1);this.#t+=o*this.#I*r,this.#ne()}#j({target:t,client:r}){fe[this.#P](this.#N)&&(t===this.#b||as(this.#b,t))&&(this.#u=this.#t,this.#r=!0,this.#e=this.#H({x:r?.x??0,y:r?.y??0}),this.#p=this.#H({x:r?.x??0,y:r?.y??0}))}#Z(){this.#r=!1}#te({target:t,client:r,preventDefault:o}){if((t===this.#b||as(this.#b,t))&&this.#r&&this.#F){o(),this.#e=this.#p,this.#p=this.#H({x:r?.x??0,y:r?.y??0});let n=Math.round(this.#e-this.#p);this.#t+=n,this.#ne()}}#V({target:t,spinY:r=0,spinX:o=0,preventDefault:n}){if(fe[this.#P](this.#N)&&(this.#ie(),t===this.#b||as(this.#b,t))){this.#r=!1,n?.(),pr();let s=Math.abs(this.#re-o),i=Math.abs(this.#K-r),a=this.#se&&!this.#ee&&s>i?o:r;if(Math.abs(a)===0)return;let c=this.#q();this.#t+=rt(a,-1,1)*this.#I*rt(c,1,10),this.#ne(),this.#K=r,this.#re=o}}move(t){return fe[this.#P](this.#N)?(this.#i=t,this.#t=this.#i*this.#c/100,this.#_.goTo({val:this.#t})):new Promise(r=>r())}set(t){fe[this.#P](this.#N)&&(this.#i=t,this.#t=this.#i*this.#c/100,this.#_.set({val:this.#t}))}#ne(){let t=this.#t*100/this.#c;this.#i=rt(t,0,100),this.#t=rt(this.#t,0,this.#c),this.#_.goTo({val:this.#t}).catch(()=>{}),this.#C?.({value:-this.#t,percent:this.#i,parentIsMoving:!0})}#me({target:t,preventDefault:r}){fe[this.#P](this.#N)&&(t===this.#b||as(this.#b,t))&&Math.abs(this.#t-this.#u)>this.#s&&r()}#H({x:t,y:r}){return!t||!r?0:this.#R===y.DIRECTION_VERTICAL?r:t}refresh(){if(!fe[this.#P](this.#N)){this.#pe(),this.#_?.stop?.(),u.useFrame(()=>{u.useNextTick(()=>{this.#b.style.transform=""})});return}this.#ge(),this.#fe(),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#z?.({shouldScroll:this.#ue()}),this.#$.forEach(t=>{t.refresh()})})},2)}destroy(){this.#O=!0,this.#pe(),this.#a(),this.#h(),this.#f(),this.#o(),this.#g(),this.#m(),this.#x(),this.#S(),this.#v(),this.#y(),this.#T(),this.#w(),this.#A(),this.#k(),this.#_?.destroy(),this.#_=null,this.#$.forEach(t=>{t?.destroy?.()}),this.#$=[],this.#L=Q,this.#C=Q,this.#z=Q,this.#M=Q,this.#B&&(this.#b?.removeEventListener("wheel",this.#U),this.#b?.removeEventListener("mousemove",this.#G),this.#b?.removeEventListener("touchmove",this.#G)),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#b=null,this.#D=null})},3)}};var xv=!1,NI=new Set(["scrollerN0","scrollerN1"]),Cv=()=>{let e=document.querySelector("#root");e&&(Ga({rootElement:e}),m.mainStore.watch("beforeRouteChange",()=>{pr(),vv()}),m.mainStore.watch("afterRouteChange",()=>{let t=m.getActiveRoute()?.route;xv=NI.has(t),u.useFrameIndex(()=>{if(xv){Du();return}!Tv()&&Ga({rootElement:e}),Hs()},30)}))};function dt(){let e=navigator.userAgent,t=e.includes("Safari");return e.includes("Chrome")&&t&&(t=!1),t}function ht(){let e=navigator.userAgent,t=e.includes("Firefox");return e.includes("Chrome")&&t&&(t=!1),t}function Ev(){let e=navigator.userAgent,t=document.body;if(/chrome|chromium|crios/i.test(e)){t.classList.add("is-chrome");return}if(/firefox|fxios/i.test(e)){t.classList.add("is-firefox");return}if(/safari/i.test(e)){t.classList.add("is-safari");return}if(/edg/i.test(e)){t.classList.add("is-edge");return}}var te=async({source:e})=>{let t=await fetch(e);if(!t.ok)return console.warn(`${e} not found`),{success:!1,data:""};let r={};try{r=await t.text()}catch(o){return console.warn(o),{success:!1,data:r}}return{success:!0,data:r}},$t=async({source:e})=>{let t=await fetch(e);if(!t.ok)return console.warn(`${e} not found`),{success:!1,data:""};let r={};try{r=await t.json()}catch(o){return console.warn(o),{success:!1,data:r}}return{success:!0,data:r}};function Jt(e,t){return Math.floor(Math.random()*(t-e+1)+e)}var wv=e=>new XMLSerializer().serializeToString(e).replaceAll(' xmlns="http://www.w3.org/1999/xhtml"',"");var Iv,Mv={},PI="./asset/svg/icons/",AI=[{name:"gitHubIcon",source:"icon-github.svg"},{name:"searchIcons",source:"search.svg"},{name:"historyIcons",source:"history.svg"},{name:"starOutline",source:"star-outline.svg"},{name:"previous",source:"previous.svg"},{name:"close",source:"close.svg"},{name:"up",source:"up.svg"},{name:"swap",source:"swap.svg"},{name:"selectAll",source:"select-all.svg"}],mr=()=>Iv,ft=()=>Mv,kv=async()=>{let{success:e,data:t}=await $t({source:"./data/common.json"});e||console.warn("data fail to load"),Iv=t},Rv=async()=>{let e=AI.map(({name:r,source:o})=>te({source:`${PI}${o}`}).then(n=>({name:r,result:n})));Mv=(await Promise.all(e)).map(({name:r,result:o})=>o.success?{name:r,data:o.data}:{name:r,data:"icon load error"}).reduce((r,{name:o,data:n})=>({...r,[o]:n}),{})};var Nv=()=>g`
        <div class="error-page">
            <div class="error-page__content">
                <h1 class="error-page__title title-big">Page not found</h1>
                <a class="error-page__link" href="./#home">back to home</a>
            </div>
        </div>
    `;var Pv=({screenElement:e,scrollerElement:t,hideControls:r})=>{let o=new xt({screen:e,scroller:t,direction:"horizontal",drag:!0,useHorizontalScroll:!0,easeType:"lerp",breakpoint:"small",afterInit:({shouldScroll:n})=>{r(n)},afterRefresh:({shouldScroll:n})=>{r(n)}});return o.init(),{destroy:()=>{o.destroy()},refresh:()=>{o.refresh()}}};var OI=e=>e<10?`0${e}`:`${e}`,Av=({setRef:e,getRef:t,onMount:r,bindEffect:o,getProxi:n})=>{let s=n(),i=()=>{},a=()=>{};return r(()=>{let{screenElement:c,scrollerElement:l}=t();return{destroy:i,refresh:a}=Pv({screenElement:c,scrollerElement:l,hideControls:p=>{s.showControls=p}}),u.useNextLoop(()=>{a()}),setTimeout(()=>{s.isMounted=!0},500),()=>{i(),i=()=>{},a=()=>{}}}),g`<div class="l-links">
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
                                                >${OI(l)}</span
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
    </div>`};var Ov=m.createComponent({tag:"layout-links",component:Av,props:{title:()=>({value:"",type:String}),items:()=>({value:[],type:Array})},state:{isMounted:()=>({value:!1,type:Boolean}),showControls:()=>({value:!1,type:Boolean})}});m.useComponent([Ov]);var Ya=async({props:e})=>{let{source:t}=e,{data:r}=await $t({source:t});return g` <div class="l-links">
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
    `;var Xa=m.createComponent({tag:"doc-container",component:$v});var Lv=()=>g`
        <div class="c-doc-title">
            <h2><mobjs-slot></mobjs-slot></h2>
        </div>
    `;var Ka=m.createComponent({tag:"doc-title",component:Lv,state:{}});var Dv=()=>g`
        <div class="c-doc-title-small">
            <mobjs-slot></mobjs-slot>
        </div>
    `;var Qa=m.createComponent({tag:"doc-title-small",component:Dv,state:{}});var nT=kC(oT(),1);var Yu=nT.default;var sT="[A-Za-z$_][0-9A-Za-z$_]*",CM=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],EM=["true","false","null","undefined","NaN","Infinity"],iT=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],aT=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],cT=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],wM=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],IM=[].concat(cT,iT,aT);function lT(e){let t=e.regex,r=($,{after:B})=>{let j="</"+$[0].slice(1);return $.input.indexOf(j,B)!==-1},o=sT,n={begin:"<>",end:"</>"},s=/<[A-Za-z0-9\\._:-]+\s*\/>/,i={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:($,B)=>{let j=$[0].length+$.index,X=$.input[j];if(X==="<"||X===","){B.ignoreMatch();return}X===">"&&(r($,{after:j})||B.ignoreMatch());let le,ye=$.input.substring(j);if(le=ye.match(/^\s*=/)){B.ignoreMatch();return}if((le=ye.match(/^\s+extends\s+/))&&le.index===0){B.ignoreMatch();return}}},a={$pattern:sT,keyword:CM,literal:EM,built_in:IM,"variable.language":wM},c="[0-9](_?[0-9])*",l=`\\.(${c})`,p="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${p})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${p})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},f={className:"subst",begin:"\\$\\{",end:"\\}",keywords:a,contains:[]},h={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"xml"}},v={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"css"}},b={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"graphql"}},T={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,f]},_={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},E=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,h,v,b,T,{match:/\$\d+/},d];f.contains=E.concat({begin:/\{/,end:/\}/,keywords:a,contains:["self"].concat(E)});let C=[].concat(_,f.contains),w=C.concat([{begin:/(\s*)\(/,end:/\)/,keywords:a,contains:["self"].concat(C)}]),I={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:w},N={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},A={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...iT,...aT]}},O={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},R={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[I],illegal:/%/},F={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function k($){return t.concat("(?!",$.join("|"),")")}let M={match:t.concat(/\b/,k([...cT,"super","import"].map($=>`${$}\\s*\\(`)),o,t.lookahead(/\s*\(/)),className:"title.function",relevance:0},L={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},D={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},I]},x="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",P={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(x)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[I]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:a,exports:{PARAMS_CONTAINS:w,CLASS_REFERENCE:A},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),O,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,h,v,b,T,_,{match:/\$\d+/},d,A,{scope:"attr",match:o+t.lookahead(":"),relevance:0},P,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[_,e.REGEXP_MODE,{className:"function",begin:x,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:w}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:n.begin,end:n.end},{match:s},{begin:i.begin,"on:begin":i.isTrulyOpeningTag,end:i.end}],subLanguage:"xml",contains:[{begin:i.begin,end:i.end,skip:!0,contains:["self"]}]}]},R,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[I,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},L,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[I]},M,F,N,D,{match:/\$[(.]/}]}}Yu.registerLanguage("javascript",lT);var uT=async({ref:e,source:t})=>{if(!e)return;let{success:r,data:o}=await te({source:t});if(!r){e.textContent="something went wrong";return}e.textContent=o,Yu.highlightElement(e),e.style.height=""},MM=()=>getComputedStyle(document.documentElement).getPropertyValue("--snippet-line-height-value"),pT=({onMount:e,setRef:t,getRef:r,delegateEvents:o,bindEffect:n,getProxi:s,bindObject:i})=>{let a=s(),c=MM(),l="20rem",p=Number(a.numLines)>15,d=p?"use-expand":"",f=`${a.numLines*Number(c)}rem`;return e(async()=>{let{codeEl:h}=r();return a.awaitLoad?await uT({ref:h,source:a.source}):uT({ref:h,source:a.source}),()=>{}}),g`<div
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
    </div>`};var mT=m.createComponent({tag:"mob-snippet",component:pT,props:{source:()=>({value:"",type:String}),numLines:()=>({value:1,type:Number}),awaitLoad:()=>({value:!1,type:Boolean})},state:{contentIsLoaded:()=>({value:!1,type:Boolean}),isExpanded:()=>({value:!1,type:Boolean})}});var Xs="debug_component",oc="debug_filter_list",nc="debug_overlay",sc="debug_tree",Ks="quick_nav",Qs="scroll_down_label",Zs="scroll_to",dT="header",ic="mob_navigation",ei="mob_navigation_container",ac="search_overlay",ti="search_overlay_list",zo="search_overlay_header",cc="right-sidebar",lc="route-loader",qn="custom-history";var hT=({id:e,label:t,element:r,isSection:o,isNote:n})=>{m.useMethodByName(Zs)?.addItem?.({id:e,label:t,element:r,isSection:o,isNote:n})},fT=e=>{m.useMethodByName(Zs)?.setActiveLabel?.(e)};function kM({label:e}){return e?.length>0}var RM=async({id:e,label:t,element:r,isSection:o,isNote:n})=>{await m.tick(),hT({id:e,label:t,element:r,isSection:o,isNote:n}),xp(r)&&!o&&fT(t)},gT=({getState:e,onMount:t})=>{let{style:r,line:o,id:n,label:s,isSection:i,isNote:a}=e(),c=o?"spacer--line":"";return t(({element:l})=>{kM({label:s})&&RM({id:n,label:s,element:l,isSection:i,isNote:a})}),g`<div id="${n}" class="spacer spacer--${r} ${c}">
        <span></span>
    </div>`};var bT=m.createComponent({tag:"mob-spacer",component:gT,props:{style:()=>({value:"x-small",type:String,validate:e=>["x-small","small","medium","big"].includes(e),strict:!0}),line:()=>({value:!1,type:Boolean}),id:()=>({value:"",type:String}),label:()=>({value:"",type:String}),isSection:()=>({value:!1,type:Boolean}),isNote:()=>({value:!1,type:Boolean})}});var yT=({getState:e,delegateEvents:t})=>{let{content:r,anchor:o}=e();return g`<div>
        <button
            type="button"
            class="anchor-button"
            ${t({click:()=>{let n=document.querySelector(o);if(!n)return;let s=he(n).top-50;Or.to(s)}})}
        >
            ${r}
            <span class="anchor-button__arrow">
                <span class="anchor-button__arrow__start"></span>
                <span class="anchor-button__arrow__end"></span>
            </span>
        </button>
    </div>`};var vT=m.createComponent({tag:"anchor-button",component:yT,props:{anchor:()=>({value:"",type:String}),content:()=>({value:"",type:String})}});var NM=({items:e,links:t})=>t?e.map(({label:r,url:o})=>g`<li>
                          <a href="${o}" class="list-links">
                              ${r}
                              <span class="list-links__arrow">
                                  <span class="list-links__arrow__start"></span>
                                  <span class="list-links__arrow__end"></span>
                              </span>
                          </a>
                      </li>`).join(""):e.map(r=>g` <li>${r}</li> `).join(""),TT=({getState:e})=>{let{style:t,color:r,items:o,links:n}=e(),s=`is-${r}`;return g`<ul class="ul ul--${t} ${s} ${n?"use-links":"use-default"}">
        ${NM({items:o,links:n})}
    </ul>`};var _T=m.createComponent({tag:"mob-list",component:TT,props:{style:()=>({value:"medium",type:String,validate:e=>["small","medium","big"].includes(e),strict:!0}),dots:()=>({value:!0,type:Boolean}),links:()=>({value:!1,type:Boolean}),color:()=>({value:"black",type:String,validate:e=>["white","black","grey","hightlight"].includes(e)}),items:()=>({value:[],type:Array})}});var ST=({getState:e})=>{let{style:t,color:r,boxed:o,note:n}=e(),s=r==="inherit"?"":`is-${r}`;return g`<p
        class="p p--${t} ${o?"p--boxed":""} ${n?"p--note":""} ${s}"
    >
        <mobjs-slot></mobjs-slot>
    </p>`};var xT=m.createComponent({tag:"mob-paragraph",component:ST,props:{style:()=>({value:"medium",type:String,validate:e=>["small","medium","big"].includes(e),strict:!0}),color:()=>({value:"inherit",type:String,validate:e=>["inherit","white","hightlight","black"].includes(e)}),boxed:()=>({value:!1,type:Boolean}),note:()=>({value:!1,type:Boolean})}});var PM=e=>e.length>0?g`<span class="title-index">${e}</span>`:"",CT=({getProxi:e})=>{let t=e(),r=t.color==="inherit"?"":`is-${t.color}`,o=t.isBold?"is-bold":"",n=t.isSection?"is-section":"";return g`<${t.tag} class="${r} ${o} ${n}">
            ${PM(t.index)}
            <span class="title-content">
                <mobjs-slot></mobjs-slot>
            </span>
        </${t.tag}>`};var ET=m.createComponent({tag:"mob-title",component:CT,props:{tag:()=>({value:"h1",type:String}),color:()=>({value:"inherit",type:String,validate:e=>["inherit","white","black"].includes(e)}),isSection:()=>({value:!1,type:Boolean}),isBold:()=>({value:!1,type:Boolean}),index:()=>({value:"",type:String})}});var AM=({data:e,staticProps:t,awaitLoadSnippet:r})=>e.map(o=>{let{component:n,props:s,content:i}=o;return g`
                <${n} ${t({...s,awaitLoad:r})}>
                    ${i??""}
                </${n}>
            `}).join(""),OM=async({source:e,data:t})=>{if(t&&t.length>0)return t;let{success:r,data:o}=await $t({source:e});return r?o.data:[]},wT=async({getState:e,staticProps:t})=>{let{source:r,data:o}=e(),n=await OM({source:r,data:o}),{awaitLoadSnippet:s,usePadding:i}=e();return g`
        <section class="html-content ${i?"use-padding":""}">
            ${AM({data:n,staticProps:t,awaitLoadSnippet:s})}
        </section>
    `};var $M=async({proxi:e})=>{let{success:t,data:r}=await te({source:e.url});t&&(e.source=r)},IT=({getProxi:e,invalidate:t,onMount:r})=>{let o=e();return r(()=>{$M({proxi:o})}),g`
        <div class="c-doc-svg ${o.className}">
            ${t({observe:()=>o.source,render:()=>o.source})}
        </div>
    `};var MT=m.createComponent({tag:"doc-svg",component:IT,props:{className:()=>({value:"",type:String}),url:()=>({value:"",type:String})},state:{source:()=>({value:g`<span class="c-doc-svg__loading">
                    loading image ...
                </span>`,type:String})}});var uc=m.createComponent({tag:"html-content",component:wT,props:{source:()=>({value:"",type:String}),data:()=>({value:[],type:Array}),awaitLoadSnippet:()=>({value:!1,type:Boolean}),useTriangle:()=>({value:!0,type:Boolean}),usePadding:()=>({value:!0,type:Boolean})},child:[_T,xT,ET,mT,bT,vT,MT]});var kT=({bindEffect:e,getProxi:t})=>{let r=t(),o=r.isSection?"is-section":"",n=r.isNote?"is-note":"";return g`
        <button
            type="button"
            class="${o} ${n}"
            ${e({toggleClass:{active:()=>r.active}})}
        >
            <span>${r.label}</span>
        </button>
    `};var RT=m.createComponent({tag:"scroll-to-button",component:kT,props:{label:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean}),isSection:()=>({value:!1,type:Boolean}),isNote:()=>({value:!1,type:Boolean})}});var ri=!1;function LM({delegateEvents:e,bindProps:t,proxi:r}){return r.anchorItems.map(o=>{let n=o.isSection||o.isNote?"":e({click:async()=>{let{id:s,label:i,element:a}=o,c=s==="start"?0:he(a).top-50;ri=!0,r.activeLabel=i,await Or.to(c),setTimeout(()=>{ri=!1},1e3)}});return g`
                <li>
                    <scroll-to-button
                        ${n}
                        ${t(()=>({active:r.activeLabel===o.label,label:o.label,isSection:o.isSection??!1,isNote:o.isNote??!1}))}
                    >
                    </scroll-to-button>
                </li>
            `}).join("")}var NT=({proxi:e,direction:t,winHeight:r})=>{u.useFrame(()=>{u.useNextTick(()=>{if(t==="DOWN"){let o=e.anchorItems.findLast(({top:n,isNote:s})=>!s&&n<window.scrollY+r-200);e.activeLabel=o?o.label:""}if(t==="UP"){let o=e.anchorItems.findLast(({top:n,isNote:s})=>!s&&n<window.scrollY+200);e.activeLabel=o?o.label:""}})})},PT=({onMount:e,delegateEvents:t,bindProps:r,invalidate:o,computed:n,addMethod:s,updateState:i,getProxi:a})=>{let c=a(),l="DOWN",p=window.innerHeight;return s("addItem",({id:d,label:f,element:h,isSection:v,isNote:b})=>{i("anchorItemsToBeComputed",T=>[...T,{id:d,label:f,element:h,isSection:v,isNote:b}])}),s("setActiveLabel",d=>{ri||(c.activeLabel=d)}),e(()=>{if(ce.mq("max","desktop"))return;n(()=>c.anchorItems,()=>c.anchorItemsToBeComputed.map(b=>({...b,top:he(b.element).top})));let d=u.useScrollThrottle(({direction:b})=>l=b),f=new ResizeObserver(u.debounce(()=>{u.useFrame(()=>{u.useNextTick(()=>{p=window.innerHeight})}),c.anchorItems.forEach(b=>{b.top=he(b.element).top})},200));f.observe(m.getRoot());let h=c.updateAnchorOnWheel?u.useMouseWheel(u.debounce(()=>{ri||NT({proxi:c,direction:l,winHeight:p})},600)):()=>{},v=u.useScrollEnd(()=>{ri||NT({proxi:c,direction:l,winHeight:p})});return()=>{h(),d(),v(),f.unobserve(m.getRoot()),f.disconnect(),f=null}}),g`
        <div class="c-scroll-to">
            <ul>
                ${o({observe:()=>c.anchorItems,render:()=>LM({delegateEvents:t,bindProps:r,proxi:c})})}
            </ul>
        </div>
    `};var AT=m.createComponent({tag:"scroll-to",component:PT,state:{activeLabel:()=>({value:"",type:String}),updateAnchorOnWheel:()=>({value:!1,type:Boolean}),anchorItemsToBeComputed:()=>({value:[],type:Array}),anchorItems:()=>({value:[],type:Array,transform:e=>e.toSorted(function(t,r){let{element:o}=t,{element:n}=r;return o===n||!o||!n?0:o.compareDocumentPosition(n)&2?1:-1})})},child:[RT]});var pc=({breadCrumbs:e})=>e.map((t,r)=>r===e.length-1?g`<a href="${t.url}" class="breadcrumbs__arrow">
                          <div class="breadcrumbs__arrow__start"></div>
                          <div class="breadcrumbs__arrow__end"></div>
                      </a>
                      <a class="breadcrumbs__link" href="${t.url}"
                          >${t.title}</a
                      >`:g`<a class="breadcrumbs__link" href="${t.url}"
                      >${t.title}</a
                  >`).join("");var mc=e=>{m.useMethodByName(cc)?.updateList(e??[])};m.useComponent([Xa,Qa,AT,Ka,uc]);var $e=async({props:e})=>{let{source:t,title:r,breadCrumbs:o,rightSidebar:n}=e,{data:s}=await $t({source:t});return mc(n??[]),g` <doc-container>
        <div>
            <html-content
                slot="docs"
                ${m.staticProps({data:s.data,useMaxWidth:!0})}
            ></html-content>
            <doc-title-small slot="section-title-small"
                ><div>
                    ${pc({breadCrumbs:o})}<span>${r}</span>
                </div></doc-title-small
            >
            <scroll-to name="${Zs}" slot="section-links"></scroll-to>
            <doc-title slot="section-title">${r}</doc-title>
        </div>
    </doc-container>`};m.useComponent([Xa,Qa,Ka,uc]);var oe=async({props:e})=>{let{source:t,title:r,breadCrumbs:o,rightSidebar:n}=e,{data:s}=await $t({source:t});return mc(n??[]),g`<doc-container>
        <div>
            <html-content
                slot="docs"
                ${m.staticProps({data:s.data,useMaxWidth:!0})}
            ></html-content>
            <doc-title-small slot="section-title-small"
                ><div>
                    ${pc({breadCrumbs:o})}<span>${r}</span>
                </div></doc-title-small
            >
            <doc-title slot="section-title">${r}</doc-title>
        </div>
    </doc-container>`};var OT=({weakPathElement:e,weakScrollerElement:t,wrapElement:r,setActiveItem:o,weakScreenElement:n})=>{let s={ax:53,ay:70,bx:64,by:80,cx:89,cy:87,dx:100,dy:100,ex:0,ey:100,fx:10,fy:77,gx:17,gy:84},i={ax:-1,ay:-1,bx:1,by:1,cx:-1,cy:-1,dx:1,dy:1,ex:1,ey:1,fx:-1,fy:-1,gx:1,gy:1},a=z.createSequencer({data:{...s}});a.goTo({fy:90,ay:90,cy:70},{start:0,end:3.5}).goTo({gy:70,by:80},{start:2,end:5}).goTo({fy:90,ay:100,cy:90},{start:4,end:7.5}).goTo({ay:120,fy:80,cy:80},{start:7.5,end:10}).goTo({gy:100,by:100},{start:6,end:10}).add(()=>{o(1)},0).add(({direction:h,isForced:v})=>{v||h==="backward"||o(2)},1.5).add(({direction:h,isForced:v})=>{v||h==="backward"||o(3)},5.5).add(({direction:h,isForced:v})=>{v||h==="backward"||o(4)},9.5).add(({direction:h,isForced:v})=>{v||h==="forward"||o(1)},1.5).add(({direction:h,isForced:v})=>{v||h==="forward"||o(2)},5).add(({direction:h,isForced:v})=>{v||h==="forward"||o(3)},9),a.subscribe(({ax:h,ay:v,bx:b,by:T,cx:S,cy:_,dx:E,dy:C,ex:w,ey:I,fx:N,fy:A,gx:O,gy:R})=>{s.ax=h,s.ay=v,s.bx=b,s.by=T,s.cx=S,s.cy=_,s.dx=E,s.dy=C,s.ex=w,s.ey=I,s.fx=N,s.fy=A,s.gx=O,s.gy=R});let c=z.createTimeTween({data:{...i}});c.subscribe(({ax:h,ay:v,bx:b,by:T,cx:S,cy:_,dx:E,dy:C,ex:w,ey:I,fx:N,fy:A,gx:O,gy:R})=>{i.ax=h,i.ay=v,i.bx=b,i.by=T,i.cx=S,i.cy=_,i.dx=E,i.dy=C,i.ex=w,i.ey=I,i.fx=N,i.fy=A,i.gx=O,i.gy=R});let l=we.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(c,{ax:()=>Jt(-3,3),ay:()=>Jt(-3,3),bx:()=>Jt(-3,3),by:()=>Jt(-3,3),cx:()=>Jt(-3,3),cy:()=>Jt(-3,3),dx:()=>0,dy:()=>0,ex:()=>0,ey:()=>0,fx:()=>Jt(-3,3),fy:()=>Jt(-3,3),gx:()=>Jt(-3,3),gy:()=>Jt(-3,3)},{duration:3e3});l.play();let p=!0,d=()=>{if(!p)return;let h={x:s.ax+i.ax,y:s.ay+i.ay},v={x:s.bx+i.bx,y:s.by+i.by},b={x:s.cx+i.cx,y:s.cy+i.cy},T={x:s.dx+i.dx,y:s.dy+i.dy},S={x:s.ex+i.ex,y:s.ey+i.ey},_={x:s.fx+i.fx,y:s.fy+i.fy},E={x:s.gx+i.gx,y:s.gy+i.gy};e.deref()&&(e.deref().style.clipPath=`polygon(${h.x}% ${h.y}%, ${v.x}% ${v.y}%, ${b.x}% ${b.y}%, ${T.x}% ${T.y}%,${S.x}% ${S.y}%,${_.x}% ${_.y}%,${E.x}% ${E.y}%)`,u.useNextFrame(()=>d()))};u.useFrame(()=>d());let f=qe.createScrollTrigger({item:r,dynamicStart:{position:"right",value:()=>Fe(n?.deref()??document.createElement("div"))},dynamicEnd:{position:"right",value:()=>Fe(t?.deref()??document.createElement("div"))??0},reverse:!1,propierties:"tween",ease:!1,tween:a});return{pathScroller:f,pathSequencer:a,pathTween:c,pathTimeline:l,stopLoop:()=>{p=!1},destroy:()=>{f.destroy(),f=null,a.destroy(),a=null,c.destroy(),c=null,l.destroy(),l=null}}};var $T=({title_1:e,title_2:t})=>{let r=z.createScrollerTween({from:{x:0},to:{x:30}});r.subscribe(({x:i})=>{e.style.transform=`translate3d(0,0,0) translate(${i}px, 0px)`}),r.onStop(({x:i})=>{e.style.transform=`translate(${i}px, 0px)`});let o=qe.createParallax({item:e,propierties:"tween",tween:r,ease:!1,align:"start"}),n=z.createScrollerTween({from:{x:0},to:{x:-30}});n.subscribe(({x:i})=>{t.style.transform=`translate3d(0,0,0) translateX(${i}px)`}),n.onStop(({x:i})=>{t.style.transform=`translateX(${i}px)`});let s=qe.createParallax({item:t,propierties:"tween",tween:n,ease:!1,align:"start"});return{title1parallax:o,title2parallax:s,title1tween:r,title2tween:n}};var dc=({title:e})=>{let t=z.createScrollerTween({from:{x:0},to:{x:-60}});t.subscribe(({x:o})=>{e.deref()&&(e.deref().style.transform=`translate3d(0,0,0) translateX(${o}px)`)}),t.onStop(({x:o})=>{e.deref()&&(e.deref().style.transform=`translateX(${o}px)`)});let r=qe.createParallax({item:e.deref(),propierties:"tween",tween:t,ease:!1,align:"center"});return{sectionContentScroller:r,destroy:()=>{r.destroy(),r=null}}};var LT=({screenElement:e,scrollerElement:t,pathElement:r,wrapElement:o,title_1:n,title_2:s,section2_title:i,section3_title:a,section4_title:c,setActiveItem:l,onMove:p,onScrollEnd:d})=>{let f=new WeakRef(t),h=new WeakRef(i),v=new WeakRef(a),b=new WeakRef(c),T=new WeakRef(r),S=new WeakRef(e),{pathScroller:_,pathSequencer:E,pathTimeline:C,pathTween:w,stopLoop:I,destroy:N}=OT({weakPathElement:T,weakScrollerElement:f,wrapElement:o,setActiveItem:l,weakScreenElement:S}),{title1parallax:A,title2parallax:O,title1tween:R,title2tween:F}=$T({title_1:n,title_2:s}),{sectionContentScroller:k,destroy:M}=dc({title:h}),{sectionContentScroller:L,destroy:D}=dc({title:v}),{sectionContentScroller:x,destroy:P}=dc({title:b}),$=new xt({screen:e,scroller:t,direction:"horizontal",drag:!0,easeType:"lerp",breakpoint:"small",useHorizontalScroll:!0,useSwipe:!1,revertSwipeDirection:!1,children:[_,A,O,k,L,x],onUpdate:({value:B})=>{p(B),d()}});return $.init(),setTimeout(()=>{$?.refresh?.()},500),{goTo:B=>{!B&&B!==0||$?.move?.(B).catch(()=>{})},destroy:()=>{$.destroy(),$=null,E.destroy(),_.destroy(),C.destroy(),w.destroy(),A.destroy(),O.destroy(),R.destroy(),F.destroy(),k.destroy(),L.destroy(),I(),N(),M(),D(),P()}}};var DT=({elements:e})=>{let t=z.createSpring({data:{x:0},stagger:{each:5}});return e.map(o=>o.querySelector("svg")).forEach(o=>{o&&(t.subscribe(({x:n})=>{o.style.transform=`translate3D(0,0,0) translateY(${-n}px)`}),t.onComplete(({x:n})=>{o.style.transform=`translateY(${-n}px)`}))}),{svgSpring:t,destroySvgSpring:()=>{t.destroy(),t=null}}};var ni=()=>{},oi=e=>Promise.resolve(e),hc=()=>{},Xu={1:0,2:100/3,3:100/3*2,4:100},DM=({setRef:e,getState:t})=>{let{titleTop:r,titleBottom:o}=t().block_1;return g`
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
    `},FM=({setRef:e,getState:t})=>{let{title:r,copy:o}=t().block_2;return g`
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
    `},BM=({setRef:e,getState:t})=>{let{title:r,copy:o}=t().block_3;return g`
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
    `},VM=({setRef:e,getState:t})=>{let{title:r,items:o}=t().block_4;return g`
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
    `},WM=({proxi:e,delegateEvents:t,bindEffect:r})=>g`
        <ul class="l-about__nav">
            ${e.navItem.map(({index:o,label:n})=>g`
                        <li class="l-about__nav__item">
                            <button
                                class="l-about__nav__button"
                                ${t({click:()=>{ni(Xu[o]),hc()}})}
                                ${r({toggleClass:{active:()=>e.activenavItem===o}})}
                            >
                                ${n}
                            </button>
                        </li>
                    `).join("")}
        </ul>
    `,jM=()=>g`
        <div class="l-about__square">
            <div class="l-about__square__legend"><h4>Scroll or Drag</h4></div>
            <span class="l-about__square__angle top-left"></span>
            <span class="l-about__square__angle top-right"></span>
            <span class="l-about__square__angle bottom-left"></span>
            <span class="l-about__square__angle bottom-right"></span>
        </div>
    `,FT=({onMount:e,setRef:t,getRef:r,getRefs:o,getState:n,bindEffect:s,delegateEvents:i,getProxi:a})=>{let c=a(),l=4,p=!1;return e(()=>{let{screenElement:d,scrollerElement:f,wrapElement:h,title_1:v,title_2:b,section2_title:T,section3_title:S,section4_title:_,pathElement:E}=r(),{svg:C}=o(),w=0,I=!1,N=0,{svgSpring:A,destroySvgSpring:O}=DT({elements:C});oi=async k=>{if(u.shouldMakeSomething()||p){A.stop(),p=!0,setTimeout(()=>{p=!1},2e3);return}let L=-Math.abs(k/30);Number.isNaN(L)||await A.goTo({x:L}).catch(()=>{})},hc=()=>{oi(3e3),setTimeout(()=>{oi(0)},500)};let{destroy:R,goTo:F}=LT({screenElement:d,scrollerElement:f,pathElement:E,wrapElement:h,title_1:v,title_2:b,section2_title:T,section3_title:S,section4_title:_,setActiveItem:k=>{c.activenavItem=k},onMove:k=>{I||(w=k),I=!0,N=w-k,oi(N)},onScrollEnd:u.useDebounce(()=>{I=!1,N=0,oi(N)},500)});return ni=F,c.isMounted=!0,()=>{ni=()=>{},R(),O()}}),g`<div
        class="l-about"
        style="--number-of-section:${l}"
        ${s({toggleClass:{active:()=>c.isMounted}})}
    >
        <div class="l-about__sqaure-container">${jM()}</div>
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
                    ${DM({setRef:t,getState:n})}
                    ${FM({setRef:t,getState:n})}
                    ${BM({setRef:t,getState:n})}
                    ${VM({setRef:t,getState:n})}
                </div>
            </div>
        </div>
        <button
            type="button"
            class="l-about__prev"
            ${s({toggleAttribute:{disabled:()=>c.activenavItem==1}})}
            ${i({click:()=>{ni(Xu[ce.clamp(c.activenavItem-1,1,4)]),hc()}})}
        ></button>
        ${WM({bindEffect:s,delegateEvents:i,proxi:c})}
        <button
            type="button"
            class="l-about__next"
            ${s({toggleAttribute:{disabled:()=>c.activenavItem==4}})}
            ${i({click:()=>{ni(Xu[ce.clamp(c.activenavItem+1,1,4)]),hc()}})}
        ></button>
    </div>`};var BT=m.createComponent({tag:"about-component",component:FT,props:{block_1:()=>({value:{titleTop:"",titleBottom:""},type:"any"}),block_2:()=>({value:{title:"",copy:""},type:"any"}),block_3:()=>({value:{title:"",copy:""},type:"any"}),block_4:()=>({value:{title:"",items:[""]},type:"any"}),aboutSvg:()=>({value:"",type:String})},state:{navItem:()=>({value:[{index:1,label:"about"},{index:2,label:"why"},{index:3,label:"what"},{index:4,label:"inspiration"}],type:Array}),activenavItem:()=>({value:1,type:Number,transform:e=>ce.clamp(e,1,4)}),isMounted:()=>({value:!1,type:Boolean})}});m.useComponent([BT]);var VT=async()=>{let{data:e}=await $t({source:"./data/about/index.json"}),{data:t}=await te({source:"./asset/svg/about.svg?v=0.1"});return g`<about-component
        ${m.staticProps({block_1:e.block_1,block_2:e.block_2,block_3:e.block_3,block_4:e.block_4,aboutSvg:t})}
    ></about-component> `};var WT=({getProxi:e,bindObject:t,delegateEvents:r,onMount:o,id:n,bindEffect:s})=>{let i=e();return o(()=>()=>{}),g`<div
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
    </div> `};var fc=m.createComponent({tag:"benchmark-fake-component",component:WT,props:{counter:0,label:"",index:0},state:{isSelected:!1}});var gt=(e=1001)=>({state:{counter:()=>({value:0,type:Number}),data:()=>({value:[],type:Array,validate:t=>t.length<e,strict:!0,skipEqual:!1}),time:()=>({value:0,type:Number,transform:t=>Math.round(t),skipEqual:!1}),isLoading:()=>({value:!1,type:Boolean}),currentIndex:()=>({value:-1,type:Number})},child:[fc]});var Qu=e=>{for(let t=e.length-1;t>0;t--){let r=Math.floor(Math.random()*(t+1));[e[t],e[r]]=[e[r],e[t]]}return e},si=e=>{let t=u.checkType(Number,e)?e:0;return[...Array.from({length:t}).keys()].map(r=>({label:`comp-${r+1}`}))},Ku=({proxi:e,value:t,useShuffle:r=!1})=>{e.isLoading=!0,u.useFrameIndex(()=>{u.useNextTick(async()=>{let o=performance.now();e.data=r?Qu(si(t)):si(t),await m.tick();let s=performance.now()-o;e.time=s,e.isLoading=!1})},2)},bt=({delegateEvents:e,setRef:t,getRef:r,bindEffect:o,proxi:n})=>g`
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
                ${e({keydown:s=>{if(s.keyCode===13){s.preventDefault();let i=Number(s.target?.value??0);Ku({proxi:n,value:i})}}})}
            />
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{let{input:s}=r(),i=Number(s?.value??0);Ku({proxi:n,value:i})}})}
            >
                Generate components
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{Ku({proxi:n,value:n.data.length,useShuffle:!0})}})}
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
    `;var jT=({onMount:e,delegateEvents:t,bindText:r,invalidate:o,getState:n,staticProps:s,setRef:i,getRef:a,bindProps:c,bindEffect:l,getProxi:p})=>{let d=p();return e(()=>()=>{a()?.input.remove()}),g`<div class="benchmark">
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
            ${bt({setRef:i,getRef:a,proxi:d,delegateEvents:t,bindEffect:l})}

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
    </div>`};var HT=m.createComponent({tag:"benchmark-invalidate",component:jT,...gt()});var gc=(e=1e3)=>g`
        <p>
            Generates and updates a large list of components with 5 reactive
            elements inside.<br />
            ( max component <strong>${e}</strong> ).
        </p>
    `;var zT=({onMount:e,delegateEvents:t,bindObject:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindEffect:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">Repeat ( with key ):</h3>
            <h2 class="benchmark__head__title">
                Generate components performance
            </h2>
            ${gc()}
            ${bt({setRef:o,getRef:n,delegateEvents:t,bindEffect:a,proxi:l})}

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
    </div>`};var UT=m.createComponent({tag:"benchmark-repeat-key",component:zT,...gt()});var GT=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindObject:a,bindEffect:c,getProxi:l})=>{let p=l();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat ( nested with key ):
            </h3>
            <p class="benchmark__head__title">
                Repater without component with the same repeater with component
                inside<br />
                ( max value <strong>10</strong> ).
            </p>
            ${bt({setRef:o,getRef:n,delegateEvents:t,bindEffect:c,proxi:p})}

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
    </div>`};var qT=m.createComponent({tag:"benchmark-repeat-key-nested",component:GT,...gt(31)});var JT=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindEffect:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">Repeat ( without key ):</h3>
            <h2 class="benchmark__head__title">
                Generate components performance
            </h2>
            ${gc()}
            ${bt({setRef:o,getRef:n,delegateEvents:t,bindEffect:a,proxi:l})}

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
    </div>`};var YT=m.createComponent({tag:"benchmark-repeat-no-key",component:JT,...gt()});var Lt=u.createStore({data:()=>({value:[],type:Array,validate:e=>e.length<1001,strict:!0,skipEqual:!1}),counter:()=>({value:0,type:Number}),time:()=>({value:0,type:Number,transform:e=>Math.round(e),skipEqual:!1}),isLoading:()=>({value:!1,type:Boolean})});var Zu=({value:e,useShuffle:t=!1})=>{Lt.set("isLoading",!0),u.useFrameIndex(()=>{u.useNextTick(async()=>{let r=performance.now();Lt.set("data",t?Qu(si(e)):si(e)),await m.tick();let n=performance.now()-r;Lt.set("time",n),Lt.set("isLoading",!1)})},2)},XT=({delegateEvents:e,setRef:t,getRef:r,getState:o,bindEffect:n})=>g`
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
                ${e({keydown:s=>{if(s.code.toLowerCase()==="enter"){s.preventDefault();let i=Number(s.target?.value??0);Zu({value:i})}}})}
            />
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{let{input:s}=r(),i=Number(s?.value??0);Zu({value:i})}})}
            >
                Generate components
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{let{data:s}=o();Zu({value:s.length,useShuffle:!0})}})}
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
    `;var KT=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,getState:s,bindProps:i,repeat:a,bindEffect:c,getProxi:l})=>{let p=l();return e(()=>()=>{n()?.input.remove(),Lt.set("data",[]),Lt.set("time",0),Lt.set("counter",0)}),g`<div class="benchmark">
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
            ${XT({setRef:o,getRef:n,delegateEvents:t,getState:s,bindEffect:c})}

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
    </div>`};var QT=m.createComponent({tag:"benchmark-repeat-no-key-bind-store",component:KT,bindStore:Lt,child:[fc]});var ZT=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindObject:a,bindEffect:c,getProxi:l})=>{let p=l();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat ( nested without key ):
            </h3>
            <p class="benchmark__head__title">
                Repater without component with the same repeater with component
                inside<br />
                ( max value <strong>10</strong> ).
            </p>
            ${bt({setRef:o,getRef:n,delegateEvents:t,bindEffect:c,proxi:p})}

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
    </div>`};var e_=m.createComponent({tag:"benchmark-repeat-key-no-nested",component:ZT,...gt(31)});var bc=(e=1e3)=>g`
        <p>
            Generates and updates a large list of vanilla HTML element with 4
            reactive elements inside.<br />
            ( max component <strong>${e}</strong> ).
        </p>
    `;var t_=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,repeat:s,bindEffect:i,bindObject:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat no component ( without key ):
            </h3>
            <h2 class="benchmark__head__title">
                Generate vanilla html performance
            </h2>
            ${bc(1e3)}
            ${bt({setRef:o,getRef:n,delegateEvents:t,bindEffect:i,proxi:l})}

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
    </div>`};var r_=m.createComponent({tag:"benchmark-repeat-no-component-no-key",component:t_,...gt(1001)});var o_=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,repeat:s,bindEffect:i,bindObject:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat no component ( with key ):
            </h3>
            <h2 class="benchmark__head__title">
                Generate vanilla html performance
            </h2>
            ${bc(1e3)}
            ${bt({setRef:o,getRef:n,delegateEvents:t,bindEffect:i,proxi:l})}

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
    </div>`};var n_=m.createComponent({tag:"benchmark-repeat-no-component-with-key",component:o_,...gt(1001)});m.useComponent([HT,YT,UT,qT,e_,QT,r_,n_]);var Lr=async({props:e})=>{let{rootComponent:t}=e;return g`<div class="l-benchMark"><${t}></${t}></div>`};var xe=({active:e=!0,nextRoute:t="",prevRoute:r="",backRoute:o=""})=>{let n=m.useMethodByName(Ks);n.update("active",e),n.update("nextRoute",t),n.update("prevRoute",r),n.update("backRoute",o)};m.beforeRouteChange(()=>{let e=m.useMethodByName(Ks);e.update("active",!1),e.update("nextRoute",""),e.update("prevRoute",""),e.update("backRoute","")});var Z=u.createStore({activeNavigationSection:()=>({value:"",type:String,skipEqual:!1}),navigationIsOpen:()=>({value:!1,type:Boolean})});Z.set("activeNavigationSection","");var yt=({disableOffcanvas:e})=>{let t="OffscreenCanvas"in globalThis&&!e;return{useOffscreen:t,context:t?"bitmaprenderer":"2d"}},vt=({useOffscreen:e,canvas:t})=>{let r=e?new OffscreenCanvas(t.width,t.height):null,o=e?r?.getContext("2d"):null;return{offscreen:r,offScreenCtx:o}},Tt=({useOffscreen:e,offscreen:t,ctx:r})=>{if(e&&t&&r){let o=t.transferToImageBitmap();r.transferFromImageBitmap(o)}},Jn=e=>"roundRect"in e;var bo=({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:n,gutter:s})=>{let i={row:0,col:-1,items:[]};return[...Array.from({length:t*r+t}).keys()].reduce(a=>{let{row:c,col:l,items:p}=a,d=l<r?l+1:0,f=d===0?c+1:c,h=(o+s)*d,v=(n+s)*f;return{row:f,col:d,items:[...p,{width:o,height:n,x:h,y:v,centerX:h+o/2,centerY:v+n/2,offsetXCenter:HM({canvasWidth:e.width,width:o,gutter:s,numberOfColumn:r}),offsetYCenter:zM({canvasHeight:e.height,height:n,gutter:s,numberOfRow:t}),gutter:s,numberOfColumn:r}]}},i)},HM=({canvasWidth:e,width:t,gutter:r,numberOfColumn:o})=>e/2-(t+r)*o/2,zM=({canvasHeight:e,height:t,gutter:r,numberOfRow:o})=>e/2-(t+r)*(o+1)/2;var s_=({canvas:e,numberOfRow:t,numberOfColumn:r,fill:o,disableOffcanvas:n,stagger:s,reorder:i})=>{let a=window.innerHeight>=700?window.innerHeight/18:window.innerHeight/20,c=window.innerHeight>=700?window.innerHeight/18:window.innerHeight/20,l=1,{useOffscreen:p,context:d}=yt({disableOffcanvas:n}),f=!0,h=e.getContext(d,{alpha:!0}),v=m.getActiveRoute(),{offscreen:b,offScreenCtx:T}=vt({useOffscreen:p,canvas:e}),S=p?T:h,_=Jn(S);S=null,e.width=e.clientWidth,e.height=e.clientHeight;let E=bo({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:a,cellHeight:c,gutter:l}).items,C=i?E.map((R,F)=>({...R,scale:1,rotate:0,hasFill:o.includes(F)})).toSorted(R=>R.hasFill?-1:1).toReversed():E.map((R,F)=>{let k=o.includes(F);return{...R,scale:1,rotate:0,hasFill:k}}),w=z.createTimeTween({ease:"easeInOutQuad",stagger:s,data:{scale:1,rotate:0}});C.forEach(R=>{w.subscribeCache(R,({scale:F,rotate:k})=>{R.rotate=k,R.scale=F})});let I=()=>{if(!h)return;p&&b&&(b.width=e.width,b.height=e.height);let R=p?T:h;R&&(e.width=e.width,C.forEach(({x:F,y:k,width:M,height:L,rotate:D,scale:x,hasFill:P,offsetXCenter:$,offsetYCenter:B})=>{let j=Math.PI/180*D,X=Math.cos(j)*x,le=Math.sin(j)*x;R.setTransform(X,le,-le,X,Math.floor($+F),Math.floor(B+k)),_?(R.beginPath(),R.roundRect(Math.floor(-M/2),Math.floor(-L/2),M,L,5)):(R.beginPath(),R.rect(Math.floor(-M/2),Math.floor(-L/2),M,L)),P?(R.fillStyle="#000000",R.fill()):(R.fillStyle="rgba(238, 238, 238, 0.9)",R.fill()),R.setTransform(1,0,0,1,0,0)}),Tt({useOffscreen:p,offscreen:b,ctx:h}))},N=we.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).label({name:"label1"}).goTo(w,{scale:1.5,rotate:90},{duration:1e3}).goTo(w,{scale:.5},{duration:500}).goTo(w,{rotate:180,scale:1.2},{duration:500}).goTo(w,{scale:1.3},{duration:500}).goTo(w,{scale:1},{duration:1200});N.onLoopEnd(({direction:R,loop:F})=>{console.log(`loop end: ${R}, ${F}`)}),N.play();let A=()=>{I(),f&&u.useNextFrame(()=>A())};u.useFrame(()=>{A()});let O=Z.watch("navigationIsOpen",R=>{if(R){N?.pause(),f=!1;return}setTimeout(async()=>{f=!0,m.getActiveRoute().route===v.route&&(N?.resume(),u.useFrame(()=>A()))},500)});return()=>{w.destroy(),N.destroy(),O(),w=null,N=null,h=null,b=null,T=null,E=[],f=!1,C=null,d=null}};var ep=[{label:"asymmetric row",params:{fill:[16,27,38,49,60,71,82,93],numberOfColumn:10,numberOfRow:10,stagger:{each:5,grid:{col:11,row:11,direction:"row"},waitComplete:!1},reorder:!0}},{label:"random",params:{fill:[0,13,20,45,65,71,72,73,74,75,76,77,83,92,96,113,117,134,138,155,156,157,158,159,189,209],numberOfColumn:20,numberOfRow:10,stagger:{each:2,from:"random",waitComplete:!1},reorder:!1}},{label:"edges",params:{fill:[0,13,20,45,65,71,72,73,74,75,76,77,83,92,96,113,117,134,138,155,156,157,158,159,189,209],numberOfColumn:10,numberOfRow:10,stagger:{each:10,from:"edges",waitComplete:!1},reorder:!1}},{label:"radial",params:{fill:[],numberOfColumn:8,numberOfRow:9,stagger:{each:20,from:{x:4,y:4},grid:{col:9,row:9,direction:"radial"},waitComplete:!1},reorder:!1}}];var tp=({proxi:e,getRef:t})=>{e.destroy(),e.destroy=s_({canvas:t().canvas,...ep[e.currentParamsId].params,disableOffcanvas:!!(ht()||dt())})};function UM({delegateEvents:e,bindEffect:t,proxi:r,getRef:o}){return ep.map(({label:n},s)=>g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn"
                    ${e({click:()=>{r.currentParamsId=s,tp({proxi:r,getRef:o})}})}
                    ${t({toggleClass:{active:()=>r.currentParamsId===s}})}
                >
                    ${n}
                </button>
            </li>`).join("")}var i_=({onMount:e,setRef:t,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s})=>{let i=n();return e(()=>{u.useFrame(()=>{u.useNextTick(()=>{tp({proxi:i,getRef:r})})});let a=u.useResize(()=>{tp({proxi:i,getRef:r})});return u.useFrame(()=>{i.isMounted=!0}),()=>{i.destroy(),i.destroy=()=>{},a()}}),g`
        <div>
            <div class="c-canvas">
                <button
                    type="button"
                    class="c-canvas__controls__open"
                    ${s({click:()=>{i.controlsActive=!0}})}
                >
                    variations
                </button>
                <ul
                    class="c-canvas__controls"
                    ${o({toggleClass:{active:()=>i.controlsActive}})}
                >
                    <button
                        type="button"
                        class="c-canvas__controls__close"
                        ${s({click:()=>{i.controlsActive=!1}})}
                    ></button>
                    ${UM({delegateEvents:s,bindEffect:o,proxi:i,getRef:r})}
                </ul>
                <div class="background-shape">${i.background}</div>
                <div
                    class="c-canvas__wrap"
                    ${o({toggleClass:{active:()=>i.isMounted}})}
                >
                    <canvas ${t("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var a_=m.createComponent({tag:"animatedpattern-n0",component:i_,props:{background:()=>({value:"",type:String})},state:{isMounted:()=>({value:!1,type:Boolean}),controlsActive:()=>({value:!1,type:Boolean}),destroy:()=>({value:()=>{},type:Function}),currentParamsId:()=>({value:0,type:Number})}});m.useComponent([a_]);var c_=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"#async-timeline",nextRoute:"#animatedPatternN1",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <animatedpattern-n0
            ${m.staticProps({background:e})}
        ></animatedpattern-n0>
    </div>`};var rp=({canvas:e,disableOffcanvas:t})=>{let r=window.innerHeight>=700?window.innerHeight/16:window.innerHeight/20,o=window.innerHeight>=700?window.innerHeight/16:window.innerHeight/20,n=7,s=15,i=window.innerHeight/150,a=[2,18,10,27,21,22,23,24,25,25,26,37,42,53,58,69,74,85,86,87,88,89,90,44,60,65,98,108],{useOffscreen:c,context:l}=yt({disableOffcanvas:t}),p=!0,{top:d,left:f}=he(e),h=e.getContext(l,{alpha:!0}),v=m.getActiveRoute(),{offscreen:b,offScreenCtx:T}=vt({useOffscreen:c,canvas:e});e.width=e.clientWidth,e.height=e.clientHeight;let S=bo({canvas:e,numberOfRow:n,numberOfColumn:s,cellWidth:r,cellHeight:o,gutter:i}).items,_=S.map((k,M)=>({...k,scale:0,mouseX:0,mouseY:0,hasFill:a.includes(M)})).toSorted(k=>k.hasFill?-1:1),E=z.createLerp({data:{mouseX:0,mouseY:0}});_.forEach(k=>{E.subscribeCache(k,({mouseX:M,mouseY:L})=>{k.mouseX=M,k.mouseY=L})});let C=z.createTimeTween({ease:"easeInOutSine",stagger:{each:5,from:"center",waitComplete:!1},data:{scale:0}});_.forEach(k=>{C.subscribeCache(k,({scale:M})=>{k.scale=M})});let w=()=>{if(!h)return;c&&b&&(b.width=e.width,b.height=e.height);let k=c?T:h;k&&(e.width=e.width,_.forEach(({x:M,y:L,width:D,height:x,mouseX:P,mouseY:$,scale:B,hasFill:j,offsetXCenter:X,offsetYCenter:le})=>{if(!j)return;let ye=P-(e.width-(D+i)*s)/2,ee=$-(e.height-(x+i)*n)/2,pe=(M-ye)/250,ve=(L-ee)/250,ge=Math.sqrt(Math.pow(Math.abs(pe),2)+Math.pow(Math.abs(ve),2)),Ie=ce.clamp(Math.abs(ge),0,2),De=0,q=Math.cos(De)*(Ie+B),Te=Math.sin(De)*(Ie+B);k.setTransform(q,Te,-Te,q,Math.floor(X+M),Math.floor(le+L)),k.beginPath(),k.rect(Math.floor(-D/2),Math.floor(-x/2),D,x),k.fillStyle="#000000",k.fill(),k.setTransform(1,0,0,1,0,0)}),k.globalCompositeOperation="destination-out",_.forEach(({x:M,y:L,width:D,height:x,mouseX:P,mouseY:$,scale:B,hasFill:j,offsetXCenter:X,offsetYCenter:le})=>{if(j)return;let ye=P-(e.width-(D+i)*s)/2,ee=$-(e.height-(x+i)*n)/2,pe=(M-ye)/250,ve=(L-ee)/250,ge=Math.sqrt(Math.pow(Math.abs(pe),2)+Math.pow(Math.abs(ve),2)),Ie=ce.clamp(Math.abs(ge),0,2),De=0,q=Math.cos(De)*(Ie+B),Te=Math.sin(De)*(Ie+B);k.setTransform(q,Te,-Te,q,Math.floor(X+M),Math.floor(le+L)),k.beginPath(),k.rect(Math.floor(-D/2),Math.floor(-x/2),D,x),k.fill(),k.setTransform(1,0,0,1,0,0)}),Tt({useOffscreen:c,offscreen:b,ctx:h}))},I=we.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(C,{scale:.3},{duration:1e3});I.play();let N=({x:k,y:M})=>{E.goTo({mouseX:k-f,mouseY:M-d}).catch(()=>{})},A=u.useMouseMove(({client:k})=>{let{x:M,y:L}=k;N({x:M,y:L})}),O=u.useTouchMove(({client:k})=>{let{x:M,y:L}=k;N({x:M,y:L})}),R=()=>{w(),p&&u.useNextFrame(()=>R())};u.useFrame(()=>{R()});let F=Z.watch("navigationIsOpen",k=>{if(k){I?.stop(),p=!1;return}setTimeout(async()=>{p=!0,m.getActiveRoute().route===v.route&&(I?.play(),u.useFrame(()=>R()))},500)});return()=>{C.destroy(),I.destroy(),E.destroy(),A(),O(),F(),C=null,I=null,E=null,h=null,b=null,T=null,S=[],p=!1,_=null,l=null}};var l_=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s})=>{let i=s(),a=()=>{};return e(()=>{let{canvas:c}=o();u.useFrame(()=>{u.useNextTick(()=>{a(),a=rp({canvas:c,...t()})})});let l=u.useResize(()=>{a(),a=rp({canvas:c,...t()})});return u.useFrame(()=>{i.isMounted=!0}),()=>{l(),a(),a=null}}),g`
        <div>
            <div class="c-canvas">
                <div class="background-shape">${i.background}</div>
                <div
                    class="c-canvas__wrap"
                    ${n({toggleClass:{active:()=>i.isMounted}})}
                >
                    <canvas ${r("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var u_=m.createComponent({tag:"animatedpattern-n1",component:l_,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!!(ht()||dt()),type:Boolean})},state:{isMounted:!1}});m.useComponent([u_]);var p_=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"#animatedPatternN0?version=3&activeId=3",nextRoute:"#scrollerN0?version=0&activeId=0",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <animatedpattern-n1
            ${m.staticProps({background:e})}
        ></animatedpattern-n1>
    </div>`};var m_=({canvas:e,disableOffcanvas:t})=>{let o=window.innerHeight/30,n=window.innerHeight/30,s=[14],i=1,a=0,c=15,l=3,p=5e3,{useOffscreen:d,context:f}=yt({disableOffcanvas:t}),h=!0,v=e.getContext(f,{alpha:!0}),{top:b,left:T}=he(e),S=m.getActiveRoute(),{offscreen:_,offScreenCtx:E}=vt({useOffscreen:d,canvas:e}),C=!0;e.width=e.clientWidth,e.height=e.clientHeight;let w=[...Array.from({length:20}).keys()].map((x,P)=>{let $=P>=10?10+(10-P):P,B=s.includes(P)?1:$*i;return{width:$*o,height:$*n,x:0,y:0,hasFill:s.includes(P),opacity:B,radius:a,rotate:0,relativeIndex:$}}),I=z.createTimeTween({data:{rotate:0},stagger:{each:c,from:"center"},ease:"easeLinear",relative:!0});[...w].forEach(x=>{I.subscribeCache(x,({rotate:P})=>{x.rotate=P})});let N=z.createSpring({data:{x:0,y:0},stagger:{each:l,from:"end"}});[...w].forEach(x=>{N.subscribeCache(x,({x:P,y:$})=>{x.x=P,x.y=$})});let A=()=>{if(!v)return;d&&_&&(_.width=e.width,_.height=e.height);let x=d?E:v;x&&(e.width=e.width,w.forEach(({width:P,height:$,x:B,y:j,rotate:X,hasFill:le,opacity:ye},ee)=>{let pe=w.length-ee,ve=e.width/2,ge=e.height/2,Ie=1,De=Math.PI/180*X,q=Math.cos(De)*Ie,Te=Math.sin(De)*Ie;x.setTransform(q,Te,-Te,q,ve+B+pe*B/20,ge+j+pe*j/20),C?(x.beginPath(),x.roundRect(Math.round(-P/2),Math.round(-$/2),P,$,[40,40])):(x.beginPath(),x.rect(Math.round(-P/2),Math.round(-$/2),P,$)),le?x.fillStyle="#000":(x.strokeStyle="#000",x.fillStyle=`rgba(238, 238, 238, ${ye})`,x.stroke()),x.fill(),x.setTransform(1,0,0,1,0,0)}),Tt({useOffscreen:d,offscreen:_,ctx:v}))},O=we.createAsyncTimeline({repeat:-1,yoyo:!1,autoSet:!1});O.goTo(I,{rotate:360},{duration:p}),O.play();let R=()=>{A(),h&&u.useNextFrame(()=>R())};u.useFrame(()=>R());let F=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,b=he(e).top,T=he(e).left,A()}),k=({x,y:P})=>{let $=window.innerWidth,B=window.innerHeight,j=x-e.width/2-T,X=P-e.height/2-b;N.goTo({x:ce.clamp(j,-$/2+400+T,$/2-400-T),y:ce.clamp(X,-B/2+200+b,B/2-200-b)}).catch(()=>{})},M=u.useMouseMove(({client:x})=>{let{x:P,y:$}=x;k({x:P,y:$})}),L=u.useTouchMove(({client:x})=>{let{x:P,y:$}=x;k({x:P,y:$})}),D=Z.watch("navigationIsOpen",x=>{if(x){h=!1,O?.pause(),I?.pause(),N?.pause();return}setTimeout(()=>{h=!0,m.getActiveRoute().route===S.route&&(O?.resume(),I?.resume(),N?.resume(),u.useFrame(()=>R()))},500)});return()=>{I.destroy(),N.destroy(),O.destroy(),F(),M(),L(),D(),I=null,N=null,O=null,v=null,_=null,E=null,h=!1,w=null,f=null}};var d_=({onMount:e,getState:t,getRef:r,setRef:o,bindEffect:n,getProxi:s})=>{let i=s();return e(()=>{let{canvas:a}=r(),c=()=>{};return u.useFrame(()=>{u.useNextTick(()=>{c(),c=m_({canvas:a,...t()})})}),u.useFrame(()=>{i.isMounted=!0}),()=>{c(),c=null}}),g`
        <div>
            <div class="c-canvas">
                <div class="background-shape">${i.background}</div>
                <div
                    class="c-canvas__wrap"
                    ${n({toggleClass:{active:()=>i.isMounted}})}
                >
                    <canvas ${o("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var h_=m.createComponent({tag:"caterpillar-n1",component:d_,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!!(ht()||dt()),type:Boolean})},state:{isMounted:!1}});m.useComponent([h_]);var f_=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"",nextRoute:"#caterpillarN2",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <caterpillar-n1 ${m.staticProps({background:e})}>
        </caterpillar-n1>
    </div>`};var op=({value:e,direction:t,isForced:r})=>{r||console.log(`current: ${e}, direction: ${t}`)},g_=({canvas:e,rotationDefault:t,disableOffcanvas:r})=>{let n=window.innerHeight/13,s=window.innerHeight/13,i=[2],a=.03,c=500,l=400,p=10,d=p/2/Math.PI,{useOffscreen:f,context:h}=yt({disableOffcanvas:r}),v=!0,b=e.getContext(h,{alpha:!0}),T=t,S=m.getActiveRoute(),{offscreen:_,offScreenCtx:E}=vt({useOffscreen:f,canvas:e}),C=!0,w=[...Array.from({length:20}).keys()].map((k,M)=>{let L=M>=10?10+(10-M):M,D=n+n/3*L,x=s+s/3*L,P=i.includes(M)?1:(20-M)*a;return{width:D,height:x,x:0,y:0,hasFill:i.includes(M),opacity:P,rotate:0}});e.width=e.clientWidth,e.height=e.clientHeight;let I=z.createSequencer({stagger:{each:7},data:{x:p/4,rotate:0},duration:p}).goTo({x:p+p/4},{start:0,end:p,ease:"easeLinear"}).goTo({rotate:()=>-T},{start:0,end:5,ease:"easeInOutBack"}).goTo({rotate:0},{start:5,end:p,ease:"easeInOutBack"}).label("mylabel",2).add(({isForced:k,direction:M})=>{op({isForced:k,direction:M,value:1})},1).add(({isForced:k,direction:M})=>{op({isForced:k,direction:M,value:5})},5).add(({isForced:k,direction:M})=>{op({isForced:k,direction:M,value:9})},9);w.forEach(k=>{I.subscribeCache(k,({x:M,rotate:L})=>{let D=M/d,x=2/(3-Math.cos(2*D)),P=x*Math.cos(D)*c,$=x*Math.sin(2*D)/2*l;k.x=P,k.y=$,k.rotate=L})});let N=we.createSyncTimeline({repeat:-1,yoyo:!1,duration:4e3}).add(I);N.onLoopEnd(({loop:k,direction:M})=>{console.log(`loop end: ${k} , ${M}`)});let A=()=>{if(!b)return;f&&_&&(_.width=e.width,_.height=e.height);let k=f?E:b;k&&(e.width=e.width,w.forEach(({width:M,height:L,x:D,y:x,rotate:P,hasFill:$,opacity:B})=>{let j=e.width/2,X=e.height/2,le=1,ye=Math.PI/180*P,ee=Math.cos(ye)*le,pe=Math.sin(ye)*le;k.setTransform(ee,pe,-pe,ee,j+D,X+x),C?(k.beginPath(),k.roundRect(Math.round(-M/2),Math.round(-L/2),M,L,[40,40])):(k.beginPath(),k.rect(Math.round(-M/2),Math.round(-L/2),M,L)),$?k.fillStyle="#000000":(k.strokeStyle=`rgba(0, 0, 0, ${B})`,k.fillStyle="rgba(238, 238, 238, 0)",k.stroke()),k.fill(),k.setTransform(1,0,0,1,0,0)}),Tt({useOffscreen:f,offscreen:_,ctx:b}))},O=()=>{A(),v&&u.useNextFrame(()=>O())};u.useFrame(()=>O()),N.play();let R=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,A()}),F=Z.watch("navigationIsOpen",k=>{if(k){v=!1,N?.pause();return}setTimeout(()=>{v=!0,m.getActiveRoute().route===S.route&&(N?.resume(),u.useFrame(()=>O()))},500)});return{destroy:()=>{v=!1,R(),F(),I.destroy(),I=null,N.destroy(),N=null,b=null,_=null,E=null,w=null,h=null},play:()=>{N.play()},playReverse:()=>{N.playReverse()},playUseCurrent:()=>{N.play({useCurrent:!0})},playReverseUseCurrent:()=>{N.playReverse({useCurrent:!0})},playFromLabel:()=>{N.playFrom("mylabel")},plaFromLabelReverse:()=>{N.playFromReverse("mylabel")},stop:()=>N.stop(),pause:()=>N.pause(),resume:()=>N.resume(),reverse:()=>N.reverse(),setRotation:k=>T=k}};function GM({buttons:e}){return Object.entries(e).map(([t,r])=>{let{label:o}=r;return g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn ${t}"
                >
                    ${o}
                </button>
            </li>`}).join("")}var b_=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s,delegateEvents:i})=>{let a=s();return e(({element:c})=>{let{canvas:l,rangeValue:p,rotationButton:d}=o(),f=()=>{},h=b=>{},v=g_({canvas:l,...t()});return u.useFrame(()=>{u.useNextTick(()=>{({destroy:f,setRotation:h}=v)})}),Object.entries(a.buttons).forEach(([b,T])=>{let{method:S}=T;c.querySelector(`.${b}`)?.addEventListener("click",()=>v?.[S]())}),d.addEventListener("change",()=>{let b=d.value;h(Number(b)),p.textContent=b}),u.useFrame(()=>{a.isMounted=!0}),()=>{f(),f=null,h=null}}),g`
        <div>
            <div class="c-canvas">
                <div class="background-shape background-shape--light">
                    ${a.background}
                </div>
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
                        ${GM({buttons:a.buttons})}
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
    `};var qM={"js-CN2-play":{label:"play",method:"play"},"js-CN2-playReverse":{label:"play reverse",method:"playReverse"},"js-CN2-play-current":{label:"go forward if is backward",method:"playUseCurrent"},"js-CN2-playReverse-current":{label:"go backward if is forward",method:"playReverseUseCurrent"},"js-CN2-play-label":{label:"play from label",method:"playFromLabel"},"js-CN2-playReverse-label":{label:"play from label reverse",method:"plaFromLabelReverse"},"js-CN2-reverse":{label:"reverse",method:"reverse"},"js-CN2-stop":{label:"stop",method:"stop"},"js-CN2-pause":{label:"pause",method:"pause"},"js-CN2-resume":{label:"resume",method:"resume"}},y_=m.createComponent({tag:"caterpillar-n2",component:b_,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!!(ht()||dt()),type:Boolean})},state:{rotationDefault:166,isMounted:!1,controlsActive:()=>({value:!1,type:Boolean}),buttons:()=>({value:qM,type:"Any"})}});m.useComponent([y_]);var v_=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"#caterpillarN1",nextRoute:"#async-timeline",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <caterpillar-n2
            ${m.staticProps({background:e})}
        ></caterpillar-n2>
    </div>`};var yc=()=>{m.useMethodByName(Qs).update(!0)},vc=()=>{m.useMethodByName(Qs).update(!1)};var T_=({canvas:e,canvasScroller:t,stagger:r,disableOffcanvas:o})=>{let n=window.innerHeight>=700?window.innerHeight/16:window.innerHeight/20,s=window.innerHeight>=700?window.innerHeight/16:window.innerHeight/20,i=1,a=10,c=10,l=!1,p=[36,37,38,39,40,47,51,58,62,69,73,80,81,82,83,84],{useOffscreen:d,context:f}=yt({disableOffcanvas:o}),h=!0,v=z.createMasterSequencer(),b=e.getContext(f,{alpha:!0}),T=m.getActiveRoute(),{offscreen:S,offScreenCtx:_}=vt({useOffscreen:d,canvas:e}),E=d?_:b,C=Jn(E);E=null,e.width=e.clientWidth,e.height=e.clientHeight;let w=bo({canvas:e,numberOfRow:a,numberOfColumn:c,cellWidth:n,cellHeight:s,gutter:i}).items,I=l?w.map((M,L)=>({...M,scale:1,rotate:0,hasFill:p.includes(L)})).toSorted(M=>M.hasFill?-1:1):w.map((M,L)=>({...M,scale:1,rotate:0,hasFill:p.includes(L)})),N=z.createStaggers({items:I,stagger:r}),A=N.map(({item:M,start:L,end:D})=>{let x=z.createSequencer({data:{scale:1}}).goTo({scale:0},{start:L,end:D,ease:"easeInOutQuad"}),P=x.subscribe(({scale:$})=>{M.scale=$});return v.add(x),{sequencer:x,unsubscribe:P}}),O=()=>{if(!b)return;d&&S&&(S.width=e.width,S.height=e.height);let M=d?_:b;M&&(e.width=e.width,I.forEach(({x:L,y:D,width:x,height:P,rotate:$,scale:B,hasFill:j,offsetXCenter:X,offsetYCenter:le})=>{let ye=Math.PI/180*$,ee=Math.cos(ye)*B,pe=Math.sin(ye)*B;M.setTransform(ee,pe,-pe,ee,Math.floor(X+L),Math.floor(le+D)),C?(M.beginPath(),M.roundRect(Math.floor(-x/2),Math.floor(-P/2),x,P,5)):(M.beginPath(),M.rect(Math.floor(-x/2),Math.floor(-P/2),x,P)),j?(M.fillStyle="#000000",M.fill()):(M.strokeStyle="#000",M.fillStyle="rgb(238, 238, 238)",M.fill(),C||(M.strokeStyle="#ccc")),M.setTransform(1,0,0,1,0,0)}),Tt({useOffscreen:d,offscreen:S,ctx:b}))},R=qe.createScrollTrigger({trigger:t,propierties:"tween",tween:v,dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>ne(t)},reverse:!1,ease:!0,easeType:"lerp"});R.init();let F=()=>{O(),h&&u.useNextFrame(()=>F())};u.useFrame(()=>{F()});let k=Z.watch("navigationIsOpen",M=>{if(M){h=!1;return}setTimeout(async()=>{h=!0,m.getActiveRoute().route===T.route&&u.useFrame(()=>F())},500)});return()=>{k(),A.forEach(({sequencer:M,unsubscribe:L})=>{M.destroy(),L()}),A=[],v.destroy(),v=null,N=[],R.destroy(),R=null,b=null,S=null,_=null,w=[],h=!1,I=null,f=null}};var np=[{label:"random",params:{stagger:{type:"equal",each:6,from:"random"}}},{label:"column",params:{stagger:{type:"equal",each:7,from:"center",grid:{col:11,row:10,direction:"col"}}}},{label:"row",params:{stagger:{type:"equal",each:3,from:"start",grid:{col:11,row:10,direction:"row"}}}},{label:"sequential",params:{stagger:{type:"equal",each:2,from:"end"}}}];var sp=({proxi:e,getRef:t,resetScroll:r=!0})=>{r&&window.scrollTo(0,0),e.destroy(),e.destroy=T_({canvas:t().canvas,canvasScroller:t().canvasScroller,...np[e.currentParamsId].params,disableOffcanvas:!!(ht()||dt())})};function JM({delegateEvents:e,bindEffect:t,proxi:r,getRef:o}){return np.map(({label:n},s)=>g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn"
                    ${e({click:()=>{r.currentParamsId=s,sp({proxi:r,getRef:o})}})}
                    ${t({toggleClass:{active:()=>r.currentParamsId===s}})}
                >
                    ${n}
                </button>
            </li>`).join("")}var __=({onMount:e,setRef:t,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s})=>{let i=n();return e(()=>{yc(),u.useFrame(()=>{u.useNextTick(()=>{sp({proxi:i,getRef:r})})});let a=u.useResize(()=>{sp({proxi:i,getRef:r,resetScroll:!1})});return u.useFrame(()=>{i.isMounted=!0}),()=>{i.destroy(),i.destroy=()=>{},vc(),a()}}),g`
        <div>
            <div class="c-canvas c-canvas--fixed ">
                <button
                    type="button"
                    class="c-canvas__controls__open"
                    ${s({click:()=>{i.controlsActive=!0}})}
                >
                    variations
                </button>
                <ul
                    class="c-canvas__controls"
                    ${o({toggleClass:{active:()=>i.controlsActive}})}
                >
                    <button
                        type="button"
                        class="c-canvas__controls__close"
                        ${s({click:()=>{i.controlsActive=!1}})}
                    ></button>
                    ${JM({delegateEvents:s,bindEffect:o,proxi:i,getRef:r})}
                </ul>
                <div class="background-shape">${i.background}</div>
                <div
                    class="c-canvas__wrap"
                    ${o({toggleClass:{active:()=>i.isMounted}})}
                >
                    <canvas ${t("canvas")}></canvas>
                </div>
            </div>
            <div class="c-canvas-scroller" ${t("canvasScroller")}></div>
        </div>
    `};var S_=m.createComponent({tag:"scroller-n0",component:__,props:{background:()=>({value:"",type:String})},state:{isMounted:()=>({value:!1,type:Boolean}),controlsActive:()=>({value:!1,type:Boolean}),destroy:()=>({value:()=>{},type:Function}),currentParamsId:()=>({value:0,type:Number})}});m.useComponent([S_]);var x_=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"#animatedPatternN1",nextRoute:"#scrollerN1",backRoute:"#canvas-overview"}),g`<div>
        <scroller-n0
            ${m.staticProps({background:e})}
        ></scroller-n0>
    </div>`};function YM({width:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}function XM({height:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}var C_=({canvas:e,canvasScroller:t,disableOffcanvas:r})=>{let{useOffscreen:l,context:p}=yt({disableOffcanvas:r}),d=!0,f=e.getContext(p,{alpha:!0}),h=m.getActiveRoute(),{offscreen:v,offScreenCtx:b}=vt({useOffscreen:l,canvas:e}),T=!1;e.width=e.clientWidth,e.height=e.clientHeight;let S=[...Array.from({length:17}).keys()].map((A,O)=>{let R=O>=8.5?8.5+(8.5-O):O;return{width:Math.floor(YM({width:15,relativeIndex:R,amountOfPath:17})),height:Math.floor(XM({height:40,relativeIndex:R,amountOfPath:17})),opacity:R*.05,rotate:0,relativeIndex:R,index:O}}),_=z.createScrollerTween({from:{rotate:0},to:{rotate:720},stagger:{each:5,from:"center"}});[...S].forEach(A=>{_.subscribeCache(A,({rotate:O})=>{A.rotate=O})});let E=()=>{if(!f)return;l&&v&&(v.width=e.width,v.height=e.height);let A=l?b:f;if(!A)return;let O=e.width/2,R=e.height/2;e.width=e.width,S.forEach(({width:F,height:k,opacity:M,rotate:L,index:D})=>{let x=S.length/2-D,P=1,$=Math.PI/180*(L-33),B=Math.cos($)*P,j=Math.sin($)*P;A.setTransform(B,j,-j,B,O,R+x*19),T?(A.beginPath(),A.roundRect(-F/2,-k/2+x*19,F,k,150)):(A.beginPath(),A.rect(Math.round(-F/2),Math.round(-k/2),F,k)),A.strokeStyle="#000",A.fillStyle=`rgba(238, 238, 238, ${M})`,A.stroke(),A.fill(),A.setTransform(1,0,0,1,0,0)}),Tt({useOffscreen:l,offscreen:v,ctx:f})},C=qe.createScrollTrigger({trigger:t,propierties:"tween",tween:_,dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>ne(t)},ease:!0,easeType:"spring"});C.init();let w=()=>{E(),d&&u.useNextFrame(()=>w())};u.useFrame(()=>{w()});let I=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,u.useFrame(()=>{E()})}),N=Z.watch("navigationIsOpen",A=>{if(A){d=!1;return}setTimeout(()=>{d=!0,m.getActiveRoute().route===h.route&&u.useFrame(()=>w())},500)});return()=>{_.destroy(),I(),N(),_.destroy(),_=null,C.destroy(),C=null,f=null,v=null,b=null,_=null,d=!1,S=null,p=null}};var E_=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s})=>{let i=s();return e(()=>{let a=()=>{};yc();let{canvas:c,canvasScroller:l}=o();return u.useFrame(()=>{u.useNextTick(()=>{a(),a=C_({canvas:c,canvasScroller:l,...t()})})}),u.useFrame(()=>{i.isMounted=!0}),()=>{a(),vc(),a=null}}),g`
        <div>
            <div class="c-canvas c-canvas--fixed ">
                <div class="background-shape">${i.background}</div>
                <div
                    class="c-canvas__wrap"
                    ${n({toggleClass:{active:()=>i.isMounted}})}
                >
                    <canvas ${r("canvas")}></canvas>
                </div>
            </div>
            <div class="c-canvas-scroller" ${r("canvasScroller")}></div>
        </div>
    `};var w_=m.createComponent({tag:"scroller-n1",component:E_,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!!(ht()||dt()),type:Boolean})},state:{isMounted:!1}});m.useComponent([w_]);var I_=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"#scrollerN0?version=4&activeId=4",nextRoute:"",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <scroller-n1 ${m.staticProps({background:e})}></scroller-n1>
    </div>`};var M_=({getProxi:e,bindEffect:t})=>{let r=e();return g`
        <button
            type="button"
            class="c-dynamic-list-button"
            ${t({observe:"active",toggleClass:{active:()=>r.active}})}
        >
            ${r.label}
        </button>
    `};var Yn=m.createComponent({tag:"dynamic-list-button",component:M_,props:{label:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean})}});var Tc=[{key:"a",label:"A"},{key:"b",label:"B"},{key:"c",label:"C"},{key:"d",label:"D"}],k_=[{key:"f",label:"F"},{key:"b",label:"B"},{key:"e",label:"E"},{key:"c",label:"C"},{key:"b",label:"B"},{key:"a",label:"A"},{key:"g",label:"G"},{key:"h",label:"H"},{key:"d",label:"D"},{key:"b",label:"B"}],R_=[{key:"m",label:"M"},{key:"q",label:"Q"},{key:"z",label:"Z"},{key:"i",label:"I"},{key:"b",label:"B"},{key:"e",label:"E"},{key:"n",label:"N"},{key:"a",label:"A"},{key:"g",label:"G"},{key:"h",label:"H"},{key:"l",label:"L"},{key:"j",label:"J"},{key:"d",label:"D"}],N_=[{key:"h",label:"H"},{key:"f",label:"F"},{key:"a",label:"A"},{key:"d",label:"D"}],Xn=[[{key:4}],[{key:20},{key:10},{key:10},{key:6},{key:10},{key:10},{key:30}],[{key:3},{key:20},{key:5},{key:20},{key:5},{key:5},{key:5},{key:5},{key:60},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:10},{key:5}]];var KM=[{buttonLabel:"sample1",data:k_},{buttonLabel:"salmple2",data:R_},{buttonLabel:"sample3",data:N_},{buttonLabel:"Initial",data:Tc}],QM=[{label:"repeater with key",key:"key",clean:!1},{label:"repeater without key",key:"",clean:!1},{label:"repeater clear",key:"",clean:!0}];function ZM({staticProps:e,delegateEvents:t,bindProps:r,proxi:o}){return KM.map((n,s)=>{let{data:i,buttonLabel:a}=n;return g`
                <dynamic-list-button
                    class="c-dynamic-list__top__button"
                    ${e({label:a})}
                    ${t({click:async()=>{o.data=i,o.activeSample=s,await m.tick()}})}
                    ${r(()=>({active:s===o.activeSample}))}
                ></dynamic-list-button>
            `}).join("")}function ek({bindProps:e,staticProps:t,proxi:r}){return QM.map((o,n)=>{let{key:s,clean:i,label:a}=o;return g`
                <dynamic-list-repeater
                    ${t({listId:n,key:s,clean:i,label:a})}
                    ${e(()=>({data:r.data,counter:r.counter}))}
                ></dynamic-list-repeater>
            `}).join("")}var P_=({updateState:e,staticProps:t,bindProps:r,delegateEvents:o,invalidate:n,bindText:s,getProxi:i})=>{let a=i();return g`
        <div class="c-dynamic-list">
            <div class="c-dynamic-list__header">
                <div class="c-dynamic-list__top">
                    ${ZM({delegateEvents:o,staticProps:t,bindProps:r,proxi:a})}
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
                    ${ek({bindProps:r,staticProps:t,proxi:a})}
                </div>
            </div>
        </div>
    `};function tk({staticProps:e,bindProps:t,delegateEvents:r,current:o,proxi:n}){return g`
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
    `}var A_=({staticProps:e,bindProps:t,delegateEvents:r,repeat:o,getProxi:n})=>{let s=n(),i=s.key.length>0?s.key:void 0;return g`
        <div class="c-dynamic-list-repeater">
            <h4 class="c-dynamic-list-repeater__title">${s.label}</h4>
            <div class="c-dynamic-list-repeater__list">
                ${o({observe:()=>s.data,clean:s.clean,key:i,afterUpdate:()=>{console.log("repeater updated")},render:({current:a})=>tk({staticProps:e,bindProps:t,delegateEvents:r,current:a,proxi:s})})}
            </div>
        </div>
    `};function rk(e){return[...Array.from({length:e}).keys()].map(t=>t+1)}var ok=({staticProps:e,delegateEvents:t,proxi:r})=>g`
        ${rk(r.counter).map(o=>g`
                    <div class="validate-test-wrapper">
                        <dynamic-list-card-inner
                            ${e({key:`${o}`})}
                            ${t({click:()=>{console.log("invalidate inside reepater click")}})}
                        >
                        </dynamic-list-card-inner>
                    </div>
                `).join("")}
    `,O_=({onMount:e,key:t,staticProps:r,bindProps:o,id:n,delegateEvents:s,invalidate:i,repeat:a,bindText:c,bindEffect:l,getProxi:p,computed:d})=>{let f=p(),h=0;d(()=>f.innerDataUnivoque,()=>f.innerData.filter((b,T,S)=>S.map(({key:_})=>_).indexOf(b.key)===T)),e(async()=>((async()=>(await m.tick(),f.isMounted=!0))(),()=>{}));let v=f.isFull?"is-full":"";return g`
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
                        ${s({click:async()=>{h=h<Xn.length-1?h+1:0,f.innerData=Xn[h],await m.tick()}})}
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
                        ${i({observe:()=>f.counter,render:()=>ok({delegateEvents:s,staticProps:r,proxi:f})})}
                    </div>
                </div>
            </div>
        </div>
    `};var $_=({bindText:e})=>g`<span class="dynamic-list-card-inner">
        <span>${e`${"key"}`}</span>
    </span>`;var _c=m.createComponent({tag:"dynamic-list-card-inner",component:$_,props:{key:()=>({value:"",type:String})}});var L_=({getState:e,bindText:t})=>{let{parentListId:r}=e();return g`<div class="dynamic-counter">
        <p class="c-dynamic-counter__title">Nested:</p>
        <p class="c-dynamic-counter__subtitle">(slotted)</p>
        <p class="c-dynamic-counter__list">list index: ${r}</p>
        <span>${t`${"counter"}`}</span>
    </div>`};var D_=m.createComponent({tag:"dynamic-list-counter",component:L_,props:{parentListId:()=>({value:-1,type:Number}),counter:()=>({value:0,type:Number})}});var F_=()=>g`<div class="c-dynamic-list-empty">
        <p>empty comp</p>
        <mobjs-slot name="empty-slot"></mobjs-slot>
    </div>`;var B_=m.createComponent({tag:"dynamic-list-empty",component:F_});var V_=m.createComponent({tag:"dynamic-list-card",component:O_,props:{parentListId:()=>({value:-1,type:Number}),isFull:()=>({value:!1,type:Boolean}),label:()=>({value:"-",type:String}),index:()=>({value:-1,type:Number}),counter:()=>({value:1,type:Number})},state:{innerData:()=>({value:Xn[0],type:Array}),innerDataUnivoque:()=>({value:Xn[0],type:Array}),isSelected:()=>({value:!1,type:Boolean}),isMounted:()=>({value:!1,type:Boolean})},child:[D_,B_,_c,Yn]});var W_=({bindText:e})=>g`<div class="c-dynamic-list-slotted-label">
        <p class="content">${e`slotted: ${"label"}`}</p>
    </div>`;var j_=m.createComponent({tag:"dynamic-slotted-label",component:W_,props:{label:()=>({value:"",type:String})}});var H_=m.createComponent({tag:"dynamic-list-repeater",component:A_,props:{data:()=>({value:[],type:Array}),key:()=>({value:"",type:String}),clean:()=>({value:!1,type:Boolean}),listId:()=>({value:-1,type:Number}),counter:()=>({value:-1,type:Number}),label:()=>({value:"",type:String})},child:[V_,j_]});var z_=m.createComponent({tag:"dynamic-list",component:P_,state:{counter:()=>({value:1,type:Number,validate:e=>e<=10&&e>=0,strict:!0}),data:()=>({value:Tc,type:Array}),activeSample:()=>({value:3,type:Number})},child:[Yn,H_,_c]});m.useComponent([z_]);var U_=()=>g` <dynamic-list> </dynamic-list> `;var G_=({refs:e})=>{let t=z.createTimeTween({data:{scale:0},duration:3e3,ease:"easeOutBack",stagger:{each:8,from:"end"}}),r=z.createTimeTween({data:{scale:1},duration:6e3,ease:"easeInOutQuad",stagger:{each:12,from:"end"}});e.forEach(i=>{t.subscribeCache(i,({scale:a})=>{i.style.scale=`${a}`}),r.subscribeCache(i,({scale:a})=>{i.style.scale=`${a}`})});let o=we.createAsyncTimeline({repeat:1,autoSet:!1}).goTo(t,{scale:1}),n=we.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(r,{scale:1.1}),s=Z.watch("navigationIsOpen",i=>{if(i){o.isActive()&&o.pause(),n.isActive()&&n.pause();return}o.isActive()&&o.resume(),n.isActive()&&n.resume()});return{playIntro:()=>o?.play(),playSvg:()=>{n?.play()},destroy:()=>{s(),t.destroy(),t=null,o.destroy(),o=null,r.destroy(),r=null,n.destroy(),n=null}}};var nk=async({playIntro:e,playSvg:t})=>{await e(),t()},q_=({onMount:e,getProxi:t})=>{let r=t(),{svg:o}=r;return e(({element:n})=>{let s=[...n.querySelectorAll("svg")],{destroy:i,playIntro:a,playSvg:c}=G_({refs:s});return setTimeout(()=>{nk({playIntro:a,playSvg:c})},500),()=>{i()}}),g`<div class="l-index">
        <div class="l-index__logo">
            ${o.map(n=>g`${n}`).join("")}
        </div>
    </div>`};var J_=m.createComponent({tag:"home-component",component:q_,props:{svg:()=>({value:[],type:Array})},state:{isMounted:()=>({value:!1,type:Boolean})}});var yo=({svg:e,id:t})=>{let r=document.createRange().createContextualFragment(e),o=r.querySelectorAll('[type="layer"]'),n=r.querySelectorAll('[type="delete"]');return[...o].forEach(i=>{i.id!==t&&i.remove()}),[...n].forEach(i=>{i.remove()}),wv(r)};m.useComponent([J_]);var Y_=async()=>{let{data:e}=await te({source:"./asset/svg/ms_nord_type.svg?v=1.4"}),{data:t}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"}),[r,o,n,s,i,a,c,l,p,d,f]=["due","tre","quattro","cinque","sei","sette","otto","nove","dieci","undici","dodici"].map(h=>yo({svg:e,id:h}));return g`
        <div>
            <div class="background-shape">${t}</div>
            <home-component
                ${m.staticProps({svg:[r,o,n,s,i,a,c,l,p,d,f]})}
            ></home-component>
        </div>
    `};var X_=[{state:"level1",maxItem:10,ref:"level1_counter",label_plus:"level1 +",label_minus:"level1 -"},{state:"level2",maxItem:10,ref:"level2_counter",label_plus:"level2 +",label_minus:"level2 -"},{state:"level3",maxItem:6,ref:"level3_counter",label_plus:"level3 +",label_minus:"level3 -"}];function sk(e){return Math.floor(Math.random()*e)}var Sc=({delegateEvents:e,updateState:t,invalidate:r,proxi:o})=>g`
        ${X_.map(n=>g` <div class="matrioska__head__item">
                    <dynamic-list-button
                        class="matrioska__button"
                        ${e({click:async()=>{t(n.state,s=>s.slice(0,-1))}})}
                        >${n.label_minus}</dynamic-list-button
                    >
                    <dynamic-list-button
                        class="matrioska__button"
                        ${e({click:async()=>{t(n.state,s=>[...s,{key:sk(1e3),value:u.getUnivoqueId()}])}})}
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
    `;var Kn=e=>{m.useMethodByName(e).toggleActive()};var K_=({repeat:e,staticProps:t,bindProps:r,delegateEvents:o,proxi:n})=>g`
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
                                ${o({click:()=>{Kn(i)}})}
                            >
                            </matrioska-item>
                            <matrioska-item
                                class="matrioska-item--3"
                                name="${a}"
                                ${t({level:"level 3"})}
                                ${r(()=>({key:`${s.value.key}`,value:`${s.value.value}`,index:s.index,counter:n.counter}))}
                                ${o({click:()=>{Kn(a)}})}
                            >
                            </matrioska-item>
                        </div>
                    `}})}
        </div>
    `;var Q_=({repeat:e,staticProps:t,bindProps:r,delegateEvents:o,proxi:n})=>g`
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
                                ${K_({repeat:e,staticProps:t,delegateEvents:o,bindProps:r,proxi:n})}
                            </matrioska-item>
                        </div>
                    `})}
        </div>
    `;var Z_=({delegateEvents:e,updateState:t,repeat:r,staticProps:o,bindProps:n,invalidate:s,getProxi:i})=>{let a=i();return g`<div class="matrioska">
        <div class="matrioska__head">
            ${Sc({delegateEvents:e,updateState:t,invalidate:s,proxi:a})}
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
                                    ${Q_({repeat:r,staticProps:o,bindProps:n,delegateEvents:e,proxi:a})}
                                </matrioska-item>
                            </div>
                        `})}
            </div>
        </div>
    </div>`};var eS=({getProxi:e,bindText:t,id:r,bindEffect:o,addMethod:n})=>{let s=e();return n("toggleActive",()=>{s.active=!s.active}),g`<matrioska-item
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
    </matrioska-item>`};var tS=m.createComponent({tag:"matrioska-item",component:eS,props:{level:()=>({value:"",type:String}),key:()=>({value:"",strict:!0,type:String}),index:()=>({value:0,strict:!0,type:Number}),value:()=>({value:"",type:String}),counter:()=>({value:-1,type:Number})},state:{active:()=>({value:!1,type:Boolean})},style:":host { display: block; } "});var rS=({staticProps:e,delegateEvents:t,invalidate:r,bindProps:o,proxi:n})=>g` <div class="matrioska__level matrioska__level--3">
        ${r({observe:"level3",render:()=>n.level3.map((s,i)=>{let a=u.getUnivoqueId(),c=u.getUnivoqueId();return g`
                            <div
                                class="matrioska__item-wrap matrioska__item-wrap--3"
                            >
                                <matrioska-item
                                    class="matrioska-item--3"
                                    name="${a}"
                                    ${e({level:"level 3",value:s.value,index:i,key:`${s.key}`})}
                                    ${o(()=>({counter:n.counter}))}
                                    ${t({click:()=>{Kn(a)}})}
                                >
                                </matrioska-item>
                                <matrioska-item
                                    class="matrioska-item--3"
                                    name="${c}"
                                    ${e({level:"level 3",index:i,value:s.value,key:`${s.key}`})}
                                    ${o(()=>({counter:n.counter}))}
                                    ${t({click:()=>{Kn(c)}})}
                                >
                                </matrioska-item>
                            </div>
                        `}).join("")})}
    </div>`;var oS=({staticProps:e,bindProps:t,delegateEvents:r,invalidate:o,proxi:n})=>g`
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
                                        ${rS({staticProps:e,delegateEvents:r,invalidate:o,bindProps:t,proxi:n})}
                                    </matrioska-item>
                                </div>
                            `).join("")})}
        </div>
    `;var nS=({delegateEvents:e,updateState:t,staticProps:r,bindProps:o,invalidate:n,getProxi:s})=>{let i=s();return g`<div class="matrioska">
        <div class="matrioska__head">
            ${Sc({delegateEvents:e,updateState:t,invalidate:n,proxi:i})}
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
                                            ${oS({staticProps:r,bindProps:o,delegateEvents:e,invalidate:n,proxi:i})}
                                        </matrioska-item>
                                    </div>
                                `).join("")})}
            </div>
        </div>
    </div>`};var ik=e=>{for(let t=e.length-1;t>0;t--){let r=Math.floor(Math.random()*(t+1));[e[t],e[r]]=[e[r],e[t]]}return e},sS={state:{level1:()=>({value:[{key:1,value:u.getUnivoqueId()}],type:Array,validate:e=>e.length<=10,strict:!0}),level2:()=>({value:[{key:1,value:u.getUnivoqueId()},{key:2,value:u.getUnivoqueId()}],type:Array,validate:e=>e.length<=10,strict:!0}),level3:()=>({value:[{key:1,value:u.getUnivoqueId()},{key:2,value:u.getUnivoqueId()}],type:Array,transform:(e,t)=>e>t?ik(e):e,validate:e=>e.length<=6,strict:!0}),counter:()=>({value:0,type:Number})},child:[Yn,tS]},iS=m.createComponent({tag:"page-matrioska-repeat",component:Z_,...sS}),aS=m.createComponent({tag:"page-matrioska-invalidate",component:nS,...sS});m.useComponent([iS,aS]);var cS=()=>g` <page-matrioska-repeat> </page-matrioska-repeat> `,lS=()=>g` <page-matrioska-invalidate> </page-matrioska-invalidate> `;var ip=0,ak=({indicators:e,proxi:t})=>[...e].map((r,o)=>qe.createScrollTrigger({item:r,pin:!0,animateAtStart:!1,animatePin:!0,useThrottle:!0,ease:!1,dynamicStart:{position:"right",value:()=>window.innerWidth+ip-Fe(r)*(o+1)},dynamicEnd:{position:"right",value:()=>{let n=e.length-(o-2);return window.innerWidth/10*9*n}},onEnter:()=>{t.currentIdFromScroll=o},onLeaveBack:()=>{t.currentIdFromScroll=o-1}})),uS=({pins:e})=>{e.forEach(t=>t.refresh())},ck=({titles:e})=>[...e].map(t=>qe.createParallax({item:t,propierties:"x",reverse:!0,range:9})),pS=({nav:e})=>{e.classList.add("active"),[...document.querySelectorAll(".js-indicator")].forEach(r=>{r.classList.add("active")})},mS=({nav:e})=>{e.classList.remove("active"),[...document.querySelectorAll(".js-indicator")].forEach(r=>{r.classList.remove("active")})},dS=({indicators:e,titles:t,nav:r,animatePin:o,proxi:n,rootRef:s})=>{let i=ak({indicators:e,proxi:n}),a=ck({titles:t}),c=document.querySelector(".l-navcontainer__side");ip=Fe(c)/2;let l=u.useResize(()=>{ip=Fe(c)/2}),p=new Gs({root:s,container:".js-container",row:".js-row",column:".js-column",trigger:".js-trigger",shadowClass:".shadowClass",useWillChange:!0,useDrag:!0,useSticky:!o,useThrottle:!0,animateAtStart:!1,ease:!0,easeType:"lerp",addCss:!0,columnHeight:70,columnWidth:100,columnAlign:"center",animatePin:o,breakpoint:"tablet",children:[...i,...a],onEnter:()=>{uS({pins:i}),pS({nav:r})},onEnterBack:()=>{uS({pins:i}),pS({nav:r})},onLeave:()=>{mS({nav:r})},onLeaveBack:()=>{mS({nav:r})}});return p.init(),{destroy:()=>{i.forEach(d=>{d?.destroy()}),i=[],a.forEach(d=>{d?.destroy()}),a=[],p.destroy(),p=null,l()},refresh:()=>p.refresh()}};var lk=(e,t)=>e===0?1:e===t-1?-1:0,uk=({numOfCol:e,pinIsVisible:t,staticProps:r})=>{let o=t?"":"hidden";return[...Array.from({length:e}).keys()].map((n,s)=>g`
                <horizontal-scroller-section
                    ${r({id:s,pinClass:o})}
                ></horizontal-scroller-section>
            `).join("")},pk=({numOfCol:e,proxi:t,staticProps:r,delegateEvents:o})=>[...Array.from({length:e}).keys()].map((n,s)=>g`
                <horizontal-scroller-button
                    ${r({id:s})}
                    ${o({click:()=>t.currentId=s})}
                ></horizontal-scroller-button>
            `).join(""),hS=({onMount:e,watch:t,staticProps:r,delegateEvents:o,setRef:n,getRef:s,getProxi:i})=>{let a=i();return e(({element:c})=>{if(ce.mq("max","desktop"))return;let l=10,p=[...c.querySelectorAll(".js-indicator")],d=c.querySelector(".js-nav"),f=[...c.querySelectorAll(".js-title h1")],{destroy:h}=dS({rootRef:s().js_root,indicators:p,titles:f,nav:d,animatePin:a.animatePin,proxi:a});return window.scrollTo(0,0),t(()=>a.currentId,(v,b)=>{let T=c.querySelector(`.shadowClass--section-${v} .shadowClass--in-center`),{top:S}=he(T),_=ne(T),E=Number.parseInt(v)===0?window.innerHeight+1:S+_-window.innerHeight,C=Math.max(1,Math.abs(v-b)),w=2e3,N=1+(l-C)/l*.9,A=C/l*w*N;Or.to(E+lk(v,l),{duration:A})}),()=>{h()}}),ce.mq("max","desktop")?g`<div><only-desktop></only-desktop></div>`:g`<div class="l-h-scroller">
        <only-desktop></only-desktop>
        <div class="l-h-scroller__top">scroll down</div>
        <ul class="l-h-scroller__nav js-nav" ${n("js_nav")}>
            ${pk({numOfCol:10,proxi:a,staticProps:r,delegateEvents:o})}
        </ul>
        <div class="l-h-scroller__root js-root" ${n("js_root")}>
            <div
                class="l-h-scroller__container js-container"
                ${n("js_container")}
            >
                <div class="l-h-scroller__row js-row" ${n("js_root")}>
                    ${uk({numOfCol:10,pinIsVisible:!a.animatePin,staticProps:r})}
                </div>
                <div
                    class="l-h-scroller__trigger js-trigger"
                    ${n("js_trigger")}
                ></div>
            </div>
        </div>
        <div class="l-h-scroller__bottom">scroll up</div>
    </div>`};var fS=({getProxi:e})=>{let t=e();return g`
        <li>
            <button
                type="button"
                data-id="${t.id}"
                class="l-h-scroller__nav__btn"
            >
                ${t.id}
            </button>
        </li>
    `};var gS=m.createComponent({tag:"horizontal-scroller-button",component:fS,props:{id:()=>({value:-1,type:Number})}});var bS=({getState:e})=>{let{id:t,pinClass:r}=e();return g`
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
    `};var yS=m.createComponent({tag:"horizontal-scroller-section",component:bS,props:{id:()=>({value:-1,type:Number}),pinClass:()=>({value:"",type:String})}});var vS=m.createComponent({tag:"horizontal-scroller",component:hS,props:{animatePin:()=>({value:!1,type:Boolean})},state:{currentId:()=>({value:0,type:Number,skipEqual:!1}),currentIdFromScroll:()=>({value:0,type:Number})},child:[gS,yS]});m.useComponent([vS]);var TS=async()=>(xe({active:!0,prevRoute:"",nextRoute:"",backRoute:""}),g`<div>
        <horizontal-scroller
            ${m.staticProps({animatePin:!1})}
        ></horizontal-scroller>
    </div>`);var _S=({getState:e})=>{let{fill:t}=e();return g`
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
    `};var SS=m.createComponent({tag:"svg-star",component:_S,props:{fill:()=>({value:"#000000",type:String})}});var mk=({delegateEvents:e,bindEffect:t,bindObject:r,proxi:o})=>g`<div
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
    </div>`,xS=({bindProps:e,delegateEvents:t,bindObject:r,getProxi:o,bindEffect:n})=>{let s=o();return g`<div>
        <button
            type="button"
            class="c-move3d-page__controls__open"
            ${t({click:()=>{s.controlsActive=!0}})}
        >
            show controls
        </button>
        ${mk({delegateEvents:t,bindEffect:n,bindObject:r,proxi:s})}
        <move-3d
            ${e(()=>({shape:s.data,xDepth:s.xDepth,yDepth:s.yDepth,xLimit:s.xLimit,yLimit:s.yLimit,factor:s.factor,debug:s.debug}))}
        ></move-3d>
    </div>`};var dk=({debug:e,id:t})=>e?g`<span class="c-move3d-item__debug">${t}</span>`:"",ap=({data:e,root:t,childrenId:r,debug:o})=>e.map(({children:n,props:s})=>g`<move-3d-item
                name="${r}"
                ${m.staticProps({root:t,...s})}
            >
                ${dk({debug:o,id:s.id})}
                ${ap({data:n??[],root:!1,childrenId:r,debug:o})}
            </move-3d-item>`).join("");var cp=({element:e})=>({height:ne(e),width:Fe(e),offSetLeft:he(e).left,offSetTop:he(e).top}),CS=({childrenId:e})=>m.useMethodArrayByName(e).map(r=>o=>r?.move?.(o)),ES=({ratio:e})=>({get3dItemUnit:t=>`min(${t}px, calc((((100vw) * ${t}) / ${e} )))`});var Qn=()=>{},wS=({onMount:e,setRef:t,getRef:r,watch:o,computed:n,invalidate:s,getProxi:i,bindEffect:a})=>{let c=u.getUnivoqueId(),l=i(),p=0,d=0,f=0,h=0,v=0,b=0,T=0,S=0,_=!1,E=!1,C={x:0,y:0},w=0,I=Qn,N=Qn,A=Qn,O=Qn,R=Qn,F=Qn,k=[],M=z.createSpring({data:{delta:0,ax:0,ay:0}}),L=()=>{_=!1},D=()=>{let{vw:j,vh:X}=l.centerToViewoport||l.drag?{vw:window.innerWidth,vh:window.innerHeight}:{vw:d,vh:p},le=C.x,ye=C.y,{xgap:ee,ygap:pe}=_?E?(E=!1,{xgap:0,ygap:0}):{xgap:le-v,ygap:ye-T}:{xgap:0,ygap:0};_&&(b+=ee,S+=pe);let{xInMotion:ve,yInMotion:ge}=_?{xInMotion:b,yInMotion:S}:{xInMotion:le,yInMotion:ye},{ax:Ie,ay:De}=l.centerToViewoport||l.drag?{ax:-(j/2-ve)/l.xDepth,ay:(X/2-ge)/l.yDepth}:{ax:-(j/2-(ve-f))/l.xDepth,ay:(X/2-(ge-h))/l.yDepth};v=le,T=ye;let q=Ie>l.xLimit||Ie<-l.xLimit,Te=De>l.yLimit||De<-l.yLimit;q&&(b-=ee),Te&&(S-=pe);let et=ce.clamp(Ie,-l.xLimit,l.xLimit),ut=ce.clamp(De,-l.yLimit,l.yLimit),Ct=Math.sqrt(Math.pow(Math.abs(ut),2)+Math.pow(Math.abs(et),2));M.goTo({delta:Ct,ax:et,ay:ut}).catch(()=>{}),k.forEach(Ye=>{Ye({delta:Ct,factor:l.factor})})},x=j=>{w!==j&&(C.y-=w,w=j,C.y+=w),D()},P=({page:j})=>j.y>h&&j.y<h+p&&j.x>f&&j.x<f+d,$=({page:j})=>{P({page:j})&&(_=!0,E=!0)},B=()=>{F(),F=l.useScroll?u.useScroll(({scrollY:j})=>{x(j)}):()=>{}};return e(({element:j})=>{let{container:X}=r();l.afterInit(j);let le=M.subscribe(({delta:ve,ax:ge,ay:Ie})=>{X.style.transform=`translate3D(0,0,0) rotateY(${ge}deg) rotateX(${Ie}deg)`,l.onUpdate({delta:ve,deltaX:ge,deltaY:Ie})}),ye=M.onComplete(({ax:ve,ay:ge})=>{X.style.transform=`rotateY(${ve}deg) rotateX(${ge}deg)`}),ee=u.useMouseMove(({page:ve})=>{C={x:ve.x,y:ve.y},D()}),pe=u.useResize(()=>{({height:p,width:d,offSetTop:h,offSetLeft:f}=cp({element:j}))});return o(()=>l.drag,ve=>{if(R(),O(),A(),N(),I(),ve){b=window.innerWidth/2,S=window.innerHeight/2,I=u.useTouchStart(({page:ge})=>{$({page:ge})}),N=u.useTouchEnd(()=>{L()}),A=u.useMouseDown(({page:ge})=>{$({page:ge})}),O=u.useMouseUp(()=>{L()}),R=u.useTouchMove(({page:ge})=>{C={x:ge.x,y:ge.y},D()});return}},{immediate:!0}),o(()=>l.useScroll,(ve,ge)=>{if(ve){B();return}ve!==ge&&F()}),n(()=>l.useScroll,()=>!l.drag&&!l.centerToViewoport),u.useNextLoop(()=>{({height:p,width:d,offSetTop:h,offSetLeft:f}=cp({element:j})),C={x:window.innerWidth/2,y:window.innerHeight/2},D()}),()=>{le(),ye(),pe(),ee(),F(),I(),N(),A(),O(),R(),M.destroy(),k=[],M=null,p=null,d=null,f=null,h=null,v=null,b=null,T=null,S=null,_=null,E=null,C=null,w=null}}),g`<div
        class="c-move-3d"
        ${a({toggleClass:{"move3D--drag":()=>l.drag}})}
    >
        <div
            class="c-move-3d__scene"
            ${a({toggleStyle:{perspective:()=>`${l.perspective}px`}})}
        >
            <div class="c-move-3d__container" ${t("container")}>
                ${s({observe:[()=>l.shape,()=>l.debug],afterUpdate:()=>{k=CS({childrenId:c})},render:()=>ap({data:l.shape,root:!0,childrenId:c,debug:l.debug})})}
            </div>
        </div>
    </div>`};var lp=({startRotation:e,range:t,delta:r,limit:o})=>Number.parseFloat((t*r/o-e).toFixed(2)),IS=({rotate:e,anchorPoint:t,baseRotateX:r,baseRotateY:o})=>{if(!e||!t)return{rotateX:0,rotateY:0};switch(e.toUpperCase()){case"X":return(()=>{switch(t.toUpperCase()){case"BOTTOM":return{rotateX:r,rotateY:0};case"TOP":return{rotateX:-r,rotateY:0};default:return{rotateX:0,rotateY:0}}})();case"Y":return(()=>{switch(t.toUpperCase()){case"LEFT":return{rotateX:0,rotateY:o};case"RIGHT":return{rotateX:0,rotateY:-o};default:return{rotateX:0,rotateY:0}}})();case"XY":return(()=>{switch(t.toUpperCase()){case"TOP-LEFT":return{rotateX:-r,rotateY:o};case"TOP-RIGHT":return{rotateX:-r,rotateY:-o};case"BOTTOM-LEFT":return{rotateX:r,rotateY:o};case"BOTTOM-RIGHT":return{rotateX:r,rotateY:-o};default:return{rotateX:0,rotateY:0}}})();default:return{rotateX:0,rotateY:0}}};var hk=e=>e?.tagName.length===0?"":g`
        <div class="c-move3d-item__component ${e?.className}">
            <${e.tagName} ${m.staticProps(e?.props??{})}>
            </${e.tagName}>
        </div>`,fk=({delta:e,factor:t,initialRotate:r,depth:o,range:n,rotate:s,anchorPoint:i,lerp:a})=>{let c=Math.round(o*e/t),l={startRotation:r??0,range:n??20,delta:e,limit:t},p=lp(l),d=lp(l),f={rotate:s??"center",anchorPoint:i,baseRotateX:p,baseRotateY:d},{rotateX:h,rotateY:v}=IS(f);a.goTo({depth:c,rotateX:h,rotateY:v}).catch(()=>{})},MS=({getState:e,addMethod:t,onMount:r})=>{let{root:o,anchorPoint:n,animate:s,depth:i,rotate:a,width:c,height:l,offsetX:p,offsetY:d,range:f,initialRotate:h,initialDepth:v,classList:b,component:T}=e(),S=o?"is-root":"is-children",_=`--item-width:${c};`,E=`--item-height:${l};`,C=`--offset-x:${p};`,w=`--offset-y:${d};`,I=z.createLerp({data:{depth:0,rotateX:0,rotateY:0}});return t("move",({delta:N,factor:A})=>{s&&fk({delta:N,factor:A,initialRotate:h,depth:i,range:f,rotate:a,anchorPoint:n,lerp:I})}),r(({element:N})=>{let A=I.subscribe(({depth:F,rotateX:k,rotateY:M})=>{let L=F+v;N.style.transform=`translate3D(0,0,${L}px) rotateX(${k}deg) rotateY(${M}deg)`}),O=I.onComplete(({depth:F,rotateX:k,rotateY:M})=>{let L=F+v;N.style.transform=`translateZ(${L}px) rotateX(${k}deg) rotateY(${M}deg)`}),R=v;return N.style.transform=`translateZ(${R}px)`,()=>{A(),O(),I.destroy(),I=null}}),g`<div
        class="c-move3d-item ${S} anchor-${n}"
        style="${_}${E}${C}${w}"
    >
        <div class="c-move3d-item__content ${b}"></div>
        ${hk({tagName:T?.tagName??"",className:T?.className??"",props:T?.props??{}})}
        <mobjs-slot></mobjs-slot>
    </div>`};var kS=m.createComponent({tag:"move-3d-item",component:MS,props:{root:()=>({value:!0,type:Boolean}),depth:()=>({value:0,type:Number}),rotate:()=>({value:"x",type:String}),width:()=>({value:"0px",type:String}),height:()=>({value:"0px",type:String}),offsetX:()=>({value:"0px",type:String}),offsetY:()=>({value:"0px",type:String}),range:()=>({value:20,type:Number}),anchorPoint:()=>({value:"center",type:String}),animate:()=>({value:!0,type:Boolean}),initialRotate:()=>({value:0,type:Number}),initialDepth:()=>({value:0,type:Number}),classList:()=>({value:"",type:String}),component:{tagName:()=>({value:"",type:String}),className:()=>({value:"",type:String}),props:()=>({value:"",type:"any"})}},state:{id:()=>({value:"",type:String})}});var Zn=m.createComponent({tag:"move-3d",component:wS,props:{drag:()=>({value:!1,type:Boolean}),centerToViewoport:()=>({value:!1,type:Boolean}),perspective:()=>({value:700,type:Number}),xDepth:()=>({value:20,type:Number,validate:e=>e>1,strict:!0}),yDepth:()=>({value:20,type:Number,validate:e=>e>1,strict:!0}),xLimit:()=>({value:1e4,type:Number}),yLimit:()=>({value:1e4,type:Number}),factor:()=>({value:45,type:Number,validate:e=>e>1,strict:!0}),shape:()=>({value:[],type:Array}),debug:()=>({value:!1,type:Boolean}),afterInit:()=>({value:()=>{},type:Function}),onUpdate:()=>({value:()=>{},type:Function})},state:{useScroll:()=>({value:!0,type:Boolean})},child:[kS]});var RS=m.createComponent({tag:"move-3d-page",component:xS,props:{data:()=>({value:[],type:Array})},state:{xDepth:()=>({value:20,type:Number}),yDepth:()=>({value:20,type:Number}),xLimit:()=>({value:1e3,type:Number}),yLimit:()=>({value:1e3,type:Number}),perspective:()=>({value:700,type:Number}),debug:()=>({value:!1,type:Boolean}),factor:()=>({value:45,type:Number,validate:e=>e>1,strict:!0}),controlsActive:()=>({value:!1,type:Boolean})},child:[Zn]});m.useComponent([RS,SS]);var NS=async({props:e})=>{let{data:t,prevRoute:r,nextRoute:o}=e,{data:n}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:r,nextRoute:o,backRoute:"#plugin-overview"}),g` <div>
        <div class="background-shape">${n}</div>
        <move-3d-page
            ${m.staticProps({data:t})}
        ></move-3d-page>
    </div>`};var{get3dItemUnit:H}=ES({ratio:1980}),PS=[{props:{id:0,depth:0,anchorPoint:"center",classList:"move3d-square",animate:!0,width:H(150),height:H(150)},children:[{props:{id:1,depth:200,width:H(150),height:H(150),rotate:"",anchorPoint:"center",initialDepth:100,classList:"move3d-square has-star pippo",component:{tagName:"svg-star",className:"move3d-square__star",props:{fill:"#f28f3b"}},animate:!0},children:[]},{props:{id:2,depth:200,width:H(80),height:H(80),offsetX:H(40),offsetY:H(40),rotate:"",initialDepth:200,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:3,depth:200,width:H(80),height:H(80),offsetX:H(-10),offsetY:H(80),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:4,depth:200,width:H(80),height:H(80),offsetX:H(80),offsetY:H(80),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:5,depth:200,width:H(80),height:H(80),offsetX:H(-10),offsetY:H(-10),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:6,depth:200,width:H(80),height:H(80),offsetX:H(80),offsetY:H(-10),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:7,depth:100,width:H(150),height:H(150),rotate:"x",range:20,anchorPoint:"bottom",classList:"move3d-square",animate:!0},children:[{props:{id:8,depth:0,width:H(150),height:H(150),rotate:"x",range:30,anchorPoint:"bottom",classList:"move3d-square",animate:!0},children:[]}]},{props:{id:9,depth:100,width:H(150),height:H(150),rotate:"x",range:20,anchorPoint:"top",classList:"move3d-square",animate:!0},children:[{props:{id:10,depth:0,width:H(150),height:H(150),rotate:"x",range:20,anchorPoint:"top",classList:"move3d-square",animate:!0},children:[]}]},{props:{id:11,depth:100,width:H(150),height:H(150),rotate:"y",range:20,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[{props:{id:12,depth:0,width:H(150),height:H(150),rotate:"y",range:30,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[{props:{id:13,depth:0,width:H(150),height:H(150),rotate:"y",range:40,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[]}]}]},{props:{id:13,depth:100,width:H(150),height:H(150),rotate:"y",range:20,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[{props:{id:14,depth:0,width:H(150),height:H(150),rotate:"y",range:30,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[{props:{id:15,depth:0,width:H(150),height:H(150),rotate:"y",range:40,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[]}]}]},{props:{id:16,depth:150,rotate:"xy",width:H(150),height:H(150),offsetX:H(20),offsetY:H(20),range:20,anchorPoint:"bottom-left",classList:"move3d-square",animate:!0},children:[{props:{id:17,depth:100,rotate:"",width:H(150),height:H(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:18,depth:150,rotate:"xy",width:H(150),height:H(150),offsetX:H(20),offsetY:H(20),range:20,anchorPoint:"bottom-right",classList:"move3d-square",animate:!0},children:[{props:{id:19,depth:100,rotate:"",width:H(150),height:H(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:20,depth:150,rotate:"xy",width:H(150),height:H(150),offsetX:H(20),offsetY:H(20),range:20,anchorPoint:"top-left",classList:"move3d-square",animate:!0},children:[{props:{id:21,depth:100,rotate:"",width:H(150),height:H(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:22,depth:150,rotate:"xy",width:H(150),height:H(150),offsetX:H(20),offsetY:H(20),range:20,anchorPoint:"top-right",classList:"move3d-square",animate:!0},children:[{props:{id:23,depth:100,rotate:"",width:H(150),height:H(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]}]}];var AS={shape1:{prevRoute:"",nextRoute:"#plugin-dragger",data:PS}};var OS=({getState:e})=>{let{content:t}=e();return g`${t}`};var es=m.createComponent({tag:"any-component",component:OS,props:{content:()=>({value:"",type:String})}});var $S=({elements:e})=>{let t=180/Math.PI,r=window.innerWidth,o=window.innerHeight,n=0,s=0,i=0,a=0,c=z.createSpring({data:{x:0,y:0},stagger:{each:3,from:"start"}});e.forEach(f=>{c.subscribe(({x:h,y:v})=>{f.style.translate=`${h}px ${v}px`})});let l=z.createSpring({data:{rotation:0},stagger:{each:8,from:"start"}});e.forEach(f=>{f&&l.subscribeCache(f,({rotation:h})=>{f.style.rotate=`${h}deg`})});let p=u.useResize(()=>{r=window.innerWidth,o=window.innerHeight}),d=u.useMouseMove(({client:f})=>{let{x:h,y:v}=f,b=v-n,T=h-s;if(Math.abs(T)>10||Math.abs(b)>10){n=v,s=h;let _=Math.atan2(b,T)*t+180,E=Math.abs(i-_);E>180&&i<_&&(a-=E),E>180&&i>_&&(a+=E);let C=_+a+90;l.goTo({rotation:C}),i=_}c.goTo({x:h-r/2,y:v-o/2})});return{destroy:()=>{c.destroy(),c=null,l.destroy(),l=null,p(),d(),r=null,o=null,n=null,s=null,i=null,a=null}}};var gk=5,LS=({onMount:e,getRefs:t,setRef:r})=>{let{starOutline:o}=ft(),n=[...Array.from({length:gk}).keys()].map(()=>`<span class='mouse-trail__item' ${r("star")}>${o}</span>`).join("");return e(()=>{let{star:s}=t(),{destroy:i}=$S({elements:s});return()=>{i()}}),g`<div class="mouse-trail">${n}</div>`};var xc=m.createComponent({tag:"mouse-trail",component:LS});var DS=({u0:e,u1:t,o:r,o_b:o,m1:n,m2:s,m3:i,m4:a,b1:c,b1_b:l,b3:p,b4:d,b5:f,sign:h,m1_b:v,m3_b:b,m4_b:T,b1_stone:S,m1_stone:_})=>[{props:{id:0,depth:200,anchorPoint:"center",classList:"",animate:!0},children:[{props:{id:1,depth:-500,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:e}}},children:[]},{props:{id:1,depth:-50,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:t}}},children:[]},{props:{id:2,depth:20,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:r}}},children:[{props:{id:2,depth:21,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:o}}},children:[]},{props:{id:3,depth:100,anchorPoint:"right",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:n}}},children:[{props:{id:3,depth:20,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:v}}},children:[]},{props:{id:6,depth:45,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:a}}},children:[]},{props:{id:6,depth:20,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:T}}},children:[]},{props:{id:6,depth:20,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:_}}},children:[]},{props:{id:4,depth:65,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:s}}},children:[]},{props:{id:4,depth:20,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:h}}},children:[]},{props:{id:5,depth:30,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:i}}},children:[]},{props:{id:5,depth:20,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:b}}},children:[]}]},{props:{id:6,depth:100,anchorPoint:"left",initialDepth:0,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:l}}},children:[{props:{id:6,depth:51,anchorPoint:"center",initialDepth:1,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:c}}},children:[]},{props:{id:7,depth:120,anchorPoint:"center",initialDepth:20,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:S}}},children:[]},{props:{id:8,depth:70,initialDepth:10,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:p}}},children:[]},{props:{id:10,depth:170,anchorPoint:"center",initialDepth:10,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:d}}},children:[]},{props:{id:11,depth:100,anchorPoint:"center",initialDepth:1,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:f}}},children:[]}]}]}]}];m.useComponent([Zn,es,xc]);var FS=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=0.9"}),{data:t}=await te({source:"./asset/svg/rdp.svg?v=1.3"}),[r,o,n,s,i,a,c,l,p,d,f,h,v,b,T,S,_,E,C]=["U0_block","U1_block","O_block","O_b_block","M1_block","M1_b_block","M2_block","M3_block","M3_b_block","M4_block","M4_b_block","B1_block","B1_b_block","B3_block","B4_block","B5_block","sign","Bstone_1_block","Mstone_1_block"].map(w=>yo({svg:e,id:w}));return xe({active:!0,prevRoute:"#rdp-01",nextRoute:"#mob-02",backRoute:"#svg-overview"}),g`<div class="l-mob-01">
        <div class="background-shape">${t}</div>
        <mouse-trail></mouse-trail>
        <move-3d
            ${m.staticProps({shape:DS({u0:r,u1:o,o:n,o_b:s,m1:i,m2:c,m3:l,m4:d,b1:h,b1_b:v,b3:b,b4:T,b5:S,sign:_,m1_b:a,m3_b:p,m4_b:f,b1_stone:E,m1_stone:C}),xDepth:100,yDepth:30,factor:20,xLimit:10,yLimit:20,drag:!0,perspective:1e3})}
        ></move-3d>
    </div>`};var BS=()=>ce.mq("min","desktop"),VS="#home",up=null;m.afterRouteChange(({currentRoute:e})=>{e!=="onlyDesktop"&&(up=m.getActiveParams(),VS=e)});var WS=({onMount:e,getProxi:t,bindEffect:r,watch:o})=>{let n=t();return n.active=BS(),e(()=>{let s=u.useResize(()=>{n.active=BS()});return o(()=>n.active,i=>{i&&m.loadUrl({url:VS,params:up??{}})}),()=>{s(),up=null}}),g`
        <a
            href="#home"
            class="l-only-desktop__link"
            ${r({toggleClass:{active:()=>n.active}})}
        >
            home page
        </a>
    `};var jS=m.createComponent({tag:"only-desktop-cta",component:WS,state:{active:()=>({value:!1,type:Boolean,skipEqual:!1})}});m.useComponent([jS]);var HS=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob-only-desktop.svg?v=0.1"}),{data:t}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return g`
        <div class="l-only-desktop">
            <div class="l-only-desktop__content">
                <div class="background-shape">${t}</div>
                <h1 class="l-only-desktop__title">MobProject v0.1</h1>
                <h2 class="l-only-desktop__subtitle">ops...<br /></h2>
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
                <h3 class="l-only-desktop__subtitle">My apologies ...</h3>
                <div>
                    <only-desktop-cta></only-desktop-cta>
                </div>
                <div class="l-only-desktop__svg">${e}</div>
            </div>
        </div>
    `};var pp=({canvas:e,disableOffcanvas:t})=>{let{useOffscreen:r,context:o}=yt({disableOffcanvas:t}),n=!0,s=e.getContext(o,{alpha:!0}),i=m.getActiveRoute(),{offscreen:a,offScreenCtx:c}=vt({useOffscreen:r,canvas:e}),l=r?c:s,p=Jn(l);l=null,e.width=e.clientWidth,e.height=e.clientHeight;let d=10,f=10,h=window.innerHeight>=800?window.innerHeight/18:window.innerHeight/20,v=window.innerHeight>=800?window.innerHeight/18:window.innerHeight/20,T=bo({canvas:e,numberOfRow:d,numberOfColumn:f,cellWidth:h,cellHeight:v,gutter:1}).items,S=T.map(D=>({...D,scale:1,rotate:0})),_=({row:D,col:x})=>{let P=(f+1)*D;return S[P+x]},C={..._({row:1,col:1}),scale:1,rotate:0},I={..._({row:4,col:5}),scale:1,rotate:0},N=z.createTimeTween({ease:"easeInOutQuad",stagger:{each:10,from:"edges"},data:{scale:1,rotate:0}}),A=z.createTimeTween({data:C,duration:1e3,ease:"easeInOutBack"}),O=z.createSpring({data:I});S.forEach(D=>{N.subscribeCache(D,({scale:x,rotate:P})=>{D.rotate=P,D.scale=x})}),A.subscribe(D=>{C=D}),O.subscribe(D=>{I=D});let R=we.createAsyncTimeline({repeat:-1,autoSet:!1,yoyo:!0});R.goTo(N,{scale:.2,rotate:90},{duration:1e3});let F=we.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1});F.goTo(A,{x:_({row:1,col:8}).x,rotate:360,scale:2}).createGroup({waitComplete:!1}).goTo(A,{y:_({row:8,col:8}).y,rotate:180}).goTo(O,{y:_({row:0,col:8}).y},{delay:500}).closeGroup().label({name:"my-label"}).createGroup({waitComplete:!1}).goTo(A,{x:_({row:8,col:1}).x,rotate:0,scale:1}).goTo(O,{rotate:360,scale:2},{delay:0}).closeGroup().createGroup({waitComplete:!1}).goTo(A,{y:_({row:1,col:1}).y,rotate:-180},{duration:1e3}).goTo(O,{rotate:0,y:_({row:8,col:8}).y,scale:1},{delay:200}).closeGroup();let k=()=>{if(!s)return;r&&a&&(a.width=e.width,a.height=e.height);let D=r?c:s;if(D){e.width=e.width,S.forEach(({x,y:P,width:$,height:B,rotate:j,scale:X,offsetXCenter:le,offsetYCenter:ye},ee)=>{if(ee===40){let Ie=Math.PI/180*C.rotate,De=Math.cos(Ie)*C.scale,q=Math.sin(Ie)*C.scale;D.setTransform(De,q,-q,De,Math.floor(C.offsetXCenter+C.x),Math.floor(C.offsetYCenter+C.y)),p?(D.beginPath(),D.roundRect(Math.floor(-C.width/2),Math.floor(-C.height/2),Math.floor(C.width),C.height,5)):(D.beginPath(),D.rect(Math.floor(-C.width/2),Math.floor(-C.height/2),Math.floor(C.width),Math.floor(C.height))),D.fillStyle="#000000",D.fill()}let pe=Math.PI/180*j,ve=Math.cos(pe)*X,ge=Math.sin(pe)*X;D.setTransform(ve,ge,-ge,ve,Math.floor(le+x),Math.floor(ye+P)),p?(D.beginPath(),D.roundRect(Math.floor(-$/2),Math.floor(-B/2),$,B,5)):(D.beginPath(),D.rect(Math.floor(-$/2),Math.floor(-B/2),$,B)),D.fillStyle="rgba(238, 238, 238, 0.9)",D.fill()});{let x=Math.PI/180*I.rotate,P=Math.cos(x)*I.scale,$=Math.sin(x)*I.scale;D.setTransform(P,$,-$,P,Math.floor(I.offsetXCenter+I.x),Math.floor(I.offsetYCenter+I.y)),p?(D.beginPath(),D.roundRect(Math.floor(-I.width/2),Math.floor(-I.height/2),Math.floor(I.width),Math.floor(I.height),5)):(D.beginPath(),D.rect(Math.floor(-I.width/2),Math.floor(-I.height/2),Math.floor(I.width),Math.floor(I.height))),D.fillStyle="#a86464",D.fill()}Tt({useOffscreen:r,offscreen:a,ctx:s})}},M=()=>{k(),n&&u.useNextFrame(()=>M())};u.useFrame(()=>{M()});let L=Z.watch("navigationIsOpen",u.useDebounce(D=>{if(D){F.pause(),R.pause(),n=!1;return}setTimeout(async()=>{m.getActiveRoute().route===i.route&&(F.resume(),R.resume(),n=!0,u.useFrame(()=>M()))},200)},200));return{destroy:()=>{L(),s=null,a=null,c=null,T=[],n=!1,N?.destroy?.(),A?.destroy?.(),O?.destroy?.(),F?.destroy?.(),R?.destroy?.(),S=null,C=null,I=null,o=null,N=null,A=null,O=null,F=null,R=null},play:()=>{F.play(),R.isActive()||R.play()},playReverse:()=>{F.playReverse(),R.isActive()||R.play()},playFromLabel:()=>{F.setTween("my-label",[A,O]).then(()=>{F.playFrom("my-label").then(()=>{console.log("resolve promise playFrom")})}),R.isActive()||R.play()},playFromLabelReverse:()=>{F.setTween("my-label",[A,O]).then(()=>{F.playFromReverse("my-label").then(()=>{console.log("resolve promise playFrom")})}),R.isActive()||R.play()},revertNext:()=>{F.reverseNext()},pause:()=>{F.pause(),R.pause()},resume:()=>{F.resume(),R.resume()},stop:()=>{F.stop(),R.stop()}}};function bk({buttons:e}){return Object.entries(e).map(([t,r])=>{let{label:o}=r;return g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn ${t}"
                >
                    ${o}
                </button>
            </li>`}).join("")}var zS=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s,delegateEvents:i})=>{let a=s(),c={},l=()=>{};return e(({element:p})=>{let{canvas:d}=o();u.useFrame(()=>{u.useNextTick(()=>{l(),c=pp({canvas:d,...t()}),l=c.destroy,c?.play?.()})});let f=u.useResize(()=>{l(),c=pp({canvas:d,...t()}),l=c.destroy,c?.play?.()});return Object.entries(a.buttons).forEach(([h,v])=>{let{method:b}=v;p.querySelector(`.${h}`)?.addEventListener("click",()=>c?.[b]())}),u.useFrame(()=>{a.isMounted=!0}),()=>{f(),l()}}),g`
        <div>
            <div class="c-canvas">
                <div class="background-shape">${a.background}</div>
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
                        ${bk({buttons:a.buttons})}
                    </ul>
                    <canvas ${r("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var yk={"js-async-timeline-play":{label:"play",method:"play"},"js-async-timeline-playReverse":{label:"play reverse",method:"playReverse"},"js-async-timeline-play-label":{label:"play from label",method:"playFromLabel"},"js-async-timeline-playReverse-label":{label:"play from label reverse",method:"playFromLabelReverse"},"js-async-timeline-pause":{label:"pause",method:"pause"},"js-async-timeline-resume":{label:"resume",method:"resume"},"js-async-timeline-revert-next":{label:"revert next",method:"revertNext"},"js-async-timeline-stop":{label:"stop",method:"stop"}},US=m.createComponent({tag:"async-timeline",component:zS,props:{background:"",disableOffcanvas:()=>({value:!!(ht()||dt()),type:Boolean})},state:{isMounted:!1,controlsActive:()=>({value:!1,type:Boolean}),buttons:()=>({value:yk,type:"Any"})}});m.useComponent([US]);var GS=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"#caterpillarN2",nextRoute:"#animatedPatternN0?version=0&activeId=0",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <async-timeline
            ${m.staticProps({background:e})}
        ></async-timeline>
    </div>`};var qS=({letter_d:e,letter_p:t,letter_r:r,letter_r_shadow:o,letter_d_shadow:n,letter_p_shadow:s,letter_r_pieces:i,letter_d_pieces:a,letter_p_pieces:c,letter_r_fill:l,letter_d_fill:p,letter_p_fill:d})=>[{props:{id:0,depth:200,anchorPoint:"center",classList:"",animate:!0},children:[{props:{id:0,depth:100,offsetX:"-2",offsetY:"-2",anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:e}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:n}}},children:[]},{props:{id:0,depth:40,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:a}}},children:[]},{props:{id:0,depth:100,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:p}}},children:[]},{props:{id:0,depth:-100,initialDepth:-1,offsetX:"-10",anchorPoint:"right",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:r}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:o}}},children:[]},{props:{id:0,depth:20,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:i}}},children:[]},{props:{id:0,depth:30,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:l}}},children:[]}]},{props:{id:0,depth:100,initialDepth:0,anchorPoint:"left",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:t}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:s}}},children:[]},{props:{id:0,depth:20,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:c}}},children:[]},{props:{id:0,depth:30,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:d}}},children:[]}]}]}]}];m.useComponent([Zn,es,xc]);var JS=async()=>{let{data:e}=await te({source:"./asset/svg/rdp.svg?v=0.4"}),{data:t}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"}),[r,o,n,s,i,a,c,l,p,d,f,h]=["letter_d","letter_r","letter_p","letter_r_shadow","letter_d_shadow","letter_p_shadow","letter_r_pieces","letter_d_pieces","letter_p_pieces","letter_r_fill","letter_d_fill","letter_p_fill"].map(v=>yo({svg:e,id:v}));return xe({active:!0,prevRoute:"",nextRoute:"#mob-01",backRoute:"#svg-overview"}),g`<div class="l-rdp-01">
        <div class="background-shape">${t}</div>
        <mouse-trail></mouse-trail>
        <move-3d
            ${m.staticProps({shape:qS({letter_d:r,letter_r:o,letter_p:n,letter_r_shadow:s,letter_d_shadow:i,letter_p_shadow:a,letter_r_pieces:c,letter_d_pieces:l,letter_p_pieces:p,letter_r_fill:d,letter_d_fill:f,letter_p_fill:h}),xDepth:100,yDepth:30,factor:20,xLimit:10,yLimit:20,drag:!0,perspective:1e3})}
        ></move-3d>
    </div>`};var YS=({screenElement:e,scrollerElement:t,layer02:r})=>{let o=qe.createParallax({item:r,align:"center",range:8,propierties:"x",ease:!1}),n=new xt({screen:e,scroller:t,direction:"horizontal",drag:!0,useHorizontalScroll:!0,easeType:"lerp",breakpoint:"small",children:[o]});return n.init(),n.set(55),{destroy:()=>{n.destroy(),o.destroy(),n=null,o=null}}};var XS=({getState:e,onMount:t,setRef:r,getRef:o})=>{let{layer02:n,layer03:s}=e();return t(()=>{let{screen:i,scroller:a,layer02:c}=o(),{destroy:l}=YS({screenElement:i,scrollerElement:a,layer02:c});return()=>{l()}}),g`<div class="mobbu2025">
        <div class="mobbu2025__screen" ${r("screen")}>
            <div class="mobbu2025__scroller" ${r("scroller")}>
                <div class="mobbu2025__layer">${s}</div>
                <div
                    class="mobbu2025__layer no-pointer-event"
                    ${r("layer02")}
                >
                    ${n}
                </div>
            </div>
        </div>
    </div>`};var KS=m.createComponent({tag:"mobbu-2025",component:XS,props:{layer02:()=>({value:"",type:String}),layer03:()=>({value:"",type:String})}});m.useComponent([KS]);var QS=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob-2025-pure-optimized.svg?v=0.2"}),{data:t}=await te({source:"./asset/svg/lettering-mob.svg?v=1.4"}),[r,o]=["layer-02","layer-03"].map(n=>yo({svg:e,id:n}));return xe({active:!0,prevRoute:"#mob-01",nextRoute:"",backRoute:"#svg-overview"}),g`<div class="l-mob-02">
        <div class="background-shape">${t}</div>
        <h3 class="l-mob-02__title">Scroll or Drag</h3>
        <mobbu-2025
            ${ya({layer02:r,layer03:o})}
        ></mobbu-2025>
    </div>`};var ZS="TOP-LEFT",ex="TOP-RIGHT",tx="BOTTOM-LEFT",rx="BOTTOM-RIGHT",ox="CENTER";var vk=e=>{let r=globalThis.getComputedStyle(e).transform;if(r==="none")return 0;let o=r.match(/matrix3d\(([^)]+)\)/);return o&&o[1].split(",").map(Number)[14]||0},nx=({align:e,root:t,child:r,containerClass:o,childrenClass:n,perspective:s,usePrespective:i,maxLowDepth:a=-200,maxHightDepth:c=200,onDepthChange:l=()=>{},depthFactor:p=30,hideThreshold:d=1})=>{let f=document.querySelector(o);f&&(f.style.cursor="grab");let h=[...f.querySelectorAll(n)],v=h.map(q=>{let Te=window.innerWidth,et=window.innerHeight,ut=q.offsetWidth,Ct=q.offsetHeight,Ye=vk(q),ss=s-s*ut/(Te*d)-Ye,Fr=s-s*Ct/(et*d)-Ye;return Math.min(ss,Fr)}),b=()=>{h.forEach((q,Te)=>{let et=_>v[Te];q.classList.toggle("hide",et)})},T=0,S=0,_=0,E=0,C=0,w=r.offsetWidth,I=r.offsetHeight,N=t.offsetWidth,A=t.offsetHeight,O=(w-N)/2,R=(I-A)/2,F={x:0,y:0},k=!1,M=!1,L=30,D=()=>{if(i&&s>0){let q=s/(s-_);O=(w-N/q)/2,R=(I-A/q)/2}else O=(w-N)/2,R=(I-A)/2};D();let x={xValue:0,yValue:0},P=z.createSpring({data:{x:0,y:0,z:0}});switch(e){case ZS:{x={xValue:O,yValue:R},S=w,T=I;break}case ex:{x={xValue:-O,yValue:R},S=-w,T=I;break}case tx:{x={xValue:O,yValue:-R},S=w,T=-I;break}case rx:{x={xValue:-O,yValue:-R},S=-w,T=-I;break}}let $=P.subscribe(({x:q,y:Te,z:et})=>{r&&(r.style.transform=`translate3D(${q}px, ${Te}px, ${et}px)`)});P.set({x:x.xValue,y:x.yValue}),[...t.querySelectorAll("a, button")].forEach(q=>{q.setAttribute("draggable","false"),q.style.userSelect="none"});let j=({page:q})=>{k=!0,M=!0,F={x:q.x,y:q.y}},X=({page:q})=>{let{x:Te,y:et}=q,{xgap:ut,ygap:Ct}=k?M?(M=!1,{xgap:0,ygap:0}):{xgap:Te-E,ygap:et-C}:{xgap:0,ygap:0},Ye=O>0?ce.clamp(S+ut,-O,O):ce.clamp(S+ut,O,-O),ss=R>0?ce.clamp(T+Ct,-R,R):ce.clamp(T+Ct,R,-R),Fr=k?Ye:S,Y=k?ss:T,{xComputed:is,yComputed:je}=k?{xComputed:Fr,yComputed:Y}:{xComputed:Te,yComputed:et};S=Fr,T=Y,E=Te,C=et,k&&(x={xValue:is,yValue:je},P.goTo({x:is,y:je}).catch(()=>{}))},le=u.useTouchStart(({page:q,target:Te})=>{j({page:q,target:Te})}),ye=u.useMouseDown(({page:q,target:Te})=>{j({page:q,target:Te})}),ee=u.useTouchEnd(()=>{k=!1}),pe=u.useMouseUp(()=>{k=!1}),ve=u.useMouseMove(({page:q})=>{X({page:q})}),ge=u.useTouchMove(({page:q})=>{X({page:q})});f&&f.addEventListener("click",q=>{let{x:Te,y:et}=F,ut=Math.abs(E-Te)>L,Ct=Math.abs(C-et)>L;(ut||Ct)&&q.preventDefault()},!1),i&&f&&f.addEventListener("wheel",q=>{let{spinY:Te}=u.normalizeWheel(q);_=ce.clamp(_+Te*p,a,c),D(),S=O>0?ce.clamp(S,-O,O):ce.clamp(S,O,-O),T=R>0?ce.clamp(T,-R,R):ce.clamp(T,R,-R),l({depth:_}),P.goTo({x:S,y:T,z:_}).catch(()=>{})},{passive:!0});let Ie=u.useMouseWheel(u.useDebounce(()=>{b()},100)),De=u.useResize(()=>{w=r.offsetWidth,I=r.offsetHeight,N=t.offsetWidth,A=t.offsetHeight,D()});return{destroy:()=>{$(),le(),ee(),ye(),pe(),ve(),ge(),De(),Ie(),P.destroy(),P=null,f=null,h=null,t=null,r=null}}};var sx=({getProxi:e,setRef:t,getRef:r,bindEffect:o,onMount:n})=>{let s=e();return n(({element:i})=>{let{child:a}=r(),c=a.firstChild;if(!c)return;let l=nx({align:s.align,root:i,child:c,usePrespective:s.usePrespective,perspective:s.perspective,maxLowDepth:s.maxLowDepth,maxHightDepth:s.maxHightDepth,depthFactor:s.depthFactor,onDepthChange:s.onDepthChange,containerClass:s.containerClass,childrenClass:s.childrenClass,hideThreshold:s.hideThreshold});return s.afterInit({root:i}),()=>{l.destroy(),i.remove(),a.remove(),a=null,c=null,i=null}}),g`<div class="c-dragger ${s.rootClass}">
        <!-- Root border -->
        <mobjs-slot name="root-slot"></mobjs-slot>

        <!-- Child -->
        <div
            class="c-dragger__wrapper"
            ${t("child")}
            ${o({toggleStyle:{perspective:()=>`${s.perspective}px`}})}
        >
            <mobjs-slot name="child-slot"></mobjs-slot>
        </div>
    </div>`};var ix=m.createComponent({tag:"c-dragger",component:sx,props:{rootClass:()=>({value:"",type:String}),childrenClass:()=>({value:"",type:String}),containerClass:()=>({value:"",type:String}),initialZoom:()=>({value:1,type:Number}),ease:()=>({value:!0,type:Boolean}),align:()=>({value:ox,type:String,transform:e=>e.toUpperCase()}),usePrespective:()=>({value:!0,type:Boolean}),perspective:()=>({value:600,type:Number}),hideThreshold:()=>({value:1,type:Number}),depthFactor:()=>({value:30,type:Number}),maxLowDepth:()=>({value:-200,type:Number}),maxHightDepth:()=>({value:200,type:Number}),afterInit:()=>({value:()=>{},type:Function}),onDepthChange:()=>({value:()=>{},type:Function})}});m.useComponent([ix,es]);var ax=!1,cx=async()=>{let{data:e}=await te({source:"./asset/svg/ms_nord_compact.svg?v=1.3"}),{data:t}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});xe({active:!0,prevRoute:"#move3D-shape1",nextRoute:"#math-animation-01",backRoute:"#plugin-overview"});let r=g`
        <div class="dragger-border">
            <h3 class="dragger-border__title">Drag and zoom</h3>
            <div class="dragger-border__top-left"></div>
            <div class="dragger-border__top-right"></div>
            <div class="dragger-border__bottom-left"></div>
            <div class="dragger-border__bottom-right"></div>
        </div>
    `,o=g`<div class="dragger-child-container">
        <div class="dragger-child dragger-child--1"></div>
        <div class="dragger-child dragger-child--2"></div>
        <div class="dragger-child dragger-child--3"></div>
        <div class="dragger-child dragger-child--4"></div>
        <div class="dragger-child dragger-child--5"></div>
        <div class="dragger-child dragger-child--6"></div>
        <div class="dragger-child dragger-child--7"></div>
        <div class="dragger-child dragger-child--8"></div>
        <div class="dragger-child dragger-child--9"></div>
        <div class="dragger-child dragger-child--10"></div>
        <div class="dragger-child dragger-child--svg">${e}</div>
    </div>`;return g`<div class="l-dragger">
        <div class="background-shape">${t}</div>
        <c-dragger
            ${m.staticProps({rootClass:"dragger-component",containerClass:".l-dragger",childrenClass:".dragger-child",align:"CENTER",maxHightDepth:140,maxLowDepth:-200,perspective:300,hideThreshold:10,afterInit:({root:n})=>{ax&&console.log(n)},onDepthChange:({depth:n})=>{ax&&console.log(n)}})}
        >
            <!-- Root border -->
            <any-component
                slot="root-slot"
                ${m.staticProps({content:r})}
            ></any-component>

            <!-- Child -->
            <any-component
                slot="child-slot"
                ${m.staticProps({content:o})}
            ></any-component>
        </c-dragger>
    </div>`};var lx=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=(ne(t)-100)/2,s=3,i=2*Math.PI*s,a=0,c=(n-a)/i,l=1e3*s,p=e.map(b=>ne(b)/2),d=z.createSequencer({ease:"easeLinear",stagger:{each:6},data:{angleInRadian:0,scale:0}}).goTo({angleInRadian:i},{start:0,end:10,ease:"easeLinear"}).goTo({scale:1},{start:0,end:4,ease:"easeOutQuad"}).goTo({scale:0},{start:9,end:10,ease:"easeOutQuad"});e.forEach((b,T)=>{let S=b.firstChild;d.subscribeCache(b,({angleInRadian:_,scale:E})=>{let C=a+c*_,w=C*Math.cos(_),I=C*Math.sin(_);b.style.transform=`translate3D(0px,0px,0px) translate(${w-p[T]}px, ${I-p[T]}px)`,S&&(S.style.scale=`${E}`)})});let f=we.createSyncTimeline({repeat:-1,yoyo:!1,duration:l}).add(d);function h(){if(!o||!r)return;let b=r.width/2,T=r.height/2,S=200;o.clearRect(0,0,r.width,r.height),o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let _=0;_<=S;_++){let E=i/S*_,C=a+c*E,w=b+C*Math.cos(E),I=T+C*Math.sin(E);_===0?o.moveTo(w,I):o.lineTo(w,I)}o.stroke()}let v=u.useResize(()=>{r.width=r.clientWidth,r.height=r.clientHeight,h()});return h(),{play:()=>{f.play()},resume:()=>{f.resume()},stop:()=>{f.pause()},destroy:()=>{f.stop(),d.destroy(),f.destroy(),v(),o=null,d=null,f=null,e=null}}};var ux=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=z.createSpring({stagger:{each:6},data:{x:0}}),s=.06,i=ne(t)/2-100,a=e.map(h=>ne(h)/2);e.forEach((h,v)=>{n.subscribeCache(h,({x:b})=>{let T=Math.sin(b*s)*i,S=Math.cos(b*s)*i;h.style.transform=`translate3D(0px,0px,0px) translate(${T-a[v]}px, ${S-a[v]}px)`})}),n.set({x:0});let c=0,l=!1,p=()=>{let h=60/u.getFps();c+=h,n&&(n.goTo({x:c}).catch(()=>{}),l&&u.useNextFrame(()=>p()))};function d(){if(!o||!r)return;r.width=r.width;let h=r.width/2,v=r.height/2;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath(),o.arc(h,v,i,0,2*Math.PI),o.stroke()}let f=u.useResize(()=>{d()});return d(),{play:()=>{l||(l=!0,p())},resume:()=>{l||(l=!0,p())},stop:()=>{l=!1},destroy:()=>{n.destroy(),f(),o=null,n=null,e=null,c=null,l=null}}};var px=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=e.map(h=>ne(h)/2),s=Fe(t)/2-100,i=ne(t),a=10,c=a/2/Math.PI,l=z.createSequencer({stagger:{each:5},data:{x:a/4,scale:0},duration:a}).goTo({x:a+a/4},{start:0,end:a,ease:"easeLinear"}).goTo({scale:1},{start:0,end:1.5,ease:"easeOutQuad"}).goTo({scale:0},{start:1.5,end:5,ease:"easeInQuad"}).goTo({scale:1},{start:5,end:8.5,ease:"easeOutQuad"}).goTo({scale:0},{start:8.5,end:10,ease:"easeInQuad"});e.forEach((h,v)=>{let b=h.firstChild;l.subscribeCache(h,({x:T,scale:S})=>{let _=T/c,E=2/(3-Math.cos(2*_)),C=E*Math.cos(_)*s,w=E*Math.sin(2*_)/2*i;h.style.transform=`translate3D(0px,0px,0px) translate(${C-n[v]}px, ${w-n[v]}px)`,b&&(b.style.scale=`${S}`)})});let p=we.createSyncTimeline({repeat:-1,yoyo:!1,duration:3e3}).add(l);function d(){if(!o||!r)return;r.width=r.width;let h=r.width/2,v=r.height/2,b=200;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let T=0;T<=b;T++){let S=T/b*2*Math.PI,_=2/(3-Math.cos(2*S)),E=_*Math.cos(S)*s,C=_*Math.sin(2*S)/2*i;T===0?o.moveTo(h+E,v+C):o.lineTo(h+E,v+C)}o.stroke()}let f=u.useResize(()=>{d()});return d(),{play:()=>{p.play()},resume:()=>{p.resume()},stop:()=>{p.pause()},destroy:()=>{p.stop(),l.destroy(),p.destroy(),f(),o=null,l=null,p=null,e=null}}};function Tk(e,t,r,o=2e3){let n=0,s=e,i=0;for(let a=1;a<=o;a++){let c=r/o*a,l=e*Math.cos(t*c),p=l*Math.cos(c),d=l*Math.sin(c),f=p-s,h=d-i;n+=Math.hypot(f,h),s=p,i=d}return n}var mx=(e,t)=>t===0?e:mx(t,e%t);function _k(e,t){let r=mx(e,t),o=t/r;return 2*Math.PI*o}var dx=({targets:e,container:t,canvas:r}={},...o)=>{let[n,s,i,a]=o;if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let c=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let l=(ne(t)-100)/2,p=n/s,d=_k(n,s),f=Tk(l,p,d),h=i*(f/l),v=e.map(N=>ne(N)/2),b=z.createSequencer({ease:"easeLinear",stagger:{each:a},data:{angleInRadian:0,scale:1}}).goTo({angleInRadian:d},{start:0,end:10,ease:"easeLinear"}),T=[],S=0,_=0;for(;_<d&&d>0&&p>0;)_=(Math.PI/2+S*Math.PI)/p,_>=0&&T.push(_),S++;let E=0;T.forEach(N=>{let A=N/d*10,O=Math.abs((A-E)/2);E=A;let R=Math.max(0,A-O),F=A,k=Math.min(10,A+O);k>R&&(b.goTo({scale:0},{start:R,end:F,ease:"easeInQuad"}),b.goTo({scale:1},{start:F,end:k,ease:"easeOutQuad"}))}),e.forEach((N,A)=>{let O=N.firstChild;b.subscribeCache(N,({angleInRadian:R,scale:F})=>{let k=l*Math.cos(p*R),M=k*Math.cos(R),L=k*Math.sin(R);N.style.transform=`translate3D(0px,0px,0px) translate(${M-v[A]}px, ${L-v[A]}px)`,O&&(O.style.scale=`${F}`)})});let C=we.createSyncTimeline({repeat:-1,yoyo:!1,duration:h}).add(b);function w(){if(!c||!r)return;let N=r.width/2,A=r.height/2,O=2e3*s;c.clearRect(0,0,r.width,r.height),c.setLineDash([3,7]),c.lineDashOffset=3,c.strokeStyle="rgba(0, 0, 0, 0.5)",c.lineWidth=1,c.beginPath();for(let R=0;R<=O;R++){let F=d/O*R,k=l*Math.cos(p*F),M=N+k*Math.cos(F),L=A+k*Math.sin(F);R===0?c.moveTo(M,L):c.lineTo(M,L)}c.stroke()}let I=u.useResize(()=>{r.width=r.clientWidth,r.height=r.clientHeight,w()});return w(),{play:()=>{C.play()},resume:()=>{C.resume()},stop:()=>{C.pause()},destroy:()=>{C.stop(),b.destroy(),C.destroy(),I(),c=null,b=null,C=null,e=null}}};var hx=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=Fe(t)-200,s=ne(t)/3,i=2,a=n/(2*Math.PI*i),c=1500*i,l=e.map(v=>ne(v)/2),p=z.createSequencer({ease:"easeLinear",stagger:{each:6},data:{x:0,scale:0}}).goTo({x:n},{start:0,end:10,ease:"easeLinear"}).goTo({scale:1},{start:0,end:10/i/2,ease:"easeOutQuad"}).goTo({scale:0},{start:10-10/i/2,end:10,ease:"easeOutQuad"});e.forEach((v,b)=>{let T=0,S=v.firstChild,_=-l[b]-n/2;p.subscribeCache(v,({x:E,scale:C})=>{let w=Math.sign(E-T)||1,I=Math.sin(E/a)*s*w;v.style.transform=`translate3D(0px,0px,0px) translate(${E+_}px, ${I-l[b]}px)`,S&&(S.style.scale=`${C}`),T=E})});let d=we.createSyncTimeline({repeat:-1,yoyo:!0,duration:c}).add(p);function f(){if(!o||!r)return;r.width=r.width;let v=r.width/2,b=r.height/2,T=200,S=T*2;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let _=0;_<=S;_++){let{x:E,y:C}=(()=>{if(_<=T){let w=_/T*n,I=Math.sin(w/a)*s;return{x:w,y:I}}if(_>T){let I=(S-_)/T*n,N=Math.sin(I/a)*s*-1;return{x:I,y:N}}return{x:0,y:0}})();_===0?o.moveTo(v+E-n/2,b+C):o.lineTo(v+E-n/2,b+C)}o.stroke()}let h=u.useResize(()=>{f()});return f(),{play:()=>{d.play()},resume:()=>{d.resume()},stop:()=>{d.pause()},destroy:()=>{d.stop(),p.destroy(),d.destroy(),h(),o=null,p=null,d=null,e=null}}};var mp={sin:hx,circle:ux,infinite:px,archimede:lx,rosaDiGrandi:dx};var fx=()=>({play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}});var gx=({getProxi:e,setRef:t,getRef:r,getRefs:o,delegateEvents:n,onMount:s})=>{let i=e(),a=i.showNavigation?"active":"",c=3,l=c/i.numberOfStaggers,p=Array.from({length:i.numberOfStaggers}).map((T,S)=>({size:c-l*S,opacity:1/S})),d=fx(),{destroy:f,play:h,stop:v,resume:b}=d;return s(({element:T})=>{let{target:S}=o(),{canvas:_}=r();u.useFrame(()=>{({destroy:f,play:h,stop:v,resume:b}=mp[i.name]({targets:S,container:T,canvas:_},...i.args)),h()});let E=u.useResize(()=>{v(),f(),{destroy:f,play:h,stop:v,resume:b}=mp[i.name]({targets:S,container:T,canvas:_},...i.args),h()});return()=>{f(),E(),f=null,h=null,v=null,b=null}}),g`<div class="c-math">
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
            ${p.map(({size:T,opacity:S})=>g`<span
                        class="c-math__circle"
                        ${t("target")}
                        style="width:${T}rem;height:${T}rem;opacity:${S}"
                        ><span class="c-math__circle__inner"></span
                    ></span>`).join("")}
        </div>
    </div>`};var Cc=m.createComponent({tag:"math-animation",component:gx,props:{name:()=>({value:"",type:String}),showNavigation:()=>({value:!0,type:Boolean}),numberOfStaggers:()=>({value:5,type:Number}),args:()=>({value:[],type:Array})}});m.useComponent([Cc]);var bx=async({props:e})=>{let{names:t}=e;return t.length>4&&console.warn("math layout, max item excedded"),xe({active:!0,prevRoute:"#plugin-dragger",nextRoute:"#rosa-di-grandi",backRoute:"#plugin-overview"}),g`<div class="l-math">
        ${t.map(r=>g`<div class="l-math__item">
                    <math-animation
                        ${m.staticProps({name:r})}
                    ></math-animation>
                </div>`).join("")}
    </div>`};var Sk=({proxi:e,delegateEvents:t,bindObject:r})=>g`
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
    `,yx=({getProxi:e,delegateEvents:t,invalidate:r,bindEffect:o,getRef:n,setRef:s,bindObject:i})=>{let a=e();return g`<div class="l-rosa">
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
            ${Sk({proxi:a,getRef:n,setRef:s,delegateEvents:t,bindObject:i})}
        </ul>
        <div class="l-rosa__wrap">
            ${r({observe:[()=>a.numerators,()=>a.denominator],render:()=>g`
                        <math-animation
                            ${m.staticProps({name:"rosaDiGrandi",showNavigation:!1,numberOfStaggers:10,args:[a.numerators,a.denominator,a.duration,a.staggerEach]})}
                        ></math-animation>
                    `})}
        </div>
    </div>`};var vx=m.createComponent({tag:"rosa-di-grandi-page",component:yx,state:{numerators:()=>({value:2,type:Number}),denominator:()=>({value:3,type:Number}),numeratorsLabel:()=>({value:2,type:Number}),denominatorLabel:()=>({value:3,type:Number}),duration:()=>({value:500,type:Number}),staggerEach:()=>({value:4,type:Number}),controlsActive:()=>({value:!1,type:Boolean})},child:[Cc]});m.useComponent([vx]);var Tx=async()=>(xe({active:!0,prevRoute:"#math-animation-01",nextRoute:"",backRoute:"#plugin-overview"}),g`<rosa-di-grandi-page></rosa-di-grandi-page>`);var hp="home",wc="about",K="template-mobJs-component",Ne="template-doc-default",ts="template-listing",lt="template-animation",_t="template-test",Ic=new Set([K,Ne]),se=[{url:"./#mobJs-overview",title:"mobJs"},{url:"./#mobJs-component",title:"component"}],Je=[{url:"./#mobJs-overview",title:"mobJs"}],dp=[{url:"./#mobCore-overview",title:"mobCore"}],Dr=[{url:"./#mobMotion-overview",title:"mobMotion"}],Ec=[{label:"store",url:"#mobCore-store"},{label:"events",url:"#mobCore-events"},{label:"defaults",url:"#mobCore-defaults"}],J=[{label:"initialization",url:"#mobJs-initialization"},{label:"component",url:"#mobJs-component"},{label:"routing",url:"#mobJs-routing"},{label:"tick",url:"#mobJs-tick"},{label:"memory management",url:"#mobJs-memory-management"},{label:"utils",url:"#mobJs-utils"},{label:"debug",url:"#mobJs-debug"}],dr=[{label:"tween/spring/lerp",url:"#mobMotion-tween-spring-lerp"},{label:"AsyncTimeline",url:"#mobMotion-async-timeline"},{label:"sequencer",url:"#mobMotion-sequencer"},{label:"SyncTimeline",url:"#mobMotion-sync-timeline"},{label:"CreateStagger",url:"#mobMotion-create-stagger"},{label:"ScrollTrigger",url:"#mobMotion-scrolltrigger"},{label:"Parallax",url:"#mobMotion-parallax"},{label:"Stagger",url:"#mobMotion-stagger"},{label:"Default",url:"#mobMotion-defaults"}],Mc=[{hash:"pageNotFound",layout:Nv,props:{}},{hash:"onlyDesktop",layout:HS,props:{}},{hash:"about",layout:VT,templateName:wc,props:{}},{hash:"canvas-overview",layout:Ya,templateName:ts,props:{source:"./data/canvas/data.json"}},{hash:"animatedPatternN0",layout:c_,templateName:lt,props:{}},{hash:"animatedPatternN1",layout:p_,templateName:lt,props:{}},{hash:"caterpillarN1",layout:f_,templateName:lt,props:{}},{hash:"caterpillarN2",layout:v_,templateName:lt,props:{}},{hash:"async-timeline",layout:GS,templateName:lt,props:{}},{hash:"scrollerN0",layout:x_,templateName:lt,props:{}},{hash:"scrollerN1",layout:I_,templateName:lt,props:{}},{hash:"dynamic-list",layout:U_,templateName:_t,skipTransition:!0,props:{source:"./data/mob-js/general-repeat-test.json",breadCrumbs:Je,title:"( test ) repeat & invalidate",section:"mobJs"}},{hash:"matrioska-repeat",layout:cS,templateName:_t,skipTransition:!0,props:{source:"./data/mob-js/matrioska.json",breadCrumbs:Je,title:"( test ) matrioska repeat",section:"mobJs"}},{hash:"matrioska-invalidate",layout:lS,templateName:_t,skipTransition:!0,props:{source:"./data/mob-js/matrioska.json",breadCrumbs:Je,title:"( test ) matrioska invalidate",section:"mobJs"}},{hash:"home",layout:Y_,templateName:hp,props:{}},{hash:"mobCore-overview",layout:$e,skipTransition:!0,templateName:Ne,props:{source:"./data/mob-core/overview.json",title:"mobCore",breadCrumbs:[],section:"mobCore",rightSidebar:Ec}},{hash:"mobCore-defaults",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-core/defaults.json",title:"Defaults",breadCrumbs:dp,section:"mobCore",rightSidebar:Ec}},{hash:"mobCore-events",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-core/events.json",title:"Events",breadCrumbs:dp,section:"mobCore",rightSidebar:Ec}},{hash:"mobCore-store",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-core/store.json",title:"Store",breadCrumbs:dp,section:"mobCore",rightSidebar:Ec}},{hash:"mobJs-overview",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/overview.json",title:"mobJs",breadCrumbs:[],section:"mobJs",rightSidebar:J}},{hash:"mobJs-initialization",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/initialization.json",title:"initialization",breadCrumbs:Je,section:"mobJs",rightSidebar:J}},{hash:"mobJs-component",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/component.json",title:"component",breadCrumbs:Je,section:"mobJs",rightSidebar:J}},{hash:"mobJs-routing",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/routing.json",title:"routing",breadCrumbs:Je,section:"mobJs",rightSidebar:J}},{hash:"mobJs-benchmark-invalidate",layout:Lr,templateName:_t,skipTransition:!0,props:{rootComponent:"benchmark-invalidate",breadCrumbs:Je,source:"./data/mob-js/benchmark-invalidate.json",title:"( test ) benchmark invalidate",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-key",layout:Lr,templateName:_t,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-key",breadCrumbs:Je,source:"./data/mob-js/benchmark-repeat-without-key.json",title:"( test ) benchmark repeat without key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key",layout:Lr,templateName:_t,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key",breadCrumbs:Je,source:"./data/mob-js/benchmark-repeat-key.json",title:"( test ) benchmark repeat key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-component-no-key",layout:Lr,templateName:_t,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-component-no-key",breadCrumbs:Je,source:"./data/mob-js/benchmark-repeat-no-component-no-key.json",title:"( test ) benchmark repeat no component no key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-component-with-key",layout:Lr,templateName:_t,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-component-with-key",breadCrumbs:Je,source:"./data/mob-js/benchmark-repeat-no-component-with-key.json",title:"( test ) benchmark repeat no component with key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-key-nested",layout:Lr,templateName:_t,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key-no-nested",breadCrumbs:Je,source:"./data/mob-js/benchmark-repeat-without-key-nested.json",title:"( test ) benchmark repeat nested without key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key-nested",layout:Lr,templateName:_t,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key-nested",breadCrumbs:Je,source:"./data/mob-js/benchmark-repeat-key-nested.json",title:"( test ) benchmark repeat nested with key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key-bind-store",layout:Lr,templateName:_t,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-key-bind-store",breadCrumbs:Je,source:"./data/mob-js/benchmark-repeat-external.json",title:"( test ) benchmark repeat bindStore",section:"mobJs"}},{hash:"mobJs-tick",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/tick.json",title:"tick",breadCrumbs:Je,section:"mobJs",rightSidebar:J}},{hash:"mobJs-utils",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/utils.json",title:"utils",breadCrumbs:Je,section:"mobJs",rightSidebar:J}},{hash:"mobJs-memory-management",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/memory-management.json",title:"memory management",breadCrumbs:Je,section:"mobJs",rightSidebar:J}},{hash:"mobJs-debug",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/debug.json",title:"debug",breadCrumbs:Je,section:"mobJs",rightSidebar:J}},{hash:"mobJs-onMount",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/on-mount.json",title:"onMount",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-getState",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/get-state.json",title:"getState",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-setState",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/set-state.json",title:"setState",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-updateState",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/update-state.json",title:"updateState",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-getProxi",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/get-proxi.json",title:"getProxi",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-watch",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/watch.json",title:"watch",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-staticProps",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/static-props.json",title:"staticProps",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-dataAttribute",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/data-attribute.json",title:"dataAttribute",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-bindProps",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/bind-props.json",title:"bindProps",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-bindEvents",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/bind-events.json",title:"bindEvents",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-delegateEvents",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/delegate-events.json",title:"delegateEvents",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-bindtext",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/bind-text.json",title:"bindText",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-bindObject",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/bind-object.json",title:"bindObject",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-bind-effect",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/bind-effect.json",title:"bindEffect",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-methods",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/methods.json",title:"add methods",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-useMethodByName",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/use-method-by-name.json",title:"useMethodByName",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-useMethodArrayByName",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/use-method-array-by-name.json",title:"useMethodArrayByName",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-setStateByName",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/set-state-by-name.json",title:"setStateByName",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-updateStateByName",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/update-state-by-name.json",title:"updateStateByName",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-refs",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/refs.json",title:"refs",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-runtime",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/runtime.json",title:"renderComponent",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-repeat",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/repeat.json",title:"repeat",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-invalidate",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/invalidate.json",title:"invalidate",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-invalidate-vs-repeater",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/invalidate-vs-repeater.json",title:"invalidate vs repeater",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-web-component",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/web-component.json",title:"webComponent",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-slot",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/slot.json",title:"slot",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-unBind",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/unbind.json",title:"unBind",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-emit",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/emit.json",title:"emit",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-emitAsync",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/emit-async.json",title:"emitAsync",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-computed",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/computed.json",title:"computed",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-bindStore",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/bind-store.json",title:"bindStore",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-removeDom",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/remove-dom.json",title:"removeDom",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-remove",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/remove.json",title:"remove",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-getChildren",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/get-children.json",title:"getChildren",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-freezeProp",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/freeze-prop.json",title:"freezeProp",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-unFreezeProp",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/unfreeze-prop.json",title:"unFreezeProp",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-getParentId",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/get-parent-id.json",title:"getParentId",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-watchParent",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/watch-parent.json",title:"watchParent",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-instanceName",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/instance-name.json",title:"instanceName",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-class-list",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/class-list.json",title:"classList",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobMotion-stagger",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/stagger.json",title:"Stagger",breadCrumbs:Dr,section:"mobMotion",rightSidebar:dr}},{hash:"mobMotion-defaults",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/defaults.json",title:"Defaults",breadCrumbs:Dr,section:"mobMotion",rightSidebar:dr}},{hash:"mobMotion-overview",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/overview.json",title:"mobMotion",breadCrumbs:[],section:"mobMotion",rightSidebar:dr}},{hash:"mobMotion-parallax",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/parallax.json",title:"Parallax",breadCrumbs:Dr,section:"mobMotion",rightSidebar:dr}},{hash:"mobMotion-sequencer",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/sequencer.json",title:"Sequencer",breadCrumbs:Dr,section:"mobMotion",rightSidebar:dr}},{hash:"mobMotion-scrolltrigger",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/scroll-trigger.json",title:"ScrollTrigger",breadCrumbs:Dr,section:"mobMotion",rightSidebar:dr}},{hash:"mobMotion-sync-timeline",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/sync-timeline.json",title:"Synctimeline",breadCrumbs:Dr,section:"mobMotion",rightSidebar:dr}},{hash:"mobMotion-create-stagger",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/create-stagger.json",title:"CreateStagger",breadCrumbs:Dr,section:"mobMotion",rightSidebar:dr}},{hash:"mobMotion-async-timeline",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/async-timeline.json",title:"Asynctimeline",breadCrumbs:Dr,section:"mobMotion",rightSidebar:dr}},{hash:"mobMotion-tween-spring-lerp",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/tween-spring-lerp.json",title:"TimeTween Spring Lerp",breadCrumbs:Dr,section:"mobMotion",rightSidebar:dr}},{hash:"horizontalScroller",layout:TS,templateName:lt,restoreScroll:!1,props:{source:"./data/plugin/horizontal-scroller.json",title:"HorizontalScroller"}},{hash:"move3D-shape1",templateName:lt,layout:NS,props:AS.shape1},{hash:"plugin-dragger",layout:cx,templateName:lt,props:{}},{hash:"math-animation-01",layout:bx,templateName:lt,props:{names:["circle","sin","infinite","archimede"]}},{hash:"rosa-di-grandi",layout:Tx,templateName:lt,props:{}},{hash:"plugin-overview",layout:Ya,templateName:ts,props:{source:"./data/plugin/data.json"}},{hash:"svg-overview",layout:Ya,templateName:ts,props:{source:"./data/svg/data.json"}},{hash:"mob-01",layout:FS,templateName:lt,props:{}},{hash:"mob-02",layout:QS,templateName:lt,props:{}},{hash:"rdp-01",layout:JS,templateName:lt,props:{}}];var _x=0;m.beforeRouteChange(()=>{_x=window.scrollY});var xk=new Set([K,Ne,ts,wc,_t]),Ck=new Set([K,Ne,ts,wc,hp,_t]),Sx=async({oldNode:e,oldTemplateName:t})=>{e.classList.remove("current-route"),e.classList.add("fake-content"),e.style.position="fixed",e.style.zIndex="10",e.style.top=xk.has(t)?"var(--header-height)":"0",e.style.left=Ck.has(t)?"calc(var(--header-height)/2)":"0",e.style.right="0",e.style.transform=`translateY(-${_x}px)`,e.style.minHeight="calc(100vh - var(--header-height) - var(--footer-height))"},xx=async({oldNode:e,newNode:t,oldRoute:r,newRoute:o})=>{if(r===o)return;let n=m.getRoot();n.style.pointerEvents="none",t.style.opacity="0";let s=z.createTimeTween({data:{opacity:1},duration:200}),i=z.createTimeTween({data:{opacity:0},duration:300});s.subscribe(({opacity:c})=>{e.style.opacity=c}),i.subscribe(({opacity:c})=>{t.style.opacity=c});let a=we.createAsyncTimeline({repeat:1}).createGroup({waitComplete:!0}).goTo(s,{opacity:0}).goTo(i,{opacity:1}).closeGroup();await a.play(),a.destroy(),a=null,t.style.removeProperty("opacity"),t.classList.add("current-route"),u.useFrameIndex(()=>{n.style.pointerEvents=""},10)};var Cx=()=>{let e=window.innerWidth-document.documentElement.clientWidth;document.documentElement.style.setProperty("--scrollbar-with",`${e}px`)},Ex=()=>{Cx(),u.useResize(()=>{Cx()})};var ai=!0,Ek=({proxi:e,emit:t})=>{e.selectedNodes.forEach(r=>{let o=e.linkedList.find(n=>n.data.id===r);o&&(e.linkedList=e.linkedList.removeNode(o),e.currentNode=null,t(()=>e.currentNode)),o=null}),e.selectedNodes.clear(),t(()=>e.selectedNodes)},wx=({proxi:e,emit:t,direction:r="up"})=>{e.selectedNodes.forEach(o=>{let n=e.linkedList.find(s=>s.data.id===o);n&&r==="up"&&n?.prev&&e.linkedList.moveBefore(n,n.prev),n&&r==="down"&&n?.next&&e.linkedList.moveAfter(n,n.next),n=null}),t(()=>e.linkedList)},wk=({proxi:e,emit:t})=>{if(e.selectedNodes.size!==2)return;let r=e.selectedNodes[Symbol.iterator](),o=r.next().value,n=r.next().value,s=e.linkedList.find(a=>a.data.id===o),i=e.linkedList.find(a=>a.data.id===n);!s||!i||(e.linkedList.swap(s,i),t(()=>e.linkedList),s=null,i=null)},Ik=({proxi:e,delegateEvents:t,bindEffect:r,emit:o})=>{let n=ft().close,s=ft().previous,i=ft().up,a=ft().swap,c=ft().selectAll;return g`
        <ul class="c-custom-history__nav">
            <li class="c-custom-history__prev">
                <button
                    type="button"
                    ${r({toggleClass:{active:()=>!!(e.currentNode&&e.currentNode?.prev!==null)}})}
                    ${t({click:()=>{m.mainStore.getProp("routeIsLoading")||e.currentNode?.prev&&(ai=!1,e.currentNode=e.currentNode?.prev)}})}
                >
                    ${s}
                </button>
            </li>
            <li class="c-custom-history__next">
                <button
                    type="button"
                    ${r({toggleClass:{active:()=>!!(e.currentNode&&e.currentNode?.next!==null)}})}
                    ${t({click:()=>{m.mainStore.getProp("routeIsLoading")||e.currentNode?.next&&(ai=!1,e.currentNode=e.currentNode?.next)}})}
                >
                    ${s}
                </button>
            </li>
            <li class="c-custom-history__remove">
                <button
                    type="button"
                    ${r({toggleClass:{active:()=>e.selectedNodes.size>0}})}
                    ${t({click:()=>{Ek({proxi:e,emit:o}),e.selectAllOn=!1}})}
                >
                    ${n}
                </button>
            </li>
            <li class="c-custom-history__up">
                <button
                    type="button"
                    ${r({toggleClass:{active:()=>e.selectedNodes.size===1}})}
                    ${t({click:()=>{wx({emit:o,proxi:e,direction:"up"})}})}
                >
                    ${i}
                </button>
            </li>
            <li class="c-custom-history__down">
                <button
                    type="button"
                    ${r({toggleClass:{active:()=>e.selectedNodes.size===1}})}
                    ${t({click:()=>{wx({emit:o,proxi:e,direction:"down"})}})}
                >
                    ${i}
                </button>
            </li>
            <li class="c-custom-history__swap">
                <button
                    type="button"
                    ${r({toggleClass:{active:()=>e.selectedNodes.size===2}})}
                    ${t({click:()=>{wk({proxi:e,emit:o})}})}
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
    `},Ix=({getProxi:e,computed:t,repeat:r,bindEffect:o,addMethod:n,staticProps:s,delegateEvents:i,bindProps:a,watch:c,emit:l})=>{let p=e();return c(()=>p.currentNode,d=>{m.loadUrl({url:d?.data.url,params:d?.data?.params,skipTransition:!0})}),t(()=>p.listParsed,()=>p.linkedList.toArray()),n("toggle",()=>{p.active=!p.active}),n("addRouteWithoutUpdate",({id:d})=>{p.currentNode=p.linkedList.find(f=>f.data.id===d),ai=!1,p.active=!1}),n("addSelectedNodes",({id:d,add:f})=>{f?p.selectedNodes.add(d):p.selectedNodes.delete(d),l(()=>p.selectedNodes)}),m.afterRouteChange(()=>{let d=m.getActiveParams(),f=m.getActiveRoute()?.route;if(ai&&f!==p.currentNode?.data.url){if(p.linkedList.size>=20){let h=p.linkedList.first;h&&(p.selectedNodes.delete(h.data.id),l(()=>p.selectedNodes)),p.linkedList.removeFirst(),h=null}p.currentNode&&(p.linkedList=p.linkedList.insertAfter(p.currentNode,{id:u.getUnivoqueId(),url:f,params:d}),p.currentNode=p.currentNode.next),p.currentNode||(p.linkedList=p.linkedList.addLast({id:u.getUnivoqueId(),url:f,params:d}),p.currentNode=p.linkedList.last)}ai=!0}),g`
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
            ${Ik({proxi:p,delegateEvents:i,bindEffect:o,emit:l})}
            <div class="c-custom-history__container">
                ${r({observe:()=>p.listParsed,key:"id",render:({current:d})=>g`<history-item
                            ${s({id:d.value.id,url:d.value.url})}
                            ${a(()=>({active:p.currentNode?.data.id===d.value.id,forceSelect:p.selectAllOn}))}
                        ></history-item>`})}
            </div>
        </div>
    `};var Mx=()=>{mn(qn)?.toggle()},kx=({id:e})=>{mn(qn)?.addRouteWithoutUpdate({id:e})},Rx=({id:e,add:t})=>{mn(qn)?.addSelectedNodes({id:e,add:t})};function Mk(e="",t=30){return e.length>t?`${e.slice(0,Math.max(0,t))} ...`:e}var Nx=({getProxi:e,delegateEvents:t,bindEffect:r,watch:o})=>{let n=e();return o(()=>n.checked,s=>{Rx({id:n.id,add:s})}),o(()=>n.forceSelect,s=>n.checked=s),g`<div class="c-history-item">
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
            ${t({click:()=>{kx({id:n.id})}})}
            ${r({toggleClass:{active:()=>n.active}})}
        >
            ${Mk(n.url)}
        </button>
    </div>`};var Px=m.createComponent({tag:"history-item",component:Nx,props:{id:()=>({value:"",type:String}),url:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean}),forceSelect:()=>({value:!1,type:Boolean})},state:{checked:()=>({value:!1,type:Boolean})}});var Ax=m.createComponent({tag:"custom-history",component:Ix,state:{linkedList:()=>({value:new on,type:"any",skipEqual:!1}),listParsed:()=>({value:[],type:Array,skipEqual:!1}),currentNode:()=>({value:void 0,type:"any",skipEqual:!1}),selectedNodes:()=>({value:new Set,type:Set,skipEqual:!1}),active:()=>({value:!1,type:Boolean}),selectAllOn:()=>({value:!1,type:Boolean})},child:[Px]});var rs="reset",hr="tree",ci="filter_component";var fr=({screen:e,scroller:t,scrollbar:r})=>{let o;return{init:()=>{o||(o=new xt({screen:e,scroller:t,direction:"vertical",drag:!0,scopedEvent:!1,breakpoint:"desktop",onTick:({percent:n})=>{r.value=`${n}`},afterRefresh:({shouldScroll:n})=>{r?.classList.toggle("hide-scrollbar",!n)}}),o.init())},destroy:()=>{o?.destroy(),o=null},refresh:()=>{o?.refresh()},updateScroller:()=>{if(!o)return;let n=ne(t),s=ne(e),i=Fe(r),a=s/n*i;r.style.setProperty("--thumb-width",`${a}px`),o?.refresh()},move:n=>{o&&o.move(n).catch(()=>{})},goToTop:()=>{o?.set(0)}}};var os=u.createStore({currentId:()=>({value:"",type:String})});var Ox=e=>e?[...e].reduce((t,r)=>`${t}.${r}`,""):"",$x=e=>Object.keys(e).reduce((t,r)=>`${t} ${r},`,""),kk=e=>Object.entries(e).map(([t,r])=>g`<div>
                <strong>${t}:</strong>
                ${r.map(o=>g`${o}, `).join(".")}
            </div>`).join(""),Rk=e=>e?e.map(t=>`${t}, `).join(""):"",Lx=e=>Object.entries(e).map(([t,r])=>g`<div>
                <strong>${t}:</strong>
                ${JSON.stringify(r)}
            </div>`).join(""),Nk=({getState:e})=>{let{id:t}=e();if(t===rs)return"";let r=m.componentMap.get(t);return r?g`<div>
        <!-- Basic props -->
        <div><strong>id</strong>: ${t}</div>
        <div><strong>parent id</strong>: ${r.parentId}</div>
        <div>
            <strong>component root</strong>:
            ${r.element.tagName}${Ox(r.element.classList)}
        </div>
        <div><strong>componentName</strong>: ${r.componentName}</div>
        <div><strong>instance name:</strong>: ${r.instanceName}</div>
        <div><strong>methods:</strong>: ${$x(r.methods)}</div>
        <div><strong>refs:</strong>: ${$x(r.refs)}</div>
        <div><strong>persistent:</strong>: ${r.persistent}</div>

        <!-- Children -->
        <h3 class="c-debug-component__section-title">Children:</h3>
        <div>${kk(r?.child??{})}</div>

        <!-- Repeater -->
        <h3 class="c-debug-component__section-title">Repeater props:</h3>
        <div>
            <strong>component repeater id</strong>: ${r.componentRepeatId}
        </div>
        <div><strong>repeater state bind</strong>: ${r.repeatPropBind}</div>
        <div>
            <strong>repeater inner wrapper</strong>:
            ${r?.repeaterInnerWrap?.tagName}${Ox(r?.repeaterInnerWrap?.classList)}
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
            ${Rk(r?.freezedPros)}
        </div>
        <div>
            <h4 class="c-debug-component__section-subtitle">
                States current values:
            </h4>
            ${Lx(r.state.get())}
        </div>
        <div>
            <h4 class="c-debug-component__section-subtitle">
                States current validation:
            </h4>
            ${Lx(r.state.getValidation())}
        </div>
    </div>`:"component not found"},Pk=({getRef:e})=>{let{screen:t,scroller:r,scrollbar:o}=e();o.addEventListener("input",()=>{c(o.value)});let n=fr({screen:t,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},Dx=({onMount:e,addMethod:t,getState:r,invalidate:o,setRef:n,getRef:s,watch:i,getProxi:a,emit:c})=>{let l=a();t("updateId",d=>{l.id=d,os.set("currentId",d)}),t("refreshId",()=>{c(()=>l.id)});let p;return e(()=>{let{destroy:d,updateScroller:f,move:h,refresh:v}=Pk({getRef:s});return p=h,i(()=>l.id,async()=>{await m.tick(),v(),f(),p(0)}),()=>{d?.()}}),g`<div class="c-debug-component" ${n("screen")}>
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
            ${o({observe:()=>l.id,render:()=>Nk({getState:r})})}
        </div>
    </div>`};var Fx=m.createComponent({tag:"debug-component",component:Dx,state:{id:()=>({value:rs,type:String,skipEqual:!1})}});var Bx=e=>{m.useMethodByName(oc)?.refreshList?.({testString:e})};var fp=async(e="")=>{await m.tick(),Bx(e)},Vx=({onMount:e,setRef:t,getRef:r,delegateEvents:o})=>(e(()=>(fp(),()=>{r()?.input.remove()})),g`<div class="c-debug-filter-head">
        <span class="c-debug-filter-head__title">Filter by tag</span>
        <input
            type="text"
            class="c-debug-filter-head__input"
            value=""
            ${t("input")}
            ${o({keydown:n=>{if(n.code.toLowerCase()==="enter"){n.preventDefault();let s=n.target.value;fp(s)}}})}
        />
        <button
            class="c-debug-filter-head__button"
            type="button"
            ${o({click:()=>{let{input:n}=r(),s=n.value;fp(s)}})}
        >
            find
        </button>
    </div>`);var Wx=m.createComponent({tag:"debug-filter-head",component:Vx});var Ak=async({getRef:e})=>{await m.tick();let{screen:t,scroller:r,scrollbar:o}=e(),n=fr({screen:t,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},jx=e=>`~${e}`,Ok=({testString:e})=>{let t=e.replaceAll("~","").split(" ").filter(r=>r!=="")??"";return(()=>{let r=[];for(let o of m.componentMap.values())t.every(s=>o.componentName.includes(s))&&r.push(o);return r})().map(({id:r,componentName:o,instanceName:n})=>({id:r,active:!1,tag:(()=>{let s=t.reduce((i,a,c)=>i.replaceAll(new RegExp(`(?<!~)${a.toLowerCase()}`,"g"),`${jx(c)}`),o);return t.reduce((i,a,c)=>i.replaceAll(`${jx(c)}`,`<span class="match-string">${a}</span>`),s)})(),name:n}))},Hx=({onMount:e,setRef:t,getRef:r,addMethod:o,repeat:n,staticProps:s,bindProps:i,bindEffect:a,getProxi:c,computed:l})=>{let p=c(),d=()=>{},f=()=>{},h=()=>{},v=()=>{};return l(()=>p.noResult,()=>p.data.length===0&&!p.isLoading),o("refreshList",async({testString:b})=>{p.isLoading=!0,await m.tick(),u.useNextTick(async()=>{p.data=Ok({testString:b}),await m.tick(),h?.(),v?.(),p.isLoading=!1})}),e(()=>{let{scrollbar:b}=r();return b.addEventListener("input",()=>{f(b.value)}),(async()=>({destroy:d,move:f,refresh:h,updateScroller:v}=await Ak({getRef:r})))(),()=>{d?.(),d=()=>{},h=()=>{},v=()=>{},f=()=>{}}}),g`
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
    `};var gr=e=>{m.useMethodByName(Xs)?.updateId(e)},zx=()=>{m.useMethodByName(Xs)?.refreshId()};var Ux=({delegateEvents:e,bindText:t,bindEffect:r,getProxi:o,computed:n})=>{let s=o();return n(()=>s.active,()=>s.id===s.currentId),g`
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
    `};var Gx=m.createComponent({tag:"debug-filter-list-item",component:Ux,bindStore:os,props:{id:()=>({value:"",type:String}),tag:()=>({value:"",type:String}),name:()=>({value:"",type:String})},state:{active:()=>({value:!1,type:Boolean})}});var qx=m.createComponent({tag:"debug-filter-list",component:Hx,state:{data:()=>({value:[],type:Array}),isLoading:()=>({value:!0,type:Boolean}),noResult:()=>({value:!1,type:Boolean})},child:[Gx]});var Jx=({invalidate:e,getProxi:t})=>{let r=t();return g`<div class="c-debug-head">
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
    </div>`};var Yx=({setRef:e,getRef:t,delegateEvents:r})=>g`<div class="c-debug-search">
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
                    ${r({click:()=>{let{instance_input:o,id_input:n}=t();o.value="",n.value="",gr(rs)}})}
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
                    ${r({click:()=>{zx()}})}
                >
                    refresh component
                </button>
            </div>
        </div>
    </div>`;var Xx=m.createComponent({tag:"debug-search",component:Yx});var Kx=m.createComponent({tag:"debug-head",component:Jx,props:{active:()=>({value:!1,type:Boolean})},state:{shouldUpdate:()=>({value:!0,type:Boolean,skipEqual:!1})},child:[Xx]});var kc=()=>{m.mainStore.debugStore(),console.log("componentMap",m.componentMap),console.log("Tree structure:",m.getTree()),console.log("bindEventMap",Sn),console.log("currentListValueMap",vs),console.log("activeRepeatMap",Cn),console.log("onMountCallbackMap",_s),console.log("staticPropsMap",En),console.log("dynamicPropsMap",St),console.log("eventDelegationMap",m.eventDelegationMap),console.log("tempDelegateEventMap",m.tempDelegateEventMap),console.log("invalidateIdHostMap",Yr.size),console.log("invalidateIdsMap",Qe),console.log("invalidateInstancesMap",be),console.log("repeatIdHostMap",Ur),console.log("repeatIdsMap",Ze),console.log("repeatInstancesMap",G),console.log("userChildPlaceholderSize",eh()),console.log("slotPlaceholderSize",Gi()),console.log("bindTextPlaceholderMapSize",Lh()),console.log("instanceMap",Gr)};var Qx=({delegateEvents:e,addMethod:t,bindProps:r,invalidate:o,bindEffect:n,getProxi:s,onMount:i})=>{let a=s();return t("toggle",()=>{a.active=!a.active}),i(()=>{let c=m.beforeRouteChange(()=>{a.active=!1,a.listType=hr});return()=>{c()}}),g`<div
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
                                    </div>`:a.listType===ci&&a.active?g`<debug-filter-head></debug-filter-head>`:""})}
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
                            ${e({click:()=>{a.listType=ci}})}
                            ${n({toggleClass:{active:()=>a.listType===ci}})}
                        >
                            Filter
                        </button>
                    </div>
                </div>
                <div>
                    ${o({observe:[()=>a.listType,()=>a.active],render:()=>a.listType===hr&&a.active?g`
                                    <debug-tree
                                        name="${sc}"
                                    ></debug-tree>
                                `:a.listType===ci&&a.active?g`
                                    <debug-filter-list
                                        name="${oc}"
                                    ></debug-filter-list>
                                `:""})}
                </div>
            </div>
            <div class="c-debug-overlay__component">
                <debug-component name="${Xs}"></debug-component>
            </div>
        </div>
    </div>`};var Rc=({data:e,staticProps:t})=>e.map(({id:r,componentName:o,instanceName:n,children:s})=>g`<debug-tree-item
                ${t({id:r,componentName:o,instanceName:n,children:s})}
            ></debug-tree-item>`).join("");var $k=async({getRef:e})=>{await m.tick();let{screen:t,scroller:r,scrollbar:o}=e(),n=fr({screen:t,scroller:r,scrollbar:o}),s=n.destroy,i=n.refresh,a=n.move,c=n.updateScroller;return n.init(),c(),a(0),{destroy:s,refresh:i,move:a,updateScroller:c}},Zx=({onMount:e,invalidate:t,staticProps:r,setRef:o,getRef:n,addMethod:s,bindEffect:i,getProxi:a})=>{let c=a(),l=()=>{},p=()=>{},d=()=>{},f=()=>{};return e(()=>{let{scrollbar:h}=n();return h.addEventListener("input",()=>{f(h.value)}),s("refresh",()=>{p?.(),d?.()}),(async()=>(c.isLoading=!0,await m.tick(),l?.(),c.data=m.getTree(),{destroy:l,move:f,refresh:p,updateScroller:d}=await $k({getRef:n}),c.isLoading=!1))(),()=>{l?.(),l=()=>{},p=()=>{},d=()=>{},f=()=>{}}}),g`
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
                    ${t({observe:()=>c.data,render:()=>Rc({data:c.data,staticProps:r})})}
                </div>
            </div>
        </div>
    `};var e0=()=>{m.useMethodByName(sc)?.refresh()};var Lk=e=>e>0?`( ${e} ) `:"",t0=({id:e,value:t})=>{let o=m.componentMap.get(e)?.child;if(!o)return!1;let n=Object.values(o).flat();return n.includes(t)?!0:n.some(i=>t0({id:i,value:t}))},r0=({onMount:e,staticProps:t,getRef:r,setRef:o,delegateEvents:n,watch:s,bindEffect:i,getProxi:a,computed:c})=>{let l=a(),p=l.children.length>0?"has-children":"";return c(()=>l.isActive,()=>l.id===l.currentId),c(()=>l.hasActiveChildren,()=>t0({id:l.id,value:l.currentId})),e(()=>{let{content:d}=r(),f=$r.subscribe(d);return $r.reset(d),s(()=>l.isOpen,async h=>{await $r[h?"down":"up"](d),e0()}),()=>{f()}}),g`<div class="c-debug-tree-item">
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
            <span>${Lk(l.children.length)}</span>
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
            ${Rc({data:l.children,staticProps:t})}
        </div>
    </div>`};var o0=m.createComponent({tag:"debug-tree-item",component:r0,bindStore:os,props:{id:()=>({value:"",type:String}),componentName:()=>({value:"",type:String}),instanceName:()=>({value:"",type:String}),children:()=>({value:[],type:Array})},state:{isOpen:()=>({value:!1,type:Boolean}),isActive:()=>({value:!1,type:Boolean}),hasActiveChildren:()=>({value:!1,type:Boolean})}});var n0=m.createComponent({tag:"debug-tree",component:Zx,state:{data:()=>({value:[],type:Array}),isLoading:()=>({value:!1,type:Boolean})},child:[o0]});var s0=m.createComponent({tag:"debug-overlay",component:Qx,state:{active:()=>({value:!1,type:Boolean}),listType:()=>({value:hr,type:String})},child:[n0,Fx,Kx,Wx,qx]});var gp=()=>{},Nc=()=>{},Pc=()=>{},Ac=()=>{},Dk=({staticProps:e,bindProps:t,proxi:r})=>r.data.map(o=>{let{label:n,url:s,isLabel:i}=o;return i?g`<p class="c-params-mobjs__label">${n}</p>`:g`<li>
                      <links-mobjs-button
                          ${e({label:n,url:s})}
                          ${t(()=>({active:r.activeSection===s}))}
                      ></links-mobjs-button>
                  </li>`}).join(""),i0=({staticProps:e,setRef:t,getRef:r,onMount:o,bindProps:n,invalidate:s,bindEffect:i,getProxi:a})=>{let c=mr(),l=a(),p={[K]:c.sideBarLinks.mobJsComponentParams};return o(()=>{let{screenEl:d,scrollerEl:f,scrollbar:h}=r(),v=!1;h.addEventListener("input",()=>{Pc?.(h.value)}),Z.watch("navigationIsOpen",T=>{let{templateName:S}=m.getActiveRoute();S in p&&(l.shift=T)});let b=m.afterRouteChange(async({currentTemplate:T,currentRoute:S})=>{let _=p?.[T]??[];if(l.data=_,await m.tick(),l.activeSection=S,_.length>0){if(l.hide=!1,v){Ac();return}({init:gp,destroy:Nc,move:Pc,updateScroller:Ac}=fr({screen:d,scroller:f,scrollbar:h})),v=!0,gp(),Ac(),Pc(0)}_.length===0&&(l.hide=!0,Nc?.(),v=!1)});return()=>{Nc?.(),b(),gp=()=>{},Nc=()=>{},Pc=()=>{},Ac=()=>{}}}),g`<div
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
            class="c-params-mobjs__scrollbar hide-scrollbar"
        />
        <ul ${t("scrollerEl")}>
            ${s({observe:()=>l.data,render:()=>Dk({staticProps:e,bindProps:n,proxi:l})})}
        </ul>
    </div>`};var a0=({getProxi:e,bindEffect:t})=>{let r=e();return g` <a
        href="./#${r.url}"
        ${t({toggleClass:{current:()=>r.active}})}
        ><span>${r.label}</span></a
    >`};var c0=m.createComponent({tag:"links-mobjs-button",component:a0,props:{label:()=>({value:"",type:String}),url:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean})}});var l0=m.createComponent({tag:"links-mobjs",component:i0,child:[c0],state:{data:()=>({value:[],type:Array}),activeSection:()=>({value:"",type:String}),hide:()=>({value:!0,type:Boolean}),shift:()=>({value:!1,type:Boolean})}});var u0=({getProxi:e,bindEffect:t,addMethod:r,setRef:o,getRef:n,onMount:s,watch:i})=>{let a=e();r("update",(l,p)=>{a[l]=p});let c=z.createTimeTween({data:{y:0,yContainer:100},duration:300,ease:"easeOutQuad"});return i(()=>a.currentLabelId,l=>{if(l===-1){c.goTo({yContainer:100});return}c.goTo({y:100/3*-l,yContainer:0})}),s(({element:l})=>{let{back:p,next:d,previous:f,labelList:h,labels:v}=n();return c.subscribe(({y:b,yContainer:T})=>{h.style.transform=`translateY(${b}%)`,v.style.transform=`translateY(${T}%)`}),l.addEventListener("mouseleave",()=>{a.currentLabelId=-1}),f.addEventListener("mouseenter",()=>{a.currentLabelId=0}),p.addEventListener("mouseenter",()=>{a.currentLabelId=1}),d.addEventListener("mouseenter",()=>{a.currentLabelId=2}),()=>{c.destroy(),c=null,f=null,p=null,d=null,h=null,v=null}}),g`<div
        class="c-quick-nav-container"
        ${t([{toggleClass:{active:()=>a.active}}])}
    >
        <a
            class="c-quick-nav c-quick-nav--prev"
            ${o("previous")}
            ${t({toggleClass:{"is-disable":()=>!a.prevRoute},toggleAttribute:{href:()=>{let l=a.prevRoute;return l.length>0?l:null}}})}
        >
        </a>
        <a
            class="c-quick-nav c-quick-nav--back"
            ${o("back")}
            ${t({toggleClass:{"is-disable":()=>!a.backRoute},toggleAttribute:{href:()=>{let l=a.backRoute;return l.length>0?l:null}}})}
        >
        </a>
        <a
            class="c-quick-nav c-quick-nav--next"
            ${o("next")}
            ${t({toggleClass:{"is-disable":()=>!a.nextRoute},toggleAttribute:{href:()=>{let l=a.nextRoute;return l&&l.length>0?l:null}}})}
        >
        </a>
        <div class="c-quick-nav__label-container">
            <div class="c-quick-nav__label" ${o("labels")}>
                <div
                    class="c-quick-nav__label__container"
                    ${o("labelList")}
                >
                    <span class="c-quick-nav__label__item">previous item</span>
                    <span class="c-quick-nav__label__item">all items</span>
                    <span class="c-quick-nav__label__item">next item</span>
                </div>
            </div>
        </div>
    </div>`};var p0=m.createComponent({tag:"quick-nav",component:u0,state:{active:()=>({value:!1,type:Boolean}),backRoute:()=>({value:"",type:String}),prevRoute:()=>({value:"",type:String}),nextRoute:()=>({value:"",type:String}),currentLabelId:()=>({value:-1,type:Number})}});var Fk=({proxi:e,bindEffect:t})=>e.data.map(({label:r,url:o})=>{let n=o.replaceAll("#","");return g`
                <li class="right-sidebar__item">
                    <a
                        href="${o}"
                        class="right-sidebar__link"
                        ${t({toggleClass:{active:()=>e.activeRoute.route===n}})}
                        >${r}</a
                    >
                </li>
            `}).join(""),m0=({getProxi:e,invalidate:t,addMethod:r,computed:o,bindEffect:n})=>{let s=e();return r("updateList",i=>{s.data=i}),m.afterRouteChange(({currentTemplate:i})=>{Ic.has(i)||(s.data=[])}),o(()=>s.isVisible,()=>s.data.length>0),g`<div
        class="right-sidebar"
        ${n({toggleClass:{visible:()=>s.isVisible}})}
    >
        <div class="right-sidebar__title">Sections:</div>
        <ul class="right-sidebar__list">
            ${t({observe:()=>s.data,render:()=>Fk({proxi:s,bindEffect:n})})}
        </ul>
    </div>`};var d0=m.createComponent({tag:"right-sidebar",component:m0,bindStore:[m.mainStore],state:{data:()=>({value:[],type:Array}),isVisible:()=>({value:!1,type:Boolean})}});var h0=({onMount:e,getProxi:t,bindEffect:r,addMethod:o})=>{let n=t();return o("skip",()=>{n.skip=!1}),e(({element:s})=>{n.isDisable=!0;let i=z.createTimeTween({data:{opacity:1,scale:1},duration:500});i.subscribe(({opacity:l,scale:p})=>{s.style.opacity=l,s.style.transform=`scale(${p})`});let a=m.beforeRouteChange(async()=>{n.skip||(n.isDisable=!1,await i.set({opacity:1}),i.goTo({scale:1}))}),c=m.afterRouteChange(async()=>{await i.goTo({opacity:0,scale:.9}).catch(()=>{}),n.isDisable=!0});return()=>{i.destroy(),i=null,a(),c()}}),g`
        <div
            class="c-loader center-viewport"
            ${r({toggleClass:{disable:()=>n.isDisable}})}
        >
            <span class="c-loader__inner"></span>
        </div>
    `};var f0=m.createComponent({tag:"route-loader",component:h0,state:{isLoading:()=>({value:!1,type:Boolean}),isDisable:()=>({value:!1,type:Boolean}),skip:()=>({value:!0,type:Boolean})}});var g0=({getProxi:e,bindEffect:t,addMethod:r})=>{let o=e();return r("update",n=>{o.active=n}),g`
        <div
            class="c-scroller-down-label"
            ${t({toggleClass:{active:()=>o.active}})}
        >
            Scroll down
        </div>
    `};var b0=m.createComponent({tag:"scroll-down-label",component:g0,state:{active:()=>({value:!1,type:Boolean})}});var y0=()=>{m.useMethodByName(zo)?.setInputFocus()},bp=e=>{m.useMethodByName(zo)?.updateCurrentSearchFromSuggestion(e)},v0=e=>{m.useMethodByName(zo)?.shouldCloseSuggestion(e)},Oc=()=>{m.useMethodByName(zo)?.closeSuggestion()};var T0=({proxi:e})=>{e.active=!1,Oc()},Bk=({currentTarget:e})=>{e&&v0(e)},_0=({getProxi:e,delegateEvents:t,bindEffect:r,addMethod:o,bindObject:n,staticProps:s})=>{let i=e();return o("toggle",()=>{i.active=!i.active}),g`<div
        class="search-overlay"
        ${r({toggleClass:{active:()=>i.active}})}
    >
        <button
            class="search-overlay__background"
            type="button"
            ${t({click:()=>{T0({proxi:i})}})}
        ></button>
        <button
            type="button"
            class="search-overlay__close"
            ${t({click:()=>{T0({proxi:i})}})}
        ></button>

        <!-- Main content -->
        <div
            class="search-overlay__grid"
            ${t({click:a=>{Bk({currentTarget:a.currentTarget})}})}
        >
            <!-- Title -->
            <h2 class="search-overlay__title">Search</h2>

            <!-- Header -->
            <div class="search-overlay__header">
                <search-overlay-header
                    name="${zo}"
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
                    name="${ti}"
                ></search-overlay-list>
            </div>
        </div>
    </div>`};var S0=e=>{m.useMethodByName(ti)?.update(e)},x0=()=>{m.useMethodByName(ti)?.reset()};var Vk=async({currentSearch:e})=>{S0(e)},yp=({getRef:e})=>{let{search_input:t}=e(),r=t.value;Vk({currentSearch:r})},C0=({getRef:e,proxi:t})=>{x0();let{search_input:r}=e();r.value="",t.suggestionListData=[]},E0=e=>`~${e}`,Wk=({currentSearch:e,proxi:t})=>{let o=mr().suggestion;e.length===0&&(t.suggestionListData=[]);let s=e.split(" ").slice(-1).join("").replaceAll("~","").split(" ").filter(i=>i!=="")??"";t.suggestionListData=(o.filter(({word:i})=>s.some(a=>i.toLowerCase().includes(a.toLowerCase())))??[]).map(({word:i})=>({word:i,wordHiglight:(()=>{let a=s.reduce((c,l,p)=>c.toLowerCase().replaceAll(new RegExp(`(?<!~)${l.toLowerCase()}`,"g"),`${E0(p)}`),i);return s.reduce((c,l,p)=>c.replaceAll(`${E0(p)}`,`<span class="match-string">${l}</span>`),a)})()}))},w0=({delegateEvents:e,getRef:t,setRef:r,getProxi:o,bindProps:n,addMethod:s,onMount:i,computed:a,bindEffect:c})=>{let l=o();return a(()=>l.suggestionListActive,()=>l.suggestionListData.length>0),i(()=>{let{search_input:p,suggestionElement:d}=t();s("updateCurrentSearchFromSuggestion",f=>{let v=p.value.split(" "),b=v.length===0?f:`${v.slice(0,-1).join(" ")} ${f}`;p.value=b.trimStart(),l.suggestionListData=[],p.focus()}),s("shouldCloseSuggestion",f=>{d!==f&&!d.contains(f)&&(l.suggestionListData=[])}),s("closeSuggestion",()=>{l.suggestionListData=[]}),s("setInputFocus",async()=>{setTimeout(()=>{p.focus()},300)})}),g`<div class="search-overlay-header">
        <div class="search-overlay-header__input-container">
            <input
                type="text"
                class="search-overlay-header__input"
                ${r("search_input")}
                ${e({keyup:u.useDebounce(p=>{if(p.code.toLowerCase()==="enter"){p.preventDefault(),yp({getRef:t,proxi:l}),l.suggestionListData=[];return}if(p.code.toLowerCase()==="escape"){p.preventDefault(),l.suggestionListData=[];return}let d=p.target.value;Wk({currentSearch:d,proxi:l})},60)})}
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
            ${e({click:()=>{yp({getRef:t,proxi:l})},keydown:p=>{p.code.toLowerCase()==="enter"&&yp({getRef:t,proxi:l})}})}
        >
            submit
        </button>

        <!-- Reset -->
        <button
            type="button"
            class="search-overlay-header__button"
            ${e({click:()=>{C0({getRef:t,proxi:l})},keydown:p=>{p.code.toLowerCase()==="enter"&&C0({getRef:t,proxi:l})}})}
        >
            reset
        </button>
    </div>`};var I0=({getProxi:e,repeat:t,bindProps:r})=>{let o=e();return g`<div>
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
    </div>`};var jk=({code:e,word:t})=>{if(e.toLowerCase()==="enter"){bp(t);return}if(e.toLowerCase()==="escape"){Oc();return}},M0=({getProxi:e,delegateEvents:t,bindObject:r})=>{let o=e();return g`
        <li class="search-overlay-suggestion__item">
            <button
                type="button"
                class="search-overlay-suggestion__button"
                ${t({click:()=>{bp(o.word)},keydown:n=>{n.preventDefault(),jk({code:n.code,word:o.word})}})}
            >
                ${r`${()=>o.wordHiglight}`}
            </button>
        </li>
    `};var k0=m.createComponent({tag:"search-overlay-suggestion-item",component:M0,props:{word:()=>({value:"",type:String}),wordHiglight:()=>({value:"",type:String})}});var R0=m.createComponent({tag:"search-overlay-suggestion",component:I0,props:{list:()=>({value:[],type:Array})},child:[k0]});var N0=m.createComponent({tag:"search-overlay-header",component:w0,state:{suggestionListActive:()=>({value:!1,type:Boolean}),suggestionListData:()=>({value:[],type:Array})},child:[R0]});var Hk=async({source:e,uri:t,title:r,section:o,breadCrumbs:n})=>{let s=await fetch(e);return s.ok?{success:!0,data:(await s.json()).data,uri:t,title:r,section:o,breadCrumbs:n}:(console.warn(`${e} not found`),{success:!1,data:[{component:"",props:{}}],uri:t,title:r,section:o,breadCrumbs:[]})},zk=new Set(["mob-title","mob-paragraph","mob-list"]),Uk=new Set(["mob-title","mob-paragraph"]),Gk=new Set(["mob-list"]),P0=async({currentSearch:e=""})=>{let t=Mc.filter(({props:a})=>a?.source&&a?.title).map(({hash:a,props:c})=>({fn:Hk({source:c.source??"",uri:a??"uri not forud",title:c.title??"title not found",section:c.section??"title not found",breadCrumbs:c.breadCrumbs??[]})})),r=await Promise.all(t.map(({fn:a})=>a)),o=[],n=r.filter(({success:a})=>a).map(({data:a,uri:c,title:l,section:p,breadCrumbs:d})=>{let v=a.reduce((b,T)=>{if(!T)return b;let{component:S}=T;return S?T.component==="html-content"?T?.props?.data?[...b,T.props.data]:b:[...b,T]:b},o).flat().filter(({component:b})=>zk.has(b)).flatMap(b=>Uk.has(b?.component)?b.content:Gk.has(b?.component)?b?.props?.links?b.props.items.map(({label:T})=>T):b.props.items:b);return{uri:c,title:l,section:p,breadCrumbs:d,data:v}}),s=e.split(" ");return n.filter(a=>{let c=a.data.join(" ");return s.every(l=>c.toLowerCase().includes(l.toLowerCase()))}).toSorted(a=>a.title.toLowerCase().includes(e.toLowerCase())?-1:1).map(({title:a,uri:c,section:l,breadCrumbs:p,data:d})=>{let f=d.join("").toLowerCase().split(e.toLowerCase()),h=p.length>0?p.reduce((v,b,T)=>{let S=T>0?"/":"";return`${v}${S}${b.title}`},""):a;return{title:a,uri:c,section:l,breadCrumbs:h,count:f?.length??0}})};var qk=({getRef:e})=>{let{screen:t,scroller:r,scrollbar:o}=e();o.addEventListener("input",()=>{c(o.value)});let n=fr({screen:t,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},A0=({getProxi:e,repeat:t,setRef:r,getRef:o,onMount:n,watch:s,addMethod:i,bindEffect:a,invalidate:c,bindProps:l})=>{let p=e();i("update",async f=>{p.loading||(p.loading=!0,p.noResult=!1,p.list=await P0({currentSearch:f}),p.loading=!1,p.noResult=p.list.length===0,p.updatePrentSearchKey(f))}),i("reset",()=>{p.updatePrentSearchKey(""),p.list=[]});let d;return n(()=>{let{destroy:f,updateScroller:h,move:v,refresh:b}=qk({getRef:o});return d=v,s(()=>p.list,async()=>{await m.tick(),b(),h(),d(0)}),()=>{f?.()}}),g`<div class="search-overlay-list" ${r("screen")}>
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
    </div>`};var $c=()=>{m.useMethodByName(ac)?.toggle()};var Jk=({uri:e})=>{m.loadUrl({url:e}),$c()},O0=({getProxi:e,bindEffect:t,delegateEvents:r,bindObject:o})=>{let n=e();return g`
        <li
            class="search-overlay-list__item"
            ${t({toggleClass:{current:()=>n.active}})}
        >
            <button
                type="button"
                class="search-overlay-list__button"
                ${r({click:()=>{Jk({uri:n.uri})}})}
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
    `};var $0=m.createComponent({tag:"search-overlay-list-item",component:O0,props:{uri:()=>({value:"",type:String}),breadCrumbs:()=>({value:"",type:String}),title:()=>({value:"",type:String}),count:()=>({value:0,type:Number}),active:()=>({value:!1,type:Boolean})}});var L0=m.createComponent({tag:"search-overlay-list",component:A0,bindStore:m.mainStore,props:{updatePrentSearchKey:()=>({value:()=>{},type:Function})},state:{list:()=>({value:[],type:Array}),loading:()=>({value:!1,type:Boolean}),noResult:()=>({value:!1,type:Boolean})},child:[$0]});var D0=m.createComponent({tag:"search-overlay",component:_0,state:{active:()=>({value:!1,type:Boolean}),currentSearch:()=>({value:"",type:String})},child:[N0,L0]});var F0=()=>g`
        <div class="test-grid">
            <div class="test-grid__grid">
                <span></span><span></span><span></span><span></span><span></span
                ><span></span><span></span><span></span><span></span
                ><span></span><span></span><span></span>
            </div>
            <div class="test-grid__cont"><span>test</span></div>
        </div>
    `;var B0=m.createComponent({tag:"test-scss-grid",component:F0});var vo=()=>{let{templateName:e}=m.getActiveRoute();return Ic.has(e)?0:40};var V0=()=>{m.useMethodByName(nc)?.toggle()};var Yk=["Alberto Navarro","Milan, Italy",'<a href="https://github.com/albnavarro/" target="_blank">[ github ]</a>','<a href="https://www.linkedin.com/in/alberto-navarro74/" target="_blank">[ linkedin ]</a>'],Xk=()=>g`
        <ul class="l-footer__bio">
            ${Yk.map(e=>g` <li class="l-footer__bio__item">${e}</li> `).join("")}
        </ul>
    `,W0=({delegateEvents:e,getProxi:t,onMount:r,bindEffect:o})=>{let n=t();return r(()=>{u.useFrameIndex(()=>{n.isMounted=!0},vo())}),g`
        <footer
            class="l-footer"
            ${o({toggleClass:{"is-visible":()=>n.isMounted}})}
        >
            <div class="l-footer__container">
                ${Xk()}
                <div class="l-footer__debug">
                    <debug-button
                        class="c-button-debug"
                        ${e({click:()=>{V0()}})}
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
    `};var j0=()=>g`
        <button type="button" class="c-btn-debug">
            <mobjs-slot></mobjs-slot>
        </button>
    `;var H0=m.createComponent({tag:"debug-button",component:j0});var z0=m.createComponent({tag:"mob-footer",component:W0,child:[H0],state:{isMounted:()=>({value:!1,type:Boolean})}});var Lc=()=>{m.useMethodByName(ei)?.scrollTop()},Dc=()=>{m.useMethodByName(ei)?.refresh()};var ns=({fireCallback:e=!0}={})=>{m.useMethodByName(ic)?.closeAllAccordion({fireCallback:e})};function Kk(){m.loadUrl({url:"home"}),ns(),Z.set("navigationIsOpen",!1),Lc()}var U0=({delegateEvents:e,bindEffect:t,getProxi:r,onMount:o,addMethod:n})=>{let s=r();return o(({element:i})=>{n("getHeaderHeight",()=>ne(i)),u.useFrameIndex(()=>{s.isMounted=!0},vo())}),g`
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
                        ${e({click:()=>{Kk()}})}
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
    `};var G0=({delegateEvents:e,bindEffect:t,getProxi:r,onMount:o})=>{let n=r();return o(()=>{u.useFrameIndex(()=>{n.isMounted=!0},vo())}),g`
        <button
            class="hamburger"
            type="button"
            ${e({click:()=>{Z.update("navigationIsOpen",s=>!s),n.navigationIsOpen||qt()}})}
            ${t([{toggleClass:{"is-open":()=>n.navigationIsOpen}},{toggleClass:{"is-mounted":()=>n.isMounted}}])}
        >
            <div class="hamburger__box">
                <div class="hamburger-inner"></div>
            </div>
        </button>
    `};var q0=m.createComponent({tag:"mob-header-toggle",component:G0,bindStore:Z,state:{isMounted:()=>({value:!1,type:Boolean})}});var Qk=({event:e})=>{let t=e.target;console.log(t);let{url:r}=t?.dataset??"";m.loadUrl({url:r}),Z.set("navigationIsOpen",!1)};function Zk({delegateEvents:e}){let t=mr().header,{links:r}=t,o={github:ft().gitHubIcon};return r.map(n=>{let{svg:s,url:i,internal:a}=n;return g`<li class="l-header__sidenav__item">
                ${a?g`
                          <button
                              type="button"
                              data-url="${i}"
                              class="l-header__sidenav__link"
                              ${e({click:c=>{Qk({event:c})}})}
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
            </li>`}).join("")}var J0=({delegateEvents:e})=>g`
        <ul class="l-header__sidenav">
            <li class="l-header__sidenav__item">
                <history-cta></history-cta>
            </li>
            <li class="l-header__sidenav__item">
                <search-cta></search-cta>
            </li>
            ${Zk({delegateEvents:e})}
        </ul>
    `;var eR=()=>{$c(),y0()},Y0=({delegateEvents:e})=>{let t=ft().searchIcons;return g`<button
        type="button"
        class="search-cta"
        ${e({click:()=>{eR()}})}
    >
        ${t}
    </button>`};var X0=m.createComponent({tag:"search-cta",component:Y0});var K0=({delegateEvents:e})=>{let t=ft().historyIcons;return g`<button
        type="button"
        class="history-cta"
        ${e({click:()=>{Mx()}})}
    >
        ${t}
    </button>`};var Q0=m.createComponent({tag:"history-cta",component:K0});var Z0=m.createComponent({tag:"mob-header-utils",component:J0,child:[X0,Q0]});var tR=({delegateEvents:e,staticProps:t})=>mr().footer.nav.map(({label:o,url:n,section:s})=>g`<li class="header-main-menu__item">
                <header-main-menu-button
                    ${e({click:()=>{m.loadUrl({url:n}),Z.set("navigationIsOpen",!1)}})}
                    ${t({label:o,section:s})}
                ></header-main-menu-button>
            </li> `).join(""),eC=({delegateEvents:e,staticProps:t,getProxi:r,onMount:o,bindEffect:n})=>{let s=r();return o(()=>{u.useFrameIndex(()=>{s.isMounted=!0},10)}),g`
        <ul
            class="header-main-menu"
            ${n({toggleClass:{"is-visible":()=>s.isMounted}})}
        >
            ${tR({delegateEvents:e,staticProps:t})}
        </ul>
    `};var tC=({getProxi:e,bindEffect:t,computed:r})=>{let o=e();return r(()=>o.active,()=>o.section===o.activeNavigationSection),g`
        <button
            type="button"
            class="header-main-menu__button"
            ${t({toggleClass:{current:()=>o.active}})}
        >
            ${o.label}
        </button>
    `};var rC=m.createComponent({tag:"header-main-menu-button",component:tC,bindStore:Z,props:{label:()=>({value:"",type:String}),section:()=>({value:"",type:String})},state:{active:()=>({value:!1,type:Boolean})}});var oC=m.createComponent({tag:"header-main-menu",component:eC,child:[rC],state:{isMounted:()=>({value:!1,type:Boolean})}});var nC=m.createComponent({tag:"mob-header",component:U0,state:{isMounted:()=>({value:!1,type:Boolean})},child:[oC,Z0,q0]});var vp=0,sC=({root:e})=>{let t=e.querySelector(".l-navcontainer__wrap"),r=e.querySelector(".l-navcontainer__scroll"),o=e.querySelector(".l-navcontainer__percent"),n=200,s=new xt({screen:t,scroller:r,direction:"vertical",drag:!0,scopedEvent:!1,onUpdate:({percent:i})=>{let{navigationIsOpen:a}=Z.get();a&&(vp=Math.round(i)/100,o.style.transform=`translateZ(0) scaleX(${vp})`)}});return s.init(),Z.watch("activeNavigationSection",i=>{let a=document.querySelector(`[data-sectionname='${i}']`);if(!a)return;let c=document.querySelector(".l-header"),l=document.querySelector(".l-footer"),p=ne(r),d=ne(c),f=ne(l),v=100*a.offsetTop/(p-window.innerHeight+d+f);setTimeout(()=>{Z.getProp("navigationIsOpen")||s.set(v)},400)}),Z.watch("navigationIsOpen",i=>{if(i){o.style.transform=`translateZ(0) scaleX(${vp})`;return}o.style.transform="translateZ(0) scaleX(0)"}),{scrollNativationToTop:()=>{setTimeout(()=>{s.move(0).catch(()=>{}),o.style.transform="translateZ(0) scaleX(0)"},n)},refreshScroller:()=>{s.refresh()}}};function rR({main:e,proxi:t}){t.isOpen=!1,u.useFrame(()=>{document.body.style.overflow="",e.classList.remove("shift")})}function oR({main:e,proxi:t}){Dc(),t.isOpen=!0,u.useFrame(()=>{document.body.style.overflow="hidden",e.classList.add("shift")})}function nR({main:e}){e.addEventListener("click",()=>{Z.set("navigationIsOpen",!1),qt()})}var sR=()=>{Lc(),ns();let{navigationIsOpen:e}=Z.get();e||Or.to(0)},iC=({onMount:e,addMethod:t,delegateEvents:r,bindEffect:o,getProxi:n})=>{let s=n();return e(({element:i})=>{let a=document.querySelector("main.main");Z.watch("navigationIsOpen",p=>{if(p&&a){oR({main:a,proxi:s});return}rR({main:a,proxi:s})}),nR({main:a});let{scrollNativationToTop:c,refreshScroller:l}=sC({root:i});return t("scrollTop",c),t("refresh",l),u.useFrameIndex(()=>{s.isMounted=!0},vo()),()=>{}}),g`
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
                    ${r({click:()=>{sR()}})}
                ></button>
            </div>
            <div class="l-navcontainer__wrap">
                <div class="l-navcontainer__scroll">
                    <mob-navigation
                        name="${ic}"
                    ></mob-navigation>
                </div>
            </div>
        </div>
    `};function iR({data:e,staticProps:t,bindProps:r,proxi:o}){return e.map((n,s)=>{let{label:i,url:a,activeId:c,children:l,section:p,sectioName:d,scrollToSection:f,forceChildren:h,hide:v}=n;return p?g`
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
                  `}).join("")}var aC=({staticProps:e,setState:t,bindProps:r,addMethod:o,getProxi:n})=>{let s=n(),{navigation:i}=mr();return o("closeAllAccordion",({fireCallback:a=!0}={})=>{t(()=>s.currentAccordionId,-1,{emit:a})}),g`
        <nav class="l-navigation">
            <ul class="l-navigation__list">
                ${iR({data:i,staticProps:e,bindProps:r,proxi:s})}
            </ul>
        </nav>
    `};var cC=({bindEffect:e,getProxi:t})=>{let r=t();return g`
        <div
            class="l-navigation__label"
            data-sectionname="${r.sectioName}"
            ${e({toggleClass:{active:()=>r.sectioName===r.activeNavigationSection,hide:()=>!!r.hide}})}
        >
            ${r.label}
        </div>
    `};var lC=m.createComponent({tag:"mob-navigation-label",component:cC,bindStore:Z,props:{label:()=>({value:"",type:String}),sectioName:()=>({value:"",type:String}),hide:()=>({value:!1,type:Boolean})}});function aR({proxi:e,staticProps:t}){return e.children.map(r=>{let{label:o,url:n,scrollToSection:s,activeId:i}=r;return g`
                <li class="l-navigation__submenu__item">
                    <mob-navigation-button
                        ${t({label:o,url:n,subMenuClass:"l-navigation__link--submenu",scrollToSection:s,activeId:i??-1,callback:()=>{e.callback({forceClose:!1})}})}
                    ></mob-navigation-button>
                </li>
            `}).join("")}var uC=({onMount:e,staticProps:t,bindProps:r,watch:o,setRef:n,getRef:s,getProxi:i})=>{let a=i(),{label:c,url:l,activeId:p}=a.headerButton;return e(()=>{let{content:d}=s();return $r.subscribe(d),$r.reset(d),o(()=>a.isOpen,async f=>{await $r[f?"down":"up"](d),Dc(),!f&&ns({fireCallback:!1})},{immediate:!0}),()=>{}}),g`
        <li class="l-navigation__item has-child">
            <mob-navigation-button
                ${t({label:c,url:l,arrowClass:"l-navigation__link--arrow",fireRoute:!1,activeId:p??-1,callback:()=>{a.callback({forceClose:a.isOpen})}})}
                ${r(()=>({isOpen:a.isOpen}))}
            ></mob-navigation-button>
            <ul class="l-navigation__submenu" ${n("content")}>
                ${aR({proxi:a,staticProps:t})}
            </ul>
        </li>
    `};var pC=({delegateEvents:e,getProxi:t,bindEffect:r})=>{let o=t(),{label:n,url:s,arrowClass:i,subMenuClass:a,fireRoute:c,callback:l,scrollToSection:p,activeId:d,forceChildren:f}=o;return m.afterRouteChange(({currentRoute:h})=>{u.useFrame(()=>{let b=s.split("?")?.[0]??"",T=m.getActiveParams(),S=d===-1||T?.activeId===`${d}`,_=h===b&&S,E=f.includes(h);o.isCurrent=_||E,_&&c&&(l(),Z.set("activeNavigationSection",p))})}),g`
        <button
            type="button"
            class="l-navigation__link  ${i} ${a}"
            ${e({click:()=>{l(),c&&(m.loadUrl({url:s}),Z.set("navigationIsOpen",!1))}})}
            ${r({toggleClass:{active:()=>o.isOpen,current:()=>o.isCurrent}})}
        >
            ${n}
        </button>
    `};var Fc=m.createComponent({tag:"mob-navigation-button",component:pC,props:{label:()=>({value:"",type:String}),url:()=>({value:"",type:String}),arrowClass:()=>({value:"",type:String}),subMenuClass:()=>({value:"",type:String}),fireRoute:()=>({value:!0,type:Boolean}),callback:()=>({value:()=>{},type:Function}),isOpen:()=>({value:!1,type:Boolean}),scrollToSection:()=>({value:"",type:String}),activeId:()=>({value:-1,type:Number}),forceChildren:()=>({value:[],type:Array})},state:{isCurrent:()=>({value:!1,type:Boolean})}});var mC=m.createComponent({tag:"mob-navigation-submenu",component:uC,props:{callback:()=>({value:()=>{},type:Function}),headerButton:()=>({value:{},type:"Any"}),children:()=>({value:[],type:Array}),isOpen:()=>({value:!1,type:Boolean})},child:[Fc]});var dC=m.createComponent({tag:"mob-navigation",component:aC,state:{currentAccordionId:()=>({value:-1,type:Number,skipEqual:!1})},child:[lC,mC,Fc]});var hC=m.createComponent({tag:"mob-navigation-container",component:iC,child:[dC],state:{isOpen:()=>({value:!1,type:Boolean}),isMounted:()=>({value:!1,type:Boolean})}});m.useComponent([nC,hC,z0,p0,f0,b0,l0,s0,B0,D0,d0,Ax]);var fC=async()=>g`
        ${""}
        <custom-history name="${qn}"></custom-history>
        <debug-overlay name="${nc}"></debug-overlay>
        <mob-header name="${dT}"></mob-header>
        <mob-navigation-container
            name="${ei}"
        ></mob-navigation-container>
        <main class="main">
            <div class="container">
                <div class="inner-wrap">
                    <div id="content"></div>
                </div>
            </div>
        </main>
        <mob-footer> </mob-footer>
        <quick-nav name="${Ks}"></quick-nav>
        <route-loader name="${lc}"></route-loader>
        <scroll-down-label name="${Qs}"></scroll-down-label>
        <links-mobjs></links-mobjs>
        <right-sidebar name="${cc}"></right-sidebar>
        <search-overlay name="${ac}"></search-overlay>
    `;var Tp=0,_p=document.querySelector(".js-main-loader-track"),gC=(e=60)=>{let t=()=>{if(Tp++,!_p)return;let r=100*Tp/e;if(_p.style.transform=`scaleX(${r/100})`,Tp>=e){_p=null;return}u.useNextFrame(()=>{t()})};u.useFrame(()=>{t()})};var bC=e=>{m.useMethodByName(lc).skip(e)};var yC=60,vC=()=>ce.mq("max","desktop"),cR=()=>{u.useResize(()=>{vC()&&m.loadUrl({url:"onlyDesktop"})})},Vc=document.body.querySelector(".js-main-loader"),Wc=document.body.querySelector(".js-main-loader-background"),Bc=z.createTimeTween({data:{opacity:1},duration:1e3});Vc&&Wc&&[Vc,Wc].forEach(e=>{Bc?.subscribe(({opacity:t})=>{e.style.opacity=t})});var lR=async()=>{await kv(),await Rv(),gC(yC),await u.useFps({duration:yC,force:!0}),m.inizializeApp({rootId:"#root",contentId:"#content",wrapper:fC,routes:Mc,index:"home",pageNotFound:"pageNotFound",beforePageTransition:Sx,pageTransition:xx,afterInit:async()=>{await Bc.goTo({opacity:0}),Bc.destroy(),Bc=null,Vc?.remove(),Wc?.remove(),Vc=null,Wc=null,Ex(),cR(),bC(!1)},redirect:({route:e})=>vC()?"onlyDesktop":e,restoreScroll:!0,componentDefaultProps:{scoped:!1,maxParseIteration:1e4,debug:!1}})};u.useLoad(()=>{Ev(),ce.setDefault({deferredNextTick:!0}),lR(),Cv()});})();
//# sourceMappingURL=main.js.map
