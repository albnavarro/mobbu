"use strict";(()=>{var _C=Object.create;var tl=Object.defineProperty;var SC=Object.getOwnPropertyDescriptor;var xC=Object.getOwnPropertyNames;var CC=Object.getPrototypeOf,EC=Object.prototype.hasOwnProperty;var wC=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),So=(e,t)=>{for(var r in t)tl(e,r,{get:t[r],enumerable:!0})},IC=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of xC(t))!EC.call(e,n)&&n!==r&&tl(e,n,{get:()=>t[n],enumerable:!(o=SC(t,n))||o.enumerable});return e};var MC=(e,t,r)=>(r=e!=null?_C(CC(e)):{},IC(t||!e||!e.__esModule?tl(r,"default",{value:e,enumerable:!0}):r,e));var mT=wC(($J,pT)=>{function Zy(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{let r=e[t],o=typeof r;(o==="object"||o==="function")&&!Object.isFrozen(r)&&Zy(r)}),e}var pc=class{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}};function eT(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function go(e,...t){let r=Object.create(null);for(let o in e)r[o]=e[o];return t.forEach(function(o){for(let n in o)r[n]=o[n]}),r}var GI="</span>",qy=e=>!!e.scope,qI=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){let r=e.split(".");return[`${t}${r.shift()}`,...r.map((o,n)=>`${o}${"_".repeat(n+1)}`)].join(" ")}return`${t}${e}`},Yu=class{constructor(t,r){this.buffer="",this.classPrefix=r.classPrefix,t.walk(this)}addText(t){this.buffer+=eT(t)}openNode(t){if(!qy(t))return;let r=qI(t.scope,{prefix:this.classPrefix});this.span(r)}closeNode(t){qy(t)&&(this.buffer+=GI)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}},Jy=(e={})=>{let t={children:[]};return Object.assign(t,e),t},Xu=class e{constructor(){this.rootNode=Jy(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){let r=Jy({scope:t});this.add(r),this.stack.push(r)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,r){return typeof r=="string"?t.addText(r):r.children&&(t.openNode(r),r.children.forEach(o=>this._walk(t,o)),t.closeNode(r)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(r=>typeof r=="string")?t.children=[t.children.join("")]:t.children.forEach(r=>{e._collapse(r)}))}},Ku=class extends Xu{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,r){let o=t.root;r&&(o.scope=`language:${r}`),this.add(o)}toHTML(){return new Yu(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}};function ni(e){return e?typeof e=="string"?e:e.source:null}function tT(e){return Ho("(?=",e,")")}function JI(e){return Ho("(?:",e,")*")}function YI(e){return Ho("(?:",e,")?")}function Ho(...e){return e.map(r=>ni(r)).join("")}function XI(e){let t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function Zu(...e){return"("+(XI(e).capture?"":"?:")+e.map(o=>ni(o)).join("|")+")"}function rT(e){return new RegExp(e.toString()+"|").exec("").length-1}function KI(e,t){let r=e&&e.exec(t);return r&&r.index===0}var QI=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function ep(e,{joinWith:t}){let r=0;return e.map(o=>{r+=1;let n=r,s=ni(o),i="";for(;s.length>0;){let a=QI.exec(s);if(!a){i+=s;break}i+=s.substring(0,a.index),s=s.substring(a.index+a[0].length),a[0][0]==="\\"&&a[1]?i+="\\"+String(Number(a[1])+n):(i+=a[0],a[0]==="("&&r++)}return i}).map(o=>`(${o})`).join(t)}var ZI=/\b\B/,oT="[a-zA-Z]\\w*",tp="[a-zA-Z_]\\w*",nT="\\b\\d+(\\.\\d+)?",sT="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",iT="\\b(0b[01]+)",eM="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",tM=(e={})=>{let t=/^#![ ]*\//;return e.binary&&(e.begin=Ho(t,/.*\b/,e.binary,/\b.*/)),go({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(r,o)=>{r.index!==0&&o.ignoreMatch()}},e)},si={begin:"\\\\[\\s\\S]",relevance:0},rM={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[si]},oM={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[si]},nM={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},hc=function(e,t,r={}){let o=go({scope:"comment",begin:e,end:t,contains:[]},r);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});let n=Zu("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:Ho(/[ ]+/,"(",n,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},sM=hc("//","$"),iM=hc("/\\*","\\*/"),aM=hc("#","$"),cM={scope:"number",begin:nT,relevance:0},lM={scope:"number",begin:sT,relevance:0},uM={scope:"number",begin:iT,relevance:0},pM={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[si,{begin:/\[/,end:/\]/,relevance:0,contains:[si]}]},mM={scope:"title",begin:oT,relevance:0},hM={scope:"title",begin:tp,relevance:0},dM={begin:"\\.\\s*"+tp,relevance:0},fM=function(e){return Object.assign(e,{"on:begin":(t,r)=>{r.data._beginMatch=t[1]},"on:end":(t,r)=>{r.data._beginMatch!==t[1]&&r.ignoreMatch()}})},uc=Object.freeze({__proto__:null,APOS_STRING_MODE:rM,BACKSLASH_ESCAPE:si,BINARY_NUMBER_MODE:uM,BINARY_NUMBER_RE:iT,COMMENT:hc,C_BLOCK_COMMENT_MODE:iM,C_LINE_COMMENT_MODE:sM,C_NUMBER_MODE:lM,C_NUMBER_RE:sT,END_SAME_AS_BEGIN:fM,HASH_COMMENT_MODE:aM,IDENT_RE:oT,MATCH_NOTHING_RE:ZI,METHOD_GUARD:dM,NUMBER_MODE:cM,NUMBER_RE:nT,PHRASAL_WORDS_MODE:nM,QUOTE_STRING_MODE:oM,REGEXP_MODE:pM,RE_STARTERS_RE:eM,SHEBANG:tM,TITLE_MODE:mM,UNDERSCORE_IDENT_RE:tp,UNDERSCORE_TITLE_MODE:hM});function gM(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function bM(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function vM(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=gM,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function yM(e,t){Array.isArray(e.illegal)&&(e.illegal=Zu(...e.illegal))}function TM(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function _M(e,t){e.relevance===void 0&&(e.relevance=1)}var SM=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");let r=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=r.keywords,e.begin=Ho(r.beforeMatch,tT(r.begin)),e.starts={relevance:0,contains:[Object.assign(r,{endsParent:!0})]},e.relevance=0,delete r.beforeMatch},xM=["of","and","for","in","not","or","if","then","parent","list","value"],CM="keyword";function aT(e,t,r=CM){let o=Object.create(null);return typeof e=="string"?n(r,e.split(" ")):Array.isArray(e)?n(r,e):Object.keys(e).forEach(function(s){Object.assign(o,aT(e[s],t,s))}),o;function n(s,i){t&&(i=i.map(a=>a.toLowerCase())),i.forEach(function(a){let c=a.split("|");o[c[0]]=[s,EM(c[0],c[1])]})}}function EM(e,t){return t?Number(t):wM(e)?0:1}function wM(e){return xM.includes(e.toLowerCase())}var Yy={},zo=e=>{console.error(e)},Xy=(e,...t)=>{console.log(`WARN: ${e}`,...t)},Gn=(e,t)=>{Yy[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Yy[`${e}/${t}`]=!0)},mc=new Error;function cT(e,t,{key:r}){let o=0,n=e[r],s={},i={};for(let a=1;a<=t.length;a++)i[a+o]=n[a],s[a+o]=!0,o+=rT(t[a-1]);e[r]=i,e[r]._emit=s,e[r]._multi=!0}function IM(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw zo("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),mc;if(typeof e.beginScope!="object"||e.beginScope===null)throw zo("beginScope must be object"),mc;cT(e,e.begin,{key:"beginScope"}),e.begin=ep(e.begin,{joinWith:""})}}function MM(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw zo("skip, excludeEnd, returnEnd not compatible with endScope: {}"),mc;if(typeof e.endScope!="object"||e.endScope===null)throw zo("endScope must be object"),mc;cT(e,e.end,{key:"endScope"}),e.end=ep(e.end,{joinWith:""})}}function kM(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function RM(e){kM(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),IM(e),MM(e)}function PM(e){function t(i,a){return new RegExp(ni(i),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(a?"g":""))}class r{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(a,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,a]),this.matchAt+=rT(a)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);let a=this.regexes.map(c=>c[1]);this.matcherRe=t(ep(a,{joinWith:"|"}),!0),this.lastIndex=0}exec(a){this.matcherRe.lastIndex=this.lastIndex;let c=this.matcherRe.exec(a);if(!c)return null;let l=c.findIndex((h,f)=>f>0&&h!==void 0),p=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,p)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(a){if(this.multiRegexes[a])return this.multiRegexes[a];let c=new r;return this.rules.slice(a).forEach(([l,p])=>c.addRule(l,p)),c.compile(),this.multiRegexes[a]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(a,c){this.rules.push([a,c]),c.type==="begin"&&this.count++}exec(a){let c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(a);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){let p=this.getMatcher(0);p.lastIndex=this.lastIndex+1,l=p.exec(a)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function n(i){let a=new o;return i.contains.forEach(c=>a.addRule(c.begin,{rule:c,type:"begin"})),i.terminatorEnd&&a.addRule(i.terminatorEnd,{type:"end"}),i.illegal&&a.addRule(i.illegal,{type:"illegal"}),a}function s(i,a){let c=i;if(i.isCompiled)return c;[bM,TM,RM,SM].forEach(p=>p(i,a)),e.compilerExtensions.forEach(p=>p(i,a)),i.__beforeBegin=null,[vM,yM,_M].forEach(p=>p(i,a)),i.isCompiled=!0;let l=null;return typeof i.keywords=="object"&&i.keywords.$pattern&&(i.keywords=Object.assign({},i.keywords),l=i.keywords.$pattern,delete i.keywords.$pattern),l=l||/\w+/,i.keywords&&(i.keywords=aT(i.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),a&&(i.begin||(i.begin=/\B|\b/),c.beginRe=t(c.begin),!i.end&&!i.endsWithParent&&(i.end=/\B|\b/),i.end&&(c.endRe=t(c.end)),c.terminatorEnd=ni(c.end)||"",i.endsWithParent&&a.terminatorEnd&&(c.terminatorEnd+=(i.end?"|":"")+a.terminatorEnd)),i.illegal&&(c.illegalRe=t(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map(function(p){return NM(p==="self"?i:p)})),i.contains.forEach(function(p){s(p,c)}),i.starts&&s(i.starts,a),c.matcher=n(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=go(e.classNameAliases||{}),s(e)}function lT(e){return e?e.endsWithParent||lT(e.starts):!1}function NM(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return go(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:lT(e)?go(e,{starts:e.starts?go(e.starts):null}):Object.isFrozen(e)?go(e):e}var AM="11.11.1",Qu=class extends Error{constructor(t,r){super(t),this.name="HTMLInjectionError",this.html=r}},Ju=eT,Ky=go,Qy=Symbol("nomatch"),OM=7,uT=function(e){let t=Object.create(null),r=Object.create(null),o=[],n=!0,s="Could not find the language '{}', did you forget to load/include a language module?",i={disableAutodetect:!0,name:"Plain text",contains:[]},a={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Ku};function c(C){return a.noHighlightRe.test(C)}function l(C){let M=C.className+" ";M+=C.parentNode?C.parentNode.className:"";let F=a.languageDetectRe.exec(M);if(F){let B=A(F[1]);return B||(Xy(s.replace("{}",F[1])),Xy("Falling back to no-highlight mode for this block.",C)),B?F[1]:"no-highlight"}return M.split(/\s+/).find(B=>c(B)||A(B))}function p(C,M,F){let B="",V="";typeof M=="object"?(B=C,F=M.ignoreIllegals,V=M.language):(Gn("10.7.0","highlight(lang, code, ...args) has been deprecated."),Gn("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),V=C,B=M),F===void 0&&(F=!0);let U={code:B,language:V};k("before:highlight",U);let te=U.result?U.result:h(U.language,U.code,F);return te.code=U.code,k("after:highlight",te),te}function h(C,M,F,B){let V=Object.create(null);function U(W,q){return W.keywords[q]}function te(){if(!Y.keywords){Ve.addText(xe);return}let W=0;Y.keywordPatternRe.lastIndex=0;let q=Y.keywordPatternRe.exec(xe),me="";for(;q;){me+=xe.substring(W,q.index);let Ce=$e.case_insensitive?q[0].toLowerCase():q[0],ot=U(Y,Ce);if(ot){let[gr,yC]=ot;if(Ve.addText(me),me="",V[Ce]=(V[Ce]||0)+1,V[Ce]<=OM&&(vi+=yC),gr.startsWith("_"))me+=q[0];else{let TC=$e.classNameAliases[gr]||gr;oe(q[0],TC)}}else me+=q[0];W=Y.keywordPatternRe.lastIndex,q=Y.keywordPatternRe.exec(xe)}me+=xe.substring(W),Ve.addText(me)}function ce(){if(xe==="")return;let W=null;if(typeof Y.subLanguage=="string"){if(!t[Y.subLanguage]){Ve.addText(xe);return}W=h(Y.subLanguage,xe,!0,Fr[Y.subLanguage]),Fr[Y.subLanguage]=W._top}else W=d(xe,Y.subLanguage.length?Y.subLanguage:null);Y.relevance>0&&(vi+=W.relevance),Ve.__addSublanguage(W._emitter,W.language)}function G(){Y.subLanguage!=null?ce():te(),xe=""}function oe(W,q){W!==""&&(Ve.startScope(q),Ve.addText(W),Ve.endScope())}function se(W,q){let me=1,Ce=q.length-1;for(;me<=Ce;){if(!W._emit[me]){me++;continue}let ot=$e.classNameAliases[W[me]]||W[me],gr=q[me];ot?oe(gr,ot):(xe=gr,te(),xe=""),me++}}function re(W,q){return W.scope&&typeof W.scope=="string"&&Ve.openNode($e.classNameAliases[W.scope]||W.scope),W.beginScope&&(W.beginScope._wrap?(oe(xe,$e.classNameAliases[W.beginScope._wrap]||W.beginScope._wrap),xe=""):W.beginScope._multi&&(se(W.beginScope,q),xe="")),Y=Object.create(W,{parent:{value:Y}}),Y}function ke(W,q,me){let Ce=KI(W.endRe,me);if(Ce){if(W["on:end"]){let ot=new pc(W);W["on:end"](q,ot),ot.isMatchIgnored&&(Ce=!1)}if(Ce){for(;W.endsParent&&W.parent;)W=W.parent;return W}}if(W.endsWithParent)return ke(W.parent,q,me)}function je(W){return Y.matcher.regexIndex===0?(xe+=W[0],1):(el=!0,0)}function X(W){let q=W[0],me=W.rule,Ce=new pc(me),ot=[me.__beforeBegin,me["on:begin"]];for(let gr of ot)if(gr&&(gr(W,Ce),Ce.isMatchIgnored))return je(q);return me.skip?xe+=q:(me.excludeBegin&&(xe+=q),G(),!me.returnBegin&&!me.excludeBegin&&(xe=q)),re(me,W),me.returnBegin?0:q.length}function ye(W){let q=W[0],me=M.substring(W.index),Ce=ke(Y,W,me);if(!Ce)return Qy;let ot=Y;Y.endScope&&Y.endScope._wrap?(G(),oe(q,Y.endScope._wrap)):Y.endScope&&Y.endScope._multi?(G(),se(Y.endScope,W)):ot.skip?xe+=q:(ot.returnEnd||ot.excludeEnd||(xe+=q),G(),ot.excludeEnd&&(xe=q));do Y.scope&&Ve.closeNode(),!Y.skip&&!Y.subLanguage&&(vi+=Y.relevance),Y=Y.parent;while(Y!==Ce.parent);return Ce.starts&&re(Ce.starts,W),ot.returnEnd?0:q.length}function Re(){let W=[];for(let q=Y;q!==$e;q=q.parent)q.scope&&W.unshift(q.scope);W.forEach(q=>Ve.openNode(q))}let Oe={};function Ye(W,q){let me=q&&q[0];if(xe+=W,me==null)return G(),0;if(Oe.type==="begin"&&q.type==="end"&&Oe.index===q.index&&me===""){if(xe+=M.slice(q.index,q.index+1),!n){let Ce=new Error(`0 width match regex (${C})`);throw Ce.languageName=C,Ce.badRule=Oe.rule,Ce}return 1}if(Oe=q,q.type==="begin")return X(q);if(q.type==="illegal"&&!F){let Ce=new Error('Illegal lexeme "'+me+'" for mode "'+(Y.scope||"<unnamed>")+'"');throw Ce.mode=Y,Ce}else if(q.type==="end"){let Ce=ye(q);if(Ce!==Qy)return Ce}if(q.type==="illegal"&&me==="")return xe+=`
`,1;if(Zc>1e5&&Zc>q.index*3)throw new Error("potential infinite loop, way more iterations than matches");return xe+=me,me.length}let $e=A(C);if(!$e)throw zo(s.replace("{}",C)),new Error('Unknown language: "'+C+'"');let Dr=PM($e),$t="",Y=B||Dr,Fr={},Ve=new a.__emitter(a);Re();let xe="",vi=0,_o=0,Zc=0,el=!1;try{if($e.__emitTokens)$e.__emitTokens(M,Ve);else{for(Y.matcher.considerAll();;){Zc++,el?el=!1:Y.matcher.considerAll(),Y.matcher.lastIndex=_o;let W=Y.matcher.exec(M);if(!W)break;let q=M.substring(_o,W.index),me=Ye(q,W);_o=W.index+me}Ye(M.substring(_o))}return Ve.finalize(),$t=Ve.toHTML(),{language:C,value:$t,relevance:vi,illegal:!1,_emitter:Ve,_top:Y}}catch(W){if(W.message&&W.message.includes("Illegal"))return{language:C,value:Ju(M),illegal:!0,relevance:0,_illegalBy:{message:W.message,index:_o,context:M.slice(_o-100,_o+100),mode:W.mode,resultSoFar:$t},_emitter:Ve};if(n)return{language:C,value:Ju(M),illegal:!1,relevance:0,errorRaised:W,_emitter:Ve,_top:Y};throw W}}function f(C){let M={value:Ju(C),illegal:!1,relevance:0,_top:i,_emitter:new a.__emitter(a)};return M._emitter.addText(C),M}function d(C,M){M=M||a.languages||Object.keys(t);let F=f(C),B=M.filter(A).filter(R).map(G=>h(G,C,!1));B.unshift(F);let V=B.sort((G,oe)=>{if(G.relevance!==oe.relevance)return oe.relevance-G.relevance;if(G.language&&oe.language){if(A(G.language).supersetOf===oe.language)return 1;if(A(oe.language).supersetOf===G.language)return-1}return 0}),[U,te]=V,ce=U;return ce.secondBest=te,ce}function y(C,M,F){let B=M&&r[M]||F;C.classList.add("hljs"),C.classList.add(`language-${B}`)}function v(C){let M=null,F=l(C);if(c(F))return;if(k("before:highlightElement",{el:C,language:F}),C.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",C);return}if(C.children.length>0&&(a.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(C)),a.throwUnescapedHTML))throw new Qu("One of your code blocks includes unescaped HTML.",C.innerHTML);M=C;let B=M.textContent,V=F?p(B,{language:F,ignoreIllegals:!0}):d(B);C.innerHTML=V.value,C.dataset.highlighted="yes",y(C,F,V.language),C.result={language:V.language,re:V.relevance,relevance:V.relevance},V.secondBest&&(C.secondBest={language:V.secondBest.language,relevance:V.secondBest.relevance}),k("after:highlightElement",{el:C,result:V,text:B})}function T(C){a=Ky(a,C)}let S=()=>{x(),Gn("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function _(){x(),Gn("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let E=!1;function x(){function C(){x()}if(document.readyState==="loading"){E||window.addEventListener("DOMContentLoaded",C,!1),E=!0;return}document.querySelectorAll(a.cssSelector).forEach(v)}function w(C,M){let F=null;try{F=M(e)}catch(B){if(zo("Language definition for '{}' could not be registered.".replace("{}",C)),n)zo(B);else throw B;F=i}F.name||(F.name=C),t[C]=F,F.rawDefinition=M.bind(null,e),F.aliases&&O(F.aliases,{languageName:C})}function I(C){delete t[C];for(let M of Object.keys(r))r[M]===C&&delete r[M]}function N(){return Object.keys(t)}function A(C){return C=(C||"").toLowerCase(),t[C]||t[r[C]]}function O(C,{languageName:M}){typeof C=="string"&&(C=[C]),C.forEach(F=>{r[F.toLowerCase()]=M})}function R(C){let M=A(C);return M&&!M.disableAutodetect}function P(C){C["before:highlightBlock"]&&!C["before:highlightElement"]&&(C["before:highlightElement"]=M=>{C["before:highlightBlock"](Object.assign({block:M.el},M))}),C["after:highlightBlock"]&&!C["after:highlightElement"]&&(C["after:highlightElement"]=M=>{C["after:highlightBlock"](Object.assign({block:M.el},M))})}function $(C){P(C),o.push(C)}function D(C){let M=o.indexOf(C);M!==-1&&o.splice(M,1)}function k(C,M){let F=C;o.forEach(function(B){B[F]&&B[F](M)})}function L(C){return Gn("10.7.0","highlightBlock will be removed entirely in v12.0"),Gn("10.7.0","Please use highlightElement now."),v(C)}Object.assign(e,{highlight:p,highlightAuto:d,highlightAll:x,highlightElement:v,highlightBlock:L,configure:T,initHighlighting:S,initHighlightingOnLoad:_,registerLanguage:w,unregisterLanguage:I,listLanguages:N,getLanguage:A,registerAliases:O,autoDetection:R,inherit:Ky,addPlugin:$,removePlugin:D}),e.debugMode=function(){n=!1},e.safeMode=function(){n=!0},e.versionString=AM,e.regex={concat:Ho,lookahead:tT,either:Zu,optional:YI,anyNumberOfTimes:JI};for(let C in uc)typeof uc[C]=="object"&&Zy(uc[C]);return Object.assign(e,uc),e},qn=uT({});qn.newInstance=()=>uT({});pT.exports=qn;qn.HighlightJS=qn;qn.default=qn});var u={};So(u,{ANIMATION_STOP_REJECT:()=>fl,checkType:()=>Pe,createStore:()=>AE,debounce:()=>xo,getFps:()=>$E,getInstantFps:()=>OE,getTime:()=>Lt,getTypeName:()=>ss,getUnivoqueId:()=>we,mustMakeSomething:()=>LE,normalizeWheel:()=>ps,shouldMakeSomething:()=>DE,store:()=>mw,throttle:()=>yi,useCache:()=>HE,useDebounce:()=>xo,useFps:()=>jE,useFrame:()=>FE,useFrameIndex:()=>WE,useLinkedList:()=>hw,useLoad:()=>zE,useMouseClick:()=>qE,useMouseDown:()=>JE,useMouseMove:()=>XE,useMouseUp:()=>QE,useMouseWheel:()=>ew,useNextFrame:()=>VE,useNextLoop:()=>Dt,useNextTick:()=>BE,usePointerDown:()=>aw,usePointerLeave:()=>pw,usePointerMove:()=>cw,usePointerOut:()=>uw,usePointerOver:()=>iw,usePointerUp:()=>lw,useResize:()=>UE,useScroll:()=>tw,useScrollEnd:()=>sw,useScrollImmediate:()=>rw,useScrollStart:()=>nw,useScrollThrottle:()=>ow,useTouchEnd:()=>ZE,useTouchMove:()=>KE,useTouchStart:()=>YE,useVisibilityChange:()=>GE});var Lt=()=>typeof globalThis>"u"?Date.now():globalThis.performance.now(),kp=16.666666666666668;var yi=(e,t)=>{let r,o;return function(){let n=this,s=arguments;o?(clearTimeout(r),r=setTimeout(function(){Lt()-o>=t&&(e.apply(n,s),o=Lt())},t-(Lt()-o))):(e.apply(n,s),o=Lt())}};var xo=function(t,r=200){let o;return function(){let n=()=>Reflect.apply(t,this,arguments);clearTimeout(o),o=setTimeout(n,r)}};function le(e){if(!e)return 0;let t=e.offsetHeight,r=getComputedStyle(e);return t+=Number.parseInt(r.marginTop)+Number.parseInt(r.marginBottom),t}function ze(e){if(!e)return 0;let t=e.offsetWidth,r=getComputedStyle(e);return t+=Number.parseInt(r.marginLeft)+Number.parseInt(r.marginRight),t}function be(e){if(!e)return{top:0,left:0};let t=e.getBoundingClientRect();return{top:t.top+window.scrollY,left:t.left+window.scrollY}}function St(e){return e?e.getBoundingClientRect():{bottom:0,height:0,left:0,right:0,top:0,width:0,x:0,y:0}}function ns(e,t){let r=t?.parentNode;for(;r;){if(r===e)return!0;r=r?.parentNode}return!1}function Co(e){let t=globalThis.getComputedStyle(e),r=t.transform||t.mozTransform;if(r==="none"||r===void 0)return{x:0,y:0,z:0};let o=r.includes("3d")?"3d":"2d",n=r.match(/matrix.*\((.+)\)/)[1].split(", ");if(o==="2d")return{x:n[4],y:n[5],z:0};if(o==="3d")return{x:n[12],y:n[13],z:n[14]}}function rl(e){return typeof Node=="object"?e instanceof Node:e&&typeof e=="object"&&typeof e.nodeType=="number"&&typeof e.nodeName=="string"}var we=()=>`_${Math.random().toString(36).slice(2,9)}`;function Rp(e){var t=e.getBoundingClientRect();return t.top>=0&&t.bottom<=window.innerHeight}var ol=(e,t,r)=>Math.min(Math.max(e,t),r);var Ti=new Set,Dt=e=>{Ti.add(e),Ti.size===1&&setTimeout(()=>{Ti.forEach(t=>{t()}),Ti.clear()})};var nl="UNTYPED",Pp="STRING",Np="NUMBER",Ap="OBJECT",Op="FUNCTION",_i="ARRAY",$p="BOOLEAN",Lp="ELEMENT",Dp="HTMLELEMENT",Fp="NODELIST";var Ie={isString:e=>Object.prototype.toString.call(e)==="[object String]",isNumber:e=>Object.prototype.toString.call(e)==="[object Number]"&&Number.isFinite(e),isObject:e=>Object.prototype.toString.call(e)==="[object Object]",isFunction:e=>Object.prototype.toString.call(e)==="[object Function]",isArray:e=>Object.prototype.toString.call(e)==="[object Array]",isBoolean:e=>Object.prototype.toString.call(e)==="[object Boolean]",isElement:e=>e instanceof Element||e instanceof Document,isHTMLElement:e=>e instanceof HTMLElement,isSet:e=>e instanceof Set,isMap:e=>e instanceof Map,isNodeList:e=>Object.prototype.isPrototypeOf.call(NodeList.prototype,e)},ss=e=>{switch(e){case String:case Pp:return"String";case Number:case Np:return"Number";case Object:case Ap:return"Object";case Function:case Op:return"Function";case Array:case _i:return"Array";case Boolean:case $p:return"Boolean";case Element:case Lp:return"Element";case HTMLElement:case Dp:return"HTMLElement";case NodeList:case Fp:return"NodeList";case Set:case"SET":return"Set";case Map:case"MAP":return"Map";case"ANY":return"ANY";default:return nl}},Pe=(e,t)=>{switch(e){case String:case Pp:return Ie.isString(t);case Number:case Np:return Ie.isNumber(t);case Object:case Ap:return Ie.isObject(t);case Function:case Op:return Ie.isFunction(t);case Array:case _i:return Ie.isArray(t);case Boolean:case $p:return Ie.isBoolean(t);case Element:case Lp:return Ie.isElement(t);case HTMLElement:case Dp:return Ie.isHTMLElement(t);case NodeList:case Fp:return Ie.isNodeList(t);case Set:case"SET":return Ie.isSet(t);case Map:case"MAP":return Ie.isMap(t);case"ANY":return!0;default:return!0}};var PC=(e,t)=>e.size===t.size&&[...e.keys()].every(r=>e.get(r)===t.get(r)),NC=(e,t)=>e.size===t.size&&[...e].every(r=>t.has(r)),AC=(e,t)=>{if(e.length!==t.length)return!1;for(let[r,o]of e.entries())if(!is(o,t[r]))return!1;return!0},is=(e,t,r=new WeakMap)=>{if(e===t)return!0;if(e==null||t==null)return!1;let o=typeof e;if(o!==typeof t||o!=="object")return!1;if(r.has(e)&&r.get(e)?.has(t))return!0;r.has(e)||r.set(e,new WeakSet),r.get(e)?.add(t);let s=Array.isArray(e),i=Array.isArray(t);if(s!==i)return!1;if(s){if(e.length!==t.length)return!1;for(let[l,p]of e.entries())if(!is(p,t[l],r))return!1;return!0}if(e instanceof Date&&t instanceof Date)return e.getTime()===t.getTime();if(e instanceof Date||t instanceof Date)return!1;if(e instanceof RegExp&&t instanceof RegExp)return e.source===t.source&&e.flags===t.flags;if(e instanceof RegExp||t instanceof RegExp)return!1;if(e instanceof Map&&t instanceof Map){if(e.size!==t.size)return!1;for(let[l,p]of e)if(!t.has(l)||!is(p,t.get(l),r))return!1;return!0}if(e instanceof Map||t instanceof Map)return!1;if(e instanceof Set&&t instanceof Set){if(e.size!==t.size)return!1;for(let l of e)if(!t.has(l))return!1;return!0}if(e instanceof Set||t instanceof Set)return!1;let a=Object.keys(e),c=Object.keys(t);if(a.length!==c.length)return!1;for(let l of a)if(!Object.prototype.hasOwnProperty.call(t,l)||!is(e[l],t[l],r))return!1;return!0},Si=(e,t,r)=>{switch(e){case"ANY":return is(t,r);case _i:case Array:return AC(t,r);case"SET":case Set:return NC(t,r);case"MAP":case Map:return PC(t,r);default:return t===r}};var xi="UPDATE";var Ae={};So(Ae,{extractKeysFromArray:()=>al,extractkeyFromProp:()=>Br,getCurrentDependencies:()=>sl,getFirstCurrentDependencies:()=>il,initializeCurrentDependencies:()=>as,setCurrentDependencies:()=>Ei});var qo=[],Ci=!1,as=()=>{Ci=!0,qo.length=0},sl=()=>(Ci=!1,[...qo]),il=()=>(Ci=!1,[...qo]?.[0]??"missing_prop"),Ei=e=>{!Ci||!e||qo.includes(e)||(qo=[...qo,e])},Br=e=>Pe(String,e)?e:(as(),e(),il()),al=e=>e.map(t=>Pe(String,t)?t:(as(),t(),il()));var cs=new Map,Bp=e=>{cs.delete(e)},Jo=({watcherByProp:e,prop:t,newValue:r,oldValue:o,validationValue:n,instanceId:s})=>{let i=e?.get(t);if(!(!i||i.size===0)){for(let{fn:a,wait:c}of i.values())if(c||a(r,o,n),s&&c){let l=cs.get(s)??new Map,p=!l.has(t),h=p?[]:l.get(t)?.callbacks??[],f=l.get(t);l.set(t,{newValue:r,oldValue:f?.oldValue??o,validationValue:n,callbacks:[...new Set([...h,a])]}),cs.set(s,l),p&&Dt(()=>{let d=cs.get(s),y=d?.get(t);if(y&&y.newValue!==void 0&&y.newValue!==null)for(let v of y.callbacks)v(y.newValue,y.oldValue,y.validationValue);d?.delete(t),d?.size===0&&cs.delete(s)})}}},Vp=async({watcherByProp:e,prop:t,newValue:r,oldValue:o,validationValue:n})=>{let s=e?.get(t);if(!(!s||s.size===0))for(let{fn:i}of s.values())await i(r,o,n)};var OC="padding: 10px;",He=()=>OC;var cl="store_shallow_copy",Wp=cl;var qe=new Map,ie=e=>{if(Wp===cl){let t=qe.get(e);return t?{...t}:void 0}return qe.get(e)},Le=(e,t)=>{qe.set(e,t)},jp=e=>{qe.delete(e)};var ll=(e,t)=>{console.warn(`%c MobStore supports an object with a depth of up to 2 levels, set 'Any' type to use obj as value, the input object has ${e} level`,t)};var zp=(e,t)=>{console.warn(`%c MobStore, trying to execute set() method: store.${e} not exist`,t)},Hp=(e,t,r)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: setProp methods doesn't allow objects as value, ${JSON.stringify(t)} is an Object, use 'Any' type for custom object`,r)},Up=(e,t)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: '${JSON.stringify(e)}' is an objects`,t)},Gp=(e,t,r,o)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: ${t} is not a ${ss(r)}`,o)},qp=(e,t,r)=>{console.warn(`%c trying to execute setObj method on '${e}' propierties: setObj methods allow only objects as value, ${t} is not an Object`,r)},Jp=(e,t)=>{console.warn(`%c trying to execute setObj data method on '${e}' propierties: store propierties '${e}' is not an object`,t)},Yp=(e,t,r)=>{console.warn(`%c trying to execute setObj data method: one of these keys '${e}' not exist in store.${t}`,r)},Xp=(e,t,r)=>{console.warn(`%c trying to execute setObj data method on '${e}' propierties: '${JSON.stringify(t)}' have a depth > 1, nested obj is not allowed, use 'any' type for deep nested object`,r)},Kp=(e,t,r,o,n)=>{console.warn(`%c trying to execute setObj data method on ${e}.${t} propierties: ${r} is not a ${ss(o)}`,n)},Qp=(e,t)=>{console.warn(`%c trying to execute get data method: store.${e} not exist`,t)},ul=(e,t)=>{console.warn(`%c trying to execute set data method: store.${e} not exist`,t)},Zp=(e,t)=>{console.warn(`%c one of the keys [${e}] is already used as a computed target, or there is a circular dependencies`,t)},em=(e,t)=>{console.warn(`%c MobStore error: the property ${e} to watch doesn't exist in store`,t)},tm=(e,t)=>{console.warn(`%c Validation Object error: validation function return undefined or have you used Object instead '${t}' ?`,e)};var rm=(e,t)=>{console.warn(`%c MobStore error: the property ${e} should readOnly with proxi, maybe is a mobJs props.`,t)},pl=(e,t)=>{console.warn(`%c MobStore error: the property ${e} fail validation during definition.`,t)};var ls=e=>{if(!Ie.isObject(e))return 0;let t=Object.values(e);return t.length===0?1:Math.max(...t.map(r=>ls(r)))+1},om=(e,t=!0)=>Object.fromEntries(Object.entries(e).map(([r,o])=>{if(Ie.isObject(o)&&t)return[r,om(o,!1)];if(Ie.isFunction(o)){let n=o();if(Ie.isObject(n)&&"value"in n&&["validate","type","skipEqual","strict"].some(s=>s in n))return[r,n.value]}return[r,o]})),nm=(e,t,r,o=!0)=>Object.fromEntries(Object.entries(e).map(([n,s])=>{if(Ie.isObject(s)&&o)return[n,nm(s,t,r,!1)];if(Ie.isFunction(s)){let i=s();if(Ie.isObject(i)&&"value"in i&&t in i){let a=Ie.isString(i[t])?i[t].toUpperCase():i[t];return[n,a]}}return[n,r]})),sm=({data:e,depth:t,logStyle:r})=>t>2?(ll(t,r),{}):om(e),Yo=({data:e,prop:t,depth:r,logStyle:o,fallback:n})=>r>2?(ll(r,o),{}):nm(e,t,n),im=({value:e})=>Pe(Map,e)?new Map(e):Pe(Set,e)?new Set(e):Pe(Object,e)?{...e}:Pe(Array,e)?[...e]:e,Vr=({instanceId:e,prop:t})=>{let r=ie(e);if(!r)return!1;let{callBackComputed:o}=r,n=[...o].some(({prop:s})=>t===s);return n&&console.warn(`${t} is used as computed target, set and multiple computed on same prop is blocked.`),n};var $C=({instanceId:e,prop:t,val:r,fireCallback:o=!0,useStrict:n=!0,initalizeStep:s=!1})=>{let i=ie(e);if(!i)return;let{type:a,fnTransformation:c,store:l,fnValidate:p,strict:h,validationStatusObject:f,skipEqual:d,watcherByProp:y,bindInstanceBy:v}=i,T=He(),S=a[t]==="ANY";if(Ie.isObject(r)&&!S){Hp(t,r,T);return}if(Ie.isObject(l[t])&&!S){Up(t,T);return}let _=l[t],E=c[t]?.(r,_)??r;if(!Pe(a[t],E)){Gp(t,E,a[t],T);return}let w=p[t]?.(E,_);!w&&s&&pl(t,T),!(h[t]&&!w&&n||(f[t]=w,(d[t]?Si(a[t],_,E):!1)&&!s))&&(l[t]=E,Le(e,{...i,store:l,validationStatusObject:f}),o&&!s&&(Jo({watcherByProp:y,prop:t,newValue:E,oldValue:_,validationValue:f[t],instanceId:e}),br({instanceId:e,prop:t}),v.forEach(N=>{br({instanceId:N,prop:t})})))},LC=({instanceId:e,prop:t,val:r,fireCallback:o=!0,useStrict:n=!0,initalizeStep:s=!1})=>{let i=ie(e);if(!i)return;let{store:a,type:c,strict:l,fnTransformation:p,fnValidate:h,validationStatusObject:f,skipEqual:d,watcherByProp:y,bindInstanceBy:v}=i,T=He();if(!Ie.isObject(r)){qp(t,r,T);return}if(!Ie.isObject(a[t])){Jp(t,T);return}let S=Object.keys(r),_=Object.keys(a[t]);if(!S.every(k=>_.includes(k))){Yp(S,t,T);return}let x=Object.fromEntries(Object.entries(r).map(k=>{let[L,C]=k,M=a[t][L];return!s&&Si(c[t][L],C,M)?[L,C]:[L,p[t][L]?.(C,M)??C]}));if(!Object.entries(x).map(k=>{let[L,C]=k,M=Pe(c[t][L],C);return M||Kp(t,L,C,c[t][L],T),M}).every(k=>k===!0))return;let I=Object.entries(x).map(k=>{let[L,C]=k,M=a[t][L];return l[t][L]&&n?{strictCheck:h[t][L]?.(C,M),item:k}:{strictCheck:!0,item:k}}).filter(({strictCheck:k})=>k===!0);if(I.length===0)return;let A=Object.fromEntries(I.map(({item:k})=>k).map(([k,L])=>[k,L]));Object.entries(A).forEach(k=>{let[L,C]=k,M=a[t][L],F=h[t][L]?.(C,M);!F&&s&&pl(t,T),F===void 0&&tm(T,"ANY"),f[t][L]=F});let O=a[t],R={...a[t],...A},P=Object.keys(A).every(k=>d[t][k]===!0),$=!0;for(let[k,L]of Object.entries(A)){let C=c[t][k]==="ANY";ls(L)>1&&!C&&(Xp(t,x,T),f[t][k]=!1,$=!1)}if(!$){Le(e,{...i,validationStatusObject:f});return}P&&Object.entries(R).every(([k,L])=>Si(c[t][k],O[k],L))&&!s||(a[t]=R,Le(e,{...i,store:a,validationStatusObject:f}),o&&!s&&(Jo({watcherByProp:y,prop:t,newValue:a[t],oldValue:O,validationValue:f[t],instanceId:e}),br({instanceId:e,prop:t}),v.forEach(k=>{br({instanceId:k,prop:t})})))},vr=({instanceId:e,prop:t,value:r,fireCallback:o=!0,clone:n=!1,useStrict:s=!0,action:i,initalizeStep:a=!1})=>{let c=ie(e);if(!c)return;let{store:l,type:p}=c;if(!l)return;let h=He();if(!(t in l)){zp(t,h);return}let f=n?im({value:l[t]}):l[t],d=i===xi?r(f):r,y=p[t]==="ANY";if(Ie.isObject(f)&&!y){LC({instanceId:e,prop:t,val:d,fireCallback:o,useStrict:s,initalizeStep:a});return}$C({instanceId:e,prop:t,val:d,fireCallback:o,useStrict:s,initalizeStep:a})},am=({instanceId:e,prop:t,value:r})=>{let o=ie(e);if(!o)return;let{store:n,watcherByProp:s}=o;if(!(t in n))return;let i=n[t];n[t]=r,Le(e,{...o,store:n}),Jo({watcherByProp:s,prop:t,newValue:r,oldValue:i,validationValue:!0,instanceId:e})},cm=({store:e,bindInstance:t})=>t.reduce((r,o)=>{let n=ie(o);if(!n)return r;let{store:s}=n;return{...r,...s}},e),DC=e=>{let t=ie(e);if(!t)return;let{computedPropsQueque:r,callBackComputed:o,store:n,bindInstance:s}=t,i=[...o??[]].filter(({keys:l})=>[...r].find(p=>l.includes(p))),a=cm({store:n,bindInstance:s}),c=i.map(({prop:l,keys:p,fn:h})=>{let f=Object.fromEntries(p.map(d=>[d,a[d]]));return{prop:l,value:h(f)}});Le(e,{...t,computedPropsQueque:new Set,computedRunning:!1}),c.forEach(({prop:l,value:p})=>{vr({instanceId:e,prop:l,value:p,action:"SET"})})},br=({instanceId:e,prop:t})=>{let r=ie(e);if(!r)return;let{callBackComputed:o,computedPropsQueque:n,computedRunning:s}=r;if(!(!o||o.size===0)&&(n.add(t),Le(e,{...r,computedPropsQueque:n}),!s)){let i=ie(e);if(!i)return;Le(e,{...i,computedRunning:!0}),Dt(()=>DC(e))}},FC=({instanceId:e,prop:t,keys:r,fn:o})=>{let n=ie(e);if(!n)return;let{callBackComputed:s}=n,i=[...s].reduce((a,{prop:c,keys:l})=>l.includes(t)&&r.includes(c)&&!a,!1);if(r.includes(t)||i){Zp(r,He());return}s.add({prop:t,keys:r,fn:o}),Le(e,{...n,callBackComputed:s})},BC=({instanceId:e,prop:t,keys:r,callback:o})=>{let n=ie(e);if(!n)return;let{store:s,bindInstance:i}=n,a=cm({store:s,bindInstance:i}),c=Object.fromEntries(r.map(p=>{if(p in a)return[p,a[p]]}).filter(p=>p!==void 0)),l=o(c);vr({instanceId:e,prop:t,value:l,fireCallback:!1,clone:!1,action:"SET"})},lm=({instanceId:e,prop:t,keys:r,callback:o})=>{if(Vr({instanceId:e,prop:t}))return;let s=r.length===0?(as(),o({}),sl()):r;BC({instanceId:e,prop:t,keys:s,callback:o}),FC({instanceId:e,prop:t,keys:s,fn:o})};var um=e=>{let{store:t}=e,r=Object.entries(t).reduce((o,n)=>{let[s,i]=n;return Ie.isObject(i)?{...o,[s]:{}}:o},{});return{...e,validationStatusObject:r}},pm=(e,t)=>{let{store:r}=t;Object.entries(r).forEach(o=>{let[n,s]=o;vr({instanceId:e,prop:n,value:s,fireCallback:!1,useStrict:!1,action:"SET",initalizeStep:!0})})};var VC=({state:e,prop:t,callback:r,wait:o})=>{let{store:n,watcherByProp:s,watcherMetadata:i}=e,a=He();if(!n)return{state:void 0,unsubscribeId:""};if(!(t in n))return em(t,a),{state:void 0,unsubscribeId:""};let c=we();return s.has(t)||s.set(t,new Map),s.get(t)?.set(c,{fn:r,wait:o}),i.set(c,t),{state:{...e,watcherByProp:s,watcherMetadata:i},unsubscribeId:c}},WC=({instanceId:e,unsubscribeId:t})=>{let r=ie(e);if(!r)return;let{watcherByProp:o,watcherMetadata:n}=r;if(!o||!n)return;let s=n.get(t);s&&(o.get(s)?.delete(t),n.delete(t),o.get(s)?.size===0&&o.delete(s),Le(e,{...r,watcherByProp:o,watcherMetadata:n}))},mm=({instanceId:e,prop:t,callback:r,wait:o})=>{let n=ie(e);if(!n)return()=>{};let{state:s,unsubscribeId:i}=VC({state:n,prop:t,callback:r,wait:o});return s?(Le(e,s),()=>{WC({instanceId:e,unsubscribeId:i})}):()=>{}},hm=({instanceId:e,prop:t,callback:r,wait:o})=>{let n=ie(e);if(!n)return()=>{};let{bindInstance:s,unsubscribeBindInstance:i}=n;if(!s||s.length===0)return mm({instanceId:e,prop:t,callback:r,wait:o});let a=[e,...s].find(p=>{let h=ie(p)?.store;return h&&t in h})??"",c=mm({instanceId:a,prop:t,callback:r,wait:o}),l=ie(e);return l?(Le(e,{...l,unsubscribeBindInstance:[...i,c]}),()=>{c();let p=ie(e);p&&Le(e,{...p,unsubscribeBindInstance:p.unsubscribeBindInstance.filter(h=>h!==c)})}):()=>{}};var dm=e=>{let t=ls(e);return{watcherByProp:new Map,watcherMetadata:new Map,callBackComputed:new Set,computedPropsQueque:new Set,validationStatusObject:{},dataDepth:t,computedRunning:!1,store:sm({data:e,depth:t,logStyle:He()}),type:Yo({data:e,prop:"type",depth:t,logStyle:He(),fallback:nl}),fnTransformation:Yo({data:e,prop:"transform",depth:t,logStyle:He(),fallback:r=>r}),fnValidate:Yo({data:e,prop:"validate",depth:t,logStyle:He(),fallback:()=>!0}),strict:Yo({data:e,prop:"strict",depth:t,logStyle:He(),fallback:!1}),skipEqual:Yo({data:e,prop:"skipEqual",depth:t,logStyle:He(),fallback:!0}),proxiObject:void 0,bindInstance:[],bindInstanceBy:[],unsubscribeBindInstance:[],proxiReadOnlyProp:new Set}};var fm=e=>{let t=ie(e);if(!t)return{};let{store:r}=t;return r??{}},bm=e=>{let t=ie(e);if(!t)return{};let{bindInstance:r}=t;return!r||r.length===0?fm(e):Object.fromEntries([...r,e].flatMap(o=>Object.entries(fm(o))))},gm=({instanceId:e,prop:t})=>{let r=ie(e);if(!r)return;let o=r?.store;if(o&&t in o)return o[t];Qp(t,He())},vm=({instanceId:e,prop:t})=>{let r=ie(e);if(!r)return;let{bindInstance:o}=r;if(!o||o.length===0)return gm({instanceId:e,prop:t});let n=[e,...o].find(s=>{let i=qe.get(s)?.store;return i&&t in i})??"";return gm({instanceId:n,prop:t})};var ym=({instanceId:e,prop:t})=>{let r=ie(e);if(!r)return;let{store:o,watcherByProp:n,validationStatusObject:s,bindInstanceBy:i}=r;o&&(t in o?(Jo({watcherByProp:n,prop:t,newValue:o[t],oldValue:o[t],validationValue:s[t],instanceId:e}),br({instanceId:e,prop:t}),i.forEach(a=>{br({instanceId:a,prop:t})})):ul(t,He()))},wi=({instanceId:e,prop:t})=>{let r=ie(e);if(!r)return;let{bindInstance:o}=r;if(!o||o.length===0){ym({instanceId:e,prop:t});return}let n=[e,...o].find(s=>{let i=qe.get(s)?.store;return i&&t in i})??"";ym({instanceId:n,prop:t})},Tm=async({instanceId:e,prop:t})=>{let r=ie(e);if(!r)return new Promise(a=>a({success:!1}));let{store:o,watcherByProp:n,validationStatusObject:s,bindInstanceBy:i}=r;return o?t in o?(await Vp({watcherByProp:n,prop:t,newValue:o[t],oldValue:o[t],validationValue:s[t]}),br({instanceId:e,prop:t}),i.forEach(a=>{br({instanceId:a,prop:t})}),{success:!0}):(ul(t,He()),{success:!1}):new Promise(a=>a({success:!1}))},_m=async({instanceId:e,prop:t})=>{let r=ie(e);if(!r)return new Promise(s=>s(""));let{bindInstance:o}=r;if(!o||o.length===0)return Tm({instanceId:e,prop:t});let n=[e,...o].find(s=>{let i=qe.get(s)?.store;return i&&t in i})??"";return Tm({instanceId:n,prop:t})};var Sm=({instanceId:e})=>{let t=ie(e);if(!t)return;let{validationStatusObject:r}=t;return r},xm=({instanceId:e})=>{let t=ie(e);if(!t)return;let{store:r}=t;console.log(r)},Cm=({instanceId:e})=>{let t=ie(e);if(!t)return;let{validationStatusObject:r}=t;console.log(r)},Em=({instanceId:e})=>{let t=ie(e);console.log(t)};var jC=e=>!(e==null||!Pe(Object,e)||Pe(Map,e)||Pe(Set,e)||Pe(Function,e)),zC=e=>{let t=He();return new Proxy({},{set(r,o,n){let s=qe.get(e);if(!s||!(o in s.store))return!1;let i=Vr({instanceId:e,prop:o}),a=s.proxiReadOnlyProp.has(o);return a&&rm(o,t),i||a?!1:(vr({instanceId:e,prop:o,value:n,fireCallback:!0,clone:!1,action:"SET"}),!0)},get(r,o){if(!qe.has(e))return;let n=qe.get(e);if(!n)return;let s;if(o in n.store&&(s=n.store[o],Ei(o)),!(o in n.store))for(let i of n.bindInstance){let a=qe.get(i);if(a&&o in a.store){s=a.store[o],Ei(o);break}}if(s!==void 0)return jC(s)?Array.isArray(s)?Object.freeze([...s]):Object.freeze({...s}):s},has(r,o){if(!qe.has(e))return!1;let n=qe.get(e);if(!n)return!1;if(o in n.store)return!0;for(let s of n.bindInstance){let i=qe.get(s);if(i&&o in i.store)return!0}return!1}})},wm=({instanceId:e})=>{let t=qe.get(e);if(!t)return{};if(t.proxiObject)return t.proxiObject;let r=zC(e);return Le(e,{...t,proxiObject:r}),r};var HC=({selfId:e,bindId:t})=>{let r=ie(t);if(!r)return;let{bindInstanceBy:o}=r,n=[...o,e];Le(t,{...r,bindInstanceBy:n})},Im=({selfId:e,bindId:t})=>{let r=ie(t);if(!r)return;let{bindInstanceBy:o}=r,n=o.filter(s=>s!==e);Le(t,{...r,bindInstanceBy:n})},UC=({bindStores:e,selfStore:t})=>{let o=[...Pe(Array,e)?e.map(n=>n.get()):[e.get()],t.store];o.forEach((n,s)=>{o.forEach((i,a)=>{if(s<=a)return;let c=Object.keys(n).filter(l=>Object.keys(i).includes(l));c.length>0&&console.warn(`bindStore: prop conflict on following prop: '${c}', bind store key must be univoque'`)})})},Mm=({value:e,instanceId:t})=>{let r=ie(t);if(!r)return;UC({bindStores:e,selfStore:r});let{bindInstance:o,bindInstanceBy:n}=r;if(!o)return;let s=Pe(Array,e)?e.map(p=>p.getId()):[e.getId()],i=n.every(p=>!s.includes(p)),a=s.every(p=>!o.includes(p)),c=s.includes(t);if(!i||c){console.warn(`${t}, binding store failed, circular dependencies found.`);return}if(!a){console.warn(`${t}, binding store failed, store is binded more than once.`);return}let l=[...o,...s];Le(t,{...r,bindInstance:l}),s.forEach(p=>{HC({selfId:t,bindId:p})})};var km=e=>{let t=qe.get(e);if(!t)return;t.bindInstanceBy.length>0&&console.warn(`${e} store will be destroyed but is used by another store.`),t.callBackComputed.clear(),t.computedPropsQueque.clear(),t.watcherByProp.clear(),t.watcherMetadata.clear(),t.store={},t.proxiObject=null;let{unsubscribeBindInstance:r,bindInstance:o}=t;[...r].toReversed().forEach(n=>{n?.()}),t.unsubscribeBindInstance.length=0,o.forEach(n=>{Im({selfId:e,bindId:n})}),Bp(e),jp(e)};var Rm=({instanceId:e,values:t})=>{let r=ie(e);if(!r)return;let{proxiReadOnlyProp:o}=r;t.forEach(n=>{o.add(n)}),Le(e,r)};var Ii=(e={})=>{let t=we(),r=dm(e),o=um(r);return Le(t,o),pm(t,r),{getId:()=>t,bindStore:n=>{Mm({value:n,instanceId:t})},get:()=>bm(t),getProp:n=>vm({instanceId:t,prop:n}),set:(n,s,{emit:i=!0,usePropAsString:a=!1}={})=>{let c=a?n:Br(n);Vr({instanceId:t,prop:c})||vr({instanceId:t,prop:c,value:s,fireCallback:i??!0,clone:!1,action:"SET"})},update:(n,s,{emit:i=!0,clone:a=!1,usePropAsString:c=!1}={})=>{let l=c?n:Br(n);Vr({instanceId:t,prop:l})||vr({instanceId:t,prop:l,value:s,fireCallback:i??!0,clone:a,action:xi})},getProxi:()=>wm({instanceId:t}),quickSetProp:(n,s)=>{Vr({instanceId:t,prop:n})||am({instanceId:t,prop:n,value:s})},watch:(n,s,{wait:i=!1,immediate:a=!1}={})=>{let c=Br(n),l=hm({instanceId:t,prop:c,callback:s,wait:i});return a&&Dt(()=>{wi({instanceId:t,prop:c})}),l},computed:(n,s,i=[],{usePropAsString:a=!1}={})=>{let c=a?n:Br(n),l=al(i);lm({instanceId:t,prop:c,keys:l,callback:s}),Dt(()=>{wi({instanceId:t,prop:c})})},emit:n=>{let s=Br(n);wi({instanceId:t,prop:s})},emitAsync:async n=>{let s=Br(n);return _m({instanceId:t,prop:s})},setProxiReadOnlyProp:n=>{Rm({instanceId:t,values:n})},getValidation:()=>Sm({instanceId:t}),debug:()=>{Em({instanceId:t})},debugStore:()=>{xm({instanceId:t})},debugValidate:()=>{Cm({instanceId:t})},destroy:()=>{km(t)}}};var Ee=Ii({usePassive:()=>({value:!1,type:Boolean}),currentFrame:()=>({value:0,type:Number}),instantFps:()=>({value:60,type:Number}),requestFrame:()=>({value:()=>{},type:Function}),deferredNextTick:()=>({value:!0,type:Boolean}),throttle:()=>({value:60,type:Number}),spinYMaxValue:()=>({value:2.5,type:Number}),spinXMaxValue:()=>({value:2.5,type:Number})});var ml=!1,us=new Map;function Pm(){if(us.size===0){globalThis.removeEventListener("DOMContentLoaded",Pm),ml=!1;return}for(let e of us.values())e();us.clear()}function GC(){ml||(ml=!0,globalThis.addEventListener("DOMContentLoaded",Pm,{passive:!1}))}var qC=e=>{let t=we();return us.set(t,e),typeof globalThis<"u"&&GC(),()=>us.delete(t)},Nm=qC;function ps(e){let t=0,r=0,o=0,n=0;return"detail"in e&&(r=e.detail),"wheelDelta"in e&&(r=-e.wheelDelta/120),"wheelDeltaY"in e&&(r=-e.wheelDeltaY/120),"wheelDeltaX"in e&&(t=-e.wheelDeltaX/120),"axis"in e&&e.axis===e.HORIZONTAL_AXIS&&(t=r,r=0),o=t*10,n=r*10,"deltaY"in e&&(n=e.deltaY),"deltaX"in e&&(o=e.deltaX),(o||n)&&e.deltaMode&&(e.deltaMode==1?(o*=40,n*=40):(o*=800,n*=800)),o&&!t&&(t=o<1?-1:1),n&&!r&&(r=n<1?-1:1),{spinX:t,spinY:r,pixelX:o,pixelY:n}}function JC({type:e,event:t}){let r=t;return e==="touchend"&&"changedTouches"in t?r.changedTouches[0]:"touches"in r?r.touches[0]:t}function jr(e){let t=!1,r=new Map,{usePassive:o}=Ee.get();Ee.watch("usePassive",()=>{globalThis.removeEventListener(e,n),t=!1,s()});function n(a){if(r.size===0){globalThis.removeEventListener(e,n),t=!1;return}let c=a.type,{pageX:l,pageY:p,clientX:h,clientY:f}=JC({type:c,event:a}),d=a.target,y={page:{x:l,y:p},client:{x:h,y:f},target:d,type:c,preventDefault:()=>o?()=>{}:a.preventDefault(),spinX:0,spinY:0,pixelX:0,pixelY:0};if(c==="wheel"){let v=Ee.getProp("spinYMaxValue"),T=Ee.getProp("spinXMaxValue"),{spinX:S,spinY:_,pixelX:E,pixelY:x}=ps(a);y.spinX=ol(S,-T,T),y.spinY=ol(_,-v,v),y.pixelX=E,y.pixelY=x}for(let v of r.values())v(y)}function s(){t||(t=!0,o=Ee.getProp("usePassive"),globalThis.addEventListener(e,n,{passive:o}))}return a=>{if(globalThis.window===void 0)return()=>{};let c=we();return r.set(c,a),s(),()=>{r.delete(c),r.size===0&&t&&(globalThis.removeEventListener(e,n),t=!1)}}}var Am=jr("click"),Om=jr("mousedown"),$m=jr("touchstart"),Lm=jr("mousemove"),Dm=jr("touchmove"),Fm=jr("mouseup"),Bm=jr("touchend"),Vm=jr("wheel");var Eo=0,Ze=new Map,YC=(e=()=>{})=>{let t=we();return Ze.set(t,{fn:e,data:new Map,freeze:{active:!1,atFrame:0}}),{id:t,unsubscribe:()=>{if(Ze.has(t)){let r=Ze.get(t);if(!r)return;let o=r.data.size;if(Ze.delete(t),!o)return;Eo=Eo-o}}}},XC=({id:e,callBackObject:t,frame:r})=>{if(!Ze.has(e))return;let o=Math.max(r,0),{currentFrame:n}=Ee.get(),s=Ze.get(e);if(!s?.data)return;let{data:i}=s;i.has(o+n)||(i.set(o+n,t),Eo++)},KC=e=>{Ze.has(e)&&Ze.delete(e)},QC=e=>{let t=Ze.get(e);if(!t||t.freeze.active)return;let{currentFrame:r}=Ee.get();t.freeze={active:!0,atFrame:r}},ZC=({id:e,update:t=!0})=>{let r=Ze.get(e);if(!r||!r.freeze.active)return;if(!t){r.freeze={active:!1,atFrame:0};return}let{currentFrame:o}=Ee.get(),{atFrame:n}=r.freeze,s=[];for(let[i,a]of r.data){let c=i+o-n;r.data.delete(i),s.push({frame:c,value:a})}s.forEach(({frame:i,value:a})=>{r.data.set(i,a)}),s.length=0,r.freeze={active:!1,atFrame:0}},eE=e=>{let t=Ze.get(e);if(!t)return;let r=t.data.size;Eo=Eo-r,t.data.clear()},tE=e=>Ze.get(e)??{},rE=e=>{for(let t of Ze.values()){let{data:r,fn:o,freeze:n}=t,s=r.get(e);s&&!n.active&&(o(s),r.delete(e),Eo--)}},oE=({id:e,obj:t={}})=>{if(!Ze.has(e))return;let r=Ze.get(e);if(!r)return;let{fn:o,freeze:n}=r;n.active||o(t)},nE=()=>Eo,sE=e=>{for(let[t,r]of Ze){let{data:o,fn:n,freeze:s}=r,i=new Map;for(let[a,c]of o)i.set(a-e,c),o.delete(a);Ze.set(t,{data:i,fn:n,freeze:s.active?{...s,atFrame:s.atFrame-e}:s})}},Xo={add:YC,get:tE,update:XC,remove:KC,clean:eE,fire:rE,fireObject:oE,getCacheCounter:nE,updateFrameId:sE,freeze:QC,unFreeze:ZC};var hl=!1,Mi=new Map;function Wm(){if(Mi.size===0){globalThis.removeEventListener("visibilitychange",Wm),hl=!1;return}let e={visibilityState:document.visibilityState};for(let t of Mi.values())t(e)}function iE(){hl||(hl=!0,globalThis.addEventListener("visibilitychange",Wm,{passive:!1}))}var aE=e=>{let t=we();return Mi.set(t,e),typeof globalThis<"u"&&iE(),()=>Mi.delete(t)},ki=aE;var ms=[],cE=(e=()=>{},t=100)=>{ms.push({cb:e,priority:t})},lE=({time:e,fps:t})=>{ms.length!==0&&(ms.sort((r,o)=>r.priority-o.priority),ms.forEach(({cb:r})=>r({time:e,fps:t})),ms.length=0)},xt={add:cE,fire:lE};var dl=[],uE=e=>{dl.push(e)},pE=()=>{let e=[...dl];return dl.length=0,e},Ko={add:uE,get:pE};var zr=new Map,mE=e=>{let t=[...zr.entries()];zr.clear(),t.forEach(([r,o])=>{zr.set(r-e,o)})},hE=({currentFrame:e,time:t,fps:r})=>{let o=zr.get(e)??[];!o||o.length===0||(o.forEach(n=>n({time:t,fps:r})),zr.delete(e))},dE=(e,t)=>{let o=Math.max(t,0)+Ee.getProp("currentFrame"),n=zr.get(o)??[];zr.set(o,[...n,e]),Ee.emit("requestFrame")},fE=()=>zr.size,Qo={add:dE,fire:hE,updateKeys:mE,getAmountOfFrameToFire:fE};var fl="animationStop",jm=()=>{globalThis.addEventListener("unhandledrejection",e=>{e.reason===fl&&e.preventDefault()})};var zm=!1,Ri=({force:e=!1,duration:t=30}={})=>{if(zm&&!e){let{instantFps:r}=Ee.get();return new Promise(o=>{o({averageFPS:r})})}return new Promise(r=>{let o=[],s=0,i=0,a=0,c=0,l=0,p=h=>{if(h*=.001,c===0){c=h,requestAnimationFrame(p);return}let f=h-c;c=h;let d=Number.isFinite(1/f)?1/f:60,y=Math.max(d,60);a+=y-(o[s]||0),o[s++]=y,i=Math.max(i,s),s%=25;let v=Math.round(a/i);if(l++,l>=t){Ee.quickSetProp("instantFps",v),zm=!0,r({averageFPS:v});return}requestAnimationFrame(p)};requestAnimationFrame(p)})};Ri();var yl=1e7,qm=2e3,Tl=!1,wo=[],et=Lt(),Hm=0,gl=Lt(),bl=0,_l=0,vl=0,Zo=!1,Ct=60,$i=Ct,Pi=0,Ni=0,yr=0,Ai=!1,Oi=!1,gE=()=>Ct<$i/5*3,bE=()=>Ct<$i/5*4,vE=()=>{!gE()||Ai||(Ai=!0,setTimeout(()=>{Ai=!1},4e3))},yE=()=>{!bE()||Oi||(Oi=!0,setTimeout(()=>{Oi=!1},4e3))},TE=()=>{yr=0,Ee.quickSetProp("currentFrame",yr),Qo.updateKeys(yl),Xo.updateFrameId(yl)};ki(({visibilityState:e})=>{Zo=e!=="visible"});jm();Ee.watch("requestFrame",()=>{Li()});var Um=()=>{yr>=yl&&TE(),xt.fire({time:et,fps:Ct});let e=Ko.get();if(e.length>0)for(let t of e)wo.push(t);Tl=!1,wo.length>0||Qo.getAmountOfFrameToFire()>0||Xo.getCacheCounter()>0||et<qm?Li():(Zo=!0,yr=0,_l=et,Ee.quickSetProp("currentFrame",yr))},Gm=e=>{et=e,bl=et-gl,Zo&&(Hm+=bl),gl+=bl,et=Math.round(gl-Hm);let t=Math.round(1e3/Ct);vl=Math.abs(et-_l-t);let r=vl>100?vl:0;et=et-r,_l=et,Zo?(Ni=et,Pi=0,Ct=Ee.getProp("instantFps")):Pi++,et>Ni+1e3&&!Zo&&(Ct=et>qm?Math.round(Pi*1e3/(et-Ni)):Ee.getProp("instantFps"),Ni=et,Pi=0),Ct>$i&&($i=Ct),vE(),yE(),wo.forEach(n=>n({time:et,fps:Ct})),Qo.fire({currentFrame:yr,time:et,fps:Ct}),Xo.fire(yr),yr++,Ee.quickSetProp("currentFrame",yr),wo.length=0,Zo=!1,Ee.getProp("deferredNextTick")?Dt(()=>Um()):Um()},Li=()=>{Tl||(typeof globalThis>"u"?setTimeout(()=>Gm(Lt()),kp):requestAnimationFrame(Gm),Tl=!0)},Ft={add:s=>{wo.push(s),Li()},addMultiple:(s=[])=>{wo=[...wo,...s],Li()},getFps:()=>Ct,mustMakeSomething:()=>Ai,shouldMakeSomething:()=>Oi};var ds=!1,hs=new Map,Di=()=>{},Sl=0,xl=0;function _E(){if(hs.size===0){globalThis.removeEventListener("resize",Di),ds=!1;return}let e=globalThis.innerHeight,t=globalThis.innerWidth,r=e!==Sl,o=t!==xl;Sl=e,xl=t;let n={scrollY:globalThis.scrollY,windowsHeight:e,windowsWidth:t,documentHeight:document.documentElement.scrollHeight,verticalResize:r,horizontalResize:o};for(let s of hs.values())s(n)}function SE(){ds||(ds=!0,Sl=globalThis.window.innerHeight,xl=globalThis.window.innerWidth,Di=xo(()=>_E()),globalThis.addEventListener("resize",Di,{passive:!1}))}var xE=e=>{if(globalThis.window===void 0)return()=>{};let t=we();return hs.set(t,e),SE(),()=>{hs.delete(t),hs.size===0&&ds&&(globalThis.removeEventListener("resize",Di),ds=!1)}},Jm=xE;var gs=!1,fs=new Map,CE="UP",Xm="DOWN",Cl=0,en=0,El=Xm,Ym={scrollY:en,direction:El};function wl(){if(fs.size===0){globalThis.removeEventListener("scroll",wl),gs=!1;return}Cl=en,en=globalThis.scrollY,El=en>Cl?Xm:CE,Ym={scrollY:en,direction:El};for(let e of fs.values())e(Ym)}function EE(){gs||(gs=!0,Cl=globalThis.scrollY,en=globalThis.scrollY,window.addEventListener("scroll",wl,{passive:!0}))}var wE=e=>{if(globalThis.window===void 0)return()=>{};let t=we();return fs.set(t,e),EE(),()=>{fs.delete(t),fs.size===0&&gs&&(globalThis.removeEventListener("scroll",wl),gs=!1)}},Tr=wE;var vs=!1,bs=new Map,Il=()=>{};function IE(e){if(bs.size===0){Il(),vs=!1;return}Ft.add(()=>{xt.add(()=>{for(let t of bs.values())t(e)},0)})}function ME(){vs||(vs=!0,Il=Tr(IE))}var kE=e=>{if(globalThis.window===void 0)return()=>{};let t=we();return bs.set(t,e),ME(),()=>{bs.delete(t),bs.size===0&&vs&&(Il(),vs=!1)}},Km=kE;var Ts=!1,ys=new Map,Qm=()=>{},Ml=()=>{};function RE(e){if(ys.size===0){Ml(),Ts=!1;return}Ft.add(()=>{xt.add(()=>{for(let t of ys.values())t(e)},0)})}function PE(){Ts||(Ts=!0,Qm=yi(e=>RE(e),Ee.getProp("throttle")),Ml=Tr(Qm))}var NE=e=>{if(globalThis.window===void 0)return()=>{};let t=we();return ys.set(t,e),PE(),()=>{ys.delete(t),ys.size===0&&Ts&&(Ml(),Ts=!1)}},Zm=NE;function eh(e){let t=()=>{},r=()=>{},o=()=>{},n=!1,s=new Map,i=!1;function a(){if(i=!1,s.size===0){r(),e==="START"&&t(),n=!1;return}Ft.add(()=>{xt.add(()=>{let p={scrollY:globalThis.scrollY};if(e==="END")for(let h of s.values())h(p)},0)})}function c(){n||(n=!0,o=xo(()=>a()),r=Tr(o),e==="START"&&(t=Tr(({scrollY:p})=>{let h={scrollY:p};if(!i){i=!0;for(let f of s.values())f(h)}})))}return p=>{if(globalThis.window===void 0)return()=>{};let h=we();return s.set(h,p),c(),()=>{s.delete(h),s.size===0&&n&&a()}}}var th=eh("START"),rh=eh("END");function tn(e){let t=!1,r=new Map;function o(i){if(r.size===0){globalThis.removeEventListener(e,o),t=!1;return}for(let a of r.values())a(i)}function n(){t||(t=!0,globalThis.addEventListener(e,o))}return i=>{if(globalThis.window===void 0)return()=>{};let a=we();return r.set(a,i),n(),()=>{r.delete(a),r.size===0&&t&&(globalThis.removeEventListener(e,o),t=!1)}}}var oh=tn("pointerover"),nh=tn("pointerdown"),sh=tn("pointermove"),ih=tn("pointerup"),ah=tn("pointerout"),ch=tn("pointerleave");var Ue=Symbol("LinkedList.setNext"),Ge=Symbol("LinkedList.setPrev"),Fi="after",kl="before",rn=class{#n=null;#t=null;constructor(t){this.data=t}get next(){return this.#n}[Ue](t){this.#n=t}get prev(){return this.#t}[Ge](t){this.#t=t}dispose(){this.data=null,this.#n=null,this.#t=null}},Bi=class e{#n=null;#t=null;#i=0;#l=new WeakSet;addLast(t){let r=new rn(t);return this.#l.add(r),this.#n?(this.#t&&this.#t[Ue](r),r[Ge](this.#t),this.#t=r,this.#i++,this):(this.#n=r,this.#t=r,this.#i++,this)}addFirst(t){let r=new rn(t);return this.#l.add(r),this.#n?(r[Ue](this.#n),this.#n[Ge](r),this.#n=r,this.#i++,this):(this.#n=r,this.#t=r,this.#i++,this)}removeNode(t){return!t||!this.#l.has(t)?this:t===this.#n?this.removeFirst():t===this.#t?this.removeLast():(t.prev&&t.prev[Ue](t.next),t.next&&t.next[Ge](t.prev),t.dispose(),this.#i--,this)}removeFirst(){if(this.#n===null)return this;let t=this.#n;return this.#n=this.#n.next,this.#n&&this.#n[Ge](null),this.#n===null&&(this.#t=null),t.dispose(),this.#i--,this}removeLast(){if(this.#t===null)return this;let t=this.#t;return this.#t=this.#t.prev,this.#t&&this.#t[Ue](null),this.#t===null&&(this.#n=null),t.dispose(),this.#i--,this}insertAfter(t,r){if(!t||!this.#l.has(t))return this;let o=new rn(r);return this.#l.add(o),o[Ge](t),o[Ue](t.next),t.next&&t.next[Ge](o),t[Ue](o),t===this.#t&&(this.#t=o),this.#i++,this}insertBefore(t,r){if(!t||!this.#l.has(t))return this;let o=new rn(r);return this.#l.add(o),o[Ue](t),o[Ge](t.prev),t.prev&&t.prev[Ue](o),t[Ge](o),t===this.#n&&(this.#n=o),this.#i++,this}move(t,r,o=Fi){return!this.#l.has(t)||!this.#l.has(r)?this:t===r?this:o===Fi&&r.next===t?this:o===kl&&r.prev===t?this:(t.prev&&t.prev[Ue](t.next),t.next&&t.next[Ge](t.prev),t===this.#n&&(this.#n=t.next),t===this.#t&&(this.#t=t.prev),o==Fi&&(t[Ge](r),t[Ue](r.next),r.next&&r.next[Ge](t),r[Ue](t),r===this.#t&&(this.#t=t)),o==kl&&(t[Ge](r.prev),t[Ue](r),r.prev&&r.prev[Ue](t),r[Ge](t),r===this.#n&&(this.#n=t)),this)}moveAfter(t,r){return this.move(t,r,Fi)}moveBefore(t,r){return this.move(t,r,kl)}swap(t,r){if(!this.#l.has(t)||!this.#l.has(r))return this;if(t===r)return this;if(t.next===r)return this.moveAfter(t,r);if(r.next===t)return this.moveAfter(r,t);let o=t.prev,n=t.next,s=r.prev,i=r.next,a=t===this.#n,c=t===this.#t,l=r===this.#n,p=r===this.#t;return o&&o[Ue](n),n&&n[Ge](o),s&&s[Ue](i),i&&i[Ge](s),t[Ge](s),t[Ue](i),r[Ge](o),r[Ue](n),s&&s[Ue](t),i&&i[Ge](t),o&&o[Ue](r),n&&n[Ge](r),a?this.#n=r:l&&(this.#n=t),c?this.#t=r:p&&(this.#t=t),this}find(t){let r=this.#n,o;for(;r!==null;){if(t(r)){o=r;break}r=r.next}return o}filter(t){let r=this.#n,o=new e,n=0;for(;r!==null;)t(r,n)&&o.addLast(r.data),r=r.next,n++;return o}map(t){let r=this.#n,o=new e,n=0;for(;r!==null;)o.addLast(t(r,n)),r=r.next,n++;return o}*[Symbol.iterator](){let t=this.#n;for(;t;)yield t,t=t.next}traverse(t){let r=this.#n;for(;r!==null;)t(r),r=r.next;return this}async traverseAsync(t){let r=this.#n;for(;r!==null;)await t(r),r=r.next;return this}traverseReverse(t){let r=this.#t;for(;r!==null;)t(r),r=r.prev;return this}async traverseReverseAsync(t){let r=this.#t;for(;r!==null;)await t(r),r=r.prev;return this}execute(t){return t(this),this}async executeAsync(t){return await t(this),this}print(){let t=this.#n,r=[];for(;t!==null;)r.push(t.data),t=t.next;return console.log(r),this}clear(){let t=this.#n,r=[];for(;t!==null;)r.push(t),t=t.next;for(let o of r)o.dispose();return this.#n=null,this.#t=null,this.#i=0,r.length=0,this}reverse(){let t=this.#n;for(this.#n=this.#t,this.#t=t;t!==null;){let r=t.next,o=t.prev;t[Ue](o),t[Ge](r),t=r}return this}toArray(){let t=[],r=this.#n;for(;r!==null;)t.push(r.data),r=r.next;return t}toArrayReverse(){let t=[],r=this.#t;for(;r!==null;)t.push(r.data),r=r.prev;return t}get first(){return this.#n}get last(){return this.#t}get size(){return this.#i}};function AE(e){return Ii(e)}function OE(){return Ee.getProp("instantFps")}function $E(){return Ft.getFps()}function LE(){return Ft.mustMakeSomething()}function DE(){return Ft.shouldMakeSomething()}function FE(e=()=>{}){return Ft.add(e)}function BE(e=()=>{}){return xt.add(e)}function VE(e=()=>{}){return Ko.add(e)}function WE(e=()=>{},t=0){return Qo.add(e,t)}async function jE({force:e=!1,duration:t=30}={}){return await Ri({force:e,duration:t})}function zE(e=()=>{}){return Nm(e)}var HE=Xo;function UE(e=()=>{}){return Jm(e)}function GE(e=()=>{}){return ki(e)}function qE(e=()=>{}){return Am(e)}function JE(e=()=>{}){return Om(e)}function YE(e=()=>{}){return $m(e)}function XE(e=()=>{}){return Lm(e)}function KE(e=()=>{}){return Dm(e)}function QE(e=()=>{}){return Fm(e)}function ZE(e=()=>{}){return Bm(e)}function ew(e=()=>{}){return Vm(e)}function tw(e=()=>{}){return Km(e)}function rw(e=()=>{}){return Tr(e)}function ow(e=()=>{}){return Zm(e)}function nw(e=()=>{}){return th(e)}function sw(e=()=>{}){return rh(e)}function iw(e=()=>{}){return oh(e)}function aw(e=()=>{}){return nh(e)}function cw(e=()=>{}){return sh(e)}function lw(e=()=>{}){return ih(e)}function uw(e=()=>{}){return ah(e)}function pw(e=()=>{}){return ch(e)}var mw=Ee;function hw(){return new Bi}var m={};So(m,{afterRouteChange:()=>hh,beforeRouteChange:()=>mh,componentMap:()=>j,createComponent:()=>Yd,eventDelegationMap:()=>_n,getActiveParams:()=>gh,getActiveRoute:()=>fh,getChildrenIdByName:()=>Vi,getComponentNameById:()=>Eh,getDebugMode:()=>Jd,getIdByInstanceName:()=>Yt,getNumberOfActiveInvalidate:()=>ob,getNumberOfActiveRepeater:()=>nb,getParentIdById:()=>_s,getPropsFromParent:()=>xa,getRoot:()=>ga,getStateById:()=>Kt,getStateByName:()=>ed,getTree:()=>kh,inizializeApp:()=>rb,loadUrl:()=>tb,mainStore:()=>fe,onRouteLoading:()=>dh,removeAndDestroyById:()=>it,setStateById:()=>gn,setStateByName:()=>Hd,staticProps:()=>Ca,tempDelegateEventMap:()=>ks,tick:()=>Cr,updateStateByName:()=>Gd,useComponent:()=>na,useMethodArrayByName:()=>Ah,useMethodByName:()=>Nh,watchById:()=>Et});var on="activeRoute",nn="activeParams",Io="beforeRouteChange",sn="afterRouteChange",Jt="routeIsLoading",pt="parserAsync",Hr="default",lh="repeater",uh="invalidate",ph="render_component";var fe=u.createStore({[on]:()=>({value:{route:"",templateName:""},type:"any",skipEqual:!1}),[nn]:()=>({value:{},type:"any",skipEqual:!1}),[Io]:()=>({value:{currentRoute:"",currentTemplate:"",nextRoute:"",nextTemplate:""},type:"any",skipEqual:!1}),[sn]:()=>({value:{currentRoute:"",currentTemplate:"",previousRoute:"",previousTemplate:""},type:"any",skipEqual:!1}),[Jt]:()=>({value:!1,type:Boolean}),[pt]:{element:()=>({value:document.createElement("div"),type:HTMLElement,skipEqual:!1}),parentId:()=>({value:"",type:String,skipEqual:!1}),persistent:()=>({value:!1,type:Boolean,skipEqual:!1}),source:()=>({value:Hr,type:String,skipEqual:!1})}}),an=()=>{fe.set(pt,{element:document.createElement("div"),parentId:"",persistent:!1,source:Hr},{emit:!1})};var mh=e=>fe.watch(Io,({currentRoute:t,currentTemplate:r,nextRoute:o,nextTemplate:n})=>{e({currentRoute:t,currentTemplate:r,nextRoute:o,nextTemplate:n})}),hh=e=>fe.watch(sn,({currentRoute:t,currentTemplate:r,previousRoute:o,previousTemplate:n})=>{e({currentRoute:t,currentTemplate:r,previousRoute:o,previousTemplate:n})}),dh=e=>fe.watch(Jt,t=>{e(t)}),fh=()=>{let{activeRoute:e}=fe.get();return e},gh=()=>{let{activeParams:e}=fe.get();return e};var j=new Map;var Vi=({id:e="",componentName:t=""})=>{if(!e||e==="")return[];let o=j.get(e)?.child;return o?o?.[t]??[]:(console.warn("getChildIdById failed no id found"),[])};var bh="",vh,yh=({contentId:e=""})=>{bh=e};var Th=()=>{vh=document?.querySelector(bh)},Wi=()=>vh;var Ur=new Map,_h=({instanceName:e,id:t})=>{let r=Ur.get(e)??[];Ur.set(e,[...r,t])},Sh=({instanceName:e,id:t})=>{let r=Ur.get(e);if(!r)return;let o=r.filter(n=>n!==t);o.length===0&&Ur.delete(e),o.length>0&&Ur.set(e,o)},Rl=({instanceName:e})=>Ur.get(e)??[];var xh=new WeakMap,Ch=({element:e,id:t})=>{xh.set(e,t)},cn=({element:e})=>xh.get(e);var Eh=(e="")=>{if(!e||e==="")return;let r=j.get(e)?.componentName;return r||(console.warn("getComponentNameById failed no id found"),null)},wh=e=>{if(!e)return"name-not-found";let t=cn({element:e})??"",r=j.get(t);return r?r.componentName:"name-not-found"},Yt=(e="")=>e?Rl({instanceName:e})?.[0]:void 0,Ih=(e="")=>e?Rl({instanceName:e})??[]:[];var ji=(e="")=>{if(!e||e==="")return!1;let r=j.get(e)?.element;return r?!Wi()?.contains(r):!1};var Mh=({chunk:e})=>e.reduce((t,r)=>{let[o,n]=r,{child:s,componentName:i,instanceName:a}=n,c=new Set(Object.values(s??{}).flat()),l=[];for(let p of j.entries()){let[h]=p;c.has(h)&&l.push(p)}return[...t,{id:o,componentName:i,instanceName:a,children:Mh({chunk:l})}]},[]),kh=()=>{let e=[...j.entries()].filter(([,t])=>!t?.parentId||t?.parentId==="");return Mh({chunk:e})};var Rh=({id:e,name:t,fn:r})=>{if(!e||e==="")return;let o=j.get(e),n=o?.methods;if(n){if(t in n){console.warn(`Method ${t}, is already used by ${e}`);return}j.set(e,{...o,methods:{...n,[t]:r}})}},Ph=({id:e})=>{if(!e||e==="")return{};let r=j.get(e)?.methods;return r?Object.keys(r).length===0?(console.warn(`no methods available for ${e} component`),{}):r:{}},Nh=e=>{let t=Yt(e);if(!t||t==="")return;let r=Ph({id:t});if(Object.keys(r).length===0){console.warn(`no methods available for ${e} component`);return}return r},Ah=e=>Ih(e).flatMap(r=>{let o=Ph({id:r});return Object.keys(o).length===0?[]:[o]});function*Xt(e){if(e){yield e;for(let t of e.children)yield*Xt(t)}}function dw(e,t){let r=[];for(let o of Xt(e)){if(r.length>0&&t)break;o?.getIsPlaceholder?.()&&r.push(o)}return r}var Gr=(e,t=!0)=>{let r=[],o=e||document.body;for(let n of o.children)r=[...r,...dw(n,t)];return r};var Mo=new Set,Oh=!1,$h=e=>{Mo.add(e)},Lh=e=>{Mo.delete(e)},Dh=e=>{let t;for(let r of Mo)if(e?.contains(r)&&r.getIsPlaceholder()){t=r;break}return t?(Mo.delete(t),[t]):[]},Fh=({element:e})=>[...Mo].filter(t=>e.contains(t)&&e!==t&&t.getIsPlaceholder?.())??[],Bh=({element:e})=>[...Mo].filter(t=>e.contains(t)&&e!==t&&t.getIsPlaceholder?.()&&t?.getSlotPosition?.())??[],Vh=()=>Mo.size;var st=e=>{Oh=e},Bt=()=>Oh;var Wh=({currentChild:e,id:t="",componentName:r=""})=>{let o=e?.[r];return o?o.push(t):e[r]=[t],e},jh=({currentChild:e,id:t="",componentName:r=""})=>{let o=e?.[r]??[];return{...e,[r]:o.filter(n=>n!==t)}},zh=({props:e,store:t})=>{Object.entries(e).forEach(([r,o])=>{t.set(r,o)})},zi=({prop:e,componentName:t,action:r})=>{console.warn(`Props: ${e}, component: ${t}, action: ${r}: Props can only be modified from outside the component."`)};var _s=(e="")=>{if(!e||e==="")return;let r=j.get(e)?.parentId;if(r)return r},Hh=({id:e=""})=>{if(!e||e==="")return;let t=j.get(e),r=t?.parentId,o=t?.componentName??"";if(!r)return;let n=j.get(r);if(!n)return;let{child:s}=n;s&&j.set(r,{...n,child:Wh({currentChild:s,id:e,componentName:o})})},Uh=({element:e,id:t})=>{if(!e)return;if(!0){Gr(e,!1).forEach(n=>{n.setParentId(t)});return}Fh({element:e}).forEach(o=>{o.setParentId(t)})},ln=({element:e})=>{if(!e)return;let t=e.parentNode,r;for(;t&&!r;)r=cn({element:t}),r||(t=t.parentNode);return r??""},Pl=({moduleScopeId:e,targetComponentId:t})=>{if(e===t)return!0;let r=j.get(e);if(!r)return!1;let o=r?.parentId??"";return Pl({moduleScopeId:o,targetComponentId:t})};var yt=new Map,Ss=new Map;var Gh=({componentId:e})=>{if(e)for(let[t,r]of yt){let{componentId:o}=r;o===e&&yt.delete(t)}};var tt=new Map;var Te=new Map;var qh=({id:e})=>{if(tt.has(e)){let t=tt.get(e);if(!t)return;t.forEach(({invalidateId:r})=>{Te.has(r)&&Te.delete(r)}),tt.delete(e)}};var rt=new Map;var J=new Map;var Jh=({id:e})=>{if(rt.has(e)){let t=rt.get(e);if(!t)return;t.forEach(({repeatId:r})=>{J.has(r)&&J.delete(r)}),rt.delete(e)}};var Yh=({id:e,parentId:t,componentName:r})=>{if(!e||!t)return;let o=j.get(t);o?.child&&j.set(t,{...o,child:jh({currentChild:o.child,id:e,componentName:r})})};var Xh=({componentId:e,repeatId:t})=>{let r=J.get(t);if(!r)return;let{componentChildren:o}=r;J.set(t,{...r,componentChildren:[...o,e]})},Kh=({componentId:e,repeatId:t})=>{let r=J.get(t);if(!r)return;let{componentChildren:o}=r;J.set(t,{...r,componentChildren:o.filter(n=>n!==e)})},xs=({repeatId:e})=>{let t=J.get(e);if(!t)return[];let{componentChildren:r}=t;return r},Qh=({repeatId:e})=>{let t=J.get(e);if(!t)return!1;let{componentChildren:r}=t;return r.length>0};var un=new Set;var Zh=e=>{un.delete(e)};var it=({id:e=""})=>{if(!e||e==="")return;let t=j.get(e);if(!t)return;let{parentId:r,componentName:o,child:n,element:s,state:i,destroy:a,parentPropsWatcher:c,componentRepeatId:l,instanceName:p,persistent:h}=t;Object.values(n??{}).flat().forEach(f=>{it({id:f})}),Yh({id:e,parentId:r,componentName:o}),a?.(),i.destroy(),c&&c.forEach(f=>f()),qh({id:e}),Jh({id:e}),l&&l.length>0&&Kh({componentId:e,repeatId:l}),p&&p.length>0&&Sh({instanceName:p,id:e}),h||Zh(e),Gh({componentId:e}),s?.removeCustomComponent?.(),s?.remove(),t.methods=null,t.refs=null,t.repeaterInnerWrap=null,t.element=null,t.currentRepeaterState=null,t.state=null,j.delete(e)};var Kt=(e="")=>!e||e===""?void 0:j.get(e)?.state?.get();var ed=(e="")=>{let t=Yt(e);return t||console.warn(`component ${e}, not found`),Kt(t)};var pn=({id:e="",prop:t})=>{if(!e||e==="")return;let r=j.get(e);if(!r)return;let{freezedPros:o}=r;o&&j.set(e,{...r,freezedPros:[...new Set([...o,t])]})},qr=({id:e="",prop:t})=>{if(!e||e==="")return;let r=j.get(e);if(!r)return;let{freezedPros:o}=r;o&&j.set(e,{...r,freezedPros:o.filter(n=>n!==t)})},ko=({id:e="",prop:t})=>{if(!e||e==="")return!1;let o=j.get(e)?.freezedPros;return o?o.includes(t):!1};var Jr=new Map;var td=({repeatId:e,host:t})=>{let r=J.get(e);if(!r)return;let o=t.parentNode;r.initialRenderWithoutSync.forEach(n=>{o.append(n)}),J.set(e,{...r,element:o,initialRenderWithoutSync:[]}),Jr.set(e,t)};var rd="data-mobjs",Ro="componentid",Hi="bindtextid",Ui="bindobjectid";var mn="staticprops",Gi="bindprops",od="name",nd="name",sd="slot",Vt="repeaterchild";var Qt="currentRepeaterValue",Zt="repeatPropBind",qi="bindevents",er="weakbindevents",hn="bindeffect",id="parentid";var tr="bindrefid",_r="bindrefname",Ji="invalidateid",Yi="mobjsrepeat";var rr={current:{},index:-1},ad="QUEQUE_BINDPROPS",Nl="QUEQUE_REPEATER",Al="QUEQUE_INVALIDATE";var cd=()=>{customElements.define("mobjs-repeat",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){if(Bt())return;let{dataset:t}=this.shadowRoot?.host??{};if(t){let r=this.shadowRoot?.host,o=r?.getAttribute(Yi)??"";td({repeatId:o,host:r})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var Yr=new Map;var ld=({invalidateId:e,host:t})=>{let r=Te.get(e);if(!r)return;let o=t.parentNode;Te.set(e,{...r,element:o}),Yr.set(e,t)};var ud=()=>{customElements.define("mobjs-invalidate",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:e}=this.shadowRoot?.host??{};if(e){let t=this.shadowRoot?.host,r=t.getAttribute(Ji)??"";ld({invalidateId:r,host:t})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var Xr=new Set,pd=e=>{Xr.add(e)},md=()=>{Xr.clear()},hd=({element:e})=>[...Xr].find(t=>{let r=!t?.getSlotName?.()&&e.contains(t);return r&&Xr.delete(t),r}),dd=({name:e,element:t})=>[...Xr].find(r=>{let o=r?.getSlotName?.()===e&&t.contains(r);return o&&Xr.delete(r),o}),fd=()=>[...Xr],Xi=()=>Xr.size;var gd=()=>{customElements.define("mobjs-slot",class extends HTMLElement{#n;constructor(){super(),this.attachShadow({mode:"open"}),this.#n="",this.isSlot=!0;let{dataset:e}=this.shadowRoot?.host??{};e&&(this.#n=this.shadowRoot?.host.getAttribute(nd))}connectedCallback(){let e=this.shadowRoot?.host;e&&pd(e)}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}getSlotName(){return this.#n}})};var Ol=new Set,bd=e=>{Ol.add(e)},Ki=()=>[...Ol],Qi=e=>Ol.delete(e);var vd=e=>{Object.entries(e).forEach(([t,r])=>{let{connectedCallback:o,disconnectedCallback:n,adoptedCallback:s,attributeChangedCallback:i,style:a,attributeToObserve:c}=r.componentParams;customElements.define(t,class extends HTMLElement{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;static get observedAttributes(){return c}constructor(){super(),this.attachShadow({mode:"open"}),this.active=!1,this.#t=u.getUnivoqueId(),this.#i={},this.#n=t,this.#l=!0,this.isUserComponent=!0,this.#o="",this.#e="";let l=this.shadowRoot?.host;if(!l)return;let p=Bt();if(p&&!!1&&bd(l),p||(this.#a&&!this.active&&(this.style.visibility="hidden"),!this.shadowRoot))return;if(a){let f=document.createElement("style");f.textContent=a,this.shadowRoot.append(f)}let h=document.createElement("slot");this.shadowRoot.append(h)}getComponentName(){return this.#n}setId(l){this.#t=l}getId(){return this.#t}getParentId(){return this.#f}setParentId(l){this.#f=l}getIsPlaceholder(){return this.#l}getInstanceName(){return this.#h}getStaticPropsId(){return this.#u}getDynamicPropsid(){return this.#s}getBindEventsId(){return this.#c}getCurrentKey(){return this.#d}setDynamicPropsFromSlotId(l){this.#o=l}getDynamicPropsFromSlotId(){return this.#o}setPropsFromSlotId(l){this.#e=l}getPropsFromSlotId(){return this.#e}setRepeatValue(l){this.#p=l}getRepeatValue(){return this.#p}getSlotPosition(){return this.#a}getDelegateEventId(){return this.#g}getRepeaterPropBind(){return this.#m??void 0}setRepeaterPropBind(l){this.#m=l}getComponentRepeatId(){return this.#r}getBindRefId(){return this.#C}getBindRefName(){return this.#x}resetParams(){this.active=!1,this.#t="",this.#i={}}disablePlaceHolderState(){this.#l=!1}inizializeCustomComponent(l){this.active||(this.active=!0,this.#t=l.id,this.#i=l,this.#l=!1,o?.({context:this,params:this.#i}))}connectedCallback(){if(!Bt()&&this.#l){let p=this.shadowRoot?.host;p&&([this.#h,this.#u,this.#s,this.#d,this.#c,this.#p,this.#a,this.#f,this.#r,this.#g,this.#m,this.#C,this.#x]=[od,mn,Gi,"key",qi,Qt,sd,id,Vt,er,Zt,tr,_r].map(h=>p.getAttribute(h)??"")),$h(p);return}}disconnectedCallback(){if(!this.shadowRoot)return;let l=this.shadowRoot?.host;Lh(l),Qi(l),this.active&&(n?.({context:this,params:this.#i}),this.resetParams())}removeCustomComponent(){!this.shadowRoot||!this.active||this.parentElement?.removeChild(this)}adoptedCallback(){!this.shadowRoot||!this.active||s?.({context:this,params:this.#i})}attributeChangedCallback(l,p,h){!this.shadowRoot||!this.active||i?.({name:l,oldValue:p,newValue:h,context:this,params:this.#i})}})})};var Et=(e="",t="",r=()=>{},{wait:o=!1}={})=>(!e||e==="")&&(!t||t==="")?void 0:j.get(e)?.state?.watch(t,r,{wait:o??!1});function Zr(){return new Promise(e=>u.useNextLoop(()=>e()))}var Po=new Map,_d=()=>Po.size===0,yd=1e3,Sd=e=>{if(Po.size>=yd)return console.warn(`InvalidateTick: maximum queue size reached (${yd}). Likely an infinite watch loop. Queue force-cleared. `),Po.clear(),()=>{};let t=u.getUnivoqueId();return Po.set(t,e),()=>Po.delete(t)},Td=()=>Po.size===0,wt=async({debug:e=!1,previousResolve:t}={})=>{if(await Zr(),e&&Po.forEach(r=>{console.log(r)}),Td()&&t){t();return}return new Promise(r=>{if(Td()){r();return}wt({debug:e,previousResolve:t??r})})};var No=new Map,Ed=()=>No.size===0,xd=1e3,wd=e=>{if(No.size>=xd)return console.warn(`RepeaterTick: maximum queue size reached (${xd}). Likely an infinite watch loop. Queue force-cleared. `),No.clear(),()=>{};let t=u.getUnivoqueId();return No.set(t,e),()=>No.delete(t)},Cd=()=>No.size===0,It=async({debug:e=!1,previousResolve:t}={})=>{if(await Zr(),e&&No.forEach(r=>{console.log(r)}),Cd()&&t){t();return}return new Promise(r=>{if(Cd()){r();return}It({debug:e,previousResolve:t??r})})};var dn=({id:e})=>{let t=tt.get(e);return t?t.flatMap(({invalidateId:r})=>Te.get(r)?.observed??[]):[]};var fn=({id:e})=>{let t=rt.get(e);return t?t.flatMap(({repeatId:r})=>{let o=J.get(r)?.observed;return o?[o]:[]}):[]};var ea=new Map,Id=(e,t)=>{ea.set(e,t)},ta=new Map,Md=({host:e,componentId:t,bindTextId:r})=>{ta.set(e,{componentId:t,bindTextId:r})},kd=e=>e.match(/(?<=\[).+?(?=])/g),Rd=e=>e.split("[")?.[0],gw=({previous:e,current:t})=>{let r=kd(t);return r&&r?.length>0?r.reduce((n,s)=>n?.[s],e[Rd(t)]):e?.[t]},Pd=(e,t,...r)=>{let o=Kt(e),n=r.map(s=>s.split(".").reduce((a,c)=>gw({previous:a,current:c})??a,o));return t.raw.reduce((s,i,a)=>s+i+(n?.[a]??""),"")},Nd=()=>{[...ta].forEach(([e,{bindTextId:t}])=>{let r=e.parentElement;if(!r){ea.delete(t);return}let o=ea.get(t);o&&(ea.delete(t),bw({...o,element:r}),e?.removeCustomComponent?.(),e?.remove(),r=null)}),ta.clear()},Ad=()=>ta.size,bw=({id:e,render:t,props:r,element:o})=>{let n=!1,s=new WeakRef(o),i=fn({id:e}),a=dn({id:e}),l=[...new Set([...r,...i,...a])].map(p=>{let f=p.split(".")?.[0],d=kd(f),v=d&&d?.length>0?Rd(f):f;if(v)return Et(e,v,async()=>{await It(),await wt(),!n&&(n=!0,u.useNextLoop(()=>{u.useFrame(()=>{s.deref()&&!s.deref()?.isConnected&&(l.forEach(T=>{T&&T()}),l.length=0),s.deref()&&s.deref()?.isConnected&&(s.deref().textContent="",s.deref().insertAdjacentHTML("afterbegin",t())),n=!1})}))})})};var Od=()=>{customElements.define("mobjs-bind-text",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:e}=this.shadowRoot?.host??{};if(e){let t=this.shadowRoot?.host??document.createElement("div"),r=t?.getAttribute(Ro)??"",o=t?.getAttribute(Hi)??"";Md({host:t,componentId:r,bindTextId:o})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var ra=new Map,$d=(e,t)=>{ra.set(e,t)},$l=new Map,Ld=({host:e,componentId:t,bindObjectId:r})=>{$l.set(e,{componentId:t,bindObjectId:r})},Dd=e=>e.map(t=>"observe"in t?Ae.extractkeyFromProp(t.observe):(Ae.initializeCurrentDependencies(),"value"in t?t?.value():t(),Ae.getFirstCurrentDependencies())),Fd=(e,...t)=>e.raw.reduce((r,o,n)=>t?.[n]&&"value"in t[n]?r+o+(t?.[n]?.value?.()??""):r+o+(t?.[n]?.()??""),""),Bd=()=>{[...$l].forEach(([e,{bindObjectId:t}])=>{let r=e.parentElement;if(!r){ra.delete(t);return}let o=ra.get(t);o&&(ra.delete(t),vw({...o,element:r}),e?.removeCustomComponent?.(),e?.remove(),r=null)}),$l.clear()},vw=({id:e,keys:t,render:r,element:o})=>{let n=!1,s=new WeakRef(o),i=fn({id:e}),a=dn({id:e}),l=[...new Set([...t,...i,...a])].map(p=>Et(e,p,async()=>{await It(),await wt(),!n&&(n=!0,u.useNextLoop(()=>{u.useFrame(()=>{s.deref()&&!s.deref()?.isConnected&&(l.forEach(h=>{h&&h()}),l.length=0),s.deref()&&s.deref()?.isConnected&&(s.deref().textContent="",s.deref().insertAdjacentHTML("afterbegin",r())),n=!1})}))}))};var Vd=()=>{customElements.define("mobjs-bind-object",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:e}=this.shadowRoot?.host??{};if(e){let t=this.shadowRoot?.host??document.createElement("div"),r=t?.getAttribute(Ro)??"",o=t?.getAttribute(Ui)??"";Ld({host:t,componentId:r,bindObjectId:o})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var oa={},Ao=()=>oa,Wd=new Set,jd=()=>{oa=Object.fromEntries([...Wd.values()].flatMap(e=>Object.entries(e))),console.log(`component loaded:${Object.keys(oa).length}`),vd(oa),gd(),ud(),cd(),Od(),Vd()},na=e=>{!e||e?.length===0||e.forEach(t=>{Wd.add(t)})};var sa=({componentName:e,propName:t})=>(Ao()?.[e]?.componentParams?.exportState??[]).includes(t),zd=({componentName:e})=>Ao()?.[e]?.componentParams?.exportState??[];var gn=(e="",t="",r,{emit:o=!0}={})=>{if((!e||e==="")&&(!t||t==="")&&!r||ko({id:e,prop:t}))return;let s=j.get(e),i=s?.state,a=s?.componentName??"";if(!sa({componentName:a,propName:t})){console.warn(`setStateById failed ${t} in: ${a} is not exportable, maybe a slot bind state that not exist here?`);return}if(!i){console.warn(`setStateById failed no id found on prop: ${t}`);return}i.set(t,r,{emit:o})};var Hd=(e="")=>{let t=Yt(e);return t||console.warn(`component ${e}, not found`),(r,o,{emit:n=!0}={})=>gn(t,r,o,{emit:n})};var Ud=(e="",t="",r,{emit:o=!0,clone:n=!1}={})=>{if((!e||e==="")&&(!t||t==="")&&!r||ko({id:e,prop:t}))return;let i=j.get(e),a=i?.state,c=i?.componentName??"";if(!sa({componentName:c,propName:t})){console.warn(`updateStateById failed ${t} in: ${c} is not exportable, maybe a slot bind state that not exist here?`);return}if(!a){console.warn(`updateStateById failed no id found on prop: ${t}`);return}a.update(t,r,{emit:o,clone:n})};var Gd=(e="")=>{let t=Yt(e);return t||console.warn(`component ${e}, not found`),(r,o,{emit:n=!0,clone:s=!1}={})=>Ud(t,r,o,{emit:n,clone:s})};var Ll={scoped:!1,maxParseIteration:5e3,debug:!1},qd=e=>{Ll={...Ll,...e}},Mt=()=>Ll,Jd=()=>{let{debug:e}=Mt();return e},Yd=({tag:e="",component:t=()=>"",props:r={},state:o={},bindStore:n,scoped:s,connectedCallback:i=()=>{},disconnectedCallback:a=()=>{},adoptedCallback:c=()=>{},attributeToObserve:l=[],attributeChangedCallback:p=()=>{},style:h="",child:f=[]})=>(na(f),{[e]:{componentFunction:t,componentParams:{exportState:Object.keys(r),scoped:s,state:{...r,...o},bindStore:n,connectedCallback:i,disconnectedCallback:a,adoptedCallback:c,attributeToObserve:l,attributeChangedCallback:p,style:h,child:f}}});var Xd=[],Kd="",Qd="",Zd=e=>{Xd=[...e]},bn=({hash:e=""})=>Xd.find(({hash:t})=>e===t),ef=({hash:e=""})=>{Kd=e},ia=()=>Kd,tf=({hash:e=""})=>{Qd=e},rf=()=>Qd;var of=({id:e="",newElement:t=document.createElement("div")})=>{if(!e||e==="")return;let r=j.get(e);r&&(j.set(e,{...r,element:t}),Ch({element:t,id:e}))},aa=({id:e=""})=>!e||e===""?void 0:j.get(e)?.element,nf=({element:e})=>e?cn({element:e}):"",Dl=({keyValue:e="",repeatId:t=""})=>e?.length===0?[]:xs({repeatId:t}).flatMap(o=>{let n=j.get(o);if(!n)return[];let{element:s,key:i}=n;return`${i}`==`${e}`?[{element:s,id:o}]:[]});function yw(e){let t=[];for(let r of Xt(e))r?.isUserComponent&&r?.getSlotPosition?.()&&t.push(r);return t}var sf=e=>{let t=[],r=e||document.body;for(let o of r.children)t=[...t,...yw(o)];return t};function Tw(e){let t=[];for(let r of Xt(e))r?.isSlot&&r?.getSlotName?.()&&t.push(r);return t}var af=e=>{let t=[],r=e||document.body;for(let o of r.children)t=[...t,...Tw(o)];return t};function _w(e,t){for(let r of Xt(e))if(r?.isSlot&&r?.getSlotName?.()===t)return r;return null}var cf=(e,t)=>{let r=e||document.body;for(let o of r.children){let n=_w(o,t);if(n)return n}return null};function Sw(e){for(let t of Xt(e))if(t?.isSlot&&!t?.getSlotName?.())return t;return null}var lf=e=>{let t=e||document.body;for(let r of t.children){let o=Sw(r);if(o)return o}return null};var Cs=new Map,Oo=e=>{let t=u.getUnivoqueId();return Cs.set(t,e),t},uf=(e="")=>{if(!e)return rr;let t=Cs.get(e);return Cs.delete(e),t??rr};var g=(e,...t)=>e.reduce((r,o,n)=>r+o+(t[n]===void 0?"":t[n]),"").replaceAll(/>\s+</g,"><").trim();var ca=({components:e,current:t,index:r,observe:o,repeatId:n,key:s})=>{e.forEach(i=>{i.deref()?.hasAttribute(Qt)||i.deref()?.setAttribute(Qt,Oo({current:t,index:r})),i.deref()?.hasAttribute("key")||i.deref()?.setAttribute("key",`${s}`),i.deref()?.hasAttribute(Zt)||i.deref()?.setAttribute(Zt,`${o}`),i.deref()?.hasAttribute(Vt)||i.deref()?.setAttribute(Vt,`${n}`)})},la=({components:e,current:t,index:r,observe:o,repeatId:n,key:s})=>{e.forEach(i=>{if(i.hasAttribute(Vt)){Qi(i);return}i.setAttribute(Qt,Oo({current:t,index:r})),i.setAttribute("key",`${s}`),i.setAttribute(Zt,`${o}`),i.setAttribute(Vt,`${n}`)})},eo=({stringDOM:e,parent:t,position:r})=>{st(!0);let o=document.createRange().createContextualFragment(e);st(!1),o&&(r==="afterend"&&t.after(o),r==="beforebegin"&&t.before(o),r==="afterbegin"&&t.prepend(o),r==="beforeend"&&t.append(o))},Es=({elements:e,parent:t,position:r})=>{let o=new DocumentFragment;st(!0),e.forEach(n=>{n&&o.append(n)}),st(!1),r==="afterend"&&t.after(o),r==="beforebegin"&&t.before(o),r==="afterbegin"&&t.prepend(o),r==="beforeend"&&t.append(o)};var Cw=({element:e,content:t})=>{let{debug:r}=Mt();if(e.parentNode){let o=document.createElement("template");o.innerHTML=t;let n=o.content.firstElementChild;return n?.disablePlaceHolderState?.(),n&&e.after(n),r&&e.insertAdjacentHTML("afterend",`<!--  ${e.tagName.toLowerCase()} --> `),n}},Ew=({element:e})=>{fd().forEach(r=>{r?.removeCustomComponent(),r?.remove()})},ww=({element:e})=>{if(!!1&&Xi()===0)return;let t=sf(e);t.length!==0&&[...t].forEach(r=>{let o=r?.getSlotPosition(),n=dd({name:o,element:e});n&&(n.parentNode?.insertBefore(r,n),n?.removeCustomComponent(),n?.remove())})},Iw=({element:e,content:t})=>{let r=Cw({element:e,content:t});if(r){let o=e.getId(),n=e?.getDelegateEventId(),s=e?.getBindRefId(),i=e?.getBindRefName(),a=hd({element:r});a&&(Es({parent:a,elements:[...e.childNodes],position:"afterend"}),a.remove()),a||Es({parent:r,elements:[...e.childNodes],position:"afterbegin"}),ww({element:r}),Ew({element:r}),n&&n.length>0&&r.setAttribute(er,n),s&&s.length>0&&r.setAttribute(tr,s),i&&i.length>0&&r.setAttribute(_r,i);let{debug:c}=Mt();c&&r.setAttribute(rd,o??"")}return e.remove(),r},pf=({element:e,content:t})=>({newElement:Iw({element:e,content:t})});var Fl=0,mf=()=>{Fl+=1},Bl=()=>Fl,hf=()=>{Fl=0},Vl=({element:e,currentSelectors:t})=>{if(t.length>0){let r=t[0],o=t.slice(1);return{componentToParse:r,parseSourceArray:o}}else{let r=Dh(e),o=r?.[0],n=r.slice(1);return{componentToParse:o,parseSourceArray:n}}};var df=({cb:e=()=>{},id:t})=>{if(!t)return;let r=j.get(t);r&&j.set(t,{...r,destroy:e})};var ws=new Map,ff=({id:e,cb:t=()=>{}})=>{ws.set(e,t)},Wl=async({id:e,element:t})=>{let o=await ws.get(e)?.({element:t});df({cb:o,id:e}),ws.delete(e)};var Is=({id:e})=>{if(!J.has(e))return;if(Jr.has(e)){let r=Jr.get(e);r?.removeCustomComponent(),r?.remove(),Jr.delete(e)}return J.get(e)?.element};var ua=({id:e="",value:t})=>{if(!e||e==="")return;let r=j.get(e);r&&j.set(e,{...r,currentRepeaterState:t})},gf=({rootNode:e,currentNode:t})=>{if(!(!t||!e.contains(t)))return t.parentElement===e?t:gf({rootNode:e,currentNode:t.parentElement})},Mw=({rootNode:e,node:t})=>{if(e)return gf({rootNode:e,currentNode:t.parentElement})},xr=({id:e=""})=>{if(!e||e==="")return rr;let r=j.get(e)?.currentRepeaterState;return r||rr};var bf=({id:e="",repeatId:t="",element:r})=>{if(!e||e==="")return;let o=j.get(e);if(!o)return;let n=Is({id:t}),s=Mw({rootNode:n,node:r});j.set(e,{...o,repeaterInnerWrap:s})},Ms=({id:e})=>!e||e===""?void 0:j.get(e)?.repeaterInnerWrap;var vn=new Map,vf=1e5,yn=e=>{if(vn.size>=vf)return console.warn(`Tick: maximum queue size reached (${vf}). Likely an infinite watch loop. Queue force-cleared. `),vn.clear(),()=>{};let t=u.getUnivoqueId();return vn.set(t,e),()=>vn.delete(t)},yf=()=>vn.size===0,Cr=async({debug:e=!1,previousResolve:t}={})=>{if(await Zr(),e&&vn.forEach(r=>{console.log(r)}),yf()&&t){t();return}return new Promise(r=>{if(yf()){r();return}Cr({debug:e,previousResolve:t??r})})};var jl=!0,pa=()=>{jl=!0},ma=()=>{jl=!1},ha=()=>jl;var Tn=new Map,Tf=(e=[])=>{let t=Pe(Object,e)?[e]:e,r=u.getUnivoqueId();return Tn.set(r,t),r},_f=({element:e,componentId:t,bindEventsId:r})=>{let o=Tn.get(r);o&&(o.forEach(n=>{let[s]=Object.keys(n),[i]=Object.values(n);!s||!i||e.addEventListener(s,async a=>{if(!ha())return;ma(),await Cr(),pa();let c=xr({id:t});i(a,c?.current,c?.index)})}),Tn.delete(r))},Sf=()=>{Tn.clear()};var da=({id:e="",unWatchArray:t=[]})=>{let r=j.get(e);if(!r)return;let{parentPropsWatcher:o}=r;o&&j.set(e,{...r,parentPropsWatcher:[...o,...t]})},xf=({id:e=""})=>{if(!e||e==="")return;(j.get(e)?.parentPropsWatcher??[]).forEach(o=>{o()})};var Cf=e=>{if(!("props"in e)){console.warn("bindProps not valid");return}let r=e?.observe?e.observe.map(s=>Ae.extractkeyFromProp(s)):(Ae.initializeCurrentDependencies(),u.checkType(Function,e.props)&&e.props({},{},0),Ae.getCurrentDependencies());if(r.length===0){console.warn("bindProps not valid, no dependencies found");return}let o={...e,observe:r},n=u.getUnivoqueId();return yt.set(n,{...o,componentId:"",propsId:n}),n},fa=({componentId:e,observe:t,props:r,currentParentId:o,fireCallback:n})=>{if(!o)return;let s=Kt(o);if(!s)return;let i=Object.keys(s);if(t.every(h=>i.includes(h))||console.warn(`bind props error: Some prop ${JSON.stringify(t)} doesn't exist`),!j.has(e))return;let l=xr({id:e}),p=r?.(s,l.current,l?.index);p&&Object.entries(p).forEach(([h,f])=>{gn(e,h,f,{emit:n})})},Ef=({propsId:e,repeatPropBind:t,componentId:r})=>{if(!e)return;let o=yt.get(e);o&&(yt.set(e,{...o,componentId:r}),Ss.set(r,e),zl({componentId:r,repeatPropBind:t,inizilizeWatcher:!1}))};var zl=async({componentId:e,repeatPropBind:t,inizilizeWatcher:r})=>{let o=Ss.get(e);if(!o)return;r&&Ss.delete(e);let n=yt.get(o);if(!n)return;let{observe:s,props:i,parentId:a}=n,c=t&&t?.length>0&&!s.includes(t)?[...s,t]:[...s];if(r||fa({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!1}),!r&&!Ed()&&(await It(),fa({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!0})),!r&&!_d()&&(await wt(),fa({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!0})),!r)return;let l=!1,p=c.map(h=>Et(a,h,async()=>{if(await It(),await wt(),l)return;let f=yn({state:h,componentId:e,moduleId:"",type:ad});l=!0,u.useNextLoop(()=>{fa({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!0}),l=!1,f()})}));if(da({id:e,unWatchArray:p.filter(h=>h!==void 0)}),!!r)for(let[h,f]of yt){let{componentId:d}=f;d===e&&yt.delete(h)}},wf=()=>{yt.clear(),Ss.clear()};var or=({id:e,container:t})=>{let o=j.get(e)?.child;if(!o)return;Object.values(o??{}).flat().forEach(s=>{let i=j.get(s),a=i?.element,c=i?.id??"";if(a&&t?.contains(a)&&a!==t){it({id:s});return}else or({id:c,container:t})})};var Hl=new Map,kw=e=>(u.checkType(Array,e)?e:[e]).map(r=>Ae.extractkeyFromProp(r)),Rw=({toggleClass:e,toggleStyle:t,toggleAttribute:r})=>(Ae.initializeCurrentDependencies(),Object.values(t).forEach(o=>o()),Object.values(e).forEach(o=>o()),Object.values(r).forEach(o=>o()),Ae.getCurrentDependencies()),Rf=({data:e,id:t})=>{let o=(u.checkType(Array,e)?e:[e]).map(({observe:i,toggleClass:a,toggleStyle:c,toggleAttribute:l})=>({observe:i?kw(i):Rw({toggleStyle:c??{fake:()=>""},toggleClass:a??{fake:()=>{}},toggleAttribute:l??{fake:()=>{}}}),toggleClass:a??{},toggleStyle:c??{},toggleAttribute:l??{}})),n={parentId:t,items:o},s=u.getUnivoqueId();return Hl.set(s,n),s},Pf=e=>{[...e.querySelectorAll(`[${hn}]`)].forEach(r=>{let o=r.getAttribute(hn);if(!o)return;let n=Hl.get(o);n&&(r.removeAttribute(hn),Pw({data:n,element:r}),Hl.delete(o))})},If=({ref:e,data:t})=>{t&&Object.entries(t).forEach(([r,o])=>{e.deref()&&e.deref().classList.toggle(r,o?.())})},Mf=({ref:e,data:t})=>{Object.entries(t).forEach(([r,o])=>{e.deref()&&(e.deref().style[r]=o?.()??"")})},kf=({ref:e,data:t})=>{Object.entries(t).forEach(([r,o])=>{if(!e.deref())return;let n=o?.();if(u.checkType(Boolean,n)){e.deref()[r]=n;return}if(!n){e.deref().removeAttribute(r);return}e.deref()?.setAttribute(r,n)})},Pw=({data:e,element:t})=>{let r=new WeakRef(t),{parentId:o}=e,{items:n}=e,s=n.flatMap(({observe:i,toggleClass:a,toggleStyle:c,toggleAttribute:l})=>{let p=!1,h=fn({id:o}),f=dn({id:o});return[...new Set([...i,...h,...f])].map(y=>(a&&u.useFrame(()=>{If({ref:r,data:a})}),c&&u.useFrame(()=>{Mf({ref:r,data:c})}),l&&u.useFrame(()=>{kf({ref:r,data:l})}),Et(o,y,async()=>{if(await It(),await wt(),r.deref()&&!r.deref()?.isConnected){s.forEach(v=>{v&&v()}),s.length=0;return}p||(p=!0,u.useNextLoop(()=>{u.useFrame(()=>{a&&r.deref()&&If({ref:r,data:a}),c&&r.deref()&&Mf({ref:r,data:c}),l&&r.deref()&&kf({ref:r,data:l}),p=!1})}))})))})};var Nf=({element:e})=>{let t=e.querySelectorAll(`[${tr}]`),r={};return[...t].reduce((o,n)=>{let s=n.getAttribute(tr),i=n.getAttribute(_r);if(n.removeAttribute(tr),n.removeAttribute(_r),!i)return o;let a=i in o?[...o[i],{element:n,scopeId:s}]:[{element:n,scopeId:s}];return{...o,[i]:a}},r)},Nw=e=>[...new Set(e.toSorted((t,r)=>t===r||!t||!r?0:t.compareDocumentPosition(r)&2?1:-1))],Aw=({refs:e,refName:t,element:r})=>({...e,[t]:Nw([...e[t],r])}),Af=e=>{Object.entries(e).forEach(([t,r])=>{r.forEach(({element:o,scopeId:n})=>{let s=j.get(n);if(!s)return;let{refs:i}=s;if(!i)return;let a=t in i?Aw({refs:i,refName:t,element:o}):{...i,[t]:[o]};j.set(n,{...s,refs:a})})})},Ul=({id:e})=>{let t=j.get(e);if(!t)return{};let{refs:r,element:o}=t;if(!r)return{};let n=Object.entries(r).map(([s,i])=>({name:s,collection:i.filter(a=>o.contains(a))})).reduce((s,i)=>({...s,[i.name]:i.collection}),{});return j.set(e,{...t,refs:n}),n},Of=({id:e})=>{let t=Ul({id:e});return Object.entries(t).reduce((r,[o,n])=>({...r,[o]:n?.[0]}),{})};var $f=document.createElement("div"),Lf=({element:e})=>{$f=e},ga=()=>$f;var Df=":FORCE",ks=new Map,_n=new WeakMap,Gl=[],Ff=[],Bf=(e=[])=>{let t=Pe(Object,e)?[e]:e,r=u.getUnivoqueId();return ks.set(r,t),r},Ow=e=>{let t=e?.parentNode;for(;t;){if(_n.has(t))return{target:t,data:_n.get(t)};t=t?.parentNode}return{target:void 0,data:void 0}},$w=e=>{let t=_n.get(e);return t?{target:e,data:t}:Ow(e)};async function Lw(e,t){let r=t?.target;if(!r)return;let{target:o,data:n}=$w(r);if(!n||!document.contains(o))return;let s=n.find(({event:p})=>p===e);if(!s)return;let{callback:i,force:a}=s;if(!ha()&&!a||(ma(),await Cr(),pa(),!document.contains(o)))return;let c=nf({element:o}),l=c?xr({id:c}):rr;Object.defineProperty(t,"target",{value:r}),Object.defineProperty(t,"currentTarget",{value:o}),i(t,l?.current,l?.index)}var Vf=async e=>{await It(),await wt(),[...e.parentNode?.querySelectorAll(`[${er}]`)??[]].forEach(n=>{let s=n.getAttribute(er)??"";n.removeAttribute(er);let i=ks.get(s);ks.delete(s);let a=i?.flatMap(c=>Object.entries(c).map(l=>{let[p,h]=l,f=p.toUpperCase().endsWith(Df),d=p.toUpperCase().replaceAll(Df,"").toLowerCase();return Gl.includes(d)||Gl.push(d),{event:d,callback:h,force:f}}));_n.set(n,a)});let o=ga();Gl.forEach(n=>{Ff.includes(n)||(Ff.push(n),o.addEventListener(n,Lw.bind(null,n)))})};var Sn="repeater",ba="invalidate",to=({moduleParentElement:e,skipInitialized:t=!1,onlyInitialized:r=!1,componentId:o,module:n})=>{let s=n===Sn?J.entries():Te.entries(),i=[];for(let a of s){let[c,{element:l,initialized:p,scopeId:h,initializeModule:f,unsubscribe:d}]=a;if(o&&!Pl({moduleScopeId:h??"",targetComponentId:o})||t&&p||r&&!p)continue;l&&e?.contains(l)&&e!==l&&i.push({moduleId:c,initializeModule:f,unsubscribe:n===Sn?[d]:d})}return i};var Wf=({id:e,repeatId:t})=>{if(!rt.has(e))return;let r=rt.get(e);if(!r)return;let o=r.filter(n=>n.repeatId!==t);J.has(t)&&J.delete(t),rt.set(e,o)};var ro=({id:e,repeatParent:t})=>{to({moduleParentElement:t,skipInitialized:!1,onlyInitialized:!0,componentId:e,module:Sn}).forEach(({unsubscribe:o,moduleId:n})=>{o.forEach(s=>{s()}),Wf({id:e,repeatId:n})})};var va=({repeatParent:e,id:t})=>{if(!e)return;to({moduleParentElement:e,skipInitialized:!0,onlyInitialized:!1,componentId:t,module:Sn}).forEach(({initializeModule:o})=>{o()})};var jf=({invalidateId:e,unsubscribe:t})=>{let r=Te.get(e);r&&Te.set(e,{...r,unsubscribe:t})};var zf=({id:e,invalidateId:t})=>{if(!tt.has(e))return;let r=tt.get(e);if(!r)return;let o=r.filter(n=>n.invalidateId!==t);Te.has(t)&&Te.delete(t),tt.set(e,o)};var oo=({id:e,invalidateParent:t})=>{to({moduleParentElement:t,skipInitialized:!1,onlyInitialized:!0,componentId:e,module:ba}).forEach(({unsubscribe:o,moduleId:n})=>{o.forEach(s=>{s()}),zf({id:e,invalidateId:n})})};var ql=({id:e})=>{if(!Te.has(e))return;if(Yr.has(e)){let r=Yr.get(e);r?.removeCustomComponent(),r?.remove(),Yr.delete(e)}return Te.get(e)?.element};var ya=({invalidateParent:e,id:t})=>{if(!e)return;to({moduleParentElement:e,skipInitialized:!0,onlyInitialized:!1,componentId:t,module:ba}).forEach(({initializeModule:o})=>{o()})};var Hf=async({observe:e=[],beforeUpdate:t=()=>Promise.resolve(),afterUpdate:r=()=>{},watch:o,id:n,invalidateId:s,persistent:i=!1,renderFunction:a})=>{let c=!1,l=ln({element:ql({id:s})});r();let p=e.map(h=>o(h,async()=>{if(c)return;pn({id:n,prop:h});let d=ql({id:s}),y=yn({state:h,componentId:n,moduleId:s,type:Al}),v=Sd({state:h,componentId:n,invalidateId:s,type:Al});c=!0,u.useNextLoop(async()=>{if(!d){qr({id:n,prop:h});return}await t(),oo({id:n,invalidateParent:d}),ro({id:n,repeatParent:d}),or({id:l??n,container:d}),d.textContent="",eo({stringDOM:a(),parent:d,position:"afterbegin"}),fe.set(pt,{element:d,parentId:l??n,persistent:i,source:uh},{emit:!1}),await fe.emitAsync(pt),an(),c=!1,y(),v(),ya({invalidateParent:d,id:n}),va({repeatParent:d,id:n}),qr({id:n,prop:h}),r()})}));jf({invalidateId:s,unsubscribe:p})};var Uf=e=>(u.checkType(Array,e)?e:[e]).map(r=>Ae.extractkeyFromProp(r));var Gf=({invalidateId:e,initializeModule:t})=>{let r=Te.get(e);r&&Te.set(e,{...r,initializeModule:t,unsubscribe:[()=>{}]})};var qf=({invalidateId:e})=>{let t=Te.get(e);t&&Te.set(e,{...t,initialized:!0,initializeModule:()=>{}})};var Jf=({invalidateId:e,scopeId:t,observe:r})=>{Te.set(e,{element:void 0,initialized:!1,observed:r,scopeId:t,initializeModule:()=>{},unsubscribe:[()=>{}]})};var Yf=({repeatId:e,unsubscribe:t})=>{let r=J.get(e);r&&J.set(e,{...r,unsubscribe:t})};var xn=new Set,Xf=({id:e,state:t,container:r})=>{xn.add({id:e,state:t,container:r})},Kf=({id:e,state:t,container:r})=>{r&&xn.forEach(o=>{e===o.id&&t===o.state&&r===o.container&&xn.delete(o)})},Qf=({id:e="",state:t="",container:r})=>[...xn].some(n=>e===n.id&&t===n.state&&r===n.container);var eg=(e=[],t=[],r="")=>{let o=new Set(t.map(n=>n?.[r]));return e.filter(n=>!o.has(n?.[r]))},tg=(e=[],t=[],r="")=>{let o=new Set(t.map(n=>n?.[r]));return e.map((n,s)=>({isNewElement:!o.has(n?.[r]),keyValue:n?.[r],index:s}))},Zf=({arr:e=[],key:t=""})=>e.every(r=>u.checkType(Object,r)&&t in r),rg=({current:e,previous:t,key:r})=>Zf({arr:e,key:r})&&Zf({arr:t,key:r}),Ta=({data:e=[],key:t=""})=>{let r=new Set;return e.filter(o=>{let n=o?.[t];return r.has(n)?!1:(r.add(n),!0)})},_a=({children:e,previousChildren:t=[],hasKey:r})=>{let o=new Set(t),n=t.length>0,s={};for(let i of e){let{index:a}=xr({id:i}),c=r&&n&&!o.has(i)?`_${a}`:a;s[c]?s[c].push(i):s[c]=[i]}return Object.values(s)},og=({children:e,key:t,data:r})=>{if(!e?.length||!r?.length)return[];let o=new Map(e.map(n=>{let{current:s}=xr({id:n[0]});return[s[t],n]}));return r.map(n=>o.get(n[t])).filter(n=>n!==void 0)};var Cn=new Map,Sa=(e={})=>{let t=u.getUnivoqueId();return Cn.set(t,e),t},xa=(e="")=>{let t=Cn.get(e);return Cn.delete(e),t??{}};var ng=()=>{Cn.clear()};var Ca=(e={})=>`${mn}="${Sa(e)}"`,Ea=(e,t,r)=>Math.min(Math.max(e,t),r);var Jl=({repeatId:e})=>{let t=J.get(e);return t?t.currentData:[]};var Dw="index",$o=({observe:e,hasKey:t,key:r="",keyValue:o="",index:n,repeatId:s})=>{let i=Jl({repeatId:s}),a=t?i?.find(p=>p[r]===o):i?.[n],c=a,l=a;return new Proxy({},{get(p,h){Ae.setCurrentDependencies(e);let f=Jl({repeatId:s}),d=Math.max(f?.length-1,0);if(h===Dw){if(t){let y=f?.findIndex(v=>v[r]===o);return Ea(y,0,d)}return Ea(n,0,d)}return t?(l=c??l,c=f?.find(y=>y[r]===o),c??l):(l=c??l,c=f?.[Ea(n,0,d)],c??l)},set(){return!1}})};var sg=({diff:e,current:t,previousLenght:r,render:o,state:n,repeatId:s})=>{let i=document.createRange();return[...Array.from({length:e}).keys()].map((c,l)=>{let p=t?.[l+r],h=l+r,f=$o({observe:n,hasKey:!1,index:h,repeatId:s}),d=o({initialIndex:h,initialValue:p,current:f,sync:()=>""}),y=Bt();st(!0);let v=i.createContextualFragment(d);if(st(y),!1){let T=Gr(v,!1).map(S=>new WeakRef(S));ca({components:T,current:p,index:h,observe:n,repeatId:s,key:void 0})}return la({components:Ki(),current:p,index:h,observe:n,repeatId:s,key:void 0}),v.firstElementChild}).filter(c=>c!==null)},Fw=({initialIndex:e,initialValue:t,state:r,repeatId:o})=>`${Qt}="${Oo({current:t,index:e})}"
    ${Zt}="${r}" ${Vt}="${o}"`,ig=({diff:e,previousLenght:t,current:r,state:o,repeatId:n,render:s})=>[...Array.from({length:e}).keys()].map((i,a)=>{let c=a+t,l=r?.[c]?{...r?.[c]}:{},p=$o({observe:o,hasKey:!1,index:c,repeatId:n});return s({sync:()=>Fw({initialIndex:c,initialValue:l,repeatId:n,state:o}),initialIndex:c,initialValue:l,current:p})}).join(""),ag=({currentValue:e,index:t,state:r,repeatId:o,key:n,keyValue:s,render:i})=>{let a=$o({observe:r,hasKey:!0,key:n,keyValue:s,index:t,repeatId:o}),c=Bt();st(!0);let l=document.createRange().createContextualFragment(i({initialIndex:t,initialValue:e,current:a,sync:()=>""}));if(st(c),!1){let p=Gr(l,!1).map(h=>new WeakRef(h));ca({components:p,current:e,index:t,observe:r,repeatId:o,key:s})}return la({components:Ki(),current:e,index:t,observe:r,repeatId:o,key:s}),l.firstElementChild},Bw=({keyValue:e,index:t,currentValue:r,state:o,repeatId:n})=>` ${"key"}="${e}"
    ${Zt}="${o}"
    ${Qt}="${Oo({current:r,index:t})}"
    ${Vt}="${n}"`,cg=({currentValue:e,index:t,state:r,repeatId:o,key:n,keyValue:s,render:i})=>{let a={...e},c=$o({observe:r,hasKey:!0,key:n,keyValue:s,index:t,repeatId:o});return i({initialIndex:t,initialValue:a,current:c,sync:()=>Bw({currentValue:a,index:t,keyValue:s,repeatId:o,state:r})})},lg=({currentUnique:e,render:t,observe:r,repeatId:o,key:n="",hasKey:s})=>{let i=document.createRange();return e.map((c,l)=>{let p=$o({observe:r,hasKey:s,key:n,keyValue:s?c?.[n]:"",index:l,repeatId:o}),h=Bt();st(!0);let f=i.createContextualFragment(t({initialIndex:l,initialValue:c,current:p,sync:()=>""}));if(st(h),!1){let d=Gr(f,!1).map(y=>new WeakRef(y));ca({components:d,current:c,index:l,observe:r,repeatId:o,key:s?c?.[n]:""})}return la({components:Ki(),current:c,index:l,observe:r,repeatId:o,key:s?c?.[n]:""}),f.firstElementChild}).filter(c=>c!==null)},ug=({currentUnique:e,key:t="",observe:r,repeatId:o,hasKey:n,render:s})=>e.map((a,c)=>{let l=()=>`${Qt}="${Oo({current:a,index:c})}"
                            ${"key"}="${n?a?.[t]:""}"
                            ${Zt}="${r}"
                            ${Vt}="${o}"`,p=$o({observe:r,hasKey:n,key:t,keyValue:n?a?.[t]:"",index:c,repeatId:o});return s({sync:l,initialIndex:c,initialValue:a,current:p})}).join("");var wa=({repeatId:e,id:t})=>{let r=J.get(e);if(!r)return;let{element:o,observed:n}=r;if(!o)return;let s=[...o.children],a=Kt(t)[n];J.set(e,{...r,nativeDOMChildren:s.map((c,l)=>({index:l,value:a[l],element:c}))})},Rs=({repeatId:e})=>{let t=J.get(e);if(!t)return[];let{nativeDOMChildren:r}=t;return r};var En=({repeatId:e,currentData:t})=>{let r=J.get(e);r&&J.set(e,{...r,currentData:t})};var Vw=({element:e,container:t})=>{let r=wh(e);t.insertAdjacentHTML("beforeend",`<!-- ${r} --> `)},pg=({state:e="",current:t=[],previous:r=[],repeaterParentElement:o=document.createElement("div"),key:n="",id:s="",render:i,repeatId:a,useSync:c})=>{let l=Ta({data:t,key:n});En({repeatId:a,currentData:l});let p=eg(r,l,n),h=p.map(T=>Dl({keyValue:T?.[n],repeatId:a})).filter(T=>T.length>0),f=h.length>0;h.forEach(T=>{let S=T[0].element,_=T[0].id;if(!_)return;let E=Ms({id:_}),x=E??S;oo({id:s,invalidateParent:x}),ro({id:s,repeatParent:x}),T.forEach(({id:w})=>{it({id:w})}),E&&E.remove()}),f||Rs({repeatId:a}).filter(_=>p.map(E=>E?.[n]).includes(_.value?.[n])).forEach(_=>{let{element:E}=_;oo({id:s,invalidateParent:E}),ro({id:s,repeatParent:E}),or({id:s,container:E})});let d=tg(l,r,n).map(({keyValue:T,isNewElement:S,index:_})=>{if(S)return{keyValue:T,isNewElement:S,index:_,wrapper:void 0};let E=Dl({keyValue:T,repeatId:a}),x=E[0]?.element?Ms({id:E[0]?.id??""}):Rs({repeatId:a}).find(I=>I.value?.[n]===T)?.element;return{keyValue:T,isNewElement:S,index:_,persistentElement:E,persistentDOMwrapper:x}});o.replaceChildren();let y=document.createRange(),v=new DocumentFragment;return d.forEach(({isNewElement:T,keyValue:S,index:_,persistentElement:E,persistentDOMwrapper:x})=>{if(!T){let{debug:A}=Mt();x&&v.append(x);let O=E?.[0]?.element;!x&&O&&(v.append(O),A&&Vw({element:E[0]?.element,container:o}));return}let w=l?.[_],I=c?cg({currentValue:w,index:_,state:e,repeatId:a,key:n,keyValue:S,render:i}):ag({currentValue:w,index:_,state:e,repeatId:a,key:n,keyValue:S,render:i}),N=Bt();if(st(!0),c){let A=y.createContextualFragment(I);v.append(A)}!c&&I&&v.append(I),st(N)}),o.append(v),l};var Ww=e=>{let t=e.lastElementChild;if(!t)return;let r=t.nextSibling;for(;r;){let o=r.nextSibling;r.nodeType===Node.COMMENT_NODE&&r.remove(),r=o}},mg=({state:e="",current:t=[],previous:r=[],repeaterParentElement:o=document.createElement("div"),render:n,repeatId:s,id:i,useSync:a,currentChildren:c})=>{En({repeatId:s,currentData:t});let l=t.length,p=r.length,h=l-p;if(h>0){let f=a?ig({diff:h,previousLenght:p,current:t,state:e,repeatId:s,render:n}):sg({diff:h,current:t,previousLenght:p,render:n,state:e,repeatId:s});a&&eo({stringDOM:f,parent:o,position:"beforeend"}),a||Es({elements:f,parent:o,position:"beforeend"})}if(h<0){let f=_a({children:c,hasKey:!1});f.filter((S,_)=>_>=t.length).forEach(S=>{S.forEach(_=>{let E=aa({id:_}),x=Ms({id:_}),w=x??E;oo({id:i,invalidateParent:w}),ro({id:i,repeatParent:w}),it({id:_}),x&&x.remove()})});let{debug:y}=Mt();if(y&&Ww(o),f.length>0)return t;let v=Rs({repeatId:s});if(!v)return t;v.filter(({index:S})=>S>=t.length).forEach(S=>{let{element:_}=S;oo({id:i,invalidateParent:_}),ro({id:i,repeatParent:_}),or({id:i,container:_}),_.remove()})}return t};var hg=async({state:e="",persistent:t,repeaterParentElement:r=document.createElement("div"),current:o=[],previous:n=[],key:s="",id:i,fallBackParentId:a="",render:c,repeatId:l,useSync:p,currentChildren:h=[]})=>{let y=(rg({current:o,previous:n,key:s})?pg:mg)({state:e,current:o,previous:n,repeaterParentElement:r,key:s,id:i,render:c,repeatId:l,useSync:p,currentChildren:h});return fe.set(pt,{element:r,parentId:a??i,persistent:t,source:lh},{emit:!1}),await fe.emitAsync(pt),an(),y};var dg=({state:e="",setState:t,persistent:r=!1,watch:o,clean:n=!1,beforeUpdate:s,afterUpdate:i,key:a="",id:c="",repeatId:l="",render:p,useSync:h=!1})=>{let f=aa({id:c}),d=Is({id:l}),y=d?ln({element:d})??"":"";return i(),o(e,async(T,S)=>{if(!u.checkType(Array,T))return;let _=Is({id:l}),E=yn({state:e,componentId:c,moduleId:l,type:Nl}),x=wd({state:e,componentId:c,repeatId:l,type:Nl});if(pn({id:c,prop:e}),Qf({id:c,state:e,container:_})){qr({id:c,prop:e}),t(e,S,{emit:!1}),E(),x();return}let I=xs({repeatId:l});f&&await s(),n&&(I.forEach(D=>{it({id:D})}),_&&(_.textContent="")),_&&Xf({id:c,state:e,container:_});let N=await hg({state:e,persistent:r,repeaterParentElement:_??document.createElement("div"),current:T,previous:n?[]:S,key:a,id:c,fallBackParentId:y,render:p,repeatId:l,useSync:h,currentChildren:n?[]:I}),A=xs({repeatId:l}),O=!!a,R=_a({children:A,previousChildren:I,hasKey:O}),P=O?[...og({children:R,key:a,data:N})]:R,$=O?new Map(T.map((D,k)=>[`${D?.[a]}`,k])):new Map;P.forEach((D,k)=>{let L=N?.[k];if(!L)return;let C=O?$.get(`${L?.[a]}`)??-1:k;D.forEach(M=>{ua({id:M,value:{current:L,index:C}})})}),u.useNextLoop(async()=>{f&&i(),Kf({id:c,state:e,container:_}),qr({id:c,prop:e}),E(),x(),ya({invalidateParent:_,id:c}),va({repeatParent:_,id:c}),P.length===0&&wa({repeatId:l,id:c})})})};var fg=({repeatId:e,persistent:t,state:r,setState:o,emit:n,watch:s,clean:i,beforeUpdate:a,afterUpdate:c,key:l,id:p,render:h,useSync:f})=>{let d=dg({state:r,setState:o,persistent:t,emit:n,watch:s,clean:i,beforeUpdate:a,afterUpdate:c,key:l,id:p,repeatId:e,render:h,useSync:f});Yf({repeatId:e,unsubscribe:d})};var gg=({repeatId:e,initializeModule:t})=>{let r=J.get(e);r&&J.set(e,{...r,initializeModule:t,unsubscribe:()=>{}})};var bg=({repeatId:e})=>{let t=J.get(e);t&&J.set(e,{...t,initialized:!0,initializeModule:()=>{}})};var vg=({repeatId:e,initialDOMRender:t})=>{let r=J.get(e);r&&J.set(e,{...r,initialRenderWithoutSync:t})};var yg=({repeatId:e,scopeId:t,observe:r})=>{J.set(e,{element:void 0,initialized:!1,scopeId:t,observed:r,nativeDOMChildren:[],componentChildren:[],currentData:[],initialRenderWithoutSync:[],initializeModule:()=>{},unsubscribe:()=>{}})};var Tg=({repeatId:e,scopeId:t})=>{let r=rt.get(t)??[];rt.set(t,[...r,{repeatId:e}])};var _g=({invalidateId:e,scopeId:t})=>{let r=tt.get(t)??[];tt.set(t,[...r,{invalidateId:e}])};var Sg=({getState:e,setState:t,updateState:r,getProxi:o,emit:n,emitAsync:s,computed:i,watch:a,id:c,key:l,bindEventsId:p,debug:h})=>({bindEventsId:p,key:l,id:c,getState:e,setState:t,updateState:r,getProxi:o,emit:n,emitAsync:s,computed:i,watch:a,debug:h,repeatIdArray:[],renderComponent:async({attachTo:d,component:y,position:v="afterbegin",clean:T=!0})=>{T&&(or({id:c,container:d}),d.textContent=""),d.insertAdjacentHTML(v,y),fe.set(pt,{element:d,parentId:c,persistent:ji(c),source:ph},{emit:!1}),await fe.emitAsync(pt),an()},getChildren:d=>Vi({id:c,componentName:d}),freezeProp:d=>{let y=Ae.extractkeyFromProp(d);return pn({id:c,prop:y.toString()})},unFreezeProp:d=>{let y=Ae.extractkeyFromProp(d);return qr({id:c,prop:y.toString()})},unBind:()=>xf({id:c}),bindProps:d=>{let y="props"in d?d:{props:d};return`${Gi}="${Cf({...y,parentId:c})}" `},staticProps:d=>` ${mn}="${Sa(d)}" `,remove:()=>{it({id:c})},removeDOM:d=>{or({id:c,container:d}),d.textContent=""},getParentId:()=>_s(c),watchParent:(d,y)=>{let v=Et(_s(c),d,y);v&&da({id:c,unWatchArray:[v]})},onMount:d=>ff({id:c,cb:d}),bindEvents:d=>`${qi}="${Tf(d)}"`,delegateEvents:d=>`${er}="${Bf(d)}"`,bindEffect:d=>`${hn}="${Rf({data:d,id:c})}"`,addMethod:(d,y)=>{Rh({id:c,name:d,fn:y})},setRef:d=>`${tr}="${c}" ${_r}="${d}"`,getRef:()=>Of({id:c}),getRefs:()=>Ul({id:c}),bindText:(d,...y)=>{let v=u.getUnivoqueId(),T=()=>Pd(c,d,...y);return Id(v,{id:c,render:T,props:y}),`<mobjs-bind-text ${Ro}="${c}" ${Hi}="${v}"></mobjs-bind-text>${T()}`},bindObject:(d,...y)=>{let v=Dd(y),T=u.getUnivoqueId(),S=()=>Fd(d,...y);return $d(T,{id:c,keys:v,render:S}),`<mobjs-bind-object ${Ro}="${c}" ${Ui}="${T}"></mobjs-bind-object>${S()}`},invalidate:({observe:d,render:y,beforeUpdate:v=()=>Promise.resolve(),afterUpdate:T=()=>{}})=>{let S=Uf(d),_=u.getUnivoqueId(),E=`${Ji}=${_}`,x=()=>y(),w=!1;return _g({invalidateId:_,scopeId:c}),Jf({invalidateId:_,scopeId:c,observe:S}),Gf({invalidateId:_,initializeModule:()=>{w||(Hf({observe:S,watch:a,beforeUpdate:v,afterUpdate:T,persistent:ji(c),id:c,invalidateId:_,renderFunction:x}),w=!0,qf({invalidateId:_}))}}),`<mobjs-invalidate ${E} style="display:none;"></mobjs-invalidate>${x()}`},repeat:({observe:d,clean:y=!1,beforeUpdate:v=()=>Promise.resolve(),afterUpdate:T=()=>{},key:S="",render:_,useSync:E=!1})=>{let x=Ae.extractkeyFromProp(d),w=u.getUnivoqueId(),I=S!=="";Tg({repeatId:w,scopeId:c}),yg({repeatId:w,scopeId:c,observe:x});let N=e()?.[x],A=I?Ta({data:N,key:S}):N;En({repeatId:w,currentData:A});let O=E?ug({currentUnique:A,key:S,observe:x,repeatId:w,hasKey:I,render:_}):"",R=E?[]:lg({currentUnique:A,render:_,observe:x,repeatId:w,key:S,hasKey:I}),P=!1;return vg({repeatId:w,initialDOMRender:R}),gg({repeatId:w,initializeModule:()=>{P||(fg({repeatId:w,persistent:ji(c),state:x,setState:t,emit:n,watch:a,clean:y,beforeUpdate:v,afterUpdate:T,key:S,id:c,render:_,useSync:E}),P=!0,bg({repeatId:w}),Qh({repeatId:w})||wa({repeatId:w,id:c}))}}),`<mobjs-repeat ${Yi}="${w}" style="display:none;"></mobjs-repeat>${O}`}});var Yl=({componentName:e,currentProps:t={}})=>{let o=Ao()?.[e]?.componentParams?.exportState??[];return Object.fromEntries(Object.entries(t).filter(([n])=>o.includes(n)))};var xg=({element:e,parentIdForced:t})=>{let r=e.getId(),o=e.getInstanceName(),n=e.getParentId(),s=ln({element:e}),i=e.getStaticPropsId(),a=e.getDynamicPropsid(),c=e.getBindEventsId(),l=e.getRepeatValue(),p=e.getComponentRepeatId(),h=e.getCurrentKey()??"",f=e.getComponentName(),d=i?.split(" ").join(""),y=xa(d),v={...e.dataset},T=e.getRepeaterPropBind(),S=uf(l);return{element:e,props:{...Yl({componentName:f,currentProps:v}),...Yl({componentName:f,currentProps:y})},id:r,componentName:f,instanceName:o,key:h,dynamicPropsId:a,repeatPropBind:T,bindEventsId:c,currentRepeatValue:S,parentId:s,componentRepeatId:p}};var Cg=e=>{un.add(e)};var Eg=({element:e,instanceName:t="",props:r={},state:o={},bindStore:n,methods:s={},key:i="",currentRepeaterState:a=rr,repeaterInnerWrap:c,repeatPropBind:l="",componentRepeatId:p="",parentPropsWatcher:h=[()=>{}],refs:f={},destroy:d=()=>{},freezedPros:y=[],persistent:v=!1,child:T={},parentId:S="",id:_="",componentName:E=""})=>{let x=u.createStore(o);zh({props:r,store:x}),n&&x.bindStore(n),v||Cg(_),p&&p.length>0&&Xh({componentId:_,repeatId:p}),t&&t.length>0&&_h({instanceName:t,id:_});let w=zd({componentName:E}),I=new Set(w);return x.setProxiReadOnlyProp(w),j.set(_,{element:e,componentName:E,instanceName:t,destroy:d,parentPropsWatcher:h,refs:f,methods:s,key:i,currentRepeaterState:a,repeaterInnerWrap:c,repeatPropBind:l,componentRepeatId:p,persistent:v,id:_,parentId:S,freezedPros:y,child:T,state:x}),{getState:()=>x.get(),setState:(N="",A={},{emit:O=!0}={})=>{let R=ko({id:_,prop:N}),P=Ae.extractkeyFromProp(N),$=I.has(P);$&&zi({prop:P,componentName:E,action:"updateState"}),!(R||$)&&x.set(P,A,{emit:O??!0,usePropAsString:!0})},updateState:(N="",A=()=>({}),{emit:O=!0,clone:R=!1}={})=>{let P=ko({id:_,prop:N}),$=Ae.extractkeyFromProp(N),D=I.has($);D&&zi({prop:$,componentName:E,action:"updateState"}),!(P||D)&&x.update($,A,{emit:O??!0,clone:R??!1,usePropAsString:!0})},getProxi:()=>x.getProxi(),emit:(N="")=>x.emit(N),emitAsync:async(N="")=>await x.emitAsync(N),computed:(N="",A=()=>{},O=[])=>{let R=Ae.extractkeyFromProp(N);if(I.has(R)){zi({prop:R,componentName:E,action:"computed"});return}return x.computed(R,A,O,{usePropAsString:!0})},watch:(N="",A=()=>{},{wait:O=!1,immediate:R=!1}={})=>x.watch(N,A,{wait:O??!1,immediate:R??!1}),debug:()=>x.debug()}};var wg=({id:e})=>(tt.get(e)??[]).map(({invalidateId:r})=>{let o=Te.get(r);if(o)return{invalidateId:r,initializeModule:o.initializeModule}}).filter(r=>r!==void 0);var Ig=({id:e})=>(rt.get(e)??[]).map(({repeatId:r})=>{let o=J.get(r);if(o)return{repeatId:r,initializeModule:o.initializeModule}}).filter(r=>r!==void 0);var Mg=async({element:e,persistent:t=!1,parentIdForced:r="",source:o=Hr})=>{let{debug:n}=Mt();n&&console.log("parse source:",o);let s=Ao(),i=[],a=Vl({element:e,currentSelectors:[]}),c=a.parseSourceArray,l=a?.componentToParse;for(;l;){let h=l.getComponentName(),f=s?.[h]?.componentFunction,d=s?.[h]?.componentParams,{scoped:y,bindStore:v}=d,{props:T,id:S,componentName:_,instanceName:E,key:x,dynamicPropsId:w,currentRepeatValue:I,bindEventsId:N,parentId:A,componentRepeatId:O,repeatPropBind:R}=xg({element:l,parentIdForced:r}),P=d?.state??{},{getState:$,setState:D,updateState:k,getProxi:L,emit:C,emitAsync:M,computed:F,watch:B,debug:V}=Eg({element:l,props:T,state:P,id:S,componentName:_,instanceName:E,key:x,repeatPropBind:R,persistent:t,parentId:A,componentRepeatId:O,bindStore:v});Hh({id:S}),O&&O?.length>0&&(ua({id:S,value:I}),bf({id:S,repeatId:O,element:l})),Ef({propsId:w,repeatPropBind:R,componentId:S});let U=Sg({getState:$,setState:D,updateState:k,getProxi:L,emit:C,emitAsync:M,computed:F,watch:B,id:S,key:x,bindEventsId:N,debug:V}),te=await f(U),ce=l.classList,{newElement:G}=pf({content:te,element:l});if(md(),ce.length>0&&G?.classList.add(...ce),!0,!G)return;of({id:S,newElement:G});let oe=wg({id:S}),se=Ig({id:S});N&&_f({element:G,componentId:S,bindEventsId:N});let re=y??Mt().scoped;re&&await Wl({id:S,element:G}),G?.inizializeCustomComponent?.(U),i.push({onMount:async()=>{re||await Wl({id:S,element:G})},initializeBindPropsWatcher:()=>{zl({componentId:S,repeatPropBind:R,inizilizeWatcher:!0})},fireInvalidateFunction:oe.length>0?()=>{oe.forEach(({initializeModule:X})=>{X?.()})}:()=>{},fireRepeatFunction:se.length>0?()=>{se.forEach(({initializeModule:X})=>{X?.()})}:()=>{}});let ke=Vl({element:e,currentSelectors:c});c=ke.parseSourceArray,l=ke.componentToParse;let je=Bl()===Mt().maxParseIteration;if(mf(),je){console.warn(`dom parse reached max parse limit: ${Bl()}`);break}}let p=Nf({element:e});Object.keys(p).length>0&&Af(p);for(let h of i.toReversed()){let{onMount:f,initializeBindPropsWatcher:d,fireInvalidateFunction:y,fireRepeatFunction:v}=h;await f(),v(),y(),d()}i.length=0,c.length=0,l=null,Vf(e),Pf(e),Nd(),Bd()};var Ps=async({element:e,persistent:t=!1,parentIdForced:r="",source:o=Hr})=>{await Mg({element:e,persistent:t,parentIdForced:r,source:o}),hf()},kg=()=>{fe.watch(pt,async({element:e,parentId:t,persistent:r=!1,source:o=Hr})=>{await Ps({element:e,parentIdForced:t??"",persistent:r,source:o})})};var Rg=()=>{ng(),Sf(),wf()};var Pg,Ng,Ag=({fn:e})=>{e&&(Ng=e)},Og=({fn:e})=>{e&&(Pg=e)},$g=()=>Ng,Lg=()=>Pg;var Dg=!0,Fg=e=>{Dg=e},Bg=()=>Dg;var Vg=()=>{for(let e of un)it({id:e})};var Wg=new Map,jg=({route:e,params:t})=>Object.entries(t).reduce((r,[o,n])=>`${r}-${o}-${n}`,e),zg=async({route:e="",templateName:t="",isBrowserNavigation:r=!1,params:o={},skipTransition:n})=>{fe.set(Jt,!0),await Cr();let s=Wi();if(!s||!(s instanceof HTMLElement))return;let{activeRoute:i,activeParams:a}=fe.get(),c=jg({route:e,params:o}),l=jg({route:i.route,params:a}),p=window.scrollY;Wg.set(l,p);let h=Wg.get(c)??0;fe.set(Io,{currentRoute:i.route,currentTemplate:i.templateName,nextRoute:e,nextTemplate:t});let f=!1,d=fe.watch(Io,()=>{f=!0});Rg(),fe.set(on,{route:e,templateName:t}),fe.set(nn,o);let y=bn({hash:e}),v=n||y?.skipTransition,T=y?.props??{},S=await y?.layout?.({params:o,props:T})??"",_=$g(),E=s.cloneNode(!0);_&&E&&!v&&(await _({oldNode:E,oldRoute:i.route,newRoute:e,oldTemplateName:i.templateName,newTemplateName:t}),s?.parentNode?.insertBefore(E,s)),s.replaceChildren(),Vg(),eo({stringDOM:S,parent:s,position:"afterbegin"}),await Ps({element:s}),v||(s.style.visibility=""),f||fe.set(sn,{currentRoute:e,currentTemplate:t,previousRoute:i.route,previousTemplate:i.templateName}),Bg()&&r?scrollTo(0,h):scrollTo(0,0),document.body.dataset.route=e,document.body.dataset.template=t;let x=Lg();x&&!v&&(await x({oldNode:E,newNode:s,oldRoute:i.route,newRoute:e,oldTemplateName:i.templateName,newTemplateName:t}),E.remove()),E=null,d?.(),fe.set(Jt,!1)};var Hg=({route:e})=>e,Ug=e=>{Hg=e},Gg=({route:e})=>{let t=Hg({route:e});return{route:t,isRedirect:t!==e}};var qg=({hash:e=""})=>{let t=ia(),r=rf();return e===""?t:bn({hash:e})?e:r},Jg=({hash:e=""})=>bn({hash:e})?.templateName??"",Yg=({hash:e=""})=>bn({hash:e})?.restoreScroll??!0;var Xg="",Kg=!0,Er="",Qg="",no,Kl,Ns,Ql=e=>e.replace("?","").replace("/",""),Zg=e=>e.replace("#","").replace("/","").replace(".",""),jw=e=>e.split("&").reduce((t,r)=>{let o=r.split("="),n=Ql(o?.[0]??""),s=o?.[1];return n&&n.length>0?{...t,[n]:s}:t},{}),zw=e=>e&&Object.entries(e).reduce((t,[r,o],n)=>`${t}${n===0?"":"&"}${r}=${o}`,"");document.addEventListener("click",e=>{if(!e.target)return;e.target.closest("a")&&fe.getProp(Jt)&&e.preventDefault()},{passive:!1});var Ia=async({shouldLoadRoute:e=!0}={})=>{let t=globalThis.location.hash,r={hash:t},{routeIsLoading:o}=fe.get();if(o){globalThis.location.hash=Xg.replace("#","");return}Ns||history.replaceState({nextId:r},"",t);let{route:n,isRedirect:s}=Gg({route:t});s&&history.replaceState({nextId:r},"",`#${n}`);let i=n.split("?"),a=Ql(i?.[1]??"");Qg=Er,Er=Zg(i?.[0]??"");let c=jw(no??a),l=no||Object.keys(a).length>0?`?${no??a}`:"";no=void 0;let p=qg({hash:Er}),h=Jg({hash:Er&&Er.length>0?Er:ia()}),f=Er===Qg&&l.length===0&&!Kg;e&&!f&&(Xg=`#${Er}${l}`,await zg({route:p,templateName:h,isBrowserNavigation:Yg({hash:Er})&&!!Ns,params:c,skipTransition:!!(Ns??Kl)})),e||(fe.set(on,{route:p,templateName:h}),fe.set(nn,c)),Kl=void 0,u.useNextLoop(()=>{Kg=!1})},eb=()=>{Ia(),globalThis.history.scrollRestoration="manual",globalThis.addEventListener("popstate",e=>{Ns=e?.state?.nextId}),globalThis.addEventListener("hashchange",async()=>{await Zr(),Ia()})},tb=({url:e,params:t,skipTransition:r})=>{if(!e||fe.getProp(Jt))return;Kl=r;let o=e.split("?"),n=Zg(o?.[0]??""),s=zw(t),i=Ql(o?.[1]??""),a=s??i;no=a.length>0?a:"",Ns=void 0,globalThis.location.hash=no&&no.length>0?`${n}?${no}`:n,globalThis.dispatchEvent(new HashChangeEvent("hashchange"))};var rb=async({rootId:e,wrapper:t,contentId:r,routes:o=[],afterInit:n=()=>{},redirect:s=({route:f})=>f,index:i="home",pageNotFound:a="pageNotFound",beforePageTransition:c,pageTransition:l,restoreScroll:p=!0,componentDefaultProps:h={scoped:!1,maxParseIteration:1e4,debug:!1}})=>{qd(h);let f=document.querySelector(e),d=await t();Ug(s),!(!r||!f)&&(yh({contentId:r}),Lf({element:f}),Og({fn:l}),Ag({fn:c}),Fg(p),kg(),jd(),Zd(o),ef({hash:i}),tf({hash:a}),eo({stringDOM:d,parent:f,position:"afterbegin"}),Th(),Ia({shouldLoadRoute:!1}),await Ps({element:f,persistent:!0}),u.useFrameIndex(()=>{u.useNextTick(()=>{n()})},5),eb())};var ob=()=>Te.size;var nb=()=>J.size;var ue={};So(ue,{clamp:()=>nt,getDefault:()=>gI,mq:()=>yI,printDefault:()=>bI,setDefault:()=>fI,useVelocity:()=>vI});var Lo={default:{tension:20,mass:1,friction:5,velocity:0,precision:.01},gentle:{tension:120,mass:1,friction:14,velocity:0,precision:.01},wobbly:{tension:180,mass:1,friction:12,velocity:0,precision:.01},bounce:{tension:200,mass:3,friction:5,velocity:0,precision:.01},scroller:{tension:10,mass:1,friction:5,velocity:0,precision:.5}};var ge={easeLinear:"easeLinear",easeInQuad:"easeInQuad",easeOutQuad:"easeOutQuad",easeInOutQuad:"easeInOutQuad",easeInCubic:"easeInCubic",easeOutCubic:"easeOutCubic",easeInOutCubic:"easeInOutCubic",easeInQuart:"easeInQuart",easeOutQuart:"easeOutQuart",easeInOutQuart:"easeInOutQuart",easeInQuint:"easeInQuint",easeOutQuint:"easeOutQuint",easeInOutQuint:"easeInOutQuint",easeInSine:"easeInSine",easeOutSine:"easeOutSine",easeInOutSine:"easeInOutSine",easeInExpo:"easeInExpo",easeOutExpo:"easeOutExpo",easeInOutExpo:"easeInOutExpo",easeInCirc:"easeInCirc",easeOutCirc:"easeOutCirc",easeInOutCirc:"easeInOutCirc",easeInElastic:"easeInElastic",easeOutElastic:"easeOutElastic",easeInOutElastic:"easeInOutElastic",easeInBack:"easeInBack",easeOutBack:"easeOutBack",easeInOutBack:"easeInOutBack",easeInBounce:"easeInBounce",easeOutBounce:"easeOutBounce",easeInOutBounce:"easeInOutBounce"},$s="min",sb="max",eu="desktop",Ls="easeLinear",As="default",tu={xSmall:320,small:360,medium:600,tablet:768,desktop:992,large:1200,xLarge:1600,xxLarge:1980},ru=10,Os=.06,ou="#ff0000",nu="#14df3b",su=8,iu=10,au=1e3,cu=!1,Uw=!1,Gw=!1,qw=.01,Jw=.06,ib=e=>{let t=Je({prop:"deferredNextTick",value:e?.deferredNextTick,defaultValue:u.store.getProp("deferredNextTick"),type:Boolean}),r=Je({prop:"usePassive",value:e?.usePassive,defaultValue:u.store.getProp("usePassive"),type:Boolean}),o=Je({prop:"throttle",value:e?.throttle,defaultValue:u.store.getProp("throttle"),type:Number}),n=Yw(e?.mq??{}),s=Je({prop:"defaultMq.value",value:e?.defaultMq?.value,defaultValue:eu,type:String}),i=Je({prop:"defaultMq.type",value:e?.defaultMq?.type,defaultValue:$s,type:String}),a=Je({prop:"sequencer.duration",value:e?.sequencer?.duration,defaultValue:ru,type:Number}),c=Zl(e?.sequencer?.ease,"sequencer"),l=Je({prop:"scrolTrigger.springConfig",value:e?.scrollTrigger?.springConfig,defaultValue:As,type:String}),p=Je({prop:"scrolTrigger.lerpConfig",value:e?.scrollTrigger?.lerpConfig,defaultValue:Os,type:Number}),h=Je({prop:"scrolTrigger.markerColor.startEnd",value:e?.scrollTrigger?.markerColor?.startEnd,defaultValue:ou,type:String}),f=Je({prop:"scrolTrigger.markerColor.item",value:e?.scrollTrigger?.markerColor?.item,defaultValue:nu,type:String}),d=Je({prop:"parallax.defaultRange",value:e?.parallax?.defaultRange,defaultValue:su,type:Number}),y=Je({prop:"parallax.springConfig",value:e?.parallax?.springConfig,defaultValue:As,type:String}),v=Je({prop:"parallax.lerpConfig",value:e?.parallax?.lerpConfig,defaultValue:Os,type:Number}),T=Je({prop:"parallaxTween.duration",value:e?.parallaxTween?.duration,defaultValue:iu,type:Number}),S=Zl(e?.parallaxTween?.ease,"parallaxTween"),_=Je({prop:"tween.duration",value:e?.tween?.duration,defaultValue:au,type:Number}),E=Zl(e?.tween?.ease,"tween"),x=Je({prop:"tween.relative",value:e?.tween?.relative,defaultValue:cu,type:Boolean}),w=Je({prop:"spring.relative",value:e?.spring?.relative,defaultValue:Uw,type:Boolean}),I=Je({prop:"lerp.relative",value:e?.lerp?.relative,defaultValue:Gw,type:Boolean}),N=Je({prop:"lerp.precision",value:e?.lerp?.precision,defaultValue:qw,type:Number}),A=Je({prop:"lerp.velocity",value:e?.lerp?.velocity,defaultValue:Jw,type:Number});return{deferredNextTick:t,throttle:o,usePassive:r,mq:n,defaultMq:{value:s,type:i},sequencer:{duration:a,ease:c},scrollTrigger:{springConfig:l,lerpConfig:p,markerColor:{startEnd:h,item:f}},parallax:{defaultRange:d,springConfig:y,lerpConfig:v},parallaxTween:{duration:T,ease:S},tween:{duration:_,ease:E,relative:x},spring:{relative:w,config:e?.spring?.config?{...Lo,...e.spring.config}:Lo},lerp:{relative:I,precision:N,velocity:A}}},Je=({prop:e,value:t,defaultValue:r,type:o})=>{let n=u.checkType(o,t);return n||console.warn(`handleSetUp error: ${e}: ${t}, is not valid must be a ${u.getTypeName(o)}`),n?t:r},Yw=e=>{let t=u.checkType(Object,e)&&Object.values(e).every(r=>u.checkType(Number,r));return t||console.warn("handleSetUp error: mq must be an object as { ..., String: Number }"),t?e:tu},Zl=(e,t)=>{let r=Object.keys(ge).includes(e);return!r&&e!==void 0&&e!==null&&console.warn(`handleSetUp error: ${t}.ease properties is not valid`),r?e:Ls};var at=(e,t,r=!0)=>{e=(n=>{let s;try{s=JSON.parse(JSON.stringify(n))}catch{s=Object.assign({},n)}return s})(e);let o=n=>n&&typeof n=="object";return!o(e)||!o(t)?t:(Object.keys(t).forEach(n=>{let s=e[n],i=t[n];Array.isArray(s)&&Array.isArray(i)?r?(e[n]=s.map((a,c)=>i.length<=c?a:at(a,i[c],r)),i.length>s.length&&(e[n]=e[n].concat(i.slice(s.length)))):e[n]=s.concat(i):o(s)&&o(i)?e[n]=at(Object.assign({},s),i,r):e[n]=i}),e)};function ab(){return{deferredNextTick:u.store.getProp("deferredNextTick"),throttle:u.store.getProp("throttle"),usePassive:u.store.getProp("usePassive"),mq:tu,defaultMq:{value:eu,type:$s},sequencer:{duration:ru,ease:Ls},scrollTrigger:{springConfig:As,lerpConfig:Os,markerColor:{startEnd:ou,item:nu}},parallax:{defaultRange:su,springConfig:As,lerpConfig:Os},parallaxTween:{duration:iu,ease:Ls},tween:{duration:au,ease:Ls,relative:cu},spring:{relative:!1,config:Lo},lerp:{relative:!1,precision:.01,velocity:.06}}}var he=(()=>{let e=ab();return{set:n=>{e=ib(at(ab(),n)),"usePassive"in n&&u.store.set("usePassive",e.usePassive),"deferredNextTick"in n&&u.store.set("deferredNextTick",e.deferredNextTick),"throttle"in n&&u.store.set("throttle",e.throttle)},get:n=>(n in e||console.warn(`handleSetUp: ${n} is not a setup propierties`),e[n]),print:()=>{console.log("Writable props:"),console.log(e)}}})();var Xw=(e="desktop")=>window.innerWidth<he.get("mq")[e],Kw=(e="desktop")=>window.innerWidth>=he.get("mq")[e],Qw=(e="desktop")=>he.get("mq")[e],ve={max:Xw,min:Kw,getBreackpoint:Qw};var _e=e=>{if(u.checkType(Number,e))return Math.round(e*1e4)/1e4||0;if(Math.abs(e)<1){let t=Number.parseInt(e.toString().split("e-")[1]);t&&(e*=Math.pow(10,t-1),e="0."+Array.from({length:t}).join("0")+e.toString().slice(2))}else{let t=Number.parseInt(e.toString().split("+")[1]);t>20&&(t-=20,e/=Math.pow(10,t),e+=Array.from({length:t+1}).join("0"))}return Number.parseFloat(Number.parseFloat(e).toFixed(4))},nt=(e,t,r)=>Math.min(Math.max(e,t),r),cb=(e,t,r)=>(1-r)*e+r*t,so=(e,t)=>{let r=Object.keys(e).toSorted(),o=Object.keys(t).toSorted();return r.length===o.length&&r.every((n,s)=>n===o[s])},Ds=(e,t)=>{let r=[];for(let o=0;o<e.length;o+=t){let n=e.slice(o,o+t);r.push(n)}return r},lb=(e,t)=>e.map(r=>r[t]);var Ma=e=>e.map(t=>(t.settled||(t.fromValue=t.currentValue),t)),wr=e=>e.map(t=>(t.fromValue=t.toValue,t.currentValue=t.toValue,t)),wn=e=>e.map(t=>(t.toValue=t.currentValue,t.fromValue=t.currentValue,t)),Ir=(e,t)=>{let r=Object.keys(e);return t.map(o=>{if(r.includes(o.prop)){let n=o.fromValue,s=o.toValue;o.fromValue=s,o.toValue=n}return o})},In=(e,t)=>e.map(r=>(r.toValue=t?r.toValue+r.currentValue:r.toValue,r));var lu=(e,t)=>e.map(r=>(r.shouldUpdate&&(r.toValProcessed=t?r.toValue+1e-5:r.toValue-r.fromValue+1e-5),r));var ka="radial",nr="start";var Mn="center",kn="edges",Rn="random",ub="MERGE_FROM_UP",uu="MERGE_FROM_DOWN",Do="equal",Fo="start";var Bo="center",Pn={type:Do,each:0,waitComplete:!1,from:nr,grid:{col:1,row:1,direction:"col"}},Xe={index:0,frame:0};var b={PX:"px",VH:"vh",VW:"vw",WPERCENT:"w",HPERCENT:"h",DEGREE:"deg",PLUS_HEIGHT:"+height",PLUS_HEIGHT_HALF:"+halfHeight",PLUS_WIDTH:"+width",PLUS_WIDTH_HALF:"+halfWidth",MINUS_HEIGHT:"-height",MINUS_HEIGHT_HALF:"-halfHeight",MINUS_WIDTH:"-width",MINUS_WIDTH_HALF:"-halfWidth",POSITION_BOTTOM:"bottom",POSITION_TOP:"top",POSITION_LEFT:"left",POSITION_RIGHT:"right",DIRECTION_VERTICAL:"vertical",DIRECTION_HORIZONTAL:"horizontal",TYPE_PARALLAX:"parallax",TYPE_SCROLLTRIGGER:"scrolltrigger",PROP_VERTICAL:"y",PROP_HORIZONTAL:"x",PROP_ROTATE:"rotate",PROP_ROTATEY:"rotateY",PROP_ROTATEX:"rotateX",PROP_ROTATEZ:"rotateZ",PROP_OPACITY:"opacity",PROP_SCALE:"scale",PROP_SCALE_X:"scaleX",PROP_SCALE_Y:"scaleY",PROP_TWEEN:"tween",TWEEN_TWEEN:"parallaxTween",TWEEN_TIMELINE:"sequencer",ALIGN_START:"start",ALIGN_TOP:"top",ALIGN_RIGHT:"right",ALIGN_CENTER:"center",ALIGN_BOTTOM:"bottom",ALIGN_LEFT:"left",ALIGN_END:"end",IN_STOP:"in-stop",IN_BACK:"in-back",OUT_STOP:"out-stop",OUT_BACK:"out-back",EASE_SPRING:"spring",EASE_LERP:"lerp",EASE_PRECISION:.001,SCROLL_UP:"up",SCROLL_DOWN:"down",ON_LEAVE:"ON_LEAVE",ON_LEAVE_BACK:"ON_LEAVE_BACK",ON_ENTER:"ON_ENTER",ON_ENTER_BACK:"ON_ENTER_BACK",ON_NOOP:"ON_NOOP"};var Mr=e=>e.map(t=>`${t} | `).join(""),io=(e,t,r)=>{console.warn(`${e}: ${JSON.stringify(t)} and to ${JSON.stringify(r)} is not equal`)},kt=e=>{console.warn(`stagger col of grid is out of range, it must be less than ${e} ( staggers length )`)},kr=e=>{console.warn(`tween | sequencer: ${e} is not valid value, must be a number or a Function that return a number`)},pb=e=>{console.warn(`sequencer, start option: ${e} value is not valid, must be a Number`)},mb=e=>{console.warn(`sequencer, end option: ${e} value is not valid, must be a Number`)},hb=()=>{console.warn("relative prop is not allowed inside a timeline")},db=e=>{console.warn(`Timeline Supend: ${e()} is not a valid value, must be a boolean`)},fb=()=>{console.warn("SyncTimeline: in revese ( or yoyo mode) only goTo || goFromTo || set action is allowed. Using goFrom makes no sense in this context. Enable forceFromTo to use from action in reverse mode")},gb=e=>{console.warn(`timeline setTween: ${e} is not an array of tween`)},bb=e=>{console.warn(`timeline setTween: ${e} is not a string`)},vb=e=>{console.warn(`asyncTimeline.setTween() label: ${e} not found`)},yb=()=>{console.warn("setTween fail")},Tb=e=>{console.warn(`label ${e} not founded`)},_b=e=>{console.warn(`sequencer.add(fn,time) ${e}: fn must be Function`)},Sb=e=>{console.warn(`sequencer.add(fn,time) ${e}: time must be a Number`)},pu=e=>{console.warn(`${e} doesn't exist in spring configuration list`)},xb=()=>{console.warn("Spring configProps: all prop must be a positive Number")},Cb=e=>{console.warn(`Spring config: ${e}: config must have friction/mass/precision/tesnion props and must be a number`)},Vo=e=>{console.warn(`${e} doesn't exist in tweens ease function`)},Ra=()=>{console.warn("stagger each must be a Number ")},Eb=e=>{console.warn(`stagger, row/col: ${e} value is not valid, must be a Number`)},wb=()=>{console.warn("Stagger error: waitComplete propierties must be a Boolean")},Ib=()=>{console.warn("Stagger error: in grid option direction should be a string radial/col/row")};var Mb=()=>{console.warn("Stagger error: in col/row direction 'from' propierties must be a string start/end/center/edges or a number")},kb=e=>{console.warn(`Stagger error: from: ${e} is not a valid value, must be a string start/end/center/edges or a number or a Object {x:Number,y:Number}`)},Rb=e=>{console.warn(`duration error: ${e} is not valid duration must be a number`)},Pb=e=>{console.warn(`duration error: ${e} is not valid duration must be a number or a Function that return a number`)},Nb=e=>{console.warn(`repeat error: ${e} is not valid repeat value must be a Number`)};var Ab=e=>{console.warn(`data inizializiation error; ${e} is not a valid value, must be a string`)},Ob=e=>{console.warn(`data inizializiation error; ${e} is not a valid value, must be a number`)},$b=()=>{console.warn("createStaggers error: items array can not be empty")},Lb=()=>{console.warn("createStaggers error: each element of the array must be an Element or an Object")},Db=()=>{console.warn(`screateStaggers error: type should be: ${Do} || ${nr} || ${"end"} || ${Bo}`)},Fb=e=>{console.warn(`createStagger:  each must be between 1 and ${e}`)},Bb=(e,t)=>{console.warn(`${t}: relative prop: ${e} is not a valid parameter, must be a boolean `)},mu=(e,t)=>{console.warn(`${t}: '${e}' is not Boolean`)},Vb=(e,t)=>{console.warn(`${t}: '${e}' is not String`)},Wb=(e,t)=>{console.warn(`${t}: '${e}' is not Number`)},jb=(e,t)=>{console.warn(`${t}: '${e}' is not Function`)},zb=()=>{console.warn("Lerp error: velocity is not valid, must be a Number greater than 0 and less than 1")},Hb=()=>{console.warn("Lerp error: precision is not valid, must be a number greater than 0")},An=e=>{console.warn(`asyncTimeline error: ${e} cannot be used inside group`)},Ub=e=>{console.warn(`${e} value must be a string`)},Gb=()=>{console.warn("tween added to asyncTimeline or used inside sync() method must be instance of HandleLerp | HandleTween | HandleSpring")},qb=()=>{console.warn("asyncTimeline arror: delay must be a Number")},Jb=e=>{console.warn(`${e} not found`)},Yb=e=>{console.warn(`timeline add async function, ${e} is not a function `)},Xb=(e,t)=>{console.warn(`${t} direction: ${e} is not valid value: must be ${b.DIRECTION_VERTICAL} | ${b.DIRECTION_HORIZONTAL}`)},Kb=e=>{console.warn(`scrollTrigger error; ${e} propierties: value must be a Object like { position: top|bottom|left|right, value: () => { return Number} } `)},Qb=()=>{console.warn("scrollTrigger error; dynamicRange propierties: value must be a Function that return a Number")},Zb=()=>{console.warn("parallax|scrolTrigger error: tween is not valid, must be an instance of HandleSequencer || ParallaxTween")},ev=(e,t)=>{console.warn(`parallax error align propierties: ${e} is not valid must be one of ${Mr(t)} or a Number between 0 and 100`)},tv=(e,t)=>{console.warn(`parallax error align propierties: ${e} is not valid must be one of ${Mr(t)}`)},rv=(e,t)=>{console.warn(`${t}: '${e}' is not Number, must be a number between 0 and 100`)},ov=(e,t)=>{console.warn(`parallax error type propierties: ${e} is not valid must be one of ${Mr(t)}`)},nv=(e,t)=>{console.warn(`parallax/scrollTrigger error propierties props: ${e} is not valid must be one of ${Mr(t)} or a custom css propierites like margin|line-height|...`)},sv=(e,t)=>{console.warn(`parallax error easeType props: ${e} is not valid must be one of ${Mr(t)}`)},iv=(e,t,r)=>{console.warn(`${r} error easeType props: ${e} is not valid must be one of ${Mr(t)}`)},av=()=>{console.warn('Scrolltrigger warning: spring animation is only available for native properties and scrollerTween, Check that with the "propierties" property set to "tween" no HandleSequencer is associated with the "tween" property')},cv=(e,t)=>{console.warn(`parallax/scrollTrigger error springConfig props: ${e} is not valid must be one of ${Mr(t)}`)},lv=e=>{console.warn(`parallax error range propierties, current value: ${e}, the value must be a number between 0 and 9.99`)},uv=e=>{console.warn(`scrollTrigger error range propierties: ${e} is not a String`)},hu=(e,t,r,o)=>{console.warn(`${o} error ${r} propierties: ${e} is not valid must be one of ${Mr(t)}`)},pv=()=>{console.warn("Parallax warning: if propierties is a tween the only choice is ParallaxTween, HandleSequencer or empty tween propierites is not allowed inside a parallax")},mv=()=>{console.warn("parallax/ScrollTrrigger error: velocity is not valid, must be a Number greater than 0 and less than 1")},hv=()=>{console.warn('parallax/ScrollTrrigger warning:  The property is "tween" but no tween has been associated, associate a tween with the "tween" property')},dv=()=>{console.warn('parallax/ScrollTrrigger: there is tween associated but pros "propierties" is not set to "tween"')},fv=(e,t)=>{console.warn(`${e}: ${t} is not a function`)},du=(e,t,r)=>{console.warn(`scrollTrigger error range : with '${t}' propierties ${e} is not valid, add one of the following unit misure: ${Mr(r)}, es: 45deg|100px|50vw etc..`)},gv=e=>{console.warn(`scrollTrigger error range : with custom css propierties '${e}' no unit misure is necessary, the default unit misure will be used (px). Only '-' for negative value is allowed`)},bv=(e,t)=>{console.warn(`scrollTrigger error range : with '${t}' propierties ${e} is not valid no unit misure is necessary. Only '-' for negative value is allowed`)};var Wt={[ge.easeLinear]:(e,t,r,o)=>r*e/o+t,[ge.easeInQuad]:(e,t,r,o)=>r*(e/=o)*e+t,[ge.easeOutQuad]:(e,t,r,o)=>-r*(e/=o)*(e-2)+t,[ge.easeInOutQuad]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e+t:-r/2*(--e*(e-2)-1)+t,[ge.easeInCubic]:(e,t,r,o)=>r*(e/=o)*e*e+t,[ge.easeOutCubic]:(e,t,r,o)=>r*((e=e/o-1)*e*e+1)+t,[ge.easeInOutCubic]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e+t:r/2*((e-=2)*e*e+2)+t,[ge.easeInQuart]:(e,t,r,o)=>r*(e/=o)*e*e*e+t,[ge.easeOutQuart]:(e,t,r,o)=>-r*((e=e/o-1)*e*e*e-1)+t,[ge.easeInOutQuart]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e*e+t:-r/2*((e-=2)*e*e*e-2)+t,[ge.easeInQuint]:(e,t,r,o)=>r*(e/=o)*e*e*e*e+t,[ge.easeOutQuint]:(e,t,r,o)=>r*((e=e/o-1)*e*e*e*e+1)+t,[ge.easeInOutQuint]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e*e*e+t:r/2*((e-=2)*e*e*e*e+2)+t,[ge.easeInSine]:(e,t,r,o)=>-r*Math.cos(e/o*(Math.PI/2))+r+t,[ge.easeOutSine]:(e,t,r,o)=>r*Math.sin(e/o*(Math.PI/2))+t,[ge.easeInOutSine]:(e,t,r,o)=>-r/2*(Math.cos(Math.PI*e/o)-1)+t,[ge.easeInExpo]:(e,t,r,o)=>e===0?t:r*Math.pow(2,10*(e/o-1))+t,[ge.easeOutExpo]:(e,t,r,o)=>e===o?t+r:r*(-Math.pow(2,-10*e/o)+1)+t,[ge.easeInOutExpo]:(e,t,r,o)=>e===0?t:e===o?t+r:(e/=o/2)<1?r/2*Math.pow(2,10*(e-1))+t:r/2*(-Math.pow(2,-10*--e)+2)+t,[ge.easeInCirc]:(e,t,r,o)=>-r*(Math.sqrt(1-(e/=o)*e)-1)+t,[ge.easeOutCirc]:(e,t,r,o)=>r*Math.sqrt(1-(e=e/o-1)*e)+t,[ge.easeInOutCirc]:(e,t,r,o)=>(e/=o/2)<1?-r/2*(Math.sqrt(1-e*e)-1)+t:r/2*(Math.sqrt(1-(e-=2)*e)+1)+t,[ge.easeInElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o)===1?t+r:(s||(s=o*.3),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),-(i*Math.pow(2,10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s))+t)},[ge.easeOutElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o)===1?t+r:(s||(s=o*.3),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),i*Math.pow(2,-10*e)*Math.sin((e*o-n)*(2*Math.PI)/s)+r+t)},[ge.easeInOutElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o/2)===2?t+r:(s||(s=o*(.3*1.5)),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),e<1?-.5*(i*Math.pow(2,10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s))+t:i*Math.pow(2,-10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s)*.5+r+t)},[ge.easeInBack]:(e,t,r,o,n=1.70158)=>r*(e/=o)*e*((n+1)*e-n)+t,[ge.easeOutBack]:(e,t,r,o,n=1.70158)=>r*((e=e/o-1)*e*((n+1)*e+n)+1)+t,easeInOutBack:(e,t,r,o,n=1.70158)=>(e/=o/2)<1?r/2*(e*e*(((n*=1.525)+1)*e-n))+t:r/2*((e-=2)*e*(((n*=1.525)+1)*e+n)+2)+t,[ge.easeInBounce]:(e,t,r,o)=>r-Wt[ge.easeOutBounce](o-e,0,r,o)+t,[ge.easeOutBounce]:(e,t,r,o)=>(e/=o)<1/2.75?r*(7.5625*e*e)+t:e<2/2.75?r*(7.5625*(e-=1.5/2.75)*e+.75)+t:e<2.5/2.75?r*(7.5625*(e-=2.25/2.75)*e+.9375)+t:r*(7.5625*(e-=2.625/2.75)*e+.984375)+t,[ge.easeInOutBounce]:(e,t,r,o)=>e<o/2?Wt[ge.easeInBounce](e*2,0,r,o)*.5+t:Wt[ge.easeOutBounce](e*2-o,0,r,o)*.5+r*.5+t};var mt=e=>e in Wt?Wt[e]:(Vo(e),Wt[he.get("tween").ease]);var vv=e=>e?e.replaceAll(/[\s#$()*+,.?[\\\]^{|}-]/g,String.raw`\$&`):"",fu=e=>/^[+-]?\d+(\.\d+)?$/.test(e),yv=e=>/^\d+\.\d+$|^\d+$/.test(e),De=(e,t)=>{let r=new RegExp(`^${vv(t)}$`,"i");return(e.match(r)||[]).length},sr=(e,t)=>{let r=new RegExp(`[0-9]${t}$`,"i");return(e.match(r)||[]).length},gu=(e,t)=>e.some(r=>{let o=new RegExp(`[0-9]${r}$`,"i");return(t.match(o)||[]).length}),bu=(e,t)=>e.some(r=>{let o=new RegExp(`^${vv(r)}$`,"i");return(t.match(o)||[]).length});var Tv=e=>e&&(De(e,b.PROP_VERTICAL)?b.PROP_VERTICAL:De(e,b.PROP_HORIZONTAL)?b.PROP_HORIZONTAL:De(e,b.PROP_ROTATE)?b.PROP_ROTATE:De(e,b.PROP_ROTATEY)?b.PROP_ROTATEY:De(e,b.PROP_ROTATEX)?b.PROP_ROTATEX:De(e,b.PROP_OPACITY)?b.PROP_OPACITY:De(e,b.PROP_SCALE)?b.PROP_SCALE:De(e,b.PROP_SCALE_X)?b.PROP_SCALE_X:De(e,b.PROP_SCALE_Y)?b.PROP_SCALE_Y:De(e,b.PROP_TWEEN)?b.PROP_TWEEN:e),_v=e=>{if(e){if(sr(e,b.PX))return b.PX;if(sr(e,b.VH))return b.VH;if(sr(e,b.VW))return b.VW}return""},Pa=e=>De(e,b.POSITION_TOP)?b.POSITION_TOP:De(e,b.POSITION_BOTTOM)?b.POSITION_BOTTOM:De(e,b.POSITION_LEFT)?b.POSITION_LEFT:De(e,b.POSITION_RIGHT)?b.POSITION_RIGHT:"",Sv=e=>sr(e,b.PX)?b.PX:sr(e,b.VH)?b.VH:sr(e,b.VW)?b.VW:sr(e,b.WPERCENT)?b.WPERCENT:sr(e,b.HPERCENT)?b.HPERCENT:sr(e,b.DEGREE)?b.DEGREE:b.PX;var jt=e=>u.checkType(Number,e)||u.checkType(Function,e)&&u.checkType(Number,e()),Aa=({start:e,end:t})=>{let r=u.checkType(Number,e),o=u.checkType(Number,t);return r||pb(e),o||mb(t),r&&o},ao=e=>{let t=u.checkType(Number,e);return!t&&e&&Rb(e),t?e:he.get("sequencer").duration},Oa=e=>{let t=u.checkType(Number,e);return!t&&e&&Nb(e),t&&e?e:1},xv=e=>{let t=e&&e in Wt;return!t&&e&&Vo(e),t?e:he.get("sequencer").ease},Cv=e=>{let t=e&&e in Wt;return!t&&e&&Vo(e),t?mt(e):mt(he.get("parallaxTween").ease)},Ev=(e,t)=>{let r=u.checkType(String,e),o=u.checkType(Number,t);return r||Ab(e),o||Ob(t),r&&o},wv=e=>{if(!e)return;let t=u.checkType(Number,e);return t||Ra(),t},Iv=e=>{if(!e)return;let r=[nr,"end",Mn,kn,Rn].includes(e),o=u.checkType(Number,e),n=u.checkType(Object,e),s=r||o||n;return s||kb(e),s},yu=e=>{if(!e)return;let t=u.checkType(Number,e);return t||Eb(e),t},Mv=e=>{if(!e)return;let r=[ka,"row","col"].includes(e);return r||Ib(),r},kv=e=>{if(!e)return;let t=u.checkType(Boolean,e);return t||wb(),t},Rv=(e=[])=>{let t=u.checkType(Array,[...e])&&e.length>0;return t||$b(),t},Pv=(e=[])=>u.checkType(Array,[...e])&&e.length>0?e:[],Nv=e=>{if(!e)return;let r=[Do,Fo,"end",Bo].includes(e);if(!r){Db();return}return r};var co=(e,t)=>{let r=u.checkType(Boolean,e);return!r&&e&&Bb(e,t),r?e:he.get(t).relative},$a=e=>{let t=e&&e in Wt;return!t&&e&&Vo(e),t?mt(e):mt(he.get("tween").ease)},La=e=>{let t=e&&e in Wt;return!t&&e&&Vo(e),t?e:he.get("tween").ease},Tu=e=>{let{config:t}=he.get("spring"),r=e&&e in t,o=r?t[e]:{},s=(r?u.checkType(Object,o)&&"tension"in o&&"mass"in o&&"friction"in o&&"velocity"in o&&"precision"in o:!1)?Object.values(o).every(i=>u.checkType(Number,i)&&i>=0):null;return!r&&e&&pu(e),!s&&r&&Cb(e),s?t[e]:t.default},Av=e=>{let{config:t}=he.get("spring"),r=e&&e in t;return!r&&e&&pu(e),r},_u=e=>{let t=u.checkType(Object,e)&&Object.values(e).every(r=>u.checkType(Number,r)&&r>=0);return!t&&e&&xb(),t?e:{}},Su=e=>{let r=u.checkType(Function,e)?e():e,o=u.checkType(Number,r);return!o&&e&&Pb(e),o?r:he.get("tween").duration},Rt=(e,t)=>{let r=u.checkType(Boolean,e);return!r&&e&&mu(e,t),r&&e===!0},de=(e,t,r)=>{let o=u.checkType(Boolean,e);return!o&&e&&mu(e,t),o?e:r},Da=(e,t,r)=>{let o=u.checkType(String,e);return!o&&e&&Vb(e,t),o?e:r},ir=(e,t,r)=>{let o=u.checkType(Number,e);return!o&&e&&Wb(e,t),o?e:r},ct=(e,t,r)=>{let o=u.checkType(Function,e);return!o&&e&&jb(e,t),o?e:r},Fa=e=>{let t=u.checkType(Number,e)&&e>0&&e<=1;return!t&&e&&zb(),t?e:he.get("lerp").velocity},Ba=e=>{let t=u.checkType(Number,e);return!t&&e&&Hb(),t?e:he.get("lerp").precision},Ov=(e,t)=>{let r=u.checkType(String,e);return!r&&e&&Ub(t),r},Bs=e=>{let t=u.checkType(Number,e);return!t&&e&&qb(),t?e:void 0},Vs=e=>{let t=e?.getType?.()&&(e.getType()==="LERP"||e.getType()==="SPRING"||e.getType()==="TWEEN");return!t&&e&&Gb(),t},$v=(e,t)=>{e===-1&&Jb(t)},lo=(e,t,r)=>{let o=u.checkType(Function,e);return!o&&e&&fv(r,e),o?e:t},Lv=e=>{let t=u.checkType(Function,e);return!t&&e&&Yb(e),t?e:({resolve:r})=>{r()}},Dv=e=>{let t=u.checkType(Array,e);return!t&&e&&gb(e),t},Fv=e=>{let t=u.checkType(String,e);return!t&&e&&bb(e),t},On=(e,t=!1)=>{let o=u.checkType(Element,e)?e:document.querySelector(e);return t?o??globalThis:o??document.createElement("div")},xu=e=>u.checkType(Element,e)?e:document.querySelector(e),Ws=(e,t)=>{if(!e)return b.DIRECTION_VERTICAL;let o=[b.DIRECTION_VERTICAL,b.DIRECTION_HORIZONTAL].includes(e);return!o&&e&&Xb(e,t),o?e:b.DIRECTION_VERTICAL},Cu=(e,t)=>{let r=[b.POSITION_TOP,b.POSITION_LEFT,b.POSITION_RIGHT,b.POSITION_BOTTOM],o=u.checkType(Object,e),n=o&&u.checkType(String,e?.position)&&r.includes(e.position),s=o&&u.checkType(Function,e.value)&&u.checkType(Number,e.value()),i=o&&n&&s;return i||Kb(t),i?e:null},Bv=e=>{let t=u.checkType(Function,e)&&u.checkType(Number,e?.());return!t&&e&&Qb(),t?e:void 0},Vv=e=>{let t=e?.getType?.()&&(e.getType()===b.TWEEN_TWEEN||e.getType()===b.TWEEN_TIMELINE);return!t&&e&&Zb(),t?e:{}},Wv=e=>{if(!e&&e!==0)return b.ALIGN_CENTER;let t=[b.ALIGN_START,b.ALIGN_TOP,b.ALIGN_RIGHT,b.ALIGN_CENTER,b.ALIGN_BOTTOM,b.ALIGN_LEFT,b.ALIGN_END],r=t.includes(e)||u.checkType(Number,e);return!r&&e&&ev(e,t),r?e:b.ALIGN_CENTER},jv=e=>{if(!e)return!1;let t=[b.IN_BACK,b.IN_STOP,b.OUT_BACK,b.OUT_STOP],r=t.includes(e);return!r&&e&&tv(e,t),r?e:!1},Eu=(e,t,r)=>{if(e==null)return r;let o=u.checkType(Number,e);return!o&&e&&rv(e,t),o?e:r},zv=e=>{if(!e)return b.TYPE_PARALLAX;let t=e?.toLowerCase(),r=[b.TYPE_PARALLAX,b.TYPE_SCROLLTRIGGER],o=r.includes(t);return!o&&t&&ov(t,r),o?t:b.TYPE_PARALLAX},Hv=(e,t)=>(()=>{if(t===b.TYPE_PARALLAX){let o=yv(e),n=u.checkType(Number,Number(e))&&o&&e>=0&&e<10;return!n&&e&&lv(e),n?10-e:10-he.get("parallax").defaultRange}else{let o=u.checkType(String,e);return!o&&e&&uv(e),o?e:"0px"}})(),Wo=(e,t,r)=>{let o=he.get("defaultMq").value;if(!e)return o;let n=he.get("mq"),s=Object.keys(n),i=u.checkType(String,e)&&s.includes(e);return!i&&e&&hu(e,s,t,r),i?e:o},jo=(e,t,r)=>{let o=he.get("defaultMq").type;if(!e)return o;let n=[sb,$s],s=u.checkType(String,e)&&n.includes(e);return!s&&e&&hu(e,n,t,r),s?e:o},Uv=(e,t,r,o)=>{if(!e&&o)return{propierties:b.PROP_VERTICAL,shouldTrackOnlyEvents:!0};if(!e&&r)return{propierties:b.PROP_VERTICAL,shouldTrackOnlyEvents:!1};let n=t===b.TYPE_SCROLLTRIGGER&&!e,s=[b.PROP_VERTICAL,b.PROP_HORIZONTAL,b.PROP_ROTATE,b.PROP_ROTATEY,b.PROP_ROTATEX,b.PROP_ROTATEZ,b.PROP_OPACITY,b.PROP_SCALE,b.PROP_SCALE_X,b.PROP_SCALE_Y,b.PROP_TWEEN],i=u.checkType(String,e);!i&&e&&nv(e,s);let a=t===b.TYPE_PARALLAX&&e===b.PROP_TWEEN&&!r;!r&&!o&&e===b.PROP_TWEEN&&hv(),(r||o)&&e!==b.PROP_TWEEN&&dv(),a&&pv();let c=a?b.PROP_VERTICAL:e,l=Tv(c);return{propierties:i?l??b.PROP_VERTICAL:b.PROP_VERTICAL,shouldTrackOnlyEvents:n}},Gv=e=>{if(!e)return b.EASE_LERP;let t=[b.EASE_SPRING,b.EASE_LERP],r=t.includes(e);r||sv(e,t);let o=r?e:b.EASE_LERP;return r?e:o},Va=(e,t)=>{let r=[b.EASE_SPRING,b.EASE_LERP],o=r.includes(e);return!o&&e&&iv(e,r,t),o?e:b.EASE_LERP},qv=(e,t)=>{let r=t===b.TYPE_PARALLAX?he.get("parallax").springConfig:he.get("scrollTrigger").springConfig;if(!e)return r;let o=he.get("spring").config,n=Object.keys(o),s=n.includes(e);return!s&&e&&cv(e,n),s?e:r},Jv=(e,t)=>{let r=u.checkType(Number,Number(e))&&e>0&&e<=1;!r&&e&&mv();let o=t===b.TYPE_PARALLAX?he.get("parallax").lerpConfig:he.get("scrollTrigger").lerpConfig;return r?e:o},Yv=(e,t)=>{let r=[b.PX,b.VW,b.VH,b.WPERCENT,b.HPERCENT];if(t===b.PROP_VERTICAL||t===b.PROP_HORIZONTAL){let n=gu(r,e);return n||du(e,t,r),n?e:"0px"}if(t===b.PROP_ROTATE||t===b.PROP_ROTATEX||t===b.PROP_ROTATEY||t===b.PROP_ROTATEZ){let n=gu([b.DEGREE],e);return n||du(e,t,[b.DEGREE]),n?e:"0"}if(t===b.PROP_SCALE||t===b.PROP_SCALE_X||t===b.PROP_SCALE_Y){let n=fu(e);return n||bv(e,t),n?e:"0"}let o=fu(e);return o||gv(t),o?e:"0"};var Wa=e=>{let{instantFps:t}=u.store.get(),r=Math.round(e*(t/60));return e===1&&r===0?e:r},Pt=e=>({type:Nv(e?.stagger?.type)?e.stagger.type:Pn.type,each:wv(e?.stagger?.each)?e.stagger.each:Pn.each,from:Iv(e?.stagger?.from)?e?.stagger?.from:Fo,grid:{col:yu(e?.stagger?.grid?.col)?e.stagger.grid.col:Pn.grid.col,row:yu(e?.stagger?.grid?.row)?e.stagger.grid.row:Pn.grid.row,direction:Mv(e?.stagger?.grid?.direction)?e.stagger.grid.direction:"col"},waitComplete:kv(e?.stagger?.waitComplete)?e.stagger.waitComplete:Pn.waitComplete}),ar=(e,t)=>e.length>t.length?e:t;var js=e=>e%2,Zw=e=>Math.floor(Math.random()*e),eI=(e,t,r)=>{let o=new Set(e.slice(0,r).map(i=>i.frame));return e.map((i,a)=>a*t).filter(i=>!o.has(i))},tI=(e,t,r,o=[])=>{let{from:n,each:s}=r,i=Wa(s);if(n===Rn)return{index:e,frame:o[Zw(o.length)]};if(n===nr)return{index:e,frame:e*i};if(n==="end")return{index:e,frame:(t-1-e)*i};if(n===Mn){let a=Math.trunc(t/2);return e>a?{index:e,frame:(e-a)*i}:e<a?js(t)===0&&a-e===1?{index:e,frame:0}:js(t)===0?{index:e,frame:(a-e-1)*i}:{index:e,frame:(a-e)*i}:{index:e,frame:0}}if(n===kn){let a=Math.trunc(t/2);return e>a?{index:e,frame:(t-a-1-(e-a))*i}:e<a?js(t)===0&&a-e===1?{index:e,frame:(a-1)*i}:js(t)===0?{index:e,frame:(t-a-(a-e))*i}:{index:e,frame:(t-a-1-(a-e))*i}:js(t)?{index:e,frame:a*i}:{index:e,frame:(a-1)*i}}if(n&&Pe(Number,n)){let a=n>=t?t-1:n;return e>a?{index:e,frame:(e-a)*s}:e<a?{index:e,frame:(a-e)*s}:{index:e,frame:0}}return{index:0,frame:0}},Xv=(e,t,r)=>{if(t.grid.direction==="row"){let o=Ds(e,r);return[...[...Array.from({length:t.grid.col}).keys()].reduce((s,i,a)=>[...s,...lb(o,a)],[])].flat()}else return e},Kv=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=r?.grid?.col<=1?e.length:r.grid.col,i=r?.grid?.row<=1?e.length:r.grid.row,c=Xv(e,r,s).map(v=>v&&v!==void 0?v:{index:0,frame:0}),p=Xv(t,r,s).map(v=>v&&v!==void 0?v:{index:0,frame:0}),h=r.grid.direction==="row"?i:s,f=Ds(c,h),d=f[0];return d.forEach((v,T)=>{let{index:S,frame:_}=tI(T,f[0].length,r,eI(d,r.each,T));v.index=S,v.frame=_,_>=o.frame&&(o={index:S,frame:_}),_<=n.frame&&(n={index:S,frame:_})}),f.forEach(v=>{v.forEach((T,S)=>{T&&(T.index=f[0][S].index,T.frame=f[0][S].frame)})}),f.flat().forEach((v,T)=>{c[T].index=v.index,c[T].frame=v.frame,p.length>0&&(p[T].index=v.index,p[T].frame=v.frame)}),{staggerArray:c,staggerArrayOnComplete:p,fastestStagger:n,slowlestStagger:o}};var rI=(e,t,r)=>e.reduce((o,n,s)=>{let i=Math.abs(s-r),a=n.reduce((c,l,p)=>p<t-i||p>t+i?c:[...c,l],[]);return[...o,a]},[]),oI=(e,t,r,o)=>e.reduce((n,s,i)=>{let a=Math.abs(i-r),c=[];if(i>=r&&i<=r*2)return[...n,c];let l=t-a,p=t+a;for(let f=0;f<a;f++)ja(o,r+f,l)&&c.push(o[r+f][l]),ja(o,r+f,p)&&c.push(o[r+f][p]),f>0&&(ja(o,r-f,l)&&c.push(o[r-f][l]),ja(o,r-f,p)&&c.push(o[r-f][p]));let h=c.filter(f=>f!=null);return[...n,h]},[]),ja=(e,t,r)=>e[t]!==void 0&&e[t][r]!==void 0,wu=(e,t)=>{let{col:r}=t.grid,{x:o,y:n}=t.from,s=Ds(e,r);[...Array.from({length:r}).keys()].forEach(()=>{s.push([])});let i=rI(s,o,n),a=oI(i,o,n,s),c=i.reduce((d,y,v)=>{let T=[...i[v],...a[v]];return d.push(T),d},[]),l=c.length;return{cleanArray:((n>=l/2?ub:uu)===uu?c.reduce((d,y,v)=>{if(v<n)return d;if(v===n){let T=[...c[v]];return d.push(T),d}else{let T=c[n-(v-n)]??[],S=[...c[v],...T];return d.push(S),d}},[]):c.reduce((d,y,v)=>{if(v>n)return d;if(v===n){let T=[...c[v]];return d.push(T),d}else{let T=c[n+(n-v)]??[],S=[...c[v],...T];return d.push(S),d}},[]).toReversed()).reduce((d,y)=>y.length===0?d:[...d,y],[])}};var nI=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{u.checkType(Object,r?.from)||(r.from={}),u.checkType(Number,r?.from?.x)||(r.from={...r.from,x:0}),u.checkType(Number,r?.from?.y)||(r.from={...r.from,y:0});let{cleanArray:s}=wu(e,r),i=0;s.forEach((p,h)=>{p.forEach(f=>{let d=Wa(r.each),y=h*d;f.index=i,f.frame=y,y>=o.frame&&(o={index:i,frame:y}),y<=n.frame&&(n={index:i,frame:y}),i++})});let a=(()=>{if(t.length>0){let{cleanArray:p}=wu(t,r);return p.flat()}else return[]})(),c=s.flat(),l=a.flat();return c.forEach((p,h)=>{l.length>0&&(l[h].index=p.index,l[h].frame=p.frame)}),{staggerArray:c,staggerArrayOnComplete:l,fastestStagger:n,slowlestStagger:o}},sI=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=[nr,"end",Mn,kn,Rn];return(!u.checkType(String,r?.from)&&!u.checkType(Number,r?.from)||u.checkType(String,r?.from)&&!s.includes(r?.from))&&(Mb(),r.from=nr),Kv({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})},Nt=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=r?.grid?.direction===ka?nI({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n}):sI({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n}),i=s.staggerArray,a=s.staggerArrayOnComplete,c=s.fastestStagger,l=s.slowlestStagger;return{staggerArray:i,staggerArrayOnComplete:a,fastestStagger:c,slowlestStagger:l}};var $n=({stagger:e,callback:t,callbackCache:r,callBackObject:o,useStagger:n})=>{if(e.each===0||!n){u.useFrame(()=>{t.forEach(({cb:s})=>{s(o)})}),u.useFrame(()=>{r.forEach(({cb:s})=>{u.useCache.fireObject({id:s,obj:o})})});return}t.forEach(({cb:s,frame:i})=>{u.useFrameIndex(()=>{s(o)},i)}),r.forEach(({cb:s,frame:i})=>{u.useCache.update({id:s,callBackObject:o,frame:i})})},Ln=({onComplete:e,callback:t,callbackCache:r,callbackOnComplete:o,callBackObject:n,stagger:s,slowlestStagger:i,fastestStagger:a,useStagger:c})=>{if(s.each===0||!c){e(),u.useNextFrame(()=>{t.forEach(({cb:l})=>{l(n)}),r.forEach(({cb:l})=>{u.useCache.fireObject({id:l,obj:n})}),o.forEach(({cb:l})=>{l(n)})});return}t.forEach(({cb:l,frame:p},h)=>{u.useFrameIndex(()=>{if(s.waitComplete){h===i.index&&(l(n),e());return}h===a.index&&(l(n),e())},p)}),r.forEach(({cb:l,frame:p},h)=>{u.useFrameIndex(()=>{if(s.waitComplete){h===i.index&&(u.useCache.fireObject({id:l,obj:n}),e());return}h===a.index&&(u.useCache.fireObject({id:l,obj:n}),e())},p)}),o.forEach(({cb:l,frame:p})=>{u.useFrameIndex(()=>{l(n)},p+1)})};var lt=(e,t)=>{let r=u.getUnivoqueId();return{arrayOfCallbackUpdated:[...t,{cb:e,id:r,index:-1,frame:-1}],unsubscribeCb:o=>o.map(({id:n,cb:s,index:i,frame:a})=>n===r?{id:n,cb:()=>{},index:i,frame:a}:{id:n,cb:s,index:i,frame:a})}},cr=(e,t,r)=>{let o=u.getUnivoqueId(),{id:n,unsubscribe:s}=u.useCache.add(e);return{arrayOfCallbackUpdated:[...t,{cb:n,id:o,index:-1,frame:-1}],unsubscribeCache:[...r,s],unsubscribeCb:i=>(s(),i.map(({id:a,cb:c,index:l,frame:p})=>a===o?{id:a,cb:"",index:l,frame:p}:{id:a,cb:c,index:l,frame:p}))}};var uo=e=>Object.keys(e).map(t=>{if(!jt(e[t]))return kr(`${t}: ${e[t]}`),{prop:t,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let r=u.checkType(Number,e[t])?e[t]:e[t]?.()??0;return{prop:t,toValue:r,toFn:e[t],toIsFn:u.checkType(Function,e[t]),settled:!1}}),Dn=e=>Object.keys(e).map(t=>{if(!jt(e[t]))return kr(`${t}: ${e[t]}`),{prop:t,fromValue:0,currentValue:0,fromFn:()=>0,fromIsFn:!1,settled:!1};let r=u.checkType(Number,e[t])?e[t]:e[t]?.()??0;return{prop:t,fromValue:r,currentValue:r,fromFn:e[t],fromIsFn:u.checkType(Function,e[t]),settled:!1}}),Fn=(e,t)=>Object.keys(e).map(r=>{if(!jt(t[r])||!jt(e[r]))return kr(`${r}: ${t[r]} || ${r}: ${e[r]}`),{prop:r,fromValue:0,fromFn:()=>0,fromIsFn:!1,currentValue:0,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let o=u.checkType(Number,e[r])?e[r]:e[r]?.()??0,n=u.checkType(Number,t[r])?t[r]:t[r]?.()??0;return{prop:r,fromValue:o,fromFn:e[r],fromIsFn:u.checkType(Function,e[r]),currentValue:o,toValue:n,toFn:t[r],toIsFn:u.checkType(Function,t[r]),settled:!1}}),Rr=e=>Object.keys(e).map(t=>{if(!jt(e[t]))return kr(`${t}: ${e[t]}`),{prop:t,fromValue:0,fromFn:()=>0,fromIsFn:!1,currentValue:0,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let r=u.checkType(Number,e[t])?e[t]:e[t]?.()??0;return{prop:t,fromValue:r,fromFn:e[t],fromIsFn:u.checkType(Function,e[t]),currentValue:r,toValue:r,toFn:e[t],toIsFn:u.checkType(Function,e[t]),settled:!1}});var Bn=({validationFunction:e,defaultRafInit:t})=>{u.useFrame(()=>{u.useNextTick(({time:r,fps:o})=>{let n=e.findLast(({validation:s})=>s());if(t(r,o),n){n?.callback(),console.log("custom tween run function extrecuted");return}})})};var po=(e,t)=>{console.log(`stagger on ${e} loaded at: ${t} fps`)};var Vn=(e,t,r,o)=>(u.checkType(Number,e)||Ra(),e>0&&t&&(r.length>0||o.length>0));var za=e=>{u.useFrame(()=>{u.useNextTick(({time:t,fps:r})=>{e(t,r)})})};var Fe=(e,t)=>Object.fromEntries(e.map(r=>{let o=r[t];return[r.prop,typeof o=="number"?o:Number.parseFloat(o)]})),Wn=e=>e.map(t=>t.toIsFn?{[t.prop]:t.toFn}:{[t.prop]:Number.parseFloat(t.toValue)}).reduce((t,r)=>({...t,...r}),{}),jn=e=>e.map(t=>t.fromIsFn?{[t.prop]:t.fromFn}:{[t.prop]:Number.parseFloat(t.fromValue)}).reduce((t,r)=>({...t,...r}),{});var zn=(e,t)=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o}:r}),Iu=(e,t)=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o,shouldUpdate:!0}:{...r,shouldUpdate:!1}});var Qv=({values:e,tension:t,friction:r,mass:o,precision:n,fps:s})=>e.map(i=>{let{currentValue:a,toValue:c,velocity:l}=i,p=-t*(a-c),h=-r*l,f=(p+h)/o,d=l+f*1/s,y=a+d*1/s,v=_e(y),T=Math.abs(d)<=.1,S=t===0?!0:Math.abs(c-v)<=n;return T&&S?{...i,currentValue:c,velocity:d,settled:!0}:{...i,currentValue:v,velocity:d,settled:!1}});var Tt=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#y;#v;#T;#k;constructor(t){this.#n=Pt(t??{}),this.#t=co(t?.relative,"spring"),this.#i=Tu(t?.config),this.updateConfigProp(t?.configProps??{}),this.#l=u.getUnivoqueId(),this.#h=!1,this.#u=void 0,this.#s=void 0,this.#c=void 0,this.#o=[],this.#e=[],this.#p=[],this.#a=[],this.#d=[],this.#f=[],this.#r=[],this.#g=!1,this.#m=!0,this.#C=!0,this.#x=!1,this.#y=!1,this.#v={reverse:!1,configProps:this.#i,relative:this.#t,immediate:!1},this.#T=Xe,this.#k=Xe;let r=t?.data;r&&this.setData(r)}#_(t,r,o,n,s,i){this.#h=!0,this.#o=Qv({values:this.#o,tension:o,friction:n,mass:s,precision:i,fps:r});let a=Fe(this.#o,"currentValue");if(this.#g||$n({stagger:this.#n,callback:this.#p,callbackCache:this.#a,callBackObject:a,useStagger:this.#C}),this.#o.every(l=>l.settled===!0)){let l=()=>{for(let h of this.#o)h.fromValue=h.toValue;this.#u?.(!0),this.#c=void 0,this.#s=void 0,this.#u=void 0,this.#g=!1,this.#h=!1},p=Fe(this.#o,"toValue");Ln({onComplete:l,callback:this.#p,callbackCache:this.#a,callbackOnComplete:this.#d,callBackObject:p,stagger:this.#n,slowlestStagger:this.#T,fastestStagger:this.#k,useStagger:this.#C});return}u.useFrame(()=>{u.useNextTick(({time:l,fps:p})=>{this.#h&&this.#_(l,p,o,n,s,i)})})}#w(t,r){for(let a of this.#o)a.velocity=Math.trunc(this.#i.velocity);let o=this.#i.tension,n=this.#i.friction,s=Math.max(1,this.#i.mass),i=this.#i.precision;this.#_(t,r,o,n,s,i)}async#N(){if(Vn(this.#n.each,this.#m,this.#a,this.#p)){let{averageFPS:t}=await u.useFps();po("spring",t);let r=ar(this.#a,this.#p);if(this.#n.grid.col>r.length){kt(r.length),this.#m=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=Nt({arrayDefault:r,arrayOnStop:this.#d,stagger:this.#n,slowlestStagger:this.#T,fastestStagger:this.#k});this.#a.length>this.#p.length?this.#a=o:this.#p=o,this.#d=n,this.#T=i,this.#k=s,this.#m=!1}return{ready:!0}}async#R(t,r){this.#y||(this.#u=t,this.#s=r,this.#m&&(this.#y=!0,await this.#N(),this.#y=!1),Bn({validationFunction:this.#f,defaultRafInit:(o,n)=>this.#w(o,n)}))}clearCurretPromise(){this.#g||(this.#s?.(u.ANIMATION_STOP_REJECT),this.#c=void 0,this.#s=void 0,this.#u=void 0,this.#h=!1)}stop({clearCache:t=!0,updateValues:r=!0}={}){this.#g&&(this.#g=!1),r&&(this.#o=wn(this.#o)),this.unFreezeStagger(),t&&this.#a.forEach(({cb:o})=>u.useCache.clean(o)),this.#s&&(this.#s(u.ANIMATION_STOP_REJECT),this.#c=void 0,this.#s=void 0,this.#u=void 0),this.#h=!1}freezeStagger(){this.#x||(this.#a.forEach(({cb:t})=>u.useCache.freeze(t)),this.#x=!0)}unFreezeStagger({updateFrame:t=!0}={}){this.#x&&(this.#a.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:t})),this.#x=!1)}pause(){this.#g||(this.#g=!0,this.#h=!1,this.#o=Ma(this.#o),this.freezeStagger())}resume(){this.#g&&(this.#g=!1,this.unFreezeStagger(),!this.#h&&this.#u&&za((t,r)=>this.#w(t,r)))}setData(t){this.#o=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,fromValue:n,velocity:this.#i.velocity,currentValue:n,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#e=this.#o.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#o=at(this.#o,this.#e)}#O(t){let o=he.get("spring").config,n=Av(t?.config)?o?.[t?.config??"default"]??Lo.default:this.#v.configProps,s=_u(t?.configProps),i={...n,...s},a={reverse:t?.reverse??this.#v.reverse,relative:t?.relative??this.#v.relative,immediate:t?.immediate??this.#v.immediate,configProps:i},{relative:c}=a;return this.#i=i,this.#t=c,a}goTo(t,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#C=!0;let o=uo(t);return this.#E(o,t,r)}goFrom(t,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#C=!0;let o=Dn(t);return this.#E(o,t,r)}goFromTo(t,r,o={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);if(this.#C=!0,!so(t,r))return io("spring goFromTo:",t,r),new Promise(s=>s);let n=Fn(t,r);return this.#E(n,t,o)}set(t,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#C=!1;let o=Rr(t);return this.#E(o,t,r)}setImmediate(t,r={}){if(this.#h&&this.stop({clearCache:!1,updateValues:!1}),this.#g)return;this.#C=!1;let o=Rr(t);this.#o=zn(o,this.#o);let{reverse:n}=this.#O(r??{});Rt(n,"reverse")&&(this.#o=Ir(t,this.#o)),this.#o=In(this.#o,this.#t),this.#o=wr(this.#o)}#E(t,r,o={}){this.#o=zn(t,this.#o);let{reverse:n,immediate:s}=this.#O(o);if(Rt(n,"reverse")&&(this.#o=Ir(r,this.#o)),this.#o=In(this.#o,this.#t),Rt(s,"immediate "))return this.#h&&this.stop({updateValues:!1}),this.#o=wr(this.#o),Promise.resolve();let i=!this.#h&&!this.#c;return i&&(this.#c=new Promise((a,c)=>{this.#R(a,c)})),i&&this.#c?this.#c:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return Fe(this.#o,"currentValue")}getInitialData(){return Fe(this.#e,"currentValue")}getFrom(){return Fe(this.#o,"fromValue")}getTo(){return Fe(this.#o,"toValue")}getFromNativeType(){return jn(this.#o)}getToNativeType(){return Wn(this.#o)}getType(){return"SPRING"}getId(){return this.#l}isActive(){return this.#h}updateConfigProp(t={}){let r=_u(t);this.#i={...this.#i,...r},this.#v=at(this.#v,{configProps:r})}updateConfig(t){this.#i=Tu(t),this.#v=at(this.#v,{configProps:this.#i})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=lt(t,this.#p);return this.#p=r,()=>this.#p=o(this.#p)}subscribeCache(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=cr(t,this.#a,this.#r);return this.#a=r,this.#r=n,()=>this.#a=o(this.#a)}validateInitialization({validation:t,callback:r}){let o=[...this.#f,{validation:t,callback:r}];return this.#f=o,()=>this.#f=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=lt(t,this.#d);return this.#d=r,()=>this.#d=o(this.#d)}destroy(){this.#c&&this.stop(),this.#d=[],this.#f=[],this.#p=[],this.#a=[],this.#o=[],this.#c=void 0,this.#r.forEach(t=>t()),this.#r=[]}};var Ha=0,Ua=0,zs=0,Gs=!1,qa=0,Ja=0,Hn=2,iI=.6,aI=60,Pr=Hn,cI=.3,Ga=!1,Hs=null,lI=200,Mu=()=>{},ku=()=>{},Ru=()=>{},lr,Us=new Map,uI=e=>{if(e<=1)return Hn;let t=Math.exp((e-1)*iI);return Math.min(Hn*t,aI)},pI=({clientX:e,clientY:t})=>{if(!lr)return;let r=e-Ha,o=t-Ua,n=u.getTime(),s=n-zs;if(Gs||s===0){Ha=e,Ua=t,zs=n,Pr=Hn,lr.goTo({speed:1,speedX:1,speedY:1});return}let i=r/s,a=o/s,c=Math.hypot(i,a),l=uI(c);l>Pr?Pr=l:Pr+=(l-Pr)*cI,Math.abs(r)>Pr&&(qa=Math.sign(r)),Math.abs(o)>Pr&&(Ja=Math.sign(o)),lr.goTo({speed:Math.max(1,Math.round((c+1)*1e4)/1e4),speedX:Math.max(1,Math.round((i+1)*1e4)/1e4),speedY:Math.max(1,Math.round((a+1)*1e4)/1e4)}),Ha=e,Ua=t,zs=n},ey=()=>{Mu=u.usePointerMove(()=>{Mu(),zs=u.getTime(),Gs=!0})},ty=()=>{Ru=u.usePointerMove(e=>{pI(e),Gs&&(Gs=!1)})},Zv=()=>{Hs&&(clearTimeout(Hs),Hs=null)},mI=()=>{lr&&(lr.goTo({speed:1,speedX:1,speedY:1}),qa=0,Ja=0,Pr=Hn,Ru(),ku(),ey(),ty(),ry())},ry=()=>{Zv();let e=()=>{Zv(),Hs=setTimeout(()=>{Hs=null,mI()},lI)};ku=u.usePointerMove(e)},hI=()=>{Ga||(Ga=!0,ey(),ty(),ry(),lr=new Tt({data:{speed:1,speedX:1,speedY:1}}),lr.subscribe(({speed:e,speedX:t,speedY:r})=>{u.useNextTick(()=>{for(let o of Us.values())o({speed:e,speedX:t,speedY:r,directionX:qa,directionY:Ja})})}),lr.onComplete(({speed:e,speedX:t,speedY:r})=>{u.useNextTick(()=>{for(let o of Us.values())o({speed:e,speedX:t,speedY:r,directionX:0,directionY:0})})}))},dI=e=>{if(globalThis.window===void 0)return()=>{};let t=we();return Us.set(t,e),hI(),()=>{Us.delete(t),Us.size===0&&Ga&&(Mu(),ku(),Ru(),lr.destroy(),lr=null,Ga=!1,Ha=0,Ua=0,zs=0,Gs=!1,qa=0,Ja=0,Pr=Hn)}},oy=dI;function fI(e){he.set(e)}function gI(e){return he.get(e)}function bI(){he.print()}function vI(e=()=>{}){return oy(e)}function yI(e,t){switch(e){case"min":return ve.min(t);case"max":return ve.max(t);case"get":return ve.getBreackpoint(t)}}var H={};So(H,{createLerp:()=>MI,createMasterSequencer:()=>CI,createScrollerTween:()=>SI,createSequencer:()=>xI,createSpring:()=>II,createStaggers:()=>EI,createTimeTween:()=>wI});var ny=({values:e,fps:t,velocity:r,precision:o})=>e.map(n=>{if(n.settled)return n;let{currentValue:s,toValue:i}=n,a=cb(s,i,r/t*60),c=_e(a);return Math.round(Math.abs(i-c)*1e4)/1e4<=o?{...n,currentValue:i,settled:!0}:{...n,currentValue:c,settled:!1}});var Nr=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#y;#v;#T;#k;#_;constructor(t){this.#n=Pt(t??{}),this.#t=co(t?.relative,"lerp"),this.#i=Fa(t?.velocity),this.#l=Ba(t?.precision),this.#h=u.getUnivoqueId(),this.#u=!1,this.#s=void 0,this.#c=void 0,this.#o=void 0,this.#e=[],this.#p=[],this.#a=[],this.#d=[],this.#f=[],this.#r=[],this.#g=[],this.#m=!1,this.#C=!0,this.#x=!0,this.#y=!1,this.#v=!1,this.#T={reverse:!1,velocity:this.#i,precision:this.#l,relative:this.#t,immediate:!1},this.#k=Xe,this.#_=Xe;let r=t?.data;r&&this.setData(r)}#w(t,r){this.#u=!0,this.#e=ny({values:this.#e,fps:r,velocity:this.#i,precision:this.#l});let o=Fe(this.#e,"currentValue");if(this.#m||$n({stagger:this.#n,callback:this.#a,callbackCache:this.#d,callBackObject:o,useStagger:this.#x}),this.#e.every(s=>s.settled===!0)){let s=()=>{this.#u=!1;for(let a of this.#e)a.fromValue=a.toValue;this.#s?.(!0),this.#o=void 0,this.#c=void 0,this.#s=void 0,this.#m=!1,this.#u=!1},i=Fe(this.#e,"toValue");Ln({onComplete:s,callback:this.#a,callbackCache:this.#d,callbackOnComplete:this.#f,callBackObject:i,stagger:this.#n,slowlestStagger:this.#k,fastestStagger:this.#_,useStagger:this.#x});return}u.useFrame(()=>{u.useNextTick(({time:s,fps:i})=>{this.#u&&this.#w(s,i)})})}#N(t,r){this.#w(t,r)}async#R(){if(Vn(this.#n.each,this.#C,this.#d,this.#a)){let{averageFPS:t}=await u.useFps();po("lerp",t);let r=ar(this.#d,this.#a);if(this.#n.grid.col>r.length){kt(r.length),this.#C=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=Nt({arrayDefault:r,arrayOnStop:this.#f,stagger:this.#n,slowlestStagger:this.#k,fastestStagger:this.#_});this.#d.length>this.#a.length?this.#d=o:this.#a=o,this.#f=n,this.#k=i,this.#_=s,this.#C=!1}return{ready:!0}}async#O(t,r){this.#v||(this.#s=t,this.#c=r,this.#C&&(this.#v=!0,await this.#R(),this.#v=!1),Bn({validationFunction:this.#r,defaultRafInit:(o,n)=>this.#N(o,n)}))}clearCurretPromise(){this.#m||(this.#c?.(u.ANIMATION_STOP_REJECT),this.#o=void 0,this.#c=void 0,this.#s=void 0,this.#u=!1)}stop({clearCache:t=!0,updateValues:r=!0}={}){this.#m&&(this.#m=!1),r&&(this.#e=wn(this.#e)),this.unFreezeStagger(),t&&this.#d.forEach(({cb:o})=>u.useCache.clean(o)),this.#c&&(this.#c(u.ANIMATION_STOP_REJECT),this.#o=void 0,this.#c=void 0,this.#s=void 0),this.#u=!1}freezeStagger(){this.#y||(this.#d.forEach(({cb:t})=>u.useCache.freeze(t)),this.#y=!0)}unFreezeStagger({updateFrame:t=!0}={}){this.#y&&(this.#d.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:t})),this.#y=!1)}pause(){this.#m||(this.#m=!0,this.#u=!1,this.#e=Ma(this.#e),this.freezeStagger())}resume(){this.#m&&(this.#m=!1,this.unFreezeStagger(),!this.#u&&this.#s&&za((t,r)=>this.#N(t,r)))}setData(t){this.#e=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,fromValue:n,currentValue:n,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#p=this.#e.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#e=at(this.#e,this.#p)}#E(t){let r={...this.#T,...t},{velocity:o,precision:n,relative:s}=r;return this.#t=co(s,"lerp"),this.#i=Fa(o),this.#l=Ba(n),r}goTo(t,r={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!0;let o=uo(t);return this.#A(o,t,r)}goFrom(t,r={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!0;let o=Dn(t);return this.#A(o,t,r)}goFromTo(t,r,o={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);if(this.#x=!0,!so(t,r))return io("lerp goFromTo:",t,r),new Promise(s=>s);let n=Fn(t,r);return this.#A(n,t,o)}set(t,r={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!1;let o=Rr(t);return this.#A(o,t,r)}setImmediate(t,r={}){if(this.#u&&this.stop({clearCache:!1,updateValues:!1}),this.#m)return;this.#x=!1;let o=Rr(t);this.#e=zn(o,this.#e);let{reverse:n}=this.#E(r??{});Rt(n,"reverse")&&(this.#e=Ir(t,this.#e)),this.#e=In(this.#e,this.#t),this.#e=wr(this.#e)}#A(t,r,o={}){this.#e=zn(t,this.#e);let{reverse:n,immediate:s}=this.#E(o??{});if(Rt(n,"reverse")&&(this.#e=Ir(r,this.#e)),this.#e=In(this.#e,this.#t),Rt(s,"immediate "))return this.#u&&this.stop({updateValues:!1}),this.#e=wr(this.#e),Promise.resolve();let i=!this.#u&&!this.#o;return i&&(this.#o=new Promise((a,c)=>{this.#O(a,c)})),i&&this.#o?this.#o:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return Fe(this.#e,"currentValue")}getInitialData(){return Fe(this.#p,"currentValue")}getFrom(){return Fe(this.#e,"fromValue")}getTo(){return Fe(this.#e,"toValue")}getFromNativeType(){return jn(this.#e)}getToNativeType(){return Wn(this.#e)}getType(){return"LERP"}getId(){return this.#h}isActive(){return this.#u}updateVelocity(t){this.#i=Fa(t),this.#T=at(this.#T,{velocity:this.#i})}updatePrecision(t){this.#i=Ba(t),this.#T=at(this.#T,{precision:this.#l})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=lt(t,this.#a);return this.#a=r,()=>this.#a=o(this.#a)}subscribeCache(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=cr(t,this.#d,this.#g);return this.#d=r,this.#g=n,()=>this.#d=o(this.#d)}validateInitialization({validation:t,callback:r}){let o=[...this.#r,{validation:t,callback:r}];return this.#r=o,()=>this.#r=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=lt(t,this.#f);return this.#f=r,()=>this.#f=o(this.#f)}destroy(){this.#o&&this.stop(),this.#f=[],this.#r=[],this.#a=[],this.#d=[],this.#e=[],this.#o=void 0,this.#g.forEach(t=>t()),this.#g=[]}};var Ya=({each:e,useStagger:t,isLastDraw:r,callBackObject:o,callback:n,callbackCache:s,callbackOnStop:i})=>{e===0||t===!1?(u.useFrame(()=>{n.forEach(({cb:a})=>a(o))}),u.useFrame(()=>{s.forEach(({cb:a})=>{u.useCache.fireObject({id:a,obj:o})})})):(n.forEach(({cb:a,frame:c})=>{u.useFrameIndex(()=>a(o),c)}),s.forEach(({cb:a,frame:c})=>{u.useCache.update({id:a,callBackObject:o,frame:c})})),r&&(e===0||t===!1?u.useFrame(()=>{i.forEach(({cb:a})=>a(o))}):i.forEach(({cb:a,frame:c})=>{u.useFrameIndex(()=>a(o),c+1)}))};var qs=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;constructor(t){this.#n=Cv(t?.ease),this.#t=ao(t?.duration),this.#i=Pt(t),this.#l=[],this.#h=[],this.#u=[],this.#s=[],this.#c=[],this.#o="parallaxTween";let r=t?.from||null;r&&this.setData(r),t?.to&&this.goTo(t.to)}inzializeStagger(){if(this.#i.each>0&&(this.#s.length>0||this.#u.length>0)){let t=ar(this.#s,this.#u);if(this.#i.grid.col>t.length){kt(t.length);return}let{staggerArray:r,staggerArrayOnComplete:o}=Nt({arrayDefault:t,arrayOnStop:this.#h,stagger:this.#i,slowlestStagger:Xe,fastestStagger:Xe});this.#s.length>this.#u.length?this.#s=r:this.#u=r,this.#h=o}}draw({partial:t,isLastDraw:r}){for(let n of this.#l){let{toIsFn:s,toFn:i,toValue:a,fromIsFn:c,fromFn:l,fromValue:p}=n,h=s?i():a,f=c?l():p,d=h-f,y=this.#n(t,f,d,this.#t);n.currentValue=_e(y)}let o=Fe(this.#l,"currentValue");u.useNextTick(()=>{Ya({each:this.#i.each,useStagger:!0,isLastDraw:r,callBackObject:o,callback:this.#u,callbackCache:this.#s,callbackOnStop:this.#h})})}setData(t){let r=Object.entries(t);return this.#l=r.map(o=>{let[n,s]=o;return{prop:n,toValue:s,toValProcessed:s,fromValue:s,currentValue:s,settled:!1,fromFn:()=>0,toFn:()=>0}}),this}#e(t){this.#l=this.#l.map(r=>{let o=t.find(n=>n.prop===r.prop);return o?{...r,...o}:{...r}})}goTo(t){let r=uo(t);return this.#e(r),this}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=lt(t,this.#u);return this.#u=r,()=>this.#u=o(this.#u)}onStop(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=lt(t,this.#h);return this.#h=r,()=>this.#h=o(this.#h)}subscribeCache(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=cr(t,this.#s,this.#c);return this.#s=r,this.#c=n,()=>this.#s=o(this.#s)}getDuration(){return this.#t}getType(){return this.#o}destroy(){this.#l=[],this.#h=[],this.#u=[],this.#s=[],this.#c.forEach(t=>t()),this.#c=[]}};var Js=class{#n="sequencer";#t;constructor(){this.#t=[]}draw({partial:t,isLastDraw:r,useFrame:o}){this.#t.forEach(n=>{n.draw({partial:t,isLastDraw:r,useFrame:o})})}add(t){this.#t.push(t)}inzializeStagger(){this.#t.forEach(t=>{t.inzializeStagger()})}setDuration(t){this.#t.forEach(r=>{r.setDuration(t)})}getDuration(){return this.#t.length>0?this.#t[0].getDuration():0}setStretchFactor(t){this.#t.forEach(r=>{r.setStretchFactor(t)})}getLabels(){return this.#t.flatMap(t=>t.getLabels())}resetLastValue(){this.#t.forEach(t=>t.resetLastValue())}disableStagger(){this.#t.forEach(t=>{t.disableStagger()})}cleanCachedId(){this.#t.forEach(t=>{t.cleanCachedId()})}freezeCachedId(){this.#t.forEach(t=>{t.freezeCachedId()})}unFreezeCachedId(){this.#t.forEach(t=>{t.unFreezeCachedId()})}getType(){return this.#n}destroy(){this.#t.forEach(t=>{t.destroy()}),this.#t=[]}};var sy=(e,t)=>Object.keys(e).map(r=>jt(e[r])?{prop:r,toValue:e[r],ease:mt(t)}:(kr(`${r}: ${e[r]}`),{prop:r,toValue:0,ease:mt(t)})),iy=(e,t)=>Object.keys(e).map(r=>jt(e[r])?{prop:r,fromValue:e[r],ease:mt(t)}:(kr(`${r}: ${e[r]}`),{prop:r,fromValue:0,ease:mt(t)})),ay=(e,t,r)=>Object.keys(e).map(o=>!jt(t[o])||!jt(e[o])?(kr(`${o}: ${t[o]} || ${o}: ${e[o]}`),{prop:o,fromValue:0,toValue:0,ease:mt(r)}):{prop:o,fromValue:e[o],toValue:t[o],ease:mt(r)});var We={BACKWARD:"backward",FORWARD:"forward",NONE:"none"};var Pu={fromValue:{get:"toValue",set:"fromValue"},toValue:{get:"toValue",set:"toValue"}},cy=(e,t,r,o)=>e.slice(0,t).reduceRight((n,{values:s})=>{let i=s.find(({prop:a,active:c})=>c&&a===r);return i&&!n&&n!==0?i[Pu[o].get]:n},void 0),ly=(e,t,r,o)=>{for(let n=t+1;n<e.length;n++){let{start:s,values:i}=e[n];for(let a of i)if(a.prop===r&&a.active&&s<=o)return!1}return!0};var uy=({timeline:e,valuesState:t,partial:r})=>{for(let o of t){o.settled=!1;let n=null;for(let T=0;T<e.length;T++){let{start:S,end:_,values:E}=e[T],x=null;for(let N of E)if(N.prop===o.prop){x=N;break}if(!x||!x.active)continue;let{prop:w}=x;if(ly(e,T,w,r)){n={toValue:x.toValue,fromValue:x.fromValue,start:S,end:_,ease:x.ease};break}}if(!n)continue;let{start:s,end:i,toValue:a,fromValue:c,ease:l}=n,p=u.checkType(Number,a)?a:a(),h=u.checkType(Number,c)?c:c(),f=i-s,d=r<i?h:p,y;r>=s&&r<=i?y=l(r-s,h,p-h,f):y=d;let v=Number.isNaN(y)?d:y;o.currentValue=_e(v),o.settled=!0}return t};var Nu=({timeline:e,activeProp:t})=>e.map((r,o)=>{let{values:n,propToFind:s}=r,i=n.map(a=>{let{prop:c,active:l}=a;if(!l||!t.includes(c)||!s||s.length===0)return a;let p=cy(e,o,c,s);return!p&&p!==0?a:{...a,[Pu[s].set]:p}});return{...r,values:i}});var Au=(e,t)=>e.toSorted((r,o)=>r?.[t]-o?.[t]);var Xa=({timeline:e,values:t,start:r,end:o,duration:n,propToFind:s})=>{let i=e.length===0?0:1,a=[...e,{values:t,start:r??0,end:o??n,priority:i,propToFind:s}],c=Au(a,"start");return Au(c,"priority")};var Ka=({data:e,values:t})=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o,active:!0}:{prop:r.prop,active:!1}});var Ys=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;constructor(t){this.#n=[],this.#t=[],this.#i=[],this.#l=[],this.#h=[],this.#u=[],this.#s=[],this.#c=[],this.#o=ao(t?.duration),this.#e="sequencer",this.#p={start:0,end:this.#o,ease:xv(t?.ease)},this.#a=!0,this.#d=!0,this.#f="none",this.#r=0,this.#g=Pt(t),this.#m=!0,this.#C=!1;let r=t?.data||null;r&&this.setData(r)}inzializeStagger(){if(!this.#C){if(this.#g.each>0&&(this.#h.length>0||this.#l.length>0)){let t=ar(this.#h,this.#l);if(this.#g.grid.col>t.length){kt(t.length);return}let{staggerArray:r,staggerArrayOnComplete:o}=Nt({arrayDefault:t,arrayOnStop:this.#u,stagger:this.#g,slowlestStagger:Xe,fastestStagger:Xe});this.#h.length>this.#l.length?this.#h=r:this.#l=r,this.#u=o}this.#C=!0}}draw({partial:t=0,isLastDraw:r=!1,useFrame:o=!1,direction:n=We.NONE}){if(o){this.#x({partial:t,isLastDraw:r,direction:n});return}u.useNextTick(()=>this.#x({partial:t,isLastDraw:r,direction:n}))}#x({partial:t=0,isLastDraw:r=!1,direction:o=We.NONE}){this.#a&&(this.#r=t,this.#y(t)),!this.#a&&this.#r&&(!o||o===We.NONE)&&(this.#f=t>=this.#r?We.FORWARD:We.BACKWARD),!this.#a&&(o===We.BACKWARD||o===We.FORWARD)&&(this.#f=o),this.#n=uy({timeline:this.#t,valuesState:this.#n,partial:t});let n=Fe(this.#n,"currentValue");Ya({each:this.#g.each,useStagger:this.#m,isLastDraw:r,callBackObject:n,callback:this.#l,callbackCache:this.#h,callbackOnStop:this.#u}),this.#v(t),this.#m=!0,this.#r=t,this.#a=!1}resetLastValue(){this.#a=!0,this.#r=0}#y(t=0){this.#d&&(this.#s.forEach(({fn:r,time:o})=>{let n={shouldFire:t>=o,direction:We.FORWARD},s={shouldFire:t<=o,direction:We.BACKWARD};if(!(n.shouldFire||s.shouldFire))return;let a=n.shouldFire?n.direction:s.direction;r({direction:a,value:t,isForced:!0})}),this.#d=!1)}#v(t=0){this.#s.forEach(({fn:r,time:o})=>{let n=this.#f===We.FORWARD&&t>o&&this.#r<=o,s=this.#f===We.BACKWARD&&t<o&&this.#r>=o;(n||s)&&r({direction:this.#f,value:t,isForced:!1})})}setStretchFactor(t=0){let r=t/this.#o;this.#t=[...this.#t].map(o=>{let{start:n,end:s}=o;return{...o,start:_e(n*r),end:_e(s*r)}}),this.#i=[...this.#i].map(o=>{let{time:n}=o;return{...o,time:_e(n*r)}}),this.#s=[...this.#s].map(o=>{let{time:n}=o;return{...o,time:_e(n*r)}})}setData(t={}){return this.#n=Object.entries(t).map(r=>{let[o,n]=r,s=Ev(o,n),i=s?n:0;return{prop:s?o:"invalidProp",toValue:i,fromValue:i,currentValue:i,active:!1,settled:!1,ease:mt(he.get("sequencer").ease)}}),this.goTo(t,{start:0,end:0}),this}goTo(t,r){let o={...this.#p,...r},{start:n,end:s,ease:i}=o;if(!Aa({start:n,end:s}))return this;let a=sy(t,i),c=Ka({data:a,values:this.#n}),l=Object.keys(t),p=Xa({timeline:this.#t,values:c,start:n,end:s,duration:this.#o,propToFind:"fromValue"});return this.#t=Nu({timeline:p,activeProp:l}),this}goFrom(t,r){let o={...this.#p,...r},{start:n,end:s,ease:i}=o;if(!Aa({start:n,end:s}))return this;let a=iy(t,i),c=Ka({data:a,values:this.#n}),l=Object.keys(t),p=Xa({timeline:this.#t,values:c,start:n,end:s,duration:this.#o,propToFind:"toValue"});return this.#t=Nu({timeline:p,activeProp:l}),this}goFromTo(t,r,o){let n={...this.#p,...o},{start:s,end:i,ease:a}=n;if(!Aa({start:s,end:i}))return this;if(!so(t,r))return io("sequencer goFromTo:",t,r),this;let c=ay(t,r,a),l=Ka({data:c,values:this.#n});return this.#t=Xa({timeline:this.#t,values:l,start:s,end:i,duration:this.#o,propToFind:""}),this}label(t="",r=0){return this.#i.push({name:t,time:r}),this}getLabels(){return this.#i}add(t=()=>{},r=0){let o=u.checkType(Function,t),n=u.checkType(Number,r),s=o&&n;return o||_b(t),n||Sb(r),s?(this.#s.push({fn:t,time:r}),this):this}subscribe(t=()=>{}){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=lt(t,this.#l);return this.#l=r,()=>this.#l=o(this.#l)}onStop(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=lt(t,this.#u);return this.#u=r,()=>this.#u=o(this.#u)}subscribeCache(t=()=>{}){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=cr(t,this.#h,this.#c);return this.#h=r,this.#c=n,()=>this.#h=o(this.#h)}getDuration(){return this.#o}setDuration(t=0){this.#o=t}getType(){return this.#e}cleanCachedId(){this.#h.forEach(({cb:t})=>u.useCache.clean(t))}freezeCachedId(){this.#h.forEach(({cb:t})=>u.useCache.freeze(t))}unFreezeCachedId(){this.#h.forEach(({cb:t})=>u.useCache.unFreeze({id:t,update:!0}))}disableStagger(){this.#m=!1}destroy(){this.#n=[],this.#t=[],this.#l=[],this.#h=[],this.#u=[],this.#s=[],this.#c.forEach(t=>t()),this.#c=[]}};var py=({values:e,timeElapsed:t,duration:r,ease:o})=>e.map(n=>{if(n.shouldUpdate){let s=o(t,n.fromValue,n.toValProcessed,r);return{...n,currentValue:_e(s)}}return{...n,currentValue:n.fromValue}});var Ar=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#y;#v;#T;#k;#_;#w;#N;#R;constructor(t){this.#n=$a(t?.ease),this.#t=Su(t?.duration),this.#i=co(t?.relative,"tween"),this.#l=Pt(t??{}),this.#h=u.getUnivoqueId(),this.#u=!1,this.#s=void 0,this.#c=void 0,this.#o=void 0,this.#e=[],this.#p=[],this.#a=[],this.#d=[],this.#f=[],this.#r=[],this.#g=[],this.#m=!1,this.#C=0,this.#x=0,this.#y=0,this.#v=!0,this.#T=!0,this.#k=!1,this.#_=!1,this.#w={duration:this.#t,ease:La(t?.ease),relative:this.#i,reverse:!1,immediate:!1},this.#N=Xe,this.#R=Xe;let r=t?.data;r&&this.setData(r)}#O(t){this.#u=!0,this.#m&&(this.#y=t-this.#C-this.#x),this.#x=t-this.#C-this.#y,Math.round(this.#x)>=this.#t&&(this.#x=this.#t),this.#e=py({values:this.#e,timeElapsed:this.#x,duration:this.#t,ease:this.#n});let r=Math.round(this.#x)===this.#t,o=Fe(this.#e,"currentValue");if(this.#m||$n({stagger:this.#l,callback:this.#a,callbackCache:this.#d,callBackObject:o,useStagger:this.#T}),r){Ln({onComplete:()=>{for(let s of this.#e)s.shouldUpdate&&(s.toValue=s.currentValue,s.fromValue=s.currentValue);this.#s?.(!0),this.#o=void 0,this.#c=void 0,this.#s=void 0,this.#y=0,this.#m=!1,this.#u=!1},callback:this.#a,callbackCache:this.#d,callbackOnComplete:this.#f,callBackObject:o,stagger:this.#l,slowlestStagger:this.#N,fastestStagger:this.#R,useStagger:this.#T});return}u.useFrame(()=>{u.useNextTick(({time:n})=>{this.#u&&this.#O(n)})})}#E(t){this.#C=t,this.#O(t)}async#A(){if(Vn(this.#l.each,this.#v,this.#d,this.#a)){let{averageFPS:t}=await u.useFps();po("tween",t);let r=ar(this.#d,this.#a);if(this.#l.grid.col>r.length){kt(r.length),this.#v=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=Nt({arrayDefault:r,arrayOnStop:this.#f,stagger:this.#l,slowlestStagger:this.#N,fastestStagger:this.#R});this.#d.length>this.#a.length?this.#d=o:this.#a=o,this.#f=n,this.#N=i,this.#R=s,this.#v=!1}return{ready:!0}}async#P(t,r){this.#_||(this.#s=t,this.#c=r,this.#v&&(this.#_=!0,await this.#A(),this.#_=!1),Bn({validationFunction:this.#r,defaultRafInit:o=>this.#E(o)}))}clearCurretPromise(){this.#m||(this.#c?.(u.ANIMATION_STOP_REJECT),this.#o=void 0,this.#c=void 0,this.#s=void 0,this.#u=!1)}stop({clearCache:t=!0,updateValues:r=!0}={}){this.#y=0,this.#m=!1,r&&(this.#e=wn(this.#e)),this.unFreezeStagger(),t&&this.#d.forEach(({cb:o})=>u.useCache.clean(o)),this.#c&&(this.#c(u.ANIMATION_STOP_REJECT),this.#o=void 0,this.#c=void 0,this.#s=void 0),this.#u=!1}freezeStagger(){this.#k||(this.#d.forEach(({cb:t})=>u.useCache.freeze(t)),this.#k=!0)}unFreezeStagger({updateFrame:t=!0}={}){this.#k&&(this.#d.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:t})),this.#k=!1)}pause(){this.#m||(this.#m=!0,this.freezeStagger())}resume(){this.#m&&(this.#m=!1,this.unFreezeStagger())}setData(t){this.#e=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,toValueOnPause:n,toValProcessed:n,fromValue:n,currentValue:n,shouldUpdate:!1,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#p=this.#e.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,shouldUpdate:!1,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#e=at(this.#e,this.#p)}#b(){for(let t of this.#e)t.shouldUpdate&&(t.fromValue=t.currentValue)}#F(t){let r={...this.#w,...t},{ease:o,duration:n,relative:s}=r;return this.#n=$a(o),this.#i=co(s,"tween"),this.#t=Su(n),r}goTo(t,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!0;let o=uo(t);return this.#L(o,t,r)}goFrom(t,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!0;let o=Dn(t);return this.#L(o,t,r)}goFromTo(t,r,o={}){if(this.stop({clearCache:!1,updateValues:!0}),this.#T=!0,!so(t,r))return io("tween goFromTo:",t,r),new Promise(s=>s);let n=Fn(t,r);return this.#L(n,t,o)}set(t,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!1;let o=Rr(t),n=r?{...r,duration:1}:{duration:1};return this.#L(o,t,n)}setImmediate(t,r={}){if(this.stop({clearCache:!1,updateValues:!1}),this.#m)return;this.#T=!1;let o=Rr(t),n=r?{...r,duration:1}:{duration:1};this.#e=Iu(o,this.#e);let{reverse:s}=this.#F(n);Rt(s,"reverse")&&(this.#e=Ir(t,this.#e)),this.#e=lu(this.#e,this.#i),this.#e=wr(this.#e)}#L(t,r,o={}){this.#e=Iu(t,this.#e);let{reverse:n,immediate:s}=this.#F(o);if(Rt(n,"reverse")&&(this.#e=Ir(r,this.#e)),this.#e=lu(this.#e,this.#i),Rt(s,"immediate "))return this.#u&&(this.stop({clearCache:!1,updateValues:!1}),this.#b()),this.#e=wr(this.#e),Promise.resolve();let i=!this.#u&&!this.#o;return i&&(this.#o=new Promise((a,c)=>{this.#P(a,c)})),i&&this.#o?this.#o:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return Fe(this.#e,"currentValue")}getInitialData(){return Fe(this.#p,"currentValue")}getFrom(){return Fe(this.#e,"fromValue")}getTo(){return Fe(this.#e,"toValue")}getFromNativeType(){return jn(this.#e)}getToNativeType(){return Wn(this.#e)}getType(){return"TWEEN"}getId(){return this.#h}isActive(){return this.#u}updateEase(t){this.#n=$a(t),this.#w=at(this.#w,{ease:t})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=lt(t,this.#a);return this.#a=r,()=>this.#a=o(this.#a)}subscribeCache(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=cr(t,this.#d,this.#g);return this.#d=r,this.#g=n,()=>this.#d=o(this.#d)}validateInitialization({validation:t,callback:r}){let o=[...this.#r,{validation:t,callback:r}];return this.#r=o,()=>this.#r=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=lt(t,this.#f);return this.#f=r,()=>this.#f=o(this.#f)}destroy(){this.#o&&this.stop(),this.#f=[],this.#r=[],this.#a=[],this.#d=[],this.#e=[],this.#o=void 0,this.#g.forEach(t=>t()),this.#g=[]}};var TI=({each:e,duration:t,numItem:r,index:o,eachByNumItem:n})=>{if(e===1){let h=t/r,f=_e(o*h),d=_e(f+h);return{start:f,end:d}}let i=t/r*n,a=t-i,c=r-1>0?r-1:1,p=a/c*o;return{start:_e(p),end:_e(i+p)}},_I=({duration:e,numItem:t,index:r,eachByNumItem:o,type:n})=>{let i=e/t*r,c=(e-(e-i))/t*o;if(n===Fo)return{start:0,end:_e(e-(i-c))};if(n===Bo){let l=(i-c)/2;return{start:_e(l),end:_e(e-l)}}return n==="end"?{start:_e(i-c),end:_e(e)}:{start:0,end:e}},my=e=>{let t=Pv(e?.items),r=Pt(e),o=ao(e?.duration),n=10,s=r?.each||1,i=[...t].map((d,y)=>({item:d,start:0,end:o,index:y}));if(!Rv(t))return i;r.grid?.col>t.length&&(kt(t.length),s=1),u.checkType(Number,s)&&(s>n||s<1)&&(Fb(n),s=1);let{staggerArray:a}=Nt({arrayDefault:[...t].map(d=>({item:d})),arrayOnStop:[],stagger:r,slowlestStagger:Xe,fastestStagger:Xe}),c=a.filter(({item:d})=>u.checkType(Element,d)||u.checkType(Object,d)||u.checkType(Element,d?.deref?.()));if(c.length===0)return Lb(),i;let l=c.map(({frame:d})=>d),p=[...new Set(l)].toSorted((d,y)=>d-y),h=p.length;return c.map(({item:d,frame:y})=>{let v=p.indexOf(y),T=s*h/n,{start:S,end:_}=r.type===Do?TI({each:s,duration:o,numItem:h,index:v,eachByNumItem:T}):r.type===Fo||r.type==="end"||r.type===Bo?_I({duration:o,numItem:h,index:v,eachByNumItem:T,type:r.type}):{start:0,end:o};return{item:d,start:S,end:_,index:v}})};function SI(e){return new qs(e)}function xI(e){return new Ys(e)}function CI(){return new Js}function EI(e){return my(e)}function wI(e){return new Ar(e)}function II(e){return new Tt(e)}function MI(e){return new Nr(e)}var Me={};So(Me,{createAsyncTimeline:()=>RI,createSyncTimeline:()=>kI});var Z=()=>{},Qa=(...e)=>t=>e.reduce((r,o)=>r.then(o),Promise.resolve(t));var Za=({data:e,filterBy:t})=>Object.entries(e).map(r=>{let[o,n]=r,s=o in t;return{data:{[o]:n},active:s}}).filter(({active:r})=>r).map(({data:r})=>r).reduce((r,o)=>({...r,...o}),{});var mo=({timeline:e,tween:t,index:r})=>{let o=t?.getId?.(),n=t?.getInitialData?.()||{},s=e.slice(0,r).reduce((i,a)=>{let c=a.find(({data:h})=>h?.tween?.getId?.()===o);c?.data?.tween?.setImmediate?.(c?.data?.valuesTo);let l=c?.data?.tween?.getToNativeType?.(),p=l&&c?Za({data:l,filterBy:c.data.valuesTo}):{};return{...i,...p}},n);return t.setImmediate(n),s};var Ou=({mainReject:e,mainResolve:t,isStopped:r,previousSessionId:o,currentSessionId:n,isInPause:s,tween:i,stepFunction:a,action:c,addToActiveTween:l})=>{if(r()||o!==n()){e();return}let p=l(i),h=i&&i?.validateInitialization?i.validateInitialization({validation:()=>s(),callback:()=>i.pause?.()}):Z;a[c]().then(()=>t({resolve:!0})).catch(()=>{}).finally(()=>{p(),h()})};var Xs=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#y;#v;#T;#k;#_;#w;#N;#R;#O;#E;#A;#P;#b;#F;#L;#I;constructor(t){this.#n=Oa(t?.repeat),this.#t=de(t?.yoyo,"asyncTimeline: yoyo",!1),this.#i=de(t?.freeMode,"asyncTimeline: freeMode",!1),this.#l=de(t?.autoSet,"asyncTimeline: autoSet",!0),this.#h=de(t?.inheritProps,"asyncTimeline: inheritProps",!0),this.#u=de(t?.forceFromTo,"asyncTimeline: forceFromTo",!1),this.#s=[],this.#c=[],this.#o=[],this.#e=!1,this.#p={id:-1,tween:void 0,callback:()=>{},action:"",valuesFrom:{},valuesTo:{},prevValueTo:{},prevValueSettled:!1,tweenProps:{},groupProps:{},labelProps:{}},this.#a={active:!1,index:-1,isReverse:!1,callback:void 0},this.#d=1,this.#f=void 0,this.#r=0,this.#g=0,this.#m=1,this.#C=!1,this.#x=!1,this.#y=!1,this.#v=!1,this.#T=!1,this.#k=!1,this.#_=!0,this.#w=0,this.#N=0,this.#R=0,this.#O=!1,this.#E=[],this.#A=!1,this.#P=0,this.#b=[],this.#F=[],this.#L=void 0,this.#I=void 0}#B(){let t=this.#s[this.#g],r=this.#E;if(this.#E=[],!t)return;this.#s[this.#g]=t.map(i=>{let{data:a}=i,{tween:c,valuesTo:l,prevValueSettled:p}=a;if(c&&c?.getToNativeType&&!p){let h=c.getToNativeType(),f=Za({data:h,filterBy:l});return{...i,data:{...a,prevValueTo:f,prevValueSettled:!0}}}return i});let o=t.map(i=>{let{data:a}=i,{tween:c,callback:l,action:p,valuesFrom:h,valuesTo:f,tweenProps:d,id:y}=a,v={...d};delete v.delay;let{active:T,index:S}=this.#a,_=Number.isNaN(S)?!1:T&&S&&this.#g<S;_&&(v.immediate=!0),d&&"relative"in d&&d.relative&&(d.relative=!1,hb()),this.#E.push({id:y,action:p});let E=r.find(({id:w,action:I})=>w===y&&I===p),x={set:()=>(this.#v||c?.clearCurretPromise?.(),c?.[p](h,v)),goTo:()=>(this.#v||c?.clearCurretPromise?.(),c?.[p](f,v)),goFrom:()=>(this.#v||c?.clearCurretPromise?.(),c?.[p](h,v)),goFromTo:()=>(this.#v||c?.clearCurretPromise?.(),c?.[p](h,f,v)),add:()=>E?new Promise(w=>w({resolve:!0})):new Promise(w=>{if(_){w({resolve:!0});return}let I=this.getDirection();l({direction:I,loop:this.#m}),w({resolve:!0})}),addAsync:()=>{this.#k=!0;let w=this.#w;return E?new Promise(I=>I({resolve:!0})):new Promise((I,N)=>{if(_){I({resolve:!0});return}let A=this.getDirection();l({direction:A,loop:this.#m,resolve:()=>{if(w===this.#w){I({resolve:!0});return}N()}})})},createGroup:()=>new Promise(w=>w({resolve:!0})),closeGroup:()=>new Promise(w=>w({resolve:!0})),label:()=>new Promise(w=>w({resolve:!0})),suspend:()=>{if(E)return new Promise(N=>N({resolve:!0}));let w=u.checkType(Boolean,l());w||db(l);let I=w?l():!0;return new Promise(N=>{!_&&I&&(this.#T=!0),N({resolve:!0})})}};return new Promise((w,I)=>{let N=_?!1:d?.delay,A=this.#w;if(N){let O=u.getTime();requestAnimationFrame(()=>{this.#$({start:O,deltaTimeOnpause:0,delay:N,mainReject:I,mainResolve:w,previousSessionId:A,tween:c,stepFunction:x,action:p})});return}Ou({mainReject:I,mainResolve:w,isStopped:()=>this.#_,isInPause:()=>this.#v,addToActiveTween:O=>this.#Y(O),currentSessionId:()=>this.#w,previousSessionId:A,tween:c,stepFunction:x,action:p})})}),s=this.#s[this.#g].some(i=>i.data.groupProps?.waitComplete)?"all":"race";Promise[s](o).then(()=>{if(this.#T||this.#_)return;let{active:i,index:a,isReverse:c,callback:l}=this.#a;if(l&&i&&this.#g===a-1){this.#Q(),this.#m++,l();return}if(i&&c&&this.#g===a-1&&this.reverseNext(),this.#C){this.#C=!1,this.#g=this.#s.length-this.#g-1,this.#Q(),this.#H(),this.#B();return}if(this.#g<this.#s.length-1){this.#g++,this.#B();return}if(this.#m<this.#n||this.#n===-1){if(i&&a===this.#s.length&&!this.#i){let p=this.#o.map(({tween:h})=>{let f=mo({timeline:this.#s,tween:h,index:this.#s.length});return new Promise((d,y)=>{h.set(f).then(()=>d({resolve:!0})).catch(()=>y())})});Promise.all(p).then(()=>{this.#S()}).catch(()=>{});return}this.#S();return}this.#F.forEach(({cb:p})=>p()),this.#_=!0,this.#L&&Ko.add(()=>{xt.add(()=>{this.#L?.({resolve:!0})})})}).catch(i=>{i&&console.log(i)}).finally(()=>{this.#k=!1})}#$({start:t,deltaTimeOnpause:r,delay:o,mainReject:n,mainResolve:s,previousSessionId:i,tween:a,stepFunction:c,action:l}){let p=u.getTime(),h=p-t;if(this.#v&&(r=p-this.#R),h-r>=o||this.#_||this.#C){Ou({mainReject:n,mainResolve:s,isStopped:()=>this.#_,isInPause:()=>this.#v,addToActiveTween:f=>this.#Y(f),currentSessionId:()=>this.#w,previousSessionId:i,tween:a,stepFunction:c,action:l});return}requestAnimationFrame(()=>{this.#$({start:t,deltaTimeOnpause:r,delay:o,mainReject:n,mainResolve:s,previousSessionId:i,tween:a,stepFunction:c,action:l})})}#S(){if(this.#m>0){let t=this.getDirection();this.#b.forEach(({cb:r})=>r({direction:t,loop:this.#m}))}this.#m++,this.#g=0,this.#Q(),(this.#t||this.#x)&&this.#H(),this.#x=!1,this.#B()}#Y(t){let r=t?.getId&&t.getId();if(!r)return Z;let o=this.#N;return this.#N++,this.#c.push({tween:t,uniqueId:r,id:o}),()=>{this.#c=this.#c.filter(({id:n})=>n!==o)}}#H(){this.#y=!this.#y,this.#s=this.#s.toReversed().map(t=>t.toReversed().map(r=>{let{data:o}=r,{action:n,valuesFrom:s,prevValueTo:i,valuesTo:a}=o,c=a;switch(n){case"goTo":return{...r,data:{...o,valuesTo:i,prevValueTo:c}};case"goFromTo":return{...r,data:{...o,valuesFrom:a,valuesTo:s}};case"goFrom":return this.#u||(fb(),this.stop()),{...r,data:{...o,valuesFrom:a,valuesTo:s}}}return r}))}#M(t){let r=this.#s.findIndex(o=>o[0]?.group&&o[0].group===this.#f);if(r!==-1){this.#s[r].push({group:this.#f,data:t});return}this.#s.push([{group:this.#f,data:t}])}#W(t){let r=t?.getId?.();if(this.#o.find(({id:s})=>s===r))return;let n={id:r,tween:t};this.#o.push(n)}#D(){this.#o.forEach(({tween:t})=>t.resetData())}set(t,r={},o={}){if(!Vs(t))return this;o.delay=Bs(o?.delay);let n=this.#h?mo({timeline:this.#s,tween:t,index:this.#s.length}):{};return this.#r++,this.#M({...this.#p,id:this.#r,tween:t,action:"set",valuesTo:{...n,...r},valuesFrom:{...n,...r},tweenProps:o,groupProps:{waitComplete:this.#e}}),this.#W(t),this}goTo(t,r={},o={}){if(!Vs(t))return this;o.delay=Bs(o?.delay);let n=mo({timeline:this.#s,tween:t,index:this.#s.length}),s=this.#h||this.#u?n:{};return this.#r++,this.#u?this.#M({...this.#p,id:this.#r,tween:t,action:"goFromTo",valuesFrom:{...s},valuesTo:{...s,...r},tweenProps:o??{},groupProps:{waitComplete:this.#e}}):this.#M({...this.#p,id:this.#r,tween:t,action:"goTo",valuesTo:{...s,...r},tweenProps:o??{},groupProps:{waitComplete:this.#e}}),this.#W(t),this}goFrom(t,r={},o={}){if(!Vs(t))return this;o.delay=Bs(o?.delay);let n=mo({timeline:this.#s,tween:t,index:this.#s.length}),s=this.#h||this.#u?n:{};return this.#r++,this.#u?this.#M({...this.#p,id:this.#r,tween:t,action:"goFromTo",valuesFrom:{...s,...r},valuesTo:{...s},tweenProps:o??{},groupProps:{waitComplete:this.#e}}):this.#M({...this.#p,id:this.#r,tween:t,action:"goFrom",valuesFrom:{...s,...r},tweenProps:o,groupProps:{waitComplete:this.#e}}),this.#W(t),this}goFromTo(t,r={},o={},n={}){if(!Vs(t))return this;n.delay=Bs(n?.delay);let s=this.#h?mo({timeline:this.#s,tween:t,index:this.#s.length}):{};return this.#r++,this.#M({...this.#p,id:this.#r,tween:t,action:"goFromTo",valuesFrom:{...s,...r},valuesTo:{...s,...o},tweenProps:n,groupProps:{waitComplete:this.#e}}),this.#W(t),this}add(t=Z){let r=lo(t,()=>{},"timeline add function");return this.#f?(An("add"),this):(this.#r++,this.#M({...this.#p,id:this.#r,callback:r,action:"add",groupProps:{waitComplete:this.#e}}),this)}addAsync(t){let r=Lv(t);return this.#f?(An("addAsync"),this):(this.#r++,this.#M({...this.#p,id:this.#r,callback:r,action:"addAsync",groupProps:{waitComplete:this.#e}}),this)}createGroup(t={}){return this.#f?(An("createGroup"),this):(this.#r++,this.#M({...this.#p,id:this.#r,action:"createGroup",groupProps:t}),this.#e=t?.waitComplete??!1,this.#f=this.#d++,this)}closeGroup(){return this.#f=void 0,this.#r++,this.#M({...this.#p,id:this.#r,action:"closeGroup"}),this.#e=!1,this}suspend(t=()=>!0){return this.#f?(An("suspend"),this):(this.#r++,this.#M({...this.#p,id:this.#r,callback:t,action:"suspend",groupProps:{waitComplete:this.#e}}),this)}label(t={}){return this.#f?(An("label"),this):Ov(t?.name,"asyncTimeline label:")?(this.#r++,this.#M({...this.#p,id:this.#r,action:"label",labelProps:t,groupProps:{waitComplete:this.#e}}),this):this}#U(){this.#O||(this.#O=!0,this.#o.forEach(({tween:t})=>{let r=t.getInitialData();this.#r++,this.#s=[[{group:void 0,data:{...this.#p,id:this.#r,tween:t,action:"set",valuesFrom:r,valuesTo:r,groupProps:{waitComplete:this.#e}}}],...this.#s]}),this.#o.forEach(({tween:t})=>{let r=mo({timeline:this.#s,tween:t,index:this.#s.length});this.#r++,this.#s.push([{group:void 0,data:{...this.#p,id:this.#r,tween:t,action:"set",valuesFrom:r,valuesTo:r,groupProps:{waitComplete:this.#e}}}])}))}setTween(t="",r=[]){this.stop();let o=Dv(r),n=Fv(t);if(!o||!n)return Promise.reject(new Error("timeline setTween: props is wrong"));let s=new Set(r.map(c=>c?.getId?.())),i=this.#o.filter(({id:c})=>s.has(c)),a=this.#s.findIndex(c=>{let[l]=c;return l.data.labelProps?.name===t});return a===-1?(vb(t),Promise.reject(new Error(`asyncTimeline.setTween() label: ${t} not found`))):new Promise(c=>{let l=i.map(({tween:p})=>{let h=mo({timeline:this.#s,tween:p,index:a});return new Promise((f,d)=>{p.set(h).then(()=>f({resolve:!0})).catch(()=>d())})});Promise.all(l).then(()=>{c({resolve:!0})}).catch(()=>{yb()})})}#G(){this.#I&&(this.#I(u.ANIMATION_STOP_REJECT),this.#I=void 0)}async#te(){if(this.#A)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#A=!0,await u.useFps(),this.#A=!1}async playFrom(t){return await this.#te(),this.#K(t,!1)}async playFromReverse(t){return await this.#te(),this.#K(t,!0)}#K(t,r){return new Promise((o,n)=>{this.playReverse({forceYoYo:!1,resolve:o,reject:n,callback:()=>{this.#s.length===0||this.#k||(this.#y&&this.#H(),this.#g=0,this.#a={isReverse:r,active:!0,index:u.checkType(String,t)?this.#s.findIndex(s=>{let[i]=s;return i.data.labelProps?.name===t}):t,callback:void 0},u.checkType(String,t)&&$v(this.#a.index,t),this.#B())}})})}async play(){return await this.#te(),new Promise((t,r)=>{if(this.#l&&this.#U(),this.#i){if(this.#s.length===0||this.#k)return;this.stop(),this.#_=!1,this.#y&&this.#H(),this.#w++,u.useFrameIndex(()=>{this.#I=r,this.#L=t,this.#B()},1);return}this.playReverse({forceYoYo:!1,callback:()=>{this.stop(),this.#_=!1;let o=this.#o.map(({tween:n})=>{let s=n.getInitialData();return new Promise((i,a)=>{n.set(s).then(()=>i({resolve:!0})).catch(()=>a())})});Promise.all(o).then(()=>{this.#I=r,this.#L=t,this.#B()}).catch(()=>{})}})})}async playReverse({forceYoYo:t=!0,callback:r,resolve:o=null,reject:n=null}={}){return await this.#te(),new Promise((s,i)=>{let a=o??s,c=n??i,l=t;this.#l&&this.#U(),!(this.#s.length===0||this.#k)&&(this.stop(),this.#_=!1,l&&(this.#x=!0),this.#a={active:!0,index:this.#s.length,isReverse:!1,callback:r},this.#m--,this.#w++,u.useFrameIndex(()=>{this.#L=a,this.#I=c,this.#B()},1))})}reverseNext(){this.#C=!0}stop({clearCache:t=!0}={}){this.#_=!0,this.#g=0,this.#m=1,this.#G(),this.#C=!1,this.#Q(),this.#x=!1,this.#v=!1,this.#T=!1,this.#k=!1,this.#R=0,this.#o.forEach(({tween:r})=>{r?.stop?.({clearCache:t})}),this.#y&&this.#H(),this.#y=!1,this.#i||this.#D()}pause(){this.#v||(this.#v=!0,this.#R=u.getTime(),this.#se())}resume(){if(this.#v&&(this.#v=!1,this.#R=0,this.#ee()),this.#T){if(this.#T=!1,this.#R=0,this.#g<=this.#s.length-2){this.#g++,this.#B();return}this.#g===this.#s.length-1&&(this.#g=this.#t&&!this.#y?1:0,this.#Q(),this.#t&&this.#H(),this.#m++,this.#B())}}#se(){this.#c.forEach(({tween:t})=>{t?.pause?.()})}#ee(){this.#c.forEach(({tween:t})=>{t?.resume?.()})}#Q(){this.#a={active:!1,index:-1,isReverse:!1,callback:void 0}}get(){return this.#c}isActive(){return!this.#_}isPaused(){return this.#v}isSuspended(){return this.#T}getDirection(){return this.#_?We.NONE:this.#y?We.BACKWARD:We.FORWARD}onLoopEnd(t){this.#b.push({cb:t,id:this.#P});let r=this.#P;return()=>{this.#b=this.#b.filter(o=>o.id!==r)}}onComplete(t){this.#F.push({cb:t,id:this.#P});let r=this.#P;return this.#P++,()=>{this.#F=this.#F.filter(o=>o.id!==r)}}destroy(){this.#o.forEach(({tween:t})=>{t?.destroy?.()}),this.#s=[],this.#c=[],this.#F=[],this.#b=[],this.#o=[],this.#g=0,this.#a={active:!1,callback:void 0,index:-1,isReverse:!1}}};var Ks=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#y;#v;#T;#k;#_;#w;#N;#R;#O;#E;constructor(t={}){this.#n=ao(t?.duration),this.#t=de(t?.yoyo,"syncTimeline: yoyo",!1),this.#i=Oa(t?.repeat),this.#l=[],this.#h=0,this.#u=0,this.#s=0,this.#c=0,this.#o=0,this.#e=0,this.#p=!1,this.#a=!1,this.#d=!1,this.#f=0,this.#r=0,this.#g=10,this.#m=!0,this.#C=!1,this.#x=!1,this.#y=!1,this.#v=!1,this.#T=0,this.#k=[],this.#_=[],this.#w=[],this.#N=void 0,this.#R=void 0,this.#O={time:0,direction:We.NONE},this.#E={direction:We.NONE,loop:0}}#A(t,r){if(this.#m||this.#y)return;let o=!this.#i||this.#i>=2&&this.#f===this.#i-1?0:1e3/r/2;this.#v&&(this.#c=t-this.#h-this.#u-this.#e),this.#u=Math.trunc(t-this.#h-this.#c-this.#e);let n=this.#p?this.#o-(this.#u-this.#o):this.#u,s=this.getDirection();if(this.#v||(this.#s=nt(n,0,this.#n),this.#C||(this.#l.forEach(i=>{i.draw({partial:this.#s,isLastDraw:!1,useFrame:!0,direction:s})}),this.#O.time=this.#s,this.#O.direction=s,this.#w.forEach(({cb:i})=>{i(this.#O)}))),this.#C=!1,this.#r++,n<=this.#n-o&&n>=0+o&&!this.#m){this.#x=!1,this.#P();return}if(this.#S(),this.#a){this.#p=!0,this.#o=0,this.#e=0,this.#a=!1,this.#P();return}if(u.useNextFrame(()=>{!this.#y&&!this.#x&&this.#r>this.#g&&(this.#x=!0,this.#f++,this.#r=0,this.#E.direction=s,this.#E.loop=this.#f,this.#k.forEach(({cb:i})=>i(this.#E)))}),!this.#i||this.#f===this.#i-1&&this.#r>this.#g){let i=this.#s;this.#l.forEach(a=>{a.draw({partial:i,isLastDraw:!0,useFrame:!0,direction:s})}),this.#m=!0,this.#b(),this.#h=t,this.#p&&(this.#p=!1),this.#_.forEach(({cb:a})=>a()),this.#N&&this.#N(!0);return}if(this.#t){this.reverse(),this.#P();return}if(this.#d){this.#b(),this.#h=t,this.#p||(this.#d=!this.#d),this.#u=this.#n,this.#s=this.#n,this.#c=this.#n,this.#P();return}this.#b(),this.#h=t,this.#p&&(this.#d=!this.#d),this.#P()}#P(){u.useFrame(()=>{u.useNextTick(({time:t,fps:r})=>{this.#y||this.#A(t,r)})})}#b(){this.#u=0,this.#c=0,this.#s=0,this.#o=0,this.#e=0}#F(t){let r=this.#l.reduce((o,n)=>n.getLabels().find(({name:a})=>a===t)||o,{name:"",time:0});return r||Tb(t),r.time}#L(){this.#R&&(this.#R(u.ANIMATION_STOP_REJECT),this.#R=void 0)}play(t={}){this.resume();let r=t?.useCurrent;return r||this.stop(),new Promise((o,n)=>{if(!this.#y&&(this.#L(),this.#N=o,this.#R=n,!(!this.#m&&!this.#p&&r))){if(!this.#m&&this.#p&&r){this.reverse();return}this.#I()}})}playFrom(t=0){return this.resume(),this.stop(),new Promise((r,o)=>{if(this.#y)return;let s=u.checkType(Number,t)?t:this.#F(t);this.#L(),this.#N=r,this.#R=o,this.#I(s)})}#I(t=0){this.#S(),this.#b(),this.#s=t,this.#e=-this.#s,this.#d=!1,this.#r=0,this.#y=!0,this.#$(t)}playFromReverse(t){return this.resume(),this.stop(),new Promise((r,o)=>{if(this.#y)return;let s=u.checkType(Number,t)?t:this.#F(t);this.#L(),this.#N=r,this.#R=o,this.#B(s,!0)})}playReverse(t={}){this.resume();let r=t?.useCurrent;return r||this.stop(),new Promise((o,n)=>{if(!this.#y&&(this.#L(),this.#N=o,this.#R=n,!(!this.#m&&this.#p&&r))){if(!this.#m&&!this.#p&&r){this.reverse();return}this.#B(this.#n,!0)}})}#B(t=0){this.#S(),this.#u=t,this.#s=t,this.#c=t,this.#o=0,this.#e=0,this.#a=!0,this.#d=!0,this.#C=!0,this.#r=0,this.#y=!0,this.#$(t)}async#$(t){if(this.#i===0)return;let{averageFPS:r}=await u.useFps();po("sequencer",r),this.#p=!1,this.#l.forEach(o=>{o.inzializeStagger(),o.disableStagger(),o.draw({partial:t,isLastDraw:!1,useFrame:!0,direction:this.getDirection()})}),u.useFrame(()=>{u.useNextTick(({time:o,fps:n})=>{this.#h=o,this.#y=!1,this.#m=!1,this.#v=!1,this.#f=0,this.#A(o,n)})})}pause({freezeCache:t=!0}={}){if(!(this.#m||this.#v||this.#y)&&(this.#m=!1,this.#v=!0,t)){this.#l.forEach(r=>{r.freezeCachedId()});return}}resume({unFreezeCache:t=!0}={}){if(!(this.#m||!this.#v||this.#y)&&(this.#v=!1,t)){this.#l.forEach(r=>{r.unFreezeCachedId()});return}}reverse(){this.#v&&this.resume(),!(this.#m||this.#y)&&(this.#S(),this.#p=!this.#p,this.#p?this.#o=this.#u:this.#e+=this.#u-this.#s)}stop({clearCache:t=!0}={}){if(this.resume(),this.#m=!0,this.#L(),t){this.#l.forEach(r=>{r.cleanCachedId()});return}this.#l.forEach(r=>{r.draw({partial:this.#s,isLastDraw:!0,useFrame:!0,direction:this.getDirection()})})}add(t){return t.setStretchFactor(this.#n),this.#l.push(t),this}setDuration(t){return this.#n=t,this}#S(){this.#l.forEach(t=>t.resetLastValue())}isActive(){return!this.#m}isPaused(){return this.#v}getDirection(){return this.#m?We.NONE:this.#p?We.BACKWARD:We.FORWARD}getTime(){return this.#s}onLoopEnd(t=()=>{}){this.#k.push({cb:t,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#k=this.#k.filter(o=>o.id!==r)}}onComplete(t=()=>{}){this.#_.push({cb:t,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#_=this.#_.filter(o=>o.id!==r)}}onUpdate(t=()=>{}){this.#w.push({cb:t,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#w=this.#w.filter(o=>o.id!==r)}}destroy(){this.stop(),this.#l.forEach(t=>t.destroy()),this.#l=[],this.#w=[],this.#k=[],this.#_=[]}};function kI(e){return new Ks(e)}function RI(e){return new Xs(e)}var Ke={};So(Ke,{createParallax:()=>LI,createScrollTrigger:()=>DI});var PI=({prevValue:e,value:t,maxVal:r})=>t>=r&&e<=r&&r>=0||t<=r&&e>=r&&r<=0?b.ON_LEAVE:t>r&&e<=r&&r<=0||t<r&&e>=r&&r>=0?b.ON_ENTER_BACK:t>=0&&e<=0&&r<=0||t<=0&&e>=0&&r>=0?b.ON_LEAVE_BACK:t>0&&t<r&&e<=0&&r>=0||t<0&&e>=0&&r<=0?b.ON_ENTER:b.ON_NOOP;function hy({prevValue:e,value:t,maxVal:r,onEnter:o,onEnterBack:n,onLeave:s,onLeaveBack:i}){switch(PI({prevValue:e,value:t,maxVal:r})){case b.ON_LEAVE:{s&&s();break}case b.ON_ENTER_BACK:{n&&n();break}case b.ON_LEAVE_BACK:{i&&i();break}case b.ON_ENTER:{o&&o();break}}}var NI=({startMarker:e,endMarker:t,label:r})=>{if(!e&&!t){let o=r.replaceAll(/^[^a-z]+|[^\w.:-]+/gi,"-"),n=document.createElement("span");n.className+=`p-marker p-marker--start  p-marker-${o}`,n.innerHTML=`start ${o}`;let s=document.createElement("span");s.className+=`p-marker p-marker--end  p-marker-${o}`,s.innerHTML=`end ${o}`,document.body.append(n),document.body.append(s);let i=document.querySelector(`.p-marker--start.p-marker-${o}`),a=document.querySelector(`.p-marker--end.p-marker-${o}`);return{lastStartMarker:i??void 0,lastEndMarkerEl:a??void 0}}return{lastStartMarker:e,lastEndMarkerEl:t}},AI=({screen:e})=>{if(e===globalThis)return{top:0,right:0,bottom:0,left:0};let t=e.getBoundingClientRect();return{top:t.top,right:document.documentElement.clientWidth-(t.left+e.offsetWidth),bottom:window.innerHeight-(t.top+e.offsetHeight),left:t.left}},OI=({startPoint:e,direction:t,invertSide:r,top:o,bottom:n,left:s,right:i})=>t===b.DIRECTION_VERTICAL?r?{right:0,width:"100vw",height:"3px",top:`${e+o}px`,padding:"0 30px",pointerEvents:"none"}:{right:0,width:"100vw",height:"3px",bottom:`${e+n}px`,padding:"0 30px",pointerEvents:"none"}:r?{top:0,height:"100vw",width:"3px",left:`${e+s}px`,padding:"30px 0",pointerEvents:"none"}:{top:0,height:"100vw",width:"3px",right:`${e+i}px`,padding:"30px 0",pointerEvents:"none"},$I=({startPoint:e,endPoint:t,direction:r,invertSide:o,top:n,bottom:s,left:i,right:a})=>r===b.DIRECTION_VERTICAL?o?{right:0,width:"100vw",height:"3px",top:`${e+t+n}px`,padding:"0 30px",pointerEvents:"none"}:{right:0,width:"100vw",height:"3px",bottom:`${e+t+s}px`,padding:"0 30px",pointerEvents:"none"}:o?{top:0,height:"100vw",width:"3px",left:`${e+t+i}px`,padding:"30px 0",pointerEvents:"none"}:{top:0,height:"100vw",width:"3px",right:`${e+t+a}px`,padding:"30px 0",pointerEvents:"none"},dy=({startMarker:e,endMarker:t,startPoint:r,endPoint:o,screen:n,direction:s,invertSide:i,label:a})=>{let{lastStartMarker:c,lastEndMarkerEl:l}=NI({startMarker:e,endMarker:t,label:a}),{top:p,right:h,bottom:f,left:d}=AI({screen:n}),y=OI({startPoint:r,direction:s,invertSide:i,top:p,bottom:f,left:d,right:h}),v=$I({startPoint:r,endPoint:o,direction:s,invertSide:i,top:p,bottom:f,left:d,right:h}),T={position:"fixed",zIndex:"99999",background:he.get("scrollTrigger")?.markerColor?.startEnd||"#ff0000",fontSize:"14px",whiteSpace:"nowrap",textTransform:"uppercase"};return u.useFrame(()=>{Object.assign(c?.style,{...T,...y}),Object.assign(l?.style,{...T,...v})}),{startMarker:c,endMarker:l}};var fy=({marker:e,direction:t,invertSide:r})=>{if(!e)return{};let n=`3px ${he.get("scrollTrigger")?.markerColor?.item||"#14df3b"} solid`;return t===b.DIRECTION_VERTICAL?r?{borderBottom:n}:{borderTop:n}:r?{borderRight:n}:{borderLeft:n}};var ec=class{#n=0;#t=0;#i=0;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#y;#v;#T;#k;#_;#w;#N;#R;#O;#E;#A;#P;#b;#F;#L;#I;#B;#$;#S;#Y;#H;#M;#W;#D;constructor(){this.#l=void 0,this.#h=0,this.#u=()=>0,this.#s=()=>0,this.#c=b.DIRECTION_VERTICAL,this.#o=0,this.#e=void 0,this.#p=void 0,this.#a=void 0,this.#r=void 0,this.#g=!1,this.#m=!1,this.#C=!1,this.#x=()=>{},this.#y=()=>{},this.#v=()=>{},this.#T=!0,this.#d=void 0,this.#f=globalThis,this.#M="left",this.#D=!0,this.#W=!1,this.#k=["flex","flex-shrink","flex-basis","float","display","grid-area","grid-column-start","grid-column-end","grid-row-start","grid-row-end","box-sizing","order","place-self","align-self","justify-self"],this.#_=["font-size","padding","margin","line-height","white-space"],this.#w=["text-align"],this.#N=["z-index","pointer-events"],this.#R=["transform","position","translate","rotate","scale"],this.#O=["none","static"],this.#E=!1,this.#A=0,this.#P=0,this.#b=!1,this.#F=1.5,this.#L=!1,this.#I=!1,this.#B=0,this.#$=0,this.#S=!1,this.#Y=0,this.#H=3}init(t){this.#e=t.item,this.#d=t.marker,this.#f=t.screen,this.#b=t.animatePin,this.#D=t.anticipatePinOnLoad,this.#L=t.forceTranspond,this.#l=t.invertSide,this.#c=t.direction,this.#u=t.getStart,this.#s=t.getEnd,this.#t=this.#u(),this.#h=this.#s(),this.#P=window.scrollY,this.#n=t?.scrollerHeight,this.#ue(),this.#M=this.#c===b.DIRECTION_VERTICAL?"top":"left",this.#E=!0,this.#T=!0,this.#te(),this.#se(),this.#K(),this.#U(),this.#y=u.useScrollStart(()=>{this.#E&&this.#f!==globalThis&&this.#m&&this.#r&&u.useFrame(()=>{this.#r&&(this.#r.style.transition="transform .85s cubic-bezier(0, 0.68, 0.45, 1.1)")})}),this.#x=u.useScroll(({scrollY:r})=>{if(this.#E&&this.#f!==globalThis&&this.#f!==document.documentElement){this.#c===b.DIRECTION_VERTICAL&&this.#ue();let o=r-this.#P;if(this.#P=r,this.#m&&this.#r&&this.#p){let{verticalGap:n}=this.#p.get(),s=n-o;this.#p.setData({collision:0,verticalGap:s}),u.useFrame(()=>{this.#r&&(this.#r.style.transform=`translate(0px,${s}px)`)})}}})}#U(){this.#p=new Tt({data:{collision:0,verticalGap:0},config:"wobbly"}),this.#v=this.#p.subscribe(({collision:t,verticalGap:r})=>{this.#c===b.DIRECTION_VERTICAL&&this.#r?this.#r.style.transform=`translate(0px, ${t}px)`:this.#r&&(this.#r.style.transform=`translate(${t}px, ${r}px)`)})}#G(){this.#r&&this.#p&&this.#p.set({collision:0,verticalGap:0}).catch(()=>{})}#te(){this.#e||(this.#e=document.createElement("div"));let t=document.createElement("div");t.classList.add("pin-wrapper");let r=document.createElement("div");r.classList.add("pin"),t.append(r);let o=this.#e?.parentNode;o&&o.insertBefore(t,this.#e),r.append(this.#e),this.#a=this.#e.closest(".pin-wrapper"),this.#r=this.#e.closest(".pin");let n=this.#Q(),s=this.#j(),i=fy({marker:this.#d,invertSide:this.#l,direction:this.#c}),a={display:"table"};u.useFrame(()=>{!this.#r||!this.#a||(Object.assign(this.#a.style,{...i}),Object.assign(this.#r.style,{...a,...s,...n}))}),this.#re()}#K(){if(!this.#r||!this.#a)return;let t=this.#a.offsetHeight,r=this.#a.offsetWidth;this.#a.style.height=`${t}px`,this.#a.style.width=`${r}px`,this.#r.style.height=`${t}px`,this.#r.style.width=`${r}px`}#se(){if(!this.#e)return;let t=globalThis.getComputedStyle(this.#e),r=this.#k.reduce((o,n)=>({...o,[n]:t.getPropertyValue(n)}),{});u.useFrame(()=>{this.#a&&Object.assign(this.#a.style,r)})}#ee(t,r){let o=t.parentNode;if(o)for(;o!==null&&o!==document;){let n=getComputedStyle(o);if(n[r]&&!this.#O.includes(n[r]))return{[r]:n[r]};o=o.parentNode}}#Q(){return this.#r?this.#w.map(r=>this.#ee(this.#r,r)).filter(Boolean).reduce((r,o)=>({...r,...o}),{})??{}:{}}#re(){if(this.#L){this.#W=!0;return}this.#W=this.#R.map(t=>{let r=this.#ee(this.#a,t);if(!r)return!1;let[o]=Object.keys(r),[n]=Object.values(r);return o==="position"?n==="fixed"||n==="absolute":!0}).includes(!0)}#ie(){this.#t=this.#u(),this.#h=this.#s()}#ue(){this.#ie(),this.#f!==globalThis&&(this.#t-=this.#c===b.DIRECTION_VERTICAL?St(this.#f).top:St(this.#f).left),this.#i=this.#l?this.#t:this.#n-this.#t,this.#o=this.#l?-Math.trunc(this.#h):Math.trunc(this.#h)}destroy(){this.#E&&(this.#p?.stop?.(),this.#v(),this.#x(),this.#y(),this.#p?.destroy?.(),this.#p=null,this.#B=0,this.#I=!1,this.#C=!1,this.#m=!1,this.#g=!1,this.#r&&this.#a&&(this.#a.parentNode?.insertBefore(this.#e,this.#a),this.#r.remove(),this.#a.remove(),this.#a=void 0,this.#r=void 0,this.#E=!1))}#ce(){return this.#a?this.#c===b.DIRECTION_VERTICAL?St(this.#a).top-this.#i:St(this.#a).left-this.#i:0}#fe(){let t=this.#ce();this.#be(t)}#pe(){let t=this.#l?this.#ce()-this.#h:this.#ce()+this.#h;this.#be(t)}#be(t){u.useFrame(()=>{if(!this.#r||!this.#M)return;let r=this.#r?.style??{};r[this.#M]=`${this.#i}px`}),this.#b&&!this.#T&&this.#r&&this.#p&&this.#p.goFrom({collision:t}).then(()=>{this.#ge()}).catch(()=>{})}#ge(){u.useFrame(()=>{this.#r&&(this.#r.style.transform="translate(0px, 0px)")})}#X(){this.#G(),u.useFrame(()=>{this.#r&&(this.#r.style.transition="",this.#r.style.position="relative",this.#r.style.top="",this.#r.style.left="")})}#q(){this.#G(),u.useFrame(()=>{this.#r&&(this.#r.style.transition="",this.#r.style.position="relative",this.#c===b.DIRECTION_VERTICAL?(this.#r.style.left="",this.#r.style.top=`${this.#o}px`):(this.#r.style.top="",this.#r.style.left=`${this.#o}px`))})}#J(){if(!this.#r)return;let t=this.#c===b.DIRECTION_VERTICAL?St(this.#r).left:St(this.#r).top,r=this.#c===b.DIRECTION_VERTICAL?"left":"top";u.useFrame(()=>{this.#r&&(this.#r.style.position="fixed",this.#r.style[r]=`${t}px`,this.#I=!0,this.#S=!0)})}#j(){if(!this.#e)return{};let t=globalThis.getComputedStyle(this.#e);return this.#N.reduce((r,o)=>({...r,[o]:t.getPropertyValue(o)}),{})}#Z(){if(!this.#e)return{};let t=globalThis.getComputedStyle(this.#e);return this.#_.reduce((r,o)=>({...r,[o]:t.getPropertyValue(o)}),{})}#oe(){return this.#_.reduce((t,r)=>({...t,[r]:""}),{})}#V(){if(this.#W){let t=this.#Q(),r=this.#j(),o=this.#Z();u.useFrame(()=>{this.#r&&(Object.assign(this.#r.style,{...r,...t}),this.#e&&Object.assign(this.#e.style,o),document.body.append(this.#r))})}}#ne(){!this.#W||!this.#e||!this.#a||u.useFrame(()=>{this.#r&&(Object.assign(this.#e.style,this.#oe()),this.#a?.append(this.#r))})}#me(t){let r=this.#S&&this.#Y<3?this.#$:nt(Math.abs(t-this.#A),0,250);return this.#S&&this.#Y<this.#H?this.#Y++:(this.#Y=0,this.#S=!1),this.#$=r,r*this.#F}#z(t,r){if(this.#b&&!this.#T||this.#T&&!this.#D)return{anticipateBottom:0,anticipateInnerIn:0,anticipateInnerOut:0};let o=this.#me(t),n=r===b.SCROLL_UP?0:o,s=r===b.SCROLL_UP?0:o*2,i=r===b.SCROLL_UP?o:0;return{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}}#ye(t,r){if(this.#b&&!this.#T||this.#T&&!this.#D)return{anticipateBottom:0,anticipateInnerIn:0,anticipateInnerOut:0};let o=this.#me(t),n=r===b.SCROLL_UP?o:0,s=r===b.SCROLL_UP?o*2:0,i=r===b.SCROLL_UP?0:o;return{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}}onScroll(t){if(!this.#E||!this.#a)return;if(this.#I&&this.#B<this.#H){this.#B++;return}else this.#B=0,this.#I=!1;let r=this.#A>t?b.SCROLL_UP:b.SCROLL_DOWN,o=this.#c===b.DIRECTION_VERTICAL?St(this.#a).top:St(this.#a).left,{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}=this.#l?this.#ye(t,r):this.#z(t,r),a=this.#l?o<this.#t-n:o>this.#n-this.#t+n,c=this.#l?o>=this.#t-s&&o<=this.#t+i+this.#h:o<=this.#n-this.#t+s&&this.#n-o<=this.#h+i+this.#t;if(a)this.#C||(this.#X(),this.#ne(),this.#C=!0,this.#m=!1,this.#g=!1);else if(c){if(!this.#m){this.#J();let l=r===b.SCROLL_DOWN&&!this.#l||r===b.SCROLL_UP&&this.#l;this.#V(),l?this.#fe():this.#pe(),this.#C=!1,this.#m=!0,this.#g=!1}}else this.#g||(this.#q(),this.#ne(),this.#C=!1,this.#m=!1,this.#g=!0);this.#A=t,this.#T=!1}};var gy=()=>{console.warn("parallax prop checker: value in start or end prop with no unit misure is not allowed, failed operation, use vh in vertical mode or vw in horizontal or px")},by=()=>{console.warn("parallax prop checker: value in start or end in vh is not allowed in horizontal mode, use vw or px")},vy=()=>{console.warn("parallax prop checker: value in start or end in vw is not allowed in vertical mode, use vh or px")};var $u=()=>({numberVal:0,unitMisure:"",additionalVal:"",position:""}),yy=({invert:e,endValInNumber:t,scrollerHeight:r,startPoint:o,isFromTopLeft:n})=>{let s=t-o,i=r-t-o;return e?n?s:i:n?i:s},Ty=({invert:e,scrollerHeight:t,screenUnit:r,endValInNumber:o,startPoint:n,isFromTopLeft:s})=>e?s?t-r*(100-o)-n:r*(100-o)-n:s?t-r*o-n:r*o-n,_y=({offset:e,height:t,gap:r,wScrollTop:o,wHeight:n})=>e+t>o-r&&e<o+(n+r),Sy=(e,t)=>{let r=e.find(c=>[...c].some(l=>!Number.isNaN(Number.parseFloat(l)))),o=_v(r);if(r&&!o)return gy(),$u();if(r&&o===b.VH&&t===b.DIRECTION_HORIZONTAL)return by(),$u();if(r&&o===b.VW&&t===b.DIRECTION_VERTICAL)return vy(),$u();let n=[b.PLUS_HEIGHT,b.PLUS_HEIGHT_HALF,b.PLUS_WIDTH,b.PLUS_WIDTH_HALF,b.MINUS_HEIGHT,b.MINUS_HEIGHT_HALF,b.MINUS_WIDTH,b.MINUS_WIDTH_HALF],s=e.find(c=>bu(n,c)),i=[b.POSITION_BOTTOM,b.POSITION_TOP,b.POSITION_LEFT,b.POSITION_RIGHT],a=e.find(c=>bu(i,c));return{numberVal:r||0,unitMisure:o,additionalVal:s??"",position:a??b.POSITION_BOTTOM}},xy=(e,t,r)=>{let n=String(t).split(" "),{numberVal:s,unitMisure:i,additionalVal:a,position:c}=Sy(n,r),l=Number.parseFloat(String(s)),p=Number.isNaN(l)?0:l;return i===b.PX?{value:p,additionalVal:a,position:Pa(c)}:{value:e*p,additionalVal:a,position:Pa(c)}},Cy=(e,t,r,o,n,s)=>{let a=String(t).split(" "),{numberVal:c,unitMisure:l,additionalVal:p,position:h}=Sy(a,s),f=Number.parseFloat(String(c)),d=Number.isNaN(f)?0:f,y=Pa(h),v=y===b.POSITION_TOP||y===b.POSITION_LEFT;return l===b.PX?{value:yy(n?{invert:!0,endValInNumber:d,scrollerHeight:o,startPoint:r,isFromTopLeft:v}:{invert:!1,endValInNumber:d,scrollerHeight:o,startPoint:r,isFromTopLeft:v}),additionalVal:p,position:y}:{value:Ty(n?{invert:!0,scrollerHeight:o,screenUnit:e,endValInNumber:d,startPoint:r,isFromTopLeft:v}:{invert:!1,scrollerHeight:o,screenUnit:e,endValInNumber:d,startPoint:r,isFromTopLeft:v}),additionalVal:p,position:y}},Lu=(e,t,r,o)=>{let n=String(t);return De(n,b.PLUS_HEIGHT_HALF)?e+r/2:De(n,b.PLUS_HEIGHT)?e+r:De(n,b.PLUS_WIDTH_HALF)?e+o/2:De(n,b.PLUS_WIDTH)?e+o:De(n,b.MINUS_HEIGHT_HALF)?e-r/2:De(n,b.MINUS_HEIGHT)?e-r:De(n,b.MINUS_WIDTH_HALF)?e-o/2:De(n,b.MINUS_WIDTH)?e-o:e},Ey=({switchPropierties:e,isReverse:t,value:r})=>{switch(e){case b.IN_STOP:return!t&&r>0||t&&r<0?0:r;case b.IN_BACK:return!t&&r>0||t&&r<0?-r:r;case b.OUT_STOP:return!t&&r<0||t&&r>0?0:r;case b.OUT_BACK:return!t&&r<0||t&&r>0?-r:r;default:return r}},wy=(e,t)=>e===b.PROP_OPACITY?1-t:-t,Du=({callback:e,pin:t,ease:r,useThrottle:o})=>t?u.useScrollImmediate(e):r&&o?u.useScrollThrottle(e):u.useScroll(e);var ho=class{#n=!1;#t=!1;#i=0;#l=0;#h=0;#u=0;#s=0;#c=0;#o=0;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#y;#v;#T;#k;#_;#w;#N;#R;#O;#E;#A;#P;#b;#F;#L;#I;#B;#$;#S;#Y;#H;#M;#W;#D;#U;#G;#te;#K;#se;#ee;#Q;#re;#ie;#ue;#ce;#fe;#pe;#be;#ge;#X;#q;#J;#j;#Z;#oe;#V;#ne;#me;#z;#ye;#he;#de;#le;#Ee;#Te;#ve;#Ce;#we;#Ie;#Re;#ae;constructor(t){this.#e=window.innerWidth,this.#p=window.innerHeight,this.#a=800,this.#d=0,this.#f=()=>{},this.#r=()=>{},this.#g=()=>{},this.#m=()=>{},this.#C=()=>{},this.#x=void 0,this.#y=void 0,this.#v=void 0,this.#T=0,this.#k=!1,this.#_=void 0,this.#w=!0,this.#N=!1,this.#R=!1,this.#O=!1,this.#E=void 0,this.#A="",this.#P=0,this.#b=0,this.#F=()=>{},this.#L=()=>{},this.#M=!1,this.#I=de(t?.pin,"Scrolltrigger pin propierties error:",!1),this.#B=de(t?.animatePin,"Scrolltrigger animatePin propierties error:",!1),this.#$=de(t?.forceTranspond,"Scrolltrigger forceTranspond propierties error:",!1),this.#S=de(t?.anticipatePinOnLoad,"Scrolltrigger anticipatePinOnLoad propierties error:",!1),this.#Y=Da(t?.start,"Scrolltrigger start propierties error:","bottom 0px"),this.#H=Da(t?.end,"Scrolltrigger end propierties error:","top"),this.#W=Da(t?.marker,"Scrolltrigger marker propierties error:",void 0),this.#D=t?.dynamicStart?Cu(t.dynamicStart,"dynamicStart"):null,this.#U=t?.dynamicEnd?Cu(t.dynamicEnd,"dynamicEnd"):null,this.#G=Bv(t?.dynamicRange),this.#te=de(t?.animateAtStart,"Scrolltrigger animateAtStart propierties error:",!1),this.#K=lo(t?.onEnter,!1,"Scrolltrigger onEnter propierties error"),this.#se=lo(t?.onEnterBack,!1,"Scrolltrigger onEnterBack propierties error"),this.#ee=lo(t?.onLeave,!1,"Scrolltrigger onLeave propierties error"),this.#Q=lo(t?.onLeaveBack,!1,"Scrolltrigger onLeaveBack propierties error"),this.#re=lo(t?.onTick,!1,"Scrolltrigger onTickCallback propierties error"),this.#ie=Wv(t?.align),this.#ue=jv(t?.onSwitch),this.#ce=de(t?.reverse,"Parallax reverse propierties error:",!1),this.#fe=Eu(t?.opacityStart,"Parallax opacityStart propierties error:",100),this.#pe=Eu(t?.opacityEnd,"Parallax opacityEnd propierties error:",0),this.#be=de(t?.limiterOff,"Parallax|Scrolltrigger limiterOff propierties error:",!1),this.#ge=t?.useWillChange,this.#X=Vv(t?.tween);let r=this.#X?.getType&&this.#X.getType()===b.TWEEN_TIMELINE,o=this.#X?.getType&&this.#X.getType()===b.TWEEN_TWEEN;this.#q=On(t?.item,!1),this.#J=On(t?.scroller,!0),this.#j=On(t?.screen,!0),this.#Z=xu(t?.trigger),this.#oe=xu(t?.applyTo),this.#V=Ws(t?.direction,"Parallax/Scrolltrigger"),this.#ne=de(t?.disableForce3D,"Parallax|Scrolltrigger disableForce3D propierties error:",!1),this.#me=de(t?.useThrottle,"Parallax|Scrolltrigger useThrottle propierties error:",!1),this.#z=zv(t?.type),this.#ye=ir(t?.perspective,"Parallax|Scrolltrigger perspective propierties error:",0),this.#he=Wo(t?.breakpoint,"breakpoint","parallax/scrolltrigger"),this.#de=jo(t?.queryType,"queryType","parallax/scrolltrigger");let{propierties:n,shouldTrackOnlyEvents:s}=Uv(t?.propierties,this.#z,o,r);this.#le=n,this.#Ee=s,this.#Te=s?"100px":Hv(t?.range,this.#z),this.#ve=de(t?.ease,"Parallax|Scrolltrigger ease propierties error:",!1),r&&t?.easeType===b.EASE_SPRING&&av(),this.#Ce=r?b.EASE_LERP:Gv(t?.easeType),this.#we=qv(t?.springConfig,this.#z),this.#Ie=Jv(t?.lerpConfig,this.#z),this.#Re=this.#Ce===b.EASE_SPRING?{configProps:{precision:b.EASE_PRECISION}}:{precision:b.EASE_PRECISION},this.#ae=this.#Ce===b.EASE_SPRING?new Tt:new Nr}init(){if(this.#n){console.warn("Parallax/scrollTrigger: The init() method cannot be launched more than once. If you are passing the instance to components like horizontalScroller or smoothScroller via the children property, they will initialize the instance.");return}this.#n=!0,this.#We(),this.#Oe(),this.#Ae(),this.#$e(),this.#Le(),this.#Fe(),this.setPerspective(),this.#le===b.PROP_TWEEN&&(this.#Te=this.#X?.getDuration?this.#X.getDuration():0,this.#G=()=>this.#Te,this.#X?.inzializeStagger?.()),this.#z==b.TYPE_SCROLLTRIGGER&&(this.#be=!0,this.#Ne(),this.#Me()),this.#ve&&(this.#g=u.useScrollStart(()=>{this.#ne||(this.#O=!0)}),this.#m=u.useScrollEnd(()=>{u.useFrame(()=>{u.useNextTick(()=>{this.#xe()})})}),this.#J===globalThis&&(this.#r=Du({pin:this.#I,ease:this.#ve,useThrottle:this.#me,callback:()=>{this.#xe()}})),this.#xe()),this.#ve||(this.#J===globalThis&&(this.#r=Du({pin:this.#I,ease:this.#ve,useThrottle:this.#me,callback:()=>{this.#Se(),this.#_e()}})),this.#Se(),this.#_e(),this.#m=u.useScrollEnd(()=>{this.#_e({forceRender:!0})})),this.#J!==globalThis&&this.#W&&(this.#C=u.useScroll(()=>{this.#Me()})),this.#f=u.useResize(({horizontalResize:t})=>{t&&this.refresh()}),this.#I&&(this.#E=new ec,ve[this.#de](this.#he)&&u.useNextTick(()=>{this.#De(),this.#E?.init(this.#Pe()),this.#E?.onScroll(this.#c)}))}#Pe(){return{item:this.#q,marker:this.#W,screen:this.#j,animatePin:this.#B,anticipatePinOnLoad:this.#S,forceTranspond:this.#$,invertSide:this.#M,direction:this.#V,scrollerHeight:this.#o,getStart:()=>this.#P,getEnd:()=>this.#b}}setScroller(t){this.#J=On(t,!0)}setScreen(t){this.#j=On(t,!0)}setDirection(t){this.#V=Ws(t,"Parallax/Scrolltrigger")}setBreakPoint(t){this.#he=Wo(t,"breakpoint","Parallax/Scrolltrigger")}setQueryType(t){this.#de=jo(t,"queryType","Parallax/Scrolltrigger")}setPerspective(){if(this.#ye&&this.#q&&this.#q.parentNode){let t={perspective:`${this.#ye}px`,"transform-style":"preserve-3d"},r=this.#q.parentNode;Object.assign(r.style,t)}}#We(){let t=b.PROP_SCALE||b.PROP_SCALE_X||b.PROP_SCALE_Y||b.PROP_OPACITY?1:0;switch(this.#ae.setData({val:t}),this.#F=this.#ae.subscribe(({val:r})=>{r!==this.#v&&(this.#le===b.PROP_TWEEN&&this.#X?.draw?(this.#X.draw({partial:r,isLastDraw:!1,useFrame:!1}),this.#v=r,this.#w=!1):this.#ke(r),u.useNextTick(()=>{this.#re&&this.#re({value:r,parentIsMoving:!0})}))}),this.#L=this.#ae.onComplete(({val:r})=>{this.#O=!1,this.#le===b.PROP_TWEEN&&this.#X?.draw?this.#X.draw({partial:r,isLastDraw:!0,useFrame:!1}):this.#ke(r),u.useNextTick(()=>{this.#re&&this.#re({value:r,parentIsMoving:!1})})}),this.#Ce){case b.EASE_LERP:{this.#Ie&&"updateVelocity"in this.#ae&&this.#ae?.updateVelocity?.(this.#Ie);break}case b.EASE_SPRING:{this.#we&&"updateConfig"in this.#ae&&this.#ae?.updateConfig?.(this.#we);break}}}#Ne(){if(this.#G){let t=this.#G();this.#d=Number.isNaN(t)?0:Number.parseFloat(t),this.#A=b.PX}else{let t=String(this.#Te),r=Yv(t,this.#le),o=Number.parseFloat(t);this.#d=Number.isNaN(o)?0:o,this.#A=Sv(r)}}#Me(){let t=this.#o/100;if(this.#D&&this.#D?.position&&this.#D?.value?.()!==void 0){let{position:l,value:p}=this.#D,h=p();Number.isNaN(h)||(this.#Y=`${l} ${h}px`)}let{value:r,additionalVal:o,position:n}=xy(t,this.#Y,this.#V);if(this.#M=n===b.POSITION_TOP||n===b.POSITION_LEFT,this.#P=Lu(r,o,this.#V===b.DIRECTION_VERTICAL?this.#u:this.#s,this.#V===b.DIRECTION_VERTICAL?this.#s:this.#u),this.#U&&this.#U?.position&&this.#U?.value?.()!==void 0){let{position:l,value:p}=this.#U,h=p();Number.isNaN(h)||(this.#H=`${l} ${h}px`)}let{value:s,additionalVal:i,position:a}=Cy(t,this.#H,this.#P,this.#o,this.#M,this.#V),c=this.#M?a===b.POSITION_BOTTOM||a===b.POSITION_RIGHT?-1:1:a===b.POSITION_BOTTOM||a===b.POSITION_RIGHT?1:-1;this.#b=Lu(s,i,this.#V===b.DIRECTION_VERTICAL?this.#u*c:this.#s*c,this.#V===b.DIRECTION_VERTICAL?this.#s*c:this.#u*c),this.#je(),this.#M&&(this.#P-=this.#u)}#je(){if(this.#W){let{startMarker:t,endMarker:r}=dy({startMarker:this.#x,endMarker:this.#y,startPoint:this.#P,endPoint:this.#b,screen:this.#j,direction:this.#V,invertSide:this.#M,label:this.#W});this.#x=t,this.#y=r}}#Ae(){let t=this.#Z??this.#q;if(!t)return;let r=0,o=0,n=0;this.#Z&&(r=Co(this.#Z)?.x??0,o=Co(this.#Z)?.y??0,n=Co(this.#Z)?.z??0),t.style.transform="",this.#V===b.DIRECTION_VERTICAL?this.#i=this.#J===globalThis?Math.trunc(be(t).top):Math.trunc(be(t).top)-be(this.#J).top:this.#i=this.#J===globalThis?Math.trunc(be(t).left):Math.trunc(be(t).left)-be(this.#J).left,this.#j&&this.#j!==globalThis&&(this.#i-=this.#V===b.DIRECTION_VERTICAL?Math.trunc(be(this.#j).top):Math.trunc(St(this.#j).left)),this.#Z&&(r!==0||o!==0||n!==0)&&(this.#Z.style.transform=`translate3D(${r}px, ${o}px, ${n}px)`)}#Oe(){this.#j===globalThis||!this.#j||(this.#l=this.#V===b.DIRECTION_VERTICAL?Math.trunc(be(this.#j).top):Math.trunc(St(this.#j).left))}#$e(){let t=this.#Z??this.#q;t&&(this.#u=this.#V===b.DIRECTION_VERTICAL?Math.trunc(t.offsetHeight):Math.trunc(t.offsetWidth))}#Le(){let t=this.#Z??this.#q;t&&(this.#s=this.#V===b.DIRECTION_VERTICAL?Math.trunc(t.offsetWidth):Math.trunc(t.offsetHeight))}#De(){this.#J&&(this.#J===globalThis?this.#c=this.#V===b.DIRECTION_VERTICAL?this.#J.scrollY:this.#J.scrollX:this.#c=this.#V===b.DIRECTION_VERTICAL?-be(this.#J).top:-be(this.#J).left)}#Fe(){this.#j&&(this.#e=window.innerWidth,this.#p=window.innerHeight,this.#j===globalThis?this.#o=this.#V===b.DIRECTION_VERTICAL?window.innerHeight:window.innerWidth:this.#o=this.#V===b.DIRECTION_VERTICAL?Math.trunc(this.#j.offsetHeight):Math.trunc(this.#j.offsetWidth))}refresh(){this.#I&&this.#E&&this.#E.destroy(),this.#Oe(),this.#Ae(),this.#$e(),this.#Le(),this.#Fe(),this.#z==b.TYPE_SCROLLTRIGGER&&(this.#Me(),this.#G&&this.#Ne(),this.#I&&this.#E&&ve[this.#de](this.#he)&&this.#E?.init(this.#Pe())),this.#v=void 0,this.#w=!0,ve[this.#de](this.#he)?this.#ve?this.#xe():(this.#Se(),this.#_e({forceRender:!0})):(this.#ve&&this.#ae?.stop?.(),u.useFrameIndex(()=>{this.#oe?(this.#Be(this.#oe),Object.assign(this.#oe.style,this.#Ve())):(this.#Be(this.#q),this.#q&&Object.assign(this.#q.style,this.#Ve()))},3))}move({value:t,parentIsMoving:r=!1}){if(!ve[this.#de](this.#he)||!t)return;this.#R=!0;let o=this.#ze(t);if(this.#ve)this.#xe(o);else{this.#Se(o);let n=this.#N||this.#w||void 0;this.#_e({forceRender:n,parentIsMoving:r})}}triggerScrollStart(){this.#ve&&(this.#ne||(this.#O=!0))}triggerScrollEnd(){this.#ve||this.#_e({forceRender:!0})}#ze(t){if(t!==void 0)return this.#j!==globalThis?t+this.#l:t}stopMotion(){this.#ae?.stop?.()}#Se(t){if(!ve[this.#de](this.#he)||(t?this.#c=-t:this.#De(),this.#N=_y({offset:this.#i,height:this.#u,gap:this.#a,wScrollTop:this.#c,wHeight:this.#o}),!this.#N&&!this.#be&&this.#z===b.TYPE_PARALLAX))return;this.#I&&this.#E&&this.#E.onScroll(this.#c),this.#z===b.TYPE_SCROLLTRIGGER?this.#h=_e(this.#He()):this.#le===b.PROP_OPACITY?this.#h=_e(this.#Ge()):this.#h=Number.isNaN(Number.parseInt(this.#ie))?_e(this.#qe()/2):_e(this.#Je()/2);let r=this.#ce&&this.#z!==b.TYPE_SCROLLTRIGGER?wy(this.#le,this.#h):this.#h;this.#h=this.#z===b.TYPE_SCROLLTRIGGER?r:this.#Ye(r)}#xe(t){if(!ve[this.#de](this.#he)||(this.#Se(t),!this.#k&&!this.#w&&this.#z===b.TYPE_SCROLLTRIGGER)||!this.#N&&!this.#w&&this.#z===b.TYPE_PARALLAX)return;let r=this.#w&&!this.#te?"set":"goTo";this.#ae&&this.#ae[r]({val:this.#h},this.#Re).catch(()=>{})}#_e({forceRender:t=!1,parentIsMoving:r=!1}={}){ve[this.#de](this.#he)&&u.useFrame(()=>{this.#h===this.#v&&!t||!this.#N&&!t||(!this.#ne&&!this.#R&&(this.#O=!t),!this.#ne&&this.#R&&(this.#O=r&&this.#N),this.#le===b.PROP_TWEEN?(this.#X.draw({partial:this.#h,isLastDraw:!this.#O,useFrame:!1}),this.#v=this.#h,this.#w=!1):this.#ke(this.#h),u.useNextTick(()=>{this.#re&&this.#re({value:this.#h,parentIsMoving:this.#O})}))})}#He(){let t=this.#M?-(this.#c+this.#P+this.#b-(this.#i+this.#b)):-(this.#c+this.#o-this.#P-(this.#i+this.#b)),r=this.#b/100*this.#d,o=t/100*this.#d,n=this.#ce?this.#M?r-o:o:this.#M?o:r-o,s=r>0?-nt(n,0,r):-nt(n,r,0);if(this.#k=this.#_!==s,this.#_=s,!this.#k&&!this.#w)return this.#h;let i=s*100/this.#b;switch((this.#K||this.#se||this.#ee||this.#Q)&&hy({prevValue:this.#T,value:n,maxVal:r,onEnter:this.#K,onEnterBack:this.#se,onLeave:this.#ee,onLeaveBack:this.#Q}),this.#T=n,this.#le){case b.PROP_HORIZONTAL:case b.PROP_VERTICAL:return this.#Ue(i);case b.PROP_SCALE:case b.PROP_SCALE_X:case b.PROP_SCALE_Y:case b.PROP_OPACITY:return 1-i;default:return-i}}#Ue(t){switch(this.#A){case b.VW:return this.#e/100*-t;case b.VH:return this.#p/100*-t;case b.WPERCENT:return this.#V===b.DIRECTION_VERTICAL?this.#s/100*-t:this.#u/100*-t;case b.HPERCENT:return this.#V===b.DIRECTION_VERTICAL?this.#u/100*-t:this.#s/100*-t;default:return-t}}#Ge(){let t=this.#o/100*this.#pe,r=this.#o-this.#o/100*this.#fe,o=this.#ie==b.ALIGN_START?-this.#c*-1:(this.#c+t-this.#i)*-1,n=this.#ie==b.ALIGN_START?1-o/this.#i:1-o/(this.#o-r-t);return nt(n,0,1)}#qe(){let t=Number(this.#Te),r=Number.isNaN(t)?0:t,o=this.#V===b.DIRECTION_VERTICAL?document.documentElement.scrollHeight:document.documentElement.scrollWidth;switch(this.#ie){case b.ALIGN_START:return(this.#c+this.#l)/r;case b.ALIGN_TOP:case b.ALIGN_LEFT:return(this.#c-this.#i)/r;case b.ALIGN_CENTER:return(this.#c+(this.#o/2-this.#u/2)-this.#i)/r;case b.ALIGN_BOTTOM:case b.ALIGN_RIGHT:return(this.#c+(this.#o-this.#u)-this.#i)/r;case b.ALIGN_END:return-(o-(this.#c+this.#o))/r;default:return 0}}#Je(){let t=Number(this.#ie),r=Number(this.#Te);return(this.#c+this.#o/100*t-this.#i)/r}#Ye(t){return Ey({switchPropierties:this.#ue,isReverse:this.#ce,value:t})}#ke(t){this.#v=t,this.#w=!1;let r=this.#oe||this.#q;if(!r||this.#Ee)return;let o=this.#O?"translate3D(0px, 0px, 0px)":"";this.#t=this.#ge?u.mustMakeSomething():!1;let n=this.#t&&this.#O?"transform":"",s=u.shouldMakeSomething()?Math.round(t):t;switch(this.#le){case b.PROP_VERTICAL:{r.style.transform=`${o} translateY(${s}px)`,r.style.willChange=n;break}case b.PROP_HORIZONTAL:{r.style.transform=`${o} translateX(${s}px)`,r.style.willChange=n;break}case b.PROP_ROTATE:{r.style.transform=`${o} rotate(${s}deg)`,r.style.willChange=n;break}case b.PROP_ROTATEY:{r.style.transform=`${o} rotateY(${s}deg)`,r.style.willChange=n;break}case b.PROP_ROTATEX:{r.style.transform=`${o} rotateX(${s}deg)`,r.style.willChange=n;break}case b.PROP_ROTATEZ:{r.style.transform=`${o} rotateZ(${s}deg)`,r.style.willChange=n;break}case b.PROP_OPACITY:{r.style.opacity=`${t}`;break}case b.PROP_SCALE:{let i=this.#z===b.TYPE_SCROLLTRIGGER?t:1+t/1e3;r.style.transform=`${o} scale(${i})`,r.style.willChange=n;break}case b.PROP_SCALE_X:{let i=this.#z===b.TYPE_SCROLLTRIGGER?t:1+t/1e3;r.style.transform=`${o} scaleX(${i})`,r.style.willChange=n;break}case b.PROP_SCALE_Y:{let i=this.#z===b.TYPE_SCROLLTRIGGER?t:1+t/1e3;r.style.transform=`${o} scaleY(${i})`,r.style.willChange=n;break}default:{r.style[this.#le.toLowerCase()]=`${t}px`;break}}}#Be(t){this.#X&&t&&(t.style="")}#Ve(){if(!this.#Ee)switch(this.#le){case b.PROP_VERTICAL:case b.PROP_HORIZONTAL:case b.PROP_ROTATE:case b.PROP_ROTATEY:case b.PROP_ROTATEX:case b.PROP_ROTATEZ:case b.PROP_SCALE:return{transform:""};case b.PROP_OPACITY:return{opacity:""};default:return{[this.#le.toLowerCase()]:""}}}destroy(){this.#ae?.stop?.(),this.#r(),this.#g(),this.#m(),this.#f(),this.#F(),this.#L(),this.#C(),this.#ae?.destroy?.(),this.#ae=null,this.#G=()=>{},this.#D?.value&&(this.#D.value=()=>0),this.#U?.value&&(this.#U.value=()=>0),this.#K=()=>{},this.#se=()=>{},this.#ee=()=>{},this.#Q=()=>{},this.#re=()=>{},this.#I&&this.#E&&this.#E?.destroy?.(),this.#x&&this.#x?.remove?.(),this.#y&&this.#y?.remove?.(),this.#x=void 0,this.#y=void 0,this.#E=void 0,this.#h=0;let t=this.#oe??this.#q;t&&"style"in t&&(t.style=""),this.#q=null,this.#J=null,this.#j=null,this.#Z=null,this.#oe=null}};function LI(e){return new ho({...e,type:b.TYPE_PARALLAX})}function DI(e){return new ho({...e,type:b.TYPE_SCROLLTRIGGER})}var Fu=window.innerHeight,Bu=document.body.offsetHeight,fo=!1,Vu=!0,zt=window.scrollY,Qs=!0,Ht=!1,Wu=()=>{},ju=()=>{},rc=()=>{},tc,Iy=()=>{document.body.classList.remove("is-whelling")},FI=()=>{document.body.classList.add("is-whelling")};ue.setDefault({usePassive:!1});var BI=({velocity:e,rootElement:t})=>{let r=H.createLerp({data:{scrollValue:window.scrollY},precision:1,velocity:.1});tc=t;let o=r.subscribe(({scrollValue:h})=>{Ht||window.scrollTo({top:Math.round(h),left:0,behavior:"instant"})});r.onComplete(()=>{zt=window.scrollY});let n=u.useMouseWheel(h=>{if(Ht)return;h.preventDefault(),Qs=!1,FI();let f=h.spinY??0,d=ue.clamp(f*e+zt,0,Bu-Fu);zt=d,r.goTo({scrollValue:d}).catch(()=>{})}),s=u.useMouseWheel(({preventDefault:h})=>{Vu&&h()}),i=u.useMouseWheel(u.debounce(()=>{Iy()},500)),a=u.useScrollEnd(()=>{let h=window.scrollY;zt=h,r.setImmediate({scrollValue:h})}),c=u.useScroll(()=>{if(!Qs)return;let h=window.scrollY;zt=h,r.setImmediate({scrollValue:h})}),l=u.usePointerDown(()=>{Ht||(Iy(),r.stop(),zt=window.scrollY,Qs=!0)}),p=new ResizeObserver(()=>{r.stop(),r.setImmediate({scrollValue:window.scrollY}),zt=window.scrollY,Fu=window.innerHeight,Bu=document.body.offsetHeight});return p.observe(t),{destroy:()=>{fo=!1,zt=0,Qs=!0,Ht=!1,tc&&(p.unobserve(tc),p.disconnect()),r?.stop(),r?.destroy(),r=null,tc=null,o(),c(),a(),n(),l(),i(),s(),Wu=()=>{},ju=()=>{},rc=()=>{}},stop:()=>{r.stop(),zt=window.scrollY},update:()=>{r.setImmediate({scrollValue:window.scrollY})}}},oc=({velocity:e=100,rootElement:t=document.createElement("div")}={})=>{fo||(zt=window.scrollY,fo=!0,Ht=!1,Fu=window.innerHeight,Bu=document.body.offsetHeight,Vu=!0,Qs=!1,{destroy:Wu,stop:ju,update:rc}=BI({velocity:e,rootElement:t}))},ur=()=>{!fo||Ht||(ju(),Ht=!0)},Ut=()=>{!fo||!Ht||(Ht=!1)},Zs=()=>{!fo||!Ht||(rc(),zt=window.scrollY,Ht=!1)},zu=()=>{fo&&rc()},Hu=()=>{Wu()},My=()=>{Vu=!0};var ky=()=>fo;var Ry="easeOutQuad",ei=new Ar({ease:Ry,data:{val:0}}),nc=!1,Uu=!1;ei.subscribe(({val:e})=>{window.scrollTo({top:e,left:0,behavior:"auto"}),zu()});var Gu=()=>{Uu&&(document.body.style.overflow=""),ei?.updateEase?.(Ry),Zs()},qu=()=>{nc&&(ei.stop(),Gu())};u.useMouseWheel(()=>{qu()});u.useMouseDown(()=>{qu()});u.useTouchStart(()=>{qu()});var Or={to:(t,r)=>{if(typeof globalThis>"u")return;let o=t?rl(t)||u.checkType(Number,t)?rl(t)?be(t).top:t:(console.warn(`bodyScroll ${t} is not valid target, must be a node or a number`),0):0,n=ir(r?.duration,"bodyScroll: duration",500);return Uu=de(r?.overflow,"bodyScroll: overflow",!1),La(r?.ease)&&ei?.updateEase?.(r?.ease),Uu&&(document.body.style.overflow="hidden"),new Promise(s=>{nc=!0,ur(),ei.goFromTo({val:window.scrollY},{val:o},{duration:n}).then(()=>{Gu(),nc=!1,s(!0)}).catch(()=>{Gu(),nc=!1,s(!0)})})}};var ti={END:"END",START:"START",CENTER:"CENTER"};var VI=e=>{switch(e){case ti.END:return"align-items:flex-end;";case ti.CENTER:return"align-items:center;";default:return"align-items:flex-start;"}},Py=({mainContainer:e,queryType:t,breakpoint:r,container:o,trigger:n,row:s,column:i,shadow:a,useSticky:c,columnHeight:l,columnWidth:p,columnAlign:h})=>{let f=ve.getBreackpoint(r),d="user-select:none",y=c?"relative":"absolute",v=c?"position:sticky;top:0;":"",T=VI(h),S=p?`width:${p}vw;`:"",_=`
      @media (${t}-width:${f}px){${o}{position:relative;${d}}}@media (${t}-width:${f}px){${n}{z-index:10;position:${y};pointer-events:none;overflow:hidden;top:0;left:0;right:0}}@media (${t}-width:${f}px){${s}{--sectionheight:${l}vh}}@media (${t}-width:${f}px){${s}{display:flex;height:100vh;${v}${T}}}@media (${t}-width:${f}px){${i}{height:var(--sectionheight);flex:0 0 auto;${S}}}.${a}{display:none}@media (${t}-width:${f}px){.${a}{width:100%;display:block;pointer-events:none}}.${a}{display:none}@media (${t}-width:${f}px){.${a}{pointer-events:none;display:block;position:absolute;left:0;right:0}.${a}--end,.${a}--in-center,.${a}--left,.${a}--out-center{opacity:0;border:1px red dashed;width:25%}.${a}--end.debug,.${a}--in-center.debug,.${a}--left.debug,.${a}--out-center.debug{opacity:1}.${a}--in-center{position:absolute;top:0;right:0;padding:0 40px;text-align:center}.${a}--out-center{position:absolute;top:0;right:0;padding:0 40px;text-align:center}.${a}--left{position:absolute;top:0;left:50%;transform:translateX(-50%);padding:0 40px;text-align:center}.${a}--end{position:absolute;top:0;left:0;padding-left:40px}}`,E=document.createElement("div");E.classList.add("scroller-style");let x=document.createElement("style");x.append(document.createTextNode(_)),E.append(x),e.prepend(E)};var ri=class{#n=!0;#t=0;#i=!1;#l=0;#h=100;#u=100;#s=!1;#c=0;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#y;#v;#T;#k;#_;#w;#N;#R;#O;#E;#A;#P;#b;#F;#L;#I;#B;#$;#S;#Y;#H;#M;#W;#D;#U;#G;#te;#K;#se;#ee;#Q;#re;#ie;#ue;#ce;#fe;#pe;constructor(t){this.#o=()=>{},this.#pe=0,this.#B=t?.container??"",this.#W=[],this.#D=!1,this.#U=0,this.#G={},this.#te=0,this.#K=t?.children||[],this.#e=de(t?.useDrag,"HorizontalScroller: useDrag",!1),this.#p=ir(t?.threshold,"HorizontalScroller: threshold",30),this.#a=de(t?.useWillChange,"HorizontalScroller: useWillChange",!1),this.#d=Wo(t?.breakpoint,"breakpoint","horizontalScroller"),this.#f=jo(t?.queryType,"queryType","horizontalScroller"),this.#r=de(t?.forceTranspond,"HorizontalScroller: forceTranspond",!1),this.#g=de(t?.addCss,"HorizontalScroller: addCss",!0),this.#m=de(t?.animateAtStart,"HorizontalScroller: animateAtStart",!1),this.#C=de(t?.ease,"HorizontalScroller: ease",!1),this.#x=Va(t?.easeType??"","HorizontalScroller"),this.#y=de(t?.useSticky,"HorizontalScroller: useSticky",!1),this.#v=de(t?.animatePin,"HorizontalScroller: animatePin",!1),this.#T=de(t?.reverse,"HorizontalScroller: reverse",!1),this.#k=de(t?.useThrottle,"HorizontalScroller: useThrottle",!1),this.#_=ir(t?.columnHeight,"HorizontalScroller: columnHeight",100),this.#w=ir(t?.columnWidth,"HorizontalScroller: columnWidth",null),this.#N=t?.columnAlign?t.columnAlign.toUpperCase():ti.START,this.#R=ct(t?.onEnter,"HorizontalScroller: onEnter",Z),this.#O=ct(t?.onEnterBack,"HorizontalScroller: onEnterBack",Z),this.#E=ct(t?.onLeave,"HorizontalScroller: onLeave",Z),this.#A=ct(t?.onLeaveBack,"HorizontalScroller: onLeaveBack",Z),this.#P=ct(t?.afterInit,"HorizontalScroller: afterInit",Z),this.#b=ct(t?.afterRefresh,"HorizontalScroller: afterRefresh",Z),this.#F=ct(t?.afterDestroy,"HorizontalScroller: afterDestroy",Z),this.#L=ct(t?.onTick,"HorizontalScroller: onTick",void 0),this.#I=u.checkType(String,t.root)?document.querySelector(t.root):t.root,this.#I||(this.#n=!1,console.warn("horizontal custom: root node not found")),this.#I.querySelector(this.#B)||(this.#n=!1,console.warn("horizontal custom: container node not found")),this.#$=this.#I.querySelector(t.trigger),this.#$||(this.#n=!1,console.warn("horizontal custom: trigger node not found")),this.#S=this.#I.querySelector(t.row),this.#S||(this.#n=!1,console.warn("horizontal custom: row node not found")),this.#Y=this.#I.querySelectorAll(t.column),this.#Y.length===0&&(this.#n=!1,console.warn("horizontal custom: column nodeList not found")),this.#H=this.#I.querySelectorAll("[data-shadow]");let o=t?.shadowClass||"shadow";this.#M=o.replace(".",""),this.#W=this.#S.querySelectorAll("a, button"),this.#K.forEach(n=>{this.#S&&n.setScroller(this.#S),n.setDirection("horizontal"),n.setBreakPoint(this.#d),n.setQueryType(this.#f),n.init()}),this.#g&&Py({mainContainer:this.#I,queryType:this.#f,breakpoint:this.#d,container:this.#B,trigger:t?.trigger??"trigger",row:t.row,column:t.column,shadow:this.#M,useSticky:this.#y,columnHeight:this.#_,columnWidth:this.#w,columnAlign:this.#N}),this.#se=n=>{if(!this.#i)return;let{movementX:s}=n,i=this.#T?s:-s;this.#X(i)},this.#ee=()=>{ve[this.#f](this.#d)&&(ur(),this.#s&&this.#S&&(this.#S.style.cursor="move"),this.#i=!0,this.#pe=this.#c)},this.#Q=()=>{Ut(),this.#i=!1,u.useFrame(()=>{this.#S&&(this.#S.style.cursor="")})},this.#re=()=>{Ut(),this.#i=!1,u.useFrame(()=>{this.#S&&(this.#S.style.cursor="")})},this.#ie=n=>{ve[this.#f](this.#d)&&(ur(),this.#l=-n.touches[0].clientX,this.#i=!0,this.#pe=this.#c)},this.#ue=()=>{Ut(),this.#i=!1},this.#ce=n=>{let s=-n.touches[0].clientX,i=this.#T?-s+this.#l:s-this.#l;this.#X(i),this.#l=s,this.#s&&n.cancelable&&n.defaultPrevented&&n.preventDefault()},this.#fe=n=>{Math.abs(this.#c-this.#pe)>this.#p&&n.preventDefault()}}init(){this.#n&&Qa(this.#oe.bind(this),this.#Z.bind(this),this.#V.bind(this),this.#me.bind(this))().then(()=>{this.#z(),this.#e&&this.#J(),u.useResize(({horizontalResize:t})=>this.onResize(t)),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#P?.(),this.#K.forEach(t=>{t.refresh()})})},3)})}#be(){[...this.#W].forEach(t=>t.setAttribute("draggable","false"))}#ge(){[...this.#W].forEach(t=>t.removeAttribute("draggable"))}#X(t){this.#s&&u.useFrame(()=>window.scrollBy({top:t,left:0,behavior:"instant"}))}#q(){let t=window.scrollY;this.#s=this.#t-this.#u<t&&this.#t+this.#h+this.#U>t+window.innerHeight}#J(){this.#o=u.useScroll(()=>this.#q()),this.#q(),this.#S.addEventListener("click",this.#fe,{passive:!1}),this.#S.addEventListener("mousedown",this.#ee,{passive:!0}),this.#S.addEventListener("mouseup",this.#Q,{passive:!0}),this.#S.addEventListener("mouseleave",this.#re,{passive:!0}),this.#S.addEventListener("touchstart",this.#ie,{passive:!0}),this.#S.addEventListener("touchend",this.#ue,{passive:!0}),this.#S.addEventListener("mousemove",this.#se,{passive:!0}),this.#S.addEventListener("touchmove",this.#ce,{passive:!0})}#j(){this.#o(),this.#S.removeEventListener("click",this.#fe),this.#S.removeEventListener("mousedown",this.#ee),this.#S.removeEventListener("mouseup",this.#Q),this.#S.removeEventListener("mouseleave",this.#re),this.#S.removeEventListener("touchstart",this.#ie),this.#S.removeEventListener("touchend",this.#ue),this.#S.removeEventListener("mousemove",this.#se),this.#S.removeEventListener("touchmove",this.#ce)}#Z(){return!this.#$||!this.#I||!this.#S?new Promise(t=>{t(!0)}):new Promise(t=>{u.useFrame(()=>{let r=this.#U;this.#te=100*(r-window.innerWidth)/r,r>0&&(this.#$.style.height=`${r}px`,this.#I.style.height=`${r}px`,this.#S.style.width=`${r}px`),t(!0)})})}#oe(){return new Promise(t=>{u.useFrame(()=>{if(!ve[this.#f](this.#d)){t(!0);return}this.#U=[...this.#Y].map(r=>ze(r)).reduce((r,o)=>r+o,0),t(!0)})})}#V(){return this.#$?new Promise(t=>{u.useFrame(()=>{if(!ve[this.#f](this.#d)||!this.#H){t(!0);return}let r=[...this.#H].map(o=>{let n=o.dataset.shadow,s=Object.hasOwn(o.dataset,"debug"),i=s?"debug":"",a=s?`left left : ${n}`:"",c=s?`in center : ${n}`:"",l=s?`center out : ${n}`:"",p=s?`in out : ${n}`:"";return` <div
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
                        </div>`}).join("");this.#$.innerHTML=r,t(!0)})}):new Promise(t=>{t(!0)})}#ne(){this.#$&&(this.#$.innerHTML="")}#me(){return new Promise(t=>{if(!ve[this.#f](this.#d)){t(!0);return}u.useFrame(()=>{this.#H&&([...this.#H].forEach(r=>{let o=this.#te/100,n=r.dataset.shadow,s=ze(r),i=le(this.#S),a=Co(this.#S)?.x??0,c=this.#T?this.#U-(r.getBoundingClientRect().right-a):r.getBoundingClientRect().left-a,l=window.innerWidth/window.innerHeight,p=window.innerWidth-window.innerHeight,h=c/l,f=c-c/l,d=this.#I.querySelector(`.${this.#M}[data-shadow="${n}"]`),y=d?.querySelector(`.${this.#M}--in-center`),v=d?.querySelector(`.${this.#M}--out-center`),T=d?.querySelector(`.${this.#M}--left`),S=d?.querySelector(`.${this.#M}--end`),_=window.innerWidth>window.innerHeight?window.innerHeight:0,E=window.innerWidth>window.innerHeight?window.innerHeight/2:0,x=c===0?0:h+f/o-p/o,w=(()=>{let A=window.innerWidth>window.innerHeight?p/o:p/o+window.innerWidth/l;return c===0?0:A})(),I=(()=>{let A=s/l,O=(s-s/l)/o;return A+O+w})(),N=I/2+E;this.#y&&(this.#$.style["margin-top"]=`-${i}px`),d&&(d.style.top=`${x}px`),y&&(y.style.height=`${N}px`),v&&(v.style.height=`${N}px`),v&&(v.style.top=`${N}px`),T&&(T.style.height=`${w}px`),S&&(S.style.height=`${I+_}px`),d&&(d.style.height=`${w}px`)}),t(!0))})})}#z(){if(!this.#$||!ve[this.#f](this.#d))return;let t=new ho({type:"scrolltrigger",item:this.#S,useWillChange:this.#a,trigger:this.#$,propierties:"x",breakpoint:"xSmall",pin:!this.#y,animatePin:this.#v,ease:this.#C,forceTranspond:this.#r,useThrottle:this.#k,easeType:this.#x,springConfig:"scroller",animateAtStart:this.#m,reverse:this.#T,dynamicRange:()=>-(this.#U-window.innerWidth),dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>this.#U},onTick:({value:r,parentIsMoving:o})=>{let n=r??0,s=Math.abs(-Math.round(n*100/(this.#U-window.innerWidth)));this.#c=n,this.#L&&this.#L({value:n,parentIsMoving:o,percent:this.#T?100-s:s}),this.#K.forEach(i=>{i.move({value:n,parentIsMoving:o})})},onEnter:this.#R,onEnterBack:this.#O,onLeave:this.#E,onLeaveBack:this.#A});t.init(),this.#D=!0,this.#G=t,this.#t=be(this.#$).top,this.#be()}#ye(){Qa(this.#oe.bind(this),this.#Z.bind(this),this.#V.bind(this),this.#me.bind(this))().then(()=>{this.#z(),this.#he()})}#he(){u.useFrameIndex(()=>{u.useNextTick(()=>{this.#b?.(),this.#K.forEach(t=>{t?.refresh?.()})})},3)}refresh(){return!this.#D||!ve[this.#f](this.#d)?new Promise(t=>t(!0)):new Promise(t=>{Qa(this.#oe.bind(this),this.#Z.bind(this),this.#me.bind(this))().then(()=>{this.#G?.stopMotion?.(),this.#t=be(this.#$).top,this.#D&&(this.#G?.refresh?.(),this.#he()),t(!0)})})}#de({destroyAll:t=!1}){(this.#D||t)&&(this.#G?.destroy?.(),this.#G=null,this.#$&&(this.#$.style.height=""),this.#I&&(this.#I.style.height=""),this.#$&&(this.#$.style.marginTop=""),this.#ne(),this.#ge(),this.#D=!1,u.useFrameIndex(()=>{if(this.#S&&(this.#S.style.width="",this.#S.style.transform=""),t&&this.#I){this.#e&&this.#j();let r=this.#I.querySelector(".scroller-style");r&&r.remove(),this.#I=null,this.#$=null,this.#S=null,this.#Y=[],this.#H=[],this.#P=Z,this.#b=Z,this.#L=Z,this.#R=Z,this.#O=Z,this.#E=Z,this.#A=Z,this.#G=null,this.#D=!1,this.#W=[],this.#I=null,this.#B=null,this.#$=null,this.#S=null,u.useNextTick(()=>{this.#F?.(),this.#F=Z,this.#K.forEach(o=>{o?.destroy?.(),o=null}),this.#K=[]})}},3))}onResize(t){this.#D&&ve[this.#f](this.#d)?t&&this.refresh():!this.#D&&ve[this.#f](this.#d)?this.#ye():this.#D&&!ve[this.#f](this.#d)&&this.#de({destroyAll:!1})}destroy(){this.#de({destroyAll:!0})}};var oi=new Map,sc=e=>{let t=u.checkType(Element,e);return t||console.warn(`slide utils ${e} is not a valid Dom element`),t},WI=e=>{let t=new Ar({ease:"easeOutQuad",data:{val:0}});return{tween:t,unsubscribe:t.subscribe(({val:r})=>{e.style.height=`${r}px`})}},$r={subscribe:n=>{if(!sc(n))return()=>{};if(oi.has(n))return console.warn(`slide utils ${n} is alredysubscribed`),()=>{};let i=WI(n);return oi.set(n,i),()=>{i.unsubscribe();let{tween:a}=i;a.destroy(),oi.delete(n)}},reset:n=>{sc(n)&&(n.style.height="0",n.style.overflow="hidden")},up:async n=>{if(!sc(n))return new Promise(c=>c(!0));let s=oi.get(n);if(!s)return console.warn("slide element not exist in slide store"),new Promise(c=>c(!0));let{tween:i}=s,a=le(n);await i.goFromTo({val:a},{val:0},{duration:500})},down:async n=>{if(!sc(n))return new Promise(l=>l(!0));let s=oi.get(n);if(!s)return console.warn("slide element not exist in slide store"),new Promise(l=>l(!0));let{tween:i}=s,{val:a}=i.get();n.style.height="auto";let c=le(n);n.style.height=`${a}px`,await i.goTo({val:c},{duration:500}),u.useNextTick(()=>{n.style.height="auto"})}};var _t=class{#n=!0;#t=0;#i=0;#l=0;#h=0;#u=0;#s=30;#c=0;#o=!1;#e=0;#p=0;#a;#d;#f;#r;#g;#m;#C;#x;#y;#v;#T;#k;#_;#w;#N;#R;#O;#E;#A;#P;#b;#F;#L;#I;#B;#$;#S;#Y;#H;#M;#W=!1;#D;#U;#G;#te=0;#K=0;#se;#ee;#Q;constructor(t){this.#a=Z,this.#d=Z,this.#f=Z,this.#r=Z,this.#g=Z,this.#m=Z,this.#C=Z,this.#x=Z,this.#y=Z,this.#v=Z,this.#T=Z,this.#k=Z,this.#_={},this.#w=Z,this.#N=Z,this.#R=Ws(t?.direction,"SmoothScroller"),this.#O=!1,this.#E=Va(t?.easeType??"","SmoothScroller"),this.#A=Wo(t?.breakpoint,"breakpoint","SmoothScroller"),this.#P=jo(t?.queryType,"queryType","SmoothScroller"),this.#b=u.checkType(String,t?.scroller)?document.querySelector(t.scroller):t.scroller,this.#b||(console.warn("SmoothScroller: scroller node not found"),this.#n=!1),this.#F=t?.screen?u.checkType(String,t.screen)?document.querySelector(t.screen):t.screen:document.documentElement,this.#F||(this.#n=!1,console.warn("SmoothScroller: screen node not found")),this.#L=de(t?.scopedEvent,"SmoothScroller: scopedEvent",!1),this.#I=ir(t?.speed,"SmoothScroller: speed",60),this.#B=de(t?.drag,"SmoothScroller: drag",!1),this.#$=ct(t?.onTick,"SmoothScroller: onTick",Z),this.#S=ct(t?.onUpdate,"SmoothScroller: onUpdate",Z),this.#Y=ct(t?.onSwipe,"SmoothScroller: onSwipe",Z),this.#ee=de(t?.useSwipe,"SmoothScroller: useSwipe",!1),this.#Q=de(t?.revertSwipeDirection,"SmoothScroller: revertSwipeDirection",!1),this.#se=de(t?.useHorizontalScroll,"SmoothScroller: useBothAxis",!1),this.#H=ct(t?.afterRefresh,"SmoothScroller: afterRefresh",Z),this.#M=ct(t?.afterInit,"SmoothScroller: afterInit",Z),this.#D=t?.children||[],this.#D.forEach(r=>{r.setScroller(this.#b),r.setDirection(this.#R),r.setScreen(this.#F),r.setBreakPoint(this.#A),r.setQueryType(this.#P),r.init()}),this.#U=r=>{this.#ie();let{spinY:o}=u.normalizeWheel(r);this.#J({spinY:o})},this.#G=r=>{let{clientX:o,clientY:n}=r.touches?r.touches[0]:r;this.#X({client:{x:o,y:n}})},this.#k=u.useMouseWheel(u.debounce(()=>{this.#re()},500))}#re(){this.#b&&this.#b.classList.remove("is-whelling")}#ie(){this.#b&&this.#b.classList.add("is-whelling")}#ue(){return this.#c>0}init(){this.#n&&(this.#E===b.EASE_SPRING?this.#_=new Tt:(this.#_=new Nr,this.#_.updateVelocity(.1)),this.#L&&(this.#b.addEventListener("wheel",this.#U,{passive:!0}),this.#b.addEventListener("mousemove",this.#G,{passive:!0}),this.#b.addEventListener("touchmove",this.#G,{passive:!0})),this.#L||(this.#x=u.useMouseWheel(t=>{this.#ce(t),this.#V(t)}),this.#y=u.useMouseMove(t=>this.#oe(t)),this.#v=u.useTouchMove(t=>this.#oe(t))),this.#a=u.useResize(()=>this.refresh()),this.#d=u.useScrollStart(()=>this.#ge()),this.#f=u.useScrollEnd(()=>this.#ge()),this.#r=u.useTouchStart(t=>this.#j(t)),this.#g=u.useTouchEnd(t=>this.#Z(t)),this.#m=u.useMouseDown(t=>this.#j(t)),this.#C=u.useMouseUp(t=>this.#Z(t)),this.#b.addEventListener("mouseleave",()=>{Ut()}),this.#B&&(this.#T=u.useMouseClick(({target:t,preventDefault:r})=>{this.#me({target:t,preventDefault:r})})),this.#be(),ve[this.#P](this.#A)&&(this.#fe(),this.#ge()),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#O||(this.#M?.({shouldScroll:this.#ue()}),this.#D.forEach(t=>{t.refresh()}))})},3))}#ce({pixelX:t}){if(!(!this.#ee||!t||this.#W||this.#Y.length===0)&&Math.abs(t)>40){this.#W=!0;let r=t>0?-1:1,o=this.#Q?r:r*-1;this.#Y({direction:o,move:n=>this.move(n).catch(()=>{})}),setTimeout(()=>{this.#W=!1},500)}}#fe(){if(!this.#b)return;this.#b.style["user-select"]="none",[...this.#b.querySelectorAll("a, button")].forEach(r=>{r.setAttribute("draggable","false"),r.style["user-select"]="none"})}#pe(){if(!this.#b)return;this.#b.style["user-select"]="",[...this.#b.querySelectorAll("a, button")].forEach(r=>{r.removeAttribute("draggable"),r.style["user-select"]=""})}#be(){this.#_&&(this.#_.setData({val:0}),this.#w=this.#_.subscribe(({val:t})=>{this.#b.style.transform=this.#R==b.DIRECTION_VERTICAL?`translate3d(0px, 0px, 0px) translateY(${-Math.trunc(t)}px)`:`translate3d(0px, 0px, 0px) translateX(${-Math.trunc(t)}px)`,this.#D.forEach(r=>{r.triggerScrollStart()}),u.useNextTick(()=>{this.#$({value:-t,percent:this.#i,parentIsMoving:!0}),this.#D.forEach(r=>{r.move({value:-t,parentIsMoving:!0})})})}),this.#N=this.#_.onComplete(({val:t})=>{this.#b.style.transform=this.#R==b.DIRECTION_VERTICAL?`translateY(${-Math.trunc(t)}px)`:`translateX(${-Math.trunc(t)}px)`,u.useNextTick(()=>{this.#$({value:-t,percent:this.#i,parentIsMoving:!1}),this.#D.forEach(r=>{r.triggerScrollEnd(),r.move({value:-t,parentIsMoving:!1})})})}))}#ge(){this.#F&&(this.#l=this.#F===document.documentElement?window.innerWidth:ze(this.#F),this.#h=this.#F===document.documentElement?window.innerHeight:le(this.#F),this.#c=this.#R===b.DIRECTION_VERTICAL?this.#b.offsetHeight-this.#h:this.#b.offsetWidth-this.#l,this.#ne())}#X({client:t}){!this.#o||!this.#B||(this.#e=this.#p,this.#p=this.#z({x:t?.x??0,y:t?.y??0}),this.#t+=Math.round(this.#e-this.#p),this.#ne())}#q(){return this.#R===b.DIRECTION_HORIZONTAL?this.#l/1920:this.#h/1080}#J({spinY:t=0}){if(!ve[this.#P](this.#A))return;this.#o=!1;let r=this.#q(),o=nt(t,-1,1);this.#t+=o*this.#I*r,this.#ne()}#j({target:t,client:r}){ve[this.#P](this.#A)&&(t===this.#b||ns(this.#b,t))&&(this.#u=this.#t,this.#o=!0,this.#e=this.#z({x:r?.x??0,y:r?.y??0}),this.#p=this.#z({x:r?.x??0,y:r?.y??0}))}#Z(){this.#o=!1}#oe({target:t,client:r,preventDefault:o}){if((t===this.#b||ns(this.#b,t))&&this.#o&&this.#B){o(),this.#e=this.#p,this.#p=this.#z({x:r?.x??0,y:r?.y??0});let n=Math.round(this.#e-this.#p);this.#t+=n,this.#ne()}}#V({target:t,spinY:r=0,spinX:o=0,preventDefault:n}){if(ve[this.#P](this.#A)&&(this.#ie(),t===this.#b||ns(this.#b,t))){this.#o=!1,n?.(),ur();let s=Math.abs(this.#te-o),i=Math.abs(this.#K-r),a=this.#se&&!this.#ee&&s>i?o:r;if(Math.abs(a)===0)return;let c=this.#q();this.#t+=nt(a,-1,1)*this.#I*nt(c,1,10),this.#ne(),this.#K=r,this.#te=o}}move(t){return ve[this.#P](this.#A)?(this.#i=t,this.#t=this.#i*this.#c/100,this.#_.goTo({val:this.#t})):new Promise(r=>r())}set(t){ve[this.#P](this.#A)&&(this.#i=t,this.#t=this.#i*this.#c/100,this.#_.set({val:this.#t}))}#ne(){let t=this.#t*100/this.#c;this.#i=nt(t,0,100),this.#t=nt(this.#t,0,this.#c),this.#_.goTo({val:this.#t}).catch(()=>{}),this.#S?.({value:-this.#t,percent:this.#i,parentIsMoving:!0})}#me({target:t,preventDefault:r}){ve[this.#P](this.#A)&&(t===this.#b||ns(this.#b,t))&&Math.abs(this.#t-this.#u)>this.#s&&r()}#z({x:t,y:r}){return!t||!r?0:this.#R===b.DIRECTION_VERTICAL?r:t}refresh(){if(!ve[this.#P](this.#A)){this.#pe(),this.#_?.stop?.(),u.useFrame(()=>{u.useNextTick(()=>{this.#b.style.transform=""})});return}this.#ge(),this.#fe(),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#H?.({shouldScroll:this.#ue()}),this.#D.forEach(t=>{t.refresh()})})},2)}destroy(){this.#O=!0,this.#pe(),this.#a(),this.#d(),this.#f(),this.#r(),this.#g(),this.#m(),this.#C(),this.#x(),this.#y(),this.#v(),this.#T(),this.#w(),this.#N(),this.#k(),this.#_?.destroy(),this.#_=null,this.#D.forEach(t=>{t?.destroy?.()}),this.#D=[],this.#$=Z,this.#S=Z,this.#H=Z,this.#M=Z,this.#L&&(this.#b?.removeEventListener("wheel",this.#U),this.#b?.removeEventListener("mousemove",this.#G),this.#b?.removeEventListener("touchmove",this.#G)),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#b=null,this.#F=null})},3)}};var Ny=!1,jI=new Set(["scrollerN0","scrollerN1"]),Ay=()=>{let e=document.querySelector("#root");e&&(oc({rootElement:e}),m.mainStore.watch("beforeRouteChange",()=>{ur(),My()}),m.mainStore.watch("afterRouteChange",()=>{let t=m.getActiveRoute()?.route;Ny=jI.has(t),u.useFrameIndex(()=>{if(Ny){Hu();return}!ky()&&oc({rootElement:e}),Zs()},30)}))};function Oy(){let e=navigator.userAgent,t=document.body;if(/chrome|chromium|crios/i.test(e)){t.classList.add("is-chrome");return}if(/firefox|fxios/i.test(e)){t.classList.add("is-firefox");return}if(/safari/i.test(e)){t.classList.add("is-safari");return}if(/edg/i.test(e)){t.classList.add("is-edge");return}}var ne=async({source:e})=>{let t=await fetch(e);if(!t.ok)return console.warn(`${e} not found`),{success:!1,data:""};let r={};try{r=await t.text()}catch(o){return console.warn(o),{success:!1,data:r}}return{success:!0,data:r}},At=async({source:e})=>{let t=await fetch(e);if(!t.ok)return console.warn(`${e} not found`),{success:!1,data:""};let r={};try{r=await t.json()}catch(o){return console.warn(o),{success:!1,data:r}}return{success:!0,data:r}};function Gt(e,t){return Math.floor(Math.random()*(t-e+1)+e)}var $y=e=>new XMLSerializer().serializeToString(e).replaceAll(' xmlns="http://www.w3.org/1999/xhtml"',"");var Ly,Dy={},zI="./asset/svg/icons/",HI=[{name:"gitHubIcon",source:"icon-github.svg"},{name:"searchIcons",source:"search.svg"},{name:"historyIcons",source:"history.svg"},{name:"starOutline",source:"star-outline.svg"},{name:"previous",source:"previous.svg"},{name:"close",source:"close.svg"},{name:"up",source:"up.svg"},{name:"swap",source:"swap.svg"},{name:"selectAll",source:"select-all.svg"}],pr=()=>Ly,Un=()=>Dy,Fy=async()=>{let{success:e,data:t}=await At({source:"./data/common.json"});e||console.warn("data fail to load"),Ly=t},By=async()=>{let e=HI.map(({name:r,source:o})=>ne({source:`${zI}${o}`}).then(n=>({name:r,result:n})));Dy=(await Promise.all(e)).map(({name:r,result:o})=>o.success?{name:r,data:o.data}:{name:r,data:"icon load error"}).reduce((r,{name:o,data:n})=>({...r,[o]:n}),{})};var Vy=()=>g`
        <div class="error-page">
            <div class="error-page__content">
                <h1 class="error-page__title title-big">Page not found</h1>
                <a class="error-page__link" href="./#home">back to home</a>
            </div>
        </div>
    `;var Wy=({screenElement:e,scrollerElement:t,hideControls:r})=>{let o=new _t({screen:e,scroller:t,direction:"horizontal",drag:!0,useHorizontalScroll:!0,easeType:"lerp",breakpoint:"small",afterInit:({shouldScroll:n})=>{r(n)},afterRefresh:({shouldScroll:n})=>{r(n)}});return o.init(),{destroy:()=>{o.destroy()},refresh:()=>{o.refresh()}}};var UI=e=>e<10?`0${e}`:`${e}`,jy=({setRef:e,getRef:t,onMount:r,bindEffect:o,getProxi:n})=>{let s=n(),i=()=>{},a=()=>{};return r(()=>{let{screenElement:c,scrollerElement:l}=t();return{destroy:i,refresh:a}=Wy({screenElement:c,scrollerElement:l,hideControls:p=>{s.showControls=p}}),u.useNextLoop(()=>{a()}),setTimeout(()=>{"isMounted"in s&&(s.isMounted=!0)},500),()=>{i(),i=()=>{},a=()=>{}}}),g`<div class="l-links">
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
                                                >${UI(l)}</span
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
    </div>`};var zy=m.createComponent({tag:"layout-links",component:jy,props:{title:()=>({value:"",type:String}),items:()=>({value:[],type:Array})},state:{isMounted:()=>({value:!1,type:Boolean}),showControls:()=>({value:!1,type:Boolean})}});m.useComponent([zy]);var ic=async({props:e})=>{let{source:t}=e,{data:r}=await At({source:t});return g` <div class="l-links">
        <layout-links
            ${m.staticProps({title:r.title,items:r.items})}
        ></layout-links>
    </div>`};var Hy=()=>g`
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
    `;var ac=m.createComponent({tag:"doc-container",component:Hy});var Uy=()=>g`
        <div class="c-doc-title">
            <h2><mobjs-slot></mobjs-slot></h2>
        </div>
    `;var cc=m.createComponent({tag:"doc-title",component:Uy,state:{}});var Gy=()=>g`
        <div class="c-doc-title-small">
            <mobjs-slot></mobjs-slot>
        </div>
    `;var lc=m.createComponent({tag:"doc-title-small",component:Gy,state:{}});var hT=MC(mT(),1);var rp=hT.default;var dT="[A-Za-z$_][0-9A-Za-z$_]*",$M=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],LM=["true","false","null","undefined","NaN","Infinity"],fT=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],gT=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],bT=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],DM=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],FM=[].concat(bT,fT,gT);function vT(e){let t=e.regex,r=(F,{after:B})=>{let V="</"+F[0].slice(1);return F.input.indexOf(V,B)!==-1},o=dT,n={begin:"<>",end:"</>"},s=/<[A-Za-z0-9\\._:-]+\s*\/>/,i={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(F,B)=>{let V=F[0].length+F.index,U=F.input[V];if(U==="<"||U===","){B.ignoreMatch();return}U===">"&&(r(F,{after:V})||B.ignoreMatch());let te,ce=F.input.substring(V);if(te=ce.match(/^\s*=/)){B.ignoreMatch();return}if((te=ce.match(/^\s+extends\s+/))&&te.index===0){B.ignoreMatch();return}}},a={$pattern:dT,keyword:$M,literal:LM,built_in:FM,"variable.language":DM},c="[0-9](_?[0-9])*",l=`\\.(${c})`,p="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",h={className:"number",variants:[{begin:`(\\b(${p})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${p})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},f={className:"subst",begin:"\\$\\{",end:"\\}",keywords:a,contains:[]},d={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"xml"}},y={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"css"}},v={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"graphql"}},T={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,f]},_={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},E=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,d,y,v,T,{match:/\$\d+/},h];f.contains=E.concat({begin:/\{/,end:/\}/,keywords:a,contains:["self"].concat(E)});let x=[].concat(_,f.contains),w=x.concat([{begin:/(\s*)\(/,end:/\)/,keywords:a,contains:["self"].concat(x)}]),I={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:w},N={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},A={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...fT,...gT]}},O={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},R={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[I],illegal:/%/},P={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function $(F){return t.concat("(?!",F.join("|"),")")}let D={match:t.concat(/\b/,$([...bT,"super","import"].map(F=>`${F}\\s*\\(`)),o,t.lookahead(/\s*\(/)),className:"title.function",relevance:0},k={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},L={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},I]},C="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",M={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(C)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[I]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:a,exports:{PARAMS_CONTAINS:w,CLASS_REFERENCE:A},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),O,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,d,y,v,T,_,{match:/\$\d+/},h,A,{scope:"attr",match:o+t.lookahead(":"),relevance:0},M,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[_,e.REGEXP_MODE,{className:"function",begin:C,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:w}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:n.begin,end:n.end},{match:s},{begin:i.begin,"on:begin":i.isTrulyOpeningTag,end:i.end}],subLanguage:"xml",contains:[{begin:i.begin,end:i.end,skip:!0,contains:["self"]}]}]},R,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[I,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},k,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[I]},D,P,N,L,{match:/\$[(.]/}]}}rp.registerLanguage("javascript",vT);var yT=async({ref:e,source:t})=>{if(!e)return;let{success:r,data:o}=await ne({source:t});if(!r){e.textContent="something went wrong";return}e.textContent=o,rp.highlightElement(e),e.style.height=""},BM=()=>getComputedStyle(document.documentElement).getPropertyValue("--snippet-line-height-value"),TT=({onMount:e,setRef:t,getRef:r,delegateEvents:o,bindEffect:n,getProxi:s,bindObject:i})=>{let a=s(),c=BM(),l="20rem",p=Number(a.numLines)>15,h=p?"use-expand":"",f=`${a.numLines*Number(c)}rem`;return e(async()=>{let{codeEl:d}=r();return a.awaitLoad?await yT({ref:d,source:a.source}):yT({ref:d,source:a.source}),()=>{}}),g`<div
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
            class="snippet__expand ${h}"
            ${!p&&"disabled"}
            ${o({click:()=>{a.isExpanded=!a.isExpanded}})}
        >
            ${i`${()=>a.isExpanded?"close":"expand"}`}
        </button>
    </div>`};var _T=m.createComponent({tag:"mob-snippet",component:TT,props:{source:()=>({value:"",type:String}),numLines:()=>({value:1,type:Number}),awaitLoad:()=>({value:!1,type:Boolean})},state:{contentIsLoaded:()=>({value:!1,type:Boolean}),isExpanded:()=>({value:!1,type:Boolean})}});var ii="debug_component",dc="debug_filter_list",fc="debug_overlay",gc="debug_tree",ai="quick_nav",ci="scroll_down_label",li="scroll_to",ST="header",bc="mob_navigation",ui="mob_navigation_container",vc="search_overlay",pi="search_overlay_list",Uo="search_overlay_header",yc="right-sidebar",Tc="route-loader";var xT=({id:e,label:t,element:r,isSection:o,isNote:n})=>{m.useMethodByName(li)?.addItem?.({id:e,label:t,element:r,isSection:o,isNote:n})},CT=e=>{m.useMethodByName(li)?.setActiveLabel?.(e)};function VM({label:e}){return e?.length>0}var WM=async({id:e,label:t,element:r,isSection:o,isNote:n})=>{await m.tick(),xT({id:e,label:t,element:r,isSection:o,isNote:n}),Rp(r)&&!o&&CT(t)},ET=({getState:e,onMount:t})=>{let{style:r,line:o,id:n,label:s,isSection:i,isNote:a}=e(),c=o?"spacer--line":"";return t(({element:l})=>{VM({label:s})&&WM({id:n,label:s,element:l,isSection:i,isNote:a})}),g`<div id="${n}" class="spacer spacer--${r} ${c}">
        <span></span>
    </div>`};var wT=m.createComponent({tag:"mob-spacer",component:ET,props:{style:()=>({value:"x-small",type:String,validate:e=>["x-small","small","medium","big"].includes(e),strict:!0}),line:()=>({value:!1,type:Boolean}),id:()=>({value:"",type:String}),label:()=>({value:"",type:String}),isSection:()=>({value:!1,type:Boolean}),isNote:()=>({value:!1,type:Boolean})}});var IT=({getState:e,delegateEvents:t})=>{let{content:r,anchor:o}=e();return g`<div>
        <button
            type="button"
            class="anchor-button"
            ${t({click:()=>{let n=document.querySelector(o);if(!n)return;let s=be(n).top-50;Or.to(s)}})}
        >
            ${r}
            <span class="anchor-button__arrow">
                <span class="anchor-button__arrow__start"></span>
                <span class="anchor-button__arrow__end"></span>
            </span>
        </button>
    </div>`};var MT=m.createComponent({tag:"anchor-button",component:IT,props:{anchor:()=>({value:"",type:String}),content:()=>({value:"",type:String})}});var jM=({items:e,links:t})=>t?e.map(({label:r,url:o})=>g`<li>
                          <a href="${o}" class="list-links">
                              ${r}
                              <span class="list-links__arrow">
                                  <span class="list-links__arrow__start"></span>
                                  <span class="list-links__arrow__end"></span>
                              </span>
                          </a>
                      </li>`).join(""):e.map(r=>g` <li>${r}</li> `).join(""),kT=({getState:e})=>{let{style:t,color:r,items:o,links:n}=e(),s=`is-${r}`;return g`<ul class="ul ul--${t} ${s} ${n?"use-links":"use-default"}">
        ${jM({items:o,links:n})}
    </ul>`};var RT=m.createComponent({tag:"mob-list",component:kT,props:{style:()=>({value:"medium",type:String,validate:e=>["small","medium","big"].includes(e),strict:!0}),dots:()=>({value:!0,type:Boolean}),links:()=>({value:!1,type:Boolean}),color:()=>({value:"black",type:String,validate:e=>["white","black","grey","hightlight"].includes(e)}),items:()=>({value:[],type:Array})}});var PT=({getState:e})=>{let{style:t,color:r,boxed:o,note:n}=e(),s=r==="inherit"?"":`is-${r}`;return g`<p
        class="p p--${t} ${o?"p--boxed":""} ${n?"p--note":""} ${s}"
    >
        <mobjs-slot></mobjs-slot>
    </p>`};var NT=m.createComponent({tag:"mob-paragraph",component:PT,props:{style:()=>({value:"medium",type:String,validate:e=>["small","medium","big"].includes(e),strict:!0}),color:()=>({value:"inherit",type:String,validate:e=>["inherit","white","hightlight","black"].includes(e)}),boxed:()=>({value:!1,type:Boolean}),note:()=>({value:!1,type:Boolean})}});var zM=e=>e.length>0?g`<span class="title-index">${e}</span>`:"",AT=({getProxi:e})=>{let t=e(),r=t.color==="inherit"?"":`is-${t.color}`,o=t.isBold?"is-bold":"",n=t.isSection?"is-section":"";return g`<${t.tag} class="${r} ${o} ${n}">
            ${zM(t.index)}
            <span class="title-content">
                <mobjs-slot></mobjs-slot>
            </span>
        </${t.tag}>`};var OT=m.createComponent({tag:"mob-title",component:AT,props:{tag:()=>({value:"h1",type:String}),color:()=>({value:"inherit",type:String,validate:e=>["inherit","white","black"].includes(e)}),isSection:()=>({value:!1,type:Boolean}),isBold:()=>({value:!1,type:Boolean}),index:()=>({value:"",type:String})}});var HM=({data:e,staticProps:t,awaitLoadSnippet:r})=>e.map(o=>{let{component:n,props:s,content:i}=o;return g`
                <${n} ${t({...s,awaitLoad:r})}>
                    ${i??""}
                </${n}>
            `}).join(""),UM=async({source:e,data:t})=>{if(t&&t.length>0)return t;let{success:r,data:o}=await At({source:e});return r?o.data:[]},$T=async({getState:e,staticProps:t})=>{let{source:r,data:o}=e(),n=await UM({source:r,data:o}),{awaitLoadSnippet:s,usePadding:i}=e();return g`
        <section class="html-content ${i?"use-padding":""}">
            ${HM({data:n,staticProps:t,awaitLoadSnippet:s})}
        </section>
    `};var GM=async({proxi:e})=>{let{success:t,data:r}=await ne({source:e.url});t&&(e.source=r)},LT=({getProxi:e,invalidate:t,onMount:r})=>{let o=e();return r(()=>{GM({proxi:o})}),g`
        <div class="c-doc-svg ${o.className}">
            ${t({observe:()=>o.source,render:()=>o.source})}
        </div>
    `};var DT=m.createComponent({tag:"doc-svg",component:LT,props:{className:()=>({value:"",type:String}),url:()=>({value:"",type:String})},state:{source:()=>({value:g`<span class="c-doc-svg__loading">
                    loading image ...
                </span>`,type:String})}});var _c=m.createComponent({tag:"html-content",component:$T,props:{source:()=>({value:"",type:String}),data:()=>({value:[],type:Array}),awaitLoadSnippet:()=>({value:!1,type:Boolean}),useTriangle:()=>({value:!0,type:Boolean}),usePadding:()=>({value:!0,type:Boolean})},child:[RT,NT,OT,_T,wT,MT,DT]});var FT=({bindEffect:e,getProxi:t})=>{let r=t(),o=r.isSection?"is-section":"",n=r.isNote?"is-note":"";return g`
        <button
            type="button"
            class="${o} ${n}"
            ${e({toggleClass:{active:()=>r.active}})}
        >
            <span>${r.label}</span>
        </button>
    `};var BT=m.createComponent({tag:"scroll-to-button",component:FT,props:{label:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean}),isSection:()=>({value:!1,type:Boolean}),isNote:()=>({value:!1,type:Boolean})}});var mi=!1;function qM({delegateEvents:e,bindProps:t,proxi:r}){return r.anchorItems.map(o=>{let n=o.isSection||o.isNote?"":e({click:async()=>{let{id:s,label:i,element:a}=o,c=s==="start"?0:be(a).top-50;mi=!0,r.activeLabel=i,await Or.to(c),setTimeout(()=>{mi=!1},1e3)}});return g`
                <li>
                    <scroll-to-button
                        ${n}
                        ${t(()=>({active:r.activeLabel===o.label,label:o.label,isSection:o.isSection??!1,isNote:o.isNote??!1}))}
                    >
                    </scroll-to-button>
                </li>
            `}).join("")}var VT=({proxi:e,direction:t,winHeight:r})=>{u.useFrame(()=>{u.useNextTick(()=>{if("anchorItems"in e){if(t==="DOWN"){let o=e.anchorItems.findLast(({top:n,isNote:s})=>!s&&n<window.scrollY+r-200);e.activeLabel=o?o.label:""}if(t==="UP"){let o=e.anchorItems.findLast(({top:n,isNote:s})=>!s&&n<window.scrollY+200);e.activeLabel=o?o.label:""}}})})},WT=({onMount:e,delegateEvents:t,bindProps:r,invalidate:o,computed:n,addMethod:s,updateState:i,getProxi:a})=>{let c=a(),l="DOWN",p=window.innerHeight;return s("addItem",({id:h,label:f,element:d,isSection:y,isNote:v})=>{i("anchorItemsToBeComputed",T=>[...T,{id:h,label:f,element:d,isSection:y,isNote:v}])}),s("setActiveLabel",h=>{mi||(c.activeLabel=h)}),e(()=>{if(ue.mq("max","desktop"))return;n(()=>c.anchorItems,()=>c.anchorItemsToBeComputed.map(v=>({...v,top:be(v.element).top})));let h=u.useScrollThrottle(({direction:v})=>l=v),f=new ResizeObserver(u.debounce(()=>{u.useFrame(()=>{u.useNextTick(()=>{p=window.innerHeight})}),"anchorItems"in c&&c.anchorItems.forEach(v=>{v.top=be(v.element).top})},200));f.observe(m.getRoot());let d=c.updateAnchorOnWheel?u.useMouseWheel(u.debounce(()=>{mi||VT({proxi:c,direction:l,winHeight:p})},600)):()=>{},y=u.useScrollEnd(()=>{mi||VT({proxi:c,direction:l,winHeight:p})});return()=>{d(),h(),y(),f.unobserve(m.getRoot()),f.disconnect(),f=null}}),g`
        <div class="c-scroll-to">
            <ul>
                ${o({observe:()=>c.anchorItems,render:()=>qM({delegateEvents:t,bindProps:r,proxi:c})})}
            </ul>
        </div>
    `};var jT=m.createComponent({tag:"scroll-to",component:WT,state:{activeLabel:()=>({value:"",type:String}),updateAnchorOnWheel:()=>({value:!1,type:Boolean}),anchorItemsToBeComputed:()=>({value:[],type:Array}),anchorItems:()=>({value:[],type:Array,transform:e=>e.toSorted(function(t,r){let{element:o}=t,{element:n}=r;return o===n||!o||!n?0:o.compareDocumentPosition(n)&2?1:-1})})},child:[BT]});var Sc=({breadCrumbs:e})=>e.map((t,r)=>r===e.length-1?g`<a href="${t.url}" class="breadcrumbs__arrow">
                          <div class="breadcrumbs__arrow__start"></div>
                          <div class="breadcrumbs__arrow__end"></div>
                      </a>
                      <a class="breadcrumbs__link" href="${t.url}"
                          >${t.title}</a
                      >`:g`<a class="breadcrumbs__link" href="${t.url}"
                      >${t.title}</a
                  >`).join("");var xc=e=>{m.useMethodByName(yc)?.updateList(e??[])};m.useComponent([ac,lc,jT,cc,_c]);var Be=async({props:e})=>{let{source:t,title:r,breadCrumbs:o,rightSidebar:n}=e,{data:s}=await At({source:t});return xc(n??[]),g` <doc-container>
        <div>
            <html-content
                slot="docs"
                ${m.staticProps({data:s.data,useMaxWidth:!0})}
            ></html-content>
            <doc-title-small slot="section-title-small"
                ><div>
                    ${Sc({breadCrumbs:o})}<span>${r}</span>
                </div></doc-title-small
            >
            <scroll-to name="${li}" slot="section-links"></scroll-to>
            <doc-title slot="section-title">${r}</doc-title>
        </div>
    </doc-container>`};m.useComponent([ac,lc,cc,_c]);var ae=async({props:e})=>{let{source:t,title:r,breadCrumbs:o,rightSidebar:n}=e,{data:s}=await At({source:t});return xc(n??[]),g`<doc-container>
        <div>
            <html-content
                slot="docs"
                ${m.staticProps({data:s.data,useMaxWidth:!0})}
            ></html-content>
            <doc-title-small slot="section-title-small"
                ><div>
                    ${Sc({breadCrumbs:o})}<span>${r}</span>
                </div></doc-title-small
            >
            <doc-title slot="section-title">${r}</doc-title>
        </div>
    </doc-container>`};var zT=({weakPathElement:e,weakScrollerElement:t,wrapElement:r,setActiveItem:o,weakScreenElement:n})=>{let s={ax:53,ay:70,bx:64,by:80,cx:89,cy:87,dx:100,dy:100,ex:0,ey:100,fx:10,fy:77,gx:17,gy:84},i={ax:-1,ay:-1,bx:1,by:1,cx:-1,cy:-1,dx:1,dy:1,ex:1,ey:1,fx:-1,fy:-1,gx:1,gy:1},a=H.createSequencer({data:{...s}});a.goTo({fy:90,ay:90,cy:70},{start:0,end:3.5}).goTo({gy:70,by:80},{start:2,end:5}).goTo({fy:90,ay:100,cy:90},{start:4,end:7.5}).goTo({ay:120,fy:80,cy:80},{start:7.5,end:10}).goTo({gy:100,by:100},{start:6,end:10}).add(()=>{o(1)},0).add(({direction:d,isForced:y})=>{y||d==="backward"||o(2)},1.5).add(({direction:d,isForced:y})=>{y||d==="backward"||o(3)},5.5).add(({direction:d,isForced:y})=>{y||d==="backward"||o(4)},9.5).add(({direction:d,isForced:y})=>{y||d==="forward"||o(1)},1.5).add(({direction:d,isForced:y})=>{y||d==="forward"||o(2)},5).add(({direction:d,isForced:y})=>{y||d==="forward"||o(3)},9),a.subscribe(({ax:d,ay:y,bx:v,by:T,cx:S,cy:_,dx:E,dy:x,ex:w,ey:I,fx:N,fy:A,gx:O,gy:R})=>{s.ax=d,s.ay=y,s.bx=v,s.by=T,s.cx=S,s.cy=_,s.dx=E,s.dy=x,s.ex=w,s.ey=I,s.fx=N,s.fy=A,s.gx=O,s.gy=R});let c=H.createTimeTween({data:{...i}});c.subscribe(({ax:d,ay:y,bx:v,by:T,cx:S,cy:_,dx:E,dy:x,ex:w,ey:I,fx:N,fy:A,gx:O,gy:R})=>{i.ax=d,i.ay=y,i.bx=v,i.by=T,i.cx=S,i.cy=_,i.dx=E,i.dy=x,i.ex=w,i.ey=I,i.fx=N,i.fy=A,i.gx=O,i.gy=R});let l=Me.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(c,{ax:()=>Gt(-3,3),ay:()=>Gt(-3,3),bx:()=>Gt(-3,3),by:()=>Gt(-3,3),cx:()=>Gt(-3,3),cy:()=>Gt(-3,3),dx:()=>0,dy:()=>0,ex:()=>0,ey:()=>0,fx:()=>Gt(-3,3),fy:()=>Gt(-3,3),gx:()=>Gt(-3,3),gy:()=>Gt(-3,3)},{duration:3e3});l.play();let p=!0,h=()=>{if(!p)return;let d={x:s.ax+i.ax,y:s.ay+i.ay},y={x:s.bx+i.bx,y:s.by+i.by},v={x:s.cx+i.cx,y:s.cy+i.cy},T={x:s.dx+i.dx,y:s.dy+i.dy},S={x:s.ex+i.ex,y:s.ey+i.ey},_={x:s.fx+i.fx,y:s.fy+i.fy},E={x:s.gx+i.gx,y:s.gy+i.gy};e.deref()&&(e.deref().style.clipPath=`polygon(${d.x}% ${d.y}%, ${y.x}% ${y.y}%, ${v.x}% ${v.y}%, ${T.x}% ${T.y}%,${S.x}% ${S.y}%,${_.x}% ${_.y}%,${E.x}% ${E.y}%)`,u.useNextFrame(()=>h()))};u.useFrame(()=>h());let f=Ke.createScrollTrigger({item:r,dynamicStart:{position:"right",value:()=>ze(n?.deref()??document.createElement("div"))},dynamicEnd:{position:"right",value:()=>ze(t?.deref()??document.createElement("div"))??0},reverse:!1,propierties:"tween",ease:!1,tween:a});return{pathScroller:f,pathSequencer:a,pathTween:c,pathTimeline:l,stopLoop:()=>{p=!1},destroy:()=>{f.destroy(),f=null,a.destroy(),a=null,c.destroy(),c=null,l.destroy(),l=null}}};var HT=({title_1:e,title_2:t})=>{let r=H.createScrollerTween({from:{x:0},to:{x:30}});r.subscribe(({x:i})=>{e.style.transform=`translate3d(0,0,0) translate(${i}px, 0px)`}),r.onStop(({x:i})=>{e.style.transform=`translate(${i}px, 0px)`});let o=Ke.createParallax({item:e,propierties:"tween",tween:r,ease:!1,align:"start"}),n=H.createScrollerTween({from:{x:0},to:{x:-30}});n.subscribe(({x:i})=>{t.style.transform=`translate3d(0,0,0) translateX(${i}px)`}),n.onStop(({x:i})=>{t.style.transform=`translateX(${i}px)`});let s=Ke.createParallax({item:t,propierties:"tween",tween:n,ease:!1,align:"start"});return{title1parallax:o,title2parallax:s,title1tween:r,title2tween:n}};var Cc=({title:e})=>{let t=H.createScrollerTween({from:{x:0},to:{x:-60}});t.subscribe(({x:o})=>{e.deref()&&(e.deref().style.transform=`translate3d(0,0,0) translateX(${o}px)`)}),t.onStop(({x:o})=>{e.deref()&&(e.deref().style.transform=`translateX(${o}px)`)});let r=Ke.createParallax({item:e.deref(),propierties:"tween",tween:t,ease:!1,align:"center"});return{sectionContentScroller:r,destroy:()=>{r.destroy(),r=null}}};var UT=({screenElement:e,scrollerElement:t,pathElement:r,wrapElement:o,title_1:n,title_2:s,section2_title:i,section3_title:a,section4_title:c,setActiveItem:l,onMove:p,onScrollEnd:h})=>{let f=new WeakRef(t),d=new WeakRef(i),y=new WeakRef(a),v=new WeakRef(c),T=new WeakRef(r),S=new WeakRef(e),{pathScroller:_,pathSequencer:E,pathTimeline:x,pathTween:w,stopLoop:I,destroy:N}=zT({weakPathElement:T,weakScrollerElement:f,wrapElement:o,setActiveItem:l,weakScreenElement:S}),{title1parallax:A,title2parallax:O,title1tween:R,title2tween:P}=HT({title_1:n,title_2:s}),{sectionContentScroller:$,destroy:D}=Cc({title:d}),{sectionContentScroller:k,destroy:L}=Cc({title:y}),{sectionContentScroller:C,destroy:M}=Cc({title:v}),F=new _t({screen:e,scroller:t,direction:"horizontal",drag:!0,easeType:"lerp",breakpoint:"small",useHorizontalScroll:!0,useSwipe:!1,revertSwipeDirection:!1,children:[_,A,O,$,k,C],onUpdate:({value:B})=>{p(B),h()}});return F.init(),setTimeout(()=>{F?.refresh?.()},500),{goTo:B=>{!B&&B!==0||F?.move?.(B).catch(()=>{})},destroy:()=>{F.destroy(),F=null,E.destroy(),_.destroy(),x.destroy(),w.destroy(),A.destroy(),O.destroy(),R.destroy(),P.destroy(),$.destroy(),k.destroy(),I(),N(),D(),L(),M()}}};var GT=({elements:e})=>{let t=H.createSpring({data:{x:0},stagger:{each:5}});return e.map(o=>o.querySelector("svg")).forEach(o=>{o&&(t.subscribe(({x:n})=>{o.style.transform=`translate3D(0,0,0) translateY(${-n}px)`}),t.onComplete(({x:n})=>{o.style.transform=`translateY(${-n}px)`}))}),{svgSpring:t,destroySvgSpring:()=>{t.destroy(),t=null}}};var di=()=>{},hi=e=>Promise.resolve(e),Ec=()=>{},op={1:0,2:100/3,3:100/3*2,4:100},JM=({setRef:e,getState:t})=>{let{titleTop:r,titleBottom:o}=t().block_1;return g`
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
    `},YM=({setRef:e,getState:t})=>{let{title:r,copy:o}=t().block_2;return g`
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
    `},XM=({setRef:e,getState:t})=>{let{title:r,copy:o}=t().block_3;return g`
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
    `},KM=({setRef:e,getState:t})=>{let{title:r,items:o}=t().block_4;return g`
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
    `},QM=({proxi:e,delegateEvents:t,bindEffect:r})=>g`
        <ul class="l-about__nav">
            ${e.navItem.map(({index:o,label:n})=>g`
                        <li class="l-about__nav__item">
                            <button
                                class="l-about__nav__button"
                                ${t({click:()=>{di(op[o]),Ec()}})}
                                ${r({toggleClass:{active:()=>e.activenavItem===o}})}
                            >
                                ${n}
                            </button>
                        </li>
                    `).join("")}
        </ul>
    `,ZM=()=>g`
        <div class="l-about__square">
            <div class="l-about__square__legend"><h4>Scroll or Drag</h4></div>
            <span class="l-about__square__angle top-left"></span>
            <span class="l-about__square__angle top-right"></span>
            <span class="l-about__square__angle bottom-left"></span>
            <span class="l-about__square__angle bottom-right"></span>
        </div>
    `,qT=({onMount:e,setRef:t,getRef:r,getRefs:o,getState:n,bindEffect:s,delegateEvents:i,getProxi:a})=>{let c=a(),l=4,p=!1;return e(()=>{let{screenElement:h,scrollerElement:f,wrapElement:d,title_1:y,title_2:v,section2_title:T,section3_title:S,section4_title:_,pathElement:E}=r(),{svg:x}=o(),w=0,I=!1,N=0,{svgSpring:A,destroySvgSpring:O}=GT({elements:x});hi=async $=>{if(u.shouldMakeSomething()||p){A.stop(),p=!0,setTimeout(()=>{p=!1},2e3);return}let k=-Math.abs($/30);Number.isNaN(k)||await A.goTo({x:k}).catch(()=>{})},Ec=()=>{hi(3e3),setTimeout(()=>{hi(0)},500)};let{destroy:R,goTo:P}=UT({screenElement:h,scrollerElement:f,pathElement:E,wrapElement:d,title_1:y,title_2:v,section2_title:T,section3_title:S,section4_title:_,setActiveItem:$=>{c.activenavItem=$},onMove:$=>{I||(w=$),I=!0,N=w-$,hi(N)},onScrollEnd:u.useDebounce(()=>{I=!1,N=0,hi(N)},500)});return di=P,c.isMounted=!0,()=>{di=()=>{},R(),O()}}),g`<div
        class="l-about"
        style="--number-of-section:${l}"
        ${s({toggleClass:{active:()=>c.isMounted}})}
    >
        <div class="l-about__sqaure-container">${ZM()}</div>
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
                    ${JM({setRef:t,getState:n})}
                    ${YM({setRef:t,getState:n})}
                    ${XM({setRef:t,getState:n})}
                    ${KM({setRef:t,getState:n})}
                </div>
            </div>
        </div>
        <button
            type="button"
            class="l-about__prev"
            ${s({toggleAttribute:{disabled:()=>c.activenavItem==1}})}
            ${i({click:()=>{di(op[ue.clamp(c.activenavItem-1,1,4)]),Ec()}})}
        ></button>
        ${QM({bindEffect:s,delegateEvents:i,proxi:c})}
        <button
            type="button"
            class="l-about__next"
            ${s({toggleAttribute:{disabled:()=>c.activenavItem==4}})}
            ${i({click:()=>{di(op[ue.clamp(c.activenavItem+1,1,4)]),Ec()}})}
        ></button>
    </div>`};var JT=m.createComponent({tag:"about-component",component:qT,props:{block_1:()=>({value:{titleTop:"",titleBottom:""},type:"any"}),block_2:()=>({value:{title:"",copy:""},type:"any"}),block_3:()=>({value:{title:"",copy:""},type:"any"}),block_4:()=>({value:{title:"",items:[""]},type:"any"}),aboutSvg:()=>({value:"",type:String})},state:{navItem:()=>({value:[{index:1,label:"about"},{index:2,label:"why"},{index:3,label:"what"},{index:4,label:"inspiration"}],type:Array}),activenavItem:()=>({value:1,type:Number,transform:e=>ue.clamp(e,1,4)}),isMounted:()=>({value:!1,type:Boolean})}});m.useComponent([JT]);var YT=async()=>{let{data:e}=await At({source:"./data/about/index.json"}),{data:t}=await ne({source:"./asset/svg/about.svg?v=0.1"});return g`<about-component
        ${m.staticProps({block_1:e.block_1,block_2:e.block_2,block_3:e.block_3,block_4:e.block_4,aboutSvg:t})}
    ></about-component> `};var XT=({getProxi:e,bindObject:t,delegateEvents:r,onMount:o,id:n,bindEffect:s})=>{let i=e();return o(()=>()=>{}),g`<div
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
    </div> `};var wc=m.createComponent({tag:"benchmark-fake-component",component:XT,props:{counter:0,label:"",index:0},state:{isSelected:!1}});var ht=(e=1001)=>({state:{counter:()=>({value:0,type:Number}),data:()=>({value:[],type:Array,validate:t=>t.length<e,strict:!0,skipEqual:!1}),time:()=>({value:0,type:Number,transform:t=>Math.round(t),skipEqual:!1}),isLoading:()=>({value:!1,type:Boolean}),currentIndex:()=>({value:-1,type:Number})},child:[wc]});var sp=e=>{for(let t=e.length-1;t>0;t--){let r=Math.floor(Math.random()*(t+1));[e[t],e[r]]=[e[r],e[t]]}return e},fi=e=>{let t=u.checkType(Number,e)?e:0;return[...Array.from({length:t}).keys()].map(r=>({label:`comp-${r+1}`}))},np=({proxi:e,value:t,useShuffle:r=!1})=>{e.isLoading=!0,u.useFrameIndex(()=>{u.useNextTick(async()=>{let o=performance.now();e.data=r?sp(fi(t)):fi(t),await m.tick();let s=performance.now()-o;e.time=s,e.isLoading=!1})},2)},dt=({delegateEvents:e,setRef:t,getRef:r,bindEffect:o,proxi:n})=>g`
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
                ${e({keydown:s=>{if(s.keyCode===13){s.preventDefault();let i=Number(s.currentTarget?.value??0);np({proxi:n,value:i})}}})}
            />
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{let{input:s}=r(),i=Number(s?.value??0);np({proxi:n,value:i})}})}
            >
                Generate components
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{np({proxi:n,value:n.data.length,useShuffle:!0})}})}
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
    `;var KT=({onMount:e,delegateEvents:t,bindText:r,invalidate:o,getState:n,staticProps:s,setRef:i,getRef:a,bindProps:c,bindEffect:l,getProxi:p})=>{let h=p();return e(()=>()=>{a()?.input.remove()}),g`<div class="benchmark">
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
            ${dt({setRef:i,getRef:a,proxi:h,delegateEvents:t,bindEffect:l})}

            <div class="benchmark__head__time">
                ${r`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${o({observe:()=>h.data,render:()=>{let{data:f}=n();return g`
                        ${f.map(({label:d},y)=>g`
                                    <benchmark-fake-component
                                        ${s({label:d,index:y})}
                                        ${c(()=>({counter:h.counter}))}
                                    ></benchmark-fake-component>
                                `).join("")}
                    `}})}
        </div>
    </div>`};var QT=m.createComponent({tag:"benchmark-invalidate",component:KT,...ht()});var Ic=(e=1e3)=>g`
        <p>
            Generates and updates a large list of components with 5 reactive
            elements inside.<br />
            ( max component <strong>${e}</strong> ).
        </p>
    `;var ZT=({onMount:e,delegateEvents:t,bindObject:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindEffect:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">Repeat ( with key ):</h3>
            <h2 class="benchmark__head__title">
                Generate components performance
            </h2>
            ${Ic()}
            ${dt({setRef:o,getRef:n,delegateEvents:t,bindEffect:a,proxi:l})}

            <div class="benchmark__head__time">
                ${r`components generate in <strong>${()=>l.time}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${i({observe:()=>l.data,useSync:!0,key:"label",render:({sync:p,current:h})=>g`
                              <benchmark-fake-component
                                  ${s({observe:["counter"],props:({counter:f},d,y)=>({index:y,label:d.label,counter:f})})}
                                  ${p()}
                              >
                              </benchmark-fake-component>
                          `})}
        </div>
    </div>`};var e_=m.createComponent({tag:"benchmark-repeat-key",component:ZT,...ht()});var t_=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindObject:a,bindEffect:c,getProxi:l})=>{let p=l();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat ( nested with key ):
            </h3>
            <p class="benchmark__head__title">
                Repater without component with the same repeater with component
                inside<br />
                ( max value <strong>10</strong> ).
            </p>
            ${dt({setRef:o,getRef:n,delegateEvents:t,bindEffect:c,proxi:p})}

            <div class="benchmark__head__time">
                ${r`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${i({observe:()=>p.data,key:"label",useSync:!0,render:({current:h})=>g`<div class="benchmark__static-item">
                        <div class="benchmark__static-item__inner">
                            ${a`label: ${()=>h.value.label}`}
                        </div>
                        <div>
                            ${i({observe:()=>p.data,useSync:!0,key:"label",render:({sync:f,current:d})=>g`
                                        <benchmark-fake-component
                                            ${s(()=>({index:d.index,label:d.value.label,counter:p.counter}))}
                                            ${f()}
                                        >
                                        </benchmark-fake-component>
                                    `})}
                        </div>
                    </div>`})}
        </div>
    </div>`};var r_=m.createComponent({tag:"benchmark-repeat-key-nested",component:t_,...ht(31)});var o_=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindEffect:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">Repeat ( without key ):</h3>
            <h2 class="benchmark__head__title">
                Generate components performance
            </h2>
            ${Ic()}
            ${dt({setRef:o,getRef:n,delegateEvents:t,bindEffect:a,proxi:l})}

            <div class="benchmark__head__time">
                ${r`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${i({observe:()=>l.data,useSync:!0,render:({sync:p,current:h})=>g`
                              <benchmark-fake-component
                                  ${s({observe:["counter"],props:({counter:f},d,y)=>({index:y,label:d.label,counter:f})})}
                                  ${p()}
                              >
                              </benchmark-fake-component>
                          `})}
        </div>
    </div>`};var n_=m.createComponent({tag:"benchmark-repeat-no-key",component:o_,...ht()});var Ot=u.createStore({data:()=>({value:[],type:Array,validate:e=>e.length<1001,strict:!0,skipEqual:!1}),counter:()=>({value:0,type:Number}),time:()=>({value:0,type:Number,transform:e=>Math.round(e),skipEqual:!1}),isLoading:()=>({value:!1,type:Boolean})});var ip=({value:e,useShuffle:t=!1})=>{Ot.set("isLoading",!0),u.useFrameIndex(()=>{u.useNextTick(async()=>{let r=performance.now();Ot.set("data",t?sp(fi(e)):fi(e)),await m.tick();let n=performance.now()-r;Ot.set("time",n),Ot.set("isLoading",!1)})},2)},s_=({delegateEvents:e,setRef:t,getRef:r,getState:o,bindEffect:n})=>g`
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
                ${e({keydown:s=>{if(s.code.toLowerCase()==="enter"){s.preventDefault();let i=Number(s.currentTarget?.value??0);ip({value:i})}}})}
            />
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{let{input:s}=r(),i=Number(s?.value??0);ip({value:i})}})}
            >
                Generate components
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{let{data:s}=o();ip({value:s.length,useShuffle:!0})}})}
            >
                Shuffle array
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{Ot.update("counter",s=>s+1)}})}
            >
                Update counter
            </button>
        </div>
    `;var i_=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,getState:s,bindProps:i,repeat:a,bindEffect:c,getProxi:l})=>{let p=l();return e(()=>()=>{n()?.input.remove(),Ot.set("data",[]),Ot.set("time",0),Ot.set("counter",0)}),g`<div class="benchmark">
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
            ${s_({setRef:o,getRef:n,delegateEvents:t,getState:s,bindEffect:c})}

            <div class="benchmark__head__time">
                ${r`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${a({observe:()=>p.data,useSync:!0,render:({sync:h,current:f})=>g`
                              <benchmark-fake-component
                                  ${i({observe:["counter"],props:({counter:d},y,v)=>({index:v,label:y.label,counter:d})})}
                                  ${h()}
                              >
                              </benchmark-fake-component>
                          `})}
        </div>
    </div>`};var a_=m.createComponent({tag:"benchmark-repeat-no-key-bind-store",component:i_,bindStore:Ot,child:[wc]});var c_=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindObject:a,bindEffect:c,getProxi:l})=>{let p=l();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat ( nested without key ):
            </h3>
            <p class="benchmark__head__title">
                Repater without component with the same repeater with component
                inside<br />
                ( max value <strong>10</strong> ).
            </p>
            ${dt({setRef:o,getRef:n,delegateEvents:t,bindEffect:c,proxi:p})}

            <div class="benchmark__head__time">
                ${r`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${i({observe:()=>p.data,useSync:!0,render:({current:h})=>g`<div class="benchmark__static-item">
                        <div class="benchmark__static-item__inner">
                            ${a`label: ${()=>h.value.label}`}
                        </div>
                        <div>
                            ${i({observe:()=>p.data,useSync:!0,render:({sync:f,current:d})=>g`
                                        <benchmark-fake-component
                                            ${s(()=>({index:d.index,label:d.value.label,counter:p.counter}))}
                                            ${f()}
                                        >
                                        </benchmark-fake-component>
                                    `})}
                        </div>
                    </div>`})}
        </div>
    </div>`};var l_=m.createComponent({tag:"benchmark-repeat-key-no-nested",component:c_,...ht(31)});var Mc=(e=1e3)=>g`
        <p>
            Generates and updates a large list of vanilla HTML element with 4
            reactive elements inside.<br />
            ( max component <strong>${e}</strong> ).
        </p>
    `;var u_=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,repeat:s,bindEffect:i,bindObject:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat no component ( without key ):
            </h3>
            <h2 class="benchmark__head__title">
                Generate vanilla html performance
            </h2>
            ${Mc(1e3)}
            ${dt({setRef:o,getRef:n,delegateEvents:t,bindEffect:i,proxi:l})}

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
    </div>`};var p_=m.createComponent({tag:"benchmark-repeat-no-component-no-key",component:u_,...ht(1001)});var m_=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,repeat:s,bindEffect:i,bindObject:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat no component ( with key ):
            </h3>
            <h2 class="benchmark__head__title">
                Generate vanilla html performance
            </h2>
            ${Mc(1e3)}
            ${dt({setRef:o,getRef:n,delegateEvents:t,bindEffect:i,proxi:l})}

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
    </div>`};var h_=m.createComponent({tag:"benchmark-repeat-no-component-with-key",component:m_,...ht(1001)});m.useComponent([QT,n_,e_,r_,l_,a_,p_,h_]);var Lr=async({props:e})=>{let{rootComponent:t}=e;return g`<div class="l-benchMark"><${t}></${t}></div>`};var Se=({active:e=!0,nextRoute:t="",prevRoute:r="",backRoute:o=""})=>{let n=m.useMethodByName(ai);n.update("active",e),n.update("nextRoute",t),n.update("prevRoute",r),n.update("backRoute",o)};m.beforeRouteChange(()=>{let e=m.useMethodByName(ai);e.update("active",!1),e.update("nextRoute",""),e.update("prevRoute",""),e.update("backRoute","")});var ee=u.createStore({activeNavigationSection:()=>({value:"",type:String,skipEqual:!1}),navigationIsOpen:()=>({value:!1,type:Boolean})});ee.set("activeNavigationSection","");var ft=({disableOffcanvas:e})=>{let t="OffscreenCanvas"in globalThis&&!e;return{useOffscreen:t,context:t?"bitmaprenderer":"2d"}},gt=({useOffscreen:e,canvas:t})=>{let r=e?new OffscreenCanvas(t.width,t.height):null,o=e?r?.getContext("2d"):null;return{offscreen:r,offScreenCtx:o}},bt=({useOffscreen:e,offscreen:t,ctx:r})=>{if(e&&t&&r){let o=t.transferToImageBitmap();r.transferFromImageBitmap(o)}},bo=e=>"roundRect"in e;var vo=({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:n,gutter:s})=>{let i={row:0,col:-1,items:[]};return[...Array.from({length:t*r+t}).keys()].reduce(a=>{let{row:c,col:l,items:p}=a,h=l<r?l+1:0,f=h===0?c+1:c,d=(o+s)*h,y=(n+s)*f;return{row:f,col:h,items:[...p,{width:o,height:n,x:d,y,centerX:d+o/2,centerY:y+n/2,offsetXCenter:ek({canvasWidth:e.width,width:o,gutter:s,numberOfColumn:r}),offsetYCenter:tk({canvasHeight:e.height,height:n,gutter:s,numberOfRow:t}),gutter:s,numberOfColumn:r}]}},i)},ek=({canvasWidth:e,width:t,gutter:r,numberOfColumn:o})=>e/2-(t+r)*o/2,tk=({canvasHeight:e,height:t,gutter:r,numberOfRow:o})=>e/2-(t+r)*(o+1)/2;var d_=({canvas:e,numberOfRow:t,numberOfColumn:r,fill:o,disableOffcanvas:n,stagger:s,reorder:i,animationType:a})=>{let c=window.innerWidth/20,l=window.innerHeight/20,p=1,{useOffscreen:h,context:f}=ft({disableOffcanvas:n}),d=!0,y=e.getContext(f,{alpha:!0}),v=m.getActiveRoute(),{offscreen:T,offScreenCtx:S}=gt({useOffscreen:h,canvas:e}),_=h?S:y,E=bo(_);_=null,e.width=e.clientWidth,e.height=e.clientHeight;let x=vo({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:c,cellHeight:l,gutter:p}).items,w=i?x.map((P,$)=>({...P,scale:1,rotate:0,hasFill:o.includes($)})).toSorted(P=>P.hasFill?-1:1).toReversed():x.map((P,$)=>{let D=o.includes($);return{...P,scale:1,rotate:0,hasFill:D}}),I=H.createTimeTween({ease:"easeInOutQuad",stagger:s,data:{scale:1,rotate:0}});w.forEach(P=>{I.subscribeCache(({scale:$,rotate:D})=>{P.rotate=D,P.scale=$})});let N=()=>{if(!y)return;let P=e.width,$=e.height,D=h?S:y;D&&(h&&T?(T.width=P,T.height=$):D.reset(),w.forEach(({x:k,y:L,width:C,height:M,rotate:F,scale:B,hasFill:V,offsetXCenter:U,offsetYCenter:te})=>{let ce=Math.PI/180*F,G=Math.cos(ce)*B,oe=Math.sin(ce)*B;D.setTransform(G,oe,-oe,G,Math.floor(U+k),Math.floor(te+L));let se=Math.round(-C/2),re=Math.round(-M/2);E?(D.beginPath(),D.roundRect(se,re,C,M,150)):(D.beginPath(),D.rect(se,re,C,M)),V?(D.fillStyle="#000000",D.fill()):(D.fillStyle="rgba(255, 255, 255, 1)",D.fill())}),bt({useOffscreen:h,offscreen:T,ctx:y}))},A=Me.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).label({name:"label1"});(a==="asymmetric"||a==="random")&&A.goTo(I,{scale:.2,rotate:90},{duration:1e3}).goTo(I,{scale:1},{duration:500}).goTo(I,{rotate:180,scale:1.2},{duration:500}).goTo(I,{scale:.3,rotate:0},{duration:500}).goTo(I,{scale:1},{duration:1200}),(a==="edges"||a==="radial")&&A.goTo(I,{scale:.3,rotate:0},{duration:1e3}).goTo(I,{scale:1},{duration:1e3}),A.onLoopEnd(({direction:P,loop:$})=>{console.log(`loop end: ${P}, ${$}`)}),A.play();let O=()=>{N(),d&&u.useNextFrame(()=>O())};u.useFrame(()=>{O()});let R=ee.watch("navigationIsOpen",P=>{if(P){A?.pause(),d=!1;return}setTimeout(async()=>{d=!0,m.getActiveRoute().route===v.route&&(A?.resume(),u.useFrame(()=>O()))},500)});return()=>{I.destroy(),A.destroy(),R(),I=null,A=null,y=null,T=null,S=null,x=[],d=!1,w=null,f=null}};var ap=[{label:"asymmetric row",params:{animationType:"asymmetric",fill:[16,27,38,49,60,71,82,93],numberOfColumn:10,numberOfRow:10,stagger:{each:5,grid:{col:10,row:1,direction:"row"},waitComplete:!1},reorder:!0}},{label:"random",params:{animationType:"random",fill:[16,27,38,49,60,71,82,93],numberOfColumn:10,numberOfRow:10,stagger:{each:2,from:"random",waitComplete:!1},reorder:!1}},{label:"edges",params:{animationType:"edges",fill:[0,13,20,45,65,71,72,73,74,75,76,77,83,92,96,113,117,134,138,155,156,157,158,159,189,209],numberOfColumn:10,numberOfRow:10,stagger:{each:10,from:"edges",waitComplete:!1},reorder:!1}},{label:"radial",params:{animationType:"radial",fill:[],numberOfColumn:8,numberOfRow:9,stagger:{each:20,from:{x:4,y:4},grid:{col:9,row:9,direction:"radial"},waitComplete:!1},reorder:!1}}];var cp=({proxi:e,getRef:t})=>{e.destroy(),e.destroy=d_({canvas:t().canvas,...ap[e.currentParamsId].params,disableOffcanvas:!0})};function rk({delegateEvents:e,bindEffect:t,proxi:r,getRef:o}){return ap.map(({label:n},s)=>g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn"
                    ${e({click:()=>{r.currentParamsId=s,cp({proxi:r,getRef:o})}})}
                    ${t({toggleClass:{active:()=>r.currentParamsId===s}})}
                >
                    ${n}
                </button>
            </li>`).join("")}var f_=({onMount:e,setRef:t,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s})=>{let i=n();return e(()=>{u.useFrame(()=>{u.useNextTick(()=>{cp({proxi:i,getRef:r})})});let a=u.useResize(()=>{cp({proxi:i,getRef:r})});return u.useFrame(()=>{"isMounted"in i&&(i.isMounted=!0)}),()=>{i.destroy(),i.destroy=()=>{},a()}}),g`
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
                    ${rk({delegateEvents:s,bindEffect:o,proxi:i,getRef:r})}
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
    `};var g_=m.createComponent({tag:"animatedpattern-n0",component:f_,props:{background:()=>({value:"",type:String})},state:{isMounted:()=>({value:!1,type:Boolean}),controlsActive:()=>({value:!1,type:Boolean}),destroy:()=>({value:()=>{},type:Function}),currentParamsId:()=>({value:0,type:Number})}});m.useComponent([g_]);var b_=async()=>{let{data:e}=await ne({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"#async-timeline",nextRoute:"#animatedPatternN1",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <animatedpattern-n0
            ${m.staticProps({background:e})}
        ></animatedpattern-n0>
    </div>`};var lp=({canvas:e,disableOffcanvas:t})=>{let r=window.innerHeight>=700?window.innerHeight/16:window.innerHeight/20,o=window.innerHeight>=700?window.innerHeight/16:window.innerHeight/20,n=7,s=15,i=window.innerHeight/150,a=[2,18,10,27,21,22,23,24,25,25,26,37,42,53,58,69,74,85,86,87,88,89,90,44,60,65,98,108],{useOffscreen:c,context:l}=ft({disableOffcanvas:t}),p=!0,{top:h,left:f}=be(e),d=e.getContext(l,{alpha:!0}),y=m.getActiveRoute(),{offscreen:v,offScreenCtx:T}=gt({useOffscreen:c,canvas:e});e.width=e.clientWidth,e.height=e.clientHeight;let S=vo({canvas:e,numberOfRow:n,numberOfColumn:s,cellWidth:r,cellHeight:o,gutter:i}).items,_=S.map(($,D)=>({...$,scale:0,mouseX:0,mouseY:0,hasFill:a.includes(D)})).toSorted($=>$.hasFill?-1:1),E=H.createLerp({data:{mouseX:0,mouseY:0}});_.forEach($=>{E.subscribeCache(({mouseX:D,mouseY:k})=>{$.mouseX=D,$.mouseY=k})});let x=H.createTimeTween({ease:"easeInOutSine",stagger:{each:5,from:"center",waitComplete:!1},data:{scale:0}});_.forEach($=>{x.subscribeCache(({scale:D})=>{$.scale=D})});let w=()=>{if(!d)return;let $=e.width,D=e.height,k=c?T:d;k&&(c&&v?(v.width=$,v.height=D):k.reset(),_.forEach(({x:L,y:C,width:M,height:F,mouseX:B,mouseY:V,scale:U,hasFill:te,offsetXCenter:ce,offsetYCenter:G})=>{if(!te)return;let oe=B-(e.width-(M+i)*s)/2,se=V-(e.height-(F+i)*n)/2,re=(L-oe)/250,ke=(C-se)/250,je=Math.sqrt(Math.pow(Math.abs(re),2)+Math.pow(Math.abs(ke),2)),X=ue.clamp(Math.abs(je),0,2),ye=0,Re=Math.cos(ye)*(X+U),Oe=Math.sin(ye)*(X+U);k.setTransform(Re,Oe,-Oe,Re,Math.floor(ce+L),Math.floor(G+C)),k.beginPath(),k.rect(Math.floor(-M/2),Math.floor(-F/2),M,F),k.fillStyle="#000000",k.fill()}),k.globalCompositeOperation="destination-out",_.forEach(({x:L,y:C,width:M,height:F,mouseX:B,mouseY:V,scale:U,hasFill:te,offsetXCenter:ce,offsetYCenter:G})=>{if(te)return;let oe=B-(e.width-(M+i)*s)/2,se=V-(e.height-(F+i)*n)/2,re=(L-oe)/250,ke=(C-se)/250,je=Math.sqrt(Math.pow(Math.abs(re),2)+Math.pow(Math.abs(ke),2)),X=ue.clamp(Math.abs(je),0,2),ye=0,Re=Math.cos(ye)*(X+U),Oe=Math.sin(ye)*(X+U);k.setTransform(Re,Oe,-Oe,Re,Math.floor(ce+L),Math.floor(G+C)),k.beginPath(),k.rect(Math.floor(-M/2),Math.floor(-F/2),M,F),k.fill()}),bt({useOffscreen:c,offscreen:v,ctx:d}))},I=Me.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(x,{scale:.3},{duration:1e3});I.play();let N=({x:$,y:D})=>{E.goTo({mouseX:$-f,mouseY:D-h}).catch(()=>{})},A=u.useMouseMove(({client:$})=>{let{x:D,y:k}=$;N({x:D,y:k})}),O=u.useTouchMove(({client:$})=>{let{x:D,y:k}=$;N({x:D,y:k})}),R=()=>{w(),p&&u.useNextFrame(()=>R())};u.useFrame(()=>{R()});let P=ee.watch("navigationIsOpen",$=>{if($){I?.stop(),p=!1;return}setTimeout(async()=>{p=!0,m.getActiveRoute().route===y.route&&(I?.play(),u.useFrame(()=>R()))},500)});return()=>{x.destroy(),I.destroy(),E.destroy(),A(),O(),P(),x=null,I=null,E=null,d=null,v=null,T=null,S=[],p=!1,_=null,l=null}};var v_=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s})=>{let i=s(),a=()=>{};return e(()=>{let{canvas:c}=o();u.useFrame(()=>{u.useNextTick(()=>{a(),a=lp({canvas:c,...t()})})});let l=u.useResize(()=>{a(),a=lp({canvas:c,...t()})});return u.useFrame(()=>{"isMounted"in i&&(i.isMounted=!0)}),()=>{l(),a(),a=null}}),g`
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
    `};var y_=m.createComponent({tag:"animatedpattern-n1",component:v_,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1}});m.useComponent([y_]);var T_=async()=>{let{data:e}=await ne({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"#animatedPatternN0",nextRoute:"#scrollerN0",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <animatedpattern-n1
            ${m.staticProps({background:e})}
        ></animatedpattern-n1>
    </div>`};var __=({canvas:e,disableOffcanvas:t})=>{let o=window.innerHeight/30,n=window.innerHeight/60,s=[14,5],i=.1,a=0,c=10,l=3,p=5e3,h=1,{useOffscreen:f,context:d}=ft({disableOffcanvas:t}),y=!0,v=e.getContext(d,{alpha:!0}),{top:T,left:S}=be(e),_=m.getActiveRoute(),{offscreen:E,offScreenCtx:x}=gt({useOffscreen:f,canvas:e}),w=!0;e.width=e.clientWidth,e.height=e.clientHeight;let I=[...Array.from({length:19}).keys()].map((B,V)=>{let U=V>=9.5?9.5+(9.5-V):V,te=s.includes(V)?1:U*i;return{width:U*o,height:U*n,x:0,y:0,hasFill:s.includes(V),opacity:te,radius:a,rotate:0,relativeIndex:U,scale:1}}),N=H.createTimeTween({data:{rotate:0},stagger:{each:c,from:"center"},ease:"easeLinear",relative:!0}),A=I.map(B=>N.subscribeCache(({rotate:V})=>{B.rotate=V})),O=H.createSpring({data:{x:0,y:0},stagger:{each:l,from:"end"}});I.forEach(B=>{O.subscribeCache(({x:V,y:U})=>{B.x=V,B.y=U,B.scale=h})});let R=()=>{if(!v)return;let B=e.width,V=e.height,U=e.width/2,te=e.height/2,ce=I.length,G=f?x:v;G&&(f&&E?(E.width=B,E.height=V):G.reset(),I.forEach(({width:oe,height:se,x:re,y:ke,rotate:je,hasFill:X,opacity:ye,scale:Re},Oe)=>{let Ye=ce-Oe,$e=Math.max(1,Re/4),Dr=1,$t=Math.PI/180*je,Y=Math.cos($t)*Dr,Fr=Math.sin($t)*Dr;G.setTransform(Y,Fr,-Fr,Y,U+re+Ye*re/20,te+ke+Ye*ke/20);let Ve=Math.round(-oe/2)*$e,xe=Math.round(-se/2)*$e;w?(G.beginPath(),G.roundRect(Ve,xe,oe*$e,se*$e,130)):(G.beginPath(),G.rect(Ve,xe,oe*$e,se*$e)),X?G.fillStyle="#000":(G.fillStyle=`rgba(238, 238, 238, ${ye})`,G.strokeStyle=`rgba(0, 0, 0, ${ye})`,G.stroke()),G.fill()}),bt({useOffscreen:f,offscreen:E,ctx:v}))},P=Me.createAsyncTimeline({repeat:-1,yoyo:!1,autoSet:!1});P.goTo(N,{rotate:360},{duration:p}),P.play();let $=()=>{R(),y&&u.useNextFrame(()=>$())};u.useFrame(()=>$());let D=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,T=be(e).top,S=be(e).left,R()}),k=ue.useVelocity(({speed:B})=>{h=B}),L=({x:B,y:V})=>{let U=window.innerWidth,te=window.innerHeight,ce=B-e.width/2-S,G=V-e.height/2-T;O.goTo({x:ue.clamp(ce,-U/2+400+S,U/2-400-S),y:ue.clamp(G,-te/2+200+T,te/2-200-T)}).catch(()=>{})},C=u.useMouseMove(({client:B})=>{let{x:V,y:U}=B;L({x:V,y:U})}),M=u.useTouchMove(({client:B})=>{let{x:V,y:U}=B;L({x:V,y:U})}),F=ee.watch("navigationIsOpen",B=>{if(B){y=!1,P?.pause(),N?.pause(),O?.pause();return}setTimeout(()=>{y=!0,m.getActiveRoute().route===_.route&&(P?.resume(),N?.resume(),O?.resume(),u.useFrame(()=>$()))},500)});return{destroy:()=>{N.destroy(),O.destroy(),P.destroy(),D(),C(),M(),k(),F(),A.forEach(B=>{B()}),A.length=0,N=null,O=null,P=null,v=null,E=null,x=null,y=!1,I=null,d=null},stopBlackOne:()=>{s.forEach(B=>{A[B]?.()})}}};function ok({delegateEvents:e,bindEffect:t,bindObject:r,proxi:o}){return g` <li class="c-canvas__controls__item">
        <button
            type="button"
            class="c-canvas__controls__btn"
            ${e({click:()=>{o.stopBlackOne(),o.blackOneIsStopped=!0}})}
            ${t({toggleAttribute:{disabled:()=>o.blackOneIsStopped}})}
        >
            Stop black one rotation
        </button>
        <p class="c-canvas__controls__status">
            ${r`${()=>o.blackOneIsStopped?"Black one rotation is off":""}`}
        </p>
    </li>`}var S_=({onMount:e,getRef:t,setRef:r,bindEffect:o,getProxi:n,delegateEvents:s,bindObject:i})=>{let a=n();return e(()=>{let{canvas:c}=t(),l={destroy:()=>{},stopBlackOne:()=>{}};return u.useFrame(()=>{u.useNextTick(()=>{a.destroy(),l=__({canvas:c,disableOffcanvas:a.disableOffcanvas}),a.destroy=l.destroy,a.stopBlackOne=l.stopBlackOne})}),u.useFrame(()=>{"isMounted"in a&&(a.isMounted=!0)}),()=>{a.destroy(),a.destroy=()=>{},a.stopBlackOne=()=>{},l=null}}),g`
        <div>
            <div class="c-canvas">
                <div class="background-shape">${a.background}</div>

                <button
                    type="button"
                    class="c-canvas__controls__open"
                    ${s({click:()=>{a.controlsActive=!0}})}
                >
                    show controls
                </button>
                <ul
                    class="c-canvas__controls"
                    ${o({toggleClass:{active:()=>a.controlsActive}})}
                >
                    <button
                        type="button"
                        class="c-canvas__controls__close"
                        ${s({click:()=>{a.controlsActive=!1}})}
                    ></button>
                    ${ok({delegateEvents:s,bindEffect:o,bindObject:i,proxi:a})}
                </ul>
                <div
                    class="c-canvas__wrap"
                    ${o({toggleClass:{active:()=>a.isMounted}})}
                >
                    <canvas ${r("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var x_=m.createComponent({tag:"caterpillar-n1",component:S_,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1,controlsActive:()=>({value:!1,type:Boolean}),destroy:()=>({value:()=>{},type:Function}),stopBlackOne:()=>({value:()=>{},type:Function}),blackOneIsStopped:()=>({value:!1,type:Boolean})}});m.useComponent([x_]);var C_=async()=>{let{data:e}=await ne({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"",nextRoute:"#scrollerN1",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <caterpillar-n1 ${m.staticProps({background:e})}>
        </caterpillar-n1>
    </div>`};var up=({value:e,direction:t,isForced:r})=>{r||console.log(`current: ${e}, direction: ${t}`)},E_=({canvas:e,proxi:t})=>{let o=window.innerHeight/13,n=window.innerHeight/13,s=[2],i=.03,a=500,c=400,l=10,p=l/2/Math.PI,{useOffscreen:h,context:f}=ft({disableOffcanvas:t.disableOffcanvas}),d=!0,y=e.getContext(f,{alpha:!0}),v=m.getActiveRoute(),{offscreen:T,offScreenCtx:S}=gt({useOffscreen:h,canvas:e}),_=!0,E=[...Array.from({length:20}).keys()].map((R,P)=>{let $=P>=10?10+(10-P):P,D=o+o/3*$,k=n+n/3*$,L=s.includes(P)?1:(20-P)*i;return{width:D,height:k,x:0,y:0,hasFill:s.includes(P),opacity:L,rotate:0}});e.width=e.clientWidth,e.height=e.clientHeight;let x=H.createSequencer({stagger:{each:7},data:{x:l/4,rotate:0},duration:l}).goTo({x:l+l/4},{start:0,end:l,ease:"easeLinear"}).goTo({rotate:()=>-t.rotation},{start:0,end:5,ease:"easeInOutBack"}).goTo({rotate:0},{start:5,end:l,ease:"easeInOutBack"}).label("mylabel",2).add(({isForced:R,direction:P})=>{up({isForced:R,direction:P,value:1})},1).add(({isForced:R,direction:P})=>{up({isForced:R,direction:P,value:5})},5).add(({isForced:R,direction:P})=>{up({isForced:R,direction:P,value:9})},9);E.forEach(R=>{x.subscribeCache(({x:P,rotate:$})=>{let D=P/p,k=2/(3-Math.cos(2*D)),L=k*Math.cos(D)*a,C=k*Math.sin(2*D)/2*c;R.x=L,R.y=C,R.rotate=$})});let w=Me.createSyncTimeline({repeat:-1,yoyo:!1,duration:4e3}).add(x);w.onLoopEnd(({loop:R,direction:P})=>{console.log(`loop end: ${R} , ${P}`)});let I=()=>{if(!y)return;let R=e.width,P=e.height,$=e.width/2,D=e.height/2,k=h?S:y;k&&(h&&T?(T.width=R,T.height=P):k.reset(),E.forEach(({width:L,height:C,x:M,y:F,rotate:B,hasFill:V,opacity:U})=>{let ce=Math.PI/180*B,G=Math.cos(ce)*1,oe=Math.sin(ce)*1;k.setTransform(G,oe,-oe,G,$+M,D+F);let se=Math.round(-L/2),re=Math.round(-C/2);_?(k.beginPath(),k.roundRect(se,re,L,C,[40,40])):(k.beginPath(),k.rect(se,re,L,C)),V?k.fillStyle="#000000":(k.strokeStyle=`rgba(0, 0, 0, ${U})`,k.fillStyle="rgba(238, 238, 238, 0)",k.stroke()),k.fill()}),bt({useOffscreen:h,offscreen:T,ctx:y}))},N=()=>{I(),d&&u.useNextFrame(()=>N())};u.useFrame(()=>N()),w.play();let A=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,I()}),O=ee.watch("navigationIsOpen",R=>{if(R){d=!1,w?.pause();return}setTimeout(()=>{d=!0,m.getActiveRoute().route===v.route&&(w?.resume(),u.useFrame(()=>N()))},500)});return{destroy:()=>{d=!1,A(),O(),x.destroy(),x=null,w.destroy(),w=null,y=null,T=null,S=null,E=null,f=null},play:()=>{w.play()},playReverse:()=>{w.playReverse()},playUseCurrent:()=>{w.play({useCurrent:!0})},playReverseUseCurrent:()=>{w.playReverse({useCurrent:!0})},playFromLabel:()=>{w.playFrom("mylabel")},plaFromLabelReverse:()=>{w.playFromReverse("mylabel")},stop:()=>w.stop(),pause:()=>w.pause(),resume:()=>w.resume(),reverse:()=>w.reverse()}};function nk({buttons:e}){return Object.entries(e).map(([t,r])=>{let{label:o}=r;return g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn ${t}"
                >
                    ${o}
                </button>
            </li>`}).join("")}var w_=({onMount:e,setRef:t,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s,bindObject:i})=>{let a=n(),c=u.getUnivoqueId();return e(({element:l})=>{let{canvas:p}=r(),h=()=>{},f=E_({canvas:p,proxi:a});return u.useFrame(()=>{u.useNextTick(()=>{({destroy:h}=f)})}),Object.entries(a.buttons).forEach(([d,y])=>{let{method:v}=y;l.querySelector(`.${d}`)?.addEventListener("click",()=>f?.[v]())}),u.useFrame(()=>{"isMounted"in a&&(a.isMounted=!0)}),()=>{h(),h=null}}),g`
        <div>
            <div class="c-canvas">
                <div class="background-shape background-shape--light">
                    ${a.background}
                </div>
                <div
                    class="c-canvas__wrap"
                    ${o({toggleClass:{active:()=>a.isMounted}})}
                >
                    <button
                        type="button"
                        class="c-canvas__controls__open"
                        ${s({click:()=>{a.controlsActive=!0}})}
                    >
                        show controls
                    </button>
                    <ul
                        class="c-canvas__controls"
                        ${o({toggleClass:{active:()=>a.controlsActive}})}
                    >
                        <button
                            type="button"
                            class="c-canvas__controls__close"
                            ${s({click:()=>{a.controlsActive=!1}})}
                        ></button>
                        ${nk({buttons:a.buttons})}
                        <li class="c-canvas__controls__item">
                            <div class="c-canvas__controls__range">
                                <input
                                    type="range"
                                    min="0"
                                    max="720"
                                    value="${a.rotation}"
                                    step="1"
                                    id=${c}
                                    ${s({"change:force":l=>{let p=l.currentTarget;p&&(a.rotation=Number(p.value))},input:l=>{let p=l.currentTarget;p&&(a.rotationlabel=Number(p.value))}})}
                                />
                            </div>
                            <label
                                for=${c}
                                class="c-canvas__controls__range-value"
                            >
                                ${i`deg: ${()=>a.rotationlabel}`}
                            </label>
                        </li>
                    </ul>
                    <canvas ${t("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var sk={"js-CN2-play":{label:"play",method:"play"},"js-CN2-playReverse":{label:"play reverse",method:"playReverse"},"js-CN2-play-current":{label:"go forward if is backward",method:"playUseCurrent"},"js-CN2-playReverse-current":{label:"go backward if is forward",method:"playReverseUseCurrent"},"js-CN2-play-label":{label:"play from label",method:"playFromLabel"},"js-CN2-playReverse-label":{label:"play from label reverse",method:"plaFromLabelReverse"},"js-CN2-reverse":{label:"reverse",method:"reverse"},"js-CN2-stop":{label:"stop",method:"stop"},"js-CN2-pause":{label:"pause",method:"pause"},"js-CN2-resume":{label:"resume",method:"resume"}},I_=m.createComponent({tag:"caterpillar-n2",component:w_,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1,rotation:()=>({value:166,type:Number}),rotationlabel:()=>({value:166,type:Number}),controlsActive:()=>({value:!1,type:Boolean}),buttons:()=>({value:sk,type:"Any"})}});m.useComponent([I_]);var M_=async()=>{let{data:e}=await ne({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"#scrollerN1",nextRoute:"#async-timeline",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <caterpillar-n2
            ${m.staticProps({background:e})}
        ></caterpillar-n2>
    </div>`};var kc=()=>{m.useMethodByName(ci).update(!0)},Rc=()=>{m.useMethodByName(ci).update(!1)};var k_=({canvas:e,canvasScroller:t,stagger:r,disableOffcanvas:o})=>{let n=window.innerWidth/20,s=window.innerHeight/20,i=1,a=10,c=10,l=!1,p=[36,37,38,39,40,47,51,58,62,69,73,80,81,82,83,84],{useOffscreen:h,context:f}=ft({disableOffcanvas:o}),d=!0,y=H.createMasterSequencer(),v=e.getContext(f,{alpha:!0}),T=m.getActiveRoute(),{offscreen:S,offScreenCtx:_}=gt({useOffscreen:h,canvas:e}),E=h?_:v,x=bo(E);E=null,e.width=e.clientWidth,e.height=e.clientHeight;let w=vo({canvas:e,numberOfRow:a,numberOfColumn:c,cellWidth:n,cellHeight:s,gutter:i}).items,I=l?w.map((D,k)=>({...D,scale:1,rotate:0,hasFill:p.includes(k)})).toSorted(D=>D.hasFill?-1:1):w.map((D,k)=>({...D,scale:1,rotate:0,hasFill:p.includes(k)})),N=H.createStaggers({items:I,stagger:r}),A=N.map(({item:D,start:k,end:L})=>{let C=H.createSequencer({data:{scale:1}}).goTo({scale:0},{start:k,end:L,ease:"easeInOutQuad"}),M=C.subscribe(({scale:F})=>{D.scale=F});return y.add(C),{sequencer:C,unsubscribe:M}}),O=()=>{if(!v)return;let D=e.width,k=e.height,L=h?_:v;L&&(h&&S?(S.width=D,S.height=k):L.reset(),I.forEach(({x:C,y:M,width:F,height:B,rotate:V,scale:U,hasFill:te,offsetXCenter:ce,offsetYCenter:G})=>{let oe=Math.PI/180*V,se=Math.cos(oe)*U,re=Math.sin(oe)*U;L.setTransform(se,re,-re,se,Math.floor(ce+C),Math.floor(G+M));let ke=Math.round(-F/2),je=Math.round(-B/2);x?(L.beginPath(),L.roundRect(ke,je,F,B,150)):(L.beginPath(),L.rect(ke,je,F,B)),te?(L.fillStyle="#000000",L.fill()):(L.strokeStyle="#000",L.fillStyle="rgb(238, 238, 238)",L.fill(),x||(L.strokeStyle="#ccc"))}),bt({useOffscreen:h,offscreen:S,ctx:v}))},R=Ke.createScrollTrigger({trigger:t,propierties:"tween",tween:y,dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>le(t)},reverse:!1,ease:!0,easeType:"lerp"});R.init();let P=()=>{O(),d&&u.useNextFrame(()=>P())};u.useFrame(()=>{P()});let $=ee.watch("navigationIsOpen",D=>{if(D){d=!1;return}setTimeout(async()=>{d=!0,m.getActiveRoute().route===T.route&&u.useFrame(()=>P())},500)});return()=>{$(),A.forEach(({sequencer:D,unsubscribe:k})=>{D.destroy(),k()}),A=[],y.destroy(),y=null,N=[],R.destroy(),R=null,v=null,S=null,_=null,w=[],d=!1,I=null,f=null}};var pp=[{label:"random",params:{stagger:{type:"equal",each:6,from:"random"}}},{label:"column",params:{stagger:{type:"equal",each:7,from:"center",grid:{col:11,row:10,direction:"col"}}}},{label:"row",params:{stagger:{type:"equal",each:3,from:"start",grid:{col:11,row:10,direction:"row"}}}},{label:"sequential",params:{stagger:{type:"equal",each:2,from:"end"}}}];var mp=({proxi:e,getRef:t,resetScroll:r=!0})=>{r&&window.scrollTo(0,0),e.destroy(),e.destroy=k_({canvas:t().canvas,canvasScroller:t().canvasScroller,...pp[e.currentParamsId].params,disableOffcanvas:!0})};function ik({delegateEvents:e,bindEffect:t,proxi:r,getRef:o}){return pp.map(({label:n},s)=>g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn"
                    ${e({click:()=>{r.currentParamsId=s,mp({proxi:r,getRef:o})}})}
                    ${t({toggleClass:{active:()=>r.currentParamsId===s}})}
                >
                    ${n}
                </button>
            </li>`).join("")}var R_=({onMount:e,setRef:t,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s})=>{let i=n();return e(()=>{kc(),u.useFrame(()=>{u.useNextTick(()=>{mp({proxi:i,getRef:r})})});let a=u.useResize(()=>{mp({proxi:i,getRef:r,resetScroll:!1})});return u.useFrame(()=>{"isMounted"in i&&(i.isMounted=!0)}),()=>{i.destroy(),i.destroy=()=>{},Rc(),a()}}),g`
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
                    ${ik({delegateEvents:s,bindEffect:o,proxi:i,getRef:r})}
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
    `};var P_=m.createComponent({tag:"scroller-n0",component:R_,props:{background:()=>({value:"",type:String})},state:{isMounted:()=>({value:!1,type:Boolean}),controlsActive:()=>({value:!1,type:Boolean}),destroy:()=>({value:()=>{},type:Function}),currentParamsId:()=>({value:0,type:Number})}});m.useComponent([P_]);var N_=async()=>{let{data:e}=await ne({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"#animatedPatternN1",nextRoute:"",backRoute:"#canvas-overview"}),g`<div>
        <scroller-n0
            ${m.staticProps({background:e})}
        ></scroller-n0>
    </div>`};function ak({width:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}function ck({height:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}var A_=({canvas:e,canvasScroller:t,disableOffcanvas:r,proxi:o})=>{let l=new Set([14,5]),{useOffscreen:p,context:h}=ft({disableOffcanvas:r}),f=!0,d=e.getContext(h,{alpha:!0}),y=m.getActiveRoute(),{offscreen:v,offScreenCtx:T}=gt({useOffscreen:p,canvas:e}),S=p?T:d,_=bo(S);S=null,e.width=e.clientWidth,e.height=e.clientHeight;let E=[...Array.from({length:17}).keys()].map((R,P)=>{let $=P>=8.5?8.5+(8.5-P):P;return{width:Math.floor(ak({width:15,relativeIndex:$,amountOfPath:17})),height:Math.floor(ck({height:30,relativeIndex:$,amountOfPath:17})),opacity:$*.09,hasFill:l.has(P),rotate:0,relativeIndex:$,index:P}}),x=H.createScrollerTween({from:{rotate:0},to:{rotate:()=>o.rotation},stagger:{each:2,from:"center"}});E.forEach(R=>{x.subscribeCache(({rotate:P})=>{R.rotate=P})});let w=()=>{if(!d)return;let R=e.width,P=e.height,$=e.width/2,D=e.height/2,k=p?T:d;k&&(p&&v?(v.width=R,v.height=P):k.reset(),E.forEach(({width:L,height:C,opacity:M,rotate:F,index:B,hasFill:V})=>{let U=E.length/2-B,te=1,ce=Math.PI/180*(F-33),G=Math.cos(ce)*te,oe=Math.sin(ce)*te;k.setTransform(G,oe,-oe,G,$,D+U*19),_?(k.beginPath(),k.roundRect(-L/2,-C/2+U*19,L,C,150)):(k.beginPath(),k.rect(Math.round(-L/2),Math.round(-C/2),L,C)),V?k.fillStyle="#000":(k.fillStyle=`rgba(238, 238, 238, ${M})`,k.strokeStyle=`rgba(0, 0, 0, ${M})`,k.stroke()),k.fill()}),bt({useOffscreen:p,offscreen:v,ctx:d}))},I=Ke.createScrollTrigger({trigger:t,propierties:"tween",tween:x,dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>le(t)},ease:!0,easeType:"spring"});I.init();let N=()=>{w(),f&&u.useNextFrame(()=>N())};u.useFrame(()=>{N()});let A=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,u.useFrame(()=>{w()})}),O=ee.watch("navigationIsOpen",R=>{if(R){f=!1;return}setTimeout(()=>{f=!0,m.getActiveRoute().route===y.route&&u.useFrame(()=>N())},500)});return()=>{x.destroy(),A(),O(),x.destroy(),x=null,I.destroy(),I=null,d=null,v=null,T=null,x=null,f=!1,E=null,h=null}};function lk({proxi:e,delegateEvents:t,bindObject:r}){let o=u.getUnivoqueId();return g` <li class="c-canvas__controls__item">
        <div class="c-canvas__controls__range">
            <input
                type="range"
                min="360"
                max="2220"
                value="${e.rotation}"
                step="10"
                id=${o}
                ${t({"change:force":n=>{let s=n.currentTarget;s&&(e.rotation=Number(s.value))},input:n=>{let s=n.currentTarget;s&&(e.rotationlabel=Number(s.value))}})}
            />
        </div>
        <label for=${o} class="c-canvas__controls__range-value">
            ${r`rotationValue: ${()=>e.rotationlabel}`}
        </label>
    </li>`}var O_=({onMount:e,setRef:t,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s,bindObject:i})=>{let a=n();return e(()=>{let c=()=>{};kc();let{canvas:l,canvasScroller:p}=r();return u.useFrame(()=>{u.useNextTick(()=>{c(),c=A_({canvas:l,canvasScroller:p,disableOffcanvas:a.disableOffcanvas,proxi:a})})}),u.useFrame(()=>{"isMounted"in a&&(a.isMounted=!0)}),()=>{c(),Rc(),c=null}}),g`
        <div>
            <div class="c-canvas c-canvas--fixed ">
                <div class="background-shape">${a.background}</div>
                <button
                    type="button"
                    class="c-canvas__controls__open"
                    ${s({click:()=>{a.controlsActive=!0}})}
                >
                    show controls
                </button>
                <ul
                    class="c-canvas__controls"
                    ${o({toggleClass:{active:()=>a.controlsActive}})}
                >
                    <button
                        type="button"
                        class="c-canvas__controls__close"
                        ${s({click:()=>{a.controlsActive=!1}})}
                    ></button>
                    ${lk({proxi:a,delegateEvents:s,bindObject:i})}
                </ul>
                <div
                    class="c-canvas__wrap"
                    ${o({toggleClass:{active:()=>a.isMounted}})}
                >
                    <canvas ${t("canvas")}></canvas>
                </div>
            </div>
            <div class="c-canvas-scroller" ${t("canvasScroller")}></div>
        </div>
    `};var $_=m.createComponent({tag:"scroller-n1",component:O_,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1,controlsActive:()=>({value:!1,type:Boolean}),rotation:()=>({value:720,type:Number}),rotationlabel:()=>({value:720,type:Number})}});m.useComponent([$_]);var L_=async()=>{let{data:e}=await ne({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"#caterpillarN1",nextRoute:"#caterpillarN2",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <scroller-n1 ${m.staticProps({background:e})}></scroller-n1>
    </div>`};var D_=({getProxi:e,bindEffect:t})=>{let r=e();return g`
        <button
            type="button"
            class="c-dynamic-list-button"
            ${t({observe:"active",toggleClass:{active:()=>r.active}})}
        >
            ${r.label}
        </button>
    `};var Jn=m.createComponent({tag:"dynamic-list-button",component:D_,props:{label:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean})}});var Pc=[{key:"a",label:"A"},{key:"b",label:"B"},{key:"c",label:"C"},{key:"d",label:"D"}],F_=[{key:"f",label:"F"},{key:"b",label:"B"},{key:"e",label:"E"},{key:"c",label:"C"},{key:"b",label:"B"},{key:"a",label:"A"},{key:"g",label:"G"},{key:"h",label:"H"},{key:"d",label:"D"},{key:"b",label:"B"}],B_=[{key:"m",label:"M"},{key:"q",label:"Q"},{key:"z",label:"Z"},{key:"i",label:"I"},{key:"b",label:"B"},{key:"e",label:"E"},{key:"n",label:"N"},{key:"a",label:"A"},{key:"g",label:"G"},{key:"h",label:"H"},{key:"l",label:"L"},{key:"j",label:"J"},{key:"d",label:"D"}],V_=[{key:"h",label:"H"},{key:"f",label:"F"},{key:"a",label:"A"},{key:"d",label:"D"}],Yn=[[{key:4}],[{key:20},{key:10},{key:10},{key:6},{key:10},{key:10},{key:30}],[{key:3},{key:20},{key:5},{key:20},{key:5},{key:5},{key:5},{key:5},{key:60},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:10},{key:5}]];var uk=[{buttonLabel:"sample1",data:F_},{buttonLabel:"salmple2",data:B_},{buttonLabel:"sample3",data:V_},{buttonLabel:"Initial",data:Pc}],pk=[{label:"repeater with key",key:"key",clean:!1},{label:"repeater without key",key:"",clean:!1},{label:"repeater clear",key:"",clean:!0}];function mk({staticProps:e,delegateEvents:t,bindProps:r,proxi:o}){return uk.map((n,s)=>{let{data:i,buttonLabel:a}=n;return g`
                <dynamic-list-button
                    class="c-dynamic-list__top__button"
                    ${e({label:a})}
                    ${t({click:async()=>{o.data=i,o.activeSample=s}})}
                    ${r(()=>({active:s===o.activeSample}))}
                ></dynamic-list-button>
            `}).join("")}function hk({bindProps:e,staticProps:t,proxi:r}){return pk.map((o,n)=>{let{key:s,clean:i,label:a}=o;return g`
                <dynamic-list-repeater
                    ${t({listId:n,key:s,clean:i,label:a})}
                    ${e(()=>({data:r.data,counter:r.counter}))}
                ></dynamic-list-repeater>
            `}).join("")}var W_=({updateState:e,staticProps:t,bindProps:r,delegateEvents:o,invalidate:n,bindText:s,getProxi:i})=>{let a=i();return g`
        <div class="c-dynamic-list">
            <div class="c-dynamic-list__header">
                <div class="c-dynamic-list__top">
                    ${mk({delegateEvents:o,staticProps:t,bindProps:r,proxi:a})}
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
                    ${hk({bindProps:r,staticProps:t,proxi:a})}
                </div>
            </div>
        </div>
    `};function dk({staticProps:e,bindProps:t,delegateEvents:r,current:o,proxi:n}){return g`
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
    `}var j_=({staticProps:e,bindProps:t,delegateEvents:r,repeat:o,getProxi:n})=>{let s=n(),i=s.key.length>0?s.key:void 0;return g`
        <div class="c-dynamic-list-repeater">
            <h4 class="c-dynamic-list-repeater__title">${s.label}</h4>
            <div class="c-dynamic-list-repeater__list">
                ${o({observe:()=>s.data,clean:s.clean,key:i,afterUpdate:()=>{console.log("repeater updated")},render:({current:a})=>dk({staticProps:e,bindProps:t,delegateEvents:r,current:a,proxi:s})})}
            </div>
        </div>
    `};function fk(e){return[...Array.from({length:e}).keys()].map(t=>t+1)}var gk=({staticProps:e,delegateEvents:t,proxi:r})=>g`
        ${fk(r.counter).map(o=>g`
                    <div class="validate-test-wrapper">
                        <dynamic-list-card-inner
                            ${e({key:`${o}`})}
                            ${t({click:()=>{console.log("invalidate inside reepater click")}})}
                        >
                        </dynamic-list-card-inner>
                    </div>
                `).join("")}
    `,z_=({onMount:e,key:t,staticProps:r,bindProps:o,id:n,delegateEvents:s,invalidate:i,repeat:a,bindText:c,bindEffect:l,getProxi:p,computed:h})=>{let f=p(),d=0;h(()=>f.innerDataUnivoque,()=>f.innerData.filter((v,T,S)=>S.map(({key:_})=>_).indexOf(v.key)===T)),e(async()=>((async()=>(await m.tick(),"isMounted"in f&&(f.isMounted=!0)))(),()=>{}));let y=f.isFull?"is-full":"";return g`
        <div
            class="c-dynamic-card ${y}"
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
                        ${s({click:async()=>{d=d<Yn.length-1?d+1:0,f.innerData=Yn[d],await m.tick()}})}
                    >
                        Update:
                    </dynamic-list-button>

                    <!-- repeater by key -->
                    <div class="c-dynamic-card__repeater">
                        ${a({observe:()=>f.innerDataUnivoque,key:"key",render:({current:v})=>g`<dynamic-list-card-inner
                                    ${o(()=>({key:`${v.value.key}`}))}
                                ></dynamic-list-card-inner>`})}
                    </div>

                    <!-- repeater no key -->
                    <div class="c-dynamic-card__repeater">
                        ${a({observe:()=>f.innerData,render:({current:v})=>g`<dynamic-list-card-inner
                                    ${o(()=>({key:`${v.value.key}`}))}
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
                        ${i({observe:()=>f.counter,render:()=>gk({delegateEvents:s,staticProps:r,proxi:f})})}
                    </div>
                </div>
            </div>
        </div>
    `};var H_=({bindText:e})=>g`<span class="dynamic-list-card-inner">
        <span>${e`${"key"}`}</span>
    </span>`;var Nc=m.createComponent({tag:"dynamic-list-card-inner",component:H_,props:{key:()=>({value:"",type:String})}});var U_=({getState:e,bindText:t})=>{let{parentListId:r}=e();return g`<div class="dynamic-counter">
        <p class="c-dynamic-counter__title">Nested:</p>
        <p class="c-dynamic-counter__subtitle">(slotted)</p>
        <p class="c-dynamic-counter__list">list index: ${r}</p>
        <span>${t`${"counter"}`}</span>
    </div>`};var G_=m.createComponent({tag:"dynamic-list-counter",component:U_,props:{parentListId:()=>({value:-1,type:Number}),counter:()=>({value:0,type:Number})}});var q_=()=>g`<div class="c-dynamic-list-empty">
        <p>empty comp</p>
        <mobjs-slot name="empty-slot"></mobjs-slot>
    </div>`;var J_=m.createComponent({tag:"dynamic-list-empty",component:q_});var Y_=m.createComponent({tag:"dynamic-list-card",component:z_,props:{parentListId:()=>({value:-1,type:Number}),isFull:()=>({value:!1,type:Boolean}),label:()=>({value:"-",type:String}),index:()=>({value:-1,type:Number}),counter:()=>({value:1,type:Number})},state:{innerData:()=>({value:Yn[0],type:Array}),innerDataUnivoque:()=>({value:Yn[0],type:Array}),isSelected:()=>({value:!1,type:Boolean}),isMounted:()=>({value:!1,type:Boolean})},child:[G_,J_,Nc,Jn]});var X_=({bindText:e})=>g`<div class="c-dynamic-list-slotted-label">
        <p class="content">${e`slotted: ${"label"}`}</p>
    </div>`;var K_=m.createComponent({tag:"dynamic-slotted-label",component:X_,props:{label:()=>({value:"",type:String})}});var Q_=m.createComponent({tag:"dynamic-list-repeater",component:j_,props:{data:()=>({value:[],type:Array}),key:()=>({value:"",type:String}),clean:()=>({value:!1,type:Boolean}),listId:()=>({value:-1,type:Number}),counter:()=>({value:-1,type:Number}),label:()=>({value:"",type:String})},child:[Y_,K_]});var Z_=m.createComponent({tag:"dynamic-list",component:W_,state:{counter:()=>({value:1,type:Number,validate:e=>e<=10&&e>=0,strict:!0}),data:()=>({value:Pc,type:Array}),activeSample:()=>({value:3,type:Number})},child:[Jn,Q_,Nc]});m.useComponent([Z_]);var eS=()=>g` <dynamic-list> </dynamic-list> `;var tS=({refs:e})=>{let t=H.createTimeTween({data:{scale:0},duration:3e3,ease:"easeOutBack",stagger:{each:8,from:"end"}}),r=H.createTimeTween({data:{scale:1},duration:6e3,ease:"easeInOutQuad",stagger:{each:12,from:"end"}});e.forEach(i=>{t.subscribeCache(({scale:a})=>{i.style.scale=`${a}`}),r.subscribeCache(({scale:a})=>{i.style.scale=`${a}`})});let o=Me.createAsyncTimeline({repeat:1,autoSet:!1}).goTo(t,{scale:1}),n=Me.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(r,{scale:1.1}),s=ee.watch("navigationIsOpen",i=>{if(i){o.isActive()&&o.pause(),n.isActive()&&n.pause();return}o.isActive()&&o.resume(),n.isActive()&&n.resume()});return{playIntro:()=>o?.play(),playSvg:()=>{n?.play()},destroy:()=>{s(),t.destroy(),t=null,o.destroy(),o=null,r.destroy(),r=null,n.destroy(),n=null}}};var bk=async({playIntro:e,playSvg:t})=>{await e(),t()},rS=({onMount:e,getProxi:t})=>{let r=t(),{svg:o}=r;return e(({element:n})=>{let s=[...n.querySelectorAll("svg")],{destroy:i,playIntro:a,playSvg:c}=tS({refs:s});return setTimeout(()=>{bk({playIntro:a,playSvg:c})},500),()=>{i()}}),g`<div class="l-index">
        <div class="l-index__logo">
            ${o.map(n=>g`${n}`).join("")}
        </div>
    </div>`};var oS=m.createComponent({tag:"home-component",component:rS,props:{svg:()=>({value:[],type:Array})},state:{isMounted:()=>({value:!1,type:Boolean})}});var yo=({svg:e,id:t})=>{let r=document.createRange().createContextualFragment(e),o=r.querySelectorAll('[type="layer"]'),n=r.querySelectorAll('[type="delete"]');return[...o].forEach(i=>{i.id!==t&&i.remove()}),[...n].forEach(i=>{i.remove()}),$y(r)};m.useComponent([oS]);var nS=async()=>{let{data:e}=await ne({source:"./asset/svg/ms_nord_type.svg?v=1.4"}),{data:t}=await ne({source:"./asset/svg/lettering-mob.svg?v=1.3"}),[r,o,n,s,i,a,c,l,p,h,f]=["due","tre","quattro","cinque","sei","sette","otto","nove","dieci","undici","dodici"].map(d=>yo({svg:e,id:d}));return g`
        <div>
            <div class="background-shape">${t}</div>
            <home-component
                ${m.staticProps({svg:[r,o,n,s,i,a,c,l,p,h,f]})}
            ></home-component>
        </div>
    `};var sS=[{state:"level1",maxItem:10,ref:"level1_counter",label_plus:"level1 +",label_minus:"level1 -"},{state:"level2",maxItem:10,ref:"level2_counter",label_plus:"level2 +",label_minus:"level2 -"},{state:"level3",maxItem:6,ref:"level3_counter",label_plus:"level3 +",label_minus:"level3 -"}];function vk(e){return Math.floor(Math.random()*e)}var Ac=({delegateEvents:e,updateState:t,invalidate:r,proxi:o})=>g`
        ${sS.map(n=>g` <div class="matrioska__head__item">
                    <dynamic-list-button
                        class="matrioska__button"
                        ${e({click:async()=>{t(n.state,s=>s.slice(0,-1))}})}
                        >${n.label_minus}</dynamic-list-button
                    >
                    <dynamic-list-button
                        class="matrioska__button"
                        ${e({click:async()=>{t(n.state,s=>[...s,{key:vk(1e3),value:u.getUnivoqueId()}])}})}
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
    `;var Xn=e=>{m.useMethodByName(e).toggleActive()};var iS=({repeat:e,staticProps:t,bindProps:r,delegateEvents:o,proxi:n})=>g`
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
                                ${o({click:()=>{Xn(i)}})}
                            >
                            </matrioska-item>
                            <matrioska-item
                                class="matrioska-item--3"
                                name="${a}"
                                ${t({level:"level 3"})}
                                ${r(()=>({key:`${s.value.key}`,value:`${s.value.value}`,index:s.index,counter:n.counter}))}
                                ${o({click:()=>{Xn(a)}})}
                            >
                            </matrioska-item>
                        </div>
                    `}})}
        </div>
    `;var aS=({repeat:e,staticProps:t,bindProps:r,delegateEvents:o,proxi:n})=>g`
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
                                ${iS({repeat:e,staticProps:t,delegateEvents:o,bindProps:r,proxi:n})}
                            </matrioska-item>
                        </div>
                    `})}
        </div>
    `;var cS=({delegateEvents:e,updateState:t,repeat:r,staticProps:o,bindProps:n,invalidate:s,getProxi:i})=>{let a=i();return g`<div class="matrioska">
        <div class="matrioska__head">
            ${Ac({delegateEvents:e,updateState:t,invalidate:s,proxi:a})}
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
                                    ${aS({repeat:r,staticProps:o,bindProps:n,delegateEvents:e,proxi:a})}
                                </matrioska-item>
                            </div>
                        `})}
            </div>
        </div>
    </div>`};var lS=({getProxi:e,bindText:t,id:r,bindEffect:o,addMethod:n})=>{let s=e();return n("toggleActive",()=>{s.active=!s.active}),g`<matrioska-item
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
    </matrioska-item>`};var uS=m.createComponent({tag:"matrioska-item",component:lS,props:{level:()=>({value:"",type:String}),key:()=>({value:"",strict:!0,type:String}),index:()=>({value:0,strict:!0,type:Number}),value:()=>({value:"",type:String}),counter:()=>({value:-1,type:Number})},state:{active:()=>({value:!1,type:Boolean})},style:":host { display: block; } "});var pS=({staticProps:e,delegateEvents:t,invalidate:r,bindProps:o,proxi:n})=>g` <div class="matrioska__level matrioska__level--3">
        ${r({observe:"level3",render:()=>n.level3.map((s,i)=>{let a=u.getUnivoqueId(),c=u.getUnivoqueId();return g`
                            <div
                                class="matrioska__item-wrap matrioska__item-wrap--3"
                            >
                                <matrioska-item
                                    class="matrioska-item--3"
                                    name="${a}"
                                    ${e({level:"level 3",value:s.value,index:i,key:`${s.key}`})}
                                    ${o(()=>({counter:n.counter}))}
                                    ${t({click:()=>{Xn(a)}})}
                                >
                                </matrioska-item>
                                <matrioska-item
                                    class="matrioska-item--3"
                                    name="${c}"
                                    ${e({level:"level 3",index:i,value:s.value,key:`${s.key}`})}
                                    ${o(()=>({counter:n.counter}))}
                                    ${t({click:()=>{Xn(c)}})}
                                >
                                </matrioska-item>
                            </div>
                        `}).join("")})}
    </div>`;var mS=({staticProps:e,bindProps:t,delegateEvents:r,invalidate:o,proxi:n})=>g`
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
                                        ${pS({staticProps:e,delegateEvents:r,invalidate:o,bindProps:t,proxi:n})}
                                    </matrioska-item>
                                </div>
                            `).join("")})}
        </div>
    `;var hS=({delegateEvents:e,updateState:t,staticProps:r,bindProps:o,invalidate:n,getProxi:s})=>{let i=s();return g`<div class="matrioska">
        <div class="matrioska__head">
            ${Ac({delegateEvents:e,updateState:t,invalidate:n,proxi:i})}
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
                                            ${mS({staticProps:r,bindProps:o,delegateEvents:e,invalidate:n,proxi:i})}
                                        </matrioska-item>
                                    </div>
                                `).join("")})}
            </div>
        </div>
    </div>`};var yk=e=>{for(let t=e.length-1;t>0;t--){let r=Math.floor(Math.random()*(t+1));[e[t],e[r]]=[e[r],e[t]]}return e},dS={state:{level1:()=>({value:[{key:1,value:u.getUnivoqueId()}],type:Array,validate:e=>e.length<=10,strict:!0}),level2:()=>({value:[{key:1,value:u.getUnivoqueId()},{key:2,value:u.getUnivoqueId()}],type:Array,validate:e=>e.length<=10,strict:!0}),level3:()=>({value:[{key:1,value:u.getUnivoqueId()},{key:2,value:u.getUnivoqueId()}],type:Array,transform:(e,t)=>e>t?yk(e):e,validate:e=>e.length<=6,strict:!0}),counter:()=>({value:0,type:Number})},child:[Jn,uS]},fS=m.createComponent({tag:"page-matrioska-repeat",component:cS,...dS}),gS=m.createComponent({tag:"page-matrioska-invalidate",component:hS,...dS});m.useComponent([fS,gS]);var bS=()=>g` <page-matrioska-repeat> </page-matrioska-repeat> `,vS=()=>g` <page-matrioska-invalidate> </page-matrioska-invalidate> `;var hp=0,Tk=({indicators:e,proxi:t})=>[...e].map((r,o)=>Ke.createScrollTrigger({item:r,pin:!0,animateAtStart:!1,animatePin:!0,useThrottle:!0,ease:!1,dynamicStart:{position:"right",value:()=>window.innerWidth+hp-ze(r)*(o+1)},dynamicEnd:{position:"right",value:()=>{let n=e.length-(o-2);return window.innerWidth/10*9*n}},onEnter:()=>{t.currentIdFromScroll=o},onLeaveBack:()=>{t.currentIdFromScroll=o-1}})),yS=({pins:e})=>{e.forEach(t=>t.refresh())},_k=({titles:e})=>[...e].map(t=>Ke.createParallax({item:t,propierties:"x",reverse:!0,range:9})),TS=({nav:e})=>{e.classList.add("active"),[...document.querySelectorAll(".js-indicator")].forEach(r=>{r.classList.add("active")})},_S=({nav:e})=>{e.classList.remove("active"),[...document.querySelectorAll(".js-indicator")].forEach(r=>{r.classList.remove("active")})},SS=({indicators:e,titles:t,nav:r,animatePin:o,proxi:n,rootRef:s})=>{let i=Tk({indicators:e,proxi:n}),a=_k({titles:t}),c=document.querySelector(".l-navcontainer__side");hp=ze(c)/2;let l=u.useResize(()=>{hp=ze(c)/2}),p=new ri({root:s,container:".js-container",row:".js-row",column:".js-column",trigger:".js-trigger",shadowClass:".shadowClass",useWillChange:!0,useDrag:!0,useSticky:!o,useThrottle:!0,animateAtStart:!1,ease:!0,easeType:"lerp",addCss:!0,columnHeight:70,columnWidth:100,columnAlign:"center",animatePin:o,breakpoint:"tablet",children:[...i,...a],onEnter:()=>{yS({pins:i}),TS({nav:r})},onEnterBack:()=>{yS({pins:i}),TS({nav:r})},onLeave:()=>{_S({nav:r})},onLeaveBack:()=>{_S({nav:r})}});return p.init(),{destroy:()=>{i.forEach(h=>{h?.destroy()}),i=[],a.forEach(h=>{h?.destroy()}),a=[],p.destroy(),p=null,l()},refresh:()=>p.refresh()}};var Sk=(e,t)=>e===0?1:e===t-1?-1:0,xk=({numOfCol:e,pinIsVisible:t,staticProps:r})=>{let o=t?"":"hidden";return[...Array.from({length:e}).keys()].map((n,s)=>g`
                <horizontal-scroller-section
                    ${r({id:s,pinClass:o})}
                ></horizontal-scroller-section>
            `).join("")},Ck=({numOfCol:e,proxi:t,staticProps:r,delegateEvents:o})=>[...Array.from({length:e}).keys()].map((n,s)=>g`
                <horizontal-scroller-button
                    ${r({id:s})}
                    ${o({click:()=>t.currentId=s})}
                ></horizontal-scroller-button>
            `).join(""),xS=({onMount:e,watch:t,staticProps:r,delegateEvents:o,setRef:n,getRef:s,getProxi:i})=>{let a=i();return e(({element:c})=>{if(ue.mq("max","desktop"))return;let l=10,p=[...c.querySelectorAll(".js-indicator")],h=c.querySelector(".js-nav"),f=[...c.querySelectorAll(".js-title h1")],{destroy:d}=SS({rootRef:s().js_root,indicators:p,titles:f,nav:h,animatePin:a.animatePin,proxi:a});return window.scrollTo(0,0),t(()=>a.currentId,(y,v)=>{let T=c.querySelector(`.shadowClass--section-${y} .shadowClass--in-center`),{top:S}=be(T),_=le(T),E=Number.parseInt(y)===0?window.innerHeight+1:S+_-window.innerHeight,x=Math.max(1,Math.abs(y-v)),w=2e3,N=1+(l-x)/l*.9,A=x/l*w*N;Or.to(E+Sk(y,l),{duration:A})}),()=>{d()}}),ue.mq("max","desktop")?g`<div><only-desktop></only-desktop></div>`:g`<div class="l-h-scroller">
        <only-desktop></only-desktop>
        <div class="l-h-scroller__top">scroll down</div>
        <ul class="l-h-scroller__nav js-nav" ${n("js_nav")}>
            ${Ck({numOfCol:10,proxi:a,staticProps:r,delegateEvents:o})}
        </ul>
        <div class="l-h-scroller__root js-root" ${n("js_root")}>
            <div
                class="l-h-scroller__container js-container"
                ${n("js_container")}
            >
                <div class="l-h-scroller__row js-row" ${n("js_root")}>
                    ${xk({numOfCol:10,pinIsVisible:!a.animatePin,staticProps:r})}
                </div>
                <div
                    class="l-h-scroller__trigger js-trigger"
                    ${n("js_trigger")}
                ></div>
            </div>
        </div>
        <div class="l-h-scroller__bottom">scroll up</div>
    </div>`};var CS=({getProxi:e})=>{let t=e();return g`
        <li>
            <button
                type="button"
                data-id="${t.id}"
                class="l-h-scroller__nav__btn"
            >
                ${t.id}
            </button>
        </li>
    `};var ES=m.createComponent({tag:"horizontal-scroller-button",component:CS,props:{id:()=>({value:-1,type:Number})}});var wS=({getState:e})=>{let{id:t,pinClass:r}=e();return g`
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
    `};var IS=m.createComponent({tag:"horizontal-scroller-section",component:wS,props:{id:()=>({value:-1,type:Number}),pinClass:()=>({value:"",type:String})}});var MS=m.createComponent({tag:"horizontal-scroller",component:xS,props:{animatePin:()=>({value:!1,type:Boolean})},state:{currentId:()=>({value:0,type:Number,skipEqual:!1}),currentIdFromScroll:()=>({value:0,type:Number})},child:[ES,IS]});m.useComponent([MS]);var kS=async()=>(Se({active:!0,prevRoute:"",nextRoute:"",backRoute:""}),g`<div>
        <horizontal-scroller
            ${m.staticProps({animatePin:!1})}
        ></horizontal-scroller>
    </div>`);var RS=({getState:e})=>{let{fill:t}=e();return g`
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
    `};var PS=m.createComponent({tag:"svg-star",component:RS,props:{fill:()=>({value:"#000000",type:String})}});var Ek=({delegateEvents:e,bindEffect:t,bindObject:r,proxi:o})=>g`<div
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
                    ${e({input:n=>{let s=n.currentTarget.value??0;o.factor=Number(s)}})}
                />
            </div>
            <div>${r`factor: ${()=>o.factor}`}</div>
        </div>
        <div class="c-move3d-page__controls__block">
            <div class="c-move3d-page__controls__range">
                <input
                    type="range"
                    value=${o.xDepth}
                    ${e({input:n=>{let s=n.currentTarget.value??0;o.xDepth=Number(s)}})}
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
                    ${e({input:n=>{let s=n.currentTarget.value??0;o.xLimit=Number(s)}})}
                />
            </div>
            <div>${r`xLimit: ${()=>o.xLimit}`}</div>
        </div>
        <div class="c-move3d-page__controls__block">
            <div class="c-move3d-page__controls__range">
                <input
                    type="range"
                    value=${o.yDepth}
                    ${e({input:n=>{let s=n.currentTarget.value??0;o.yDepth=Number(s)}})}
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
                    ${e({input:n=>{let s=n.currentTarget.value??0;o.yLimit=Number(s)}})}
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
    </div>`,NS=({bindProps:e,delegateEvents:t,bindObject:r,getProxi:o,bindEffect:n})=>{let s=o();return g`<div>
        <button
            type="button"
            class="c-move3d-page__controls__open"
            ${t({click:()=>{s.controlsActive=!0}})}
        >
            show controls
        </button>
        ${Ek({delegateEvents:t,bindEffect:n,bindObject:r,proxi:s})}
        <move-3d
            ${e(()=>({shape:s.data,xDepth:s.xDepth,yDepth:s.yDepth,xLimit:s.xLimit,yLimit:s.yLimit,factor:s.factor,debug:s.debug,drag:s.drag}))}
        ></move-3d>
    </div>`};var wk=({debug:e,id:t})=>e?g`<span class="c-move3d-item__debug">${t}</span>`:"",dp=({data:e,root:t,childrenId:r,debug:o})=>e.map(({children:n,props:s})=>g`<move-3d-item
                name="${r}"
                ${m.staticProps({root:t,...s})}
            >
                ${wk({debug:o,id:s.id})}
                ${dp({data:n??[],root:!1,childrenId:r,debug:o})}
            </move-3d-item>`).join("");var fp=({element:e})=>({height:le(e),width:ze(e),offSetLeft:be(e).left,offSetTop:be(e).top}),AS=({childrenId:e})=>m.useMethodArrayByName(e).map(r=>o=>r?.move?.(o)),OS=({ratio:e})=>({get3dItemUnit:t=>`min(${t}px, calc((((100vw) * ${t}) / ${e} )))`});var Kn=()=>{},$S=({onMount:e,setRef:t,getRef:r,watch:o,computed:n,invalidate:s,getProxi:i,bindEffect:a})=>{let c=u.getUnivoqueId(),l=i(),p=0,h=0,f=0,d=0,y=0,v=0,T=0,S=0,_=!1,E=!1,x={x:0,y:0},w=0,I=Kn,N=Kn,A=Kn,O=Kn,R=Kn,P=Kn,$=[],D=H.createSpring({data:{delta:0,ax:0,ay:0}}),k=()=>{_=!1},L=()=>{let{vw:V,vh:U}=l.centerToViewoport||l.drag?{vw:window.innerWidth,vh:window.innerHeight}:{vw:h,vh:p},te=x.x,ce=x.y,{xgap:G,ygap:oe}=_?E?(E=!1,{xgap:0,ygap:0}):{xgap:te-y,ygap:ce-T}:{xgap:0,ygap:0};_&&(v+=G,S+=oe);let{xInMotion:se,yInMotion:re}=_?{xInMotion:v,yInMotion:S}:{xInMotion:te,yInMotion:ce},{ax:ke,ay:je}=l.centerToViewoport||l.drag?{ax:-(V/2-se)/l.xDepth,ay:(U/2-re)/l.yDepth}:{ax:-(V/2-(se-f))/l.xDepth,ay:(U/2-(re-d))/l.yDepth};y=te,T=ce;let X=ke>l.xLimit||ke<-l.xLimit,ye=je>l.yLimit||je<-l.yLimit;X&&(v-=G),ye&&(S-=oe);let Re=ue.clamp(ke,-l.xLimit,l.xLimit),Oe=ue.clamp(je,-l.yLimit,l.yLimit),Ye=Math.hypot(Math.abs(Oe),Math.abs(Re));D.goTo({delta:Ye,ax:Re,ay:Oe}).catch(()=>{}),$.forEach($e=>{$e({delta:Ye,factor:l.factor})})},C=V=>{w!==V&&(x.y-=w,w=V,x.y+=w),L()},M=({page:V})=>V.y>d&&V.y<d+p&&V.x>f&&V.x<f+h,F=({page:V})=>{M({page:V})&&(_=!0,E=!0)},B=()=>{P(),P=l.useScroll?u.useScroll(({scrollY:V})=>{C(V)}):()=>{}};return e(({element:V})=>{let{container:U}=r();l.afterInit(V);let te=D.subscribe(({delta:se,ax:re,ay:ke})=>{U.style.transform=`translate3D(0,0,0) rotateY(${re}deg) rotateX(${ke}deg)`,"onUpdate"in l&&l.onUpdate({delta:se,deltaX:re,deltaY:ke})}),ce=D.onComplete(({ax:se,ay:re})=>{U.style.transform=`rotateY(${se}deg) rotateX(${re}deg)`}),G=u.useMouseMove(({page:se})=>{x={x:se.x,y:se.y},L()}),oe=u.useResize(()=>{({height:p,width:h,offSetTop:d,offSetLeft:f}=fp({element:V}))});return o(()=>l.drag,se=>{if(R(),O(),A(),N(),I(),se){v=window.innerWidth/2,S=window.innerHeight/2,I=u.useTouchStart(({page:re})=>{F({page:re})}),N=u.useTouchEnd(()=>{k()}),A=u.useMouseDown(({page:re})=>{F({page:re})}),O=u.useMouseUp(()=>{k()}),R=u.useTouchMove(({page:re})=>{x={x:re.x,y:re.y},L()});return}},{immediate:!0}),o(()=>l.useScroll,(se,re)=>{if(se){B();return}se!==re&&P()}),n(()=>l.useScroll,()=>!l.drag&&!l.centerToViewoport),u.useNextLoop(()=>{({height:p,width:h,offSetTop:d,offSetLeft:f}=fp({element:V})),x={x:window.innerWidth/2,y:window.innerHeight/2},L()}),()=>{te(),ce(),oe(),G(),P(),I(),N(),A(),O(),R(),D.destroy(),$=[],D=null,p=null,h=null,f=null,d=null,y=null,v=null,T=null,S=null,_=null,E=null,x=null,w=null}}),g`<div
        class="c-move-3d"
        ${a({toggleClass:{"move3D--drag":()=>l.drag}})}
    >
        <div
            class="c-move-3d__scene"
            ${a({toggleStyle:{perspective:()=>`${l.perspective}px`}})}
        >
            <div class="c-move-3d__container" ${t("container")}>
                ${s({observe:[()=>l.shape,()=>l.debug],afterUpdate:()=>{$=AS({childrenId:c})},render:()=>dp({data:l.shape,root:!0,childrenId:c,debug:l.debug})})}
            </div>
        </div>
    </div>`};var gp=({startRotation:e,range:t,delta:r,limit:o})=>Number.parseFloat((t*r/o-e).toFixed(2)),LS=({rotate:e,anchorPoint:t,baseRotateX:r,baseRotateY:o})=>{if(!e||!t)return{rotateX:0,rotateY:0};switch(e.toUpperCase()){case"X":return(()=>{switch(t.toUpperCase()){case"BOTTOM":return{rotateX:r,rotateY:0};case"TOP":return{rotateX:-r,rotateY:0};default:return{rotateX:0,rotateY:0}}})();case"Y":return(()=>{switch(t.toUpperCase()){case"LEFT":return{rotateX:0,rotateY:o};case"RIGHT":return{rotateX:0,rotateY:-o};default:return{rotateX:0,rotateY:0}}})();case"XY":return(()=>{switch(t.toUpperCase()){case"TOP-LEFT":return{rotateX:-r,rotateY:o};case"TOP-RIGHT":return{rotateX:-r,rotateY:-o};case"BOTTOM-LEFT":return{rotateX:r,rotateY:o};case"BOTTOM-RIGHT":return{rotateX:r,rotateY:-o};default:return{rotateX:0,rotateY:0}}})();default:return{rotateX:0,rotateY:0}}};var Ik=e=>e?.tagName.length===0?"":g`
        <div class="c-move3d-item__component ${e?.className}">
            <${e.tagName} ${m.staticProps(e?.props??{})}>
            </${e.tagName}>
        </div>`,Mk=({delta:e,factor:t,initialRotate:r,depth:o,range:n,rotate:s,anchorPoint:i,lerp:a})=>{let c=Math.round(o*e/t),l={startRotation:r??0,range:n??20,delta:e,limit:t},p=gp(l),h=gp(l),f={rotate:s??"center",anchorPoint:i,baseRotateX:p,baseRotateY:h},{rotateX:d,rotateY:y}=LS(f);a.goTo({depth:c,rotateX:d,rotateY:y}).catch(()=>{})},DS=({getState:e,addMethod:t,onMount:r})=>{let{root:o,anchorPoint:n,animate:s,depth:i,rotate:a,width:c,height:l,offsetX:p,offsetY:h,range:f,initialRotate:d,initialDepth:y,classList:v,component:T}=e(),S=o?"is-root":"is-children",_=`--item-width:${c};`,E=`--item-height:${l};`,x=`--offset-x:${p};`,w=`--offset-y:${h};`,I=H.createLerp({data:{depth:0,rotateX:0,rotateY:0}});return t("move",({delta:N,factor:A})=>{s&&Mk({delta:N,factor:A,initialRotate:d,depth:i,range:f,rotate:a,anchorPoint:n,lerp:I})}),r(({element:N})=>{let A=I.subscribe(({depth:P,rotateX:$,rotateY:D})=>{let k=P+y;N.style.transform=`translate3D(0,0,${k}px) rotateX(${$}deg) rotateY(${D}deg)`}),O=I.onComplete(({depth:P,rotateX:$,rotateY:D})=>{let k=P+y;N.style.transform=`translateZ(${k}px) rotateX(${$}deg) rotateY(${D}deg)`}),R=y;return N.style.transform=`translateZ(${R}px)`,()=>{A(),O(),I.destroy(),I=null}}),g`<div
        class="c-move3d-item ${S} anchor-${n}"
        style="${_}${E}${x}${w}"
    >
        <div class="c-move3d-item__content ${v}"></div>
        ${Ik({tagName:T?.tagName??"",className:T?.className??"",props:T?.props??{}})}
        <mobjs-slot></mobjs-slot>
    </div>`};var FS=m.createComponent({tag:"move-3d-item",component:DS,props:{root:()=>({value:!0,type:Boolean}),depth:()=>({value:0,type:Number}),rotate:()=>({value:"x",type:String}),width:()=>({value:"0px",type:String}),height:()=>({value:"0px",type:String}),offsetX:()=>({value:"0px",type:String}),offsetY:()=>({value:"0px",type:String}),range:()=>({value:20,type:Number}),anchorPoint:()=>({value:"center",type:String}),animate:()=>({value:!0,type:Boolean}),initialRotate:()=>({value:0,type:Number}),initialDepth:()=>({value:0,type:Number}),classList:()=>({value:"",type:String}),component:{tagName:()=>({value:"",type:String}),className:()=>({value:"",type:String}),props:()=>({value:"",type:"any"})}},state:{id:()=>({value:"",type:String})}});var Qn=m.createComponent({tag:"move-3d",component:$S,props:{drag:()=>({value:!1,type:Boolean}),centerToViewoport:()=>({value:!1,type:Boolean}),perspective:()=>({value:700,type:Number}),xDepth:()=>({value:20,type:Number,validate:e=>e>1,strict:!0}),yDepth:()=>({value:20,type:Number,validate:e=>e>1,strict:!0}),xLimit:()=>({value:1e4,type:Number}),yLimit:()=>({value:1e4,type:Number}),factor:()=>({value:45,type:Number,validate:e=>e>1,strict:!0}),shape:()=>({value:[],type:Array}),debug:()=>({value:!1,type:Boolean}),afterInit:()=>({value:()=>{},type:Function}),onUpdate:()=>({value:()=>{},type:Function})},state:{useScroll:()=>({value:!0,type:Boolean})},child:[FS]});var BS=m.createComponent({tag:"move-3d-page",component:NS,props:{data:()=>({value:[],type:Array}),drag:()=>({value:!0,type:Boolean})},state:{xDepth:()=>({value:20,type:Number}),yDepth:()=>({value:20,type:Number}),xLimit:()=>({value:1e3,type:Number}),yLimit:()=>({value:1e3,type:Number}),perspective:()=>({value:700,type:Number}),debug:()=>({value:!1,type:Boolean}),factor:()=>({value:45,type:Number,validate:e=>e>1,strict:!0}),controlsActive:()=>({value:!1,type:Boolean})},child:[Qn]});m.useComponent([BS,PS]);var VS=async({props:e})=>{let{data:t,drag:r,prevRoute:o,nextRoute:n}=e,{data:s}=await ne({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:o,nextRoute:n,backRoute:"#plugin-overview"}),g` <div>
        <div class="background-shape">${s}</div>
        <move-3d-page
            ${m.staticProps({data:t,drag:r})}
        ></move-3d-page>
    </div>`};var{get3dItemUnit:z}=OS({ratio:1980}),WS=[{props:{id:0,depth:0,anchorPoint:"center",classList:"move3d-square",animate:!0,width:z(150),height:z(150)},children:[{props:{id:1,depth:200,width:z(150),height:z(150),rotate:"",anchorPoint:"center",initialDepth:100,classList:"move3d-square has-star pippo",component:{tagName:"svg-star",className:"move3d-square__star",props:{fill:"#f28f3b"}},animate:!0},children:[]},{props:{id:2,depth:200,width:z(80),height:z(80),offsetX:z(40),offsetY:z(40),rotate:"",initialDepth:200,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:3,depth:200,width:z(80),height:z(80),offsetX:z(-10),offsetY:z(80),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:4,depth:200,width:z(80),height:z(80),offsetX:z(80),offsetY:z(80),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:5,depth:200,width:z(80),height:z(80),offsetX:z(-10),offsetY:z(-10),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:6,depth:200,width:z(80),height:z(80),offsetX:z(80),offsetY:z(-10),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:7,depth:100,width:z(150),height:z(150),rotate:"x",range:20,anchorPoint:"bottom",classList:"move3d-square",animate:!0},children:[{props:{id:8,depth:0,width:z(150),height:z(150),rotate:"x",range:30,anchorPoint:"bottom",classList:"move3d-square",animate:!0},children:[]}]},{props:{id:9,depth:100,width:z(150),height:z(150),rotate:"x",range:20,anchorPoint:"top",classList:"move3d-square",animate:!0},children:[{props:{id:10,depth:0,width:z(150),height:z(150),rotate:"x",range:20,anchorPoint:"top",classList:"move3d-square",animate:!0},children:[]}]},{props:{id:11,depth:100,width:z(150),height:z(150),rotate:"y",range:20,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[{props:{id:12,depth:0,width:z(150),height:z(150),rotate:"y",range:30,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[{props:{id:13,depth:0,width:z(150),height:z(150),rotate:"y",range:40,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[]}]}]},{props:{id:13,depth:100,width:z(150),height:z(150),rotate:"y",range:20,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[{props:{id:14,depth:0,width:z(150),height:z(150),rotate:"y",range:30,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[{props:{id:15,depth:0,width:z(150),height:z(150),rotate:"y",range:40,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[]}]}]},{props:{id:16,depth:150,rotate:"xy",width:z(150),height:z(150),offsetX:z(20),offsetY:z(20),range:20,anchorPoint:"bottom-left",classList:"move3d-square",animate:!0},children:[{props:{id:17,depth:100,rotate:"",width:z(150),height:z(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:18,depth:150,rotate:"xy",width:z(150),height:z(150),offsetX:z(20),offsetY:z(20),range:20,anchorPoint:"bottom-right",classList:"move3d-square",animate:!0},children:[{props:{id:19,depth:100,rotate:"",width:z(150),height:z(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:20,depth:150,rotate:"xy",width:z(150),height:z(150),offsetX:z(20),offsetY:z(20),range:20,anchorPoint:"top-left",classList:"move3d-square",animate:!0},children:[{props:{id:21,depth:100,rotate:"",width:z(150),height:z(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:22,depth:150,rotate:"xy",width:z(150),height:z(150),offsetX:z(20),offsetY:z(20),range:20,anchorPoint:"top-right",classList:"move3d-square",animate:!0},children:[{props:{id:23,depth:100,rotate:"",width:z(150),height:z(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]}]}];var jS={shape1:{prevRoute:"",nextRoute:"#plugin-dragger",data:WS,drag:!0}};var zS=({getState:e})=>{let{content:t}=e();return g`${t}`};var Zn=m.createComponent({tag:"any-component",component:zS,props:{content:()=>({value:"",type:String})}});var HS=({elements:e})=>{let t=180/Math.PI,r=window.innerWidth,o=window.innerHeight,n=0,s=0,i=0,a=H.createSpring({data:{x:0,y:0},stagger:{each:3,from:"start"}});e.forEach(h=>{a.subscribe(({x:f,y:d})=>{h.style.translate=`${f}px ${d}px`})});let c=H.createSpring({data:{rotation:0},stagger:{each:8,from:"start"}});e.forEach(h=>{h&&c.subscribeCache(({rotation:f})=>{h.style.rotate=`${f}deg`})});let l=u.useResize(()=>{r=window.innerWidth,o=window.innerHeight}),p=u.useMouseMove(({client:h})=>{let{x:f,y:d}=h,y=d-n,v=f-s;if(Math.hypot(v,y)>10){n=d,s=f;let _=Math.atan2(y,v)*t+180+90-i;for(;_>180;)_-=360;for(;_<-180;)_+=360;i+=_,c.goTo({rotation:i})}a.goTo({x:f-r/2,y:d-o/2})});return{destroy:()=>{a.destroy(),a=null,c.destroy(),c=null,l(),p(),r=null,o=null,n=null,s=null,i=null}}};var kk=5,US=({onMount:e,getRefs:t,setRef:r})=>{let{starOutline:o}=Un(),n=[...Array.from({length:kk}).keys()].map(()=>`<span class='mouse-trail__item' ${r("star")}>${o}</span>`).join("");return e(()=>{let{star:s}=t(),{destroy:i}=HS({elements:s});return()=>{i()}}),g`<div class="mouse-trail">${n}</div>`};var Oc=m.createComponent({tag:"mouse-trail",component:US});var GS=({u0:e,u1:t,o:r,o_b:o,m1:n,m2:s,m3:i,m4:a,b1:c,b1_b:l,b3:p,b4:h,b5:f,sign:d,m1_b:y,m3_b:v,m4_b:T,b1_stone:S,m1_stone:_})=>[{props:{id:0,depth:200,anchorPoint:"center",classList:"",animate:!0},children:[{props:{id:1,depth:-500,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:e}}},children:[]},{props:{id:1,depth:-50,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:t}}},children:[]},{props:{id:2,depth:20,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:r}}},children:[{props:{id:2,depth:21,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:o}}},children:[]},{props:{id:3,depth:100,anchorPoint:"right",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:n}}},children:[{props:{id:3,depth:20,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:y}}},children:[]},{props:{id:6,depth:45,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:a}}},children:[]},{props:{id:6,depth:20,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:T}}},children:[]},{props:{id:6,depth:20,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:_}}},children:[]},{props:{id:4,depth:65,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:s}}},children:[]},{props:{id:4,depth:20,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:d}}},children:[]},{props:{id:5,depth:30,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:i}}},children:[]},{props:{id:5,depth:20,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:v}}},children:[]}]},{props:{id:6,depth:100,anchorPoint:"left",initialDepth:0,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:l}}},children:[{props:{id:6,depth:51,anchorPoint:"center",initialDepth:1,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:c}}},children:[]},{props:{id:7,depth:120,anchorPoint:"center",initialDepth:20,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:S}}},children:[]},{props:{id:8,depth:70,initialDepth:10,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:p}}},children:[]},{props:{id:10,depth:170,anchorPoint:"center",initialDepth:10,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:h}}},children:[]},{props:{id:11,depth:100,anchorPoint:"center",initialDepth:1,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:f}}},children:[]}]}]}]}];m.useComponent([Qn,Zn,Oc]);var qS=async()=>{let{data:e}=await ne({source:"./asset/svg/lettering-mob.svg?v=0.9"}),{data:t}=await ne({source:"./asset/svg/rdp.svg?v=1.3"}),[r,o,n,s,i,a,c,l,p,h,f,d,y,v,T,S,_,E,x]=["U0_block","U1_block","O_block","O_b_block","M1_block","M1_b_block","M2_block","M3_block","M3_b_block","M4_block","M4_b_block","B1_block","B1_b_block","B3_block","B4_block","B5_block","sign","Bstone_1_block","Mstone_1_block"].map(w=>yo({svg:e,id:w}));return Se({active:!0,prevRoute:"#rdp-01",nextRoute:"#mob-02",backRoute:"#svg-overview"}),g`<div class="l-mob-01">
        <div class="background-shape">${t}</div>
        <mouse-trail></mouse-trail>
        <move-3d
            ${m.staticProps({shape:GS({u0:r,u1:o,o:n,o_b:s,m1:i,m2:c,m3:l,m4:h,b1:d,b1_b:y,b3:v,b4:T,b5:S,sign:_,m1_b:a,m3_b:p,m4_b:f,b1_stone:E,m1_stone:x}),xDepth:100,yDepth:30,factor:20,xLimit:10,yLimit:20,drag:!0,perspective:1e3})}
        ></move-3d>
    </div>`};var JS=()=>ue.mq("min","desktop"),YS="#home",bp=null;m.afterRouteChange(({currentRoute:e})=>{e!=="onlyDesktop"&&(bp=m.getActiveParams(),YS=e)});var XS=({onMount:e,getProxi:t,bindEffect:r,watch:o})=>{let n=t();return n.active=JS(),e(()=>{let s=u.useResize(()=>{n.active=JS()});return o(()=>n.active,i=>{i&&m.loadUrl({url:YS,params:bp??{}})}),()=>{s(),bp=null}}),g`
        <a
            href="#home"
            class="l-only-desktop__link"
            ${r({toggleClass:{active:()=>n.active}})}
        >
            home page
        </a>
    `};var KS=m.createComponent({tag:"only-desktop-cta",component:XS,state:{active:()=>({value:!1,type:Boolean,skipEqual:!1})}});m.useComponent([KS]);var QS=async()=>{let{data:e}=await ne({source:"./asset/svg/lettering-mob-only-desktop.svg?v=0.1"}),{data:t}=await ne({source:"./asset/svg/lettering-mob.svg?v=1.3"});return g`
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
    `};var vp=({canvas:e,disableOffcanvas:t})=>{let{useOffscreen:r,context:o}=ft({disableOffcanvas:t}),n=!0,s=e.getContext(o,{alpha:!0}),i=m.getActiveRoute(),{offscreen:a,offScreenCtx:c}=gt({useOffscreen:r,canvas:e}),l=r?c:s,p=bo(l);l=null,e.width=e.clientWidth,e.height=e.clientHeight;let h=10,f=10,d=window.innerWidth/20,y=window.innerHeight/20,T=vo({canvas:e,numberOfRow:h,numberOfColumn:f,cellWidth:d,cellHeight:y,gutter:1}).items,S=T.map(L=>({...L,scale:1,rotate:0})),_=({row:L,col:C})=>{let M=(f+1)*L;return S[M+C]},x={..._({row:1,col:1}),scale:1,rotate:0},I={..._({row:4,col:5}),scale:1,rotate:0},N=H.createTimeTween({ease:"easeInOutQuad",stagger:{each:10,from:"edges"},data:{scale:1,rotate:0}}),A=H.createTimeTween({data:x,duration:1e3,ease:"easeInOutBack"}),O=H.createSpring({data:I});S.forEach(L=>{N.subscribeCache(({scale:C,rotate:M})=>{L.rotate=M,L.scale=C})}),A.subscribe(L=>{x=L}),O.subscribe(L=>{I=L});let R=Me.createAsyncTimeline({repeat:-1,autoSet:!1,yoyo:!0});R.goTo(N,{scale:.2,rotate:90},{duration:1e3});let P=Me.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1});P.goTo(A,{x:_({row:1,col:8}).x,rotate:360,scale:2}).createGroup({waitComplete:!1}).goTo(A,{y:_({row:8,col:8}).y,rotate:180}).goTo(O,{y:_({row:0,col:8}).y},{delay:500}).closeGroup().label({name:"my-label"}).createGroup({waitComplete:!1}).goTo(A,{x:_({row:8,col:1}).x,rotate:0,scale:1},{ease:"easeOutQuad",duration:500}).goTo(O,{rotate:360,scale:2},{delay:0}).closeGroup().createGroup({waitComplete:!1}).goTo(A,{y:_({row:1,col:1}).y,rotate:-180},{duration:1e3}).goTo(O,{rotate:0,y:_({row:8,col:8}).y,scale:1},{delay:200}).closeGroup();let $=()=>{if(!s)return;let L=e.width,C=e.height,M=r?c:s;if(M){r&&a?(a.width=L,a.height=C):M.reset(),S.forEach(({x:F,y:B,width:V,height:U,rotate:te,scale:ce,offsetXCenter:G,offsetYCenter:oe},se)=>{if(se===40){let Re=Math.PI/180*x.rotate,Oe=Math.cos(Re)*x.scale,Ye=Math.sin(Re)*x.scale;M.setTransform(Oe,Ye,-Ye,Oe,Math.floor(x.offsetXCenter+x.x),Math.floor(x.offsetYCenter+x.y)),p?(M.beginPath(),M.roundRect(Math.floor(-x.width/2),Math.floor(-x.height/2),Math.floor(x.width),x.height,150)):(M.beginPath(),M.rect(Math.floor(-x.width/2),Math.floor(-x.height/2),Math.floor(x.width),Math.floor(x.height))),M.fillStyle="#000000",M.fill()}let re=Math.PI/180*te,ke=Math.cos(re)*ce,je=Math.sin(re)*ce;M.setTransform(ke,je,-je,ke,Math.floor(G+F),Math.floor(oe+B));let X=Math.round(-V/2),ye=Math.round(-U/2);p?(M.beginPath(),M.roundRect(X,ye,V,U,150)):(M.beginPath(),M.rect(X,ye,V,U)),M.fillStyle="rgba(238, 238, 238, 0.9)",M.fill()});{let F=Math.PI/180*I.rotate,B=Math.cos(F)*I.scale,V=Math.sin(F)*I.scale;M.setTransform(B,V,-V,B,Math.floor(I.offsetXCenter+I.x),Math.floor(I.offsetYCenter+I.y)),p?(M.beginPath(),M.roundRect(Math.floor(-I.width/2),Math.floor(-I.height/2),Math.floor(I.width),Math.floor(I.height),150)):(M.beginPath(),M.rect(Math.floor(-I.width/2),Math.floor(-I.height/2),Math.floor(I.width),Math.floor(I.height))),M.fillStyle="#a86464",M.fill()}bt({useOffscreen:r,offscreen:a,ctx:s})}},D=()=>{$(),n&&u.useNextFrame(()=>D())};u.useFrame(()=>{D()});let k=ee.watch("navigationIsOpen",u.useDebounce(L=>{if(L){P.pause(),R.pause(),n=!1;return}setTimeout(async()=>{m.getActiveRoute().route===i.route&&(P.resume(),R.resume(),n=!0,u.useFrame(()=>D()))},200)},200));return{destroy:()=>{k(),s=null,a=null,c=null,T=[],n=!1,N?.destroy?.(),A?.destroy?.(),O?.destroy?.(),P?.destroy?.(),R?.destroy?.(),S=null,x=null,I=null,o=null,N=null,A=null,O=null,P=null,R=null},play:()=>{P.play(),R.isActive()||R.play()},playReverse:()=>{P.playReverse(),R.isActive()||R.play()},playFromLabel:()=>{P.setTween("my-label",[A,O]).then(()=>{P.playFrom("my-label").then(()=>{console.log("resolve promise playFrom")})}),R.isActive()||R.play()},playFromLabelReverse:()=>{P.setTween("my-label",[A,O]).then(()=>{P.playFromReverse("my-label").then(()=>{console.log("resolve promise playFrom")})}),R.isActive()||R.play()},revertNext:()=>{P.reverseNext()},pause:()=>{P.pause(),R.pause()},resume:()=>{P.resume(),R.resume()},stop:()=>{P.stop(),R.stop()}}};function Rk({buttons:e}){return Object.entries(e).map(([t,r])=>{let{label:o}=r;return g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn ${t}"
                >
                    ${o}
                </button>
            </li>`}).join("")}var ZS=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s,delegateEvents:i})=>{let a=s(),c={},l=()=>{};return e(({element:p})=>{let{canvas:h}=o();u.useFrame(()=>{u.useNextTick(()=>{l(),c=vp({canvas:h,...t()}),l=c.destroy,c?.play?.()})});let f=u.useResize(()=>{l(),c=vp({canvas:h,...t()}),l=c.destroy,c?.play?.()});return Object.entries(a.buttons).forEach(([d,y])=>{let{method:v}=y;p.querySelector(`.${d}`)?.addEventListener("click",()=>c?.[v]())}),u.useFrame(()=>{"isMounted"in a&&(a.isMounted=!0)}),()=>{f(),l()}}),g`
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
                        ${Rk({buttons:a.buttons})}
                    </ul>
                    <canvas ${r("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var Pk={"js-async-timeline-play":{label:"play",method:"play"},"js-async-timeline-playReverse":{label:"play reverse",method:"playReverse"},"js-async-timeline-play-label":{label:"play from label",method:"playFromLabel"},"js-async-timeline-playReverse-label":{label:"play from label reverse",method:"playFromLabelReverse"},"js-async-timeline-pause":{label:"pause",method:"pause"},"js-async-timeline-resume":{label:"resume",method:"resume"},"js-async-timeline-revert-next":{label:"revert next",method:"revertNext"},"js-async-timeline-stop":{label:"stop",method:"stop"}},ex=m.createComponent({tag:"async-timeline",component:ZS,props:{background:"",disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1,controlsActive:()=>({value:!1,type:Boolean}),buttons:()=>({value:Pk,type:"Any"})}});m.useComponent([ex]);var tx=async()=>{let{data:e}=await ne({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"#caterpillarN2",nextRoute:"#animatedPatternN0?version=0&activeId=0",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <async-timeline
            ${m.staticProps({background:e})}
        ></async-timeline>
    </div>`};var rx=({letter_d:e,letter_p:t,letter_r:r,letter_r_shadow:o,letter_d_shadow:n,letter_p_shadow:s,letter_r_pieces:i,letter_d_pieces:a,letter_p_pieces:c,letter_r_fill:l,letter_d_fill:p,letter_p_fill:h})=>[{props:{id:0,depth:200,anchorPoint:"center",classList:"",animate:!0},children:[{props:{id:0,depth:100,offsetX:"-2",offsetY:"-2",anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:e}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:n}}},children:[]},{props:{id:0,depth:40,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:a}}},children:[]},{props:{id:0,depth:100,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:p}}},children:[]},{props:{id:0,depth:-100,initialDepth:-1,offsetX:"-10",anchorPoint:"right",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:r}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:o}}},children:[]},{props:{id:0,depth:20,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:i}}},children:[]},{props:{id:0,depth:30,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:l}}},children:[]}]},{props:{id:0,depth:100,initialDepth:0,anchorPoint:"left",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:t}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:s}}},children:[]},{props:{id:0,depth:20,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:c}}},children:[]},{props:{id:0,depth:30,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:h}}},children:[]}]}]}]}];m.useComponent([Qn,Zn,Oc]);var ox=async()=>{let{data:e}=await ne({source:"./asset/svg/rdp.svg?v=0.4"}),{data:t}=await ne({source:"./asset/svg/lettering-mob.svg?v=1.3"}),[r,o,n,s,i,a,c,l,p,h,f,d]=["letter_d","letter_r","letter_p","letter_r_shadow","letter_d_shadow","letter_p_shadow","letter_r_pieces","letter_d_pieces","letter_p_pieces","letter_r_fill","letter_d_fill","letter_p_fill"].map(y=>yo({svg:e,id:y}));return Se({active:!0,prevRoute:"",nextRoute:"#mob-01",backRoute:"#svg-overview"}),g`<div class="l-rdp-01">
        <div class="background-shape">${t}</div>
        <mouse-trail></mouse-trail>
        <move-3d
            ${m.staticProps({shape:rx({letter_d:r,letter_r:o,letter_p:n,letter_r_shadow:s,letter_d_shadow:i,letter_p_shadow:a,letter_r_pieces:c,letter_d_pieces:l,letter_p_pieces:p,letter_r_fill:h,letter_d_fill:f,letter_p_fill:d}),xDepth:100,yDepth:30,factor:20,xLimit:10,yLimit:20,drag:!0,perspective:1e3})}
        ></move-3d>
    </div>`};var nx=({screenElement:e,scrollerElement:t,layer02:r})=>{let o=Ke.createParallax({item:r,align:"center",range:8,propierties:"x",ease:!1}),n=new _t({screen:e,scroller:t,direction:"horizontal",drag:!0,useHorizontalScroll:!0,easeType:"lerp",breakpoint:"small",children:[o]});return n.init(),n.set(55),{destroy:()=>{n.destroy(),o.destroy(),n=null,o=null}}};var sx=({getState:e,onMount:t,setRef:r,getRef:o})=>{let{layer02:n,layer03:s}=e();return t(()=>{let{screen:i,scroller:a,layer02:c}=o(),{destroy:l}=nx({screenElement:i,scrollerElement:a,layer02:c});return()=>{l()}}),g`<div class="mobbu2025">
        <div class="mobbu2025__screen" ${r("screen")}>
            <div class="mobbu2025__scroller" ${r("scroller")}>
                <div class="mobbu2025__layer">${s}</div>
                <div class="mobbu2025__layer" ${r("layer02")}>
                    ${n}
                </div>
            </div>
        </div>
    </div>`};var ix=m.createComponent({tag:"mobbu-2025",component:sx,props:{layer02:()=>({value:"",type:String}),layer03:()=>({value:"",type:String})}});m.useComponent([ix]);var ax=async()=>{let{data:e}=await ne({source:"./asset/svg/lettering-mob-2025-pure-optimized.svg?v=0.3"}),{data:t}=await ne({source:"./asset/svg/lettering-mob.svg?v=1.4"}),[r,o]=["layer-02","layer-03"].map(n=>yo({svg:e,id:n}));return Se({active:!0,prevRoute:"#mob-01",nextRoute:"",backRoute:"#svg-overview"}),g`<div class="l-mob-02">
        <div class="background-shape">${t}</div>
        <h3 class="l-mob-02__title">Scroll or Drag</h3>
        <mobbu-2025
            ${Ca({layer02:r,layer03:o})}
        ></mobbu-2025>
    </div>`};var cx="TOP-LEFT",lx="TOP-RIGHT",ux="BOTTOM-LEFT",px="BOTTOM-RIGHT",mx="CENTER";var Nk=e=>{let r=globalThis.getComputedStyle(e).transform;if(r==="none")return 0;let o=r.match(/matrix3d\(([^)]+)\)/);return o&&o[1].split(",").map(Number)[14]||0},hx=({align:e,root:t,child:r,containerClass:o,childrenClass:n,perspective:s,usePrespective:i,maxLowDepth:a=-200,maxHightDepth:c=200,onDepthChange:l=()=>{},depthFactor:p=30,hideThreshold:h=1})=>{let f=document.querySelector(o);f&&(f.style.cursor="grab");let d=[...f.querySelectorAll(n)],y=d.map(X=>{let ye=window.innerWidth,Re=window.innerHeight,Oe=X.offsetWidth,Ye=X.offsetHeight,$e=Nk(X),Dr=s-s*Oe/(ye*h)-$e,$t=s-s*Ye/(Re*h)-$e;return Math.min(Dr,$t)}),v=()=>{d.forEach((X,ye)=>{let Re=_>y[ye];X.classList.toggle("hide",Re)})},T=0,S=0,_=0,E=0,x=0,w=r.offsetWidth,I=r.offsetHeight,N=t.offsetWidth,A=t.offsetHeight,O=(w-N)/2,R=(I-A)/2,P={x:0,y:0},$=!1,D=!1,k=30,L=()=>{if(i&&s>0){let X=s/(s-_);O=(w-N/X)/2,R=(I-A/X)/2}else O=(w-N)/2,R=(I-A)/2};L();let C={xValue:0,yValue:0},M=H.createSpring({data:{x:0,y:0,z:0}});switch(e){case cx:{C={xValue:O,yValue:R},S=w,T=I;break}case lx:{C={xValue:-O,yValue:R},S=-w,T=I;break}case ux:{C={xValue:O,yValue:-R},S=w,T=-I;break}case px:{C={xValue:-O,yValue:-R},S=-w,T=-I;break}}let F=M.subscribe(({x:X,y:ye,z:Re})=>{r&&(r.style.transform=`translate3D(${X}px, ${ye}px, ${Re}px)`)});M.set({x:C.xValue,y:C.yValue}),[...t.querySelectorAll("a, button")].forEach(X=>{X.setAttribute("draggable","false"),X.style.userSelect="none"});let V=({page:X})=>{$=!0,D=!0,P={x:X.x,y:X.y}},U=({page:X})=>{let{x:ye,y:Re}=X,{xgap:Oe,ygap:Ye}=$?D?(D=!1,{xgap:0,ygap:0}):{xgap:ye-E,ygap:Re-x}:{xgap:0,ygap:0},$e=O>0?ue.clamp(S+Oe,-O,O):ue.clamp(S+Oe,O,-O),Dr=R>0?ue.clamp(T+Ye,-R,R):ue.clamp(T+Ye,R,-R),$t=$?$e:S,Y=$?Dr:T,{xComputed:Fr,yComputed:Ve}=$?{xComputed:$t,yComputed:Y}:{xComputed:ye,yComputed:Re};S=$t,T=Y,E=ye,x=Re,$&&(C={xValue:Fr,yValue:Ve},M.goTo({x:Fr,y:Ve}).catch(()=>{}))},te=u.useTouchStart(({page:X,target:ye})=>{V({page:X,target:ye})}),ce=u.useMouseDown(({page:X,target:ye})=>{V({page:X,target:ye})}),G=u.useTouchEnd(()=>{$=!1}),oe=u.useMouseUp(()=>{$=!1}),se=u.useMouseMove(({page:X})=>{U({page:X})}),re=u.useTouchMove(({page:X})=>{U({page:X})});f&&f.addEventListener("click",X=>{let{x:ye,y:Re}=P,Oe=Math.abs(E-ye)>k,Ye=Math.abs(x-Re)>k;(Oe||Ye)&&X.preventDefault()},!1),i&&f&&f.addEventListener("wheel",X=>{let{spinY:ye}=u.normalizeWheel(X);_=ue.clamp(_+ye*p,a,c),L(),S=O>0?ue.clamp(S,-O,O):ue.clamp(S,O,-O),T=R>0?ue.clamp(T,-R,R):ue.clamp(T,R,-R),l({depth:_}),M.goTo({x:S,y:T,z:_}).catch(()=>{})},{passive:!0});let ke=u.useMouseWheel(u.useDebounce(()=>{v()},100)),je=u.useResize(()=>{w=r.offsetWidth,I=r.offsetHeight,N=t.offsetWidth,A=t.offsetHeight,L()});return{destroy:()=>{F(),te(),G(),ce(),oe(),se(),re(),je(),ke(),M.destroy(),M=null,f=null,d=null,t=null,r=null}}};var dx=({getProxi:e,setRef:t,getRef:r,bindEffect:o,onMount:n})=>{let s=e();return n(({element:i})=>{let{child:a}=r(),c=a.firstChild;if(!c)return;let l=hx({align:s.align,root:i,child:c,usePrespective:s.usePrespective,perspective:s.perspective,maxLowDepth:s.maxLowDepth,maxHightDepth:s.maxHightDepth,depthFactor:s.depthFactor,onDepthChange:s.onDepthChange,containerClass:s.containerClass,childrenClass:s.childrenClass,hideThreshold:s.hideThreshold});return s.afterInit({root:i}),()=>{l.destroy(),i.remove(),a.remove(),a=null,c=null,i=null}}),g`<div class="c-dragger ${s.rootClass}">
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
    </div>`};var fx=m.createComponent({tag:"c-dragger",component:dx,props:{rootClass:()=>({value:"",type:String}),childrenClass:()=>({value:"",type:String}),containerClass:()=>({value:"",type:String}),initialZoom:()=>({value:1,type:Number}),ease:()=>({value:!0,type:Boolean}),align:()=>({value:mx,type:String,transform:e=>e.toUpperCase()}),usePrespective:()=>({value:!0,type:Boolean}),perspective:()=>({value:600,type:Number}),hideThreshold:()=>({value:1,type:Number}),depthFactor:()=>({value:30,type:Number}),maxLowDepth:()=>({value:-200,type:Number}),maxHightDepth:()=>({value:200,type:Number}),afterInit:()=>({value:()=>{},type:Function}),onDepthChange:()=>({value:()=>{},type:Function})}});m.useComponent([fx,Zn]);var gx=!1,bx=async()=>{let{data:e}=await ne({source:"./asset/svg/ms_nord_compact.svg?v=1.3"}),{data:t}=await ne({source:"./asset/svg/lettering-mob.svg?v=1.3"});Se({active:!0,prevRoute:"#move3D-shape1",nextRoute:"#math-animation-01",backRoute:"#plugin-overview"});let r=g`
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
            ${m.staticProps({rootClass:"dragger-component",containerClass:".l-dragger",childrenClass:".dragger-child",align:"CENTER",maxHightDepth:140,maxLowDepth:-200,perspective:300,hideThreshold:10,afterInit:({root:n})=>{gx&&console.log(n)},onDepthChange:({depth:n})=>{gx&&console.log(n)}})}
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
    </div>`};var vx=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=(le(t)-100)/2,s=3,i=2*Math.PI*s,a=0,c=(n-a)/i,l=1e3*s,p=e.map(v=>le(v)/2),h=H.createSequencer({ease:"easeLinear",stagger:{each:6},data:{angleInRadian:0,scale:0}}).goTo({angleInRadian:i},{start:0,end:10,ease:"easeLinear"}).goTo({scale:1},{start:0,end:4,ease:"easeOutQuad"}).goTo({scale:0},{start:9,end:10,ease:"easeOutQuad"});e.forEach((v,T)=>{let S=v.firstChild;h.subscribeCache(({angleInRadian:_,scale:E})=>{let x=a+c*_,w=x*Math.cos(_),I=x*Math.sin(_);v.style.transform=`translate3D(0px,0px,0px) translate(${w-p[T]}px, ${I-p[T]}px)`,S&&(S.style.scale=`${E}`)})});let f=Me.createSyncTimeline({repeat:-1,yoyo:!1,duration:l}).add(h);function d(){if(!o||!r)return;let v=r.width/2,T=r.height/2,S=200;o.clearRect(0,0,r.width,r.height),o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let _=0;_<=S;_++){let E=i/S*_,x=a+c*E,w=v+x*Math.cos(E),I=T+x*Math.sin(E);_===0?o.moveTo(w,I):o.lineTo(w,I)}o.stroke()}let y=u.useResize(()=>{r.width=r.clientWidth,r.height=r.clientHeight,d()});return d(),{play:()=>{f.play()},resume:()=>{f.resume()},stop:()=>{f.pause()},destroy:()=>{f.stop(),h.destroy(),f.destroy(),y(),o=null,h=null,f=null,e=null}}};var yx=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=H.createSpring({stagger:{each:6},data:{x:0}}),s=.06,i=le(t)/2-100,a=e.map(d=>le(d)/2);e.forEach((d,y)=>{n.subscribeCache(({x:v})=>{let T=Math.sin(v*s)*i,S=Math.cos(v*s)*i;d.style.transform=`translate3D(0px,0px,0px) translate(${T-a[y]}px, ${S-a[y]}px)`})}),n.set({x:0});let c=0,l=!1,p=()=>{let d=60/u.getFps();c+=d,n&&(n.goTo({x:c}).catch(()=>{}),l&&u.useNextFrame(()=>p()))};function h(){if(!o||!r)return;r.width=r.width;let d=r.width/2,y=r.height/2;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath(),o.arc(d,y,i,0,2*Math.PI),o.stroke()}let f=u.useResize(()=>{h()});return h(),{play:()=>{l||(l=!0,p())},resume:()=>{l||(l=!0,p())},stop:()=>{l=!1},destroy:()=>{n.destroy(),f(),o=null,n=null,e=null,c=null,l=null}}};var Tx=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=e.map(d=>le(d)/2),s=ze(t)/2-100,i=le(t),a=10,c=a/2/Math.PI,l=H.createSequencer({stagger:{each:5},data:{x:a/4,scale:0},duration:a}).goTo({x:a+a/4},{start:0,end:a,ease:"easeLinear"}).goTo({scale:1},{start:0,end:1.5,ease:"easeOutQuad"}).goTo({scale:0},{start:1.5,end:5,ease:"easeInQuad"}).goTo({scale:1},{start:5,end:8.5,ease:"easeOutQuad"}).goTo({scale:0},{start:8.5,end:10,ease:"easeInQuad"});e.forEach((d,y)=>{let v=d.firstChild;l.subscribeCache(({x:T,scale:S})=>{let _=T/c,E=2/(3-Math.cos(2*_)),x=E*Math.cos(_)*s,w=E*Math.sin(2*_)/2*i;d.style.transform=`translate3D(0px,0px,0px) translate(${x-n[y]}px, ${w-n[y]}px)`,v&&(v.style.scale=`${S}`)})});let p=Me.createSyncTimeline({repeat:-1,yoyo:!1,duration:3e3}).add(l);function h(){if(!o||!r)return;r.width=r.width;let d=r.width/2,y=r.height/2,v=200;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let T=0;T<=v;T++){let S=T/v*2*Math.PI,_=2/(3-Math.cos(2*S)),E=_*Math.cos(S)*s,x=_*Math.sin(2*S)/2*i;T===0?o.moveTo(d+E,y+x):o.lineTo(d+E,y+x)}o.stroke()}let f=u.useResize(()=>{h()});return h(),{play:()=>{p.play()},resume:()=>{p.resume()},stop:()=>{p.pause()},destroy:()=>{p.stop(),l.destroy(),p.destroy(),f(),o=null,l=null,p=null,e=null}}};function Ak(e,t,r,o=2e3){let n=0,s=e,i=0;for(let a=1;a<=o;a++){let c=r/o*a,l=e*Math.cos(t*c),p=l*Math.cos(c),h=l*Math.sin(c),f=p-s,d=h-i;n+=Math.hypot(f,d),s=p,i=h}return n}var _x=(e,t)=>t===0?e:_x(t,e%t);function Ok(e,t){let r=_x(e,t),o=t/r;return 2*Math.PI*o}var Sx=({targets:e,container:t,canvas:r}={},...o)=>{let[n,s,i,a]=o;if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let c=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let l=(le(t)-100)/2,p=n/s,h=Ok(n,s),f=Ak(l,p,h),d=i*(f/l),y=e.map(N=>le(N)/2),v=H.createSequencer({ease:"easeLinear",stagger:{each:a},data:{angleInRadian:0,scale:1}}).goTo({angleInRadian:h},{start:0,end:10,ease:"easeLinear"}),T=[],S=0,_=0;for(;_<h&&h>0&&p>0;)_=(Math.PI/2+S*Math.PI)/p,_>=0&&T.push(_),S++;let E=0;T.forEach(N=>{let A=N/h*10,O=Math.abs((A-E)/2);E=A;let R=Math.max(0,A-O),P=A,$=Math.min(10,A+O);$>R&&(v.goTo({scale:0},{start:R,end:P,ease:"easeInQuad"}),v.goTo({scale:1},{start:P,end:$,ease:"easeOutQuad"}))}),e.forEach((N,A)=>{let O=N.firstChild;v.subscribeCache(({angleInRadian:R,scale:P})=>{let $=l*Math.cos(p*R),D=$*Math.cos(R),k=$*Math.sin(R);N.style.transform=`translate3D(0px,0px,0px) translate(${D-y[A]}px, ${k-y[A]}px)`,O&&(O.style.scale=`${P}`)})});let x=Me.createSyncTimeline({repeat:-1,yoyo:!1,duration:d}).add(v);function w(){if(!c||!r)return;let N=r.width/2,A=r.height/2,O=2e3*s;c.clearRect(0,0,r.width,r.height),c.setLineDash([3,7]),c.lineDashOffset=3,c.strokeStyle="rgba(0, 0, 0, 0.5)",c.lineWidth=1,c.beginPath();for(let R=0;R<=O;R++){let P=h/O*R,$=l*Math.cos(p*P),D=N+$*Math.cos(P),k=A+$*Math.sin(P);R===0?c.moveTo(D,k):c.lineTo(D,k)}c.stroke()}let I=u.useResize(()=>{r.width=r.clientWidth,r.height=r.clientHeight,w()});return w(),{play:()=>{x.play()},resume:()=>{x.resume()},stop:()=>{x.pause()},destroy:()=>{x.stop(),v.destroy(),x.destroy(),I(),c=null,v=null,x=null,e=null}}};var xx=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=ze(t)-200,s=le(t)/3,i=2,a=n/(2*Math.PI*i),c=1500*i,l=e.map(y=>le(y)/2),p=H.createSequencer({ease:"easeLinear",stagger:{each:6},data:{x:0,scale:0}}).goTo({x:n},{start:0,end:10,ease:"easeLinear"}).goTo({scale:1},{start:0,end:10/i/2,ease:"easeOutQuad"}).goTo({scale:0},{start:10-10/i/2,end:10,ease:"easeOutQuad"});e.forEach((y,v)=>{let T=0,S=y.firstChild,_=-l[v]-n/2;p.subscribeCache(({x:E,scale:x})=>{let w=Math.sign(E-T)||1,I=Math.sin(E/a)*s*w;y.style.transform=`translate3D(0px,0px,0px) translate(${E+_}px, ${I-l[v]}px)`,S&&(S.style.scale=`${x}`),T=E})});let h=Me.createSyncTimeline({repeat:-1,yoyo:!0,duration:c}).add(p);function f(){if(!o||!r)return;r.width=r.width;let y=r.width/2,v=r.height/2,T=200,S=T*2;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let _=0;_<=S;_++){let{x:E,y:x}=(()=>{if(_<=T){let w=_/T*n,I=Math.sin(w/a)*s;return{x:w,y:I}}if(_>T){let I=(S-_)/T*n,N=Math.sin(I/a)*s*-1;return{x:I,y:N}}return{x:0,y:0}})();_===0?o.moveTo(y+E-n/2,v+x):o.lineTo(y+E-n/2,v+x)}o.stroke()}let d=u.useResize(()=>{f()});return f(),{play:()=>{h.play()},resume:()=>{h.resume()},stop:()=>{h.pause()},destroy:()=>{h.stop(),p.destroy(),h.destroy(),d(),o=null,p=null,h=null,e=null}}};var yp={sin:xx,circle:yx,infinite:Tx,archimede:vx,rosaDiGrandi:Sx};var Cx=()=>({play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}});var Ex=({getProxi:e,setRef:t,getRef:r,getRefs:o,delegateEvents:n,onMount:s})=>{let i=e(),a=i.showNavigation?"active":"",c=3,l=c/i.numberOfStaggers,p=Array.from({length:i.numberOfStaggers}).map((T,S)=>({size:c-l*S,opacity:1/S})),h=Cx(),{destroy:f,play:d,stop:y,resume:v}=h;return s(({element:T})=>{let{target:S}=o(),{canvas:_}=r();u.useFrame(()=>{({destroy:f,play:d,stop:y,resume:v}=yp[i.name]({targets:S,container:T,canvas:_},...i.args)),d()});let E=u.useResize(()=>{y(),f(),{destroy:f,play:d,stop:y,resume:v}=yp[i.name]({targets:S,container:T,canvas:_},...i.args),d()});return()=>{f(),E(),f=null,d=null,y=null,v=null}}),g`<div class="c-math">
        <canvas class="c-math__canvas" ${t("canvas")}></canvas>
        <div class="c-math__nav ${a}">
            <button
                type="button"
                class="c-math__play"
                ${n({click:()=>{v()}})}
            ></button>
            <button
                type="button"
                class="c-math__stop"
                ${n({click:()=>{y()}})}
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
    </div>`};var $c=m.createComponent({tag:"math-animation",component:Ex,props:{name:()=>({value:"",type:String}),showNavigation:()=>({value:!0,type:Boolean}),numberOfStaggers:()=>({value:5,type:Number}),args:()=>({value:[],type:Array})}});m.useComponent([$c]);var wx=async({props:e})=>{let{names:t}=e;return t.length>4&&console.warn("math layout, max item excedded"),Se({active:!0,prevRoute:"#plugin-dragger",nextRoute:"#rosa-di-grandi",backRoute:"#plugin-overview"}),g`<div class="l-math">
        ${t.map(r=>g`<div class="l-math__item">
                    <math-animation
                        ${m.staticProps({name:r})}
                    ></math-animation>
                </div>`).join("")}
    </div>`};var $k=({proxi:e,delegateEvents:t,bindObject:r})=>g`
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
                    ${t({input:o=>{let{currentTarget:n}=o;if(!n)return;let s=n.value;e.numeratorsLabel=Number(s)},change:o=>{let{currentTarget:n}=o;if(!n)return;let s=n.value;e.numerators=Number(s)}})}
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
    `,Ix=({getProxi:e,delegateEvents:t,invalidate:r,bindEffect:o,getRef:n,setRef:s,bindObject:i})=>{let a=e();return g`<div class="l-rosa">
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
            ${$k({proxi:a,getRef:n,setRef:s,delegateEvents:t,bindObject:i})}
        </ul>
        <div class="l-rosa__wrap">
            ${r({observe:[()=>a.numerators,()=>a.denominator],render:()=>g`
                        <math-animation
                            ${m.staticProps({name:"rosaDiGrandi",showNavigation:!1,numberOfStaggers:10,args:[a.numerators,a.denominator,a.duration,a.staggerEach]})}
                        ></math-animation>
                    `})}
        </div>
    </div>`};var Mx=m.createComponent({tag:"rosa-di-grandi-page",component:Ix,state:{numerators:()=>({value:2,type:Number}),denominator:()=>({value:3,type:Number}),numeratorsLabel:()=>({value:2,type:Number}),denominatorLabel:()=>({value:3,type:Number}),duration:()=>({value:500,type:Number}),staggerEach:()=>({value:4,type:Number}),controlsActive:()=>({value:!1,type:Boolean})},child:[$c]});m.useComponent([Mx]);var kx=async()=>(Se({active:!0,prevRoute:"#math-animation-01",nextRoute:"",backRoute:"#plugin-overview"}),g`<rosa-di-grandi-page></rosa-di-grandi-page>`);var _p="home",Dc="about",Q="template-mobJs-component",Ne="template-doc-default",es="template-listing",ut="template-animation",vt="template-test",Fc=new Set([Q,Ne]),pe=[{url:"./#mobJs-overview",title:"mobJs"},{url:"./#mobJs-component",title:"component"}],Qe=[{url:"./#mobJs-overview",title:"mobJs"}],Tp=[{url:"./#mobCore-overview",title:"mobCore"}],mr=[{url:"./#mobMotion-overview",title:"mobMotion"}],Lc=[{label:"store",url:"#mobCore-store"},{label:"events",url:"#mobCore-events"},{label:"defaults",url:"#mobCore-defaults"}],K=[{label:"initialization",url:"#mobJs-initialization"},{label:"component",url:"#mobJs-component"},{label:"routing",url:"#mobJs-routing"},{label:"tick",url:"#mobJs-tick"},{label:"memory management",url:"#mobJs-memory-management"},{label:"utils",url:"#mobJs-utils"},{label:"debug",url:"#mobJs-debug"}],qt=[{label:"tween/spring/lerp",url:"#mobMotion-tween-spring-lerp"},{label:"AsyncTimeline",url:"#mobMotion-async-timeline"},{label:"sequencer",url:"#mobMotion-sequencer"},{label:"SyncTimeline",url:"#mobMotion-sync-timeline"},{label:"CreateStagger",url:"#mobMotion-create-stagger"},{label:"ScrollTrigger",url:"#mobMotion-scrolltrigger"},{label:"Parallax",url:"#mobMotion-parallax"},{label:"Stagger",url:"#mobMotion-stagger"},{label:"Default",url:"#mobMotion-defaults"},{label:"Utils",url:"#mobMotion-utils"}],Bc=[{hash:"pageNotFound",layout:Vy,props:{}},{hash:"onlyDesktop",layout:QS,props:{}},{hash:"about",layout:YT,templateName:Dc,props:{}},{hash:"canvas-overview",layout:ic,templateName:es,props:{source:"./data/canvas/data.json"}},{hash:"animatedPatternN0",layout:b_,templateName:ut,props:{}},{hash:"animatedPatternN1",layout:T_,templateName:ut,props:{}},{hash:"caterpillarN1",layout:C_,templateName:ut,props:{}},{hash:"caterpillarN2",layout:M_,templateName:ut,props:{}},{hash:"async-timeline",layout:tx,templateName:ut,props:{}},{hash:"scrollerN0",layout:N_,templateName:ut,props:{}},{hash:"scrollerN1",layout:L_,templateName:ut,props:{}},{hash:"dynamic-list",layout:eS,templateName:vt,skipTransition:!0,props:{source:"./data/mob-js/general-repeat-test.json",breadCrumbs:Qe,title:"( test ) repeat & invalidate",section:"mobJs"}},{hash:"matrioska-repeat",layout:bS,templateName:vt,skipTransition:!0,props:{source:"./data/mob-js/matrioska.json",breadCrumbs:Qe,title:"( test ) matrioska repeat",section:"mobJs"}},{hash:"matrioska-invalidate",layout:vS,templateName:vt,skipTransition:!0,props:{source:"./data/mob-js/matrioska.json",breadCrumbs:Qe,title:"( test ) matrioska invalidate",section:"mobJs"}},{hash:"home",layout:nS,templateName:_p,props:{}},{hash:"mobCore-overview",layout:Be,skipTransition:!0,templateName:Ne,props:{source:"./data/mob-core/overview.json",title:"mobCore",breadCrumbs:[],section:"mobCore",rightSidebar:Lc}},{hash:"mobCore-defaults",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-core/defaults.json",title:"Defaults",breadCrumbs:Tp,section:"mobCore",rightSidebar:Lc}},{hash:"mobCore-events",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-core/events.json",title:"Events",breadCrumbs:Tp,section:"mobCore",rightSidebar:Lc}},{hash:"mobCore-store",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-core/store.json",title:"Store",breadCrumbs:Tp,section:"mobCore",rightSidebar:Lc}},{hash:"mobJs-overview",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/overview.json",title:"mobJs",breadCrumbs:[],section:"mobJs",rightSidebar:K}},{hash:"mobJs-initialization",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/initialization.json",title:"initialization",breadCrumbs:Qe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-component",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/component.json",title:"component",breadCrumbs:Qe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-routing",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/routing.json",title:"routing",breadCrumbs:Qe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-benchmark-invalidate",layout:Lr,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-invalidate",breadCrumbs:Qe,source:"./data/mob-js/benchmark-invalidate.json",title:"( test ) benchmark invalidate",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-key",layout:Lr,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-key",breadCrumbs:Qe,source:"./data/mob-js/benchmark-repeat-without-key.json",title:"( test ) benchmark repeat without key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key",layout:Lr,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key",breadCrumbs:Qe,source:"./data/mob-js/benchmark-repeat-key.json",title:"( test ) benchmark repeat key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-component-no-key",layout:Lr,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-component-no-key",breadCrumbs:Qe,source:"./data/mob-js/benchmark-repeat-no-component-no-key.json",title:"( test ) benchmark repeat no component no key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-component-with-key",layout:Lr,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-component-with-key",breadCrumbs:Qe,source:"./data/mob-js/benchmark-repeat-no-component-with-key.json",title:"( test ) benchmark repeat no component with key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-key-nested",layout:Lr,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key-no-nested",breadCrumbs:Qe,source:"./data/mob-js/benchmark-repeat-without-key-nested.json",title:"( test ) benchmark repeat nested without key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key-nested",layout:Lr,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key-nested",breadCrumbs:Qe,source:"./data/mob-js/benchmark-repeat-key-nested.json",title:"( test ) benchmark repeat nested with key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key-bind-store",layout:Lr,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-key-bind-store",breadCrumbs:Qe,source:"./data/mob-js/benchmark-repeat-external.json",title:"( test ) benchmark repeat bindStore",section:"mobJs"}},{hash:"mobJs-tick",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/tick.json",title:"tick",breadCrumbs:Qe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-utils",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/utils.json",title:"utils",breadCrumbs:Qe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-memory-management",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/memory-management.json",title:"memory management",breadCrumbs:Qe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-debug",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/debug.json",title:"debug",breadCrumbs:Qe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-onMount",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/on-mount.json",title:"onMount",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-getState",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/get-state.json",title:"getState",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-setState",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/set-state.json",title:"setState",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-updateState",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/update-state.json",title:"updateState",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-getProxi",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/get-proxi.json",title:"getProxi",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-watch",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/watch.json",title:"watch",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-staticProps",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/static-props.json",title:"staticProps",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-dataAttribute",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/data-attribute.json",title:"dataAttribute",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-bindProps",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/bind-props.json",title:"bindProps",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-bindEvents",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/bind-events.json",title:"bindEvents",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-delegateEvents",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/delegate-events.json",title:"delegateEvents",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-bindtext",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/bind-text.json",title:"bindText",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-bindObject",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/bind-object.json",title:"bindObject",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-bind-effect",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/bind-effect.json",title:"bindEffect",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-methods",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/methods.json",title:"add methods",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-useMethodByName",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/use-method-by-name.json",title:"useMethodByName",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-useMethodArrayByName",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/use-method-array-by-name.json",title:"useMethodArrayByName",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-setStateByName",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/set-state-by-name.json",title:"setStateByName",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-updateStateByName",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/update-state-by-name.json",title:"updateStateByName",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-refs",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/refs.json",title:"refs",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-runtime",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/runtime.json",title:"renderComponent",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-repeat",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/repeat.json",title:"repeat",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-invalidate",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/invalidate.json",title:"invalidate",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-invalidate-vs-repeater",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/invalidate-vs-repeater.json",title:"invalidate vs repeater",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-web-component",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/web-component.json",title:"webComponent",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-slot",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/slot.json",title:"slot",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-unBind",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/unbind.json",title:"unBind",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-emit",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/emit.json",title:"emit",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-emitAsync",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/emit-async.json",title:"emitAsync",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-computed",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/computed.json",title:"computed",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-bindStore",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/bind-store.json",title:"bindStore",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-removeDom",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/remove-dom.json",title:"removeDom",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-remove",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/remove.json",title:"remove",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-getChildren",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/get-children.json",title:"getChildren",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-freezeProp",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/freeze-prop.json",title:"freezeProp",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-unFreezeProp",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/unfreeze-prop.json",title:"unFreezeProp",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-getParentId",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/get-parent-id.json",title:"getParentId",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-watchParent",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/watch-parent.json",title:"watchParent",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-instanceName",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/instance-name.json",title:"instanceName",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-class-list",templateName:Q,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/class-list.json",title:"classList",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobMotion-stagger",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/stagger.json",title:"Stagger",breadCrumbs:mr,section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-defaults",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/defaults.json",title:"Defaults",breadCrumbs:mr,section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-utils",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/utils.json",title:"Utils",breadCrumbs:mr,section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-overview",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/overview.json",title:"mobMotion",breadCrumbs:[],section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-parallax",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/parallax.json",title:"Parallax",breadCrumbs:mr,section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-sequencer",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/sequencer.json",title:"Sequencer",breadCrumbs:mr,section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-scrolltrigger",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/scroll-trigger.json",title:"ScrollTrigger",breadCrumbs:mr,section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-sync-timeline",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/sync-timeline.json",title:"Synctimeline",breadCrumbs:mr,section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-create-stagger",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/create-stagger.json",title:"CreateStagger",breadCrumbs:mr,section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-async-timeline",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/async-timeline.json",title:"Asynctimeline",breadCrumbs:mr,section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-tween-spring-lerp",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/tween-spring-lerp.json",title:"TimeTween Spring Lerp",breadCrumbs:mr,section:"mobMotion",rightSidebar:qt}},{hash:"horizontalScroller",layout:kS,templateName:ut,restoreScroll:!1,props:{source:"./data/plugin/horizontal-scroller.json",title:"HorizontalScroller"}},{hash:"move3D-shape1",templateName:ut,layout:VS,props:jS.shape1},{hash:"plugin-dragger",layout:bx,templateName:ut,props:{}},{hash:"math-animation-01",layout:wx,templateName:ut,props:{names:["circle","sin","infinite","archimede"]}},{hash:"rosa-di-grandi",layout:kx,templateName:ut,props:{}},{hash:"plugin-overview",layout:ic,templateName:es,props:{source:"./data/plugin/data.json"}},{hash:"svg-overview",layout:ic,templateName:es,props:{source:"./data/svg/data.json"}},{hash:"mob-01",layout:qS,templateName:ut,props:{}},{hash:"mob-02",layout:ax,templateName:ut,props:{}},{hash:"rdp-01",layout:ox,templateName:ut,props:{}}];var Rx=0;m.beforeRouteChange(()=>{Rx=window.scrollY});var Lk=new Set([Q,Ne,es,Dc,vt]),Dk=new Set([Q,Ne,es,Dc,_p,vt]),Px=async({oldNode:e,oldTemplateName:t})=>{e.classList.remove("current-route"),e.classList.add("fake-content"),e.style.position="fixed",e.style.zIndex="10",e.style.top=Lk.has(t)?"var(--header-height)":"0",e.style.left=Dk.has(t)?"calc(var(--header-height)/2)":"0",e.style.right="0",e.style.transform=`translateY(-${Rx}px)`,e.style.minHeight="calc(100vh - var(--header-height) - var(--footer-height))"},Nx=async({oldNode:e,newNode:t,oldRoute:r,newRoute:o})=>{if(r===o)return;let n=m.getRoot();n.style.pointerEvents="none",t.style.opacity="0";let s=H.createTimeTween({data:{opacity:1},duration:200}),i=H.createTimeTween({data:{opacity:0},duration:300});s.subscribe(({opacity:c})=>{e.style.opacity=c}),i.subscribe(({opacity:c})=>{t.style.opacity=c});let a=Me.createAsyncTimeline({repeat:1}).createGroup({waitComplete:!0}).goTo(s,{opacity:0}).goTo(i,{opacity:1}).closeGroup();await a.play(),a.destroy(),a=null,t.style.removeProperty("opacity"),t.classList.add("current-route"),u.useFrameIndex(()=>{n.style.pointerEvents=""},10)};var Ax=()=>{let e=window.innerWidth-document.documentElement.clientWidth;document.documentElement.style.setProperty("--scrollbar-with",`${e}px`)},Ox=()=>{Ax(),u.useResize(()=>{Ax()})};var ts="reset",hr="tree",bi="filter_component";var dr=({screen:e,scroller:t,scrollbar:r})=>{let o;return{init:()=>{o||(o=new _t({screen:e,scroller:t,direction:"vertical",drag:!0,scopedEvent:!1,breakpoint:"desktop",onTick:({percent:n})=>{r.value=`${n}`},afterRefresh:({shouldScroll:n})=>{r?.classList.toggle("hide-scrollbar",!n)}}),o.init())},destroy:()=>{o?.destroy(),o=null},refresh:()=>{o?.refresh()},updateScroller:()=>{if(!o)return;let n=le(t),s=le(e),i=ze(r),a=s/n*i;r.style.setProperty("--thumb-width",`${a}px`),o?.refresh()},move:n=>{o&&o.move(n).catch(()=>{})},goToTop:()=>{o?.set(0)}}};var rs=u.createStore({currentId:()=>({value:"",type:String})});var $x=e=>e?[...e].reduce((t,r)=>`${t}.${r}`,""):"",Lx=e=>Object.keys(e).reduce((t,r)=>`${t} ${r},`,""),Fk=e=>Object.entries(e).map(([t,r])=>g`<div>
                <strong>${t}:</strong>
                ${r.map(o=>g`${o}, `).join(".")}
            </div>`).join(""),Bk=e=>e?e.map(t=>`${t}, `).join(""):"",Dx=e=>Object.entries(e).map(([t,r])=>g`<div>
                <strong>${t}:</strong>
                ${JSON.stringify(r)}
            </div>`).join(""),Vk=({getState:e})=>{let{id:t}=e();if(t===ts)return"";let r=m.componentMap.get(t);return r?g`<div>
        <!-- Basic props -->
        <div><strong>id</strong>: ${t}</div>
        <div><strong>parent id</strong>: ${r.parentId}</div>
        <div>
            <strong>component root</strong>:
            ${r.element.tagName}${$x(r.element.classList)}
        </div>
        <div><strong>componentName</strong>: ${r.componentName}</div>
        <div><strong>instance name:</strong>: ${r.instanceName}</div>
        <div><strong>methods:</strong>: ${Lx(r.methods)}</div>
        <div><strong>refs:</strong>: ${Lx(r.refs)}</div>
        <div><strong>persistent:</strong>: ${r.persistent}</div>

        <!-- Children -->
        <h3 class="c-debug-component__section-title">Children:</h3>
        <div>${Fk(r?.child??{})}</div>

        <!-- Repeater -->
        <h3 class="c-debug-component__section-title">Repeater props:</h3>
        <div>
            <strong>component repeater id</strong>: ${r.componentRepeatId}
        </div>
        <div><strong>repeater state bind</strong>: ${r.repeatPropBind}</div>
        <div>
            <strong>repeater inner wrapper</strong>:
            ${r?.repeaterInnerWrap?.tagName}${$x(r?.repeaterInnerWrap?.classList)}
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
            ${Bk(r?.freezedPros)}
        </div>
        <div>
            <h4 class="c-debug-component__section-subtitle">
                States current values:
            </h4>
            ${Dx(r.state.get())}
        </div>
        <div>
            <h4 class="c-debug-component__section-subtitle">
                States current validation:
            </h4>
            ${Dx(r.state.getValidation())}
        </div>
    </div>`:"component not found"},Wk=({getRef:e})=>{let{screen:t,scroller:r,scrollbar:o}=e();o.addEventListener("input",()=>{c(o.value)});let n=dr({screen:t,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},Fx=({onMount:e,addMethod:t,getState:r,invalidate:o,setRef:n,getRef:s,watch:i,getProxi:a,emit:c})=>{let l=a();t("updateId",h=>{l.id=h,rs.set("currentId",h)}),t("refreshId",()=>{c(()=>l.id)});let p;return e(()=>{let{destroy:h,updateScroller:f,move:d,refresh:y}=Wk({getRef:s});return p=d,i(()=>l.id,async()=>{await m.tick(),y(),f(),p(0)}),()=>{h?.()}}),g`<div class="c-debug-component" ${n("screen")}>
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
            ${o({observe:()=>l.id,render:()=>Vk({getState:r})})}
        </div>
    </div>`};var Bx=m.createComponent({tag:"debug-component",component:Fx,state:{id:()=>({value:ts,type:String,skipEqual:!1})}});var Vx=e=>{m.useMethodByName(dc)?.refreshList?.({testString:e})};var Sp=async(e="")=>{await m.tick(),Vx(e)},Wx=({onMount:e,setRef:t,getRef:r,delegateEvents:o})=>(e(()=>(Sp(),()=>{r()?.input.remove()})),g`<div class="c-debug-filter-head">
        <span class="c-debug-filter-head__title">Filter by tag</span>
        <input
            type="text"
            class="c-debug-filter-head__input"
            value=""
            ${t("input")}
            ${o({keydown:n=>{if(n.code.toLowerCase()==="enter"){n.preventDefault();let s=n.currentTarget.value;Sp(s)}}})}
        />
        <button
            class="c-debug-filter-head__button"
            type="button"
            ${o({click:()=>{let{input:n}=r(),s=n.value;Sp(s)}})}
        >
            find
        </button>
    </div>`);var jx=m.createComponent({tag:"debug-filter-head",component:Wx});var jk=async({getRef:e})=>{await m.tick();let{screen:t,scroller:r,scrollbar:o}=e(),n=dr({screen:t,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},zx=e=>`~${e}`,zk=({testString:e})=>{let t=e.replaceAll("~","").split(" ").filter(r=>r!=="")??"";return(()=>{let r=[];for(let o of m.componentMap.values())t.every(s=>o.componentName.includes(s))&&r.push(o);return r})().map(({id:r,componentName:o,instanceName:n})=>({id:r,active:!1,tag:(()=>{let s=t.reduce((i,a,c)=>i.replaceAll(new RegExp(`(?<!~)${a.toLowerCase()}`,"g"),`${zx(c)}`),o);return t.reduce((i,a,c)=>i.replaceAll(`${zx(c)}`,`<span class="match-string">${a}</span>`),s)})(),name:n}))},Hx=({onMount:e,setRef:t,getRef:r,addMethod:o,repeat:n,staticProps:s,bindProps:i,bindEffect:a,getProxi:c,computed:l})=>{let p=c(),h=()=>{},f=()=>{},d=()=>{},y=()=>{};return l(()=>p.noResult,()=>p.data.length===0&&!p.isLoading),o("refreshList",async({testString:v})=>{p.isLoading=!0,await m.tick(),u.useNextTick(async()=>{p.data=zk({testString:v}),await m.tick(),d?.(),y?.(),p.isLoading=!1})}),e(()=>{let{scrollbar:v}=r();return v.addEventListener("input",()=>{f(v.value)}),(async()=>({destroy:h,move:f,refresh:d,updateScroller:y}=await jk({getRef:r})))(),()=>{h?.(),h=()=>{},d=()=>{},y=()=>{},f=()=>{}}}),g`
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
                    ${n({observe:()=>p.data,key:"id",useSync:!0,render:({sync:v,current:T})=>g`
                                <debug-filter-list-item
                                    ${s({id:T.value.id,name:T.value.name})}
                                    ${i(()=>({tag:T.value.tag}))}
                                    ${v()}
                                ></debug-filter-list-item>
                            `})}
                </div>
            </div>
        </div>
    `};var fr=e=>{m.useMethodByName(ii)?.updateId(e)},Ux=()=>{m.useMethodByName(ii)?.refreshId()};var Gx=({delegateEvents:e,bindText:t,bindEffect:r,getProxi:o,computed:n})=>{let s=o();return n(()=>s.active,()=>s.id===s.currentId),g`
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
                ${e({click:()=>{fr(s.id)}})}
            >
                [ > ]
            </button>
            <span
                class="c-debug-tree-item__selected"
                ${r({toggleClass:{active:()=>s.active}})}
            ></span>
        </div>
    `};var qx=m.createComponent({tag:"debug-filter-list-item",component:Gx,bindStore:rs,props:{id:()=>({value:"",type:String}),tag:()=>({value:"",type:String}),name:()=>({value:"",type:String})},state:{active:()=>({value:!1,type:Boolean})}});var Jx=m.createComponent({tag:"debug-filter-list",component:Hx,state:{data:()=>({value:[],type:Array}),isLoading:()=>({value:!0,type:Boolean}),noResult:()=>({value:!1,type:Boolean})},child:[qx]});var Yx=({invalidate:e,getProxi:t})=>{let r=t();return g`<div class="c-debug-head">
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
    </div>`};var Xx=({setRef:e,getRef:t,delegateEvents:r})=>g`<div class="c-debug-search">
        <div>
            <span class="c-debug-search__label">
                <strong>Search by ID:</strong>
            </span>
            <input
                class="c-debug-search__input"
                type="text"
                ${e("id_input")}
                ${r({keydown:o=>{if(o.code.toLowerCase()==="enter"){o.preventDefault();let n=o.currentTarget.value;fr(n??"")}}})}
            />
            <button
                class="c-debug-search__button"
                type="button"
                ${r({click:()=>{let{id_input:o}=t(),n=o.value;fr(n??"")}})}
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
                ${r({keydown:o=>{if(o.code.toLowerCase()==="enter"){o.preventDefault();let n=o.currentTarget.value,s=m.getIdByInstanceName(n);fr(s??"")}}})}
            />
            <button
                class="c-debug-search__button"
                type="button"
                ${r({click:()=>{let{instance_input:o}=t(),n=o.value,s=m.getIdByInstanceName(n);fr(s??"")}})}
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
                    ${r({click:()=>{let{instance_input:o,id_input:n}=t();o.value="",n.value="",fr(ts)}})}
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
                    ${r({click:()=>{Ux()}})}
                >
                    refresh component
                </button>
            </div>
        </div>
    </div>`;var Kx=m.createComponent({tag:"debug-search",component:Xx});var Qx=m.createComponent({tag:"debug-head",component:Yx,props:{active:()=>({value:!1,type:Boolean})},state:{shouldUpdate:()=>({value:!0,type:Boolean,skipEqual:!1})},child:[Kx]});var Vc=()=>{m.mainStore.debugStore(),console.log("componentMap",m.componentMap),console.log("Tree structure:",m.getTree()),console.log("bindEventMap",Tn),console.log("currentListValueMap",Cs),console.log("activeRepeatMap",xn),console.log("onMountCallbackMap",ws),console.log("staticPropsMap",Cn),console.log("dynamicPropsMap",yt),console.log("eventDelegationMap",m.eventDelegationMap),console.log("tempDelegateEventMap",m.tempDelegateEventMap),console.log("invalidateIdHostMap",Yr.size),console.log("invalidateIdsMap",tt),console.log("invalidateInstancesMap",Te),console.log("repeatIdHostMap",Jr),console.log("repeatIdsMap",rt),console.log("repeatInstancesMap",J),console.log("userChildPlaceholderSize",Vh()),console.log("slotPlaceholderSize",Xi()),console.log("bindTextPlaceholderMapSize",Ad()),console.log("instanceMap",Ur)};var Zx=({delegateEvents:e,addMethod:t,bindProps:r,invalidate:o,bindEffect:n,getProxi:s,onMount:i})=>{let a=s();return t("toggle",()=>{a.active=!a.active}),i(()=>{let c=m.beforeRouteChange(()=>{a.active=!1,a.listType=hr});return()=>{c()}}),g`<div
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
                ${e({click:()=>{Vc()}})}
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
                                    </div>`:a.listType===bi&&a.active?g`<debug-filter-head></debug-filter-head>`:""})}
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
                            ${e({click:()=>{a.listType=bi}})}
                            ${n({toggleClass:{active:()=>a.listType===bi}})}
                        >
                            Filter
                        </button>
                    </div>
                </div>
                <div>
                    ${o({observe:[()=>a.listType,()=>a.active],render:()=>a.listType===hr&&a.active?g`
                                    <debug-tree
                                        name="${gc}"
                                    ></debug-tree>
                                `:a.listType===bi&&a.active?g`
                                    <debug-filter-list
                                        name="${dc}"
                                    ></debug-filter-list>
                                `:""})}
                </div>
            </div>
            <div class="c-debug-overlay__component">
                <debug-component name="${ii}"></debug-component>
            </div>
        </div>
    </div>`};var Wc=({data:e,staticProps:t})=>e.map(({id:r,componentName:o,instanceName:n,children:s})=>g`<debug-tree-item
                ${t({id:r,componentName:o,instanceName:n,children:s})}
            ></debug-tree-item>`).join("");var Hk=async({getRef:e})=>{await m.tick();let{screen:t,scroller:r,scrollbar:o}=e(),n=dr({screen:t,scroller:r,scrollbar:o}),s=n.destroy,i=n.refresh,a=n.move,c=n.updateScroller;return n.init(),c(),a(0),{destroy:s,refresh:i,move:a,updateScroller:c}},e0=({onMount:e,invalidate:t,staticProps:r,setRef:o,getRef:n,addMethod:s,bindEffect:i,getProxi:a})=>{let c=a(),l=()=>{},p=()=>{},h=()=>{},f=()=>{};return e(()=>{let{scrollbar:d}=n();return d.addEventListener("input",()=>{f(d.value)}),s("refresh",()=>{p?.(),h?.()}),(async()=>(c.isLoading=!0,await m.tick(),l?.(),c.data=m.getTree(),{destroy:l,move:f,refresh:p,updateScroller:h}=await Hk({getRef:n}),c.isLoading=!1))(),()=>{l?.(),l=()=>{},p=()=>{},h=()=>{},f=()=>{}}}),g`
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
                    ${t({observe:()=>c.data,render:()=>Wc({data:c.data,staticProps:r})})}
                </div>
            </div>
        </div>
    `};var t0=()=>{m.useMethodByName(gc)?.refresh()};var Uk=e=>e>0?`( ${e} ) `:"",r0=({id:e,value:t})=>{let o=m.componentMap.get(e)?.child;if(!o)return!1;let n=Object.values(o).flat();return n.includes(t)?!0:n.some(i=>r0({id:i,value:t}))},o0=({onMount:e,staticProps:t,getRef:r,setRef:o,delegateEvents:n,watch:s,bindEffect:i,getProxi:a,computed:c})=>{let l=a(),p=l.children.length>0?"has-children":"";return c(()=>l.isActive,()=>l.id===l.currentId),c(()=>l.hasActiveChildren,()=>r0({id:l.id,value:l.currentId})),e(()=>{let{content:h}=r(),f=$r.subscribe(h);return $r.reset(h),s(()=>l.isOpen,async d=>{await $r[d?"down":"up"](h),t0()}),()=>{f()}}),g`<div class="c-debug-tree-item">
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
            <span>${Uk(l.children.length)}</span>
            <button
                type="button"
                class="c-debug-tree-item__expand"
                ${n({click:()=>{fr(l.id)}})}
            >
                [ > ]
            </button>
            <span
                class="c-debug-tree-item__selected"
                ${i({toggleClass:{active:()=>l.isActive}})}
            ></span>
        </div>
        <div class="c-debug-tree-item__content" ${o("content")}>
            ${Wc({data:l.children,staticProps:t})}
        </div>
    </div>`};var n0=m.createComponent({tag:"debug-tree-item",component:o0,bindStore:rs,props:{id:()=>({value:"",type:String}),componentName:()=>({value:"",type:String}),instanceName:()=>({value:"",type:String}),children:()=>({value:[],type:Array})},state:{isOpen:()=>({value:!1,type:Boolean}),isActive:()=>({value:!1,type:Boolean}),hasActiveChildren:()=>({value:!1,type:Boolean})}});var s0=m.createComponent({tag:"debug-tree",component:e0,state:{data:()=>({value:[],type:Array}),isLoading:()=>({value:!1,type:Boolean})},child:[n0]});var i0=m.createComponent({tag:"debug-overlay",component:Zx,state:{active:()=>({value:!1,type:Boolean}),listType:()=>({value:hr,type:String})},child:[s0,Bx,Qx,jx,Jx]});var xp=()=>{},jc=()=>{},zc=()=>{},Hc=()=>{},Gk=({staticProps:e,bindProps:t,proxi:r})=>r.data.map(o=>{let{label:n,url:s,isLabel:i}=o;return i?g`<p class="c-params-mobjs__label">${n}</p>`:g`<li>
                      <links-mobjs-button
                          ${e({label:n,url:s})}
                          ${t(()=>({active:r.activeSection===s}))}
                      ></links-mobjs-button>
                  </li>`}).join(""),a0=({staticProps:e,setRef:t,getRef:r,onMount:o,bindProps:n,invalidate:s,bindEffect:i,getProxi:a})=>{let c=pr(),l=a(),p={[Q]:c.sideBarLinks.mobJsComponentParams};return o(()=>{let{screenEl:h,scrollerEl:f,scrollbar:d}=r(),y=!1;d.addEventListener("input",()=>{zc?.(d.value)}),ee.watch("navigationIsOpen",T=>{let{templateName:S}=m.getActiveRoute();S in p&&(l.shift=T)});let v=m.afterRouteChange(async({currentTemplate:T,currentRoute:S})=>{let _=p?.[T]??[];if(l.data=_,await m.tick(),l.activeSection=S,_.length>0){if(l.hide=!1,y){Hc();return}({init:xp,destroy:jc,move:zc,updateScroller:Hc}=dr({screen:h,scroller:f,scrollbar:d})),y=!0,xp(),Hc(),zc(0)}_.length===0&&(l.hide=!0,jc?.(),y=!1)});return()=>{jc?.(),v(),xp=()=>{},jc=()=>{},zc=()=>{},Hc=()=>{}}}),g`<div
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
            ${s({observe:()=>l.data,render:()=>Gk({staticProps:e,bindProps:n,proxi:l})})}
        </ul>
    </div>`};var c0=({getProxi:e,bindEffect:t})=>{let r=e();return g` <a
        href="./#${r.url}"
        ${t({toggleClass:{current:()=>r.active}})}
        ><span>${r.label}</span></a
    >`};var l0=m.createComponent({tag:"links-mobjs-button",component:c0,props:{label:()=>({value:"",type:String}),url:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean})}});var u0=m.createComponent({tag:"links-mobjs",component:a0,child:[l0],state:{data:()=>({value:[],type:Array}),activeSection:()=>({value:"",type:String}),hide:()=>({value:!0,type:Boolean}),shift:()=>({value:!1,type:Boolean})}});var p0=({getProxi:e,bindEffect:t,addMethod:r,setRef:o,getRef:n,onMount:s,watch:i})=>{let a=e();r("update",(l,p)=>{a[l]=p});let c=H.createTimeTween({data:{y:0,yContainer:100},duration:300,ease:"easeOutQuad"});return i(()=>a.currentLabelId,l=>{if(l===-1){c.goTo({yContainer:100});return}c.goTo({y:100/3*-l,yContainer:0})}),s(({element:l})=>{let{back:p,next:h,previous:f,labelList:d,labels:y}=n();return c.subscribe(({y:v,yContainer:T})=>{d.style.transform=`translateY(${v}%)`,y.style.transform=`translateY(${T}%)`}),l.addEventListener("mouseleave",()=>{a.currentLabelId=-1}),f.addEventListener("mouseenter",()=>{a.currentLabelId=0}),p.addEventListener("mouseenter",()=>{a.currentLabelId=1}),h.addEventListener("mouseenter",()=>{a.currentLabelId=2}),()=>{c.destroy(),c=null,f=null,p=null,h=null,d=null,y=null}}),g`<div
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
    </div>`};var m0=m.createComponent({tag:"quick-nav",component:p0,state:{active:()=>({value:!1,type:Boolean}),backRoute:()=>({value:"",type:String}),prevRoute:()=>({value:"",type:String}),nextRoute:()=>({value:"",type:String}),currentLabelId:()=>({value:-1,type:Number})}});var qk=({proxi:e,bindEffect:t})=>e.data.map(({label:r,url:o})=>{let n=o.replaceAll("#","");return g`
                <li class="right-sidebar__item">
                    <a
                        href="${o}"
                        class="right-sidebar__link"
                        ${t({toggleClass:{active:()=>e.activeRoute.route===n}})}
                        >${r}</a
                    >
                </li>
            `}).join(""),h0=({getProxi:e,invalidate:t,addMethod:r,computed:o,bindEffect:n})=>{let s=e();return r("updateList",i=>{s.data=i}),m.afterRouteChange(({currentTemplate:i})=>{Fc.has(i)||(s.data=[])}),o(()=>s.isVisible,()=>s.data.length>0),g`<div
        class="right-sidebar"
        ${n({toggleClass:{visible:()=>s.isVisible}})}
    >
        <div class="right-sidebar__title">Sections:</div>
        <ul class="right-sidebar__list">
            ${t({observe:()=>s.data,render:()=>qk({proxi:s,bindEffect:n})})}
        </ul>
    </div>`};var d0=m.createComponent({tag:"right-sidebar",component:h0,bindStore:[m.mainStore],state:{data:()=>({value:[],type:Array}),isVisible:()=>({value:!1,type:Boolean})}});var f0=({onMount:e,getProxi:t,bindEffect:r,addMethod:o})=>{let n=t();return o("skip",()=>{n.skip=!1}),e(({element:s})=>{n.isDisable=!0;let i=H.createTimeTween({data:{opacity:1,scale:1},duration:500});i.subscribe(({opacity:l,scale:p})=>{s.style.opacity=l,s.style.transform=`scale(${p})`});let a=m.beforeRouteChange(async()=>{n.skip||(n.isDisable=!1,await i.set({opacity:1}),i.goTo({scale:1}))}),c=m.afterRouteChange(async()=>{await i.goTo({opacity:0,scale:.9}).catch(()=>{}),n.isDisable=!0});return()=>{i.destroy(),i=null,a(),c()}}),g`
        <div
            class="c-loader center-viewport"
            ${r({toggleClass:{disable:()=>n.isDisable}})}
        >
            <span class="c-loader__inner"></span>
        </div>
    `};var g0=m.createComponent({tag:"route-loader",component:f0,state:{isLoading:()=>({value:!1,type:Boolean}),isDisable:()=>({value:!1,type:Boolean}),skip:()=>({value:!0,type:Boolean})}});var b0=({getProxi:e,bindEffect:t,addMethod:r})=>{let o=e();return r("update",n=>{o.active=n}),g`
        <h3
            class="c-scroller-down-label"
            ${t({toggleClass:{active:()=>o.active}})}
        >
            Scroll down
        </h3>
    `};var v0=m.createComponent({tag:"scroll-down-label",component:b0,state:{active:()=>({value:!1,type:Boolean})}});var y0=()=>{m.useMethodByName(Uo)?.setInputFocus()},Cp=e=>{m.useMethodByName(Uo)?.updateCurrentSearchFromSuggestion(e)},T0=e=>{m.useMethodByName(Uo)?.shouldCloseSuggestion(e)},Uc=()=>{m.useMethodByName(Uo)?.closeSuggestion()};var _0=({proxi:e})=>{e.active=!1,Uc()},Jk=({target:e})=>{e&&T0(e)},S0=({getProxi:e,delegateEvents:t,bindEffect:r,addMethod:o,bindObject:n,staticProps:s})=>{let i=e();return o("toggle",()=>{i.active=!i.active}),g`<div
        class="search-overlay"
        ${r({toggleClass:{active:()=>i.active}})}
    >
        <button
            class="search-overlay__background"
            type="button"
            ${t({click:()=>{_0({proxi:i})}})}
        ></button>
        <button
            type="button"
            class="search-overlay__close"
            ${t({click:()=>{_0({proxi:i})}})}
        ></button>

        <!-- Main content -->
        <div
            class="search-overlay__grid"
            ${t({click:a=>{Jk({target:a.target})}})}
        >
            <!-- Title -->
            <h2 class="search-overlay__title">Search</h2>

            <!-- Header -->
            <div class="search-overlay__header">
                <search-overlay-header
                    name="${Uo}"
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
                    name="${pi}"
                ></search-overlay-list>
            </div>
        </div>
    </div>`};var x0=e=>{m.useMethodByName(pi)?.update(e)},C0=()=>{m.useMethodByName(pi)?.reset()};var Yk=async({currentSearch:e})=>{x0(e)},Ep=({getRef:e})=>{let{search_input:t}=e(),r=t.value;Yk({currentSearch:r})},E0=({getRef:e,proxi:t})=>{C0();let{search_input:r}=e();r.value="",t.suggestionListData=[]},w0=e=>`~${e}`,Xk=({currentSearch:e,proxi:t})=>{let o=pr().suggestion;e.length===0&&(t.suggestionListData=[]);let s=e.split(" ").slice(-1).join("").replaceAll("~","").split(" ").filter(i=>i!=="")??"";t.suggestionListData=(o.filter(({word:i})=>s.some(a=>i.toLowerCase().includes(a.toLowerCase())))??[]).map(({word:i})=>({word:i,wordHiglight:(()=>{let a=s.reduce((c,l,p)=>c.toLowerCase().replaceAll(new RegExp(`(?<!~)${l.toLowerCase()}`,"g"),`${w0(p)}`),i);return s.reduce((c,l,p)=>c.replaceAll(`${w0(p)}`,`<span class="match-string">${l}</span>`),a)})()}))},I0=({delegateEvents:e,getRef:t,setRef:r,getProxi:o,bindProps:n,addMethod:s,onMount:i,computed:a,bindEffect:c})=>{let l=o();return a(()=>l.suggestionListActive,()=>l.suggestionListData.length>0),i(()=>{let{search_input:p,suggestionElement:h}=t();s("updateCurrentSearchFromSuggestion",f=>{let y=p.value.split(" "),v=y.length===0?f:`${y.slice(0,-1).join(" ")} ${f}`;p.value=v.trimStart(),l.suggestionListData=[],p.focus()}),s("shouldCloseSuggestion",f=>{h!==f&&!h.contains(f)&&(l.suggestionListData=[])}),s("closeSuggestion",()=>{l.suggestionListData=[]}),s("setInputFocus",async()=>{setTimeout(()=>{p.focus()},300)})}),g`<div class="search-overlay-header">
        <div class="search-overlay-header__input-container">
            <input
                type="text"
                class="search-overlay-header__input"
                ${r("search_input")}
                ${e({keyup:u.useDebounce(p=>{if(p.code.toLowerCase()==="enter"){p.preventDefault(),Ep({getRef:t,proxi:l}),l.suggestionListData=[];return}if(p.code.toLowerCase()==="escape"){p.preventDefault(),l.suggestionListData=[];return}let h=p.currentTarget.value;Xk({currentSearch:h,proxi:l})},60)})}
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
            ${e({click:()=>{Ep({getRef:t,proxi:l})},keydown:p=>{p.code.toLowerCase()==="enter"&&Ep({getRef:t,proxi:l})}})}
        >
            submit
        </button>

        <!-- Reset -->
        <button
            type="button"
            class="search-overlay-header__button"
            ${e({click:()=>{E0({getRef:t,proxi:l})},keydown:p=>{p.code.toLowerCase()==="enter"&&E0({getRef:t,proxi:l})}})}
        >
            reset
        </button>
    </div>`};var M0=({getProxi:e,repeat:t,bindProps:r})=>{let o=e();return g`<div>
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
    </div>`};var Kk=({code:e,word:t})=>{if(e.toLowerCase()==="enter"){Cp(t);return}if(e.toLowerCase()==="escape"){Uc();return}},k0=({getProxi:e,delegateEvents:t,bindObject:r})=>{let o=e();return g`
        <li class="search-overlay-suggestion__item">
            <button
                type="button"
                class="search-overlay-suggestion__button"
                ${t({click:()=>{Cp(o.word)},keydown:n=>{n.preventDefault(),Kk({code:n.code,word:o.word})}})}
            >
                ${r`${()=>o.wordHiglight}`}
            </button>
        </li>
    `};var R0=m.createComponent({tag:"search-overlay-suggestion-item",component:k0,props:{word:()=>({value:"",type:String}),wordHiglight:()=>({value:"",type:String})}});var P0=m.createComponent({tag:"search-overlay-suggestion",component:M0,props:{list:()=>({value:[],type:Array})},child:[R0]});var N0=m.createComponent({tag:"search-overlay-header",component:I0,state:{suggestionListActive:()=>({value:!1,type:Boolean}),suggestionListData:()=>({value:[],type:Array})},child:[P0]});var Qk=async({source:e,uri:t,title:r,section:o,breadCrumbs:n})=>{let s=await fetch(e);return s.ok?{success:!0,data:(await s.json()).data,uri:t,title:r,section:o,breadCrumbs:n}:(console.warn(`${e} not found`),{success:!1,data:[{component:"",props:{}}],uri:t,title:r,section:o,breadCrumbs:[]})},Zk=new Set(["mob-title","mob-paragraph","mob-list"]),eR=new Set(["mob-title","mob-paragraph"]),tR=new Set(["mob-list"]),A0=async({currentSearch:e=""})=>{let t=Bc.filter(({props:a})=>a?.source&&a?.title).map(({hash:a,props:c})=>({fn:Qk({source:c.source??"",uri:a??"uri not forud",title:c.title??"title not found",section:c.section??"title not found",breadCrumbs:c.breadCrumbs??[]})})),r=await Promise.all(t.map(({fn:a})=>a)),o=[],n=r.filter(({success:a})=>a).map(({data:a,uri:c,title:l,section:p,breadCrumbs:h})=>{let y=a.reduce((v,T)=>{if(!T)return v;let{component:S}=T;return S?T.component==="html-content"?T?.props?.data?[...v,T.props.data]:v:[...v,T]:v},o).flat().filter(({component:v})=>Zk.has(v)).flatMap(v=>eR.has(v?.component)?v.content:tR.has(v?.component)?v?.props?.links?v.props.items.map(({label:T})=>T):v.props.items:v);return{uri:c,title:l,section:p,breadCrumbs:h,data:y}}),s=e.split(" ");return n.filter(a=>{let c=a.data.join(" ");return s.every(l=>c.toLowerCase().includes(l.toLowerCase()))}).toSorted(a=>a.title.toLowerCase().includes(e.toLowerCase())?-1:1).map(({title:a,uri:c,section:l,breadCrumbs:p,data:h})=>{let f=h.join("").toLowerCase().split(e.toLowerCase()),d=p.length>0?p.reduce((y,v,T)=>{let S=T>0?"/":"";return`${y}${S}${v.title}`},""):a;return{title:a,uri:c,section:l,breadCrumbs:d,count:f?.length??0}})};var rR=({getRef:e})=>{let{screen:t,scroller:r,scrollbar:o}=e();o.addEventListener("input",()=>{c(o.value)});let n=dr({screen:t,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},O0=({getProxi:e,repeat:t,setRef:r,getRef:o,onMount:n,watch:s,addMethod:i,bindEffect:a,invalidate:c,bindProps:l})=>{let p=e();i("update",async f=>{p.loading||(p.loading=!0,p.noResult=!1,p.list=await A0({currentSearch:f}),p.loading=!1,p.noResult=p.list.length===0,p.updatePrentSearchKey(f))}),i("reset",()=>{p.updatePrentSearchKey(""),p.list=[]});let h;return n(()=>{let{destroy:f,updateScroller:d,move:y,refresh:v}=rR({getRef:o});return h=y,s(()=>p.list,async()=>{await m.tick(),v(),d(),h(0)}),()=>{f?.()}}),g`<div class="search-overlay-list" ${r("screen")}>
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
    </div>`};var Gc=()=>{m.useMethodByName(vc)?.toggle()};var oR=({uri:e})=>{m.loadUrl({url:e}),Gc()},$0=({getProxi:e,bindEffect:t,delegateEvents:r,bindObject:o})=>{let n=e();return g`
        <li
            class="search-overlay-list__item"
            ${t({toggleClass:{current:()=>n.active}})}
        >
            <button
                type="button"
                class="search-overlay-list__button"
                ${r({click:()=>{oR({uri:n.uri})}})}
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
    `};var L0=m.createComponent({tag:"search-overlay-list-item",component:$0,props:{uri:()=>({value:"",type:String}),breadCrumbs:()=>({value:"",type:String}),title:()=>({value:"",type:String}),count:()=>({value:0,type:Number}),active:()=>({value:!1,type:Boolean})}});var D0=m.createComponent({tag:"search-overlay-list",component:O0,bindStore:m.mainStore,props:{updatePrentSearchKey:()=>({value:()=>{},type:Function})},state:{list:()=>({value:[],type:Array}),loading:()=>({value:!1,type:Boolean}),noResult:()=>({value:!1,type:Boolean})},child:[L0]});var F0=m.createComponent({tag:"search-overlay",component:S0,state:{active:()=>({value:!1,type:Boolean}),currentSearch:()=>({value:"",type:String})},child:[N0,D0]});var B0=()=>g`
        <div class="test-grid">
            <div class="test-grid__grid">
                <span></span><span></span><span></span><span></span><span></span
                ><span></span><span></span><span></span><span></span
                ><span></span><span></span><span></span>
            </div>
            <div class="test-grid__cont"><span>test</span></div>
        </div>
    `;var V0=m.createComponent({tag:"test-scss-grid",component:B0});var To=()=>{let{templateName:e}=m.getActiveRoute();return Fc.has(e)?0:40};var W0=()=>{m.useMethodByName(fc)?.toggle()};var nR=["Alberto Navarro","Milan, Italy",'<a href="https://github.com/albnavarro/" target="_blank">[ github ]</a>','<a href="https://www.linkedin.com/in/alberto-navarro74/" target="_blank">[ linkedin ]</a>'],sR=()=>g`
        <ul class="l-footer__bio">
            ${nR.map(e=>g` <li class="l-footer__bio__item">${e}</li> `).join("")}
        </ul>
    `,j0=({delegateEvents:e,getProxi:t,onMount:r,bindEffect:o})=>{let n=t();return r(()=>{u.useFrameIndex(()=>{n.isMounted=!0},To())}),g`
        <footer
            class="l-footer"
            ${o({toggleClass:{"is-visible":()=>n.isMounted}})}
        >
            <div class="l-footer__container">
                ${sR()}
                <div class="l-footer__debug">
                    <debug-button
                        class="c-button-debug"
                        ${e({click:()=>{W0()}})}
                    >
                        Debug App</debug-button
                    >
                    <debug-button
                        class="c-button-console"
                        ${e({click:()=>{Vc()}})}
                    >
                        Log
                    </debug-button>
                </div>
            </div>
        </footer>
    `};var z0=()=>g`
        <button type="button" class="c-btn-debug">
            <mobjs-slot></mobjs-slot>
        </button>
    `;var H0=m.createComponent({tag:"debug-button",component:z0});var U0=m.createComponent({tag:"mob-footer",component:j0,child:[H0],state:{isMounted:()=>({value:!1,type:Boolean})}});var qc=()=>{m.useMethodByName(ui)?.scrollTop()},Jc=()=>{m.useMethodByName(ui)?.refresh()};var os=({fireCallback:e=!0}={})=>{m.useMethodByName(bc)?.closeAllAccordion({fireCallback:e})};function iR(){m.loadUrl({url:"home"}),os(),ee.set("navigationIsOpen",!1),qc()}var G0=({delegateEvents:e,bindEffect:t,getProxi:r,onMount:o,addMethod:n})=>{let s=r();return o(({element:i})=>{n("getHeaderHeight",()=>le(i)),u.useFrameIndex(()=>{s.isMounted=!0},To())}),g`
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
                        ${e({click:()=>{iR()}})}
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
    `};var q0=({delegateEvents:e,bindEffect:t,getProxi:r,onMount:o})=>{let n=r();return o(()=>{u.useFrameIndex(()=>{n.isMounted=!0},To())}),g`
        <button
            class="hamburger"
            type="button"
            ${e({click:()=>{ee.update("navigationIsOpen",s=>!s),n.navigationIsOpen||Ut()}})}
            ${t([{toggleClass:{"is-open":()=>n.navigationIsOpen}},{toggleClass:{"is-mounted":()=>n.isMounted}}])}
        >
            <div class="hamburger__box">
                <div class="hamburger-inner"></div>
            </div>
        </button>
    `};var J0=m.createComponent({tag:"mob-header-toggle",component:q0,bindStore:ee,state:{isMounted:()=>({value:!1,type:Boolean})}});var aR=({event:e})=>{let t=e.target;console.log(t);let{url:r}=t?.dataset??"";m.loadUrl({url:r}),ee.set("navigationIsOpen",!1)};function cR({delegateEvents:e}){let t=pr().header,{links:r}=t,o={github:Un().gitHubIcon};return r.map(n=>{let{svg:s,url:i,internal:a}=n;return g`<li class="l-header__sidenav__item">
                ${a?g`
                          <button
                              type="button"
                              data-url="${i}"
                              class="l-header__sidenav__link"
                              ${e({click:c=>{aR({event:c})}})}
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
            </li>`}).join("")}var Y0=({delegateEvents:e})=>g`
        <ul class="l-header__sidenav">
            <li class="l-header__sidenav__item">
                <search-cta></search-cta>
            </li>
            ${cR({delegateEvents:e})}
        </ul>
    `;var lR=()=>{Gc(),y0()},X0=({delegateEvents:e})=>{let t=Un().searchIcons;return g`<button
        type="button"
        class="search-cta"
        ${e({click:()=>{lR()}})}
    >
        ${t}
    </button>`};var K0=m.createComponent({tag:"search-cta",component:X0});var Q0=m.createComponent({tag:"mob-header-utils",component:Y0,child:[K0]});var uR=({delegateEvents:e,staticProps:t})=>pr().footer.nav.map(({label:o,url:n,section:s})=>g`<li class="header-main-menu__item">
                <header-main-menu-button
                    ${e({click:()=>{m.loadUrl({url:n}),ee.set("navigationIsOpen",!1)}})}
                    ${t({label:o,section:s})}
                ></header-main-menu-button>
            </li> `).join(""),Z0=({delegateEvents:e,staticProps:t,getProxi:r,onMount:o,bindEffect:n})=>{let s=r();return o(()=>{u.useFrameIndex(()=>{"isMounted"in s&&(s.isMounted=!0)},10)}),g`
        <ul
            class="header-main-menu"
            ${n({toggleClass:{"is-visible":()=>s.isMounted}})}
        >
            ${uR({delegateEvents:e,staticProps:t})}
        </ul>
    `};var eC=({getProxi:e,bindEffect:t,computed:r})=>{let o=e();return r(()=>o.active,()=>o.section===o.activeNavigationSection),g`
        <button
            type="button"
            class="header-main-menu__button"
            ${t({toggleClass:{current:()=>o.active}})}
        >
            ${o.label}
        </button>
    `};var tC=m.createComponent({tag:"header-main-menu-button",component:eC,bindStore:ee,props:{label:()=>({value:"",type:String}),section:()=>({value:"",type:String})},state:{active:()=>({value:!1,type:Boolean})}});var rC=m.createComponent({tag:"header-main-menu",component:Z0,child:[tC],state:{isMounted:()=>({value:!1,type:Boolean})}});var oC=m.createComponent({tag:"mob-header",component:G0,state:{isMounted:()=>({value:!1,type:Boolean})},child:[rC,Q0,J0]});var wp=0,nC=({root:e})=>{let t=e.querySelector(".l-navcontainer__wrap"),r=e.querySelector(".l-navcontainer__scroll"),o=e.querySelector(".l-navcontainer__percent"),n=200,s=new _t({screen:t,scroller:r,direction:"vertical",drag:!0,scopedEvent:!1,onUpdate:({percent:i})=>{let{navigationIsOpen:a}=ee.get();a&&(wp=Math.round(i)/100,o.style.transform=`translateZ(0) scaleX(${wp})`)}});return s.init(),ee.watch("activeNavigationSection",i=>{let a=document.querySelector(`[data-sectionname='${i}']`);if(!a)return;let c=document.querySelector(".l-header"),l=document.querySelector(".l-footer"),p=le(r),h=le(c),f=le(l),y=100*a.offsetTop/(p-window.innerHeight+h+f);setTimeout(()=>{ee.getProp("navigationIsOpen")||s.set(y)},400)}),ee.watch("navigationIsOpen",i=>{if(i){o.style.transform=`translateZ(0) scaleX(${wp})`;return}o.style.transform="translateZ(0) scaleX(0)"}),{scrollNativationToTop:()=>{setTimeout(()=>{s.move(0).catch(()=>{}),o.style.transform="translateZ(0) scaleX(0)"},n)},refreshScroller:()=>{s.refresh()}}};function pR({main:e,proxi:t}){t.isOpen=!1,u.useFrame(()=>{document.body.style.overflow="",e.classList.remove("shift")})}function mR({main:e,proxi:t}){Jc(),t.isOpen=!0,u.useFrame(()=>{document.body.style.overflow="hidden",e.classList.add("shift")})}function hR({main:e}){e.addEventListener("click",()=>{ee.set("navigationIsOpen",!1),Ut()})}var dR=()=>{qc(),os();let{navigationIsOpen:e}=ee.get();e||Or.to(0)},sC=({onMount:e,addMethod:t,delegateEvents:r,bindEffect:o,getProxi:n})=>{let s=n();return e(({element:i})=>{let a=document.querySelector("main.main");ee.watch("navigationIsOpen",p=>{if(p&&a){mR({main:a,proxi:s});return}pR({main:a,proxi:s})}),hR({main:a});let{scrollNativationToTop:c,refreshScroller:l}=nC({root:i});return t("scrollTop",c),t("refresh",l),u.useFrameIndex(()=>{s.isMounted=!0},To()),()=>{}}),g`
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
                    ${r({click:()=>{dR()}})}
                ></button>
            </div>
            <div class="l-navcontainer__wrap">
                <div class="l-navcontainer__scroll">
                    <mob-navigation
                        name="${bc}"
                    ></mob-navigation>
                </div>
            </div>
        </div>
    `};function fR({data:e,staticProps:t,bindProps:r,proxi:o}){return e.map((n,s)=>{let{label:i,url:a,activeId:c,children:l,section:p,sectioName:h,scrollToSection:f,forceChildren:d,hide:y}=n;return p?g`
                    <mob-navigation-label
                        ${t({label:i,sectioName:h,hide:!!y})}
                    ></mob-navigation-label>
                `:l?g`
                      <mob-navigation-submenu
                          ${t({headerButton:{label:i,url:a,id:s},children:l,callback:({forceClose:v=!1})=>{if(v){o.currentAccordionId=-1;return}o.currentAccordionId=s}})}
                          ${r(()=>({isOpen:o.currentAccordionId===s}))}
                      >
                      </mob-navigation-submenu>
                  `:g`
                      <li class="l-navigation__item">
                          <mob-navigation-button
                              ${t({label:i,url:a,scrollToSection:f??"no-scroll",activeId:c??-1,forceChildren:d??[]})}
                          ></mob-navigation-button>
                      </li>
                  `}).join("")}var iC=({staticProps:e,setState:t,bindProps:r,addMethod:o,getProxi:n})=>{let s=n(),{navigation:i}=pr();return o("closeAllAccordion",({fireCallback:a=!0}={})=>{t(()=>s.currentAccordionId,-1,{emit:a})}),g`
        <nav class="l-navigation">
            <ul class="l-navigation__list">
                ${fR({data:i,staticProps:e,bindProps:r,proxi:s})}
            </ul>
        </nav>
    `};var aC=({bindEffect:e,getProxi:t})=>{let r=t();return g`
        <div
            class="l-navigation__label"
            data-sectionname="${r.sectioName}"
            ${e({toggleClass:{active:()=>r.sectioName===r.activeNavigationSection,hide:()=>!!r.hide}})}
        >
            ${r.label}
        </div>
    `};var cC=m.createComponent({tag:"mob-navigation-label",component:aC,bindStore:ee,props:{label:()=>({value:"",type:String}),sectioName:()=>({value:"",type:String}),hide:()=>({value:!1,type:Boolean})}});function gR({proxi:e,staticProps:t}){return e.children.map(r=>{let{label:o,url:n,scrollToSection:s,activeId:i}=r;return g`
                <li class="l-navigation__submenu__item">
                    <mob-navigation-button
                        ${t({label:o,url:n,subMenuClass:"l-navigation__link--submenu",scrollToSection:s,activeId:i??-1,callback:()=>{e.callback({forceClose:!1})}})}
                    ></mob-navigation-button>
                </li>
            `}).join("")}var lC=({onMount:e,staticProps:t,bindProps:r,watch:o,setRef:n,getRef:s,getProxi:i})=>{let a=i(),{label:c,url:l,activeId:p}=a.headerButton;return e(()=>{let{content:h}=s();return $r.subscribe(h),$r.reset(h),o(()=>a.isOpen,async f=>{await $r[f?"down":"up"](h),Jc(),!f&&os({fireCallback:!1})},{immediate:!0}),()=>{}}),g`
        <li class="l-navigation__item has-child">
            <mob-navigation-button
                ${t({label:c,url:l,arrowClass:"l-navigation__link--arrow",fireRoute:!1,activeId:p??-1,callback:()=>{a.callback({forceClose:a.isOpen})}})}
                ${r(()=>({isOpen:a.isOpen}))}
            ></mob-navigation-button>
            <ul class="l-navigation__submenu" ${n("content")}>
                ${gR({proxi:a,staticProps:t})}
            </ul>
        </li>
    `};var uC=({delegateEvents:e,getProxi:t,bindEffect:r})=>{let o=t(),{label:n,url:s,arrowClass:i,subMenuClass:a,fireRoute:c,callback:l,scrollToSection:p,activeId:h,forceChildren:f}=o;return m.afterRouteChange(({currentRoute:d})=>{u.useFrame(()=>{let v=s.split("?")?.[0]??"",T=m.getActiveParams(),S=h===-1||T?.activeId===`${h}`,_=d===v&&S,E=f.includes(d);o.isCurrent=_||E,_&&c&&(l(),ee.set("activeNavigationSection",p))})}),g`
        <button
            type="button"
            class="l-navigation__link  ${i} ${a}"
            ${e({click:()=>{l(),c&&(m.loadUrl({url:s}),ee.set("navigationIsOpen",!1))}})}
            ${r({toggleClass:{active:()=>o.isOpen,current:()=>o.isCurrent}})}
        >
            ${n}
        </button>
    `};var Yc=m.createComponent({tag:"mob-navigation-button",component:uC,props:{label:()=>({value:"",type:String}),url:()=>({value:"",type:String}),arrowClass:()=>({value:"",type:String}),subMenuClass:()=>({value:"",type:String}),fireRoute:()=>({value:!0,type:Boolean}),callback:()=>({value:()=>{},type:Function}),isOpen:()=>({value:!1,type:Boolean}),scrollToSection:()=>({value:"",type:String}),activeId:()=>({value:-1,type:Number}),forceChildren:()=>({value:[],type:Array})},state:{isCurrent:()=>({value:!1,type:Boolean})}});var pC=m.createComponent({tag:"mob-navigation-submenu",component:lC,props:{callback:()=>({value:()=>{},type:Function}),headerButton:()=>({value:{},type:"Any"}),children:()=>({value:[],type:Array}),isOpen:()=>({value:!1,type:Boolean})},child:[Yc]});var mC=m.createComponent({tag:"mob-navigation",component:iC,state:{currentAccordionId:()=>({value:-1,type:Number,skipEqual:!1})},child:[cC,pC,Yc]});var hC=m.createComponent({tag:"mob-navigation-container",component:sC,child:[mC],state:{isOpen:()=>({value:!1,type:Boolean}),isMounted:()=>({value:!1,type:Boolean})}});m.useComponent([oC,hC,U0,m0,g0,v0,u0,i0,V0,F0,d0]);var dC=async()=>g`
        ${""}
        <debug-overlay name="${fc}"></debug-overlay>
        <mob-header name="${ST}"></mob-header>
        <mob-navigation-container
            name="${ui}"
        ></mob-navigation-container>
        <main class="main">
            <div class="container">
                <div class="inner-wrap">
                    <div id="content"></div>
                </div>
            </div>
        </main>
        <mob-footer> </mob-footer>
        <quick-nav name="${ai}"></quick-nav>
        <route-loader name="${Tc}"></route-loader>
        <scroll-down-label name="${ci}"></scroll-down-label>
        <links-mobjs></links-mobjs>
        <right-sidebar name="${yc}"></right-sidebar>
        <search-overlay name="${vc}"></search-overlay>
    `;var Ip=0,Mp=document.querySelector(".js-main-loader-track"),fC=(e=60)=>{let t=()=>{if(Ip++,!Mp)return;let r=100*Ip/e;if(Mp.style.transform=`scaleX(${r/100})`,Ip>=e){Mp=null;return}u.useNextFrame(()=>{t()})};u.useFrame(()=>{t()})};var gC=e=>{m.useMethodByName(Tc).skip(e)};var bC=60,vC=()=>ue.mq("max","desktop"),bR=()=>{u.useResize(()=>{vC()&&m.loadUrl({url:"onlyDesktop"})})},Kc=document.body.querySelector(".js-main-loader"),Qc=document.body.querySelector(".js-main-loader-background"),Xc=H.createTimeTween({data:{opacity:1},duration:1e3});Kc&&Qc&&[Kc,Qc].forEach(e=>{Xc?.subscribe(({opacity:t})=>{e.style.opacity=t})});var vR=async()=>{await Fy(),await By(),fC(bC),await u.useFps({duration:bC,force:!0}),m.inizializeApp({rootId:"#root",contentId:"#content",wrapper:dC,routes:Bc,index:"home",pageNotFound:"pageNotFound",beforePageTransition:Px,pageTransition:Nx,afterInit:async()=>{await Xc.goTo({opacity:0}),Xc.destroy(),Xc=null,Kc?.remove(),Qc?.remove(),Kc=null,Qc=null,Ox(),bR(),gC(!1)},redirect:({route:e})=>vC()?"onlyDesktop":e,restoreScroll:!0,componentDefaultProps:{scoped:!1,maxParseIteration:1e4,debug:!1}})};u.useLoad(()=>{Oy(),ue.setDefault({deferredNextTick:!0,throttle:100}),vR(),Ay()});})();
//# sourceMappingURL=main.js.map
