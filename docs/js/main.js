"use strict";(()=>{var IC=Object.create;var Yc=Object.defineProperty;var MC=Object.getOwnPropertyDescriptor;var kC=Object.getOwnPropertyNames;var RC=Object.getPrototypeOf,NC=Object.prototype.hasOwnProperty;var PC=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),_o=(e,t)=>{for(var r in t)Yc(e,r,{get:t[r],enumerable:!0})},AC=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of kC(t))!NC.call(e,n)&&n!==r&&Yc(e,n,{get:()=>t[n],enumerable:!(o=MC(t,n))||o.enumerable});return e};var OC=(e,t,r)=>(r=e!=null?IC(RC(e)):{},AC(t||!e||!e.__esModule?Yc(r,"default",{value:e,enumerable:!0}):r,e));var sT=PC((IJ,nT)=>{function Gy(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{let r=e[t],o=typeof r;(o==="object"||o==="function")&&!Object.isFrozen(r)&&Gy(r)}),e}var nc=class{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}};function qy(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function vo(e,...t){let r=Object.create(null);for(let o in e)r[o]=e[o];return t.forEach(function(o){for(let n in o)r[n]=o[n]}),r}var VI="</span>",Vy=e=>!!e.scope,WI=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){let r=e.split(".");return[`${t}${r.shift()}`,...r.map((o,n)=>`${o}${"_".repeat(n+1)}`)].join(" ")}return`${t}${e}`},qu=class{constructor(t,r){this.buffer="",this.classPrefix=r.classPrefix,t.walk(this)}addText(t){this.buffer+=qy(t)}openNode(t){if(!Vy(t))return;let r=WI(t.scope,{prefix:this.classPrefix});this.span(r)}closeNode(t){Vy(t)&&(this.buffer+=VI)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}},Wy=(e={})=>{let t={children:[]};return Object.assign(t,e),t},Ju=class e{constructor(){this.rootNode=Wy(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){let r=Wy({scope:t});this.add(r),this.stack.push(r)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,r){return typeof r=="string"?t.addText(r):r.children&&(t.openNode(r),r.children.forEach(o=>this._walk(t,o)),t.closeNode(r)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(r=>typeof r=="string")?t.children=[t.children.join("")]:t.children.forEach(r=>{e._collapse(r)}))}},Yu=class extends Ju{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,r){let o=t.root;r&&(o.scope=`language:${r}`),this.add(o)}toHTML(){return new qu(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}};function Qs(e){return e?typeof e=="string"?e:e.source:null}function Jy(e){return Ho("(?=",e,")")}function jI(e){return Ho("(?:",e,")*")}function zI(e){return Ho("(?:",e,")?")}function Ho(...e){return e.map(r=>Qs(r)).join("")}function HI(e){let t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function Ku(...e){return"("+(HI(e).capture?"":"?:")+e.map(o=>Qs(o)).join("|")+")"}function Yy(e){return new RegExp(e.toString()+"|").exec("").length-1}function UI(e,t){let r=e&&e.exec(t);return r&&r.index===0}var GI=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function Qu(e,{joinWith:t}){let r=0;return e.map(o=>{r+=1;let n=r,s=Qs(o),i="";for(;s.length>0;){let a=GI.exec(s);if(!a){i+=s;break}i+=s.substring(0,a.index),s=s.substring(a.index+a[0].length),a[0][0]==="\\"&&a[1]?i+="\\"+String(Number(a[1])+n):(i+=a[0],a[0]==="("&&r++)}return i}).map(o=>`(${o})`).join(t)}var qI=/\b\B/,Xy="[a-zA-Z]\\w*",Zu="[a-zA-Z_]\\w*",Ky="\\b\\d+(\\.\\d+)?",Qy="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Zy="\\b(0b[01]+)",JI="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",YI=(e={})=>{let t=/^#![ ]*\//;return e.binary&&(e.begin=Ho(t,/.*\b/,e.binary,/\b.*/)),vo({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(r,o)=>{r.index!==0&&o.ignoreMatch()}},e)},Zs={begin:"\\\\[\\s\\S]",relevance:0},XI={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[Zs]},KI={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[Zs]},QI={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},ic=function(e,t,r={}){let o=vo({scope:"comment",begin:e,end:t,contains:[]},r);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});let n=Ku("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:Ho(/[ ]+/,"(",n,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},ZI=ic("//","$"),eM=ic("/\\*","\\*/"),tM=ic("#","$"),rM={scope:"number",begin:Ky,relevance:0},oM={scope:"number",begin:Qy,relevance:0},nM={scope:"number",begin:Zy,relevance:0},sM={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[Zs,{begin:/\[/,end:/\]/,relevance:0,contains:[Zs]}]},iM={scope:"title",begin:Xy,relevance:0},aM={scope:"title",begin:Zu,relevance:0},cM={begin:"\\.\\s*"+Zu,relevance:0},lM=function(e){return Object.assign(e,{"on:begin":(t,r)=>{r.data._beginMatch=t[1]},"on:end":(t,r)=>{r.data._beginMatch!==t[1]&&r.ignoreMatch()}})},oc=Object.freeze({__proto__:null,APOS_STRING_MODE:XI,BACKSLASH_ESCAPE:Zs,BINARY_NUMBER_MODE:nM,BINARY_NUMBER_RE:Zy,COMMENT:ic,C_BLOCK_COMMENT_MODE:eM,C_LINE_COMMENT_MODE:ZI,C_NUMBER_MODE:oM,C_NUMBER_RE:Qy,END_SAME_AS_BEGIN:lM,HASH_COMMENT_MODE:tM,IDENT_RE:Xy,MATCH_NOTHING_RE:qI,METHOD_GUARD:cM,NUMBER_MODE:rM,NUMBER_RE:Ky,PHRASAL_WORDS_MODE:QI,QUOTE_STRING_MODE:KI,REGEXP_MODE:sM,RE_STARTERS_RE:JI,SHEBANG:YI,TITLE_MODE:iM,UNDERSCORE_IDENT_RE:Zu,UNDERSCORE_TITLE_MODE:aM});function uM(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function pM(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function mM(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=uM,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function dM(e,t){Array.isArray(e.illegal)&&(e.illegal=Ku(...e.illegal))}function hM(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function fM(e,t){e.relevance===void 0&&(e.relevance=1)}var gM=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");let r=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=r.keywords,e.begin=Ho(r.beforeMatch,Jy(r.begin)),e.starts={relevance:0,contains:[Object.assign(r,{endsParent:!0})]},e.relevance=0,delete r.beforeMatch},bM=["of","and","for","in","not","or","if","then","parent","list","value"],vM="keyword";function eT(e,t,r=vM){let o=Object.create(null);return typeof e=="string"?n(r,e.split(" ")):Array.isArray(e)?n(r,e):Object.keys(e).forEach(function(s){Object.assign(o,eT(e[s],t,s))}),o;function n(s,i){t&&(i=i.map(a=>a.toLowerCase())),i.forEach(function(a){let c=a.split("|");o[c[0]]=[s,yM(c[0],c[1])]})}}function yM(e,t){return t?Number(t):TM(e)?0:1}function TM(e){return bM.includes(e.toLowerCase())}var jy={},zo=e=>{console.error(e)},zy=(e,...t)=>{console.log(`WARN: ${e}`,...t)},Jn=(e,t)=>{jy[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),jy[`${e}/${t}`]=!0)},sc=new Error;function tT(e,t,{key:r}){let o=0,n=e[r],s={},i={};for(let a=1;a<=t.length;a++)i[a+o]=n[a],s[a+o]=!0,o+=Yy(t[a-1]);e[r]=i,e[r]._emit=s,e[r]._multi=!0}function SM(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw zo("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),sc;if(typeof e.beginScope!="object"||e.beginScope===null)throw zo("beginScope must be object"),sc;tT(e,e.begin,{key:"beginScope"}),e.begin=Qu(e.begin,{joinWith:""})}}function _M(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw zo("skip, excludeEnd, returnEnd not compatible with endScope: {}"),sc;if(typeof e.endScope!="object"||e.endScope===null)throw zo("endScope must be object"),sc;tT(e,e.end,{key:"endScope"}),e.end=Qu(e.end,{joinWith:""})}}function xM(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function CM(e){xM(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),SM(e),_M(e)}function EM(e){function t(i,a){return new RegExp(Qs(i),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(a?"g":""))}class r{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(a,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,a]),this.matchAt+=Yy(a)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);let a=this.regexes.map(c=>c[1]);this.matcherRe=t(Qu(a,{joinWith:"|"}),!0),this.lastIndex=0}exec(a){this.matcherRe.lastIndex=this.lastIndex;let c=this.matcherRe.exec(a);if(!c)return null;let l=c.findIndex((d,f)=>f>0&&d!==void 0),p=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,p)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(a){if(this.multiRegexes[a])return this.multiRegexes[a];let c=new r;return this.rules.slice(a).forEach(([l,p])=>c.addRule(l,p)),c.compile(),this.multiRegexes[a]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(a,c){this.rules.push([a,c]),c.type==="begin"&&this.count++}exec(a){let c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(a);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){let p=this.getMatcher(0);p.lastIndex=this.lastIndex+1,l=p.exec(a)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function n(i){let a=new o;return i.contains.forEach(c=>a.addRule(c.begin,{rule:c,type:"begin"})),i.terminatorEnd&&a.addRule(i.terminatorEnd,{type:"end"}),i.illegal&&a.addRule(i.illegal,{type:"illegal"}),a}function s(i,a){let c=i;if(i.isCompiled)return c;[pM,hM,CM,gM].forEach(p=>p(i,a)),e.compilerExtensions.forEach(p=>p(i,a)),i.__beforeBegin=null,[mM,dM,fM].forEach(p=>p(i,a)),i.isCompiled=!0;let l=null;return typeof i.keywords=="object"&&i.keywords.$pattern&&(i.keywords=Object.assign({},i.keywords),l=i.keywords.$pattern,delete i.keywords.$pattern),l=l||/\w+/,i.keywords&&(i.keywords=eT(i.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),a&&(i.begin||(i.begin=/\B|\b/),c.beginRe=t(c.begin),!i.end&&!i.endsWithParent&&(i.end=/\B|\b/),i.end&&(c.endRe=t(c.end)),c.terminatorEnd=Qs(c.end)||"",i.endsWithParent&&a.terminatorEnd&&(c.terminatorEnd+=(i.end?"|":"")+a.terminatorEnd)),i.illegal&&(c.illegalRe=t(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map(function(p){return wM(p==="self"?i:p)})),i.contains.forEach(function(p){s(p,c)}),i.starts&&s(i.starts,a),c.matcher=n(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=vo(e.classNameAliases||{}),s(e)}function rT(e){return e?e.endsWithParent||rT(e.starts):!1}function wM(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return vo(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:rT(e)?vo(e,{starts:e.starts?vo(e.starts):null}):Object.isFrozen(e)?vo(e):e}var IM="11.11.1",Xu=class extends Error{constructor(t,r){super(t),this.name="HTMLInjectionError",this.html=r}},Gu=qy,Hy=vo,Uy=Symbol("nomatch"),MM=7,oT=function(e){let t=Object.create(null),r=Object.create(null),o=[],n=!0,s="Could not find the language '{}', did you forget to load/include a language module?",i={disableAutodetect:!0,name:"Plain text",contains:[]},a={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Yu};function c(x){return a.noHighlightRe.test(x)}function l(x){let N=x.className+" ";N+=x.parentNode?x.parentNode.className:"";let $=a.languageDetectRe.exec(N);if($){let B=k($[1]);return B||(zy(s.replace("{}",$[1])),zy("Falling back to no-highlight mode for this block.",x)),B?$[1]:"no-highlight"}return N.split(/\s+/).find(B=>c(B)||k(B))}function p(x,N,$){let B="",V="";typeof N=="object"?(B=x,$=N.ignoreIllegals,V=N.language):(Jn("10.7.0","highlight(lang, code, ...args) has been deprecated."),Jn("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),V=x,B=N),$===void 0&&($=!0);let K={code:B,language:V};R("before:highlight",K);let ue=K.result?K.result:d(K.language,K.code,$);return ue.code=K.code,R("after:highlight",ue),ue}function d(x,N,$,B){let V=Object.create(null);function K(W,U){return W.keywords[U]}function ue(){if(!Y.keywords){He.addText(Me);return}let W=0;Y.keywordPatternRe.lastIndex=0;let U=Y.keywordPatternRe.exec(Me),ie="";for(;U;){ie+=Me.substring(W,U.index);let Ce=Ke.case_insensitive?U[0].toLowerCase():U[0],rt=K(Y,Ce);if(rt){let[yr,EC]=rt;if(He.addText(ie),ie="",V[Ce]=(V[Ce]||0)+1,V[Ce]<=MM&&(di+=EC),yr.startsWith("_"))ie+=U[0];else{let wC=Ke.classNameAliases[yr]||yr;me(U[0],wC)}}else ie+=U[0];W=Y.keywordPatternRe.lastIndex,U=Y.keywordPatternRe.exec(Me)}ie+=Me.substring(W),He.addText(ie)}function ge(){if(Me==="")return;let W=null;if(typeof Y.subLanguage=="string"){if(!t[Y.subLanguage]){He.addText(Me);return}W=d(Y.subLanguage,Me,!0,us[Y.subLanguage]),us[Y.subLanguage]=W._top}else W=h(Me,Y.subLanguage.length?Y.subLanguage:null);Y.relevance>0&&(di+=W.relevance),He.__addSublanguage(W._emitter,W.language)}function ee(){Y.subLanguage!=null?ge():ue(),Me=""}function me(W,U){W!==""&&(He.startScope(U),He.addText(W),He.endScope())}function pe(W,U){let ie=1,Ce=U.length-1;for(;ie<=Ce;){if(!W._emit[ie]){ie++;continue}let rt=Ke.classNameAliases[W[ie]]||W[ie],yr=U[ie];rt?me(yr,rt):(Me=yr,ue(),Me=""),ie++}}function ve(W,U){return W.scope&&typeof W.scope=="string"&&He.openNode(Ke.classNameAliases[W.scope]||W.scope),W.beginScope&&(W.beginScope._wrap?(me(Me,Ke.classNameAliases[W.beginScope._wrap]||W.beginScope._wrap),Me=""):W.beginScope._multi&&(pe(W.beginScope,U),Me="")),Y=Object.create(W,{parent:{value:Y}}),Y}function Pe(W,U,ie){let Ce=UI(W.endRe,ie);if(Ce){if(W["on:end"]){let rt=new nc(W);W["on:end"](U,rt),rt.isMatchIgnored&&(Ce=!1)}if(Ce){for(;W.endsParent&&W.parent;)W=W.parent;return W}}if(W.endsWithParent)return Pe(W.parent,U,ie)}function Be(W){return Y.matcher.regexIndex===0?(Me+=W[0],1):(Jc=!0,0)}function q(W){let U=W[0],ie=W.rule,Ce=new nc(ie),rt=[ie.__beforeBegin,ie["on:begin"]];for(let yr of rt)if(yr&&(yr(W,Ce),Ce.isMatchIgnored))return Be(U);return ie.skip?Me+=U:(ie.excludeBegin&&(Me+=U),ee(),!ie.returnBegin&&!ie.excludeBegin&&(Me=U)),ve(ie,W),ie.returnBegin?0:U.length}function Te(W){let U=W[0],ie=N.substring(W.index),Ce=Pe(Y,W,ie);if(!Ce)return Uy;let rt=Y;Y.endScope&&Y.endScope._wrap?(ee(),me(U,Y.endScope._wrap)):Y.endScope&&Y.endScope._multi?(ee(),pe(Y.endScope,W)):rt.skip?Me+=U:(rt.returnEnd||rt.excludeEnd||(Me+=U),ee(),rt.excludeEnd&&(Me=U));do Y.scope&&He.closeNode(),!Y.skip&&!Y.subLanguage&&(di+=Y.relevance),Y=Y.parent;while(Y!==Ce.parent);return Ce.starts&&ve(Ce.starts,W),rt.returnEnd?0:U.length}function De(){let W=[];for(let U=Y;U!==Ke;U=U.parent)U.scope&&W.unshift(U.scope);W.forEach(U=>He.openNode(U))}let pt={};function wt(W,U){let ie=U&&U[0];if(Me+=W,ie==null)return ee(),0;if(pt.type==="begin"&&U.type==="end"&&pt.index===U.index&&ie===""){if(Me+=N.slice(U.index,U.index+1),!n){let Ce=new Error(`0 width match regex (${x})`);throw Ce.languageName=x,Ce.badRule=pt.rule,Ce}return 1}if(pt=U,U.type==="begin")return q(U);if(U.type==="illegal"&&!$){let Ce=new Error('Illegal lexeme "'+ie+'" for mode "'+(Y.scope||"<unnamed>")+'"');throw Ce.mode=Y,Ce}else if(U.type==="end"){let Ce=Te(U);if(Ce!==Uy)return Ce}if(U.type==="illegal"&&ie==="")return Me+=`
`,1;if(qc>1e5&&qc>U.index*3)throw new Error("potential infinite loop, way more iterations than matches");return Me+=ie,ie.length}let Ke=k(x);if(!Ke)throw zo(s.replace("{}",x)),new Error('Unknown language: "'+x+'"');let ls=EM(Ke),Vr="",Y=B||ls,us={},He=new a.__emitter(a);De();let Me="",di=0,So=0,qc=0,Jc=!1;try{if(Ke.__emitTokens)Ke.__emitTokens(N,He);else{for(Y.matcher.considerAll();;){qc++,Jc?Jc=!1:Y.matcher.considerAll(),Y.matcher.lastIndex=So;let W=Y.matcher.exec(N);if(!W)break;let U=N.substring(So,W.index),ie=wt(U,W);So=W.index+ie}wt(N.substring(So))}return He.finalize(),Vr=He.toHTML(),{language:x,value:Vr,relevance:di,illegal:!1,_emitter:He,_top:Y}}catch(W){if(W.message&&W.message.includes("Illegal"))return{language:x,value:Gu(N),illegal:!0,relevance:0,_illegalBy:{message:W.message,index:So,context:N.slice(So-100,So+100),mode:W.mode,resultSoFar:Vr},_emitter:He};if(n)return{language:x,value:Gu(N),illegal:!1,relevance:0,errorRaised:W,_emitter:He,_top:Y};throw W}}function f(x){let N={value:Gu(x),illegal:!1,relevance:0,_top:i,_emitter:new a.__emitter(a)};return N._emitter.addText(x),N}function h(x,N){N=N||a.languages||Object.keys(t);let $=f(x),B=N.filter(k).filter(L).map(ee=>d(ee,x,!1));B.unshift($);let V=B.sort((ee,me)=>{if(ee.relevance!==me.relevance)return me.relevance-ee.relevance;if(ee.language&&me.language){if(k(ee.language).supersetOf===me.language)return 1;if(k(me.language).supersetOf===ee.language)return-1}return 0}),[K,ue]=V,ge=K;return ge.secondBest=ue,ge}function y(x,N,$){let B=N&&r[N]||$;x.classList.add("hljs"),x.classList.add(`language-${B}`)}function b(x){let N=null,$=l(x);if(c($))return;if(R("before:highlightElement",{el:x,language:$}),x.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",x);return}if(x.children.length>0&&(a.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(x)),a.throwUnescapedHTML))throw new Xu("One of your code blocks includes unescaped HTML.",x.innerHTML);N=x;let B=N.textContent,V=$?p(B,{language:$,ignoreIllegals:!0}):h(B);x.innerHTML=V.value,x.dataset.highlighted="yes",y(x,$,V.language),x.result={language:V.language,re:V.relevance,relevance:V.relevance},V.secondBest&&(x.secondBest={language:V.secondBest.language,relevance:V.secondBest.relevance}),R("after:highlightElement",{el:x,result:V,text:B})}function T(x){a=Hy(a,x)}let _=()=>{C(),Jn("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function S(){C(),Jn("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let E=!1;function C(){function x(){C()}if(document.readyState==="loading"){E||window.addEventListener("DOMContentLoaded",x,!1),E=!0;return}document.querySelectorAll(a.cssSelector).forEach(b)}function M(x,N){let $=null;try{$=N(e)}catch(B){if(zo("Language definition for '{}' could not be registered.".replace("{}",x)),n)zo(B);else throw B;$=i}$.name||($.name=x),t[x]=$,$.rawDefinition=N.bind(null,e),$.aliases&&O($.aliases,{languageName:x})}function I(x){delete t[x];for(let N of Object.keys(r))r[N]===x&&delete r[N]}function P(){return Object.keys(t)}function k(x){return x=(x||"").toLowerCase(),t[x]||t[r[x]]}function O(x,{languageName:N}){typeof x=="string"&&(x=[x]),x.forEach($=>{r[$.toLowerCase()]=N})}function L(x){let N=k(x);return N&&!N.disableAutodetect}function D(x){x["before:highlightBlock"]&&!x["before:highlightElement"]&&(x["before:highlightElement"]=N=>{x["before:highlightBlock"](Object.assign({block:N.el},N))}),x["after:highlightBlock"]&&!x["after:highlightElement"]&&(x["after:highlightElement"]=N=>{x["after:highlightBlock"](Object.assign({block:N.el},N))})}function F(x){D(x),o.push(x)}function w(x){let N=o.indexOf(x);N!==-1&&o.splice(N,1)}function R(x,N){let $=x;o.forEach(function(B){B[$]&&B[$](N)})}function A(x){return Jn("10.7.0","highlightBlock will be removed entirely in v12.0"),Jn("10.7.0","Please use highlightElement now."),b(x)}Object.assign(e,{highlight:p,highlightAuto:h,highlightAll:C,highlightElement:b,highlightBlock:A,configure:T,initHighlighting:_,initHighlightingOnLoad:S,registerLanguage:M,unregisterLanguage:I,listLanguages:P,getLanguage:k,registerAliases:O,autoDetection:L,inherit:Hy,addPlugin:F,removePlugin:w}),e.debugMode=function(){n=!1},e.safeMode=function(){n=!0},e.versionString=IM,e.regex={concat:Ho,lookahead:Jy,either:Ku,optional:zI,anyNumberOfTimes:jI};for(let x in oc)typeof oc[x]=="object"&&Gy(oc[x]);return Object.assign(e,oc),e},Yn=oT({});Yn.newInstance=()=>oT({});nT.exports=Yn;Yn.HighlightJS=Yn;Yn.default=Yn});var u={};_o(u,{ANIMATION_STOP_REJECT:()=>ml,checkType:()=>Fe,createStore:()=>DE,debounce:()=>xo,getFps:()=>BE,getInstantFps:()=>FE,getTime:()=>Kt,getTypeName:()=>ms,getUnivoqueId:()=>ke,mustMakeSomething:()=>VE,normalizeWheel:()=>Ci,shouldMakeSomething:()=>WE,store:()=>gw,throttle:()=>hi,useCache:()=>JE,useDebounce:()=>xo,useFps:()=>GE,useFrame:()=>jE,useFrameIndex:()=>UE,useLinkedList:()=>bw,useLoad:()=>qE,useMouseClick:()=>KE,useMouseDown:()=>QE,useMouseMove:()=>ew,useMouseUp:()=>rw,useMouseWheel:()=>nw,useNextFrame:()=>HE,useNextLoop:()=>Bt,useNextTick:()=>zE,usePointerDown:()=>pw,usePointerLeave:()=>fw,usePointerMove:()=>mw,usePointerOut:()=>hw,usePointerOver:()=>uw,usePointerUp:()=>dw,useResize:()=>YE,useScroll:()=>sw,useScrollEnd:()=>lw,useScrollImmediate:()=>iw,useScrollStart:()=>cw,useScrollThrottle:()=>aw,useTouchEnd:()=>ow,useTouchMove:()=>tw,useTouchStart:()=>ZE,useVisibilityChange:()=>XE});var Kt=()=>typeof globalThis>"u"?Date.now():globalThis.performance.now(),Cp=16.666666666666668;var hi=(e,t)=>{let r,o;return function(){let n=this,s=arguments;o?(clearTimeout(r),r=setTimeout(function(){Kt()-o>=t&&(e.apply(n,s),o=Kt())},t-(Kt()-o))):(e.apply(n,s),o=Kt())}};var xo=function(t,r=200){let o;return function(){let n=()=>Reflect.apply(t,this,arguments);clearTimeout(o),o=setTimeout(n,r)}};function ne(e){if(!e)return 0;let t=e.offsetHeight,r=getComputedStyle(e);return t+=Number.parseInt(r.marginTop)+Number.parseInt(r.marginBottom),t}function Ve(e){if(!e)return 0;let t=e.offsetWidth,r=getComputedStyle(e);return t+=Number.parseInt(r.marginLeft)+Number.parseInt(r.marginRight),t}function de(e){if(!e)return{top:0,left:0};let t=e.getBoundingClientRect();return{top:t.top+window.scrollY,left:t.left+window.scrollY}}function It(e){return e?e.getBoundingClientRect():{bottom:0,height:0,left:0,right:0,top:0,width:0,x:0,y:0}}function ps(e,t){let r=t?.parentNode;for(;r;){if(r===e)return!0;r=r?.parentNode}return!1}function Co(e){let t=globalThis.getComputedStyle(e),r=t.transform||t.mozTransform;if(r==="none"||r===void 0)return{x:0,y:0,z:0};let o=r.includes("3d")?"3d":"2d",n=r.match(/matrix.*\((.+)\)/)[1].split(", ");if(o==="2d")return{x:n[4],y:n[5],z:0};if(o==="3d")return{x:n[12],y:n[13],z:n[14]}}function Xc(e){return typeof Node=="object"?e instanceof Node:e&&typeof e=="object"&&typeof e.nodeType=="number"&&typeof e.nodeName=="string"}var ke=()=>`_${Math.random().toString(36).slice(2,9)}`;function Ep(e){var t=e.getBoundingClientRect();return t.top>=0&&t.bottom<=window.innerHeight}var Kc=(e,t,r)=>Math.min(Math.max(e,t),r);var fi=new Set,Bt=e=>{fi.add(e),fi.size===1&&setTimeout(()=>{fi.forEach(t=>{t()}),fi.clear()})};var Qc="UNTYPED",wp="STRING",Ip="NUMBER",Mp="OBJECT",kp="FUNCTION",gi="ARRAY",Rp="BOOLEAN",Np="ELEMENT",Pp="HTMLELEMENT",Ap="NODELIST";var we={isString:e=>Object.prototype.toString.call(e)==="[object String]",isNumber:e=>Object.prototype.toString.call(e)==="[object Number]"&&Number.isFinite(e),isObject:e=>Object.prototype.toString.call(e)==="[object Object]",isFunction:e=>Object.prototype.toString.call(e)==="[object Function]",isArray:e=>Object.prototype.toString.call(e)==="[object Array]",isBoolean:e=>Object.prototype.toString.call(e)==="[object Boolean]",isElement:e=>e instanceof Element||e instanceof Document,isHTMLElement:e=>e instanceof HTMLElement,isSet:e=>e instanceof Set,isMap:e=>e instanceof Map,isNodeList:e=>Object.prototype.isPrototypeOf.call(NodeList.prototype,e)},ms=e=>{switch(e){case String:case wp:return"String";case Number:case Ip:return"Number";case Object:case Mp:return"Object";case Function:case kp:return"Function";case Array:case gi:return"Array";case Boolean:case Rp:return"Boolean";case Element:case Np:return"Element";case HTMLElement:case Pp:return"HTMLElement";case NodeList:case Ap:return"NodeList";case Set:case"SET":return"Set";case Map:case"MAP":return"Map";case"ANY":return"ANY";default:return Qc}},Fe=(e,t)=>{switch(e){case String:case wp:return we.isString(t);case Number:case Ip:return we.isNumber(t);case Object:case Mp:return we.isObject(t);case Function:case kp:return we.isFunction(t);case Array:case gi:return we.isArray(t);case Boolean:case Rp:return we.isBoolean(t);case Element:case Np:return we.isElement(t);case HTMLElement:case Pp:return we.isHTMLElement(t);case NodeList:case Ap:return we.isNodeList(t);case Set:case"SET":return we.isSet(t);case Map:case"MAP":return we.isMap(t);case"ANY":return!0;default:return!0}};var DC=(e,t)=>e.size===t.size&&[...e.keys()].every(r=>e.get(r)===t.get(r)),FC=(e,t)=>e.size===t.size&&[...e].every(r=>t.has(r)),BC=(e,t)=>{if(e.length!==t.length)return!1;let r=new Set([...e,...t]);for(let o of r){let n=e.filter(i=>i===o).length,s=t.filter(i=>i===o).length;if(n!==s)return!1}return!0},Op=(e,t,r=!1)=>{if(e===null||t===null)return e===t;let n=e,s=t;if(r||(Array.isArray(e)&&(n=[...e].toSorted()),Array.isArray(t)&&(s=[...t].toSorted())),typeof n!="object"||typeof s!="object")return n===s;let i=Object.getOwnPropertyNames(n),a=Object.getOwnPropertyNames(s);if(i.length!==a.length)return!1;for(let c of i){let l=n[c],p=s[c];if(typeof l=="object"&&typeof p=="object"){if(Op(l,p,r))continue;return!1}if(l!==p)return!1}return!0},Zc=(e,t,r)=>{switch(e){case"ANY":return Op(t,r);case gi:case Array:return BC(t,r);case"SET":case Set:return FC(t,r);case"MAP":case Map:return DC(t,r);default:return t===r}};var bi="UPDATE";var Re={};_o(Re,{extractKeysFromArray:()=>rl,extractkeyFromProp:()=>Wr,getCurrentDependencies:()=>el,getFirstCurrentDependencies:()=>tl,initializeCurrentDependencies:()=>ds,setCurrentDependencies:()=>yi});var Yo=[],vi=!1,ds=()=>{vi=!0,Yo.length=0},el=()=>(vi=!1,[...Yo]),tl=()=>(vi=!1,[...Yo]?.[0]??"missing_prop"),yi=e=>{!vi||!e||Yo.includes(e)||(Yo=[...Yo,e])},Wr=e=>Fe(String,e)?e:(ds(),e(),tl()),rl=e=>e.map(t=>Fe(String,t)?t:(ds(),t(),tl()));var Ti=new Map,Xo=({callBackWatcher:e,prop:t,newValue:r,oldValue:o,validationValue:n,instanceId:s})=>{for(let{prop:i,fn:a,wait:c}of e.values())if(i===t&&!c&&a(r,o,n),s&&i===t&&c){let l=Ti.get(s)??new Map,p=l.has(t);if(l.set(t,{newValue:r,oldValue:o,validationValue:n}),p)return;Ti.set(s,l),Bt(()=>{let d=Ti.get(s),f=d?.get(t);(f.newValue!==void 0||f.newValue!==null)&&a(f.newValue,f.oldValue,f.validationValue),d?.delete(t),d?.size===0&&Ti.delete(s)})}},$p=async({callBackWatcher:e,prop:t,newValue:r,oldValue:o,validationValue:n})=>{for(let{prop:s,fn:i}of e.values())s===t&&await i(r,o,n)};var VC="padding: 10px;",We=()=>VC;var Tr=(e,t=new WeakMap)=>{if(e===null||typeof e!="object"||typeof Element<"u"&&e instanceof Element)return e;if(t.has(e))return t.get(e);if(e instanceof Date)return new Date(e);if(e instanceof RegExp)return new RegExp(e.source,e.flags);if(Array.isArray(e)){let o=[];return t.set(e,o),e.forEach((n,s)=>{o[s]=Tr(n,t)}),o}if(typeof e=="function")return e;if(e instanceof Map){let o=new Map;return t.set(e,o),e.forEach((n,s)=>{o.set(Tr(s,t),Tr(n,t))}),o}if(e instanceof Set){let o=new Set;return t.set(e,o),e.forEach(n=>{o.add(Tr(n,t))}),o}let r=Object.create(Object.getPrototypeOf(e));return t.set(e,r),Object.getOwnPropertyNames(e).forEach(o=>{let n=Object.getOwnPropertyDescriptor(e,o);n&&("value"in n?Object.defineProperty(r,o,{...n,value:Tr(n.value,t)}):Object.defineProperty(r,o,n))}),Object.getOwnPropertySymbols(e).forEach(o=>{let n=Object.getOwnPropertyDescriptor(e,o);n&&("value"in n?Object.defineProperty(r,o,{...n,value:Tr(n.value,t)}):Object.defineProperty(r,o,n))}),r};var ol="store_shallow_copy",nl="store_custom_copy",sl="store_deep_copy",Ko=ol,Si=()=>Ko===nl||Ko===sl;var qe=new Map,re=e=>{if(Ko===ol){let t=qe.get(e);return t?{...t}:void 0}if(Ko===nl){let t=qe.get(e);return t?{...t,store:{...t.store},validationStatusObject:{...t.validationStatusObject}}:void 0}if(Ko===sl){let t=qe.get(e);return t?{...t,store:Tr(t.store),validationStatusObject:Tr(t.validationStatusObject)}:void 0}return qe.get(e)},Ae=(e,t)=>{qe.set(e,t)},Lp=e=>{qe.delete(e)};var il=(e,t)=>{console.warn(`%c MobStore supports an object with a depth of up to 2 levels, set 'Any' type to use obj as value, the input object has ${e} level`,t)};var Dp=(e,t)=>{console.warn(`%c MobStore, trying to execute set() method: store.${e} not exist`,t)},Fp=(e,t,r)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: setProp methods doesn't allow objects as value, ${JSON.stringify(t)} is an Object, use 'Any' type for custom object`,r)},Bp=(e,t)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: '${JSON.stringify(e)}' is an objects`,t)},Vp=(e,t,r,o)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: ${t} is not a ${ms(r)}`,o)},Wp=(e,t,r)=>{console.warn(`%c trying to execute setObj method on '${e}' propierties: setObj methods allow only objects as value, ${t} is not an Object`,r)},jp=(e,t)=>{console.warn(`%c trying to execute setObj data method on '${e}' propierties: store propierties '${e}' is not an object`,t)},zp=(e,t,r)=>{console.warn(`%c trying to execute setObj data method: one of these keys '${e}' not exist in store.${t}`,r)},Hp=(e,t,r)=>{console.warn(`%c trying to execute setObj data method on '${e}' propierties: '${JSON.stringify(t)}' have a depth > 1, nested obj is not allowed`,r)},Up=(e,t,r,o,n)=>{console.warn(`%c trying to execute setObj data method on ${e}.${t} propierties: ${r} is not a ${ms(o)}`,n)},Gp=(e,t)=>{console.warn(`%c trying to execute get data method: store.${e} not exist`,t)},al=(e,t)=>{console.warn(`%c trying to execute set data method: store.${e} not exist`,t)},qp=(e,t)=>{console.warn(`%c one of the keys [${e}] is already used as a computed target, or there is a circular dependencies`,t)},Jp=(e,t)=>{console.warn(`%c MobStore error: the property ${e} to watch doesn't exist in store`,t)},Yp=(e,t)=>{console.warn(`%c Validation Object error: validation function return undefined or have you used Object instead '${t}' ?`,e)};var Xp=(e,t)=>{console.warn(`%c MobStore error: the property ${e} should readOnly with proxi, maybe is a mobJs props.`,t)},cl=(e,t)=>{console.warn(`%c MobStore error: the property ${e} fail validation during definition.`,t)};var hs=e=>{if(!we.isObject(e))return 0;let t=Object.values(e);return t.length===0?1:Math.max(...t.map(r=>hs(r)))+1},Kp=(e,t=!0)=>Object.fromEntries(Object.entries(e).map(([r,o])=>{if(we.isObject(o)&&t)return[r,Kp(o,!1)];if(we.isFunction(o)){let n=o();if(we.isObject(n)&&"value"in n&&["validate","type","skipEqual"].some(s=>s in n))return[r,n.value]}return[r,o]})),Qp=(e,t,r,o=!0)=>Object.fromEntries(Object.entries(e).map(([n,s])=>{if(we.isObject(s)&&o)return[n,Qp(s,t,r,!1)];if(we.isFunction(s)){let i=s();if(we.isObject(i)&&"value"in i&&t in i){let a=we.isString(i[t])?i[t].toUpperCase():i[t];return[n,a]}}return[n,r]})),Zp=({data:e,depth:t,logStyle:r})=>t>2?(il(t,r),{}):Kp(e),Qo=({data:e,prop:t,depth:r,logStyle:o,fallback:n})=>r>2?(il(r,o),{}):Qp(e,t,n),em=({value:e})=>Fe(Map,e)?new Map(e):Fe(Set,e)?new Set(e):Fe(Object,e)?{...e}:Fe(Array,e)?[...e]:e,Zo=({instanceId:e,prop:t})=>{let r=re(e);if(!r)return!1;let{callBackComputed:o}=r,n=[...o].some(({prop:s})=>t===s);return n&&console.warn(`${t} is used as computed, explicit set is disallowed.`),n};var WC=({instanceId:e,prop:t,val:r,fireCallback:o=!0,useStrict:n=!0,initalizeStep:s=!1})=>{let i=re(e);if(!i)return;let{type:a,fnTransformation:c,store:l,fnValidate:p,strict:d,validationStatusObject:f,skipEqual:h,callBackWatcher:y,bindInstanceBy:b}=i,T=We(),_=a[t]==="ANY";if(we.isObject(r)&&!_){Fp(t,r,T);return}if(we.isObject(l[t])&&!_){Bp(t,T);return}let S=l[t],E=c[t]?.(r,S)??r;if(!Fe(a[t],E)){Vp(t,E,a[t],T);return}let M=p[t]?.(E,S);!M&&s&&cl(t,T),!(d[t]&&!M&&n||(f[t]=M,(h[t]?Zc(a[t],S,E):!1)&&!s))&&(l[t]=E,Ae(e,{...i,store:l,validationStatusObject:f}),o&&!s&&(Xo({callBackWatcher:y,prop:t,newValue:E,oldValue:S,validationValue:f[t],instanceId:e}),Sr({instanceId:e,prop:t}),b.forEach(P=>{Sr({instanceId:P,prop:t})})))},jC=({instanceId:e,prop:t,val:r,fireCallback:o=!0,useStrict:n=!0,initalizeStep:s=!1})=>{let i=re(e);if(!i)return;let{store:a,type:c,strict:l,fnTransformation:p,fnValidate:d,validationStatusObject:f,skipEqual:h,callBackWatcher:y,bindInstanceBy:b}=i,T=We();if(!we.isObject(r)){Wp(t,r,T);return}if(!we.isObject(a[t])){jp(t,T);return}let _=Object.keys(r),S=Object.keys(a[t]);if(!_.every(w=>S.includes(w))){zp(_,t,T);return}let C=Object.fromEntries(Object.entries(r).map(w=>{let[R,A]=w,x=a[t][R];return[R,p[t][R]?.(A,x)??A]}));if(!Object.entries(C).map(w=>{let[R,A]=w,x=Fe(c[t][R],A);return x||Up(t,R,A,c[t][R],T),x}).every(w=>w===!0))return;let I=Object.entries(C).map(w=>{let[R,A]=w,x=a[t][R];return l[t][R]&&n?{strictCheck:d[t][R]?.(A,x),item:w}:{strictCheck:!0,item:w}}).filter(({strictCheck:w})=>w===!0);if(I.length===0)return;let k=Object.fromEntries(I.map(({item:w})=>w).map(([w,R])=>[w,R]));Object.entries(k).forEach(w=>{let[R,A]=w,x=a[t][R],N=d[t][R]?.(A,x);!N&&s&&cl(t,T),N===void 0&&Yp(T,"ANY"),f[t][R]=N});let O=a[t],L={...a[t],...k};Object.keys(k).every(w=>h[t][w]===!0)&&Object.entries(L).every(([w,R])=>{let A=c[t][w]==="ANY";if(hs(R)>1&&!A){Hp(t,C,T);return}return Zc(c[t][w],O[w],R)})&&!s||(a[t]=L,Ae(e,{...i,store:a,validationStatusObject:f}),o&&!s&&(Xo({callBackWatcher:y,prop:t,newValue:a[t],oldValue:O,validationValue:f[t],instanceId:e}),Sr({instanceId:e,prop:t}),b.forEach(w=>{Sr({instanceId:w,prop:t})})))},_r=({instanceId:e,prop:t,value:r,fireCallback:o=!0,clone:n=!1,useStrict:s=!0,action:i,initalizeStep:a=!1})=>{let c=re(e);if(!c)return;let{store:l,type:p}=c;if(!l)return;let d=We();if(!(t in l)){Dp(t,d);return}let f=n?em({value:l[t]}):l[t],h=i===bi?r(f):r,y=p[t]==="ANY";if(we.isObject(f)&&!y){jC({instanceId:e,prop:t,val:h,fireCallback:o,useStrict:s,initalizeStep:a});return}WC({instanceId:e,prop:t,val:h,fireCallback:o,useStrict:s,initalizeStep:a})},tm=({instanceId:e,prop:t,value:r})=>{let o=re(e);if(!o)return;let{store:n,callBackWatcher:s}=o,i=n[t];n[t]=r,Ae(e,{...o,store:n}),Xo({callBackWatcher:s,prop:t,newValue:r,oldValue:i,validationValue:!0,instanceId:e})},rm=({store:e,bindInstance:t})=>t.reduce((r,o)=>{let n=re(o);if(!n)return r;let{store:s}=n;return{...r,...s}},e),zC=e=>{let t=re(e);if(!t)return;let{computedPropsQueque:r,callBackComputed:o,store:n,bindInstance:s}=t,i=[...o??[]].filter(({keys:l})=>[...r].find(p=>l.includes(p))),a=rm({store:n,bindInstance:s}),c=i.map(({prop:l,keys:p,fn:d})=>{let f=Object.fromEntries(p.map(h=>[h,a[h]]));return{prop:l,value:d(f)}});Ae(e,{...t,computedPropsQueque:new Set,computedRunning:!1}),c.forEach(({prop:l,value:p})=>{_r({instanceId:e,prop:l,value:p,action:"SET"})})},Sr=({instanceId:e,prop:t})=>{let r=re(e);if(!r)return;let{callBackComputed:o,computedPropsQueque:n,computedRunning:s}=r;if(!(!o||o.size===0)&&(n.add(t),Ae(e,{...r,computedPropsQueque:n}),!s)){let i=re(e);if(!i)return;Ae(e,{...i,computedRunning:!0}),Bt(()=>zC(e))}},HC=({instanceId:e,prop:t,keys:r,fn:o})=>{let n=re(e);if(!n)return;let{callBackComputed:s}=n,i=[...s].reduce((a,{prop:c,keys:l})=>l.includes(t)&&r.includes(c)&&!a,!1);if(r.includes(t)||i){qp(r,We());return}s.add({prop:t,keys:r,fn:o}),Ae(e,{...n,callBackComputed:s})},UC=({instanceId:e,prop:t,keys:r,callback:o})=>{let n=re(e);if(!n)return;let{store:s,bindInstance:i}=n,a=rm({store:s,bindInstance:i}),c=Object.fromEntries(r.map(p=>{if(p in a)return[p,a[p]]}).filter(p=>p!==void 0)),l=o(c);_r({instanceId:e,prop:t,value:l,fireCallback:!1,clone:!1,action:"SET"})},om=({instanceId:e,prop:t,keys:r,callback:o})=>{let n=r.length===0?(ds(),o({}),el()):r;UC({instanceId:e,prop:t,keys:n,callback:o}),HC({instanceId:e,prop:t,keys:n,fn:o})};var nm=e=>{let{store:t}=e,r=Object.entries(t).reduce((o,n)=>{let[s,i]=n;return we.isObject(i)?{...o,[s]:{}}:o},{});return{...e,validationStatusObject:r}},sm=(e,t)=>{let{store:r}=t;Object.entries(r).forEach(o=>{let[n,s]=o;_r({instanceId:e,prop:n,value:s,fireCallback:!1,useStrict:!1,action:"SET",initalizeStep:!0})})};var GC=({state:e,prop:t,callback:r,wait:o})=>{let{store:n,callBackWatcher:s}=e,i=We();if(!n)return{state:void 0,unsubscribeId:""};if(!(t in n))return Jp(t,i),{state:void 0,unsubscribeId:""};let a=ke();return s.set(a,{fn:r,prop:t,wait:o}),{state:{...e,callBackWatcher:s},unsubscribeId:a}},qC=({instanceId:e,unsubscribeId:t})=>{let r=re(e);if(!r)return;let{callBackWatcher:o}=r;o&&(o.delete(t),Ae(e,{...r,callBackWatcher:o}))},im=({instanceId:e,prop:t,callback:r,wait:o})=>{let n=re(e);if(!n)return()=>{};let{state:s,unsubscribeId:i}=GC({state:n,prop:t,callback:r,wait:o});return s?(Ae(e,s),()=>{qC({instanceId:e,unsubscribeId:i})}):()=>{}},am=({instanceId:e,prop:t,callback:r,wait:o})=>{let n=re(e);if(!n)return()=>{};let{bindInstance:s,unsubscribeBindInstance:i}=n;if(!s||s.length===0)return im({instanceId:e,prop:t,callback:r,wait:o});let a=[e,...s].find(p=>{let d=re(p)?.store;return d&&t in d})??"",c=im({instanceId:a,prop:t,callback:r,wait:o}),l=re(e);return l?(Ae(e,{...l,unsubscribeBindInstance:[...i,c]}),()=>{c();let p=re(e);p&&Ae(e,{...p,unsubscribeBindInstance:i.filter(d=>d!==c)})}):()=>{}};var cm=e=>{let t=hs(e);return{callBackWatcher:new Map,callBackComputed:new Set,computedPropsQueque:new Set,validationStatusObject:{},dataDepth:t,computedRunning:!1,store:Zp({data:e,depth:t,logStyle:We()}),type:Qo({data:e,prop:"type",depth:t,logStyle:We(),fallback:Qc}),fnTransformation:Qo({data:e,prop:"transform",depth:t,logStyle:We(),fallback:r=>r}),fnValidate:Qo({data:e,prop:"validate",depth:t,logStyle:We(),fallback:()=>!0}),strict:Qo({data:e,prop:"strict",depth:t,logStyle:We(),fallback:!1}),skipEqual:Qo({data:e,prop:"skipEqual",depth:t,logStyle:We(),fallback:!0}),proxiObject:void 0,bindInstance:[],bindInstanceBy:[],unsubscribeBindInstance:[],proxiReadOnlyProp:new Set}};var lm=e=>{let t=re(e);if(!t)return{};let{store:r}=t;return r??{}},pm=e=>{let t=re(e);if(!t)return{};let{bindInstance:r}=t;return!r||r.length===0?lm(e):Object.fromEntries([...r,e].flatMap(o=>Object.entries(lm(o))))},um=({instanceId:e,prop:t})=>{let r=re(e);if(!r)return;let o=r?.store;if(o&&t in o)return o[t];Gp(t,We())},mm=({instanceId:e,prop:t})=>{let r=re(e);if(!r)return;let{bindInstance:o}=r;if(!o||o.length===0)return um({instanceId:e,prop:t});let n=[e,...o].find(s=>{let i=qe.get(s)?.store;return i&&t in i})??"";return um({instanceId:n,prop:t})};var dm=({instanceId:e,prop:t})=>{let r=re(e);if(!r)return;let{store:o,callBackWatcher:n,validationStatusObject:s,bindInstanceBy:i}=r;o&&(t in o?(Xo({callBackWatcher:n,prop:t,newValue:o[t],oldValue:o[t],validationValue:s[t],instanceId:e}),Sr({instanceId:e,prop:t}),i.forEach(a=>{Sr({instanceId:a,prop:t})})):al(t,We()))},_i=({instanceId:e,prop:t})=>{let r=re(e);if(!r)return;let{bindInstance:o}=r;if(!o||o.length===0){dm({instanceId:e,prop:t});return}let n=[e,...o].find(s=>{let i=qe.get(s)?.store;return i&&t in i})??"";dm({instanceId:n,prop:t})},hm=async({instanceId:e,prop:t})=>{let r=re(e);if(!r)return new Promise(a=>a(""));let{store:o,callBackWatcher:n,validationStatusObject:s,bindInstanceBy:i}=r;return o?t in o?(await $p({callBackWatcher:n,prop:t,newValue:o[t],oldValue:o[t],validationValue:s[t],instanceId:e}),Sr({instanceId:e,prop:t}),i.forEach(a=>{Sr({instanceId:a,prop:t})}),{success:!0}):(al(t,We()),{success:!1}):{success:!1}},fm=async({instanceId:e,prop:t})=>{let r=re(e);if(!r)return new Promise(s=>s(""));let{bindInstance:o}=r;if(!o||o.length===0)return hm({instanceId:e,prop:t});let n=[e,...o].find(s=>{let i=qe.get(s)?.store;return i&&t in i})??"";return hm({instanceId:n,prop:t})};var gm=({instanceId:e})=>{let t=re(e);if(!t)return;let{validationStatusObject:r}=t;return r},bm=({instanceId:e})=>{let t=re(e);if(!t)return;let{store:r}=t;console.log(r)},vm=({instanceId:e})=>{let t=re(e);if(!t)return;let{validationStatusObject:r}=t;console.log(r)},ym=({instanceId:e})=>{let t=re(e);console.log(t)};var Tm=({instanceId:e})=>{let t=We(),r=qe.get(e);if(!r)return{};let{bindInstance:o,proxiObject:n,proxiReadOnlyProp:s}=r;if(n)return n;let i=r?.store,a=new Proxy(i,{set(p,d,f){let h=Si()?qe.get(e)?.store??p:p;if(!h)return!1;if(d in h){let y=Zo({instanceId:e,prop:d}),b=s.has(d);return b&&Xp(d,t),y||b?!1:(_r({instanceId:e,prop:d,value:f,fireCallback:!0,clone:!1,action:"SET"}),!0)}return!1},get(p,d){let f=Si()?qe.get(e)?.store??p:p;return!f||!(d in f)?!1:(yi(d),f[d])}});if(!o||o.length===0)return Ae(e,{...r,proxiObject:a}),a;let c=o.map(p=>{let f=qe.get(p)?.store??{};return new Proxy(f,{set(){return!1},get(h,y){let b=Si()?qe.get(p)?.store??h:h;return!b||!(y in b)?!1:(yi(y),b[y])}})}),l=new Proxy([a,...c],{set(p,d,f){let h=p.find(y=>d in y);return h?(Reflect.set(h,d,f),!0):!1},get(p,d){let f=p.find(h=>d in h);return f?Reflect.get(f,d):!1}});return Ae(e,{...r,proxiObject:l}),l};var JC=({selfId:e,bindId:t})=>{let r=re(t);if(!r)return;let{bindInstanceBy:o}=r,n=[...o,e];Ae(t,{...r,bindInstanceBy:n})},Sm=({selfId:e,bindId:t})=>{let r=re(t);if(!r)return;let{bindInstanceBy:o}=r,n=o.filter(s=>s!==e);Ae(t,{...r,bindInstanceBy:n})},YC=({bindStores:e,selfStore:t})=>{let o=[...Fe(Array,e)?e.map(n=>n.get()):[e.get()],t.store];o.forEach((n,s)=>{o.forEach((i,a)=>{if(s<=a)return;let c=Object.keys(n).filter(l=>Object.keys(i).includes(l));c.length>0&&console.warn(`bindStore: prop conflict on following prop: '${c}', bind store key must be univoque'`)})})},_m=({value:e,instanceId:t})=>{let r=re(t);if(!r)return;YC({bindStores:e,selfStore:r});let{bindInstance:o}=r;if(!o)return;let n=Fe(Array,e)?e.map(i=>i.getId()):[e.getId()],s=[...o,...n];Ae(t,{...r,bindInstance:s}),n.forEach(i=>{JC({selfId:t,bindId:i})})};var xm=e=>{let t=qe.get(e);if(!t)return;t.callBackWatcher.clear(),t.callBackComputed.clear(),t.computedPropsQueque.clear(),t.store={},t.proxiObject=null;let{unsubscribeBindInstance:r,bindInstance:o}=t;r.forEach(n=>{n?.()}),o.forEach(n=>{Sm({selfId:e,bindId:n})}),Lp(e)};var Cm=({instanceId:e,values:t})=>{let r=re(e);if(!r)return;let{proxiReadOnlyProp:o}=r;t.forEach(n=>{o.add(n)}),Ae(e,r)};var xi=(e={})=>{let t=ke(),r=cm(e),o=nm(r);return Ae(t,o),sm(t,r),{getId:()=>t,bindStore:n=>{_m({value:n,instanceId:t})},get:()=>pm(t),getProp:n=>mm({instanceId:t,prop:n}),set:(n,s,{emit:i=!0,usePropAsString:a=!1}={})=>{let c=a?n:Wr(n);Zo({instanceId:t,prop:c})||_r({instanceId:t,prop:c,value:s,fireCallback:i??!0,clone:!1,action:"SET"})},update:(n,s,{emit:i=!0,clone:a=!1,usePropAsString:c=!1}={})=>{let l=c?n:Wr(n);Zo({instanceId:t,prop:l})||_r({instanceId:t,prop:l,value:s,fireCallback:i??!0,clone:a,action:bi})},getProxi:()=>Tm({instanceId:t}),quickSetProp:(n,s)=>{Zo({instanceId:t,prop:n})||tm({instanceId:t,prop:n,value:s})},watch:(n,s,{wait:i=!1,immediate:a=!1}={})=>{let c=Wr(n),l=am({instanceId:t,prop:c,callback:s,wait:i});return a&&Bt(()=>{_i({instanceId:t,prop:c})}),l},computed:(n,s,i=[],{usePropAsString:a=!1}={})=>{let c=a?n:Wr(n),l=rl(i);om({instanceId:t,prop:c,keys:l,callback:s}),Bt(()=>{_i({instanceId:t,prop:c})})},emit:n=>{let s=Wr(n);_i({instanceId:t,prop:s})},emitAsync:async n=>{let s=Wr(n);return fm({instanceId:t,prop:s})},setProxiReadOnlyProp:n=>{Cm({instanceId:t,values:n})},getValidation:()=>gm({instanceId:t}),debug:()=>{ym({instanceId:t})},debugStore:()=>{bm({instanceId:t})},debugValidate:()=>{vm({instanceId:t})},destroy:()=>{xm(t)}}};var Se=xi({usePassive:()=>({value:!1,type:Boolean}),currentFrame:()=>({value:0,type:Number}),instantFps:()=>({value:60,type:Number}),requestFrame:()=>({value:()=>{},type:Function}),deferredNextTick:()=>({value:!0,type:Boolean}),throttle:()=>({value:60,type:Number}),spinYMaxValue:()=>({value:2.5,type:Number}),spinXMaxValue:()=>({value:2.5,type:Number})});var ll=!1,fs=new Map;function Em(){if(fs.size===0){globalThis.removeEventListener("DOMContentLoaded",Em),ll=!1;return}for(let e of fs.values())e();fs.clear()}function XC(){ll||(ll=!0,globalThis.addEventListener("DOMContentLoaded",Em,{passive:!1}))}var KC=e=>{let t=ke();return fs.set(t,e),typeof globalThis<"u"&&XC(),()=>fs.delete(t)},wm=KC;function Ci(e){let t=0,r=0,o=0,n=0;return"detail"in e&&(r=e.detail),"wheelDelta"in e&&(r=-e.wheelDelta/120),"wheelDeltaY"in e&&(r=-e.wheelDeltaY/120),"wheelDeltaX"in e&&(t=-e.wheelDeltaX/120),"axis"in e&&e.axis===e.HORIZONTAL_AXIS&&(t=r,r=0),o=t*10,n=r*10,"deltaY"in e&&(n=e.deltaY),"deltaX"in e&&(o=e.deltaX),(o||n)&&e.deltaMode&&(e.deltaMode==1?(o*=40,n*=40):(o*=800,n*=800)),o&&!t&&(t=o<1?-1:1),n&&!r&&(r=n<1?-1:1),{spinX:t,spinY:r,pixelX:o,pixelY:n}}function QC({type:e,event:t}){let r=t;return e==="touchend"&&"changedTouches"in t?r.changedTouches[0]:"touches"in r?r.touches[0]:t}function ZC({type:e,event:t}){let r=t;return e==="touchend"&&"changedTouches"in t?r.changedTouches[0]:"touches"in r?r.touches[0]:t}function zr(e){let t=!1,r=new Map,{usePassive:o}=Se.get();Se.watch("usePassive",()=>{globalThis.removeEventListener(e,n),t=!1,s()});function n(a){if(r.size===0){globalThis.removeEventListener(e,n),t=!1;return}let c=a.type,{pageX:l,pageY:p}=QC({type:c,event:a}),{clientX:d,clientY:f}=ZC({type:c,event:a}),h=a.target,y={page:{x:l,y:p},client:{x:d,y:f},target:h,type:c,preventDefault:()=>o?()=>{}:a.preventDefault()};if(c==="wheel"){let b=Se.getProp("spinYMaxValue"),T=Se.getProp("spinXMaxValue"),{spinX:_,spinY:S,pixelX:E,pixelY:C}=Ci(a);Object.assign(y,{spinX:Kc(_,-T,T),spinY:Kc(S,-b,b),pixelX:E,pixelY:C})}for(let b of r.values())b(y)}function s(){t||(t=!0,o=Se.getProp("usePassive"),globalThis.addEventListener(e,n,{passive:o}))}return a=>{let c=ke();return r.set(c,a),typeof globalThis<"u"&&s(),()=>r.delete(c)}}var Im=zr("click"),Mm=zr("mousedown"),km=zr("touchstart"),Rm=zr("mousemove"),Nm=zr("touchmove"),Pm=zr("mouseup"),Am=zr("touchend"),Om=zr("wheel");var Eo=0,Qe=new Map,eE=(e={},t=()=>{})=>{let r=ke();return Qe.set(r,{el:e,fn:t,data:new Map,freeze:{active:!1,atFrame:0}}),{id:r,unsubscribe:()=>{if(Qe.has(r)){let o=Qe.get(r);if(!o)return;let n=o.data.size;if(Qe.delete(r),!n)return;Eo=Eo-n}}}},tE=({id:e,callBackObject:t,frame:r})=>{if(!Qe.has(e))return;let{currentFrame:o}=Se.get(),n=Qe.get(e);if(!n?.data)return;let{data:s}=n;s.has(r+o)||(s.set(r+o,t),Eo++)},rE=e=>{Qe.has(e)&&Qe.delete(e)},oE=e=>{let t=Qe.get(e);if(!t||t.freeze.active)return;let{currentFrame:r}=Se.get();t.freeze={active:!0,atFrame:r}},nE=({id:e,update:t=!0})=>{let r=Qe.get(e);if(!r||!r.freeze.active)return;if(!t){r.freeze={active:!1,atFrame:0};return}let{currentFrame:o}=Se.get(),{atFrame:n}=r.freeze,s=[];for(let[i,a]of r.data){let c=i+o-n;r.data.delete(i),s.push({frame:c,value:a})}s.forEach(({frame:i,value:a})=>{r.data.set(i,a)}),s.length=0,r.freeze={active:!1,atFrame:0}},sE=e=>{let t=Qe.get(e);if(!t)return;let r=t.data.size;Eo=Eo-r,t.data.clear()},iE=e=>Qe.get(e)??{},aE=e=>{for(let t of Qe.values()){let{data:r,fn:o,el:n,freeze:s}=t,i=r.get(e);i&&!s.active&&(o(i,n),r.delete(e),Eo--)}},cE=({id:e,obj:t={}})=>{if(!Qe.has(e))return;let r=Qe.get(e);if(!r)return;let{el:o,fn:n,freeze:s}=r;s.active||n(t,o)},lE=()=>Eo,uE=e=>{for(let[t,r]of Qe){let{data:o,fn:n,el:s,freeze:i}=r,a=new Map;for(let[c,l]of o)a.set(c-e,l),o.delete(c);Qe.set(t,{data:a,fn:n,el:s,freeze:i})}},en={add:eE,get:iE,update:tE,remove:rE,clean:sE,fire:aE,fireObject:cE,getCacheCounter:lE,updateFrameId:uE,freeze:oE,unFreeze:nE};var ul=!1,Ei=new Map;function $m(){if(Ei.size===0){globalThis.removeEventListener("visibilitychange",$m),ul=!1;return}let e={visibilityState:document.visibilityState};for(let t of Ei.values())t(e)}function pE(){ul||(ul=!0,globalThis.addEventListener("visibilitychange",$m,{passive:!1}))}var mE=e=>{let t=ke();return Ei.set(t,e),typeof globalThis<"u"&&pE(),()=>Ei.delete(t)},wi=mE;var gs=[],dE=(e=()=>{},t=100)=>{gs.push({cb:e,priority:t})},hE=({time:e,fps:t})=>{gs.length!==0&&(gs.sort((r,o)=>r.priority-o.priority),gs.forEach(({cb:r})=>r({time:e,fps:t})),gs.length=0)},Mt={add:dE,fire:hE};var pl=[],fE=e=>{pl.push(e)},gE=()=>{let e=[...pl];return pl.length=0,e},tn={add:fE,get:gE};var Hr=new Map,bE=e=>{let t=[...Hr.entries()];Hr.clear(),t.forEach(([r,o])=>{Hr.set(r-e,o)})},vE=({currentFrame:e,time:t,fps:r})=>{let o=Hr.get(e)??[];!o||o.length===0||(o.forEach(n=>n({time:t,fps:r})),Hr.delete(e))},yE=(e,t)=>{let r=t+Se.getProp("currentFrame"),o=Hr.get(r)??[];Hr.set(r,[...o,e]),Se.emit("requestFrame")},TE=()=>Hr.size,rn={add:yE,fire:vE,updateKeys:bE,getAmountOfFrameToFire:TE};var ml="animationStop",Lm=()=>{globalThis.addEventListener("unhandledrejection",e=>{e.reason===ml&&e.preventDefault()})};var Dm=!1,Ii=({force:e=!1,duration:t=30}={})=>{if(Dm&&!e){let{instantFps:r}=Se.get();return new Promise(o=>{o({averageFPS:r})})}return new Promise(r=>{let o=[],s=0,i=0,a=0,c=0,l=0,p=d=>{if(d*=.001,c===0){c=d,requestAnimationFrame(p);return}let f=d-c;c=d;let h=Number.isFinite(1/f)?1/f:60,y=Math.max(h,60);a+=y-(o[s]||0),o[s++]=y,i=Math.max(i,s),s%=25;let b=Math.round(a/i);if(l++,l>=t){Se.quickSetProp("instantFps",b),Dm=!0,r({averageFPS:b});return}requestAnimationFrame(p)};requestAnimationFrame(p)})};Ii();var dl=1e7,Wm=2e3,bl=!1,Ur=[],Ze=Kt(),Fm=0,hl=0,fl=0,vl=0,gl=0,on=!1,nt=60,Pi=nt,Mi=0,ki=0,xr=0,Ri=!1,Ni=!1,SE=()=>nt<Pi/5*3,_E=()=>nt<Pi/5*4,xE=()=>{!SE()||Ri||(Ri=!0,setTimeout(()=>{Ri=!1},4e3))},CE=()=>{!_E()||Ni||(Ni=!0,setTimeout(()=>{Ni=!1},4e3))};wi(({visibilityState:e})=>{on=e==="visible"});Lm();Se.watch("requestFrame",()=>{Ai()});var Bm=()=>{xr===dl&&(xr=0,Se.quickSetProp("currentFrame",xr),rn.updateKeys(dl),en.updateFrameId(dl)),Mt.fire({time:Ze,fps:nt}),Ur=[...Ur,...tn.get()],bl=!1,Ur.length>0||rn.getAmountOfFrameToFire()>0||en.getCacheCounter()>0||Ze<Wm?Ai():(on=!0,xr=0,vl=Ze,Se.quickSetProp("currentFrame",xr))},Vm=e=>{Ze=e,fl=Ze-hl,on&&(Fm+=fl),hl+=fl,Ze=Math.round(hl-Fm);let t=Math.round(1e3/nt);gl=Math.abs(Ze-vl-t);let r=gl>100?gl:0;Ze=Ze-r,vl=Ze,on?(ki=Ze,Mi=0,nt=Se.getProp("instantFps")):Mi++,Ze>ki+1e3&&!on&&(nt=Ze>Wm?Math.round(Mi*1e3/(Ze-ki)):Se.getProp("instantFps"),ki=Ze,Mi=0,nt=nt<30?Se.getProp("instantFps"):nt),nt>Pi&&(Pi=nt),xE(),CE(),Ur.forEach(n=>n({time:Ze,fps:nt})),rn.fire({currentFrame:xr,time:Ze,fps:nt}),en.fire(xr),xr++,Se.quickSetProp("currentFrame",xr),Ur.length=0,on=!1,Se.getProp("deferredNextTick")?Bt(()=>Bm()):Bm()},Ai=()=>{bl||(typeof globalThis>"u"?setTimeout(()=>Vm(Kt()),Cp):requestAnimationFrame(Vm),bl=!0)},Vt={add:s=>{Ur.push(s),Ai()},addMultiple:(s=[])=>{Ur=[...Ur,...s],Ai()},getFps:()=>nt,mustMakeSomething:()=>Ri,shouldMakeSomething:()=>Ni};var yl=!1,Oi=new Map,Tl=()=>{},jm=window.innerHeight,zm=window.innerWidth;function EE(){if(Oi.size===0){window.removeEventListener("resize",Tl),yl=!1;return}let e=window.innerHeight,t=window.innerWidth,r=e!==jm,o=t!==zm;jm=e,zm=t;let n={scrollY:window.scrollY,windowsHeight:e,windowsWidth:t,documentHeight:document.documentElement.scrollHeight,verticalResize:r,horizontalResize:o};for(let s of Oi.values())s(n)}function wE(){yl||(yl=!0,Tl=xo(()=>EE()),window.addEventListener("resize",Tl,{passive:!1}))}var IE=e=>{let t=ke();return Oi.set(t,e),typeof globalThis<"u"&&wE(),()=>Oi.delete(t)},Hm=IE;var Sl=!1,$i=new Map,ME="UP",qm="DOWN",Um=window.scrollY,bs=window.scrollY,_l=qm,Gm={scrollY:bs,direction:_l};function Jm(){if($i.size===0){window.removeEventListener("scroll",Jm),Sl=!1;return}Um=bs,bs=window.scrollY,_l=bs>Um?qm:ME,Gm={scrollY:bs,direction:_l};for(let e of $i.values())e(Gm)}function kE(){Sl||(Sl=!0,window.addEventListener("scroll",Jm,{passive:!0}))}var RE=e=>{let t=ke();return $i.set(t,e),typeof globalThis<"u"&&kE(),()=>$i.delete(t)},Cr=RE;var xl=!1,Li=new Map,Ym=()=>{};function NE(e){if(Li.size===0){Ym(),xl=!1;return}Vt.add(()=>{Mt.add(()=>{for(let t of Li.values())t(e)},0)})}function PE(){xl||(xl=!0,Ym=Cr(NE))}var AE=e=>{let t=ke();return Li.set(t,e),typeof globalThis<"u"&&PE(),()=>Li.delete(t)},Xm=AE;var Cl=!1,Di=new Map,Km,Qm=()=>{};function OE(e){if(Di.size===0){Qm(),Cl=!1;return}Vt.add(()=>{Mt.add(()=>{for(let t of Di.values())t(e)},0)})}function $E(){Cl||(Cl=!0,Km=hi(e=>OE(e),Se.getProp("throttle")),Qm=Cr(Km))}var LE=e=>{let t=ke();return Di.set(t,e),typeof globalThis<"u"&&$E(),()=>Di.delete(t)},Zm=LE;var ed=()=>{},td=()=>{},rd=()=>{};function od(e){let t=!1,r=new Map,o=!1;function n(){if(o=!1,r.size===0){td(),e==="START"&&ed(),t=!1;return}Vt.add(()=>{Mt.add(()=>{let a={scrollY:window.scrollY};if(e==="END")for(let c of r.values())c(a)},0)})}function s(){t||(t=!0,rd=xo(()=>n()),td=Cr(rd),e==="START"&&(ed=Cr(({scrollY:a})=>{let c={scrollY:a};if(!o){o=!0;for(let l of r.values())l(c)}})))}return a=>{let c=ke();return r.set(c,a),typeof globalThis<"u"&&s(),()=>r.delete(c)}}var nd=od("START"),sd=od("END");function nn(e){let t=!1,r=new Map;function o(i){if(r.size===0){globalThis.removeEventListener(e,o),t=!1;return}for(let a of r.values())a(i)}function n(){t||(t=!0,globalThis.addEventListener(e,o))}return i=>{let a=ke();return r.set(a,i),typeof globalThis<"u"&&n(),()=>r.delete(a)}}var id=nn("pointerover"),ad=nn("pointerdown"),cd=nn("pointermove"),ld=nn("pointerup"),ud=nn("pointerout"),pd=nn("pointerleave");var je=Symbol("LinkedList.setNext"),ze=Symbol("LinkedList.setPrev"),Fi="after",El="before",sn=class{#n=null;#t=null;constructor(t){this.data=t}get next(){return this.#n}[je](t){this.#n=t}get prev(){return this.#t}[ze](t){this.#t=t}dispose(){this.data=null,this.#n=null,this.#t=null}},an=class e{#n=null;#t=null;#i=0;#l=new WeakSet;addLast(t){let r=new sn(t);return this.#l.add(r),this.#n?(this.#t&&this.#t[je](r),r[ze](this.#t),this.#t=r,this.#i++,this):(this.#n=r,this.#t=r,this.#i++,this)}addFirst(t){let r=new sn(t);return this.#l.add(r),this.#n?(r[je](this.#n),this.#n[ze](r),this.#n=r,this.#i++,this):(this.#n=r,this.#t=r,this.#i++,this)}removeNode(t){return!t||!this.#l.has(t)?this:t===this.#n?this.removeFirst():t===this.#t?this.removeLast():(t.prev&&t.prev[je](t.next),t.next&&t.next[ze](t.prev),t.dispose(),this.#i--,this)}removeFirst(){if(this.#n===null)return this;let t=this.#n;return this.#n=this.#n.next,this.#n&&this.#n[ze](null),this.#n===null&&(this.#t=null),t.dispose(),this.#i--,this}removeLast(){if(this.#t===null)return this;let t=this.#t;return this.#t=this.#t.prev,this.#t&&this.#t[je](null),this.#t===null&&(this.#n=null),t.dispose(),this.#i--,this}insertAfter(t,r){if(!t||!this.#l.has(t))return this;let o=new sn(r);return this.#l.add(o),o[ze](t),o[je](t.next),t.next&&t.next[ze](o),t[je](o),t===this.#t&&(this.#t=o),this.#i++,this}insertBefore(t,r){if(!t||!this.#l.has(t))return this;let o=new sn(r);return this.#l.add(o),o[je](t),o[ze](t.prev),t.prev&&t.prev[je](o),t[ze](o),t===this.#n&&(this.#n=o),this.#i++,this}move(t,r,o=Fi){return!this.#l.has(t)||!this.#l.has(r)?this:t===r?this:o===Fi&&r.next===t?this:o===El&&r.prev===t?this:(t.prev&&t.prev[je](t.next),t.next&&t.next[ze](t.prev),t===this.#n&&(this.#n=t.next),t===this.#t&&(this.#t=t.prev),o==Fi&&(t[ze](r),t[je](r.next),r.next&&r.next[ze](t),r[je](t),r===this.#t&&(this.#t=t)),o==El&&(t[ze](r.prev),t[je](r),r.prev&&r.prev[je](t),r[ze](t),r===this.#n&&(this.#n=t)),this)}moveAfter(t,r){return this.move(t,r,Fi)}moveBefore(t,r){return this.move(t,r,El)}swap(t,r){if(!this.#l.has(t)||!this.#l.has(r))return this;if(t===r)return this;if(t.next===r)return this.moveAfter(t,r);if(r.next===t)return this.moveAfter(r,t);let o=t.prev,n=t.next,s=r.prev,i=r.next,a=t===this.#n,c=t===this.#t,l=r===this.#n,p=r===this.#t;return o&&o[je](n),n&&n[ze](o),s&&s[je](i),i&&i[ze](s),t[ze](s),t[je](i),r[ze](o),r[je](n),s&&s[je](t),i&&i[ze](t),o&&o[je](r),n&&n[ze](r),a?this.#n=r:l&&(this.#n=t),c?this.#t=r:p&&(this.#t=t),this}find(t){let r=this.#n,o;for(;r!==null;){if(t(r)){o=r;break}r=r.next}return o}filter(t){let r=this.#n,o=new e,n=0;for(;r!==null;)t(r,n)&&o.addLast(r.data),r=r.next,n++;return o}map(t){let r=this.#n,o=new e,n=0;for(;r!==null;)o.addLast(t(r,n)),r=r.next,n++;return o}*[Symbol.iterator](){let t=this.#n;for(;t;)yield t,t=t.next}traverse(t){let r=this.#n;for(;r!==null;)t(r),r=r.next;return this}async traverseAsync(t){let r=this.#n;for(;r!==null;)await t(r),r=r.next;return this}traverseReverse(t){let r=this.#t;for(;r!==null;)t(r),r=r.prev;return this}async traverseReverseAsync(t){let r=this.#t;for(;r!==null;)await t(r),r=r.prev;return this}execute(t){return t(this),this}async executeAsync(t){return await t(this),this}print(){let t=this.#n,r=[];for(;t!==null;)r.push(t.data),t=t.next;return console.log(r),this}clear(){let t=this.#n,r=[];for(;t!==null;)r.push(t),t=t.next;for(let o of r)o.dispose();return this.#n=null,this.#t=null,this.#i=0,r.length=0,this}reverse(){let t=this.#n;for(this.#n=this.#t,this.#t=t;t!==null;){let r=t.next,o=t.prev;t[je](o),t[ze](r),t=r}return this}toArray(){let t=[],r=this.#n;for(;r!==null;)t.push(r.data),r=r.next;return t}toArrayReverse(){let t=[],r=this.#t;for(;r!==null;)t.push(r.data),r=r.prev;return t}get first(){return this.#n}get last(){return this.#t}get size(){return this.#i}};function DE(e){return xi(e)}function FE(){return Se.getProp("instantFps")}function BE(){return Vt.getFps()}function VE(){return Vt.mustMakeSomething()}function WE(){return Vt.shouldMakeSomething()}function jE(e=()=>{}){return Vt.add(e)}function zE(e=()=>{}){return Mt.add(e)}function HE(e=()=>{}){return tn.add(e)}function UE(e=()=>{},t=0){return rn.add(e,t)}async function GE({force:e=!1,duration:t=30}={}){return await Ii({force:e,duration:t})}function qE(e=()=>{}){return wm(e)}var JE=en;function YE(e=()=>{}){return Hm(e)}function XE(e=()=>{}){return wi(e)}function KE(e=()=>{}){return Im(e)}function QE(e=()=>{}){return Mm(e)}function ZE(e=()=>{}){return km(e)}function ew(e=()=>{}){return Rm(e)}function tw(e=()=>{}){return Nm(e)}function rw(e=()=>{}){return Pm(e)}function ow(e=()=>{}){return Am(e)}function nw(e=()=>{}){return Om(e)}function sw(e=()=>{}){return Xm(e)}function iw(e=()=>{}){return Cr(e)}function aw(e=()=>{}){return Zm(e)}function cw(e=()=>{}){return nd(e)}function lw(e=()=>{}){return sd(e)}function uw(e=()=>{}){return id(e)}function pw(e=()=>{}){return ad(e)}function mw(e=()=>{}){return cd(e)}function dw(e=()=>{}){return ld(e)}function hw(e=()=>{}){return ud(e)}function fw(e=()=>{}){return pd(e)}var gw=Se;function bw(){return new an}var m={};_o(m,{afterRouteChange:()=>gd,beforeRouteChange:()=>fd,componentMap:()=>j,createComponent:()=>ef,eventDelegationMap:()=>Oo,getActiveParams:()=>yd,getActiveRoute:()=>vd,getChildrenIdByName:()=>Gi,getComponentNameById:()=>jd,getDebugMode:()=>Zh,getIdByInstanceName:()=>nr,getNumberOfActiveInvalidate:()=>tb,getNumberOfActiveRepeater:()=>rb,getParentIdById:()=>Ss,getPropsFromParent:()=>Sa,getRoot:()=>ha,getStateById:()=>ir,getStateByName:()=>dh,getTree:()=>Gd,inizializeApp:()=>eb,loadUrl:()=>Zg,mainStore:()=>he,onRouteLoading:()=>bd,removeAndDestroyById:()=>it,setStateById:()=>Sn,setStateByName:()=>Yh,staticProps:()=>_a,tempDelegateEventMap:()=>ws,tick:()=>Ir,updateStateByName:()=>Kh,useComponent:()=>na,useMethodArrayByName:()=>Yd,useMethodByName:()=>fn,watchById:()=>kt});var cn="activeRoute",ln="activeParams",wo="beforeRouteChange",un="afterRouteChange",Qt="routeIsLoading",mt="parserAsync",Gr="default",md="repeater",dd="invalidate",hd="render_component";var he=u.createStore({[cn]:()=>({value:{route:"",templateName:""},type:"any",skipEqual:!1}),[ln]:()=>({value:{},type:"any",skipEqual:!1}),[wo]:()=>({value:{currentRoute:"",currentTemplate:"",nextRoute:"",nextTemplate:""},type:"any",skipEqual:!1}),[un]:()=>({value:{currentRoute:"",currentTemplate:"",previousRoute:"",previousTemplate:""},type:"any",skipEqual:!1}),[Qt]:()=>({value:!1,type:Boolean}),[mt]:{element:()=>({value:document.createElement("div"),type:HTMLElement,skipEqual:!1}),parentId:()=>({value:"",type:String,skipEqual:!1}),persistent:()=>({value:!1,type:Boolean,skipEqual:!1}),source:()=>({value:Gr,type:String,skipEqual:!1})}}),pn=()=>{he.set(mt,{element:document.createElement("div"),parentId:"",persistent:!1,source:Gr},{emit:!1})};var fd=e=>he.watch(wo,({currentRoute:t,currentTemplate:r,nextRoute:o,nextTemplate:n})=>{e({currentRoute:t,currentTemplate:r,nextRoute:o,nextTemplate:n})}),gd=e=>he.watch(un,({currentRoute:t,currentTemplate:r,previousRoute:o,previousTemplate:n})=>{e({currentRoute:t,currentTemplate:r,previousRoute:o,previousTemplate:n})}),bd=e=>he.watch(Qt,t=>{e(t)}),vd=()=>{let{activeRoute:e}=he.get();return e},yd=()=>{let{activeParams:e}=he.get();return e};var j=new Map;var G=new Map;var Td=({componentId:e,repeatId:t})=>{let r=G.get(t);if(!r)return;let{componentChildren:o}=r;G.set(t,{...r,componentChildren:[...o,e]})},Sd=({componentId:e,repeatId:t})=>{let r=G.get(t);if(!r)return;let{componentChildren:o}=r;G.set(t,{...r,componentChildren:o.filter(n=>n!==e)})},wl=({repeatId:e})=>{let t=G.get(e);if(!t)return[];let{componentChildren:r}=t;return r},_d=({repeatId:e})=>{let t=G.get(e);if(!t)return!1;let{componentChildren:r}=t;return r.length>0};var xd=new WeakMap,Cd=({element:e,id:t})=>{xd.set(e,t)},mn=({element:e})=>xd.get(e);var Ed=({id:e="",newElement:t=document.createElement("div")})=>{if(!e||e==="")return;let r=j.get(e);r&&(j.set(e,{...r,element:t}),Cd({element:t,id:e}))},vs=({id:e=""})=>!e||e===""?void 0:j.get(e)?.element,wd=({element:e})=>e?mn({element:e}):"",Il=({keyValue:e="",repeatId:t=""})=>e?.length===0?[]:wl({repeatId:t}).map(n=>j.get(n)).filter(n=>n!==void 0).filter(n=>`${n.key}`==`${e}`).map(({element:n,id:s})=>({element:n,id:s})),Ml=({id:e,repeatId:t})=>!e||e===""?[]:wl({repeatId:t}).map(o=>j.get(o)).filter(o=>o!==void 0).map(o=>o.id);var Id="data-mobjs",Io="componentid",Bi="bindtextid",Vi="bindobjectid";var dn="staticprops",Wi="bindprops",Md="name",kd="name",Rd="slot",Wt="repeaterchild";var Zt="currentRepeaterValue",er="repeatPropBind",ji="bindevents",tr="weakbindevents",hn="bindeffect",Nd="parentid";var rr="bindrefid",Er="bindrefname",zi="invalidateid",Hi="mobjsrepeat";var or={current:{},index:-1},Pd="QUEQUE_BINDPROPS",kl="QUEQUE_REPEATER",Rl="QUEQUE_INVALIDATE";var qr=new Map;var ys=({id:e})=>{if(!G.has(e))return;if(qr.has(e)){let r=qr.get(e);r?.removeCustomComponent(),r?.remove(),qr.delete(e)}return G.get(e)?.element};var Ui=({id:e="",value:t})=>{if(!e||e==="")return;let r=j.get(e);r&&j.set(e,{...r,currentRepeaterState:t})},Ad=({rootNode:e,currentNode:t})=>{if(!(!t||!e.contains(t)))return t.parentElement===e?t:Ad({rootNode:e,currentNode:t.parentElement})},vw=({rootNode:e,node:t})=>{if(e)return Ad({rootNode:e,currentNode:t.parentElement})},jt=({id:e=""})=>{if(!e||e==="")return or;let r=j.get(e)?.currentRepeaterState;return r||or};var Od=({id:e="",repeatId:t="",element:r})=>{if(!e||e==="")return;let o=j.get(e);if(!o)return;let n=ys({id:t}),s=vw({rootNode:n,node:r});j.set(e,{...o,repeaterInnerWrap:s})},Ts=({id:e})=>!e||e===""?void 0:j.get(e)?.repeaterInnerWrap;var Gi=({id:e="",componentName:t=""})=>{if(!e||e==="")return[];let o=j.get(e)?.child;return o?o?.[t]??[]:(console.warn("getChildIdById failed no id found"),[])};var $d=({children:e,key:t,current:r,currentUnivoque:o,useIndex:n=!1})=>{let s=n?r:o,i=e.map(l=>{let{index:p,current:d}=jt({id:l?.[0]});return{index:p,key:d?.[t],items:l}});return s.map((l,p)=>({index:p,key:l?.[t]})).map(l=>{let p=n?"index":"key";return i.find(d=>d[p]===l[p])}).filter(l=>l!==void 0).map(({items:l})=>l)};var Ld="",Dd,Fd=({contentId:e=""})=>{Ld=e};var Bd=()=>{Dd=document?.querySelector(Ld)},qi=()=>Dd;var Jr=new Map,Vd=({instanceName:e,id:t})=>{let r=Jr.get(e)??[];Jr.set(e,[...r,t])},Wd=({instanceName:e,id:t})=>{let r=Jr.get(e);if(!r)return;let o=r.filter(n=>n!==t);o.length===0&&Jr.delete(e),o.length>0&&Jr.set(e,o)},Nl=({instanceName:e})=>Jr.get(e)??[];var jd=(e="")=>{if(!e||e==="")return;let r=j.get(e)?.componentName;return r||(console.warn("getComponentNameById failed no id found"),null)},zd=e=>{if(!e)return"name-not-found";let t=mn({element:e})??"",r=j.get(t);return r?r.componentName:"name-not-found"},nr=(e="")=>e?Nl({instanceName:e})?.[0]:void 0,Hd=(e="")=>e?Nl({instanceName:e})??[]:[];var Ji=(e="")=>{if(!e||e==="")return!1;let r=j.get(e)?.element;return r?!qi()?.contains(r):!1};var Ud=({chunk:e})=>e.reduce((t,r)=>{let[o,n]=r,{child:s,componentName:i,instanceName:a}=n,c=new Set(Object.values(s??{}).flat()),l=[];for(let p of j.entries()){let[d]=p;c.has(d)&&l.push(p)}return[...t,{id:o,componentName:i,instanceName:a,children:Ud({chunk:l})}]},[]),Gd=()=>{let e=[...j.entries()].filter(([,t])=>!t?.parentId||t?.parentId==="");return Ud({chunk:e})};var qd=({id:e,name:t,fn:r})=>{if(!e||e==="")return;let o=j.get(e),n=o?.methods;if(n){if(t in n){console.warn(`Method ${t}, is already used by ${e}`);return}j.set(e,{...o,methods:{...n,[t]:r}})}},Jd=({id:e})=>{if(!e||e==="")return{};let r=j.get(e)?.methods;return r?Object.keys(r).length===0?(console.warn(`no methods available for ${e} component`),{}):r:{}},fn=e=>{let t=nr(e);if(!t||t==="")return;let r=Jd({id:t});if(Object.keys(r).length===0){console.warn(`no methods available for ${e} component`);return}return r},Yd=e=>Hd(e).map(r=>Jd({id:r})).filter(r=>Object.keys(r).length>0);function*sr(e){if(e){yield e;for(let t of e.children)yield*sr(t)}}function yw(e,t){let r=[];for(let o of sr(e)){if(r.length>0&&t)break;o?.getIsPlaceholder?.()&&r.push(o)}return r}var Yr=(e,t=!0)=>{let r=[],o=e||document.body;for(let n of o.children)r=[...r,...yw(n,t)];return r};var Mo=new Set,Xd=!1,Kd=e=>{Mo.add(e)},Qd=e=>{Mo.delete(e)},Zd=e=>{let t;for(let r of Mo)if(e?.contains(r)&&r.getIsPlaceholder()){t=r;break}return t?(Mo.delete(t),[t]):[]},eh=({element:e})=>[...Mo].filter(t=>e.contains(t)&&e!==t&&t.getIsPlaceholder?.())??[],th=({element:e})=>[...Mo].filter(t=>e.contains(t)&&e!==t&&t.getIsPlaceholder?.()&&t?.getSlotPosition?.())??[],rh=()=>Mo.size;var st=e=>{Xd=e},zt=()=>Xd;var oh=({currentChild:e,id:t="",componentName:r=""})=>{let o=e?.[r]??[];return e[r]=[...o,t],e},nh=({currentChild:e,id:t="",componentName:r=""})=>{let o=e?.[r]??[];return e[r]=o.filter(n=>t!==n),e},sh=({props:e,store:t})=>{Object.entries(e).forEach(([r,o])=>{t.set(r,o)})},Yi=({prop:e,componentName:t,action:r})=>{console.warn(`Props: ${e}, component: ${t}, action: ${r}: Props can only be modified from outside the component."`)};var Ss=(e="")=>{if(!e||e==="")return;let r=j.get(e)?.parentId;if(r)return r},ih=({id:e=""})=>{if(!e||e==="")return;let t=j.get(e),r=t?.parentId,o=t?.componentName??"";if(!r)return;let n=j.get(r);if(!n)return;let{child:s}=n;s&&j.set(r,{...n,child:{...s,...oh({currentChild:s,id:e,componentName:o})}})},ah=({element:e,id:t})=>{if(!e)return;if(!0){Yr(e,!1).forEach(n=>{n.setParentId(t)});return}eh({element:e}).forEach(o=>{o.setParentId(t)})},gn=({element:e})=>{if(!e)return;let t=e.parentNode,r;for(;t&&!r;)r=mn({element:t}),r||(t=t.parentNode);return r??""},Pl=({moduleScopeId:e,targetComponentId:t})=>{if(e===t)return!0;let r=j.get(e);if(!r)return!1;let o=r?.parentId??"";return Pl({moduleScopeId:o,targetComponentId:t})};var Ct=new Map,_s=new Map;var ch=({componentId:e})=>{if(e)for(let[t,r]of Ct){let{componentId:o}=r;o===e&&Ct.delete(t)}};var et=new Map;var ye=new Map;var lh=({id:e})=>{if(et.has(e)){let t=et.get(e);if(!t)return;t.forEach(({invalidateId:r})=>{ye.has(r)&&ye.delete(r)}),et.delete(e)}};var tt=new Map;var uh=({id:e})=>{if(tt.has(e)){let t=tt.get(e);if(!t)return;t.forEach(({repeatId:r})=>{G.has(r)&&G.delete(r)}),tt.delete(e)}};var ph=({id:e,parentId:t,componentName:r})=>{if(!e)return;let o=j.get(t??"");if(!o)return;let{child:n}=o;!t||!n||j.set(t,{...o,child:{...n,...nh({currentChild:n,id:e,componentName:r})}})};var bn=new Set;var mh=e=>{bn.delete(e)};var it=({id:e=""})=>{if(!e||e==="")return;let t=j.get(e);if(!t)return;let{parentId:r,componentName:o,child:n,element:s,state:i,destroy:a,parentPropsWatcher:c,componentRepeatId:l,instanceName:p,persistent:d}=t;Object.values(n??{}).flat().forEach(f=>{it({id:f})}),ph({id:e,parentId:r,componentName:o}),a?.(),i.destroy(),c&&c.forEach(f=>f()),lh({id:e}),uh({id:e}),l&&l.length>0&&Sd({componentId:e,repeatId:l}),p&&p.length>0&&Wd({instanceName:p,id:e}),d||mh(e),ch({componentId:e}),s?.removeCustomComponent?.(),s?.remove(),t.methods=null,t.refs=null,t.repeaterInnerWrap=null,t.element=null,t.currentRepeaterState=null,t.state=null,j.delete(e)};var ir=(e="")=>!e||e===""?void 0:j.get(e)?.state?.get();var dh=(e="")=>{let t=nr(e);return t||console.warn(`component ${e}, not found`),ir(t)};var vn=({id:e="",prop:t})=>{if(!e||e==="")return;let r=j.get(e);if(!r)return;let{freezedPros:o}=r;o&&j.set(e,{...r,freezedPros:[...new Set([...o,t])]})},Xr=({id:e="",prop:t})=>{if(!e||e==="")return;let r=j.get(e);if(!r)return;let{freezedPros:o}=r;o&&j.set(e,{...r,freezedPros:o.filter(n=>n!==t)})},ko=({id:e="",prop:t})=>{if(!e||e==="")return!1;let o=j.get(e)?.freezedPros;return o?o.includes(t):!1};var hh=({repeatId:e,host:t})=>{let r=G.get(e);if(!r)return;let o=t.parentNode;r.initialRenderWithoutSync.forEach(n=>{o.append(n)}),G.set(e,{...r,element:o,initialRenderWithoutSync:[]}),qr.set(e,t)};var fh=()=>{customElements.define("mobjs-repeat",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){if(zt())return;let{dataset:t}=this.shadowRoot?.host??{};if(t){let r=this.shadowRoot?.host,o=r?.getAttribute(Hi)??"";hh({repeatId:o,host:r})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var Kr=new Map;var gh=({invalidateId:e,host:t})=>{let r=ye.get(e);if(!r)return;let o=t.parentNode;ye.set(e,{...r,element:o}),Kr.set(e,t)};var bh=()=>{customElements.define("mobjs-invalidate",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:e}=this.shadowRoot?.host??{};if(e){let t=this.shadowRoot?.host,r=t.getAttribute(zi)??"";gh({invalidateId:r,host:t})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var Qr=new Set,vh=e=>{Qr.add(e)},yh=()=>{Qr.clear()},Th=({element:e})=>[...Qr].find(t=>{let r=!t?.getSlotName?.()&&e.contains(t);return r&&Qr.delete(t),r}),Sh=({name:e,element:t})=>[...Qr].find(r=>{let o=r?.getSlotName?.()===e&&t.contains(r);return o&&Qr.delete(r),o}),_h=()=>[...Qr],Xi=()=>Qr.size;var xh=()=>{customElements.define("mobjs-slot",class extends HTMLElement{#n;constructor(){super(),this.attachShadow({mode:"open"}),this.#n="",this.isSlot=!0;let{dataset:e}=this.shadowRoot?.host??{};e&&(this.#n=this.shadowRoot?.host.getAttribute(kd))}connectedCallback(){let e=this.shadowRoot?.host;e&&vh(e)}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}getSlotName(){return this.#n}})};var Al=new Set,Ch=e=>{Al.add(e)},Ki=()=>[...Al],Qi=e=>Al.delete(e);var Eh=e=>{Object.entries(e).forEach(([t,r])=>{let{connectedCallback:o,disconnectedCallback:n,adoptedCallback:s,attributeChangedCallback:i,style:a,attributeToObserve:c}=r.componentParams;customElements.define(t,class extends HTMLElement{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#_;static get observedAttributes(){return c}constructor(){super(),this.attachShadow({mode:"open"}),this.active=!1,this.#t=u.getUnivoqueId(),this.#i={},this.#n=t,this.#l=!0,this.isUserComponent=!0,this.#r="",this.#e="";let l=this.shadowRoot?.host;if(!l)return;let p=zt();if(p&&!!1&&Ch(l),p||(this.#a&&!this.active&&(this.style.visibility="hidden"),!this.shadowRoot))return;if(a){let f=document.createElement("style");f.textContent=a,this.shadowRoot.append(f)}let d=document.createElement("slot");this.shadowRoot.append(d)}getComponentName(){return this.#n}setId(l){this.#t=l}getId(){return this.#t}getParentId(){return this.#f}setParentId(l){this.#f=l}getIsPlaceholder(){return this.#l}getInstanceName(){return this.#d}getStaticPropsId(){return this.#u}getDynamicPropsid(){return this.#s}getBindEventsId(){return this.#c}getCurrentKey(){return this.#h}setDynamicPropsFromSlotId(l){this.#r=l}getDynamicPropsFromSlotId(){return this.#r}setPropsFromSlotId(l){this.#e=l}getPropsFromSlotId(){return this.#e}setRepeatValue(l){this.#p=l}getRepeatValue(){return this.#p}getSlotPosition(){return this.#a}getDelegateEventId(){return this.#g}getRepeaterPropBind(){return this.#m??void 0}setRepeaterPropBind(l){this.#m=l}getComponentRepeatId(){return this.#o}getBindRefId(){return this.#x}getBindRefName(){return this.#_}resetParams(){this.active=!1,this.#t="",this.#i={}}disablePlaceHolderState(){this.#l=!1}inizializeCustomComponent(l){this.active||(this.active=!0,this.#t=l.id,this.#i=l,this.#l=!1,o?.({context:this,params:this.#i}))}connectedCallback(){if(!zt()&&this.#l){let p=this.shadowRoot?.host;p&&([this.#d,this.#u,this.#s,this.#h,this.#c,this.#p,this.#a,this.#f,this.#o,this.#g,this.#m,this.#x,this.#_]=[Md,dn,Wi,"key",ji,Zt,Rd,Nd,Wt,tr,er,rr,Er].map(d=>p.getAttribute(d)??"")),Kd(p);return}}disconnectedCallback(){if(!this.shadowRoot)return;let l=this.shadowRoot?.host;Qd(l),Qi(l),this.active&&(n?.({context:this,params:this.#i}),this.resetParams())}removeCustomComponent(){!this.shadowRoot||!this.active||this.parentElement?.removeChild(this)}adoptedCallback(){!this.shadowRoot||!this.active||s?.({context:this,params:this.#i})}attributeChangedCallback(l,p,d){!this.shadowRoot||!this.active||i?.({name:l,oldValue:p,newValue:d,context:this,params:this.#i})}})})};var kt=(e="",t="",r=()=>{},{wait:o=!1}={})=>(!e||e==="")&&(!t||t==="")?void 0:j.get(e)?.state?.watch(t,r,{wait:o??!1});function to(){return new Promise(e=>u.useNextLoop(()=>e()))}var Ro=new Map,Ih=()=>Ro.size===0,Ol=1e3,Mh=e=>{if(Ro.size>=Ol)return console.warn(`maximum loop event reached: (${Ol})`),()=>{};let t=u.getUnivoqueId();return Ro.set(t,e),()=>Ro.delete(t)},wh=()=>Ro.size===0||Ro.size>=Ol,Rt=async({debug:e=!1,previousResolve:t}={})=>{if(await to(),e&&Ro.forEach(r=>{console.log(r)}),wh()&&t){t();return}return new Promise(r=>{if(wh()){r();return}Rt({debug:e,previousResolve:t??r})})};var No=new Map,Rh=()=>No.size===0,$l=1e3,Nh=e=>{if(No.size>=$l)return console.warn(`maximum loop event reached: (${$l})`),()=>{};let t=u.getUnivoqueId();return No.set(t,e),()=>No.delete(t)},kh=()=>No.size===0||No.size>=$l,Nt=async({debug:e=!1,previousResolve:t}={})=>{if(await to(),e&&No.forEach(r=>{console.log(r)}),kh()&&t){t();return}return new Promise(r=>{if(kh()){r();return}Nt({debug:e,previousResolve:t??r})})};var yn=({id:e})=>{let t=et.get(e);return t?t.map(r=>r.invalidateId).map(r=>ye.get(r)).flatMap(r=>r?.observed).filter(r=>r!==void 0):[]};var Tn=({id:e})=>{let t=tt.get(e);return t?t.map(r=>r.repeatId).map(r=>G.get(r)).map(r=>r?.observed).filter(r=>r!==void 0):[]};var ea=new Map,Ph=(e,t)=>{ea.set(e,t)},ta=new Map,Ah=({host:e,componentId:t,bindTextId:r})=>{ta.set(e,{componentId:t,bindTextId:r})},Oh=e=>e.match(/(?<=\[).+?(?=])/g),$h=e=>e.split("[")?.[0],Sw=({previous:e,current:t})=>{let r=Oh(t);return r&&r?.length>0?r.reduce((n,s)=>n?.[s],e[$h(t)]):e?.[t]},Lh=(e,t,...r)=>{let o=ir(e),n=r.map(s=>s.split(".").reduce((a,c)=>Sw({previous:a,current:c})??a,o));return t.raw.reduce((s,i,a)=>s+i+(n?.[a]??""),"")},Dh=()=>{[...ta].forEach(([e,{bindTextId:t}])=>{let r=e.parentElement;if(!r){ea.delete(t);return}let o=ea.get(t);o&&(ea.delete(t),_w({...o,element:r}),e?.removeCustomComponent?.(),e?.remove(),r=null)}),ta.clear()},Fh=()=>ta.size,_w=({id:e,render:t,props:r,element:o})=>{let n=!1,s=new WeakRef(o),i=Tn({id:e}),a=yn({id:e}),l=[...new Set([...r,...i,...a])].map(p=>{let f=p.split(".")?.[0],h=Oh(f),b=h&&h?.length>0?$h(f):f;if(b)return kt(e,b,async()=>{await Nt(),await Rt(),!n&&(n=!0,u.useNextLoop(()=>{u.useFrame(()=>{s.deref()&&!s.deref()?.isConnected&&(l.forEach(T=>{T&&T()}),l.length=0),s.deref()&&s.deref()?.isConnected&&(s.deref().textContent="",s.deref().insertAdjacentHTML("afterbegin",t())),n=!1})}))})})};var Bh=()=>{customElements.define("mobjs-bind-text",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:e}=this.shadowRoot?.host??{};if(e){let t=this.shadowRoot?.host??document.createElement("div"),r=t?.getAttribute(Io)??"",o=t?.getAttribute(Bi)??"";Ah({host:t,componentId:r,bindTextId:o})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var ra=new Map,Vh=(e,t)=>{ra.set(e,t)},Ll=new Map,Wh=({host:e,componentId:t,bindObjectId:r})=>{Ll.set(e,{componentId:t,bindObjectId:r})},jh=e=>e.map(t=>"observe"in t?Re.extractkeyFromProp(t.observe):(Re.initializeCurrentDependencies(),"value"in t?t?.value():t(),Re.getFirstCurrentDependencies())),zh=(e,...t)=>e.raw.reduce((r,o,n)=>t?.[n]&&"value"in t[n]?r+o+(t?.[n]?.value?.()??""):r+o+(t?.[n]?.()??""),""),Hh=()=>{[...Ll].forEach(([e,{bindObjectId:t}])=>{let r=e.parentElement;if(!r){ra.delete(t);return}let o=ra.get(t);o&&(ra.delete(t),xw({...o,element:r}),e?.removeCustomComponent?.(),e?.remove(),r=null)}),Ll.clear()},xw=({id:e,keys:t,render:r,element:o})=>{let n=!1,s=new WeakRef(o),i=Tn({id:e}),a=yn({id:e}),l=[...new Set([...t,...i,...a])].map(p=>kt(e,p,async()=>{await Nt(),await Rt(),!n&&(n=!0,u.useNextLoop(()=>{u.useFrame(()=>{s.deref()&&!s.deref()?.isConnected&&(l.forEach(d=>{d&&d()}),l.length=0),s.deref()&&s.deref()?.isConnected&&(s.deref().textContent="",s.deref().insertAdjacentHTML("afterbegin",r())),n=!1})}))}))};var Uh=()=>{customElements.define("mobjs-bind-object",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:e}=this.shadowRoot?.host??{};if(e){let t=this.shadowRoot?.host??document.createElement("div"),r=t?.getAttribute(Io)??"",o=t?.getAttribute(Vi)??"";Wh({host:t,componentId:r,bindObjectId:o})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var oa={},Po=()=>oa,Gh=new Set,qh=()=>{oa=[...Gh.values()].reduce((e,t)=>({...e,...t}),{}),console.log(`component loaded:${Object.keys(oa).length}`),Eh(oa),xh(),bh(),fh(),Bh(),Uh()},na=e=>{!e||e?.length===0||e.forEach(t=>{Gh.add(t)})};var sa=({componentName:e,propName:t})=>(Po()?.[e]?.componentParams?.exportState??[]).includes(t),Jh=({componentName:e})=>Po()?.[e]?.componentParams?.exportState??[];var Sn=(e="",t="",r,{emit:o=!0}={})=>{if((!e||e==="")&&(!t||t==="")&&!r||ko({id:e,prop:t}))return;let s=j.get(e),i=s?.state,a=s?.componentName??"";if(!sa({componentName:a,propName:t})){console.warn(`setStateById failed ${t} in: ${a} is not exportable, maybe a slot bind state that not exist here?`);return}if(!i){console.warn(`setStateById failed no id found on prop: ${t}`);return}i.set(t,r,{emit:o})};var Yh=(e="")=>{let t=nr(e);return t||console.warn(`component ${e}, not found`),(r,o,{emit:n=!0}={})=>Sn(t,r,o,{emit:n})};var Xh=(e="",t="",r,{emit:o=!0,clone:n=!1}={})=>{if((!e||e==="")&&(!t||t==="")&&!r||ko({id:e,prop:t}))return;let i=j.get(e),a=i?.state,c=i?.componentName??"";if(!sa({componentName:c,propName:t})){console.warn(`updateStateById failed ${t} in: ${c} is not exportable, maybe a slot bind state that not exist here?`);return}if(!a){console.warn(`updateStateById failed no id found on prop: ${t}`);return}a.update(t,r,{emit:o,clone:n})};var Kh=(e="")=>{let t=nr(e);return t||console.warn(`component ${e}, not found`),(r,o,{emit:n=!0,clone:s=!1}={})=>Xh(t,r,o,{emit:n,clone:s})};var Dl={scoped:!1,maxParseIteration:5e3,debug:!1},Qh=e=>{Dl={...Dl,...e}},Pt=()=>Dl,Zh=()=>{let{debug:e}=Pt();return e},ef=({tag:e="",component:t=()=>"",props:r={},state:o={},bindStore:n,scoped:s,connectedCallback:i=()=>{},disconnectedCallback:a=()=>{},adoptedCallback:c=()=>{},attributeToObserve:l=[],attributeChangedCallback:p=()=>{},style:d="",child:f=[]})=>(na(f),{[e]:{componentFunction:t,componentParams:{exportState:Object.keys(r),scoped:s,state:{...r,...o},bindStore:n,connectedCallback:i,disconnectedCallback:a,adoptedCallback:c,attributeToObserve:l,attributeChangedCallback:p,style:d,child:f}}});var tf=[],rf="",of="",nf=e=>{tf=[...e]},_n=({hash:e=""})=>tf.find(({hash:t})=>e===t),sf=({hash:e=""})=>{rf=e},ia=()=>rf,af=({hash:e=""})=>{of=e},cf=()=>of;function Cw(e){let t=[];for(let r of sr(e))r?.isUserComponent&&r?.getSlotPosition?.()&&t.push(r);return t}var lf=e=>{let t=[],r=e||document.body;for(let o of r.children)t=[...t,...Cw(o)];return t};function Ew(e){let t=[];for(let r of sr(e))r?.isSlot&&r?.getSlotName?.()&&t.push(r);return t}var uf=e=>{let t=[],r=e||document.body;for(let o of r.children)t=[...t,...Ew(o)];return t};function ww(e,t){for(let r of sr(e))if(r?.isSlot&&r?.getSlotName?.()===t)return r;return null}var pf=(e,t)=>{let r=e||document.body;for(let o of r.children){let n=ww(o,t);if(n)return n}return null};function Iw(e){for(let t of sr(e))if(t?.isSlot&&!t?.getSlotName?.())return t;return null}var mf=e=>{let t=e||document.body;for(let r of t.children){let o=Iw(r);if(o)return o}return null};var xs=new Map,Ao=e=>{let t=u.getUnivoqueId();return xs.set(t,e),t},df=(e="")=>{if(!e)return or;let t=xs.get(e);return xs.delete(e),t??or};var g=(e,...t)=>e.reduce((r,o,n)=>r+o+(t[n]===void 0?"":t[n]),"").replaceAll(/>\s+</g,"><").trim();var aa=({components:e,current:t,index:r,observe:o,repeatId:n,key:s})=>{e.forEach(i=>{i.deref()?.hasAttribute(Zt)||i.deref()?.setAttribute(Zt,Ao({current:t,index:r})),i.deref()?.hasAttribute("key")||i.deref()?.setAttribute("key",`${s}`),i.deref()?.hasAttribute(er)||i.deref()?.setAttribute(er,`${o}`),i.deref()?.hasAttribute(Wt)||i.deref()?.setAttribute(Wt,`${n}`)})},ca=({components:e,current:t,index:r,observe:o,repeatId:n,key:s})=>{e.forEach(i=>{if(i.hasAttribute(Wt)){Qi(i);return}i.setAttribute(Zt,Ao({current:t,index:r})),i.setAttribute("key",`${s}`),i.setAttribute(er,`${o}`),i.setAttribute(Wt,`${n}`)})},ro=({stringDOM:e,parent:t,position:r})=>{st(!0);let o=document.createRange().createContextualFragment(e);st(!1),o&&(r==="afterend"&&t.after(o),r==="beforebegin"&&t.before(o),r==="afterbegin"&&t.prepend(o),r==="beforeend"&&t.append(o))},Cs=({elements:e,parent:t,position:r})=>{let o=new DocumentFragment;st(!0),e.forEach(n=>{n&&o.append(n)}),st(!1),r==="afterend"&&t.after(o),r==="beforebegin"&&t.before(o),r==="afterbegin"&&t.prepend(o),r==="beforeend"&&t.append(o)};var kw=({element:e,content:t})=>{let{debug:r}=Pt();if(e.parentNode){let o=document.createElement("template");o.innerHTML=t;let n=o.content.firstElementChild;return n?.disablePlaceHolderState?.(),n&&e.after(n),r&&e.insertAdjacentHTML("afterend",`<!--  ${e.tagName.toLowerCase()} --> `),n}},Rw=({element:e})=>{_h().forEach(r=>{r?.removeCustomComponent(),r?.remove()})},Nw=({element:e})=>{if(!!1&&Xi()===0)return;let t=lf(e);t.length!==0&&[...t].forEach(r=>{let o=r?.getSlotPosition(),n=Sh({name:o,element:e});n&&(n.parentNode?.insertBefore(r,n),n?.removeCustomComponent(),n?.remove())})},Pw=({element:e,content:t})=>{let r=kw({element:e,content:t});if(r){let o=e.getId(),n=e?.getDelegateEventId(),s=e?.getBindRefId(),i=e?.getBindRefName(),a=Th({element:r});a&&(Cs({parent:a,elements:[...e.childNodes],position:"afterend"}),a.remove()),a||Cs({parent:r,elements:[...e.childNodes],position:"afterbegin"}),Nw({element:r}),Rw({element:r}),n&&n.length>0&&r.setAttribute(tr,n),s&&s.length>0&&r.setAttribute(rr,s),i&&i.length>0&&r.setAttribute(Er,i);let{debug:c}=Pt();c&&r.setAttribute(Id,o??"")}return e.remove(),r},hf=({element:e,content:t})=>({newElement:Pw({element:e,content:t})});var Fl=0,ff=()=>{Fl+=1},Bl=()=>Fl,gf=()=>{Fl=0},Vl=({element:e,currentSelectors:t})=>{if(t.length>0){let r=t[0],o=t.slice(1);return{componentToParse:r,parseSourceArray:o}}else{let r=Zd(e),o=r?.[0],n=r.slice(1);return{componentToParse:o,parseSourceArray:n}}};var bf=({cb:e=()=>{},id:t})=>{if(!t)return;let r=j.get(t);r&&j.set(t,{...r,destroy:e})};var Es=new Map,vf=({id:e,cb:t=()=>{}})=>{Es.set(e,t)},Wl=async({id:e,element:t})=>{let o=await Es.get(e)?.({element:t});bf({cb:o,id:e}),Es.delete(e)};var xn=new Map,jl=1e5,Cn=e=>{if(xn.size>=jl)return console.warn(`maximum loop event reached: (${jl})`),()=>{};let t=u.getUnivoqueId();return xn.set(t,e),()=>xn.delete(t)},yf=()=>xn.size===0||xn.size>=jl,Ir=async({debug:e=!1,previousResolve:t}={})=>{if(await to(),e&&xn.forEach(r=>{console.log(r)}),yf()&&t){t();return}return new Promise(r=>{if(yf()){r();return}Ir({debug:e,previousResolve:t??r})})};var zl=!0,la=()=>{zl=!0},ua=()=>{zl=!1},pa=()=>zl;var En=new Map,Tf=(e=[])=>{let t=Fe(Object,e)?[e]:e,r=u.getUnivoqueId();return En.set(r,t),r},Sf=({element:e,componentId:t,bindEventsId:r})=>{let o=En.get(r);o&&(o.forEach(n=>{let[s]=Object.keys(n),[i]=Object.values(n);!s||!i||e.addEventListener(s,async a=>{if(!pa())return;ua(),await Ir(),la();let c=jt({id:t});i(a,c?.current,c?.index)})}),En.delete(r))},_f=()=>{En.clear()};var ma=({id:e="",unWatchArray:t=[]})=>{let r=j.get(e);if(!r)return;let{parentPropsWatcher:o}=r;o&&j.set(e,{...r,parentPropsWatcher:[...o,...t]})},xf=({id:e=""})=>{if(!e||e==="")return;(j.get(e)?.parentPropsWatcher??[]).forEach(o=>{o()})};var Cf=e=>{if(!("props"in e)){console.warn("bindProps not valid");return}let r=e?.observe?e.observe.map(s=>Re.extractkeyFromProp(s)):(Re.initializeCurrentDependencies(),u.checkType(Function,e.props)&&e.props({},{},0),Re.getCurrentDependencies());if(r.length===0){console.warn("bindProps not valid, no dependencies found");return}let o={...e,observe:r},n=u.getUnivoqueId();return Ct.set(n,{...o,componentId:"",propsId:n}),n},da=({componentId:e,observe:t,props:r,currentParentId:o,fireCallback:n})=>{if(!o)return;let s=ir(o);if(!s)return;let i=Object.keys(s);if(t.every(d=>i.includes(d))||console.warn(`bind props error: Some prop ${JSON.stringify(t)} doesn't exist`),!j.has(e))return;let l=jt({id:e}),p=r?.(s,l.current,l?.index);p&&Object.entries(p).forEach(([d,f])=>{Sn(e,d,f,{emit:n})})},Ef=({propsId:e,repeatPropBind:t,componentId:r})=>{if(!e)return;let o=Ct.get(e);o&&(Ct.set(e,{...o,componentId:r}),_s.set(r,e),Hl({componentId:r,repeatPropBind:t,inizilizeWatcher:!1}))};var Hl=async({componentId:e,repeatPropBind:t,inizilizeWatcher:r})=>{let o=_s.get(e);if(!o)return;r&&_s.delete(e);let n=Ct.get(o);if(!n)return;let{observe:s,props:i,parentId:a}=n,c=t&&t?.length>0&&!s.includes(t)?[...s,t]:[...s];if(r||da({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!1}),!r&&!Rh()&&(await Nt(),da({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!0})),!r&&!Ih()&&(await Rt(),da({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!0})),!r)return;let l=!1,p=c.map(d=>kt(a,d,async()=>{if(await Nt(),await Rt(),l)return;let f=Cn({state:d,id:e,type:Pd});l=!0,u.useNextLoop(()=>{da({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!0}),l=!1,f()})}));if(ma({id:e,unWatchArray:p.filter(d=>d!==void 0)}),!!r)for(let[d,f]of Ct){let{componentId:h}=f;h===e&&Ct.delete(d)}},wf=()=>{Ct.clear(),_s.clear()};var ar=({id:e,container:t})=>{let o=j.get(e)?.child;if(!o)return;Object.values(o??{}).flat().forEach(s=>{let i=j.get(s),a=i?.element,c=i?.id??"";if(a&&t?.contains(a)&&a!==t){it({id:s});return}else ar({id:c,container:t})})};var Ul=new Map,Aw=e=>(u.checkType(Array,e)?e:[e]).map(r=>Re.extractkeyFromProp(r)),Ow=({toggleClass:e,toggleStyle:t,toggleAttribute:r})=>(Re.initializeCurrentDependencies(),Object.values(t).forEach(o=>o()),Object.values(e).forEach(o=>o()),Object.values(r).forEach(o=>o()),Re.getCurrentDependencies()),Rf=({data:e,id:t})=>{let o=(u.checkType(Array,e)?e:[e]).map(({observe:i,toggleClass:a,toggleStyle:c,toggleAttribute:l})=>({observe:i?Aw(i):Ow({toggleStyle:c??{fake:()=>""},toggleClass:a??{fake:()=>{}},toggleAttribute:l??{fake:()=>{}}}),toggleClass:a??{},toggleStyle:c??{},toggleAttribute:l??{}})),n={parentId:t,items:o},s=u.getUnivoqueId();return Ul.set(s,n),s},Nf=e=>{[...e.querySelectorAll(`[${hn}]`)].forEach(r=>{let o=r.getAttribute(hn);if(!o)return;let n=Ul.get(o);n&&(r.removeAttribute(hn),$w({data:n,element:r}),Ul.delete(o))})},If=({ref:e,data:t})=>{t&&Object.entries(t).forEach(([r,o])=>{e.deref()&&e.deref().classList.toggle(r,o?.())})},Mf=({ref:e,data:t})=>{Object.entries(t).forEach(([r,o])=>{e.deref()&&(e.deref().style[r]=o?.()??"")})},kf=({ref:e,data:t})=>{Object.entries(t).forEach(([r,o])=>{if(!e.deref())return;let n=o?.();if(u.checkType(Boolean,n)){e.deref()[r]=n;return}if(!n){e.deref().removeAttribute(r);return}e.deref()?.setAttribute(r,n)})},$w=({data:e,element:t})=>{let r=new WeakRef(t),{parentId:o}=e,{items:n}=e,s=n.flatMap(({observe:i,toggleClass:a,toggleStyle:c,toggleAttribute:l})=>{let p=!1,d=Tn({id:o}),f=yn({id:o});return[...new Set([...i,...d,...f])].map(y=>(a&&u.useFrame(()=>{If({ref:r,data:a})}),c&&u.useFrame(()=>{Mf({ref:r,data:c})}),l&&u.useFrame(()=>{kf({ref:r,data:l})}),kt(o,y,async()=>{if(await Nt(),await Rt(),r.deref()&&!r.deref()?.isConnected){s.forEach(b=>{b&&b()}),s.length=0;return}p||(p=!0,u.useNextLoop(()=>{u.useFrame(()=>{a&&r.deref()&&If({ref:r,data:a}),c&&r.deref()&&Mf({ref:r,data:c}),l&&r.deref()&&kf({ref:r,data:l}),p=!1})}))})))})};var Pf=({element:e})=>{let t=e.querySelectorAll(`[${rr}]`),r={};return[...t].reduce((o,n)=>{let s=n.getAttribute(rr),i=n.getAttribute(Er);if(n.removeAttribute(rr),n.removeAttribute(Er),!i)return o;let a=i in o?[...o[i],{element:n,scopeId:s}]:[{element:n,scopeId:s}];return{...o,[i]:a}},r)},Lw=e=>[...new Set(e.toSorted((t,r)=>t===r||!t||!r?0:t.compareDocumentPosition(r)&2?1:-1))],Dw=({refs:e,refName:t,element:r})=>({...e,[t]:Lw([...e[t],r])}),Af=e=>{Object.entries(e).forEach(([t,r])=>{r.forEach(({element:o,scopeId:n})=>{let s=j.get(n);if(!s)return;let{refs:i}=s;if(!i)return;let a=t in i?Dw({refs:i,refName:t,element:o}):{...i,[t]:[o]};j.set(n,{...s,refs:a})})})},Gl=({id:e})=>{let t=j.get(e);if(!t)return{};let{refs:r,element:o}=t;if(!r)return{};let n=Object.entries(r).map(([s,i])=>({name:s,collection:i.filter(a=>o.contains(a))})).reduce((s,i)=>({...s,[i.name]:i.collection}),{});return j.set(e,{...t,refs:n}),n},Of=({id:e})=>{let t=Gl({id:e});return Object.entries(t).reduce((r,[o,n])=>({...r,[o]:n?.[0]}),{})};var $f=document.createElement("div"),Lf=({element:e})=>{$f=e},ha=()=>$f;var ws=new Map,Oo=new WeakMap,ql=[],Df=[],Ff=(e=[])=>{let t=Fe(Object,e)?[e]:e,r=u.getUnivoqueId();return ws.set(r,t),r},Fw=e=>{let t=e?.parentNode;for(;t;){if(Oo.has(t))return{target:t,data:Oo.get(t)};t=t?.parentNode}return{target:void 0,data:void 0}},Bw=e=>Oo.get(e)?{target:e,data:Oo.get(e)}:Fw(e);async function Vw(e,t){let r=t?.target;if(!r||!pa())return;ua(),await Ir(),la();let{target:o,data:n}=Bw(r);if(!n||!document.contains(o))return;let s=n.find(({event:l})=>l===e);if(!s)return;let{callback:i}=s,a=wd({element:o}),c=a?jt({id:a}):or;Object.defineProperty(t,"target",{value:o}),Object.defineProperty(t,"currentTarget",{value:r}),i(t,c?.current,c?.index)}var Bf=async e=>{await Nt(),await Rt(),[...e.parentNode?.querySelectorAll(`[${tr}]`)??[]].forEach(n=>{let s=n.getAttribute(tr)??"";n.removeAttribute(tr);let i=ws.get(s);ws.delete(s);let a=i?.flatMap(c=>Object.entries(c).map(l=>{let[p,d]=l;return ql.includes(p)||ql.push(p),{event:p,callback:d}}));Oo.set(n,a)});let o=ha();ql.forEach(n=>{Df.includes(n)||(Df.push(n),o.addEventListener(n,Vw.bind(null,n)))})};var wn="repeater",fa="invalidate",oo=({moduleParentElement:e,skipInitialized:t=!1,onlyInitialized:r=!1,componentId:o,module:n})=>{let s=n===wn?G.entries():ye.entries(),i=[];for(let a of s){let[c,{element:l,initialized:p,scopeId:d,initializeModule:f,unsubscribe:h}]=a;if(o&&!Pl({moduleScopeId:d??"",targetComponentId:o})||t&&p||r&&!p)continue;l&&e?.contains(l)&&e!==l&&i.push({moduleId:c,initializeModule:f,unsubscribe:n===wn?[h]:h})}return i};var Vf=({id:e,repeatId:t})=>{if(!tt.has(e))return;let r=tt.get(e);if(!r)return;let o=r.filter(n=>n.repeatId!==t);G.has(t)&&G.delete(t),tt.set(e,o)};var no=({id:e,repeatParent:t})=>{oo({moduleParentElement:t,skipInitialized:!1,onlyInitialized:!0,componentId:e,module:wn}).forEach(({unsubscribe:o,moduleId:n})=>{o.forEach(s=>{s()}),Vf({id:e,repeatId:n})})};var ga=({repeatParent:e,id:t})=>{if(!e)return;oo({moduleParentElement:e,skipInitialized:!0,onlyInitialized:!1,componentId:t,module:wn}).forEach(({initializeModule:o})=>{o()})};var Wf=({invalidateId:e,unsubscribe:t})=>{let r=ye.get(e);r&&ye.set(e,{...r,unsubscribe:t})};var jf=({id:e,invalidateId:t})=>{if(!et.has(e))return;let r=et.get(e);if(!r)return;let o=r.filter(n=>n.invalidateId!==t);ye.has(t)&&ye.delete(t),et.set(e,o)};var so=({id:e,invalidateParent:t})=>{oo({moduleParentElement:t,skipInitialized:!1,onlyInitialized:!0,componentId:e,module:fa}).forEach(({unsubscribe:o,moduleId:n})=>{o.forEach(s=>{s()}),jf({id:e,invalidateId:n})})};var Jl=({id:e})=>{if(!ye.has(e))return;if(Kr.has(e)){let r=Kr.get(e);r?.removeCustomComponent(),r?.remove(),Kr.delete(e)}return ye.get(e)?.element};var ba=({invalidateParent:e,id:t})=>{if(!e)return;oo({moduleParentElement:e,skipInitialized:!0,onlyInitialized:!1,componentId:t,module:fa}).forEach(({initializeModule:o})=>{o()})};var zf=async({observe:e=[],beforeUpdate:t=()=>Promise.resolve(),afterUpdate:r=()=>{},watch:o,id:n,invalidateId:s,persistent:i=!1,renderFunction:a})=>{let c=!1,l=gn({element:Jl({id:s})});r();let p=e.map(d=>o(d,async()=>{if(c)return;vn({id:n,prop:d});let h=Jl({id:s}),y=Cn({state:d,id:n,type:Rl}),b=Mh({state:d,id:n,type:Rl});c=!0,u.useNextLoop(async()=>{if(!h){Xr({id:n,prop:d});return}await t(),so({id:n,invalidateParent:h}),no({id:n,repeatParent:h}),ar({id:l??n,container:h}),h.textContent="",ro({stringDOM:a(),parent:h,position:"afterbegin"}),he.set(mt,{element:h,parentId:l??n,persistent:i,source:dd},{emit:!1}),await he.emitAsync(mt),pn(),c=!1,y(),b(),ba({invalidateParent:h,id:n}),ga({repeatParent:h,id:n}),Xr({id:n,prop:d}),r()})}));Wf({invalidateId:s,unsubscribe:p})};var Hf=e=>(u.checkType(Array,e)?e:[e]).map(r=>Re.extractkeyFromProp(r));var Uf=({invalidateId:e,initializeModule:t})=>{let r=ye.get(e);r&&ye.set(e,{...r,initializeModule:t,unsubscribe:[()=>{}]})};var Gf=({invalidateId:e})=>{let t=ye.get(e);t&&ye.set(e,{...t,initialized:!0})};var qf=({invalidateId:e,scopeId:t,observe:r})=>{ye.set(e,{element:void 0,initialized:!1,observed:r,scopeId:t,initializeModule:()=>{},unsubscribe:[()=>{}]})};var Jf=({repeatId:e,unsubscribe:t})=>{let r=G.get(e);r&&G.set(e,{...r,unsubscribe:t})};var In=new Set,Yf=({id:e,state:t,container:r})=>{In.add({id:e,state:t,container:r})},Xf=({id:e,state:t,container:r})=>{r&&In.forEach(o=>{e===o.id&&t===o.state&&r===o.container&&In.delete(o)})},Kf=({id:e="",state:t="",container:r})=>[...In].some(n=>e===n.id&&t===n.state&&r===n.container);var Zf=(e=[],t=[],r="")=>e.filter(o=>{let n=o?.[r];return!t.some(s=>s?.[r]===n)}),eg=(e,t,r)=>e.map((o,n)=>{let s=o?.[r];return!t.some(a=>a?.[r]===s)?{isNewElement:!0,keyValue:o?.[r],index:n}:{isNewElement:!1,keyValue:o?.[r],index:n}}),Qf=({arr:e=[],key:t=""})=>e.every(r=>u.checkType(Object,r)&&t in r),tg=({current:e,previous:t,key:r})=>Qf({arr:e,key:r})&&Qf({arr:t,key:r}),va=({data:e=[],key:t=""})=>e.filter((r,o,n)=>n.findIndex(s=>s?.[t]===r?.[t])===o),ya=({children:e,previousChildren:t=[]})=>{let r={};return t.length===0?Object.values(e.reduce((o,n)=>{let{index:s}=jt({id:n});return s in o?{...o,[s]:[...o[s],n]}:{...o,[s]:[n]}},r)):Object.values(e.reduce((o,n)=>{let{index:s}=jt({id:n}),i=t.includes(n)?`${s}`:`_${s}`,a=o?.[i];return a?{...o,[i]:[...a,n]}:{...o,[i]:[n]}},r))};var Mn=new Map,Ta=(e={})=>{let t=u.getUnivoqueId();return Mn.set(t,e),t},Sa=(e="")=>{let t=Mn.get(e);return Mn.delete(e),t??{}};var rg=()=>{Mn.clear()};var _a=(e={})=>`${dn}="${Ta(e)}"`,xa=(e,t,r)=>Math.min(Math.max(e,t),r);var Yl=({repeatId:e})=>{let t=G.get(e);return t?t.currentData:[]};var Ww="index",$o=({observe:e,hasKey:t,key:r="",keyValue:o="",index:n,repeatId:s})=>{let i=Yl({repeatId:s}),a=t?i?.find(p=>p[r]===o):i?.[n],c=a,l=a;return new Proxy({},{get(p,d){Re.setCurrentDependencies(e);let f=Yl({repeatId:s}),h=Math.max(f?.length-1,0);if(d===Ww){if(t){let y=f?.findIndex(b=>b[r]===o);return xa(y,0,h)}return xa(n,0,h)}return t?(l=c??l,c=f?.find(y=>y[r]===o),c??l):(l=c??l,c=f?.[xa(n,0,h)],c??l)},set(){return!1}})};var og=({diff:e,current:t,previousLenght:r,render:o,state:n,repeatId:s})=>{let i=document.createRange();return[...Array.from({length:e}).keys()].map((c,l)=>{let p=t?.[l+r],d=l+r,f=$o({observe:n,hasKey:!1,index:d,repeatId:s}),h=o({initialIndex:d,initialValue:p,current:f,sync:()=>""}),y=zt();st(!0);let b=i.createContextualFragment(h);if(st(y),!1){let T=Yr(b,!1).map(_=>new WeakRef(_));aa({components:T,current:p,index:d,observe:n,repeatId:s,key:void 0})}return ca({components:Ki(),current:p,index:d,observe:n,repeatId:s,key:void 0}),b.firstElementChild}).filter(c=>c!==null)},jw=({initialIndex:e,initialValue:t,state:r,repeatId:o})=>`${Zt}="${Ao({current:t,index:e})}"
    ${er}="${r}" ${Wt}="${o}"`,ng=({diff:e,previousLenght:t,current:r,state:o,repeatId:n,render:s})=>[...Array.from({length:e}).keys()].map((i,a)=>{let c=a+t,l=r?.[c]?{...r?.[c]}:{},p=$o({observe:o,hasKey:!1,index:c,repeatId:n});return s({sync:()=>jw({initialIndex:c,initialValue:l,repeatId:n,state:o}),initialIndex:c,initialValue:l,current:p})}).join(""),sg=({currentValue:e,index:t,state:r,repeatId:o,key:n,keyValue:s,render:i})=>{let a=$o({observe:r,hasKey:!0,key:n,keyValue:s,index:t,repeatId:o}),c=zt();st(!0);let l=document.createRange().createContextualFragment(i({initialIndex:t,initialValue:e,current:a,sync:()=>""}));if(st(c),!1){let p=Yr(l,!1).map(d=>new WeakRef(d));aa({components:p,current:e,index:t,observe:r,repeatId:o,key:s})}return ca({components:Ki(),current:e,index:t,observe:r,repeatId:o,key:s}),l.firstElementChild},zw=({keyValue:e,index:t,currentValue:r,state:o,repeatId:n})=>` ${"key"}="${e}"
    ${er}="${o}"
    ${Zt}="${Ao({current:r,index:t})}"
    ${Wt}="${n}"`,ig=({currentValue:e,index:t,state:r,repeatId:o,key:n,keyValue:s,render:i})=>{let a={...e},c=$o({observe:r,hasKey:!0,key:n,keyValue:s,index:t,repeatId:o});return i({initialIndex:t,initialValue:a,current:c,sync:()=>zw({currentValue:a,index:t,keyValue:s,repeatId:o,state:r})})},ag=({currentUnique:e,render:t,observe:r,repeatId:o,key:n="",hasKey:s})=>{let i=document.createRange();return e.map((c,l)=>{let p=$o({observe:r,hasKey:s,key:n,keyValue:s?c?.[n]:"",index:l,repeatId:o}),d=zt();st(!0);let f=i.createContextualFragment(t({initialIndex:l,initialValue:c,current:p,sync:()=>""}));if(st(d),!1){let h=Yr(f,!1).map(y=>new WeakRef(y));aa({components:h,current:c,index:l,observe:r,repeatId:o,key:s?c?.[n]:""})}return ca({components:Ki(),current:c,index:l,observe:r,repeatId:o,key:s?c?.[n]:""}),f.firstElementChild}).filter(c=>c!==null)},cg=({currentUnique:e,key:t="",observe:r,repeatId:o,hasKey:n,render:s})=>e.map((a,c)=>{let l=()=>`${Zt}="${Ao({current:a,index:c})}"
                            ${"key"}="${n?a?.[t]:""}"
                            ${er}="${r}"
                            ${Wt}="${o}"`,p=$o({observe:r,hasKey:n,key:t,keyValue:n?a?.[t]:"",index:c,repeatId:o});return s({sync:l,initialIndex:c,initialValue:a,current:p})}).join("");var Ca=({repeatId:e,id:t})=>{let r=G.get(e);if(!r)return;let{element:o,observed:n}=r;if(!o)return;let s=[...o.children],a=ir(t)[n];G.set(e,{...r,nativeDOMChildren:s.map((c,l)=>({index:l,value:a[l],element:c}))})},Is=({repeatId:e})=>{let t=G.get(e);if(!t)return[];let{nativeDOMChildren:r}=t;return r};var kn=({repeatId:e,currentData:t})=>{let r=G.get(e);r&&G.set(e,{...r,currentData:t})};var Hw=({element:e,container:t})=>{let r=zd(e);t.insertAdjacentHTML("beforeend",`<!-- ${r} --> `)},lg=({state:e="",current:t=[],previous:r=[],repeaterParentElement:o=document.createElement("div"),key:n="",id:s="",render:i,repeatId:a,useSync:c})=>{let l=va({data:t,key:n});kn({repeatId:a,currentData:l});let p=Zf(r,l,n),d=p.map(T=>{let _=T?.[n];return Il({keyValue:_,repeatId:a})}).filter(T=>T.length>0),f=d.length>0;d.forEach(T=>{let _=T[0].element,S=T[0].id;if(!S)return;let E=Ts({id:S}),C=E??_;so({id:s,invalidateParent:C}),no({id:s,repeatParent:C}),T.forEach(({id:M})=>{it({id:M})}),E&&E.remove()}),f||Is({repeatId:a}).filter(S=>p.map(E=>E?.[n]).includes(S.value?.[n])).forEach(S=>{let{element:E}=S;so({id:s,invalidateParent:E}),no({id:s,repeatParent:E}),ar({id:s,container:E})});let h=eg(l,r,n).map(({keyValue:T,isNewElement:_,index:S})=>{if(_)return{keyValue:T,isNewElement:_,index:S,wrapper:void 0};let E=Il({keyValue:T,repeatId:a}),C=E[0]?.element?Ts({id:E[0]?.id??""}):Is({repeatId:a}).find(I=>I.value?.[n]===T)?.element;return{keyValue:T,isNewElement:_,index:S,persistentElement:E,persistentDOMwrapper:C}});o.replaceChildren();let y=document.createRange(),b=new DocumentFragment;return h.forEach(({isNewElement:T,keyValue:_,index:S,persistentElement:E,persistentDOMwrapper:C})=>{if(!T){let{debug:k}=Pt();C&&b.append(C);let O=E?.[0]?.element;!C&&O&&(b.append(O),k&&Hw({element:E[0]?.element,container:o}));return}let M=l?.[S],I=c?ig({currentValue:M,index:S,state:e,repeatId:a,key:n,keyValue:_,render:i}):sg({currentValue:M,index:S,state:e,repeatId:a,key:n,keyValue:_,render:i}),P=zt();if(st(!0),c){let k=y.createContextualFragment(I);b.append(k)}!c&&I&&b.append(I),st(P)}),o.append(b),l};var Uw=e=>{let t=e.lastElementChild;if(!t)return;let r=t.nextSibling;for(;r;){let o=r.nextSibling;r.nodeType===Node.COMMENT_NODE&&r.remove(),r=o}},ug=({state:e="",current:t=[],previous:r=[],repeaterParentElement:o=document.createElement("div"),render:n,repeatId:s,id:i,useSync:a,currentChildren:c})=>{kn({repeatId:s,currentData:t});let l=t.length,p=r.length,d=l-p;if(d>0){let f=a?ng({diff:d,previousLenght:p,current:t,state:e,repeatId:s,render:n}):og({diff:d,current:t,previousLenght:p,render:n,state:e,repeatId:s});a&&ro({stringDOM:f,parent:o,position:"beforeend"}),a||Cs({elements:f,parent:o,position:"beforeend"})}if(d<0){let f=ya({children:c});f.filter((_,S)=>S>=t.length).forEach(_=>{_.forEach(S=>{let E=vs({id:S}),C=Ts({id:S}),M=C??E;so({id:i,invalidateParent:M}),no({id:i,repeatParent:M}),it({id:S}),C&&C.remove()})});let{debug:y}=Pt();if(y&&Uw(o),f.length>0)return t;let b=Is({repeatId:s});if(!b)return t;b.filter(({index:_})=>_>=t.length).forEach(_=>{let{element:S}=_;so({id:i,invalidateParent:S}),no({id:i,repeatParent:S}),ar({id:i,container:S}),S.remove()})}return t};var pg=async({state:e="",persistent:t,repeaterParentElement:r=document.createElement("div"),current:o=[],previous:n=[],key:s="",id:i,fallBackParentId:a="",render:c,repeatId:l,useSync:p,currentChildren:d=[]})=>{let y=(tg({current:o,previous:n,key:s})?lg:ug)({state:e,current:o,previous:n,repeaterParentElement:r,key:s,id:i,render:c,repeatId:l,useSync:p,currentChildren:d});return he.set(mt,{element:r,parentId:a??i,persistent:t,source:md},{emit:!1}),await he.emitAsync(mt),pn(),y};var mg=({state:e="",setState:t,persistent:r=!1,watch:o,clean:n=!1,beforeUpdate:s,afterUpdate:i,key:a="",id:c="",repeatId:l="",render:p,useSync:d=!1})=>{let f=vs({id:c}),h=ys({id:l}),y=h?gn({element:h})??"":"";return i(),o(e,async(T,_)=>{if(!u.checkType(Array,T))return;let S=ys({id:l}),E=Cn({state:e,id:c,type:kl}),C=Nh({state:e,id:c,type:kl});if(vn({id:c,prop:e}),Kf({id:c,state:e,container:S})){Xr({id:c,prop:e}),t(e,_,{emit:!1}),E(),C();return}let I=Ml({id:c,repeatId:l});f&&await s(),n&&(I.forEach(F=>{it({id:F})}),S&&(S.textContent="")),S&&Yf({id:c,state:e,container:S});let P=await pg({state:e,persistent:r,repeaterParentElement:S??document.createElement("div"),current:T,previous:n?[]:_,key:a,id:c,fallBackParentId:y,render:p,repeatId:l,useSync:d,currentChildren:n?[]:I}),k=Ml({id:c,repeatId:l}),O=a&&a!=="",L=ya({children:k,previousChildren:I}),D=O?[...$d({children:L,key:a,current:T,currentUnivoque:P})]:L;D.forEach((F,w)=>{F.forEach(R=>{let A=P?.[w];if(!A)return;let x=O?T.findIndex(N=>`${N?.[a]}`==`${P?.[w]?.[a]}`):w;Ui({id:R,value:{current:A,index:x}})})}),u.useNextLoop(async()=>{f&&i(),Xf({id:c,state:e,container:S}),Xr({id:c,prop:e}),E(),C(),ba({invalidateParent:S,id:c}),ga({repeatParent:S,id:c}),D.length===0&&Ca({repeatId:l,id:c})})})};var dg=({repeatId:e,persistent:t,state:r,setState:o,emit:n,watch:s,clean:i,beforeUpdate:a,afterUpdate:c,key:l,id:p,render:d,useSync:f})=>{let h=mg({state:r,setState:o,persistent:t,emit:n,watch:s,clean:i,beforeUpdate:a,afterUpdate:c,key:l,id:p,repeatId:e,render:d,useSync:f});Jf({repeatId:e,unsubscribe:h})};var hg=({repeatId:e,initializeModule:t})=>{let r=G.get(e);r&&G.set(e,{...r,initializeModule:t,unsubscribe:()=>{}})};var fg=({repeatId:e})=>{let t=G.get(e);t&&G.set(e,{...t,initialized:!0})};var gg=({repeatId:e,initialDOMRender:t})=>{let r=G.get(e);r&&G.set(e,{...r,initialRenderWithoutSync:t})};var bg=({repeatId:e,scopeId:t,observe:r})=>{G.set(e,{element:void 0,initialized:!1,scopeId:t,observed:r,nativeDOMChildren:[],componentChildren:[],currentData:[],initialRenderWithoutSync:[],initializeModule:()=>{},unsubscribe:()=>{}})};var vg=({repeatId:e,scopeId:t})=>{let r=tt.get(t)??[];tt.set(t,[...r,{repeatId:e}])};var yg=({invalidateId:e,scopeId:t})=>{let r=et.get(t)??[];et.set(t,[...r,{invalidateId:e}])};var Tg=({getState:e,setState:t,updateState:r,getProxi:o,emit:n,emitAsync:s,computed:i,watch:a,id:c,key:l,bindEventsId:p,debug:d})=>({bindEventsId:p,key:l,id:c,getState:e,setState:t,updateState:r,getProxi:o,emit:n,emitAsync:s,computed:i,watch:a,debug:d,repeatIdArray:[],renderComponent:async({attachTo:h,component:y,position:b="afterbegin",clean:T=!0})=>{T&&(ar({id:c,container:h}),h.textContent=""),h.insertAdjacentHTML(b,y),he.set(mt,{element:h,parentId:c,persistent:Ji(c),source:hd},{emit:!1}),await he.emitAsync(mt),pn()},getChildren:h=>Gi({id:c,componentName:h}),freezeProp:h=>{let y=Re.extractkeyFromProp(h);return vn({id:c,prop:y.toString()})},unFreezeProp:h=>{let y=Re.extractkeyFromProp(h);return Xr({id:c,prop:y.toString()})},unBind:()=>xf({id:c}),bindProps:h=>{let y="props"in h?h:{props:h};return`${Wi}="${Cf({...y,parentId:c})}" `},staticProps:h=>` ${dn}="${Ta(h)}" `,remove:()=>{it({id:c})},removeDOM:h=>{ar({id:c,container:h}),h.textContent=""},getParentId:()=>Ss(c),watchParent:(h,y)=>{let b=kt(Ss(c),h,y);b&&ma({id:c,unWatchArray:[b]})},onMount:h=>vf({id:c,cb:h}),bindEvents:h=>`${ji}="${Tf(h)}"`,delegateEvents:h=>`${tr}="${Ff(h)}"`,bindEffect:h=>`${hn}="${Rf({data:h,id:c})}"`,addMethod:(h,y)=>{qd({id:c,name:h,fn:y})},setRef:h=>`${rr}="${c}" ${Er}="${h}"`,getRef:()=>Of({id:c}),getRefs:()=>Gl({id:c}),bindText:(h,...y)=>{let b=u.getUnivoqueId(),T=()=>Lh(c,h,...y);return Ph(b,{id:c,render:T,props:y}),`<mobjs-bind-text ${Io}="${c}" ${Bi}="${b}"></mobjs-bind-text>${T()}`},bindObject:(h,...y)=>{let b=jh(y),T=u.getUnivoqueId(),_=()=>zh(h,...y);return Vh(T,{id:c,keys:b,render:_}),`<mobjs-bind-object ${Io}="${c}" ${Vi}="${T}"></mobjs-bind-object>${_()}`},invalidate:({observe:h,render:y,beforeUpdate:b=()=>Promise.resolve(),afterUpdate:T=()=>{}})=>{let _=Hf(h),S=u.getUnivoqueId(),E=`${zi}=${S}`,C=()=>y(),M=!1;return yg({invalidateId:S,scopeId:c}),qf({invalidateId:S,scopeId:c,observe:_}),Uf({invalidateId:S,initializeModule:()=>{M||(zf({observe:_,watch:a,beforeUpdate:b,afterUpdate:T,persistent:Ji(c),id:c,invalidateId:S,renderFunction:C}),M=!0,Gf({invalidateId:S}))}}),`<mobjs-invalidate ${E} style="display:none;"></mobjs-invalidate>${C()}`},repeat:({observe:h,clean:y=!1,beforeUpdate:b=()=>Promise.resolve(),afterUpdate:T=()=>{},key:_="",render:S,useSync:E=!1})=>{let C=Re.extractkeyFromProp(h),M=u.getUnivoqueId(),I=_!=="";vg({repeatId:M,scopeId:c}),bg({repeatId:M,scopeId:c,observe:C});let P=e()?.[C],k=I?va({data:P,key:_}):P;kn({repeatId:M,currentData:k});let O=E?cg({currentUnique:k,key:_,observe:C,repeatId:M,hasKey:I,render:S}):"",L=E?[]:ag({currentUnique:k,render:S,observe:C,repeatId:M,key:_,hasKey:I}),D=!1;return gg({repeatId:M,initialDOMRender:L}),hg({repeatId:M,initializeModule:()=>{D||(dg({repeatId:M,persistent:Ji(c),state:C,setState:t,emit:n,watch:a,clean:y,beforeUpdate:b,afterUpdate:T,key:_,id:c,render:S,useSync:E}),D=!0,fg({repeatId:M}),_d({repeatId:M})||Ca({repeatId:M,id:c}))}}),`<mobjs-repeat ${Hi}="${M}" style="display:none;"></mobjs-repeat>${O}`}});var Xl=({componentName:e,currentProps:t={}})=>{let o=Po()?.[e]?.componentParams?.exportState??[];return Object.entries(t).filter(([n])=>o.includes(n)).reduce((n,s)=>{let[i,a]=s;return{...n,[i]:a}},{})};var Sg=({element:e,parentIdForced:t})=>{let r=e.getId(),o=e.getInstanceName(),n=e.getParentId(),s=gn({element:e}),i=e.getStaticPropsId(),a=e.getDynamicPropsid(),c=e.getBindEventsId(),l=e.getRepeatValue(),p=e.getComponentRepeatId(),d=e.getCurrentKey()??"",f=e.getComponentName(),h=i?.split(" ").join(""),y=Sa(h),b={...e.dataset},T=e.getRepeaterPropBind(),_=df(l);return{element:e,props:{...Xl({componentName:f,currentProps:b}),...Xl({componentName:f,currentProps:y})},id:r,componentName:f,instanceName:o,key:d,dynamicPropsId:a,repeatPropBind:T,bindEventsId:c,currentRepeatValue:_,parentId:s,componentRepeatId:p}};var _g=e=>{bn.add(e)};var xg=({element:e,instanceName:t="",props:r={},state:o={},bindStore:n,methods:s={},key:i="",currentRepeaterState:a=or,repeaterInnerWrap:c,repeatPropBind:l="",componentRepeatId:p="",parentPropsWatcher:d=[()=>{}],refs:f={},destroy:h=()=>{},freezedPros:y=[],persistent:b=!1,child:T={},parentId:_="",id:S="",componentName:E=""})=>{let C=u.createStore(o);sh({props:r,store:C}),n&&C.bindStore(n),b||_g(S),p&&p.length>0&&Td({componentId:S,repeatId:p}),t&&t.length>0&&Vd({instanceName:t,id:S});let M=Jh({componentName:E}),I=new Set(M);return C.setProxiReadOnlyProp(M),j.set(S,{element:e,componentName:E,instanceName:t,destroy:h,parentPropsWatcher:d,refs:f,methods:s,key:i,currentRepeaterState:a,repeaterInnerWrap:c,repeatPropBind:l,componentRepeatId:p,persistent:b,id:S,parentId:_,freezedPros:y,child:T,state:C}),{getState:()=>C.get(),setState:(P="",k={},{emit:O=!0}={})=>{let L=ko({id:S,prop:P}),D=Re.extractkeyFromProp(P),F=I.has(D);F&&Yi({prop:D,componentName:E,action:"updateState"}),!(L||F)&&C.set(D,k,{emit:O??!0,usePropAsString:!0})},updateState:(P="",k=()=>{},{emit:O=!0,clone:L=!1}={})=>{let D=ko({id:S,prop:P}),F=Re.extractkeyFromProp(P),w=I.has(F);w&&Yi({prop:F,componentName:E,action:"updateState"}),!(D||w)&&C.update(F,k,{emit:O??!0,clone:L??!1,usePropAsString:!0})},getProxi:()=>C.getProxi(),emit:(P="")=>C.emit(P),emitAsync:async(P="")=>await C.emitAsync(P),computed:(P="",k=()=>{},O=[])=>{let L=Re.extractkeyFromProp(P);if(I.has(L)){Yi({prop:L,componentName:E,action:"computed"});return}return C.computed(L,k,O,{usePropAsString:!0})},watch:(P="",k=()=>{},{wait:O=!1,immediate:L=!1}={})=>C.watch(P,k,{wait:O??!1,immediate:L??!1}),debug:()=>C.debug()}};var Cg=({id:e})=>(et.get(e)??[]).map(({invalidateId:r})=>{let o=ye.get(r);if(o)return{invalidateId:r,initializeModule:o.initializeModule}}).filter(r=>r!==void 0);var Eg=({id:e})=>(tt.get(e)??[]).map(({repeatId:r})=>{let o=G.get(r);if(o)return{repeatId:r,initializeModule:o.initializeModule}}).filter(r=>r!==void 0);var wg=async({element:e,persistent:t=!1,parentIdForced:r="",source:o=Gr})=>{let{debug:n}=Pt();n&&console.log("parse source:",o);let s=Po(),i=[],a=Vl({element:e,currentSelectors:[]}),c=a.parseSourceArray,l=a?.componentToParse;for(;l;){let d=l.getComponentName(),f=s?.[d]?.componentFunction,h=s?.[d]?.componentParams,{scoped:y,bindStore:b}=h,{props:T,id:_,componentName:S,instanceName:E,key:C,dynamicPropsId:M,currentRepeatValue:I,bindEventsId:P,parentId:k,componentRepeatId:O,repeatPropBind:L}=Sg({element:l,parentIdForced:r}),D=h?.state??{},{getState:F,setState:w,updateState:R,getProxi:A,emit:x,emitAsync:N,computed:$,watch:B,debug:V}=xg({element:l,props:T,state:D,id:_,componentName:S,instanceName:E,key:C,repeatPropBind:L,persistent:t,parentId:k,componentRepeatId:O,bindStore:b});ih({id:_}),O&&O?.length>0&&(Ui({id:_,value:I}),Od({id:_,repeatId:O,element:l})),Ef({propsId:M,repeatPropBind:L,componentId:_});let K=Tg({getState:F,setState:w,updateState:R,getProxi:A,emit:x,emitAsync:N,computed:$,watch:B,id:_,key:C,bindEventsId:P,debug:V}),ue=await f(K),ge=l.classList,{newElement:ee}=hf({content:ue,element:l});if(yh(),ge.length>0&&ee?.classList.add(...ge),!0,!ee)return;Ed({id:_,newElement:ee});let me=Cg({id:_}),pe=Eg({id:_});P&&Sf({element:ee,componentId:_,bindEventsId:P});let ve=y??Pt().scoped;ve&&await Wl({id:_,element:ee}),ee?.inizializeCustomComponent?.(K),i.push({onMount:async()=>{ve||await Wl({id:_,element:ee})},initializeBindPropsWatcher:()=>{Hl({componentId:_,repeatPropBind:L,inizilizeWatcher:!0})},fireInvalidateFunction:me.length>0?()=>{me.forEach(({initializeModule:q})=>{q?.()})}:()=>{},fireRepeatFunction:pe.length>0?()=>{pe.forEach(({initializeModule:q})=>{q?.()})}:()=>{}});let Pe=Vl({element:e,currentSelectors:c});c=Pe.parseSourceArray,l=Pe.componentToParse;let Be=Bl()===Pt().maxParseIteration;if(ff(),Be){console.warn(`dom parse reached max parse limit: ${Bl()}`);break}}let p=Pf({element:e});Object.keys(p).length>0&&Af(p);for(let d of i.toReversed()){let{onMount:f,initializeBindPropsWatcher:h,fireInvalidateFunction:y,fireRepeatFunction:b}=d;await f(),b(),y(),h()}i.length=0,c.length=0,l=null,Bf(e),Nf(e),Dh(),Hh()};var Ms=async({element:e,persistent:t=!1,parentIdForced:r="",source:o=Gr})=>{await wg({element:e,persistent:t,parentIdForced:r,source:o}),gf()},Ig=()=>{he.watch(mt,async({element:e,parentId:t,persistent:r=!1,source:o=Gr})=>{await Ms({element:e,parentIdForced:t??"",persistent:r,source:o})})};var Mg=()=>{rg(),_f(),wf()};var kg,Rg,Ng=({fn:e})=>{e&&(Rg=e)},Pg=({fn:e})=>{e&&(kg=e)},Ag=()=>Rg,Og=()=>kg;var $g=!0,Lg=e=>{$g=e},Dg=()=>$g;var Fg=()=>{for(let e of bn)it({id:e})};var Bg=new Map,Vg=({route:e,params:t})=>Object.entries(t).reduce((r,[o,n])=>`${r}-${o}-${n}`,e),Wg=async({route:e="",templateName:t="",isBrowserNavigation:r=!1,params:o={},skipTransition:n})=>{he.set(Qt,!0),await Ir();let s=qi();if(!s||!(s instanceof HTMLElement))return;let{activeRoute:i,activeParams:a}=he.get(),c=Vg({route:e,params:o}),l=Vg({route:i.route,params:a}),p=window.scrollY;Bg.set(l,p);let d=Bg.get(c)??0;he.set(wo,{currentRoute:i.route,currentTemplate:i.templateName,nextRoute:e,nextTemplate:t});let f=!1,h=he.watch(wo,()=>{f=!0});Mg(),he.set(cn,{route:e,templateName:t}),he.set(ln,o);let y=_n({hash:e}),b=n||y?.skipTransition,T=y?.props??{},_=await y?.layout?.({params:o,props:T})??"",S=Ag(),E=s.cloneNode(!0);S&&E&&!b&&(await S({oldNode:E,oldRoute:i.route,newRoute:e,oldTemplateName:i.templateName,newTemplateName:t}),s?.parentNode?.insertBefore(E,s)),s.replaceChildren(),Fg(),ro({stringDOM:_,parent:s,position:"afterbegin"}),await Ms({element:s}),b||(s.style.visibility=""),f||he.set(un,{currentRoute:e,currentTemplate:t,previousRoute:i.route,previousTemplate:i.templateName}),Dg()&&r?scrollTo(0,d):scrollTo(0,0),document.body.dataset.route=e,document.body.dataset.template=t;let C=Og();C&&!b&&(await C({oldNode:E,newNode:s,oldRoute:i.route,newRoute:e,oldTemplateName:i.templateName,newTemplateName:t}),E.remove()),E=null,h?.(),he.set(Qt,!1)};var jg=({route:e})=>e,zg=e=>{jg=e},Hg=({route:e})=>{let t=jg({route:e});return{route:t,isRedirect:t!==e}};var Ug=({hash:e=""})=>{let t=ia(),r=cf();return e===""?t:_n({hash:e})?e:r},Gg=({hash:e=""})=>_n({hash:e})?.templateName??"",qg=({hash:e=""})=>_n({hash:e})?.restoreScroll??!0;var Jg="",Yg=!0,Mr="",Xg="",io,Ql,ks,Zl=e=>e.replace("?","").replace("/",""),Kg=e=>e.replace("#","").replace("/","").replace(".",""),Gw=e=>e.split("&").reduce((t,r)=>{let o=r.split("="),n=Zl(o?.[0]??""),s=o?.[1];return n&&n.length>0?{...t,[n]:s}:t},{}),qw=e=>e&&Object.entries(e).reduce((t,[r,o],n)=>`${t}${n===0?"":"&"}${r}=${o}`,"");document.addEventListener("click",e=>{if(!e.target)return;e.target.closest("a")&&he.getProp(Qt)&&e.preventDefault()},{passive:!1});var Ea=async({shouldLoadRoute:e=!0}={})=>{let t=globalThis.location.hash,r={hash:t},{routeIsLoading:o}=he.get();if(o){globalThis.location.hash=Jg.replace("#","");return}ks||history.replaceState({nextId:r},"",t);let{route:n,isRedirect:s}=Hg({route:t});s&&history.replaceState({nextId:r},"",`#${n}`);let i=n.split("?"),a=Zl(i?.[1]??"");Xg=Mr,Mr=Kg(i?.[0]??"");let c=Gw(io??a),l=io||Object.keys(a).length>0?`?${io??a}`:"";io=void 0;let p=Ug({hash:Mr}),d=Gg({hash:Mr&&Mr.length>0?Mr:ia()}),f=Mr===Xg&&l.length===0&&!Yg;e&&!f&&(Jg=`#${Mr}${l}`,await Wg({route:p,templateName:d,isBrowserNavigation:qg({hash:Mr})&&!!ks,params:c,skipTransition:!!(ks??Ql)})),e||(he.set(cn,{route:p,templateName:d}),he.set(ln,c)),Ql=void 0,u.useNextLoop(()=>{Yg=!1})},Qg=()=>{Ea(),globalThis.history.scrollRestoration="manual",globalThis.addEventListener("popstate",e=>{ks=e?.state?.nextId}),globalThis.addEventListener("hashchange",async()=>{await to(),Ea()})},Zg=({url:e,params:t,skipTransition:r})=>{if(!e||he.getProp(Qt))return;Ql=r;let o=e.split("?"),n=Kg(o?.[0]??""),s=qw(t),i=Zl(o?.[1]??""),a=s??i;io=a.length>0?a:"",ks=void 0,globalThis.location.hash=io&&io.length>0?`${n}?${io}`:n,globalThis.dispatchEvent(new HashChangeEvent("hashchange"))};var eb=async({rootId:e,wrapper:t,contentId:r,routes:o=[],afterInit:n=()=>{},redirect:s=({route:f})=>f,index:i="home",pageNotFound:a="pageNotFound",beforePageTransition:c,pageTransition:l,restoreScroll:p=!0,componentDefaultProps:d={scoped:!1,maxParseIteration:1e4,debug:!1}})=>{Qh(d);let f=document.querySelector(e),h=await t();zg(s),!(!r||!f)&&(Fd({contentId:r}),Lf({element:f}),Pg({fn:l}),Ng({fn:c}),Lg(p),Ig(),qh(),nf(o),sf({hash:i}),af({hash:a}),ro({stringDOM:h,parent:f,position:"afterbegin"}),Bd(),Ea({shouldLoadRoute:!1}),await Ms({element:f,persistent:!0}),u.useFrameIndex(()=>{u.useNextTick(()=>{n()})},5),Qg())};var tb=()=>ye.size;var rb=()=>G.size;var ce={};_o(ce,{clamp:()=>ot,getDefault:()=>nI,mq:()=>iI,printDefault:()=>sI,setDefault:()=>oI});var Lo={default:{tension:20,mass:1,friction:5,velocity:0,precision:.01},gentle:{tension:120,mass:1,friction:14,velocity:0,precision:.01},wobbly:{tension:180,mass:1,friction:12,velocity:0,precision:.01},bounce:{tension:200,mass:3,friction:5,velocity:0,precision:.01},scroller:{tension:10,mass:1,friction:5,velocity:0,precision:.5}};var fe={easeLinear:"easeLinear",easeInQuad:"easeInQuad",easeOutQuad:"easeOutQuad",easeInOutQuad:"easeInOutQuad",easeInCubic:"easeInCubic",easeOutCubic:"easeOutCubic",easeInOutCubic:"easeInOutCubic",easeInQuart:"easeInQuart",easeOutQuart:"easeOutQuart",easeInOutQuart:"easeInOutQuart",easeInQuint:"easeInQuint",easeOutQuint:"easeOutQuint",easeInOutQuint:"easeInOutQuint",easeInSine:"easeInSine",easeOutSine:"easeOutSine",easeInOutSine:"easeInOutSine",easeInExpo:"easeInExpo",easeOutExpo:"easeOutExpo",easeInOutExpo:"easeInOutExpo",easeInCirc:"easeInCirc",easeOutCirc:"easeOutCirc",easeInOutCirc:"easeInOutCirc",easeInElastic:"easeInElastic",easeOutElastic:"easeOutElastic",easeInOutElastic:"easeInOutElastic",easeInBack:"easeInBack",easeOutBack:"easeOutBack",easeInOutBack:"easeInOutBack",easeInBounce:"easeInBounce",easeOutBounce:"easeOutBounce",easeInOutBounce:"easeInOutBounce"},Ps="min",ob="max",tu="desktop",As="easeLinear",Rs="default",ru={xSmall:320,small:360,medium:600,tablet:768,desktop:992,large:1200,xLarge:1600,xxLarge:1980},ou=10,Ns=.06,nu="#ff0000",su="#14df3b",iu=8,au=10,cu=1e3,lu=!1,Yw=!1,Xw=!1,Kw=.01,Qw=.06,nb=e=>{let t=Ue({prop:"deferredNextTick",value:e?.deferredNextTick,defaultValue:u.store.getProp("deferredNextTick"),type:Boolean}),r=Ue({prop:"usePassive",value:e?.usePassive,defaultValue:u.store.getProp("usePassive"),type:Boolean}),o=Ue({prop:"throttle",value:e?.throttle,defaultValue:u.store.getProp("throttle"),type:Number}),n=Zw(e?.mq??{}),s=Ue({prop:"defaultMq.value",value:e?.defaultMq?.value,defaultValue:tu,type:String}),i=Ue({prop:"defaultMq.type",value:e?.defaultMq?.type,defaultValue:Ps,type:String}),a=Ue({prop:"sequencer.duration",value:e?.sequencer?.duration,defaultValue:ou,type:Number}),c=eu(e?.sequencer?.ease,"sequencer"),l=Ue({prop:"scrolTrigger.springConfig",value:e?.scrollTrigger?.springConfig,defaultValue:Rs,type:String}),p=Ue({prop:"scrolTrigger.lerpConfig",value:e?.scrollTrigger?.lerpConfig,defaultValue:Ns,type:Number}),d=Ue({prop:"scrolTrigger.markerColor.startEnd",value:e?.scrollTrigger?.markerColor?.startEnd,defaultValue:nu,type:String}),f=Ue({prop:"scrolTrigger.markerColor.item",value:e?.scrollTrigger?.markerColor?.item,defaultValue:su,type:String}),h=Ue({prop:"parallax.defaultRange",value:e?.parallax?.defaultRange,defaultValue:iu,type:Number}),y=Ue({prop:"parallax.springConfig",value:e?.parallax?.springConfig,defaultValue:Rs,type:String}),b=Ue({prop:"parallax.lerpConfig",value:e?.parallax?.lerpConfig,defaultValue:Ns,type:Number}),T=Ue({prop:"parallaxTween.duration",value:e?.parallaxTween?.duration,defaultValue:au,type:Number}),_=eu(e?.parallaxTween?.ease,"parallaxTween"),S=Ue({prop:"tween.duration",value:e?.tween?.duration,defaultValue:cu,type:Number}),E=eu(e?.tween?.ease,"tween"),C=Ue({prop:"tween.relative",value:e?.tween?.relative,defaultValue:lu,type:Boolean}),M=Ue({prop:"spring.relative",value:e?.spring?.relative,defaultValue:Yw,type:Boolean}),I=Ue({prop:"lerp.relative",value:e?.lerp?.relative,defaultValue:Xw,type:Boolean}),P=Ue({prop:"lerp.precision",value:e?.lerp?.precision,defaultValue:Kw,type:Number}),k=Ue({prop:"lerp.velocity",value:e?.lerp?.velocity,defaultValue:Qw,type:Number});return{deferredNextTick:t,throttle:o,usePassive:r,mq:n,defaultMq:{value:s,type:i},sequencer:{duration:a,ease:c},scrollTrigger:{springConfig:l,lerpConfig:p,markerColor:{startEnd:d,item:f}},parallax:{defaultRange:h,springConfig:y,lerpConfig:b},parallaxTween:{duration:T,ease:_},tween:{duration:S,ease:E,relative:C},spring:{relative:M,config:e?.spring?.config?{...Lo,...e.spring.config}:Lo},lerp:{relative:I,precision:P,velocity:k}}},Ue=({prop:e,value:t,defaultValue:r,type:o})=>{let n=u.checkType(o,t);return n||console.warn(`handleSetUp error: ${e}: ${t}, is not valid must be a ${u.getTypeName(o)}`),n?t:r},Zw=e=>{let t=u.checkType(Object,e)&&Object.values(e).every(r=>u.checkType(Number,r));return t||console.warn("handleSetUp error: mq must be an object as { ..., String: Number }"),t?e:ru},eu=(e,t)=>{let r=Object.keys(fe).includes(e);return!r&&e!==void 0&&e!==null&&console.warn(`handleSetUp error: ${t}.ease properties is not valid`),r?e:As};var at=(e,t,r=!0)=>{e=(n=>{let s;try{s=JSON.parse(JSON.stringify(n))}catch{s=Object.assign({},n)}return s})(e);let o=n=>n&&typeof n=="object";return!o(e)||!o(t)?t:(Object.keys(t).forEach(n=>{let s=e[n],i=t[n];Array.isArray(s)&&Array.isArray(i)?r?(e[n]=s.map((a,c)=>i.length<=c?a:at(a,i[c],r)),i.length>s.length&&(e[n]=e[n].concat(i.slice(s.length)))):e[n]=s.concat(i):o(s)&&o(i)?e[n]=at(Object.assign({},s),i,r):e[n]=i}),e)};function sb(){return{deferredNextTick:u.store.getProp("deferredNextTick"),throttle:u.store.getProp("throttle"),usePassive:u.store.getProp("usePassive"),mq:ru,defaultMq:{value:tu,type:Ps},sequencer:{duration:ou,ease:As},scrollTrigger:{springConfig:Rs,lerpConfig:Ns,markerColor:{startEnd:nu,item:su}},parallax:{defaultRange:iu,springConfig:Rs,lerpConfig:Ns},parallaxTween:{duration:au,ease:As},tween:{duration:cu,ease:As,relative:lu},spring:{relative:!1,config:Lo},lerp:{relative:!1,precision:.01,velocity:.06}}}var ae=(()=>{let e=sb();return{set:n=>{e=nb(at(sb(),n)),"usePassive"in n&&u.store.set("usePassive",e.usePassive),"deferredNextTick"in n&&u.store.set("deferredNextTick",e.deferredNextTick),"throttle"in n&&u.store.set("throttle",e.throttle)},get:n=>(n in e||console.warn(`handleSetUp: ${n} is not a setup propierties`),e[n]),print:()=>{console.log("Writable props:"),console.log(e)}}})();var eI=(e="desktop")=>window.innerWidth<ae.get("mq")[e],tI=(e="desktop")=>window.innerWidth>=ae.get("mq")[e],rI=(e="desktop")=>ae.get("mq")[e],be={max:eI,min:tI,getBreackpoint:rI};var _e=e=>{if(u.checkType(Number,e))return Math.round(e*1e4)/1e4||0;if(Math.abs(e)<1){let t=Number.parseInt(e.toString().split("e-")[1]);t&&(e*=Math.pow(10,t-1),e="0."+Array.from({length:t}).join("0")+e.toString().slice(2))}else{let t=Number.parseInt(e.toString().split("+")[1]);t>20&&(t-=20,e/=Math.pow(10,t),e+=Array.from({length:t+1}).join("0"))}return Number.parseFloat(Number.parseFloat(e).toFixed(4))},ot=(e,t,r)=>Math.min(Math.max(e,t),r),ib=(e,t,r)=>(1-r)*e+r*t,ao=(e,t)=>{let r=Object.keys(e).toSorted(),o=Object.keys(t).toSorted();return r.length===o.length&&r.every((n,s)=>n===o[s])},Os=(e,t)=>{let r=[];for(let o=0;o<e.length;o+=t){let n=e.slice(o,o+t);r.push(n)}return r},ab=(e,t)=>e.map(r=>r[t]);function oI(e){ae.set(e)}function nI(e){return ae.get(e)}function sI(){ae.print()}function iI(e,t){switch(e){case"min":return be.min(t);case"max":return be.max(t);case"get":return be.getBreackpoint(t)}}var H={};_o(H,{createLerp:()=>_I,createMasterSequencer:()=>vI,createScrollerTween:()=>gI,createSequencer:()=>bI,createSpring:()=>SI,createStaggers:()=>yI,createTimeTween:()=>TI});var wa=e=>e.map(t=>(t.settled||(t.fromValue=t.currentValue),t)),kr=e=>e.map(t=>(t.fromValue=t.toValue,t.currentValue=t.toValue,t)),Rn=e=>e.map(t=>(t.toValue=t.currentValue,t.fromValue=t.currentValue,t)),Rr=(e,t)=>{let r=Object.keys(e);return t.map(o=>{if(r.includes(o.prop)){let n=o.fromValue,s=o.toValue;o.fromValue=s,o.toValue=n}return o})},Nn=(e,t)=>e.map(r=>(r.toValue=t?r.toValue+r.currentValue:r.toValue,r));var uu=(e,t)=>e.map(r=>(r.shouldUpdate&&(r.toValProcessed=t?r.toValue+1e-5:r.toValue-r.fromValue+1e-5),r));var Ia="radial",cr="start";var Pn="center",An="edges",On="random",cb="MERGE_FROM_UP",pu="MERGE_FROM_DOWN",Do="equal",Fo="start";var Bo="center",$n={type:Do,each:0,waitComplete:!1,from:cr,grid:{col:1,row:1,direction:"col"}},Je={index:0,frame:0};var v={PX:"px",VH:"vh",VW:"vw",WPERCENT:"w",HPERCENT:"h",DEGREE:"deg",PLUS_HEIGHT:"+height",PLUS_HEIGHT_HALF:"+halfHeight",PLUS_WIDTH:"+width",PLUS_WIDTH_HALF:"+halfWidth",MINUS_HEIGHT:"-height",MINUS_HEIGHT_HALF:"-halfHeight",MINUS_WIDTH:"-width",MINUS_WIDTH_HALF:"-halfWidth",POSITION_BOTTOM:"bottom",POSITION_TOP:"top",POSITION_LEFT:"left",POSITION_RIGHT:"right",DIRECTION_VERTICAL:"vertical",DIRECTION_HORIZONTAL:"horizontal",TYPE_PARALLAX:"parallax",TYPE_SCROLLTRIGGER:"scrolltrigger",PROP_VERTICAL:"y",PROP_HORIZONTAL:"x",PROP_ROTATE:"rotate",PROP_ROTATEY:"rotateY",PROP_ROTATEX:"rotateX",PROP_ROTATEZ:"rotateZ",PROP_OPACITY:"opacity",PROP_SCALE:"scale",PROP_SCALE_X:"scaleX",PROP_SCALE_Y:"scaleY",PROP_TWEEN:"tween",TWEEN_TWEEN:"parallaxTween",TWEEN_TIMELINE:"sequencer",ALIGN_START:"start",ALIGN_TOP:"top",ALIGN_RIGHT:"right",ALIGN_CENTER:"center",ALIGN_BOTTOM:"bottom",ALIGN_LEFT:"left",ALIGN_END:"end",IN_STOP:"in-stop",IN_BACK:"in-back",OUT_STOP:"out-stop",OUT_BACK:"out-back",EASE_SPRING:"spring",EASE_LERP:"lerp",EASE_PRECISION:.001,SCROLL_UP:"up",SCROLL_DOWN:"down",ON_LEAVE:"ON_LEAVE",ON_LEAVE_BACK:"ON_LEAVE_BACK",ON_ENTER:"ON_ENTER",ON_ENTER_BACK:"ON_ENTER_BACK",ON_NOOP:"ON_NOOP"};var Nr=e=>e.map(t=>`${t} | `).join(""),co=(e,t,r)=>{console.warn(`${e}: ${JSON.stringify(t)} and to ${JSON.stringify(r)} is not equal`)},At=e=>{console.warn(`stagger col of grid is out of range, it must be less than ${e} ( staggers length )`)},Pr=e=>{console.warn(`tween | sequencer: ${e} is not valid value, must be a number or a Function that return a number`)},lb=e=>{console.warn(`sequencer, start option: ${e} value is not valid, must be a Number`)},ub=e=>{console.warn(`sequencer, end option: ${e} value is not valid, must be a Number`)},pb=()=>{console.warn("relative prop is not allowed inside a timeline")},mb=e=>{console.warn(`Timeline Supend: ${e()} is not a valid value, must be a boolean`)},db=()=>{console.warn("SyncTimeline: in revese ( or yoyo mode) only goTo || goFromTo || set action is allowed. Using goFrom makes no sense in this context. Enable forceFromTo to use from action in reverse mode")},hb=e=>{console.warn(`timeline setTween: ${e} is not an array of tween`)},fb=e=>{console.warn(`timeline setTween: ${e} is not a string`)},gb=e=>{console.warn(`asyncTimeline.setTween() label: ${e} not found`)},bb=()=>{console.warn("setTween fail")},vb=e=>{console.warn(`label ${e} not founded`)},yb=e=>{console.warn(`sequencer.add(fn,time) ${e}: fn must be Function`)},Tb=e=>{console.warn(`sequencer.add(fn,time) ${e}: time must be a Number`)},mu=e=>{console.warn(`${e} doesn't exist in spring configuration list`)},Sb=()=>{console.warn("Spring configProps: all prop must be a positive Number")},_b=e=>{console.warn(`Spring config: ${e}: config must have friction/mass/precision/tesnion props and must be a number`)},Vo=e=>{console.warn(`${e} doesn't exist in tweens ease function`)},Ma=()=>{console.warn("stagger each must be a Number ")},xb=e=>{console.warn(`stagger, row/col: ${e} value is not valid, must be a Number`)},Cb=()=>{console.warn("Stagger error: waitComplete propierties must be a Boolean")},Eb=()=>{console.warn("Stagger error: in grid option direction should be a string radial/col/row")};var wb=()=>{console.warn("Stagger error: in col/row direction 'from' propierties must be a string start/end/center/edges or a number")},Ib=e=>{console.warn(`Stagger error: from: ${e} is not a valid value, must be a string start/end/center/edges or a number or a Object {x:Number,y:Number}`)},Mb=e=>{console.warn(`duration error: ${e} is not valid duration must be a number`)},kb=e=>{console.warn(`duration error: ${e} is not valid duration must be a number or a Function that return a number`)},Rb=e=>{console.warn(`repeat error: ${e} is not valid repeat value must be a Number`)};var Nb=e=>{console.warn(`data inizializiation error; ${e} is not a valid value, must be a string`)},Pb=e=>{console.warn(`data inizializiation error; ${e} is not a valid value, must be a number`)},Ab=()=>{console.warn("createStaggers error: items array can not be empty")},Ob=()=>{console.warn("createStaggers error: each element of the array must be an Element or an Object")},$b=()=>{console.warn(`screateStaggers error: type should be: ${Do} || ${cr} || ${"end"} || ${Bo}`)},Lb=e=>{console.warn(`createStagger:  each must be between 1 and ${e}`)},Db=(e,t)=>{console.warn(`${t}: relative prop: ${e} is not a valid parameter, must be a boolean `)},du=(e,t)=>{console.warn(`${t}: '${e}' is not Boolean`)},Fb=(e,t)=>{console.warn(`${t}: '${e}' is not String`)},Bb=(e,t)=>{console.warn(`${t}: '${e}' is not Number`)},Vb=(e,t)=>{console.warn(`${t}: '${e}' is not Function`)},Wb=()=>{console.warn("Lerp error: velocity is not valid, must be a Number greater than 0 and less than 1")},jb=()=>{console.warn("Lerp error: precision is not valid, must be a number greater than 0")},Dn=e=>{console.warn(`asyncTimeline error: ${e} cannot be used inside group`)},zb=e=>{console.warn(`${e} value must be a string`)},Hb=()=>{console.warn("tween added to asyncTimeline or used inside sync() method must be instance of HandleLerp | HandleTween | HandleSpring")},Ub=()=>{console.warn("asyncTimeline arror: delay must be a Number")},Gb=e=>{console.warn(`${e} not found`)},qb=e=>{console.warn(`timeline add async function, ${e} is not a function `)},Jb=(e,t)=>{console.warn(`${t} direction: ${e} is not valid value: must be ${v.DIRECTION_VERTICAL} | ${v.DIRECTION_HORIZONTAL}`)},Yb=e=>{console.warn(`scrollTrigger error; ${e} propierties: value must be a Object like { position: top|bottom|left|right, value: () => { return Number} } `)},Xb=()=>{console.warn("scrollTrigger error; dynamicRange propierties: value must be a Function that return a Number")},Kb=()=>{console.warn("parallax|scrolTrigger error: tween is not valid, must be an instance of HandleSequencer || ParallaxTween")},Qb=(e,t)=>{console.warn(`parallax error align propierties: ${e} is not valid must be one of ${Nr(t)} or a Number between 0 and 100`)},Zb=(e,t)=>{console.warn(`parallax error align propierties: ${e} is not valid must be one of ${Nr(t)}`)},ev=(e,t)=>{console.warn(`${t}: '${e}' is not Number, must be a number between 0 and 100`)},tv=(e,t)=>{console.warn(`parallax error type propierties: ${e} is not valid must be one of ${Nr(t)}`)},rv=(e,t)=>{console.warn(`parallax/scrollTrigger error propierties props: ${e} is not valid must be one of ${Nr(t)} or a custom css propierites like margin|line-height|...`)},ov=(e,t)=>{console.warn(`parallax error easeType props: ${e} is not valid must be one of ${Nr(t)}`)},nv=(e,t,r)=>{console.warn(`${r} error easeType props: ${e} is not valid must be one of ${Nr(t)}`)},sv=()=>{console.warn('Scrolltrigger warning: spring animation is only available for native properties and scrollerTween, Check that with the "propierties" property set to "tween" no HandleSequencer is associated with the "tween" property')},iv=(e,t)=>{console.warn(`parallax/scrollTrigger error springConfig props: ${e} is not valid must be one of ${Nr(t)}`)},av=e=>{console.warn(`parallax error range propierties, current value: ${e}, the value must be a number between 0 and 9.99`)},cv=e=>{console.warn(`scrollTrigger error range propierties: ${e} is not a String`)},hu=(e,t,r,o)=>{console.warn(`${o} error ${r} propierties: ${e} is not valid must be one of ${Nr(t)}`)},lv=()=>{console.warn("Parallax warning: if propierties is a tween the only choice is ParallaxTween, HandleSequencer or empty tween propierites is not allowed inside a parallax")},uv=()=>{console.warn("parallax/ScrollTrrigger error: velocity is not valid, must be a Number greater than 0 and less than 1")},pv=()=>{console.warn('parallax/ScrollTrrigger warning:  The property is "tween" but no tween has been associated, associate a tween with the "tween" property')},mv=()=>{console.warn('parallax/ScrollTrrigger: there is tween associated but pros "propierties" is not set to "tween"')},dv=(e,t)=>{console.warn(`${e}: ${t} is not a function`)},fu=(e,t,r)=>{console.warn(`scrollTrigger error range : with '${t}' propierties ${e} is not valid, add one of the following unit misure: ${Nr(r)}, es: 45deg|100px|50vw etc..`)},hv=e=>{console.warn(`scrollTrigger error range : with custom css propierties '${e}' no unit misure is necessary, the default unit misure will be used (px). Only '-' for negative value is allowed`)},fv=(e,t)=>{console.warn(`scrollTrigger error range : with '${t}' propierties ${e} is not valid no unit misure is necessary. Only '-' for negative value is allowed`)};var Ht={[fe.easeLinear]:(e,t,r,o)=>r*e/o+t,[fe.easeInQuad]:(e,t,r,o)=>r*(e/=o)*e+t,[fe.easeOutQuad]:(e,t,r,o)=>-r*(e/=o)*(e-2)+t,[fe.easeInOutQuad]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e+t:-r/2*(--e*(e-2)-1)+t,[fe.easeInCubic]:(e,t,r,o)=>r*(e/=o)*e*e+t,[fe.easeOutCubic]:(e,t,r,o)=>r*((e=e/o-1)*e*e+1)+t,[fe.easeInOutCubic]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e+t:r/2*((e-=2)*e*e+2)+t,[fe.easeInQuart]:(e,t,r,o)=>r*(e/=o)*e*e*e+t,[fe.easeOutQuart]:(e,t,r,o)=>-r*((e=e/o-1)*e*e*e-1)+t,[fe.easeInOutQuart]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e*e+t:-r/2*((e-=2)*e*e*e-2)+t,[fe.easeInQuint]:(e,t,r,o)=>r*(e/=o)*e*e*e*e+t,[fe.easeOutQuint]:(e,t,r,o)=>r*((e=e/o-1)*e*e*e*e+1)+t,[fe.easeInOutQuint]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e*e*e+t:r/2*((e-=2)*e*e*e*e+2)+t,[fe.easeInSine]:(e,t,r,o)=>-r*Math.cos(e/o*(Math.PI/2))+r+t,[fe.easeOutSine]:(e,t,r,o)=>r*Math.sin(e/o*(Math.PI/2))+t,[fe.easeInOutSine]:(e,t,r,o)=>-r/2*(Math.cos(Math.PI*e/o)-1)+t,[fe.easeInExpo]:(e,t,r,o)=>e===0?t:r*Math.pow(2,10*(e/o-1))+t,[fe.easeOutExpo]:(e,t,r,o)=>e===o?t+r:r*(-Math.pow(2,-10*e/o)+1)+t,[fe.easeInOutExpo]:(e,t,r,o)=>e===0?t:e===o?t+r:(e/=o/2)<1?r/2*Math.pow(2,10*(e-1))+t:r/2*(-Math.pow(2,-10*--e)+2)+t,[fe.easeInCirc]:(e,t,r,o)=>-r*(Math.sqrt(1-(e/=o)*e)-1)+t,[fe.easeOutCirc]:(e,t,r,o)=>r*Math.sqrt(1-(e=e/o-1)*e)+t,[fe.easeInOutCirc]:(e,t,r,o)=>(e/=o/2)<1?-r/2*(Math.sqrt(1-e*e)-1)+t:r/2*(Math.sqrt(1-(e-=2)*e)+1)+t,[fe.easeInElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o)===1?t+r:(s||(s=o*.3),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),-(i*Math.pow(2,10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s))+t)},[fe.easeOutElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o)===1?t+r:(s||(s=o*.3),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),i*Math.pow(2,-10*e)*Math.sin((e*o-n)*(2*Math.PI)/s)+r+t)},[fe.easeInOutElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o/2)===2?t+r:(s||(s=o*(.3*1.5)),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),e<1?-.5*(i*Math.pow(2,10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s))+t:i*Math.pow(2,-10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s)*.5+r+t)},[fe.easeInBack]:(e,t,r,o,n=1.70158)=>r*(e/=o)*e*((n+1)*e-n)+t,[fe.easeOutBack]:(e,t,r,o,n=1.70158)=>r*((e=e/o-1)*e*((n+1)*e+n)+1)+t,easeInOutBack:(e,t,r,o,n=1.70158)=>(e/=o/2)<1?r/2*(e*e*(((n*=1.525)+1)*e-n))+t:r/2*((e-=2)*e*(((n*=1.525)+1)*e+n)+2)+t,[fe.easeInBounce]:(e,t,r,o)=>r-Ht[fe.easeOutBounce](o-e,0,r,o)+t,[fe.easeOutBounce]:(e,t,r,o)=>(e/=o)<1/2.75?r*(7.5625*e*e)+t:e<2/2.75?r*(7.5625*(e-=1.5/2.75)*e+.75)+t:e<2.5/2.75?r*(7.5625*(e-=2.25/2.75)*e+.9375)+t:r*(7.5625*(e-=2.625/2.75)*e+.984375)+t,[fe.easeInOutBounce]:(e,t,r,o)=>e<o/2?Ht[fe.easeInBounce](e*2,0,r,o)*.5+t:Ht[fe.easeOutBounce](e*2-o,0,r,o)*.5+r*.5+t};var dt=e=>e in Ht?Ht[e]:(Vo(e),Ht[ae.get("tween").ease]);var gv=e=>e?e.replaceAll(/[\s#$()*+,.?[\\\]^{|}-]/g,String.raw`\$&`):"",gu=e=>/^[+-]?\d+(\.\d+)?$/.test(e),bv=e=>/^\d+\.\d+$|^\d+$/.test(e),Oe=(e,t)=>{let r=new RegExp(`^${gv(t)}$`,"i");return(e.match(r)||[]).length},lr=(e,t)=>{let r=new RegExp(`[0-9]${t}$`,"i");return(e.match(r)||[]).length},bu=(e,t)=>e.some(r=>{let o=new RegExp(`[0-9]${r}$`,"i");return(t.match(o)||[]).length}),vu=(e,t)=>e.some(r=>{let o=new RegExp(`^${gv(r)}$`,"i");return(t.match(o)||[]).length});var vv=e=>e&&(Oe(e,v.PROP_VERTICAL)?v.PROP_VERTICAL:Oe(e,v.PROP_HORIZONTAL)?v.PROP_HORIZONTAL:Oe(e,v.PROP_ROTATE)?v.PROP_ROTATE:Oe(e,v.PROP_ROTATEY)?v.PROP_ROTATEY:Oe(e,v.PROP_ROTATEX)?v.PROP_ROTATEX:Oe(e,v.PROP_OPACITY)?v.PROP_OPACITY:Oe(e,v.PROP_SCALE)?v.PROP_SCALE:Oe(e,v.PROP_SCALE_X)?v.PROP_SCALE_X:Oe(e,v.PROP_SCALE_Y)?v.PROP_SCALE_Y:Oe(e,v.PROP_TWEEN)?v.PROP_TWEEN:e),yv=e=>{if(e){if(lr(e,v.PX))return v.PX;if(lr(e,v.VH))return v.VH;if(lr(e,v.VW))return v.VW}return""},ka=e=>Oe(e,v.POSITION_TOP)?v.POSITION_TOP:Oe(e,v.POSITION_BOTTOM)?v.POSITION_BOTTOM:Oe(e,v.POSITION_LEFT)?v.POSITION_LEFT:Oe(e,v.POSITION_RIGHT)?v.POSITION_RIGHT:"",Tv=e=>lr(e,v.PX)?v.PX:lr(e,v.VH)?v.VH:lr(e,v.VW)?v.VW:lr(e,v.WPERCENT)?v.WPERCENT:lr(e,v.HPERCENT)?v.HPERCENT:lr(e,v.DEGREE)?v.DEGREE:v.PX;var Ut=e=>u.checkType(Number,e)||u.checkType(Function,e)&&u.checkType(Number,e()),Na=({start:e,end:t})=>{let r=u.checkType(Number,e),o=u.checkType(Number,t);return r||lb(e),o||ub(t),r&&o},lo=e=>{let t=u.checkType(Number,e);return!t&&e&&Mb(e),t?e:ae.get("sequencer").duration},Pa=e=>{let t=u.checkType(Number,e);return!t&&e&&Rb(e),t&&e?e:1},Sv=e=>{let t=e&&e in Ht;return!t&&e&&Vo(e),t?e:ae.get("sequencer").ease},_v=e=>{let t=e&&e in Ht;return!t&&e&&Vo(e),t?dt(e):dt(ae.get("parallaxTween").ease)},xv=(e,t)=>{let r=u.checkType(String,e),o=u.checkType(Number,t);return r||Nb(e),o||Pb(t),r&&o},Cv=e=>{if(!e)return;let t=u.checkType(Number,e);return t||Ma(),t},Ev=e=>{if(!e)return;let r=[cr,"end",Pn,An,On].includes(e),o=u.checkType(Number,e),n=u.checkType(Object,e),s=r||o||n;return s||Ib(e),s},Tu=e=>{if(!e)return;let t=u.checkType(Number,e);return t||xb(e),t},wv=e=>{if(!e)return;let r=[Ia,"row","col"].includes(e);return r||Eb(),r},Iv=e=>{if(!e)return;let t=u.checkType(Boolean,e);return t||Cb(),t},Mv=(e=[])=>{let t=u.checkType(Array,[...e])&&e.length>0;return t||Ab(),t},kv=(e=[])=>u.checkType(Array,[...e])&&e.length>0?e:[],Rv=e=>{if(!e)return;let r=[Do,Fo,"end",Bo].includes(e);if(!r){$b();return}return r};var uo=(e,t)=>{let r=u.checkType(Boolean,e);return!r&&e&&Db(e,t),r?e:ae.get(t).relative},Aa=e=>{let t=e&&e in Ht;return!t&&e&&Vo(e),t?dt(e):dt(ae.get("tween").ease)},Oa=e=>{let t=e&&e in Ht;return!t&&e&&Vo(e),t?e:ae.get("tween").ease},Su=e=>{let{config:t}=ae.get("spring"),r=e&&e in t,o=r?t[e]:{},s=(r?u.checkType(Object,o)&&"tension"in o&&"mass"in o&&"friction"in o&&"velocity"in o&&"precision"in o:!1)?Object.values(o).every(i=>u.checkType(Number,i)&&i>=0):null;return!r&&e&&mu(e),!s&&r&&_b(e),s?t[e]:t.default},Nv=e=>{let{config:t}=ae.get("spring"),r=e&&e in t;return!r&&e&&mu(e),r},_u=e=>{let t=u.checkType(Object,e)&&Object.values(e).every(r=>u.checkType(Number,r)&&r>=0);return!t&&e&&Sb(),t?e:{}},xu=e=>{let r=u.checkType(Function,e)?e():e,o=u.checkType(Number,r);return!o&&e&&kb(e),o?r:ae.get("tween").duration},Ot=(e,t)=>{let r=u.checkType(Boolean,e);return!r&&e&&du(e,t),r&&e===!0},le=(e,t,r)=>{let o=u.checkType(Boolean,e);return!o&&e&&du(e,t),o?e:r},$a=(e,t,r)=>{let o=u.checkType(String,e);return!o&&e&&Fb(e,t),o?e:r},ur=(e,t,r)=>{let o=u.checkType(Number,e);return!o&&e&&Bb(e,t),o?e:r},ct=(e,t,r)=>{let o=u.checkType(Function,e);return!o&&e&&Vb(e,t),o?e:r},La=e=>{let t=u.checkType(Number,e)&&e>0&&e<=1;return!t&&e&&Wb(),t?e:ae.get("lerp").velocity},Da=e=>{let t=u.checkType(Number,e);return!t&&e&&jb(),t?e:ae.get("lerp").precision},Pv=(e,t)=>{let r=u.checkType(String,e);return!r&&e&&zb(t),r},Ls=e=>{let t=u.checkType(Number,e);return!t&&e&&Ub(),t?e:void 0},Ds=e=>{let t=e?.getType?.()&&(e.getType()==="LERP"||e.getType()==="SPRING"||e.getType()==="TWEEN");return!t&&e&&Hb(),t},Av=(e,t)=>{e===-1&&Gb(t)},po=(e,t,r)=>{let o=u.checkType(Function,e);return!o&&e&&dv(r,e),o?e:t},Ov=e=>{let t=u.checkType(Function,e);return!t&&e&&qb(e),t?e:({resolve:r})=>{r()}},$v=e=>{let t=u.checkType(Array,e);return!t&&e&&hb(e),t},Lv=e=>{let t=u.checkType(String,e);return!t&&e&&fb(e),t},Fn=(e,t=!1)=>{let o=u.checkType(Element,e)?e:document.querySelector(e);return t?o??globalThis:o??document.createElement("div")},Cu=e=>u.checkType(Element,e)?e:document.querySelector(e),Fs=(e,t)=>{if(!e)return v.DIRECTION_VERTICAL;let o=[v.DIRECTION_VERTICAL,v.DIRECTION_HORIZONTAL].includes(e);return!o&&e&&Jb(e,t),o?e:v.DIRECTION_VERTICAL},Eu=(e,t)=>{let r=[v.POSITION_TOP,v.POSITION_LEFT,v.POSITION_RIGHT,v.POSITION_BOTTOM],o=u.checkType(Object,e),n=o&&u.checkType(String,e?.position)&&r.includes(e.position),s=o&&u.checkType(Function,e.value)&&u.checkType(Number,e.value()),i=o&&n&&s;return i||Yb(t),i?e:null},Dv=e=>{let t=u.checkType(Function,e)&&u.checkType(Number,e?.());return!t&&e&&Xb(),t?e:void 0},Fv=e=>{let t=e?.getType?.()&&(e.getType()===v.TWEEN_TWEEN||e.getType()===v.TWEEN_TIMELINE);return!t&&e&&Kb(),t?e:{}},Bv=e=>{if(!e&&e!==0)return v.ALIGN_CENTER;let t=[v.ALIGN_START,v.ALIGN_TOP,v.ALIGN_RIGHT,v.ALIGN_CENTER,v.ALIGN_BOTTOM,v.ALIGN_LEFT,v.ALIGN_END],r=t.includes(e)||u.checkType(Number,e);return!r&&e&&Qb(e,t),r?e:v.ALIGN_CENTER},Vv=e=>{if(!e)return!1;let t=[v.IN_BACK,v.IN_STOP,v.OUT_BACK,v.OUT_STOP],r=t.includes(e);return!r&&e&&Zb(e,t),r?e:!1},wu=(e,t,r)=>{if(e==null)return r;let o=u.checkType(Number,e);return!o&&e&&ev(e,t),o?e:r},Wv=e=>{if(!e)return v.TYPE_PARALLAX;let t=e?.toLowerCase(),r=[v.TYPE_PARALLAX,v.TYPE_SCROLLTRIGGER],o=r.includes(t);return!o&&t&&tv(t,r),o?t:v.TYPE_PARALLAX},jv=(e,t)=>(()=>{if(t===v.TYPE_PARALLAX){let o=bv(e),n=u.checkType(Number,Number(e))&&o&&e>=0&&e<10;return!n&&e&&av(e),n?10-e:10-ae.get("parallax").defaultRange}else{let o=u.checkType(String,e);return!o&&e&&cv(e),o?e:"0px"}})(),Wo=(e,t,r)=>{let o=ae.get("defaultMq").value;if(!e)return o;let n=ae.get("mq"),s=Object.keys(n),i=u.checkType(String,e)&&s.includes(e);return!i&&e&&hu(e,s,t,r),i?e:o},jo=(e,t,r)=>{let o=ae.get("defaultMq").type;if(!e)return o;let n=[ob,Ps],s=u.checkType(String,e)&&n.includes(e);return!s&&e&&hu(e,n,t,r),s?e:o},zv=(e,t,r,o)=>{if(!e&&o)return{propierties:v.PROP_VERTICAL,shouldTrackOnlyEvents:!0};if(!e&&r)return{propierties:v.PROP_VERTICAL,shouldTrackOnlyEvents:!1};let n=t===v.TYPE_SCROLLTRIGGER&&!e,s=[v.PROP_VERTICAL,v.PROP_HORIZONTAL,v.PROP_ROTATE,v.PROP_ROTATEY,v.PROP_ROTATEX,v.PROP_ROTATEZ,v.PROP_OPACITY,v.PROP_SCALE,v.PROP_SCALE_X,v.PROP_SCALE_Y,v.PROP_TWEEN],i=u.checkType(String,e);!i&&e&&rv(e,s);let a=t===v.TYPE_PARALLAX&&e===v.PROP_TWEEN&&!r;!r&&!o&&e===v.PROP_TWEEN&&pv(),(r||o)&&e!==v.PROP_TWEEN&&mv(),a&&lv();let c=a?v.PROP_VERTICAL:e,l=vv(c);return{propierties:i?l??v.PROP_VERTICAL:v.PROP_VERTICAL,shouldTrackOnlyEvents:n}},Hv=e=>{if(!e)return v.EASE_LERP;let t=[v.EASE_SPRING,v.EASE_LERP],r=t.includes(e);r||ov(e,t);let o=r?e:v.EASE_LERP;return r?e:o},Fa=(e,t)=>{let r=[v.EASE_SPRING,v.EASE_LERP],o=r.includes(e);return!o&&e&&nv(e,r,t),o?e:v.EASE_LERP},Uv=(e,t)=>{let r=t===v.TYPE_PARALLAX?ae.get("parallax").springConfig:ae.get("scrollTrigger").springConfig;if(!e)return r;let o=ae.get("spring").config,n=Object.keys(o),s=n.includes(e);return!s&&e&&iv(e,n),s?e:r},Gv=(e,t)=>{let r=u.checkType(Number,Number(e))&&e>0&&e<=1;!r&&e&&uv();let o=t===v.TYPE_PARALLAX?ae.get("parallax").lerpConfig:ae.get("scrollTrigger").lerpConfig;return r?e:o},qv=(e,t)=>{let r=[v.PX,v.VW,v.VH,v.WPERCENT,v.HPERCENT];if(t===v.PROP_VERTICAL||t===v.PROP_HORIZONTAL){let n=bu(r,e);return n||fu(e,t,r),n?e:"0px"}if(t===v.PROP_ROTATE||t===v.PROP_ROTATEX||t===v.PROP_ROTATEY||t===v.PROP_ROTATEZ){let n=bu([v.DEGREE],e);return n||fu(e,t,[v.DEGREE]),n?e:"0"}if(t===v.PROP_SCALE||t===v.PROP_SCALE_X||t===v.PROP_SCALE_Y){let n=gu(e);return n||fv(e,t),n?e:"0"}let o=gu(e);return o||hv(t),o?e:"0"};var Ba=e=>{let{instantFps:t}=u.store.get(),r=Math.round(e*(t/60));return e===1&&r===0?e:r},$t=e=>({type:Rv(e?.stagger?.type)?e.stagger.type:$n.type,each:Cv(e?.stagger?.each)?e.stagger.each:$n.each,from:Ev(e?.stagger?.from)?e?.stagger?.from:Fo,grid:{col:Tu(e?.stagger?.grid?.col)?e.stagger.grid.col:$n.grid.col,row:Tu(e?.stagger?.grid?.row)?e.stagger.grid.row:$n.grid.row,direction:wv(e?.stagger?.grid?.direction)?e.stagger.grid.direction:"col"},waitComplete:Iv(e?.stagger?.waitComplete)?e.stagger.waitComplete:$n.waitComplete}),pr=(e,t)=>e.length>t.length?e:t;var Bs=e=>e%2,aI=e=>Math.floor(Math.random()*e),cI=(e,t,r)=>{let o=new Set(e.slice(0,r).map(i=>i.frame));return e.map((i,a)=>a*t).filter(i=>!o.has(i))},lI=(e,t,r,o=[])=>{let{from:n,each:s}=r,i=Ba(s);if(n===On)return{index:e,frame:o[aI(o.length)]};if(n===cr)return{index:e,frame:e*i};if(n==="end")return{index:e,frame:(t-1-e)*i};if(n===Pn){let a=Math.trunc(t/2);return e>a?{index:e,frame:(e-a)*i}:e<a?Bs(t)===0&&a-e===1?{index:e,frame:0}:Bs(t)===0?{index:e,frame:(a-e-1)*i}:{index:e,frame:(a-e)*i}:{index:e,frame:0}}if(n===An){let a=Math.trunc(t/2);return e>a?{index:e,frame:(t-a-1-(e-a))*i}:e<a?Bs(t)===0&&a-e===1?{index:e,frame:(a-1)*i}:Bs(t)===0?{index:e,frame:(t-a-(a-e))*i}:{index:e,frame:(t-a-1-(a-e))*i}:Bs(t)?{index:e,frame:a*i}:{index:e,frame:(a-1)*i}}if(n&&Fe(Number,n)){let a=n>=t?t-1:n;return e>a?{index:e,frame:(e-a)*s}:e<a?{index:e,frame:(a-e)*s}:{index:e,frame:0}}return{index:0,frame:0}},Jv=(e,t,r)=>{if(t.grid.direction==="row"){let o=Os(e,r);return[...[...Array.from({length:t.grid.col}).keys()].reduce((s,i,a)=>[...s,...ab(o,a)],[])].flat()}else return e},Yv=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=r?.grid?.col<=1?e.length:r.grid.col,i=r?.grid?.row<=1?e.length:r.grid.row,c=Jv(e,r,s).map(b=>b&&b!==void 0?b:{index:0,frame:0}),p=Jv(t,r,s).map(b=>b&&b!==void 0?b:{index:0,frame:0}),d=r.grid.direction==="row"?i:s,f=Os(c,d),h=f[0];return h.forEach((b,T)=>{let{index:_,frame:S}=lI(T,f[0].length,r,cI(h,r.each,T));b.index=_,b.frame=S,S>=o.frame&&(o={index:_,frame:S}),S<=n.frame&&(n={index:_,frame:S})}),f.forEach(b=>{b.forEach((T,_)=>{T&&(T.index=f[0][_].index,T.frame=f[0][_].frame)})}),f.flat().forEach((b,T)=>{c[T].index=b.index,c[T].frame=b.frame,p.length>0&&(p[T].index=b.index,p[T].frame=b.frame)}),{staggerArray:c,staggerArrayOnComplete:p,fastestStagger:n,slowlestStagger:o}};var uI=(e,t,r)=>e.reduce((o,n,s)=>{let i=Math.abs(s-r),a=n.reduce((c,l,p)=>p<t-i||p>t+i?c:[...c,l],[]);return[...o,a]},[]),pI=(e,t,r,o)=>e.reduce((n,s,i)=>{let a=Math.abs(i-r),c=[];if(i>=r&&i<=r*2)return[...n,c];let l=t-a,p=t+a;for(let f=0;f<a;f++)Va(o,r+f,l)&&c.push(o[r+f][l]),Va(o,r+f,p)&&c.push(o[r+f][p]),f>0&&(Va(o,r-f,l)&&c.push(o[r-f][l]),Va(o,r-f,p)&&c.push(o[r-f][p]));let d=c.filter(f=>f!=null);return[...n,d]},[]),Va=(e,t,r)=>e[t]!==void 0&&e[t][r]!==void 0,Iu=(e,t)=>{let{col:r}=t.grid,{x:o,y:n}=t.from,s=Os(e,r);[...Array.from({length:r}).keys()].forEach(()=>{s.push([])});let i=uI(s,o,n),a=pI(i,o,n,s),c=i.reduce((h,y,b)=>{let T=[...i[b],...a[b]];return h.push(T),h},[]),l=c.length;return{cleanArray:((n>=l/2?cb:pu)===pu?c.reduce((h,y,b)=>{if(b<n)return h;if(b===n){let T=[...c[b]];return h.push(T),h}else{let T=c[n-(b-n)]??[],_=[...c[b],...T];return h.push(_),h}},[]):c.reduce((h,y,b)=>{if(b>n)return h;if(b===n){let T=[...c[b]];return h.push(T),h}else{let T=c[n+(n-b)]??[],_=[...c[b],...T];return h.push(_),h}},[]).toReversed()).reduce((h,y)=>y.length===0?h:[...h,y],[])}};var mI=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{u.checkType(Object,r?.from)||(r.from={}),u.checkType(Number,r?.from?.x)||(r.from={...r.from,x:0}),u.checkType(Number,r?.from?.y)||(r.from={...r.from,y:0});let{cleanArray:s}=Iu(e,r),i=0;s.forEach((p,d)=>{p.forEach(f=>{let h=Ba(r.each),y=d*h;f.index=i,f.frame=y,y>=o.frame&&(o={index:i,frame:y}),y<=n.frame&&(n={index:i,frame:y}),i++})});let a=(()=>{if(t.length>0){let{cleanArray:p}=Iu(t,r);return p.flat()}else return[]})(),c=s.flat(),l=a.flat();return c.forEach((p,d)=>{l.length>0&&(l[d].index=p.index,l[d].frame=p.frame)}),{staggerArray:c,staggerArrayOnComplete:l,fastestStagger:n,slowlestStagger:o}},dI=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=[cr,"end",Pn,An,On];return(!u.checkType(String,r?.from)&&!u.checkType(Number,r?.from)||u.checkType(String,r?.from)&&!s.includes(r?.from))&&(wb(),r.from=cr),Yv({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})},Lt=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=r?.grid?.direction===Ia?mI({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n}):dI({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n}),i=s.staggerArray,a=s.staggerArrayOnComplete,c=s.fastestStagger,l=s.slowlestStagger;return{staggerArray:i,staggerArrayOnComplete:a,fastestStagger:c,slowlestStagger:l}};var Bn=({stagger:e,callback:t,callbackCache:r,callBackObject:o,useStagger:n})=>{if(e.each===0||!n){u.useFrame(()=>{t.forEach(({cb:s})=>{s(o)})}),u.useFrame(()=>{r.forEach(({cb:s})=>{u.useCache.fireObject({id:s,obj:o})})});return}t.forEach(({cb:s,frame:i})=>{u.useFrameIndex(()=>{s(o)},i)}),r.forEach(({cb:s,frame:i})=>{u.useCache.update({id:s,callBackObject:o,frame:i})})},Vn=({onComplete:e,callback:t,callbackCache:r,callbackOnComplete:o,callBackObject:n,stagger:s,slowlestStagger:i,fastestStagger:a,useStagger:c})=>{if(s.each===0||!c){e(),u.useNextFrame(()=>{t.forEach(({cb:l})=>{l(n)}),r.forEach(({cb:l})=>{u.useCache.fireObject({id:l,obj:n})}),o.forEach(({cb:l})=>{l(n)})});return}t.forEach(({cb:l,frame:p},d)=>{u.useFrameIndex(()=>{if(s.waitComplete){d===i.index&&(l(n),e());return}d===a.index&&(l(n),e())},p)}),r.forEach(({cb:l,frame:p},d)=>{u.useFrameIndex(()=>{if(s.waitComplete){d===i.index&&(u.useCache.fireObject({id:l,obj:n}),e());return}d===a.index&&(u.useCache.fireObject({id:l,obj:n}),e())},p)}),o.forEach(({cb:l,frame:p})=>{u.useFrameIndex(()=>{l(n)},p+1)})};var Vs=u.createStore({id:0});var lt=(e,t)=>{let{id:r}=Vs.get(),o=[...t,{cb:e,id:r,index:-1,frame:-1}],n=r;return Vs.quickSetProp("id",r+1),{arrayOfCallbackUpdated:o,unsubscribeCb:s=>s.map(({id:i,cb:a,index:c,frame:l})=>(i===n&&(a=()=>{}),{id:i,cb:a,index:c,frame:l}))}},mr=(e,t,r,o)=>{let{id:n}=Vs.get(),{id:s,unsubscribe:i}=u.useCache.add(e,t),a=[...r,{cb:s,id:n,index:-1,frame:-1}];o.push(i);let c=n;return Vs.quickSetProp("id",n+1),{arrayOfCallbackUpdated:a,unsubscribeCache:o,unsubscribeCb:l=>(i(),l.map(({id:p,cb:d,index:f,frame:h})=>(p===c&&(d=""),{id:p,cb:d,index:f,frame:h})))}};var mo=e=>Object.keys(e).map(t=>{if(!Ut(e[t]))return Pr(`${t}: ${e[t]}`),{prop:t,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let r=u.checkType(Number,e[t])?e[t]:e[t]?.()??0;return{prop:t,toValue:r,toFn:e[t],toIsFn:u.checkType(Function,e[t]),settled:!1}}),Wn=e=>Object.keys(e).map(t=>{if(!Ut(e[t]))return Pr(`${t}: ${e[t]}`),{prop:t,fromValue:0,currentValue:0,fromFn:()=>0,fromIsFn:!1,settled:!1};let r=u.checkType(Number,e[t])?e[t]:e[t]?.()??0;return{prop:t,fromValue:r,currentValue:r,fromFn:e[t],fromIsFn:u.checkType(Function,e[t]),settled:!1}}),jn=(e,t)=>Object.keys(e).map(r=>{if(!Ut(t[r])||!Ut(e[r]))return Pr(`${r}: ${t[r]} || ${r}: ${e[r]}`),{prop:r,fromValue:0,fromFn:()=>0,fromIsFn:!1,currentValue:0,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let o=u.checkType(Number,e[r])?e[r]:e[r]?.()??0,n=u.checkType(Number,t[r])?t[r]:t[r]?.()??0;return{prop:r,fromValue:o,fromFn:e[r],fromIsFn:u.checkType(Function,e[r]),currentValue:o,toValue:n,toFn:t[r],toIsFn:u.checkType(Function,t[r]),settled:!1}}),Ar=e=>Object.keys(e).map(t=>{if(!Ut(e[t]))return Pr(`${t}: ${e[t]}`),{prop:t,fromValue:0,fromFn:()=>0,fromIsFn:!1,currentValue:0,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let r=u.checkType(Number,e[t])?e[t]:e[t]?.()??0;return{prop:t,fromValue:r,fromFn:e[t],fromIsFn:u.checkType(Function,e[t]),currentValue:r,toValue:r,toFn:e[t],toIsFn:u.checkType(Function,e[t]),settled:!1}});var zn=({validationFunction:e,defaultRafInit:t})=>{u.useFrame(()=>{u.useNextTick(({time:r,fps:o})=>{let n=e.findLast(({validation:s})=>s());if(t(r,o),n){n?.callback(),console.log("custom tween run function extrecuted");return}})})};var ho=(e,t)=>{console.log(`stagger on ${e} loaded at: ${t} fps`)};var Hn=(e,t,r,o)=>(u.checkType(Number,e)||Ma(),e>0&&t&&(r.length>0||o.length>0));var Wa=e=>{u.useFrame(()=>{u.useNextTick(({time:t,fps:r})=>{e(t,r)})})};var $e=(e,t)=>Object.fromEntries(e.map(r=>{let o=r[t];return[r.prop,typeof o=="number"?o:Number.parseFloat(o)]})),Un=e=>e.map(t=>t.toIsFn?{[t.prop]:t.toFn}:{[t.prop]:Number.parseFloat(t.toValue)}).reduce((t,r)=>({...t,...r}),{}),Gn=e=>e.map(t=>t.fromIsFn?{[t.prop]:t.fromFn}:{[t.prop]:Number.parseFloat(t.fromValue)}).reduce((t,r)=>({...t,...r}),{});var qn=(e,t)=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o}:r}),Mu=(e,t)=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o,shouldUpdate:!0}:{...r,shouldUpdate:!1}});var Xv=({values:e,fps:t,velocity:r,precision:o})=>e.map(n=>{if(n.settled)return n;let{currentValue:s,toValue:i}=n,a=ib(s,i,r/t*60),c=_e(a);return Number(Math.abs(i-c).toFixed(4))<=o?{...n,currentValue:i,settled:!0}:{...n,currentValue:c,settled:!1}});var Or=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#_;#y;#v;#T;#k;#S;constructor(t){this.#n=$t(t??{}),this.#t=uo(t?.relative,"lerp"),this.#i=La(t?.velocity),this.#l=Da(t?.precision),this.#d=u.getUnivoqueId(),this.#u=!1,this.#s=void 0,this.#c=void 0,this.#r=void 0,this.#e=[],this.#p=[],this.#a=[],this.#h=[],this.#f=[],this.#o=[],this.#g=[],this.#m=!1,this.#x=!0,this.#_=!0,this.#y=!1,this.#v=!1,this.#T={reverse:!1,velocity:this.#i,precision:this.#l,relative:this.#t,immediate:!1},this.#k=Je,this.#S=Je;let r=t?.data;r&&this.setData(r)}#w(t,r){this.#u=!0,this.#e=Xv({values:this.#e,fps:r,velocity:this.#i,precision:this.#l});let o=$e(this.#e,"currentValue");if(this.#m||Bn({stagger:this.#n,callback:this.#a,callbackCache:this.#h,callBackObject:o,useStagger:this.#_}),this.#e.every(s=>s.settled===!0)){let s=()=>{this.#u=!1,this.#e=[...this.#e].map(a=>({...a,fromValue:a.toValue})),this.#s?.(!0),this.#r=void 0,this.#c=void 0,this.#s=void 0,this.#m=!1,this.#u=!1},i=$e(this.#e,"toValue");Vn({onComplete:s,callback:this.#a,callbackCache:this.#h,callbackOnComplete:this.#f,callBackObject:i,stagger:this.#n,slowlestStagger:this.#k,fastestStagger:this.#S,useStagger:this.#_});return}u.useFrame(()=>{u.useNextTick(({time:s,fps:i})=>{this.#u&&this.#w(s,i)})})}#A(t,r){this.#w(t,r)}async#R(){if(Hn(this.#n.each,this.#x,this.#h,this.#a)){let{averageFPS:t}=await u.useFps();ho("lerp",t);let r=pr(this.#h,this.#a);if(this.#n.grid.col>r.length){At(r.length),this.#x=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=Lt({arrayDefault:r,arrayOnStop:this.#f,stagger:this.#n,slowlestStagger:this.#k,fastestStagger:this.#S});this.#h.length>this.#a.length?this.#h=o:this.#a=o,this.#f=n,this.#k=i,this.#S=s,this.#x=!1}return{ready:!0}}async#O(t,r){this.#v||(this.#s=t,this.#c=r,this.#x&&(this.#v=!0,await this.#R(),this.#v=!1),zn({validationFunction:this.#o,defaultRafInit:(o,n)=>this.#A(o,n)}))}clearCurretPromise(){this.#m||(this.#c?.(u.ANIMATION_STOP_REJECT),this.#r=void 0,this.#c=void 0,this.#s=void 0,this.#u=!1)}stop({clearCache:t=!0,updateValues:r=!0}={}){this.#m&&(this.#m=!1),r&&(this.#e=Rn(this.#e)),this.unFreezeStagger(),t&&this.#h.forEach(({cb:o})=>u.useCache.clean(o)),this.#c&&(this.#c(u.ANIMATION_STOP_REJECT),this.#r=void 0,this.#c=void 0,this.#s=void 0),this.#u=!1}freezeStagger(){this.#y||(this.#h.forEach(({cb:t})=>u.useCache.freeze(t)),this.#y=!0)}unFreezeStagger({updateFrame:t=!0}={}){this.#y&&(this.#h.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:t})),this.#y=!1)}pause(){this.#m||(this.#m=!0,this.#u=!1,this.#e=wa(this.#e),this.freezeStagger())}resume(){this.#m&&(this.#m=!1,this.unFreezeStagger(),!this.#u&&this.#s&&Wa((t,r)=>this.#A(t,r)))}setData(t){this.#e=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,fromValue:n,currentValue:n,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#p=this.#e.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#e=at(this.#e,this.#p)}#E(t){let r={...this.#T,...t},{velocity:o,precision:n,relative:s}=r;return this.#t=uo(s,"lerp"),this.#i=La(o),this.#l=Da(n),r}goTo(t,r={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#_=!0;let o=mo(t);return this.#N(o,t,r)}goFrom(t,r={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#_=!0;let o=Wn(t);return this.#N(o,t,r)}goFromTo(t,r,o={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);if(this.#_=!0,!ao(t,r))return co("lerp goFromTo:",t,r),new Promise(s=>s);let n=jn(t,r);return this.#N(n,t,o)}set(t,r={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#_=!1;let o=Ar(t);return this.#N(o,t,r)}setImmediate(t,r={}){if(this.#u&&this.stop({clearCache:!1,updateValues:!1}),this.#m)return;this.#_=!1;let o=Ar(t);this.#e=qn(o,this.#e);let{reverse:n}=this.#E(r??{});Ot(n,"reverse")&&(this.#e=Rr(t,this.#e)),this.#e=Nn(this.#e,this.#t),this.#e=kr(this.#e)}#N(t,r,o={}){this.#e=qn(t,this.#e);let{reverse:n,immediate:s}=this.#E(o??{});if(Ot(n,"reverse")&&(this.#e=Rr(r,this.#e)),this.#e=Nn(this.#e,this.#t),Ot(s,"immediate "))return this.#u&&this.stop({updateValues:!1}),this.#e=kr(this.#e),Promise.resolve();let i=!this.#u&&!this.#r;return i&&(this.#r=new Promise((a,c)=>{this.#O(a,c)})),i&&this.#r?this.#r:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return $e(this.#e,"currentValue")}getInitialData(){return $e(this.#p,"currentValue")}getFrom(){return $e(this.#e,"fromValue")}getTo(){return $e(this.#e,"toValue")}getFromNativeType(){return Gn(this.#e)}getToNativeType(){return Un(this.#e)}getType(){return"LERP"}getId(){return this.#d}isActive(){return this.#u}updateVelocity(t){this.#i=La(t),this.#T=at(this.#T,{velocity:this.#i})}updatePrecision(t){this.#i=Da(t),this.#T=at(this.#T,{precision:this.#l})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=lt(t,this.#a);return this.#a=r,()=>this.#a=o(this.#a)}subscribeCache(t,r){let{arrayOfCallbackUpdated:o,unsubscribeCb:n,unsubscribeCache:s}=mr(t,r,this.#h,this.#g);return this.#h=o,this.#g=s,()=>this.#h=n(this.#h)}validateInitialization({validation:t,callback:r}){let o=[...this.#o,{validation:t,callback:r}];return this.#o=o,()=>this.#o=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=lt(t,this.#f);return this.#f=r,()=>this.#f=o(this.#f)}destroy(){this.#r&&this.stop(),this.#f=[],this.#o=[],this.#a=[],this.#h=[],this.#e=[],this.#r=void 0,this.#g.forEach(t=>t()),this.#g=[]}};var ja=({each:e,useStagger:t,isLastDraw:r,callBackObject:o,callback:n,callbackCache:s,callbackOnStop:i})=>{e===0||t===!1?(u.useFrame(()=>{n.forEach(({cb:a})=>a(o))}),u.useFrame(()=>{s.forEach(({cb:a})=>{u.useCache.fireObject({id:a,obj:o})})})):(n.forEach(({cb:a,frame:c})=>{u.useFrameIndex(()=>a(o),c)}),s.forEach(({cb:a,frame:c})=>{u.useCache.update({id:a,callBackObject:o,frame:c})})),r&&(e===0||t===!1?u.useFrame(()=>{i.forEach(({cb:a})=>a(o))}):i.forEach(({cb:a,frame:c})=>{u.useFrameIndex(()=>a(o),c+1)}))};var Ws=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;constructor(t){this.#n=_v(t?.ease),this.#t=lo(t?.duration),this.#i=$t(t),this.#l=[],this.#d=[],this.#u=[],this.#s=[],this.#c=[],this.#r="parallaxTween";let r=t?.from||null;r&&this.setData(r),t?.to&&this.goTo(t.to)}inzializeStagger(){if(this.#i.each>0&&(this.#s.length>0||this.#u.length>0)){let t=pr(this.#s,this.#u);if(this.#i.grid.col>t.length){At(t.length);return}let{staggerArray:r,staggerArrayOnComplete:o}=Lt({arrayDefault:t,arrayOnStop:this.#d,stagger:this.#i,slowlestStagger:Je,fastestStagger:Je});this.#s.length>this.#u.length?this.#s=r:this.#u=r,this.#d=o}}draw({partial:t,isLastDraw:r}){this.#l=[...this.#l].map(n=>{let{toIsFn:s,toFn:i,toValue:a,fromIsFn:c,fromFn:l,fromValue:p}=n,d=s?i():a,f=c?l():p,h=d-f,y=this.#n(t,f,h,this.#t);return{...n,currentValue:_e(y)}});let o=$e(this.#l,"currentValue");u.useNextTick(()=>{ja({each:this.#i.each,useStagger:!0,isLastDraw:r,callBackObject:o,callback:this.#u,callbackCache:this.#s,callbackOnStop:this.#d})})}setData(t){let r=Object.entries(t);return this.#l=r.map(o=>{let[n,s]=o;return{prop:n,toValue:s,toValProcessed:s,fromValue:s,currentValue:s,settled:!1,fromFn:()=>0,toFn:()=>0}}),this}#e(t){this.#l=this.#l.map(r=>{let o=t.find(n=>n.prop===r.prop);return o?{...r,...o}:{...r}})}goTo(t){let r=mo(t);return this.#e(r),this}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=lt(t,this.#u);return this.#u=r,()=>this.#u=o(this.#u)}onStop(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=lt(t,this.#d);return this.#d=r,()=>this.#d=o(this.#d)}subscribeCache(t,r){let{arrayOfCallbackUpdated:o,unsubscribeCb:n,unsubscribeCache:s}=mr(t,r,this.#s,this.#c);return this.#s=o,this.#c=s,()=>this.#s=n(this.#s)}getDuration(){return this.#t}getType(){return this.#r}destroy(){this.#l=[],this.#d=[],this.#u=[],this.#s=[],this.#c.forEach(t=>t()),this.#c=[]}};var js=class{#n="sequencer";#t;constructor(){this.#t=[]}draw({partial:t,isLastDraw:r,useFrame:o}){this.#t.forEach(n=>{n.draw({partial:t,isLastDraw:r,useFrame:o})})}add(t){this.#t.push(t)}inzializeStagger(){this.#t.forEach(t=>{t.inzializeStagger()})}setDuration(t){this.#t.forEach(r=>{r.setDuration(t)})}getDuration(){return this.#t.length>0?this.#t[0].getDuration():0}setStretchFactor(t){this.#t.forEach(r=>{r.setStretchFactor(t)})}getLabels(){return this.#t.flatMap(t=>t.getLabels())}resetLastValue(){this.#t.forEach(t=>t.resetLastValue())}disableStagger(){this.#t.forEach(t=>{t.disableStagger()})}cleanCachedId(){this.#t.forEach(t=>{t.cleanCachedId()})}freezeCachedId(){this.#t.forEach(t=>{t.freezeCachedId()})}unFreezeCachedId(){this.#t.forEach(t=>{t.unFreezeCachedId()})}getType(){return this.#n}destroy(){this.#t.forEach(t=>{t.destroy()}),this.#t=[]}};var Kv=(e,t)=>Object.keys(e).map(r=>Ut(e[r])?{prop:r,toValue:e[r],ease:dt(t)}:(Pr(`${r}: ${e[r]}`),{prop:r,toValue:0,ease:dt(t)})),Qv=(e,t)=>Object.keys(e).map(r=>Ut(e[r])?{prop:r,fromValue:e[r],ease:dt(t)}:(Pr(`${r}: ${e[r]}`),{prop:r,fromValue:0,ease:dt(t)})),Zv=(e,t,r)=>Object.keys(e).map(o=>!Ut(t[o])||!Ut(e[o])?(Pr(`${o}: ${t[o]} || ${o}: ${e[o]}`),{prop:o,fromValue:0,toValue:0,ease:dt(r)}):{prop:o,fromValue:e[o],toValue:t[o],ease:dt(r)});var Ge={BACKWARD:"backward",FORWARD:"forward",NONE:"none"};var ku={fromValue:{get:"toValue",set:"fromValue"},toValue:{get:"toValue",set:"toValue"}},ey=(e,t,r,o)=>e.slice(0,t).reduceRight((n,{values:s})=>{let i=s.find(({prop:a,active:c})=>c&&a===r);return i&&!n&&n!==0?i[ku[o].get]:n},void 0),ty=(e,t,r,o)=>e.slice(t+1).reduce((n,{start:s,values:i})=>i.find(c=>c.prop===r&&c.active)&&s<=o?!1:n,!0);var ry=({timeline:e,valuesState:t,partial:r})=>t.map(o=>{let n=e.reduce((_,{start:S,end:E,values:C},M)=>{let I=C.find(({prop:F})=>F===o.prop);if(!I||!I?.active||Object.keys(_).length>0||o.settled)return _;let{prop:P,toValue:k,fromValue:O,ease:L}=I;return ty(e,M,P,r)?{toValue:k,fromValue:O,start:S,end:E,ease:L}:_},{});if(Object.keys(n).length===0)return o;let{start:s,end:i,toValue:a,fromValue:c,ease:l}=n,p=u.checkType(Number,a)?a:a(),d=u.checkType(Number,c)?c:c(),f=i-s,h=r<i?d:p,y=r>=s&&r<=i?l(r-s,d,p-d,f):h,b=Number.isNaN(y)?h:y,T=_e(b);return{...o,currentValue:T,settled:!0}});var Ru=({timeline:e,activeProp:t})=>e.map((r,o)=>{let{values:n,propToFind:s}=r,i=n.map(a=>{let{prop:c,active:l}=a;if(!l||!t.includes(c)||!s||s.length===0)return a;let p=ey(e,o,c,s);return!p&&p!==0?a:{...a,[ku[s].set]:p}});return{...r,values:i}});var Nu=(e,t)=>e.toSorted((r,o)=>r?.[t]-o?.[t]);var za=({timeline:e,values:t,start:r,end:o,duration:n,propToFind:s})=>{let i=e.length===0?0:1,a=[...e,{values:t,start:r??0,end:o??n,priority:i,propToFind:s}],c=Nu(a,"start");return Nu(c,"priority")};var Ha=({data:e,values:t})=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o,active:!0}:{prop:r.prop,active:!1}});var zs=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;constructor(t){this.#n=[],this.#t=[],this.#i=[],this.#l=[],this.#d=[],this.#u=[],this.#s=[],this.#c=[],this.#r=lo(t?.duration),this.#e="sequencer",this.#p={start:0,end:this.#r,ease:Sv(t?.ease)},this.#a=!0,this.#h=!0,this.#f="none",this.#o=0,this.#g=$t(t),this.#m=!0,this.#x=!1;let r=t?.data||null;r&&this.setData(r)}inzializeStagger(){if(!this.#x){if(this.#g.each>0&&(this.#d.length>0||this.#l.length>0)){let t=pr(this.#d,this.#l);if(this.#g.grid.col>t.length){At(t.length);return}let{staggerArray:r,staggerArrayOnComplete:o}=Lt({arrayDefault:t,arrayOnStop:this.#u,stagger:this.#g,slowlestStagger:Je,fastestStagger:Je});this.#d.length>this.#l.length?this.#d=r:this.#l=r,this.#u=o}this.#x=!0}}draw({partial:t=0,isLastDraw:r=!1,useFrame:o=!1,direction:n=Ge.NONE}){if(o){this.#_({partial:t,isLastDraw:r,direction:n});return}u.useNextTick(()=>this.#_({partial:t,isLastDraw:r,direction:n}))}#_({partial:t=0,isLastDraw:r=!1,direction:o=Ge.NONE}){this.#a&&(this.#o=t,this.#y(t)),!this.#a&&this.#o&&(!o||o===Ge.NONE)&&(this.#f=t>=this.#o?Ge.FORWARD:Ge.BACKWARD),!this.#a&&(o===Ge.BACKWARD||o===Ge.FORWARD)&&(this.#f=o),this.#n=[...this.#n].map(s=>({...s,settled:!1})),this.#n=ry({timeline:this.#t,valuesState:this.#n,partial:t});let n=$e(this.#n,"currentValue");ja({each:this.#g.each,useStagger:this.#m,isLastDraw:r,callBackObject:n,callback:this.#l,callbackCache:this.#d,callbackOnStop:this.#u}),this.#v(t),this.#m=!0,this.#o=t,this.#a=!1}resetLastValue(){this.#a=!0,this.#o=0}#y(t=0){this.#h&&(this.#s.forEach(({fn:r,time:o})=>{let n={shouldFire:t>=o,direction:Ge.FORWARD},s={shouldFire:t<=o,direction:Ge.BACKWARD};if(!(n.shouldFire||s.shouldFire))return;let a=n.shouldFire?n.direction:s.direction;r({direction:a,value:t,isForced:!0})}),this.#h=!1)}#v(t=0){this.#s.forEach(({fn:r,time:o})=>{let n=this.#f===Ge.FORWARD&&t>o&&this.#o<=o,s=this.#f===Ge.BACKWARD&&t<o&&this.#o>=o;(n||s)&&r({direction:this.#f,value:t,isForced:!1})})}setStretchFactor(t=0){let r=t/this.#r;this.#t=[...this.#t].map(o=>{let{start:n,end:s}=o;return{...o,start:_e(n*r),end:_e(s*r)}}),this.#i=[...this.#i].map(o=>{let{time:n}=o;return{...o,time:_e(n*r)}}),this.#s=[...this.#s].map(o=>{let{time:n}=o;return{...o,time:_e(n*r)}})}setData(t={}){return this.#n=Object.entries(t).map(r=>{let[o,n]=r,s=xv(o,n),i=s?n:0;return{prop:s?o:"invalidProp",toValue:i,fromValue:i,currentValue:i,active:!1,settled:!1,ease:dt(ae.get("sequencer").ease)}}),this.goTo(t,{start:0,end:0}),this}goTo(t,r){let o={...this.#p,...r},{start:n,end:s,ease:i}=o;if(!Na({start:n,end:s}))return this;let a=Kv(t,i),c=Ha({data:a,values:this.#n}),l=Object.keys(t),p=za({timeline:this.#t,values:c,start:n,end:s,duration:this.#r,propToFind:"fromValue"});return this.#t=Ru({timeline:p,activeProp:l}),this}goFrom(t,r){let o={...this.#p,...r},{start:n,end:s,ease:i}=o;if(!Na({start:n,end:s}))return this;let a=Qv(t,i),c=Ha({data:a,values:this.#n}),l=Object.keys(t),p=za({timeline:this.#t,values:c,start:n,end:s,duration:this.#r,propToFind:"toValue"});return this.#t=Ru({timeline:p,activeProp:l}),this}goFromTo(t,r,o){let n={...this.#p,...o},{start:s,end:i,ease:a}=n;if(!Na({start:s,end:i}))return this;if(!ao(t,r))return co("sequencer goFromTo:",t,r),this;let c=Zv(t,r,a),l=Ha({data:c,values:this.#n});return this.#t=za({timeline:this.#t,values:l,start:s,end:i,duration:this.#r,propToFind:""}),this}label(t="",r=0){return this.#i.push({name:t,time:r}),this}getLabels(){return this.#i}add(t=()=>{},r=0){let o=u.checkType(Function,t),n=u.checkType(Number,r),s=o&&n;return o||yb(t),n||Tb(r),s?(this.#s.push({fn:t,time:r}),this):this}subscribe(t=()=>{}){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=lt(t,this.#l);return this.#l=r,()=>this.#l=o(this.#l)}onStop(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=lt(t,this.#u);return this.#u=r,()=>this.#u=o(this.#u)}subscribeCache(t,r=()=>{}){let{arrayOfCallbackUpdated:o,unsubscribeCb:n,unsubscribeCache:s}=mr(t,r,this.#d,this.#c);return this.#d=o,this.#c=s,()=>this.#d=n(this.#d)}getDuration(){return this.#r}setDuration(t=0){this.#r=t}getType(){return this.#e}cleanCachedId(){this.#d.forEach(({cb:t})=>u.useCache.clean(t))}freezeCachedId(){this.#d.forEach(({cb:t})=>u.useCache.freeze(t))}unFreezeCachedId(){this.#d.forEach(({cb:t})=>u.useCache.unFreeze({id:t,update:!0}))}disableStagger(){this.#m=!1}destroy(){this.#n=[],this.#t=[],this.#l=[],this.#d=[],this.#u=[],this.#s=[],this.#c.forEach(t=>t()),this.#c=[]}};var oy=({values:e,tension:t,friction:r,mass:o,precision:n,fps:s})=>e.map(i=>{let{currentValue:a,toValue:c,velocity:l}=i,p=-t*(a-c),d=-r*l,f=(p+d)/o,h=l+f*1/s,y=a+h*1/s,b=_e(y),T=Math.abs(h)<=.1,_=t===0?!0:Math.abs(c-b)<=n;return T&&_?{...i,currentValue:c,velocity:h,settled:!0}:{...i,currentValue:b,velocity:h,settled:!1}});var Gt=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#_;#y;#v;#T;#k;constructor(t){this.#n=$t(t??{}),this.#t=uo(t?.relative,"spring"),this.#i=Su(t?.config),this.updateConfigProp(t?.configProps??{}),this.#l=u.getUnivoqueId(),this.#d=!1,this.#u=void 0,this.#s=void 0,this.#c=void 0,this.#r=[],this.#e=[],this.#p=[],this.#a=[],this.#h=[],this.#f=[],this.#o=[],this.#g=!1,this.#m=!0,this.#x=!0,this.#_=!1,this.#y=!1,this.#v={reverse:!1,configProps:this.#i,relative:this.#t,immediate:!1},this.#T=Je,this.#k=Je;let r=t?.data;r&&this.setData(r)}#S(t,r,o,n,s,i){this.#d=!0,this.#r=oy({values:this.#r,tension:o,friction:n,mass:s,precision:i,fps:r});let a=$e(this.#r,"currentValue");if(this.#g||Bn({stagger:this.#n,callback:this.#p,callbackCache:this.#a,callBackObject:a,useStagger:this.#x}),this.#r.every(l=>l.settled===!0)){let l=()=>{this.#r=[...this.#r].map(d=>({...d,fromValue:d.toValue})),this.#u?.(!0),this.#c=void 0,this.#s=void 0,this.#u=void 0,this.#g=!1,this.#d=!1},p=$e(this.#r,"toValue");Vn({onComplete:l,callback:this.#p,callbackCache:this.#a,callbackOnComplete:this.#h,callBackObject:p,stagger:this.#n,slowlestStagger:this.#T,fastestStagger:this.#k,useStagger:this.#x});return}u.useFrame(()=>{u.useNextTick(({time:l,fps:p})=>{this.#d&&this.#S(l,p,o,n,s,i)})})}#w(t,r){this.#r=[...this.#r].map(a=>({...a,velocity:Math.trunc(this.#i.velocity)}));let o=this.#i.tension,n=this.#i.friction,s=Math.max(1,this.#i.mass),i=this.#i.precision;this.#S(t,r,o,n,s,i)}async#A(){if(Hn(this.#n.each,this.#m,this.#a,this.#p)){let{averageFPS:t}=await u.useFps();ho("spring",t);let r=pr(this.#a,this.#p);if(this.#n.grid.col>r.length){At(r.length),this.#m=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=Lt({arrayDefault:r,arrayOnStop:this.#h,stagger:this.#n,slowlestStagger:this.#T,fastestStagger:this.#k});this.#a.length>this.#p.length?this.#a=o:this.#p=o,this.#h=n,this.#T=i,this.#k=s,this.#m=!1}return{ready:!0}}async#R(t,r){this.#y||(this.#u=t,this.#s=r,this.#m&&(this.#y=!0,await this.#A(),this.#y=!1),zn({validationFunction:this.#f,defaultRafInit:(o,n)=>this.#w(o,n)}))}clearCurretPromise(){this.#g||(this.#s?.(u.ANIMATION_STOP_REJECT),this.#c=void 0,this.#s=void 0,this.#u=void 0,this.#d=!1)}stop({clearCache:t=!0,updateValues:r=!0}={}){this.#g&&(this.#g=!1),r&&(this.#r=Rn(this.#r)),this.unFreezeStagger(),t&&this.#a.forEach(({cb:o})=>u.useCache.clean(o)),this.#s&&(this.#s(u.ANIMATION_STOP_REJECT),this.#c=void 0,this.#s=void 0,this.#u=void 0),this.#d=!1}freezeStagger(){this.#_||(this.#a.forEach(({cb:t})=>u.useCache.freeze(t)),this.#_=!0)}unFreezeStagger({updateFrame:t=!0}={}){this.#_&&(this.#a.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:t})),this.#_=!1)}pause(){this.#g||(this.#g=!0,this.#d=!1,this.#r=wa(this.#r),this.freezeStagger())}resume(){this.#g&&(this.#g=!1,this.unFreezeStagger(),!this.#d&&this.#u&&Wa((t,r)=>this.#w(t,r)))}setData(t){this.#r=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,fromValue:n,velocity:this.#i.velocity,currentValue:n,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#e=this.#r.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#r=at(this.#r,this.#e)}#O(t){let o=ae.get("spring").config,n=Nv(t?.config)?o?.[t?.config??"default"]??Lo.default:this.#v.configProps,s=_u(t?.configProps),i={...n,...s},a={reverse:t?.reverse??this.#v.reverse,relative:t?.relative??this.#v.relative,immediate:t?.immediate??this.#v.immediate,configProps:i},{relative:c}=a;return this.#i=i,this.#t=c,a}goTo(t,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!0;let o=mo(t);return this.#E(o,t,r)}goFrom(t,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!0;let o=Wn(t);return this.#E(o,t,r)}goFromTo(t,r,o={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);if(this.#x=!0,!ao(t,r))return co("spring goFromTo:",t,r),new Promise(s=>s);let n=jn(t,r);return this.#E(n,t,o)}set(t,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!1;let o=Ar(t);return this.#E(o,t,r)}setImmediate(t,r={}){if(this.#d&&this.stop({clearCache:!1,updateValues:!1}),this.#g)return;this.#x=!1;let o=Ar(t);this.#r=qn(o,this.#r);let{reverse:n}=this.#O(r??{});Ot(n,"reverse")&&(this.#r=Rr(t,this.#r)),this.#r=Nn(this.#r,this.#t),this.#r=kr(this.#r)}#E(t,r,o={}){this.#r=qn(t,this.#r);let{reverse:n,immediate:s}=this.#O(o);if(Ot(n,"reverse")&&(this.#r=Rr(r,this.#r)),this.#r=Nn(this.#r,this.#t),Ot(s,"immediate "))return this.#d&&this.stop({updateValues:!1}),this.#r=kr(this.#r),Promise.resolve();let i=!this.#d&&!this.#c;return i&&(this.#c=new Promise((a,c)=>{this.#R(a,c)})),i&&this.#c?this.#c:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return $e(this.#r,"currentValue")}getInitialData(){return $e(this.#e,"currentValue")}getFrom(){return $e(this.#r,"fromValue")}getTo(){return $e(this.#r,"toValue")}getFromNativeType(){return Gn(this.#r)}getToNativeType(){return Un(this.#r)}getType(){return"SPRING"}getId(){return this.#l}isActive(){return this.#d}updateConfigProp(t={}){let r=_u(t);this.#i={...this.#i,...r},this.#v=at(this.#v,{configProps:r})}updateConfig(t){this.#i=Su(t),this.#v=at(this.#v,{configProps:this.#i})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=lt(t,this.#p);return this.#p=r,()=>this.#p=o(this.#p)}subscribeCache(t,r){let{arrayOfCallbackUpdated:o,unsubscribeCb:n,unsubscribeCache:s}=mr(t,r,this.#a,this.#o);return this.#a=o,this.#o=s,()=>this.#a=n(this.#a)}validateInitialization({validation:t,callback:r}){let o=[...this.#f,{validation:t,callback:r}];return this.#f=o,()=>this.#f=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=lt(t,this.#h);return this.#h=r,()=>this.#h=o(this.#h)}destroy(){this.#c&&this.stop(),this.#h=[],this.#f=[],this.#p=[],this.#a=[],this.#r=[],this.#c=void 0,this.#o.forEach(t=>t()),this.#o=[]}};var ny=({values:e,timeElapsed:t,duration:r,ease:o})=>e.map(n=>{if(n.shouldUpdate){let s=o(t,n.fromValue,n.toValProcessed,r);return{...n,currentValue:_e(s)}}return{...n,currentValue:n.fromValue}});var $r=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#_;#y;#v;#T;#k;#S;#w;#A;#R;constructor(t){this.#n=Aa(t?.ease),this.#t=xu(t?.duration),this.#i=uo(t?.relative,"tween"),this.#l=$t(t??{}),this.#d=u.getUnivoqueId(),this.#u=!1,this.#s=void 0,this.#c=void 0,this.#r=void 0,this.#e=[],this.#p=[],this.#a=[],this.#h=[],this.#f=[],this.#o=[],this.#g=[],this.#m=!1,this.#x=0,this.#_=0,this.#y=0,this.#v=!0,this.#T=!0,this.#k=!1,this.#S=!1,this.#w={duration:this.#t,ease:Oa(t?.ease),relative:this.#i,reverse:!1,immediate:!1},this.#A=Je,this.#R=Je;let r=t?.data;r&&this.setData(r)}#O(t){this.#u=!0,this.#m&&(this.#y=t-this.#x-this.#_),this.#_=t-this.#x-this.#y,Math.round(this.#_)>=this.#t&&(this.#_=this.#t),this.#e=ny({values:this.#e,timeElapsed:this.#_,duration:this.#t,ease:this.#n});let r=Math.round(this.#_)===this.#t,o=$e(this.#e,"currentValue");if(this.#m||Bn({stagger:this.#l,callback:this.#a,callbackCache:this.#h,callBackObject:o,useStagger:this.#T}),r){Vn({onComplete:()=>{this.#e=[...this.#e].map(s=>s.shouldUpdate?{...s,toValue:s.currentValue,fromValue:s.currentValue}:s),this.#s?.(!0),this.#r=void 0,this.#c=void 0,this.#s=void 0,this.#y=0,this.#m=!1,this.#u=!1},callback:this.#a,callbackCache:this.#h,callbackOnComplete:this.#f,callBackObject:o,stagger:this.#l,slowlestStagger:this.#A,fastestStagger:this.#R,useStagger:this.#T});return}u.useFrame(()=>{u.useNextTick(({time:n})=>{this.#u&&this.#O(n)})})}#E(t){this.#x=t,this.#O(t)}async#N(){if(Hn(this.#l.each,this.#v,this.#h,this.#a)){let{averageFPS:t}=await u.useFps();ho("tween",t);let r=pr(this.#h,this.#a);if(this.#l.grid.col>r.length){At(r.length),this.#v=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=Lt({arrayDefault:r,arrayOnStop:this.#f,stagger:this.#l,slowlestStagger:this.#A,fastestStagger:this.#R});this.#h.length>this.#a.length?this.#h=o:this.#a=o,this.#f=n,this.#A=i,this.#R=s,this.#v=!1}return{ready:!0}}async#P(t,r){this.#S||(this.#s=t,this.#c=r,this.#v&&(this.#S=!0,await this.#N(),this.#S=!1),zn({validationFunction:this.#o,defaultRafInit:o=>this.#E(o)}))}clearCurretPromise(){this.#m||(this.#c?.(u.ANIMATION_STOP_REJECT),this.#r=void 0,this.#c=void 0,this.#s=void 0,this.#u=!1)}stop({clearCache:t=!0,updateValues:r=!0}={}){this.#y=0,this.#m=!1,r&&(this.#e=Rn(this.#e)),this.unFreezeStagger(),t&&this.#h.forEach(({cb:o})=>u.useCache.clean(o)),this.#c&&(this.#c(u.ANIMATION_STOP_REJECT),this.#r=void 0,this.#c=void 0,this.#s=void 0),this.#u=!1}freezeStagger(){this.#k||(this.#h.forEach(({cb:t})=>u.useCache.freeze(t)),this.#k=!0)}unFreezeStagger({updateFrame:t=!0}={}){this.#k&&(this.#h.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:t})),this.#k=!1)}pause(){this.#m||(this.#m=!0,this.freezeStagger())}resume(){this.#m&&(this.#m=!1,this.unFreezeStagger())}setData(t){this.#e=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,toValueOnPause:n,toValProcessed:n,fromValue:n,currentValue:n,shouldUpdate:!1,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#p=this.#e.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,shouldUpdate:!1,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#e=at(this.#e,this.#p)}#b(){this.#e=[...this.#e].map(t=>t.shouldUpdate?{...t,fromValue:t.currentValue}:t)}#D(t){let r={...this.#w,...t},{ease:o,duration:n,relative:s}=r;return this.#n=Aa(o),this.#i=uo(s,"tween"),this.#t=xu(n),r}goTo(t,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!0;let o=mo(t);return this.#B(o,t,r)}goFrom(t,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!0;let o=Wn(t);return this.#B(o,t,r)}goFromTo(t,r,o={}){if(this.stop({clearCache:!1,updateValues:!0}),this.#T=!0,!ao(t,r))return co("tween goFromTo:",t,r),new Promise(s=>s);let n=jn(t,r);return this.#B(n,t,o)}set(t,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!1;let o=Ar(t),n=r?{...r,duration:1}:{duration:1};return this.#B(o,t,n)}setImmediate(t,r={}){if(this.stop({clearCache:!1,updateValues:!1}),this.#m)return;this.#T=!1;let o=Ar(t),n=r?{...r,duration:1}:{duration:1};this.#e=Mu(o,this.#e);let{reverse:s}=this.#D(n);Ot(s,"reverse")&&(this.#e=Rr(t,this.#e)),this.#e=uu(this.#e,this.#i),this.#e=kr(this.#e)}#B(t,r,o={}){this.#e=Mu(t,this.#e);let{reverse:n,immediate:s}=this.#D(o);if(Ot(n,"reverse")&&(this.#e=Rr(r,this.#e)),this.#e=uu(this.#e,this.#i),Ot(s,"immediate "))return this.#u&&(this.stop({clearCache:!1,updateValues:!1}),this.#b()),this.#e=kr(this.#e),Promise.resolve();let i=!this.#u&&!this.#r;return i&&(this.#r=new Promise((a,c)=>{this.#P(a,c)})),i&&this.#r?this.#r:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return $e(this.#e,"currentValue")}getInitialData(){return $e(this.#p,"currentValue")}getFrom(){return $e(this.#e,"fromValue")}getTo(){return $e(this.#e,"toValue")}getFromNativeType(){return Gn(this.#e)}getToNativeType(){return Un(this.#e)}getType(){return"TWEEN"}getId(){return this.#d}isActive(){return this.#u}updateEase(t){this.#n=Aa(t),this.#w=at(this.#w,{ease:t})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=lt(t,this.#a);return this.#a=r,()=>this.#a=o(this.#a)}subscribeCache(t,r){let{arrayOfCallbackUpdated:o,unsubscribeCb:n,unsubscribeCache:s}=mr(t,r,this.#h,this.#g);return this.#h=o,this.#g=s,()=>this.#h=n(this.#h)}validateInitialization({validation:t,callback:r}){let o=[...this.#o,{validation:t,callback:r}];return this.#o=o,()=>this.#o=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=lt(t,this.#f);return this.#f=r,()=>this.#f=o(this.#f)}destroy(){this.#r&&this.stop(),this.#f=[],this.#o=[],this.#a=[],this.#h=[],this.#e=[],this.#r=void 0,this.#g.forEach(t=>t()),this.#g=[]}};var hI=({each:e,duration:t,numItem:r,index:o,eachByNumItem:n})=>{if(e===1){let d=t/r,f=_e(o*d),h=_e(f+d);return{start:f,end:h}}let i=t/r*n,a=t-i,c=r-1>0?r-1:1,p=a/c*o;return{start:_e(p),end:_e(i+p)}},fI=({duration:e,numItem:t,index:r,eachByNumItem:o,type:n})=>{let i=e/t*r,c=(e-(e-i))/t*o;if(n===Fo)return{start:0,end:_e(e-(i-c))};if(n===Bo){let l=(i-c)/2;return{start:_e(l),end:_e(e-l)}}return n==="end"?{start:_e(i-c),end:_e(e)}:{start:0,end:e}},sy=e=>{let t=kv(e?.items),r=$t(e),o=lo(e?.duration),n=10,s=r?.each||1,i=[...t].map((h,y)=>({item:h,start:0,end:o,index:y}));if(!Mv(t))return i;r.grid?.col>t.length&&(At(t.length),s=1),u.checkType(Number,s)&&(s>n||s<1)&&(Lb(n),s=1);let{staggerArray:a}=Lt({arrayDefault:[...t].map(h=>({item:h})),arrayOnStop:[],stagger:r,slowlestStagger:Je,fastestStagger:Je}),c=a.filter(({item:h})=>u.checkType(Element,h)||u.checkType(Object,h)||u.checkType(Element,h?.deref?.()));if(c.length===0)return Ob(),i;let l=c.map(({frame:h})=>h),p=[...new Set(l)].toSorted((h,y)=>h-y),d=p.length;return c.map(({item:h,frame:y})=>{let b=p.indexOf(y),T=s*d/n,{start:_,end:S}=r.type===Do?hI({each:s,duration:o,numItem:d,index:b,eachByNumItem:T}):r.type===Fo||r.type==="end"||r.type===Bo?fI({duration:o,numItem:d,index:b,eachByNumItem:T,type:r.type}):{start:0,end:o};return{item:h,start:_,end:S,index:b}})};function gI(e){return new Ws(e)}function bI(e){return new zs(e)}function vI(){return new js}function yI(e){return sy(e)}function TI(e){return new $r(e)}function SI(e){return new Gt(e)}function _I(e){return new Or(e)}var Ie={};_o(Ie,{createAsyncTimeline:()=>CI,createSyncTimeline:()=>xI});var Z=()=>{},Ua=(...e)=>t=>e.reduce((r,o)=>r.then(o),Promise.resolve(t));var Ga=({data:e,filterBy:t})=>Object.entries(e).map(r=>{let[o,n]=r,s=o in t;return{data:{[o]:n},active:s}}).filter(({active:r})=>r).map(({data:r})=>r).reduce((r,o)=>({...r,...o}),{});var fo=({timeline:e,tween:t,index:r})=>{let o=t?.getId?.(),n=t?.getInitialData?.()||{},s=e.slice(0,r).reduce((i,a)=>{let c=a.find(({data:d})=>d?.tween?.getId?.()===o);c?.data?.tween?.setImmediate?.(c?.data?.valuesTo);let l=c?.data?.tween?.getToNativeType?.(),p=l&&c?Ga({data:l,filterBy:c.data.valuesTo}):{};return{...i,...p}},n);return t.setImmediate(n),s};var Pu=({mainReject:e,mainResolve:t,isStopped:r,previousSessionId:o,currentSessionId:n,isInPause:s,tween:i,stepFunction:a,action:c,addToActiveTween:l})=>{if(r()||o!==n()){e();return}let p=l(i),d=i&&i?.validateInitialization?i.validateInitialization({validation:()=>s(),callback:()=>i.pause?.()}):Z;a[c]().then(()=>t({resolve:!0})).catch(()=>{}).finally(()=>{p(),d()})};var Hs=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#_;#y;#v;#T;#k;#S;#w;#A;#R;#O;#E;#N;#P;#b;#D;#B;#I;constructor(t){this.#n=Pa(t?.repeat),this.#t=le(t?.yoyo,"asyncTimeline: yoyo",!1),this.#i=le(t?.freeMode,"asyncTimeline: freeMode",!1),this.#l=le(t?.autoSet,"asyncTimeline: autoSet",!0),this.#d=le(t?.inheritProps,"asyncTimeline: inheritProps",!0),this.#u=le(t?.forceFromTo,"asyncTimeline: forceFromTo",!1),this.#s=[],this.#c=[],this.#r=[],this.#e=!1,this.#p={id:-1,tween:void 0,callback:()=>{},action:"",valuesFrom:{},valuesTo:{},prevValueTo:{},prevValueSettled:!1,tweenProps:{},groupProps:{},labelProps:{}},this.#a={active:!1,index:-1,isReverse:!1,callback:void 0},this.#h=1,this.#f=void 0,this.#o=0,this.#g=0,this.#m=1,this.#x=!1,this.#_=!1,this.#y=!1,this.#v=!1,this.#T=!1,this.#k=!1,this.#S=!0,this.#w=0,this.#A=0,this.#R=0,this.#O=!1,this.#E=[],this.#N=!1,this.#P=0,this.#b=[],this.#D=[],this.#B=void 0,this.#I=void 0}#F(){let t=this.#s[this.#g],r=this.#E;if(this.#E=[],!t)return;this.#s[this.#g]=t.map(i=>{let{data:a}=i,{tween:c,valuesTo:l,prevValueSettled:p}=a;if(c&&c?.getToNativeType&&!p){let d=c.getToNativeType(),f=Ga({data:d,filterBy:l});return{...i,data:{...a,prevValueTo:f,prevValueSettled:!0}}}return i});let o=t.map(i=>{let{data:a}=i,{tween:c,callback:l,action:p,valuesFrom:d,valuesTo:f,tweenProps:h,id:y}=a,b={...h};delete b.delay;let{active:T,index:_}=this.#a,S=Number.isNaN(_)?!1:T&&_&&this.#g<_;S&&(b.immediate=!0),h&&"relative"in h&&h.relative&&(h.relative=!1,pb()),this.#E.push({id:y,action:p});let E=r.find(({id:M,action:I})=>M===y&&I===p),C={set:()=>(this.#v||c?.clearCurretPromise?.(),c?.[p](d,b)),goTo:()=>(this.#v||c?.clearCurretPromise?.(),c?.[p](f,b)),goFrom:()=>(this.#v||c?.clearCurretPromise?.(),c?.[p](d,b)),goFromTo:()=>(this.#v||c?.clearCurretPromise?.(),c?.[p](d,f,b)),add:()=>E?new Promise(M=>M({resolve:!0})):new Promise(M=>{if(S){M({resolve:!0});return}let I=this.getDirection();l({direction:I,loop:this.#m}),M({resolve:!0})}),addAsync:()=>{this.#k=!0;let M=this.#w;return E?new Promise(I=>I({resolve:!0})):new Promise((I,P)=>{if(S){I({resolve:!0});return}let k=this.getDirection();l({direction:k,loop:this.#m,resolve:()=>{if(M===this.#w){I({resolve:!0});return}P()}})})},createGroup:()=>new Promise(M=>M({resolve:!0})),closeGroup:()=>new Promise(M=>M({resolve:!0})),label:()=>new Promise(M=>M({resolve:!0})),suspend:()=>{if(E)return new Promise(P=>P({resolve:!0}));let M=u.checkType(Boolean,l());M||mb(l);let I=M?l():!0;return new Promise(P=>{!S&&I&&(this.#T=!0),P({resolve:!0})})}};return new Promise((M,I)=>{let P=S?!1:h?.delay,k=this.#w;if(P){let O=u.getTime();requestAnimationFrame(()=>{this.#L({start:O,deltaTimeOnpause:0,delay:P,mainReject:I,mainResolve:M,previousSessionId:k,tween:c,stepFunction:C,action:p})});return}Pu({mainReject:I,mainResolve:M,isStopped:()=>this.#S,isInPause:()=>this.#v,addToActiveTween:O=>this.#Y(O),currentSessionId:()=>this.#w,previousSessionId:k,tween:c,stepFunction:C,action:p})})}),s=this.#s[this.#g].some(i=>i.data.groupProps?.waitComplete)?"all":"race";Promise[s](o).then(()=>{if(this.#T||this.#S)return;let{active:i,index:a,isReverse:c,callback:l}=this.#a;if(l&&i&&this.#g===a-1){this.#Q(),this.#m++,l();return}if(i&&c&&this.#g===a-1&&this.reverseNext(),this.#x){this.#x=!1,this.#g=this.#s.length-this.#g-1,this.#Q(),this.#H(),this.#F();return}if(this.#g<this.#s.length-1){this.#g++,this.#F();return}if(this.#m<this.#n||this.#n===-1){if(i&&a===this.#s.length&&!this.#i){let p=this.#r.map(({tween:d})=>{let f=fo({timeline:this.#s,tween:d,index:this.#s.length});return new Promise((h,y)=>{d.set(f).then(()=>h({resolve:!0})).catch(()=>y())})});Promise.all(p).then(()=>{this.#C()}).catch(()=>{});return}this.#C();return}this.#D.forEach(({cb:p})=>p()),this.#S=!0,this.#B&&tn.add(()=>{Mt.add(()=>{this.#B?.({resolve:!0})})})}).catch(i=>{i&&console.log(i)}).finally(()=>{this.#k=!1})}#L({start:t,deltaTimeOnpause:r,delay:o,mainReject:n,mainResolve:s,previousSessionId:i,tween:a,stepFunction:c,action:l}){let p=u.getTime(),d=p-t;if(this.#v&&(r=p-this.#R),d-r>=o||this.#S||this.#x){Pu({mainReject:n,mainResolve:s,isStopped:()=>this.#S,isInPause:()=>this.#v,addToActiveTween:f=>this.#Y(f),currentSessionId:()=>this.#w,previousSessionId:i,tween:a,stepFunction:c,action:l});return}requestAnimationFrame(()=>{this.#L({start:t,deltaTimeOnpause:r,delay:o,mainReject:n,mainResolve:s,previousSessionId:i,tween:a,stepFunction:c,action:l})})}#C(){if(this.#m>0){let t=this.getDirection();this.#b.forEach(({cb:r})=>r({direction:t,loop:this.#m}))}this.#m++,this.#g=0,this.#Q(),(this.#t||this.#_)&&this.#H(),this.#_=!1,this.#F()}#Y(t){let r=t?.getId&&t.getId();if(!r)return Z;let o=this.#A;return this.#A++,this.#c.push({tween:t,uniqueId:r,id:o}),()=>{this.#c=this.#c.filter(({id:n})=>n!==o)}}#H(){this.#y=!this.#y,this.#s=this.#s.toReversed().map(t=>t.toReversed().map(r=>{let{data:o}=r,{action:n,valuesFrom:s,prevValueTo:i,valuesTo:a}=o,c=a;switch(n){case"goTo":return{...r,data:{...o,valuesTo:i,prevValueTo:c}};case"goFromTo":return{...r,data:{...o,valuesFrom:a,valuesTo:s}};case"goFrom":return this.#u||(db(),this.stop()),{...r,data:{...o,valuesFrom:a,valuesTo:s}}}return r}))}#M(t){let r=this.#s.findIndex(o=>o[0]?.group&&o[0].group===this.#f);if(r!==-1){this.#s[r].push({group:this.#f,data:t});return}this.#s.push([{group:this.#f,data:t}])}#W(t){let r=t?.getId?.();if(this.#r.find(({id:s})=>s===r))return;let n={id:r,tween:t};this.#r.push(n)}#$(){this.#r.forEach(({tween:t})=>t.resetData())}set(t,r={},o={}){if(!Ds(t))return this;o.delay=Ls(o?.delay);let n=this.#d?fo({timeline:this.#s,tween:t,index:this.#s.length}):{};return this.#o++,this.#M({...this.#p,id:this.#o,tween:t,action:"set",valuesTo:{...n,...r},valuesFrom:{...n,...r},tweenProps:o,groupProps:{waitComplete:this.#e}}),this.#W(t),this}goTo(t,r={},o={}){if(!Ds(t))return this;o.delay=Ls(o?.delay);let n=fo({timeline:this.#s,tween:t,index:this.#s.length}),s=this.#d||this.#u?n:{};return this.#o++,this.#u?this.#M({...this.#p,id:this.#o,tween:t,action:"goFromTo",valuesFrom:{...s},valuesTo:{...s,...r},tweenProps:o??{},groupProps:{waitComplete:this.#e}}):this.#M({...this.#p,id:this.#o,tween:t,action:"goTo",valuesTo:{...s,...r},tweenProps:o??{},groupProps:{waitComplete:this.#e}}),this.#W(t),this}goFrom(t,r={},o={}){if(!Ds(t))return this;o.delay=Ls(o?.delay);let n=fo({timeline:this.#s,tween:t,index:this.#s.length}),s=this.#d||this.#u?n:{};return this.#o++,this.#u?this.#M({...this.#p,id:this.#o,tween:t,action:"goFromTo",valuesFrom:{...s,...r},valuesTo:{...s},tweenProps:o??{},groupProps:{waitComplete:this.#e}}):this.#M({...this.#p,id:this.#o,tween:t,action:"goFrom",valuesFrom:{...s,...r},tweenProps:o,groupProps:{waitComplete:this.#e}}),this.#W(t),this}goFromTo(t,r={},o={},n={}){if(!Ds(t))return this;n.delay=Ls(n?.delay);let s=this.#d?fo({timeline:this.#s,tween:t,index:this.#s.length}):{};return this.#o++,this.#M({...this.#p,id:this.#o,tween:t,action:"goFromTo",valuesFrom:{...s,...r},valuesTo:{...s,...o},tweenProps:n,groupProps:{waitComplete:this.#e}}),this.#W(t),this}add(t=Z){let r=po(t,()=>{},"timeline add function");return this.#f?(Dn("add"),this):(this.#o++,this.#M({...this.#p,id:this.#o,callback:r,action:"add",groupProps:{waitComplete:this.#e}}),this)}addAsync(t){let r=Ov(t);return this.#f?(Dn("addAsync"),this):(this.#o++,this.#M({...this.#p,id:this.#o,callback:r,action:"addAsync",groupProps:{waitComplete:this.#e}}),this)}createGroup(t={}){return this.#f?(Dn("createGroup"),this):(this.#o++,this.#M({...this.#p,id:this.#o,action:"createGroup",groupProps:t}),this.#e=t?.waitComplete??!1,this.#f=this.#h++,this)}closeGroup(){return this.#f=void 0,this.#o++,this.#M({...this.#p,id:this.#o,action:"closeGroup"}),this.#e=!1,this}suspend(t=()=>!0){return this.#f?(Dn("suspend"),this):(this.#o++,this.#M({...this.#p,id:this.#o,callback:t,action:"suspend",groupProps:{waitComplete:this.#e}}),this)}label(t={}){return this.#f?(Dn("label"),this):Pv(t?.name,"asyncTimeline label:")?(this.#o++,this.#M({...this.#p,id:this.#o,action:"label",labelProps:t,groupProps:{waitComplete:this.#e}}),this):this}#U(){this.#O||(this.#O=!0,this.#r.forEach(({tween:t})=>{let r=t.getInitialData();this.#o++,this.#s=[[{group:void 0,data:{...this.#p,id:this.#o,tween:t,action:"set",valuesFrom:r,valuesTo:r,groupProps:{waitComplete:this.#e}}}],...this.#s]}),this.#r.forEach(({tween:t})=>{let r=fo({timeline:this.#s,tween:t,index:this.#s.length});this.#o++,this.#s.push([{group:void 0,data:{...this.#p,id:this.#o,tween:t,action:"set",valuesFrom:r,valuesTo:r,groupProps:{waitComplete:this.#e}}}])}))}setTween(t="",r=[]){this.stop();let o=$v(r),n=Lv(t);if(!o||!n)return Promise.reject(new Error("timeline setTween: props is wrong"));let s=new Set(r.map(c=>c?.getId?.())),i=this.#r.filter(({id:c})=>s.has(c)),a=this.#s.findIndex(c=>{let[l]=c;return l.data.labelProps?.name===t});return a===-1?(gb(t),Promise.reject(new Error(`asyncTimeline.setTween() label: ${t} not found`))):new Promise(c=>{let l=i.map(({tween:p})=>{let d=fo({timeline:this.#s,tween:p,index:a});return new Promise((f,h)=>{p.set(d).then(()=>f({resolve:!0})).catch(()=>h())})});Promise.all(l).then(()=>{c({resolve:!0})}).catch(()=>{bb()})})}#G(){this.#I&&(this.#I(u.ANIMATION_STOP_REJECT),this.#I=void 0)}async#re(){if(this.#N)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#N=!0,await u.useFps(),this.#N=!1}async playFrom(t){return await this.#re(),this.#K(t,!1)}async playFromReverse(t){return await this.#re(),this.#K(t,!0)}#K(t,r){return new Promise((o,n)=>{this.playReverse({forceYoYo:!1,resolve:o,reject:n,callback:()=>{this.#s.length===0||this.#k||(this.#y&&this.#H(),this.#g=0,this.#a={isReverse:r,active:!0,index:u.checkType(String,t)?this.#s.findIndex(s=>{let[i]=s;return i.data.labelProps?.name===t}):t,callback:void 0},u.checkType(String,t)&&Av(this.#a.index,t),this.#F())}})})}async play(){return await this.#re(),new Promise((t,r)=>{if(this.#l&&this.#U(),this.#i){if(this.#s.length===0||this.#k)return;this.stop(),this.#S=!1,this.#y&&this.#H(),this.#w++,u.useFrameIndex(()=>{this.#I=r,this.#B=t,this.#F()},1);return}this.playReverse({forceYoYo:!1,callback:()=>{this.stop(),this.#S=!1;let o=this.#r.map(({tween:n})=>{let s=n.getInitialData();return new Promise((i,a)=>{n.set(s).then(()=>i({resolve:!0})).catch(()=>a())})});Promise.all(o).then(()=>{this.#I=r,this.#B=t,this.#F()}).catch(()=>{})}})})}async playReverse({forceYoYo:t=!0,callback:r,resolve:o=null,reject:n=null}={}){return await this.#re(),new Promise((s,i)=>{let a=o??s,c=n??i,l=t;this.#l&&this.#U(),!(this.#s.length===0||this.#k)&&(this.stop(),this.#S=!1,l&&(this.#_=!0),this.#a={active:!0,index:this.#s.length,isReverse:!1,callback:r},this.#m--,this.#w++,u.useFrameIndex(()=>{this.#B=a,this.#I=c,this.#F()},1))})}reverseNext(){this.#x=!0}stop({clearCache:t=!0}={}){this.#S=!0,this.#g=0,this.#m=1,this.#G(),this.#x=!1,this.#Q(),this.#_=!1,this.#v=!1,this.#T=!1,this.#k=!1,this.#R=0,this.#r.forEach(({tween:r})=>{r?.stop?.({clearCache:t})}),this.#y&&this.#H(),this.#y=!1,this.#i||this.#$()}pause(){this.#v||(this.#v=!0,this.#R=u.getTime(),this.#se())}resume(){if(this.#v&&(this.#v=!1,this.#R=0,this.#ee()),this.#T){if(this.#T=!1,this.#R=0,this.#g<=this.#s.length-2){this.#g++,this.#F();return}this.#g===this.#s.length-1&&(this.#g=this.#t&&!this.#y?1:0,this.#Q(),this.#t&&this.#H(),this.#m++,this.#F())}}#se(){this.#c.forEach(({tween:t})=>{t?.pause?.()})}#ee(){this.#c.forEach(({tween:t})=>{t?.resume?.()})}#Q(){this.#a={active:!1,index:-1,isReverse:!1,callback:void 0}}get(){return this.#c}isActive(){return!this.#S}isPaused(){return this.#v}isSuspended(){return this.#T}getDirection(){return this.#S?Ge.NONE:this.#y?Ge.BACKWARD:Ge.FORWARD}onLoopEnd(t){this.#b.push({cb:t,id:this.#P});let r=this.#P;return()=>{this.#b=this.#b.filter(o=>o.id!==r)}}onComplete(t){this.#D.push({cb:t,id:this.#P});let r=this.#P;return this.#P++,()=>{this.#D=this.#D.filter(o=>o.id!==r)}}destroy(){this.#r.forEach(({tween:t})=>{t?.destroy?.()}),this.#s=[],this.#c=[],this.#D=[],this.#b=[],this.#r=[],this.#g=0,this.#a={active:!1,callback:void 0,index:-1,isReverse:!1}}};var Us=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#_;#y;#v;#T;#k;#S;#w;#A;#R;constructor(t={}){this.#n=lo(t?.duration),this.#t=le(t?.yoyo,"syncTimeline: yoyo",!1),this.#i=Pa(t?.repeat),this.#l=[],this.#d=0,this.#u=0,this.#s=0,this.#c=0,this.#r=0,this.#e=0,this.#p=!1,this.#a=!1,this.#h=!1,this.#f=0,this.#o=0,this.#g=10,this.#m=!0,this.#x=!1,this.#_=!1,this.#y=!1,this.#v=!1,this.#T=0,this.#k=[],this.#S=[],this.#w=[],this.#A=void 0,this.#R=void 0}#O(t,r){if(this.#m||this.#y)return;let o=!this.#i||this.#i>=2&&this.#f===this.#i-1?0:1e3/r/2;this.#v&&(this.#c=t-this.#d-this.#u-this.#e),this.#u=Math.trunc(t-this.#d-this.#c-this.#e);let n=this.#p?this.#r-(this.#u-this.#r):this.#u;if(this.#v||(this.#s=ot(n,0,this.#n),this.#x||(this.#l.forEach(i=>{i.draw({partial:this.#s,isLastDraw:!1,useFrame:!0,direction:this.getDirection()})}),this.#w.forEach(({cb:i})=>{i({time:this.#s,direction:this.getDirection()})}))),this.#x=!1,this.#o++,n<=this.#n-o&&n>=0+o&&!this.#m){this.#_=!1,this.#E();return}if(this.#F(),this.#a){this.#p=!0,this.#r=0,this.#e=0,this.#a=!1,this.#E();return}let s=this.getDirection();if(u.useNextFrame(()=>{!this.#y&&!this.#_&&this.#o>this.#g&&(this.#_=!0,this.#f++,this.#o=0,this.#k.forEach(({cb:i})=>i({direction:s,loop:this.#f})))}),!this.#i||this.#f===this.#i-1&&this.#o>this.#g){let i=this.#s;this.#l.forEach(a=>{a.draw({partial:i,isLastDraw:!0,useFrame:!0,direction:this.getDirection()})}),this.#m=!0,this.#N(),this.#d=t,this.#p&&(this.#p=!1),this.#S.forEach(({cb:a})=>a()),this.#A&&this.#A(!0);return}if(this.#t){this.reverse(),this.#E();return}if(this.#h){this.#N(),this.#d=t,this.#p||(this.#h=!this.#h),this.#u=this.#n,this.#s=this.#n,this.#c=this.#n,this.#E();return}this.#N(),this.#d=t,this.#p&&(this.#h=!this.#h),this.#E()}#E(){u.useFrame(()=>{u.useNextTick(({time:t,fps:r})=>{this.#y||this.#O(t,r)})})}#N(){this.#u=0,this.#c=0,this.#s=0,this.#r=0,this.#e=0}#P(t){let r=this.#l.reduce((o,n)=>n.getLabels().find(({name:a})=>a===t)||o,{name:"",time:0});return r||vb(t),r.time}#b(){this.#R&&(this.#R(u.ANIMATION_STOP_REJECT),this.#R=void 0)}play(t={}){this.resume();let r=t?.useCurrent;return r||this.stop(),new Promise((o,n)=>{if(!this.#y&&(this.#b(),this.#A=o,this.#R=n,!(!this.#m&&!this.#p&&r))){if(!this.#m&&this.#p&&r){this.reverse();return}this.#D()}})}playFrom(t=0){return this.resume(),this.stop(),new Promise((r,o)=>{if(this.#y)return;let s=u.checkType(Number,t)?t:this.#P(t);this.#b(),this.#A=r,this.#R=o,this.#D(s)})}#D(t=0){this.#F(),this.#N(),this.#s=t,this.#e=-this.#s,this.#h=!1,this.#o=0,this.#y=!0,this.#I(t)}playFromReverse(t){return this.resume(),this.stop(),new Promise((r,o)=>{if(this.#y)return;let s=u.checkType(Number,t)?t:this.#P(t);this.#b(),this.#A=r,this.#R=o,this.#B(s,!0)})}playReverse(t={}){this.resume();let r=t?.useCurrent;return r||this.stop(),new Promise((o,n)=>{if(!this.#y&&(this.#b(),this.#A=o,this.#R=n,!(!this.#m&&this.#p&&r))){if(!this.#m&&!this.#p&&r){this.reverse();return}this.#B(this.#n,!0)}})}#B(t=0){this.#F(),this.#u=t,this.#s=t,this.#c=t,this.#r=0,this.#e=0,this.#a=!0,this.#h=!0,this.#x=!0,this.#o=0,this.#y=!0,this.#I(t)}async#I(t){if(this.#i===0)return;let{averageFPS:r}=await u.useFps();ho("sequencer",r),this.#p=!1,this.#l.forEach(o=>{o.inzializeStagger(),o.disableStagger(),o.draw({partial:t,isLastDraw:!1,useFrame:!0,direction:this.getDirection()})}),u.useFrame(()=>{u.useNextTick(({time:o,fps:n})=>{this.#d=o,this.#y=!1,this.#m=!1,this.#v=!1,this.#f=0,this.#O(o,n)})})}pause({freezeCache:t=!0}={}){if(!(this.#m||this.#v||this.#y)&&(this.#m=!1,this.#v=!0,t)){this.#l.forEach(r=>{r.freezeCachedId()});return}}resume({unFreezeCache:t=!0}={}){if(!(this.#m||!this.#v||this.#y)&&(this.#v=!1,t)){this.#l.forEach(r=>{r.unFreezeCachedId()});return}}reverse(){this.#v&&this.resume(),!(this.#m||this.#y)&&(this.#F(),this.#p=!this.#p,this.#p?this.#r=this.#u:this.#e+=this.#u-this.#s)}stop({clearCache:t=!0}={}){if(this.resume(),this.#m=!0,this.#b(),t){this.#l.forEach(r=>{r.cleanCachedId()});return}this.#l.forEach(r=>{r.draw({partial:this.#s,isLastDraw:!0,useFrame:!0,direction:this.getDirection()})})}add(t){return t.setStretchFactor(this.#n),this.#l.push(t),this}setDuration(t){return this.#n=t,this}#F(){this.#l.forEach(t=>t.resetLastValue())}isActive(){return!this.#m}isPaused(){return this.#v}getDirection(){return this.#m?Ge.NONE:this.#p?Ge.BACKWARD:Ge.FORWARD}getTime(){return this.#s}onLoopEnd(t=()=>{}){this.#k.push({cb:t,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#k=this.#k.filter(o=>o.id!==r)}}onComplete(t=()=>{}){this.#S.push({cb:t,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#S=this.#S.filter(o=>o.id!==r)}}onUpdate(t=()=>{}){this.#w.push({cb:t,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#w=this.#w.filter(o=>o.id!==r)}}destroy(){this.stop(),this.#l.forEach(t=>t.destroy()),this.#l=[],this.#w=[],this.#k=[],this.#S=[]}};function xI(e){return new Us(e)}function CI(e){return new Hs(e)}var Ye={};_o(Ye,{createParallax:()=>RI,createScrollTrigger:()=>NI});var EI=({prevValue:e,value:t,maxVal:r})=>t>=r&&e<=r&&r>=0||t<=r&&e>=r&&r<=0?v.ON_LEAVE:t>r&&e<=r&&r<=0||t<r&&e>=r&&r>=0?v.ON_ENTER_BACK:t>=0&&e<=0&&r<=0||t<=0&&e>=0&&r>=0?v.ON_LEAVE_BACK:t>0&&t<r&&e<=0&&r>=0||t<0&&e>=0&&r<=0?v.ON_ENTER:v.ON_NOOP;function iy({prevValue:e,value:t,maxVal:r,onEnter:o,onEnterBack:n,onLeave:s,onLeaveBack:i}){({[v.ON_LEAVE]:()=>{s&&s()},[v.ON_ENTER_BACK]:()=>{n&&n()},[v.ON_LEAVE_BACK]:()=>{i&&i()},[v.ON_ENTER]:()=>{o&&o()},[v.ON_NOOP]:()=>{}})[EI({prevValue:e,value:t,maxVal:r})]()}var wI=({startMarker:e,endMarker:t,label:r})=>{if(!e&&!t){let o=r.replaceAll(/^[^a-z]+|[^\w.:-]+/gi,"-"),n=document.createElement("span");n.className+=`p-marker p-marker--start  p-marker-${o}`,n.innerHTML=`start ${o}`;let s=document.createElement("span");s.className+=`p-marker p-marker--end  p-marker-${o}`,s.innerHTML=`end ${o}`,document.body.append(n),document.body.append(s);let i=document.querySelector(`.p-marker--start.p-marker-${o}`),a=document.querySelector(`.p-marker--end.p-marker-${o}`);return{lastStartMarker:i??void 0,lastEndMarkerEl:a??void 0}}return{lastStartMarker:e,lastEndMarkerEl:t}},II=({screen:e})=>{if(e===globalThis)return{top:0,right:0,bottom:0,left:0};let t=e.getBoundingClientRect();return{top:t.top,right:document.documentElement.clientWidth-(t.left+e.offsetWidth),bottom:window.innerHeight-(t.top+e.offsetHeight),left:t.left}},MI=({startPoint:e,direction:t,invertSide:r,top:o,bottom:n,left:s,right:i})=>t===v.DIRECTION_VERTICAL?r?{right:0,width:"100vw",height:"3px",top:`${e+o}px`,padding:"0 30px",pointerEvents:"none"}:{right:0,width:"100vw",height:"3px",bottom:`${e+n}px`,padding:"0 30px",pointerEvents:"none"}:r?{top:0,height:"100vw",width:"3px",left:`${e+s}px`,padding:"30px 0",pointerEvents:"none"}:{top:0,height:"100vw",width:"3px",right:`${e+i}px`,padding:"30px 0",pointerEvents:"none"},kI=({startPoint:e,endPoint:t,direction:r,invertSide:o,top:n,bottom:s,left:i,right:a})=>r===v.DIRECTION_VERTICAL?o?{right:0,width:"100vw",height:"3px",top:`${e+t+n}px`,padding:"0 30px",pointerEvents:"none"}:{right:0,width:"100vw",height:"3px",bottom:`${e+t+s}px`,padding:"0 30px",pointerEvents:"none"}:o?{top:0,height:"100vw",width:"3px",left:`${e+t+i}px`,padding:"30px 0",pointerEvents:"none"}:{top:0,height:"100vw",width:"3px",right:`${e+t+a}px`,padding:"30px 0",pointerEvents:"none"},ay=({startMarker:e,endMarker:t,startPoint:r,endPoint:o,screen:n,direction:s,invertSide:i,label:a})=>{let{lastStartMarker:c,lastEndMarkerEl:l}=wI({startMarker:e,endMarker:t,label:a}),{top:p,right:d,bottom:f,left:h}=II({screen:n}),y=MI({startPoint:r,direction:s,invertSide:i,top:p,bottom:f,left:h,right:d}),b=kI({startPoint:r,endPoint:o,direction:s,invertSide:i,top:p,bottom:f,left:h,right:d}),T={position:"fixed",zIndex:"99999",background:ae.get("scrollTrigger")?.markerColor?.startEnd||"#ff0000",fontSize:"14px",whiteSpace:"nowrap",textTransform:"uppercase"};return u.useFrame(()=>{Object.assign(c?.style,{...T,...y}),Object.assign(l?.style,{...T,...b})}),{startMarker:c,endMarker:l}};var cy=({marker:e,direction:t,invertSide:r})=>{if(!e)return{};let n=`3px ${ae.get("scrollTrigger")?.markerColor?.item||"#14df3b"} solid`;return t===v.DIRECTION_VERTICAL?r?{borderBottom:n}:{borderTop:n}:r?{borderRight:n}:{borderLeft:n}};var qa=class{#n=0;#t=0;#i=0;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#_;#y;#v;#T;#k;#S;#w;#A;#R;#O;#E;#N;#P;#b;#D;#B;#I;#F;#L;#C;#Y;#H;#M;#W;#$;constructor(){this.#l=void 0,this.#d=0,this.#u=()=>0,this.#s=()=>0,this.#c=v.DIRECTION_VERTICAL,this.#r=0,this.#e=void 0,this.#p=void 0,this.#a=void 0,this.#o=void 0,this.#g=!1,this.#m=!1,this.#x=!1,this.#_=()=>{},this.#y=()=>{},this.#v=()=>{},this.#T=!0,this.#h=void 0,this.#f=globalThis,this.#M="left",this.#$=!0,this.#W=!1,this.#k=["flex","flex-shrink","flex-basis","float","display","grid-area","grid-column-start","grid-column-end","grid-row-start","grid-row-end","box-sizing","order","place-self","align-self","justify-self"],this.#S=["font-size","padding","margin","line-height","white-space"],this.#w=["text-align"],this.#A=["z-index","pointer-events"],this.#R=["transform","position","translate","rotate","scale"],this.#O=["none","static"],this.#E=!1,this.#N=0,this.#P=0,this.#b=!1,this.#D=1.5,this.#B=!1,this.#I=!1,this.#F=0,this.#L=0,this.#C=!1,this.#Y=0,this.#H=3}init(t){this.#e=t.item,this.#h=t.marker,this.#f=t.screen,this.#b=t.animatePin,this.#$=t.anticipatePinOnLoad,this.#B=t.forceTranspond,this.#l=t.invertSide,this.#c=t.direction,this.#u=t.getStart,this.#s=t.getEnd,this.#t=this.#u(),this.#d=this.#s(),this.#P=window.scrollY,this.#n=t?.scrollerHeight,this.#ue(),this.#M=this.#c===v.DIRECTION_VERTICAL?"top":"left",this.#E=!0,this.#T=!0,this.#re(),this.#se(),this.#K(),this.#U(),this.#y=u.useScrollStart(()=>{this.#E&&this.#f!==globalThis&&this.#m&&this.#o&&u.useFrame(()=>{this.#o&&(this.#o.style.transition="transform .85s cubic-bezier(0, 0.68, 0.45, 1.1)")})}),this.#_=u.useScroll(({scrollY:r})=>{if(this.#E&&this.#f!==globalThis&&this.#f!==document.documentElement){this.#c===v.DIRECTION_VERTICAL&&this.#ue();let o=r-this.#P;if(this.#P=r,this.#m&&this.#o&&this.#p){let{verticalGap:n}=this.#p.get(),s=n-o;this.#p.setData({collision:0,verticalGap:s}),u.useFrame(()=>{this.#o&&(this.#o.style.transform=`translate(0px,${s}px)`)})}}})}#U(){this.#p=new Gt({data:{collision:0,verticalGap:0},config:"wobbly"}),this.#v=this.#p.subscribe(({collision:t,verticalGap:r})=>{this.#c===v.DIRECTION_VERTICAL&&this.#o?this.#o.style.transform=`translate(0px, ${t}px)`:this.#o&&(this.#o.style.transform=`translate(${t}px, ${r}px)`)})}#G(){this.#o&&this.#p&&this.#p.set({collision:0,verticalGap:0}).catch(()=>{})}#re(){this.#e||(this.#e=document.createElement("div"));let t=document.createElement("div");t.classList.add("pin-wrapper");let r=document.createElement("div");r.classList.add("pin"),t.append(r);let o=this.#e?.parentNode;o&&o.insertBefore(t,this.#e),r.append(this.#e),this.#a=this.#e.closest(".pin-wrapper"),this.#o=this.#e.closest(".pin");let n=this.#Q(),s=this.#j(),i=cy({marker:this.#h,invertSide:this.#l,direction:this.#c}),a={display:"table"};u.useFrame(()=>{!this.#o||!this.#a||(Object.assign(this.#a.style,{...i}),Object.assign(this.#o.style,{...a,...s,...n}))}),this.#oe()}#K(){if(!this.#o||!this.#a)return;let t=this.#a.offsetHeight,r=this.#a.offsetWidth;this.#a.style.height=`${t}px`,this.#a.style.width=`${r}px`,this.#o.style.height=`${t}px`,this.#o.style.width=`${r}px`}#se(){if(!this.#e)return;let t=globalThis.getComputedStyle(this.#e),r=this.#k.reduce((o,n)=>({...o,[n]:t.getPropertyValue(n)}),{});u.useFrame(()=>{this.#a&&Object.assign(this.#a.style,r)})}#ee(t,r){let o=t.parentNode;if(o)for(;o!==null&&o!==document;){let n=getComputedStyle(o);if(n[r]&&!this.#O.includes(n[r]))return{[r]:n[r]};o=o.parentNode}}#Q(){return this.#o?this.#w.map(r=>this.#ee(this.#o,r)).filter(r=>r!==null).reduce((r,o)=>({...r,...o}),{})??{}:{}}#oe(){if(this.#B){this.#W=!0;return}this.#W=this.#R.map(t=>{let r=this.#ee(this.#a,t);if(!r)return!1;let[o]=Object.keys(r),[n]=Object.values(r);return o==="position"?n==="fixed"||n==="absolute":!0}).includes(!0)}#ie(){this.#t=this.#u(),this.#d=this.#s()}#ue(){this.#ie(),this.#f!==globalThis&&(this.#t-=this.#c===v.DIRECTION_VERTICAL?It(this.#f).top:It(this.#f).left),this.#i=this.#l?this.#t:this.#n-this.#t,this.#r=this.#l?-Math.trunc(this.#d):Math.trunc(this.#d)}destroy(){this.#E&&(this.#p?.stop?.(),this.#v(),this.#_(),this.#y(),this.#p?.destroy?.(),this.#p=null,this.#F=0,this.#I=!1,this.#x=!1,this.#m=!1,this.#g=!1,this.#o&&this.#a&&(this.#a.parentNode?.insertBefore(this.#e,this.#a),this.#o.remove(),this.#a.remove(),this.#a=void 0,this.#o=void 0,this.#E=!1))}#ce(){return this.#a?this.#c===v.DIRECTION_VERTICAL?It(this.#a).top-this.#i:It(this.#a).left-this.#i:0}#fe(){let t=this.#ce();this.#be(t)}#pe(){let t=this.#l?this.#ce()-this.#d:this.#ce()+this.#d;this.#be(t)}#be(t){u.useFrame(()=>{if(!this.#o||!this.#M)return;let r=this.#o?.style??{};r[this.#M]=`${this.#i}px`}),this.#b&&!this.#T&&this.#o&&this.#p&&this.#p.goFrom({collision:t}).then(()=>{this.#ge()}).catch(()=>{})}#ge(){u.useFrame(()=>{this.#o&&(this.#o.style.transform="translate(0px, 0px)")})}#X(){this.#G(),u.useFrame(()=>{this.#o&&(this.#o.style.transition="",this.#o.style.position="relative",this.#o.style.top="",this.#o.style.left="")})}#q(){this.#G(),u.useFrame(()=>{this.#o&&(this.#o.style.transition="",this.#o.style.position="relative",this.#c===v.DIRECTION_VERTICAL?(this.#o.style.left="",this.#o.style.top=`${this.#r}px`):(this.#o.style.top="",this.#o.style.left=`${this.#r}px`))})}#J(){if(!this.#o)return;let t=this.#c===v.DIRECTION_VERTICAL?It(this.#o).left:It(this.#o).top,r=this.#c===v.DIRECTION_VERTICAL?"left":"top";u.useFrame(()=>{this.#o&&(this.#o.style.position="fixed",this.#o.style[r]=`${t}px`,this.#I=!0,this.#C=!0)})}#j(){if(!this.#e)return{};let t=globalThis.getComputedStyle(this.#e);return this.#A.reduce((r,o)=>({...r,[o]:t.getPropertyValue(o)}),{})}#Z(){if(!this.#e)return{};let t=globalThis.getComputedStyle(this.#e);return this.#S.reduce((r,o)=>({...r,[o]:t.getPropertyValue(o)}),{})}#te(){return this.#S.reduce((t,r)=>({...t,[r]:""}),{})}#V(){if(this.#W){let t=this.#Q(),r=this.#j(),o=this.#Z();u.useFrame(()=>{this.#o&&(Object.assign(this.#o.style,{...r,...t}),this.#e&&Object.assign(this.#e.style,o),document.body.append(this.#o))})}}#ne(){!this.#W||!this.#e||!this.#a||u.useFrame(()=>{this.#o&&(Object.assign(this.#e.style,this.#te()),this.#a?.append(this.#o))})}#me(t){let r=this.#C&&this.#Y<3?this.#L:ot(Math.abs(t-this.#N),0,250);return this.#C&&this.#Y<this.#H?this.#Y++:(this.#Y=0,this.#C=!1),this.#L=r,r*this.#D}#z(t,r){if(this.#b&&!this.#T||this.#T&&!this.#$)return{anticipateBottom:0,anticipateInnerIn:0,anticipateInnerOut:0};let o=this.#me(t),n=r===v.SCROLL_UP?0:o,s=r===v.SCROLL_UP?0:o*2,i=r===v.SCROLL_UP?o:0;return{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}}#ye(t,r){if(this.#b&&!this.#T||this.#T&&!this.#$)return{anticipateBottom:0,anticipateInnerIn:0,anticipateInnerOut:0};let o=this.#me(t),n=r===v.SCROLL_UP?o:0,s=r===v.SCROLL_UP?o*2:0,i=r===v.SCROLL_UP?0:o;return{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}}onScroll(t){if(!this.#E||!this.#a)return;if(this.#I&&this.#F<this.#H){this.#F++;return}else this.#F=0,this.#I=!1;let r=this.#N>t?v.SCROLL_UP:v.SCROLL_DOWN,o=this.#c===v.DIRECTION_VERTICAL?It(this.#a).top:It(this.#a).left,{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}=this.#l?this.#ye(t,r):this.#z(t,r),a=this.#l?o<this.#t-n:o>this.#n-this.#t+n,c=this.#l?o>=this.#t-s&&o<=this.#t+i+this.#d:o<=this.#n-this.#t+s&&this.#n-o<=this.#d+i+this.#t;if(a)this.#x||(this.#X(),this.#ne(),this.#x=!0,this.#m=!1,this.#g=!1);else if(c){if(!this.#m){this.#J();let l=r===v.SCROLL_DOWN&&!this.#l||r===v.SCROLL_UP&&this.#l;this.#V(),l?this.#fe():this.#pe(),this.#x=!1,this.#m=!0,this.#g=!1}}else this.#g||(this.#q(),this.#ne(),this.#x=!1,this.#m=!1,this.#g=!0);this.#N=t,this.#T=!1}};var ly=()=>{console.warn("parallax prop checker: value in start or end prop with no unit misure is not allowed, failed operation, use vh in vertical mode or vw in horizontal or px")},uy=()=>{console.warn("parallax prop checker: value in start or end in vh is not allowed in horizontal mode, use vw or px")},py=()=>{console.warn("parallax prop checker: value in start or end in vw is not allowed in vertical mode, use vh or px")};var Au=()=>({numberVal:0,unitMisure:"",additionalVal:"",position:""}),my=({invert:e,endValInNumber:t,scrollerHeight:r,isNegative:o,startPoint:n,isFromTopLeft:s})=>{let i=t*o-n,a=r-t*o-n;return e?s?i:a:s?a:i},dy=({invert:e,scrollerHeight:t,screenUnit:r,endValInNumber:o,isNegative:n,startPoint:s,isFromTopLeft:i})=>e?i?t-r*(100-o*n)-s:r*(100-o*n)-s:i?t-r*o*n-s:r*o*n-s,hy=({offset:e,height:t,gap:r,wScrollTop:o,wHeight:n})=>e+t>o-r&&e<o+(n+r),fy=(e,t)=>{let r=e.find(c=>[...c].some(l=>!Number.isNaN(Number.parseFloat(l)))),o=yv(r);if(r&&!o)return ly(),Au();if(r&&o===v.VH&&t===v.DIRECTION_HORIZONTAL)return uy(),Au();if(r&&o===v.VW&&t===v.DIRECTION_VERTICAL)return py(),Au();let n=[v.PLUS_HEIGHT,v.PLUS_HEIGHT_HALF,v.PLUS_WIDTH,v.PLUS_WIDTH_HALF,v.MINUS_HEIGHT,v.MINUS_HEIGHT_HALF,v.MINUS_WIDTH,v.MINUS_WIDTH_HALF],s=e.find(c=>vu(n,c)),i=[v.POSITION_BOTTOM,v.POSITION_TOP,v.POSITION_LEFT,v.POSITION_RIGHT],a=e.find(c=>vu(i,c));return{numberVal:r||0,unitMisure:o,additionalVal:s??"",position:a??v.POSITION_BOTTOM}},gy=(e,t,r)=>{let n=String(t).split(" "),{numberVal:s,unitMisure:i,additionalVal:a,position:c}=fy(n,r),p=String(s).charAt(0)==="-"?-1:1,f=Number.parseFloat(String(s).replaceAll(/^\D+/g,""))??0;return i===v.PX?{value:f*p,additionalVal:a,position:ka(c)}:{value:e*f*p,additionalVal:a,position:ka(c)}},by=(e,t,r,o,n,s)=>{let a=String(t).split(" "),{numberVal:c,unitMisure:l,additionalVal:p,position:d}=fy(a,s),h=String(c).charAt(0)==="-"?-1:1,b=Number.parseFloat(String(c).replaceAll(/^\D+/g,""))??0,T=ka(d),_=T===v.POSITION_TOP||T===v.POSITION_LEFT;return l===v.PX?{value:my(n?{invert:!0,endValInNumber:b,scrollerHeight:o,isNegative:h,startPoint:r,isFromTopLeft:_}:{invert:!1,endValInNumber:b,scrollerHeight:o,isNegative:h,startPoint:r,isFromTopLeft:_}),additionalVal:p,position:T}:{value:dy(n?{invert:!0,scrollerHeight:o,screenUnit:e,endValInNumber:b,isNegative:h,startPoint:r,isFromTopLeft:_}:{invert:!1,scrollerHeight:o,screenUnit:e,endValInNumber:b,isNegative:h,startPoint:r,isFromTopLeft:_}),additionalVal:p,position:T}},Ou=(e,t,r,o)=>{let n=String(t);return Oe(n,v.PLUS_HEIGHT_HALF)?e+r/2:Oe(n,v.PLUS_HEIGHT)?e+r:Oe(n,v.PLUS_WIDTH_HALF)?e+o/2:Oe(n,v.PLUS_WIDTH)?e+o:Oe(n,v.MINUS_HEIGHT_HALF)?e-r/2:Oe(n,v.MINUS_HEIGHT)?e-r:Oe(n,v.MINUS_WIDTH_HALF)?e-o/2:Oe(n,v.MINUS_WIDTH)?e-o:e},vy=({switchPropierties:e,isReverse:t,value:r})=>{switch(e){case v.IN_STOP:return!t&&r>0||t&&r<0?0:r;case v.IN_BACK:return!t&&r>0||t&&r<0?-r:r;case v.OUT_STOP:return!t&&r<0||t&&r>0?0:r;case v.OUT_BACK:return!t&&r<0||t&&r>0?-r:r;default:return r}},yy=(e,t)=>e===v.PROP_OPACITY?1-t:-t,$u=({callback:e,pin:t,ease:r,useThrottle:o})=>t?u.useScrollImmediate(e):r&&o?u.useScrollThrottle(e):u.useScroll(e);var go=class{#n=!1;#t=!1;#i=0;#l=0;#d=0;#u=0;#s=0;#c=0;#r=0;#e;#p;#a;#h;#f;#o;#g;#m;#x;#_;#y;#v;#T;#k;#S;#w;#A;#R;#O;#E;#N;#P;#b;#D;#B;#I;#F;#L;#C;#Y;#H;#M;#W;#$;#U;#G;#re;#K;#se;#ee;#Q;#oe;#ie;#ue;#ce;#fe;#pe;#be;#ge;#X;#q;#J;#j;#Z;#te;#V;#ne;#me;#z;#ye;#de;#he;#le;#Ee;#Te;#ve;#Ce;#we;#Ie;#Re;#ae;constructor(t){this.#e=window.innerWidth,this.#p=window.innerHeight,this.#a=800,this.#h=0,this.#f=()=>{},this.#o=()=>{},this.#g=()=>{},this.#m=()=>{},this.#x=()=>{},this.#_=void 0,this.#y=void 0,this.#v=void 0,this.#T=0,this.#k=!1,this.#S=void 0,this.#w=!0,this.#A=!1,this.#R=!1,this.#O=!1,this.#E=void 0,this.#N="",this.#P=0,this.#b=0,this.#D=()=>{},this.#B=()=>{},this.#M=!1,this.#I=le(t?.pin,"Scrolltrigger pin propierties error:",!1),this.#F=le(t?.animatePin,"Scrolltrigger animatePin propierties error:",!1),this.#L=le(t?.forceTranspond,"Scrolltrigger forceTranspond propierties error:",!1),this.#C=le(t?.anticipatePinOnLoad,"Scrolltrigger anticipatePinOnLoad propierties error:",!1),this.#Y=$a(t?.start,"Scrolltrigger start propierties error:","bottom 0px"),this.#H=$a(t?.end,"Scrolltrigger end propierties error:","top"),this.#W=$a(t?.marker,"Scrolltrigger marker propierties error:",void 0),this.#$=t?.dynamicStart?Eu(t.dynamicStart,"dynamicStart"):null,this.#U=t?.dynamicEnd?Eu(t.dynamicEnd,"dynamicEnd"):null,this.#G=Dv(t?.dynamicRange),this.#re=le(t?.animateAtStart,"Scrolltrigger animateAtStart propierties error:",!1),this.#K=po(t?.onEnter,!1,"Scrolltrigger onEnter propierties error"),this.#se=po(t?.onEnterBack,!1,"Scrolltrigger onEnterBack propierties error"),this.#ee=po(t?.onLeave,!1,"Scrolltrigger onLeave propierties error"),this.#Q=po(t?.onLeaveBack,!1,"Scrolltrigger onLeaveBack propierties error"),this.#oe=po(t?.onTick,!1,"Scrolltrigger onTickCallback propierties error"),this.#ie=Bv(t?.align),this.#ue=Vv(t?.onSwitch),this.#ce=le(t?.reverse,"Parallax reverse propierties error:",!1),this.#fe=wu(t?.opacityStart,"Parallax opacityStart propierties error:",100),this.#pe=wu(t?.opacityEnd,"Parallax opacityEnd propierties error:",0),this.#be=le(t?.limiterOff,"Parallax|Scrolltrigger limiterOff propierties error:",!1),this.#ge=t?.useWillChange,this.#X=Fv(t?.tween);let r=this.#X?.getType&&this.#X.getType()===v.TWEEN_TIMELINE,o=this.#X?.getType&&this.#X.getType()===v.TWEEN_TWEEN;this.#q=Fn(t?.item,!1),this.#J=Fn(t?.scroller,!0),this.#j=Fn(t?.screen,!0),this.#Z=Cu(t?.trigger),this.#te=Cu(t?.applyTo),this.#V=Fs(t?.direction,"Parallax/Scrolltrigger"),this.#ne=le(t?.disableForce3D,"Parallax|Scrolltrigger disableForce3D propierties error:",!1),this.#me=le(t?.useThrottle,"Parallax|Scrolltrigger useThrottle propierties error:",!1),this.#z=Wv(t?.type),this.#ye=ur(t?.perspective,"Parallax|Scrolltrigger perspective propierties error:",0),this.#de=Wo(t?.breakpoint,"breakpoint","parallax/scrolltrigger"),this.#he=jo(t?.queryType,"queryType","parallax/scrolltrigger");let{propierties:n,shouldTrackOnlyEvents:s}=zv(t?.propierties,this.#z,o,r);this.#le=n,this.#Ee=s,this.#Te=s?"100px":jv(t?.range,this.#z),this.#ve=le(t?.ease,"Parallax|Scrolltrigger ease propierties error:",!1),r&&t?.easeType===v.EASE_SPRING&&sv(),this.#Ce=r?v.EASE_LERP:Hv(t?.easeType),this.#we=Uv(t?.springConfig,this.#z),this.#Ie=Gv(t?.lerpConfig,this.#z),this.#Re=this.#Ce===v.EASE_SPRING?{configProps:{precision:v.EASE_PRECISION}}:{precision:v.EASE_PRECISION},this.#ae=this.#Ce===v.EASE_SPRING?new Gt:new Or}init(){if(this.#n){console.warn("Parallax/scrollTrigger: The init() method cannot be launched more than once. If you are passing the instance to components like horizontalScroller or smoothScroller via the children property, they will initialize the instance.");return}this.#n=!0,this.#je(),this.#Oe(),this.#Ae(),this.#$e(),this.#Le(),this.#Fe(),this.setPerspective(),this.#le===v.PROP_TWEEN&&(this.#Te=this.#X?.getDuration?this.#X.getDuration():0,this.#G=()=>this.#Te,this.#X?.inzializeStagger?.()),this.#z==v.TYPE_SCROLLTRIGGER&&(this.#be=!0,this.#Pe(),this.#Me()),this.#ve&&(this.#g=u.useScrollStart(()=>{this.#ne||(this.#O=!0)}),this.#m=u.useScrollEnd(()=>{u.useFrame(()=>{u.useNextTick(()=>{this.#xe()})})}),this.#J===globalThis&&(this.#o=$u({pin:this.#I,ease:this.#ve,useThrottle:this.#me,callback:()=>{this.#xe()}})),this.#xe()),this.#ve||(this.#J===globalThis&&(this.#o=$u({pin:this.#I,ease:this.#ve,useThrottle:this.#me,callback:()=>{this.#_e(),this.#Se()}})),this.#_e(),this.#Se(),this.#m=u.useScrollEnd(()=>{this.#Se({forceRender:!0})})),this.#J!==globalThis&&this.#W&&(this.#x=u.useScroll(()=>{this.#Me()})),this.#f=u.useResize(({horizontalResize:t})=>{t&&this.refresh()}),this.#I&&(this.#E=new qa,be[this.#he](this.#de)&&u.useNextTick(()=>{this.#De(),this.#E?.init(this.#Ne()),this.#E?.onScroll(this.#c)}))}#Ne(){return{item:this.#q,marker:this.#W,screen:this.#j,animatePin:this.#F,anticipatePinOnLoad:this.#C,forceTranspond:this.#L,invertSide:this.#M,direction:this.#V,scrollerHeight:this.#r,getStart:()=>this.#P,getEnd:()=>this.#b}}setScroller(t){this.#J=Fn(t,!0)}setScreen(t){this.#j=Fn(t,!0)}setDirection(t){this.#V=Fs(t,"Parallax/Scrolltrigger")}setBreakPoint(t){this.#de=Wo(t,"breakpoint","Parallax/Scrolltrigger")}setQueryType(t){this.#he=jo(t,"queryType","Parallax/Scrolltrigger")}setPerspective(){if(this.#ye&&this.#q&&this.#q.parentNode){let t={perspective:`${this.#ye}px`,"transform-style":"preserve-3d"},r=this.#q.parentNode;Object.assign(r.style,t)}}#je(){let t=v.PROP_SCALE||v.PROP_SCALE_X||v.PROP_SCALE_Y||v.PROP_OPACITY?1:0;switch(this.#ae.setData({val:t}),this.#D=this.#ae.subscribe(({val:r})=>{r!==this.#v&&(this.#le===v.PROP_TWEEN&&this.#X?.draw?(this.#X.draw({partial:r,isLastDraw:!1,useFrame:!1}),this.#v=r,this.#w=!1):this.#ke(r),u.useNextTick(()=>{this.#oe&&this.#oe({value:r,parentIsMoving:!0})}))}),this.#B=this.#ae.onComplete(({val:r})=>{this.#O=!1,this.#le===v.PROP_TWEEN&&this.#X?.draw?this.#X.draw({partial:r,isLastDraw:!0,useFrame:!1}):this.#ke(r),u.useNextTick(()=>{this.#oe&&this.#oe({value:r,parentIsMoving:!1})})}),this.#Ce){case v.EASE_LERP:{this.#Ie&&"updateVelocity"in this.#ae&&this.#ae?.updateVelocity?.(this.#Ie);break}case v.EASE_SPRING:{this.#we&&"updateConfig"in this.#ae&&this.#ae?.updateConfig?.(this.#we);break}}}#Pe(){if(this.#G){let t=this.#G();this.#h=Number.isNaN(t)?0:Number.parseFloat(t),this.#N=v.PX}else{let t=String(this.#Te),o=t.charAt(0)==="-"?-1:1,n=qv(t,this.#le);this.#h=Number.parseFloat(n.replaceAll(/^\D+/g,""))*o,this.#N=Tv(n)}}#Me(){let t=this.#r/100;if(this.#$&&this.#$?.position&&this.#$?.value?.()!==void 0){let{position:l,value:p}=this.#$,d=p();Number.isNaN(d)||(this.#Y=`${l} ${d}px`)}let{value:r,additionalVal:o,position:n}=gy(t,this.#Y,this.#V);if(this.#M=n===v.POSITION_TOP||n===v.POSITION_LEFT,this.#P=Ou(r,o,this.#V===v.DIRECTION_VERTICAL?this.#u:this.#s,this.#V===v.DIRECTION_VERTICAL?this.#s:this.#u),this.#U&&this.#U?.position&&this.#U?.value?.()!==void 0){let{position:l,value:p}=this.#U,d=p();Number.isNaN(d)||(this.#H=`${l} ${d}px`)}let{value:s,additionalVal:i,position:a}=by(t,this.#H,this.#P,this.#r,this.#M,this.#V),c=this.#M?a===v.POSITION_BOTTOM||a===v.POSITION_RIGHT?-1:1:a===v.POSITION_BOTTOM||a===v.POSITION_RIGHT?1:-1;this.#b=Ou(s,i,this.#V===v.DIRECTION_VERTICAL?this.#u*c:this.#s*c,this.#V===v.DIRECTION_VERTICAL?this.#s*c:this.#u*c),this.#ze(),this.#M&&(this.#P-=this.#u)}#ze(){if(this.#W){let{startMarker:t,endMarker:r}=ay({startMarker:this.#_,endMarker:this.#y,startPoint:this.#P,endPoint:this.#b,screen:this.#j,direction:this.#V,invertSide:this.#M,label:this.#W});this.#_=t,this.#y=r}}#Ae(){let t=this.#Z??this.#q;if(!t)return;let r=0,o=0,n=0;this.#Z&&(r=Co(this.#Z)?.x??0,o=Co(this.#Z)?.y??0,n=Co(this.#Z)?.z??0),t.style.transform="",this.#V===v.DIRECTION_VERTICAL?this.#i=this.#J===globalThis?Math.trunc(de(t).top):Math.trunc(de(t).top)-de(this.#J).top:this.#i=this.#J===globalThis?Math.trunc(de(t).left):Math.trunc(de(t).left)-de(this.#J).left,this.#j&&this.#j!==globalThis&&(this.#i-=this.#V===v.DIRECTION_VERTICAL?Math.trunc(de(this.#j).top):Math.trunc(It(this.#j).left)),this.#Z&&(r!==0||o!==0||n!==0)&&(this.#Z.style.transform=`translate3D(${r}px, ${o}px, ${n}px)`)}#Oe(){this.#j===globalThis||!this.#j||(this.#l=this.#V===v.DIRECTION_VERTICAL?Math.trunc(de(this.#j).top):Math.trunc(It(this.#j).left))}#$e(){let t=this.#Z??this.#q;t&&(this.#u=this.#V===v.DIRECTION_VERTICAL?Math.trunc(t.offsetHeight):Math.trunc(t.offsetWidth))}#Le(){let t=this.#Z??this.#q;t&&(this.#s=this.#V===v.DIRECTION_VERTICAL?Math.trunc(t.offsetWidth):Math.trunc(t.offsetHeight))}#De(){this.#J&&(this.#J===globalThis?this.#c=this.#V===v.DIRECTION_VERTICAL?this.#J.scrollY:this.#J.scrollX:this.#c=this.#V===v.DIRECTION_VERTICAL?-de(this.#J).top:-de(this.#J).left)}#Fe(){this.#j&&(this.#e=window.innerWidth,this.#p=window.innerHeight,this.#j===globalThis?this.#r=this.#V===v.DIRECTION_VERTICAL?window.innerHeight:window.innerWidth:this.#r=this.#V===v.DIRECTION_VERTICAL?Math.trunc(this.#j.offsetHeight):Math.trunc(this.#j.offsetWidth))}refresh(){this.#I&&this.#E&&this.#E.destroy(),this.#Oe(),this.#Ae(),this.#$e(),this.#Le(),this.#Fe(),this.#z==v.TYPE_SCROLLTRIGGER&&(this.#Me(),this.#G&&this.#Pe(),this.#I&&this.#E&&be[this.#he](this.#de)&&this.#E?.init(this.#Ne())),this.#v=void 0,this.#w=!0,be[this.#he](this.#de)?this.#ve?this.#xe():(this.#_e(),this.#Se({forceRender:!0})):(this.#ve&&this.#ae?.stop?.(),u.useFrameIndex(()=>{this.#te?(this.#Ve(this.#te),Object.assign(this.#te.style,this.#We())):(this.#Ve(this.#q),this.#q&&Object.assign(this.#q.style,this.#We()))},3))}move({value:t,parentIsMoving:r=!1}){if(!be[this.#he](this.#de)||!t)return;this.#R=!0;let o=this.#He(t);if(this.#ve)this.#xe(o);else{this.#_e(o);let n=this.#A||this.#w||void 0;this.#Se({forceRender:n,parentIsMoving:r})}}triggerScrollStart(){this.#ve&&(this.#ne||(this.#O=!0))}triggerScrollEnd(){this.#ve||this.#Se({forceRender:!0})}#He(t){if(t!==void 0)return this.#j!==globalThis?t+this.#l:t}stopMotion(){this.#ae?.stop?.()}#_e(t){if(!be[this.#he](this.#de)||(t?this.#c=-t:this.#De(),this.#A=hy({offset:this.#i,height:this.#u,gap:this.#a,wScrollTop:this.#c,wHeight:this.#r}),!this.#A&&!this.#be&&this.#z===v.TYPE_PARALLAX))return;this.#I&&this.#E&&this.#E.onScroll(this.#c),this.#z===v.TYPE_SCROLLTRIGGER?this.#d=_e(this.#Ue()):this.#le===v.PROP_OPACITY?this.#d=_e(this.#qe()):this.#d=Number.isNaN(Number.parseInt(this.#ie))?_e(this.#Je()/2):_e(this.#Ye()/2);let r=this.#ce&&this.#z!==v.TYPE_SCROLLTRIGGER?yy(this.#le,this.#d):this.#d;this.#d=this.#z===v.TYPE_SCROLLTRIGGER?r:this.#Xe(r)}#xe(t){if(!be[this.#he](this.#de)||(this.#_e(t),!this.#k&&!this.#w&&this.#z===v.TYPE_SCROLLTRIGGER)||!this.#A&&!this.#w&&this.#z===v.TYPE_PARALLAX)return;let r=this.#w&&!this.#re?"set":"goTo";this.#ae&&this.#ae[r]({val:this.#d},this.#Re).catch(()=>{})}#Se({forceRender:t=!1,parentIsMoving:r=!1}={}){be[this.#he](this.#de)&&u.useFrame(()=>{this.#d===this.#v&&!t||!this.#A&&!t||(!this.#ne&&!this.#R&&(this.#O=!t),!this.#ne&&this.#R&&(this.#O=r&&this.#A),this.#le===v.PROP_TWEEN?(this.#X.draw({partial:this.#d,isLastDraw:!this.#O,useFrame:!1}),this.#v=this.#d,this.#w=!1):this.#ke(this.#d),u.useNextTick(()=>{this.#oe&&this.#oe({value:this.#d,parentIsMoving:this.#O})}))})}#Ue(){let t=this.#M?-(this.#c+this.#P+this.#b-(this.#i+this.#b)):-(this.#c+this.#r-this.#P-(this.#i+this.#b)),r=this.#b/100*this.#h,o=t/100*this.#h,n=this.#ce?this.#M?r-o:o:this.#M?o:r-o,s=r>0?-ot(n,0,r):-ot(n,r,0);if(this.#k=this.#S!==s,this.#S=s,!this.#k&&!this.#w)return this.#d;let i=s*100/this.#b;switch((this.#K||this.#se||this.#ee||this.#Q)&&iy({prevValue:this.#T,value:n,maxVal:r,onEnter:this.#K,onEnterBack:this.#se,onLeave:this.#ee,onLeaveBack:this.#Q}),this.#T=n,this.#le){case v.PROP_HORIZONTAL:case v.PROP_VERTICAL:return this.#Ge(i);case v.PROP_SCALE:case v.PROP_SCALE_X:case v.PROP_SCALE_Y:case v.PROP_OPACITY:return 1-i;default:return-i}}#Ge(t){switch(this.#N){case v.VW:return this.#e/100*-t;case v.VH:return this.#p/100*-t;case v.WPERCENT:return this.#V===v.DIRECTION_VERTICAL?this.#s/100*-t:this.#u/100*-t;case v.HPERCENT:return this.#V===v.DIRECTION_VERTICAL?this.#u/100*-t:this.#s/100*-t;default:return-t}}#qe(){let t=this.#r/100*this.#pe,r=this.#r-this.#r/100*this.#fe,o=this.#ie==v.ALIGN_START?-this.#c*-1:(this.#c+t-this.#i)*-1,n=this.#ie==v.ALIGN_START?1-o/this.#i:1-o/(this.#r-r-t);return ot(n,0,1)}#Je(){let t=Number(this.#Te),r=Number.isNaN(t)?0:t,o=this.#V===v.DIRECTION_VERTICAL?document.documentElement.scrollHeight:document.documentElement.scrollWidth;switch(this.#ie){case v.ALIGN_START:return(this.#c+this.#l)/r;case v.ALIGN_TOP:case v.ALIGN_LEFT:return(this.#c-this.#i)/r;case v.ALIGN_CENTER:return(this.#c+(this.#r/2-this.#u/2)-this.#i)/r;case v.ALIGN_BOTTOM:case v.ALIGN_RIGHT:return(this.#c+(this.#r-this.#u)-this.#i)/r;case v.ALIGN_END:return-(o-(this.#c+this.#r))/r;default:return 0}}#Ye(){let t=Number(this.#ie),r=Number(this.#Te);return(this.#c+this.#r/100*t-this.#i)/r}#Xe(t){return vy({switchPropierties:this.#ue,isReverse:this.#ce,value:t})}#ke(t){this.#te?Object.assign(this.#te.style,this.#Be(t)):this.#q&&Object.assign(this.#q.style,this.#Be(t)),this.#v=t,this.#w=!1}#Be(t){if(this.#Ee)return;let r=this.#O?"translate3D(0px, 0px, 0px)":"";this.#t=this.#ge?u.mustMakeSomething():!1;let o=this.#t&&this.#O?"transform":"",n=u.shouldMakeSomething()?Math.round(t):t;switch(this.#le){case v.PROP_VERTICAL:return{transform:`${r} translateY(${n}px)`,willChange:o};case v.PROP_HORIZONTAL:return{transform:`${r} translateX(${n}px)`,willChange:o};case v.PROP_ROTATE:return{transform:`${r} rotate(${n}deg)`,willChange:o};case v.PROP_ROTATEY:return{transform:`${r} rotateY(${n}deg)`,willChange:o};case v.PROP_ROTATEX:return{transform:`${r} rotateX(${n}deg)`,willChange:o};case v.PROP_ROTATEZ:return{transform:`${r} rotateZ(${n}deg)`,willChange:o};case v.PROP_OPACITY:return{opacity:`${t}`};case v.PROP_SCALE:{let s=this.#z===v.TYPE_SCROLLTRIGGER?t:1+t/1e3;return{transform:`${r} scale(${s})`,willChange:o}}case v.PROP_SCALE_X:{let s=this.#z===v.TYPE_SCROLLTRIGGER?t:1+t/1e3;return{transform:`${r} scaleX(${s})`,willChange:o}}case v.PROP_SCALE_Y:{let s=this.#z===v.TYPE_SCROLLTRIGGER?t:1+t/1e3;return{transform:`${r} scaleY(${s})`,willChange:o}}default:return{[this.#le.toLowerCase()]:`${t}px`}}}#Ve(t){this.#X&&t&&(t.style="")}#We(){if(!this.#Ee)switch(this.#le){case v.PROP_VERTICAL:case v.PROP_HORIZONTAL:case v.PROP_ROTATE:case v.PROP_ROTATEY:case v.PROP_ROTATEX:case v.PROP_ROTATEZ:case v.PROP_SCALE:return{transform:""};case v.PROP_OPACITY:return{opacity:""};default:return{[this.#le.toLowerCase()]:""}}}destroy(){this.#ae?.stop?.(),this.#o(),this.#g(),this.#m(),this.#f(),this.#D(),this.#B(),this.#x(),this.#ae?.destroy?.(),this.#ae=null,this.#G=()=>{},this.#$?.value&&(this.#$.value=()=>0),this.#U?.value&&(this.#U.value=()=>0),this.#K=()=>{},this.#se=()=>{},this.#ee=()=>{},this.#Q=()=>{},this.#oe=()=>{},this.#I&&this.#E&&this.#E?.destroy?.(),this.#_&&this.#_?.remove?.(),this.#y&&this.#y?.remove?.(),this.#_=void 0,this.#y=void 0,this.#E=void 0,this.#d=0;let t=this.#te??this.#q;t&&"style"in t&&(t.style=""),this.#q=null,this.#J=null,this.#j=null,this.#Z=null,this.#te=null}};function RI(e){return new go({...e,type:v.TYPE_PARALLAX})}function NI(e){return new go({...e,type:v.TYPE_SCROLLTRIGGER})}var Lu=window.innerHeight,Du=document.body.offsetHeight,bo=!1,Fu=!0,qt=window.scrollY,Gs=!0,Jt=!1,Bu=()=>{},Vu=()=>{},Ya=()=>{},Ja,Ty=()=>{document.body.classList.remove("is-whelling")},PI=()=>{document.body.classList.add("is-whelling")};ce.setDefault({usePassive:!1});var AI=({velocity:e,rootElement:t})=>{let r=H.createLerp({data:{scrollValue:window.scrollY},precision:1,velocity:.1});Ja=t;let o=r.subscribe(({scrollValue:d})=>{Jt||window.scrollTo({top:Math.round(d),left:0,behavior:"instant"})});r.onComplete(()=>{qt=window.scrollY});let n=u.useMouseWheel(d=>{if(Jt)return;d.preventDefault(),Gs=!1,PI();let f=d.spinY??0,h=ce.clamp(f*e+qt,0,Du-Lu);qt=h,r.goTo({scrollValue:h}).catch(()=>{})}),s=u.useMouseWheel(({preventDefault:d})=>{Fu&&d()}),i=u.useMouseWheel(u.debounce(()=>{Ty()},500)),a=u.useScrollEnd(()=>{let d=window.scrollY;qt=d,r.setImmediate({scrollValue:d})}),c=u.useScroll(()=>{if(!Gs)return;let d=window.scrollY;qt=d,r.setImmediate({scrollValue:d})}),l=u.usePointerDown(()=>{Jt||(Ty(),r.stop(),qt=window.scrollY,Gs=!0)}),p=new ResizeObserver(()=>{r.stop(),r.setImmediate({scrollValue:window.scrollY}),qt=window.scrollY,Lu=window.innerHeight,Du=document.body.offsetHeight});return p.observe(t),{destroy:()=>{bo=!1,qt=0,Gs=!0,Jt=!1,Ja&&(p.unobserve(Ja),p.disconnect()),r?.stop(),r?.destroy(),r=null,Ja=null,o(),c(),a(),n(),l(),i(),s(),Bu=()=>{},Vu=()=>{},Ya=()=>{}},stop:()=>{r.stop(),qt=window.scrollY},update:()=>{r.setImmediate({scrollValue:window.scrollY})}}},Xa=({velocity:e=100,rootElement:t=document.createElement("div")}={})=>{bo||(qt=window.scrollY,bo=!0,Jt=!1,Lu=window.innerHeight,Du=document.body.offsetHeight,Fu=!0,Gs=!1,{destroy:Bu,stop:Vu,update:Ya}=AI({velocity:e,rootElement:t}))},dr=()=>{!bo||Jt||(Vu(),Jt=!0)},Yt=()=>{!bo||!Jt||(Jt=!1)},qs=()=>{!bo||!Jt||(Ya(),qt=window.scrollY,Jt=!1)},Wu=()=>{bo&&Ya()},ju=()=>{Bu()},Sy=()=>{Fu=!0};var _y=()=>bo;var xy="easeOutQuad",Js=new $r({ease:xy,data:{val:0}}),Ka=!1,zu=!1;Js.subscribe(({val:e})=>{window.scrollTo({top:e,left:0,behavior:"auto"}),Wu()});var Hu=()=>{zu&&(document.body.style.overflow=""),Js?.updateEase?.(xy),qs()},Uu=()=>{Ka&&(Js.stop(),Hu())};u.useMouseWheel(()=>{Uu()});u.useMouseDown(()=>{Uu()});u.useTouchStart(()=>{Uu()});var Lr={to:(t,r)=>{if(typeof globalThis>"u")return;let o=t?Xc(t)||u.checkType(Number,t)?Xc(t)?de(t).top:t:(console.warn(`bodyScroll ${t} is not valid target, must be a node or a number`),0):0,n=ur(r?.duration,"bodyScroll: duration",500);return zu=le(r?.overflow,"bodyScroll: overflow",!1),Oa(r?.ease)&&Js?.updateEase?.(r?.ease),zu&&(document.body.style.overflow="hidden"),new Promise(s=>{Ka=!0,dr(),Js.goFromTo({val:window.scrollY},{val:o},{duration:n}).then(()=>{Hu(),Ka=!1,s(!0)}).catch(()=>{Hu(),Ka=!1,s(!0)})})}};var Ys={END:"END",START:"START",CENTER:"CENTER"};var OI=e=>{switch(e){case Ys.END:return"align-items:flex-end;";case Ys.CENTER:return"align-items:center;";default:return"align-items:flex-start;"}},Cy=({mainContainer:e,queryType:t,breakpoint:r,container:o,trigger:n,row:s,column:i,shadow:a,useSticky:c,columnHeight:l,columnWidth:p,columnAlign:d})=>{let f=be.getBreackpoint(r),h="user-select:none",y=c?"relative":"absolute",b=c?"position:sticky;top:0;":"",T=OI(d),_=p?`width:${p}vw;`:"",S=`
      @media (${t}-width:${f}px){${o}{position:relative;${h}}}@media (${t}-width:${f}px){${n}{z-index:10;position:${y};pointer-events:none;overflow:hidden;top:0;left:0;right:0}}@media (${t}-width:${f}px){${s}{--sectionheight:${l}vh}}@media (${t}-width:${f}px){${s}{display:flex;height:100vh;${b}${T}}}@media (${t}-width:${f}px){${i}{height:var(--sectionheight);flex:0 0 auto;${_}}}.${a}{display:none}@media (${t}-width:${f}px){.${a}{width:100%;display:block;pointer-events:none}}.${a}{display:none}@media (${t}-width:${f}px){.${a}{pointer-events:none;display:block;position:absolute;left:0;right:0}.${a}--end,.${a}--in-center,.${a}--left,.${a}--out-center{opacity:0;border:1px red dashed;width:25%}.${a}--end.debug,.${a}--in-center.debug,.${a}--left.debug,.${a}--out-center.debug{opacity:1}.${a}--in-center{position:absolute;top:0;right:0;padding:0 40px;text-align:center}.${a}--out-center{position:absolute;top:0;right:0;padding:0 40px;text-align:center}.${a}--left{position:absolute;top:0;left:50%;transform:translateX(-50%);padding:0 40px;text-align:center}.${a}--end{position:absolute;top:0;left:0;padding-left:40px}}`,E=document.createElement("div");E.classList.add("scroller-style");let C=document.createElement("style");C.append(document.createTextNode(S)),E.append(C),e.prepend(E)};var Xs=class{#n=!0;#t=0;#i=!1;#l=0;#d=100;#u=100;#s=!1;#c=0;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#_;#y;#v;#T;#k;#S;#w;#A;#R;#O;#E;#N;#P;#b;#D;#B;#I;#F;#L;#C;#Y;#H;#M;#W;#$;#U;#G;#re;#K;#se;#ee;#Q;#oe;#ie;#ue;#ce;#fe;#pe;constructor(t){this.#r=()=>{},this.#pe=0,this.#F=t?.container??"",this.#W=[],this.#$=!1,this.#U=0,this.#G={},this.#re=0,this.#K=t?.children||[],this.#e=le(t?.useDrag,"HorizontalScroller: useDrag",!1),this.#p=ur(t?.threshold,"HorizontalScroller: threshold",30),this.#a=le(t?.useWillChange,"HorizontalScroller: useWillChange",!1),this.#h=Wo(t?.breakpoint,"breakpoint","horizontalScroller"),this.#f=jo(t?.queryType,"queryType","horizontalScroller"),this.#o=le(t?.forceTranspond,"HorizontalScroller: forceTranspond",!1),this.#g=le(t?.addCss,"HorizontalScroller: addCss",!0),this.#m=le(t?.animateAtStart,"HorizontalScroller: animateAtStart",!1),this.#x=le(t?.ease,"HorizontalScroller: ease",!1),this.#_=Fa(t?.easeType??"","HorizontalScroller"),this.#y=le(t?.useSticky,"HorizontalScroller: useSticky",!1),this.#v=le(t?.animatePin,"HorizontalScroller: animatePin",!1),this.#T=le(t?.reverse,"HorizontalScroller: reverse",!1),this.#k=le(t?.useThrottle,"HorizontalScroller: useThrottle",!1),this.#S=ur(t?.columnHeight,"HorizontalScroller: columnHeight",100),this.#w=ur(t?.columnWidth,"HorizontalScroller: columnWidth",null),this.#A=t?.columnAlign?t.columnAlign.toUpperCase():Ys.START,this.#R=ct(t?.onEnter,"HorizontalScroller: onEnter",Z),this.#O=ct(t?.onEnterBack,"HorizontalScroller: onEnterBack",Z),this.#E=ct(t?.onLeave,"HorizontalScroller: onLeave",Z),this.#N=ct(t?.onLeaveBack,"HorizontalScroller: onLeaveBack",Z),this.#P=ct(t?.afterInit,"HorizontalScroller: afterInit",Z),this.#b=ct(t?.afterRefresh,"HorizontalScroller: afterRefresh",Z),this.#D=ct(t?.afterDestroy,"HorizontalScroller: afterDestroy",Z),this.#B=ct(t?.onTick,"HorizontalScroller: onTick",void 0),this.#I=u.checkType(String,t.root)?document.querySelector(t.root):t.root,this.#I||(this.#n=!1,console.warn("horizontal custom: root node not found")),this.#I.querySelector(this.#F)||(this.#n=!1,console.warn("horizontal custom: container node not found")),this.#L=this.#I.querySelector(t.trigger),this.#L||(this.#n=!1,console.warn("horizontal custom: trigger node not found")),this.#C=this.#I.querySelector(t.row),this.#C||(this.#n=!1,console.warn("horizontal custom: row node not found")),this.#Y=this.#I.querySelectorAll(t.column),this.#Y.length===0&&(this.#n=!1,console.warn("horizontal custom: column nodeList not found")),this.#H=this.#I.querySelectorAll("[data-shadow]");let o=t?.shadowClass||"shadow";this.#M=o.replace(".",""),this.#W=this.#C.querySelectorAll("a, button"),this.#K.forEach(n=>{this.#C&&n.setScroller(this.#C),n.setDirection("horizontal"),n.setBreakPoint(this.#h),n.setQueryType(this.#f),n.init()}),this.#g&&Cy({mainContainer:this.#I,queryType:this.#f,breakpoint:this.#h,container:this.#F,trigger:t?.trigger??"trigger",row:t.row,column:t.column,shadow:this.#M,useSticky:this.#y,columnHeight:this.#S,columnWidth:this.#w,columnAlign:this.#A}),this.#se=n=>{if(!this.#i)return;let{movementX:s}=n,i=this.#T?s:-s;this.#X(i)},this.#ee=()=>{be[this.#f](this.#h)&&(dr(),this.#s&&this.#C&&(this.#C.style.cursor="move"),this.#i=!0,this.#pe=this.#c)},this.#Q=()=>{Yt(),this.#i=!1,u.useFrame(()=>{this.#C&&(this.#C.style.cursor="")})},this.#oe=()=>{Yt(),this.#i=!1,u.useFrame(()=>{this.#C&&(this.#C.style.cursor="")})},this.#ie=n=>{be[this.#f](this.#h)&&(dr(),this.#l=-n.touches[0].clientX,this.#i=!0,this.#pe=this.#c)},this.#ue=()=>{Yt(),this.#i=!1},this.#ce=n=>{let s=-n.touches[0].clientX,i=this.#T?-s+this.#l:s-this.#l;this.#X(i),this.#l=s,this.#s&&n.cancelable&&n.defaultPrevented&&n.preventDefault()},this.#fe=n=>{Math.abs(this.#c-this.#pe)>this.#p&&n.preventDefault()}}init(){this.#n&&Ua(this.#te.bind(this),this.#Z.bind(this),this.#V.bind(this),this.#me.bind(this))().then(()=>{this.#z(),this.#e&&this.#J(),u.useResize(({horizontalResize:t})=>this.onResize(t)),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#P?.(),this.#K.forEach(t=>{t.refresh()})})},3)})}#be(){[...this.#W].forEach(t=>t.setAttribute("draggable","false"))}#ge(){[...this.#W].forEach(t=>t.removeAttribute("draggable"))}#X(t){this.#s&&u.useFrame(()=>window.scrollBy({top:t,left:0,behavior:"instant"}))}#q(){let t=window.scrollY;this.#s=this.#t-this.#u<t&&this.#t+this.#d+this.#U>t+window.innerHeight}#J(){this.#r=u.useScroll(()=>this.#q()),this.#q(),this.#C.addEventListener("click",this.#fe,{passive:!1}),this.#C.addEventListener("mousedown",this.#ee,{passive:!0}),this.#C.addEventListener("mouseup",this.#Q,{passive:!0}),this.#C.addEventListener("mouseleave",this.#oe,{passive:!0}),this.#C.addEventListener("touchstart",this.#ie,{passive:!0}),this.#C.addEventListener("touchend",this.#ue,{passive:!0}),this.#C.addEventListener("mousemove",this.#se,{passive:!0}),this.#C.addEventListener("touchmove",this.#ce,{passive:!0})}#j(){this.#r(),this.#C.removeEventListener("click",this.#fe),this.#C.removeEventListener("mousedown",this.#ee),this.#C.removeEventListener("mouseup",this.#Q),this.#C.removeEventListener("mouseleave",this.#oe),this.#C.removeEventListener("touchstart",this.#ie),this.#C.removeEventListener("touchend",this.#ue),this.#C.removeEventListener("mousemove",this.#se),this.#C.removeEventListener("touchmove",this.#ce)}#Z(){return!this.#L||!this.#I||!this.#C?new Promise(t=>{t(!0)}):new Promise(t=>{u.useFrame(()=>{let r=this.#U;this.#re=100*(r-window.innerWidth)/r,r>0&&(this.#L.style.height=`${r}px`,this.#I.style.height=`${r}px`,this.#C.style.width=`${r}px`),t(!0)})})}#te(){return new Promise(t=>{u.useFrame(()=>{if(!be[this.#f](this.#h)){t(!0);return}this.#U=[...this.#Y].map(r=>Ve(r)).reduce((r,o)=>r+o,0),t(!0)})})}#V(){return this.#L?new Promise(t=>{u.useFrame(()=>{if(!be[this.#f](this.#h)||!this.#H){t(!0);return}let r=[...this.#H].map(o=>{let n=o.dataset.shadow,s=Object.hasOwn(o.dataset,"debug"),i=s?"debug":"",a=s?`left left : ${n}`:"",c=s?`in center : ${n}`:"",l=s?`center out : ${n}`:"",p=s?`in out : ${n}`:"";return` <div
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
                        </div>`}).join("");this.#L.innerHTML=r,t(!0)})}):new Promise(t=>{t(!0)})}#ne(){this.#L&&(this.#L.innerHTML="")}#me(){return new Promise(t=>{if(!be[this.#f](this.#h)){t(!0);return}u.useFrame(()=>{this.#H&&([...this.#H].forEach(r=>{let o=this.#re/100,n=r.dataset.shadow,s=Ve(r),i=ne(this.#C),a=Co(this.#C)?.x??0,c=this.#T?this.#U-(r.getBoundingClientRect().right-a):r.getBoundingClientRect().left-a,l=window.innerWidth/window.innerHeight,p=window.innerWidth-window.innerHeight,d=c/l,f=c-c/l,h=this.#I.querySelector(`.${this.#M}[data-shadow="${n}"]`),y=h?.querySelector(`.${this.#M}--in-center`),b=h?.querySelector(`.${this.#M}--out-center`),T=h?.querySelector(`.${this.#M}--left`),_=h?.querySelector(`.${this.#M}--end`),S=window.innerWidth>window.innerHeight?window.innerHeight:0,E=window.innerWidth>window.innerHeight?window.innerHeight/2:0,C=c===0?0:d+f/o-p/o,M=(()=>{let k=window.innerWidth>window.innerHeight?p/o:p/o+window.innerWidth/l;return c===0?0:k})(),I=(()=>{let k=s/l,O=(s-s/l)/o;return k+O+M})(),P=I/2+E;this.#y&&(this.#L.style["margin-top"]=`-${i}px`),h&&(h.style.top=`${C}px`),y&&(y.style.height=`${P}px`),b&&(b.style.height=`${P}px`),b&&(b.style.top=`${P}px`),T&&(T.style.height=`${M}px`),_&&(_.style.height=`${I+S}px`),h&&(h.style.height=`${M}px`)}),t(!0))})})}#z(){if(!this.#L||!be[this.#f](this.#h))return;let t=new go({type:"scrolltrigger",item:this.#C,useWillChange:this.#a,trigger:this.#L,propierties:"x",breakpoint:"xSmall",pin:!this.#y,animatePin:this.#v,ease:this.#x,forceTranspond:this.#o,useThrottle:this.#k,easeType:this.#_,springConfig:"scroller",animateAtStart:this.#m,reverse:this.#T,dynamicRange:()=>-(this.#U-window.innerWidth),dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>this.#U},onTick:({value:r,parentIsMoving:o})=>{let n=r??0,s=Math.abs(-Math.round(n*100/(this.#U-window.innerWidth)));this.#c=n,this.#B&&this.#B({value:n,parentIsMoving:o,percent:this.#T?100-s:s}),this.#K.forEach(i=>{i.move({value:n,parentIsMoving:o})})},onEnter:this.#R,onEnterBack:this.#O,onLeave:this.#E,onLeaveBack:this.#N});t.init(),this.#$=!0,this.#G=t,this.#t=de(this.#L).top,this.#be()}#ye(){Ua(this.#te.bind(this),this.#Z.bind(this),this.#V.bind(this),this.#me.bind(this))().then(()=>{this.#z(),this.#de()})}#de(){u.useFrameIndex(()=>{u.useNextTick(()=>{this.#b?.(),this.#K.forEach(t=>{t?.refresh?.()})})},3)}refresh(){return!this.#$||!be[this.#f](this.#h)?new Promise(t=>t(!0)):new Promise(t=>{Ua(this.#te.bind(this),this.#Z.bind(this),this.#me.bind(this))().then(()=>{this.#G?.stopMotion?.(),this.#t=de(this.#L).top,this.#$&&(this.#G?.refresh?.(),this.#de()),t(!0)})})}#he({destroyAll:t=!1}){(this.#$||t)&&(this.#G?.destroy?.(),this.#G=null,this.#L&&(this.#L.style.height=""),this.#I&&(this.#I.style.height=""),this.#L&&(this.#L.style.marginTop=""),this.#ne(),this.#ge(),this.#$=!1,u.useFrameIndex(()=>{if(this.#C&&(this.#C.style.width="",this.#C.style.transform=""),t&&this.#I){this.#e&&this.#j();let r=this.#I.querySelector(".scroller-style");r&&r.remove(),this.#I=null,this.#L=null,this.#C=null,this.#Y=[],this.#H=[],this.#P=Z,this.#b=Z,this.#B=Z,this.#R=Z,this.#O=Z,this.#E=Z,this.#N=Z,this.#G=null,this.#$=!1,this.#W=[],this.#I=null,this.#F=null,this.#L=null,this.#C=null,u.useNextTick(()=>{this.#D?.(),this.#D=Z,this.#K.forEach(o=>{o?.destroy?.(),o=null}),this.#K=[]})}},3))}onResize(t){this.#$&&be[this.#f](this.#h)?t&&this.refresh():!this.#$&&be[this.#f](this.#h)?this.#ye():this.#$&&!be[this.#f](this.#h)&&this.#he({destroyAll:!1})}destroy(){this.#he({destroyAll:!0})}};var Ks=new Map,Qa=e=>{let t=u.checkType(Element,e);return t||console.warn(`slide utils ${e} is not a valid Dom element`),t},$I=e=>{let t=new $r({ease:"easeOutQuad",data:{val:0}});return{tween:t,unsubscribe:t.subscribe(({val:r})=>{e.style.height=`${r}px`})}},Dr={subscribe:n=>{if(!Qa(n))return()=>{};if(Ks.has(n))return console.warn(`slide utils ${n} is alredysubscribed`),()=>{};let i=$I(n);return Ks.set(n,i),()=>{i.unsubscribe();let{tween:a}=i;a.destroy(),Ks.delete(n)}},reset:n=>{Qa(n)&&(n.style.height="0",n.style.overflow="hidden")},up:async n=>{if(!Qa(n))return new Promise(c=>c(!0));let s=Ks.get(n);if(!s)return console.warn("slide element not exist in slide store"),new Promise(c=>c(!0));let{tween:i}=s,a=ne(n);await i.goFromTo({val:a},{val:0},{duration:500})},down:async n=>{if(!Qa(n))return new Promise(l=>l(!0));let s=Ks.get(n);if(!s)return console.warn("slide element not exist in slide store"),new Promise(l=>l(!0));let{tween:i}=s,{val:a}=i.get();n.style.height="auto";let c=ne(n);n.style.height=`${a}px`,await i.goTo({val:c},{duration:500}),u.useNextTick(()=>{n.style.height="auto"})}};var Et=class{#n=!0;#t=0;#i=0;#l=0;#d=0;#u=0;#s=30;#c=0;#r=!1;#e=0;#p=0;#a;#h;#f;#o;#g;#m;#x;#_;#y;#v;#T;#k;#S;#w;#A;#R;#O;#E;#N;#P;#b;#D;#B;#I;#F;#L;#C;#Y;#H;#M;#W=!1;#$;#U;#G;#re=0;#K=0;#se;#ee;#Q;constructor(t){this.#a=Z,this.#h=Z,this.#f=Z,this.#o=Z,this.#g=Z,this.#m=Z,this.#x=Z,this.#_=Z,this.#y=Z,this.#v=Z,this.#T=Z,this.#k=Z,this.#S={},this.#w=Z,this.#A=Z,this.#R=Fs(t?.direction,"SmoothScroller"),this.#O=!1,this.#E=Fa(t?.easeType??"","SmoothScroller"),this.#N=Wo(t?.breakpoint,"breakpoint","SmoothScroller"),this.#P=jo(t?.queryType,"queryType","SmoothScroller"),this.#b=u.checkType(String,t?.scroller)?document.querySelector(t.scroller):t.scroller,this.#b||(console.warn("SmoothScroller: scroller node not found"),this.#n=!1),this.#D=t?.screen?u.checkType(String,t.screen)?document.querySelector(t.screen):t.screen:document.documentElement,this.#D||(this.#n=!1,console.warn("SmoothScroller: screen node not found")),this.#B=le(t?.scopedEvent,"SmoothScroller: scopedEvent",!1),this.#I=ur(t?.speed,"SmoothScroller: speed",60),this.#F=le(t?.drag,"SmoothScroller: drag",!1),this.#L=ct(t?.onTick,"SmoothScroller: onTick",Z),this.#C=ct(t?.onUpdate,"SmoothScroller: onUpdate",Z),this.#Y=ct(t?.onSwipe,"SmoothScroller: onSwipe",Z),this.#ee=le(t?.useSwipe,"SmoothScroller: useSwipe",!1),this.#Q=le(t?.revertSwipeDirection,"SmoothScroller: revertSwipeDirection",!1),this.#se=le(t?.useHorizontalScroll,"SmoothScroller: useBothAxis",!1),this.#H=ct(t?.afterRefresh,"SmoothScroller: afterRefresh",Z),this.#M=ct(t?.afterInit,"SmoothScroller: afterInit",Z),this.#$=t?.children||[],this.#$.forEach(r=>{r.setScroller(this.#b),r.setDirection(this.#R),r.setScreen(this.#D),r.setBreakPoint(this.#N),r.setQueryType(this.#P),r.init()}),this.#U=r=>{this.#ie();let{spinY:o}=u.normalizeWheel(r);this.#J({spinY:o})},this.#G=r=>{let{clientX:o,clientY:n}=r.touches?r.touches[0]:r;this.#X({client:{x:o,y:n}})},this.#k=u.useMouseWheel(u.debounce(()=>{this.#oe()},500))}#oe(){this.#b&&this.#b.classList.remove("is-whelling")}#ie(){this.#b&&this.#b.classList.add("is-whelling")}#ue(){return this.#c>0}init(){this.#n&&(this.#E===v.EASE_SPRING?this.#S=new Gt:(this.#S=new Or,this.#S.updateVelocity(.1)),this.#B&&(this.#b.addEventListener("wheel",this.#U,{passive:!0}),this.#b.addEventListener("mousemove",this.#G,{passive:!0}),this.#b.addEventListener("touchmove",this.#G,{passive:!0})),this.#B||(this.#_=u.useMouseWheel(t=>{this.#ce(t),this.#V(t)}),this.#y=u.useMouseMove(t=>this.#te(t)),this.#v=u.useTouchMove(t=>this.#te(t))),this.#a=u.useResize(()=>this.refresh()),this.#h=u.useScrollStart(()=>this.#ge()),this.#f=u.useScrollEnd(()=>this.#ge()),this.#o=u.useTouchStart(t=>this.#j(t)),this.#g=u.useTouchEnd(t=>this.#Z(t)),this.#m=u.useMouseDown(t=>this.#j(t)),this.#x=u.useMouseUp(t=>this.#Z(t)),this.#b.addEventListener("mouseleave",()=>{Yt()}),this.#F&&(this.#T=u.useMouseClick(({target:t,preventDefault:r})=>{this.#me({target:t,preventDefault:r})})),this.#be(),be[this.#P](this.#N)&&(this.#fe(),this.#ge()),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#O||(this.#M?.({shouldScroll:this.#ue()}),this.#$.forEach(t=>{t.refresh()}))})},3))}#ce({pixelX:t}){if(!(!this.#ee||!t||this.#W||this.#Y.length===0)&&Math.abs(t)>40){this.#W=!0;let r=t>0?-1:1,o=this.#Q?r:r*-1;this.#Y({direction:o,move:n=>this.move(n).catch(()=>{})}),setTimeout(()=>{this.#W=!1},500)}}#fe(){if(!this.#b)return;this.#b.style["user-select"]="none",[...this.#b.querySelectorAll("a, button")].forEach(r=>{r.setAttribute("draggable","false"),r.style["user-select"]="none"})}#pe(){if(!this.#b)return;this.#b.style["user-select"]="",[...this.#b.querySelectorAll("a, button")].forEach(r=>{r.removeAttribute("draggable"),r.style["user-select"]=""})}#be(){this.#S&&(this.#S.setData({val:0}),this.#w=this.#S.subscribe(({val:t})=>{this.#b.style.transform=this.#R==v.DIRECTION_VERTICAL?`translate3d(0px, 0px, 0px) translateY(${-Math.trunc(t)}px)`:`translate3d(0px, 0px, 0px) translateX(${-Math.trunc(t)}px)`,this.#$.forEach(r=>{r.triggerScrollStart()}),u.useNextTick(()=>{this.#L({value:-t,percent:this.#i,parentIsMoving:!0}),this.#$.forEach(r=>{r.move({value:-t,parentIsMoving:!0})})})}),this.#A=this.#S.onComplete(({val:t})=>{this.#b.style.transform=this.#R==v.DIRECTION_VERTICAL?`translateY(${-Math.trunc(t)}px)`:`translateX(${-Math.trunc(t)}px)`,u.useNextTick(()=>{this.#L({value:-t,percent:this.#i,parentIsMoving:!1}),this.#$.forEach(r=>{r.triggerScrollEnd(),r.move({value:-t,parentIsMoving:!1})})})}))}#ge(){this.#D&&(this.#l=this.#D===document.documentElement?window.innerWidth:Ve(this.#D),this.#d=this.#D===document.documentElement?window.innerHeight:ne(this.#D),this.#c=this.#R===v.DIRECTION_VERTICAL?this.#b.offsetHeight-this.#d:this.#b.offsetWidth-this.#l,this.#ne())}#X({client:t}){!this.#r||!this.#F||(this.#e=this.#p,this.#p=this.#z({x:t?.x??0,y:t?.y??0}),this.#t+=Math.round(this.#e-this.#p),this.#ne())}#q(){return this.#R===v.DIRECTION_HORIZONTAL?this.#l/1920:this.#d/1080}#J({spinY:t=0}){if(!be[this.#P](this.#N))return;this.#r=!1;let r=this.#q(),o=ot(t,-1,1);this.#t+=o*this.#I*r,this.#ne()}#j({target:t,client:r}){be[this.#P](this.#N)&&(t===this.#b||ps(this.#b,t))&&(this.#u=this.#t,this.#r=!0,this.#e=this.#z({x:r?.x??0,y:r?.y??0}),this.#p=this.#z({x:r?.x??0,y:r?.y??0}))}#Z(){this.#r=!1}#te({target:t,client:r,preventDefault:o}){if((t===this.#b||ps(this.#b,t))&&this.#r&&this.#F){o(),this.#e=this.#p,this.#p=this.#z({x:r?.x??0,y:r?.y??0});let n=Math.round(this.#e-this.#p);this.#t+=n,this.#ne()}}#V({target:t,spinY:r=0,spinX:o=0,preventDefault:n}){if(be[this.#P](this.#N)&&(this.#ie(),t===this.#b||ps(this.#b,t))){this.#r=!1,n?.(),dr();let s=Math.abs(this.#re-o),i=Math.abs(this.#K-r),a=this.#se&&!this.#ee&&s>i?o:r;if(Math.abs(a)===0)return;let c=this.#q();this.#t+=ot(a,-1,1)*this.#I*ot(c,1,10),this.#ne(),this.#K=r,this.#re=o}}move(t){return be[this.#P](this.#N)?(this.#i=t,this.#t=this.#i*this.#c/100,this.#S.goTo({val:this.#t})):new Promise(r=>r())}set(t){be[this.#P](this.#N)&&(this.#i=t,this.#t=this.#i*this.#c/100,this.#S.set({val:this.#t}))}#ne(){let t=this.#t*100/this.#c;this.#i=ot(t,0,100),this.#t=ot(this.#t,0,this.#c),this.#S.goTo({val:this.#t}).catch(()=>{}),this.#C?.({value:-this.#t,percent:this.#i,parentIsMoving:!0})}#me({target:t,preventDefault:r}){be[this.#P](this.#N)&&(t===this.#b||ps(this.#b,t))&&Math.abs(this.#t-this.#u)>this.#s&&r()}#z({x:t,y:r}){return!t||!r?0:this.#R===v.DIRECTION_VERTICAL?r:t}refresh(){if(!be[this.#P](this.#N)){this.#pe(),this.#S?.stop?.(),u.useFrame(()=>{u.useNextTick(()=>{this.#b.style.transform=""})});return}this.#ge(),this.#fe(),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#H?.({shouldScroll:this.#ue()}),this.#$.forEach(t=>{t.refresh()})})},2)}destroy(){this.#O=!0,this.#pe(),this.#a(),this.#h(),this.#f(),this.#o(),this.#g(),this.#m(),this.#x(),this.#_(),this.#y(),this.#v(),this.#T(),this.#w(),this.#A(),this.#k(),this.#S?.destroy(),this.#S=null,this.#$.forEach(t=>{t?.destroy?.()}),this.#$=[],this.#L=Z,this.#C=Z,this.#H=Z,this.#M=Z,this.#B&&(this.#b?.removeEventListener("wheel",this.#U),this.#b?.removeEventListener("mousemove",this.#G),this.#b?.removeEventListener("touchmove",this.#G)),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#b=null,this.#D=null})},3)}};var Ey=!1,LI=new Set(["scrollerN0","scrollerN1"]),wy=()=>{let e=document.querySelector("#root");e&&(Xa({rootElement:e}),m.mainStore.watch("beforeRouteChange",()=>{dr(),Sy()}),m.mainStore.watch("afterRouteChange",()=>{let t=m.getActiveRoute()?.route;Ey=LI.has(t),u.useFrameIndex(()=>{if(Ey){ju();return}!_y()&&Xa({rootElement:e}),qs()},30)}))};function ht(){let e=navigator.userAgent,t=e.includes("Safari");return e.includes("Chrome")&&t&&(t=!1),t}function ft(){let e=navigator.userAgent,t=e.includes("Firefox");return e.includes("Chrome")&&t&&(t=!1),t}function Iy(){let e=navigator.userAgent,t=document.body;if(/chrome|chromium|crios/i.test(e)){t.classList.add("is-chrome");return}if(/firefox|fxios/i.test(e)){t.classList.add("is-firefox");return}if(/safari/i.test(e)){t.classList.add("is-safari");return}if(/edg/i.test(e)){t.classList.add("is-edge");return}}var te=async({source:e})=>{let t=await fetch(e);if(!t.ok)return console.warn(`${e} not found`),{success:!1,data:""};let r={};try{r=await t.text()}catch(o){return console.warn(o),{success:!1,data:r}}return{success:!0,data:r}},Dt=async({source:e})=>{let t=await fetch(e);if(!t.ok)return console.warn(`${e} not found`),{success:!1,data:""};let r={};try{r=await t.json()}catch(o){return console.warn(o),{success:!1,data:r}}return{success:!0,data:r}};function Xt(e,t){return Math.floor(Math.random()*(t-e+1)+e)}var My=e=>new XMLSerializer().serializeToString(e).replaceAll(' xmlns="http://www.w3.org/1999/xhtml"',"");var ky,Ry={},DI="./asset/svg/icons/",FI=[{name:"gitHubIcon",source:"icon-github.svg"},{name:"searchIcons",source:"search.svg"},{name:"historyIcons",source:"history.svg"},{name:"starOutline",source:"star-outline.svg"},{name:"previous",source:"previous.svg"},{name:"close",source:"close.svg"},{name:"up",source:"up.svg"},{name:"swap",source:"swap.svg"},{name:"selectAll",source:"select-all.svg"}],hr=()=>ky,gt=()=>Ry,Ny=async()=>{let{success:e,data:t}=await Dt({source:"./data/common.json"});e||console.warn("data fail to load"),ky=t},Py=async()=>{let e=FI.map(({name:r,source:o})=>te({source:`${DI}${o}`}).then(n=>({name:r,result:n})));Ry=(await Promise.all(e)).map(({name:r,result:o})=>o.success?{name:r,data:o.data}:{name:r,data:"icon load error"}).reduce((r,{name:o,data:n})=>({...r,[o]:n}),{})};var Ay=()=>g`
        <div class="error-page">
            <div class="error-page__content">
                <h1 class="error-page__title title-big">Page not found</h1>
                <a class="error-page__link" href="./#home">back to home</a>
            </div>
        </div>
    `;var Oy=({screenElement:e,scrollerElement:t,hideControls:r})=>{let o=new Et({screen:e,scroller:t,direction:"horizontal",drag:!0,useHorizontalScroll:!0,easeType:"lerp",breakpoint:"small",afterInit:({shouldScroll:n})=>{r(n)},afterRefresh:({shouldScroll:n})=>{r(n)}});return o.init(),{destroy:()=>{o.destroy()},refresh:()=>{o.refresh()}}};var BI=e=>e<10?`0${e}`:`${e}`,$y=({setRef:e,getRef:t,onMount:r,bindEffect:o,getProxi:n})=>{let s=n(),i=()=>{},a=()=>{};return r(()=>{let{screenElement:c,scrollerElement:l}=t();return{destroy:i,refresh:a}=Oy({screenElement:c,scrollerElement:l,hideControls:p=>{s.showControls=p}}),u.useNextLoop(()=>{a()}),setTimeout(()=>{s.isMounted=!0},500),()=>{i(),i=()=>{},a=()=>{}}}),g`<div class="l-links">
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
                                                >${BI(l)}</span
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
    </div>`};var Ly=m.createComponent({tag:"layout-links",component:$y,props:{title:()=>({value:"",type:String}),items:()=>({value:[],type:Array})},state:{isMounted:()=>({value:!1,type:Boolean}),showControls:()=>({value:!1,type:Boolean})}});m.useComponent([Ly]);var Za=async({props:e})=>{let{source:t}=e,{data:r}=await Dt({source:t});return g` <div class="l-links">
        <layout-links
            ${m.staticProps({title:r.title,items:r.items})}
        ></layout-links>
    </div>`};var Dy=()=>g`
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
    `;var ec=m.createComponent({tag:"doc-container",component:Dy});var Fy=()=>g`
        <div class="c-doc-title">
            <h2><mobjs-slot></mobjs-slot></h2>
        </div>
    `;var tc=m.createComponent({tag:"doc-title",component:Fy,state:{}});var By=()=>g`
        <div class="c-doc-title-small">
            <mobjs-slot></mobjs-slot>
        </div>
    `;var rc=m.createComponent({tag:"doc-title-small",component:By,state:{}});var iT=OC(sT(),1);var ep=iT.default;var aT="[A-Za-z$_][0-9A-Za-z$_]*",kM=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],RM=["true","false","null","undefined","NaN","Infinity"],cT=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],lT=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],uT=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],NM=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],PM=[].concat(uT,cT,lT);function pT(e){let t=e.regex,r=($,{after:B})=>{let V="</"+$[0].slice(1);return $.input.indexOf(V,B)!==-1},o=aT,n={begin:"<>",end:"</>"},s=/<[A-Za-z0-9\\._:-]+\s*\/>/,i={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:($,B)=>{let V=$[0].length+$.index,K=$.input[V];if(K==="<"||K===","){B.ignoreMatch();return}K===">"&&(r($,{after:V})||B.ignoreMatch());let ue,ge=$.input.substring(V);if(ue=ge.match(/^\s*=/)){B.ignoreMatch();return}if((ue=ge.match(/^\s+extends\s+/))&&ue.index===0){B.ignoreMatch();return}}},a={$pattern:aT,keyword:kM,literal:RM,built_in:PM,"variable.language":NM},c="[0-9](_?[0-9])*",l=`\\.(${c})`,p="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${p})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${p})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},f={className:"subst",begin:"\\$\\{",end:"\\}",keywords:a,contains:[]},h={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"xml"}},y={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"css"}},b={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"graphql"}},T={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,f]},S={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},E=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,h,y,b,T,{match:/\$\d+/},d];f.contains=E.concat({begin:/\{/,end:/\}/,keywords:a,contains:["self"].concat(E)});let C=[].concat(S,f.contains),M=C.concat([{begin:/(\s*)\(/,end:/\)/,keywords:a,contains:["self"].concat(C)}]),I={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:M},P={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},k={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...cT,...lT]}},O={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},L={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[I],illegal:/%/},D={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function F($){return t.concat("(?!",$.join("|"),")")}let w={match:t.concat(/\b/,F([...uT,"super","import"].map($=>`${$}\\s*\\(`)),o,t.lookahead(/\s*\(/)),className:"title.function",relevance:0},R={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},A={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},I]},x="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",N={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(x)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[I]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:a,exports:{PARAMS_CONTAINS:M,CLASS_REFERENCE:k},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),O,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,h,y,b,T,S,{match:/\$\d+/},d,k,{scope:"attr",match:o+t.lookahead(":"),relevance:0},N,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[S,e.REGEXP_MODE,{className:"function",begin:x,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:M}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:n.begin,end:n.end},{match:s},{begin:i.begin,"on:begin":i.isTrulyOpeningTag,end:i.end}],subLanguage:"xml",contains:[{begin:i.begin,end:i.end,skip:!0,contains:["self"]}]}]},L,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[I,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},R,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[I]},w,D,P,A,{match:/\$[(.]/}]}}ep.registerLanguage("javascript",pT);var mT=async({ref:e,source:t})=>{if(!e)return;let{success:r,data:o}=await te({source:t});if(!r){e.textContent="something went wrong";return}e.textContent=o,ep.highlightElement(e),e.style.height=""},AM=()=>getComputedStyle(document.documentElement).getPropertyValue("--snippet-line-height-value"),dT=({onMount:e,setRef:t,getRef:r,delegateEvents:o,bindEffect:n,getProxi:s,bindObject:i})=>{let a=s(),c=AM(),l="20rem",p=Number(a.numLines)>15,d=p?"use-expand":"",f=`${a.numLines*Number(c)}rem`;return e(async()=>{let{codeEl:h}=r();return a.awaitLoad?await mT({ref:h,source:a.source}):mT({ref:h,source:a.source}),()=>{}}),g`<div
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
    </div>`};var hT=m.createComponent({tag:"mob-snippet",component:dT,props:{source:()=>({value:"",type:String}),numLines:()=>({value:1,type:Number}),awaitLoad:()=>({value:!1,type:Boolean})},state:{contentIsLoaded:()=>({value:!1,type:Boolean}),isExpanded:()=>({value:!1,type:Boolean})}});var ei="debug_component",ac="debug_filter_list",cc="debug_overlay",lc="debug_tree",ti="quick_nav",ri="scroll_down_label",oi="scroll_to",fT="header",uc="mob_navigation",ni="mob_navigation_container",pc="search_overlay",si="search_overlay_list",Uo="search_overlay_header",mc="right-sidebar",dc="animation-description",hc="route-loader",Xn="custom-history";var gT=({id:e,label:t,element:r,isSection:o,isNote:n})=>{m.useMethodByName(oi)?.addItem?.({id:e,label:t,element:r,isSection:o,isNote:n})},bT=e=>{m.useMethodByName(oi)?.setActiveLabel?.(e)};function OM({label:e}){return e?.length>0}var $M=async({id:e,label:t,element:r,isSection:o,isNote:n})=>{await m.tick(),gT({id:e,label:t,element:r,isSection:o,isNote:n}),Ep(r)&&!o&&bT(t)},vT=({getState:e,onMount:t})=>{let{style:r,line:o,id:n,label:s,isSection:i,isNote:a}=e(),c=o?"spacer--line":"";return t(({element:l})=>{OM({label:s})&&$M({id:n,label:s,element:l,isSection:i,isNote:a})}),g`<div id="${n}" class="spacer spacer--${r} ${c}">
        <span></span>
    </div>`};var yT=m.createComponent({tag:"mob-spacer",component:vT,props:{style:()=>({value:"x-small",type:String,validate:e=>["x-small","small","medium","big"].includes(e),strict:!0}),line:()=>({value:!1,type:Boolean}),id:()=>({value:"",type:String}),label:()=>({value:"",type:String}),isSection:()=>({value:!1,type:Boolean}),isNote:()=>({value:!1,type:Boolean})}});var TT=({getState:e,delegateEvents:t})=>{let{content:r,anchor:o}=e();return g`<div>
        <button
            type="button"
            class="anchor-button"
            ${t({click:()=>{let n=document.querySelector(o);if(!n)return;let s=de(n).top-50;Lr.to(s)}})}
        >
            ${r}
            <span class="anchor-button__arrow">
                <span class="anchor-button__arrow__start"></span>
                <span class="anchor-button__arrow__end"></span>
            </span>
        </button>
    </div>`};var ST=m.createComponent({tag:"anchor-button",component:TT,props:{anchor:()=>({value:"",type:String}),content:()=>({value:"",type:String})}});var LM=({items:e,links:t})=>t?e.map(({label:r,url:o})=>g`<li>
                          <a href="${o}" class="list-links">
                              ${r}
                              <span class="list-links__arrow">
                                  <span class="list-links__arrow__start"></span>
                                  <span class="list-links__arrow__end"></span>
                              </span>
                          </a>
                      </li>`).join(""):e.map(r=>g` <li>${r}</li> `).join(""),_T=({getState:e})=>{let{style:t,color:r,items:o,links:n}=e(),s=`is-${r}`;return g`<ul class="ul ul--${t} ${s} ${n?"use-links":"use-default"}">
        ${LM({items:o,links:n})}
    </ul>`};var xT=m.createComponent({tag:"mob-list",component:_T,props:{style:()=>({value:"medium",type:String,validate:e=>["small","medium","big"].includes(e),strict:!0}),dots:()=>({value:!0,type:Boolean}),links:()=>({value:!1,type:Boolean}),color:()=>({value:"black",type:String,validate:e=>["white","black","grey","hightlight"].includes(e)}),items:()=>({value:[],type:Array})}});var CT=({getState:e})=>{let{style:t,color:r,boxed:o,note:n}=e(),s=r==="inherit"?"":`is-${r}`;return g`<p
        class="p p--${t} ${o?"p--boxed":""} ${n?"p--note":""} ${s}"
    >
        <mobjs-slot></mobjs-slot>
    </p>`};var ET=m.createComponent({tag:"mob-paragraph",component:CT,props:{style:()=>({value:"medium",type:String,validate:e=>["small","medium","big"].includes(e),strict:!0}),color:()=>({value:"inherit",type:String,validate:e=>["inherit","white","hightlight","black"].includes(e)}),boxed:()=>({value:!1,type:Boolean}),note:()=>({value:!1,type:Boolean})}});var DM=e=>e.length>0?g`<span class="title-index">${e}</span>`:"",wT=({getProxi:e})=>{let t=e(),r=t.color==="inherit"?"":`is-${t.color}`,o=t.isBold?"is-bold":"",n=t.isSection?"is-section":"";return g`<${t.tag} class="${r} ${o} ${n}">
            ${DM(t.index)}
            <span class="title-content">
                <mobjs-slot></mobjs-slot>
            </span>
        </${t.tag}>`};var IT=m.createComponent({tag:"mob-title",component:wT,props:{tag:()=>({value:"h1",type:String}),color:()=>({value:"inherit",type:String,validate:e=>["inherit","white","black"].includes(e)}),isSection:()=>({value:!1,type:Boolean}),isBold:()=>({value:!1,type:Boolean}),index:()=>({value:"",type:String})}});var FM=({data:e,staticProps:t,awaitLoadSnippet:r})=>e.map(o=>{let{component:n,props:s,content:i}=o;return g`
                <${n} ${t({...s,awaitLoad:r})}>
                    ${i??""}
                </${n}>
            `}).join(""),BM=async({source:e,data:t})=>{if(t&&t.length>0)return t;let{success:r,data:o}=await Dt({source:e});return r?o.data:[]},MT=async({getState:e,staticProps:t})=>{let{source:r,data:o}=e(),n=await BM({source:r,data:o}),{awaitLoadSnippet:s,usePadding:i}=e();return g`
        <section class="html-content ${i?"use-padding":""}">
            ${FM({data:n,staticProps:t,awaitLoadSnippet:s})}
        </section>
    `};var VM=async({proxi:e})=>{let{success:t,data:r}=await te({source:e.url});t&&(e.source=r)},kT=({getProxi:e,invalidate:t,onMount:r})=>{let o=e();return r(()=>{VM({proxi:o})}),g`
        <div class="c-doc-svg ${o.className}">
            ${t({observe:()=>o.source,render:()=>o.source})}
        </div>
    `};var RT=m.createComponent({tag:"doc-svg",component:kT,props:{className:()=>({value:"",type:String}),url:()=>({value:"",type:String})},state:{source:()=>({value:g`<span class="c-doc-svg__loading">
                    loading image ...
                </span>`,type:String})}});var fc=m.createComponent({tag:"html-content",component:MT,props:{source:()=>({value:"",type:String}),data:()=>({value:[],type:Array}),awaitLoadSnippet:()=>({value:!1,type:Boolean}),useTriangle:()=>({value:!0,type:Boolean}),usePadding:()=>({value:!0,type:Boolean})},child:[xT,ET,IT,hT,yT,ST,RT]});var NT=({bindEffect:e,getProxi:t})=>{let r=t(),o=r.isSection?"is-section":"",n=r.isNote?"is-note":"";return g`
        <button
            type="button"
            class="${o} ${n}"
            ${e({toggleClass:{active:()=>r.active}})}
        >
            <span>${r.label}</span>
        </button>
    `};var PT=m.createComponent({tag:"scroll-to-button",component:NT,props:{label:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean}),isSection:()=>({value:!1,type:Boolean}),isNote:()=>({value:!1,type:Boolean})}});var ii=!1;function WM({delegateEvents:e,bindProps:t,proxi:r}){return r.anchorItems.map(o=>{let n=o.isSection||o.isNote?"":e({click:async()=>{let{id:s,label:i,element:a}=o,c=s==="start"?0:de(a).top-50;ii=!0,r.activeLabel=i,await Lr.to(c),setTimeout(()=>{ii=!1},1e3)}});return g`
                <li>
                    <scroll-to-button
                        ${n}
                        ${t(()=>({active:r.activeLabel===o.label,label:o.label,isSection:o.isSection??!1,isNote:o.isNote??!1}))}
                    >
                    </scroll-to-button>
                </li>
            `}).join("")}var AT=({proxi:e,direction:t,winHeight:r})=>{u.useFrame(()=>{u.useNextTick(()=>{if(t==="DOWN"){let o=e.anchorItems.findLast(({top:n,isNote:s})=>!s&&n<window.scrollY+r-200);e.activeLabel=o?o.label:""}if(t==="UP"){let o=e.anchorItems.findLast(({top:n,isNote:s})=>!s&&n<window.scrollY+200);e.activeLabel=o?o.label:""}})})},OT=({onMount:e,delegateEvents:t,bindProps:r,invalidate:o,computed:n,addMethod:s,updateState:i,getProxi:a})=>{let c=a(),l="DOWN",p=window.innerHeight;return s("addItem",({id:d,label:f,element:h,isSection:y,isNote:b})=>{i("anchorItemsToBeComputed",T=>[...T,{id:d,label:f,element:h,isSection:y,isNote:b}])}),s("setActiveLabel",d=>{ii||(c.activeLabel=d)}),e(()=>{if(ce.mq("max","desktop"))return;n(()=>c.anchorItems,()=>c.anchorItemsToBeComputed.map(b=>({...b,top:de(b.element).top})));let d=u.useScrollThrottle(({direction:b})=>l=b),f=new ResizeObserver(u.debounce(()=>{u.useFrame(()=>{u.useNextTick(()=>{p=window.innerHeight})}),c.anchorItems.forEach(b=>{b.top=de(b.element).top})},200));f.observe(m.getRoot());let h=c.updateAnchorOnWheel?u.useMouseWheel(u.debounce(()=>{ii||AT({proxi:c,direction:l,winHeight:p})},600)):()=>{},y=u.useScrollEnd(()=>{ii||AT({proxi:c,direction:l,winHeight:p})});return()=>{h(),d(),y(),f.unobserve(m.getRoot()),f.disconnect(),f=null}}),g`
        <div class="c-scroll-to">
            <ul>
                ${o({observe:()=>c.anchorItems,render:()=>WM({delegateEvents:t,bindProps:r,proxi:c})})}
            </ul>
        </div>
    `};var $T=m.createComponent({tag:"scroll-to",component:OT,state:{activeLabel:()=>({value:"",type:String}),updateAnchorOnWheel:()=>({value:!1,type:Boolean}),anchorItemsToBeComputed:()=>({value:[],type:Array}),anchorItems:()=>({value:[],type:Array,transform:e=>e.toSorted(function(t,r){let{element:o}=t,{element:n}=r;return o===n||!o||!n?0:o.compareDocumentPosition(n)&2?1:-1})})},child:[PT]});var gc=({breadCrumbs:e})=>e.map((t,r)=>r===e.length-1?g`<a href="${t.url}" class="breadcrumbs__arrow">
                          <div class="breadcrumbs__arrow__start"></div>
                          <div class="breadcrumbs__arrow__end"></div>
                      </a>
                      <a class="breadcrumbs__link" href="${t.url}"
                          >${t.title}</a
                      >`:g`<a class="breadcrumbs__link" href="${t.url}"
                      >${t.title}</a
                  >`).join("");var bc=e=>{m.useMethodByName(mc)?.updateList(e??[])};m.useComponent([ec,rc,$T,tc,fc]);var Le=async({props:e})=>{let{source:t,title:r,breadCrumbs:o,rightSidebar:n}=e,{data:s}=await Dt({source:t});return bc(n??[]),g` <doc-container>
        <div>
            <html-content
                slot="docs"
                ${m.staticProps({data:s.data,useMaxWidth:!0})}
            ></html-content>
            <doc-title-small slot="section-title-small"
                ><div>
                    ${gc({breadCrumbs:o})}<span>${r}</span>
                </div></doc-title-small
            >
            <scroll-to name="${oi}" slot="section-links"></scroll-to>
            <doc-title slot="section-title">${r}</doc-title>
        </div>
    </doc-container>`};m.useComponent([ec,rc,tc,fc]);var oe=async({props:e})=>{let{source:t,title:r,breadCrumbs:o,rightSidebar:n}=e,{data:s}=await Dt({source:t});return bc(n??[]),g`<doc-container>
        <div>
            <html-content
                slot="docs"
                ${m.staticProps({data:s.data,useMaxWidth:!0})}
            ></html-content>
            <doc-title-small slot="section-title-small"
                ><div>
                    ${gc({breadCrumbs:o})}<span>${r}</span>
                </div></doc-title-small
            >
            <doc-title slot="section-title">${r}</doc-title>
        </div>
    </doc-container>`};var LT=({weakPathElement:e,weakScrollerElement:t,wrapElement:r,setActiveItem:o,weakScreenElement:n})=>{let s={ax:53,ay:70,bx:64,by:80,cx:89,cy:87,dx:100,dy:100,ex:0,ey:100,fx:10,fy:77,gx:17,gy:84},i={ax:-1,ay:-1,bx:1,by:1,cx:-1,cy:-1,dx:1,dy:1,ex:1,ey:1,fx:-1,fy:-1,gx:1,gy:1},a=H.createSequencer({data:{...s}});a.goTo({fy:90,ay:90,cy:70},{start:0,end:3.5}).goTo({gy:70,by:80},{start:2,end:5}).goTo({fy:90,ay:100,cy:90},{start:4,end:7.5}).goTo({ay:120,fy:80,cy:80},{start:7.5,end:10}).goTo({gy:100,by:100},{start:6,end:10}).add(()=>{o(1)},0).add(({direction:h,isForced:y})=>{y||h==="backward"||o(2)},1.5).add(({direction:h,isForced:y})=>{y||h==="backward"||o(3)},5.5).add(({direction:h,isForced:y})=>{y||h==="backward"||o(4)},9.5).add(({direction:h,isForced:y})=>{y||h==="forward"||o(1)},1.5).add(({direction:h,isForced:y})=>{y||h==="forward"||o(2)},5).add(({direction:h,isForced:y})=>{y||h==="forward"||o(3)},9),a.subscribe(({ax:h,ay:y,bx:b,by:T,cx:_,cy:S,dx:E,dy:C,ex:M,ey:I,fx:P,fy:k,gx:O,gy:L})=>{s.ax=h,s.ay=y,s.bx=b,s.by=T,s.cx=_,s.cy=S,s.dx=E,s.dy=C,s.ex=M,s.ey=I,s.fx=P,s.fy=k,s.gx=O,s.gy=L});let c=H.createTimeTween({data:{...i}});c.subscribe(({ax:h,ay:y,bx:b,by:T,cx:_,cy:S,dx:E,dy:C,ex:M,ey:I,fx:P,fy:k,gx:O,gy:L})=>{i.ax=h,i.ay=y,i.bx=b,i.by=T,i.cx=_,i.cy=S,i.dx=E,i.dy=C,i.ex=M,i.ey=I,i.fx=P,i.fy=k,i.gx=O,i.gy=L});let l=Ie.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(c,{ax:()=>Xt(-3,3),ay:()=>Xt(-3,3),bx:()=>Xt(-3,3),by:()=>Xt(-3,3),cx:()=>Xt(-3,3),cy:()=>Xt(-3,3),dx:()=>0,dy:()=>0,ex:()=>0,ey:()=>0,fx:()=>Xt(-3,3),fy:()=>Xt(-3,3),gx:()=>Xt(-3,3),gy:()=>Xt(-3,3)},{duration:3e3});l.play();let p=!0,d=()=>{if(!p)return;let h={x:s.ax+i.ax,y:s.ay+i.ay},y={x:s.bx+i.bx,y:s.by+i.by},b={x:s.cx+i.cx,y:s.cy+i.cy},T={x:s.dx+i.dx,y:s.dy+i.dy},_={x:s.ex+i.ex,y:s.ey+i.ey},S={x:s.fx+i.fx,y:s.fy+i.fy},E={x:s.gx+i.gx,y:s.gy+i.gy};e.deref()&&(e.deref().style.clipPath=`polygon(${h.x}% ${h.y}%, ${y.x}% ${y.y}%, ${b.x}% ${b.y}%, ${T.x}% ${T.y}%,${_.x}% ${_.y}%,${S.x}% ${S.y}%,${E.x}% ${E.y}%)`,u.useNextFrame(()=>d()))};u.useFrame(()=>d());let f=Ye.createScrollTrigger({item:r,dynamicStart:{position:"right",value:()=>Ve(n?.deref()??document.createElement("div"))},dynamicEnd:{position:"right",value:()=>Ve(t?.deref()??document.createElement("div"))??0},reverse:!1,propierties:"tween",ease:!1,tween:a});return{pathScroller:f,pathSequencer:a,pathTween:c,pathTimeline:l,stopLoop:()=>{p=!1},destroy:()=>{f.destroy(),f=null,a.destroy(),a=null,c.destroy(),c=null,l.destroy(),l=null}}};var DT=({title_1:e,title_2:t})=>{let r=H.createScrollerTween({from:{x:0},to:{x:30}});r.subscribe(({x:i})=>{e.style.transform=`translate3d(0,0,0) translate(${i}px, 0px)`}),r.onStop(({x:i})=>{e.style.transform=`translate(${i}px, 0px)`});let o=Ye.createParallax({item:e,propierties:"tween",tween:r,ease:!1,align:"start"}),n=H.createScrollerTween({from:{x:0},to:{x:-30}});n.subscribe(({x:i})=>{t.style.transform=`translate3d(0,0,0) translateX(${i}px)`}),n.onStop(({x:i})=>{t.style.transform=`translateX(${i}px)`});let s=Ye.createParallax({item:t,propierties:"tween",tween:n,ease:!1,align:"start"});return{title1parallax:o,title2parallax:s,title1tween:r,title2tween:n}};var vc=({title:e})=>{let t=H.createScrollerTween({from:{x:0},to:{x:-60}});t.subscribe(({x:o})=>{e.deref()&&(e.deref().style.transform=`translate3d(0,0,0) translateX(${o}px)`)}),t.onStop(({x:o})=>{e.deref()&&(e.deref().style.transform=`translateX(${o}px)`)});let r=Ye.createParallax({item:e.deref(),propierties:"tween",tween:t,ease:!1,align:"center"});return{sectionContentScroller:r,destroy:()=>{r.destroy(),r=null}}};var FT=({screenElement:e,scrollerElement:t,pathElement:r,wrapElement:o,title_1:n,title_2:s,section2_title:i,section3_title:a,section4_title:c,setActiveItem:l,onMove:p,onScrollEnd:d})=>{let f=new WeakRef(t),h=new WeakRef(i),y=new WeakRef(a),b=new WeakRef(c),T=new WeakRef(r),_=new WeakRef(e),{pathScroller:S,pathSequencer:E,pathTimeline:C,pathTween:M,stopLoop:I,destroy:P}=LT({weakPathElement:T,weakScrollerElement:f,wrapElement:o,setActiveItem:l,weakScreenElement:_}),{title1parallax:k,title2parallax:O,title1tween:L,title2tween:D}=DT({title_1:n,title_2:s}),{sectionContentScroller:F,destroy:w}=vc({title:h}),{sectionContentScroller:R,destroy:A}=vc({title:y}),{sectionContentScroller:x,destroy:N}=vc({title:b}),$=new Et({screen:e,scroller:t,direction:"horizontal",drag:!0,easeType:"lerp",breakpoint:"small",useHorizontalScroll:!0,useSwipe:!1,revertSwipeDirection:!1,children:[S,k,O,F,R,x],onUpdate:({value:B})=>{p(B),d()}});return $.init(),setTimeout(()=>{$?.refresh?.()},500),{goTo:B=>{!B&&B!==0||$?.move?.(B).catch(()=>{})},destroy:()=>{$.destroy(),$=null,E.destroy(),S.destroy(),C.destroy(),M.destroy(),k.destroy(),O.destroy(),L.destroy(),D.destroy(),F.destroy(),R.destroy(),I(),P(),w(),A(),N()}}};var BT=({elements:e})=>{let t=H.createSpring({data:{x:0},stagger:{each:5}});return e.map(o=>o.querySelector("svg")).forEach(o=>{o&&(t.subscribe(({x:n})=>{o.style.transform=`translate3D(0,0,0) translateY(${-n}px)`}),t.onComplete(({x:n})=>{o.style.transform=`translateY(${-n}px)`}))}),{svgSpring:t,destroySvgSpring:()=>{t.destroy(),t=null}}};var ci=()=>{},ai=e=>Promise.resolve(e),yc=()=>{},tp={1:0,2:100/3,3:100/3*2,4:100},jM=({setRef:e,getState:t})=>{let{titleTop:r,titleBottom:o}=t().block_1;return g`
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
    `},zM=({setRef:e,getState:t})=>{let{title:r,copy:o}=t().block_2;return g`
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
    `},HM=({setRef:e,getState:t})=>{let{title:r,copy:o}=t().block_3;return g`
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
    `},UM=({setRef:e,getState:t})=>{let{title:r,items:o}=t().block_4;return g`
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
    `},GM=({proxi:e,delegateEvents:t,bindEffect:r})=>g`
        <ul class="l-about__nav">
            ${e.navItem.map(({index:o,label:n})=>g`
                        <li class="l-about__nav__item">
                            <button
                                class="l-about__nav__button"
                                ${t({click:()=>{ci(tp[o]),yc()}})}
                                ${r({toggleClass:{active:()=>e.activenavItem===o}})}
                            >
                                ${n}
                            </button>
                        </li>
                    `).join("")}
        </ul>
    `,qM=()=>g`
        <div class="l-about__square">
            <div class="l-about__square__legend"><h4>Scroll or Drag</h4></div>
            <span class="l-about__square__angle top-left"></span>
            <span class="l-about__square__angle top-right"></span>
            <span class="l-about__square__angle bottom-left"></span>
            <span class="l-about__square__angle bottom-right"></span>
        </div>
    `,VT=({onMount:e,setRef:t,getRef:r,getRefs:o,getState:n,bindEffect:s,delegateEvents:i,getProxi:a})=>{let c=a(),l=4,p=!1;return e(()=>{let{screenElement:d,scrollerElement:f,wrapElement:h,title_1:y,title_2:b,section2_title:T,section3_title:_,section4_title:S,pathElement:E}=r(),{svg:C}=o(),M=0,I=!1,P=0,{svgSpring:k,destroySvgSpring:O}=BT({elements:C});ai=async F=>{if(u.shouldMakeSomething()||p){k.stop(),p=!0,setTimeout(()=>{p=!1},2e3);return}let R=-Math.abs(F/30);Number.isNaN(R)||await k.goTo({x:R}).catch(()=>{})},yc=()=>{ai(3e3),setTimeout(()=>{ai(0)},500)};let{destroy:L,goTo:D}=FT({screenElement:d,scrollerElement:f,pathElement:E,wrapElement:h,title_1:y,title_2:b,section2_title:T,section3_title:_,section4_title:S,setActiveItem:F=>{c.activenavItem=F},onMove:F=>{I||(M=F),I=!0,P=M-F,ai(P)},onScrollEnd:u.useDebounce(()=>{I=!1,P=0,ai(P)},500)});return ci=D,c.isMounted=!0,()=>{ci=()=>{},L(),O()}}),g`<div
        class="l-about"
        style="--number-of-section:${l}"
        ${s({toggleClass:{active:()=>c.isMounted}})}
    >
        <div class="l-about__sqaure-container">${qM()}</div>
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
                    ${jM({setRef:t,getState:n})}
                    ${zM({setRef:t,getState:n})}
                    ${HM({setRef:t,getState:n})}
                    ${UM({setRef:t,getState:n})}
                </div>
            </div>
        </div>
        <button
            type="button"
            class="l-about__prev"
            ${s({toggleAttribute:{disabled:()=>c.activenavItem==1}})}
            ${i({click:()=>{ci(tp[ce.clamp(c.activenavItem-1,1,4)]),yc()}})}
        ></button>
        ${GM({bindEffect:s,delegateEvents:i,proxi:c})}
        <button
            type="button"
            class="l-about__next"
            ${s({toggleAttribute:{disabled:()=>c.activenavItem==4}})}
            ${i({click:()=>{ci(tp[ce.clamp(c.activenavItem+1,1,4)]),yc()}})}
        ></button>
    </div>`};var WT=m.createComponent({tag:"about-component",component:VT,props:{block_1:()=>({value:{titleTop:"",titleBottom:""},type:"any"}),block_2:()=>({value:{title:"",copy:""},type:"any"}),block_3:()=>({value:{title:"",copy:""},type:"any"}),block_4:()=>({value:{title:"",items:[""]},type:"any"}),aboutSvg:()=>({value:"",type:String})},state:{navItem:()=>({value:[{index:1,label:"about"},{index:2,label:"why"},{index:3,label:"what"},{index:4,label:"inspiration"}],type:Array}),activenavItem:()=>({value:1,type:Number,transform:e=>ce.clamp(e,1,4)}),isMounted:()=>({value:!1,type:Boolean})}});m.useComponent([WT]);var jT=async()=>{let{data:e}=await Dt({source:"./data/about/index.json"}),{data:t}=await te({source:"./asset/svg/about.svg?v=0.1"});return g`<about-component
        ${m.staticProps({block_1:e.block_1,block_2:e.block_2,block_3:e.block_3,block_4:e.block_4,aboutSvg:t})}
    ></about-component> `};var zT=({getProxi:e,bindObject:t,delegateEvents:r,onMount:o,id:n,bindEffect:s})=>{let i=e();return o(()=>()=>{}),g`<div
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
    </div> `};var Tc=m.createComponent({tag:"benchmark-fake-component",component:zT,props:{counter:0,label:"",index:0},state:{isSelected:!1}});var bt=(e=1001)=>({state:{counter:()=>({value:0,type:Number}),data:()=>({value:[],type:Array,validate:t=>t.length<e,strict:!0,skipEqual:!1}),time:()=>({value:0,type:Number,transform:t=>Math.round(t),skipEqual:!1}),isLoading:()=>({value:!1,type:Boolean}),currentIndex:()=>({value:-1,type:Number})},child:[Tc]});var op=e=>{for(let t=e.length-1;t>0;t--){let r=Math.floor(Math.random()*(t+1));[e[t],e[r]]=[e[r],e[t]]}return e},li=e=>{let t=u.checkType(Number,e)?e:0;return[...Array.from({length:t}).keys()].map(r=>({label:`comp-${r+1}`}))},rp=({proxi:e,value:t,useShuffle:r=!1})=>{e.isLoading=!0,u.useFrameIndex(()=>{u.useNextTick(async()=>{let o=performance.now();e.data=r?op(li(t)):li(t),await m.tick();let s=performance.now()-o;e.time=s,e.isLoading=!1})},2)},vt=({delegateEvents:e,setRef:t,getRef:r,bindEffect:o,proxi:n})=>g`
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
                ${e({keydown:s=>{if(s.keyCode===13){s.preventDefault();let i=Number(s.target?.value??0);rp({proxi:n,value:i})}}})}
            />
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{let{input:s}=r(),i=Number(s?.value??0);rp({proxi:n,value:i})}})}
            >
                Generate components
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{rp({proxi:n,value:n.data.length,useShuffle:!0})}})}
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
    `;var HT=({onMount:e,delegateEvents:t,bindText:r,invalidate:o,getState:n,staticProps:s,setRef:i,getRef:a,bindProps:c,bindEffect:l,getProxi:p})=>{let d=p();return e(()=>()=>{a()?.input.remove()}),g`<div class="benchmark">
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
                        ${f.map(({label:h},y)=>g`
                                    <benchmark-fake-component
                                        ${s({label:h,index:y})}
                                        ${c(()=>({counter:d.counter}))}
                                    ></benchmark-fake-component>
                                `).join("")}
                    `}})}
        </div>
    </div>`};var UT=m.createComponent({tag:"benchmark-invalidate",component:HT,...bt()});var Sc=(e=1e3)=>g`
        <p>
            Generates and updates a large list of components with 5 reactive
            elements inside.<br />
            ( max component <strong>${e}</strong> ).
        </p>
    `;var GT=({onMount:e,delegateEvents:t,bindObject:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindEffect:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">Repeat ( with key ):</h3>
            <h2 class="benchmark__head__title">
                Generate components performance
            </h2>
            ${Sc()}
            ${vt({setRef:o,getRef:n,delegateEvents:t,bindEffect:a,proxi:l})}

            <div class="benchmark__head__time">
                ${r`components generate in <strong>${()=>l.time}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${i({observe:()=>l.data,useSync:!0,key:"label",render:({sync:p,current:d})=>g`
                              <benchmark-fake-component
                                  ${s({observe:["counter"],props:({counter:f},h,y)=>({index:y,label:h.label,counter:f})})}
                                  ${p()}
                              >
                              </benchmark-fake-component>
                          `})}
        </div>
    </div>`};var qT=m.createComponent({tag:"benchmark-repeat-key",component:GT,...bt()});var JT=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindObject:a,bindEffect:c,getProxi:l})=>{let p=l();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
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
    </div>`};var YT=m.createComponent({tag:"benchmark-repeat-key-nested",component:JT,...bt(31)});var XT=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindEffect:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">Repeat ( without key ):</h3>
            <h2 class="benchmark__head__title">
                Generate components performance
            </h2>
            ${Sc()}
            ${vt({setRef:o,getRef:n,delegateEvents:t,bindEffect:a,proxi:l})}

            <div class="benchmark__head__time">
                ${r`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${i({observe:()=>l.data,useSync:!0,render:({sync:p,current:d})=>g`
                              <benchmark-fake-component
                                  ${s({observe:["counter"],props:({counter:f},h,y)=>({index:y,label:h.label,counter:f})})}
                                  ${p()}
                              >
                              </benchmark-fake-component>
                          `})}
        </div>
    </div>`};var KT=m.createComponent({tag:"benchmark-repeat-no-key",component:XT,...bt()});var Ft=u.createStore({data:()=>({value:[],type:Array,validate:e=>e.length<1001,strict:!0,skipEqual:!1}),counter:()=>({value:0,type:Number}),time:()=>({value:0,type:Number,transform:e=>Math.round(e),skipEqual:!1}),isLoading:()=>({value:!1,type:Boolean})});var np=({value:e,useShuffle:t=!1})=>{Ft.set("isLoading",!0),u.useFrameIndex(()=>{u.useNextTick(async()=>{let r=performance.now();Ft.set("data",t?op(li(e)):li(e)),await m.tick();let n=performance.now()-r;Ft.set("time",n),Ft.set("isLoading",!1)})},2)},QT=({delegateEvents:e,setRef:t,getRef:r,getState:o,bindEffect:n})=>g`
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
                ${e({keydown:s=>{if(s.code.toLowerCase()==="enter"){s.preventDefault();let i=Number(s.target?.value??0);np({value:i})}}})}
            />
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{let{input:s}=r(),i=Number(s?.value??0);np({value:i})}})}
            >
                Generate components
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{let{data:s}=o();np({value:s.length,useShuffle:!0})}})}
            >
                Shuffle array
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{Ft.update("counter",s=>s+1)}})}
            >
                Update counter
            </button>
        </div>
    `;var ZT=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,getState:s,bindProps:i,repeat:a,bindEffect:c,getProxi:l})=>{let p=l();return e(()=>()=>{n()?.input.remove(),Ft.set("data",[]),Ft.set("time",0),Ft.set("counter",0)}),g`<div class="benchmark">
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
            ${QT({setRef:o,getRef:n,delegateEvents:t,getState:s,bindEffect:c})}

            <div class="benchmark__head__time">
                ${r`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${a({observe:()=>p.data,useSync:!0,render:({sync:d,current:f})=>g`
                              <benchmark-fake-component
                                  ${i({observe:["counter"],props:({counter:h},y,b)=>({index:b,label:y.label,counter:h})})}
                                  ${d()}
                              >
                              </benchmark-fake-component>
                          `})}
        </div>
    </div>`};var eS=m.createComponent({tag:"benchmark-repeat-no-key-bind-store",component:ZT,bindStore:Ft,child:[Tc]});var tS=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindObject:a,bindEffect:c,getProxi:l})=>{let p=l();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
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
    </div>`};var rS=m.createComponent({tag:"benchmark-repeat-key-no-nested",component:tS,...bt(31)});var _c=(e=1e3)=>g`
        <p>
            Generates and updates a large list of vanilla HTML element with 4
            reactive elements inside.<br />
            ( max component <strong>${e}</strong> ).
        </p>
    `;var oS=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,repeat:s,bindEffect:i,bindObject:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat no component ( without key ):
            </h3>
            <h2 class="benchmark__head__title">
                Generate vanilla html performance
            </h2>
            ${_c(1e3)}
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
    </div>`};var nS=m.createComponent({tag:"benchmark-repeat-no-component-no-key",component:oS,...bt(1001)});var sS=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,repeat:s,bindEffect:i,bindObject:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat no component ( with key ):
            </h3>
            <h2 class="benchmark__head__title">
                Generate vanilla html performance
            </h2>
            ${_c(1e3)}
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
    </div>`};var iS=m.createComponent({tag:"benchmark-repeat-no-component-with-key",component:sS,...bt(1001)});m.useComponent([UT,KT,qT,YT,rS,eS,nS,iS]);var Fr=async({props:e})=>{let{rootComponent:t}=e;return g`<div class="l-benchMark"><${t}></${t}></div>`};var xe=({active:e=!0,nextRoute:t="",prevRoute:r="",backRoute:o=""})=>{let n=m.useMethodByName(ti);n.update("active",e),n.update("nextRoute",t),n.update("prevRoute",r),n.update("backRoute",o)};m.beforeRouteChange(()=>{let e=m.useMethodByName(ti);e.update("active",!1),e.update("nextRoute",""),e.update("prevRoute",""),e.update("backRoute","")});var yt="rgba(255, 255, 255, 0)",Tt=({disableOffcanvas:e})=>{let t="OffscreenCanvas"in globalThis&&!e;return{useOffscreen:t,context:t?"bitmaprenderer":"2d"}},St=({useOffscreen:e,canvas:t})=>{let r=e?new OffscreenCanvas(t.width,t.height):null,o=e?r?.getContext("2d"):null;return{offscreen:r,offScreenCtx:o}},_t=({useOffscreen:e,offscreen:t,ctx:r})=>{if(e&&t&&r){let o=t.transferToImageBitmap();r.transferFromImageBitmap(o)}},Kn=e=>"roundRect"in e;var yo=({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:n,gutter:s})=>{let i={row:0,col:-1,items:[]};return[...Array.from({length:t*r+t}).keys()].reduce(a=>{let{row:c,col:l,items:p}=a,d=l<r?l+1:0,f=d===0?c+1:c,h=(o+s)*d,y=(n+s)*f;return{row:f,col:d,items:[...p,{width:o,height:n,x:h,y,centerX:h+o/2,centerY:y+n/2,offsetXCenter:Go({canvasWidth:e.width,width:o,gutter:s,numberOfColumn:r}),offsetYCenter:qo({canvasHeight:e.height,height:n,gutter:s,numberOfRow:t}),gutter:s,numberOfColumn:r}]}},i)},Go=({canvasWidth:e,width:t,gutter:r,numberOfColumn:o})=>e/2-(t+r)*o/2,qo=({canvasHeight:e,height:t,gutter:r,numberOfRow:o})=>e/2-(t+r)*(o+1)/2;var X=u.createStore({activeNavigationSection:()=>({value:"",type:String,skipEqual:!1}),navigationIsOpen:()=>({value:!1,type:Boolean})});X.set("activeNavigationSection","");var aS=({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:n,gutter:s,fill:i,disableOffcanvas:a,stagger:c,reorder:l})=>{let{useOffscreen:p,context:d}=Tt({disableOffcanvas:a}),f=!0,h=e.getContext(d,{alpha:!0}),y=m.getActiveRoute(),{offscreen:b,offScreenCtx:T}=St({useOffscreen:p,canvas:e}),_=p?T:h,S=Kn(_);_=null,e.width=e.clientWidth,e.height=e.clientHeight;let E=yo({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:n,gutter:s}).items,C=l?E.map((D,F)=>({...D,scale:1,rotate:0,hasFill:i.includes(F)})).toSorted(D=>D.hasFill?-1:1).toReversed():E.map((D,F)=>{let w=i.includes(F);return{...D,scale:1,rotate:0,hasFill:w}}),M=H.createTimeTween({ease:"easeInOutQuad",stagger:c,data:{scale:1,rotate:0}});C.forEach(D=>{M.subscribeCache(D,({scale:F,rotate:w})=>{D.rotate=w,D.scale=F})});let I=()=>{if(!h)return;p&&b&&(b.width=e.width,b.height=e.height);let D=p?T:h;D&&(e.width=e.width,C.forEach(({x:F,y:w,width:R,height:A,rotate:x,scale:N,hasFill:$,offsetXCenter:B,offsetYCenter:V})=>{let K=Math.PI/180*x,ue=Math.cos(K)*N,ge=Math.sin(K)*N;D.setTransform(ue,ge,-ge,ue,Math.floor(B+F),Math.floor(V+w)),S?(D.beginPath(),D.roundRect(Math.floor(-R/2),Math.floor(-A/2),R,A,5)):(D.beginPath(),D.rect(Math.floor(-R/2),Math.floor(-A/2),R,A)),$?(D.fillStyle="#000000",D.fill()):(D.strokeStyle="#000",D.fillStyle="rgba(238, 238, 238, 0.9)",D.stroke(),D.fill()),D.setTransform(1,0,0,1,0,0)}),_t({useOffscreen:p,offscreen:b,ctx:h}))},P=Ie.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).label({name:"label1"}).goTo(M,{scale:1.5,rotate:90},{duration:1e3}).goTo(M,{scale:.5},{duration:500}).goTo(M,{rotate:180,scale:1.2},{duration:500}).goTo(M,{scale:1.3},{duration:500}).goTo(M,{scale:1},{duration:1200});P.onLoopEnd(({direction:D,loop:F})=>{console.log(`loop end: ${D}, ${F}`)}),P.play();let k=()=>{I(),f&&u.useNextFrame(()=>k())};u.useFrame(()=>{k()});let O=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,C.forEach(D=>{let{width:F,height:w,gutter:R,numberOfColumn:A}=D;D.offsetXCenter=Go({canvasWidth:e.width,width:F,gutter:R,numberOfColumn:A}),D.offsetYCenter=qo({canvasHeight:e.height,height:w,gutter:R,numberOfRow:t})}),u.useFrame(()=>I())}),L=X.watch("navigationIsOpen",D=>{if(D){P?.pause(),f=!1;return}setTimeout(async()=>{f=!0,m.getActiveRoute().route===y.route&&(P?.resume(),u.useFrame(()=>k()))},500)});return()=>{M.destroy(),P.destroy(),O(),L(),M=null,P=null,h=null,b=null,T=null,E=[],f=!1,C=null,d=null}};var cS=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s})=>{let i=s();return document.body.style.background=yt,e(()=>{let{canvas:a}=o(),c=aS({canvas:a,...t()});return u.useFrame(()=>{i.isMounted=!0}),()=>{c(),document.body.style.background=""}}),g`
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
    `};var lS=m.createComponent({tag:"animatedpattern-n0",component:cS,props:{background:"",numberOfRow:()=>({value:10,type:Number}),numberOfColumn:()=>({value:10,type:Number}),cellWidth:()=>({value:window.innerHeight/16,type:Number}),cellHeight:()=>({value:window.innerHeight/16,type:Number}),gutter:()=>({value:1,type:Number}),fill:()=>({value:[16,27,38,49,60,71,82,93],type:Array}),stagger:()=>({value:{each:5,grid:{col:11,row:11,direction:"row"},waitComplete:!1},type:"any"}),reorder:()=>({value:!0,type:Boolean}),disableOffcanvas:()=>({value:!!(ft()||ht()),type:Boolean})},state:{isMounted:!1}});var sp=[{animation:{},description:"<strong>Canvas</strong>: AsyncTimeline - Animated pattern v0",nav:{prevRoute:"#async-timeline",nextRoute:"#animatedPatternN0?version=1&activeId=1",backRoute:"#canvas-overview"}},{description:"<strong>Canvas</strong>: AsyncTimeline - Animated pattern v1",animation:{fill:[0,13,20,45,65,71,72,73,74,75,76,77,83,92,96,113,117,134,138,155,156,157,158,159,189,209],gutter:1,numberOfColumn:20,numberOfRow:10,cellWidth:window.innerHeight/18,cellHeight:window.innerHeight/18,stagger:{each:2,from:"random",waitComplete:!1},reorder:!1},nav:{prevRoute:"#animatedPatternN0?version=0&activeId=0",nextRoute:"#animatedPatternN0?version=2&activeId=2",backRoute:"#canvas-overview"}},{description:"<strong>Canvas</strong>: AsyncTimeline - Animated pattern v2",animation:{fill:[0,13,20,45,65,71,72,73,74,75,76,77,83,92,96,113,117,134,138,155,156,157,158,159,189,209],gutter:1,numberOfColumn:10,numberOfRow:10,stagger:{each:10,from:"edges",waitComplete:!1},reorder:!1},nav:{prevRoute:"#animatedPatternN0?version=1&activeId=1",nextRoute:"#animatedPatternN0?version=3&activeId=3",backRoute:"#canvas-overview"}},{description:"<strong>Canvas</strong>: AsyncTimeline - Animated pattern v3",animation:{fill:[],gutter:1,numberOfColumn:12,numberOfRow:13,cellWidth:window.innerHeight/22,cellHeight:window.innerHeight/22,stagger:{each:20,from:{x:6,y:6},grid:{col:13,row:13,direction:"radial"},waitComplete:!1},reorder:!1},nav:{prevRoute:"#animatedPatternN0?version=2&activeId=2",nextRoute:"#animatedPatternN1",backRoute:"#canvas-overview"}}];var Ee=e=>{m.useMethodByName(dc)?.updateRawContent?.(e)};m.beforeRouteChange(()=>{Ee("")});m.useComponent([lS]);var uS=async({params:e})=>{let{version:t}=e,{data:r}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"}),o=sp[Math.max(0,Math.min(Number(t),sp.length-1))];return o?(xe({active:!0,prevRoute:o.nav.prevRoute,nextRoute:o.nav.nextRoute,backRoute:o.nav.backRoute}),Ee(o.description),g`<div class="l-padding">
        <animatedpattern-n0
            ${m.staticProps({...o.animation,background:r})}
        ></animatedpattern-n0>
    </div>`):""};var pS=({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:n,gutter:s,fill:i,disableOffcanvas:a})=>{let{useOffscreen:c,context:l}=Tt({disableOffcanvas:a}),p=!0,{top:d,left:f}=de(e),h=e.getContext(l,{alpha:!0}),y=m.getActiveRoute(),{offscreen:b,offScreenCtx:T}=St({useOffscreen:c,canvas:e});e.width=e.clientWidth,e.height=e.clientHeight;let _=yo({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:n,gutter:s}).items,S=_.map((w,R)=>({...w,scale:0,mouseX:0,mouseY:0,hasFill:i.includes(R)})).toSorted(w=>w.hasFill?-1:1),E=H.createLerp({data:{mouseX:0,mouseY:0}});S.forEach(w=>{E.subscribeCache(w,({mouseX:R,mouseY:A})=>{w.mouseX=R,w.mouseY=A})});let C=H.createTimeTween({ease:"easeInOutSine",stagger:{each:5,from:"center",waitComplete:!1},data:{scale:0}});S.forEach(w=>{C.subscribeCache(w,({scale:R})=>{w.scale=R})});let M=()=>{if(!h)return;c&&b&&(b.width=e.width,b.height=e.height);let w=c?T:h;w&&(e.width=e.width,S.forEach(({x:R,y:A,width:x,height:N,mouseX:$,mouseY:B,scale:V,hasFill:K,offsetXCenter:ue,offsetYCenter:ge})=>{if(!K)return;let ee=$-(e.width-(x+s)*r)/2,me=B-(e.height-(N+s)*t)/2,pe=(R-ee)/250,ve=(A-me)/250,Pe=Math.sqrt(Math.pow(Math.abs(pe),2)+Math.pow(Math.abs(ve),2)),Be=ce.clamp(Math.abs(Pe),0,2),q=0,Te=Math.cos(q)*(Be+V),De=Math.sin(q)*(Be+V);w.setTransform(Te,De,-De,Te,Math.floor(ue+R),Math.floor(ge+A)),w.beginPath(),w.rect(Math.floor(-x/2),Math.floor(-N/2),x,N),w.fillStyle="#000000",w.fill(),w.setTransform(1,0,0,1,0,0)}),w.globalCompositeOperation="destination-out",S.forEach(({x:R,y:A,width:x,height:N,mouseX:$,mouseY:B,scale:V,hasFill:K,offsetXCenter:ue,offsetYCenter:ge})=>{if(K)return;let ee=$-(e.width-(x+s)*r)/2,me=B-(e.height-(N+s)*t)/2,pe=(R-ee)/250,ve=(A-me)/250,Pe=Math.sqrt(Math.pow(Math.abs(pe),2)+Math.pow(Math.abs(ve),2)),Be=ce.clamp(Math.abs(Pe),0,2),q=0,Te=Math.cos(q)*(Be+V),De=Math.sin(q)*(Be+V);w.setTransform(Te,De,-De,Te,Math.floor(ue+R),Math.floor(ge+A)),w.beginPath(),w.rect(Math.floor(-x/2),Math.floor(-N/2),x,N),w.fill(),w.setTransform(1,0,0,1,0,0)}),_t({useOffscreen:c,offscreen:b,ctx:h}))},I=Ie.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(C,{scale:.3},{duration:1e3});I.play();let P=({x:w,y:R})=>{E.goTo({mouseX:w-f,mouseY:R-d}).catch(()=>{})},k=u.useMouseMove(({client:w})=>{let{x:R,y:A}=w;P({x:R,y:A})}),O=u.useTouchMove(({client:w})=>{let{x:R,y:A}=w;P({x:R,y:A})}),L=()=>{M(),p&&u.useNextFrame(()=>L())};u.useFrame(()=>{L()});let D=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,d=de(e).top,f=de(e).left,S.forEach(w=>{let{width:R,height:A,gutter:x,numberOfColumn:N}=w;w.offsetXCenter=Go({canvasWidth:e.width,width:R,gutter:x,numberOfColumn:N}),w.offsetYCenter=qo({canvasHeight:e.height,height:A,gutter:x,numberOfRow:t})}),u.useFrame(()=>M())}),F=X.watch("navigationIsOpen",w=>{if(w){I?.stop(),p=!1;return}setTimeout(async()=>{p=!0,m.getActiveRoute().route===y.route&&(I?.play(),u.useFrame(()=>L()))},500)});return()=>{C.destroy(),I.destroy(),E.destroy(),D(),k(),O(),F(),C=null,I=null,E=null,h=null,b=null,T=null,_=[],p=!1,S=null,l=null}};var mS=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s})=>{let i=s();return document.body.style.background=yt,e(()=>{let{canvas:a}=o(),c=pS({canvas:a,...t()});return u.useFrame(()=>{i.isMounted=!0}),()=>{document.body.style.background="",c()}}),g`
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
    `};var dS=m.createComponent({tag:"animatedpattern-n1",component:mS,props:{background:"",numberOfRow:7,numberOfColumn:15,cellWidth:window.innerHeight/13,cellHeight:window.innerHeight/13,gutter:window.innerHeight/150,fill:[2,18,10,27,21,22,23,24,25,25,26,37,42,53,58,69,74,85,86,87,88,89,90,44,60,65,98,108],disableOffcanvas:()=>({value:!!(ft()||ht()),type:Boolean})},state:{isMounted:!1}});m.useComponent([dS]);var hS=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"#animatedPatternN0?version=3&activeId=3",nextRoute:"#scrollerN0?version=0&activeId=0",backRoute:"#canvas-overview"}),Ee("<strong>Canvas</strong>: TimeTween Lerp & AsyncTimeline"),g`<div class="l-padding">
        <animatedpattern-n1
            ${m.staticProps({background:e})}
        ></animatedpattern-n1>
    </div>`};var fS=({canvas:e,numItems:t,width:r,height:o,fill:n,opacity:s,radius:i,rotationDuration:a,rotationEach:c,centerEach:l,disableOffcanvas:p})=>{let{useOffscreen:d,context:f}=Tt({disableOffcanvas:p}),h=!0,y=e.getContext(f,{alpha:!0}),{top:b,left:T}=de(e),_=m.getActiveRoute(),{offscreen:S,offScreenCtx:E}=St({useOffscreen:d,canvas:e}),C=!0;e.width=e.clientWidth,e.height=e.clientHeight;let M=[...Array.from({length:t}).keys()].map((x,N)=>{let $=N>=t/2?t/2+(t/2-N):N,B=n.includes(N)?1:$*s;return{width:$*r,height:$*o,x:0,y:0,hasFill:n.includes(N),opacity:B,radius:i,rotate:0,relativeIndex:$}}),I=H.createTimeTween({data:{rotate:0},stagger:{each:c,from:"center"},ease:"easeLinear",relative:!0});[...M].forEach(x=>{I.subscribeCache(x,({rotate:N})=>{x.rotate=N})});let P=H.createSpring({data:{x:0,y:0},stagger:{each:l,from:"end"}});[...M].forEach(x=>{P.subscribeCache(x,({x:N,y:$})=>{x.x=N,x.y=$})});let k=()=>{if(!y)return;d&&S&&(S.width=e.width,S.height=e.height);let x=d?E:y;x&&(e.width=e.width,M.forEach(({width:N,height:$,x:B,y:V,rotate:K,hasFill:ue,opacity:ge},ee)=>{let me=M.length-ee,pe=e.width/2,ve=e.height/2,Pe=1,Be=Math.PI/180*K,q=Math.cos(Be)*Pe,Te=Math.sin(Be)*Pe;x.setTransform(q,Te,-Te,q,pe+B+me*B/20,ve+V+me*V/20),C?(x.beginPath(),x.roundRect(Math.round(-N/2),Math.round(-$/2),N,$,[40,40])):(x.beginPath(),x.rect(Math.round(-N/2),Math.round(-$/2),N,$)),ue?x.fillStyle="#000":(x.strokeStyle="#000",x.fillStyle=`rgba(238, 238, 238, ${ge})`,x.stroke()),x.fill(),x.setTransform(1,0,0,1,0,0)}),_t({useOffscreen:d,offscreen:S,ctx:y}))},O=Ie.createAsyncTimeline({repeat:-1,yoyo:!1,autoSet:!1});O.goTo(I,{rotate:360},{duration:a}),O.play();let L=()=>{k(),h&&u.useNextFrame(()=>L())};u.useFrame(()=>L());let D=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,b=de(e).top,T=de(e).left,k()}),F=({x,y:N})=>{let $=window.innerWidth,B=window.innerHeight,V=x-e.width/2-T,K=N-e.height/2-b;P.goTo({x:ce.clamp(V,-$/2+400+T,$/2-400-T),y:ce.clamp(K,-B/2+200+b,B/2-200-b)}).catch(()=>{})},w=u.useMouseMove(({client:x})=>{let{x:N,y:$}=x;F({x:N,y:$})}),R=u.useTouchMove(({client:x})=>{let{x:N,y:$}=x;F({x:N,y:$})}),A=X.watch("navigationIsOpen",x=>{if(x){h=!1,O?.pause(),I?.pause(),P?.pause();return}setTimeout(()=>{h=!0,m.getActiveRoute().route===_.route&&(O?.resume(),I?.resume(),P?.resume(),u.useFrame(()=>L()))},500)});return()=>{I.destroy(),P.destroy(),O.destroy(),D(),w(),R(),A(),I=null,P=null,O=null,y=null,S=null,E=null,h=!1,M=null,f=null}};var gS=({onMount:e,getState:t,getRef:r,setRef:o,bindEffect:n,getProxi:s})=>{let i=s();return document.body.style.background=yt,e(()=>{let{canvas:a}=r(),c=fS({canvas:a,...t()});return u.useFrame(()=>{i.isMounted=!0}),()=>{c(),document.body.style.background=""}}),g`
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
    `};var bS=m.createComponent({tag:"caterpillar-n1",component:gS,props:{background:"",numItems:20,width:window.innerHeight/30,height:window.innerHeight/30,fill:[14],opacity:1,radius:0,rotationEach:15,centerEach:3,rotationDuration:5e3,disableOffcanvas:()=>({value:!!(ft()||ht()),type:Boolean})},state:{isMounted:!1}});m.useComponent([bS]);var vS=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"",nextRoute:"#caterpillarN2",backRoute:"#canvas-overview"}),Ee("<strong>Canvas</strong>: Spring & AnsyncTimeline"),g`<div class="l-padding">
        <caterpillar-n1 ${m.staticProps({background:e})}>
        </caterpillar-n1>
    </div>`};var ip=({value:e,direction:t,isForced:r})=>{r||console.log(`current: ${e}, direction: ${t}`)},yS=({canvas:e,numItems:t,width:r,height:o,radius:n,fill:s,opacity:i,xAmplitude:a,yAmplitude:c,duration:l,friction:p,rotationDefault:d,disableOffcanvas:f})=>{let{useOffscreen:h,context:y}=Tt({disableOffcanvas:f}),b=!0,T=e.getContext(y,{alpha:!0}),_=d,S=m.getActiveRoute(),{offscreen:E,offScreenCtx:C}=St({useOffscreen:h,canvas:e}),M=!0,I=[...Array.from({length:t}).keys()].map((w,R)=>{let A=R>=t/2?t/2+(t/2-R):R,x=r+r/3*A,N=o+o/3*A,$=s.includes(R)?1:(t-R)*i;return{width:x,height:N,x:0,y:0,hasFill:s.includes(R),opacity:$,radius:n,rotate:0}});e.width=e.clientWidth,e.height=e.clientHeight;let P=H.createSequencer({stagger:{each:7},data:{x:l/4,rotate:0},duration:l}).goTo({x:l+l/4},{start:0,end:l,ease:"easeLinear"}).goTo({rotate:()=>-_},{start:0,end:5,ease:"easeInOutBack"}).goTo({rotate:0},{start:5,end:l,ease:"easeInOutBack"}).label("mylabel",2).add(({isForced:w,direction:R})=>{ip({isForced:w,direction:R,value:1})},1).add(({isForced:w,direction:R})=>{ip({isForced:w,direction:R,value:5})},5).add(({isForced:w,direction:R})=>{ip({isForced:w,direction:R,value:9})},9);I.forEach(w=>{P.subscribeCache(w,({x:R,rotate:A})=>{let x=R/p,N=2/(3-Math.cos(2*x)),$=N*Math.cos(x)*a,B=N*Math.sin(2*x)/2*c;w.x=$,w.y=B,w.rotate=A})});let k=Ie.createSyncTimeline({repeat:-1,yoyo:!1,duration:4e3}).add(P);k.onLoopEnd(({loop:w,direction:R})=>{console.log(`loop end: ${w} , ${R}`)});let O=()=>{if(!T)return;h&&E&&(E.width=e.width,E.height=e.height);let w=h?C:T;w&&(e.width=e.width,I.forEach(({width:R,height:A,x,y:N,rotate:$,hasFill:B,opacity:V})=>{let K=e.width/2,ue=e.height/2,ge=1,ee=Math.PI/180*$,me=Math.cos(ee)*ge,pe=Math.sin(ee)*ge;w.setTransform(me,pe,-pe,me,K+x,ue+N),M?(w.beginPath(),w.roundRect(Math.round(-R/2),Math.round(-A/2),R,A,[40,40])):(w.beginPath(),w.rect(Math.round(-R/2),Math.round(-A/2),R,A)),B?w.fillStyle="#000000":(w.strokeStyle=`rgba(0, 0, 0, ${V})`,w.fillStyle="rgba(238, 238, 238, 0)",w.stroke()),w.fill(),w.setTransform(1,0,0,1,0,0)}),_t({useOffscreen:h,offscreen:E,ctx:T}))},L=()=>{O(),b&&u.useNextFrame(()=>L())};u.useFrame(()=>L()),k.play();let D=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,O()}),F=X.watch("navigationIsOpen",w=>{if(w){b=!1,k?.pause();return}setTimeout(()=>{b=!0,m.getActiveRoute().route===S.route&&(k?.resume(),u.useFrame(()=>L()))},500)});return{destroy:()=>{b=!1,D(),F(),P.destroy(),P=null,k.destroy(),k=null,T=null,E=null,C=null,I=null,y=null},play:()=>{k.play()},playReverse:()=>{k.playReverse()},playUseCurrent:()=>{k.play({useCurrent:!0})},playReverseUseCurrent:()=>{k.playReverse({useCurrent:!0})},playFromLabel:()=>{k.playFrom("mylabel")},plaFromLabelReverse:()=>{k.playFromReverse("mylabel")},stop:()=>k.stop(),pause:()=>k.pause(),resume:()=>k.resume(),reverse:()=>k.reverse(),setRotation:w=>_=w}};function JM({buttons:e}){return Object.entries(e).map(([t,r])=>{let{label:o}=r;return g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn ${t}"
                >
                    ${o}
                </button>
            </li>`}).join("")}var TS=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s,delegateEvents:i})=>{let a=s();return document.body.style.background=yt,e(({element:c})=>{let{canvas:l,rangeValue:p,rotationButton:d}=o(),f=yS({canvas:l,...t()}),{destroy:h,setRotation:y}=f;return Object.entries(a.buttons).forEach(([b,T])=>{let{method:_}=T;c.querySelector(`.${b}`)?.addEventListener("click",()=>f?.[_]())}),d.addEventListener("change",()=>{let b=d.value;y(Number(b)),p.textContent=b}),u.useFrame(()=>{a.isMounted=!0}),()=>{document.body.style.background="",h()}}),g`
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
                        ${JM({buttons:a.buttons})}
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
    `};var YM=10,XM={"js-CN2-play":{label:"play",method:"play"},"js-CN2-playReverse":{label:"play reverse",method:"playReverse"},"js-CN2-play-current":{label:"go forward if is backward",method:"playUseCurrent"},"js-CN2-playReverse-current":{label:"go backward if is forward",method:"playReverseUseCurrent"},"js-CN2-play-label":{label:"play from label",method:"playFromLabel"},"js-CN2-playReverse-label":{label:"play from label reverse",method:"plaFromLabelReverse"},"js-CN2-reverse":{label:"reverse",method:"reverse"},"js-CN2-stop":{label:"stop",method:"stop"},"js-CN2-pause":{label:"pause",method:"pause"},"js-CN2-resume":{label:"resume",method:"resume"}},SS=m.createComponent({tag:"caterpillar-n2",component:TS,props:{background:"",numItems:20,width:window.innerHeight/13,height:window.innerHeight/13,radius:0,fill:[2],opacity:.03,xAmplitude:500,yAmplitude:400,duration:10,rotationDefault:166,friction:YM/2/Math.PI,disableOffcanvas:()=>({value:!!(ft()||ht()),type:Boolean})},state:{isMounted:!1,controlsActive:()=>({value:!1,type:Boolean}),buttons:()=>({value:XM,type:"Any"})}});m.useComponent([SS]);var _S=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"#caterpillarN1",nextRoute:"#async-timeline",backRoute:"#canvas-overview"}),Ee("<strong>Canvas</strong>: Sequencer & SyncTimeline"),g`<div class="l-padding">
        <caterpillar-n2
            ${m.staticProps({background:e})}
        ></caterpillar-n2>
    </div>`};var xc=()=>{m.useMethodByName(ri).update(!0)},Cc=()=>{m.useMethodByName(ri).update(!1)};var xS=({canvas:e,canvasScroller:t,numberOfRow:r,numberOfColumn:o,cellWidth:n,cellHeight:s,gutter:i,fill:a,stagger:c,reorder:l,disableOffcanvas:p})=>{let{useOffscreen:d,context:f}=Tt({disableOffcanvas:p}),h=!0,y=H.createMasterSequencer(),b=e.getContext(f,{alpha:!0}),T=m.getActiveRoute(),{offscreen:_,offScreenCtx:S}=St({useOffscreen:d,canvas:e}),E=d?S:b,C=Kn(E);E=null,e.width=e.clientWidth,e.height=e.clientHeight;let M=yo({canvas:e,numberOfRow:r,numberOfColumn:o,cellWidth:n,cellHeight:s,gutter:i}).items,I=l?M.map((R,A)=>({...R,scale:0,rotate:0,hasFill:a.includes(A)})).toSorted(R=>R.hasFill?-1:1):M.map((R,A)=>({...R,scale:0,rotate:0,hasFill:a.includes(A)})),P=H.createStaggers({items:I,stagger:c}),k=P.map(({item:R,start:A,end:x})=>{let N=R.hasFill?1.1:1,$=H.createSequencer({data:{scale:0}}).goTo({scale:N},{start:A,end:x,ease:"easeInOutQuad"}),B=$.subscribe(({scale:V})=>{R.scale=V});return y.add($),{sequencer:$,unsubscribe:B}}),O=()=>{if(!b)return;d&&_&&(_.width=e.width,_.height=e.height);let R=d?S:b;R&&(e.width=e.width,I.forEach(({x:A,y:x,width:N,height:$,rotate:B,scale:V,hasFill:K,offsetXCenter:ue,offsetYCenter:ge})=>{let ee=Math.PI/180*B,me=Math.cos(ee)*V,pe=Math.sin(ee)*V;R.setTransform(me,pe,-pe,me,Math.floor(ue+A),Math.floor(ge+x)),C?(R.beginPath(),R.roundRect(Math.floor(-N/2),Math.floor(-$/2),N,$,5)):(R.beginPath(),R.rect(Math.floor(-N/2),Math.floor(-$/2),N,$)),K?(R.fillStyle="#000000",R.fill()):(R.strokeStyle="#000",R.fillStyle="rgb(238, 238, 238)",R.fill(),C||(R.strokeStyle="#ccc")),R.setTransform(1,0,0,1,0,0)}),_t({useOffscreen:d,offscreen:_,ctx:b}))},L=Ye.createScrollTrigger({trigger:t,propierties:"tween",tween:y,dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>ne(t)},reverse:!0,ease:!0,easeType:"lerp"});L.init();let D=()=>{O(),h&&u.useNextFrame(()=>D())};u.useFrame(()=>{D()});let F=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,I.forEach(R=>{let{width:A,height:x,gutter:N,numberOfColumn:$}=R;R.offsetXCenter=Go({canvasWidth:e.width,width:A,gutter:N,numberOfColumn:$}),R.offsetYCenter=qo({canvasHeight:e.height,height:x,gutter:N,numberOfRow:r})}),u.useFrame(()=>O())}),w=X.watch("navigationIsOpen",R=>{if(R){h=!1;return}setTimeout(async()=>{h=!0,m.getActiveRoute().route===T.route&&u.useFrame(()=>D())},500)});return()=>{F(),w(),k.forEach(({sequencer:R,unsubscribe:A})=>{R.destroy(),A()}),k=[],y.destroy(),y=null,P=[],L.destroy(),L=null,b=null,_=null,S=null,M=[],h=!1,I=null,f=null}};var CS=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s})=>{let i=s();return document.body.style.background=yt,e(()=>{xc();let{canvas:a,canvasScroller:c}=o();window.scrollTo(0,0);let l=xS({canvas:a,canvasScroller:c,...t()});return u.useFrame(()=>{i.isMounted=!0}),()=>{l(),Cc(),document.body.style.background=""}}),g`
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
    `};var ES=m.createComponent({tag:"scroller-n0",component:CS,props:{background:"",numberOfRow:()=>({value:10,type:Number}),numberOfColumn:()=>({value:10,type:Number}),cellWidth:()=>({value:window.innerHeight/16,type:Number}),cellHeight:()=>({value:window.innerHeight/16,type:Number}),gutter:()=>({value:1,type:Number}),fill:()=>({value:[36,37,38,39,40,47,51,58,62,69,73,80,81,82,83,84],type:Array}),stagger:()=>({value:{type:"equal",each:6,from:"random"},type:"Any"}),reorder:()=>({value:!0,type:Boolean}),disableOffcanvas:()=>({value:!!(ft()||ht()),type:Boolean})},state:{isMounted:!1}});var ap=[{animation:{},description:"<strong>Canvas</strong>: ScrollTrigger & createStagger v0",nav:{prevRoute:"#animatedPatternN1",nextRoute:"#scrollerN0?version=1&activeId=1",backRoute:"#canvas-overview"}},{description:"<strong>Canvas</strong>: ScrollTrigger & createStagger v1",animation:{stagger:{type:"end",each:1,from:{x:0,y:0},grid:{col:11,row:10,direction:"radial"}},reorder:!1},nav:{prevRoute:"#scrollerN0?version=0&activeId=0",nextRoute:"#scrollerN0?version=2&activeId=2",backRoute:"#canvas-overview"}},{description:"<strong>Canvas</strong>: ScrollTrigger & createStagger v2",animation:{stagger:{type:"equal",each:7,from:"center",grid:{col:11,row:10,direction:"col"}},reorder:!1},nav:{prevRoute:"#scrollerN0?version=1&activeId=1",nextRoute:"#scrollerN0?version=3&activeId=3",backRoute:"#canvas-overview"}},{description:"<strong>Canvas</strong>: ScrollTrigger & createStagger v3",animation:{stagger:{type:"equal",each:3,from:"end",grid:{col:11,row:10,direction:"row"}},reorder:!1},nav:{prevRoute:"#scrollerN0?version=2&activeId=2",nextRoute:"#scrollerN0?version=4&activeId=4",backRoute:"#canvas-overview"}},{description:"<strong>Canvas</strong>: ScrollTrigger & createStagger v4",animation:{stagger:{type:"equal",each:2,from:"end"},reorder:!1},nav:{prevRoute:"#scrollerN0?version=3&activeId=3",nextRoute:"#scrollerN1",backRoute:"#canvas-overview"}}];m.useComponent([ES]);var wS=async({params:e})=>{let{version:t}=e,{data:r}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"}),o=ap[Math.max(0,Math.min(Number(t),ap.length-1))];return o?(xe({active:!0,prevRoute:o.nav.prevRoute,nextRoute:o.nav.nextRoute,backRoute:o.nav.backRoute}),Ee(o.description),g`<div>
        <scroller-n0
            ${m.staticProps({...o.animation,background:r})}
        ></scroller-n0>
    </div>`):""};function KM({width:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}function QM({height:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}var IS=({canvas:e,canvasScroller:t,amountOfPath:r,width:o,height:n,opacity:s,intialRotation:i,endRotation:a,disableOffcanvas:c})=>{let{useOffscreen:l,context:p}=Tt({disableOffcanvas:c}),d=!0,f=e.getContext(p,{alpha:!0}),h=m.getActiveRoute(),{offscreen:y,offScreenCtx:b}=St({useOffscreen:l,canvas:e}),T=!1;e.width=e.clientWidth,e.height=e.clientHeight;let _=[...Array.from({length:r}).keys()].map((k,O)=>{let L=O>=r/2?r/2+(r/2-O):O;return{width:Math.floor(KM({width:o,relativeIndex:L,amountOfPath:r})),height:Math.floor(QM({height:n,relativeIndex:L,amountOfPath:r})),opacity:L*s,rotate:0,relativeIndex:L,index:O}}),S=H.createScrollerTween({from:{rotate:0},to:{rotate:a},stagger:{each:5,from:"center"}});[..._].forEach(k=>{S.subscribeCache(k,({rotate:O})=>{k.rotate=O})});let E=()=>{if(!f)return;l&&y&&(y.width=e.width,y.height=e.height);let k=l?b:f;if(!k)return;let O=e.width/2,L=e.height/2;e.width=e.width,_.forEach(({width:D,height:F,opacity:w,rotate:R,index:A})=>{let x=_.length/2-A,N=1,$=Math.PI/180*(R-i),B=Math.cos($)*N,V=Math.sin($)*N;k.setTransform(B,V,-V,B,O,L+x*19),T?(k.beginPath(),k.roundRect(-D/2,-F/2+x*19,D,F,150)):(k.beginPath(),k.rect(Math.round(-D/2),Math.round(-F/2),D,F)),k.strokeStyle="#000",k.fillStyle=`rgba(238, 238, 238, ${w})`,k.stroke(),k.fill(),k.setTransform(1,0,0,1,0,0)}),_t({useOffscreen:l,offscreen:y,ctx:f})},C=Ye.createScrollTrigger({trigger:t,propierties:"tween",tween:S,dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>ne(t)},ease:!0,easeType:"spring"});C.init();let M=()=>{E(),d&&u.useNextFrame(()=>M())};u.useFrame(()=>{M()});let I=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,u.useFrame(()=>{E()})}),P=X.watch("navigationIsOpen",k=>{if(k){d=!1;return}setTimeout(()=>{d=!0,m.getActiveRoute().route===h.route&&u.useFrame(()=>M())},500)});return()=>{S.destroy(),I(),P(),S.destroy(),S=null,C.destroy(),C=null,f=null,y=null,b=null,S=null,d=!1,_=null,p=null}};var MS=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s})=>{let i=s();return document.body.style.background=yt,e(()=>{xc();let{canvas:a,canvasScroller:c}=o(),l=IS({canvas:a,canvasScroller:c,...t()});return u.useFrame(()=>{i.isMounted=!0}),()=>{l(),Cc(),document.body.style.background=""}}),g`
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
    `};var kS=m.createComponent({tag:"scroller-n1",component:MS,props:{background:"",amountOfPath:17,width:15,height:40,radius:0,opacity:.05,intialRotation:33,endRotation:720,disableOffcanvas:()=>({value:!!(ft()||ht()),type:Boolean})},state:{isMounted:!1}});m.useComponent([kS]);var RS=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"#scrollerN0?version=4&activeId=4",nextRoute:"",backRoute:"#canvas-overview"}),Ee("<strong>Canvas</strong>: ScrollTrigger"),g`<div class="l-padding">
        <scroller-n1 ${m.staticProps({background:e})}></scroller-n1>
    </div>`};var NS=({getProxi:e,bindEffect:t})=>{let r=e();return g`
        <button
            type="button"
            class="c-dynamic-list-button"
            ${t({observe:"active",toggleClass:{active:()=>r.active}})}
        >
            ${r.label}
        </button>
    `};var Qn=m.createComponent({tag:"dynamic-list-button",component:NS,props:{label:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean})}});var Ec=[{key:"a",label:"A"},{key:"b",label:"B"},{key:"c",label:"C"},{key:"d",label:"D"}],PS=[{key:"f",label:"F"},{key:"b",label:"B"},{key:"e",label:"E"},{key:"c",label:"C"},{key:"b",label:"B"},{key:"a",label:"A"},{key:"g",label:"G"},{key:"h",label:"H"},{key:"d",label:"D"},{key:"b",label:"B"}],AS=[{key:"m",label:"M"},{key:"q",label:"Q"},{key:"z",label:"Z"},{key:"i",label:"I"},{key:"b",label:"B"},{key:"e",label:"E"},{key:"n",label:"N"},{key:"a",label:"A"},{key:"g",label:"G"},{key:"h",label:"H"},{key:"l",label:"L"},{key:"j",label:"J"},{key:"d",label:"D"}],OS=[{key:"h",label:"H"},{key:"f",label:"F"},{key:"a",label:"A"},{key:"d",label:"D"}],Zn=[[{key:4}],[{key:20},{key:10},{key:10},{key:6},{key:10},{key:10},{key:30}],[{key:3},{key:20},{key:5},{key:20},{key:5},{key:5},{key:5},{key:5},{key:60},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:10},{key:5}]];var ZM=[{buttonLabel:"sample1",data:PS},{buttonLabel:"salmple2",data:AS},{buttonLabel:"sample3",data:OS},{buttonLabel:"Initial",data:Ec}],ek=[{label:"repeater with key",key:"key",clean:!1},{label:"repeater without key",key:"",clean:!1},{label:"repeater clear",key:"",clean:!0}];function tk({staticProps:e,delegateEvents:t,bindProps:r,proxi:o}){return ZM.map((n,s)=>{let{data:i,buttonLabel:a}=n;return g`
                <dynamic-list-button
                    class="c-dynamic-list__top__button"
                    ${e({label:a})}
                    ${t({click:async()=>{o.data=i,o.activeSample=s,await m.tick()}})}
                    ${r(()=>({active:s===o.activeSample}))}
                ></dynamic-list-button>
            `}).join("")}function rk({bindProps:e,staticProps:t,proxi:r}){return ek.map((o,n)=>{let{key:s,clean:i,label:a}=o;return g`
                <dynamic-list-repeater
                    ${t({listId:n,key:s,clean:i,label:a})}
                    ${e(()=>({data:r.data,counter:r.counter}))}
                ></dynamic-list-repeater>
            `}).join("")}var $S=({updateState:e,staticProps:t,bindProps:r,delegateEvents:o,invalidate:n,bindText:s,getProxi:i})=>{let a=i();return g`
        <div class="c-dynamic-list">
            <div class="c-dynamic-list__header">
                <div class="c-dynamic-list__top">
                    ${tk({delegateEvents:o,staticProps:t,bindProps:r,proxi:a})}
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
                    ${rk({bindProps:r,staticProps:t,proxi:a})}
                </div>
            </div>
        </div>
    `};function ok({staticProps:e,bindProps:t,delegateEvents:r,current:o,proxi:n}){return g`
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
    `}var LS=({staticProps:e,bindProps:t,delegateEvents:r,repeat:o,getProxi:n})=>{let s=n(),i=s.key.length>0?s.key:void 0;return g`
        <div class="c-dynamic-list-repeater">
            <h4 class="c-dynamic-list-repeater__title">${s.label}</h4>
            <div class="c-dynamic-list-repeater__list">
                ${o({observe:()=>s.data,clean:s.clean,key:i,afterUpdate:()=>{console.log("repeater updated")},render:({current:a})=>ok({staticProps:e,bindProps:t,delegateEvents:r,current:a,proxi:s})})}
            </div>
        </div>
    `};function nk(e){return[...Array.from({length:e}).keys()].map(t=>t+1)}var sk=({staticProps:e,delegateEvents:t,proxi:r})=>g`
        ${nk(r.counter).map(o=>g`
                    <div class="validate-test-wrapper">
                        <dynamic-list-card-inner
                            ${e({key:`${o}`})}
                            ${t({click:()=>{console.log("invalidate inside reepater click")}})}
                        >
                        </dynamic-list-card-inner>
                    </div>
                `).join("")}
    `,DS=({onMount:e,key:t,staticProps:r,bindProps:o,id:n,delegateEvents:s,invalidate:i,repeat:a,bindText:c,bindEffect:l,getProxi:p,computed:d})=>{let f=p(),h=0;d(()=>f.innerDataUnivoque,()=>f.innerData.filter((b,T,_)=>_.map(({key:S})=>S).indexOf(b.key)===T)),e(async()=>((async()=>(await m.tick(),f.isMounted=!0))(),()=>{}));let y=f.isFull?"is-full":"";return g`
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
                        ${s({click:async()=>{h=h<Zn.length-1?h+1:0,f.innerData=Zn[h],await m.tick()}})}
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
                        ${i({observe:()=>f.counter,render:()=>sk({delegateEvents:s,staticProps:r,proxi:f})})}
                    </div>
                </div>
            </div>
        </div>
    `};var FS=({bindText:e})=>g`<span class="dynamic-list-card-inner">
        <span>${e`${"key"}`}</span>
    </span>`;var wc=m.createComponent({tag:"dynamic-list-card-inner",component:FS,props:{key:()=>({value:"",type:String})}});var BS=({getState:e,bindText:t})=>{let{parentListId:r}=e();return g`<div class="dynamic-counter">
        <p class="c-dynamic-counter__title">Nested:</p>
        <p class="c-dynamic-counter__subtitle">(slotted)</p>
        <p class="c-dynamic-counter__list">list index: ${r}</p>
        <span>${t`${"counter"}`}</span>
    </div>`};var VS=m.createComponent({tag:"dynamic-list-counter",component:BS,props:{parentListId:()=>({value:-1,type:Number}),counter:()=>({value:0,type:Number})}});var WS=()=>g`<div class="c-dynamic-list-empty">
        <p>empty comp</p>
        <mobjs-slot name="empty-slot"></mobjs-slot>
    </div>`;var jS=m.createComponent({tag:"dynamic-list-empty",component:WS});var zS=m.createComponent({tag:"dynamic-list-card",component:DS,props:{parentListId:()=>({value:-1,type:Number}),isFull:()=>({value:!1,type:Boolean}),label:()=>({value:"-",type:String}),index:()=>({value:-1,type:Number}),counter:()=>({value:1,type:Number})},state:{innerData:()=>({value:Zn[0],type:Array}),innerDataUnivoque:()=>({value:Zn[0],type:Array}),isSelected:()=>({value:!1,type:Boolean}),isMounted:()=>({value:!1,type:Boolean})},child:[VS,jS,wc,Qn]});var HS=({bindText:e})=>g`<div class="c-dynamic-list-slotted-label">
        <p class="content">${e`slotted: ${"label"}`}</p>
    </div>`;var US=m.createComponent({tag:"dynamic-slotted-label",component:HS,props:{label:()=>({value:"",type:String})}});var GS=m.createComponent({tag:"dynamic-list-repeater",component:LS,props:{data:()=>({value:[],type:Array}),key:()=>({value:"",type:String}),clean:()=>({value:!1,type:Boolean}),listId:()=>({value:-1,type:Number}),counter:()=>({value:-1,type:Number}),label:()=>({value:"",type:String})},child:[zS,US]});var qS=m.createComponent({tag:"dynamic-list",component:$S,state:{counter:()=>({value:1,type:Number,validate:e=>e<=10&&e>=0,strict:!0}),data:()=>({value:Ec,type:Array}),activeSample:()=>({value:3,type:Number})},child:[Qn,GS,wc]});m.useComponent([qS]);var JS=()=>g` <dynamic-list> </dynamic-list> `;var YS=({refs:e})=>{let t=H.createTimeTween({data:{opacity:0,scale:.5},duration:2e3,ease:"easeOutQuart",stagger:{each:8,from:"end"}}),r=H.createTimeTween({data:{scale:1},duration:6e3,ease:"easeInOutQuad",stagger:{each:12,from:"end"}});e.forEach(i=>{t.subscribeCache(i,({scale:a,opacity:c})=>{i.style.scale=`${a}`,i.style.opacity=`${c}`}),r.subscribeCache(i,({scale:a})=>{i.style.scale=`${a}`})});let o=Ie.createAsyncTimeline({repeat:1,autoSet:!1}).goTo(t,{opacity:1,scale:1}),n=Ie.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(r,{scale:1.1}),s=X.watch("navigationIsOpen",i=>{if(i){o.isActive()&&o.pause(),n.isActive()&&n.pause();return}o.isActive()&&o.resume(),n.isActive()&&n.resume()});return{playIntro:()=>o?.play(),playSvg:()=>{n?.play()},destroy:()=>{s(),t.destroy(),t=null,o.destroy(),o=null,r.destroy(),r=null,n.destroy(),n=null}}};var ik=async({playIntro:e,playSvg:t})=>{await e(),t()},XS=({onMount:e,getProxi:t})=>{let r=t(),{svg:o}=r;return e(({element:n})=>{let s=[...n.querySelectorAll('[ref="svg_group"]')],{destroy:i,playIntro:a,playSvg:c}=YS({refs:s});return setTimeout(()=>{ik({playIntro:a,playSvg:c})},500),()=>{i()}}),g`<div class="l-index">
        <div class="l-index__logo">${o}</div>
    </div>`};var KS=m.createComponent({tag:"home-component",component:XS,props:{svg:()=>({value:"",type:String})},state:{isMounted:()=>({value:!1,type:Boolean})}});m.useComponent([KS]);var QS=async()=>{let{data:e}=await te({source:"./asset/svg/ms_nord.svg?v=1.3"}),{data:t}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return g`
        <div>
            <div class="background-shape">${t}</div>
            <home-component
                ${m.staticProps({svg:e})}
            ></home-component>
        </div>
    `};var ZS=[{state:"level1",maxItem:10,ref:"level1_counter",label_plus:"level1 +",label_minus:"level1 -"},{state:"level2",maxItem:10,ref:"level2_counter",label_plus:"level2 +",label_minus:"level2 -"},{state:"level3",maxItem:6,ref:"level3_counter",label_plus:"level3 +",label_minus:"level3 -"}];function ak(e){return Math.floor(Math.random()*e)}var Ic=({delegateEvents:e,updateState:t,invalidate:r,proxi:o})=>g`
        ${ZS.map(n=>g` <div class="matrioska__head__item">
                    <dynamic-list-button
                        class="matrioska__button"
                        ${e({click:async()=>{t(n.state,s=>s.slice(0,-1))}})}
                        >${n.label_minus}</dynamic-list-button
                    >
                    <dynamic-list-button
                        class="matrioska__button"
                        ${e({click:async()=>{t(n.state,s=>[...s,{key:ak(1e3),value:u.getUnivoqueId()}])}})}
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
    `;var es=e=>{m.useMethodByName(e).toggleActive()};var e_=({repeat:e,staticProps:t,bindProps:r,delegateEvents:o,proxi:n})=>g`
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
                                ${o({click:()=>{es(i)}})}
                            >
                            </matrioska-item>
                            <matrioska-item
                                class="matrioska-item--3"
                                name="${a}"
                                ${t({level:"level 3"})}
                                ${r(()=>({key:`${s.value.key}`,value:`${s.value.value}`,index:s.index,counter:n.counter}))}
                                ${o({click:()=>{es(a)}})}
                            >
                            </matrioska-item>
                        </div>
                    `}})}
        </div>
    `;var t_=({repeat:e,staticProps:t,bindProps:r,delegateEvents:o,proxi:n})=>g`
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
                                ${e_({repeat:e,staticProps:t,delegateEvents:o,bindProps:r,proxi:n})}
                            </matrioska-item>
                        </div>
                    `})}
        </div>
    `;var r_=({delegateEvents:e,updateState:t,repeat:r,staticProps:o,bindProps:n,invalidate:s,getProxi:i})=>{let a=i();return g`<div class="matrioska">
        <div class="matrioska__head">
            ${Ic({delegateEvents:e,updateState:t,invalidate:s,proxi:a})}
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
                                    ${t_({repeat:r,staticProps:o,bindProps:n,delegateEvents:e,proxi:a})}
                                </matrioska-item>
                            </div>
                        `})}
            </div>
        </div>
    </div>`};var o_=({getProxi:e,bindText:t,id:r,bindEffect:o,addMethod:n})=>{let s=e();return n("toggleActive",()=>{s.active=!s.active}),g`<matrioska-item
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
    </matrioska-item>`};var n_=m.createComponent({tag:"matrioska-item",component:o_,props:{level:()=>({value:"",type:String}),key:()=>({value:"",strict:!0,type:String}),index:()=>({value:0,strict:!0,type:Number}),value:()=>({value:"",type:String}),counter:()=>({value:-1,type:Number})},state:{active:()=>({value:!1,type:Boolean})},style:":host { display: block; } "});var s_=({staticProps:e,delegateEvents:t,invalidate:r,bindProps:o,proxi:n})=>g` <div class="matrioska__level matrioska__level--3">
        ${r({observe:"level3",render:()=>n.level3.map((s,i)=>{let a=u.getUnivoqueId(),c=u.getUnivoqueId();return g`
                            <div
                                class="matrioska__item-wrap matrioska__item-wrap--3"
                            >
                                <matrioska-item
                                    class="matrioska-item--3"
                                    name="${a}"
                                    ${e({level:"level 3",value:s.value,index:i,key:`${s.key}`})}
                                    ${o(()=>({counter:n.counter}))}
                                    ${t({click:()=>{es(a)}})}
                                >
                                </matrioska-item>
                                <matrioska-item
                                    class="matrioska-item--3"
                                    name="${c}"
                                    ${e({level:"level 3",index:i,value:s.value,key:`${s.key}`})}
                                    ${o(()=>({counter:n.counter}))}
                                    ${t({click:()=>{es(c)}})}
                                >
                                </matrioska-item>
                            </div>
                        `}).join("")})}
    </div>`;var i_=({staticProps:e,bindProps:t,delegateEvents:r,invalidate:o,proxi:n})=>g`
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
                                        ${s_({staticProps:e,delegateEvents:r,invalidate:o,bindProps:t,proxi:n})}
                                    </matrioska-item>
                                </div>
                            `).join("")})}
        </div>
    `;var a_=({delegateEvents:e,updateState:t,staticProps:r,bindProps:o,invalidate:n,getProxi:s})=>{let i=s();return g`<div class="matrioska">
        <div class="matrioska__head">
            ${Ic({delegateEvents:e,updateState:t,invalidate:n,proxi:i})}
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
                                            ${i_({staticProps:r,bindProps:o,delegateEvents:e,invalidate:n,proxi:i})}
                                        </matrioska-item>
                                    </div>
                                `).join("")})}
            </div>
        </div>
    </div>`};var ck=e=>{for(let t=e.length-1;t>0;t--){let r=Math.floor(Math.random()*(t+1));[e[t],e[r]]=[e[r],e[t]]}return e},c_={state:{level1:()=>({value:[{key:1,value:u.getUnivoqueId()}],type:Array,validate:e=>e.length<=10,strict:!0}),level2:()=>({value:[{key:1,value:u.getUnivoqueId()},{key:2,value:u.getUnivoqueId()}],type:Array,validate:e=>e.length<=10,strict:!0}),level3:()=>({value:[{key:1,value:u.getUnivoqueId()},{key:2,value:u.getUnivoqueId()}],type:Array,transform:(e,t)=>e>t?ck(e):e,validate:e=>e.length<=6,strict:!0}),counter:()=>({value:0,type:Number})},child:[Qn,n_]},l_=m.createComponent({tag:"page-matrioska-repeat",component:r_,...c_}),u_=m.createComponent({tag:"page-matrioska-invalidate",component:a_,...c_});m.useComponent([l_,u_]);var p_=()=>g` <page-matrioska-repeat> </page-matrioska-repeat> `,m_=()=>g` <page-matrioska-invalidate> </page-matrioska-invalidate> `;var cp=0,lk=({indicators:e,proxi:t})=>[...e].map((r,o)=>Ye.createScrollTrigger({item:r,pin:!0,animateAtStart:!1,animatePin:!0,useThrottle:!0,ease:!1,dynamicStart:{position:"right",value:()=>window.innerWidth+cp-Ve(r)*(o+1)},dynamicEnd:{position:"right",value:()=>{let n=e.length-(o-2);return window.innerWidth/10*9*n}},onEnter:()=>{t.currentIdFromScroll=o},onLeaveBack:()=>{t.currentIdFromScroll=o-1}})),d_=({pins:e})=>{e.forEach(t=>t.refresh())},uk=({titles:e})=>[...e].map(t=>Ye.createParallax({item:t,propierties:"x",reverse:!0,range:9})),h_=({nav:e})=>{e.classList.add("active"),[...document.querySelectorAll(".js-indicator")].forEach(r=>{r.classList.add("active")})},f_=({nav:e})=>{e.classList.remove("active"),[...document.querySelectorAll(".js-indicator")].forEach(r=>{r.classList.remove("active")})},g_=({indicators:e,titles:t,nav:r,animatePin:o,proxi:n,rootRef:s})=>{let i=lk({indicators:e,proxi:n}),a=uk({titles:t}),c=document.querySelector(".l-navcontainer__side");cp=Ve(c)/2;let l=u.useResize(()=>{cp=Ve(c)/2}),p=new Xs({root:s,container:".js-container",row:".js-row",column:".js-column",trigger:".js-trigger",shadowClass:".shadowClass",useWillChange:!0,useDrag:!0,useSticky:!o,useThrottle:!0,animateAtStart:!1,ease:!1,easeType:"lerp",addCss:!0,columnHeight:70,columnWidth:100,columnAlign:"center",animatePin:o,breakpoint:"tablet",children:[...i,...a],onEnter:()=>{d_({pins:i}),h_({nav:r})},onEnterBack:()=>{d_({pins:i}),h_({nav:r})},onLeave:()=>{f_({nav:r})},onLeaveBack:()=>{f_({nav:r})}});return p.init(),{destroy:()=>{i.forEach(d=>{d?.destroy()}),i=[],a.forEach(d=>{d?.destroy()}),a=[],p.destroy(),p=null,l()},refresh:()=>p.refresh()}};var pk=(e,t)=>e===0?1:e===t-1?-1:0,mk=({numOfCol:e,pinIsVisible:t,staticProps:r})=>{let o=t?"":"hidden";return[...Array.from({length:e}).keys()].map((n,s)=>g`
                <horizontal-scroller-section
                    ${r({id:s,pinClass:o})}
                ></horizontal-scroller-section>
            `).join("")},dk=({numOfCol:e,proxi:t,staticProps:r,delegateEvents:o})=>[...Array.from({length:e}).keys()].map((n,s)=>g`
                <horizontal-scroller-button
                    ${r({id:s})}
                    ${o({click:()=>t.currentId=s})}
                ></horizontal-scroller-button>
            `).join(""),b_=({onMount:e,watch:t,staticProps:r,delegateEvents:o,setRef:n,getRef:s,getProxi:i})=>{let a=i();return e(({element:c})=>{if(ce.mq("max","desktop"))return;let l=10,p=[...c.querySelectorAll(".js-indicator")],d=c.querySelector(".js-nav"),f=[...c.querySelectorAll(".js-title h1")],{destroy:h}=g_({rootRef:s().js_root,indicators:p,titles:f,nav:d,animatePin:a.animatePin,proxi:a});return window.scrollTo(0,0),t(()=>a.currentId,(y,b)=>{let T=c.querySelector(`.shadowClass--section-${y} .shadowClass--in-center`),{top:_}=de(T),S=ne(T),E=Number.parseInt(y)===0?window.innerHeight+1:_+S-window.innerHeight,C=Math.max(1,Math.abs(y-b)),M=2e3,P=1+(l-C)/l*.9,k=C/l*M*P;Lr.to(E+pk(y,l),{duration:k})}),()=>{h()}}),ce.mq("max","desktop")?g`<div><only-desktop></only-desktop></div>`:g`<div class="l-h-scroller">
        <only-desktop></only-desktop>
        <div class="l-h-scroller__top">scroll down</div>
        <ul class="l-h-scroller__nav js-nav" ${n("js_nav")}>
            ${dk({numOfCol:10,proxi:a,staticProps:r,delegateEvents:o})}
        </ul>
        <div class="l-h-scroller__root js-root" ${n("js_root")}>
            <div
                class="l-h-scroller__container js-container"
                ${n("js_container")}
            >
                <div class="l-h-scroller__row js-row" ${n("js_root")}>
                    ${mk({numOfCol:10,pinIsVisible:!a.animatePin,staticProps:r})}
                </div>
                <div
                    class="l-h-scroller__trigger js-trigger"
                    ${n("js_trigger")}
                ></div>
            </div>
        </div>
        <div class="l-h-scroller__bottom">scroll up</div>
    </div>`};var v_=({getProxi:e})=>{let t=e();return g`
        <li>
            <button
                type="button"
                data-id="${t.id}"
                class="l-h-scroller__nav__btn"
            >
                ${t.id}
            </button>
        </li>
    `};var y_=m.createComponent({tag:"horizontal-scroller-button",component:v_,props:{id:()=>({value:-1,type:Number})}});var T_=({getState:e})=>{let{id:t,pinClass:r}=e();return g`
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
    `};var S_=m.createComponent({tag:"horizontal-scroller-section",component:T_,props:{id:()=>({value:-1,type:Number}),pinClass:()=>({value:"",type:String})}});var __=m.createComponent({tag:"horizontal-scroller",component:b_,props:{animatePin:()=>({value:!1,type:Boolean})},state:{currentId:()=>({value:0,type:Number,skipEqual:!1}),currentIdFromScroll:()=>({value:0,type:Number})},child:[y_,S_]});m.useComponent([__]);var x_=async()=>(xe({active:!0,prevRoute:"",nextRoute:"",backRoute:""}),g`<div>
        <horizontal-scroller
            ${m.staticProps({animatePin:!1})}
        ></horizontal-scroller>
    </div>`);var C_=({getState:e})=>{let{fill:t}=e();return g`
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
    `};var E_=m.createComponent({tag:"svg-star",component:C_,props:{fill:()=>({value:"#000000",type:String})}});var hk=({delegateEvents:e,bindEffect:t,bindObject:r,proxi:o})=>g`<div
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
    </div>`,w_=({bindProps:e,delegateEvents:t,bindObject:r,getProxi:o,bindEffect:n})=>{let s=o();return g`<div>
        <button
            type="button"
            class="c-move3d-page__controls__open"
            ${t({click:()=>{s.controlsActive=!0}})}
        >
            show controls
        </button>
        ${hk({delegateEvents:t,bindEffect:n,bindObject:r,proxi:s})}
        <move-3d
            ${e(()=>({shape:s.data,xDepth:s.xDepth,yDepth:s.yDepth,xLimit:s.xLimit,yLimit:s.yLimit,factor:s.factor,debug:s.debug}))}
        ></move-3d>
    </div>`};var fk=({debug:e,id:t})=>e?g`<span class="c-move3d-item__debug">${t}</span>`:"",lp=({data:e,root:t,childrenId:r,debug:o})=>e.map(({children:n,props:s})=>g`<move-3d-item
                name="${r}"
                ${m.staticProps({root:t,...s})}
            >
                ${fk({debug:o,id:s.id})}
                ${lp({data:n??[],root:!1,childrenId:r,debug:o})}
            </move-3d-item>`).join("");var up=({element:e})=>({height:ne(e),width:Ve(e),offSetLeft:de(e).left,offSetTop:de(e).top}),I_=({childrenId:e})=>m.useMethodArrayByName(e).map(r=>o=>r?.move?.(o)),M_=({ratio:e})=>({get3dItemUnit:t=>`min(${t}px, calc((((100vw) * ${t}) / ${e} )))`});var ts=()=>{},k_=({onMount:e,setRef:t,getRef:r,watch:o,computed:n,invalidate:s,getProxi:i,bindEffect:a})=>{let c=u.getUnivoqueId(),l=i(),p=0,d=0,f=0,h=0,y=0,b=0,T=0,_=0,S=!1,E=!1,C={x:0,y:0},M=0,I=ts,P=ts,k=ts,O=ts,L=ts,D=ts,F=[],w=H.createSpring({data:{delta:0,ax:0,ay:0}}),R=()=>{S=!1},A=()=>{let{vw:V,vh:K}=l.centerToViewoport||l.drag?{vw:window.innerWidth,vh:window.innerHeight}:{vw:d,vh:p},ue=C.x,ge=C.y,{xgap:ee,ygap:me}=S?E?(E=!1,{xgap:0,ygap:0}):{xgap:ue-y,ygap:ge-T}:{xgap:0,ygap:0};S&&(b+=ee,_+=me);let{xInMotion:pe,yInMotion:ve}=S?{xInMotion:b,yInMotion:_}:{xInMotion:ue,yInMotion:ge},{ax:Pe,ay:Be}=l.centerToViewoport||l.drag?{ax:-(V/2-pe)/l.xDepth,ay:(K/2-ve)/l.yDepth}:{ax:-(V/2-(pe-f))/l.xDepth,ay:(K/2-(ve-h))/l.yDepth};y=ue,T=ge;let q=Pe>l.xLimit||Pe<-l.xLimit,Te=Be>l.yLimit||Be<-l.yLimit;q&&(b-=ee),Te&&(_-=me);let De=ce.clamp(Pe,-l.xLimit,l.xLimit),pt=ce.clamp(Be,-l.yLimit,l.yLimit),wt=Math.sqrt(Math.pow(Math.abs(pt),2)+Math.pow(Math.abs(De),2));w.goTo({delta:wt,ax:De,ay:pt}).catch(()=>{}),F.forEach(Ke=>{Ke({delta:wt,factor:l.factor})})},x=V=>{M!==V&&(C.y-=M,M=V,C.y+=M),A()},N=({page:V})=>V.y>h&&V.y<h+p&&V.x>f&&V.x<f+d,$=({page:V})=>{N({page:V})&&(S=!0,E=!0)},B=()=>{D(),D=l.useScroll?u.useScroll(({scrollY:V})=>{x(V)}):()=>{}};return e(({element:V})=>{let{container:K}=r();l.afterInit(V);let ue=w.subscribe(({delta:pe,ax:ve,ay:Pe})=>{K.style.transform=`translate3D(0,0,0) rotateY(${ve}deg) rotateX(${Pe}deg)`,l.onUpdate({delta:pe,deltaX:ve,deltaY:Pe})}),ge=w.onComplete(({ax:pe,ay:ve})=>{K.style.transform=`rotateY(${pe}deg) rotateX(${ve}deg)`}),ee=u.useMouseMove(({page:pe})=>{C={x:pe.x,y:pe.y},A()}),me=u.useResize(()=>{({height:p,width:d,offSetTop:h,offSetLeft:f}=up({element:V}))});return o(()=>l.drag,pe=>{if(L(),O(),k(),P(),I(),pe){b=window.innerWidth/2,_=window.innerHeight/2,I=u.useTouchStart(({page:ve})=>{$({page:ve})}),P=u.useTouchEnd(()=>{R()}),k=u.useMouseDown(({page:ve})=>{$({page:ve})}),O=u.useMouseUp(()=>{R()}),L=u.useTouchMove(({page:ve})=>{C={x:ve.x,y:ve.y},A()});return}},{immediate:!0}),o(()=>l.useScroll,(pe,ve)=>{if(pe){B();return}pe!==ve&&D()}),n(()=>l.useScroll,()=>!l.drag&&!l.centerToViewoport),u.useNextLoop(()=>{({height:p,width:d,offSetTop:h,offSetLeft:f}=up({element:V})),C={x:window.innerWidth/2,y:window.innerHeight/2},A()}),()=>{ue(),ge(),me(),ee(),D(),I(),P(),k(),O(),L(),w.destroy(),F=[],w=null,p=null,d=null,f=null,h=null,y=null,b=null,T=null,_=null,S=null,E=null,C=null,M=null}}),g`<div
        class="c-move-3d"
        ${a({toggleClass:{"move3D--drag":()=>l.drag}})}
    >
        <div
            class="c-move-3d__scene"
            ${a({toggleStyle:{perspective:()=>`${l.perspective}px`}})}
        >
            <div class="c-move-3d__container" ${t("container")}>
                ${s({observe:[()=>l.shape,()=>l.debug],afterUpdate:()=>{F=I_({childrenId:c})},render:()=>lp({data:l.shape,root:!0,childrenId:c,debug:l.debug})})}
            </div>
        </div>
    </div>`};var pp=({startRotation:e,range:t,delta:r,limit:o})=>Number.parseFloat((t*r/o-e).toFixed(2)),R_=({rotate:e,anchorPoint:t,baseRotateX:r,baseRotateY:o})=>{if(!e||!t)return{rotateX:0,rotateY:0};switch(e.toUpperCase()){case"X":return(()=>{switch(t.toUpperCase()){case"BOTTOM":return{rotateX:r,rotateY:0};case"TOP":return{rotateX:-r,rotateY:0};default:return{rotateX:0,rotateY:0}}})();case"Y":return(()=>{switch(t.toUpperCase()){case"LEFT":return{rotateX:0,rotateY:o};case"RIGHT":return{rotateX:0,rotateY:-o};default:return{rotateX:0,rotateY:0}}})();case"XY":return(()=>{switch(t.toUpperCase()){case"TOP-LEFT":return{rotateX:-r,rotateY:o};case"TOP-RIGHT":return{rotateX:-r,rotateY:-o};case"BOTTOM-LEFT":return{rotateX:r,rotateY:o};case"BOTTOM-RIGHT":return{rotateX:r,rotateY:-o};default:return{rotateX:0,rotateY:0}}})();default:return{rotateX:0,rotateY:0}}};var gk=e=>e?.tagName.length===0?"":g`
        <div class="c-move3d-item__component ${e?.className}">
            <${e.tagName} ${m.staticProps(e?.props??{})}>
            </${e.tagName}>
        </div>`,bk=({delta:e,factor:t,initialRotate:r,depth:o,range:n,rotate:s,anchorPoint:i,lerp:a})=>{let c=Math.round(o*e/t),l={startRotation:r??0,range:n??20,delta:e,limit:t},p=pp(l),d=pp(l),f={rotate:s??"center",anchorPoint:i,baseRotateX:p,baseRotateY:d},{rotateX:h,rotateY:y}=R_(f);a.goTo({depth:c,rotateX:h,rotateY:y}).catch(()=>{})},N_=({getState:e,addMethod:t,onMount:r})=>{let{root:o,anchorPoint:n,animate:s,depth:i,rotate:a,width:c,height:l,offsetX:p,offsetY:d,range:f,initialRotate:h,initialDepth:y,classList:b,component:T}=e(),_=o?"is-root":"is-children",S=`--item-width:${c};`,E=`--item-height:${l};`,C=`--offset-x:${p};`,M=`--offset-y:${d};`,I=H.createLerp({data:{depth:0,rotateX:0,rotateY:0}});return t("move",({delta:P,factor:k})=>{s&&bk({delta:P,factor:k,initialRotate:h,depth:i,range:f,rotate:a,anchorPoint:n,lerp:I})}),r(({element:P})=>{let k=I.subscribe(({depth:D,rotateX:F,rotateY:w})=>{let R=D+y;P.style.transform=`translate3D(0,0,${R}px) rotateX(${F}deg) rotateY(${w}deg)`}),O=I.onComplete(({depth:D,rotateX:F,rotateY:w})=>{let R=D+y;P.style.transform=`translateZ(${R}px) rotateX(${F}deg) rotateY(${w}deg)`}),L=y;return P.style.transform=`translateZ(${L}px)`,()=>{k(),O(),I.destroy(),I=null}}),g`<div
        class="c-move3d-item ${_} anchor-${n}"
        style="${S}${E}${C}${M}"
    >
        <div class="c-move3d-item__content ${b}"></div>
        ${gk({tagName:T?.tagName??"",className:T?.className??"",props:T?.props??{}})}
        <mobjs-slot></mobjs-slot>
    </div>`};var P_=m.createComponent({tag:"move-3d-item",component:N_,props:{root:()=>({value:!0,type:Boolean}),depth:()=>({value:0,type:Number}),rotate:()=>({value:"x",type:String}),width:()=>({value:"0px",type:String}),height:()=>({value:"0px",type:String}),offsetX:()=>({value:"0px",type:String}),offsetY:()=>({value:"0px",type:String}),range:()=>({value:20,type:Number}),anchorPoint:()=>({value:"center",type:String}),animate:()=>({value:!0,type:Boolean}),initialRotate:()=>({value:0,type:Number}),initialDepth:()=>({value:0,type:Number}),classList:()=>({value:"",type:String}),component:{tagName:()=>({value:"",type:String}),className:()=>({value:"",type:String}),props:()=>({value:"",type:"any"})}},state:{id:()=>({value:"",type:String})}});var rs=m.createComponent({tag:"move-3d",component:k_,props:{drag:()=>({value:!1,type:Boolean}),centerToViewoport:()=>({value:!1,type:Boolean}),perspective:()=>({value:700,type:Number}),xDepth:()=>({value:20,type:Number,validate:e=>e>1,strict:!0}),yDepth:()=>({value:20,type:Number,validate:e=>e>1,strict:!0}),xLimit:()=>({value:1e4,type:Number}),yLimit:()=>({value:1e4,type:Number}),factor:()=>({value:45,type:Number,validate:e=>e>1,strict:!0}),shape:()=>({value:[],type:Array}),debug:()=>({value:!1,type:Boolean}),afterInit:()=>({value:()=>{},type:Function}),onUpdate:()=>({value:()=>{},type:Function})},state:{useScroll:()=>({value:!0,type:Boolean})},child:[P_]});var A_=m.createComponent({tag:"move-3d-page",component:w_,props:{data:()=>({value:[],type:Array})},state:{xDepth:()=>({value:20,type:Number}),yDepth:()=>({value:20,type:Number}),xLimit:()=>({value:1e3,type:Number}),yLimit:()=>({value:1e3,type:Number}),perspective:()=>({value:700,type:Number}),debug:()=>({value:!1,type:Boolean}),factor:()=>({value:45,type:Number,validate:e=>e>1,strict:!0}),controlsActive:()=>({value:!1,type:Boolean})},child:[rs]});m.useComponent([A_,E_]);var O_=async({props:e})=>{let{data:t,prevRoute:r,nextRoute:o}=e,{data:n}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:r,nextRoute:o,backRoute:"#plugin-overview"}),Ee("<strong>Move#d:</strong> css && js 3d shape"),g` <div>
        <div class="background-shape">${n}</div>
        <move-3d-page
            ${m.staticProps({data:t})}
        ></move-3d-page>
    </div>`};var{get3dItemUnit:z}=M_({ratio:1980}),$_=[{props:{id:0,depth:0,anchorPoint:"center",classList:"move3d-square",animate:!0,width:z(150),height:z(150)},children:[{props:{id:1,depth:200,width:z(150),height:z(150),rotate:"",anchorPoint:"center",initialDepth:100,classList:"move3d-square has-star pippo",component:{tagName:"svg-star",className:"move3d-square__star",props:{fill:"#f28f3b"}},animate:!0},children:[]},{props:{id:2,depth:200,width:z(80),height:z(80),offsetX:z(40),offsetY:z(40),rotate:"",initialDepth:200,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:3,depth:200,width:z(80),height:z(80),offsetX:z(-10),offsetY:z(80),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:4,depth:200,width:z(80),height:z(80),offsetX:z(80),offsetY:z(80),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:5,depth:200,width:z(80),height:z(80),offsetX:z(-10),offsetY:z(-10),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:6,depth:200,width:z(80),height:z(80),offsetX:z(80),offsetY:z(-10),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:7,depth:100,width:z(150),height:z(150),rotate:"x",range:20,anchorPoint:"bottom",classList:"move3d-square",animate:!0},children:[{props:{id:8,depth:0,width:z(150),height:z(150),rotate:"x",range:30,anchorPoint:"bottom",classList:"move3d-square",animate:!0},children:[]}]},{props:{id:9,depth:100,width:z(150),height:z(150),rotate:"x",range:20,anchorPoint:"top",classList:"move3d-square",animate:!0},children:[{props:{id:10,depth:0,width:z(150),height:z(150),rotate:"x",range:20,anchorPoint:"top",classList:"move3d-square",animate:!0},children:[]}]},{props:{id:11,depth:100,width:z(150),height:z(150),rotate:"y",range:20,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[{props:{id:12,depth:0,width:z(150),height:z(150),rotate:"y",range:30,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[{props:{id:13,depth:0,width:z(150),height:z(150),rotate:"y",range:40,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[]}]}]},{props:{id:13,depth:100,width:z(150),height:z(150),rotate:"y",range:20,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[{props:{id:14,depth:0,width:z(150),height:z(150),rotate:"y",range:30,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[{props:{id:15,depth:0,width:z(150),height:z(150),rotate:"y",range:40,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[]}]}]},{props:{id:16,depth:150,rotate:"xy",width:z(150),height:z(150),offsetX:z(20),offsetY:z(20),range:20,anchorPoint:"bottom-left",classList:"move3d-square",animate:!0},children:[{props:{id:17,depth:100,rotate:"",width:z(150),height:z(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:18,depth:150,rotate:"xy",width:z(150),height:z(150),offsetX:z(20),offsetY:z(20),range:20,anchorPoint:"bottom-right",classList:"move3d-square",animate:!0},children:[{props:{id:19,depth:100,rotate:"",width:z(150),height:z(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:20,depth:150,rotate:"xy",width:z(150),height:z(150),offsetX:z(20),offsetY:z(20),range:20,anchorPoint:"top-left",classList:"move3d-square",animate:!0},children:[{props:{id:21,depth:100,rotate:"",width:z(150),height:z(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:22,depth:150,rotate:"xy",width:z(150),height:z(150),offsetX:z(20),offsetY:z(20),range:20,anchorPoint:"top-right",classList:"move3d-square",animate:!0},children:[{props:{id:23,depth:100,rotate:"",width:z(150),height:z(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]}]}];var L_={shape1:{prevRoute:"",nextRoute:"#plugin-dragger",data:$_}};var D_=({getState:e})=>{let{content:t}=e();return g`${t}`};var os=m.createComponent({tag:"any-component",component:D_,props:{content:()=>({value:"",type:String})}});var F_=({elements:e})=>{let t=180/Math.PI,r=window.innerWidth,o=window.innerHeight,n=0,s=0,i=0,a=0,c=H.createSpring({data:{x:0,y:0},stagger:{each:3,from:"start"}});e.forEach(f=>{c.subscribe(({x:h,y})=>{f.style.translate=`${h}px ${y}px`})});let l=H.createSpring({data:{rotation:0},stagger:{each:8,from:"start"}});e.forEach(f=>{f&&l.subscribeCache(f,({rotation:h})=>{f.style.rotate=`${h}deg`})});let p=u.useResize(()=>{r=window.innerWidth,o=window.innerHeight}),d=u.useMouseMove(({client:f})=>{let{x:h,y}=f,b=y-n,T=h-s;if(Math.abs(T)>10||Math.abs(b)>10){n=y,s=h;let S=Math.atan2(b,T)*t+180,E=Math.abs(i-S);E>180&&i<S&&(a-=E),E>180&&i>S&&(a+=E);let C=S+a+90;l.goTo({rotation:C}),i=S}c.goTo({x:h-r/2,y:y-o/2})});return{destroy:()=>{c.destroy(),c=null,l.destroy(),l=null,p(),d(),r=null,o=null,n=null,s=null,i=null,a=null}}};var vk=5,B_=({onMount:e,getRefs:t,setRef:r})=>{let{starOutline:o}=gt(),n=[...Array.from({length:vk}).keys()].map(()=>`<span class='mouse-trail__item' ${r("star")}>${o}</span>`).join("");return e(()=>{let{star:s}=t(),{destroy:i}=F_({elements:s});return()=>{i()}}),g`<div class="mouse-trail">${n}</div>`};var Mc=m.createComponent({tag:"mouse-trail",component:B_});var ns=({svg:e,id:t})=>{let r=document.createRange().createContextualFragment(e),o=r.querySelectorAll('[type="layer"]'),n=r.querySelectorAll('[type="delete"]');return[...o].forEach(i=>{i.id!==t&&i.remove()}),[...n].forEach(i=>{i.remove()}),My(r)};var V_=({u0:e,u1:t,o:r,o_b:o,m1:n,m2:s,m3:i,m4:a,b1:c,b1_b:l,b3:p,b4:d,b5:f,sign:h,m1_b:y,m3_b:b,m4_b:T,b1_stone:_,m1_stone:S})=>[{props:{id:0,depth:200,anchorPoint:"center",classList:"",animate:!0},children:[{props:{id:1,depth:-500,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:e}}},children:[]},{props:{id:1,depth:-50,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:t}}},children:[]},{props:{id:2,depth:20,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:r}}},children:[]},{props:{id:2,depth:21,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:o}}},children:[]},{props:{id:3,depth:150,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:n}}},children:[]},{props:{id:3,depth:150,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:y}}},children:[]},{props:{id:6,depth:155,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:a}}},children:[]},{props:{id:6,depth:155,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:T}}},children:[]},{props:{id:6,depth:170,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:S}}},children:[]},{props:{id:4,depth:180,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:s}}},children:[]},{props:{id:4,depth:180,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:h}}},children:[]},{props:{id:5,depth:100,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:i}}},children:[]},{props:{id:5,depth:100,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:b}}},children:[]},{props:{id:6,depth:50,anchorPoint:"center",initialDepth:1,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:c}}},children:[]},{props:{id:6,depth:51,anchorPoint:"center",initialDepth:1,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:l}}},children:[]},{props:{id:7,depth:120,anchorPoint:"center",initialDepth:20,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:_}}},children:[]},{props:{id:8,depth:100,initialDepth:10,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:p}}},children:[]},{props:{id:10,depth:170,anchorPoint:"center",initialDepth:10,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:d}}},children:[]},{props:{id:11,depth:100,anchorPoint:"center",initialDepth:1,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:f}}},children:[]}]}];m.useComponent([rs,os,Mc]);var W_=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=0.9"}),{data:t}=await te({source:"./asset/svg/rdp.svg?v=1.3"}),[r,o,n,s,i,a,c,l,p,d,f,h,y,b,T,_,S,E,C]=["U0_block","U1_block","O_block","O_b_block","M1_block","M1_b_block","M2_block","M3_block","M3_b_block","M4_block","M4_b_block","B1_block","B1_b_block","B3_block","B4_block","B5_block","sign","Bstone_1_block","Mstone_1_block"].map(I=>ns({svg:e,id:I}));return xe({active:!0,prevRoute:"#rdp-01",nextRoute:"#mob-02",backRoute:"#svg-overview"}),Ee("<strong>Svg</strong>: Mob lettering"),g`<div class="l-mob-01">
        <div class="background-shape">${t}</div>
        <mouse-trail></mouse-trail>
        <move-3d
            ${m.staticProps({shape:V_({u0:r,u1:o,o:n,o_b:s,m1:i,m2:c,m3:l,m4:d,b1:h,b1_b:y,b3:b,b4:T,b5:_,sign:S,m1_b:a,m3_b:p,m4_b:f,b1_stone:E,m1_stone:C}),xDepth:100,yDepth:30,factor:20,xLimit:20,yLimit:20,drag:!0,perspective:1e3})}
        ></move-3d>
    </div>`};var j_=()=>ce.mq("min","desktop"),z_="#home",mp=null;m.afterRouteChange(({currentRoute:e})=>{e!=="onlyDesktop"&&(mp=m.getActiveParams(),z_=e)});var H_=({onMount:e,getProxi:t,bindEffect:r,watch:o})=>{let n=t();return n.active=j_(),e(()=>{let s=u.useResize(()=>{n.active=j_()});return o(()=>n.active,i=>{i&&m.loadUrl({url:z_,params:mp??{}})}),()=>{s(),mp=null}}),g`
        <a
            href="#home"
            class="l-only-desktop__link"
            ${r({toggleClass:{active:()=>n.active}})}
        >
            home page
        </a>
    `};var U_=m.createComponent({tag:"only-desktop-cta",component:H_,state:{active:()=>({value:!1,type:Boolean,skipEqual:!1})}});m.useComponent([U_]);var G_=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob-only-desktop.svg?v=0.1"}),{data:t}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return g`
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
    `};var dp=({canvas:e,disableOffcanvas:t})=>{let{useOffscreen:r,context:o}=Tt({disableOffcanvas:t}),n=!0,s=e.getContext(o,{alpha:!0}),i=m.getActiveRoute(),{offscreen:a,offScreenCtx:c}=St({useOffscreen:r,canvas:e}),l=r?c:s,p=Kn(l);l=null,e.width=e.clientWidth,e.height=e.clientHeight;let d=10,f=10,h=window.innerHeight/18,y=window.innerHeight/18,T=yo({canvas:e,numberOfRow:d,numberOfColumn:f,cellWidth:h,cellHeight:y,gutter:1}).items,_=T.map(A=>({...A,scale:1,rotate:0})),S=({row:A,col:x})=>{let N=(f+1)*A;return _[N+x]},C={...S({row:1,col:1}),scale:1,rotate:0},I={...S({row:4,col:5}),scale:1,rotate:0},P=H.createTimeTween({ease:"easeInOutQuad",stagger:{each:10,from:"edges"},data:{scale:1,rotate:0}}),k=H.createTimeTween({data:C,duration:1e3,ease:"easeInOutBack"}),O=H.createSpring({data:I});_.forEach(A=>{P.subscribeCache(A,({scale:x,rotate:N})=>{A.rotate=N,A.scale=x})}),k.subscribe(A=>{C=A}),O.subscribe(A=>{I=A});let L=Ie.createAsyncTimeline({repeat:-1,autoSet:!1,yoyo:!0});L.goTo(P,{scale:.2,rotate:90},{duration:1e3});let D=Ie.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1});D.goTo(k,{x:S({row:1,col:8}).x,rotate:360,scale:2}).createGroup({waitComplete:!1}).goTo(k,{y:S({row:8,col:8}).y,rotate:180}).goTo(O,{y:S({row:0,col:8}).y},{delay:500}).closeGroup().label({name:"my-label"}).createGroup({waitComplete:!1}).goTo(k,{x:S({row:8,col:1}).x,rotate:0,scale:1}).goTo(O,{rotate:360,scale:2},{delay:0}).closeGroup().createGroup({waitComplete:!1}).goTo(k,{y:S({row:1,col:1}).y,rotate:-180},{duration:1e3}).goTo(O,{rotate:0,y:S({row:8,col:8}).y,scale:1},{delay:200}).closeGroup();let F=()=>{if(!s)return;r&&a&&(a.width=e.width,a.height=e.height);let A=r?c:s;if(A){e.width=e.width,_.forEach(({x,y:N,width:$,height:B,rotate:V,scale:K,offsetXCenter:ue,offsetYCenter:ge},ee)=>{if(ee===40){let Pe=Math.PI/180*C.rotate,Be=Math.cos(Pe)*C.scale,q=Math.sin(Pe)*C.scale;A.setTransform(Be,q,-q,Be,Math.floor(C.offsetXCenter+C.x),Math.floor(C.offsetYCenter+C.y)),p?(A.beginPath(),A.roundRect(Math.floor(-C.width/2),Math.floor(-C.height/2),Math.floor(C.width),C.height,5)):(A.beginPath(),A.rect(Math.floor(-C.width/2),Math.floor(-C.height/2),Math.floor(C.width),Math.floor(C.height))),A.fillStyle="#000000",A.fill()}let me=Math.PI/180*V,pe=Math.cos(me)*K,ve=Math.sin(me)*K;A.setTransform(pe,ve,-ve,pe,Math.floor(ue+x),Math.floor(ge+N)),p?(A.beginPath(),A.roundRect(Math.floor(-$/2),Math.floor(-B/2),$,B,5)):(A.beginPath(),A.rect(Math.floor(-$/2),Math.floor(-B/2),$,B)),A.fillStyle="rgba(238, 238, 238, 0.9)",A.fill()});{let x=Math.PI/180*I.rotate,N=Math.cos(x)*I.scale,$=Math.sin(x)*I.scale;A.setTransform(N,$,-$,N,Math.floor(I.offsetXCenter+I.x),Math.floor(I.offsetYCenter+I.y)),p?(A.beginPath(),A.roundRect(Math.floor(-I.width/2),Math.floor(-I.height/2),Math.floor(I.width),Math.floor(I.height),5)):(A.beginPath(),A.rect(Math.floor(-I.width/2),Math.floor(-I.height/2),Math.floor(I.width),Math.floor(I.height))),A.fillStyle="#a86464",A.fill()}_t({useOffscreen:r,offscreen:a,ctx:s})}},w=()=>{F(),n&&u.useNextFrame(()=>w())};u.useFrame(()=>{w()});let R=X.watch("navigationIsOpen",u.useDebounce(A=>{if(A){D.pause(),L.pause(),n=!1;return}setTimeout(async()=>{m.getActiveRoute().route===i.route&&(D.resume(),L.resume(),n=!0,u.useFrame(()=>w()))},200)},200));return{destroy:()=>{R(),s=null,a=null,c=null,T=[],n=!1,P?.destroy?.(),k?.destroy?.(),O?.destroy?.(),D?.destroy?.(),L?.destroy?.(),_=null,C=null,I=null,o=null,P=null,k=null,O=null,D=null,L=null},play:()=>{D.play(),L.isActive()||L.play()},playReverse:()=>{D.playReverse(),L.isActive()||L.play()},playFromLabel:()=>{D.setTween("my-label",[k,O]).then(()=>{D.playFrom("my-label").then(()=>{console.log("resolve promise playFrom")})}),L.isActive()||L.play()},playFromLabelReverse:()=>{D.setTween("my-label",[k,O]).then(()=>{D.playFromReverse("my-label").then(()=>{console.log("resolve promise playFrom")})}),L.isActive()||L.play()},revertNext:()=>{D.reverseNext()},pause:()=>{D.pause(),L.pause()},resume:()=>{D.resume(),L.resume()},stop:()=>{D.stop(),L.stop()}}};function yk({buttons:e}){return Object.entries(e).map(([t,r])=>{let{label:o}=r;return g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn ${t}"
                >
                    ${o}
                </button>
            </li>`}).join("")}var q_=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s,delegateEvents:i})=>{let a=s();document.body.style.background=yt;let c={},l=()=>{};return e(({element:p})=>{let{canvas:d}=o();c=dp({canvas:d,...t()}),l=c.destroy;let f=u.useResize(()=>{l(),c=dp({canvas:d,...t()}),l=c.destroy,c?.play?.()});return Object.entries(a.buttons).forEach(([h,y])=>{let{method:b}=y;p.querySelector(`.${h}`)?.addEventListener("click",()=>c?.[b]())}),u.useFrame(()=>{a.isMounted=!0}),c?.play?.(),()=>{f(),l(),document.body.style.background=""}}),g`
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
                        ${yk({buttons:a.buttons})}
                    </ul>
                    <canvas ${r("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var Tk={"js-async-timeline-play":{label:"play",method:"play"},"js-async-timeline-playReverse":{label:"play reverse",method:"playReverse"},"js-async-timeline-play-label":{label:"play from label",method:"playFromLabel"},"js-async-timeline-playReverse-label":{label:"play from label reverse",method:"playFromLabelReverse"},"js-async-timeline-pause":{label:"pause",method:"pause"},"js-async-timeline-resume":{label:"resume",method:"resume"},"js-async-timeline-revert-next":{label:"revert next",method:"revertNext"},"js-async-timeline-stop":{label:"stop",method:"stop"}},J_=m.createComponent({tag:"async-timeline",component:q_,props:{background:"",disableOffcanvas:()=>({value:!!(ft()||ht()),type:Boolean})},state:{isMounted:!1,controlsActive:()=>({value:!1,type:Boolean}),buttons:()=>({value:Tk,type:"Any"})}});m.useComponent([J_]);var Y_=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"#caterpillarN2",nextRoute:"#animatedPatternN0?version=0&activeId=0",backRoute:"#canvas-overview"}),Ee("<strong>Canvas</strong>: TimeTween Spring & AsyncTimeline"),g`<div class="l-padding">
        <async-timeline
            ${m.staticProps({background:e})}
        ></async-timeline>
    </div>`};var X_=({letter_d:e,letter_p:t,letter_r:r,letter_r_shadow:o,letter_d_shadow:n,letter_p_shadow:s,letter_r_pieces:i,letter_d_pieces:a,letter_p_pieces:c,letter_r_fill:l,letter_d_fill:p,letter_p_fill:d})=>[{props:{id:0,depth:200,anchorPoint:"center",classList:"",animate:!0},children:[{props:{id:0,depth:100,offsetX:"-2",offsetY:"-2",anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:e}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:n}}},children:[]},{props:{id:0,depth:40,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:a}}},children:[]},{props:{id:0,depth:100,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:p}}},children:[]},{props:{id:0,depth:-100,initialDepth:-1,offsetX:"-10",anchorPoint:"right",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:r}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:o}}},children:[]},{props:{id:0,depth:20,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:i}}},children:[]},{props:{id:0,depth:30,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:l}}},children:[]}]},{props:{id:0,depth:-100,initialDepth:-1,offsetX:"-10",anchorPoint:"right",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:t}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:s}}},children:[]},{props:{id:0,depth:20,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:c}}},children:[]},{props:{id:0,depth:30,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:d}}},children:[]}]}]}]}];m.useComponent([rs,os,Mc]);var K_=async()=>{let{data:e}=await te({source:"./asset/svg/rdp.svg?v=0.4"}),{data:t}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"}),[r,o,n,s,i,a,c,l,p,d,f,h]=["letter_d","letter_r","letter_p","letter_r_shadow","letter_d_shadow","letter_p_shadow","letter_r_pieces","letter_d_pieces","letter_p_pieces","letter_r_fill","letter_d_fill","letter_p_fill"].map(b=>ns({svg:e,id:b}));return xe({active:!0,prevRoute:"",nextRoute:"#mob-01",backRoute:"#svg-overview"}),Ee("<strong>Svg</strong>: RDP lettering"),g`<div class="l-rdp-01">
        <div class="background-shape">${t}</div>
        <mouse-trail></mouse-trail>
        <move-3d
            ${m.staticProps({shape:X_({letter_d:r,letter_r:o,letter_p:n,letter_r_shadow:s,letter_d_shadow:i,letter_p_shadow:a,letter_r_pieces:c,letter_d_pieces:l,letter_p_pieces:p,letter_r_fill:d,letter_d_fill:f,letter_p_fill:h}),xDepth:100,yDepth:30,factor:20,xLimit:20,yLimit:20,drag:!0,perspective:1e3})}
        ></move-3d>
    </div>`};var Q_=({screenElement:e,scrollerElement:t,layer02:r})=>{let o=Ye.createParallax({item:r,align:"center",range:8,propierties:"x",ease:!1}),n=new Et({screen:e,scroller:t,direction:"horizontal",drag:!0,useHorizontalScroll:!0,easeType:"lerp",breakpoint:"small",children:[o]});return n.init(),n.set(55),{destroy:()=>{n.destroy(),o.destroy(),n=null,o=null}}};var Z_=({getState:e,onMount:t,setRef:r,getRef:o})=>{let{layer02:n,layer03:s}=e();return t(()=>{let{screen:i,scroller:a,layer02:c}=o(),{destroy:l}=Q_({screenElement:i,scrollerElement:a,layer02:c});return()=>{l()}}),g`<div class="mobbu2025">
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
    </div>`};var ex=m.createComponent({tag:"mobbu-2025",component:Z_,props:{layer02:()=>({value:"",type:String}),layer03:()=>({value:"",type:String})}});m.useComponent([ex]);var tx=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob-2025-pure.svg?v=0.9"}),{data:t}=await te({source:"./asset/svg/lettering-mob.svg?v=1.4"}),[r,o]=["layer-02","layer-03"].map(s=>ns({svg:e,id:s}));return xe({active:!0,prevRoute:"#mob-01",nextRoute:"",backRoute:"#svg-overview"}),Ee("<strong>Svg</strong>: Mobbu2025 parallax"),g`<div class="l-mob-02">
        <div class="background-shape">${t}</div>
        <h3 class="l-mob-02__title">Scroll or Drag</h3>
        <mobbu-2025
            ${_a({layer02:r,layer03:o})}
        ></mobbu-2025>
    </div>`};var rx="TOP-LEFT",ox="TOP-RIGHT",nx="BOTTOM-LEFT",sx="BOTTOM-RIGHT",ix="CENTER";var Sk=e=>{let r=globalThis.getComputedStyle(e).transform;if(r==="none")return 0;let o=r.match(/matrix3d\(([^)]+)\)/);return o&&o[1].split(",").map(Number)[14]||0},ax=({align:e,root:t,child:r,containerClass:o,childrenClass:n,perspective:s,usePrespective:i,maxLowDepth:a=-200,maxHightDepth:c=200,onDepthChange:l=()=>{},depthFactor:p=30,hideThreshold:d=1})=>{let f=document.querySelector(o);f&&(f.style.cursor="grab");let h=[...f.querySelectorAll(n)],y=h.map(q=>{let Te=window.innerWidth,De=window.innerHeight,pt=q.offsetWidth,wt=q.offsetHeight,Ke=Sk(q),ls=s-s*pt/(Te*d)-Ke,Vr=s-s*wt/(De*d)-Ke;return Math.min(ls,Vr)}),b=()=>{h.forEach((q,Te)=>{let De=S>y[Te];q.classList.toggle("hide",De)})},T=0,_=0,S=0,E=0,C=0,M=r.offsetWidth,I=r.offsetHeight,P=t.offsetWidth,k=t.offsetHeight,O=(M-P)/2,L=(I-k)/2,D={x:0,y:0},F=!1,w=!1,R=30,A=()=>{if(i&&s>0){let q=s/(s-S);O=(M-P/q)/2,L=(I-k/q)/2}else O=(M-P)/2,L=(I-k)/2};A();let x={xValue:0,yValue:0},N=H.createSpring({data:{x:0,y:0,z:0}});switch(e){case rx:{x={xValue:O,yValue:L},_=M,T=I;break}case ox:{x={xValue:-O,yValue:L},_=-M,T=I;break}case nx:{x={xValue:O,yValue:-L},_=M,T=-I;break}case sx:{x={xValue:-O,yValue:-L},_=-M,T=-I;break}}let $=N.subscribe(({x:q,y:Te,z:De})=>{r&&(r.style.transform=`translate3D(${q}px, ${Te}px, ${De}px)`)});N.set({x:x.xValue,y:x.yValue}),[...t.querySelectorAll("a, button")].forEach(q=>{q.setAttribute("draggable","false"),q.style.userSelect="none"});let V=({page:q})=>{F=!0,w=!0,D={x:q.x,y:q.y}},K=({page:q})=>{let{x:Te,y:De}=q,{xgap:pt,ygap:wt}=F?w?(w=!1,{xgap:0,ygap:0}):{xgap:Te-E,ygap:De-C}:{xgap:0,ygap:0},Ke=O>0?ce.clamp(_+pt,-O,O):ce.clamp(_+pt,O,-O),ls=L>0?ce.clamp(T+wt,-L,L):ce.clamp(T+wt,L,-L),Vr=F?Ke:_,Y=F?ls:T,{xComputed:us,yComputed:He}=F?{xComputed:Vr,yComputed:Y}:{xComputed:Te,yComputed:De};_=Vr,T=Y,E=Te,C=De,F&&(x={xValue:us,yValue:He},N.goTo({x:us,y:He}).catch(()=>{}))},ue=u.useTouchStart(({page:q,target:Te})=>{V({page:q,target:Te})}),ge=u.useMouseDown(({page:q,target:Te})=>{V({page:q,target:Te})}),ee=u.useTouchEnd(()=>{F=!1}),me=u.useMouseUp(()=>{F=!1}),pe=u.useMouseMove(({page:q})=>{K({page:q})}),ve=u.useTouchMove(({page:q})=>{K({page:q})});f&&f.addEventListener("click",q=>{let{x:Te,y:De}=D,pt=Math.abs(E-Te)>R,wt=Math.abs(C-De)>R;(pt||wt)&&q.preventDefault()},!1),i&&f&&f.addEventListener("wheel",q=>{let{spinY:Te}=u.normalizeWheel(q);S=ce.clamp(S+Te*p,a,c),A(),_=O>0?ce.clamp(_,-O,O):ce.clamp(_,O,-O),T=L>0?ce.clamp(T,-L,L):ce.clamp(T,L,-L),l({depth:S}),N.goTo({x:_,y:T,z:S}).catch(()=>{})},{passive:!0});let Pe=u.useMouseWheel(u.useDebounce(()=>{b()},100)),Be=u.useResize(()=>{M=r.offsetWidth,I=r.offsetHeight,P=t.offsetWidth,k=t.offsetHeight,A()});return{destroy:()=>{$(),ue(),ee(),ge(),me(),pe(),ve(),Be(),Pe(),N.destroy(),N=null,f=null,h=null,t=null,r=null}}};var cx=({getProxi:e,setRef:t,getRef:r,bindEffect:o,onMount:n})=>{let s=e();return n(({element:i})=>{let{child:a}=r(),c=a.firstChild;if(!c)return;let l=ax({align:s.align,root:i,child:c,usePrespective:s.usePrespective,perspective:s.perspective,maxLowDepth:s.maxLowDepth,maxHightDepth:s.maxHightDepth,depthFactor:s.depthFactor,onDepthChange:s.onDepthChange,containerClass:s.containerClass,childrenClass:s.childrenClass,hideThreshold:s.hideThreshold});return s.afterInit({root:i}),()=>{l.destroy(),i.remove(),a.remove(),a=null,c=null,i=null}}),g`<div class="c-dragger ${s.rootClass}">
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
    </div>`};var lx=m.createComponent({tag:"c-dragger",component:cx,props:{rootClass:()=>({value:"",type:String}),childrenClass:()=>({value:"",type:String}),containerClass:()=>({value:"",type:String}),initialZoom:()=>({value:1,type:Number}),ease:()=>({value:!0,type:Boolean}),align:()=>({value:ix,type:String,transform:e=>e.toUpperCase()}),usePrespective:()=>({value:!0,type:Boolean}),perspective:()=>({value:600,type:Number}),hideThreshold:()=>({value:1,type:Number}),depthFactor:()=>({value:30,type:Number}),maxLowDepth:()=>({value:-200,type:Number}),maxHightDepth:()=>({value:200,type:Number}),afterInit:()=>({value:()=>{},type:Function}),onDepthChange:()=>({value:()=>{},type:Function})}});m.useComponent([lx,os]);var ux=!1,px=async()=>{let{data:e}=await te({source:"./asset/svg/ms_nord_compact.svg?v=1.3"}),{data:t}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});xe({active:!0,prevRoute:"#move3D-shape1",nextRoute:"#math-animation-01",backRoute:"#plugin-overview"});let r=g`
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
    </div>`;return Ee("<strong>Dragger</strong>"),g`<div class="l-dragger">
        <div class="background-shape">${t}</div>
        <c-dragger
            ${m.staticProps({rootClass:"dragger-component",containerClass:".l-dragger",childrenClass:".dragger-child",align:"CENTER",maxHightDepth:140,maxLowDepth:-200,perspective:300,hideThreshold:10,afterInit:({root:s})=>{ux&&console.log(s)},onDepthChange:({depth:s})=>{ux&&console.log(s)}})}
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
    </div>`};var mx=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=(ne(t)-100)/2,s=3,i=2*Math.PI*s,a=0,c=(n-a)/i,l=1e3*s,p=e.map(b=>ne(b)/2),d=H.createSequencer({ease:"easeLinear",stagger:{each:6},data:{angleInRadian:0,scale:0}}).goTo({angleInRadian:i},{start:0,end:10,ease:"easeLinear"}).goTo({scale:1},{start:0,end:4,ease:"easeOutQuad"}).goTo({scale:0},{start:9,end:10,ease:"easeOutQuad"});e.forEach((b,T)=>{let _=b.firstChild;d.subscribeCache(b,({angleInRadian:S,scale:E})=>{let C=a+c*S,M=C*Math.cos(S),I=C*Math.sin(S);b.style.transform=`translate3D(0px,0px,0px) translate(${M-p[T]}px, ${I-p[T]}px)`,_&&(_.style.scale=`${E}`)})});let f=Ie.createSyncTimeline({repeat:-1,yoyo:!1,duration:l}).add(d);function h(){if(!o||!r)return;let b=r.width/2,T=r.height/2,_=200;o.clearRect(0,0,r.width,r.height),o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let S=0;S<=_;S++){let E=i/_*S,C=a+c*E,M=b+C*Math.cos(E),I=T+C*Math.sin(E);S===0?o.moveTo(M,I):o.lineTo(M,I)}o.stroke()}let y=u.useResize(()=>{r.width=r.clientWidth,r.height=r.clientHeight,h()});return h(),{play:()=>{f.play()},resume:()=>{f.resume()},stop:()=>{f.pause()},destroy:()=>{f.stop(),d.destroy(),f.destroy(),y(),o=null,d=null,f=null,e=null}}};var dx=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=H.createSpring({stagger:{each:6},data:{x:0}}),s=.06,i=ne(t)/2-100,a=e.map(h=>ne(h)/2);e.forEach((h,y)=>{n.subscribeCache(h,({x:b})=>{let T=Math.sin(b*s)*i,_=Math.cos(b*s)*i;h.style.transform=`translate3D(0px,0px,0px) translate(${T-a[y]}px, ${_-a[y]}px)`})}),n.set({x:0});let c=0,l=!1,p=()=>{let h=60/u.getFps();c+=h,n&&(n.goTo({x:c}).catch(()=>{}),l&&u.useNextFrame(()=>p()))};function d(){if(!o||!r)return;r.width=r.width;let h=r.width/2,y=r.height/2;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath(),o.arc(h,y,i,0,2*Math.PI),o.stroke()}let f=u.useResize(()=>{d()});return d(),{play:()=>{l||(l=!0,p())},resume:()=>{l||(l=!0,p())},stop:()=>{l=!1},destroy:()=>{n.destroy(),f(),o=null,n=null,e=null,c=null,l=null}}};var hx=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=e.map(h=>ne(h)/2),s=Ve(t)/2-100,i=ne(t),a=10,c=a/2/Math.PI,l=H.createSequencer({stagger:{each:5},data:{x:a/4,scale:0},duration:a}).goTo({x:a+a/4},{start:0,end:a,ease:"easeLinear"}).goTo({scale:1},{start:0,end:1.5,ease:"easeOutQuad"}).goTo({scale:0},{start:1.5,end:5,ease:"easeInQuad"}).goTo({scale:1},{start:5,end:8.5,ease:"easeOutQuad"}).goTo({scale:0},{start:8.5,end:10,ease:"easeInQuad"});e.forEach((h,y)=>{let b=h.firstChild;l.subscribeCache(h,({x:T,scale:_})=>{let S=T/c,E=2/(3-Math.cos(2*S)),C=E*Math.cos(S)*s,M=E*Math.sin(2*S)/2*i;h.style.transform=`translate3D(0px,0px,0px) translate(${C-n[y]}px, ${M-n[y]}px)`,b&&(b.style.scale=`${_}`)})});let p=Ie.createSyncTimeline({repeat:-1,yoyo:!1,duration:3e3}).add(l);function d(){if(!o||!r)return;r.width=r.width;let h=r.width/2,y=r.height/2,b=200;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let T=0;T<=b;T++){let _=T/b*2*Math.PI,S=2/(3-Math.cos(2*_)),E=S*Math.cos(_)*s,C=S*Math.sin(2*_)/2*i;T===0?o.moveTo(h+E,y+C):o.lineTo(h+E,y+C)}o.stroke()}let f=u.useResize(()=>{d()});return d(),{play:()=>{p.play()},resume:()=>{p.resume()},stop:()=>{p.pause()},destroy:()=>{p.stop(),l.destroy(),p.destroy(),f(),o=null,l=null,p=null,e=null}}};function _k(e,t,r,o=2e3){let n=0,s=e,i=0;for(let a=1;a<=o;a++){let c=r/o*a,l=e*Math.cos(t*c),p=l*Math.cos(c),d=l*Math.sin(c),f=p-s,h=d-i;n+=Math.hypot(f,h),s=p,i=d}return n}var fx=(e,t)=>t===0?e:fx(t,e%t);function xk(e,t){let r=fx(e,t),o=t/r;return 2*Math.PI*o}var gx=({targets:e,container:t,canvas:r}={},...o)=>{let[n,s,i,a]=o;if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let c=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let l=(ne(t)-100)/2,p=n/s,d=xk(n,s),f=_k(l,p,d),h=i*(f/l),y=e.map(P=>ne(P)/2),b=H.createSequencer({ease:"easeLinear",stagger:{each:a},data:{angleInRadian:0,scale:1}}).goTo({angleInRadian:d},{start:0,end:10,ease:"easeLinear"}),T=[],_=0,S=0;for(;S<d&&d>0&&p>0;)S=(Math.PI/2+_*Math.PI)/p,S>=0&&T.push(S),_++;let E=0;T.forEach(P=>{let k=P/d*10,O=Math.abs((k-E)/2);E=k;let L=Math.max(0,k-O),D=k,F=Math.min(10,k+O);F>L&&(b.goTo({scale:0},{start:L,end:D,ease:"easeInQuad"}),b.goTo({scale:1},{start:D,end:F,ease:"easeOutQuad"}))}),e.forEach((P,k)=>{let O=P.firstChild;b.subscribeCache(P,({angleInRadian:L,scale:D})=>{let F=l*Math.cos(p*L),w=F*Math.cos(L),R=F*Math.sin(L);P.style.transform=`translate3D(0px,0px,0px) translate(${w-y[k]}px, ${R-y[k]}px)`,O&&(O.style.scale=`${D}`)})});let C=Ie.createSyncTimeline({repeat:-1,yoyo:!1,duration:h}).add(b);function M(){if(!c||!r)return;let P=r.width/2,k=r.height/2,O=2e3*s;c.clearRect(0,0,r.width,r.height),c.setLineDash([3,7]),c.lineDashOffset=3,c.strokeStyle="rgba(0, 0, 0, 0.5)",c.lineWidth=1,c.beginPath();for(let L=0;L<=O;L++){let D=d/O*L,F=l*Math.cos(p*D),w=P+F*Math.cos(D),R=k+F*Math.sin(D);L===0?c.moveTo(w,R):c.lineTo(w,R)}c.stroke()}let I=u.useResize(()=>{r.width=r.clientWidth,r.height=r.clientHeight,M()});return M(),{play:()=>{C.play()},resume:()=>{C.resume()},stop:()=>{C.pause()},destroy:()=>{C.stop(),b.destroy(),C.destroy(),I(),c=null,b=null,C=null,e=null}}};var bx=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=Ve(t)-200,s=ne(t)/3,i=2,a=n/(2*Math.PI*i),c=1500*i,l=e.map(y=>ne(y)/2),p=H.createSequencer({ease:"easeLinear",stagger:{each:6},data:{x:0,scale:0}}).goTo({x:n},{start:0,end:10,ease:"easeLinear"}).goTo({scale:1},{start:0,end:10/i/2,ease:"easeOutQuad"}).goTo({scale:0},{start:10-10/i/2,end:10,ease:"easeOutQuad"});e.forEach((y,b)=>{let T=0,_=y.firstChild,S=-l[b]-n/2;p.subscribeCache(y,({x:E,scale:C})=>{let M=Math.sign(E-T)||1,I=Math.sin(E/a)*s*M;y.style.transform=`translate3D(0px,0px,0px) translate(${E+S}px, ${I-l[b]}px)`,_&&(_.style.scale=`${C}`),T=E})});let d=Ie.createSyncTimeline({repeat:-1,yoyo:!0,duration:c}).add(p);function f(){if(!o||!r)return;r.width=r.width;let y=r.width/2,b=r.height/2,T=200,_=T*2;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let S=0;S<=_;S++){let{x:E,y:C}=(()=>{if(S<=T){let M=S/T*n,I=Math.sin(M/a)*s;return{x:M,y:I}}if(S>T){let I=(_-S)/T*n,P=Math.sin(I/a)*s*-1;return{x:I,y:P}}return{x:0,y:0}})();S===0?o.moveTo(y+E-n/2,b+C):o.lineTo(y+E-n/2,b+C)}o.stroke()}let h=u.useResize(()=>{f()});return f(),{play:()=>{d.play()},resume:()=>{d.resume()},stop:()=>{d.pause()},destroy:()=>{d.stop(),p.destroy(),d.destroy(),h(),o=null,p=null,d=null,e=null}}};var hp={sin:bx,circle:dx,infinite:hx,archimede:mx,rosaDiGrandi:gx};var vx=()=>({play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}});var yx=({getProxi:e,setRef:t,getRef:r,getRefs:o,delegateEvents:n,onMount:s})=>{let i=e(),a=i.showNavigation?"active":"",c=3,l=c/i.numberOfStaggers,p=Array.from({length:i.numberOfStaggers}).map((T,_)=>({size:c-l*_,opacity:1/_})),d=vx(),{destroy:f,play:h,stop:y,resume:b}=d;return s(({element:T})=>{let{target:_}=o(),{canvas:S}=r();u.useFrame(()=>{({destroy:f,play:h,stop:y,resume:b}=hp[i.name]({targets:_,container:T,canvas:S},...i.args)),h()});let E=u.useResize(()=>{y(),f(),{destroy:f,play:h,stop:y,resume:b}=hp[i.name]({targets:_,container:T,canvas:S},...i.args),h()});return()=>{f(),E(),f=null,h=null,y=null,b=null}}),g`<div class="c-math">
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
                ${n({click:()=>{y()}})}
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
    </div>`};var kc=m.createComponent({tag:"math-animation",component:yx,props:{name:()=>({value:"",type:String}),showNavigation:()=>({value:!0,type:Boolean}),numberOfStaggers:()=>({value:5,type:Number}),args:()=>({value:[],type:Array})}});m.useComponent([kc]);var Tx=async({props:e})=>{let{names:t}=e;return t.length>4&&console.warn("math layout, max item excedded"),xe({active:!0,prevRoute:"#plugin-dragger",nextRoute:"#rosa-di-grandi",backRoute:"#plugin-overview"}),Ee("<strong>Math:</strong> trigonometry based animation"),g`<div class="l-math">
        ${t.map(o=>g`<div class="l-math__item">
                    <math-animation
                        ${m.staticProps({name:o})}
                    ></math-animation>
                </div>`).join("")}
    </div>`};var Ck=({proxi:e,delegateEvents:t,bindObject:r})=>g`
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
    `,Sx=({getProxi:e,delegateEvents:t,invalidate:r,bindEffect:o,getRef:n,setRef:s,bindObject:i})=>{let a=e();return g`<div class="l-rosa">
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
            ${Ck({proxi:a,getRef:n,setRef:s,delegateEvents:t,bindObject:i})}
        </ul>
        <div class="l-rosa__wrap">
            ${r({observe:[()=>a.numerators,()=>a.denominator],render:()=>g`
                        <math-animation
                            ${m.staticProps({name:"rosaDiGrandi",showNavigation:!1,numberOfStaggers:10,args:[a.numerators,a.denominator,a.duration,a.staggerEach]})}
                        ></math-animation>
                    `})}
        </div>
    </div>`};var _x=m.createComponent({tag:"rosa-di-grandi-page",component:Sx,state:{numerators:()=>({value:2,type:Number}),denominator:()=>({value:3,type:Number}),numeratorsLabel:()=>({value:2,type:Number}),denominatorLabel:()=>({value:3,type:Number}),duration:()=>({value:500,type:Number}),staggerEach:()=>({value:4,type:Number}),controlsActive:()=>({value:!1,type:Boolean})},child:[kc]});m.useComponent([_x]);var xx=async()=>(xe({active:!0,prevRoute:"#math-animation-01",nextRoute:"",backRoute:"#plugin-overview"}),Ee("<strong>Rosa di Grandi</strong>"),g`<rosa-di-grandi-page></rosa-di-grandi-page>`);var gp="home",Nc="about",Q="template-mobJs-component",Ne="template-doc-default",ss="template-listing",ut="template-animation",xt="template-test",Pc=new Set([Q,Ne]),se=[{url:"./#mobJs-overview",title:"mobJs"},{url:"./#mobJs-component",title:"component"}],Xe=[{url:"./#mobJs-overview",title:"mobJs"}],fp=[{url:"./#mobCore-overview",title:"mobCore"}],Br=[{url:"./#mobMotion-overview",title:"mobMotion"}],Rc=[{label:"store",url:"#mobCore-store"},{label:"events",url:"#mobCore-events"},{label:"defaults",url:"#mobCore-defaults"}],J=[{label:"initialization",url:"#mobJs-initialization"},{label:"component",url:"#mobJs-component"},{label:"routing",url:"#mobJs-routing"},{label:"tick",url:"#mobJs-tick"},{label:"memory management",url:"#mobJs-memory-management"},{label:"utils",url:"#mobJs-utils"},{label:"debug",url:"#mobJs-debug"}],fr=[{label:"tween/spring/lerp",url:"#mobMotion-tween-spring-lerp"},{label:"AsyncTimeline",url:"#mobMotion-async-timeline"},{label:"sequencer",url:"#mobMotion-sequencer"},{label:"SyncTimeline",url:"#mobMotion-sync-timeline"},{label:"CreateStagger",url:"#mobMotion-create-stagger"},{label:"ScrollTrigger",url:"#mobMotion-scrolltrigger"},{label:"Parallax",url:"#mobMotion-parallax"},{label:"Stagger",url:"#mobMotion-stagger"},{label:"Default",url:"#mobMotion-defaults"}],Ac=[{hash:"pageNotFound",layout:Ay,props:{}},{hash:"onlyDesktop",layout:G_,props:{}},{hash:"about",layout:jT,templateName:Nc,props:{}},{hash:"canvas-overview",layout:Za,templateName:ss,props:{source:"./data/canvas/data.json"}},{hash:"animatedPatternN0",layout:uS,templateName:ut,props:{}},{hash:"animatedPatternN1",layout:hS,templateName:ut,props:{}},{hash:"caterpillarN1",layout:vS,templateName:ut,props:{}},{hash:"caterpillarN2",layout:_S,templateName:ut,props:{}},{hash:"async-timeline",layout:Y_,templateName:ut,props:{}},{hash:"scrollerN0",layout:wS,templateName:ut,props:{}},{hash:"scrollerN1",layout:RS,templateName:ut,props:{}},{hash:"dynamic-list",layout:JS,templateName:xt,skipTransition:!0,props:{source:"./data/mob-js/general-repeat-test.json",breadCrumbs:Xe,title:"( test ) repeat & invalidate",section:"mobJs"}},{hash:"matrioska-repeat",layout:p_,templateName:xt,skipTransition:!0,props:{source:"./data/mob-js/matrioska.json",breadCrumbs:Xe,title:"( test ) matrioska repeat",section:"mobJs"}},{hash:"matrioska-invalidate",layout:m_,templateName:xt,skipTransition:!0,props:{source:"./data/mob-js/matrioska.json",breadCrumbs:Xe,title:"( test ) matrioska invalidate",section:"mobJs"}},{hash:"home",layout:QS,templateName:gp,props:{}},{hash:"mobCore-overview",layout:Le,skipTransition:!0,templateName:Ne,props:{source:"./data/mob-core/overview.json",title:"mobCore",breadCrumbs:[],section:"mobCore",rightSidebar:Rc}},{hash:"mobCore-defaults",layout:Le,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-core/defaults.json",title:"Defaults",breadCrumbs:fp,section:"mobCore",rightSidebar:Rc}},{hash:"mobCore-events",layout:Le,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-core/events.json",title:"Events",breadCrumbs:fp,section:"mobCore",rightSidebar:Rc}},{hash:"mobCore-store",layout:Le,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-core/store.json",title:"Store",breadCrumbs:fp,section:"mobCore",rightSidebar:Rc}},{hash:"mobJs-overview",layout:Le,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/overview.json",title:"mobJs",breadCrumbs:[],section:"mobJs",rightSidebar:J}},{hash:"mobJs-initialization",layout:Le,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/initialization.json",title:"initialization",breadCrumbs:Xe,section:"mobJs",rightSidebar:J}},{hash:"mobJs-component",layout:Le,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/component.json",title:"component",breadCrumbs:Xe,section:"mobJs",rightSidebar:J}},{hash:"mobJs-routing",layout:Le,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/routing.json",title:"routing",breadCrumbs:Xe,section:"mobJs",rightSidebar:J}},{hash:"mobJs-benchmark-invalidate",layout:Fr,templateName:xt,skipTransition:!0,props:{rootComponent:"benchmark-invalidate",breadCrumbs:Xe,source:"./data/mob-js/benchmark-invalidate.json",title:"( test ) benchmark invalidate",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-key",layout:Fr,templateName:xt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-key",breadCrumbs:Xe,source:"./data/mob-js/benchmark-repeat-without-key.json",title:"( test ) benchmark repeat without key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key",layout:Fr,templateName:xt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key",breadCrumbs:Xe,source:"./data/mob-js/benchmark-repeat-key.json",title:"( test ) benchmark repeat key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-component-no-key",layout:Fr,templateName:xt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-component-no-key",breadCrumbs:Xe,source:"./data/mob-js/benchmark-repeat-no-component-no-key.json",title:"( test ) benchmark repeat no component no key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-component-with-key",layout:Fr,templateName:xt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-component-with-key",breadCrumbs:Xe,source:"./data/mob-js/benchmark-repeat-no-component-with-key.json",title:"( test ) benchmark repeat no component with key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-key-nested",layout:Fr,templateName:xt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key-no-nested",breadCrumbs:Xe,source:"./data/mob-js/benchmark-repeat-without-key-nested.json",title:"( test ) benchmark repeat nested without key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key-nested",layout:Fr,templateName:xt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key-nested",breadCrumbs:Xe,source:"./data/mob-js/benchmark-repeat-key-nested.json",title:"( test ) benchmark repeat nested with key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key-bind-store",layout:Fr,templateName:xt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-key-bind-store",breadCrumbs:Xe,source:"./data/mob-js/benchmark-repeat-external.json",title:"( test ) benchmark repeat bindStore",section:"mobJs"}},{hash:"mobJs-tick",layout:Le,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/tick.json",title:"tick",breadCrumbs:Xe,section:"mobJs",rightSidebar:J}},{hash:"mobJs-utils",layout:Le,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/utils.json",title:"utils",breadCrumbs:Xe,section:"mobJs",rightSidebar:J}},{hash:"mobJs-memory-management",layout:Le,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/memory-management.json",title:"memory management",breadCrumbs:Xe,section:"mobJs",rightSidebar:J}},{hash:"mobJs-debug",layout:Le,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/debug.json",title:"debug",breadCrumbs:Xe,section:"mobJs",rightSidebar:J}},{hash:"mobJs-onMount",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/on-mount.json",title:"onMount",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-getState",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/get-state.json",title:"getState",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-setState",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/set-state.json",title:"setState",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-updateState",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/update-state.json",title:"updateState",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-getProxi",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/get-proxi.json",title:"getProxi",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-watch",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/watch.json",title:"watch",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-staticProps",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/static-props.json",title:"staticProps",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-dataAttribute",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/data-attribute.json",title:"dataAttribute",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-bindProps",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/bind-props.json",title:"bindProps",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-bindEvents",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/bind-events.json",title:"bindEvents",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-delegateEvents",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/delegate-events.json",title:"delegateEvents",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-bindtext",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/bind-text.json",title:"bindText",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-bindObject",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/bind-object.json",title:"bindObject",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-bind-effect",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/bind-effect.json",title:"bindEffect",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-methods",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/methods.json",title:"add methods",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-useMethodByName",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/use-method-by-name.json",title:"useMethodByName",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-useMethodArrayByName",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/use-method-array-by-name.json",title:"useMethodArrayByName",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-setStateByName",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/set-state-by-name.json",title:"setStateByName",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-updateStateByName",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/update-state-by-name.json",title:"updateStateByName",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-refs",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/refs.json",title:"refs",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-runtime",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/runtime.json",title:"renderComponent",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-repeat",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/repeat.json",title:"repeat",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-invalidate",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/invalidate.json",title:"invalidate",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-invalidate-vs-repeater",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/invalidate-vs-repeater.json",title:"invalidate vs repeater",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-web-component",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/web-component.json",title:"webComponent",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-slot",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/slot.json",title:"slot",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-unBind",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/unbind.json",title:"unBind",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-emit",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/emit.json",title:"emit",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-emitAsync",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/emit-async.json",title:"emitAsync",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-computed",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/computed.json",title:"computed",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-bindStore",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/bind-store.json",title:"bindStore",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-removeDom",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/remove-dom.json",title:"removeDom",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-remove",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/remove.json",title:"remove",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-getChildren",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/get-children.json",title:"getChildren",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-freezeProp",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/freeze-prop.json",title:"freezeProp",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-unFreezeProp",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/unfreeze-prop.json",title:"unFreezeProp",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-getParentId",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/get-parent-id.json",title:"getParentId",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-watchParent",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/watch-parent.json",title:"watchParent",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-instanceName",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/instance-name.json",title:"instanceName",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-class-list",templateName:Q,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/class-list.json",title:"classList",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobMotion-stagger",layout:Le,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/stagger.json",title:"Stagger",breadCrumbs:Br,section:"mobMotion",rightSidebar:fr}},{hash:"mobMotion-defaults",layout:Le,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/defaults.json",title:"Defaults",breadCrumbs:Br,section:"mobMotion",rightSidebar:fr}},{hash:"mobMotion-overview",layout:Le,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/overview.json",title:"mobMotion",breadCrumbs:[],section:"mobMotion",rightSidebar:fr}},{hash:"mobMotion-parallax",layout:Le,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/parallax.json",title:"Parallax",breadCrumbs:Br,section:"mobMotion",rightSidebar:fr}},{hash:"mobMotion-sequencer",layout:Le,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/sequencer.json",title:"Sequencer",breadCrumbs:Br,section:"mobMotion",rightSidebar:fr}},{hash:"mobMotion-scrolltrigger",layout:Le,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/scroll-trigger.json",title:"ScrollTrigger",breadCrumbs:Br,section:"mobMotion",rightSidebar:fr}},{hash:"mobMotion-sync-timeline",layout:Le,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/sync-timeline.json",title:"Synctimeline",breadCrumbs:Br,section:"mobMotion",rightSidebar:fr}},{hash:"mobMotion-create-stagger",layout:Le,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/create-stagger.json",title:"CreateStagger",breadCrumbs:Br,section:"mobMotion",rightSidebar:fr}},{hash:"mobMotion-async-timeline",layout:Le,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/async-timeline.json",title:"Asynctimeline",breadCrumbs:Br,section:"mobMotion",rightSidebar:fr}},{hash:"mobMotion-tween-spring-lerp",layout:Le,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/tween-spring-lerp.json",title:"TimeTween Spring Lerp",breadCrumbs:Br,section:"mobMotion",rightSidebar:fr}},{hash:"horizontalScroller",layout:x_,templateName:ut,restoreScroll:!1,props:{source:"./data/plugin/horizontal-scroller.json",title:"HorizontalScroller"}},{hash:"move3D-shape1",templateName:ut,layout:O_,props:L_.shape1},{hash:"plugin-dragger",layout:px,templateName:ut,props:{}},{hash:"math-animation-01",layout:Tx,templateName:ut,props:{names:["circle","sin","infinite","archimede"]}},{hash:"rosa-di-grandi",layout:xx,templateName:ut,props:{}},{hash:"plugin-overview",layout:Za,templateName:ss,props:{source:"./data/plugin/data.json"}},{hash:"svg-overview",layout:Za,templateName:ss,props:{source:"./data/svg/data.json"}},{hash:"mob-01",layout:W_,templateName:ut,props:{}},{hash:"mob-02",layout:tx,templateName:ut,props:{}},{hash:"rdp-01",layout:K_,templateName:ut,props:{}}];var Cx=0;m.beforeRouteChange(()=>{Cx=window.scrollY});var Ek=new Set([Q,Ne,ss,Nc,xt]),wk=new Set([Q,Ne,ss,Nc,gp,xt]),Ex=async({oldNode:e,oldTemplateName:t})=>{e.classList.remove("current-route"),e.classList.add("fake-content"),e.style.position="fixed",e.style.zIndex="10",e.style.top=Ek.has(t)?"var(--header-height)":"0",e.style.left=wk.has(t)?"calc(var(--header-height)/2)":"0",e.style.right="0",e.style.transform=`translateY(-${Cx}px)`,e.style.minHeight="calc(100vh - var(--header-height) - var(--footer-height))"},wx=async({oldNode:e,newNode:t,oldRoute:r,newRoute:o})=>{if(r===o)return;let n=m.getRoot();n.style.pointerEvents="none",t.style.opacity="0";let s=H.createTimeTween({data:{opacity:1},duration:200}),i=H.createTimeTween({data:{opacity:0},duration:300});s.subscribe(({opacity:c})=>{e.style.opacity=c}),i.subscribe(({opacity:c})=>{t.style.opacity=c});let a=Ie.createAsyncTimeline({repeat:1}).createGroup({waitComplete:!0}).goTo(s,{opacity:0}).goTo(i,{opacity:1}).closeGroup();await a.play(),a.destroy(),a=null,t.style.removeProperty("opacity"),t.classList.add("current-route"),u.useFrameIndex(()=>{n.style.pointerEvents=""},10)};var Ix=()=>{let e=window.innerWidth-document.documentElement.clientWidth;document.documentElement.style.setProperty("--scrollbar-with",`${e}px`)},Mx=()=>{Ix(),u.useResize(()=>{Ix()})};var kx=({getProxi:e,bindEffect:t,bindText:r,watch:o,addMethod:n})=>{let s=e();return n("updateRawContent",i=>{s.rawContent=i.length===0?"":`${i} | <strong>fps: ${u.getInstantFps()}</strong>`}),o(()=>s.rawContent,i=>{let a=i.length>0;if(!a){s.visible=!1,s.content="";return}s.content=`${i}`,a&&(s.visible=!0)},{immediate:!0}),g`<p
        class="animation-description"
        ${t({toggleClass:{visible:()=>s.visible&&!s.navigationIsOpen}})}
    >
        ${r`${"content"}`}
    </p>`};var Rx=m.createComponent({tag:"animation-description",component:kx,bindStore:X,state:{rawContent:()=>({value:"",type:String}),content:()=>({value:"",type:String}),visible:()=>({value:!0,type:Boolean})}});var pi=!0,Ik=({proxi:e,emit:t})=>{e.selectedNodes.forEach(r=>{let o=e.linkedList.find(n=>n.data.id===r);o&&(e.linkedList=e.linkedList.removeNode(o),e.currentNode=null,t(()=>e.currentNode)),o=null}),e.selectedNodes.clear(),t(()=>e.selectedNodes)},Nx=({proxi:e,emit:t,direction:r="up"})=>{e.selectedNodes.forEach(o=>{let n=e.linkedList.find(s=>s.data.id===o);n&&r==="up"&&n?.prev&&e.linkedList.moveBefore(n,n.prev),n&&r==="down"&&n?.next&&e.linkedList.moveAfter(n,n.next),n=null}),t(()=>e.linkedList)},Mk=({proxi:e,emit:t})=>{if(e.selectedNodes.size!==2)return;let r=e.selectedNodes[Symbol.iterator](),o=r.next().value,n=r.next().value,s=e.linkedList.find(a=>a.data.id===o),i=e.linkedList.find(a=>a.data.id===n);!s||!i||(e.linkedList.swap(s,i),t(()=>e.linkedList),s=null,i=null)},kk=({proxi:e,delegateEvents:t,bindEffect:r,emit:o})=>{let n=gt().close,s=gt().previous,i=gt().up,a=gt().swap,c=gt().selectAll;return g`
        <ul class="c-custom-history__nav">
            <li class="c-custom-history__prev">
                <button
                    type="button"
                    ${r({toggleClass:{active:()=>!!(e.currentNode&&e.currentNode?.prev!==null)}})}
                    ${t({click:()=>{m.mainStore.getProp("routeIsLoading")||e.currentNode?.prev&&(pi=!1,e.currentNode=e.currentNode?.prev)}})}
                >
                    ${s}
                </button>
            </li>
            <li class="c-custom-history__next">
                <button
                    type="button"
                    ${r({toggleClass:{active:()=>!!(e.currentNode&&e.currentNode?.next!==null)}})}
                    ${t({click:()=>{m.mainStore.getProp("routeIsLoading")||e.currentNode?.next&&(pi=!1,e.currentNode=e.currentNode?.next)}})}
                >
                    ${s}
                </button>
            </li>
            <li class="c-custom-history__remove">
                <button
                    type="button"
                    ${r({toggleClass:{active:()=>e.selectedNodes.size>0}})}
                    ${t({click:()=>{Ik({proxi:e,emit:o}),e.selectAllOn=!1}})}
                >
                    ${n}
                </button>
            </li>
            <li class="c-custom-history__up">
                <button
                    type="button"
                    ${r({toggleClass:{active:()=>e.selectedNodes.size===1}})}
                    ${t({click:()=>{Nx({emit:o,proxi:e,direction:"up"})}})}
                >
                    ${i}
                </button>
            </li>
            <li class="c-custom-history__down">
                <button
                    type="button"
                    ${r({toggleClass:{active:()=>e.selectedNodes.size===1}})}
                    ${t({click:()=>{Nx({emit:o,proxi:e,direction:"down"})}})}
                >
                    ${i}
                </button>
            </li>
            <li class="c-custom-history__swap">
                <button
                    type="button"
                    ${r({toggleClass:{active:()=>e.selectedNodes.size===2}})}
                    ${t({click:()=>{Mk({proxi:e,emit:o})}})}
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
    `},Px=({getProxi:e,computed:t,repeat:r,bindEffect:o,addMethod:n,staticProps:s,delegateEvents:i,bindProps:a,watch:c,emit:l})=>{let p=e();return c(()=>p.currentNode,d=>{m.loadUrl({url:d?.data.url,params:d?.data?.params,skipTransition:!0})}),t(()=>p.listParsed,()=>p.linkedList.toArray()),n("toggle",()=>{p.active=!p.active}),n("addRouteWithoutUpdate",({id:d})=>{p.currentNode=p.linkedList.find(f=>f.data.id===d),pi=!1,p.active=!1}),n("addSelectedNodes",({id:d,add:f})=>{f?p.selectedNodes.add(d):p.selectedNodes.delete(d),l(()=>p.selectedNodes)}),m.afterRouteChange(()=>{let d=m.getActiveParams(),f=m.getActiveRoute()?.route;if(pi&&f!==p.currentNode?.data.url){if(p.linkedList.size>=20){let h=p.linkedList.first;h&&(p.selectedNodes.delete(h.data.id),l(()=>p.selectedNodes)),p.linkedList.removeFirst(),h=null}p.currentNode&&(p.linkedList=p.linkedList.insertAfter(p.currentNode,{id:u.getUnivoqueId(),url:f,params:d}),p.currentNode=p.currentNode.next),p.currentNode||(p.linkedList=p.linkedList.addLast({id:u.getUnivoqueId(),url:f,params:d}),p.currentNode=p.linkedList.last)}pi=!0}),g`
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
            ${kk({proxi:p,delegateEvents:i,bindEffect:o,emit:l})}
            <div class="c-custom-history__container">
                ${r({observe:()=>p.listParsed,key:"id",render:({current:d})=>g`<history-item
                            ${s({id:d.value.id,url:d.value.url})}
                            ${a(()=>({active:p.currentNode?.data.id===d.value.id,forceSelect:p.selectAllOn}))}
                        ></history-item>`})}
            </div>
        </div>
    `};var Ax=()=>{fn(Xn)?.toggle()},Ox=({id:e})=>{fn(Xn)?.addRouteWithoutUpdate({id:e})},$x=({id:e,add:t})=>{fn(Xn)?.addSelectedNodes({id:e,add:t})};function Rk(e="",t=30){return e.length>t?`${e.slice(0,Math.max(0,t))} ...`:e}var Lx=({getProxi:e,delegateEvents:t,bindEffect:r,watch:o})=>{let n=e();return o(()=>n.checked,s=>{$x({id:n.id,add:s})}),o(()=>n.forceSelect,s=>n.checked=s),g`<div class="c-history-item">
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
            ${t({click:()=>{Ox({id:n.id})}})}
            ${r({toggleClass:{active:()=>n.active}})}
        >
            ${Rk(n.url)}
        </button>
    </div>`};var Dx=m.createComponent({tag:"history-item",component:Lx,props:{id:()=>({value:"",type:String}),url:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean}),forceSelect:()=>({value:!1,type:Boolean})},state:{checked:()=>({value:!1,type:Boolean})}});var Fx=m.createComponent({tag:"custom-history",component:Px,state:{linkedList:()=>({value:new an,type:"any",skipEqual:!1}),listParsed:()=>({value:[],type:Array,skipEqual:!1}),currentNode:()=>({value:void 0,type:"any",skipEqual:!1}),selectedNodes:()=>({value:new Set,type:Set,skipEqual:!1}),active:()=>({value:!1,type:Boolean}),selectAllOn:()=>({value:!1,type:Boolean})},child:[Dx]});var is="reset",gr="tree",mi="filter_component";var br=({screen:e,scroller:t,scrollbar:r})=>{let o;return{init:()=>{o||(o=new Et({screen:e,scroller:t,direction:"vertical",drag:!0,scopedEvent:!1,breakpoint:"desktop",onTick:({percent:n})=>{r.value=`${n}`},afterRefresh:({shouldScroll:n})=>{r?.classList.toggle("hide-scrollbar",!n)}}),o.init())},destroy:()=>{o?.destroy(),o=null},refresh:()=>{o?.refresh()},updateScroller:()=>{if(!o)return;let n=ne(t),s=ne(e),i=Ve(r),a=s/n*i;r.style.setProperty("--thumb-width",`${a}px`),o?.refresh()},move:n=>{o&&o.move(n).catch(()=>{})},goToTop:()=>{o?.set(0)}}};var as=u.createStore({currentId:()=>({value:"",type:String})});var Bx=e=>e?[...e].reduce((t,r)=>`${t}.${r}`,""):"",Vx=e=>Object.keys(e).reduce((t,r)=>`${t} ${r},`,""),Nk=e=>Object.entries(e).map(([t,r])=>g`<div>
                <strong>${t}:</strong>
                ${r.map(o=>g`${o}, `).join(".")}
            </div>`).join(""),Pk=e=>e?e.map(t=>`${t}, `).join(""):"",Wx=e=>Object.entries(e).map(([t,r])=>g`<div>
                <strong>${t}:</strong>
                ${JSON.stringify(r)}
            </div>`).join(""),Ak=({getState:e})=>{let{id:t}=e();if(t===is)return"";let r=m.componentMap.get(t);return r?g`<div>
        <!-- Basic props -->
        <div><strong>id</strong>: ${t}</div>
        <div><strong>parent id</strong>: ${r.parentId}</div>
        <div>
            <strong>component root</strong>:
            ${r.element.tagName}${Bx(r.element.classList)}
        </div>
        <div><strong>componentName</strong>: ${r.componentName}</div>
        <div><strong>instance name:</strong>: ${r.instanceName}</div>
        <div><strong>methods:</strong>: ${Vx(r.methods)}</div>
        <div><strong>refs:</strong>: ${Vx(r.refs)}</div>
        <div><strong>persistent:</strong>: ${r.persistent}</div>

        <!-- Children -->
        <h3 class="c-debug-component__section-title">Children:</h3>
        <div>${Nk(r?.child??{})}</div>

        <!-- Repeater -->
        <h3 class="c-debug-component__section-title">Repeater props:</h3>
        <div>
            <strong>component repeater id</strong>: ${r.componentRepeatId}
        </div>
        <div><strong>repeater state bind</strong>: ${r.repeatPropBind}</div>
        <div>
            <strong>repeater inner wrapper</strong>:
            ${r?.repeaterInnerWrap?.tagName}${Bx(r?.repeaterInnerWrap?.classList)}
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
            ${Pk(r?.freezedPros)}
        </div>
        <div>
            <h4 class="c-debug-component__section-subtitle">
                States current values:
            </h4>
            ${Wx(r.state.get())}
        </div>
        <div>
            <h4 class="c-debug-component__section-subtitle">
                States current validation:
            </h4>
            ${Wx(r.state.getValidation())}
        </div>
    </div>`:"component not found"},Ok=({getRef:e})=>{let{screen:t,scroller:r,scrollbar:o}=e();o.addEventListener("input",()=>{c(o.value)});let n=br({screen:t,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},jx=({onMount:e,addMethod:t,getState:r,invalidate:o,setRef:n,getRef:s,watch:i,getProxi:a,emit:c})=>{let l=a();t("updateId",d=>{l.id=d,as.set("currentId",d)}),t("refreshId",()=>{c(()=>l.id)});let p;return e(()=>{let{destroy:d,updateScroller:f,move:h,refresh:y}=Ok({getRef:s});return p=h,i(()=>l.id,async()=>{await m.tick(),y(),f(),p(0)}),()=>{d?.()}}),g`<div class="c-debug-component" ${n("screen")}>
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
            ${o({observe:()=>l.id,render:()=>Ak({getState:r})})}
        </div>
    </div>`};var zx=m.createComponent({tag:"debug-component",component:jx,state:{id:()=>({value:is,type:String,skipEqual:!1})}});var Hx=e=>{m.useMethodByName(ac)?.refreshList?.({testString:e})};var bp=async(e="")=>{await m.tick(),Hx(e)},Ux=({onMount:e,setRef:t,getRef:r,delegateEvents:o})=>(e(()=>(bp(),()=>{r()?.input.remove()})),g`<div class="c-debug-filter-head">
        <span class="c-debug-filter-head__title">Filter by tag</span>
        <input
            type="text"
            class="c-debug-filter-head__input"
            value=""
            ${t("input")}
            ${o({keydown:n=>{if(n.code.toLowerCase()==="enter"){n.preventDefault();let s=n.target.value;bp(s)}}})}
        />
        <button
            class="c-debug-filter-head__button"
            type="button"
            ${o({click:()=>{let{input:n}=r(),s=n.value;bp(s)}})}
        >
            find
        </button>
    </div>`);var Gx=m.createComponent({tag:"debug-filter-head",component:Ux});var $k=async({getRef:e})=>{await m.tick();let{screen:t,scroller:r,scrollbar:o}=e(),n=br({screen:t,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},qx=e=>`~${e}`,Lk=({testString:e})=>{let t=e.replaceAll("~","").split(" ").filter(r=>r!=="")??"";return(()=>{let r=[];for(let o of m.componentMap.values())t.every(s=>o.componentName.includes(s))&&r.push(o);return r})().map(({id:r,componentName:o,instanceName:n})=>({id:r,active:!1,tag:(()=>{let s=t.reduce((i,a,c)=>i.replaceAll(new RegExp(`(?<!~)${a.toLowerCase()}`,"g"),`${qx(c)}`),o);return t.reduce((i,a,c)=>i.replaceAll(`${qx(c)}`,`<span class="match-string">${a}</span>`),s)})(),name:n}))},Jx=({onMount:e,setRef:t,getRef:r,addMethod:o,repeat:n,staticProps:s,bindProps:i,bindEffect:a,getProxi:c,computed:l})=>{let p=c(),d=()=>{},f=()=>{},h=()=>{},y=()=>{};return l(()=>p.noResult,()=>p.data.length===0&&!p.isLoading),o("refreshList",async({testString:b})=>{p.isLoading=!0,await m.tick(),u.useNextTick(async()=>{p.data=Lk({testString:b}),await m.tick(),h?.(),y?.(),p.isLoading=!1})}),e(()=>{let{scrollbar:b}=r();return b.addEventListener("input",()=>{f(b.value)}),(async()=>({destroy:d,move:f,refresh:h,updateScroller:y}=await $k({getRef:r})))(),()=>{d?.(),d=()=>{},h=()=>{},y=()=>{},f=()=>{}}}),g`
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
    `};var vr=e=>{m.useMethodByName(ei)?.updateId(e)},Yx=()=>{m.useMethodByName(ei)?.refreshId()};var Xx=({delegateEvents:e,bindText:t,bindEffect:r,getProxi:o,computed:n})=>{let s=o();return n(()=>s.active,()=>s.id===s.currentId),g`
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
                ${e({click:()=>{vr(s.id)}})}
            >
                [ > ]
            </button>
            <span
                class="c-debug-tree-item__selected"
                ${r({toggleClass:{active:()=>s.active}})}
            ></span>
        </div>
    `};var Kx=m.createComponent({tag:"debug-filter-list-item",component:Xx,bindStore:as,props:{id:()=>({value:"",type:String}),tag:()=>({value:"",type:String}),name:()=>({value:"",type:String})},state:{active:()=>({value:!1,type:Boolean})}});var Qx=m.createComponent({tag:"debug-filter-list",component:Jx,state:{data:()=>({value:[],type:Array}),isLoading:()=>({value:!0,type:Boolean}),noResult:()=>({value:!1,type:Boolean})},child:[Kx]});var Zx=({invalidate:e,getProxi:t})=>{let r=t();return g`<div class="c-debug-head">
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
    </div>`};var e0=({setRef:e,getRef:t,delegateEvents:r})=>g`<div class="c-debug-search">
        <div>
            <span class="c-debug-search__label">
                <strong>Search by ID:</strong>
            </span>
            <input
                class="c-debug-search__input"
                type="text"
                ${e("id_input")}
                ${r({keydown:o=>{if(o.code.toLowerCase()==="enter"){o.preventDefault();let n=o.target.value;vr(n??"")}}})}
            />
            <button
                class="c-debug-search__button"
                type="button"
                ${r({click:()=>{let{id_input:o}=t(),n=o.value;vr(n??"")}})}
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
                ${r({keydown:o=>{if(o.code.toLowerCase()==="enter"){o.preventDefault();let n=o.target.value,s=m.getIdByInstanceName(n);vr(s??"")}}})}
            />
            <button
                class="c-debug-search__button"
                type="button"
                ${r({click:()=>{let{instance_input:o}=t(),n=o.value,s=m.getIdByInstanceName(n);vr(s??"")}})}
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
                    ${r({click:()=>{let{instance_input:o,id_input:n}=t();o.value="",n.value="",vr(is)}})}
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
                    ${r({click:()=>{Yx()}})}
                >
                    refresh component
                </button>
            </div>
        </div>
    </div>`;var t0=m.createComponent({tag:"debug-search",component:e0});var r0=m.createComponent({tag:"debug-head",component:Zx,props:{active:()=>({value:!1,type:Boolean})},state:{shouldUpdate:()=>({value:!0,type:Boolean,skipEqual:!1})},child:[t0]});var Oc=()=>{m.mainStore.debugStore(),console.log("componentMap",m.componentMap),console.log("Tree structure:",m.getTree()),console.log("bindEventMap",En),console.log("currentListValueMap",xs),console.log("activeRepeatMap",In),console.log("onMountCallbackMap",Es),console.log("staticPropsMap",Mn),console.log("dynamicPropsMap",Ct),console.log("eventDelegationMap",m.eventDelegationMap),console.log("tempDelegateEventMap",m.tempDelegateEventMap),console.log("invalidateIdHostMap",Kr.size),console.log("invalidateIdsMap",et),console.log("invalidateInstancesMap",ye),console.log("repeatIdHostMap",qr),console.log("repeatIdsMap",tt),console.log("repeatInstancesMap",G),console.log("userChildPlaceholderSize",rh()),console.log("slotPlaceholderSize",Xi()),console.log("bindTextPlaceholderMapSize",Fh()),console.log("instanceMap",Jr)};var o0=({delegateEvents:e,addMethod:t,bindProps:r,invalidate:o,bindEffect:n,getProxi:s,onMount:i})=>{let a=s();return t("toggle",()=>{a.active=!a.active}),i(()=>{let c=m.beforeRouteChange(()=>{a.active=!1,a.listType=gr});return()=>{c()}}),g`<div
        class="c-debug-overlay"
        ${n({toggleClass:{active:()=>a.active}})}
    >
        <button
            class="c-debug-overlay__background"
            type="button"
            ${e({click:()=>{a.active=!1,a.listType=gr}})}
        ></button>
        <button
            type="button"
            class="c-debug-overlay__close"
            ${e({click:()=>{a.active=!1,a.listType=gr}})}
        ></button>
        <div class="c-debug-overlay__grid">
            <button
                type="button"
                class="c-debug-overlay__log"
                ${e({click:()=>{Oc()}})}
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
                        ${o({observe:[()=>a.listType,()=>a.active],render:()=>a.listType===gr&&a.active?g`<div
                                        class="c-debug-overlay__list__title"
                                    >
                                        Tree structure
                                    </div>`:a.listType===mi&&a.active?g`<debug-filter-head></debug-filter-head>`:""})}
                    </div>

                    <div class="c-debug-overlay__list__ctas">
                        <button
                            type="button"
                            class="c-debug-overlay__list__toggle"
                            ${e({click:()=>{a.listType=gr}})}
                            ${n({toggleClass:{active:()=>a.listType===gr}})}
                        >
                            Tree
                        </button>
                        <button
                            type="button"
                            class="c-debug-overlay__list__toggle"
                            ${e({click:()=>{a.listType=mi}})}
                            ${n({toggleClass:{active:()=>a.listType===mi}})}
                        >
                            Filter
                        </button>
                    </div>
                </div>
                <div>
                    ${o({observe:[()=>a.listType,()=>a.active],render:()=>a.listType===gr&&a.active?g`
                                    <debug-tree
                                        name="${lc}"
                                    ></debug-tree>
                                `:a.listType===mi&&a.active?g`
                                    <debug-filter-list
                                        name="${ac}"
                                    ></debug-filter-list>
                                `:""})}
                </div>
            </div>
            <div class="c-debug-overlay__component">
                <debug-component name="${ei}"></debug-component>
            </div>
        </div>
    </div>`};var $c=({data:e,staticProps:t})=>e.map(({id:r,componentName:o,instanceName:n,children:s})=>g`<debug-tree-item
                ${t({id:r,componentName:o,instanceName:n,children:s})}
            ></debug-tree-item>`).join("");var Dk=async({getRef:e})=>{await m.tick();let{screen:t,scroller:r,scrollbar:o}=e(),n=br({screen:t,scroller:r,scrollbar:o}),s=n.destroy,i=n.refresh,a=n.move,c=n.updateScroller;return n.init(),c(),a(0),{destroy:s,refresh:i,move:a,updateScroller:c}},n0=({onMount:e,invalidate:t,staticProps:r,setRef:o,getRef:n,addMethod:s,bindEffect:i,getProxi:a})=>{let c=a(),l=()=>{},p=()=>{},d=()=>{},f=()=>{};return e(()=>{let{scrollbar:h}=n();return h.addEventListener("input",()=>{f(h.value)}),s("refresh",()=>{p?.(),d?.()}),(async()=>(c.isLoading=!0,await m.tick(),l?.(),c.data=m.getTree(),{destroy:l,move:f,refresh:p,updateScroller:d}=await Dk({getRef:n}),c.isLoading=!1))(),()=>{l?.(),l=()=>{},p=()=>{},d=()=>{},f=()=>{}}}),g`
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
                    ${t({observe:()=>c.data,render:()=>$c({data:c.data,staticProps:r})})}
                </div>
            </div>
        </div>
    `};var s0=()=>{m.useMethodByName(lc)?.refresh()};var Fk=e=>e>0?`( ${e} ) `:"",i0=({id:e,value:t})=>{let o=m.componentMap.get(e)?.child;if(!o)return!1;let n=Object.values(o).flat();return n.includes(t)?!0:n.some(i=>i0({id:i,value:t}))},a0=({onMount:e,staticProps:t,getRef:r,setRef:o,delegateEvents:n,watch:s,bindEffect:i,getProxi:a,computed:c})=>{let l=a(),p=l.children.length>0?"has-children":"";return c(()=>l.isActive,()=>l.id===l.currentId),c(()=>l.hasActiveChildren,()=>i0({id:l.id,value:l.currentId})),e(()=>{let{content:d}=r(),f=Dr.subscribe(d);return Dr.reset(d),s(()=>l.isOpen,async h=>{await Dr[h?"down":"up"](d),s0()}),()=>{f()}}),g`<div class="c-debug-tree-item">
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
            <span>${Fk(l.children.length)}</span>
            <button
                type="button"
                class="c-debug-tree-item__expand"
                ${n({click:()=>{vr(l.id)}})}
            >
                [ > ]
            </button>
            <span
                class="c-debug-tree-item__selected"
                ${i({toggleClass:{active:()=>l.isActive}})}
            ></span>
        </div>
        <div class="c-debug-tree-item__content" ${o("content")}>
            ${$c({data:l.children,staticProps:t})}
        </div>
    </div>`};var c0=m.createComponent({tag:"debug-tree-item",component:a0,bindStore:as,props:{id:()=>({value:"",type:String}),componentName:()=>({value:"",type:String}),instanceName:()=>({value:"",type:String}),children:()=>({value:[],type:Array})},state:{isOpen:()=>({value:!1,type:Boolean}),isActive:()=>({value:!1,type:Boolean}),hasActiveChildren:()=>({value:!1,type:Boolean})}});var l0=m.createComponent({tag:"debug-tree",component:n0,state:{data:()=>({value:[],type:Array}),isLoading:()=>({value:!1,type:Boolean})},child:[c0]});var u0=m.createComponent({tag:"debug-overlay",component:o0,state:{active:()=>({value:!1,type:Boolean}),listType:()=>({value:gr,type:String})},child:[l0,zx,r0,Gx,Qx]});var vp=()=>{},Lc=()=>{},Dc=()=>{},Fc=()=>{},Bk=({staticProps:e,bindProps:t,proxi:r})=>r.data.map(o=>{let{label:n,url:s,isLabel:i}=o;return i?g`<p class="c-params-mobjs__label">${n}</p>`:g`<li>
                      <links-mobjs-button
                          ${e({label:n,url:s})}
                          ${t(()=>({active:r.activeSection===s}))}
                      ></links-mobjs-button>
                  </li>`}).join(""),p0=({staticProps:e,setRef:t,getRef:r,onMount:o,bindProps:n,invalidate:s,bindEffect:i,getProxi:a})=>{let c=hr(),l=a(),p={[Q]:c.sideBarLinks.mobJsComponentParams};return o(()=>{let{screenEl:d,scrollerEl:f,scrollbar:h}=r(),y=!1;h.addEventListener("input",()=>{Dc?.(h.value)}),X.watch("navigationIsOpen",T=>{let{templateName:_}=m.getActiveRoute();_ in p&&(l.shift=T)});let b=m.afterRouteChange(async({currentTemplate:T,currentRoute:_})=>{let S=p?.[T]??[];if(l.data=S,await m.tick(),l.activeSection=_,S.length>0){if(l.hide=!1,y){Fc();return}({init:vp,destroy:Lc,move:Dc,updateScroller:Fc}=br({screen:d,scroller:f,scrollbar:h})),y=!0,vp(),Fc(),Dc(0)}S.length===0&&(l.hide=!0,Lc?.(),y=!1)});return()=>{Lc?.(),b(),vp=()=>{},Lc=()=>{},Dc=()=>{},Fc=()=>{}}}),g`<div
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
            ${s({observe:()=>l.data,render:()=>Bk({staticProps:e,bindProps:n,proxi:l})})}
        </ul>
    </div>`};var m0=({getProxi:e,bindEffect:t})=>{let r=e();return g` <a
        href="./#${r.url}"
        ${t({toggleClass:{current:()=>r.active}})}
        ><span>${r.label}</span></a
    >`};var d0=m.createComponent({tag:"links-mobjs-button",component:m0,props:{label:()=>({value:"",type:String}),url:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean})}});var h0=m.createComponent({tag:"links-mobjs",component:p0,child:[d0],state:{data:()=>({value:[],type:Array}),activeSection:()=>({value:"",type:String}),hide:()=>({value:!1,type:Boolean}),shift:()=>({value:!1,type:Boolean})}});var f0=({getProxi:e,bindEffect:t,addMethod:r})=>{let o=e();return r("update",(n,s)=>{o[n]=s}),g`<div
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
    </div>`};var g0=m.createComponent({tag:"quick-nav",component:f0,state:{active:()=>({value:!1,type:Boolean}),backRoute:()=>({value:"",type:String}),prevRoute:()=>({value:"",type:String}),nextRoute:()=>({value:"",type:String})}});var Vk=({proxi:e,bindEffect:t})=>e.data.map(({label:r,url:o})=>{let n=o.replaceAll("#","");return g`
                <li class="right-sidebar__item">
                    <a
                        href="${o}"
                        class="right-sidebar__link"
                        ${t({toggleClass:{active:()=>e.activeRoute.route===n}})}
                        >${r}</a
                    >
                </li>
            `}).join(""),b0=({getProxi:e,invalidate:t,addMethod:r,computed:o,bindEffect:n})=>{let s=e();return r("updateList",i=>{s.data=i}),m.afterRouteChange(({currentTemplate:i})=>{Pc.has(i)||(s.data=[])}),o(()=>s.isVisible,()=>s.data.length>0),g`<div
        class="right-sidebar"
        ${n({toggleClass:{visible:()=>s.isVisible}})}
    >
        <div class="right-sidebar__title">Sections:</div>
        <ul class="right-sidebar__list">
            ${t({observe:()=>s.data,render:()=>Vk({proxi:s,bindEffect:n})})}
        </ul>
    </div>`};var v0=m.createComponent({tag:"right-sidebar",component:b0,bindStore:[m.mainStore],state:{data:()=>({value:[],type:Array}),isVisible:()=>({value:!1,type:Boolean})}});var y0=({onMount:e,getProxi:t,bindEffect:r,addMethod:o})=>{let n=t();return o("skip",()=>{n.skip=!1}),e(({element:s})=>{n.isDisable=!0;let i=H.createTimeTween({data:{opacity:1,scale:1},duration:500});i.subscribe(({opacity:l,scale:p})=>{s.style.opacity=l,s.style.transform=`scale(${p})`});let a=m.beforeRouteChange(async()=>{n.skip||(n.isDisable=!1,await i.set({opacity:1}),i.goTo({scale:1}))}),c=m.afterRouteChange(async()=>{await i.goTo({opacity:0,scale:.9}).catch(()=>{}),n.isDisable=!0});return()=>{i.destroy(),i=null,a(),c()}}),g`
        <div
            class="c-loader center-viewport"
            ${r({toggleClass:{disable:()=>n.isDisable}})}
        >
            <span class="c-loader__inner"></span>
        </div>
    `};var T0=m.createComponent({tag:"route-loader",component:y0,state:{isLoading:()=>({value:!1,type:Boolean}),isDisable:()=>({value:!1,type:Boolean}),skip:()=>({value:!0,type:Boolean})}});var S0=({getProxi:e,bindEffect:t,addMethod:r})=>{let o=e();return r("update",n=>{o.active=n}),g`
        <div
            class="c-scroller-down-label"
            ${t({toggleClass:{active:()=>o.active}})}
        >
            Scroll down
        </div>
    `};var _0=m.createComponent({tag:"scroll-down-label",component:S0,state:{active:()=>({value:!1,type:Boolean})}});var x0=()=>{m.useMethodByName(Uo)?.setInputFocus()},yp=e=>{m.useMethodByName(Uo)?.updateCurrentSearchFromSuggestion(e)},C0=e=>{m.useMethodByName(Uo)?.shouldCloseSuggestion(e)},Bc=()=>{m.useMethodByName(Uo)?.closeSuggestion()};var E0=({proxi:e})=>{e.active=!1,Bc()},Wk=({currentTarget:e})=>{e&&C0(e)},w0=({getProxi:e,delegateEvents:t,bindEffect:r,addMethod:o,bindObject:n,staticProps:s})=>{let i=e();return o("toggle",()=>{i.active=!i.active}),g`<div
        class="search-overlay"
        ${r({toggleClass:{active:()=>i.active}})}
    >
        <button
            class="search-overlay__background"
            type="button"
            ${t({click:()=>{E0({proxi:i})}})}
        ></button>
        <button
            type="button"
            class="search-overlay__close"
            ${t({click:()=>{E0({proxi:i})}})}
        ></button>

        <!-- Main content -->
        <div
            class="search-overlay__grid"
            ${t({click:a=>{Wk({currentTarget:a.currentTarget})}})}
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
                    name="${si}"
                ></search-overlay-list>
            </div>
        </div>
    </div>`};var I0=e=>{m.useMethodByName(si)?.update(e)},M0=()=>{m.useMethodByName(si)?.reset()};var jk=async({currentSearch:e})=>{I0(e)},Tp=({getRef:e})=>{let{search_input:t}=e(),r=t.value;jk({currentSearch:r})},k0=({getRef:e,proxi:t})=>{M0();let{search_input:r}=e();r.value="",t.suggestionListData=[]},R0=e=>`~${e}`,zk=({currentSearch:e,proxi:t})=>{let o=hr().suggestion;e.length===0&&(t.suggestionListData=[]);let s=e.split(" ").slice(-1).join("").replaceAll("~","").split(" ").filter(i=>i!=="")??"";t.suggestionListData=(o.filter(({word:i})=>s.some(a=>i.toLowerCase().includes(a.toLowerCase())))??[]).map(({word:i})=>({word:i,wordHiglight:(()=>{let a=s.reduce((c,l,p)=>c.toLowerCase().replaceAll(new RegExp(`(?<!~)${l.toLowerCase()}`,"g"),`${R0(p)}`),i);return s.reduce((c,l,p)=>c.replaceAll(`${R0(p)}`,`<span class="match-string">${l}</span>`),a)})()}))},N0=({delegateEvents:e,getRef:t,setRef:r,getProxi:o,bindProps:n,addMethod:s,onMount:i,computed:a,bindEffect:c})=>{let l=o();return a(()=>l.suggestionListActive,()=>l.suggestionListData.length>0),i(()=>{let{search_input:p,suggestionElement:d}=t();s("updateCurrentSearchFromSuggestion",f=>{let y=p.value.split(" "),b=y.length===0?f:`${y.slice(0,-1).join(" ")} ${f}`;p.value=b.trimStart(),l.suggestionListData=[],p.focus()}),s("shouldCloseSuggestion",f=>{d!==f&&!d.contains(f)&&(l.suggestionListData=[])}),s("closeSuggestion",()=>{l.suggestionListData=[]}),s("setInputFocus",async()=>{setTimeout(()=>{p.focus()},300)})}),g`<div class="search-overlay-header">
        <div class="search-overlay-header__input-container">
            <input
                type="text"
                class="search-overlay-header__input"
                ${r("search_input")}
                ${e({keyup:u.useDebounce(p=>{if(p.code.toLowerCase()==="enter"){p.preventDefault(),Tp({getRef:t,proxi:l}),l.suggestionListData=[];return}if(p.code.toLowerCase()==="escape"){p.preventDefault(),l.suggestionListData=[];return}let d=p.target.value;zk({currentSearch:d,proxi:l})},60)})}
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
            ${e({click:()=>{Tp({getRef:t,proxi:l})},keydown:p=>{p.code.toLowerCase()==="enter"&&Tp({getRef:t,proxi:l})}})}
        >
            submit
        </button>

        <!-- Reset -->
        <button
            type="button"
            class="search-overlay-header__button"
            ${e({click:()=>{k0({getRef:t,proxi:l})},keydown:p=>{p.code.toLowerCase()==="enter"&&k0({getRef:t,proxi:l})}})}
        >
            reset
        </button>
    </div>`};var P0=({getProxi:e,repeat:t,bindProps:r})=>{let o=e();return g`<div>
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
    </div>`};var Hk=({code:e,word:t})=>{if(e.toLowerCase()==="enter"){yp(t);return}if(e.toLowerCase()==="escape"){Bc();return}},A0=({getProxi:e,delegateEvents:t,bindObject:r})=>{let o=e();return g`
        <li class="search-overlay-suggestion__item">
            <button
                type="button"
                class="search-overlay-suggestion__button"
                ${t({click:()=>{yp(o.word)},keydown:n=>{n.preventDefault(),Hk({code:n.code,word:o.word})}})}
            >
                ${r`${()=>o.wordHiglight}`}
            </button>
        </li>
    `};var O0=m.createComponent({tag:"search-overlay-suggestion-item",component:A0,props:{word:()=>({value:"",type:String}),wordHiglight:()=>({value:"",type:String})}});var $0=m.createComponent({tag:"search-overlay-suggestion",component:P0,props:{list:()=>({value:[],type:Array})},child:[O0]});var L0=m.createComponent({tag:"search-overlay-header",component:N0,state:{suggestionListActive:()=>({value:!1,type:Boolean}),suggestionListData:()=>({value:[],type:Array})},child:[$0]});var Uk=async({source:e,uri:t,title:r,section:o,breadCrumbs:n})=>{let s=await fetch(e);return s.ok?{success:!0,data:(await s.json()).data,uri:t,title:r,section:o,breadCrumbs:n}:(console.warn(`${e} not found`),{success:!1,data:[{component:"",props:{}}],uri:t,title:r,section:o,breadCrumbs:[]})},Gk=new Set(["mob-title","mob-paragraph","mob-list"]),qk=new Set(["mob-title","mob-paragraph"]),Jk=new Set(["mob-list"]),D0=async({currentSearch:e=""})=>{let t=Ac.filter(({props:a})=>a?.source&&a?.title).map(({hash:a,props:c})=>({fn:Uk({source:c.source??"",uri:a??"uri not forud",title:c.title??"title not found",section:c.section??"title not found",breadCrumbs:c.breadCrumbs??[]})})),r=await Promise.all(t.map(({fn:a})=>a)),o=[],n=r.filter(({success:a})=>a).map(({data:a,uri:c,title:l,section:p,breadCrumbs:d})=>{let y=a.reduce((b,T)=>{if(!T)return b;let{component:_}=T;return _?T.component==="html-content"?T?.props?.data?[...b,T.props.data]:b:[...b,T]:b},o).flat().filter(({component:b})=>Gk.has(b)).flatMap(b=>qk.has(b?.component)?b.content:Jk.has(b?.component)?b?.props?.links?b.props.items.map(({label:T})=>T):b.props.items:b);return{uri:c,title:l,section:p,breadCrumbs:d,data:y}}),s=e.split(" ");return n.filter(a=>{let c=a.data.join(" ");return s.every(l=>c.toLowerCase().includes(l.toLowerCase()))}).toSorted(a=>a.title.toLowerCase().includes(e.toLowerCase())?-1:1).map(({title:a,uri:c,section:l,breadCrumbs:p,data:d})=>{let f=d.join("").toLowerCase().split(e.toLowerCase()),h=p.length>0?p.reduce((y,b,T)=>{let _=T>0?"/":"";return`${y}${_}${b.title}`},""):a;return{title:a,uri:c,section:l,breadCrumbs:h,count:f?.length??0}})};var Yk=({getRef:e})=>{let{screen:t,scroller:r,scrollbar:o}=e();o.addEventListener("input",()=>{c(o.value)});let n=br({screen:t,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},F0=({getProxi:e,repeat:t,setRef:r,getRef:o,onMount:n,watch:s,addMethod:i,bindEffect:a,invalidate:c,bindProps:l})=>{let p=e();i("update",async f=>{p.loading||(p.loading=!0,p.noResult=!1,p.list=await D0({currentSearch:f}),p.loading=!1,p.noResult=p.list.length===0,p.updatePrentSearchKey(f))}),i("reset",()=>{p.updatePrentSearchKey(""),p.list=[]});let d;return n(()=>{let{destroy:f,updateScroller:h,move:y,refresh:b}=Yk({getRef:o});return d=y,s(()=>p.list,async()=>{await m.tick(),b(),h(),d(0)}),()=>{f?.()}}),g`<div class="search-overlay-list" ${r("screen")}>
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
    </div>`};var Vc=()=>{m.useMethodByName(pc)?.toggle()};var Xk=({uri:e})=>{m.loadUrl({url:e}),Vc()},B0=({getProxi:e,bindEffect:t,delegateEvents:r,bindObject:o})=>{let n=e();return g`
        <li
            class="search-overlay-list__item"
            ${t({toggleClass:{current:()=>n.active}})}
        >
            <button
                type="button"
                class="search-overlay-list__button"
                ${r({click:()=>{Xk({uri:n.uri})}})}
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
    `};var V0=m.createComponent({tag:"search-overlay-list-item",component:B0,props:{uri:()=>({value:"",type:String}),breadCrumbs:()=>({value:"",type:String}),title:()=>({value:"",type:String}),count:()=>({value:0,type:Number}),active:()=>({value:!1,type:Boolean})}});var W0=m.createComponent({tag:"search-overlay-list",component:F0,bindStore:m.mainStore,props:{updatePrentSearchKey:()=>({value:()=>{},type:Function})},state:{list:()=>({value:[],type:Array}),loading:()=>({value:!1,type:Boolean}),noResult:()=>({value:!1,type:Boolean})},child:[V0]});var j0=m.createComponent({tag:"search-overlay",component:w0,state:{active:()=>({value:!1,type:Boolean}),currentSearch:()=>({value:"",type:String})},child:[L0,W0]});var z0=()=>g`
        <div class="test-grid">
            <div class="test-grid__grid">
                <span></span><span></span><span></span><span></span><span></span
                ><span></span><span></span><span></span><span></span
                ><span></span><span></span><span></span>
            </div>
            <div class="test-grid__cont"><span>test</span></div>
        </div>
    `;var H0=m.createComponent({tag:"test-scss-grid",component:z0});var To=()=>{let{templateName:e}=m.getActiveRoute();return Pc.has(e)?0:40};var U0=()=>{m.useMethodByName(cc)?.toggle()};var Kk=["Alberto Navarro","Milan, Italy",'<a href="https://github.com/albnavarro/" target="_blank">[ github ]</a>','<a href="https://www.linkedin.com/in/alberto-navarro74/" target="_blank">[ linkedin ]</a>'],Qk=()=>g`
        <ul class="l-footer__bio">
            ${Kk.map(e=>g` <li class="l-footer__bio__item">${e}</li> `).join("")}
        </ul>
    `,G0=({delegateEvents:e,getProxi:t,onMount:r,bindEffect:o})=>{let n=t();return r(()=>{u.useFrameIndex(()=>{n.isMounted=!0},To())}),g`
        <footer
            class="l-footer"
            ${o({toggleClass:{"is-visible":()=>n.isMounted}})}
        >
            <div class="l-footer__container">
                ${Qk()}
                <div class="l-footer__debug">
                    <debug-button
                        class="c-button-debug"
                        ${e({click:()=>{U0()}})}
                    >
                        Debug App</debug-button
                    >
                    <debug-button
                        class="c-button-console"
                        ${e({click:()=>{Oc()}})}
                    >
                        Log
                    </debug-button>
                </div>
            </div>
        </footer>
    `};var q0=()=>g`
        <button type="button" class="c-btn-debug">
            <mobjs-slot></mobjs-slot>
        </button>
    `;var J0=m.createComponent({tag:"debug-button",component:q0});var Y0=m.createComponent({tag:"mob-footer",component:G0,child:[J0],state:{isMounted:()=>({value:!1,type:Boolean})}});var Wc=()=>{m.useMethodByName(ni)?.scrollTop()},jc=()=>{m.useMethodByName(ni)?.refresh()};var cs=({fireCallback:e=!0}={})=>{m.useMethodByName(uc)?.closeAllAccordion({fireCallback:e})};function Zk(){m.loadUrl({url:"home"}),cs(),X.set("navigationIsOpen",!1),Wc()}var X0=({delegateEvents:e,bindEffect:t,getProxi:r,onMount:o,addMethod:n})=>{let s=r();return o(({element:i})=>{n("getHeaderHeight",()=>ne(i)),u.useFrameIndex(()=>{s.isMounted=!0},To())}),g`
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
                        ${e({click:()=>{Zk()}})}
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
    `};var K0=({delegateEvents:e,bindEffect:t,getProxi:r,onMount:o})=>{let n=r();return o(()=>{u.useFrameIndex(()=>{n.isMounted=!0},To())}),g`
        <button
            class="hamburger"
            type="button"
            ${e({click:()=>{X.update("navigationIsOpen",s=>!s),n.navigationIsOpen||Yt()}})}
            ${t([{toggleClass:{"is-open":()=>n.navigationIsOpen}},{toggleClass:{"is-mounted":()=>n.isMounted}}])}
        >
            <div class="hamburger__box">
                <div class="hamburger-inner"></div>
            </div>
        </button>
    `};var Q0=m.createComponent({tag:"mob-header-toggle",component:K0,bindStore:X,state:{isMounted:()=>({value:!1,type:Boolean})}});var eR=({event:e})=>{let t=e.target;console.log(t);let{url:r}=t?.dataset??"";m.loadUrl({url:r}),X.set("navigationIsOpen",!1)};function tR({delegateEvents:e}){let t=hr().header,{links:r}=t,o={github:gt().gitHubIcon};return r.map(n=>{let{svg:s,url:i,internal:a}=n;return g`<li class="l-header__sidenav__item">
                ${a?g`
                          <button
                              type="button"
                              data-url="${i}"
                              class="l-header__sidenav__link"
                              ${e({click:c=>{eR({event:c})}})}
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
            </li>`}).join("")}var Z0=({delegateEvents:e})=>g`
        <ul class="l-header__sidenav">
            <li class="l-header__sidenav__item">
                <history-cta></history-cta>
            </li>
            <li class="l-header__sidenav__item">
                <search-cta></search-cta>
            </li>
            ${tR({delegateEvents:e})}
        </ul>
    `;var rR=()=>{Vc(),x0()},eC=({delegateEvents:e})=>{let t=gt().searchIcons;return g`<button
        type="button"
        class="search-cta"
        ${e({click:()=>{rR()}})}
    >
        ${t}
    </button>`};var tC=m.createComponent({tag:"search-cta",component:eC});var rC=({delegateEvents:e})=>{let t=gt().historyIcons;return g`<button
        type="button"
        class="history-cta"
        ${e({click:()=>{Ax()}})}
    >
        ${t}
    </button>`};var oC=m.createComponent({tag:"history-cta",component:rC});var nC=m.createComponent({tag:"mob-header-utils",component:Z0,child:[tC,oC]});var oR=({delegateEvents:e,staticProps:t})=>hr().footer.nav.map(({label:o,url:n,section:s})=>g`<li class="header-main-menu__item">
                <header-main-menu-button
                    ${e({click:()=>{m.loadUrl({url:n}),X.set("navigationIsOpen",!1)}})}
                    ${t({label:o,section:s})}
                ></header-main-menu-button>
            </li> `).join(""),sC=({delegateEvents:e,staticProps:t,getProxi:r,onMount:o,bindEffect:n})=>{let s=r();return o(()=>{u.useFrameIndex(()=>{s.isMounted=!0},10)}),g`
        <ul
            class="header-main-menu"
            ${n({toggleClass:{"is-visible":()=>s.isMounted}})}
        >
            ${oR({delegateEvents:e,staticProps:t})}
        </ul>
    `};var iC=({getProxi:e,bindEffect:t,computed:r})=>{let o=e();return r(()=>o.active,()=>o.section===o.activeNavigationSection),g`
        <button
            type="button"
            class="header-main-menu__button"
            ${t({toggleClass:{current:()=>o.active}})}
        >
            ${o.label}
        </button>
    `};var aC=m.createComponent({tag:"header-main-menu-button",component:iC,bindStore:X,props:{label:()=>({value:"",type:String}),section:()=>({value:"",type:String})},state:{active:()=>({value:!1,type:Boolean})}});var cC=m.createComponent({tag:"header-main-menu",component:sC,child:[aC],state:{isMounted:()=>({value:!1,type:Boolean})}});var lC=m.createComponent({tag:"mob-header",component:X0,state:{isMounted:()=>({value:!1,type:Boolean})},child:[cC,nC,Q0]});var Sp=0,uC=({root:e})=>{let t=e.querySelector(".l-navcontainer__wrap"),r=e.querySelector(".l-navcontainer__scroll"),o=e.querySelector(".l-navcontainer__percent"),n=200,s=new Et({screen:t,scroller:r,direction:"vertical",drag:!0,scopedEvent:!1,onUpdate:({percent:i})=>{let{navigationIsOpen:a}=X.get();a&&(Sp=Math.round(i)/100,o.style.transform=`translateZ(0) scaleX(${Sp})`)}});return s.init(),X.watch("activeNavigationSection",i=>{let a=document.querySelector(`[data-sectionname='${i}']`);if(!a)return;let c=document.querySelector(".l-header"),l=document.querySelector(".l-footer"),p=ne(r),d=ne(c),f=ne(l),y=100*a.offsetTop/(p-window.innerHeight+d+f);setTimeout(()=>{X.getProp("navigationIsOpen")||s.set(y)},400)}),X.watch("navigationIsOpen",i=>{if(i){o.style.transform=`translateZ(0) scaleX(${Sp})`;return}o.style.transform="translateZ(0) scaleX(0)"}),{scrollNativationToTop:()=>{setTimeout(()=>{s.move(0).catch(()=>{}),o.style.transform="translateZ(0) scaleX(0)"},n)},refreshScroller:()=>{s.refresh()}}};function nR({main:e,proxi:t}){t.isOpen=!1,u.useFrame(()=>{document.body.style.overflow="",e.classList.remove("shift")})}function sR({main:e,proxi:t}){jc(),t.isOpen=!0,u.useFrame(()=>{document.body.style.overflow="hidden",e.classList.add("shift")})}function iR({main:e}){e.addEventListener("click",()=>{X.set("navigationIsOpen",!1),Yt()})}var aR=()=>{Wc(),cs();let{navigationIsOpen:e}=X.get();e||Lr.to(0)},pC=({onMount:e,addMethod:t,delegateEvents:r,bindEffect:o,getProxi:n})=>{let s=n();return e(({element:i})=>{let a=document.querySelector("main.main");X.watch("navigationIsOpen",p=>{if(p&&a){sR({main:a,proxi:s});return}nR({main:a,proxi:s})}),iR({main:a});let{scrollNativationToTop:c,refreshScroller:l}=uC({root:i});return t("scrollTop",c),t("refresh",l),u.useFrameIndex(()=>{s.isMounted=!0},To()),()=>{}}),g`
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
                    ${r({click:()=>{aR()}})}
                ></button>
            </div>
            <div class="l-navcontainer__wrap">
                <div class="l-navcontainer__scroll">
                    <mob-navigation
                        name="${uc}"
                    ></mob-navigation>
                </div>
            </div>
        </div>
    `};function cR({data:e,staticProps:t,bindProps:r,proxi:o}){return e.map((n,s)=>{let{label:i,url:a,activeId:c,children:l,section:p,sectioName:d,scrollToSection:f,forceChildren:h,hide:y}=n;return p?g`
                    <mob-navigation-label
                        ${t({label:i,sectioName:d,hide:!!y})}
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
                  `}).join("")}var mC=({staticProps:e,setState:t,bindProps:r,addMethod:o,getProxi:n})=>{let s=n(),{navigation:i}=hr();return o("closeAllAccordion",({fireCallback:a=!0}={})=>{t(()=>s.currentAccordionId,-1,{emit:a})}),g`
        <nav class="l-navigation">
            <ul class="l-navigation__list">
                ${cR({data:i,staticProps:e,bindProps:r,proxi:s})}
            </ul>
        </nav>
    `};var dC=({bindEffect:e,getProxi:t})=>{let r=t();return g`
        <div
            class="l-navigation__label"
            data-sectionname="${r.sectioName}"
            ${e({toggleClass:{active:()=>r.sectioName===r.activeNavigationSection,hide:()=>!!r.hide}})}
        >
            ${r.label}
        </div>
    `};var hC=m.createComponent({tag:"mob-navigation-label",component:dC,bindStore:X,props:{label:()=>({value:"",type:String}),sectioName:()=>({value:"",type:String}),hide:()=>({value:!1,type:Boolean})}});function lR({proxi:e,staticProps:t}){return e.children.map(r=>{let{label:o,url:n,scrollToSection:s,activeId:i}=r;return g`
                <li class="l-navigation__submenu__item">
                    <mob-navigation-button
                        ${t({label:o,url:n,subMenuClass:"l-navigation__link--submenu",scrollToSection:s,activeId:i??-1,callback:()=>{e.callback({forceClose:!1})}})}
                    ></mob-navigation-button>
                </li>
            `}).join("")}var fC=({onMount:e,staticProps:t,bindProps:r,watch:o,setRef:n,getRef:s,getProxi:i})=>{let a=i(),{label:c,url:l,activeId:p}=a.headerButton;return e(()=>{let{content:d}=s();return Dr.subscribe(d),Dr.reset(d),o(()=>a.isOpen,async f=>{await Dr[f?"down":"up"](d),jc(),!f&&cs({fireCallback:!1})},{immediate:!0}),()=>{}}),g`
        <li class="l-navigation__item has-child">
            <mob-navigation-button
                ${t({label:c,url:l,arrowClass:"l-navigation__link--arrow",fireRoute:!1,activeId:p??-1,callback:()=>{a.callback({forceClose:a.isOpen})}})}
                ${r(()=>({isOpen:a.isOpen}))}
            ></mob-navigation-button>
            <ul class="l-navigation__submenu" ${n("content")}>
                ${lR({proxi:a,staticProps:t})}
            </ul>
        </li>
    `};var gC=({delegateEvents:e,getProxi:t,bindEffect:r})=>{let o=t(),{label:n,url:s,arrowClass:i,subMenuClass:a,fireRoute:c,callback:l,scrollToSection:p,activeId:d,forceChildren:f}=o;return m.afterRouteChange(({currentRoute:h})=>{u.useFrame(()=>{let b=s.split("?")?.[0]??"",T=m.getActiveParams(),_=d===-1||T?.activeId===`${d}`,S=h===b&&_,E=f.includes(h);o.isCurrent=S||E,S&&c&&(l(),X.set("activeNavigationSection",p))})}),g`
        <button
            type="button"
            class="l-navigation__link  ${i} ${a}"
            ${e({click:()=>{l(),c&&(m.loadUrl({url:s}),X.set("navigationIsOpen",!1))}})}
            ${r({toggleClass:{active:()=>o.isOpen,current:()=>o.isCurrent}})}
        >
            ${n}
        </button>
    `};var zc=m.createComponent({tag:"mob-navigation-button",component:gC,props:{label:()=>({value:"",type:String}),url:()=>({value:"",type:String}),arrowClass:()=>({value:"",type:String}),subMenuClass:()=>({value:"",type:String}),fireRoute:()=>({value:!0,type:Boolean}),callback:()=>({value:()=>{},type:Function}),isOpen:()=>({value:!1,type:Boolean}),scrollToSection:()=>({value:"",type:String}),activeId:()=>({value:-1,type:Number}),forceChildren:()=>({value:[],type:Array})},state:{isCurrent:()=>({value:!1,type:Boolean})}});var bC=m.createComponent({tag:"mob-navigation-submenu",component:fC,props:{callback:()=>({value:()=>{},type:Function}),headerButton:()=>({value:{},type:"Any"}),children:()=>({value:[],type:Array}),isOpen:()=>({value:!1,type:Boolean})},child:[zc]});var vC=m.createComponent({tag:"mob-navigation",component:mC,state:{currentAccordionId:()=>({value:-1,type:Number,skipEqual:!1})},child:[hC,bC,zc]});var yC=m.createComponent({tag:"mob-navigation-container",component:pC,child:[vC],state:{isOpen:()=>({value:!1,type:Boolean}),isMounted:()=>({value:!1,type:Boolean})}});m.useComponent([lC,yC,Y0,g0,T0,_0,h0,u0,H0,j0,v0,Rx,Fx]);var TC=async()=>g`
        ${""}
        <custom-history name="${Xn}"></custom-history>
        <debug-overlay name="${cc}"></debug-overlay>
        <mob-header name="${fT}"></mob-header>
        <mob-navigation-container
            name="${ni}"
        ></mob-navigation-container>
        <main class="main">
            <div class="container">
                <div class="inner-wrap">
                    <div id="content"></div>
                </div>
            </div>
        </main>
        <mob-footer> </mob-footer>
        <quick-nav name="${ti}"></quick-nav>
        <route-loader name="${hc}"></route-loader>
        <scroll-down-label name="${ri}"></scroll-down-label>
        <links-mobjs></links-mobjs>
        <right-sidebar name="${mc}"></right-sidebar>
        <search-overlay name="${pc}"></search-overlay>
        <animation-description
            name="${dc}"
        ></animation-description>
    `;var _p=0,xp=document.querySelector(".js-main-loader-track"),SC=(e=60)=>{let t=()=>{if(_p++,!xp)return;let r=100*_p/e;if(xp.style.transform=`scaleX(${r/100})`,_p>=e){xp=null;return}u.useNextFrame(()=>{t()})};u.useFrame(()=>{t()})};var _C=e=>{m.useMethodByName(hc).skip(e)};var xC=60,CC=()=>ce.mq("max","desktop"),uR=()=>{u.useResize(()=>{CC()&&m.loadUrl({url:"onlyDesktop"})})},Uc=document.body.querySelector(".js-main-loader"),Gc=document.body.querySelector(".js-main-loader-background"),Hc=H.createTimeTween({data:{opacity:1},duration:1e3});Uc&&Gc&&[Uc,Gc].forEach(e=>{Hc?.subscribe(({opacity:t})=>{e.style.opacity=t})});var pR=async()=>{await Ny(),await Py(),SC(xC),await u.useFps({duration:xC,force:!0}),m.inizializeApp({rootId:"#root",contentId:"#content",wrapper:TC,routes:Ac,index:"home",pageNotFound:"pageNotFound",beforePageTransition:Ex,pageTransition:wx,afterInit:async()=>{await Hc.goTo({opacity:0}),Hc.destroy(),Hc=null,Uc?.remove(),Gc?.remove(),Uc=null,Gc=null,Mx(),uR(),_C(!1)},redirect:({route:e})=>CC()?"onlyDesktop":e,restoreScroll:!0,componentDefaultProps:{scoped:!1,maxParseIteration:1e4,debug:!1}})};u.useLoad(()=>{Iy(),ce.setDefault({deferredNextTick:!0}),pR(),wy()});})();
//# sourceMappingURL=main.js.map
