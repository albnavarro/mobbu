"use strict";(()=>{var gC=Object.create;var Jc=Object.defineProperty;var bC=Object.getOwnPropertyDescriptor;var vC=Object.getOwnPropertyNames;var yC=Object.getPrototypeOf,TC=Object.prototype.hasOwnProperty;var _C=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),_o=(t,e)=>{for(var r in e)Jc(t,r,{get:e[r],enumerable:!0})},SC=(t,e,r,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of vC(e))!TC.call(t,n)&&n!==r&&Jc(t,n,{get:()=>e[n],enumerable:!(o=bC(e,n))||o.enumerable});return t};var xC=(t,e,r)=>(r=t!=null?gC(yC(t)):{},SC(e||!t||!t.__esModule?Jc(r,"default",{value:t,enumerable:!0}):r,t));var aT=_C((CJ,iT)=>{function Jy(t){return t instanceof Map?t.clear=t.delete=t.set=function(){throw new Error("map is read-only")}:t instanceof Set&&(t.add=t.clear=t.delete=function(){throw new Error("set is read-only")}),Object.freeze(t),Object.getOwnPropertyNames(t).forEach(e=>{let r=t[e],o=typeof r;(o==="object"||o==="function")&&!Object.isFrozen(r)&&Jy(r)}),t}var nc=class{constructor(e){e.data===void 0&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}};function Yy(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function fo(t,...e){let r=Object.create(null);for(let o in t)r[o]=t[o];return e.forEach(function(o){for(let n in o)r[n]=o[n]}),r}var $I="</span>",jy=t=>!!t.scope,LI=(t,{prefix:e})=>{if(t.startsWith("language:"))return t.replace("language:","language-");if(t.includes(".")){let r=t.split(".");return[`${e}${r.shift()}`,...r.map((o,n)=>`${o}${"_".repeat(n+1)}`)].join(" ")}return`${e}${t}`},Hu=class{constructor(e,r){this.buffer="",this.classPrefix=r.classPrefix,e.walk(this)}addText(e){this.buffer+=Yy(e)}openNode(e){if(!jy(e))return;let r=LI(e.scope,{prefix:this.classPrefix});this.span(r)}closeNode(e){jy(e)&&(this.buffer+=$I)}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}},zy=(t={})=>{let e={children:[]};return Object.assign(e,t),e},Uu=class t{constructor(){this.rootNode=zy(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){let r=zy({scope:e});this.add(r),this.stack.push(r)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,r){return typeof r=="string"?e.addText(r):r.children&&(e.openNode(r),r.children.forEach(o=>this._walk(e,o)),e.closeNode(r)),e}static _collapse(e){typeof e!="string"&&e.children&&(e.children.every(r=>typeof r=="string")?e.children=[e.children.join("")]:e.children.forEach(r=>{t._collapse(r)}))}},Gu=class extends Uu{constructor(e){super(),this.options=e}addText(e){e!==""&&this.add(e)}startScope(e){this.openNode(e)}endScope(){this.closeNode()}__addSublanguage(e,r){let o=e.root;r&&(o.scope=`language:${r}`),this.add(o)}toHTML(){return new Hu(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}};function Zs(t){return t?typeof t=="string"?t:t.source:null}function Xy(t){return zo("(?=",t,")")}function FI(t){return zo("(?:",t,")*")}function DI(t){return zo("(?:",t,")?")}function zo(...t){return t.map(r=>Zs(r)).join("")}function BI(t){let e=t[t.length-1];return typeof e=="object"&&e.constructor===Object?(t.splice(t.length-1,1),e):{}}function Ju(...t){return"("+(BI(t).capture?"":"?:")+t.map(o=>Zs(o)).join("|")+")"}function Ky(t){return new RegExp(t.toString()+"|").exec("").length-1}function VI(t,e){let r=t&&t.exec(e);return r&&r.index===0}var WI=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function Yu(t,{joinWith:e}){let r=0;return t.map(o=>{r+=1;let n=r,s=Zs(o),i="";for(;s.length>0;){let a=WI.exec(s);if(!a){i+=s;break}i+=s.substring(0,a.index),s=s.substring(a.index+a[0].length),a[0][0]==="\\"&&a[1]?i+="\\"+String(Number(a[1])+n):(i+=a[0],a[0]==="("&&r++)}return i}).map(o=>`(${o})`).join(e)}var jI=/\b\B/,Qy="[a-zA-Z]\\w*",Xu="[a-zA-Z_]\\w*",Zy="\\b\\d+(\\.\\d+)?",eT="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",tT="\\b(0b[01]+)",zI="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",HI=(t={})=>{let e=/^#![ ]*\//;return t.binary&&(t.begin=zo(e,/.*\b/,t.binary,/\b.*/)),fo({scope:"meta",begin:e,end:/$/,relevance:0,"on:begin":(r,o)=>{r.index!==0&&o.ignoreMatch()}},t)},ei={begin:"\\\\[\\s\\S]",relevance:0},UI={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[ei]},GI={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[ei]},qI={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},ic=function(t,e,r={}){let o=fo({scope:"comment",begin:t,end:e,contains:[]},r);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});let n=Ju("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:zo(/[ ]+/,"(",n,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},JI=ic("//","$"),YI=ic("/\\*","\\*/"),XI=ic("#","$"),KI={scope:"number",begin:Zy,relevance:0},QI={scope:"number",begin:eT,relevance:0},ZI={scope:"number",begin:tT,relevance:0},eM={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[ei,{begin:/\[/,end:/\]/,relevance:0,contains:[ei]}]},tM={scope:"title",begin:Qy,relevance:0},rM={scope:"title",begin:Xu,relevance:0},oM={begin:"\\.\\s*"+Xu,relevance:0},nM=function(t){return Object.assign(t,{"on:begin":(e,r)=>{r.data._beginMatch=e[1]},"on:end":(e,r)=>{r.data._beginMatch!==e[1]&&r.ignoreMatch()}})},oc=Object.freeze({__proto__:null,APOS_STRING_MODE:UI,BACKSLASH_ESCAPE:ei,BINARY_NUMBER_MODE:ZI,BINARY_NUMBER_RE:tT,COMMENT:ic,C_BLOCK_COMMENT_MODE:YI,C_LINE_COMMENT_MODE:JI,C_NUMBER_MODE:QI,C_NUMBER_RE:eT,END_SAME_AS_BEGIN:nM,HASH_COMMENT_MODE:XI,IDENT_RE:Qy,MATCH_NOTHING_RE:jI,METHOD_GUARD:oM,NUMBER_MODE:KI,NUMBER_RE:Zy,PHRASAL_WORDS_MODE:qI,QUOTE_STRING_MODE:GI,REGEXP_MODE:eM,RE_STARTERS_RE:zI,SHEBANG:HI,TITLE_MODE:tM,UNDERSCORE_IDENT_RE:Xu,UNDERSCORE_TITLE_MODE:rM});function sM(t,e){t.input[t.index-1]==="."&&e.ignoreMatch()}function iM(t,e){t.className!==void 0&&(t.scope=t.className,delete t.className)}function aM(t,e){e&&t.beginKeywords&&(t.begin="\\b("+t.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",t.__beforeBegin=sM,t.keywords=t.keywords||t.beginKeywords,delete t.beginKeywords,t.relevance===void 0&&(t.relevance=0))}function cM(t,e){Array.isArray(t.illegal)&&(t.illegal=Ju(...t.illegal))}function lM(t,e){if(t.match){if(t.begin||t.end)throw new Error("begin & end are not supported with match");t.begin=t.match,delete t.match}}function uM(t,e){t.relevance===void 0&&(t.relevance=1)}var pM=(t,e)=>{if(!t.beforeMatch)return;if(t.starts)throw new Error("beforeMatch cannot be used with starts");let r=Object.assign({},t);Object.keys(t).forEach(o=>{delete t[o]}),t.keywords=r.keywords,t.begin=zo(r.beforeMatch,Xy(r.begin)),t.starts={relevance:0,contains:[Object.assign(r,{endsParent:!0})]},t.relevance=0,delete r.beforeMatch},mM=["of","and","for","in","not","or","if","then","parent","list","value"],hM="keyword";function rT(t,e,r=hM){let o=Object.create(null);return typeof t=="string"?n(r,t.split(" ")):Array.isArray(t)?n(r,t):Object.keys(t).forEach(function(s){Object.assign(o,rT(t[s],e,s))}),o;function n(s,i){e&&(i=i.map(a=>a.toLowerCase())),i.forEach(function(a){let c=a.split("|");o[c[0]]=[s,dM(c[0],c[1])]})}}function dM(t,e){return e?Number(e):fM(t)?0:1}function fM(t){return mM.includes(t.toLowerCase())}var Hy={},jo=t=>{console.error(t)},Uy=(t,...e)=>{console.log(`WARN: ${t}`,...e)},Hn=(t,e)=>{Hy[`${t}/${e}`]||(console.log(`Deprecated as of ${t}. ${e}`),Hy[`${t}/${e}`]=!0)},sc=new Error;function oT(t,e,{key:r}){let o=0,n=t[r],s={},i={};for(let a=1;a<=e.length;a++)i[a+o]=n[a],s[a+o]=!0,o+=Ky(e[a-1]);t[r]=i,t[r]._emit=s,t[r]._multi=!0}function gM(t){if(Array.isArray(t.begin)){if(t.skip||t.excludeBegin||t.returnBegin)throw jo("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),sc;if(typeof t.beginScope!="object"||t.beginScope===null)throw jo("beginScope must be object"),sc;oT(t,t.begin,{key:"beginScope"}),t.begin=Yu(t.begin,{joinWith:""})}}function bM(t){if(Array.isArray(t.end)){if(t.skip||t.excludeEnd||t.returnEnd)throw jo("skip, excludeEnd, returnEnd not compatible with endScope: {}"),sc;if(typeof t.endScope!="object"||t.endScope===null)throw jo("endScope must be object"),sc;oT(t,t.end,{key:"endScope"}),t.end=Yu(t.end,{joinWith:""})}}function vM(t){t.scope&&typeof t.scope=="object"&&t.scope!==null&&(t.beginScope=t.scope,delete t.scope)}function yM(t){vM(t),typeof t.beginScope=="string"&&(t.beginScope={_wrap:t.beginScope}),typeof t.endScope=="string"&&(t.endScope={_wrap:t.endScope}),gM(t),bM(t)}function TM(t){function e(i,a){return new RegExp(Zs(i),"m"+(t.case_insensitive?"i":"")+(t.unicodeRegex?"u":"")+(a?"g":""))}class r{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(a,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,a]),this.matchAt+=Ky(a)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);let a=this.regexes.map(c=>c[1]);this.matcherRe=e(Yu(a,{joinWith:"|"}),!0),this.lastIndex=0}exec(a){this.matcherRe.lastIndex=this.lastIndex;let c=this.matcherRe.exec(a);if(!c)return null;let l=c.findIndex((h,f)=>f>0&&h!==void 0),p=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,p)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(a){if(this.multiRegexes[a])return this.multiRegexes[a];let c=new r;return this.rules.slice(a).forEach(([l,p])=>c.addRule(l,p)),c.compile(),this.multiRegexes[a]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(a,c){this.rules.push([a,c]),c.type==="begin"&&this.count++}exec(a){let c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(a);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){let p=this.getMatcher(0);p.lastIndex=this.lastIndex+1,l=p.exec(a)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function n(i){let a=new o;return i.contains.forEach(c=>a.addRule(c.begin,{rule:c,type:"begin"})),i.terminatorEnd&&a.addRule(i.terminatorEnd,{type:"end"}),i.illegal&&a.addRule(i.illegal,{type:"illegal"}),a}function s(i,a){let c=i;if(i.isCompiled)return c;[iM,lM,yM,pM].forEach(p=>p(i,a)),t.compilerExtensions.forEach(p=>p(i,a)),i.__beforeBegin=null,[aM,cM,uM].forEach(p=>p(i,a)),i.isCompiled=!0;let l=null;return typeof i.keywords=="object"&&i.keywords.$pattern&&(i.keywords=Object.assign({},i.keywords),l=i.keywords.$pattern,delete i.keywords.$pattern),l=l||/\w+/,i.keywords&&(i.keywords=rT(i.keywords,t.case_insensitive)),c.keywordPatternRe=e(l,!0),a&&(i.begin||(i.begin=/\B|\b/),c.beginRe=e(c.begin),!i.end&&!i.endsWithParent&&(i.end=/\B|\b/),i.end&&(c.endRe=e(c.end)),c.terminatorEnd=Zs(c.end)||"",i.endsWithParent&&a.terminatorEnd&&(c.terminatorEnd+=(i.end?"|":"")+a.terminatorEnd)),i.illegal&&(c.illegalRe=e(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map(function(p){return _M(p==="self"?i:p)})),i.contains.forEach(function(p){s(p,c)}),i.starts&&s(i.starts,a),c.matcher=n(c),c}if(t.compilerExtensions||(t.compilerExtensions=[]),t.contains&&t.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return t.classNameAliases=fo(t.classNameAliases||{}),s(t)}function nT(t){return t?t.endsWithParent||nT(t.starts):!1}function _M(t){return t.variants&&!t.cachedVariants&&(t.cachedVariants=t.variants.map(function(e){return fo(t,{variants:null},e)})),t.cachedVariants?t.cachedVariants:nT(t)?fo(t,{starts:t.starts?fo(t.starts):null}):Object.isFrozen(t)?fo(t):t}var SM="11.11.1",qu=class extends Error{constructor(e,r){super(e),this.name="HTMLInjectionError",this.html=r}},zu=Yy,Gy=fo,qy=Symbol("nomatch"),xM=7,sT=function(t){let e=Object.create(null),r=Object.create(null),o=[],n=!0,s="Could not find the language '{}', did you forget to load/include a language module?",i={disableAutodetect:!0,name:"Plain text",contains:[]},a={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Gu};function c(C){return a.noHighlightRe.test(C)}function l(C){let M=C.className+" ";M+=C.parentNode?C.parentNode.className:"";let D=a.languageDetectRe.exec(M);if(D){let V=A(D[1]);return V||(Uy(s.replace("{}",D[1])),Uy("Falling back to no-highlight mode for this block.",C)),V?D[1]:"no-highlight"}return M.split(/\s+/).find(V=>c(V)||A(V))}function p(C,M,D){let V="",B="";typeof M=="object"?(V=C,D=M.ignoreIllegals,B=M.language):(Hn("10.7.0","highlight(lang, code, ...args) has been deprecated."),Hn("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),B=C,V=M),D===void 0&&(D=!0);let U={code:V,language:B};k("before:highlight",U);let oe=U.result?U.result:h(U.language,U.code,D);return oe.code=U.code,k("after:highlight",oe),oe}function h(C,M,D,V){let B=Object.create(null);function U(W,G){return W.keywords[G]}function oe(){if(!X.keywords){Be.addText(Ne);return}let W=0;X.keywordPatternRe.lastIndex=0;let G=X.keywordPatternRe.exec(Ne),me="";for(;G;){me+=Ne.substring(W,G.index);let xe=Ge.case_insensitive?G[0].toLowerCase():G[0],ot=U(X,xe);if(ot){let[gr,dC]=ot;if(Be.addText(me),me="",B[xe]=(B[xe]||0)+1,B[xe]<=xM&&(hi+=dC),gr.startsWith("_"))me+=G[0];else{let fC=Ge.classNameAliases[gr]||gr;Y(G[0],fC)}}else me+=G[0];W=X.keywordPatternRe.lastIndex,G=X.keywordPatternRe.exec(Ne)}me+=Ne.substring(W),Be.addText(me)}function ce(){if(Ne==="")return;let W=null;if(typeof X.subLanguage=="string"){if(!e[X.subLanguage]){Be.addText(Ne);return}W=h(X.subLanguage,Ne,!0,Fr[X.subLanguage]),Fr[X.subLanguage]=W._top}else W=d(Ne,X.subLanguage.length?X.subLanguage:null);X.relevance>0&&(hi+=W.relevance),Be.__addSublanguage(W._emitter,W.language)}function q(){X.subLanguage!=null?ce():oe(),Ne=""}function Y(W,G){W!==""&&(Be.startScope(G),Be.addText(W),Be.endScope())}function se(W,G){let me=1,xe=G.length-1;for(;me<=xe;){if(!W._emit[me]){me++;continue}let ot=Ge.classNameAliases[W[me]]||W[me],gr=G[me];ot?Y(gr,ot):(Ne=gr,oe(),Ne=""),me++}}function re(W,G){return W.scope&&typeof W.scope=="string"&&Be.openNode(Ge.classNameAliases[W.scope]||W.scope),W.beginScope&&(W.beginScope._wrap?(Y(Ne,Ge.classNameAliases[W.beginScope._wrap]||W.beginScope._wrap),Ne=""):W.beginScope._multi&&(se(W.beginScope,G),Ne="")),X=Object.create(W,{parent:{value:X}}),X}function ke(W,G,me){let xe=VI(W.endRe,me);if(xe){if(W["on:end"]){let ot=new nc(W);W["on:end"](G,ot),ot.isMatchIgnored&&(xe=!1)}if(xe){for(;W.endsParent&&W.parent;)W=W.parent;return W}}if(W.endsWithParent)return ke(W.parent,G,me)}function Ve(W){return X.matcher.regexIndex===0?(Ne+=W[0],1):(qc=!0,0)}function K(W){let G=W[0],me=W.rule,xe=new nc(me),ot=[me.__beforeBegin,me["on:begin"]];for(let gr of ot)if(gr&&(gr(W,xe),xe.isMatchIgnored))return Ve(G);return me.skip?Ne+=G:(me.excludeBegin&&(Ne+=G),q(),!me.returnBegin&&!me.excludeBegin&&(Ne=G)),re(me,W),me.returnBegin?0:G.length}function Te(W){let G=W[0],me=M.substring(W.index),xe=ke(X,W,me);if(!xe)return qy;let ot=X;X.endScope&&X.endScope._wrap?(q(),Y(G,X.endScope._wrap)):X.endScope&&X.endScope._multi?(q(),se(X.endScope,W)):ot.skip?Ne+=G:(ot.returnEnd||ot.excludeEnd||(Ne+=G),q(),ot.excludeEnd&&(Ne=G));do X.scope&&Be.closeNode(),!X.skip&&!X.subLanguage&&(hi+=X.relevance),X=X.parent;while(X!==xe.parent);return xe.starts&&re(xe.starts,W),ot.returnEnd?0:G.length}function Ee(){let W=[];for(let G=X;G!==Ge;G=G.parent)G.scope&&W.unshift(G.scope);W.forEach(G=>Be.openNode(G))}let Oe={};function Ye(W,G){let me=G&&G[0];if(Ne+=W,me==null)return q(),0;if(Oe.type==="begin"&&G.type==="end"&&Oe.index===G.index&&me===""){if(Ne+=M.slice(G.index,G.index+1),!n){let xe=new Error(`0 width match regex (${C})`);throw xe.languageName=C,xe.badRule=Oe.rule,xe}return 1}if(Oe=G,G.type==="begin")return K(G);if(G.type==="illegal"&&!D){let xe=new Error('Illegal lexeme "'+me+'" for mode "'+(X.scope||"<unnamed>")+'"');throw xe.mode=X,xe}else if(G.type==="end"){let xe=Te(G);if(xe!==qy)return xe}if(G.type==="illegal"&&me==="")return Ne+=`
`,1;if(Gc>1e5&&Gc>G.index*3)throw new Error("potential infinite loop, way more iterations than matches");return Ne+=me,me.length}let Ge=A(C);if(!Ge)throw jo(s.replace("{}",C)),new Error('Unknown language: "'+C+'"');let Lr=TM(Ge),$t="",X=V||Lr,Fr={},Be=new a.__emitter(a);Ee();let Ne="",hi=0,To=0,Gc=0,qc=!1;try{if(Ge.__emitTokens)Ge.__emitTokens(M,Be);else{for(X.matcher.considerAll();;){Gc++,qc?qc=!1:X.matcher.considerAll(),X.matcher.lastIndex=To;let W=X.matcher.exec(M);if(!W)break;let G=M.substring(To,W.index),me=Ye(G,W);To=W.index+me}Ye(M.substring(To))}return Be.finalize(),$t=Be.toHTML(),{language:C,value:$t,relevance:hi,illegal:!1,_emitter:Be,_top:X}}catch(W){if(W.message&&W.message.includes("Illegal"))return{language:C,value:zu(M),illegal:!0,relevance:0,_illegalBy:{message:W.message,index:To,context:M.slice(To-100,To+100),mode:W.mode,resultSoFar:$t},_emitter:Be};if(n)return{language:C,value:zu(M),illegal:!1,relevance:0,errorRaised:W,_emitter:Be,_top:X};throw W}}function f(C){let M={value:zu(C),illegal:!1,relevance:0,_top:i,_emitter:new a.__emitter(a)};return M._emitter.addText(C),M}function d(C,M){M=M||a.languages||Object.keys(e);let D=f(C),V=M.filter(A).filter(R).map(q=>h(q,C,!1));V.unshift(D);let B=V.sort((q,Y)=>{if(q.relevance!==Y.relevance)return Y.relevance-q.relevance;if(q.language&&Y.language){if(A(q.language).supersetOf===Y.language)return 1;if(A(Y.language).supersetOf===q.language)return-1}return 0}),[U,oe]=B,ce=U;return ce.secondBest=oe,ce}function y(C,M,D){let V=M&&r[M]||D;C.classList.add("hljs"),C.classList.add(`language-${V}`)}function v(C){let M=null,D=l(C);if(c(D))return;if(k("before:highlightElement",{el:C,language:D}),C.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",C);return}if(C.children.length>0&&(a.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(C)),a.throwUnescapedHTML))throw new qu("One of your code blocks includes unescaped HTML.",C.innerHTML);M=C;let V=M.textContent,B=D?p(V,{language:D,ignoreIllegals:!0}):d(V);C.innerHTML=B.value,C.dataset.highlighted="yes",y(C,D,B.language),C.result={language:B.language,re:B.relevance,relevance:B.relevance},B.secondBest&&(C.secondBest={language:B.secondBest.language,relevance:B.secondBest.relevance}),k("after:highlightElement",{el:C,result:B,text:V})}function T(C){a=Gy(a,C)}let S=()=>{x(),Hn("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function _(){x(),Hn("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let E=!1;function x(){function C(){x()}if(document.readyState==="loading"){E||window.addEventListener("DOMContentLoaded",C,!1),E=!0;return}document.querySelectorAll(a.cssSelector).forEach(v)}function w(C,M){let D=null;try{D=M(t)}catch(V){if(jo("Language definition for '{}' could not be registered.".replace("{}",C)),n)jo(V);else throw V;D=i}D.name||(D.name=C),e[C]=D,D.rawDefinition=M.bind(null,t),D.aliases&&O(D.aliases,{languageName:C})}function I(C){delete e[C];for(let M of Object.keys(r))r[M]===C&&delete r[M]}function N(){return Object.keys(e)}function A(C){return C=(C||"").toLowerCase(),e[C]||e[r[C]]}function O(C,{languageName:M}){typeof C=="string"&&(C=[C]),C.forEach(D=>{r[D.toLowerCase()]=M})}function R(C){let M=A(C);return M&&!M.disableAutodetect}function P(C){C["before:highlightBlock"]&&!C["before:highlightElement"]&&(C["before:highlightElement"]=M=>{C["before:highlightBlock"](Object.assign({block:M.el},M))}),C["after:highlightBlock"]&&!C["after:highlightElement"]&&(C["after:highlightElement"]=M=>{C["after:highlightBlock"](Object.assign({block:M.el},M))})}function $(C){P(C),o.push(C)}function F(C){let M=o.indexOf(C);M!==-1&&o.splice(M,1)}function k(C,M){let D=C;o.forEach(function(V){V[D]&&V[D](M)})}function L(C){return Hn("10.7.0","highlightBlock will be removed entirely in v12.0"),Hn("10.7.0","Please use highlightElement now."),v(C)}Object.assign(t,{highlight:p,highlightAuto:d,highlightAll:x,highlightElement:v,highlightBlock:L,configure:T,initHighlighting:S,initHighlightingOnLoad:_,registerLanguage:w,unregisterLanguage:I,listLanguages:N,getLanguage:A,registerAliases:O,autoDetection:R,inherit:Gy,addPlugin:$,removePlugin:F}),t.debugMode=function(){n=!1},t.safeMode=function(){n=!0},t.versionString=SM,t.regex={concat:zo,lookahead:Xy,either:Ju,optional:DI,anyNumberOfTimes:FI};for(let C in oc)typeof oc[C]=="object"&&Jy(oc[C]);return Object.assign(t,oc),t},Un=sT({});Un.newInstance=()=>sT({});iT.exports=Un;Un.HighlightJS=Un;Un.default=Un});var u={};_o(u,{ANIMATION_STOP_REJECT:()=>cl,checkType:()=>Re,createStore:()=>ME,debounce:()=>So,getFps:()=>RE,getInstantFps:()=>kE,getTime:()=>Lt,getTypeName:()=>os,getUnivoqueId:()=>we,mustMakeSomething:()=>PE,normalizeWheel:()=>ls,shouldMakeSomething:()=>NE,store:()=>aw,throttle:()=>di,useCache:()=>BE,useDebounce:()=>So,useFps:()=>FE,useFrame:()=>AE,useFrameIndex:()=>LE,useLinkedList:()=>cw,useLoad:()=>DE,useMouseClick:()=>jE,useMouseDown:()=>zE,useMouseMove:()=>UE,useMouseUp:()=>qE,useMouseWheel:()=>YE,useNextFrame:()=>$E,useNextLoop:()=>Ft,useNextTick:()=>OE,usePointerDown:()=>rw,usePointerLeave:()=>iw,usePointerMove:()=>ow,usePointerOut:()=>sw,usePointerOver:()=>tw,usePointerUp:()=>nw,useResize:()=>VE,useScroll:()=>XE,useScrollEnd:()=>ew,useScrollImmediate:()=>KE,useScrollStart:()=>ZE,useScrollThrottle:()=>QE,useTouchEnd:()=>JE,useTouchMove:()=>GE,useTouchStart:()=>HE,useVisibilityChange:()=>WE});var Lt=()=>typeof globalThis>"u"?Date.now():globalThis.performance.now(),Cp=16.666666666666668;var di=(t,e)=>{let r,o;return function(){let n=this,s=arguments;o?(clearTimeout(r),r=setTimeout(function(){Lt()-o>=e&&(t.apply(n,s),o=Lt())},e-(Lt()-o))):(t.apply(n,s),o=Lt())}};var So=function(e,r=200){let o;return function(){let n=()=>Reflect.apply(e,this,arguments);clearTimeout(o),o=setTimeout(n,r)}};function le(t){if(!t)return 0;let e=t.offsetHeight,r=getComputedStyle(t);return e+=Number.parseInt(r.marginTop)+Number.parseInt(r.marginBottom),e}function je(t){if(!t)return 0;let e=t.offsetWidth,r=getComputedStyle(t);return e+=Number.parseInt(r.marginLeft)+Number.parseInt(r.marginRight),e}function be(t){if(!t)return{top:0,left:0};let e=t.getBoundingClientRect();return{top:e.top+window.scrollY,left:e.left+window.scrollY}}function St(t){return t?t.getBoundingClientRect():{bottom:0,height:0,left:0,right:0,top:0,width:0,x:0,y:0}}function rs(t,e){let r=e?.parentNode;for(;r;){if(r===t)return!0;r=r?.parentNode}return!1}function xo(t){let e=globalThis.getComputedStyle(t),r=e.transform||e.mozTransform;if(r==="none"||r===void 0)return{x:0,y:0,z:0};let o=r.includes("3d")?"3d":"2d",n=r.match(/matrix.*\((.+)\)/)[1].split(", ");if(o==="2d")return{x:n[4],y:n[5],z:0};if(o==="3d")return{x:n[12],y:n[13],z:n[14]}}function Yc(t){return typeof Node=="object"?t instanceof Node:t&&typeof t=="object"&&typeof t.nodeType=="number"&&typeof t.nodeName=="string"}var we=()=>`_${Math.random().toString(36).slice(2,9)}`;function Ep(t){var e=t.getBoundingClientRect();return e.top>=0&&e.bottom<=window.innerHeight}var Xc=(t,e,r)=>Math.min(Math.max(t,e),r);var fi=new Set,Ft=t=>{fi.add(t),fi.size===1&&setTimeout(()=>{fi.forEach(e=>{e()}),fi.clear()})};var Kc="UNTYPED",wp="STRING",Ip="NUMBER",Mp="OBJECT",kp="FUNCTION",gi="ARRAY",Rp="BOOLEAN",Pp="ELEMENT",Np="HTMLELEMENT",Ap="NODELIST";var Ie={isString:t=>Object.prototype.toString.call(t)==="[object String]",isNumber:t=>Object.prototype.toString.call(t)==="[object Number]"&&Number.isFinite(t),isObject:t=>Object.prototype.toString.call(t)==="[object Object]",isFunction:t=>Object.prototype.toString.call(t)==="[object Function]",isArray:t=>Object.prototype.toString.call(t)==="[object Array]",isBoolean:t=>Object.prototype.toString.call(t)==="[object Boolean]",isElement:t=>t instanceof Element||t instanceof Document,isHTMLElement:t=>t instanceof HTMLElement,isSet:t=>t instanceof Set,isMap:t=>t instanceof Map,isNodeList:t=>Object.prototype.isPrototypeOf.call(NodeList.prototype,t)},os=t=>{switch(t){case String:case wp:return"String";case Number:case Ip:return"Number";case Object:case Mp:return"Object";case Function:case kp:return"Function";case Array:case gi:return"Array";case Boolean:case Rp:return"Boolean";case Element:case Pp:return"Element";case HTMLElement:case Np:return"HTMLElement";case NodeList:case Ap:return"NodeList";case Set:case"SET":return"Set";case Map:case"MAP":return"Map";case"ANY":return"ANY";default:return Kc}},Re=(t,e)=>{switch(t){case String:case wp:return Ie.isString(e);case Number:case Ip:return Ie.isNumber(e);case Object:case Mp:return Ie.isObject(e);case Function:case kp:return Ie.isFunction(e);case Array:case gi:return Ie.isArray(e);case Boolean:case Rp:return Ie.isBoolean(e);case Element:case Pp:return Ie.isElement(e);case HTMLElement:case Np:return Ie.isHTMLElement(e);case NodeList:case Ap:return Ie.isNodeList(e);case Set:case"SET":return Ie.isSet(e);case Map:case"MAP":return Ie.isMap(e);case"ANY":return!0;default:return!0}};var wC=(t,e)=>t.size===e.size&&[...t.keys()].every(r=>t.get(r)===e.get(r)),IC=(t,e)=>t.size===e.size&&[...t].every(r=>e.has(r)),MC=(t,e)=>{if(t.length!==e.length)return!1;for(let[r,o]of t.entries())if(!ns(o,e[r]))return!1;return!0},ns=(t,e,r=new WeakMap)=>{if(t===e)return!0;if(t==null||e==null)return!1;let o=typeof t;if(o!==typeof e||o!=="object")return!1;if(r.has(t)&&r.get(t)?.has(e))return!0;r.has(t)||r.set(t,new WeakSet),r.get(t)?.add(e);let s=Array.isArray(t),i=Array.isArray(e);if(s!==i)return!1;if(s){if(t.length!==e.length)return!1;for(let[l,p]of t.entries())if(!ns(p,e[l],r))return!1;return!0}if(t instanceof Date&&e instanceof Date)return t.getTime()===e.getTime();if(t instanceof Date||e instanceof Date)return!1;if(t instanceof RegExp&&e instanceof RegExp)return t.source===e.source&&t.flags===e.flags;if(t instanceof RegExp||e instanceof RegExp)return!1;if(t instanceof Map&&e instanceof Map){if(t.size!==e.size)return!1;for(let[l,p]of t)if(!e.has(l)||!ns(p,e.get(l),r))return!1;return!0}if(t instanceof Map||e instanceof Map)return!1;if(t instanceof Set&&e instanceof Set){if(t.size!==e.size)return!1;for(let l of t)if(!e.has(l))return!1;return!0}if(t instanceof Set||e instanceof Set)return!1;let a=Object.keys(t),c=Object.keys(e);if(a.length!==c.length)return!1;for(let l of a)if(!Object.prototype.hasOwnProperty.call(e,l)||!ns(t[l],e[l],r))return!1;return!0},bi=(t,e,r)=>{switch(t){case"ANY":return ns(e,r);case gi:case Array:return MC(e,r);case"SET":case Set:return IC(e,r);case"MAP":case Map:return wC(e,r);default:return e===r}};var vi="UPDATE";var Ae={};_o(Ae,{extractKeysFromArray:()=>el,extractkeyFromProp:()=>Dr,getCurrentDependencies:()=>Qc,getFirstCurrentDependencies:()=>Zc,initializeCurrentDependencies:()=>ss,setCurrentDependencies:()=>Ti});var Go=[],yi=!1,ss=()=>{yi=!0,Go.length=0},Qc=()=>(yi=!1,[...Go]),Zc=()=>(yi=!1,[...Go]?.[0]??"missing_prop"),Ti=t=>{!yi||!t||Go.includes(t)||(Go=[...Go,t])},Dr=t=>Re(String,t)?t:(ss(),t(),Zc()),el=t=>t.map(e=>Re(String,e)?e:(ss(),e(),Zc()));var is=new Map,Op=t=>{is.delete(t)},qo=({watcherByProp:t,prop:e,newValue:r,oldValue:o,validationValue:n,instanceId:s})=>{let i=t?.get(e);if(!(!i||i.size===0)){for(let{fn:a,wait:c}of i.values())if(c||a(r,o,n),s&&c){let l=is.get(s)??new Map,p=!l.has(e),h=p?[]:l.get(e)?.callbacks??[],f=l.get(e);l.set(e,{newValue:r,oldValue:f?.oldValue??o,validationValue:n,callbacks:[...new Set([...h,a])]}),is.set(s,l),p&&Ft(()=>{let d=is.get(s),y=d?.get(e);if(y&&y.newValue!==void 0&&y.newValue!==null)for(let v of y.callbacks)v(y.newValue,y.oldValue,y.validationValue);d?.delete(e),d?.size===0&&is.delete(s)})}}},$p=async({watcherByProp:t,prop:e,newValue:r,oldValue:o,validationValue:n})=>{let s=t?.get(e);if(!(!s||s.size===0))for(let{fn:i}of s.values())await i(r,o,n)};var kC="padding: 10px;",ze=()=>kC;var tl="store_shallow_copy",Lp=tl;var qe=new Map,ie=t=>{if(Lp===tl){let e=qe.get(t);return e?{...e}:void 0}return qe.get(t)},$e=(t,e)=>{qe.set(t,e)},Fp=t=>{qe.delete(t)};var rl=(t,e)=>{console.warn(`%c MobStore supports an object with a depth of up to 2 levels, set 'Any' type to use obj as value, the input object has ${t} level`,e)};var Dp=(t,e)=>{console.warn(`%c MobStore, trying to execute set() method: store.${t} not exist`,e)},Bp=(t,e,r)=>{console.warn(`%c trying to execute setProp method on '${t}' propierties: setProp methods doesn't allow objects as value, ${JSON.stringify(e)} is an Object, use 'Any' type for custom object`,r)},Vp=(t,e)=>{console.warn(`%c trying to execute setProp method on '${t}' propierties: '${JSON.stringify(t)}' is an objects`,e)},Wp=(t,e,r,o)=>{console.warn(`%c trying to execute setProp method on '${t}' propierties: ${e} is not a ${os(r)}`,o)},jp=(t,e,r)=>{console.warn(`%c trying to execute setObj method on '${t}' propierties: setObj methods allow only objects as value, ${e} is not an Object`,r)},zp=(t,e)=>{console.warn(`%c trying to execute setObj data method on '${t}' propierties: store propierties '${t}' is not an object`,e)},Hp=(t,e,r)=>{console.warn(`%c trying to execute setObj data method: one of these keys '${t}' not exist in store.${e}`,r)},Up=(t,e,r)=>{console.warn(`%c trying to execute setObj data method on '${t}' propierties: '${JSON.stringify(e)}' have a depth > 1, nested obj is not allowed, use 'any' type for deep nested object`,r)},Gp=(t,e,r,o,n)=>{console.warn(`%c trying to execute setObj data method on ${t}.${e} propierties: ${r} is not a ${os(o)}`,n)},qp=(t,e)=>{console.warn(`%c trying to execute get data method: store.${t} not exist`,e)},ol=(t,e)=>{console.warn(`%c trying to execute set data method: store.${t} not exist`,e)},Jp=(t,e)=>{console.warn(`%c one of the keys [${t}] is already used as a computed target, or there is a circular dependencies`,e)},Yp=(t,e)=>{console.warn(`%c MobStore error: the property ${t} to watch doesn't exist in store`,e)},Xp=(t,e)=>{console.warn(`%c Validation Object error: validation function return undefined or have you used Object instead '${e}' ?`,t)};var Kp=(t,e)=>{console.warn(`%c MobStore error: the property ${t} should readOnly with proxi, maybe is a mobJs props.`,e)},nl=(t,e)=>{console.warn(`%c MobStore error: the property ${t} fail validation during definition.`,e)};var as=t=>{if(!Ie.isObject(t))return 0;let e=Object.values(t);return e.length===0?1:Math.max(...e.map(r=>as(r)))+1},Qp=(t,e=!0)=>Object.fromEntries(Object.entries(t).map(([r,o])=>{if(Ie.isObject(o)&&e)return[r,Qp(o,!1)];if(Ie.isFunction(o)){let n=o();if(Ie.isObject(n)&&"value"in n&&["validate","type","skipEqual","strict"].some(s=>s in n))return[r,n.value]}return[r,o]})),Zp=(t,e,r,o=!0)=>Object.fromEntries(Object.entries(t).map(([n,s])=>{if(Ie.isObject(s)&&o)return[n,Zp(s,e,r,!1)];if(Ie.isFunction(s)){let i=s();if(Ie.isObject(i)&&"value"in i&&e in i){let a=Ie.isString(i[e])?i[e].toUpperCase():i[e];return[n,a]}}return[n,r]})),em=({data:t,depth:e,logStyle:r})=>e>2?(rl(e,r),{}):Qp(t),Jo=({data:t,prop:e,depth:r,logStyle:o,fallback:n})=>r>2?(rl(r,o),{}):Zp(t,e,n),tm=({value:t})=>Re(Map,t)?new Map(t):Re(Set,t)?new Set(t):Re(Object,t)?{...t}:Re(Array,t)?[...t]:t,Br=({instanceId:t,prop:e})=>{let r=ie(t);if(!r)return!1;let{callBackComputed:o}=r,n=[...o].some(({prop:s})=>e===s);return n&&console.warn(`${e} is used as computed target, set and multiple computed on same prop is blocked.`),n};var RC=({instanceId:t,prop:e,val:r,fireCallback:o=!0,useStrict:n=!0,initalizeStep:s=!1})=>{let i=ie(t);if(!i)return;let{type:a,fnTransformation:c,store:l,fnValidate:p,strict:h,validationStatusObject:f,skipEqual:d,watcherByProp:y,bindInstanceBy:v}=i,T=ze(),S=a[e]==="ANY";if(Ie.isObject(r)&&!S){Bp(e,r,T);return}if(Ie.isObject(l[e])&&!S){Vp(e,T);return}let _=l[e],E=c[e]?.(r,_)??r;if(!Re(a[e],E)){Wp(e,E,a[e],T);return}let w=p[e]?.(E,_);!w&&s&&nl(e,T),!(h[e]&&!w&&n||(f[e]=w,(d[e]?bi(a[e],_,E):!1)&&!s))&&(l[e]=E,$e(t,{...i,store:l,validationStatusObject:f}),o&&!s&&(qo({watcherByProp:y,prop:e,newValue:E,oldValue:_,validationValue:f[e],instanceId:t}),br({instanceId:t,prop:e}),v.forEach(N=>{br({instanceId:N,prop:e})})))},PC=({instanceId:t,prop:e,val:r,fireCallback:o=!0,useStrict:n=!0,initalizeStep:s=!1})=>{let i=ie(t);if(!i)return;let{store:a,type:c,strict:l,fnTransformation:p,fnValidate:h,validationStatusObject:f,skipEqual:d,watcherByProp:y,bindInstanceBy:v}=i,T=ze();if(!Ie.isObject(r)){jp(e,r,T);return}if(!Ie.isObject(a[e])){zp(e,T);return}let S=Object.keys(r),_=Object.keys(a[e]);if(!S.every(k=>_.includes(k))){Hp(S,e,T);return}let x=Object.fromEntries(Object.entries(r).map(k=>{let[L,C]=k,M=a[e][L];return!s&&bi(c[e][L],C,M)?[L,C]:[L,p[e][L]?.(C,M)??C]}));if(!Object.entries(x).map(k=>{let[L,C]=k,M=Re(c[e][L],C);return M||Gp(e,L,C,c[e][L],T),M}).every(k=>k===!0))return;let I=Object.entries(x).map(k=>{let[L,C]=k,M=a[e][L];return l[e][L]&&n?{strictCheck:h[e][L]?.(C,M),item:k}:{strictCheck:!0,item:k}}).filter(({strictCheck:k})=>k===!0);if(I.length===0)return;let A=Object.fromEntries(I.map(({item:k})=>k).map(([k,L])=>[k,L]));Object.entries(A).forEach(k=>{let[L,C]=k,M=a[e][L],D=h[e][L]?.(C,M);!D&&s&&nl(e,T),D===void 0&&Xp(T,"ANY"),f[e][L]=D});let O=a[e],R={...a[e],...A},P=Object.keys(A).every(k=>d[e][k]===!0),$=!0;for(let[k,L]of Object.entries(A)){let C=c[e][k]==="ANY";as(L)>1&&!C&&(Up(e,x,T),f[e][k]=!1,$=!1)}if(!$){$e(t,{...i,validationStatusObject:f});return}P&&Object.entries(R).every(([k,L])=>bi(c[e][k],O[k],L))&&!s||(a[e]=R,$e(t,{...i,store:a,validationStatusObject:f}),o&&!s&&(qo({watcherByProp:y,prop:e,newValue:a[e],oldValue:O,validationValue:f[e],instanceId:t}),br({instanceId:t,prop:e}),v.forEach(k=>{br({instanceId:k,prop:e})})))},vr=({instanceId:t,prop:e,value:r,fireCallback:o=!0,clone:n=!1,useStrict:s=!0,action:i,initalizeStep:a=!1})=>{let c=ie(t);if(!c)return;let{store:l,type:p}=c;if(!l)return;let h=ze();if(!(e in l)){Dp(e,h);return}let f=n?tm({value:l[e]}):l[e],d=i===vi?r(f):r,y=p[e]==="ANY";if(Ie.isObject(f)&&!y){PC({instanceId:t,prop:e,val:d,fireCallback:o,useStrict:s,initalizeStep:a});return}RC({instanceId:t,prop:e,val:d,fireCallback:o,useStrict:s,initalizeStep:a})},rm=({instanceId:t,prop:e,value:r})=>{let o=ie(t);if(!o)return;let{store:n,watcherByProp:s}=o;if(!(e in n))return;let i=n[e];n[e]=r,$e(t,{...o,store:n}),qo({watcherByProp:s,prop:e,newValue:r,oldValue:i,validationValue:!0,instanceId:t})},om=({store:t,bindInstance:e})=>e.reduce((r,o)=>{let n=ie(o);if(!n)return r;let{store:s}=n;return{...r,...s}},t),NC=t=>{let e=ie(t);if(!e)return;let{computedPropsQueque:r,callBackComputed:o,store:n,bindInstance:s}=e,i=[...o??[]].filter(({keys:l})=>[...r].find(p=>l.includes(p))),a=om({store:n,bindInstance:s}),c=i.map(({prop:l,keys:p,fn:h})=>{let f=Object.fromEntries(p.map(d=>[d,a[d]]));return{prop:l,value:h(f)}});$e(t,{...e,computedPropsQueque:new Set,computedRunning:!1}),c.forEach(({prop:l,value:p})=>{vr({instanceId:t,prop:l,value:p,action:"SET"})})},br=({instanceId:t,prop:e})=>{let r=ie(t);if(!r)return;let{callBackComputed:o,computedPropsQueque:n,computedRunning:s}=r;if(!(!o||o.size===0)&&(n.add(e),$e(t,{...r,computedPropsQueque:n}),!s)){let i=ie(t);if(!i)return;$e(t,{...i,computedRunning:!0}),Ft(()=>NC(t))}},AC=({instanceId:t,prop:e,keys:r,fn:o})=>{let n=ie(t);if(!n)return;let{callBackComputed:s}=n,i=[...s].reduce((a,{prop:c,keys:l})=>l.includes(e)&&r.includes(c)&&!a,!1);if(r.includes(e)||i){Jp(r,ze());return}s.add({prop:e,keys:r,fn:o}),$e(t,{...n,callBackComputed:s})},OC=({instanceId:t,prop:e,keys:r,callback:o})=>{let n=ie(t);if(!n)return;let{store:s,bindInstance:i}=n,a=om({store:s,bindInstance:i}),c=Object.fromEntries(r.map(p=>{if(p in a)return[p,a[p]]}).filter(p=>p!==void 0)),l=o(c);vr({instanceId:t,prop:e,value:l,fireCallback:!1,clone:!1,action:"SET"})},nm=({instanceId:t,prop:e,keys:r,callback:o})=>{if(Br({instanceId:t,prop:e}))return;let s=r.length===0?(ss(),o({}),Qc()):r;OC({instanceId:t,prop:e,keys:s,callback:o}),AC({instanceId:t,prop:e,keys:s,fn:o})};var sm=t=>{let{store:e}=t,r=Object.entries(e).reduce((o,n)=>{let[s,i]=n;return Ie.isObject(i)?{...o,[s]:{}}:o},{});return{...t,validationStatusObject:r}},im=(t,e)=>{let{store:r}=e;Object.entries(r).forEach(o=>{let[n,s]=o;vr({instanceId:t,prop:n,value:s,fireCallback:!1,useStrict:!1,action:"SET",initalizeStep:!0})})};var $C=({state:t,prop:e,callback:r,wait:o})=>{let{store:n,watcherByProp:s,watcherMetadata:i}=t,a=ze();if(!n)return{state:void 0,unsubscribeId:""};if(!(e in n))return Yp(e,a),{state:void 0,unsubscribeId:""};let c=we();return s.has(e)||s.set(e,new Map),s.get(e)?.set(c,{fn:r,wait:o}),i.set(c,e),{state:{...t,watcherByProp:s,watcherMetadata:i},unsubscribeId:c}},LC=({instanceId:t,unsubscribeId:e})=>{let r=ie(t);if(!r)return;let{watcherByProp:o,watcherMetadata:n}=r;if(!o||!n)return;let s=n.get(e);s&&(o.get(s)?.delete(e),n.delete(e),o.get(s)?.size===0&&o.delete(s),$e(t,{...r,watcherByProp:o,watcherMetadata:n}))},am=({instanceId:t,prop:e,callback:r,wait:o})=>{let n=ie(t);if(!n)return()=>{};let{state:s,unsubscribeId:i}=$C({state:n,prop:e,callback:r,wait:o});return s?($e(t,s),()=>{LC({instanceId:t,unsubscribeId:i})}):()=>{}},cm=({instanceId:t,prop:e,callback:r,wait:o})=>{let n=ie(t);if(!n)return()=>{};let{bindInstance:s,unsubscribeBindInstance:i}=n;if(!s||s.length===0)return am({instanceId:t,prop:e,callback:r,wait:o});let a=[t,...s].find(p=>{let h=ie(p)?.store;return h&&e in h})??"",c=am({instanceId:a,prop:e,callback:r,wait:o}),l=ie(t);return l?($e(t,{...l,unsubscribeBindInstance:[...i,c]}),()=>{c();let p=ie(t);p&&$e(t,{...p,unsubscribeBindInstance:p.unsubscribeBindInstance.filter(h=>h!==c)})}):()=>{}};var lm=t=>{let e=as(t);return{watcherByProp:new Map,watcherMetadata:new Map,callBackComputed:new Set,computedPropsQueque:new Set,validationStatusObject:{},dataDepth:e,computedRunning:!1,store:em({data:t,depth:e,logStyle:ze()}),type:Jo({data:t,prop:"type",depth:e,logStyle:ze(),fallback:Kc}),fnTransformation:Jo({data:t,prop:"transform",depth:e,logStyle:ze(),fallback:r=>r}),fnValidate:Jo({data:t,prop:"validate",depth:e,logStyle:ze(),fallback:()=>!0}),strict:Jo({data:t,prop:"strict",depth:e,logStyle:ze(),fallback:!1}),skipEqual:Jo({data:t,prop:"skipEqual",depth:e,logStyle:ze(),fallback:!0}),proxiObject:void 0,bindInstance:[],bindInstanceBy:[],unsubscribeBindInstance:[],proxiReadOnlyProp:new Set}};var um=t=>{let e=ie(t);if(!e)return{};let{store:r}=e;return r??{}},mm=t=>{let e=ie(t);if(!e)return{};let{bindInstance:r}=e;return!r||r.length===0?um(t):Object.fromEntries([...r,t].flatMap(o=>Object.entries(um(o))))},pm=({instanceId:t,prop:e})=>{let r=ie(t);if(!r)return;let o=r?.store;if(o&&e in o)return o[e];qp(e,ze())},hm=({instanceId:t,prop:e})=>{let r=ie(t);if(!r)return;let{bindInstance:o}=r;if(!o||o.length===0)return pm({instanceId:t,prop:e});let n=[t,...o].find(s=>{let i=qe.get(s)?.store;return i&&e in i})??"";return pm({instanceId:n,prop:e})};var dm=({instanceId:t,prop:e})=>{let r=ie(t);if(!r)return;let{store:o,watcherByProp:n,validationStatusObject:s,bindInstanceBy:i}=r;o&&(e in o?(qo({watcherByProp:n,prop:e,newValue:o[e],oldValue:o[e],validationValue:s[e],instanceId:t}),br({instanceId:t,prop:e}),i.forEach(a=>{br({instanceId:a,prop:e})})):ol(e,ze()))},_i=({instanceId:t,prop:e})=>{let r=ie(t);if(!r)return;let{bindInstance:o}=r;if(!o||o.length===0){dm({instanceId:t,prop:e});return}let n=[t,...o].find(s=>{let i=qe.get(s)?.store;return i&&e in i})??"";dm({instanceId:n,prop:e})},fm=async({instanceId:t,prop:e})=>{let r=ie(t);if(!r)return new Promise(a=>a({success:!1}));let{store:o,watcherByProp:n,validationStatusObject:s,bindInstanceBy:i}=r;return o?e in o?(await $p({watcherByProp:n,prop:e,newValue:o[e],oldValue:o[e],validationValue:s[e]}),br({instanceId:t,prop:e}),i.forEach(a=>{br({instanceId:a,prop:e})}),{success:!0}):(ol(e,ze()),{success:!1}):new Promise(a=>a({success:!1}))},gm=async({instanceId:t,prop:e})=>{let r=ie(t);if(!r)return new Promise(s=>s(""));let{bindInstance:o}=r;if(!o||o.length===0)return fm({instanceId:t,prop:e});let n=[t,...o].find(s=>{let i=qe.get(s)?.store;return i&&e in i})??"";return fm({instanceId:n,prop:e})};var bm=({instanceId:t})=>{let e=ie(t);if(!e)return;let{validationStatusObject:r}=e;return r},vm=({instanceId:t})=>{let e=ie(t);if(!e)return;let{store:r}=e;console.log(r)},ym=({instanceId:t})=>{let e=ie(t);if(!e)return;let{validationStatusObject:r}=e;console.log(r)},Tm=({instanceId:t})=>{let e=ie(t);console.log(e)};var FC=t=>!(t==null||!Re(Object,t)||Re(Map,t)||Re(Set,t)||Re(Function,t)),DC=t=>{let e=ze();return new Proxy({},{set(r,o,n){let s=qe.get(t);if(!s||!(o in s.store))return!1;let i=Br({instanceId:t,prop:o}),a=s.proxiReadOnlyProp.has(o);return a&&Kp(o,e),i||a?!1:(vr({instanceId:t,prop:o,value:n,fireCallback:!0,clone:!1,action:"SET"}),!0)},get(r,o){if(!qe.has(t))return;let n=qe.get(t);if(!n)return;let s;if(o in n.store&&(s=n.store[o],Ti(o)),!(o in n.store))for(let i of n.bindInstance){let a=qe.get(i);if(a&&o in a.store){s=a.store[o],Ti(o);break}}if(s!==void 0)return FC(s)?Array.isArray(s)?Object.freeze([...s]):Object.freeze({...s}):s},has(r,o){if(!qe.has(t))return!1;let n=qe.get(t);if(!n)return!1;if(o in n.store)return!0;for(let s of n.bindInstance){let i=qe.get(s);if(i&&o in i.store)return!0}return!1}})},_m=({instanceId:t})=>{let e=qe.get(t);if(!e)return{};if(e.proxiObject)return e.proxiObject;let r=DC(t);return $e(t,{...e,proxiObject:r}),r};var BC=({selfId:t,bindId:e})=>{let r=ie(e);if(!r)return;let{bindInstanceBy:o}=r,n=[...o,t];$e(e,{...r,bindInstanceBy:n})},Sm=({selfId:t,bindId:e})=>{let r=ie(e);if(!r)return;let{bindInstanceBy:o}=r,n=o.filter(s=>s!==t);$e(e,{...r,bindInstanceBy:n})},VC=({bindStores:t,selfStore:e})=>{let o=[...Re(Array,t)?t.map(n=>n.get()):[t.get()],e.store];o.forEach((n,s)=>{o.forEach((i,a)=>{if(s<=a)return;let c=Object.keys(n).filter(l=>Object.keys(i).includes(l));c.length>0&&console.warn(`bindStore: prop conflict on following prop: '${c}', bind store key must be univoque'`)})})},xm=({value:t,instanceId:e})=>{let r=ie(e);if(!r)return;VC({bindStores:t,selfStore:r});let{bindInstance:o,bindInstanceBy:n}=r;if(!o)return;let s=Re(Array,t)?t.map(p=>p.getId()):[t.getId()],i=n.every(p=>!s.includes(p)),a=s.every(p=>!o.includes(p)),c=s.includes(e);if(!i||c){console.warn(`${e}, binding store failed, circular dependencies found.`);return}if(!a){console.warn(`${e}, binding store failed, store is binded more than once.`);return}let l=[...o,...s];$e(e,{...r,bindInstance:l}),s.forEach(p=>{BC({selfId:e,bindId:p})})};var Cm=t=>{let e=qe.get(t);if(!e)return;e.bindInstanceBy.length>0&&console.warn(`${t} store will be destroyed but is used by another store.`),e.callBackComputed.clear(),e.computedPropsQueque.clear(),e.watcherByProp.clear(),e.watcherMetadata.clear(),e.store={},e.proxiObject=null;let{unsubscribeBindInstance:r,bindInstance:o}=e;[...r].toReversed().forEach(n=>{n?.()}),e.unsubscribeBindInstance.length=0,o.forEach(n=>{Sm({selfId:t,bindId:n})}),Op(t),Fp(t)};var Em=({instanceId:t,values:e})=>{let r=ie(t);if(!r)return;let{proxiReadOnlyProp:o}=r;e.forEach(n=>{o.add(n)}),$e(t,r)};var Si=(t={})=>{let e=we(),r=lm(t),o=sm(r);return $e(e,o),im(e,r),{getId:()=>e,bindStore:n=>{xm({value:n,instanceId:e})},get:()=>mm(e),getProp:n=>hm({instanceId:e,prop:n}),set:(n,s,{emit:i=!0,usePropAsString:a=!1}={})=>{let c=a?n:Dr(n);Br({instanceId:e,prop:c})||vr({instanceId:e,prop:c,value:s,fireCallback:i??!0,clone:!1,action:"SET"})},update:(n,s,{emit:i=!0,clone:a=!1,usePropAsString:c=!1}={})=>{let l=c?n:Dr(n);Br({instanceId:e,prop:l})||vr({instanceId:e,prop:l,value:s,fireCallback:i??!0,clone:a,action:vi})},getProxi:()=>_m({instanceId:e}),quickSetProp:(n,s)=>{Br({instanceId:e,prop:n})||rm({instanceId:e,prop:n,value:s})},watch:(n,s,{wait:i=!1,immediate:a=!1}={})=>{let c=Dr(n),l=cm({instanceId:e,prop:c,callback:s,wait:i});return a&&Ft(()=>{_i({instanceId:e,prop:c})}),l},computed:(n,s,i=[],{usePropAsString:a=!1}={})=>{let c=a?n:Dr(n),l=el(i);nm({instanceId:e,prop:c,keys:l,callback:s}),Ft(()=>{_i({instanceId:e,prop:c})})},emit:n=>{let s=Dr(n);_i({instanceId:e,prop:s})},emitAsync:async n=>{let s=Dr(n);return gm({instanceId:e,prop:s})},setProxiReadOnlyProp:n=>{Em({instanceId:e,values:n})},getValidation:()=>bm({instanceId:e}),debug:()=>{Tm({instanceId:e})},debugStore:()=>{vm({instanceId:e})},debugValidate:()=>{ym({instanceId:e})},destroy:()=>{Cm(e)}}};var Ce=Si({usePassive:()=>({value:!1,type:Boolean}),currentFrame:()=>({value:0,type:Number}),instantFps:()=>({value:60,type:Number}),requestFrame:()=>({value:()=>{},type:Function}),deferredNextTick:()=>({value:!0,type:Boolean}),throttle:()=>({value:60,type:Number}),spinYMaxValue:()=>({value:2.5,type:Number}),spinXMaxValue:()=>({value:2.5,type:Number})});var sl=!1,cs=new Map;function wm(){if(cs.size===0){globalThis.removeEventListener("DOMContentLoaded",wm),sl=!1;return}for(let t of cs.values())t();cs.clear()}function WC(){sl||(sl=!0,globalThis.addEventListener("DOMContentLoaded",wm,{passive:!1}))}var jC=t=>{let e=we();return cs.set(e,t),typeof globalThis<"u"&&WC(),()=>cs.delete(e)},Im=jC;function ls(t){let e=0,r=0,o=0,n=0;return"detail"in t&&(r=t.detail),"wheelDelta"in t&&(r=-t.wheelDelta/120),"wheelDeltaY"in t&&(r=-t.wheelDeltaY/120),"wheelDeltaX"in t&&(e=-t.wheelDeltaX/120),"axis"in t&&t.axis===t.HORIZONTAL_AXIS&&(e=r,r=0),o=e*10,n=r*10,"deltaY"in t&&(n=t.deltaY),"deltaX"in t&&(o=t.deltaX),(o||n)&&t.deltaMode&&(t.deltaMode==1?(o*=40,n*=40):(o*=800,n*=800)),o&&!e&&(e=o<1?-1:1),n&&!r&&(r=n<1?-1:1),{spinX:e,spinY:r,pixelX:o,pixelY:n}}function zC({type:t,event:e}){let r=e;return t==="touchend"&&"changedTouches"in e?r.changedTouches[0]:"touches"in r?r.touches[0]:e}function Wr(t){let e=!1,r=new Map,{usePassive:o}=Ce.get();Ce.watch("usePassive",()=>{globalThis.removeEventListener(t,n),e=!1,s()});function n(a){if(r.size===0){globalThis.removeEventListener(t,n),e=!1;return}let c=a.type,{pageX:l,pageY:p,clientX:h,clientY:f}=zC({type:c,event:a}),d=a.target,y={page:{x:l,y:p},client:{x:h,y:f},target:d,type:c,preventDefault:()=>o?()=>{}:a.preventDefault(),spinX:0,spinY:0,pixelX:0,pixelY:0};if(c==="wheel"){let v=Ce.getProp("spinYMaxValue"),T=Ce.getProp("spinXMaxValue"),{spinX:S,spinY:_,pixelX:E,pixelY:x}=ls(a);y.spinX=Xc(S,-T,T),y.spinY=Xc(_,-v,v),y.pixelX=E,y.pixelY=x}for(let v of r.values())v(y)}function s(){e||(e=!0,o=Ce.getProp("usePassive"),globalThis.addEventListener(t,n,{passive:o}))}return a=>{if(globalThis.window===void 0)return()=>{};let c=we();return r.set(c,a),s(),()=>{r.delete(c),r.size===0&&e&&(globalThis.removeEventListener(t,n),e=!1)}}}var Mm=Wr("click"),km=Wr("mousedown"),Rm=Wr("touchstart"),Pm=Wr("mousemove"),Nm=Wr("touchmove"),Am=Wr("mouseup"),Om=Wr("touchend"),$m=Wr("wheel");var Co=0,Ze=new Map,HC=(t=()=>{})=>{let e=we();return Ze.set(e,{fn:t,data:new Map,freeze:{active:!1,atFrame:0}}),{id:e,unsubscribe:()=>{if(Ze.has(e)){let r=Ze.get(e);if(!r)return;let o=r.data.size;if(Ze.delete(e),!o)return;Co=Co-o}}}},UC=({id:t,callBackObject:e,frame:r})=>{if(!Ze.has(t))return;let o=Math.max(r,0),{currentFrame:n}=Ce.get(),s=Ze.get(t);if(!s?.data)return;let{data:i}=s;i.has(o+n)||(i.set(o+n,e),Co++)},GC=t=>{Ze.has(t)&&Ze.delete(t)},qC=t=>{let e=Ze.get(t);if(!e||e.freeze.active)return;let{currentFrame:r}=Ce.get();e.freeze={active:!0,atFrame:r}},JC=({id:t,update:e=!0})=>{let r=Ze.get(t);if(!r||!r.freeze.active)return;if(!e){r.freeze={active:!1,atFrame:0};return}let{currentFrame:o}=Ce.get(),{atFrame:n}=r.freeze,s=[];for(let[i,a]of r.data){let c=i+o-n;r.data.delete(i),s.push({frame:c,value:a})}s.forEach(({frame:i,value:a})=>{r.data.set(i,a)}),s.length=0,r.freeze={active:!1,atFrame:0}},YC=t=>{let e=Ze.get(t);if(!e)return;let r=e.data.size;Co=Co-r,e.data.clear()},XC=t=>Ze.get(t)??{},KC=t=>{for(let e of Ze.values()){let{data:r,fn:o,freeze:n}=e,s=r.get(t);s&&!n.active&&(o(s),r.delete(t),Co--)}},QC=({id:t,obj:e={}})=>{if(!Ze.has(t))return;let r=Ze.get(t);if(!r)return;let{fn:o,freeze:n}=r;n.active||o(e)},ZC=()=>Co,eE=t=>{for(let[e,r]of Ze){let{data:o,fn:n,freeze:s}=r,i=new Map;for(let[a,c]of o)i.set(a-t,c),o.delete(a);Ze.set(e,{data:i,fn:n,freeze:s.active?{...s,atFrame:s.atFrame-t}:s})}},Yo={add:HC,get:XC,update:UC,remove:GC,clean:YC,fire:KC,fireObject:QC,getCacheCounter:ZC,updateFrameId:eE,freeze:qC,unFreeze:JC};var il=!1,xi=new Map;function Lm(){if(xi.size===0){globalThis.removeEventListener("visibilitychange",Lm),il=!1;return}let t={visibilityState:document.visibilityState};for(let e of xi.values())e(t)}function tE(){il||(il=!0,globalThis.addEventListener("visibilitychange",Lm,{passive:!1}))}var rE=t=>{let e=we();return xi.set(e,t),typeof globalThis<"u"&&tE(),()=>xi.delete(e)},Ci=rE;var us=[],oE=(t=()=>{},e=100)=>{us.push({cb:t,priority:e})},nE=({time:t,fps:e})=>{us.length!==0&&(us.sort((r,o)=>r.priority-o.priority),us.forEach(({cb:r})=>r({time:t,fps:e})),us.length=0)},xt={add:oE,fire:nE};var al=[],sE=t=>{al.push(t)},iE=()=>{let t=[...al];return al.length=0,t},Xo={add:sE,get:iE};var jr=new Map,aE=t=>{let e=[...jr.entries()];jr.clear(),e.forEach(([r,o])=>{jr.set(r-t,o)})},cE=({currentFrame:t,time:e,fps:r})=>{let o=jr.get(t)??[];!o||o.length===0||(o.forEach(n=>n({time:e,fps:r})),jr.delete(t))},lE=(t,e)=>{let o=Math.max(e,0)+Ce.getProp("currentFrame"),n=jr.get(o)??[];jr.set(o,[...n,t]),Ce.emit("requestFrame")},uE=()=>jr.size,Ko={add:lE,fire:cE,updateKeys:aE,getAmountOfFrameToFire:uE};var cl="animationStop",Fm=()=>{globalThis.addEventListener("unhandledrejection",t=>{t.reason===cl&&t.preventDefault()})};var Dm=!1,Ei=({force:t=!1,duration:e=30}={})=>{if(Dm&&!t){let{instantFps:r}=Ce.get();return new Promise(o=>{o({averageFPS:r})})}return new Promise(r=>{let o=[],s=0,i=0,a=0,c=0,l=0,p=h=>{if(h*=.001,c===0){c=h,requestAnimationFrame(p);return}let f=h-c;c=h;let d=Number.isFinite(1/f)?1/f:60,y=Math.max(d,60);a+=y-(o[s]||0),o[s++]=y,i=Math.max(i,s),s%=25;let v=Math.round(a/i);if(l++,l>=e){Ce.quickSetProp("instantFps",v),Dm=!0,r({averageFPS:v});return}requestAnimationFrame(p)};requestAnimationFrame(p)})};Ei();var ml=1e7,jm=2e3,hl=!1,Eo=[],et=Lt(),Bm=0,ll=Lt(),ul=0,dl=0,pl=0,Qo=!1,Ct=60,Ri=Ct,wi=0,Ii=0,yr=0,Mi=!1,ki=!1,pE=()=>Ct<Ri/5*3,mE=()=>Ct<Ri/5*4,hE=()=>{!pE()||Mi||(Mi=!0,setTimeout(()=>{Mi=!1},4e3))},dE=()=>{!mE()||ki||(ki=!0,setTimeout(()=>{ki=!1},4e3))},fE=()=>{yr=0,Ce.quickSetProp("currentFrame",yr),Ko.updateKeys(ml),Yo.updateFrameId(ml)};Ci(({visibilityState:t})=>{Qo=t!=="visible"});Fm();Ce.watch("requestFrame",()=>{Pi()});var Vm=()=>{yr>=ml&&fE(),xt.fire({time:et,fps:Ct});let t=Xo.get();if(t.length>0)for(let e of t)Eo.push(e);hl=!1,Eo.length>0||Ko.getAmountOfFrameToFire()>0||Yo.getCacheCounter()>0||et<jm?Pi():(Qo=!0,yr=0,dl=et,Ce.quickSetProp("currentFrame",yr))},Wm=t=>{et=t,ul=et-ll,Qo&&(Bm+=ul),ll+=ul,et=Math.round(ll-Bm);let e=Math.round(1e3/Ct);pl=Math.abs(et-dl-e);let r=pl>100?pl:0;et=et-r,dl=et,Qo?(Ii=et,wi=0,Ct=Ce.getProp("instantFps")):wi++,et>Ii+1e3&&!Qo&&(Ct=et>jm?Math.round(wi*1e3/(et-Ii)):Ce.getProp("instantFps"),Ii=et,wi=0),Ct>Ri&&(Ri=Ct),hE(),dE(),Eo.forEach(n=>n({time:et,fps:Ct})),Ko.fire({currentFrame:yr,time:et,fps:Ct}),Yo.fire(yr),yr++,Ce.quickSetProp("currentFrame",yr),Eo.length=0,Qo=!1,Ce.getProp("deferredNextTick")?Ft(()=>Vm()):Vm()},Pi=()=>{hl||(typeof globalThis>"u"?setTimeout(()=>Wm(Lt()),Cp):requestAnimationFrame(Wm),hl=!0)},Dt={add:s=>{Eo.push(s),Pi()},addMultiple:(s=[])=>{Eo=[...Eo,...s],Pi()},getFps:()=>Ct,mustMakeSomething:()=>Mi,shouldMakeSomething:()=>ki};var ms=!1,ps=new Map,Ni=()=>{},fl=0,gl=0;function gE(){if(ps.size===0){globalThis.removeEventListener("resize",Ni),ms=!1;return}let t=globalThis.innerHeight,e=globalThis.innerWidth,r=t!==fl,o=e!==gl;fl=t,gl=e;let n={scrollY:globalThis.scrollY,windowsHeight:t,windowsWidth:e,documentHeight:document.documentElement.scrollHeight,verticalResize:r,horizontalResize:o};for(let s of ps.values())s(n)}function bE(){ms||(ms=!0,fl=globalThis.window.innerHeight,gl=globalThis.window.innerWidth,Ni=So(()=>gE()),globalThis.addEventListener("resize",Ni,{passive:!1}))}var vE=t=>{if(globalThis.window===void 0)return()=>{};let e=we();return ps.set(e,t),bE(),()=>{ps.delete(e),ps.size===0&&ms&&(globalThis.removeEventListener("resize",Ni),ms=!1)}},zm=vE;var ds=!1,hs=new Map,yE="UP",Um="DOWN",bl=0,Zo=0,vl=Um,Hm={scrollY:Zo,direction:vl};function yl(){if(hs.size===0){globalThis.removeEventListener("scroll",yl),ds=!1;return}bl=Zo,Zo=globalThis.scrollY,vl=Zo>bl?Um:yE,Hm={scrollY:Zo,direction:vl};for(let t of hs.values())t(Hm)}function TE(){ds||(ds=!0,bl=globalThis.scrollY,Zo=globalThis.scrollY,window.addEventListener("scroll",yl,{passive:!0}))}var _E=t=>{if(globalThis.window===void 0)return()=>{};let e=we();return hs.set(e,t),TE(),()=>{hs.delete(e),hs.size===0&&ds&&(globalThis.removeEventListener("scroll",yl),ds=!1)}},Tr=_E;var gs=!1,fs=new Map,Tl=()=>{};function SE(t){if(fs.size===0){Tl(),gs=!1;return}Dt.add(()=>{xt.add(()=>{for(let e of fs.values())e(t)},0)})}function xE(){gs||(gs=!0,Tl=Tr(SE))}var CE=t=>{if(globalThis.window===void 0)return()=>{};let e=we();return fs.set(e,t),xE(),()=>{fs.delete(e),fs.size===0&&gs&&(Tl(),gs=!1)}},Gm=CE;var vs=!1,bs=new Map,qm=()=>{},_l=()=>{};function EE(t){if(bs.size===0){_l(),vs=!1;return}Dt.add(()=>{xt.add(()=>{for(let e of bs.values())e(t)},0)})}function wE(){vs||(vs=!0,qm=di(t=>EE(t),Ce.getProp("throttle")),_l=Tr(qm))}var IE=t=>{if(globalThis.window===void 0)return()=>{};let e=we();return bs.set(e,t),wE(),()=>{bs.delete(e),bs.size===0&&vs&&(_l(),vs=!1)}},Jm=IE;function Ym(t){let e=()=>{},r=()=>{},o=()=>{},n=!1,s=new Map,i=!1;function a(){if(i=!1,s.size===0){r(),t==="START"&&e(),n=!1;return}Dt.add(()=>{xt.add(()=>{let p={scrollY:globalThis.scrollY};if(t==="END")for(let h of s.values())h(p)},0)})}function c(){n||(n=!0,o=So(()=>a()),r=Tr(o),t==="START"&&(e=Tr(({scrollY:p})=>{let h={scrollY:p};if(!i){i=!0;for(let f of s.values())f(h)}})))}return p=>{if(globalThis.window===void 0)return()=>{};let h=we();return s.set(h,p),c(),()=>{s.delete(h),s.size===0&&n&&a()}}}var Xm=Ym("START"),Km=Ym("END");function en(t){let e=!1,r=new Map;function o(i){if(r.size===0){globalThis.removeEventListener(t,o),e=!1;return}for(let a of r.values())a(i)}function n(){e||(e=!0,globalThis.addEventListener(t,o))}return i=>{if(globalThis.window===void 0)return()=>{};let a=we();return r.set(a,i),n(),()=>{r.delete(a),r.size===0&&e&&(globalThis.removeEventListener(t,o),e=!1)}}}var Qm=en("pointerover"),Zm=en("pointerdown"),eh=en("pointermove"),th=en("pointerup"),rh=en("pointerout"),oh=en("pointerleave");var He=Symbol("LinkedList.setNext"),Ue=Symbol("LinkedList.setPrev"),Ai="after",Sl="before",tn=class{#n=null;#t=null;constructor(e){this.data=e}get next(){return this.#n}[He](e){this.#n=e}get prev(){return this.#t}[Ue](e){this.#t=e}dispose(){this.data=null,this.#n=null,this.#t=null}},Oi=class t{#n=null;#t=null;#i=0;#l=new WeakSet;addLast(e){let r=new tn(e);return this.#l.add(r),this.#n?(this.#t&&this.#t[He](r),r[Ue](this.#t),this.#t=r,this.#i++,this):(this.#n=r,this.#t=r,this.#i++,this)}addFirst(e){let r=new tn(e);return this.#l.add(r),this.#n?(r[He](this.#n),this.#n[Ue](r),this.#n=r,this.#i++,this):(this.#n=r,this.#t=r,this.#i++,this)}removeNode(e){return!e||!this.#l.has(e)?this:e===this.#n?this.removeFirst():e===this.#t?this.removeLast():(e.prev&&e.prev[He](e.next),e.next&&e.next[Ue](e.prev),e.dispose(),this.#i--,this)}removeFirst(){if(this.#n===null)return this;let e=this.#n;return this.#n=this.#n.next,this.#n&&this.#n[Ue](null),this.#n===null&&(this.#t=null),e.dispose(),this.#i--,this}removeLast(){if(this.#t===null)return this;let e=this.#t;return this.#t=this.#t.prev,this.#t&&this.#t[He](null),this.#t===null&&(this.#n=null),e.dispose(),this.#i--,this}insertAfter(e,r){if(!e||!this.#l.has(e))return this;let o=new tn(r);return this.#l.add(o),o[Ue](e),o[He](e.next),e.next&&e.next[Ue](o),e[He](o),e===this.#t&&(this.#t=o),this.#i++,this}insertBefore(e,r){if(!e||!this.#l.has(e))return this;let o=new tn(r);return this.#l.add(o),o[He](e),o[Ue](e.prev),e.prev&&e.prev[He](o),e[Ue](o),e===this.#n&&(this.#n=o),this.#i++,this}move(e,r,o=Ai){return!this.#l.has(e)||!this.#l.has(r)?this:e===r?this:o===Ai&&r.next===e?this:o===Sl&&r.prev===e?this:(e.prev&&e.prev[He](e.next),e.next&&e.next[Ue](e.prev),e===this.#n&&(this.#n=e.next),e===this.#t&&(this.#t=e.prev),o==Ai&&(e[Ue](r),e[He](r.next),r.next&&r.next[Ue](e),r[He](e),r===this.#t&&(this.#t=e)),o==Sl&&(e[Ue](r.prev),e[He](r),r.prev&&r.prev[He](e),r[Ue](e),r===this.#n&&(this.#n=e)),this)}moveAfter(e,r){return this.move(e,r,Ai)}moveBefore(e,r){return this.move(e,r,Sl)}swap(e,r){if(!this.#l.has(e)||!this.#l.has(r))return this;if(e===r)return this;if(e.next===r)return this.moveAfter(e,r);if(r.next===e)return this.moveAfter(r,e);let o=e.prev,n=e.next,s=r.prev,i=r.next,a=e===this.#n,c=e===this.#t,l=r===this.#n,p=r===this.#t;return o&&o[He](n),n&&n[Ue](o),s&&s[He](i),i&&i[Ue](s),e[Ue](s),e[He](i),r[Ue](o),r[He](n),s&&s[He](e),i&&i[Ue](e),o&&o[He](r),n&&n[Ue](r),a?this.#n=r:l&&(this.#n=e),c?this.#t=r:p&&(this.#t=e),this}find(e){let r=this.#n,o;for(;r!==null;){if(e(r)){o=r;break}r=r.next}return o}filter(e){let r=this.#n,o=new t,n=0;for(;r!==null;)e(r,n)&&o.addLast(r.data),r=r.next,n++;return o}map(e){let r=this.#n,o=new t,n=0;for(;r!==null;)o.addLast(e(r,n)),r=r.next,n++;return o}*[Symbol.iterator](){let e=this.#n;for(;e;)yield e,e=e.next}traverse(e){let r=this.#n;for(;r!==null;)e(r),r=r.next;return this}async traverseAsync(e){let r=this.#n;for(;r!==null;)await e(r),r=r.next;return this}traverseReverse(e){let r=this.#t;for(;r!==null;)e(r),r=r.prev;return this}async traverseReverseAsync(e){let r=this.#t;for(;r!==null;)await e(r),r=r.prev;return this}execute(e){return e(this),this}async executeAsync(e){return await e(this),this}print(){let e=this.#n,r=[];for(;e!==null;)r.push(e.data),e=e.next;return console.log(r),this}clear(){let e=this.#n,r=[];for(;e!==null;)r.push(e),e=e.next;for(let o of r)o.dispose();return this.#n=null,this.#t=null,this.#i=0,r.length=0,this}reverse(){let e=this.#n;for(this.#n=this.#t,this.#t=e;e!==null;){let r=e.next,o=e.prev;e[He](o),e[Ue](r),e=r}return this}toArray(){let e=[],r=this.#n;for(;r!==null;)e.push(r.data),r=r.next;return e}toArrayReverse(){let e=[],r=this.#t;for(;r!==null;)e.push(r.data),r=r.prev;return e}get first(){return this.#n}get last(){return this.#t}get size(){return this.#i}};function ME(t){return Si(t)}function kE(){return Ce.getProp("instantFps")}function RE(){return Dt.getFps()}function PE(){return Dt.mustMakeSomething()}function NE(){return Dt.shouldMakeSomething()}function AE(t=()=>{}){return Dt.add(t)}function OE(t=()=>{}){return xt.add(t)}function $E(t=()=>{}){return Xo.add(t)}function LE(t=()=>{},e=0){return Ko.add(t,e)}async function FE({force:t=!1,duration:e=30}={}){return await Ei({force:t,duration:e})}function DE(t=()=>{}){return Im(t)}var BE=Yo;function VE(t=()=>{}){return zm(t)}function WE(t=()=>{}){return Ci(t)}function jE(t=()=>{}){return Mm(t)}function zE(t=()=>{}){return km(t)}function HE(t=()=>{}){return Rm(t)}function UE(t=()=>{}){return Pm(t)}function GE(t=()=>{}){return Nm(t)}function qE(t=()=>{}){return Am(t)}function JE(t=()=>{}){return Om(t)}function YE(t=()=>{}){return $m(t)}function XE(t=()=>{}){return Gm(t)}function KE(t=()=>{}){return Tr(t)}function QE(t=()=>{}){return Jm(t)}function ZE(t=()=>{}){return Xm(t)}function ew(t=()=>{}){return Km(t)}function tw(t=()=>{}){return Qm(t)}function rw(t=()=>{}){return Zm(t)}function ow(t=()=>{}){return eh(t)}function nw(t=()=>{}){return th(t)}function sw(t=()=>{}){return rh(t)}function iw(t=()=>{}){return oh(t)}var aw=Ce;function cw(){return new Oi}var m={};_o(m,{afterRouteChange:()=>ch,beforeRouteChange:()=>ah,componentMap:()=>j,createComponent:()=>Hd,eventDelegationMap:()=>Tn,getActiveParams:()=>ph,getActiveRoute:()=>uh,getChildrenIdByName:()=>$i,getComponentNameById:()=>Th,getDebugMode:()=>zd,getIdByInstanceName:()=>Yt,getNumberOfActiveInvalidate:()=>Qg,getNumberOfActiveRepeater:()=>Zg,getParentIdById:()=>ys,getPropsFromParent:()=>va,getRoot:()=>pa,getStateById:()=>Kt,getStateByName:()=>Yh,getTree:()=>Ch,inizializeApp:()=>Kg,loadUrl:()=>Xg,mainStore:()=>fe,onRouteLoading:()=>lh,removeAndDestroyById:()=>it,setStateById:()=>fn,setStateByName:()=>Bd,staticProps:()=>ya,tempDelegateEventMap:()=>Is,tick:()=>Cr,updateStateByName:()=>Wd,useComponent:()=>Zi,useMethodArrayByName:()=>Mh,useMethodByName:()=>Ih,watchById:()=>Et});var rn="activeRoute",on="activeParams",wo="beforeRouteChange",nn="afterRouteChange",Jt="routeIsLoading",pt="parserAsync",zr="default",nh="repeater",sh="invalidate",ih="render_component";var fe=u.createStore({[rn]:()=>({value:{route:"",templateName:""},type:"any",skipEqual:!1}),[on]:()=>({value:{},type:"any",skipEqual:!1}),[wo]:()=>({value:{currentRoute:"",currentTemplate:"",nextRoute:"",nextTemplate:""},type:"any",skipEqual:!1}),[nn]:()=>({value:{currentRoute:"",currentTemplate:"",previousRoute:"",previousTemplate:""},type:"any",skipEqual:!1}),[Jt]:()=>({value:!1,type:Boolean}),[pt]:{element:()=>({value:document.createElement("div"),type:HTMLElement,skipEqual:!1}),parentId:()=>({value:"",type:String,skipEqual:!1}),persistent:()=>({value:!1,type:Boolean,skipEqual:!1}),source:()=>({value:zr,type:String,skipEqual:!1})}}),sn=()=>{fe.set(pt,{element:document.createElement("div"),parentId:"",persistent:!1,source:zr},{emit:!1})};var ah=t=>fe.watch(wo,({currentRoute:e,currentTemplate:r,nextRoute:o,nextTemplate:n})=>{t({currentRoute:e,currentTemplate:r,nextRoute:o,nextTemplate:n})}),ch=t=>fe.watch(nn,({currentRoute:e,currentTemplate:r,previousRoute:o,previousTemplate:n})=>{t({currentRoute:e,currentTemplate:r,previousRoute:o,previousTemplate:n})}),lh=t=>fe.watch(Jt,e=>{t(e)}),uh=()=>{let{activeRoute:t}=fe.get();return t},ph=()=>{let{activeParams:t}=fe.get();return t};var j=new Map;var $i=({id:t="",componentName:e=""})=>{if(!t||t==="")return[];let o=j.get(t)?.child;return o?o?.[e]??[]:(console.warn("getChildIdById failed no id found"),[])};var mh="",hh,dh=({contentId:t=""})=>{mh=t};var fh=()=>{hh=document?.querySelector(mh)},Li=()=>hh;var Hr=new Map,gh=({instanceName:t,id:e})=>{let r=Hr.get(t)??[];Hr.set(t,[...r,e])},bh=({instanceName:t,id:e})=>{let r=Hr.get(t);if(!r)return;let o=r.filter(n=>n!==e);o.length===0&&Hr.delete(t),o.length>0&&Hr.set(t,o)},xl=({instanceName:t})=>Hr.get(t)??[];var vh=new WeakMap,yh=({element:t,id:e})=>{vh.set(t,e)},an=({element:t})=>vh.get(t);var Th=(t="")=>{if(!t||t==="")return;let r=j.get(t)?.componentName;return r||(console.warn("getComponentNameById failed no id found"),null)},_h=t=>{if(!t)return"name-not-found";let e=an({element:t})??"",r=j.get(e);return r?r.componentName:"name-not-found"},Yt=(t="")=>t?xl({instanceName:t})?.[0]:void 0,Sh=(t="")=>t?xl({instanceName:t})??[]:[];var Fi=(t="")=>{if(!t||t==="")return!1;let r=j.get(t)?.element;return r?!Li()?.contains(r):!1};var xh=({chunk:t})=>t.reduce((e,r)=>{let[o,n]=r,{child:s,componentName:i,instanceName:a}=n,c=new Set(Object.values(s??{}).flat()),l=[];for(let p of j.entries()){let[h]=p;c.has(h)&&l.push(p)}return[...e,{id:o,componentName:i,instanceName:a,children:xh({chunk:l})}]},[]),Ch=()=>{let t=[...j.entries()].filter(([,e])=>!e?.parentId||e?.parentId==="");return xh({chunk:t})};var Eh=({id:t,name:e,fn:r})=>{if(!t||t==="")return;let o=j.get(t),n=o?.methods;if(n){if(e in n){console.warn(`Method ${e}, is already used by ${t}`);return}j.set(t,{...o,methods:{...n,[e]:r}})}},wh=({id:t})=>{if(!t||t==="")return{};let r=j.get(t)?.methods;return r?Object.keys(r).length===0?(console.warn(`no methods available for ${t} component`),{}):r:{}},Ih=t=>{let e=Yt(t);if(!e||e==="")return;let r=wh({id:e});if(Object.keys(r).length===0){console.warn(`no methods available for ${t} component`);return}return r},Mh=t=>Sh(t).flatMap(r=>{let o=wh({id:r});return Object.keys(o).length===0?[]:[o]});function*Xt(t){if(t){yield t;for(let e of t.children)yield*Xt(e)}}function lw(t,e){let r=[];for(let o of Xt(t)){if(r.length>0&&e)break;o?.getIsPlaceholder?.()&&r.push(o)}return r}var Ur=(t,e=!0)=>{let r=[],o=t||document.body;for(let n of o.children)r=[...r,...lw(n,e)];return r};var Io=new Set,kh=!1,Rh=t=>{Io.add(t)},Ph=t=>{Io.delete(t)},Nh=t=>{let e;for(let r of Io)if(t?.contains(r)&&r.getIsPlaceholder()){e=r;break}return e?(Io.delete(e),[e]):[]},Ah=({element:t})=>[...Io].filter(e=>t.contains(e)&&t!==e&&e.getIsPlaceholder?.())??[],Oh=({element:t})=>[...Io].filter(e=>t.contains(e)&&t!==e&&e.getIsPlaceholder?.()&&e?.getSlotPosition?.())??[],$h=()=>Io.size;var st=t=>{kh=t},Bt=()=>kh;var Lh=({currentChild:t,id:e="",componentName:r=""})=>{let o=t?.[r];return o?o.push(e):t[r]=[e],t},Fh=({currentChild:t,id:e="",componentName:r=""})=>{let o=t?.[r]??[];return{...t,[r]:o.filter(n=>n!==e)}},Dh=({props:t,store:e})=>{Object.entries(t).forEach(([r,o])=>{e.set(r,o)})},Di=({prop:t,componentName:e,action:r})=>{console.warn(`Props: ${t}, component: ${e}, action: ${r}: Props can only be modified from outside the component."`)};var ys=(t="")=>{if(!t||t==="")return;let r=j.get(t)?.parentId;if(r)return r},Bh=({id:t=""})=>{if(!t||t==="")return;let e=j.get(t),r=e?.parentId,o=e?.componentName??"";if(!r)return;let n=j.get(r);if(!n)return;let{child:s}=n;s&&j.set(r,{...n,child:Lh({currentChild:s,id:t,componentName:o})})},Vh=({element:t,id:e})=>{if(!t)return;if(!0){Ur(t,!1).forEach(n=>{n.setParentId(e)});return}Ah({element:t}).forEach(o=>{o.setParentId(e)})},cn=({element:t})=>{if(!t)return;let e=t.parentNode,r;for(;e&&!r;)r=an({element:e}),r||(e=e.parentNode);return r??""},Cl=({moduleScopeId:t,targetComponentId:e})=>{if(t===e)return!0;let r=j.get(t);if(!r)return!1;let o=r?.parentId??"";return Cl({moduleScopeId:o,targetComponentId:e})};var yt=new Map,Ts=new Map;var Wh=({componentId:t})=>{if(t)for(let[e,r]of yt){let{componentId:o}=r;o===t&&yt.delete(e)}};var tt=new Map;var ye=new Map;var jh=({id:t})=>{if(tt.has(t)){let e=tt.get(t);if(!e)return;e.forEach(({invalidateId:r})=>{ye.has(r)&&ye.delete(r)}),tt.delete(t)}};var rt=new Map;var J=new Map;var zh=({id:t})=>{if(rt.has(t)){let e=rt.get(t);if(!e)return;e.forEach(({repeatId:r})=>{J.has(r)&&J.delete(r)}),rt.delete(t)}};var Hh=({id:t,parentId:e,componentName:r})=>{if(!t||!e)return;let o=j.get(e);o?.child&&j.set(e,{...o,child:Fh({currentChild:o.child,id:t,componentName:r})})};var Uh=({componentId:t,repeatId:e})=>{let r=J.get(e);if(!r)return;let{componentChildren:o}=r;J.set(e,{...r,componentChildren:[...o,t]})},Gh=({componentId:t,repeatId:e})=>{let r=J.get(e);if(!r)return;let{componentChildren:o}=r;J.set(e,{...r,componentChildren:o.filter(n=>n!==t)})},_s=({repeatId:t})=>{let e=J.get(t);if(!e)return[];let{componentChildren:r}=e;return r},qh=({repeatId:t})=>{let e=J.get(t);if(!e)return!1;let{componentChildren:r}=e;return r.length>0};var ln=new Set;var Jh=t=>{ln.delete(t)};var it=({id:t=""})=>{if(!t||t==="")return;let e=j.get(t);if(!e)return;let{parentId:r,componentName:o,child:n,element:s,state:i,destroy:a,parentPropsWatcher:c,componentRepeatId:l,instanceName:p,persistent:h}=e;Object.values(n??{}).flat().forEach(f=>{it({id:f})}),Hh({id:t,parentId:r,componentName:o}),a?.(),i.destroy(),c&&c.forEach(f=>f()),jh({id:t}),zh({id:t}),l&&l.length>0&&Gh({componentId:t,repeatId:l}),p&&p.length>0&&bh({instanceName:p,id:t}),h||Jh(t),Wh({componentId:t}),s?.removeCustomComponent?.(),s?.remove(),e.methods=null,e.refs=null,e.repeaterInnerWrap=null,e.element=null,e.currentRepeaterState=null,e.state=null,j.delete(t)};var Kt=(t="")=>!t||t===""?void 0:j.get(t)?.state?.get();var Yh=(t="")=>{let e=Yt(t);return e||console.warn(`component ${t}, not found`),Kt(e)};var un=({id:t="",prop:e})=>{if(!t||t==="")return;let r=j.get(t);if(!r)return;let{freezedPros:o}=r;o&&j.set(t,{...r,freezedPros:[...new Set([...o,e])]})},Gr=({id:t="",prop:e})=>{if(!t||t==="")return;let r=j.get(t);if(!r)return;let{freezedPros:o}=r;o&&j.set(t,{...r,freezedPros:o.filter(n=>n!==e)})},Mo=({id:t="",prop:e})=>{if(!t||t==="")return!1;let o=j.get(t)?.freezedPros;return o?o.includes(e):!1};var qr=new Map;var Xh=({repeatId:t,host:e})=>{let r=J.get(t);if(!r)return;let o=e.parentNode;r.initialRenderWithoutSync.forEach(n=>{o.append(n)}),J.set(t,{...r,element:o,initialRenderWithoutSync:[]}),qr.set(t,e)};var Kh="data-mobjs",ko="componentid",Bi="bindtextid",Vi="bindobjectid";var pn="staticprops",Wi="bindprops",Qh="name",Zh="name",ed="slot",Vt="repeaterchild";var Qt="currentRepeaterValue",Zt="repeatPropBind",ji="bindevents",er="weakbindevents",mn="bindeffect",td="parentid";var tr="bindrefid",_r="bindrefname",zi="invalidateid",Hi="mobjsrepeat";var rr={current:{},index:-1},rd="QUEQUE_BINDPROPS",El="QUEQUE_REPEATER",wl="QUEQUE_INVALIDATE";var od=()=>{customElements.define("mobjs-repeat",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){if(Bt())return;let{dataset:e}=this.shadowRoot?.host??{};if(e){let r=this.shadowRoot?.host,o=r?.getAttribute(Hi)??"";Xh({repeatId:o,host:r})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var Jr=new Map;var nd=({invalidateId:t,host:e})=>{let r=ye.get(t);if(!r)return;let o=e.parentNode;ye.set(t,{...r,element:o}),Jr.set(t,e)};var sd=()=>{customElements.define("mobjs-invalidate",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:t}=this.shadowRoot?.host??{};if(t){let e=this.shadowRoot?.host,r=e.getAttribute(zi)??"";nd({invalidateId:r,host:e})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var Yr=new Set,id=t=>{Yr.add(t)},ad=()=>{Yr.clear()},cd=({element:t})=>[...Yr].find(e=>{let r=!e?.getSlotName?.()&&t.contains(e);return r&&Yr.delete(e),r}),ld=({name:t,element:e})=>[...Yr].find(r=>{let o=r?.getSlotName?.()===t&&e.contains(r);return o&&Yr.delete(r),o}),ud=()=>[...Yr],Ui=()=>Yr.size;var pd=()=>{customElements.define("mobjs-slot",class extends HTMLElement{#n;constructor(){super(),this.attachShadow({mode:"open"}),this.#n="",this.isSlot=!0;let{dataset:t}=this.shadowRoot?.host??{};t&&(this.#n=this.shadowRoot?.host.getAttribute(Zh))}connectedCallback(){let t=this.shadowRoot?.host;t&&id(t)}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}getSlotName(){return this.#n}})};var Il=new Set,md=t=>{Il.add(t)},Gi=()=>[...Il],qi=t=>Il.delete(t);var hd=t=>{Object.entries(t).forEach(([e,r])=>{let{connectedCallback:o,disconnectedCallback:n,adoptedCallback:s,attributeChangedCallback:i,style:a,attributeToObserve:c}=r.componentParams;customElements.define(e,class extends HTMLElement{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;static get observedAttributes(){return c}constructor(){super(),this.attachShadow({mode:"open"}),this.active=!1,this.#t=u.getUnivoqueId(),this.#i={},this.#n=e,this.#l=!0,this.isUserComponent=!0,this.#o="",this.#e="";let l=this.shadowRoot?.host;if(!l)return;let p=Bt();if(p&&!!1&&md(l),p||(this.#a&&!this.active&&(this.style.visibility="hidden"),!this.shadowRoot))return;if(a){let f=document.createElement("style");f.textContent=a,this.shadowRoot.append(f)}let h=document.createElement("slot");this.shadowRoot.append(h)}getComponentName(){return this.#n}setId(l){this.#t=l}getId(){return this.#t}getParentId(){return this.#f}setParentId(l){this.#f=l}getIsPlaceholder(){return this.#l}getInstanceName(){return this.#h}getStaticPropsId(){return this.#u}getDynamicPropsid(){return this.#s}getBindEventsId(){return this.#c}getCurrentKey(){return this.#d}setDynamicPropsFromSlotId(l){this.#o=l}getDynamicPropsFromSlotId(){return this.#o}setPropsFromSlotId(l){this.#e=l}getPropsFromSlotId(){return this.#e}setRepeatValue(l){this.#p=l}getRepeatValue(){return this.#p}getSlotPosition(){return this.#a}getDelegateEventId(){return this.#g}getRepeaterPropBind(){return this.#m??void 0}setRepeaterPropBind(l){this.#m=l}getComponentRepeatId(){return this.#r}getBindRefId(){return this.#C}getBindRefName(){return this.#x}resetParams(){this.active=!1,this.#t="",this.#i={}}disablePlaceHolderState(){this.#l=!1}inizializeCustomComponent(l){this.active||(this.active=!0,this.#t=l.id,this.#i=l,this.#l=!1,o?.({context:this,params:this.#i}))}connectedCallback(){if(!Bt()&&this.#l){let p=this.shadowRoot?.host;p&&([this.#h,this.#u,this.#s,this.#d,this.#c,this.#p,this.#a,this.#f,this.#r,this.#g,this.#m,this.#C,this.#x]=[Qh,pn,Wi,"key",ji,Qt,ed,td,Vt,er,Zt,tr,_r].map(h=>p.getAttribute(h)??"")),Rh(p);return}}disconnectedCallback(){if(!this.shadowRoot)return;let l=this.shadowRoot?.host;Ph(l),qi(l),this.active&&(n?.({context:this,params:this.#i}),this.resetParams())}removeCustomComponent(){!this.shadowRoot||!this.active||this.parentElement?.removeChild(this)}adoptedCallback(){!this.shadowRoot||!this.active||s?.({context:this,params:this.#i})}attributeChangedCallback(l,p,h){!this.shadowRoot||!this.active||i?.({name:l,oldValue:p,newValue:h,context:this,params:this.#i})}})})};var Et=(t="",e="",r=()=>{},{wait:o=!1}={})=>(!t||t==="")&&(!e||e==="")?void 0:j.get(t)?.state?.watch(e,r,{wait:o??!1});function Qr(){return new Promise(t=>u.useNextLoop(()=>t()))}var Ro=new Map,gd=()=>Ro.size===0,dd=1e3,bd=t=>{if(Ro.size>=dd)return console.warn(`InvalidateTick: maximum queue size reached (${dd}). Likely an infinite watch loop. Queue force-cleared. `),Ro.clear(),()=>{};let e=u.getUnivoqueId();return Ro.set(e,t),()=>Ro.delete(e)},fd=()=>Ro.size===0,wt=async({debug:t=!1,previousResolve:e}={})=>{if(await Qr(),t&&Ro.forEach(r=>{console.log(r)}),fd()&&e){e();return}return new Promise(r=>{if(fd()){r();return}wt({debug:t,previousResolve:e??r})})};var Po=new Map,Td=()=>Po.size===0,vd=1e3,_d=t=>{if(Po.size>=vd)return console.warn(`RepeaterTick: maximum queue size reached (${vd}). Likely an infinite watch loop. Queue force-cleared. `),Po.clear(),()=>{};let e=u.getUnivoqueId();return Po.set(e,t),()=>Po.delete(e)},yd=()=>Po.size===0,It=async({debug:t=!1,previousResolve:e}={})=>{if(await Qr(),t&&Po.forEach(r=>{console.log(r)}),yd()&&e){e();return}return new Promise(r=>{if(yd()){r();return}It({debug:t,previousResolve:e??r})})};var hn=({id:t})=>{let e=tt.get(t);return e?e.flatMap(({invalidateId:r})=>ye.get(r)?.observed??[]):[]};var dn=({id:t})=>{let e=rt.get(t);return e?e.flatMap(({repeatId:r})=>{let o=J.get(r)?.observed;return o?[o]:[]}):[]};var Yi=new Map,Sd=(t,e)=>{Yi.set(t,e)},Xi=new Map,xd=({host:t,componentId:e,bindTextId:r})=>{Xi.set(t,{componentId:e,bindTextId:r})},Cd=t=>t.match(/(?<=\[).+?(?=])/g),Ed=t=>t.split("[")?.[0],pw=({previous:t,current:e})=>{let r=Cd(e);return r&&r?.length>0?r.reduce((n,s)=>n?.[s],t[Ed(e)]):t?.[e]},wd=(t,e,...r)=>{let o=Kt(t),n=r.map(s=>s.split(".").reduce((a,c)=>pw({previous:a,current:c})??a,o));return e.raw.reduce((s,i,a)=>s+i+(n?.[a]??""),"")},Id=()=>{[...Xi].forEach(([t,{bindTextId:e}])=>{let r=t.parentElement;if(!r){Yi.delete(e);return}let o=Yi.get(e);o&&(Yi.delete(e),mw({...o,element:r}),t?.removeCustomComponent?.(),t?.remove(),r=null)}),Xi.clear()},Md=()=>Xi.size,mw=({id:t,render:e,props:r,element:o})=>{let n=!1,s=new WeakRef(o),i=dn({id:t}),a=hn({id:t}),l=[...new Set([...r,...i,...a])].map(p=>{let f=p.split(".")?.[0],d=Cd(f),v=d&&d?.length>0?Ed(f):f;if(v)return Et(t,v,async()=>{await It(),await wt(),!n&&(n=!0,u.useNextLoop(()=>{u.useFrame(()=>{s.deref()&&!s.deref()?.isConnected&&(l.forEach(T=>{T&&T()}),l.length=0),s.deref()&&s.deref()?.isConnected&&(s.deref().textContent="",s.deref().insertAdjacentHTML("afterbegin",e())),n=!1})}))})})};var kd=()=>{customElements.define("mobjs-bind-text",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:t}=this.shadowRoot?.host??{};if(t){let e=this.shadowRoot?.host??document.createElement("div"),r=e?.getAttribute(ko)??"",o=e?.getAttribute(Bi)??"";xd({host:e,componentId:r,bindTextId:o})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var Ki=new Map,Rd=(t,e)=>{Ki.set(t,e)},Ml=new Map,Pd=({host:t,componentId:e,bindObjectId:r})=>{Ml.set(t,{componentId:e,bindObjectId:r})},Nd=t=>t.map(e=>"observe"in e?Ae.extractkeyFromProp(e.observe):(Ae.initializeCurrentDependencies(),"value"in e?e?.value():e(),Ae.getFirstCurrentDependencies())),Ad=(t,...e)=>t.raw.reduce((r,o,n)=>e?.[n]&&"value"in e[n]?r+o+(e?.[n]?.value?.()??""):r+o+(e?.[n]?.()??""),""),Od=()=>{[...Ml].forEach(([t,{bindObjectId:e}])=>{let r=t.parentElement;if(!r){Ki.delete(e);return}let o=Ki.get(e);o&&(Ki.delete(e),hw({...o,element:r}),t?.removeCustomComponent?.(),t?.remove(),r=null)}),Ml.clear()},hw=({id:t,keys:e,render:r,element:o})=>{let n=!1,s=new WeakRef(o),i=dn({id:t}),a=hn({id:t}),l=[...new Set([...e,...i,...a])].map(p=>Et(t,p,async()=>{await It(),await wt(),!n&&(n=!0,u.useNextLoop(()=>{u.useFrame(()=>{s.deref()&&!s.deref()?.isConnected&&(l.forEach(h=>{h&&h()}),l.length=0),s.deref()&&s.deref()?.isConnected&&(s.deref().textContent="",s.deref().insertAdjacentHTML("afterbegin",r())),n=!1})}))}))};var $d=()=>{customElements.define("mobjs-bind-object",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:t}=this.shadowRoot?.host??{};if(t){let e=this.shadowRoot?.host??document.createElement("div"),r=e?.getAttribute(ko)??"",o=e?.getAttribute(Vi)??"";Pd({host:e,componentId:r,bindObjectId:o})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var Qi={},No=()=>Qi,Ld=new Set,Fd=()=>{Qi=Object.fromEntries([...Ld.values()].flatMap(t=>Object.entries(t))),console.log(`component loaded:${Object.keys(Qi).length}`),hd(Qi),pd(),sd(),od(),kd(),$d()},Zi=t=>{!t||t?.length===0||t.forEach(e=>{Ld.add(e)})};var ea=({componentName:t,propName:e})=>(No()?.[t]?.componentParams?.exportState??[]).includes(e),Dd=({componentName:t})=>No()?.[t]?.componentParams?.exportState??[];var fn=(t="",e="",r,{emit:o=!0}={})=>{if((!t||t==="")&&(!e||e==="")&&!r||Mo({id:t,prop:e}))return;let s=j.get(t),i=s?.state,a=s?.componentName??"";if(!ea({componentName:a,propName:e})){console.warn(`setStateById failed ${e} in: ${a} is not exportable, maybe a slot bind state that not exist here?`);return}if(!i){console.warn(`setStateById failed no id found on prop: ${e}`);return}i.set(e,r,{emit:o})};var Bd=(t="")=>{let e=Yt(t);return e||console.warn(`component ${t}, not found`),(r,o,{emit:n=!0}={})=>fn(e,r,o,{emit:n})};var Vd=(t="",e="",r,{emit:o=!0,clone:n=!1}={})=>{if((!t||t==="")&&(!e||e==="")&&!r||Mo({id:t,prop:e}))return;let i=j.get(t),a=i?.state,c=i?.componentName??"";if(!ea({componentName:c,propName:e})){console.warn(`updateStateById failed ${e} in: ${c} is not exportable, maybe a slot bind state that not exist here?`);return}if(!a){console.warn(`updateStateById failed no id found on prop: ${e}`);return}a.update(e,r,{emit:o,clone:n})};var Wd=(t="")=>{let e=Yt(t);return e||console.warn(`component ${t}, not found`),(r,o,{emit:n=!0,clone:s=!1}={})=>Vd(e,r,o,{emit:n,clone:s})};var kl={scoped:!1,maxParseIteration:5e3,debug:!1},jd=t=>{kl={...kl,...t}},Mt=()=>kl,zd=()=>{let{debug:t}=Mt();return t},Hd=({tag:t="",component:e=()=>"",props:r={},state:o={},bindStore:n,scoped:s,connectedCallback:i=()=>{},disconnectedCallback:a=()=>{},adoptedCallback:c=()=>{},attributeToObserve:l=[],attributeChangedCallback:p=()=>{},style:h="",child:f=[]})=>(Zi(f),{[t]:{componentFunction:e,componentParams:{exportState:Object.keys(r),scoped:s,state:{...r,...o},bindStore:n,connectedCallback:i,disconnectedCallback:a,adoptedCallback:c,attributeToObserve:l,attributeChangedCallback:p,style:h,child:f}}});var Ud=[],Gd="",qd="",Jd=t=>{Ud=[...t]},gn=({hash:t=""})=>Ud.find(({hash:e})=>t===e),Yd=({hash:t=""})=>{Gd=t},ta=()=>Gd,Xd=({hash:t=""})=>{qd=t},Kd=()=>qd;var Qd=({id:t="",newElement:e=document.createElement("div")})=>{if(!t||t==="")return;let r=j.get(t);r&&(j.set(t,{...r,element:e}),yh({element:e,id:t}))},ra=({id:t=""})=>!t||t===""?void 0:j.get(t)?.element,Zd=({element:t})=>t?an({element:t}):"",Rl=({keyValue:t="",repeatId:e=""})=>t?.length===0?[]:_s({repeatId:e}).flatMap(o=>{let n=j.get(o);if(!n)return[];let{element:s,key:i}=n;return`${i}`==`${t}`?[{element:s,id:o}]:[]});function dw(t){let e=[];for(let r of Xt(t))r?.isUserComponent&&r?.getSlotPosition?.()&&e.push(r);return e}var ef=t=>{let e=[],r=t||document.body;for(let o of r.children)e=[...e,...dw(o)];return e};function fw(t){let e=[];for(let r of Xt(t))r?.isSlot&&r?.getSlotName?.()&&e.push(r);return e}var tf=t=>{let e=[],r=t||document.body;for(let o of r.children)e=[...e,...fw(o)];return e};function gw(t,e){for(let r of Xt(t))if(r?.isSlot&&r?.getSlotName?.()===e)return r;return null}var rf=(t,e)=>{let r=t||document.body;for(let o of r.children){let n=gw(o,e);if(n)return n}return null};function bw(t){for(let e of Xt(t))if(e?.isSlot&&!e?.getSlotName?.())return e;return null}var of=t=>{let e=t||document.body;for(let r of e.children){let o=bw(r);if(o)return o}return null};var Ss=new Map,Ao=t=>{let e=u.getUnivoqueId();return Ss.set(e,t),e},nf=(t="")=>{if(!t)return rr;let e=Ss.get(t);return Ss.delete(t),e??rr};var g=(t,...e)=>t.reduce((r,o,n)=>r+o+(e[n]===void 0?"":e[n]),"").replaceAll(/>\s+</g,"><").trim();var oa=({components:t,current:e,index:r,observe:o,repeatId:n,key:s})=>{t.forEach(i=>{i.deref()?.hasAttribute(Qt)||i.deref()?.setAttribute(Qt,Ao({current:e,index:r})),i.deref()?.hasAttribute("key")||i.deref()?.setAttribute("key",`${s}`),i.deref()?.hasAttribute(Zt)||i.deref()?.setAttribute(Zt,`${o}`),i.deref()?.hasAttribute(Vt)||i.deref()?.setAttribute(Vt,`${n}`)})},na=({components:t,current:e,index:r,observe:o,repeatId:n,key:s})=>{t.forEach(i=>{if(i.hasAttribute(Vt)){qi(i);return}i.setAttribute(Qt,Ao({current:e,index:r})),i.setAttribute("key",`${s}`),i.setAttribute(Zt,`${o}`),i.setAttribute(Vt,`${n}`)})},Zr=({stringDOM:t,parent:e,position:r})=>{st(!0);let o=document.createRange().createContextualFragment(t);st(!1),o&&(r==="afterend"&&e.after(o),r==="beforebegin"&&e.before(o),r==="afterbegin"&&e.prepend(o),r==="beforeend"&&e.append(o))},xs=({elements:t,parent:e,position:r})=>{let o=new DocumentFragment;st(!0),t.forEach(n=>{n&&o.append(n)}),st(!1),r==="afterend"&&e.after(o),r==="beforebegin"&&e.before(o),r==="afterbegin"&&e.prepend(o),r==="beforeend"&&e.append(o)};var yw=({element:t,content:e})=>{let{debug:r}=Mt();if(t.parentNode){let o=document.createElement("template");o.innerHTML=e;let n=o.content.firstElementChild;return n?.disablePlaceHolderState?.(),n&&t.after(n),r&&t.insertAdjacentHTML("afterend",`<!--  ${t.tagName.toLowerCase()} --> `),n}},Tw=({element:t})=>{ud().forEach(r=>{r?.removeCustomComponent(),r?.remove()})},_w=({element:t})=>{if(!!1&&Ui()===0)return;let e=ef(t);e.length!==0&&[...e].forEach(r=>{let o=r?.getSlotPosition(),n=ld({name:o,element:t});n&&(n.parentNode?.insertBefore(r,n),n?.removeCustomComponent(),n?.remove())})},Sw=({element:t,content:e})=>{let r=yw({element:t,content:e});if(r){let o=t.getId(),n=t?.getDelegateEventId(),s=t?.getBindRefId(),i=t?.getBindRefName(),a=cd({element:r});a&&(xs({parent:a,elements:[...t.childNodes],position:"afterend"}),a.remove()),a||xs({parent:r,elements:[...t.childNodes],position:"afterbegin"}),_w({element:r}),Tw({element:r}),n&&n.length>0&&r.setAttribute(er,n),s&&s.length>0&&r.setAttribute(tr,s),i&&i.length>0&&r.setAttribute(_r,i);let{debug:c}=Mt();c&&r.setAttribute(Kh,o??"")}return t.remove(),r},sf=({element:t,content:e})=>({newElement:Sw({element:t,content:e})});var Pl=0,af=()=>{Pl+=1},Nl=()=>Pl,cf=()=>{Pl=0},Al=({element:t,currentSelectors:e})=>{if(e.length>0){let r=e[0],o=e.slice(1);return{componentToParse:r,parseSourceArray:o}}else{let r=Nh(t),o=r?.[0],n=r.slice(1);return{componentToParse:o,parseSourceArray:n}}};var lf=({cb:t=()=>{},id:e})=>{if(!e)return;let r=j.get(e);r&&j.set(e,{...r,destroy:t})};var Cs=new Map,uf=({id:t,cb:e=()=>{}})=>{Cs.set(t,e)},Ol=async({id:t,element:e})=>{let o=await Cs.get(t)?.({element:e});lf({cb:o,id:t}),Cs.delete(t)};var Es=({id:t})=>{if(!J.has(t))return;if(qr.has(t)){let r=qr.get(t);r?.removeCustomComponent(),r?.remove(),qr.delete(t)}return J.get(t)?.element};var sa=({id:t="",value:e})=>{if(!t||t==="")return;let r=j.get(t);r&&j.set(t,{...r,currentRepeaterState:e})},pf=({rootNode:t,currentNode:e})=>{if(!(!e||!t.contains(e)))return e.parentElement===t?e:pf({rootNode:t,currentNode:e.parentElement})},xw=({rootNode:t,node:e})=>{if(t)return pf({rootNode:t,currentNode:e.parentElement})},xr=({id:t=""})=>{if(!t||t==="")return rr;let r=j.get(t)?.currentRepeaterState;return r||rr};var mf=({id:t="",repeatId:e="",element:r})=>{if(!t||t==="")return;let o=j.get(t);if(!o)return;let n=Es({id:e}),s=xw({rootNode:n,node:r});j.set(t,{...o,repeaterInnerWrap:s})},ws=({id:t})=>!t||t===""?void 0:j.get(t)?.repeaterInnerWrap;var bn=new Map,hf=1e5,vn=t=>{if(bn.size>=hf)return console.warn(`Tick: maximum queue size reached (${hf}). Likely an infinite watch loop. Queue force-cleared. `),bn.clear(),()=>{};let e=u.getUnivoqueId();return bn.set(e,t),()=>bn.delete(e)},df=()=>bn.size===0,Cr=async({debug:t=!1,previousResolve:e}={})=>{if(await Qr(),t&&bn.forEach(r=>{console.log(r)}),df()&&e){e();return}return new Promise(r=>{if(df()){r();return}Cr({debug:t,previousResolve:e??r})})};var $l=!0,ia=()=>{$l=!0},aa=()=>{$l=!1},ca=()=>$l;var yn=new Map,ff=(t=[])=>{let e=Re(Object,t)?[t]:t,r=u.getUnivoqueId();return yn.set(r,e),r},gf=({element:t,componentId:e,bindEventsId:r})=>{let o=yn.get(r);o&&(o.forEach(n=>{let[s]=Object.keys(n),[i]=Object.values(n);!s||!i||t.addEventListener(s,async a=>{if(!ca())return;aa(),await Cr(),ia();let c=xr({id:e});i(a,c?.current,c?.index)})}),yn.delete(r))},bf=()=>{yn.clear()};var la=({id:t="",unWatchArray:e=[]})=>{let r=j.get(t);if(!r)return;let{parentPropsWatcher:o}=r;o&&j.set(t,{...r,parentPropsWatcher:[...o,...e]})},vf=({id:t=""})=>{if(!t||t==="")return;(j.get(t)?.parentPropsWatcher??[]).forEach(o=>{o()})};var yf=t=>{if(!("props"in t)){console.warn("bindProps not valid");return}let r=t?.observe?t.observe.map(s=>Ae.extractkeyFromProp(s)):(Ae.initializeCurrentDependencies(),u.checkType(Function,t.props)&&t.props({},{},0),Ae.getCurrentDependencies());if(r.length===0){console.warn("bindProps not valid, no dependencies found");return}let o={...t,observe:r},n=u.getUnivoqueId();return yt.set(n,{...o,componentId:"",propsId:n}),n},ua=({componentId:t,observe:e,props:r,currentParentId:o,fireCallback:n})=>{if(!o)return;let s=Kt(o);if(!s)return;let i=Object.keys(s);if(e.every(h=>i.includes(h))||console.warn(`bind props error: Some prop ${JSON.stringify(e)} doesn't exist`),!j.has(t))return;let l=xr({id:t}),p=r?.(s,l.current,l?.index);p&&Object.entries(p).forEach(([h,f])=>{fn(t,h,f,{emit:n})})},Tf=({propsId:t,repeatPropBind:e,componentId:r})=>{if(!t)return;let o=yt.get(t);o&&(yt.set(t,{...o,componentId:r}),Ts.set(r,t),Ll({componentId:r,repeatPropBind:e,inizilizeWatcher:!1}))};var Ll=async({componentId:t,repeatPropBind:e,inizilizeWatcher:r})=>{let o=Ts.get(t);if(!o)return;r&&Ts.delete(t);let n=yt.get(o);if(!n)return;let{observe:s,props:i,parentId:a}=n,c=e&&e?.length>0&&!s.includes(e)?[...s,e]:[...s];if(r||ua({componentId:t,observe:c,props:i,currentParentId:a??"",fireCallback:!1}),!r&&!Td()&&(await It(),ua({componentId:t,observe:c,props:i,currentParentId:a??"",fireCallback:!0})),!r&&!gd()&&(await wt(),ua({componentId:t,observe:c,props:i,currentParentId:a??"",fireCallback:!0})),!r)return;let l=!1,p=c.map(h=>Et(a,h,async()=>{if(await It(),await wt(),l)return;let f=vn({state:h,componentId:t,moduleId:"",type:rd});l=!0,u.useNextLoop(()=>{ua({componentId:t,observe:c,props:i,currentParentId:a??"",fireCallback:!0}),l=!1,f()})}));if(la({id:t,unWatchArray:p.filter(h=>h!==void 0)}),!!r)for(let[h,f]of yt){let{componentId:d}=f;d===t&&yt.delete(h)}},_f=()=>{yt.clear(),Ts.clear()};var or=({id:t,container:e})=>{let o=j.get(t)?.child;if(!o)return;Object.values(o??{}).flat().forEach(s=>{let i=j.get(s),a=i?.element,c=i?.id??"";if(a&&e?.contains(a)&&a!==e){it({id:s});return}else or({id:c,container:e})})};var Fl=new Map,Cw=t=>(u.checkType(Array,t)?t:[t]).map(r=>Ae.extractkeyFromProp(r)),Ew=({toggleClass:t,toggleStyle:e,toggleAttribute:r})=>(Ae.initializeCurrentDependencies(),Object.values(e).forEach(o=>o()),Object.values(t).forEach(o=>o()),Object.values(r).forEach(o=>o()),Ae.getCurrentDependencies()),Ef=({data:t,id:e})=>{let o=(u.checkType(Array,t)?t:[t]).map(({observe:i,toggleClass:a,toggleStyle:c,toggleAttribute:l})=>({observe:i?Cw(i):Ew({toggleStyle:c??{fake:()=>""},toggleClass:a??{fake:()=>{}},toggleAttribute:l??{fake:()=>{}}}),toggleClass:a??{},toggleStyle:c??{},toggleAttribute:l??{}})),n={parentId:e,items:o},s=u.getUnivoqueId();return Fl.set(s,n),s},wf=t=>{[...t.querySelectorAll(`[${mn}]`)].forEach(r=>{let o=r.getAttribute(mn);if(!o)return;let n=Fl.get(o);n&&(r.removeAttribute(mn),ww({data:n,element:r}),Fl.delete(o))})},Sf=({ref:t,data:e})=>{e&&Object.entries(e).forEach(([r,o])=>{t.deref()&&t.deref().classList.toggle(r,o?.())})},xf=({ref:t,data:e})=>{Object.entries(e).forEach(([r,o])=>{t.deref()&&(t.deref().style[r]=o?.()??"")})},Cf=({ref:t,data:e})=>{Object.entries(e).forEach(([r,o])=>{if(!t.deref())return;let n=o?.();if(u.checkType(Boolean,n)){t.deref()[r]=n;return}if(!n){t.deref().removeAttribute(r);return}t.deref()?.setAttribute(r,n)})},ww=({data:t,element:e})=>{let r=new WeakRef(e),{parentId:o}=t,{items:n}=t,s=n.flatMap(({observe:i,toggleClass:a,toggleStyle:c,toggleAttribute:l})=>{let p=!1,h=dn({id:o}),f=hn({id:o});return[...new Set([...i,...h,...f])].map(y=>(a&&u.useFrame(()=>{Sf({ref:r,data:a})}),c&&u.useFrame(()=>{xf({ref:r,data:c})}),l&&u.useFrame(()=>{Cf({ref:r,data:l})}),Et(o,y,async()=>{if(await It(),await wt(),r.deref()&&!r.deref()?.isConnected){s.forEach(v=>{v&&v()}),s.length=0;return}p||(p=!0,u.useNextLoop(()=>{u.useFrame(()=>{a&&r.deref()&&Sf({ref:r,data:a}),c&&r.deref()&&xf({ref:r,data:c}),l&&r.deref()&&Cf({ref:r,data:l}),p=!1})}))})))})};var If=({element:t})=>{let e=t.querySelectorAll(`[${tr}]`),r={};return[...e].reduce((o,n)=>{let s=n.getAttribute(tr),i=n.getAttribute(_r);if(n.removeAttribute(tr),n.removeAttribute(_r),!i)return o;let a=i in o?[...o[i],{element:n,scopeId:s}]:[{element:n,scopeId:s}];return{...o,[i]:a}},r)},Iw=t=>[...new Set(t.toSorted((e,r)=>e===r||!e||!r?0:e.compareDocumentPosition(r)&2?1:-1))],Mw=({refs:t,refName:e,element:r})=>({...t,[e]:Iw([...t[e],r])}),Mf=t=>{Object.entries(t).forEach(([e,r])=>{r.forEach(({element:o,scopeId:n})=>{let s=j.get(n);if(!s)return;let{refs:i}=s;if(!i)return;let a=e in i?Mw({refs:i,refName:e,element:o}):{...i,[e]:[o]};j.set(n,{...s,refs:a})})})},Dl=({id:t})=>{let e=j.get(t);if(!e)return{};let{refs:r,element:o}=e;if(!r)return{};let n=Object.entries(r).map(([s,i])=>({name:s,collection:i.filter(a=>o.contains(a))})).reduce((s,i)=>({...s,[i.name]:i.collection}),{});return j.set(t,{...e,refs:n}),n},kf=({id:t})=>{let e=Dl({id:t});return Object.entries(e).reduce((r,[o,n])=>({...r,[o]:n?.[0]}),{})};var Rf=document.createElement("div"),Pf=({element:t})=>{Rf=t},pa=()=>Rf;var Nf=":FORCE",Is=new Map,Tn=new WeakMap,Bl=[],Af=[],Of=(t=[])=>{let e=Re(Object,t)?[t]:t,r=u.getUnivoqueId();return Is.set(r,e),r},kw=t=>{let e=t?.parentNode;for(;e;){if(Tn.has(e))return{target:e,data:Tn.get(e)};e=e?.parentNode}return{target:void 0,data:void 0}},Rw=t=>{let e=Tn.get(t);return e?{target:t,data:e}:kw(t)};async function Pw(t,e){let r=e?.target;if(!r)return;let{target:o,data:n}=Rw(r);if(!n||!document.contains(o))return;let s=n.find(({event:p})=>p===t);if(!s)return;let{callback:i,force:a}=s;if(!ca()&&!a||(aa(),await Cr(),ia(),!document.contains(o)))return;let c=Zd({element:o}),l=c?xr({id:c}):rr;Object.defineProperty(e,"target",{value:r}),Object.defineProperty(e,"currentTarget",{value:o}),i(e,l?.current,l?.index)}var $f=async t=>{await It(),await wt(),[...t.parentNode?.querySelectorAll(`[${er}]`)??[]].forEach(n=>{let s=n.getAttribute(er)??"";n.removeAttribute(er);let i=Is.get(s);Is.delete(s);let a=i?.flatMap(c=>Object.entries(c).map(l=>{let[p,h]=l,f=p.toUpperCase().endsWith(Nf),d=p.toUpperCase().replaceAll(Nf,"").toLowerCase();return Bl.includes(d)||Bl.push(d),{event:d,callback:h,force:f}}));Tn.set(n,a)});let o=pa();Bl.forEach(n=>{Af.includes(n)||(Af.push(n),o.addEventListener(n,Pw.bind(null,n)))})};var _n="repeater",ma="invalidate",eo=({moduleParentElement:t,skipInitialized:e=!1,onlyInitialized:r=!1,componentId:o,module:n})=>{let s=n===_n?J.entries():ye.entries(),i=[];for(let a of s){let[c,{element:l,initialized:p,scopeId:h,initializeModule:f,unsubscribe:d}]=a;if(o&&!Cl({moduleScopeId:h??"",targetComponentId:o})||e&&p||r&&!p)continue;l&&t?.contains(l)&&t!==l&&i.push({moduleId:c,initializeModule:f,unsubscribe:n===_n?[d]:d})}return i};var Lf=({id:t,repeatId:e})=>{if(!rt.has(t))return;let r=rt.get(t);if(!r)return;let o=r.filter(n=>n.repeatId!==e);J.has(e)&&J.delete(e),rt.set(t,o)};var to=({id:t,repeatParent:e})=>{eo({moduleParentElement:e,skipInitialized:!1,onlyInitialized:!0,componentId:t,module:_n}).forEach(({unsubscribe:o,moduleId:n})=>{o.forEach(s=>{s()}),Lf({id:t,repeatId:n})})};var ha=({repeatParent:t,id:e})=>{if(!t)return;eo({moduleParentElement:t,skipInitialized:!0,onlyInitialized:!1,componentId:e,module:_n}).forEach(({initializeModule:o})=>{o()})};var Ff=({invalidateId:t,unsubscribe:e})=>{let r=ye.get(t);r&&ye.set(t,{...r,unsubscribe:e})};var Df=({id:t,invalidateId:e})=>{if(!tt.has(t))return;let r=tt.get(t);if(!r)return;let o=r.filter(n=>n.invalidateId!==e);ye.has(e)&&ye.delete(e),tt.set(t,o)};var ro=({id:t,invalidateParent:e})=>{eo({moduleParentElement:e,skipInitialized:!1,onlyInitialized:!0,componentId:t,module:ma}).forEach(({unsubscribe:o,moduleId:n})=>{o.forEach(s=>{s()}),Df({id:t,invalidateId:n})})};var Vl=({id:t})=>{if(!ye.has(t))return;if(Jr.has(t)){let r=Jr.get(t);r?.removeCustomComponent(),r?.remove(),Jr.delete(t)}return ye.get(t)?.element};var da=({invalidateParent:t,id:e})=>{if(!t)return;eo({moduleParentElement:t,skipInitialized:!0,onlyInitialized:!1,componentId:e,module:ma}).forEach(({initializeModule:o})=>{o()})};var Bf=async({observe:t=[],beforeUpdate:e=()=>Promise.resolve(),afterUpdate:r=()=>{},watch:o,id:n,invalidateId:s,persistent:i=!1,renderFunction:a})=>{let c=!1,l=cn({element:Vl({id:s})});r();let p=t.map(h=>o(h,async()=>{if(c)return;un({id:n,prop:h});let d=Vl({id:s}),y=vn({state:h,componentId:n,moduleId:s,type:wl}),v=bd({state:h,componentId:n,invalidateId:s,type:wl});c=!0,u.useNextLoop(async()=>{if(!d){Gr({id:n,prop:h});return}await e(),ro({id:n,invalidateParent:d}),to({id:n,repeatParent:d}),or({id:l??n,container:d}),d.textContent="",Zr({stringDOM:a(),parent:d,position:"afterbegin"}),fe.set(pt,{element:d,parentId:l??n,persistent:i,source:sh},{emit:!1}),await fe.emitAsync(pt),sn(),c=!1,y(),v(),da({invalidateParent:d,id:n}),ha({repeatParent:d,id:n}),Gr({id:n,prop:h}),r()})}));Ff({invalidateId:s,unsubscribe:p})};var Vf=t=>(u.checkType(Array,t)?t:[t]).map(r=>Ae.extractkeyFromProp(r));var Wf=({invalidateId:t,initializeModule:e})=>{let r=ye.get(t);r&&ye.set(t,{...r,initializeModule:e,unsubscribe:[()=>{}]})};var jf=({invalidateId:t})=>{let e=ye.get(t);e&&ye.set(t,{...e,initialized:!0,initializeModule:()=>{}})};var zf=({invalidateId:t,scopeId:e,observe:r})=>{ye.set(t,{element:void 0,initialized:!1,observed:r,scopeId:e,initializeModule:()=>{},unsubscribe:[()=>{}]})};var Hf=({repeatId:t,unsubscribe:e})=>{let r=J.get(t);r&&J.set(t,{...r,unsubscribe:e})};var Sn=new Set,Uf=({id:t,state:e,container:r})=>{Sn.add({id:t,state:e,container:r})},Gf=({id:t,state:e,container:r})=>{r&&Sn.forEach(o=>{t===o.id&&e===o.state&&r===o.container&&Sn.delete(o)})},qf=({id:t="",state:e="",container:r})=>[...Sn].some(n=>t===n.id&&e===n.state&&r===n.container);var Yf=(t=[],e=[],r="")=>{let o=new Set(e.map(n=>n?.[r]));return t.filter(n=>!o.has(n?.[r]))},Xf=(t=[],e=[],r="")=>{let o=new Set(e.map(n=>n?.[r]));return t.map((n,s)=>({isNewElement:!o.has(n?.[r]),keyValue:n?.[r],index:s}))},Jf=({arr:t=[],key:e=""})=>t.every(r=>u.checkType(Object,r)&&e in r),Kf=({current:t,previous:e,key:r})=>Jf({arr:t,key:r})&&Jf({arr:e,key:r}),fa=({data:t=[],key:e=""})=>{let r=new Set;return t.filter(o=>{let n=o?.[e];return r.has(n)?!1:(r.add(n),!0)})},ga=({children:t,previousChildren:e=[],hasKey:r})=>{let o=new Set(e),n=e.length>0,s={};for(let i of t){let{index:a}=xr({id:i}),c=r&&n&&!o.has(i)?`_${a}`:a;s[c]?s[c].push(i):s[c]=[i]}return Object.values(s)},Qf=({children:t,key:e,data:r})=>{if(!t?.length||!r?.length)return[];let o=new Map(t.map(n=>{let{current:s}=xr({id:n[0]});return[s[e],n]}));return r.map(n=>o.get(n[e])).filter(n=>n!==void 0)};var xn=new Map,ba=(t={})=>{let e=u.getUnivoqueId();return xn.set(e,t),e},va=(t="")=>{let e=xn.get(t);return xn.delete(t),e??{}};var Zf=()=>{xn.clear()};var ya=(t={})=>`${pn}="${ba(t)}"`,Ta=(t,e,r)=>Math.min(Math.max(t,e),r);var Wl=({repeatId:t})=>{let e=J.get(t);return e?e.currentData:[]};var Nw="index",Oo=({observe:t,hasKey:e,key:r="",keyValue:o="",index:n,repeatId:s})=>{let i=Wl({repeatId:s}),a=e?i?.find(p=>p[r]===o):i?.[n],c=a,l=a;return new Proxy({},{get(p,h){Ae.setCurrentDependencies(t);let f=Wl({repeatId:s}),d=Math.max(f?.length-1,0);if(h===Nw){if(e){let y=f?.findIndex(v=>v[r]===o);return Ta(y,0,d)}return Ta(n,0,d)}return e?(l=c??l,c=f?.find(y=>y[r]===o),c??l):(l=c??l,c=f?.[Ta(n,0,d)],c??l)},set(){return!1}})};var eg=({diff:t,current:e,previousLenght:r,render:o,state:n,repeatId:s})=>{let i=document.createRange();return[...Array.from({length:t}).keys()].map((c,l)=>{let p=e?.[l+r],h=l+r,f=Oo({observe:n,hasKey:!1,index:h,repeatId:s}),d=o({initialIndex:h,initialValue:p,current:f,sync:()=>""}),y=Bt();st(!0);let v=i.createContextualFragment(d);if(st(y),!1){let T=Ur(v,!1).map(S=>new WeakRef(S));oa({components:T,current:p,index:h,observe:n,repeatId:s,key:void 0})}return na({components:Gi(),current:p,index:h,observe:n,repeatId:s,key:void 0}),v.firstElementChild}).filter(c=>c!==null)},Aw=({initialIndex:t,initialValue:e,state:r,repeatId:o})=>`${Qt}="${Ao({current:e,index:t})}"
    ${Zt}="${r}" ${Vt}="${o}"`,tg=({diff:t,previousLenght:e,current:r,state:o,repeatId:n,render:s})=>[...Array.from({length:t}).keys()].map((i,a)=>{let c=a+e,l=r?.[c]?{...r?.[c]}:{},p=Oo({observe:o,hasKey:!1,index:c,repeatId:n});return s({sync:()=>Aw({initialIndex:c,initialValue:l,repeatId:n,state:o}),initialIndex:c,initialValue:l,current:p})}).join(""),rg=({currentValue:t,index:e,state:r,repeatId:o,key:n,keyValue:s,render:i})=>{let a=Oo({observe:r,hasKey:!0,key:n,keyValue:s,index:e,repeatId:o}),c=Bt();st(!0);let l=document.createRange().createContextualFragment(i({initialIndex:e,initialValue:t,current:a,sync:()=>""}));if(st(c),!1){let p=Ur(l,!1).map(h=>new WeakRef(h));oa({components:p,current:t,index:e,observe:r,repeatId:o,key:s})}return na({components:Gi(),current:t,index:e,observe:r,repeatId:o,key:s}),l.firstElementChild},Ow=({keyValue:t,index:e,currentValue:r,state:o,repeatId:n})=>` ${"key"}="${t}"
    ${Zt}="${o}"
    ${Qt}="${Ao({current:r,index:e})}"
    ${Vt}="${n}"`,og=({currentValue:t,index:e,state:r,repeatId:o,key:n,keyValue:s,render:i})=>{let a={...t},c=Oo({observe:r,hasKey:!0,key:n,keyValue:s,index:e,repeatId:o});return i({initialIndex:e,initialValue:a,current:c,sync:()=>Ow({currentValue:a,index:e,keyValue:s,repeatId:o,state:r})})},ng=({currentUnique:t,render:e,observe:r,repeatId:o,key:n="",hasKey:s})=>{let i=document.createRange();return t.map((c,l)=>{let p=Oo({observe:r,hasKey:s,key:n,keyValue:s?c?.[n]:"",index:l,repeatId:o}),h=Bt();st(!0);let f=i.createContextualFragment(e({initialIndex:l,initialValue:c,current:p,sync:()=>""}));if(st(h),!1){let d=Ur(f,!1).map(y=>new WeakRef(y));oa({components:d,current:c,index:l,observe:r,repeatId:o,key:s?c?.[n]:""})}return na({components:Gi(),current:c,index:l,observe:r,repeatId:o,key:s?c?.[n]:""}),f.firstElementChild}).filter(c=>c!==null)},sg=({currentUnique:t,key:e="",observe:r,repeatId:o,hasKey:n,render:s})=>t.map((a,c)=>{let l=()=>`${Qt}="${Ao({current:a,index:c})}"
                            ${"key"}="${n?a?.[e]:""}"
                            ${Zt}="${r}"
                            ${Vt}="${o}"`,p=Oo({observe:r,hasKey:n,key:e,keyValue:n?a?.[e]:"",index:c,repeatId:o});return s({sync:l,initialIndex:c,initialValue:a,current:p})}).join("");var _a=({repeatId:t,id:e})=>{let r=J.get(t);if(!r)return;let{element:o,observed:n}=r;if(!o)return;let s=[...o.children],a=Kt(e)[n];J.set(t,{...r,nativeDOMChildren:s.map((c,l)=>({index:l,value:a[l],element:c}))})},Ms=({repeatId:t})=>{let e=J.get(t);if(!e)return[];let{nativeDOMChildren:r}=e;return r};var Cn=({repeatId:t,currentData:e})=>{let r=J.get(t);r&&J.set(t,{...r,currentData:e})};var $w=({element:t,container:e})=>{let r=_h(t);e.insertAdjacentHTML("beforeend",`<!-- ${r} --> `)},ig=({state:t="",current:e=[],previous:r=[],repeaterParentElement:o=document.createElement("div"),key:n="",id:s="",render:i,repeatId:a,useSync:c})=>{let l=fa({data:e,key:n});Cn({repeatId:a,currentData:l});let p=Yf(r,l,n),h=p.map(T=>Rl({keyValue:T?.[n],repeatId:a})).filter(T=>T.length>0),f=h.length>0;h.forEach(T=>{let S=T[0].element,_=T[0].id;if(!_)return;let E=ws({id:_}),x=E??S;ro({id:s,invalidateParent:x}),to({id:s,repeatParent:x}),T.forEach(({id:w})=>{it({id:w})}),E&&E.remove()}),f||Ms({repeatId:a}).filter(_=>p.map(E=>E?.[n]).includes(_.value?.[n])).forEach(_=>{let{element:E}=_;ro({id:s,invalidateParent:E}),to({id:s,repeatParent:E}),or({id:s,container:E})});let d=Xf(l,r,n).map(({keyValue:T,isNewElement:S,index:_})=>{if(S)return{keyValue:T,isNewElement:S,index:_,wrapper:void 0};let E=Rl({keyValue:T,repeatId:a}),x=E[0]?.element?ws({id:E[0]?.id??""}):Ms({repeatId:a}).find(I=>I.value?.[n]===T)?.element;return{keyValue:T,isNewElement:S,index:_,persistentElement:E,persistentDOMwrapper:x}});o.replaceChildren();let y=document.createRange(),v=new DocumentFragment;return d.forEach(({isNewElement:T,keyValue:S,index:_,persistentElement:E,persistentDOMwrapper:x})=>{if(!T){let{debug:A}=Mt();x&&v.append(x);let O=E?.[0]?.element;!x&&O&&(v.append(O),A&&$w({element:E[0]?.element,container:o}));return}let w=l?.[_],I=c?og({currentValue:w,index:_,state:t,repeatId:a,key:n,keyValue:S,render:i}):rg({currentValue:w,index:_,state:t,repeatId:a,key:n,keyValue:S,render:i}),N=Bt();if(st(!0),c){let A=y.createContextualFragment(I);v.append(A)}!c&&I&&v.append(I),st(N)}),o.append(v),l};var Lw=t=>{let e=t.lastElementChild;if(!e)return;let r=e.nextSibling;for(;r;){let o=r.nextSibling;r.nodeType===Node.COMMENT_NODE&&r.remove(),r=o}},ag=({state:t="",current:e=[],previous:r=[],repeaterParentElement:o=document.createElement("div"),render:n,repeatId:s,id:i,useSync:a,currentChildren:c})=>{Cn({repeatId:s,currentData:e});let l=e.length,p=r.length,h=l-p;if(h>0){let f=a?tg({diff:h,previousLenght:p,current:e,state:t,repeatId:s,render:n}):eg({diff:h,current:e,previousLenght:p,render:n,state:t,repeatId:s});a&&Zr({stringDOM:f,parent:o,position:"beforeend"}),a||xs({elements:f,parent:o,position:"beforeend"})}if(h<0){let f=ga({children:c,hasKey:!1});f.filter((S,_)=>_>=e.length).forEach(S=>{S.forEach(_=>{let E=ra({id:_}),x=ws({id:_}),w=x??E;ro({id:i,invalidateParent:w}),to({id:i,repeatParent:w}),it({id:_}),x&&x.remove()})});let{debug:y}=Mt();if(y&&Lw(o),f.length>0)return e;let v=Ms({repeatId:s});if(!v)return e;v.filter(({index:S})=>S>=e.length).forEach(S=>{let{element:_}=S;ro({id:i,invalidateParent:_}),to({id:i,repeatParent:_}),or({id:i,container:_}),_.remove()})}return e};var cg=async({state:t="",persistent:e,repeaterParentElement:r=document.createElement("div"),current:o=[],previous:n=[],key:s="",id:i,fallBackParentId:a="",render:c,repeatId:l,useSync:p,currentChildren:h=[]})=>{let y=(Kf({current:o,previous:n,key:s})?ig:ag)({state:t,current:o,previous:n,repeaterParentElement:r,key:s,id:i,render:c,repeatId:l,useSync:p,currentChildren:h});return fe.set(pt,{element:r,parentId:a??i,persistent:e,source:nh},{emit:!1}),await fe.emitAsync(pt),sn(),y};var lg=({state:t="",setState:e,persistent:r=!1,watch:o,clean:n=!1,beforeUpdate:s,afterUpdate:i,key:a="",id:c="",repeatId:l="",render:p,useSync:h=!1})=>{let f=ra({id:c}),d=Es({id:l}),y=d?cn({element:d})??"":"";return i(),o(t,async(T,S)=>{if(!u.checkType(Array,T))return;let _=Es({id:l}),E=vn({state:t,componentId:c,moduleId:l,type:El}),x=_d({state:t,componentId:c,repeatId:l,type:El});if(un({id:c,prop:t}),qf({id:c,state:t,container:_})){Gr({id:c,prop:t}),e(t,S,{emit:!1}),E(),x();return}let I=_s({repeatId:l});f&&await s(),n&&(I.forEach(F=>{it({id:F})}),_&&(_.textContent="")),_&&Uf({id:c,state:t,container:_});let N=await cg({state:t,persistent:r,repeaterParentElement:_??document.createElement("div"),current:T,previous:n?[]:S,key:a,id:c,fallBackParentId:y,render:p,repeatId:l,useSync:h,currentChildren:n?[]:I}),A=_s({repeatId:l}),O=!!a,R=ga({children:A,previousChildren:I,hasKey:O}),P=O?[...Qf({children:R,key:a,data:N})]:R,$=O?new Map(T.map((F,k)=>[`${F?.[a]}`,k])):new Map;P.forEach((F,k)=>{let L=N?.[k];if(!L)return;let C=O?$.get(`${L?.[a]}`)??-1:k;F.forEach(M=>{sa({id:M,value:{current:L,index:C}})})}),u.useNextLoop(async()=>{f&&i(),Gf({id:c,state:t,container:_}),Gr({id:c,prop:t}),E(),x(),da({invalidateParent:_,id:c}),ha({repeatParent:_,id:c}),P.length===0&&_a({repeatId:l,id:c})})})};var ug=({repeatId:t,persistent:e,state:r,setState:o,emit:n,watch:s,clean:i,beforeUpdate:a,afterUpdate:c,key:l,id:p,render:h,useSync:f})=>{let d=lg({state:r,setState:o,persistent:e,emit:n,watch:s,clean:i,beforeUpdate:a,afterUpdate:c,key:l,id:p,repeatId:t,render:h,useSync:f});Hf({repeatId:t,unsubscribe:d})};var pg=({repeatId:t,initializeModule:e})=>{let r=J.get(t);r&&J.set(t,{...r,initializeModule:e,unsubscribe:()=>{}})};var mg=({repeatId:t})=>{let e=J.get(t);e&&J.set(t,{...e,initialized:!0,initializeModule:()=>{}})};var hg=({repeatId:t,initialDOMRender:e})=>{let r=J.get(t);r&&J.set(t,{...r,initialRenderWithoutSync:e})};var dg=({repeatId:t,scopeId:e,observe:r})=>{J.set(t,{element:void 0,initialized:!1,scopeId:e,observed:r,nativeDOMChildren:[],componentChildren:[],currentData:[],initialRenderWithoutSync:[],initializeModule:()=>{},unsubscribe:()=>{}})};var fg=({repeatId:t,scopeId:e})=>{let r=rt.get(e)??[];rt.set(e,[...r,{repeatId:t}])};var gg=({invalidateId:t,scopeId:e})=>{let r=tt.get(e)??[];tt.set(e,[...r,{invalidateId:t}])};var bg=({getState:t,setState:e,updateState:r,getProxi:o,emit:n,emitAsync:s,computed:i,watch:a,id:c,key:l,bindEventsId:p,debug:h})=>({bindEventsId:p,key:l,id:c,getState:t,setState:e,updateState:r,getProxi:o,emit:n,emitAsync:s,computed:i,watch:a,debug:h,repeatIdArray:[],renderComponent:async({attachTo:d,component:y,position:v="afterbegin",clean:T=!0})=>{T&&(or({id:c,container:d}),d.textContent=""),d.insertAdjacentHTML(v,y),fe.set(pt,{element:d,parentId:c,persistent:Fi(c),source:ih},{emit:!1}),await fe.emitAsync(pt),sn()},getChildren:d=>$i({id:c,componentName:d}),freezeProp:d=>{let y=Ae.extractkeyFromProp(d);return un({id:c,prop:y.toString()})},unFreezeProp:d=>{let y=Ae.extractkeyFromProp(d);return Gr({id:c,prop:y.toString()})},unBind:()=>vf({id:c}),bindProps:d=>{let y="props"in d?d:{props:d};return`${Wi}="${yf({...y,parentId:c})}" `},staticProps:d=>` ${pn}="${ba(d)}" `,remove:()=>{it({id:c})},removeDOM:d=>{or({id:c,container:d}),d.textContent=""},getParentId:()=>ys(c),watchParent:(d,y)=>{let v=Et(ys(c),d,y);v&&la({id:c,unWatchArray:[v]})},onMount:d=>uf({id:c,cb:d}),bindEvents:d=>`${ji}="${ff(d)}"`,delegateEvents:d=>`${er}="${Of(d)}"`,bindEffect:d=>`${mn}="${Ef({data:d,id:c})}"`,addMethod:(d,y)=>{Eh({id:c,name:d,fn:y})},setRef:d=>`${tr}="${c}" ${_r}="${d}"`,getRef:()=>kf({id:c}),getRefs:()=>Dl({id:c}),bindText:(d,...y)=>{let v=u.getUnivoqueId(),T=()=>wd(c,d,...y);return Sd(v,{id:c,render:T,props:y}),`<mobjs-bind-text ${ko}="${c}" ${Bi}="${v}"></mobjs-bind-text>${T()}`},bindObject:(d,...y)=>{let v=Nd(y),T=u.getUnivoqueId(),S=()=>Ad(d,...y);return Rd(T,{id:c,keys:v,render:S}),`<mobjs-bind-object ${ko}="${c}" ${Vi}="${T}"></mobjs-bind-object>${S()}`},invalidate:({observe:d,render:y,beforeUpdate:v=()=>Promise.resolve(),afterUpdate:T=()=>{}})=>{let S=Vf(d),_=u.getUnivoqueId(),E=`${zi}=${_}`,x=()=>y(),w=!1;return gg({invalidateId:_,scopeId:c}),zf({invalidateId:_,scopeId:c,observe:S}),Wf({invalidateId:_,initializeModule:()=>{w||(Bf({observe:S,watch:a,beforeUpdate:v,afterUpdate:T,persistent:Fi(c),id:c,invalidateId:_,renderFunction:x}),w=!0,jf({invalidateId:_}))}}),`<mobjs-invalidate ${E} style="display:none;"></mobjs-invalidate>${x()}`},repeat:({observe:d,clean:y=!1,beforeUpdate:v=()=>Promise.resolve(),afterUpdate:T=()=>{},key:S="",render:_,useSync:E=!1})=>{let x=Ae.extractkeyFromProp(d),w=u.getUnivoqueId(),I=S!=="";fg({repeatId:w,scopeId:c}),dg({repeatId:w,scopeId:c,observe:x});let N=t()?.[x],A=I?fa({data:N,key:S}):N;Cn({repeatId:w,currentData:A});let O=E?sg({currentUnique:A,key:S,observe:x,repeatId:w,hasKey:I,render:_}):"",R=E?[]:ng({currentUnique:A,render:_,observe:x,repeatId:w,key:S,hasKey:I}),P=!1;return hg({repeatId:w,initialDOMRender:R}),pg({repeatId:w,initializeModule:()=>{P||(ug({repeatId:w,persistent:Fi(c),state:x,setState:e,emit:n,watch:a,clean:y,beforeUpdate:v,afterUpdate:T,key:S,id:c,render:_,useSync:E}),P=!0,mg({repeatId:w}),qh({repeatId:w})||_a({repeatId:w,id:c}))}}),`<mobjs-repeat ${Hi}="${w}" style="display:none;"></mobjs-repeat>${O}`}});var jl=({componentName:t,currentProps:e={}})=>{let o=No()?.[t]?.componentParams?.exportState??[];return Object.fromEntries(Object.entries(e).filter(([n])=>o.includes(n)))};var vg=({element:t,parentIdForced:e})=>{let r=t.getId(),o=t.getInstanceName(),n=t.getParentId(),s=cn({element:t}),i=t.getStaticPropsId(),a=t.getDynamicPropsid(),c=t.getBindEventsId(),l=t.getRepeatValue(),p=t.getComponentRepeatId(),h=t.getCurrentKey()??"",f=t.getComponentName(),d=i?.split(" ").join(""),y=va(d),v={...t.dataset},T=t.getRepeaterPropBind(),S=nf(l);return{element:t,props:{...jl({componentName:f,currentProps:v}),...jl({componentName:f,currentProps:y})},id:r,componentName:f,instanceName:o,key:h,dynamicPropsId:a,repeatPropBind:T,bindEventsId:c,currentRepeatValue:S,parentId:s,componentRepeatId:p}};var yg=t=>{ln.add(t)};var Tg=({element:t,instanceName:e="",props:r={},state:o={},bindStore:n,methods:s={},key:i="",currentRepeaterState:a=rr,repeaterInnerWrap:c,repeatPropBind:l="",componentRepeatId:p="",parentPropsWatcher:h=[()=>{}],refs:f={},destroy:d=()=>{},freezedPros:y=[],persistent:v=!1,child:T={},parentId:S="",id:_="",componentName:E=""})=>{let x=u.createStore(o);Dh({props:r,store:x}),n&&x.bindStore(n),v||yg(_),p&&p.length>0&&Uh({componentId:_,repeatId:p}),e&&e.length>0&&gh({instanceName:e,id:_});let w=Dd({componentName:E}),I=new Set(w);return x.setProxiReadOnlyProp(w),j.set(_,{element:t,componentName:E,instanceName:e,destroy:d,parentPropsWatcher:h,refs:f,methods:s,key:i,currentRepeaterState:a,repeaterInnerWrap:c,repeatPropBind:l,componentRepeatId:p,persistent:v,id:_,parentId:S,freezedPros:y,child:T,state:x}),{getState:()=>x.get(),setState:(N="",A={},{emit:O=!0}={})=>{let R=Mo({id:_,prop:N}),P=Ae.extractkeyFromProp(N),$=I.has(P);$&&Di({prop:P,componentName:E,action:"updateState"}),!(R||$)&&x.set(P,A,{emit:O??!0,usePropAsString:!0})},updateState:(N="",A=()=>({}),{emit:O=!0,clone:R=!1}={})=>{let P=Mo({id:_,prop:N}),$=Ae.extractkeyFromProp(N),F=I.has($);F&&Di({prop:$,componentName:E,action:"updateState"}),!(P||F)&&x.update($,A,{emit:O??!0,clone:R??!1,usePropAsString:!0})},getProxi:()=>x.getProxi(),emit:(N="")=>x.emit(N),emitAsync:async(N="")=>await x.emitAsync(N),computed:(N="",A=()=>{},O=[])=>{let R=Ae.extractkeyFromProp(N);if(I.has(R)){Di({prop:R,componentName:E,action:"computed"});return}return x.computed(R,A,O,{usePropAsString:!0})},watch:(N="",A=()=>{},{wait:O=!1,immediate:R=!1}={})=>x.watch(N,A,{wait:O??!1,immediate:R??!1}),debug:()=>x.debug()}};var _g=({id:t})=>(tt.get(t)??[]).map(({invalidateId:r})=>{let o=ye.get(r);if(o)return{invalidateId:r,initializeModule:o.initializeModule}}).filter(r=>r!==void 0);var Sg=({id:t})=>(rt.get(t)??[]).map(({repeatId:r})=>{let o=J.get(r);if(o)return{repeatId:r,initializeModule:o.initializeModule}}).filter(r=>r!==void 0);var xg=async({element:t,persistent:e=!1,parentIdForced:r="",source:o=zr})=>{let{debug:n}=Mt();n&&console.log("parse source:",o);let s=No(),i=[],a=Al({element:t,currentSelectors:[]}),c=a.parseSourceArray,l=a?.componentToParse;for(;l;){let h=l.getComponentName(),f=s?.[h]?.componentFunction,d=s?.[h]?.componentParams,{scoped:y,bindStore:v}=d,{props:T,id:S,componentName:_,instanceName:E,key:x,dynamicPropsId:w,currentRepeatValue:I,bindEventsId:N,parentId:A,componentRepeatId:O,repeatPropBind:R}=vg({element:l,parentIdForced:r}),P=d?.state??{},{getState:$,setState:F,updateState:k,getProxi:L,emit:C,emitAsync:M,computed:D,watch:V,debug:B}=Tg({element:l,props:T,state:P,id:S,componentName:_,instanceName:E,key:x,repeatPropBind:R,persistent:e,parentId:A,componentRepeatId:O,bindStore:v});Bh({id:S}),O&&O?.length>0&&(sa({id:S,value:I}),mf({id:S,repeatId:O,element:l})),Tf({propsId:w,repeatPropBind:R,componentId:S});let U=bg({getState:$,setState:F,updateState:k,getProxi:L,emit:C,emitAsync:M,computed:D,watch:V,id:S,key:x,bindEventsId:N,debug:B}),oe=await f(U),ce=l.classList,{newElement:q}=sf({content:oe,element:l});if(ad(),ce.length>0&&q?.classList.add(...ce),!0,!q)return;Qd({id:S,newElement:q});let Y=_g({id:S}),se=Sg({id:S});N&&gf({element:q,componentId:S,bindEventsId:N});let re=y??Mt().scoped;re&&await Ol({id:S,element:q}),q?.inizializeCustomComponent?.(U),i.push({onMount:async()=>{re||await Ol({id:S,element:q})},initializeBindPropsWatcher:()=>{Ll({componentId:S,repeatPropBind:R,inizilizeWatcher:!0})},fireInvalidateFunction:Y.length>0?()=>{Y.forEach(({initializeModule:K})=>{K?.()})}:()=>{},fireRepeatFunction:se.length>0?()=>{se.forEach(({initializeModule:K})=>{K?.()})}:()=>{}});let ke=Al({element:t,currentSelectors:c});c=ke.parseSourceArray,l=ke.componentToParse;let Ve=Nl()===Mt().maxParseIteration;if(af(),Ve){console.warn(`dom parse reached max parse limit: ${Nl()}`);break}}let p=If({element:t});Object.keys(p).length>0&&Mf(p);for(let h of i.toReversed()){let{onMount:f,initializeBindPropsWatcher:d,fireInvalidateFunction:y,fireRepeatFunction:v}=h;await f(),v(),y(),d()}i.length=0,c.length=0,l=null,$f(t),wf(t),Id(),Od()};var ks=async({element:t,persistent:e=!1,parentIdForced:r="",source:o=zr})=>{await xg({element:t,persistent:e,parentIdForced:r,source:o}),cf()},Cg=()=>{fe.watch(pt,async({element:t,parentId:e,persistent:r=!1,source:o=zr})=>{await ks({element:t,parentIdForced:e??"",persistent:r,source:o})})};var Eg=()=>{Zf(),bf(),_f()};var wg,Ig,Mg=({fn:t})=>{t&&(Ig=t)},kg=({fn:t})=>{t&&(wg=t)},Rg=()=>Ig,Pg=()=>wg;var Ng=!0,Ag=t=>{Ng=t},Og=()=>Ng;var $g=()=>{for(let t of ln)it({id:t})};var Lg=new Map,Fg=({route:t,params:e})=>Object.entries(e).reduce((r,[o,n])=>`${r}-${o}-${n}`,t),Dg=async({route:t="",templateName:e="",isBrowserNavigation:r=!1,params:o={},skipTransition:n})=>{fe.set(Jt,!0),await Cr();let s=Li();if(!s||!(s instanceof HTMLElement))return;let{activeRoute:i,activeParams:a}=fe.get(),c=Fg({route:t,params:o}),l=Fg({route:i.route,params:a}),p=window.scrollY;Lg.set(l,p);let h=Lg.get(c)??0;fe.set(wo,{currentRoute:i.route,currentTemplate:i.templateName,nextRoute:t,nextTemplate:e});let f=!1,d=fe.watch(wo,()=>{f=!0});Eg(),fe.set(rn,{route:t,templateName:e}),fe.set(on,o);let y=gn({hash:t}),v=n||y?.skipTransition,T=y?.props??{},S=await y?.layout?.({params:o,props:T})??"",_=Rg(),E=s.cloneNode(!0);_&&E&&!v&&(await _({oldNode:E,oldRoute:i.route,newRoute:t,oldTemplateName:i.templateName,newTemplateName:e}),s?.parentNode?.insertBefore(E,s)),s.replaceChildren(),$g(),Zr({stringDOM:S,parent:s,position:"afterbegin"}),await ks({element:s}),v||(s.style.visibility=""),f||fe.set(nn,{currentRoute:t,currentTemplate:e,previousRoute:i.route,previousTemplate:i.templateName}),Og()&&r?scrollTo(0,h):scrollTo(0,0),document.body.dataset.route=t,document.body.dataset.template=e;let x=Pg();x&&!v&&(await x({oldNode:E,newNode:s,oldRoute:i.route,newRoute:t,oldTemplateName:i.templateName,newTemplateName:e}),E.remove()),E=null,d?.(),fe.set(Jt,!1)};var Bg=({route:t})=>t,Vg=t=>{Bg=t},Wg=({route:t})=>{let e=Bg({route:t});return{route:e,isRedirect:e!==t}};var jg=({hash:t=""})=>{let e=ta(),r=Kd();return t===""?e:gn({hash:t})?t:r},zg=({hash:t=""})=>gn({hash:t})?.templateName??"",Hg=({hash:t=""})=>gn({hash:t})?.restoreScroll??!0;var Ug="",Gg=!0,Er="",qg="",oo,Hl,Rs,Ul=t=>t.replace("?","").replace("/",""),Jg=t=>t.replace("#","").replace("/","").replace(".",""),Fw=t=>t.split("&").reduce((e,r)=>{let o=r.split("="),n=Ul(o?.[0]??""),s=o?.[1];return n&&n.length>0?{...e,[n]:s}:e},{}),Dw=t=>t&&Object.entries(t).reduce((e,[r,o],n)=>`${e}${n===0?"":"&"}${r}=${o}`,"");document.addEventListener("click",t=>{if(!t.target)return;t.target.closest("a")&&fe.getProp(Jt)&&t.preventDefault()},{passive:!1});var Sa=async({shouldLoadRoute:t=!0}={})=>{let e=globalThis.location.hash,r={hash:e},{routeIsLoading:o}=fe.get();if(o){globalThis.location.hash=Ug.replace("#","");return}Rs||history.replaceState({nextId:r},"",e);let{route:n,isRedirect:s}=Wg({route:e});s&&history.replaceState({nextId:r},"",`#${n}`);let i=n.split("?"),a=Ul(i?.[1]??"");qg=Er,Er=Jg(i?.[0]??"");let c=Fw(oo??a),l=oo||Object.keys(a).length>0?`?${oo??a}`:"";oo=void 0;let p=jg({hash:Er}),h=zg({hash:Er&&Er.length>0?Er:ta()}),f=Er===qg&&l.length===0&&!Gg;t&&!f&&(Ug=`#${Er}${l}`,await Dg({route:p,templateName:h,isBrowserNavigation:Hg({hash:Er})&&!!Rs,params:c,skipTransition:!!(Rs??Hl)})),t||(fe.set(rn,{route:p,templateName:h}),fe.set(on,c)),Hl=void 0,u.useNextLoop(()=>{Gg=!1})},Yg=()=>{Sa(),globalThis.history.scrollRestoration="manual",globalThis.addEventListener("popstate",t=>{Rs=t?.state?.nextId}),globalThis.addEventListener("hashchange",async()=>{await Qr(),Sa()})},Xg=({url:t,params:e,skipTransition:r})=>{if(!t||fe.getProp(Jt))return;Hl=r;let o=t.split("?"),n=Jg(o?.[0]??""),s=Dw(e),i=Ul(o?.[1]??""),a=s??i;oo=a.length>0?a:"",Rs=void 0,globalThis.location.hash=oo&&oo.length>0?`${n}?${oo}`:n,globalThis.dispatchEvent(new HashChangeEvent("hashchange"))};var Kg=async({rootId:t,wrapper:e,contentId:r,routes:o=[],afterInit:n=()=>{},redirect:s=({route:f})=>f,index:i="home",pageNotFound:a="pageNotFound",beforePageTransition:c,pageTransition:l,restoreScroll:p=!0,componentDefaultProps:h={scoped:!1,maxParseIteration:1e4,debug:!1}})=>{jd(h);let f=document.querySelector(t),d=await e();Vg(s),!(!r||!f)&&(dh({contentId:r}),Pf({element:f}),kg({fn:l}),Mg({fn:c}),Ag(p),Cg(),Fd(),Jd(o),Yd({hash:i}),Xd({hash:a}),Zr({stringDOM:d,parent:f,position:"afterbegin"}),fh(),Sa({shouldLoadRoute:!1}),await ks({element:f,persistent:!0}),u.useFrameIndex(()=>{u.useNextTick(()=>{n()})},5),Yg())};var Qg=()=>ye.size;var Zg=()=>J.size;var ue={};_o(ue,{clamp:()=>nt,getDefault:()=>sI,mq:()=>cI,printDefault:()=>iI,setDefault:()=>nI,useVelocity:()=>aI});var $o={default:{tension:20,mass:1,friction:5,velocity:0,precision:.01},gentle:{tension:120,mass:1,friction:14,velocity:0,precision:.01},wobbly:{tension:180,mass:1,friction:12,velocity:0,precision:.01},bounce:{tension:200,mass:3,friction:5,velocity:0,precision:.01},scroller:{tension:10,mass:1,friction:5,velocity:0,precision:.5}};var ge={easeLinear:"easeLinear",easeInQuad:"easeInQuad",easeOutQuad:"easeOutQuad",easeInOutQuad:"easeInOutQuad",easeInCubic:"easeInCubic",easeOutCubic:"easeOutCubic",easeInOutCubic:"easeInOutCubic",easeInQuart:"easeInQuart",easeOutQuart:"easeOutQuart",easeInOutQuart:"easeInOutQuart",easeInQuint:"easeInQuint",easeOutQuint:"easeOutQuint",easeInOutQuint:"easeInOutQuint",easeInSine:"easeInSine",easeOutSine:"easeOutSine",easeInOutSine:"easeInOutSine",easeInExpo:"easeInExpo",easeOutExpo:"easeOutExpo",easeInOutExpo:"easeInOutExpo",easeInCirc:"easeInCirc",easeOutCirc:"easeOutCirc",easeInOutCirc:"easeInOutCirc",easeInElastic:"easeInElastic",easeOutElastic:"easeOutElastic",easeInOutElastic:"easeInOutElastic",easeInBack:"easeInBack",easeOutBack:"easeOutBack",easeInOutBack:"easeInOutBack",easeInBounce:"easeInBounce",easeOutBounce:"easeOutBounce",easeInOutBounce:"easeInOutBounce"},As="min",eb="max",ql="desktop",Os="easeLinear",Ps="default",Jl={xSmall:320,small:360,medium:600,tablet:768,desktop:992,large:1200,xLarge:1600,xxLarge:1980},Yl=10,Ns=.06,Xl="#ff0000",Kl="#14df3b",Ql=8,Zl=10,eu=1e3,tu=!1,Vw=!1,Ww=!1,jw=.01,zw=.06,tb=t=>{let e=Je({prop:"deferredNextTick",value:t?.deferredNextTick,defaultValue:u.store.getProp("deferredNextTick"),type:Boolean}),r=Je({prop:"usePassive",value:t?.usePassive,defaultValue:u.store.getProp("usePassive"),type:Boolean}),o=Je({prop:"throttle",value:t?.throttle,defaultValue:u.store.getProp("throttle"),type:Number}),n=Hw(t?.mq??{}),s=Je({prop:"defaultMq.value",value:t?.defaultMq?.value,defaultValue:ql,type:String}),i=Je({prop:"defaultMq.type",value:t?.defaultMq?.type,defaultValue:As,type:String}),a=Je({prop:"sequencer.duration",value:t?.sequencer?.duration,defaultValue:Yl,type:Number}),c=Gl(t?.sequencer?.ease,"sequencer"),l=Je({prop:"scrolTrigger.springConfig",value:t?.scrollTrigger?.springConfig,defaultValue:Ps,type:String}),p=Je({prop:"scrolTrigger.lerpConfig",value:t?.scrollTrigger?.lerpConfig,defaultValue:Ns,type:Number}),h=Je({prop:"scrolTrigger.markerColor.startEnd",value:t?.scrollTrigger?.markerColor?.startEnd,defaultValue:Xl,type:String}),f=Je({prop:"scrolTrigger.markerColor.item",value:t?.scrollTrigger?.markerColor?.item,defaultValue:Kl,type:String}),d=Je({prop:"parallax.defaultRange",value:t?.parallax?.defaultRange,defaultValue:Ql,type:Number}),y=Je({prop:"parallax.springConfig",value:t?.parallax?.springConfig,defaultValue:Ps,type:String}),v=Je({prop:"parallax.lerpConfig",value:t?.parallax?.lerpConfig,defaultValue:Ns,type:Number}),T=Je({prop:"parallaxTween.duration",value:t?.parallaxTween?.duration,defaultValue:Zl,type:Number}),S=Gl(t?.parallaxTween?.ease,"parallaxTween"),_=Je({prop:"tween.duration",value:t?.tween?.duration,defaultValue:eu,type:Number}),E=Gl(t?.tween?.ease,"tween"),x=Je({prop:"tween.relative",value:t?.tween?.relative,defaultValue:tu,type:Boolean}),w=Je({prop:"spring.relative",value:t?.spring?.relative,defaultValue:Vw,type:Boolean}),I=Je({prop:"lerp.relative",value:t?.lerp?.relative,defaultValue:Ww,type:Boolean}),N=Je({prop:"lerp.precision",value:t?.lerp?.precision,defaultValue:jw,type:Number}),A=Je({prop:"lerp.velocity",value:t?.lerp?.velocity,defaultValue:zw,type:Number});return{deferredNextTick:e,throttle:o,usePassive:r,mq:n,defaultMq:{value:s,type:i},sequencer:{duration:a,ease:c},scrollTrigger:{springConfig:l,lerpConfig:p,markerColor:{startEnd:h,item:f}},parallax:{defaultRange:d,springConfig:y,lerpConfig:v},parallaxTween:{duration:T,ease:S},tween:{duration:_,ease:E,relative:x},spring:{relative:w,config:t?.spring?.config?{...$o,...t.spring.config}:$o},lerp:{relative:I,precision:N,velocity:A}}},Je=({prop:t,value:e,defaultValue:r,type:o})=>{let n=u.checkType(o,e);return n||console.warn(`handleSetUp error: ${t}: ${e}, is not valid must be a ${u.getTypeName(o)}`),n?e:r},Hw=t=>{let e=u.checkType(Object,t)&&Object.values(t).every(r=>u.checkType(Number,r));return e||console.warn("handleSetUp error: mq must be an object as { ..., String: Number }"),e?t:Jl},Gl=(t,e)=>{let r=Object.keys(ge).includes(t);return!r&&t!==void 0&&t!==null&&console.warn(`handleSetUp error: ${e}.ease properties is not valid`),r?t:Os};var at=(t,e,r=!0)=>{t=(n=>{let s;try{s=JSON.parse(JSON.stringify(n))}catch{s=Object.assign({},n)}return s})(t);let o=n=>n&&typeof n=="object";return!o(t)||!o(e)?e:(Object.keys(e).forEach(n=>{let s=t[n],i=e[n];Array.isArray(s)&&Array.isArray(i)?r?(t[n]=s.map((a,c)=>i.length<=c?a:at(a,i[c],r)),i.length>s.length&&(t[n]=t[n].concat(i.slice(s.length)))):t[n]=s.concat(i):o(s)&&o(i)?t[n]=at(Object.assign({},s),i,r):t[n]=i}),t)};function rb(){return{deferredNextTick:u.store.getProp("deferredNextTick"),throttle:u.store.getProp("throttle"),usePassive:u.store.getProp("usePassive"),mq:Jl,defaultMq:{value:ql,type:As},sequencer:{duration:Yl,ease:Os},scrollTrigger:{springConfig:Ps,lerpConfig:Ns,markerColor:{startEnd:Xl,item:Kl}},parallax:{defaultRange:Ql,springConfig:Ps,lerpConfig:Ns},parallaxTween:{duration:Zl,ease:Os},tween:{duration:eu,ease:Os,relative:tu},spring:{relative:!1,config:$o},lerp:{relative:!1,precision:.01,velocity:.06}}}var he=(()=>{let t=rb();return{set:n=>{t=tb(at(rb(),n)),"usePassive"in n&&u.store.set("usePassive",t.usePassive),"deferredNextTick"in n&&u.store.set("deferredNextTick",t.deferredNextTick),"throttle"in n&&u.store.set("throttle",t.throttle)},get:n=>(n in t||console.warn(`handleSetUp: ${n} is not a setup propierties`),t[n]),print:()=>{console.log("Writable props:"),console.log(t)}}})();var Uw=(t="desktop")=>window.innerWidth<he.get("mq")[t],Gw=(t="desktop")=>window.innerWidth>=he.get("mq")[t],qw=(t="desktop")=>he.get("mq")[t],ve={max:Uw,min:Gw,getBreackpoint:qw};var _e=t=>{if(u.checkType(Number,t))return Math.round(t*1e4)/1e4||0;if(Math.abs(t)<1){let e=Number.parseInt(t.toString().split("e-")[1]);e&&(t*=Math.pow(10,e-1),t="0."+Array.from({length:e}).join("0")+t.toString().slice(2))}else{let e=Number.parseInt(t.toString().split("+")[1]);e>20&&(e-=20,t/=Math.pow(10,e),t+=Array.from({length:e+1}).join("0"))}return Number.parseFloat(Number.parseFloat(t).toFixed(4))},nt=(t,e,r)=>Math.min(Math.max(t,e),r),ob=(t,e,r)=>(1-r)*t+r*e,no=(t,e)=>{let r=Object.keys(t).toSorted(),o=Object.keys(e).toSorted();return r.length===o.length&&r.every((n,s)=>n===o[s])},$s=(t,e)=>{let r=[];for(let o=0;o<t.length;o+=e){let n=t.slice(o,o+e);r.push(n)}return r},nb=(t,e)=>t.map(r=>r[e]);var xa=t=>t.map(e=>(e.settled||(e.fromValue=e.currentValue),e)),wr=t=>t.map(e=>(e.fromValue=e.toValue,e.currentValue=e.toValue,e)),En=t=>t.map(e=>(e.toValue=e.currentValue,e.fromValue=e.currentValue,e)),Ir=(t,e)=>{let r=Object.keys(t);return e.map(o=>{if(r.includes(o.prop)){let n=o.fromValue,s=o.toValue;o.fromValue=s,o.toValue=n}return o})},wn=(t,e)=>t.map(r=>(r.toValue=e?r.toValue+r.currentValue:r.toValue,r));var ru=(t,e)=>t.map(r=>(r.shouldUpdate&&(r.toValProcessed=e?r.toValue+1e-5:r.toValue-r.fromValue+1e-5),r));var Ca="radial",nr="start";var In="center",Mn="edges",kn="random",sb="MERGE_FROM_UP",ou="MERGE_FROM_DOWN",Lo="equal",Fo="start";var Do="center",Rn={type:Lo,each:0,waitComplete:!1,from:nr,grid:{col:1,row:1,direction:"col"}},Xe={index:0,frame:0};var b={PX:"px",VH:"vh",VW:"vw",WPERCENT:"w",HPERCENT:"h",DEGREE:"deg",PLUS_HEIGHT:"+height",PLUS_HEIGHT_HALF:"+halfHeight",PLUS_WIDTH:"+width",PLUS_WIDTH_HALF:"+halfWidth",MINUS_HEIGHT:"-height",MINUS_HEIGHT_HALF:"-halfHeight",MINUS_WIDTH:"-width",MINUS_WIDTH_HALF:"-halfWidth",POSITION_BOTTOM:"bottom",POSITION_TOP:"top",POSITION_LEFT:"left",POSITION_RIGHT:"right",DIRECTION_VERTICAL:"vertical",DIRECTION_HORIZONTAL:"horizontal",TYPE_PARALLAX:"parallax",TYPE_SCROLLTRIGGER:"scrolltrigger",PROP_VERTICAL:"y",PROP_HORIZONTAL:"x",PROP_ROTATE:"rotate",PROP_ROTATEY:"rotateY",PROP_ROTATEX:"rotateX",PROP_ROTATEZ:"rotateZ",PROP_OPACITY:"opacity",PROP_SCALE:"scale",PROP_SCALE_X:"scaleX",PROP_SCALE_Y:"scaleY",PROP_TWEEN:"tween",TWEEN_TWEEN:"parallaxTween",TWEEN_TIMELINE:"sequencer",ALIGN_START:"start",ALIGN_TOP:"top",ALIGN_RIGHT:"right",ALIGN_CENTER:"center",ALIGN_BOTTOM:"bottom",ALIGN_LEFT:"left",ALIGN_END:"end",IN_STOP:"in-stop",IN_BACK:"in-back",OUT_STOP:"out-stop",OUT_BACK:"out-back",EASE_SPRING:"spring",EASE_LERP:"lerp",EASE_PRECISION:.001,SCROLL_UP:"up",SCROLL_DOWN:"down",ON_LEAVE:"ON_LEAVE",ON_LEAVE_BACK:"ON_LEAVE_BACK",ON_ENTER:"ON_ENTER",ON_ENTER_BACK:"ON_ENTER_BACK",ON_NOOP:"ON_NOOP"};var Mr=t=>t.map(e=>`${e} | `).join(""),so=(t,e,r)=>{console.warn(`${t}: ${JSON.stringify(e)} and to ${JSON.stringify(r)} is not equal`)},kt=t=>{console.warn(`stagger col of grid is out of range, it must be less than ${t} ( staggers length )`)},kr=t=>{console.warn(`tween | sequencer: ${t} is not valid value, must be a number or a Function that return a number`)},ib=t=>{console.warn(`sequencer, start option: ${t} value is not valid, must be a Number`)},ab=t=>{console.warn(`sequencer, end option: ${t} value is not valid, must be a Number`)},cb=()=>{console.warn("relative prop is not allowed inside a timeline")},lb=t=>{console.warn(`Timeline Supend: ${t()} is not a valid value, must be a boolean`)},ub=()=>{console.warn("SyncTimeline: in revese ( or yoyo mode) only goTo || goFromTo || set action is allowed. Using goFrom makes no sense in this context. Enable forceFromTo to use from action in reverse mode")},pb=t=>{console.warn(`timeline setTween: ${t} is not an array of tween`)},mb=t=>{console.warn(`timeline setTween: ${t} is not a string`)},hb=t=>{console.warn(`asyncTimeline.setTween() label: ${t} not found`)},db=()=>{console.warn("setTween fail")},fb=t=>{console.warn(`label ${t} not founded`)},gb=t=>{console.warn(`sequencer.add(fn,time) ${t}: fn must be Function`)},bb=t=>{console.warn(`sequencer.add(fn,time) ${t}: time must be a Number`)},nu=t=>{console.warn(`${t} doesn't exist in spring configuration list`)},vb=()=>{console.warn("Spring configProps: all prop must be a positive Number")},yb=t=>{console.warn(`Spring config: ${t}: config must have friction/mass/precision/tesnion props and must be a number`)},Bo=t=>{console.warn(`${t} doesn't exist in tweens ease function`)},Ea=()=>{console.warn("stagger each must be a Number ")},Tb=t=>{console.warn(`stagger, row/col: ${t} value is not valid, must be a Number`)},_b=()=>{console.warn("Stagger error: waitComplete propierties must be a Boolean")},Sb=()=>{console.warn("Stagger error: in grid option direction should be a string radial/col/row")};var xb=()=>{console.warn("Stagger error: in col/row direction 'from' propierties must be a string start/end/center/edges or a number")},Cb=t=>{console.warn(`Stagger error: from: ${t} is not a valid value, must be a string start/end/center/edges or a number or a Object {x:Number,y:Number}`)},Eb=t=>{console.warn(`duration error: ${t} is not valid duration must be a number`)},wb=t=>{console.warn(`duration error: ${t} is not valid duration must be a number or a Function that return a number`)},Ib=t=>{console.warn(`repeat error: ${t} is not valid repeat value must be a Number`)};var Mb=t=>{console.warn(`data inizializiation error; ${t} is not a valid value, must be a string`)},kb=t=>{console.warn(`data inizializiation error; ${t} is not a valid value, must be a number`)},Rb=()=>{console.warn("createStaggers error: items array can not be empty")},Pb=()=>{console.warn("createStaggers error: each element of the array must be an Element or an Object")},Nb=()=>{console.warn(`screateStaggers error: type should be: ${Lo} || ${nr} || ${"end"} || ${Do}`)},Ab=t=>{console.warn(`createStagger:  each must be between 1 and ${t}`)},Ob=(t,e)=>{console.warn(`${e}: relative prop: ${t} is not a valid parameter, must be a boolean `)},su=(t,e)=>{console.warn(`${e}: '${t}' is not Boolean`)},$b=(t,e)=>{console.warn(`${e}: '${t}' is not String`)},Lb=(t,e)=>{console.warn(`${e}: '${t}' is not Number`)},Fb=(t,e)=>{console.warn(`${e}: '${t}' is not Function`)},Db=()=>{console.warn("Lerp error: velocity is not valid, must be a Number greater than 0 and less than 1")},Bb=()=>{console.warn("Lerp error: precision is not valid, must be a number greater than 0")},Nn=t=>{console.warn(`asyncTimeline error: ${t} cannot be used inside group`)},Vb=t=>{console.warn(`${t} value must be a string`)},Wb=()=>{console.warn("tween added to asyncTimeline or used inside sync() method must be instance of HandleLerp | HandleTween | HandleSpring")},jb=()=>{console.warn("asyncTimeline arror: delay must be a Number")},zb=t=>{console.warn(`${t} not found`)},Hb=t=>{console.warn(`timeline add async function, ${t} is not a function `)},Ub=(t,e)=>{console.warn(`${e} direction: ${t} is not valid value: must be ${b.DIRECTION_VERTICAL} | ${b.DIRECTION_HORIZONTAL}`)},Gb=t=>{console.warn(`scrollTrigger error; ${t} propierties: value must be a Object like { position: top|bottom|left|right, value: () => { return Number} } `)},qb=()=>{console.warn("scrollTrigger error; dynamicRange propierties: value must be a Function that return a Number")},Jb=()=>{console.warn("parallax|scrolTrigger error: tween is not valid, must be an instance of HandleSequencer || ParallaxTween")},Yb=(t,e)=>{console.warn(`parallax error align propierties: ${t} is not valid must be one of ${Mr(e)} or a Number between 0 and 100`)},Xb=(t,e)=>{console.warn(`parallax error align propierties: ${t} is not valid must be one of ${Mr(e)}`)},Kb=(t,e)=>{console.warn(`${e}: '${t}' is not Number, must be a number between 0 and 100`)},Qb=(t,e)=>{console.warn(`parallax error type propierties: ${t} is not valid must be one of ${Mr(e)}`)},Zb=(t,e)=>{console.warn(`parallax/scrollTrigger error propierties props: ${t} is not valid must be one of ${Mr(e)} or a custom css propierites like margin|line-height|...`)},ev=(t,e)=>{console.warn(`parallax error easeType props: ${t} is not valid must be one of ${Mr(e)}`)},tv=(t,e,r)=>{console.warn(`${r} error easeType props: ${t} is not valid must be one of ${Mr(e)}`)},rv=()=>{console.warn('Scrolltrigger warning: spring animation is only available for native properties and scrollerTween, Check that with the "propierties" property set to "tween" no HandleSequencer is associated with the "tween" property')},ov=(t,e)=>{console.warn(`parallax/scrollTrigger error springConfig props: ${t} is not valid must be one of ${Mr(e)}`)},nv=t=>{console.warn(`parallax error range propierties, current value: ${t}, the value must be a number between 0 and 9.99`)},sv=t=>{console.warn(`scrollTrigger error range propierties: ${t} is not a String`)},iu=(t,e,r,o)=>{console.warn(`${o} error ${r} propierties: ${t} is not valid must be one of ${Mr(e)}`)},iv=()=>{console.warn("Parallax warning: if propierties is a tween the only choice is ParallaxTween, HandleSequencer or empty tween propierites is not allowed inside a parallax")},av=()=>{console.warn("parallax/ScrollTrrigger error: velocity is not valid, must be a Number greater than 0 and less than 1")},cv=()=>{console.warn('parallax/ScrollTrrigger warning:  The property is "tween" but no tween has been associated, associate a tween with the "tween" property')},lv=()=>{console.warn('parallax/ScrollTrrigger: there is tween associated but pros "propierties" is not set to "tween"')},uv=(t,e)=>{console.warn(`${t}: ${e} is not a function`)},au=(t,e,r)=>{console.warn(`scrollTrigger error range : with '${e}' propierties ${t} is not valid, add one of the following unit misure: ${Mr(r)}, es: 45deg|100px|50vw etc..`)},pv=t=>{console.warn(`scrollTrigger error range : with custom css propierties '${t}' no unit misure is necessary, the default unit misure will be used (px). Only '-' for negative value is allowed`)},mv=(t,e)=>{console.warn(`scrollTrigger error range : with '${e}' propierties ${t} is not valid no unit misure is necessary. Only '-' for negative value is allowed`)};var Wt={[ge.easeLinear]:(t,e,r,o)=>r*t/o+e,[ge.easeInQuad]:(t,e,r,o)=>r*(t/=o)*t+e,[ge.easeOutQuad]:(t,e,r,o)=>-r*(t/=o)*(t-2)+e,[ge.easeInOutQuad]:(t,e,r,o)=>(t/=o/2)<1?r/2*t*t+e:-r/2*(--t*(t-2)-1)+e,[ge.easeInCubic]:(t,e,r,o)=>r*(t/=o)*t*t+e,[ge.easeOutCubic]:(t,e,r,o)=>r*((t=t/o-1)*t*t+1)+e,[ge.easeInOutCubic]:(t,e,r,o)=>(t/=o/2)<1?r/2*t*t*t+e:r/2*((t-=2)*t*t+2)+e,[ge.easeInQuart]:(t,e,r,o)=>r*(t/=o)*t*t*t+e,[ge.easeOutQuart]:(t,e,r,o)=>-r*((t=t/o-1)*t*t*t-1)+e,[ge.easeInOutQuart]:(t,e,r,o)=>(t/=o/2)<1?r/2*t*t*t*t+e:-r/2*((t-=2)*t*t*t-2)+e,[ge.easeInQuint]:(t,e,r,o)=>r*(t/=o)*t*t*t*t+e,[ge.easeOutQuint]:(t,e,r,o)=>r*((t=t/o-1)*t*t*t*t+1)+e,[ge.easeInOutQuint]:(t,e,r,o)=>(t/=o/2)<1?r/2*t*t*t*t*t+e:r/2*((t-=2)*t*t*t*t+2)+e,[ge.easeInSine]:(t,e,r,o)=>-r*Math.cos(t/o*(Math.PI/2))+r+e,[ge.easeOutSine]:(t,e,r,o)=>r*Math.sin(t/o*(Math.PI/2))+e,[ge.easeInOutSine]:(t,e,r,o)=>-r/2*(Math.cos(Math.PI*t/o)-1)+e,[ge.easeInExpo]:(t,e,r,o)=>t===0?e:r*Math.pow(2,10*(t/o-1))+e,[ge.easeOutExpo]:(t,e,r,o)=>t===o?e+r:r*(-Math.pow(2,-10*t/o)+1)+e,[ge.easeInOutExpo]:(t,e,r,o)=>t===0?e:t===o?e+r:(t/=o/2)<1?r/2*Math.pow(2,10*(t-1))+e:r/2*(-Math.pow(2,-10*--t)+2)+e,[ge.easeInCirc]:(t,e,r,o)=>-r*(Math.sqrt(1-(t/=o)*t)-1)+e,[ge.easeOutCirc]:(t,e,r,o)=>r*Math.sqrt(1-(t=t/o-1)*t)+e,[ge.easeInOutCirc]:(t,e,r,o)=>(t/=o/2)<1?-r/2*(Math.sqrt(1-t*t)-1)+e:r/2*(Math.sqrt(1-(t-=2)*t)+1)+e,[ge.easeInElastic]:(t,e,r,o)=>{let n=1.70158,s=0,i=r;return t===0?e:(t/=o)===1?e+r:(s||(s=o*.3),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),-(i*Math.pow(2,10*(t-=1))*Math.sin((t*o-n)*(2*Math.PI)/s))+e)},[ge.easeOutElastic]:(t,e,r,o)=>{let n=1.70158,s=0,i=r;return t===0?e:(t/=o)===1?e+r:(s||(s=o*.3),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),i*Math.pow(2,-10*t)*Math.sin((t*o-n)*(2*Math.PI)/s)+r+e)},[ge.easeInOutElastic]:(t,e,r,o)=>{let n=1.70158,s=0,i=r;return t===0?e:(t/=o/2)===2?e+r:(s||(s=o*(.3*1.5)),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),t<1?-.5*(i*Math.pow(2,10*(t-=1))*Math.sin((t*o-n)*(2*Math.PI)/s))+e:i*Math.pow(2,-10*(t-=1))*Math.sin((t*o-n)*(2*Math.PI)/s)*.5+r+e)},[ge.easeInBack]:(t,e,r,o,n=1.70158)=>r*(t/=o)*t*((n+1)*t-n)+e,[ge.easeOutBack]:(t,e,r,o,n=1.70158)=>r*((t=t/o-1)*t*((n+1)*t+n)+1)+e,easeInOutBack:(t,e,r,o,n=1.70158)=>(t/=o/2)<1?r/2*(t*t*(((n*=1.525)+1)*t-n))+e:r/2*((t-=2)*t*(((n*=1.525)+1)*t+n)+2)+e,[ge.easeInBounce]:(t,e,r,o)=>r-Wt[ge.easeOutBounce](o-t,0,r,o)+e,[ge.easeOutBounce]:(t,e,r,o)=>(t/=o)<1/2.75?r*(7.5625*t*t)+e:t<2/2.75?r*(7.5625*(t-=1.5/2.75)*t+.75)+e:t<2.5/2.75?r*(7.5625*(t-=2.25/2.75)*t+.9375)+e:r*(7.5625*(t-=2.625/2.75)*t+.984375)+e,[ge.easeInOutBounce]:(t,e,r,o)=>t<o/2?Wt[ge.easeInBounce](t*2,0,r,o)*.5+e:Wt[ge.easeOutBounce](t*2-o,0,r,o)*.5+r*.5+e};var mt=t=>t in Wt?Wt[t]:(Bo(t),Wt[he.get("tween").ease]);var hv=t=>t?t.replaceAll(/[\s#$()*+,.?[\\\]^{|}-]/g,String.raw`\$&`):"",cu=t=>/^[+-]?\d+(\.\d+)?$/.test(t),dv=t=>/^\d+\.\d+$|^\d+$/.test(t),Le=(t,e)=>{let r=new RegExp(`^${hv(e)}$`,"i");return(t.match(r)||[]).length},sr=(t,e)=>{let r=new RegExp(`[0-9]${e}$`,"i");return(t.match(r)||[]).length},lu=(t,e)=>t.some(r=>{let o=new RegExp(`[0-9]${r}$`,"i");return(e.match(o)||[]).length}),uu=(t,e)=>t.some(r=>{let o=new RegExp(`^${hv(r)}$`,"i");return(e.match(o)||[]).length});var fv=t=>t&&(Le(t,b.PROP_VERTICAL)?b.PROP_VERTICAL:Le(t,b.PROP_HORIZONTAL)?b.PROP_HORIZONTAL:Le(t,b.PROP_ROTATE)?b.PROP_ROTATE:Le(t,b.PROP_ROTATEY)?b.PROP_ROTATEY:Le(t,b.PROP_ROTATEX)?b.PROP_ROTATEX:Le(t,b.PROP_OPACITY)?b.PROP_OPACITY:Le(t,b.PROP_SCALE)?b.PROP_SCALE:Le(t,b.PROP_SCALE_X)?b.PROP_SCALE_X:Le(t,b.PROP_SCALE_Y)?b.PROP_SCALE_Y:Le(t,b.PROP_TWEEN)?b.PROP_TWEEN:t),gv=t=>{if(t){if(sr(t,b.PX))return b.PX;if(sr(t,b.VH))return b.VH;if(sr(t,b.VW))return b.VW}return""},wa=t=>Le(t,b.POSITION_TOP)?b.POSITION_TOP:Le(t,b.POSITION_BOTTOM)?b.POSITION_BOTTOM:Le(t,b.POSITION_LEFT)?b.POSITION_LEFT:Le(t,b.POSITION_RIGHT)?b.POSITION_RIGHT:"",bv=t=>sr(t,b.PX)?b.PX:sr(t,b.VH)?b.VH:sr(t,b.VW)?b.VW:sr(t,b.WPERCENT)?b.WPERCENT:sr(t,b.HPERCENT)?b.HPERCENT:sr(t,b.DEGREE)?b.DEGREE:b.PX;var jt=t=>u.checkType(Number,t)||u.checkType(Function,t)&&u.checkType(Number,t()),Ma=({start:t,end:e})=>{let r=u.checkType(Number,t),o=u.checkType(Number,e);return r||ib(t),o||ab(e),r&&o},io=t=>{let e=u.checkType(Number,t);return!e&&t&&Eb(t),e?t:he.get("sequencer").duration},ka=t=>{let e=u.checkType(Number,t);return!e&&t&&Ib(t),e&&t?t:1},vv=t=>{let e=t&&t in Wt;return!e&&t&&Bo(t),e?t:he.get("sequencer").ease},yv=t=>{let e=t&&t in Wt;return!e&&t&&Bo(t),e?mt(t):mt(he.get("parallaxTween").ease)},Tv=(t,e)=>{let r=u.checkType(String,t),o=u.checkType(Number,e);return r||Mb(t),o||kb(e),r&&o},_v=t=>{if(!t)return;let e=u.checkType(Number,t);return e||Ea(),e},Sv=t=>{if(!t)return;let r=[nr,"end",In,Mn,kn].includes(t),o=u.checkType(Number,t),n=u.checkType(Object,t),s=r||o||n;return s||Cb(t),s},mu=t=>{if(!t)return;let e=u.checkType(Number,t);return e||Tb(t),e},xv=t=>{if(!t)return;let r=[Ca,"row","col"].includes(t);return r||Sb(),r},Cv=t=>{if(!t)return;let e=u.checkType(Boolean,t);return e||_b(),e},Ev=(t=[])=>{let e=u.checkType(Array,[...t])&&t.length>0;return e||Rb(),e},wv=(t=[])=>u.checkType(Array,[...t])&&t.length>0?t:[],Iv=t=>{if(!t)return;let r=[Lo,Fo,"end",Do].includes(t);if(!r){Nb();return}return r};var ao=(t,e)=>{let r=u.checkType(Boolean,t);return!r&&t&&Ob(t,e),r?t:he.get(e).relative},Ra=t=>{let e=t&&t in Wt;return!e&&t&&Bo(t),e?mt(t):mt(he.get("tween").ease)},Pa=t=>{let e=t&&t in Wt;return!e&&t&&Bo(t),e?t:he.get("tween").ease},hu=t=>{let{config:e}=he.get("spring"),r=t&&t in e,o=r?e[t]:{},s=(r?u.checkType(Object,o)&&"tension"in o&&"mass"in o&&"friction"in o&&"velocity"in o&&"precision"in o:!1)?Object.values(o).every(i=>u.checkType(Number,i)&&i>=0):null;return!r&&t&&nu(t),!s&&r&&yb(t),s?e[t]:e.default},Mv=t=>{let{config:e}=he.get("spring"),r=t&&t in e;return!r&&t&&nu(t),r},du=t=>{let e=u.checkType(Object,t)&&Object.values(t).every(r=>u.checkType(Number,r)&&r>=0);return!e&&t&&vb(),e?t:{}},fu=t=>{let r=u.checkType(Function,t)?t():t,o=u.checkType(Number,r);return!o&&t&&wb(t),o?r:he.get("tween").duration},Rt=(t,e)=>{let r=u.checkType(Boolean,t);return!r&&t&&su(t,e),r&&t===!0},de=(t,e,r)=>{let o=u.checkType(Boolean,t);return!o&&t&&su(t,e),o?t:r},Na=(t,e,r)=>{let o=u.checkType(String,t);return!o&&t&&$b(t,e),o?t:r},ir=(t,e,r)=>{let o=u.checkType(Number,t);return!o&&t&&Lb(t,e),o?t:r},ct=(t,e,r)=>{let o=u.checkType(Function,t);return!o&&t&&Fb(t,e),o?t:r},Aa=t=>{let e=u.checkType(Number,t)&&t>0&&t<=1;return!e&&t&&Db(),e?t:he.get("lerp").velocity},Oa=t=>{let e=u.checkType(Number,t);return!e&&t&&Bb(),e?t:he.get("lerp").precision},kv=(t,e)=>{let r=u.checkType(String,t);return!r&&t&&Vb(e),r},Fs=t=>{let e=u.checkType(Number,t);return!e&&t&&jb(),e?t:void 0},Ds=t=>{let e=t?.getType?.()&&(t.getType()==="LERP"||t.getType()==="SPRING"||t.getType()==="TWEEN");return!e&&t&&Wb(),e},Rv=(t,e)=>{t===-1&&zb(e)},co=(t,e,r)=>{let o=u.checkType(Function,t);return!o&&t&&uv(r,t),o?t:e},Pv=t=>{let e=u.checkType(Function,t);return!e&&t&&Hb(t),e?t:({resolve:r})=>{r()}},Nv=t=>{let e=u.checkType(Array,t);return!e&&t&&pb(t),e},Av=t=>{let e=u.checkType(String,t);return!e&&t&&mb(t),e},An=(t,e=!1)=>{let o=u.checkType(Element,t)?t:document.querySelector(t);return e?o??globalThis:o??document.createElement("div")},gu=t=>u.checkType(Element,t)?t:document.querySelector(t),Bs=(t,e)=>{if(!t)return b.DIRECTION_VERTICAL;let o=[b.DIRECTION_VERTICAL,b.DIRECTION_HORIZONTAL].includes(t);return!o&&t&&Ub(t,e),o?t:b.DIRECTION_VERTICAL},bu=(t,e)=>{let r=[b.POSITION_TOP,b.POSITION_LEFT,b.POSITION_RIGHT,b.POSITION_BOTTOM],o=u.checkType(Object,t),n=o&&u.checkType(String,t?.position)&&r.includes(t.position),s=o&&u.checkType(Function,t.value)&&u.checkType(Number,t.value()),i=o&&n&&s;return i||Gb(e),i?t:null},Ov=t=>{let e=u.checkType(Function,t)&&u.checkType(Number,t?.());return!e&&t&&qb(),e?t:void 0},$v=t=>{let e=t?.getType?.()&&(t.getType()===b.TWEEN_TWEEN||t.getType()===b.TWEEN_TIMELINE);return!e&&t&&Jb(),e?t:{}},Lv=t=>{if(!t&&t!==0)return b.ALIGN_CENTER;let e=[b.ALIGN_START,b.ALIGN_TOP,b.ALIGN_RIGHT,b.ALIGN_CENTER,b.ALIGN_BOTTOM,b.ALIGN_LEFT,b.ALIGN_END],r=e.includes(t)||u.checkType(Number,t);return!r&&t&&Yb(t,e),r?t:b.ALIGN_CENTER},Fv=t=>{if(!t)return!1;let e=[b.IN_BACK,b.IN_STOP,b.OUT_BACK,b.OUT_STOP],r=e.includes(t);return!r&&t&&Xb(t,e),r?t:!1},vu=(t,e,r)=>{if(t==null)return r;let o=u.checkType(Number,t);return!o&&t&&Kb(t,e),o?t:r},Dv=t=>{if(!t)return b.TYPE_PARALLAX;let e=t?.toLowerCase(),r=[b.TYPE_PARALLAX,b.TYPE_SCROLLTRIGGER],o=r.includes(e);return!o&&e&&Qb(e,r),o?e:b.TYPE_PARALLAX},Bv=(t,e)=>(()=>{if(e===b.TYPE_PARALLAX){let o=dv(t),n=u.checkType(Number,Number(t))&&o&&t>=0&&t<10;return!n&&t&&nv(t),n?10-t:10-he.get("parallax").defaultRange}else{let o=u.checkType(String,t);return!o&&t&&sv(t),o?t:"0px"}})(),Vo=(t,e,r)=>{let o=he.get("defaultMq").value;if(!t)return o;let n=he.get("mq"),s=Object.keys(n),i=u.checkType(String,t)&&s.includes(t);return!i&&t&&iu(t,s,e,r),i?t:o},Wo=(t,e,r)=>{let o=he.get("defaultMq").type;if(!t)return o;let n=[eb,As],s=u.checkType(String,t)&&n.includes(t);return!s&&t&&iu(t,n,e,r),s?t:o},Vv=(t,e,r,o)=>{if(!t&&o)return{propierties:b.PROP_VERTICAL,shouldTrackOnlyEvents:!0};if(!t&&r)return{propierties:b.PROP_VERTICAL,shouldTrackOnlyEvents:!1};let n=e===b.TYPE_SCROLLTRIGGER&&!t,s=[b.PROP_VERTICAL,b.PROP_HORIZONTAL,b.PROP_ROTATE,b.PROP_ROTATEY,b.PROP_ROTATEX,b.PROP_ROTATEZ,b.PROP_OPACITY,b.PROP_SCALE,b.PROP_SCALE_X,b.PROP_SCALE_Y,b.PROP_TWEEN],i=u.checkType(String,t);!i&&t&&Zb(t,s);let a=e===b.TYPE_PARALLAX&&t===b.PROP_TWEEN&&!r;!r&&!o&&t===b.PROP_TWEEN&&cv(),(r||o)&&t!==b.PROP_TWEEN&&lv(),a&&iv();let c=a?b.PROP_VERTICAL:t,l=fv(c);return{propierties:i?l??b.PROP_VERTICAL:b.PROP_VERTICAL,shouldTrackOnlyEvents:n}},Wv=t=>{if(!t)return b.EASE_LERP;let e=[b.EASE_SPRING,b.EASE_LERP],r=e.includes(t);r||ev(t,e);let o=r?t:b.EASE_LERP;return r?t:o},$a=(t,e)=>{let r=[b.EASE_SPRING,b.EASE_LERP],o=r.includes(t);return!o&&t&&tv(t,r,e),o?t:b.EASE_LERP},jv=(t,e)=>{let r=e===b.TYPE_PARALLAX?he.get("parallax").springConfig:he.get("scrollTrigger").springConfig;if(!t)return r;let o=he.get("spring").config,n=Object.keys(o),s=n.includes(t);return!s&&t&&ov(t,n),s?t:r},zv=(t,e)=>{let r=u.checkType(Number,Number(t))&&t>0&&t<=1;!r&&t&&av();let o=e===b.TYPE_PARALLAX?he.get("parallax").lerpConfig:he.get("scrollTrigger").lerpConfig;return r?t:o},Hv=(t,e)=>{let r=[b.PX,b.VW,b.VH,b.WPERCENT,b.HPERCENT];if(e===b.PROP_VERTICAL||e===b.PROP_HORIZONTAL){let n=lu(r,t);return n||au(t,e,r),n?t:"0px"}if(e===b.PROP_ROTATE||e===b.PROP_ROTATEX||e===b.PROP_ROTATEY||e===b.PROP_ROTATEZ){let n=lu([b.DEGREE],t);return n||au(t,e,[b.DEGREE]),n?t:"0"}if(e===b.PROP_SCALE||e===b.PROP_SCALE_X||e===b.PROP_SCALE_Y){let n=cu(t);return n||mv(t,e),n?t:"0"}let o=cu(t);return o||pv(e),o?t:"0"};var La=t=>{let{instantFps:e}=u.store.get(),r=Math.round(t*(e/60));return t===1&&r===0?t:r},Pt=t=>({type:Iv(t?.stagger?.type)?t.stagger.type:Rn.type,each:_v(t?.stagger?.each)?t.stagger.each:Rn.each,from:Sv(t?.stagger?.from)?t?.stagger?.from:Fo,grid:{col:mu(t?.stagger?.grid?.col)?t.stagger.grid.col:Rn.grid.col,row:mu(t?.stagger?.grid?.row)?t.stagger.grid.row:Rn.grid.row,direction:xv(t?.stagger?.grid?.direction)?t.stagger.grid.direction:"col"},waitComplete:Cv(t?.stagger?.waitComplete)?t.stagger.waitComplete:Rn.waitComplete}),ar=(t,e)=>t.length>e.length?t:e;var Vs=t=>t%2,Jw=t=>Math.floor(Math.random()*t),Yw=(t,e,r)=>{let o=new Set(t.slice(0,r).map(i=>i.frame));return t.map((i,a)=>a*e).filter(i=>!o.has(i))},Xw=(t,e,r,o=[])=>{let{from:n,each:s}=r,i=La(s);if(n===kn)return{index:t,frame:o[Jw(o.length)]};if(n===nr)return{index:t,frame:t*i};if(n==="end")return{index:t,frame:(e-1-t)*i};if(n===In){let a=Math.trunc(e/2);return t>a?{index:t,frame:(t-a)*i}:t<a?Vs(e)===0&&a-t===1?{index:t,frame:0}:Vs(e)===0?{index:t,frame:(a-t-1)*i}:{index:t,frame:(a-t)*i}:{index:t,frame:0}}if(n===Mn){let a=Math.trunc(e/2);return t>a?{index:t,frame:(e-a-1-(t-a))*i}:t<a?Vs(e)===0&&a-t===1?{index:t,frame:(a-1)*i}:Vs(e)===0?{index:t,frame:(e-a-(a-t))*i}:{index:t,frame:(e-a-1-(a-t))*i}:Vs(e)?{index:t,frame:a*i}:{index:t,frame:(a-1)*i}}if(n&&Re(Number,n)){let a=n>=e?e-1:n;return t>a?{index:t,frame:(t-a)*s}:t<a?{index:t,frame:(a-t)*s}:{index:t,frame:0}}return{index:0,frame:0}},Uv=(t,e,r)=>{if(e.grid.direction==="row"){let o=$s(t,r);return[...[...Array.from({length:e.grid.col}).keys()].reduce((s,i,a)=>[...s,...nb(o,a)],[])].flat()}else return t},Gv=({arrayDefault:t,arrayOnStop:e,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=r?.grid?.col<=1?t.length:r.grid.col,i=r?.grid?.row<=1?t.length:r.grid.row,c=Uv(t,r,s).map(v=>v&&v!==void 0?v:{index:0,frame:0}),p=Uv(e,r,s).map(v=>v&&v!==void 0?v:{index:0,frame:0}),h=r.grid.direction==="row"?i:s,f=$s(c,h),d=f[0];return d.forEach((v,T)=>{let{index:S,frame:_}=Xw(T,f[0].length,r,Yw(d,r.each,T));v.index=S,v.frame=_,_>=o.frame&&(o={index:S,frame:_}),_<=n.frame&&(n={index:S,frame:_})}),f.forEach(v=>{v.forEach((T,S)=>{T&&(T.index=f[0][S].index,T.frame=f[0][S].frame)})}),f.flat().forEach((v,T)=>{c[T].index=v.index,c[T].frame=v.frame,p.length>0&&(p[T].index=v.index,p[T].frame=v.frame)}),{staggerArray:c,staggerArrayOnComplete:p,fastestStagger:n,slowlestStagger:o}};var Kw=(t,e,r)=>t.reduce((o,n,s)=>{let i=Math.abs(s-r),a=n.reduce((c,l,p)=>p<e-i||p>e+i?c:[...c,l],[]);return[...o,a]},[]),Qw=(t,e,r,o)=>t.reduce((n,s,i)=>{let a=Math.abs(i-r),c=[];if(i>=r&&i<=r*2)return[...n,c];let l=e-a,p=e+a;for(let f=0;f<a;f++)Fa(o,r+f,l)&&c.push(o[r+f][l]),Fa(o,r+f,p)&&c.push(o[r+f][p]),f>0&&(Fa(o,r-f,l)&&c.push(o[r-f][l]),Fa(o,r-f,p)&&c.push(o[r-f][p]));let h=c.filter(f=>f!=null);return[...n,h]},[]),Fa=(t,e,r)=>t[e]!==void 0&&t[e][r]!==void 0,yu=(t,e)=>{let{col:r}=e.grid,{x:o,y:n}=e.from,s=$s(t,r);[...Array.from({length:r}).keys()].forEach(()=>{s.push([])});let i=Kw(s,o,n),a=Qw(i,o,n,s),c=i.reduce((d,y,v)=>{let T=[...i[v],...a[v]];return d.push(T),d},[]),l=c.length;return{cleanArray:((n>=l/2?sb:ou)===ou?c.reduce((d,y,v)=>{if(v<n)return d;if(v===n){let T=[...c[v]];return d.push(T),d}else{let T=c[n-(v-n)]??[],S=[...c[v],...T];return d.push(S),d}},[]):c.reduce((d,y,v)=>{if(v>n)return d;if(v===n){let T=[...c[v]];return d.push(T),d}else{let T=c[n+(n-v)]??[],S=[...c[v],...T];return d.push(S),d}},[]).toReversed()).reduce((d,y)=>y.length===0?d:[...d,y],[])}};var Zw=({arrayDefault:t,arrayOnStop:e,stagger:r,slowlestStagger:o,fastestStagger:n})=>{u.checkType(Object,r?.from)||(r.from={}),u.checkType(Number,r?.from?.x)||(r.from={...r.from,x:0}),u.checkType(Number,r?.from?.y)||(r.from={...r.from,y:0});let{cleanArray:s}=yu(t,r),i=0;s.forEach((p,h)=>{p.forEach(f=>{let d=La(r.each),y=h*d;f.index=i,f.frame=y,y>=o.frame&&(o={index:i,frame:y}),y<=n.frame&&(n={index:i,frame:y}),i++})});let a=(()=>{if(e.length>0){let{cleanArray:p}=yu(e,r);return p.flat()}else return[]})(),c=s.flat(),l=a.flat();return c.forEach((p,h)=>{l.length>0&&(l[h].index=p.index,l[h].frame=p.frame)}),{staggerArray:c,staggerArrayOnComplete:l,fastestStagger:n,slowlestStagger:o}},eI=({arrayDefault:t,arrayOnStop:e,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=[nr,"end",In,Mn,kn];return(!u.checkType(String,r?.from)&&!u.checkType(Number,r?.from)||u.checkType(String,r?.from)&&!s.includes(r?.from))&&(xb(),r.from=nr),Gv({arrayDefault:t,arrayOnStop:e,stagger:r,slowlestStagger:o,fastestStagger:n})},Nt=({arrayDefault:t,arrayOnStop:e,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=r?.grid?.direction===Ca?Zw({arrayDefault:t,arrayOnStop:e,stagger:r,slowlestStagger:o,fastestStagger:n}):eI({arrayDefault:t,arrayOnStop:e,stagger:r,slowlestStagger:o,fastestStagger:n}),i=s.staggerArray,a=s.staggerArrayOnComplete,c=s.fastestStagger,l=s.slowlestStagger;return{staggerArray:i,staggerArrayOnComplete:a,fastestStagger:c,slowlestStagger:l}};var On=({stagger:t,callback:e,callbackCache:r,callBackObject:o,useStagger:n})=>{if(t.each===0||!n){u.useFrame(()=>{e.forEach(({cb:s})=>{s(o)})}),u.useFrame(()=>{r.forEach(({cb:s})=>{u.useCache.fireObject({id:s,obj:o})})});return}e.forEach(({cb:s,frame:i})=>{u.useFrameIndex(()=>{s(o)},i)}),r.forEach(({cb:s,frame:i})=>{u.useCache.update({id:s,callBackObject:o,frame:i})})},$n=({onComplete:t,callback:e,callbackCache:r,callbackOnComplete:o,callBackObject:n,stagger:s,slowlestStagger:i,fastestStagger:a,useStagger:c})=>{if(s.each===0||!c){t(),u.useNextFrame(()=>{e.forEach(({cb:l})=>{l(n)}),r.forEach(({cb:l})=>{u.useCache.fireObject({id:l,obj:n})}),o.forEach(({cb:l})=>{l(n)})});return}e.forEach(({cb:l,frame:p},h)=>{u.useFrameIndex(()=>{if(s.waitComplete){h===i.index&&(l(n),t());return}h===a.index&&(l(n),t())},p)}),r.forEach(({cb:l,frame:p},h)=>{u.useFrameIndex(()=>{if(s.waitComplete){h===i.index&&(u.useCache.fireObject({id:l,obj:n}),t());return}h===a.index&&(u.useCache.fireObject({id:l,obj:n}),t())},p)}),o.forEach(({cb:l,frame:p})=>{u.useFrameIndex(()=>{l(n)},p+1)})};var lt=(t,e)=>{let r=u.getUnivoqueId();return{arrayOfCallbackUpdated:[...e,{cb:t,id:r,index:-1,frame:-1}],unsubscribeCb:o=>o.map(({id:n,cb:s,index:i,frame:a})=>n===r?{id:n,cb:()=>{},index:i,frame:a}:{id:n,cb:s,index:i,frame:a})}},cr=(t,e,r)=>{let o=u.getUnivoqueId(),{id:n,unsubscribe:s}=u.useCache.add(t);return{arrayOfCallbackUpdated:[...e,{cb:n,id:o,index:-1,frame:-1}],unsubscribeCache:[...r,s],unsubscribeCb:i=>(s(),i.map(({id:a,cb:c,index:l,frame:p})=>a===o?{id:a,cb:"",index:l,frame:p}:{id:a,cb:c,index:l,frame:p}))}};var lo=t=>Object.keys(t).map(e=>{if(!jt(t[e]))return kr(`${e}: ${t[e]}`),{prop:e,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let r=u.checkType(Number,t[e])?t[e]:t[e]?.()??0;return{prop:e,toValue:r,toFn:t[e],toIsFn:u.checkType(Function,t[e]),settled:!1}}),Ln=t=>Object.keys(t).map(e=>{if(!jt(t[e]))return kr(`${e}: ${t[e]}`),{prop:e,fromValue:0,currentValue:0,fromFn:()=>0,fromIsFn:!1,settled:!1};let r=u.checkType(Number,t[e])?t[e]:t[e]?.()??0;return{prop:e,fromValue:r,currentValue:r,fromFn:t[e],fromIsFn:u.checkType(Function,t[e]),settled:!1}}),Fn=(t,e)=>Object.keys(t).map(r=>{if(!jt(e[r])||!jt(t[r]))return kr(`${r}: ${e[r]} || ${r}: ${t[r]}`),{prop:r,fromValue:0,fromFn:()=>0,fromIsFn:!1,currentValue:0,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let o=u.checkType(Number,t[r])?t[r]:t[r]?.()??0,n=u.checkType(Number,e[r])?e[r]:e[r]?.()??0;return{prop:r,fromValue:o,fromFn:t[r],fromIsFn:u.checkType(Function,t[r]),currentValue:o,toValue:n,toFn:e[r],toIsFn:u.checkType(Function,e[r]),settled:!1}}),Rr=t=>Object.keys(t).map(e=>{if(!jt(t[e]))return kr(`${e}: ${t[e]}`),{prop:e,fromValue:0,fromFn:()=>0,fromIsFn:!1,currentValue:0,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let r=u.checkType(Number,t[e])?t[e]:t[e]?.()??0;return{prop:e,fromValue:r,fromFn:t[e],fromIsFn:u.checkType(Function,t[e]),currentValue:r,toValue:r,toFn:t[e],toIsFn:u.checkType(Function,t[e]),settled:!1}});var Dn=({validationFunction:t,defaultRafInit:e})=>{u.useFrame(()=>{u.useNextTick(({time:r,fps:o})=>{let n=t.findLast(({validation:s})=>s());if(e(r,o),n){n?.callback(),console.log("custom tween run function extrecuted");return}})})};var uo=(t,e)=>{console.log(`stagger on ${t} loaded at: ${e} fps`)};var Bn=(t,e,r,o)=>(u.checkType(Number,t)||Ea(),t>0&&e&&(r.length>0||o.length>0));var Da=t=>{u.useFrame(()=>{u.useNextTick(({time:e,fps:r})=>{t(e,r)})})};var Fe=(t,e)=>Object.fromEntries(t.map(r=>{let o=r[e];return[r.prop,typeof o=="number"?o:Number.parseFloat(o)]})),Vn=t=>t.map(e=>e.toIsFn?{[e.prop]:e.toFn}:{[e.prop]:Number.parseFloat(e.toValue)}).reduce((e,r)=>({...e,...r}),{}),Wn=t=>t.map(e=>e.fromIsFn?{[e.prop]:e.fromFn}:{[e.prop]:Number.parseFloat(e.fromValue)}).reduce((e,r)=>({...e,...r}),{});var jn=(t,e)=>e.map(r=>{let o=t.find(n=>n.prop===r.prop);return o?{...r,...o}:r}),Tu=(t,e)=>e.map(r=>{let o=t.find(n=>n.prop===r.prop);return o?{...r,...o,shouldUpdate:!0}:{...r,shouldUpdate:!1}});var qv=({values:t,tension:e,friction:r,mass:o,precision:n,fps:s})=>t.map(i=>{let{currentValue:a,toValue:c,velocity:l}=i,p=-e*(a-c),h=-r*l,f=(p+h)/o,d=l+f*1/s,y=a+d*1/s,v=_e(y),T=Math.abs(d)<=.1,S=e===0?!0:Math.abs(c-v)<=n;return T&&S?{...i,currentValue:c,velocity:d,settled:!0}:{...i,currentValue:v,velocity:d,settled:!1}});var Tt=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#y;#v;#T;#k;constructor(e){this.#n=Pt(e??{}),this.#t=ao(e?.relative,"spring"),this.#i=hu(e?.config),this.updateConfigProp(e?.configProps??{}),this.#l=u.getUnivoqueId(),this.#h=!1,this.#u=void 0,this.#s=void 0,this.#c=void 0,this.#o=[],this.#e=[],this.#p=[],this.#a=[],this.#d=[],this.#f=[],this.#r=[],this.#g=!1,this.#m=!0,this.#C=!0,this.#x=!1,this.#y=!1,this.#v={reverse:!1,configProps:this.#i,relative:this.#t,immediate:!1},this.#T=Xe,this.#k=Xe;let r=e?.data;r&&this.setData(r)}#_(e,r,o,n,s,i){this.#h=!0,this.#o=qv({values:this.#o,tension:o,friction:n,mass:s,precision:i,fps:r});let a=Fe(this.#o,"currentValue");if(this.#g||On({stagger:this.#n,callback:this.#p,callbackCache:this.#a,callBackObject:a,useStagger:this.#C}),this.#o.every(l=>l.settled===!0)){let l=()=>{for(let h of this.#o)h.fromValue=h.toValue;this.#u?.(!0),this.#c=void 0,this.#s=void 0,this.#u=void 0,this.#g=!1,this.#h=!1},p=Fe(this.#o,"toValue");$n({onComplete:l,callback:this.#p,callbackCache:this.#a,callbackOnComplete:this.#d,callBackObject:p,stagger:this.#n,slowlestStagger:this.#T,fastestStagger:this.#k,useStagger:this.#C});return}u.useFrame(()=>{u.useNextTick(({time:l,fps:p})=>{this.#h&&this.#_(l,p,o,n,s,i)})})}#w(e,r){for(let a of this.#o)a.velocity=Math.trunc(this.#i.velocity);let o=this.#i.tension,n=this.#i.friction,s=Math.max(1,this.#i.mass),i=this.#i.precision;this.#_(e,r,o,n,s,i)}async#N(){if(Bn(this.#n.each,this.#m,this.#a,this.#p)){let{averageFPS:e}=await u.useFps();uo("spring",e);let r=ar(this.#a,this.#p);if(this.#n.grid.col>r.length){kt(r.length),this.#m=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=Nt({arrayDefault:r,arrayOnStop:this.#d,stagger:this.#n,slowlestStagger:this.#T,fastestStagger:this.#k});this.#a.length>this.#p.length?this.#a=o:this.#p=o,this.#d=n,this.#T=i,this.#k=s,this.#m=!1}return{ready:!0}}async#R(e,r){this.#y||(this.#u=e,this.#s=r,this.#m&&(this.#y=!0,await this.#N(),this.#y=!1),Dn({validationFunction:this.#f,defaultRafInit:(o,n)=>this.#w(o,n)}))}clearCurretPromise(){this.#g||(this.#s?.(u.ANIMATION_STOP_REJECT),this.#c=void 0,this.#s=void 0,this.#u=void 0,this.#h=!1)}stop({clearCache:e=!0,updateValues:r=!0}={}){this.#g&&(this.#g=!1),r&&(this.#o=En(this.#o)),this.unFreezeStagger(),e&&this.#a.forEach(({cb:o})=>u.useCache.clean(o)),this.#s&&(this.#s(u.ANIMATION_STOP_REJECT),this.#c=void 0,this.#s=void 0,this.#u=void 0),this.#h=!1}freezeStagger(){this.#x||(this.#a.forEach(({cb:e})=>u.useCache.freeze(e)),this.#x=!0)}unFreezeStagger({updateFrame:e=!0}={}){this.#x&&(this.#a.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:e})),this.#x=!1)}pause(){this.#g||(this.#g=!0,this.#h=!1,this.#o=xa(this.#o),this.freezeStagger())}resume(){this.#g&&(this.#g=!1,this.unFreezeStagger(),!this.#h&&this.#u&&Da((e,r)=>this.#w(e,r)))}setData(e){this.#o=Object.entries(e).map(r=>{let[o,n]=r;return{prop:o,toValue:n,fromValue:n,velocity:this.#i.velocity,currentValue:n,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#e=this.#o.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#o=at(this.#o,this.#e)}#O(e){let o=he.get("spring").config,n=Mv(e?.config)?o?.[e?.config??"default"]??$o.default:this.#v.configProps,s=du(e?.configProps),i={...n,...s},a={reverse:e?.reverse??this.#v.reverse,relative:e?.relative??this.#v.relative,immediate:e?.immediate??this.#v.immediate,configProps:i},{relative:c}=a;return this.#i=i,this.#t=c,a}goTo(e,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#C=!0;let o=lo(e);return this.#E(o,e,r)}goFrom(e,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#C=!0;let o=Ln(e);return this.#E(o,e,r)}goFromTo(e,r,o={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);if(this.#C=!0,!no(e,r))return so("spring goFromTo:",e,r),new Promise(s=>s);let n=Fn(e,r);return this.#E(n,e,o)}set(e,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#C=!1;let o=Rr(e);return this.#E(o,e,r)}setImmediate(e,r={}){if(this.#h&&this.stop({clearCache:!1,updateValues:!1}),this.#g)return;this.#C=!1;let o=Rr(e);this.#o=jn(o,this.#o);let{reverse:n}=this.#O(r??{});Rt(n,"reverse")&&(this.#o=Ir(e,this.#o)),this.#o=wn(this.#o,this.#t),this.#o=wr(this.#o)}#E(e,r,o={}){this.#o=jn(e,this.#o);let{reverse:n,immediate:s}=this.#O(o);if(Rt(n,"reverse")&&(this.#o=Ir(r,this.#o)),this.#o=wn(this.#o,this.#t),Rt(s,"immediate "))return this.#h&&this.stop({updateValues:!1}),this.#o=wr(this.#o),Promise.resolve();let i=!this.#h&&!this.#c;return i&&(this.#c=new Promise((a,c)=>{this.#R(a,c)})),i&&this.#c?this.#c:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return Fe(this.#o,"currentValue")}getInitialData(){return Fe(this.#e,"currentValue")}getFrom(){return Fe(this.#o,"fromValue")}getTo(){return Fe(this.#o,"toValue")}getFromNativeType(){return Wn(this.#o)}getToNativeType(){return Vn(this.#o)}getType(){return"SPRING"}getId(){return this.#l}isActive(){return this.#h}updateConfigProp(e={}){let r=du(e);this.#i={...this.#i,...r},this.#v=at(this.#v,{configProps:r})}updateConfig(e){this.#i=hu(e),this.#v=at(this.#v,{configProps:this.#i})}subscribe(e){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=lt(e,this.#p);return this.#p=r,()=>this.#p=o(this.#p)}subscribeCache(e){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=cr(e,this.#a,this.#r);return this.#a=r,this.#r=n,()=>this.#a=o(this.#a)}validateInitialization({validation:e,callback:r}){let o=[...this.#f,{validation:e,callback:r}];return this.#f=o,()=>this.#f=[]}onComplete(e){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=lt(e,this.#d);return this.#d=r,()=>this.#d=o(this.#d)}destroy(){this.#c&&this.stop(),this.#d=[],this.#f=[],this.#p=[],this.#a=[],this.#o=[],this.#c=void 0,this.#r.forEach(e=>e()),this.#r=[]}};var _u=0,Su=0,Ba=0,Va=!1,Wa=!1,Jv=()=>{},xu=()=>{},Cu=()=>{},Eu=()=>{},lr,Ws=new Map,tI=({clientX:t,clientY:e})=>{if(!lr)return;let r=t-_u,o=e-Su,n=u.getTime(),s=n-Ba;if(Va||s===0){_u=t,Su=e,Ba=n,lr.goTo({speed:1,speedX:1,speedY:1});return}let i=r/s,a=o/s,c=Math.hypot(i,a);lr.goTo({speed:Math.max(1,Math.round((c+1)*1e4)/1e4),speedX:Math.max(1,Math.round((i+1)*1e4)/1e4),speedY:Math.max(1,Math.round((a+1)*1e4)/1e4)}),_u=t,Su=e,Ba=n},Yv=()=>{xu=u.usePointerMove(()=>{xu(),Ba=u.getTime(),Va=!0})},Xv=()=>{Eu=u.usePointerMove(t=>{tI(t),Va&&(Va=!1)})},Kv=()=>{Jv=u.useDebounce(()=>{lr&&(lr.goTo({speed:1,speedX:1,speedY:1}),Eu(),Cu(),Yv(),Xv(),Kv())}),Cu=u.usePointerMove(Jv)},rI=()=>{Wa||(Wa=!0,Yv(),Xv(),Kv(),lr=new Tt({data:{speed:1,speedX:1,speedY:1}}),lr.subscribe(({speed:t,speedX:e,speedY:r})=>{for(let o of Ws.values())o({speed:t,speedX:e,speedY:r})}),lr.onComplete(({speed:t,speedX:e,speedY:r})=>{for(let o of Ws.values())o({speed:t,speedX:e,speedY:r})}))},oI=t=>{if(globalThis.window===void 0)return()=>{};let e=we();return Ws.set(e,t),rI(),()=>{Ws.delete(e),Ws.size===0&&Wa&&(xu(),Cu(),Eu(),lr.destroy(),lr=null,Wa=!1)}},Qv=oI;function nI(t){he.set(t)}function sI(t){return he.get(t)}function iI(){he.print()}function aI(t=()=>{}){return Qv(t)}function cI(t,e){switch(t){case"min":return ve.min(e);case"max":return ve.max(e);case"get":return ve.getBreackpoint(e)}}var H={};_o(H,{createLerp:()=>bI,createMasterSequencer:()=>hI,createScrollerTween:()=>pI,createSequencer:()=>mI,createSpring:()=>gI,createStaggers:()=>dI,createTimeTween:()=>fI});var Zv=({values:t,fps:e,velocity:r,precision:o})=>t.map(n=>{if(n.settled)return n;let{currentValue:s,toValue:i}=n,a=ob(s,i,r/e*60),c=_e(a);return Math.round(Math.abs(i-c)*1e4)/1e4<=o?{...n,currentValue:i,settled:!0}:{...n,currentValue:c,settled:!1}});var Pr=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#y;#v;#T;#k;#_;constructor(e){this.#n=Pt(e??{}),this.#t=ao(e?.relative,"lerp"),this.#i=Aa(e?.velocity),this.#l=Oa(e?.precision),this.#h=u.getUnivoqueId(),this.#u=!1,this.#s=void 0,this.#c=void 0,this.#o=void 0,this.#e=[],this.#p=[],this.#a=[],this.#d=[],this.#f=[],this.#r=[],this.#g=[],this.#m=!1,this.#C=!0,this.#x=!0,this.#y=!1,this.#v=!1,this.#T={reverse:!1,velocity:this.#i,precision:this.#l,relative:this.#t,immediate:!1},this.#k=Xe,this.#_=Xe;let r=e?.data;r&&this.setData(r)}#w(e,r){this.#u=!0,this.#e=Zv({values:this.#e,fps:r,velocity:this.#i,precision:this.#l});let o=Fe(this.#e,"currentValue");if(this.#m||On({stagger:this.#n,callback:this.#a,callbackCache:this.#d,callBackObject:o,useStagger:this.#x}),this.#e.every(s=>s.settled===!0)){let s=()=>{this.#u=!1;for(let a of this.#e)a.fromValue=a.toValue;this.#s?.(!0),this.#o=void 0,this.#c=void 0,this.#s=void 0,this.#m=!1,this.#u=!1},i=Fe(this.#e,"toValue");$n({onComplete:s,callback:this.#a,callbackCache:this.#d,callbackOnComplete:this.#f,callBackObject:i,stagger:this.#n,slowlestStagger:this.#k,fastestStagger:this.#_,useStagger:this.#x});return}u.useFrame(()=>{u.useNextTick(({time:s,fps:i})=>{this.#u&&this.#w(s,i)})})}#N(e,r){this.#w(e,r)}async#R(){if(Bn(this.#n.each,this.#C,this.#d,this.#a)){let{averageFPS:e}=await u.useFps();uo("lerp",e);let r=ar(this.#d,this.#a);if(this.#n.grid.col>r.length){kt(r.length),this.#C=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=Nt({arrayDefault:r,arrayOnStop:this.#f,stagger:this.#n,slowlestStagger:this.#k,fastestStagger:this.#_});this.#d.length>this.#a.length?this.#d=o:this.#a=o,this.#f=n,this.#k=i,this.#_=s,this.#C=!1}return{ready:!0}}async#O(e,r){this.#v||(this.#s=e,this.#c=r,this.#C&&(this.#v=!0,await this.#R(),this.#v=!1),Dn({validationFunction:this.#r,defaultRafInit:(o,n)=>this.#N(o,n)}))}clearCurretPromise(){this.#m||(this.#c?.(u.ANIMATION_STOP_REJECT),this.#o=void 0,this.#c=void 0,this.#s=void 0,this.#u=!1)}stop({clearCache:e=!0,updateValues:r=!0}={}){this.#m&&(this.#m=!1),r&&(this.#e=En(this.#e)),this.unFreezeStagger(),e&&this.#d.forEach(({cb:o})=>u.useCache.clean(o)),this.#c&&(this.#c(u.ANIMATION_STOP_REJECT),this.#o=void 0,this.#c=void 0,this.#s=void 0),this.#u=!1}freezeStagger(){this.#y||(this.#d.forEach(({cb:e})=>u.useCache.freeze(e)),this.#y=!0)}unFreezeStagger({updateFrame:e=!0}={}){this.#y&&(this.#d.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:e})),this.#y=!1)}pause(){this.#m||(this.#m=!0,this.#u=!1,this.#e=xa(this.#e),this.freezeStagger())}resume(){this.#m&&(this.#m=!1,this.unFreezeStagger(),!this.#u&&this.#s&&Da((e,r)=>this.#N(e,r)))}setData(e){this.#e=Object.entries(e).map(r=>{let[o,n]=r;return{prop:o,toValue:n,fromValue:n,currentValue:n,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#p=this.#e.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#e=at(this.#e,this.#p)}#E(e){let r={...this.#T,...e},{velocity:o,precision:n,relative:s}=r;return this.#t=ao(s,"lerp"),this.#i=Aa(o),this.#l=Oa(n),r}goTo(e,r={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!0;let o=lo(e);return this.#A(o,e,r)}goFrom(e,r={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!0;let o=Ln(e);return this.#A(o,e,r)}goFromTo(e,r,o={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);if(this.#x=!0,!no(e,r))return so("lerp goFromTo:",e,r),new Promise(s=>s);let n=Fn(e,r);return this.#A(n,e,o)}set(e,r={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!1;let o=Rr(e);return this.#A(o,e,r)}setImmediate(e,r={}){if(this.#u&&this.stop({clearCache:!1,updateValues:!1}),this.#m)return;this.#x=!1;let o=Rr(e);this.#e=jn(o,this.#e);let{reverse:n}=this.#E(r??{});Rt(n,"reverse")&&(this.#e=Ir(e,this.#e)),this.#e=wn(this.#e,this.#t),this.#e=wr(this.#e)}#A(e,r,o={}){this.#e=jn(e,this.#e);let{reverse:n,immediate:s}=this.#E(o??{});if(Rt(n,"reverse")&&(this.#e=Ir(r,this.#e)),this.#e=wn(this.#e,this.#t),Rt(s,"immediate "))return this.#u&&this.stop({updateValues:!1}),this.#e=wr(this.#e),Promise.resolve();let i=!this.#u&&!this.#o;return i&&(this.#o=new Promise((a,c)=>{this.#O(a,c)})),i&&this.#o?this.#o:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return Fe(this.#e,"currentValue")}getInitialData(){return Fe(this.#p,"currentValue")}getFrom(){return Fe(this.#e,"fromValue")}getTo(){return Fe(this.#e,"toValue")}getFromNativeType(){return Wn(this.#e)}getToNativeType(){return Vn(this.#e)}getType(){return"LERP"}getId(){return this.#h}isActive(){return this.#u}updateVelocity(e){this.#i=Aa(e),this.#T=at(this.#T,{velocity:this.#i})}updatePrecision(e){this.#i=Oa(e),this.#T=at(this.#T,{precision:this.#l})}subscribe(e){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=lt(e,this.#a);return this.#a=r,()=>this.#a=o(this.#a)}subscribeCache(e){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=cr(e,this.#d,this.#g);return this.#d=r,this.#g=n,()=>this.#d=o(this.#d)}validateInitialization({validation:e,callback:r}){let o=[...this.#r,{validation:e,callback:r}];return this.#r=o,()=>this.#r=[]}onComplete(e){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=lt(e,this.#f);return this.#f=r,()=>this.#f=o(this.#f)}destroy(){this.#o&&this.stop(),this.#f=[],this.#r=[],this.#a=[],this.#d=[],this.#e=[],this.#o=void 0,this.#g.forEach(e=>e()),this.#g=[]}};var ja=({each:t,useStagger:e,isLastDraw:r,callBackObject:o,callback:n,callbackCache:s,callbackOnStop:i})=>{t===0||e===!1?(u.useFrame(()=>{n.forEach(({cb:a})=>a(o))}),u.useFrame(()=>{s.forEach(({cb:a})=>{u.useCache.fireObject({id:a,obj:o})})})):(n.forEach(({cb:a,frame:c})=>{u.useFrameIndex(()=>a(o),c)}),s.forEach(({cb:a,frame:c})=>{u.useCache.update({id:a,callBackObject:o,frame:c})})),r&&(t===0||e===!1?u.useFrame(()=>{i.forEach(({cb:a})=>a(o))}):i.forEach(({cb:a,frame:c})=>{u.useFrameIndex(()=>a(o),c+1)}))};var js=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;constructor(e){this.#n=yv(e?.ease),this.#t=io(e?.duration),this.#i=Pt(e),this.#l=[],this.#h=[],this.#u=[],this.#s=[],this.#c=[],this.#o="parallaxTween";let r=e?.from||null;r&&this.setData(r),e?.to&&this.goTo(e.to)}inzializeStagger(){if(this.#i.each>0&&(this.#s.length>0||this.#u.length>0)){let e=ar(this.#s,this.#u);if(this.#i.grid.col>e.length){kt(e.length);return}let{staggerArray:r,staggerArrayOnComplete:o}=Nt({arrayDefault:e,arrayOnStop:this.#h,stagger:this.#i,slowlestStagger:Xe,fastestStagger:Xe});this.#s.length>this.#u.length?this.#s=r:this.#u=r,this.#h=o}}draw({partial:e,isLastDraw:r}){for(let n of this.#l){let{toIsFn:s,toFn:i,toValue:a,fromIsFn:c,fromFn:l,fromValue:p}=n,h=s?i():a,f=c?l():p,d=h-f,y=this.#n(e,f,d,this.#t);n.currentValue=_e(y)}let o=Fe(this.#l,"currentValue");u.useNextTick(()=>{ja({each:this.#i.each,useStagger:!0,isLastDraw:r,callBackObject:o,callback:this.#u,callbackCache:this.#s,callbackOnStop:this.#h})})}setData(e){let r=Object.entries(e);return this.#l=r.map(o=>{let[n,s]=o;return{prop:n,toValue:s,toValProcessed:s,fromValue:s,currentValue:s,settled:!1,fromFn:()=>0,toFn:()=>0}}),this}#e(e){this.#l=this.#l.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o}:{...r}})}goTo(e){let r=lo(e);return this.#e(r),this}subscribe(e){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=lt(e,this.#u);return this.#u=r,()=>this.#u=o(this.#u)}onStop(e){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=lt(e,this.#h);return this.#h=r,()=>this.#h=o(this.#h)}subscribeCache(e){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=cr(e,this.#s,this.#c);return this.#s=r,this.#c=n,()=>this.#s=o(this.#s)}getDuration(){return this.#t}getType(){return this.#o}destroy(){this.#l=[],this.#h=[],this.#u=[],this.#s=[],this.#c.forEach(e=>e()),this.#c=[]}};var zs=class{#n="sequencer";#t;constructor(){this.#t=[]}draw({partial:e,isLastDraw:r,useFrame:o}){this.#t.forEach(n=>{n.draw({partial:e,isLastDraw:r,useFrame:o})})}add(e){this.#t.push(e)}inzializeStagger(){this.#t.forEach(e=>{e.inzializeStagger()})}setDuration(e){this.#t.forEach(r=>{r.setDuration(e)})}getDuration(){return this.#t.length>0?this.#t[0].getDuration():0}setStretchFactor(e){this.#t.forEach(r=>{r.setStretchFactor(e)})}getLabels(){return this.#t.flatMap(e=>e.getLabels())}resetLastValue(){this.#t.forEach(e=>e.resetLastValue())}disableStagger(){this.#t.forEach(e=>{e.disableStagger()})}cleanCachedId(){this.#t.forEach(e=>{e.cleanCachedId()})}freezeCachedId(){this.#t.forEach(e=>{e.freezeCachedId()})}unFreezeCachedId(){this.#t.forEach(e=>{e.unFreezeCachedId()})}getType(){return this.#n}destroy(){this.#t.forEach(e=>{e.destroy()}),this.#t=[]}};var ey=(t,e)=>Object.keys(t).map(r=>jt(t[r])?{prop:r,toValue:t[r],ease:mt(e)}:(kr(`${r}: ${t[r]}`),{prop:r,toValue:0,ease:mt(e)})),ty=(t,e)=>Object.keys(t).map(r=>jt(t[r])?{prop:r,fromValue:t[r],ease:mt(e)}:(kr(`${r}: ${t[r]}`),{prop:r,fromValue:0,ease:mt(e)})),ry=(t,e,r)=>Object.keys(t).map(o=>!jt(e[o])||!jt(t[o])?(kr(`${o}: ${e[o]} || ${o}: ${t[o]}`),{prop:o,fromValue:0,toValue:0,ease:mt(r)}):{prop:o,fromValue:t[o],toValue:e[o],ease:mt(r)});var We={BACKWARD:"backward",FORWARD:"forward",NONE:"none"};var wu={fromValue:{get:"toValue",set:"fromValue"},toValue:{get:"toValue",set:"toValue"}},oy=(t,e,r,o)=>t.slice(0,e).reduceRight((n,{values:s})=>{let i=s.find(({prop:a,active:c})=>c&&a===r);return i&&!n&&n!==0?i[wu[o].get]:n},void 0),ny=(t,e,r,o)=>{for(let n=e+1;n<t.length;n++){let{start:s,values:i}=t[n];for(let a of i)if(a.prop===r&&a.active&&s<=o)return!1}return!0};var sy=({timeline:t,valuesState:e,partial:r})=>{for(let o of e){o.settled=!1;let n=null;for(let T=0;T<t.length;T++){let{start:S,end:_,values:E}=t[T],x=null;for(let N of E)if(N.prop===o.prop){x=N;break}if(!x||!x.active)continue;let{prop:w}=x;if(ny(t,T,w,r)){n={toValue:x.toValue,fromValue:x.fromValue,start:S,end:_,ease:x.ease};break}}if(!n)continue;let{start:s,end:i,toValue:a,fromValue:c,ease:l}=n,p=u.checkType(Number,a)?a:a(),h=u.checkType(Number,c)?c:c(),f=i-s,d=r<i?h:p,y;r>=s&&r<=i?y=l(r-s,h,p-h,f):y=d;let v=Number.isNaN(y)?d:y;o.currentValue=_e(v),o.settled=!0}return e};var Iu=({timeline:t,activeProp:e})=>t.map((r,o)=>{let{values:n,propToFind:s}=r,i=n.map(a=>{let{prop:c,active:l}=a;if(!l||!e.includes(c)||!s||s.length===0)return a;let p=oy(t,o,c,s);return!p&&p!==0?a:{...a,[wu[s].set]:p}});return{...r,values:i}});var Mu=(t,e)=>t.toSorted((r,o)=>r?.[e]-o?.[e]);var za=({timeline:t,values:e,start:r,end:o,duration:n,propToFind:s})=>{let i=t.length===0?0:1,a=[...t,{values:e,start:r??0,end:o??n,priority:i,propToFind:s}],c=Mu(a,"start");return Mu(c,"priority")};var Ha=({data:t,values:e})=>e.map(r=>{let o=t.find(n=>n.prop===r.prop);return o?{...r,...o,active:!0}:{prop:r.prop,active:!1}});var Hs=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;constructor(e){this.#n=[],this.#t=[],this.#i=[],this.#l=[],this.#h=[],this.#u=[],this.#s=[],this.#c=[],this.#o=io(e?.duration),this.#e="sequencer",this.#p={start:0,end:this.#o,ease:vv(e?.ease)},this.#a=!0,this.#d=!0,this.#f="none",this.#r=0,this.#g=Pt(e),this.#m=!0,this.#C=!1;let r=e?.data||null;r&&this.setData(r)}inzializeStagger(){if(!this.#C){if(this.#g.each>0&&(this.#h.length>0||this.#l.length>0)){let e=ar(this.#h,this.#l);if(this.#g.grid.col>e.length){kt(e.length);return}let{staggerArray:r,staggerArrayOnComplete:o}=Nt({arrayDefault:e,arrayOnStop:this.#u,stagger:this.#g,slowlestStagger:Xe,fastestStagger:Xe});this.#h.length>this.#l.length?this.#h=r:this.#l=r,this.#u=o}this.#C=!0}}draw({partial:e=0,isLastDraw:r=!1,useFrame:o=!1,direction:n=We.NONE}){if(o){this.#x({partial:e,isLastDraw:r,direction:n});return}u.useNextTick(()=>this.#x({partial:e,isLastDraw:r,direction:n}))}#x({partial:e=0,isLastDraw:r=!1,direction:o=We.NONE}){this.#a&&(this.#r=e,this.#y(e)),!this.#a&&this.#r&&(!o||o===We.NONE)&&(this.#f=e>=this.#r?We.FORWARD:We.BACKWARD),!this.#a&&(o===We.BACKWARD||o===We.FORWARD)&&(this.#f=o),this.#n=sy({timeline:this.#t,valuesState:this.#n,partial:e});let n=Fe(this.#n,"currentValue");ja({each:this.#g.each,useStagger:this.#m,isLastDraw:r,callBackObject:n,callback:this.#l,callbackCache:this.#h,callbackOnStop:this.#u}),this.#v(e),this.#m=!0,this.#r=e,this.#a=!1}resetLastValue(){this.#a=!0,this.#r=0}#y(e=0){this.#d&&(this.#s.forEach(({fn:r,time:o})=>{let n={shouldFire:e>=o,direction:We.FORWARD},s={shouldFire:e<=o,direction:We.BACKWARD};if(!(n.shouldFire||s.shouldFire))return;let a=n.shouldFire?n.direction:s.direction;r({direction:a,value:e,isForced:!0})}),this.#d=!1)}#v(e=0){this.#s.forEach(({fn:r,time:o})=>{let n=this.#f===We.FORWARD&&e>o&&this.#r<=o,s=this.#f===We.BACKWARD&&e<o&&this.#r>=o;(n||s)&&r({direction:this.#f,value:e,isForced:!1})})}setStretchFactor(e=0){let r=e/this.#o;this.#t=[...this.#t].map(o=>{let{start:n,end:s}=o;return{...o,start:_e(n*r),end:_e(s*r)}}),this.#i=[...this.#i].map(o=>{let{time:n}=o;return{...o,time:_e(n*r)}}),this.#s=[...this.#s].map(o=>{let{time:n}=o;return{...o,time:_e(n*r)}})}setData(e={}){return this.#n=Object.entries(e).map(r=>{let[o,n]=r,s=Tv(o,n),i=s?n:0;return{prop:s?o:"invalidProp",toValue:i,fromValue:i,currentValue:i,active:!1,settled:!1,ease:mt(he.get("sequencer").ease)}}),this.goTo(e,{start:0,end:0}),this}goTo(e,r){let o={...this.#p,...r},{start:n,end:s,ease:i}=o;if(!Ma({start:n,end:s}))return this;let a=ey(e,i),c=Ha({data:a,values:this.#n}),l=Object.keys(e),p=za({timeline:this.#t,values:c,start:n,end:s,duration:this.#o,propToFind:"fromValue"});return this.#t=Iu({timeline:p,activeProp:l}),this}goFrom(e,r){let o={...this.#p,...r},{start:n,end:s,ease:i}=o;if(!Ma({start:n,end:s}))return this;let a=ty(e,i),c=Ha({data:a,values:this.#n}),l=Object.keys(e),p=za({timeline:this.#t,values:c,start:n,end:s,duration:this.#o,propToFind:"toValue"});return this.#t=Iu({timeline:p,activeProp:l}),this}goFromTo(e,r,o){let n={...this.#p,...o},{start:s,end:i,ease:a}=n;if(!Ma({start:s,end:i}))return this;if(!no(e,r))return so("sequencer goFromTo:",e,r),this;let c=ry(e,r,a),l=Ha({data:c,values:this.#n});return this.#t=za({timeline:this.#t,values:l,start:s,end:i,duration:this.#o,propToFind:""}),this}label(e="",r=0){return this.#i.push({name:e,time:r}),this}getLabels(){return this.#i}add(e=()=>{},r=0){let o=u.checkType(Function,e),n=u.checkType(Number,r),s=o&&n;return o||gb(e),n||bb(r),s?(this.#s.push({fn:e,time:r}),this):this}subscribe(e=()=>{}){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=lt(e,this.#l);return this.#l=r,()=>this.#l=o(this.#l)}onStop(e){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=lt(e,this.#u);return this.#u=r,()=>this.#u=o(this.#u)}subscribeCache(e=()=>{}){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=cr(e,this.#h,this.#c);return this.#h=r,this.#c=n,()=>this.#h=o(this.#h)}getDuration(){return this.#o}setDuration(e=0){this.#o=e}getType(){return this.#e}cleanCachedId(){this.#h.forEach(({cb:e})=>u.useCache.clean(e))}freezeCachedId(){this.#h.forEach(({cb:e})=>u.useCache.freeze(e))}unFreezeCachedId(){this.#h.forEach(({cb:e})=>u.useCache.unFreeze({id:e,update:!0}))}disableStagger(){this.#m=!1}destroy(){this.#n=[],this.#t=[],this.#l=[],this.#h=[],this.#u=[],this.#s=[],this.#c.forEach(e=>e()),this.#c=[]}};var iy=({values:t,timeElapsed:e,duration:r,ease:o})=>t.map(n=>{if(n.shouldUpdate){let s=o(e,n.fromValue,n.toValProcessed,r);return{...n,currentValue:_e(s)}}return{...n,currentValue:n.fromValue}});var Nr=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#y;#v;#T;#k;#_;#w;#N;#R;constructor(e){this.#n=Ra(e?.ease),this.#t=fu(e?.duration),this.#i=ao(e?.relative,"tween"),this.#l=Pt(e??{}),this.#h=u.getUnivoqueId(),this.#u=!1,this.#s=void 0,this.#c=void 0,this.#o=void 0,this.#e=[],this.#p=[],this.#a=[],this.#d=[],this.#f=[],this.#r=[],this.#g=[],this.#m=!1,this.#C=0,this.#x=0,this.#y=0,this.#v=!0,this.#T=!0,this.#k=!1,this.#_=!1,this.#w={duration:this.#t,ease:Pa(e?.ease),relative:this.#i,reverse:!1,immediate:!1},this.#N=Xe,this.#R=Xe;let r=e?.data;r&&this.setData(r)}#O(e){this.#u=!0,this.#m&&(this.#y=e-this.#C-this.#x),this.#x=e-this.#C-this.#y,Math.round(this.#x)>=this.#t&&(this.#x=this.#t),this.#e=iy({values:this.#e,timeElapsed:this.#x,duration:this.#t,ease:this.#n});let r=Math.round(this.#x)===this.#t,o=Fe(this.#e,"currentValue");if(this.#m||On({stagger:this.#l,callback:this.#a,callbackCache:this.#d,callBackObject:o,useStagger:this.#T}),r){$n({onComplete:()=>{for(let s of this.#e)s.shouldUpdate&&(s.toValue=s.currentValue,s.fromValue=s.currentValue);this.#s?.(!0),this.#o=void 0,this.#c=void 0,this.#s=void 0,this.#y=0,this.#m=!1,this.#u=!1},callback:this.#a,callbackCache:this.#d,callbackOnComplete:this.#f,callBackObject:o,stagger:this.#l,slowlestStagger:this.#N,fastestStagger:this.#R,useStagger:this.#T});return}u.useFrame(()=>{u.useNextTick(({time:n})=>{this.#u&&this.#O(n)})})}#E(e){this.#C=e,this.#O(e)}async#A(){if(Bn(this.#l.each,this.#v,this.#d,this.#a)){let{averageFPS:e}=await u.useFps();uo("tween",e);let r=ar(this.#d,this.#a);if(this.#l.grid.col>r.length){kt(r.length),this.#v=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=Nt({arrayDefault:r,arrayOnStop:this.#f,stagger:this.#l,slowlestStagger:this.#N,fastestStagger:this.#R});this.#d.length>this.#a.length?this.#d=o:this.#a=o,this.#f=n,this.#N=i,this.#R=s,this.#v=!1}return{ready:!0}}async#P(e,r){this.#_||(this.#s=e,this.#c=r,this.#v&&(this.#_=!0,await this.#A(),this.#_=!1),Dn({validationFunction:this.#r,defaultRafInit:o=>this.#E(o)}))}clearCurretPromise(){this.#m||(this.#c?.(u.ANIMATION_STOP_REJECT),this.#o=void 0,this.#c=void 0,this.#s=void 0,this.#u=!1)}stop({clearCache:e=!0,updateValues:r=!0}={}){this.#y=0,this.#m=!1,r&&(this.#e=En(this.#e)),this.unFreezeStagger(),e&&this.#d.forEach(({cb:o})=>u.useCache.clean(o)),this.#c&&(this.#c(u.ANIMATION_STOP_REJECT),this.#o=void 0,this.#c=void 0,this.#s=void 0),this.#u=!1}freezeStagger(){this.#k||(this.#d.forEach(({cb:e})=>u.useCache.freeze(e)),this.#k=!0)}unFreezeStagger({updateFrame:e=!0}={}){this.#k&&(this.#d.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:e})),this.#k=!1)}pause(){this.#m||(this.#m=!0,this.freezeStagger())}resume(){this.#m&&(this.#m=!1,this.unFreezeStagger())}setData(e){this.#e=Object.entries(e).map(r=>{let[o,n]=r;return{prop:o,toValue:n,toValueOnPause:n,toValProcessed:n,fromValue:n,currentValue:n,shouldUpdate:!1,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#p=this.#e.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,shouldUpdate:!1,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#e=at(this.#e,this.#p)}#b(){for(let e of this.#e)e.shouldUpdate&&(e.fromValue=e.currentValue)}#D(e){let r={...this.#w,...e},{ease:o,duration:n,relative:s}=r;return this.#n=Ra(o),this.#i=ao(s,"tween"),this.#t=fu(n),r}goTo(e,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!0;let o=lo(e);return this.#L(o,e,r)}goFrom(e,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!0;let o=Ln(e);return this.#L(o,e,r)}goFromTo(e,r,o={}){if(this.stop({clearCache:!1,updateValues:!0}),this.#T=!0,!no(e,r))return so("tween goFromTo:",e,r),new Promise(s=>s);let n=Fn(e,r);return this.#L(n,e,o)}set(e,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!1;let o=Rr(e),n=r?{...r,duration:1}:{duration:1};return this.#L(o,e,n)}setImmediate(e,r={}){if(this.stop({clearCache:!1,updateValues:!1}),this.#m)return;this.#T=!1;let o=Rr(e),n=r?{...r,duration:1}:{duration:1};this.#e=Tu(o,this.#e);let{reverse:s}=this.#D(n);Rt(s,"reverse")&&(this.#e=Ir(e,this.#e)),this.#e=ru(this.#e,this.#i),this.#e=wr(this.#e)}#L(e,r,o={}){this.#e=Tu(e,this.#e);let{reverse:n,immediate:s}=this.#D(o);if(Rt(n,"reverse")&&(this.#e=Ir(r,this.#e)),this.#e=ru(this.#e,this.#i),Rt(s,"immediate "))return this.#u&&(this.stop({clearCache:!1,updateValues:!1}),this.#b()),this.#e=wr(this.#e),Promise.resolve();let i=!this.#u&&!this.#o;return i&&(this.#o=new Promise((a,c)=>{this.#P(a,c)})),i&&this.#o?this.#o:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return Fe(this.#e,"currentValue")}getInitialData(){return Fe(this.#p,"currentValue")}getFrom(){return Fe(this.#e,"fromValue")}getTo(){return Fe(this.#e,"toValue")}getFromNativeType(){return Wn(this.#e)}getToNativeType(){return Vn(this.#e)}getType(){return"TWEEN"}getId(){return this.#h}isActive(){return this.#u}updateEase(e){this.#n=Ra(e),this.#w=at(this.#w,{ease:e})}subscribe(e){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=lt(e,this.#a);return this.#a=r,()=>this.#a=o(this.#a)}subscribeCache(e){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=cr(e,this.#d,this.#g);return this.#d=r,this.#g=n,()=>this.#d=o(this.#d)}validateInitialization({validation:e,callback:r}){let o=[...this.#r,{validation:e,callback:r}];return this.#r=o,()=>this.#r=[]}onComplete(e){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=lt(e,this.#f);return this.#f=r,()=>this.#f=o(this.#f)}destroy(){this.#o&&this.stop(),this.#f=[],this.#r=[],this.#a=[],this.#d=[],this.#e=[],this.#o=void 0,this.#g.forEach(e=>e()),this.#g=[]}};var lI=({each:t,duration:e,numItem:r,index:o,eachByNumItem:n})=>{if(t===1){let h=e/r,f=_e(o*h),d=_e(f+h);return{start:f,end:d}}let i=e/r*n,a=e-i,c=r-1>0?r-1:1,p=a/c*o;return{start:_e(p),end:_e(i+p)}},uI=({duration:t,numItem:e,index:r,eachByNumItem:o,type:n})=>{let i=t/e*r,c=(t-(t-i))/e*o;if(n===Fo)return{start:0,end:_e(t-(i-c))};if(n===Do){let l=(i-c)/2;return{start:_e(l),end:_e(t-l)}}return n==="end"?{start:_e(i-c),end:_e(t)}:{start:0,end:t}},ay=t=>{let e=wv(t?.items),r=Pt(t),o=io(t?.duration),n=10,s=r?.each||1,i=[...e].map((d,y)=>({item:d,start:0,end:o,index:y}));if(!Ev(e))return i;r.grid?.col>e.length&&(kt(e.length),s=1),u.checkType(Number,s)&&(s>n||s<1)&&(Ab(n),s=1);let{staggerArray:a}=Nt({arrayDefault:[...e].map(d=>({item:d})),arrayOnStop:[],stagger:r,slowlestStagger:Xe,fastestStagger:Xe}),c=a.filter(({item:d})=>u.checkType(Element,d)||u.checkType(Object,d)||u.checkType(Element,d?.deref?.()));if(c.length===0)return Pb(),i;let l=c.map(({frame:d})=>d),p=[...new Set(l)].toSorted((d,y)=>d-y),h=p.length;return c.map(({item:d,frame:y})=>{let v=p.indexOf(y),T=s*h/n,{start:S,end:_}=r.type===Lo?lI({each:s,duration:o,numItem:h,index:v,eachByNumItem:T}):r.type===Fo||r.type==="end"||r.type===Do?uI({duration:o,numItem:h,index:v,eachByNumItem:T,type:r.type}):{start:0,end:o};return{item:d,start:S,end:_,index:v}})};function pI(t){return new js(t)}function mI(t){return new Hs(t)}function hI(){return new zs}function dI(t){return ay(t)}function fI(t){return new Nr(t)}function gI(t){return new Tt(t)}function bI(t){return new Pr(t)}var Me={};_o(Me,{createAsyncTimeline:()=>yI,createSyncTimeline:()=>vI});var ee=()=>{},Ua=(...t)=>e=>t.reduce((r,o)=>r.then(o),Promise.resolve(e));var Ga=({data:t,filterBy:e})=>Object.entries(t).map(r=>{let[o,n]=r,s=o in e;return{data:{[o]:n},active:s}}).filter(({active:r})=>r).map(({data:r})=>r).reduce((r,o)=>({...r,...o}),{});var po=({timeline:t,tween:e,index:r})=>{let o=e?.getId?.(),n=e?.getInitialData?.()||{},s=t.slice(0,r).reduce((i,a)=>{let c=a.find(({data:h})=>h?.tween?.getId?.()===o);c?.data?.tween?.setImmediate?.(c?.data?.valuesTo);let l=c?.data?.tween?.getToNativeType?.(),p=l&&c?Ga({data:l,filterBy:c.data.valuesTo}):{};return{...i,...p}},n);return e.setImmediate(n),s};var ku=({mainReject:t,mainResolve:e,isStopped:r,previousSessionId:o,currentSessionId:n,isInPause:s,tween:i,stepFunction:a,action:c,addToActiveTween:l})=>{if(r()||o!==n()){t();return}let p=l(i),h=i&&i?.validateInitialization?i.validateInitialization({validation:()=>s(),callback:()=>i.pause?.()}):ee;a[c]().then(()=>e({resolve:!0})).catch(()=>{}).finally(()=>{p(),h()})};var Us=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#y;#v;#T;#k;#_;#w;#N;#R;#O;#E;#A;#P;#b;#D;#L;#I;constructor(e){this.#n=ka(e?.repeat),this.#t=de(e?.yoyo,"asyncTimeline: yoyo",!1),this.#i=de(e?.freeMode,"asyncTimeline: freeMode",!1),this.#l=de(e?.autoSet,"asyncTimeline: autoSet",!0),this.#h=de(e?.inheritProps,"asyncTimeline: inheritProps",!0),this.#u=de(e?.forceFromTo,"asyncTimeline: forceFromTo",!1),this.#s=[],this.#c=[],this.#o=[],this.#e=!1,this.#p={id:-1,tween:void 0,callback:()=>{},action:"",valuesFrom:{},valuesTo:{},prevValueTo:{},prevValueSettled:!1,tweenProps:{},groupProps:{},labelProps:{}},this.#a={active:!1,index:-1,isReverse:!1,callback:void 0},this.#d=1,this.#f=void 0,this.#r=0,this.#g=0,this.#m=1,this.#C=!1,this.#x=!1,this.#y=!1,this.#v=!1,this.#T=!1,this.#k=!1,this.#_=!0,this.#w=0,this.#N=0,this.#R=0,this.#O=!1,this.#E=[],this.#A=!1,this.#P=0,this.#b=[],this.#D=[],this.#L=void 0,this.#I=void 0}#B(){let e=this.#s[this.#g],r=this.#E;if(this.#E=[],!e)return;this.#s[this.#g]=e.map(i=>{let{data:a}=i,{tween:c,valuesTo:l,prevValueSettled:p}=a;if(c&&c?.getToNativeType&&!p){let h=c.getToNativeType(),f=Ga({data:h,filterBy:l});return{...i,data:{...a,prevValueTo:f,prevValueSettled:!0}}}return i});let o=e.map(i=>{let{data:a}=i,{tween:c,callback:l,action:p,valuesFrom:h,valuesTo:f,tweenProps:d,id:y}=a,v={...d};delete v.delay;let{active:T,index:S}=this.#a,_=Number.isNaN(S)?!1:T&&S&&this.#g<S;_&&(v.immediate=!0),d&&"relative"in d&&d.relative&&(d.relative=!1,cb()),this.#E.push({id:y,action:p});let E=r.find(({id:w,action:I})=>w===y&&I===p),x={set:()=>(this.#v||c?.clearCurretPromise?.(),c?.[p](h,v)),goTo:()=>(this.#v||c?.clearCurretPromise?.(),c?.[p](f,v)),goFrom:()=>(this.#v||c?.clearCurretPromise?.(),c?.[p](h,v)),goFromTo:()=>(this.#v||c?.clearCurretPromise?.(),c?.[p](h,f,v)),add:()=>E?new Promise(w=>w({resolve:!0})):new Promise(w=>{if(_){w({resolve:!0});return}let I=this.getDirection();l({direction:I,loop:this.#m}),w({resolve:!0})}),addAsync:()=>{this.#k=!0;let w=this.#w;return E?new Promise(I=>I({resolve:!0})):new Promise((I,N)=>{if(_){I({resolve:!0});return}let A=this.getDirection();l({direction:A,loop:this.#m,resolve:()=>{if(w===this.#w){I({resolve:!0});return}N()}})})},createGroup:()=>new Promise(w=>w({resolve:!0})),closeGroup:()=>new Promise(w=>w({resolve:!0})),label:()=>new Promise(w=>w({resolve:!0})),suspend:()=>{if(E)return new Promise(N=>N({resolve:!0}));let w=u.checkType(Boolean,l());w||lb(l);let I=w?l():!0;return new Promise(N=>{!_&&I&&(this.#T=!0),N({resolve:!0})})}};return new Promise((w,I)=>{let N=_?!1:d?.delay,A=this.#w;if(N){let O=u.getTime();requestAnimationFrame(()=>{this.#$({start:O,deltaTimeOnpause:0,delay:N,mainReject:I,mainResolve:w,previousSessionId:A,tween:c,stepFunction:x,action:p})});return}ku({mainReject:I,mainResolve:w,isStopped:()=>this.#_,isInPause:()=>this.#v,addToActiveTween:O=>this.#Y(O),currentSessionId:()=>this.#w,previousSessionId:A,tween:c,stepFunction:x,action:p})})}),s=this.#s[this.#g].some(i=>i.data.groupProps?.waitComplete)?"all":"race";Promise[s](o).then(()=>{if(this.#T||this.#_)return;let{active:i,index:a,isReverse:c,callback:l}=this.#a;if(l&&i&&this.#g===a-1){this.#Q(),this.#m++,l();return}if(i&&c&&this.#g===a-1&&this.reverseNext(),this.#C){this.#C=!1,this.#g=this.#s.length-this.#g-1,this.#Q(),this.#H(),this.#B();return}if(this.#g<this.#s.length-1){this.#g++,this.#B();return}if(this.#m<this.#n||this.#n===-1){if(i&&a===this.#s.length&&!this.#i){let p=this.#o.map(({tween:h})=>{let f=po({timeline:this.#s,tween:h,index:this.#s.length});return new Promise((d,y)=>{h.set(f).then(()=>d({resolve:!0})).catch(()=>y())})});Promise.all(p).then(()=>{this.#S()}).catch(()=>{});return}this.#S();return}this.#D.forEach(({cb:p})=>p()),this.#_=!0,this.#L&&Xo.add(()=>{xt.add(()=>{this.#L?.({resolve:!0})})})}).catch(i=>{i&&console.log(i)}).finally(()=>{this.#k=!1})}#$({start:e,deltaTimeOnpause:r,delay:o,mainReject:n,mainResolve:s,previousSessionId:i,tween:a,stepFunction:c,action:l}){let p=u.getTime(),h=p-e;if(this.#v&&(r=p-this.#R),h-r>=o||this.#_||this.#C){ku({mainReject:n,mainResolve:s,isStopped:()=>this.#_,isInPause:()=>this.#v,addToActiveTween:f=>this.#Y(f),currentSessionId:()=>this.#w,previousSessionId:i,tween:a,stepFunction:c,action:l});return}requestAnimationFrame(()=>{this.#$({start:e,deltaTimeOnpause:r,delay:o,mainReject:n,mainResolve:s,previousSessionId:i,tween:a,stepFunction:c,action:l})})}#S(){if(this.#m>0){let e=this.getDirection();this.#b.forEach(({cb:r})=>r({direction:e,loop:this.#m}))}this.#m++,this.#g=0,this.#Q(),(this.#t||this.#x)&&this.#H(),this.#x=!1,this.#B()}#Y(e){let r=e?.getId&&e.getId();if(!r)return ee;let o=this.#N;return this.#N++,this.#c.push({tween:e,uniqueId:r,id:o}),()=>{this.#c=this.#c.filter(({id:n})=>n!==o)}}#H(){this.#y=!this.#y,this.#s=this.#s.toReversed().map(e=>e.toReversed().map(r=>{let{data:o}=r,{action:n,valuesFrom:s,prevValueTo:i,valuesTo:a}=o,c=a;switch(n){case"goTo":return{...r,data:{...o,valuesTo:i,prevValueTo:c}};case"goFromTo":return{...r,data:{...o,valuesFrom:a,valuesTo:s}};case"goFrom":return this.#u||(ub(),this.stop()),{...r,data:{...o,valuesFrom:a,valuesTo:s}}}return r}))}#M(e){let r=this.#s.findIndex(o=>o[0]?.group&&o[0].group===this.#f);if(r!==-1){this.#s[r].push({group:this.#f,data:e});return}this.#s.push([{group:this.#f,data:e}])}#W(e){let r=e?.getId?.();if(this.#o.find(({id:s})=>s===r))return;let n={id:r,tween:e};this.#o.push(n)}#F(){this.#o.forEach(({tween:e})=>e.resetData())}set(e,r={},o={}){if(!Ds(e))return this;o.delay=Fs(o?.delay);let n=this.#h?po({timeline:this.#s,tween:e,index:this.#s.length}):{};return this.#r++,this.#M({...this.#p,id:this.#r,tween:e,action:"set",valuesTo:{...n,...r},valuesFrom:{...n,...r},tweenProps:o,groupProps:{waitComplete:this.#e}}),this.#W(e),this}goTo(e,r={},o={}){if(!Ds(e))return this;o.delay=Fs(o?.delay);let n=po({timeline:this.#s,tween:e,index:this.#s.length}),s=this.#h||this.#u?n:{};return this.#r++,this.#u?this.#M({...this.#p,id:this.#r,tween:e,action:"goFromTo",valuesFrom:{...s},valuesTo:{...s,...r},tweenProps:o??{},groupProps:{waitComplete:this.#e}}):this.#M({...this.#p,id:this.#r,tween:e,action:"goTo",valuesTo:{...s,...r},tweenProps:o??{},groupProps:{waitComplete:this.#e}}),this.#W(e),this}goFrom(e,r={},o={}){if(!Ds(e))return this;o.delay=Fs(o?.delay);let n=po({timeline:this.#s,tween:e,index:this.#s.length}),s=this.#h||this.#u?n:{};return this.#r++,this.#u?this.#M({...this.#p,id:this.#r,tween:e,action:"goFromTo",valuesFrom:{...s,...r},valuesTo:{...s},tweenProps:o??{},groupProps:{waitComplete:this.#e}}):this.#M({...this.#p,id:this.#r,tween:e,action:"goFrom",valuesFrom:{...s,...r},tweenProps:o,groupProps:{waitComplete:this.#e}}),this.#W(e),this}goFromTo(e,r={},o={},n={}){if(!Ds(e))return this;n.delay=Fs(n?.delay);let s=this.#h?po({timeline:this.#s,tween:e,index:this.#s.length}):{};return this.#r++,this.#M({...this.#p,id:this.#r,tween:e,action:"goFromTo",valuesFrom:{...s,...r},valuesTo:{...s,...o},tweenProps:n,groupProps:{waitComplete:this.#e}}),this.#W(e),this}add(e=ee){let r=co(e,()=>{},"timeline add function");return this.#f?(Nn("add"),this):(this.#r++,this.#M({...this.#p,id:this.#r,callback:r,action:"add",groupProps:{waitComplete:this.#e}}),this)}addAsync(e){let r=Pv(e);return this.#f?(Nn("addAsync"),this):(this.#r++,this.#M({...this.#p,id:this.#r,callback:r,action:"addAsync",groupProps:{waitComplete:this.#e}}),this)}createGroup(e={}){return this.#f?(Nn("createGroup"),this):(this.#r++,this.#M({...this.#p,id:this.#r,action:"createGroup",groupProps:e}),this.#e=e?.waitComplete??!1,this.#f=this.#d++,this)}closeGroup(){return this.#f=void 0,this.#r++,this.#M({...this.#p,id:this.#r,action:"closeGroup"}),this.#e=!1,this}suspend(e=()=>!0){return this.#f?(Nn("suspend"),this):(this.#r++,this.#M({...this.#p,id:this.#r,callback:e,action:"suspend",groupProps:{waitComplete:this.#e}}),this)}label(e={}){return this.#f?(Nn("label"),this):kv(e?.name,"asyncTimeline label:")?(this.#r++,this.#M({...this.#p,id:this.#r,action:"label",labelProps:e,groupProps:{waitComplete:this.#e}}),this):this}#U(){this.#O||(this.#O=!0,this.#o.forEach(({tween:e})=>{let r=e.getInitialData();this.#r++,this.#s=[[{group:void 0,data:{...this.#p,id:this.#r,tween:e,action:"set",valuesFrom:r,valuesTo:r,groupProps:{waitComplete:this.#e}}}],...this.#s]}),this.#o.forEach(({tween:e})=>{let r=po({timeline:this.#s,tween:e,index:this.#s.length});this.#r++,this.#s.push([{group:void 0,data:{...this.#p,id:this.#r,tween:e,action:"set",valuesFrom:r,valuesTo:r,groupProps:{waitComplete:this.#e}}}])}))}setTween(e="",r=[]){this.stop();let o=Nv(r),n=Av(e);if(!o||!n)return Promise.reject(new Error("timeline setTween: props is wrong"));let s=new Set(r.map(c=>c?.getId?.())),i=this.#o.filter(({id:c})=>s.has(c)),a=this.#s.findIndex(c=>{let[l]=c;return l.data.labelProps?.name===e});return a===-1?(hb(e),Promise.reject(new Error(`asyncTimeline.setTween() label: ${e} not found`))):new Promise(c=>{let l=i.map(({tween:p})=>{let h=po({timeline:this.#s,tween:p,index:a});return new Promise((f,d)=>{p.set(h).then(()=>f({resolve:!0})).catch(()=>d())})});Promise.all(l).then(()=>{c({resolve:!0})}).catch(()=>{db()})})}#G(){this.#I&&(this.#I(u.ANIMATION_STOP_REJECT),this.#I=void 0)}async#te(){if(this.#A)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#A=!0,await u.useFps(),this.#A=!1}async playFrom(e){return await this.#te(),this.#K(e,!1)}async playFromReverse(e){return await this.#te(),this.#K(e,!0)}#K(e,r){return new Promise((o,n)=>{this.playReverse({forceYoYo:!1,resolve:o,reject:n,callback:()=>{this.#s.length===0||this.#k||(this.#y&&this.#H(),this.#g=0,this.#a={isReverse:r,active:!0,index:u.checkType(String,e)?this.#s.findIndex(s=>{let[i]=s;return i.data.labelProps?.name===e}):e,callback:void 0},u.checkType(String,e)&&Rv(this.#a.index,e),this.#B())}})})}async play(){return await this.#te(),new Promise((e,r)=>{if(this.#l&&this.#U(),this.#i){if(this.#s.length===0||this.#k)return;this.stop(),this.#_=!1,this.#y&&this.#H(),this.#w++,u.useFrameIndex(()=>{this.#I=r,this.#L=e,this.#B()},1);return}this.playReverse({forceYoYo:!1,callback:()=>{this.stop(),this.#_=!1;let o=this.#o.map(({tween:n})=>{let s=n.getInitialData();return new Promise((i,a)=>{n.set(s).then(()=>i({resolve:!0})).catch(()=>a())})});Promise.all(o).then(()=>{this.#I=r,this.#L=e,this.#B()}).catch(()=>{})}})})}async playReverse({forceYoYo:e=!0,callback:r,resolve:o=null,reject:n=null}={}){return await this.#te(),new Promise((s,i)=>{let a=o??s,c=n??i,l=e;this.#l&&this.#U(),!(this.#s.length===0||this.#k)&&(this.stop(),this.#_=!1,l&&(this.#x=!0),this.#a={active:!0,index:this.#s.length,isReverse:!1,callback:r},this.#m--,this.#w++,u.useFrameIndex(()=>{this.#L=a,this.#I=c,this.#B()},1))})}reverseNext(){this.#C=!0}stop({clearCache:e=!0}={}){this.#_=!0,this.#g=0,this.#m=1,this.#G(),this.#C=!1,this.#Q(),this.#x=!1,this.#v=!1,this.#T=!1,this.#k=!1,this.#R=0,this.#o.forEach(({tween:r})=>{r?.stop?.({clearCache:e})}),this.#y&&this.#H(),this.#y=!1,this.#i||this.#F()}pause(){this.#v||(this.#v=!0,this.#R=u.getTime(),this.#se())}resume(){if(this.#v&&(this.#v=!1,this.#R=0,this.#ee()),this.#T){if(this.#T=!1,this.#R=0,this.#g<=this.#s.length-2){this.#g++,this.#B();return}this.#g===this.#s.length-1&&(this.#g=this.#t&&!this.#y?1:0,this.#Q(),this.#t&&this.#H(),this.#m++,this.#B())}}#se(){this.#c.forEach(({tween:e})=>{e?.pause?.()})}#ee(){this.#c.forEach(({tween:e})=>{e?.resume?.()})}#Q(){this.#a={active:!1,index:-1,isReverse:!1,callback:void 0}}get(){return this.#c}isActive(){return!this.#_}isPaused(){return this.#v}isSuspended(){return this.#T}getDirection(){return this.#_?We.NONE:this.#y?We.BACKWARD:We.FORWARD}onLoopEnd(e){this.#b.push({cb:e,id:this.#P});let r=this.#P;return()=>{this.#b=this.#b.filter(o=>o.id!==r)}}onComplete(e){this.#D.push({cb:e,id:this.#P});let r=this.#P;return this.#P++,()=>{this.#D=this.#D.filter(o=>o.id!==r)}}destroy(){this.#o.forEach(({tween:e})=>{e?.destroy?.()}),this.#s=[],this.#c=[],this.#D=[],this.#b=[],this.#o=[],this.#g=0,this.#a={active:!1,callback:void 0,index:-1,isReverse:!1}}};var Gs=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#y;#v;#T;#k;#_;#w;#N;#R;#O;#E;constructor(e={}){this.#n=io(e?.duration),this.#t=de(e?.yoyo,"syncTimeline: yoyo",!1),this.#i=ka(e?.repeat),this.#l=[],this.#h=0,this.#u=0,this.#s=0,this.#c=0,this.#o=0,this.#e=0,this.#p=!1,this.#a=!1,this.#d=!1,this.#f=0,this.#r=0,this.#g=10,this.#m=!0,this.#C=!1,this.#x=!1,this.#y=!1,this.#v=!1,this.#T=0,this.#k=[],this.#_=[],this.#w=[],this.#N=void 0,this.#R=void 0,this.#O={time:0,direction:We.NONE},this.#E={direction:We.NONE,loop:0}}#A(e,r){if(this.#m||this.#y)return;let o=!this.#i||this.#i>=2&&this.#f===this.#i-1?0:1e3/r/2;this.#v&&(this.#c=e-this.#h-this.#u-this.#e),this.#u=Math.trunc(e-this.#h-this.#c-this.#e);let n=this.#p?this.#o-(this.#u-this.#o):this.#u,s=this.getDirection();if(this.#v||(this.#s=nt(n,0,this.#n),this.#C||(this.#l.forEach(i=>{i.draw({partial:this.#s,isLastDraw:!1,useFrame:!0,direction:s})}),this.#O.time=this.#s,this.#O.direction=s,this.#w.forEach(({cb:i})=>{i(this.#O)}))),this.#C=!1,this.#r++,n<=this.#n-o&&n>=0+o&&!this.#m){this.#x=!1,this.#P();return}if(this.#S(),this.#a){this.#p=!0,this.#o=0,this.#e=0,this.#a=!1,this.#P();return}if(u.useNextFrame(()=>{!this.#y&&!this.#x&&this.#r>this.#g&&(this.#x=!0,this.#f++,this.#r=0,this.#E.direction=s,this.#E.loop=this.#f,this.#k.forEach(({cb:i})=>i(this.#E)))}),!this.#i||this.#f===this.#i-1&&this.#r>this.#g){let i=this.#s;this.#l.forEach(a=>{a.draw({partial:i,isLastDraw:!0,useFrame:!0,direction:s})}),this.#m=!0,this.#b(),this.#h=e,this.#p&&(this.#p=!1),this.#_.forEach(({cb:a})=>a()),this.#N&&this.#N(!0);return}if(this.#t){this.reverse(),this.#P();return}if(this.#d){this.#b(),this.#h=e,this.#p||(this.#d=!this.#d),this.#u=this.#n,this.#s=this.#n,this.#c=this.#n,this.#P();return}this.#b(),this.#h=e,this.#p&&(this.#d=!this.#d),this.#P()}#P(){u.useFrame(()=>{u.useNextTick(({time:e,fps:r})=>{this.#y||this.#A(e,r)})})}#b(){this.#u=0,this.#c=0,this.#s=0,this.#o=0,this.#e=0}#D(e){let r=this.#l.reduce((o,n)=>n.getLabels().find(({name:a})=>a===e)||o,{name:"",time:0});return r||fb(e),r.time}#L(){this.#R&&(this.#R(u.ANIMATION_STOP_REJECT),this.#R=void 0)}play(e={}){this.resume();let r=e?.useCurrent;return r||this.stop(),new Promise((o,n)=>{if(!this.#y&&(this.#L(),this.#N=o,this.#R=n,!(!this.#m&&!this.#p&&r))){if(!this.#m&&this.#p&&r){this.reverse();return}this.#I()}})}playFrom(e=0){return this.resume(),this.stop(),new Promise((r,o)=>{if(this.#y)return;let s=u.checkType(Number,e)?e:this.#D(e);this.#L(),this.#N=r,this.#R=o,this.#I(s)})}#I(e=0){this.#S(),this.#b(),this.#s=e,this.#e=-this.#s,this.#d=!1,this.#r=0,this.#y=!0,this.#$(e)}playFromReverse(e){return this.resume(),this.stop(),new Promise((r,o)=>{if(this.#y)return;let s=u.checkType(Number,e)?e:this.#D(e);this.#L(),this.#N=r,this.#R=o,this.#B(s,!0)})}playReverse(e={}){this.resume();let r=e?.useCurrent;return r||this.stop(),new Promise((o,n)=>{if(!this.#y&&(this.#L(),this.#N=o,this.#R=n,!(!this.#m&&this.#p&&r))){if(!this.#m&&!this.#p&&r){this.reverse();return}this.#B(this.#n,!0)}})}#B(e=0){this.#S(),this.#u=e,this.#s=e,this.#c=e,this.#o=0,this.#e=0,this.#a=!0,this.#d=!0,this.#C=!0,this.#r=0,this.#y=!0,this.#$(e)}async#$(e){if(this.#i===0)return;let{averageFPS:r}=await u.useFps();uo("sequencer",r),this.#p=!1,this.#l.forEach(o=>{o.inzializeStagger(),o.disableStagger(),o.draw({partial:e,isLastDraw:!1,useFrame:!0,direction:this.getDirection()})}),u.useFrame(()=>{u.useNextTick(({time:o,fps:n})=>{this.#h=o,this.#y=!1,this.#m=!1,this.#v=!1,this.#f=0,this.#A(o,n)})})}pause({freezeCache:e=!0}={}){if(!(this.#m||this.#v||this.#y)&&(this.#m=!1,this.#v=!0,e)){this.#l.forEach(r=>{r.freezeCachedId()});return}}resume({unFreezeCache:e=!0}={}){if(!(this.#m||!this.#v||this.#y)&&(this.#v=!1,e)){this.#l.forEach(r=>{r.unFreezeCachedId()});return}}reverse(){this.#v&&this.resume(),!(this.#m||this.#y)&&(this.#S(),this.#p=!this.#p,this.#p?this.#o=this.#u:this.#e+=this.#u-this.#s)}stop({clearCache:e=!0}={}){if(this.resume(),this.#m=!0,this.#L(),e){this.#l.forEach(r=>{r.cleanCachedId()});return}this.#l.forEach(r=>{r.draw({partial:this.#s,isLastDraw:!0,useFrame:!0,direction:this.getDirection()})})}add(e){return e.setStretchFactor(this.#n),this.#l.push(e),this}setDuration(e){return this.#n=e,this}#S(){this.#l.forEach(e=>e.resetLastValue())}isActive(){return!this.#m}isPaused(){return this.#v}getDirection(){return this.#m?We.NONE:this.#p?We.BACKWARD:We.FORWARD}getTime(){return this.#s}onLoopEnd(e=()=>{}){this.#k.push({cb:e,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#k=this.#k.filter(o=>o.id!==r)}}onComplete(e=()=>{}){this.#_.push({cb:e,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#_=this.#_.filter(o=>o.id!==r)}}onUpdate(e=()=>{}){this.#w.push({cb:e,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#w=this.#w.filter(o=>o.id!==r)}}destroy(){this.stop(),this.#l.forEach(e=>e.destroy()),this.#l=[],this.#w=[],this.#k=[],this.#_=[]}};function vI(t){return new Gs(t)}function yI(t){return new Us(t)}var Ke={};_o(Ke,{createParallax:()=>EI,createScrollTrigger:()=>wI});var TI=({prevValue:t,value:e,maxVal:r})=>e>=r&&t<=r&&r>=0||e<=r&&t>=r&&r<=0?b.ON_LEAVE:e>r&&t<=r&&r<=0||e<r&&t>=r&&r>=0?b.ON_ENTER_BACK:e>=0&&t<=0&&r<=0||e<=0&&t>=0&&r>=0?b.ON_LEAVE_BACK:e>0&&e<r&&t<=0&&r>=0||e<0&&t>=0&&r<=0?b.ON_ENTER:b.ON_NOOP;function cy({prevValue:t,value:e,maxVal:r,onEnter:o,onEnterBack:n,onLeave:s,onLeaveBack:i}){switch(TI({prevValue:t,value:e,maxVal:r})){case b.ON_LEAVE:{s&&s();break}case b.ON_ENTER_BACK:{n&&n();break}case b.ON_LEAVE_BACK:{i&&i();break}case b.ON_ENTER:{o&&o();break}}}var _I=({startMarker:t,endMarker:e,label:r})=>{if(!t&&!e){let o=r.replaceAll(/^[^a-z]+|[^\w.:-]+/gi,"-"),n=document.createElement("span");n.className+=`p-marker p-marker--start  p-marker-${o}`,n.innerHTML=`start ${o}`;let s=document.createElement("span");s.className+=`p-marker p-marker--end  p-marker-${o}`,s.innerHTML=`end ${o}`,document.body.append(n),document.body.append(s);let i=document.querySelector(`.p-marker--start.p-marker-${o}`),a=document.querySelector(`.p-marker--end.p-marker-${o}`);return{lastStartMarker:i??void 0,lastEndMarkerEl:a??void 0}}return{lastStartMarker:t,lastEndMarkerEl:e}},SI=({screen:t})=>{if(t===globalThis)return{top:0,right:0,bottom:0,left:0};let e=t.getBoundingClientRect();return{top:e.top,right:document.documentElement.clientWidth-(e.left+t.offsetWidth),bottom:window.innerHeight-(e.top+t.offsetHeight),left:e.left}},xI=({startPoint:t,direction:e,invertSide:r,top:o,bottom:n,left:s,right:i})=>e===b.DIRECTION_VERTICAL?r?{right:0,width:"100vw",height:"3px",top:`${t+o}px`,padding:"0 30px",pointerEvents:"none"}:{right:0,width:"100vw",height:"3px",bottom:`${t+n}px`,padding:"0 30px",pointerEvents:"none"}:r?{top:0,height:"100vw",width:"3px",left:`${t+s}px`,padding:"30px 0",pointerEvents:"none"}:{top:0,height:"100vw",width:"3px",right:`${t+i}px`,padding:"30px 0",pointerEvents:"none"},CI=({startPoint:t,endPoint:e,direction:r,invertSide:o,top:n,bottom:s,left:i,right:a})=>r===b.DIRECTION_VERTICAL?o?{right:0,width:"100vw",height:"3px",top:`${t+e+n}px`,padding:"0 30px",pointerEvents:"none"}:{right:0,width:"100vw",height:"3px",bottom:`${t+e+s}px`,padding:"0 30px",pointerEvents:"none"}:o?{top:0,height:"100vw",width:"3px",left:`${t+e+i}px`,padding:"30px 0",pointerEvents:"none"}:{top:0,height:"100vw",width:"3px",right:`${t+e+a}px`,padding:"30px 0",pointerEvents:"none"},ly=({startMarker:t,endMarker:e,startPoint:r,endPoint:o,screen:n,direction:s,invertSide:i,label:a})=>{let{lastStartMarker:c,lastEndMarkerEl:l}=_I({startMarker:t,endMarker:e,label:a}),{top:p,right:h,bottom:f,left:d}=SI({screen:n}),y=xI({startPoint:r,direction:s,invertSide:i,top:p,bottom:f,left:d,right:h}),v=CI({startPoint:r,endPoint:o,direction:s,invertSide:i,top:p,bottom:f,left:d,right:h}),T={position:"fixed",zIndex:"99999",background:he.get("scrollTrigger")?.markerColor?.startEnd||"#ff0000",fontSize:"14px",whiteSpace:"nowrap",textTransform:"uppercase"};return u.useFrame(()=>{Object.assign(c?.style,{...T,...y}),Object.assign(l?.style,{...T,...v})}),{startMarker:c,endMarker:l}};var uy=({marker:t,direction:e,invertSide:r})=>{if(!t)return{};let n=`3px ${he.get("scrollTrigger")?.markerColor?.item||"#14df3b"} solid`;return e===b.DIRECTION_VERTICAL?r?{borderBottom:n}:{borderTop:n}:r?{borderRight:n}:{borderLeft:n}};var qa=class{#n=0;#t=0;#i=0;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#y;#v;#T;#k;#_;#w;#N;#R;#O;#E;#A;#P;#b;#D;#L;#I;#B;#$;#S;#Y;#H;#M;#W;#F;constructor(){this.#l=void 0,this.#h=0,this.#u=()=>0,this.#s=()=>0,this.#c=b.DIRECTION_VERTICAL,this.#o=0,this.#e=void 0,this.#p=void 0,this.#a=void 0,this.#r=void 0,this.#g=!1,this.#m=!1,this.#C=!1,this.#x=()=>{},this.#y=()=>{},this.#v=()=>{},this.#T=!0,this.#d=void 0,this.#f=globalThis,this.#M="left",this.#F=!0,this.#W=!1,this.#k=["flex","flex-shrink","flex-basis","float","display","grid-area","grid-column-start","grid-column-end","grid-row-start","grid-row-end","box-sizing","order","place-self","align-self","justify-self"],this.#_=["font-size","padding","margin","line-height","white-space"],this.#w=["text-align"],this.#N=["z-index","pointer-events"],this.#R=["transform","position","translate","rotate","scale"],this.#O=["none","static"],this.#E=!1,this.#A=0,this.#P=0,this.#b=!1,this.#D=1.5,this.#L=!1,this.#I=!1,this.#B=0,this.#$=0,this.#S=!1,this.#Y=0,this.#H=3}init(e){this.#e=e.item,this.#d=e.marker,this.#f=e.screen,this.#b=e.animatePin,this.#F=e.anticipatePinOnLoad,this.#L=e.forceTranspond,this.#l=e.invertSide,this.#c=e.direction,this.#u=e.getStart,this.#s=e.getEnd,this.#t=this.#u(),this.#h=this.#s(),this.#P=window.scrollY,this.#n=e?.scrollerHeight,this.#ue(),this.#M=this.#c===b.DIRECTION_VERTICAL?"top":"left",this.#E=!0,this.#T=!0,this.#te(),this.#se(),this.#K(),this.#U(),this.#y=u.useScrollStart(()=>{this.#E&&this.#f!==globalThis&&this.#m&&this.#r&&u.useFrame(()=>{this.#r&&(this.#r.style.transition="transform .85s cubic-bezier(0, 0.68, 0.45, 1.1)")})}),this.#x=u.useScroll(({scrollY:r})=>{if(this.#E&&this.#f!==globalThis&&this.#f!==document.documentElement){this.#c===b.DIRECTION_VERTICAL&&this.#ue();let o=r-this.#P;if(this.#P=r,this.#m&&this.#r&&this.#p){let{verticalGap:n}=this.#p.get(),s=n-o;this.#p.setData({collision:0,verticalGap:s}),u.useFrame(()=>{this.#r&&(this.#r.style.transform=`translate(0px,${s}px)`)})}}})}#U(){this.#p=new Tt({data:{collision:0,verticalGap:0},config:"wobbly"}),this.#v=this.#p.subscribe(({collision:e,verticalGap:r})=>{this.#c===b.DIRECTION_VERTICAL&&this.#r?this.#r.style.transform=`translate(0px, ${e}px)`:this.#r&&(this.#r.style.transform=`translate(${e}px, ${r}px)`)})}#G(){this.#r&&this.#p&&this.#p.set({collision:0,verticalGap:0}).catch(()=>{})}#te(){this.#e||(this.#e=document.createElement("div"));let e=document.createElement("div");e.classList.add("pin-wrapper");let r=document.createElement("div");r.classList.add("pin"),e.append(r);let o=this.#e?.parentNode;o&&o.insertBefore(e,this.#e),r.append(this.#e),this.#a=this.#e.closest(".pin-wrapper"),this.#r=this.#e.closest(".pin");let n=this.#Q(),s=this.#j(),i=uy({marker:this.#d,invertSide:this.#l,direction:this.#c}),a={display:"table"};u.useFrame(()=>{!this.#r||!this.#a||(Object.assign(this.#a.style,{...i}),Object.assign(this.#r.style,{...a,...s,...n}))}),this.#re()}#K(){if(!this.#r||!this.#a)return;let e=this.#a.offsetHeight,r=this.#a.offsetWidth;this.#a.style.height=`${e}px`,this.#a.style.width=`${r}px`,this.#r.style.height=`${e}px`,this.#r.style.width=`${r}px`}#se(){if(!this.#e)return;let e=globalThis.getComputedStyle(this.#e),r=this.#k.reduce((o,n)=>({...o,[n]:e.getPropertyValue(n)}),{});u.useFrame(()=>{this.#a&&Object.assign(this.#a.style,r)})}#ee(e,r){let o=e.parentNode;if(o)for(;o!==null&&o!==document;){let n=getComputedStyle(o);if(n[r]&&!this.#O.includes(n[r]))return{[r]:n[r]};o=o.parentNode}}#Q(){return this.#r?this.#w.map(r=>this.#ee(this.#r,r)).filter(Boolean).reduce((r,o)=>({...r,...o}),{})??{}:{}}#re(){if(this.#L){this.#W=!0;return}this.#W=this.#R.map(e=>{let r=this.#ee(this.#a,e);if(!r)return!1;let[o]=Object.keys(r),[n]=Object.values(r);return o==="position"?n==="fixed"||n==="absolute":!0}).includes(!0)}#ie(){this.#t=this.#u(),this.#h=this.#s()}#ue(){this.#ie(),this.#f!==globalThis&&(this.#t-=this.#c===b.DIRECTION_VERTICAL?St(this.#f).top:St(this.#f).left),this.#i=this.#l?this.#t:this.#n-this.#t,this.#o=this.#l?-Math.trunc(this.#h):Math.trunc(this.#h)}destroy(){this.#E&&(this.#p?.stop?.(),this.#v(),this.#x(),this.#y(),this.#p?.destroy?.(),this.#p=null,this.#B=0,this.#I=!1,this.#C=!1,this.#m=!1,this.#g=!1,this.#r&&this.#a&&(this.#a.parentNode?.insertBefore(this.#e,this.#a),this.#r.remove(),this.#a.remove(),this.#a=void 0,this.#r=void 0,this.#E=!1))}#ce(){return this.#a?this.#c===b.DIRECTION_VERTICAL?St(this.#a).top-this.#i:St(this.#a).left-this.#i:0}#fe(){let e=this.#ce();this.#be(e)}#pe(){let e=this.#l?this.#ce()-this.#h:this.#ce()+this.#h;this.#be(e)}#be(e){u.useFrame(()=>{if(!this.#r||!this.#M)return;let r=this.#r?.style??{};r[this.#M]=`${this.#i}px`}),this.#b&&!this.#T&&this.#r&&this.#p&&this.#p.goFrom({collision:e}).then(()=>{this.#ge()}).catch(()=>{})}#ge(){u.useFrame(()=>{this.#r&&(this.#r.style.transform="translate(0px, 0px)")})}#X(){this.#G(),u.useFrame(()=>{this.#r&&(this.#r.style.transition="",this.#r.style.position="relative",this.#r.style.top="",this.#r.style.left="")})}#q(){this.#G(),u.useFrame(()=>{this.#r&&(this.#r.style.transition="",this.#r.style.position="relative",this.#c===b.DIRECTION_VERTICAL?(this.#r.style.left="",this.#r.style.top=`${this.#o}px`):(this.#r.style.top="",this.#r.style.left=`${this.#o}px`))})}#J(){if(!this.#r)return;let e=this.#c===b.DIRECTION_VERTICAL?St(this.#r).left:St(this.#r).top,r=this.#c===b.DIRECTION_VERTICAL?"left":"top";u.useFrame(()=>{this.#r&&(this.#r.style.position="fixed",this.#r.style[r]=`${e}px`,this.#I=!0,this.#S=!0)})}#j(){if(!this.#e)return{};let e=globalThis.getComputedStyle(this.#e);return this.#N.reduce((r,o)=>({...r,[o]:e.getPropertyValue(o)}),{})}#Z(){if(!this.#e)return{};let e=globalThis.getComputedStyle(this.#e);return this.#_.reduce((r,o)=>({...r,[o]:e.getPropertyValue(o)}),{})}#oe(){return this.#_.reduce((e,r)=>({...e,[r]:""}),{})}#V(){if(this.#W){let e=this.#Q(),r=this.#j(),o=this.#Z();u.useFrame(()=>{this.#r&&(Object.assign(this.#r.style,{...r,...e}),this.#e&&Object.assign(this.#e.style,o),document.body.append(this.#r))})}}#ne(){!this.#W||!this.#e||!this.#a||u.useFrame(()=>{this.#r&&(Object.assign(this.#e.style,this.#oe()),this.#a?.append(this.#r))})}#me(e){let r=this.#S&&this.#Y<3?this.#$:nt(Math.abs(e-this.#A),0,250);return this.#S&&this.#Y<this.#H?this.#Y++:(this.#Y=0,this.#S=!1),this.#$=r,r*this.#D}#z(e,r){if(this.#b&&!this.#T||this.#T&&!this.#F)return{anticipateBottom:0,anticipateInnerIn:0,anticipateInnerOut:0};let o=this.#me(e),n=r===b.SCROLL_UP?0:o,s=r===b.SCROLL_UP?0:o*2,i=r===b.SCROLL_UP?o:0;return{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}}#ye(e,r){if(this.#b&&!this.#T||this.#T&&!this.#F)return{anticipateBottom:0,anticipateInnerIn:0,anticipateInnerOut:0};let o=this.#me(e),n=r===b.SCROLL_UP?o:0,s=r===b.SCROLL_UP?o*2:0,i=r===b.SCROLL_UP?0:o;return{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}}onScroll(e){if(!this.#E||!this.#a)return;if(this.#I&&this.#B<this.#H){this.#B++;return}else this.#B=0,this.#I=!1;let r=this.#A>e?b.SCROLL_UP:b.SCROLL_DOWN,o=this.#c===b.DIRECTION_VERTICAL?St(this.#a).top:St(this.#a).left,{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}=this.#l?this.#ye(e,r):this.#z(e,r),a=this.#l?o<this.#t-n:o>this.#n-this.#t+n,c=this.#l?o>=this.#t-s&&o<=this.#t+i+this.#h:o<=this.#n-this.#t+s&&this.#n-o<=this.#h+i+this.#t;if(a)this.#C||(this.#X(),this.#ne(),this.#C=!0,this.#m=!1,this.#g=!1);else if(c){if(!this.#m){this.#J();let l=r===b.SCROLL_DOWN&&!this.#l||r===b.SCROLL_UP&&this.#l;this.#V(),l?this.#fe():this.#pe(),this.#C=!1,this.#m=!0,this.#g=!1}}else this.#g||(this.#q(),this.#ne(),this.#C=!1,this.#m=!1,this.#g=!0);this.#A=e,this.#T=!1}};var py=()=>{console.warn("parallax prop checker: value in start or end prop with no unit misure is not allowed, failed operation, use vh in vertical mode or vw in horizontal or px")},my=()=>{console.warn("parallax prop checker: value in start or end in vh is not allowed in horizontal mode, use vw or px")},hy=()=>{console.warn("parallax prop checker: value in start or end in vw is not allowed in vertical mode, use vh or px")};var Ru=()=>({numberVal:0,unitMisure:"",additionalVal:"",position:""}),dy=({invert:t,endValInNumber:e,scrollerHeight:r,startPoint:o,isFromTopLeft:n})=>{let s=e-o,i=r-e-o;return t?n?s:i:n?i:s},fy=({invert:t,scrollerHeight:e,screenUnit:r,endValInNumber:o,startPoint:n,isFromTopLeft:s})=>t?s?e-r*(100-o)-n:r*(100-o)-n:s?e-r*o-n:r*o-n,gy=({offset:t,height:e,gap:r,wScrollTop:o,wHeight:n})=>t+e>o-r&&t<o+(n+r),by=(t,e)=>{let r=t.find(c=>[...c].some(l=>!Number.isNaN(Number.parseFloat(l)))),o=gv(r);if(r&&!o)return py(),Ru();if(r&&o===b.VH&&e===b.DIRECTION_HORIZONTAL)return my(),Ru();if(r&&o===b.VW&&e===b.DIRECTION_VERTICAL)return hy(),Ru();let n=[b.PLUS_HEIGHT,b.PLUS_HEIGHT_HALF,b.PLUS_WIDTH,b.PLUS_WIDTH_HALF,b.MINUS_HEIGHT,b.MINUS_HEIGHT_HALF,b.MINUS_WIDTH,b.MINUS_WIDTH_HALF],s=t.find(c=>uu(n,c)),i=[b.POSITION_BOTTOM,b.POSITION_TOP,b.POSITION_LEFT,b.POSITION_RIGHT],a=t.find(c=>uu(i,c));return{numberVal:r||0,unitMisure:o,additionalVal:s??"",position:a??b.POSITION_BOTTOM}},vy=(t,e,r)=>{let n=String(e).split(" "),{numberVal:s,unitMisure:i,additionalVal:a,position:c}=by(n,r),l=Number.parseFloat(String(s)),p=Number.isNaN(l)?0:l;return i===b.PX?{value:p,additionalVal:a,position:wa(c)}:{value:t*p,additionalVal:a,position:wa(c)}},yy=(t,e,r,o,n,s)=>{let a=String(e).split(" "),{numberVal:c,unitMisure:l,additionalVal:p,position:h}=by(a,s),f=Number.parseFloat(String(c)),d=Number.isNaN(f)?0:f,y=wa(h),v=y===b.POSITION_TOP||y===b.POSITION_LEFT;return l===b.PX?{value:dy(n?{invert:!0,endValInNumber:d,scrollerHeight:o,startPoint:r,isFromTopLeft:v}:{invert:!1,endValInNumber:d,scrollerHeight:o,startPoint:r,isFromTopLeft:v}),additionalVal:p,position:y}:{value:fy(n?{invert:!0,scrollerHeight:o,screenUnit:t,endValInNumber:d,startPoint:r,isFromTopLeft:v}:{invert:!1,scrollerHeight:o,screenUnit:t,endValInNumber:d,startPoint:r,isFromTopLeft:v}),additionalVal:p,position:y}},Pu=(t,e,r,o)=>{let n=String(e);return Le(n,b.PLUS_HEIGHT_HALF)?t+r/2:Le(n,b.PLUS_HEIGHT)?t+r:Le(n,b.PLUS_WIDTH_HALF)?t+o/2:Le(n,b.PLUS_WIDTH)?t+o:Le(n,b.MINUS_HEIGHT_HALF)?t-r/2:Le(n,b.MINUS_HEIGHT)?t-r:Le(n,b.MINUS_WIDTH_HALF)?t-o/2:Le(n,b.MINUS_WIDTH)?t-o:t},Ty=({switchPropierties:t,isReverse:e,value:r})=>{switch(t){case b.IN_STOP:return!e&&r>0||e&&r<0?0:r;case b.IN_BACK:return!e&&r>0||e&&r<0?-r:r;case b.OUT_STOP:return!e&&r<0||e&&r>0?0:r;case b.OUT_BACK:return!e&&r<0||e&&r>0?-r:r;default:return r}},_y=(t,e)=>t===b.PROP_OPACITY?1-e:-e,Nu=({callback:t,pin:e,ease:r,useThrottle:o})=>e?u.useScrollImmediate(t):r&&o?u.useScrollThrottle(t):u.useScroll(t);var mo=class{#n=!1;#t=!1;#i=0;#l=0;#h=0;#u=0;#s=0;#c=0;#o=0;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#y;#v;#T;#k;#_;#w;#N;#R;#O;#E;#A;#P;#b;#D;#L;#I;#B;#$;#S;#Y;#H;#M;#W;#F;#U;#G;#te;#K;#se;#ee;#Q;#re;#ie;#ue;#ce;#fe;#pe;#be;#ge;#X;#q;#J;#j;#Z;#oe;#V;#ne;#me;#z;#ye;#he;#de;#le;#Ee;#Te;#ve;#Ce;#we;#Ie;#Re;#ae;constructor(e){this.#e=window.innerWidth,this.#p=window.innerHeight,this.#a=800,this.#d=0,this.#f=()=>{},this.#r=()=>{},this.#g=()=>{},this.#m=()=>{},this.#C=()=>{},this.#x=void 0,this.#y=void 0,this.#v=void 0,this.#T=0,this.#k=!1,this.#_=void 0,this.#w=!0,this.#N=!1,this.#R=!1,this.#O=!1,this.#E=void 0,this.#A="",this.#P=0,this.#b=0,this.#D=()=>{},this.#L=()=>{},this.#M=!1,this.#I=de(e?.pin,"Scrolltrigger pin propierties error:",!1),this.#B=de(e?.animatePin,"Scrolltrigger animatePin propierties error:",!1),this.#$=de(e?.forceTranspond,"Scrolltrigger forceTranspond propierties error:",!1),this.#S=de(e?.anticipatePinOnLoad,"Scrolltrigger anticipatePinOnLoad propierties error:",!1),this.#Y=Na(e?.start,"Scrolltrigger start propierties error:","bottom 0px"),this.#H=Na(e?.end,"Scrolltrigger end propierties error:","top"),this.#W=Na(e?.marker,"Scrolltrigger marker propierties error:",void 0),this.#F=e?.dynamicStart?bu(e.dynamicStart,"dynamicStart"):null,this.#U=e?.dynamicEnd?bu(e.dynamicEnd,"dynamicEnd"):null,this.#G=Ov(e?.dynamicRange),this.#te=de(e?.animateAtStart,"Scrolltrigger animateAtStart propierties error:",!1),this.#K=co(e?.onEnter,!1,"Scrolltrigger onEnter propierties error"),this.#se=co(e?.onEnterBack,!1,"Scrolltrigger onEnterBack propierties error"),this.#ee=co(e?.onLeave,!1,"Scrolltrigger onLeave propierties error"),this.#Q=co(e?.onLeaveBack,!1,"Scrolltrigger onLeaveBack propierties error"),this.#re=co(e?.onTick,!1,"Scrolltrigger onTickCallback propierties error"),this.#ie=Lv(e?.align),this.#ue=Fv(e?.onSwitch),this.#ce=de(e?.reverse,"Parallax reverse propierties error:",!1),this.#fe=vu(e?.opacityStart,"Parallax opacityStart propierties error:",100),this.#pe=vu(e?.opacityEnd,"Parallax opacityEnd propierties error:",0),this.#be=de(e?.limiterOff,"Parallax|Scrolltrigger limiterOff propierties error:",!1),this.#ge=e?.useWillChange,this.#X=$v(e?.tween);let r=this.#X?.getType&&this.#X.getType()===b.TWEEN_TIMELINE,o=this.#X?.getType&&this.#X.getType()===b.TWEEN_TWEEN;this.#q=An(e?.item,!1),this.#J=An(e?.scroller,!0),this.#j=An(e?.screen,!0),this.#Z=gu(e?.trigger),this.#oe=gu(e?.applyTo),this.#V=Bs(e?.direction,"Parallax/Scrolltrigger"),this.#ne=de(e?.disableForce3D,"Parallax|Scrolltrigger disableForce3D propierties error:",!1),this.#me=de(e?.useThrottle,"Parallax|Scrolltrigger useThrottle propierties error:",!1),this.#z=Dv(e?.type),this.#ye=ir(e?.perspective,"Parallax|Scrolltrigger perspective propierties error:",0),this.#he=Vo(e?.breakpoint,"breakpoint","parallax/scrolltrigger"),this.#de=Wo(e?.queryType,"queryType","parallax/scrolltrigger");let{propierties:n,shouldTrackOnlyEvents:s}=Vv(e?.propierties,this.#z,o,r);this.#le=n,this.#Ee=s,this.#Te=s?"100px":Bv(e?.range,this.#z),this.#ve=de(e?.ease,"Parallax|Scrolltrigger ease propierties error:",!1),r&&e?.easeType===b.EASE_SPRING&&rv(),this.#Ce=r?b.EASE_LERP:Wv(e?.easeType),this.#we=jv(e?.springConfig,this.#z),this.#Ie=zv(e?.lerpConfig,this.#z),this.#Re=this.#Ce===b.EASE_SPRING?{configProps:{precision:b.EASE_PRECISION}}:{precision:b.EASE_PRECISION},this.#ae=this.#Ce===b.EASE_SPRING?new Tt:new Pr}init(){if(this.#n){console.warn("Parallax/scrollTrigger: The init() method cannot be launched more than once. If you are passing the instance to components like horizontalScroller or smoothScroller via the children property, they will initialize the instance.");return}this.#n=!0,this.#We(),this.#Oe(),this.#Ae(),this.#$e(),this.#Le(),this.#De(),this.setPerspective(),this.#le===b.PROP_TWEEN&&(this.#Te=this.#X?.getDuration?this.#X.getDuration():0,this.#G=()=>this.#Te,this.#X?.inzializeStagger?.()),this.#z==b.TYPE_SCROLLTRIGGER&&(this.#be=!0,this.#Ne(),this.#Me()),this.#ve&&(this.#g=u.useScrollStart(()=>{this.#ne||(this.#O=!0)}),this.#m=u.useScrollEnd(()=>{u.useFrame(()=>{u.useNextTick(()=>{this.#xe()})})}),this.#J===globalThis&&(this.#r=Nu({pin:this.#I,ease:this.#ve,useThrottle:this.#me,callback:()=>{this.#xe()}})),this.#xe()),this.#ve||(this.#J===globalThis&&(this.#r=Nu({pin:this.#I,ease:this.#ve,useThrottle:this.#me,callback:()=>{this.#Se(),this.#_e()}})),this.#Se(),this.#_e(),this.#m=u.useScrollEnd(()=>{this.#_e({forceRender:!0})})),this.#J!==globalThis&&this.#W&&(this.#C=u.useScroll(()=>{this.#Me()})),this.#f=u.useResize(({horizontalResize:e})=>{e&&this.refresh()}),this.#I&&(this.#E=new qa,ve[this.#de](this.#he)&&u.useNextTick(()=>{this.#Fe(),this.#E?.init(this.#Pe()),this.#E?.onScroll(this.#c)}))}#Pe(){return{item:this.#q,marker:this.#W,screen:this.#j,animatePin:this.#B,anticipatePinOnLoad:this.#S,forceTranspond:this.#$,invertSide:this.#M,direction:this.#V,scrollerHeight:this.#o,getStart:()=>this.#P,getEnd:()=>this.#b}}setScroller(e){this.#J=An(e,!0)}setScreen(e){this.#j=An(e,!0)}setDirection(e){this.#V=Bs(e,"Parallax/Scrolltrigger")}setBreakPoint(e){this.#he=Vo(e,"breakpoint","Parallax/Scrolltrigger")}setQueryType(e){this.#de=Wo(e,"queryType","Parallax/Scrolltrigger")}setPerspective(){if(this.#ye&&this.#q&&this.#q.parentNode){let e={perspective:`${this.#ye}px`,"transform-style":"preserve-3d"},r=this.#q.parentNode;Object.assign(r.style,e)}}#We(){let e=b.PROP_SCALE||b.PROP_SCALE_X||b.PROP_SCALE_Y||b.PROP_OPACITY?1:0;switch(this.#ae.setData({val:e}),this.#D=this.#ae.subscribe(({val:r})=>{r!==this.#v&&(this.#le===b.PROP_TWEEN&&this.#X?.draw?(this.#X.draw({partial:r,isLastDraw:!1,useFrame:!1}),this.#v=r,this.#w=!1):this.#ke(r),u.useNextTick(()=>{this.#re&&this.#re({value:r,parentIsMoving:!0})}))}),this.#L=this.#ae.onComplete(({val:r})=>{this.#O=!1,this.#le===b.PROP_TWEEN&&this.#X?.draw?this.#X.draw({partial:r,isLastDraw:!0,useFrame:!1}):this.#ke(r),u.useNextTick(()=>{this.#re&&this.#re({value:r,parentIsMoving:!1})})}),this.#Ce){case b.EASE_LERP:{this.#Ie&&"updateVelocity"in this.#ae&&this.#ae?.updateVelocity?.(this.#Ie);break}case b.EASE_SPRING:{this.#we&&"updateConfig"in this.#ae&&this.#ae?.updateConfig?.(this.#we);break}}}#Ne(){if(this.#G){let e=this.#G();this.#d=Number.isNaN(e)?0:Number.parseFloat(e),this.#A=b.PX}else{let e=String(this.#Te),r=Hv(e,this.#le),o=Number.parseFloat(e);this.#d=Number.isNaN(o)?0:o,this.#A=bv(r)}}#Me(){let e=this.#o/100;if(this.#F&&this.#F?.position&&this.#F?.value?.()!==void 0){let{position:l,value:p}=this.#F,h=p();Number.isNaN(h)||(this.#Y=`${l} ${h}px`)}let{value:r,additionalVal:o,position:n}=vy(e,this.#Y,this.#V);if(this.#M=n===b.POSITION_TOP||n===b.POSITION_LEFT,this.#P=Pu(r,o,this.#V===b.DIRECTION_VERTICAL?this.#u:this.#s,this.#V===b.DIRECTION_VERTICAL?this.#s:this.#u),this.#U&&this.#U?.position&&this.#U?.value?.()!==void 0){let{position:l,value:p}=this.#U,h=p();Number.isNaN(h)||(this.#H=`${l} ${h}px`)}let{value:s,additionalVal:i,position:a}=yy(e,this.#H,this.#P,this.#o,this.#M,this.#V),c=this.#M?a===b.POSITION_BOTTOM||a===b.POSITION_RIGHT?-1:1:a===b.POSITION_BOTTOM||a===b.POSITION_RIGHT?1:-1;this.#b=Pu(s,i,this.#V===b.DIRECTION_VERTICAL?this.#u*c:this.#s*c,this.#V===b.DIRECTION_VERTICAL?this.#s*c:this.#u*c),this.#je(),this.#M&&(this.#P-=this.#u)}#je(){if(this.#W){let{startMarker:e,endMarker:r}=ly({startMarker:this.#x,endMarker:this.#y,startPoint:this.#P,endPoint:this.#b,screen:this.#j,direction:this.#V,invertSide:this.#M,label:this.#W});this.#x=e,this.#y=r}}#Ae(){let e=this.#Z??this.#q;if(!e)return;let r=0,o=0,n=0;this.#Z&&(r=xo(this.#Z)?.x??0,o=xo(this.#Z)?.y??0,n=xo(this.#Z)?.z??0),e.style.transform="",this.#V===b.DIRECTION_VERTICAL?this.#i=this.#J===globalThis?Math.trunc(be(e).top):Math.trunc(be(e).top)-be(this.#J).top:this.#i=this.#J===globalThis?Math.trunc(be(e).left):Math.trunc(be(e).left)-be(this.#J).left,this.#j&&this.#j!==globalThis&&(this.#i-=this.#V===b.DIRECTION_VERTICAL?Math.trunc(be(this.#j).top):Math.trunc(St(this.#j).left)),this.#Z&&(r!==0||o!==0||n!==0)&&(this.#Z.style.transform=`translate3D(${r}px, ${o}px, ${n}px)`)}#Oe(){this.#j===globalThis||!this.#j||(this.#l=this.#V===b.DIRECTION_VERTICAL?Math.trunc(be(this.#j).top):Math.trunc(St(this.#j).left))}#$e(){let e=this.#Z??this.#q;e&&(this.#u=this.#V===b.DIRECTION_VERTICAL?Math.trunc(e.offsetHeight):Math.trunc(e.offsetWidth))}#Le(){let e=this.#Z??this.#q;e&&(this.#s=this.#V===b.DIRECTION_VERTICAL?Math.trunc(e.offsetWidth):Math.trunc(e.offsetHeight))}#Fe(){this.#J&&(this.#J===globalThis?this.#c=this.#V===b.DIRECTION_VERTICAL?this.#J.scrollY:this.#J.scrollX:this.#c=this.#V===b.DIRECTION_VERTICAL?-be(this.#J).top:-be(this.#J).left)}#De(){this.#j&&(this.#e=window.innerWidth,this.#p=window.innerHeight,this.#j===globalThis?this.#o=this.#V===b.DIRECTION_VERTICAL?window.innerHeight:window.innerWidth:this.#o=this.#V===b.DIRECTION_VERTICAL?Math.trunc(this.#j.offsetHeight):Math.trunc(this.#j.offsetWidth))}refresh(){this.#I&&this.#E&&this.#E.destroy(),this.#Oe(),this.#Ae(),this.#$e(),this.#Le(),this.#De(),this.#z==b.TYPE_SCROLLTRIGGER&&(this.#Me(),this.#G&&this.#Ne(),this.#I&&this.#E&&ve[this.#de](this.#he)&&this.#E?.init(this.#Pe())),this.#v=void 0,this.#w=!0,ve[this.#de](this.#he)?this.#ve?this.#xe():(this.#Se(),this.#_e({forceRender:!0})):(this.#ve&&this.#ae?.stop?.(),u.useFrameIndex(()=>{this.#oe?(this.#Be(this.#oe),Object.assign(this.#oe.style,this.#Ve())):(this.#Be(this.#q),this.#q&&Object.assign(this.#q.style,this.#Ve()))},3))}move({value:e,parentIsMoving:r=!1}){if(!ve[this.#de](this.#he)||!e)return;this.#R=!0;let o=this.#ze(e);if(this.#ve)this.#xe(o);else{this.#Se(o);let n=this.#N||this.#w||void 0;this.#_e({forceRender:n,parentIsMoving:r})}}triggerScrollStart(){this.#ve&&(this.#ne||(this.#O=!0))}triggerScrollEnd(){this.#ve||this.#_e({forceRender:!0})}#ze(e){if(e!==void 0)return this.#j!==globalThis?e+this.#l:e}stopMotion(){this.#ae?.stop?.()}#Se(e){if(!ve[this.#de](this.#he)||(e?this.#c=-e:this.#Fe(),this.#N=gy({offset:this.#i,height:this.#u,gap:this.#a,wScrollTop:this.#c,wHeight:this.#o}),!this.#N&&!this.#be&&this.#z===b.TYPE_PARALLAX))return;this.#I&&this.#E&&this.#E.onScroll(this.#c),this.#z===b.TYPE_SCROLLTRIGGER?this.#h=_e(this.#He()):this.#le===b.PROP_OPACITY?this.#h=_e(this.#Ge()):this.#h=Number.isNaN(Number.parseInt(this.#ie))?_e(this.#qe()/2):_e(this.#Je()/2);let r=this.#ce&&this.#z!==b.TYPE_SCROLLTRIGGER?_y(this.#le,this.#h):this.#h;this.#h=this.#z===b.TYPE_SCROLLTRIGGER?r:this.#Ye(r)}#xe(e){if(!ve[this.#de](this.#he)||(this.#Se(e),!this.#k&&!this.#w&&this.#z===b.TYPE_SCROLLTRIGGER)||!this.#N&&!this.#w&&this.#z===b.TYPE_PARALLAX)return;let r=this.#w&&!this.#te?"set":"goTo";this.#ae&&this.#ae[r]({val:this.#h},this.#Re).catch(()=>{})}#_e({forceRender:e=!1,parentIsMoving:r=!1}={}){ve[this.#de](this.#he)&&u.useFrame(()=>{this.#h===this.#v&&!e||!this.#N&&!e||(!this.#ne&&!this.#R&&(this.#O=!e),!this.#ne&&this.#R&&(this.#O=r&&this.#N),this.#le===b.PROP_TWEEN?(this.#X.draw({partial:this.#h,isLastDraw:!this.#O,useFrame:!1}),this.#v=this.#h,this.#w=!1):this.#ke(this.#h),u.useNextTick(()=>{this.#re&&this.#re({value:this.#h,parentIsMoving:this.#O})}))})}#He(){let e=this.#M?-(this.#c+this.#P+this.#b-(this.#i+this.#b)):-(this.#c+this.#o-this.#P-(this.#i+this.#b)),r=this.#b/100*this.#d,o=e/100*this.#d,n=this.#ce?this.#M?r-o:o:this.#M?o:r-o,s=r>0?-nt(n,0,r):-nt(n,r,0);if(this.#k=this.#_!==s,this.#_=s,!this.#k&&!this.#w)return this.#h;let i=s*100/this.#b;switch((this.#K||this.#se||this.#ee||this.#Q)&&cy({prevValue:this.#T,value:n,maxVal:r,onEnter:this.#K,onEnterBack:this.#se,onLeave:this.#ee,onLeaveBack:this.#Q}),this.#T=n,this.#le){case b.PROP_HORIZONTAL:case b.PROP_VERTICAL:return this.#Ue(i);case b.PROP_SCALE:case b.PROP_SCALE_X:case b.PROP_SCALE_Y:case b.PROP_OPACITY:return 1-i;default:return-i}}#Ue(e){switch(this.#A){case b.VW:return this.#e/100*-e;case b.VH:return this.#p/100*-e;case b.WPERCENT:return this.#V===b.DIRECTION_VERTICAL?this.#s/100*-e:this.#u/100*-e;case b.HPERCENT:return this.#V===b.DIRECTION_VERTICAL?this.#u/100*-e:this.#s/100*-e;default:return-e}}#Ge(){let e=this.#o/100*this.#pe,r=this.#o-this.#o/100*this.#fe,o=this.#ie==b.ALIGN_START?-this.#c*-1:(this.#c+e-this.#i)*-1,n=this.#ie==b.ALIGN_START?1-o/this.#i:1-o/(this.#o-r-e);return nt(n,0,1)}#qe(){let e=Number(this.#Te),r=Number.isNaN(e)?0:e,o=this.#V===b.DIRECTION_VERTICAL?document.documentElement.scrollHeight:document.documentElement.scrollWidth;switch(this.#ie){case b.ALIGN_START:return(this.#c+this.#l)/r;case b.ALIGN_TOP:case b.ALIGN_LEFT:return(this.#c-this.#i)/r;case b.ALIGN_CENTER:return(this.#c+(this.#o/2-this.#u/2)-this.#i)/r;case b.ALIGN_BOTTOM:case b.ALIGN_RIGHT:return(this.#c+(this.#o-this.#u)-this.#i)/r;case b.ALIGN_END:return-(o-(this.#c+this.#o))/r;default:return 0}}#Je(){let e=Number(this.#ie),r=Number(this.#Te);return(this.#c+this.#o/100*e-this.#i)/r}#Ye(e){return Ty({switchPropierties:this.#ue,isReverse:this.#ce,value:e})}#ke(e){this.#v=e,this.#w=!1;let r=this.#oe||this.#q;if(!r||this.#Ee)return;let o=this.#O?"translate3D(0px, 0px, 0px)":"";this.#t=this.#ge?u.mustMakeSomething():!1;let n=this.#t&&this.#O?"transform":"",s=u.shouldMakeSomething()?Math.round(e):e;switch(this.#le){case b.PROP_VERTICAL:{r.style.transform=`${o} translateY(${s}px)`,r.style.willChange=n;break}case b.PROP_HORIZONTAL:{r.style.transform=`${o} translateX(${s}px)`,r.style.willChange=n;break}case b.PROP_ROTATE:{r.style.transform=`${o} rotate(${s}deg)`,r.style.willChange=n;break}case b.PROP_ROTATEY:{r.style.transform=`${o} rotateY(${s}deg)`,r.style.willChange=n;break}case b.PROP_ROTATEX:{r.style.transform=`${o} rotateX(${s}deg)`,r.style.willChange=n;break}case b.PROP_ROTATEZ:{r.style.transform=`${o} rotateZ(${s}deg)`,r.style.willChange=n;break}case b.PROP_OPACITY:{r.style.opacity=`${e}`;break}case b.PROP_SCALE:{let i=this.#z===b.TYPE_SCROLLTRIGGER?e:1+e/1e3;r.style.transform=`${o} scale(${i})`,r.style.willChange=n;break}case b.PROP_SCALE_X:{let i=this.#z===b.TYPE_SCROLLTRIGGER?e:1+e/1e3;r.style.transform=`${o} scaleX(${i})`,r.style.willChange=n;break}case b.PROP_SCALE_Y:{let i=this.#z===b.TYPE_SCROLLTRIGGER?e:1+e/1e3;r.style.transform=`${o} scaleY(${i})`,r.style.willChange=n;break}default:{r.style[this.#le.toLowerCase()]=`${e}px`;break}}}#Be(e){this.#X&&e&&(e.style="")}#Ve(){if(!this.#Ee)switch(this.#le){case b.PROP_VERTICAL:case b.PROP_HORIZONTAL:case b.PROP_ROTATE:case b.PROP_ROTATEY:case b.PROP_ROTATEX:case b.PROP_ROTATEZ:case b.PROP_SCALE:return{transform:""};case b.PROP_OPACITY:return{opacity:""};default:return{[this.#le.toLowerCase()]:""}}}destroy(){this.#ae?.stop?.(),this.#r(),this.#g(),this.#m(),this.#f(),this.#D(),this.#L(),this.#C(),this.#ae?.destroy?.(),this.#ae=null,this.#G=()=>{},this.#F?.value&&(this.#F.value=()=>0),this.#U?.value&&(this.#U.value=()=>0),this.#K=()=>{},this.#se=()=>{},this.#ee=()=>{},this.#Q=()=>{},this.#re=()=>{},this.#I&&this.#E&&this.#E?.destroy?.(),this.#x&&this.#x?.remove?.(),this.#y&&this.#y?.remove?.(),this.#x=void 0,this.#y=void 0,this.#E=void 0,this.#h=0;let e=this.#oe??this.#q;e&&"style"in e&&(e.style=""),this.#q=null,this.#J=null,this.#j=null,this.#Z=null,this.#oe=null}};function EI(t){return new mo({...t,type:b.TYPE_PARALLAX})}function wI(t){return new mo({...t,type:b.TYPE_SCROLLTRIGGER})}var Au=window.innerHeight,Ou=document.body.offsetHeight,ho=!1,$u=!0,zt=window.scrollY,qs=!0,Ht=!1,Lu=()=>{},Fu=()=>{},Ya=()=>{},Ja,Sy=()=>{document.body.classList.remove("is-whelling")},II=()=>{document.body.classList.add("is-whelling")};ue.setDefault({usePassive:!1});var MI=({velocity:t,rootElement:e})=>{let r=H.createLerp({data:{scrollValue:window.scrollY},precision:1,velocity:.1});Ja=e;let o=r.subscribe(({scrollValue:h})=>{Ht||window.scrollTo({top:Math.round(h),left:0,behavior:"instant"})});r.onComplete(()=>{zt=window.scrollY});let n=u.useMouseWheel(h=>{if(Ht)return;h.preventDefault(),qs=!1,II();let f=h.spinY??0,d=ue.clamp(f*t+zt,0,Ou-Au);zt=d,r.goTo({scrollValue:d}).catch(()=>{})}),s=u.useMouseWheel(({preventDefault:h})=>{$u&&h()}),i=u.useMouseWheel(u.debounce(()=>{Sy()},500)),a=u.useScrollEnd(()=>{let h=window.scrollY;zt=h,r.setImmediate({scrollValue:h})}),c=u.useScroll(()=>{if(!qs)return;let h=window.scrollY;zt=h,r.setImmediate({scrollValue:h})}),l=u.usePointerDown(()=>{Ht||(Sy(),r.stop(),zt=window.scrollY,qs=!0)}),p=new ResizeObserver(()=>{r.stop(),r.setImmediate({scrollValue:window.scrollY}),zt=window.scrollY,Au=window.innerHeight,Ou=document.body.offsetHeight});return p.observe(e),{destroy:()=>{ho=!1,zt=0,qs=!0,Ht=!1,Ja&&(p.unobserve(Ja),p.disconnect()),r?.stop(),r?.destroy(),r=null,Ja=null,o(),c(),a(),n(),l(),i(),s(),Lu=()=>{},Fu=()=>{},Ya=()=>{}},stop:()=>{r.stop(),zt=window.scrollY},update:()=>{r.setImmediate({scrollValue:window.scrollY})}}},Xa=({velocity:t=100,rootElement:e=document.createElement("div")}={})=>{ho||(zt=window.scrollY,ho=!0,Ht=!1,Au=window.innerHeight,Ou=document.body.offsetHeight,$u=!0,qs=!1,{destroy:Lu,stop:Fu,update:Ya}=MI({velocity:t,rootElement:e}))},ur=()=>{!ho||Ht||(Fu(),Ht=!0)},Ut=()=>{!ho||!Ht||(Ht=!1)},Js=()=>{!ho||!Ht||(Ya(),zt=window.scrollY,Ht=!1)},Du=()=>{ho&&Ya()},Bu=()=>{Lu()},xy=()=>{$u=!0};var Cy=()=>ho;var Ey="easeOutQuad",Ys=new Nr({ease:Ey,data:{val:0}}),Ka=!1,Vu=!1;Ys.subscribe(({val:t})=>{window.scrollTo({top:t,left:0,behavior:"auto"}),Du()});var Wu=()=>{Vu&&(document.body.style.overflow=""),Ys?.updateEase?.(Ey),Js()},ju=()=>{Ka&&(Ys.stop(),Wu())};u.useMouseWheel(()=>{ju()});u.useMouseDown(()=>{ju()});u.useTouchStart(()=>{ju()});var Ar={to:(e,r)=>{if(typeof globalThis>"u")return;let o=e?Yc(e)||u.checkType(Number,e)?Yc(e)?be(e).top:e:(console.warn(`bodyScroll ${e} is not valid target, must be a node or a number`),0):0,n=ir(r?.duration,"bodyScroll: duration",500);return Vu=de(r?.overflow,"bodyScroll: overflow",!1),Pa(r?.ease)&&Ys?.updateEase?.(r?.ease),Vu&&(document.body.style.overflow="hidden"),new Promise(s=>{Ka=!0,ur(),Ys.goFromTo({val:window.scrollY},{val:o},{duration:n}).then(()=>{Wu(),Ka=!1,s(!0)}).catch(()=>{Wu(),Ka=!1,s(!0)})})}};var Xs={END:"END",START:"START",CENTER:"CENTER"};var kI=t=>{switch(t){case Xs.END:return"align-items:flex-end;";case Xs.CENTER:return"align-items:center;";default:return"align-items:flex-start;"}},wy=({mainContainer:t,queryType:e,breakpoint:r,container:o,trigger:n,row:s,column:i,shadow:a,useSticky:c,columnHeight:l,columnWidth:p,columnAlign:h})=>{let f=ve.getBreackpoint(r),d="user-select:none",y=c?"relative":"absolute",v=c?"position:sticky;top:0;":"",T=kI(h),S=p?`width:${p}vw;`:"",_=`
      @media (${e}-width:${f}px){${o}{position:relative;${d}}}@media (${e}-width:${f}px){${n}{z-index:10;position:${y};pointer-events:none;overflow:hidden;top:0;left:0;right:0}}@media (${e}-width:${f}px){${s}{--sectionheight:${l}vh}}@media (${e}-width:${f}px){${s}{display:flex;height:100vh;${v}${T}}}@media (${e}-width:${f}px){${i}{height:var(--sectionheight);flex:0 0 auto;${S}}}.${a}{display:none}@media (${e}-width:${f}px){.${a}{width:100%;display:block;pointer-events:none}}.${a}{display:none}@media (${e}-width:${f}px){.${a}{pointer-events:none;display:block;position:absolute;left:0;right:0}.${a}--end,.${a}--in-center,.${a}--left,.${a}--out-center{opacity:0;border:1px red dashed;width:25%}.${a}--end.debug,.${a}--in-center.debug,.${a}--left.debug,.${a}--out-center.debug{opacity:1}.${a}--in-center{position:absolute;top:0;right:0;padding:0 40px;text-align:center}.${a}--out-center{position:absolute;top:0;right:0;padding:0 40px;text-align:center}.${a}--left{position:absolute;top:0;left:50%;transform:translateX(-50%);padding:0 40px;text-align:center}.${a}--end{position:absolute;top:0;left:0;padding-left:40px}}`,E=document.createElement("div");E.classList.add("scroller-style");let x=document.createElement("style");x.append(document.createTextNode(_)),E.append(x),t.prepend(E)};var Ks=class{#n=!0;#t=0;#i=!1;#l=0;#h=100;#u=100;#s=!1;#c=0;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#x;#y;#v;#T;#k;#_;#w;#N;#R;#O;#E;#A;#P;#b;#D;#L;#I;#B;#$;#S;#Y;#H;#M;#W;#F;#U;#G;#te;#K;#se;#ee;#Q;#re;#ie;#ue;#ce;#fe;#pe;constructor(e){this.#o=()=>{},this.#pe=0,this.#B=e?.container??"",this.#W=[],this.#F=!1,this.#U=0,this.#G={},this.#te=0,this.#K=e?.children||[],this.#e=de(e?.useDrag,"HorizontalScroller: useDrag",!1),this.#p=ir(e?.threshold,"HorizontalScroller: threshold",30),this.#a=de(e?.useWillChange,"HorizontalScroller: useWillChange",!1),this.#d=Vo(e?.breakpoint,"breakpoint","horizontalScroller"),this.#f=Wo(e?.queryType,"queryType","horizontalScroller"),this.#r=de(e?.forceTranspond,"HorizontalScroller: forceTranspond",!1),this.#g=de(e?.addCss,"HorizontalScroller: addCss",!0),this.#m=de(e?.animateAtStart,"HorizontalScroller: animateAtStart",!1),this.#C=de(e?.ease,"HorizontalScroller: ease",!1),this.#x=$a(e?.easeType??"","HorizontalScroller"),this.#y=de(e?.useSticky,"HorizontalScroller: useSticky",!1),this.#v=de(e?.animatePin,"HorizontalScroller: animatePin",!1),this.#T=de(e?.reverse,"HorizontalScroller: reverse",!1),this.#k=de(e?.useThrottle,"HorizontalScroller: useThrottle",!1),this.#_=ir(e?.columnHeight,"HorizontalScroller: columnHeight",100),this.#w=ir(e?.columnWidth,"HorizontalScroller: columnWidth",null),this.#N=e?.columnAlign?e.columnAlign.toUpperCase():Xs.START,this.#R=ct(e?.onEnter,"HorizontalScroller: onEnter",ee),this.#O=ct(e?.onEnterBack,"HorizontalScroller: onEnterBack",ee),this.#E=ct(e?.onLeave,"HorizontalScroller: onLeave",ee),this.#A=ct(e?.onLeaveBack,"HorizontalScroller: onLeaveBack",ee),this.#P=ct(e?.afterInit,"HorizontalScroller: afterInit",ee),this.#b=ct(e?.afterRefresh,"HorizontalScroller: afterRefresh",ee),this.#D=ct(e?.afterDestroy,"HorizontalScroller: afterDestroy",ee),this.#L=ct(e?.onTick,"HorizontalScroller: onTick",void 0),this.#I=u.checkType(String,e.root)?document.querySelector(e.root):e.root,this.#I||(this.#n=!1,console.warn("horizontal custom: root node not found")),this.#I.querySelector(this.#B)||(this.#n=!1,console.warn("horizontal custom: container node not found")),this.#$=this.#I.querySelector(e.trigger),this.#$||(this.#n=!1,console.warn("horizontal custom: trigger node not found")),this.#S=this.#I.querySelector(e.row),this.#S||(this.#n=!1,console.warn("horizontal custom: row node not found")),this.#Y=this.#I.querySelectorAll(e.column),this.#Y.length===0&&(this.#n=!1,console.warn("horizontal custom: column nodeList not found")),this.#H=this.#I.querySelectorAll("[data-shadow]");let o=e?.shadowClass||"shadow";this.#M=o.replace(".",""),this.#W=this.#S.querySelectorAll("a, button"),this.#K.forEach(n=>{this.#S&&n.setScroller(this.#S),n.setDirection("horizontal"),n.setBreakPoint(this.#d),n.setQueryType(this.#f),n.init()}),this.#g&&wy({mainContainer:this.#I,queryType:this.#f,breakpoint:this.#d,container:this.#B,trigger:e?.trigger??"trigger",row:e.row,column:e.column,shadow:this.#M,useSticky:this.#y,columnHeight:this.#_,columnWidth:this.#w,columnAlign:this.#N}),this.#se=n=>{if(!this.#i)return;let{movementX:s}=n,i=this.#T?s:-s;this.#X(i)},this.#ee=()=>{ve[this.#f](this.#d)&&(ur(),this.#s&&this.#S&&(this.#S.style.cursor="move"),this.#i=!0,this.#pe=this.#c)},this.#Q=()=>{Ut(),this.#i=!1,u.useFrame(()=>{this.#S&&(this.#S.style.cursor="")})},this.#re=()=>{Ut(),this.#i=!1,u.useFrame(()=>{this.#S&&(this.#S.style.cursor="")})},this.#ie=n=>{ve[this.#f](this.#d)&&(ur(),this.#l=-n.touches[0].clientX,this.#i=!0,this.#pe=this.#c)},this.#ue=()=>{Ut(),this.#i=!1},this.#ce=n=>{let s=-n.touches[0].clientX,i=this.#T?-s+this.#l:s-this.#l;this.#X(i),this.#l=s,this.#s&&n.cancelable&&n.defaultPrevented&&n.preventDefault()},this.#fe=n=>{Math.abs(this.#c-this.#pe)>this.#p&&n.preventDefault()}}init(){this.#n&&Ua(this.#oe.bind(this),this.#Z.bind(this),this.#V.bind(this),this.#me.bind(this))().then(()=>{this.#z(),this.#e&&this.#J(),u.useResize(({horizontalResize:e})=>this.onResize(e)),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#P?.(),this.#K.forEach(e=>{e.refresh()})})},3)})}#be(){[...this.#W].forEach(e=>e.setAttribute("draggable","false"))}#ge(){[...this.#W].forEach(e=>e.removeAttribute("draggable"))}#X(e){this.#s&&u.useFrame(()=>window.scrollBy({top:e,left:0,behavior:"instant"}))}#q(){let e=window.scrollY;this.#s=this.#t-this.#u<e&&this.#t+this.#h+this.#U>e+window.innerHeight}#J(){this.#o=u.useScroll(()=>this.#q()),this.#q(),this.#S.addEventListener("click",this.#fe,{passive:!1}),this.#S.addEventListener("mousedown",this.#ee,{passive:!0}),this.#S.addEventListener("mouseup",this.#Q,{passive:!0}),this.#S.addEventListener("mouseleave",this.#re,{passive:!0}),this.#S.addEventListener("touchstart",this.#ie,{passive:!0}),this.#S.addEventListener("touchend",this.#ue,{passive:!0}),this.#S.addEventListener("mousemove",this.#se,{passive:!0}),this.#S.addEventListener("touchmove",this.#ce,{passive:!0})}#j(){this.#o(),this.#S.removeEventListener("click",this.#fe),this.#S.removeEventListener("mousedown",this.#ee),this.#S.removeEventListener("mouseup",this.#Q),this.#S.removeEventListener("mouseleave",this.#re),this.#S.removeEventListener("touchstart",this.#ie),this.#S.removeEventListener("touchend",this.#ue),this.#S.removeEventListener("mousemove",this.#se),this.#S.removeEventListener("touchmove",this.#ce)}#Z(){return!this.#$||!this.#I||!this.#S?new Promise(e=>{e(!0)}):new Promise(e=>{u.useFrame(()=>{let r=this.#U;this.#te=100*(r-window.innerWidth)/r,r>0&&(this.#$.style.height=`${r}px`,this.#I.style.height=`${r}px`,this.#S.style.width=`${r}px`),e(!0)})})}#oe(){return new Promise(e=>{u.useFrame(()=>{if(!ve[this.#f](this.#d)){e(!0);return}this.#U=[...this.#Y].map(r=>je(r)).reduce((r,o)=>r+o,0),e(!0)})})}#V(){return this.#$?new Promise(e=>{u.useFrame(()=>{if(!ve[this.#f](this.#d)||!this.#H){e(!0);return}let r=[...this.#H].map(o=>{let n=o.dataset.shadow,s=Object.hasOwn(o.dataset,"debug"),i=s?"debug":"",a=s?`left left : ${n}`:"",c=s?`in center : ${n}`:"",l=s?`center out : ${n}`:"",p=s?`in out : ${n}`:"";return` <div
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
                        </div>`}).join("");this.#$.innerHTML=r,e(!0)})}):new Promise(e=>{e(!0)})}#ne(){this.#$&&(this.#$.innerHTML="")}#me(){return new Promise(e=>{if(!ve[this.#f](this.#d)){e(!0);return}u.useFrame(()=>{this.#H&&([...this.#H].forEach(r=>{let o=this.#te/100,n=r.dataset.shadow,s=je(r),i=le(this.#S),a=xo(this.#S)?.x??0,c=this.#T?this.#U-(r.getBoundingClientRect().right-a):r.getBoundingClientRect().left-a,l=window.innerWidth/window.innerHeight,p=window.innerWidth-window.innerHeight,h=c/l,f=c-c/l,d=this.#I.querySelector(`.${this.#M}[data-shadow="${n}"]`),y=d?.querySelector(`.${this.#M}--in-center`),v=d?.querySelector(`.${this.#M}--out-center`),T=d?.querySelector(`.${this.#M}--left`),S=d?.querySelector(`.${this.#M}--end`),_=window.innerWidth>window.innerHeight?window.innerHeight:0,E=window.innerWidth>window.innerHeight?window.innerHeight/2:0,x=c===0?0:h+f/o-p/o,w=(()=>{let A=window.innerWidth>window.innerHeight?p/o:p/o+window.innerWidth/l;return c===0?0:A})(),I=(()=>{let A=s/l,O=(s-s/l)/o;return A+O+w})(),N=I/2+E;this.#y&&(this.#$.style["margin-top"]=`-${i}px`),d&&(d.style.top=`${x}px`),y&&(y.style.height=`${N}px`),v&&(v.style.height=`${N}px`),v&&(v.style.top=`${N}px`),T&&(T.style.height=`${w}px`),S&&(S.style.height=`${I+_}px`),d&&(d.style.height=`${w}px`)}),e(!0))})})}#z(){if(!this.#$||!ve[this.#f](this.#d))return;let e=new mo({type:"scrolltrigger",item:this.#S,useWillChange:this.#a,trigger:this.#$,propierties:"x",breakpoint:"xSmall",pin:!this.#y,animatePin:this.#v,ease:this.#C,forceTranspond:this.#r,useThrottle:this.#k,easeType:this.#x,springConfig:"scroller",animateAtStart:this.#m,reverse:this.#T,dynamicRange:()=>-(this.#U-window.innerWidth),dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>this.#U},onTick:({value:r,parentIsMoving:o})=>{let n=r??0,s=Math.abs(-Math.round(n*100/(this.#U-window.innerWidth)));this.#c=n,this.#L&&this.#L({value:n,parentIsMoving:o,percent:this.#T?100-s:s}),this.#K.forEach(i=>{i.move({value:n,parentIsMoving:o})})},onEnter:this.#R,onEnterBack:this.#O,onLeave:this.#E,onLeaveBack:this.#A});e.init(),this.#F=!0,this.#G=e,this.#t=be(this.#$).top,this.#be()}#ye(){Ua(this.#oe.bind(this),this.#Z.bind(this),this.#V.bind(this),this.#me.bind(this))().then(()=>{this.#z(),this.#he()})}#he(){u.useFrameIndex(()=>{u.useNextTick(()=>{this.#b?.(),this.#K.forEach(e=>{e?.refresh?.()})})},3)}refresh(){return!this.#F||!ve[this.#f](this.#d)?new Promise(e=>e(!0)):new Promise(e=>{Ua(this.#oe.bind(this),this.#Z.bind(this),this.#me.bind(this))().then(()=>{this.#G?.stopMotion?.(),this.#t=be(this.#$).top,this.#F&&(this.#G?.refresh?.(),this.#he()),e(!0)})})}#de({destroyAll:e=!1}){(this.#F||e)&&(this.#G?.destroy?.(),this.#G=null,this.#$&&(this.#$.style.height=""),this.#I&&(this.#I.style.height=""),this.#$&&(this.#$.style.marginTop=""),this.#ne(),this.#ge(),this.#F=!1,u.useFrameIndex(()=>{if(this.#S&&(this.#S.style.width="",this.#S.style.transform=""),e&&this.#I){this.#e&&this.#j();let r=this.#I.querySelector(".scroller-style");r&&r.remove(),this.#I=null,this.#$=null,this.#S=null,this.#Y=[],this.#H=[],this.#P=ee,this.#b=ee,this.#L=ee,this.#R=ee,this.#O=ee,this.#E=ee,this.#A=ee,this.#G=null,this.#F=!1,this.#W=[],this.#I=null,this.#B=null,this.#$=null,this.#S=null,u.useNextTick(()=>{this.#D?.(),this.#D=ee,this.#K.forEach(o=>{o?.destroy?.(),o=null}),this.#K=[]})}},3))}onResize(e){this.#F&&ve[this.#f](this.#d)?e&&this.refresh():!this.#F&&ve[this.#f](this.#d)?this.#ye():this.#F&&!ve[this.#f](this.#d)&&this.#de({destroyAll:!1})}destroy(){this.#de({destroyAll:!0})}};var Qs=new Map,Qa=t=>{let e=u.checkType(Element,t);return e||console.warn(`slide utils ${t} is not a valid Dom element`),e},RI=t=>{let e=new Nr({ease:"easeOutQuad",data:{val:0}});return{tween:e,unsubscribe:e.subscribe(({val:r})=>{t.style.height=`${r}px`})}},Or={subscribe:n=>{if(!Qa(n))return()=>{};if(Qs.has(n))return console.warn(`slide utils ${n} is alredysubscribed`),()=>{};let i=RI(n);return Qs.set(n,i),()=>{i.unsubscribe();let{tween:a}=i;a.destroy(),Qs.delete(n)}},reset:n=>{Qa(n)&&(n.style.height="0",n.style.overflow="hidden")},up:async n=>{if(!Qa(n))return new Promise(c=>c(!0));let s=Qs.get(n);if(!s)return console.warn("slide element not exist in slide store"),new Promise(c=>c(!0));let{tween:i}=s,a=le(n);await i.goFromTo({val:a},{val:0},{duration:500})},down:async n=>{if(!Qa(n))return new Promise(l=>l(!0));let s=Qs.get(n);if(!s)return console.warn("slide element not exist in slide store"),new Promise(l=>l(!0));let{tween:i}=s,{val:a}=i.get();n.style.height="auto";let c=le(n);n.style.height=`${a}px`,await i.goTo({val:c},{duration:500}),u.useNextTick(()=>{n.style.height="auto"})}};var _t=class{#n=!0;#t=0;#i=0;#l=0;#h=0;#u=0;#s=30;#c=0;#o=!1;#e=0;#p=0;#a;#d;#f;#r;#g;#m;#C;#x;#y;#v;#T;#k;#_;#w;#N;#R;#O;#E;#A;#P;#b;#D;#L;#I;#B;#$;#S;#Y;#H;#M;#W=!1;#F;#U;#G;#te=0;#K=0;#se;#ee;#Q;constructor(e){this.#a=ee,this.#d=ee,this.#f=ee,this.#r=ee,this.#g=ee,this.#m=ee,this.#C=ee,this.#x=ee,this.#y=ee,this.#v=ee,this.#T=ee,this.#k=ee,this.#_={},this.#w=ee,this.#N=ee,this.#R=Bs(e?.direction,"SmoothScroller"),this.#O=!1,this.#E=$a(e?.easeType??"","SmoothScroller"),this.#A=Vo(e?.breakpoint,"breakpoint","SmoothScroller"),this.#P=Wo(e?.queryType,"queryType","SmoothScroller"),this.#b=u.checkType(String,e?.scroller)?document.querySelector(e.scroller):e.scroller,this.#b||(console.warn("SmoothScroller: scroller node not found"),this.#n=!1),this.#D=e?.screen?u.checkType(String,e.screen)?document.querySelector(e.screen):e.screen:document.documentElement,this.#D||(this.#n=!1,console.warn("SmoothScroller: screen node not found")),this.#L=de(e?.scopedEvent,"SmoothScroller: scopedEvent",!1),this.#I=ir(e?.speed,"SmoothScroller: speed",60),this.#B=de(e?.drag,"SmoothScroller: drag",!1),this.#$=ct(e?.onTick,"SmoothScroller: onTick",ee),this.#S=ct(e?.onUpdate,"SmoothScroller: onUpdate",ee),this.#Y=ct(e?.onSwipe,"SmoothScroller: onSwipe",ee),this.#ee=de(e?.useSwipe,"SmoothScroller: useSwipe",!1),this.#Q=de(e?.revertSwipeDirection,"SmoothScroller: revertSwipeDirection",!1),this.#se=de(e?.useHorizontalScroll,"SmoothScroller: useBothAxis",!1),this.#H=ct(e?.afterRefresh,"SmoothScroller: afterRefresh",ee),this.#M=ct(e?.afterInit,"SmoothScroller: afterInit",ee),this.#F=e?.children||[],this.#F.forEach(r=>{r.setScroller(this.#b),r.setDirection(this.#R),r.setScreen(this.#D),r.setBreakPoint(this.#A),r.setQueryType(this.#P),r.init()}),this.#U=r=>{this.#ie();let{spinY:o}=u.normalizeWheel(r);this.#J({spinY:o})},this.#G=r=>{let{clientX:o,clientY:n}=r.touches?r.touches[0]:r;this.#X({client:{x:o,y:n}})},this.#k=u.useMouseWheel(u.debounce(()=>{this.#re()},500))}#re(){this.#b&&this.#b.classList.remove("is-whelling")}#ie(){this.#b&&this.#b.classList.add("is-whelling")}#ue(){return this.#c>0}init(){this.#n&&(this.#E===b.EASE_SPRING?this.#_=new Tt:(this.#_=new Pr,this.#_.updateVelocity(.1)),this.#L&&(this.#b.addEventListener("wheel",this.#U,{passive:!0}),this.#b.addEventListener("mousemove",this.#G,{passive:!0}),this.#b.addEventListener("touchmove",this.#G,{passive:!0})),this.#L||(this.#x=u.useMouseWheel(e=>{this.#ce(e),this.#V(e)}),this.#y=u.useMouseMove(e=>this.#oe(e)),this.#v=u.useTouchMove(e=>this.#oe(e))),this.#a=u.useResize(()=>this.refresh()),this.#d=u.useScrollStart(()=>this.#ge()),this.#f=u.useScrollEnd(()=>this.#ge()),this.#r=u.useTouchStart(e=>this.#j(e)),this.#g=u.useTouchEnd(e=>this.#Z(e)),this.#m=u.useMouseDown(e=>this.#j(e)),this.#C=u.useMouseUp(e=>this.#Z(e)),this.#b.addEventListener("mouseleave",()=>{Ut()}),this.#B&&(this.#T=u.useMouseClick(({target:e,preventDefault:r})=>{this.#me({target:e,preventDefault:r})})),this.#be(),ve[this.#P](this.#A)&&(this.#fe(),this.#ge()),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#O||(this.#M?.({shouldScroll:this.#ue()}),this.#F.forEach(e=>{e.refresh()}))})},3))}#ce({pixelX:e}){if(!(!this.#ee||!e||this.#W||this.#Y.length===0)&&Math.abs(e)>40){this.#W=!0;let r=e>0?-1:1,o=this.#Q?r:r*-1;this.#Y({direction:o,move:n=>this.move(n).catch(()=>{})}),setTimeout(()=>{this.#W=!1},500)}}#fe(){if(!this.#b)return;this.#b.style["user-select"]="none",[...this.#b.querySelectorAll("a, button")].forEach(r=>{r.setAttribute("draggable","false"),r.style["user-select"]="none"})}#pe(){if(!this.#b)return;this.#b.style["user-select"]="",[...this.#b.querySelectorAll("a, button")].forEach(r=>{r.removeAttribute("draggable"),r.style["user-select"]=""})}#be(){this.#_&&(this.#_.setData({val:0}),this.#w=this.#_.subscribe(({val:e})=>{this.#b.style.transform=this.#R==b.DIRECTION_VERTICAL?`translate3d(0px, 0px, 0px) translateY(${-Math.trunc(e)}px)`:`translate3d(0px, 0px, 0px) translateX(${-Math.trunc(e)}px)`,this.#F.forEach(r=>{r.triggerScrollStart()}),u.useNextTick(()=>{this.#$({value:-e,percent:this.#i,parentIsMoving:!0}),this.#F.forEach(r=>{r.move({value:-e,parentIsMoving:!0})})})}),this.#N=this.#_.onComplete(({val:e})=>{this.#b.style.transform=this.#R==b.DIRECTION_VERTICAL?`translateY(${-Math.trunc(e)}px)`:`translateX(${-Math.trunc(e)}px)`,u.useNextTick(()=>{this.#$({value:-e,percent:this.#i,parentIsMoving:!1}),this.#F.forEach(r=>{r.triggerScrollEnd(),r.move({value:-e,parentIsMoving:!1})})})}))}#ge(){this.#D&&(this.#l=this.#D===document.documentElement?window.innerWidth:je(this.#D),this.#h=this.#D===document.documentElement?window.innerHeight:le(this.#D),this.#c=this.#R===b.DIRECTION_VERTICAL?this.#b.offsetHeight-this.#h:this.#b.offsetWidth-this.#l,this.#ne())}#X({client:e}){!this.#o||!this.#B||(this.#e=this.#p,this.#p=this.#z({x:e?.x??0,y:e?.y??0}),this.#t+=Math.round(this.#e-this.#p),this.#ne())}#q(){return this.#R===b.DIRECTION_HORIZONTAL?this.#l/1920:this.#h/1080}#J({spinY:e=0}){if(!ve[this.#P](this.#A))return;this.#o=!1;let r=this.#q(),o=nt(e,-1,1);this.#t+=o*this.#I*r,this.#ne()}#j({target:e,client:r}){ve[this.#P](this.#A)&&(e===this.#b||rs(this.#b,e))&&(this.#u=this.#t,this.#o=!0,this.#e=this.#z({x:r?.x??0,y:r?.y??0}),this.#p=this.#z({x:r?.x??0,y:r?.y??0}))}#Z(){this.#o=!1}#oe({target:e,client:r,preventDefault:o}){if((e===this.#b||rs(this.#b,e))&&this.#o&&this.#B){o(),this.#e=this.#p,this.#p=this.#z({x:r?.x??0,y:r?.y??0});let n=Math.round(this.#e-this.#p);this.#t+=n,this.#ne()}}#V({target:e,spinY:r=0,spinX:o=0,preventDefault:n}){if(ve[this.#P](this.#A)&&(this.#ie(),e===this.#b||rs(this.#b,e))){this.#o=!1,n?.(),ur();let s=Math.abs(this.#te-o),i=Math.abs(this.#K-r),a=this.#se&&!this.#ee&&s>i?o:r;if(Math.abs(a)===0)return;let c=this.#q();this.#t+=nt(a,-1,1)*this.#I*nt(c,1,10),this.#ne(),this.#K=r,this.#te=o}}move(e){return ve[this.#P](this.#A)?(this.#i=e,this.#t=this.#i*this.#c/100,this.#_.goTo({val:this.#t})):new Promise(r=>r())}set(e){ve[this.#P](this.#A)&&(this.#i=e,this.#t=this.#i*this.#c/100,this.#_.set({val:this.#t}))}#ne(){let e=this.#t*100/this.#c;this.#i=nt(e,0,100),this.#t=nt(this.#t,0,this.#c),this.#_.goTo({val:this.#t}).catch(()=>{}),this.#S?.({value:-this.#t,percent:this.#i,parentIsMoving:!0})}#me({target:e,preventDefault:r}){ve[this.#P](this.#A)&&(e===this.#b||rs(this.#b,e))&&Math.abs(this.#t-this.#u)>this.#s&&r()}#z({x:e,y:r}){return!e||!r?0:this.#R===b.DIRECTION_VERTICAL?r:e}refresh(){if(!ve[this.#P](this.#A)){this.#pe(),this.#_?.stop?.(),u.useFrame(()=>{u.useNextTick(()=>{this.#b.style.transform=""})});return}this.#ge(),this.#fe(),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#H?.({shouldScroll:this.#ue()}),this.#F.forEach(e=>{e.refresh()})})},2)}destroy(){this.#O=!0,this.#pe(),this.#a(),this.#d(),this.#f(),this.#r(),this.#g(),this.#m(),this.#C(),this.#x(),this.#y(),this.#v(),this.#T(),this.#w(),this.#N(),this.#k(),this.#_?.destroy(),this.#_=null,this.#F.forEach(e=>{e?.destroy?.()}),this.#F=[],this.#$=ee,this.#S=ee,this.#H=ee,this.#M=ee,this.#L&&(this.#b?.removeEventListener("wheel",this.#U),this.#b?.removeEventListener("mousemove",this.#G),this.#b?.removeEventListener("touchmove",this.#G)),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#b=null,this.#D=null})},3)}};var Iy=!1,PI=new Set(["scrollerN0","scrollerN1"]),My=()=>{let t=document.querySelector("#root");t&&(Xa({rootElement:t}),m.mainStore.watch("beforeRouteChange",()=>{ur(),xy()}),m.mainStore.watch("afterRouteChange",()=>{let e=m.getActiveRoute()?.route;Iy=PI.has(e),u.useFrameIndex(()=>{if(Iy){Bu();return}!Cy()&&Xa({rootElement:t}),Js()},30)}))};function ky(){let t=navigator.userAgent,e=document.body;if(/chrome|chromium|crios/i.test(t)){e.classList.add("is-chrome");return}if(/firefox|fxios/i.test(t)){e.classList.add("is-firefox");return}if(/safari/i.test(t)){e.classList.add("is-safari");return}if(/edg/i.test(t)){e.classList.add("is-edge");return}}var ne=async({source:t})=>{let e=await fetch(t);if(!e.ok)return console.warn(`${t} not found`),{success:!1,data:""};let r={};try{r=await e.text()}catch(o){return console.warn(o),{success:!1,data:r}}return{success:!0,data:r}},At=async({source:t})=>{let e=await fetch(t);if(!e.ok)return console.warn(`${t} not found`),{success:!1,data:""};let r={};try{r=await e.json()}catch(o){return console.warn(o),{success:!1,data:r}}return{success:!0,data:r}};function Gt(t,e){return Math.floor(Math.random()*(e-t+1)+t)}var Ry=t=>new XMLSerializer().serializeToString(t).replaceAll(' xmlns="http://www.w3.org/1999/xhtml"',"");var Py,Ny={},NI="./asset/svg/icons/",AI=[{name:"gitHubIcon",source:"icon-github.svg"},{name:"searchIcons",source:"search.svg"},{name:"historyIcons",source:"history.svg"},{name:"starOutline",source:"star-outline.svg"},{name:"previous",source:"previous.svg"},{name:"close",source:"close.svg"},{name:"up",source:"up.svg"},{name:"swap",source:"swap.svg"},{name:"selectAll",source:"select-all.svg"}],pr=()=>Py,zn=()=>Ny,Ay=async()=>{let{success:t,data:e}=await At({source:"./data/common.json"});t||console.warn("data fail to load"),Py=e},Oy=async()=>{let t=AI.map(({name:r,source:o})=>ne({source:`${NI}${o}`}).then(n=>({name:r,result:n})));Ny=(await Promise.all(t)).map(({name:r,result:o})=>o.success?{name:r,data:o.data}:{name:r,data:"icon load error"}).reduce((r,{name:o,data:n})=>({...r,[o]:n}),{})};var $y=()=>g`
        <div class="error-page">
            <div class="error-page__content">
                <h1 class="error-page__title title-big">Page not found</h1>
                <a class="error-page__link" href="./#home">back to home</a>
            </div>
        </div>
    `;var Ly=({screenElement:t,scrollerElement:e,hideControls:r})=>{let o=new _t({screen:t,scroller:e,direction:"horizontal",drag:!0,useHorizontalScroll:!0,easeType:"lerp",breakpoint:"small",afterInit:({shouldScroll:n})=>{r(n)},afterRefresh:({shouldScroll:n})=>{r(n)}});return o.init(),{destroy:()=>{o.destroy()},refresh:()=>{o.refresh()}}};var OI=t=>t<10?`0${t}`:`${t}`,Fy=({setRef:t,getRef:e,onMount:r,bindEffect:o,getProxi:n})=>{let s=n(),i=()=>{},a=()=>{};return r(()=>{let{screenElement:c,scrollerElement:l}=e();return{destroy:i,refresh:a}=Ly({screenElement:c,scrollerElement:l,hideControls:p=>{s.showControls=p}}),u.useNextLoop(()=>{a()}),setTimeout(()=>{"isMounted"in s&&(s.isMounted=!0)},500),()=>{i(),i=()=>{},a=()=>{}}}),g`<div class="l-links">
        <div class="l-links__under-container">
            <div
                class="l-links__under is-white"
                ${o({toggleClass:{"is-visible":()=>s.isMounted}})}
            >
                ${s.title}
            </div>
        </div>
        <div class="l-links__grid">
            <div class="l-links__row l-links__row" ${t("screenElement")}>
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
                    ${t("scrollerElement")}
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
    </div>`};var Dy=m.createComponent({tag:"layout-links",component:Fy,props:{title:()=>({value:"",type:String}),items:()=>({value:[],type:Array})},state:{isMounted:()=>({value:!1,type:Boolean}),showControls:()=>({value:!1,type:Boolean})}});m.useComponent([Dy]);var Za=async({props:t})=>{let{source:e}=t,{data:r}=await At({source:e});return g` <div class="l-links">
        <layout-links
            ${m.staticProps({title:r.title,items:r.items})}
        ></layout-links>
    </div>`};var By=()=>g`
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
    `;var ec=m.createComponent({tag:"doc-container",component:By});var Vy=()=>g`
        <div class="c-doc-title">
            <h2><mobjs-slot></mobjs-slot></h2>
        </div>
    `;var tc=m.createComponent({tag:"doc-title",component:Vy,state:{}});var Wy=()=>g`
        <div class="c-doc-title-small">
            <mobjs-slot></mobjs-slot>
        </div>
    `;var rc=m.createComponent({tag:"doc-title-small",component:Wy,state:{}});var cT=xC(aT(),1);var Ku=cT.default;var lT="[A-Za-z$_][0-9A-Za-z$_]*",CM=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],EM=["true","false","null","undefined","NaN","Infinity"],uT=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],pT=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],mT=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],wM=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],IM=[].concat(mT,uT,pT);function hT(t){let e=t.regex,r=(D,{after:V})=>{let B="</"+D[0].slice(1);return D.input.indexOf(B,V)!==-1},o=lT,n={begin:"<>",end:"</>"},s=/<[A-Za-z0-9\\._:-]+\s*\/>/,i={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(D,V)=>{let B=D[0].length+D.index,U=D.input[B];if(U==="<"||U===","){V.ignoreMatch();return}U===">"&&(r(D,{after:B})||V.ignoreMatch());let oe,ce=D.input.substring(B);if(oe=ce.match(/^\s*=/)){V.ignoreMatch();return}if((oe=ce.match(/^\s+extends\s+/))&&oe.index===0){V.ignoreMatch();return}}},a={$pattern:lT,keyword:CM,literal:EM,built_in:IM,"variable.language":wM},c="[0-9](_?[0-9])*",l=`\\.(${c})`,p="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",h={className:"number",variants:[{begin:`(\\b(${p})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${p})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},f={className:"subst",begin:"\\$\\{",end:"\\}",keywords:a,contains:[]},d={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,f],subLanguage:"xml"}},y={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,f],subLanguage:"css"}},v={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,f],subLanguage:"graphql"}},T={className:"string",begin:"`",end:"`",contains:[t.BACKSLASH_ESCAPE,f]},_={className:"comment",variants:[t.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),t.C_BLOCK_COMMENT_MODE,t.C_LINE_COMMENT_MODE]},E=[t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,d,y,v,T,{match:/\$\d+/},h];f.contains=E.concat({begin:/\{/,end:/\}/,keywords:a,contains:["self"].concat(E)});let x=[].concat(_,f.contains),w=x.concat([{begin:/(\s*)\(/,end:/\)/,keywords:a,contains:["self"].concat(x)}]),I={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:w},N={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,e.concat(o,"(",e.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},A={relevance:0,match:e.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...uT,...pT]}},O={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},R={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[I],illegal:/%/},P={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function $(D){return e.concat("(?!",D.join("|"),")")}let F={match:e.concat(/\b/,$([...mT,"super","import"].map(D=>`${D}\\s*\\(`)),o,e.lookahead(/\s*\(/)),className:"title.function",relevance:0},k={begin:e.concat(/\./,e.lookahead(e.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},L={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},I]},C="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+t.UNDERSCORE_IDENT_RE+")\\s*=>",M={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,e.lookahead(C)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[I]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:a,exports:{PARAMS_CONTAINS:w,CLASS_REFERENCE:A},illegal:/#(?![$_A-z])/,contains:[t.SHEBANG({label:"shebang",binary:"node",relevance:5}),O,t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,d,y,v,T,_,{match:/\$\d+/},h,A,{scope:"attr",match:o+e.lookahead(":"),relevance:0},M,{begin:"("+t.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[_,t.REGEXP_MODE,{className:"function",begin:C,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:t.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:w}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:n.begin,end:n.end},{match:s},{begin:i.begin,"on:begin":i.isTrulyOpeningTag,end:i.end}],subLanguage:"xml",contains:[{begin:i.begin,end:i.end,skip:!0,contains:["self"]}]}]},R,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+t.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[I,t.inherit(t.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},k,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[I]},F,P,N,L,{match:/\$[(.]/}]}}Ku.registerLanguage("javascript",hT);var dT=async({ref:t,source:e})=>{if(!t)return;let{success:r,data:o}=await ne({source:e});if(!r){t.textContent="something went wrong";return}t.textContent=o,Ku.highlightElement(t),t.style.height=""},MM=()=>getComputedStyle(document.documentElement).getPropertyValue("--snippet-line-height-value"),fT=({onMount:t,setRef:e,getRef:r,delegateEvents:o,bindEffect:n,getProxi:s,bindObject:i})=>{let a=s(),c=MM(),l="20rem",p=Number(a.numLines)>15,h=p?"use-expand":"",f=`${a.numLines*Number(c)}rem`;return t(async()=>{let{codeEl:d}=r();return a.awaitLoad?await dT({ref:d,source:a.source}):dT({ref:d,source:a.source}),()=>{}}),g`<div
        class="snippet"
        style="--snippet-height:${f};--closed-height:${l}"
    >
        <code
            ${n({toggleClass:{close:()=>p&&!a.isExpanded,open:()=>p&&a.isExpanded}})}
        >
            <pre
                ${e("codeEl")}
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
    </div>`};var gT=m.createComponent({tag:"mob-snippet",component:fT,props:{source:()=>({value:"",type:String}),numLines:()=>({value:1,type:Number}),awaitLoad:()=>({value:!1,type:Boolean})},state:{contentIsLoaded:()=>({value:!1,type:Boolean}),isExpanded:()=>({value:!1,type:Boolean})}});var ti="debug_component",ac="debug_filter_list",cc="debug_overlay",lc="debug_tree",ri="quick_nav",oi="scroll_down_label",ni="scroll_to",bT="header",uc="mob_navigation",si="mob_navigation_container",pc="search_overlay",ii="search_overlay_list",Ho="search_overlay_header",mc="right-sidebar",hc="route-loader";var vT=({id:t,label:e,element:r,isSection:o,isNote:n})=>{m.useMethodByName(ni)?.addItem?.({id:t,label:e,element:r,isSection:o,isNote:n})},yT=t=>{m.useMethodByName(ni)?.setActiveLabel?.(t)};function kM({label:t}){return t?.length>0}var RM=async({id:t,label:e,element:r,isSection:o,isNote:n})=>{await m.tick(),vT({id:t,label:e,element:r,isSection:o,isNote:n}),Ep(r)&&!o&&yT(e)},TT=({getState:t,onMount:e})=>{let{style:r,line:o,id:n,label:s,isSection:i,isNote:a}=t(),c=o?"spacer--line":"";return e(({element:l})=>{kM({label:s})&&RM({id:n,label:s,element:l,isSection:i,isNote:a})}),g`<div id="${n}" class="spacer spacer--${r} ${c}">
        <span></span>
    </div>`};var _T=m.createComponent({tag:"mob-spacer",component:TT,props:{style:()=>({value:"x-small",type:String,validate:t=>["x-small","small","medium","big"].includes(t),strict:!0}),line:()=>({value:!1,type:Boolean}),id:()=>({value:"",type:String}),label:()=>({value:"",type:String}),isSection:()=>({value:!1,type:Boolean}),isNote:()=>({value:!1,type:Boolean})}});var ST=({getState:t,delegateEvents:e})=>{let{content:r,anchor:o}=t();return g`<div>
        <button
            type="button"
            class="anchor-button"
            ${e({click:()=>{let n=document.querySelector(o);if(!n)return;let s=be(n).top-50;Ar.to(s)}})}
        >
            ${r}
            <span class="anchor-button__arrow">
                <span class="anchor-button__arrow__start"></span>
                <span class="anchor-button__arrow__end"></span>
            </span>
        </button>
    </div>`};var xT=m.createComponent({tag:"anchor-button",component:ST,props:{anchor:()=>({value:"",type:String}),content:()=>({value:"",type:String})}});var PM=({items:t,links:e})=>e?t.map(({label:r,url:o})=>g`<li>
                          <a href="${o}" class="list-links">
                              ${r}
                              <span class="list-links__arrow">
                                  <span class="list-links__arrow__start"></span>
                                  <span class="list-links__arrow__end"></span>
                              </span>
                          </a>
                      </li>`).join(""):t.map(r=>g` <li>${r}</li> `).join(""),CT=({getState:t})=>{let{style:e,color:r,items:o,links:n}=t(),s=`is-${r}`;return g`<ul class="ul ul--${e} ${s} ${n?"use-links":"use-default"}">
        ${PM({items:o,links:n})}
    </ul>`};var ET=m.createComponent({tag:"mob-list",component:CT,props:{style:()=>({value:"medium",type:String,validate:t=>["small","medium","big"].includes(t),strict:!0}),dots:()=>({value:!0,type:Boolean}),links:()=>({value:!1,type:Boolean}),color:()=>({value:"black",type:String,validate:t=>["white","black","grey","hightlight"].includes(t)}),items:()=>({value:[],type:Array})}});var wT=({getState:t})=>{let{style:e,color:r,boxed:o,note:n}=t(),s=r==="inherit"?"":`is-${r}`;return g`<p
        class="p p--${e} ${o?"p--boxed":""} ${n?"p--note":""} ${s}"
    >
        <mobjs-slot></mobjs-slot>
    </p>`};var IT=m.createComponent({tag:"mob-paragraph",component:wT,props:{style:()=>({value:"medium",type:String,validate:t=>["small","medium","big"].includes(t),strict:!0}),color:()=>({value:"inherit",type:String,validate:t=>["inherit","white","hightlight","black"].includes(t)}),boxed:()=>({value:!1,type:Boolean}),note:()=>({value:!1,type:Boolean})}});var NM=t=>t.length>0?g`<span class="title-index">${t}</span>`:"",MT=({getProxi:t})=>{let e=t(),r=e.color==="inherit"?"":`is-${e.color}`,o=e.isBold?"is-bold":"",n=e.isSection?"is-section":"";return g`<${e.tag} class="${r} ${o} ${n}">
            ${NM(e.index)}
            <span class="title-content">
                <mobjs-slot></mobjs-slot>
            </span>
        </${e.tag}>`};var kT=m.createComponent({tag:"mob-title",component:MT,props:{tag:()=>({value:"h1",type:String}),color:()=>({value:"inherit",type:String,validate:t=>["inherit","white","black"].includes(t)}),isSection:()=>({value:!1,type:Boolean}),isBold:()=>({value:!1,type:Boolean}),index:()=>({value:"",type:String})}});var AM=({data:t,staticProps:e,awaitLoadSnippet:r})=>t.map(o=>{let{component:n,props:s,content:i}=o;return g`
                <${n} ${e({...s,awaitLoad:r})}>
                    ${i??""}
                </${n}>
            `}).join(""),OM=async({source:t,data:e})=>{if(e&&e.length>0)return e;let{success:r,data:o}=await At({source:t});return r?o.data:[]},RT=async({getState:t,staticProps:e})=>{let{source:r,data:o}=t(),n=await OM({source:r,data:o}),{awaitLoadSnippet:s,usePadding:i}=t();return g`
        <section class="html-content ${i?"use-padding":""}">
            ${AM({data:n,staticProps:e,awaitLoadSnippet:s})}
        </section>
    `};var $M=async({proxi:t})=>{let{success:e,data:r}=await ne({source:t.url});e&&(t.source=r)},PT=({getProxi:t,invalidate:e,onMount:r})=>{let o=t();return r(()=>{$M({proxi:o})}),g`
        <div class="c-doc-svg ${o.className}">
            ${e({observe:()=>o.source,render:()=>o.source})}
        </div>
    `};var NT=m.createComponent({tag:"doc-svg",component:PT,props:{className:()=>({value:"",type:String}),url:()=>({value:"",type:String})},state:{source:()=>({value:g`<span class="c-doc-svg__loading">
                    loading image ...
                </span>`,type:String})}});var dc=m.createComponent({tag:"html-content",component:RT,props:{source:()=>({value:"",type:String}),data:()=>({value:[],type:Array}),awaitLoadSnippet:()=>({value:!1,type:Boolean}),useTriangle:()=>({value:!0,type:Boolean}),usePadding:()=>({value:!0,type:Boolean})},child:[ET,IT,kT,gT,_T,xT,NT]});var AT=({bindEffect:t,getProxi:e})=>{let r=e(),o=r.isSection?"is-section":"",n=r.isNote?"is-note":"";return g`
        <button
            type="button"
            class="${o} ${n}"
            ${t({toggleClass:{active:()=>r.active}})}
        >
            <span>${r.label}</span>
        </button>
    `};var OT=m.createComponent({tag:"scroll-to-button",component:AT,props:{label:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean}),isSection:()=>({value:!1,type:Boolean}),isNote:()=>({value:!1,type:Boolean})}});var ai=!1;function LM({delegateEvents:t,bindProps:e,proxi:r}){return r.anchorItems.map(o=>{let n=o.isSection||o.isNote?"":t({click:async()=>{let{id:s,label:i,element:a}=o,c=s==="start"?0:be(a).top-50;ai=!0,r.activeLabel=i,await Ar.to(c),setTimeout(()=>{ai=!1},1e3)}});return g`
                <li>
                    <scroll-to-button
                        ${n}
                        ${e(()=>({active:r.activeLabel===o.label,label:o.label,isSection:o.isSection??!1,isNote:o.isNote??!1}))}
                    >
                    </scroll-to-button>
                </li>
            `}).join("")}var $T=({proxi:t,direction:e,winHeight:r})=>{u.useFrame(()=>{u.useNextTick(()=>{if("anchorItems"in t){if(e==="DOWN"){let o=t.anchorItems.findLast(({top:n,isNote:s})=>!s&&n<window.scrollY+r-200);t.activeLabel=o?o.label:""}if(e==="UP"){let o=t.anchorItems.findLast(({top:n,isNote:s})=>!s&&n<window.scrollY+200);t.activeLabel=o?o.label:""}}})})},LT=({onMount:t,delegateEvents:e,bindProps:r,invalidate:o,computed:n,addMethod:s,updateState:i,getProxi:a})=>{let c=a(),l="DOWN",p=window.innerHeight;return s("addItem",({id:h,label:f,element:d,isSection:y,isNote:v})=>{i("anchorItemsToBeComputed",T=>[...T,{id:h,label:f,element:d,isSection:y,isNote:v}])}),s("setActiveLabel",h=>{ai||(c.activeLabel=h)}),t(()=>{if(ue.mq("max","desktop"))return;n(()=>c.anchorItems,()=>c.anchorItemsToBeComputed.map(v=>({...v,top:be(v.element).top})));let h=u.useScrollThrottle(({direction:v})=>l=v),f=new ResizeObserver(u.debounce(()=>{u.useFrame(()=>{u.useNextTick(()=>{p=window.innerHeight})}),"anchorItems"in c&&c.anchorItems.forEach(v=>{v.top=be(v.element).top})},200));f.observe(m.getRoot());let d=c.updateAnchorOnWheel?u.useMouseWheel(u.debounce(()=>{ai||$T({proxi:c,direction:l,winHeight:p})},600)):()=>{},y=u.useScrollEnd(()=>{ai||$T({proxi:c,direction:l,winHeight:p})});return()=>{d(),h(),y(),f.unobserve(m.getRoot()),f.disconnect(),f=null}}),g`
        <div class="c-scroll-to">
            <ul>
                ${o({observe:()=>c.anchorItems,render:()=>LM({delegateEvents:e,bindProps:r,proxi:c})})}
            </ul>
        </div>
    `};var FT=m.createComponent({tag:"scroll-to",component:LT,state:{activeLabel:()=>({value:"",type:String}),updateAnchorOnWheel:()=>({value:!1,type:Boolean}),anchorItemsToBeComputed:()=>({value:[],type:Array}),anchorItems:()=>({value:[],type:Array,transform:t=>t.toSorted(function(e,r){let{element:o}=e,{element:n}=r;return o===n||!o||!n?0:o.compareDocumentPosition(n)&2?1:-1})})},child:[OT]});var fc=({breadCrumbs:t})=>t.map((e,r)=>r===t.length-1?g`<a href="${e.url}" class="breadcrumbs__arrow">
                          <div class="breadcrumbs__arrow__start"></div>
                          <div class="breadcrumbs__arrow__end"></div>
                      </a>
                      <a class="breadcrumbs__link" href="${e.url}"
                          >${e.title}</a
                      >`:g`<a class="breadcrumbs__link" href="${e.url}"
                      >${e.title}</a
                  >`).join("");var gc=t=>{m.useMethodByName(mc)?.updateList(t??[])};m.useComponent([ec,rc,FT,tc,dc]);var De=async({props:t})=>{let{source:e,title:r,breadCrumbs:o,rightSidebar:n}=t,{data:s}=await At({source:e});return gc(n??[]),g` <doc-container>
        <div>
            <html-content
                slot="docs"
                ${m.staticProps({data:s.data,useMaxWidth:!0})}
            ></html-content>
            <doc-title-small slot="section-title-small"
                ><div>
                    ${fc({breadCrumbs:o})}<span>${r}</span>
                </div></doc-title-small
            >
            <scroll-to name="${ni}" slot="section-links"></scroll-to>
            <doc-title slot="section-title">${r}</doc-title>
        </div>
    </doc-container>`};m.useComponent([ec,rc,tc,dc]);var ae=async({props:t})=>{let{source:e,title:r,breadCrumbs:o,rightSidebar:n}=t,{data:s}=await At({source:e});return gc(n??[]),g`<doc-container>
        <div>
            <html-content
                slot="docs"
                ${m.staticProps({data:s.data,useMaxWidth:!0})}
            ></html-content>
            <doc-title-small slot="section-title-small"
                ><div>
                    ${fc({breadCrumbs:o})}<span>${r}</span>
                </div></doc-title-small
            >
            <doc-title slot="section-title">${r}</doc-title>
        </div>
    </doc-container>`};var DT=({weakPathElement:t,weakScrollerElement:e,wrapElement:r,setActiveItem:o,weakScreenElement:n})=>{let s={ax:53,ay:70,bx:64,by:80,cx:89,cy:87,dx:100,dy:100,ex:0,ey:100,fx:10,fy:77,gx:17,gy:84},i={ax:-1,ay:-1,bx:1,by:1,cx:-1,cy:-1,dx:1,dy:1,ex:1,ey:1,fx:-1,fy:-1,gx:1,gy:1},a=H.createSequencer({data:{...s}});a.goTo({fy:90,ay:90,cy:70},{start:0,end:3.5}).goTo({gy:70,by:80},{start:2,end:5}).goTo({fy:90,ay:100,cy:90},{start:4,end:7.5}).goTo({ay:120,fy:80,cy:80},{start:7.5,end:10}).goTo({gy:100,by:100},{start:6,end:10}).add(()=>{o(1)},0).add(({direction:d,isForced:y})=>{y||d==="backward"||o(2)},1.5).add(({direction:d,isForced:y})=>{y||d==="backward"||o(3)},5.5).add(({direction:d,isForced:y})=>{y||d==="backward"||o(4)},9.5).add(({direction:d,isForced:y})=>{y||d==="forward"||o(1)},1.5).add(({direction:d,isForced:y})=>{y||d==="forward"||o(2)},5).add(({direction:d,isForced:y})=>{y||d==="forward"||o(3)},9),a.subscribe(({ax:d,ay:y,bx:v,by:T,cx:S,cy:_,dx:E,dy:x,ex:w,ey:I,fx:N,fy:A,gx:O,gy:R})=>{s.ax=d,s.ay=y,s.bx=v,s.by=T,s.cx=S,s.cy=_,s.dx=E,s.dy=x,s.ex=w,s.ey=I,s.fx=N,s.fy=A,s.gx=O,s.gy=R});let c=H.createTimeTween({data:{...i}});c.subscribe(({ax:d,ay:y,bx:v,by:T,cx:S,cy:_,dx:E,dy:x,ex:w,ey:I,fx:N,fy:A,gx:O,gy:R})=>{i.ax=d,i.ay=y,i.bx=v,i.by=T,i.cx=S,i.cy=_,i.dx=E,i.dy=x,i.ex=w,i.ey=I,i.fx=N,i.fy=A,i.gx=O,i.gy=R});let l=Me.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(c,{ax:()=>Gt(-3,3),ay:()=>Gt(-3,3),bx:()=>Gt(-3,3),by:()=>Gt(-3,3),cx:()=>Gt(-3,3),cy:()=>Gt(-3,3),dx:()=>0,dy:()=>0,ex:()=>0,ey:()=>0,fx:()=>Gt(-3,3),fy:()=>Gt(-3,3),gx:()=>Gt(-3,3),gy:()=>Gt(-3,3)},{duration:3e3});l.play();let p=!0,h=()=>{if(!p)return;let d={x:s.ax+i.ax,y:s.ay+i.ay},y={x:s.bx+i.bx,y:s.by+i.by},v={x:s.cx+i.cx,y:s.cy+i.cy},T={x:s.dx+i.dx,y:s.dy+i.dy},S={x:s.ex+i.ex,y:s.ey+i.ey},_={x:s.fx+i.fx,y:s.fy+i.fy},E={x:s.gx+i.gx,y:s.gy+i.gy};t.deref()&&(t.deref().style.clipPath=`polygon(${d.x}% ${d.y}%, ${y.x}% ${y.y}%, ${v.x}% ${v.y}%, ${T.x}% ${T.y}%,${S.x}% ${S.y}%,${_.x}% ${_.y}%,${E.x}% ${E.y}%)`,u.useNextFrame(()=>h()))};u.useFrame(()=>h());let f=Ke.createScrollTrigger({item:r,dynamicStart:{position:"right",value:()=>je(n?.deref()??document.createElement("div"))},dynamicEnd:{position:"right",value:()=>je(e?.deref()??document.createElement("div"))??0},reverse:!1,propierties:"tween",ease:!1,tween:a});return{pathScroller:f,pathSequencer:a,pathTween:c,pathTimeline:l,stopLoop:()=>{p=!1},destroy:()=>{f.destroy(),f=null,a.destroy(),a=null,c.destroy(),c=null,l.destroy(),l=null}}};var BT=({title_1:t,title_2:e})=>{let r=H.createScrollerTween({from:{x:0},to:{x:30}});r.subscribe(({x:i})=>{t.style.transform=`translate3d(0,0,0) translate(${i}px, 0px)`}),r.onStop(({x:i})=>{t.style.transform=`translate(${i}px, 0px)`});let o=Ke.createParallax({item:t,propierties:"tween",tween:r,ease:!1,align:"start"}),n=H.createScrollerTween({from:{x:0},to:{x:-30}});n.subscribe(({x:i})=>{e.style.transform=`translate3d(0,0,0) translateX(${i}px)`}),n.onStop(({x:i})=>{e.style.transform=`translateX(${i}px)`});let s=Ke.createParallax({item:e,propierties:"tween",tween:n,ease:!1,align:"start"});return{title1parallax:o,title2parallax:s,title1tween:r,title2tween:n}};var bc=({title:t})=>{let e=H.createScrollerTween({from:{x:0},to:{x:-60}});e.subscribe(({x:o})=>{t.deref()&&(t.deref().style.transform=`translate3d(0,0,0) translateX(${o}px)`)}),e.onStop(({x:o})=>{t.deref()&&(t.deref().style.transform=`translateX(${o}px)`)});let r=Ke.createParallax({item:t.deref(),propierties:"tween",tween:e,ease:!1,align:"center"});return{sectionContentScroller:r,destroy:()=>{r.destroy(),r=null}}};var VT=({screenElement:t,scrollerElement:e,pathElement:r,wrapElement:o,title_1:n,title_2:s,section2_title:i,section3_title:a,section4_title:c,setActiveItem:l,onMove:p,onScrollEnd:h})=>{let f=new WeakRef(e),d=new WeakRef(i),y=new WeakRef(a),v=new WeakRef(c),T=new WeakRef(r),S=new WeakRef(t),{pathScroller:_,pathSequencer:E,pathTimeline:x,pathTween:w,stopLoop:I,destroy:N}=DT({weakPathElement:T,weakScrollerElement:f,wrapElement:o,setActiveItem:l,weakScreenElement:S}),{title1parallax:A,title2parallax:O,title1tween:R,title2tween:P}=BT({title_1:n,title_2:s}),{sectionContentScroller:$,destroy:F}=bc({title:d}),{sectionContentScroller:k,destroy:L}=bc({title:y}),{sectionContentScroller:C,destroy:M}=bc({title:v}),D=new _t({screen:t,scroller:e,direction:"horizontal",drag:!0,easeType:"lerp",breakpoint:"small",useHorizontalScroll:!0,useSwipe:!1,revertSwipeDirection:!1,children:[_,A,O,$,k,C],onUpdate:({value:V})=>{p(V),h()}});return D.init(),setTimeout(()=>{D?.refresh?.()},500),{goTo:V=>{!V&&V!==0||D?.move?.(V).catch(()=>{})},destroy:()=>{D.destroy(),D=null,E.destroy(),_.destroy(),x.destroy(),w.destroy(),A.destroy(),O.destroy(),R.destroy(),P.destroy(),$.destroy(),k.destroy(),I(),N(),F(),L(),M()}}};var WT=({elements:t})=>{let e=H.createSpring({data:{x:0},stagger:{each:5}});return t.map(o=>o.querySelector("svg")).forEach(o=>{o&&(e.subscribe(({x:n})=>{o.style.transform=`translate3D(0,0,0) translateY(${-n}px)`}),e.onComplete(({x:n})=>{o.style.transform=`translateY(${-n}px)`}))}),{svgSpring:e,destroySvgSpring:()=>{e.destroy(),e=null}}};var li=()=>{},ci=t=>Promise.resolve(t),vc=()=>{},Qu={1:0,2:100/3,3:100/3*2,4:100},FM=({setRef:t,getState:e})=>{let{titleTop:r,titleBottom:o}=e().block_1;return g`
        <section
            class="l-about__section l-about__section l-about__section--first "
        >
            <div class="l-about__section__top has-overflow">
                <h1 class="title-big" ${t("title_1")}>${r}</h1>
            </div>
            <div class="l-about__section__bottom has-overflow">
                <h1 class="title-biggest" ${t("title_2")}>
                    ${o}
                </h1>
            </div>
        </section>
    `},DM=({setRef:t,getState:e})=>{let{title:r,copy:o}=e().block_2;return g`
        <section class="l-about__section">
            <div class="l-about__section__top has-overflow">
                <div class="l-about__section__left"></div>
                <div class="l-about__section__right">
                    <h1 class="title-biggest" ${t("section2_title")}>
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
    `},BM=({setRef:t,getState:e})=>{let{title:r,copy:o}=e().block_3;return g`
        <section class="l-about__section">
            <div class="l-about__section__top has-overflow">
                <div class="l-about__section__left"></div>
                <div class="l-about__section__right">
                    <h1 class="title-biggest" ${t("section3_title")}>
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
    `},VM=({setRef:t,getState:e})=>{let{title:r,items:o}=e().block_4;return g`
        <section class="l-about__section l-about__section--last">
            <div class="l-about__section__top">
                <h1 class="title-biggest" ${t("section4_title")}>
                    ${r}
                </h1>
            </div>
            <div class="l-about__section__bottom">
                <ul class="l-about__list">
                    ${o.map(n=>g` <li>[ ${n} ]</li> `).join("")}
                </ul>
            </div>
        </section>
    `},WM=({proxi:t,delegateEvents:e,bindEffect:r})=>g`
        <ul class="l-about__nav">
            ${t.navItem.map(({index:o,label:n})=>g`
                        <li class="l-about__nav__item">
                            <button
                                class="l-about__nav__button"
                                ${e({click:()=>{li(Qu[o]),vc()}})}
                                ${r({toggleClass:{active:()=>t.activenavItem===o}})}
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
    `,jT=({onMount:t,setRef:e,getRef:r,getRefs:o,getState:n,bindEffect:s,delegateEvents:i,getProxi:a})=>{let c=a(),l=4,p=!1;return t(()=>{let{screenElement:h,scrollerElement:f,wrapElement:d,title_1:y,title_2:v,section2_title:T,section3_title:S,section4_title:_,pathElement:E}=r(),{svg:x}=o(),w=0,I=!1,N=0,{svgSpring:A,destroySvgSpring:O}=WT({elements:x});ci=async $=>{if(u.shouldMakeSomething()||p){A.stop(),p=!0,setTimeout(()=>{p=!1},2e3);return}let k=-Math.abs($/30);Number.isNaN(k)||await A.goTo({x:k}).catch(()=>{})},vc=()=>{ci(3e3),setTimeout(()=>{ci(0)},500)};let{destroy:R,goTo:P}=VT({screenElement:h,scrollerElement:f,pathElement:E,wrapElement:d,title_1:y,title_2:v,section2_title:T,section3_title:S,section4_title:_,setActiveItem:$=>{c.activenavItem=$},onMove:$=>{I||(w=$),I=!0,N=w-$,ci(N)},onScrollEnd:u.useDebounce(()=>{I=!1,N=0,ci(N)},500)});return li=P,c.isMounted=!0,()=>{li=()=>{},R(),O()}}),g`<div
        class="l-about"
        style="--number-of-section:${l}"
        ${s({toggleClass:{active:()=>c.isMounted}})}
    >
        <div class="l-about__sqaure-container">${jM()}</div>
        <span class="l-about__background">
            <div
                class="l-about__about-svg l-about__about-svg--bottom"
                ${e("svg")}
            >
                ${c.aboutSvg}
            </div>
        </span>
        <div
            class="l-about__about-svg l-about__about-svg--back"
            ${e("svg")}
        >
            ${c.aboutSvg}
        </div>
        <div
            class="l-about__shape l-about__shape--front"
            ${e("pathElement")}
        >
            <div class="l-about__about-svg l-about__about-svg--front">
                ${c.aboutSvg}
            </div>
        </div>
        <div class="l-about__screen" ${e("screenElement")}>
            <div class="l-about__scroller" ${e("scrollerElement")}>
                <div class="l-about__wrap" ${e("wrapElement")}>
                    ${FM({setRef:e,getState:n})}
                    ${DM({setRef:e,getState:n})}
                    ${BM({setRef:e,getState:n})}
                    ${VM({setRef:e,getState:n})}
                </div>
            </div>
        </div>
        <button
            type="button"
            class="l-about__prev"
            ${s({toggleAttribute:{disabled:()=>c.activenavItem==1}})}
            ${i({click:()=>{li(Qu[ue.clamp(c.activenavItem-1,1,4)]),vc()}})}
        ></button>
        ${WM({bindEffect:s,delegateEvents:i,proxi:c})}
        <button
            type="button"
            class="l-about__next"
            ${s({toggleAttribute:{disabled:()=>c.activenavItem==4}})}
            ${i({click:()=>{li(Qu[ue.clamp(c.activenavItem+1,1,4)]),vc()}})}
        ></button>
    </div>`};var zT=m.createComponent({tag:"about-component",component:jT,props:{block_1:()=>({value:{titleTop:"",titleBottom:""},type:"any"}),block_2:()=>({value:{title:"",copy:""},type:"any"}),block_3:()=>({value:{title:"",copy:""},type:"any"}),block_4:()=>({value:{title:"",items:[""]},type:"any"}),aboutSvg:()=>({value:"",type:String})},state:{navItem:()=>({value:[{index:1,label:"about"},{index:2,label:"why"},{index:3,label:"what"},{index:4,label:"inspiration"}],type:Array}),activenavItem:()=>({value:1,type:Number,transform:t=>ue.clamp(t,1,4)}),isMounted:()=>({value:!1,type:Boolean})}});m.useComponent([zT]);var HT=async()=>{let{data:t}=await At({source:"./data/about/index.json"}),{data:e}=await ne({source:"./asset/svg/about.svg?v=0.1"});return g`<about-component
        ${m.staticProps({block_1:t.block_1,block_2:t.block_2,block_3:t.block_3,block_4:t.block_4,aboutSvg:e})}
    ></about-component> `};var UT=({getProxi:t,bindObject:e,delegateEvents:r,onMount:o,id:n,bindEffect:s})=>{let i=t();return o(()=>()=>{}),g`<div
        class="benchmark-fake"
        ${s({toggleClass:{selected:()=>i.isSelected}})}
    >
        <div class="benchmark-fake__row">
            <strong>id:</strong><br />
            ${n}
        </div>
        <div class="benchmark-fake__row">
            ${e`<strong>index:</strong><br/> ${()=>i.index}`}
        </div>
        <div class="benchmark-fake__row">
            ${e`<strong>label:</strong><br/> ${()=>i.label}`}
        </div>
        <div class="benchmark-fake__row">
            ${e`<strong>counter: </strong><br/> ${()=>i.counter}`}
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
    </div> `};var yc=m.createComponent({tag:"benchmark-fake-component",component:UT,props:{counter:0,label:"",index:0},state:{isSelected:!1}});var ht=(t=1001)=>({state:{counter:()=>({value:0,type:Number}),data:()=>({value:[],type:Array,validate:e=>e.length<t,strict:!0,skipEqual:!1}),time:()=>({value:0,type:Number,transform:e=>Math.round(e),skipEqual:!1}),isLoading:()=>({value:!1,type:Boolean}),currentIndex:()=>({value:-1,type:Number})},child:[yc]});var ep=t=>{for(let e=t.length-1;e>0;e--){let r=Math.floor(Math.random()*(e+1));[t[e],t[r]]=[t[r],t[e]]}return t},ui=t=>{let e=u.checkType(Number,t)?t:0;return[...Array.from({length:e}).keys()].map(r=>({label:`comp-${r+1}`}))},Zu=({proxi:t,value:e,useShuffle:r=!1})=>{t.isLoading=!0,u.useFrameIndex(()=>{u.useNextTick(async()=>{let o=performance.now();t.data=r?ep(ui(e)):ui(e),await m.tick();let s=performance.now()-o;t.time=s,t.isLoading=!1})},2)},dt=({delegateEvents:t,setRef:e,getRef:r,bindEffect:o,proxi:n})=>g`
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
                ${e("input")}
                ${t({keydown:s=>{if(s.keyCode===13){s.preventDefault();let i=Number(s.currentTarget?.value??0);Zu({proxi:n,value:i})}}})}
            />
            <button
                type="button"
                class="benchmark__head__button"
                ${t({click:()=>{let{input:s}=r(),i=Number(s?.value??0);Zu({proxi:n,value:i})}})}
            >
                Generate components
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${t({click:()=>{Zu({proxi:n,value:n.data.length,useShuffle:!0})}})}
            >
                Shuffle array
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${t({click:()=>{n.counter=n.counter+1}})}
            >
                Update counter
            </button>
        </div>
    `;var GT=({onMount:t,delegateEvents:e,bindText:r,invalidate:o,getState:n,staticProps:s,setRef:i,getRef:a,bindProps:c,bindEffect:l,getProxi:p})=>{let h=p();return t(()=>()=>{a()?.input.remove()}),g`<div class="benchmark">
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
            ${dt({setRef:i,getRef:a,proxi:h,delegateEvents:e,bindEffect:l})}

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
    </div>`};var qT=m.createComponent({tag:"benchmark-invalidate",component:GT,...ht()});var Tc=(t=1e3)=>g`
        <p>
            Generates and updates a large list of components with 5 reactive
            elements inside.<br />
            ( max component <strong>${t}</strong> ).
        </p>
    `;var JT=({onMount:t,delegateEvents:e,bindObject:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindEffect:a,getProxi:c})=>{let l=c();return t(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">Repeat ( with key ):</h3>
            <h2 class="benchmark__head__title">
                Generate components performance
            </h2>
            ${Tc()}
            ${dt({setRef:o,getRef:n,delegateEvents:e,bindEffect:a,proxi:l})}

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
    </div>`};var YT=m.createComponent({tag:"benchmark-repeat-key",component:JT,...ht()});var XT=({onMount:t,delegateEvents:e,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindObject:a,bindEffect:c,getProxi:l})=>{let p=l();return t(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat ( nested with key ):
            </h3>
            <p class="benchmark__head__title">
                Repater without component with the same repeater with component
                inside<br />
                ( max value <strong>10</strong> ).
            </p>
            ${dt({setRef:o,getRef:n,delegateEvents:e,bindEffect:c,proxi:p})}

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
    </div>`};var KT=m.createComponent({tag:"benchmark-repeat-key-nested",component:XT,...ht(31)});var QT=({onMount:t,delegateEvents:e,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindEffect:a,getProxi:c})=>{let l=c();return t(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">Repeat ( without key ):</h3>
            <h2 class="benchmark__head__title">
                Generate components performance
            </h2>
            ${Tc()}
            ${dt({setRef:o,getRef:n,delegateEvents:e,bindEffect:a,proxi:l})}

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
    </div>`};var ZT=m.createComponent({tag:"benchmark-repeat-no-key",component:QT,...ht()});var Ot=u.createStore({data:()=>({value:[],type:Array,validate:t=>t.length<1001,strict:!0,skipEqual:!1}),counter:()=>({value:0,type:Number}),time:()=>({value:0,type:Number,transform:t=>Math.round(t),skipEqual:!1}),isLoading:()=>({value:!1,type:Boolean})});var tp=({value:t,useShuffle:e=!1})=>{Ot.set("isLoading",!0),u.useFrameIndex(()=>{u.useNextTick(async()=>{let r=performance.now();Ot.set("data",e?ep(ui(t)):ui(t)),await m.tick();let n=performance.now()-r;Ot.set("time",n),Ot.set("isLoading",!1)})},2)},e_=({delegateEvents:t,setRef:e,getRef:r,getState:o,bindEffect:n})=>g`
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
                ${e("input")}
                ${t({keydown:s=>{if(s.code.toLowerCase()==="enter"){s.preventDefault();let i=Number(s.currentTarget?.value??0);tp({value:i})}}})}
            />
            <button
                type="button"
                class="benchmark__head__button"
                ${t({click:()=>{let{input:s}=r(),i=Number(s?.value??0);tp({value:i})}})}
            >
                Generate components
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${t({click:()=>{let{data:s}=o();tp({value:s.length,useShuffle:!0})}})}
            >
                Shuffle array
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${t({click:()=>{Ot.update("counter",s=>s+1)}})}
            >
                Update counter
            </button>
        </div>
    `;var t_=({onMount:t,delegateEvents:e,bindText:r,setRef:o,getRef:n,getState:s,bindProps:i,repeat:a,bindEffect:c,getProxi:l})=>{let p=l();return t(()=>()=>{n()?.input.remove(),Ot.set("data",[]),Ot.set("time",0),Ot.set("counter",0)}),g`<div class="benchmark">
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
            ${e_({setRef:o,getRef:n,delegateEvents:e,getState:s,bindEffect:c})}

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
    </div>`};var r_=m.createComponent({tag:"benchmark-repeat-no-key-bind-store",component:t_,bindStore:Ot,child:[yc]});var o_=({onMount:t,delegateEvents:e,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindObject:a,bindEffect:c,getProxi:l})=>{let p=l();return t(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat ( nested without key ):
            </h3>
            <p class="benchmark__head__title">
                Repater without component with the same repeater with component
                inside<br />
                ( max value <strong>10</strong> ).
            </p>
            ${dt({setRef:o,getRef:n,delegateEvents:e,bindEffect:c,proxi:p})}

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
    </div>`};var n_=m.createComponent({tag:"benchmark-repeat-key-no-nested",component:o_,...ht(31)});var _c=(t=1e3)=>g`
        <p>
            Generates and updates a large list of vanilla HTML element with 4
            reactive elements inside.<br />
            ( max component <strong>${t}</strong> ).
        </p>
    `;var s_=({onMount:t,delegateEvents:e,bindText:r,setRef:o,getRef:n,repeat:s,bindEffect:i,bindObject:a,getProxi:c})=>{let l=c();return t(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat no component ( without key ):
            </h3>
            <h2 class="benchmark__head__title">
                Generate vanilla html performance
            </h2>
            ${_c(1e3)}
            ${dt({setRef:o,getRef:n,delegateEvents:e,bindEffect:i,proxi:l})}

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
                                    ${e({click:()=>{l.currentIndex=l.currentIndex===p.index?-1:p.index}})}
                                >
                                    Select
                                </button>
                            </div>
                        </div>
                    `})}
        </div>
    </div>`};var i_=m.createComponent({tag:"benchmark-repeat-no-component-no-key",component:s_,...ht(1001)});var a_=({onMount:t,delegateEvents:e,bindText:r,setRef:o,getRef:n,repeat:s,bindEffect:i,bindObject:a,getProxi:c})=>{let l=c();return t(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat no component ( with key ):
            </h3>
            <h2 class="benchmark__head__title">
                Generate vanilla html performance
            </h2>
            ${_c(1e3)}
            ${dt({setRef:o,getRef:n,delegateEvents:e,bindEffect:i,proxi:l})}

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
                                    ${e({click:()=>{l.currentIndex=l.currentIndex===p.index?-1:p.index}})}
                                >
                                    Select
                                </button>
                            </div>
                        </div>
                    `})}
        </div>
    </div>`};var c_=m.createComponent({tag:"benchmark-repeat-no-component-with-key",component:a_,...ht(1001)});m.useComponent([qT,ZT,YT,KT,n_,r_,i_,c_]);var $r=async({props:t})=>{let{rootComponent:e}=t;return g`<div class="l-benchMark"><${e}></${e}></div>`};var Se=({active:t=!0,nextRoute:e="",prevRoute:r="",backRoute:o=""})=>{let n=m.useMethodByName(ri);n.update("active",t),n.update("nextRoute",e),n.update("prevRoute",r),n.update("backRoute",o)};m.beforeRouteChange(()=>{let t=m.useMethodByName(ri);t.update("active",!1),t.update("nextRoute",""),t.update("prevRoute",""),t.update("backRoute","")});var te=u.createStore({activeNavigationSection:()=>({value:"",type:String,skipEqual:!1}),navigationIsOpen:()=>({value:!1,type:Boolean})});te.set("activeNavigationSection","");var ft=({disableOffcanvas:t})=>{let e="OffscreenCanvas"in globalThis&&!t;return{useOffscreen:e,context:e?"bitmaprenderer":"2d"}},gt=({useOffscreen:t,canvas:e})=>{let r=t?new OffscreenCanvas(e.width,e.height):null,o=t?r?.getContext("2d"):null;return{offscreen:r,offScreenCtx:o}},bt=({useOffscreen:t,offscreen:e,ctx:r})=>{if(t&&e&&r){let o=e.transferToImageBitmap();r.transferFromImageBitmap(o)}},go=t=>"roundRect"in t;var bo=({canvas:t,numberOfRow:e,numberOfColumn:r,cellWidth:o,cellHeight:n,gutter:s})=>{let i={row:0,col:-1,items:[]};return[...Array.from({length:e*r+e}).keys()].reduce(a=>{let{row:c,col:l,items:p}=a,h=l<r?l+1:0,f=h===0?c+1:c,d=(o+s)*h,y=(n+s)*f;return{row:f,col:h,items:[...p,{width:o,height:n,x:d,y,centerX:d+o/2,centerY:y+n/2,offsetXCenter:zM({canvasWidth:t.width,width:o,gutter:s,numberOfColumn:r}),offsetYCenter:HM({canvasHeight:t.height,height:n,gutter:s,numberOfRow:e}),gutter:s,numberOfColumn:r}]}},i)},zM=({canvasWidth:t,width:e,gutter:r,numberOfColumn:o})=>t/2-(e+r)*o/2,HM=({canvasHeight:t,height:e,gutter:r,numberOfRow:o})=>t/2-(e+r)*(o+1)/2;var l_=({canvas:t,numberOfRow:e,numberOfColumn:r,fill:o,disableOffcanvas:n,stagger:s,reorder:i,animationType:a})=>{let c=window.innerWidth/20,l=window.innerHeight/20,p=1,{useOffscreen:h,context:f}=ft({disableOffcanvas:n}),d=!0,y=t.getContext(f,{alpha:!0}),v=m.getActiveRoute(),{offscreen:T,offScreenCtx:S}=gt({useOffscreen:h,canvas:t}),_=h?S:y,E=go(_);_=null,t.width=t.clientWidth,t.height=t.clientHeight;let x=bo({canvas:t,numberOfRow:e,numberOfColumn:r,cellWidth:c,cellHeight:l,gutter:p}).items,w=i?x.map((P,$)=>({...P,scale:1,rotate:0,hasFill:o.includes($)})).toSorted(P=>P.hasFill?-1:1).toReversed():x.map((P,$)=>{let F=o.includes($);return{...P,scale:1,rotate:0,hasFill:F}}),I=H.createTimeTween({ease:"easeInOutQuad",stagger:s,data:{scale:1,rotate:0}});w.forEach(P=>{I.subscribeCache(({scale:$,rotate:F})=>{P.rotate=F,P.scale=$})});let N=()=>{if(!y)return;let P=t.width,$=t.height,F=h?S:y;F&&(h&&T?(T.width=P,T.height=$):F.reset(),w.forEach(({x:k,y:L,width:C,height:M,rotate:D,scale:V,hasFill:B,offsetXCenter:U,offsetYCenter:oe})=>{let ce=Math.PI/180*D,q=Math.cos(ce)*V,Y=Math.sin(ce)*V;F.setTransform(q,Y,-Y,q,Math.floor(U+k),Math.floor(oe+L));let se=Math.round(-C/2),re=Math.round(-M/2);E?(F.beginPath(),F.roundRect(se,re,C,M,150)):(F.beginPath(),F.rect(se,re,C,M)),B?(F.fillStyle="#000000",F.fill()):(F.fillStyle="rgba(255, 255, 255, 1)",F.fill())}),bt({useOffscreen:h,offscreen:T,ctx:y}))},A=Me.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).label({name:"label1"});(a==="asymmetric"||a==="random")&&A.goTo(I,{scale:.2,rotate:90},{duration:1e3}).goTo(I,{scale:1},{duration:500}).goTo(I,{rotate:180,scale:1.2},{duration:500}).goTo(I,{scale:.3,rotate:0},{duration:500}).goTo(I,{scale:1},{duration:1200}),(a==="edges"||a==="radial")&&A.goTo(I,{scale:.3,rotate:0},{duration:1e3}).goTo(I,{scale:1},{duration:1e3}),A.onLoopEnd(({direction:P,loop:$})=>{console.log(`loop end: ${P}, ${$}`)}),A.play();let O=()=>{N(),d&&u.useNextFrame(()=>O())};u.useFrame(()=>{O()});let R=te.watch("navigationIsOpen",P=>{if(P){A?.pause(),d=!1;return}setTimeout(async()=>{d=!0,m.getActiveRoute().route===v.route&&(A?.resume(),u.useFrame(()=>O()))},500)});return()=>{I.destroy(),A.destroy(),R(),I=null,A=null,y=null,T=null,S=null,x=[],d=!1,w=null,f=null}};var rp=[{label:"asymmetric row",params:{animationType:"asymmetric",fill:[16,27,38,49,60,71,82,93],numberOfColumn:10,numberOfRow:10,stagger:{each:5,grid:{col:10,row:1,direction:"row"},waitComplete:!1},reorder:!0}},{label:"random",params:{animationType:"random",fill:[16,27,38,49,60,71,82,93],numberOfColumn:10,numberOfRow:10,stagger:{each:2,from:"random",waitComplete:!1},reorder:!1}},{label:"edges",params:{animationType:"edges",fill:[0,13,20,45,65,71,72,73,74,75,76,77,83,92,96,113,117,134,138,155,156,157,158,159,189,209],numberOfColumn:10,numberOfRow:10,stagger:{each:10,from:"edges",waitComplete:!1},reorder:!1}},{label:"radial",params:{animationType:"radial",fill:[],numberOfColumn:8,numberOfRow:9,stagger:{each:20,from:{x:4,y:4},grid:{col:9,row:9,direction:"radial"},waitComplete:!1},reorder:!1}}];var op=({proxi:t,getRef:e})=>{t.destroy(),t.destroy=l_({canvas:e().canvas,...rp[t.currentParamsId].params,disableOffcanvas:!0})};function UM({delegateEvents:t,bindEffect:e,proxi:r,getRef:o}){return rp.map(({label:n},s)=>g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn"
                    ${t({click:()=>{r.currentParamsId=s,op({proxi:r,getRef:o})}})}
                    ${e({toggleClass:{active:()=>r.currentParamsId===s}})}
                >
                    ${n}
                </button>
            </li>`).join("")}var u_=({onMount:t,setRef:e,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s})=>{let i=n();return t(()=>{u.useFrame(()=>{u.useNextTick(()=>{op({proxi:i,getRef:r})})});let a=u.useResize(()=>{op({proxi:i,getRef:r})});return u.useFrame(()=>{"isMounted"in i&&(i.isMounted=!0)}),()=>{i.destroy(),i.destroy=()=>{},a()}}),g`
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
                    <canvas ${e("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var p_=m.createComponent({tag:"animatedpattern-n0",component:u_,props:{background:()=>({value:"",type:String})},state:{isMounted:()=>({value:!1,type:Boolean}),controlsActive:()=>({value:!1,type:Boolean}),destroy:()=>({value:()=>{},type:Function}),currentParamsId:()=>({value:0,type:Number})}});m.useComponent([p_]);var m_=async()=>{let{data:t}=await ne({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"#async-timeline",nextRoute:"#animatedPatternN1",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <animatedpattern-n0
            ${m.staticProps({background:t})}
        ></animatedpattern-n0>
    </div>`};var np=({canvas:t,disableOffcanvas:e})=>{let r=window.innerHeight>=700?window.innerHeight/16:window.innerHeight/20,o=window.innerHeight>=700?window.innerHeight/16:window.innerHeight/20,n=7,s=15,i=window.innerHeight/150,a=[2,18,10,27,21,22,23,24,25,25,26,37,42,53,58,69,74,85,86,87,88,89,90,44,60,65,98,108],{useOffscreen:c,context:l}=ft({disableOffcanvas:e}),p=!0,{top:h,left:f}=be(t),d=t.getContext(l,{alpha:!0}),y=m.getActiveRoute(),{offscreen:v,offScreenCtx:T}=gt({useOffscreen:c,canvas:t});t.width=t.clientWidth,t.height=t.clientHeight;let S=bo({canvas:t,numberOfRow:n,numberOfColumn:s,cellWidth:r,cellHeight:o,gutter:i}).items,_=S.map(($,F)=>({...$,scale:0,mouseX:0,mouseY:0,hasFill:a.includes(F)})).toSorted($=>$.hasFill?-1:1),E=H.createLerp({data:{mouseX:0,mouseY:0}});_.forEach($=>{E.subscribeCache(({mouseX:F,mouseY:k})=>{$.mouseX=F,$.mouseY=k})});let x=H.createTimeTween({ease:"easeInOutSine",stagger:{each:5,from:"center",waitComplete:!1},data:{scale:0}});_.forEach($=>{x.subscribeCache(({scale:F})=>{$.scale=F})});let w=()=>{if(!d)return;let $=t.width,F=t.height,k=c?T:d;k&&(c&&v?(v.width=$,v.height=F):k.reset(),_.forEach(({x:L,y:C,width:M,height:D,mouseX:V,mouseY:B,scale:U,hasFill:oe,offsetXCenter:ce,offsetYCenter:q})=>{if(!oe)return;let Y=V-(t.width-(M+i)*s)/2,se=B-(t.height-(D+i)*n)/2,re=(L-Y)/250,ke=(C-se)/250,Ve=Math.sqrt(Math.pow(Math.abs(re),2)+Math.pow(Math.abs(ke),2)),K=ue.clamp(Math.abs(Ve),0,2),Te=0,Ee=Math.cos(Te)*(K+U),Oe=Math.sin(Te)*(K+U);k.setTransform(Ee,Oe,-Oe,Ee,Math.floor(ce+L),Math.floor(q+C)),k.beginPath(),k.rect(Math.floor(-M/2),Math.floor(-D/2),M,D),k.fillStyle="#000000",k.fill()}),k.globalCompositeOperation="destination-out",_.forEach(({x:L,y:C,width:M,height:D,mouseX:V,mouseY:B,scale:U,hasFill:oe,offsetXCenter:ce,offsetYCenter:q})=>{if(oe)return;let Y=V-(t.width-(M+i)*s)/2,se=B-(t.height-(D+i)*n)/2,re=(L-Y)/250,ke=(C-se)/250,Ve=Math.sqrt(Math.pow(Math.abs(re),2)+Math.pow(Math.abs(ke),2)),K=ue.clamp(Math.abs(Ve),0,2),Te=0,Ee=Math.cos(Te)*(K+U),Oe=Math.sin(Te)*(K+U);k.setTransform(Ee,Oe,-Oe,Ee,Math.floor(ce+L),Math.floor(q+C)),k.beginPath(),k.rect(Math.floor(-M/2),Math.floor(-D/2),M,D),k.fill()}),bt({useOffscreen:c,offscreen:v,ctx:d}))},I=Me.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(x,{scale:.3},{duration:1e3});I.play();let N=({x:$,y:F})=>{E.goTo({mouseX:$-f,mouseY:F-h}).catch(()=>{})},A=u.useMouseMove(({client:$})=>{let{x:F,y:k}=$;N({x:F,y:k})}),O=u.useTouchMove(({client:$})=>{let{x:F,y:k}=$;N({x:F,y:k})}),R=()=>{w(),p&&u.useNextFrame(()=>R())};u.useFrame(()=>{R()});let P=te.watch("navigationIsOpen",$=>{if($){I?.stop(),p=!1;return}setTimeout(async()=>{p=!0,m.getActiveRoute().route===y.route&&(I?.play(),u.useFrame(()=>R()))},500)});return()=>{x.destroy(),I.destroy(),E.destroy(),A(),O(),P(),x=null,I=null,E=null,d=null,v=null,T=null,S=[],p=!1,_=null,l=null}};var h_=({onMount:t,getState:e,setRef:r,getRef:o,bindEffect:n,getProxi:s})=>{let i=s(),a=()=>{};return t(()=>{let{canvas:c}=o();u.useFrame(()=>{u.useNextTick(()=>{a(),a=np({canvas:c,...e()})})});let l=u.useResize(()=>{a(),a=np({canvas:c,...e()})});return u.useFrame(()=>{"isMounted"in i&&(i.isMounted=!0)}),()=>{l(),a(),a=null}}),g`
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
    `};var d_=m.createComponent({tag:"animatedpattern-n1",component:h_,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1}});m.useComponent([d_]);var f_=async()=>{let{data:t}=await ne({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"#animatedPatternN0",nextRoute:"#scrollerN0",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <animatedpattern-n1
            ${m.staticProps({background:t})}
        ></animatedpattern-n1>
    </div>`};var g_=({canvas:t,disableOffcanvas:e})=>{let o=window.innerHeight/30,n=window.innerHeight/60,s=[14,5],i=.1,a=0,c=10,l=3,p=5e3,h=1,{useOffscreen:f,context:d}=ft({disableOffcanvas:e}),y=!0,v=t.getContext(d,{alpha:!0}),{top:T,left:S}=be(t),_=m.getActiveRoute(),{offscreen:E,offScreenCtx:x}=gt({useOffscreen:f,canvas:t}),w=!0;t.width=t.clientWidth,t.height=t.clientHeight;let I=[...Array.from({length:19}).keys()].map((V,B)=>{let U=B>=9.5?9.5+(9.5-B):B,oe=s.includes(B)?1:U*i;return{width:U*o,height:U*n,x:0,y:0,hasFill:s.includes(B),opacity:oe,radius:a,rotate:0,relativeIndex:U}}),N=H.createTimeTween({data:{rotate:0},stagger:{each:c,from:"center"},ease:"easeLinear",relative:!0}),A=[...I].map(V=>N.subscribeCache(({rotate:B})=>{V.rotate=B})),O=H.createSpring({data:{x:0,y:0},stagger:{each:l,from:"end"}});[...I].forEach(V=>{O.subscribeCache(({x:B,y:U})=>{V.x=B,V.y=U})});let R=()=>{if(!v)return;let V=t.width,B=t.height,U=t.width/2,oe=t.height/2,ce=I.length,q=Math.max(1,h/4),Y=f?x:v;Y&&(f&&E?(E.width=V,E.height=B):Y.reset(),I.forEach(({width:se,height:re,x:ke,y:Ve,rotate:K,hasFill:Te,opacity:Ee},Oe)=>{let Ye=ce-Oe,Ge=1,Lr=Math.PI/180*K,$t=Math.cos(Lr)*Ge,X=Math.sin(Lr)*Ge;Y.setTransform($t,X,-X,$t,U+ke+Ye*ke/20,oe+Ve+Ye*Ve/20);let Fr=Math.round(-se/2)*q,Be=Math.round(-re/2)*q;w?(Y.beginPath(),Y.roundRect(Fr,Be,se*q,re*q,130)):(Y.beginPath(),Y.rect(Fr,Be,se*q,re*q)),Te?Y.fillStyle="#000":(Y.fillStyle=`rgba(238, 238, 238, ${Ee})`,Y.strokeStyle=`rgba(0, 0, 0, ${Ee})`,Y.stroke()),Y.fill()}),bt({useOffscreen:f,offscreen:E,ctx:v}))},P=Me.createAsyncTimeline({repeat:-1,yoyo:!1,autoSet:!1});P.goTo(N,{rotate:360},{duration:p}),P.play();let $=()=>{R(),y&&u.useNextFrame(()=>$())};u.useFrame(()=>$());let F=u.useResize(()=>{t.width=t.clientWidth,t.height=t.clientHeight,T=be(t).top,S=be(t).left,R()}),k=ue.useVelocity(({speed:V})=>{h=V}),L=({x:V,y:B})=>{let U=window.innerWidth,oe=window.innerHeight,ce=V-t.width/2-S,q=B-t.height/2-T;O.goTo({x:ue.clamp(ce,-U/2+400+S,U/2-400-S),y:ue.clamp(q,-oe/2+200+T,oe/2-200-T)}).catch(()=>{})},C=u.useMouseMove(({client:V})=>{let{x:B,y:U}=V;L({x:B,y:U})}),M=u.useTouchMove(({client:V})=>{let{x:B,y:U}=V;L({x:B,y:U})}),D=te.watch("navigationIsOpen",V=>{if(V){y=!1,P?.pause(),N?.pause(),O?.pause();return}setTimeout(()=>{y=!0,m.getActiveRoute().route===_.route&&(P?.resume(),N?.resume(),O?.resume(),u.useFrame(()=>$()))},500)});return{destroy:()=>{N.destroy(),O.destroy(),P.destroy(),F(),C(),M(),k(),D(),A.forEach(V=>{V()}),A.length=0,N=null,O=null,P=null,v=null,E=null,x=null,y=!1,I=null,d=null},stopBlackOne:()=>{s.forEach(V=>{A[V]?.()})}}};function GM({delegateEvents:t,bindEffect:e,bindObject:r,proxi:o}){return g` <li class="c-canvas__controls__item">
        <button
            type="button"
            class="c-canvas__controls__btn"
            ${t({click:()=>{o.stopBlackOne(),o.blackOneIsStopped=!0}})}
            ${e({toggleAttribute:{disabled:()=>o.blackOneIsStopped}})}
        >
            Stop black one rotation
        </button>
        <p class="c-canvas__controls__status">
            ${r`${()=>o.blackOneIsStopped?"Black one rotation is off":""}`}
        </p>
    </li>`}var b_=({onMount:t,getRef:e,setRef:r,bindEffect:o,getProxi:n,delegateEvents:s,bindObject:i})=>{let a=n();return t(()=>{let{canvas:c}=e(),l={destroy:()=>{},stopBlackOne:()=>{}};return u.useFrame(()=>{u.useNextTick(()=>{a.destroy(),l=g_({canvas:c,disableOffcanvas:a.disableOffcanvas}),a.destroy=l.destroy,a.stopBlackOne=l.stopBlackOne})}),u.useFrame(()=>{"isMounted"in a&&(a.isMounted=!0)}),()=>{a.destroy(),a.destroy=()=>{},a.stopBlackOne=()=>{},l=null}}),g`
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
                    ${GM({delegateEvents:s,bindEffect:o,bindObject:i,proxi:a})}
                </ul>
                <div
                    class="c-canvas__wrap"
                    ${o({toggleClass:{active:()=>a.isMounted}})}
                >
                    <canvas ${r("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var v_=m.createComponent({tag:"caterpillar-n1",component:b_,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1,controlsActive:()=>({value:!1,type:Boolean}),destroy:()=>({value:()=>{},type:Function}),stopBlackOne:()=>({value:()=>{},type:Function}),blackOneIsStopped:()=>({value:!1,type:Boolean})}});m.useComponent([v_]);var y_=async()=>{let{data:t}=await ne({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"",nextRoute:"#scrollerN1",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <caterpillar-n1 ${m.staticProps({background:t})}>
        </caterpillar-n1>
    </div>`};var sp=({value:t,direction:e,isForced:r})=>{r||console.log(`current: ${t}, direction: ${e}`)},T_=({canvas:t,proxi:e})=>{let o=window.innerHeight/13,n=window.innerHeight/13,s=[2],i=.03,a=500,c=400,l=10,p=l/2/Math.PI,{useOffscreen:h,context:f}=ft({disableOffcanvas:e.disableOffcanvas}),d=!0,y=t.getContext(f,{alpha:!0}),v=m.getActiveRoute(),{offscreen:T,offScreenCtx:S}=gt({useOffscreen:h,canvas:t}),_=!0,E=[...Array.from({length:20}).keys()].map((R,P)=>{let $=P>=10?10+(10-P):P,F=o+o/3*$,k=n+n/3*$,L=s.includes(P)?1:(20-P)*i;return{width:F,height:k,x:0,y:0,hasFill:s.includes(P),opacity:L,rotate:0}});t.width=t.clientWidth,t.height=t.clientHeight;let x=H.createSequencer({stagger:{each:7},data:{x:l/4,rotate:0},duration:l}).goTo({x:l+l/4},{start:0,end:l,ease:"easeLinear"}).goTo({rotate:()=>-e.rotation},{start:0,end:5,ease:"easeInOutBack"}).goTo({rotate:0},{start:5,end:l,ease:"easeInOutBack"}).label("mylabel",2).add(({isForced:R,direction:P})=>{sp({isForced:R,direction:P,value:1})},1).add(({isForced:R,direction:P})=>{sp({isForced:R,direction:P,value:5})},5).add(({isForced:R,direction:P})=>{sp({isForced:R,direction:P,value:9})},9);E.forEach(R=>{x.subscribeCache(({x:P,rotate:$})=>{let F=P/p,k=2/(3-Math.cos(2*F)),L=k*Math.cos(F)*a,C=k*Math.sin(2*F)/2*c;R.x=L,R.y=C,R.rotate=$})});let w=Me.createSyncTimeline({repeat:-1,yoyo:!1,duration:4e3}).add(x);w.onLoopEnd(({loop:R,direction:P})=>{console.log(`loop end: ${R} , ${P}`)});let I=()=>{if(!y)return;let R=t.width,P=t.height,$=t.width/2,F=t.height/2,k=h?S:y;k&&(h&&T?(T.width=R,T.height=P):k.reset(),E.forEach(({width:L,height:C,x:M,y:D,rotate:V,hasFill:B,opacity:U})=>{let ce=Math.PI/180*V,q=Math.cos(ce)*1,Y=Math.sin(ce)*1;k.setTransform(q,Y,-Y,q,$+M,F+D);let se=Math.round(-L/2),re=Math.round(-C/2);_?(k.beginPath(),k.roundRect(se,re,L,C,[40,40])):(k.beginPath(),k.rect(se,re,L,C)),B?k.fillStyle="#000000":(k.strokeStyle=`rgba(0, 0, 0, ${U})`,k.fillStyle="rgba(238, 238, 238, 0)",k.stroke()),k.fill()}),bt({useOffscreen:h,offscreen:T,ctx:y}))},N=()=>{I(),d&&u.useNextFrame(()=>N())};u.useFrame(()=>N()),w.play();let A=u.useResize(()=>{t.width=t.clientWidth,t.height=t.clientHeight,I()}),O=te.watch("navigationIsOpen",R=>{if(R){d=!1,w?.pause();return}setTimeout(()=>{d=!0,m.getActiveRoute().route===v.route&&(w?.resume(),u.useFrame(()=>N()))},500)});return{destroy:()=>{d=!1,A(),O(),x.destroy(),x=null,w.destroy(),w=null,y=null,T=null,S=null,E=null,f=null},play:()=>{w.play()},playReverse:()=>{w.playReverse()},playUseCurrent:()=>{w.play({useCurrent:!0})},playReverseUseCurrent:()=>{w.playReverse({useCurrent:!0})},playFromLabel:()=>{w.playFrom("mylabel")},plaFromLabelReverse:()=>{w.playFromReverse("mylabel")},stop:()=>w.stop(),pause:()=>w.pause(),resume:()=>w.resume(),reverse:()=>w.reverse()}};function qM({buttons:t}){return Object.entries(t).map(([e,r])=>{let{label:o}=r;return g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn ${e}"
                >
                    ${o}
                </button>
            </li>`}).join("")}var __=({onMount:t,setRef:e,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s,bindObject:i})=>{let a=n(),c=u.getUnivoqueId();return t(({element:l})=>{let{canvas:p}=r(),h=()=>{},f=T_({canvas:p,proxi:a});return u.useFrame(()=>{u.useNextTick(()=>{({destroy:h}=f)})}),Object.entries(a.buttons).forEach(([d,y])=>{let{method:v}=y;l.querySelector(`.${d}`)?.addEventListener("click",()=>f?.[v]())}),u.useFrame(()=>{"isMounted"in a&&(a.isMounted=!0)}),()=>{h(),h=null}}),g`
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
                        ${qM({buttons:a.buttons})}
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
                    <canvas ${e("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var JM={"js-CN2-play":{label:"play",method:"play"},"js-CN2-playReverse":{label:"play reverse",method:"playReverse"},"js-CN2-play-current":{label:"go forward if is backward",method:"playUseCurrent"},"js-CN2-playReverse-current":{label:"go backward if is forward",method:"playReverseUseCurrent"},"js-CN2-play-label":{label:"play from label",method:"playFromLabel"},"js-CN2-playReverse-label":{label:"play from label reverse",method:"plaFromLabelReverse"},"js-CN2-reverse":{label:"reverse",method:"reverse"},"js-CN2-stop":{label:"stop",method:"stop"},"js-CN2-pause":{label:"pause",method:"pause"},"js-CN2-resume":{label:"resume",method:"resume"}},S_=m.createComponent({tag:"caterpillar-n2",component:__,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1,rotation:()=>({value:166,type:Number}),rotationlabel:()=>({value:166,type:Number}),controlsActive:()=>({value:!1,type:Boolean}),buttons:()=>({value:JM,type:"Any"})}});m.useComponent([S_]);var x_=async()=>{let{data:t}=await ne({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"#scrollerN1",nextRoute:"#async-timeline",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <caterpillar-n2
            ${m.staticProps({background:t})}
        ></caterpillar-n2>
    </div>`};var Sc=()=>{m.useMethodByName(oi).update(!0)},xc=()=>{m.useMethodByName(oi).update(!1)};var C_=({canvas:t,canvasScroller:e,stagger:r,disableOffcanvas:o})=>{let n=window.innerWidth/20,s=window.innerHeight/20,i=1,a=10,c=10,l=!1,p=[36,37,38,39,40,47,51,58,62,69,73,80,81,82,83,84],{useOffscreen:h,context:f}=ft({disableOffcanvas:o}),d=!0,y=H.createMasterSequencer(),v=t.getContext(f,{alpha:!0}),T=m.getActiveRoute(),{offscreen:S,offScreenCtx:_}=gt({useOffscreen:h,canvas:t}),E=h?_:v,x=go(E);E=null,t.width=t.clientWidth,t.height=t.clientHeight;let w=bo({canvas:t,numberOfRow:a,numberOfColumn:c,cellWidth:n,cellHeight:s,gutter:i}).items,I=l?w.map((F,k)=>({...F,scale:1,rotate:0,hasFill:p.includes(k)})).toSorted(F=>F.hasFill?-1:1):w.map((F,k)=>({...F,scale:1,rotate:0,hasFill:p.includes(k)})),N=H.createStaggers({items:I,stagger:r}),A=N.map(({item:F,start:k,end:L})=>{let C=H.createSequencer({data:{scale:1}}).goTo({scale:0},{start:k,end:L,ease:"easeInOutQuad"}),M=C.subscribe(({scale:D})=>{F.scale=D});return y.add(C),{sequencer:C,unsubscribe:M}}),O=()=>{if(!v)return;let F=t.width,k=t.height,L=h?_:v;L&&(h&&S?(S.width=F,S.height=k):L.reset(),I.forEach(({x:C,y:M,width:D,height:V,rotate:B,scale:U,hasFill:oe,offsetXCenter:ce,offsetYCenter:q})=>{let Y=Math.PI/180*B,se=Math.cos(Y)*U,re=Math.sin(Y)*U;L.setTransform(se,re,-re,se,Math.floor(ce+C),Math.floor(q+M));let ke=Math.round(-D/2),Ve=Math.round(-V/2);x?(L.beginPath(),L.roundRect(ke,Ve,D,V,150)):(L.beginPath(),L.rect(ke,Ve,D,V)),oe?(L.fillStyle="#000000",L.fill()):(L.strokeStyle="#000",L.fillStyle="rgb(238, 238, 238)",L.fill(),x||(L.strokeStyle="#ccc"))}),bt({useOffscreen:h,offscreen:S,ctx:v}))},R=Ke.createScrollTrigger({trigger:e,propierties:"tween",tween:y,dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>le(e)},reverse:!1,ease:!0,easeType:"lerp"});R.init();let P=()=>{O(),d&&u.useNextFrame(()=>P())};u.useFrame(()=>{P()});let $=te.watch("navigationIsOpen",F=>{if(F){d=!1;return}setTimeout(async()=>{d=!0,m.getActiveRoute().route===T.route&&u.useFrame(()=>P())},500)});return()=>{$(),A.forEach(({sequencer:F,unsubscribe:k})=>{F.destroy(),k()}),A=[],y.destroy(),y=null,N=[],R.destroy(),R=null,v=null,S=null,_=null,w=[],d=!1,I=null,f=null}};var ip=[{label:"random",params:{stagger:{type:"equal",each:6,from:"random"}}},{label:"column",params:{stagger:{type:"equal",each:7,from:"center",grid:{col:11,row:10,direction:"col"}}}},{label:"row",params:{stagger:{type:"equal",each:3,from:"start",grid:{col:11,row:10,direction:"row"}}}},{label:"sequential",params:{stagger:{type:"equal",each:2,from:"end"}}}];var ap=({proxi:t,getRef:e,resetScroll:r=!0})=>{r&&window.scrollTo(0,0),t.destroy(),t.destroy=C_({canvas:e().canvas,canvasScroller:e().canvasScroller,...ip[t.currentParamsId].params,disableOffcanvas:!0})};function YM({delegateEvents:t,bindEffect:e,proxi:r,getRef:o}){return ip.map(({label:n},s)=>g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn"
                    ${t({click:()=>{r.currentParamsId=s,ap({proxi:r,getRef:o})}})}
                    ${e({toggleClass:{active:()=>r.currentParamsId===s}})}
                >
                    ${n}
                </button>
            </li>`).join("")}var E_=({onMount:t,setRef:e,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s})=>{let i=n();return t(()=>{Sc(),u.useFrame(()=>{u.useNextTick(()=>{ap({proxi:i,getRef:r})})});let a=u.useResize(()=>{ap({proxi:i,getRef:r,resetScroll:!1})});return u.useFrame(()=>{"isMounted"in i&&(i.isMounted=!0)}),()=>{i.destroy(),i.destroy=()=>{},xc(),a()}}),g`
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
                    ${YM({delegateEvents:s,bindEffect:o,proxi:i,getRef:r})}
                </ul>
                <div class="background-shape">${i.background}</div>
                <div
                    class="c-canvas__wrap"
                    ${o({toggleClass:{active:()=>i.isMounted}})}
                >
                    <canvas ${e("canvas")}></canvas>
                </div>
            </div>
            <div class="c-canvas-scroller" ${e("canvasScroller")}></div>
        </div>
    `};var w_=m.createComponent({tag:"scroller-n0",component:E_,props:{background:()=>({value:"",type:String})},state:{isMounted:()=>({value:!1,type:Boolean}),controlsActive:()=>({value:!1,type:Boolean}),destroy:()=>({value:()=>{},type:Function}),currentParamsId:()=>({value:0,type:Number})}});m.useComponent([w_]);var I_=async()=>{let{data:t}=await ne({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"#animatedPatternN1",nextRoute:"",backRoute:"#canvas-overview"}),g`<div>
        <scroller-n0
            ${m.staticProps({background:t})}
        ></scroller-n0>
    </div>`};function XM({width:t,relativeIndex:e,amountOfPath:r}){return Math.sqrt(Math.pow(t*e,2)-Math.pow(t*e/r*e,2))*2}function KM({height:t,relativeIndex:e,amountOfPath:r}){return Math.sqrt(Math.pow(t*e,2)-Math.pow(t*e/r*e,2))*2}var M_=({canvas:t,canvasScroller:e,disableOffcanvas:r,proxi:o})=>{let l=new Set([14,5]),{useOffscreen:p,context:h}=ft({disableOffcanvas:r}),f=!0,d=t.getContext(h,{alpha:!0}),y=m.getActiveRoute(),{offscreen:v,offScreenCtx:T}=gt({useOffscreen:p,canvas:t}),S=p?T:d,_=go(S);S=null,t.width=t.clientWidth,t.height=t.clientHeight;let E=[...Array.from({length:17}).keys()].map((R,P)=>{let $=P>=8.5?8.5+(8.5-P):P;return{width:Math.floor(XM({width:15,relativeIndex:$,amountOfPath:17})),height:Math.floor(KM({height:30,relativeIndex:$,amountOfPath:17})),opacity:$*.09,hasFill:l.has(P),rotate:0,relativeIndex:$,index:P}}),x=H.createScrollerTween({from:{rotate:0},to:{rotate:()=>o.rotation},stagger:{each:2,from:"center"}});[...E].forEach(R=>{x.subscribeCache(({rotate:P})=>{R.rotate=P})});let w=()=>{if(!d)return;let R=t.width,P=t.height,$=t.width/2,F=t.height/2,k=p?T:d;k&&(p&&v?(v.width=R,v.height=P):k.reset(),E.forEach(({width:L,height:C,opacity:M,rotate:D,index:V,hasFill:B})=>{let U=E.length/2-V,oe=1,ce=Math.PI/180*(D-33),q=Math.cos(ce)*oe,Y=Math.sin(ce)*oe;k.setTransform(q,Y,-Y,q,$,F+U*19),_?(k.beginPath(),k.roundRect(-L/2,-C/2+U*19,L,C,150)):(k.beginPath(),k.rect(Math.round(-L/2),Math.round(-C/2),L,C)),B?k.fillStyle="#000":(k.fillStyle=`rgba(238, 238, 238, ${M})`,k.strokeStyle=`rgba(0, 0, 0, ${M})`,k.stroke()),k.fill()}),bt({useOffscreen:p,offscreen:v,ctx:d}))},I=Ke.createScrollTrigger({trigger:e,propierties:"tween",tween:x,dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>le(e)},ease:!0,easeType:"spring"});I.init();let N=()=>{w(),f&&u.useNextFrame(()=>N())};u.useFrame(()=>{N()});let A=u.useResize(()=>{t.width=t.clientWidth,t.height=t.clientHeight,u.useFrame(()=>{w()})}),O=te.watch("navigationIsOpen",R=>{if(R){f=!1;return}setTimeout(()=>{f=!0,m.getActiveRoute().route===y.route&&u.useFrame(()=>N())},500)});return()=>{x.destroy(),A(),O(),x.destroy(),x=null,I.destroy(),I=null,d=null,v=null,T=null,x=null,f=!1,E=null,h=null}};function QM({proxi:t,delegateEvents:e,bindObject:r}){let o=u.getUnivoqueId();return g` <li class="c-canvas__controls__item">
        <div class="c-canvas__controls__range">
            <input
                type="range"
                min="360"
                max="2220"
                value="${t.rotation}"
                step="10"
                id=${o}
                ${e({"change:force":n=>{let s=n.currentTarget;s&&(t.rotation=Number(s.value))},input:n=>{let s=n.currentTarget;s&&(t.rotationlabel=Number(s.value))}})}
            />
        </div>
        <label for=${o} class="c-canvas__controls__range-value">
            ${r`rotationValue: ${()=>t.rotationlabel}`}
        </label>
    </li>`}var k_=({onMount:t,setRef:e,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s,bindObject:i})=>{let a=n();return t(()=>{let c=()=>{};Sc();let{canvas:l,canvasScroller:p}=r();return u.useFrame(()=>{u.useNextTick(()=>{c(),c=M_({canvas:l,canvasScroller:p,disableOffcanvas:a.disableOffcanvas,proxi:a})})}),u.useFrame(()=>{"isMounted"in a&&(a.isMounted=!0)}),()=>{c(),xc(),c=null}}),g`
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
                    ${QM({proxi:a,delegateEvents:s,bindObject:i})}
                </ul>
                <div
                    class="c-canvas__wrap"
                    ${o({toggleClass:{active:()=>a.isMounted}})}
                >
                    <canvas ${e("canvas")}></canvas>
                </div>
            </div>
            <div class="c-canvas-scroller" ${e("canvasScroller")}></div>
        </div>
    `};var R_=m.createComponent({tag:"scroller-n1",component:k_,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1,controlsActive:()=>({value:!1,type:Boolean}),rotation:()=>({value:720,type:Number}),rotationlabel:()=>({value:720,type:Number})}});m.useComponent([R_]);var P_=async()=>{let{data:t}=await ne({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"#caterpillarN1",nextRoute:"#caterpillarN2",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <scroller-n1 ${m.staticProps({background:t})}></scroller-n1>
    </div>`};var N_=({getProxi:t,bindEffect:e})=>{let r=t();return g`
        <button
            type="button"
            class="c-dynamic-list-button"
            ${e({observe:"active",toggleClass:{active:()=>r.active}})}
        >
            ${r.label}
        </button>
    `};var Gn=m.createComponent({tag:"dynamic-list-button",component:N_,props:{label:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean})}});var Cc=[{key:"a",label:"A"},{key:"b",label:"B"},{key:"c",label:"C"},{key:"d",label:"D"}],A_=[{key:"f",label:"F"},{key:"b",label:"B"},{key:"e",label:"E"},{key:"c",label:"C"},{key:"b",label:"B"},{key:"a",label:"A"},{key:"g",label:"G"},{key:"h",label:"H"},{key:"d",label:"D"},{key:"b",label:"B"}],O_=[{key:"m",label:"M"},{key:"q",label:"Q"},{key:"z",label:"Z"},{key:"i",label:"I"},{key:"b",label:"B"},{key:"e",label:"E"},{key:"n",label:"N"},{key:"a",label:"A"},{key:"g",label:"G"},{key:"h",label:"H"},{key:"l",label:"L"},{key:"j",label:"J"},{key:"d",label:"D"}],$_=[{key:"h",label:"H"},{key:"f",label:"F"},{key:"a",label:"A"},{key:"d",label:"D"}],qn=[[{key:4}],[{key:20},{key:10},{key:10},{key:6},{key:10},{key:10},{key:30}],[{key:3},{key:20},{key:5},{key:20},{key:5},{key:5},{key:5},{key:5},{key:60},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:10},{key:5}]];var ZM=[{buttonLabel:"sample1",data:A_},{buttonLabel:"salmple2",data:O_},{buttonLabel:"sample3",data:$_},{buttonLabel:"Initial",data:Cc}],ek=[{label:"repeater with key",key:"key",clean:!1},{label:"repeater without key",key:"",clean:!1},{label:"repeater clear",key:"",clean:!0}];function tk({staticProps:t,delegateEvents:e,bindProps:r,proxi:o}){return ZM.map((n,s)=>{let{data:i,buttonLabel:a}=n;return g`
                <dynamic-list-button
                    class="c-dynamic-list__top__button"
                    ${t({label:a})}
                    ${e({click:async()=>{o.data=i,o.activeSample=s}})}
                    ${r(()=>({active:s===o.activeSample}))}
                ></dynamic-list-button>
            `}).join("")}function rk({bindProps:t,staticProps:e,proxi:r}){return ek.map((o,n)=>{let{key:s,clean:i,label:a}=o;return g`
                <dynamic-list-repeater
                    ${e({listId:n,key:s,clean:i,label:a})}
                    ${t(()=>({data:r.data,counter:r.counter}))}
                ></dynamic-list-repeater>
            `}).join("")}var L_=({updateState:t,staticProps:e,bindProps:r,delegateEvents:o,invalidate:n,bindText:s,getProxi:i})=>{let a=i();return g`
        <div class="c-dynamic-list">
            <div class="c-dynamic-list__header">
                <div class="c-dynamic-list__top">
                    ${tk({delegateEvents:o,staticProps:e,bindProps:r,proxi:a})}
                    <dynamic-list-button
                        class="c-dynamic-list__top__button"
                        ${e({label:"+ counter ( max: 10 )"})}
                        ${o({click:async()=>{t("counter",c=>c+1)}})}
                    ></dynamic-list-button>
                    <dynamic-list-button
                        class="c-dynamic-list__top__button"
                        ${e({label:"- counter: ( min 0 )"})}
                        ${o({click:async()=>{t("counter",c=>c>0?c-=1:c)}})}
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
                    ${rk({bindProps:r,staticProps:e,proxi:a})}
                </div>
            </div>
        </div>
    `};function ok({staticProps:t,bindProps:e,delegateEvents:r,current:o,proxi:n}){return g`
        <div class="c-dynamic-list-repeater__item">
            <dynamic-list-card
                ${t({parentListId:n.listId})}
                ${e(()=>({counter:n.counter,label:o.value.label,index:o.index}))}
                ${r({click:()=>{console.log(o.value?.label,o.index)}})}
            >
                <dynamic-slotted-label
                    slot="card-label-slot"
                    ${e(()=>({label:`label: ${o.value.label} <br/> counter: ${n.counter}`}))}
                >
                </dynamic-slotted-label>
            </dynamic-list-card>
        </div>
    `}var F_=({staticProps:t,bindProps:e,delegateEvents:r,repeat:o,getProxi:n})=>{let s=n(),i=s.key.length>0?s.key:void 0;return g`
        <div class="c-dynamic-list-repeater">
            <h4 class="c-dynamic-list-repeater__title">${s.label}</h4>
            <div class="c-dynamic-list-repeater__list">
                ${o({observe:()=>s.data,clean:s.clean,key:i,afterUpdate:()=>{console.log("repeater updated")},render:({current:a})=>ok({staticProps:t,bindProps:e,delegateEvents:r,current:a,proxi:s})})}
            </div>
        </div>
    `};function nk(t){return[...Array.from({length:t}).keys()].map(e=>e+1)}var sk=({staticProps:t,delegateEvents:e,proxi:r})=>g`
        ${nk(r.counter).map(o=>g`
                    <div class="validate-test-wrapper">
                        <dynamic-list-card-inner
                            ${t({key:`${o}`})}
                            ${e({click:()=>{console.log("invalidate inside reepater click")}})}
                        >
                        </dynamic-list-card-inner>
                    </div>
                `).join("")}
    `,D_=({onMount:t,key:e,staticProps:r,bindProps:o,id:n,delegateEvents:s,invalidate:i,repeat:a,bindText:c,bindEffect:l,getProxi:p,computed:h})=>{let f=p(),d=0;h(()=>f.innerDataUnivoque,()=>f.innerData.filter((v,T,S)=>S.map(({key:_})=>_).indexOf(v.key)===T)),t(async()=>((async()=>(await m.tick(),"isMounted"in f&&(f.isMounted=!0)))(),()=>{}));let y=f.isFull?"is-full":"";return g`
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
                <div class="key">key: ${e.length>0?e:"no-key"}</div>
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
                        ${s({click:async()=>{d=d<qn.length-1?d+1:0,f.innerData=qn[d],await m.tick()}})}
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
                        ${i({observe:()=>f.counter,render:()=>sk({delegateEvents:s,staticProps:r,proxi:f})})}
                    </div>
                </div>
            </div>
        </div>
    `};var B_=({bindText:t})=>g`<span class="dynamic-list-card-inner">
        <span>${t`${"key"}`}</span>
    </span>`;var Ec=m.createComponent({tag:"dynamic-list-card-inner",component:B_,props:{key:()=>({value:"",type:String})}});var V_=({getState:t,bindText:e})=>{let{parentListId:r}=t();return g`<div class="dynamic-counter">
        <p class="c-dynamic-counter__title">Nested:</p>
        <p class="c-dynamic-counter__subtitle">(slotted)</p>
        <p class="c-dynamic-counter__list">list index: ${r}</p>
        <span>${e`${"counter"}`}</span>
    </div>`};var W_=m.createComponent({tag:"dynamic-list-counter",component:V_,props:{parentListId:()=>({value:-1,type:Number}),counter:()=>({value:0,type:Number})}});var j_=()=>g`<div class="c-dynamic-list-empty">
        <p>empty comp</p>
        <mobjs-slot name="empty-slot"></mobjs-slot>
    </div>`;var z_=m.createComponent({tag:"dynamic-list-empty",component:j_});var H_=m.createComponent({tag:"dynamic-list-card",component:D_,props:{parentListId:()=>({value:-1,type:Number}),isFull:()=>({value:!1,type:Boolean}),label:()=>({value:"-",type:String}),index:()=>({value:-1,type:Number}),counter:()=>({value:1,type:Number})},state:{innerData:()=>({value:qn[0],type:Array}),innerDataUnivoque:()=>({value:qn[0],type:Array}),isSelected:()=>({value:!1,type:Boolean}),isMounted:()=>({value:!1,type:Boolean})},child:[W_,z_,Ec,Gn]});var U_=({bindText:t})=>g`<div class="c-dynamic-list-slotted-label">
        <p class="content">${t`slotted: ${"label"}`}</p>
    </div>`;var G_=m.createComponent({tag:"dynamic-slotted-label",component:U_,props:{label:()=>({value:"",type:String})}});var q_=m.createComponent({tag:"dynamic-list-repeater",component:F_,props:{data:()=>({value:[],type:Array}),key:()=>({value:"",type:String}),clean:()=>({value:!1,type:Boolean}),listId:()=>({value:-1,type:Number}),counter:()=>({value:-1,type:Number}),label:()=>({value:"",type:String})},child:[H_,G_]});var J_=m.createComponent({tag:"dynamic-list",component:L_,state:{counter:()=>({value:1,type:Number,validate:t=>t<=10&&t>=0,strict:!0}),data:()=>({value:Cc,type:Array}),activeSample:()=>({value:3,type:Number})},child:[Gn,q_,Ec]});m.useComponent([J_]);var Y_=()=>g` <dynamic-list> </dynamic-list> `;var X_=({refs:t})=>{let e=H.createTimeTween({data:{scale:0},duration:3e3,ease:"easeOutBack",stagger:{each:8,from:"end"}}),r=H.createTimeTween({data:{scale:1},duration:6e3,ease:"easeInOutQuad",stagger:{each:12,from:"end"}});t.forEach(i=>{e.subscribeCache(({scale:a})=>{i.style.scale=`${a}`}),r.subscribeCache(({scale:a})=>{i.style.scale=`${a}`})});let o=Me.createAsyncTimeline({repeat:1,autoSet:!1}).goTo(e,{scale:1}),n=Me.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(r,{scale:1.1}),s=te.watch("navigationIsOpen",i=>{if(i){o.isActive()&&o.pause(),n.isActive()&&n.pause();return}o.isActive()&&o.resume(),n.isActive()&&n.resume()});return{playIntro:()=>o?.play(),playSvg:()=>{n?.play()},destroy:()=>{s(),e.destroy(),e=null,o.destroy(),o=null,r.destroy(),r=null,n.destroy(),n=null}}};var ik=async({playIntro:t,playSvg:e})=>{await t(),e()},K_=({onMount:t,getProxi:e})=>{let r=e(),{svg:o}=r;return t(({element:n})=>{let s=[...n.querySelectorAll("svg")],{destroy:i,playIntro:a,playSvg:c}=X_({refs:s});return setTimeout(()=>{ik({playIntro:a,playSvg:c})},500),()=>{i()}}),g`<div class="l-index">
        <div class="l-index__logo">
            ${o.map(n=>g`${n}`).join("")}
        </div>
    </div>`};var Q_=m.createComponent({tag:"home-component",component:K_,props:{svg:()=>({value:[],type:Array})},state:{isMounted:()=>({value:!1,type:Boolean})}});var vo=({svg:t,id:e})=>{let r=document.createRange().createContextualFragment(t),o=r.querySelectorAll('[type="layer"]'),n=r.querySelectorAll('[type="delete"]');return[...o].forEach(i=>{i.id!==e&&i.remove()}),[...n].forEach(i=>{i.remove()}),Ry(r)};m.useComponent([Q_]);var Z_=async()=>{let{data:t}=await ne({source:"./asset/svg/ms_nord_type.svg?v=1.4"}),{data:e}=await ne({source:"./asset/svg/lettering-mob.svg?v=1.3"}),[r,o,n,s,i,a,c,l,p,h,f]=["due","tre","quattro","cinque","sei","sette","otto","nove","dieci","undici","dodici"].map(d=>vo({svg:t,id:d}));return g`
        <div>
            <div class="background-shape">${e}</div>
            <home-component
                ${m.staticProps({svg:[r,o,n,s,i,a,c,l,p,h,f]})}
            ></home-component>
        </div>
    `};var eS=[{state:"level1",maxItem:10,ref:"level1_counter",label_plus:"level1 +",label_minus:"level1 -"},{state:"level2",maxItem:10,ref:"level2_counter",label_plus:"level2 +",label_minus:"level2 -"},{state:"level3",maxItem:6,ref:"level3_counter",label_plus:"level3 +",label_minus:"level3 -"}];function ak(t){return Math.floor(Math.random()*t)}var wc=({delegateEvents:t,updateState:e,invalidate:r,proxi:o})=>g`
        ${eS.map(n=>g` <div class="matrioska__head__item">
                    <dynamic-list-button
                        class="matrioska__button"
                        ${t({click:async()=>{e(n.state,s=>s.slice(0,-1))}})}
                        >${n.label_minus}</dynamic-list-button
                    >
                    <dynamic-list-button
                        class="matrioska__button"
                        ${t({click:async()=>{e(n.state,s=>[...s,{key:ak(1e3),value:u.getUnivoqueId()}])}})}
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
                ${t({click:()=>{e("counter",n=>n+1)}})}
                >Increment counter</dynamic-list-button
            >
        </div>
    `;var Jn=t=>{m.useMethodByName(t).toggleActive()};var tS=({repeat:t,staticProps:e,bindProps:r,delegateEvents:o,proxi:n})=>g`
        <div class="matrioska__level matrioska__level--3">
            ${t({observe:()=>n.level3,render:({current:s})=>{let i=u.getUnivoqueId(),a=u.getUnivoqueId();return g`
                        <div
                            class="matrioska__item-wrap matrioska__item-wrap--3"
                        >
                            <matrioska-item
                                class="matrioska-item--3"
                                name="${i}"
                                ${e({level:"level 3"})}
                                ${r(()=>({key:`${s.value.key}`,value:`${s.value.value}`,index:s.index,counter:n.counter}))}
                                ${o({click:()=>{Jn(i)}})}
                            >
                            </matrioska-item>
                            <matrioska-item
                                class="matrioska-item--3"
                                name="${a}"
                                ${e({level:"level 3"})}
                                ${r(()=>({key:`${s.value.key}`,value:`${s.value.value}`,index:s.index,counter:n.counter}))}
                                ${o({click:()=>{Jn(a)}})}
                            >
                            </matrioska-item>
                        </div>
                    `}})}
        </div>
    `;var rS=({repeat:t,staticProps:e,bindProps:r,delegateEvents:o,proxi:n})=>g`
        <div class="matrioska__level matrioska__level--2">
            ${t({observe:()=>n.level2,render:({current:s})=>g`
                        <div
                            class="matrioska__item-wrap matrioska__item-wrap--2"
                        >
                            <matrioska-item
                                class="matrioska-item--2"
                                ${e({level:"level 2"})}
                                ${r(()=>({key:`${s.value.key}`,value:`${s.value.value}`,index:s.index,counter:n.counter}))}
                            >
                                ${tS({repeat:t,staticProps:e,delegateEvents:o,bindProps:r,proxi:n})}
                            </matrioska-item>
                        </div>
                    `})}
        </div>
    `;var oS=({delegateEvents:t,updateState:e,repeat:r,staticProps:o,bindProps:n,invalidate:s,getProxi:i})=>{let a=i();return g`<div class="matrioska">
        <div class="matrioska__head">
            ${wc({delegateEvents:t,updateState:e,invalidate:s,proxi:a})}
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
                                    ${rS({repeat:r,staticProps:o,bindProps:n,delegateEvents:t,proxi:a})}
                                </matrioska-item>
                            </div>
                        `})}
            </div>
        </div>
    </div>`};var nS=({getProxi:t,bindText:e,id:r,bindEffect:o,addMethod:n})=>{let s=t();return n("toggleActive",()=>{s.active=!s.active}),g`<matrioska-item
        class="matrioska-item"
        ${o({toggleClass:{active:()=>s.active}})}
    >
        <div class="matrioska-item__info">
            <h4 class="matrioska-item__level">${s.level}:</h4>
            <h6 class="matrioska-item__key">
                ${e`key: <span>${"key"}</span>`}
            </h6>
            <h6 class="matrioska-item__key">
                ${e`index: <span>${"index"}</span>`}
            </h6>
            <h6 class="matrioska-item__value">
                ${e`Value: <span>${"value"}</span>`}
            </h6>
            <h6 class="matrioska-item__value">
                ${e`counter: <span>${"counter"}</span>`}
            </h6>
            <h6 class="matrioska-item__value">
                Component id: <span>${r}</span>
            </h6>
        </div>
        <div class="matrioska-item__child">
            <mobjs-slot></mobjs-slot>
        </div>
    </matrioska-item>`};var sS=m.createComponent({tag:"matrioska-item",component:nS,props:{level:()=>({value:"",type:String}),key:()=>({value:"",strict:!0,type:String}),index:()=>({value:0,strict:!0,type:Number}),value:()=>({value:"",type:String}),counter:()=>({value:-1,type:Number})},state:{active:()=>({value:!1,type:Boolean})},style:":host { display: block; } "});var iS=({staticProps:t,delegateEvents:e,invalidate:r,bindProps:o,proxi:n})=>g` <div class="matrioska__level matrioska__level--3">
        ${r({observe:"level3",render:()=>n.level3.map((s,i)=>{let a=u.getUnivoqueId(),c=u.getUnivoqueId();return g`
                            <div
                                class="matrioska__item-wrap matrioska__item-wrap--3"
                            >
                                <matrioska-item
                                    class="matrioska-item--3"
                                    name="${a}"
                                    ${t({level:"level 3",value:s.value,index:i,key:`${s.key}`})}
                                    ${o(()=>({counter:n.counter}))}
                                    ${e({click:()=>{Jn(a)}})}
                                >
                                </matrioska-item>
                                <matrioska-item
                                    class="matrioska-item--3"
                                    name="${c}"
                                    ${t({level:"level 3",index:i,value:s.value,key:`${s.key}`})}
                                    ${o(()=>({counter:n.counter}))}
                                    ${e({click:()=>{Jn(c)}})}
                                >
                                </matrioska-item>
                            </div>
                        `}).join("")})}
    </div>`;var aS=({staticProps:t,bindProps:e,delegateEvents:r,invalidate:o,proxi:n})=>g`
        <div class="matrioska__level matrioska__level--2">
            ${o({observe:()=>n.level2,render:()=>n.level2.map((s,i)=>g`
                                <div
                                    class="matrioska__item-wrap matrioska__item-wrap--2"
                                >
                                    <matrioska-item
                                        class="matrioska-item--2"
                                        ${t({level:"level 2",index:i,key:`${s.key}`,value:`${s.value}`})}
                                        ${e(()=>({counter:n.counter}))}
                                    >
                                        ${iS({staticProps:t,delegateEvents:r,invalidate:o,bindProps:e,proxi:n})}
                                    </matrioska-item>
                                </div>
                            `).join("")})}
        </div>
    `;var cS=({delegateEvents:t,updateState:e,staticProps:r,bindProps:o,invalidate:n,getProxi:s})=>{let i=s();return g`<div class="matrioska">
        <div class="matrioska__head">
            ${wc({delegateEvents:t,updateState:e,invalidate:n,proxi:i})}
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
                                            ${aS({staticProps:r,bindProps:o,delegateEvents:t,invalidate:n,proxi:i})}
                                        </matrioska-item>
                                    </div>
                                `).join("")})}
            </div>
        </div>
    </div>`};var ck=t=>{for(let e=t.length-1;e>0;e--){let r=Math.floor(Math.random()*(e+1));[t[e],t[r]]=[t[r],t[e]]}return t},lS={state:{level1:()=>({value:[{key:1,value:u.getUnivoqueId()}],type:Array,validate:t=>t.length<=10,strict:!0}),level2:()=>({value:[{key:1,value:u.getUnivoqueId()},{key:2,value:u.getUnivoqueId()}],type:Array,validate:t=>t.length<=10,strict:!0}),level3:()=>({value:[{key:1,value:u.getUnivoqueId()},{key:2,value:u.getUnivoqueId()}],type:Array,transform:(t,e)=>t>e?ck(t):t,validate:t=>t.length<=6,strict:!0}),counter:()=>({value:0,type:Number})},child:[Gn,sS]},uS=m.createComponent({tag:"page-matrioska-repeat",component:oS,...lS}),pS=m.createComponent({tag:"page-matrioska-invalidate",component:cS,...lS});m.useComponent([uS,pS]);var mS=()=>g` <page-matrioska-repeat> </page-matrioska-repeat> `,hS=()=>g` <page-matrioska-invalidate> </page-matrioska-invalidate> `;var cp=0,lk=({indicators:t,proxi:e})=>[...t].map((r,o)=>Ke.createScrollTrigger({item:r,pin:!0,animateAtStart:!1,animatePin:!0,useThrottle:!0,ease:!1,dynamicStart:{position:"right",value:()=>window.innerWidth+cp-je(r)*(o+1)},dynamicEnd:{position:"right",value:()=>{let n=t.length-(o-2);return window.innerWidth/10*9*n}},onEnter:()=>{e.currentIdFromScroll=o},onLeaveBack:()=>{e.currentIdFromScroll=o-1}})),dS=({pins:t})=>{t.forEach(e=>e.refresh())},uk=({titles:t})=>[...t].map(e=>Ke.createParallax({item:e,propierties:"x",reverse:!0,range:9})),fS=({nav:t})=>{t.classList.add("active"),[...document.querySelectorAll(".js-indicator")].forEach(r=>{r.classList.add("active")})},gS=({nav:t})=>{t.classList.remove("active"),[...document.querySelectorAll(".js-indicator")].forEach(r=>{r.classList.remove("active")})},bS=({indicators:t,titles:e,nav:r,animatePin:o,proxi:n,rootRef:s})=>{let i=lk({indicators:t,proxi:n}),a=uk({titles:e}),c=document.querySelector(".l-navcontainer__side");cp=je(c)/2;let l=u.useResize(()=>{cp=je(c)/2}),p=new Ks({root:s,container:".js-container",row:".js-row",column:".js-column",trigger:".js-trigger",shadowClass:".shadowClass",useWillChange:!0,useDrag:!0,useSticky:!o,useThrottle:!0,animateAtStart:!1,ease:!0,easeType:"lerp",addCss:!0,columnHeight:70,columnWidth:100,columnAlign:"center",animatePin:o,breakpoint:"tablet",children:[...i,...a],onEnter:()=>{dS({pins:i}),fS({nav:r})},onEnterBack:()=>{dS({pins:i}),fS({nav:r})},onLeave:()=>{gS({nav:r})},onLeaveBack:()=>{gS({nav:r})}});return p.init(),{destroy:()=>{i.forEach(h=>{h?.destroy()}),i=[],a.forEach(h=>{h?.destroy()}),a=[],p.destroy(),p=null,l()},refresh:()=>p.refresh()}};var pk=(t,e)=>t===0?1:t===e-1?-1:0,mk=({numOfCol:t,pinIsVisible:e,staticProps:r})=>{let o=e?"":"hidden";return[...Array.from({length:t}).keys()].map((n,s)=>g`
                <horizontal-scroller-section
                    ${r({id:s,pinClass:o})}
                ></horizontal-scroller-section>
            `).join("")},hk=({numOfCol:t,proxi:e,staticProps:r,delegateEvents:o})=>[...Array.from({length:t}).keys()].map((n,s)=>g`
                <horizontal-scroller-button
                    ${r({id:s})}
                    ${o({click:()=>e.currentId=s})}
                ></horizontal-scroller-button>
            `).join(""),vS=({onMount:t,watch:e,staticProps:r,delegateEvents:o,setRef:n,getRef:s,getProxi:i})=>{let a=i();return t(({element:c})=>{if(ue.mq("max","desktop"))return;let l=10,p=[...c.querySelectorAll(".js-indicator")],h=c.querySelector(".js-nav"),f=[...c.querySelectorAll(".js-title h1")],{destroy:d}=bS({rootRef:s().js_root,indicators:p,titles:f,nav:h,animatePin:a.animatePin,proxi:a});return window.scrollTo(0,0),e(()=>a.currentId,(y,v)=>{let T=c.querySelector(`.shadowClass--section-${y} .shadowClass--in-center`),{top:S}=be(T),_=le(T),E=Number.parseInt(y)===0?window.innerHeight+1:S+_-window.innerHeight,x=Math.max(1,Math.abs(y-v)),w=2e3,N=1+(l-x)/l*.9,A=x/l*w*N;Ar.to(E+pk(y,l),{duration:A})}),()=>{d()}}),ue.mq("max","desktop")?g`<div><only-desktop></only-desktop></div>`:g`<div class="l-h-scroller">
        <only-desktop></only-desktop>
        <div class="l-h-scroller__top">scroll down</div>
        <ul class="l-h-scroller__nav js-nav" ${n("js_nav")}>
            ${hk({numOfCol:10,proxi:a,staticProps:r,delegateEvents:o})}
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
    </div>`};var yS=({getProxi:t})=>{let e=t();return g`
        <li>
            <button
                type="button"
                data-id="${e.id}"
                class="l-h-scroller__nav__btn"
            >
                ${e.id}
            </button>
        </li>
    `};var TS=m.createComponent({tag:"horizontal-scroller-button",component:yS,props:{id:()=>({value:-1,type:Number})}});var _S=({getState:t})=>{let{id:e,pinClass:r}=t();return g`
        <section
            class="l-h-scroller__column js-column"
            data-shadow="section-${e}"
        >
            <div class="l-h-scroller__wrap">
                <span class="l-h-scroller__indicator js-indicator ${r}">
                    <span></span>
                </span>
                <div class="l-h-scroller__title js-title">
                    <h1>${e}</h1>
                </div>
            </div>
        </section>
    `};var SS=m.createComponent({tag:"horizontal-scroller-section",component:_S,props:{id:()=>({value:-1,type:Number}),pinClass:()=>({value:"",type:String})}});var xS=m.createComponent({tag:"horizontal-scroller",component:vS,props:{animatePin:()=>({value:!1,type:Boolean})},state:{currentId:()=>({value:0,type:Number,skipEqual:!1}),currentIdFromScroll:()=>({value:0,type:Number})},child:[TS,SS]});m.useComponent([xS]);var CS=async()=>(Se({active:!0,prevRoute:"",nextRoute:"",backRoute:""}),g`<div>
        <horizontal-scroller
            ${m.staticProps({animatePin:!1})}
        ></horizontal-scroller>
    </div>`);var ES=({getState:t})=>{let{fill:e}=t();return g`
        <svg
            viewBox="0 0 105.83333 105.83334"
            version="1.1"
            id="svg1713"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:svg="http://www.w3.org/2000/svg"
            fill=${e}
        >
            <path
                d="M 314.66331,372.25958 93.889916,264.46734 -120.06656,385.22612 -85.772782,141.94851 -266.73739,-24.219674 -24.76928,-66.781266 77.344916,-290.23763 192.59565,-73.264538 436.67031,-45.199981 265.93107,131.45836 Z"
                transform="matrix(0.13816225,0,0,0.13816225,41.19189,46.490067)"
            />
        </svg>
    `};var wS=m.createComponent({tag:"svg-star",component:ES,props:{fill:()=>({value:"#000000",type:String})}});var dk=({delegateEvents:t,bindEffect:e,bindObject:r,proxi:o})=>g`<div
        class="c-move3d-page__controls"
        ${e({toggleClass:{active:()=>o.controlsActive}})}
    >
        <button
            type="button"
            class="c-canvas__controls__close"
            ${t({click:()=>{o.controlsActive=!1}})}
        ></button>
        <div class="c-move3d-page__controls__block">
            <div class="c-move3d-page__controls__range">
                <input
                    type="range"
                    value=${o.factor}
                    ${t({input:n=>{let s=n.currentTarget.value??0;o.factor=Number(s)}})}
                />
            </div>
            <div>${r`factor: ${()=>o.factor}`}</div>
        </div>
        <div class="c-move3d-page__controls__block">
            <div class="c-move3d-page__controls__range">
                <input
                    type="range"
                    value=${o.xDepth}
                    ${t({input:n=>{let s=n.currentTarget.value??0;o.xDepth=Number(s)}})}
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
                    ${t({input:n=>{let s=n.currentTarget.value??0;o.xLimit=Number(s)}})}
                />
            </div>
            <div>${r`xLimit: ${()=>o.xLimit}`}</div>
        </div>
        <div class="c-move3d-page__controls__block">
            <div class="c-move3d-page__controls__range">
                <input
                    type="range"
                    value=${o.yDepth}
                    ${t({input:n=>{let s=n.currentTarget.value??0;o.yDepth=Number(s)}})}
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
                    ${t({input:n=>{let s=n.currentTarget.value??0;o.yLimit=Number(s)}})}
                />
            </div>
            <div>${r`yLimit: ${()=>o.yLimit}`}</div>
        </div>
        <div class="c-move3d-page__controls__block">
            <button
                type="button"
                class="c-move3d-page__controls__button"
                ${t({click:()=>{o.debug=!o.debug}})}
            >
                Toggle Debug
            </button>
        </div>
    </div>`,IS=({bindProps:t,delegateEvents:e,bindObject:r,getProxi:o,bindEffect:n})=>{let s=o();return g`<div>
        <button
            type="button"
            class="c-move3d-page__controls__open"
            ${e({click:()=>{s.controlsActive=!0}})}
        >
            show controls
        </button>
        ${dk({delegateEvents:e,bindEffect:n,bindObject:r,proxi:s})}
        <move-3d
            ${t(()=>({shape:s.data,xDepth:s.xDepth,yDepth:s.yDepth,xLimit:s.xLimit,yLimit:s.yLimit,factor:s.factor,debug:s.debug,drag:s.drag}))}
        ></move-3d>
    </div>`};var fk=({debug:t,id:e})=>t?g`<span class="c-move3d-item__debug">${e}</span>`:"",lp=({data:t,root:e,childrenId:r,debug:o})=>t.map(({children:n,props:s})=>g`<move-3d-item
                name="${r}"
                ${m.staticProps({root:e,...s})}
            >
                ${fk({debug:o,id:s.id})}
                ${lp({data:n??[],root:!1,childrenId:r,debug:o})}
            </move-3d-item>`).join("");var up=({element:t})=>({height:le(t),width:je(t),offSetLeft:be(t).left,offSetTop:be(t).top}),MS=({childrenId:t})=>m.useMethodArrayByName(t).map(r=>o=>r?.move?.(o)),kS=({ratio:t})=>({get3dItemUnit:e=>`min(${e}px, calc((((100vw) * ${e}) / ${t} )))`});var Yn=()=>{},RS=({onMount:t,setRef:e,getRef:r,watch:o,computed:n,invalidate:s,getProxi:i,bindEffect:a})=>{let c=u.getUnivoqueId(),l=i(),p=0,h=0,f=0,d=0,y=0,v=0,T=0,S=0,_=!1,E=!1,x={x:0,y:0},w=0,I=Yn,N=Yn,A=Yn,O=Yn,R=Yn,P=Yn,$=[],F=H.createSpring({data:{delta:0,ax:0,ay:0}}),k=()=>{_=!1},L=()=>{let{vw:B,vh:U}=l.centerToViewoport||l.drag?{vw:window.innerWidth,vh:window.innerHeight}:{vw:h,vh:p},oe=x.x,ce=x.y,{xgap:q,ygap:Y}=_?E?(E=!1,{xgap:0,ygap:0}):{xgap:oe-y,ygap:ce-T}:{xgap:0,ygap:0};_&&(v+=q,S+=Y);let{xInMotion:se,yInMotion:re}=_?{xInMotion:v,yInMotion:S}:{xInMotion:oe,yInMotion:ce},{ax:ke,ay:Ve}=l.centerToViewoport||l.drag?{ax:-(B/2-se)/l.xDepth,ay:(U/2-re)/l.yDepth}:{ax:-(B/2-(se-f))/l.xDepth,ay:(U/2-(re-d))/l.yDepth};y=oe,T=ce;let K=ke>l.xLimit||ke<-l.xLimit,Te=Ve>l.yLimit||Ve<-l.yLimit;K&&(v-=q),Te&&(S-=Y);let Ee=ue.clamp(ke,-l.xLimit,l.xLimit),Oe=ue.clamp(Ve,-l.yLimit,l.yLimit),Ye=Math.sqrt(Math.pow(Math.abs(Oe),2)+Math.pow(Math.abs(Ee),2));F.goTo({delta:Ye,ax:Ee,ay:Oe}).catch(()=>{}),$.forEach(Ge=>{Ge({delta:Ye,factor:l.factor})})},C=B=>{w!==B&&(x.y-=w,w=B,x.y+=w),L()},M=({page:B})=>B.y>d&&B.y<d+p&&B.x>f&&B.x<f+h,D=({page:B})=>{M({page:B})&&(_=!0,E=!0)},V=()=>{P(),P=l.useScroll?u.useScroll(({scrollY:B})=>{C(B)}):()=>{}};return t(({element:B})=>{let{container:U}=r();l.afterInit(B);let oe=F.subscribe(({delta:se,ax:re,ay:ke})=>{U.style.transform=`translate3D(0,0,0) rotateY(${re}deg) rotateX(${ke}deg)`,"onUpdate"in l&&l.onUpdate({delta:se,deltaX:re,deltaY:ke})}),ce=F.onComplete(({ax:se,ay:re})=>{U.style.transform=`rotateY(${se}deg) rotateX(${re}deg)`}),q=u.useMouseMove(({page:se})=>{x={x:se.x,y:se.y},L()}),Y=u.useResize(()=>{({height:p,width:h,offSetTop:d,offSetLeft:f}=up({element:B}))});return o(()=>l.drag,se=>{if(R(),O(),A(),N(),I(),se){v=window.innerWidth/2,S=window.innerHeight/2,I=u.useTouchStart(({page:re})=>{D({page:re})}),N=u.useTouchEnd(()=>{k()}),A=u.useMouseDown(({page:re})=>{D({page:re})}),O=u.useMouseUp(()=>{k()}),R=u.useTouchMove(({page:re})=>{x={x:re.x,y:re.y},L()});return}},{immediate:!0}),o(()=>l.useScroll,(se,re)=>{if(se){V();return}se!==re&&P()}),n(()=>l.useScroll,()=>!l.drag&&!l.centerToViewoport),u.useNextLoop(()=>{({height:p,width:h,offSetTop:d,offSetLeft:f}=up({element:B})),x={x:window.innerWidth/2,y:window.innerHeight/2},L()}),()=>{oe(),ce(),Y(),q(),P(),I(),N(),A(),O(),R(),F.destroy(),$=[],F=null,p=null,h=null,f=null,d=null,y=null,v=null,T=null,S=null,_=null,E=null,x=null,w=null}}),g`<div
        class="c-move-3d"
        ${a({toggleClass:{"move3D--drag":()=>l.drag}})}
    >
        <div
            class="c-move-3d__scene"
            ${a({toggleStyle:{perspective:()=>`${l.perspective}px`}})}
        >
            <div class="c-move-3d__container" ${e("container")}>
                ${s({observe:[()=>l.shape,()=>l.debug],afterUpdate:()=>{$=MS({childrenId:c})},render:()=>lp({data:l.shape,root:!0,childrenId:c,debug:l.debug})})}
            </div>
        </div>
    </div>`};var pp=({startRotation:t,range:e,delta:r,limit:o})=>Number.parseFloat((e*r/o-t).toFixed(2)),PS=({rotate:t,anchorPoint:e,baseRotateX:r,baseRotateY:o})=>{if(!t||!e)return{rotateX:0,rotateY:0};switch(t.toUpperCase()){case"X":return(()=>{switch(e.toUpperCase()){case"BOTTOM":return{rotateX:r,rotateY:0};case"TOP":return{rotateX:-r,rotateY:0};default:return{rotateX:0,rotateY:0}}})();case"Y":return(()=>{switch(e.toUpperCase()){case"LEFT":return{rotateX:0,rotateY:o};case"RIGHT":return{rotateX:0,rotateY:-o};default:return{rotateX:0,rotateY:0}}})();case"XY":return(()=>{switch(e.toUpperCase()){case"TOP-LEFT":return{rotateX:-r,rotateY:o};case"TOP-RIGHT":return{rotateX:-r,rotateY:-o};case"BOTTOM-LEFT":return{rotateX:r,rotateY:o};case"BOTTOM-RIGHT":return{rotateX:r,rotateY:-o};default:return{rotateX:0,rotateY:0}}})();default:return{rotateX:0,rotateY:0}}};var gk=t=>t?.tagName.length===0?"":g`
        <div class="c-move3d-item__component ${t?.className}">
            <${t.tagName} ${m.staticProps(t?.props??{})}>
            </${t.tagName}>
        </div>`,bk=({delta:t,factor:e,initialRotate:r,depth:o,range:n,rotate:s,anchorPoint:i,lerp:a})=>{let c=Math.round(o*t/e),l={startRotation:r??0,range:n??20,delta:t,limit:e},p=pp(l),h=pp(l),f={rotate:s??"center",anchorPoint:i,baseRotateX:p,baseRotateY:h},{rotateX:d,rotateY:y}=PS(f);a.goTo({depth:c,rotateX:d,rotateY:y}).catch(()=>{})},NS=({getState:t,addMethod:e,onMount:r})=>{let{root:o,anchorPoint:n,animate:s,depth:i,rotate:a,width:c,height:l,offsetX:p,offsetY:h,range:f,initialRotate:d,initialDepth:y,classList:v,component:T}=t(),S=o?"is-root":"is-children",_=`--item-width:${c};`,E=`--item-height:${l};`,x=`--offset-x:${p};`,w=`--offset-y:${h};`,I=H.createLerp({data:{depth:0,rotateX:0,rotateY:0}});return e("move",({delta:N,factor:A})=>{s&&bk({delta:N,factor:A,initialRotate:d,depth:i,range:f,rotate:a,anchorPoint:n,lerp:I})}),r(({element:N})=>{let A=I.subscribe(({depth:P,rotateX:$,rotateY:F})=>{let k=P+y;N.style.transform=`translate3D(0,0,${k}px) rotateX(${$}deg) rotateY(${F}deg)`}),O=I.onComplete(({depth:P,rotateX:$,rotateY:F})=>{let k=P+y;N.style.transform=`translateZ(${k}px) rotateX(${$}deg) rotateY(${F}deg)`}),R=y;return N.style.transform=`translateZ(${R}px)`,()=>{A(),O(),I.destroy(),I=null}}),g`<div
        class="c-move3d-item ${S} anchor-${n}"
        style="${_}${E}${x}${w}"
    >
        <div class="c-move3d-item__content ${v}"></div>
        ${gk({tagName:T?.tagName??"",className:T?.className??"",props:T?.props??{}})}
        <mobjs-slot></mobjs-slot>
    </div>`};var AS=m.createComponent({tag:"move-3d-item",component:NS,props:{root:()=>({value:!0,type:Boolean}),depth:()=>({value:0,type:Number}),rotate:()=>({value:"x",type:String}),width:()=>({value:"0px",type:String}),height:()=>({value:"0px",type:String}),offsetX:()=>({value:"0px",type:String}),offsetY:()=>({value:"0px",type:String}),range:()=>({value:20,type:Number}),anchorPoint:()=>({value:"center",type:String}),animate:()=>({value:!0,type:Boolean}),initialRotate:()=>({value:0,type:Number}),initialDepth:()=>({value:0,type:Number}),classList:()=>({value:"",type:String}),component:{tagName:()=>({value:"",type:String}),className:()=>({value:"",type:String}),props:()=>({value:"",type:"any"})}},state:{id:()=>({value:"",type:String})}});var Xn=m.createComponent({tag:"move-3d",component:RS,props:{drag:()=>({value:!1,type:Boolean}),centerToViewoport:()=>({value:!1,type:Boolean}),perspective:()=>({value:700,type:Number}),xDepth:()=>({value:20,type:Number,validate:t=>t>1,strict:!0}),yDepth:()=>({value:20,type:Number,validate:t=>t>1,strict:!0}),xLimit:()=>({value:1e4,type:Number}),yLimit:()=>({value:1e4,type:Number}),factor:()=>({value:45,type:Number,validate:t=>t>1,strict:!0}),shape:()=>({value:[],type:Array}),debug:()=>({value:!1,type:Boolean}),afterInit:()=>({value:()=>{},type:Function}),onUpdate:()=>({value:()=>{},type:Function})},state:{useScroll:()=>({value:!0,type:Boolean})},child:[AS]});var OS=m.createComponent({tag:"move-3d-page",component:IS,props:{data:()=>({value:[],type:Array}),drag:()=>({value:!0,type:Boolean})},state:{xDepth:()=>({value:20,type:Number}),yDepth:()=>({value:20,type:Number}),xLimit:()=>({value:1e3,type:Number}),yLimit:()=>({value:1e3,type:Number}),perspective:()=>({value:700,type:Number}),debug:()=>({value:!1,type:Boolean}),factor:()=>({value:45,type:Number,validate:t=>t>1,strict:!0}),controlsActive:()=>({value:!1,type:Boolean})},child:[Xn]});m.useComponent([OS,wS]);var $S=async({props:t})=>{let{data:e,drag:r,prevRoute:o,nextRoute:n}=t,{data:s}=await ne({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:o,nextRoute:n,backRoute:"#plugin-overview"}),g` <div>
        <div class="background-shape">${s}</div>
        <move-3d-page
            ${m.staticProps({data:e,drag:r})}
        ></move-3d-page>
    </div>`};var{get3dItemUnit:z}=kS({ratio:1980}),LS=[{props:{id:0,depth:0,anchorPoint:"center",classList:"move3d-square",animate:!0,width:z(150),height:z(150)},children:[{props:{id:1,depth:200,width:z(150),height:z(150),rotate:"",anchorPoint:"center",initialDepth:100,classList:"move3d-square has-star pippo",component:{tagName:"svg-star",className:"move3d-square__star",props:{fill:"#f28f3b"}},animate:!0},children:[]},{props:{id:2,depth:200,width:z(80),height:z(80),offsetX:z(40),offsetY:z(40),rotate:"",initialDepth:200,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:3,depth:200,width:z(80),height:z(80),offsetX:z(-10),offsetY:z(80),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:4,depth:200,width:z(80),height:z(80),offsetX:z(80),offsetY:z(80),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:5,depth:200,width:z(80),height:z(80),offsetX:z(-10),offsetY:z(-10),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:6,depth:200,width:z(80),height:z(80),offsetX:z(80),offsetY:z(-10),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:7,depth:100,width:z(150),height:z(150),rotate:"x",range:20,anchorPoint:"bottom",classList:"move3d-square",animate:!0},children:[{props:{id:8,depth:0,width:z(150),height:z(150),rotate:"x",range:30,anchorPoint:"bottom",classList:"move3d-square",animate:!0},children:[]}]},{props:{id:9,depth:100,width:z(150),height:z(150),rotate:"x",range:20,anchorPoint:"top",classList:"move3d-square",animate:!0},children:[{props:{id:10,depth:0,width:z(150),height:z(150),rotate:"x",range:20,anchorPoint:"top",classList:"move3d-square",animate:!0},children:[]}]},{props:{id:11,depth:100,width:z(150),height:z(150),rotate:"y",range:20,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[{props:{id:12,depth:0,width:z(150),height:z(150),rotate:"y",range:30,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[{props:{id:13,depth:0,width:z(150),height:z(150),rotate:"y",range:40,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[]}]}]},{props:{id:13,depth:100,width:z(150),height:z(150),rotate:"y",range:20,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[{props:{id:14,depth:0,width:z(150),height:z(150),rotate:"y",range:30,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[{props:{id:15,depth:0,width:z(150),height:z(150),rotate:"y",range:40,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[]}]}]},{props:{id:16,depth:150,rotate:"xy",width:z(150),height:z(150),offsetX:z(20),offsetY:z(20),range:20,anchorPoint:"bottom-left",classList:"move3d-square",animate:!0},children:[{props:{id:17,depth:100,rotate:"",width:z(150),height:z(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:18,depth:150,rotate:"xy",width:z(150),height:z(150),offsetX:z(20),offsetY:z(20),range:20,anchorPoint:"bottom-right",classList:"move3d-square",animate:!0},children:[{props:{id:19,depth:100,rotate:"",width:z(150),height:z(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:20,depth:150,rotate:"xy",width:z(150),height:z(150),offsetX:z(20),offsetY:z(20),range:20,anchorPoint:"top-left",classList:"move3d-square",animate:!0},children:[{props:{id:21,depth:100,rotate:"",width:z(150),height:z(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:22,depth:150,rotate:"xy",width:z(150),height:z(150),offsetX:z(20),offsetY:z(20),range:20,anchorPoint:"top-right",classList:"move3d-square",animate:!0},children:[{props:{id:23,depth:100,rotate:"",width:z(150),height:z(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]}]}];var FS={shape1:{prevRoute:"",nextRoute:"#plugin-dragger",data:LS,drag:!0}};var DS=({getState:t})=>{let{content:e}=t();return g`${e}`};var Kn=m.createComponent({tag:"any-component",component:DS,props:{content:()=>({value:"",type:String})}});var BS=({elements:t})=>{let e=180/Math.PI,r=window.innerWidth,o=window.innerHeight,n=0,s=0,i=0,a=H.createSpring({data:{x:0,y:0},stagger:{each:3,from:"start"}});t.forEach(h=>{a.subscribe(({x:f,y:d})=>{h.style.translate=`${f}px ${d}px`})});let c=H.createSpring({data:{rotation:0},stagger:{each:8,from:"start"}});t.forEach(h=>{h&&c.subscribeCache(({rotation:f})=>{h.style.rotate=`${f}deg`})});let l=u.useResize(()=>{r=window.innerWidth,o=window.innerHeight}),p=u.useMouseMove(({client:h})=>{let{x:f,y:d}=h,y=d-n,v=f-s;if(Math.hypot(v,y)>10){n=d,s=f;let _=Math.atan2(y,v)*e+180+90-i;for(;_>180;)_-=360;for(;_<-180;)_+=360;i+=_,c.goTo({rotation:i})}a.goTo({x:f-r/2,y:d-o/2})});return{destroy:()=>{a.destroy(),a=null,c.destroy(),c=null,l(),p(),r=null,o=null,n=null,s=null,i=null}}};var vk=5,VS=({onMount:t,getRefs:e,setRef:r})=>{let{starOutline:o}=zn(),n=[...Array.from({length:vk}).keys()].map(()=>`<span class='mouse-trail__item' ${r("star")}>${o}</span>`).join("");return t(()=>{let{star:s}=e(),{destroy:i}=BS({elements:s});return()=>{i()}}),g`<div class="mouse-trail">${n}</div>`};var Ic=m.createComponent({tag:"mouse-trail",component:VS});var WS=({u0:t,u1:e,o:r,o_b:o,m1:n,m2:s,m3:i,m4:a,b1:c,b1_b:l,b3:p,b4:h,b5:f,sign:d,m1_b:y,m3_b:v,m4_b:T,b1_stone:S,m1_stone:_})=>[{props:{id:0,depth:200,anchorPoint:"center",classList:"",animate:!0},children:[{props:{id:1,depth:-500,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:t}}},children:[]},{props:{id:1,depth:-50,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:e}}},children:[]},{props:{id:2,depth:20,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:r}}},children:[{props:{id:2,depth:21,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:o}}},children:[]},{props:{id:3,depth:100,anchorPoint:"right",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:n}}},children:[{props:{id:3,depth:20,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:y}}},children:[]},{props:{id:6,depth:45,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:a}}},children:[]},{props:{id:6,depth:20,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:T}}},children:[]},{props:{id:6,depth:20,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:_}}},children:[]},{props:{id:4,depth:65,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:s}}},children:[]},{props:{id:4,depth:20,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:d}}},children:[]},{props:{id:5,depth:30,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:i}}},children:[]},{props:{id:5,depth:20,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:v}}},children:[]}]},{props:{id:6,depth:100,anchorPoint:"left",initialDepth:0,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:l}}},children:[{props:{id:6,depth:51,anchorPoint:"center",initialDepth:1,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:c}}},children:[]},{props:{id:7,depth:120,anchorPoint:"center",initialDepth:20,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:S}}},children:[]},{props:{id:8,depth:70,initialDepth:10,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:p}}},children:[]},{props:{id:10,depth:170,anchorPoint:"center",initialDepth:10,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:h}}},children:[]},{props:{id:11,depth:100,anchorPoint:"center",initialDepth:1,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:f}}},children:[]}]}]}]}];m.useComponent([Xn,Kn,Ic]);var jS=async()=>{let{data:t}=await ne({source:"./asset/svg/lettering-mob.svg?v=0.9"}),{data:e}=await ne({source:"./asset/svg/rdp.svg?v=1.3"}),[r,o,n,s,i,a,c,l,p,h,f,d,y,v,T,S,_,E,x]=["U0_block","U1_block","O_block","O_b_block","M1_block","M1_b_block","M2_block","M3_block","M3_b_block","M4_block","M4_b_block","B1_block","B1_b_block","B3_block","B4_block","B5_block","sign","Bstone_1_block","Mstone_1_block"].map(w=>vo({svg:t,id:w}));return Se({active:!0,prevRoute:"#rdp-01",nextRoute:"#mob-02",backRoute:"#svg-overview"}),g`<div class="l-mob-01">
        <div class="background-shape">${e}</div>
        <mouse-trail></mouse-trail>
        <move-3d
            ${m.staticProps({shape:WS({u0:r,u1:o,o:n,o_b:s,m1:i,m2:c,m3:l,m4:h,b1:d,b1_b:y,b3:v,b4:T,b5:S,sign:_,m1_b:a,m3_b:p,m4_b:f,b1_stone:E,m1_stone:x}),xDepth:100,yDepth:30,factor:20,xLimit:10,yLimit:20,drag:!0,perspective:1e3})}
        ></move-3d>
    </div>`};var zS=()=>ue.mq("min","desktop"),HS="#home",mp=null;m.afterRouteChange(({currentRoute:t})=>{t!=="onlyDesktop"&&(mp=m.getActiveParams(),HS=t)});var US=({onMount:t,getProxi:e,bindEffect:r,watch:o})=>{let n=e();return n.active=zS(),t(()=>{let s=u.useResize(()=>{n.active=zS()});return o(()=>n.active,i=>{i&&m.loadUrl({url:HS,params:mp??{}})}),()=>{s(),mp=null}}),g`
        <a
            href="#home"
            class="l-only-desktop__link"
            ${r({toggleClass:{active:()=>n.active}})}
        >
            home page
        </a>
    `};var GS=m.createComponent({tag:"only-desktop-cta",component:US,state:{active:()=>({value:!1,type:Boolean,skipEqual:!1})}});m.useComponent([GS]);var qS=async()=>{let{data:t}=await ne({source:"./asset/svg/lettering-mob-only-desktop.svg?v=0.1"}),{data:e}=await ne({source:"./asset/svg/lettering-mob.svg?v=1.3"});return g`
        <div class="l-only-desktop">
            <div class="l-only-desktop__content">
                <div class="background-shape">${e}</div>
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
                <div class="l-only-desktop__svg">${t}</div>
            </div>
        </div>
    `};var hp=({canvas:t,disableOffcanvas:e})=>{let{useOffscreen:r,context:o}=ft({disableOffcanvas:e}),n=!0,s=t.getContext(o,{alpha:!0}),i=m.getActiveRoute(),{offscreen:a,offScreenCtx:c}=gt({useOffscreen:r,canvas:t}),l=r?c:s,p=go(l);l=null,t.width=t.clientWidth,t.height=t.clientHeight;let h=10,f=10,d=window.innerWidth/20,y=window.innerHeight/20,T=bo({canvas:t,numberOfRow:h,numberOfColumn:f,cellWidth:d,cellHeight:y,gutter:1}).items,S=T.map(L=>({...L,scale:1,rotate:0})),_=({row:L,col:C})=>{let M=(f+1)*L;return S[M+C]},x={..._({row:1,col:1}),scale:1,rotate:0},I={..._({row:4,col:5}),scale:1,rotate:0},N=H.createTimeTween({ease:"easeInOutQuad",stagger:{each:10,from:"edges"},data:{scale:1,rotate:0}}),A=H.createTimeTween({data:x,duration:1e3,ease:"easeInOutBack"}),O=H.createSpring({data:I});S.forEach(L=>{N.subscribeCache(({scale:C,rotate:M})=>{L.rotate=M,L.scale=C})}),A.subscribe(L=>{x=L}),O.subscribe(L=>{I=L});let R=Me.createAsyncTimeline({repeat:-1,autoSet:!1,yoyo:!0});R.goTo(N,{scale:.2,rotate:90},{duration:1e3});let P=Me.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1});P.goTo(A,{x:_({row:1,col:8}).x,rotate:360,scale:2}).createGroup({waitComplete:!1}).goTo(A,{y:_({row:8,col:8}).y,rotate:180}).goTo(O,{y:_({row:0,col:8}).y},{delay:500}).closeGroup().label({name:"my-label"}).createGroup({waitComplete:!1}).goTo(A,{x:_({row:8,col:1}).x,rotate:0,scale:1},{ease:"easeOutQuad",duration:500}).goTo(O,{rotate:360,scale:2},{delay:0}).closeGroup().createGroup({waitComplete:!1}).goTo(A,{y:_({row:1,col:1}).y,rotate:-180},{duration:1e3}).goTo(O,{rotate:0,y:_({row:8,col:8}).y,scale:1},{delay:200}).closeGroup();let $=()=>{if(!s)return;let L=t.width,C=t.height,M=r?c:s;if(M){r&&a?(a.width=L,a.height=C):M.reset(),S.forEach(({x:D,y:V,width:B,height:U,rotate:oe,scale:ce,offsetXCenter:q,offsetYCenter:Y},se)=>{if(se===40){let Ee=Math.PI/180*x.rotate,Oe=Math.cos(Ee)*x.scale,Ye=Math.sin(Ee)*x.scale;M.setTransform(Oe,Ye,-Ye,Oe,Math.floor(x.offsetXCenter+x.x),Math.floor(x.offsetYCenter+x.y)),p?(M.beginPath(),M.roundRect(Math.floor(-x.width/2),Math.floor(-x.height/2),Math.floor(x.width),x.height,150)):(M.beginPath(),M.rect(Math.floor(-x.width/2),Math.floor(-x.height/2),Math.floor(x.width),Math.floor(x.height))),M.fillStyle="#000000",M.fill()}let re=Math.PI/180*oe,ke=Math.cos(re)*ce,Ve=Math.sin(re)*ce;M.setTransform(ke,Ve,-Ve,ke,Math.floor(q+D),Math.floor(Y+V));let K=Math.round(-B/2),Te=Math.round(-U/2);p?(M.beginPath(),M.roundRect(K,Te,B,U,150)):(M.beginPath(),M.rect(K,Te,B,U)),M.fillStyle="rgba(238, 238, 238, 0.9)",M.fill()});{let D=Math.PI/180*I.rotate,V=Math.cos(D)*I.scale,B=Math.sin(D)*I.scale;M.setTransform(V,B,-B,V,Math.floor(I.offsetXCenter+I.x),Math.floor(I.offsetYCenter+I.y)),p?(M.beginPath(),M.roundRect(Math.floor(-I.width/2),Math.floor(-I.height/2),Math.floor(I.width),Math.floor(I.height),150)):(M.beginPath(),M.rect(Math.floor(-I.width/2),Math.floor(-I.height/2),Math.floor(I.width),Math.floor(I.height))),M.fillStyle="#a86464",M.fill()}bt({useOffscreen:r,offscreen:a,ctx:s})}},F=()=>{$(),n&&u.useNextFrame(()=>F())};u.useFrame(()=>{F()});let k=te.watch("navigationIsOpen",u.useDebounce(L=>{if(L){P.pause(),R.pause(),n=!1;return}setTimeout(async()=>{m.getActiveRoute().route===i.route&&(P.resume(),R.resume(),n=!0,u.useFrame(()=>F()))},200)},200));return{destroy:()=>{k(),s=null,a=null,c=null,T=[],n=!1,N?.destroy?.(),A?.destroy?.(),O?.destroy?.(),P?.destroy?.(),R?.destroy?.(),S=null,x=null,I=null,o=null,N=null,A=null,O=null,P=null,R=null},play:()=>{P.play(),R.isActive()||R.play()},playReverse:()=>{P.playReverse(),R.isActive()||R.play()},playFromLabel:()=>{P.setTween("my-label",[A,O]).then(()=>{P.playFrom("my-label").then(()=>{console.log("resolve promise playFrom")})}),R.isActive()||R.play()},playFromLabelReverse:()=>{P.setTween("my-label",[A,O]).then(()=>{P.playFromReverse("my-label").then(()=>{console.log("resolve promise playFrom")})}),R.isActive()||R.play()},revertNext:()=>{P.reverseNext()},pause:()=>{P.pause(),R.pause()},resume:()=>{P.resume(),R.resume()},stop:()=>{P.stop(),R.stop()}}};function yk({buttons:t}){return Object.entries(t).map(([e,r])=>{let{label:o}=r;return g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn ${e}"
                >
                    ${o}
                </button>
            </li>`}).join("")}var JS=({onMount:t,getState:e,setRef:r,getRef:o,bindEffect:n,getProxi:s,delegateEvents:i})=>{let a=s(),c={},l=()=>{};return t(({element:p})=>{let{canvas:h}=o();u.useFrame(()=>{u.useNextTick(()=>{l(),c=hp({canvas:h,...e()}),l=c.destroy,c?.play?.()})});let f=u.useResize(()=>{l(),c=hp({canvas:h,...e()}),l=c.destroy,c?.play?.()});return Object.entries(a.buttons).forEach(([d,y])=>{let{method:v}=y;p.querySelector(`.${d}`)?.addEventListener("click",()=>c?.[v]())}),u.useFrame(()=>{"isMounted"in a&&(a.isMounted=!0)}),()=>{f(),l()}}),g`
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
    `};var Tk={"js-async-timeline-play":{label:"play",method:"play"},"js-async-timeline-playReverse":{label:"play reverse",method:"playReverse"},"js-async-timeline-play-label":{label:"play from label",method:"playFromLabel"},"js-async-timeline-playReverse-label":{label:"play from label reverse",method:"playFromLabelReverse"},"js-async-timeline-pause":{label:"pause",method:"pause"},"js-async-timeline-resume":{label:"resume",method:"resume"},"js-async-timeline-revert-next":{label:"revert next",method:"revertNext"},"js-async-timeline-stop":{label:"stop",method:"stop"}},YS=m.createComponent({tag:"async-timeline",component:JS,props:{background:"",disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1,controlsActive:()=>({value:!1,type:Boolean}),buttons:()=>({value:Tk,type:"Any"})}});m.useComponent([YS]);var XS=async()=>{let{data:t}=await ne({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"#caterpillarN2",nextRoute:"#animatedPatternN0?version=0&activeId=0",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <async-timeline
            ${m.staticProps({background:t})}
        ></async-timeline>
    </div>`};var KS=({letter_d:t,letter_p:e,letter_r:r,letter_r_shadow:o,letter_d_shadow:n,letter_p_shadow:s,letter_r_pieces:i,letter_d_pieces:a,letter_p_pieces:c,letter_r_fill:l,letter_d_fill:p,letter_p_fill:h})=>[{props:{id:0,depth:200,anchorPoint:"center",classList:"",animate:!0},children:[{props:{id:0,depth:100,offsetX:"-2",offsetY:"-2",anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:t}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:n}}},children:[]},{props:{id:0,depth:40,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:a}}},children:[]},{props:{id:0,depth:100,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:p}}},children:[]},{props:{id:0,depth:-100,initialDepth:-1,offsetX:"-10",anchorPoint:"right",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:r}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:o}}},children:[]},{props:{id:0,depth:20,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:i}}},children:[]},{props:{id:0,depth:30,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:l}}},children:[]}]},{props:{id:0,depth:100,initialDepth:0,anchorPoint:"left",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:e}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:s}}},children:[]},{props:{id:0,depth:20,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:c}}},children:[]},{props:{id:0,depth:30,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:h}}},children:[]}]}]}]}];m.useComponent([Xn,Kn,Ic]);var QS=async()=>{let{data:t}=await ne({source:"./asset/svg/rdp.svg?v=0.4"}),{data:e}=await ne({source:"./asset/svg/lettering-mob.svg?v=1.3"}),[r,o,n,s,i,a,c,l,p,h,f,d]=["letter_d","letter_r","letter_p","letter_r_shadow","letter_d_shadow","letter_p_shadow","letter_r_pieces","letter_d_pieces","letter_p_pieces","letter_r_fill","letter_d_fill","letter_p_fill"].map(y=>vo({svg:t,id:y}));return Se({active:!0,prevRoute:"",nextRoute:"#mob-01",backRoute:"#svg-overview"}),g`<div class="l-rdp-01">
        <div class="background-shape">${e}</div>
        <mouse-trail></mouse-trail>
        <move-3d
            ${m.staticProps({shape:KS({letter_d:r,letter_r:o,letter_p:n,letter_r_shadow:s,letter_d_shadow:i,letter_p_shadow:a,letter_r_pieces:c,letter_d_pieces:l,letter_p_pieces:p,letter_r_fill:h,letter_d_fill:f,letter_p_fill:d}),xDepth:100,yDepth:30,factor:20,xLimit:10,yLimit:20,drag:!0,perspective:1e3})}
        ></move-3d>
    </div>`};var ZS=({screenElement:t,scrollerElement:e,layer02:r})=>{let o=Ke.createParallax({item:r,align:"center",range:8,propierties:"x",ease:!1}),n=new _t({screen:t,scroller:e,direction:"horizontal",drag:!0,useHorizontalScroll:!0,easeType:"lerp",breakpoint:"small",children:[o]});return n.init(),n.set(55),{destroy:()=>{n.destroy(),o.destroy(),n=null,o=null}}};var ex=({getState:t,onMount:e,setRef:r,getRef:o})=>{let{layer02:n,layer03:s}=t();return e(()=>{let{screen:i,scroller:a,layer02:c}=o(),{destroy:l}=ZS({screenElement:i,scrollerElement:a,layer02:c});return()=>{l()}}),g`<div class="mobbu2025">
        <div class="mobbu2025__screen" ${r("screen")}>
            <div class="mobbu2025__scroller" ${r("scroller")}>
                <div class="mobbu2025__layer">${s}</div>
                <div class="mobbu2025__layer" ${r("layer02")}>
                    ${n}
                </div>
            </div>
        </div>
    </div>`};var tx=m.createComponent({tag:"mobbu-2025",component:ex,props:{layer02:()=>({value:"",type:String}),layer03:()=>({value:"",type:String})}});m.useComponent([tx]);var rx=async()=>{let{data:t}=await ne({source:"./asset/svg/lettering-mob-2025-pure-optimized.svg?v=0.3"}),{data:e}=await ne({source:"./asset/svg/lettering-mob.svg?v=1.4"}),[r,o]=["layer-02","layer-03"].map(n=>vo({svg:t,id:n}));return Se({active:!0,prevRoute:"#mob-01",nextRoute:"",backRoute:"#svg-overview"}),g`<div class="l-mob-02">
        <div class="background-shape">${e}</div>
        <h3 class="l-mob-02__title">Scroll or Drag</h3>
        <mobbu-2025
            ${ya({layer02:r,layer03:o})}
        ></mobbu-2025>
    </div>`};var ox="TOP-LEFT",nx="TOP-RIGHT",sx="BOTTOM-LEFT",ix="BOTTOM-RIGHT",ax="CENTER";var _k=t=>{let r=globalThis.getComputedStyle(t).transform;if(r==="none")return 0;let o=r.match(/matrix3d\(([^)]+)\)/);return o&&o[1].split(",").map(Number)[14]||0},cx=({align:t,root:e,child:r,containerClass:o,childrenClass:n,perspective:s,usePrespective:i,maxLowDepth:a=-200,maxHightDepth:c=200,onDepthChange:l=()=>{},depthFactor:p=30,hideThreshold:h=1})=>{let f=document.querySelector(o);f&&(f.style.cursor="grab");let d=[...f.querySelectorAll(n)],y=d.map(K=>{let Te=window.innerWidth,Ee=window.innerHeight,Oe=K.offsetWidth,Ye=K.offsetHeight,Ge=_k(K),Lr=s-s*Oe/(Te*h)-Ge,$t=s-s*Ye/(Ee*h)-Ge;return Math.min(Lr,$t)}),v=()=>{d.forEach((K,Te)=>{let Ee=_>y[Te];K.classList.toggle("hide",Ee)})},T=0,S=0,_=0,E=0,x=0,w=r.offsetWidth,I=r.offsetHeight,N=e.offsetWidth,A=e.offsetHeight,O=(w-N)/2,R=(I-A)/2,P={x:0,y:0},$=!1,F=!1,k=30,L=()=>{if(i&&s>0){let K=s/(s-_);O=(w-N/K)/2,R=(I-A/K)/2}else O=(w-N)/2,R=(I-A)/2};L();let C={xValue:0,yValue:0},M=H.createSpring({data:{x:0,y:0,z:0}});switch(t){case ox:{C={xValue:O,yValue:R},S=w,T=I;break}case nx:{C={xValue:-O,yValue:R},S=-w,T=I;break}case sx:{C={xValue:O,yValue:-R},S=w,T=-I;break}case ix:{C={xValue:-O,yValue:-R},S=-w,T=-I;break}}let D=M.subscribe(({x:K,y:Te,z:Ee})=>{r&&(r.style.transform=`translate3D(${K}px, ${Te}px, ${Ee}px)`)});M.set({x:C.xValue,y:C.yValue}),[...e.querySelectorAll("a, button")].forEach(K=>{K.setAttribute("draggable","false"),K.style.userSelect="none"});let B=({page:K})=>{$=!0,F=!0,P={x:K.x,y:K.y}},U=({page:K})=>{let{x:Te,y:Ee}=K,{xgap:Oe,ygap:Ye}=$?F?(F=!1,{xgap:0,ygap:0}):{xgap:Te-E,ygap:Ee-x}:{xgap:0,ygap:0},Ge=O>0?ue.clamp(S+Oe,-O,O):ue.clamp(S+Oe,O,-O),Lr=R>0?ue.clamp(T+Ye,-R,R):ue.clamp(T+Ye,R,-R),$t=$?Ge:S,X=$?Lr:T,{xComputed:Fr,yComputed:Be}=$?{xComputed:$t,yComputed:X}:{xComputed:Te,yComputed:Ee};S=$t,T=X,E=Te,x=Ee,$&&(C={xValue:Fr,yValue:Be},M.goTo({x:Fr,y:Be}).catch(()=>{}))},oe=u.useTouchStart(({page:K,target:Te})=>{B({page:K,target:Te})}),ce=u.useMouseDown(({page:K,target:Te})=>{B({page:K,target:Te})}),q=u.useTouchEnd(()=>{$=!1}),Y=u.useMouseUp(()=>{$=!1}),se=u.useMouseMove(({page:K})=>{U({page:K})}),re=u.useTouchMove(({page:K})=>{U({page:K})});f&&f.addEventListener("click",K=>{let{x:Te,y:Ee}=P,Oe=Math.abs(E-Te)>k,Ye=Math.abs(x-Ee)>k;(Oe||Ye)&&K.preventDefault()},!1),i&&f&&f.addEventListener("wheel",K=>{let{spinY:Te}=u.normalizeWheel(K);_=ue.clamp(_+Te*p,a,c),L(),S=O>0?ue.clamp(S,-O,O):ue.clamp(S,O,-O),T=R>0?ue.clamp(T,-R,R):ue.clamp(T,R,-R),l({depth:_}),M.goTo({x:S,y:T,z:_}).catch(()=>{})},{passive:!0});let ke=u.useMouseWheel(u.useDebounce(()=>{v()},100)),Ve=u.useResize(()=>{w=r.offsetWidth,I=r.offsetHeight,N=e.offsetWidth,A=e.offsetHeight,L()});return{destroy:()=>{D(),oe(),q(),ce(),Y(),se(),re(),Ve(),ke(),M.destroy(),M=null,f=null,d=null,e=null,r=null}}};var lx=({getProxi:t,setRef:e,getRef:r,bindEffect:o,onMount:n})=>{let s=t();return n(({element:i})=>{let{child:a}=r(),c=a.firstChild;if(!c)return;let l=cx({align:s.align,root:i,child:c,usePrespective:s.usePrespective,perspective:s.perspective,maxLowDepth:s.maxLowDepth,maxHightDepth:s.maxHightDepth,depthFactor:s.depthFactor,onDepthChange:s.onDepthChange,containerClass:s.containerClass,childrenClass:s.childrenClass,hideThreshold:s.hideThreshold});return s.afterInit({root:i}),()=>{l.destroy(),i.remove(),a.remove(),a=null,c=null,i=null}}),g`<div class="c-dragger ${s.rootClass}">
        <!-- Root border -->
        <mobjs-slot name="root-slot"></mobjs-slot>

        <!-- Child -->
        <div
            class="c-dragger__wrapper"
            ${e("child")}
            ${o({toggleStyle:{perspective:()=>`${s.perspective}px`}})}
        >
            <mobjs-slot name="child-slot"></mobjs-slot>
        </div>
    </div>`};var ux=m.createComponent({tag:"c-dragger",component:lx,props:{rootClass:()=>({value:"",type:String}),childrenClass:()=>({value:"",type:String}),containerClass:()=>({value:"",type:String}),initialZoom:()=>({value:1,type:Number}),ease:()=>({value:!0,type:Boolean}),align:()=>({value:ax,type:String,transform:t=>t.toUpperCase()}),usePrespective:()=>({value:!0,type:Boolean}),perspective:()=>({value:600,type:Number}),hideThreshold:()=>({value:1,type:Number}),depthFactor:()=>({value:30,type:Number}),maxLowDepth:()=>({value:-200,type:Number}),maxHightDepth:()=>({value:200,type:Number}),afterInit:()=>({value:()=>{},type:Function}),onDepthChange:()=>({value:()=>{},type:Function})}});m.useComponent([ux,Kn]);var px=!1,mx=async()=>{let{data:t}=await ne({source:"./asset/svg/ms_nord_compact.svg?v=1.3"}),{data:e}=await ne({source:"./asset/svg/lettering-mob.svg?v=1.3"});Se({active:!0,prevRoute:"#move3D-shape1",nextRoute:"#math-animation-01",backRoute:"#plugin-overview"});let r=g`
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
        <div class="dragger-child dragger-child--svg">${t}</div>
    </div>`;return g`<div class="l-dragger">
        <div class="background-shape">${e}</div>
        <c-dragger
            ${m.staticProps({rootClass:"dragger-component",containerClass:".l-dragger",childrenClass:".dragger-child",align:"CENTER",maxHightDepth:140,maxLowDepth:-200,perspective:300,hideThreshold:10,afterInit:({root:n})=>{px&&console.log(n)},onDepthChange:({depth:n})=>{px&&console.log(n)}})}
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
    </div>`};var hx=({targets:t,container:e,canvas:r}={})=>{if(!t||!e||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=(le(e)-100)/2,s=3,i=2*Math.PI*s,a=0,c=(n-a)/i,l=1e3*s,p=t.map(v=>le(v)/2),h=H.createSequencer({ease:"easeLinear",stagger:{each:6},data:{angleInRadian:0,scale:0}}).goTo({angleInRadian:i},{start:0,end:10,ease:"easeLinear"}).goTo({scale:1},{start:0,end:4,ease:"easeOutQuad"}).goTo({scale:0},{start:9,end:10,ease:"easeOutQuad"});t.forEach((v,T)=>{let S=v.firstChild;h.subscribeCache(({angleInRadian:_,scale:E})=>{let x=a+c*_,w=x*Math.cos(_),I=x*Math.sin(_);v.style.transform=`translate3D(0px,0px,0px) translate(${w-p[T]}px, ${I-p[T]}px)`,S&&(S.style.scale=`${E}`)})});let f=Me.createSyncTimeline({repeat:-1,yoyo:!1,duration:l}).add(h);function d(){if(!o||!r)return;let v=r.width/2,T=r.height/2,S=200;o.clearRect(0,0,r.width,r.height),o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let _=0;_<=S;_++){let E=i/S*_,x=a+c*E,w=v+x*Math.cos(E),I=T+x*Math.sin(E);_===0?o.moveTo(w,I):o.lineTo(w,I)}o.stroke()}let y=u.useResize(()=>{r.width=r.clientWidth,r.height=r.clientHeight,d()});return d(),{play:()=>{f.play()},resume:()=>{f.resume()},stop:()=>{f.pause()},destroy:()=>{f.stop(),h.destroy(),f.destroy(),y(),o=null,h=null,f=null,t=null}}};var dx=({targets:t,container:e,canvas:r}={})=>{if(!t||!e||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=H.createSpring({stagger:{each:6},data:{x:0}}),s=.06,i=le(e)/2-100,a=t.map(d=>le(d)/2);t.forEach((d,y)=>{n.subscribeCache(({x:v})=>{let T=Math.sin(v*s)*i,S=Math.cos(v*s)*i;d.style.transform=`translate3D(0px,0px,0px) translate(${T-a[y]}px, ${S-a[y]}px)`})}),n.set({x:0});let c=0,l=!1,p=()=>{let d=60/u.getFps();c+=d,n&&(n.goTo({x:c}).catch(()=>{}),l&&u.useNextFrame(()=>p()))};function h(){if(!o||!r)return;r.width=r.width;let d=r.width/2,y=r.height/2;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath(),o.arc(d,y,i,0,2*Math.PI),o.stroke()}let f=u.useResize(()=>{h()});return h(),{play:()=>{l||(l=!0,p())},resume:()=>{l||(l=!0,p())},stop:()=>{l=!1},destroy:()=>{n.destroy(),f(),o=null,n=null,t=null,c=null,l=null}}};var fx=({targets:t,container:e,canvas:r}={})=>{if(!t||!e||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=t.map(d=>le(d)/2),s=je(e)/2-100,i=le(e),a=10,c=a/2/Math.PI,l=H.createSequencer({stagger:{each:5},data:{x:a/4,scale:0},duration:a}).goTo({x:a+a/4},{start:0,end:a,ease:"easeLinear"}).goTo({scale:1},{start:0,end:1.5,ease:"easeOutQuad"}).goTo({scale:0},{start:1.5,end:5,ease:"easeInQuad"}).goTo({scale:1},{start:5,end:8.5,ease:"easeOutQuad"}).goTo({scale:0},{start:8.5,end:10,ease:"easeInQuad"});t.forEach((d,y)=>{let v=d.firstChild;l.subscribeCache(({x:T,scale:S})=>{let _=T/c,E=2/(3-Math.cos(2*_)),x=E*Math.cos(_)*s,w=E*Math.sin(2*_)/2*i;d.style.transform=`translate3D(0px,0px,0px) translate(${x-n[y]}px, ${w-n[y]}px)`,v&&(v.style.scale=`${S}`)})});let p=Me.createSyncTimeline({repeat:-1,yoyo:!1,duration:3e3}).add(l);function h(){if(!o||!r)return;r.width=r.width;let d=r.width/2,y=r.height/2,v=200;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let T=0;T<=v;T++){let S=T/v*2*Math.PI,_=2/(3-Math.cos(2*S)),E=_*Math.cos(S)*s,x=_*Math.sin(2*S)/2*i;T===0?o.moveTo(d+E,y+x):o.lineTo(d+E,y+x)}o.stroke()}let f=u.useResize(()=>{h()});return h(),{play:()=>{p.play()},resume:()=>{p.resume()},stop:()=>{p.pause()},destroy:()=>{p.stop(),l.destroy(),p.destroy(),f(),o=null,l=null,p=null,t=null}}};function Sk(t,e,r,o=2e3){let n=0,s=t,i=0;for(let a=1;a<=o;a++){let c=r/o*a,l=t*Math.cos(e*c),p=l*Math.cos(c),h=l*Math.sin(c),f=p-s,d=h-i;n+=Math.hypot(f,d),s=p,i=h}return n}var gx=(t,e)=>e===0?t:gx(e,t%e);function xk(t,e){let r=gx(t,e),o=e/r;return 2*Math.PI*o}var bx=({targets:t,container:e,canvas:r}={},...o)=>{let[n,s,i,a]=o;if(!t||!e||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let c=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let l=(le(e)-100)/2,p=n/s,h=xk(n,s),f=Sk(l,p,h),d=i*(f/l),y=t.map(N=>le(N)/2),v=H.createSequencer({ease:"easeLinear",stagger:{each:a},data:{angleInRadian:0,scale:1}}).goTo({angleInRadian:h},{start:0,end:10,ease:"easeLinear"}),T=[],S=0,_=0;for(;_<h&&h>0&&p>0;)_=(Math.PI/2+S*Math.PI)/p,_>=0&&T.push(_),S++;let E=0;T.forEach(N=>{let A=N/h*10,O=Math.abs((A-E)/2);E=A;let R=Math.max(0,A-O),P=A,$=Math.min(10,A+O);$>R&&(v.goTo({scale:0},{start:R,end:P,ease:"easeInQuad"}),v.goTo({scale:1},{start:P,end:$,ease:"easeOutQuad"}))}),t.forEach((N,A)=>{let O=N.firstChild;v.subscribeCache(({angleInRadian:R,scale:P})=>{let $=l*Math.cos(p*R),F=$*Math.cos(R),k=$*Math.sin(R);N.style.transform=`translate3D(0px,0px,0px) translate(${F-y[A]}px, ${k-y[A]}px)`,O&&(O.style.scale=`${P}`)})});let x=Me.createSyncTimeline({repeat:-1,yoyo:!1,duration:d}).add(v);function w(){if(!c||!r)return;let N=r.width/2,A=r.height/2,O=2e3*s;c.clearRect(0,0,r.width,r.height),c.setLineDash([3,7]),c.lineDashOffset=3,c.strokeStyle="rgba(0, 0, 0, 0.5)",c.lineWidth=1,c.beginPath();for(let R=0;R<=O;R++){let P=h/O*R,$=l*Math.cos(p*P),F=N+$*Math.cos(P),k=A+$*Math.sin(P);R===0?c.moveTo(F,k):c.lineTo(F,k)}c.stroke()}let I=u.useResize(()=>{r.width=r.clientWidth,r.height=r.clientHeight,w()});return w(),{play:()=>{x.play()},resume:()=>{x.resume()},stop:()=>{x.pause()},destroy:()=>{x.stop(),v.destroy(),x.destroy(),I(),c=null,v=null,x=null,t=null}}};var vx=({targets:t,container:e,canvas:r}={})=>{if(!t||!e||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=je(e)-200,s=le(e)/3,i=2,a=n/(2*Math.PI*i),c=1500*i,l=t.map(y=>le(y)/2),p=H.createSequencer({ease:"easeLinear",stagger:{each:6},data:{x:0,scale:0}}).goTo({x:n},{start:0,end:10,ease:"easeLinear"}).goTo({scale:1},{start:0,end:10/i/2,ease:"easeOutQuad"}).goTo({scale:0},{start:10-10/i/2,end:10,ease:"easeOutQuad"});t.forEach((y,v)=>{let T=0,S=y.firstChild,_=-l[v]-n/2;p.subscribeCache(({x:E,scale:x})=>{let w=Math.sign(E-T)||1,I=Math.sin(E/a)*s*w;y.style.transform=`translate3D(0px,0px,0px) translate(${E+_}px, ${I-l[v]}px)`,S&&(S.style.scale=`${x}`),T=E})});let h=Me.createSyncTimeline({repeat:-1,yoyo:!0,duration:c}).add(p);function f(){if(!o||!r)return;r.width=r.width;let y=r.width/2,v=r.height/2,T=200,S=T*2;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let _=0;_<=S;_++){let{x:E,y:x}=(()=>{if(_<=T){let w=_/T*n,I=Math.sin(w/a)*s;return{x:w,y:I}}if(_>T){let I=(S-_)/T*n,N=Math.sin(I/a)*s*-1;return{x:I,y:N}}return{x:0,y:0}})();_===0?o.moveTo(y+E-n/2,v+x):o.lineTo(y+E-n/2,v+x)}o.stroke()}let d=u.useResize(()=>{f()});return f(),{play:()=>{h.play()},resume:()=>{h.resume()},stop:()=>{h.pause()},destroy:()=>{h.stop(),p.destroy(),h.destroy(),d(),o=null,p=null,h=null,t=null}}};var dp={sin:vx,circle:dx,infinite:fx,archimede:hx,rosaDiGrandi:bx};var yx=()=>({play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}});var Tx=({getProxi:t,setRef:e,getRef:r,getRefs:o,delegateEvents:n,onMount:s})=>{let i=t(),a=i.showNavigation?"active":"",c=3,l=c/i.numberOfStaggers,p=Array.from({length:i.numberOfStaggers}).map((T,S)=>({size:c-l*S,opacity:1/S})),h=yx(),{destroy:f,play:d,stop:y,resume:v}=h;return s(({element:T})=>{let{target:S}=o(),{canvas:_}=r();u.useFrame(()=>{({destroy:f,play:d,stop:y,resume:v}=dp[i.name]({targets:S,container:T,canvas:_},...i.args)),d()});let E=u.useResize(()=>{y(),f(),{destroy:f,play:d,stop:y,resume:v}=dp[i.name]({targets:S,container:T,canvas:_},...i.args),d()});return()=>{f(),E(),f=null,d=null,y=null,v=null}}),g`<div class="c-math">
        <canvas class="c-math__canvas" ${e("canvas")}></canvas>
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
                        ${e("target")}
                        style="width:${T}rem;height:${T}rem;opacity:${S}"
                        ><span class="c-math__circle__inner"></span
                    ></span>`).join("")}
        </div>
    </div>`};var Mc=m.createComponent({tag:"math-animation",component:Tx,props:{name:()=>({value:"",type:String}),showNavigation:()=>({value:!0,type:Boolean}),numberOfStaggers:()=>({value:5,type:Number}),args:()=>({value:[],type:Array})}});m.useComponent([Mc]);var _x=async({props:t})=>{let{names:e}=t;return e.length>4&&console.warn("math layout, max item excedded"),Se({active:!0,prevRoute:"#plugin-dragger",nextRoute:"#rosa-di-grandi",backRoute:"#plugin-overview"}),g`<div class="l-math">
        ${e.map(r=>g`<div class="l-math__item">
                    <math-animation
                        ${m.staticProps({name:r})}
                    ></math-animation>
                </div>`).join("")}
    </div>`};var Ck=({proxi:t,delegateEvents:e,bindObject:r})=>g`
        <li class="l-rosa__controls__item">
            <span for="numerators" class="l-rosa__controls__label">
                ${r`numerators: <strong>${()=>t.numeratorsLabel}</strong>`}
            </span>
            <div class="l-rosa__controls__range">
                <input
                    id="numerators"
                    type="range"
                    min="0"
                    max="10"
                    value="${t.numerators}"
                    step="1"
                    ${e({input:o=>{let{currentTarget:n}=o;if(!n)return;let s=n.value;t.numeratorsLabel=Number(s)},change:o=>{let{currentTarget:n}=o;if(!n)return;let s=n.value;t.numerators=Number(s)}})}
                />
            </div>
        </li>
        <li class="l-rosa__controls__item">
            <span for="denominator" class="l-rosa__controls__label">
                ${r`denominator: <strong>${()=>t.denominatorLabel}</strong>`}
            </span>
            <div class="l-rosa__controls__range">
                <input
                    type="range"
                    id="denominator"
                    min="0"
                    max="10"
                    value="${t.denominator}"
                    step="1"
                    ${e({input:o=>{let{target:n}=o;if(!n)return;let s=n.value;t.denominatorLabel=Number(s)},change:o=>{let{target:n}=o;if(!n)return;let s=n.value;t.denominator=Number(s)}})}
                />
            </div>
        </li>
    `,Sx=({getProxi:t,delegateEvents:e,invalidate:r,bindEffect:o,getRef:n,setRef:s,bindObject:i})=>{let a=t();return g`<div class="l-rosa">
        <button
            type="button"
            class="l-rosa__controls__open"
            ${e({click:()=>{a.controlsActive=!0}})}
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
                ${e({click:()=>{a.controlsActive=!1}})}
            ></button>
            ${Ck({proxi:a,getRef:n,setRef:s,delegateEvents:e,bindObject:i})}
        </ul>
        <div class="l-rosa__wrap">
            ${r({observe:[()=>a.numerators,()=>a.denominator],render:()=>g`
                        <math-animation
                            ${m.staticProps({name:"rosaDiGrandi",showNavigation:!1,numberOfStaggers:10,args:[a.numerators,a.denominator,a.duration,a.staggerEach]})}
                        ></math-animation>
                    `})}
        </div>
    </div>`};var xx=m.createComponent({tag:"rosa-di-grandi-page",component:Sx,state:{numerators:()=>({value:2,type:Number}),denominator:()=>({value:3,type:Number}),numeratorsLabel:()=>({value:2,type:Number}),denominatorLabel:()=>({value:3,type:Number}),duration:()=>({value:500,type:Number}),staggerEach:()=>({value:4,type:Number}),controlsActive:()=>({value:!1,type:Boolean})},child:[Mc]});m.useComponent([xx]);var Cx=async()=>(Se({active:!0,prevRoute:"#math-animation-01",nextRoute:"",backRoute:"#plugin-overview"}),g`<rosa-di-grandi-page></rosa-di-grandi-page>`);var gp="home",Rc="about",Z="template-mobJs-component",Pe="template-doc-default",Qn="template-listing",ut="template-animation",vt="template-test",Pc=new Set([Z,Pe]),pe=[{url:"./#mobJs-overview",title:"mobJs"},{url:"./#mobJs-component",title:"component"}],Qe=[{url:"./#mobJs-overview",title:"mobJs"}],fp=[{url:"./#mobCore-overview",title:"mobCore"}],mr=[{url:"./#mobMotion-overview",title:"mobMotion"}],kc=[{label:"store",url:"#mobCore-store"},{label:"events",url:"#mobCore-events"},{label:"defaults",url:"#mobCore-defaults"}],Q=[{label:"initialization",url:"#mobJs-initialization"},{label:"component",url:"#mobJs-component"},{label:"routing",url:"#mobJs-routing"},{label:"tick",url:"#mobJs-tick"},{label:"memory management",url:"#mobJs-memory-management"},{label:"utils",url:"#mobJs-utils"},{label:"debug",url:"#mobJs-debug"}],qt=[{label:"tween/spring/lerp",url:"#mobMotion-tween-spring-lerp"},{label:"AsyncTimeline",url:"#mobMotion-async-timeline"},{label:"sequencer",url:"#mobMotion-sequencer"},{label:"SyncTimeline",url:"#mobMotion-sync-timeline"},{label:"CreateStagger",url:"#mobMotion-create-stagger"},{label:"ScrollTrigger",url:"#mobMotion-scrolltrigger"},{label:"Parallax",url:"#mobMotion-parallax"},{label:"Stagger",url:"#mobMotion-stagger"},{label:"Default",url:"#mobMotion-defaults"},{label:"Utils",url:"#mobMotion-utils"}],Nc=[{hash:"pageNotFound",layout:$y,props:{}},{hash:"onlyDesktop",layout:qS,props:{}},{hash:"about",layout:HT,templateName:Rc,props:{}},{hash:"canvas-overview",layout:Za,templateName:Qn,props:{source:"./data/canvas/data.json"}},{hash:"animatedPatternN0",layout:m_,templateName:ut,props:{}},{hash:"animatedPatternN1",layout:f_,templateName:ut,props:{}},{hash:"caterpillarN1",layout:y_,templateName:ut,props:{}},{hash:"caterpillarN2",layout:x_,templateName:ut,props:{}},{hash:"async-timeline",layout:XS,templateName:ut,props:{}},{hash:"scrollerN0",layout:I_,templateName:ut,props:{}},{hash:"scrollerN1",layout:P_,templateName:ut,props:{}},{hash:"dynamic-list",layout:Y_,templateName:vt,skipTransition:!0,props:{source:"./data/mob-js/general-repeat-test.json",breadCrumbs:Qe,title:"( test ) repeat & invalidate",section:"mobJs"}},{hash:"matrioska-repeat",layout:mS,templateName:vt,skipTransition:!0,props:{source:"./data/mob-js/matrioska.json",breadCrumbs:Qe,title:"( test ) matrioska repeat",section:"mobJs"}},{hash:"matrioska-invalidate",layout:hS,templateName:vt,skipTransition:!0,props:{source:"./data/mob-js/matrioska.json",breadCrumbs:Qe,title:"( test ) matrioska invalidate",section:"mobJs"}},{hash:"home",layout:Z_,templateName:gp,props:{}},{hash:"mobCore-overview",layout:De,skipTransition:!0,templateName:Pe,props:{source:"./data/mob-core/overview.json",title:"mobCore",breadCrumbs:[],section:"mobCore",rightSidebar:kc}},{hash:"mobCore-defaults",layout:De,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-core/defaults.json",title:"Defaults",breadCrumbs:fp,section:"mobCore",rightSidebar:kc}},{hash:"mobCore-events",layout:De,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-core/events.json",title:"Events",breadCrumbs:fp,section:"mobCore",rightSidebar:kc}},{hash:"mobCore-store",layout:De,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-core/store.json",title:"Store",breadCrumbs:fp,section:"mobCore",rightSidebar:kc}},{hash:"mobJs-overview",layout:De,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-js/overview.json",title:"mobJs",breadCrumbs:[],section:"mobJs",rightSidebar:Q}},{hash:"mobJs-initialization",layout:De,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-js/initialization.json",title:"initialization",breadCrumbs:Qe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-component",layout:De,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-js/component.json",title:"component",breadCrumbs:Qe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-routing",layout:De,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-js/routing.json",title:"routing",breadCrumbs:Qe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-benchmark-invalidate",layout:$r,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-invalidate",breadCrumbs:Qe,source:"./data/mob-js/benchmark-invalidate.json",title:"( test ) benchmark invalidate",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-key",layout:$r,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-key",breadCrumbs:Qe,source:"./data/mob-js/benchmark-repeat-without-key.json",title:"( test ) benchmark repeat without key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key",layout:$r,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key",breadCrumbs:Qe,source:"./data/mob-js/benchmark-repeat-key.json",title:"( test ) benchmark repeat key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-component-no-key",layout:$r,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-component-no-key",breadCrumbs:Qe,source:"./data/mob-js/benchmark-repeat-no-component-no-key.json",title:"( test ) benchmark repeat no component no key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-component-with-key",layout:$r,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-component-with-key",breadCrumbs:Qe,source:"./data/mob-js/benchmark-repeat-no-component-with-key.json",title:"( test ) benchmark repeat no component with key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-key-nested",layout:$r,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key-no-nested",breadCrumbs:Qe,source:"./data/mob-js/benchmark-repeat-without-key-nested.json",title:"( test ) benchmark repeat nested without key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key-nested",layout:$r,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key-nested",breadCrumbs:Qe,source:"./data/mob-js/benchmark-repeat-key-nested.json",title:"( test ) benchmark repeat nested with key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key-bind-store",layout:$r,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-key-bind-store",breadCrumbs:Qe,source:"./data/mob-js/benchmark-repeat-external.json",title:"( test ) benchmark repeat bindStore",section:"mobJs"}},{hash:"mobJs-tick",layout:De,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-js/tick.json",title:"tick",breadCrumbs:Qe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-utils",layout:De,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-js/utils.json",title:"utils",breadCrumbs:Qe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-memory-management",layout:De,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-js/memory-management.json",title:"memory management",breadCrumbs:Qe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-debug",layout:De,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-js/debug.json",title:"debug",breadCrumbs:Qe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-onMount",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/on-mount.json",title:"onMount",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-getState",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/get-state.json",title:"getState",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-setState",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/set-state.json",title:"setState",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-updateState",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/update-state.json",title:"updateState",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-getProxi",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/get-proxi.json",title:"getProxi",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-watch",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/watch.json",title:"watch",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-staticProps",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/static-props.json",title:"staticProps",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-dataAttribute",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/data-attribute.json",title:"dataAttribute",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-bindProps",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/bind-props.json",title:"bindProps",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-bindEvents",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/bind-events.json",title:"bindEvents",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-delegateEvents",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/delegate-events.json",title:"delegateEvents",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-bindtext",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/bind-text.json",title:"bindText",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-bindObject",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/bind-object.json",title:"bindObject",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-bind-effect",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/bind-effect.json",title:"bindEffect",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-methods",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/methods.json",title:"add methods",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-useMethodByName",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/use-method-by-name.json",title:"useMethodByName",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-useMethodArrayByName",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/use-method-array-by-name.json",title:"useMethodArrayByName",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-setStateByName",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/set-state-by-name.json",title:"setStateByName",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-updateStateByName",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/update-state-by-name.json",title:"updateStateByName",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-refs",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/refs.json",title:"refs",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-runtime",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/runtime.json",title:"renderComponent",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-repeat",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/repeat.json",title:"repeat",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-invalidate",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/invalidate.json",title:"invalidate",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-invalidate-vs-repeater",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/invalidate-vs-repeater.json",title:"invalidate vs repeater",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-web-component",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/web-component.json",title:"webComponent",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-slot",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/slot.json",title:"slot",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-unBind",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/unbind.json",title:"unBind",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-emit",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/emit.json",title:"emit",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-emitAsync",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/emit-async.json",title:"emitAsync",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-computed",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/computed.json",title:"computed",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-bindStore",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/bind-store.json",title:"bindStore",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-removeDom",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/remove-dom.json",title:"removeDom",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-remove",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/remove.json",title:"remove",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-getChildren",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/get-children.json",title:"getChildren",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-freezeProp",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/freeze-prop.json",title:"freezeProp",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-unFreezeProp",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/unfreeze-prop.json",title:"unFreezeProp",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-getParentId",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/get-parent-id.json",title:"getParentId",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-watchParent",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/watch-parent.json",title:"watchParent",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-instanceName",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/instance-name.json",title:"instanceName",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobJs-class-list",templateName:Z,layout:ae,skipTransition:!0,props:{source:"./data/mob-js/class-list.json",title:"classList",breadCrumbs:pe,section:"mobJs",rightSidebar:Q}},{hash:"mobMotion-stagger",layout:De,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-motion/stagger.json",title:"Stagger",breadCrumbs:mr,section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-defaults",layout:De,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-motion/defaults.json",title:"Defaults",breadCrumbs:mr,section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-utils",layout:De,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-motion/utils.json",title:"Utils",breadCrumbs:mr,section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-overview",layout:De,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-motion/overview.json",title:"mobMotion",breadCrumbs:[],section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-parallax",layout:De,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-motion/parallax.json",title:"Parallax",breadCrumbs:mr,section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-sequencer",layout:De,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-motion/sequencer.json",title:"Sequencer",breadCrumbs:mr,section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-scrolltrigger",layout:De,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-motion/scroll-trigger.json",title:"ScrollTrigger",breadCrumbs:mr,section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-sync-timeline",layout:De,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-motion/sync-timeline.json",title:"Synctimeline",breadCrumbs:mr,section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-create-stagger",layout:De,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-motion/create-stagger.json",title:"CreateStagger",breadCrumbs:mr,section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-async-timeline",layout:De,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-motion/async-timeline.json",title:"Asynctimeline",breadCrumbs:mr,section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-tween-spring-lerp",layout:De,templateName:Pe,skipTransition:!0,props:{source:"./data/mob-motion/tween-spring-lerp.json",title:"TimeTween Spring Lerp",breadCrumbs:mr,section:"mobMotion",rightSidebar:qt}},{hash:"horizontalScroller",layout:CS,templateName:ut,restoreScroll:!1,props:{source:"./data/plugin/horizontal-scroller.json",title:"HorizontalScroller"}},{hash:"move3D-shape1",templateName:ut,layout:$S,props:FS.shape1},{hash:"plugin-dragger",layout:mx,templateName:ut,props:{}},{hash:"math-animation-01",layout:_x,templateName:ut,props:{names:["circle","sin","infinite","archimede"]}},{hash:"rosa-di-grandi",layout:Cx,templateName:ut,props:{}},{hash:"plugin-overview",layout:Za,templateName:Qn,props:{source:"./data/plugin/data.json"}},{hash:"svg-overview",layout:Za,templateName:Qn,props:{source:"./data/svg/data.json"}},{hash:"mob-01",layout:jS,templateName:ut,props:{}},{hash:"mob-02",layout:rx,templateName:ut,props:{}},{hash:"rdp-01",layout:QS,templateName:ut,props:{}}];var Ex=0;m.beforeRouteChange(()=>{Ex=window.scrollY});var Ek=new Set([Z,Pe,Qn,Rc,vt]),wk=new Set([Z,Pe,Qn,Rc,gp,vt]),wx=async({oldNode:t,oldTemplateName:e})=>{t.classList.remove("current-route"),t.classList.add("fake-content"),t.style.position="fixed",t.style.zIndex="10",t.style.top=Ek.has(e)?"var(--header-height)":"0",t.style.left=wk.has(e)?"calc(var(--header-height)/2)":"0",t.style.right="0",t.style.transform=`translateY(-${Ex}px)`,t.style.minHeight="calc(100vh - var(--header-height) - var(--footer-height))"},Ix=async({oldNode:t,newNode:e,oldRoute:r,newRoute:o})=>{if(r===o)return;let n=m.getRoot();n.style.pointerEvents="none",e.style.opacity="0";let s=H.createTimeTween({data:{opacity:1},duration:200}),i=H.createTimeTween({data:{opacity:0},duration:300});s.subscribe(({opacity:c})=>{t.style.opacity=c}),i.subscribe(({opacity:c})=>{e.style.opacity=c});let a=Me.createAsyncTimeline({repeat:1}).createGroup({waitComplete:!0}).goTo(s,{opacity:0}).goTo(i,{opacity:1}).closeGroup();await a.play(),a.destroy(),a=null,e.style.removeProperty("opacity"),e.classList.add("current-route"),u.useFrameIndex(()=>{n.style.pointerEvents=""},10)};var Mx=()=>{let t=window.innerWidth-document.documentElement.clientWidth;document.documentElement.style.setProperty("--scrollbar-with",`${t}px`)},kx=()=>{Mx(),u.useResize(()=>{Mx()})};var Zn="reset",hr="tree",mi="filter_component";var dr=({screen:t,scroller:e,scrollbar:r})=>{let o;return{init:()=>{o||(o=new _t({screen:t,scroller:e,direction:"vertical",drag:!0,scopedEvent:!1,breakpoint:"desktop",onTick:({percent:n})=>{r.value=`${n}`},afterRefresh:({shouldScroll:n})=>{r?.classList.toggle("hide-scrollbar",!n)}}),o.init())},destroy:()=>{o?.destroy(),o=null},refresh:()=>{o?.refresh()},updateScroller:()=>{if(!o)return;let n=le(e),s=le(t),i=je(r),a=s/n*i;r.style.setProperty("--thumb-width",`${a}px`),o?.refresh()},move:n=>{o&&o.move(n).catch(()=>{})},goToTop:()=>{o?.set(0)}}};var es=u.createStore({currentId:()=>({value:"",type:String})});var Rx=t=>t?[...t].reduce((e,r)=>`${e}.${r}`,""):"",Px=t=>Object.keys(t).reduce((e,r)=>`${e} ${r},`,""),Ik=t=>Object.entries(t).map(([e,r])=>g`<div>
                <strong>${e}:</strong>
                ${r.map(o=>g`${o}, `).join(".")}
            </div>`).join(""),Mk=t=>t?t.map(e=>`${e}, `).join(""):"",Nx=t=>Object.entries(t).map(([e,r])=>g`<div>
                <strong>${e}:</strong>
                ${JSON.stringify(r)}
            </div>`).join(""),kk=({getState:t})=>{let{id:e}=t();if(e===Zn)return"";let r=m.componentMap.get(e);return r?g`<div>
        <!-- Basic props -->
        <div><strong>id</strong>: ${e}</div>
        <div><strong>parent id</strong>: ${r.parentId}</div>
        <div>
            <strong>component root</strong>:
            ${r.element.tagName}${Rx(r.element.classList)}
        </div>
        <div><strong>componentName</strong>: ${r.componentName}</div>
        <div><strong>instance name:</strong>: ${r.instanceName}</div>
        <div><strong>methods:</strong>: ${Px(r.methods)}</div>
        <div><strong>refs:</strong>: ${Px(r.refs)}</div>
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
            ${r?.repeaterInnerWrap?.tagName}${Rx(r?.repeaterInnerWrap?.classList)}
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
            ${Nx(r.state.get())}
        </div>
        <div>
            <h4 class="c-debug-component__section-subtitle">
                States current validation:
            </h4>
            ${Nx(r.state.getValidation())}
        </div>
    </div>`:"component not found"},Rk=({getRef:t})=>{let{screen:e,scroller:r,scrollbar:o}=t();o.addEventListener("input",()=>{c(o.value)});let n=dr({screen:e,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},Ax=({onMount:t,addMethod:e,getState:r,invalidate:o,setRef:n,getRef:s,watch:i,getProxi:a,emit:c})=>{let l=a();e("updateId",h=>{l.id=h,es.set("currentId",h)}),e("refreshId",()=>{c(()=>l.id)});let p;return t(()=>{let{destroy:h,updateScroller:f,move:d,refresh:y}=Rk({getRef:s});return p=d,i(()=>l.id,async()=>{await m.tick(),y(),f(),p(0)}),()=>{h?.()}}),g`<div class="c-debug-component" ${n("screen")}>
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
    </div>`};var Ox=m.createComponent({tag:"debug-component",component:Ax,state:{id:()=>({value:Zn,type:String,skipEqual:!1})}});var $x=t=>{m.useMethodByName(ac)?.refreshList?.({testString:t})};var bp=async(t="")=>{await m.tick(),$x(t)},Lx=({onMount:t,setRef:e,getRef:r,delegateEvents:o})=>(t(()=>(bp(),()=>{r()?.input.remove()})),g`<div class="c-debug-filter-head">
        <span class="c-debug-filter-head__title">Filter by tag</span>
        <input
            type="text"
            class="c-debug-filter-head__input"
            value=""
            ${e("input")}
            ${o({keydown:n=>{if(n.code.toLowerCase()==="enter"){n.preventDefault();let s=n.currentTarget.value;bp(s)}}})}
        />
        <button
            class="c-debug-filter-head__button"
            type="button"
            ${o({click:()=>{let{input:n}=r(),s=n.value;bp(s)}})}
        >
            find
        </button>
    </div>`);var Fx=m.createComponent({tag:"debug-filter-head",component:Lx});var Pk=async({getRef:t})=>{await m.tick();let{screen:e,scroller:r,scrollbar:o}=t(),n=dr({screen:e,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},Dx=t=>`~${t}`,Nk=({testString:t})=>{let e=t.replaceAll("~","").split(" ").filter(r=>r!=="")??"";return(()=>{let r=[];for(let o of m.componentMap.values())e.every(s=>o.componentName.includes(s))&&r.push(o);return r})().map(({id:r,componentName:o,instanceName:n})=>({id:r,active:!1,tag:(()=>{let s=e.reduce((i,a,c)=>i.replaceAll(new RegExp(`(?<!~)${a.toLowerCase()}`,"g"),`${Dx(c)}`),o);return e.reduce((i,a,c)=>i.replaceAll(`${Dx(c)}`,`<span class="match-string">${a}</span>`),s)})(),name:n}))},Bx=({onMount:t,setRef:e,getRef:r,addMethod:o,repeat:n,staticProps:s,bindProps:i,bindEffect:a,getProxi:c,computed:l})=>{let p=c(),h=()=>{},f=()=>{},d=()=>{},y=()=>{};return l(()=>p.noResult,()=>p.data.length===0&&!p.isLoading),o("refreshList",async({testString:v})=>{p.isLoading=!0,await m.tick(),u.useNextTick(async()=>{p.data=Nk({testString:v}),await m.tick(),d?.(),y?.(),p.isLoading=!1})}),t(()=>{let{scrollbar:v}=r();return v.addEventListener("input",()=>{f(v.value)}),(async()=>({destroy:h,move:f,refresh:d,updateScroller:y}=await Pk({getRef:r})))(),()=>{h?.(),h=()=>{},d=()=>{},y=()=>{},f=()=>{}}}),g`
        <div class="c-debug-filter-list">
            <div class="c-debug-filter-list__list" ${e("screen")}>
                <input
                    type="range"
                    id="test"
                    name="test"
                    min="0"
                    max="100"
                    value="0"
                    step=".5"
                    ${e("scrollbar")}
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
                    ${e("scroller")}
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
    `};var fr=t=>{m.useMethodByName(ti)?.updateId(t)},Vx=()=>{m.useMethodByName(ti)?.refreshId()};var Wx=({delegateEvents:t,bindText:e,bindEffect:r,getProxi:o,computed:n})=>{let s=o();return n(()=>s.active,()=>s.id===s.currentId),g`
        <div class="c-debug-filter-list-item">
            <span class="c-debug-filter-list-item__id">${s.id}</span> |
            <span class="c-debug-filter-list-item__tag"
                >${e`${"tag"}`}</span
            >
            |
            <span class="c-debug-filter-list-item__name">${s.name}</span>
            <button
                type="button"
                class="c-debug-filter-list-item__expand"
                ${t({click:()=>{fr(s.id)}})}
            >
                [ > ]
            </button>
            <span
                class="c-debug-tree-item__selected"
                ${r({toggleClass:{active:()=>s.active}})}
            ></span>
        </div>
    `};var jx=m.createComponent({tag:"debug-filter-list-item",component:Wx,bindStore:es,props:{id:()=>({value:"",type:String}),tag:()=>({value:"",type:String}),name:()=>({value:"",type:String})},state:{active:()=>({value:!1,type:Boolean})}});var zx=m.createComponent({tag:"debug-filter-list",component:Bx,state:{data:()=>({value:[],type:Array}),isLoading:()=>({value:!0,type:Boolean}),noResult:()=>({value:!1,type:Boolean})},child:[jx]});var Hx=({invalidate:t,getProxi:e})=>{let r=e();return g`<div class="c-debug-head">
        <div class="c-debug-head__general">
            ${t({observe:()=>r.active,render:()=>r.active?g`
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
    </div>`};var Ux=({setRef:t,getRef:e,delegateEvents:r})=>g`<div class="c-debug-search">
        <div>
            <span class="c-debug-search__label">
                <strong>Search by ID:</strong>
            </span>
            <input
                class="c-debug-search__input"
                type="text"
                ${t("id_input")}
                ${r({keydown:o=>{if(o.code.toLowerCase()==="enter"){o.preventDefault();let n=o.currentTarget.value;fr(n??"")}}})}
            />
            <button
                class="c-debug-search__button"
                type="button"
                ${r({click:()=>{let{id_input:o}=e(),n=o.value;fr(n??"")}})}
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
                ${t("instance_input")}
                ${r({keydown:o=>{if(o.code.toLowerCase()==="enter"){o.preventDefault();let n=o.currentTarget.value,s=m.getIdByInstanceName(n);fr(s??"")}}})}
            />
            <button
                class="c-debug-search__button"
                type="button"
                ${r({click:()=>{let{instance_input:o}=e(),n=o.value,s=m.getIdByInstanceName(n);fr(s??"")}})}
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
                    ${r({click:()=>{let{instance_input:o,id_input:n}=e();o.value="",n.value="",fr(Zn)}})}
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
                    ${r({click:()=>{Vx()}})}
                >
                    refresh component
                </button>
            </div>
        </div>
    </div>`;var Gx=m.createComponent({tag:"debug-search",component:Ux});var qx=m.createComponent({tag:"debug-head",component:Hx,props:{active:()=>({value:!1,type:Boolean})},state:{shouldUpdate:()=>({value:!0,type:Boolean,skipEqual:!1})},child:[Gx]});var Ac=()=>{m.mainStore.debugStore(),console.log("componentMap",m.componentMap),console.log("Tree structure:",m.getTree()),console.log("bindEventMap",yn),console.log("currentListValueMap",Ss),console.log("activeRepeatMap",Sn),console.log("onMountCallbackMap",Cs),console.log("staticPropsMap",xn),console.log("dynamicPropsMap",yt),console.log("eventDelegationMap",m.eventDelegationMap),console.log("tempDelegateEventMap",m.tempDelegateEventMap),console.log("invalidateIdHostMap",Jr.size),console.log("invalidateIdsMap",tt),console.log("invalidateInstancesMap",ye),console.log("repeatIdHostMap",qr),console.log("repeatIdsMap",rt),console.log("repeatInstancesMap",J),console.log("userChildPlaceholderSize",$h()),console.log("slotPlaceholderSize",Ui()),console.log("bindTextPlaceholderMapSize",Md()),console.log("instanceMap",Hr)};var Jx=({delegateEvents:t,addMethod:e,bindProps:r,invalidate:o,bindEffect:n,getProxi:s,onMount:i})=>{let a=s();return e("toggle",()=>{a.active=!a.active}),i(()=>{let c=m.beforeRouteChange(()=>{a.active=!1,a.listType=hr});return()=>{c()}}),g`<div
        class="c-debug-overlay"
        ${n({toggleClass:{active:()=>a.active}})}
    >
        <button
            class="c-debug-overlay__background"
            type="button"
            ${t({click:()=>{a.active=!1,a.listType=hr}})}
        ></button>
        <button
            type="button"
            class="c-debug-overlay__close"
            ${t({click:()=>{a.active=!1,a.listType=hr}})}
        ></button>
        <div class="c-debug-overlay__grid">
            <button
                type="button"
                class="c-debug-overlay__log"
                ${t({click:()=>{Ac()}})}
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
                                    </div>`:a.listType===mi&&a.active?g`<debug-filter-head></debug-filter-head>`:""})}
                    </div>

                    <div class="c-debug-overlay__list__ctas">
                        <button
                            type="button"
                            class="c-debug-overlay__list__toggle"
                            ${t({click:()=>{a.listType=hr}})}
                            ${n({toggleClass:{active:()=>a.listType===hr}})}
                        >
                            Tree
                        </button>
                        <button
                            type="button"
                            class="c-debug-overlay__list__toggle"
                            ${t({click:()=>{a.listType=mi}})}
                            ${n({toggleClass:{active:()=>a.listType===mi}})}
                        >
                            Filter
                        </button>
                    </div>
                </div>
                <div>
                    ${o({observe:[()=>a.listType,()=>a.active],render:()=>a.listType===hr&&a.active?g`
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
                <debug-component name="${ti}"></debug-component>
            </div>
        </div>
    </div>`};var Oc=({data:t,staticProps:e})=>t.map(({id:r,componentName:o,instanceName:n,children:s})=>g`<debug-tree-item
                ${e({id:r,componentName:o,instanceName:n,children:s})}
            ></debug-tree-item>`).join("");var Ak=async({getRef:t})=>{await m.tick();let{screen:e,scroller:r,scrollbar:o}=t(),n=dr({screen:e,scroller:r,scrollbar:o}),s=n.destroy,i=n.refresh,a=n.move,c=n.updateScroller;return n.init(),c(),a(0),{destroy:s,refresh:i,move:a,updateScroller:c}},Yx=({onMount:t,invalidate:e,staticProps:r,setRef:o,getRef:n,addMethod:s,bindEffect:i,getProxi:a})=>{let c=a(),l=()=>{},p=()=>{},h=()=>{},f=()=>{};return t(()=>{let{scrollbar:d}=n();return d.addEventListener("input",()=>{f(d.value)}),s("refresh",()=>{p?.(),h?.()}),(async()=>(c.isLoading=!0,await m.tick(),l?.(),c.data=m.getTree(),{destroy:l,move:f,refresh:p,updateScroller:h}=await Ak({getRef:n}),c.isLoading=!1))(),()=>{l?.(),l=()=>{},p=()=>{},h=()=>{},f=()=>{}}}),g`
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
                    ${e({observe:()=>c.data,render:()=>Oc({data:c.data,staticProps:r})})}
                </div>
            </div>
        </div>
    `};var Xx=()=>{m.useMethodByName(lc)?.refresh()};var Ok=t=>t>0?`( ${t} ) `:"",Kx=({id:t,value:e})=>{let o=m.componentMap.get(t)?.child;if(!o)return!1;let n=Object.values(o).flat();return n.includes(e)?!0:n.some(i=>Kx({id:i,value:e}))},Qx=({onMount:t,staticProps:e,getRef:r,setRef:o,delegateEvents:n,watch:s,bindEffect:i,getProxi:a,computed:c})=>{let l=a(),p=l.children.length>0?"has-children":"";return c(()=>l.isActive,()=>l.id===l.currentId),c(()=>l.hasActiveChildren,()=>Kx({id:l.id,value:l.currentId})),t(()=>{let{content:h}=r(),f=Or.subscribe(h);return Or.reset(h),s(()=>l.isOpen,async d=>{await Or[d?"down":"up"](h),Xx()}),()=>{f()}}),g`<div class="c-debug-tree-item">
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
            ${Oc({data:l.children,staticProps:e})}
        </div>
    </div>`};var Zx=m.createComponent({tag:"debug-tree-item",component:Qx,bindStore:es,props:{id:()=>({value:"",type:String}),componentName:()=>({value:"",type:String}),instanceName:()=>({value:"",type:String}),children:()=>({value:[],type:Array})},state:{isOpen:()=>({value:!1,type:Boolean}),isActive:()=>({value:!1,type:Boolean}),hasActiveChildren:()=>({value:!1,type:Boolean})}});var e0=m.createComponent({tag:"debug-tree",component:Yx,state:{data:()=>({value:[],type:Array}),isLoading:()=>({value:!1,type:Boolean})},child:[Zx]});var t0=m.createComponent({tag:"debug-overlay",component:Jx,state:{active:()=>({value:!1,type:Boolean}),listType:()=>({value:hr,type:String})},child:[e0,Ox,qx,Fx,zx]});var vp=()=>{},$c=()=>{},Lc=()=>{},Fc=()=>{},$k=({staticProps:t,bindProps:e,proxi:r})=>r.data.map(o=>{let{label:n,url:s,isLabel:i}=o;return i?g`<p class="c-params-mobjs__label">${n}</p>`:g`<li>
                      <links-mobjs-button
                          ${t({label:n,url:s})}
                          ${e(()=>({active:r.activeSection===s}))}
                      ></links-mobjs-button>
                  </li>`}).join(""),r0=({staticProps:t,setRef:e,getRef:r,onMount:o,bindProps:n,invalidate:s,bindEffect:i,getProxi:a})=>{let c=pr(),l=a(),p={[Z]:c.sideBarLinks.mobJsComponentParams};return o(()=>{let{screenEl:h,scrollerEl:f,scrollbar:d}=r(),y=!1;d.addEventListener("input",()=>{Lc?.(d.value)}),te.watch("navigationIsOpen",T=>{let{templateName:S}=m.getActiveRoute();S in p&&(l.shift=T)});let v=m.afterRouteChange(async({currentTemplate:T,currentRoute:S})=>{let _=p?.[T]??[];if(l.data=_,await m.tick(),l.activeSection=S,_.length>0){if(l.hide=!1,y){Fc();return}({init:vp,destroy:$c,move:Lc,updateScroller:Fc}=dr({screen:h,scroller:f,scrollbar:d})),y=!0,vp(),Fc(),Lc(0)}_.length===0&&(l.hide=!0,$c?.(),y=!1)});return()=>{$c?.(),v(),vp=()=>{},$c=()=>{},Lc=()=>{},Fc=()=>{}}}),g`<div
        class="c-params-mobjs"
        ${e("screenEl")}
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
            ${e("scrollbar")}
            class="c-params-mobjs__scrollbar hide-scrollbar"
        />
        <ul ${e("scrollerEl")}>
            ${s({observe:()=>l.data,render:()=>$k({staticProps:t,bindProps:n,proxi:l})})}
        </ul>
    </div>`};var o0=({getProxi:t,bindEffect:e})=>{let r=t();return g` <a
        href="./#${r.url}"
        ${e({toggleClass:{current:()=>r.active}})}
        ><span>${r.label}</span></a
    >`};var n0=m.createComponent({tag:"links-mobjs-button",component:o0,props:{label:()=>({value:"",type:String}),url:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean})}});var s0=m.createComponent({tag:"links-mobjs",component:r0,child:[n0],state:{data:()=>({value:[],type:Array}),activeSection:()=>({value:"",type:String}),hide:()=>({value:!0,type:Boolean}),shift:()=>({value:!1,type:Boolean})}});var i0=({getProxi:t,bindEffect:e,addMethod:r,setRef:o,getRef:n,onMount:s,watch:i})=>{let a=t();r("update",(l,p)=>{a[l]=p});let c=H.createTimeTween({data:{y:0,yContainer:100},duration:300,ease:"easeOutQuad"});return i(()=>a.currentLabelId,l=>{if(l===-1){c.goTo({yContainer:100});return}c.goTo({y:100/3*-l,yContainer:0})}),s(({element:l})=>{let{back:p,next:h,previous:f,labelList:d,labels:y}=n();return c.subscribe(({y:v,yContainer:T})=>{d.style.transform=`translateY(${v}%)`,y.style.transform=`translateY(${T}%)`}),l.addEventListener("mouseleave",()=>{a.currentLabelId=-1}),f.addEventListener("mouseenter",()=>{a.currentLabelId=0}),p.addEventListener("mouseenter",()=>{a.currentLabelId=1}),h.addEventListener("mouseenter",()=>{a.currentLabelId=2}),()=>{c.destroy(),c=null,f=null,p=null,h=null,d=null,y=null}}),g`<div
        class="c-quick-nav-container"
        ${e([{toggleClass:{active:()=>a.active}}])}
    >
        <a
            class="c-quick-nav c-quick-nav--prev"
            ${o("previous")}
            ${e({toggleClass:{"is-disable":()=>!a.prevRoute},toggleAttribute:{href:()=>{let l=a.prevRoute;return l.length>0?l:null}}})}
        >
        </a>
        <a
            class="c-quick-nav c-quick-nav--back"
            ${o("back")}
            ${e({toggleClass:{"is-disable":()=>!a.backRoute},toggleAttribute:{href:()=>{let l=a.backRoute;return l.length>0?l:null}}})}
        >
        </a>
        <a
            class="c-quick-nav c-quick-nav--next"
            ${o("next")}
            ${e({toggleClass:{"is-disable":()=>!a.nextRoute},toggleAttribute:{href:()=>{let l=a.nextRoute;return l&&l.length>0?l:null}}})}
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
    </div>`};var a0=m.createComponent({tag:"quick-nav",component:i0,state:{active:()=>({value:!1,type:Boolean}),backRoute:()=>({value:"",type:String}),prevRoute:()=>({value:"",type:String}),nextRoute:()=>({value:"",type:String}),currentLabelId:()=>({value:-1,type:Number})}});var Lk=({proxi:t,bindEffect:e})=>t.data.map(({label:r,url:o})=>{let n=o.replaceAll("#","");return g`
                <li class="right-sidebar__item">
                    <a
                        href="${o}"
                        class="right-sidebar__link"
                        ${e({toggleClass:{active:()=>t.activeRoute.route===n}})}
                        >${r}</a
                    >
                </li>
            `}).join(""),c0=({getProxi:t,invalidate:e,addMethod:r,computed:o,bindEffect:n})=>{let s=t();return r("updateList",i=>{s.data=i}),m.afterRouteChange(({currentTemplate:i})=>{Pc.has(i)||(s.data=[])}),o(()=>s.isVisible,()=>s.data.length>0),g`<div
        class="right-sidebar"
        ${n({toggleClass:{visible:()=>s.isVisible}})}
    >
        <div class="right-sidebar__title">Sections:</div>
        <ul class="right-sidebar__list">
            ${e({observe:()=>s.data,render:()=>Lk({proxi:s,bindEffect:n})})}
        </ul>
    </div>`};var l0=m.createComponent({tag:"right-sidebar",component:c0,bindStore:[m.mainStore],state:{data:()=>({value:[],type:Array}),isVisible:()=>({value:!1,type:Boolean})}});var u0=({onMount:t,getProxi:e,bindEffect:r,addMethod:o})=>{let n=e();return o("skip",()=>{n.skip=!1}),t(({element:s})=>{n.isDisable=!0;let i=H.createTimeTween({data:{opacity:1,scale:1},duration:500});i.subscribe(({opacity:l,scale:p})=>{s.style.opacity=l,s.style.transform=`scale(${p})`});let a=m.beforeRouteChange(async()=>{n.skip||(n.isDisable=!1,await i.set({opacity:1}),i.goTo({scale:1}))}),c=m.afterRouteChange(async()=>{await i.goTo({opacity:0,scale:.9}).catch(()=>{}),n.isDisable=!0});return()=>{i.destroy(),i=null,a(),c()}}),g`
        <div
            class="c-loader center-viewport"
            ${r({toggleClass:{disable:()=>n.isDisable}})}
        >
            <span class="c-loader__inner"></span>
        </div>
    `};var p0=m.createComponent({tag:"route-loader",component:u0,state:{isLoading:()=>({value:!1,type:Boolean}),isDisable:()=>({value:!1,type:Boolean}),skip:()=>({value:!0,type:Boolean})}});var m0=({getProxi:t,bindEffect:e,addMethod:r})=>{let o=t();return r("update",n=>{o.active=n}),g`
        <h3
            class="c-scroller-down-label"
            ${e({toggleClass:{active:()=>o.active}})}
        >
            Scroll down
        </h3>
    `};var h0=m.createComponent({tag:"scroll-down-label",component:m0,state:{active:()=>({value:!1,type:Boolean})}});var d0=()=>{m.useMethodByName(Ho)?.setInputFocus()},yp=t=>{m.useMethodByName(Ho)?.updateCurrentSearchFromSuggestion(t)},f0=t=>{m.useMethodByName(Ho)?.shouldCloseSuggestion(t)},Dc=()=>{m.useMethodByName(Ho)?.closeSuggestion()};var g0=({proxi:t})=>{t.active=!1,Dc()},Fk=({target:t})=>{t&&f0(t)},b0=({getProxi:t,delegateEvents:e,bindEffect:r,addMethod:o,bindObject:n,staticProps:s})=>{let i=t();return o("toggle",()=>{i.active=!i.active}),g`<div
        class="search-overlay"
        ${r({toggleClass:{active:()=>i.active}})}
    >
        <button
            class="search-overlay__background"
            type="button"
            ${e({click:()=>{g0({proxi:i})}})}
        ></button>
        <button
            type="button"
            class="search-overlay__close"
            ${e({click:()=>{g0({proxi:i})}})}
        ></button>

        <!-- Main content -->
        <div
            class="search-overlay__grid"
            ${e({click:a=>{Fk({target:a.target})}})}
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
                    name="${ii}"
                ></search-overlay-list>
            </div>
        </div>
    </div>`};var v0=t=>{m.useMethodByName(ii)?.update(t)},y0=()=>{m.useMethodByName(ii)?.reset()};var Dk=async({currentSearch:t})=>{v0(t)},Tp=({getRef:t})=>{let{search_input:e}=t(),r=e.value;Dk({currentSearch:r})},T0=({getRef:t,proxi:e})=>{y0();let{search_input:r}=t();r.value="",e.suggestionListData=[]},_0=t=>`~${t}`,Bk=({currentSearch:t,proxi:e})=>{let o=pr().suggestion;t.length===0&&(e.suggestionListData=[]);let s=t.split(" ").slice(-1).join("").replaceAll("~","").split(" ").filter(i=>i!=="")??"";e.suggestionListData=(o.filter(({word:i})=>s.some(a=>i.toLowerCase().includes(a.toLowerCase())))??[]).map(({word:i})=>({word:i,wordHiglight:(()=>{let a=s.reduce((c,l,p)=>c.toLowerCase().replaceAll(new RegExp(`(?<!~)${l.toLowerCase()}`,"g"),`${_0(p)}`),i);return s.reduce((c,l,p)=>c.replaceAll(`${_0(p)}`,`<span class="match-string">${l}</span>`),a)})()}))},S0=({delegateEvents:t,getRef:e,setRef:r,getProxi:o,bindProps:n,addMethod:s,onMount:i,computed:a,bindEffect:c})=>{let l=o();return a(()=>l.suggestionListActive,()=>l.suggestionListData.length>0),i(()=>{let{search_input:p,suggestionElement:h}=e();s("updateCurrentSearchFromSuggestion",f=>{let y=p.value.split(" "),v=y.length===0?f:`${y.slice(0,-1).join(" ")} ${f}`;p.value=v.trimStart(),l.suggestionListData=[],p.focus()}),s("shouldCloseSuggestion",f=>{h!==f&&!h.contains(f)&&(l.suggestionListData=[])}),s("closeSuggestion",()=>{l.suggestionListData=[]}),s("setInputFocus",async()=>{setTimeout(()=>{p.focus()},300)})}),g`<div class="search-overlay-header">
        <div class="search-overlay-header__input-container">
            <input
                type="text"
                class="search-overlay-header__input"
                ${r("search_input")}
                ${t({keyup:u.useDebounce(p=>{if(p.code.toLowerCase()==="enter"){p.preventDefault(),Tp({getRef:e,proxi:l}),l.suggestionListData=[];return}if(p.code.toLowerCase()==="escape"){p.preventDefault(),l.suggestionListData=[];return}let h=p.currentTarget.value;Bk({currentSearch:h,proxi:l})},60)})}
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
            ${t({click:()=>{Tp({getRef:e,proxi:l})},keydown:p=>{p.code.toLowerCase()==="enter"&&Tp({getRef:e,proxi:l})}})}
        >
            submit
        </button>

        <!-- Reset -->
        <button
            type="button"
            class="search-overlay-header__button"
            ${t({click:()=>{T0({getRef:e,proxi:l})},keydown:p=>{p.code.toLowerCase()==="enter"&&T0({getRef:e,proxi:l})}})}
        >
            reset
        </button>
    </div>`};var x0=({getProxi:t,repeat:e,bindProps:r})=>{let o=t();return g`<div>
        <div class="search-overlay-suggestion">
            <ul class="search-overlay-suggestion__list">
                ${e({observe:()=>o.list,key:"word",render:({current:n})=>g`
                            <search-overlay-suggestion-item
                                ${r(()=>({word:n.value.word,wordHiglight:n.value.wordHiglight}))}
                            >
                            </search-overlay-suggestion-item>
                        `})}
            </ul>
        </div>
    </div>`};var Vk=({code:t,word:e})=>{if(t.toLowerCase()==="enter"){yp(e);return}if(t.toLowerCase()==="escape"){Dc();return}},C0=({getProxi:t,delegateEvents:e,bindObject:r})=>{let o=t();return g`
        <li class="search-overlay-suggestion__item">
            <button
                type="button"
                class="search-overlay-suggestion__button"
                ${e({click:()=>{yp(o.word)},keydown:n=>{n.preventDefault(),Vk({code:n.code,word:o.word})}})}
            >
                ${r`${()=>o.wordHiglight}`}
            </button>
        </li>
    `};var E0=m.createComponent({tag:"search-overlay-suggestion-item",component:C0,props:{word:()=>({value:"",type:String}),wordHiglight:()=>({value:"",type:String})}});var w0=m.createComponent({tag:"search-overlay-suggestion",component:x0,props:{list:()=>({value:[],type:Array})},child:[E0]});var I0=m.createComponent({tag:"search-overlay-header",component:S0,state:{suggestionListActive:()=>({value:!1,type:Boolean}),suggestionListData:()=>({value:[],type:Array})},child:[w0]});var Wk=async({source:t,uri:e,title:r,section:o,breadCrumbs:n})=>{let s=await fetch(t);return s.ok?{success:!0,data:(await s.json()).data,uri:e,title:r,section:o,breadCrumbs:n}:(console.warn(`${t} not found`),{success:!1,data:[{component:"",props:{}}],uri:e,title:r,section:o,breadCrumbs:[]})},jk=new Set(["mob-title","mob-paragraph","mob-list"]),zk=new Set(["mob-title","mob-paragraph"]),Hk=new Set(["mob-list"]),M0=async({currentSearch:t=""})=>{let e=Nc.filter(({props:a})=>a?.source&&a?.title).map(({hash:a,props:c})=>({fn:Wk({source:c.source??"",uri:a??"uri not forud",title:c.title??"title not found",section:c.section??"title not found",breadCrumbs:c.breadCrumbs??[]})})),r=await Promise.all(e.map(({fn:a})=>a)),o=[],n=r.filter(({success:a})=>a).map(({data:a,uri:c,title:l,section:p,breadCrumbs:h})=>{let y=a.reduce((v,T)=>{if(!T)return v;let{component:S}=T;return S?T.component==="html-content"?T?.props?.data?[...v,T.props.data]:v:[...v,T]:v},o).flat().filter(({component:v})=>jk.has(v)).flatMap(v=>zk.has(v?.component)?v.content:Hk.has(v?.component)?v?.props?.links?v.props.items.map(({label:T})=>T):v.props.items:v);return{uri:c,title:l,section:p,breadCrumbs:h,data:y}}),s=t.split(" ");return n.filter(a=>{let c=a.data.join(" ");return s.every(l=>c.toLowerCase().includes(l.toLowerCase()))}).toSorted(a=>a.title.toLowerCase().includes(t.toLowerCase())?-1:1).map(({title:a,uri:c,section:l,breadCrumbs:p,data:h})=>{let f=h.join("").toLowerCase().split(t.toLowerCase()),d=p.length>0?p.reduce((y,v,T)=>{let S=T>0?"/":"";return`${y}${S}${v.title}`},""):a;return{title:a,uri:c,section:l,breadCrumbs:d,count:f?.length??0}})};var Uk=({getRef:t})=>{let{screen:e,scroller:r,scrollbar:o}=t();o.addEventListener("input",()=>{c(o.value)});let n=dr({screen:e,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},k0=({getProxi:t,repeat:e,setRef:r,getRef:o,onMount:n,watch:s,addMethod:i,bindEffect:a,invalidate:c,bindProps:l})=>{let p=t();i("update",async f=>{p.loading||(p.loading=!0,p.noResult=!1,p.list=await M0({currentSearch:f}),p.loading=!1,p.noResult=p.list.length===0,p.updatePrentSearchKey(f))}),i("reset",()=>{p.updatePrentSearchKey(""),p.list=[]});let h;return n(()=>{let{destroy:f,updateScroller:d,move:y,refresh:v}=Uk({getRef:o});return h=y,s(()=>p.list,async()=>{await m.tick(),v(),d(),h(0)}),()=>{f?.()}}),g`<div class="search-overlay-list" ${r("screen")}>
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
            ${e({observe:()=>p.list,render:({current:f})=>g`
                        <search-overlay-list-item
                            ${l(()=>({active:p.activeRoute.route===f.value.uri,uri:f.value.uri,breadCrumbs:f.value.breadCrumbs,count:f.value.count,title:f.value.title}))}
                        >
                        </search-overlay-list-item>
                    `})}
        </ul>
    </div>`};var Bc=()=>{m.useMethodByName(pc)?.toggle()};var Gk=({uri:t})=>{m.loadUrl({url:t}),Bc()},R0=({getProxi:t,bindEffect:e,delegateEvents:r,bindObject:o})=>{let n=t();return g`
        <li
            class="search-overlay-list__item"
            ${e({toggleClass:{current:()=>n.active}})}
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
    `};var P0=m.createComponent({tag:"search-overlay-list-item",component:R0,props:{uri:()=>({value:"",type:String}),breadCrumbs:()=>({value:"",type:String}),title:()=>({value:"",type:String}),count:()=>({value:0,type:Number}),active:()=>({value:!1,type:Boolean})}});var N0=m.createComponent({tag:"search-overlay-list",component:k0,bindStore:m.mainStore,props:{updatePrentSearchKey:()=>({value:()=>{},type:Function})},state:{list:()=>({value:[],type:Array}),loading:()=>({value:!1,type:Boolean}),noResult:()=>({value:!1,type:Boolean})},child:[P0]});var A0=m.createComponent({tag:"search-overlay",component:b0,state:{active:()=>({value:!1,type:Boolean}),currentSearch:()=>({value:"",type:String})},child:[I0,N0]});var O0=()=>g`
        <div class="test-grid">
            <div class="test-grid__grid">
                <span></span><span></span><span></span><span></span><span></span
                ><span></span><span></span><span></span><span></span
                ><span></span><span></span><span></span>
            </div>
            <div class="test-grid__cont"><span>test</span></div>
        </div>
    `;var $0=m.createComponent({tag:"test-scss-grid",component:O0});var yo=()=>{let{templateName:t}=m.getActiveRoute();return Pc.has(t)?0:40};var L0=()=>{m.useMethodByName(cc)?.toggle()};var qk=["Alberto Navarro","Milan, Italy",'<a href="https://github.com/albnavarro/" target="_blank">[ github ]</a>','<a href="https://www.linkedin.com/in/alberto-navarro74/" target="_blank">[ linkedin ]</a>'],Jk=()=>g`
        <ul class="l-footer__bio">
            ${qk.map(t=>g` <li class="l-footer__bio__item">${t}</li> `).join("")}
        </ul>
    `,F0=({delegateEvents:t,getProxi:e,onMount:r,bindEffect:o})=>{let n=e();return r(()=>{u.useFrameIndex(()=>{n.isMounted=!0},yo())}),g`
        <footer
            class="l-footer"
            ${o({toggleClass:{"is-visible":()=>n.isMounted}})}
        >
            <div class="l-footer__container">
                ${Jk()}
                <div class="l-footer__debug">
                    <debug-button
                        class="c-button-debug"
                        ${t({click:()=>{L0()}})}
                    >
                        Debug App</debug-button
                    >
                    <debug-button
                        class="c-button-console"
                        ${t({click:()=>{Ac()}})}
                    >
                        Log
                    </debug-button>
                </div>
            </div>
        </footer>
    `};var D0=()=>g`
        <button type="button" class="c-btn-debug">
            <mobjs-slot></mobjs-slot>
        </button>
    `;var B0=m.createComponent({tag:"debug-button",component:D0});var V0=m.createComponent({tag:"mob-footer",component:F0,child:[B0],state:{isMounted:()=>({value:!1,type:Boolean})}});var Vc=()=>{m.useMethodByName(si)?.scrollTop()},Wc=()=>{m.useMethodByName(si)?.refresh()};var ts=({fireCallback:t=!0}={})=>{m.useMethodByName(uc)?.closeAllAccordion({fireCallback:t})};function Yk(){m.loadUrl({url:"home"}),ts(),te.set("navigationIsOpen",!1),Vc()}var W0=({delegateEvents:t,bindEffect:e,getProxi:r,onMount:o,addMethod:n})=>{let s=r();return o(({element:i})=>{n("getHeaderHeight",()=>le(i)),u.useFrameIndex(()=>{s.isMounted=!0},yo())}),g`
        <header
            class="l-header"
            ${e({toggleClass:{"is-visible":()=>s.isMounted}})}
        >
            <div class="l-header__container">
                <div class="l-header__grid">
                    <div class="l-header__toggle">
                        <mob-header-toggle></mob-header-toggle>
                    </div>
                    <button
                        type="button"
                        class="l-header__title"
                        ${t({click:()=>{Yk()}})}
                    >
                        <div class="l-header__title-container">
                            <h3
                                ${e({toggleClass:{"is-visible":()=>s.isMounted}})}
                            >
                                <span>Mob</span>Project
                            </h3>
                            <h5
                                ${e({toggleClass:{"is-visible":()=>s.isMounted}})}
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
                        ${e({toggleClass:{"is-visible":()=>s.isMounted}})}
                    >
                        <mob-header-utils></mob-header-utils>
                    </div>
                </div>
            </div>
        </header>
    `};var j0=({delegateEvents:t,bindEffect:e,getProxi:r,onMount:o})=>{let n=r();return o(()=>{u.useFrameIndex(()=>{n.isMounted=!0},yo())}),g`
        <button
            class="hamburger"
            type="button"
            ${t({click:()=>{te.update("navigationIsOpen",s=>!s),n.navigationIsOpen||Ut()}})}
            ${e([{toggleClass:{"is-open":()=>n.navigationIsOpen}},{toggleClass:{"is-mounted":()=>n.isMounted}}])}
        >
            <div class="hamburger__box">
                <div class="hamburger-inner"></div>
            </div>
        </button>
    `};var z0=m.createComponent({tag:"mob-header-toggle",component:j0,bindStore:te,state:{isMounted:()=>({value:!1,type:Boolean})}});var Xk=({event:t})=>{let e=t.target;console.log(e);let{url:r}=e?.dataset??"";m.loadUrl({url:r}),te.set("navigationIsOpen",!1)};function Kk({delegateEvents:t}){let e=pr().header,{links:r}=e,o={github:zn().gitHubIcon};return r.map(n=>{let{svg:s,url:i,internal:a}=n;return g`<li class="l-header__sidenav__item">
                ${a?g`
                          <button
                              type="button"
                              data-url="${i}"
                              class="l-header__sidenav__link"
                              ${t({click:c=>{Xk({event:c})}})}
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
            </li>`}).join("")}var H0=({delegateEvents:t})=>g`
        <ul class="l-header__sidenav">
            <li class="l-header__sidenav__item">
                <search-cta></search-cta>
            </li>
            ${Kk({delegateEvents:t})}
        </ul>
    `;var Qk=()=>{Bc(),d0()},U0=({delegateEvents:t})=>{let e=zn().searchIcons;return g`<button
        type="button"
        class="search-cta"
        ${t({click:()=>{Qk()}})}
    >
        ${e}
    </button>`};var G0=m.createComponent({tag:"search-cta",component:U0});var q0=m.createComponent({tag:"mob-header-utils",component:H0,child:[G0]});var Zk=({delegateEvents:t,staticProps:e})=>pr().footer.nav.map(({label:o,url:n,section:s})=>g`<li class="header-main-menu__item">
                <header-main-menu-button
                    ${t({click:()=>{m.loadUrl({url:n}),te.set("navigationIsOpen",!1)}})}
                    ${e({label:o,section:s})}
                ></header-main-menu-button>
            </li> `).join(""),J0=({delegateEvents:t,staticProps:e,getProxi:r,onMount:o,bindEffect:n})=>{let s=r();return o(()=>{u.useFrameIndex(()=>{"isMounted"in s&&(s.isMounted=!0)},10)}),g`
        <ul
            class="header-main-menu"
            ${n({toggleClass:{"is-visible":()=>s.isMounted}})}
        >
            ${Zk({delegateEvents:t,staticProps:e})}
        </ul>
    `};var Y0=({getProxi:t,bindEffect:e,computed:r})=>{let o=t();return r(()=>o.active,()=>o.section===o.activeNavigationSection),g`
        <button
            type="button"
            class="header-main-menu__button"
            ${e({toggleClass:{current:()=>o.active}})}
        >
            ${o.label}
        </button>
    `};var X0=m.createComponent({tag:"header-main-menu-button",component:Y0,bindStore:te,props:{label:()=>({value:"",type:String}),section:()=>({value:"",type:String})},state:{active:()=>({value:!1,type:Boolean})}});var K0=m.createComponent({tag:"header-main-menu",component:J0,child:[X0],state:{isMounted:()=>({value:!1,type:Boolean})}});var Q0=m.createComponent({tag:"mob-header",component:W0,state:{isMounted:()=>({value:!1,type:Boolean})},child:[K0,q0,z0]});var _p=0,Z0=({root:t})=>{let e=t.querySelector(".l-navcontainer__wrap"),r=t.querySelector(".l-navcontainer__scroll"),o=t.querySelector(".l-navcontainer__percent"),n=200,s=new _t({screen:e,scroller:r,direction:"vertical",drag:!0,scopedEvent:!1,onUpdate:({percent:i})=>{let{navigationIsOpen:a}=te.get();a&&(_p=Math.round(i)/100,o.style.transform=`translateZ(0) scaleX(${_p})`)}});return s.init(),te.watch("activeNavigationSection",i=>{let a=document.querySelector(`[data-sectionname='${i}']`);if(!a)return;let c=document.querySelector(".l-header"),l=document.querySelector(".l-footer"),p=le(r),h=le(c),f=le(l),y=100*a.offsetTop/(p-window.innerHeight+h+f);setTimeout(()=>{te.getProp("navigationIsOpen")||s.set(y)},400)}),te.watch("navigationIsOpen",i=>{if(i){o.style.transform=`translateZ(0) scaleX(${_p})`;return}o.style.transform="translateZ(0) scaleX(0)"}),{scrollNativationToTop:()=>{setTimeout(()=>{s.move(0).catch(()=>{}),o.style.transform="translateZ(0) scaleX(0)"},n)},refreshScroller:()=>{s.refresh()}}};function eR({main:t,proxi:e}){e.isOpen=!1,u.useFrame(()=>{document.body.style.overflow="",t.classList.remove("shift")})}function tR({main:t,proxi:e}){Wc(),e.isOpen=!0,u.useFrame(()=>{document.body.style.overflow="hidden",t.classList.add("shift")})}function rR({main:t}){t.addEventListener("click",()=>{te.set("navigationIsOpen",!1),Ut()})}var oR=()=>{Vc(),ts();let{navigationIsOpen:t}=te.get();t||Ar.to(0)},eC=({onMount:t,addMethod:e,delegateEvents:r,bindEffect:o,getProxi:n})=>{let s=n();return t(({element:i})=>{let a=document.querySelector("main.main");te.watch("navigationIsOpen",p=>{if(p&&a){tR({main:a,proxi:s});return}eR({main:a,proxi:s})}),rR({main:a});let{scrollNativationToTop:c,refreshScroller:l}=Z0({root:i});return e("scrollTop",c),e("refresh",l),u.useFrameIndex(()=>{s.isMounted=!0},yo()),()=>{}}),g`
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
                        name="${uc}"
                    ></mob-navigation>
                </div>
            </div>
        </div>
    `};function nR({data:t,staticProps:e,bindProps:r,proxi:o}){return t.map((n,s)=>{let{label:i,url:a,activeId:c,children:l,section:p,sectioName:h,scrollToSection:f,forceChildren:d,hide:y}=n;return p?g`
                    <mob-navigation-label
                        ${e({label:i,sectioName:h,hide:!!y})}
                    ></mob-navigation-label>
                `:l?g`
                      <mob-navigation-submenu
                          ${e({headerButton:{label:i,url:a,id:s},children:l,callback:({forceClose:v=!1})=>{if(v){o.currentAccordionId=-1;return}o.currentAccordionId=s}})}
                          ${r(()=>({isOpen:o.currentAccordionId===s}))}
                      >
                      </mob-navigation-submenu>
                  `:g`
                      <li class="l-navigation__item">
                          <mob-navigation-button
                              ${e({label:i,url:a,scrollToSection:f??"no-scroll",activeId:c??-1,forceChildren:d??[]})}
                          ></mob-navigation-button>
                      </li>
                  `}).join("")}var tC=({staticProps:t,setState:e,bindProps:r,addMethod:o,getProxi:n})=>{let s=n(),{navigation:i}=pr();return o("closeAllAccordion",({fireCallback:a=!0}={})=>{e(()=>s.currentAccordionId,-1,{emit:a})}),g`
        <nav class="l-navigation">
            <ul class="l-navigation__list">
                ${nR({data:i,staticProps:t,bindProps:r,proxi:s})}
            </ul>
        </nav>
    `};var rC=({bindEffect:t,getProxi:e})=>{let r=e();return g`
        <div
            class="l-navigation__label"
            data-sectionname="${r.sectioName}"
            ${t({toggleClass:{active:()=>r.sectioName===r.activeNavigationSection,hide:()=>!!r.hide}})}
        >
            ${r.label}
        </div>
    `};var oC=m.createComponent({tag:"mob-navigation-label",component:rC,bindStore:te,props:{label:()=>({value:"",type:String}),sectioName:()=>({value:"",type:String}),hide:()=>({value:!1,type:Boolean})}});function sR({proxi:t,staticProps:e}){return t.children.map(r=>{let{label:o,url:n,scrollToSection:s,activeId:i}=r;return g`
                <li class="l-navigation__submenu__item">
                    <mob-navigation-button
                        ${e({label:o,url:n,subMenuClass:"l-navigation__link--submenu",scrollToSection:s,activeId:i??-1,callback:()=>{t.callback({forceClose:!1})}})}
                    ></mob-navigation-button>
                </li>
            `}).join("")}var nC=({onMount:t,staticProps:e,bindProps:r,watch:o,setRef:n,getRef:s,getProxi:i})=>{let a=i(),{label:c,url:l,activeId:p}=a.headerButton;return t(()=>{let{content:h}=s();return Or.subscribe(h),Or.reset(h),o(()=>a.isOpen,async f=>{await Or[f?"down":"up"](h),Wc(),!f&&ts({fireCallback:!1})},{immediate:!0}),()=>{}}),g`
        <li class="l-navigation__item has-child">
            <mob-navigation-button
                ${e({label:c,url:l,arrowClass:"l-navigation__link--arrow",fireRoute:!1,activeId:p??-1,callback:()=>{a.callback({forceClose:a.isOpen})}})}
                ${r(()=>({isOpen:a.isOpen}))}
            ></mob-navigation-button>
            <ul class="l-navigation__submenu" ${n("content")}>
                ${sR({proxi:a,staticProps:e})}
            </ul>
        </li>
    `};var sC=({delegateEvents:t,getProxi:e,bindEffect:r})=>{let o=e(),{label:n,url:s,arrowClass:i,subMenuClass:a,fireRoute:c,callback:l,scrollToSection:p,activeId:h,forceChildren:f}=o;return m.afterRouteChange(({currentRoute:d})=>{u.useFrame(()=>{let v=s.split("?")?.[0]??"",T=m.getActiveParams(),S=h===-1||T?.activeId===`${h}`,_=d===v&&S,E=f.includes(d);o.isCurrent=_||E,_&&c&&(l(),te.set("activeNavigationSection",p))})}),g`
        <button
            type="button"
            class="l-navigation__link  ${i} ${a}"
            ${t({click:()=>{l(),c&&(m.loadUrl({url:s}),te.set("navigationIsOpen",!1))}})}
            ${r({toggleClass:{active:()=>o.isOpen,current:()=>o.isCurrent}})}
        >
            ${n}
        </button>
    `};var jc=m.createComponent({tag:"mob-navigation-button",component:sC,props:{label:()=>({value:"",type:String}),url:()=>({value:"",type:String}),arrowClass:()=>({value:"",type:String}),subMenuClass:()=>({value:"",type:String}),fireRoute:()=>({value:!0,type:Boolean}),callback:()=>({value:()=>{},type:Function}),isOpen:()=>({value:!1,type:Boolean}),scrollToSection:()=>({value:"",type:String}),activeId:()=>({value:-1,type:Number}),forceChildren:()=>({value:[],type:Array})},state:{isCurrent:()=>({value:!1,type:Boolean})}});var iC=m.createComponent({tag:"mob-navigation-submenu",component:nC,props:{callback:()=>({value:()=>{},type:Function}),headerButton:()=>({value:{},type:"Any"}),children:()=>({value:[],type:Array}),isOpen:()=>({value:!1,type:Boolean})},child:[jc]});var aC=m.createComponent({tag:"mob-navigation",component:tC,state:{currentAccordionId:()=>({value:-1,type:Number,skipEqual:!1})},child:[oC,iC,jc]});var cC=m.createComponent({tag:"mob-navigation-container",component:eC,child:[aC],state:{isOpen:()=>({value:!1,type:Boolean}),isMounted:()=>({value:!1,type:Boolean})}});m.useComponent([Q0,cC,V0,a0,p0,h0,s0,t0,$0,A0,l0]);var lC=async()=>g`
        ${""}
        <debug-overlay name="${cc}"></debug-overlay>
        <mob-header name="${bT}"></mob-header>
        <mob-navigation-container
            name="${si}"
        ></mob-navigation-container>
        <main class="main">
            <div class="container">
                <div class="inner-wrap">
                    <div id="content"></div>
                </div>
            </div>
        </main>
        <mob-footer> </mob-footer>
        <quick-nav name="${ri}"></quick-nav>
        <route-loader name="${hc}"></route-loader>
        <scroll-down-label name="${oi}"></scroll-down-label>
        <links-mobjs></links-mobjs>
        <right-sidebar name="${mc}"></right-sidebar>
        <search-overlay name="${pc}"></search-overlay>
    `;var Sp=0,xp=document.querySelector(".js-main-loader-track"),uC=(t=60)=>{let e=()=>{if(Sp++,!xp)return;let r=100*Sp/t;if(xp.style.transform=`scaleX(${r/100})`,Sp>=t){xp=null;return}u.useNextFrame(()=>{e()})};u.useFrame(()=>{e()})};var pC=t=>{m.useMethodByName(hc).skip(t)};var mC=60,hC=()=>ue.mq("max","desktop"),iR=()=>{u.useResize(()=>{hC()&&m.loadUrl({url:"onlyDesktop"})})},Hc=document.body.querySelector(".js-main-loader"),Uc=document.body.querySelector(".js-main-loader-background"),zc=H.createTimeTween({data:{opacity:1},duration:1e3});Hc&&Uc&&[Hc,Uc].forEach(t=>{zc?.subscribe(({opacity:e})=>{t.style.opacity=e})});var aR=async()=>{await Ay(),await Oy(),uC(mC),await u.useFps({duration:mC,force:!0}),m.inizializeApp({rootId:"#root",contentId:"#content",wrapper:lC,routes:Nc,index:"home",pageNotFound:"pageNotFound",beforePageTransition:wx,pageTransition:Ix,afterInit:async()=>{await zc.goTo({opacity:0}),zc.destroy(),zc=null,Hc?.remove(),Uc?.remove(),Hc=null,Uc=null,kx(),iR(),pC(!1)},redirect:({route:t})=>hC()?"onlyDesktop":t,restoreScroll:!0,componentDefaultProps:{scoped:!1,maxParseIteration:1e4,debug:!1}})};u.useLoad(()=>{ky(),ue.setDefault({deferredNextTick:!0,throttle:100}),aR(),My()});})();
//# sourceMappingURL=main.js.map
