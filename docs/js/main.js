"use strict";(()=>{var SC=Object.create;var Uc=Object.defineProperty;var _C=Object.getOwnPropertyDescriptor;var xC=Object.getOwnPropertyNames;var CC=Object.getPrototypeOf,EC=Object.prototype.hasOwnProperty;var wC=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),So=(e,t)=>{for(var r in t)Uc(e,r,{get:t[r],enumerable:!0})},IC=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of xC(t))!EC.call(e,n)&&n!==r&&Uc(e,n,{get:()=>t[n],enumerable:!(o=_C(t,n))||o.enumerable});return e};var MC=(e,t,r)=>(r=e!=null?SC(CC(e)):{},IC(t||!e||!e.__esModule?Uc(r,"default",{value:e,enumerable:!0}):r,e));var nT=wC((xJ,oT)=>{function Uy(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{let r=e[t],o=typeof r;(o==="object"||o==="function")&&!Object.isFrozen(r)&&Uy(r)}),e}var tc=class{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}};function Gy(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function bo(e,...t){let r=Object.create(null);for(let o in e)r[o]=e[o];return t.forEach(function(o){for(let n in o)r[n]=o[n]}),r}var OI="</span>",By=e=>!!e.scope,$I=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){let r=e.split(".");return[`${t}${r.shift()}`,...r.map((o,n)=>`${o}${"_".repeat(n+1)}`)].join(" ")}return`${t}${e}`},Hu=class{constructor(t,r){this.buffer="",this.classPrefix=r.classPrefix,t.walk(this)}addText(t){this.buffer+=Gy(t)}openNode(t){if(!By(t))return;let r=$I(t.scope,{prefix:this.classPrefix});this.span(r)}closeNode(t){By(t)&&(this.buffer+=OI)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}},Vy=(e={})=>{let t={children:[]};return Object.assign(t,e),t},zu=class e{constructor(){this.rootNode=Vy(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){let r=Vy({scope:t});this.add(r),this.stack.push(r)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,r){return typeof r=="string"?t.addText(r):r.children&&(t.openNode(r),r.children.forEach(o=>this._walk(t,o)),t.closeNode(r)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(r=>typeof r=="string")?t.children=[t.children.join("")]:t.children.forEach(r=>{e._collapse(r)}))}},Uu=class extends zu{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,r){let o=t.root;r&&(o.scope=`language:${r}`),this.add(o)}toHTML(){return new Hu(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}};function Ys(e){return e?typeof e=="string"?e:e.source:null}function qy(e){return Ho("(?=",e,")")}function LI(e){return Ho("(?:",e,")*")}function DI(e){return Ho("(?:",e,")?")}function Ho(...e){return e.map(r=>Ys(r)).join("")}function FI(e){let t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function qu(...e){return"("+(FI(e).capture?"":"?:")+e.map(o=>Ys(o)).join("|")+")"}function Jy(e){return new RegExp(e.toString()+"|").exec("").length-1}function BI(e,t){let r=e&&e.exec(t);return r&&r.index===0}var VI=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function Ju(e,{joinWith:t}){let r=0;return e.map(o=>{r+=1;let n=r,s=Ys(o),i="";for(;s.length>0;){let a=VI.exec(s);if(!a){i+=s;break}i+=s.substring(0,a.index),s=s.substring(a.index+a[0].length),a[0][0]==="\\"&&a[1]?i+="\\"+String(Number(a[1])+n):(i+=a[0],a[0]==="("&&r++)}return i}).map(o=>`(${o})`).join(t)}var WI=/\b\B/,Yy="[a-zA-Z]\\w*",Yu="[a-zA-Z_]\\w*",Xy="\\b\\d+(\\.\\d+)?",Ky="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Qy="\\b(0b[01]+)",jI="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",HI=(e={})=>{let t=/^#![ ]*\//;return e.binary&&(e.begin=Ho(t,/.*\b/,e.binary,/\b.*/)),bo({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(r,o)=>{r.index!==0&&o.ignoreMatch()}},e)},Xs={begin:"\\\\[\\s\\S]",relevance:0},zI={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[Xs]},UI={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[Xs]},GI={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},oc=function(e,t,r={}){let o=bo({scope:"comment",begin:e,end:t,contains:[]},r);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});let n=qu("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:Ho(/[ ]+/,"(",n,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},qI=oc("//","$"),JI=oc("/\\*","\\*/"),YI=oc("#","$"),XI={scope:"number",begin:Xy,relevance:0},KI={scope:"number",begin:Ky,relevance:0},QI={scope:"number",begin:Qy,relevance:0},ZI={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[Xs,{begin:/\[/,end:/\]/,relevance:0,contains:[Xs]}]},eM={scope:"title",begin:Yy,relevance:0},tM={scope:"title",begin:Yu,relevance:0},rM={begin:"\\.\\s*"+Yu,relevance:0},oM=function(e){return Object.assign(e,{"on:begin":(t,r)=>{r.data._beginMatch=t[1]},"on:end":(t,r)=>{r.data._beginMatch!==t[1]&&r.ignoreMatch()}})},ec=Object.freeze({__proto__:null,APOS_STRING_MODE:zI,BACKSLASH_ESCAPE:Xs,BINARY_NUMBER_MODE:QI,BINARY_NUMBER_RE:Qy,COMMENT:oc,C_BLOCK_COMMENT_MODE:JI,C_LINE_COMMENT_MODE:qI,C_NUMBER_MODE:KI,C_NUMBER_RE:Ky,END_SAME_AS_BEGIN:oM,HASH_COMMENT_MODE:YI,IDENT_RE:Yy,MATCH_NOTHING_RE:WI,METHOD_GUARD:rM,NUMBER_MODE:XI,NUMBER_RE:Xy,PHRASAL_WORDS_MODE:GI,QUOTE_STRING_MODE:UI,REGEXP_MODE:ZI,RE_STARTERS_RE:jI,SHEBANG:HI,TITLE_MODE:eM,UNDERSCORE_IDENT_RE:Yu,UNDERSCORE_TITLE_MODE:tM});function nM(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function sM(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function iM(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=nM,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function aM(e,t){Array.isArray(e.illegal)&&(e.illegal=qu(...e.illegal))}function cM(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function lM(e,t){e.relevance===void 0&&(e.relevance=1)}var uM=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");let r=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=r.keywords,e.begin=Ho(r.beforeMatch,qy(r.begin)),e.starts={relevance:0,contains:[Object.assign(r,{endsParent:!0})]},e.relevance=0,delete r.beforeMatch},pM=["of","and","for","in","not","or","if","then","parent","list","value"],mM="keyword";function Zy(e,t,r=mM){let o=Object.create(null);return typeof e=="string"?n(r,e.split(" ")):Array.isArray(e)?n(r,e):Object.keys(e).forEach(function(s){Object.assign(o,Zy(e[s],t,s))}),o;function n(s,i){t&&(i=i.map(a=>a.toLowerCase())),i.forEach(function(a){let c=a.split("|");o[c[0]]=[s,dM(c[0],c[1])]})}}function dM(e,t){return t?Number(t):hM(e)?0:1}function hM(e){return pM.includes(e.toLowerCase())}var Wy={},jo=e=>{console.error(e)},jy=(e,...t)=>{console.log(`WARN: ${e}`,...t)},Un=(e,t)=>{Wy[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Wy[`${e}/${t}`]=!0)},rc=new Error;function eT(e,t,{key:r}){let o=0,n=e[r],s={},i={};for(let a=1;a<=t.length;a++)i[a+o]=n[a],s[a+o]=!0,o+=Jy(t[a-1]);e[r]=i,e[r]._emit=s,e[r]._multi=!0}function fM(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw jo("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),rc;if(typeof e.beginScope!="object"||e.beginScope===null)throw jo("beginScope must be object"),rc;eT(e,e.begin,{key:"beginScope"}),e.begin=Ju(e.begin,{joinWith:""})}}function gM(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw jo("skip, excludeEnd, returnEnd not compatible with endScope: {}"),rc;if(typeof e.endScope!="object"||e.endScope===null)throw jo("endScope must be object"),rc;eT(e,e.end,{key:"endScope"}),e.end=Ju(e.end,{joinWith:""})}}function bM(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function vM(e){bM(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),fM(e),gM(e)}function yM(e){function t(i,a){return new RegExp(Ys(i),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(a?"g":""))}class r{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(a,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,a]),this.matchAt+=Jy(a)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);let a=this.regexes.map(c=>c[1]);this.matcherRe=t(Ju(a,{joinWith:"|"}),!0),this.lastIndex=0}exec(a){this.matcherRe.lastIndex=this.lastIndex;let c=this.matcherRe.exec(a);if(!c)return null;let l=c.findIndex((d,f)=>f>0&&d!==void 0),p=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,p)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(a){if(this.multiRegexes[a])return this.multiRegexes[a];let c=new r;return this.rules.slice(a).forEach(([l,p])=>c.addRule(l,p)),c.compile(),this.multiRegexes[a]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(a,c){this.rules.push([a,c]),c.type==="begin"&&this.count++}exec(a){let c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(a);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){let p=this.getMatcher(0);p.lastIndex=this.lastIndex+1,l=p.exec(a)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function n(i){let a=new o;return i.contains.forEach(c=>a.addRule(c.begin,{rule:c,type:"begin"})),i.terminatorEnd&&a.addRule(i.terminatorEnd,{type:"end"}),i.illegal&&a.addRule(i.illegal,{type:"illegal"}),a}function s(i,a){let c=i;if(i.isCompiled)return c;[sM,cM,vM,uM].forEach(p=>p(i,a)),e.compilerExtensions.forEach(p=>p(i,a)),i.__beforeBegin=null,[iM,aM,lM].forEach(p=>p(i,a)),i.isCompiled=!0;let l=null;return typeof i.keywords=="object"&&i.keywords.$pattern&&(i.keywords=Object.assign({},i.keywords),l=i.keywords.$pattern,delete i.keywords.$pattern),l=l||/\w+/,i.keywords&&(i.keywords=Zy(i.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),a&&(i.begin||(i.begin=/\B|\b/),c.beginRe=t(c.begin),!i.end&&!i.endsWithParent&&(i.end=/\B|\b/),i.end&&(c.endRe=t(c.end)),c.terminatorEnd=Ys(c.end)||"",i.endsWithParent&&a.terminatorEnd&&(c.terminatorEnd+=(i.end?"|":"")+a.terminatorEnd)),i.illegal&&(c.illegalRe=t(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map(function(p){return TM(p==="self"?i:p)})),i.contains.forEach(function(p){s(p,c)}),i.starts&&s(i.starts,a),c.matcher=n(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=bo(e.classNameAliases||{}),s(e)}function tT(e){return e?e.endsWithParent||tT(e.starts):!1}function TM(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return bo(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:tT(e)?bo(e,{starts:e.starts?bo(e.starts):null}):Object.isFrozen(e)?bo(e):e}var SM="11.11.1",Gu=class extends Error{constructor(t,r){super(t),this.name="HTMLInjectionError",this.html=r}},ju=Gy,Hy=bo,zy=Symbol("nomatch"),_M=7,rT=function(e){let t=Object.create(null),r=Object.create(null),o=[],n=!0,s="Could not find the language '{}', did you forget to load/include a language module?",i={disableAutodetect:!0,name:"Plain text",contains:[]},a={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Uu};function c(x){return a.noHighlightRe.test(x)}function l(x){let N=x.className+" ";N+=x.parentNode?x.parentNode.className:"";let L=a.languageDetectRe.exec(N);if(L){let B=k(L[1]);return B||(jy(s.replace("{}",L[1])),jy("Falling back to no-highlight mode for this block.",x)),B?L[1]:"no-highlight"}return N.split(/\s+/).find(B=>c(B)||k(B))}function p(x,N,L){let B="",j="";typeof N=="object"?(B=x,L=N.ignoreIllegals,j=N.language):(Un("10.7.0","highlight(lang, code, ...args) has been deprecated."),Un("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),j=x,B=N),L===void 0&&(L=!0);let X={code:B,language:j};O("before:highlight",X);let ue=X.result?X.result:d(X.language,X.code,L);return ue.code=X.code,O("after:highlight",ue),ue}function d(x,N,L,B){let j=Object.create(null);function X(V,U){return V.keywords[U]}function ue(){if(!Y.keywords){je.addText(Me);return}let V=0;Y.keywordPatternRe.lastIndex=0;let U=Y.keywordPatternRe.exec(Me),ie="";for(;U;){ie+=Me.substring(V,U.index);let Ce=Ye.case_insensitive?U[0].toLowerCase():U[0],tt=X(Y,Ce);if(tt){let[vr,yC]=tt;if(je.addText(ie),ie="",j[Ce]=(j[Ce]||0)+1,j[Ce]<=_M&&(ui+=yC),vr.startsWith("_"))ie+=U[0];else{let TC=Ye.classNameAliases[vr]||vr;pe(U[0],TC)}}else ie+=U[0];V=Y.keywordPatternRe.lastIndex,U=Y.keywordPatternRe.exec(Me)}ie+=Me.substring(V),je.addText(ie)}function ye(){if(Me==="")return;let V=null;if(typeof Y.subLanguage=="string"){if(!t[Y.subLanguage]){je.addText(Me);return}V=d(Y.subLanguage,Me,!0,as[Y.subLanguage]),as[Y.subLanguage]=V._top}else V=h(Me,Y.subLanguage.length?Y.subLanguage:null);Y.relevance>0&&(ui+=V.relevance),je.__addSublanguage(V._emitter,V.language)}function ee(){Y.subLanguage!=null?ye():ue(),Me=""}function pe(V,U){V!==""&&(je.startScope(U),je.addText(V),je.endScope())}function he(V,U){let ie=1,Ce=U.length-1;for(;ie<=Ce;){if(!V._emit[ie]){ie++;continue}let tt=Ye.classNameAliases[V[ie]]||V[ie],vr=U[ie];tt?pe(vr,tt):(Me=vr,ue(),Me=""),ie++}}function be(V,U){return V.scope&&typeof V.scope=="string"&&je.openNode(Ye.classNameAliases[V.scope]||V.scope),V.beginScope&&(V.beginScope._wrap?(pe(Me,Ye.classNameAliases[V.beginScope._wrap]||V.beginScope._wrap),Me=""):V.beginScope._multi&&(he(V.beginScope,U),Me="")),Y=Object.create(V,{parent:{value:Y}}),Y}function Ie(V,U,ie){let Ce=BI(V.endRe,ie);if(Ce){if(V["on:end"]){let tt=new tc(V);V["on:end"](U,tt),tt.isMatchIgnored&&(Ce=!1)}if(Ce){for(;V.endsParent&&V.parent;)V=V.parent;return V}}if(V.endsWithParent)return Ie(V.parent,U,ie)}function De(V){return Y.matcher.regexIndex===0?(Me+=V[0],1):(zc=!0,0)}function q(V){let U=V[0],ie=V.rule,Ce=new tc(ie),tt=[ie.__beforeBegin,ie["on:begin"]];for(let vr of tt)if(vr&&(vr(V,Ce),Ce.isMatchIgnored))return De(U);return ie.skip?Me+=U:(ie.excludeBegin&&(Me+=U),ee(),!ie.returnBegin&&!ie.excludeBegin&&(Me=U)),be(ie,V),ie.returnBegin?0:U.length}function Te(V){let U=V[0],ie=N.substring(V.index),Ce=Ie(Y,V,ie);if(!Ce)return zy;let tt=Y;Y.endScope&&Y.endScope._wrap?(ee(),pe(U,Y.endScope._wrap)):Y.endScope&&Y.endScope._multi?(ee(),he(Y.endScope,V)):tt.skip?Me+=U:(tt.returnEnd||tt.excludeEnd||(Me+=U),ee(),tt.excludeEnd&&(Me=U));do Y.scope&&je.closeNode(),!Y.skip&&!Y.subLanguage&&(ui+=Y.relevance),Y=Y.parent;while(Y!==Ce.parent);return Ce.starts&&be(Ce.starts,V),tt.returnEnd?0:U.length}function et(){let V=[];for(let U=Y;U!==Ye;U=U.parent)U.scope&&V.unshift(U.scope);V.forEach(U=>je.openNode(U))}let ut={};function Et(V,U){let ie=U&&U[0];if(Me+=V,ie==null)return ee(),0;if(ut.type==="begin"&&U.type==="end"&&ut.index===U.index&&ie===""){if(Me+=N.slice(U.index,U.index+1),!n){let Ce=new Error(`0 width match regex (${x})`);throw Ce.languageName=x,Ce.badRule=ut.rule,Ce}return 1}if(ut=U,U.type==="begin")return q(U);if(U.type==="illegal"&&!L){let Ce=new Error('Illegal lexeme "'+ie+'" for mode "'+(Y.scope||"<unnamed>")+'"');throw Ce.mode=Y,Ce}else if(U.type==="end"){let Ce=Te(U);if(Ce!==zy)return Ce}if(U.type==="illegal"&&ie==="")return Me+=`
`,1;if(Hc>1e5&&Hc>U.index*3)throw new Error("potential infinite loop, way more iterations than matches");return Me+=ie,ie.length}let Ye=k(x);if(!Ye)throw jo(s.replace("{}",x)),new Error('Unknown language: "'+x+'"');let is=yM(Ye),Br="",Y=B||is,as={},je=new a.__emitter(a);et();let Me="",ui=0,To=0,Hc=0,zc=!1;try{if(Ye.__emitTokens)Ye.__emitTokens(N,je);else{for(Y.matcher.considerAll();;){Hc++,zc?zc=!1:Y.matcher.considerAll(),Y.matcher.lastIndex=To;let V=Y.matcher.exec(N);if(!V)break;let U=N.substring(To,V.index),ie=Et(U,V);To=V.index+ie}Et(N.substring(To))}return je.finalize(),Br=je.toHTML(),{language:x,value:Br,relevance:ui,illegal:!1,_emitter:je,_top:Y}}catch(V){if(V.message&&V.message.includes("Illegal"))return{language:x,value:ju(N),illegal:!0,relevance:0,_illegalBy:{message:V.message,index:To,context:N.slice(To-100,To+100),mode:V.mode,resultSoFar:Br},_emitter:je};if(n)return{language:x,value:ju(N),illegal:!1,relevance:0,errorRaised:V,_emitter:je,_top:Y};throw V}}function f(x){let N={value:ju(x),illegal:!1,relevance:0,_top:i,_emitter:new a.__emitter(a)};return N._emitter.addText(x),N}function h(x,N){N=N||a.languages||Object.keys(t);let L=f(x),B=N.filter(k).filter(R).map(ee=>d(ee,x,!1));B.unshift(L);let j=B.sort((ee,pe)=>{if(ee.relevance!==pe.relevance)return pe.relevance-ee.relevance;if(ee.language&&pe.language){if(k(ee.language).supersetOf===pe.language)return 1;if(k(pe.language).supersetOf===ee.language)return-1}return 0}),[X,ue]=j,ye=X;return ye.secondBest=ue,ye}function y(x,N,L){let B=N&&r[N]||L;x.classList.add("hljs"),x.classList.add(`language-${B}`)}function b(x){let N=null,L=l(x);if(c(L))return;if(O("before:highlightElement",{el:x,language:L}),x.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",x);return}if(x.children.length>0&&(a.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(x)),a.throwUnescapedHTML))throw new Gu("One of your code blocks includes unescaped HTML.",x.innerHTML);N=x;let B=N.textContent,j=L?p(B,{language:L,ignoreIllegals:!0}):h(B);x.innerHTML=j.value,x.dataset.highlighted="yes",y(x,L,j.language),x.result={language:j.language,re:j.relevance,relevance:j.relevance},j.secondBest&&(x.secondBest={language:j.secondBest.language,relevance:j.secondBest.relevance}),O("after:highlightElement",{el:x,result:j,text:B})}function T(x){a=Hy(a,x)}let _=()=>{C(),Un("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function S(){C(),Un("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let E=!1;function C(){function x(){C()}if(document.readyState==="loading"){E||window.addEventListener("DOMContentLoaded",x,!1),E=!0;return}document.querySelectorAll(a.cssSelector).forEach(b)}function I(x,N){let L=null;try{L=N(e)}catch(B){if(jo("Language definition for '{}' could not be registered.".replace("{}",x)),n)jo(B);else throw B;L=i}L.name||(L.name=x),t[x]=L,L.rawDefinition=N.bind(null,e),L.aliases&&A(L.aliases,{languageName:x})}function M(x){delete t[x];for(let N of Object.keys(r))r[N]===x&&delete r[N]}function P(){return Object.keys(t)}function k(x){return x=(x||"").toLowerCase(),t[x]||t[r[x]]}function A(x,{languageName:N}){typeof x=="string"&&(x=[x]),x.forEach(L=>{r[L.toLowerCase()]=N})}function R(x){let N=k(x);return N&&!N.disableAutodetect}function F(x){x["before:highlightBlock"]&&!x["before:highlightElement"]&&(x["before:highlightElement"]=N=>{x["before:highlightBlock"](Object.assign({block:N.el},N))}),x["after:highlightBlock"]&&!x["after:highlightElement"]&&(x["after:highlightElement"]=N=>{x["after:highlightBlock"](Object.assign({block:N.el},N))})}function $(x){F(x),o.push(x)}function w(x){let N=o.indexOf(x);N!==-1&&o.splice(N,1)}function O(x,N){let L=x;o.forEach(function(B){B[L]&&B[L](N)})}function D(x){return Un("10.7.0","highlightBlock will be removed entirely in v12.0"),Un("10.7.0","Please use highlightElement now."),b(x)}Object.assign(e,{highlight:p,highlightAuto:h,highlightAll:C,highlightElement:b,highlightBlock:D,configure:T,initHighlighting:_,initHighlightingOnLoad:S,registerLanguage:I,unregisterLanguage:M,listLanguages:P,getLanguage:k,registerAliases:A,autoDetection:R,inherit:Hy,addPlugin:$,removePlugin:w}),e.debugMode=function(){n=!1},e.safeMode=function(){n=!0},e.versionString=SM,e.regex={concat:Ho,lookahead:qy,either:qu,optional:DI,anyNumberOfTimes:LI};for(let x in ec)typeof ec[x]=="object"&&Uy(ec[x]);return Object.assign(e,ec),e},Gn=rT({});Gn.newInstance=()=>rT({});oT.exports=Gn;Gn.HighlightJS=Gn;Gn.default=Gn});var u={};So(u,{ANIMATION_STOP_REJECT:()=>cl,checkType:()=>Le,createStore:()=>NE,debounce:()=>_o,getFps:()=>AE,getInstantFps:()=>PE,getTime:()=>Xt,getTypeName:()=>ls,getUnivoqueId:()=>ke,mustMakeSomething:()=>OE,normalizeWheel:()=>Si,shouldMakeSomething:()=>$E,store:()=>uw,throttle:()=>pi,useCache:()=>jE,useDebounce:()=>_o,useFps:()=>VE,useFrame:()=>LE,useFrameIndex:()=>BE,useLinkedList:()=>pw,useLoad:()=>WE,useMouseClick:()=>UE,useMouseDown:()=>GE,useMouseMove:()=>JE,useMouseUp:()=>XE,useMouseWheel:()=>QE,useNextFrame:()=>FE,useNextLoop:()=>Ft,useNextTick:()=>DE,usePointerDown:()=>sw,usePointerLeave:()=>lw,usePointerMove:()=>iw,usePointerOut:()=>cw,usePointerOver:()=>nw,usePointerUp:()=>aw,useResize:()=>HE,useScroll:()=>ZE,useScrollEnd:()=>ow,useScrollImmediate:()=>ew,useScrollStart:()=>rw,useScrollThrottle:()=>tw,useTouchEnd:()=>KE,useTouchMove:()=>YE,useTouchStart:()=>qE,useVisibilityChange:()=>zE});var Xt=()=>typeof globalThis>"u"?Date.now():globalThis.performance.now(),xp=16.666666666666668;var pi=(e,t)=>{let r,o;return function(){let n=this,s=arguments;o?(clearTimeout(r),r=setTimeout(function(){Xt()-o>=t&&(e.apply(n,s),o=Xt())},t-(Xt()-o))):(e.apply(n,s),o=Xt())}};var _o=function(t,r=200){let o;return function(){let n=()=>Reflect.apply(t,this,arguments);clearTimeout(o),o=setTimeout(n,r)}};function ne(e){if(!e)return 0;let t=e.offsetHeight,r=getComputedStyle(e);return t+=Number.parseInt(r.marginTop)+Number.parseInt(r.marginBottom),t}function Fe(e){if(!e)return 0;let t=e.offsetWidth,r=getComputedStyle(e);return t+=Number.parseInt(r.marginLeft)+Number.parseInt(r.marginRight),t}function fe(e){if(!e)return{top:0,left:0};let t=e.getBoundingClientRect();return{top:t.top+window.scrollY,left:t.left+window.scrollY}}function wt(e){return e?e.getBoundingClientRect():{bottom:0,height:0,left:0,right:0,top:0,width:0,x:0,y:0}}function cs(e,t){let r=t?.parentNode;for(;r;){if(r===e)return!0;r=r?.parentNode}return!1}function xo(e){let t=globalThis.getComputedStyle(e),r=t.transform||t.mozTransform;if(r==="none"||r===void 0)return{x:0,y:0,z:0};let o=r.includes("3d")?"3d":"2d",n=r.match(/matrix.*\((.+)\)/)[1].split(", ");if(o==="2d")return{x:n[4],y:n[5],z:0};if(o==="3d")return{x:n[12],y:n[13],z:n[14]}}function Gc(e){return typeof Node=="object"?e instanceof Node:e&&typeof e=="object"&&typeof e.nodeType=="number"&&typeof e.nodeName=="string"}var ke=()=>`_${Math.random().toString(36).slice(2,9)}`;function Cp(e){var t=e.getBoundingClientRect();return t.top>=0&&t.bottom<=window.innerHeight}var qc=(e,t,r)=>Math.min(Math.max(e,t),r);var mi=new Set,Ft=e=>{mi.add(e),mi.size===1&&setTimeout(()=>{mi.forEach(t=>{t()}),mi.clear()})};var Jc="UNTYPED",Ep="STRING",wp="NUMBER",Ip="OBJECT",Mp="FUNCTION",di="ARRAY",kp="BOOLEAN",Rp="ELEMENT",Np="HTMLELEMENT",Pp="NODELIST";var Ee={isString:e=>Object.prototype.toString.call(e)==="[object String]",isNumber:e=>Object.prototype.toString.call(e)==="[object Number]"&&Number.isFinite(e),isObject:e=>Object.prototype.toString.call(e)==="[object Object]",isFunction:e=>Object.prototype.toString.call(e)==="[object Function]",isArray:e=>Object.prototype.toString.call(e)==="[object Array]",isBoolean:e=>Object.prototype.toString.call(e)==="[object Boolean]",isElement:e=>e instanceof Element||e instanceof Document,isHTMLElement:e=>e instanceof HTMLElement,isSet:e=>e instanceof Set,isMap:e=>e instanceof Map,isNodeList:e=>Object.prototype.isPrototypeOf.call(NodeList.prototype,e)},ls=e=>{switch(e){case String:case Ep:return"String";case Number:case wp:return"Number";case Object:case Ip:return"Object";case Function:case Mp:return"Function";case Array:case di:return"Array";case Boolean:case kp:return"Boolean";case Element:case Rp:return"Element";case HTMLElement:case Np:return"HTMLElement";case NodeList:case Pp:return"NodeList";case Set:case"SET":return"Set";case Map:case"MAP":return"Map";case"ANY":return"ANY";default:return Jc}},Le=(e,t)=>{switch(e){case String:case Ep:return Ee.isString(t);case Number:case wp:return Ee.isNumber(t);case Object:case Ip:return Ee.isObject(t);case Function:case Mp:return Ee.isFunction(t);case Array:case di:return Ee.isArray(t);case Boolean:case kp:return Ee.isBoolean(t);case Element:case Rp:return Ee.isElement(t);case HTMLElement:case Np:return Ee.isHTMLElement(t);case NodeList:case Pp:return Ee.isNodeList(t);case Set:case"SET":return Ee.isSet(t);case Map:case"MAP":return Ee.isMap(t);case"ANY":return!0;default:return!0}};var NC=(e,t)=>e.size===t.size&&[...e.keys()].every(r=>e.get(r)===t.get(r)),PC=(e,t)=>e.size===t.size&&[...e].every(r=>t.has(r)),AC=(e,t)=>{if(e.length!==t.length)return!1;let r=new Set([...e,...t]);for(let o of r){let n=e.filter(i=>i===o).length,s=t.filter(i=>i===o).length;if(n!==s)return!1}return!0},Ap=(e,t,r=!1)=>{if(e===null||t===null)return e===t;let n=e,s=t;if(r||(Array.isArray(e)&&(n=[...e].toSorted()),Array.isArray(t)&&(s=[...t].toSorted())),typeof n!="object"||typeof s!="object")return n===s;let i=Object.getOwnPropertyNames(n),a=Object.getOwnPropertyNames(s);if(i.length!==a.length)return!1;for(let c of i){let l=n[c],p=s[c];if(typeof l=="object"&&typeof p=="object"){if(Ap(l,p,r))continue;return!1}if(l!==p)return!1}return!0},Yc=(e,t,r)=>{switch(e){case"ANY":return Ap(t,r);case di:case Array:return AC(t,r);case"SET":case Set:return PC(t,r);case"MAP":case Map:return NC(t,r);default:return t===r}};var hi="UPDATE";var Re={};So(Re,{extractKeysFromArray:()=>Qc,extractkeyFromProp:()=>Vr,getCurrentDependencies:()=>Xc,getFirstCurrentDependencies:()=>Kc,initializeCurrentDependencies:()=>us,setCurrentDependencies:()=>gi});var Go=[],fi=!1,us=()=>{fi=!0,Go.length=0},Xc=()=>(fi=!1,[...Go]),Kc=()=>(fi=!1,[...Go]?.[0]??"missing_prop"),gi=e=>{!fi||!e||Go.includes(e)||(Go=[...Go,e])},Vr=e=>Le(String,e)?e:(us(),e(),Kc()),Qc=e=>e.map(t=>Le(String,t)?t:(us(),t(),Kc()));var bi=new Map,qo=({callBackWatcher:e,prop:t,newValue:r,oldValue:o,validationValue:n,instanceId:s})=>{for(let{prop:i,fn:a,wait:c}of e.values())if(i===t&&!c&&a(r,o,n),s&&i===t&&c){let l=bi.get(s)??new Map,p=l.has(t);if(l.set(t,{newValue:r,oldValue:o,validationValue:n}),p)return;bi.set(s,l),Ft(()=>{let d=bi.get(s),f=d?.get(t);(f.newValue!==void 0||f.newValue!==null)&&a(f.newValue,f.oldValue,f.validationValue),d?.delete(t),d?.size===0&&bi.delete(s)})}},Op=async({callBackWatcher:e,prop:t,newValue:r,oldValue:o,validationValue:n})=>{for(let{prop:s,fn:i}of e.values())s===t&&await i(r,o,n)};var OC="padding: 10px;",Be=()=>OC;var yr=(e,t=new WeakMap)=>{if(e===null||typeof e!="object"||typeof Element<"u"&&e instanceof Element)return e;if(t.has(e))return t.get(e);if(e instanceof Date)return new Date(e);if(e instanceof RegExp)return new RegExp(e.source,e.flags);if(Array.isArray(e)){let o=[];return t.set(e,o),e.forEach((n,s)=>{o[s]=yr(n,t)}),o}if(typeof e=="function")return e;if(e instanceof Map){let o=new Map;return t.set(e,o),e.forEach((n,s)=>{o.set(yr(s,t),yr(n,t))}),o}if(e instanceof Set){let o=new Set;return t.set(e,o),e.forEach(n=>{o.add(yr(n,t))}),o}let r=Object.create(Object.getPrototypeOf(e));return t.set(e,r),Object.getOwnPropertyNames(e).forEach(o=>{let n=Object.getOwnPropertyDescriptor(e,o);n&&("value"in n?Object.defineProperty(r,o,{...n,value:yr(n.value,t)}):Object.defineProperty(r,o,n))}),Object.getOwnPropertySymbols(e).forEach(o=>{let n=Object.getOwnPropertyDescriptor(e,o);n&&("value"in n?Object.defineProperty(r,o,{...n,value:yr(n.value,t)}):Object.defineProperty(r,o,n))}),r};var Zc="store_shallow_copy",el="store_custom_copy",tl="store_deep_copy",Jo=Zc,vi=()=>Jo===el||Jo===tl;var Ue=new Map,re=e=>{if(Jo===Zc){let t=Ue.get(e);return t?{...t}:void 0}if(Jo===el){let t=Ue.get(e);return t?{...t,store:{...t.store},validationStatusObject:{...t.validationStatusObject}}:void 0}if(Jo===tl){let t=Ue.get(e);return t?{...t,store:yr(t.store),validationStatusObject:yr(t.validationStatusObject)}:void 0}return Ue.get(e)},Pe=(e,t)=>{Ue.set(e,t)},$p=e=>{Ue.delete(e)};var rl=(e,t)=>{console.warn(`%c MobStore supports an object with a depth of up to 2 levels, set 'Any' type to use obj as value, the input object has ${e} level`,t)};var Lp=(e,t)=>{console.warn(`%c MobStore, trying to execute set() method: store.${e} not exist`,t)},Dp=(e,t,r)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: setProp methods doesn't allow objects as value, ${JSON.stringify(t)} is an Object, use 'Any' type for custom object`,r)},Fp=(e,t)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: '${JSON.stringify(e)}' is an objects`,t)},Bp=(e,t,r,o)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: ${t} is not a ${ls(r)}`,o)},Vp=(e,t,r)=>{console.warn(`%c trying to execute setObj method on '${e}' propierties: setObj methods allow only objects as value, ${t} is not an Object`,r)},Wp=(e,t)=>{console.warn(`%c trying to execute setObj data method on '${e}' propierties: store propierties '${e}' is not an object`,t)},jp=(e,t,r)=>{console.warn(`%c trying to execute setObj data method: one of these keys '${e}' not exist in store.${t}`,r)},Hp=(e,t,r)=>{console.warn(`%c trying to execute setObj data method on '${e}' propierties: '${JSON.stringify(t)}' have a depth > 1, nested obj is not allowed`,r)},zp=(e,t,r,o,n)=>{console.warn(`%c trying to execute setObj data method on ${e}.${t} propierties: ${r} is not a ${ls(o)}`,n)},Up=(e,t)=>{console.warn(`%c trying to execute get data method: store.${e} not exist`,t)},ol=(e,t)=>{console.warn(`%c trying to execute set data method: store.${e} not exist`,t)},Gp=(e,t)=>{console.warn(`%c one of the keys [${e}] is already used as a computed target, or there is a circular dependencies`,t)},qp=(e,t)=>{console.warn(`%c MobStore error: the property ${e} to watch doesn't exist in store`,t)},Jp=(e,t)=>{console.warn(`%c Validation Object error: validation function return undefined or have you used Object instead '${t}' ?`,e)};var Yp=(e,t)=>{console.warn(`%c MobStore error: the property ${e} should readOnly with proxi, maybe is a mobJs props.`,t)},nl=(e,t)=>{console.warn(`%c MobStore error: the property ${e} fail validation during definition.`,t)};var ps=e=>{if(!Ee.isObject(e))return 0;let t=Object.values(e);return t.length===0?1:Math.max(...t.map(r=>ps(r)))+1},Xp=(e,t=!0)=>Object.fromEntries(Object.entries(e).map(([r,o])=>{if(Ee.isObject(o)&&t)return[r,Xp(o,!1)];if(Ee.isFunction(o)){let n=o();if(Ee.isObject(n)&&"value"in n&&["validate","type","skipEqual"].some(s=>s in n))return[r,n.value]}return[r,o]})),Kp=(e,t,r,o=!0)=>Object.fromEntries(Object.entries(e).map(([n,s])=>{if(Ee.isObject(s)&&o)return[n,Kp(s,t,r,!1)];if(Ee.isFunction(s)){let i=s();if(Ee.isObject(i)&&"value"in i&&t in i){let a=Ee.isString(i[t])?i[t].toUpperCase():i[t];return[n,a]}}return[n,r]})),Qp=({data:e,depth:t,logStyle:r})=>t>2?(rl(t,r),{}):Xp(e),Yo=({data:e,prop:t,depth:r,logStyle:o,fallback:n})=>r>2?(rl(r,o),{}):Kp(e,t,n),Zp=({value:e})=>Le(Map,e)?new Map(e):Le(Set,e)?new Set(e):Le(Object,e)?{...e}:Le(Array,e)?[...e]:e,Xo=({instanceId:e,prop:t})=>{let r=re(e);if(!r)return!1;let{callBackComputed:o}=r,n=[...o].some(({prop:s})=>t===s);return n&&console.warn(`${t} is used as computed, explicit set is disallowed.`),n};var $C=({instanceId:e,prop:t,val:r,fireCallback:o=!0,useStrict:n=!0,initalizeStep:s=!1})=>{let i=re(e);if(!i)return;let{type:a,fnTransformation:c,store:l,fnValidate:p,strict:d,validationStatusObject:f,skipEqual:h,callBackWatcher:y,bindInstanceBy:b}=i,T=Be(),_=a[t]==="ANY";if(Ee.isObject(r)&&!_){Dp(t,r,T);return}if(Ee.isObject(l[t])&&!_){Fp(t,T);return}let S=l[t],E=c[t]?.(r,S)??r;if(!Le(a[t],E)){Bp(t,E,a[t],T);return}let I=p[t]?.(E,S);!I&&s&&nl(t,T),!(d[t]&&!I&&n||(f[t]=I,(h[t]?Yc(a[t],S,E):!1)&&!s))&&(l[t]=E,Pe(e,{...i,store:l,validationStatusObject:f}),o&&!s&&(qo({callBackWatcher:y,prop:t,newValue:E,oldValue:S,validationValue:f[t],instanceId:e}),Tr({instanceId:e,prop:t}),b.forEach(P=>{Tr({instanceId:P,prop:t})})))},LC=({instanceId:e,prop:t,val:r,fireCallback:o=!0,useStrict:n=!0,initalizeStep:s=!1})=>{let i=re(e);if(!i)return;let{store:a,type:c,strict:l,fnTransformation:p,fnValidate:d,validationStatusObject:f,skipEqual:h,callBackWatcher:y,bindInstanceBy:b}=i,T=Be();if(!Ee.isObject(r)){Vp(t,r,T);return}if(!Ee.isObject(a[t])){Wp(t,T);return}let _=Object.keys(r),S=Object.keys(a[t]);if(!_.every(w=>S.includes(w))){jp(_,t,T);return}let C=Object.fromEntries(Object.entries(r).map(w=>{let[O,D]=w,x=a[t][O];return[O,p[t][O]?.(D,x)??D]}));if(!Object.entries(C).map(w=>{let[O,D]=w,x=Le(c[t][O],D);return x||zp(t,O,D,c[t][O],T),x}).every(w=>w===!0))return;let M=Object.entries(C).map(w=>{let[O,D]=w,x=a[t][O];return l[t][O]&&n?{strictCheck:d[t][O]?.(D,x),item:w}:{strictCheck:!0,item:w}}).filter(({strictCheck:w})=>w===!0);if(M.length===0)return;let k=Object.fromEntries(M.map(({item:w})=>w).map(([w,O])=>[w,O]));Object.entries(k).forEach(w=>{let[O,D]=w,x=a[t][O],N=d[t][O]?.(D,x);!N&&s&&nl(t,T),N===void 0&&Jp(T,"ANY"),f[t][O]=N});let A=a[t],R={...a[t],...k};Object.keys(k).every(w=>h[t][w]===!0)&&Object.entries(R).every(([w,O])=>{let D=c[t][w]==="ANY";if(ps(O)>1&&!D){Hp(t,C,T);return}return Yc(c[t][w],A[w],O)})&&!s||(a[t]=R,Pe(e,{...i,store:a,validationStatusObject:f}),o&&!s&&(qo({callBackWatcher:y,prop:t,newValue:a[t],oldValue:A,validationValue:f[t],instanceId:e}),Tr({instanceId:e,prop:t}),b.forEach(w=>{Tr({instanceId:w,prop:t})})))},Sr=({instanceId:e,prop:t,value:r,fireCallback:o=!0,clone:n=!1,useStrict:s=!0,action:i,initalizeStep:a=!1})=>{let c=re(e);if(!c)return;let{store:l,type:p}=c;if(!l)return;let d=Be();if(!(t in l)){Lp(t,d);return}let f=n?Zp({value:l[t]}):l[t],h=i===hi?r(f):r,y=p[t]==="ANY";if(Ee.isObject(f)&&!y){LC({instanceId:e,prop:t,val:h,fireCallback:o,useStrict:s,initalizeStep:a});return}$C({instanceId:e,prop:t,val:h,fireCallback:o,useStrict:s,initalizeStep:a})},em=({instanceId:e,prop:t,value:r})=>{let o=re(e);if(!o)return;let{store:n,callBackWatcher:s}=o,i=n[t];n[t]=r,Pe(e,{...o,store:n}),qo({callBackWatcher:s,prop:t,newValue:r,oldValue:i,validationValue:!0,instanceId:e})},tm=({store:e,bindInstance:t})=>t.reduce((r,o)=>{let n=re(o);if(!n)return r;let{store:s}=n;return{...r,...s}},e),DC=e=>{let t=re(e);if(!t)return;let{computedPropsQueque:r,callBackComputed:o,store:n,bindInstance:s}=t,i=[...o??[]].filter(({keys:l})=>[...r].find(p=>l.includes(p))),a=tm({store:n,bindInstance:s}),c=i.map(({prop:l,keys:p,fn:d})=>{let f=Object.fromEntries(p.map(h=>[h,a[h]]));return{prop:l,value:d(f)}});Pe(e,{...t,computedPropsQueque:new Set,computedRunning:!1}),c.forEach(({prop:l,value:p})=>{Sr({instanceId:e,prop:l,value:p,action:"SET"})})},Tr=({instanceId:e,prop:t})=>{let r=re(e);if(!r)return;let{callBackComputed:o,computedPropsQueque:n,computedRunning:s}=r;if(!(!o||o.size===0)&&(n.add(t),Pe(e,{...r,computedPropsQueque:n}),!s)){let i=re(e);if(!i)return;Pe(e,{...i,computedRunning:!0}),Ft(()=>DC(e))}},FC=({instanceId:e,prop:t,keys:r,fn:o})=>{let n=re(e);if(!n)return;let{callBackComputed:s}=n,i=[...s].reduce((a,{prop:c,keys:l})=>l.includes(t)&&r.includes(c)&&!a,!1);if(r.includes(t)||i){Gp(r,Be());return}s.add({prop:t,keys:r,fn:o}),Pe(e,{...n,callBackComputed:s})},BC=({instanceId:e,prop:t,keys:r,callback:o})=>{let n=re(e);if(!n)return;let{store:s,bindInstance:i}=n,a=tm({store:s,bindInstance:i}),c=Object.fromEntries(r.map(p=>{if(p in a)return[p,a[p]]}).filter(p=>p!==void 0)),l=o(c);Sr({instanceId:e,prop:t,value:l,fireCallback:!1,clone:!1,action:"SET"})},rm=({instanceId:e,prop:t,keys:r,callback:o})=>{let n=r.length===0?(us(),o({}),Xc()):r;BC({instanceId:e,prop:t,keys:n,callback:o}),FC({instanceId:e,prop:t,keys:n,fn:o})};var om=e=>{let{store:t}=e,r=Object.entries(t).reduce((o,n)=>{let[s,i]=n;return Ee.isObject(i)?{...o,[s]:{}}:o},{});return{...e,validationStatusObject:r}},nm=(e,t)=>{let{store:r}=t;Object.entries(r).forEach(o=>{let[n,s]=o;Sr({instanceId:e,prop:n,value:s,fireCallback:!1,useStrict:!1,action:"SET",initalizeStep:!0})})};var VC=({state:e,prop:t,callback:r,wait:o})=>{let{store:n,callBackWatcher:s}=e,i=Be();if(!n)return{state:void 0,unsubscribeId:""};if(!(t in n))return qp(t,i),{state:void 0,unsubscribeId:""};let a=ke();return s.set(a,{fn:r,prop:t,wait:o}),{state:{...e,callBackWatcher:s},unsubscribeId:a}},WC=({instanceId:e,unsubscribeId:t})=>{let r=re(e);if(!r)return;let{callBackWatcher:o}=r;o&&(o.delete(t),Pe(e,{...r,callBackWatcher:o}))},sm=({instanceId:e,prop:t,callback:r,wait:o})=>{let n=re(e);if(!n)return()=>{};let{state:s,unsubscribeId:i}=VC({state:n,prop:t,callback:r,wait:o});return s?(Pe(e,s),()=>{WC({instanceId:e,unsubscribeId:i})}):()=>{}},im=({instanceId:e,prop:t,callback:r,wait:o})=>{let n=re(e);if(!n)return()=>{};let{bindInstance:s,unsubscribeBindInstance:i}=n;if(!s||s.length===0)return sm({instanceId:e,prop:t,callback:r,wait:o});let a=[e,...s].find(p=>{let d=re(p)?.store;return d&&t in d})??"",c=sm({instanceId:a,prop:t,callback:r,wait:o}),l=re(e);return l?(Pe(e,{...l,unsubscribeBindInstance:[...i,c]}),()=>{c();let p=re(e);p&&Pe(e,{...p,unsubscribeBindInstance:i.filter(d=>d!==c)})}):()=>{}};var am=e=>{let t=ps(e);return{callBackWatcher:new Map,callBackComputed:new Set,computedPropsQueque:new Set,validationStatusObject:{},dataDepth:t,computedRunning:!1,store:Qp({data:e,depth:t,logStyle:Be()}),type:Yo({data:e,prop:"type",depth:t,logStyle:Be(),fallback:Jc}),fnTransformation:Yo({data:e,prop:"transform",depth:t,logStyle:Be(),fallback:r=>r}),fnValidate:Yo({data:e,prop:"validate",depth:t,logStyle:Be(),fallback:()=>!0}),strict:Yo({data:e,prop:"strict",depth:t,logStyle:Be(),fallback:!1}),skipEqual:Yo({data:e,prop:"skipEqual",depth:t,logStyle:Be(),fallback:!0}),proxiObject:void 0,bindInstance:[],bindInstanceBy:[],unsubscribeBindInstance:[],proxiReadOnlyProp:new Set}};var cm=e=>{let t=re(e);if(!t)return{};let{store:r}=t;return r??{}},um=e=>{let t=re(e);if(!t)return{};let{bindInstance:r}=t;return!r||r.length===0?cm(e):Object.fromEntries([...r,e].flatMap(o=>Object.entries(cm(o))))},lm=({instanceId:e,prop:t})=>{let r=re(e);if(!r)return;let o=r?.store;if(o&&t in o)return o[t];Up(t,Be())},pm=({instanceId:e,prop:t})=>{let r=re(e);if(!r)return;let{bindInstance:o}=r;if(!o||o.length===0)return lm({instanceId:e,prop:t});let n=[e,...o].find(s=>{let i=Ue.get(s)?.store;return i&&t in i})??"";return lm({instanceId:n,prop:t})};var mm=({instanceId:e,prop:t})=>{let r=re(e);if(!r)return;let{store:o,callBackWatcher:n,validationStatusObject:s,bindInstanceBy:i}=r;o&&(t in o?(qo({callBackWatcher:n,prop:t,newValue:o[t],oldValue:o[t],validationValue:s[t],instanceId:e}),Tr({instanceId:e,prop:t}),i.forEach(a=>{Tr({instanceId:a,prop:t})})):ol(t,Be()))},yi=({instanceId:e,prop:t})=>{let r=re(e);if(!r)return;let{bindInstance:o}=r;if(!o||o.length===0){mm({instanceId:e,prop:t});return}let n=[e,...o].find(s=>{let i=Ue.get(s)?.store;return i&&t in i})??"";mm({instanceId:n,prop:t})},dm=async({instanceId:e,prop:t})=>{let r=re(e);if(!r)return new Promise(a=>a(""));let{store:o,callBackWatcher:n,validationStatusObject:s,bindInstanceBy:i}=r;return o?t in o?(await Op({callBackWatcher:n,prop:t,newValue:o[t],oldValue:o[t],validationValue:s[t],instanceId:e}),Tr({instanceId:e,prop:t}),i.forEach(a=>{Tr({instanceId:a,prop:t})}),{success:!0}):(ol(t,Be()),{success:!1}):{success:!1}},hm=async({instanceId:e,prop:t})=>{let r=re(e);if(!r)return new Promise(s=>s(""));let{bindInstance:o}=r;if(!o||o.length===0)return dm({instanceId:e,prop:t});let n=[e,...o].find(s=>{let i=Ue.get(s)?.store;return i&&t in i})??"";return dm({instanceId:n,prop:t})};var fm=({instanceId:e})=>{let t=re(e);if(!t)return;let{validationStatusObject:r}=t;return r},gm=({instanceId:e})=>{let t=re(e);if(!t)return;let{store:r}=t;console.log(r)},bm=({instanceId:e})=>{let t=re(e);if(!t)return;let{validationStatusObject:r}=t;console.log(r)},vm=({instanceId:e})=>{let t=re(e);console.log(t)};var ym=({instanceId:e})=>{let t=Be(),r=Ue.get(e);if(!r)return{};let{bindInstance:o,proxiObject:n,proxiReadOnlyProp:s}=r;if(n)return n;let i=r?.store,a=new Proxy(i,{set(p,d,f){let h=vi()?Ue.get(e)?.store??p:p;if(!h)return!1;if(d in h){let y=Xo({instanceId:e,prop:d}),b=s.has(d);return b&&Yp(d,t),y||b?!1:(Sr({instanceId:e,prop:d,value:f,fireCallback:!0,clone:!1,action:"SET"}),!0)}return!1},get(p,d){let f=vi()?Ue.get(e)?.store??p:p;return!f||!(d in f)?!1:(gi(d),f[d])}});if(!o||o.length===0)return Pe(e,{...r,proxiObject:a}),a;let c=o.map(p=>{let f=Ue.get(p)?.store??{};return new Proxy(f,{set(){return!1},get(h,y){let b=vi()?Ue.get(p)?.store??h:h;return!b||!(y in b)?!1:(gi(y),b[y])}})}),l=new Proxy([a,...c],{set(p,d,f){let h=p.find(y=>d in y);return h?(Reflect.set(h,d,f),!0):!1},get(p,d){let f=p.find(h=>d in h);return f?Reflect.get(f,d):!1}});return Pe(e,{...r,proxiObject:l}),l};var jC=({selfId:e,bindId:t})=>{let r=re(t);if(!r)return;let{bindInstanceBy:o}=r,n=[...o,e];Pe(t,{...r,bindInstanceBy:n})},Tm=({selfId:e,bindId:t})=>{let r=re(t);if(!r)return;let{bindInstanceBy:o}=r,n=o.filter(s=>s!==e);Pe(t,{...r,bindInstanceBy:n})},HC=({bindStores:e,selfStore:t})=>{let o=[...Le(Array,e)?e.map(n=>n.get()):[e.get()],t.store];o.forEach((n,s)=>{o.forEach((i,a)=>{if(s<=a)return;let c=Object.keys(n).filter(l=>Object.keys(i).includes(l));c.length>0&&console.warn(`bindStore: prop conflict on following prop: '${c}', bind store key must be univoque'`)})})},Sm=({value:e,instanceId:t})=>{let r=re(t);if(!r)return;HC({bindStores:e,selfStore:r});let{bindInstance:o}=r;if(!o)return;let n=Le(Array,e)?e.map(i=>i.getId()):[e.getId()],s=[...o,...n];Pe(t,{...r,bindInstance:s}),n.forEach(i=>{jC({selfId:t,bindId:i})})};var _m=e=>{let t=Ue.get(e);if(!t)return;t.callBackWatcher.clear(),t.callBackComputed.clear(),t.computedPropsQueque.clear(),t.store={},t.proxiObject=null;let{unsubscribeBindInstance:r,bindInstance:o}=t;r.forEach(n=>{n?.()}),o.forEach(n=>{Tm({selfId:e,bindId:n})}),$p(e)};var xm=({instanceId:e,values:t})=>{let r=re(e);if(!r)return;let{proxiReadOnlyProp:o}=r;t.forEach(n=>{o.add(n)}),Pe(e,r)};var Ti=(e={})=>{let t=ke(),r=am(e),o=om(r);return Pe(t,o),nm(t,r),{getId:()=>t,bindStore:n=>{Sm({value:n,instanceId:t})},get:()=>um(t),getProp:n=>pm({instanceId:t,prop:n}),set:(n,s,{emit:i=!0,usePropAsString:a=!1}={})=>{let c=a?n:Vr(n);Xo({instanceId:t,prop:c})||Sr({instanceId:t,prop:c,value:s,fireCallback:i??!0,clone:!1,action:"SET"})},update:(n,s,{emit:i=!0,clone:a=!1,usePropAsString:c=!1}={})=>{let l=c?n:Vr(n);Xo({instanceId:t,prop:l})||Sr({instanceId:t,prop:l,value:s,fireCallback:i??!0,clone:a,action:hi})},getProxi:()=>ym({instanceId:t}),quickSetProp:(n,s)=>{Xo({instanceId:t,prop:n})||em({instanceId:t,prop:n,value:s})},watch:(n,s,{wait:i=!1,immediate:a=!1}={})=>{let c=Vr(n),l=im({instanceId:t,prop:c,callback:s,wait:i});return a&&Ft(()=>{yi({instanceId:t,prop:c})}),l},computed:(n,s,i=[],{usePropAsString:a=!1}={})=>{let c=a?n:Vr(n),l=Qc(i);rm({instanceId:t,prop:c,keys:l,callback:s}),Ft(()=>{yi({instanceId:t,prop:c})})},emit:n=>{let s=Vr(n);yi({instanceId:t,prop:s})},emitAsync:async n=>{let s=Vr(n);return hm({instanceId:t,prop:s})},setProxiReadOnlyProp:n=>{xm({instanceId:t,values:n})},getValidation:()=>fm({instanceId:t}),debug:()=>{vm({instanceId:t})},debugStore:()=>{gm({instanceId:t})},debugValidate:()=>{bm({instanceId:t})},destroy:()=>{_m(t)}}};var Se=Ti({usePassive:()=>({value:!1,type:Boolean}),currentFrame:()=>({value:0,type:Number}),instantFps:()=>({value:60,type:Number}),requestFrame:()=>({value:()=>{},type:Function}),deferredNextTick:()=>({value:!0,type:Boolean}),throttle:()=>({value:60,type:Number}),spinYMaxValue:()=>({value:2.5,type:Number}),spinXMaxValue:()=>({value:2.5,type:Number})});var sl=!1,ms=new Map;function Cm(){if(ms.size===0){globalThis.removeEventListener("DOMContentLoaded",Cm),sl=!1;return}for(let e of ms.values())e();ms.clear()}function zC(){sl||(sl=!0,globalThis.addEventListener("DOMContentLoaded",Cm,{passive:!1}))}var UC=e=>{let t=ke();return ms.set(t,e),typeof globalThis<"u"&&zC(),()=>ms.delete(t)},Em=UC;function Si(e){let t=0,r=0,o=0,n=0;return"detail"in e&&(r=e.detail),"wheelDelta"in e&&(r=-e.wheelDelta/120),"wheelDeltaY"in e&&(r=-e.wheelDeltaY/120),"wheelDeltaX"in e&&(t=-e.wheelDeltaX/120),"axis"in e&&e.axis===e.HORIZONTAL_AXIS&&(t=r,r=0),o=t*10,n=r*10,"deltaY"in e&&(n=e.deltaY),"deltaX"in e&&(o=e.deltaX),(o||n)&&e.deltaMode&&(e.deltaMode==1?(o*=40,n*=40):(o*=800,n*=800)),o&&!t&&(t=o<1?-1:1),n&&!r&&(r=n<1?-1:1),{spinX:t,spinY:r,pixelX:o,pixelY:n}}function GC({type:e,event:t}){let r=t;return e==="touchend"&&"changedTouches"in t?r.changedTouches[0]:"touches"in r?r.touches[0]:t}function qC({type:e,event:t}){let r=t;return e==="touchend"&&"changedTouches"in t?r.changedTouches[0]:"touches"in r?r.touches[0]:t}function jr(e){let t=!1,r=new Map,{usePassive:o}=Se.get();Se.watch("usePassive",()=>{globalThis.removeEventListener(e,n),t=!1,s()});function n(a){if(r.size===0){globalThis.removeEventListener(e,n),t=!1;return}let c=a.type,{pageX:l,pageY:p}=GC({type:c,event:a}),{clientX:d,clientY:f}=qC({type:c,event:a}),h=a.target,y={page:{x:l,y:p},client:{x:d,y:f},target:h,type:c,preventDefault:()=>o?()=>{}:a.preventDefault()};if(c==="wheel"){let b=Se.getProp("spinYMaxValue"),T=Se.getProp("spinXMaxValue"),{spinX:_,spinY:S,pixelX:E,pixelY:C}=Si(a);Object.assign(y,{spinX:qc(_,-T,T),spinY:qc(S,-b,b),pixelX:E,pixelY:C})}for(let b of r.values())b(y)}function s(){t||(t=!0,o=Se.getProp("usePassive"),globalThis.addEventListener(e,n,{passive:o}))}return a=>{let c=ke();return r.set(c,a),typeof globalThis<"u"&&s(),()=>r.delete(c)}}var wm=jr("click"),Im=jr("mousedown"),Mm=jr("touchstart"),km=jr("mousemove"),Rm=jr("touchmove"),Nm=jr("mouseup"),Pm=jr("touchend"),Am=jr("wheel");var Co=0,Xe=new Map,JC=(e={},t=()=>{})=>{let r=ke();return Xe.set(r,{el:e,fn:t,data:new Map,freeze:{active:!1,atFrame:0}}),{id:r,unsubscribe:()=>{if(Xe.has(r)){let o=Xe.get(r);if(!o)return;let n=o.data.size;if(Xe.delete(r),!n)return;Co=Co-n}}}},YC=({id:e,callBackObject:t,frame:r})=>{if(!Xe.has(e))return;let{currentFrame:o}=Se.get(),n=Xe.get(e);if(!n?.data)return;let{data:s}=n;s.has(r+o)||(s.set(r+o,t),Co++)},XC=e=>{Xe.has(e)&&Xe.delete(e)},KC=e=>{let t=Xe.get(e);if(!t||t.freeze.active)return;let{currentFrame:r}=Se.get();t.freeze={active:!0,atFrame:r}},QC=({id:e,update:t=!0})=>{let r=Xe.get(e);if(!r||!r.freeze.active)return;if(!t){r.freeze={active:!1,atFrame:0};return}let{currentFrame:o}=Se.get(),{atFrame:n}=r.freeze,s=[];for(let[i,a]of r.data){let c=i+o-n;r.data.delete(i),s.push({frame:c,value:a})}s.forEach(({frame:i,value:a})=>{r.data.set(i,a)}),s.length=0,r.freeze={active:!1,atFrame:0}},ZC=e=>{let t=Xe.get(e);if(!t)return;let r=t.data.size;Co=Co-r,t.data.clear()},eE=e=>Xe.get(e)??{},tE=e=>{for(let t of Xe.values()){let{data:r,fn:o,el:n,freeze:s}=t,i=r.get(e);i&&!s.active&&(o(i,n),r.delete(e),Co--)}},rE=({id:e,obj:t={}})=>{if(!Xe.has(e))return;let r=Xe.get(e);if(!r)return;let{el:o,fn:n,freeze:s}=r;s.active||n(t,o)},oE=()=>Co,nE=e=>{for(let[t,r]of Xe){let{data:o,fn:n,el:s,freeze:i}=r,a=new Map;for(let[c,l]of o)a.set(c-e,l),o.delete(c);Xe.set(t,{data:a,fn:n,el:s,freeze:i})}},Ko={add:JC,get:eE,update:YC,remove:XC,clean:ZC,fire:tE,fireObject:rE,getCacheCounter:oE,updateFrameId:nE,freeze:KC,unFreeze:QC};var il=!1,_i=new Map;function Om(){if(_i.size===0){globalThis.removeEventListener("visibilitychange",Om),il=!1;return}let e={visibilityState:document.visibilityState};for(let t of _i.values())t(e)}function sE(){il||(il=!0,globalThis.addEventListener("visibilitychange",Om,{passive:!1}))}var iE=e=>{let t=ke();return _i.set(t,e),typeof globalThis<"u"&&sE(),()=>_i.delete(t)},xi=iE;var ds=[],aE=(e=()=>{},t=100)=>{ds.push({cb:e,priority:t})},cE=({time:e,fps:t})=>{ds.length!==0&&(ds.sort((r,o)=>r.priority-o.priority),ds.forEach(({cb:r})=>r({time:e,fps:t})),ds.length=0)},It={add:aE,fire:cE};var al=[],lE=e=>{al.push(e)},uE=()=>{let e=[...al];return al.length=0,e},Qo={add:lE,get:uE};var Hr=new Map,pE=e=>{let t=[...Hr.entries()];Hr.clear(),t.forEach(([r,o])=>{Hr.set(r-e,o)})},mE=({currentFrame:e,time:t,fps:r})=>{let o=Hr.get(e)??[];!o||o.length===0||(o.forEach(n=>n({time:t,fps:r})),Hr.delete(e))},dE=(e,t)=>{let r=t+Se.getProp("currentFrame"),o=Hr.get(r)??[];Hr.set(r,[...o,e]),Se.emit("requestFrame")},hE=()=>Hr.size,Zo={add:dE,fire:mE,updateKeys:pE,getAmountOfFrameToFire:hE};var cl="animationStop",$m=()=>{globalThis.addEventListener("unhandledrejection",e=>{e.reason===cl&&e.preventDefault()})};var Lm=!1,Ci=({force:e=!1,duration:t=30}={})=>{if(Lm&&!e){let{instantFps:r}=Se.get();return new Promise(o=>{o({averageFPS:r})})}return new Promise(r=>{let o=[],s=0,i=0,a=0,c=0,l=0,p=d=>{if(d*=.001,c===0){c=d,requestAnimationFrame(p);return}let f=d-c;c=d;let h=Number.isFinite(1/f)?1/f:60,y=Math.max(h,60);a+=y-(o[s]||0),o[s++]=y,i=Math.max(i,s),s%=25;let b=Math.round(a/i);if(l++,l>=t){Se.quickSetProp("instantFps",b),Lm=!0,r({averageFPS:b});return}requestAnimationFrame(p)};requestAnimationFrame(p)})};Ci();var ll=1e7,Vm=2e3,dl=!1,zr=[],Ke=Xt(),Dm=0,ul=0,pl=0,hl=0,ml=0,en=!1,ot=60,ki=ot,Ei=0,wi=0,_r=0,Ii=!1,Mi=!1,fE=()=>ot<ki/5*3,gE=()=>ot<ki/5*4,bE=()=>{!fE()||Ii||(Ii=!0,setTimeout(()=>{Ii=!1},4e3))},vE=()=>{!gE()||Mi||(Mi=!0,setTimeout(()=>{Mi=!1},4e3))};xi(({visibilityState:e})=>{en=e==="visible"});$m();Se.watch("requestFrame",()=>{Ri()});var Fm=()=>{_r===ll&&(_r=0,Se.quickSetProp("currentFrame",_r),Zo.updateKeys(ll),Ko.updateFrameId(ll)),It.fire({time:Ke,fps:ot}),zr=[...zr,...Qo.get()],dl=!1,zr.length>0||Zo.getAmountOfFrameToFire()>0||Ko.getCacheCounter()>0||Ke<Vm?Ri():(en=!0,_r=0,hl=Ke,Se.quickSetProp("currentFrame",_r))},Bm=e=>{Ke=e,pl=Ke-ul,en&&(Dm+=pl),ul+=pl,Ke=Math.round(ul-Dm);let t=Math.round(1e3/ot);ml=Math.abs(Ke-hl-t);let r=ml>100?ml:0;Ke=Ke-r,hl=Ke,en?(wi=Ke,Ei=0,ot=Se.getProp("instantFps")):Ei++,Ke>wi+1e3&&!en&&(ot=Ke>Vm?Math.round(Ei*1e3/(Ke-wi)):Se.getProp("instantFps"),wi=Ke,Ei=0,ot=ot<30?Se.getProp("instantFps"):ot),ot>ki&&(ki=ot),bE(),vE(),zr.forEach(n=>n({time:Ke,fps:ot})),Zo.fire({currentFrame:_r,time:Ke,fps:ot}),Ko.fire(_r),_r++,Se.quickSetProp("currentFrame",_r),zr.length=0,en=!1,Se.getProp("deferredNextTick")?Ft(()=>Fm()):Fm()},Ri=()=>{dl||(typeof globalThis>"u"?setTimeout(()=>Bm(Xt()),xp):requestAnimationFrame(Bm),dl=!0)},Bt={add:s=>{zr.push(s),Ri()},addMultiple:(s=[])=>{zr=[...zr,...s],Ri()},getFps:()=>ot,mustMakeSomething:()=>Ii,shouldMakeSomething:()=>Mi};var fl=!1,Ni=new Map,gl=()=>{},Wm=window.innerHeight,jm=window.innerWidth;function yE(){if(Ni.size===0){window.removeEventListener("resize",gl),fl=!1;return}let e=window.innerHeight,t=window.innerWidth,r=e!==Wm,o=t!==jm;Wm=e,jm=t;let n={scrollY:window.scrollY,windowsHeight:e,windowsWidth:t,documentHeight:document.documentElement.scrollHeight,verticalResize:r,horizontalResize:o};for(let s of Ni.values())s(n)}function TE(){fl||(fl=!0,gl=_o(()=>yE()),window.addEventListener("resize",gl,{passive:!1}))}var SE=e=>{let t=ke();return Ni.set(t,e),typeof globalThis<"u"&&TE(),()=>Ni.delete(t)},Hm=SE;var bl=!1,Pi=new Map,_E="UP",Gm="DOWN",zm=window.scrollY,hs=window.scrollY,vl=Gm,Um={scrollY:hs,direction:vl};function qm(){if(Pi.size===0){window.removeEventListener("scroll",qm),bl=!1;return}zm=hs,hs=window.scrollY,vl=hs>zm?Gm:_E,Um={scrollY:hs,direction:vl};for(let e of Pi.values())e(Um)}function xE(){bl||(bl=!0,window.addEventListener("scroll",qm,{passive:!0}))}var CE=e=>{let t=ke();return Pi.set(t,e),typeof globalThis<"u"&&xE(),()=>Pi.delete(t)},xr=CE;var yl=!1,Ai=new Map,Jm=()=>{};function EE(e){if(Ai.size===0){Jm(),yl=!1;return}Bt.add(()=>{It.add(()=>{for(let t of Ai.values())t(e)},0)})}function wE(){yl||(yl=!0,Jm=xr(EE))}var IE=e=>{let t=ke();return Ai.set(t,e),typeof globalThis<"u"&&wE(),()=>Ai.delete(t)},Ym=IE;var Tl=!1,Oi=new Map,Xm,Km=()=>{};function ME(e){if(Oi.size===0){Km(),Tl=!1;return}Bt.add(()=>{It.add(()=>{for(let t of Oi.values())t(e)},0)})}function kE(){Tl||(Tl=!0,Xm=pi(e=>ME(e),Se.getProp("throttle")),Km=xr(Xm))}var RE=e=>{let t=ke();return Oi.set(t,e),typeof globalThis<"u"&&kE(),()=>Oi.delete(t)},Qm=RE;var Zm=()=>{},ed=()=>{},td=()=>{};function rd(e){let t=!1,r=new Map,o=!1;function n(){if(o=!1,r.size===0){ed(),e==="START"&&Zm(),t=!1;return}Bt.add(()=>{It.add(()=>{let a={scrollY:window.scrollY};if(e==="END")for(let c of r.values())c(a)},0)})}function s(){t||(t=!0,td=_o(()=>n()),ed=xr(td),e==="START"&&(Zm=xr(({scrollY:a})=>{let c={scrollY:a};if(!o){o=!0;for(let l of r.values())l(c)}})))}return a=>{let c=ke();return r.set(c,a),typeof globalThis<"u"&&s(),()=>r.delete(c)}}var od=rd("START"),nd=rd("END");function tn(e){let t=!1,r=new Map;function o(i){if(r.size===0){globalThis.removeEventListener(e,o),t=!1;return}for(let a of r.values())a(i)}function n(){t||(t=!0,globalThis.addEventListener(e,o))}return i=>{let a=ke();return r.set(a,i),typeof globalThis<"u"&&n(),()=>r.delete(a)}}var sd=tn("pointerover"),id=tn("pointerdown"),ad=tn("pointermove"),cd=tn("pointerup"),ld=tn("pointerout"),ud=tn("pointerleave");var Ve=Symbol("LinkedList.setNext"),We=Symbol("LinkedList.setPrev"),$i="after",Sl="before",rn=class{#n=null;#t=null;constructor(t){this.data=t}get next(){return this.#n}[Ve](t){this.#n=t}get prev(){return this.#t}[We](t){this.#t=t}dispose(){this.data=null,this.#n=null,this.#t=null}},on=class e{#n=null;#t=null;#i=0;#l=new WeakSet;addLast(t){let r=new rn(t);return this.#l.add(r),this.#n?(this.#t&&this.#t[Ve](r),r[We](this.#t),this.#t=r,this.#i++,this):(this.#n=r,this.#t=r,this.#i++,this)}addFirst(t){let r=new rn(t);return this.#l.add(r),this.#n?(r[Ve](this.#n),this.#n[We](r),this.#n=r,this.#i++,this):(this.#n=r,this.#t=r,this.#i++,this)}removeNode(t){return!t||!this.#l.has(t)?this:t===this.#n?this.removeFirst():t===this.#t?this.removeLast():(t.prev&&t.prev[Ve](t.next),t.next&&t.next[We](t.prev),t.dispose(),this.#i--,this)}removeFirst(){if(this.#n===null)return this;let t=this.#n;return this.#n=this.#n.next,this.#n&&this.#n[We](null),this.#n===null&&(this.#t=null),t.dispose(),this.#i--,this}removeLast(){if(this.#t===null)return this;let t=this.#t;return this.#t=this.#t.prev,this.#t&&this.#t[Ve](null),this.#t===null&&(this.#n=null),t.dispose(),this.#i--,this}insertAfter(t,r){if(!t||!this.#l.has(t))return this;let o=new rn(r);return this.#l.add(o),o[We](t),o[Ve](t.next),t.next&&t.next[We](o),t[Ve](o),t===this.#t&&(this.#t=o),this.#i++,this}insertBefore(t,r){if(!t||!this.#l.has(t))return this;let o=new rn(r);return this.#l.add(o),o[Ve](t),o[We](t.prev),t.prev&&t.prev[Ve](o),t[We](o),t===this.#n&&(this.#n=o),this.#i++,this}move(t,r,o=$i){return!this.#l.has(t)||!this.#l.has(r)?this:t===r?this:o===$i&&r.next===t?this:o===Sl&&r.prev===t?this:(t.prev&&t.prev[Ve](t.next),t.next&&t.next[We](t.prev),t===this.#n&&(this.#n=t.next),t===this.#t&&(this.#t=t.prev),o==$i&&(t[We](r),t[Ve](r.next),r.next&&r.next[We](t),r[Ve](t),r===this.#t&&(this.#t=t)),o==Sl&&(t[We](r.prev),t[Ve](r),r.prev&&r.prev[Ve](t),r[We](t),r===this.#n&&(this.#n=t)),this)}moveAfter(t,r){return this.move(t,r,$i)}moveBefore(t,r){return this.move(t,r,Sl)}swap(t,r){if(!this.#l.has(t)||!this.#l.has(r))return this;if(t===r)return this;if(t.next===r)return this.moveAfter(t,r);if(r.next===t)return this.moveAfter(r,t);let o=t.prev,n=t.next,s=r.prev,i=r.next,a=t===this.#n,c=t===this.#t,l=r===this.#n,p=r===this.#t;return o&&o[Ve](n),n&&n[We](o),s&&s[Ve](i),i&&i[We](s),t[We](s),t[Ve](i),r[We](o),r[Ve](n),s&&s[Ve](t),i&&i[We](t),o&&o[Ve](r),n&&n[We](r),a?this.#n=r:l&&(this.#n=t),c?this.#t=r:p&&(this.#t=t),this}find(t){let r=this.#n,o;for(;r!==null;){if(t(r)){o=r;break}r=r.next}return o}filter(t){let r=this.#n,o=new e,n=0;for(;r!==null;)t(r,n)&&o.addLast(r.data),r=r.next,n++;return o}map(t){let r=this.#n,o=new e,n=0;for(;r!==null;)o.addLast(t(r,n)),r=r.next,n++;return o}*[Symbol.iterator](){let t=this.#n;for(;t;)yield t,t=t.next}traverse(t){let r=this.#n;for(;r!==null;)t(r),r=r.next;return this}async traverseAsync(t){let r=this.#n;for(;r!==null;)await t(r),r=r.next;return this}traverseReverse(t){let r=this.#t;for(;r!==null;)t(r),r=r.prev;return this}async traverseReverseAsync(t){let r=this.#t;for(;r!==null;)await t(r),r=r.prev;return this}execute(t){return t(this),this}async executeAsync(t){return await t(this),this}print(){let t=this.#n,r=[];for(;t!==null;)r.push(t.data),t=t.next;return console.log(r),this}clear(){let t=this.#n,r=[];for(;t!==null;)r.push(t),t=t.next;for(let o of r)o.dispose();return this.#n=null,this.#t=null,this.#i=0,r.length=0,this}reverse(){let t=this.#n;for(this.#n=this.#t,this.#t=t;t!==null;){let r=t.next,o=t.prev;t[Ve](o),t[We](r),t=r}return this}toArray(){let t=[],r=this.#n;for(;r!==null;)t.push(r.data),r=r.next;return t}toArrayReverse(){let t=[],r=this.#t;for(;r!==null;)t.push(r.data),r=r.prev;return t}get first(){return this.#n}get last(){return this.#t}get size(){return this.#i}};function NE(e){return Ti(e)}function PE(){return Se.getProp("instantFps")}function AE(){return Bt.getFps()}function OE(){return Bt.mustMakeSomething()}function $E(){return Bt.shouldMakeSomething()}function LE(e=()=>{}){return Bt.add(e)}function DE(e=()=>{}){return It.add(e)}function FE(e=()=>{}){return Qo.add(e)}function BE(e=()=>{},t=0){return Zo.add(e,t)}async function VE({force:e=!1,duration:t=30}={}){return await Ci({force:e,duration:t})}function WE(e=()=>{}){return Em(e)}var jE=Ko;function HE(e=()=>{}){return Hm(e)}function zE(e=()=>{}){return xi(e)}function UE(e=()=>{}){return wm(e)}function GE(e=()=>{}){return Im(e)}function qE(e=()=>{}){return Mm(e)}function JE(e=()=>{}){return km(e)}function YE(e=()=>{}){return Rm(e)}function XE(e=()=>{}){return Nm(e)}function KE(e=()=>{}){return Pm(e)}function QE(e=()=>{}){return Am(e)}function ZE(e=()=>{}){return Ym(e)}function ew(e=()=>{}){return xr(e)}function tw(e=()=>{}){return Qm(e)}function rw(e=()=>{}){return od(e)}function ow(e=()=>{}){return nd(e)}function nw(e=()=>{}){return sd(e)}function sw(e=()=>{}){return id(e)}function iw(e=()=>{}){return ad(e)}function aw(e=()=>{}){return cd(e)}function cw(e=()=>{}){return ld(e)}function lw(e=()=>{}){return ud(e)}var uw=Se;function pw(){return new on}var m={};So(m,{afterRouteChange:()=>fd,beforeRouteChange:()=>hd,componentMap:()=>W,createComponent:()=>Zh,eventDelegationMap:()=>Ao,getActiveParams:()=>vd,getActiveRoute:()=>bd,getChildrenIdByName:()=>Hi,getComponentNameById:()=>Wd,getDebugMode:()=>Qh,getIdByInstanceName:()=>or,getNumberOfActiveInvalidate:()=>eb,getNumberOfActiveRepeater:()=>tb,getParentIdById:()=>vs,getPropsFromParent:()=>va,getRoot:()=>pa,getStateById:()=>sr,getStateByName:()=>mh,getTree:()=>Ud,inizializeApp:()=>Zg,loadUrl:()=>Qg,mainStore:()=>me,onRouteLoading:()=>gd,removeAndDestroyById:()=>st,setStateById:()=>vn,setStateByName:()=>Jh,staticProps:()=>ya,tempDelegateEventMap:()=>xs,tick:()=>wr,updateStateByName:()=>Xh,useComponent:()=>ta,useMethodArrayByName:()=>Jd,useMethodByName:()=>mn,watchById:()=>Mt});var nn="activeRoute",sn="activeParams",Eo="beforeRouteChange",an="afterRouteChange",Kt="routeIsLoading",pt="parserAsync",Ur="default",pd="repeater",md="invalidate",dd="render_component";var me=u.createStore({[nn]:()=>({value:{route:"",templateName:""},type:"any",skipEqual:!1}),[sn]:()=>({value:{},type:"any",skipEqual:!1}),[Eo]:()=>({value:{currentRoute:"",currentTemplate:"",nextRoute:"",nextTemplate:""},type:"any",skipEqual:!1}),[an]:()=>({value:{currentRoute:"",currentTemplate:"",previousRoute:"",previousTemplate:""},type:"any",skipEqual:!1}),[Kt]:()=>({value:!1,type:Boolean}),[pt]:{element:()=>({value:document.createElement("div"),type:HTMLElement,skipEqual:!1}),parentId:()=>({value:"",type:String,skipEqual:!1}),persistent:()=>({value:!1,type:Boolean,skipEqual:!1}),source:()=>({value:Ur,type:String,skipEqual:!1})}}),cn=()=>{me.set(pt,{element:document.createElement("div"),parentId:"",persistent:!1,source:Ur},{emit:!1})};var hd=e=>me.watch(Eo,({currentRoute:t,currentTemplate:r,nextRoute:o,nextTemplate:n})=>{e({currentRoute:t,currentTemplate:r,nextRoute:o,nextTemplate:n})}),fd=e=>me.watch(an,({currentRoute:t,currentTemplate:r,previousRoute:o,previousTemplate:n})=>{e({currentRoute:t,currentTemplate:r,previousRoute:o,previousTemplate:n})}),gd=e=>me.watch(Kt,t=>{e(t)}),bd=()=>{let{activeRoute:e}=me.get();return e},vd=()=>{let{activeParams:e}=me.get();return e};var W=new Map;var G=new Map;var yd=({componentId:e,repeatId:t})=>{let r=G.get(t);if(!r)return;let{componentChildren:o}=r;G.set(t,{...r,componentChildren:[...o,e]})},Td=({componentId:e,repeatId:t})=>{let r=G.get(t);if(!r)return;let{componentChildren:o}=r;G.set(t,{...r,componentChildren:o.filter(n=>n!==e)})},_l=({repeatId:e})=>{let t=G.get(e);if(!t)return[];let{componentChildren:r}=t;return r},Sd=({repeatId:e})=>{let t=G.get(e);if(!t)return!1;let{componentChildren:r}=t;return r.length>0};var _d=new WeakMap,xd=({element:e,id:t})=>{_d.set(e,t)},ln=({element:e})=>_d.get(e);var Cd=({id:e="",newElement:t=document.createElement("div")})=>{if(!e||e==="")return;let r=W.get(e);r&&(W.set(e,{...r,element:t}),xd({element:t,id:e}))},fs=({id:e=""})=>!e||e===""?void 0:W.get(e)?.element,Ed=({element:e})=>e?ln({element:e}):"",xl=({keyValue:e="",repeatId:t=""})=>e?.length===0?[]:_l({repeatId:t}).map(n=>W.get(n)).filter(n=>n!==void 0).filter(n=>`${n.key}`==`${e}`).map(({element:n,id:s})=>({element:n,id:s})),Cl=({id:e,repeatId:t})=>!e||e===""?[]:_l({repeatId:t}).map(o=>W.get(o)).filter(o=>o!==void 0).map(o=>o.id);var wd="data-mobjs",wo="componentid",Li="bindtextid",Di="bindobjectid";var un="staticprops",Fi="bindprops",Id="name",Md="name",kd="slot",Vt="repeaterchild";var Qt="currentRepeaterValue",Zt="repeatPropBind",Bi="bindevents",er="weakbindevents",pn="bindeffect",Rd="parentid";var tr="bindrefid",Cr="bindrefname",Vi="invalidateid",Wi="mobjsrepeat";var rr={current:{},index:-1},Nd="QUEQUE_BINDPROPS",El="QUEQUE_REPEATER",wl="QUEQUE_INVALIDATE";var Gr=new Map;var gs=({id:e})=>{if(!G.has(e))return;if(Gr.has(e)){let r=Gr.get(e);r?.removeCustomComponent(),r?.remove(),Gr.delete(e)}return G.get(e)?.element};var ji=({id:e="",value:t})=>{if(!e||e==="")return;let r=W.get(e);r&&W.set(e,{...r,currentRepeaterState:t})},Pd=({rootNode:e,currentNode:t})=>{if(!(!t||!e.contains(t)))return t.parentElement===e?t:Pd({rootNode:e,currentNode:t.parentElement})},mw=({rootNode:e,node:t})=>{if(e)return Pd({rootNode:e,currentNode:t.parentElement})},Wt=({id:e=""})=>{if(!e||e==="")return rr;let r=W.get(e)?.currentRepeaterState;return r||rr};var Ad=({id:e="",repeatId:t="",element:r})=>{if(!e||e==="")return;let o=W.get(e);if(!o)return;let n=gs({id:t}),s=mw({rootNode:n,node:r});W.set(e,{...o,repeaterInnerWrap:s})},bs=({id:e})=>!e||e===""?void 0:W.get(e)?.repeaterInnerWrap;var Hi=({id:e="",componentName:t=""})=>{if(!e||e==="")return[];let o=W.get(e)?.child;return o?o?.[t]??[]:(console.warn("getChildIdById failed no id found"),[])};var Od=({children:e,key:t,current:r,currentUnivoque:o,useIndex:n=!1})=>{let s=n?r:o,i=e.map(l=>{let{index:p,current:d}=Wt({id:l?.[0]});return{index:p,key:d?.[t],items:l}});return s.map((l,p)=>({index:p,key:l?.[t]})).map(l=>{let p=n?"index":"key";return i.find(d=>d[p]===l[p])}).filter(l=>l!==void 0).map(({items:l})=>l)};var $d="",Ld,Dd=({contentId:e=""})=>{$d=e};var Fd=()=>{Ld=document?.querySelector($d)},zi=()=>Ld;var qr=new Map,Bd=({instanceName:e,id:t})=>{let r=qr.get(e)??[];qr.set(e,[...r,t])},Vd=({instanceName:e,id:t})=>{let r=qr.get(e);if(!r)return;let o=r.filter(n=>n!==t);o.length===0&&qr.delete(e),o.length>0&&qr.set(e,o)},Il=({instanceName:e})=>qr.get(e)??[];var Wd=(e="")=>{if(!e||e==="")return;let r=W.get(e)?.componentName;return r||(console.warn("getComponentNameById failed no id found"),null)},jd=e=>{if(!e)return"name-not-found";let t=ln({element:e})??"",r=W.get(t);return r?r.componentName:"name-not-found"},or=(e="")=>e?Il({instanceName:e})?.[0]:void 0,Hd=(e="")=>e?Il({instanceName:e})??[]:[];var Ui=(e="")=>{if(!e||e==="")return!1;let r=W.get(e)?.element;return r?!zi()?.contains(r):!1};var zd=({chunk:e})=>e.reduce((t,r)=>{let[o,n]=r,{child:s,componentName:i,instanceName:a}=n,c=new Set(Object.values(s??{}).flat()),l=[];for(let p of W.entries()){let[d]=p;c.has(d)&&l.push(p)}return[...t,{id:o,componentName:i,instanceName:a,children:zd({chunk:l})}]},[]),Ud=()=>{let e=[...W.entries()].filter(([,t])=>!t?.parentId||t?.parentId==="");return zd({chunk:e})};var Gd=({id:e,name:t,fn:r})=>{if(!e||e==="")return;let o=W.get(e),n=o?.methods;if(n){if(t in n){console.warn(`Method ${t}, is already used by ${e}`);return}W.set(e,{...o,methods:{...n,[t]:r}})}},qd=({id:e})=>{if(!e||e==="")return{};let r=W.get(e)?.methods;return r?Object.keys(r).length===0?(console.warn(`no methods available for ${e} component`),{}):r:{}},mn=e=>{let t=or(e);if(!t||t==="")return;let r=qd({id:t});if(Object.keys(r).length===0){console.warn(`no methods available for ${e} component`);return}return r},Jd=e=>Hd(e).map(r=>qd({id:r})).filter(r=>Object.keys(r).length>0);function*nr(e){if(e){yield e;for(let t of e.children)yield*nr(t)}}function dw(e,t){let r=[];for(let o of nr(e)){if(r.length>0&&t)break;o?.getIsPlaceholder?.()&&r.push(o)}return r}var Jr=(e,t=!0)=>{let r=[],o=e||document.body;for(let n of o.children)r=[...r,...dw(n,t)];return r};var Io=new Set,Yd=!1,Xd=e=>{Io.add(e)},Kd=e=>{Io.delete(e)},Qd=e=>{let t;for(let r of Io)if(e?.contains(r)&&r.getIsPlaceholder()){t=r;break}return t?(Io.delete(t),[t]):[]},Zd=({element:e})=>[...Io].filter(t=>e.contains(t)&&e!==t&&t.getIsPlaceholder?.())??[],eh=({element:e})=>[...Io].filter(t=>e.contains(t)&&e!==t&&t.getIsPlaceholder?.()&&t?.getSlotPosition?.())??[],th=()=>Io.size;var nt=e=>{Yd=e},jt=()=>Yd;var rh=({currentChild:e,id:t="",componentName:r=""})=>{let o=e?.[r]??[];return e[r]=[...o,t],e},oh=({currentChild:e,id:t="",componentName:r=""})=>{let o=e?.[r]??[];return e[r]=o.filter(n=>t!==n),e},nh=({props:e,store:t})=>{Object.entries(e).forEach(([r,o])=>{t.set(r,o)})},Gi=({prop:e,componentName:t,action:r})=>{console.warn(`Props: ${e}, component: ${t}, action: ${r}: Props can only be modified from outside the component."`)};var vs=(e="")=>{if(!e||e==="")return;let r=W.get(e)?.parentId;if(r)return r},sh=({id:e=""})=>{if(!e||e==="")return;let t=W.get(e),r=t?.parentId,o=t?.componentName??"";if(!r)return;let n=W.get(r);if(!n)return;let{child:s}=n;s&&W.set(r,{...n,child:{...s,...rh({currentChild:s,id:e,componentName:o})}})},ih=({element:e,id:t})=>{if(!e)return;if(!0){Jr(e,!1).forEach(n=>{n.setParentId(t)});return}Zd({element:e}).forEach(o=>{o.setParentId(t)})},dn=({element:e})=>{if(!e)return;let t=e.parentNode,r;for(;t&&!r;)r=ln({element:t}),r||(t=t.parentNode);return r??""},Ml=({moduleScopeId:e,targetComponentId:t})=>{if(e===t)return!0;let r=W.get(e);if(!r)return!1;let o=r?.parentId??"";return Ml({moduleScopeId:o,targetComponentId:t})};var xt=new Map,ys=new Map;var ah=({componentId:e})=>{if(e)for(let[t,r]of xt){let{componentId:o}=r;o===e&&xt.delete(t)}};var Qe=new Map;var ve=new Map;var ch=({id:e})=>{if(Qe.has(e)){let t=Qe.get(e);if(!t)return;t.forEach(({invalidateId:r})=>{ve.has(r)&&ve.delete(r)}),Qe.delete(e)}};var Ze=new Map;var lh=({id:e})=>{if(Ze.has(e)){let t=Ze.get(e);if(!t)return;t.forEach(({repeatId:r})=>{G.has(r)&&G.delete(r)}),Ze.delete(e)}};var uh=({id:e,parentId:t,componentName:r})=>{if(!e)return;let o=W.get(t??"");if(!o)return;let{child:n}=o;!t||!n||W.set(t,{...o,child:{...n,...oh({currentChild:n,id:e,componentName:r})}})};var hn=new Set;var ph=e=>{hn.delete(e)};var st=({id:e=""})=>{if(!e||e==="")return;let t=W.get(e);if(!t)return;let{parentId:r,componentName:o,child:n,element:s,state:i,destroy:a,parentPropsWatcher:c,componentRepeatId:l,instanceName:p,persistent:d}=t;Object.values(n??{}).flat().forEach(f=>{st({id:f})}),uh({id:e,parentId:r,componentName:o}),a?.(),i.destroy(),c&&c.forEach(f=>f()),ch({id:e}),lh({id:e}),l&&l.length>0&&Td({componentId:e,repeatId:l}),p&&p.length>0&&Vd({instanceName:p,id:e}),d||ph(e),ah({componentId:e}),s?.removeCustomComponent?.(),s?.remove(),t.methods=null,t.refs=null,t.repeaterInnerWrap=null,t.element=null,t.currentRepeaterState=null,t.state=null,W.delete(e)};var sr=(e="")=>!e||e===""?void 0:W.get(e)?.state?.get();var mh=(e="")=>{let t=or(e);return t||console.warn(`component ${e}, not found`),sr(t)};var fn=({id:e="",prop:t})=>{if(!e||e==="")return;let r=W.get(e);if(!r)return;let{freezedPros:o}=r;o&&W.set(e,{...r,freezedPros:[...new Set([...o,t])]})},Yr=({id:e="",prop:t})=>{if(!e||e==="")return;let r=W.get(e);if(!r)return;let{freezedPros:o}=r;o&&W.set(e,{...r,freezedPros:o.filter(n=>n!==t)})},Mo=({id:e="",prop:t})=>{if(!e||e==="")return!1;let o=W.get(e)?.freezedPros;return o?o.includes(t):!1};var dh=({repeatId:e,host:t})=>{let r=G.get(e);if(!r)return;let o=t.parentNode;r.initialRenderWithoutSync.forEach(n=>{o.append(n)}),G.set(e,{...r,element:o,initialRenderWithoutSync:[]}),Gr.set(e,t)};var hh=()=>{customElements.define("mobjs-repeat",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){if(jt())return;let{dataset:t}=this.shadowRoot?.host??{};if(t){let r=this.shadowRoot?.host,o=r?.getAttribute(Wi)??"";dh({repeatId:o,host:r})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var Xr=new Map;var fh=({invalidateId:e,host:t})=>{let r=ve.get(e);if(!r)return;let o=t.parentNode;ve.set(e,{...r,element:o}),Xr.set(e,t)};var gh=()=>{customElements.define("mobjs-invalidate",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:e}=this.shadowRoot?.host??{};if(e){let t=this.shadowRoot?.host,r=t.getAttribute(Vi)??"";fh({invalidateId:r,host:t})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var Kr=new Set,bh=e=>{Kr.add(e)},vh=()=>{Kr.clear()},yh=({element:e})=>[...Kr].find(t=>{let r=!t?.getSlotName?.()&&e.contains(t);return r&&Kr.delete(t),r}),Th=({name:e,element:t})=>[...Kr].find(r=>{let o=r?.getSlotName?.()===e&&t.contains(r);return o&&Kr.delete(r),o}),Sh=()=>[...Kr],qi=()=>Kr.size;var _h=()=>{customElements.define("mobjs-slot",class extends HTMLElement{#n;constructor(){super(),this.attachShadow({mode:"open"}),this.#n="",this.isSlot=!0;let{dataset:e}=this.shadowRoot?.host??{};e&&(this.#n=this.shadowRoot?.host.getAttribute(Md))}connectedCallback(){let e=this.shadowRoot?.host;e&&bh(e)}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}getSlotName(){return this.#n}})};var kl=new Set,xh=e=>{kl.add(e)},Ji=()=>[...kl],Yi=e=>kl.delete(e);var Ch=e=>{Object.entries(e).forEach(([t,r])=>{let{connectedCallback:o,disconnectedCallback:n,adoptedCallback:s,attributeChangedCallback:i,style:a,attributeToObserve:c}=r.componentParams;customElements.define(t,class extends HTMLElement{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#_;static get observedAttributes(){return c}constructor(){super(),this.attachShadow({mode:"open"}),this.active=!1,this.#t=u.getUnivoqueId(),this.#i={},this.#n=t,this.#l=!0,this.isUserComponent=!0,this.#r="",this.#e="";let l=this.shadowRoot?.host;if(!l)return;let p=jt();if(p&&!!1&&xh(l),p||(this.#a&&!this.active&&(this.style.visibility="hidden"),!this.shadowRoot))return;if(a){let f=document.createElement("style");f.textContent=a,this.shadowRoot.append(f)}let d=document.createElement("slot");this.shadowRoot.append(d)}getComponentName(){return this.#n}setId(l){this.#t=l}getId(){return this.#t}getParentId(){return this.#f}setParentId(l){this.#f=l}getIsPlaceholder(){return this.#l}getInstanceName(){return this.#d}getStaticPropsId(){return this.#u}getDynamicPropsid(){return this.#s}getBindEventsId(){return this.#c}getCurrentKey(){return this.#h}setDynamicPropsFromSlotId(l){this.#r=l}getDynamicPropsFromSlotId(){return this.#r}setPropsFromSlotId(l){this.#e=l}getPropsFromSlotId(){return this.#e}setRepeatValue(l){this.#p=l}getRepeatValue(){return this.#p}getSlotPosition(){return this.#a}getDelegateEventId(){return this.#g}getRepeaterPropBind(){return this.#m??void 0}setRepeaterPropBind(l){this.#m=l}getComponentRepeatId(){return this.#o}getBindRefId(){return this.#x}getBindRefName(){return this.#_}resetParams(){this.active=!1,this.#t="",this.#i={}}disablePlaceHolderState(){this.#l=!1}inizializeCustomComponent(l){this.active||(this.active=!0,this.#t=l.id,this.#i=l,this.#l=!1,o?.({context:this,params:this.#i}))}connectedCallback(){if(!jt()&&this.#l){let p=this.shadowRoot?.host;p&&([this.#d,this.#u,this.#s,this.#h,this.#c,this.#p,this.#a,this.#f,this.#o,this.#g,this.#m,this.#x,this.#_]=[Id,un,Fi,"key",Bi,Qt,kd,Rd,Vt,er,Zt,tr,Cr].map(d=>p.getAttribute(d)??"")),Xd(p);return}}disconnectedCallback(){if(!this.shadowRoot)return;let l=this.shadowRoot?.host;Kd(l),Yi(l),this.active&&(n?.({context:this,params:this.#i}),this.resetParams())}removeCustomComponent(){!this.shadowRoot||!this.active||this.parentElement?.removeChild(this)}adoptedCallback(){!this.shadowRoot||!this.active||s?.({context:this,params:this.#i})}attributeChangedCallback(l,p,d){!this.shadowRoot||!this.active||i?.({name:l,oldValue:p,newValue:d,context:this,params:this.#i})}})})};var Mt=(e="",t="",r=()=>{},{wait:o=!1}={})=>(!e||e==="")&&(!t||t==="")?void 0:W.get(e)?.state?.watch(t,r,{wait:o??!1});function eo(){return new Promise(e=>u.useNextLoop(()=>e()))}var ko=new Map,wh=()=>ko.size===0,Rl=1e3,Ih=e=>{if(ko.size>=Rl)return console.warn(`maximum loop event reached: (${Rl})`),()=>{};let t=u.getUnivoqueId();return ko.set(t,e),()=>ko.delete(t)},Eh=()=>ko.size===0||ko.size>=Rl,kt=async({debug:e=!1,previousResolve:t}={})=>{if(await eo(),e&&ko.forEach(r=>{console.log(r)}),Eh()&&t){t();return}return new Promise(r=>{if(Eh()){r();return}kt({debug:e,previousResolve:t??r})})};var Ro=new Map,kh=()=>Ro.size===0,Nl=1e3,Rh=e=>{if(Ro.size>=Nl)return console.warn(`maximum loop event reached: (${Nl})`),()=>{};let t=u.getUnivoqueId();return Ro.set(t,e),()=>Ro.delete(t)},Mh=()=>Ro.size===0||Ro.size>=Nl,Rt=async({debug:e=!1,previousResolve:t}={})=>{if(await eo(),e&&Ro.forEach(r=>{console.log(r)}),Mh()&&t){t();return}return new Promise(r=>{if(Mh()){r();return}Rt({debug:e,previousResolve:t??r})})};var gn=({id:e})=>{let t=Qe.get(e);return t?t.map(r=>r.invalidateId).map(r=>ve.get(r)).flatMap(r=>r?.observed).filter(r=>r!==void 0):[]};var bn=({id:e})=>{let t=Ze.get(e);return t?t.map(r=>r.repeatId).map(r=>G.get(r)).map(r=>r?.observed).filter(r=>r!==void 0):[]};var Ki=new Map,Nh=(e,t)=>{Ki.set(e,t)},Qi=new Map,Ph=({host:e,componentId:t,bindTextId:r})=>{Qi.set(e,{componentId:t,bindTextId:r})},Ah=e=>e.match(/(?<=\[).+?(?=])/g),Oh=e=>e.split("[")?.[0],fw=({previous:e,current:t})=>{let r=Ah(t);return r&&r?.length>0?r.reduce((n,s)=>n?.[s],e[Oh(t)]):e?.[t]},$h=(e,t,...r)=>{let o=sr(e),n=r.map(s=>s.split(".").reduce((a,c)=>fw({previous:a,current:c})??a,o));return t.raw.reduce((s,i,a)=>s+i+(n?.[a]??""),"")},Lh=()=>{[...Qi].forEach(([e,{bindTextId:t}])=>{let r=e.parentElement;if(!r){Ki.delete(t);return}let o=Ki.get(t);o&&(Ki.delete(t),gw({...o,element:r}),e?.removeCustomComponent?.(),e?.remove(),r=null)}),Qi.clear()},Dh=()=>Qi.size,gw=({id:e,render:t,props:r,element:o})=>{let n=!1,s=new WeakRef(o),i=bn({id:e}),a=gn({id:e}),l=[...new Set([...r,...i,...a])].map(p=>{let f=p.split(".")?.[0],h=Ah(f),b=h&&h?.length>0?Oh(f):f;if(b)return Mt(e,b,async()=>{await Rt(),await kt(),!n&&(n=!0,u.useNextLoop(()=>{u.useFrame(()=>{s.deref()&&!s.deref()?.isConnected&&(l.forEach(T=>{T&&T()}),l.length=0),s.deref()&&s.deref()?.isConnected&&(s.deref().textContent="",s.deref().insertAdjacentHTML("afterbegin",t())),n=!1})}))})})};var Fh=()=>{customElements.define("mobjs-bind-text",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:e}=this.shadowRoot?.host??{};if(e){let t=this.shadowRoot?.host??document.createElement("div"),r=t?.getAttribute(wo)??"",o=t?.getAttribute(Li)??"";Ph({host:t,componentId:r,bindTextId:o})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var Zi=new Map,Bh=(e,t)=>{Zi.set(e,t)},Pl=new Map,Vh=({host:e,componentId:t,bindObjectId:r})=>{Pl.set(e,{componentId:t,bindObjectId:r})},Wh=e=>e.map(t=>"observe"in t?Re.extractkeyFromProp(t.observe):(Re.initializeCurrentDependencies(),"value"in t?t?.value():t(),Re.getFirstCurrentDependencies())),jh=(e,...t)=>e.raw.reduce((r,o,n)=>t?.[n]&&"value"in t[n]?r+o+(t?.[n]?.value?.()??""):r+o+(t?.[n]?.()??""),""),Hh=()=>{[...Pl].forEach(([e,{bindObjectId:t}])=>{let r=e.parentElement;if(!r){Zi.delete(t);return}let o=Zi.get(t);o&&(Zi.delete(t),bw({...o,element:r}),e?.removeCustomComponent?.(),e?.remove(),r=null)}),Pl.clear()},bw=({id:e,keys:t,render:r,element:o})=>{let n=!1,s=new WeakRef(o),i=bn({id:e}),a=gn({id:e}),l=[...new Set([...t,...i,...a])].map(p=>Mt(e,p,async()=>{await Rt(),await kt(),!n&&(n=!0,u.useNextLoop(()=>{u.useFrame(()=>{s.deref()&&!s.deref()?.isConnected&&(l.forEach(d=>{d&&d()}),l.length=0),s.deref()&&s.deref()?.isConnected&&(s.deref().textContent="",s.deref().insertAdjacentHTML("afterbegin",r())),n=!1})}))}))};var zh=()=>{customElements.define("mobjs-bind-object",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:e}=this.shadowRoot?.host??{};if(e){let t=this.shadowRoot?.host??document.createElement("div"),r=t?.getAttribute(wo)??"",o=t?.getAttribute(Di)??"";Vh({host:t,componentId:r,bindObjectId:o})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var ea={},No=()=>ea,Uh=new Set,Gh=()=>{ea=[...Uh.values()].reduce((e,t)=>({...e,...t}),{}),console.log(`component loaded:${Object.keys(ea).length}`),Ch(ea),_h(),gh(),hh(),Fh(),zh()},ta=e=>{!e||e?.length===0||e.forEach(t=>{Uh.add(t)})};var ra=({componentName:e,propName:t})=>(No()?.[e]?.componentParams?.exportState??[]).includes(t),qh=({componentName:e})=>No()?.[e]?.componentParams?.exportState??[];var vn=(e="",t="",r,{emit:o=!0}={})=>{if((!e||e==="")&&(!t||t==="")&&!r||Mo({id:e,prop:t}))return;let s=W.get(e),i=s?.state,a=s?.componentName??"";if(!ra({componentName:a,propName:t})){console.warn(`setStateById failed ${t} in: ${a} is not exportable, maybe a slot bind state that not exist here?`);return}if(!i){console.warn(`setStateById failed no id found on prop: ${t}`);return}i.set(t,r,{emit:o})};var Jh=(e="")=>{let t=or(e);return t||console.warn(`component ${e}, not found`),(r,o,{emit:n=!0}={})=>vn(t,r,o,{emit:n})};var Yh=(e="",t="",r,{emit:o=!0,clone:n=!1}={})=>{if((!e||e==="")&&(!t||t==="")&&!r||Mo({id:e,prop:t}))return;let i=W.get(e),a=i?.state,c=i?.componentName??"";if(!ra({componentName:c,propName:t})){console.warn(`updateStateById failed ${t} in: ${c} is not exportable, maybe a slot bind state that not exist here?`);return}if(!a){console.warn(`updateStateById failed no id found on prop: ${t}`);return}a.update(t,r,{emit:o,clone:n})};var Xh=(e="")=>{let t=or(e);return t||console.warn(`component ${e}, not found`),(r,o,{emit:n=!0,clone:s=!1}={})=>Yh(t,r,o,{emit:n,clone:s})};var Al={scoped:!1,maxParseIteration:5e3,debug:!1},Kh=e=>{Al={...Al,...e}},Nt=()=>Al,Qh=()=>{let{debug:e}=Nt();return e},Zh=({tag:e="",component:t=()=>"",props:r={},state:o={},bindStore:n,scoped:s,connectedCallback:i=()=>{},disconnectedCallback:a=()=>{},adoptedCallback:c=()=>{},attributeToObserve:l=[],attributeChangedCallback:p=()=>{},style:d="",child:f=[]})=>(ta(f),{[e]:{componentFunction:t,componentParams:{exportState:Object.keys(r),scoped:s,state:{...r,...o},bindStore:n,connectedCallback:i,disconnectedCallback:a,adoptedCallback:c,attributeToObserve:l,attributeChangedCallback:p,style:d,child:f}}});var ef=[],tf="",rf="",of=e=>{ef=[...e]},yn=({hash:e=""})=>ef.find(({hash:t})=>e===t),nf=({hash:e=""})=>{tf=e},oa=()=>tf,sf=({hash:e=""})=>{rf=e},af=()=>rf;function vw(e){let t=[];for(let r of nr(e))r?.isUserComponent&&r?.getSlotPosition?.()&&t.push(r);return t}var cf=e=>{let t=[],r=e||document.body;for(let o of r.children)t=[...t,...vw(o)];return t};function yw(e){let t=[];for(let r of nr(e))r?.isSlot&&r?.getSlotName?.()&&t.push(r);return t}var lf=e=>{let t=[],r=e||document.body;for(let o of r.children)t=[...t,...yw(o)];return t};function Tw(e,t){for(let r of nr(e))if(r?.isSlot&&r?.getSlotName?.()===t)return r;return null}var uf=(e,t)=>{let r=e||document.body;for(let o of r.children){let n=Tw(o,t);if(n)return n}return null};function Sw(e){for(let t of nr(e))if(t?.isSlot&&!t?.getSlotName?.())return t;return null}var pf=e=>{let t=e||document.body;for(let r of t.children){let o=Sw(r);if(o)return o}return null};var Ts=new Map,Po=e=>{let t=u.getUnivoqueId();return Ts.set(t,e),t},mf=(e="")=>{if(!e)return rr;let t=Ts.get(e);return Ts.delete(e),t??rr};var g=(e,...t)=>e.reduce((r,o,n)=>r+o+(t[n]===void 0?"":t[n]),"").replaceAll(/>\s+</g,"><").trim();var na=({components:e,current:t,index:r,observe:o,repeatId:n,key:s})=>{e.forEach(i=>{i.deref()?.hasAttribute(Qt)||i.deref()?.setAttribute(Qt,Po({current:t,index:r})),i.deref()?.hasAttribute("key")||i.deref()?.setAttribute("key",`${s}`),i.deref()?.hasAttribute(Zt)||i.deref()?.setAttribute(Zt,`${o}`),i.deref()?.hasAttribute(Vt)||i.deref()?.setAttribute(Vt,`${n}`)})},sa=({components:e,current:t,index:r,observe:o,repeatId:n,key:s})=>{e.forEach(i=>{if(i.hasAttribute(Vt)){Yi(i);return}i.setAttribute(Qt,Po({current:t,index:r})),i.setAttribute("key",`${s}`),i.setAttribute(Zt,`${o}`),i.setAttribute(Vt,`${n}`)})},to=({stringDOM:e,parent:t,position:r})=>{nt(!0);let o=document.createRange().createContextualFragment(e);nt(!1),o&&(r==="afterend"&&t.after(o),r==="beforebegin"&&t.before(o),r==="afterbegin"&&t.prepend(o),r==="beforeend"&&t.append(o))},Ss=({elements:e,parent:t,position:r})=>{let o=new DocumentFragment;nt(!0),e.forEach(n=>{n&&o.append(n)}),nt(!1),r==="afterend"&&t.after(o),r==="beforebegin"&&t.before(o),r==="afterbegin"&&t.prepend(o),r==="beforeend"&&t.append(o)};var xw=({element:e,content:t})=>{let{debug:r}=Nt();if(e.parentNode){let o=document.createElement("template");o.innerHTML=t;let n=o.content.firstElementChild;return n?.disablePlaceHolderState?.(),n&&e.after(n),r&&e.insertAdjacentHTML("afterend",`<!--  ${e.tagName.toLowerCase()} --> `),n}},Cw=({element:e})=>{Sh().forEach(r=>{r?.removeCustomComponent(),r?.remove()})},Ew=({element:e})=>{if(!!1&&qi()===0)return;let t=cf(e);t.length!==0&&[...t].forEach(r=>{let o=r?.getSlotPosition(),n=Th({name:o,element:e});n&&(n.parentNode?.insertBefore(r,n),n?.removeCustomComponent(),n?.remove())})},ww=({element:e,content:t})=>{let r=xw({element:e,content:t});if(r){let o=e.getId(),n=e?.getDelegateEventId(),s=e?.getBindRefId(),i=e?.getBindRefName(),a=yh({element:r});a&&(Ss({parent:a,elements:[...e.childNodes],position:"afterend"}),a.remove()),a||Ss({parent:r,elements:[...e.childNodes],position:"afterbegin"}),Ew({element:r}),Cw({element:r}),n&&n.length>0&&r.setAttribute(er,n),s&&s.length>0&&r.setAttribute(tr,s),i&&i.length>0&&r.setAttribute(Cr,i);let{debug:c}=Nt();c&&r.setAttribute(wd,o??"")}return e.remove(),r},df=({element:e,content:t})=>({newElement:ww({element:e,content:t})});var Ol=0,hf=()=>{Ol+=1},$l=()=>Ol,ff=()=>{Ol=0},Ll=({element:e,currentSelectors:t})=>{if(t.length>0){let r=t[0],o=t.slice(1);return{componentToParse:r,parseSourceArray:o}}else{let r=Qd(e),o=r?.[0],n=r.slice(1);return{componentToParse:o,parseSourceArray:n}}};var gf=({cb:e=()=>{},id:t})=>{if(!t)return;let r=W.get(t);r&&W.set(t,{...r,destroy:e})};var _s=new Map,bf=({id:e,cb:t=()=>{}})=>{_s.set(e,t)},Dl=async({id:e,element:t})=>{let o=await _s.get(e)?.({element:t});gf({cb:o,id:e}),_s.delete(e)};var Tn=new Map,Fl=1e5,Sn=e=>{if(Tn.size>=Fl)return console.warn(`maximum loop event reached: (${Fl})`),()=>{};let t=u.getUnivoqueId();return Tn.set(t,e),()=>Tn.delete(t)},vf=()=>Tn.size===0||Tn.size>=Fl,wr=async({debug:e=!1,previousResolve:t}={})=>{if(await eo(),e&&Tn.forEach(r=>{console.log(r)}),vf()&&t){t();return}return new Promise(r=>{if(vf()){r();return}wr({debug:e,previousResolve:t??r})})};var Bl=!0,ia=()=>{Bl=!0},aa=()=>{Bl=!1},ca=()=>Bl;var _n=new Map,yf=(e=[])=>{let t=Le(Object,e)?[e]:e,r=u.getUnivoqueId();return _n.set(r,t),r},Tf=({element:e,componentId:t,bindEventsId:r})=>{let o=_n.get(r);o&&(o.forEach(n=>{let[s]=Object.keys(n),[i]=Object.values(n);!s||!i||e.addEventListener(s,async a=>{if(!ca())return;aa(),await wr(),ia();let c=Wt({id:t});i(a,c?.current,c?.index)})}),_n.delete(r))},Sf=()=>{_n.clear()};var la=({id:e="",unWatchArray:t=[]})=>{let r=W.get(e);if(!r)return;let{parentPropsWatcher:o}=r;o&&W.set(e,{...r,parentPropsWatcher:[...o,...t]})},_f=({id:e=""})=>{if(!e||e==="")return;(W.get(e)?.parentPropsWatcher??[]).forEach(o=>{o()})};var xf=e=>{if(!("props"in e)){console.warn("bindProps not valid");return}let r=e?.observe?e.observe.map(s=>Re.extractkeyFromProp(s)):(Re.initializeCurrentDependencies(),u.checkType(Function,e.props)&&e.props({},{},0),Re.getCurrentDependencies());if(r.length===0){console.warn("bindProps not valid, no dependencies found");return}let o={...e,observe:r},n=u.getUnivoqueId();return xt.set(n,{...o,componentId:"",propsId:n}),n},ua=({componentId:e,observe:t,props:r,currentParentId:o,fireCallback:n})=>{if(!o)return;let s=sr(o);if(!s)return;let i=Object.keys(s);if(t.every(d=>i.includes(d))||console.warn(`bind props error: Some prop ${JSON.stringify(t)} doesn't exist`),!W.has(e))return;let l=Wt({id:e}),p=r?.(s,l.current,l?.index);p&&Object.entries(p).forEach(([d,f])=>{vn(e,d,f,{emit:n})})},Cf=({propsId:e,repeatPropBind:t,componentId:r})=>{if(!e)return;let o=xt.get(e);o&&(xt.set(e,{...o,componentId:r}),ys.set(r,e),Vl({componentId:r,repeatPropBind:t,inizilizeWatcher:!1}))};var Vl=async({componentId:e,repeatPropBind:t,inizilizeWatcher:r})=>{let o=ys.get(e);if(!o)return;r&&ys.delete(e);let n=xt.get(o);if(!n)return;let{observe:s,props:i,parentId:a}=n,c=t&&t?.length>0&&!s.includes(t)?[...s,t]:[...s];if(r||ua({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!1}),!r&&!kh()&&(await Rt(),ua({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!0})),!r&&!wh()&&(await kt(),ua({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!0})),!r)return;let l=!1,p=c.map(d=>Mt(a,d,async()=>{if(await Rt(),await kt(),l)return;let f=Sn({state:d,id:e,type:Nd});l=!0,u.useNextLoop(()=>{ua({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!0}),l=!1,f()})}));if(la({id:e,unWatchArray:p.filter(d=>d!==void 0)}),!!r)for(let[d,f]of xt){let{componentId:h}=f;h===e&&xt.delete(d)}},Ef=()=>{xt.clear(),ys.clear()};var ir=({id:e,container:t})=>{let o=W.get(e)?.child;if(!o)return;Object.values(o??{}).flat().forEach(s=>{let i=W.get(s),a=i?.element,c=i?.id??"";if(a&&t?.contains(a)&&a!==t){st({id:s});return}else ir({id:c,container:t})})};var Wl=new Map,Iw=e=>(u.checkType(Array,e)?e:[e]).map(r=>Re.extractkeyFromProp(r)),Mw=({toggleClass:e,toggleStyle:t,toggleAttribute:r})=>(Re.initializeCurrentDependencies(),Object.values(t).forEach(o=>o()),Object.values(e).forEach(o=>o()),Object.values(r).forEach(o=>o()),Re.getCurrentDependencies()),kf=({data:e,id:t})=>{let o=(u.checkType(Array,e)?e:[e]).map(({observe:i,toggleClass:a,toggleStyle:c,toggleAttribute:l})=>({observe:i?Iw(i):Mw({toggleStyle:c??{fake:()=>""},toggleClass:a??{fake:()=>{}},toggleAttribute:l??{fake:()=>{}}}),toggleClass:a??{},toggleStyle:c??{},toggleAttribute:l??{}})),n={parentId:t,items:o},s=u.getUnivoqueId();return Wl.set(s,n),s},Rf=e=>{[...e.querySelectorAll(`[${pn}]`)].forEach(r=>{let o=r.getAttribute(pn);if(!o)return;let n=Wl.get(o);n&&(r.removeAttribute(pn),kw({data:n,element:r}),Wl.delete(o))})},wf=({ref:e,data:t})=>{t&&Object.entries(t).forEach(([r,o])=>{e.deref()&&e.deref().classList.toggle(r,o?.())})},If=({ref:e,data:t})=>{Object.entries(t).forEach(([r,o])=>{e.deref()&&(e.deref().style[r]=o?.()??"")})},Mf=({ref:e,data:t})=>{Object.entries(t).forEach(([r,o])=>{if(!e.deref())return;let n=o?.();if(u.checkType(Boolean,n)){e.deref()[r]=n;return}if(!n){e.deref().removeAttribute(r);return}e.deref()?.setAttribute(r,n)})},kw=({data:e,element:t})=>{let r=new WeakRef(t),{parentId:o}=e,{items:n}=e,s=n.flatMap(({observe:i,toggleClass:a,toggleStyle:c,toggleAttribute:l})=>{let p=!1,d=bn({id:o}),f=gn({id:o});return[...new Set([...i,...d,...f])].map(y=>(a&&u.useFrame(()=>{wf({ref:r,data:a})}),c&&u.useFrame(()=>{If({ref:r,data:c})}),l&&u.useFrame(()=>{Mf({ref:r,data:l})}),Mt(o,y,async()=>{if(await Rt(),await kt(),r.deref()&&!r.deref()?.isConnected){s.forEach(b=>{b&&b()}),s.length=0;return}p||(p=!0,u.useNextLoop(()=>{u.useFrame(()=>{a&&r.deref()&&wf({ref:r,data:a}),c&&r.deref()&&If({ref:r,data:c}),l&&r.deref()&&Mf({ref:r,data:l}),p=!1})}))})))})};var Nf=({element:e})=>{let t=e.querySelectorAll(`[${tr}]`),r={};return[...t].reduce((o,n)=>{let s=n.getAttribute(tr),i=n.getAttribute(Cr);if(n.removeAttribute(tr),n.removeAttribute(Cr),!i)return o;let a=i in o?[...o[i],{element:n,scopeId:s}]:[{element:n,scopeId:s}];return{...o,[i]:a}},r)},Rw=e=>[...new Set(e.toSorted((t,r)=>t===r||!t||!r?0:t.compareDocumentPosition(r)&2?1:-1))],Nw=({refs:e,refName:t,element:r})=>({...e,[t]:Rw([...e[t],r])}),Pf=e=>{Object.entries(e).forEach(([t,r])=>{r.forEach(({element:o,scopeId:n})=>{let s=W.get(n);if(!s)return;let{refs:i}=s;if(!i)return;let a=t in i?Nw({refs:i,refName:t,element:o}):{...i,[t]:[o]};W.set(n,{...s,refs:a})})})},jl=({id:e})=>{let t=W.get(e);if(!t)return{};let{refs:r,element:o}=t;if(!r)return{};let n=Object.entries(r).map(([s,i])=>({name:s,collection:i.filter(a=>o.contains(a))})).reduce((s,i)=>({...s,[i.name]:i.collection}),{});return W.set(e,{...t,refs:n}),n},Af=({id:e})=>{let t=jl({id:e});return Object.entries(t).reduce((r,[o,n])=>({...r,[o]:n?.[0]}),{})};var Of=document.createElement("div"),$f=({element:e})=>{Of=e},pa=()=>Of;var xs=new Map,Ao=new WeakMap,Hl=[],Lf=[],Df=(e=[])=>{let t=Le(Object,e)?[e]:e,r=u.getUnivoqueId();return xs.set(r,t),r},Pw=e=>{let t=e?.parentNode;for(;t;){if(Ao.has(t))return{target:t,data:Ao.get(t)};t=t?.parentNode}return{target:void 0,data:void 0}},Aw=e=>Ao.get(e)?{target:e,data:Ao.get(e)}:Pw(e);async function Ow(e,t){let r=t?.target;if(!r||!ca())return;aa(),await wr(),ia();let{target:o,data:n}=Aw(r);if(!n||!document.contains(o))return;let s=n.find(({event:l})=>l===e);if(!s)return;let{callback:i}=s,a=Ed({element:o}),c=a?Wt({id:a}):rr;Object.defineProperty(t,"target",{value:o}),Object.defineProperty(t,"currentTarget",{value:r}),i(t,c?.current,c?.index)}var Ff=async e=>{await Rt(),await kt(),[...e.parentNode?.querySelectorAll(`[${er}]`)??[]].forEach(n=>{let s=n.getAttribute(er)??"";n.removeAttribute(er);let i=xs.get(s);xs.delete(s);let a=i?.flatMap(c=>Object.entries(c).map(l=>{let[p,d]=l;return Hl.includes(p)||Hl.push(p),{event:p,callback:d}}));Ao.set(n,a)});let o=pa();Hl.forEach(n=>{Lf.includes(n)||(Lf.push(n),o.addEventListener(n,Ow.bind(null,n)))})};var xn="repeater",ma="invalidate",ro=({moduleParentElement:e,skipInitialized:t=!1,onlyInitialized:r=!1,componentId:o,module:n})=>{let s=n===xn?G.entries():ve.entries(),i=[];for(let a of s){let[c,{element:l,initialized:p,scopeId:d,initializeModule:f,unsubscribe:h}]=a;if(o&&!Ml({moduleScopeId:d??"",targetComponentId:o})||t&&p||r&&!p)continue;l&&e?.contains(l)&&e!==l&&i.push({moduleId:c,initializeModule:f,unsubscribe:n===xn?[h]:h})}return i};var Bf=({id:e,repeatId:t})=>{if(!Ze.has(e))return;let r=Ze.get(e);if(!r)return;let o=r.filter(n=>n.repeatId!==t);G.has(t)&&G.delete(t),Ze.set(e,o)};var oo=({id:e,repeatParent:t})=>{ro({moduleParentElement:t,skipInitialized:!1,onlyInitialized:!0,componentId:e,module:xn}).forEach(({unsubscribe:o,moduleId:n})=>{o.forEach(s=>{s()}),Bf({id:e,repeatId:n})})};var da=({repeatParent:e,id:t})=>{if(!e)return;ro({moduleParentElement:e,skipInitialized:!0,onlyInitialized:!1,componentId:t,module:xn}).forEach(({initializeModule:o})=>{o()})};var Vf=({invalidateId:e,unsubscribe:t})=>{let r=ve.get(e);r&&ve.set(e,{...r,unsubscribe:t})};var Wf=({id:e,invalidateId:t})=>{if(!Qe.has(e))return;let r=Qe.get(e);if(!r)return;let o=r.filter(n=>n.invalidateId!==t);ve.has(t)&&ve.delete(t),Qe.set(e,o)};var no=({id:e,invalidateParent:t})=>{ro({moduleParentElement:t,skipInitialized:!1,onlyInitialized:!0,componentId:e,module:ma}).forEach(({unsubscribe:o,moduleId:n})=>{o.forEach(s=>{s()}),Wf({id:e,invalidateId:n})})};var zl=({id:e})=>{if(!ve.has(e))return;if(Xr.has(e)){let r=Xr.get(e);r?.removeCustomComponent(),r?.remove(),Xr.delete(e)}return ve.get(e)?.element};var ha=({invalidateParent:e,id:t})=>{if(!e)return;ro({moduleParentElement:e,skipInitialized:!0,onlyInitialized:!1,componentId:t,module:ma}).forEach(({initializeModule:o})=>{o()})};var jf=async({observe:e=[],beforeUpdate:t=()=>Promise.resolve(),afterUpdate:r=()=>{},watch:o,id:n,invalidateId:s,persistent:i=!1,renderFunction:a})=>{let c=!1,l=dn({element:zl({id:s})});r();let p=e.map(d=>o(d,async()=>{if(c)return;fn({id:n,prop:d});let h=zl({id:s}),y=Sn({state:d,id:n,type:wl}),b=Ih({state:d,id:n,type:wl});c=!0,u.useNextLoop(async()=>{if(!h){Yr({id:n,prop:d});return}await t(),no({id:n,invalidateParent:h}),oo({id:n,repeatParent:h}),ir({id:l??n,container:h}),h.textContent="",to({stringDOM:a(),parent:h,position:"afterbegin"}),me.set(pt,{element:h,parentId:l??n,persistent:i,source:md},{emit:!1}),await me.emitAsync(pt),cn(),c=!1,y(),b(),ha({invalidateParent:h,id:n}),da({repeatParent:h,id:n}),Yr({id:n,prop:d}),r()})}));Vf({invalidateId:s,unsubscribe:p})};var Hf=e=>(u.checkType(Array,e)?e:[e]).map(r=>Re.extractkeyFromProp(r));var zf=({invalidateId:e,initializeModule:t})=>{let r=ve.get(e);r&&ve.set(e,{...r,initializeModule:t,unsubscribe:[()=>{}]})};var Uf=({invalidateId:e})=>{let t=ve.get(e);t&&ve.set(e,{...t,initialized:!0})};var Gf=({invalidateId:e,scopeId:t,observe:r})=>{ve.set(e,{element:void 0,initialized:!1,observed:r,scopeId:t,initializeModule:()=>{},unsubscribe:[()=>{}]})};var qf=({repeatId:e,unsubscribe:t})=>{let r=G.get(e);r&&G.set(e,{...r,unsubscribe:t})};var Cn=new Set,Jf=({id:e,state:t,container:r})=>{Cn.add({id:e,state:t,container:r})},Yf=({id:e,state:t,container:r})=>{r&&Cn.forEach(o=>{e===o.id&&t===o.state&&r===o.container&&Cn.delete(o)})},Xf=({id:e="",state:t="",container:r})=>[...Cn].some(n=>e===n.id&&t===n.state&&r===n.container);var Qf=(e=[],t=[],r="")=>e.filter(o=>{let n=o?.[r];return!t.some(s=>s?.[r]===n)}),Zf=(e,t,r)=>e.map((o,n)=>{let s=o?.[r];return!t.some(a=>a?.[r]===s)?{isNewElement:!0,keyValue:o?.[r],index:n}:{isNewElement:!1,keyValue:o?.[r],index:n}}),Kf=({arr:e=[],key:t=""})=>e.every(r=>u.checkType(Object,r)&&t in r),eg=({current:e,previous:t,key:r})=>Kf({arr:e,key:r})&&Kf({arr:t,key:r}),fa=({data:e=[],key:t=""})=>e.filter((r,o,n)=>n.findIndex(s=>s?.[t]===r?.[t])===o),ga=({children:e,previousChildren:t=[]})=>{let r={};return t.length===0?Object.values(e.reduce((o,n)=>{let{index:s}=Wt({id:n});return s in o?{...o,[s]:[...o[s],n]}:{...o,[s]:[n]}},r)):Object.values(e.reduce((o,n)=>{let{index:s}=Wt({id:n}),i=t.includes(n)?`${s}`:`_${s}`,a=o?.[i];return a?{...o,[i]:[...a,n]}:{...o,[i]:[n]}},r))};var En=new Map,ba=(e={})=>{let t=u.getUnivoqueId();return En.set(t,e),t},va=(e="")=>{let t=En.get(e);return En.delete(e),t??{}};var tg=()=>{En.clear()};var ya=(e={})=>`${un}="${ba(e)}"`,Ta=(e,t,r)=>Math.min(Math.max(e,t),r);var Ul=({repeatId:e})=>{let t=G.get(e);return t?t.currentData:[]};var $w="index",Oo=({observe:e,hasKey:t,key:r="",keyValue:o="",index:n,repeatId:s})=>{let i=Ul({repeatId:s}),a=t?i?.find(p=>p[r]===o):i?.[n],c=a,l=a;return new Proxy({},{get(p,d){Re.setCurrentDependencies(e);let f=Ul({repeatId:s}),h=Math.max(f?.length-1,0);if(d===$w){if(t){let y=f?.findIndex(b=>b[r]===o);return Ta(y,0,h)}return Ta(n,0,h)}return t?(l=c??l,c=f?.find(y=>y[r]===o),c??l):(l=c??l,c=f?.[Ta(n,0,h)],c??l)},set(){return!1}})};var rg=({diff:e,current:t,previousLenght:r,render:o,state:n,repeatId:s})=>{let i=document.createRange();return[...Array.from({length:e}).keys()].map((c,l)=>{let p=t?.[l+r],d=l+r,f=Oo({observe:n,hasKey:!1,index:d,repeatId:s}),h=o({initialIndex:d,initialValue:p,current:f,sync:()=>""}),y=jt();nt(!0);let b=i.createContextualFragment(h);if(nt(y),!1){let T=Jr(b,!1).map(_=>new WeakRef(_));na({components:T,current:p,index:d,observe:n,repeatId:s,key:void 0})}return sa({components:Ji(),current:p,index:d,observe:n,repeatId:s,key:void 0}),b.firstElementChild}).filter(c=>c!==null)},Lw=({initialIndex:e,initialValue:t,state:r,repeatId:o})=>`${Qt}="${Po({current:t,index:e})}"
    ${Zt}="${r}" ${Vt}="${o}"`,og=({diff:e,previousLenght:t,current:r,state:o,repeatId:n,render:s})=>[...Array.from({length:e}).keys()].map((i,a)=>{let c=a+t,l=r?.[c]?{...r?.[c]}:{},p=Oo({observe:o,hasKey:!1,index:c,repeatId:n});return s({sync:()=>Lw({initialIndex:c,initialValue:l,repeatId:n,state:o}),initialIndex:c,initialValue:l,current:p})}).join(""),ng=({currentValue:e,index:t,state:r,repeatId:o,key:n,keyValue:s,render:i})=>{let a=Oo({observe:r,hasKey:!0,key:n,keyValue:s,index:t,repeatId:o}),c=jt();nt(!0);let l=document.createRange().createContextualFragment(i({initialIndex:t,initialValue:e,current:a,sync:()=>""}));if(nt(c),!1){let p=Jr(l,!1).map(d=>new WeakRef(d));na({components:p,current:e,index:t,observe:r,repeatId:o,key:s})}return sa({components:Ji(),current:e,index:t,observe:r,repeatId:o,key:s}),l.firstElementChild},Dw=({keyValue:e,index:t,currentValue:r,state:o,repeatId:n})=>` ${"key"}="${e}"
    ${Zt}="${o}"
    ${Qt}="${Po({current:r,index:t})}"
    ${Vt}="${n}"`,sg=({currentValue:e,index:t,state:r,repeatId:o,key:n,keyValue:s,render:i})=>{let a={...e},c=Oo({observe:r,hasKey:!0,key:n,keyValue:s,index:t,repeatId:o});return i({initialIndex:t,initialValue:a,current:c,sync:()=>Dw({currentValue:a,index:t,keyValue:s,repeatId:o,state:r})})},ig=({currentUnique:e,render:t,observe:r,repeatId:o,key:n="",hasKey:s})=>{let i=document.createRange();return e.map((c,l)=>{let p=Oo({observe:r,hasKey:s,key:n,keyValue:s?c?.[n]:"",index:l,repeatId:o}),d=jt();nt(!0);let f=i.createContextualFragment(t({initialIndex:l,initialValue:c,current:p,sync:()=>""}));if(nt(d),!1){let h=Jr(f,!1).map(y=>new WeakRef(y));na({components:h,current:c,index:l,observe:r,repeatId:o,key:s?c?.[n]:""})}return sa({components:Ji(),current:c,index:l,observe:r,repeatId:o,key:s?c?.[n]:""}),f.firstElementChild}).filter(c=>c!==null)},ag=({currentUnique:e,key:t="",observe:r,repeatId:o,hasKey:n,render:s})=>e.map((a,c)=>{let l=()=>`${Qt}="${Po({current:a,index:c})}"
                            ${"key"}="${n?a?.[t]:""}"
                            ${Zt}="${r}"
                            ${Vt}="${o}"`,p=Oo({observe:r,hasKey:n,key:t,keyValue:n?a?.[t]:"",index:c,repeatId:o});return s({sync:l,initialIndex:c,initialValue:a,current:p})}).join("");var Sa=({repeatId:e,id:t})=>{let r=G.get(e);if(!r)return;let{element:o,observed:n}=r;if(!o)return;let s=[...o.children],a=sr(t)[n];G.set(e,{...r,nativeDOMChildren:s.map((c,l)=>({index:l,value:a[l],element:c}))})},Cs=({repeatId:e})=>{let t=G.get(e);if(!t)return[];let{nativeDOMChildren:r}=t;return r};var wn=({repeatId:e,currentData:t})=>{let r=G.get(e);r&&G.set(e,{...r,currentData:t})};var Fw=({element:e,container:t})=>{let r=jd(e);t.insertAdjacentHTML("beforeend",`<!-- ${r} --> `)},cg=({state:e="",current:t=[],previous:r=[],repeaterParentElement:o=document.createElement("div"),key:n="",id:s="",render:i,repeatId:a,useSync:c})=>{let l=fa({data:t,key:n});wn({repeatId:a,currentData:l});let p=Qf(r,l,n),d=p.map(T=>{let _=T?.[n];return xl({keyValue:_,repeatId:a})}).filter(T=>T.length>0),f=d.length>0;d.forEach(T=>{let _=T[0].element,S=T[0].id;if(!S)return;let E=bs({id:S}),C=E??_;no({id:s,invalidateParent:C}),oo({id:s,repeatParent:C}),T.forEach(({id:I})=>{st({id:I})}),E&&E.remove()}),f||Cs({repeatId:a}).filter(S=>p.map(E=>E?.[n]).includes(S.value?.[n])).forEach(S=>{let{element:E}=S;no({id:s,invalidateParent:E}),oo({id:s,repeatParent:E}),ir({id:s,container:E})});let h=Zf(l,r,n).map(({keyValue:T,isNewElement:_,index:S})=>{if(_)return{keyValue:T,isNewElement:_,index:S,wrapper:void 0};let E=xl({keyValue:T,repeatId:a}),C=E[0]?.element?bs({id:E[0]?.id??""}):Cs({repeatId:a}).find(M=>M.value?.[n]===T)?.element;return{keyValue:T,isNewElement:_,index:S,persistentElement:E,persistentDOMwrapper:C}});o.replaceChildren();let y=document.createRange(),b=new DocumentFragment;return h.forEach(({isNewElement:T,keyValue:_,index:S,persistentElement:E,persistentDOMwrapper:C})=>{if(!T){let{debug:k}=Nt();C&&b.append(C);let A=E?.[0]?.element;!C&&A&&(b.append(A),k&&Fw({element:E[0]?.element,container:o}));return}let I=l?.[S],M=c?sg({currentValue:I,index:S,state:e,repeatId:a,key:n,keyValue:_,render:i}):ng({currentValue:I,index:S,state:e,repeatId:a,key:n,keyValue:_,render:i}),P=jt();if(nt(!0),c){let k=y.createContextualFragment(M);b.append(k)}!c&&M&&b.append(M),nt(P)}),o.append(b),l};var Bw=e=>{let t=e.lastElementChild;if(!t)return;let r=t.nextSibling;for(;r;){let o=r.nextSibling;r.nodeType===Node.COMMENT_NODE&&r.remove(),r=o}},lg=({state:e="",current:t=[],previous:r=[],repeaterParentElement:o=document.createElement("div"),render:n,repeatId:s,id:i,useSync:a,currentChildren:c})=>{wn({repeatId:s,currentData:t});let l=t.length,p=r.length,d=l-p;if(d>0){let f=a?og({diff:d,previousLenght:p,current:t,state:e,repeatId:s,render:n}):rg({diff:d,current:t,previousLenght:p,render:n,state:e,repeatId:s});a&&to({stringDOM:f,parent:o,position:"beforeend"}),a||Ss({elements:f,parent:o,position:"beforeend"})}if(d<0){let f=ga({children:c});f.filter((_,S)=>S>=t.length).forEach(_=>{_.forEach(S=>{let E=fs({id:S}),C=bs({id:S}),I=C??E;no({id:i,invalidateParent:I}),oo({id:i,repeatParent:I}),st({id:S}),C&&C.remove()})});let{debug:y}=Nt();if(y&&Bw(o),f.length>0)return t;let b=Cs({repeatId:s});if(!b)return t;b.filter(({index:_})=>_>=t.length).forEach(_=>{let{element:S}=_;no({id:i,invalidateParent:S}),oo({id:i,repeatParent:S}),ir({id:i,container:S}),S.remove()})}return t};var ug=async({state:e="",persistent:t,repeaterParentElement:r=document.createElement("div"),current:o=[],previous:n=[],key:s="",id:i,fallBackParentId:a="",render:c,repeatId:l,useSync:p,currentChildren:d=[]})=>{let y=(eg({current:o,previous:n,key:s})?cg:lg)({state:e,current:o,previous:n,repeaterParentElement:r,key:s,id:i,render:c,repeatId:l,useSync:p,currentChildren:d});return me.set(pt,{element:r,parentId:a??i,persistent:t,source:pd},{emit:!1}),await me.emitAsync(pt),cn(),y};var pg=({state:e="",setState:t,persistent:r=!1,watch:o,clean:n=!1,beforeUpdate:s,afterUpdate:i,key:a="",id:c="",repeatId:l="",render:p,useSync:d=!1})=>{let f=fs({id:c}),h=gs({id:l}),y=h?dn({element:h})??"":"";return i(),o(e,async(T,_)=>{if(!u.checkType(Array,T))return;let S=gs({id:l}),E=Sn({state:e,id:c,type:El}),C=Rh({state:e,id:c,type:El});if(fn({id:c,prop:e}),Xf({id:c,state:e,container:S})){Yr({id:c,prop:e}),t(e,_,{emit:!1}),E(),C();return}let M=Cl({id:c,repeatId:l});f&&await s(),n&&(M.forEach($=>{st({id:$})}),S&&(S.textContent="")),S&&Jf({id:c,state:e,container:S});let P=await ug({state:e,persistent:r,repeaterParentElement:S??document.createElement("div"),current:T,previous:n?[]:_,key:a,id:c,fallBackParentId:y,render:p,repeatId:l,useSync:d,currentChildren:n?[]:M}),k=Cl({id:c,repeatId:l}),A=a&&a!=="",R=ga({children:k,previousChildren:M}),F=A?[...Od({children:R,key:a,current:T,currentUnivoque:P})]:R;F.forEach(($,w)=>{$.forEach(O=>{let D=P?.[w];if(!D)return;let x=A?T.findIndex(N=>`${N?.[a]}`==`${P?.[w]?.[a]}`):w;ji({id:O,value:{current:D,index:x}})})}),u.useNextLoop(async()=>{f&&i(),Yf({id:c,state:e,container:S}),Yr({id:c,prop:e}),E(),C(),ha({invalidateParent:S,id:c}),da({repeatParent:S,id:c}),F.length===0&&Sa({repeatId:l,id:c})})})};var mg=({repeatId:e,persistent:t,state:r,setState:o,emit:n,watch:s,clean:i,beforeUpdate:a,afterUpdate:c,key:l,id:p,render:d,useSync:f})=>{let h=pg({state:r,setState:o,persistent:t,emit:n,watch:s,clean:i,beforeUpdate:a,afterUpdate:c,key:l,id:p,repeatId:e,render:d,useSync:f});qf({repeatId:e,unsubscribe:h})};var dg=({repeatId:e,initializeModule:t})=>{let r=G.get(e);r&&G.set(e,{...r,initializeModule:t,unsubscribe:()=>{}})};var hg=({repeatId:e})=>{let t=G.get(e);t&&G.set(e,{...t,initialized:!0})};var fg=({repeatId:e,initialDOMRender:t})=>{let r=G.get(e);r&&G.set(e,{...r,initialRenderWithoutSync:t})};var gg=({repeatId:e,scopeId:t,observe:r})=>{G.set(e,{element:void 0,initialized:!1,scopeId:t,observed:r,nativeDOMChildren:[],componentChildren:[],currentData:[],initialRenderWithoutSync:[],initializeModule:()=>{},unsubscribe:()=>{}})};var bg=({repeatId:e,scopeId:t})=>{let r=Ze.get(t)??[];Ze.set(t,[...r,{repeatId:e}])};var vg=({invalidateId:e,scopeId:t})=>{let r=Qe.get(t)??[];Qe.set(t,[...r,{invalidateId:e}])};var yg=({getState:e,setState:t,updateState:r,getProxi:o,emit:n,emitAsync:s,computed:i,watch:a,id:c,key:l,bindEventsId:p,debug:d})=>({bindEventsId:p,key:l,id:c,getState:e,setState:t,updateState:r,getProxi:o,emit:n,emitAsync:s,computed:i,watch:a,debug:d,repeatIdArray:[],renderComponent:async({attachTo:h,component:y,position:b="afterbegin",clean:T=!0})=>{T&&(ir({id:c,container:h}),h.textContent=""),h.insertAdjacentHTML(b,y),me.set(pt,{element:h,parentId:c,persistent:Ui(c),source:dd},{emit:!1}),await me.emitAsync(pt),cn()},getChildren:h=>Hi({id:c,componentName:h}),freezeProp:h=>{let y=Re.extractkeyFromProp(h);return fn({id:c,prop:y.toString()})},unFreezeProp:h=>{let y=Re.extractkeyFromProp(h);return Yr({id:c,prop:y.toString()})},unBind:()=>_f({id:c}),bindProps:h=>{let y="props"in h?h:{props:h};return`${Fi}="${xf({...y,parentId:c})}" `},staticProps:h=>` ${un}="${ba(h)}" `,remove:()=>{st({id:c})},removeDOM:h=>{ir({id:c,container:h}),h.textContent=""},getParentId:()=>vs(c),watchParent:(h,y)=>{let b=Mt(vs(c),h,y);b&&la({id:c,unWatchArray:[b]})},onMount:h=>bf({id:c,cb:h}),bindEvents:h=>`${Bi}="${yf(h)}"`,delegateEvents:h=>`${er}="${Df(h)}"`,bindEffect:h=>`${pn}="${kf({data:h,id:c})}"`,addMethod:(h,y)=>{Gd({id:c,name:h,fn:y})},setRef:h=>`${tr}="${c}" ${Cr}="${h}"`,getRef:()=>Af({id:c}),getRefs:()=>jl({id:c}),bindText:(h,...y)=>{let b=u.getUnivoqueId(),T=()=>$h(c,h,...y);return Nh(b,{id:c,render:T,props:y}),`<mobjs-bind-text ${wo}="${c}" ${Li}="${b}"></mobjs-bind-text>${T()}`},bindObject:(h,...y)=>{let b=Wh(y),T=u.getUnivoqueId(),_=()=>jh(h,...y);return Bh(T,{id:c,keys:b,render:_}),`<mobjs-bind-object ${wo}="${c}" ${Di}="${T}"></mobjs-bind-object>${_()}`},invalidate:({observe:h,render:y,beforeUpdate:b=()=>Promise.resolve(),afterUpdate:T=()=>{}})=>{let _=Hf(h),S=u.getUnivoqueId(),E=`${Vi}=${S}`,C=()=>y(),I=!1;return vg({invalidateId:S,scopeId:c}),Gf({invalidateId:S,scopeId:c,observe:_}),zf({invalidateId:S,initializeModule:()=>{I||(jf({observe:_,watch:a,beforeUpdate:b,afterUpdate:T,persistent:Ui(c),id:c,invalidateId:S,renderFunction:C}),I=!0,Uf({invalidateId:S}))}}),`<mobjs-invalidate ${E} style="display:none;"></mobjs-invalidate>${C()}`},repeat:({observe:h,clean:y=!1,beforeUpdate:b=()=>Promise.resolve(),afterUpdate:T=()=>{},key:_="",render:S,useSync:E=!1})=>{let C=Re.extractkeyFromProp(h),I=u.getUnivoqueId(),M=_!=="";bg({repeatId:I,scopeId:c}),gg({repeatId:I,scopeId:c,observe:C});let P=e()?.[C],k=M?fa({data:P,key:_}):P;wn({repeatId:I,currentData:k});let A=E?ag({currentUnique:k,key:_,observe:C,repeatId:I,hasKey:M,render:S}):"",R=E?[]:ig({currentUnique:k,render:S,observe:C,repeatId:I,key:_,hasKey:M}),F=!1;return fg({repeatId:I,initialDOMRender:R}),dg({repeatId:I,initializeModule:()=>{F||(mg({repeatId:I,persistent:Ui(c),state:C,setState:t,emit:n,watch:a,clean:y,beforeUpdate:b,afterUpdate:T,key:_,id:c,render:S,useSync:E}),F=!0,hg({repeatId:I}),Sd({repeatId:I})||Sa({repeatId:I,id:c}))}}),`<mobjs-repeat ${Wi}="${I}" style="display:none;"></mobjs-repeat>${A}`}});var Gl=({componentName:e,currentProps:t={}})=>{let o=No()?.[e]?.componentParams?.exportState??[];return Object.entries(t).filter(([n])=>o.includes(n)).reduce((n,s)=>{let[i,a]=s;return{...n,[i]:a}},{})};var Tg=({element:e,parentIdForced:t})=>{let r=e.getId(),o=e.getInstanceName(),n=e.getParentId(),s=dn({element:e}),i=e.getStaticPropsId(),a=e.getDynamicPropsid(),c=e.getBindEventsId(),l=e.getRepeatValue(),p=e.getComponentRepeatId(),d=e.getCurrentKey()??"",f=e.getComponentName(),h=i?.split(" ").join(""),y=va(h),b={...e.dataset},T=e.getRepeaterPropBind(),_=mf(l);return{element:e,props:{...Gl({componentName:f,currentProps:b}),...Gl({componentName:f,currentProps:y})},id:r,componentName:f,instanceName:o,key:d,dynamicPropsId:a,repeatPropBind:T,bindEventsId:c,currentRepeatValue:_,parentId:s,componentRepeatId:p}};var Sg=e=>{hn.add(e)};var _g=({element:e,instanceName:t="",props:r={},state:o={},bindStore:n,methods:s={},key:i="",currentRepeaterState:a=rr,repeaterInnerWrap:c,repeatPropBind:l="",componentRepeatId:p="",parentPropsWatcher:d=[()=>{}],refs:f={},destroy:h=()=>{},freezedPros:y=[],persistent:b=!1,child:T={},parentId:_="",id:S="",componentName:E=""})=>{let C=u.createStore(o);nh({props:r,store:C}),n&&C.bindStore(n),b||Sg(S),p&&p.length>0&&yd({componentId:S,repeatId:p}),t&&t.length>0&&Bd({instanceName:t,id:S});let I=qh({componentName:E}),M=new Set(I);return C.setProxiReadOnlyProp(I),W.set(S,{element:e,componentName:E,instanceName:t,destroy:h,parentPropsWatcher:d,refs:f,methods:s,key:i,currentRepeaterState:a,repeaterInnerWrap:c,repeatPropBind:l,componentRepeatId:p,persistent:b,id:S,parentId:_,freezedPros:y,child:T,state:C}),{getState:()=>C.get(),setState:(P="",k={},{emit:A=!0}={})=>{let R=Mo({id:S,prop:P}),F=Re.extractkeyFromProp(P),$=M.has(F);$&&Gi({prop:F,componentName:E,action:"updateState"}),!(R||$)&&C.set(F,k,{emit:A??!0,usePropAsString:!0})},updateState:(P="",k=()=>{},{emit:A=!0,clone:R=!1}={})=>{let F=Mo({id:S,prop:P}),$=Re.extractkeyFromProp(P),w=M.has($);w&&Gi({prop:$,componentName:E,action:"updateState"}),!(F||w)&&C.update($,k,{emit:A??!0,clone:R??!1,usePropAsString:!0})},getProxi:()=>C.getProxi(),emit:(P="")=>C.emit(P),emitAsync:async(P="")=>await C.emitAsync(P),computed:(P="",k=()=>{},A=[])=>{let R=Re.extractkeyFromProp(P);if(M.has(R)){Gi({prop:R,componentName:E,action:"computed"});return}return C.computed(R,k,A,{usePropAsString:!0})},watch:(P="",k=()=>{},{wait:A=!1,immediate:R=!1}={})=>C.watch(P,k,{wait:A??!1,immediate:R??!1}),debug:()=>C.debug()}};var xg=({id:e})=>(Qe.get(e)??[]).map(({invalidateId:r})=>{let o=ve.get(r);if(o)return{invalidateId:r,initializeModule:o.initializeModule}}).filter(r=>r!==void 0);var Cg=({id:e})=>(Ze.get(e)??[]).map(({repeatId:r})=>{let o=G.get(r);if(o)return{repeatId:r,initializeModule:o.initializeModule}}).filter(r=>r!==void 0);var Eg=async({element:e,persistent:t=!1,parentIdForced:r="",source:o=Ur})=>{let{debug:n}=Nt();n&&console.log("parse source:",o);let s=No(),i=[],a=Ll({element:e,currentSelectors:[]}),c=a.parseSourceArray,l=a?.componentToParse;for(;l;){let d=l.getComponentName(),f=s?.[d]?.componentFunction,h=s?.[d]?.componentParams,{scoped:y,bindStore:b}=h,{props:T,id:_,componentName:S,instanceName:E,key:C,dynamicPropsId:I,currentRepeatValue:M,bindEventsId:P,parentId:k,componentRepeatId:A,repeatPropBind:R}=Tg({element:l,parentIdForced:r}),F=h?.state??{},{getState:$,setState:w,updateState:O,getProxi:D,emit:x,emitAsync:N,computed:L,watch:B,debug:j}=_g({element:l,props:T,state:F,id:_,componentName:S,instanceName:E,key:C,repeatPropBind:R,persistent:t,parentId:k,componentRepeatId:A,bindStore:b});sh({id:_}),A&&A?.length>0&&(ji({id:_,value:M}),Ad({id:_,repeatId:A,element:l})),Cf({propsId:I,repeatPropBind:R,componentId:_});let X=yg({getState:$,setState:w,updateState:O,getProxi:D,emit:x,emitAsync:N,computed:L,watch:B,id:_,key:C,bindEventsId:P,debug:j}),ue=await f(X),ye=l.classList,{newElement:ee}=df({content:ue,element:l});if(vh(),ye.length>0&&ee?.classList.add(...ye),!0,!ee)return;Cd({id:_,newElement:ee});let pe=xg({id:_}),he=Cg({id:_});P&&Tf({element:ee,componentId:_,bindEventsId:P});let be=y??Nt().scoped;be&&await Dl({id:_,element:ee}),ee?.inizializeCustomComponent?.(X),i.push({onMount:async()=>{be||await Dl({id:_,element:ee})},initializeBindPropsWatcher:()=>{Vl({componentId:_,repeatPropBind:R,inizilizeWatcher:!0})},fireInvalidateFunction:pe.length>0?()=>{pe.forEach(({initializeModule:q})=>{q?.()})}:()=>{},fireRepeatFunction:he.length>0?()=>{he.forEach(({initializeModule:q})=>{q?.()})}:()=>{}});let Ie=Ll({element:e,currentSelectors:c});c=Ie.parseSourceArray,l=Ie.componentToParse;let De=$l()===Nt().maxParseIteration;if(hf(),De){console.warn(`dom parse reached max parse limit: ${$l()}`);break}}let p=Nf({element:e});Object.keys(p).length>0&&Pf(p);for(let d of i.toReversed()){let{onMount:f,initializeBindPropsWatcher:h,fireInvalidateFunction:y,fireRepeatFunction:b}=d;await f(),b(),y(),h()}i.length=0,c.length=0,l=null,Ff(e),Rf(e),Lh(),Hh()};var Es=async({element:e,persistent:t=!1,parentIdForced:r="",source:o=Ur})=>{await Eg({element:e,persistent:t,parentIdForced:r,source:o}),ff()},wg=()=>{me.watch(pt,async({element:e,parentId:t,persistent:r=!1,source:o=Ur})=>{await Es({element:e,parentIdForced:t??"",persistent:r,source:o})})};var Ig=()=>{tg(),Sf(),Ef()};var Mg,kg,Rg=({fn:e})=>{e&&(kg=e)},Ng=({fn:e})=>{e&&(Mg=e)},Pg=()=>kg,Ag=()=>Mg;var Og=!0,$g=e=>{Og=e},Lg=()=>Og;var Dg=()=>{for(let e of hn)st({id:e})};var Fg=new Map,Bg=({route:e,params:t})=>Object.entries(t).reduce((r,[o,n])=>`${r}-${o}-${n}`,e),Vg=async({route:e="",templateName:t="",isBrowserNavigation:r=!1,params:o={},skipTransition:n})=>{me.set(Kt,!0),await wr();let s=zi();if(!s||!(s instanceof HTMLElement))return;let{activeRoute:i,activeParams:a}=me.get(),c=Bg({route:e,params:o}),l=Bg({route:i.route,params:a}),p=window.scrollY;Fg.set(l,p);let d=Fg.get(c)??0;me.set(Eo,{currentRoute:i.route,currentTemplate:i.templateName,nextRoute:e,nextTemplate:t});let f=!1,h=me.watch(Eo,()=>{f=!0});Ig(),me.set(nn,{route:e,templateName:t}),me.set(sn,o);let y=yn({hash:e}),b=n||y?.skipTransition,T=y?.props??{},_=await y?.layout?.({params:o,props:T})??"",S=Pg(),E=s.cloneNode(!0);S&&E&&!b&&(await S({oldNode:E,oldRoute:i.route,newRoute:e,oldTemplateName:i.templateName,newTemplateName:t}),s?.parentNode?.insertBefore(E,s)),s.replaceChildren(),Dg(),to({stringDOM:_,parent:s,position:"afterbegin"}),await Es({element:s}),b||(s.style.visibility=""),f||me.set(an,{currentRoute:e,currentTemplate:t,previousRoute:i.route,previousTemplate:i.templateName}),Lg()&&r?scrollTo(0,d):scrollTo(0,0),document.body.dataset.route=e,document.body.dataset.template=t;let C=Ag();C&&!b&&(await C({oldNode:E,newNode:s,oldRoute:i.route,newRoute:e,oldTemplateName:i.templateName,newTemplateName:t}),E.remove()),E=null,h?.(),me.set(Kt,!1)};var Wg=({route:e})=>e,jg=e=>{Wg=e},Hg=({route:e})=>{let t=Wg({route:e});return{route:t,isRedirect:t!==e}};var zg=({hash:e=""})=>{let t=oa(),r=af();return e===""?t:yn({hash:e})?e:r},Ug=({hash:e=""})=>yn({hash:e})?.templateName??"",Gg=({hash:e=""})=>yn({hash:e})?.restoreScroll??!0;var qg="",Jg=!0,Ir="",Yg="",so,Jl,ws,Yl=e=>e.replace("?","").replace("/",""),Xg=e=>e.replace("#","").replace("/","").replace(".",""),Vw=e=>e.split("&").reduce((t,r)=>{let o=r.split("="),n=Yl(o?.[0]??""),s=o?.[1];return n&&n.length>0?{...t,[n]:s}:t},{}),Ww=e=>e&&Object.entries(e).reduce((t,[r,o],n)=>`${t}${n===0?"":"&"}${r}=${o}`,"");document.addEventListener("click",e=>{if(!e.target)return;e.target.closest("a")&&me.getProp(Kt)&&e.preventDefault()},{passive:!1});var _a=async({shouldLoadRoute:e=!0}={})=>{let t=globalThis.location.hash,r={hash:t},{routeIsLoading:o}=me.get();if(o){globalThis.location.hash=qg.replace("#","");return}ws||history.replaceState({nextId:r},"",t);let{route:n,isRedirect:s}=Hg({route:t});s&&history.replaceState({nextId:r},"",`#${n}`);let i=n.split("?"),a=Yl(i?.[1]??"");Yg=Ir,Ir=Xg(i?.[0]??"");let c=Vw(so??a),l=so||Object.keys(a).length>0?`?${so??a}`:"";so=void 0;let p=zg({hash:Ir}),d=Ug({hash:Ir&&Ir.length>0?Ir:oa()}),f=Ir===Yg&&l.length===0&&!Jg;e&&!f&&(qg=`#${Ir}${l}`,await Vg({route:p,templateName:d,isBrowserNavigation:Gg({hash:Ir})&&!!ws,params:c,skipTransition:!!(ws??Jl)})),e||(me.set(nn,{route:p,templateName:d}),me.set(sn,c)),Jl=void 0,u.useNextLoop(()=>{Jg=!1})},Kg=()=>{_a(),globalThis.history.scrollRestoration="manual",globalThis.addEventListener("popstate",e=>{ws=e?.state?.nextId}),globalThis.addEventListener("hashchange",async()=>{await eo(),_a()})},Qg=({url:e,params:t,skipTransition:r})=>{if(!e||me.getProp(Kt))return;Jl=r;let o=e.split("?"),n=Xg(o?.[0]??""),s=Ww(t),i=Yl(o?.[1]??""),a=s??i;so=a.length>0?a:"",ws=void 0,globalThis.location.hash=so&&so.length>0?`${n}?${so}`:n,globalThis.dispatchEvent(new HashChangeEvent("hashchange"))};var Zg=async({rootId:e,wrapper:t,contentId:r,routes:o=[],afterInit:n=()=>{},redirect:s=({route:f})=>f,index:i="home",pageNotFound:a="pageNotFound",beforePageTransition:c,pageTransition:l,restoreScroll:p=!0,componentDefaultProps:d={scoped:!1,maxParseIteration:1e4,debug:!1}})=>{Kh(d);let f=document.querySelector(e),h=await t();jg(s),!(!r||!f)&&(Dd({contentId:r}),$f({element:f}),Ng({fn:l}),Rg({fn:c}),$g(p),wg(),Gh(),of(o),nf({hash:i}),sf({hash:a}),to({stringDOM:h,parent:f,position:"afterbegin"}),Fd(),_a({shouldLoadRoute:!1}),await Es({element:f,persistent:!0}),u.useFrameIndex(()=>{u.useNextTick(()=>{n()})},5),Kg())};var eb=()=>ve.size;var tb=()=>G.size;var ce={};So(ce,{clamp:()=>rt,getDefault:()=>Qw,mq:()=>eI,printDefault:()=>Zw,setDefault:()=>Kw});var $o={default:{tension:20,mass:1,friction:5,velocity:0,precision:.01},gentle:{tension:120,mass:1,friction:14,velocity:0,precision:.01},wobbly:{tension:180,mass:1,friction:12,velocity:0,precision:.01},bounce:{tension:200,mass:3,friction:5,velocity:0,precision:.01},scroller:{tension:10,mass:1,friction:5,velocity:0,precision:.5}};var de={easeLinear:"easeLinear",easeInQuad:"easeInQuad",easeOutQuad:"easeOutQuad",easeInOutQuad:"easeInOutQuad",easeInCubic:"easeInCubic",easeOutCubic:"easeOutCubic",easeInOutCubic:"easeInOutCubic",easeInQuart:"easeInQuart",easeOutQuart:"easeOutQuart",easeInOutQuart:"easeInOutQuart",easeInQuint:"easeInQuint",easeOutQuint:"easeOutQuint",easeInOutQuint:"easeInOutQuint",easeInSine:"easeInSine",easeOutSine:"easeOutSine",easeInOutSine:"easeInOutSine",easeInExpo:"easeInExpo",easeOutExpo:"easeOutExpo",easeInOutExpo:"easeInOutExpo",easeInCirc:"easeInCirc",easeOutCirc:"easeOutCirc",easeInOutCirc:"easeInOutCirc",easeInElastic:"easeInElastic",easeOutElastic:"easeOutElastic",easeInOutElastic:"easeInOutElastic",easeInBack:"easeInBack",easeOutBack:"easeOutBack",easeInOutBack:"easeInOutBack",easeInBounce:"easeInBounce",easeOutBounce:"easeOutBounce",easeInOutBounce:"easeInOutBounce"},ks="min",rb="max",Kl="desktop",Rs="easeLinear",Is="default",Ql={xSmall:320,small:360,medium:600,tablet:768,desktop:992,large:1200,xLarge:1600,xxLarge:1980},Zl=10,Ms=.06,eu="#ff0000",tu="#14df3b",ru=8,ou=10,nu=1e3,su=!1,Hw=!1,zw=!1,Uw=.01,Gw=.06,ob=e=>{let t=He({prop:"deferredNextTick",value:e?.deferredNextTick,defaultValue:u.store.getProp("deferredNextTick"),type:Boolean}),r=He({prop:"usePassive",value:e?.usePassive,defaultValue:u.store.getProp("usePassive"),type:Boolean}),o=He({prop:"throttle",value:e?.throttle,defaultValue:u.store.getProp("throttle"),type:Number}),n=qw(e?.mq??{}),s=He({prop:"defaultMq.value",value:e?.defaultMq?.value,defaultValue:Kl,type:String}),i=He({prop:"defaultMq.type",value:e?.defaultMq?.type,defaultValue:ks,type:String}),a=He({prop:"sequencer.duration",value:e?.sequencer?.duration,defaultValue:Zl,type:Number}),c=Xl(e?.sequencer?.ease,"sequencer"),l=He({prop:"scrolTrigger.springConfig",value:e?.scrollTrigger?.springConfig,defaultValue:Is,type:String}),p=He({prop:"scrolTrigger.lerpConfig",value:e?.scrollTrigger?.lerpConfig,defaultValue:Ms,type:Number}),d=He({prop:"scrolTrigger.markerColor.startEnd",value:e?.scrollTrigger?.markerColor?.startEnd,defaultValue:eu,type:String}),f=He({prop:"scrolTrigger.markerColor.item",value:e?.scrollTrigger?.markerColor?.item,defaultValue:tu,type:String}),h=He({prop:"parallax.defaultRange",value:e?.parallax?.defaultRange,defaultValue:ru,type:Number}),y=He({prop:"parallax.springConfig",value:e?.parallax?.springConfig,defaultValue:Is,type:String}),b=He({prop:"parallax.lerpConfig",value:e?.parallax?.lerpConfig,defaultValue:Ms,type:Number}),T=He({prop:"parallaxTween.duration",value:e?.parallaxTween?.duration,defaultValue:ou,type:Number}),_=Xl(e?.parallaxTween?.ease,"parallaxTween"),S=He({prop:"tween.duration",value:e?.tween?.duration,defaultValue:nu,type:Number}),E=Xl(e?.tween?.ease,"tween"),C=He({prop:"tween.relative",value:e?.tween?.relative,defaultValue:su,type:Boolean}),I=He({prop:"spring.relative",value:e?.spring?.relative,defaultValue:Hw,type:Boolean}),M=He({prop:"lerp.relative",value:e?.lerp?.relative,defaultValue:zw,type:Boolean}),P=He({prop:"lerp.precision",value:e?.lerp?.precision,defaultValue:Uw,type:Number}),k=He({prop:"lerp.velocity",value:e?.lerp?.velocity,defaultValue:Gw,type:Number});return{deferredNextTick:t,throttle:o,usePassive:r,mq:n,defaultMq:{value:s,type:i},sequencer:{duration:a,ease:c},scrollTrigger:{springConfig:l,lerpConfig:p,markerColor:{startEnd:d,item:f}},parallax:{defaultRange:h,springConfig:y,lerpConfig:b},parallaxTween:{duration:T,ease:_},tween:{duration:S,ease:E,relative:C},spring:{relative:I,config:e?.spring?.config?{...$o,...e.spring.config}:$o},lerp:{relative:M,precision:P,velocity:k}}},He=({prop:e,value:t,defaultValue:r,type:o})=>{let n=u.checkType(o,t);return n||console.warn(`handleSetUp error: ${e}: ${t}, is not valid must be a ${u.getTypeName(o)}`),n?t:r},qw=e=>{let t=u.checkType(Object,e)&&Object.values(e).every(r=>u.checkType(Number,r));return t||console.warn("handleSetUp error: mq must be an object as { ..., String: Number }"),t?e:Ql},Xl=(e,t)=>{let r=Object.keys(de).includes(e);return!r&&e!==void 0&&e!==null&&console.warn(`handleSetUp error: ${t}.ease properties is not valid`),r?e:Rs};var it=(e,t,r=!0)=>{e=(n=>{let s;try{s=JSON.parse(JSON.stringify(n))}catch{s=Object.assign({},n)}return s})(e);let o=n=>n&&typeof n=="object";return!o(e)||!o(t)?t:(Object.keys(t).forEach(n=>{let s=e[n],i=t[n];Array.isArray(s)&&Array.isArray(i)?r?(e[n]=s.map((a,c)=>i.length<=c?a:it(a,i[c],r)),i.length>s.length&&(e[n]=e[n].concat(i.slice(s.length)))):e[n]=s.concat(i):o(s)&&o(i)?e[n]=it(Object.assign({},s),i,r):e[n]=i}),e)};function nb(){return{deferredNextTick:u.store.getProp("deferredNextTick"),throttle:u.store.getProp("throttle"),usePassive:u.store.getProp("usePassive"),mq:Ql,defaultMq:{value:Kl,type:ks},sequencer:{duration:Zl,ease:Rs},scrollTrigger:{springConfig:Is,lerpConfig:Ms,markerColor:{startEnd:eu,item:tu}},parallax:{defaultRange:ru,springConfig:Is,lerpConfig:Ms},parallaxTween:{duration:ou,ease:Rs},tween:{duration:nu,ease:Rs,relative:su},spring:{relative:!1,config:$o},lerp:{relative:!1,precision:.01,velocity:.06}}}var ae=(()=>{let e=nb();return{set:n=>{e=ob(it(nb(),n)),"usePassive"in n&&u.store.set("usePassive",e.usePassive),"deferredNextTick"in n&&u.store.set("deferredNextTick",e.deferredNextTick),"throttle"in n&&u.store.set("throttle",e.throttle)},get:n=>(n in e||console.warn(`handleSetUp: ${n} is not a setup propierties`),e[n]),print:()=>{console.log("Writable props:"),console.log(e)}}})();var Jw=(e="desktop")=>window.innerWidth<ae.get("mq")[e],Yw=(e="desktop")=>window.innerWidth>=ae.get("mq")[e],Xw=(e="desktop")=>ae.get("mq")[e],ge={max:Jw,min:Yw,getBreackpoint:Xw};var _e=e=>{if(u.checkType(Number,e))return Math.round(e*1e4)/1e4||0;if(Math.abs(e)<1){let t=Number.parseInt(e.toString().split("e-")[1]);t&&(e*=Math.pow(10,t-1),e="0."+Array.from({length:t}).join("0")+e.toString().slice(2))}else{let t=Number.parseInt(e.toString().split("+")[1]);t>20&&(t-=20,e/=Math.pow(10,t),e+=Array.from({length:t+1}).join("0"))}return Number.parseFloat(Number.parseFloat(e).toFixed(4))},rt=(e,t,r)=>Math.min(Math.max(e,t),r),sb=(e,t,r)=>(1-r)*e+r*t,io=(e,t)=>{let r=Object.keys(e).toSorted(),o=Object.keys(t).toSorted();return r.length===o.length&&r.every((n,s)=>n===o[s])},Ns=(e,t)=>{let r=[];for(let o=0;o<e.length;o+=t){let n=e.slice(o,o+t);r.push(n)}return r},ib=(e,t)=>e.map(r=>r[t]);function Kw(e){ae.set(e)}function Qw(e){return ae.get(e)}function Zw(){ae.print()}function eI(e,t){switch(e){case"min":return ge.min(t);case"max":return ge.max(t);case"get":return ge.getBreackpoint(t)}}var z={};So(z,{createLerp:()=>gI,createMasterSequencer:()=>mI,createScrollerTween:()=>uI,createSequencer:()=>pI,createSpring:()=>fI,createStaggers:()=>dI,createTimeTween:()=>hI});var xa=e=>e.map(t=>(t.settled||(t.fromValue=t.currentValue),t)),Mr=e=>e.map(t=>(t.fromValue=t.toValue,t.currentValue=t.toValue,t)),In=e=>e.map(t=>(t.toValue=t.currentValue,t.fromValue=t.currentValue,t)),kr=(e,t)=>{let r=Object.keys(e);return t.map(o=>{if(r.includes(o.prop)){let n=o.fromValue,s=o.toValue;o.fromValue=s,o.toValue=n}return o})},Mn=(e,t)=>e.map(r=>(r.toValue=t?r.toValue+r.currentValue:r.toValue,r));var iu=(e,t)=>e.map(r=>(r.shouldUpdate&&(r.toValProcessed=t?r.toValue+1e-5:r.toValue-r.fromValue+1e-5),r));var Ca="radial",ar="start";var kn="center",Rn="edges",Nn="random",ab="MERGE_FROM_UP",au="MERGE_FROM_DOWN",Lo="equal",Do="start";var Fo="center",Pn={type:Lo,each:0,waitComplete:!1,from:ar,grid:{col:1,row:1,direction:"col"}},Ge={index:0,frame:0};var v={PX:"px",VH:"vh",VW:"vw",WPERCENT:"w",HPERCENT:"h",DEGREE:"deg",PLUS_HEIGHT:"+height",PLUS_HEIGHT_HALF:"+halfHeight",PLUS_WIDTH:"+width",PLUS_WIDTH_HALF:"+halfWidth",MINUS_HEIGHT:"-height",MINUS_HEIGHT_HALF:"-halfHeight",MINUS_WIDTH:"-width",MINUS_WIDTH_HALF:"-halfWidth",POSITION_BOTTOM:"bottom",POSITION_TOP:"top",POSITION_LEFT:"left",POSITION_RIGHT:"right",DIRECTION_VERTICAL:"vertical",DIRECTION_HORIZONTAL:"horizontal",TYPE_PARALLAX:"parallax",TYPE_SCROLLTRIGGER:"scrolltrigger",PROP_VERTICAL:"y",PROP_HORIZONTAL:"x",PROP_ROTATE:"rotate",PROP_ROTATEY:"rotateY",PROP_ROTATEX:"rotateX",PROP_ROTATEZ:"rotateZ",PROP_OPACITY:"opacity",PROP_SCALE:"scale",PROP_SCALE_X:"scaleX",PROP_SCALE_Y:"scaleY",PROP_TWEEN:"tween",TWEEN_TWEEN:"parallaxTween",TWEEN_TIMELINE:"sequencer",ALIGN_START:"start",ALIGN_TOP:"top",ALIGN_RIGHT:"right",ALIGN_CENTER:"center",ALIGN_BOTTOM:"bottom",ALIGN_LEFT:"left",ALIGN_END:"end",IN_STOP:"in-stop",IN_BACK:"in-back",OUT_STOP:"out-stop",OUT_BACK:"out-back",EASE_SPRING:"spring",EASE_LERP:"lerp",EASE_PRECISION:.001,SCROLL_UP:"up",SCROLL_DOWN:"down",ON_LEAVE:"ON_LEAVE",ON_LEAVE_BACK:"ON_LEAVE_BACK",ON_ENTER:"ON_ENTER",ON_ENTER_BACK:"ON_ENTER_BACK",ON_NOOP:"ON_NOOP"};var Rr=e=>e.map(t=>`${t} | `).join(""),ao=(e,t,r)=>{console.warn(`${e}: ${JSON.stringify(t)} and to ${JSON.stringify(r)} is not equal`)},Pt=e=>{console.warn(`stagger col of grid is out of range, it must be less than ${e} ( staggers length )`)},Nr=e=>{console.warn(`tween | sequencer: ${e} is not valid value, must be a number or a Function that return a number`)},cb=e=>{console.warn(`sequencer, start option: ${e} value is not valid, must be a Number`)},lb=e=>{console.warn(`sequencer, end option: ${e} value is not valid, must be a Number`)},ub=()=>{console.warn("relative prop is not allowed inside a timeline")},pb=e=>{console.warn(`Timeline Supend: ${e()} is not a valid value, must be a boolean`)},mb=()=>{console.warn("SyncTimeline: in revese ( or yoyo mode) only goTo || goFromTo || set action is allowed. Using goFrom makes no sense in this context. Enable forceFromTo to use from action in reverse mode")},db=e=>{console.warn(`timeline setTween: ${e} is not an array of tween`)},hb=e=>{console.warn(`timeline setTween: ${e} is not a string`)},fb=e=>{console.warn(`asyncTimeline.setTween() label: ${e} not found`)},gb=()=>{console.warn("setTween fail")},bb=e=>{console.warn(`label ${e} not founded`)},vb=e=>{console.warn(`sequencer.add(fn,time) ${e}: fn must be Function`)},yb=e=>{console.warn(`sequencer.add(fn,time) ${e}: time must be a Number`)},cu=e=>{console.warn(`${e} doesn't exist in spring configuration list`)},Tb=()=>{console.warn("Spring configProps: all prop must be a positive Number")},Sb=e=>{console.warn(`Spring config: ${e}: config must have friction/mass/precision/tesnion props and must be a number`)},Bo=e=>{console.warn(`${e} doesn't exist in tweens ease function`)},Ea=()=>{console.warn("stagger each must be a Number ")},_b=e=>{console.warn(`stagger, row/col: ${e} value is not valid, must be a Number`)},xb=()=>{console.warn("Stagger error: waitComplete propierties must be a Boolean")},Cb=()=>{console.warn("Stagger error: in grid option direction should be a string radial/col/row")};var Eb=()=>{console.warn("Stagger error: in col/row direction 'from' propierties must be a string start/end/center/edges or a number")},wb=e=>{console.warn(`Stagger error: from: ${e} is not a valid value, must be a string start/end/center/edges or a number or a Object {x:Number,y:Number}`)},Ib=e=>{console.warn(`duration error: ${e} is not valid duration must be a number`)},Mb=e=>{console.warn(`duration error: ${e} is not valid duration must be a number or a Function that return a number`)},kb=e=>{console.warn(`repeat error: ${e} is not valid repeat value must be a Number`)};var Rb=e=>{console.warn(`data inizializiation error; ${e} is not a valid value, must be a string`)},Nb=e=>{console.warn(`data inizializiation error; ${e} is not a valid value, must be a number`)},Pb=()=>{console.warn("createStaggers error: items array can not be empty")},Ab=()=>{console.warn("createStaggers error: each element of the array must be an Element or an Object")},Ob=()=>{console.warn(`screateStaggers error: type should be: ${Lo} || ${ar} || ${"end"} || ${Fo}`)},$b=e=>{console.warn(`createStagger:  each must be between 1 and ${e}`)},Lb=(e,t)=>{console.warn(`${t}: relative prop: ${e} is not a valid parameter, must be a boolean `)},lu=(e,t)=>{console.warn(`${t}: '${e}' is not Boolean`)},Db=(e,t)=>{console.warn(`${t}: '${e}' is not String`)},Fb=(e,t)=>{console.warn(`${t}: '${e}' is not Number`)},Bb=(e,t)=>{console.warn(`${t}: '${e}' is not Function`)},Vb=()=>{console.warn("Lerp error: velocity is not valid, must be a Number greater than 0 and less than 1")},Wb=()=>{console.warn("Lerp error: precision is not valid, must be a number greater than 0")},On=e=>{console.warn(`asyncTimeline error: ${e} cannot be used inside group`)},jb=e=>{console.warn(`${e} value must be a string`)},Hb=()=>{console.warn("tween added to asyncTimeline or used inside sync() method must be instance of HandleLerp | HandleTween | HandleSpring")},zb=()=>{console.warn("asyncTimeline arror: delay must be a Number")},Ub=e=>{console.warn(`${e} not found`)},Gb=e=>{console.warn(`timeline add async function, ${e} is not a function `)},qb=(e,t)=>{console.warn(`${t} direction: ${e} is not valid value: must be ${v.DIRECTION_VERTICAL} | ${v.DIRECTION_HORIZONTAL}`)},Jb=e=>{console.warn(`scrollTrigger error; ${e} propierties: value must be a Object like { position: top|bottom|left|right, value: () => { return Number} } `)},Yb=()=>{console.warn("scrollTrigger error; dynamicRange propierties: value must be a Function that return a Number")},Xb=()=>{console.warn("parallax|scrolTrigger error: tween is not valid, must be an instance of HandleSequencer || ParallaxTween")},Kb=(e,t)=>{console.warn(`parallax error align propierties: ${e} is not valid must be one of ${Rr(t)} or a Number between 0 and 100`)},Qb=(e,t)=>{console.warn(`parallax error align propierties: ${e} is not valid must be one of ${Rr(t)}`)},Zb=(e,t)=>{console.warn(`${t}: '${e}' is not Number, must be a number between 0 and 100`)},ev=(e,t)=>{console.warn(`parallax error type propierties: ${e} is not valid must be one of ${Rr(t)}`)},tv=(e,t)=>{console.warn(`parallax/scrollTrigger error propierties props: ${e} is not valid must be one of ${Rr(t)} or a custom css propierites like margin|line-height|...`)},rv=(e,t)=>{console.warn(`parallax error easeType props: ${e} is not valid must be one of ${Rr(t)}`)},ov=(e,t,r)=>{console.warn(`${r} error easeType props: ${e} is not valid must be one of ${Rr(t)}`)},nv=()=>{console.warn('Scrolltrigger warning: spring animation is only available for native properties and scrollerTween, Check that with the "propierties" property set to "tween" no HandleSequencer is associated with the "tween" property')},sv=(e,t)=>{console.warn(`parallax/scrollTrigger error springConfig props: ${e} is not valid must be one of ${Rr(t)}`)},iv=e=>{console.warn(`parallax error range propierties, current value: ${e}, the value must be a number between 0 and 9.99`)},av=e=>{console.warn(`scrollTrigger error range propierties: ${e} is not a String`)},uu=(e,t,r,o)=>{console.warn(`${o} error ${r} propierties: ${e} is not valid must be one of ${Rr(t)}`)},cv=()=>{console.warn("Parallax warning: if propierties is a tween the only choice is ParallaxTween, HandleSequencer or empty tween propierites is not allowed inside a parallax")},lv=()=>{console.warn("parallax/ScrollTrrigger error: velocity is not valid, must be a Number greater than 0 and less than 1")},uv=()=>{console.warn('parallax/ScrollTrrigger warning:  The property is "tween" but no tween has been associated, associate a tween with the "tween" property')},pv=()=>{console.warn('parallax/ScrollTrrigger: there is tween associated but pros "propierties" is not set to "tween"')},mv=(e,t)=>{console.warn(`${e}: ${t} is not a function`)},pu=(e,t,r)=>{console.warn(`scrollTrigger error range : with '${t}' propierties ${e} is not valid, add one of the following unit misure: ${Rr(r)}, es: 45deg|100px|50vw etc..`)},dv=e=>{console.warn(`scrollTrigger error range : with custom css propierties '${e}' no unit misure is necessary, the default unit misure will be used (px). Only '-' for negative value is allowed`)},hv=(e,t)=>{console.warn(`scrollTrigger error range : with '${t}' propierties ${e} is not valid no unit misure is necessary. Only '-' for negative value is allowed`)};var Ht={[de.easeLinear]:(e,t,r,o)=>r*e/o+t,[de.easeInQuad]:(e,t,r,o)=>r*(e/=o)*e+t,[de.easeOutQuad]:(e,t,r,o)=>-r*(e/=o)*(e-2)+t,[de.easeInOutQuad]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e+t:-r/2*(--e*(e-2)-1)+t,[de.easeInCubic]:(e,t,r,o)=>r*(e/=o)*e*e+t,[de.easeOutCubic]:(e,t,r,o)=>r*((e=e/o-1)*e*e+1)+t,[de.easeInOutCubic]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e+t:r/2*((e-=2)*e*e+2)+t,[de.easeInQuart]:(e,t,r,o)=>r*(e/=o)*e*e*e+t,[de.easeOutQuart]:(e,t,r,o)=>-r*((e=e/o-1)*e*e*e-1)+t,[de.easeInOutQuart]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e*e+t:-r/2*((e-=2)*e*e*e-2)+t,[de.easeInQuint]:(e,t,r,o)=>r*(e/=o)*e*e*e*e+t,[de.easeOutQuint]:(e,t,r,o)=>r*((e=e/o-1)*e*e*e*e+1)+t,[de.easeInOutQuint]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e*e*e+t:r/2*((e-=2)*e*e*e*e+2)+t,[de.easeInSine]:(e,t,r,o)=>-r*Math.cos(e/o*(Math.PI/2))+r+t,[de.easeOutSine]:(e,t,r,o)=>r*Math.sin(e/o*(Math.PI/2))+t,[de.easeInOutSine]:(e,t,r,o)=>-r/2*(Math.cos(Math.PI*e/o)-1)+t,[de.easeInExpo]:(e,t,r,o)=>e===0?t:r*Math.pow(2,10*(e/o-1))+t,[de.easeOutExpo]:(e,t,r,o)=>e===o?t+r:r*(-Math.pow(2,-10*e/o)+1)+t,[de.easeInOutExpo]:(e,t,r,o)=>e===0?t:e===o?t+r:(e/=o/2)<1?r/2*Math.pow(2,10*(e-1))+t:r/2*(-Math.pow(2,-10*--e)+2)+t,[de.easeInCirc]:(e,t,r,o)=>-r*(Math.sqrt(1-(e/=o)*e)-1)+t,[de.easeOutCirc]:(e,t,r,o)=>r*Math.sqrt(1-(e=e/o-1)*e)+t,[de.easeInOutCirc]:(e,t,r,o)=>(e/=o/2)<1?-r/2*(Math.sqrt(1-e*e)-1)+t:r/2*(Math.sqrt(1-(e-=2)*e)+1)+t,[de.easeInElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o)===1?t+r:(s||(s=o*.3),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),-(i*Math.pow(2,10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s))+t)},[de.easeOutElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o)===1?t+r:(s||(s=o*.3),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),i*Math.pow(2,-10*e)*Math.sin((e*o-n)*(2*Math.PI)/s)+r+t)},[de.easeInOutElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o/2)===2?t+r:(s||(s=o*(.3*1.5)),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),e<1?-.5*(i*Math.pow(2,10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s))+t:i*Math.pow(2,-10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s)*.5+r+t)},[de.easeInBack]:(e,t,r,o,n=1.70158)=>r*(e/=o)*e*((n+1)*e-n)+t,[de.easeOutBack]:(e,t,r,o,n=1.70158)=>r*((e=e/o-1)*e*((n+1)*e+n)+1)+t,easeInOutBack:(e,t,r,o,n=1.70158)=>(e/=o/2)<1?r/2*(e*e*(((n*=1.525)+1)*e-n))+t:r/2*((e-=2)*e*(((n*=1.525)+1)*e+n)+2)+t,[de.easeInBounce]:(e,t,r,o)=>r-Ht[de.easeOutBounce](o-e,0,r,o)+t,[de.easeOutBounce]:(e,t,r,o)=>(e/=o)<1/2.75?r*(7.5625*e*e)+t:e<2/2.75?r*(7.5625*(e-=1.5/2.75)*e+.75)+t:e<2.5/2.75?r*(7.5625*(e-=2.25/2.75)*e+.9375)+t:r*(7.5625*(e-=2.625/2.75)*e+.984375)+t,[de.easeInOutBounce]:(e,t,r,o)=>e<o/2?Ht[de.easeInBounce](e*2,0,r,o)*.5+t:Ht[de.easeOutBounce](e*2-o,0,r,o)*.5+r*.5+t};var mt=e=>e in Ht?Ht[e]:(Bo(e),Ht[ae.get("tween").ease]);var fv=e=>e?e.replaceAll(/[\s#$()*+,.?[\\\]^{|}-]/g,String.raw`\$&`):"",mu=e=>/^[+-]?\d+(\.\d+)?$/.test(e),gv=e=>/^\d+\.\d+$|^\d+$/.test(e),Ae=(e,t)=>{let r=new RegExp(`^${fv(t)}$`,"i");return(e.match(r)||[]).length},cr=(e,t)=>{let r=new RegExp(`[0-9]${t}$`,"i");return(e.match(r)||[]).length},du=(e,t)=>e.some(r=>{let o=new RegExp(`[0-9]${r}$`,"i");return(t.match(o)||[]).length}),hu=(e,t)=>e.some(r=>{let o=new RegExp(`^${fv(r)}$`,"i");return(t.match(o)||[]).length});var bv=e=>e&&(Ae(e,v.PROP_VERTICAL)?v.PROP_VERTICAL:Ae(e,v.PROP_HORIZONTAL)?v.PROP_HORIZONTAL:Ae(e,v.PROP_ROTATE)?v.PROP_ROTATE:Ae(e,v.PROP_ROTATEY)?v.PROP_ROTATEY:Ae(e,v.PROP_ROTATEX)?v.PROP_ROTATEX:Ae(e,v.PROP_OPACITY)?v.PROP_OPACITY:Ae(e,v.PROP_SCALE)?v.PROP_SCALE:Ae(e,v.PROP_SCALE_X)?v.PROP_SCALE_X:Ae(e,v.PROP_SCALE_Y)?v.PROP_SCALE_Y:Ae(e,v.PROP_TWEEN)?v.PROP_TWEEN:e),vv=e=>{if(e){if(cr(e,v.PX))return v.PX;if(cr(e,v.VH))return v.VH;if(cr(e,v.VW))return v.VW}return""},wa=e=>Ae(e,v.POSITION_TOP)?v.POSITION_TOP:Ae(e,v.POSITION_BOTTOM)?v.POSITION_BOTTOM:Ae(e,v.POSITION_LEFT)?v.POSITION_LEFT:Ae(e,v.POSITION_RIGHT)?v.POSITION_RIGHT:"",yv=e=>cr(e,v.PX)?v.PX:cr(e,v.VH)?v.VH:cr(e,v.VW)?v.VW:cr(e,v.WPERCENT)?v.WPERCENT:cr(e,v.HPERCENT)?v.HPERCENT:cr(e,v.DEGREE)?v.DEGREE:v.PX;var zt=e=>u.checkType(Number,e)||u.checkType(Function,e)&&u.checkType(Number,e()),Ma=({start:e,end:t})=>{let r=u.checkType(Number,e),o=u.checkType(Number,t);return r||cb(e),o||lb(t),r&&o},co=e=>{let t=u.checkType(Number,e);return!t&&e&&Ib(e),t?e:ae.get("sequencer").duration},ka=e=>{let t=u.checkType(Number,e);return!t&&e&&kb(e),t&&e?e:1},Tv=e=>{let t=e&&e in Ht;return!t&&e&&Bo(e),t?e:ae.get("sequencer").ease},Sv=e=>{let t=e&&e in Ht;return!t&&e&&Bo(e),t?mt(e):mt(ae.get("parallaxTween").ease)},_v=(e,t)=>{let r=u.checkType(String,e),o=u.checkType(Number,t);return r||Rb(e),o||Nb(t),r&&o},xv=e=>{if(!e)return;let t=u.checkType(Number,e);return t||Ea(),t},Cv=e=>{if(!e)return;let r=[ar,"end",kn,Rn,Nn].includes(e),o=u.checkType(Number,e),n=u.checkType(Object,e),s=r||o||n;return s||wb(e),s},gu=e=>{if(!e)return;let t=u.checkType(Number,e);return t||_b(e),t},Ev=e=>{if(!e)return;let r=[Ca,"row","col"].includes(e);return r||Cb(),r},wv=e=>{if(!e)return;let t=u.checkType(Boolean,e);return t||xb(),t},Iv=(e=[])=>{let t=u.checkType(Array,[...e])&&e.length>0;return t||Pb(),t},Mv=(e=[])=>u.checkType(Array,[...e])&&e.length>0?e:[],kv=e=>{if(!e)return;let r=[Lo,Do,"end",Fo].includes(e);if(!r){Ob();return}return r};var lo=(e,t)=>{let r=u.checkType(Boolean,e);return!r&&e&&Lb(e,t),r?e:ae.get(t).relative},Ra=e=>{let t=e&&e in Ht;return!t&&e&&Bo(e),t?mt(e):mt(ae.get("tween").ease)},Na=e=>{let t=e&&e in Ht;return!t&&e&&Bo(e),t?e:ae.get("tween").ease},bu=e=>{let{config:t}=ae.get("spring"),r=e&&e in t,o=r?t[e]:{},s=(r?u.checkType(Object,o)&&"tension"in o&&"mass"in o&&"friction"in o&&"velocity"in o&&"precision"in o:!1)?Object.values(o).every(i=>u.checkType(Number,i)&&i>=0):null;return!r&&e&&cu(e),!s&&r&&Sb(e),s?t[e]:t.default},Rv=e=>{let{config:t}=ae.get("spring"),r=e&&e in t;return!r&&e&&cu(e),r},vu=e=>{let t=u.checkType(Object,e)&&Object.values(e).every(r=>u.checkType(Number,r)&&r>=0);return!t&&e&&Tb(),t?e:{}},yu=e=>{let r=u.checkType(Function,e)?e():e,o=u.checkType(Number,r);return!o&&e&&Mb(e),o?r:ae.get("tween").duration},At=(e,t)=>{let r=u.checkType(Boolean,e);return!r&&e&&lu(e,t),r&&e===!0},le=(e,t,r)=>{let o=u.checkType(Boolean,e);return!o&&e&&lu(e,t),o?e:r},Pa=(e,t,r)=>{let o=u.checkType(String,e);return!o&&e&&Db(e,t),o?e:r},lr=(e,t,r)=>{let o=u.checkType(Number,e);return!o&&e&&Fb(e,t),o?e:r},at=(e,t,r)=>{let o=u.checkType(Function,e);return!o&&e&&Bb(e,t),o?e:r},Aa=e=>{let t=u.checkType(Number,e)&&e>0&&e<=1;return!t&&e&&Vb(),t?e:ae.get("lerp").velocity},Oa=e=>{let t=u.checkType(Number,e);return!t&&e&&Wb(),t?e:ae.get("lerp").precision},Nv=(e,t)=>{let r=u.checkType(String,e);return!r&&e&&jb(t),r},As=e=>{let t=u.checkType(Number,e);return!t&&e&&zb(),t?e:void 0},Os=e=>{let t=e?.getType?.()&&(e.getType()==="LERP"||e.getType()==="SPRING"||e.getType()==="TWEEN");return!t&&e&&Hb(),t},Pv=(e,t)=>{e===-1&&Ub(t)},uo=(e,t,r)=>{let o=u.checkType(Function,e);return!o&&e&&mv(r,e),o?e:t},Av=e=>{let t=u.checkType(Function,e);return!t&&e&&Gb(e),t?e:({resolve:r})=>{r()}},Ov=e=>{let t=u.checkType(Array,e);return!t&&e&&db(e),t},$v=e=>{let t=u.checkType(String,e);return!t&&e&&hb(e),t},$n=(e,t=!1)=>{let o=u.checkType(Element,e)?e:document.querySelector(e);return t?o??globalThis:o??document.createElement("div")},Tu=e=>u.checkType(Element,e)?e:document.querySelector(e),$s=(e,t)=>{if(!e)return v.DIRECTION_VERTICAL;let o=[v.DIRECTION_VERTICAL,v.DIRECTION_HORIZONTAL].includes(e);return!o&&e&&qb(e,t),o?e:v.DIRECTION_VERTICAL},Su=(e,t)=>{let r=[v.POSITION_TOP,v.POSITION_LEFT,v.POSITION_RIGHT,v.POSITION_BOTTOM],o=u.checkType(Object,e),n=o&&u.checkType(String,e?.position)&&r.includes(e.position),s=o&&u.checkType(Function,e.value)&&u.checkType(Number,e.value()),i=o&&n&&s;return i||Jb(t),i?e:null},Lv=e=>{let t=u.checkType(Function,e)&&u.checkType(Number,e?.());return!t&&e&&Yb(),t?e:void 0},Dv=e=>{let t=e?.getType?.()&&(e.getType()===v.TWEEN_TWEEN||e.getType()===v.TWEEN_TIMELINE);return!t&&e&&Xb(),t?e:{}},Fv=e=>{if(!e&&e!==0)return v.ALIGN_CENTER;let t=[v.ALIGN_START,v.ALIGN_TOP,v.ALIGN_RIGHT,v.ALIGN_CENTER,v.ALIGN_BOTTOM,v.ALIGN_LEFT,v.ALIGN_END],r=t.includes(e)||u.checkType(Number,e);return!r&&e&&Kb(e,t),r?e:v.ALIGN_CENTER},Bv=e=>{if(!e)return!1;let t=[v.IN_BACK,v.IN_STOP,v.OUT_BACK,v.OUT_STOP],r=t.includes(e);return!r&&e&&Qb(e,t),r?e:!1},_u=(e,t,r)=>{if(e==null)return r;let o=u.checkType(Number,e);return!o&&e&&Zb(e,t),o?e:r},Vv=e=>{if(!e)return v.TYPE_PARALLAX;let t=e?.toLowerCase(),r=[v.TYPE_PARALLAX,v.TYPE_SCROLLTRIGGER],o=r.includes(t);return!o&&t&&ev(t,r),o?t:v.TYPE_PARALLAX},Wv=(e,t)=>(()=>{if(t===v.TYPE_PARALLAX){let o=gv(e),n=u.checkType(Number,Number(e))&&o&&e>=0&&e<10;return!n&&e&&iv(e),n?10-e:10-ae.get("parallax").defaultRange}else{let o=u.checkType(String,e);return!o&&e&&av(e),o?e:"0px"}})(),Vo=(e,t,r)=>{let o=ae.get("defaultMq").value;if(!e)return o;let n=ae.get("mq"),s=Object.keys(n),i=u.checkType(String,e)&&s.includes(e);return!i&&e&&uu(e,s,t,r),i?e:o},Wo=(e,t,r)=>{let o=ae.get("defaultMq").type;if(!e)return o;let n=[rb,ks],s=u.checkType(String,e)&&n.includes(e);return!s&&e&&uu(e,n,t,r),s?e:o},jv=(e,t,r,o)=>{if(!e&&o)return{propierties:v.PROP_VERTICAL,shouldTrackOnlyEvents:!0};if(!e&&r)return{propierties:v.PROP_VERTICAL,shouldTrackOnlyEvents:!1};let n=t===v.TYPE_SCROLLTRIGGER&&!e,s=[v.PROP_VERTICAL,v.PROP_HORIZONTAL,v.PROP_ROTATE,v.PROP_ROTATEY,v.PROP_ROTATEX,v.PROP_ROTATEZ,v.PROP_OPACITY,v.PROP_SCALE,v.PROP_SCALE_X,v.PROP_SCALE_Y,v.PROP_TWEEN],i=u.checkType(String,e);!i&&e&&tv(e,s);let a=t===v.TYPE_PARALLAX&&e===v.PROP_TWEEN&&!r;!r&&!o&&e===v.PROP_TWEEN&&uv(),(r||o)&&e!==v.PROP_TWEEN&&pv(),a&&cv();let c=a?v.PROP_VERTICAL:e,l=bv(c);return{propierties:i?l??v.PROP_VERTICAL:v.PROP_VERTICAL,shouldTrackOnlyEvents:n}},Hv=e=>{if(!e)return v.EASE_LERP;let t=[v.EASE_SPRING,v.EASE_LERP],r=t.includes(e);r||rv(e,t);let o=r?e:v.EASE_LERP;return r?e:o},$a=(e,t)=>{let r=[v.EASE_SPRING,v.EASE_LERP],o=r.includes(e);return!o&&e&&ov(e,r,t),o?e:v.EASE_LERP},zv=(e,t)=>{let r=t===v.TYPE_PARALLAX?ae.get("parallax").springConfig:ae.get("scrollTrigger").springConfig;if(!e)return r;let o=ae.get("spring").config,n=Object.keys(o),s=n.includes(e);return!s&&e&&sv(e,n),s?e:r},Uv=(e,t)=>{let r=u.checkType(Number,Number(e))&&e>0&&e<=1;!r&&e&&lv();let o=t===v.TYPE_PARALLAX?ae.get("parallax").lerpConfig:ae.get("scrollTrigger").lerpConfig;return r?e:o},Gv=(e,t)=>{let r=[v.PX,v.VW,v.VH,v.WPERCENT,v.HPERCENT];if(t===v.PROP_VERTICAL||t===v.PROP_HORIZONTAL){let n=du(r,e);return n||pu(e,t,r),n?e:"0px"}if(t===v.PROP_ROTATE||t===v.PROP_ROTATEX||t===v.PROP_ROTATEY||t===v.PROP_ROTATEZ){let n=du([v.DEGREE],e);return n||pu(e,t,[v.DEGREE]),n?e:"0"}if(t===v.PROP_SCALE||t===v.PROP_SCALE_X||t===v.PROP_SCALE_Y){let n=mu(e);return n||hv(e,t),n?e:"0"}let o=mu(e);return o||dv(t),o?e:"0"};var La=e=>{let{instantFps:t}=u.store.get(),r=Math.round(e*(t/60));return e===1&&r===0?e:r},Ot=e=>({type:kv(e?.stagger?.type)?e.stagger.type:Pn.type,each:xv(e?.stagger?.each)?e.stagger.each:Pn.each,from:Cv(e?.stagger?.from)?e?.stagger?.from:Do,grid:{col:gu(e?.stagger?.grid?.col)?e.stagger.grid.col:Pn.grid.col,row:gu(e?.stagger?.grid?.row)?e.stagger.grid.row:Pn.grid.row,direction:Ev(e?.stagger?.grid?.direction)?e.stagger.grid.direction:"col"},waitComplete:wv(e?.stagger?.waitComplete)?e.stagger.waitComplete:Pn.waitComplete}),ur=(e,t)=>e.length>t.length?e:t;var Ls=e=>e%2,tI=e=>Math.floor(Math.random()*e),rI=(e,t,r)=>{let o=new Set(e.slice(0,r).map(i=>i.frame));return e.map((i,a)=>a*t).filter(i=>!o.has(i))},oI=(e,t,r,o=[])=>{let{from:n,each:s}=r,i=La(s);if(n===Nn)return{index:e,frame:o[tI(o.length)]};if(n===ar)return{index:e,frame:e*i};if(n==="end")return{index:e,frame:(t-1-e)*i};if(n===kn){let a=Math.trunc(t/2);return e>a?{index:e,frame:(e-a)*i}:e<a?Ls(t)===0&&a-e===1?{index:e,frame:0}:Ls(t)===0?{index:e,frame:(a-e-1)*i}:{index:e,frame:(a-e)*i}:{index:e,frame:0}}if(n===Rn){let a=Math.trunc(t/2);return e>a?{index:e,frame:(t-a-1-(e-a))*i}:e<a?Ls(t)===0&&a-e===1?{index:e,frame:(a-1)*i}:Ls(t)===0?{index:e,frame:(t-a-(a-e))*i}:{index:e,frame:(t-a-1-(a-e))*i}:Ls(t)?{index:e,frame:a*i}:{index:e,frame:(a-1)*i}}if(n&&Le(Number,n)){let a=n>=t?t-1:n;return e>a?{index:e,frame:(e-a)*s}:e<a?{index:e,frame:(a-e)*s}:{index:e,frame:0}}return{index:0,frame:0}},qv=(e,t,r)=>{if(t.grid.direction==="row"){let o=Ns(e,r);return[...[...Array.from({length:t.grid.col}).keys()].reduce((s,i,a)=>[...s,...ib(o,a)],[])].flat()}else return e},Jv=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=r?.grid?.col<=1?e.length:r.grid.col,i=r?.grid?.row<=1?e.length:r.grid.row,c=qv(e,r,s).map(b=>b&&b!==void 0?b:{index:0,frame:0}),p=qv(t,r,s).map(b=>b&&b!==void 0?b:{index:0,frame:0}),d=r.grid.direction==="row"?i:s,f=Ns(c,d),h=f[0];return h.forEach((b,T)=>{let{index:_,frame:S}=oI(T,f[0].length,r,rI(h,r.each,T));b.index=_,b.frame=S,S>=o.frame&&(o={index:_,frame:S}),S<=n.frame&&(n={index:_,frame:S})}),f.forEach(b=>{b.forEach((T,_)=>{T&&(T.index=f[0][_].index,T.frame=f[0][_].frame)})}),f.flat().forEach((b,T)=>{c[T].index=b.index,c[T].frame=b.frame,p.length>0&&(p[T].index=b.index,p[T].frame=b.frame)}),{staggerArray:c,staggerArrayOnComplete:p,fastestStagger:n,slowlestStagger:o}};var nI=(e,t,r)=>e.reduce((o,n,s)=>{let i=Math.abs(s-r),a=n.reduce((c,l,p)=>p<t-i||p>t+i?c:[...c,l],[]);return[...o,a]},[]),sI=(e,t,r,o)=>e.reduce((n,s,i)=>{let a=Math.abs(i-r),c=[];if(i>=r&&i<=r*2)return[...n,c];let l=t-a,p=t+a;for(let f=0;f<a;f++)Da(o,r+f,l)&&c.push(o[r+f][l]),Da(o,r+f,p)&&c.push(o[r+f][p]),f>0&&(Da(o,r-f,l)&&c.push(o[r-f][l]),Da(o,r-f,p)&&c.push(o[r-f][p]));let d=c.filter(f=>f!=null);return[...n,d]},[]),Da=(e,t,r)=>e[t]!==void 0&&e[t][r]!==void 0,xu=(e,t)=>{let{col:r}=t.grid,{x:o,y:n}=t.from,s=Ns(e,r);[...Array.from({length:r}).keys()].forEach(()=>{s.push([])});let i=nI(s,o,n),a=sI(i,o,n,s),c=i.reduce((h,y,b)=>{let T=[...i[b],...a[b]];return h.push(T),h},[]),l=c.length;return{cleanArray:((n>=l/2?ab:au)===au?c.reduce((h,y,b)=>{if(b<n)return h;if(b===n){let T=[...c[b]];return h.push(T),h}else{let T=c[n-(b-n)]??[],_=[...c[b],...T];return h.push(_),h}},[]):c.reduce((h,y,b)=>{if(b>n)return h;if(b===n){let T=[...c[b]];return h.push(T),h}else{let T=c[n+(n-b)]??[],_=[...c[b],...T];return h.push(_),h}},[]).toReversed()).reduce((h,y)=>y.length===0?h:[...h,y],[])}};var iI=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{u.checkType(Object,r?.from)||(r.from={}),u.checkType(Number,r?.from?.x)||(r.from={...r.from,x:0}),u.checkType(Number,r?.from?.y)||(r.from={...r.from,y:0});let{cleanArray:s}=xu(e,r),i=0;s.forEach((p,d)=>{p.forEach(f=>{let h=La(r.each),y=d*h;f.index=i,f.frame=y,y>=o.frame&&(o={index:i,frame:y}),y<=n.frame&&(n={index:i,frame:y}),i++})});let a=(()=>{if(t.length>0){let{cleanArray:p}=xu(t,r);return p.flat()}else return[]})(),c=s.flat(),l=a.flat();return c.forEach((p,d)=>{l.length>0&&(l[d].index=p.index,l[d].frame=p.frame)}),{staggerArray:c,staggerArrayOnComplete:l,fastestStagger:n,slowlestStagger:o}},aI=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=[ar,"end",kn,Rn,Nn];return(!u.checkType(String,r?.from)&&!u.checkType(Number,r?.from)||u.checkType(String,r?.from)&&!s.includes(r?.from))&&(Eb(),r.from=ar),Jv({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})},$t=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=r?.grid?.direction===Ca?iI({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n}):aI({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n}),i=s.staggerArray,a=s.staggerArrayOnComplete,c=s.fastestStagger,l=s.slowlestStagger;return{staggerArray:i,staggerArrayOnComplete:a,fastestStagger:c,slowlestStagger:l}};var Ln=({stagger:e,callback:t,callbackCache:r,callBackObject:o,useStagger:n})=>{if(e.each===0||!n){u.useFrame(()=>{t.forEach(({cb:s})=>{s(o)})}),u.useFrame(()=>{r.forEach(({cb:s})=>{u.useCache.fireObject({id:s,obj:o})})});return}t.forEach(({cb:s,frame:i})=>{u.useFrameIndex(()=>{s(o)},i)}),r.forEach(({cb:s,frame:i})=>{u.useCache.update({id:s,callBackObject:o,frame:i})})},Dn=({onComplete:e,callback:t,callbackCache:r,callbackOnComplete:o,callBackObject:n,stagger:s,slowlestStagger:i,fastestStagger:a,useStagger:c})=>{if(s.each===0||!c){e(),u.useNextFrame(()=>{t.forEach(({cb:l})=>{l(n)}),r.forEach(({cb:l})=>{u.useCache.fireObject({id:l,obj:n})}),o.forEach(({cb:l})=>{l(n)})});return}t.forEach(({cb:l,frame:p},d)=>{u.useFrameIndex(()=>{if(s.waitComplete){d===i.index&&(l(n),e());return}d===a.index&&(l(n),e())},p)}),r.forEach(({cb:l,frame:p},d)=>{u.useFrameIndex(()=>{if(s.waitComplete){d===i.index&&(u.useCache.fireObject({id:l,obj:n}),e());return}d===a.index&&(u.useCache.fireObject({id:l,obj:n}),e())},p)}),o.forEach(({cb:l,frame:p})=>{u.useFrameIndex(()=>{l(n)},p+1)})};var Ds=u.createStore({id:0});var ct=(e,t)=>{let{id:r}=Ds.get(),o=[...t,{cb:e,id:r,index:-1,frame:-1}],n=r;return Ds.quickSetProp("id",r+1),{arrayOfCallbackUpdated:o,unsubscribeCb:s=>s.map(({id:i,cb:a,index:c,frame:l})=>(i===n&&(a=()=>{}),{id:i,cb:a,index:c,frame:l}))}},pr=(e,t,r,o)=>{let{id:n}=Ds.get(),{id:s,unsubscribe:i}=u.useCache.add(e,t),a=[...r,{cb:s,id:n,index:-1,frame:-1}];o.push(i);let c=n;return Ds.quickSetProp("id",n+1),{arrayOfCallbackUpdated:a,unsubscribeCache:o,unsubscribeCb:l=>(i(),l.map(({id:p,cb:d,index:f,frame:h})=>(p===c&&(d=""),{id:p,cb:d,index:f,frame:h})))}};var po=e=>Object.keys(e).map(t=>{if(!zt(e[t]))return Nr(`${t}: ${e[t]}`),{prop:t,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let r=u.checkType(Number,e[t])?e[t]:e[t]?.()??0;return{prop:t,toValue:r,toFn:e[t],toIsFn:u.checkType(Function,e[t]),settled:!1}}),Fn=e=>Object.keys(e).map(t=>{if(!zt(e[t]))return Nr(`${t}: ${e[t]}`),{prop:t,fromValue:0,currentValue:0,fromFn:()=>0,fromIsFn:!1,settled:!1};let r=u.checkType(Number,e[t])?e[t]:e[t]?.()??0;return{prop:t,fromValue:r,currentValue:r,fromFn:e[t],fromIsFn:u.checkType(Function,e[t]),settled:!1}}),Bn=(e,t)=>Object.keys(e).map(r=>{if(!zt(t[r])||!zt(e[r]))return Nr(`${r}: ${t[r]} || ${r}: ${e[r]}`),{prop:r,fromValue:0,fromFn:()=>0,fromIsFn:!1,currentValue:0,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let o=u.checkType(Number,e[r])?e[r]:e[r]?.()??0,n=u.checkType(Number,t[r])?t[r]:t[r]?.()??0;return{prop:r,fromValue:o,fromFn:e[r],fromIsFn:u.checkType(Function,e[r]),currentValue:o,toValue:n,toFn:t[r],toIsFn:u.checkType(Function,t[r]),settled:!1}}),Pr=e=>Object.keys(e).map(t=>{if(!zt(e[t]))return Nr(`${t}: ${e[t]}`),{prop:t,fromValue:0,fromFn:()=>0,fromIsFn:!1,currentValue:0,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let r=u.checkType(Number,e[t])?e[t]:e[t]?.()??0;return{prop:t,fromValue:r,fromFn:e[t],fromIsFn:u.checkType(Function,e[t]),currentValue:r,toValue:r,toFn:e[t],toIsFn:u.checkType(Function,e[t]),settled:!1}});var Vn=({validationFunction:e,defaultRafInit:t})=>{u.useFrame(()=>{u.useNextTick(({time:r,fps:o})=>{let n=e.findLast(({validation:s})=>s());if(t(r,o),n){n?.callback(),console.log("custom tween run function extrecuted");return}})})};var mo=(e,t)=>{console.log(`stagger on ${e} loaded at: ${t} fps`)};var Wn=(e,t,r,o)=>(u.checkType(Number,e)||Ea(),e>0&&t&&(r.length>0||o.length>0));var Fa=e=>{u.useFrame(()=>{u.useNextTick(({time:t,fps:r})=>{e(t,r)})})};var Oe=(e,t)=>Object.fromEntries(e.map(r=>{let o=r[t];return[r.prop,typeof o=="number"?o:Number.parseFloat(o)]})),jn=e=>e.map(t=>t.toIsFn?{[t.prop]:t.toFn}:{[t.prop]:Number.parseFloat(t.toValue)}).reduce((t,r)=>({...t,...r}),{}),Hn=e=>e.map(t=>t.fromIsFn?{[t.prop]:t.fromFn}:{[t.prop]:Number.parseFloat(t.fromValue)}).reduce((t,r)=>({...t,...r}),{});var zn=(e,t)=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o}:r}),Cu=(e,t)=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o,shouldUpdate:!0}:{...r,shouldUpdate:!1}});var Yv=({values:e,fps:t,velocity:r,precision:o})=>e.map(n=>{if(n.settled)return n;let{currentValue:s,toValue:i}=n,a=sb(s,i,r/t*60),c=_e(a);return Number(Math.abs(i-c).toFixed(4))<=o?{...n,currentValue:i,settled:!0}:{...n,currentValue:c,settled:!1}});var Ar=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#_;#y;#v;#T;#k;#S;constructor(t){this.#n=Ot(t??{}),this.#t=lo(t?.relative,"lerp"),this.#i=Aa(t?.velocity),this.#l=Oa(t?.precision),this.#d=u.getUnivoqueId(),this.#u=!1,this.#s=void 0,this.#c=void 0,this.#r=void 0,this.#e=[],this.#p=[],this.#a=[],this.#h=[],this.#f=[],this.#o=[],this.#g=[],this.#m=!1,this.#x=!0,this.#_=!0,this.#y=!1,this.#v=!1,this.#T={reverse:!1,velocity:this.#i,precision:this.#l,relative:this.#t,immediate:!1},this.#k=Ge,this.#S=Ge;let r=t?.data;r&&this.setData(r)}#w(t,r){this.#u=!0,this.#e=Yv({values:this.#e,fps:r,velocity:this.#i,precision:this.#l});let o=Oe(this.#e,"currentValue");if(this.#m||Ln({stagger:this.#n,callback:this.#a,callbackCache:this.#h,callBackObject:o,useStagger:this.#_}),this.#e.every(s=>s.settled===!0)){let s=()=>{this.#u=!1,this.#e=[...this.#e].map(a=>({...a,fromValue:a.toValue})),this.#s?.(!0),this.#r=void 0,this.#c=void 0,this.#s=void 0,this.#m=!1,this.#u=!1},i=Oe(this.#e,"toValue");Dn({onComplete:s,callback:this.#a,callbackCache:this.#h,callbackOnComplete:this.#f,callBackObject:i,stagger:this.#n,slowlestStagger:this.#k,fastestStagger:this.#S,useStagger:this.#_});return}u.useFrame(()=>{u.useNextTick(({time:s,fps:i})=>{this.#u&&this.#w(s,i)})})}#A(t,r){this.#w(t,r)}async#R(){if(Wn(this.#n.each,this.#x,this.#h,this.#a)){let{averageFPS:t}=await u.useFps();mo("lerp",t);let r=ur(this.#h,this.#a);if(this.#n.grid.col>r.length){Pt(r.length),this.#x=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=$t({arrayDefault:r,arrayOnStop:this.#f,stagger:this.#n,slowlestStagger:this.#k,fastestStagger:this.#S});this.#h.length>this.#a.length?this.#h=o:this.#a=o,this.#f=n,this.#k=i,this.#S=s,this.#x=!1}return{ready:!0}}async#O(t,r){this.#v||(this.#s=t,this.#c=r,this.#x&&(this.#v=!0,await this.#R(),this.#v=!1),Vn({validationFunction:this.#o,defaultRafInit:(o,n)=>this.#A(o,n)}))}clearCurretPromise(){this.#m||(this.#c?.(u.ANIMATION_STOP_REJECT),this.#r=void 0,this.#c=void 0,this.#s=void 0,this.#u=!1)}stop({clearCache:t=!0,updateValues:r=!0}={}){this.#m&&(this.#m=!1),r&&(this.#e=In(this.#e)),this.unFreezeStagger(),t&&this.#h.forEach(({cb:o})=>u.useCache.clean(o)),this.#c&&(this.#c(u.ANIMATION_STOP_REJECT),this.#r=void 0,this.#c=void 0,this.#s=void 0),this.#u=!1}freezeStagger(){this.#y||(this.#h.forEach(({cb:t})=>u.useCache.freeze(t)),this.#y=!0)}unFreezeStagger({updateFrame:t=!0}={}){this.#y&&(this.#h.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:t})),this.#y=!1)}pause(){this.#m||(this.#m=!0,this.#u=!1,this.#e=xa(this.#e),this.freezeStagger())}resume(){this.#m&&(this.#m=!1,this.unFreezeStagger(),!this.#u&&this.#s&&Fa((t,r)=>this.#A(t,r)))}setData(t){this.#e=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,fromValue:n,currentValue:n,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#p=this.#e.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#e=it(this.#e,this.#p)}#E(t){let r={...this.#T,...t},{velocity:o,precision:n,relative:s}=r;return this.#t=lo(s,"lerp"),this.#i=Aa(o),this.#l=Oa(n),r}goTo(t,r={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#_=!0;let o=po(t);return this.#N(o,t,r)}goFrom(t,r={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#_=!0;let o=Fn(t);return this.#N(o,t,r)}goFromTo(t,r,o={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);if(this.#_=!0,!io(t,r))return ao("lerp goFromTo:",t,r),new Promise(s=>s);let n=Bn(t,r);return this.#N(n,t,o)}set(t,r={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#_=!1;let o=Pr(t);return this.#N(o,t,r)}setImmediate(t,r={}){if(this.#u&&this.stop({clearCache:!1,updateValues:!1}),this.#m)return;this.#_=!1;let o=Pr(t);this.#e=zn(o,this.#e);let{reverse:n}=this.#E(r??{});At(n,"reverse")&&(this.#e=kr(t,this.#e)),this.#e=Mn(this.#e,this.#t),this.#e=Mr(this.#e)}#N(t,r,o={}){this.#e=zn(t,this.#e);let{reverse:n,immediate:s}=this.#E(o??{});if(At(n,"reverse")&&(this.#e=kr(r,this.#e)),this.#e=Mn(this.#e,this.#t),At(s,"immediate "))return this.#u&&this.stop({updateValues:!1}),this.#e=Mr(this.#e),Promise.resolve();let i=!this.#u&&!this.#r;return i&&(this.#r=new Promise((a,c)=>{this.#O(a,c)})),i&&this.#r?this.#r:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return Oe(this.#e,"currentValue")}getInitialData(){return Oe(this.#p,"currentValue")}getFrom(){return Oe(this.#e,"fromValue")}getTo(){return Oe(this.#e,"toValue")}getFromNativeType(){return Hn(this.#e)}getToNativeType(){return jn(this.#e)}getType(){return"LERP"}getId(){return this.#d}isActive(){return this.#u}updateVelocity(t){this.#i=Aa(t),this.#T=it(this.#T,{velocity:this.#i})}updatePrecision(t){this.#i=Oa(t),this.#T=it(this.#T,{precision:this.#l})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#a);return this.#a=r,()=>this.#a=o(this.#a)}subscribeCache(t,r){let{arrayOfCallbackUpdated:o,unsubscribeCb:n,unsubscribeCache:s}=pr(t,r,this.#h,this.#g);return this.#h=o,this.#g=s,()=>this.#h=n(this.#h)}validateInitialization({validation:t,callback:r}){let o=[...this.#o,{validation:t,callback:r}];return this.#o=o,()=>this.#o=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#f);return this.#f=r,()=>this.#f=o(this.#f)}destroy(){this.#r&&this.stop(),this.#f=[],this.#o=[],this.#a=[],this.#h=[],this.#e=[],this.#r=void 0,this.#g.forEach(t=>t()),this.#g=[]}};var Ba=({each:e,useStagger:t,isLastDraw:r,callBackObject:o,callback:n,callbackCache:s,callbackOnStop:i})=>{e===0||t===!1?(u.useFrame(()=>{n.forEach(({cb:a})=>a(o))}),u.useFrame(()=>{s.forEach(({cb:a})=>{u.useCache.fireObject({id:a,obj:o})})})):(n.forEach(({cb:a,frame:c})=>{u.useFrameIndex(()=>a(o),c)}),s.forEach(({cb:a,frame:c})=>{u.useCache.update({id:a,callBackObject:o,frame:c})})),r&&(e===0||t===!1?u.useFrame(()=>{i.forEach(({cb:a})=>a(o))}):i.forEach(({cb:a,frame:c})=>{u.useFrameIndex(()=>a(o),c+1)}))};var Fs=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;constructor(t){this.#n=Sv(t?.ease),this.#t=co(t?.duration),this.#i=Ot(t),this.#l=[],this.#d=[],this.#u=[],this.#s=[],this.#c=[],this.#r="parallaxTween";let r=t?.from||null;r&&this.setData(r),t?.to&&this.goTo(t.to)}inzializeStagger(){if(this.#i.each>0&&(this.#s.length>0||this.#u.length>0)){let t=ur(this.#s,this.#u);if(this.#i.grid.col>t.length){Pt(t.length);return}let{staggerArray:r,staggerArrayOnComplete:o}=$t({arrayDefault:t,arrayOnStop:this.#d,stagger:this.#i,slowlestStagger:Ge,fastestStagger:Ge});this.#s.length>this.#u.length?this.#s=r:this.#u=r,this.#d=o}}draw({partial:t,isLastDraw:r}){this.#l=[...this.#l].map(n=>{let{toIsFn:s,toFn:i,toValue:a,fromIsFn:c,fromFn:l,fromValue:p}=n,d=s?i():a,f=c?l():p,h=d-f,y=this.#n(t,f,h,this.#t);return{...n,currentValue:_e(y)}});let o=Oe(this.#l,"currentValue");u.useNextTick(()=>{Ba({each:this.#i.each,useStagger:!0,isLastDraw:r,callBackObject:o,callback:this.#u,callbackCache:this.#s,callbackOnStop:this.#d})})}setData(t){let r=Object.entries(t);return this.#l=r.map(o=>{let[n,s]=o;return{prop:n,toValue:s,toValProcessed:s,fromValue:s,currentValue:s,settled:!1,fromFn:()=>0,toFn:()=>0}}),this}#e(t){this.#l=this.#l.map(r=>{let o=t.find(n=>n.prop===r.prop);return o?{...r,...o}:{...r}})}goTo(t){let r=po(t);return this.#e(r),this}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#u);return this.#u=r,()=>this.#u=o(this.#u)}onStop(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#d);return this.#d=r,()=>this.#d=o(this.#d)}subscribeCache(t,r){let{arrayOfCallbackUpdated:o,unsubscribeCb:n,unsubscribeCache:s}=pr(t,r,this.#s,this.#c);return this.#s=o,this.#c=s,()=>this.#s=n(this.#s)}getDuration(){return this.#t}getType(){return this.#r}destroy(){this.#l=[],this.#d=[],this.#u=[],this.#s=[],this.#c.forEach(t=>t()),this.#c=[]}};var Bs=class{#n="sequencer";#t;constructor(){this.#t=[]}draw({partial:t,isLastDraw:r,useFrame:o}){this.#t.forEach(n=>{n.draw({partial:t,isLastDraw:r,useFrame:o})})}add(t){this.#t.push(t)}inzializeStagger(){this.#t.forEach(t=>{t.inzializeStagger()})}setDuration(t){this.#t.forEach(r=>{r.setDuration(t)})}getDuration(){return this.#t.length>0?this.#t[0].getDuration():0}setStretchFactor(t){this.#t.forEach(r=>{r.setStretchFactor(t)})}getLabels(){return this.#t.flatMap(t=>t.getLabels())}resetLastValue(){this.#t.forEach(t=>t.resetLastValue())}disableStagger(){this.#t.forEach(t=>{t.disableStagger()})}cleanCachedId(){this.#t.forEach(t=>{t.cleanCachedId()})}freezeCachedId(){this.#t.forEach(t=>{t.freezeCachedId()})}unFreezeCachedId(){this.#t.forEach(t=>{t.unFreezeCachedId()})}getType(){return this.#n}destroy(){this.#t.forEach(t=>{t.destroy()}),this.#t=[]}};var Xv=(e,t)=>Object.keys(e).map(r=>zt(e[r])?{prop:r,toValue:e[r],ease:mt(t)}:(Nr(`${r}: ${e[r]}`),{prop:r,toValue:0,ease:mt(t)})),Kv=(e,t)=>Object.keys(e).map(r=>zt(e[r])?{prop:r,fromValue:e[r],ease:mt(t)}:(Nr(`${r}: ${e[r]}`),{prop:r,fromValue:0,ease:mt(t)})),Qv=(e,t,r)=>Object.keys(e).map(o=>!zt(t[o])||!zt(e[o])?(Nr(`${o}: ${t[o]} || ${o}: ${e[o]}`),{prop:o,fromValue:0,toValue:0,ease:mt(r)}):{prop:o,fromValue:e[o],toValue:t[o],ease:mt(r)});var ze={BACKWARD:"backward",FORWARD:"forward",NONE:"none"};var Eu={fromValue:{get:"toValue",set:"fromValue"},toValue:{get:"toValue",set:"toValue"}},Zv=(e,t,r,o)=>e.slice(0,t).reduceRight((n,{values:s})=>{let i=s.find(({prop:a,active:c})=>c&&a===r);return i&&!n&&n!==0?i[Eu[o].get]:n},void 0),ey=(e,t,r,o)=>e.slice(t+1).reduce((n,{start:s,values:i})=>i.find(c=>c.prop===r&&c.active)&&s<=o?!1:n,!0);var ty=({timeline:e,valuesState:t,partial:r})=>t.map(o=>{let n=e.reduce((_,{start:S,end:E,values:C},I)=>{let M=C.find(({prop:$})=>$===o.prop);if(!M||!M?.active||Object.keys(_).length>0||o.settled)return _;let{prop:P,toValue:k,fromValue:A,ease:R}=M;return ey(e,I,P,r)?{toValue:k,fromValue:A,start:S,end:E,ease:R}:_},{});if(Object.keys(n).length===0)return o;let{start:s,end:i,toValue:a,fromValue:c,ease:l}=n,p=u.checkType(Number,a)?a:a(),d=u.checkType(Number,c)?c:c(),f=i-s,h=r<i?d:p,y=r>=s&&r<=i?l(r-s,d,p-d,f):h,b=Number.isNaN(y)?h:y,T=_e(b);return{...o,currentValue:T,settled:!0}});var wu=({timeline:e,activeProp:t})=>e.map((r,o)=>{let{values:n,propToFind:s}=r,i=n.map(a=>{let{prop:c,active:l}=a;if(!l||!t.includes(c)||!s||s.length===0)return a;let p=Zv(e,o,c,s);return!p&&p!==0?a:{...a,[Eu[s].set]:p}});return{...r,values:i}});var Iu=(e,t)=>e.toSorted((r,o)=>r?.[t]-o?.[t]);var Va=({timeline:e,values:t,start:r,end:o,duration:n,propToFind:s})=>{let i=e.length===0?0:1,a=[...e,{values:t,start:r??0,end:o??n,priority:i,propToFind:s}],c=Iu(a,"start");return Iu(c,"priority")};var Wa=({data:e,values:t})=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o,active:!0}:{prop:r.prop,active:!1}});var Vs=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;constructor(t){this.#n=[],this.#t=[],this.#i=[],this.#l=[],this.#d=[],this.#u=[],this.#s=[],this.#c=[],this.#r=co(t?.duration),this.#e="sequencer",this.#p={start:0,end:this.#r,ease:Tv(t?.ease)},this.#a=!0,this.#h=!0,this.#f="none",this.#o=0,this.#g=Ot(t),this.#m=!0,this.#x=!1;let r=t?.data||null;r&&this.setData(r)}inzializeStagger(){if(!this.#x){if(this.#g.each>0&&(this.#d.length>0||this.#l.length>0)){let t=ur(this.#d,this.#l);if(this.#g.grid.col>t.length){Pt(t.length);return}let{staggerArray:r,staggerArrayOnComplete:o}=$t({arrayDefault:t,arrayOnStop:this.#u,stagger:this.#g,slowlestStagger:Ge,fastestStagger:Ge});this.#d.length>this.#l.length?this.#d=r:this.#l=r,this.#u=o}this.#x=!0}}draw({partial:t=0,isLastDraw:r=!1,useFrame:o=!1,direction:n=ze.NONE}){if(o){this.#_({partial:t,isLastDraw:r,direction:n});return}u.useNextTick(()=>this.#_({partial:t,isLastDraw:r,direction:n}))}#_({partial:t=0,isLastDraw:r=!1,direction:o=ze.NONE}){this.#a&&(this.#o=t,this.#y(t)),!this.#a&&this.#o&&(!o||o===ze.NONE)&&(this.#f=t>=this.#o?ze.FORWARD:ze.BACKWARD),!this.#a&&(o===ze.BACKWARD||o===ze.FORWARD)&&(this.#f=o),this.#n=[...this.#n].map(s=>({...s,settled:!1})),this.#n=ty({timeline:this.#t,valuesState:this.#n,partial:t});let n=Oe(this.#n,"currentValue");Ba({each:this.#g.each,useStagger:this.#m,isLastDraw:r,callBackObject:n,callback:this.#l,callbackCache:this.#d,callbackOnStop:this.#u}),this.#v(t),this.#m=!0,this.#o=t,this.#a=!1}resetLastValue(){this.#a=!0,this.#o=0}#y(t=0){this.#h&&(this.#s.forEach(({fn:r,time:o})=>{let n={shouldFire:t>=o,direction:ze.FORWARD},s={shouldFire:t<=o,direction:ze.BACKWARD};if(!(n.shouldFire||s.shouldFire))return;let a=n.shouldFire?n.direction:s.direction;r({direction:a,value:t,isForced:!0})}),this.#h=!1)}#v(t=0){this.#s.forEach(({fn:r,time:o})=>{let n=this.#f===ze.FORWARD&&t>o&&this.#o<=o,s=this.#f===ze.BACKWARD&&t<o&&this.#o>=o;(n||s)&&r({direction:this.#f,value:t,isForced:!1})})}setStretchFactor(t=0){let r=t/this.#r;this.#t=[...this.#t].map(o=>{let{start:n,end:s}=o;return{...o,start:_e(n*r),end:_e(s*r)}}),this.#i=[...this.#i].map(o=>{let{time:n}=o;return{...o,time:_e(n*r)}}),this.#s=[...this.#s].map(o=>{let{time:n}=o;return{...o,time:_e(n*r)}})}setData(t={}){return this.#n=Object.entries(t).map(r=>{let[o,n]=r,s=_v(o,n),i=s?n:0;return{prop:s?o:"invalidProp",toValue:i,fromValue:i,currentValue:i,active:!1,settled:!1,ease:mt(ae.get("sequencer").ease)}}),this.goTo(t,{start:0,end:0}),this}goTo(t,r){let o={...this.#p,...r},{start:n,end:s,ease:i}=o;if(!Ma({start:n,end:s}))return this;let a=Xv(t,i),c=Wa({data:a,values:this.#n}),l=Object.keys(t),p=Va({timeline:this.#t,values:c,start:n,end:s,duration:this.#r,propToFind:"fromValue"});return this.#t=wu({timeline:p,activeProp:l}),this}goFrom(t,r){let o={...this.#p,...r},{start:n,end:s,ease:i}=o;if(!Ma({start:n,end:s}))return this;let a=Kv(t,i),c=Wa({data:a,values:this.#n}),l=Object.keys(t),p=Va({timeline:this.#t,values:c,start:n,end:s,duration:this.#r,propToFind:"toValue"});return this.#t=wu({timeline:p,activeProp:l}),this}goFromTo(t,r,o){let n={...this.#p,...o},{start:s,end:i,ease:a}=n;if(!Ma({start:s,end:i}))return this;if(!io(t,r))return ao("sequencer goFromTo:",t,r),this;let c=Qv(t,r,a),l=Wa({data:c,values:this.#n});return this.#t=Va({timeline:this.#t,values:l,start:s,end:i,duration:this.#r,propToFind:""}),this}label(t="",r=0){return this.#i.push({name:t,time:r}),this}getLabels(){return this.#i}add(t=()=>{},r=0){let o=u.checkType(Function,t),n=u.checkType(Number,r),s=o&&n;return o||vb(t),n||yb(r),s?(this.#s.push({fn:t,time:r}),this):this}subscribe(t=()=>{}){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#l);return this.#l=r,()=>this.#l=o(this.#l)}onStop(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#u);return this.#u=r,()=>this.#u=o(this.#u)}subscribeCache(t,r=()=>{}){let{arrayOfCallbackUpdated:o,unsubscribeCb:n,unsubscribeCache:s}=pr(t,r,this.#d,this.#c);return this.#d=o,this.#c=s,()=>this.#d=n(this.#d)}getDuration(){return this.#r}setDuration(t=0){this.#r=t}getType(){return this.#e}cleanCachedId(){this.#d.forEach(({cb:t})=>u.useCache.clean(t))}freezeCachedId(){this.#d.forEach(({cb:t})=>u.useCache.freeze(t))}unFreezeCachedId(){this.#d.forEach(({cb:t})=>u.useCache.unFreeze({id:t,update:!0}))}disableStagger(){this.#m=!1}destroy(){this.#n=[],this.#t=[],this.#l=[],this.#d=[],this.#u=[],this.#s=[],this.#c.forEach(t=>t()),this.#c=[]}};var ry=({values:e,tension:t,friction:r,mass:o,precision:n,fps:s})=>e.map(i=>{let{currentValue:a,toValue:c,velocity:l}=i,p=-t*(a-c),d=-r*l,f=(p+d)/o,h=l+f*1/s,y=a+h*1/s,b=_e(y),T=Math.abs(h)<=.1,_=t===0?!0:Math.abs(c-b)<=n;return T&&_?{...i,currentValue:c,velocity:h,settled:!0}:{...i,currentValue:b,velocity:h,settled:!1}});var Ut=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#_;#y;#v;#T;#k;constructor(t){this.#n=Ot(t??{}),this.#t=lo(t?.relative,"spring"),this.#i=bu(t?.config),this.updateConfigProp(t?.configProps??{}),this.#l=u.getUnivoqueId(),this.#d=!1,this.#u=void 0,this.#s=void 0,this.#c=void 0,this.#r=[],this.#e=[],this.#p=[],this.#a=[],this.#h=[],this.#f=[],this.#o=[],this.#g=!1,this.#m=!0,this.#x=!0,this.#_=!1,this.#y=!1,this.#v={reverse:!1,configProps:this.#i,relative:this.#t,immediate:!1},this.#T=Ge,this.#k=Ge;let r=t?.data;r&&this.setData(r)}#S(t,r,o,n,s,i){this.#d=!0,this.#r=ry({values:this.#r,tension:o,friction:n,mass:s,precision:i,fps:r});let a=Oe(this.#r,"currentValue");if(this.#g||Ln({stagger:this.#n,callback:this.#p,callbackCache:this.#a,callBackObject:a,useStagger:this.#x}),this.#r.every(l=>l.settled===!0)){let l=()=>{this.#r=[...this.#r].map(d=>({...d,fromValue:d.toValue})),this.#u?.(!0),this.#c=void 0,this.#s=void 0,this.#u=void 0,this.#g=!1,this.#d=!1},p=Oe(this.#r,"toValue");Dn({onComplete:l,callback:this.#p,callbackCache:this.#a,callbackOnComplete:this.#h,callBackObject:p,stagger:this.#n,slowlestStagger:this.#T,fastestStagger:this.#k,useStagger:this.#x});return}u.useFrame(()=>{u.useNextTick(({time:l,fps:p})=>{this.#d&&this.#S(l,p,o,n,s,i)})})}#w(t,r){this.#r=[...this.#r].map(a=>({...a,velocity:Math.trunc(this.#i.velocity)}));let o=this.#i.tension,n=this.#i.friction,s=Math.max(1,this.#i.mass),i=this.#i.precision;this.#S(t,r,o,n,s,i)}async#A(){if(Wn(this.#n.each,this.#m,this.#a,this.#p)){let{averageFPS:t}=await u.useFps();mo("spring",t);let r=ur(this.#a,this.#p);if(this.#n.grid.col>r.length){Pt(r.length),this.#m=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=$t({arrayDefault:r,arrayOnStop:this.#h,stagger:this.#n,slowlestStagger:this.#T,fastestStagger:this.#k});this.#a.length>this.#p.length?this.#a=o:this.#p=o,this.#h=n,this.#T=i,this.#k=s,this.#m=!1}return{ready:!0}}async#R(t,r){this.#y||(this.#u=t,this.#s=r,this.#m&&(this.#y=!0,await this.#A(),this.#y=!1),Vn({validationFunction:this.#f,defaultRafInit:(o,n)=>this.#w(o,n)}))}clearCurretPromise(){this.#g||(this.#s?.(u.ANIMATION_STOP_REJECT),this.#c=void 0,this.#s=void 0,this.#u=void 0,this.#d=!1)}stop({clearCache:t=!0,updateValues:r=!0}={}){this.#g&&(this.#g=!1),r&&(this.#r=In(this.#r)),this.unFreezeStagger(),t&&this.#a.forEach(({cb:o})=>u.useCache.clean(o)),this.#s&&(this.#s(u.ANIMATION_STOP_REJECT),this.#c=void 0,this.#s=void 0,this.#u=void 0),this.#d=!1}freezeStagger(){this.#_||(this.#a.forEach(({cb:t})=>u.useCache.freeze(t)),this.#_=!0)}unFreezeStagger({updateFrame:t=!0}={}){this.#_&&(this.#a.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:t})),this.#_=!1)}pause(){this.#g||(this.#g=!0,this.#d=!1,this.#r=xa(this.#r),this.freezeStagger())}resume(){this.#g&&(this.#g=!1,this.unFreezeStagger(),!this.#d&&this.#u&&Fa((t,r)=>this.#w(t,r)))}setData(t){this.#r=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,fromValue:n,velocity:this.#i.velocity,currentValue:n,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#e=this.#r.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#r=it(this.#r,this.#e)}#O(t){let o=ae.get("spring").config,n=Rv(t?.config)?o?.[t?.config??"default"]??$o.default:this.#v.configProps,s=vu(t?.configProps),i={...n,...s},a={reverse:t?.reverse??this.#v.reverse,relative:t?.relative??this.#v.relative,immediate:t?.immediate??this.#v.immediate,configProps:i},{relative:c}=a;return this.#i=i,this.#t=c,a}goTo(t,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!0;let o=po(t);return this.#E(o,t,r)}goFrom(t,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!0;let o=Fn(t);return this.#E(o,t,r)}goFromTo(t,r,o={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);if(this.#x=!0,!io(t,r))return ao("spring goFromTo:",t,r),new Promise(s=>s);let n=Bn(t,r);return this.#E(n,t,o)}set(t,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!1;let o=Pr(t);return this.#E(o,t,r)}setImmediate(t,r={}){if(this.#d&&this.stop({clearCache:!1,updateValues:!1}),this.#g)return;this.#x=!1;let o=Pr(t);this.#r=zn(o,this.#r);let{reverse:n}=this.#O(r??{});At(n,"reverse")&&(this.#r=kr(t,this.#r)),this.#r=Mn(this.#r,this.#t),this.#r=Mr(this.#r)}#E(t,r,o={}){this.#r=zn(t,this.#r);let{reverse:n,immediate:s}=this.#O(o);if(At(n,"reverse")&&(this.#r=kr(r,this.#r)),this.#r=Mn(this.#r,this.#t),At(s,"immediate "))return this.#d&&this.stop({updateValues:!1}),this.#r=Mr(this.#r),Promise.resolve();let i=!this.#d&&!this.#c;return i&&(this.#c=new Promise((a,c)=>{this.#R(a,c)})),i&&this.#c?this.#c:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return Oe(this.#r,"currentValue")}getInitialData(){return Oe(this.#e,"currentValue")}getFrom(){return Oe(this.#r,"fromValue")}getTo(){return Oe(this.#r,"toValue")}getFromNativeType(){return Hn(this.#r)}getToNativeType(){return jn(this.#r)}getType(){return"SPRING"}getId(){return this.#l}isActive(){return this.#d}updateConfigProp(t={}){let r=vu(t);this.#i={...this.#i,...r},this.#v=it(this.#v,{configProps:r})}updateConfig(t){this.#i=bu(t),this.#v=it(this.#v,{configProps:this.#i})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#p);return this.#p=r,()=>this.#p=o(this.#p)}subscribeCache(t,r){let{arrayOfCallbackUpdated:o,unsubscribeCb:n,unsubscribeCache:s}=pr(t,r,this.#a,this.#o);return this.#a=o,this.#o=s,()=>this.#a=n(this.#a)}validateInitialization({validation:t,callback:r}){let o=[...this.#f,{validation:t,callback:r}];return this.#f=o,()=>this.#f=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#h);return this.#h=r,()=>this.#h=o(this.#h)}destroy(){this.#c&&this.stop(),this.#h=[],this.#f=[],this.#p=[],this.#a=[],this.#r=[],this.#c=void 0,this.#o.forEach(t=>t()),this.#o=[]}};var oy=({values:e,timeElapsed:t,duration:r,ease:o})=>e.map(n=>{if(n.shouldUpdate){let s=o(t,n.fromValue,n.toValProcessed,r);return{...n,currentValue:_e(s)}}return{...n,currentValue:n.fromValue}});var Or=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#_;#y;#v;#T;#k;#S;#w;#A;#R;constructor(t){this.#n=Ra(t?.ease),this.#t=yu(t?.duration),this.#i=lo(t?.relative,"tween"),this.#l=Ot(t??{}),this.#d=u.getUnivoqueId(),this.#u=!1,this.#s=void 0,this.#c=void 0,this.#r=void 0,this.#e=[],this.#p=[],this.#a=[],this.#h=[],this.#f=[],this.#o=[],this.#g=[],this.#m=!1,this.#x=0,this.#_=0,this.#y=0,this.#v=!0,this.#T=!0,this.#k=!1,this.#S=!1,this.#w={duration:this.#t,ease:Na(t?.ease),relative:this.#i,reverse:!1,immediate:!1},this.#A=Ge,this.#R=Ge;let r=t?.data;r&&this.setData(r)}#O(t){this.#u=!0,this.#m&&(this.#y=t-this.#x-this.#_),this.#_=t-this.#x-this.#y,Math.round(this.#_)>=this.#t&&(this.#_=this.#t),this.#e=oy({values:this.#e,timeElapsed:this.#_,duration:this.#t,ease:this.#n});let r=Math.round(this.#_)===this.#t,o=Oe(this.#e,"currentValue");if(this.#m||Ln({stagger:this.#l,callback:this.#a,callbackCache:this.#h,callBackObject:o,useStagger:this.#T}),r){Dn({onComplete:()=>{this.#e=[...this.#e].map(s=>s.shouldUpdate?{...s,toValue:s.currentValue,fromValue:s.currentValue}:s),this.#s?.(!0),this.#r=void 0,this.#c=void 0,this.#s=void 0,this.#y=0,this.#m=!1,this.#u=!1},callback:this.#a,callbackCache:this.#h,callbackOnComplete:this.#f,callBackObject:o,stagger:this.#l,slowlestStagger:this.#A,fastestStagger:this.#R,useStagger:this.#T});return}u.useFrame(()=>{u.useNextTick(({time:n})=>{this.#u&&this.#O(n)})})}#E(t){this.#x=t,this.#O(t)}async#N(){if(Wn(this.#l.each,this.#v,this.#h,this.#a)){let{averageFPS:t}=await u.useFps();mo("tween",t);let r=ur(this.#h,this.#a);if(this.#l.grid.col>r.length){Pt(r.length),this.#v=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=$t({arrayDefault:r,arrayOnStop:this.#f,stagger:this.#l,slowlestStagger:this.#A,fastestStagger:this.#R});this.#h.length>this.#a.length?this.#h=o:this.#a=o,this.#f=n,this.#A=i,this.#R=s,this.#v=!1}return{ready:!0}}async#P(t,r){this.#S||(this.#s=t,this.#c=r,this.#v&&(this.#S=!0,await this.#N(),this.#S=!1),Vn({validationFunction:this.#o,defaultRafInit:o=>this.#E(o)}))}clearCurretPromise(){this.#m||(this.#c?.(u.ANIMATION_STOP_REJECT),this.#r=void 0,this.#c=void 0,this.#s=void 0,this.#u=!1)}stop({clearCache:t=!0,updateValues:r=!0}={}){this.#y=0,this.#m=!1,r&&(this.#e=In(this.#e)),this.unFreezeStagger(),t&&this.#h.forEach(({cb:o})=>u.useCache.clean(o)),this.#c&&(this.#c(u.ANIMATION_STOP_REJECT),this.#r=void 0,this.#c=void 0,this.#s=void 0),this.#u=!1}freezeStagger(){this.#k||(this.#h.forEach(({cb:t})=>u.useCache.freeze(t)),this.#k=!0)}unFreezeStagger({updateFrame:t=!0}={}){this.#k&&(this.#h.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:t})),this.#k=!1)}pause(){this.#m||(this.#m=!0,this.freezeStagger())}resume(){this.#m&&(this.#m=!1,this.unFreezeStagger())}setData(t){this.#e=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,toValueOnPause:n,toValProcessed:n,fromValue:n,currentValue:n,shouldUpdate:!1,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#p=this.#e.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,shouldUpdate:!1,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#e=it(this.#e,this.#p)}#b(){this.#e=[...this.#e].map(t=>t.shouldUpdate?{...t,fromValue:t.currentValue}:t)}#D(t){let r={...this.#w,...t},{ease:o,duration:n,relative:s}=r;return this.#n=Ra(o),this.#i=lo(s,"tween"),this.#t=yu(n),r}goTo(t,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!0;let o=po(t);return this.#B(o,t,r)}goFrom(t,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!0;let o=Fn(t);return this.#B(o,t,r)}goFromTo(t,r,o={}){if(this.stop({clearCache:!1,updateValues:!0}),this.#T=!0,!io(t,r))return ao("tween goFromTo:",t,r),new Promise(s=>s);let n=Bn(t,r);return this.#B(n,t,o)}set(t,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!1;let o=Pr(t),n=r?{...r,duration:1}:{duration:1};return this.#B(o,t,n)}setImmediate(t,r={}){if(this.stop({clearCache:!1,updateValues:!1}),this.#m)return;this.#T=!1;let o=Pr(t),n=r?{...r,duration:1}:{duration:1};this.#e=Cu(o,this.#e);let{reverse:s}=this.#D(n);At(s,"reverse")&&(this.#e=kr(t,this.#e)),this.#e=iu(this.#e,this.#i),this.#e=Mr(this.#e)}#B(t,r,o={}){this.#e=Cu(t,this.#e);let{reverse:n,immediate:s}=this.#D(o);if(At(n,"reverse")&&(this.#e=kr(r,this.#e)),this.#e=iu(this.#e,this.#i),At(s,"immediate "))return this.#u&&(this.stop({clearCache:!1,updateValues:!1}),this.#b()),this.#e=Mr(this.#e),Promise.resolve();let i=!this.#u&&!this.#r;return i&&(this.#r=new Promise((a,c)=>{this.#P(a,c)})),i&&this.#r?this.#r:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return Oe(this.#e,"currentValue")}getInitialData(){return Oe(this.#p,"currentValue")}getFrom(){return Oe(this.#e,"fromValue")}getTo(){return Oe(this.#e,"toValue")}getFromNativeType(){return Hn(this.#e)}getToNativeType(){return jn(this.#e)}getType(){return"TWEEN"}getId(){return this.#d}isActive(){return this.#u}updateEase(t){this.#n=Ra(t),this.#w=it(this.#w,{ease:t})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#a);return this.#a=r,()=>this.#a=o(this.#a)}subscribeCache(t,r){let{arrayOfCallbackUpdated:o,unsubscribeCb:n,unsubscribeCache:s}=pr(t,r,this.#h,this.#g);return this.#h=o,this.#g=s,()=>this.#h=n(this.#h)}validateInitialization({validation:t,callback:r}){let o=[...this.#o,{validation:t,callback:r}];return this.#o=o,()=>this.#o=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#f);return this.#f=r,()=>this.#f=o(this.#f)}destroy(){this.#r&&this.stop(),this.#f=[],this.#o=[],this.#a=[],this.#h=[],this.#e=[],this.#r=void 0,this.#g.forEach(t=>t()),this.#g=[]}};var cI=({each:e,duration:t,numItem:r,index:o,eachByNumItem:n})=>{if(e===1){let d=t/r,f=_e(o*d),h=_e(f+d);return{start:f,end:h}}let i=t/r*n,a=t-i,c=r-1>0?r-1:1,p=a/c*o;return{start:_e(p),end:_e(i+p)}},lI=({duration:e,numItem:t,index:r,eachByNumItem:o,type:n})=>{let i=e/t*r,c=(e-(e-i))/t*o;if(n===Do)return{start:0,end:_e(e-(i-c))};if(n===Fo){let l=(i-c)/2;return{start:_e(l),end:_e(e-l)}}return n==="end"?{start:_e(i-c),end:_e(e)}:{start:0,end:e}},ny=e=>{let t=Mv(e?.items),r=Ot(e),o=co(e?.duration),n=10,s=r?.each||1,i=[...t].map((h,y)=>({item:h,start:0,end:o,index:y}));if(!Iv(t))return i;r.grid?.col>t.length&&(Pt(t.length),s=1),u.checkType(Number,s)&&(s>n||s<1)&&($b(n),s=1);let{staggerArray:a}=$t({arrayDefault:[...t].map(h=>({item:h})),arrayOnStop:[],stagger:r,slowlestStagger:Ge,fastestStagger:Ge}),c=a.filter(({item:h})=>u.checkType(Element,h)||u.checkType(Object,h)||u.checkType(Element,h?.deref?.()));if(c.length===0)return Ab(),i;let l=c.map(({frame:h})=>h),p=[...new Set(l)].toSorted((h,y)=>h-y),d=p.length;return c.map(({item:h,frame:y})=>{let b=p.indexOf(y),T=s*d/n,{start:_,end:S}=r.type===Lo?cI({each:s,duration:o,numItem:d,index:b,eachByNumItem:T}):r.type===Do||r.type==="end"||r.type===Fo?lI({duration:o,numItem:d,index:b,eachByNumItem:T,type:r.type}):{start:0,end:o};return{item:h,start:_,end:S,index:b}})};function uI(e){return new Fs(e)}function pI(e){return new Vs(e)}function mI(){return new Bs}function dI(e){return ny(e)}function hI(e){return new Or(e)}function fI(e){return new Ut(e)}function gI(e){return new Ar(e)}var we={};So(we,{createAsyncTimeline:()=>vI,createSyncTimeline:()=>bI});var Q=()=>{},ja=(...e)=>t=>e.reduce((r,o)=>r.then(o),Promise.resolve(t));var Ha=({data:e,filterBy:t})=>Object.entries(e).map(r=>{let[o,n]=r,s=o in t;return{data:{[o]:n},active:s}}).filter(({active:r})=>r).map(({data:r})=>r).reduce((r,o)=>({...r,...o}),{});var ho=({timeline:e,tween:t,index:r})=>{let o=t?.getId?.(),n=t?.getInitialData?.()||{},s=e.slice(0,r).reduce((i,a)=>{let c=a.find(({data:d})=>d?.tween?.getId?.()===o);c?.data?.tween?.setImmediate?.(c?.data?.valuesTo);let l=c?.data?.tween?.getToNativeType?.(),p=l&&c?Ha({data:l,filterBy:c.data.valuesTo}):{};return{...i,...p}},n);return t.setImmediate(n),s};var Mu=({mainReject:e,mainResolve:t,isStopped:r,previousSessionId:o,currentSessionId:n,isInPause:s,tween:i,stepFunction:a,action:c,addToActiveTween:l})=>{if(r()||o!==n()){e();return}let p=l(i),d=i&&i?.validateInitialization?i.validateInitialization({validation:()=>s(),callback:()=>i.pause?.()}):Q;a[c]().then(()=>t({resolve:!0})).catch(()=>{}).finally(()=>{p(),d()})};var Ws=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#_;#y;#v;#T;#k;#S;#w;#A;#R;#O;#E;#N;#P;#b;#D;#B;#I;constructor(t){this.#n=ka(t?.repeat),this.#t=le(t?.yoyo,"asyncTimeline: yoyo",!1),this.#i=le(t?.freeMode,"asyncTimeline: freeMode",!1),this.#l=le(t?.autoSet,"asyncTimeline: autoSet",!0),this.#d=le(t?.inheritProps,"asyncTimeline: inheritProps",!0),this.#u=le(t?.forceFromTo,"asyncTimeline: forceFromTo",!1),this.#s=[],this.#c=[],this.#r=[],this.#e=!1,this.#p={id:-1,tween:void 0,callback:()=>{},action:"",valuesFrom:{},valuesTo:{},prevValueTo:{},prevValueSettled:!1,tweenProps:{},groupProps:{},labelProps:{}},this.#a={active:!1,index:-1,isReverse:!1,callback:void 0},this.#h=1,this.#f=void 0,this.#o=0,this.#g=0,this.#m=1,this.#x=!1,this.#_=!1,this.#y=!1,this.#v=!1,this.#T=!1,this.#k=!1,this.#S=!0,this.#w=0,this.#A=0,this.#R=0,this.#O=!1,this.#E=[],this.#N=!1,this.#P=0,this.#b=[],this.#D=[],this.#B=void 0,this.#I=void 0}#F(){let t=this.#s[this.#g],r=this.#E;if(this.#E=[],!t)return;this.#s[this.#g]=t.map(i=>{let{data:a}=i,{tween:c,valuesTo:l,prevValueSettled:p}=a;if(c&&c?.getToNativeType&&!p){let d=c.getToNativeType(),f=Ha({data:d,filterBy:l});return{...i,data:{...a,prevValueTo:f,prevValueSettled:!0}}}return i});let o=t.map(i=>{let{data:a}=i,{tween:c,callback:l,action:p,valuesFrom:d,valuesTo:f,tweenProps:h,id:y}=a,b={...h};delete b.delay;let{active:T,index:_}=this.#a,S=Number.isNaN(_)?!1:T&&_&&this.#g<_;S&&(b.immediate=!0),h&&"relative"in h&&h.relative&&(h.relative=!1,ub()),this.#E.push({id:y,action:p});let E=r.find(({id:I,action:M})=>I===y&&M===p),C={set:()=>(this.#v||c?.clearCurretPromise?.(),c?.[p](d,b)),goTo:()=>(this.#v||c?.clearCurretPromise?.(),c?.[p](f,b)),goFrom:()=>(this.#v||c?.clearCurretPromise?.(),c?.[p](d,b)),goFromTo:()=>(this.#v||c?.clearCurretPromise?.(),c?.[p](d,f,b)),add:()=>E?new Promise(I=>I({resolve:!0})):new Promise(I=>{if(S){I({resolve:!0});return}let M=this.getDirection();l({direction:M,loop:this.#m}),I({resolve:!0})}),addAsync:()=>{this.#k=!0;let I=this.#w;return E?new Promise(M=>M({resolve:!0})):new Promise((M,P)=>{if(S){M({resolve:!0});return}let k=this.getDirection();l({direction:k,loop:this.#m,resolve:()=>{if(I===this.#w){M({resolve:!0});return}P()}})})},createGroup:()=>new Promise(I=>I({resolve:!0})),closeGroup:()=>new Promise(I=>I({resolve:!0})),label:()=>new Promise(I=>I({resolve:!0})),suspend:()=>{if(E)return new Promise(P=>P({resolve:!0}));let I=u.checkType(Boolean,l());I||pb(l);let M=I?l():!0;return new Promise(P=>{!S&&M&&(this.#T=!0),P({resolve:!0})})}};return new Promise((I,M)=>{let P=S?!1:h?.delay,k=this.#w;if(P){let A=u.getTime();requestAnimationFrame(()=>{this.#L({start:A,deltaTimeOnpause:0,delay:P,mainReject:M,mainResolve:I,previousSessionId:k,tween:c,stepFunction:C,action:p})});return}Mu({mainReject:M,mainResolve:I,isStopped:()=>this.#S,isInPause:()=>this.#v,addToActiveTween:A=>this.#Y(A),currentSessionId:()=>this.#w,previousSessionId:k,tween:c,stepFunction:C,action:p})})}),s=this.#s[this.#g].some(i=>i.data.groupProps?.waitComplete)?"all":"race";Promise[s](o).then(()=>{if(this.#T||this.#S)return;let{active:i,index:a,isReverse:c,callback:l}=this.#a;if(l&&i&&this.#g===a-1){this.#Q(),this.#m++,l();return}if(i&&c&&this.#g===a-1&&this.reverseNext(),this.#x){this.#x=!1,this.#g=this.#s.length-this.#g-1,this.#Q(),this.#z(),this.#F();return}if(this.#g<this.#s.length-1){this.#g++,this.#F();return}if(this.#m<this.#n||this.#n===-1){if(i&&a===this.#s.length&&!this.#i){let p=this.#r.map(({tween:d})=>{let f=ho({timeline:this.#s,tween:d,index:this.#s.length});return new Promise((h,y)=>{d.set(f).then(()=>h({resolve:!0})).catch(()=>y())})});Promise.all(p).then(()=>{this.#C()}).catch(()=>{});return}this.#C();return}this.#D.forEach(({cb:p})=>p()),this.#S=!0,this.#B&&Qo.add(()=>{It.add(()=>{this.#B?.({resolve:!0})})})}).catch(i=>{i&&console.log(i)}).finally(()=>{this.#k=!1})}#L({start:t,deltaTimeOnpause:r,delay:o,mainReject:n,mainResolve:s,previousSessionId:i,tween:a,stepFunction:c,action:l}){let p=u.getTime(),d=p-t;if(this.#v&&(r=p-this.#R),d-r>=o||this.#S||this.#x){Mu({mainReject:n,mainResolve:s,isStopped:()=>this.#S,isInPause:()=>this.#v,addToActiveTween:f=>this.#Y(f),currentSessionId:()=>this.#w,previousSessionId:i,tween:a,stepFunction:c,action:l});return}requestAnimationFrame(()=>{this.#L({start:t,deltaTimeOnpause:r,delay:o,mainReject:n,mainResolve:s,previousSessionId:i,tween:a,stepFunction:c,action:l})})}#C(){if(this.#m>0){let t=this.getDirection();this.#b.forEach(({cb:r})=>r({direction:t,loop:this.#m}))}this.#m++,this.#g=0,this.#Q(),(this.#t||this.#_)&&this.#z(),this.#_=!1,this.#F()}#Y(t){let r=t?.getId&&t.getId();if(!r)return Q;let o=this.#A;return this.#A++,this.#c.push({tween:t,uniqueId:r,id:o}),()=>{this.#c=this.#c.filter(({id:n})=>n!==o)}}#z(){this.#y=!this.#y,this.#s=this.#s.toReversed().map(t=>t.toReversed().map(r=>{let{data:o}=r,{action:n,valuesFrom:s,prevValueTo:i,valuesTo:a}=o,c=a;switch(n){case"goTo":return{...r,data:{...o,valuesTo:i,prevValueTo:c}};case"goFromTo":return{...r,data:{...o,valuesFrom:a,valuesTo:s}};case"goFrom":return this.#u||(mb(),this.stop()),{...r,data:{...o,valuesFrom:a,valuesTo:s}}}return r}))}#M(t){let r=this.#s.findIndex(o=>o[0]?.group&&o[0].group===this.#f);if(r!==-1){this.#s[r].push({group:this.#f,data:t});return}this.#s.push([{group:this.#f,data:t}])}#W(t){let r=t?.getId?.();if(this.#r.find(({id:s})=>s===r))return;let n={id:r,tween:t};this.#r.push(n)}#$(){this.#r.forEach(({tween:t})=>t.resetData())}set(t,r={},o={}){if(!Os(t))return this;o.delay=As(o?.delay);let n=this.#d?ho({timeline:this.#s,tween:t,index:this.#s.length}):{};return this.#o++,this.#M({...this.#p,id:this.#o,tween:t,action:"set",valuesTo:{...n,...r},valuesFrom:{...n,...r},tweenProps:o,groupProps:{waitComplete:this.#e}}),this.#W(t),this}goTo(t,r={},o={}){if(!Os(t))return this;o.delay=As(o?.delay);let n=ho({timeline:this.#s,tween:t,index:this.#s.length}),s=this.#d||this.#u?n:{};return this.#o++,this.#u?this.#M({...this.#p,id:this.#o,tween:t,action:"goFromTo",valuesFrom:{...s},valuesTo:{...s,...r},tweenProps:o??{},groupProps:{waitComplete:this.#e}}):this.#M({...this.#p,id:this.#o,tween:t,action:"goTo",valuesTo:{...s,...r},tweenProps:o??{},groupProps:{waitComplete:this.#e}}),this.#W(t),this}goFrom(t,r={},o={}){if(!Os(t))return this;o.delay=As(o?.delay);let n=ho({timeline:this.#s,tween:t,index:this.#s.length}),s=this.#d||this.#u?n:{};return this.#o++,this.#u?this.#M({...this.#p,id:this.#o,tween:t,action:"goFromTo",valuesFrom:{...s,...r},valuesTo:{...s},tweenProps:o??{},groupProps:{waitComplete:this.#e}}):this.#M({...this.#p,id:this.#o,tween:t,action:"goFrom",valuesFrom:{...s,...r},tweenProps:o,groupProps:{waitComplete:this.#e}}),this.#W(t),this}goFromTo(t,r={},o={},n={}){if(!Os(t))return this;n.delay=As(n?.delay);let s=this.#d?ho({timeline:this.#s,tween:t,index:this.#s.length}):{};return this.#o++,this.#M({...this.#p,id:this.#o,tween:t,action:"goFromTo",valuesFrom:{...s,...r},valuesTo:{...s,...o},tweenProps:n,groupProps:{waitComplete:this.#e}}),this.#W(t),this}add(t=Q){let r=uo(t,()=>{},"timeline add function");return this.#f?(On("add"),this):(this.#o++,this.#M({...this.#p,id:this.#o,callback:r,action:"add",groupProps:{waitComplete:this.#e}}),this)}addAsync(t){let r=Av(t);return this.#f?(On("addAsync"),this):(this.#o++,this.#M({...this.#p,id:this.#o,callback:r,action:"addAsync",groupProps:{waitComplete:this.#e}}),this)}createGroup(t={}){return this.#f?(On("createGroup"),this):(this.#o++,this.#M({...this.#p,id:this.#o,action:"createGroup",groupProps:t}),this.#e=t?.waitComplete??!1,this.#f=this.#h++,this)}closeGroup(){return this.#f=void 0,this.#o++,this.#M({...this.#p,id:this.#o,action:"closeGroup"}),this.#e=!1,this}suspend(t=()=>!0){return this.#f?(On("suspend"),this):(this.#o++,this.#M({...this.#p,id:this.#o,callback:t,action:"suspend",groupProps:{waitComplete:this.#e}}),this)}label(t={}){return this.#f?(On("label"),this):Nv(t?.name,"asyncTimeline label:")?(this.#o++,this.#M({...this.#p,id:this.#o,action:"label",labelProps:t,groupProps:{waitComplete:this.#e}}),this):this}#U(){this.#O||(this.#O=!0,this.#r.forEach(({tween:t})=>{let r=t.getInitialData();this.#o++,this.#s=[[{group:void 0,data:{...this.#p,id:this.#o,tween:t,action:"set",valuesFrom:r,valuesTo:r,groupProps:{waitComplete:this.#e}}}],...this.#s]}),this.#r.forEach(({tween:t})=>{let r=ho({timeline:this.#s,tween:t,index:this.#s.length});this.#o++,this.#s.push([{group:void 0,data:{...this.#p,id:this.#o,tween:t,action:"set",valuesFrom:r,valuesTo:r,groupProps:{waitComplete:this.#e}}}])}))}setTween(t="",r=[]){this.stop();let o=Ov(r),n=$v(t);if(!o||!n)return Promise.reject(new Error("timeline setTween: props is wrong"));let s=new Set(r.map(c=>c?.getId?.())),i=this.#r.filter(({id:c})=>s.has(c)),a=this.#s.findIndex(c=>{let[l]=c;return l.data.labelProps?.name===t});return a===-1?(fb(t),Promise.reject(new Error(`asyncTimeline.setTween() label: ${t} not found`))):new Promise(c=>{let l=i.map(({tween:p})=>{let d=ho({timeline:this.#s,tween:p,index:a});return new Promise((f,h)=>{p.set(d).then(()=>f({resolve:!0})).catch(()=>h())})});Promise.all(l).then(()=>{c({resolve:!0})}).catch(()=>{gb()})})}#G(){this.#I&&(this.#I(u.ANIMATION_STOP_REJECT),this.#I=void 0)}async#re(){if(this.#N)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#N=!0,await u.useFps(),this.#N=!1}async playFrom(t){return await this.#re(),this.#K(t,!1)}async playFromReverse(t){return await this.#re(),this.#K(t,!0)}#K(t,r){return new Promise((o,n)=>{this.playReverse({forceYoYo:!1,resolve:o,reject:n,callback:()=>{this.#s.length===0||this.#k||(this.#y&&this.#z(),this.#g=0,this.#a={isReverse:r,active:!0,index:u.checkType(String,t)?this.#s.findIndex(s=>{let[i]=s;return i.data.labelProps?.name===t}):t,callback:void 0},u.checkType(String,t)&&Pv(this.#a.index,t),this.#F())}})})}async play(){return await this.#re(),new Promise((t,r)=>{if(this.#l&&this.#U(),this.#i){if(this.#s.length===0||this.#k)return;this.stop(),this.#S=!1,this.#y&&this.#z(),this.#w++,u.useFrameIndex(()=>{this.#I=r,this.#B=t,this.#F()},1);return}this.playReverse({forceYoYo:!1,callback:()=>{this.stop(),this.#S=!1;let o=this.#r.map(({tween:n})=>{let s=n.getInitialData();return new Promise((i,a)=>{n.set(s).then(()=>i({resolve:!0})).catch(()=>a())})});Promise.all(o).then(()=>{this.#I=r,this.#B=t,this.#F()}).catch(()=>{})}})})}async playReverse({forceYoYo:t=!0,callback:r,resolve:o=null,reject:n=null}={}){return await this.#re(),new Promise((s,i)=>{let a=o??s,c=n??i,l=t;this.#l&&this.#U(),!(this.#s.length===0||this.#k)&&(this.stop(),this.#S=!1,l&&(this.#_=!0),this.#a={active:!0,index:this.#s.length,isReverse:!1,callback:r},this.#m--,this.#w++,u.useFrameIndex(()=>{this.#B=a,this.#I=c,this.#F()},1))})}reverseNext(){this.#x=!0}stop({clearCache:t=!0}={}){this.#S=!0,this.#g=0,this.#m=1,this.#G(),this.#x=!1,this.#Q(),this.#_=!1,this.#v=!1,this.#T=!1,this.#k=!1,this.#R=0,this.#r.forEach(({tween:r})=>{r?.stop?.({clearCache:t})}),this.#y&&this.#z(),this.#y=!1,this.#i||this.#$()}pause(){this.#v||(this.#v=!0,this.#R=u.getTime(),this.#se())}resume(){if(this.#v&&(this.#v=!1,this.#R=0,this.#ee()),this.#T){if(this.#T=!1,this.#R=0,this.#g<=this.#s.length-2){this.#g++,this.#F();return}this.#g===this.#s.length-1&&(this.#g=this.#t&&!this.#y?1:0,this.#Q(),this.#t&&this.#z(),this.#m++,this.#F())}}#se(){this.#c.forEach(({tween:t})=>{t?.pause?.()})}#ee(){this.#c.forEach(({tween:t})=>{t?.resume?.()})}#Q(){this.#a={active:!1,index:-1,isReverse:!1,callback:void 0}}get(){return this.#c}isActive(){return!this.#S}isPaused(){return this.#v}isSuspended(){return this.#T}getDirection(){return this.#S?ze.NONE:this.#y?ze.BACKWARD:ze.FORWARD}onLoopEnd(t){this.#b.push({cb:t,id:this.#P});let r=this.#P;return()=>{this.#b=this.#b.filter(o=>o.id!==r)}}onComplete(t){this.#D.push({cb:t,id:this.#P});let r=this.#P;return this.#P++,()=>{this.#D=this.#D.filter(o=>o.id!==r)}}destroy(){this.#r.forEach(({tween:t})=>{t?.destroy?.()}),this.#s=[],this.#c=[],this.#D=[],this.#b=[],this.#r=[],this.#g=0,this.#a={active:!1,callback:void 0,index:-1,isReverse:!1}}};var js=class{#n;#t;#i;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#_;#y;#v;#T;#k;#S;#w;#A;#R;constructor(t={}){this.#n=co(t?.duration),this.#t=le(t?.yoyo,"syncTimeline: yoyo",!1),this.#i=ka(t?.repeat),this.#l=[],this.#d=0,this.#u=0,this.#s=0,this.#c=0,this.#r=0,this.#e=0,this.#p=!1,this.#a=!1,this.#h=!1,this.#f=0,this.#o=0,this.#g=10,this.#m=!0,this.#x=!1,this.#_=!1,this.#y=!1,this.#v=!1,this.#T=0,this.#k=[],this.#S=[],this.#w=[],this.#A=void 0,this.#R=void 0}#O(t,r){if(this.#m||this.#y)return;let o=!this.#i||this.#i>=2&&this.#f===this.#i-1?0:1e3/r/2;this.#v&&(this.#c=t-this.#d-this.#u-this.#e),this.#u=Math.trunc(t-this.#d-this.#c-this.#e);let n=this.#p?this.#r-(this.#u-this.#r):this.#u;if(this.#v||(this.#s=rt(n,0,this.#n),this.#x||(this.#l.forEach(i=>{i.draw({partial:this.#s,isLastDraw:!1,useFrame:!0,direction:this.getDirection()})}),this.#w.forEach(({cb:i})=>{i({time:this.#s,direction:this.getDirection()})}))),this.#x=!1,this.#o++,n<=this.#n-o&&n>=0+o&&!this.#m){this.#_=!1,this.#E();return}if(this.#F(),this.#a){this.#p=!0,this.#r=0,this.#e=0,this.#a=!1,this.#E();return}let s=this.getDirection();if(u.useNextFrame(()=>{!this.#y&&!this.#_&&this.#o>this.#g&&(this.#_=!0,this.#f++,this.#o=0,this.#k.forEach(({cb:i})=>i({direction:s,loop:this.#f})))}),!this.#i||this.#f===this.#i-1&&this.#o>this.#g){let i=this.#s;this.#l.forEach(a=>{a.draw({partial:i,isLastDraw:!0,useFrame:!0,direction:this.getDirection()})}),this.#m=!0,this.#N(),this.#d=t,this.#p&&(this.#p=!1),this.#S.forEach(({cb:a})=>a()),this.#A&&this.#A(!0);return}if(this.#t){this.reverse(),this.#E();return}if(this.#h){this.#N(),this.#d=t,this.#p||(this.#h=!this.#h),this.#u=this.#n,this.#s=this.#n,this.#c=this.#n,this.#E();return}this.#N(),this.#d=t,this.#p&&(this.#h=!this.#h),this.#E()}#E(){u.useFrame(()=>{u.useNextTick(({time:t,fps:r})=>{this.#y||this.#O(t,r)})})}#N(){this.#u=0,this.#c=0,this.#s=0,this.#r=0,this.#e=0}#P(t){let r=this.#l.reduce((o,n)=>n.getLabels().find(({name:a})=>a===t)||o,{name:"",time:0});return r||bb(t),r.time}#b(){this.#R&&(this.#R(u.ANIMATION_STOP_REJECT),this.#R=void 0)}play(t={}){this.resume();let r=t?.useCurrent;return r||this.stop(),new Promise((o,n)=>{if(!this.#y&&(this.#b(),this.#A=o,this.#R=n,!(!this.#m&&!this.#p&&r))){if(!this.#m&&this.#p&&r){this.reverse();return}this.#D()}})}playFrom(t=0){return this.resume(),this.stop(),new Promise((r,o)=>{if(this.#y)return;let s=u.checkType(Number,t)?t:this.#P(t);this.#b(),this.#A=r,this.#R=o,this.#D(s)})}#D(t=0){this.#F(),this.#N(),this.#s=t,this.#e=-this.#s,this.#h=!1,this.#o=0,this.#y=!0,this.#I(t)}playFromReverse(t){return this.resume(),this.stop(),new Promise((r,o)=>{if(this.#y)return;let s=u.checkType(Number,t)?t:this.#P(t);this.#b(),this.#A=r,this.#R=o,this.#B(s,!0)})}playReverse(t={}){this.resume();let r=t?.useCurrent;return r||this.stop(),new Promise((o,n)=>{if(!this.#y&&(this.#b(),this.#A=o,this.#R=n,!(!this.#m&&this.#p&&r))){if(!this.#m&&!this.#p&&r){this.reverse();return}this.#B(this.#n,!0)}})}#B(t=0){this.#F(),this.#u=t,this.#s=t,this.#c=t,this.#r=0,this.#e=0,this.#a=!0,this.#h=!0,this.#x=!0,this.#o=0,this.#y=!0,this.#I(t)}async#I(t){if(this.#i===0)return;let{averageFPS:r}=await u.useFps();mo("sequencer",r),this.#p=!1,this.#l.forEach(o=>{o.inzializeStagger(),o.disableStagger(),o.draw({partial:t,isLastDraw:!1,useFrame:!0,direction:this.getDirection()})}),u.useFrame(()=>{u.useNextTick(({time:o,fps:n})=>{this.#d=o,this.#y=!1,this.#m=!1,this.#v=!1,this.#f=0,this.#O(o,n)})})}pause({freezeCache:t=!0}={}){if(!(this.#m||this.#v||this.#y)&&(this.#m=!1,this.#v=!0,t)){this.#l.forEach(r=>{r.freezeCachedId()});return}}resume({unFreezeCache:t=!0}={}){if(!(this.#m||!this.#v||this.#y)&&(this.#v=!1,t)){this.#l.forEach(r=>{r.unFreezeCachedId()});return}}reverse(){this.#v&&this.resume(),!(this.#m||this.#y)&&(this.#F(),this.#p=!this.#p,this.#p?this.#r=this.#u:this.#e+=this.#u-this.#s)}stop({clearCache:t=!0}={}){if(this.resume(),this.#m=!0,this.#b(),t){this.#l.forEach(r=>{r.cleanCachedId()});return}this.#l.forEach(r=>{r.draw({partial:this.#s,isLastDraw:!0,useFrame:!0,direction:this.getDirection()})})}add(t){return t.setStretchFactor(this.#n),this.#l.push(t),this}setDuration(t){return this.#n=t,this}#F(){this.#l.forEach(t=>t.resetLastValue())}isActive(){return!this.#m}isPaused(){return this.#v}getDirection(){return this.#m?ze.NONE:this.#p?ze.BACKWARD:ze.FORWARD}getTime(){return this.#s}onLoopEnd(t=()=>{}){this.#k.push({cb:t,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#k=this.#k.filter(o=>o.id!==r)}}onComplete(t=()=>{}){this.#S.push({cb:t,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#S=this.#S.filter(o=>o.id!==r)}}onUpdate(t=()=>{}){this.#w.push({cb:t,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#w=this.#w.filter(o=>o.id!==r)}}destroy(){this.stop(),this.#l.forEach(t=>t.destroy()),this.#l=[],this.#w=[],this.#k=[],this.#S=[]}};function bI(e){return new js(e)}function vI(e){return new Ws(e)}var qe={};So(qe,{createParallax:()=>CI,createScrollTrigger:()=>EI});var yI=({prevValue:e,value:t,maxVal:r})=>t>=r&&e<=r&&r>=0||t<=r&&e>=r&&r<=0?v.ON_LEAVE:t>r&&e<=r&&r<=0||t<r&&e>=r&&r>=0?v.ON_ENTER_BACK:t>=0&&e<=0&&r<=0||t<=0&&e>=0&&r>=0?v.ON_LEAVE_BACK:t>0&&t<r&&e<=0&&r>=0||t<0&&e>=0&&r<=0?v.ON_ENTER:v.ON_NOOP;function sy({prevValue:e,value:t,maxVal:r,onEnter:o,onEnterBack:n,onLeave:s,onLeaveBack:i}){({[v.ON_LEAVE]:()=>{s&&s()},[v.ON_ENTER_BACK]:()=>{n&&n()},[v.ON_LEAVE_BACK]:()=>{i&&i()},[v.ON_ENTER]:()=>{o&&o()},[v.ON_NOOP]:()=>{}})[yI({prevValue:e,value:t,maxVal:r})]()}var TI=({startMarker:e,endMarker:t,label:r})=>{if(!e&&!t){let o=r.replaceAll(/^[^a-z]+|[^\w.:-]+/gi,"-"),n=document.createElement("span");n.className+=`p-marker p-marker--start  p-marker-${o}`,n.innerHTML=`start ${o}`;let s=document.createElement("span");s.className+=`p-marker p-marker--end  p-marker-${o}`,s.innerHTML=`end ${o}`,document.body.append(n),document.body.append(s);let i=document.querySelector(`.p-marker--start.p-marker-${o}`),a=document.querySelector(`.p-marker--end.p-marker-${o}`);return{lastStartMarker:i??void 0,lastEndMarkerEl:a??void 0}}return{lastStartMarker:e,lastEndMarkerEl:t}},SI=({screen:e})=>{if(e===globalThis)return{top:0,right:0,bottom:0,left:0};let t=e.getBoundingClientRect();return{top:t.top,right:document.documentElement.clientWidth-(t.left+e.offsetWidth),bottom:window.innerHeight-(t.top+e.offsetHeight),left:t.left}},_I=({startPoint:e,direction:t,invertSide:r,top:o,bottom:n,left:s,right:i})=>t===v.DIRECTION_VERTICAL?r?{right:0,width:"100vw",height:"3px",top:`${e+o}px`,padding:"0 30px",pointerEvents:"none"}:{right:0,width:"100vw",height:"3px",bottom:`${e+n}px`,padding:"0 30px",pointerEvents:"none"}:r?{top:0,height:"100vw",width:"3px",left:`${e+s}px`,padding:"30px 0",pointerEvents:"none"}:{top:0,height:"100vw",width:"3px",right:`${e+i}px`,padding:"30px 0",pointerEvents:"none"},xI=({startPoint:e,endPoint:t,direction:r,invertSide:o,top:n,bottom:s,left:i,right:a})=>r===v.DIRECTION_VERTICAL?o?{right:0,width:"100vw",height:"3px",top:`${e+t+n}px`,padding:"0 30px",pointerEvents:"none"}:{right:0,width:"100vw",height:"3px",bottom:`${e+t+s}px`,padding:"0 30px",pointerEvents:"none"}:o?{top:0,height:"100vw",width:"3px",left:`${e+t+i}px`,padding:"30px 0",pointerEvents:"none"}:{top:0,height:"100vw",width:"3px",right:`${e+t+a}px`,padding:"30px 0",pointerEvents:"none"},iy=({startMarker:e,endMarker:t,startPoint:r,endPoint:o,screen:n,direction:s,invertSide:i,label:a})=>{let{lastStartMarker:c,lastEndMarkerEl:l}=TI({startMarker:e,endMarker:t,label:a}),{top:p,right:d,bottom:f,left:h}=SI({screen:n}),y=_I({startPoint:r,direction:s,invertSide:i,top:p,bottom:f,left:h,right:d}),b=xI({startPoint:r,endPoint:o,direction:s,invertSide:i,top:p,bottom:f,left:h,right:d}),T={position:"fixed",zIndex:"99999",background:ae.get("scrollTrigger")?.markerColor?.startEnd||"#ff0000",fontSize:"14px",whiteSpace:"nowrap",textTransform:"uppercase"};return u.useFrame(()=>{Object.assign(c?.style,{...T,...y}),Object.assign(l?.style,{...T,...b})}),{startMarker:c,endMarker:l}};var ay=({marker:e,direction:t,invertSide:r})=>{if(!e)return{};let n=`3px ${ae.get("scrollTrigger")?.markerColor?.item||"#14df3b"} solid`;return t===v.DIRECTION_VERTICAL?r?{borderBottom:n}:{borderTop:n}:r?{borderRight:n}:{borderLeft:n}};var za=class{#n=0;#t=0;#i=0;#l;#d;#u;#s;#c;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#_;#y;#v;#T;#k;#S;#w;#A;#R;#O;#E;#N;#P;#b;#D;#B;#I;#F;#L;#C;#Y;#z;#M;#W;#$;constructor(){this.#l=void 0,this.#d=0,this.#u=()=>0,this.#s=()=>0,this.#c=v.DIRECTION_VERTICAL,this.#r=0,this.#e=void 0,this.#p=void 0,this.#a=void 0,this.#o=void 0,this.#g=!1,this.#m=!1,this.#x=!1,this.#_=()=>{},this.#y=()=>{},this.#v=()=>{},this.#T=!0,this.#h=void 0,this.#f=globalThis,this.#M="left",this.#$=!0,this.#W=!1,this.#k=["flex","flex-shrink","flex-basis","float","display","grid-area","grid-column-start","grid-column-end","grid-row-start","grid-row-end","box-sizing","order","place-self","align-self","justify-self"],this.#S=["font-size","padding","margin","line-height","white-space"],this.#w=["text-align"],this.#A=["z-index","pointer-events"],this.#R=["transform","position","translate","rotate","scale"],this.#O=["none","static"],this.#E=!1,this.#N=0,this.#P=0,this.#b=!1,this.#D=1.5,this.#B=!1,this.#I=!1,this.#F=0,this.#L=0,this.#C=!1,this.#Y=0,this.#z=3}init(t){this.#e=t.item,this.#h=t.marker,this.#f=t.screen,this.#b=t.animatePin,this.#$=t.anticipatePinOnLoad,this.#B=t.forceTranspond,this.#l=t.invertSide,this.#c=t.direction,this.#u=t.getStart,this.#s=t.getEnd,this.#t=this.#u(),this.#d=this.#s(),this.#P=window.scrollY,this.#n=t?.scrollerHeight,this.#ue(),this.#M=this.#c===v.DIRECTION_VERTICAL?"top":"left",this.#E=!0,this.#T=!0,this.#re(),this.#se(),this.#K(),this.#U(),this.#y=u.useScrollStart(()=>{this.#E&&this.#f!==globalThis&&this.#m&&this.#o&&u.useFrame(()=>{this.#o&&(this.#o.style.transition="transform .85s cubic-bezier(0, 0.68, 0.45, 1.1)")})}),this.#_=u.useScroll(({scrollY:r})=>{if(this.#E&&this.#f!==globalThis&&this.#f!==document.documentElement){this.#c===v.DIRECTION_VERTICAL&&this.#ue();let o=r-this.#P;if(this.#P=r,this.#m&&this.#o&&this.#p){let{verticalGap:n}=this.#p.get(),s=n-o;this.#p.setData({collision:0,verticalGap:s}),u.useFrame(()=>{this.#o&&(this.#o.style.transform=`translate(0px,${s}px)`)})}}})}#U(){this.#p=new Ut({data:{collision:0,verticalGap:0},config:"wobbly"}),this.#v=this.#p.subscribe(({collision:t,verticalGap:r})=>{this.#c===v.DIRECTION_VERTICAL&&this.#o?this.#o.style.transform=`translate(0px, ${t}px)`:this.#o&&(this.#o.style.transform=`translate(${t}px, ${r}px)`)})}#G(){this.#o&&this.#p&&this.#p.set({collision:0,verticalGap:0}).catch(()=>{})}#re(){this.#e||(this.#e=document.createElement("div"));let t=document.createElement("div");t.classList.add("pin-wrapper");let r=document.createElement("div");r.classList.add("pin"),t.append(r);let o=this.#e?.parentNode;o&&o.insertBefore(t,this.#e),r.append(this.#e),this.#a=this.#e.closest(".pin-wrapper"),this.#o=this.#e.closest(".pin");let n=this.#Q(),s=this.#j(),i=ay({marker:this.#h,invertSide:this.#l,direction:this.#c}),a={display:"table"};u.useFrame(()=>{!this.#o||!this.#a||(Object.assign(this.#a.style,{...i}),Object.assign(this.#o.style,{...a,...s,...n}))}),this.#oe()}#K(){if(!this.#o||!this.#a)return;let t=this.#a.offsetHeight,r=this.#a.offsetWidth;this.#a.style.height=`${t}px`,this.#a.style.width=`${r}px`,this.#o.style.height=`${t}px`,this.#o.style.width=`${r}px`}#se(){if(!this.#e)return;let t=globalThis.getComputedStyle(this.#e),r=this.#k.reduce((o,n)=>({...o,[n]:t.getPropertyValue(n)}),{});u.useFrame(()=>{this.#a&&Object.assign(this.#a.style,r)})}#ee(t,r){let o=t.parentNode;if(o)for(;o!==null&&o!==document;){let n=getComputedStyle(o);if(n[r]&&!this.#O.includes(n[r]))return{[r]:n[r]};o=o.parentNode}}#Q(){return this.#o?this.#w.map(r=>this.#ee(this.#o,r)).filter(r=>r!==null).reduce((r,o)=>({...r,...o}),{})??{}:{}}#oe(){if(this.#B){this.#W=!0;return}this.#W=this.#R.map(t=>{let r=this.#ee(this.#a,t);if(!r)return!1;let[o]=Object.keys(r),[n]=Object.values(r);return o==="position"?n==="fixed"||n==="absolute":!0}).includes(!0)}#ie(){this.#t=this.#u(),this.#d=this.#s()}#ue(){this.#ie(),this.#f!==globalThis&&(this.#t-=this.#c===v.DIRECTION_VERTICAL?wt(this.#f).top:wt(this.#f).left),this.#i=this.#l?this.#t:this.#n-this.#t,this.#r=this.#l?-Math.trunc(this.#d):Math.trunc(this.#d)}destroy(){this.#E&&(this.#p?.stop?.(),this.#v(),this.#_(),this.#y(),this.#p?.destroy?.(),this.#p=null,this.#F=0,this.#I=!1,this.#x=!1,this.#m=!1,this.#g=!1,this.#o&&this.#a&&(this.#a.parentNode?.insertBefore(this.#e,this.#a),this.#o.remove(),this.#a.remove(),this.#a=void 0,this.#o=void 0,this.#E=!1))}#ce(){return this.#a?this.#c===v.DIRECTION_VERTICAL?wt(this.#a).top-this.#i:wt(this.#a).left-this.#i:0}#fe(){let t=this.#ce();this.#be(t)}#pe(){let t=this.#l?this.#ce()-this.#d:this.#ce()+this.#d;this.#be(t)}#be(t){u.useFrame(()=>{if(!this.#o||!this.#M)return;let r=this.#o?.style??{};r[this.#M]=`${this.#i}px`}),this.#b&&!this.#T&&this.#o&&this.#p&&this.#p.goFrom({collision:t}).then(()=>{this.#ge()}).catch(()=>{})}#ge(){u.useFrame(()=>{this.#o&&(this.#o.style.transform="translate(0px, 0px)")})}#X(){this.#G(),u.useFrame(()=>{this.#o&&(this.#o.style.transition="",this.#o.style.position="relative",this.#o.style.top="",this.#o.style.left="")})}#q(){this.#G(),u.useFrame(()=>{this.#o&&(this.#o.style.transition="",this.#o.style.position="relative",this.#c===v.DIRECTION_VERTICAL?(this.#o.style.left="",this.#o.style.top=`${this.#r}px`):(this.#o.style.top="",this.#o.style.left=`${this.#r}px`))})}#J(){if(!this.#o)return;let t=this.#c===v.DIRECTION_VERTICAL?wt(this.#o).left:wt(this.#o).top,r=this.#c===v.DIRECTION_VERTICAL?"left":"top";u.useFrame(()=>{this.#o&&(this.#o.style.position="fixed",this.#o.style[r]=`${t}px`,this.#I=!0,this.#C=!0)})}#j(){if(!this.#e)return{};let t=globalThis.getComputedStyle(this.#e);return this.#A.reduce((r,o)=>({...r,[o]:t.getPropertyValue(o)}),{})}#Z(){if(!this.#e)return{};let t=globalThis.getComputedStyle(this.#e);return this.#S.reduce((r,o)=>({...r,[o]:t.getPropertyValue(o)}),{})}#te(){return this.#S.reduce((t,r)=>({...t,[r]:""}),{})}#V(){if(this.#W){let t=this.#Q(),r=this.#j(),o=this.#Z();u.useFrame(()=>{this.#o&&(Object.assign(this.#o.style,{...r,...t}),this.#e&&Object.assign(this.#e.style,o),document.body.append(this.#o))})}}#ne(){!this.#W||!this.#e||!this.#a||u.useFrame(()=>{this.#o&&(Object.assign(this.#e.style,this.#te()),this.#a?.append(this.#o))})}#me(t){let r=this.#C&&this.#Y<3?this.#L:rt(Math.abs(t-this.#N),0,250);return this.#C&&this.#Y<this.#z?this.#Y++:(this.#Y=0,this.#C=!1),this.#L=r,r*this.#D}#H(t,r){if(this.#b&&!this.#T||this.#T&&!this.#$)return{anticipateBottom:0,anticipateInnerIn:0,anticipateInnerOut:0};let o=this.#me(t),n=r===v.SCROLL_UP?0:o,s=r===v.SCROLL_UP?0:o*2,i=r===v.SCROLL_UP?o:0;return{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}}#ye(t,r){if(this.#b&&!this.#T||this.#T&&!this.#$)return{anticipateBottom:0,anticipateInnerIn:0,anticipateInnerOut:0};let o=this.#me(t),n=r===v.SCROLL_UP?o:0,s=r===v.SCROLL_UP?o*2:0,i=r===v.SCROLL_UP?0:o;return{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}}onScroll(t){if(!this.#E||!this.#a)return;if(this.#I&&this.#F<this.#z){this.#F++;return}else this.#F=0,this.#I=!1;let r=this.#N>t?v.SCROLL_UP:v.SCROLL_DOWN,o=this.#c===v.DIRECTION_VERTICAL?wt(this.#a).top:wt(this.#a).left,{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}=this.#l?this.#ye(t,r):this.#H(t,r),a=this.#l?o<this.#t-n:o>this.#n-this.#t+n,c=this.#l?o>=this.#t-s&&o<=this.#t+i+this.#d:o<=this.#n-this.#t+s&&this.#n-o<=this.#d+i+this.#t;if(a)this.#x||(this.#X(),this.#ne(),this.#x=!0,this.#m=!1,this.#g=!1);else if(c){if(!this.#m){this.#J();let l=r===v.SCROLL_DOWN&&!this.#l||r===v.SCROLL_UP&&this.#l;this.#V(),l?this.#fe():this.#pe(),this.#x=!1,this.#m=!0,this.#g=!1}}else this.#g||(this.#q(),this.#ne(),this.#x=!1,this.#m=!1,this.#g=!0);this.#N=t,this.#T=!1}};var cy=()=>{console.warn("parallax prop checker: value in start or end prop with no unit misure is not allowed, failed operation, use vh in vertical mode or vw in horizontal or px")},ly=()=>{console.warn("parallax prop checker: value in start or end in vh is not allowed in horizontal mode, use vw or px")},uy=()=>{console.warn("parallax prop checker: value in start or end in vw is not allowed in vertical mode, use vh or px")};var ku=()=>({numberVal:0,unitMisure:"",additionalVal:"",position:""}),py=({invert:e,endValInNumber:t,scrollerHeight:r,isNegative:o,startPoint:n,isFromTopLeft:s})=>{let i=t*o-n,a=r-t*o-n;return e?s?i:a:s?a:i},my=({invert:e,scrollerHeight:t,screenUnit:r,endValInNumber:o,isNegative:n,startPoint:s,isFromTopLeft:i})=>e?i?t-r*(100-o*n)-s:r*(100-o*n)-s:i?t-r*o*n-s:r*o*n-s,dy=({offset:e,height:t,gap:r,wScrollTop:o,wHeight:n})=>e+t>o-r&&e<o+(n+r),hy=(e,t)=>{let r=e.find(c=>[...c].some(l=>!Number.isNaN(Number.parseFloat(l)))),o=vv(r);if(r&&!o)return cy(),ku();if(r&&o===v.VH&&t===v.DIRECTION_HORIZONTAL)return ly(),ku();if(r&&o===v.VW&&t===v.DIRECTION_VERTICAL)return uy(),ku();let n=[v.PLUS_HEIGHT,v.PLUS_HEIGHT_HALF,v.PLUS_WIDTH,v.PLUS_WIDTH_HALF,v.MINUS_HEIGHT,v.MINUS_HEIGHT_HALF,v.MINUS_WIDTH,v.MINUS_WIDTH_HALF],s=e.find(c=>hu(n,c)),i=[v.POSITION_BOTTOM,v.POSITION_TOP,v.POSITION_LEFT,v.POSITION_RIGHT],a=e.find(c=>hu(i,c));return{numberVal:r||0,unitMisure:o,additionalVal:s??"",position:a??v.POSITION_BOTTOM}},fy=(e,t,r)=>{let n=String(t).split(" "),{numberVal:s,unitMisure:i,additionalVal:a,position:c}=hy(n,r),p=String(s).charAt(0)==="-"?-1:1,f=Number.parseFloat(String(s).replaceAll(/^\D+/g,""))??0;return i===v.PX?{value:f*p,additionalVal:a,position:wa(c)}:{value:e*f*p,additionalVal:a,position:wa(c)}},gy=(e,t,r,o,n,s)=>{let a=String(t).split(" "),{numberVal:c,unitMisure:l,additionalVal:p,position:d}=hy(a,s),h=String(c).charAt(0)==="-"?-1:1,b=Number.parseFloat(String(c).replaceAll(/^\D+/g,""))??0,T=wa(d),_=T===v.POSITION_TOP||T===v.POSITION_LEFT;return l===v.PX?{value:py(n?{invert:!0,endValInNumber:b,scrollerHeight:o,isNegative:h,startPoint:r,isFromTopLeft:_}:{invert:!1,endValInNumber:b,scrollerHeight:o,isNegative:h,startPoint:r,isFromTopLeft:_}),additionalVal:p,position:T}:{value:my(n?{invert:!0,scrollerHeight:o,screenUnit:e,endValInNumber:b,isNegative:h,startPoint:r,isFromTopLeft:_}:{invert:!1,scrollerHeight:o,screenUnit:e,endValInNumber:b,isNegative:h,startPoint:r,isFromTopLeft:_}),additionalVal:p,position:T}},Ru=(e,t,r,o)=>{let n=String(t);return Ae(n,v.PLUS_HEIGHT_HALF)?e+r/2:Ae(n,v.PLUS_HEIGHT)?e+r:Ae(n,v.PLUS_WIDTH_HALF)?e+o/2:Ae(n,v.PLUS_WIDTH)?e+o:Ae(n,v.MINUS_HEIGHT_HALF)?e-r/2:Ae(n,v.MINUS_HEIGHT)?e-r:Ae(n,v.MINUS_WIDTH_HALF)?e-o/2:Ae(n,v.MINUS_WIDTH)?e-o:e},by=({switchPropierties:e,isReverse:t,value:r})=>{switch(e){case v.IN_STOP:return!t&&r>0||t&&r<0?0:r;case v.IN_BACK:return!t&&r>0||t&&r<0?-r:r;case v.OUT_STOP:return!t&&r<0||t&&r>0?0:r;case v.OUT_BACK:return!t&&r<0||t&&r>0?-r:r;default:return r}},vy=(e,t)=>e===v.PROP_OPACITY?1-t:-t,Nu=({callback:e,pin:t,ease:r,useThrottle:o})=>t?u.useScrollImmediate(e):r&&o?u.useScrollThrottle(e):u.useScroll(e);var fo=class{#n=!1;#t=!1;#i=0;#l=0;#d=0;#u=0;#s=0;#c=0;#r=0;#e;#p;#a;#h;#f;#o;#g;#m;#x;#_;#y;#v;#T;#k;#S;#w;#A;#R;#O;#E;#N;#P;#b;#D;#B;#I;#F;#L;#C;#Y;#z;#M;#W;#$;#U;#G;#re;#K;#se;#ee;#Q;#oe;#ie;#ue;#ce;#fe;#pe;#be;#ge;#X;#q;#J;#j;#Z;#te;#V;#ne;#me;#H;#ye;#de;#he;#le;#Ee;#Te;#ve;#Ce;#we;#Ie;#Re;#ae;constructor(t){this.#e=window.innerWidth,this.#p=window.innerHeight,this.#a=800,this.#h=0,this.#f=()=>{},this.#o=()=>{},this.#g=()=>{},this.#m=()=>{},this.#x=()=>{},this.#_=void 0,this.#y=void 0,this.#v=void 0,this.#T=0,this.#k=!1,this.#S=void 0,this.#w=!0,this.#A=!1,this.#R=!1,this.#O=!1,this.#E=void 0,this.#N="",this.#P=0,this.#b=0,this.#D=()=>{},this.#B=()=>{},this.#M=!1,this.#I=le(t?.pin,"Scrolltrigger pin propierties error:",!1),this.#F=le(t?.animatePin,"Scrolltrigger animatePin propierties error:",!1),this.#L=le(t?.forceTranspond,"Scrolltrigger forceTranspond propierties error:",!1),this.#C=le(t?.anticipatePinOnLoad,"Scrolltrigger anticipatePinOnLoad propierties error:",!1),this.#Y=Pa(t?.start,"Scrolltrigger start propierties error:","bottom 0px"),this.#z=Pa(t?.end,"Scrolltrigger end propierties error:","top"),this.#W=Pa(t?.marker,"Scrolltrigger marker propierties error:",void 0),this.#$=t?.dynamicStart?Su(t.dynamicStart,"dynamicStart"):null,this.#U=t?.dynamicEnd?Su(t.dynamicEnd,"dynamicEnd"):null,this.#G=Lv(t?.dynamicRange),this.#re=le(t?.animateAtStart,"Scrolltrigger animateAtStart propierties error:",!1),this.#K=uo(t?.onEnter,!1,"Scrolltrigger onEnter propierties error"),this.#se=uo(t?.onEnterBack,!1,"Scrolltrigger onEnterBack propierties error"),this.#ee=uo(t?.onLeave,!1,"Scrolltrigger onLeave propierties error"),this.#Q=uo(t?.onLeaveBack,!1,"Scrolltrigger onLeaveBack propierties error"),this.#oe=uo(t?.onTick,!1,"Scrolltrigger onTickCallback propierties error"),this.#ie=Fv(t?.align),this.#ue=Bv(t?.onSwitch),this.#ce=le(t?.reverse,"Parallax reverse propierties error:",!1),this.#fe=_u(t?.opacityStart,"Parallax opacityStart propierties error:",100),this.#pe=_u(t?.opacityEnd,"Parallax opacityEnd propierties error:",0),this.#be=le(t?.limiterOff,"Parallax|Scrolltrigger limiterOff propierties error:",!1),this.#ge=t?.useWillChange,this.#X=Dv(t?.tween);let r=this.#X?.getType&&this.#X.getType()===v.TWEEN_TIMELINE,o=this.#X?.getType&&this.#X.getType()===v.TWEEN_TWEEN;this.#q=$n(t?.item,!1),this.#J=$n(t?.scroller,!0),this.#j=$n(t?.screen,!0),this.#Z=Tu(t?.trigger),this.#te=Tu(t?.applyTo),this.#V=$s(t?.direction,"Parallax/Scrolltrigger"),this.#ne=le(t?.disableForce3D,"Parallax|Scrolltrigger disableForce3D propierties error:",!1),this.#me=le(t?.useThrottle,"Parallax|Scrolltrigger useThrottle propierties error:",!1),this.#H=Vv(t?.type),this.#ye=lr(t?.perspective,"Parallax|Scrolltrigger perspective propierties error:",0),this.#de=Vo(t?.breakpoint,"breakpoint","parallax/scrolltrigger"),this.#he=Wo(t?.queryType,"queryType","parallax/scrolltrigger");let{propierties:n,shouldTrackOnlyEvents:s}=jv(t?.propierties,this.#H,o,r);this.#le=n,this.#Ee=s,this.#Te=s?"100px":Wv(t?.range,this.#H),this.#ve=le(t?.ease,"Parallax|Scrolltrigger ease propierties error:",!1),r&&t?.easeType===v.EASE_SPRING&&nv(),this.#Ce=r?v.EASE_LERP:Hv(t?.easeType),this.#we=zv(t?.springConfig,this.#H),this.#Ie=Uv(t?.lerpConfig,this.#H),this.#Re=this.#Ce===v.EASE_SPRING?{configProps:{precision:v.EASE_PRECISION}}:{precision:v.EASE_PRECISION},this.#ae=this.#Ce===v.EASE_SPRING?new Ut:new Ar}init(){if(this.#n){console.warn("Parallax/scrollTrigger: The init() method cannot be launched more than once. If you are passing the instance to components like horizontalScroller or smoothScroller via the children property, they will initialize the instance.");return}this.#n=!0,this.#je(),this.#Oe(),this.#Ae(),this.#$e(),this.#Le(),this.#Fe(),this.setPerspective(),this.#le===v.PROP_TWEEN&&(this.#Te=this.#X?.getDuration?this.#X.getDuration():0,this.#G=()=>this.#Te,this.#X?.inzializeStagger?.()),this.#H==v.TYPE_SCROLLTRIGGER&&(this.#be=!0,this.#Pe(),this.#Me()),this.#ve&&(this.#g=u.useScrollStart(()=>{this.#ne||(this.#O=!0)}),this.#m=u.useScrollEnd(()=>{u.useFrame(()=>{u.useNextTick(()=>{this.#xe()})})}),this.#J===globalThis&&(this.#o=Nu({pin:this.#I,ease:this.#ve,useThrottle:this.#me,callback:()=>{this.#xe()}})),this.#xe()),this.#ve||(this.#J===globalThis&&(this.#o=Nu({pin:this.#I,ease:this.#ve,useThrottle:this.#me,callback:()=>{this.#_e(),this.#Se()}})),this.#_e(),this.#Se(),this.#m=u.useScrollEnd(()=>{this.#Se({forceRender:!0})})),this.#J!==globalThis&&this.#W&&(this.#x=u.useScroll(()=>{this.#Me()})),this.#f=u.useResize(({horizontalResize:t})=>{t&&this.refresh()}),this.#I&&(this.#E=new za,ge[this.#he](this.#de)&&u.useNextTick(()=>{this.#De(),this.#E?.init(this.#Ne()),this.#E?.onScroll(this.#c)}))}#Ne(){return{item:this.#q,marker:this.#W,screen:this.#j,animatePin:this.#F,anticipatePinOnLoad:this.#C,forceTranspond:this.#L,invertSide:this.#M,direction:this.#V,scrollerHeight:this.#r,getStart:()=>this.#P,getEnd:()=>this.#b}}setScroller(t){this.#J=$n(t,!0)}setScreen(t){this.#j=$n(t,!0)}setDirection(t){this.#V=$s(t,"Parallax/Scrolltrigger")}setBreakPoint(t){this.#de=Vo(t,"breakpoint","Parallax/Scrolltrigger")}setQueryType(t){this.#he=Wo(t,"queryType","Parallax/Scrolltrigger")}setPerspective(){if(this.#ye&&this.#q&&this.#q.parentNode){let t={perspective:`${this.#ye}px`,"transform-style":"preserve-3d"},r=this.#q.parentNode;Object.assign(r.style,t)}}#je(){let t=v.PROP_SCALE||v.PROP_SCALE_X||v.PROP_SCALE_Y||v.PROP_OPACITY?1:0;switch(this.#ae.setData({val:t}),this.#D=this.#ae.subscribe(({val:r})=>{r!==this.#v&&(this.#le===v.PROP_TWEEN&&this.#X?.draw?(this.#X.draw({partial:r,isLastDraw:!1,useFrame:!1}),this.#v=r,this.#w=!1):this.#ke(r),u.useNextTick(()=>{this.#oe&&this.#oe({value:r,parentIsMoving:!0})}))}),this.#B=this.#ae.onComplete(({val:r})=>{this.#O=!1,this.#le===v.PROP_TWEEN&&this.#X?.draw?this.#X.draw({partial:r,isLastDraw:!0,useFrame:!1}):this.#ke(r),u.useNextTick(()=>{this.#oe&&this.#oe({value:r,parentIsMoving:!1})})}),this.#Ce){case v.EASE_LERP:{this.#Ie&&"updateVelocity"in this.#ae&&this.#ae?.updateVelocity?.(this.#Ie);break}case v.EASE_SPRING:{this.#we&&"updateConfig"in this.#ae&&this.#ae?.updateConfig?.(this.#we);break}}}#Pe(){if(this.#G){let t=this.#G();this.#h=Number.isNaN(t)?0:Number.parseFloat(t),this.#N=v.PX}else{let t=String(this.#Te),o=t.charAt(0)==="-"?-1:1,n=Gv(t,this.#le);this.#h=Number.parseFloat(n.replaceAll(/^\D+/g,""))*o,this.#N=yv(n)}}#Me(){let t=this.#r/100;if(this.#$&&this.#$?.position&&this.#$?.value?.()!==void 0){let{position:l,value:p}=this.#$,d=p();Number.isNaN(d)||(this.#Y=`${l} ${d}px`)}let{value:r,additionalVal:o,position:n}=fy(t,this.#Y,this.#V);if(this.#M=n===v.POSITION_TOP||n===v.POSITION_LEFT,this.#P=Ru(r,o,this.#V===v.DIRECTION_VERTICAL?this.#u:this.#s,this.#V===v.DIRECTION_VERTICAL?this.#s:this.#u),this.#U&&this.#U?.position&&this.#U?.value?.()!==void 0){let{position:l,value:p}=this.#U,d=p();Number.isNaN(d)||(this.#z=`${l} ${d}px`)}let{value:s,additionalVal:i,position:a}=gy(t,this.#z,this.#P,this.#r,this.#M,this.#V),c=this.#M?a===v.POSITION_BOTTOM||a===v.POSITION_RIGHT?-1:1:a===v.POSITION_BOTTOM||a===v.POSITION_RIGHT?1:-1;this.#b=Ru(s,i,this.#V===v.DIRECTION_VERTICAL?this.#u*c:this.#s*c,this.#V===v.DIRECTION_VERTICAL?this.#s*c:this.#u*c),this.#He(),this.#M&&(this.#P-=this.#u)}#He(){if(this.#W){let{startMarker:t,endMarker:r}=iy({startMarker:this.#_,endMarker:this.#y,startPoint:this.#P,endPoint:this.#b,screen:this.#j,direction:this.#V,invertSide:this.#M,label:this.#W});this.#_=t,this.#y=r}}#Ae(){let t=this.#Z??this.#q;if(!t)return;let r=0,o=0,n=0;this.#Z&&(r=xo(this.#Z)?.x??0,o=xo(this.#Z)?.y??0,n=xo(this.#Z)?.z??0),t.style.transform="",this.#V===v.DIRECTION_VERTICAL?this.#i=this.#J===globalThis?Math.trunc(fe(t).top):Math.trunc(fe(t).top)-fe(this.#J).top:this.#i=this.#J===globalThis?Math.trunc(fe(t).left):Math.trunc(fe(t).left)-fe(this.#J).left,this.#j&&this.#j!==globalThis&&(this.#i-=this.#V===v.DIRECTION_VERTICAL?Math.trunc(fe(this.#j).top):Math.trunc(wt(this.#j).left)),this.#Z&&(r!==0||o!==0||n!==0)&&(this.#Z.style.transform=`translate3D(${r}px, ${o}px, ${n}px)`)}#Oe(){this.#j===globalThis||!this.#j||(this.#l=this.#V===v.DIRECTION_VERTICAL?Math.trunc(fe(this.#j).top):Math.trunc(wt(this.#j).left))}#$e(){let t=this.#Z??this.#q;t&&(this.#u=this.#V===v.DIRECTION_VERTICAL?Math.trunc(t.offsetHeight):Math.trunc(t.offsetWidth))}#Le(){let t=this.#Z??this.#q;t&&(this.#s=this.#V===v.DIRECTION_VERTICAL?Math.trunc(t.offsetWidth):Math.trunc(t.offsetHeight))}#De(){this.#J&&(this.#J===globalThis?this.#c=this.#V===v.DIRECTION_VERTICAL?this.#J.scrollY:this.#J.scrollX:this.#c=this.#V===v.DIRECTION_VERTICAL?-fe(this.#J).top:-fe(this.#J).left)}#Fe(){this.#j&&(this.#e=window.innerWidth,this.#p=window.innerHeight,this.#j===globalThis?this.#r=this.#V===v.DIRECTION_VERTICAL?window.innerHeight:window.innerWidth:this.#r=this.#V===v.DIRECTION_VERTICAL?Math.trunc(this.#j.offsetHeight):Math.trunc(this.#j.offsetWidth))}refresh(){this.#I&&this.#E&&this.#E.destroy(),this.#Oe(),this.#Ae(),this.#$e(),this.#Le(),this.#Fe(),this.#H==v.TYPE_SCROLLTRIGGER&&(this.#Me(),this.#G&&this.#Pe(),this.#I&&this.#E&&ge[this.#he](this.#de)&&this.#E?.init(this.#Ne())),this.#v=void 0,this.#w=!0,ge[this.#he](this.#de)?this.#ve?this.#xe():(this.#_e(),this.#Se({forceRender:!0})):(this.#ve&&this.#ae?.stop?.(),u.useFrameIndex(()=>{this.#te?(this.#Ve(this.#te),Object.assign(this.#te.style,this.#We())):(this.#Ve(this.#q),this.#q&&Object.assign(this.#q.style,this.#We()))},3))}move({value:t,parentIsMoving:r=!1}){if(!ge[this.#he](this.#de)||!t)return;this.#R=!0;let o=this.#ze(t);if(this.#ve)this.#xe(o);else{this.#_e(o);let n=this.#A||this.#w||void 0;this.#Se({forceRender:n,parentIsMoving:r})}}triggerScrollStart(){this.#ve&&(this.#ne||(this.#O=!0))}triggerScrollEnd(){this.#ve||this.#Se({forceRender:!0})}#ze(t){if(t!==void 0)return this.#j!==globalThis?t+this.#l:t}stopMotion(){this.#ae?.stop?.()}#_e(t){if(!ge[this.#he](this.#de)||(t?this.#c=-t:this.#De(),this.#A=dy({offset:this.#i,height:this.#u,gap:this.#a,wScrollTop:this.#c,wHeight:this.#r}),!this.#A&&!this.#be&&this.#H===v.TYPE_PARALLAX))return;this.#I&&this.#E&&this.#E.onScroll(this.#c),this.#H===v.TYPE_SCROLLTRIGGER?this.#d=_e(this.#Ue()):this.#le===v.PROP_OPACITY?this.#d=_e(this.#qe()):this.#d=Number.isNaN(Number.parseInt(this.#ie))?_e(this.#Je()/2):_e(this.#Ye()/2);let r=this.#ce&&this.#H!==v.TYPE_SCROLLTRIGGER?vy(this.#le,this.#d):this.#d;this.#d=this.#H===v.TYPE_SCROLLTRIGGER?r:this.#Xe(r)}#xe(t){if(!ge[this.#he](this.#de)||(this.#_e(t),!this.#k&&!this.#w&&this.#H===v.TYPE_SCROLLTRIGGER)||!this.#A&&!this.#w&&this.#H===v.TYPE_PARALLAX)return;let r=this.#w&&!this.#re?"set":"goTo";this.#ae&&this.#ae[r]({val:this.#d},this.#Re).catch(()=>{})}#Se({forceRender:t=!1,parentIsMoving:r=!1}={}){ge[this.#he](this.#de)&&u.useFrame(()=>{this.#d===this.#v&&!t||!this.#A&&!t||(!this.#ne&&!this.#R&&(this.#O=!t),!this.#ne&&this.#R&&(this.#O=r&&this.#A),this.#le===v.PROP_TWEEN?(this.#X.draw({partial:this.#d,isLastDraw:!this.#O,useFrame:!1}),this.#v=this.#d,this.#w=!1):this.#ke(this.#d),u.useNextTick(()=>{this.#oe&&this.#oe({value:this.#d,parentIsMoving:this.#O})}))})}#Ue(){let t=this.#M?-(this.#c+this.#P+this.#b-(this.#i+this.#b)):-(this.#c+this.#r-this.#P-(this.#i+this.#b)),r=this.#b/100*this.#h,o=t/100*this.#h,n=this.#ce?this.#M?r-o:o:this.#M?o:r-o,s=r>0?-rt(n,0,r):-rt(n,r,0);if(this.#k=this.#S!==s,this.#S=s,!this.#k&&!this.#w)return this.#d;let i=s*100/this.#b;switch((this.#K||this.#se||this.#ee||this.#Q)&&sy({prevValue:this.#T,value:n,maxVal:r,onEnter:this.#K,onEnterBack:this.#se,onLeave:this.#ee,onLeaveBack:this.#Q}),this.#T=n,this.#le){case v.PROP_HORIZONTAL:case v.PROP_VERTICAL:return this.#Ge(i);case v.PROP_SCALE:case v.PROP_SCALE_X:case v.PROP_SCALE_Y:case v.PROP_OPACITY:return 1-i;default:return-i}}#Ge(t){switch(this.#N){case v.VW:return this.#e/100*-t;case v.VH:return this.#p/100*-t;case v.WPERCENT:return this.#V===v.DIRECTION_VERTICAL?this.#s/100*-t:this.#u/100*-t;case v.HPERCENT:return this.#V===v.DIRECTION_VERTICAL?this.#u/100*-t:this.#s/100*-t;default:return-t}}#qe(){let t=this.#r/100*this.#pe,r=this.#r-this.#r/100*this.#fe,o=this.#ie==v.ALIGN_START?-this.#c*-1:(this.#c+t-this.#i)*-1,n=this.#ie==v.ALIGN_START?1-o/this.#i:1-o/(this.#r-r-t);return rt(n,0,1)}#Je(){let t=Number(this.#Te),r=Number.isNaN(t)?0:t,o=this.#V===v.DIRECTION_VERTICAL?document.documentElement.scrollHeight:document.documentElement.scrollWidth;switch(this.#ie){case v.ALIGN_START:return(this.#c+this.#l)/r;case v.ALIGN_TOP:case v.ALIGN_LEFT:return(this.#c-this.#i)/r;case v.ALIGN_CENTER:return(this.#c+(this.#r/2-this.#u/2)-this.#i)/r;case v.ALIGN_BOTTOM:case v.ALIGN_RIGHT:return(this.#c+(this.#r-this.#u)-this.#i)/r;case v.ALIGN_END:return-(o-(this.#c+this.#r))/r;default:return 0}}#Ye(){let t=Number(this.#ie),r=Number(this.#Te);return(this.#c+this.#r/100*t-this.#i)/r}#Xe(t){return by({switchPropierties:this.#ue,isReverse:this.#ce,value:t})}#ke(t){this.#te?Object.assign(this.#te.style,this.#Be(t)):this.#q&&Object.assign(this.#q.style,this.#Be(t)),this.#v=t,this.#w=!1}#Be(t){if(this.#Ee)return;let r=this.#O?"translate3D(0px, 0px, 0px)":"";this.#t=this.#ge?u.mustMakeSomething():!1;let o=this.#t&&this.#O?"transform":"",n=u.shouldMakeSomething()?Math.round(t):t;switch(this.#le){case v.PROP_VERTICAL:return{transform:`${r} translateY(${n}px)`,willChange:o};case v.PROP_HORIZONTAL:return{transform:`${r} translateX(${n}px)`,willChange:o};case v.PROP_ROTATE:return{transform:`${r} rotate(${n}deg)`,willChange:o};case v.PROP_ROTATEY:return{transform:`${r} rotateY(${n}deg)`,willChange:o};case v.PROP_ROTATEX:return{transform:`${r} rotateX(${n}deg)`,willChange:o};case v.PROP_ROTATEZ:return{transform:`${r} rotateZ(${n}deg)`,willChange:o};case v.PROP_OPACITY:return{opacity:`${t}`};case v.PROP_SCALE:{let s=this.#H===v.TYPE_SCROLLTRIGGER?t:1+t/1e3;return{transform:`${r} scale(${s})`,willChange:o}}case v.PROP_SCALE_X:{let s=this.#H===v.TYPE_SCROLLTRIGGER?t:1+t/1e3;return{transform:`${r} scaleX(${s})`,willChange:o}}case v.PROP_SCALE_Y:{let s=this.#H===v.TYPE_SCROLLTRIGGER?t:1+t/1e3;return{transform:`${r} scaleY(${s})`,willChange:o}}default:return{[this.#le.toLowerCase()]:`${t}px`}}}#Ve(t){this.#X&&t&&(t.style="")}#We(){if(!this.#Ee)switch(this.#le){case v.PROP_VERTICAL:case v.PROP_HORIZONTAL:case v.PROP_ROTATE:case v.PROP_ROTATEY:case v.PROP_ROTATEX:case v.PROP_ROTATEZ:case v.PROP_SCALE:return{transform:""};case v.PROP_OPACITY:return{opacity:""};default:return{[this.#le.toLowerCase()]:""}}}destroy(){this.#ae?.stop?.(),this.#o(),this.#g(),this.#m(),this.#f(),this.#D(),this.#B(),this.#x(),this.#ae?.destroy?.(),this.#ae=null,this.#G=()=>{},this.#$?.value&&(this.#$.value=()=>0),this.#U?.value&&(this.#U.value=()=>0),this.#K=()=>{},this.#se=()=>{},this.#ee=()=>{},this.#Q=()=>{},this.#oe=()=>{},this.#I&&this.#E&&this.#E?.destroy?.(),this.#_&&this.#_?.remove?.(),this.#y&&this.#y?.remove?.(),this.#_=void 0,this.#y=void 0,this.#E=void 0,this.#d=0;let t=this.#te??this.#q;t&&"style"in t&&(t.style=""),this.#q=null,this.#J=null,this.#j=null,this.#Z=null,this.#te=null}};function CI(e){return new fo({...e,type:v.TYPE_PARALLAX})}function EI(e){return new fo({...e,type:v.TYPE_SCROLLTRIGGER})}var Pu=window.innerHeight,Au=document.body.offsetHeight,go=!1,Ou=!0,Gt=window.scrollY,Hs=!0,qt=!1,$u=()=>{},Lu=()=>{},Ga=()=>{},Ua,yy=()=>{document.body.classList.remove("is-whelling")},wI=()=>{document.body.classList.add("is-whelling")};ce.setDefault({usePassive:!1});var II=({velocity:e,rootElement:t})=>{let r=z.createLerp({data:{scrollValue:window.scrollY},precision:1,velocity:.1});Ua=t;let o=r.subscribe(({scrollValue:d})=>{qt||window.scrollTo({top:Math.round(d),left:0,behavior:"instant"})});r.onComplete(()=>{Gt=window.scrollY});let n=u.useMouseWheel(d=>{if(qt)return;d.preventDefault(),Hs=!1,wI();let f=d.spinY??0,h=ce.clamp(f*e+Gt,0,Au-Pu);Gt=h,r.goTo({scrollValue:h}).catch(()=>{})}),s=u.useMouseWheel(({preventDefault:d})=>{Ou&&d()}),i=u.useMouseWheel(u.debounce(()=>{yy()},500)),a=u.useScrollEnd(()=>{let d=window.scrollY;Gt=d,r.setImmediate({scrollValue:d})}),c=u.useScroll(()=>{if(!Hs)return;let d=window.scrollY;Gt=d,r.setImmediate({scrollValue:d})}),l=u.usePointerDown(()=>{qt||(yy(),r.stop(),Gt=window.scrollY,Hs=!0)}),p=new ResizeObserver(()=>{r.stop(),r.setImmediate({scrollValue:window.scrollY}),Gt=window.scrollY,Pu=window.innerHeight,Au=document.body.offsetHeight});return p.observe(t),{destroy:()=>{go=!1,Gt=0,Hs=!0,qt=!1,Ua&&(p.unobserve(Ua),p.disconnect()),r?.stop(),r?.destroy(),r=null,Ua=null,o(),c(),a(),n(),l(),i(),s(),$u=()=>{},Lu=()=>{},Ga=()=>{}},stop:()=>{r.stop(),Gt=window.scrollY},update:()=>{r.setImmediate({scrollValue:window.scrollY})}}},qa=({velocity:e=100,rootElement:t=document.createElement("div")}={})=>{go||(Gt=window.scrollY,go=!0,qt=!1,Pu=window.innerHeight,Au=document.body.offsetHeight,Ou=!0,Hs=!1,{destroy:$u,stop:Lu,update:Ga}=II({velocity:e,rootElement:t}))},mr=()=>{!go||qt||(Lu(),qt=!0)},Jt=()=>{!go||!qt||(qt=!1)},zs=()=>{!go||!qt||(Ga(),Gt=window.scrollY,qt=!1)},Du=()=>{go&&Ga()},Fu=()=>{$u()},Ty=()=>{Ou=!0};var Sy=()=>go;var _y="easeOutQuad",Us=new Or({ease:_y,data:{val:0}}),Ja=!1,Bu=!1;Us.subscribe(({val:e})=>{window.scrollTo({top:e,left:0,behavior:"auto"}),Du()});var Vu=()=>{Bu&&(document.body.style.overflow=""),Us?.updateEase?.(_y),zs()},Wu=()=>{Ja&&(Us.stop(),Vu())};u.useMouseWheel(()=>{Wu()});u.useMouseDown(()=>{Wu()});u.useTouchStart(()=>{Wu()});var $r={to:(t,r)=>{if(typeof globalThis>"u")return;let o=t?Gc(t)||u.checkType(Number,t)?Gc(t)?fe(t).top:t:(console.warn(`bodyScroll ${t} is not valid target, must be a node or a number`),0):0,n=lr(r?.duration,"bodyScroll: duration",500);return Bu=le(r?.overflow,"bodyScroll: overflow",!1),Na(r?.ease)&&Us?.updateEase?.(r?.ease),Bu&&(document.body.style.overflow="hidden"),new Promise(s=>{Ja=!0,mr(),Us.goFromTo({val:window.scrollY},{val:o},{duration:n}).then(()=>{Vu(),Ja=!1,s(!0)}).catch(()=>{Vu(),Ja=!1,s(!0)})})}};var Gs={END:"END",START:"START",CENTER:"CENTER"};var MI=e=>{switch(e){case Gs.END:return"align-items:flex-end;";case Gs.CENTER:return"align-items:center;";default:return"align-items:flex-start;"}},xy=({mainContainer:e,queryType:t,breakpoint:r,container:o,trigger:n,row:s,column:i,shadow:a,useSticky:c,columnHeight:l,columnWidth:p,columnAlign:d})=>{let f=ge.getBreackpoint(r),h="user-select:none",y=c?"relative":"absolute",b=c?"position:sticky;top:0;":"",T=MI(d),_=p?`width:${p}vw;`:"",S=`
      @media (${t}-width:${f}px){${o}{position:relative;${h}}}@media (${t}-width:${f}px){${n}{z-index:10;position:${y};pointer-events:none;overflow:hidden;top:0;left:0;right:0}}@media (${t}-width:${f}px){${s}{--sectionheight:${l}vh}}@media (${t}-width:${f}px){${s}{display:flex;height:100vh;${b}${T}}}@media (${t}-width:${f}px){${i}{height:var(--sectionheight);flex:0 0 auto;${_}}}.${a}{display:none}@media (${t}-width:${f}px){.${a}{width:100%;display:block;pointer-events:none}}.${a}{display:none}@media (${t}-width:${f}px){.${a}{pointer-events:none;display:block;position:absolute;left:0;right:0}.${a}--end,.${a}--in-center,.${a}--left,.${a}--out-center{opacity:0;border:1px red dashed;width:25%}.${a}--end.debug,.${a}--in-center.debug,.${a}--left.debug,.${a}--out-center.debug{opacity:1}.${a}--in-center{position:absolute;top:0;right:0;padding:0 40px;text-align:center}.${a}--out-center{position:absolute;top:0;right:0;padding:0 40px;text-align:center}.${a}--left{position:absolute;top:0;left:50%;transform:translateX(-50%);padding:0 40px;text-align:center}.${a}--end{position:absolute;top:0;left:0;padding-left:40px}}`,E=document.createElement("div");E.classList.add("scroller-style");let C=document.createElement("style");C.append(document.createTextNode(S)),E.append(C),e.prepend(E)};var qs=class{#n=!0;#t=0;#i=!1;#l=0;#d=100;#u=100;#s=!1;#c=0;#r;#e;#p;#a;#h;#f;#o;#g;#m;#x;#_;#y;#v;#T;#k;#S;#w;#A;#R;#O;#E;#N;#P;#b;#D;#B;#I;#F;#L;#C;#Y;#z;#M;#W;#$;#U;#G;#re;#K;#se;#ee;#Q;#oe;#ie;#ue;#ce;#fe;#pe;constructor(t){this.#r=()=>{},this.#pe=0,this.#F=t?.container??"",this.#W=[],this.#$=!1,this.#U=0,this.#G={},this.#re=0,this.#K=t?.children||[],this.#e=le(t?.useDrag,"HorizontalScroller: useDrag",!1),this.#p=lr(t?.threshold,"HorizontalScroller: threshold",30),this.#a=le(t?.useWillChange,"HorizontalScroller: useWillChange",!1),this.#h=Vo(t?.breakpoint,"breakpoint","horizontalScroller"),this.#f=Wo(t?.queryType,"queryType","horizontalScroller"),this.#o=le(t?.forceTranspond,"HorizontalScroller: forceTranspond",!1),this.#g=le(t?.addCss,"HorizontalScroller: addCss",!0),this.#m=le(t?.animateAtStart,"HorizontalScroller: animateAtStart",!1),this.#x=le(t?.ease,"HorizontalScroller: ease",!1),this.#_=$a(t?.easeType??"","HorizontalScroller"),this.#y=le(t?.useSticky,"HorizontalScroller: useSticky",!1),this.#v=le(t?.animatePin,"HorizontalScroller: animatePin",!1),this.#T=le(t?.reverse,"HorizontalScroller: reverse",!1),this.#k=le(t?.useThrottle,"HorizontalScroller: useThrottle",!1),this.#S=lr(t?.columnHeight,"HorizontalScroller: columnHeight",100),this.#w=lr(t?.columnWidth,"HorizontalScroller: columnWidth",null),this.#A=t?.columnAlign?t.columnAlign.toUpperCase():Gs.START,this.#R=at(t?.onEnter,"HorizontalScroller: onEnter",Q),this.#O=at(t?.onEnterBack,"HorizontalScroller: onEnterBack",Q),this.#E=at(t?.onLeave,"HorizontalScroller: onLeave",Q),this.#N=at(t?.onLeaveBack,"HorizontalScroller: onLeaveBack",Q),this.#P=at(t?.afterInit,"HorizontalScroller: afterInit",Q),this.#b=at(t?.afterRefresh,"HorizontalScroller: afterRefresh",Q),this.#D=at(t?.afterDestroy,"HorizontalScroller: afterDestroy",Q),this.#B=at(t?.onTick,"HorizontalScroller: onTick",void 0),this.#I=u.checkType(String,t.root)?document.querySelector(t.root):t.root,this.#I||(this.#n=!1,console.warn("horizontal custom: root node not found")),this.#I.querySelector(this.#F)||(this.#n=!1,console.warn("horizontal custom: container node not found")),this.#L=this.#I.querySelector(t.trigger),this.#L||(this.#n=!1,console.warn("horizontal custom: trigger node not found")),this.#C=this.#I.querySelector(t.row),this.#C||(this.#n=!1,console.warn("horizontal custom: row node not found")),this.#Y=this.#I.querySelectorAll(t.column),this.#Y.length===0&&(this.#n=!1,console.warn("horizontal custom: column nodeList not found")),this.#z=this.#I.querySelectorAll("[data-shadow]");let o=t?.shadowClass||"shadow";this.#M=o.replace(".",""),this.#W=this.#C.querySelectorAll("a, button"),this.#K.forEach(n=>{this.#C&&n.setScroller(this.#C),n.setDirection("horizontal"),n.setBreakPoint(this.#h),n.setQueryType(this.#f),n.init()}),this.#g&&xy({mainContainer:this.#I,queryType:this.#f,breakpoint:this.#h,container:this.#F,trigger:t?.trigger??"trigger",row:t.row,column:t.column,shadow:this.#M,useSticky:this.#y,columnHeight:this.#S,columnWidth:this.#w,columnAlign:this.#A}),this.#se=n=>{if(!this.#i)return;let{movementX:s}=n,i=this.#T?s:-s;this.#X(i)},this.#ee=()=>{ge[this.#f](this.#h)&&(mr(),this.#s&&this.#C&&(this.#C.style.cursor="move"),this.#i=!0,this.#pe=this.#c)},this.#Q=()=>{Jt(),this.#i=!1,u.useFrame(()=>{this.#C&&(this.#C.style.cursor="")})},this.#oe=()=>{Jt(),this.#i=!1,u.useFrame(()=>{this.#C&&(this.#C.style.cursor="")})},this.#ie=n=>{ge[this.#f](this.#h)&&(mr(),this.#l=-n.touches[0].clientX,this.#i=!0,this.#pe=this.#c)},this.#ue=()=>{Jt(),this.#i=!1},this.#ce=n=>{let s=-n.touches[0].clientX,i=this.#T?-s+this.#l:s-this.#l;this.#X(i),this.#l=s,this.#s&&n.cancelable&&n.defaultPrevented&&n.preventDefault()},this.#fe=n=>{Math.abs(this.#c-this.#pe)>this.#p&&n.preventDefault()}}init(){this.#n&&ja(this.#te.bind(this),this.#Z.bind(this),this.#V.bind(this),this.#me.bind(this))().then(()=>{this.#H(),this.#e&&this.#J(),u.useResize(({horizontalResize:t})=>this.onResize(t)),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#P?.(),this.#K.forEach(t=>{t.refresh()})})},3)})}#be(){[...this.#W].forEach(t=>t.setAttribute("draggable","false"))}#ge(){[...this.#W].forEach(t=>t.removeAttribute("draggable"))}#X(t){this.#s&&u.useFrame(()=>window.scrollBy({top:t,left:0,behavior:"instant"}))}#q(){let t=window.scrollY;this.#s=this.#t-this.#u<t&&this.#t+this.#d+this.#U>t+window.innerHeight}#J(){this.#r=u.useScroll(()=>this.#q()),this.#q(),this.#C.addEventListener("click",this.#fe,{passive:!1}),this.#C.addEventListener("mousedown",this.#ee,{passive:!0}),this.#C.addEventListener("mouseup",this.#Q,{passive:!0}),this.#C.addEventListener("mouseleave",this.#oe,{passive:!0}),this.#C.addEventListener("touchstart",this.#ie,{passive:!0}),this.#C.addEventListener("touchend",this.#ue,{passive:!0}),this.#C.addEventListener("mousemove",this.#se,{passive:!0}),this.#C.addEventListener("touchmove",this.#ce,{passive:!0})}#j(){this.#r(),this.#C.removeEventListener("click",this.#fe),this.#C.removeEventListener("mousedown",this.#ee),this.#C.removeEventListener("mouseup",this.#Q),this.#C.removeEventListener("mouseleave",this.#oe),this.#C.removeEventListener("touchstart",this.#ie),this.#C.removeEventListener("touchend",this.#ue),this.#C.removeEventListener("mousemove",this.#se),this.#C.removeEventListener("touchmove",this.#ce)}#Z(){return!this.#L||!this.#I||!this.#C?new Promise(t=>{t(!0)}):new Promise(t=>{u.useFrame(()=>{let r=this.#U;this.#re=100*(r-window.innerWidth)/r,r>0&&(this.#L.style.height=`${r}px`,this.#I.style.height=`${r}px`,this.#C.style.width=`${r}px`),t(!0)})})}#te(){return new Promise(t=>{u.useFrame(()=>{if(!ge[this.#f](this.#h)){t(!0);return}this.#U=[...this.#Y].map(r=>Fe(r)).reduce((r,o)=>r+o,0),t(!0)})})}#V(){return this.#L?new Promise(t=>{u.useFrame(()=>{if(!ge[this.#f](this.#h)||!this.#z){t(!0);return}let r=[...this.#z].map(o=>{let n=o.dataset.shadow,s=Object.hasOwn(o.dataset,"debug"),i=s?"debug":"",a=s?`left left : ${n}`:"",c=s?`in center : ${n}`:"",l=s?`center out : ${n}`:"",p=s?`in out : ${n}`:"";return` <div
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
                        </div>`}).join("");this.#L.innerHTML=r,t(!0)})}):new Promise(t=>{t(!0)})}#ne(){this.#L&&(this.#L.innerHTML="")}#me(){return new Promise(t=>{if(!ge[this.#f](this.#h)){t(!0);return}u.useFrame(()=>{this.#z&&([...this.#z].forEach(r=>{let o=this.#re/100,n=r.dataset.shadow,s=Fe(r),i=ne(this.#C),a=xo(this.#C)?.x??0,c=this.#T?this.#U-(r.getBoundingClientRect().right-a):r.getBoundingClientRect().left-a,l=window.innerWidth/window.innerHeight,p=window.innerWidth-window.innerHeight,d=c/l,f=c-c/l,h=this.#I.querySelector(`.${this.#M}[data-shadow="${n}"]`),y=h?.querySelector(`.${this.#M}--in-center`),b=h?.querySelector(`.${this.#M}--out-center`),T=h?.querySelector(`.${this.#M}--left`),_=h?.querySelector(`.${this.#M}--end`),S=window.innerWidth>window.innerHeight?window.innerHeight:0,E=window.innerWidth>window.innerHeight?window.innerHeight/2:0,C=c===0?0:d+f/o-p/o,I=(()=>{let k=window.innerWidth>window.innerHeight?p/o:p/o+window.innerWidth/l;return c===0?0:k})(),M=(()=>{let k=s/l,A=(s-s/l)/o;return k+A+I})(),P=M/2+E;this.#y&&(this.#L.style["margin-top"]=`-${i}px`),h&&(h.style.top=`${C}px`),y&&(y.style.height=`${P}px`),b&&(b.style.height=`${P}px`),b&&(b.style.top=`${P}px`),T&&(T.style.height=`${I}px`),_&&(_.style.height=`${M+S}px`),h&&(h.style.height=`${I}px`)}),t(!0))})})}#H(){if(!this.#L||!ge[this.#f](this.#h))return;let t=new fo({type:"scrolltrigger",item:this.#C,useWillChange:this.#a,trigger:this.#L,propierties:"x",breakpoint:"xSmall",pin:!this.#y,animatePin:this.#v,ease:this.#x,forceTranspond:this.#o,useThrottle:this.#k,easeType:this.#_,springConfig:"scroller",animateAtStart:this.#m,reverse:this.#T,dynamicRange:()=>-(this.#U-window.innerWidth),dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>this.#U},onTick:({value:r,parentIsMoving:o})=>{let n=r??0,s=Math.abs(-Math.round(n*100/(this.#U-window.innerWidth)));this.#c=n,this.#B&&this.#B({value:n,parentIsMoving:o,percent:this.#T?100-s:s}),this.#K.forEach(i=>{i.move({value:n,parentIsMoving:o})})},onEnter:this.#R,onEnterBack:this.#O,onLeave:this.#E,onLeaveBack:this.#N});t.init(),this.#$=!0,this.#G=t,this.#t=fe(this.#L).top,this.#be()}#ye(){ja(this.#te.bind(this),this.#Z.bind(this),this.#V.bind(this),this.#me.bind(this))().then(()=>{this.#H(),this.#de()})}#de(){u.useFrameIndex(()=>{u.useNextTick(()=>{this.#b?.(),this.#K.forEach(t=>{t?.refresh?.()})})},3)}refresh(){return!this.#$||!ge[this.#f](this.#h)?new Promise(t=>t(!0)):new Promise(t=>{ja(this.#te.bind(this),this.#Z.bind(this),this.#me.bind(this))().then(()=>{this.#G?.stopMotion?.(),this.#t=fe(this.#L).top,this.#$&&(this.#G?.refresh?.(),this.#de()),t(!0)})})}#he({destroyAll:t=!1}){(this.#$||t)&&(this.#G?.destroy?.(),this.#G=null,this.#L&&(this.#L.style.height=""),this.#I&&(this.#I.style.height=""),this.#L&&(this.#L.style.marginTop=""),this.#ne(),this.#ge(),this.#$=!1,u.useFrameIndex(()=>{if(this.#C&&(this.#C.style.width="",this.#C.style.transform=""),t&&this.#I){this.#e&&this.#j();let r=this.#I.querySelector(".scroller-style");r&&r.remove(),this.#I=null,this.#L=null,this.#C=null,this.#Y=[],this.#z=[],this.#P=Q,this.#b=Q,this.#B=Q,this.#R=Q,this.#O=Q,this.#E=Q,this.#N=Q,this.#G=null,this.#$=!1,this.#W=[],this.#I=null,this.#F=null,this.#L=null,this.#C=null,u.useNextTick(()=>{this.#D?.(),this.#D=Q,this.#K.forEach(o=>{o?.destroy?.(),o=null}),this.#K=[]})}},3))}onResize(t){this.#$&&ge[this.#f](this.#h)?t&&this.refresh():!this.#$&&ge[this.#f](this.#h)?this.#ye():this.#$&&!ge[this.#f](this.#h)&&this.#he({destroyAll:!1})}destroy(){this.#he({destroyAll:!0})}};var Js=new Map,Ya=e=>{let t=u.checkType(Element,e);return t||console.warn(`slide utils ${e} is not a valid Dom element`),t},kI=e=>{let t=new Or({ease:"easeOutQuad",data:{val:0}});return{tween:t,unsubscribe:t.subscribe(({val:r})=>{e.style.height=`${r}px`})}},Lr={subscribe:n=>{if(!Ya(n))return()=>{};if(Js.has(n))return console.warn(`slide utils ${n} is alredysubscribed`),()=>{};let i=kI(n);return Js.set(n,i),()=>{i.unsubscribe();let{tween:a}=i;a.destroy(),Js.delete(n)}},reset:n=>{Ya(n)&&(n.style.height="0",n.style.overflow="hidden")},up:async n=>{if(!Ya(n))return new Promise(c=>c(!0));let s=Js.get(n);if(!s)return console.warn("slide element not exist in slide store"),new Promise(c=>c(!0));let{tween:i}=s,a=ne(n);await i.goFromTo({val:a},{val:0},{duration:500})},down:async n=>{if(!Ya(n))return new Promise(l=>l(!0));let s=Js.get(n);if(!s)return console.warn("slide element not exist in slide store"),new Promise(l=>l(!0));let{tween:i}=s,{val:a}=i.get();n.style.height="auto";let c=ne(n);n.style.height=`${a}px`,await i.goTo({val:c},{duration:500}),u.useNextTick(()=>{n.style.height="auto"})}};var Ct=class{#n=!0;#t=0;#i=0;#l=0;#d=0;#u=0;#s=30;#c=0;#r=!1;#e=0;#p=0;#a;#h;#f;#o;#g;#m;#x;#_;#y;#v;#T;#k;#S;#w;#A;#R;#O;#E;#N;#P;#b;#D;#B;#I;#F;#L;#C;#Y;#z;#M;#W=!1;#$;#U;#G;#re=0;#K=0;#se;#ee;#Q;constructor(t){this.#a=Q,this.#h=Q,this.#f=Q,this.#o=Q,this.#g=Q,this.#m=Q,this.#x=Q,this.#_=Q,this.#y=Q,this.#v=Q,this.#T=Q,this.#k=Q,this.#S={},this.#w=Q,this.#A=Q,this.#R=$s(t?.direction,"SmoothScroller"),this.#O=!1,this.#E=$a(t?.easeType??"","SmoothScroller"),this.#N=Vo(t?.breakpoint,"breakpoint","SmoothScroller"),this.#P=Wo(t?.queryType,"queryType","SmoothScroller"),this.#b=u.checkType(String,t?.scroller)?document.querySelector(t.scroller):t.scroller,this.#b||(console.warn("SmoothScroller: scroller node not found"),this.#n=!1),this.#D=t?.screen?u.checkType(String,t.screen)?document.querySelector(t.screen):t.screen:document.documentElement,this.#D||(this.#n=!1,console.warn("SmoothScroller: screen node not found")),this.#B=le(t?.scopedEvent,"SmoothScroller: scopedEvent",!1),this.#I=lr(t?.speed,"SmoothScroller: speed",60),this.#F=le(t?.drag,"SmoothScroller: drag",!1),this.#L=at(t?.onTick,"SmoothScroller: onTick",Q),this.#C=at(t?.onUpdate,"SmoothScroller: onUpdate",Q),this.#Y=at(t?.onSwipe,"SmoothScroller: onSwipe",Q),this.#ee=le(t?.useSwipe,"SmoothScroller: useSwipe",!1),this.#Q=le(t?.revertSwipeDirection,"SmoothScroller: revertSwipeDirection",!1),this.#se=le(t?.useHorizontalScroll,"SmoothScroller: useBothAxis",!1),this.#z=at(t?.afterRefresh,"SmoothScroller: afterRefresh",Q),this.#M=at(t?.afterInit,"SmoothScroller: afterInit",Q),this.#$=t?.children||[],this.#$.forEach(r=>{r.setScroller(this.#b),r.setDirection(this.#R),r.setScreen(this.#D),r.setBreakPoint(this.#N),r.setQueryType(this.#P),r.init()}),this.#U=r=>{this.#ie();let{spinY:o}=u.normalizeWheel(r);this.#J({spinY:o})},this.#G=r=>{let{clientX:o,clientY:n}=r.touches?r.touches[0]:r;this.#X({client:{x:o,y:n}})},this.#k=u.useMouseWheel(u.debounce(()=>{this.#oe()},500))}#oe(){this.#b&&this.#b.classList.remove("is-whelling")}#ie(){this.#b&&this.#b.classList.add("is-whelling")}#ue(){return this.#c>0}init(){this.#n&&(this.#E===v.EASE_SPRING?this.#S=new Ut:(this.#S=new Ar,this.#S.updateVelocity(.1)),this.#B&&(this.#b.addEventListener("wheel",this.#U,{passive:!0}),this.#b.addEventListener("mousemove",this.#G,{passive:!0}),this.#b.addEventListener("touchmove",this.#G,{passive:!0})),this.#B||(this.#_=u.useMouseWheel(t=>{this.#ce(t),this.#V(t)}),this.#y=u.useMouseMove(t=>this.#te(t)),this.#v=u.useTouchMove(t=>this.#te(t))),this.#a=u.useResize(()=>this.refresh()),this.#h=u.useScrollStart(()=>this.#ge()),this.#f=u.useScrollEnd(()=>this.#ge()),this.#o=u.useTouchStart(t=>this.#j(t)),this.#g=u.useTouchEnd(t=>this.#Z(t)),this.#m=u.useMouseDown(t=>this.#j(t)),this.#x=u.useMouseUp(t=>this.#Z(t)),this.#b.addEventListener("mouseleave",()=>{Jt()}),this.#F&&(this.#T=u.useMouseClick(({target:t,preventDefault:r})=>{this.#me({target:t,preventDefault:r})})),this.#be(),ge[this.#P](this.#N)&&(this.#fe(),this.#ge()),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#O||(this.#M?.({shouldScroll:this.#ue()}),this.#$.forEach(t=>{t.refresh()}))})},3))}#ce({pixelX:t}){if(!(!this.#ee||!t||this.#W||this.#Y.length===0)&&Math.abs(t)>40){this.#W=!0;let r=t>0?-1:1,o=this.#Q?r:r*-1;this.#Y({direction:o,move:n=>this.move(n).catch(()=>{})}),setTimeout(()=>{this.#W=!1},500)}}#fe(){if(!this.#b)return;this.#b.style["user-select"]="none",[...this.#b.querySelectorAll("a, button")].forEach(r=>{r.setAttribute("draggable","false"),r.style["user-select"]="none"})}#pe(){if(!this.#b)return;this.#b.style["user-select"]="",[...this.#b.querySelectorAll("a, button")].forEach(r=>{r.removeAttribute("draggable"),r.style["user-select"]=""})}#be(){this.#S&&(this.#S.setData({val:0}),this.#w=this.#S.subscribe(({val:t})=>{this.#b.style.transform=this.#R==v.DIRECTION_VERTICAL?`translate3d(0px, 0px, 0px) translateY(${-Math.trunc(t)}px)`:`translate3d(0px, 0px, 0px) translateX(${-Math.trunc(t)}px)`,this.#$.forEach(r=>{r.triggerScrollStart()}),u.useNextTick(()=>{this.#L({value:-t,percent:this.#i,parentIsMoving:!0}),this.#$.forEach(r=>{r.move({value:-t,parentIsMoving:!0})})})}),this.#A=this.#S.onComplete(({val:t})=>{this.#b.style.transform=this.#R==v.DIRECTION_VERTICAL?`translateY(${-Math.trunc(t)}px)`:`translateX(${-Math.trunc(t)}px)`,u.useNextTick(()=>{this.#L({value:-t,percent:this.#i,parentIsMoving:!1}),this.#$.forEach(r=>{r.triggerScrollEnd(),r.move({value:-t,parentIsMoving:!1})})})}))}#ge(){this.#D&&(this.#l=this.#D===document.documentElement?window.innerWidth:Fe(this.#D),this.#d=this.#D===document.documentElement?window.innerHeight:ne(this.#D),this.#c=this.#R===v.DIRECTION_VERTICAL?this.#b.offsetHeight-this.#d:this.#b.offsetWidth-this.#l,this.#ne())}#X({client:t}){!this.#r||!this.#F||(this.#e=this.#p,this.#p=this.#H({x:t?.x??0,y:t?.y??0}),this.#t+=Math.round(this.#e-this.#p),this.#ne())}#q(){return this.#R===v.DIRECTION_HORIZONTAL?this.#l/1920:this.#d/1080}#J({spinY:t=0}){if(!ge[this.#P](this.#N))return;this.#r=!1;let r=this.#q(),o=rt(t,-1,1);this.#t+=o*this.#I*r,this.#ne()}#j({target:t,client:r}){ge[this.#P](this.#N)&&(t===this.#b||cs(this.#b,t))&&(this.#u=this.#t,this.#r=!0,this.#e=this.#H({x:r?.x??0,y:r?.y??0}),this.#p=this.#H({x:r?.x??0,y:r?.y??0}))}#Z(){this.#r=!1}#te({target:t,client:r,preventDefault:o}){if((t===this.#b||cs(this.#b,t))&&this.#r&&this.#F){o(),this.#e=this.#p,this.#p=this.#H({x:r?.x??0,y:r?.y??0});let n=Math.round(this.#e-this.#p);this.#t+=n,this.#ne()}}#V({target:t,spinY:r=0,spinX:o=0,preventDefault:n}){if(ge[this.#P](this.#N)&&(this.#ie(),t===this.#b||cs(this.#b,t))){this.#r=!1,n?.(),mr();let s=Math.abs(this.#re-o),i=Math.abs(this.#K-r),a=this.#se&&!this.#ee&&s>i?o:r;if(Math.abs(a)===0)return;let c=this.#q();this.#t+=rt(a,-1,1)*this.#I*rt(c,1,10),this.#ne(),this.#K=r,this.#re=o}}move(t){return ge[this.#P](this.#N)?(this.#i=t,this.#t=this.#i*this.#c/100,this.#S.goTo({val:this.#t})):new Promise(r=>r())}set(t){ge[this.#P](this.#N)&&(this.#i=t,this.#t=this.#i*this.#c/100,this.#S.set({val:this.#t}))}#ne(){let t=this.#t*100/this.#c;this.#i=rt(t,0,100),this.#t=rt(this.#t,0,this.#c),this.#S.goTo({val:this.#t}).catch(()=>{}),this.#C?.({value:-this.#t,percent:this.#i,parentIsMoving:!0})}#me({target:t,preventDefault:r}){ge[this.#P](this.#N)&&(t===this.#b||cs(this.#b,t))&&Math.abs(this.#t-this.#u)>this.#s&&r()}#H({x:t,y:r}){return!t||!r?0:this.#R===v.DIRECTION_VERTICAL?r:t}refresh(){if(!ge[this.#P](this.#N)){this.#pe(),this.#S?.stop?.(),u.useFrame(()=>{u.useNextTick(()=>{this.#b.style.transform=""})});return}this.#ge(),this.#fe(),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#z?.({shouldScroll:this.#ue()}),this.#$.forEach(t=>{t.refresh()})})},2)}destroy(){this.#O=!0,this.#pe(),this.#a(),this.#h(),this.#f(),this.#o(),this.#g(),this.#m(),this.#x(),this.#_(),this.#y(),this.#v(),this.#T(),this.#w(),this.#A(),this.#k(),this.#S?.destroy(),this.#S=null,this.#$.forEach(t=>{t?.destroy?.()}),this.#$=[],this.#L=Q,this.#C=Q,this.#z=Q,this.#M=Q,this.#B&&(this.#b?.removeEventListener("wheel",this.#U),this.#b?.removeEventListener("mousemove",this.#G),this.#b?.removeEventListener("touchmove",this.#G)),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#b=null,this.#D=null})},3)}};var Cy=!1,RI=new Set(["scrollerN0","scrollerN1"]),Ey=()=>{let e=document.querySelector("#root");e&&(qa({rootElement:e}),m.mainStore.watch("beforeRouteChange",()=>{mr(),Ty()}),m.mainStore.watch("afterRouteChange",()=>{let t=m.getActiveRoute()?.route;Cy=RI.has(t),u.useFrameIndex(()=>{if(Cy){Fu();return}!Sy()&&qa({rootElement:e}),zs()},30)}))};function dt(){let e=navigator.userAgent,t=e.includes("Safari");return e.includes("Chrome")&&t&&(t=!1),t}function ht(){let e=navigator.userAgent,t=e.includes("Firefox");return e.includes("Chrome")&&t&&(t=!1),t}function wy(){let e=navigator.userAgent,t=document.body;if(/chrome|chromium|crios/i.test(e)){t.classList.add("is-chrome");return}if(/firefox|fxios/i.test(e)){t.classList.add("is-firefox");return}if(/safari/i.test(e)){t.classList.add("is-safari");return}if(/edg/i.test(e)){t.classList.add("is-edge");return}}var te=async({source:e})=>{let t=await fetch(e);if(!t.ok)return console.warn(`${e} not found`),{success:!1,data:""};let r={};try{r=await t.text()}catch(o){return console.warn(o),{success:!1,data:r}}return{success:!0,data:r}},Lt=async({source:e})=>{let t=await fetch(e);if(!t.ok)return console.warn(`${e} not found`),{success:!1,data:""};let r={};try{r=await t.json()}catch(o){return console.warn(o),{success:!1,data:r}}return{success:!0,data:r}};function Yt(e,t){return Math.floor(Math.random()*(t-e+1)+e)}var Iy=e=>new XMLSerializer().serializeToString(e).replaceAll(' xmlns="http://www.w3.org/1999/xhtml"',"");var My,ky={},NI="./asset/svg/icons/",PI=[{name:"gitHubIcon",source:"icon-github.svg"},{name:"searchIcons",source:"search.svg"},{name:"historyIcons",source:"history.svg"},{name:"starOutline",source:"star-outline.svg"},{name:"previous",source:"previous.svg"},{name:"close",source:"close.svg"},{name:"up",source:"up.svg"},{name:"swap",source:"swap.svg"},{name:"selectAll",source:"select-all.svg"}],dr=()=>My,ft=()=>ky,Ry=async()=>{let{success:e,data:t}=await Lt({source:"./data/common.json"});e||console.warn("data fail to load"),My=t},Ny=async()=>{let e=PI.map(({name:r,source:o})=>te({source:`${NI}${o}`}).then(n=>({name:r,result:n})));ky=(await Promise.all(e)).map(({name:r,result:o})=>o.success?{name:r,data:o.data}:{name:r,data:"icon load error"}).reduce((r,{name:o,data:n})=>({...r,[o]:n}),{})};var Py=()=>g`
        <div class="error-page">
            <div class="error-page__content">
                <h1 class="error-page__title title-big">Page not found</h1>
                <a class="error-page__link" href="./#home">back to home</a>
            </div>
        </div>
    `;var Ay=({screenElement:e,scrollerElement:t,hideControls:r})=>{let o=new Ct({screen:e,scroller:t,direction:"horizontal",drag:!0,useHorizontalScroll:!0,easeType:"lerp",breakpoint:"small",afterInit:({shouldScroll:n})=>{r(n)},afterRefresh:({shouldScroll:n})=>{r(n)}});return o.init(),{destroy:()=>{o.destroy()},refresh:()=>{o.refresh()}}};var AI=e=>e<10?`0${e}`:`${e}`,Oy=({setRef:e,getRef:t,onMount:r,bindEffect:o,getProxi:n})=>{let s=n(),i=()=>{},a=()=>{};return r(()=>{let{screenElement:c,scrollerElement:l}=t();return{destroy:i,refresh:a}=Ay({screenElement:c,scrollerElement:l,hideControls:p=>{s.showControls=p}}),u.useNextLoop(()=>{a()}),setTimeout(()=>{s.isMounted=!0},500),()=>{i(),i=()=>{},a=()=>{}}}),g`<div class="l-links">
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
                                                >${AI(l)}</span
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
    </div>`};var $y=m.createComponent({tag:"layout-links",component:Oy,props:{title:()=>({value:"",type:String}),items:()=>({value:[],type:Array})},state:{isMounted:()=>({value:!1,type:Boolean}),showControls:()=>({value:!1,type:Boolean})}});m.useComponent([$y]);var Xa=async({props:e})=>{let{source:t}=e,{data:r}=await Lt({source:t});return g` <div class="l-links">
        <layout-links
            ${m.staticProps({title:r.title,items:r.items})}
        ></layout-links>
    </div>`};var Ly=()=>g`
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
    `;var Ka=m.createComponent({tag:"doc-container",component:Ly});var Dy=()=>g`
        <div class="c-doc-title">
            <h2><mobjs-slot></mobjs-slot></h2>
        </div>
    `;var Qa=m.createComponent({tag:"doc-title",component:Dy,state:{}});var Fy=()=>g`
        <div class="c-doc-title-small">
            <mobjs-slot></mobjs-slot>
        </div>
    `;var Za=m.createComponent({tag:"doc-title-small",component:Fy,state:{}});var sT=MC(nT(),1);var Xu=sT.default;var iT="[A-Za-z$_][0-9A-Za-z$_]*",xM=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],CM=["true","false","null","undefined","NaN","Infinity"],aT=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],cT=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],lT=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],EM=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],wM=[].concat(lT,aT,cT);function uT(e){let t=e.regex,r=(L,{after:B})=>{let j="</"+L[0].slice(1);return L.input.indexOf(j,B)!==-1},o=iT,n={begin:"<>",end:"</>"},s=/<[A-Za-z0-9\\._:-]+\s*\/>/,i={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(L,B)=>{let j=L[0].length+L.index,X=L.input[j];if(X==="<"||X===","){B.ignoreMatch();return}X===">"&&(r(L,{after:j})||B.ignoreMatch());let ue,ye=L.input.substring(j);if(ue=ye.match(/^\s*=/)){B.ignoreMatch();return}if((ue=ye.match(/^\s+extends\s+/))&&ue.index===0){B.ignoreMatch();return}}},a={$pattern:iT,keyword:xM,literal:CM,built_in:wM,"variable.language":EM},c="[0-9](_?[0-9])*",l=`\\.(${c})`,p="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${p})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${p})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},f={className:"subst",begin:"\\$\\{",end:"\\}",keywords:a,contains:[]},h={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"xml"}},y={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"css"}},b={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"graphql"}},T={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,f]},S={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},E=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,h,y,b,T,{match:/\$\d+/},d];f.contains=E.concat({begin:/\{/,end:/\}/,keywords:a,contains:["self"].concat(E)});let C=[].concat(S,f.contains),I=C.concat([{begin:/(\s*)\(/,end:/\)/,keywords:a,contains:["self"].concat(C)}]),M={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:I},P={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},k={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...aT,...cT]}},A={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},R={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[M],illegal:/%/},F={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function $(L){return t.concat("(?!",L.join("|"),")")}let w={match:t.concat(/\b/,$([...lT,"super","import"].map(L=>`${L}\\s*\\(`)),o,t.lookahead(/\s*\(/)),className:"title.function",relevance:0},O={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},D={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},M]},x="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",N={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(x)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[M]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:a,exports:{PARAMS_CONTAINS:I,CLASS_REFERENCE:k},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),A,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,h,y,b,T,S,{match:/\$\d+/},d,k,{scope:"attr",match:o+t.lookahead(":"),relevance:0},N,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[S,e.REGEXP_MODE,{className:"function",begin:x,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:I}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:n.begin,end:n.end},{match:s},{begin:i.begin,"on:begin":i.isTrulyOpeningTag,end:i.end}],subLanguage:"xml",contains:[{begin:i.begin,end:i.end,skip:!0,contains:["self"]}]}]},R,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[M,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},O,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[M]},w,F,P,D,{match:/\$[(.]/}]}}Xu.registerLanguage("javascript",uT);var pT=async({ref:e,source:t})=>{if(!e)return;let{success:r,data:o}=await te({source:t});if(!r){e.textContent="something went wrong";return}e.textContent=o,Xu.highlightElement(e),e.style.height=""},IM=()=>getComputedStyle(document.documentElement).getPropertyValue("--snippet-line-height-value"),mT=({onMount:e,setRef:t,getRef:r,delegateEvents:o,bindEffect:n,getProxi:s,bindObject:i})=>{let a=s(),c=IM(),l="20rem",p=Number(a.numLines)>15,d=p?"use-expand":"",f=`${a.numLines*Number(c)}rem`;return e(async()=>{let{codeEl:h}=r();return a.awaitLoad?await pT({ref:h,source:a.source}):pT({ref:h,source:a.source}),()=>{}}),g`<div
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
    </div>`};var dT=m.createComponent({tag:"mob-snippet",component:mT,props:{source:()=>({value:"",type:String}),numLines:()=>({value:1,type:Number}),awaitLoad:()=>({value:!1,type:Boolean})},state:{contentIsLoaded:()=>({value:!1,type:Boolean}),isExpanded:()=>({value:!1,type:Boolean})}});var Ks="debug_component",nc="debug_filter_list",sc="debug_overlay",ic="debug_tree",Qs="quick_nav",Zs="scroll_down_label",ei="scroll_to",hT="header",ac="mob_navigation",ti="mob_navigation_container",cc="search_overlay",ri="search_overlay_list",zo="search_overlay_header",lc="right-sidebar",uc="route-loader",qn="custom-history";var fT=({id:e,label:t,element:r,isSection:o,isNote:n})=>{m.useMethodByName(ei)?.addItem?.({id:e,label:t,element:r,isSection:o,isNote:n})},gT=e=>{m.useMethodByName(ei)?.setActiveLabel?.(e)};function MM({label:e}){return e?.length>0}var kM=async({id:e,label:t,element:r,isSection:o,isNote:n})=>{await m.tick(),fT({id:e,label:t,element:r,isSection:o,isNote:n}),Cp(r)&&!o&&gT(t)},bT=({getState:e,onMount:t})=>{let{style:r,line:o,id:n,label:s,isSection:i,isNote:a}=e(),c=o?"spacer--line":"";return t(({element:l})=>{MM({label:s})&&kM({id:n,label:s,element:l,isSection:i,isNote:a})}),g`<div id="${n}" class="spacer spacer--${r} ${c}">
        <span></span>
    </div>`};var vT=m.createComponent({tag:"mob-spacer",component:bT,props:{style:()=>({value:"x-small",type:String,validate:e=>["x-small","small","medium","big"].includes(e),strict:!0}),line:()=>({value:!1,type:Boolean}),id:()=>({value:"",type:String}),label:()=>({value:"",type:String}),isSection:()=>({value:!1,type:Boolean}),isNote:()=>({value:!1,type:Boolean})}});var yT=({getState:e,delegateEvents:t})=>{let{content:r,anchor:o}=e();return g`<div>
        <button
            type="button"
            class="anchor-button"
            ${t({click:()=>{let n=document.querySelector(o);if(!n)return;let s=fe(n).top-50;$r.to(s)}})}
        >
            ${r}
            <span class="anchor-button__arrow">
                <span class="anchor-button__arrow__start"></span>
                <span class="anchor-button__arrow__end"></span>
            </span>
        </button>
    </div>`};var TT=m.createComponent({tag:"anchor-button",component:yT,props:{anchor:()=>({value:"",type:String}),content:()=>({value:"",type:String})}});var RM=({items:e,links:t})=>t?e.map(({label:r,url:o})=>g`<li>
                          <a href="${o}" class="list-links">
                              ${r}
                              <span class="list-links__arrow">
                                  <span class="list-links__arrow__start"></span>
                                  <span class="list-links__arrow__end"></span>
                              </span>
                          </a>
                      </li>`).join(""):e.map(r=>g` <li>${r}</li> `).join(""),ST=({getState:e})=>{let{style:t,color:r,items:o,links:n}=e(),s=`is-${r}`;return g`<ul class="ul ul--${t} ${s} ${n?"use-links":"use-default"}">
        ${RM({items:o,links:n})}
    </ul>`};var _T=m.createComponent({tag:"mob-list",component:ST,props:{style:()=>({value:"medium",type:String,validate:e=>["small","medium","big"].includes(e),strict:!0}),dots:()=>({value:!0,type:Boolean}),links:()=>({value:!1,type:Boolean}),color:()=>({value:"black",type:String,validate:e=>["white","black","grey","hightlight"].includes(e)}),items:()=>({value:[],type:Array})}});var xT=({getState:e})=>{let{style:t,color:r,boxed:o,note:n}=e(),s=r==="inherit"?"":`is-${r}`;return g`<p
        class="p p--${t} ${o?"p--boxed":""} ${n?"p--note":""} ${s}"
    >
        <mobjs-slot></mobjs-slot>
    </p>`};var CT=m.createComponent({tag:"mob-paragraph",component:xT,props:{style:()=>({value:"medium",type:String,validate:e=>["small","medium","big"].includes(e),strict:!0}),color:()=>({value:"inherit",type:String,validate:e=>["inherit","white","hightlight","black"].includes(e)}),boxed:()=>({value:!1,type:Boolean}),note:()=>({value:!1,type:Boolean})}});var NM=e=>e.length>0?g`<span class="title-index">${e}</span>`:"",ET=({getProxi:e})=>{let t=e(),r=t.color==="inherit"?"":`is-${t.color}`,o=t.isBold?"is-bold":"",n=t.isSection?"is-section":"";return g`<${t.tag} class="${r} ${o} ${n}">
            ${NM(t.index)}
            <span class="title-content">
                <mobjs-slot></mobjs-slot>
            </span>
        </${t.tag}>`};var wT=m.createComponent({tag:"mob-title",component:ET,props:{tag:()=>({value:"h1",type:String}),color:()=>({value:"inherit",type:String,validate:e=>["inherit","white","black"].includes(e)}),isSection:()=>({value:!1,type:Boolean}),isBold:()=>({value:!1,type:Boolean}),index:()=>({value:"",type:String})}});var PM=({data:e,staticProps:t,awaitLoadSnippet:r})=>e.map(o=>{let{component:n,props:s,content:i}=o;return g`
                <${n} ${t({...s,awaitLoad:r})}>
                    ${i??""}
                </${n}>
            `}).join(""),AM=async({source:e,data:t})=>{if(t&&t.length>0)return t;let{success:r,data:o}=await Lt({source:e});return r?o.data:[]},IT=async({getState:e,staticProps:t})=>{let{source:r,data:o}=e(),n=await AM({source:r,data:o}),{awaitLoadSnippet:s,usePadding:i}=e();return g`
        <section class="html-content ${i?"use-padding":""}">
            ${PM({data:n,staticProps:t,awaitLoadSnippet:s})}
        </section>
    `};var OM=async({proxi:e})=>{let{success:t,data:r}=await te({source:e.url});t&&(e.source=r)},MT=({getProxi:e,invalidate:t,onMount:r})=>{let o=e();return r(()=>{OM({proxi:o})}),g`
        <div class="c-doc-svg ${o.className}">
            ${t({observe:()=>o.source,render:()=>o.source})}
        </div>
    `};var kT=m.createComponent({tag:"doc-svg",component:MT,props:{className:()=>({value:"",type:String}),url:()=>({value:"",type:String})},state:{source:()=>({value:g`<span class="c-doc-svg__loading">
                    loading image ...
                </span>`,type:String})}});var pc=m.createComponent({tag:"html-content",component:IT,props:{source:()=>({value:"",type:String}),data:()=>({value:[],type:Array}),awaitLoadSnippet:()=>({value:!1,type:Boolean}),useTriangle:()=>({value:!0,type:Boolean}),usePadding:()=>({value:!0,type:Boolean})},child:[_T,CT,wT,dT,vT,TT,kT]});var RT=({bindEffect:e,getProxi:t})=>{let r=t(),o=r.isSection?"is-section":"",n=r.isNote?"is-note":"";return g`
        <button
            type="button"
            class="${o} ${n}"
            ${e({toggleClass:{active:()=>r.active}})}
        >
            <span>${r.label}</span>
        </button>
    `};var NT=m.createComponent({tag:"scroll-to-button",component:RT,props:{label:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean}),isSection:()=>({value:!1,type:Boolean}),isNote:()=>({value:!1,type:Boolean})}});var oi=!1;function $M({delegateEvents:e,bindProps:t,proxi:r}){return r.anchorItems.map(o=>{let n=o.isSection||o.isNote?"":e({click:async()=>{let{id:s,label:i,element:a}=o,c=s==="start"?0:fe(a).top-50;oi=!0,r.activeLabel=i,await $r.to(c),setTimeout(()=>{oi=!1},1e3)}});return g`
                <li>
                    <scroll-to-button
                        ${n}
                        ${t(()=>({active:r.activeLabel===o.label,label:o.label,isSection:o.isSection??!1,isNote:o.isNote??!1}))}
                    >
                    </scroll-to-button>
                </li>
            `}).join("")}var PT=({proxi:e,direction:t,winHeight:r})=>{u.useFrame(()=>{u.useNextTick(()=>{if(t==="DOWN"){let o=e.anchorItems.findLast(({top:n,isNote:s})=>!s&&n<window.scrollY+r-200);e.activeLabel=o?o.label:""}if(t==="UP"){let o=e.anchorItems.findLast(({top:n,isNote:s})=>!s&&n<window.scrollY+200);e.activeLabel=o?o.label:""}})})},AT=({onMount:e,delegateEvents:t,bindProps:r,invalidate:o,computed:n,addMethod:s,updateState:i,getProxi:a})=>{let c=a(),l="DOWN",p=window.innerHeight;return s("addItem",({id:d,label:f,element:h,isSection:y,isNote:b})=>{i("anchorItemsToBeComputed",T=>[...T,{id:d,label:f,element:h,isSection:y,isNote:b}])}),s("setActiveLabel",d=>{oi||(c.activeLabel=d)}),e(()=>{if(ce.mq("max","desktop"))return;n(()=>c.anchorItems,()=>c.anchorItemsToBeComputed.map(b=>({...b,top:fe(b.element).top})));let d=u.useScrollThrottle(({direction:b})=>l=b),f=new ResizeObserver(u.debounce(()=>{u.useFrame(()=>{u.useNextTick(()=>{p=window.innerHeight})}),c.anchorItems.forEach(b=>{b.top=fe(b.element).top})},200));f.observe(m.getRoot());let h=c.updateAnchorOnWheel?u.useMouseWheel(u.debounce(()=>{oi||PT({proxi:c,direction:l,winHeight:p})},600)):()=>{},y=u.useScrollEnd(()=>{oi||PT({proxi:c,direction:l,winHeight:p})});return()=>{h(),d(),y(),f.unobserve(m.getRoot()),f.disconnect(),f=null}}),g`
        <div class="c-scroll-to">
            <ul>
                ${o({observe:()=>c.anchorItems,render:()=>$M({delegateEvents:t,bindProps:r,proxi:c})})}
            </ul>
        </div>
    `};var OT=m.createComponent({tag:"scroll-to",component:AT,state:{activeLabel:()=>({value:"",type:String}),updateAnchorOnWheel:()=>({value:!1,type:Boolean}),anchorItemsToBeComputed:()=>({value:[],type:Array}),anchorItems:()=>({value:[],type:Array,transform:e=>e.toSorted(function(t,r){let{element:o}=t,{element:n}=r;return o===n||!o||!n?0:o.compareDocumentPosition(n)&2?1:-1})})},child:[NT]});var mc=({breadCrumbs:e})=>e.map((t,r)=>r===e.length-1?g`<a href="${t.url}" class="breadcrumbs__arrow">
                          <div class="breadcrumbs__arrow__start"></div>
                          <div class="breadcrumbs__arrow__end"></div>
                      </a>
                      <a class="breadcrumbs__link" href="${t.url}"
                          >${t.title}</a
                      >`:g`<a class="breadcrumbs__link" href="${t.url}"
                      >${t.title}</a
                  >`).join("");var dc=e=>{m.useMethodByName(lc)?.updateList(e??[])};m.useComponent([Ka,Za,OT,Qa,pc]);var $e=async({props:e})=>{let{source:t,title:r,breadCrumbs:o,rightSidebar:n}=e,{data:s}=await Lt({source:t});return dc(n??[]),g` <doc-container>
        <div>
            <html-content
                slot="docs"
                ${m.staticProps({data:s.data,useMaxWidth:!0})}
            ></html-content>
            <doc-title-small slot="section-title-small"
                ><div>
                    ${mc({breadCrumbs:o})}<span>${r}</span>
                </div></doc-title-small
            >
            <scroll-to name="${ei}" slot="section-links"></scroll-to>
            <doc-title slot="section-title">${r}</doc-title>
        </div>
    </doc-container>`};m.useComponent([Ka,Za,Qa,pc]);var oe=async({props:e})=>{let{source:t,title:r,breadCrumbs:o,rightSidebar:n}=e,{data:s}=await Lt({source:t});return dc(n??[]),g`<doc-container>
        <div>
            <html-content
                slot="docs"
                ${m.staticProps({data:s.data,useMaxWidth:!0})}
            ></html-content>
            <doc-title-small slot="section-title-small"
                ><div>
                    ${mc({breadCrumbs:o})}<span>${r}</span>
                </div></doc-title-small
            >
            <doc-title slot="section-title">${r}</doc-title>
        </div>
    </doc-container>`};var $T=({weakPathElement:e,weakScrollerElement:t,wrapElement:r,setActiveItem:o,weakScreenElement:n})=>{let s={ax:53,ay:70,bx:64,by:80,cx:89,cy:87,dx:100,dy:100,ex:0,ey:100,fx:10,fy:77,gx:17,gy:84},i={ax:-1,ay:-1,bx:1,by:1,cx:-1,cy:-1,dx:1,dy:1,ex:1,ey:1,fx:-1,fy:-1,gx:1,gy:1},a=z.createSequencer({data:{...s}});a.goTo({fy:90,ay:90,cy:70},{start:0,end:3.5}).goTo({gy:70,by:80},{start:2,end:5}).goTo({fy:90,ay:100,cy:90},{start:4,end:7.5}).goTo({ay:120,fy:80,cy:80},{start:7.5,end:10}).goTo({gy:100,by:100},{start:6,end:10}).add(()=>{o(1)},0).add(({direction:h,isForced:y})=>{y||h==="backward"||o(2)},1.5).add(({direction:h,isForced:y})=>{y||h==="backward"||o(3)},5.5).add(({direction:h,isForced:y})=>{y||h==="backward"||o(4)},9.5).add(({direction:h,isForced:y})=>{y||h==="forward"||o(1)},1.5).add(({direction:h,isForced:y})=>{y||h==="forward"||o(2)},5).add(({direction:h,isForced:y})=>{y||h==="forward"||o(3)},9),a.subscribe(({ax:h,ay:y,bx:b,by:T,cx:_,cy:S,dx:E,dy:C,ex:I,ey:M,fx:P,fy:k,gx:A,gy:R})=>{s.ax=h,s.ay=y,s.bx=b,s.by=T,s.cx=_,s.cy=S,s.dx=E,s.dy=C,s.ex=I,s.ey=M,s.fx=P,s.fy=k,s.gx=A,s.gy=R});let c=z.createTimeTween({data:{...i}});c.subscribe(({ax:h,ay:y,bx:b,by:T,cx:_,cy:S,dx:E,dy:C,ex:I,ey:M,fx:P,fy:k,gx:A,gy:R})=>{i.ax=h,i.ay=y,i.bx=b,i.by=T,i.cx=_,i.cy=S,i.dx=E,i.dy=C,i.ex=I,i.ey=M,i.fx=P,i.fy=k,i.gx=A,i.gy=R});let l=we.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(c,{ax:()=>Yt(-3,3),ay:()=>Yt(-3,3),bx:()=>Yt(-3,3),by:()=>Yt(-3,3),cx:()=>Yt(-3,3),cy:()=>Yt(-3,3),dx:()=>0,dy:()=>0,ex:()=>0,ey:()=>0,fx:()=>Yt(-3,3),fy:()=>Yt(-3,3),gx:()=>Yt(-3,3),gy:()=>Yt(-3,3)},{duration:3e3});l.play();let p=!0,d=()=>{if(!p)return;let h={x:s.ax+i.ax,y:s.ay+i.ay},y={x:s.bx+i.bx,y:s.by+i.by},b={x:s.cx+i.cx,y:s.cy+i.cy},T={x:s.dx+i.dx,y:s.dy+i.dy},_={x:s.ex+i.ex,y:s.ey+i.ey},S={x:s.fx+i.fx,y:s.fy+i.fy},E={x:s.gx+i.gx,y:s.gy+i.gy};e.deref()&&(e.deref().style.clipPath=`polygon(${h.x}% ${h.y}%, ${y.x}% ${y.y}%, ${b.x}% ${b.y}%, ${T.x}% ${T.y}%,${_.x}% ${_.y}%,${S.x}% ${S.y}%,${E.x}% ${E.y}%)`,u.useNextFrame(()=>d()))};u.useFrame(()=>d());let f=qe.createScrollTrigger({item:r,dynamicStart:{position:"right",value:()=>Fe(n?.deref()??document.createElement("div"))},dynamicEnd:{position:"right",value:()=>Fe(t?.deref()??document.createElement("div"))??0},reverse:!1,propierties:"tween",ease:!1,tween:a});return{pathScroller:f,pathSequencer:a,pathTween:c,pathTimeline:l,stopLoop:()=>{p=!1},destroy:()=>{f.destroy(),f=null,a.destroy(),a=null,c.destroy(),c=null,l.destroy(),l=null}}};var LT=({title_1:e,title_2:t})=>{let r=z.createScrollerTween({from:{x:0},to:{x:30}});r.subscribe(({x:i})=>{e.style.transform=`translate3d(0,0,0) translate(${i}px, 0px)`}),r.onStop(({x:i})=>{e.style.transform=`translate(${i}px, 0px)`});let o=qe.createParallax({item:e,propierties:"tween",tween:r,ease:!1,align:"start"}),n=z.createScrollerTween({from:{x:0},to:{x:-30}});n.subscribe(({x:i})=>{t.style.transform=`translate3d(0,0,0) translateX(${i}px)`}),n.onStop(({x:i})=>{t.style.transform=`translateX(${i}px)`});let s=qe.createParallax({item:t,propierties:"tween",tween:n,ease:!1,align:"start"});return{title1parallax:o,title2parallax:s,title1tween:r,title2tween:n}};var hc=({title:e})=>{let t=z.createScrollerTween({from:{x:0},to:{x:-60}});t.subscribe(({x:o})=>{e.deref()&&(e.deref().style.transform=`translate3d(0,0,0) translateX(${o}px)`)}),t.onStop(({x:o})=>{e.deref()&&(e.deref().style.transform=`translateX(${o}px)`)});let r=qe.createParallax({item:e.deref(),propierties:"tween",tween:t,ease:!1,align:"center"});return{sectionContentScroller:r,destroy:()=>{r.destroy(),r=null}}};var DT=({screenElement:e,scrollerElement:t,pathElement:r,wrapElement:o,title_1:n,title_2:s,section2_title:i,section3_title:a,section4_title:c,setActiveItem:l,onMove:p,onScrollEnd:d})=>{let f=new WeakRef(t),h=new WeakRef(i),y=new WeakRef(a),b=new WeakRef(c),T=new WeakRef(r),_=new WeakRef(e),{pathScroller:S,pathSequencer:E,pathTimeline:C,pathTween:I,stopLoop:M,destroy:P}=$T({weakPathElement:T,weakScrollerElement:f,wrapElement:o,setActiveItem:l,weakScreenElement:_}),{title1parallax:k,title2parallax:A,title1tween:R,title2tween:F}=LT({title_1:n,title_2:s}),{sectionContentScroller:$,destroy:w}=hc({title:h}),{sectionContentScroller:O,destroy:D}=hc({title:y}),{sectionContentScroller:x,destroy:N}=hc({title:b}),L=new Ct({screen:e,scroller:t,direction:"horizontal",drag:!0,easeType:"lerp",breakpoint:"small",useHorizontalScroll:!0,useSwipe:!1,revertSwipeDirection:!1,children:[S,k,A,$,O,x],onUpdate:({value:B})=>{p(B),d()}});return L.init(),setTimeout(()=>{L?.refresh?.()},500),{goTo:B=>{!B&&B!==0||L?.move?.(B).catch(()=>{})},destroy:()=>{L.destroy(),L=null,E.destroy(),S.destroy(),C.destroy(),I.destroy(),k.destroy(),A.destroy(),R.destroy(),F.destroy(),$.destroy(),O.destroy(),M(),P(),w(),D(),N()}}};var FT=({elements:e})=>{let t=z.createSpring({data:{x:0},stagger:{each:5}});return e.map(o=>o.querySelector("svg")).forEach(o=>{o&&(t.subscribe(({x:n})=>{o.style.transform=`translate3D(0,0,0) translateY(${-n}px)`}),t.onComplete(({x:n})=>{o.style.transform=`translateY(${-n}px)`}))}),{svgSpring:t,destroySvgSpring:()=>{t.destroy(),t=null}}};var si=()=>{},ni=e=>Promise.resolve(e),fc=()=>{},Ku={1:0,2:100/3,3:100/3*2,4:100},LM=({setRef:e,getState:t})=>{let{titleTop:r,titleBottom:o}=t().block_1;return g`
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
    `},DM=({setRef:e,getState:t})=>{let{title:r,copy:o}=t().block_2;return g`
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
    `},FM=({setRef:e,getState:t})=>{let{title:r,copy:o}=t().block_3;return g`
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
    `},BM=({setRef:e,getState:t})=>{let{title:r,items:o}=t().block_4;return g`
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
    `},VM=({proxi:e,delegateEvents:t,bindEffect:r})=>g`
        <ul class="l-about__nav">
            ${e.navItem.map(({index:o,label:n})=>g`
                        <li class="l-about__nav__item">
                            <button
                                class="l-about__nav__button"
                                ${t({click:()=>{si(Ku[o]),fc()}})}
                                ${r({toggleClass:{active:()=>e.activenavItem===o}})}
                            >
                                ${n}
                            </button>
                        </li>
                    `).join("")}
        </ul>
    `,WM=()=>g`
        <div class="l-about__square">
            <div class="l-about__square__legend"><h4>Scroll or Drag</h4></div>
            <span class="l-about__square__angle top-left"></span>
            <span class="l-about__square__angle top-right"></span>
            <span class="l-about__square__angle bottom-left"></span>
            <span class="l-about__square__angle bottom-right"></span>
        </div>
    `,BT=({onMount:e,setRef:t,getRef:r,getRefs:o,getState:n,bindEffect:s,delegateEvents:i,getProxi:a})=>{let c=a(),l=4,p=!1;return e(()=>{let{screenElement:d,scrollerElement:f,wrapElement:h,title_1:y,title_2:b,section2_title:T,section3_title:_,section4_title:S,pathElement:E}=r(),{svg:C}=o(),I=0,M=!1,P=0,{svgSpring:k,destroySvgSpring:A}=FT({elements:C});ni=async $=>{if(u.shouldMakeSomething()||p){k.stop(),p=!0,setTimeout(()=>{p=!1},2e3);return}let O=-Math.abs($/30);Number.isNaN(O)||await k.goTo({x:O}).catch(()=>{})},fc=()=>{ni(3e3),setTimeout(()=>{ni(0)},500)};let{destroy:R,goTo:F}=DT({screenElement:d,scrollerElement:f,pathElement:E,wrapElement:h,title_1:y,title_2:b,section2_title:T,section3_title:_,section4_title:S,setActiveItem:$=>{c.activenavItem=$},onMove:$=>{M||(I=$),M=!0,P=I-$,ni(P)},onScrollEnd:u.useDebounce(()=>{M=!1,P=0,ni(P)},500)});return si=F,c.isMounted=!0,()=>{si=()=>{},R(),A()}}),g`<div
        class="l-about"
        style="--number-of-section:${l}"
        ${s({toggleClass:{active:()=>c.isMounted}})}
    >
        <div class="l-about__sqaure-container">${WM()}</div>
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
                    ${LM({setRef:t,getState:n})}
                    ${DM({setRef:t,getState:n})}
                    ${FM({setRef:t,getState:n})}
                    ${BM({setRef:t,getState:n})}
                </div>
            </div>
        </div>
        <button
            type="button"
            class="l-about__prev"
            ${s({toggleAttribute:{disabled:()=>c.activenavItem==1}})}
            ${i({click:()=>{si(Ku[ce.clamp(c.activenavItem-1,1,4)]),fc()}})}
        ></button>
        ${VM({bindEffect:s,delegateEvents:i,proxi:c})}
        <button
            type="button"
            class="l-about__next"
            ${s({toggleAttribute:{disabled:()=>c.activenavItem==4}})}
            ${i({click:()=>{si(Ku[ce.clamp(c.activenavItem+1,1,4)]),fc()}})}
        ></button>
    </div>`};var VT=m.createComponent({tag:"about-component",component:BT,props:{block_1:()=>({value:{titleTop:"",titleBottom:""},type:"any"}),block_2:()=>({value:{title:"",copy:""},type:"any"}),block_3:()=>({value:{title:"",copy:""},type:"any"}),block_4:()=>({value:{title:"",items:[""]},type:"any"}),aboutSvg:()=>({value:"",type:String})},state:{navItem:()=>({value:[{index:1,label:"about"},{index:2,label:"why"},{index:3,label:"what"},{index:4,label:"inspiration"}],type:Array}),activenavItem:()=>({value:1,type:Number,transform:e=>ce.clamp(e,1,4)}),isMounted:()=>({value:!1,type:Boolean})}});m.useComponent([VT]);var WT=async()=>{let{data:e}=await Lt({source:"./data/about/index.json"}),{data:t}=await te({source:"./asset/svg/about.svg?v=0.1"});return g`<about-component
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
    </div> `};var gc=m.createComponent({tag:"benchmark-fake-component",component:jT,props:{counter:0,label:"",index:0},state:{isSelected:!1}});var gt=(e=1001)=>({state:{counter:()=>({value:0,type:Number}),data:()=>({value:[],type:Array,validate:t=>t.length<e,strict:!0,skipEqual:!1}),time:()=>({value:0,type:Number,transform:t=>Math.round(t),skipEqual:!1}),isLoading:()=>({value:!1,type:Boolean}),currentIndex:()=>({value:-1,type:Number})},child:[gc]});var Zu=e=>{for(let t=e.length-1;t>0;t--){let r=Math.floor(Math.random()*(t+1));[e[t],e[r]]=[e[r],e[t]]}return e},ii=e=>{let t=u.checkType(Number,e)?e:0;return[...Array.from({length:t}).keys()].map(r=>({label:`comp-${r+1}`}))},Qu=({proxi:e,value:t,useShuffle:r=!1})=>{e.isLoading=!0,u.useFrameIndex(()=>{u.useNextTick(async()=>{let o=performance.now();e.data=r?Zu(ii(t)):ii(t),await m.tick();let s=performance.now()-o;e.time=s,e.isLoading=!1})},2)},bt=({delegateEvents:e,setRef:t,getRef:r,bindEffect:o,proxi:n})=>g`
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
                ${e({keydown:s=>{if(s.keyCode===13){s.preventDefault();let i=Number(s.target?.value??0);Qu({proxi:n,value:i})}}})}
            />
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{let{input:s}=r(),i=Number(s?.value??0);Qu({proxi:n,value:i})}})}
            >
                Generate components
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{Qu({proxi:n,value:n.data.length,useShuffle:!0})}})}
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
            ${bt({setRef:i,getRef:a,proxi:d,delegateEvents:t,bindEffect:l})}

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
    </div>`};var zT=m.createComponent({tag:"benchmark-invalidate",component:HT,...gt()});var bc=(e=1e3)=>g`
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
            ${bt({setRef:o,getRef:n,delegateEvents:t,bindEffect:a,proxi:l})}

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
    </div>`};var GT=m.createComponent({tag:"benchmark-repeat-key",component:UT,...gt()});var qT=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindObject:a,bindEffect:c,getProxi:l})=>{let p=l();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
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
    </div>`};var JT=m.createComponent({tag:"benchmark-repeat-key-nested",component:qT,...gt(31)});var YT=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindEffect:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">Repeat ( without key ):</h3>
            <h2 class="benchmark__head__title">
                Generate components performance
            </h2>
            ${bc()}
            ${bt({setRef:o,getRef:n,delegateEvents:t,bindEffect:a,proxi:l})}

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
    </div>`};var XT=m.createComponent({tag:"benchmark-repeat-no-key",component:YT,...gt()});var Dt=u.createStore({data:()=>({value:[],type:Array,validate:e=>e.length<1001,strict:!0,skipEqual:!1}),counter:()=>({value:0,type:Number}),time:()=>({value:0,type:Number,transform:e=>Math.round(e),skipEqual:!1}),isLoading:()=>({value:!1,type:Boolean})});var ep=({value:e,useShuffle:t=!1})=>{Dt.set("isLoading",!0),u.useFrameIndex(()=>{u.useNextTick(async()=>{let r=performance.now();Dt.set("data",t?Zu(ii(e)):ii(e)),await m.tick();let n=performance.now()-r;Dt.set("time",n),Dt.set("isLoading",!1)})},2)},KT=({delegateEvents:e,setRef:t,getRef:r,getState:o,bindEffect:n})=>g`
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
                ${e({keydown:s=>{if(s.code.toLowerCase()==="enter"){s.preventDefault();let i=Number(s.target?.value??0);ep({value:i})}}})}
            />
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{let{input:s}=r(),i=Number(s?.value??0);ep({value:i})}})}
            >
                Generate components
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{let{data:s}=o();ep({value:s.length,useShuffle:!0})}})}
            >
                Shuffle array
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{Dt.update("counter",s=>s+1)}})}
            >
                Update counter
            </button>
        </div>
    `;var QT=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,getState:s,bindProps:i,repeat:a,bindEffect:c,getProxi:l})=>{let p=l();return e(()=>()=>{n()?.input.remove(),Dt.set("data",[]),Dt.set("time",0),Dt.set("counter",0)}),g`<div class="benchmark">
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
                                  ${i({observe:["counter"],props:({counter:h},y,b)=>({index:b,label:y.label,counter:h})})}
                                  ${d()}
                              >
                              </benchmark-fake-component>
                          `})}
        </div>
    </div>`};var ZT=m.createComponent({tag:"benchmark-repeat-no-key-bind-store",component:QT,bindStore:Dt,child:[gc]});var eS=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindObject:a,bindEffect:c,getProxi:l})=>{let p=l();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
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
    </div>`};var tS=m.createComponent({tag:"benchmark-repeat-key-no-nested",component:eS,...gt(31)});var vc=(e=1e3)=>g`
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
            ${vc(1e3)}
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
    </div>`};var oS=m.createComponent({tag:"benchmark-repeat-no-component-no-key",component:rS,...gt(1001)});var nS=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,repeat:s,bindEffect:i,bindObject:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat no component ( with key ):
            </h3>
            <h2 class="benchmark__head__title">
                Generate vanilla html performance
            </h2>
            ${vc(1e3)}
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
    </div>`};var sS=m.createComponent({tag:"benchmark-repeat-no-component-with-key",component:nS,...gt(1001)});m.useComponent([zT,XT,GT,JT,tS,ZT,oS,sS]);var Dr=async({props:e})=>{let{rootComponent:t}=e;return g`<div class="l-benchMark"><${t}></${t}></div>`};var xe=({active:e=!0,nextRoute:t="",prevRoute:r="",backRoute:o=""})=>{let n=m.useMethodByName(Qs);n.update("active",e),n.update("nextRoute",t),n.update("prevRoute",r),n.update("backRoute",o)};m.beforeRouteChange(()=>{let e=m.useMethodByName(Qs);e.update("active",!1),e.update("nextRoute",""),e.update("prevRoute",""),e.update("backRoute","")});var vt="rgba(255, 255, 255, 0)",yt=({disableOffcanvas:e})=>{let t="OffscreenCanvas"in globalThis&&!e;return{useOffscreen:t,context:t?"bitmaprenderer":"2d"}},Tt=({useOffscreen:e,canvas:t})=>{let r=e?new OffscreenCanvas(t.width,t.height):null,o=e?r?.getContext("2d"):null;return{offscreen:r,offScreenCtx:o}},St=({useOffscreen:e,offscreen:t,ctx:r})=>{if(e&&t&&r){let o=t.transferToImageBitmap();r.transferFromImageBitmap(o)}},Jn=e=>"roundRect"in e;var vo=({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:n,gutter:s})=>{let i={row:0,col:-1,items:[]};return[...Array.from({length:t*r+t}).keys()].reduce(a=>{let{row:c,col:l,items:p}=a,d=l<r?l+1:0,f=d===0?c+1:c,h=(o+s)*d,y=(n+s)*f;return{row:f,col:d,items:[...p,{width:o,height:n,x:h,y,centerX:h+o/2,centerY:y+n/2,offsetXCenter:jM({canvasWidth:e.width,width:o,gutter:s,numberOfColumn:r}),offsetYCenter:HM({canvasHeight:e.height,height:n,gutter:s,numberOfRow:t}),gutter:s,numberOfColumn:r}]}},i)},jM=({canvasWidth:e,width:t,gutter:r,numberOfColumn:o})=>e/2-(t+r)*o/2,HM=({canvasHeight:e,height:t,gutter:r,numberOfRow:o})=>e/2-(t+r)*(o+1)/2;var Z=u.createStore({activeNavigationSection:()=>({value:"",type:String,skipEqual:!1}),navigationIsOpen:()=>({value:!1,type:Boolean})});Z.set("activeNavigationSection","");var tp=({canvas:e,numberOfRow:t,numberOfColumn:r,fill:o,disableOffcanvas:n,stagger:s,reorder:i})=>{let a=window.innerHeight>=700?window.innerHeight/18:window.innerHeight/20,c=window.innerHeight>=700?window.innerHeight/18:window.innerHeight/20,l=1,{useOffscreen:p,context:d}=yt({disableOffcanvas:n}),f=!0,h=e.getContext(d,{alpha:!0}),y=m.getActiveRoute(),{offscreen:b,offScreenCtx:T}=Tt({useOffscreen:p,canvas:e}),_=p?T:h,S=Jn(_);_=null,e.width=e.clientWidth,e.height=e.clientHeight;let E=vo({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:a,cellHeight:c,gutter:l}).items,C=i?E.map((R,F)=>({...R,scale:1,rotate:0,hasFill:o.includes(F)})).toSorted(R=>R.hasFill?-1:1).toReversed():E.map((R,F)=>{let $=o.includes(F);return{...R,scale:1,rotate:0,hasFill:$}}),I=z.createTimeTween({ease:"easeInOutQuad",stagger:s,data:{scale:1,rotate:0}});C.forEach(R=>{I.subscribeCache(R,({scale:F,rotate:$})=>{R.rotate=$,R.scale=F})});let M=()=>{if(!h)return;p&&b&&(b.width=e.width,b.height=e.height);let R=p?T:h;R&&(e.width=e.width,C.forEach(({x:F,y:$,width:w,height:O,rotate:D,scale:x,hasFill:N,offsetXCenter:L,offsetYCenter:B})=>{let j=Math.PI/180*D,X=Math.cos(j)*x,ue=Math.sin(j)*x;R.setTransform(X,ue,-ue,X,Math.floor(L+F),Math.floor(B+$)),S?(R.beginPath(),R.roundRect(Math.floor(-w/2),Math.floor(-O/2),w,O,5)):(R.beginPath(),R.rect(Math.floor(-w/2),Math.floor(-O/2),w,O)),N?(R.fillStyle="#000000",R.fill()):(R.strokeStyle="#000",R.fillStyle="rgba(238, 238, 238, 0.9)",R.stroke(),R.fill()),R.setTransform(1,0,0,1,0,0)}),St({useOffscreen:p,offscreen:b,ctx:h}))},P=we.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).label({name:"label1"}).goTo(I,{scale:1.5,rotate:90},{duration:1e3}).goTo(I,{scale:.5},{duration:500}).goTo(I,{rotate:180,scale:1.2},{duration:500}).goTo(I,{scale:1.3},{duration:500}).goTo(I,{scale:1},{duration:1200});P.onLoopEnd(({direction:R,loop:F})=>{console.log(`loop end: ${R}, ${F}`)}),P.play();let k=()=>{M(),f&&u.useNextFrame(()=>k())};u.useFrame(()=>{k()});let A=Z.watch("navigationIsOpen",R=>{if(R){P?.pause(),f=!1;return}setTimeout(async()=>{f=!0,m.getActiveRoute().route===y.route&&(P?.resume(),u.useFrame(()=>k()))},500)});return()=>{I.destroy(),P.destroy(),A(),I=null,P=null,h=null,b=null,T=null,E=[],f=!1,C=null,d=null}};var iS=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s})=>{let i=s();document.body.style.background=vt;let a=()=>{};return e(()=>{let{canvas:c}=o();a=tp({canvas:c,...t()});let l=u.useResize(()=>{a(),a=tp({canvas:c,...t()})});return u.useFrame(()=>{i.isMounted=!0}),()=>{a(),l(),document.body.style.background=""}}),g`
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
    `};var aS=m.createComponent({tag:"animatedpattern-n0",component:iS,props:{background:()=>({value:"",type:String}),numberOfRow:()=>({value:10,type:Number}),numberOfColumn:()=>({value:10,type:Number}),fill:()=>({value:[16,27,38,49,60,71,82,93],type:Array}),stagger:()=>({value:{each:5,grid:{col:11,row:11,direction:"row"},waitComplete:!1},type:"any"}),reorder:()=>({value:!0,type:Boolean}),disableOffcanvas:()=>({value:!!(ht()||dt()),type:Boolean})},state:{isMounted:!1}});var rp=[{animation:{},description:"<strong>Canvas</strong>: AsyncTimeline - Animated pattern v0",nav:{prevRoute:"#async-timeline",nextRoute:"#animatedPatternN0?version=1&activeId=1",backRoute:"#canvas-overview"}},{animation:{fill:[0,13,20,45,65,71,72,73,74,75,76,77,83,92,96,113,117,134,138,155,156,157,158,159,189,209],numberOfColumn:20,numberOfRow:10,stagger:{each:2,from:"random",waitComplete:!1},reorder:!1},nav:{prevRoute:"#animatedPatternN0?version=0&activeId=0",nextRoute:"#animatedPatternN0?version=2&activeId=2",backRoute:"#canvas-overview"}},{animation:{fill:[0,13,20,45,65,71,72,73,74,75,76,77,83,92,96,113,117,134,138,155,156,157,158,159,189,209],numberOfColumn:10,numberOfRow:10,stagger:{each:10,from:"edges",waitComplete:!1},reorder:!1},nav:{prevRoute:"#animatedPatternN0?version=1&activeId=1",nextRoute:"#animatedPatternN0?version=3&activeId=3",backRoute:"#canvas-overview"}},{animation:{fill:[],numberOfColumn:8,numberOfRow:9,stagger:{each:20,from:{x:4,y:4},grid:{col:9,row:9,direction:"radial"},waitComplete:!1},reorder:!1},nav:{prevRoute:"#animatedPatternN0?version=2&activeId=2",nextRoute:"#animatedPatternN1",backRoute:"#canvas-overview"}}];m.useComponent([aS]);var cS=async({params:e})=>{let{version:t}=e,{data:r}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"}),o=rp[Math.max(0,Math.min(Number(t),rp.length-1))];return o?(xe({active:!0,prevRoute:o.nav.prevRoute,nextRoute:o.nav.nextRoute,backRoute:o.nav.backRoute}),g`<div class="l-padding">
        <animatedpattern-n0
            ${m.staticProps({...o.animation,background:r})}
        ></animatedpattern-n0>
    </div>`):""};var op=({canvas:e,disableOffcanvas:t})=>{let r=window.innerHeight>=700?window.innerHeight/16:window.innerHeight/20,o=window.innerHeight>=700?window.innerHeight/16:window.innerHeight/20,n=7,s=15,i=window.innerHeight/150,a=[2,18,10,27,21,22,23,24,25,25,26,37,42,53,58,69,74,85,86,87,88,89,90,44,60,65,98,108],{useOffscreen:c,context:l}=yt({disableOffcanvas:t}),p=!0,{top:d,left:f}=fe(e),h=e.getContext(l,{alpha:!0}),y=m.getActiveRoute(),{offscreen:b,offScreenCtx:T}=Tt({useOffscreen:c,canvas:e});e.width=e.clientWidth,e.height=e.clientHeight;let _=vo({canvas:e,numberOfRow:n,numberOfColumn:s,cellWidth:r,cellHeight:o,gutter:i}).items,S=_.map(($,w)=>({...$,scale:0,mouseX:0,mouseY:0,hasFill:a.includes(w)})).toSorted($=>$.hasFill?-1:1),E=z.createLerp({data:{mouseX:0,mouseY:0}});S.forEach($=>{E.subscribeCache($,({mouseX:w,mouseY:O})=>{$.mouseX=w,$.mouseY=O})});let C=z.createTimeTween({ease:"easeInOutSine",stagger:{each:5,from:"center",waitComplete:!1},data:{scale:0}});S.forEach($=>{C.subscribeCache($,({scale:w})=>{$.scale=w})});let I=()=>{if(!h)return;c&&b&&(b.width=e.width,b.height=e.height);let $=c?T:h;$&&(e.width=e.width,S.forEach(({x:w,y:O,width:D,height:x,mouseX:N,mouseY:L,scale:B,hasFill:j,offsetXCenter:X,offsetYCenter:ue})=>{if(!j)return;let ye=N-(e.width-(D+i)*s)/2,ee=L-(e.height-(x+i)*n)/2,pe=(w-ye)/250,he=(O-ee)/250,be=Math.sqrt(Math.pow(Math.abs(pe),2)+Math.pow(Math.abs(he),2)),Ie=ce.clamp(Math.abs(be),0,2),De=0,q=Math.cos(De)*(Ie+B),Te=Math.sin(De)*(Ie+B);$.setTransform(q,Te,-Te,q,Math.floor(X+w),Math.floor(ue+O)),$.beginPath(),$.rect(Math.floor(-D/2),Math.floor(-x/2),D,x),$.fillStyle="#000000",$.fill(),$.setTransform(1,0,0,1,0,0)}),$.globalCompositeOperation="destination-out",S.forEach(({x:w,y:O,width:D,height:x,mouseX:N,mouseY:L,scale:B,hasFill:j,offsetXCenter:X,offsetYCenter:ue})=>{if(j)return;let ye=N-(e.width-(D+i)*s)/2,ee=L-(e.height-(x+i)*n)/2,pe=(w-ye)/250,he=(O-ee)/250,be=Math.sqrt(Math.pow(Math.abs(pe),2)+Math.pow(Math.abs(he),2)),Ie=ce.clamp(Math.abs(be),0,2),De=0,q=Math.cos(De)*(Ie+B),Te=Math.sin(De)*(Ie+B);$.setTransform(q,Te,-Te,q,Math.floor(X+w),Math.floor(ue+O)),$.beginPath(),$.rect(Math.floor(-D/2),Math.floor(-x/2),D,x),$.fill(),$.setTransform(1,0,0,1,0,0)}),St({useOffscreen:c,offscreen:b,ctx:h}))},M=we.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(C,{scale:.3},{duration:1e3});M.play();let P=({x:$,y:w})=>{E.goTo({mouseX:$-f,mouseY:w-d}).catch(()=>{})},k=u.useMouseMove(({client:$})=>{let{x:w,y:O}=$;P({x:w,y:O})}),A=u.useTouchMove(({client:$})=>{let{x:w,y:O}=$;P({x:w,y:O})}),R=()=>{I(),p&&u.useNextFrame(()=>R())};u.useFrame(()=>{R()});let F=Z.watch("navigationIsOpen",$=>{if($){M?.stop(),p=!1;return}setTimeout(async()=>{p=!0,m.getActiveRoute().route===y.route&&(M?.play(),u.useFrame(()=>R()))},500)});return()=>{C.destroy(),M.destroy(),E.destroy(),k(),A(),F(),C=null,M=null,E=null,h=null,b=null,T=null,_=[],p=!1,S=null,l=null}};var lS=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s})=>{let i=s();document.body.style.background=vt;let a=()=>{};return e(()=>{let{canvas:c}=o();a=op({canvas:c,...t()});let l=u.useResize(()=>{a(),a=op({canvas:c,...t()})});return u.useFrame(()=>{i.isMounted=!0}),()=>{document.body.style.background="",l(),a()}}),g`
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
    `};var uS=m.createComponent({tag:"animatedpattern-n1",component:lS,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!!(ht()||dt()),type:Boolean})},state:{isMounted:!1}});m.useComponent([uS]);var pS=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"#animatedPatternN0?version=3&activeId=3",nextRoute:"#scrollerN0?version=0&activeId=0",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <animatedpattern-n1
            ${m.staticProps({background:e})}
        ></animatedpattern-n1>
    </div>`};var mS=({canvas:e,numItems:t,width:r,height:o,fill:n,opacity:s,radius:i,rotationDuration:a,rotationEach:c,centerEach:l,disableOffcanvas:p})=>{let{useOffscreen:d,context:f}=yt({disableOffcanvas:p}),h=!0,y=e.getContext(f,{alpha:!0}),{top:b,left:T}=fe(e),_=m.getActiveRoute(),{offscreen:S,offScreenCtx:E}=Tt({useOffscreen:d,canvas:e}),C=!0;e.width=e.clientWidth,e.height=e.clientHeight;let I=[...Array.from({length:t}).keys()].map((x,N)=>{let L=N>=t/2?t/2+(t/2-N):N,B=n.includes(N)?1:L*s;return{width:L*r,height:L*o,x:0,y:0,hasFill:n.includes(N),opacity:B,radius:i,rotate:0,relativeIndex:L}}),M=z.createTimeTween({data:{rotate:0},stagger:{each:c,from:"center"},ease:"easeLinear",relative:!0});[...I].forEach(x=>{M.subscribeCache(x,({rotate:N})=>{x.rotate=N})});let P=z.createSpring({data:{x:0,y:0},stagger:{each:l,from:"end"}});[...I].forEach(x=>{P.subscribeCache(x,({x:N,y:L})=>{x.x=N,x.y=L})});let k=()=>{if(!y)return;d&&S&&(S.width=e.width,S.height=e.height);let x=d?E:y;x&&(e.width=e.width,I.forEach(({width:N,height:L,x:B,y:j,rotate:X,hasFill:ue,opacity:ye},ee)=>{let pe=I.length-ee,he=e.width/2,be=e.height/2,Ie=1,De=Math.PI/180*X,q=Math.cos(De)*Ie,Te=Math.sin(De)*Ie;x.setTransform(q,Te,-Te,q,he+B+pe*B/20,be+j+pe*j/20),C?(x.beginPath(),x.roundRect(Math.round(-N/2),Math.round(-L/2),N,L,[40,40])):(x.beginPath(),x.rect(Math.round(-N/2),Math.round(-L/2),N,L)),ue?x.fillStyle="#000":(x.strokeStyle="#000",x.fillStyle=`rgba(238, 238, 238, ${ye})`,x.stroke()),x.fill(),x.setTransform(1,0,0,1,0,0)}),St({useOffscreen:d,offscreen:S,ctx:y}))},A=we.createAsyncTimeline({repeat:-1,yoyo:!1,autoSet:!1});A.goTo(M,{rotate:360},{duration:a}),A.play();let R=()=>{k(),h&&u.useNextFrame(()=>R())};u.useFrame(()=>R());let F=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,b=fe(e).top,T=fe(e).left,k()}),$=({x,y:N})=>{let L=window.innerWidth,B=window.innerHeight,j=x-e.width/2-T,X=N-e.height/2-b;P.goTo({x:ce.clamp(j,-L/2+400+T,L/2-400-T),y:ce.clamp(X,-B/2+200+b,B/2-200-b)}).catch(()=>{})},w=u.useMouseMove(({client:x})=>{let{x:N,y:L}=x;$({x:N,y:L})}),O=u.useTouchMove(({client:x})=>{let{x:N,y:L}=x;$({x:N,y:L})}),D=Z.watch("navigationIsOpen",x=>{if(x){h=!1,A?.pause(),M?.pause(),P?.pause();return}setTimeout(()=>{h=!0,m.getActiveRoute().route===_.route&&(A?.resume(),M?.resume(),P?.resume(),u.useFrame(()=>R()))},500)});return()=>{M.destroy(),P.destroy(),A.destroy(),F(),w(),O(),D(),M=null,P=null,A=null,y=null,S=null,E=null,h=!1,I=null,f=null}};var dS=({onMount:e,getState:t,getRef:r,setRef:o,bindEffect:n,getProxi:s})=>{let i=s();return document.body.style.background=vt,e(()=>{let{canvas:a}=r(),c=mS({canvas:a,...t()});return u.useFrame(()=>{i.isMounted=!0}),()=>{c(),document.body.style.background=""}}),g`
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
    `};var hS=m.createComponent({tag:"caterpillar-n1",component:dS,props:{background:"",numItems:20,width:window.innerHeight/30,height:window.innerHeight/30,fill:[14],opacity:1,radius:0,rotationEach:15,centerEach:3,rotationDuration:5e3,disableOffcanvas:()=>({value:!!(ht()||dt()),type:Boolean})},state:{isMounted:!1}});m.useComponent([hS]);var fS=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"",nextRoute:"#caterpillarN2",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <caterpillar-n1 ${m.staticProps({background:e})}>
        </caterpillar-n1>
    </div>`};var np=({value:e,direction:t,isForced:r})=>{r||console.log(`current: ${e}, direction: ${t}`)},gS=({canvas:e,numItems:t,width:r,height:o,radius:n,fill:s,opacity:i,xAmplitude:a,yAmplitude:c,duration:l,friction:p,rotationDefault:d,disableOffcanvas:f})=>{let{useOffscreen:h,context:y}=yt({disableOffcanvas:f}),b=!0,T=e.getContext(y,{alpha:!0}),_=d,S=m.getActiveRoute(),{offscreen:E,offScreenCtx:C}=Tt({useOffscreen:h,canvas:e}),I=!0,M=[...Array.from({length:t}).keys()].map((w,O)=>{let D=O>=t/2?t/2+(t/2-O):O,x=r+r/3*D,N=o+o/3*D,L=s.includes(O)?1:(t-O)*i;return{width:x,height:N,x:0,y:0,hasFill:s.includes(O),opacity:L,radius:n,rotate:0}});e.width=e.clientWidth,e.height=e.clientHeight;let P=z.createSequencer({stagger:{each:7},data:{x:l/4,rotate:0},duration:l}).goTo({x:l+l/4},{start:0,end:l,ease:"easeLinear"}).goTo({rotate:()=>-_},{start:0,end:5,ease:"easeInOutBack"}).goTo({rotate:0},{start:5,end:l,ease:"easeInOutBack"}).label("mylabel",2).add(({isForced:w,direction:O})=>{np({isForced:w,direction:O,value:1})},1).add(({isForced:w,direction:O})=>{np({isForced:w,direction:O,value:5})},5).add(({isForced:w,direction:O})=>{np({isForced:w,direction:O,value:9})},9);M.forEach(w=>{P.subscribeCache(w,({x:O,rotate:D})=>{let x=O/p,N=2/(3-Math.cos(2*x)),L=N*Math.cos(x)*a,B=N*Math.sin(2*x)/2*c;w.x=L,w.y=B,w.rotate=D})});let k=we.createSyncTimeline({repeat:-1,yoyo:!1,duration:4e3}).add(P);k.onLoopEnd(({loop:w,direction:O})=>{console.log(`loop end: ${w} , ${O}`)});let A=()=>{if(!T)return;h&&E&&(E.width=e.width,E.height=e.height);let w=h?C:T;w&&(e.width=e.width,M.forEach(({width:O,height:D,x,y:N,rotate:L,hasFill:B,opacity:j})=>{let X=e.width/2,ue=e.height/2,ye=1,ee=Math.PI/180*L,pe=Math.cos(ee)*ye,he=Math.sin(ee)*ye;w.setTransform(pe,he,-he,pe,X+x,ue+N),I?(w.beginPath(),w.roundRect(Math.round(-O/2),Math.round(-D/2),O,D,[40,40])):(w.beginPath(),w.rect(Math.round(-O/2),Math.round(-D/2),O,D)),B?w.fillStyle="#000000":(w.strokeStyle=`rgba(0, 0, 0, ${j})`,w.fillStyle="rgba(238, 238, 238, 0)",w.stroke()),w.fill(),w.setTransform(1,0,0,1,0,0)}),St({useOffscreen:h,offscreen:E,ctx:T}))},R=()=>{A(),b&&u.useNextFrame(()=>R())};u.useFrame(()=>R()),k.play();let F=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,A()}),$=Z.watch("navigationIsOpen",w=>{if(w){b=!1,k?.pause();return}setTimeout(()=>{b=!0,m.getActiveRoute().route===S.route&&(k?.resume(),u.useFrame(()=>R()))},500)});return{destroy:()=>{b=!1,F(),$(),P.destroy(),P=null,k.destroy(),k=null,T=null,E=null,C=null,M=null,y=null},play:()=>{k.play()},playReverse:()=>{k.playReverse()},playUseCurrent:()=>{k.play({useCurrent:!0})},playReverseUseCurrent:()=>{k.playReverse({useCurrent:!0})},playFromLabel:()=>{k.playFrom("mylabel")},plaFromLabelReverse:()=>{k.playFromReverse("mylabel")},stop:()=>k.stop(),pause:()=>k.pause(),resume:()=>k.resume(),reverse:()=>k.reverse(),setRotation:w=>_=w}};function zM({buttons:e}){return Object.entries(e).map(([t,r])=>{let{label:o}=r;return g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn ${t}"
                >
                    ${o}
                </button>
            </li>`}).join("")}var bS=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s,delegateEvents:i})=>{let a=s();return document.body.style.background=vt,e(({element:c})=>{let{canvas:l,rangeValue:p,rotationButton:d}=o(),f=gS({canvas:l,...t()}),{destroy:h,setRotation:y}=f;return Object.entries(a.buttons).forEach(([b,T])=>{let{method:_}=T;c.querySelector(`.${b}`)?.addEventListener("click",()=>f?.[_]())}),d.addEventListener("change",()=>{let b=d.value;y(Number(b)),p.textContent=b}),u.useFrame(()=>{a.isMounted=!0}),()=>{document.body.style.background="",h()}}),g`
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
                        ${zM({buttons:a.buttons})}
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
    `};var UM=10,GM={"js-CN2-play":{label:"play",method:"play"},"js-CN2-playReverse":{label:"play reverse",method:"playReverse"},"js-CN2-play-current":{label:"go forward if is backward",method:"playUseCurrent"},"js-CN2-playReverse-current":{label:"go backward if is forward",method:"playReverseUseCurrent"},"js-CN2-play-label":{label:"play from label",method:"playFromLabel"},"js-CN2-playReverse-label":{label:"play from label reverse",method:"plaFromLabelReverse"},"js-CN2-reverse":{label:"reverse",method:"reverse"},"js-CN2-stop":{label:"stop",method:"stop"},"js-CN2-pause":{label:"pause",method:"pause"},"js-CN2-resume":{label:"resume",method:"resume"}},vS=m.createComponent({tag:"caterpillar-n2",component:bS,props:{background:"",numItems:20,width:window.innerHeight/13,height:window.innerHeight/13,radius:0,fill:[2],opacity:.03,xAmplitude:500,yAmplitude:400,duration:10,rotationDefault:166,friction:UM/2/Math.PI,disableOffcanvas:()=>({value:!!(ht()||dt()),type:Boolean})},state:{isMounted:!1,controlsActive:()=>({value:!1,type:Boolean}),buttons:()=>({value:GM,type:"Any"})}});m.useComponent([vS]);var yS=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"#caterpillarN1",nextRoute:"#async-timeline",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <caterpillar-n2
            ${m.staticProps({background:e})}
        ></caterpillar-n2>
    </div>`};var yc=()=>{m.useMethodByName(Zs).update(!0)},Tc=()=>{m.useMethodByName(Zs).update(!1)};var sp=({canvas:e,canvasScroller:t,numberOfRow:r,numberOfColumn:o,fill:n,stagger:s,reorder:i,disableOffcanvas:a})=>{let c=window.innerHeight>=700?window.innerHeight/16:window.innerHeight/20,l=window.innerHeight>=700?window.innerHeight/16:window.innerHeight/20,p=1,{useOffscreen:d,context:f}=yt({disableOffcanvas:a}),h=!0,y=z.createMasterSequencer(),b=e.getContext(f,{alpha:!0}),T=m.getActiveRoute(),{offscreen:_,offScreenCtx:S}=Tt({useOffscreen:d,canvas:e}),E=d?S:b,C=Jn(E);E=null,e.width=e.clientWidth,e.height=e.clientHeight;let I=vo({canvas:e,numberOfRow:r,numberOfColumn:o,cellWidth:c,cellHeight:l,gutter:p}).items,M=i?I.map((w,O)=>({...w,scale:0,rotate:0,hasFill:n.includes(O)})).toSorted(w=>w.hasFill?-1:1):I.map((w,O)=>({...w,scale:0,rotate:0,hasFill:n.includes(O)})),P=z.createStaggers({items:M,stagger:s}),k=P.map(({item:w,start:O,end:D})=>{let x=w.hasFill?1.1:1,N=z.createSequencer({data:{scale:0}}).goTo({scale:x},{start:O,end:D,ease:"easeInOutQuad"}),L=N.subscribe(({scale:B})=>{w.scale=B});return y.add(N),{sequencer:N,unsubscribe:L}}),A=()=>{if(!b)return;d&&_&&(_.width=e.width,_.height=e.height);let w=d?S:b;w&&(e.width=e.width,M.forEach(({x:O,y:D,width:x,height:N,rotate:L,scale:B,hasFill:j,offsetXCenter:X,offsetYCenter:ue})=>{let ye=Math.PI/180*L,ee=Math.cos(ye)*B,pe=Math.sin(ye)*B;w.setTransform(ee,pe,-pe,ee,Math.floor(X+O),Math.floor(ue+D)),C?(w.beginPath(),w.roundRect(Math.floor(-x/2),Math.floor(-N/2),x,N,5)):(w.beginPath(),w.rect(Math.floor(-x/2),Math.floor(-N/2),x,N)),j?(w.fillStyle="#000000",w.fill()):(w.strokeStyle="#000",w.fillStyle="rgb(238, 238, 238)",w.fill(),C||(w.strokeStyle="#ccc")),w.setTransform(1,0,0,1,0,0)}),St({useOffscreen:d,offscreen:_,ctx:b}))},R=qe.createScrollTrigger({trigger:t,propierties:"tween",tween:y,dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>ne(t)},reverse:!0,ease:!0,easeType:"lerp"});R.init();let F=()=>{A(),h&&u.useNextFrame(()=>F())};u.useFrame(()=>{F()});let $=Z.watch("navigationIsOpen",w=>{if(w){h=!1;return}setTimeout(async()=>{h=!0,m.getActiveRoute().route===T.route&&u.useFrame(()=>F())},500)});return()=>{$(),k.forEach(({sequencer:w,unsubscribe:O})=>{w.destroy(),O()}),k=[],y.destroy(),y=null,P=[],R.destroy(),R=null,b=null,_=null,S=null,I=[],h=!1,M=null,f=null}};var TS=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s})=>{let i=s();document.body.style.background=vt;let a=()=>{};return e(()=>{yc();let{canvas:c,canvasScroller:l}=o();window.scrollTo(0,0),a=sp({canvas:c,canvasScroller:l,...t()});let p=u.useResize(()=>{a(),a=sp({canvas:c,canvasScroller:l,...t()})});return u.useFrame(()=>{i.isMounted=!0}),()=>{a(),p(),Tc(),document.body.style.background=""}}),g`
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
    `};var SS=m.createComponent({tag:"scroller-n0",component:TS,props:{background:()=>({value:"",type:String}),numberOfRow:()=>({value:10,type:Number}),numberOfColumn:()=>({value:10,type:Number}),fill:()=>({value:[36,37,38,39,40,47,51,58,62,69,73,80,81,82,83,84],type:Array}),stagger:()=>({value:{type:"equal",each:6,from:"random"},type:"Any"}),reorder:()=>({value:!0,type:Boolean}),disableOffcanvas:()=>({value:!!(ht()||dt()),type:Boolean})},state:{isMounted:!1}});var ip=[{animation:{},nav:{prevRoute:"#animatedPatternN1",nextRoute:"#scrollerN0?version=1&activeId=1",backRoute:"#canvas-overview"}},{animation:{stagger:{type:"end",each:1,from:{x:0,y:0},grid:{col:11,row:10,direction:"radial"}},reorder:!1},nav:{prevRoute:"#scrollerN0?version=0&activeId=0",nextRoute:"#scrollerN0?version=2&activeId=2",backRoute:"#canvas-overview"}},{animation:{stagger:{type:"equal",each:7,from:"center",grid:{col:11,row:10,direction:"col"}},reorder:!1},nav:{prevRoute:"#scrollerN0?version=1&activeId=1",nextRoute:"#scrollerN0?version=3&activeId=3",backRoute:"#canvas-overview"}},{animation:{stagger:{type:"equal",each:3,from:"end",grid:{col:11,row:10,direction:"row"}},reorder:!1},nav:{prevRoute:"#scrollerN0?version=2&activeId=2",nextRoute:"#scrollerN0?version=4&activeId=4",backRoute:"#canvas-overview"}},{animation:{stagger:{type:"equal",each:2,from:"end"},reorder:!1},nav:{prevRoute:"#scrollerN0?version=3&activeId=3",nextRoute:"#scrollerN1",backRoute:"#canvas-overview"}}];m.useComponent([SS]);var _S=async({params:e})=>{let{version:t}=e,{data:r}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"}),o=ip[Math.max(0,Math.min(Number(t),ip.length-1))];return o?(xe({active:!0,prevRoute:o.nav.prevRoute,nextRoute:o.nav.nextRoute,backRoute:o.nav.backRoute}),g`<div>
        <scroller-n0
            ${m.staticProps({...o.animation,background:r})}
        ></scroller-n0>
    </div>`):""};function qM({width:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}function JM({height:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}var xS=({canvas:e,canvasScroller:t,amountOfPath:r,width:o,height:n,opacity:s,intialRotation:i,endRotation:a,disableOffcanvas:c})=>{let{useOffscreen:l,context:p}=yt({disableOffcanvas:c}),d=!0,f=e.getContext(p,{alpha:!0}),h=m.getActiveRoute(),{offscreen:y,offScreenCtx:b}=Tt({useOffscreen:l,canvas:e}),T=!1;e.width=e.clientWidth,e.height=e.clientHeight;let _=[...Array.from({length:r}).keys()].map((k,A)=>{let R=A>=r/2?r/2+(r/2-A):A;return{width:Math.floor(qM({width:o,relativeIndex:R,amountOfPath:r})),height:Math.floor(JM({height:n,relativeIndex:R,amountOfPath:r})),opacity:R*s,rotate:0,relativeIndex:R,index:A}}),S=z.createScrollerTween({from:{rotate:0},to:{rotate:a},stagger:{each:5,from:"center"}});[..._].forEach(k=>{S.subscribeCache(k,({rotate:A})=>{k.rotate=A})});let E=()=>{if(!f)return;l&&y&&(y.width=e.width,y.height=e.height);let k=l?b:f;if(!k)return;let A=e.width/2,R=e.height/2;e.width=e.width,_.forEach(({width:F,height:$,opacity:w,rotate:O,index:D})=>{let x=_.length/2-D,N=1,L=Math.PI/180*(O-i),B=Math.cos(L)*N,j=Math.sin(L)*N;k.setTransform(B,j,-j,B,A,R+x*19),T?(k.beginPath(),k.roundRect(-F/2,-$/2+x*19,F,$,150)):(k.beginPath(),k.rect(Math.round(-F/2),Math.round(-$/2),F,$)),k.strokeStyle="#000",k.fillStyle=`rgba(238, 238, 238, ${w})`,k.stroke(),k.fill(),k.setTransform(1,0,0,1,0,0)}),St({useOffscreen:l,offscreen:y,ctx:f})},C=qe.createScrollTrigger({trigger:t,propierties:"tween",tween:S,dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>ne(t)},ease:!0,easeType:"spring"});C.init();let I=()=>{E(),d&&u.useNextFrame(()=>I())};u.useFrame(()=>{I()});let M=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,u.useFrame(()=>{E()})}),P=Z.watch("navigationIsOpen",k=>{if(k){d=!1;return}setTimeout(()=>{d=!0,m.getActiveRoute().route===h.route&&u.useFrame(()=>I())},500)});return()=>{S.destroy(),M(),P(),S.destroy(),S=null,C.destroy(),C=null,f=null,y=null,b=null,S=null,d=!1,_=null,p=null}};var CS=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s})=>{let i=s();return document.body.style.background=vt,e(()=>{yc();let{canvas:a,canvasScroller:c}=o(),l=xS({canvas:a,canvasScroller:c,...t()});return u.useFrame(()=>{i.isMounted=!0}),()=>{l(),Tc(),document.body.style.background=""}}),g`
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
    `};var ES=m.createComponent({tag:"scroller-n1",component:CS,props:{background:"",amountOfPath:17,width:15,height:40,radius:0,opacity:.05,intialRotation:33,endRotation:720,disableOffcanvas:()=>({value:!!(ht()||dt()),type:Boolean})},state:{isMounted:!1}});m.useComponent([ES]);var wS=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"#scrollerN0?version=4&activeId=4",nextRoute:"",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <scroller-n1 ${m.staticProps({background:e})}></scroller-n1>
    </div>`};var IS=({getProxi:e,bindEffect:t})=>{let r=e();return g`
        <button
            type="button"
            class="c-dynamic-list-button"
            ${t({observe:"active",toggleClass:{active:()=>r.active}})}
        >
            ${r.label}
        </button>
    `};var Yn=m.createComponent({tag:"dynamic-list-button",component:IS,props:{label:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean})}});var Sc=[{key:"a",label:"A"},{key:"b",label:"B"},{key:"c",label:"C"},{key:"d",label:"D"}],MS=[{key:"f",label:"F"},{key:"b",label:"B"},{key:"e",label:"E"},{key:"c",label:"C"},{key:"b",label:"B"},{key:"a",label:"A"},{key:"g",label:"G"},{key:"h",label:"H"},{key:"d",label:"D"},{key:"b",label:"B"}],kS=[{key:"m",label:"M"},{key:"q",label:"Q"},{key:"z",label:"Z"},{key:"i",label:"I"},{key:"b",label:"B"},{key:"e",label:"E"},{key:"n",label:"N"},{key:"a",label:"A"},{key:"g",label:"G"},{key:"h",label:"H"},{key:"l",label:"L"},{key:"j",label:"J"},{key:"d",label:"D"}],RS=[{key:"h",label:"H"},{key:"f",label:"F"},{key:"a",label:"A"},{key:"d",label:"D"}],Xn=[[{key:4}],[{key:20},{key:10},{key:10},{key:6},{key:10},{key:10},{key:30}],[{key:3},{key:20},{key:5},{key:20},{key:5},{key:5},{key:5},{key:5},{key:60},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:10},{key:5}]];var YM=[{buttonLabel:"sample1",data:MS},{buttonLabel:"salmple2",data:kS},{buttonLabel:"sample3",data:RS},{buttonLabel:"Initial",data:Sc}],XM=[{label:"repeater with key",key:"key",clean:!1},{label:"repeater without key",key:"",clean:!1},{label:"repeater clear",key:"",clean:!0}];function KM({staticProps:e,delegateEvents:t,bindProps:r,proxi:o}){return YM.map((n,s)=>{let{data:i,buttonLabel:a}=n;return g`
                <dynamic-list-button
                    class="c-dynamic-list__top__button"
                    ${e({label:a})}
                    ${t({click:async()=>{o.data=i,o.activeSample=s,await m.tick()}})}
                    ${r(()=>({active:s===o.activeSample}))}
                ></dynamic-list-button>
            `}).join("")}function QM({bindProps:e,staticProps:t,proxi:r}){return XM.map((o,n)=>{let{key:s,clean:i,label:a}=o;return g`
                <dynamic-list-repeater
                    ${t({listId:n,key:s,clean:i,label:a})}
                    ${e(()=>({data:r.data,counter:r.counter}))}
                ></dynamic-list-repeater>
            `}).join("")}var NS=({updateState:e,staticProps:t,bindProps:r,delegateEvents:o,invalidate:n,bindText:s,getProxi:i})=>{let a=i();return g`
        <div class="c-dynamic-list">
            <div class="c-dynamic-list__header">
                <div class="c-dynamic-list__top">
                    ${KM({delegateEvents:o,staticProps:t,bindProps:r,proxi:a})}
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
                    ${QM({bindProps:r,staticProps:t,proxi:a})}
                </div>
            </div>
        </div>
    `};function ZM({staticProps:e,bindProps:t,delegateEvents:r,current:o,proxi:n}){return g`
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
    `}var PS=({staticProps:e,bindProps:t,delegateEvents:r,repeat:o,getProxi:n})=>{let s=n(),i=s.key.length>0?s.key:void 0;return g`
        <div class="c-dynamic-list-repeater">
            <h4 class="c-dynamic-list-repeater__title">${s.label}</h4>
            <div class="c-dynamic-list-repeater__list">
                ${o({observe:()=>s.data,clean:s.clean,key:i,afterUpdate:()=>{console.log("repeater updated")},render:({current:a})=>ZM({staticProps:e,bindProps:t,delegateEvents:r,current:a,proxi:s})})}
            </div>
        </div>
    `};function ek(e){return[...Array.from({length:e}).keys()].map(t=>t+1)}var tk=({staticProps:e,delegateEvents:t,proxi:r})=>g`
        ${ek(r.counter).map(o=>g`
                    <div class="validate-test-wrapper">
                        <dynamic-list-card-inner
                            ${e({key:`${o}`})}
                            ${t({click:()=>{console.log("invalidate inside reepater click")}})}
                        >
                        </dynamic-list-card-inner>
                    </div>
                `).join("")}
    `,AS=({onMount:e,key:t,staticProps:r,bindProps:o,id:n,delegateEvents:s,invalidate:i,repeat:a,bindText:c,bindEffect:l,getProxi:p,computed:d})=>{let f=p(),h=0;d(()=>f.innerDataUnivoque,()=>f.innerData.filter((b,T,_)=>_.map(({key:S})=>S).indexOf(b.key)===T)),e(async()=>((async()=>(await m.tick(),f.isMounted=!0))(),()=>{}));let y=f.isFull?"is-full":"";return g`
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
                        ${i({observe:()=>f.counter,render:()=>tk({delegateEvents:s,staticProps:r,proxi:f})})}
                    </div>
                </div>
            </div>
        </div>
    `};var OS=({bindText:e})=>g`<span class="dynamic-list-card-inner">
        <span>${e`${"key"}`}</span>
    </span>`;var _c=m.createComponent({tag:"dynamic-list-card-inner",component:OS,props:{key:()=>({value:"",type:String})}});var $S=({getState:e,bindText:t})=>{let{parentListId:r}=e();return g`<div class="dynamic-counter">
        <p class="c-dynamic-counter__title">Nested:</p>
        <p class="c-dynamic-counter__subtitle">(slotted)</p>
        <p class="c-dynamic-counter__list">list index: ${r}</p>
        <span>${t`${"counter"}`}</span>
    </div>`};var LS=m.createComponent({tag:"dynamic-list-counter",component:$S,props:{parentListId:()=>({value:-1,type:Number}),counter:()=>({value:0,type:Number})}});var DS=()=>g`<div class="c-dynamic-list-empty">
        <p>empty comp</p>
        <mobjs-slot name="empty-slot"></mobjs-slot>
    </div>`;var FS=m.createComponent({tag:"dynamic-list-empty",component:DS});var BS=m.createComponent({tag:"dynamic-list-card",component:AS,props:{parentListId:()=>({value:-1,type:Number}),isFull:()=>({value:!1,type:Boolean}),label:()=>({value:"-",type:String}),index:()=>({value:-1,type:Number}),counter:()=>({value:1,type:Number})},state:{innerData:()=>({value:Xn[0],type:Array}),innerDataUnivoque:()=>({value:Xn[0],type:Array}),isSelected:()=>({value:!1,type:Boolean}),isMounted:()=>({value:!1,type:Boolean})},child:[LS,FS,_c,Yn]});var VS=({bindText:e})=>g`<div class="c-dynamic-list-slotted-label">
        <p class="content">${e`slotted: ${"label"}`}</p>
    </div>`;var WS=m.createComponent({tag:"dynamic-slotted-label",component:VS,props:{label:()=>({value:"",type:String})}});var jS=m.createComponent({tag:"dynamic-list-repeater",component:PS,props:{data:()=>({value:[],type:Array}),key:()=>({value:"",type:String}),clean:()=>({value:!1,type:Boolean}),listId:()=>({value:-1,type:Number}),counter:()=>({value:-1,type:Number}),label:()=>({value:"",type:String})},child:[BS,WS]});var HS=m.createComponent({tag:"dynamic-list",component:NS,state:{counter:()=>({value:1,type:Number,validate:e=>e<=10&&e>=0,strict:!0}),data:()=>({value:Sc,type:Array}),activeSample:()=>({value:3,type:Number})},child:[Yn,jS,_c]});m.useComponent([HS]);var zS=()=>g` <dynamic-list> </dynamic-list> `;var US=({refs:e})=>{let t=z.createTimeTween({data:{opacity:0,scale:.5},duration:2e3,ease:"easeOutQuart",stagger:{each:8,from:"end"}}),r=z.createTimeTween({data:{scale:1},duration:6e3,ease:"easeInOutQuad",stagger:{each:12,from:"end"}});e.forEach(i=>{t.subscribeCache(i,({scale:a,opacity:c})=>{i.style.scale=`${a}`,i.style.opacity=`${c}`}),r.subscribeCache(i,({scale:a})=>{i.style.scale=`${a}`})});let o=we.createAsyncTimeline({repeat:1,autoSet:!1}).goTo(t,{opacity:1,scale:1}),n=we.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(r,{scale:1.1}),s=Z.watch("navigationIsOpen",i=>{if(i){o.isActive()&&o.pause(),n.isActive()&&n.pause();return}o.isActive()&&o.resume(),n.isActive()&&n.resume()});return{playIntro:()=>o?.play(),playSvg:()=>{n?.play()},destroy:()=>{s(),t.destroy(),t=null,o.destroy(),o=null,r.destroy(),r=null,n.destroy(),n=null}}};var rk=async({playIntro:e,playSvg:t})=>{await e(),t()},GS=({onMount:e,getProxi:t})=>{let r=t(),{svg:o}=r;return e(({element:n})=>{let s=[...n.querySelectorAll('[ref="svg_group"]')],{destroy:i,playIntro:a,playSvg:c}=US({refs:s});return setTimeout(()=>{rk({playIntro:a,playSvg:c})},500),()=>{i()}}),g`<div class="l-index">
        <div class="l-index__logo">${o}</div>
    </div>`};var qS=m.createComponent({tag:"home-component",component:GS,props:{svg:()=>({value:"",type:String})},state:{isMounted:()=>({value:!1,type:Boolean})}});m.useComponent([qS]);var JS=async()=>{let{data:e}=await te({source:"./asset/svg/ms_nord.svg?v=1.3"}),{data:t}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return g`
        <div>
            <div class="background-shape">${t}</div>
            <home-component
                ${m.staticProps({svg:e})}
            ></home-component>
        </div>
    `};var YS=[{state:"level1",maxItem:10,ref:"level1_counter",label_plus:"level1 +",label_minus:"level1 -"},{state:"level2",maxItem:10,ref:"level2_counter",label_plus:"level2 +",label_minus:"level2 -"},{state:"level3",maxItem:6,ref:"level3_counter",label_plus:"level3 +",label_minus:"level3 -"}];function ok(e){return Math.floor(Math.random()*e)}var xc=({delegateEvents:e,updateState:t,invalidate:r,proxi:o})=>g`
        ${YS.map(n=>g` <div class="matrioska__head__item">
                    <dynamic-list-button
                        class="matrioska__button"
                        ${e({click:async()=>{t(n.state,s=>s.slice(0,-1))}})}
                        >${n.label_minus}</dynamic-list-button
                    >
                    <dynamic-list-button
                        class="matrioska__button"
                        ${e({click:async()=>{t(n.state,s=>[...s,{key:ok(1e3),value:u.getUnivoqueId()}])}})}
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
    `;var Kn=e=>{m.useMethodByName(e).toggleActive()};var XS=({repeat:e,staticProps:t,bindProps:r,delegateEvents:o,proxi:n})=>g`
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
    `;var KS=({repeat:e,staticProps:t,bindProps:r,delegateEvents:o,proxi:n})=>g`
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
                                ${XS({repeat:e,staticProps:t,delegateEvents:o,bindProps:r,proxi:n})}
                            </matrioska-item>
                        </div>
                    `})}
        </div>
    `;var QS=({delegateEvents:e,updateState:t,repeat:r,staticProps:o,bindProps:n,invalidate:s,getProxi:i})=>{let a=i();return g`<div class="matrioska">
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
                                    ${KS({repeat:r,staticProps:o,bindProps:n,delegateEvents:e,proxi:a})}
                                </matrioska-item>
                            </div>
                        `})}
            </div>
        </div>
    </div>`};var ZS=({getProxi:e,bindText:t,id:r,bindEffect:o,addMethod:n})=>{let s=e();return n("toggleActive",()=>{s.active=!s.active}),g`<matrioska-item
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
    </matrioska-item>`};var e_=m.createComponent({tag:"matrioska-item",component:ZS,props:{level:()=>({value:"",type:String}),key:()=>({value:"",strict:!0,type:String}),index:()=>({value:0,strict:!0,type:Number}),value:()=>({value:"",type:String}),counter:()=>({value:-1,type:Number})},state:{active:()=>({value:!1,type:Boolean})},style:":host { display: block; } "});var t_=({staticProps:e,delegateEvents:t,invalidate:r,bindProps:o,proxi:n})=>g` <div class="matrioska__level matrioska__level--3">
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
    </div>`;var r_=({staticProps:e,bindProps:t,delegateEvents:r,invalidate:o,proxi:n})=>g`
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
                                        ${t_({staticProps:e,delegateEvents:r,invalidate:o,bindProps:t,proxi:n})}
                                    </matrioska-item>
                                </div>
                            `).join("")})}
        </div>
    `;var o_=({delegateEvents:e,updateState:t,staticProps:r,bindProps:o,invalidate:n,getProxi:s})=>{let i=s();return g`<div class="matrioska">
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
                                            ${r_({staticProps:r,bindProps:o,delegateEvents:e,invalidate:n,proxi:i})}
                                        </matrioska-item>
                                    </div>
                                `).join("")})}
            </div>
        </div>
    </div>`};var nk=e=>{for(let t=e.length-1;t>0;t--){let r=Math.floor(Math.random()*(t+1));[e[t],e[r]]=[e[r],e[t]]}return e},n_={state:{level1:()=>({value:[{key:1,value:u.getUnivoqueId()}],type:Array,validate:e=>e.length<=10,strict:!0}),level2:()=>({value:[{key:1,value:u.getUnivoqueId()},{key:2,value:u.getUnivoqueId()}],type:Array,validate:e=>e.length<=10,strict:!0}),level3:()=>({value:[{key:1,value:u.getUnivoqueId()},{key:2,value:u.getUnivoqueId()}],type:Array,transform:(e,t)=>e>t?nk(e):e,validate:e=>e.length<=6,strict:!0}),counter:()=>({value:0,type:Number})},child:[Yn,e_]},s_=m.createComponent({tag:"page-matrioska-repeat",component:QS,...n_}),i_=m.createComponent({tag:"page-matrioska-invalidate",component:o_,...n_});m.useComponent([s_,i_]);var a_=()=>g` <page-matrioska-repeat> </page-matrioska-repeat> `,c_=()=>g` <page-matrioska-invalidate> </page-matrioska-invalidate> `;var ap=0,sk=({indicators:e,proxi:t})=>[...e].map((r,o)=>qe.createScrollTrigger({item:r,pin:!0,animateAtStart:!1,animatePin:!0,useThrottle:!0,ease:!1,dynamicStart:{position:"right",value:()=>window.innerWidth+ap-Fe(r)*(o+1)},dynamicEnd:{position:"right",value:()=>{let n=e.length-(o-2);return window.innerWidth/10*9*n}},onEnter:()=>{t.currentIdFromScroll=o},onLeaveBack:()=>{t.currentIdFromScroll=o-1}})),l_=({pins:e})=>{e.forEach(t=>t.refresh())},ik=({titles:e})=>[...e].map(t=>qe.createParallax({item:t,propierties:"x",reverse:!0,range:9})),u_=({nav:e})=>{e.classList.add("active"),[...document.querySelectorAll(".js-indicator")].forEach(r=>{r.classList.add("active")})},p_=({nav:e})=>{e.classList.remove("active"),[...document.querySelectorAll(".js-indicator")].forEach(r=>{r.classList.remove("active")})},m_=({indicators:e,titles:t,nav:r,animatePin:o,proxi:n,rootRef:s})=>{let i=sk({indicators:e,proxi:n}),a=ik({titles:t}),c=document.querySelector(".l-navcontainer__side");ap=Fe(c)/2;let l=u.useResize(()=>{ap=Fe(c)/2}),p=new qs({root:s,container:".js-container",row:".js-row",column:".js-column",trigger:".js-trigger",shadowClass:".shadowClass",useWillChange:!0,useDrag:!0,useSticky:!o,useThrottle:!0,animateAtStart:!1,ease:!1,easeType:"lerp",addCss:!0,columnHeight:70,columnWidth:100,columnAlign:"center",animatePin:o,breakpoint:"tablet",children:[...i,...a],onEnter:()=>{l_({pins:i}),u_({nav:r})},onEnterBack:()=>{l_({pins:i}),u_({nav:r})},onLeave:()=>{p_({nav:r})},onLeaveBack:()=>{p_({nav:r})}});return p.init(),{destroy:()=>{i.forEach(d=>{d?.destroy()}),i=[],a.forEach(d=>{d?.destroy()}),a=[],p.destroy(),p=null,l()},refresh:()=>p.refresh()}};var ak=(e,t)=>e===0?1:e===t-1?-1:0,ck=({numOfCol:e,pinIsVisible:t,staticProps:r})=>{let o=t?"":"hidden";return[...Array.from({length:e}).keys()].map((n,s)=>g`
                <horizontal-scroller-section
                    ${r({id:s,pinClass:o})}
                ></horizontal-scroller-section>
            `).join("")},lk=({numOfCol:e,proxi:t,staticProps:r,delegateEvents:o})=>[...Array.from({length:e}).keys()].map((n,s)=>g`
                <horizontal-scroller-button
                    ${r({id:s})}
                    ${o({click:()=>t.currentId=s})}
                ></horizontal-scroller-button>
            `).join(""),d_=({onMount:e,watch:t,staticProps:r,delegateEvents:o,setRef:n,getRef:s,getProxi:i})=>{let a=i();return e(({element:c})=>{if(ce.mq("max","desktop"))return;let l=10,p=[...c.querySelectorAll(".js-indicator")],d=c.querySelector(".js-nav"),f=[...c.querySelectorAll(".js-title h1")],{destroy:h}=m_({rootRef:s().js_root,indicators:p,titles:f,nav:d,animatePin:a.animatePin,proxi:a});return window.scrollTo(0,0),t(()=>a.currentId,(y,b)=>{let T=c.querySelector(`.shadowClass--section-${y} .shadowClass--in-center`),{top:_}=fe(T),S=ne(T),E=Number.parseInt(y)===0?window.innerHeight+1:_+S-window.innerHeight,C=Math.max(1,Math.abs(y-b)),I=2e3,P=1+(l-C)/l*.9,k=C/l*I*P;$r.to(E+ak(y,l),{duration:k})}),()=>{h()}}),ce.mq("max","desktop")?g`<div><only-desktop></only-desktop></div>`:g`<div class="l-h-scroller">
        <only-desktop></only-desktop>
        <div class="l-h-scroller__top">scroll down</div>
        <ul class="l-h-scroller__nav js-nav" ${n("js_nav")}>
            ${lk({numOfCol:10,proxi:a,staticProps:r,delegateEvents:o})}
        </ul>
        <div class="l-h-scroller__root js-root" ${n("js_root")}>
            <div
                class="l-h-scroller__container js-container"
                ${n("js_container")}
            >
                <div class="l-h-scroller__row js-row" ${n("js_root")}>
                    ${ck({numOfCol:10,pinIsVisible:!a.animatePin,staticProps:r})}
                </div>
                <div
                    class="l-h-scroller__trigger js-trigger"
                    ${n("js_trigger")}
                ></div>
            </div>
        </div>
        <div class="l-h-scroller__bottom">scroll up</div>
    </div>`};var h_=({getProxi:e})=>{let t=e();return g`
        <li>
            <button
                type="button"
                data-id="${t.id}"
                class="l-h-scroller__nav__btn"
            >
                ${t.id}
            </button>
        </li>
    `};var f_=m.createComponent({tag:"horizontal-scroller-button",component:h_,props:{id:()=>({value:-1,type:Number})}});var g_=({getState:e})=>{let{id:t,pinClass:r}=e();return g`
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
    `};var b_=m.createComponent({tag:"horizontal-scroller-section",component:g_,props:{id:()=>({value:-1,type:Number}),pinClass:()=>({value:"",type:String})}});var v_=m.createComponent({tag:"horizontal-scroller",component:d_,props:{animatePin:()=>({value:!1,type:Boolean})},state:{currentId:()=>({value:0,type:Number,skipEqual:!1}),currentIdFromScroll:()=>({value:0,type:Number})},child:[f_,b_]});m.useComponent([v_]);var y_=async()=>(xe({active:!0,prevRoute:"",nextRoute:"",backRoute:""}),g`<div>
        <horizontal-scroller
            ${m.staticProps({animatePin:!1})}
        ></horizontal-scroller>
    </div>`);var T_=({getState:e})=>{let{fill:t}=e();return g`
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
    `};var S_=m.createComponent({tag:"svg-star",component:T_,props:{fill:()=>({value:"#000000",type:String})}});var uk=({delegateEvents:e,bindEffect:t,bindObject:r,proxi:o})=>g`<div
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
    </div>`,__=({bindProps:e,delegateEvents:t,bindObject:r,getProxi:o,bindEffect:n})=>{let s=o();return g`<div>
        <button
            type="button"
            class="c-move3d-page__controls__open"
            ${t({click:()=>{s.controlsActive=!0}})}
        >
            show controls
        </button>
        ${uk({delegateEvents:t,bindEffect:n,bindObject:r,proxi:s})}
        <move-3d
            ${e(()=>({shape:s.data,xDepth:s.xDepth,yDepth:s.yDepth,xLimit:s.xLimit,yLimit:s.yLimit,factor:s.factor,debug:s.debug}))}
        ></move-3d>
    </div>`};var pk=({debug:e,id:t})=>e?g`<span class="c-move3d-item__debug">${t}</span>`:"",cp=({data:e,root:t,childrenId:r,debug:o})=>e.map(({children:n,props:s})=>g`<move-3d-item
                name="${r}"
                ${m.staticProps({root:t,...s})}
            >
                ${pk({debug:o,id:s.id})}
                ${cp({data:n??[],root:!1,childrenId:r,debug:o})}
            </move-3d-item>`).join("");var lp=({element:e})=>({height:ne(e),width:Fe(e),offSetLeft:fe(e).left,offSetTop:fe(e).top}),x_=({childrenId:e})=>m.useMethodArrayByName(e).map(r=>o=>r?.move?.(o)),C_=({ratio:e})=>({get3dItemUnit:t=>`min(${t}px, calc((((100vw) * ${t}) / ${e} )))`});var Qn=()=>{},E_=({onMount:e,setRef:t,getRef:r,watch:o,computed:n,invalidate:s,getProxi:i,bindEffect:a})=>{let c=u.getUnivoqueId(),l=i(),p=0,d=0,f=0,h=0,y=0,b=0,T=0,_=0,S=!1,E=!1,C={x:0,y:0},I=0,M=Qn,P=Qn,k=Qn,A=Qn,R=Qn,F=Qn,$=[],w=z.createSpring({data:{delta:0,ax:0,ay:0}}),O=()=>{S=!1},D=()=>{let{vw:j,vh:X}=l.centerToViewoport||l.drag?{vw:window.innerWidth,vh:window.innerHeight}:{vw:d,vh:p},ue=C.x,ye=C.y,{xgap:ee,ygap:pe}=S?E?(E=!1,{xgap:0,ygap:0}):{xgap:ue-y,ygap:ye-T}:{xgap:0,ygap:0};S&&(b+=ee,_+=pe);let{xInMotion:he,yInMotion:be}=S?{xInMotion:b,yInMotion:_}:{xInMotion:ue,yInMotion:ye},{ax:Ie,ay:De}=l.centerToViewoport||l.drag?{ax:-(j/2-he)/l.xDepth,ay:(X/2-be)/l.yDepth}:{ax:-(j/2-(he-f))/l.xDepth,ay:(X/2-(be-h))/l.yDepth};y=ue,T=ye;let q=Ie>l.xLimit||Ie<-l.xLimit,Te=De>l.yLimit||De<-l.yLimit;q&&(b-=ee),Te&&(_-=pe);let et=ce.clamp(Ie,-l.xLimit,l.xLimit),ut=ce.clamp(De,-l.yLimit,l.yLimit),Et=Math.sqrt(Math.pow(Math.abs(ut),2)+Math.pow(Math.abs(et),2));w.goTo({delta:Et,ax:et,ay:ut}).catch(()=>{}),$.forEach(Ye=>{Ye({delta:Et,factor:l.factor})})},x=j=>{I!==j&&(C.y-=I,I=j,C.y+=I),D()},N=({page:j})=>j.y>h&&j.y<h+p&&j.x>f&&j.x<f+d,L=({page:j})=>{N({page:j})&&(S=!0,E=!0)},B=()=>{F(),F=l.useScroll?u.useScroll(({scrollY:j})=>{x(j)}):()=>{}};return e(({element:j})=>{let{container:X}=r();l.afterInit(j);let ue=w.subscribe(({delta:he,ax:be,ay:Ie})=>{X.style.transform=`translate3D(0,0,0) rotateY(${be}deg) rotateX(${Ie}deg)`,l.onUpdate({delta:he,deltaX:be,deltaY:Ie})}),ye=w.onComplete(({ax:he,ay:be})=>{X.style.transform=`rotateY(${he}deg) rotateX(${be}deg)`}),ee=u.useMouseMove(({page:he})=>{C={x:he.x,y:he.y},D()}),pe=u.useResize(()=>{({height:p,width:d,offSetTop:h,offSetLeft:f}=lp({element:j}))});return o(()=>l.drag,he=>{if(R(),A(),k(),P(),M(),he){b=window.innerWidth/2,_=window.innerHeight/2,M=u.useTouchStart(({page:be})=>{L({page:be})}),P=u.useTouchEnd(()=>{O()}),k=u.useMouseDown(({page:be})=>{L({page:be})}),A=u.useMouseUp(()=>{O()}),R=u.useTouchMove(({page:be})=>{C={x:be.x,y:be.y},D()});return}},{immediate:!0}),o(()=>l.useScroll,(he,be)=>{if(he){B();return}he!==be&&F()}),n(()=>l.useScroll,()=>!l.drag&&!l.centerToViewoport),u.useNextLoop(()=>{({height:p,width:d,offSetTop:h,offSetLeft:f}=lp({element:j})),C={x:window.innerWidth/2,y:window.innerHeight/2},D()}),()=>{ue(),ye(),pe(),ee(),F(),M(),P(),k(),A(),R(),w.destroy(),$=[],w=null,p=null,d=null,f=null,h=null,y=null,b=null,T=null,_=null,S=null,E=null,C=null,I=null}}),g`<div
        class="c-move-3d"
        ${a({toggleClass:{"move3D--drag":()=>l.drag}})}
    >
        <div
            class="c-move-3d__scene"
            ${a({toggleStyle:{perspective:()=>`${l.perspective}px`}})}
        >
            <div class="c-move-3d__container" ${t("container")}>
                ${s({observe:[()=>l.shape,()=>l.debug],afterUpdate:()=>{$=x_({childrenId:c})},render:()=>cp({data:l.shape,root:!0,childrenId:c,debug:l.debug})})}
            </div>
        </div>
    </div>`};var up=({startRotation:e,range:t,delta:r,limit:o})=>Number.parseFloat((t*r/o-e).toFixed(2)),w_=({rotate:e,anchorPoint:t,baseRotateX:r,baseRotateY:o})=>{if(!e||!t)return{rotateX:0,rotateY:0};switch(e.toUpperCase()){case"X":return(()=>{switch(t.toUpperCase()){case"BOTTOM":return{rotateX:r,rotateY:0};case"TOP":return{rotateX:-r,rotateY:0};default:return{rotateX:0,rotateY:0}}})();case"Y":return(()=>{switch(t.toUpperCase()){case"LEFT":return{rotateX:0,rotateY:o};case"RIGHT":return{rotateX:0,rotateY:-o};default:return{rotateX:0,rotateY:0}}})();case"XY":return(()=>{switch(t.toUpperCase()){case"TOP-LEFT":return{rotateX:-r,rotateY:o};case"TOP-RIGHT":return{rotateX:-r,rotateY:-o};case"BOTTOM-LEFT":return{rotateX:r,rotateY:o};case"BOTTOM-RIGHT":return{rotateX:r,rotateY:-o};default:return{rotateX:0,rotateY:0}}})();default:return{rotateX:0,rotateY:0}}};var mk=e=>e?.tagName.length===0?"":g`
        <div class="c-move3d-item__component ${e?.className}">
            <${e.tagName} ${m.staticProps(e?.props??{})}>
            </${e.tagName}>
        </div>`,dk=({delta:e,factor:t,initialRotate:r,depth:o,range:n,rotate:s,anchorPoint:i,lerp:a})=>{let c=Math.round(o*e/t),l={startRotation:r??0,range:n??20,delta:e,limit:t},p=up(l),d=up(l),f={rotate:s??"center",anchorPoint:i,baseRotateX:p,baseRotateY:d},{rotateX:h,rotateY:y}=w_(f);a.goTo({depth:c,rotateX:h,rotateY:y}).catch(()=>{})},I_=({getState:e,addMethod:t,onMount:r})=>{let{root:o,anchorPoint:n,animate:s,depth:i,rotate:a,width:c,height:l,offsetX:p,offsetY:d,range:f,initialRotate:h,initialDepth:y,classList:b,component:T}=e(),_=o?"is-root":"is-children",S=`--item-width:${c};`,E=`--item-height:${l};`,C=`--offset-x:${p};`,I=`--offset-y:${d};`,M=z.createLerp({data:{depth:0,rotateX:0,rotateY:0}});return t("move",({delta:P,factor:k})=>{s&&dk({delta:P,factor:k,initialRotate:h,depth:i,range:f,rotate:a,anchorPoint:n,lerp:M})}),r(({element:P})=>{let k=M.subscribe(({depth:F,rotateX:$,rotateY:w})=>{let O=F+y;P.style.transform=`translate3D(0,0,${O}px) rotateX(${$}deg) rotateY(${w}deg)`}),A=M.onComplete(({depth:F,rotateX:$,rotateY:w})=>{let O=F+y;P.style.transform=`translateZ(${O}px) rotateX(${$}deg) rotateY(${w}deg)`}),R=y;return P.style.transform=`translateZ(${R}px)`,()=>{k(),A(),M.destroy(),M=null}}),g`<div
        class="c-move3d-item ${_} anchor-${n}"
        style="${S}${E}${C}${I}"
    >
        <div class="c-move3d-item__content ${b}"></div>
        ${mk({tagName:T?.tagName??"",className:T?.className??"",props:T?.props??{}})}
        <mobjs-slot></mobjs-slot>
    </div>`};var M_=m.createComponent({tag:"move-3d-item",component:I_,props:{root:()=>({value:!0,type:Boolean}),depth:()=>({value:0,type:Number}),rotate:()=>({value:"x",type:String}),width:()=>({value:"0px",type:String}),height:()=>({value:"0px",type:String}),offsetX:()=>({value:"0px",type:String}),offsetY:()=>({value:"0px",type:String}),range:()=>({value:20,type:Number}),anchorPoint:()=>({value:"center",type:String}),animate:()=>({value:!0,type:Boolean}),initialRotate:()=>({value:0,type:Number}),initialDepth:()=>({value:0,type:Number}),classList:()=>({value:"",type:String}),component:{tagName:()=>({value:"",type:String}),className:()=>({value:"",type:String}),props:()=>({value:"",type:"any"})}},state:{id:()=>({value:"",type:String})}});var Zn=m.createComponent({tag:"move-3d",component:E_,props:{drag:()=>({value:!1,type:Boolean}),centerToViewoport:()=>({value:!1,type:Boolean}),perspective:()=>({value:700,type:Number}),xDepth:()=>({value:20,type:Number,validate:e=>e>1,strict:!0}),yDepth:()=>({value:20,type:Number,validate:e=>e>1,strict:!0}),xLimit:()=>({value:1e4,type:Number}),yLimit:()=>({value:1e4,type:Number}),factor:()=>({value:45,type:Number,validate:e=>e>1,strict:!0}),shape:()=>({value:[],type:Array}),debug:()=>({value:!1,type:Boolean}),afterInit:()=>({value:()=>{},type:Function}),onUpdate:()=>({value:()=>{},type:Function})},state:{useScroll:()=>({value:!0,type:Boolean})},child:[M_]});var k_=m.createComponent({tag:"move-3d-page",component:__,props:{data:()=>({value:[],type:Array})},state:{xDepth:()=>({value:20,type:Number}),yDepth:()=>({value:20,type:Number}),xLimit:()=>({value:1e3,type:Number}),yLimit:()=>({value:1e3,type:Number}),perspective:()=>({value:700,type:Number}),debug:()=>({value:!1,type:Boolean}),factor:()=>({value:45,type:Number,validate:e=>e>1,strict:!0}),controlsActive:()=>({value:!1,type:Boolean})},child:[Zn]});m.useComponent([k_,S_]);var R_=async({props:e})=>{let{data:t,prevRoute:r,nextRoute:o}=e,{data:n}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:r,nextRoute:o,backRoute:"#plugin-overview"}),g` <div>
        <div class="background-shape">${n}</div>
        <move-3d-page
            ${m.staticProps({data:t})}
        ></move-3d-page>
    </div>`};var{get3dItemUnit:H}=C_({ratio:1980}),N_=[{props:{id:0,depth:0,anchorPoint:"center",classList:"move3d-square",animate:!0,width:H(150),height:H(150)},children:[{props:{id:1,depth:200,width:H(150),height:H(150),rotate:"",anchorPoint:"center",initialDepth:100,classList:"move3d-square has-star pippo",component:{tagName:"svg-star",className:"move3d-square__star",props:{fill:"#f28f3b"}},animate:!0},children:[]},{props:{id:2,depth:200,width:H(80),height:H(80),offsetX:H(40),offsetY:H(40),rotate:"",initialDepth:200,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:3,depth:200,width:H(80),height:H(80),offsetX:H(-10),offsetY:H(80),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:4,depth:200,width:H(80),height:H(80),offsetX:H(80),offsetY:H(80),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:5,depth:200,width:H(80),height:H(80),offsetX:H(-10),offsetY:H(-10),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:6,depth:200,width:H(80),height:H(80),offsetX:H(80),offsetY:H(-10),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:7,depth:100,width:H(150),height:H(150),rotate:"x",range:20,anchorPoint:"bottom",classList:"move3d-square",animate:!0},children:[{props:{id:8,depth:0,width:H(150),height:H(150),rotate:"x",range:30,anchorPoint:"bottom",classList:"move3d-square",animate:!0},children:[]}]},{props:{id:9,depth:100,width:H(150),height:H(150),rotate:"x",range:20,anchorPoint:"top",classList:"move3d-square",animate:!0},children:[{props:{id:10,depth:0,width:H(150),height:H(150),rotate:"x",range:20,anchorPoint:"top",classList:"move3d-square",animate:!0},children:[]}]},{props:{id:11,depth:100,width:H(150),height:H(150),rotate:"y",range:20,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[{props:{id:12,depth:0,width:H(150),height:H(150),rotate:"y",range:30,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[{props:{id:13,depth:0,width:H(150),height:H(150),rotate:"y",range:40,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[]}]}]},{props:{id:13,depth:100,width:H(150),height:H(150),rotate:"y",range:20,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[{props:{id:14,depth:0,width:H(150),height:H(150),rotate:"y",range:30,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[{props:{id:15,depth:0,width:H(150),height:H(150),rotate:"y",range:40,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[]}]}]},{props:{id:16,depth:150,rotate:"xy",width:H(150),height:H(150),offsetX:H(20),offsetY:H(20),range:20,anchorPoint:"bottom-left",classList:"move3d-square",animate:!0},children:[{props:{id:17,depth:100,rotate:"",width:H(150),height:H(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:18,depth:150,rotate:"xy",width:H(150),height:H(150),offsetX:H(20),offsetY:H(20),range:20,anchorPoint:"bottom-right",classList:"move3d-square",animate:!0},children:[{props:{id:19,depth:100,rotate:"",width:H(150),height:H(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:20,depth:150,rotate:"xy",width:H(150),height:H(150),offsetX:H(20),offsetY:H(20),range:20,anchorPoint:"top-left",classList:"move3d-square",animate:!0},children:[{props:{id:21,depth:100,rotate:"",width:H(150),height:H(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:22,depth:150,rotate:"xy",width:H(150),height:H(150),offsetX:H(20),offsetY:H(20),range:20,anchorPoint:"top-right",classList:"move3d-square",animate:!0},children:[{props:{id:23,depth:100,rotate:"",width:H(150),height:H(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]}]}];var P_={shape1:{prevRoute:"",nextRoute:"#plugin-dragger",data:N_}};var A_=({getState:e})=>{let{content:t}=e();return g`${t}`};var es=m.createComponent({tag:"any-component",component:A_,props:{content:()=>({value:"",type:String})}});var O_=({elements:e})=>{let t=180/Math.PI,r=window.innerWidth,o=window.innerHeight,n=0,s=0,i=0,a=0,c=z.createSpring({data:{x:0,y:0},stagger:{each:3,from:"start"}});e.forEach(f=>{c.subscribe(({x:h,y})=>{f.style.translate=`${h}px ${y}px`})});let l=z.createSpring({data:{rotation:0},stagger:{each:8,from:"start"}});e.forEach(f=>{f&&l.subscribeCache(f,({rotation:h})=>{f.style.rotate=`${h}deg`})});let p=u.useResize(()=>{r=window.innerWidth,o=window.innerHeight}),d=u.useMouseMove(({client:f})=>{let{x:h,y}=f,b=y-n,T=h-s;if(Math.abs(T)>10||Math.abs(b)>10){n=y,s=h;let S=Math.atan2(b,T)*t+180,E=Math.abs(i-S);E>180&&i<S&&(a-=E),E>180&&i>S&&(a+=E);let C=S+a+90;l.goTo({rotation:C}),i=S}c.goTo({x:h-r/2,y:y-o/2})});return{destroy:()=>{c.destroy(),c=null,l.destroy(),l=null,p(),d(),r=null,o=null,n=null,s=null,i=null,a=null}}};var hk=5,$_=({onMount:e,getRefs:t,setRef:r})=>{let{starOutline:o}=ft(),n=[...Array.from({length:hk}).keys()].map(()=>`<span class='mouse-trail__item' ${r("star")}>${o}</span>`).join("");return e(()=>{let{star:s}=t(),{destroy:i}=O_({elements:s});return()=>{i()}}),g`<div class="mouse-trail">${n}</div>`};var Cc=m.createComponent({tag:"mouse-trail",component:$_});var ts=({svg:e,id:t})=>{let r=document.createRange().createContextualFragment(e),o=r.querySelectorAll('[type="layer"]'),n=r.querySelectorAll('[type="delete"]');return[...o].forEach(i=>{i.id!==t&&i.remove()}),[...n].forEach(i=>{i.remove()}),Iy(r)};var L_=({u0:e,u1:t,o:r,o_b:o,m1:n,m2:s,m3:i,m4:a,b1:c,b1_b:l,b3:p,b4:d,b5:f,sign:h,m1_b:y,m3_b:b,m4_b:T,b1_stone:_,m1_stone:S})=>[{props:{id:0,depth:200,anchorPoint:"center",classList:"",animate:!0},children:[{props:{id:1,depth:-500,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:e}}},children:[]},{props:{id:1,depth:-50,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:t}}},children:[]},{props:{id:2,depth:20,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:r}}},children:[]},{props:{id:2,depth:21,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:o}}},children:[]},{props:{id:3,depth:150,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:n}}},children:[]},{props:{id:3,depth:150,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:y}}},children:[]},{props:{id:6,depth:155,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:a}}},children:[]},{props:{id:6,depth:155,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:T}}},children:[]},{props:{id:6,depth:170,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:S}}},children:[]},{props:{id:4,depth:180,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:s}}},children:[]},{props:{id:4,depth:180,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:h}}},children:[]},{props:{id:5,depth:100,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:i}}},children:[]},{props:{id:5,depth:100,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:b}}},children:[]},{props:{id:6,depth:50,anchorPoint:"center",initialDepth:1,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:c}}},children:[]},{props:{id:6,depth:51,anchorPoint:"center",initialDepth:1,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:l}}},children:[]},{props:{id:7,depth:120,anchorPoint:"center",initialDepth:20,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:_}}},children:[]},{props:{id:8,depth:100,initialDepth:10,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:p}}},children:[]},{props:{id:10,depth:170,anchorPoint:"center",initialDepth:10,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:d}}},children:[]},{props:{id:11,depth:100,anchorPoint:"center",initialDepth:1,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:f}}},children:[]}]}];m.useComponent([Zn,es,Cc]);var D_=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=0.9"}),{data:t}=await te({source:"./asset/svg/rdp.svg?v=1.3"}),[r,o,n,s,i,a,c,l,p,d,f,h,y,b,T,_,S,E,C]=["U0_block","U1_block","O_block","O_b_block","M1_block","M1_b_block","M2_block","M3_block","M3_b_block","M4_block","M4_b_block","B1_block","B1_b_block","B3_block","B4_block","B5_block","sign","Bstone_1_block","Mstone_1_block"].map(I=>ts({svg:e,id:I}));return xe({active:!0,prevRoute:"#rdp-01",nextRoute:"#mob-02",backRoute:"#svg-overview"}),g`<div class="l-mob-01">
        <div class="background-shape">${t}</div>
        <mouse-trail></mouse-trail>
        <move-3d
            ${m.staticProps({shape:L_({u0:r,u1:o,o:n,o_b:s,m1:i,m2:c,m3:l,m4:d,b1:h,b1_b:y,b3:b,b4:T,b5:_,sign:S,m1_b:a,m3_b:p,m4_b:f,b1_stone:E,m1_stone:C}),xDepth:100,yDepth:30,factor:20,xLimit:20,yLimit:20,drag:!0,perspective:1e3})}
        ></move-3d>
    </div>`};var F_=()=>ce.mq("min","desktop"),B_="#home",pp=null;m.afterRouteChange(({currentRoute:e})=>{e!=="onlyDesktop"&&(pp=m.getActiveParams(),B_=e)});var V_=({onMount:e,getProxi:t,bindEffect:r,watch:o})=>{let n=t();return n.active=F_(),e(()=>{let s=u.useResize(()=>{n.active=F_()});return o(()=>n.active,i=>{i&&m.loadUrl({url:B_,params:pp??{}})}),()=>{s(),pp=null}}),g`
        <a
            href="#home"
            class="l-only-desktop__link"
            ${r({toggleClass:{active:()=>n.active}})}
        >
            home page
        </a>
    `};var W_=m.createComponent({tag:"only-desktop-cta",component:V_,state:{active:()=>({value:!1,type:Boolean,skipEqual:!1})}});m.useComponent([W_]);var j_=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob-only-desktop.svg?v=0.1"}),{data:t}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return g`
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
    `};var mp=({canvas:e,disableOffcanvas:t})=>{let{useOffscreen:r,context:o}=yt({disableOffcanvas:t}),n=!0,s=e.getContext(o,{alpha:!0}),i=m.getActiveRoute(),{offscreen:a,offScreenCtx:c}=Tt({useOffscreen:r,canvas:e}),l=r?c:s,p=Jn(l);l=null,e.width=e.clientWidth,e.height=e.clientHeight;let d=10,f=10,h=window.innerHeight>=800?window.innerHeight/18:window.innerHeight/20,y=window.innerHeight>=800?window.innerHeight/18:window.innerHeight/20,T=vo({canvas:e,numberOfRow:d,numberOfColumn:f,cellWidth:h,cellHeight:y,gutter:1}).items,_=T.map(D=>({...D,scale:1,rotate:0})),S=({row:D,col:x})=>{let N=(f+1)*D;return _[N+x]},C={...S({row:1,col:1}),scale:1,rotate:0},M={...S({row:4,col:5}),scale:1,rotate:0},P=z.createTimeTween({ease:"easeInOutQuad",stagger:{each:10,from:"edges"},data:{scale:1,rotate:0}}),k=z.createTimeTween({data:C,duration:1e3,ease:"easeInOutBack"}),A=z.createSpring({data:M});_.forEach(D=>{P.subscribeCache(D,({scale:x,rotate:N})=>{D.rotate=N,D.scale=x})}),k.subscribe(D=>{C=D}),A.subscribe(D=>{M=D});let R=we.createAsyncTimeline({repeat:-1,autoSet:!1,yoyo:!0});R.goTo(P,{scale:.2,rotate:90},{duration:1e3});let F=we.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1});F.goTo(k,{x:S({row:1,col:8}).x,rotate:360,scale:2}).createGroup({waitComplete:!1}).goTo(k,{y:S({row:8,col:8}).y,rotate:180}).goTo(A,{y:S({row:0,col:8}).y},{delay:500}).closeGroup().label({name:"my-label"}).createGroup({waitComplete:!1}).goTo(k,{x:S({row:8,col:1}).x,rotate:0,scale:1}).goTo(A,{rotate:360,scale:2},{delay:0}).closeGroup().createGroup({waitComplete:!1}).goTo(k,{y:S({row:1,col:1}).y,rotate:-180},{duration:1e3}).goTo(A,{rotate:0,y:S({row:8,col:8}).y,scale:1},{delay:200}).closeGroup();let $=()=>{if(!s)return;r&&a&&(a.width=e.width,a.height=e.height);let D=r?c:s;if(D){e.width=e.width,_.forEach(({x,y:N,width:L,height:B,rotate:j,scale:X,offsetXCenter:ue,offsetYCenter:ye},ee)=>{if(ee===40){let Ie=Math.PI/180*C.rotate,De=Math.cos(Ie)*C.scale,q=Math.sin(Ie)*C.scale;D.setTransform(De,q,-q,De,Math.floor(C.offsetXCenter+C.x),Math.floor(C.offsetYCenter+C.y)),p?(D.beginPath(),D.roundRect(Math.floor(-C.width/2),Math.floor(-C.height/2),Math.floor(C.width),C.height,5)):(D.beginPath(),D.rect(Math.floor(-C.width/2),Math.floor(-C.height/2),Math.floor(C.width),Math.floor(C.height))),D.fillStyle="#000000",D.fill()}let pe=Math.PI/180*j,he=Math.cos(pe)*X,be=Math.sin(pe)*X;D.setTransform(he,be,-be,he,Math.floor(ue+x),Math.floor(ye+N)),p?(D.beginPath(),D.roundRect(Math.floor(-L/2),Math.floor(-B/2),L,B,5)):(D.beginPath(),D.rect(Math.floor(-L/2),Math.floor(-B/2),L,B)),D.fillStyle="rgba(238, 238, 238, 0.9)",D.fill()});{let x=Math.PI/180*M.rotate,N=Math.cos(x)*M.scale,L=Math.sin(x)*M.scale;D.setTransform(N,L,-L,N,Math.floor(M.offsetXCenter+M.x),Math.floor(M.offsetYCenter+M.y)),p?(D.beginPath(),D.roundRect(Math.floor(-M.width/2),Math.floor(-M.height/2),Math.floor(M.width),Math.floor(M.height),5)):(D.beginPath(),D.rect(Math.floor(-M.width/2),Math.floor(-M.height/2),Math.floor(M.width),Math.floor(M.height))),D.fillStyle="#a86464",D.fill()}St({useOffscreen:r,offscreen:a,ctx:s})}},w=()=>{$(),n&&u.useNextFrame(()=>w())};u.useFrame(()=>{w()});let O=Z.watch("navigationIsOpen",u.useDebounce(D=>{if(D){F.pause(),R.pause(),n=!1;return}setTimeout(async()=>{m.getActiveRoute().route===i.route&&(F.resume(),R.resume(),n=!0,u.useFrame(()=>w()))},200)},200));return{destroy:()=>{O(),s=null,a=null,c=null,T=[],n=!1,P?.destroy?.(),k?.destroy?.(),A?.destroy?.(),F?.destroy?.(),R?.destroy?.(),_=null,C=null,M=null,o=null,P=null,k=null,A=null,F=null,R=null},play:()=>{F.play(),R.isActive()||R.play()},playReverse:()=>{F.playReverse(),R.isActive()||R.play()},playFromLabel:()=>{F.setTween("my-label",[k,A]).then(()=>{F.playFrom("my-label").then(()=>{console.log("resolve promise playFrom")})}),R.isActive()||R.play()},playFromLabelReverse:()=>{F.setTween("my-label",[k,A]).then(()=>{F.playFromReverse("my-label").then(()=>{console.log("resolve promise playFrom")})}),R.isActive()||R.play()},revertNext:()=>{F.reverseNext()},pause:()=>{F.pause(),R.pause()},resume:()=>{F.resume(),R.resume()},stop:()=>{F.stop(),R.stop()}}};function fk({buttons:e}){return Object.entries(e).map(([t,r])=>{let{label:o}=r;return g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn ${t}"
                >
                    ${o}
                </button>
            </li>`}).join("")}var H_=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s,delegateEvents:i})=>{let a=s();document.body.style.background=vt;let c={},l=()=>{};return e(({element:p})=>{let{canvas:d}=o();c=mp({canvas:d,...t()}),l=c.destroy;let f=u.useResize(()=>{l(),c=mp({canvas:d,...t()}),l=c.destroy,c?.play?.()});return Object.entries(a.buttons).forEach(([h,y])=>{let{method:b}=y;p.querySelector(`.${h}`)?.addEventListener("click",()=>c?.[b]())}),u.useFrame(()=>{a.isMounted=!0}),c?.play?.(),()=>{f(),l(),document.body.style.background=""}}),g`
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
                        ${fk({buttons:a.buttons})}
                    </ul>
                    <canvas ${r("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var gk={"js-async-timeline-play":{label:"play",method:"play"},"js-async-timeline-playReverse":{label:"play reverse",method:"playReverse"},"js-async-timeline-play-label":{label:"play from label",method:"playFromLabel"},"js-async-timeline-playReverse-label":{label:"play from label reverse",method:"playFromLabelReverse"},"js-async-timeline-pause":{label:"pause",method:"pause"},"js-async-timeline-resume":{label:"resume",method:"resume"},"js-async-timeline-revert-next":{label:"revert next",method:"revertNext"},"js-async-timeline-stop":{label:"stop",method:"stop"}},z_=m.createComponent({tag:"async-timeline",component:H_,props:{background:"",disableOffcanvas:()=>({value:!!(ht()||dt()),type:Boolean})},state:{isMounted:!1,controlsActive:()=>({value:!1,type:Boolean}),buttons:()=>({value:gk,type:"Any"})}});m.useComponent([z_]);var U_=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});return xe({active:!0,prevRoute:"#caterpillarN2",nextRoute:"#animatedPatternN0?version=0&activeId=0",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <async-timeline
            ${m.staticProps({background:e})}
        ></async-timeline>
    </div>`};var G_=({letter_d:e,letter_p:t,letter_r:r,letter_r_shadow:o,letter_d_shadow:n,letter_p_shadow:s,letter_r_pieces:i,letter_d_pieces:a,letter_p_pieces:c,letter_r_fill:l,letter_d_fill:p,letter_p_fill:d})=>[{props:{id:0,depth:200,anchorPoint:"center",classList:"",animate:!0},children:[{props:{id:0,depth:100,offsetX:"-2",offsetY:"-2",anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:e}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:n}}},children:[]},{props:{id:0,depth:40,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:a}}},children:[]},{props:{id:0,depth:100,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:p}}},children:[]},{props:{id:0,depth:-100,initialDepth:-1,offsetX:"-10",anchorPoint:"right",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:r}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:o}}},children:[]},{props:{id:0,depth:20,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:i}}},children:[]},{props:{id:0,depth:30,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:l}}},children:[]}]},{props:{id:0,depth:-100,initialDepth:-1,offsetX:"-10",anchorPoint:"right",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:t}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:s}}},children:[]},{props:{id:0,depth:20,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:c}}},children:[]},{props:{id:0,depth:30,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:d}}},children:[]}]}]}]}];m.useComponent([Zn,es,Cc]);var q_=async()=>{let{data:e}=await te({source:"./asset/svg/rdp.svg?v=0.4"}),{data:t}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"}),[r,o,n,s,i,a,c,l,p,d,f,h]=["letter_d","letter_r","letter_p","letter_r_shadow","letter_d_shadow","letter_p_shadow","letter_r_pieces","letter_d_pieces","letter_p_pieces","letter_r_fill","letter_d_fill","letter_p_fill"].map(y=>ts({svg:e,id:y}));return xe({active:!0,prevRoute:"",nextRoute:"#mob-01",backRoute:"#svg-overview"}),g`<div class="l-rdp-01">
        <div class="background-shape">${t}</div>
        <mouse-trail></mouse-trail>
        <move-3d
            ${m.staticProps({shape:G_({letter_d:r,letter_r:o,letter_p:n,letter_r_shadow:s,letter_d_shadow:i,letter_p_shadow:a,letter_r_pieces:c,letter_d_pieces:l,letter_p_pieces:p,letter_r_fill:d,letter_d_fill:f,letter_p_fill:h}),xDepth:100,yDepth:30,factor:20,xLimit:20,yLimit:20,drag:!0,perspective:1e3})}
        ></move-3d>
    </div>`};var J_=({screenElement:e,scrollerElement:t,layer02:r})=>{let o=qe.createParallax({item:r,align:"center",range:8,propierties:"x",ease:!1}),n=new Ct({screen:e,scroller:t,direction:"horizontal",drag:!0,useHorizontalScroll:!0,easeType:"lerp",breakpoint:"small",children:[o]});return n.init(),n.set(55),{destroy:()=>{n.destroy(),o.destroy(),n=null,o=null}}};var Y_=({getState:e,onMount:t,setRef:r,getRef:o})=>{let{layer02:n,layer03:s}=e();return t(()=>{let{screen:i,scroller:a,layer02:c}=o(),{destroy:l}=J_({screenElement:i,scrollerElement:a,layer02:c});return()=>{l()}}),g`<div class="mobbu2025">
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
    </div>`};var X_=m.createComponent({tag:"mobbu-2025",component:Y_,props:{layer02:()=>({value:"",type:String}),layer03:()=>({value:"",type:String})}});m.useComponent([X_]);var K_=async()=>{let{data:e}=await te({source:"./asset/svg/lettering-mob-2025-pure.svg?v=0.9"}),{data:t}=await te({source:"./asset/svg/lettering-mob.svg?v=1.4"}),[r,o]=["layer-02","layer-03"].map(n=>ts({svg:e,id:n}));return xe({active:!0,prevRoute:"#mob-01",nextRoute:"",backRoute:"#svg-overview"}),g`<div class="l-mob-02">
        <div class="background-shape">${t}</div>
        <h3 class="l-mob-02__title">Scroll or Drag</h3>
        <mobbu-2025
            ${ya({layer02:r,layer03:o})}
        ></mobbu-2025>
    </div>`};var Q_="TOP-LEFT",Z_="TOP-RIGHT",ex="BOTTOM-LEFT",tx="BOTTOM-RIGHT",rx="CENTER";var bk=e=>{let r=globalThis.getComputedStyle(e).transform;if(r==="none")return 0;let o=r.match(/matrix3d\(([^)]+)\)/);return o&&o[1].split(",").map(Number)[14]||0},ox=({align:e,root:t,child:r,containerClass:o,childrenClass:n,perspective:s,usePrespective:i,maxLowDepth:a=-200,maxHightDepth:c=200,onDepthChange:l=()=>{},depthFactor:p=30,hideThreshold:d=1})=>{let f=document.querySelector(o);f&&(f.style.cursor="grab");let h=[...f.querySelectorAll(n)],y=h.map(q=>{let Te=window.innerWidth,et=window.innerHeight,ut=q.offsetWidth,Et=q.offsetHeight,Ye=bk(q),is=s-s*ut/(Te*d)-Ye,Br=s-s*Et/(et*d)-Ye;return Math.min(is,Br)}),b=()=>{h.forEach((q,Te)=>{let et=S>y[Te];q.classList.toggle("hide",et)})},T=0,_=0,S=0,E=0,C=0,I=r.offsetWidth,M=r.offsetHeight,P=t.offsetWidth,k=t.offsetHeight,A=(I-P)/2,R=(M-k)/2,F={x:0,y:0},$=!1,w=!1,O=30,D=()=>{if(i&&s>0){let q=s/(s-S);A=(I-P/q)/2,R=(M-k/q)/2}else A=(I-P)/2,R=(M-k)/2};D();let x={xValue:0,yValue:0},N=z.createSpring({data:{x:0,y:0,z:0}});switch(e){case Q_:{x={xValue:A,yValue:R},_=I,T=M;break}case Z_:{x={xValue:-A,yValue:R},_=-I,T=M;break}case ex:{x={xValue:A,yValue:-R},_=I,T=-M;break}case tx:{x={xValue:-A,yValue:-R},_=-I,T=-M;break}}let L=N.subscribe(({x:q,y:Te,z:et})=>{r&&(r.style.transform=`translate3D(${q}px, ${Te}px, ${et}px)`)});N.set({x:x.xValue,y:x.yValue}),[...t.querySelectorAll("a, button")].forEach(q=>{q.setAttribute("draggable","false"),q.style.userSelect="none"});let j=({page:q})=>{$=!0,w=!0,F={x:q.x,y:q.y}},X=({page:q})=>{let{x:Te,y:et}=q,{xgap:ut,ygap:Et}=$?w?(w=!1,{xgap:0,ygap:0}):{xgap:Te-E,ygap:et-C}:{xgap:0,ygap:0},Ye=A>0?ce.clamp(_+ut,-A,A):ce.clamp(_+ut,A,-A),is=R>0?ce.clamp(T+Et,-R,R):ce.clamp(T+Et,R,-R),Br=$?Ye:_,Y=$?is:T,{xComputed:as,yComputed:je}=$?{xComputed:Br,yComputed:Y}:{xComputed:Te,yComputed:et};_=Br,T=Y,E=Te,C=et,$&&(x={xValue:as,yValue:je},N.goTo({x:as,y:je}).catch(()=>{}))},ue=u.useTouchStart(({page:q,target:Te})=>{j({page:q,target:Te})}),ye=u.useMouseDown(({page:q,target:Te})=>{j({page:q,target:Te})}),ee=u.useTouchEnd(()=>{$=!1}),pe=u.useMouseUp(()=>{$=!1}),he=u.useMouseMove(({page:q})=>{X({page:q})}),be=u.useTouchMove(({page:q})=>{X({page:q})});f&&f.addEventListener("click",q=>{let{x:Te,y:et}=F,ut=Math.abs(E-Te)>O,Et=Math.abs(C-et)>O;(ut||Et)&&q.preventDefault()},!1),i&&f&&f.addEventListener("wheel",q=>{let{spinY:Te}=u.normalizeWheel(q);S=ce.clamp(S+Te*p,a,c),D(),_=A>0?ce.clamp(_,-A,A):ce.clamp(_,A,-A),T=R>0?ce.clamp(T,-R,R):ce.clamp(T,R,-R),l({depth:S}),N.goTo({x:_,y:T,z:S}).catch(()=>{})},{passive:!0});let Ie=u.useMouseWheel(u.useDebounce(()=>{b()},100)),De=u.useResize(()=>{I=r.offsetWidth,M=r.offsetHeight,P=t.offsetWidth,k=t.offsetHeight,D()});return{destroy:()=>{L(),ue(),ee(),ye(),pe(),he(),be(),De(),Ie(),N.destroy(),N=null,f=null,h=null,t=null,r=null}}};var nx=({getProxi:e,setRef:t,getRef:r,bindEffect:o,onMount:n})=>{let s=e();return n(({element:i})=>{let{child:a}=r(),c=a.firstChild;if(!c)return;let l=ox({align:s.align,root:i,child:c,usePrespective:s.usePrespective,perspective:s.perspective,maxLowDepth:s.maxLowDepth,maxHightDepth:s.maxHightDepth,depthFactor:s.depthFactor,onDepthChange:s.onDepthChange,containerClass:s.containerClass,childrenClass:s.childrenClass,hideThreshold:s.hideThreshold});return s.afterInit({root:i}),()=>{l.destroy(),i.remove(),a.remove(),a=null,c=null,i=null}}),g`<div class="c-dragger ${s.rootClass}">
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
    </div>`};var sx=m.createComponent({tag:"c-dragger",component:nx,props:{rootClass:()=>({value:"",type:String}),childrenClass:()=>({value:"",type:String}),containerClass:()=>({value:"",type:String}),initialZoom:()=>({value:1,type:Number}),ease:()=>({value:!0,type:Boolean}),align:()=>({value:rx,type:String,transform:e=>e.toUpperCase()}),usePrespective:()=>({value:!0,type:Boolean}),perspective:()=>({value:600,type:Number}),hideThreshold:()=>({value:1,type:Number}),depthFactor:()=>({value:30,type:Number}),maxLowDepth:()=>({value:-200,type:Number}),maxHightDepth:()=>({value:200,type:Number}),afterInit:()=>({value:()=>{},type:Function}),onDepthChange:()=>({value:()=>{},type:Function})}});m.useComponent([sx,es]);var ix=!1,ax=async()=>{let{data:e}=await te({source:"./asset/svg/ms_nord_compact.svg?v=1.3"}),{data:t}=await te({source:"./asset/svg/lettering-mob.svg?v=1.3"});xe({active:!0,prevRoute:"#move3D-shape1",nextRoute:"#math-animation-01",backRoute:"#plugin-overview"});let r=g`
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
            ${m.staticProps({rootClass:"dragger-component",containerClass:".l-dragger",childrenClass:".dragger-child",align:"CENTER",maxHightDepth:140,maxLowDepth:-200,perspective:300,hideThreshold:10,afterInit:({root:n})=>{ix&&console.log(n)},onDepthChange:({depth:n})=>{ix&&console.log(n)}})}
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
    </div>`};var cx=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=(ne(t)-100)/2,s=3,i=2*Math.PI*s,a=0,c=(n-a)/i,l=1e3*s,p=e.map(b=>ne(b)/2),d=z.createSequencer({ease:"easeLinear",stagger:{each:6},data:{angleInRadian:0,scale:0}}).goTo({angleInRadian:i},{start:0,end:10,ease:"easeLinear"}).goTo({scale:1},{start:0,end:4,ease:"easeOutQuad"}).goTo({scale:0},{start:9,end:10,ease:"easeOutQuad"});e.forEach((b,T)=>{let _=b.firstChild;d.subscribeCache(b,({angleInRadian:S,scale:E})=>{let C=a+c*S,I=C*Math.cos(S),M=C*Math.sin(S);b.style.transform=`translate3D(0px,0px,0px) translate(${I-p[T]}px, ${M-p[T]}px)`,_&&(_.style.scale=`${E}`)})});let f=we.createSyncTimeline({repeat:-1,yoyo:!1,duration:l}).add(d);function h(){if(!o||!r)return;let b=r.width/2,T=r.height/2,_=200;o.clearRect(0,0,r.width,r.height),o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let S=0;S<=_;S++){let E=i/_*S,C=a+c*E,I=b+C*Math.cos(E),M=T+C*Math.sin(E);S===0?o.moveTo(I,M):o.lineTo(I,M)}o.stroke()}let y=u.useResize(()=>{r.width=r.clientWidth,r.height=r.clientHeight,h()});return h(),{play:()=>{f.play()},resume:()=>{f.resume()},stop:()=>{f.pause()},destroy:()=>{f.stop(),d.destroy(),f.destroy(),y(),o=null,d=null,f=null,e=null}}};var lx=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=z.createSpring({stagger:{each:6},data:{x:0}}),s=.06,i=ne(t)/2-100,a=e.map(h=>ne(h)/2);e.forEach((h,y)=>{n.subscribeCache(h,({x:b})=>{let T=Math.sin(b*s)*i,_=Math.cos(b*s)*i;h.style.transform=`translate3D(0px,0px,0px) translate(${T-a[y]}px, ${_-a[y]}px)`})}),n.set({x:0});let c=0,l=!1,p=()=>{let h=60/u.getFps();c+=h,n&&(n.goTo({x:c}).catch(()=>{}),l&&u.useNextFrame(()=>p()))};function d(){if(!o||!r)return;r.width=r.width;let h=r.width/2,y=r.height/2;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath(),o.arc(h,y,i,0,2*Math.PI),o.stroke()}let f=u.useResize(()=>{d()});return d(),{play:()=>{l||(l=!0,p())},resume:()=>{l||(l=!0,p())},stop:()=>{l=!1},destroy:()=>{n.destroy(),f(),o=null,n=null,e=null,c=null,l=null}}};var ux=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=e.map(h=>ne(h)/2),s=Fe(t)/2-100,i=ne(t),a=10,c=a/2/Math.PI,l=z.createSequencer({stagger:{each:5},data:{x:a/4,scale:0},duration:a}).goTo({x:a+a/4},{start:0,end:a,ease:"easeLinear"}).goTo({scale:1},{start:0,end:1.5,ease:"easeOutQuad"}).goTo({scale:0},{start:1.5,end:5,ease:"easeInQuad"}).goTo({scale:1},{start:5,end:8.5,ease:"easeOutQuad"}).goTo({scale:0},{start:8.5,end:10,ease:"easeInQuad"});e.forEach((h,y)=>{let b=h.firstChild;l.subscribeCache(h,({x:T,scale:_})=>{let S=T/c,E=2/(3-Math.cos(2*S)),C=E*Math.cos(S)*s,I=E*Math.sin(2*S)/2*i;h.style.transform=`translate3D(0px,0px,0px) translate(${C-n[y]}px, ${I-n[y]}px)`,b&&(b.style.scale=`${_}`)})});let p=we.createSyncTimeline({repeat:-1,yoyo:!1,duration:3e3}).add(l);function d(){if(!o||!r)return;r.width=r.width;let h=r.width/2,y=r.height/2,b=200;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let T=0;T<=b;T++){let _=T/b*2*Math.PI,S=2/(3-Math.cos(2*_)),E=S*Math.cos(_)*s,C=S*Math.sin(2*_)/2*i;T===0?o.moveTo(h+E,y+C):o.lineTo(h+E,y+C)}o.stroke()}let f=u.useResize(()=>{d()});return d(),{play:()=>{p.play()},resume:()=>{p.resume()},stop:()=>{p.pause()},destroy:()=>{p.stop(),l.destroy(),p.destroy(),f(),o=null,l=null,p=null,e=null}}};function vk(e,t,r,o=2e3){let n=0,s=e,i=0;for(let a=1;a<=o;a++){let c=r/o*a,l=e*Math.cos(t*c),p=l*Math.cos(c),d=l*Math.sin(c),f=p-s,h=d-i;n+=Math.hypot(f,h),s=p,i=d}return n}var px=(e,t)=>t===0?e:px(t,e%t);function yk(e,t){let r=px(e,t),o=t/r;return 2*Math.PI*o}var mx=({targets:e,container:t,canvas:r}={},...o)=>{let[n,s,i,a]=o;if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let c=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let l=(ne(t)-100)/2,p=n/s,d=yk(n,s),f=vk(l,p,d),h=i*(f/l),y=e.map(P=>ne(P)/2),b=z.createSequencer({ease:"easeLinear",stagger:{each:a},data:{angleInRadian:0,scale:1}}).goTo({angleInRadian:d},{start:0,end:10,ease:"easeLinear"}),T=[],_=0,S=0;for(;S<d&&d>0&&p>0;)S=(Math.PI/2+_*Math.PI)/p,S>=0&&T.push(S),_++;let E=0;T.forEach(P=>{let k=P/d*10,A=Math.abs((k-E)/2);E=k;let R=Math.max(0,k-A),F=k,$=Math.min(10,k+A);$>R&&(b.goTo({scale:0},{start:R,end:F,ease:"easeInQuad"}),b.goTo({scale:1},{start:F,end:$,ease:"easeOutQuad"}))}),e.forEach((P,k)=>{let A=P.firstChild;b.subscribeCache(P,({angleInRadian:R,scale:F})=>{let $=l*Math.cos(p*R),w=$*Math.cos(R),O=$*Math.sin(R);P.style.transform=`translate3D(0px,0px,0px) translate(${w-y[k]}px, ${O-y[k]}px)`,A&&(A.style.scale=`${F}`)})});let C=we.createSyncTimeline({repeat:-1,yoyo:!1,duration:h}).add(b);function I(){if(!c||!r)return;let P=r.width/2,k=r.height/2,A=2e3*s;c.clearRect(0,0,r.width,r.height),c.setLineDash([3,7]),c.lineDashOffset=3,c.strokeStyle="rgba(0, 0, 0, 0.5)",c.lineWidth=1,c.beginPath();for(let R=0;R<=A;R++){let F=d/A*R,$=l*Math.cos(p*F),w=P+$*Math.cos(F),O=k+$*Math.sin(F);R===0?c.moveTo(w,O):c.lineTo(w,O)}c.stroke()}let M=u.useResize(()=>{r.width=r.clientWidth,r.height=r.clientHeight,I()});return I(),{play:()=>{C.play()},resume:()=>{C.resume()},stop:()=>{C.pause()},destroy:()=>{C.stop(),b.destroy(),C.destroy(),M(),c=null,b=null,C=null,e=null}}};var dx=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=Fe(t)-200,s=ne(t)/3,i=2,a=n/(2*Math.PI*i),c=1500*i,l=e.map(y=>ne(y)/2),p=z.createSequencer({ease:"easeLinear",stagger:{each:6},data:{x:0,scale:0}}).goTo({x:n},{start:0,end:10,ease:"easeLinear"}).goTo({scale:1},{start:0,end:10/i/2,ease:"easeOutQuad"}).goTo({scale:0},{start:10-10/i/2,end:10,ease:"easeOutQuad"});e.forEach((y,b)=>{let T=0,_=y.firstChild,S=-l[b]-n/2;p.subscribeCache(y,({x:E,scale:C})=>{let I=Math.sign(E-T)||1,M=Math.sin(E/a)*s*I;y.style.transform=`translate3D(0px,0px,0px) translate(${E+S}px, ${M-l[b]}px)`,_&&(_.style.scale=`${C}`),T=E})});let d=we.createSyncTimeline({repeat:-1,yoyo:!0,duration:c}).add(p);function f(){if(!o||!r)return;r.width=r.width;let y=r.width/2,b=r.height/2,T=200,_=T*2;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let S=0;S<=_;S++){let{x:E,y:C}=(()=>{if(S<=T){let I=S/T*n,M=Math.sin(I/a)*s;return{x:I,y:M}}if(S>T){let M=(_-S)/T*n,P=Math.sin(M/a)*s*-1;return{x:M,y:P}}return{x:0,y:0}})();S===0?o.moveTo(y+E-n/2,b+C):o.lineTo(y+E-n/2,b+C)}o.stroke()}let h=u.useResize(()=>{f()});return f(),{play:()=>{d.play()},resume:()=>{d.resume()},stop:()=>{d.pause()},destroy:()=>{d.stop(),p.destroy(),d.destroy(),h(),o=null,p=null,d=null,e=null}}};var dp={sin:dx,circle:lx,infinite:ux,archimede:cx,rosaDiGrandi:mx};var hx=()=>({play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}});var fx=({getProxi:e,setRef:t,getRef:r,getRefs:o,delegateEvents:n,onMount:s})=>{let i=e(),a=i.showNavigation?"active":"",c=3,l=c/i.numberOfStaggers,p=Array.from({length:i.numberOfStaggers}).map((T,_)=>({size:c-l*_,opacity:1/_})),d=hx(),{destroy:f,play:h,stop:y,resume:b}=d;return s(({element:T})=>{let{target:_}=o(),{canvas:S}=r();u.useFrame(()=>{({destroy:f,play:h,stop:y,resume:b}=dp[i.name]({targets:_,container:T,canvas:S},...i.args)),h()});let E=u.useResize(()=>{y(),f(),{destroy:f,play:h,stop:y,resume:b}=dp[i.name]({targets:_,container:T,canvas:S},...i.args),h()});return()=>{f(),E(),f=null,h=null,y=null,b=null}}),g`<div class="c-math">
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
    </div>`};var Ec=m.createComponent({tag:"math-animation",component:fx,props:{name:()=>({value:"",type:String}),showNavigation:()=>({value:!0,type:Boolean}),numberOfStaggers:()=>({value:5,type:Number}),args:()=>({value:[],type:Array})}});m.useComponent([Ec]);var gx=async({props:e})=>{let{names:t}=e;return t.length>4&&console.warn("math layout, max item excedded"),xe({active:!0,prevRoute:"#plugin-dragger",nextRoute:"#rosa-di-grandi",backRoute:"#plugin-overview"}),g`<div class="l-math">
        ${t.map(r=>g`<div class="l-math__item">
                    <math-animation
                        ${m.staticProps({name:r})}
                    ></math-animation>
                </div>`).join("")}
    </div>`};var Tk=({proxi:e,delegateEvents:t,bindObject:r})=>g`
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
    `,bx=({getProxi:e,delegateEvents:t,invalidate:r,bindEffect:o,getRef:n,setRef:s,bindObject:i})=>{let a=e();return g`<div class="l-rosa">
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
            ${Tk({proxi:a,getRef:n,setRef:s,delegateEvents:t,bindObject:i})}
        </ul>
        <div class="l-rosa__wrap">
            ${r({observe:[()=>a.numerators,()=>a.denominator],render:()=>g`
                        <math-animation
                            ${m.staticProps({name:"rosaDiGrandi",showNavigation:!1,numberOfStaggers:10,args:[a.numerators,a.denominator,a.duration,a.staggerEach]})}
                        ></math-animation>
                    `})}
        </div>
    </div>`};var vx=m.createComponent({tag:"rosa-di-grandi-page",component:bx,state:{numerators:()=>({value:2,type:Number}),denominator:()=>({value:3,type:Number}),numeratorsLabel:()=>({value:2,type:Number}),denominatorLabel:()=>({value:3,type:Number}),duration:()=>({value:500,type:Number}),staggerEach:()=>({value:4,type:Number}),controlsActive:()=>({value:!1,type:Boolean})},child:[Ec]});m.useComponent([vx]);var yx=async()=>(xe({active:!0,prevRoute:"#math-animation-01",nextRoute:"",backRoute:"#plugin-overview"}),g`<rosa-di-grandi-page></rosa-di-grandi-page>`);var fp="home",Ic="about",K="template-mobJs-component",Ne="template-doc-default",rs="template-listing",lt="template-animation",_t="template-test",Mc=new Set([K,Ne]),se=[{url:"./#mobJs-overview",title:"mobJs"},{url:"./#mobJs-component",title:"component"}],Je=[{url:"./#mobJs-overview",title:"mobJs"}],hp=[{url:"./#mobCore-overview",title:"mobCore"}],Fr=[{url:"./#mobMotion-overview",title:"mobMotion"}],wc=[{label:"store",url:"#mobCore-store"},{label:"events",url:"#mobCore-events"},{label:"defaults",url:"#mobCore-defaults"}],J=[{label:"initialization",url:"#mobJs-initialization"},{label:"component",url:"#mobJs-component"},{label:"routing",url:"#mobJs-routing"},{label:"tick",url:"#mobJs-tick"},{label:"memory management",url:"#mobJs-memory-management"},{label:"utils",url:"#mobJs-utils"},{label:"debug",url:"#mobJs-debug"}],hr=[{label:"tween/spring/lerp",url:"#mobMotion-tween-spring-lerp"},{label:"AsyncTimeline",url:"#mobMotion-async-timeline"},{label:"sequencer",url:"#mobMotion-sequencer"},{label:"SyncTimeline",url:"#mobMotion-sync-timeline"},{label:"CreateStagger",url:"#mobMotion-create-stagger"},{label:"ScrollTrigger",url:"#mobMotion-scrolltrigger"},{label:"Parallax",url:"#mobMotion-parallax"},{label:"Stagger",url:"#mobMotion-stagger"},{label:"Default",url:"#mobMotion-defaults"}],kc=[{hash:"pageNotFound",layout:Py,props:{}},{hash:"onlyDesktop",layout:j_,props:{}},{hash:"about",layout:WT,templateName:Ic,props:{}},{hash:"canvas-overview",layout:Xa,templateName:rs,props:{source:"./data/canvas/data.json"}},{hash:"animatedPatternN0",layout:cS,templateName:lt,props:{}},{hash:"animatedPatternN1",layout:pS,templateName:lt,props:{}},{hash:"caterpillarN1",layout:fS,templateName:lt,props:{}},{hash:"caterpillarN2",layout:yS,templateName:lt,props:{}},{hash:"async-timeline",layout:U_,templateName:lt,props:{}},{hash:"scrollerN0",layout:_S,templateName:lt,props:{}},{hash:"scrollerN1",layout:wS,templateName:lt,props:{}},{hash:"dynamic-list",layout:zS,templateName:_t,skipTransition:!0,props:{source:"./data/mob-js/general-repeat-test.json",breadCrumbs:Je,title:"( test ) repeat & invalidate",section:"mobJs"}},{hash:"matrioska-repeat",layout:a_,templateName:_t,skipTransition:!0,props:{source:"./data/mob-js/matrioska.json",breadCrumbs:Je,title:"( test ) matrioska repeat",section:"mobJs"}},{hash:"matrioska-invalidate",layout:c_,templateName:_t,skipTransition:!0,props:{source:"./data/mob-js/matrioska.json",breadCrumbs:Je,title:"( test ) matrioska invalidate",section:"mobJs"}},{hash:"home",layout:JS,templateName:fp,props:{}},{hash:"mobCore-overview",layout:$e,skipTransition:!0,templateName:Ne,props:{source:"./data/mob-core/overview.json",title:"mobCore",breadCrumbs:[],section:"mobCore",rightSidebar:wc}},{hash:"mobCore-defaults",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-core/defaults.json",title:"Defaults",breadCrumbs:hp,section:"mobCore",rightSidebar:wc}},{hash:"mobCore-events",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-core/events.json",title:"Events",breadCrumbs:hp,section:"mobCore",rightSidebar:wc}},{hash:"mobCore-store",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-core/store.json",title:"Store",breadCrumbs:hp,section:"mobCore",rightSidebar:wc}},{hash:"mobJs-overview",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/overview.json",title:"mobJs",breadCrumbs:[],section:"mobJs",rightSidebar:J}},{hash:"mobJs-initialization",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/initialization.json",title:"initialization",breadCrumbs:Je,section:"mobJs",rightSidebar:J}},{hash:"mobJs-component",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/component.json",title:"component",breadCrumbs:Je,section:"mobJs",rightSidebar:J}},{hash:"mobJs-routing",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/routing.json",title:"routing",breadCrumbs:Je,section:"mobJs",rightSidebar:J}},{hash:"mobJs-benchmark-invalidate",layout:Dr,templateName:_t,skipTransition:!0,props:{rootComponent:"benchmark-invalidate",breadCrumbs:Je,source:"./data/mob-js/benchmark-invalidate.json",title:"( test ) benchmark invalidate",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-key",layout:Dr,templateName:_t,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-key",breadCrumbs:Je,source:"./data/mob-js/benchmark-repeat-without-key.json",title:"( test ) benchmark repeat without key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key",layout:Dr,templateName:_t,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key",breadCrumbs:Je,source:"./data/mob-js/benchmark-repeat-key.json",title:"( test ) benchmark repeat key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-component-no-key",layout:Dr,templateName:_t,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-component-no-key",breadCrumbs:Je,source:"./data/mob-js/benchmark-repeat-no-component-no-key.json",title:"( test ) benchmark repeat no component no key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-component-with-key",layout:Dr,templateName:_t,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-component-with-key",breadCrumbs:Je,source:"./data/mob-js/benchmark-repeat-no-component-with-key.json",title:"( test ) benchmark repeat no component with key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-key-nested",layout:Dr,templateName:_t,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key-no-nested",breadCrumbs:Je,source:"./data/mob-js/benchmark-repeat-without-key-nested.json",title:"( test ) benchmark repeat nested without key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key-nested",layout:Dr,templateName:_t,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key-nested",breadCrumbs:Je,source:"./data/mob-js/benchmark-repeat-key-nested.json",title:"( test ) benchmark repeat nested with key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key-bind-store",layout:Dr,templateName:_t,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-key-bind-store",breadCrumbs:Je,source:"./data/mob-js/benchmark-repeat-external.json",title:"( test ) benchmark repeat bindStore",section:"mobJs"}},{hash:"mobJs-tick",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/tick.json",title:"tick",breadCrumbs:Je,section:"mobJs",rightSidebar:J}},{hash:"mobJs-utils",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/utils.json",title:"utils",breadCrumbs:Je,section:"mobJs",rightSidebar:J}},{hash:"mobJs-memory-management",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/memory-management.json",title:"memory management",breadCrumbs:Je,section:"mobJs",rightSidebar:J}},{hash:"mobJs-debug",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/debug.json",title:"debug",breadCrumbs:Je,section:"mobJs",rightSidebar:J}},{hash:"mobJs-onMount",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/on-mount.json",title:"onMount",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-getState",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/get-state.json",title:"getState",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-setState",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/set-state.json",title:"setState",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-updateState",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/update-state.json",title:"updateState",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-getProxi",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/get-proxi.json",title:"getProxi",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-watch",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/watch.json",title:"watch",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-staticProps",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/static-props.json",title:"staticProps",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-dataAttribute",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/data-attribute.json",title:"dataAttribute",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-bindProps",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/bind-props.json",title:"bindProps",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-bindEvents",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/bind-events.json",title:"bindEvents",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-delegateEvents",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/delegate-events.json",title:"delegateEvents",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-bindtext",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/bind-text.json",title:"bindText",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-bindObject",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/bind-object.json",title:"bindObject",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-bind-effect",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/bind-effect.json",title:"bindEffect",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-methods",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/methods.json",title:"add methods",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-useMethodByName",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/use-method-by-name.json",title:"useMethodByName",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-useMethodArrayByName",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/use-method-array-by-name.json",title:"useMethodArrayByName",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-setStateByName",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/set-state-by-name.json",title:"setStateByName",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-updateStateByName",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/update-state-by-name.json",title:"updateStateByName",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-refs",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/refs.json",title:"refs",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-runtime",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/runtime.json",title:"renderComponent",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-repeat",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/repeat.json",title:"repeat",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-invalidate",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/invalidate.json",title:"invalidate",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-invalidate-vs-repeater",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/invalidate-vs-repeater.json",title:"invalidate vs repeater",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-web-component",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/web-component.json",title:"webComponent",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-slot",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/slot.json",title:"slot",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-unBind",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/unbind.json",title:"unBind",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-emit",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/emit.json",title:"emit",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-emitAsync",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/emit-async.json",title:"emitAsync",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-computed",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/computed.json",title:"computed",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-bindStore",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/bind-store.json",title:"bindStore",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-removeDom",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/remove-dom.json",title:"removeDom",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-remove",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/remove.json",title:"remove",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-getChildren",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/get-children.json",title:"getChildren",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-freezeProp",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/freeze-prop.json",title:"freezeProp",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-unFreezeProp",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/unfreeze-prop.json",title:"unFreezeProp",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-getParentId",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/get-parent-id.json",title:"getParentId",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-watchParent",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/watch-parent.json",title:"watchParent",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-instanceName",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/instance-name.json",title:"instanceName",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobJs-class-list",templateName:K,layout:oe,skipTransition:!0,props:{source:"./data/mob-js/class-list.json",title:"classList",breadCrumbs:se,section:"mobJs",rightSidebar:J}},{hash:"mobMotion-stagger",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/stagger.json",title:"Stagger",breadCrumbs:Fr,section:"mobMotion",rightSidebar:hr}},{hash:"mobMotion-defaults",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/defaults.json",title:"Defaults",breadCrumbs:Fr,section:"mobMotion",rightSidebar:hr}},{hash:"mobMotion-overview",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/overview.json",title:"mobMotion",breadCrumbs:[],section:"mobMotion",rightSidebar:hr}},{hash:"mobMotion-parallax",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/parallax.json",title:"Parallax",breadCrumbs:Fr,section:"mobMotion",rightSidebar:hr}},{hash:"mobMotion-sequencer",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/sequencer.json",title:"Sequencer",breadCrumbs:Fr,section:"mobMotion",rightSidebar:hr}},{hash:"mobMotion-scrolltrigger",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/scroll-trigger.json",title:"ScrollTrigger",breadCrumbs:Fr,section:"mobMotion",rightSidebar:hr}},{hash:"mobMotion-sync-timeline",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/sync-timeline.json",title:"Synctimeline",breadCrumbs:Fr,section:"mobMotion",rightSidebar:hr}},{hash:"mobMotion-create-stagger",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/create-stagger.json",title:"CreateStagger",breadCrumbs:Fr,section:"mobMotion",rightSidebar:hr}},{hash:"mobMotion-async-timeline",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/async-timeline.json",title:"Asynctimeline",breadCrumbs:Fr,section:"mobMotion",rightSidebar:hr}},{hash:"mobMotion-tween-spring-lerp",layout:$e,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/tween-spring-lerp.json",title:"TimeTween Spring Lerp",breadCrumbs:Fr,section:"mobMotion",rightSidebar:hr}},{hash:"horizontalScroller",layout:y_,templateName:lt,restoreScroll:!1,props:{source:"./data/plugin/horizontal-scroller.json",title:"HorizontalScroller"}},{hash:"move3D-shape1",templateName:lt,layout:R_,props:P_.shape1},{hash:"plugin-dragger",layout:ax,templateName:lt,props:{}},{hash:"math-animation-01",layout:gx,templateName:lt,props:{names:["circle","sin","infinite","archimede"]}},{hash:"rosa-di-grandi",layout:yx,templateName:lt,props:{}},{hash:"plugin-overview",layout:Xa,templateName:rs,props:{source:"./data/plugin/data.json"}},{hash:"svg-overview",layout:Xa,templateName:rs,props:{source:"./data/svg/data.json"}},{hash:"mob-01",layout:D_,templateName:lt,props:{}},{hash:"mob-02",layout:K_,templateName:lt,props:{}},{hash:"rdp-01",layout:q_,templateName:lt,props:{}}];var Tx=0;m.beforeRouteChange(()=>{Tx=window.scrollY});var Sk=new Set([K,Ne,rs,Ic,_t]),_k=new Set([K,Ne,rs,Ic,fp,_t]),Sx=async({oldNode:e,oldTemplateName:t})=>{e.classList.remove("current-route"),e.classList.add("fake-content"),e.style.position="fixed",e.style.zIndex="10",e.style.top=Sk.has(t)?"var(--header-height)":"0",e.style.left=_k.has(t)?"calc(var(--header-height)/2)":"0",e.style.right="0",e.style.transform=`translateY(-${Tx}px)`,e.style.minHeight="calc(100vh - var(--header-height) - var(--footer-height))"},_x=async({oldNode:e,newNode:t,oldRoute:r,newRoute:o})=>{if(r===o)return;let n=m.getRoot();n.style.pointerEvents="none",t.style.opacity="0";let s=z.createTimeTween({data:{opacity:1},duration:200}),i=z.createTimeTween({data:{opacity:0},duration:300});s.subscribe(({opacity:c})=>{e.style.opacity=c}),i.subscribe(({opacity:c})=>{t.style.opacity=c});let a=we.createAsyncTimeline({repeat:1}).createGroup({waitComplete:!0}).goTo(s,{opacity:0}).goTo(i,{opacity:1}).closeGroup();await a.play(),a.destroy(),a=null,t.style.removeProperty("opacity"),t.classList.add("current-route"),u.useFrameIndex(()=>{n.style.pointerEvents=""},10)};var xx=()=>{let e=window.innerWidth-document.documentElement.clientWidth;document.documentElement.style.setProperty("--scrollbar-with",`${e}px`)},Cx=()=>{xx(),u.useResize(()=>{xx()})};var ci=!0,xk=({proxi:e,emit:t})=>{e.selectedNodes.forEach(r=>{let o=e.linkedList.find(n=>n.data.id===r);o&&(e.linkedList=e.linkedList.removeNode(o),e.currentNode=null,t(()=>e.currentNode)),o=null}),e.selectedNodes.clear(),t(()=>e.selectedNodes)},Ex=({proxi:e,emit:t,direction:r="up"})=>{e.selectedNodes.forEach(o=>{let n=e.linkedList.find(s=>s.data.id===o);n&&r==="up"&&n?.prev&&e.linkedList.moveBefore(n,n.prev),n&&r==="down"&&n?.next&&e.linkedList.moveAfter(n,n.next),n=null}),t(()=>e.linkedList)},Ck=({proxi:e,emit:t})=>{if(e.selectedNodes.size!==2)return;let r=e.selectedNodes[Symbol.iterator](),o=r.next().value,n=r.next().value,s=e.linkedList.find(a=>a.data.id===o),i=e.linkedList.find(a=>a.data.id===n);!s||!i||(e.linkedList.swap(s,i),t(()=>e.linkedList),s=null,i=null)},Ek=({proxi:e,delegateEvents:t,bindEffect:r,emit:o})=>{let n=ft().close,s=ft().previous,i=ft().up,a=ft().swap,c=ft().selectAll;return g`
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
                    ${t({click:()=>{xk({proxi:e,emit:o}),e.selectAllOn=!1}})}
                >
                    ${n}
                </button>
            </li>
            <li class="c-custom-history__up">
                <button
                    type="button"
                    ${r({toggleClass:{active:()=>e.selectedNodes.size===1}})}
                    ${t({click:()=>{Ex({emit:o,proxi:e,direction:"up"})}})}
                >
                    ${i}
                </button>
            </li>
            <li class="c-custom-history__down">
                <button
                    type="button"
                    ${r({toggleClass:{active:()=>e.selectedNodes.size===1}})}
                    ${t({click:()=>{Ex({emit:o,proxi:e,direction:"down"})}})}
                >
                    ${i}
                </button>
            </li>
            <li class="c-custom-history__swap">
                <button
                    type="button"
                    ${r({toggleClass:{active:()=>e.selectedNodes.size===2}})}
                    ${t({click:()=>{Ck({proxi:e,emit:o})}})}
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
    `},wx=({getProxi:e,computed:t,repeat:r,bindEffect:o,addMethod:n,staticProps:s,delegateEvents:i,bindProps:a,watch:c,emit:l})=>{let p=e();return c(()=>p.currentNode,d=>{m.loadUrl({url:d?.data.url,params:d?.data?.params,skipTransition:!0})}),t(()=>p.listParsed,()=>p.linkedList.toArray()),n("toggle",()=>{p.active=!p.active}),n("addRouteWithoutUpdate",({id:d})=>{p.currentNode=p.linkedList.find(f=>f.data.id===d),ci=!1,p.active=!1}),n("addSelectedNodes",({id:d,add:f})=>{f?p.selectedNodes.add(d):p.selectedNodes.delete(d),l(()=>p.selectedNodes)}),m.afterRouteChange(()=>{let d=m.getActiveParams(),f=m.getActiveRoute()?.route;if(ci&&f!==p.currentNode?.data.url){if(p.linkedList.size>=20){let h=p.linkedList.first;h&&(p.selectedNodes.delete(h.data.id),l(()=>p.selectedNodes)),p.linkedList.removeFirst(),h=null}p.currentNode&&(p.linkedList=p.linkedList.insertAfter(p.currentNode,{id:u.getUnivoqueId(),url:f,params:d}),p.currentNode=p.currentNode.next),p.currentNode||(p.linkedList=p.linkedList.addLast({id:u.getUnivoqueId(),url:f,params:d}),p.currentNode=p.linkedList.last)}ci=!0}),g`
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
            ${Ek({proxi:p,delegateEvents:i,bindEffect:o,emit:l})}
            <div class="c-custom-history__container">
                ${r({observe:()=>p.listParsed,key:"id",render:({current:d})=>g`<history-item
                            ${s({id:d.value.id,url:d.value.url})}
                            ${a(()=>({active:p.currentNode?.data.id===d.value.id,forceSelect:p.selectAllOn}))}
                        ></history-item>`})}
            </div>
        </div>
    `};var Ix=()=>{mn(qn)?.toggle()},Mx=({id:e})=>{mn(qn)?.addRouteWithoutUpdate({id:e})},kx=({id:e,add:t})=>{mn(qn)?.addSelectedNodes({id:e,add:t})};function wk(e="",t=30){return e.length>t?`${e.slice(0,Math.max(0,t))} ...`:e}var Rx=({getProxi:e,delegateEvents:t,bindEffect:r,watch:o})=>{let n=e();return o(()=>n.checked,s=>{kx({id:n.id,add:s})}),o(()=>n.forceSelect,s=>n.checked=s),g`<div class="c-history-item">
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
            ${t({click:()=>{Mx({id:n.id})}})}
            ${r({toggleClass:{active:()=>n.active}})}
        >
            ${wk(n.url)}
        </button>
    </div>`};var Nx=m.createComponent({tag:"history-item",component:Rx,props:{id:()=>({value:"",type:String}),url:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean}),forceSelect:()=>({value:!1,type:Boolean})},state:{checked:()=>({value:!1,type:Boolean})}});var Px=m.createComponent({tag:"custom-history",component:wx,state:{linkedList:()=>({value:new on,type:"any",skipEqual:!1}),listParsed:()=>({value:[],type:Array,skipEqual:!1}),currentNode:()=>({value:void 0,type:"any",skipEqual:!1}),selectedNodes:()=>({value:new Set,type:Set,skipEqual:!1}),active:()=>({value:!1,type:Boolean}),selectAllOn:()=>({value:!1,type:Boolean})},child:[Nx]});var os="reset",fr="tree",li="filter_component";var gr=({screen:e,scroller:t,scrollbar:r})=>{let o;return{init:()=>{o||(o=new Ct({screen:e,scroller:t,direction:"vertical",drag:!0,scopedEvent:!1,breakpoint:"desktop",onTick:({percent:n})=>{r.value=`${n}`},afterRefresh:({shouldScroll:n})=>{r?.classList.toggle("hide-scrollbar",!n)}}),o.init())},destroy:()=>{o?.destroy(),o=null},refresh:()=>{o?.refresh()},updateScroller:()=>{if(!o)return;let n=ne(t),s=ne(e),i=Fe(r),a=s/n*i;r.style.setProperty("--thumb-width",`${a}px`),o?.refresh()},move:n=>{o&&o.move(n).catch(()=>{})},goToTop:()=>{o?.set(0)}}};var ns=u.createStore({currentId:()=>({value:"",type:String})});var Ax=e=>e?[...e].reduce((t,r)=>`${t}.${r}`,""):"",Ox=e=>Object.keys(e).reduce((t,r)=>`${t} ${r},`,""),Ik=e=>Object.entries(e).map(([t,r])=>g`<div>
                <strong>${t}:</strong>
                ${r.map(o=>g`${o}, `).join(".")}
            </div>`).join(""),Mk=e=>e?e.map(t=>`${t}, `).join(""):"",$x=e=>Object.entries(e).map(([t,r])=>g`<div>
                <strong>${t}:</strong>
                ${JSON.stringify(r)}
            </div>`).join(""),kk=({getState:e})=>{let{id:t}=e();if(t===os)return"";let r=m.componentMap.get(t);return r?g`<div>
        <!-- Basic props -->
        <div><strong>id</strong>: ${t}</div>
        <div><strong>parent id</strong>: ${r.parentId}</div>
        <div>
            <strong>component root</strong>:
            ${r.element.tagName}${Ax(r.element.classList)}
        </div>
        <div><strong>componentName</strong>: ${r.componentName}</div>
        <div><strong>instance name:</strong>: ${r.instanceName}</div>
        <div><strong>methods:</strong>: ${Ox(r.methods)}</div>
        <div><strong>refs:</strong>: ${Ox(r.refs)}</div>
        <div><strong>persistent:</strong>: ${r.persistent}</div>

        <!-- Children -->
        <h3 class="c-debug-component__section-title">Children:</h3>
        <div>${Ik(r?.child??{})}</div>

        <!-- Repeater -->
        <h3 class="c-debug-component__section-title">Repeater props:</h3>
        <div>
            <strong>component repeater id</strong>: ${r.componentRepeatId}
        </div>
        <div><strong>repeater state bind</strong>: ${r.repeatPropBind}</div>
        <div>
            <strong>repeater inner wrapper</strong>:
            ${r?.repeaterInnerWrap?.tagName}${Ax(r?.repeaterInnerWrap?.classList)}
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
            ${Mk(r?.freezedPros)}
        </div>
        <div>
            <h4 class="c-debug-component__section-subtitle">
                States current values:
            </h4>
            ${$x(r.state.get())}
        </div>
        <div>
            <h4 class="c-debug-component__section-subtitle">
                States current validation:
            </h4>
            ${$x(r.state.getValidation())}
        </div>
    </div>`:"component not found"},Rk=({getRef:e})=>{let{screen:t,scroller:r,scrollbar:o}=e();o.addEventListener("input",()=>{c(o.value)});let n=gr({screen:t,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},Lx=({onMount:e,addMethod:t,getState:r,invalidate:o,setRef:n,getRef:s,watch:i,getProxi:a,emit:c})=>{let l=a();t("updateId",d=>{l.id=d,ns.set("currentId",d)}),t("refreshId",()=>{c(()=>l.id)});let p;return e(()=>{let{destroy:d,updateScroller:f,move:h,refresh:y}=Rk({getRef:s});return p=h,i(()=>l.id,async()=>{await m.tick(),y(),f(),p(0)}),()=>{d?.()}}),g`<div class="c-debug-component" ${n("screen")}>
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
            ${o({observe:()=>l.id,render:()=>kk({getState:r})})}
        </div>
    </div>`};var Dx=m.createComponent({tag:"debug-component",component:Lx,state:{id:()=>({value:os,type:String,skipEqual:!1})}});var Fx=e=>{m.useMethodByName(nc)?.refreshList?.({testString:e})};var gp=async(e="")=>{await m.tick(),Fx(e)},Bx=({onMount:e,setRef:t,getRef:r,delegateEvents:o})=>(e(()=>(gp(),()=>{r()?.input.remove()})),g`<div class="c-debug-filter-head">
        <span class="c-debug-filter-head__title">Filter by tag</span>
        <input
            type="text"
            class="c-debug-filter-head__input"
            value=""
            ${t("input")}
            ${o({keydown:n=>{if(n.code.toLowerCase()==="enter"){n.preventDefault();let s=n.target.value;gp(s)}}})}
        />
        <button
            class="c-debug-filter-head__button"
            type="button"
            ${o({click:()=>{let{input:n}=r(),s=n.value;gp(s)}})}
        >
            find
        </button>
    </div>`);var Vx=m.createComponent({tag:"debug-filter-head",component:Bx});var Nk=async({getRef:e})=>{await m.tick();let{screen:t,scroller:r,scrollbar:o}=e(),n=gr({screen:t,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},Wx=e=>`~${e}`,Pk=({testString:e})=>{let t=e.replaceAll("~","").split(" ").filter(r=>r!=="")??"";return(()=>{let r=[];for(let o of m.componentMap.values())t.every(s=>o.componentName.includes(s))&&r.push(o);return r})().map(({id:r,componentName:o,instanceName:n})=>({id:r,active:!1,tag:(()=>{let s=t.reduce((i,a,c)=>i.replaceAll(new RegExp(`(?<!~)${a.toLowerCase()}`,"g"),`${Wx(c)}`),o);return t.reduce((i,a,c)=>i.replaceAll(`${Wx(c)}`,`<span class="match-string">${a}</span>`),s)})(),name:n}))},jx=({onMount:e,setRef:t,getRef:r,addMethod:o,repeat:n,staticProps:s,bindProps:i,bindEffect:a,getProxi:c,computed:l})=>{let p=c(),d=()=>{},f=()=>{},h=()=>{},y=()=>{};return l(()=>p.noResult,()=>p.data.length===0&&!p.isLoading),o("refreshList",async({testString:b})=>{p.isLoading=!0,await m.tick(),u.useNextTick(async()=>{p.data=Pk({testString:b}),await m.tick(),h?.(),y?.(),p.isLoading=!1})}),e(()=>{let{scrollbar:b}=r();return b.addEventListener("input",()=>{f(b.value)}),(async()=>({destroy:d,move:f,refresh:h,updateScroller:y}=await Nk({getRef:r})))(),()=>{d?.(),d=()=>{},h=()=>{},y=()=>{},f=()=>{}}}),g`
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
    `};var br=e=>{m.useMethodByName(Ks)?.updateId(e)},Hx=()=>{m.useMethodByName(Ks)?.refreshId()};var zx=({delegateEvents:e,bindText:t,bindEffect:r,getProxi:o,computed:n})=>{let s=o();return n(()=>s.active,()=>s.id===s.currentId),g`
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
                ${e({click:()=>{br(s.id)}})}
            >
                [ > ]
            </button>
            <span
                class="c-debug-tree-item__selected"
                ${r({toggleClass:{active:()=>s.active}})}
            ></span>
        </div>
    `};var Ux=m.createComponent({tag:"debug-filter-list-item",component:zx,bindStore:ns,props:{id:()=>({value:"",type:String}),tag:()=>({value:"",type:String}),name:()=>({value:"",type:String})},state:{active:()=>({value:!1,type:Boolean})}});var Gx=m.createComponent({tag:"debug-filter-list",component:jx,state:{data:()=>({value:[],type:Array}),isLoading:()=>({value:!0,type:Boolean}),noResult:()=>({value:!1,type:Boolean})},child:[Ux]});var qx=({invalidate:e,getProxi:t})=>{let r=t();return g`<div class="c-debug-head">
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
    </div>`};var Jx=({setRef:e,getRef:t,delegateEvents:r})=>g`<div class="c-debug-search">
        <div>
            <span class="c-debug-search__label">
                <strong>Search by ID:</strong>
            </span>
            <input
                class="c-debug-search__input"
                type="text"
                ${e("id_input")}
                ${r({keydown:o=>{if(o.code.toLowerCase()==="enter"){o.preventDefault();let n=o.target.value;br(n??"")}}})}
            />
            <button
                class="c-debug-search__button"
                type="button"
                ${r({click:()=>{let{id_input:o}=t(),n=o.value;br(n??"")}})}
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
                ${r({keydown:o=>{if(o.code.toLowerCase()==="enter"){o.preventDefault();let n=o.target.value,s=m.getIdByInstanceName(n);br(s??"")}}})}
            />
            <button
                class="c-debug-search__button"
                type="button"
                ${r({click:()=>{let{instance_input:o}=t(),n=o.value,s=m.getIdByInstanceName(n);br(s??"")}})}
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
                    ${r({click:()=>{let{instance_input:o,id_input:n}=t();o.value="",n.value="",br(os)}})}
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
                    ${r({click:()=>{Hx()}})}
                >
                    refresh component
                </button>
            </div>
        </div>
    </div>`;var Yx=m.createComponent({tag:"debug-search",component:Jx});var Xx=m.createComponent({tag:"debug-head",component:qx,props:{active:()=>({value:!1,type:Boolean})},state:{shouldUpdate:()=>({value:!0,type:Boolean,skipEqual:!1})},child:[Yx]});var Rc=()=>{m.mainStore.debugStore(),console.log("componentMap",m.componentMap),console.log("Tree structure:",m.getTree()),console.log("bindEventMap",_n),console.log("currentListValueMap",Ts),console.log("activeRepeatMap",Cn),console.log("onMountCallbackMap",_s),console.log("staticPropsMap",En),console.log("dynamicPropsMap",xt),console.log("eventDelegationMap",m.eventDelegationMap),console.log("tempDelegateEventMap",m.tempDelegateEventMap),console.log("invalidateIdHostMap",Xr.size),console.log("invalidateIdsMap",Qe),console.log("invalidateInstancesMap",ve),console.log("repeatIdHostMap",Gr),console.log("repeatIdsMap",Ze),console.log("repeatInstancesMap",G),console.log("userChildPlaceholderSize",th()),console.log("slotPlaceholderSize",qi()),console.log("bindTextPlaceholderMapSize",Dh()),console.log("instanceMap",qr)};var Kx=({delegateEvents:e,addMethod:t,bindProps:r,invalidate:o,bindEffect:n,getProxi:s,onMount:i})=>{let a=s();return t("toggle",()=>{a.active=!a.active}),i(()=>{let c=m.beforeRouteChange(()=>{a.active=!1,a.listType=fr});return()=>{c()}}),g`<div
        class="c-debug-overlay"
        ${n({toggleClass:{active:()=>a.active}})}
    >
        <button
            class="c-debug-overlay__background"
            type="button"
            ${e({click:()=>{a.active=!1,a.listType=fr}})}
        ></button>
        <button
            type="button"
            class="c-debug-overlay__close"
            ${e({click:()=>{a.active=!1,a.listType=fr}})}
        ></button>
        <div class="c-debug-overlay__grid">
            <button
                type="button"
                class="c-debug-overlay__log"
                ${e({click:()=>{Rc()}})}
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
                        ${o({observe:[()=>a.listType,()=>a.active],render:()=>a.listType===fr&&a.active?g`<div
                                        class="c-debug-overlay__list__title"
                                    >
                                        Tree structure
                                    </div>`:a.listType===li&&a.active?g`<debug-filter-head></debug-filter-head>`:""})}
                    </div>

                    <div class="c-debug-overlay__list__ctas">
                        <button
                            type="button"
                            class="c-debug-overlay__list__toggle"
                            ${e({click:()=>{a.listType=fr}})}
                            ${n({toggleClass:{active:()=>a.listType===fr}})}
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
                    ${o({observe:[()=>a.listType,()=>a.active],render:()=>a.listType===fr&&a.active?g`
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
            ></debug-tree-item>`).join("");var Ak=async({getRef:e})=>{await m.tick();let{screen:t,scroller:r,scrollbar:o}=e(),n=gr({screen:t,scroller:r,scrollbar:o}),s=n.destroy,i=n.refresh,a=n.move,c=n.updateScroller;return n.init(),c(),a(0),{destroy:s,refresh:i,move:a,updateScroller:c}},Qx=({onMount:e,invalidate:t,staticProps:r,setRef:o,getRef:n,addMethod:s,bindEffect:i,getProxi:a})=>{let c=a(),l=()=>{},p=()=>{},d=()=>{},f=()=>{};return e(()=>{let{scrollbar:h}=n();return h.addEventListener("input",()=>{f(h.value)}),s("refresh",()=>{p?.(),d?.()}),(async()=>(c.isLoading=!0,await m.tick(),l?.(),c.data=m.getTree(),{destroy:l,move:f,refresh:p,updateScroller:d}=await Ak({getRef:n}),c.isLoading=!1))(),()=>{l?.(),l=()=>{},p=()=>{},d=()=>{},f=()=>{}}}),g`
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
    `};var Zx=()=>{m.useMethodByName(ic)?.refresh()};var Ok=e=>e>0?`( ${e} ) `:"",e0=({id:e,value:t})=>{let o=m.componentMap.get(e)?.child;if(!o)return!1;let n=Object.values(o).flat();return n.includes(t)?!0:n.some(i=>e0({id:i,value:t}))},t0=({onMount:e,staticProps:t,getRef:r,setRef:o,delegateEvents:n,watch:s,bindEffect:i,getProxi:a,computed:c})=>{let l=a(),p=l.children.length>0?"has-children":"";return c(()=>l.isActive,()=>l.id===l.currentId),c(()=>l.hasActiveChildren,()=>e0({id:l.id,value:l.currentId})),e(()=>{let{content:d}=r(),f=Lr.subscribe(d);return Lr.reset(d),s(()=>l.isOpen,async h=>{await Lr[h?"down":"up"](d),Zx()}),()=>{f()}}),g`<div class="c-debug-tree-item">
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
            <span>${Ok(l.children.length)}</span>
            <button
                type="button"
                class="c-debug-tree-item__expand"
                ${n({click:()=>{br(l.id)}})}
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
    </div>`};var r0=m.createComponent({tag:"debug-tree-item",component:t0,bindStore:ns,props:{id:()=>({value:"",type:String}),componentName:()=>({value:"",type:String}),instanceName:()=>({value:"",type:String}),children:()=>({value:[],type:Array})},state:{isOpen:()=>({value:!1,type:Boolean}),isActive:()=>({value:!1,type:Boolean}),hasActiveChildren:()=>({value:!1,type:Boolean})}});var o0=m.createComponent({tag:"debug-tree",component:Qx,state:{data:()=>({value:[],type:Array}),isLoading:()=>({value:!1,type:Boolean})},child:[r0]});var n0=m.createComponent({tag:"debug-overlay",component:Kx,state:{active:()=>({value:!1,type:Boolean}),listType:()=>({value:fr,type:String})},child:[o0,Dx,Xx,Vx,Gx]});var bp=()=>{},Pc=()=>{},Ac=()=>{},Oc=()=>{},$k=({staticProps:e,bindProps:t,proxi:r})=>r.data.map(o=>{let{label:n,url:s,isLabel:i}=o;return i?g`<p class="c-params-mobjs__label">${n}</p>`:g`<li>
                      <links-mobjs-button
                          ${e({label:n,url:s})}
                          ${t(()=>({active:r.activeSection===s}))}
                      ></links-mobjs-button>
                  </li>`}).join(""),s0=({staticProps:e,setRef:t,getRef:r,onMount:o,bindProps:n,invalidate:s,bindEffect:i,getProxi:a})=>{let c=dr(),l=a(),p={[K]:c.sideBarLinks.mobJsComponentParams};return o(()=>{let{screenEl:d,scrollerEl:f,scrollbar:h}=r(),y=!1;h.addEventListener("input",()=>{Ac?.(h.value)}),Z.watch("navigationIsOpen",T=>{let{templateName:_}=m.getActiveRoute();_ in p&&(l.shift=T)});let b=m.afterRouteChange(async({currentTemplate:T,currentRoute:_})=>{let S=p?.[T]??[];if(l.data=S,await m.tick(),l.activeSection=_,S.length>0){if(l.hide=!1,y){Oc();return}({init:bp,destroy:Pc,move:Ac,updateScroller:Oc}=gr({screen:d,scroller:f,scrollbar:h})),y=!0,bp(),Oc(),Ac(0)}S.length===0&&(l.hide=!0,Pc?.(),y=!1)});return()=>{Pc?.(),b(),bp=()=>{},Pc=()=>{},Ac=()=>{},Oc=()=>{}}}),g`<div
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
            ${s({observe:()=>l.data,render:()=>$k({staticProps:e,bindProps:n,proxi:l})})}
        </ul>
    </div>`};var i0=({getProxi:e,bindEffect:t})=>{let r=e();return g` <a
        href="./#${r.url}"
        ${t({toggleClass:{current:()=>r.active}})}
        ><span>${r.label}</span></a
    >`};var a0=m.createComponent({tag:"links-mobjs-button",component:i0,props:{label:()=>({value:"",type:String}),url:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean})}});var c0=m.createComponent({tag:"links-mobjs",component:s0,child:[a0],state:{data:()=>({value:[],type:Array}),activeSection:()=>({value:"",type:String}),hide:()=>({value:!1,type:Boolean}),shift:()=>({value:!1,type:Boolean})}});var l0=({getProxi:e,bindEffect:t,addMethod:r,setRef:o,getRef:n,onMount:s,watch:i})=>{let a=e();r("update",(l,p)=>{a[l]=p});let c=z.createTimeTween({data:{y:0,yContainer:100},duration:300,ease:"easeOutQuad"});return i(()=>a.currentLabelId,l=>{if(l===-1){c.goTo({yContainer:100});return}c.goTo({y:100/3*-l,yContainer:0})}),s(({element:l})=>{let{back:p,next:d,previous:f,labelList:h,labels:y}=n();return c.subscribe(({y:b,yContainer:T})=>{h.style.transform=`translateY(${b}%)`,y.style.transform=`translateY(${T}%)`}),l.addEventListener("mouseleave",()=>{a.currentLabelId=-1}),f.addEventListener("mouseenter",()=>{a.currentLabelId=0}),p.addEventListener("mouseenter",()=>{a.currentLabelId=1}),d.addEventListener("mouseenter",()=>{a.currentLabelId=2}),()=>{c.destroy(),c=null,f=null,p=null,d=null,h=null,y=null}}),g`<div
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
    </div>`};var u0=m.createComponent({tag:"quick-nav",component:l0,state:{active:()=>({value:!1,type:Boolean}),backRoute:()=>({value:"",type:String}),prevRoute:()=>({value:"",type:String}),nextRoute:()=>({value:"",type:String}),currentLabelId:()=>({value:-1,type:Number})}});var Lk=({proxi:e,bindEffect:t})=>e.data.map(({label:r,url:o})=>{let n=o.replaceAll("#","");return g`
                <li class="right-sidebar__item">
                    <a
                        href="${o}"
                        class="right-sidebar__link"
                        ${t({toggleClass:{active:()=>e.activeRoute.route===n}})}
                        >${r}</a
                    >
                </li>
            `}).join(""),p0=({getProxi:e,invalidate:t,addMethod:r,computed:o,bindEffect:n})=>{let s=e();return r("updateList",i=>{s.data=i}),m.afterRouteChange(({currentTemplate:i})=>{Mc.has(i)||(s.data=[])}),o(()=>s.isVisible,()=>s.data.length>0),g`<div
        class="right-sidebar"
        ${n({toggleClass:{visible:()=>s.isVisible}})}
    >
        <div class="right-sidebar__title">Sections:</div>
        <ul class="right-sidebar__list">
            ${t({observe:()=>s.data,render:()=>Lk({proxi:s,bindEffect:n})})}
        </ul>
    </div>`};var m0=m.createComponent({tag:"right-sidebar",component:p0,bindStore:[m.mainStore],state:{data:()=>({value:[],type:Array}),isVisible:()=>({value:!1,type:Boolean})}});var d0=({onMount:e,getProxi:t,bindEffect:r,addMethod:o})=>{let n=t();return o("skip",()=>{n.skip=!1}),e(({element:s})=>{n.isDisable=!0;let i=z.createTimeTween({data:{opacity:1,scale:1},duration:500});i.subscribe(({opacity:l,scale:p})=>{s.style.opacity=l,s.style.transform=`scale(${p})`});let a=m.beforeRouteChange(async()=>{n.skip||(n.isDisable=!1,await i.set({opacity:1}),i.goTo({scale:1}))}),c=m.afterRouteChange(async()=>{await i.goTo({opacity:0,scale:.9}).catch(()=>{}),n.isDisable=!0});return()=>{i.destroy(),i=null,a(),c()}}),g`
        <div
            class="c-loader center-viewport"
            ${r({toggleClass:{disable:()=>n.isDisable}})}
        >
            <span class="c-loader__inner"></span>
        </div>
    `};var h0=m.createComponent({tag:"route-loader",component:d0,state:{isLoading:()=>({value:!1,type:Boolean}),isDisable:()=>({value:!1,type:Boolean}),skip:()=>({value:!0,type:Boolean})}});var f0=({getProxi:e,bindEffect:t,addMethod:r})=>{let o=e();return r("update",n=>{o.active=n}),g`
        <div
            class="c-scroller-down-label"
            ${t({toggleClass:{active:()=>o.active}})}
        >
            Scroll down
        </div>
    `};var g0=m.createComponent({tag:"scroll-down-label",component:f0,state:{active:()=>({value:!1,type:Boolean})}});var b0=()=>{m.useMethodByName(zo)?.setInputFocus()},vp=e=>{m.useMethodByName(zo)?.updateCurrentSearchFromSuggestion(e)},v0=e=>{m.useMethodByName(zo)?.shouldCloseSuggestion(e)},$c=()=>{m.useMethodByName(zo)?.closeSuggestion()};var y0=({proxi:e})=>{e.active=!1,$c()},Dk=({currentTarget:e})=>{e&&v0(e)},T0=({getProxi:e,delegateEvents:t,bindEffect:r,addMethod:o,bindObject:n,staticProps:s})=>{let i=e();return o("toggle",()=>{i.active=!i.active}),g`<div
        class="search-overlay"
        ${r({toggleClass:{active:()=>i.active}})}
    >
        <button
            class="search-overlay__background"
            type="button"
            ${t({click:()=>{y0({proxi:i})}})}
        ></button>
        <button
            type="button"
            class="search-overlay__close"
            ${t({click:()=>{y0({proxi:i})}})}
        ></button>

        <!-- Main content -->
        <div
            class="search-overlay__grid"
            ${t({click:a=>{Dk({currentTarget:a.currentTarget})}})}
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
                    name="${ri}"
                ></search-overlay-list>
            </div>
        </div>
    </div>`};var S0=e=>{m.useMethodByName(ri)?.update(e)},_0=()=>{m.useMethodByName(ri)?.reset()};var Fk=async({currentSearch:e})=>{S0(e)},yp=({getRef:e})=>{let{search_input:t}=e(),r=t.value;Fk({currentSearch:r})},x0=({getRef:e,proxi:t})=>{_0();let{search_input:r}=e();r.value="",t.suggestionListData=[]},C0=e=>`~${e}`,Bk=({currentSearch:e,proxi:t})=>{let o=dr().suggestion;e.length===0&&(t.suggestionListData=[]);let s=e.split(" ").slice(-1).join("").replaceAll("~","").split(" ").filter(i=>i!=="")??"";t.suggestionListData=(o.filter(({word:i})=>s.some(a=>i.toLowerCase().includes(a.toLowerCase())))??[]).map(({word:i})=>({word:i,wordHiglight:(()=>{let a=s.reduce((c,l,p)=>c.toLowerCase().replaceAll(new RegExp(`(?<!~)${l.toLowerCase()}`,"g"),`${C0(p)}`),i);return s.reduce((c,l,p)=>c.replaceAll(`${C0(p)}`,`<span class="match-string">${l}</span>`),a)})()}))},E0=({delegateEvents:e,getRef:t,setRef:r,getProxi:o,bindProps:n,addMethod:s,onMount:i,computed:a,bindEffect:c})=>{let l=o();return a(()=>l.suggestionListActive,()=>l.suggestionListData.length>0),i(()=>{let{search_input:p,suggestionElement:d}=t();s("updateCurrentSearchFromSuggestion",f=>{let y=p.value.split(" "),b=y.length===0?f:`${y.slice(0,-1).join(" ")} ${f}`;p.value=b.trimStart(),l.suggestionListData=[],p.focus()}),s("shouldCloseSuggestion",f=>{d!==f&&!d.contains(f)&&(l.suggestionListData=[])}),s("closeSuggestion",()=>{l.suggestionListData=[]}),s("setInputFocus",async()=>{setTimeout(()=>{p.focus()},300)})}),g`<div class="search-overlay-header">
        <div class="search-overlay-header__input-container">
            <input
                type="text"
                class="search-overlay-header__input"
                ${r("search_input")}
                ${e({keyup:u.useDebounce(p=>{if(p.code.toLowerCase()==="enter"){p.preventDefault(),yp({getRef:t,proxi:l}),l.suggestionListData=[];return}if(p.code.toLowerCase()==="escape"){p.preventDefault(),l.suggestionListData=[];return}let d=p.target.value;Bk({currentSearch:d,proxi:l})},60)})}
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
            ${e({click:()=>{x0({getRef:t,proxi:l})},keydown:p=>{p.code.toLowerCase()==="enter"&&x0({getRef:t,proxi:l})}})}
        >
            reset
        </button>
    </div>`};var w0=({getProxi:e,repeat:t,bindProps:r})=>{let o=e();return g`<div>
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
    </div>`};var Vk=({code:e,word:t})=>{if(e.toLowerCase()==="enter"){vp(t);return}if(e.toLowerCase()==="escape"){$c();return}},I0=({getProxi:e,delegateEvents:t,bindObject:r})=>{let o=e();return g`
        <li class="search-overlay-suggestion__item">
            <button
                type="button"
                class="search-overlay-suggestion__button"
                ${t({click:()=>{vp(o.word)},keydown:n=>{n.preventDefault(),Vk({code:n.code,word:o.word})}})}
            >
                ${r`${()=>o.wordHiglight}`}
            </button>
        </li>
    `};var M0=m.createComponent({tag:"search-overlay-suggestion-item",component:I0,props:{word:()=>({value:"",type:String}),wordHiglight:()=>({value:"",type:String})}});var k0=m.createComponent({tag:"search-overlay-suggestion",component:w0,props:{list:()=>({value:[],type:Array})},child:[M0]});var R0=m.createComponent({tag:"search-overlay-header",component:E0,state:{suggestionListActive:()=>({value:!1,type:Boolean}),suggestionListData:()=>({value:[],type:Array})},child:[k0]});var Wk=async({source:e,uri:t,title:r,section:o,breadCrumbs:n})=>{let s=await fetch(e);return s.ok?{success:!0,data:(await s.json()).data,uri:t,title:r,section:o,breadCrumbs:n}:(console.warn(`${e} not found`),{success:!1,data:[{component:"",props:{}}],uri:t,title:r,section:o,breadCrumbs:[]})},jk=new Set(["mob-title","mob-paragraph","mob-list"]),Hk=new Set(["mob-title","mob-paragraph"]),zk=new Set(["mob-list"]),N0=async({currentSearch:e=""})=>{let t=kc.filter(({props:a})=>a?.source&&a?.title).map(({hash:a,props:c})=>({fn:Wk({source:c.source??"",uri:a??"uri not forud",title:c.title??"title not found",section:c.section??"title not found",breadCrumbs:c.breadCrumbs??[]})})),r=await Promise.all(t.map(({fn:a})=>a)),o=[],n=r.filter(({success:a})=>a).map(({data:a,uri:c,title:l,section:p,breadCrumbs:d})=>{let y=a.reduce((b,T)=>{if(!T)return b;let{component:_}=T;return _?T.component==="html-content"?T?.props?.data?[...b,T.props.data]:b:[...b,T]:b},o).flat().filter(({component:b})=>jk.has(b)).flatMap(b=>Hk.has(b?.component)?b.content:zk.has(b?.component)?b?.props?.links?b.props.items.map(({label:T})=>T):b.props.items:b);return{uri:c,title:l,section:p,breadCrumbs:d,data:y}}),s=e.split(" ");return n.filter(a=>{let c=a.data.join(" ");return s.every(l=>c.toLowerCase().includes(l.toLowerCase()))}).toSorted(a=>a.title.toLowerCase().includes(e.toLowerCase())?-1:1).map(({title:a,uri:c,section:l,breadCrumbs:p,data:d})=>{let f=d.join("").toLowerCase().split(e.toLowerCase()),h=p.length>0?p.reduce((y,b,T)=>{let _=T>0?"/":"";return`${y}${_}${b.title}`},""):a;return{title:a,uri:c,section:l,breadCrumbs:h,count:f?.length??0}})};var Uk=({getRef:e})=>{let{screen:t,scroller:r,scrollbar:o}=e();o.addEventListener("input",()=>{c(o.value)});let n=gr({screen:t,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},P0=({getProxi:e,repeat:t,setRef:r,getRef:o,onMount:n,watch:s,addMethod:i,bindEffect:a,invalidate:c,bindProps:l})=>{let p=e();i("update",async f=>{p.loading||(p.loading=!0,p.noResult=!1,p.list=await N0({currentSearch:f}),p.loading=!1,p.noResult=p.list.length===0,p.updatePrentSearchKey(f))}),i("reset",()=>{p.updatePrentSearchKey(""),p.list=[]});let d;return n(()=>{let{destroy:f,updateScroller:h,move:y,refresh:b}=Uk({getRef:o});return d=y,s(()=>p.list,async()=>{await m.tick(),b(),h(),d(0)}),()=>{f?.()}}),g`<div class="search-overlay-list" ${r("screen")}>
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
    </div>`};var Lc=()=>{m.useMethodByName(cc)?.toggle()};var Gk=({uri:e})=>{m.loadUrl({url:e}),Lc()},A0=({getProxi:e,bindEffect:t,delegateEvents:r,bindObject:o})=>{let n=e();return g`
        <li
            class="search-overlay-list__item"
            ${t({toggleClass:{current:()=>n.active}})}
        >
            <button
                type="button"
                class="search-overlay-list__button"
                ${r({click:()=>{Gk({uri:n.uri})}})}
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
    `};var O0=m.createComponent({tag:"search-overlay-list-item",component:A0,props:{uri:()=>({value:"",type:String}),breadCrumbs:()=>({value:"",type:String}),title:()=>({value:"",type:String}),count:()=>({value:0,type:Number}),active:()=>({value:!1,type:Boolean})}});var $0=m.createComponent({tag:"search-overlay-list",component:P0,bindStore:m.mainStore,props:{updatePrentSearchKey:()=>({value:()=>{},type:Function})},state:{list:()=>({value:[],type:Array}),loading:()=>({value:!1,type:Boolean}),noResult:()=>({value:!1,type:Boolean})},child:[O0]});var L0=m.createComponent({tag:"search-overlay",component:T0,state:{active:()=>({value:!1,type:Boolean}),currentSearch:()=>({value:"",type:String})},child:[R0,$0]});var D0=()=>g`
        <div class="test-grid">
            <div class="test-grid__grid">
                <span></span><span></span><span></span><span></span><span></span
                ><span></span><span></span><span></span><span></span
                ><span></span><span></span><span></span>
            </div>
            <div class="test-grid__cont"><span>test</span></div>
        </div>
    `;var F0=m.createComponent({tag:"test-scss-grid",component:D0});var yo=()=>{let{templateName:e}=m.getActiveRoute();return Mc.has(e)?0:40};var B0=()=>{m.useMethodByName(sc)?.toggle()};var qk=["Alberto Navarro","Milan, Italy",'<a href="https://github.com/albnavarro/" target="_blank">[ github ]</a>','<a href="https://www.linkedin.com/in/alberto-navarro74/" target="_blank">[ linkedin ]</a>'],Jk=()=>g`
        <ul class="l-footer__bio">
            ${qk.map(e=>g` <li class="l-footer__bio__item">${e}</li> `).join("")}
        </ul>
    `,V0=({delegateEvents:e,getProxi:t,onMount:r,bindEffect:o})=>{let n=t();return r(()=>{u.useFrameIndex(()=>{n.isMounted=!0},yo())}),g`
        <footer
            class="l-footer"
            ${o({toggleClass:{"is-visible":()=>n.isMounted}})}
        >
            <div class="l-footer__container">
                ${Jk()}
                <div class="l-footer__debug">
                    <debug-button
                        class="c-button-debug"
                        ${e({click:()=>{B0()}})}
                    >
                        Debug App</debug-button
                    >
                    <debug-button
                        class="c-button-console"
                        ${e({click:()=>{Rc()}})}
                    >
                        Log
                    </debug-button>
                </div>
            </div>
        </footer>
    `};var W0=()=>g`
        <button type="button" class="c-btn-debug">
            <mobjs-slot></mobjs-slot>
        </button>
    `;var j0=m.createComponent({tag:"debug-button",component:W0});var H0=m.createComponent({tag:"mob-footer",component:V0,child:[j0],state:{isMounted:()=>({value:!1,type:Boolean})}});var Dc=()=>{m.useMethodByName(ti)?.scrollTop()},Fc=()=>{m.useMethodByName(ti)?.refresh()};var ss=({fireCallback:e=!0}={})=>{m.useMethodByName(ac)?.closeAllAccordion({fireCallback:e})};function Yk(){m.loadUrl({url:"home"}),ss(),Z.set("navigationIsOpen",!1),Dc()}var z0=({delegateEvents:e,bindEffect:t,getProxi:r,onMount:o,addMethod:n})=>{let s=r();return o(({element:i})=>{n("getHeaderHeight",()=>ne(i)),u.useFrameIndex(()=>{s.isMounted=!0},yo())}),g`
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
                        ${e({click:()=>{Yk()}})}
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
    `};var U0=({delegateEvents:e,bindEffect:t,getProxi:r,onMount:o})=>{let n=r();return o(()=>{u.useFrameIndex(()=>{n.isMounted=!0},yo())}),g`
        <button
            class="hamburger"
            type="button"
            ${e({click:()=>{Z.update("navigationIsOpen",s=>!s),n.navigationIsOpen||Jt()}})}
            ${t([{toggleClass:{"is-open":()=>n.navigationIsOpen}},{toggleClass:{"is-mounted":()=>n.isMounted}}])}
        >
            <div class="hamburger__box">
                <div class="hamburger-inner"></div>
            </div>
        </button>
    `};var G0=m.createComponent({tag:"mob-header-toggle",component:U0,bindStore:Z,state:{isMounted:()=>({value:!1,type:Boolean})}});var Xk=({event:e})=>{let t=e.target;console.log(t);let{url:r}=t?.dataset??"";m.loadUrl({url:r}),Z.set("navigationIsOpen",!1)};function Kk({delegateEvents:e}){let t=dr().header,{links:r}=t,o={github:ft().gitHubIcon};return r.map(n=>{let{svg:s,url:i,internal:a}=n;return g`<li class="l-header__sidenav__item">
                ${a?g`
                          <button
                              type="button"
                              data-url="${i}"
                              class="l-header__sidenav__link"
                              ${e({click:c=>{Xk({event:c})}})}
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
            </li>`}).join("")}var q0=({delegateEvents:e})=>g`
        <ul class="l-header__sidenav">
            <li class="l-header__sidenav__item">
                <history-cta></history-cta>
            </li>
            <li class="l-header__sidenav__item">
                <search-cta></search-cta>
            </li>
            ${Kk({delegateEvents:e})}
        </ul>
    `;var Qk=()=>{Lc(),b0()},J0=({delegateEvents:e})=>{let t=ft().searchIcons;return g`<button
        type="button"
        class="search-cta"
        ${e({click:()=>{Qk()}})}
    >
        ${t}
    </button>`};var Y0=m.createComponent({tag:"search-cta",component:J0});var X0=({delegateEvents:e})=>{let t=ft().historyIcons;return g`<button
        type="button"
        class="history-cta"
        ${e({click:()=>{Ix()}})}
    >
        ${t}
    </button>`};var K0=m.createComponent({tag:"history-cta",component:X0});var Q0=m.createComponent({tag:"mob-header-utils",component:q0,child:[Y0,K0]});var Zk=({delegateEvents:e,staticProps:t})=>dr().footer.nav.map(({label:o,url:n,section:s})=>g`<li class="header-main-menu__item">
                <header-main-menu-button
                    ${e({click:()=>{m.loadUrl({url:n}),Z.set("navigationIsOpen",!1)}})}
                    ${t({label:o,section:s})}
                ></header-main-menu-button>
            </li> `).join(""),Z0=({delegateEvents:e,staticProps:t,getProxi:r,onMount:o,bindEffect:n})=>{let s=r();return o(()=>{u.useFrameIndex(()=>{s.isMounted=!0},10)}),g`
        <ul
            class="header-main-menu"
            ${n({toggleClass:{"is-visible":()=>s.isMounted}})}
        >
            ${Zk({delegateEvents:e,staticProps:t})}
        </ul>
    `};var eC=({getProxi:e,bindEffect:t,computed:r})=>{let o=e();return r(()=>o.active,()=>o.section===o.activeNavigationSection),g`
        <button
            type="button"
            class="header-main-menu__button"
            ${t({toggleClass:{current:()=>o.active}})}
        >
            ${o.label}
        </button>
    `};var tC=m.createComponent({tag:"header-main-menu-button",component:eC,bindStore:Z,props:{label:()=>({value:"",type:String}),section:()=>({value:"",type:String})},state:{active:()=>({value:!1,type:Boolean})}});var rC=m.createComponent({tag:"header-main-menu",component:Z0,child:[tC],state:{isMounted:()=>({value:!1,type:Boolean})}});var oC=m.createComponent({tag:"mob-header",component:z0,state:{isMounted:()=>({value:!1,type:Boolean})},child:[rC,Q0,G0]});var Tp=0,nC=({root:e})=>{let t=e.querySelector(".l-navcontainer__wrap"),r=e.querySelector(".l-navcontainer__scroll"),o=e.querySelector(".l-navcontainer__percent"),n=200,s=new Ct({screen:t,scroller:r,direction:"vertical",drag:!0,scopedEvent:!1,onUpdate:({percent:i})=>{let{navigationIsOpen:a}=Z.get();a&&(Tp=Math.round(i)/100,o.style.transform=`translateZ(0) scaleX(${Tp})`)}});return s.init(),Z.watch("activeNavigationSection",i=>{let a=document.querySelector(`[data-sectionname='${i}']`);if(!a)return;let c=document.querySelector(".l-header"),l=document.querySelector(".l-footer"),p=ne(r),d=ne(c),f=ne(l),y=100*a.offsetTop/(p-window.innerHeight+d+f);setTimeout(()=>{Z.getProp("navigationIsOpen")||s.set(y)},400)}),Z.watch("navigationIsOpen",i=>{if(i){o.style.transform=`translateZ(0) scaleX(${Tp})`;return}o.style.transform="translateZ(0) scaleX(0)"}),{scrollNativationToTop:()=>{setTimeout(()=>{s.move(0).catch(()=>{}),o.style.transform="translateZ(0) scaleX(0)"},n)},refreshScroller:()=>{s.refresh()}}};function eR({main:e,proxi:t}){t.isOpen=!1,u.useFrame(()=>{document.body.style.overflow="",e.classList.remove("shift")})}function tR({main:e,proxi:t}){Fc(),t.isOpen=!0,u.useFrame(()=>{document.body.style.overflow="hidden",e.classList.add("shift")})}function rR({main:e}){e.addEventListener("click",()=>{Z.set("navigationIsOpen",!1),Jt()})}var oR=()=>{Dc(),ss();let{navigationIsOpen:e}=Z.get();e||$r.to(0)},sC=({onMount:e,addMethod:t,delegateEvents:r,bindEffect:o,getProxi:n})=>{let s=n();return e(({element:i})=>{let a=document.querySelector("main.main");Z.watch("navigationIsOpen",p=>{if(p&&a){tR({main:a,proxi:s});return}eR({main:a,proxi:s})}),rR({main:a});let{scrollNativationToTop:c,refreshScroller:l}=nC({root:i});return t("scrollTop",c),t("refresh",l),u.useFrameIndex(()=>{s.isMounted=!0},yo()),()=>{}}),g`
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
                    ${r({click:()=>{oR()}})}
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
    `};function nR({data:e,staticProps:t,bindProps:r,proxi:o}){return e.map((n,s)=>{let{label:i,url:a,activeId:c,children:l,section:p,sectioName:d,scrollToSection:f,forceChildren:h,hide:y}=n;return p?g`
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
                  `}).join("")}var iC=({staticProps:e,setState:t,bindProps:r,addMethod:o,getProxi:n})=>{let s=n(),{navigation:i}=dr();return o("closeAllAccordion",({fireCallback:a=!0}={})=>{t(()=>s.currentAccordionId,-1,{emit:a})}),g`
        <nav class="l-navigation">
            <ul class="l-navigation__list">
                ${nR({data:i,staticProps:e,bindProps:r,proxi:s})}
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
    `};var cC=m.createComponent({tag:"mob-navigation-label",component:aC,bindStore:Z,props:{label:()=>({value:"",type:String}),sectioName:()=>({value:"",type:String}),hide:()=>({value:!1,type:Boolean})}});function sR({proxi:e,staticProps:t}){return e.children.map(r=>{let{label:o,url:n,scrollToSection:s,activeId:i}=r;return g`
                <li class="l-navigation__submenu__item">
                    <mob-navigation-button
                        ${t({label:o,url:n,subMenuClass:"l-navigation__link--submenu",scrollToSection:s,activeId:i??-1,callback:()=>{e.callback({forceClose:!1})}})}
                    ></mob-navigation-button>
                </li>
            `}).join("")}var lC=({onMount:e,staticProps:t,bindProps:r,watch:o,setRef:n,getRef:s,getProxi:i})=>{let a=i(),{label:c,url:l,activeId:p}=a.headerButton;return e(()=>{let{content:d}=s();return Lr.subscribe(d),Lr.reset(d),o(()=>a.isOpen,async f=>{await Lr[f?"down":"up"](d),Fc(),!f&&ss({fireCallback:!1})},{immediate:!0}),()=>{}}),g`
        <li class="l-navigation__item has-child">
            <mob-navigation-button
                ${t({label:c,url:l,arrowClass:"l-navigation__link--arrow",fireRoute:!1,activeId:p??-1,callback:()=>{a.callback({forceClose:a.isOpen})}})}
                ${r(()=>({isOpen:a.isOpen}))}
            ></mob-navigation-button>
            <ul class="l-navigation__submenu" ${n("content")}>
                ${sR({proxi:a,staticProps:t})}
            </ul>
        </li>
    `};var uC=({delegateEvents:e,getProxi:t,bindEffect:r})=>{let o=t(),{label:n,url:s,arrowClass:i,subMenuClass:a,fireRoute:c,callback:l,scrollToSection:p,activeId:d,forceChildren:f}=o;return m.afterRouteChange(({currentRoute:h})=>{u.useFrame(()=>{let b=s.split("?")?.[0]??"",T=m.getActiveParams(),_=d===-1||T?.activeId===`${d}`,S=h===b&&_,E=f.includes(h);o.isCurrent=S||E,S&&c&&(l(),Z.set("activeNavigationSection",p))})}),g`
        <button
            type="button"
            class="l-navigation__link  ${i} ${a}"
            ${e({click:()=>{l(),c&&(m.loadUrl({url:s}),Z.set("navigationIsOpen",!1))}})}
            ${r({toggleClass:{active:()=>o.isOpen,current:()=>o.isCurrent}})}
        >
            ${n}
        </button>
    `};var Bc=m.createComponent({tag:"mob-navigation-button",component:uC,props:{label:()=>({value:"",type:String}),url:()=>({value:"",type:String}),arrowClass:()=>({value:"",type:String}),subMenuClass:()=>({value:"",type:String}),fireRoute:()=>({value:!0,type:Boolean}),callback:()=>({value:()=>{},type:Function}),isOpen:()=>({value:!1,type:Boolean}),scrollToSection:()=>({value:"",type:String}),activeId:()=>({value:-1,type:Number}),forceChildren:()=>({value:[],type:Array})},state:{isCurrent:()=>({value:!1,type:Boolean})}});var pC=m.createComponent({tag:"mob-navigation-submenu",component:lC,props:{callback:()=>({value:()=>{},type:Function}),headerButton:()=>({value:{},type:"Any"}),children:()=>({value:[],type:Array}),isOpen:()=>({value:!1,type:Boolean})},child:[Bc]});var mC=m.createComponent({tag:"mob-navigation",component:iC,state:{currentAccordionId:()=>({value:-1,type:Number,skipEqual:!1})},child:[cC,pC,Bc]});var dC=m.createComponent({tag:"mob-navigation-container",component:sC,child:[mC],state:{isOpen:()=>({value:!1,type:Boolean}),isMounted:()=>({value:!1,type:Boolean})}});m.useComponent([oC,dC,H0,u0,h0,g0,c0,n0,F0,L0,m0,Px]);var hC=async()=>g`
        ${""}
        <custom-history name="${qn}"></custom-history>
        <debug-overlay name="${sc}"></debug-overlay>
        <mob-header name="${hT}"></mob-header>
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
        <route-loader name="${uc}"></route-loader>
        <scroll-down-label name="${Zs}"></scroll-down-label>
        <links-mobjs></links-mobjs>
        <right-sidebar name="${lc}"></right-sidebar>
        <search-overlay name="${cc}"></search-overlay>
    `;var Sp=0,_p=document.querySelector(".js-main-loader-track"),fC=(e=60)=>{let t=()=>{if(Sp++,!_p)return;let r=100*Sp/e;if(_p.style.transform=`scaleX(${r/100})`,Sp>=e){_p=null;return}u.useNextFrame(()=>{t()})};u.useFrame(()=>{t()})};var gC=e=>{m.useMethodByName(uc).skip(e)};var bC=60,vC=()=>ce.mq("max","desktop"),iR=()=>{u.useResize(()=>{vC()&&m.loadUrl({url:"onlyDesktop"})})},Wc=document.body.querySelector(".js-main-loader"),jc=document.body.querySelector(".js-main-loader-background"),Vc=z.createTimeTween({data:{opacity:1},duration:1e3});Wc&&jc&&[Wc,jc].forEach(e=>{Vc?.subscribe(({opacity:t})=>{e.style.opacity=t})});var aR=async()=>{await Ry(),await Ny(),fC(bC),await u.useFps({duration:bC,force:!0}),m.inizializeApp({rootId:"#root",contentId:"#content",wrapper:hC,routes:kc,index:"home",pageNotFound:"pageNotFound",beforePageTransition:Sx,pageTransition:_x,afterInit:async()=>{await Vc.goTo({opacity:0}),Vc.destroy(),Vc=null,Wc?.remove(),jc?.remove(),Wc=null,jc=null,Cx(),iR(),gC(!1)},redirect:({route:e})=>vC()?"onlyDesktop":e,restoreScroll:!0,componentDefaultProps:{scoped:!1,maxParseIteration:1e4,debug:!1}})};u.useLoad(()=>{wy(),ce.setDefault({deferredNextTick:!0}),aR(),Ey()});})();
//# sourceMappingURL=main.js.map
