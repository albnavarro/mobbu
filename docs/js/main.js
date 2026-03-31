"use strict";(()=>{var EC=Object.create;var al=Object.defineProperty;var wC=Object.getOwnPropertyDescriptor;var IC=Object.getOwnPropertyNames;var MC=Object.getPrototypeOf,kC=Object.prototype.hasOwnProperty;var RC=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),To=(e,t)=>{for(var r in t)al(e,r,{get:t[r],enumerable:!0})},NC=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of IC(t))!kC.call(e,n)&&n!==r&&al(e,n,{get:()=>t[n],enumerable:!(o=wC(t,n))||o.enumerable});return e};var PC=(e,t,r)=>(r=e!=null?EC(MC(e)):{},NC(t||!e||!e.__esModule?al(r,"default",{value:e,enumerable:!0}):r,e));var gT=RC((MJ,fT)=>{function oT(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{let r=e[t],o=typeof r;(o==="object"||o==="function")&&!Object.isFrozen(r)&&oT(r)}),e}var gc=class{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}};function nT(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function ho(e,...t){let r=Object.create(null);for(let o in e)r[o]=e[o];return t.forEach(function(o){for(let n in o)r[n]=o[n]}),r}var YI="</span>",Ky=e=>!!e.scope,XI=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){let r=e.split(".");return[`${t}${r.shift()}`,...r.map((o,n)=>`${o}${"_".repeat(n+1)}`)].join(" ")}return`${t}${e}`},tp=class{constructor(t,r){this.buffer="",this.classPrefix=r.classPrefix,t.walk(this)}addText(t){this.buffer+=nT(t)}openNode(t){if(!Ky(t))return;let r=XI(t.scope,{prefix:this.classPrefix});this.span(r)}closeNode(t){Ky(t)&&(this.buffer+=YI)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}},Qy=(e={})=>{let t={children:[]};return Object.assign(t,e),t},rp=class e{constructor(){this.rootNode=Qy(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){let r=Qy({scope:t});this.add(r),this.stack.push(r)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,r){return typeof r=="string"?t.addText(r):r.children&&(t.openNode(r),r.children.forEach(o=>this._walk(t,o)),t.closeNode(r)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(r=>typeof r=="string")?t.children=[t.children.join("")]:t.children.forEach(r=>{e._collapse(r)}))}},op=class extends rp{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,r){let o=t.root;r&&(o.scope=`language:${r}`),this.add(o)}toHTML(){return new tp(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}};function ai(e){return e?typeof e=="string"?e:e.source:null}function sT(e){return zo("(?=",e,")")}function KI(e){return zo("(?:",e,")*")}function QI(e){return zo("(?:",e,")?")}function zo(...e){return e.map(r=>ai(r)).join("")}function ZI(e){let t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function sp(...e){return"("+(ZI(e).capture?"":"?:")+e.map(o=>ai(o)).join("|")+")"}function iT(e){return new RegExp(e.toString()+"|").exec("").length-1}function eM(e,t){let r=e&&e.exec(t);return r&&r.index===0}var tM=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function ip(e,{joinWith:t}){let r=0;return e.map(o=>{r+=1;let n=r,s=ai(o),i="";for(;s.length>0;){let a=tM.exec(s);if(!a){i+=s;break}i+=s.substring(0,a.index),s=s.substring(a.index+a[0].length),a[0][0]==="\\"&&a[1]?i+="\\"+String(Number(a[1])+n):(i+=a[0],a[0]==="("&&r++)}return i}).map(o=>`(${o})`).join(t)}var rM=/\b\B/,aT="[a-zA-Z]\\w*",ap="[a-zA-Z_]\\w*",cT="\\b\\d+(\\.\\d+)?",lT="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",uT="\\b(0b[01]+)",oM="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",nM=(e={})=>{let t=/^#![ ]*\//;return e.binary&&(e.begin=zo(t,/.*\b/,e.binary,/\b.*/)),ho({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(r,o)=>{r.index!==0&&o.ignoreMatch()}},e)},ci={begin:"\\\\[\\s\\S]",relevance:0},sM={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[ci]},iM={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[ci]},aM={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},vc=function(e,t,r={}){let o=ho({scope:"comment",begin:e,end:t,contains:[]},r);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});let n=sp("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:zo(/[ ]+/,"(",n,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},cM=vc("//","$"),lM=vc("/\\*","\\*/"),uM=vc("#","$"),pM={scope:"number",begin:cT,relevance:0},mM={scope:"number",begin:lT,relevance:0},hM={scope:"number",begin:uT,relevance:0},dM={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[ci,{begin:/\[/,end:/\]/,relevance:0,contains:[ci]}]},fM={scope:"title",begin:aT,relevance:0},gM={scope:"title",begin:ap,relevance:0},bM={begin:"\\.\\s*"+ap,relevance:0},vM=function(e){return Object.assign(e,{"on:begin":(t,r)=>{r.data._beginMatch=t[1]},"on:end":(t,r)=>{r.data._beginMatch!==t[1]&&r.ignoreMatch()}})},fc=Object.freeze({__proto__:null,APOS_STRING_MODE:sM,BACKSLASH_ESCAPE:ci,BINARY_NUMBER_MODE:hM,BINARY_NUMBER_RE:uT,COMMENT:vc,C_BLOCK_COMMENT_MODE:lM,C_LINE_COMMENT_MODE:cM,C_NUMBER_MODE:mM,C_NUMBER_RE:lT,END_SAME_AS_BEGIN:vM,HASH_COMMENT_MODE:uM,IDENT_RE:aT,MATCH_NOTHING_RE:rM,METHOD_GUARD:bM,NUMBER_MODE:pM,NUMBER_RE:cT,PHRASAL_WORDS_MODE:aM,QUOTE_STRING_MODE:iM,REGEXP_MODE:dM,RE_STARTERS_RE:oM,SHEBANG:nM,TITLE_MODE:fM,UNDERSCORE_IDENT_RE:ap,UNDERSCORE_TITLE_MODE:gM});function yM(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function TM(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function _M(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=yM,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function SM(e,t){Array.isArray(e.illegal)&&(e.illegal=sp(...e.illegal))}function xM(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function CM(e,t){e.relevance===void 0&&(e.relevance=1)}var EM=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");let r=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=r.keywords,e.begin=zo(r.beforeMatch,sT(r.begin)),e.starts={relevance:0,contains:[Object.assign(r,{endsParent:!0})]},e.relevance=0,delete r.beforeMatch},wM=["of","and","for","in","not","or","if","then","parent","list","value"],IM="keyword";function pT(e,t,r=IM){let o=Object.create(null);return typeof e=="string"?n(r,e.split(" ")):Array.isArray(e)?n(r,e):Object.keys(e).forEach(function(s){Object.assign(o,pT(e[s],t,s))}),o;function n(s,i){t&&(i=i.map(a=>a.toLowerCase())),i.forEach(function(a){let c=a.split("|");o[c[0]]=[s,MM(c[0],c[1])]})}}function MM(e,t){return t?Number(t):kM(e)?0:1}function kM(e){return wM.includes(e.toLowerCase())}var Zy={},jo=e=>{console.error(e)},eT=(e,...t)=>{console.log(`WARN: ${e}`,...t)},qn=(e,t)=>{Zy[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Zy[`${e}/${t}`]=!0)},bc=new Error;function mT(e,t,{key:r}){let o=0,n=e[r],s={},i={};for(let a=1;a<=t.length;a++)i[a+o]=n[a],s[a+o]=!0,o+=iT(t[a-1]);e[r]=i,e[r]._emit=s,e[r]._multi=!0}function RM(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw jo("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),bc;if(typeof e.beginScope!="object"||e.beginScope===null)throw jo("beginScope must be object"),bc;mT(e,e.begin,{key:"beginScope"}),e.begin=ip(e.begin,{joinWith:""})}}function NM(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw jo("skip, excludeEnd, returnEnd not compatible with endScope: {}"),bc;if(typeof e.endScope!="object"||e.endScope===null)throw jo("endScope must be object"),bc;mT(e,e.end,{key:"endScope"}),e.end=ip(e.end,{joinWith:""})}}function PM(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function AM(e){PM(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),RM(e),NM(e)}function OM(e){function t(i,a){return new RegExp(ai(i),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(a?"g":""))}class r{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(a,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,a]),this.matchAt+=iT(a)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);let a=this.regexes.map(c=>c[1]);this.matcherRe=t(ip(a,{joinWith:"|"}),!0),this.lastIndex=0}exec(a){this.matcherRe.lastIndex=this.lastIndex;let c=this.matcherRe.exec(a);if(!c)return null;let l=c.findIndex((h,f)=>f>0&&h!==void 0),p=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,p)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(a){if(this.multiRegexes[a])return this.multiRegexes[a];let c=new r;return this.rules.slice(a).forEach(([l,p])=>c.addRule(l,p)),c.compile(),this.multiRegexes[a]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(a,c){this.rules.push([a,c]),c.type==="begin"&&this.count++}exec(a){let c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(a);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){let p=this.getMatcher(0);p.lastIndex=this.lastIndex+1,l=p.exec(a)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function n(i){let a=new o;return i.contains.forEach(c=>a.addRule(c.begin,{rule:c,type:"begin"})),i.terminatorEnd&&a.addRule(i.terminatorEnd,{type:"end"}),i.illegal&&a.addRule(i.illegal,{type:"illegal"}),a}function s(i,a){let c=i;if(i.isCompiled)return c;[TM,xM,AM,EM].forEach(p=>p(i,a)),e.compilerExtensions.forEach(p=>p(i,a)),i.__beforeBegin=null,[_M,SM,CM].forEach(p=>p(i,a)),i.isCompiled=!0;let l=null;return typeof i.keywords=="object"&&i.keywords.$pattern&&(i.keywords=Object.assign({},i.keywords),l=i.keywords.$pattern,delete i.keywords.$pattern),l=l||/\w+/,i.keywords&&(i.keywords=pT(i.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),a&&(i.begin||(i.begin=/\B|\b/),c.beginRe=t(c.begin),!i.end&&!i.endsWithParent&&(i.end=/\B|\b/),i.end&&(c.endRe=t(c.end)),c.terminatorEnd=ai(c.end)||"",i.endsWithParent&&a.terminatorEnd&&(c.terminatorEnd+=(i.end?"|":"")+a.terminatorEnd)),i.illegal&&(c.illegalRe=t(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map(function(p){return $M(p==="self"?i:p)})),i.contains.forEach(function(p){s(p,c)}),i.starts&&s(i.starts,a),c.matcher=n(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=ho(e.classNameAliases||{}),s(e)}function hT(e){return e?e.endsWithParent||hT(e.starts):!1}function $M(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return ho(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:hT(e)?ho(e,{starts:e.starts?ho(e.starts):null}):Object.isFrozen(e)?ho(e):e}var LM="11.11.1",np=class extends Error{constructor(t,r){super(t),this.name="HTMLInjectionError",this.html=r}},ep=nT,tT=ho,rT=Symbol("nomatch"),DM=7,dT=function(e){let t=Object.create(null),r=Object.create(null),o=[],n=!0,s="Could not find the language '{}', did you forget to load/include a language module?",i={disableAutodetect:!0,name:"Plain text",contains:[]},a={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:op};function c(C){return a.noHighlightRe.test(C)}function l(C){let M=C.className+" ";M+=C.parentNode?C.parentNode.className:"";let B=a.languageDetectRe.exec(M);if(B){let V=A(B[1]);return V||(eT(s.replace("{}",B[1])),eT("Falling back to no-highlight mode for this block.",C)),V?B[1]:"no-highlight"}return M.split(/\s+/).find(V=>c(V)||A(V))}function p(C,M,B){let V="",F="";typeof M=="object"?(V=C,B=M.ignoreIllegals,F=M.language):(qn("10.7.0","highlight(lang, code, ...args) has been deprecated."),qn("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),F=C,V=M),B===void 0&&(B=!0);let z={code:V,language:F};k("before:highlight",z);let te=z.result?z.result:h(z.language,z.code,B);return te.code=z.code,k("after:highlight",te),te}function h(C,M,B,V){let F=Object.create(null);function z(W,G){return W.keywords[G]}function te(){if(!Y.keywords){Ve.addText(xe);return}let W=0;Y.keywordPatternRe.lastIndex=0;let G=Y.keywordPatternRe.exec(xe),me="";for(;G;){me+=xe.substring(W,G.index);let Ce=$e.case_insensitive?G[0].toLowerCase():G[0],ot=z(Y,Ce);if(ot){let[mr,xC]=ot;if(Ve.addText(me),me="",F[Ce]=(F[Ce]||0)+1,F[Ce]<=DM&&(_i+=xC),mr.startsWith("_"))me+=G[0];else{let CC=$e.classNameAliases[mr]||mr;ne(G[0],CC)}}else me+=G[0];W=Y.keywordPatternRe.lastIndex,G=Y.keywordPatternRe.exec(xe)}me+=xe.substring(W),Ve.addText(me)}function ae(){if(xe==="")return;let W=null;if(typeof Y.subLanguage=="string"){if(!t[Y.subLanguage]){Ve.addText(xe);return}W=h(Y.subLanguage,xe,!0,$r[Y.subLanguage]),$r[Y.subLanguage]=W._top}else W=d(xe,Y.subLanguage.length?Y.subLanguage:null);Y.relevance>0&&(_i+=W.relevance),Ve.__addSublanguage(W._emitter,W.language)}function q(){Y.subLanguage!=null?ae():te(),xe=""}function ne(W,G){W!==""&&(Ve.startScope(G),Ve.addText(W),Ve.endScope())}function re(W,G){let me=1,Ce=G.length-1;for(;me<=Ce;){if(!W._emit[me]){me++;continue}let ot=$e.classNameAliases[W[me]]||W[me],mr=G[me];ot?ne(mr,ot):(xe=mr,te(),xe=""),me++}}function ce(W,G){return W.scope&&typeof W.scope=="string"&&Ve.openNode($e.classNameAliases[W.scope]||W.scope),W.beginScope&&(W.beginScope._wrap?(ne(xe,$e.classNameAliases[W.beginScope._wrap]||W.beginScope._wrap),xe=""):W.beginScope._multi&&(re(W.beginScope,G),xe="")),Y=Object.create(W,{parent:{value:Y}}),Y}function Oe(W,G,me){let Ce=eM(W.endRe,me);if(Ce){if(W["on:end"]){let ot=new gc(W);W["on:end"](G,ot),ot.isMatchIgnored&&(Ce=!1)}if(Ce){for(;W.endsParent&&W.parent;)W=W.parent;return W}}if(W.endsWithParent)return Oe(W.parent,G,me)}function Je(W){return Y.matcher.regexIndex===0?(xe+=W[0],1):(il=!0,0)}function Z(W){let G=W[0],me=W.rule,Ce=new gc(me),ot=[me.__beforeBegin,me["on:begin"]];for(let mr of ot)if(mr&&(mr(W,Ce),Ce.isMatchIgnored))return Je(G);return me.skip?xe+=G:(me.excludeBegin&&(xe+=G),q(),!me.returnBegin&&!me.excludeBegin&&(xe=G)),ce(me,W),me.returnBegin?0:G.length}function ye(W){let G=W[0],me=M.substring(W.index),Ce=Oe(Y,W,me);if(!Ce)return rT;let ot=Y;Y.endScope&&Y.endScope._wrap?(q(),ne(G,Y.endScope._wrap)):Y.endScope&&Y.endScope._multi?(q(),re(Y.endScope,W)):ot.skip?xe+=G:(ot.returnEnd||ot.excludeEnd||(xe+=G),q(),ot.excludeEnd&&(xe=G));do Y.scope&&Ve.closeNode(),!Y.skip&&!Y.subLanguage&&(_i+=Y.relevance),Y=Y.parent;while(Y!==Ce.parent);return Ce.starts&&ce(Ce.starts,W),ot.returnEnd?0:G.length}function ke(){let W=[];for(let G=Y;G!==$e;G=G.parent)G.scope&&W.unshift(G.scope);W.forEach(G=>Ve.openNode(G))}let Ae={};function Ye(W,G){let me=G&&G[0];if(xe+=W,me==null)return q(),0;if(Ae.type==="begin"&&G.type==="end"&&Ae.index===G.index&&me===""){if(xe+=M.slice(G.index,G.index+1),!n){let Ce=new Error(`0 width match regex (${C})`);throw Ce.languageName=C,Ce.badRule=Ae.rule,Ce}return 1}if(Ae=G,G.type==="begin")return Z(G);if(G.type==="illegal"&&!B){let Ce=new Error('Illegal lexeme "'+me+'" for mode "'+(Y.scope||"<unnamed>")+'"');throw Ce.mode=Y,Ce}else if(G.type==="end"){let Ce=ye(G);if(Ce!==rT)return Ce}if(G.type==="illegal"&&me==="")return xe+=`
`,1;if(sl>1e5&&sl>G.index*3)throw new Error("potential infinite loop, way more iterations than matches");return xe+=me,me.length}let $e=A(C);if(!$e)throw jo(s.replace("{}",C)),new Error('Unknown language: "'+C+'"');let Or=OM($e),Lt="",Y=V||Or,$r={},Ve=new a.__emitter(a);ke();let xe="",_i=0,yo=0,sl=0,il=!1;try{if($e.__emitTokens)$e.__emitTokens(M,Ve);else{for(Y.matcher.considerAll();;){sl++,il?il=!1:Y.matcher.considerAll(),Y.matcher.lastIndex=yo;let W=Y.matcher.exec(M);if(!W)break;let G=M.substring(yo,W.index),me=Ye(G,W);yo=W.index+me}Ye(M.substring(yo))}return Ve.finalize(),Lt=Ve.toHTML(),{language:C,value:Lt,relevance:_i,illegal:!1,_emitter:Ve,_top:Y}}catch(W){if(W.message&&W.message.includes("Illegal"))return{language:C,value:ep(M),illegal:!0,relevance:0,_illegalBy:{message:W.message,index:yo,context:M.slice(yo-100,yo+100),mode:W.mode,resultSoFar:Lt},_emitter:Ve};if(n)return{language:C,value:ep(M),illegal:!1,relevance:0,errorRaised:W,_emitter:Ve,_top:Y};throw W}}function f(C){let M={value:ep(C),illegal:!1,relevance:0,_top:i,_emitter:new a.__emitter(a)};return M._emitter.addText(C),M}function d(C,M){M=M||a.languages||Object.keys(t);let B=f(C),V=M.filter(A).filter(N).map(q=>h(q,C,!1));V.unshift(B);let F=V.sort((q,ne)=>{if(q.relevance!==ne.relevance)return ne.relevance-q.relevance;if(q.language&&ne.language){if(A(q.language).supersetOf===ne.language)return 1;if(A(ne.language).supersetOf===q.language)return-1}return 0}),[z,te]=F,ae=z;return ae.secondBest=te,ae}function v(C,M,B){let V=M&&r[M]||B;C.classList.add("hljs"),C.classList.add(`language-${V}`)}function y(C){let M=null,B=l(C);if(c(B))return;if(k("before:highlightElement",{el:C,language:B}),C.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",C);return}if(C.children.length>0&&(a.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(C)),a.throwUnescapedHTML))throw new np("One of your code blocks includes unescaped HTML.",C.innerHTML);M=C;let V=M.textContent,F=B?p(V,{language:B,ignoreIllegals:!0}):d(V);C.innerHTML=F.value,C.dataset.highlighted="yes",v(C,B,F.language),C.result={language:F.language,re:F.relevance,relevance:F.relevance},F.secondBest&&(C.secondBest={language:F.secondBest.language,relevance:F.secondBest.relevance}),k("after:highlightElement",{el:C,result:F,text:V})}function T(C){a=tT(a,C)}let S=()=>{x(),qn("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function _(){x(),qn("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let w=!1;function x(){function C(){x()}if(document.readyState==="loading"){w||window.addEventListener("DOMContentLoaded",C,!1),w=!0;return}document.querySelectorAll(a.cssSelector).forEach(y)}function E(C,M){let B=null;try{B=M(e)}catch(V){if(jo("Language definition for '{}' could not be registered.".replace("{}",C)),n)jo(V);else throw V;B=i}B.name||(B.name=C),t[C]=B,B.rawDefinition=M.bind(null,e),B.aliases&&$(B.aliases,{languageName:C})}function I(C){delete t[C];for(let M of Object.keys(r))r[M]===C&&delete r[M]}function P(){return Object.keys(t)}function A(C){return C=(C||"").toLowerCase(),t[C]||t[r[C]]}function $(C,{languageName:M}){typeof C=="string"&&(C=[C]),C.forEach(B=>{r[B.toLowerCase()]=M})}function N(C){let M=A(C);return M&&!M.disableAutodetect}function R(C){C["before:highlightBlock"]&&!C["before:highlightElement"]&&(C["before:highlightElement"]=M=>{C["before:highlightBlock"](Object.assign({block:M.el},M))}),C["after:highlightBlock"]&&!C["after:highlightElement"]&&(C["after:highlightElement"]=M=>{C["after:highlightBlock"](Object.assign({block:M.el},M))})}function O(C){R(C),o.push(C)}function D(C){let M=o.indexOf(C);M!==-1&&o.splice(M,1)}function k(C,M){let B=C;o.forEach(function(V){V[B]&&V[B](M)})}function L(C){return qn("10.7.0","highlightBlock will be removed entirely in v12.0"),qn("10.7.0","Please use highlightElement now."),y(C)}Object.assign(e,{highlight:p,highlightAuto:d,highlightAll:x,highlightElement:y,highlightBlock:L,configure:T,initHighlighting:S,initHighlightingOnLoad:_,registerLanguage:E,unregisterLanguage:I,listLanguages:P,getLanguage:A,registerAliases:$,autoDetection:N,inherit:tT,addPlugin:O,removePlugin:D}),e.debugMode=function(){n=!1},e.safeMode=function(){n=!0},e.versionString=LM,e.regex={concat:zo,lookahead:sT,either:sp,optional:QI,anyNumberOfTimes:KI};for(let C in fc)typeof fc[C]=="object"&&oT(fc[C]);return Object.assign(e,fc),e},Jn=dT({});Jn.newInstance=()=>dT({});fT.exports=Jn;Jn.HighlightJS=Jn;Jn.default=Jn});var u={};To(u,{ANIMATION_STOP_REJECT:()=>_l,checkType:()=>Re,createStore:()=>DE,debounce:()=>_o,getFps:()=>BE,getInstantFps:()=>FE,getTime:()=>Dt,getTypeName:()=>is,getUnivoqueId:()=>we,mustMakeSomething:()=>VE,normalizeWheel:()=>ms,shouldMakeSomething:()=>WE,store:()=>gw,throttle:()=>Si,useCache:()=>JE,useDebounce:()=>_o,useFps:()=>GE,useFrame:()=>jE,useFrameIndex:()=>UE,useLinkedList:()=>bw,useLoad:()=>qE,useMouseClick:()=>KE,useMouseDown:()=>QE,useMouseMove:()=>ew,useMouseUp:()=>rw,useMouseWheel:()=>nw,useNextFrame:()=>HE,useNextLoop:()=>Ft,useNextTick:()=>zE,usePointerDown:()=>pw,usePointerLeave:()=>fw,usePointerMove:()=>mw,usePointerOut:()=>dw,usePointerOver:()=>uw,usePointerUp:()=>hw,useResize:()=>YE,useScroll:()=>sw,useScrollEnd:()=>lw,useScrollImmediate:()=>iw,useScrollStart:()=>cw,useScrollThrottle:()=>aw,useTouchEnd:()=>ow,useTouchMove:()=>tw,useTouchStart:()=>ZE,useVisibilityChange:()=>XE});var Dt=()=>typeof globalThis>"u"?Date.now():globalThis.performance.now(),Op=16.666666666666668;var Si=(e,t)=>{let r,o;return function(){let n=this,s=arguments;o?(clearTimeout(r),r=setTimeout(function(){Dt()-o>=t&&(e.apply(n,s),o=Dt())},t-(Dt()-o))):(e.apply(n,s),o=Dt())}};var _o=function(t,r=200){let o;return function(){let n=()=>Reflect.apply(t,this,arguments);clearTimeout(o),o=setTimeout(n,r)}};function le(e){if(!e)return 0;let t=e.offsetHeight,r=getComputedStyle(e);return t+=Number.parseInt(r.marginTop)+Number.parseInt(r.marginBottom),t}function je(e){if(!e)return 0;let t=e.offsetWidth,r=getComputedStyle(e);return t+=Number.parseInt(r.marginLeft)+Number.parseInt(r.marginRight),t}function be(e){if(!e)return{top:0,left:0};let t=e.getBoundingClientRect();return{top:t.top+window.scrollY,left:t.left+window.scrollY}}function St(e){return e?e.getBoundingClientRect():{bottom:0,height:0,left:0,right:0,top:0,width:0,x:0,y:0}}function ss(e,t){let r=t?.parentNode;for(;r;){if(r===e)return!0;r=r?.parentNode}return!1}function So(e){let t=globalThis.getComputedStyle(e),r=t.transform||t.mozTransform;if(r==="none"||r===void 0)return{x:0,y:0,z:0};let o=r.includes("3d")?"3d":"2d",n=r.match(/matrix.*\((.+)\)/)[1].split(", ");if(o==="2d")return{x:n[4],y:n[5],z:0};if(o==="3d")return{x:n[12],y:n[13],z:n[14]}}function cl(e){return typeof Node=="object"?e instanceof Node:e&&typeof e=="object"&&typeof e.nodeType=="number"&&typeof e.nodeName=="string"}var we=()=>`_${Math.random().toString(36).slice(2,9)}`;function $p(e){var t=e.getBoundingClientRect();return t.top>=0&&t.bottom<=window.innerHeight}var ll=(e,t,r)=>Math.min(Math.max(e,t),r);var xi=new Set,Ft=e=>{xi.add(e),xi.size===1&&setTimeout(()=>{xi.forEach(t=>{t()}),xi.clear()})};var ul="UNTYPED",Lp="STRING",Dp="NUMBER",Fp="OBJECT",Bp="FUNCTION",Ci="ARRAY",Vp="BOOLEAN",Wp="ELEMENT",jp="HTMLELEMENT",zp="NODELIST";var Ie={isString:e=>Object.prototype.toString.call(e)==="[object String]",isNumber:e=>Object.prototype.toString.call(e)==="[object Number]"&&Number.isFinite(e),isObject:e=>Object.prototype.toString.call(e)==="[object Object]",isFunction:e=>Object.prototype.toString.call(e)==="[object Function]",isArray:e=>Object.prototype.toString.call(e)==="[object Array]",isBoolean:e=>Object.prototype.toString.call(e)==="[object Boolean]",isElement:e=>e instanceof Element||e instanceof Document,isHTMLElement:e=>e instanceof HTMLElement,isSet:e=>e instanceof Set,isMap:e=>e instanceof Map,isNodeList:e=>Object.prototype.isPrototypeOf.call(NodeList.prototype,e)},is=e=>{switch(e){case String:case Lp:return"String";case Number:case Dp:return"Number";case Object:case Fp:return"Object";case Function:case Bp:return"Function";case Array:case Ci:return"Array";case Boolean:case Vp:return"Boolean";case Element:case Wp:return"Element";case HTMLElement:case jp:return"HTMLElement";case NodeList:case zp:return"NodeList";case Set:case"SET":return"Set";case Map:case"MAP":return"Map";case"ANY":return"ANY";default:return ul}},Re=(e,t)=>{switch(e){case String:case Lp:return Ie.isString(t);case Number:case Dp:return Ie.isNumber(t);case Object:case Fp:return Ie.isObject(t);case Function:case Bp:return Ie.isFunction(t);case Array:case Ci:return Ie.isArray(t);case Boolean:case Vp:return Ie.isBoolean(t);case Element:case Wp:return Ie.isElement(t);case HTMLElement:case jp:return Ie.isHTMLElement(t);case NodeList:case zp:return Ie.isNodeList(t);case Set:case"SET":return Ie.isSet(t);case Map:case"MAP":return Ie.isMap(t);case"ANY":return!0;default:return!0}};var $C=(e,t)=>e.size===t.size&&[...e.keys()].every(r=>e.get(r)===t.get(r)),LC=(e,t)=>e.size===t.size&&[...e].every(r=>t.has(r)),DC=(e,t)=>{if(e.length!==t.length)return!1;for(let[r,o]of e.entries())if(!as(o,t[r]))return!1;return!0},as=(e,t,r=new WeakMap)=>{if(e===t)return!0;if(e==null||t==null)return!1;let o=typeof e;if(o!==typeof t||o!=="object")return!1;if(r.has(e)&&r.get(e)?.has(t))return!0;r.has(e)||r.set(e,new WeakSet),r.get(e)?.add(t);let s=Array.isArray(e),i=Array.isArray(t);if(s!==i)return!1;if(s){if(e.length!==t.length)return!1;for(let[l,p]of e.entries())if(!as(p,t[l],r))return!1;return!0}if(e instanceof Date&&t instanceof Date)return e.getTime()===t.getTime();if(e instanceof Date||t instanceof Date)return!1;if(e instanceof RegExp&&t instanceof RegExp)return e.source===t.source&&e.flags===t.flags;if(e instanceof RegExp||t instanceof RegExp)return!1;if(e instanceof Map&&t instanceof Map){if(e.size!==t.size)return!1;for(let[l,p]of e)if(!t.has(l)||!as(p,t.get(l),r))return!1;return!0}if(e instanceof Map||t instanceof Map)return!1;if(e instanceof Set&&t instanceof Set){if(e.size!==t.size)return!1;for(let l of e)if(!t.has(l))return!1;return!0}if(e instanceof Set||t instanceof Set)return!1;let a=Object.keys(e),c=Object.keys(t);if(a.length!==c.length)return!1;for(let l of a)if(!Object.prototype.hasOwnProperty.call(t,l)||!as(e[l],t[l],r))return!1;return!0},Ei=(e,t,r)=>{switch(e){case"ANY":return as(t,r);case Ci:case Array:return DC(t,r);case"SET":case Set:return LC(t,r);case"MAP":case Map:return $C(t,r);default:return t===r}};var wi="UPDATE";var Pe={};To(Pe,{extractKeysFromArray:()=>hl,extractkeyFromProp:()=>Lr,getCurrentDependencies:()=>pl,getFirstCurrentDependencies:()=>ml,initializeCurrentDependencies:()=>cs,setCurrentDependencies:()=>Mi});var Go=[],Ii=!1,cs=()=>{Ii=!0,Go.length=0},pl=()=>(Ii=!1,[...Go]),ml=()=>(Ii=!1,[...Go]?.[0]??"missing_prop"),Mi=e=>{!Ii||!e||Go.includes(e)||(Go=[...Go,e])},Lr=e=>Re(String,e)?e:(cs(),e(),ml()),hl=e=>e.map(t=>Re(String,t)?t:(cs(),t(),ml()));var ls=new Map,Hp=e=>{ls.delete(e)},qo=({watcherByProp:e,prop:t,newValue:r,oldValue:o,validationValue:n,instanceId:s})=>{let i=e?.get(t);if(!(!i||i.size===0)){for(let{fn:a,wait:c}of i.values())if(c||a(r,o,n),s&&c){let l=ls.get(s)??new Map,p=!l.has(t),h=p?[]:l.get(t)?.callbacks??[],f=l.get(t);l.set(t,{newValue:r,oldValue:f?.oldValue??o,validationValue:n,callbacks:[...new Set([...h,a])]}),ls.set(s,l),p&&Ft(()=>{let d=ls.get(s),v=d?.get(t);if(v&&v.newValue!==void 0&&v.newValue!==null)for(let y of v.callbacks)y(v.newValue,v.oldValue,v.validationValue);d?.delete(t),d?.size===0&&ls.delete(s)})}}},Up=async({watcherByProp:e,prop:t,newValue:r,oldValue:o,validationValue:n})=>{let s=e?.get(t);if(!(!s||s.size===0))for(let{fn:i}of s.values())await i(r,o,n)};var FC="padding: 10px;",ze=()=>FC;var dl="store_shallow_copy",Gp=dl;var Ge=new Map,se=e=>{if(Gp===dl){let t=Ge.get(e);return t?{...t}:void 0}return Ge.get(e)},Le=(e,t)=>{Ge.set(e,t)},qp=e=>{Ge.delete(e)};var fl=(e,t)=>{console.warn(`%c MobStore supports an object with a depth of up to 2 levels, set 'Any' type to use obj as value, the input object has ${e} level`,t)};var Jp=(e,t)=>{console.warn(`%c MobStore, trying to execute set() method: store.${e} not exist`,t)},Yp=(e,t,r)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: setProp methods doesn't allow objects as value, ${JSON.stringify(t)} is an Object, use 'Any' type for custom object`,r)},Xp=(e,t)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: '${JSON.stringify(e)}' is an objects`,t)},Kp=(e,t,r,o)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: ${t} is not a ${is(r)}`,o)},Qp=(e,t,r)=>{console.warn(`%c trying to execute setObj method on '${e}' propierties: setObj methods allow only objects as value, ${t} is not an Object`,r)},Zp=(e,t)=>{console.warn(`%c trying to execute setObj data method on '${e}' propierties: store propierties '${e}' is not an object`,t)},em=(e,t,r)=>{console.warn(`%c trying to execute setObj data method: one of these keys '${e}' not exist in store.${t}`,r)},tm=(e,t,r)=>{console.warn(`%c trying to execute setObj data method on '${e}' propierties: '${JSON.stringify(t)}' have a depth > 1, nested obj is not allowed, use 'any' type for deep nested object`,r)},rm=(e,t,r,o,n)=>{console.warn(`%c trying to execute setObj data method on ${e}.${t} propierties: ${r} is not a ${is(o)}`,n)},om=(e,t)=>{console.warn(`%c trying to execute get data method: store.${e} not exist`,t)},gl=(e,t)=>{console.warn(`%c trying to execute set data method: store.${e} not exist`,t)},nm=(e,t)=>{console.warn(`%c one of the keys [${e}] is already used as a computed target, or there is a circular dependencies`,t)},sm=(e,t)=>{console.warn(`%c MobStore error: the property ${e} to watch doesn't exist in store`,t)},im=(e,t)=>{console.warn(`%c Validation Object error: validation function return undefined or have you used Object instead '${t}' ?`,e)};var am=(e,t)=>{console.warn(`%c MobStore error: the property ${e} should readOnly with proxi, maybe is a mobJs props.`,t)},bl=(e,t)=>{console.warn(`%c MobStore error: the property ${e} fail validation during definition.`,t)};var us=e=>{if(!Ie.isObject(e))return 0;let t=Object.values(e);return t.length===0?1:Math.max(...t.map(r=>us(r)))+1},cm=(e,t=!0)=>Object.fromEntries(Object.entries(e).map(([r,o])=>{if(Ie.isObject(o)&&t)return[r,cm(o,!1)];if(Ie.isFunction(o)){let n=o();if(Ie.isObject(n)&&"value"in n&&["validate","type","skipEqual","strict"].some(s=>s in n))return[r,n.value]}return[r,o]})),lm=(e,t,r,o=!0)=>Object.fromEntries(Object.entries(e).map(([n,s])=>{if(Ie.isObject(s)&&o)return[n,lm(s,t,r,!1)];if(Ie.isFunction(s)){let i=s();if(Ie.isObject(i)&&"value"in i&&t in i){let a=Ie.isString(i[t])?i[t].toUpperCase():i[t];return[n,a]}}return[n,r]})),um=({data:e,depth:t,logStyle:r})=>t>2?(fl(t,r),{}):cm(e),Jo=({data:e,prop:t,depth:r,logStyle:o,fallback:n})=>r>2?(fl(r,o),{}):lm(e,t,n),pm=({value:e})=>Re(Map,e)?new Map(e):Re(Set,e)?new Set(e):Re(Object,e)?{...e}:Re(Array,e)?[...e]:e,Dr=({instanceId:e,prop:t})=>{let r=se(e);if(!r)return!1;let{callBackComputed:o}=r,n=[...o].some(({prop:s})=>t===s);return n&&console.warn(`${t} is used as computed target, set and multiple computed on same prop is blocked.`),n};var BC=({instanceId:e,prop:t,val:r,fireCallback:o=!0,useStrict:n=!0,initalizeStep:s=!1})=>{let i=se(e);if(!i)return;let{type:a,fnTransformation:c,store:l,fnValidate:p,strict:h,validationStatusObject:f,skipEqual:d,watcherByProp:v,bindInstanceBy:y}=i,T=ze(),S=a[t]==="ANY";if(Ie.isObject(r)&&!S){Yp(t,r,T);return}if(Ie.isObject(l[t])&&!S){Xp(t,T);return}let _=l[t],w=c[t]?.(r,_)??r;if(!Re(a[t],w)){Kp(t,w,a[t],T);return}let E=p[t]?.(w,_);!E&&s&&bl(t,T),!(h[t]&&!E&&n||(f[t]=E,(d[t]?Ei(a[t],_,w):!1)&&!s))&&(l[t]=w,Le(e,{...i,store:l,validationStatusObject:f}),o&&!s&&(qo({watcherByProp:v,prop:t,newValue:w,oldValue:_,validationValue:f[t],instanceId:e}),hr({instanceId:e,prop:t}),y.forEach(P=>{hr({instanceId:P,prop:t})})))},VC=({instanceId:e,prop:t,val:r,fireCallback:o=!0,useStrict:n=!0,initalizeStep:s=!1})=>{let i=se(e);if(!i)return;let{store:a,type:c,strict:l,fnTransformation:p,fnValidate:h,validationStatusObject:f,skipEqual:d,watcherByProp:v,bindInstanceBy:y}=i,T=ze();if(!Ie.isObject(r)){Qp(t,r,T);return}if(!Ie.isObject(a[t])){Zp(t,T);return}let S=Object.keys(r),_=Object.keys(a[t]);if(!S.every(k=>_.includes(k))){em(S,t,T);return}let x=Object.fromEntries(Object.entries(r).map(k=>{let[L,C]=k,M=a[t][L];return!s&&Ei(c[t][L],C,M)?[L,C]:[L,p[t][L]?.(C,M)??C]}));if(!Object.entries(x).map(k=>{let[L,C]=k,M=Re(c[t][L],C);return M||rm(t,L,C,c[t][L],T),M}).every(k=>k===!0))return;let I=Object.entries(x).map(k=>{let[L,C]=k,M=a[t][L];return l[t][L]&&n?{strictCheck:h[t][L]?.(C,M),item:k}:{strictCheck:!0,item:k}}).filter(({strictCheck:k})=>k===!0);if(I.length===0)return;let A=Object.fromEntries(I.map(({item:k})=>k).map(([k,L])=>[k,L]));Object.entries(A).forEach(k=>{let[L,C]=k,M=a[t][L],B=h[t][L]?.(C,M);!B&&s&&bl(t,T),B===void 0&&im(T,"ANY"),f[t][L]=B});let $=a[t],N={...a[t],...A},R=Object.keys(A).every(k=>d[t][k]===!0),O=!0;for(let[k,L]of Object.entries(A)){let C=c[t][k]==="ANY";us(L)>1&&!C&&(tm(t,x,T),f[t][k]=!1,O=!1)}if(!O){Le(e,{...i,validationStatusObject:f});return}R&&Object.entries(N).every(([k,L])=>Ei(c[t][k],$[k],L))&&!s||(a[t]=N,Le(e,{...i,store:a,validationStatusObject:f}),o&&!s&&(qo({watcherByProp:v,prop:t,newValue:a[t],oldValue:$,validationValue:f[t],instanceId:e}),hr({instanceId:e,prop:t}),y.forEach(k=>{hr({instanceId:k,prop:t})})))},dr=({instanceId:e,prop:t,value:r,fireCallback:o=!0,clone:n=!1,useStrict:s=!0,action:i,initalizeStep:a=!1})=>{let c=se(e);if(!c)return;let{store:l,type:p}=c;if(!l)return;let h=ze();if(!(t in l)){Jp(t,h);return}let f=n?pm({value:l[t]}):l[t],d=i===wi?r(f):r,v=p[t]==="ANY";if(Ie.isObject(f)&&!v){VC({instanceId:e,prop:t,val:d,fireCallback:o,useStrict:s,initalizeStep:a});return}BC({instanceId:e,prop:t,val:d,fireCallback:o,useStrict:s,initalizeStep:a})},mm=({instanceId:e,prop:t,value:r})=>{let o=se(e);if(!o)return;let{store:n,watcherByProp:s}=o;if(!(t in n))return;let i=n[t];n[t]=r,Le(e,{...o,store:n}),qo({watcherByProp:s,prop:t,newValue:r,oldValue:i,validationValue:!0,instanceId:e})},hm=({store:e,bindInstance:t})=>t.reduce((r,o)=>{let n=se(o);if(!n)return r;let{store:s}=n;return{...r,...s}},e),WC=e=>{let t=se(e);if(!t)return;let{computedPropsQueque:r,callBackComputed:o,store:n,bindInstance:s}=t,i=[...o??[]].filter(({keys:l})=>[...r].find(p=>l.includes(p))),a=hm({store:n,bindInstance:s}),c=i.map(({prop:l,keys:p,fn:h})=>{let f=Object.fromEntries(p.map(d=>[d,a[d]]));return{prop:l,value:h(f)}});Le(e,{...t,computedPropsQueque:new Set,computedRunning:!1}),c.forEach(({prop:l,value:p})=>{dr({instanceId:e,prop:l,value:p,action:"SET"})})},hr=({instanceId:e,prop:t})=>{let r=se(e);if(!r)return;let{callBackComputed:o,computedPropsQueque:n,computedRunning:s}=r;if(!(!o||o.size===0)&&(n.add(t),Le(e,{...r,computedPropsQueque:n}),!s)){let i=se(e);if(!i)return;Le(e,{...i,computedRunning:!0}),Ft(()=>WC(e))}},jC=({instanceId:e,prop:t,keys:r,fn:o})=>{let n=se(e);if(!n)return;let{callBackComputed:s}=n,i=[...s].reduce((a,{prop:c,keys:l})=>l.includes(t)&&r.includes(c)&&!a,!1);if(r.includes(t)||i){nm(r,ze());return}s.add({prop:t,keys:r,fn:o}),Le(e,{...n,callBackComputed:s})},zC=({instanceId:e,prop:t,keys:r,callback:o})=>{let n=se(e);if(!n)return;let{store:s,bindInstance:i}=n,a=hm({store:s,bindInstance:i}),c=Object.fromEntries(r.map(p=>{if(p in a)return[p,a[p]]}).filter(p=>p!==void 0)),l=o(c);dr({instanceId:e,prop:t,value:l,fireCallback:!1,clone:!1,action:"SET"})},dm=({instanceId:e,prop:t,keys:r,callback:o})=>{if(Dr({instanceId:e,prop:t}))return;let s=r.length===0?(cs(),o({}),pl()):r;zC({instanceId:e,prop:t,keys:s,callback:o}),jC({instanceId:e,prop:t,keys:s,fn:o})};var fm=e=>{let{store:t}=e,r=Object.entries(t).reduce((o,n)=>{let[s,i]=n;return Ie.isObject(i)?{...o,[s]:{}}:o},{});return{...e,validationStatusObject:r}},gm=(e,t)=>{let{store:r}=t;Object.entries(r).forEach(o=>{let[n,s]=o;dr({instanceId:e,prop:n,value:s,fireCallback:!1,useStrict:!1,action:"SET",initalizeStep:!0})})};var HC=({state:e,prop:t,callback:r,wait:o})=>{let{store:n,watcherByProp:s,watcherMetadata:i}=e,a=ze();if(!n)return{state:void 0,unsubscribeId:""};if(!(t in n))return sm(t,a),{state:void 0,unsubscribeId:""};let c=we();return s.has(t)||s.set(t,new Map),s.get(t)?.set(c,{fn:r,wait:o}),i.set(c,t),{state:{...e,watcherByProp:s,watcherMetadata:i},unsubscribeId:c}},UC=({instanceId:e,unsubscribeId:t})=>{let r=se(e);if(!r)return;let{watcherByProp:o,watcherMetadata:n}=r;if(!o||!n)return;let s=n.get(t);s&&(o.get(s)?.delete(t),n.delete(t),o.get(s)?.size===0&&o.delete(s),Le(e,{...r,watcherByProp:o,watcherMetadata:n}))},bm=({instanceId:e,prop:t,callback:r,wait:o})=>{let n=se(e);if(!n)return()=>{};let{state:s,unsubscribeId:i}=HC({state:n,prop:t,callback:r,wait:o});return s?(Le(e,s),()=>{UC({instanceId:e,unsubscribeId:i})}):()=>{}},vm=({instanceId:e,prop:t,callback:r,wait:o})=>{let n=se(e);if(!n)return()=>{};let{bindInstance:s,unsubscribeBindInstance:i}=n;if(!s||s.length===0)return bm({instanceId:e,prop:t,callback:r,wait:o});let a=[e,...s].find(p=>{let h=se(p)?.store;return h&&t in h})??"",c=bm({instanceId:a,prop:t,callback:r,wait:o}),l=se(e);return l?(Le(e,{...l,unsubscribeBindInstance:[...i,c]}),()=>{c();let p=se(e);p&&Le(e,{...p,unsubscribeBindInstance:p.unsubscribeBindInstance.filter(h=>h!==c)})}):()=>{}};var ym=e=>{let t=us(e);return{watcherByProp:new Map,watcherMetadata:new Map,callBackComputed:new Set,computedPropsQueque:new Set,validationStatusObject:{},dataDepth:t,computedRunning:!1,store:um({data:e,depth:t,logStyle:ze()}),type:Jo({data:e,prop:"type",depth:t,logStyle:ze(),fallback:ul}),fnTransformation:Jo({data:e,prop:"transform",depth:t,logStyle:ze(),fallback:r=>r}),fnValidate:Jo({data:e,prop:"validate",depth:t,logStyle:ze(),fallback:()=>!0}),strict:Jo({data:e,prop:"strict",depth:t,logStyle:ze(),fallback:!1}),skipEqual:Jo({data:e,prop:"skipEqual",depth:t,logStyle:ze(),fallback:!0}),proxiObject:void 0,bindInstance:[],bindInstanceBy:[],unsubscribeBindInstance:[],proxiReadOnlyProp:new Set}};var Tm=e=>{let t=se(e);if(!t)return{};let{store:r}=t;return r??{}},Sm=e=>{let t=se(e);if(!t)return{};let{bindInstance:r}=t;return!r||r.length===0?Tm(e):Object.fromEntries([...r,e].flatMap(o=>Object.entries(Tm(o))))},_m=({instanceId:e,prop:t})=>{let r=se(e);if(!r)return;let o=r?.store;if(o&&t in o)return o[t];om(t,ze())},xm=({instanceId:e,prop:t})=>{let r=se(e);if(!r)return;let{bindInstance:o}=r;if(!o||o.length===0)return _m({instanceId:e,prop:t});let n=[e,...o].find(s=>{let i=Ge.get(s)?.store;return i&&t in i})??"";return _m({instanceId:n,prop:t})};var Cm=({instanceId:e,prop:t})=>{let r=se(e);if(!r)return;let{store:o,watcherByProp:n,validationStatusObject:s,bindInstanceBy:i}=r;o&&(t in o?(qo({watcherByProp:n,prop:t,newValue:o[t],oldValue:o[t],validationValue:s[t],instanceId:e}),hr({instanceId:e,prop:t}),i.forEach(a=>{hr({instanceId:a,prop:t})})):gl(t,ze()))},ki=({instanceId:e,prop:t})=>{let r=se(e);if(!r)return;let{bindInstance:o}=r;if(!o||o.length===0){Cm({instanceId:e,prop:t});return}let n=[e,...o].find(s=>{let i=Ge.get(s)?.store;return i&&t in i})??"";Cm({instanceId:n,prop:t})},Em=async({instanceId:e,prop:t})=>{let r=se(e);if(!r)return new Promise(a=>a({success:!1}));let{store:o,watcherByProp:n,validationStatusObject:s,bindInstanceBy:i}=r;return o?t in o?(await Up({watcherByProp:n,prop:t,newValue:o[t],oldValue:o[t],validationValue:s[t]}),hr({instanceId:e,prop:t}),i.forEach(a=>{hr({instanceId:a,prop:t})}),{success:!0}):(gl(t,ze()),{success:!1}):new Promise(a=>a({success:!1}))},wm=async({instanceId:e,prop:t})=>{let r=se(e);if(!r)return new Promise(s=>s(""));let{bindInstance:o}=r;if(!o||o.length===0)return Em({instanceId:e,prop:t});let n=[e,...o].find(s=>{let i=Ge.get(s)?.store;return i&&t in i})??"";return Em({instanceId:n,prop:t})};var Im=({instanceId:e})=>{let t=se(e);if(!t)return;let{validationStatusObject:r}=t;return r},Mm=({instanceId:e})=>{let t=se(e);if(!t)return;let{store:r}=t;console.log(r)},km=({instanceId:e})=>{let t=se(e);if(!t)return;let{validationStatusObject:r}=t;console.log(r)},Rm=({instanceId:e})=>{let t=se(e);console.log(t)};var GC=e=>!(e==null||!Re(Object,e)||Re(Map,e)||Re(Set,e)||Re(Function,e)),qC=e=>{let t=ze();return new Proxy({},{set(r,o,n){let s=Ge.get(e);if(!s||!(o in s.store))return!1;let i=Dr({instanceId:e,prop:o}),a=s.proxiReadOnlyProp.has(o);return a&&am(o,t),i||a?!1:(dr({instanceId:e,prop:o,value:n,fireCallback:!0,clone:!1,action:"SET"}),!0)},get(r,o){if(!Ge.has(e))return;let n=Ge.get(e);if(!n)return;let s;if(o in n.store&&(s=n.store[o],Mi(o)),!(o in n.store))for(let i of n.bindInstance){let a=Ge.get(i);if(a&&o in a.store){s=a.store[o],Mi(o);break}}if(s!==void 0)return GC(s)?Array.isArray(s)?Object.freeze([...s]):Object.freeze({...s}):s},has(r,o){if(!Ge.has(e))return!1;let n=Ge.get(e);if(!n)return!1;if(o in n.store)return!0;for(let s of n.bindInstance){let i=Ge.get(s);if(i&&o in i.store)return!0}return!1}})},Nm=({instanceId:e})=>{let t=Ge.get(e);if(!t)return{};if(t.proxiObject)return t.proxiObject;let r=qC(e);return Le(e,{...t,proxiObject:r}),r};var JC=({selfId:e,bindId:t})=>{let r=se(t);if(!r)return;let{bindInstanceBy:o}=r,n=[...o,e];Le(t,{...r,bindInstanceBy:n})},Pm=({selfId:e,bindId:t})=>{let r=se(t);if(!r)return;let{bindInstanceBy:o}=r,n=o.filter(s=>s!==e);Le(t,{...r,bindInstanceBy:n})},YC=({bindStores:e,selfStore:t})=>{let o=[...Re(Array,e)?e.map(n=>n.get()):[e.get()],t.store];o.forEach((n,s)=>{o.forEach((i,a)=>{if(s<=a)return;let c=Object.keys(n).filter(l=>Object.keys(i).includes(l));c.length>0&&console.warn(`bindStore: prop conflict on following prop: '${c}', bind store key must be univoque'`)})})},Am=({value:e,instanceId:t})=>{let r=se(t);if(!r)return;YC({bindStores:e,selfStore:r});let{bindInstance:o,bindInstanceBy:n}=r;if(!o)return;let s=Re(Array,e)?e.map(p=>p.getId()):[e.getId()],i=n.every(p=>!s.includes(p)),a=s.every(p=>!o.includes(p)),c=s.includes(t);if(!i||c){console.warn(`${t}, binding store failed, circular dependencies found.`);return}if(!a){console.warn(`${t}, binding store failed, store is binded more than once.`);return}let l=[...o,...s];Le(t,{...r,bindInstance:l}),s.forEach(p=>{JC({selfId:t,bindId:p})})};var Om=e=>{let t=Ge.get(e);if(!t)return;t.bindInstanceBy.length>0&&console.warn(`${e} store will be destroyed but is used by another store.`),t.callBackComputed.clear(),t.computedPropsQueque.clear(),t.watcherByProp.clear(),t.watcherMetadata.clear(),t.store={},t.proxiObject=null;let{unsubscribeBindInstance:r,bindInstance:o}=t;[...r].toReversed().forEach(n=>{n?.()}),t.unsubscribeBindInstance.length=0,o.forEach(n=>{Pm({selfId:e,bindId:n})}),Hp(e),qp(e)};var $m=({instanceId:e,values:t})=>{let r=se(e);if(!r)return;let{proxiReadOnlyProp:o}=r;t.forEach(n=>{o.add(n)}),Le(e,r)};var Ri=(e={})=>{let t=we(),r=ym(e),o=fm(r);return Le(t,o),gm(t,r),{getId:()=>t,bindStore:n=>{Am({value:n,instanceId:t})},get:()=>Sm(t),getProp:n=>xm({instanceId:t,prop:n}),set:(n,s,{emit:i=!0,usePropAsString:a=!1}={})=>{let c=a?n:Lr(n);Dr({instanceId:t,prop:c})||dr({instanceId:t,prop:c,value:s,fireCallback:i??!0,clone:!1,action:"SET"})},update:(n,s,{emit:i=!0,clone:a=!1,usePropAsString:c=!1}={})=>{let l=c?n:Lr(n);Dr({instanceId:t,prop:l})||dr({instanceId:t,prop:l,value:s,fireCallback:i??!0,clone:a,action:wi})},getProxi:()=>Nm({instanceId:t}),quickSetProp:(n,s)=>{Dr({instanceId:t,prop:n})||mm({instanceId:t,prop:n,value:s})},watch:(n,s,{wait:i=!1,immediate:a=!1}={})=>{let c=Lr(n),l=vm({instanceId:t,prop:c,callback:s,wait:i});return a&&Ft(()=>{ki({instanceId:t,prop:c})}),l},computed:(n,s,i=[],{usePropAsString:a=!1}={})=>{let c=a?n:Lr(n),l=hl(i);dm({instanceId:t,prop:c,keys:l,callback:s}),Ft(()=>{ki({instanceId:t,prop:c})})},emit:n=>{let s=Lr(n);ki({instanceId:t,prop:s})},emitAsync:async n=>{let s=Lr(n);return wm({instanceId:t,prop:s})},setProxiReadOnlyProp:n=>{$m({instanceId:t,values:n})},getValidation:()=>Im({instanceId:t}),debug:()=>{Rm({instanceId:t})},debugStore:()=>{Mm({instanceId:t})},debugValidate:()=>{km({instanceId:t})},destroy:()=>{Om(t)}}};var Ee=Ri({usePassive:()=>({value:!1,type:Boolean}),currentFrame:()=>({value:0,type:Number}),instantFps:()=>({value:60,type:Number}),requestFrame:()=>({value:()=>{},type:Function}),deferredNextTick:()=>({value:!0,type:Boolean}),throttle:()=>({value:60,type:Number}),spinYMaxValue:()=>({value:2.5,type:Number}),spinXMaxValue:()=>({value:2.5,type:Number})});var vl=!1,ps=new Map;function Lm(){if(ps.size===0){globalThis.removeEventListener("DOMContentLoaded",Lm),vl=!1;return}for(let e of ps.values())e();ps.clear()}function XC(){vl||(vl=!0,globalThis.addEventListener("DOMContentLoaded",Lm,{passive:!1}))}var KC=e=>{let t=we();return ps.set(t,e),typeof globalThis<"u"&&XC(),()=>ps.delete(t)},Dm=KC;function ms(e){let t=0,r=0,o=0,n=0;return"detail"in e&&(r=e.detail),"wheelDelta"in e&&(r=-e.wheelDelta/120),"wheelDeltaY"in e&&(r=-e.wheelDeltaY/120),"wheelDeltaX"in e&&(t=-e.wheelDeltaX/120),"axis"in e&&e.axis===e.HORIZONTAL_AXIS&&(t=r,r=0),o=t*10,n=r*10,"deltaY"in e&&(n=e.deltaY),"deltaX"in e&&(o=e.deltaX),(o||n)&&e.deltaMode&&(e.deltaMode==1?(o*=40,n*=40):(o*=800,n*=800)),o&&!t&&(t=o<1?-1:1),n&&!r&&(r=n<1?-1:1),{spinX:t,spinY:r,pixelX:o,pixelY:n}}function QC({type:e,event:t}){let r=t;return e==="touchend"&&"changedTouches"in t?r.changedTouches[0]:"touches"in r?r.touches[0]:t}function Br(e){let t=!1,r=new Map,{usePassive:o}=Ee.get();Ee.watch("usePassive",()=>{globalThis.removeEventListener(e,n),t=!1,s()});function n(a){if(r.size===0){globalThis.removeEventListener(e,n),t=!1;return}let c=a.type,{pageX:l,pageY:p,clientX:h,clientY:f}=QC({type:c,event:a}),d=a.target,v={page:{x:l,y:p},client:{x:h,y:f},target:d,type:c,preventDefault:()=>o?()=>{}:a.preventDefault(),spinX:0,spinY:0,pixelX:0,pixelY:0};if(c==="wheel"){let y=Ee.getProp("spinYMaxValue"),T=Ee.getProp("spinXMaxValue"),{spinX:S,spinY:_,pixelX:w,pixelY:x}=ms(a);v.spinX=ll(S,-T,T),v.spinY=ll(_,-y,y),v.pixelX=w,v.pixelY=x}for(let y of r.values())y(v)}function s(){t||(t=!0,o=Ee.getProp("usePassive"),globalThis.addEventListener(e,n,{passive:o}))}return a=>{if(globalThis.window===void 0)return()=>{};let c=we();return r.set(c,a),s(),()=>{r.delete(c),r.size===0&&t&&(globalThis.removeEventListener(e,n),t=!1)}}}var Fm=Br("click"),Bm=Br("mousedown"),Vm=Br("touchstart"),Wm=Br("mousemove"),jm=Br("touchmove"),zm=Br("mouseup"),Hm=Br("touchend"),Um=Br("wheel");var xo=0,Ze=new Map,ZC=(e=()=>{})=>{let t=we();return Ze.set(t,{fn:e,data:new Map,freeze:{active:!1,atFrame:0}}),{id:t,unsubscribe:()=>{if(Ze.has(t)){let r=Ze.get(t);if(!r)return;let o=r.data.size;if(Ze.delete(t),!o)return;xo=xo-o}}}},eE=({id:e,callBackObject:t,frame:r})=>{if(!Ze.has(e))return;let o=Math.max(r,0),{currentFrame:n}=Ee.get(),s=Ze.get(e);if(!s?.data)return;let{data:i}=s;i.has(o+n)||(i.set(o+n,t),xo++)},tE=e=>{Ze.has(e)&&Ze.delete(e)},rE=e=>{let t=Ze.get(e);if(!t||t.freeze.active)return;let{currentFrame:r}=Ee.get();t.freeze={active:!0,atFrame:r}},oE=({id:e,update:t=!0})=>{let r=Ze.get(e);if(!r||!r.freeze.active)return;if(!t){r.freeze={active:!1,atFrame:0};return}let{currentFrame:o}=Ee.get(),{atFrame:n}=r.freeze,s=[];for(let[i,a]of r.data){let c=i+o-n;r.data.delete(i),s.push({frame:c,value:a})}s.forEach(({frame:i,value:a})=>{r.data.set(i,a)}),s.length=0,r.freeze={active:!1,atFrame:0}},nE=e=>{let t=Ze.get(e);if(!t)return;let r=t.data.size;xo=xo-r,t.data.clear()},sE=e=>Ze.get(e)??{},iE=e=>{for(let t of Ze.values()){let{data:r,fn:o,freeze:n}=t,s=r.get(e);s&&!n.active&&(o(s),r.delete(e),xo--)}},aE=({id:e,obj:t={}})=>{if(!Ze.has(e))return;let r=Ze.get(e);if(!r)return;let{fn:o,freeze:n}=r;n.active||o(t)},cE=()=>xo,lE=e=>{for(let[t,r]of Ze){let{data:o,fn:n,freeze:s}=r,i=new Map;for(let[a,c]of o)i.set(a-e,c),o.delete(a);Ze.set(t,{data:i,fn:n,freeze:s.active?{...s,atFrame:s.atFrame-e}:s})}},Yo={add:ZC,get:sE,update:eE,remove:tE,clean:nE,fire:iE,fireObject:aE,getCacheCounter:cE,updateFrameId:lE,freeze:rE,unFreeze:oE};var yl=!1,Ni=new Map;function Gm(){if(Ni.size===0){globalThis.removeEventListener("visibilitychange",Gm),yl=!1;return}let e={visibilityState:document.visibilityState};for(let t of Ni.values())t(e)}function uE(){yl||(yl=!0,globalThis.addEventListener("visibilitychange",Gm,{passive:!1}))}var pE=e=>{let t=we();return Ni.set(t,e),typeof globalThis<"u"&&uE(),()=>Ni.delete(t)},Pi=pE;var hs=[],mE=(e=()=>{},t=100)=>{hs.push({cb:e,priority:t})},hE=({time:e,fps:t})=>{hs.length!==0&&(hs.sort((r,o)=>r.priority-o.priority),hs.forEach(({cb:r})=>r({time:e,fps:t})),hs.length=0)},xt={add:mE,fire:hE};var Tl=[],dE=e=>{Tl.push(e)},fE=()=>{let e=[...Tl];return Tl.length=0,e},Xo={add:dE,get:fE};var Vr=new Map,gE=e=>{let t=[...Vr.entries()];Vr.clear(),t.forEach(([r,o])=>{Vr.set(r-e,o)})},bE=({currentFrame:e,time:t,fps:r})=>{let o=Vr.get(e)??[];!o||o.length===0||(o.forEach(n=>n({time:t,fps:r})),Vr.delete(e))},vE=(e,t)=>{let o=Math.max(t,0)+Ee.getProp("currentFrame"),n=Vr.get(o)??[];Vr.set(o,[...n,e]),Ee.emit("requestFrame")},yE=()=>Vr.size,Ko={add:vE,fire:bE,updateKeys:gE,getAmountOfFrameToFire:yE};var _l="animationStop",qm=()=>{globalThis.addEventListener("unhandledrejection",e=>{e.reason===_l&&e.preventDefault()})};var Jm=!1,Ai=({force:e=!1,duration:t=30}={})=>{if(Jm&&!e){let{instantFps:r}=Ee.get();return new Promise(o=>{o({averageFPS:r})})}return new Promise(r=>{let o=[],s=0,i=0,a=0,c=0,l=0,p=h=>{if(h*=.001,c===0){c=h,requestAnimationFrame(p);return}let f=h-c;c=h;let d=Number.isFinite(1/f)?1/f:60,v=Math.max(d,60);a+=v-(o[s]||0),o[s++]=v,i=Math.max(i,s),s%=25;let y=Math.round(a/i);if(l++,l>=t){Ee.quickSetProp("instantFps",y),Jm=!0,r({averageFPS:y});return}requestAnimationFrame(p)};requestAnimationFrame(p)})};Ai();var El=1e7,Qm=2e3,wl=!1,Co=[],et=Dt(),Ym=0,Sl=Dt(),xl=0,Il=0,Cl=0,Qo=!1,Ct=60,Fi=Ct,Oi=0,$i=0,fr=0,Li=!1,Di=!1,TE=()=>Ct<Fi/5*3,_E=()=>Ct<Fi/5*4,SE=()=>{!TE()||Li||(Li=!0,setTimeout(()=>{Li=!1},4e3))},xE=()=>{!_E()||Di||(Di=!0,setTimeout(()=>{Di=!1},4e3))},CE=()=>{fr=0,Ee.quickSetProp("currentFrame",fr),Ko.updateKeys(El),Yo.updateFrameId(El)};Pi(({visibilityState:e})=>{Qo=e!=="visible"});qm();Ee.watch("requestFrame",()=>{Bi()});var Xm=()=>{fr>=El&&CE(),xt.fire({time:et,fps:Ct});let e=Xo.get();if(e.length>0)for(let t of e)Co.push(t);wl=!1,Co.length>0||Ko.getAmountOfFrameToFire()>0||Yo.getCacheCounter()>0||et<Qm?Bi():(Qo=!0,fr=0,Il=et,Ee.quickSetProp("currentFrame",fr))},Km=e=>{et=e,xl=et-Sl,Qo&&(Ym+=xl),Sl+=xl,et=Math.round(Sl-Ym);let t=Math.round(1e3/Ct);Cl=Math.abs(et-Il-t);let r=Cl>100?Cl:0;et=et-r,Il=et,Qo?($i=et,Oi=0,Ct=Ee.getProp("instantFps")):Oi++,et>$i+1e3&&!Qo&&(Ct=et>Qm?Math.round(Oi*1e3/(et-$i)):Ee.getProp("instantFps"),$i=et,Oi=0),Ct>Fi&&(Fi=Ct),SE(),xE(),Co.forEach(n=>n({time:et,fps:Ct})),Ko.fire({currentFrame:fr,time:et,fps:Ct}),Yo.fire(fr),fr++,Ee.quickSetProp("currentFrame",fr),Co.length=0,Qo=!1,Ee.getProp("deferredNextTick")?Ft(()=>Xm()):Xm()},Bi=()=>{wl||(typeof globalThis>"u"?setTimeout(()=>Km(Dt()),Op):requestAnimationFrame(Km),wl=!0)},Bt={add:s=>{Co.push(s),Bi()},addMultiple:(s=[])=>{Co=[...Co,...s],Bi()},getFps:()=>Ct,mustMakeSomething:()=>Li,shouldMakeSomething:()=>Di};var fs=!1,ds=new Map,Vi=()=>{},Ml=0,kl=0;function EE(){if(ds.size===0){globalThis.removeEventListener("resize",Vi),fs=!1;return}let e=globalThis.innerHeight,t=globalThis.innerWidth,r=e!==Ml,o=t!==kl;Ml=e,kl=t;let n={scrollY:globalThis.scrollY,windowsHeight:e,windowsWidth:t,documentHeight:document.documentElement.scrollHeight,verticalResize:r,horizontalResize:o};for(let s of ds.values())s(n)}function wE(){fs||(fs=!0,Ml=globalThis.window.innerHeight,kl=globalThis.window.innerWidth,Vi=_o(()=>EE()),globalThis.addEventListener("resize",Vi,{passive:!1}))}var IE=e=>{if(globalThis.window===void 0)return()=>{};let t=we();return ds.set(t,e),wE(),()=>{ds.delete(t),ds.size===0&&fs&&(globalThis.removeEventListener("resize",Vi),fs=!1)}},Zm=IE;var bs=!1,gs=new Map,ME="UP",th="DOWN",Rl=0,Zo=0,Nl=th,eh={scrollY:Zo,direction:Nl};function Pl(){if(gs.size===0){globalThis.removeEventListener("scroll",Pl),bs=!1;return}Rl=Zo,Zo=globalThis.scrollY,Nl=Zo>Rl?th:ME,eh={scrollY:Zo,direction:Nl};for(let e of gs.values())e(eh)}function kE(){bs||(bs=!0,Rl=globalThis.scrollY,Zo=globalThis.scrollY,window.addEventListener("scroll",Pl,{passive:!0}))}var RE=e=>{if(globalThis.window===void 0)return()=>{};let t=we();return gs.set(t,e),kE(),()=>{gs.delete(t),gs.size===0&&bs&&(globalThis.removeEventListener("scroll",Pl),bs=!1)}},gr=RE;var ys=!1,vs=new Map,Al=()=>{};function NE(e){if(vs.size===0){Al(),ys=!1;return}Bt.add(()=>{xt.add(()=>{for(let t of vs.values())t(e)},0)})}function PE(){ys||(ys=!0,Al=gr(NE))}var AE=e=>{if(globalThis.window===void 0)return()=>{};let t=we();return vs.set(t,e),PE(),()=>{vs.delete(t),vs.size===0&&ys&&(Al(),ys=!1)}},rh=AE;var _s=!1,Ts=new Map,oh=()=>{},Ol=()=>{};function OE(e){if(Ts.size===0){Ol(),_s=!1;return}Bt.add(()=>{xt.add(()=>{for(let t of Ts.values())t(e)},0)})}function $E(){_s||(_s=!0,oh=Si(e=>OE(e),Ee.getProp("throttle")),Ol=gr(oh))}var LE=e=>{if(globalThis.window===void 0)return()=>{};let t=we();return Ts.set(t,e),$E(),()=>{Ts.delete(t),Ts.size===0&&_s&&(Ol(),_s=!1)}},nh=LE;function sh(e){let t=()=>{},r=()=>{},o=()=>{},n=!1,s=new Map,i=!1;function a(){if(i=!1,s.size===0){r(),e==="START"&&t(),n=!1;return}Bt.add(()=>{xt.add(()=>{let p={scrollY:globalThis.scrollY};if(e==="END")for(let h of s.values())h(p)},0)})}function c(){n||(n=!0,o=_o(()=>a()),r=gr(o),e==="START"&&(t=gr(({scrollY:p})=>{let h={scrollY:p};if(!i){i=!0;for(let f of s.values())f(h)}})))}return p=>{if(globalThis.window===void 0)return()=>{};let h=we();return s.set(h,p),c(),()=>{s.delete(h),s.size===0&&n&&a()}}}var ih=sh("START"),ah=sh("END");function en(e){let t=!1,r=new Map;function o(i){if(r.size===0){globalThis.removeEventListener(e,o),t=!1;return}for(let a of r.values())a(i)}function n(){t||(t=!0,globalThis.addEventListener(e,o))}return i=>{if(globalThis.window===void 0)return()=>{};let a=we();return r.set(a,i),n(),()=>{r.delete(a),r.size===0&&t&&(globalThis.removeEventListener(e,o),t=!1)}}}var ch=en("pointerover"),lh=en("pointerdown"),uh=en("pointermove"),ph=en("pointerup"),mh=en("pointerout"),hh=en("pointerleave");var He=Symbol("LinkedList.setNext"),Ue=Symbol("LinkedList.setPrev"),Wi="after",$l="before",tn=class{#s=null;#o=null;constructor(t){this.data=t}get next(){return this.#s}[He](t){this.#s=t}get prev(){return this.#o}[Ue](t){this.#o=t}dispose(){this.data=null,this.#s=null,this.#o=null}},ji=class e{#s=null;#o=null;#i=0;#c=new WeakSet;addLast(t){let r=new tn(t);return this.#c.add(r),this.#s?(this.#o&&this.#o[He](r),r[Ue](this.#o),this.#o=r,this.#i++,this):(this.#s=r,this.#o=r,this.#i++,this)}addFirst(t){let r=new tn(t);return this.#c.add(r),this.#s?(r[He](this.#s),this.#s[Ue](r),this.#s=r,this.#i++,this):(this.#s=r,this.#o=r,this.#i++,this)}removeNode(t){return!t||!this.#c.has(t)?this:t===this.#s?this.removeFirst():t===this.#o?this.removeLast():(t.prev&&t.prev[He](t.next),t.next&&t.next[Ue](t.prev),t.dispose(),this.#i--,this)}removeFirst(){if(this.#s===null)return this;let t=this.#s;return this.#s=this.#s.next,this.#s&&this.#s[Ue](null),this.#s===null&&(this.#o=null),t.dispose(),this.#i--,this}removeLast(){if(this.#o===null)return this;let t=this.#o;return this.#o=this.#o.prev,this.#o&&this.#o[He](null),this.#o===null&&(this.#s=null),t.dispose(),this.#i--,this}insertAfter(t,r){if(!t||!this.#c.has(t))return this;let o=new tn(r);return this.#c.add(o),o[Ue](t),o[He](t.next),t.next&&t.next[Ue](o),t[He](o),t===this.#o&&(this.#o=o),this.#i++,this}insertBefore(t,r){if(!t||!this.#c.has(t))return this;let o=new tn(r);return this.#c.add(o),o[He](t),o[Ue](t.prev),t.prev&&t.prev[He](o),t[Ue](o),t===this.#s&&(this.#s=o),this.#i++,this}move(t,r,o=Wi){return!this.#c.has(t)||!this.#c.has(r)?this:t===r?this:o===Wi&&r.next===t?this:o===$l&&r.prev===t?this:(t.prev&&t.prev[He](t.next),t.next&&t.next[Ue](t.prev),t===this.#s&&(this.#s=t.next),t===this.#o&&(this.#o=t.prev),o==Wi&&(t[Ue](r),t[He](r.next),r.next&&r.next[Ue](t),r[He](t),r===this.#o&&(this.#o=t)),o==$l&&(t[Ue](r.prev),t[He](r),r.prev&&r.prev[He](t),r[Ue](t),r===this.#s&&(this.#s=t)),this)}moveAfter(t,r){return this.move(t,r,Wi)}moveBefore(t,r){return this.move(t,r,$l)}swap(t,r){if(!this.#c.has(t)||!this.#c.has(r))return this;if(t===r)return this;if(t.next===r)return this.moveAfter(t,r);if(r.next===t)return this.moveAfter(r,t);let o=t.prev,n=t.next,s=r.prev,i=r.next,a=t===this.#s,c=t===this.#o,l=r===this.#s,p=r===this.#o;return o&&o[He](n),n&&n[Ue](o),s&&s[He](i),i&&i[Ue](s),t[Ue](s),t[He](i),r[Ue](o),r[He](n),s&&s[He](t),i&&i[Ue](t),o&&o[He](r),n&&n[Ue](r),a?this.#s=r:l&&(this.#s=t),c?this.#o=r:p&&(this.#o=t),this}find(t){let r=this.#s,o;for(;r!==null;){if(t(r)){o=r;break}r=r.next}return o}filter(t){let r=this.#s,o=new e,n=0;for(;r!==null;)t(r,n)&&o.addLast(r.data),r=r.next,n++;return o}map(t){let r=this.#s,o=new e,n=0;for(;r!==null;)o.addLast(t(r,n)),r=r.next,n++;return o}*[Symbol.iterator](){let t=this.#s;for(;t;)yield t,t=t.next}traverse(t){let r=this.#s;for(;r!==null;)t(r),r=r.next;return this}async traverseAsync(t){let r=this.#s;for(;r!==null;)await t(r),r=r.next;return this}traverseReverse(t){let r=this.#o;for(;r!==null;)t(r),r=r.prev;return this}async traverseReverseAsync(t){let r=this.#o;for(;r!==null;)await t(r),r=r.prev;return this}execute(t){return t(this),this}async executeAsync(t){return await t(this),this}print(){let t=this.#s,r=[];for(;t!==null;)r.push(t.data),t=t.next;return console.log(r),this}clear(){let t=this.#s,r=[];for(;t!==null;)r.push(t),t=t.next;for(let o of r)o.dispose();return this.#s=null,this.#o=null,this.#i=0,r.length=0,this}reverse(){let t=this.#s;for(this.#s=this.#o,this.#o=t;t!==null;){let r=t.next,o=t.prev;t[He](o),t[Ue](r),t=r}return this}toArray(){let t=[],r=this.#s;for(;r!==null;)t.push(r.data),r=r.next;return t}toArrayReverse(){let t=[],r=this.#o;for(;r!==null;)t.push(r.data),r=r.prev;return t}get first(){return this.#s}get last(){return this.#o}get size(){return this.#i}};function DE(e){return Ri(e)}function FE(){return Ee.getProp("instantFps")}function BE(){return Bt.getFps()}function VE(){return Bt.mustMakeSomething()}function WE(){return Bt.shouldMakeSomething()}function jE(e=()=>{}){return Bt.add(e)}function zE(e=()=>{}){return xt.add(e)}function HE(e=()=>{}){return Xo.add(e)}function UE(e=()=>{},t=0){return Ko.add(e,t)}async function GE({force:e=!1,duration:t=30}={}){return await Ai({force:e,duration:t})}function qE(e=()=>{}){return Dm(e)}var JE=Yo;function YE(e=()=>{}){return Zm(e)}function XE(e=()=>{}){return Pi(e)}function KE(e=()=>{}){return Fm(e)}function QE(e=()=>{}){return Bm(e)}function ZE(e=()=>{}){return Vm(e)}function ew(e=()=>{}){return Wm(e)}function tw(e=()=>{}){return jm(e)}function rw(e=()=>{}){return zm(e)}function ow(e=()=>{}){return Hm(e)}function nw(e=()=>{}){return Um(e)}function sw(e=()=>{}){return rh(e)}function iw(e=()=>{}){return gr(e)}function aw(e=()=>{}){return nh(e)}function cw(e=()=>{}){return ih(e)}function lw(e=()=>{}){return ah(e)}function uw(e=()=>{}){return ch(e)}function pw(e=()=>{}){return lh(e)}function mw(e=()=>{}){return uh(e)}function hw(e=()=>{}){return ph(e)}function dw(e=()=>{}){return mh(e)}function fw(e=()=>{}){return hh(e)}var gw=Ee;function bw(){return new ji}var m={};To(m,{afterRouteChange:()=>vh,beforeRouteChange:()=>bh,componentMap:()=>j,createComponent:()=>Kd,eventDelegationMap:()=>Sn,getActiveParams:()=>_h,getActiveRoute:()=>Th,getChildrenIdByName:()=>zi,getComponentNameById:()=>Rh,getDebugMode:()=>Xd,getIdByInstanceName:()=>Yt,getNumberOfActiveInvalidate:()=>sb,getNumberOfActiveRepeater:()=>ib,getParentIdById:()=>Ss,getPropsFromParent:()=>wa,getRoot:()=>ya,getStateById:()=>Xt,getStateByName:()=>Kh,getTree:()=>Oh,inizializeApp:()=>nb,loadUrl:()=>ob,mainStore:()=>fe,onRouteLoading:()=>yh,removeAndDestroyById:()=>nt,setStateById:()=>gn,setStateByName:()=>Gd,staticProps:()=>Ia,tempDelegateEventMap:()=>ks,tick:()=>_r,updateStateByName:()=>Jd,useComponent:()=>aa,useMethodArrayByName:()=>Fh,useMethodByName:()=>Dh,watchById:()=>Et});var rn="activeRoute",on="activeParams",Eo="beforeRouteChange",nn="afterRouteChange",Jt="routeIsLoading",ut="parserAsync",Wr="default",dh="repeater",fh="invalidate",gh="render_component";var fe=u.createStore({[rn]:()=>({value:{route:"",templateName:""},type:"any",skipEqual:!1}),[on]:()=>({value:{},type:"any",skipEqual:!1}),[Eo]:()=>({value:{currentRoute:"",currentTemplate:"",nextRoute:"",nextTemplate:""},type:"any",skipEqual:!1}),[nn]:()=>({value:{currentRoute:"",currentTemplate:"",previousRoute:"",previousTemplate:""},type:"any",skipEqual:!1}),[Jt]:()=>({value:!1,type:Boolean}),[ut]:{element:()=>({value:document.createElement("div"),type:HTMLElement,skipEqual:!1}),persistent:()=>({value:!1,type:Boolean,skipEqual:!1}),source:()=>({value:Wr,type:String,skipEqual:!1})}}),sn=()=>{fe.set(ut,{element:document.createElement("div"),persistent:!1,source:Wr},{emit:!1})};var bh=e=>fe.watch(Eo,({currentRoute:t,currentTemplate:r,nextRoute:o,nextTemplate:n})=>{e({currentRoute:t,currentTemplate:r,nextRoute:o,nextTemplate:n})}),vh=e=>fe.watch(nn,({currentRoute:t,currentTemplate:r,previousRoute:o,previousTemplate:n})=>{e({currentRoute:t,currentTemplate:r,previousRoute:o,previousTemplate:n})}),yh=e=>fe.watch(Jt,t=>{e(t)}),Th=()=>{let{activeRoute:e}=fe.get();return e},_h=()=>{let{activeParams:e}=fe.get();return e};var j=new Map;var zi=({id:e="",componentName:t=""})=>{if(!e||e==="")return[];let o=j.get(e)?.child;return o?o?.[t]??[]:(console.warn("getChildIdById failed no id found"),[])};var Sh="",xh,Ch=({contentId:e=""})=>{Sh=e};var Eh=()=>{xh=document?.querySelector(Sh)},Hi=()=>xh;var jr=new Map,wh=({instanceName:e,id:t})=>{let r=jr.get(e)??[];jr.set(e,[...r,t])},Ih=({instanceName:e,id:t})=>{let r=jr.get(e);if(!r)return;let o=r.filter(n=>n!==t);o.length===0&&jr.delete(e),o.length>0&&jr.set(e,o)},Ll=({instanceName:e})=>jr.get(e)??[];var Mh=new WeakMap,kh=({element:e,id:t})=>{Mh.set(e,t)},an=({element:e})=>Mh.get(e);var Rh=(e="")=>{if(!e||e==="")return;let r=j.get(e)?.componentName;return r||(console.warn("getComponentNameById failed no id found"),null)},Nh=e=>{if(!e)return"name-not-found";let t=an({element:e})??"",r=j.get(t);return r?r.componentName:"name-not-found"},Yt=(e="")=>e?Ll({instanceName:e})?.[0]:void 0,Ph=(e="")=>e?Ll({instanceName:e})??[]:[];var Ui=(e="")=>{if(!e||e==="")return!1;let r=j.get(e)?.element;return r?!Hi()?.contains(r):!1};var Ah=({chunk:e})=>e.reduce((t,r)=>{let[o,n]=r,{child:s,componentName:i,instanceName:a}=n,c=new Set(Object.values(s??{}).flat()),l=[];for(let p of j.entries()){let[h]=p;c.has(h)&&l.push(p)}return[...t,{id:o,componentName:i,instanceName:a,children:Ah({chunk:l})}]},[]),Oh=()=>{let e=[...j.entries()].filter(([,t])=>!t?.parentId||t?.parentId==="");return Ah({chunk:e})};var $h=({id:e,name:t,fn:r})=>{if(!e||e==="")return;let o=j.get(e),n=o?.methods;if(n){if(t in n){console.warn(`Method ${t}, is already used by ${e}`);return}j.set(e,{...o,methods:{...n,[t]:r}})}},Lh=({id:e})=>{if(!e||e==="")return{};let r=j.get(e)?.methods;return r?Object.keys(r).length===0?(console.warn(`no methods available for ${e} component`),{}):r:{}},Dh=e=>{let t=Yt(e);if(!t||t==="")return;let r=Lh({id:t});if(Object.keys(r).length===0){console.warn(`no methods available for ${e} component`);return}return r},Fh=e=>Ph(e).flatMap(r=>{let o=Lh({id:r});return Object.keys(o).length===0?[]:[o]});var Bh=({currentChild:e,id:t="",componentName:r=""})=>{let o=e?.[r];return o?o.push(t):e[r]=[t],e},Vh=({currentChild:e,id:t="",componentName:r=""})=>{let o=e?.[r]??[];return{...e,[r]:o.filter(n=>n!==t)}},Wh=({props:e,store:t})=>{Object.entries(e).forEach(([r,o])=>{t.set(r,o)})},Gi=({prop:e,componentName:t,action:r})=>{console.warn(`Props: ${e}, component: ${t}, action: ${r}: Props can only be modified from outside the component."`)};var Ss=(e="")=>{if(!e||e==="")return;let r=j.get(e)?.parentId;if(r)return r},jh=({id:e=""})=>{if(!e||e==="")return;let t=j.get(e),r=t?.parentId,o=t?.componentName??"";if(!r)return;let n=j.get(r);if(!n)return;let{child:s}=n;s&&j.set(r,{...n,child:Bh({currentChild:s,id:e,componentName:o})})},qi=({element:e})=>{if(!e)return;let t=e.parentNode,r;for(;t&&!r;)r=an({element:t}),r||(t=t.parentNode);return r??""},Dl=({moduleScopeId:e,targetComponentId:t})=>{if(e===t)return!0;let r=j.get(e);if(!r)return!1;let o=r?.parentId??"";return Dl({moduleScopeId:o,targetComponentId:t})};var yt=new Map,xs=new Map;var zh=({componentId:e})=>{if(e)for(let[t,r]of yt){let{componentId:o}=r;o===e&&yt.delete(t)}};var tt=new Map;var Te=new Map;var Hh=({id:e})=>{if(tt.has(e)){let t=tt.get(e);if(!t)return;t.forEach(({invalidateId:r})=>{Te.has(r)&&Te.delete(r)}),tt.delete(e)}};var rt=new Map;var J=new Map;var Uh=({id:e})=>{if(rt.has(e)){let t=rt.get(e);if(!t)return;t.forEach(({repeatId:r})=>{J.has(r)&&J.delete(r)}),rt.delete(e)}};var Gh=({id:e,parentId:t,componentName:r})=>{if(!e||!t)return;let o=j.get(t);o?.child&&j.set(t,{...o,child:Vh({currentChild:o.child,id:e,componentName:r})})};var qh=({componentId:e,repeatId:t})=>{let r=J.get(t);if(!r)return;let{componentChildren:o}=r;J.set(t,{...r,componentChildren:[...o,e]})},Jh=({componentId:e,repeatId:t})=>{let r=J.get(t);if(!r)return;let{componentChildren:o}=r;J.set(t,{...r,componentChildren:o.filter(n=>n!==e)})},Cs=({repeatId:e})=>{let t=J.get(e);if(!t)return[];let{componentChildren:r}=t;return r},Yh=({repeatId:e})=>{let t=J.get(e);if(!t)return!1;let{componentChildren:r}=t;return r.length>0};var cn=new Set;var Xh=e=>{cn.delete(e)};var nt=({id:e=""})=>{if(!e||e==="")return;let t=j.get(e);if(!t)return;let{parentId:r,componentName:o,child:n,element:s,state:i,destroy:a,parentPropsWatcher:c,componentRepeatId:l,instanceName:p,persistent:h}=t;Object.values(n??{}).flat().forEach(f=>{nt({id:f})}),Gh({id:e,parentId:r,componentName:o}),a?.(),i.destroy(),c&&c.forEach(f=>f()),Hh({id:e}),Uh({id:e}),l&&l.length>0&&Jh({componentId:e,repeatId:l}),p&&p.length>0&&Ih({instanceName:p,id:e}),h||Xh(e),zh({componentId:e}),s?.removeCustomComponent?.(),s?.remove(),t.methods=null,t.refs=null,t.repeaterInnerWrap=null,t.element=null,t.currentRepeaterState=null,t.state=null,j.delete(e)};var Xt=(e="")=>!e||e===""?void 0:j.get(e)?.state?.get();var Kh=(e="")=>{let t=Yt(e);return t||console.warn(`component ${e}, not found`),Xt(t)};var ln=({id:e="",prop:t})=>{if(!e||e==="")return;let r=j.get(e);if(!r)return;let{freezedPros:o}=r;o&&j.set(e,{...r,freezedPros:[...new Set([...o,t])]})},zr=({id:e="",prop:t})=>{if(!e||e==="")return;let r=j.get(e);if(!r)return;let{freezedPros:o}=r;o&&j.set(e,{...r,freezedPros:o.filter(n=>n!==t)})},wo=({id:e="",prop:t})=>{if(!e||e==="")return!1;let o=j.get(e)?.freezedPros;return o?o.includes(t):!1};var Hr=new Map;var Qh=({repeatId:e,host:t})=>{let r=J.get(e);if(!r)return;let o=t.parentNode;r.initialRenderWithoutSync.forEach(n=>{o.append(n)}),J.set(e,{...r,element:o,initialRenderWithoutSync:[]}),Hr.set(e,t)};var Zh="data-mobjs",Io="componentid",Ji="bindtextid",Yi="bindobjectid";var un="staticprops",Xi="bindprops",ed="name",td="name",rd="slot",br="repeaterchild";var Ur="currentRepeaterValue",Gr="repeatPropBind",Ki="bindevents",Kt="weakbindevents",pn="bindeffect",od="parentid";var Qt="bindrefid",vr="bindrefname",Qi="invalidateid",Zi="mobjsrepeat";var Zt={current:{},index:-1},nd="QUEQUE_BINDPROPS",Fl="QUEQUE_REPEATER",Bl="QUEQUE_INVALIDATE";var mn=new Set,sd=!1,id=e=>{mn.add(e)},ad=e=>{mn.delete(e)},Vl=e=>{let t;for(let r of mn)if(e?.contains(r)&&r.getIsPlaceholder()){t=r;break}if(t)return mn.delete(t),t};var cd=({element:e})=>[...mn].filter(t=>e.contains(t)&&e!==t&&t.getIsPlaceholder?.()&&t?.getSlotPosition?.())??[],ld=()=>mn.size;var st=e=>{sd=e},Vt=()=>sd;var ud=()=>{customElements.define("mobjs-repeat",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){if(Vt())return;let{dataset:t}=this.shadowRoot?.host??{};if(t){let r=this.shadowRoot?.host,o=r?.getAttribute(Zi)??"";Qh({repeatId:o,host:r})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var qr=new Map;var pd=({invalidateId:e,host:t})=>{let r=Te.get(e);if(!r)return;let o=t.parentNode;Te.set(e,{...r,element:o}),qr.set(e,t)};var md=()=>{customElements.define("mobjs-invalidate",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:e}=this.shadowRoot?.host??{};if(e){let t=this.shadowRoot?.host,r=t.getAttribute(Qi)??"";pd({invalidateId:r,host:t})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var Jr=new Set,hd=e=>{Jr.add(e)},dd=()=>{Jr.clear()},fd=({element:e})=>[...Jr].find(t=>{let r=!t?.getSlotName?.()&&e.contains(t);return r&&Jr.delete(t),r}),gd=({name:e,element:t})=>[...Jr].find(r=>{let o=r?.getSlotName?.()===e&&t.contains(r);return o&&Jr.delete(r),o}),bd=()=>[...Jr],ea=()=>Jr.size;var vd=()=>{customElements.define("mobjs-slot",class extends HTMLElement{#s;constructor(){super(),this.attachShadow({mode:"open"}),this.#s="",this.isSlot=!0;let{dataset:e}=this.shadowRoot?.host??{};e&&(this.#s=this.shadowRoot?.host.getAttribute(td))}connectedCallback(){let e=this.shadowRoot?.host;e&&hd(e)}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}getSlotName(){return this.#s}})};var Wl=new Set,yd=e=>{Wl.add(e)},ta=()=>[...Wl],ra=e=>Wl.delete(e);var Td=e=>{Object.entries(e).forEach(([t,r])=>{let{connectedCallback:o,disconnectedCallback:n,adoptedCallback:s,attributeChangedCallback:i,style:a,attributeToObserve:c}=r.componentParams;customElements.define(t,class extends HTMLElement{#s;#o;#i;#c;#h;#l;#n;#u;#r;#e;#m;#a;#d;#f;#t;#g;#p;#x;#S;static get observedAttributes(){return c}constructor(){super(),this.attachShadow({mode:"open"}),this.active=!1,this.#o=u.getUnivoqueId(),this.#i={},this.#s=t,this.#c=!0,this.isUserComponent=!0,this.#r="",this.#e="";let l=this.shadowRoot?.host;if(!l)return;if(Vt()){yd(l);return}if(this.#a&&!this.active&&(this.style.visibility="hidden"),!this.shadowRoot)return;if(a){let f=document.createElement("style");f.textContent=a,this.shadowRoot.append(f)}let h=document.createElement("slot");this.shadowRoot.append(h)}getComponentName(){return this.#s}setId(l){this.#o=l}getId(){return this.#o}getParentId(){return this.#f}setParentId(l){this.#f=l}getIsPlaceholder(){return this.#c}getInstanceName(){return this.#h}getStaticPropsId(){return this.#l}getDynamicPropsid(){return this.#n}getBindEventsId(){return this.#u}getCurrentKey(){return this.#d}setDynamicPropsFromSlotId(l){this.#r=l}getDynamicPropsFromSlotId(){return this.#r}setPropsFromSlotId(l){this.#e=l}getPropsFromSlotId(){return this.#e}setRepeatValue(l){this.#m=l}getRepeatValue(){return this.#m}getSlotPosition(){return this.#a}getDelegateEventId(){return this.#g}getRepeaterPropBind(){return this.#p??void 0}setRepeaterPropBind(l){this.#p=l}getComponentRepeatId(){return this.#t}getBindRefId(){return this.#x}getBindRefName(){return this.#S}resetParams(){this.active=!1,this.#o="",this.#i={}}disablePlaceHolderState(){this.#c=!1}inizializeCustomComponent(l){this.active||(this.active=!0,this.#o=l.id,this.#i=l,this.#c=!1,o?.({context:this,params:this.#i}))}connectedCallback(){if(!Vt()&&this.#c){let p=this.shadowRoot?.host;p&&([this.#h,this.#l,this.#n,this.#d,this.#u,this.#m,this.#a,this.#f,this.#t,this.#g,this.#p,this.#x,this.#S]=[ed,un,Xi,"key",Ki,Ur,rd,od,br,Kt,Gr,Qt,vr].map(h=>p.getAttribute(h)??"")),id(p);return}}disconnectedCallback(){if(!this.shadowRoot)return;let l=this.shadowRoot?.host;ad(l),ra(l),this.active&&(n?.({context:this,params:this.#i}),this.resetParams())}removeCustomComponent(){!this.shadowRoot||!this.active||this.parentElement?.removeChild(this)}adoptedCallback(){!this.shadowRoot||!this.active||s?.({context:this,params:this.#i})}attributeChangedCallback(l,p,h){!this.shadowRoot||!this.active||i?.({name:l,oldValue:p,newValue:h,context:this,params:this.#i})}})})};var Et=(e="",t="",r=()=>{},{wait:o=!1}={})=>(!e||e==="")&&(!t||t==="")?void 0:j.get(e)?.state?.watch(t,r,{wait:o??!1});function Xr(){return new Promise(e=>u.useNextLoop(()=>e()))}var Mo=new Map,xd=()=>Mo.size===0,_d=1e3,Cd=e=>{if(Mo.size>=_d)return console.warn(`InvalidateTick: maximum queue size reached (${_d}). Likely an infinite watch loop. Queue force-cleared. `),Mo.clear(),()=>{};let t=u.getUnivoqueId();return Mo.set(t,e),()=>Mo.delete(t)},Sd=()=>Mo.size===0,wt=async({debug:e=!1,previousResolve:t}={})=>{if(await Xr(),e&&Mo.forEach(r=>{console.log(r)}),Sd()&&t){t();return}return new Promise(r=>{if(Sd()){r();return}wt({debug:e,previousResolve:t??r})})};var ko=new Map,Id=()=>ko.size===0,Ed=1e3,Md=e=>{if(ko.size>=Ed)return console.warn(`RepeaterTick: maximum queue size reached (${Ed}). Likely an infinite watch loop. Queue force-cleared. `),ko.clear(),()=>{};let t=u.getUnivoqueId();return ko.set(t,e),()=>ko.delete(t)},wd=()=>ko.size===0,It=async({debug:e=!1,previousResolve:t}={})=>{if(await Xr(),e&&ko.forEach(r=>{console.log(r)}),wd()&&t){t();return}return new Promise(r=>{if(wd()){r();return}It({debug:e,previousResolve:t??r})})};var dn=({id:e})=>{let t=tt.get(e);return t?t.flatMap(({invalidateId:r})=>Te.get(r)?.observed??[]):[]};var fn=({id:e})=>{let t=rt.get(e);return t?t.flatMap(({repeatId:r})=>{let o=J.get(r)?.observed;return o?[o]:[]}):[]};var oa=new Map,kd=(e,t)=>{oa.set(e,t)},na=new Map,Rd=({host:e,componentId:t,bindTextId:r})=>{na.set(e,{componentId:t,bindTextId:r})},Nd=e=>e.match(/(?<=\[).+?(?=])/g),Pd=e=>e.split("[")?.[0],vw=({previous:e,current:t})=>{let r=Nd(t);return r&&r?.length>0?r.reduce((n,s)=>n?.[s],e[Pd(t)]):e?.[t]},Ad=(e,t,...r)=>{let o=Xt(e),n=r.map(s=>s.split(".").reduce((a,c)=>vw({previous:a,current:c})??a,o));return t.raw.reduce((s,i,a)=>s+i+(n?.[a]??""),"")},Od=()=>{[...na].forEach(([e,{bindTextId:t}])=>{let r=e.parentElement;if(!r){oa.delete(t);return}let o=oa.get(t);o&&(oa.delete(t),yw({...o,element:r}),e?.removeCustomComponent?.(),e?.remove(),r=null)}),na.clear()},$d=()=>na.size,yw=({id:e,render:t,props:r,element:o})=>{let n=!1,s=new WeakRef(o),i=fn({id:e}),a=dn({id:e}),l=[...new Set([...r,...i,...a])].map(p=>{let f=p.split(".")?.[0],d=Nd(f),y=d&&d?.length>0?Pd(f):f;if(y)return Et(e,y,async()=>{await It(),await wt(),!n&&(n=!0,u.useNextLoop(()=>{u.useFrame(()=>{s.deref()&&!s.deref()?.isConnected&&(l.forEach(T=>{T&&T()}),l.length=0),s.deref()&&s.deref()?.isConnected&&(s.deref().textContent="",s.deref().insertAdjacentHTML("afterbegin",t())),n=!1})}))})})};var Ld=()=>{customElements.define("mobjs-bind-text",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:e}=this.shadowRoot?.host??{};if(e){let t=this.shadowRoot?.host??document.createElement("div"),r=t?.getAttribute(Io)??"",o=t?.getAttribute(Ji)??"";Rd({host:t,componentId:r,bindTextId:o})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var sa=new Map,Dd=(e,t)=>{sa.set(e,t)},jl=new Map,Fd=({host:e,componentId:t,bindObjectId:r})=>{jl.set(e,{componentId:t,bindObjectId:r})},Bd=e=>e.map(t=>"observe"in t?Pe.extractkeyFromProp(t.observe):(Pe.initializeCurrentDependencies(),"value"in t?t?.value():t(),Pe.getFirstCurrentDependencies())),Vd=(e,...t)=>e.raw.reduce((r,o,n)=>t?.[n]&&"value"in t[n]?r+o+(t?.[n]?.value?.()??""):r+o+(t?.[n]?.()??""),""),Wd=()=>{[...jl].forEach(([e,{bindObjectId:t}])=>{let r=e.parentElement;if(!r){sa.delete(t);return}let o=sa.get(t);o&&(sa.delete(t),Tw({...o,element:r}),e?.removeCustomComponent?.(),e?.remove(),r=null)}),jl.clear()},Tw=({id:e,keys:t,render:r,element:o})=>{let n=!1,s=new WeakRef(o),i=fn({id:e}),a=dn({id:e}),l=[...new Set([...t,...i,...a])].map(p=>Et(e,p,async()=>{await It(),await wt(),!n&&(n=!0,u.useNextLoop(()=>{u.useFrame(()=>{s.deref()&&!s.deref()?.isConnected&&(l.forEach(h=>{h&&h()}),l.length=0),s.deref()&&s.deref()?.isConnected&&(s.deref().textContent="",s.deref().insertAdjacentHTML("afterbegin",r())),n=!1})}))}))};var jd=()=>{customElements.define("mobjs-bind-object",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:e}=this.shadowRoot?.host??{};if(e){let t=this.shadowRoot?.host??document.createElement("div"),r=t?.getAttribute(Io)??"",o=t?.getAttribute(Yi)??"";Fd({host:t,componentId:r,bindObjectId:o})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var ia={},Ro=()=>ia,zd=new Set,Hd=()=>{ia=Object.fromEntries([...zd.values()].flatMap(e=>Object.entries(e))),console.log(`component loaded:${Object.keys(ia).length}`),Td(ia),vd(),md(),ud(),Ld(),jd()},aa=e=>{!e||e?.length===0||e.forEach(t=>{zd.add(t)})};var ca=({componentName:e,propName:t})=>(Ro()?.[e]?.componentParams?.exportState??[]).includes(t),Ud=({componentName:e})=>Ro()?.[e]?.componentParams?.exportState??[];var gn=(e="",t="",r,{emit:o=!0}={})=>{if((!e||e==="")&&(!t||t==="")&&!r||wo({id:e,prop:t}))return;let s=j.get(e),i=s?.state,a=s?.componentName??"";if(!ca({componentName:a,propName:t})){console.warn(`setStateById failed ${t} in: ${a} is not exportable, maybe a slot bind state that not exist here?`);return}if(!i){console.warn(`setStateById failed no id found on prop: ${t}`);return}i.set(t,r,{emit:o})};var Gd=(e="")=>{let t=Yt(e);return t||console.warn(`component ${e}, not found`),(r,o,{emit:n=!0}={})=>gn(t,r,o,{emit:n})};var qd=(e="",t="",r,{emit:o=!0,clone:n=!1}={})=>{if((!e||e==="")&&(!t||t==="")&&!r||wo({id:e,prop:t}))return;let i=j.get(e),a=i?.state,c=i?.componentName??"";if(!ca({componentName:c,propName:t})){console.warn(`updateStateById failed ${t} in: ${c} is not exportable, maybe a slot bind state that not exist here?`);return}if(!a){console.warn(`updateStateById failed no id found on prop: ${t}`);return}a.update(t,r,{emit:o,clone:n})};var Jd=(e="")=>{let t=Yt(e);return t||console.warn(`component ${e}, not found`),(r,o,{emit:n=!0,clone:s=!1}={})=>qd(t,r,o,{emit:n,clone:s})};var zl={scoped:!1,maxParseIteration:5e3,debug:!1},Yd=e=>{zl={...zl,...e}},Mt=()=>zl,Xd=()=>{let{debug:e}=Mt();return e},Kd=({tag:e="",component:t=()=>"",props:r={},state:o={},bindStore:n,scoped:s,connectedCallback:i=()=>{},disconnectedCallback:a=()=>{},adoptedCallback:c=()=>{},attributeToObserve:l=[],attributeChangedCallback:p=()=>{},style:h="",child:f=[]})=>(aa(f),{[e]:{componentFunction:t,componentParams:{exportState:Object.keys(r),scoped:s,state:{...r,...o},bindStore:n,connectedCallback:i,disconnectedCallback:a,adoptedCallback:c,attributeToObserve:l,attributeChangedCallback:p,style:h,child:f}}});var Qd=[],Zd="",ef="",tf=e=>{Qd=[...e]},bn=({hash:e=""})=>Qd.find(({hash:t})=>e===t),rf=({hash:e=""})=>{Zd=e},la=()=>Zd,of=({hash:e=""})=>{ef=e},nf=()=>ef;var sf=({id:e="",newElement:t=document.createElement("div")})=>{if(!e||e==="")return;let r=j.get(e);r&&(j.set(e,{...r,element:t}),kh({element:t,id:e}))},ua=({id:e=""})=>!e||e===""?void 0:j.get(e)?.element,af=({element:e})=>e?an({element:e}):"",Hl=({keyValue:e="",repeatId:t=""})=>e?.length===0?[]:Cs({repeatId:t}).flatMap(o=>{let n=j.get(o);if(!n)return[];let{element:s,key:i}=n;return`${i}`==`${e}`?[{element:s,id:o}]:[]});function*yr(e){if(e){yield e;for(let t of e.children)yield*yr(t)}}function _w(e){let t=[];for(let r of yr(e))r?.isUserComponent&&r?.getSlotPosition?.()&&t.push(r);return t}var cf=e=>{let t=[],r=e||document.body;for(let o of r.children)t=[...t,..._w(o)];return t};function Sw(e){let t=[];for(let r of yr(e))r?.isSlot&&r?.getSlotName?.()&&t.push(r);return t}var lf=e=>{let t=[],r=e||document.body;for(let o of r.children)t=[...t,...Sw(o)];return t};function xw(e,t){for(let r of yr(e))if(r?.isSlot&&r?.getSlotName?.()===t)return r;return null}var uf=(e,t)=>{let r=e||document.body;for(let o of r.children){let n=xw(o,t);if(n)return n}return null};function Cw(e){for(let t of yr(e))if(t?.isSlot&&!t?.getSlotName?.())return t;return null}var pf=e=>{let t=e||document.body;for(let r of t.children){let o=Cw(r);if(o)return o}return null};var Es=new Map,vn=e=>{let t=u.getUnivoqueId();return Es.set(t,e),t},mf=(e="")=>{if(!e)return Zt;let t=Es.get(e);return Es.delete(e),t??Zt};var g=(e,...t)=>e.reduce((r,o,n)=>r+o+(t[n]===void 0?"":t[n]),"").replaceAll(/>\s+</g,"><").trim();var pa=({components:e,current:t,index:r,observe:o,repeatId:n,key:s})=>{e.forEach(i=>{if(i.hasAttribute(br)){ra(i);return}i.setAttribute(Ur,vn({current:t,index:r})),i.setAttribute("key",`${s}`),i.setAttribute(Gr,`${o}`),i.setAttribute(br,`${n}`)})},Kr=({stringDOM:e,parent:t,position:r})=>{st(!0);let o=document.createRange().createContextualFragment(e);st(!1),o&&(r==="afterend"&&t.after(o),r==="beforebegin"&&t.before(o),r==="afterbegin"&&t.prepend(o),r==="beforeend"&&t.append(o))},ws=({elements:e,parent:t,position:r})=>{let o=new DocumentFragment;st(!0),e.forEach(n=>{n&&o.append(n)}),st(!1),r==="afterend"&&t.after(o),r==="beforebegin"&&t.before(o),r==="afterbegin"&&t.prepend(o),r==="beforeend"&&t.append(o)};var ww=({element:e,content:t})=>{let{debug:r}=Mt();if(e.parentNode){let o=document.createElement("template");o.innerHTML=t;let n=o.content.firstElementChild;return n?.disablePlaceHolderState?.(),n&&e.after(n),r&&e.insertAdjacentHTML("afterend",`<!--  ${e.tagName.toLowerCase()} --> `),n}},Iw=({element:e})=>{bd().forEach(r=>{r?.removeCustomComponent(),r?.remove()})},Mw=({element:e})=>{if(!!1&&ea()===0)return;let t=cf(e);t.length!==0&&[...t].forEach(r=>{let o=r?.getSlotPosition(),n=gd({name:o,element:e});n&&(n.parentNode?.insertBefore(r,n),n?.removeCustomComponent(),n?.remove())})},kw=({element:e,content:t})=>{let r=ww({element:e,content:t});if(r){let o=e.getId(),n=e?.getDelegateEventId(),s=e?.getBindRefId(),i=e?.getBindRefName(),a=fd({element:r});a&&(ws({parent:a,elements:[...e.childNodes],position:"afterend"}),a.remove()),a||ws({parent:r,elements:[...e.childNodes],position:"afterbegin"}),Mw({element:r}),Iw({element:r}),n&&n.length>0&&r.setAttribute(Kt,n),s&&s.length>0&&r.setAttribute(Qt,s),i&&i.length>0&&r.setAttribute(vr,i);let{debug:c}=Mt();c&&r.setAttribute(Zh,o??"")}return e.remove(),r},hf=({element:e,content:t})=>({newElement:kw({element:e,content:t})});var Ul=0,df=()=>{Ul+=1},Gl=()=>Ul,ff=()=>{Ul=0};var gf=({cb:e=()=>{},id:t})=>{if(!t)return;let r=j.get(t);r&&j.set(t,{...r,destroy:e})};var Is=new Map,bf=({id:e,cb:t=()=>{}})=>{Is.set(e,t)},ql=async({id:e,element:t})=>{let o=await Is.get(e)?.({element:t});gf({cb:o,id:e}),Is.delete(e)};var Jl=({id:e})=>{if(Hr.has(e)){let t=Hr.get(e);t?.removeCustomComponent(),t?.remove(),Hr.delete(e)}},ma=({id:e})=>J.has(e)?(Jl({id:e}),J.get(e)?.element):void 0;var ha=({id:e="",value:t})=>{if(!e||e==="")return;let r=j.get(e);r&&j.set(e,{...r,currentRepeaterState:t})},vf=({rootNode:e,currentNode:t})=>{if(!(!t||!e.contains(t)))return t.parentElement===e?t:vf({rootNode:e,currentNode:t.parentElement})},Rw=({rootNode:e,node:t})=>{if(e)return vf({rootNode:e,currentNode:t.parentElement})},Tr=({id:e=""})=>{if(!e||e==="")return Zt;let r=j.get(e)?.currentRepeaterState;return r||Zt};var yf=({id:e="",repeatId:t="",element:r})=>{if(!e||e==="")return;let o=j.get(e);if(!o)return;let n=ma({id:t}),s=Rw({rootNode:n,node:r});j.set(e,{...o,repeaterInnerWrap:s})},Ms=({id:e})=>!e||e===""?void 0:j.get(e)?.repeaterInnerWrap;var yn=new Map,Tf=1e5,Tn=e=>{if(yn.size>=Tf)return console.warn(`Tick: maximum queue size reached (${Tf}). Likely an infinite watch loop. Queue force-cleared. `),yn.clear(),()=>{};let t=u.getUnivoqueId();return yn.set(t,e),()=>yn.delete(t)},_f=()=>yn.size===0,_r=async({debug:e=!1,previousResolve:t}={})=>{if(await Xr(),e&&yn.forEach(r=>{console.log(r)}),_f()&&t){t();return}return new Promise(r=>{if(_f()){r();return}_r({debug:e,previousResolve:t??r})})};var Yl=!0,da=()=>{Yl=!0},fa=()=>{Yl=!1},ga=()=>Yl;var _n=new Map,Sf=(e=[])=>{let t=Re(Object,e)?[e]:e,r=u.getUnivoqueId();return _n.set(r,t),r},xf=({element:e,componentId:t,bindEventsId:r})=>{let o=_n.get(r);o&&(o.forEach(n=>{let[s]=Object.keys(n),[i]=Object.values(n);!s||!i||e.addEventListener(s,async a=>{if(!ga())return;fa(),await _r(),da();let c=Tr({id:t});i(a,c?.current,c?.index)})}),_n.delete(r))},Cf=()=>{_n.clear()};var ba=({id:e="",unWatchArray:t=[]})=>{let r=j.get(e);if(!r)return;let{parentPropsWatcher:o}=r;o&&j.set(e,{...r,parentPropsWatcher:[...o,...t]})},Ef=({id:e=""})=>{if(!e||e==="")return;(j.get(e)?.parentPropsWatcher??[]).forEach(o=>{o()})};var wf=e=>{if(!("props"in e)){console.warn("bindProps not valid");return}let r=e?.observe?e.observe.map(s=>Pe.extractkeyFromProp(s)):(Pe.initializeCurrentDependencies(),u.checkType(Function,e.props)&&e.props({},{},0),Pe.getCurrentDependencies());if(r.length===0){console.warn("bindProps not valid, no dependencies found");return}let o={...e,observe:r},n=u.getUnivoqueId();return yt.set(n,{...o,componentId:"",propsId:n}),n},va=({componentId:e,observe:t,props:r,currentParentId:o,fireCallback:n})=>{if(!o)return;let s=Xt(o);if(!s)return;let i=Object.keys(s);if(t.every(h=>i.includes(h))||console.warn(`bind props error: Some prop ${JSON.stringify(t)} doesn't exist`),!j.has(e))return;let l=Tr({id:e}),p=r?.(s,l.current,l?.index);p&&Object.entries(p).forEach(([h,f])=>{gn(e,h,f,{emit:n})})},If=({propsId:e,repeatPropBind:t,componentId:r})=>{if(!e)return;let o=yt.get(e);o&&(yt.set(e,{...o,componentId:r}),xs.set(r,e),Xl({componentId:r,repeatPropBind:t,inizilizeWatcher:!1}))};var Xl=async({componentId:e,repeatPropBind:t,inizilizeWatcher:r})=>{let o=xs.get(e);if(!o)return;r&&xs.delete(e);let n=yt.get(o);if(!n)return;let{observe:s,props:i,parentId:a}=n,c=t&&t?.length>0&&!s.includes(t)?[...s,t]:[...s];if(r||va({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!1}),!r&&!Id()&&(await It(),va({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!0})),!r&&!xd()&&(await wt(),va({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!0})),!r)return;let l=!1,p=c.map(h=>Et(a,h,async()=>{if(await It(),await wt(),l)return;let f=Tn({state:h,componentId:e,moduleId:"",type:nd});l=!0,u.useNextLoop(()=>{va({componentId:e,observe:c,props:i,currentParentId:a??"",fireCallback:!0}),l=!1,f()})}));if(ba({id:e,unWatchArray:p.filter(h=>h!==void 0)}),!!r)for(let[h,f]of yt){let{componentId:d}=f;d===e&&yt.delete(h)}},Mf=()=>{yt.clear(),xs.clear()};var er=({id:e,container:t})=>{let o=j.get(e)?.child;if(!o)return;Object.values(o??{}).flat().forEach(s=>{let i=j.get(s),a=i?.element,c=i?.id??"";if(a&&t?.contains(a)&&a!==t){nt({id:s});return}else er({id:c,container:t})})};var Kl=new Map,Nw=e=>(u.checkType(Array,e)?e:[e]).map(r=>Pe.extractkeyFromProp(r)),Pw=({toggleClass:e,toggleStyle:t,toggleAttribute:r})=>(Pe.initializeCurrentDependencies(),Object.values(t).forEach(o=>o()),Object.values(e).forEach(o=>o()),Object.values(r).forEach(o=>o()),Pe.getCurrentDependencies()),Pf=({data:e,id:t})=>{let o=(u.checkType(Array,e)?e:[e]).map(({observe:i,toggleClass:a,toggleStyle:c,toggleAttribute:l})=>({observe:i?Nw(i):Pw({toggleStyle:c??{fake:()=>""},toggleClass:a??{fake:()=>{}},toggleAttribute:l??{fake:()=>{}}}),toggleClass:a??{},toggleStyle:c??{},toggleAttribute:l??{}})),n={parentId:t,items:o},s=u.getUnivoqueId();return Kl.set(s,n),s},Af=e=>{[...e.querySelectorAll(`[${pn}]`)].forEach(r=>{let o=r.getAttribute(pn);if(!o)return;let n=Kl.get(o);n&&(r.removeAttribute(pn),Aw({data:n,element:r}),Kl.delete(o))})},kf=({ref:e,data:t})=>{t&&Object.entries(t).forEach(([r,o])=>{e.deref()&&e.deref().classList.toggle(r,o?.())})},Rf=({ref:e,data:t})=>{Object.entries(t).forEach(([r,o])=>{e.deref()&&(e.deref().style[r]=o?.()??"")})},Nf=({ref:e,data:t})=>{Object.entries(t).forEach(([r,o])=>{if(!e.deref())return;let n=o?.();if(u.checkType(Boolean,n)){e.deref()[r]=n;return}if(!n){e.deref().removeAttribute(r);return}e.deref()?.setAttribute(r,n)})},Aw=({data:e,element:t})=>{let r=new WeakRef(t),{parentId:o}=e,{items:n}=e,s=n.flatMap(({observe:i,toggleClass:a,toggleStyle:c,toggleAttribute:l})=>{let p=!1,h=fn({id:o}),f=dn({id:o});return[...new Set([...i,...h,...f])].map(v=>(a&&u.useFrame(()=>{kf({ref:r,data:a})}),c&&u.useFrame(()=>{Rf({ref:r,data:c})}),l&&u.useFrame(()=>{Nf({ref:r,data:l})}),Et(o,v,async()=>{if(await It(),await wt(),r.deref()&&!r.deref()?.isConnected){s.forEach(y=>{y&&y()}),s.length=0;return}p||(p=!0,u.useNextLoop(()=>{u.useFrame(()=>{a&&r.deref()&&kf({ref:r,data:a}),c&&r.deref()&&Rf({ref:r,data:c}),l&&r.deref()&&Nf({ref:r,data:l}),p=!1})}))})))})};var Of=({element:e})=>{let t=e.querySelectorAll(`[${Qt}]`),r={};return[...t].reduce((o,n)=>{let s=n.getAttribute(Qt),i=n.getAttribute(vr);if(n.removeAttribute(Qt),n.removeAttribute(vr),!i)return o;let a=i in o?[...o[i],{element:n,scopeId:s}]:[{element:n,scopeId:s}];return{...o,[i]:a}},r)},Ow=e=>[...new Set(e.toSorted((t,r)=>t===r||!t||!r?0:t.compareDocumentPosition(r)&2?1:-1))],$w=({refs:e,refName:t,element:r})=>({...e,[t]:Ow([...e[t],r])}),$f=e=>{Object.entries(e).forEach(([t,r])=>{r.forEach(({element:o,scopeId:n})=>{let s=j.get(n);if(!s)return;let{refs:i}=s;if(!i)return;let a=t in i?$w({refs:i,refName:t,element:o}):{...i,[t]:[o]};j.set(n,{...s,refs:a})})})},Ql=({id:e})=>{let t=j.get(e);if(!t)return{};let{refs:r,element:o}=t;if(!r)return{};let n=Object.entries(r).map(([s,i])=>({name:s,collection:i.filter(a=>o.contains(a))})).reduce((s,i)=>({...s,[i.name]:i.collection}),{});return j.set(e,{...t,refs:n}),n},Lf=({id:e})=>{let t=Ql({id:e});return Object.entries(t).reduce((r,[o,n])=>({...r,[o]:n?.[0]}),{})};var Df=document.createElement("div"),Ff=({element:e})=>{Df=e},ya=()=>Df;var Bf=":FORCE",ks=new Map,Sn=new WeakMap,Zl=[],Vf=[],Wf=(e=[])=>{let t=Re(Object,e)?[e]:e,r=u.getUnivoqueId();return ks.set(r,t),r},Lw=e=>{let t=e?.parentNode;for(;t;){if(Sn.has(t))return{target:t,data:Sn.get(t)};t=t?.parentNode}return{target:void 0,data:void 0}},Dw=e=>{let t=Sn.get(e);return t?{target:e,data:t}:Lw(e)};async function Fw(e,t){let r=t?.target;if(!r)return;let{target:o,data:n}=Dw(r);if(!n||!document.contains(o))return;let s=n.find(({event:p})=>p===e);if(!s)return;let{callback:i,force:a}=s;if(!ga()&&!a||(fa(),await _r(),da(),!document.contains(o)))return;let c=af({element:o}),l=c?Tr({id:c}):Zt;Object.defineProperty(t,"target",{value:r}),Object.defineProperty(t,"currentTarget",{value:o}),i(t,l?.current,l?.index)}var jf=async e=>{await It(),await wt(),[...e.parentNode?.querySelectorAll(`[${Kt}]`)??[]].forEach(n=>{let s=n.getAttribute(Kt)??"";n.removeAttribute(Kt);let i=ks.get(s);ks.delete(s);let a=i?.flatMap(c=>Object.entries(c).map(l=>{let[p,h]=l,f=p.toUpperCase().endsWith(Bf),d=p.toUpperCase().replaceAll(Bf,"").toLowerCase();return Zl.includes(d)||Zl.push(d),{event:d,callback:h,force:f}}));Sn.set(n,a)});let o=ya();Zl.forEach(n=>{Vf.includes(n)||(Vf.push(n),o.addEventListener(n,Fw.bind(null,n)))})};var xn="repeater",Ta="invalidate",Qr=({moduleParentElement:e,skipInitialized:t=!1,onlyInitialized:r=!1,componentId:o,module:n})=>{let s=n===xn?J.entries():Te.entries(),i=[];for(let a of s){let[c,{element:l,initialized:p,scopeId:h,initializeModule:f,unsubscribe:d}]=a;if(o&&!Dl({moduleScopeId:h??"",targetComponentId:o})||t&&p||r&&!p)continue;l&&e?.contains(l)&&e!==l&&i.push({moduleId:c,initializeModule:f,unsubscribe:n===xn?[d]:d})}return i};var zf=({id:e,repeatId:t})=>{if(!rt.has(e))return;let r=rt.get(e);if(!r)return;let o=r.filter(n=>n.repeatId!==t);J.has(t)&&J.delete(t),rt.set(e,o)};var Zr=({id:e,repeatParent:t})=>{Qr({moduleParentElement:t,skipInitialized:!1,onlyInitialized:!0,componentId:e,module:xn}).forEach(({unsubscribe:o,moduleId:n})=>{o.forEach(s=>{s()}),zf({id:e,repeatId:n})})};var _a=({repeatParent:e,id:t})=>{if(!e)return;Qr({moduleParentElement:e,skipInitialized:!0,onlyInitialized:!1,componentId:t,module:xn}).forEach(({initializeModule:o})=>{o()})};var Hf=({invalidateId:e,unsubscribe:t})=>{let r=Te.get(e);r&&Te.set(e,{...r,unsubscribe:t})};var Uf=({id:e,invalidateId:t})=>{if(!tt.has(e))return;let r=tt.get(e);if(!r)return;let o=r.filter(n=>n.invalidateId!==t);Te.has(t)&&Te.delete(t),tt.set(e,o)};var eo=({id:e,invalidateParent:t})=>{Qr({moduleParentElement:t,skipInitialized:!1,onlyInitialized:!0,componentId:e,module:Ta}).forEach(({unsubscribe:o,moduleId:n})=>{o.forEach(s=>{s()}),Uf({id:e,invalidateId:n})})};var eu=({id:e})=>{if(!Te.has(e))return;if(qr.has(e)){let r=qr.get(e);r?.removeCustomComponent(),r?.remove(),qr.delete(e)}return Te.get(e)?.element};var Sa=({invalidateParent:e,id:t})=>{if(!e)return;Qr({moduleParentElement:e,skipInitialized:!0,onlyInitialized:!1,componentId:t,module:Ta}).forEach(({initializeModule:o})=>{o()})};var Gf=async({observe:e=[],beforeUpdate:t=()=>Promise.resolve(),afterUpdate:r=()=>{},watch:o,id:n,invalidateId:s,persistent:i=!1,renderFunction:a})=>{let c=!1,l=qi({element:eu({id:s})});r();let p=e.map(h=>o(h,async()=>{if(c)return;ln({id:n,prop:h});let d=eu({id:s}),v=Tn({state:h,componentId:n,moduleId:s,type:Bl}),y=Cd({state:h,componentId:n,invalidateId:s,type:Bl});c=!0,u.useNextLoop(async()=>{if(!d){zr({id:n,prop:h});return}await t(),eo({id:n,invalidateParent:d}),Zr({id:n,repeatParent:d}),er({id:l??n,container:d}),d.textContent="",Kr({stringDOM:a(),parent:d,position:"afterbegin"}),fe.set(ut,{element:d,persistent:i,source:fh},{emit:!1}),await fe.emitAsync(ut),sn(),c=!1,v(),y(),Sa({invalidateParent:d,id:n}),_a({repeatParent:d,id:n}),zr({id:n,prop:h}),r()})}));Hf({invalidateId:s,unsubscribe:p})};var qf=e=>(u.checkType(Array,e)?e:[e]).map(r=>Pe.extractkeyFromProp(r));var Jf=({invalidateId:e,initializeModule:t})=>{let r=Te.get(e);r&&Te.set(e,{...r,initializeModule:t,unsubscribe:[()=>{}]})};var Yf=({invalidateId:e})=>{let t=Te.get(e);t&&Te.set(e,{...t,initialized:!0,initializeModule:()=>{}})};var Xf=({invalidateId:e,scopeId:t,observe:r})=>{Te.set(e,{element:void 0,initialized:!1,observed:r,scopeId:t,initializeModule:()=>{},unsubscribe:[()=>{}]})};var Kf=({repeatId:e,unsubscribe:t})=>{let r=J.get(e);r&&J.set(e,{...r,unsubscribe:t})};var Cn=new Set,Qf=({id:e,state:t,container:r})=>{Cn.add({id:e,state:t,container:r})},Zf=({id:e,state:t,container:r})=>{r&&Cn.forEach(o=>{e===o.id&&t===o.state&&r===o.container&&Cn.delete(o)})},eg=({id:e="",state:t="",container:r})=>[...Cn].some(n=>e===n.id&&t===n.state&&r===n.container);var rg=(e=[],t=[],r="")=>{let o=new Set(t.map(n=>n?.[r]));return e.filter(n=>!o.has(n?.[r]))},og=(e=[],t=[],r="")=>{let o=new Set(t.map(n=>n?.[r]));return e.map((n,s)=>({isNewElement:!o.has(n?.[r]),keyValue:n?.[r],index:s}))},tg=({arr:e=[],key:t=""})=>e.every(r=>u.checkType(Object,r)&&t in r),ng=({current:e,previous:t,key:r})=>tg({arr:e,key:r})&&tg({arr:t,key:r}),xa=({data:e=[],key:t=""})=>{let r=new Set;return e.filter(o=>{let n=o?.[t];return r.has(n)?!1:(r.add(n),!0)})},Ca=({children:e,previousChildren:t=[],hasKey:r})=>{let o=new Set(t),n=t.length>0,s={};for(let i of e){let{index:a}=Tr({id:i}),c=r&&n&&!o.has(i)?`_${a}`:a;s[c]?s[c].push(i):s[c]=[i]}return Object.values(s)},sg=({children:e,key:t,data:r})=>{if(!e?.length||!r?.length)return[];let o=new Map(e.map(n=>{let{current:s}=Tr({id:n[0]});return[s[t],n]}));return r.map(n=>o.get(n[t])).filter(n=>n!==void 0)};var En=new Map,Ea=(e={})=>{let t=u.getUnivoqueId();return En.set(t,e),t},wa=(e="")=>{let t=En.get(e);return En.delete(e),t??{}};var ig=()=>{En.clear()};var Ia=(e={})=>`${un}="${Ea(e)}"`,Ma=(e,t,r)=>Math.min(Math.max(e,t),r);var tu=({repeatId:e})=>{let t=J.get(e);return t?t.currentData:[]};var Bw="index",No=({observe:e,hasKey:t,key:r="",keyValue:o="",index:n,repeatId:s})=>{let i=tu({repeatId:s}),a=t?i?.find(p=>p[r]===o):i?.[n],c=a,l=a;return new Proxy({},{get(p,h){Pe.setCurrentDependencies(e);let f=tu({repeatId:s}),d=Math.max(f?.length-1,0);if(h===Bw){if(t){let v=f?.findIndex(y=>y[r]===o);return Ma(v,0,d)}return Ma(n,0,d)}return t?(l=c??l,c=f?.find(v=>v[r]===o),c??l):(l=c??l,c=f?.[Ma(n,0,d)],c??l)},set(){return!1}})};var ag=({diff:e,current:t,previousLenght:r,render:o,state:n,repeatId:s})=>{let i=document.createRange();return[...Array.from({length:e}).keys()].map((c,l)=>{let p=t?.[l+r],h=l+r,f=No({observe:n,hasKey:!1,index:h,repeatId:s}),d=o({initialIndex:h,initialValue:p,current:f,sync:()=>""}),v=Vt();st(!0);let y=i.createContextualFragment(d);return st(v),pa({components:ta(),current:p,index:h,observe:n,repeatId:s,key:void 0}),y.firstElementChild}).filter(c=>c!==null)},Vw=({initialIndex:e,initialValue:t,state:r,repeatId:o})=>`${Ur}="${vn({current:t,index:e})}"
    ${Gr}="${r}" ${br}="${o}"`,cg=({diff:e,previousLenght:t,current:r,state:o,repeatId:n,render:s})=>[...Array.from({length:e}).keys()].map((i,a)=>{let c=a+t,l=r?.[c]?{...r?.[c]}:{},p=No({observe:o,hasKey:!1,index:c,repeatId:n});return s({sync:()=>Vw({initialIndex:c,initialValue:l,repeatId:n,state:o}),initialIndex:c,initialValue:l,current:p})}).join(""),lg=({currentValue:e,index:t,state:r,repeatId:o,key:n,keyValue:s,render:i})=>{let a=No({observe:r,hasKey:!0,key:n,keyValue:s,index:t,repeatId:o}),c=Vt();st(!0);let l=document.createRange().createContextualFragment(i({initialIndex:t,initialValue:e,current:a,sync:()=>""}));return st(c),pa({components:ta(),current:e,index:t,observe:r,repeatId:o,key:s}),l.firstElementChild},Ww=({keyValue:e,index:t,currentValue:r,state:o,repeatId:n})=>` ${"key"}="${e}"
    ${Gr}="${o}"
    ${Ur}="${vn({current:r,index:t})}"
    ${br}="${n}"`,ug=({currentValue:e,index:t,state:r,repeatId:o,key:n,keyValue:s,render:i})=>{let a={...e},c=No({observe:r,hasKey:!0,key:n,keyValue:s,index:t,repeatId:o});return i({initialIndex:t,initialValue:a,current:c,sync:()=>Ww({currentValue:a,index:t,keyValue:s,repeatId:o,state:r})})},pg=({currentUnique:e,render:t,observe:r,repeatId:o,key:n="",hasKey:s})=>{let i=document.createRange();return e.map((c,l)=>{let p=No({observe:r,hasKey:s,key:n,keyValue:s?c?.[n]:"",index:l,repeatId:o}),h=Vt();st(!0);let f=i.createContextualFragment(t({initialIndex:l,initialValue:c,current:p,sync:()=>""}));return st(h),pa({components:ta(),current:c,index:l,observe:r,repeatId:o,key:s?c?.[n]:""}),f.firstElementChild}).filter(c=>c!==null)},mg=({currentUnique:e,key:t="",observe:r,repeatId:o,hasKey:n,render:s})=>e.map((a,c)=>{let l=()=>`${Ur}="${vn({current:a,index:c})}"
                            ${"key"}="${n?a?.[t]:""}"
                            ${Gr}="${r}"
                            ${br}="${o}"`,p=No({observe:r,hasKey:n,key:t,keyValue:n?a?.[t]:"",index:c,repeatId:o});return s({sync:l,initialIndex:c,initialValue:a,current:p})}).join("");var ka=({repeatId:e,id:t})=>{let r=J.get(e);if(!r)return;let{element:o,observed:n}=r;if(!o)return;let s=[...o.children],a=Xt(t)[n];J.set(e,{...r,nativeDOMChildren:s.map((c,l)=>({index:l,value:a[l],element:c}))})},Rs=({repeatId:e})=>{let t=J.get(e);if(!t)return[];let{nativeDOMChildren:r}=t;return r};var wn=({repeatId:e,currentData:t})=>{let r=J.get(e);r&&J.set(e,{...r,currentData:t})};var jw=({element:e,container:t})=>{let r=Nh(e);t.insertAdjacentHTML("beforeend",`<!-- ${r} --> `)},hg=({state:e="",current:t=[],previous:r=[],repeaterParentElement:o=document.createElement("div"),key:n="",id:s="",render:i,repeatId:a,useSync:c})=>{let l=xa({data:t,key:n});wn({repeatId:a,currentData:l});let p=rg(r,l,n),h=p.map(T=>Hl({keyValue:T?.[n],repeatId:a})).filter(T=>T.length>0),f=h.length>0;h.forEach(T=>{let S=T[0].element,_=T[0].id;if(!_)return;let w=Ms({id:_}),x=w??S;eo({id:s,invalidateParent:x}),Zr({id:s,repeatParent:x}),T.forEach(({id:E})=>{nt({id:E})}),w&&w.remove()}),f||Rs({repeatId:a}).filter(_=>p.map(w=>w?.[n]).includes(_.value?.[n])).forEach(_=>{let{element:w}=_;eo({id:s,invalidateParent:w}),Zr({id:s,repeatParent:w}),er({id:s,container:w})});let d=og(l,r,n).map(({keyValue:T,isNewElement:S,index:_})=>{if(S)return{keyValue:T,isNewElement:S,index:_,wrapper:void 0};let w=Hl({keyValue:T,repeatId:a}),x=w[0]?.element?Ms({id:w[0]?.id??""}):Rs({repeatId:a}).find(I=>I.value?.[n]===T)?.element;return{keyValue:T,isNewElement:S,index:_,persistentElement:w,persistentDOMwrapper:x}});o.replaceChildren();let v=document.createRange(),y=new DocumentFragment;return d.forEach(({isNewElement:T,keyValue:S,index:_,persistentElement:w,persistentDOMwrapper:x})=>{if(!T){let{debug:A}=Mt();x&&y.append(x);let $=w?.[0]?.element;!x&&$&&(y.append($),A&&jw({element:w[0]?.element,container:o}));return}let E=l?.[_],I=c?ug({currentValue:E,index:_,state:e,repeatId:a,key:n,keyValue:S,render:i}):lg({currentValue:E,index:_,state:e,repeatId:a,key:n,keyValue:S,render:i}),P=Vt();if(st(!0),c){let A=v.createContextualFragment(I);y.append(A)}!c&&I&&y.append(I),st(P)}),o.append(y),l};var zw=e=>{let t=e.lastElementChild;if(!t)return;let r=t.nextSibling;for(;r;){let o=r.nextSibling;r.nodeType===Node.COMMENT_NODE&&r.remove(),r=o}},dg=({state:e="",current:t=[],previous:r=[],repeaterParentElement:o=document.createElement("div"),render:n,repeatId:s,id:i,useSync:a,currentChildren:c})=>{wn({repeatId:s,currentData:t});let l=t.length,p=r.length,h=l-p;if(h>0){let f=a?cg({diff:h,previousLenght:p,current:t,state:e,repeatId:s,render:n}):ag({diff:h,current:t,previousLenght:p,render:n,state:e,repeatId:s});a&&Kr({stringDOM:f,parent:o,position:"beforeend"}),a||ws({elements:f,parent:o,position:"beforeend"})}if(h<0){let f=Ca({children:c,hasKey:!1});f.filter((S,_)=>_>=t.length).forEach(S=>{S.forEach(_=>{let w=ua({id:_}),x=Ms({id:_}),E=x??w;eo({id:i,invalidateParent:E}),Zr({id:i,repeatParent:E}),nt({id:_}),x&&x.remove()})});let{debug:v}=Mt();if(v&&zw(o),f.length>0)return t;let y=Rs({repeatId:s});if(!y)return t;y.filter(({index:S})=>S>=t.length).forEach(S=>{let{element:_}=S;eo({id:i,invalidateParent:_}),Zr({id:i,repeatParent:_}),er({id:i,container:_}),_.remove()})}return t};var fg=async({state:e="",persistent:t,repeaterParentElement:r=document.createElement("div"),current:o=[],previous:n=[],key:s="",id:i,render:a,repeatId:c,useSync:l,currentChildren:p=[]})=>{let d=(ng({current:o,previous:n,key:s})?hg:dg)({state:e,current:o,previous:n,repeaterParentElement:r,key:s,id:i,render:a,repeatId:c,useSync:l,currentChildren:p});return fe.set(ut,{element:r,persistent:t,source:dh},{emit:!1}),await fe.emitAsync(ut),sn(),d};var gg=({state:e="",setState:t,persistent:r=!1,watch:o,clean:n=!1,beforeUpdate:s,afterUpdate:i,key:a="",id:c="",repeatId:l="",render:p,useSync:h=!1})=>{let f=ua({id:c});return Jl({id:l}),i(),o(e,async(v,y)=>{if(!u.checkType(Array,v))return;let T=ma({id:l}),S=Tn({state:e,componentId:c,moduleId:l,type:Fl}),_=Md({state:e,componentId:c,repeatId:l,type:Fl});if(ln({id:c,prop:e}),eg({id:c,state:e,container:T})){zr({id:c,prop:e}),t(e,y,{emit:!1}),S(),_();return}let x=Cs({repeatId:l});f&&await s(),n&&(x.forEach(R=>{nt({id:R})}),T&&(T.textContent="")),T&&Qf({id:c,state:e,container:T});let E=await fg({state:e,persistent:r,repeaterParentElement:T??document.createElement("div"),current:v,previous:n?[]:y,key:a,id:c,render:p,repeatId:l,useSync:h,currentChildren:n?[]:x}),I=Cs({repeatId:l}),P=!!a,A=Ca({children:I,previousChildren:x,hasKey:P}),$=P?[...sg({children:A,key:a,data:E})]:A,N=P?new Map(v.map((R,O)=>[`${R?.[a]}`,O])):new Map;$.forEach((R,O)=>{let D=E?.[O];if(!D)return;let k=P?N.get(`${D?.[a]}`)??-1:O;R.forEach(L=>{ha({id:L,value:{current:D,index:k}})})}),u.useNextLoop(async()=>{f&&i(),Zf({id:c,state:e,container:T}),zr({id:c,prop:e}),S(),_(),Sa({invalidateParent:T,id:c}),_a({repeatParent:T,id:c}),$.length===0&&ka({repeatId:l,id:c})})})};var bg=({repeatId:e,persistent:t,state:r,setState:o,emit:n,watch:s,clean:i,beforeUpdate:a,afterUpdate:c,key:l,id:p,render:h,useSync:f})=>{let d=gg({state:r,setState:o,persistent:t,emit:n,watch:s,clean:i,beforeUpdate:a,afterUpdate:c,key:l,id:p,repeatId:e,render:h,useSync:f});Kf({repeatId:e,unsubscribe:d})};var vg=({repeatId:e,initializeModule:t})=>{let r=J.get(e);r&&J.set(e,{...r,initializeModule:t,unsubscribe:()=>{}})};var yg=({repeatId:e})=>{let t=J.get(e);t&&J.set(e,{...t,initialized:!0,initializeModule:()=>{}})};var Tg=({repeatId:e,initialDOMRender:t})=>{let r=J.get(e);r&&J.set(e,{...r,initialRenderWithoutSync:t})};var _g=({repeatId:e,scopeId:t,observe:r})=>{J.set(e,{element:void 0,initialized:!1,scopeId:t,observed:r,nativeDOMChildren:[],componentChildren:[],currentData:[],initialRenderWithoutSync:[],initializeModule:()=>{},unsubscribe:()=>{}})};var Sg=({repeatId:e,scopeId:t})=>{let r=rt.get(t)??[];rt.set(t,[...r,{repeatId:e}])};var xg=({invalidateId:e,scopeId:t})=>{let r=tt.get(t)??[];tt.set(t,[...r,{invalidateId:e}])};var Cg=({getState:e,setState:t,updateState:r,getProxi:o,emit:n,emitAsync:s,computed:i,watch:a,id:c,key:l,bindEventsId:p,debug:h})=>({bindEventsId:p,key:l,id:c,getState:e,setState:t,updateState:r,getProxi:o,emit:n,emitAsync:s,computed:i,watch:a,debug:h,repeatIdArray:[],renderComponent:async({attachTo:d,component:v,position:y="afterbegin",clean:T=!0})=>{T&&(er({id:c,container:d}),d.textContent=""),d.insertAdjacentHTML(y,v),fe.set(ut,{element:d,persistent:Ui(c),source:gh},{emit:!1}),await fe.emitAsync(ut),sn()},getChildren:d=>zi({id:c,componentName:d}),freezeProp:d=>{let v=Pe.extractkeyFromProp(d);return ln({id:c,prop:v.toString()})},unFreezeProp:d=>{let v=Pe.extractkeyFromProp(d);return zr({id:c,prop:v.toString()})},unBind:()=>Ef({id:c}),bindProps:d=>{let v="props"in d?d:{props:d};return`${Xi}="${wf({...v,parentId:c})}" `},staticProps:d=>` ${un}="${Ea(d)}" `,remove:()=>{nt({id:c})},removeDOM:d=>{er({id:c,container:d}),d.textContent=""},getParentId:()=>Ss(c),watchParent:(d,v)=>{let y=Et(Ss(c),d,v);y&&ba({id:c,unWatchArray:[y]})},onMount:d=>bf({id:c,cb:d}),bindEvents:d=>`${Ki}="${Sf(d)}"`,delegateEvents:d=>`${Kt}="${Wf(d)}"`,bindEffect:d=>`${pn}="${Pf({data:d,id:c})}"`,addMethod:(d,v)=>{$h({id:c,name:d,fn:v})},setRef:d=>`${Qt}="${c}" ${vr}="${d}"`,getRef:()=>Lf({id:c}),getRefs:()=>Ql({id:c}),bindText:(d,...v)=>{let y=u.getUnivoqueId(),T=()=>Ad(c,d,...v);return kd(y,{id:c,render:T,props:v}),`<mobjs-bind-text ${Io}="${c}" ${Ji}="${y}"></mobjs-bind-text>${T()}`},bindObject:(d,...v)=>{let y=Bd(v),T=u.getUnivoqueId(),S=()=>Vd(d,...v);return Dd(T,{id:c,keys:y,render:S}),`<mobjs-bind-object ${Io}="${c}" ${Yi}="${T}"></mobjs-bind-object>${S()}`},invalidate:({observe:d,render:v,beforeUpdate:y=()=>Promise.resolve(),afterUpdate:T=()=>{}})=>{let S=qf(d),_=u.getUnivoqueId(),w=`${Qi}=${_}`,x=()=>v(),E=!1;return xg({invalidateId:_,scopeId:c}),Xf({invalidateId:_,scopeId:c,observe:S}),Jf({invalidateId:_,initializeModule:()=>{E||(Gf({observe:S,watch:a,beforeUpdate:y,afterUpdate:T,persistent:Ui(c),id:c,invalidateId:_,renderFunction:x}),E=!0,Yf({invalidateId:_}))}}),`<mobjs-invalidate ${w} style="display:none;"></mobjs-invalidate>${x()}`},repeat:({observe:d,clean:v=!1,beforeUpdate:y=()=>Promise.resolve(),afterUpdate:T=()=>{},key:S="",render:_,useSync:w=!1})=>{let x=Pe.extractkeyFromProp(d),E=u.getUnivoqueId(),I=S!=="";Sg({repeatId:E,scopeId:c}),_g({repeatId:E,scopeId:c,observe:x});let P=e()?.[x],A=I?xa({data:P,key:S}):P;wn({repeatId:E,currentData:A});let $=w?mg({currentUnique:A,key:S,observe:x,repeatId:E,hasKey:I,render:_}):"",N=w?[]:pg({currentUnique:A,render:_,observe:x,repeatId:E,key:S,hasKey:I}),R=!1;return Tg({repeatId:E,initialDOMRender:N}),vg({repeatId:E,initializeModule:()=>{R||(bg({repeatId:E,persistent:Ui(c),state:x,setState:t,emit:n,watch:a,clean:v,beforeUpdate:y,afterUpdate:T,key:S,id:c,render:_,useSync:w}),R=!0,yg({repeatId:E}),Yh({repeatId:E})||ka({repeatId:E,id:c}))}}),`<mobjs-repeat ${Zi}="${E}" style="display:none;"></mobjs-repeat>${$}`}});var ru=({componentName:e,currentProps:t={}})=>{let o=Ro()?.[e]?.componentParams?.exportState??[];return Object.fromEntries(Object.entries(t).filter(([n])=>o.includes(n)))};var Eg=({element:e})=>{let t=e.getId(),r=e.getInstanceName(),o=qi({element:e}),n=e.getStaticPropsId(),s=e.getDynamicPropsid(),i=e.getBindEventsId(),a=e.getRepeatValue(),c=e.getComponentRepeatId(),l=e.getCurrentKey()??"",p=e.getComponentName(),h=n?.split(" ").join(""),f=wa(h),d={...e.dataset},v=e.getRepeaterPropBind(),y=mf(a);return{element:e,props:{...ru({componentName:p,currentProps:d}),...ru({componentName:p,currentProps:f})},id:t,componentName:p,instanceName:r,key:l,dynamicPropsId:s,repeatPropBind:v,bindEventsId:i,currentRepeatValue:y,parentId:o,componentRepeatId:c}};var wg=e=>{cn.add(e)};var Ig=({element:e,instanceName:t="",props:r={},state:o={},bindStore:n,methods:s={},key:i="",currentRepeaterState:a=Zt,repeaterInnerWrap:c,repeatPropBind:l="",componentRepeatId:p="",parentPropsWatcher:h=[()=>{}],refs:f={},destroy:d=()=>{},freezedPros:v=[],persistent:y=!1,child:T={},parentId:S="",id:_="",componentName:w=""})=>{let x=u.createStore(o);Wh({props:r,store:x}),n&&x.bindStore(n),y||wg(_),p&&p.length>0&&qh({componentId:_,repeatId:p}),t&&t.length>0&&wh({instanceName:t,id:_});let E=Ud({componentName:w}),I=new Set(E);return x.setProxiReadOnlyProp(E),j.set(_,{element:e,componentName:w,instanceName:t,destroy:d,parentPropsWatcher:h,refs:f,methods:s,key:i,currentRepeaterState:a,repeaterInnerWrap:c,repeatPropBind:l,componentRepeatId:p,persistent:y,id:_,parentId:S,freezedPros:v,child:T,state:x}),{getState:()=>x.get(),setState:(P="",A={},{emit:$=!0}={})=>{let N=wo({id:_,prop:P}),R=Pe.extractkeyFromProp(P),O=I.has(R);O&&Gi({prop:R,componentName:w,action:"updateState"}),!(N||O)&&x.set(R,A,{emit:$??!0,usePropAsString:!0})},updateState:(P="",A=()=>({}),{emit:$=!0,clone:N=!1}={})=>{let R=wo({id:_,prop:P}),O=Pe.extractkeyFromProp(P),D=I.has(O);D&&Gi({prop:O,componentName:w,action:"updateState"}),!(R||D)&&x.update(O,A,{emit:$??!0,clone:N??!1,usePropAsString:!0})},getProxi:()=>x.getProxi(),emit:(P="")=>x.emit(P),emitAsync:async(P="")=>await x.emitAsync(P),computed:(P="",A=()=>{},$=[])=>{let N=Pe.extractkeyFromProp(P);if(I.has(N)){Gi({prop:N,componentName:w,action:"computed"});return}return x.computed(N,A,$,{usePropAsString:!0})},watch:(P="",A=()=>{},{wait:$=!1,immediate:N=!1}={})=>x.watch(P,A,{wait:$??!1,immediate:N??!1}),debug:()=>x.debug()}};var Mg=({id:e})=>(tt.get(e)??[]).map(({invalidateId:r})=>{let o=Te.get(r);if(o)return{invalidateId:r,initializeModule:o.initializeModule}}).filter(r=>r!==void 0);var kg=({id:e})=>(rt.get(e)??[]).map(({repeatId:r})=>{let o=J.get(r);if(o)return{repeatId:r,initializeModule:o.initializeModule}}).filter(r=>r!==void 0);var Rg=async({element:e,persistent:t=!1,source:r=Wr})=>{let{debug:o}=Mt();o&&console.log("parse source:",r);let n=Ro(),s=[],i=Vl(e);for(;i;){let c=i.getComponentName(),l=n?.[c]?.componentFunction,p=n?.[c]?.componentParams,{scoped:h,bindStore:f}=p,{props:d,id:v,componentName:y,instanceName:T,key:S,dynamicPropsId:_,currentRepeatValue:w,bindEventsId:x,parentId:E,componentRepeatId:I,repeatPropBind:P}=Eg({element:i}),A=p?.state??{},{getState:$,setState:N,updateState:R,getProxi:O,emit:D,emitAsync:k,computed:L,watch:C,debug:M}=Ig({element:i,props:d,state:A,id:v,componentName:y,instanceName:T,key:S,repeatPropBind:P,persistent:t,parentId:E,componentRepeatId:I,bindStore:f});jh({id:v}),I&&I?.length>0&&(ha({id:v,value:w}),yf({id:v,repeatId:I,element:i})),If({propsId:_,repeatPropBind:P,componentId:v});let B=Cg({getState:$,setState:N,updateState:R,getProxi:O,emit:D,emitAsync:k,computed:L,watch:C,id:v,key:S,bindEventsId:x,debug:M}),V=await l(B),F=i.classList,{newElement:z}=hf({content:V,element:i});if(dd(),F.length>0&&z?.classList.add(...F),!z)return;sf({id:v,newElement:z});let te=Mg({id:v}),ae=kg({id:v});x&&xf({element:z,componentId:v,bindEventsId:x});let q=h??Mt().scoped;q&&await ql({id:v,element:z}),z?.inizializeCustomComponent?.(B),s.push({onMount:async()=>{q||await ql({id:v,element:z})},initializeBindPropsWatcher:()=>{Xl({componentId:v,repeatPropBind:P,inizilizeWatcher:!0})},fireInvalidateFunction:te.length>0?()=>{te.forEach(({initializeModule:re})=>{re?.()})}:()=>{},fireRepeatFunction:ae.length>0?()=>{ae.forEach(({initializeModule:re})=>{re?.()})}:()=>{}}),i=Vl(e);let ne=Gl()===Mt().maxParseIteration;if(df(),ne){console.warn(`dom parse reached max parse limit: ${Gl()}`);break}}let a=Of({element:e});Object.keys(a).length>0&&$f(a);for(let c of s.toReversed()){let{onMount:l,initializeBindPropsWatcher:p,fireInvalidateFunction:h,fireRepeatFunction:f}=c;await l(),f(),h(),p()}s.length=0,i=null,jf(e),Af(e),Od(),Wd()};var Ns=async({element:e,persistent:t=!1,source:r=Wr})=>{await Rg({element:e,persistent:t,source:r}),ff()},Ng=()=>{fe.watch(ut,async({element:e,persistent:t=!1,source:r=Wr})=>{await Ns({element:e,persistent:t,source:r})})};var Pg=()=>{ig(),Cf(),Mf()};var Ag,Og,$g=({fn:e})=>{e&&(Og=e)},Lg=({fn:e})=>{e&&(Ag=e)},Dg=()=>Og,Fg=()=>Ag;var Bg=!0,Vg=e=>{Bg=e},Wg=()=>Bg;var jg=()=>{for(let e of cn)nt({id:e})};var zg=new Map,Hg=({route:e,params:t})=>Object.entries(t).reduce((r,[o,n])=>`${r}-${o}-${n}`,e),Ug=async({route:e="",templateName:t="",isBrowserNavigation:r=!1,params:o={},skipTransition:n})=>{fe.set(Jt,!0),await _r();let s=Hi();if(!s||!(s instanceof HTMLElement))return;let{activeRoute:i,activeParams:a}=fe.get(),c=Hg({route:e,params:o}),l=Hg({route:i.route,params:a}),p=window.scrollY;zg.set(l,p);let h=zg.get(c)??0;fe.set(Eo,{currentRoute:i.route,currentTemplate:i.templateName,nextRoute:e,nextTemplate:t});let f=!1,d=fe.watch(Eo,()=>{f=!0});Pg(),fe.set(rn,{route:e,templateName:t}),fe.set(on,o);let v=bn({hash:e}),y=n||v?.skipTransition,T=v?.props??{},S=await v?.layout?.({params:o,props:T})??"",_=Dg(),w=s.cloneNode(!0);_&&w&&!y&&(await _({oldNode:w,oldRoute:i.route,newRoute:e,oldTemplateName:i.templateName,newTemplateName:t}),s?.parentNode?.insertBefore(w,s)),s.replaceChildren(),jg(),Kr({stringDOM:S,parent:s,position:"afterbegin"}),await Ns({element:s}),y||(s.style.visibility=""),f||fe.set(nn,{currentRoute:e,currentTemplate:t,previousRoute:i.route,previousTemplate:i.templateName}),Wg()&&r?scrollTo(0,h):scrollTo(0,0),document.body.dataset.route=e,document.body.dataset.template=t;let x=Fg();x&&!y&&(await x({oldNode:w,newNode:s,oldRoute:i.route,newRoute:e,oldTemplateName:i.templateName,newTemplateName:t}),w.remove()),w=null,d?.(),fe.set(Jt,!1)};var Gg=({route:e})=>e,qg=e=>{Gg=e},Jg=({route:e})=>{let t=Gg({route:e});return{route:t,isRedirect:t!==e}};var Yg=({hash:e=""})=>{let t=la(),r=nf();return e===""?t:bn({hash:e})?e:r},Xg=({hash:e=""})=>bn({hash:e})?.templateName??"",Kg=({hash:e=""})=>bn({hash:e})?.restoreScroll??!0;var Qg="",Zg=!0,Sr="",eb="",to,ou,Ps,nu=e=>e.replace("?","").replace("/",""),tb=e=>e.replace("#","").replace("/","").replace(".",""),Hw=e=>e.split("&").reduce((t,r)=>{let o=r.split("="),n=nu(o?.[0]??""),s=o?.[1];return n&&n.length>0?{...t,[n]:s}:t},{}),Uw=e=>e&&Object.entries(e).reduce((t,[r,o],n)=>`${t}${n===0?"":"&"}${r}=${o}`,"");document.addEventListener("click",e=>{if(!e.target)return;e.target.closest("a")&&fe.getProp(Jt)&&e.preventDefault()},{passive:!1});var Ra=async({shouldLoadRoute:e=!0}={})=>{let t=globalThis.location.hash,r={hash:t},{routeIsLoading:o}=fe.get();if(o){globalThis.location.hash=Qg.replace("#","");return}Ps||history.replaceState({nextId:r},"",t);let{route:n,isRedirect:s}=Jg({route:t});s&&history.replaceState({nextId:r},"",`#${n}`);let i=n.split("?"),a=nu(i?.[1]??"");eb=Sr,Sr=tb(i?.[0]??"");let c=Hw(to??a),l=to||Object.keys(a).length>0?`?${to??a}`:"";to=void 0;let p=Yg({hash:Sr}),h=Xg({hash:Sr&&Sr.length>0?Sr:la()}),f=Sr===eb&&l.length===0&&!Zg;e&&!f&&(Qg=`#${Sr}${l}`,await Ug({route:p,templateName:h,isBrowserNavigation:Kg({hash:Sr})&&!!Ps,params:c,skipTransition:!!(Ps??ou)})),e||(fe.set(rn,{route:p,templateName:h}),fe.set(on,c)),ou=void 0,u.useNextLoop(()=>{Zg=!1})},rb=()=>{Ra(),globalThis.history.scrollRestoration="manual",globalThis.addEventListener("popstate",e=>{Ps=e?.state?.nextId}),globalThis.addEventListener("hashchange",async()=>{await Xr(),Ra()})},ob=({url:e,params:t,skipTransition:r})=>{if(!e||fe.getProp(Jt))return;ou=r;let o=e.split("?"),n=tb(o?.[0]??""),s=Uw(t),i=nu(o?.[1]??""),a=s??i;to=a.length>0?a:"",Ps=void 0,globalThis.location.hash=to&&to.length>0?`${n}?${to}`:n,globalThis.dispatchEvent(new HashChangeEvent("hashchange"))};var nb=async({rootId:e,wrapper:t,contentId:r,routes:o=[],afterInit:n=()=>{},redirect:s=({route:f})=>f,index:i="home",pageNotFound:a="pageNotFound",beforePageTransition:c,pageTransition:l,restoreScroll:p=!0,componentDefaultProps:h={scoped:!1,maxParseIteration:1e4,debug:!1}})=>{Yd(h);let f=document.querySelector(e),d=await t();qg(s),!(!r||!f)&&(Ch({contentId:r}),Ff({element:f}),Lg({fn:l}),$g({fn:c}),Vg(p),Ng(),Hd(),tf(o),rf({hash:i}),of({hash:a}),Kr({stringDOM:d,parent:f,position:"afterbegin"}),Eh(),Ra({shouldLoadRoute:!1}),await Ns({element:f,persistent:!0}),u.useFrameIndex(()=>{u.useNextTick(()=>{n()})},5),rb())};var sb=()=>Te.size;var ib=()=>J.size;var ue={};To(ue,{clamp:()=>at,getDefault:()=>yI,mq:()=>SI,printDefault:()=>TI,setDefault:()=>vI,useVelocity:()=>_I});var Po={default:{tension:20,mass:1,friction:5,velocity:0,precision:.01},gentle:{tension:120,mass:1,friction:14,velocity:0,precision:.01},wobbly:{tension:180,mass:1,friction:12,velocity:0,precision:.01},bounce:{tension:200,mass:3,friction:5,velocity:0,precision:.01},scroller:{tension:10,mass:1,friction:5,velocity:0,precision:.5}};var ge={easeLinear:"easeLinear",easeInQuad:"easeInQuad",easeOutQuad:"easeOutQuad",easeInOutQuad:"easeInOutQuad",easeInCubic:"easeInCubic",easeOutCubic:"easeOutCubic",easeInOutCubic:"easeInOutCubic",easeInQuart:"easeInQuart",easeOutQuart:"easeOutQuart",easeInOutQuart:"easeInOutQuart",easeInQuint:"easeInQuint",easeOutQuint:"easeOutQuint",easeInOutQuint:"easeInOutQuint",easeInSine:"easeInSine",easeOutSine:"easeOutSine",easeInOutSine:"easeInOutSine",easeInExpo:"easeInExpo",easeOutExpo:"easeOutExpo",easeInOutExpo:"easeInOutExpo",easeInCirc:"easeInCirc",easeOutCirc:"easeOutCirc",easeInOutCirc:"easeInOutCirc",easeInElastic:"easeInElastic",easeOutElastic:"easeOutElastic",easeInOutElastic:"easeInOutElastic",easeInBack:"easeInBack",easeOutBack:"easeOutBack",easeInOutBack:"easeInOutBack",easeInBounce:"easeInBounce",easeOutBounce:"easeOutBounce",easeInOutBounce:"easeInOutBounce"},$s="min",ab="max",iu="desktop",Ls="easeLinear",As="default",au={xSmall:320,small:360,medium:600,tablet:768,desktop:992,large:1200,xLarge:1600,xxLarge:1980},cu=10,Os=.06,lu="#ff0000",uu="#14df3b",pu=8,mu=10,hu=1e3,du=!1,qw=!1,Jw=!1,Yw=.01,Xw=.06,cb=e=>{let t=qe({prop:"deferredNextTick",value:e?.deferredNextTick,defaultValue:u.store.getProp("deferredNextTick"),type:Boolean}),r=qe({prop:"usePassive",value:e?.usePassive,defaultValue:u.store.getProp("usePassive"),type:Boolean}),o=qe({prop:"throttle",value:e?.throttle,defaultValue:u.store.getProp("throttle"),type:Number}),n=Kw(e?.mq??{}),s=qe({prop:"defaultMq.value",value:e?.defaultMq?.value,defaultValue:iu,type:String}),i=qe({prop:"defaultMq.type",value:e?.defaultMq?.type,defaultValue:$s,type:String}),a=qe({prop:"sequencer.duration",value:e?.sequencer?.duration,defaultValue:cu,type:Number}),c=su(e?.sequencer?.ease,"sequencer"),l=qe({prop:"scrolTrigger.springConfig",value:e?.scrollTrigger?.springConfig,defaultValue:As,type:String}),p=qe({prop:"scrolTrigger.lerpConfig",value:e?.scrollTrigger?.lerpConfig,defaultValue:Os,type:Number}),h=qe({prop:"scrolTrigger.markerColor.startEnd",value:e?.scrollTrigger?.markerColor?.startEnd,defaultValue:lu,type:String}),f=qe({prop:"scrolTrigger.markerColor.item",value:e?.scrollTrigger?.markerColor?.item,defaultValue:uu,type:String}),d=qe({prop:"parallax.defaultRange",value:e?.parallax?.defaultRange,defaultValue:pu,type:Number}),v=qe({prop:"parallax.springConfig",value:e?.parallax?.springConfig,defaultValue:As,type:String}),y=qe({prop:"parallax.lerpConfig",value:e?.parallax?.lerpConfig,defaultValue:Os,type:Number}),T=qe({prop:"parallaxTween.duration",value:e?.parallaxTween?.duration,defaultValue:mu,type:Number}),S=su(e?.parallaxTween?.ease,"parallaxTween"),_=qe({prop:"tween.duration",value:e?.tween?.duration,defaultValue:hu,type:Number}),w=su(e?.tween?.ease,"tween"),x=qe({prop:"tween.relative",value:e?.tween?.relative,defaultValue:du,type:Boolean}),E=qe({prop:"spring.relative",value:e?.spring?.relative,defaultValue:qw,type:Boolean}),I=qe({prop:"lerp.relative",value:e?.lerp?.relative,defaultValue:Jw,type:Boolean}),P=qe({prop:"lerp.precision",value:e?.lerp?.precision,defaultValue:Yw,type:Number}),A=qe({prop:"lerp.velocity",value:e?.lerp?.velocity,defaultValue:Xw,type:Number});return{deferredNextTick:t,throttle:o,usePassive:r,mq:n,defaultMq:{value:s,type:i},sequencer:{duration:a,ease:c},scrollTrigger:{springConfig:l,lerpConfig:p,markerColor:{startEnd:h,item:f}},parallax:{defaultRange:d,springConfig:v,lerpConfig:y},parallaxTween:{duration:T,ease:S},tween:{duration:_,ease:w,relative:x},spring:{relative:E,config:e?.spring?.config?{...Po,...e.spring.config}:Po},lerp:{relative:I,precision:P,velocity:A}}},qe=({prop:e,value:t,defaultValue:r,type:o})=>{let n=u.checkType(o,t);return n||console.warn(`handleSetUp error: ${e}: ${t}, is not valid must be a ${u.getTypeName(o)}`),n?t:r},Kw=e=>{let t=u.checkType(Object,e)&&Object.values(e).every(r=>u.checkType(Number,r));return t||console.warn("handleSetUp error: mq must be an object as { ..., String: Number }"),t?e:au},su=(e,t)=>{let r=Object.keys(ge).includes(e);return!r&&e!==void 0&&e!==null&&console.warn(`handleSetUp error: ${t}.ease properties is not valid`),r?e:Ls};var it=(e,t,r=!0)=>{e=(n=>{let s;try{s=JSON.parse(JSON.stringify(n))}catch{s=Object.assign({},n)}return s})(e);let o=n=>n&&typeof n=="object";return!o(e)||!o(t)?t:(Object.keys(t).forEach(n=>{let s=e[n],i=t[n];Array.isArray(s)&&Array.isArray(i)?r?(e[n]=s.map((a,c)=>i.length<=c?a:it(a,i[c],r)),i.length>s.length&&(e[n]=e[n].concat(i.slice(s.length)))):e[n]=s.concat(i):o(s)&&o(i)?e[n]=it(Object.assign({},s),i,r):e[n]=i}),e)};function lb(){return{deferredNextTick:u.store.getProp("deferredNextTick"),throttle:u.store.getProp("throttle"),usePassive:u.store.getProp("usePassive"),mq:au,defaultMq:{value:iu,type:$s},sequencer:{duration:cu,ease:Ls},scrollTrigger:{springConfig:As,lerpConfig:Os,markerColor:{startEnd:lu,item:uu}},parallax:{defaultRange:pu,springConfig:As,lerpConfig:Os},parallaxTween:{duration:mu,ease:Ls},tween:{duration:hu,ease:Ls,relative:du},spring:{relative:!1,config:Po},lerp:{relative:!1,precision:.01,velocity:.06}}}var he=(()=>{let e=lb();return{set:n=>{e=cb(it(lb(),n)),"usePassive"in n&&u.store.set("usePassive",e.usePassive),"deferredNextTick"in n&&u.store.set("deferredNextTick",e.deferredNextTick),"throttle"in n&&u.store.set("throttle",e.throttle)},get:n=>(n in e||console.warn(`handleSetUp: ${n} is not a setup propierties`),e[n]),print:()=>{console.log("Writable props:"),console.log(e)}}})();var Qw=(e="desktop")=>window.innerWidth<he.get("mq")[e],Zw=(e="desktop")=>window.innerWidth>=he.get("mq")[e],eI=(e="desktop")=>he.get("mq")[e],ve={max:Qw,min:Zw,getBreackpoint:eI};var _e=e=>{if(u.checkType(Number,e))return Math.round(e*1e4)/1e4||0;if(Math.abs(e)<1){let t=Number.parseInt(e.toString().split("e-")[1]);t&&(e*=Math.pow(10,t-1),e="0."+Array.from({length:t}).join("0")+e.toString().slice(2))}else{let t=Number.parseInt(e.toString().split("+")[1]);t>20&&(t-=20,e/=Math.pow(10,t),e+=Array.from({length:t+1}).join("0"))}return Number.parseFloat(Number.parseFloat(e).toFixed(4))},at=(e,t,r)=>Math.min(Math.max(e,t),r),ub=(e,t,r)=>(1-r)*e+r*t,ro=(e,t)=>{let r=Object.keys(e).toSorted(),o=Object.keys(t).toSorted();return r.length===o.length&&r.every((n,s)=>n===o[s])},Ds=(e,t)=>{let r=[];for(let o=0;o<e.length;o+=t){let n=e.slice(o,o+t);r.push(n)}return r},pb=(e,t)=>e.map(r=>r[t]);var Na=e=>e.map(t=>(t.settled||(t.fromValue=t.currentValue),t)),xr=e=>e.map(t=>(t.fromValue=t.toValue,t.currentValue=t.toValue,t)),In=e=>e.map(t=>(t.toValue=t.currentValue,t.fromValue=t.currentValue,t)),Cr=(e,t)=>{let r=Object.keys(e);return t.map(o=>{if(r.includes(o.prop)){let n=o.fromValue,s=o.toValue;o.fromValue=s,o.toValue=n}return o})},Mn=(e,t)=>e.map(r=>(r.toValue=t?r.toValue+r.currentValue:r.toValue,r));var fu=(e,t)=>e.map(r=>(r.shouldUpdate&&(r.toValProcessed=t?r.toValue+1e-5:r.toValue-r.fromValue+1e-5),r));var Pa="radial",tr="start";var kn="center",Rn="edges",Nn="random",mb="MERGE_FROM_UP",gu="MERGE_FROM_DOWN",Ao="equal",Oo="start";var $o="center",Pn={type:Ao,each:0,waitComplete:!1,from:tr,grid:{col:1,row:1,direction:"col"}},Xe={index:0,frame:0};var b={PX:"px",VH:"vh",VW:"vw",WPERCENT:"w",HPERCENT:"h",DEGREE:"deg",PLUS_HEIGHT:"+height",PLUS_HEIGHT_HALF:"+halfHeight",PLUS_WIDTH:"+width",PLUS_WIDTH_HALF:"+halfWidth",MINUS_HEIGHT:"-height",MINUS_HEIGHT_HALF:"-halfHeight",MINUS_WIDTH:"-width",MINUS_WIDTH_HALF:"-halfWidth",POSITION_BOTTOM:"bottom",POSITION_TOP:"top",POSITION_LEFT:"left",POSITION_RIGHT:"right",DIRECTION_VERTICAL:"vertical",DIRECTION_HORIZONTAL:"horizontal",TYPE_PARALLAX:"parallax",TYPE_SCROLLTRIGGER:"scrolltrigger",PROP_VERTICAL:"y",PROP_HORIZONTAL:"x",PROP_ROTATE:"rotate",PROP_ROTATEY:"rotateY",PROP_ROTATEX:"rotateX",PROP_ROTATEZ:"rotateZ",PROP_OPACITY:"opacity",PROP_SCALE:"scale",PROP_SCALE_X:"scaleX",PROP_SCALE_Y:"scaleY",PROP_TWEEN:"tween",TWEEN_TWEEN:"parallaxTween",TWEEN_TIMELINE:"sequencer",ALIGN_START:"start",ALIGN_TOP:"top",ALIGN_RIGHT:"right",ALIGN_CENTER:"center",ALIGN_BOTTOM:"bottom",ALIGN_LEFT:"left",ALIGN_END:"end",IN_STOP:"in-stop",IN_BACK:"in-back",OUT_STOP:"out-stop",OUT_BACK:"out-back",EASE_SPRING:"spring",EASE_LERP:"lerp",EASE_PRECISION:.001,SCROLL_UP:"up",SCROLL_DOWN:"down",ON_LEAVE:"ON_LEAVE",ON_LEAVE_BACK:"ON_LEAVE_BACK",ON_ENTER:"ON_ENTER",ON_ENTER_BACK:"ON_ENTER_BACK",ON_NOOP:"ON_NOOP"};var Er=e=>e.map(t=>`${t} | `).join(""),oo=(e,t,r)=>{console.warn(`${e}: ${JSON.stringify(t)} and to ${JSON.stringify(r)} is not equal`)},kt=e=>{console.warn(`stagger col of grid is out of range, it must be less than ${e} ( staggers length )`)},wr=e=>{console.warn(`tween | sequencer: ${e} is not valid value, must be a number or a Function that return a number`)},hb=e=>{console.warn(`sequencer, start option: ${e} value is not valid, must be a Number`)},db=e=>{console.warn(`sequencer, end option: ${e} value is not valid, must be a Number`)},fb=()=>{console.warn("relative prop is not allowed inside a timeline")},gb=e=>{console.warn(`Timeline Supend: ${e()} is not a valid value, must be a boolean`)},bb=()=>{console.warn("SyncTimeline: in revese ( or yoyo mode) only goTo || goFromTo || set action is allowed. Using goFrom makes no sense in this context. Enable forceFromTo to use from action in reverse mode")},vb=e=>{console.warn(`timeline setTween: ${e} is not an array of tween`)},yb=e=>{console.warn(`timeline setTween: ${e} is not a string`)},Tb=e=>{console.warn(`asyncTimeline.setTween() label: ${e} not found`)},_b=()=>{console.warn("setTween fail")},Sb=e=>{console.warn(`label ${e} not founded`)},xb=e=>{console.warn(`sequencer.add(fn,time) ${e}: fn must be Function`)},Cb=e=>{console.warn(`sequencer.add(fn,time) ${e}: time must be a Number`)},bu=e=>{console.warn(`${e} doesn't exist in spring configuration list`)},Eb=()=>{console.warn("Spring configProps: all prop must be a positive Number")},wb=e=>{console.warn(`Spring config: ${e}: config must have friction/mass/precision/tesnion props and must be a number`)},Lo=e=>{console.warn(`${e} doesn't exist in tweens ease function`)},Aa=()=>{console.warn("stagger each must be a Number ")},Ib=e=>{console.warn(`stagger, row/col: ${e} value is not valid, must be a Number`)},Mb=()=>{console.warn("Stagger error: waitComplete propierties must be a Boolean")},kb=()=>{console.warn("Stagger error: in grid option direction should be a string radial/col/row")};var Rb=()=>{console.warn("Stagger error: in col/row direction 'from' propierties must be a string start/end/center/edges or a number")},Nb=e=>{console.warn(`Stagger error: from: ${e} is not a valid value, must be a string start/end/center/edges or a number or a Object {x:Number,y:Number}`)},Pb=e=>{console.warn(`duration error: ${e} is not valid duration must be a number`)},Ab=e=>{console.warn(`duration error: ${e} is not valid duration must be a number or a Function that return a number`)},Ob=e=>{console.warn(`repeat error: ${e} is not valid repeat value must be a Number`)};var $b=e=>{console.warn(`data inizializiation error; ${e} is not a valid value, must be a string`)},Lb=e=>{console.warn(`data inizializiation error; ${e} is not a valid value, must be a number`)},Db=()=>{console.warn("createStaggers error: items array can not be empty")},Fb=()=>{console.warn("createStaggers error: each element of the array must be an Element or an Object")},Bb=()=>{console.warn(`screateStaggers error: type should be: ${Ao} || ${tr} || ${"end"} || ${$o}`)},Vb=e=>{console.warn(`createStagger:  each must be between 1 and ${e}`)},Wb=(e,t)=>{console.warn(`${t}: relative prop: ${e} is not a valid parameter, must be a boolean `)},vu=(e,t)=>{console.warn(`${t}: '${e}' is not Boolean`)},jb=(e,t)=>{console.warn(`${t}: '${e}' is not String`)},zb=(e,t)=>{console.warn(`${t}: '${e}' is not Number`)},Hb=(e,t)=>{console.warn(`${t}: '${e}' is not Function`)},Ub=(e,t)=>{console.warn(`${t}: '${e}' is not a Array`)},Gb=()=>{console.warn("Lerp error: velocity is not valid, must be a Number greater than 0 and less than 1")},qb=()=>{console.warn("Lerp error: precision is not valid, must be a number greater than 0")},On=e=>{console.warn(`asyncTimeline error: ${e} cannot be used inside group`)},Jb=e=>{console.warn(`${e} value must be a string`)},Yb=()=>{console.warn("tween added to asyncTimeline or used inside sync() method must be instance of HandleLerp | HandleTween | HandleSpring")},Xb=()=>{console.warn("asyncTimeline arror: delay must be a Number")},Kb=e=>{console.warn(`${e} not found`)},Qb=e=>{console.warn(`timeline add async function, ${e} is not a function `)},Zb=(e,t)=>{console.warn(`${t} direction: ${e} is not valid value: must be ${b.DIRECTION_VERTICAL} | ${b.DIRECTION_HORIZONTAL}`)},ev=e=>{console.warn(`scrollTrigger error; ${e} propierties: value must be a Object like { position: top|bottom|left|right, value: () => { return Number} } `)},tv=()=>{console.warn("scrollTrigger error; dynamicRange propierties: value must be a Function that return a Number")},rv=()=>{console.warn("parallax|scrolTrigger error: tween is not valid, must be an instance of HandleSequencer || ParallaxTween")},ov=(e,t)=>{console.warn(`parallax error align propierties: ${e} is not valid must be one of ${Er(t)} or a Number between 0 and 100`)},nv=(e,t)=>{console.warn(`parallax error align propierties: ${e} is not valid must be one of ${Er(t)}`)},sv=(e,t)=>{console.warn(`${t}: '${e}' is not Number, must be a number between 0 and 100`)},iv=(e,t)=>{console.warn(`parallax error type propierties: ${e} is not valid must be one of ${Er(t)}`)},av=(e,t)=>{console.warn(`parallax/scrollTrigger error propierties props: ${e} is not valid must be one of ${Er(t)} or a custom css propierites like margin|line-height|...`)},cv=(e,t)=>{console.warn(`parallax error easeType props: ${e} is not valid must be one of ${Er(t)}`)},lv=(e,t,r)=>{console.warn(`${r} error easeType props: ${e} is not valid must be one of ${Er(t)}`)},uv=()=>{console.warn('Scrolltrigger warning: spring animation is only available for native properties and scrollerTween, Check that with the "propierties" property set to "tween" no HandleSequencer is associated with the "tween" property')},pv=(e,t)=>{console.warn(`parallax/scrollTrigger error springConfig props: ${e} is not valid must be one of ${Er(t)}`)},mv=e=>{console.warn(`parallax error range propierties, current value: ${e}, the value must be a number between 0 and 9.99`)},hv=e=>{console.warn(`scrollTrigger error range propierties: ${e} is not a String`)},yu=(e,t,r,o)=>{console.warn(`${o} error ${r} propierties: ${e} is not valid must be one of ${Er(t)}`)},dv=()=>{console.warn("Parallax warning: if propierties is a tween the only choice is ParallaxTween, HandleSequencer or empty tween propierites is not allowed inside a parallax")},fv=()=>{console.warn("parallax/ScrollTrrigger error: velocity is not valid, must be a Number greater than 0 and less than 1")},gv=()=>{console.warn('parallax/ScrollTrrigger warning:  The property is "tween" but no tween has been associated, associate a tween with the "tween" property')},bv=()=>{console.warn('parallax/ScrollTrrigger: there is tween associated but pros "propierties" is not set to "tween"')},vv=(e,t)=>{console.warn(`${e}: ${t} is not a function`)},Tu=(e,t,r)=>{console.warn(`scrollTrigger error range : with '${t}' propierties ${e} is not valid, add one of the following unit misure: ${Er(r)}, es: 45deg|100px|50vw etc..`)},yv=e=>{console.warn(`scrollTrigger error range : with custom css propierties '${e}' no unit misure is necessary, the default unit misure will be used (px). Only '-' for negative value is allowed`)},Tv=(e,t)=>{console.warn(`scrollTrigger error range : with '${t}' propierties ${e} is not valid no unit misure is necessary. Only '-' for negative value is allowed`)};var Wt={[ge.easeLinear]:(e,t,r,o)=>r*e/o+t,[ge.easeInQuad]:(e,t,r,o)=>r*(e/=o)*e+t,[ge.easeOutQuad]:(e,t,r,o)=>-r*(e/=o)*(e-2)+t,[ge.easeInOutQuad]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e+t:-r/2*(--e*(e-2)-1)+t,[ge.easeInCubic]:(e,t,r,o)=>r*(e/=o)*e*e+t,[ge.easeOutCubic]:(e,t,r,o)=>r*((e=e/o-1)*e*e+1)+t,[ge.easeInOutCubic]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e+t:r/2*((e-=2)*e*e+2)+t,[ge.easeInQuart]:(e,t,r,o)=>r*(e/=o)*e*e*e+t,[ge.easeOutQuart]:(e,t,r,o)=>-r*((e=e/o-1)*e*e*e-1)+t,[ge.easeInOutQuart]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e*e+t:-r/2*((e-=2)*e*e*e-2)+t,[ge.easeInQuint]:(e,t,r,o)=>r*(e/=o)*e*e*e*e+t,[ge.easeOutQuint]:(e,t,r,o)=>r*((e=e/o-1)*e*e*e*e+1)+t,[ge.easeInOutQuint]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e*e*e+t:r/2*((e-=2)*e*e*e*e+2)+t,[ge.easeInSine]:(e,t,r,o)=>-r*Math.cos(e/o*(Math.PI/2))+r+t,[ge.easeOutSine]:(e,t,r,o)=>r*Math.sin(e/o*(Math.PI/2))+t,[ge.easeInOutSine]:(e,t,r,o)=>-r/2*(Math.cos(Math.PI*e/o)-1)+t,[ge.easeInExpo]:(e,t,r,o)=>e===0?t:r*Math.pow(2,10*(e/o-1))+t,[ge.easeOutExpo]:(e,t,r,o)=>e===o?t+r:r*(-Math.pow(2,-10*e/o)+1)+t,[ge.easeInOutExpo]:(e,t,r,o)=>e===0?t:e===o?t+r:(e/=o/2)<1?r/2*Math.pow(2,10*(e-1))+t:r/2*(-Math.pow(2,-10*--e)+2)+t,[ge.easeInCirc]:(e,t,r,o)=>-r*(Math.sqrt(1-(e/=o)*e)-1)+t,[ge.easeOutCirc]:(e,t,r,o)=>r*Math.sqrt(1-(e=e/o-1)*e)+t,[ge.easeInOutCirc]:(e,t,r,o)=>(e/=o/2)<1?-r/2*(Math.sqrt(1-e*e)-1)+t:r/2*(Math.sqrt(1-(e-=2)*e)+1)+t,[ge.easeInElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o)===1?t+r:(s||(s=o*.3),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),-(i*Math.pow(2,10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s))+t)},[ge.easeOutElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o)===1?t+r:(s||(s=o*.3),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),i*Math.pow(2,-10*e)*Math.sin((e*o-n)*(2*Math.PI)/s)+r+t)},[ge.easeInOutElastic]:(e,t,r,o)=>{let n=1.70158,s=0,i=r;return e===0?t:(e/=o/2)===2?t+r:(s||(s=o*(.3*1.5)),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),e<1?-.5*(i*Math.pow(2,10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s))+t:i*Math.pow(2,-10*(e-=1))*Math.sin((e*o-n)*(2*Math.PI)/s)*.5+r+t)},[ge.easeInBack]:(e,t,r,o,n=1.70158)=>r*(e/=o)*e*((n+1)*e-n)+t,[ge.easeOutBack]:(e,t,r,o,n=1.70158)=>r*((e=e/o-1)*e*((n+1)*e+n)+1)+t,easeInOutBack:(e,t,r,o,n=1.70158)=>(e/=o/2)<1?r/2*(e*e*(((n*=1.525)+1)*e-n))+t:r/2*((e-=2)*e*(((n*=1.525)+1)*e+n)+2)+t,[ge.easeInBounce]:(e,t,r,o)=>r-Wt[ge.easeOutBounce](o-e,0,r,o)+t,[ge.easeOutBounce]:(e,t,r,o)=>(e/=o)<1/2.75?r*(7.5625*e*e)+t:e<2/2.75?r*(7.5625*(e-=1.5/2.75)*e+.75)+t:e<2.5/2.75?r*(7.5625*(e-=2.25/2.75)*e+.9375)+t:r*(7.5625*(e-=2.625/2.75)*e+.984375)+t,[ge.easeInOutBounce]:(e,t,r,o)=>e<o/2?Wt[ge.easeInBounce](e*2,0,r,o)*.5+t:Wt[ge.easeOutBounce](e*2-o,0,r,o)*.5+r*.5+t};var pt=e=>e in Wt?Wt[e]:(Lo(e),Wt[he.get("tween").ease]);var _v=e=>e?e.replaceAll(/[\s#$()*+,.?[\\\]^{|}-]/g,String.raw`\$&`):"",_u=e=>/^[+-]?\d+(\.\d+)?$/.test(e),Sv=e=>/^\d+\.\d+$|^\d+$/.test(e),De=(e,t)=>{let r=new RegExp(`^${_v(t)}$`,"i");return(e.match(r)||[]).length},rr=(e,t)=>{let r=new RegExp(`[0-9]${t}$`,"i");return(e.match(r)||[]).length},Su=(e,t)=>e.some(r=>{let o=new RegExp(`[0-9]${r}$`,"i");return(t.match(o)||[]).length}),xu=(e,t)=>e.some(r=>{let o=new RegExp(`^${_v(r)}$`,"i");return(t.match(o)||[]).length});var xv=e=>e&&(De(e,b.PROP_VERTICAL)?b.PROP_VERTICAL:De(e,b.PROP_HORIZONTAL)?b.PROP_HORIZONTAL:De(e,b.PROP_ROTATE)?b.PROP_ROTATE:De(e,b.PROP_ROTATEY)?b.PROP_ROTATEY:De(e,b.PROP_ROTATEX)?b.PROP_ROTATEX:De(e,b.PROP_OPACITY)?b.PROP_OPACITY:De(e,b.PROP_SCALE)?b.PROP_SCALE:De(e,b.PROP_SCALE_X)?b.PROP_SCALE_X:De(e,b.PROP_SCALE_Y)?b.PROP_SCALE_Y:De(e,b.PROP_TWEEN)?b.PROP_TWEEN:e),Cv=e=>{if(e){if(rr(e,b.PX))return b.PX;if(rr(e,b.VH))return b.VH;if(rr(e,b.VW))return b.VW}return""},Oa=e=>De(e,b.POSITION_TOP)?b.POSITION_TOP:De(e,b.POSITION_BOTTOM)?b.POSITION_BOTTOM:De(e,b.POSITION_LEFT)?b.POSITION_LEFT:De(e,b.POSITION_RIGHT)?b.POSITION_RIGHT:"",Ev=e=>rr(e,b.PX)?b.PX:rr(e,b.VH)?b.VH:rr(e,b.VW)?b.VW:rr(e,b.WPERCENT)?b.WPERCENT:rr(e,b.HPERCENT)?b.HPERCENT:rr(e,b.DEGREE)?b.DEGREE:b.PX;var jt=e=>u.checkType(Number,e)||u.checkType(Function,e)&&u.checkType(Number,e()),La=({start:e,end:t})=>{let r=u.checkType(Number,e),o=u.checkType(Number,t);return r||hb(e),o||db(t),r&&o},no=e=>{let t=u.checkType(Number,e);return!t&&e&&Pb(e),t?e:he.get("sequencer").duration},Da=e=>{let t=u.checkType(Number,e);return!t&&e&&Ob(e),t&&e?e:1},wv=e=>{let t=e&&e in Wt;return!t&&e&&Lo(e),t?e:he.get("sequencer").ease},Iv=e=>{let t=e&&e in Wt;return!t&&e&&Lo(e),t?pt(e):pt(he.get("parallaxTween").ease)},Mv=(e,t)=>{let r=u.checkType(String,e),o=u.checkType(Number,t);return r||$b(e),o||Lb(t),r&&o},kv=e=>{if(!e)return;let t=u.checkType(Number,e);return t||Aa(),t},Rv=e=>{if(!e)return;let r=[tr,"end",kn,Rn,Nn].includes(e),o=u.checkType(Number,e),n=u.checkType(Object,e),s=r||o||n;return s||Nb(e),s},Eu=e=>{if(!e)return;let t=u.checkType(Number,e);return t||Ib(e),t},Nv=e=>{if(!e)return;let r=[Pa,"row","col"].includes(e);return r||kb(),r},Pv=e=>{if(!e)return;let t=u.checkType(Boolean,e);return t||Mb(),t},Av=(e=[])=>{let t=u.checkType(Array,[...e])&&e.length>0;return t||Db(),t},Ov=(e=[])=>u.checkType(Array,[...e])&&e.length>0?e:[],$v=e=>{if(!e)return;let r=[Ao,Oo,"end",$o].includes(e);if(!r){Bb();return}return r};var so=(e,t)=>{let r=u.checkType(Boolean,e);return!r&&e&&Wb(e,t),r?e:he.get(t).relative},Fa=e=>{let t=e&&e in Wt;return!t&&e&&Lo(e),t?pt(e):pt(he.get("tween").ease)},Ba=e=>{let t=e&&e in Wt;return!t&&e&&Lo(e),t?e:he.get("tween").ease},wu=e=>{let{config:t}=he.get("spring"),r=e&&e in t,o=r?t[e]:{},s=(r?u.checkType(Object,o)&&"tension"in o&&"mass"in o&&"friction"in o&&"velocity"in o&&"precision"in o:!1)?Object.values(o).every(i=>u.checkType(Number,i)&&i>=0):null;return!r&&e&&bu(e),!s&&r&&wb(e),s?t[e]:t.default},Lv=e=>{let{config:t}=he.get("spring"),r=e&&e in t;return!r&&e&&bu(e),r},Iu=e=>{let t=u.checkType(Object,e)&&Object.values(e).every(r=>u.checkType(Number,r)&&r>=0);return!t&&e&&Eb(),t?e:{}},Mu=e=>{let r=u.checkType(Function,e)?e():e,o=u.checkType(Number,r);return!o&&e&&Ab(e),o?r:he.get("tween").duration},Rt=(e,t)=>{let r=u.checkType(Boolean,e);return!r&&e&&vu(e,t),r&&e===!0},de=(e,t,r)=>{let o=u.checkType(Boolean,e);return!o&&e&&vu(e,t),o?e:r},Va=(e,t,r)=>{let o=u.checkType(String,e);return!o&&e&&jb(e,t),o?e:r},Nt=(e,t,r)=>{let o=u.checkType(Number,e);return!o&&e&&zb(e,t),o?e:r},mt=(e,t,r)=>{let o=u.checkType(Function,e);return!o&&e&&Hb(e,t),o?e:r},Dv=(e,t,r)=>{let o=u.checkType(Array,e);return!o&&e&&Ub(e,t),o?e:r},Wa=e=>{let t=u.checkType(Number,e)&&e>0&&e<=1;return!t&&e&&Gb(),t?e:he.get("lerp").velocity},ja=e=>{let t=u.checkType(Number,e);return!t&&e&&qb(),t?e:he.get("lerp").precision},Fv=(e,t)=>{let r=u.checkType(String,e);return!r&&e&&Jb(t),r},Bs=e=>{let t=u.checkType(Number,e);return!t&&e&&Xb(),t?e:void 0},Vs=e=>{let t=e?.getType?.()&&(e.getType()==="LERP"||e.getType()==="SPRING"||e.getType()==="TWEEN");return!t&&e&&Yb(),t},Bv=(e,t)=>{e===-1&&Kb(t)},io=(e,t,r)=>{let o=u.checkType(Function,e);return!o&&e&&vv(r,e),o?e:t},Vv=e=>{let t=u.checkType(Function,e);return!t&&e&&Qb(e),t?e:({resolve:r})=>{r()}},Wv=e=>{let t=u.checkType(Array,e);return!t&&e&&vb(e),t},jv=e=>{let t=u.checkType(String,e);return!t&&e&&yb(e),t},$n=(e,t=!1)=>{let o=u.checkType(Element,e)?e:document.querySelector(e);return t?o??globalThis:o??document.createElement("div")},ku=e=>u.checkType(Element,e)?e:document.querySelector(e),Ws=(e,t)=>{if(!e)return b.DIRECTION_VERTICAL;let o=[b.DIRECTION_VERTICAL,b.DIRECTION_HORIZONTAL].includes(e);return!o&&e&&Zb(e,t),o?e:b.DIRECTION_VERTICAL},Ru=(e,t)=>{let r=[b.POSITION_TOP,b.POSITION_LEFT,b.POSITION_RIGHT,b.POSITION_BOTTOM],o=u.checkType(Object,e),n=o&&u.checkType(String,e?.position)&&r.includes(e.position),s=o&&u.checkType(Function,e.value)&&u.checkType(Number,e.value()),i=o&&n&&s;return i||ev(t),i?e:null},zv=e=>{let t=u.checkType(Function,e)&&u.checkType(Number,e?.());return!t&&e&&tv(),t?e:void 0},Hv=e=>{let t=e?.getType?.()&&(e.getType()===b.TWEEN_TWEEN||e.getType()===b.TWEEN_TIMELINE);return!t&&e&&rv(),t?e:{}},Uv=e=>{if(!e&&e!==0)return b.ALIGN_CENTER;let t=[b.ALIGN_START,b.ALIGN_TOP,b.ALIGN_RIGHT,b.ALIGN_CENTER,b.ALIGN_BOTTOM,b.ALIGN_LEFT,b.ALIGN_END],r=t.includes(e)||u.checkType(Number,e);return!r&&e&&ov(e,t),r?e:b.ALIGN_CENTER},Gv=e=>{if(!e)return!1;let t=[b.IN_BACK,b.IN_STOP,b.OUT_BACK,b.OUT_STOP],r=t.includes(e);return!r&&e&&nv(e,t),r?e:!1},Nu=(e,t,r)=>{if(e==null)return r;let o=u.checkType(Number,e);return!o&&e&&sv(e,t),o?e:r},qv=e=>{if(!e)return b.TYPE_PARALLAX;let t=e?.toLowerCase(),r=[b.TYPE_PARALLAX,b.TYPE_SCROLLTRIGGER],o=r.includes(t);return!o&&t&&iv(t,r),o?t:b.TYPE_PARALLAX},Jv=(e,t)=>(()=>{if(t===b.TYPE_PARALLAX){let o=Sv(e),n=u.checkType(Number,Number(e))&&o&&e>=0&&e<10;return!n&&e&&mv(e),n?10-e:10-he.get("parallax").defaultRange}else{let o=u.checkType(String,e);return!o&&e&&hv(e),o?e:"0px"}})(),Do=(e,t,r)=>{let o=he.get("defaultMq").value;if(!e)return o;let n=he.get("mq"),s=Object.keys(n),i=u.checkType(String,e)&&s.includes(e);return!i&&e&&yu(e,s,t,r),i?e:o},Fo=(e,t,r)=>{let o=he.get("defaultMq").type;if(!e)return o;let n=[ab,$s],s=u.checkType(String,e)&&n.includes(e);return!s&&e&&yu(e,n,t,r),s?e:o},Yv=(e,t,r,o)=>{if(!e&&o)return{propierties:b.PROP_VERTICAL,shouldTrackOnlyEvents:!0};if(!e&&r)return{propierties:b.PROP_VERTICAL,shouldTrackOnlyEvents:!1};let n=t===b.TYPE_SCROLLTRIGGER&&!e,s=[b.PROP_VERTICAL,b.PROP_HORIZONTAL,b.PROP_ROTATE,b.PROP_ROTATEY,b.PROP_ROTATEX,b.PROP_ROTATEZ,b.PROP_OPACITY,b.PROP_SCALE,b.PROP_SCALE_X,b.PROP_SCALE_Y,b.PROP_TWEEN],i=u.checkType(String,e);!i&&e&&av(e,s);let a=t===b.TYPE_PARALLAX&&e===b.PROP_TWEEN&&!r;!r&&!o&&e===b.PROP_TWEEN&&gv(),(r||o)&&e!==b.PROP_TWEEN&&bv(),a&&dv();let c=a?b.PROP_VERTICAL:e,l=xv(c);return{propierties:i?l??b.PROP_VERTICAL:b.PROP_VERTICAL,shouldTrackOnlyEvents:n}},Xv=e=>{if(!e)return b.EASE_LERP;let t=[b.EASE_SPRING,b.EASE_LERP],r=t.includes(e);r||cv(e,t);let o=r?e:b.EASE_LERP;return r?e:o},za=(e,t)=>{let r=[b.EASE_SPRING,b.EASE_LERP],o=r.includes(e);return!o&&e&&lv(e,r,t),o?e:b.EASE_LERP},Kv=(e,t)=>{let r=t===b.TYPE_PARALLAX?he.get("parallax").springConfig:he.get("scrollTrigger").springConfig;if(!e)return r;let o=he.get("spring").config,n=Object.keys(o),s=n.includes(e);return!s&&e&&pv(e,n),s?e:r},Qv=(e,t)=>{let r=u.checkType(Number,Number(e))&&e>0&&e<=1;!r&&e&&fv();let o=t===b.TYPE_PARALLAX?he.get("parallax").lerpConfig:he.get("scrollTrigger").lerpConfig;return r?e:o},Zv=(e,t)=>{let r=[b.PX,b.VW,b.VH,b.WPERCENT,b.HPERCENT];if(t===b.PROP_VERTICAL||t===b.PROP_HORIZONTAL){let n=Su(r,e);return n||Tu(e,t,r),n?e:"0px"}if(t===b.PROP_ROTATE||t===b.PROP_ROTATEX||t===b.PROP_ROTATEY||t===b.PROP_ROTATEZ){let n=Su([b.DEGREE],e);return n||Tu(e,t,[b.DEGREE]),n?e:"0"}if(t===b.PROP_SCALE||t===b.PROP_SCALE_X||t===b.PROP_SCALE_Y){let n=_u(e);return n||Tv(e,t),n?e:"0"}let o=_u(e);return o||yv(t),o?e:"0"};var Ha=e=>{let{instantFps:t}=u.store.get(),r=Math.round(e*(t/60));return e===1&&r===0?e:r},Pt=e=>({type:$v(e?.stagger?.type)?e.stagger.type:Pn.type,each:kv(e?.stagger?.each)?e.stagger.each:Pn.each,from:Rv(e?.stagger?.from)?e?.stagger?.from:Oo,grid:{col:Eu(e?.stagger?.grid?.col)?e.stagger.grid.col:Pn.grid.col,row:Eu(e?.stagger?.grid?.row)?e.stagger.grid.row:Pn.grid.row,direction:Nv(e?.stagger?.grid?.direction)?e.stagger.grid.direction:"col"},waitComplete:Pv(e?.stagger?.waitComplete)?e.stagger.waitComplete:Pn.waitComplete}),or=(e,t)=>e.length>t.length?e:t;var js=e=>e%2,tI=e=>Math.floor(Math.random()*e),rI=(e,t,r)=>{let o=new Set(e.slice(0,r).map(i=>i.frame));return e.map((i,a)=>a*t).filter(i=>!o.has(i))},oI=(e,t,r,o=[])=>{let{from:n,each:s}=r,i=Ha(s);if(n===Nn)return{index:e,frame:o[tI(o.length)]};if(n===tr)return{index:e,frame:e*i};if(n==="end")return{index:e,frame:(t-1-e)*i};if(n===kn){let a=Math.trunc(t/2);return e>a?{index:e,frame:(e-a)*i}:e<a?js(t)===0&&a-e===1?{index:e,frame:0}:js(t)===0?{index:e,frame:(a-e-1)*i}:{index:e,frame:(a-e)*i}:{index:e,frame:0}}if(n===Rn){let a=Math.trunc(t/2);return e>a?{index:e,frame:(t-a-1-(e-a))*i}:e<a?js(t)===0&&a-e===1?{index:e,frame:(a-1)*i}:js(t)===0?{index:e,frame:(t-a-(a-e))*i}:{index:e,frame:(t-a-1-(a-e))*i}:js(t)?{index:e,frame:a*i}:{index:e,frame:(a-1)*i}}if(n&&Re(Number,n)){let a=n>=t?t-1:n;return e>a?{index:e,frame:(e-a)*s}:e<a?{index:e,frame:(a-e)*s}:{index:e,frame:0}}return{index:0,frame:0}},ey=(e,t,r)=>{if(t.grid.direction==="row"){let o=Ds(e,r);return[...[...Array.from({length:t.grid.col}).keys()].reduce((s,i,a)=>[...s,...pb(o,a)],[])].flat()}else return e},ty=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=r?.grid?.col<=1?e.length:r.grid.col,i=r?.grid?.row<=1?e.length:r.grid.row,c=ey(e,r,s).map(y=>y&&y!==void 0?y:{index:0,frame:0}),p=ey(t,r,s).map(y=>y&&y!==void 0?y:{index:0,frame:0}),h=r.grid.direction==="row"?i:s,f=Ds(c,h),d=f[0];return d.forEach((y,T)=>{let{index:S,frame:_}=oI(T,f[0].length,r,rI(d,r.each,T));y.index=S,y.frame=_,_>=o.frame&&(o={index:S,frame:_}),_<=n.frame&&(n={index:S,frame:_})}),f.forEach(y=>{y.forEach((T,S)=>{T&&(T.index=f[0][S].index,T.frame=f[0][S].frame)})}),f.flat().forEach((y,T)=>{c[T].index=y.index,c[T].frame=y.frame,p.length>0&&(p[T].index=y.index,p[T].frame=y.frame)}),{staggerArray:c,staggerArrayOnComplete:p,fastestStagger:n,slowlestStagger:o}};var nI=(e,t,r)=>e.reduce((o,n,s)=>{let i=Math.abs(s-r),a=n.reduce((c,l,p)=>p<t-i||p>t+i?c:[...c,l],[]);return[...o,a]},[]),sI=(e,t,r,o)=>e.reduce((n,s,i)=>{let a=Math.abs(i-r),c=[];if(i>=r&&i<=r*2)return[...n,c];let l=t-a,p=t+a;for(let f=0;f<a;f++)Ua(o,r+f,l)&&c.push(o[r+f][l]),Ua(o,r+f,p)&&c.push(o[r+f][p]),f>0&&(Ua(o,r-f,l)&&c.push(o[r-f][l]),Ua(o,r-f,p)&&c.push(o[r-f][p]));let h=c.filter(f=>f!=null);return[...n,h]},[]),Ua=(e,t,r)=>e[t]!==void 0&&e[t][r]!==void 0,Pu=(e,t)=>{let{col:r}=t.grid,{x:o,y:n}=t.from,s=Ds(e,r);[...Array.from({length:r}).keys()].forEach(()=>{s.push([])});let i=nI(s,o,n),a=sI(i,o,n,s),c=i.reduce((d,v,y)=>{let T=[...i[y],...a[y]];return d.push(T),d},[]),l=c.length;return{cleanArray:((n>=l/2?mb:gu)===gu?c.reduce((d,v,y)=>{if(y<n)return d;if(y===n){let T=[...c[y]];return d.push(T),d}else{let T=c[n-(y-n)]??[],S=[...c[y],...T];return d.push(S),d}},[]):c.reduce((d,v,y)=>{if(y>n)return d;if(y===n){let T=[...c[y]];return d.push(T),d}else{let T=c[n+(n-y)]??[],S=[...c[y],...T];return d.push(S),d}},[]).toReversed()).reduce((d,v)=>v.length===0?d:[...d,v],[])}};var iI=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{u.checkType(Object,r?.from)||(r.from={}),u.checkType(Number,r?.from?.x)||(r.from={...r.from,x:0}),u.checkType(Number,r?.from?.y)||(r.from={...r.from,y:0});let{cleanArray:s}=Pu(e,r),i=0;s.forEach((p,h)=>{p.forEach(f=>{let d=Ha(r.each),v=h*d;f.index=i,f.frame=v,v>=o.frame&&(o={index:i,frame:v}),v<=n.frame&&(n={index:i,frame:v}),i++})});let a=(()=>{if(t.length>0){let{cleanArray:p}=Pu(t,r);return p.flat()}else return[]})(),c=s.flat(),l=a.flat();return c.forEach((p,h)=>{l.length>0&&(l[h].index=p.index,l[h].frame=p.frame)}),{staggerArray:c,staggerArrayOnComplete:l,fastestStagger:n,slowlestStagger:o}},aI=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=[tr,"end",kn,Rn,Nn];return(!u.checkType(String,r?.from)&&!u.checkType(Number,r?.from)||u.checkType(String,r?.from)&&!s.includes(r?.from))&&(Rb(),r.from=tr),ty({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})},At=({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=r?.grid?.direction===Pa?iI({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n}):aI({arrayDefault:e,arrayOnStop:t,stagger:r,slowlestStagger:o,fastestStagger:n}),i=s.staggerArray,a=s.staggerArrayOnComplete,c=s.fastestStagger,l=s.slowlestStagger;return{staggerArray:i,staggerArrayOnComplete:a,fastestStagger:c,slowlestStagger:l}};var Ln=({stagger:e,callback:t,callbackCache:r,callBackObject:o,useStagger:n})=>{if(e.each===0||!n){u.useFrame(()=>{t.forEach(({cb:s})=>{s(o)})}),u.useFrame(()=>{r.forEach(({cb:s})=>{u.useCache.fireObject({id:s,obj:o})})});return}t.forEach(({cb:s,frame:i})=>{u.useFrameIndex(()=>{s(o)},i)}),r.forEach(({cb:s,frame:i})=>{u.useCache.update({id:s,callBackObject:o,frame:i})})},Dn=({onComplete:e,callback:t,callbackCache:r,callbackOnComplete:o,callBackObject:n,stagger:s,slowlestStagger:i,fastestStagger:a,useStagger:c})=>{if(s.each===0||!c){e(),u.useNextFrame(()=>{t.forEach(({cb:l})=>{l(n)}),r.forEach(({cb:l})=>{u.useCache.fireObject({id:l,obj:n})}),o.forEach(({cb:l})=>{l(n)})});return}t.forEach(({cb:l,frame:p},h)=>{u.useFrameIndex(()=>{if(s.waitComplete){h===i.index&&(l(n),e());return}h===a.index&&(l(n),e())},p)}),r.forEach(({cb:l,frame:p},h)=>{u.useFrameIndex(()=>{if(s.waitComplete){h===i.index&&(u.useCache.fireObject({id:l,obj:n}),e());return}h===a.index&&(u.useCache.fireObject({id:l,obj:n}),e())},p)}),o.forEach(({cb:l,frame:p})=>{u.useFrameIndex(()=>{l(n)},p+1)})};var ct=(e,t)=>{let r=u.getUnivoqueId();return{arrayOfCallbackUpdated:[...t,{cb:e,id:r,index:-1,frame:-1}],unsubscribeCb:o=>o.map(({id:n,cb:s,index:i,frame:a})=>n===r?{id:n,cb:()=>{},index:i,frame:a}:{id:n,cb:s,index:i,frame:a})}},nr=(e,t,r)=>{let o=u.getUnivoqueId(),{id:n,unsubscribe:s}=u.useCache.add(e);return{arrayOfCallbackUpdated:[...t,{cb:n,id:o,index:-1,frame:-1}],unsubscribeCache:[...r,s],unsubscribeCb:i=>(s(),i.map(({id:a,cb:c,index:l,frame:p})=>a===o?{id:a,cb:"",index:l,frame:p}:{id:a,cb:c,index:l,frame:p}))}};var ao=e=>Object.keys(e).map(t=>{if(!jt(e[t]))return wr(`${t}: ${e[t]}`),{prop:t,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let r=u.checkType(Number,e[t])?e[t]:e[t]?.()??0;return{prop:t,toValue:r,toFn:e[t],toIsFn:u.checkType(Function,e[t]),settled:!1}}),Fn=e=>Object.keys(e).map(t=>{if(!jt(e[t]))return wr(`${t}: ${e[t]}`),{prop:t,fromValue:0,currentValue:0,fromFn:()=>0,fromIsFn:!1,settled:!1};let r=u.checkType(Number,e[t])?e[t]:e[t]?.()??0;return{prop:t,fromValue:r,currentValue:r,fromFn:e[t],fromIsFn:u.checkType(Function,e[t]),settled:!1}}),Bn=(e,t)=>Object.keys(e).map(r=>{if(!jt(t[r])||!jt(e[r]))return wr(`${r}: ${t[r]} || ${r}: ${e[r]}`),{prop:r,fromValue:0,fromFn:()=>0,fromIsFn:!1,currentValue:0,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let o=u.checkType(Number,e[r])?e[r]:e[r]?.()??0,n=u.checkType(Number,t[r])?t[r]:t[r]?.()??0;return{prop:r,fromValue:o,fromFn:e[r],fromIsFn:u.checkType(Function,e[r]),currentValue:o,toValue:n,toFn:t[r],toIsFn:u.checkType(Function,t[r]),settled:!1}}),Ir=e=>Object.keys(e).map(t=>{if(!jt(e[t]))return wr(`${t}: ${e[t]}`),{prop:t,fromValue:0,fromFn:()=>0,fromIsFn:!1,currentValue:0,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let r=u.checkType(Number,e[t])?e[t]:e[t]?.()??0;return{prop:t,fromValue:r,fromFn:e[t],fromIsFn:u.checkType(Function,e[t]),currentValue:r,toValue:r,toFn:e[t],toIsFn:u.checkType(Function,e[t]),settled:!1}});var Vn=({validationFunction:e,defaultRafInit:t})=>{u.useFrame(()=>{u.useNextTick(({time:r,fps:o})=>{let n=e.findLast(({validation:s})=>s());if(t(r,o),n){n?.callback(),console.log("custom tween run function extrecuted");return}})})};var co=(e,t)=>{console.log(`stagger on ${e} loaded at: ${t} fps`)};var Wn=(e,t,r,o)=>(u.checkType(Number,e)||Aa(),e>0&&t&&(r.length>0||o.length>0));var Ga=e=>{u.useFrame(()=>{u.useNextTick(({time:t,fps:r})=>{e(t,r)})})};var Fe=(e,t)=>Object.fromEntries(e.map(r=>{let o=r[t];return[r.prop,typeof o=="number"?o:Number.parseFloat(o)]})),jn=e=>e.map(t=>t.toIsFn?{[t.prop]:t.toFn}:{[t.prop]:Number.parseFloat(t.toValue)}).reduce((t,r)=>({...t,...r}),{}),zn=e=>e.map(t=>t.fromIsFn?{[t.prop]:t.fromFn}:{[t.prop]:Number.parseFloat(t.fromValue)}).reduce((t,r)=>({...t,...r}),{});var Hn=(e,t)=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o}:r}),Au=(e,t)=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o,shouldUpdate:!0}:{...r,shouldUpdate:!1}});var ry=({values:e,tension:t,friction:r,mass:o,precision:n,fps:s})=>e.map(i=>{let{currentValue:a,toValue:c,velocity:l}=i,p=-t*(a-c),h=-r*l,f=(p+h)/o,d=l+f*1/s,v=a+d*1/s,y=_e(v),T=Math.abs(d)<=.1,S=t===0?!0:Math.abs(c-y)<=n;return T&&S?{...i,currentValue:c,velocity:d,settled:!0}:{...i,currentValue:y,velocity:d,settled:!1}});var Tt=class{#s;#o;#i;#c;#h;#l;#n;#u;#r;#e;#m;#a;#d;#f;#t;#g;#p;#x;#S;#y;#b;#T;#R;constructor(t){this.#s=Pt(t??{}),this.#o=so(t?.relative,"spring"),this.#i=wu(t?.config),this.updateConfigProp(t?.configProps??{}),this.#c=u.getUnivoqueId(),this.#h=!1,this.#l=void 0,this.#n=void 0,this.#u=void 0,this.#r=[],this.#e=[],this.#m=[],this.#a=[],this.#d=[],this.#f=[],this.#t=[],this.#g=!1,this.#p=!0,this.#x=!0,this.#S=!1,this.#y=!1,this.#b={reverse:!1,configProps:this.#i,relative:this.#o,immediate:!1},this.#T=Xe,this.#R=Xe;let r=t?.data;r&&this.setData(r)}#I(t,r,o,n,s,i){this.#h=!0,this.#r=ry({values:this.#r,tension:o,friction:n,mass:s,precision:i,fps:r});let a=Fe(this.#r,"currentValue");if(this.#g||Ln({stagger:this.#s,callback:this.#m,callbackCache:this.#a,callBackObject:a,useStagger:this.#x}),this.#r.every(l=>l.settled===!0)){let l=()=>{for(let h of this.#r)h.fromValue=h.toValue;this.#l?.(!0),this.#u=void 0,this.#n=void 0,this.#l=void 0,this.#g=!1,this.#h=!1},p=Fe(this.#r,"toValue");Dn({onComplete:l,callback:this.#m,callbackCache:this.#a,callbackOnComplete:this.#d,callBackObject:p,stagger:this.#s,slowlestStagger:this.#T,fastestStagger:this.#R,useStagger:this.#x});return}u.useFrame(()=>{u.useNextTick(({time:l,fps:p})=>{this.#h&&this.#I(l,p,o,n,s,i)})})}#M(t,r){for(let a of this.#r)a.velocity=Math.trunc(this.#i.velocity);let o=this.#i.tension,n=this.#i.friction,s=Math.max(1,this.#i.mass),i=this.#i.precision;this.#I(t,r,o,n,s,i)}async#w(){if(Wn(this.#s.each,this.#p,this.#a,this.#m)){let{averageFPS:t}=await u.useFps();co("spring",t);let r=or(this.#a,this.#m);if(this.#s.grid.col>r.length){kt(r.length),this.#p=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=At({arrayDefault:r,arrayOnStop:this.#d,stagger:this.#s,slowlestStagger:this.#T,fastestStagger:this.#R});this.#a.length>this.#m.length?this.#a=o:this.#m=o,this.#d=n,this.#T=i,this.#R=s,this.#p=!1}return{ready:!0}}async#P(t,r){this.#y||(this.#l=t,this.#n=r,this.#p&&(this.#y=!0,await this.#w(),this.#y=!1),Vn({validationFunction:this.#f,defaultRafInit:(o,n)=>this.#M(o,n)}))}clearCurretPromise(){this.#g||(this.#n?.(u.ANIMATION_STOP_REJECT),this.#u=void 0,this.#n=void 0,this.#l=void 0,this.#h=!1)}stop({clearCache:t=!0,updateValues:r=!0}={}){this.#g&&(this.#g=!1),r&&(this.#r=In(this.#r)),this.unFreezeStagger(),t&&this.#a.forEach(({cb:o})=>u.useCache.clean(o)),this.#n&&(this.#n(u.ANIMATION_STOP_REJECT),this.#u=void 0,this.#n=void 0,this.#l=void 0),this.#h=!1}freezeStagger(){this.#S||(this.#a.forEach(({cb:t})=>u.useCache.freeze(t)),this.#S=!0)}unFreezeStagger({updateFrame:t=!0}={}){this.#S&&(this.#a.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:t})),this.#S=!1)}pause(){this.#g||(this.#g=!0,this.#h=!1,this.#r=Na(this.#r),this.freezeStagger())}resume(){this.#g&&(this.#g=!1,this.unFreezeStagger(),!this.#h&&this.#l&&Ga((t,r)=>this.#M(t,r)))}setData(t){this.#r=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,fromValue:n,velocity:this.#i.velocity,currentValue:n,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#e=this.#r.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#r=it(this.#r,this.#e)}#A(t){let o=he.get("spring").config,n=Lv(t?.config)?o?.[t?.config??"default"]??Po.default:this.#b.configProps,s=Iu(t?.configProps),i={...n,...s},a={reverse:t?.reverse??this.#b.reverse,relative:t?.relative??this.#b.relative,immediate:t?.immediate??this.#b.immediate,configProps:i},{relative:c}=a;return this.#i=i,this.#o=c,a}goTo(t,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!0;let o=ao(t);return this.#E(o,t,r)}goFrom(t,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!0;let o=Fn(t);return this.#E(o,t,r)}goFromTo(t,r,o={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);if(this.#x=!0,!ro(t,r))return oo("spring goFromTo:",t,r),new Promise(s=>s);let n=Bn(t,r);return this.#E(n,t,o)}set(t,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#x=!1;let o=Ir(t);return this.#E(o,t,r)}setImmediate(t,r={}){if(this.#h&&this.stop({clearCache:!1,updateValues:!1}),this.#g)return;this.#x=!1;let o=Ir(t);this.#r=Hn(o,this.#r);let{reverse:n}=this.#A(r??{});Rt(n,"reverse")&&(this.#r=Cr(t,this.#r)),this.#r=Mn(this.#r,this.#o),this.#r=xr(this.#r)}#E(t,r,o={}){this.#r=Hn(t,this.#r);let{reverse:n,immediate:s}=this.#A(o);if(Rt(n,"reverse")&&(this.#r=Cr(r,this.#r)),this.#r=Mn(this.#r,this.#o),Rt(s,"immediate "))return this.#h&&this.stop({updateValues:!1}),this.#r=xr(this.#r),Promise.resolve();let i=!this.#h&&!this.#u;return i&&(this.#u=new Promise((a,c)=>{this.#P(a,c)})),i&&this.#u?this.#u:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return Fe(this.#r,"currentValue")}getInitialData(){return Fe(this.#e,"currentValue")}getFrom(){return Fe(this.#r,"fromValue")}getTo(){return Fe(this.#r,"toValue")}getFromNativeType(){return zn(this.#r)}getToNativeType(){return jn(this.#r)}getType(){return"SPRING"}getId(){return this.#c}isActive(){return this.#h}updateConfigProp(t={}){let r=Iu(t);this.#i={...this.#i,...r},this.#b=it(this.#b,{configProps:r})}updateConfig(t){this.#i=wu(t),this.#b=it(this.#b,{configProps:this.#i})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#m);return this.#m=r,()=>this.#m=o(this.#m)}subscribeCache(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=nr(t,this.#a,this.#t);return this.#a=r,this.#t=n,()=>this.#a=o(this.#a)}validateInitialization({validation:t,callback:r}){let o=[...this.#f,{validation:t,callback:r}];return this.#f=o,()=>this.#f=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#d);return this.#d=r,()=>this.#d=o(this.#d)}destroy(){this.#u&&this.stop(),this.#d=[],this.#f=[],this.#m=[],this.#a=[],this.#r=[],this.#u=void 0,this.#t.forEach(t=>t()),this.#t=[]}};var qa=0,Ja=0,zs=0,Gs=!1,Ya=0,Xa=0,qs=!1,Bo=1,Vo=1,Wo=1,Js=1,Ys=!1,Qa=0,Za=0,Un=2,cI=.6,lI=60,Mr=Un,uI=.1,Ka=!1,Hs=null,pI=200,mI=120,lo=null,Ou=()=>{},$u=()=>{},Lu=()=>{},sr,Us=new Map,hI=e=>{if(e<=1)return Un;let t=Math.exp((e-1)*cI);return Math.min(Un*t,lI)},dI=({clientX:e,clientY:t})=>{if(!sr)return;Ya=e,Xa=t;let r=e-qa,o=t-Ja,n=u.getTime(),s=n-zs;if(Gs||s===0){qa=e,Ja=t,zs=n,Bo=1,Vo=1,Wo=1,Mr=Un,sr.goTo({speed:1,speedX:1,speedY:1});return}let i=Math.hypot(r,o);Js+=i;let a=r/s,c=o/s,l=Math.hypot(a,c),p=hI(l);p>Mr?Mr=p:Mr+=(p-Mr)*uI,Math.abs(r)>Mr&&(Qa=Math.sign(r)),Math.abs(o)>Mr&&(Za=Math.sign(o)),Bo=Math.max(1,Math.round((l+1)*1e4)/1e4),Vo=Math.max(1,Math.round((Math.abs(a)+1)*1e4)/1e4),Wo=Math.max(1,Math.round((Math.abs(c)+1)*1e4)/1e4),sr.goTo({speed:Bo,speedX:Vo,speedY:Wo}),qa=e,Ja=t,zs=n},ny=()=>{Ou=u.usePointerMove(()=>{Ou(),zs=u.getTime(),Ys=!1,lo?(clearTimeout(lo),lo=null):(Js=1,qs=!1),Gs=!0})},sy=()=>{Lu=u.usePointerMove(e=>{dI(e),Gs&&(Gs=!1)})},oy=()=>{Hs&&(clearTimeout(Hs),Hs=null)},fI=()=>{sr&&(sr.goTo({speed:1,speedX:1,speedY:1}),Qa=0,Za=0,Mr=Un,lo=setTimeout(()=>{lo=null,Ys=!0,Bo=1,Vo=1,Wo=1,qs=!0},mI),Lu(),$u(),ny(),sy(),iy())},iy=()=>{oy();let e=()=>{oy(),Hs=setTimeout(()=>{Hs=null,fI()},pI)};$u=u.usePointerMove(e)},gI=()=>{Ka||(Ka=!0,ny(),sy(),iy(),sr=new Tt({data:{speed:1,speedX:1,speedY:1}}),sr.subscribe(({speed:e,speedX:t,speedY:r})=>{u.useNextTick(()=>{for(let o of Us.values())o({speed:e,speedX:t,speedY:r,clientX:Ya,clientY:Xa,directionX:Qa,directionY:Za,distance:Js,completed:Ys,pointerEnd:qs,rawSpeed:Bo,rawSpeedX:Vo,rawSpeedY:Wo})})}),sr.onComplete(({speed:e,speedX:t,speedY:r})=>{u.useNextTick(()=>{for(let o of Us.values())o({speed:e,speedX:t,speedY:r,clientX:Ya,clientY:Xa,directionX:0,directionY:0,distance:Js,completed:Ys,pointerEnd:qs,rawSpeed:Bo,rawSpeedX:Vo,rawSpeedY:Wo})})}))},bI=e=>{if(globalThis.window===void 0)return()=>{};let t=we();return Us.set(t,e),gI(),()=>{Us.delete(t),Us.size===0&&Ka&&(lo&&(clearTimeout(lo),lo=null),Ou(),$u(),Lu(),sr.destroy(),sr=null,Ka=!1,qa=0,Ja=0,zs=0,Gs=!1,Qa=0,Za=0,Ya=0,Xa=0,Mr=Un,Js=1,Ys=!1,qs=!1,Bo=1,Vo=1,Wo=1)}},ay=bI;function vI(e){he.set(e)}function yI(e){return he.get(e)}function TI(){he.print()}function _I(e=()=>{}){return ay(e)}function SI(e,t){switch(e){case"min":return ve.min(t);case"max":return ve.max(t);case"get":return ve.getBreackpoint(t)}}var U={};To(U,{createLerp:()=>NI,createMasterSequencer:()=>II,createScrollerTween:()=>EI,createSequencer:()=>wI,createSpring:()=>RI,createStaggers:()=>MI,createTimeTween:()=>kI});var cy=({values:e,fps:t,velocity:r,precision:o})=>e.map(n=>{if(n.settled)return n;let{currentValue:s,toValue:i}=n,a=ub(s,i,r/t*60),c=_e(a);return Math.round(Math.abs(i-c)*1e4)/1e4<=o?{...n,currentValue:i,settled:!0}:{...n,currentValue:c,settled:!1}});var kr=class{#s;#o;#i;#c;#h;#l;#n;#u;#r;#e;#m;#a;#d;#f;#t;#g;#p;#x;#S;#y;#b;#T;#R;#I;constructor(t){this.#s=Pt(t??{}),this.#o=so(t?.relative,"lerp"),this.#i=Wa(t?.velocity),this.#c=ja(t?.precision),this.#h=u.getUnivoqueId(),this.#l=!1,this.#n=void 0,this.#u=void 0,this.#r=void 0,this.#e=[],this.#m=[],this.#a=[],this.#d=[],this.#f=[],this.#t=[],this.#g=[],this.#p=!1,this.#x=!0,this.#S=!0,this.#y=!1,this.#b=!1,this.#T={reverse:!1,velocity:this.#i,precision:this.#c,relative:this.#o,immediate:!1},this.#R=Xe,this.#I=Xe;let r=t?.data;r&&this.setData(r)}#M(t,r){this.#l=!0,this.#e=cy({values:this.#e,fps:r,velocity:this.#i,precision:this.#c});let o=Fe(this.#e,"currentValue");if(this.#p||Ln({stagger:this.#s,callback:this.#a,callbackCache:this.#d,callBackObject:o,useStagger:this.#S}),this.#e.every(s=>s.settled===!0)){let s=()=>{this.#l=!1;for(let a of this.#e)a.fromValue=a.toValue;this.#n?.(!0),this.#r=void 0,this.#u=void 0,this.#n=void 0,this.#p=!1,this.#l=!1},i=Fe(this.#e,"toValue");Dn({onComplete:s,callback:this.#a,callbackCache:this.#d,callbackOnComplete:this.#f,callBackObject:i,stagger:this.#s,slowlestStagger:this.#R,fastestStagger:this.#I,useStagger:this.#S});return}u.useFrame(()=>{u.useNextTick(({time:s,fps:i})=>{this.#l&&this.#M(s,i)})})}#w(t,r){this.#M(t,r)}async#P(){if(Wn(this.#s.each,this.#x,this.#d,this.#a)){let{averageFPS:t}=await u.useFps();co("lerp",t);let r=or(this.#d,this.#a);if(this.#s.grid.col>r.length){kt(r.length),this.#x=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=At({arrayDefault:r,arrayOnStop:this.#f,stagger:this.#s,slowlestStagger:this.#R,fastestStagger:this.#I});this.#d.length>this.#a.length?this.#d=o:this.#a=o,this.#f=n,this.#R=i,this.#I=s,this.#x=!1}return{ready:!0}}async#A(t,r){this.#b||(this.#n=t,this.#u=r,this.#x&&(this.#b=!0,await this.#P(),this.#b=!1),Vn({validationFunction:this.#t,defaultRafInit:(o,n)=>this.#w(o,n)}))}clearCurretPromise(){this.#p||(this.#u?.(u.ANIMATION_STOP_REJECT),this.#r=void 0,this.#u=void 0,this.#n=void 0,this.#l=!1)}stop({clearCache:t=!0,updateValues:r=!0}={}){this.#p&&(this.#p=!1),r&&(this.#e=In(this.#e)),this.unFreezeStagger(),t&&this.#d.forEach(({cb:o})=>u.useCache.clean(o)),this.#u&&(this.#u(u.ANIMATION_STOP_REJECT),this.#r=void 0,this.#u=void 0,this.#n=void 0),this.#l=!1}freezeStagger(){this.#y||(this.#d.forEach(({cb:t})=>u.useCache.freeze(t)),this.#y=!0)}unFreezeStagger({updateFrame:t=!0}={}){this.#y&&(this.#d.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:t})),this.#y=!1)}pause(){this.#p||(this.#p=!0,this.#l=!1,this.#e=Na(this.#e),this.freezeStagger())}resume(){this.#p&&(this.#p=!1,this.unFreezeStagger(),!this.#l&&this.#n&&Ga((t,r)=>this.#w(t,r)))}setData(t){this.#e=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,fromValue:n,currentValue:n,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#m=this.#e.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#e=it(this.#e,this.#m)}#E(t){let r={...this.#T,...t},{velocity:o,precision:n,relative:s}=r;return this.#o=so(s,"lerp"),this.#i=Wa(o),this.#c=ja(n),r}goTo(t,r={}){if(this.#p)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#S=!0;let o=ao(t);return this.#F(o,t,r)}goFrom(t,r={}){if(this.#p)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#S=!0;let o=Fn(t);return this.#F(o,t,r)}goFromTo(t,r,o={}){if(this.#p)return Promise.reject(u.ANIMATION_STOP_REJECT);if(this.#S=!0,!ro(t,r))return oo("lerp goFromTo:",t,r),new Promise(s=>s);let n=Bn(t,r);return this.#F(n,t,o)}set(t,r={}){if(this.#p)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#S=!1;let o=Ir(t);return this.#F(o,t,r)}setImmediate(t,r={}){if(this.#l&&this.stop({clearCache:!1,updateValues:!1}),this.#p)return;this.#S=!1;let o=Ir(t);this.#e=Hn(o,this.#e);let{reverse:n}=this.#E(r??{});Rt(n,"reverse")&&(this.#e=Cr(t,this.#e)),this.#e=Mn(this.#e,this.#o),this.#e=xr(this.#e)}#F(t,r,o={}){this.#e=Hn(t,this.#e);let{reverse:n,immediate:s}=this.#E(o??{});if(Rt(n,"reverse")&&(this.#e=Cr(r,this.#e)),this.#e=Mn(this.#e,this.#o),Rt(s,"immediate "))return this.#l&&this.stop({updateValues:!1}),this.#e=xr(this.#e),Promise.resolve();let i=!this.#l&&!this.#r;return i&&(this.#r=new Promise((a,c)=>{this.#A(a,c)})),i&&this.#r?this.#r:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return Fe(this.#e,"currentValue")}getInitialData(){return Fe(this.#m,"currentValue")}getFrom(){return Fe(this.#e,"fromValue")}getTo(){return Fe(this.#e,"toValue")}getFromNativeType(){return zn(this.#e)}getToNativeType(){return jn(this.#e)}getType(){return"LERP"}getId(){return this.#h}isActive(){return this.#l}updateVelocity(t){this.#i=Wa(t),this.#T=it(this.#T,{velocity:this.#i})}updatePrecision(t){this.#i=ja(t),this.#T=it(this.#T,{precision:this.#c})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#a);return this.#a=r,()=>this.#a=o(this.#a)}subscribeCache(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=nr(t,this.#d,this.#g);return this.#d=r,this.#g=n,()=>this.#d=o(this.#d)}validateInitialization({validation:t,callback:r}){let o=[...this.#t,{validation:t,callback:r}];return this.#t=o,()=>this.#t=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#f);return this.#f=r,()=>this.#f=o(this.#f)}destroy(){this.#r&&this.stop(),this.#f=[],this.#t=[],this.#a=[],this.#d=[],this.#e=[],this.#r=void 0,this.#g.forEach(t=>t()),this.#g=[]}};var ec=({each:e,useStagger:t,isLastDraw:r,callBackObject:o,callback:n,callbackCache:s,callbackOnStop:i})=>{e===0||t===!1?(u.useFrame(()=>{n.forEach(({cb:a})=>a(o))}),u.useFrame(()=>{s.forEach(({cb:a})=>{u.useCache.fireObject({id:a,obj:o})})})):(n.forEach(({cb:a,frame:c})=>{u.useFrameIndex(()=>a(o),c)}),s.forEach(({cb:a,frame:c})=>{u.useCache.update({id:a,callBackObject:o,frame:c})})),r&&(e===0||t===!1?u.useFrame(()=>{i.forEach(({cb:a})=>a(o))}):i.forEach(({cb:a,frame:c})=>{u.useFrameIndex(()=>a(o),c+1)}))};var Xs=class{#s;#o;#i;#c;#h;#l;#n;#u;#r;constructor(t){this.#s=Iv(t?.ease),this.#o=no(t?.duration),this.#i=Pt(t),this.#c=[],this.#h=[],this.#l=[],this.#n=[],this.#u=[],this.#r="parallaxTween";let r=t?.from||null;r&&this.setData(r),t?.to&&this.goTo(t.to)}inzializeStagger(){if(this.#i.each>0&&(this.#n.length>0||this.#l.length>0)){let t=or(this.#n,this.#l);if(this.#i.grid.col>t.length){kt(t.length);return}let{staggerArray:r,staggerArrayOnComplete:o}=At({arrayDefault:t,arrayOnStop:this.#h,stagger:this.#i,slowlestStagger:Xe,fastestStagger:Xe});this.#n.length>this.#l.length?this.#n=r:this.#l=r,this.#h=o}}draw({partial:t,isLastDraw:r}){for(let n of this.#c){let{toIsFn:s,toFn:i,toValue:a,fromIsFn:c,fromFn:l,fromValue:p}=n,h=s?i():a,f=c?l():p,d=h-f,v=this.#s(t,f,d,this.#o);n.currentValue=_e(v)}let o=Fe(this.#c,"currentValue");u.useNextTick(()=>{ec({each:this.#i.each,useStagger:!0,isLastDraw:r,callBackObject:o,callback:this.#l,callbackCache:this.#n,callbackOnStop:this.#h})})}setData(t){let r=Object.entries(t);return this.#c=r.map(o=>{let[n,s]=o;return{prop:n,toValue:s,toValProcessed:s,fromValue:s,currentValue:s,settled:!1,fromFn:()=>0,toFn:()=>0}}),this}#e(t){this.#c=this.#c.map(r=>{let o=t.find(n=>n.prop===r.prop);return o?{...r,...o}:{...r}})}goTo(t){let r=ao(t);return this.#e(r),this}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#l);return this.#l=r,()=>this.#l=o(this.#l)}onStop(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#h);return this.#h=r,()=>this.#h=o(this.#h)}subscribeCache(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=nr(t,this.#n,this.#u);return this.#n=r,this.#u=n,()=>this.#n=o(this.#n)}getDuration(){return this.#o}getType(){return this.#r}destroy(){this.#c=[],this.#h=[],this.#l=[],this.#n=[],this.#u.forEach(t=>t()),this.#u=[]}};var Ks=class{#s="sequencer";#o;constructor(){this.#o=[]}draw({partial:t,isLastDraw:r,useFrame:o}){this.#o.forEach(n=>{n.draw({partial:t,isLastDraw:r,useFrame:o})})}add(t){this.#o.push(t)}inzializeStagger(){this.#o.forEach(t=>{t.inzializeStagger()})}setDuration(t){this.#o.forEach(r=>{r.setDuration(t)})}getDuration(){return this.#o.length>0?this.#o[0].getDuration():0}setStretchFactor(t){this.#o.forEach(r=>{r.setStretchFactor(t)})}getLabels(){return this.#o.flatMap(t=>t.getLabels())}resetLastValue(){this.#o.forEach(t=>t.resetLastValue())}disableStagger(){this.#o.forEach(t=>{t.disableStagger()})}cleanCachedId(){this.#o.forEach(t=>{t.cleanCachedId()})}freezeCachedId(){this.#o.forEach(t=>{t.freezeCachedId()})}unFreezeCachedId(){this.#o.forEach(t=>{t.unFreezeCachedId()})}getType(){return this.#s}destroy(){this.#o.forEach(t=>{t.destroy()}),this.#o=[]}};var ly=(e,t)=>Object.keys(e).map(r=>jt(e[r])?{prop:r,toValue:e[r],ease:pt(t)}:(wr(`${r}: ${e[r]}`),{prop:r,toValue:0,ease:pt(t)})),uy=(e,t)=>Object.keys(e).map(r=>jt(e[r])?{prop:r,fromValue:e[r],ease:pt(t)}:(wr(`${r}: ${e[r]}`),{prop:r,fromValue:0,ease:pt(t)})),py=(e,t,r)=>Object.keys(e).map(o=>!jt(t[o])||!jt(e[o])?(wr(`${o}: ${t[o]} || ${o}: ${e[o]}`),{prop:o,fromValue:0,toValue:0,ease:pt(r)}):{prop:o,fromValue:e[o],toValue:t[o],ease:pt(r)});var We={BACKWARD:"backward",FORWARD:"forward",NONE:"none"};var Du={fromValue:{get:"toValue",set:"fromValue"},toValue:{get:"toValue",set:"toValue"}},my=(e,t,r,o)=>e.slice(0,t).reduceRight((n,{values:s})=>{let i=s.find(({prop:a,active:c})=>c&&a===r);return i&&!n&&n!==0?i[Du[o].get]:n},void 0),hy=(e,t,r,o)=>{for(let n=t+1;n<e.length;n++){let{start:s,values:i}=e[n];for(let a of i)if(a.prop===r&&a.active&&s<=o)return!1}return!0};var dy=({timeline:e,valuesState:t,partial:r})=>{for(let o of t){o.settled=!1;let n=null;for(let T=0;T<e.length;T++){let{start:S,end:_,values:w}=e[T],x=null;for(let P of w)if(P.prop===o.prop){x=P;break}if(!x||!x.active)continue;let{prop:E}=x;if(hy(e,T,E,r)){n={toValue:x.toValue,fromValue:x.fromValue,start:S,end:_,ease:x.ease};break}}if(!n)continue;let{start:s,end:i,toValue:a,fromValue:c,ease:l}=n,p=u.checkType(Number,a)?a:a(),h=u.checkType(Number,c)?c:c(),f=i-s,d=r<i?h:p,v;r>=s&&r<=i?v=l(r-s,h,p-h,f):v=d;let y=Number.isNaN(v)?d:v;o.currentValue=_e(y),o.settled=!0}return t};var Fu=({timeline:e,activeProp:t})=>e.map((r,o)=>{let{values:n,propToFind:s}=r,i=n.map(a=>{let{prop:c,active:l}=a;if(!l||!t.includes(c)||!s||s.length===0)return a;let p=my(e,o,c,s);return!p&&p!==0?a:{...a,[Du[s].set]:p}});return{...r,values:i}});var Bu=(e,t)=>e.toSorted((r,o)=>r?.[t]-o?.[t]);var tc=({timeline:e,values:t,start:r,end:o,duration:n,propToFind:s})=>{let i=e.length===0?0:1,a=[...e,{values:t,start:r??0,end:o??n,priority:i,propToFind:s}],c=Bu(a,"start");return Bu(c,"priority")};var rc=({data:e,values:t})=>t.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o,active:!0}:{prop:r.prop,active:!1}});var Qs=class{#s;#o;#i;#c;#h;#l;#n;#u;#r;#e;#m;#a;#d;#f;#t;#g;#p;#x;constructor(t){this.#s=[],this.#o=[],this.#i=[],this.#c=[],this.#h=[],this.#l=[],this.#n=[],this.#u=[],this.#r=no(t?.duration),this.#e="sequencer",this.#m={start:0,end:this.#r,ease:wv(t?.ease)},this.#a=!0,this.#d=!0,this.#f="none",this.#t=0,this.#g=Pt(t),this.#p=!0,this.#x=!1;let r=t?.data||null;r&&this.setData(r)}inzializeStagger(){if(!this.#x){if(this.#g.each>0&&(this.#h.length>0||this.#c.length>0)){let t=or(this.#h,this.#c);if(this.#g.grid.col>t.length){kt(t.length);return}let{staggerArray:r,staggerArrayOnComplete:o}=At({arrayDefault:t,arrayOnStop:this.#l,stagger:this.#g,slowlestStagger:Xe,fastestStagger:Xe});this.#h.length>this.#c.length?this.#h=r:this.#c=r,this.#l=o}this.#x=!0}}draw({partial:t=0,isLastDraw:r=!1,useFrame:o=!1,direction:n=We.NONE}){if(o){this.#S({partial:t,isLastDraw:r,direction:n});return}u.useNextTick(()=>this.#S({partial:t,isLastDraw:r,direction:n}))}#S({partial:t=0,isLastDraw:r=!1,direction:o=We.NONE}){this.#a&&(this.#t=t,this.#y(t)),!this.#a&&this.#t&&(!o||o===We.NONE)&&(this.#f=t>=this.#t?We.FORWARD:We.BACKWARD),!this.#a&&(o===We.BACKWARD||o===We.FORWARD)&&(this.#f=o),this.#s=dy({timeline:this.#o,valuesState:this.#s,partial:t});let n=Fe(this.#s,"currentValue");ec({each:this.#g.each,useStagger:this.#p,isLastDraw:r,callBackObject:n,callback:this.#c,callbackCache:this.#h,callbackOnStop:this.#l}),this.#b(t),this.#p=!0,this.#t=t,this.#a=!1}resetLastValue(){this.#a=!0,this.#t=0}#y(t=0){this.#d&&(this.#n.forEach(({fn:r,time:o})=>{let n={shouldFire:t>=o,direction:We.FORWARD},s={shouldFire:t<=o,direction:We.BACKWARD};if(!(n.shouldFire||s.shouldFire))return;let a=n.shouldFire?n.direction:s.direction;r({direction:a,value:t,isForced:!0})}),this.#d=!1)}#b(t=0){this.#n.forEach(({fn:r,time:o})=>{let n=this.#f===We.FORWARD&&t>o&&this.#t<=o,s=this.#f===We.BACKWARD&&t<o&&this.#t>=o;(n||s)&&r({direction:this.#f,value:t,isForced:!1})})}setStretchFactor(t=0){let r=t/this.#r;this.#o=[...this.#o].map(o=>{let{start:n,end:s}=o;return{...o,start:_e(n*r),end:_e(s*r)}}),this.#i=[...this.#i].map(o=>{let{time:n}=o;return{...o,time:_e(n*r)}}),this.#n=[...this.#n].map(o=>{let{time:n}=o;return{...o,time:_e(n*r)}})}setData(t={}){return this.#s=Object.entries(t).map(r=>{let[o,n]=r,s=Mv(o,n),i=s?n:0;return{prop:s?o:"invalidProp",toValue:i,fromValue:i,currentValue:i,active:!1,settled:!1,ease:pt(he.get("sequencer").ease)}}),this.goTo(t,{start:0,end:0}),this}goTo(t,r){let o={...this.#m,...r},{start:n,end:s,ease:i}=o;if(!La({start:n,end:s}))return this;let a=ly(t,i),c=rc({data:a,values:this.#s}),l=Object.keys(t),p=tc({timeline:this.#o,values:c,start:n,end:s,duration:this.#r,propToFind:"fromValue"});return this.#o=Fu({timeline:p,activeProp:l}),this}goFrom(t,r){let o={...this.#m,...r},{start:n,end:s,ease:i}=o;if(!La({start:n,end:s}))return this;let a=uy(t,i),c=rc({data:a,values:this.#s}),l=Object.keys(t),p=tc({timeline:this.#o,values:c,start:n,end:s,duration:this.#r,propToFind:"toValue"});return this.#o=Fu({timeline:p,activeProp:l}),this}goFromTo(t,r,o){let n={...this.#m,...o},{start:s,end:i,ease:a}=n;if(!La({start:s,end:i}))return this;if(!ro(t,r))return oo("sequencer goFromTo:",t,r),this;let c=py(t,r,a),l=rc({data:c,values:this.#s});return this.#o=tc({timeline:this.#o,values:l,start:s,end:i,duration:this.#r,propToFind:""}),this}label(t="",r=0){return this.#i.push({name:t,time:r}),this}getLabels(){return this.#i}add(t=()=>{},r=0){let o=u.checkType(Function,t),n=u.checkType(Number,r),s=o&&n;return o||xb(t),n||Cb(r),s?(this.#n.push({fn:t,time:r}),this):this}subscribe(t=()=>{}){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#c);return this.#c=r,()=>this.#c=o(this.#c)}onStop(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#l);return this.#l=r,()=>this.#l=o(this.#l)}subscribeCache(t=()=>{}){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=nr(t,this.#h,this.#u);return this.#h=r,this.#u=n,()=>this.#h=o(this.#h)}getDuration(){return this.#r}setDuration(t=0){this.#r=t}getType(){return this.#e}cleanCachedId(){this.#h.forEach(({cb:t})=>u.useCache.clean(t))}freezeCachedId(){this.#h.forEach(({cb:t})=>u.useCache.freeze(t))}unFreezeCachedId(){this.#h.forEach(({cb:t})=>u.useCache.unFreeze({id:t,update:!0}))}disableStagger(){this.#p=!1}destroy(){this.#s=[],this.#o=[],this.#c=[],this.#h=[],this.#l=[],this.#n=[],this.#u.forEach(t=>t()),this.#u=[]}};var fy=({values:e,timeElapsed:t,duration:r,ease:o})=>e.map(n=>{if(n.shouldUpdate){let s=o(t,n.fromValue,n.toValProcessed,r);return{...n,currentValue:_e(s)}}return{...n,currentValue:n.fromValue}});var Rr=class{#s;#o;#i;#c;#h;#l;#n;#u;#r;#e;#m;#a;#d;#f;#t;#g;#p;#x;#S;#y;#b;#T;#R;#I;#M;#w;#P;constructor(t){this.#s=Fa(t?.ease),this.#o=Mu(t?.duration),this.#i=so(t?.relative,"tween"),this.#c=Pt(t??{}),this.#h=u.getUnivoqueId(),this.#l=!1,this.#n=void 0,this.#u=void 0,this.#r=void 0,this.#e=[],this.#m=[],this.#a=[],this.#d=[],this.#f=[],this.#t=[],this.#g=[],this.#p=!1,this.#x=0,this.#S=0,this.#y=0,this.#b=!0,this.#T=!0,this.#R=!1,this.#I=!1,this.#M={duration:this.#o,ease:Ba(t?.ease),relative:this.#i,reverse:!1,immediate:!1},this.#w=Xe,this.#P=Xe;let r=t?.data;r&&this.setData(r)}#A(t){this.#l=!0,this.#p&&(this.#y=t-this.#x-this.#S),this.#S=t-this.#x-this.#y,Math.round(this.#S)>=this.#o&&(this.#S=this.#o),this.#e=fy({values:this.#e,timeElapsed:this.#S,duration:this.#o,ease:this.#s});let r=Math.round(this.#S)===this.#o,o=Fe(this.#e,"currentValue");if(this.#p||Ln({stagger:this.#c,callback:this.#a,callbackCache:this.#d,callBackObject:o,useStagger:this.#T}),r){Dn({onComplete:()=>{for(let s of this.#e)s.shouldUpdate&&(s.toValue=s.currentValue,s.fromValue=s.currentValue);this.#n?.(!0),this.#r=void 0,this.#u=void 0,this.#n=void 0,this.#y=0,this.#p=!1,this.#l=!1},callback:this.#a,callbackCache:this.#d,callbackOnComplete:this.#f,callBackObject:o,stagger:this.#c,slowlestStagger:this.#w,fastestStagger:this.#P,useStagger:this.#T});return}u.useFrame(()=>{u.useNextTick(({time:n})=>{this.#l&&this.#A(n)})})}#E(t){this.#x=t,this.#A(t)}async#F(){if(Wn(this.#c.each,this.#b,this.#d,this.#a)){let{averageFPS:t}=await u.useFps();co("tween",t);let r=or(this.#d,this.#a);if(this.#c.grid.col>r.length){kt(r.length),this.#b=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=At({arrayDefault:r,arrayOnStop:this.#f,stagger:this.#c,slowlestStagger:this.#w,fastestStagger:this.#P});this.#d.length>this.#a.length?this.#d=o:this.#a=o,this.#f=n,this.#w=i,this.#P=s,this.#b=!1}return{ready:!0}}async#$(t,r){this.#I||(this.#n=t,this.#u=r,this.#b&&(this.#I=!0,await this.#F(),this.#I=!1),Vn({validationFunction:this.#t,defaultRafInit:o=>this.#E(o)}))}clearCurretPromise(){this.#p||(this.#u?.(u.ANIMATION_STOP_REJECT),this.#r=void 0,this.#u=void 0,this.#n=void 0,this.#l=!1)}stop({clearCache:t=!0,updateValues:r=!0}={}){this.#y=0,this.#p=!1,r&&(this.#e=In(this.#e)),this.unFreezeStagger(),t&&this.#d.forEach(({cb:o})=>u.useCache.clean(o)),this.#u&&(this.#u(u.ANIMATION_STOP_REJECT),this.#r=void 0,this.#u=void 0,this.#n=void 0),this.#l=!1}freezeStagger(){this.#R||(this.#d.forEach(({cb:t})=>u.useCache.freeze(t)),this.#R=!0)}unFreezeStagger({updateFrame:t=!0}={}){this.#R&&(this.#d.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:t})),this.#R=!1)}pause(){this.#p||(this.#p=!0,this.freezeStagger())}resume(){this.#p&&(this.#p=!1,this.unFreezeStagger())}setData(t){this.#e=Object.entries(t).map(r=>{let[o,n]=r;return{prop:o,toValue:n,toValueOnPause:n,toValProcessed:n,fromValue:n,currentValue:n,shouldUpdate:!1,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#m=this.#e.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,shouldUpdate:!1,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#e=it(this.#e,this.#m)}#N(){for(let t of this.#e)t.shouldUpdate&&(t.fromValue=t.currentValue)}#D(t){let r={...this.#M,...t},{ease:o,duration:n,relative:s}=r;return this.#s=Fa(o),this.#i=so(s,"tween"),this.#o=Mu(n),r}goTo(t,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!0;let o=ao(t);return this.#v(o,t,r)}goFrom(t,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!0;let o=Fn(t);return this.#v(o,t,r)}goFromTo(t,r,o={}){if(this.stop({clearCache:!1,updateValues:!0}),this.#T=!0,!ro(t,r))return oo("tween goFromTo:",t,r),new Promise(s=>s);let n=Bn(t,r);return this.#v(n,t,o)}set(t,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!1;let o=Ir(t),n=r?{...r,duration:1}:{duration:1};return this.#v(o,t,n)}setImmediate(t,r={}){if(this.stop({clearCache:!1,updateValues:!1}),this.#p)return;this.#T=!1;let o=Ir(t),n=r?{...r,duration:1}:{duration:1};this.#e=Au(o,this.#e);let{reverse:s}=this.#D(n);Rt(s,"reverse")&&(this.#e=Cr(t,this.#e)),this.#e=fu(this.#e,this.#i),this.#e=xr(this.#e)}#v(t,r,o={}){this.#e=Au(t,this.#e);let{reverse:n,immediate:s}=this.#D(o);if(Rt(n,"reverse")&&(this.#e=Cr(r,this.#e)),this.#e=fu(this.#e,this.#i),Rt(s,"immediate "))return this.#l&&(this.stop({clearCache:!1,updateValues:!1}),this.#N()),this.#e=xr(this.#e),Promise.resolve();let i=!this.#l&&!this.#r;return i&&(this.#r=new Promise((a,c)=>{this.#$(a,c)})),i&&this.#r?this.#r:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return Fe(this.#e,"currentValue")}getInitialData(){return Fe(this.#m,"currentValue")}getFrom(){return Fe(this.#e,"fromValue")}getTo(){return Fe(this.#e,"toValue")}getFromNativeType(){return zn(this.#e)}getToNativeType(){return jn(this.#e)}getType(){return"TWEEN"}getId(){return this.#h}isActive(){return this.#l}updateEase(t){this.#s=Fa(t),this.#M=it(this.#M,{ease:t})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#a);return this.#a=r,()=>this.#a=o(this.#a)}subscribeCache(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=nr(t,this.#d,this.#g);return this.#d=r,this.#g=n,()=>this.#d=o(this.#d)}validateInitialization({validation:t,callback:r}){let o=[...this.#t,{validation:t,callback:r}];return this.#t=o,()=>this.#t=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(t,this.#f);return this.#f=r,()=>this.#f=o(this.#f)}destroy(){this.#r&&this.stop(),this.#f=[],this.#t=[],this.#a=[],this.#d=[],this.#e=[],this.#r=void 0,this.#g.forEach(t=>t()),this.#g=[]}};var xI=({each:e,duration:t,numItem:r,index:o,eachByNumItem:n})=>{if(e===1){let h=t/r,f=_e(o*h),d=_e(f+h);return{start:f,end:d}}let i=t/r*n,a=t-i,c=r-1>0?r-1:1,p=a/c*o;return{start:_e(p),end:_e(i+p)}},CI=({duration:e,numItem:t,index:r,eachByNumItem:o,type:n})=>{let i=e/t*r,c=(e-(e-i))/t*o;if(n===Oo)return{start:0,end:_e(e-(i-c))};if(n===$o){let l=(i-c)/2;return{start:_e(l),end:_e(e-l)}}return n==="end"?{start:_e(i-c),end:_e(e)}:{start:0,end:e}},gy=e=>{let t=Ov(e?.items),r=Pt(e),o=no(e?.duration),n=10,s=r?.each||1,i=[...t].map((d,v)=>({item:d,start:0,end:o,index:v}));if(!Av(t))return i;r.grid?.col>t.length&&(kt(t.length),s=1),u.checkType(Number,s)&&(s>n||s<1)&&(Vb(n),s=1);let{staggerArray:a}=At({arrayDefault:[...t].map(d=>({item:d})),arrayOnStop:[],stagger:r,slowlestStagger:Xe,fastestStagger:Xe}),c=a.filter(({item:d})=>u.checkType(Element,d)||u.checkType(Object,d)||u.checkType(Element,d?.deref?.()));if(c.length===0)return Fb(),i;let l=c.map(({frame:d})=>d),p=[...new Set(l)].toSorted((d,v)=>d-v),h=p.length;return c.map(({item:d,frame:v})=>{let y=p.indexOf(v),T=s*h/n,{start:S,end:_}=r.type===Ao?xI({each:s,duration:o,numItem:h,index:y,eachByNumItem:T}):r.type===Oo||r.type==="end"||r.type===$o?CI({duration:o,numItem:h,index:y,eachByNumItem:T,type:r.type}):{start:0,end:o};return{item:d,start:S,end:_,index:y}})};function EI(e){return new Xs(e)}function wI(e){return new Qs(e)}function II(){return new Ks}function MI(e){return gy(e)}function kI(e){return new Rr(e)}function RI(e){return new Tt(e)}function NI(e){return new kr(e)}var Me={};To(Me,{createAsyncTimeline:()=>AI,createSyncTimeline:()=>PI});var X=()=>{},oc=(...e)=>t=>e.reduce((r,o)=>r.then(o),Promise.resolve(t));var nc=({data:e,filterBy:t})=>Object.entries(e).map(r=>{let[o,n]=r,s=o in t;return{data:{[o]:n},active:s}}).filter(({active:r})=>r).map(({data:r})=>r).reduce((r,o)=>({...r,...o}),{});var uo=({timeline:e,tween:t,index:r})=>{let o=t?.getId?.(),n=t?.getInitialData?.()||{},s=e.slice(0,r).reduce((i,a)=>{let c=a.find(({data:h})=>h?.tween?.getId?.()===o);c?.data?.tween?.setImmediate?.(c?.data?.valuesTo);let l=c?.data?.tween?.getToNativeType?.(),p=l&&c?nc({data:l,filterBy:c.data.valuesTo}):{};return{...i,...p}},n);return t.setImmediate(n),s};var Vu=({mainReject:e,mainResolve:t,isStopped:r,previousSessionId:o,currentSessionId:n,isInPause:s,tween:i,stepFunction:a,action:c,addToActiveTween:l})=>{if(r()||o!==n()){e();return}let p=l(i),h=i&&i?.validateInitialization?i.validateInitialization({validation:()=>s(),callback:()=>i.pause?.()}):X;a[c]().then(()=>t({resolve:!0})).catch(()=>{}).finally(()=>{p(),h()})};var Zs=class{#s;#o;#i;#c;#h;#l;#n;#u;#r;#e;#m;#a;#d;#f;#t;#g;#p;#x;#S;#y;#b;#T;#R;#I;#M;#w;#P;#A;#E;#F;#$;#N;#D;#v;#C;constructor(t){this.#s=Da(t?.repeat),this.#o=de(t?.yoyo,"asyncTimeline: yoyo",!1),this.#i=de(t?.freeMode,"asyncTimeline: freeMode",!1),this.#c=de(t?.autoSet,"asyncTimeline: autoSet",!0),this.#h=de(t?.inheritProps,"asyncTimeline: inheritProps",!0),this.#l=de(t?.forceFromTo,"asyncTimeline: forceFromTo",!1),this.#n=[],this.#u=[],this.#r=[],this.#e=!1,this.#m={id:-1,tween:void 0,callback:()=>{},action:"",valuesFrom:{},valuesTo:{},prevValueTo:{},prevValueSettled:!1,tweenProps:{},groupProps:{},labelProps:{}},this.#a={active:!1,index:-1,isReverse:!1,callback:void 0},this.#d=1,this.#f=void 0,this.#t=0,this.#g=0,this.#p=1,this.#x=!1,this.#S=!1,this.#y=!1,this.#b=!1,this.#T=!1,this.#R=!1,this.#I=!0,this.#M=0,this.#w=0,this.#P=0,this.#A=!1,this.#E=[],this.#F=!1,this.#$=0,this.#N=[],this.#D=[],this.#v=void 0,this.#C=void 0}#V(){let t=this.#n[this.#g],r=this.#E;if(this.#E=[],!t)return;this.#n[this.#g]=t.map(i=>{let{data:a}=i,{tween:c,valuesTo:l,prevValueSettled:p}=a;if(c&&c?.getToNativeType&&!p){let h=c.getToNativeType(),f=nc({data:h,filterBy:l});return{...i,data:{...a,prevValueTo:f,prevValueSettled:!0}}}return i});let o=t.map(i=>{let{data:a}=i,{tween:c,callback:l,action:p,valuesFrom:h,valuesTo:f,tweenProps:d,id:v}=a,y={...d};delete y.delay;let{active:T,index:S}=this.#a,_=Number.isNaN(S)?!1:T&&S&&this.#g<S;_&&(y.immediate=!0),d&&"relative"in d&&d.relative&&(d.relative=!1,fb()),this.#E.push({id:v,action:p});let w=r.find(({id:E,action:I})=>E===v&&I===p),x={set:()=>(this.#b||c?.clearCurretPromise?.(),c?.[p](h,y)),goTo:()=>(this.#b||c?.clearCurretPromise?.(),c?.[p](f,y)),goFrom:()=>(this.#b||c?.clearCurretPromise?.(),c?.[p](h,y)),goFromTo:()=>(this.#b||c?.clearCurretPromise?.(),c?.[p](h,f,y)),add:()=>w?new Promise(E=>E({resolve:!0})):new Promise(E=>{if(_){E({resolve:!0});return}let I=this.getDirection();l({direction:I,loop:this.#p}),E({resolve:!0})}),addAsync:()=>{this.#R=!0;let E=this.#M;return w?new Promise(I=>I({resolve:!0})):new Promise((I,P)=>{if(_){I({resolve:!0});return}let A=this.getDirection();l({direction:A,loop:this.#p,resolve:()=>{if(E===this.#M){I({resolve:!0});return}P()}})})},createGroup:()=>new Promise(E=>E({resolve:!0})),closeGroup:()=>new Promise(E=>E({resolve:!0})),label:()=>new Promise(E=>E({resolve:!0})),suspend:()=>{if(w)return new Promise(P=>P({resolve:!0}));let E=u.checkType(Boolean,l());E||gb(l);let I=E?l():!0;return new Promise(P=>{!_&&I&&(this.#T=!0),P({resolve:!0})})}};return new Promise((E,I)=>{let P=_?!1:d?.delay,A=this.#M;if(P){let $=u.getTime();requestAnimationFrame(()=>{this.#O({start:$,deltaTimeOnpause:0,delay:P,mainReject:I,mainResolve:E,previousSessionId:A,tween:c,stepFunction:x,action:p})});return}Vu({mainReject:I,mainResolve:E,isStopped:()=>this.#I,isInPause:()=>this.#b,addToActiveTween:$=>this.#X($),currentSessionId:()=>this.#M,previousSessionId:A,tween:c,stepFunction:x,action:p})})}),s=this.#n[this.#g].some(i=>i.data.groupProps?.waitComplete)?"all":"race";Promise[s](o).then(()=>{if(this.#T||this.#I)return;let{active:i,index:a,isReverse:c,callback:l}=this.#a;if(l&&i&&this.#g===a-1){this.#q(),this.#p++,l();return}if(i&&c&&this.#g===a-1&&this.reverseNext(),this.#x){this.#x=!1,this.#g=this.#n.length-this.#g-1,this.#q(),this.#H(),this.#V();return}if(this.#g<this.#n.length-1){this.#g++,this.#V();return}if(this.#p<this.#s||this.#s===-1){if(i&&a===this.#n.length&&!this.#i){let p=this.#r.map(({tween:h})=>{let f=uo({timeline:this.#n,tween:h,index:this.#n.length});return new Promise((d,v)=>{h.set(f).then(()=>d({resolve:!0})).catch(()=>v())})});Promise.all(p).then(()=>{this.#_()}).catch(()=>{});return}this.#_();return}this.#D.forEach(({cb:p})=>p()),this.#I=!0,this.#v&&Xo.add(()=>{xt.add(()=>{this.#v?.({resolve:!0})})})}).catch(i=>{i&&console.log(i)}).finally(()=>{this.#R=!1})}#O({start:t,deltaTimeOnpause:r,delay:o,mainReject:n,mainResolve:s,previousSessionId:i,tween:a,stepFunction:c,action:l}){let p=u.getTime(),h=p-t;if(this.#b&&(r=p-this.#P),h-r>=o||this.#I||this.#x){Vu({mainReject:n,mainResolve:s,isStopped:()=>this.#I,isInPause:()=>this.#b,addToActiveTween:f=>this.#X(f),currentSessionId:()=>this.#M,previousSessionId:i,tween:a,stepFunction:c,action:l});return}requestAnimationFrame(()=>{this.#O({start:t,deltaTimeOnpause:r,delay:o,mainReject:n,mainResolve:s,previousSessionId:i,tween:a,stepFunction:c,action:l})})}#_(){if(this.#p>0){let t=this.getDirection();this.#N.forEach(({cb:r})=>r({direction:t,loop:this.#p}))}this.#p++,this.#g=0,this.#q(),(this.#o||this.#S)&&this.#H(),this.#S=!1,this.#V()}#X(t){let r=t?.getId&&t.getId();if(!r)return X;let o=this.#w;return this.#w++,this.#u.push({tween:t,uniqueId:r,id:o}),()=>{this.#u=this.#u.filter(({id:n})=>n!==o)}}#H(){this.#y=!this.#y,this.#n=this.#n.toReversed().map(t=>t.toReversed().map(r=>{let{data:o}=r,{action:n,valuesFrom:s,prevValueTo:i,valuesTo:a}=o,c=a;switch(n){case"goTo":return{...r,data:{...o,valuesTo:i,prevValueTo:c}};case"goFromTo":return{...r,data:{...o,valuesFrom:a,valuesTo:s}};case"goFrom":return this.#l||(bb(),this.stop()),{...r,data:{...o,valuesFrom:a,valuesTo:s}}}return r}))}#k(t){let r=this.#n.findIndex(o=>o[0]?.group&&o[0].group===this.#f);if(r!==-1){this.#n[r].push({group:this.#f,data:t});return}this.#n.push([{group:this.#f,data:t}])}#j(t){let r=t?.getId?.();if(this.#r.find(({id:s})=>s===r))return;let n={id:r,tween:t};this.#r.push(n)}#L(){this.#r.forEach(({tween:t})=>t.resetData())}set(t,r={},o={}){if(!Vs(t))return this;o.delay=Bs(o?.delay);let n=this.#h?uo({timeline:this.#n,tween:t,index:this.#n.length}):{};return this.#t++,this.#k({...this.#m,id:this.#t,tween:t,action:"set",valuesTo:{...n,...r},valuesFrom:{...n,...r},tweenProps:o,groupProps:{waitComplete:this.#e}}),this.#j(t),this}goTo(t,r={},o={}){if(!Vs(t))return this;o.delay=Bs(o?.delay);let n=uo({timeline:this.#n,tween:t,index:this.#n.length}),s=this.#h||this.#l?n:{};return this.#t++,this.#l?this.#k({...this.#m,id:this.#t,tween:t,action:"goFromTo",valuesFrom:{...s},valuesTo:{...s,...r},tweenProps:o??{},groupProps:{waitComplete:this.#e}}):this.#k({...this.#m,id:this.#t,tween:t,action:"goTo",valuesTo:{...s,...r},tweenProps:o??{},groupProps:{waitComplete:this.#e}}),this.#j(t),this}goFrom(t,r={},o={}){if(!Vs(t))return this;o.delay=Bs(o?.delay);let n=uo({timeline:this.#n,tween:t,index:this.#n.length}),s=this.#h||this.#l?n:{};return this.#t++,this.#l?this.#k({...this.#m,id:this.#t,tween:t,action:"goFromTo",valuesFrom:{...s,...r},valuesTo:{...s},tweenProps:o??{},groupProps:{waitComplete:this.#e}}):this.#k({...this.#m,id:this.#t,tween:t,action:"goFrom",valuesFrom:{...s,...r},tweenProps:o,groupProps:{waitComplete:this.#e}}),this.#j(t),this}goFromTo(t,r={},o={},n={}){if(!Vs(t))return this;n.delay=Bs(n?.delay);let s=this.#h?uo({timeline:this.#n,tween:t,index:this.#n.length}):{};return this.#t++,this.#k({...this.#m,id:this.#t,tween:t,action:"goFromTo",valuesFrom:{...s,...r},valuesTo:{...s,...o},tweenProps:n,groupProps:{waitComplete:this.#e}}),this.#j(t),this}add(t=X){let r=io(t,()=>{},"timeline add function");return this.#f?(On("add"),this):(this.#t++,this.#k({...this.#m,id:this.#t,callback:r,action:"add",groupProps:{waitComplete:this.#e}}),this)}addAsync(t){let r=Vv(t);return this.#f?(On("addAsync"),this):(this.#t++,this.#k({...this.#m,id:this.#t,callback:r,action:"addAsync",groupProps:{waitComplete:this.#e}}),this)}createGroup(t={}){return this.#f?(On("createGroup"),this):(this.#t++,this.#k({...this.#m,id:this.#t,action:"createGroup",groupProps:t}),this.#e=t?.waitComplete??!1,this.#f=this.#d++,this)}closeGroup(){return this.#f=void 0,this.#t++,this.#k({...this.#m,id:this.#t,action:"closeGroup"}),this.#e=!1,this}suspend(t=()=>!0){return this.#f?(On("suspend"),this):(this.#t++,this.#k({...this.#m,id:this.#t,callback:t,action:"suspend",groupProps:{waitComplete:this.#e}}),this)}label(t={}){return this.#f?(On("label"),this):Fv(t?.name,"asyncTimeline label:")?(this.#t++,this.#k({...this.#m,id:this.#t,action:"label",labelProps:t,groupProps:{waitComplete:this.#e}}),this):this}#U(){this.#A||(this.#A=!0,this.#r.forEach(({tween:t})=>{let r=t.getInitialData();this.#t++,this.#n=[[{group:void 0,data:{...this.#m,id:this.#t,tween:t,action:"set",valuesFrom:r,valuesTo:r,groupProps:{waitComplete:this.#e}}}],...this.#n]}),this.#r.forEach(({tween:t})=>{let r=uo({timeline:this.#n,tween:t,index:this.#n.length});this.#t++,this.#n.push([{group:void 0,data:{...this.#m,id:this.#t,tween:t,action:"set",valuesFrom:r,valuesTo:r,groupProps:{waitComplete:this.#e}}}])}))}setTween(t="",r=[]){this.stop();let o=Wv(r),n=jv(t);if(!o||!n)return Promise.reject(new Error("timeline setTween: props is wrong"));let s=new Set(r.map(c=>c?.getId?.())),i=this.#r.filter(({id:c})=>s.has(c)),a=this.#n.findIndex(c=>{let[l]=c;return l.data.labelProps?.name===t});return a===-1?(Tb(t),Promise.reject(new Error(`asyncTimeline.setTween() label: ${t} not found`))):new Promise(c=>{let l=i.map(({tween:p})=>{let h=uo({timeline:this.#n,tween:p,index:a});return new Promise((f,d)=>{p.set(h).then(()=>f({resolve:!0})).catch(()=>d())})});Promise.all(l).then(()=>{c({resolve:!0})}).catch(()=>{_b()})})}#G(){this.#C&&(this.#C(u.ANIMATION_STOP_REJECT),this.#C=void 0)}async#ne(){if(this.#F)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#F=!0,await u.useFps(),this.#F=!1}async playFrom(t){return await this.#ne(),this.#Z(t,!1)}async playFromReverse(t){return await this.#ne(),this.#Z(t,!0)}#Z(t,r){return new Promise((o,n)=>{this.playReverse({forceYoYo:!1,resolve:o,reject:n,callback:()=>{this.#n.length===0||this.#R||(this.#y&&this.#H(),this.#g=0,this.#a={isReverse:r,active:!0,index:u.checkType(String,t)?this.#n.findIndex(s=>{let[i]=s;return i.data.labelProps?.name===t}):t,callback:void 0},u.checkType(String,t)&&Bv(this.#a.index,t),this.#V())}})})}async play(){return await this.#ne(),new Promise((t,r)=>{if(this.#c&&this.#U(),this.#i){if(this.#n.length===0||this.#R)return;this.stop(),this.#I=!1,this.#y&&this.#H(),this.#M++,u.useFrameIndex(()=>{this.#C=r,this.#v=t,this.#V()},1);return}this.playReverse({forceYoYo:!1,callback:()=>{this.stop(),this.#I=!1;let o=this.#r.map(({tween:n})=>{let s=n.getInitialData();return new Promise((i,a)=>{n.set(s).then(()=>i({resolve:!0})).catch(()=>a())})});Promise.all(o).then(()=>{this.#C=r,this.#v=t,this.#V()}).catch(()=>{})}})})}async playReverse({forceYoYo:t=!0,callback:r,resolve:o=null,reject:n=null}={}){return await this.#ne(),new Promise((s,i)=>{let a=o??s,c=n??i,l=t;this.#c&&this.#U(),!(this.#n.length===0||this.#R)&&(this.stop(),this.#I=!1,l&&(this.#S=!0),this.#a={active:!0,index:this.#n.length,isReverse:!1,callback:r},this.#p--,this.#M++,u.useFrameIndex(()=>{this.#v=a,this.#C=c,this.#V()},1))})}reverseNext(){this.#x=!0}stop({clearCache:t=!0}={}){this.#I=!0,this.#g=0,this.#p=1,this.#G(),this.#x=!1,this.#q(),this.#S=!1,this.#b=!1,this.#T=!1,this.#R=!1,this.#P=0,this.#r.forEach(({tween:r})=>{r?.stop?.({clearCache:t})}),this.#y&&this.#H(),this.#y=!1,this.#i||this.#L()}pause(){this.#b||(this.#b=!0,this.#P=u.getTime(),this.#se())}resume(){if(this.#b&&(this.#b=!1,this.#P=0,this.#W()),this.#T){if(this.#T=!1,this.#P=0,this.#g<=this.#n.length-2){this.#g++,this.#V();return}this.#g===this.#n.length-1&&(this.#g=this.#o&&!this.#y?1:0,this.#q(),this.#o&&this.#H(),this.#p++,this.#V())}}#se(){this.#u.forEach(({tween:t})=>{t?.pause?.()})}#W(){this.#u.forEach(({tween:t})=>{t?.resume?.()})}#q(){this.#a={active:!1,index:-1,isReverse:!1,callback:void 0}}get(){return this.#u}isActive(){return!this.#I}isPaused(){return this.#b}isSuspended(){return this.#T}getDirection(){return this.#I?We.NONE:this.#y?We.BACKWARD:We.FORWARD}onLoopEnd(t){this.#N.push({cb:t,id:this.#$});let r=this.#$;return()=>{this.#N=this.#N.filter(o=>o.id!==r)}}onComplete(t){this.#D.push({cb:t,id:this.#$});let r=this.#$;return this.#$++,()=>{this.#D=this.#D.filter(o=>o.id!==r)}}destroy(){this.#r.forEach(({tween:t})=>{t?.destroy?.()}),this.#n=[],this.#u=[],this.#D=[],this.#N=[],this.#r=[],this.#g=0,this.#a={active:!1,callback:void 0,index:-1,isReverse:!1}}};var ei=class{#s;#o;#i;#c;#h;#l;#n;#u;#r;#e;#m;#a;#d;#f;#t;#g;#p;#x;#S;#y;#b;#T;#R;#I;#M;#w;#P;#A;#E;constructor(t={}){this.#s=no(t?.duration),this.#o=de(t?.yoyo,"syncTimeline: yoyo",!1),this.#i=Da(t?.repeat),this.#c=[],this.#h=0,this.#l=0,this.#n=0,this.#u=0,this.#r=0,this.#e=0,this.#m=!1,this.#a=!1,this.#d=!1,this.#f=0,this.#t=0,this.#g=10,this.#p=!0,this.#x=!1,this.#S=!1,this.#y=!1,this.#b=!1,this.#T=0,this.#R=[],this.#I=[],this.#M=[],this.#w=void 0,this.#P=void 0,this.#A={time:0,direction:We.NONE},this.#E={direction:We.NONE,loop:0}}#F(t,r){if(this.#p||this.#y)return;let o=!this.#i||this.#i>=2&&this.#f===this.#i-1?0:1e3/r/2;this.#b&&(this.#u=t-this.#h-this.#l-this.#e),this.#l=Math.trunc(t-this.#h-this.#u-this.#e);let n=this.#m?this.#r-(this.#l-this.#r):this.#l,s=this.getDirection();if(this.#b||(this.#n=at(n,0,this.#s),this.#x||(this.#c.forEach(i=>{i.draw({partial:this.#n,isLastDraw:!1,useFrame:!0,direction:s})}),this.#A.time=this.#n,this.#A.direction=s,this.#M.forEach(({cb:i})=>{i(this.#A)}))),this.#x=!1,this.#t++,n<=this.#s-o&&n>=0+o&&!this.#p){this.#S=!1,this.#$();return}if(this.#_(),this.#a){this.#m=!0,this.#r=0,this.#e=0,this.#a=!1,this.#$();return}if(u.useNextFrame(()=>{!this.#y&&!this.#S&&this.#t>this.#g&&(this.#S=!0,this.#f++,this.#t=0,this.#E.direction=s,this.#E.loop=this.#f,this.#R.forEach(({cb:i})=>i(this.#E)))}),!this.#i||this.#f===this.#i-1&&this.#t>this.#g){let i=this.#n;this.#c.forEach(a=>{a.draw({partial:i,isLastDraw:!0,useFrame:!0,direction:s})}),this.#p=!0,this.#N(),this.#h=t,this.#m&&(this.#m=!1),this.#I.forEach(({cb:a})=>a()),this.#w&&this.#w(!0);return}if(this.#o){this.reverse(),this.#$();return}if(this.#d){this.#N(),this.#h=t,this.#m||(this.#d=!this.#d),this.#l=this.#s,this.#n=this.#s,this.#u=this.#s,this.#$();return}this.#N(),this.#h=t,this.#m&&(this.#d=!this.#d),this.#$()}#$(){u.useFrame(()=>{u.useNextTick(({time:t,fps:r})=>{this.#y||this.#F(t,r)})})}#N(){this.#l=0,this.#u=0,this.#n=0,this.#r=0,this.#e=0}#D(t){let r=this.#c.reduce((o,n)=>n.getLabels().find(({name:a})=>a===t)||o,{name:"",time:0});return r||Sb(t),r.time}#v(){this.#P&&(this.#P(u.ANIMATION_STOP_REJECT),this.#P=void 0)}play(t={}){this.resume();let r=t?.useCurrent;return r||this.stop(),new Promise((o,n)=>{if(!this.#y&&(this.#v(),this.#w=o,this.#P=n,!(!this.#p&&!this.#m&&r))){if(!this.#p&&this.#m&&r){this.reverse();return}this.#C()}})}playFrom(t=0){return this.resume(),this.stop(),new Promise((r,o)=>{if(this.#y)return;let s=u.checkType(Number,t)?t:this.#D(t);this.#v(),this.#w=r,this.#P=o,this.#C(s)})}#C(t=0){this.#_(),this.#N(),this.#n=t,this.#e=-this.#n,this.#d=!1,this.#t=0,this.#y=!0,this.#O(t)}playFromReverse(t){return this.resume(),this.stop(),new Promise((r,o)=>{if(this.#y)return;let s=u.checkType(Number,t)?t:this.#D(t);this.#v(),this.#w=r,this.#P=o,this.#V(s,!0)})}playReverse(t={}){this.resume();let r=t?.useCurrent;return r||this.stop(),new Promise((o,n)=>{if(!this.#y&&(this.#v(),this.#w=o,this.#P=n,!(!this.#p&&this.#m&&r))){if(!this.#p&&!this.#m&&r){this.reverse();return}this.#V(this.#s,!0)}})}#V(t=0){this.#_(),this.#l=t,this.#n=t,this.#u=t,this.#r=0,this.#e=0,this.#a=!0,this.#d=!0,this.#x=!0,this.#t=0,this.#y=!0,this.#O(t)}async#O(t){if(this.#i===0)return;let{averageFPS:r}=await u.useFps();co("sequencer",r),this.#m=!1,this.#c.forEach(o=>{o.inzializeStagger(),o.disableStagger(),o.draw({partial:t,isLastDraw:!1,useFrame:!0,direction:this.getDirection()})}),u.useFrame(()=>{u.useNextTick(({time:o,fps:n})=>{this.#h=o,this.#y=!1,this.#p=!1,this.#b=!1,this.#f=0,this.#F(o,n)})})}pause({freezeCache:t=!0}={}){if(!(this.#p||this.#b||this.#y)&&(this.#p=!1,this.#b=!0,t)){this.#c.forEach(r=>{r.freezeCachedId()});return}}resume({unFreezeCache:t=!0}={}){if(!(this.#p||!this.#b||this.#y)&&(this.#b=!1,t)){this.#c.forEach(r=>{r.unFreezeCachedId()});return}}reverse(){this.#b&&this.resume(),!(this.#p||this.#y)&&(this.#_(),this.#m=!this.#m,this.#m?this.#r=this.#l:this.#e+=this.#l-this.#n)}stop({clearCache:t=!0}={}){if(this.resume(),this.#p=!0,this.#v(),t){this.#c.forEach(r=>{r.cleanCachedId()});return}this.#c.forEach(r=>{r.draw({partial:this.#n,isLastDraw:!0,useFrame:!0,direction:this.getDirection()})})}add(t){return t.setStretchFactor(this.#s),this.#c.push(t),this}setDuration(t){return this.#s=t,this}#_(){this.#c.forEach(t=>t.resetLastValue())}isActive(){return!this.#p}isPaused(){return this.#b}getDirection(){return this.#p?We.NONE:this.#m?We.BACKWARD:We.FORWARD}getTime(){return this.#n}onLoopEnd(t=()=>{}){this.#R.push({cb:t,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#R=this.#R.filter(o=>o.id!==r)}}onComplete(t=()=>{}){this.#I.push({cb:t,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#I=this.#I.filter(o=>o.id!==r)}}onUpdate(t=()=>{}){this.#M.push({cb:t,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#M=this.#M.filter(o=>o.id!==r)}}destroy(){this.stop(),this.#c.forEach(t=>t.destroy()),this.#c=[],this.#M=[],this.#R=[],this.#I=[]}};function PI(e){return new ei(e)}function AI(e){return new Zs(e)}var Ke={};To(Ke,{createParallax:()=>BI,createScrollTrigger:()=>VI});var OI=({prevValue:e,value:t,maxVal:r})=>t>=r&&e<=r&&r>=0||t<=r&&e>=r&&r<=0?b.ON_LEAVE:t>r&&e<=r&&r<=0||t<r&&e>=r&&r>=0?b.ON_ENTER_BACK:t>=0&&e<=0&&r<=0||t<=0&&e>=0&&r>=0?b.ON_LEAVE_BACK:t>0&&t<r&&e<=0&&r>=0||t<0&&e>=0&&r<=0?b.ON_ENTER:b.ON_NOOP;function by({prevValue:e,value:t,maxVal:r,onEnter:o,onEnterBack:n,onLeave:s,onLeaveBack:i}){switch(OI({prevValue:e,value:t,maxVal:r})){case b.ON_LEAVE:{s&&s();break}case b.ON_ENTER_BACK:{n&&n();break}case b.ON_LEAVE_BACK:{i&&i();break}case b.ON_ENTER:{o&&o();break}}}var $I=({startMarker:e,endMarker:t,label:r})=>{if(!e&&!t){let o=r.replaceAll(/^[^a-z]+|[^\w.:-]+/gi,"-"),n=document.createElement("span");n.className+=`p-marker p-marker--start  p-marker-${o}`,n.innerHTML=`start ${o}`;let s=document.createElement("span");s.className+=`p-marker p-marker--end  p-marker-${o}`,s.innerHTML=`end ${o}`,document.body.append(n),document.body.append(s);let i=document.querySelector(`.p-marker--start.p-marker-${o}`),a=document.querySelector(`.p-marker--end.p-marker-${o}`);return{lastStartMarker:i??void 0,lastEndMarkerEl:a??void 0}}return{lastStartMarker:e,lastEndMarkerEl:t}},LI=({screen:e})=>{if(e===globalThis)return{top:0,right:0,bottom:0,left:0};let t=e.getBoundingClientRect();return{top:t.top,right:document.documentElement.clientWidth-(t.left+e.offsetWidth),bottom:window.innerHeight-(t.top+e.offsetHeight),left:t.left}},DI=({startPoint:e,direction:t,invertSide:r,top:o,bottom:n,left:s,right:i})=>t===b.DIRECTION_VERTICAL?r?{right:0,width:"100vw",height:"3px",top:`${e+o}px`,padding:"0 30px",pointerEvents:"none"}:{right:0,width:"100vw",height:"3px",bottom:`${e+n}px`,padding:"0 30px",pointerEvents:"none"}:r?{top:0,height:"100vw",width:"3px",left:`${e+s}px`,padding:"30px 0",pointerEvents:"none"}:{top:0,height:"100vw",width:"3px",right:`${e+i}px`,padding:"30px 0",pointerEvents:"none"},FI=({startPoint:e,endPoint:t,direction:r,invertSide:o,top:n,bottom:s,left:i,right:a})=>r===b.DIRECTION_VERTICAL?o?{right:0,width:"100vw",height:"3px",top:`${e+t+n}px`,padding:"0 30px",pointerEvents:"none"}:{right:0,width:"100vw",height:"3px",bottom:`${e+t+s}px`,padding:"0 30px",pointerEvents:"none"}:o?{top:0,height:"100vw",width:"3px",left:`${e+t+i}px`,padding:"30px 0",pointerEvents:"none"}:{top:0,height:"100vw",width:"3px",right:`${e+t+a}px`,padding:"30px 0",pointerEvents:"none"},vy=({startMarker:e,endMarker:t,startPoint:r,endPoint:o,screen:n,direction:s,invertSide:i,label:a})=>{let{lastStartMarker:c,lastEndMarkerEl:l}=$I({startMarker:e,endMarker:t,label:a}),{top:p,right:h,bottom:f,left:d}=LI({screen:n}),v=DI({startPoint:r,direction:s,invertSide:i,top:p,bottom:f,left:d,right:h}),y=FI({startPoint:r,endPoint:o,direction:s,invertSide:i,top:p,bottom:f,left:d,right:h}),T={position:"fixed",zIndex:"99999",background:he.get("scrollTrigger")?.markerColor?.startEnd||"#ff0000",fontSize:"14px",whiteSpace:"nowrap",textTransform:"uppercase"};return u.useFrame(()=>{Object.assign(c?.style,{...T,...v}),Object.assign(l?.style,{...T,...y})}),{startMarker:c,endMarker:l}};var yy=({marker:e,direction:t,invertSide:r})=>{if(!e)return{};let n=`3px ${he.get("scrollTrigger")?.markerColor?.item||"#14df3b"} solid`;return t===b.DIRECTION_VERTICAL?r?{borderBottom:n}:{borderTop:n}:r?{borderRight:n}:{borderLeft:n}};var sc=class{#s=0;#o=0;#i=0;#c;#h;#l;#n;#u;#r;#e;#m;#a;#d;#f;#t;#g;#p;#x;#S;#y;#b;#T;#R;#I;#M;#w;#P;#A;#E;#F;#$;#N;#D;#v;#C;#V;#O;#_;#X;#H;#k;#j;#L;constructor(){this.#c=void 0,this.#h=0,this.#l=()=>0,this.#n=()=>0,this.#u=b.DIRECTION_VERTICAL,this.#r=0,this.#e=void 0,this.#m=void 0,this.#a=void 0,this.#t=void 0,this.#g=!1,this.#p=!1,this.#x=!1,this.#S=()=>{},this.#y=()=>{},this.#b=()=>{},this.#T=!0,this.#d=void 0,this.#f=globalThis,this.#k="left",this.#L=!0,this.#j=!1,this.#R=["flex","flex-shrink","flex-basis","float","display","grid-area","grid-column-start","grid-column-end","grid-row-start","grid-row-end","box-sizing","order","place-self","align-self","justify-self"],this.#I=["font-size","padding","margin","line-height","white-space"],this.#M=["text-align"],this.#w=["z-index","pointer-events"],this.#P=["transform","position","translate","rotate","scale"],this.#A=["none","static"],this.#E=!1,this.#F=0,this.#$=0,this.#N=!1,this.#D=1.5,this.#v=!1,this.#C=!1,this.#V=0,this.#O=0,this.#_=!1,this.#X=0,this.#H=3}init(t){this.#e=t.item,this.#d=t.marker,this.#f=t.screen,this.#N=t.animatePin,this.#L=t.anticipatePinOnLoad,this.#v=t.forceTranspond,this.#c=t.invertSide,this.#u=t.direction,this.#l=t.getStart,this.#n=t.getEnd,this.#o=this.#l(),this.#h=this.#n(),this.#$=window.scrollY,this.#s=t?.scrollerHeight,this.#me(),this.#k=this.#u===b.DIRECTION_VERTICAL?"top":"left",this.#E=!0,this.#T=!0,this.#ne(),this.#se(),this.#Z(),this.#U(),this.#y=u.useScrollStart(()=>{this.#E&&this.#f!==globalThis&&this.#p&&this.#t&&u.useFrame(()=>{this.#t&&(this.#t.style.transition="transform .85s cubic-bezier(0, 0.68, 0.45, 1.1)")})}),this.#S=u.useScroll(({scrollY:r})=>{if(this.#E&&this.#f!==globalThis&&this.#f!==document.documentElement){this.#u===b.DIRECTION_VERTICAL&&this.#me();let o=r-this.#$;if(this.#$=r,this.#p&&this.#t&&this.#m){let{verticalGap:n}=this.#m.get(),s=n-o;this.#m.setData({collision:0,verticalGap:s}),u.useFrame(()=>{this.#t&&(this.#t.style.transform=`translate(0px,${s}px)`)})}}})}#U(){this.#m=new Tt({data:{collision:0,verticalGap:0},config:"wobbly"}),this.#b=this.#m.subscribe(({collision:t,verticalGap:r})=>{this.#u===b.DIRECTION_VERTICAL&&this.#t?this.#t.style.transform=`translate(0px, ${t}px)`:this.#t&&(this.#t.style.transform=`translate(${t}px, ${r}px)`)})}#G(){this.#t&&this.#m&&this.#m.set({collision:0,verticalGap:0}).catch(()=>{})}#ne(){this.#e||(this.#e=document.createElement("div"));let t=document.createElement("div");t.classList.add("pin-wrapper");let r=document.createElement("div");r.classList.add("pin"),t.append(r);let o=this.#e?.parentNode;o&&o.insertBefore(t,this.#e),r.append(this.#e),this.#a=this.#e.closest(".pin-wrapper"),this.#t=this.#e.closest(".pin");let n=this.#q(),s=this.#z(),i=yy({marker:this.#d,invertSide:this.#c,direction:this.#u}),a={display:"table"};u.useFrame(()=>{!this.#t||!this.#a||(Object.assign(this.#a.style,{...i}),Object.assign(this.#t.style,{...a,...s,...n}))}),this.#ee()}#Z(){if(!this.#t||!this.#a)return;let t=this.#a.offsetHeight,r=this.#a.offsetWidth;this.#a.style.height=`${t}px`,this.#a.style.width=`${r}px`,this.#t.style.height=`${t}px`,this.#t.style.width=`${r}px`}#se(){if(!this.#e)return;let t=globalThis.getComputedStyle(this.#e),r=this.#R.reduce((o,n)=>({...o,[n]:t.getPropertyValue(n)}),{});u.useFrame(()=>{this.#a&&Object.assign(this.#a.style,r)})}#W(t,r){let o=t.parentNode;if(o)for(;o!==null&&o!==document;){let n=getComputedStyle(o);if(n[r]&&!this.#A.includes(n[r]))return{[r]:n[r]};o=o.parentNode}}#q(){return this.#t?this.#M.map(r=>this.#W(this.#t,r)).filter(Boolean).reduce((r,o)=>({...r,...o}),{})??{}:{}}#ee(){if(this.#v){this.#j=!0;return}this.#j=this.#P.map(t=>{let r=this.#W(this.#a,t);if(!r)return!1;let[o]=Object.keys(r),[n]=Object.values(r);return o==="position"?n==="fixed"||n==="absolute":!0}).includes(!0)}#ie(){this.#o=this.#l(),this.#h=this.#n()}#me(){this.#ie(),this.#f!==globalThis&&(this.#o-=this.#u===b.DIRECTION_VERTICAL?St(this.#f).top:St(this.#f).left),this.#i=this.#c?this.#o:this.#s-this.#o,this.#r=this.#c?-Math.trunc(this.#h):Math.trunc(this.#h)}destroy(){this.#E&&(this.#m?.stop?.(),this.#b(),this.#S(),this.#y(),this.#m?.destroy?.(),this.#m=null,this.#V=0,this.#C=!1,this.#x=!1,this.#p=!1,this.#g=!1,this.#t&&this.#a&&(this.#a.parentNode?.insertBefore(this.#e,this.#a),this.#t.remove(),this.#a.remove(),this.#a=void 0,this.#t=void 0,this.#E=!1))}#ae(){return this.#a?this.#u===b.DIRECTION_VERTICAL?St(this.#a).top-this.#i:St(this.#a).left-this.#i:0}#re(){let t=this.#ae();this.#be(t)}#he(){let t=this.#c?this.#ae()-this.#h:this.#ae()+this.#h;this.#be(t)}#be(t){u.useFrame(()=>{if(!this.#t||!this.#k)return;let r=this.#t?.style??{};r[this.#k]=`${this.#i}px`}),this.#N&&!this.#T&&this.#t&&this.#m&&this.#m.goFrom({collision:t}).then(()=>{this.#ve()}).catch(()=>{})}#ve(){u.useFrame(()=>{this.#t&&(this.#t.style.transform="translate(0px, 0px)")})}#Q(){this.#G(),u.useFrame(()=>{this.#t&&(this.#t.style.transition="",this.#t.style.position="relative",this.#t.style.top="",this.#t.style.left="")})}#K(){this.#G(),u.useFrame(()=>{this.#t&&(this.#t.style.transition="",this.#t.style.position="relative",this.#u===b.DIRECTION_VERTICAL?(this.#t.style.left="",this.#t.style.top=`${this.#r}px`):(this.#t.style.top="",this.#t.style.left=`${this.#r}px`))})}#Y(){if(!this.#t)return;let t=this.#u===b.DIRECTION_VERTICAL?St(this.#t).left:St(this.#t).top,r=this.#u===b.DIRECTION_VERTICAL?"left":"top";u.useFrame(()=>{this.#t&&(this.#t.style.position="fixed",this.#t.style[r]=`${t}px`,this.#C=!0,this.#_=!0)})}#z(){if(!this.#e)return{};let t=globalThis.getComputedStyle(this.#e);return this.#w.reduce((r,o)=>({...r,[o]:t.getPropertyValue(o)}),{})}#te(){if(!this.#e)return{};let t=globalThis.getComputedStyle(this.#e);return this.#I.reduce((r,o)=>({...r,[o]:t.getPropertyValue(o)}),{})}#ce(){return this.#I.reduce((t,r)=>({...t,[r]:""}),{})}#B(){if(this.#j){let t=this.#q(),r=this.#z(),o=this.#te();u.useFrame(()=>{this.#t&&(Object.assign(this.#t.style,{...r,...t}),this.#e&&Object.assign(this.#e.style,o),document.body.append(this.#t))})}}#de(){!this.#j||!this.#e||!this.#a||u.useFrame(()=>{this.#t&&(Object.assign(this.#e.style,this.#ce()),this.#a?.append(this.#t))})}#fe(t){let r=this.#_&&this.#X<3?this.#O:at(Math.abs(t-this.#F),0,250);return this.#_&&this.#X<this.#H?this.#X++:(this.#X=0,this.#_=!1),this.#O=r,r*this.#D}#J(t,r){if(this.#N&&!this.#T||this.#T&&!this.#L)return{anticipateBottom:0,anticipateInnerIn:0,anticipateInnerOut:0};let o=this.#fe(t),n=r===b.SCROLL_UP?0:o,s=r===b.SCROLL_UP?0:o*2,i=r===b.SCROLL_UP?o:0;return{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}}#ye(t,r){if(this.#N&&!this.#T||this.#T&&!this.#L)return{anticipateBottom:0,anticipateInnerIn:0,anticipateInnerOut:0};let o=this.#fe(t),n=r===b.SCROLL_UP?o:0,s=r===b.SCROLL_UP?o*2:0,i=r===b.SCROLL_UP?0:o;return{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}}onScroll(t){if(!this.#E||!this.#a)return;if(this.#C&&this.#V<this.#H){this.#V++;return}else this.#V=0,this.#C=!1;let r=this.#F>t?b.SCROLL_UP:b.SCROLL_DOWN,o=this.#u===b.DIRECTION_VERTICAL?St(this.#a).top:St(this.#a).left,{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}=this.#c?this.#ye(t,r):this.#J(t,r),a=this.#c?o<this.#o-n:o>this.#s-this.#o+n,c=this.#c?o>=this.#o-s&&o<=this.#o+i+this.#h:o<=this.#s-this.#o+s&&this.#s-o<=this.#h+i+this.#o;if(a)this.#x||(this.#Q(),this.#de(),this.#x=!0,this.#p=!1,this.#g=!1);else if(c){if(!this.#p){this.#Y();let l=r===b.SCROLL_DOWN&&!this.#c||r===b.SCROLL_UP&&this.#c;this.#B(),l?this.#re():this.#he(),this.#x=!1,this.#p=!0,this.#g=!1}}else this.#g||(this.#K(),this.#de(),this.#x=!1,this.#p=!1,this.#g=!0);this.#F=t,this.#T=!1}};var Ty=()=>{console.warn("parallax prop checker: value in start or end prop with no unit misure is not allowed, failed operation, use vh in vertical mode or vw in horizontal or px")},_y=()=>{console.warn("parallax prop checker: value in start or end in vh is not allowed in horizontal mode, use vw or px")},Sy=()=>{console.warn("parallax prop checker: value in start or end in vw is not allowed in vertical mode, use vh or px")};var Wu=()=>({numberVal:0,unitMisure:"",additionalVal:"",position:""}),xy=({invert:e,endValInNumber:t,scrollerHeight:r,startPoint:o,isFromTopLeft:n})=>{let s=t-o,i=r-t-o;return e?n?s:i:n?i:s},Cy=({invert:e,scrollerHeight:t,screenUnit:r,endValInNumber:o,startPoint:n,isFromTopLeft:s})=>e?s?t-r*(100-o)-n:r*(100-o)-n:s?t-r*o-n:r*o-n,Ey=({offset:e,height:t,gap:r,wScrollTop:o,wHeight:n})=>e+t>o-r&&e<o+(n+r),wy=(e,t)=>{let r=e.find(c=>[...c].some(l=>!Number.isNaN(Number.parseFloat(l)))),o=Cv(r);if(r&&!o)return Ty(),Wu();if(r&&o===b.VH&&t===b.DIRECTION_HORIZONTAL)return _y(),Wu();if(r&&o===b.VW&&t===b.DIRECTION_VERTICAL)return Sy(),Wu();let n=[b.PLUS_HEIGHT,b.PLUS_HEIGHT_HALF,b.PLUS_WIDTH,b.PLUS_WIDTH_HALF,b.MINUS_HEIGHT,b.MINUS_HEIGHT_HALF,b.MINUS_WIDTH,b.MINUS_WIDTH_HALF],s=e.find(c=>xu(n,c)),i=[b.POSITION_BOTTOM,b.POSITION_TOP,b.POSITION_LEFT,b.POSITION_RIGHT],a=e.find(c=>xu(i,c));return{numberVal:r||0,unitMisure:o,additionalVal:s??"",position:a??b.POSITION_BOTTOM}},Iy=(e,t,r)=>{let n=String(t).split(" "),{numberVal:s,unitMisure:i,additionalVal:a,position:c}=wy(n,r),l=Number.parseFloat(String(s)),p=Number.isNaN(l)?0:l;return i===b.PX?{value:p,additionalVal:a,position:Oa(c)}:{value:e*p,additionalVal:a,position:Oa(c)}},My=(e,t,r,o,n,s)=>{let a=String(t).split(" "),{numberVal:c,unitMisure:l,additionalVal:p,position:h}=wy(a,s),f=Number.parseFloat(String(c)),d=Number.isNaN(f)?0:f,v=Oa(h),y=v===b.POSITION_TOP||v===b.POSITION_LEFT;return l===b.PX?{value:xy(n?{invert:!0,endValInNumber:d,scrollerHeight:o,startPoint:r,isFromTopLeft:y}:{invert:!1,endValInNumber:d,scrollerHeight:o,startPoint:r,isFromTopLeft:y}),additionalVal:p,position:v}:{value:Cy(n?{invert:!0,scrollerHeight:o,screenUnit:e,endValInNumber:d,startPoint:r,isFromTopLeft:y}:{invert:!1,scrollerHeight:o,screenUnit:e,endValInNumber:d,startPoint:r,isFromTopLeft:y}),additionalVal:p,position:v}},ju=(e,t,r,o)=>{let n=String(t);return De(n,b.PLUS_HEIGHT_HALF)?e+r/2:De(n,b.PLUS_HEIGHT)?e+r:De(n,b.PLUS_WIDTH_HALF)?e+o/2:De(n,b.PLUS_WIDTH)?e+o:De(n,b.MINUS_HEIGHT_HALF)?e-r/2:De(n,b.MINUS_HEIGHT)?e-r:De(n,b.MINUS_WIDTH_HALF)?e-o/2:De(n,b.MINUS_WIDTH)?e-o:e},ky=({switchPropierties:e,isReverse:t,value:r})=>{switch(e){case b.IN_STOP:return!t&&r>0||t&&r<0?0:r;case b.IN_BACK:return!t&&r>0||t&&r<0?-r:r;case b.OUT_STOP:return!t&&r<0||t&&r>0?0:r;case b.OUT_BACK:return!t&&r<0||t&&r>0?-r:r;default:return r}},Ry=(e,t)=>e===b.PROP_OPACITY?1-t:-t,zu=({callback:e,pin:t,ease:r,useThrottle:o})=>t?u.useScrollImmediate(e):r&&o?u.useScrollThrottle(e):u.useScroll(e);var po=class{#s=!1;#o=!1;#i=0;#c=0;#h=0;#l=0;#n=0;#u=0;#r=0;#e;#m;#a;#d;#f;#t;#g;#p;#x;#S;#y;#b;#T;#R;#I;#M;#w;#P;#A;#E;#F;#$;#N;#D;#v;#C;#V;#O;#_;#X;#H;#k;#j;#L;#U;#G;#ne;#Z;#se;#W;#q;#ee;#ie;#me;#ae;#re;#he;#be;#ve;#Q;#K;#Y;#z;#te;#ce;#B;#de;#fe;#J;#ye;#le;#pe;#oe;#xe;#_e;#ge;#Te;#Se;#we;#Ce;#ue;constructor(t){this.#e=window.innerWidth,this.#m=window.innerHeight,this.#a=800,this.#d=0,this.#f=()=>{},this.#t=()=>{},this.#g=()=>{},this.#p=()=>{},this.#x=()=>{},this.#S=void 0,this.#y=void 0,this.#b=void 0,this.#T=0,this.#R=!1,this.#I=void 0,this.#M=!0,this.#w=!1,this.#P=!1,this.#A=!1,this.#E=void 0,this.#F="",this.#$=0,this.#N=0,this.#D=()=>{},this.#v=()=>{},this.#k=!1,this.#C=de(t?.pin,"Scrolltrigger pin propierties error:",!1),this.#V=de(t?.animatePin,"Scrolltrigger animatePin propierties error:",!1),this.#O=de(t?.forceTranspond,"Scrolltrigger forceTranspond propierties error:",!1),this.#_=de(t?.anticipatePinOnLoad,"Scrolltrigger anticipatePinOnLoad propierties error:",!1),this.#X=Va(t?.start,"Scrolltrigger start propierties error:","bottom 0px"),this.#H=Va(t?.end,"Scrolltrigger end propierties error:","top"),this.#j=Va(t?.marker,"Scrolltrigger marker propierties error:",void 0),this.#L=t?.dynamicStart?Ru(t.dynamicStart,"dynamicStart"):null,this.#U=t?.dynamicEnd?Ru(t.dynamicEnd,"dynamicEnd"):null,this.#G=zv(t?.dynamicRange),this.#ne=de(t?.animateAtStart,"Scrolltrigger animateAtStart propierties error:",!1),this.#Z=io(t?.onEnter,!1,"Scrolltrigger onEnter propierties error"),this.#se=io(t?.onEnterBack,!1,"Scrolltrigger onEnterBack propierties error"),this.#W=io(t?.onLeave,!1,"Scrolltrigger onLeave propierties error"),this.#q=io(t?.onLeaveBack,!1,"Scrolltrigger onLeaveBack propierties error"),this.#ee=io(t?.onTick,!1,"Scrolltrigger onTickCallback propierties error"),this.#ie=Uv(t?.align),this.#me=Gv(t?.onSwitch),this.#ae=de(t?.reverse,"Parallax reverse propierties error:",!1),this.#re=Nu(t?.opacityStart,"Parallax opacityStart propierties error:",100),this.#he=Nu(t?.opacityEnd,"Parallax opacityEnd propierties error:",0),this.#be=de(t?.limiterOff,"Parallax|Scrolltrigger limiterOff propierties error:",!1),this.#ve=t?.useWillChange,this.#Q=Hv(t?.tween);let r=this.#Q?.getType&&this.#Q.getType()===b.TWEEN_TIMELINE,o=this.#Q?.getType&&this.#Q.getType()===b.TWEEN_TWEEN;this.#K=$n(t?.item,!1),this.#Y=$n(t?.scroller,!0),this.#z=$n(t?.screen,!0),this.#te=ku(t?.trigger),this.#ce=ku(t?.applyTo),this.#B=Ws(t?.direction,"Parallax/Scrolltrigger"),this.#de=de(t?.disableForce3D,"Parallax|Scrolltrigger disableForce3D propierties error:",!1),this.#fe=de(t?.useThrottle,"Parallax|Scrolltrigger useThrottle propierties error:",!1),this.#J=qv(t?.type),this.#ye=Nt(t?.perspective,"Parallax|Scrolltrigger perspective propierties error:",0),this.#le=Do(t?.breakpoint,"breakpoint","parallax/scrolltrigger"),this.#pe=Fo(t?.queryType,"queryType","parallax/scrolltrigger");let{propierties:n,shouldTrackOnlyEvents:s}=Yv(t?.propierties,this.#J,o,r);this.#oe=n,this.#xe=s,this.#_e=s?"100px":Jv(t?.range,this.#J),this.#ge=de(t?.ease,"Parallax|Scrolltrigger ease propierties error:",!1),r&&t?.easeType===b.EASE_SPRING&&uv(),this.#Te=r?b.EASE_LERP:Xv(t?.easeType),this.#Se=Kv(t?.springConfig,this.#J),this.#we=Qv(t?.lerpConfig,this.#J),this.#Ce=this.#Te===b.EASE_SPRING?{configProps:{precision:b.EASE_PRECISION}}:{precision:b.EASE_PRECISION},this.#ue=this.#Te===b.EASE_SPRING?new Tt:new kr}init(){if(this.#s){console.warn("Parallax/scrollTrigger: The init() method cannot be launched more than once. If you are passing the instance to components like horizontalScroller or smoothScroller via the children property, they will initialize the instance.");return}this.#s=!0,this.#We(),this.#Oe(),this.#Ae(),this.#$e(),this.#Le(),this.#Fe(),this.setPerspective(),this.#oe===b.PROP_TWEEN&&(this.#_e=this.#Q?.getDuration?this.#Q.getDuration():0,this.#G=()=>this.#_e,this.#Q?.inzializeStagger?.()),this.#J==b.TYPE_SCROLLTRIGGER&&(this.#be=!0,this.#Pe(),this.#ke()),this.#ge&&(this.#g=u.useScrollStart(()=>{this.#de||(this.#A=!0)}),this.#p=u.useScrollEnd(()=>{u.useFrame(()=>{u.useNextTick(()=>{this.#Me()})})}),this.#Y===globalThis&&(this.#t=zu({pin:this.#C,ease:this.#ge,useThrottle:this.#fe,callback:()=>{this.#Me()}})),this.#Me()),this.#ge||(this.#Y===globalThis&&(this.#t=zu({pin:this.#C,ease:this.#ge,useThrottle:this.#fe,callback:()=>{this.#Ie(),this.#Ee()}})),this.#Ie(),this.#Ee(),this.#p=u.useScrollEnd(()=>{this.#Ee({forceRender:!0})})),this.#Y!==globalThis&&this.#j&&(this.#x=u.useScroll(()=>{this.#ke()})),this.#f=u.useResize(({horizontalResize:t})=>{t&&this.refresh()}),this.#C&&(this.#E=new sc,ve[this.#pe](this.#le)&&u.useNextTick(()=>{this.#De(),this.#E?.init(this.#Ne()),this.#E?.onScroll(this.#u)}))}#Ne(){return{item:this.#K,marker:this.#j,screen:this.#z,animatePin:this.#V,anticipatePinOnLoad:this.#_,forceTranspond:this.#O,invertSide:this.#k,direction:this.#B,scrollerHeight:this.#r,getStart:()=>this.#$,getEnd:()=>this.#N}}setScroller(t){this.#Y=$n(t,!0)}setScreen(t){this.#z=$n(t,!0)}setDirection(t){this.#B=Ws(t,"Parallax/Scrolltrigger")}setBreakPoint(t){this.#le=Do(t,"breakpoint","Parallax/Scrolltrigger")}setQueryType(t){this.#pe=Fo(t,"queryType","Parallax/Scrolltrigger")}setPerspective(){if(this.#ye&&this.#K&&this.#K.parentNode){let t={perspective:`${this.#ye}px`,"transform-style":"preserve-3d"},r=this.#K.parentNode;Object.assign(r.style,t)}}#We(){let t=b.PROP_SCALE||b.PROP_SCALE_X||b.PROP_SCALE_Y||b.PROP_OPACITY?1:0;switch(this.#ue.setData({val:t}),this.#D=this.#ue.subscribe(({val:r})=>{r!==this.#b&&(this.#oe===b.PROP_TWEEN&&this.#Q?.draw?(this.#Q.draw({partial:r,isLastDraw:!1,useFrame:!1}),this.#b=r,this.#M=!1):this.#Re(r),u.useNextTick(()=>{this.#ee&&this.#ee({value:r,parentIsMoving:!0})}))}),this.#v=this.#ue.onComplete(({val:r})=>{this.#A=!1,this.#oe===b.PROP_TWEEN&&this.#Q?.draw?this.#Q.draw({partial:r,isLastDraw:!0,useFrame:!1}):this.#Re(r),u.useNextTick(()=>{this.#ee&&this.#ee({value:r,parentIsMoving:!1})})}),this.#Te){case b.EASE_LERP:{this.#we&&"updateVelocity"in this.#ue&&this.#ue?.updateVelocity?.(this.#we);break}case b.EASE_SPRING:{this.#Se&&"updateConfig"in this.#ue&&this.#ue?.updateConfig?.(this.#Se);break}}}#Pe(){if(this.#G){let t=this.#G();this.#d=Number.isNaN(t)?0:Number.parseFloat(t),this.#F=b.PX}else{let t=String(this.#_e),r=Zv(t,this.#oe),o=Number.parseFloat(t);this.#d=Number.isNaN(o)?0:o,this.#F=Ev(r)}}#ke(){let t=this.#r/100;if(this.#L&&this.#L?.position&&this.#L?.value?.()!==void 0){let{position:l,value:p}=this.#L,h=p();Number.isNaN(h)||(this.#X=`${l} ${h}px`)}let{value:r,additionalVal:o,position:n}=Iy(t,this.#X,this.#B);if(this.#k=n===b.POSITION_TOP||n===b.POSITION_LEFT,this.#$=ju(r,o,this.#B===b.DIRECTION_VERTICAL?this.#l:this.#n,this.#B===b.DIRECTION_VERTICAL?this.#n:this.#l),this.#U&&this.#U?.position&&this.#U?.value?.()!==void 0){let{position:l,value:p}=this.#U,h=p();Number.isNaN(h)||(this.#H=`${l} ${h}px`)}let{value:s,additionalVal:i,position:a}=My(t,this.#H,this.#$,this.#r,this.#k,this.#B),c=this.#k?a===b.POSITION_BOTTOM||a===b.POSITION_RIGHT?-1:1:a===b.POSITION_BOTTOM||a===b.POSITION_RIGHT?1:-1;this.#N=ju(s,i,this.#B===b.DIRECTION_VERTICAL?this.#l*c:this.#n*c,this.#B===b.DIRECTION_VERTICAL?this.#n*c:this.#l*c),this.#je(),this.#k&&(this.#$-=this.#l)}#je(){if(this.#j){let{startMarker:t,endMarker:r}=vy({startMarker:this.#S,endMarker:this.#y,startPoint:this.#$,endPoint:this.#N,screen:this.#z,direction:this.#B,invertSide:this.#k,label:this.#j});this.#S=t,this.#y=r}}#Ae(){let t=this.#te??this.#K;if(!t)return;let r=0,o=0,n=0;this.#te&&(r=So(this.#te)?.x??0,o=So(this.#te)?.y??0,n=So(this.#te)?.z??0),t.style.transform="",this.#B===b.DIRECTION_VERTICAL?this.#i=this.#Y===globalThis?Math.trunc(be(t).top):Math.trunc(be(t).top)-be(this.#Y).top:this.#i=this.#Y===globalThis?Math.trunc(be(t).left):Math.trunc(be(t).left)-be(this.#Y).left,this.#z&&this.#z!==globalThis&&(this.#i-=this.#B===b.DIRECTION_VERTICAL?Math.trunc(be(this.#z).top):Math.trunc(St(this.#z).left)),this.#te&&(r!==0||o!==0||n!==0)&&(this.#te.style.transform=`translate3D(${r}px, ${o}px, ${n}px)`)}#Oe(){this.#z===globalThis||!this.#z||(this.#c=this.#B===b.DIRECTION_VERTICAL?Math.trunc(be(this.#z).top):Math.trunc(St(this.#z).left))}#$e(){let t=this.#te??this.#K;t&&(this.#l=this.#B===b.DIRECTION_VERTICAL?Math.trunc(t.offsetHeight):Math.trunc(t.offsetWidth))}#Le(){let t=this.#te??this.#K;t&&(this.#n=this.#B===b.DIRECTION_VERTICAL?Math.trunc(t.offsetWidth):Math.trunc(t.offsetHeight))}#De(){this.#Y&&(this.#Y===globalThis?this.#u=this.#B===b.DIRECTION_VERTICAL?this.#Y.scrollY:this.#Y.scrollX:this.#u=this.#B===b.DIRECTION_VERTICAL?-be(this.#Y).top:-be(this.#Y).left)}#Fe(){this.#z&&(this.#e=window.innerWidth,this.#m=window.innerHeight,this.#z===globalThis?this.#r=this.#B===b.DIRECTION_VERTICAL?window.innerHeight:window.innerWidth:this.#r=this.#B===b.DIRECTION_VERTICAL?Math.trunc(this.#z.offsetHeight):Math.trunc(this.#z.offsetWidth))}refresh(){this.#C&&this.#E&&this.#E.destroy(),this.#Oe(),this.#Ae(),this.#$e(),this.#Le(),this.#Fe(),this.#J==b.TYPE_SCROLLTRIGGER&&(this.#ke(),this.#G&&this.#Pe(),this.#C&&this.#E&&ve[this.#pe](this.#le)&&this.#E?.init(this.#Ne())),this.#b=void 0,this.#M=!0,ve[this.#pe](this.#le)?this.#ge?this.#Me():(this.#Ie(),this.#Ee({forceRender:!0})):(this.#ge&&this.#ue?.stop?.(),u.useFrameIndex(()=>{this.#ce?(this.#Be(this.#ce),Object.assign(this.#ce.style,this.#Ve())):(this.#Be(this.#K),this.#K&&Object.assign(this.#K.style,this.#Ve()))},3))}move({value:t,parentIsMoving:r=!1}){if(!ve[this.#pe](this.#le)||!t)return;this.#P=!0;let o=this.#ze(t);if(this.#ge)this.#Me(o);else{this.#Ie(o);let n=this.#w||this.#M||void 0;this.#Ee({forceRender:n,parentIsMoving:r})}}triggerScrollStart(){this.#ge&&(this.#de||(this.#A=!0))}triggerScrollEnd(){this.#ge||this.#Ee({forceRender:!0})}#ze(t){if(t!==void 0)return this.#z!==globalThis?t+this.#c:t}stopMotion(){this.#ue?.stop?.()}#Ie(t){if(!ve[this.#pe](this.#le)||(t?this.#u=-t:this.#De(),this.#w=Ey({offset:this.#i,height:this.#l,gap:this.#a,wScrollTop:this.#u,wHeight:this.#r}),!this.#w&&!this.#be&&this.#J===b.TYPE_PARALLAX))return;this.#C&&this.#E&&this.#E.onScroll(this.#u),this.#J===b.TYPE_SCROLLTRIGGER?this.#h=_e(this.#He()):this.#oe===b.PROP_OPACITY?this.#h=_e(this.#Ge()):this.#h=Number.isNaN(Number.parseInt(this.#ie))?_e(this.#qe()/2):_e(this.#Je()/2);let r=this.#ae&&this.#J!==b.TYPE_SCROLLTRIGGER?Ry(this.#oe,this.#h):this.#h;this.#h=this.#J===b.TYPE_SCROLLTRIGGER?r:this.#Ye(r)}#Me(t){if(!ve[this.#pe](this.#le)||(this.#Ie(t),!this.#R&&!this.#M&&this.#J===b.TYPE_SCROLLTRIGGER)||!this.#w&&!this.#M&&this.#J===b.TYPE_PARALLAX)return;let r=this.#M&&!this.#ne?"set":"goTo";this.#ue&&this.#ue[r]({val:this.#h},this.#Ce).catch(()=>{})}#Ee({forceRender:t=!1,parentIsMoving:r=!1}={}){ve[this.#pe](this.#le)&&u.useFrame(()=>{this.#h===this.#b&&!t||!this.#w&&!t||(!this.#de&&!this.#P&&(this.#A=!t),!this.#de&&this.#P&&(this.#A=r&&this.#w),this.#oe===b.PROP_TWEEN?(this.#Q.draw({partial:this.#h,isLastDraw:!this.#A,useFrame:!1}),this.#b=this.#h,this.#M=!1):this.#Re(this.#h),u.useNextTick(()=>{this.#ee&&this.#ee({value:this.#h,parentIsMoving:this.#A})}))})}#He(){let t=this.#k?-(this.#u+this.#$+this.#N-(this.#i+this.#N)):-(this.#u+this.#r-this.#$-(this.#i+this.#N)),r=this.#N/100*this.#d,o=t/100*this.#d,n=this.#ae?this.#k?r-o:o:this.#k?o:r-o,s=r>0?-at(n,0,r):-at(n,r,0);if(this.#R=this.#I!==s,this.#I=s,!this.#R&&!this.#M)return this.#h;let i=s*100/this.#N;switch((this.#Z||this.#se||this.#W||this.#q)&&by({prevValue:this.#T,value:n,maxVal:r,onEnter:this.#Z,onEnterBack:this.#se,onLeave:this.#W,onLeaveBack:this.#q}),this.#T=n,this.#oe){case b.PROP_HORIZONTAL:case b.PROP_VERTICAL:return this.#Ue(i);case b.PROP_SCALE:case b.PROP_SCALE_X:case b.PROP_SCALE_Y:case b.PROP_OPACITY:return 1-i;default:return-i}}#Ue(t){switch(this.#F){case b.VW:return this.#e/100*-t;case b.VH:return this.#m/100*-t;case b.WPERCENT:return this.#B===b.DIRECTION_VERTICAL?this.#n/100*-t:this.#l/100*-t;case b.HPERCENT:return this.#B===b.DIRECTION_VERTICAL?this.#l/100*-t:this.#n/100*-t;default:return-t}}#Ge(){let t=this.#r/100*this.#he,r=this.#r-this.#r/100*this.#re,o=this.#ie==b.ALIGN_START?-this.#u*-1:(this.#u+t-this.#i)*-1,n=this.#ie==b.ALIGN_START?1-o/this.#i:1-o/(this.#r-r-t);return at(n,0,1)}#qe(){let t=Number(this.#_e),r=Number.isNaN(t)?0:t,o=this.#B===b.DIRECTION_VERTICAL?document.documentElement.scrollHeight:document.documentElement.scrollWidth;switch(this.#ie){case b.ALIGN_START:return(this.#u+this.#c)/r;case b.ALIGN_TOP:case b.ALIGN_LEFT:return(this.#u-this.#i)/r;case b.ALIGN_CENTER:return(this.#u+(this.#r/2-this.#l/2)-this.#i)/r;case b.ALIGN_BOTTOM:case b.ALIGN_RIGHT:return(this.#u+(this.#r-this.#l)-this.#i)/r;case b.ALIGN_END:return-(o-(this.#u+this.#r))/r;default:return 0}}#Je(){let t=Number(this.#ie),r=Number(this.#_e);return(this.#u+this.#r/100*t-this.#i)/r}#Ye(t){return ky({switchPropierties:this.#me,isReverse:this.#ae,value:t})}#Re(t){this.#b=t,this.#M=!1;let r=this.#ce||this.#K;if(!r||this.#xe)return;let o=this.#A?"translate3D(0px, 0px, 0px)":"";this.#o=this.#ve?u.mustMakeSomething():!1;let n=this.#o&&this.#A?"transform":"",s=u.shouldMakeSomething()?Math.round(t):t;switch(this.#oe){case b.PROP_VERTICAL:{r.style.transform=`${o} translateY(${s}px)`,r.style.willChange=n;break}case b.PROP_HORIZONTAL:{r.style.transform=`${o} translateX(${s}px)`,r.style.willChange=n;break}case b.PROP_ROTATE:{r.style.transform=`${o} rotate(${s}deg)`,r.style.willChange=n;break}case b.PROP_ROTATEY:{r.style.transform=`${o} rotateY(${s}deg)`,r.style.willChange=n;break}case b.PROP_ROTATEX:{r.style.transform=`${o} rotateX(${s}deg)`,r.style.willChange=n;break}case b.PROP_ROTATEZ:{r.style.transform=`${o} rotateZ(${s}deg)`,r.style.willChange=n;break}case b.PROP_OPACITY:{r.style.opacity=`${t}`;break}case b.PROP_SCALE:{let i=this.#J===b.TYPE_SCROLLTRIGGER?t:1+t/1e3;r.style.transform=`${o} scale(${i})`,r.style.willChange=n;break}case b.PROP_SCALE_X:{let i=this.#J===b.TYPE_SCROLLTRIGGER?t:1+t/1e3;r.style.transform=`${o} scaleX(${i})`,r.style.willChange=n;break}case b.PROP_SCALE_Y:{let i=this.#J===b.TYPE_SCROLLTRIGGER?t:1+t/1e3;r.style.transform=`${o} scaleY(${i})`,r.style.willChange=n;break}default:{r.style[this.#oe.toLowerCase()]=`${t}px`;break}}}#Be(t){this.#Q&&t&&(t.style="")}#Ve(){if(!this.#xe)switch(this.#oe){case b.PROP_VERTICAL:case b.PROP_HORIZONTAL:case b.PROP_ROTATE:case b.PROP_ROTATEY:case b.PROP_ROTATEX:case b.PROP_ROTATEZ:case b.PROP_SCALE:return{transform:""};case b.PROP_OPACITY:return{opacity:""};default:return{[this.#oe.toLowerCase()]:""}}}destroy(){this.#ue?.stop?.(),this.#t(),this.#g(),this.#p(),this.#f(),this.#D(),this.#v(),this.#x(),this.#ue?.destroy?.(),this.#ue=null,this.#G=()=>{},this.#L?.value&&(this.#L.value=()=>0),this.#U?.value&&(this.#U.value=()=>0),this.#Z=()=>{},this.#se=()=>{},this.#W=()=>{},this.#q=()=>{},this.#ee=()=>{},this.#C&&this.#E&&this.#E?.destroy?.(),this.#S&&this.#S?.remove?.(),this.#y&&this.#y?.remove?.(),this.#S=void 0,this.#y=void 0,this.#E=void 0,this.#h=0;let t=this.#ce??this.#K;t&&"style"in t&&(t.style=""),this.#K=null,this.#Y=null,this.#z=null,this.#te=null,this.#ce=null}};function BI(e){return new po({...e,type:b.TYPE_PARALLAX})}function VI(e){return new po({...e,type:b.TYPE_SCROLLTRIGGER})}var Hu=window.innerHeight,Uu=document.body.offsetHeight,mo=!1,Gu=!0,zt=window.scrollY,ti=!0,Ht=!1,qu=()=>{},Ju=()=>{},ac=()=>{},ic,Ny=()=>{document.body.classList.remove("is-whelling")},WI=()=>{document.body.classList.add("is-whelling")};ue.setDefault({usePassive:!1});var jI=({velocity:e,rootElement:t})=>{let r=U.createLerp({data:{scrollValue:window.scrollY},precision:1,velocity:.1});ic=t;let o=r.subscribe(({scrollValue:h})=>{Ht||window.scrollTo({top:Math.round(h),left:0,behavior:"instant"})});r.onComplete(()=>{zt=window.scrollY});let n=u.useMouseWheel(h=>{if(Ht)return;h.preventDefault(),ti=!1,WI();let f=h.spinY??0,d=ue.clamp(f*e+zt,0,Uu-Hu);zt=d,r.goTo({scrollValue:d}).catch(()=>{})}),s=u.useMouseWheel(({preventDefault:h})=>{Gu&&h()}),i=u.useMouseWheel(u.debounce(()=>{Ny()},500)),a=u.useScrollEnd(()=>{let h=window.scrollY;zt=h,r.setImmediate({scrollValue:h})}),c=u.useScroll(()=>{if(!ti)return;let h=window.scrollY;zt=h,r.setImmediate({scrollValue:h})}),l=u.usePointerDown(()=>{Ht||(Ny(),r.stop(),zt=window.scrollY,ti=!0)}),p=new ResizeObserver(()=>{r.stop(),r.setImmediate({scrollValue:window.scrollY}),zt=window.scrollY,Hu=window.innerHeight,Uu=document.body.offsetHeight});return p.observe(t),{destroy:()=>{mo=!1,zt=0,ti=!0,Ht=!1,ic&&(p.unobserve(ic),p.disconnect()),r?.stop(),r?.destroy(),r=null,ic=null,o(),c(),a(),n(),l(),i(),s(),qu=()=>{},Ju=()=>{},ac=()=>{}},stop:()=>{r.stop(),zt=window.scrollY},update:()=>{r.setImmediate({scrollValue:window.scrollY})}}},cc=({velocity:e=100,rootElement:t=document.createElement("div")}={})=>{mo||(zt=window.scrollY,mo=!0,Ht=!1,Hu=window.innerHeight,Uu=document.body.offsetHeight,Gu=!0,ti=!1,{destroy:qu,stop:Ju,update:ac}=jI({velocity:e,rootElement:t}))},ir=()=>{!mo||Ht||(Ju(),Ht=!0)},Ut=()=>{!mo||!Ht||(Ht=!1)},ri=()=>{!mo||!Ht||(ac(),zt=window.scrollY,Ht=!1)},Yu=()=>{mo&&ac()},Xu=()=>{qu()},Py=()=>{Gu=!0};var Ay=()=>mo;var Oy="easeOutQuad",oi=new Rr({ease:Oy,data:{val:0}}),lc=!1,Ku=!1;oi.subscribe(({val:e})=>{window.scrollTo({top:e,left:0,behavior:"auto"}),Yu()});var Qu=()=>{Ku&&(document.body.style.overflow=""),oi?.updateEase?.(Oy),ri()},Zu=()=>{lc&&(oi.stop(),Qu())};u.useMouseWheel(()=>{Zu()});u.useMouseDown(()=>{Zu()});u.useTouchStart(()=>{Zu()});var Nr={to:(t,r)=>{if(typeof globalThis>"u")return;let o=t?cl(t)||u.checkType(Number,t)?cl(t)?be(t).top:t:(console.warn(`bodyScroll ${t} is not valid target, must be a node or a number`),0):0,n=Nt(r?.duration,"bodyScroll: duration",500);return Ku=de(r?.overflow,"bodyScroll: overflow",!1),Ba(r?.ease)&&oi?.updateEase?.(r?.ease),Ku&&(document.body.style.overflow="hidden"),new Promise(s=>{lc=!0,ir(),oi.goFromTo({val:window.scrollY},{val:o},{duration:n}).then(()=>{Qu(),lc=!1,s(!0)}).catch(()=>{Qu(),lc=!1,s(!0)})})}};var ni={END:"END",START:"START",CENTER:"CENTER"};var zI=e=>{switch(e){case ni.END:return"align-items:flex-end;";case ni.CENTER:return"align-items:center;";default:return"align-items:flex-start;"}},$y=({mainContainer:e,queryType:t,breakpoint:r,container:o,trigger:n,row:s,column:i,shadow:a,useSticky:c,columnHeight:l,columnWidth:p,columnAlign:h})=>{let f=ve.getBreackpoint(r),d="user-select:none",v=c?"relative":"absolute",y=c?"position:sticky;top:0;":"",T=zI(h),S=p?`width:${p}vw;`:"",_=`
      @media (${t}-width:${f}px){${o}{position:relative;${d}}}@media (${t}-width:${f}px){${n}{z-index:10;position:${v};pointer-events:none;overflow:hidden;top:0;left:0;right:0}}@media (${t}-width:${f}px){${s}{--sectionheight:${l}vh}}@media (${t}-width:${f}px){${s}{display:flex;height:100vh;${y}${T}}}@media (${t}-width:${f}px){${i}{height:var(--sectionheight);flex:0 0 auto;${S}}}.${a}{display:none}@media (${t}-width:${f}px){.${a}{width:100%;display:block;pointer-events:none}}.${a}{display:none}@media (${t}-width:${f}px){.${a}{pointer-events:none;display:block;position:absolute;left:0;right:0}.${a}--end,.${a}--in-center,.${a}--left,.${a}--out-center{opacity:0;border:1px red dashed;width:25%}.${a}--end.debug,.${a}--in-center.debug,.${a}--left.debug,.${a}--out-center.debug{opacity:1}.${a}--in-center{position:absolute;top:0;right:0;padding:0 40px;text-align:center}.${a}--out-center{position:absolute;top:0;right:0;padding:0 40px;text-align:center}.${a}--left{position:absolute;top:0;left:50%;transform:translateX(-50%);padding:0 40px;text-align:center}.${a}--end{position:absolute;top:0;left:0;padding-left:40px}}`,w=document.createElement("div");w.classList.add("scroller-style");let x=document.createElement("style");x.append(document.createTextNode(_)),w.append(x),e.prepend(w)};var si=class{#s=!0;#o=0;#i=!1;#c=0;#h=100;#l=100;#n=!1;#u=0;#r;#e;#m;#a;#d;#f;#t;#g;#p;#x;#S;#y;#b;#T;#R;#I;#M;#w;#P;#A;#E;#F;#$;#N;#D;#v;#C;#V;#O;#_;#X;#H;#k;#j;#L;#U;#G;#ne;#Z;#se;#W;#q;#ee;#ie;#me;#ae;#re;#he;constructor(t){this.#r=()=>{},this.#he=0,this.#V=t?.container??"",this.#j=[],this.#L=!1,this.#U=0,this.#G={},this.#ne=0,this.#Z=t?.children||[],this.#e=de(t?.useDrag,"HorizontalScroller: useDrag",!1),this.#m=Nt(t?.threshold,"HorizontalScroller: threshold",30),this.#a=de(t?.useWillChange,"HorizontalScroller: useWillChange",!1),this.#d=Do(t?.breakpoint,"breakpoint","horizontalScroller"),this.#f=Fo(t?.queryType,"queryType","horizontalScroller"),this.#t=de(t?.forceTranspond,"HorizontalScroller: forceTranspond",!1),this.#g=de(t?.addCss,"HorizontalScroller: addCss",!0),this.#p=de(t?.animateAtStart,"HorizontalScroller: animateAtStart",!1),this.#x=de(t?.ease,"HorizontalScroller: ease",!1),this.#S=za(t?.easeType??"","HorizontalScroller"),this.#y=de(t?.useSticky,"HorizontalScroller: useSticky",!1),this.#b=de(t?.animatePin,"HorizontalScroller: animatePin",!1),this.#T=de(t?.reverse,"HorizontalScroller: reverse",!1),this.#R=de(t?.useThrottle,"HorizontalScroller: useThrottle",!1),this.#I=Nt(t?.columnHeight,"HorizontalScroller: columnHeight",100),this.#M=Nt(t?.columnWidth,"HorizontalScroller: columnWidth",null),this.#w=t?.columnAlign?t.columnAlign.toUpperCase():ni.START,this.#P=mt(t?.onEnter,"HorizontalScroller: onEnter",X),this.#A=mt(t?.onEnterBack,"HorizontalScroller: onEnterBack",X),this.#E=mt(t?.onLeave,"HorizontalScroller: onLeave",X),this.#F=mt(t?.onLeaveBack,"HorizontalScroller: onLeaveBack",X),this.#$=mt(t?.afterInit,"HorizontalScroller: afterInit",X),this.#N=mt(t?.afterRefresh,"HorizontalScroller: afterRefresh",X),this.#D=mt(t?.afterDestroy,"HorizontalScroller: afterDestroy",X),this.#v=mt(t?.onTick,"HorizontalScroller: onTick",void 0),this.#C=u.checkType(String,t.root)?document.querySelector(t.root):t.root,this.#C||(this.#s=!1,console.warn("horizontal custom: root node not found")),this.#C.querySelector(this.#V)||(this.#s=!1,console.warn("horizontal custom: container node not found")),this.#O=this.#C.querySelector(t.trigger),this.#O||(this.#s=!1,console.warn("horizontal custom: trigger node not found")),this.#_=this.#C.querySelector(t.row),this.#_||(this.#s=!1,console.warn("horizontal custom: row node not found")),this.#X=this.#C.querySelectorAll(t.column),this.#X.length===0&&(this.#s=!1,console.warn("horizontal custom: column nodeList not found")),this.#H=this.#C.querySelectorAll("[data-shadow]");let o=t?.shadowClass||"shadow";this.#k=o.replace(".",""),this.#j=this.#_.querySelectorAll("a, button"),this.#Z.forEach(n=>{this.#_&&n.setScroller(this.#_),n.setDirection("horizontal"),n.setBreakPoint(this.#d),n.setQueryType(this.#f),n.init()}),this.#g&&$y({mainContainer:this.#C,queryType:this.#f,breakpoint:this.#d,container:this.#V,trigger:t?.trigger??"trigger",row:t.row,column:t.column,shadow:this.#k,useSticky:this.#y,columnHeight:this.#I,columnWidth:this.#M,columnAlign:this.#w}),this.#se=n=>{if(!this.#i)return;let{movementX:s}=n,i=this.#T?s:-s;this.#Q(i)},this.#W=()=>{ve[this.#f](this.#d)&&(ir(),this.#n&&this.#_&&(this.#_.style.cursor="move"),this.#i=!0,this.#he=this.#u)},this.#q=()=>{Ut(),this.#i=!1,u.useFrame(()=>{this.#_&&(this.#_.style.cursor="")})},this.#ee=()=>{Ut(),this.#i=!1,u.useFrame(()=>{this.#_&&(this.#_.style.cursor="")})},this.#ie=n=>{ve[this.#f](this.#d)&&(ir(),this.#c=-n.touches[0].clientX,this.#i=!0,this.#he=this.#u)},this.#me=()=>{Ut(),this.#i=!1},this.#ae=n=>{let s=-n.touches[0].clientX,i=this.#T?-s+this.#c:s-this.#c;this.#Q(i),this.#c=s,this.#n&&n.cancelable&&n.defaultPrevented&&n.preventDefault()},this.#re=n=>{Math.abs(this.#u-this.#he)>this.#m&&n.preventDefault()}}init(){this.#s&&oc(this.#ce.bind(this),this.#te.bind(this),this.#B.bind(this),this.#fe.bind(this))().then(()=>{this.#J(),this.#e&&this.#Y(),u.useResize(({horizontalResize:t})=>this.onResize(t)),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#$?.(),this.#Z.forEach(t=>{t.refresh()})})},3)})}#be(){[...this.#j].forEach(t=>t.setAttribute("draggable","false"))}#ve(){[...this.#j].forEach(t=>t.removeAttribute("draggable"))}#Q(t){this.#n&&u.useFrame(()=>window.scrollBy({top:t,left:0,behavior:"instant"}))}#K(){let t=window.scrollY;this.#n=this.#o-this.#l<t&&this.#o+this.#h+this.#U>t+window.innerHeight}#Y(){this.#r=u.useScroll(()=>this.#K()),this.#K(),this.#_.addEventListener("click",this.#re,{passive:!1}),this.#_.addEventListener("mousedown",this.#W,{passive:!0}),this.#_.addEventListener("mouseup",this.#q,{passive:!0}),this.#_.addEventListener("mouseleave",this.#ee,{passive:!0}),this.#_.addEventListener("touchstart",this.#ie,{passive:!0}),this.#_.addEventListener("touchend",this.#me,{passive:!0}),this.#_.addEventListener("mousemove",this.#se,{passive:!0}),this.#_.addEventListener("touchmove",this.#ae,{passive:!0})}#z(){this.#r(),this.#_.removeEventListener("click",this.#re),this.#_.removeEventListener("mousedown",this.#W),this.#_.removeEventListener("mouseup",this.#q),this.#_.removeEventListener("mouseleave",this.#ee),this.#_.removeEventListener("touchstart",this.#ie),this.#_.removeEventListener("touchend",this.#me),this.#_.removeEventListener("mousemove",this.#se),this.#_.removeEventListener("touchmove",this.#ae)}#te(){return!this.#O||!this.#C||!this.#_?new Promise(t=>{t(!0)}):new Promise(t=>{u.useFrame(()=>{let r=this.#U;this.#ne=100*(r-window.innerWidth)/r,r>0&&(this.#O.style.height=`${r}px`,this.#C.style.height=`${r}px`,this.#_.style.width=`${r}px`),t(!0)})})}#ce(){return new Promise(t=>{u.useFrame(()=>{if(!ve[this.#f](this.#d)){t(!0);return}this.#U=[...this.#X].map(r=>je(r)).reduce((r,o)=>r+o,0),t(!0)})})}#B(){return this.#O?new Promise(t=>{u.useFrame(()=>{if(!ve[this.#f](this.#d)||!this.#H){t(!0);return}let r=[...this.#H].map(o=>{let n=o.dataset.shadow,s=Object.hasOwn(o.dataset,"debug"),i=s?"debug":"",a=s?`left left : ${n}`:"",c=s?`in center : ${n}`:"",l=s?`center out : ${n}`:"",p=s?`in out : ${n}`:"";return` <div
                            class="${this.#k} ${this.#k}--${n}"
                            data-shadow="${n}"
                        >
                            <span
                                class="${this.#k}--in-center ${i}"
                            >
                                ${c}
                            </span>
                            <span
                                class="${this.#k}--out-center ${i}"
                            >
                                ${l}
                            </span>
                            <span
                                class="${this.#k}--left ${i}"
                            >
                                ${a}
                            </span>
                            <span
                                class="${this.#k}--end ${i}"
                            >
                                ${p}
                            </span>
                        </div>`}).join("");this.#O.innerHTML=r,t(!0)})}):new Promise(t=>{t(!0)})}#de(){this.#O&&(this.#O.innerHTML="")}#fe(){return new Promise(t=>{if(!ve[this.#f](this.#d)){t(!0);return}u.useFrame(()=>{this.#H&&([...this.#H].forEach(r=>{let o=this.#ne/100,n=r.dataset.shadow,s=je(r),i=le(this.#_),a=So(this.#_)?.x??0,c=this.#T?this.#U-(r.getBoundingClientRect().right-a):r.getBoundingClientRect().left-a,l=window.innerWidth/window.innerHeight,p=window.innerWidth-window.innerHeight,h=c/l,f=c-c/l,d=this.#C.querySelector(`.${this.#k}[data-shadow="${n}"]`),v=d?.querySelector(`.${this.#k}--in-center`),y=d?.querySelector(`.${this.#k}--out-center`),T=d?.querySelector(`.${this.#k}--left`),S=d?.querySelector(`.${this.#k}--end`),_=window.innerWidth>window.innerHeight?window.innerHeight:0,w=window.innerWidth>window.innerHeight?window.innerHeight/2:0,x=c===0?0:h+f/o-p/o,E=(()=>{let A=window.innerWidth>window.innerHeight?p/o:p/o+window.innerWidth/l;return c===0?0:A})(),I=(()=>{let A=s/l,$=(s-s/l)/o;return A+$+E})(),P=I/2+w;this.#y&&(this.#O.style["margin-top"]=`-${i}px`),d&&(d.style.top=`${x}px`),v&&(v.style.height=`${P}px`),y&&(y.style.height=`${P}px`),y&&(y.style.top=`${P}px`),T&&(T.style.height=`${E}px`),S&&(S.style.height=`${I+_}px`),d&&(d.style.height=`${E}px`)}),t(!0))})})}#J(){if(!this.#O||!ve[this.#f](this.#d))return;let t=new po({type:"scrolltrigger",item:this.#_,useWillChange:this.#a,trigger:this.#O,propierties:"x",breakpoint:"xSmall",pin:!this.#y,animatePin:this.#b,ease:this.#x,forceTranspond:this.#t,useThrottle:this.#R,easeType:this.#S,springConfig:"scroller",animateAtStart:this.#p,reverse:this.#T,dynamicRange:()=>-(this.#U-window.innerWidth),dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>this.#U},onTick:({value:r,parentIsMoving:o})=>{let n=r??0,s=Math.abs(-Math.round(n*100/(this.#U-window.innerWidth)));this.#u=n,this.#v&&this.#v({value:n,parentIsMoving:o,percent:this.#T?100-s:s}),this.#Z.forEach(i=>{i.move({value:n,parentIsMoving:o})})},onEnter:this.#P,onEnterBack:this.#A,onLeave:this.#E,onLeaveBack:this.#F});t.init(),this.#L=!0,this.#G=t,this.#o=be(this.#O).top,this.#be()}#ye(){oc(this.#ce.bind(this),this.#te.bind(this),this.#B.bind(this),this.#fe.bind(this))().then(()=>{this.#J(),this.#le()})}#le(){u.useFrameIndex(()=>{u.useNextTick(()=>{this.#N?.(),this.#Z.forEach(t=>{t?.refresh?.()})})},3)}refresh(){return!this.#L||!ve[this.#f](this.#d)?new Promise(t=>t(!0)):new Promise(t=>{oc(this.#ce.bind(this),this.#te.bind(this),this.#fe.bind(this))().then(()=>{this.#G?.stopMotion?.(),this.#o=be(this.#O).top,this.#L&&(this.#G?.refresh?.(),this.#le()),t(!0)})})}#pe({destroyAll:t=!1}){(this.#L||t)&&(this.#G?.destroy?.(),this.#G=null,this.#O&&(this.#O.style.height=""),this.#C&&(this.#C.style.height=""),this.#O&&(this.#O.style.marginTop=""),this.#de(),this.#ve(),this.#L=!1,u.useFrameIndex(()=>{if(this.#_&&(this.#_.style.width="",this.#_.style.transform=""),t&&this.#C){this.#e&&this.#z();let r=this.#C.querySelector(".scroller-style");r&&r.remove(),this.#C=null,this.#O=null,this.#_=null,this.#X=[],this.#H=[],this.#$=X,this.#N=X,this.#v=X,this.#P=X,this.#A=X,this.#E=X,this.#F=X,this.#G=null,this.#L=!1,this.#j=[],this.#C=null,this.#V=null,this.#O=null,this.#_=null,u.useNextTick(()=>{this.#D?.(),this.#D=X,this.#Z.forEach(o=>{o?.destroy?.(),o=null}),this.#Z=[]})}},3))}onResize(t){this.#L&&ve[this.#f](this.#d)?t&&this.refresh():!this.#L&&ve[this.#f](this.#d)?this.#ye():this.#L&&!ve[this.#f](this.#d)&&this.#pe({destroyAll:!1})}destroy(){this.#pe({destroyAll:!0})}};var ii=new Map,uc=e=>{let t=u.checkType(Element,e);return t||console.warn(`slide utils ${e} is not a valid Dom element`),t},HI=e=>{let t=new Rr({ease:"easeOutQuad",data:{val:0}});return{tween:t,unsubscribe:t.subscribe(({val:r})=>{e.style.height=`${r}px`})}},Pr={subscribe:n=>{if(!uc(n))return()=>{};if(ii.has(n))return console.warn(`slide utils ${n} is alredysubscribed`),()=>{};let i=HI(n);return ii.set(n,i),()=>{i.unsubscribe();let{tween:a}=i;a.destroy(),ii.delete(n)}},reset:n=>{uc(n)&&(n.style.height="0",n.style.overflow="hidden")},up:async n=>{if(!uc(n))return new Promise(c=>c(!0));let s=ii.get(n);if(!s)return console.warn("slide element not exist in slide store"),new Promise(c=>c(!0));let{tween:i}=s,a=le(n);await i.goFromTo({val:a},{val:0},{duration:500})},down:async n=>{if(!uc(n))return new Promise(l=>l(!0));let s=ii.get(n);if(!s)return console.warn("slide element not exist in slide store"),new Promise(l=>l(!0));let{tween:i}=s,{val:a}=i.get();n.style.height="auto";let c=le(n);n.style.height=`${a}px`,await i.goTo({val:c},{duration:500}),u.useNextTick(()=>{n.style.height="auto"})}};var _t=class e{static#s=3e3;#o=!0;#i=0;#c=0;#h=0;#l=0;#n=0;#u=30;#r=0;#e=!1;#m=0;#a=0;#d;#f;#t;#g;#p;#x;#S;#y;#b;#T;#R;#I;#M=()=>Ut();#w;#P;#A;#E;#F;#$;#N;#D;#v;#C;#V;#O;#_;#X;#H;#k;#j;#L;#U;#G;#ne=0;#Z=0;#se;#W;#q=!1;#ee=1;#ie=0;#me=0;#ae=0;#re=null;#he=u.getTime();#be;#ve;constructor(t){this.#d=X,this.#f=X,this.#t=X,this.#g=X,this.#p=X,this.#x=X,this.#S=X,this.#y=X,this.#b=X,this.#T=X,this.#R=X,this.#I=X,this.#w={updateVelocity:X,subscribe:X,onComplete:X,goTo:()=>Promise.resolve(),set:()=>Promise.resolve(),stop:X,destroy:X},this.#P=X,this.#A=X,this.#E=Ws(t?.direction,"SmoothScroller"),this.#F=!1,this.#$=za(t?.easeType??"","SmoothScroller"),this.#N=Do(t?.breakpoint,"breakpoint","SmoothScroller"),this.#D=Fo(t?.queryType,"queryType","SmoothScroller"),this.#v=u.checkType(String,t?.scroller)?document.querySelector(t.scroller):t.scroller,this.#v||(console.warn("SmoothScroller: scroller node not found"),this.#o=!1),this.#C=t?.screen?u.checkType(String,t.screen)?document.querySelector(t.screen):t.screen:document.documentElement,this.#C||(this.#o=!1,console.warn("SmoothScroller: screen node not found")),this.#V=de(t?.scopedEvent,"SmoothScroller: scopedEvent",!1),this.#O=Nt(t?.speed,"SmoothScroller: speed",60),this.#_=de(t?.drag,"SmoothScroller: drag",!1),this.#X=mt(t?.onTick,"SmoothScroller: onTick",X),this.#H=mt(t?.onUpdate,"SmoothScroller: onUpdate",X),this.#se=de(t?.useHorizontalScroll,"SmoothScroller: useBothAxis",!1),this.#k=mt(t?.afterRefresh,"SmoothScroller: afterRefresh",X),this.#j=mt(t?.afterInit,"SmoothScroller: afterInit",X),this.#W=Dv(t?.snapPoints,"SmoothScroller: snapPoints",[]),this.#be=Nt(t?.velocityThreshold,"SmoothScroller: velocityThreshold",3),this.#ve=Nt(t?.velocityEasing,"SmoothScroller: velocityEasing",.4),this.#L=t?.children||[],this.#L.forEach(r=>{r.setScroller(this.#v),r.setDirection(this.#E),r.setScreen(this.#C),r.setBreakPoint(this.#N),r.setQueryType(this.#D),r.init()}),this.#U=r=>{this.#K();let{spinY:o}=u.normalizeWheel(r);this.#fe({spinY:o})},this.#G=r=>{let{clientX:o,clientY:n}=r.touches?r.touches[0]:r;this.#de({client:{x:o,y:n}})},this.#I=u.useMouseWheel(u.debounce(()=>{this.#Q()},500))}#Q(){this.#v&&this.#v.classList.remove("is-whelling")}#K(){this.#v&&this.#v.classList.add("is-whelling")}#Y(){return this.#r>0}init(){this.#o&&(this.#$===b.EASE_SPRING?this.#w=new Tt({data:{val:0},config:"scroller",configProps:{tension:15}}):(this.#w=new kr({data:{val:0}}),this.#w.updateVelocity(.1)),this.#V&&(this.#v.addEventListener("wheel",this.#U,{passive:!0}),this.#v.addEventListener("mousemove",this.#G,{passive:!0}),this.#v.addEventListener("touchmove",this.#G,{passive:!0})),this.#V||(this.#y=u.useMouseWheel(t=>{this.#pe(t)}),this.#b=u.useMouseMove(t=>{this.#le(t)}),this.#T=u.useTouchMove(t=>{this.#le(t)})),this.#d=u.useResize(()=>this.refresh()),this.#f=u.useScrollStart(()=>this.#B()),this.#t=u.useScrollEnd(()=>this.#B()),this.#g=u.useTouchStart(t=>this.#J(t)),this.#p=u.useTouchEnd(t=>this.#ye(t)),this.#x=u.useMouseDown(t=>this.#J(t)),this.#S=u.useMouseUp(t=>this.#ye(t)),this.#v.addEventListener("mouseleave",this.#M),this.#_&&(this.#R=u.useMouseClick(({target:t,preventDefault:r})=>{this.#we({target:t,preventDefault:r})})),this.#ce(),ve[this.#D](this.#N)&&(this.#z(),this.#B()),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#F||(this.#j?.({shouldScroll:this.#Y()}),this.#L.forEach(t=>{t.refresh()}))})},3))}#z(){if(!this.#v)return;this.#v.style["user-select"]="none",[...this.#v.querySelectorAll("a, button")].forEach(r=>{r.setAttribute("draggable","false"),r.style["user-select"]="none"})}#te(){if(!this.#v)return;this.#v.style["user-select"]="",[...this.#v.querySelectorAll("a, button")].forEach(r=>{r.removeAttribute("draggable"),r.style["user-select"]=""})}#ce(){this.#w&&(this.#P=this.#w.subscribe(({val:t})=>{this.#v.style.transform=this.#E==b.DIRECTION_VERTICAL?`translate3d(0px, 0px, 0px) translateY(${-Math.trunc(t)}px)`:`translate3d(0px, 0px, 0px) translateX(${-Math.trunc(t)}px)`,this.#L.forEach(r=>{r.triggerScrollStart()}),u.useNextTick(()=>{this.#X({value:-t,percent:this.#c,parentIsMoving:!0}),this.#L.forEach(r=>{r.move({value:-t,parentIsMoving:!0})})})}),this.#A=this.#w.onComplete(({val:t})=>{this.#v.style.transform=this.#E==b.DIRECTION_VERTICAL?`translateY(${-Math.trunc(t)}px)`:`translateX(${-Math.trunc(t)}px)`,u.useNextTick(()=>{this.#X({value:-t,percent:this.#c,parentIsMoving:!1}),this.#L.forEach(r=>{r.triggerScrollEnd(),r.move({value:-t,parentIsMoving:!1})})})}))}#B(){this.#C&&(this.#h=this.#C===document.documentElement?window.innerWidth:je(this.#C),this.#l=this.#C===document.documentElement?window.innerHeight:le(this.#C),this.#r=this.#E===b.DIRECTION_VERTICAL?this.#v.offsetHeight-this.#l:this.#v.offsetWidth-this.#h,this.#Te(),this.#Se())}#de({client:t}){!this.#e||!this.#_||(this.#m=this.#a,this.#a=this.#Ce({x:t?.x??0,y:t?.y??0}),this.#i+=Math.round(this.#m-this.#a),this.#Te(),this.#Se())}#fe({spinY:t=0}){if(!ve[this.#D](this.#N))return;this.#e=!1;let r=at(t,-1,1);this.#i+=r*this.#O,this.#Te(),!(this.#W.length>0&&this.#xe())&&(this.#Se(),this.#W.length>0&&this.#oe())}#J({target:t,client:r}){ve[this.#D](this.#N)&&(t===this.#v||ss(this.#v,t))&&(this.#n=this.#i,this.#e=!0,this.#W.length>0&&this.#xe(),this.#m=this.#Ce({x:r?.x??0,y:r?.y??0}),this.#a=this.#Ce({x:r?.x??0,y:r?.y??0}))}#ye(){this.#e=!1,this.#W.length>0&&(this.#_e(),this.#oe())}#le({target:t,client:r,preventDefault:o}){if((t===this.#v||ss(this.#v,t))&&this.#e&&this.#_){o(),this.#m=this.#a,this.#a=this.#Ce({x:r?.x??0,y:r?.y??0});let n=Math.round(this.#m-this.#a);this.#i+=n,this.#Te(),this.#Se()}}#pe({target:t,spinY:r=0,spinX:o=0,preventDefault:n}){if(ve[this.#D](this.#N)&&(this.#K(),t===this.#v||ss(this.#v,t))){this.#e=!1,n?.(),ir();let s=Math.abs(this.#ne-o),i=Math.abs(this.#Z-r),a=this.#se&&s>i?o:r;if(Math.abs(a)===0||(this.#i+=at(a,-1,1)*this.#O,this.#Te(),this.#W.length>0?this.#xe():!1))return;this.#Se(),this.#Z=r,this.#ne=o,this.#W.length>0&&this.#oe()}}#oe(){this.#re&&clearTimeout(this.#re),this.#re=setTimeout(()=>{this.#q=!1,this.#ee=1,this.#re=null},Math.ceil(e.#s/u.getFps()))}#xe(){if(this.#W.length===0)return;this.#re&&(clearTimeout(this.#re),this.#re=null),this.#q&&(this.#q=!1);let t=!this.#e&&this.#_e();return t&&this.#oe(),t}#_e(){if(this.#W.length===0||this.#ee<this.#be||this.#q)return;let t=this.#ae===1?this.#W.find(r=>this.#c<=r):this.#W.findLast(r=>this.#c>=r);if(!(!t&&t!==0))return this.#q=!0,this.#he=u.getTime(),this.move(t),!0}move(t){return ve[this.#D](this.#N)?(this.#c=t,this.#i=this.#c*this.#r/100,this.#w.goTo({val:this.#i})):new Promise(r=>r())}set(t){ve[this.#D](this.#N)&&(this.#c=t,this.#i=this.#c*this.#r/100,this.#w.set({val:this.#i}))}#ge(){let t=u.getTime(),r=t-this.#me,o=this.#i-this.#ie;this.#ae=Math.sign(o);let n=Math.ceil(e.#s/u.getFps());if(r<=n&&o!==0){let i=Math.max(r,16.666666666666668),a=o/i,c=Math.round((Math.abs(a)+1)*1e4)/1e4;this.#ee=Math.max(1,this.#ve*c+(1-this.#ve)*this.#ee)}r>n&&(this.#ee=1),this.#me=t,this.#ie=this.#i}#Te(){if(this.#W.length>0&&this.#q)return;if(this.#W.length>0){let r=u.getTime();if(Math.abs(this.#he-r)<100)return}let t=this.#r>0?this.#i*100/this.#r:0;this.#c=at(t,0,100),this.#i=at(this.#i,0,this.#r),this.#W.length>0&&this.#ge()}#Se(){this.#W.length>0&&this.#q||(this.#w.goTo({val:this.#i}).catch(()=>{}),this.#H?.({value:-this.#i,percent:this.#c,parentIsMoving:!0}))}#we({target:t,preventDefault:r}){ve[this.#D](this.#N)&&(t===this.#v||ss(this.#v,t))&&Math.abs(this.#i-this.#n)>this.#u&&r()}#Ce({x:t,y:r}){return!t||!r?0:this.#E===b.DIRECTION_VERTICAL?r:t}refresh(){if(!ve[this.#D](this.#N)){this.#te(),this.#w?.stop?.(),u.useFrame(()=>{u.useNextTick(()=>{this.#v.style.transform=""})});return}this.#B(),this.#z(),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#k?.({shouldScroll:this.#Y()}),this.#L.forEach(t=>{t.refresh()})})},2)}destroy(){this.#F=!0,this.#te(),this.#d(),this.#f(),this.#t(),this.#g(),this.#p(),this.#x(),this.#S(),this.#y(),this.#b(),this.#T(),this.#R(),this.#P(),this.#A(),this.#I(),this.#w?.destroy(),this.#w=null,this.#L.forEach(t=>{t?.destroy?.()}),this.#L=[],this.#X=X,this.#H=X,this.#k=X,this.#j=X,this.#re&&(clearTimeout(this.#re),this.#re=null),this.#v.removeEventListener("mouseleave",this.#M),this.#M=X,this.#V&&(this.#v?.removeEventListener("wheel",this.#U),this.#v?.removeEventListener("mousemove",this.#G),this.#v?.removeEventListener("touchmove",this.#G)),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#v=null,this.#C=null})},3)}};var Ly=!1,UI=new Set(["scrollerN0","scrollerN1"]),Dy=()=>{let e=document.querySelector("#root");e&&(cc({rootElement:e}),m.mainStore.watch("beforeRouteChange",()=>{ir(),Py()}),m.mainStore.watch("afterRouteChange",()=>{let t=m.getActiveRoute()?.route;Ly=UI.has(t),u.useFrameIndex(()=>{if(Ly){Xu();return}!Ay()&&cc({rootElement:e}),ri()},30)}))};function Fy(){let e=navigator.userAgent,t=document.body;if(/chrome|chromium|crios/i.test(e)){t.classList.add("is-chrome");return}if(/firefox|fxios/i.test(e)){t.classList.add("is-firefox");return}if(/safari/i.test(e)){t.classList.add("is-safari");return}if(/edg/i.test(e)){t.classList.add("is-edge");return}}var oe=async({source:e})=>{let t=await fetch(e);if(!t.ok)return console.warn(`${e} not found`),{success:!1,data:""};let r={};try{r=await t.text()}catch(o){return console.warn(o),{success:!1,data:r}}return{success:!0,data:r}},Ot=async({source:e})=>{let t=await fetch(e);if(!t.ok)return console.warn(`${e} not found`),{success:!1,data:""};let r={};try{r=await t.json()}catch(o){return console.warn(o),{success:!1,data:r}}return{success:!0,data:r}};function Gt(e,t){return Math.floor(Math.random()*(t-e+1)+e)}var By=e=>new XMLSerializer().serializeToString(e).replaceAll(' xmlns="http://www.w3.org/1999/xhtml"',"");var Vy,Wy={},GI="./asset/svg/icons/",qI=[{name:"gitHubIcon",source:"icon-github.svg"},{name:"searchIcons",source:"search.svg"},{name:"historyIcons",source:"history.svg"},{name:"starOutline",source:"star-outline.svg"},{name:"previous",source:"previous.svg"},{name:"close",source:"close.svg"},{name:"up",source:"up.svg"},{name:"swap",source:"swap.svg"},{name:"selectAll",source:"select-all.svg"}],ar=()=>Vy,Gn=()=>Wy,jy=async()=>{let{success:e,data:t}=await Ot({source:"./data/common.json"});e||console.warn("data fail to load"),Vy=t},zy=async()=>{let e=qI.map(({name:r,source:o})=>oe({source:`${GI}${o}`}).then(n=>({name:r,result:n})));Wy=(await Promise.all(e)).map(({name:r,result:o})=>o.success?{name:r,data:o.data}:{name:r,data:"icon load error"}).reduce((r,{name:o,data:n})=>({...r,[o]:n}),{})};var Hy=()=>g`
        <div class="error-page">
            <div class="error-page__content">
                <h1 class="error-page__title title-big">Page not found</h1>
                <a class="error-page__link" href="./#home">back to home</a>
            </div>
        </div>
    `;var Uy=({screenElement:e,scrollerElement:t,hideControls:r})=>{let o=new _t({screen:e,scroller:t,direction:"horizontal",drag:!0,useHorizontalScroll:!0,easeType:"lerp",breakpoint:"small",afterInit:({shouldScroll:n})=>{r(n)},afterRefresh:({shouldScroll:n})=>{r(n)}});return o.init(),{destroy:()=>{o.destroy()},refresh:()=>{o.refresh()}}};var JI=e=>e<10?`0${e}`:`${e}`,Gy=({setRef:e,getRef:t,onMount:r,bindEffect:o,getProxi:n})=>{let s=n(),i=()=>{},a=()=>{};return r(()=>{let{screenElement:c,scrollerElement:l}=t();return{destroy:i,refresh:a}=Uy({screenElement:c,scrollerElement:l,hideControls:p=>{s.showControls=p}}),u.useNextLoop(()=>{a()}),setTimeout(()=>{"isMounted"in s&&(s.isMounted=!0)},500),()=>{i(),i=()=>{},a=()=>{}}}),g`<div class="l-links">
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
                                                >${JI(l)}</span
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
    </div>`};var qy=m.createComponent({tag:"layout-links",component:Gy,props:{title:()=>({value:"",type:String}),items:()=>({value:[],type:Array})},state:{isMounted:()=>({value:!1,type:Boolean}),showControls:()=>({value:!1,type:Boolean})}});m.useComponent([qy]);var pc=async({props:e})=>{let{source:t}=e,{data:r}=await Ot({source:t});return g` <div class="l-links">
        <layout-links
            ${m.staticProps({title:r.title,items:r.items})}
        ></layout-links>
    </div>`};var Jy=()=>g`
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
    `;var mc=m.createComponent({tag:"doc-container",component:Jy});var Yy=()=>g`
        <div class="c-doc-title">
            <h2><mobjs-slot></mobjs-slot></h2>
        </div>
    `;var hc=m.createComponent({tag:"doc-title",component:Yy,state:{}});var Xy=()=>g`
        <div class="c-doc-title-small">
            <mobjs-slot></mobjs-slot>
        </div>
    `;var dc=m.createComponent({tag:"doc-title-small",component:Xy,state:{}});var bT=PC(gT(),1);var cp=bT.default;var vT="[A-Za-z$_][0-9A-Za-z$_]*",FM=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],BM=["true","false","null","undefined","NaN","Infinity"],yT=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],TT=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],_T=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],VM=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],WM=[].concat(_T,yT,TT);function ST(e){let t=e.regex,r=(B,{after:V})=>{let F="</"+B[0].slice(1);return B.input.indexOf(F,V)!==-1},o=vT,n={begin:"<>",end:"</>"},s=/<[A-Za-z0-9\\._:-]+\s*\/>/,i={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(B,V)=>{let F=B[0].length+B.index,z=B.input[F];if(z==="<"||z===","){V.ignoreMatch();return}z===">"&&(r(B,{after:F})||V.ignoreMatch());let te,ae=B.input.substring(F);if(te=ae.match(/^\s*=/)){V.ignoreMatch();return}if((te=ae.match(/^\s+extends\s+/))&&te.index===0){V.ignoreMatch();return}}},a={$pattern:vT,keyword:FM,literal:BM,built_in:WM,"variable.language":VM},c="[0-9](_?[0-9])*",l=`\\.(${c})`,p="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",h={className:"number",variants:[{begin:`(\\b(${p})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${p})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},f={className:"subst",begin:"\\$\\{",end:"\\}",keywords:a,contains:[]},d={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"xml"}},v={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"css"}},y={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"graphql"}},T={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,f]},_={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},w=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,d,v,y,T,{match:/\$\d+/},h];f.contains=w.concat({begin:/\{/,end:/\}/,keywords:a,contains:["self"].concat(w)});let x=[].concat(_,f.contains),E=x.concat([{begin:/(\s*)\(/,end:/\)/,keywords:a,contains:["self"].concat(x)}]),I={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:E},P={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},A={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...yT,...TT]}},$={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},N={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[I],illegal:/%/},R={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function O(B){return t.concat("(?!",B.join("|"),")")}let D={match:t.concat(/\b/,O([..._T,"super","import"].map(B=>`${B}\\s*\\(`)),o,t.lookahead(/\s*\(/)),className:"title.function",relevance:0},k={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},L={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},I]},C="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",M={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(C)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[I]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:a,exports:{PARAMS_CONTAINS:E,CLASS_REFERENCE:A},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),$,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,d,v,y,T,_,{match:/\$\d+/},h,A,{scope:"attr",match:o+t.lookahead(":"),relevance:0},M,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[_,e.REGEXP_MODE,{className:"function",begin:C,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:E}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:n.begin,end:n.end},{match:s},{begin:i.begin,"on:begin":i.isTrulyOpeningTag,end:i.end}],subLanguage:"xml",contains:[{begin:i.begin,end:i.end,skip:!0,contains:["self"]}]}]},N,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[I,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},k,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[I]},D,R,P,L,{match:/\$[(.]/}]}}cp.registerLanguage("javascript",ST);var xT=async({ref:e,source:t})=>{if(!e)return;let{success:r,data:o}=await oe({source:t});if(!r){e.textContent="something went wrong";return}e.textContent=o,cp.highlightElement(e),e.style.height=""},jM=()=>getComputedStyle(document.documentElement).getPropertyValue("--snippet-line-height-value"),CT=({onMount:e,setRef:t,getRef:r,delegateEvents:o,bindEffect:n,getProxi:s,bindObject:i})=>{let a=s(),c=jM(),l="20rem",p=Number(a.numLines)>15,h=p?"use-expand":"",f=`${a.numLines*Number(c)}rem`;return e(async()=>{let{codeEl:d}=r();return a.awaitLoad?await xT({ref:d,source:a.source}):xT({ref:d,source:a.source}),()=>{}}),g`<div
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
    </div>`};var ET=m.createComponent({tag:"mob-snippet",component:CT,props:{source:()=>({value:"",type:String}),numLines:()=>({value:1,type:Number}),awaitLoad:()=>({value:!1,type:Boolean})},state:{contentIsLoaded:()=>({value:!1,type:Boolean}),isExpanded:()=>({value:!1,type:Boolean})}});var li="debug_component",yc="debug_filter_list",Tc="debug_overlay",_c="debug_tree",ui="quick_nav",pi="scroll_down_label",mi="scroll_to",wT="header",Sc="mob_navigation",hi="mob_navigation_container",xc="search_overlay",di="search_overlay_list",Ho="search_overlay_header",Cc="right-sidebar",Ec="route-loader";var IT=({id:e,label:t,element:r,isSection:o,isNote:n})=>{m.useMethodByName(mi)?.addItem?.({id:e,label:t,element:r,isSection:o,isNote:n})},MT=e=>{m.useMethodByName(mi)?.setActiveLabel?.(e)};function zM({label:e}){return e?.length>0}var HM=async({id:e,label:t,element:r,isSection:o,isNote:n})=>{await m.tick(),IT({id:e,label:t,element:r,isSection:o,isNote:n}),$p(r)&&!o&&MT(t)},kT=({getState:e,onMount:t})=>{let{style:r,line:o,id:n,label:s,isSection:i,isNote:a}=e(),c=o?"spacer--line":"";return t(({element:l})=>{zM({label:s})&&HM({id:n,label:s,element:l,isSection:i,isNote:a})}),g`<div id="${n}" class="spacer spacer--${r} ${c}">
        <span></span>
    </div>`};var RT=m.createComponent({tag:"mob-spacer",component:kT,props:{style:()=>({value:"x-small",type:String,validate:e=>["x-small","small","medium","big"].includes(e),strict:!0}),line:()=>({value:!1,type:Boolean}),id:()=>({value:"",type:String}),label:()=>({value:"",type:String}),isSection:()=>({value:!1,type:Boolean}),isNote:()=>({value:!1,type:Boolean})}});var NT=({getState:e,delegateEvents:t})=>{let{content:r,anchor:o}=e();return g`<div>
        <button
            type="button"
            class="anchor-button"
            ${t({click:()=>{let n=document.querySelector(o);if(!n)return;let s=be(n).top-50;Nr.to(s)}})}
        >
            ${r}
            <span class="anchor-button__arrow">
                <span class="anchor-button__arrow__start"></span>
                <span class="anchor-button__arrow__end"></span>
            </span>
        </button>
    </div>`};var PT=m.createComponent({tag:"anchor-button",component:NT,props:{anchor:()=>({value:"",type:String}),content:()=>({value:"",type:String})}});var UM=({items:e,links:t})=>t?e.map(({label:r,url:o})=>g`<li>
                          <a href="${o}" class="list-links">
                              ${r}
                              <span class="list-links__arrow">
                                  <span class="list-links__arrow__start"></span>
                                  <span class="list-links__arrow__end"></span>
                              </span>
                          </a>
                      </li>`).join(""):e.map(r=>g` <li>${r}</li> `).join(""),AT=({getState:e})=>{let{style:t,color:r,items:o,links:n}=e(),s=`is-${r}`;return g`<ul class="ul ul--${t} ${s} ${n?"use-links":"use-default"}">
        ${UM({items:o,links:n})}
    </ul>`};var OT=m.createComponent({tag:"mob-list",component:AT,props:{style:()=>({value:"medium",type:String,validate:e=>["small","medium","big"].includes(e),strict:!0}),dots:()=>({value:!0,type:Boolean}),links:()=>({value:!1,type:Boolean}),color:()=>({value:"black",type:String,validate:e=>["white","black","grey","hightlight"].includes(e)}),items:()=>({value:[],type:Array})}});var $T=({getState:e})=>{let{style:t,color:r,boxed:o,note:n}=e(),s=r==="inherit"?"":`is-${r}`;return g`<p
        class="p p--${t} ${o?"p--boxed":""} ${n?"p--note":""} ${s}"
    >
        <mobjs-slot></mobjs-slot>
    </p>`};var LT=m.createComponent({tag:"mob-paragraph",component:$T,props:{style:()=>({value:"medium",type:String,validate:e=>["small","medium","big"].includes(e),strict:!0}),color:()=>({value:"inherit",type:String,validate:e=>["inherit","white","hightlight","black"].includes(e)}),boxed:()=>({value:!1,type:Boolean}),note:()=>({value:!1,type:Boolean})}});var GM=e=>e.length>0?g`<span class="title-index">${e}</span>`:"",DT=({getProxi:e})=>{let t=e(),r=t.color==="inherit"?"":`is-${t.color}`,o=t.isBold?"is-bold":"",n=t.isSection?"is-section":"";return g`<${t.tag} class="${r} ${o} ${n}">
            ${GM(t.index)}
            <span class="title-content">
                <mobjs-slot></mobjs-slot>
            </span>
        </${t.tag}>`};var FT=m.createComponent({tag:"mob-title",component:DT,props:{tag:()=>({value:"h1",type:String}),color:()=>({value:"inherit",type:String,validate:e=>["inherit","white","black"].includes(e)}),isSection:()=>({value:!1,type:Boolean}),isBold:()=>({value:!1,type:Boolean}),index:()=>({value:"",type:String})}});var qM=({data:e,staticProps:t,awaitLoadSnippet:r})=>e.map(o=>{let{component:n,props:s,content:i}=o;return g`
                <${n} ${t({...s,awaitLoad:r})}>
                    ${i??""}
                </${n}>
            `}).join(""),JM=async({source:e,data:t})=>{if(t&&t.length>0)return t;let{success:r,data:o}=await Ot({source:e});return r?o.data:[]},BT=async({getState:e,staticProps:t})=>{let{source:r,data:o}=e(),n=await JM({source:r,data:o}),{awaitLoadSnippet:s,usePadding:i}=e();return g`
        <section class="html-content ${i?"use-padding":""}">
            ${qM({data:n,staticProps:t,awaitLoadSnippet:s})}
        </section>
    `};var YM=async({proxi:e})=>{let{success:t,data:r}=await oe({source:e.url});t&&(e.source=r)},VT=({getProxi:e,invalidate:t,onMount:r})=>{let o=e();return r(()=>{YM({proxi:o})}),g`
        <div class="c-doc-svg ${o.className}">
            ${t({observe:()=>o.source,render:()=>o.source})}
        </div>
    `};var WT=m.createComponent({tag:"doc-svg",component:VT,props:{className:()=>({value:"",type:String}),url:()=>({value:"",type:String})},state:{source:()=>({value:g`<span class="c-doc-svg__loading">
                    loading image ...
                </span>`,type:String})}});var wc=m.createComponent({tag:"html-content",component:BT,props:{source:()=>({value:"",type:String}),data:()=>({value:[],type:Array}),awaitLoadSnippet:()=>({value:!1,type:Boolean}),useTriangle:()=>({value:!0,type:Boolean}),usePadding:()=>({value:!0,type:Boolean})},child:[OT,LT,FT,ET,RT,PT,WT]});var jT=({bindEffect:e,getProxi:t})=>{let r=t(),o=r.isSection?"is-section":"",n=r.isNote?"is-note":"";return g`
        <button
            type="button"
            class="${o} ${n}"
            ${e({toggleClass:{active:()=>r.active}})}
        >
            <span>${r.label}</span>
        </button>
    `};var zT=m.createComponent({tag:"scroll-to-button",component:jT,props:{label:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean}),isSection:()=>({value:!1,type:Boolean}),isNote:()=>({value:!1,type:Boolean})}});var fi=!1;function XM({delegateEvents:e,bindProps:t,proxi:r}){return r.anchorItems.map(o=>{let n=o.isSection||o.isNote?"":e({click:async()=>{let{id:s,label:i,element:a}=o,c=s==="start"?0:be(a).top-50;fi=!0,r.activeLabel=i,await Nr.to(c),setTimeout(()=>{fi=!1},1e3)}});return g`
                <li>
                    <scroll-to-button
                        ${n}
                        ${t(()=>({active:r.activeLabel===o.label,label:o.label,isSection:o.isSection??!1,isNote:o.isNote??!1}))}
                    >
                    </scroll-to-button>
                </li>
            `}).join("")}var HT=({proxi:e,direction:t,winHeight:r})=>{u.useFrame(()=>{u.useNextTick(()=>{if("anchorItems"in e){if(t==="DOWN"){let o=e.anchorItems.findLast(({top:n,isNote:s})=>!s&&n<window.scrollY+r-200);e.activeLabel=o?o.label:""}if(t==="UP"){let o=e.anchorItems.findLast(({top:n,isNote:s})=>!s&&n<window.scrollY+200);e.activeLabel=o?o.label:""}}})})},UT=({onMount:e,delegateEvents:t,bindProps:r,invalidate:o,computed:n,addMethod:s,updateState:i,getProxi:a})=>{let c=a(),l="DOWN",p=window.innerHeight;return s("addItem",({id:h,label:f,element:d,isSection:v,isNote:y})=>{i("anchorItemsToBeComputed",T=>[...T,{id:h,label:f,element:d,isSection:v,isNote:y}])}),s("setActiveLabel",h=>{fi||(c.activeLabel=h)}),e(()=>{if(ue.mq("max","desktop"))return;n(()=>c.anchorItems,()=>c.anchorItemsToBeComputed.map(y=>({...y,top:be(y.element).top})));let h=u.useScrollThrottle(({direction:y})=>l=y),f=new ResizeObserver(u.debounce(()=>{u.useFrame(()=>{u.useNextTick(()=>{p=window.innerHeight})}),"anchorItems"in c&&c.anchorItems.forEach(y=>{y.top=be(y.element).top})},200));f.observe(m.getRoot());let d=c.updateAnchorOnWheel?u.useMouseWheel(u.debounce(()=>{fi||HT({proxi:c,direction:l,winHeight:p})},600)):()=>{},v=u.useScrollEnd(()=>{fi||HT({proxi:c,direction:l,winHeight:p})});return()=>{d(),h(),v(),f.unobserve(m.getRoot()),f.disconnect(),f=null}}),g`
        <div class="c-scroll-to">
            <ul>
                ${o({observe:()=>c.anchorItems,render:()=>XM({delegateEvents:t,bindProps:r,proxi:c})})}
            </ul>
        </div>
    `};var GT=m.createComponent({tag:"scroll-to",component:UT,state:{activeLabel:()=>({value:"",type:String}),updateAnchorOnWheel:()=>({value:!1,type:Boolean}),anchorItemsToBeComputed:()=>({value:[],type:Array}),anchorItems:()=>({value:[],type:Array,transform:e=>e.toSorted(function(t,r){let{element:o}=t,{element:n}=r;return o===n||!o||!n?0:o.compareDocumentPosition(n)&2?1:-1})})},child:[zT]});var Ic=({breadCrumbs:e})=>e.map((t,r)=>r===e.length-1?g`<a href="${t.url}" class="breadcrumbs__arrow">
                          <div class="breadcrumbs__arrow__start"></div>
                          <div class="breadcrumbs__arrow__end"></div>
                      </a>
                      <a class="breadcrumbs__link" href="${t.url}"
                          >${t.title}</a
                      >`:g`<a class="breadcrumbs__link" href="${t.url}"
                      >${t.title}</a
                  >`).join("");var Mc=e=>{m.useMethodByName(Cc)?.updateList(e??[])};m.useComponent([mc,dc,GT,hc,wc]);var Be=async({props:e})=>{let{source:t,title:r,breadCrumbs:o,rightSidebar:n}=e,{data:s}=await Ot({source:t});return Mc(n??[]),g` <doc-container>
        <div>
            <html-content
                slot="docs"
                ${m.staticProps({data:s.data,useMaxWidth:!0})}
            ></html-content>
            <doc-title-small slot="section-title-small"
                ><div>
                    ${Ic({breadCrumbs:o})}<span>${r}</span>
                </div></doc-title-small
            >
            <scroll-to name="${mi}" slot="section-links"></scroll-to>
            <doc-title slot="section-title">${r}</doc-title>
        </div>
    </doc-container>`};m.useComponent([mc,dc,hc,wc]);var ie=async({props:e})=>{let{source:t,title:r,breadCrumbs:o,rightSidebar:n}=e,{data:s}=await Ot({source:t});return Mc(n??[]),g`<doc-container>
        <div>
            <html-content
                slot="docs"
                ${m.staticProps({data:s.data,useMaxWidth:!0})}
            ></html-content>
            <doc-title-small slot="section-title-small"
                ><div>
                    ${Ic({breadCrumbs:o})}<span>${r}</span>
                </div></doc-title-small
            >
            <doc-title slot="section-title">${r}</doc-title>
        </div>
    </doc-container>`};var qT=({weakPathElement:e,weakScrollerElement:t,wrapElement:r,setActiveItem:o,weakScreenElement:n})=>{let s={ax:53,ay:70,bx:64,by:80,cx:89,cy:87,dx:100,dy:100,ex:0,ey:100,fx:10,fy:77,gx:17,gy:84},i={ax:-1,ay:-1,bx:1,by:1,cx:-1,cy:-1,dx:1,dy:1,ex:1,ey:1,fx:-1,fy:-1,gx:1,gy:1},a=U.createSequencer({data:{...s}});a.goTo({fy:90,ay:90,cy:70},{start:0,end:3.5}).goTo({gy:70,by:80},{start:2,end:5}).goTo({fy:90,ay:100,cy:90},{start:4,end:7.5}).goTo({ay:120,fy:80,cy:80},{start:7.5,end:10}).goTo({gy:100,by:100},{start:6,end:10}).add(()=>{o(1)},0).add(({direction:d,isForced:v})=>{v||d==="backward"||o(2)},1.5).add(({direction:d,isForced:v})=>{v||d==="backward"||o(3)},5.5).add(({direction:d,isForced:v})=>{v||d==="backward"||o(4)},9.5).add(({direction:d,isForced:v})=>{v||d==="forward"||o(1)},1.5).add(({direction:d,isForced:v})=>{v||d==="forward"||o(2)},5).add(({direction:d,isForced:v})=>{v||d==="forward"||o(3)},9),a.subscribe(({ax:d,ay:v,bx:y,by:T,cx:S,cy:_,dx:w,dy:x,ex:E,ey:I,fx:P,fy:A,gx:$,gy:N})=>{s.ax=d,s.ay=v,s.bx=y,s.by=T,s.cx=S,s.cy=_,s.dx=w,s.dy=x,s.ex=E,s.ey=I,s.fx=P,s.fy=A,s.gx=$,s.gy=N});let c=U.createTimeTween({data:{...i}});c.subscribe(({ax:d,ay:v,bx:y,by:T,cx:S,cy:_,dx:w,dy:x,ex:E,ey:I,fx:P,fy:A,gx:$,gy:N})=>{i.ax=d,i.ay=v,i.bx=y,i.by=T,i.cx=S,i.cy=_,i.dx=w,i.dy=x,i.ex=E,i.ey=I,i.fx=P,i.fy=A,i.gx=$,i.gy=N});let l=Me.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(c,{ax:()=>Gt(-3,3),ay:()=>Gt(-3,3),bx:()=>Gt(-3,3),by:()=>Gt(-3,3),cx:()=>Gt(-3,3),cy:()=>Gt(-3,3),dx:()=>0,dy:()=>0,ex:()=>0,ey:()=>0,fx:()=>Gt(-3,3),fy:()=>Gt(-3,3),gx:()=>Gt(-3,3),gy:()=>Gt(-3,3)},{duration:3e3});l.play();let p=!0,h=()=>{if(!p)return;let d={x:s.ax+i.ax,y:s.ay+i.ay},v={x:s.bx+i.bx,y:s.by+i.by},y={x:s.cx+i.cx,y:s.cy+i.cy},T={x:s.dx+i.dx,y:s.dy+i.dy},S={x:s.ex+i.ex,y:s.ey+i.ey},_={x:s.fx+i.fx,y:s.fy+i.fy},w={x:s.gx+i.gx,y:s.gy+i.gy};e.deref()&&(e.deref().style.clipPath=`polygon(${d.x}% ${d.y}%, ${v.x}% ${v.y}%, ${y.x}% ${y.y}%, ${T.x}% ${T.y}%,${S.x}% ${S.y}%,${_.x}% ${_.y}%,${w.x}% ${w.y}%)`,u.useNextFrame(()=>h()))};u.useFrame(()=>h());let f=Ke.createScrollTrigger({item:r,dynamicStart:{position:"right",value:()=>je(n?.deref()??document.createElement("div"))},dynamicEnd:{position:"right",value:()=>je(t?.deref()??document.createElement("div"))??0},reverse:!1,propierties:"tween",ease:!1,tween:a});return{pathScroller:f,pathSequencer:a,pathTween:c,pathTimeline:l,stopLoop:()=>{p=!1},destroy:()=>{f.destroy(),f=null,a.destroy(),a=null,c.destroy(),c=null,l.destroy(),l=null}}};var JT=({title_1:e,title_2:t})=>{let r=U.createScrollerTween({from:{x:0},to:{x:30}});r.subscribe(({x:i})=>{e.style.transform=`translate3d(0,0,0) translate(${i}px, 0px)`}),r.onStop(({x:i})=>{e.style.transform=`translate(${i}px, 0px)`});let o=Ke.createParallax({item:e,propierties:"tween",tween:r,ease:!1,align:"start"}),n=U.createScrollerTween({from:{x:0},to:{x:-30}});n.subscribe(({x:i})=>{t.style.transform=`translate3d(0,0,0) translateX(${i}px)`}),n.onStop(({x:i})=>{t.style.transform=`translateX(${i}px)`});let s=Ke.createParallax({item:t,propierties:"tween",tween:n,ease:!1,align:"start"});return{title1parallax:o,title2parallax:s,title1tween:r,title2tween:n}};var kc=({title:e})=>{let t=U.createScrollerTween({from:{x:0},to:{x:-60}});t.subscribe(({x:o})=>{e.deref()&&(e.deref().style.transform=`translate3d(0,0,0) translateX(${o}px)`)}),t.onStop(({x:o})=>{e.deref()&&(e.deref().style.transform=`translateX(${o}px)`)});let r=Ke.createParallax({item:e.deref(),propierties:"tween",tween:t,ease:!1,align:"center"});return{sectionContentScroller:r,destroy:()=>{r.destroy(),r=null}}};var YT=({screenElement:e,scrollerElement:t,pathElement:r,wrapElement:o,title_1:n,title_2:s,section2_title:i,section3_title:a,section4_title:c,setActiveItem:l,onMove:p,onScrollEnd:h,snapPoints:f})=>{let d=new WeakRef(t),v=new WeakRef(i),y=new WeakRef(a),T=new WeakRef(c),S=new WeakRef(r),_=new WeakRef(e),{pathScroller:w,pathSequencer:x,pathTimeline:E,pathTween:I,stopLoop:P,destroy:A}=qT({weakPathElement:S,weakScrollerElement:d,wrapElement:o,setActiveItem:l,weakScreenElement:_}),{title1parallax:$,title2parallax:N,title1tween:R,title2tween:O}=JT({title_1:n,title_2:s}),{sectionContentScroller:D,destroy:k}=kc({title:v}),{sectionContentScroller:L,destroy:C}=kc({title:y}),{sectionContentScroller:M,destroy:B}=kc({title:T}),V=new _t({screen:e,scroller:t,direction:"horizontal",drag:!0,easeType:"spring",breakpoint:"small",useHorizontalScroll:!0,snapPoints:f,children:[w,$,N,D,L,M],onUpdate:({value:F})=>{p(F),h()}});return V.init(),setTimeout(()=>{V?.refresh?.()},500),{goTo:F=>{!F&&F!==0||V?.move?.(F).catch(()=>{})},destroy:()=>{V.destroy(),V=null,x.destroy(),w.destroy(),E.destroy(),I.destroy(),$.destroy(),N.destroy(),R.destroy(),O.destroy(),D.destroy(),L.destroy(),P(),A(),k(),C(),B()}}};var XT=({elements:e})=>{let t=U.createSpring({data:{x:0},stagger:{each:5}});return e.map(o=>o.querySelector("svg")).forEach(o=>{o&&(t.subscribe(({x:n})=>{o.style.transform=`translate3D(0,0,0) translateY(${-n}px)`}),t.onComplete(({x:n})=>{o.style.transform=`translateY(${-n}px)`}))}),{svgSpring:t,destroySvgSpring:()=>{t.destroy(),t=null}}};var bi=()=>{},gi=e=>Promise.resolve(e),Rc=()=>{},Nc={1:0,2:100/3,3:100/3*2,4:100},KM=({setRef:e,getState:t})=>{let{titleTop:r,titleBottom:o}=t().block_1;return g`
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
    `},QM=({setRef:e,getState:t})=>{let{title:r,copy:o}=t().block_2;return g`
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
    `},ZM=({setRef:e,getState:t})=>{let{title:r,copy:o}=t().block_3;return g`
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
    `},ek=({setRef:e,getState:t})=>{let{title:r,items:o}=t().block_4;return g`
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
    `},tk=({proxi:e,delegateEvents:t,bindEffect:r})=>g`
        <ul class="l-about__nav">
            ${e.navItem.map(({index:o,label:n})=>g`
                        <li class="l-about__nav__item">
                            <button
                                class="l-about__nav__button"
                                ${t({click:()=>{bi(Nc[o]),Rc()}})}
                                ${r({toggleClass:{active:()=>e.activenavItem===o}})}
                            >
                                ${n}
                            </button>
                        </li>
                    `).join("")}
        </ul>
    `,rk=()=>g`
        <div class="l-about__square">
            <div class="l-about__square__legend"><h4>Scroll or Drag</h4></div>
            <span class="l-about__square__angle top-left"></span>
            <span class="l-about__square__angle top-right"></span>
            <span class="l-about__square__angle bottom-left"></span>
            <span class="l-about__square__angle bottom-right"></span>
        </div>
    `,KT=({onMount:e,setRef:t,getRef:r,getRefs:o,getState:n,bindEffect:s,delegateEvents:i,getProxi:a})=>{let c=a(),l=4,p=!1;return e(()=>{let{screenElement:h,scrollerElement:f,wrapElement:d,title_1:v,title_2:y,section2_title:T,section3_title:S,section4_title:_,pathElement:w}=r(),{svg:x}=o(),E=0,I=!1,P=0,{svgSpring:A,destroySvgSpring:$}=XT({elements:x});gi=async O=>{if(u.shouldMakeSomething()||p){A.stop(),p=!0,setTimeout(()=>{p=!1},2e3);return}let k=-Math.abs(O/30);Number.isNaN(k)||await A.goTo({x:k}).catch(()=>{})},Rc=()=>{gi(3e3),setTimeout(()=>{gi(0)},500)};let{destroy:N,goTo:R}=YT({screenElement:h,scrollerElement:f,pathElement:w,wrapElement:d,title_1:v,title_2:y,section2_title:T,section3_title:S,section4_title:_,snapPoints:Object.values(Nc),setActiveItem:O=>{c.activenavItem=O},onMove:O=>{I||(E=O),I=!0,P=E-O,gi(P)},onScrollEnd:u.useDebounce(()=>{I=!1,P=0,gi(P)},500)});return bi=R,c.isMounted=!0,()=>{bi=()=>{},N(),$()}}),g`<div
        class="l-about"
        style="--number-of-section:${l}"
        ${s({toggleClass:{active:()=>c.isMounted}})}
    >
        <div class="l-about__sqaure-container">${rk()}</div>
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
                    ${KM({setRef:t,getState:n})}
                    ${QM({setRef:t,getState:n})}
                    ${ZM({setRef:t,getState:n})}
                    ${ek({setRef:t,getState:n})}
                </div>
            </div>
        </div>
        <button
            type="button"
            class="l-about__prev"
            ${s({toggleAttribute:{disabled:()=>c.activenavItem==1}})}
            ${i({click:()=>{bi(Nc[ue.clamp(c.activenavItem-1,1,4)]),Rc()}})}
        ></button>
        ${tk({bindEffect:s,delegateEvents:i,proxi:c})}
        <button
            type="button"
            class="l-about__next"
            ${s({toggleAttribute:{disabled:()=>c.activenavItem==4}})}
            ${i({click:()=>{bi(Nc[ue.clamp(c.activenavItem+1,1,4)]),Rc()}})}
        ></button>
    </div>`};var QT=m.createComponent({tag:"about-component",component:KT,props:{block_1:()=>({value:{titleTop:"",titleBottom:""},type:"any"}),block_2:()=>({value:{title:"",copy:""},type:"any"}),block_3:()=>({value:{title:"",copy:""},type:"any"}),block_4:()=>({value:{title:"",items:[""]},type:"any"}),aboutSvg:()=>({value:"",type:String})},state:{navItem:()=>({value:[{index:1,label:"about"},{index:2,label:"why"},{index:3,label:"what"},{index:4,label:"inspiration"}],type:Array}),activenavItem:()=>({value:1,type:Number,transform:e=>ue.clamp(e,1,4)}),isMounted:()=>({value:!1,type:Boolean})}});m.useComponent([QT]);var ZT=async()=>{let{data:e}=await Ot({source:"./data/about/index.json"}),{data:t}=await oe({source:"./asset/svg/about.svg?v=0.1"});return g`<about-component
        ${m.staticProps({block_1:e.block_1,block_2:e.block_2,block_3:e.block_3,block_4:e.block_4,aboutSvg:t})}
    ></about-component> `};var e_=({getProxi:e,bindObject:t,delegateEvents:r,onMount:o,id:n,bindEffect:s})=>{let i=e();return o(()=>()=>{}),g`<div
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
    </div> `};var Pc=m.createComponent({tag:"benchmark-fake-component",component:e_,props:{counter:0,label:"",index:0},state:{isSelected:!1}});var ht=(e=1001)=>({state:{counter:()=>({value:0,type:Number}),data:()=>({value:[],type:Array,validate:t=>t.length<e,strict:!0,skipEqual:!1}),time:()=>({value:0,type:Number,transform:t=>Math.round(t),skipEqual:!1}),isLoading:()=>({value:!1,type:Boolean}),currentIndex:()=>({value:-1,type:Number})},child:[Pc]});var up=e=>{for(let t=e.length-1;t>0;t--){let r=Math.floor(Math.random()*(t+1));[e[t],e[r]]=[e[r],e[t]]}return e},vi=e=>{let t=u.checkType(Number,e)?e:0;return[...Array.from({length:t}).keys()].map(r=>({label:`comp-${r+1}`}))},lp=({proxi:e,value:t,useShuffle:r=!1})=>{e.isLoading=!0,u.useFrameIndex(()=>{u.useNextTick(async()=>{let o=performance.now();e.data=r?up(vi(t)):vi(t),await m.tick();let s=performance.now()-o;e.time=s,e.isLoading=!1})},2)},dt=({delegateEvents:e,setRef:t,getRef:r,bindEffect:o,proxi:n})=>g`
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
                ${e({keydown:s=>{if(s.keyCode===13){s.preventDefault();let i=Number(s.currentTarget?.value??0);lp({proxi:n,value:i})}}})}
            />
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{let{input:s}=r(),i=Number(s?.value??0);lp({proxi:n,value:i})}})}
            >
                Generate components
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{lp({proxi:n,value:n.data.length,useShuffle:!0})}})}
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
    `;var t_=({onMount:e,delegateEvents:t,bindText:r,invalidate:o,getState:n,staticProps:s,setRef:i,getRef:a,bindProps:c,bindEffect:l,getProxi:p})=>{let h=p();return e(()=>()=>{a()?.input.remove()}),g`<div class="benchmark">
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
                        ${f.map(({label:d},v)=>g`
                                    <benchmark-fake-component
                                        ${s({label:d,index:v})}
                                        ${c(()=>({counter:h.counter}))}
                                    ></benchmark-fake-component>
                                `).join("")}
                    `}})}
        </div>
    </div>`};var r_=m.createComponent({tag:"benchmark-invalidate",component:t_,...ht()});var Ac=(e=1e3)=>g`
        <p>
            Generates and updates a large list of components with 5 reactive
            elements inside.<br />
            ( max component <strong>${e}</strong> ).
        </p>
    `;var o_=({onMount:e,delegateEvents:t,bindObject:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindEffect:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">Repeat ( with key ):</h3>
            <h2 class="benchmark__head__title">
                Generate components performance
            </h2>
            ${Ac()}
            ${dt({setRef:o,getRef:n,delegateEvents:t,bindEffect:a,proxi:l})}

            <div class="benchmark__head__time">
                ${r`components generate in <strong>${()=>l.time}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${i({observe:()=>l.data,useSync:!0,key:"label",render:({sync:p,current:h})=>g`
                              <benchmark-fake-component
                                  ${s({observe:["counter"],props:({counter:f},d,v)=>({index:v,label:d.label,counter:f})})}
                                  ${p()}
                              >
                              </benchmark-fake-component>
                          `})}
        </div>
    </div>`};var n_=m.createComponent({tag:"benchmark-repeat-key",component:o_,...ht()});var s_=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindObject:a,bindEffect:c,getProxi:l})=>{let p=l();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
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
    </div>`};var i_=m.createComponent({tag:"benchmark-repeat-key-nested",component:s_,...ht(31)});var a_=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindEffect:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">Repeat ( without key ):</h3>
            <h2 class="benchmark__head__title">
                Generate components performance
            </h2>
            ${Ac()}
            ${dt({setRef:o,getRef:n,delegateEvents:t,bindEffect:a,proxi:l})}

            <div class="benchmark__head__time">
                ${r`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${i({observe:()=>l.data,useSync:!0,render:({sync:p,current:h})=>g`
                              <benchmark-fake-component
                                  ${s({observe:["counter"],props:({counter:f},d,v)=>({index:v,label:d.label,counter:f})})}
                                  ${p()}
                              >
                              </benchmark-fake-component>
                          `})}
        </div>
    </div>`};var c_=m.createComponent({tag:"benchmark-repeat-no-key",component:a_,...ht()});var $t=u.createStore({data:()=>({value:[],type:Array,validate:e=>e.length<1001,strict:!0,skipEqual:!1}),counter:()=>({value:0,type:Number}),time:()=>({value:0,type:Number,transform:e=>Math.round(e),skipEqual:!1}),isLoading:()=>({value:!1,type:Boolean})});var pp=({value:e,useShuffle:t=!1})=>{$t.set("isLoading",!0),u.useFrameIndex(()=>{u.useNextTick(async()=>{let r=performance.now();$t.set("data",t?up(vi(e)):vi(e)),await m.tick();let n=performance.now()-r;$t.set("time",n),$t.set("isLoading",!1)})},2)},l_=({delegateEvents:e,setRef:t,getRef:r,getState:o,bindEffect:n})=>g`
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
                ${e({keydown:s=>{if(s.code.toLowerCase()==="enter"){s.preventDefault();let i=Number(s.currentTarget?.value??0);pp({value:i})}}})}
            />
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{let{input:s}=r(),i=Number(s?.value??0);pp({value:i})}})}
            >
                Generate components
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{let{data:s}=o();pp({value:s.length,useShuffle:!0})}})}
            >
                Shuffle array
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${e({click:()=>{$t.update("counter",s=>s+1)}})}
            >
                Update counter
            </button>
        </div>
    `;var u_=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,getState:s,bindProps:i,repeat:a,bindEffect:c,getProxi:l})=>{let p=l();return e(()=>()=>{n()?.input.remove(),$t.set("data",[]),$t.set("time",0),$t.set("counter",0)}),g`<div class="benchmark">
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
            ${l_({setRef:o,getRef:n,delegateEvents:t,getState:s,bindEffect:c})}

            <div class="benchmark__head__time">
                ${r`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${a({observe:()=>p.data,useSync:!0,render:({sync:h,current:f})=>g`
                              <benchmark-fake-component
                                  ${i({observe:["counter"],props:({counter:d},v,y)=>({index:y,label:v.label,counter:d})})}
                                  ${h()}
                              >
                              </benchmark-fake-component>
                          `})}
        </div>
    </div>`};var p_=m.createComponent({tag:"benchmark-repeat-no-key-bind-store",component:u_,bindStore:$t,child:[Pc]});var m_=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindObject:a,bindEffect:c,getProxi:l})=>{let p=l();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
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
    </div>`};var h_=m.createComponent({tag:"benchmark-repeat-key-no-nested",component:m_,...ht(31)});var Oc=(e=1e3)=>g`
        <p>
            Generates and updates a large list of vanilla HTML element with 4
            reactive elements inside.<br />
            ( max component <strong>${e}</strong> ).
        </p>
    `;var d_=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,repeat:s,bindEffect:i,bindObject:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat no component ( without key ):
            </h3>
            <h2 class="benchmark__head__title">
                Generate vanilla html performance
            </h2>
            ${Oc(1e3)}
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
    </div>`};var f_=m.createComponent({tag:"benchmark-repeat-no-component-no-key",component:d_,...ht(1001)});var g_=({onMount:e,delegateEvents:t,bindText:r,setRef:o,getRef:n,repeat:s,bindEffect:i,bindObject:a,getProxi:c})=>{let l=c();return e(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat no component ( with key ):
            </h3>
            <h2 class="benchmark__head__title">
                Generate vanilla html performance
            </h2>
            ${Oc(1e3)}
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
    </div>`};var b_=m.createComponent({tag:"benchmark-repeat-no-component-with-key",component:g_,...ht(1001)});m.useComponent([r_,c_,n_,i_,h_,p_,f_,b_]);var Ar=async({props:e})=>{let{rootComponent:t}=e;return g`<div class="l-benchMark"><${t}></${t}></div>`};var Se=({active:e=!0,nextRoute:t="",prevRoute:r="",backRoute:o=""})=>{let n=m.useMethodByName(ui);n.update("active",e),n.update("nextRoute",t),n.update("prevRoute",r),n.update("backRoute",o)};m.beforeRouteChange(()=>{let e=m.useMethodByName(ui);e.update("active",!1),e.update("nextRoute",""),e.update("prevRoute",""),e.update("backRoute","")});var ee=u.createStore({activeNavigationSection:()=>({value:"",type:String,skipEqual:!1}),navigationIsOpen:()=>({value:!1,type:Boolean})});ee.set("activeNavigationSection","");var ft=({disableOffcanvas:e})=>{let t="OffscreenCanvas"in globalThis&&!e;return{useOffscreen:t,context:t?"bitmaprenderer":"2d"}},gt=({useOffscreen:e,canvas:t})=>{let r=e?new OffscreenCanvas(t.width,t.height):null,o=e?r?.getContext("2d"):null;return{offscreen:r,offScreenCtx:o}},bt=({useOffscreen:e,offscreen:t,ctx:r})=>{if(e&&t&&r){let o=t.transferToImageBitmap();r.transferFromImageBitmap(o)}},fo=e=>"roundRect"in e;var go=({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:n,gutter:s})=>{let i={row:0,col:-1,items:[]};return[...Array.from({length:t*r+t}).keys()].reduce(a=>{let{row:c,col:l,items:p}=a,h=l<r?l+1:0,f=h===0?c+1:c,d=(o+s)*h,v=(n+s)*f;return{row:f,col:h,items:[...p,{width:o,height:n,x:d,y:v,centerX:d+o/2,centerY:v+n/2,offsetXCenter:ok({canvasWidth:e.width,width:o,gutter:s,numberOfColumn:r}),offsetYCenter:nk({canvasHeight:e.height,height:n,gutter:s,numberOfRow:t}),gutter:s,numberOfColumn:r}]}},i)},ok=({canvasWidth:e,width:t,gutter:r,numberOfColumn:o})=>e/2-(t+r)*o/2,nk=({canvasHeight:e,height:t,gutter:r,numberOfRow:o})=>e/2-(t+r)*(o+1)/2;var v_=({canvas:e,numberOfRow:t,numberOfColumn:r,fill:o,disableOffcanvas:n,stagger:s,reorder:i,animationType:a})=>{let c=window.innerWidth/20,l=window.innerHeight/20,p=1,{useOffscreen:h,context:f}=ft({disableOffcanvas:n}),d=!0,v=e.getContext(f,{alpha:!0}),y=m.getActiveRoute(),{offscreen:T,offScreenCtx:S}=gt({useOffscreen:h,canvas:e}),_=h?S:v,w=fo(_);_=null,e.width=e.clientWidth,e.height=e.clientHeight;let x=go({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:c,cellHeight:l,gutter:p}).items,E=i?x.map((R,O)=>({...R,scale:1,rotate:0,hasFill:o.includes(O)})).toSorted(R=>R.hasFill?-1:1).toReversed():x.map((R,O)=>{let D=o.includes(O);return{...R,scale:1,rotate:0,hasFill:D}}),I=U.createTimeTween({ease:"easeInOutQuad",stagger:s,data:{scale:1,rotate:0}});E.forEach(R=>{I.subscribeCache(({scale:O,rotate:D})=>{R.rotate=D,R.scale=O})});let P=()=>{if(!v)return;let R=e.width,O=e.height,D=h?S:v;D&&(h&&T?(T.width=R,T.height=O):D.reset(),E.forEach(({x:k,y:L,width:C,height:M,rotate:B,scale:V,hasFill:F,offsetXCenter:z,offsetYCenter:te})=>{let ae=Math.PI/180*B,q=Math.cos(ae)*V,ne=Math.sin(ae)*V;D.setTransform(q,ne,-ne,q,Math.floor(z+k),Math.floor(te+L));let re=Math.round(-C/2),ce=Math.round(-M/2);w?(D.beginPath(),D.roundRect(re,ce,C,M,150)):(D.beginPath(),D.rect(re,ce,C,M)),F?(D.fillStyle="#000000",D.fill()):(D.fillStyle="rgba(255, 255, 255, 1)",D.fill())}),bt({useOffscreen:h,offscreen:T,ctx:v}))},A=Me.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).label({name:"label1"});(a==="asymmetric"||a==="random")&&A.goTo(I,{scale:.2,rotate:90},{duration:1e3}).goTo(I,{scale:1},{duration:500}).goTo(I,{rotate:180,scale:1.2},{duration:500}).goTo(I,{scale:.3,rotate:0},{duration:500}).goTo(I,{scale:1},{duration:1200}),(a==="edges"||a==="radial")&&A.goTo(I,{scale:.3,rotate:0},{duration:1e3}).goTo(I,{scale:1},{duration:1e3}),A.onLoopEnd(({direction:R,loop:O})=>{console.log(`loop end: ${R}, ${O}`)}),A.play();let $=()=>{P(),d&&u.useNextFrame(()=>$())};u.useFrame(()=>{$()});let N=ee.watch("navigationIsOpen",R=>{if(R){A?.pause(),d=!1;return}setTimeout(async()=>{d=!0,m.getActiveRoute().route===y.route&&(A?.resume(),u.useFrame(()=>$()))},500)});return()=>{I.destroy(),A.destroy(),N(),I=null,A=null,v=null,T=null,S=null,x=[],d=!1,E=null,f=null}};var mp=[{label:"asymmetric row",params:{animationType:"asymmetric",fill:[16,27,38,49,60,71,82,93],numberOfColumn:10,numberOfRow:10,stagger:{each:5,grid:{col:10,row:1,direction:"row"},waitComplete:!1},reorder:!0}},{label:"random",params:{animationType:"random",fill:[16,27,38,49,60,71,82,93],numberOfColumn:10,numberOfRow:10,stagger:{each:2,from:"random",waitComplete:!1},reorder:!1}},{label:"edges",params:{animationType:"edges",fill:[0,13,20,45,65,71,72,73,74,75,76,77,83,92,96,113,117,134,138,155,156,157,158,159,189,209],numberOfColumn:10,numberOfRow:10,stagger:{each:10,from:"edges",waitComplete:!1},reorder:!1}},{label:"radial",params:{animationType:"radial",fill:[],numberOfColumn:8,numberOfRow:9,stagger:{each:20,from:{x:4,y:4},grid:{col:9,row:9,direction:"radial"},waitComplete:!1},reorder:!1}}];var hp=({proxi:e,getRef:t})=>{e.destroy(),e.destroy=v_({canvas:t().canvas,...mp[e.currentParamsId].params,disableOffcanvas:!0})};function sk({delegateEvents:e,bindEffect:t,proxi:r,getRef:o}){return mp.map(({label:n},s)=>g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn"
                    ${e({click:()=>{r.currentParamsId=s,hp({proxi:r,getRef:o})}})}
                    ${t({toggleClass:{active:()=>r.currentParamsId===s}})}
                >
                    ${n}
                </button>
            </li>`).join("")}var y_=({onMount:e,setRef:t,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s})=>{let i=n();return e(()=>{u.useFrame(()=>{u.useNextTick(()=>{hp({proxi:i,getRef:r})})});let a=u.useResize(()=>{hp({proxi:i,getRef:r})});return u.useFrame(()=>{"isMounted"in i&&(i.isMounted=!0)}),()=>{i.destroy(),i.destroy=()=>{},a()}}),g`
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
                    ${sk({delegateEvents:s,bindEffect:o,proxi:i,getRef:r})}
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
    `};var T_=m.createComponent({tag:"animatedpattern-n0",component:y_,props:{background:()=>({value:"",type:String})},state:{isMounted:()=>({value:!1,type:Boolean}),controlsActive:()=>({value:!1,type:Boolean}),destroy:()=>({value:()=>{},type:Function}),currentParamsId:()=>({value:0,type:Number})}});m.useComponent([T_]);var __=async()=>{let{data:e}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"#async-timeline",nextRoute:"#animatedPatternN1",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <animatedpattern-n0
            ${m.staticProps({background:e})}
        ></animatedpattern-n0>
    </div>`};var dp=({canvas:e,disableOffcanvas:t})=>{let r=window.innerHeight>=700?window.innerHeight/16:window.innerHeight/20,o=window.innerHeight>=700?window.innerHeight/16:window.innerHeight/20,n=7,s=15,i=window.innerHeight/150,a=[2,18,10,27,21,22,23,24,25,25,26,37,42,53,58,69,74,85,86,87,88,89,90,44,60,65,98,108],{useOffscreen:c,context:l}=ft({disableOffcanvas:t}),p=!0,{top:h,left:f}=be(e),d=e.getContext(l,{alpha:!0}),v=m.getActiveRoute(),{offscreen:y,offScreenCtx:T}=gt({useOffscreen:c,canvas:e});e.width=e.clientWidth,e.height=e.clientHeight;let S=go({canvas:e,numberOfRow:n,numberOfColumn:s,cellWidth:r,cellHeight:o,gutter:i}).items,_=S.map((O,D)=>({...O,scale:0,mouseX:0,mouseY:0,hasFill:a.includes(D)})).toSorted(O=>O.hasFill?-1:1),w=U.createLerp({data:{mouseX:0,mouseY:0}});_.forEach(O=>{w.subscribeCache(({mouseX:D,mouseY:k})=>{O.mouseX=D,O.mouseY=k})});let x=U.createTimeTween({ease:"easeInOutSine",stagger:{each:5,from:"center",waitComplete:!1},data:{scale:0}});_.forEach(O=>{x.subscribeCache(({scale:D})=>{O.scale=D})});let E=()=>{if(!d)return;let O=e.width,D=e.height,k=c?T:d;k&&(c&&y?(y.width=O,y.height=D):k.reset(),_.forEach(({x:L,y:C,width:M,height:B,mouseX:V,mouseY:F,scale:z,hasFill:te,offsetXCenter:ae,offsetYCenter:q})=>{if(!te)return;let ne=V-(e.width-(M+i)*s)/2,re=F-(e.height-(B+i)*n)/2,ce=(L-ne)/250,Oe=(C-re)/250,Je=Math.sqrt(Math.pow(Math.abs(ce),2)+Math.pow(Math.abs(Oe),2)),Z=ue.clamp(Math.abs(Je),0,2),ye=0,ke=Math.cos(ye)*(Z+z),Ae=Math.sin(ye)*(Z+z);k.setTransform(ke,Ae,-Ae,ke,Math.floor(ae+L),Math.floor(q+C)),k.beginPath(),k.rect(Math.floor(-M/2),Math.floor(-B/2),M,B),k.fillStyle="#000000",k.fill()}),k.globalCompositeOperation="destination-out",_.forEach(({x:L,y:C,width:M,height:B,mouseX:V,mouseY:F,scale:z,hasFill:te,offsetXCenter:ae,offsetYCenter:q})=>{if(te)return;let ne=V-(e.width-(M+i)*s)/2,re=F-(e.height-(B+i)*n)/2,ce=(L-ne)/250,Oe=(C-re)/250,Je=Math.sqrt(Math.pow(Math.abs(ce),2)+Math.pow(Math.abs(Oe),2)),Z=ue.clamp(Math.abs(Je),0,2),ye=0,ke=Math.cos(ye)*(Z+z),Ae=Math.sin(ye)*(Z+z);k.setTransform(ke,Ae,-Ae,ke,Math.floor(ae+L),Math.floor(q+C)),k.beginPath(),k.rect(Math.floor(-M/2),Math.floor(-B/2),M,B),k.fill()}),bt({useOffscreen:c,offscreen:y,ctx:d}))},I=Me.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(x,{scale:.3},{duration:1e3});I.play();let P=({x:O,y:D})=>{w.goTo({mouseX:O-f,mouseY:D-h}).catch(()=>{})},A=u.useMouseMove(({client:O})=>{let{x:D,y:k}=O;P({x:D,y:k})}),$=u.useTouchMove(({client:O})=>{let{x:D,y:k}=O;P({x:D,y:k})}),N=()=>{E(),p&&u.useNextFrame(()=>N())};u.useFrame(()=>{N()});let R=ee.watch("navigationIsOpen",O=>{if(O){I?.stop(),p=!1;return}setTimeout(async()=>{p=!0,m.getActiveRoute().route===v.route&&(I?.play(),u.useFrame(()=>N()))},500)});return()=>{x.destroy(),I.destroy(),w.destroy(),A(),$(),R(),x=null,I=null,w=null,d=null,y=null,T=null,S=[],p=!1,_=null,l=null}};var S_=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s})=>{let i=s(),a=()=>{};return e(()=>{let{canvas:c}=o();u.useFrame(()=>{u.useNextTick(()=>{a(),a=dp({canvas:c,...t()})})});let l=u.useResize(()=>{a(),a=dp({canvas:c,...t()})});return u.useFrame(()=>{"isMounted"in i&&(i.isMounted=!0)}),()=>{l(),a(),a=null}}),g`
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
    `};var x_=m.createComponent({tag:"animatedpattern-n1",component:S_,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1}});m.useComponent([x_]);var C_=async()=>{let{data:e}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"#animatedPatternN0",nextRoute:"#scrollerN0",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <animatedpattern-n1
            ${m.staticProps({background:e})}
        ></animatedpattern-n1>
    </div>`};var E_=({canvas:e,disableOffcanvas:t})=>{let o=window.innerHeight/30,n=window.innerHeight/60,s=[14,5],i=.1,a=0,c=10,l=3,p=5e3,h=1,{useOffscreen:f,context:d}=ft({disableOffcanvas:t}),v=!0,y=e.getContext(d,{alpha:!0}),{top:T,left:S}=be(e),_=m.getActiveRoute(),{offscreen:w,offScreenCtx:x}=gt({useOffscreen:f,canvas:e}),E=!0;e.width=e.clientWidth,e.height=e.clientHeight;let I=[...Array.from({length:19}).keys()].map((V,F)=>{let z=F>=9.5?9.5+(9.5-F):F,te=s.includes(F)?1:z*i;return{width:z*o,height:z*n,x:0,y:0,hasFill:s.includes(F),opacity:te,radius:a,rotate:0,relativeIndex:z,scale:1}}),P=U.createTimeTween({data:{rotate:0},stagger:{each:c,from:"center"},ease:"easeLinear",relative:!0}),A=I.map(V=>P.subscribeCache(({rotate:F})=>{V.rotate=F})),$=U.createSpring({data:{x:0,y:0},stagger:{each:l,from:"end"}});I.forEach(V=>{$.subscribeCache(({x:F,y:z})=>{V.x=F,V.y=z,V.scale=h})});let N=()=>{if(!y)return;let V=e.width,F=e.height,z=e.width/2,te=e.height/2,ae=I.length,q=f?x:y;q&&(f&&w?(w.width=V,w.height=F):q.reset(),I.forEach(({width:ne,height:re,x:ce,y:Oe,rotate:Je,hasFill:Z,opacity:ye,scale:ke},Ae)=>{let Ye=ae-Ae,$e=Math.max(1,ke/4),Or=1,Lt=Math.PI/180*Je,Y=Math.cos(Lt)*Or,$r=Math.sin(Lt)*Or;q.setTransform(Y,$r,-$r,Y,z+ce+Ye*ce/20,te+Oe+Ye*Oe/20);let Ve=Math.round(-ne/2)*$e,xe=Math.round(-re/2)*$e;E?(q.beginPath(),q.roundRect(Ve,xe,ne*$e,re*$e,130)):(q.beginPath(),q.rect(Ve,xe,ne*$e,re*$e)),Z?q.fillStyle="#000":(q.fillStyle=`rgba(238, 238, 238, ${ye})`,q.strokeStyle=`rgba(0, 0, 0, ${ye})`,q.stroke()),q.fill()}),bt({useOffscreen:f,offscreen:w,ctx:y}))},R=Me.createAsyncTimeline({repeat:-1,yoyo:!1,autoSet:!1});R.goTo(P,{rotate:360},{duration:p}),R.play();let O=()=>{N(),v&&u.useNextFrame(()=>O())};u.useFrame(()=>O());let D=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,T=be(e).top,S=be(e).left,N()}),k=ue.useVelocity(({speed:V})=>{h=V}),L=({x:V,y:F})=>{let z=window.innerWidth,te=window.innerHeight,ae=V-e.width/2-S,q=F-e.height/2-T;$.goTo({x:ue.clamp(ae,-z/2+400+S,z/2-400-S),y:ue.clamp(q,-te/2+200+T,te/2-200-T)}).catch(()=>{})},C=u.useMouseMove(({client:V})=>{let{x:F,y:z}=V;L({x:F,y:z})}),M=u.useTouchMove(({client:V})=>{let{x:F,y:z}=V;L({x:F,y:z})}),B=ee.watch("navigationIsOpen",V=>{if(V){v=!1,R?.pause(),P?.pause(),$?.pause();return}setTimeout(()=>{v=!0,m.getActiveRoute().route===_.route&&(R?.resume(),P?.resume(),$?.resume(),u.useFrame(()=>O()))},500)});return{destroy:()=>{P.destroy(),$.destroy(),R.destroy(),D(),C(),M(),k(),B(),A.forEach(V=>{V()}),A.length=0,P=null,$=null,R=null,y=null,w=null,x=null,v=!1,I=null,d=null},stopBlackOne:()=>{s.forEach(V=>{A[V]?.()})}}};function ik({delegateEvents:e,bindEffect:t,bindObject:r,proxi:o}){return g` <li class="c-canvas__controls__item">
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
    </li>`}var w_=({onMount:e,getRef:t,setRef:r,bindEffect:o,getProxi:n,delegateEvents:s,bindObject:i})=>{let a=n();return e(()=>{let{canvas:c}=t(),l={destroy:()=>{},stopBlackOne:()=>{}};return u.useFrame(()=>{u.useNextTick(()=>{a.destroy(),l=E_({canvas:c,disableOffcanvas:a.disableOffcanvas}),a.destroy=l.destroy,a.stopBlackOne=l.stopBlackOne})}),u.useFrame(()=>{"isMounted"in a&&(a.isMounted=!0)}),()=>{a.destroy(),a.destroy=()=>{},a.stopBlackOne=()=>{},l=null}}),g`
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
                    ${ik({delegateEvents:s,bindEffect:o,bindObject:i,proxi:a})}
                </ul>
                <div
                    class="c-canvas__wrap"
                    ${o({toggleClass:{active:()=>a.isMounted}})}
                >
                    <canvas ${r("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var I_=m.createComponent({tag:"caterpillar-n1",component:w_,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1,controlsActive:()=>({value:!1,type:Boolean}),destroy:()=>({value:()=>{},type:Function}),stopBlackOne:()=>({value:()=>{},type:Function}),blackOneIsStopped:()=>({value:!1,type:Boolean})}});m.useComponent([I_]);var M_=async()=>{let{data:e}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"",nextRoute:"#scrollerN1",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <caterpillar-n1 ${m.staticProps({background:e})}>
        </caterpillar-n1>
    </div>`};var fp=({value:e,direction:t,isForced:r})=>{r||console.log(`current: ${e}, direction: ${t}`)},k_=({canvas:e,proxi:t})=>{let o=window.innerHeight/13,n=window.innerHeight/13,s=[2],i=.03,a=500,c=400,l=10,p=l/2/Math.PI,{useOffscreen:h,context:f}=ft({disableOffcanvas:t.disableOffcanvas}),d=!0,v=e.getContext(f,{alpha:!0}),y=m.getActiveRoute(),{offscreen:T,offScreenCtx:S}=gt({useOffscreen:h,canvas:e}),_=!0,w=[...Array.from({length:20}).keys()].map((N,R)=>{let O=R>=10?10+(10-R):R,D=o+o/3*O,k=n+n/3*O,L=s.includes(R)?1:(20-R)*i;return{width:D,height:k,x:0,y:0,hasFill:s.includes(R),opacity:L,rotate:0}});e.width=e.clientWidth,e.height=e.clientHeight;let x=U.createSequencer({stagger:{each:7},data:{x:l/4,rotate:0},duration:l}).goTo({x:l+l/4},{start:0,end:l,ease:"easeLinear"}).goTo({rotate:()=>-t.rotation},{start:0,end:5,ease:"easeInOutBack"}).goTo({rotate:0},{start:5,end:l,ease:"easeInOutBack"}).label("mylabel",2).add(({isForced:N,direction:R})=>{fp({isForced:N,direction:R,value:1})},1).add(({isForced:N,direction:R})=>{fp({isForced:N,direction:R,value:5})},5).add(({isForced:N,direction:R})=>{fp({isForced:N,direction:R,value:9})},9);w.forEach(N=>{x.subscribeCache(({x:R,rotate:O})=>{let D=R/p,k=2/(3-Math.cos(2*D)),L=k*Math.cos(D)*a,C=k*Math.sin(2*D)/2*c;N.x=L,N.y=C,N.rotate=O})});let E=Me.createSyncTimeline({repeat:-1,yoyo:!1,duration:4e3}).add(x);E.onLoopEnd(({loop:N,direction:R})=>{console.log(`loop end: ${N} , ${R}`)});let I=()=>{if(!v)return;let N=e.width,R=e.height,O=e.width/2,D=e.height/2,k=h?S:v;k&&(h&&T?(T.width=N,T.height=R):k.reset(),w.forEach(({width:L,height:C,x:M,y:B,rotate:V,hasFill:F,opacity:z})=>{let ae=Math.PI/180*V,q=Math.cos(ae)*1,ne=Math.sin(ae)*1;k.setTransform(q,ne,-ne,q,O+M,D+B);let re=Math.round(-L/2),ce=Math.round(-C/2);_?(k.beginPath(),k.roundRect(re,ce,L,C,[40,40])):(k.beginPath(),k.rect(re,ce,L,C)),F?k.fillStyle="#000000":(k.strokeStyle=`rgba(0, 0, 0, ${z})`,k.fillStyle="rgba(238, 238, 238, 0)",k.stroke()),k.fill()}),bt({useOffscreen:h,offscreen:T,ctx:v}))},P=()=>{I(),d&&u.useNextFrame(()=>P())};u.useFrame(()=>P()),E.play();let A=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,I()}),$=ee.watch("navigationIsOpen",N=>{if(N){d=!1,E?.pause();return}setTimeout(()=>{d=!0,m.getActiveRoute().route===y.route&&(E?.resume(),u.useFrame(()=>P()))},500)});return{destroy:()=>{d=!1,A(),$(),x.destroy(),x=null,E.destroy(),E=null,v=null,T=null,S=null,w=null,f=null},play:()=>{E.play()},playReverse:()=>{E.playReverse()},playUseCurrent:()=>{E.play({useCurrent:!0})},playReverseUseCurrent:()=>{E.playReverse({useCurrent:!0})},playFromLabel:()=>{E.playFrom("mylabel")},plaFromLabelReverse:()=>{E.playFromReverse("mylabel")},stop:()=>E.stop(),pause:()=>E.pause(),resume:()=>E.resume(),reverse:()=>E.reverse()}};function ak({buttons:e}){return Object.entries(e).map(([t,r])=>{let{label:o}=r;return g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn ${t}"
                >
                    ${o}
                </button>
            </li>`}).join("")}var R_=({onMount:e,setRef:t,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s,bindObject:i})=>{let a=n(),c=u.getUnivoqueId();return e(({element:l})=>{let{canvas:p}=r(),h=()=>{},f=k_({canvas:p,proxi:a});return u.useFrame(()=>{u.useNextTick(()=>{({destroy:h}=f)})}),Object.entries(a.buttons).forEach(([d,v])=>{let{method:y}=v;l.querySelector(`.${d}`)?.addEventListener("click",()=>f?.[y]())}),u.useFrame(()=>{"isMounted"in a&&(a.isMounted=!0)}),()=>{h(),h=null}}),g`
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
                        ${ak({buttons:a.buttons})}
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
    `};var ck={"js-CN2-play":{label:"play",method:"play"},"js-CN2-playReverse":{label:"play reverse",method:"playReverse"},"js-CN2-play-current":{label:"go forward if is backward",method:"playUseCurrent"},"js-CN2-playReverse-current":{label:"go backward if is forward",method:"playReverseUseCurrent"},"js-CN2-play-label":{label:"play from label",method:"playFromLabel"},"js-CN2-playReverse-label":{label:"play from label reverse",method:"plaFromLabelReverse"},"js-CN2-reverse":{label:"reverse",method:"reverse"},"js-CN2-stop":{label:"stop",method:"stop"},"js-CN2-pause":{label:"pause",method:"pause"},"js-CN2-resume":{label:"resume",method:"resume"}},N_=m.createComponent({tag:"caterpillar-n2",component:R_,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1,rotation:()=>({value:166,type:Number}),rotationlabel:()=>({value:166,type:Number}),controlsActive:()=>({value:!1,type:Boolean}),buttons:()=>({value:ck,type:"Any"})}});m.useComponent([N_]);var P_=async()=>{let{data:e}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"#scrollerN1",nextRoute:"#async-timeline",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <caterpillar-n2
            ${m.staticProps({background:e})}
        ></caterpillar-n2>
    </div>`};var $c=()=>{m.useMethodByName(pi).update(!0)},Lc=()=>{m.useMethodByName(pi).update(!1)};var A_=({canvas:e,canvasScroller:t,stagger:r,disableOffcanvas:o})=>{let n=window.innerWidth/20,s=window.innerHeight/20,i=1,a=10,c=10,l=!1,p=[36,37,38,39,40,47,51,58,62,69,73,80,81,82,83,84],{useOffscreen:h,context:f}=ft({disableOffcanvas:o}),d=!0,v=U.createMasterSequencer(),y=e.getContext(f,{alpha:!0}),T=m.getActiveRoute(),{offscreen:S,offScreenCtx:_}=gt({useOffscreen:h,canvas:e}),w=h?_:y,x=fo(w);w=null,e.width=e.clientWidth,e.height=e.clientHeight;let E=go({canvas:e,numberOfRow:a,numberOfColumn:c,cellWidth:n,cellHeight:s,gutter:i}).items,I=l?E.map((D,k)=>({...D,scale:1,rotate:0,hasFill:p.includes(k)})).toSorted(D=>D.hasFill?-1:1):E.map((D,k)=>({...D,scale:1,rotate:0,hasFill:p.includes(k)})),P=U.createStaggers({items:I,stagger:r}),A=P.map(({item:D,start:k,end:L})=>{let C=U.createSequencer({data:{scale:1}}).goTo({scale:0},{start:k,end:L,ease:"easeInOutQuad"}),M=C.subscribe(({scale:B})=>{D.scale=B});return v.add(C),{sequencer:C,unsubscribe:M}}),$=()=>{if(!y)return;let D=e.width,k=e.height,L=h?_:y;L&&(h&&S?(S.width=D,S.height=k):L.reset(),I.forEach(({x:C,y:M,width:B,height:V,rotate:F,scale:z,hasFill:te,offsetXCenter:ae,offsetYCenter:q})=>{let ne=Math.PI/180*F,re=Math.cos(ne)*z,ce=Math.sin(ne)*z;L.setTransform(re,ce,-ce,re,Math.floor(ae+C),Math.floor(q+M));let Oe=Math.round(-B/2),Je=Math.round(-V/2);x?(L.beginPath(),L.roundRect(Oe,Je,B,V,150)):(L.beginPath(),L.rect(Oe,Je,B,V)),te?(L.fillStyle="#000000",L.fill()):(L.strokeStyle="#000",L.fillStyle="rgb(238, 238, 238)",L.fill(),x||(L.strokeStyle="#ccc"))}),bt({useOffscreen:h,offscreen:S,ctx:y}))},N=Ke.createScrollTrigger({trigger:t,propierties:"tween",tween:v,dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>le(t)},reverse:!1,ease:!0,easeType:"lerp"});N.init();let R=()=>{$(),d&&u.useNextFrame(()=>R())};u.useFrame(()=>{R()});let O=ee.watch("navigationIsOpen",D=>{if(D){d=!1;return}setTimeout(async()=>{d=!0,m.getActiveRoute().route===T.route&&u.useFrame(()=>R())},500)});return()=>{O(),A.forEach(({sequencer:D,unsubscribe:k})=>{D.destroy(),k()}),A=[],v.destroy(),v=null,P=[],N.destroy(),N=null,y=null,S=null,_=null,E=[],d=!1,I=null,f=null}};var gp=[{label:"random",params:{stagger:{type:"equal",each:6,from:"random"}}},{label:"column",params:{stagger:{type:"equal",each:7,from:"center",grid:{col:11,row:10,direction:"col"}}}},{label:"row",params:{stagger:{type:"equal",each:3,from:"start",grid:{col:11,row:10,direction:"row"}}}},{label:"sequential",params:{stagger:{type:"equal",each:2,from:"end"}}}];var bp=({proxi:e,getRef:t,resetScroll:r=!0})=>{r&&window.scrollTo(0,0),e.destroy(),e.destroy=A_({canvas:t().canvas,canvasScroller:t().canvasScroller,...gp[e.currentParamsId].params,disableOffcanvas:!0})};function lk({delegateEvents:e,bindEffect:t,proxi:r,getRef:o}){return gp.map(({label:n},s)=>g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn"
                    ${e({click:()=>{r.currentParamsId=s,bp({proxi:r,getRef:o})}})}
                    ${t({toggleClass:{active:()=>r.currentParamsId===s}})}
                >
                    ${n}
                </button>
            </li>`).join("")}var O_=({onMount:e,setRef:t,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s})=>{let i=n();return e(()=>{$c(),u.useFrame(()=>{u.useNextTick(()=>{bp({proxi:i,getRef:r})})});let a=u.useResize(()=>{bp({proxi:i,getRef:r,resetScroll:!1})});return u.useFrame(()=>{"isMounted"in i&&(i.isMounted=!0)}),()=>{i.destroy(),i.destroy=()=>{},Lc(),a()}}),g`
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
                    ${lk({delegateEvents:s,bindEffect:o,proxi:i,getRef:r})}
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
    `};var $_=m.createComponent({tag:"scroller-n0",component:O_,props:{background:()=>({value:"",type:String})},state:{isMounted:()=>({value:!1,type:Boolean}),controlsActive:()=>({value:!1,type:Boolean}),destroy:()=>({value:()=>{},type:Function}),currentParamsId:()=>({value:0,type:Number})}});m.useComponent([$_]);var L_=async()=>{let{data:e}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"#animatedPatternN1",nextRoute:"",backRoute:"#canvas-overview"}),g`<div>
        <scroller-n0
            ${m.staticProps({background:e})}
        ></scroller-n0>
    </div>`};function uk({width:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}function pk({height:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}var D_=({canvas:e,canvasScroller:t,disableOffcanvas:r,proxi:o})=>{let l=new Set([14,5]),{useOffscreen:p,context:h}=ft({disableOffcanvas:r}),f=!0,d=e.getContext(h,{alpha:!0}),v=m.getActiveRoute(),{offscreen:y,offScreenCtx:T}=gt({useOffscreen:p,canvas:e}),S=p?T:d,_=fo(S);S=null,e.width=e.clientWidth,e.height=e.clientHeight;let w=[...Array.from({length:17}).keys()].map((N,R)=>{let O=R>=8.5?8.5+(8.5-R):R;return{width:Math.floor(uk({width:15,relativeIndex:O,amountOfPath:17})),height:Math.floor(pk({height:30,relativeIndex:O,amountOfPath:17})),opacity:O*.09,hasFill:l.has(R),rotate:0,relativeIndex:O,index:R}}),x=U.createScrollerTween({from:{rotate:0},to:{rotate:()=>o.rotation},stagger:{each:2,from:"center"}});w.forEach(N=>{x.subscribeCache(({rotate:R})=>{N.rotate=R})});let E=()=>{if(!d)return;let N=e.width,R=e.height,O=e.width/2,D=e.height/2,k=p?T:d;k&&(p&&y?(y.width=N,y.height=R):k.reset(),w.forEach(({width:L,height:C,opacity:M,rotate:B,index:V,hasFill:F})=>{let z=w.length/2-V,te=1,ae=Math.PI/180*(B-33),q=Math.cos(ae)*te,ne=Math.sin(ae)*te;k.setTransform(q,ne,-ne,q,O,D+z*19),_?(k.beginPath(),k.roundRect(-L/2,-C/2+z*19,L,C,150)):(k.beginPath(),k.rect(Math.round(-L/2),Math.round(-C/2),L,C)),F?k.fillStyle="#000":(k.fillStyle=`rgba(238, 238, 238, ${M})`,k.strokeStyle=`rgba(0, 0, 0, ${M})`,k.stroke()),k.fill()}),bt({useOffscreen:p,offscreen:y,ctx:d}))},I=Ke.createScrollTrigger({trigger:t,propierties:"tween",tween:x,dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>le(t)},ease:!0,easeType:"spring"});I.init();let P=()=>{E(),f&&u.useNextFrame(()=>P())};u.useFrame(()=>{P()});let A=u.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,u.useFrame(()=>{E()})}),$=ee.watch("navigationIsOpen",N=>{if(N){f=!1;return}setTimeout(()=>{f=!0,m.getActiveRoute().route===v.route&&u.useFrame(()=>P())},500)});return()=>{x.destroy(),A(),$(),x.destroy(),x=null,I.destroy(),I=null,d=null,y=null,T=null,x=null,f=!1,w=null,h=null}};function mk({proxi:e,delegateEvents:t,bindObject:r}){let o=u.getUnivoqueId();return g` <li class="c-canvas__controls__item">
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
    </li>`}var F_=({onMount:e,setRef:t,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s,bindObject:i})=>{let a=n();return e(()=>{let c=()=>{};$c();let{canvas:l,canvasScroller:p}=r();return u.useFrame(()=>{u.useNextTick(()=>{c(),c=D_({canvas:l,canvasScroller:p,disableOffcanvas:a.disableOffcanvas,proxi:a})})}),u.useFrame(()=>{"isMounted"in a&&(a.isMounted=!0)}),()=>{c(),Lc(),c=null}}),g`
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
                    ${mk({proxi:a,delegateEvents:s,bindObject:i})}
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
    `};var B_=m.createComponent({tag:"scroller-n1",component:F_,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1,controlsActive:()=>({value:!1,type:Boolean}),rotation:()=>({value:720,type:Number}),rotationlabel:()=>({value:720,type:Number})}});m.useComponent([B_]);var V_=async()=>{let{data:e}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"#caterpillarN1",nextRoute:"#caterpillarN2",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <scroller-n1 ${m.staticProps({background:e})}></scroller-n1>
    </div>`};var W_=({getProxi:e,bindEffect:t})=>{let r=e();return g`
        <button
            type="button"
            class="c-dynamic-list-button"
            ${t({observe:"active",toggleClass:{active:()=>r.active}})}
        >
            ${r.label}
        </button>
    `};var Yn=m.createComponent({tag:"dynamic-list-button",component:W_,props:{label:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean})}});var Dc=[{key:"a",label:"A"},{key:"b",label:"B"},{key:"c",label:"C"},{key:"d",label:"D"}],j_=[{key:"f",label:"F"},{key:"b",label:"B"},{key:"e",label:"E"},{key:"c",label:"C"},{key:"b",label:"B"},{key:"a",label:"A"},{key:"g",label:"G"},{key:"h",label:"H"},{key:"d",label:"D"},{key:"b",label:"B"}],z_=[{key:"m",label:"M"},{key:"q",label:"Q"},{key:"z",label:"Z"},{key:"i",label:"I"},{key:"b",label:"B"},{key:"e",label:"E"},{key:"n",label:"N"},{key:"a",label:"A"},{key:"g",label:"G"},{key:"h",label:"H"},{key:"l",label:"L"},{key:"j",label:"J"},{key:"d",label:"D"}],H_=[{key:"h",label:"H"},{key:"f",label:"F"},{key:"a",label:"A"},{key:"d",label:"D"}],Xn=[[{key:4}],[{key:20},{key:10},{key:10},{key:6},{key:10},{key:10},{key:30}],[{key:3},{key:20},{key:5},{key:20},{key:5},{key:5},{key:5},{key:5},{key:60},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:10},{key:5}]];var hk=[{buttonLabel:"sample1",data:j_},{buttonLabel:"salmple2",data:z_},{buttonLabel:"sample3",data:H_},{buttonLabel:"Initial",data:Dc}],dk=[{label:"repeater with key",key:"key",clean:!1},{label:"repeater without key",key:"",clean:!1},{label:"repeater clear",key:"",clean:!0}];function fk({staticProps:e,delegateEvents:t,bindProps:r,proxi:o}){return hk.map((n,s)=>{let{data:i,buttonLabel:a}=n;return g`
                <dynamic-list-button
                    class="c-dynamic-list__top__button"
                    ${e({label:a})}
                    ${t({click:async()=>{o.data=i,o.activeSample=s}})}
                    ${r(()=>({active:s===o.activeSample}))}
                ></dynamic-list-button>
            `}).join("")}function gk({bindProps:e,staticProps:t,proxi:r}){return dk.map((o,n)=>{let{key:s,clean:i,label:a}=o;return g`
                <dynamic-list-repeater
                    ${t({listId:n,key:s,clean:i,label:a})}
                    ${e(()=>({data:r.data,counter:r.counter}))}
                ></dynamic-list-repeater>
            `}).join("")}var U_=({updateState:e,staticProps:t,bindProps:r,delegateEvents:o,invalidate:n,bindText:s,getProxi:i})=>{let a=i();return g`
        <div class="c-dynamic-list">
            <div class="c-dynamic-list__header">
                <div class="c-dynamic-list__top">
                    ${fk({delegateEvents:o,staticProps:t,bindProps:r,proxi:a})}
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
                    ${gk({bindProps:r,staticProps:t,proxi:a})}
                </div>
            </div>
        </div>
    `};function bk({staticProps:e,bindProps:t,delegateEvents:r,current:o,proxi:n}){return g`
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
    `}var G_=({staticProps:e,bindProps:t,delegateEvents:r,repeat:o,getProxi:n})=>{let s=n(),i=s.key.length>0?s.key:void 0;return g`
        <div class="c-dynamic-list-repeater">
            <h4 class="c-dynamic-list-repeater__title">${s.label}</h4>
            <div class="c-dynamic-list-repeater__list">
                ${o({observe:()=>s.data,clean:s.clean,key:i,afterUpdate:()=>{console.log("repeater updated")},render:({current:a})=>bk({staticProps:e,bindProps:t,delegateEvents:r,current:a,proxi:s})})}
            </div>
        </div>
    `};function vk(e){return[...Array.from({length:e}).keys()].map(t=>t+1)}var yk=({staticProps:e,delegateEvents:t,proxi:r})=>g`
        ${vk(r.counter).map(o=>g`
                    <div class="validate-test-wrapper">
                        <dynamic-list-card-inner
                            ${e({key:`${o}`})}
                            ${t({click:()=>{console.log("invalidate inside reepater click")}})}
                        >
                        </dynamic-list-card-inner>
                    </div>
                `).join("")}
    `,q_=({onMount:e,key:t,staticProps:r,bindProps:o,id:n,delegateEvents:s,invalidate:i,repeat:a,bindText:c,bindEffect:l,getProxi:p,computed:h})=>{let f=p(),d=0;h(()=>f.innerDataUnivoque,()=>f.innerData.filter((y,T,S)=>S.map(({key:_})=>_).indexOf(y.key)===T)),e(async()=>((async()=>(await m.tick(),"isMounted"in f&&(f.isMounted=!0)))(),()=>{}));let v=f.isFull?"is-full":"";return g`
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
                        ${s({click:async()=>{d=d<Xn.length-1?d+1:0,f.innerData=Xn[d],await m.tick()}})}
                    >
                        Update:
                    </dynamic-list-button>

                    <!-- repeater by key -->
                    <div class="c-dynamic-card__repeater">
                        ${a({observe:()=>f.innerDataUnivoque,key:"key",render:({current:y})=>g`<dynamic-list-card-inner
                                    ${o(()=>({key:`${y.value.key}`}))}
                                ></dynamic-list-card-inner>`})}
                    </div>

                    <!-- repeater no key -->
                    <div class="c-dynamic-card__repeater">
                        ${a({observe:()=>f.innerData,render:({current:y})=>g`<dynamic-list-card-inner
                                    ${o(()=>({key:`${y.value.key}`}))}
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
                        ${i({observe:()=>f.counter,render:()=>yk({delegateEvents:s,staticProps:r,proxi:f})})}
                    </div>
                </div>
            </div>
        </div>
    `};var J_=({bindText:e})=>g`<span class="dynamic-list-card-inner">
        <span>${e`${"key"}`}</span>
    </span>`;var Fc=m.createComponent({tag:"dynamic-list-card-inner",component:J_,props:{key:()=>({value:"",type:String})}});var Y_=({getState:e,bindText:t})=>{let{parentListId:r}=e();return g`<div class="dynamic-counter">
        <p class="c-dynamic-counter__title">Nested:</p>
        <p class="c-dynamic-counter__subtitle">(slotted)</p>
        <p class="c-dynamic-counter__list">list index: ${r}</p>
        <span>${t`${"counter"}`}</span>
    </div>`};var X_=m.createComponent({tag:"dynamic-list-counter",component:Y_,props:{parentListId:()=>({value:-1,type:Number}),counter:()=>({value:0,type:Number})}});var K_=()=>g`<div class="c-dynamic-list-empty">
        <p>empty comp</p>
        <mobjs-slot name="empty-slot"></mobjs-slot>
    </div>`;var Q_=m.createComponent({tag:"dynamic-list-empty",component:K_});var Z_=m.createComponent({tag:"dynamic-list-card",component:q_,props:{parentListId:()=>({value:-1,type:Number}),isFull:()=>({value:!1,type:Boolean}),label:()=>({value:"-",type:String}),index:()=>({value:-1,type:Number}),counter:()=>({value:1,type:Number})},state:{innerData:()=>({value:Xn[0],type:Array}),innerDataUnivoque:()=>({value:Xn[0],type:Array}),isSelected:()=>({value:!1,type:Boolean}),isMounted:()=>({value:!1,type:Boolean})},child:[X_,Q_,Fc,Yn]});var eS=({bindText:e})=>g`<div class="c-dynamic-list-slotted-label">
        <p class="content">${e`slotted: ${"label"}`}</p>
    </div>`;var tS=m.createComponent({tag:"dynamic-slotted-label",component:eS,props:{label:()=>({value:"",type:String})}});var rS=m.createComponent({tag:"dynamic-list-repeater",component:G_,props:{data:()=>({value:[],type:Array}),key:()=>({value:"",type:String}),clean:()=>({value:!1,type:Boolean}),listId:()=>({value:-1,type:Number}),counter:()=>({value:-1,type:Number}),label:()=>({value:"",type:String})},child:[Z_,tS]});var oS=m.createComponent({tag:"dynamic-list",component:U_,state:{counter:()=>({value:1,type:Number,validate:e=>e<=10&&e>=0,strict:!0}),data:()=>({value:Dc,type:Array}),activeSample:()=>({value:3,type:Number})},child:[Yn,rS,Fc]});m.useComponent([oS]);var nS=()=>g` <dynamic-list> </dynamic-list> `;var sS=({refs:e})=>{let t=U.createTimeTween({data:{scale:0},duration:3e3,ease:"easeOutBack",stagger:{each:8,from:"end"}}),r=U.createTimeTween({data:{scale:1},duration:6e3,ease:"easeInOutQuad",stagger:{each:12,from:"end"}});e.forEach(i=>{t.subscribeCache(({scale:a})=>{i.style.scale=`${a}`}),r.subscribeCache(({scale:a})=>{i.style.scale=`${a}`})});let o=Me.createAsyncTimeline({repeat:1,autoSet:!1}).goTo(t,{scale:1}),n=Me.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(r,{scale:1.1}),s=ee.watch("navigationIsOpen",i=>{if(i){o.isActive()&&o.pause(),n.isActive()&&n.pause();return}o.isActive()&&o.resume(),n.isActive()&&n.resume()});return{playIntro:()=>o?.play(),playSvg:()=>{n?.play()},destroy:()=>{s(),t.destroy(),t=null,o.destroy(),o=null,r.destroy(),r=null,n.destroy(),n=null}}};var Tk=async({playIntro:e,playSvg:t})=>{await e(),t()},iS=({onMount:e,getProxi:t})=>{let r=t(),{svg:o}=r;return e(({element:n})=>{let s=[...n.querySelectorAll("svg")],{destroy:i,playIntro:a,playSvg:c}=sS({refs:s});return setTimeout(()=>{Tk({playIntro:a,playSvg:c})},500),()=>{i()}}),g`<div class="l-index">
        <div class="l-index__logo">
            ${o.map(n=>g`${n}`).join("")}
        </div>
    </div>`};var aS=m.createComponent({tag:"home-component",component:iS,props:{svg:()=>({value:[],type:Array})},state:{isMounted:()=>({value:!1,type:Boolean})}});var bo=({svg:e,id:t})=>{let r=document.createRange().createContextualFragment(e),o=r.querySelectorAll('[type="layer"]'),n=r.querySelectorAll('[type="delete"]');return[...o].forEach(i=>{i.id!==t&&i.remove()}),[...n].forEach(i=>{i.remove()}),By(r)};m.useComponent([aS]);var cS=async()=>{let{data:e}=await oe({source:"./asset/svg/ms_nord_type.svg?v=1.4"}),{data:t}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"}),[r,o,n,s,i,a,c,l,p,h,f]=["due","tre","quattro","cinque","sei","sette","otto","nove","dieci","undici","dodici"].map(d=>bo({svg:e,id:d}));return g`
        <div>
            <div class="background-shape">${t}</div>
            <home-component
                ${m.staticProps({svg:[r,o,n,s,i,a,c,l,p,h,f]})}
            ></home-component>
        </div>
    `};var lS=[{state:"level1",maxItem:10,ref:"level1_counter",label_plus:"level1 +",label_minus:"level1 -"},{state:"level2",maxItem:10,ref:"level2_counter",label_plus:"level2 +",label_minus:"level2 -"},{state:"level3",maxItem:6,ref:"level3_counter",label_plus:"level3 +",label_minus:"level3 -"}];function _k(e){return Math.floor(Math.random()*e)}var Bc=({delegateEvents:e,updateState:t,invalidate:r,proxi:o})=>g`
        ${lS.map(n=>g` <div class="matrioska__head__item">
                    <dynamic-list-button
                        class="matrioska__button"
                        ${e({click:async()=>{t(n.state,s=>s.slice(0,-1))}})}
                        >${n.label_minus}</dynamic-list-button
                    >
                    <dynamic-list-button
                        class="matrioska__button"
                        ${e({click:async()=>{t(n.state,s=>[...s,{key:_k(1e3),value:u.getUnivoqueId()}])}})}
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
    `;var Kn=e=>{m.useMethodByName(e).toggleActive()};var uS=({repeat:e,staticProps:t,bindProps:r,delegateEvents:o,proxi:n})=>g`
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
    `;var pS=({repeat:e,staticProps:t,bindProps:r,delegateEvents:o,proxi:n})=>g`
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
                                ${uS({repeat:e,staticProps:t,delegateEvents:o,bindProps:r,proxi:n})}
                            </matrioska-item>
                        </div>
                    `})}
        </div>
    `;var mS=({delegateEvents:e,updateState:t,repeat:r,staticProps:o,bindProps:n,invalidate:s,getProxi:i})=>{let a=i();return g`<div class="matrioska">
        <div class="matrioska__head">
            ${Bc({delegateEvents:e,updateState:t,invalidate:s,proxi:a})}
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
                                    ${pS({repeat:r,staticProps:o,bindProps:n,delegateEvents:e,proxi:a})}
                                </matrioska-item>
                            </div>
                        `})}
            </div>
        </div>
    </div>`};var hS=({getProxi:e,bindText:t,id:r,bindEffect:o,addMethod:n})=>{let s=e();return n("toggleActive",()=>{s.active=!s.active}),g`<matrioska-item
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
    </matrioska-item>`};var dS=m.createComponent({tag:"matrioska-item",component:hS,props:{level:()=>({value:"",type:String}),key:()=>({value:"",strict:!0,type:String}),index:()=>({value:0,strict:!0,type:Number}),value:()=>({value:"",type:String}),counter:()=>({value:-1,type:Number})},state:{active:()=>({value:!1,type:Boolean})},style:":host { display: block; } "});var fS=({staticProps:e,delegateEvents:t,invalidate:r,bindProps:o,proxi:n})=>g` <div class="matrioska__level matrioska__level--3">
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
    </div>`;var gS=({staticProps:e,bindProps:t,delegateEvents:r,invalidate:o,proxi:n})=>g`
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
                                        ${fS({staticProps:e,delegateEvents:r,invalidate:o,bindProps:t,proxi:n})}
                                    </matrioska-item>
                                </div>
                            `).join("")})}
        </div>
    `;var bS=({delegateEvents:e,updateState:t,staticProps:r,bindProps:o,invalidate:n,getProxi:s})=>{let i=s();return g`<div class="matrioska">
        <div class="matrioska__head">
            ${Bc({delegateEvents:e,updateState:t,invalidate:n,proxi:i})}
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
                                            ${gS({staticProps:r,bindProps:o,delegateEvents:e,invalidate:n,proxi:i})}
                                        </matrioska-item>
                                    </div>
                                `).join("")})}
            </div>
        </div>
    </div>`};var Sk=e=>{for(let t=e.length-1;t>0;t--){let r=Math.floor(Math.random()*(t+1));[e[t],e[r]]=[e[r],e[t]]}return e},vS={state:{level1:()=>({value:[{key:1,value:u.getUnivoqueId()}],type:Array,validate:e=>e.length<=10,strict:!0}),level2:()=>({value:[{key:1,value:u.getUnivoqueId()},{key:2,value:u.getUnivoqueId()}],type:Array,validate:e=>e.length<=10,strict:!0}),level3:()=>({value:[{key:1,value:u.getUnivoqueId()},{key:2,value:u.getUnivoqueId()}],type:Array,transform:(e,t)=>e>t?Sk(e):e,validate:e=>e.length<=6,strict:!0}),counter:()=>({value:0,type:Number})},child:[Yn,dS]},yS=m.createComponent({tag:"page-matrioska-repeat",component:mS,...vS}),TS=m.createComponent({tag:"page-matrioska-invalidate",component:bS,...vS});m.useComponent([yS,TS]);var _S=()=>g` <page-matrioska-repeat> </page-matrioska-repeat> `,SS=()=>g` <page-matrioska-invalidate> </page-matrioska-invalidate> `;var vp=0,xk=({indicators:e,proxi:t})=>[...e].map((r,o)=>Ke.createScrollTrigger({item:r,pin:!0,animateAtStart:!1,animatePin:!0,useThrottle:!0,ease:!1,dynamicStart:{position:"right",value:()=>window.innerWidth+vp-je(r)*(o+1)},dynamicEnd:{position:"right",value:()=>{let n=e.length-(o-2);return window.innerWidth/10*9*n}},onEnter:()=>{t.currentIdFromScroll=o},onLeaveBack:()=>{t.currentIdFromScroll=o-1}})),xS=({pins:e})=>{e.forEach(t=>t.refresh())},Ck=({titles:e})=>[...e].map(t=>Ke.createParallax({item:t,propierties:"x",reverse:!0,range:9})),CS=({nav:e})=>{e.classList.add("active"),[...document.querySelectorAll(".js-indicator")].forEach(r=>{r.classList.add("active")})},ES=({nav:e})=>{e.classList.remove("active"),[...document.querySelectorAll(".js-indicator")].forEach(r=>{r.classList.remove("active")})},wS=({indicators:e,titles:t,nav:r,animatePin:o,proxi:n,rootRef:s})=>{let i=xk({indicators:e,proxi:n}),a=Ck({titles:t}),c=document.querySelector(".l-navcontainer__side");vp=je(c)/2;let l=u.useResize(()=>{vp=je(c)/2}),p=new si({root:s,container:".js-container",row:".js-row",column:".js-column",trigger:".js-trigger",shadowClass:".shadowClass",useWillChange:!0,useDrag:!0,useSticky:!o,useThrottle:!0,animateAtStart:!1,ease:!0,easeType:"lerp",addCss:!0,columnHeight:70,columnWidth:100,columnAlign:"center",animatePin:o,breakpoint:"tablet",children:[...i,...a],onEnter:()=>{xS({pins:i}),CS({nav:r})},onEnterBack:()=>{xS({pins:i}),CS({nav:r})},onLeave:()=>{ES({nav:r})},onLeaveBack:()=>{ES({nav:r})}});return p.init(),{destroy:()=>{i.forEach(h=>{h?.destroy()}),i=[],a.forEach(h=>{h?.destroy()}),a=[],p.destroy(),p=null,l()},refresh:()=>p.refresh()}};var Ek=(e,t)=>e===0?1:e===t-1?-1:0,wk=({numOfCol:e,pinIsVisible:t,staticProps:r})=>{let o=t?"":"hidden";return[...Array.from({length:e}).keys()].map((n,s)=>g`
                <horizontal-scroller-section
                    ${r({id:s,pinClass:o})}
                ></horizontal-scroller-section>
            `).join("")},Ik=({numOfCol:e,proxi:t,staticProps:r,delegateEvents:o})=>[...Array.from({length:e}).keys()].map((n,s)=>g`
                <horizontal-scroller-button
                    ${r({id:s})}
                    ${o({click:()=>t.currentId=s})}
                ></horizontal-scroller-button>
            `).join(""),IS=({onMount:e,watch:t,staticProps:r,delegateEvents:o,setRef:n,getRef:s,getProxi:i})=>{let a=i();return e(({element:c})=>{if(ue.mq("max","desktop"))return;let l=10,p=[...c.querySelectorAll(".js-indicator")],h=c.querySelector(".js-nav"),f=[...c.querySelectorAll(".js-title h1")],{destroy:d}=wS({rootRef:s().js_root,indicators:p,titles:f,nav:h,animatePin:a.animatePin,proxi:a});return window.scrollTo(0,0),t(()=>a.currentId,(v,y)=>{let T=c.querySelector(`.shadowClass--section-${v} .shadowClass--in-center`),{top:S}=be(T),_=le(T),w=Number.parseInt(v)===0?window.innerHeight+1:S+_-window.innerHeight,x=Math.max(1,Math.abs(v-y)),E=2e3,P=1+(l-x)/l*.9,A=x/l*E*P;Nr.to(w+Ek(v,l),{duration:A})}),()=>{d()}}),ue.mq("max","desktop")?g`<div><only-desktop></only-desktop></div>`:g`<div class="l-h-scroller">
        <only-desktop></only-desktop>
        <div class="l-h-scroller__top">scroll down</div>
        <ul class="l-h-scroller__nav js-nav" ${n("js_nav")}>
            ${Ik({numOfCol:10,proxi:a,staticProps:r,delegateEvents:o})}
        </ul>
        <div class="l-h-scroller__root js-root" ${n("js_root")}>
            <div
                class="l-h-scroller__container js-container"
                ${n("js_container")}
            >
                <div class="l-h-scroller__row js-row" ${n("js_root")}>
                    ${wk({numOfCol:10,pinIsVisible:!a.animatePin,staticProps:r})}
                </div>
                <div
                    class="l-h-scroller__trigger js-trigger"
                    ${n("js_trigger")}
                ></div>
            </div>
        </div>
        <div class="l-h-scroller__bottom">scroll up</div>
    </div>`};var MS=({getProxi:e})=>{let t=e();return g`
        <li>
            <button
                type="button"
                data-id="${t.id}"
                class="l-h-scroller__nav__btn"
            >
                ${t.id}
            </button>
        </li>
    `};var kS=m.createComponent({tag:"horizontal-scroller-button",component:MS,props:{id:()=>({value:-1,type:Number})}});var RS=({getState:e})=>{let{id:t,pinClass:r}=e();return g`
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
    `};var NS=m.createComponent({tag:"horizontal-scroller-section",component:RS,props:{id:()=>({value:-1,type:Number}),pinClass:()=>({value:"",type:String})}});var PS=m.createComponent({tag:"horizontal-scroller",component:IS,props:{animatePin:()=>({value:!1,type:Boolean})},state:{currentId:()=>({value:0,type:Number,skipEqual:!1}),currentIdFromScroll:()=>({value:0,type:Number})},child:[kS,NS]});m.useComponent([PS]);var AS=async()=>(Se({active:!0,prevRoute:"",nextRoute:"",backRoute:""}),g`<div>
        <horizontal-scroller
            ${m.staticProps({animatePin:!1})}
        ></horizontal-scroller>
    </div>`);var OS=({getState:e})=>{let{fill:t}=e();return g`
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
    `};var $S=m.createComponent({tag:"svg-star",component:OS,props:{fill:()=>({value:"#000000",type:String})}});var Mk=({delegateEvents:e,bindEffect:t,bindObject:r,proxi:o})=>g`<div
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
    </div>`,LS=({bindProps:e,delegateEvents:t,bindObject:r,getProxi:o,bindEffect:n})=>{let s=o();return g`<div>
        <button
            type="button"
            class="c-move3d-page__controls__open"
            ${t({click:()=>{s.controlsActive=!0}})}
        >
            show controls
        </button>
        ${Mk({delegateEvents:t,bindEffect:n,bindObject:r,proxi:s})}
        <move-3d
            ${e(()=>({shape:s.data,xDepth:s.xDepth,yDepth:s.yDepth,xLimit:s.xLimit,yLimit:s.yLimit,factor:s.factor,debug:s.debug,drag:s.drag}))}
        ></move-3d>
    </div>`};var kk=({debug:e,id:t})=>e?g`<span class="c-move3d-item__debug">${t}</span>`:"",yp=({data:e,root:t,childrenId:r,debug:o})=>e.map(({children:n,props:s})=>g`<move-3d-item
                name="${r}"
                ${m.staticProps({root:t,...s})}
            >
                ${kk({debug:o,id:s.id})}
                ${yp({data:n??[],root:!1,childrenId:r,debug:o})}
            </move-3d-item>`).join("");var Tp=({element:e})=>({height:le(e),width:je(e),offSetLeft:be(e).left,offSetTop:be(e).top}),DS=({childrenId:e})=>m.useMethodArrayByName(e).map(r=>o=>r?.move?.(o)),FS=({ratio:e})=>({get3dItemUnit:t=>`min(${t}px, calc((((100vw) * ${t}) / ${e} )))`});var Qn=()=>{},BS=({onMount:e,setRef:t,getRef:r,watch:o,computed:n,invalidate:s,getProxi:i,bindEffect:a})=>{let c=u.getUnivoqueId(),l=i(),p=0,h=0,f=0,d=0,v=0,y=0,T=0,S=0,_=!1,w=!1,x={x:0,y:0},E=0,I=Qn,P=Qn,A=Qn,$=Qn,N=Qn,R=Qn,O=[],D=U.createSpring({data:{delta:0,ax:0,ay:0}}),k=()=>{_=!1},L=()=>{let{vw:F,vh:z}=l.centerToViewoport||l.drag?{vw:window.innerWidth,vh:window.innerHeight}:{vw:h,vh:p},te=x.x,ae=x.y,{xgap:q,ygap:ne}=_?w?(w=!1,{xgap:0,ygap:0}):{xgap:te-v,ygap:ae-T}:{xgap:0,ygap:0};_&&(y+=q,S+=ne);let{xInMotion:re,yInMotion:ce}=_?{xInMotion:y,yInMotion:S}:{xInMotion:te,yInMotion:ae},{ax:Oe,ay:Je}=l.centerToViewoport||l.drag?{ax:-(F/2-re)/l.xDepth,ay:(z/2-ce)/l.yDepth}:{ax:-(F/2-(re-f))/l.xDepth,ay:(z/2-(ce-d))/l.yDepth};v=te,T=ae;let Z=Oe>l.xLimit||Oe<-l.xLimit,ye=Je>l.yLimit||Je<-l.yLimit;Z&&(y-=q),ye&&(S-=ne);let ke=ue.clamp(Oe,-l.xLimit,l.xLimit),Ae=ue.clamp(Je,-l.yLimit,l.yLimit),Ye=Math.hypot(Math.abs(Ae),Math.abs(ke));D.goTo({delta:Ye,ax:ke,ay:Ae}).catch(()=>{}),O.forEach($e=>{$e({delta:Ye,factor:l.factor})})},C=F=>{E!==F&&(x.y-=E,E=F,x.y+=E),L()},M=({page:F})=>F.y>d&&F.y<d+p&&F.x>f&&F.x<f+h,B=({page:F})=>{M({page:F})&&(_=!0,w=!0)},V=()=>{R(),R=l.useScroll?u.useScroll(({scrollY:F})=>{C(F)}):()=>{}};return e(({element:F})=>{let{container:z}=r();l.afterInit(F);let te=D.subscribe(({delta:re,ax:ce,ay:Oe})=>{z.style.transform=`translate3D(0,0,0) rotateY(${ce}deg) rotateX(${Oe}deg)`,"onUpdate"in l&&l.onUpdate({delta:re,deltaX:ce,deltaY:Oe})}),ae=D.onComplete(({ax:re,ay:ce})=>{z.style.transform=`rotateY(${re}deg) rotateX(${ce}deg)`}),q=u.useMouseMove(({page:re})=>{x={x:re.x,y:re.y},L()}),ne=u.useResize(()=>{({height:p,width:h,offSetTop:d,offSetLeft:f}=Tp({element:F}))});return o(()=>l.drag,re=>{if(N(),$(),A(),P(),I(),re){y=window.innerWidth/2,S=window.innerHeight/2,I=u.useTouchStart(({page:ce})=>{B({page:ce})}),P=u.useTouchEnd(()=>{k()}),A=u.useMouseDown(({page:ce})=>{B({page:ce})}),$=u.useMouseUp(()=>{k()}),N=u.useTouchMove(({page:ce})=>{x={x:ce.x,y:ce.y},L()});return}},{immediate:!0}),o(()=>l.useScroll,(re,ce)=>{if(re){V();return}re!==ce&&R()}),n(()=>l.useScroll,()=>!l.drag&&!l.centerToViewoport),u.useNextLoop(()=>{({height:p,width:h,offSetTop:d,offSetLeft:f}=Tp({element:F})),x={x:window.innerWidth/2,y:window.innerHeight/2},L()}),()=>{te(),ae(),ne(),q(),R(),I(),P(),A(),$(),N(),D.destroy(),O=[],D=null,p=null,h=null,f=null,d=null,v=null,y=null,T=null,S=null,_=null,w=null,x=null,E=null}}),g`<div
        class="c-move-3d"
        ${a({toggleClass:{"move3D--drag":()=>l.drag}})}
    >
        <div
            class="c-move-3d__scene"
            ${a({toggleStyle:{perspective:()=>`${l.perspective}px`}})}
        >
            <div class="c-move-3d__container" ${t("container")}>
                ${s({observe:[()=>l.shape,()=>l.debug],afterUpdate:()=>{O=DS({childrenId:c})},render:()=>yp({data:l.shape,root:!0,childrenId:c,debug:l.debug})})}
            </div>
        </div>
    </div>`};var _p=({startRotation:e,range:t,delta:r,limit:o})=>Number.parseFloat((t*r/o-e).toFixed(2)),VS=({rotate:e,anchorPoint:t,baseRotateX:r,baseRotateY:o})=>{if(!e||!t)return{rotateX:0,rotateY:0};switch(e.toUpperCase()){case"X":return(()=>{switch(t.toUpperCase()){case"BOTTOM":return{rotateX:r,rotateY:0};case"TOP":return{rotateX:-r,rotateY:0};default:return{rotateX:0,rotateY:0}}})();case"Y":return(()=>{switch(t.toUpperCase()){case"LEFT":return{rotateX:0,rotateY:o};case"RIGHT":return{rotateX:0,rotateY:-o};default:return{rotateX:0,rotateY:0}}})();case"XY":return(()=>{switch(t.toUpperCase()){case"TOP-LEFT":return{rotateX:-r,rotateY:o};case"TOP-RIGHT":return{rotateX:-r,rotateY:-o};case"BOTTOM-LEFT":return{rotateX:r,rotateY:o};case"BOTTOM-RIGHT":return{rotateX:r,rotateY:-o};default:return{rotateX:0,rotateY:0}}})();default:return{rotateX:0,rotateY:0}}};var Rk=e=>e?.tagName.length===0?"":g`
        <div class="c-move3d-item__component ${e?.className}">
            <${e.tagName} ${m.staticProps(e?.props??{})}>
            </${e.tagName}>
        </div>`,Nk=({delta:e,factor:t,initialRotate:r,depth:o,range:n,rotate:s,anchorPoint:i,lerp:a})=>{let c=Math.round(o*e/t),l={startRotation:r??0,range:n??20,delta:e,limit:t},p=_p(l),h=_p(l),f={rotate:s??"center",anchorPoint:i,baseRotateX:p,baseRotateY:h},{rotateX:d,rotateY:v}=VS(f);a.goTo({depth:c,rotateX:d,rotateY:v}).catch(()=>{})},WS=({getState:e,addMethod:t,onMount:r})=>{let{root:o,anchorPoint:n,animate:s,depth:i,rotate:a,width:c,height:l,offsetX:p,offsetY:h,range:f,initialRotate:d,initialDepth:v,classList:y,component:T}=e(),S=o?"is-root":"is-children",_=`--item-width:${c};`,w=`--item-height:${l};`,x=`--offset-x:${p};`,E=`--offset-y:${h};`,I=U.createLerp({data:{depth:0,rotateX:0,rotateY:0}});return t("move",({delta:P,factor:A})=>{s&&Nk({delta:P,factor:A,initialRotate:d,depth:i,range:f,rotate:a,anchorPoint:n,lerp:I})}),r(({element:P})=>{let A=I.subscribe(({depth:R,rotateX:O,rotateY:D})=>{let k=R+v;P.style.transform=`translate3D(0,0,${k}px) rotateX(${O}deg) rotateY(${D}deg)`}),$=I.onComplete(({depth:R,rotateX:O,rotateY:D})=>{let k=R+v;P.style.transform=`translateZ(${k}px) rotateX(${O}deg) rotateY(${D}deg)`}),N=v;return P.style.transform=`translateZ(${N}px)`,()=>{A(),$(),I.destroy(),I=null}}),g`<div
        class="c-move3d-item ${S} anchor-${n}"
        style="${_}${w}${x}${E}"
    >
        <div class="c-move3d-item__content ${y}"></div>
        ${Rk({tagName:T?.tagName??"",className:T?.className??"",props:T?.props??{}})}
        <mobjs-slot></mobjs-slot>
    </div>`};var jS=m.createComponent({tag:"move-3d-item",component:WS,props:{root:()=>({value:!0,type:Boolean}),depth:()=>({value:0,type:Number}),rotate:()=>({value:"x",type:String}),width:()=>({value:"0px",type:String}),height:()=>({value:"0px",type:String}),offsetX:()=>({value:"0px",type:String}),offsetY:()=>({value:"0px",type:String}),range:()=>({value:20,type:Number}),anchorPoint:()=>({value:"center",type:String}),animate:()=>({value:!0,type:Boolean}),initialRotate:()=>({value:0,type:Number}),initialDepth:()=>({value:0,type:Number}),classList:()=>({value:"",type:String}),component:{tagName:()=>({value:"",type:String}),className:()=>({value:"",type:String}),props:()=>({value:"",type:"any"})}},state:{id:()=>({value:"",type:String})}});var Zn=m.createComponent({tag:"move-3d",component:BS,props:{drag:()=>({value:!1,type:Boolean}),centerToViewoport:()=>({value:!1,type:Boolean}),perspective:()=>({value:700,type:Number}),xDepth:()=>({value:20,type:Number,validate:e=>e>1,strict:!0}),yDepth:()=>({value:20,type:Number,validate:e=>e>1,strict:!0}),xLimit:()=>({value:1e4,type:Number}),yLimit:()=>({value:1e4,type:Number}),factor:()=>({value:45,type:Number,validate:e=>e>1,strict:!0}),shape:()=>({value:[],type:Array}),debug:()=>({value:!1,type:Boolean}),afterInit:()=>({value:()=>{},type:Function}),onUpdate:()=>({value:()=>{},type:Function})},state:{useScroll:()=>({value:!0,type:Boolean})},child:[jS]});var zS=m.createComponent({tag:"move-3d-page",component:LS,props:{data:()=>({value:[],type:Array}),drag:()=>({value:!0,type:Boolean})},state:{xDepth:()=>({value:20,type:Number}),yDepth:()=>({value:20,type:Number}),xLimit:()=>({value:1e3,type:Number}),yLimit:()=>({value:1e3,type:Number}),perspective:()=>({value:700,type:Number}),debug:()=>({value:!1,type:Boolean}),factor:()=>({value:45,type:Number,validate:e=>e>1,strict:!0}),controlsActive:()=>({value:!1,type:Boolean})},child:[Zn]});m.useComponent([zS,$S]);var HS=async({props:e})=>{let{data:t,drag:r,prevRoute:o,nextRoute:n}=e,{data:s}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:o,nextRoute:n,backRoute:"#plugin-overview"}),g` <div>
        <div class="background-shape">${s}</div>
        <move-3d-page
            ${m.staticProps({data:t,drag:r})}
        ></move-3d-page>
    </div>`};var{get3dItemUnit:H}=FS({ratio:1980}),US=[{props:{id:0,depth:0,anchorPoint:"center",classList:"move3d-square",animate:!0,width:H(150),height:H(150)},children:[{props:{id:1,depth:200,width:H(150),height:H(150),rotate:"",anchorPoint:"center",initialDepth:100,classList:"move3d-square has-star pippo",component:{tagName:"svg-star",className:"move3d-square__star",props:{fill:"#f28f3b"}},animate:!0},children:[]},{props:{id:2,depth:200,width:H(80),height:H(80),offsetX:H(40),offsetY:H(40),rotate:"",initialDepth:200,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:3,depth:200,width:H(80),height:H(80),offsetX:H(-10),offsetY:H(80),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:4,depth:200,width:H(80),height:H(80),offsetX:H(80),offsetY:H(80),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:5,depth:200,width:H(80),height:H(80),offsetX:H(-10),offsetY:H(-10),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:6,depth:200,width:H(80),height:H(80),offsetX:H(80),offsetY:H(-10),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:7,depth:100,width:H(150),height:H(150),rotate:"x",range:20,anchorPoint:"bottom",classList:"move3d-square",animate:!0},children:[{props:{id:8,depth:0,width:H(150),height:H(150),rotate:"x",range:30,anchorPoint:"bottom",classList:"move3d-square",animate:!0},children:[]}]},{props:{id:9,depth:100,width:H(150),height:H(150),rotate:"x",range:20,anchorPoint:"top",classList:"move3d-square",animate:!0},children:[{props:{id:10,depth:0,width:H(150),height:H(150),rotate:"x",range:20,anchorPoint:"top",classList:"move3d-square",animate:!0},children:[]}]},{props:{id:11,depth:100,width:H(150),height:H(150),rotate:"y",range:20,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[{props:{id:12,depth:0,width:H(150),height:H(150),rotate:"y",range:30,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[{props:{id:13,depth:0,width:H(150),height:H(150),rotate:"y",range:40,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[]}]}]},{props:{id:13,depth:100,width:H(150),height:H(150),rotate:"y",range:20,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[{props:{id:14,depth:0,width:H(150),height:H(150),rotate:"y",range:30,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[{props:{id:15,depth:0,width:H(150),height:H(150),rotate:"y",range:40,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[]}]}]},{props:{id:16,depth:150,rotate:"xy",width:H(150),height:H(150),offsetX:H(20),offsetY:H(20),range:20,anchorPoint:"bottom-left",classList:"move3d-square",animate:!0},children:[{props:{id:17,depth:100,rotate:"",width:H(150),height:H(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:18,depth:150,rotate:"xy",width:H(150),height:H(150),offsetX:H(20),offsetY:H(20),range:20,anchorPoint:"bottom-right",classList:"move3d-square",animate:!0},children:[{props:{id:19,depth:100,rotate:"",width:H(150),height:H(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:20,depth:150,rotate:"xy",width:H(150),height:H(150),offsetX:H(20),offsetY:H(20),range:20,anchorPoint:"top-left",classList:"move3d-square",animate:!0},children:[{props:{id:21,depth:100,rotate:"",width:H(150),height:H(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:22,depth:150,rotate:"xy",width:H(150),height:H(150),offsetX:H(20),offsetY:H(20),range:20,anchorPoint:"top-right",classList:"move3d-square",animate:!0},children:[{props:{id:23,depth:100,rotate:"",width:H(150),height:H(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]}]}];var GS={shape1:{prevRoute:"",nextRoute:"#plugin-dragger",data:US,drag:!0}};var qS=({getState:e})=>{let{content:t}=e();return g`${t}`};var es=m.createComponent({tag:"any-component",component:qS,props:{content:()=>({value:"",type:String})}});var JS=({elements:e})=>{let t=180/Math.PI,r=window.innerWidth,o=window.innerHeight,n=0,s=0,i=0,a=U.createSpring({data:{x:0,y:0},stagger:{each:3,from:"start"}});e.forEach(h=>{a.subscribe(({x:f,y:d})=>{h.style.translate=`${f}px ${d}px`})});let c=U.createSpring({data:{rotation:0},stagger:{each:8,from:"start"}});e.forEach(h=>{h&&c.subscribeCache(({rotation:f})=>{h.style.rotate=`${f}deg`})});let l=u.useResize(()=>{r=window.innerWidth,o=window.innerHeight}),p=u.useMouseMove(({client:h})=>{let{x:f,y:d}=h,v=d-n,y=f-s;if(Math.hypot(y,v)>10){n=d,s=f;let _=Math.atan2(v,y)*t+180+90-i;for(;_>180;)_-=360;for(;_<-180;)_+=360;i+=_,c.goTo({rotation:i})}a.goTo({x:f-r/2,y:d-o/2})});return{destroy:()=>{a.destroy(),a=null,c.destroy(),c=null,l(),p(),r=null,o=null,n=null,s=null,i=null}}};var Pk=5,YS=({onMount:e,getRefs:t,setRef:r})=>{let{starOutline:o}=Gn(),n=[...Array.from({length:Pk}).keys()].map(()=>`<span class='mouse-trail__item' ${r("star")}>${o}</span>`).join("");return e(()=>{let{star:s}=t(),{destroy:i}=JS({elements:s});return()=>{i()}}),g`<div class="mouse-trail">${n}</div>`};var Vc=m.createComponent({tag:"mouse-trail",component:YS});var XS=({u0:e,u1:t,o:r,o_b:o,m1:n,m2:s,m3:i,m4:a,b1:c,b1_b:l,b3:p,b4:h,b5:f,sign:d,m1_b:v,m3_b:y,m4_b:T,b1_stone:S,m1_stone:_})=>[{props:{id:0,depth:200,anchorPoint:"center",classList:"",animate:!0},children:[{props:{id:1,depth:-500,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:e}}},children:[]},{props:{id:1,depth:-50,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:t}}},children:[]},{props:{id:2,depth:20,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:r}}},children:[{props:{id:2,depth:21,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:o}}},children:[]},{props:{id:3,depth:100,anchorPoint:"right",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:n}}},children:[{props:{id:3,depth:20,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:v}}},children:[]},{props:{id:6,depth:45,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:a}}},children:[]},{props:{id:6,depth:20,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:T}}},children:[]},{props:{id:6,depth:20,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:_}}},children:[]},{props:{id:4,depth:65,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:s}}},children:[]},{props:{id:4,depth:20,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:d}}},children:[]},{props:{id:5,depth:30,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:i}}},children:[]},{props:{id:5,depth:20,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:y}}},children:[]}]},{props:{id:6,depth:100,anchorPoint:"left",initialDepth:0,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:l}}},children:[{props:{id:6,depth:51,anchorPoint:"center",initialDepth:1,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:c}}},children:[]},{props:{id:7,depth:120,anchorPoint:"center",initialDepth:20,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:S}}},children:[]},{props:{id:8,depth:70,initialDepth:10,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:p}}},children:[]},{props:{id:10,depth:170,anchorPoint:"center",initialDepth:10,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:h}}},children:[]},{props:{id:11,depth:100,anchorPoint:"center",initialDepth:1,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:f}}},children:[]}]}]}]}];m.useComponent([Zn,es,Vc]);var KS=async()=>{let{data:e}=await oe({source:"./asset/svg/lettering-mob.svg?v=0.9"}),{data:t}=await oe({source:"./asset/svg/rdp.svg?v=1.3"}),[r,o,n,s,i,a,c,l,p,h,f,d,v,y,T,S,_,w,x]=["U0_block","U1_block","O_block","O_b_block","M1_block","M1_b_block","M2_block","M3_block","M3_b_block","M4_block","M4_b_block","B1_block","B1_b_block","B3_block","B4_block","B5_block","sign","Bstone_1_block","Mstone_1_block"].map(E=>bo({svg:e,id:E}));return Se({active:!0,prevRoute:"#rdp-01",nextRoute:"#mob-02",backRoute:"#svg-overview"}),g`<div class="l-mob-01">
        <div class="background-shape">${t}</div>
        <mouse-trail></mouse-trail>
        <move-3d
            ${m.staticProps({shape:XS({u0:r,u1:o,o:n,o_b:s,m1:i,m2:c,m3:l,m4:h,b1:d,b1_b:v,b3:y,b4:T,b5:S,sign:_,m1_b:a,m3_b:p,m4_b:f,b1_stone:w,m1_stone:x}),xDepth:100,yDepth:30,factor:20,xLimit:10,yLimit:20,drag:!0,perspective:1e3})}
        ></move-3d>
    </div>`};var QS=()=>ue.mq("min","desktop"),ZS="#home",Sp=null;m.afterRouteChange(({currentRoute:e})=>{e!=="onlyDesktop"&&(Sp=m.getActiveParams(),ZS=e)});var ex=({onMount:e,getProxi:t,bindEffect:r,watch:o})=>{let n=t();return n.active=QS(),e(()=>{let s=u.useResize(()=>{n.active=QS()});return o(()=>n.active,i=>{i&&m.loadUrl({url:ZS,params:Sp??{}})}),()=>{s(),Sp=null}}),g`
        <a
            href="#home"
            class="l-only-desktop__link"
            ${r({toggleClass:{active:()=>n.active}})}
        >
            home page
        </a>
    `};var tx=m.createComponent({tag:"only-desktop-cta",component:ex,state:{active:()=>({value:!1,type:Boolean,skipEqual:!1})}});m.useComponent([tx]);var rx=async()=>{let{data:e}=await oe({source:"./asset/svg/lettering-mob-only-desktop.svg?v=0.1"}),{data:t}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});return g`
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
    `};var xp=({canvas:e,disableOffcanvas:t})=>{let{useOffscreen:r,context:o}=ft({disableOffcanvas:t}),n=!0,s=e.getContext(o,{alpha:!0}),i=m.getActiveRoute(),{offscreen:a,offScreenCtx:c}=gt({useOffscreen:r,canvas:e}),l=r?c:s,p=fo(l);l=null,e.width=e.clientWidth,e.height=e.clientHeight;let h=10,f=10,d=window.innerWidth/20,v=window.innerHeight/20,T=go({canvas:e,numberOfRow:h,numberOfColumn:f,cellWidth:d,cellHeight:v,gutter:1}).items,S=T.map(L=>({...L,scale:1,rotate:0})),_=({row:L,col:C})=>{let M=(f+1)*L;return S[M+C]},x={..._({row:1,col:1}),scale:1,rotate:0},I={..._({row:4,col:5}),scale:1,rotate:0},P=U.createTimeTween({ease:"easeInOutQuad",stagger:{each:10,from:"edges"},data:{scale:1,rotate:0}}),A=U.createTimeTween({data:x,duration:1e3,ease:"easeInOutBack"}),$=U.createSpring({data:I});S.forEach(L=>{P.subscribeCache(({scale:C,rotate:M})=>{L.rotate=M,L.scale=C})}),A.subscribe(L=>{x=L}),$.subscribe(L=>{I=L});let N=Me.createAsyncTimeline({repeat:-1,autoSet:!1,yoyo:!0});N.goTo(P,{scale:.2,rotate:90},{duration:1e3});let R=Me.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1});R.goTo(A,{x:_({row:1,col:8}).x,rotate:360,scale:2}).createGroup({waitComplete:!1}).goTo(A,{y:_({row:8,col:8}).y,rotate:180}).goTo($,{y:_({row:0,col:8}).y},{delay:500}).closeGroup().label({name:"my-label"}).createGroup({waitComplete:!1}).goTo(A,{x:_({row:8,col:1}).x,rotate:0,scale:1},{ease:"easeOutQuad",duration:500}).goTo($,{rotate:360,scale:2},{delay:0}).closeGroup().createGroup({waitComplete:!1}).goTo(A,{y:_({row:1,col:1}).y,rotate:-180},{duration:1e3}).goTo($,{rotate:0,y:_({row:8,col:8}).y,scale:1},{delay:200}).closeGroup();let O=()=>{if(!s)return;let L=e.width,C=e.height,M=r?c:s;if(M){r&&a?(a.width=L,a.height=C):M.reset(),S.forEach(({x:B,y:V,width:F,height:z,rotate:te,scale:ae,offsetXCenter:q,offsetYCenter:ne},re)=>{if(re===40){let ke=Math.PI/180*x.rotate,Ae=Math.cos(ke)*x.scale,Ye=Math.sin(ke)*x.scale;M.setTransform(Ae,Ye,-Ye,Ae,Math.floor(x.offsetXCenter+x.x),Math.floor(x.offsetYCenter+x.y)),p?(M.beginPath(),M.roundRect(Math.floor(-x.width/2),Math.floor(-x.height/2),Math.floor(x.width),x.height,150)):(M.beginPath(),M.rect(Math.floor(-x.width/2),Math.floor(-x.height/2),Math.floor(x.width),Math.floor(x.height))),M.fillStyle="#000000",M.fill()}let ce=Math.PI/180*te,Oe=Math.cos(ce)*ae,Je=Math.sin(ce)*ae;M.setTransform(Oe,Je,-Je,Oe,Math.floor(q+B),Math.floor(ne+V));let Z=Math.round(-F/2),ye=Math.round(-z/2);p?(M.beginPath(),M.roundRect(Z,ye,F,z,150)):(M.beginPath(),M.rect(Z,ye,F,z)),M.fillStyle="rgba(238, 238, 238, 0.9)",M.fill()});{let B=Math.PI/180*I.rotate,V=Math.cos(B)*I.scale,F=Math.sin(B)*I.scale;M.setTransform(V,F,-F,V,Math.floor(I.offsetXCenter+I.x),Math.floor(I.offsetYCenter+I.y)),p?(M.beginPath(),M.roundRect(Math.floor(-I.width/2),Math.floor(-I.height/2),Math.floor(I.width),Math.floor(I.height),150)):(M.beginPath(),M.rect(Math.floor(-I.width/2),Math.floor(-I.height/2),Math.floor(I.width),Math.floor(I.height))),M.fillStyle="#a86464",M.fill()}bt({useOffscreen:r,offscreen:a,ctx:s})}},D=()=>{O(),n&&u.useNextFrame(()=>D())};u.useFrame(()=>{D()});let k=ee.watch("navigationIsOpen",u.useDebounce(L=>{if(L){R.pause(),N.pause(),n=!1;return}setTimeout(async()=>{m.getActiveRoute().route===i.route&&(R.resume(),N.resume(),n=!0,u.useFrame(()=>D()))},200)},200));return{destroy:()=>{k(),s=null,a=null,c=null,T=[],n=!1,P?.destroy?.(),A?.destroy?.(),$?.destroy?.(),R?.destroy?.(),N?.destroy?.(),S=null,x=null,I=null,o=null,P=null,A=null,$=null,R=null,N=null},play:()=>{R.play(),N.isActive()||N.play()},playReverse:()=>{R.playReverse(),N.isActive()||N.play()},playFromLabel:()=>{R.setTween("my-label",[A,$]).then(()=>{R.playFrom("my-label").then(()=>{console.log("resolve promise playFrom")})}),N.isActive()||N.play()},playFromLabelReverse:()=>{R.setTween("my-label",[A,$]).then(()=>{R.playFromReverse("my-label").then(()=>{console.log("resolve promise playFrom")})}),N.isActive()||N.play()},revertNext:()=>{R.reverseNext()},pause:()=>{R.pause(),N.pause()},resume:()=>{R.resume(),N.resume()},stop:()=>{R.stop(),N.stop()}}};function Ak({buttons:e}){return Object.entries(e).map(([t,r])=>{let{label:o}=r;return g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn ${t}"
                >
                    ${o}
                </button>
            </li>`}).join("")}var ox=({onMount:e,getState:t,setRef:r,getRef:o,bindEffect:n,getProxi:s,delegateEvents:i})=>{let a=s(),c={},l=()=>{};return e(({element:p})=>{let{canvas:h}=o();u.useFrame(()=>{u.useNextTick(()=>{l(),c=xp({canvas:h,...t()}),l=c.destroy,c?.play?.()})});let f=u.useResize(()=>{l(),c=xp({canvas:h,...t()}),l=c.destroy,c?.play?.()});return Object.entries(a.buttons).forEach(([d,v])=>{let{method:y}=v;p.querySelector(`.${d}`)?.addEventListener("click",()=>c?.[y]())}),u.useFrame(()=>{"isMounted"in a&&(a.isMounted=!0)}),()=>{f(),l()}}),g`
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
                        ${Ak({buttons:a.buttons})}
                    </ul>
                    <canvas ${r("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var Ok={"js-async-timeline-play":{label:"play",method:"play"},"js-async-timeline-playReverse":{label:"play reverse",method:"playReverse"},"js-async-timeline-play-label":{label:"play from label",method:"playFromLabel"},"js-async-timeline-playReverse-label":{label:"play from label reverse",method:"playFromLabelReverse"},"js-async-timeline-pause":{label:"pause",method:"pause"},"js-async-timeline-resume":{label:"resume",method:"resume"},"js-async-timeline-revert-next":{label:"revert next",method:"revertNext"},"js-async-timeline-stop":{label:"stop",method:"stop"}},nx=m.createComponent({tag:"async-timeline",component:ox,props:{background:"",disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1,controlsActive:()=>({value:!1,type:Boolean}),buttons:()=>({value:Ok,type:"Any"})}});m.useComponent([nx]);var sx=async()=>{let{data:e}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"#caterpillarN2",nextRoute:"#animatedPatternN0?version=0&activeId=0",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <async-timeline
            ${m.staticProps({background:e})}
        ></async-timeline>
    </div>`};var ix=({letter_d:e,letter_p:t,letter_r:r,letter_r_shadow:o,letter_d_shadow:n,letter_p_shadow:s,letter_r_pieces:i,letter_d_pieces:a,letter_p_pieces:c,letter_r_fill:l,letter_d_fill:p,letter_p_fill:h})=>[{props:{id:0,depth:200,anchorPoint:"center",classList:"",animate:!0},children:[{props:{id:0,depth:100,offsetX:"-2",offsetY:"-2",anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:e}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:n}}},children:[]},{props:{id:0,depth:40,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:a}}},children:[]},{props:{id:0,depth:100,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:p}}},children:[]},{props:{id:0,depth:-100,initialDepth:-1,offsetX:"-10",anchorPoint:"right",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:r}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:o}}},children:[]},{props:{id:0,depth:20,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:i}}},children:[]},{props:{id:0,depth:30,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:l}}},children:[]}]},{props:{id:0,depth:100,initialDepth:0,anchorPoint:"left",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:t}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:s}}},children:[]},{props:{id:0,depth:20,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:c}}},children:[]},{props:{id:0,depth:30,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:h}}},children:[]}]}]}]}];m.useComponent([Zn,es,Vc]);var ax=async()=>{let{data:e}=await oe({source:"./asset/svg/rdp.svg?v=0.4"}),{data:t}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"}),[r,o,n,s,i,a,c,l,p,h,f,d]=["letter_d","letter_r","letter_p","letter_r_shadow","letter_d_shadow","letter_p_shadow","letter_r_pieces","letter_d_pieces","letter_p_pieces","letter_r_fill","letter_d_fill","letter_p_fill"].map(v=>bo({svg:e,id:v}));return Se({active:!0,prevRoute:"",nextRoute:"#mob-01",backRoute:"#svg-overview"}),g`<div class="l-rdp-01">
        <div class="background-shape">${t}</div>
        <mouse-trail></mouse-trail>
        <move-3d
            ${m.staticProps({shape:ix({letter_d:r,letter_r:o,letter_p:n,letter_r_shadow:s,letter_d_shadow:i,letter_p_shadow:a,letter_r_pieces:c,letter_d_pieces:l,letter_p_pieces:p,letter_r_fill:h,letter_d_fill:f,letter_p_fill:d}),xDepth:100,yDepth:30,factor:20,xLimit:10,yLimit:20,drag:!0,perspective:1e3})}
        ></move-3d>
    </div>`};var cx=({screenElement:e,scrollerElement:t,layer02:r})=>{let o=Ke.createParallax({item:r,align:"center",range:8,propierties:"x",ease:!1}),n=new _t({screen:e,scroller:t,direction:"horizontal",drag:!0,useHorizontalScroll:!0,easeType:"spring",breakpoint:"small",children:[o]});return n.init(),n.set(55),{destroy:()=>{n.destroy(),o.destroy(),n=null,o=null}}};var lx=({getState:e,onMount:t,setRef:r,getRef:o})=>{let{layer02:n,layer03:s}=e();return t(()=>{let{screen:i,scroller:a,layer02:c}=o(),{destroy:l}=cx({screenElement:i,scrollerElement:a,layer02:c});return()=>{l()}}),g`<div class="mobbu2025">
        <div class="mobbu2025__screen" ${r("screen")}>
            <div class="mobbu2025__scroller" ${r("scroller")}>
                <div class="mobbu2025__layer">${s}</div>
                <div class="mobbu2025__layer" ${r("layer02")}>
                    ${n}
                </div>
            </div>
        </div>
    </div>`};var ux=m.createComponent({tag:"mobbu-2025",component:lx,props:{layer02:()=>({value:"",type:String}),layer03:()=>({value:"",type:String})}});m.useComponent([ux]);var px=async()=>{let{data:e}=await oe({source:"./asset/svg/lettering-mob-2025-pure-optimized.svg?v=0.3"}),{data:t}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.4"}),[r,o]=["layer-02","layer-03"].map(n=>bo({svg:e,id:n}));return Se({active:!0,prevRoute:"#mob-01",nextRoute:"",backRoute:"#svg-overview"}),g`<div class="l-mob-02">
        <div class="background-shape">${t}</div>
        <h3 class="l-mob-02__title">Scroll or Drag</h3>
        <mobbu-2025
            ${Ia({layer02:r,layer03:o})}
        ></mobbu-2025>
    </div>`};var mx="TOP-LEFT",hx="TOP-RIGHT",dx="BOTTOM-LEFT",fx="BOTTOM-RIGHT",gx="CENTER";var $k=e=>{let r=globalThis.getComputedStyle(e).transform;if(r==="none")return 0;let o=r.match(/matrix3d\(([^)]+)\)/);return o&&o[1].split(",").map(Number)[14]||0},bx=({align:e,root:t,child:r,containerClass:o,childrenClass:n,perspective:s,usePrespective:i,maxLowDepth:a=-200,maxHightDepth:c=200,onDepthChange:l=()=>{},depthFactor:p=30,hideThreshold:h=1})=>{let f=document.querySelector(o);f&&(f.style.cursor="grab");let d=[...f.querySelectorAll(n)],v=d.map(Z=>{let ye=window.innerWidth,ke=window.innerHeight,Ae=Z.offsetWidth,Ye=Z.offsetHeight,$e=$k(Z),Or=s-s*Ae/(ye*h)-$e,Lt=s-s*Ye/(ke*h)-$e;return Math.min(Or,Lt)}),y=()=>{d.forEach((Z,ye)=>{let ke=_>v[ye];Z.classList.toggle("hide",ke)})},T=0,S=0,_=0,w=0,x=0,E=r.offsetWidth,I=r.offsetHeight,P=t.offsetWidth,A=t.offsetHeight,$=(E-P)/2,N=(I-A)/2,R={x:0,y:0},O=!1,D=!1,k=30,L=()=>{if(i&&s>0){let Z=s/(s-_);$=(E-P/Z)/2,N=(I-A/Z)/2}else $=(E-P)/2,N=(I-A)/2};L();let C={xValue:0,yValue:0},M=U.createSpring({data:{x:0,y:0,z:0}});switch(e){case mx:{C={xValue:$,yValue:N},S=E,T=I;break}case hx:{C={xValue:-$,yValue:N},S=-E,T=I;break}case dx:{C={xValue:$,yValue:-N},S=E,T=-I;break}case fx:{C={xValue:-$,yValue:-N},S=-E,T=-I;break}}let B=M.subscribe(({x:Z,y:ye,z:ke})=>{r&&(r.style.transform=`translate3D(${Z}px, ${ye}px, ${ke}px)`)});M.set({x:C.xValue,y:C.yValue}),[...t.querySelectorAll("a, button")].forEach(Z=>{Z.setAttribute("draggable","false"),Z.style.userSelect="none"});let F=({page:Z})=>{O=!0,D=!0,R={x:Z.x,y:Z.y}},z=({page:Z})=>{let{x:ye,y:ke}=Z,{xgap:Ae,ygap:Ye}=O?D?(D=!1,{xgap:0,ygap:0}):{xgap:ye-w,ygap:ke-x}:{xgap:0,ygap:0},$e=$>0?ue.clamp(S+Ae,-$,$):ue.clamp(S+Ae,$,-$),Or=N>0?ue.clamp(T+Ye,-N,N):ue.clamp(T+Ye,N,-N),Lt=O?$e:S,Y=O?Or:T,{xComputed:$r,yComputed:Ve}=O?{xComputed:Lt,yComputed:Y}:{xComputed:ye,yComputed:ke};S=Lt,T=Y,w=ye,x=ke,O&&(C={xValue:$r,yValue:Ve},M.goTo({x:$r,y:Ve}).catch(()=>{}))},te=u.useTouchStart(({page:Z,target:ye})=>{F({page:Z,target:ye})}),ae=u.useMouseDown(({page:Z,target:ye})=>{F({page:Z,target:ye})}),q=u.useTouchEnd(()=>{O=!1}),ne=u.useMouseUp(()=>{O=!1}),re=u.useMouseMove(({page:Z})=>{z({page:Z})}),ce=u.useTouchMove(({page:Z})=>{z({page:Z})});f&&f.addEventListener("click",Z=>{let{x:ye,y:ke}=R,Ae=Math.abs(w-ye)>k,Ye=Math.abs(x-ke)>k;(Ae||Ye)&&Z.preventDefault()},!1),i&&f&&f.addEventListener("wheel",Z=>{let{spinY:ye}=u.normalizeWheel(Z);_=ue.clamp(_+ye*p,a,c),L(),S=$>0?ue.clamp(S,-$,$):ue.clamp(S,$,-$),T=N>0?ue.clamp(T,-N,N):ue.clamp(T,N,-N),l({depth:_}),M.goTo({x:S,y:T,z:_}).catch(()=>{})},{passive:!0});let Oe=u.useMouseWheel(u.useDebounce(()=>{y()},100)),Je=u.useResize(()=>{E=r.offsetWidth,I=r.offsetHeight,P=t.offsetWidth,A=t.offsetHeight,L()});return{destroy:()=>{B(),te(),q(),ae(),ne(),re(),ce(),Je(),Oe(),M.destroy(),M=null,f=null,d=null,t=null,r=null}}};var vx=({getProxi:e,setRef:t,getRef:r,bindEffect:o,onMount:n})=>{let s=e();return n(({element:i})=>{let{child:a}=r(),c=a.firstChild;if(!c)return;let l=bx({align:s.align,root:i,child:c,usePrespective:s.usePrespective,perspective:s.perspective,maxLowDepth:s.maxLowDepth,maxHightDepth:s.maxHightDepth,depthFactor:s.depthFactor,onDepthChange:s.onDepthChange,containerClass:s.containerClass,childrenClass:s.childrenClass,hideThreshold:s.hideThreshold});return s.afterInit({root:i}),()=>{l.destroy(),i.remove(),a.remove(),a=null,c=null,i=null}}),g`<div class="c-dragger ${s.rootClass}">
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
    </div>`};var yx=m.createComponent({tag:"c-dragger",component:vx,props:{rootClass:()=>({value:"",type:String}),childrenClass:()=>({value:"",type:String}),containerClass:()=>({value:"",type:String}),initialZoom:()=>({value:1,type:Number}),ease:()=>({value:!0,type:Boolean}),align:()=>({value:gx,type:String,transform:e=>e.toUpperCase()}),usePrespective:()=>({value:!0,type:Boolean}),perspective:()=>({value:600,type:Number}),hideThreshold:()=>({value:1,type:Number}),depthFactor:()=>({value:30,type:Number}),maxLowDepth:()=>({value:-200,type:Number}),maxHightDepth:()=>({value:200,type:Number}),afterInit:()=>({value:()=>{},type:Function}),onDepthChange:()=>({value:()=>{},type:Function})}});m.useComponent([yx,es]);var Tx=!1,_x=async()=>{let{data:e}=await oe({source:"./asset/svg/ms_nord_compact.svg?v=1.3"}),{data:t}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});Se({active:!0,prevRoute:"#move3D-shape1",nextRoute:"#math-animation-01",backRoute:"#plugin-overview"});let r=g`
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
            ${m.staticProps({rootClass:"dragger-component",containerClass:".l-dragger",childrenClass:".dragger-child",align:"CENTER",maxHightDepth:140,maxLowDepth:-200,perspective:300,hideThreshold:10,afterInit:({root:n})=>{Tx&&console.log(n)},onDepthChange:({depth:n})=>{Tx&&console.log(n)}})}
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
    </div>`};var Sx=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=(le(t)-100)/2,s=3,i=2*Math.PI*s,a=0,c=(n-a)/i,l=1e3*s,p=e.map(y=>le(y)/2),h=U.createSequencer({ease:"easeLinear",stagger:{each:6},data:{angleInRadian:0,scale:0}}).goTo({angleInRadian:i},{start:0,end:10,ease:"easeLinear"}).goTo({scale:1},{start:0,end:4,ease:"easeOutQuad"}).goTo({scale:0},{start:9,end:10,ease:"easeOutQuad"});e.forEach((y,T)=>{let S=y.firstChild;h.subscribeCache(({angleInRadian:_,scale:w})=>{let x=a+c*_,E=x*Math.cos(_),I=x*Math.sin(_);y.style.transform=`translate3D(0px,0px,0px) translate(${E-p[T]}px, ${I-p[T]}px)`,S&&(S.style.scale=`${w}`)})});let f=Me.createSyncTimeline({repeat:-1,yoyo:!1,duration:l}).add(h);function d(){if(!o||!r)return;let y=r.width/2,T=r.height/2,S=200;o.clearRect(0,0,r.width,r.height),o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let _=0;_<=S;_++){let w=i/S*_,x=a+c*w,E=y+x*Math.cos(w),I=T+x*Math.sin(w);_===0?o.moveTo(E,I):o.lineTo(E,I)}o.stroke()}let v=u.useResize(()=>{r.width=r.clientWidth,r.height=r.clientHeight,d()});return d(),{play:()=>{f.play()},resume:()=>{f.resume()},stop:()=>{f.pause()},destroy:()=>{f.stop(),h.destroy(),f.destroy(),v(),o=null,h=null,f=null,e=null}}};var xx=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=U.createSpring({stagger:{each:6},data:{x:0}}),s=.06,i=le(t)/2-100,a=e.map(d=>le(d)/2);e.forEach((d,v)=>{n.subscribeCache(({x:y})=>{let T=Math.sin(y*s)*i,S=Math.cos(y*s)*i;d.style.transform=`translate3D(0px,0px,0px) translate(${T-a[v]}px, ${S-a[v]}px)`})}),n.set({x:0});let c=0,l=!1,p=()=>{let d=60/u.getFps();c+=d,n&&(n.goTo({x:c}).catch(()=>{}),l&&u.useNextFrame(()=>p()))};function h(){if(!o||!r)return;r.width=r.width;let d=r.width/2,v=r.height/2;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath(),o.arc(d,v,Math.abs(i),0,2*Math.PI),o.stroke()}let f=u.useResize(()=>{h()});return h(),{play:()=>{l||(l=!0,p())},resume:()=>{l||(l=!0,p())},stop:()=>{l=!1},destroy:()=>{n.destroy(),f(),o=null,n=null,e=null,c=null,l=null}}};var Cx=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=e.map(d=>le(d)/2),s=je(t)/2-100,i=le(t),a=10,c=a/2/Math.PI,l=U.createSequencer({stagger:{each:5},data:{x:a/4,scale:0},duration:a}).goTo({x:a+a/4},{start:0,end:a,ease:"easeLinear"}).goTo({scale:1},{start:0,end:1.5,ease:"easeOutQuad"}).goTo({scale:0},{start:1.5,end:5,ease:"easeInQuad"}).goTo({scale:1},{start:5,end:8.5,ease:"easeOutQuad"}).goTo({scale:0},{start:8.5,end:10,ease:"easeInQuad"});e.forEach((d,v)=>{let y=d.firstChild;l.subscribeCache(({x:T,scale:S})=>{let _=T/c,w=2/(3-Math.cos(2*_)),x=w*Math.cos(_)*s,E=w*Math.sin(2*_)/2*i;d.style.transform=`translate3D(0px,0px,0px) translate(${x-n[v]}px, ${E-n[v]}px)`,y&&(y.style.scale=`${S}`)})});let p=Me.createSyncTimeline({repeat:-1,yoyo:!1,duration:3e3}).add(l);function h(){if(!o||!r)return;r.width=r.width;let d=r.width/2,v=r.height/2,y=200;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let T=0;T<=y;T++){let S=T/y*2*Math.PI,_=2/(3-Math.cos(2*S)),w=_*Math.cos(S)*s,x=_*Math.sin(2*S)/2*i;T===0?o.moveTo(d+w,v+x):o.lineTo(d+w,v+x)}o.stroke()}let f=u.useResize(()=>{h()});return h(),{play:()=>{p.play()},resume:()=>{p.resume()},stop:()=>{p.pause()},destroy:()=>{p.stop(),l.destroy(),p.destroy(),f(),o=null,l=null,p=null,e=null}}};function Lk(e,t,r,o=2e3){let n=0,s=e,i=0;for(let a=1;a<=o;a++){let c=r/o*a,l=e*Math.cos(t*c),p=l*Math.cos(c),h=l*Math.sin(c),f=p-s,d=h-i;n+=Math.hypot(f,d),s=p,i=h}return n}var Ex=(e,t)=>t===0?e:Ex(t,e%t);function Dk(e,t){let r=Ex(e,t),o=t/r;return 2*Math.PI*o}var wx=({targets:e,container:t,canvas:r}={},...o)=>{let[n,s,i,a]=o;if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let c=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let l=(le(t)-100)/2,p=n/s,h=Dk(n,s),f=Lk(l,p,h),d=i*(f/l),v=e.map(P=>le(P)/2),y=U.createSequencer({ease:"easeLinear",stagger:{each:a},data:{angleInRadian:0,scale:1}}).goTo({angleInRadian:h},{start:0,end:10,ease:"easeLinear"}),T=[],S=0,_=0;for(;_<h&&h>0&&p>0;)_=(Math.PI/2+S*Math.PI)/p,_>=0&&T.push(_),S++;let w=0;T.forEach(P=>{let A=P/h*10,$=Math.abs((A-w)/2);w=A;let N=Math.max(0,A-$),R=A,O=Math.min(10,A+$);O>N&&(y.goTo({scale:0},{start:N,end:R,ease:"easeInQuad"}),y.goTo({scale:1},{start:R,end:O,ease:"easeOutQuad"}))}),e.forEach((P,A)=>{let $=P.firstChild;y.subscribeCache(({angleInRadian:N,scale:R})=>{let O=l*Math.cos(p*N),D=O*Math.cos(N),k=O*Math.sin(N);P.style.transform=`translate3D(0px,0px,0px) translate(${D-v[A]}px, ${k-v[A]}px)`,$&&($.style.scale=`${R}`)})});let x=Me.createSyncTimeline({repeat:-1,yoyo:!1,duration:d}).add(y);function E(){if(!c||!r)return;let P=r.width/2,A=r.height/2,$=2e3*s;c.clearRect(0,0,r.width,r.height),c.setLineDash([3,7]),c.lineDashOffset=3,c.strokeStyle="rgba(0, 0, 0, 0.5)",c.lineWidth=1,c.beginPath();for(let N=0;N<=$;N++){let R=h/$*N,O=l*Math.cos(p*R),D=P+O*Math.cos(R),k=A+O*Math.sin(R);N===0?c.moveTo(D,k):c.lineTo(D,k)}c.stroke()}let I=u.useResize(()=>{r.width=r.clientWidth,r.height=r.clientHeight,E()});return E(),{play:()=>{x.play()},resume:()=>{x.resume()},stop:()=>{x.pause()},destroy:()=>{x.stop(),y.destroy(),x.destroy(),I(),c=null,y=null,x=null,e=null}}};var Ix=({targets:e,container:t,canvas:r}={})=>{if(!e||!t||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=je(t)-200,s=le(t)/3,i=2,a=n/(2*Math.PI*i),c=1500*i,l=e.map(v=>le(v)/2),p=U.createSequencer({ease:"easeLinear",stagger:{each:6},data:{x:0,scale:0}}).goTo({x:n},{start:0,end:10,ease:"easeLinear"}).goTo({scale:1},{start:0,end:10/i/2,ease:"easeOutQuad"}).goTo({scale:0},{start:10-10/i/2,end:10,ease:"easeOutQuad"});e.forEach((v,y)=>{let T=0,S=v.firstChild,_=-l[y]-n/2;p.subscribeCache(({x:w,scale:x})=>{let E=Math.sign(w-T)||1,I=Math.sin(w/a)*s*E;v.style.transform=`translate3D(0px,0px,0px) translate(${w+_}px, ${I-l[y]}px)`,S&&(S.style.scale=`${x}`),T=w})});let h=Me.createSyncTimeline({repeat:-1,yoyo:!0,duration:c}).add(p);function f(){if(!o||!r)return;r.width=r.width;let v=r.width/2,y=r.height/2,T=200,S=T*2;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let _=0;_<=S;_++){let{x:w,y:x}=(()=>{if(_<=T){let E=_/T*n,I=Math.sin(E/a)*s;return{x:E,y:I}}if(_>T){let I=(S-_)/T*n,P=Math.sin(I/a)*s*-1;return{x:I,y:P}}return{x:0,y:0}})();_===0?o.moveTo(v+w-n/2,y+x):o.lineTo(v+w-n/2,y+x)}o.stroke()}let d=u.useResize(()=>{f()});return f(),{play:()=>{h.play()},resume:()=>{h.resume()},stop:()=>{h.pause()},destroy:()=>{h.stop(),p.destroy(),h.destroy(),d(),o=null,p=null,h=null,e=null}}};var Cp={sin:Ix,circle:xx,infinite:Cx,archimede:Sx,rosaDiGrandi:wx};var Mx=()=>({play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}});var kx=({getProxi:e,setRef:t,getRef:r,getRefs:o,delegateEvents:n,onMount:s})=>{let i=e(),a=i.showNavigation?"active":"",c=3,l=c/i.numberOfStaggers,p=Array.from({length:i.numberOfStaggers}).map((T,S)=>({size:c-l*S,opacity:1/S})),h=Mx(),{destroy:f,play:d,stop:v,resume:y}=h;return s(({element:T})=>{let{target:S}=o(),{canvas:_}=r();u.useFrame(()=>{({destroy:f,play:d,stop:v,resume:y}=Cp[i.name]({targets:S,container:T,canvas:_},...i.args)),d()});let w=u.useResize(()=>{v(),f(),{destroy:f,play:d,stop:v,resume:y}=Cp[i.name]({targets:S,container:T,canvas:_},...i.args),d()});return()=>{f(),w(),f=null,d=null,v=null,y=null}}),g`<div class="c-math">
        <canvas class="c-math__canvas" ${t("canvas")}></canvas>
        <div class="c-math__nav ${a}">
            <button
                type="button"
                class="c-math__play"
                ${n({click:()=>{y()}})}
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
    </div>`};var Wc=m.createComponent({tag:"math-animation",component:kx,props:{name:()=>({value:"",type:String}),showNavigation:()=>({value:!0,type:Boolean}),numberOfStaggers:()=>({value:5,type:Number}),args:()=>({value:[],type:Array})}});m.useComponent([Wc]);var Rx=async({props:e})=>{let{names:t}=e;return t.length>4&&console.warn("math layout, max item excedded"),Se({active:!0,prevRoute:"#plugin-dragger",nextRoute:"#rosa-di-grandi",backRoute:"#plugin-overview"}),g`<div class="l-math">
        ${t.map(r=>g`<div class="l-math__item">
                    <math-animation
                        ${m.staticProps({name:r})}
                    ></math-animation>
                </div>`).join("")}
    </div>`};var Fk=({proxi:e,delegateEvents:t,bindObject:r})=>g`
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
    `,Nx=({getProxi:e,delegateEvents:t,invalidate:r,bindEffect:o,getRef:n,setRef:s,bindObject:i})=>{let a=e();return g`<div class="l-rosa">
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
            ${Fk({proxi:a,getRef:n,setRef:s,delegateEvents:t,bindObject:i})}
        </ul>
        <div class="l-rosa__wrap">
            ${r({observe:[()=>a.numerators,()=>a.denominator],render:()=>g`
                        <math-animation
                            ${m.staticProps({name:"rosaDiGrandi",showNavigation:!1,numberOfStaggers:10,args:[a.numerators,a.denominator,a.duration,a.staggerEach]})}
                        ></math-animation>
                    `})}
        </div>
    </div>`};var Px=m.createComponent({tag:"rosa-di-grandi-page",component:Nx,state:{numerators:()=>({value:2,type:Number}),denominator:()=>({value:3,type:Number}),numeratorsLabel:()=>({value:2,type:Number}),denominatorLabel:()=>({value:3,type:Number}),duration:()=>({value:500,type:Number}),staggerEach:()=>({value:4,type:Number}),controlsActive:()=>({value:!1,type:Boolean})},child:[Wc]});m.useComponent([Px]);var Ax=async()=>(Se({active:!0,prevRoute:"#math-animation-01",nextRoute:"",backRoute:"#plugin-overview"}),g`<rosa-di-grandi-page></rosa-di-grandi-page>`);var wp="home",zc="about",Q="template-mobJs-component",Ne="template-doc-default",ts="template-listing",lt="template-animation",vt="template-test",Hc=new Set([Q,Ne]),pe=[{url:"./#mobJs-overview",title:"mobJs"},{url:"./#mobJs-component",title:"component"}],Qe=[{url:"./#mobJs-overview",title:"mobJs"}],Ep=[{url:"./#mobCore-overview",title:"mobCore"}],cr=[{url:"./#mobMotion-overview",title:"mobMotion"}],jc=[{label:"store",url:"#mobCore-store"},{label:"events",url:"#mobCore-events"},{label:"defaults",url:"#mobCore-defaults"}],K=[{label:"initialization",url:"#mobJs-initialization"},{label:"component",url:"#mobJs-component"},{label:"routing",url:"#mobJs-routing"},{label:"tick",url:"#mobJs-tick"},{label:"memory management",url:"#mobJs-memory-management"},{label:"utils",url:"#mobJs-utils"},{label:"debug",url:"#mobJs-debug"}],qt=[{label:"tween/spring/lerp",url:"#mobMotion-tween-spring-lerp"},{label:"AsyncTimeline",url:"#mobMotion-async-timeline"},{label:"sequencer",url:"#mobMotion-sequencer"},{label:"SyncTimeline",url:"#mobMotion-sync-timeline"},{label:"CreateStagger",url:"#mobMotion-create-stagger"},{label:"ScrollTrigger",url:"#mobMotion-scrolltrigger"},{label:"Parallax",url:"#mobMotion-parallax"},{label:"Stagger",url:"#mobMotion-stagger"},{label:"Default",url:"#mobMotion-defaults"},{label:"Utils",url:"#mobMotion-utils"}],Uc=[{hash:"pageNotFound",layout:Hy,props:{}},{hash:"onlyDesktop",layout:rx,props:{}},{hash:"about",layout:ZT,templateName:zc,props:{}},{hash:"canvas-overview",layout:pc,templateName:ts,props:{source:"./data/canvas/data.json"}},{hash:"animatedPatternN0",layout:__,templateName:lt,props:{}},{hash:"animatedPatternN1",layout:C_,templateName:lt,props:{}},{hash:"caterpillarN1",layout:M_,templateName:lt,props:{}},{hash:"caterpillarN2",layout:P_,templateName:lt,props:{}},{hash:"async-timeline",layout:sx,templateName:lt,props:{}},{hash:"scrollerN0",layout:L_,templateName:lt,props:{}},{hash:"scrollerN1",layout:V_,templateName:lt,props:{}},{hash:"dynamic-list",layout:nS,templateName:vt,skipTransition:!0,props:{source:"./data/mob-js/general-repeat-test.json",breadCrumbs:Qe,title:"( test ) repeat & invalidate",section:"mobJs"}},{hash:"matrioska-repeat",layout:_S,templateName:vt,skipTransition:!0,props:{source:"./data/mob-js/matrioska.json",breadCrumbs:Qe,title:"( test ) matrioska repeat",section:"mobJs"}},{hash:"matrioska-invalidate",layout:SS,templateName:vt,skipTransition:!0,props:{source:"./data/mob-js/matrioska.json",breadCrumbs:Qe,title:"( test ) matrioska invalidate",section:"mobJs"}},{hash:"home",layout:cS,templateName:wp,props:{}},{hash:"mobCore-overview",layout:Be,skipTransition:!0,templateName:Ne,props:{source:"./data/mob-core/overview.json",title:"mobCore",breadCrumbs:[],section:"mobCore",rightSidebar:jc}},{hash:"mobCore-defaults",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-core/defaults.json",title:"Defaults",breadCrumbs:Ep,section:"mobCore",rightSidebar:jc}},{hash:"mobCore-events",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-core/events.json",title:"Events",breadCrumbs:Ep,section:"mobCore",rightSidebar:jc}},{hash:"mobCore-store",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-core/store.json",title:"Store",breadCrumbs:Ep,section:"mobCore",rightSidebar:jc}},{hash:"mobJs-overview",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/overview.json",title:"mobJs",breadCrumbs:[],section:"mobJs",rightSidebar:K}},{hash:"mobJs-initialization",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/initialization.json",title:"initialization",breadCrumbs:Qe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-component",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/component.json",title:"component",breadCrumbs:Qe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-routing",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/routing.json",title:"routing",breadCrumbs:Qe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-benchmark-invalidate",layout:Ar,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-invalidate",breadCrumbs:Qe,source:"./data/mob-js/benchmark-invalidate.json",title:"( test ) benchmark invalidate",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-key",layout:Ar,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-key",breadCrumbs:Qe,source:"./data/mob-js/benchmark-repeat-without-key.json",title:"( test ) benchmark repeat without key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key",layout:Ar,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key",breadCrumbs:Qe,source:"./data/mob-js/benchmark-repeat-key.json",title:"( test ) benchmark repeat key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-component-no-key",layout:Ar,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-component-no-key",breadCrumbs:Qe,source:"./data/mob-js/benchmark-repeat-no-component-no-key.json",title:"( test ) benchmark repeat no component no key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-component-with-key",layout:Ar,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-component-with-key",breadCrumbs:Qe,source:"./data/mob-js/benchmark-repeat-no-component-with-key.json",title:"( test ) benchmark repeat no component with key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-key-nested",layout:Ar,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key-no-nested",breadCrumbs:Qe,source:"./data/mob-js/benchmark-repeat-without-key-nested.json",title:"( test ) benchmark repeat nested without key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key-nested",layout:Ar,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key-nested",breadCrumbs:Qe,source:"./data/mob-js/benchmark-repeat-key-nested.json",title:"( test ) benchmark repeat nested with key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key-bind-store",layout:Ar,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-key-bind-store",breadCrumbs:Qe,source:"./data/mob-js/benchmark-repeat-external.json",title:"( test ) benchmark repeat bindStore",section:"mobJs"}},{hash:"mobJs-tick",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/tick.json",title:"tick",breadCrumbs:Qe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-utils",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/utils.json",title:"utils",breadCrumbs:Qe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-memory-management",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/memory-management.json",title:"memory management",breadCrumbs:Qe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-debug",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/debug.json",title:"debug",breadCrumbs:Qe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-onMount",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/on-mount.json",title:"onMount",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-getState",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/get-state.json",title:"getState",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-setState",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/set-state.json",title:"setState",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-updateState",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/update-state.json",title:"updateState",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-getProxi",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/get-proxi.json",title:"getProxi",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-watch",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/watch.json",title:"watch",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-staticProps",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/static-props.json",title:"staticProps",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-dataAttribute",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/data-attribute.json",title:"dataAttribute",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-bindProps",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/bind-props.json",title:"bindProps",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-bindEvents",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/bind-events.json",title:"bindEvents",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-delegateEvents",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/delegate-events.json",title:"delegateEvents",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-bindtext",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/bind-text.json",title:"bindText",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-bindObject",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/bind-object.json",title:"bindObject",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-bind-effect",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/bind-effect.json",title:"bindEffect",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-methods",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/methods.json",title:"add methods",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-useMethodByName",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/use-method-by-name.json",title:"useMethodByName",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-useMethodArrayByName",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/use-method-array-by-name.json",title:"useMethodArrayByName",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-setStateByName",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/set-state-by-name.json",title:"setStateByName",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-updateStateByName",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/update-state-by-name.json",title:"updateStateByName",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-refs",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/refs.json",title:"refs",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-runtime",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/runtime.json",title:"renderComponent",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-repeat",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/repeat.json",title:"repeat",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-invalidate",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/invalidate.json",title:"invalidate",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-invalidate-vs-repeater",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/invalidate-vs-repeater.json",title:"invalidate vs repeater",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-web-component",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/web-component.json",title:"webComponent",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-slot",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/slot.json",title:"slot",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-unBind",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/unbind.json",title:"unBind",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-emit",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/emit.json",title:"emit",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-emitAsync",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/emit-async.json",title:"emitAsync",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-computed",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/computed.json",title:"computed",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-bindStore",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/bind-store.json",title:"bindStore",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-removeDom",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/remove-dom.json",title:"removeDom",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-remove",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/remove.json",title:"remove",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-getChildren",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/get-children.json",title:"getChildren",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-freezeProp",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/freeze-prop.json",title:"freezeProp",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-unFreezeProp",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/unfreeze-prop.json",title:"unFreezeProp",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-getParentId",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/get-parent-id.json",title:"getParentId",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-watchParent",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/watch-parent.json",title:"watchParent",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-instanceName",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/instance-name.json",title:"instanceName",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-class-list",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/class-list.json",title:"classList",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobMotion-stagger",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/stagger.json",title:"Stagger",breadCrumbs:cr,section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-defaults",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/defaults.json",title:"Defaults",breadCrumbs:cr,section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-utils",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/utils.json",title:"Utils",breadCrumbs:cr,section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-overview",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/overview.json",title:"mobMotion",breadCrumbs:[],section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-parallax",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/parallax.json",title:"Parallax",breadCrumbs:cr,section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-sequencer",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/sequencer.json",title:"Sequencer",breadCrumbs:cr,section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-scrolltrigger",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/scroll-trigger.json",title:"ScrollTrigger",breadCrumbs:cr,section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-sync-timeline",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/sync-timeline.json",title:"Synctimeline",breadCrumbs:cr,section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-create-stagger",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/create-stagger.json",title:"CreateStagger",breadCrumbs:cr,section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-async-timeline",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/async-timeline.json",title:"Asynctimeline",breadCrumbs:cr,section:"mobMotion",rightSidebar:qt}},{hash:"mobMotion-tween-spring-lerp",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/tween-spring-lerp.json",title:"TimeTween Spring Lerp",breadCrumbs:cr,section:"mobMotion",rightSidebar:qt}},{hash:"horizontalScroller",layout:AS,templateName:lt,restoreScroll:!1,props:{source:"./data/plugin/horizontal-scroller.json",title:"HorizontalScroller"}},{hash:"move3D-shape1",templateName:lt,layout:HS,props:GS.shape1},{hash:"plugin-dragger",layout:_x,templateName:lt,props:{}},{hash:"math-animation-01",layout:Rx,templateName:lt,props:{names:["circle","sin","infinite","archimede"]}},{hash:"rosa-di-grandi",layout:Ax,templateName:lt,props:{}},{hash:"plugin-overview",layout:pc,templateName:ts,props:{source:"./data/plugin/data.json"}},{hash:"svg-overview",layout:pc,templateName:ts,props:{source:"./data/svg/data.json"}},{hash:"mob-01",layout:KS,templateName:lt,props:{}},{hash:"mob-02",layout:px,templateName:lt,props:{}},{hash:"rdp-01",layout:ax,templateName:lt,props:{}}];var Ox=0;m.beforeRouteChange(()=>{Ox=window.scrollY});var Bk=new Set([Q,Ne,ts,zc,vt]),Vk=new Set([Q,Ne,ts,zc,wp,vt]),$x=async({oldNode:e,oldTemplateName:t})=>{e.classList.remove("current-route"),e.classList.add("fake-content"),e.style.position="fixed",e.style.zIndex="10",e.style.top=Bk.has(t)?"var(--header-height)":"0",e.style.left=Vk.has(t)?"calc(var(--header-height)/2)":"0",e.style.right="0",e.style.transform=`translateY(-${Ox}px)`,e.style.minHeight="calc(100vh - var(--header-height) - var(--footer-height))"},Lx=async({oldNode:e,newNode:t,oldRoute:r,newRoute:o})=>{if(r===o)return;let n=m.getRoot();n.style.pointerEvents="none",t.style.opacity="0";let s=U.createTimeTween({data:{opacity:1},duration:200}),i=U.createTimeTween({data:{opacity:0},duration:300});s.subscribe(({opacity:c})=>{e.style.opacity=c}),i.subscribe(({opacity:c})=>{t.style.opacity=c});let a=Me.createAsyncTimeline({repeat:1}).createGroup({waitComplete:!0}).goTo(s,{opacity:0}).goTo(i,{opacity:1}).closeGroup();await a.play(),a.destroy(),a=null,t.style.removeProperty("opacity"),t.classList.add("current-route"),u.useFrameIndex(()=>{n.style.pointerEvents=""},10)};var Dx=()=>{let e=window.innerWidth-document.documentElement.clientWidth;document.documentElement.style.setProperty("--scrollbar-with",`${e}px`)},Fx=()=>{Dx(),u.useResize(()=>{Dx()})};var rs="reset",lr="tree",Ti="filter_component";var ur=({screen:e,scroller:t,scrollbar:r})=>{let o;return{init:()=>{o||(o=new _t({screen:e,scroller:t,direction:"vertical",drag:!0,scopedEvent:!1,breakpoint:"desktop",onTick:({percent:n})=>{r.value=`${n}`},afterRefresh:({shouldScroll:n})=>{r?.classList.toggle("hide-scrollbar",!n)}}),o.init())},destroy:()=>{o?.destroy(),o=null},refresh:()=>{o?.refresh()},updateScroller:()=>{if(!o)return;let n=le(t),s=le(e),i=je(r),a=s/n*i;r.style.setProperty("--thumb-width",`${a}px`),o?.refresh()},move:n=>{o&&o.move(n).catch(()=>{})},goToTop:()=>{o?.set(0)}}};var os=u.createStore({currentId:()=>({value:"",type:String})});var Bx=e=>e?[...e].reduce((t,r)=>`${t}.${r}`,""):"",Vx=e=>Object.keys(e).reduce((t,r)=>`${t} ${r},`,""),Wk=e=>Object.entries(e).map(([t,r])=>g`<div>
                <strong>${t}:</strong>
                ${r.map(o=>g`${o}, `).join(".")}
            </div>`).join(""),jk=e=>e?e.map(t=>`${t}, `).join(""):"",Wx=e=>Object.entries(e).map(([t,r])=>g`<div>
                <strong>${t}:</strong>
                ${JSON.stringify(r)}
            </div>`).join(""),zk=({getState:e})=>{let{id:t}=e();if(t===rs)return"";let r=m.componentMap.get(t);return r?g`<div>
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
        <div>${Wk(r?.child??{})}</div>

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
            ${jk(r?.freezedPros)}
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
    </div>`:"component not found"},Hk=({getRef:e})=>{let{screen:t,scroller:r,scrollbar:o}=e();o.addEventListener("input",()=>{c(o.value)});let n=ur({screen:t,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},jx=({onMount:e,addMethod:t,getState:r,invalidate:o,setRef:n,getRef:s,watch:i,getProxi:a,emit:c})=>{let l=a();t("updateId",h=>{l.id=h,os.set("currentId",h)}),t("refreshId",()=>{c(()=>l.id)});let p;return e(()=>{let{destroy:h,updateScroller:f,move:d,refresh:v}=Hk({getRef:s});return p=d,i(()=>l.id,async()=>{await m.tick(),v(),f(),p(0)}),()=>{h?.()}}),g`<div class="c-debug-component" ${n("screen")}>
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
            ${o({observe:()=>l.id,render:()=>zk({getState:r})})}
        </div>
    </div>`};var zx=m.createComponent({tag:"debug-component",component:jx,state:{id:()=>({value:rs,type:String,skipEqual:!1})}});var Hx=e=>{m.useMethodByName(yc)?.refreshList?.({testString:e})};var Ip=async(e="")=>{await m.tick(),Hx(e)},Ux=({onMount:e,setRef:t,getRef:r,delegateEvents:o})=>(e(()=>(Ip(),()=>{r()?.input.remove()})),g`<div class="c-debug-filter-head">
        <span class="c-debug-filter-head__title">Filter by tag</span>
        <input
            type="text"
            class="c-debug-filter-head__input"
            value=""
            ${t("input")}
            ${o({keydown:n=>{if(n.code.toLowerCase()==="enter"){n.preventDefault();let s=n.currentTarget.value;Ip(s)}}})}
        />
        <button
            class="c-debug-filter-head__button"
            type="button"
            ${o({click:()=>{let{input:n}=r(),s=n.value;Ip(s)}})}
        >
            find
        </button>
    </div>`);var Gx=m.createComponent({tag:"debug-filter-head",component:Ux});var Uk=async({getRef:e})=>{await m.tick();let{screen:t,scroller:r,scrollbar:o}=e(),n=ur({screen:t,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},qx=e=>`~${e}`,Gk=({testString:e})=>{let t=e.replaceAll("~","").split(" ").filter(r=>r!=="")??"";return(()=>{let r=[];for(let o of m.componentMap.values())t.every(s=>o.componentName.includes(s))&&r.push(o);return r})().map(({id:r,componentName:o,instanceName:n})=>({id:r,active:!1,tag:(()=>{let s=t.reduce((i,a,c)=>i.replaceAll(new RegExp(`(?<!~)${a.toLowerCase()}`,"g"),`${qx(c)}`),o);return t.reduce((i,a,c)=>i.replaceAll(`${qx(c)}`,`<span class="match-string">${a}</span>`),s)})(),name:n}))},Jx=({onMount:e,setRef:t,getRef:r,addMethod:o,repeat:n,staticProps:s,bindProps:i,bindEffect:a,getProxi:c,computed:l})=>{let p=c(),h=()=>{},f=()=>{},d=()=>{},v=()=>{};return l(()=>p.noResult,()=>p.data.length===0&&!p.isLoading),o("refreshList",async({testString:y})=>{p.isLoading=!0,await m.tick(),u.useNextTick(async()=>{p.data=Gk({testString:y}),await m.tick(),d?.(),v?.(),p.isLoading=!1})}),e(()=>{let{scrollbar:y}=r();return y.addEventListener("input",()=>{f(y.value)}),(async()=>({destroy:h,move:f,refresh:d,updateScroller:v}=await Uk({getRef:r})))(),()=>{h?.(),h=()=>{},d=()=>{},v=()=>{},f=()=>{}}}),g`
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
                    ${n({observe:()=>p.data,key:"id",useSync:!0,render:({sync:y,current:T})=>g`
                                <debug-filter-list-item
                                    ${s({id:T.value.id,name:T.value.name})}
                                    ${i(()=>({tag:T.value.tag}))}
                                    ${y()}
                                ></debug-filter-list-item>
                            `})}
                </div>
            </div>
        </div>
    `};var pr=e=>{m.useMethodByName(li)?.updateId(e)},Yx=()=>{m.useMethodByName(li)?.refreshId()};var Xx=({delegateEvents:e,bindText:t,bindEffect:r,getProxi:o,computed:n})=>{let s=o();return n(()=>s.active,()=>s.id===s.currentId),g`
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
                ${e({click:()=>{pr(s.id)}})}
            >
                [ > ]
            </button>
            <span
                class="c-debug-tree-item__selected"
                ${r({toggleClass:{active:()=>s.active}})}
            ></span>
        </div>
    `};var Kx=m.createComponent({tag:"debug-filter-list-item",component:Xx,bindStore:os,props:{id:()=>({value:"",type:String}),tag:()=>({value:"",type:String}),name:()=>({value:"",type:String})},state:{active:()=>({value:!1,type:Boolean})}});var Qx=m.createComponent({tag:"debug-filter-list",component:Jx,state:{data:()=>({value:[],type:Array}),isLoading:()=>({value:!0,type:Boolean}),noResult:()=>({value:!1,type:Boolean})},child:[Kx]});var Zx=({invalidate:e,getProxi:t})=>{let r=t();return g`<div class="c-debug-head">
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
                ${r({keydown:o=>{if(o.code.toLowerCase()==="enter"){o.preventDefault();let n=o.currentTarget.value;pr(n??"")}}})}
            />
            <button
                class="c-debug-search__button"
                type="button"
                ${r({click:()=>{let{id_input:o}=t(),n=o.value;pr(n??"")}})}
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
                ${r({keydown:o=>{if(o.code.toLowerCase()==="enter"){o.preventDefault();let n=o.currentTarget.value,s=m.getIdByInstanceName(n);pr(s??"")}}})}
            />
            <button
                class="c-debug-search__button"
                type="button"
                ${r({click:()=>{let{instance_input:o}=t(),n=o.value,s=m.getIdByInstanceName(n);pr(s??"")}})}
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
                    ${r({click:()=>{let{instance_input:o,id_input:n}=t();o.value="",n.value="",pr(rs)}})}
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
    </div>`;var t0=m.createComponent({tag:"debug-search",component:e0});var r0=m.createComponent({tag:"debug-head",component:Zx,props:{active:()=>({value:!1,type:Boolean})},state:{shouldUpdate:()=>({value:!0,type:Boolean,skipEqual:!1})},child:[t0]});var Gc=()=>{m.mainStore.debugStore(),console.log("componentMap",m.componentMap),console.log("Tree structure:",m.getTree()),console.log("bindEventMap",_n),console.log("currentListValueMap",Es),console.log("activeRepeatMap",Cn),console.log("onMountCallbackMap",Is),console.log("staticPropsMap",En),console.log("dynamicPropsMap",yt),console.log("eventDelegationMap",m.eventDelegationMap),console.log("tempDelegateEventMap",m.tempDelegateEventMap),console.log("invalidateIdHostMap",qr.size),console.log("invalidateIdsMap",tt),console.log("invalidateInstancesMap",Te),console.log("repeatIdHostMap",Hr),console.log("repeatIdsMap",rt),console.log("repeatInstancesMap",J),console.log("userChildPlaceholderSize",ld()),console.log("slotPlaceholderSize",ea()),console.log("bindTextPlaceholderMapSize",$d()),console.log("instanceMap",jr)};var o0=({delegateEvents:e,addMethod:t,bindProps:r,invalidate:o,bindEffect:n,getProxi:s,onMount:i})=>{let a=s();return t("toggle",()=>{a.active=!a.active}),i(()=>{let c=m.beforeRouteChange(()=>{a.active=!1,a.listType=lr});return()=>{c()}}),g`<div
        class="c-debug-overlay"
        ${n({toggleClass:{active:()=>a.active}})}
    >
        <button
            class="c-debug-overlay__background"
            type="button"
            ${e({click:()=>{a.active=!1,a.listType=lr}})}
        ></button>
        <button
            type="button"
            class="c-debug-overlay__close"
            ${e({click:()=>{a.active=!1,a.listType=lr}})}
        ></button>
        <div class="c-debug-overlay__grid">
            <button
                type="button"
                class="c-debug-overlay__log"
                ${e({click:()=>{Gc()}})}
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
                        ${o({observe:[()=>a.listType,()=>a.active],render:()=>a.listType===lr&&a.active?g`<div
                                        class="c-debug-overlay__list__title"
                                    >
                                        Tree structure
                                    </div>`:a.listType===Ti&&a.active?g`<debug-filter-head></debug-filter-head>`:""})}
                    </div>

                    <div class="c-debug-overlay__list__ctas">
                        <button
                            type="button"
                            class="c-debug-overlay__list__toggle"
                            ${e({click:()=>{a.listType=lr}})}
                            ${n({toggleClass:{active:()=>a.listType===lr}})}
                        >
                            Tree
                        </button>
                        <button
                            type="button"
                            class="c-debug-overlay__list__toggle"
                            ${e({click:()=>{a.listType=Ti}})}
                            ${n({toggleClass:{active:()=>a.listType===Ti}})}
                        >
                            Filter
                        </button>
                    </div>
                </div>
                <div>
                    ${o({observe:[()=>a.listType,()=>a.active],render:()=>a.listType===lr&&a.active?g`
                                    <debug-tree
                                        name="${_c}"
                                    ></debug-tree>
                                `:a.listType===Ti&&a.active?g`
                                    <debug-filter-list
                                        name="${yc}"
                                    ></debug-filter-list>
                                `:""})}
                </div>
            </div>
            <div class="c-debug-overlay__component">
                <debug-component name="${li}"></debug-component>
            </div>
        </div>
    </div>`};var qc=({data:e,staticProps:t})=>e.map(({id:r,componentName:o,instanceName:n,children:s})=>g`<debug-tree-item
                ${t({id:r,componentName:o,instanceName:n,children:s})}
            ></debug-tree-item>`).join("");var qk=async({getRef:e})=>{await m.tick();let{screen:t,scroller:r,scrollbar:o}=e(),n=ur({screen:t,scroller:r,scrollbar:o}),s=n.destroy,i=n.refresh,a=n.move,c=n.updateScroller;return n.init(),c(),a(0),{destroy:s,refresh:i,move:a,updateScroller:c}},n0=({onMount:e,invalidate:t,staticProps:r,setRef:o,getRef:n,addMethod:s,bindEffect:i,getProxi:a})=>{let c=a(),l=()=>{},p=()=>{},h=()=>{},f=()=>{};return e(()=>{let{scrollbar:d}=n();return d.addEventListener("input",()=>{f(d.value)}),s("refresh",()=>{p?.(),h?.()}),(async()=>(c.isLoading=!0,await m.tick(),l?.(),c.data=m.getTree(),{destroy:l,move:f,refresh:p,updateScroller:h}=await qk({getRef:n}),c.isLoading=!1))(),()=>{l?.(),l=()=>{},p=()=>{},h=()=>{},f=()=>{}}}),g`
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
                    ${t({observe:()=>c.data,render:()=>qc({data:c.data,staticProps:r})})}
                </div>
            </div>
        </div>
    `};var s0=()=>{m.useMethodByName(_c)?.refresh()};var Jk=e=>e>0?`( ${e} ) `:"",i0=({id:e,value:t})=>{let o=m.componentMap.get(e)?.child;if(!o)return!1;let n=Object.values(o).flat();return n.includes(t)?!0:n.some(i=>i0({id:i,value:t}))},a0=({onMount:e,staticProps:t,getRef:r,setRef:o,delegateEvents:n,watch:s,bindEffect:i,getProxi:a,computed:c})=>{let l=a(),p=l.children.length>0?"has-children":"";return c(()=>l.isActive,()=>l.id===l.currentId),c(()=>l.hasActiveChildren,()=>i0({id:l.id,value:l.currentId})),e(()=>{let{content:h}=r(),f=Pr.subscribe(h);return Pr.reset(h),s(()=>l.isOpen,async d=>{await Pr[d?"down":"up"](h),s0()}),()=>{f()}}),g`<div class="c-debug-tree-item">
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
            <span>${Jk(l.children.length)}</span>
            <button
                type="button"
                class="c-debug-tree-item__expand"
                ${n({click:()=>{pr(l.id)}})}
            >
                [ > ]
            </button>
            <span
                class="c-debug-tree-item__selected"
                ${i({toggleClass:{active:()=>l.isActive}})}
            ></span>
        </div>
        <div class="c-debug-tree-item__content" ${o("content")}>
            ${qc({data:l.children,staticProps:t})}
        </div>
    </div>`};var c0=m.createComponent({tag:"debug-tree-item",component:a0,bindStore:os,props:{id:()=>({value:"",type:String}),componentName:()=>({value:"",type:String}),instanceName:()=>({value:"",type:String}),children:()=>({value:[],type:Array})},state:{isOpen:()=>({value:!1,type:Boolean}),isActive:()=>({value:!1,type:Boolean}),hasActiveChildren:()=>({value:!1,type:Boolean})}});var l0=m.createComponent({tag:"debug-tree",component:n0,state:{data:()=>({value:[],type:Array}),isLoading:()=>({value:!1,type:Boolean})},child:[c0]});var u0=m.createComponent({tag:"debug-overlay",component:o0,state:{active:()=>({value:!1,type:Boolean}),listType:()=>({value:lr,type:String})},child:[l0,zx,r0,Gx,Qx]});var Mp=()=>{},Jc=()=>{},Yc=()=>{},Xc=()=>{},Yk=({staticProps:e,bindProps:t,proxi:r})=>r.data.map(o=>{let{label:n,url:s,isLabel:i}=o;return i?g`<p class="c-params-mobjs__label">${n}</p>`:g`<li>
                      <links-mobjs-button
                          ${e({label:n,url:s})}
                          ${t(()=>({active:r.activeSection===s}))}
                      ></links-mobjs-button>
                  </li>`}).join(""),p0=({staticProps:e,setRef:t,getRef:r,onMount:o,bindProps:n,invalidate:s,bindEffect:i,getProxi:a})=>{let c=ar(),l=a(),p={[Q]:c.sideBarLinks.mobJsComponentParams};return o(()=>{let{screenEl:h,scrollerEl:f,scrollbar:d}=r(),v=!1;d.addEventListener("input",()=>{Yc?.(d.value)}),ee.watch("navigationIsOpen",T=>{let{templateName:S}=m.getActiveRoute();S in p&&(l.shift=T)});let y=m.afterRouteChange(async({currentTemplate:T,currentRoute:S})=>{let _=p?.[T]??[];if(l.data=_,await m.tick(),l.activeSection=S,_.length>0){if(l.hide=!1,v){Xc();return}({init:Mp,destroy:Jc,move:Yc,updateScroller:Xc}=ur({screen:h,scroller:f,scrollbar:d})),v=!0,Mp(),Xc(),Yc(0)}_.length===0&&(l.hide=!0,Jc?.(),v=!1)});return()=>{Jc?.(),y(),Mp=()=>{},Jc=()=>{},Yc=()=>{},Xc=()=>{}}}),g`<div
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
            ${s({observe:()=>l.data,render:()=>Yk({staticProps:e,bindProps:n,proxi:l})})}
        </ul>
    </div>`};var m0=({getProxi:e,bindEffect:t})=>{let r=e();return g` <a
        href="./#${r.url}"
        ${t({toggleClass:{current:()=>r.active}})}
        ><span>${r.label}</span></a
    >`};var h0=m.createComponent({tag:"links-mobjs-button",component:m0,props:{label:()=>({value:"",type:String}),url:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean})}});var d0=m.createComponent({tag:"links-mobjs",component:p0,child:[h0],state:{data:()=>({value:[],type:Array}),activeSection:()=>({value:"",type:String}),hide:()=>({value:!0,type:Boolean}),shift:()=>({value:!1,type:Boolean})}});var f0=({getProxi:e,bindEffect:t,addMethod:r,setRef:o,getRef:n,onMount:s,watch:i})=>{let a=e();r("update",(l,p)=>{a[l]=p});let c=U.createTimeTween({data:{y:0,yContainer:100},duration:300,ease:"easeOutQuad"});return i(()=>a.currentLabelId,l=>{if(l===-1){c.goTo({yContainer:100});return}c.goTo({y:100/3*-l,yContainer:0})}),s(({element:l})=>{let{back:p,next:h,previous:f,labelList:d,labels:v}=n();return c.subscribe(({y,yContainer:T})=>{d.style.transform=`translateY(${y}%)`,v.style.transform=`translateY(${T}%)`}),l.addEventListener("mouseleave",()=>{a.currentLabelId=-1}),f.addEventListener("mouseenter",()=>{a.currentLabelId=0}),p.addEventListener("mouseenter",()=>{a.currentLabelId=1}),h.addEventListener("mouseenter",()=>{a.currentLabelId=2}),()=>{c.destroy(),c=null,f=null,p=null,h=null,d=null,v=null}}),g`<div
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
    </div>`};var g0=m.createComponent({tag:"quick-nav",component:f0,state:{active:()=>({value:!1,type:Boolean}),backRoute:()=>({value:"",type:String}),prevRoute:()=>({value:"",type:String}),nextRoute:()=>({value:"",type:String}),currentLabelId:()=>({value:-1,type:Number})}});var Xk=({proxi:e,bindEffect:t})=>e.data.map(({label:r,url:o})=>{let n=o.replaceAll("#","");return g`
                <li class="right-sidebar__item">
                    <a
                        href="${o}"
                        class="right-sidebar__link"
                        ${t({toggleClass:{active:()=>e.activeRoute.route===n}})}
                        >${r}</a
                    >
                </li>
            `}).join(""),b0=({getProxi:e,invalidate:t,addMethod:r,computed:o,bindEffect:n})=>{let s=e();return r("updateList",i=>{s.data=i}),m.afterRouteChange(({currentTemplate:i})=>{Hc.has(i)||(s.data=[])}),o(()=>s.isVisible,()=>s.data.length>0),g`<div
        class="right-sidebar"
        ${n({toggleClass:{visible:()=>s.isVisible}})}
    >
        <div class="right-sidebar__title">Sections:</div>
        <ul class="right-sidebar__list">
            ${t({observe:()=>s.data,render:()=>Xk({proxi:s,bindEffect:n})})}
        </ul>
    </div>`};var v0=m.createComponent({tag:"right-sidebar",component:b0,bindStore:[m.mainStore],state:{data:()=>({value:[],type:Array}),isVisible:()=>({value:!1,type:Boolean})}});var y0=({onMount:e,getProxi:t,bindEffect:r,addMethod:o})=>{let n=t();return o("skip",()=>{n.skip=!1}),e(({element:s})=>{n.isDisable=!0;let i=U.createTimeTween({data:{opacity:1,scale:1},duration:500});i.subscribe(({opacity:l,scale:p})=>{s.style.opacity=l,s.style.transform=`scale(${p})`});let a=m.beforeRouteChange(async()=>{n.skip||(n.isDisable=!1,await i.set({opacity:1}),i.goTo({scale:1}))}),c=m.afterRouteChange(async()=>{await i.goTo({opacity:0,scale:.9}).catch(()=>{}),n.isDisable=!0});return()=>{i.destroy(),i=null,a(),c()}}),g`
        <div
            class="c-loader center-viewport"
            ${r({toggleClass:{disable:()=>n.isDisable}})}
        >
            <span class="c-loader__inner"></span>
        </div>
    `};var T0=m.createComponent({tag:"route-loader",component:y0,state:{isLoading:()=>({value:!1,type:Boolean}),isDisable:()=>({value:!1,type:Boolean}),skip:()=>({value:!0,type:Boolean})}});var _0=({getProxi:e,bindEffect:t,addMethod:r})=>{let o=e();return r("update",n=>{o.active=n}),g`
        <h3
            class="c-scroller-down-label"
            ${t({toggleClass:{active:()=>o.active}})}
        >
            Scroll down
        </h3>
    `};var S0=m.createComponent({tag:"scroll-down-label",component:_0,state:{active:()=>({value:!1,type:Boolean})}});var x0=()=>{m.useMethodByName(Ho)?.setInputFocus()},kp=e=>{m.useMethodByName(Ho)?.updateCurrentSearchFromSuggestion(e)},C0=e=>{m.useMethodByName(Ho)?.shouldCloseSuggestion(e)},Kc=()=>{m.useMethodByName(Ho)?.closeSuggestion()};var E0=({proxi:e})=>{e.active=!1,Kc()},Kk=({target:e})=>{e&&C0(e)},w0=({getProxi:e,delegateEvents:t,bindEffect:r,addMethod:o,bindObject:n,staticProps:s})=>{let i=e();return o("toggle",()=>{i.active=!i.active}),g`<div
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
            ${t({click:a=>{Kk({target:a.target})}})}
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
                    name="${di}"
                ></search-overlay-list>
            </div>
        </div>
    </div>`};var I0=e=>{m.useMethodByName(di)?.update(e)},M0=()=>{m.useMethodByName(di)?.reset()};var Qk=async({currentSearch:e})=>{I0(e)},Rp=({getRef:e})=>{let{search_input:t}=e(),r=t.value;Qk({currentSearch:r})},k0=({getRef:e,proxi:t})=>{M0();let{search_input:r}=e();r.value="",t.suggestionListData=[]},R0=e=>`~${e}`,Zk=({currentSearch:e,proxi:t})=>{let o=ar().suggestion;e.length===0&&(t.suggestionListData=[]);let s=e.split(" ").slice(-1).join("").replaceAll("~","").split(" ").filter(i=>i!=="")??"";t.suggestionListData=(o.filter(({word:i})=>s.some(a=>i.toLowerCase().includes(a.toLowerCase())))??[]).map(({word:i})=>({word:i,wordHiglight:(()=>{let a=s.reduce((c,l,p)=>c.toLowerCase().replaceAll(new RegExp(`(?<!~)${l.toLowerCase()}`,"g"),`${R0(p)}`),i);return s.reduce((c,l,p)=>c.replaceAll(`${R0(p)}`,`<span class="match-string">${l}</span>`),a)})()}))},N0=({delegateEvents:e,getRef:t,setRef:r,getProxi:o,bindProps:n,addMethod:s,onMount:i,computed:a,bindEffect:c})=>{let l=o();return a(()=>l.suggestionListActive,()=>l.suggestionListData.length>0),i(()=>{let{search_input:p,suggestionElement:h}=t();s("updateCurrentSearchFromSuggestion",f=>{let v=p.value.split(" "),y=v.length===0?f:`${v.slice(0,-1).join(" ")} ${f}`;p.value=y.trimStart(),l.suggestionListData=[],p.focus()}),s("shouldCloseSuggestion",f=>{h!==f&&!h.contains(f)&&(l.suggestionListData=[])}),s("closeSuggestion",()=>{l.suggestionListData=[]}),s("setInputFocus",async()=>{setTimeout(()=>{p.focus()},300)})}),g`<div class="search-overlay-header">
        <div class="search-overlay-header__input-container">
            <input
                type="text"
                class="search-overlay-header__input"
                ${r("search_input")}
                ${e({keyup:u.useDebounce(p=>{if(p.code.toLowerCase()==="enter"){p.preventDefault(),Rp({getRef:t,proxi:l}),l.suggestionListData=[];return}if(p.code.toLowerCase()==="escape"){p.preventDefault(),l.suggestionListData=[];return}let h=p.currentTarget.value;Zk({currentSearch:h,proxi:l})},60)})}
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
            ${e({click:()=>{Rp({getRef:t,proxi:l})},keydown:p=>{p.code.toLowerCase()==="enter"&&Rp({getRef:t,proxi:l})}})}
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
    </div>`};var eR=({code:e,word:t})=>{if(e.toLowerCase()==="enter"){kp(t);return}if(e.toLowerCase()==="escape"){Kc();return}},A0=({getProxi:e,delegateEvents:t,bindObject:r})=>{let o=e();return g`
        <li class="search-overlay-suggestion__item">
            <button
                type="button"
                class="search-overlay-suggestion__button"
                ${t({click:()=>{kp(o.word)},keydown:n=>{n.preventDefault(),eR({code:n.code,word:o.word})}})}
            >
                ${r`${()=>o.wordHiglight}`}
            </button>
        </li>
    `};var O0=m.createComponent({tag:"search-overlay-suggestion-item",component:A0,props:{word:()=>({value:"",type:String}),wordHiglight:()=>({value:"",type:String})}});var $0=m.createComponent({tag:"search-overlay-suggestion",component:P0,props:{list:()=>({value:[],type:Array})},child:[O0]});var L0=m.createComponent({tag:"search-overlay-header",component:N0,state:{suggestionListActive:()=>({value:!1,type:Boolean}),suggestionListData:()=>({value:[],type:Array})},child:[$0]});var tR=async({source:e,uri:t,title:r,section:o,breadCrumbs:n})=>{let s=await fetch(e);return s.ok?{success:!0,data:(await s.json()).data,uri:t,title:r,section:o,breadCrumbs:n}:(console.warn(`${e} not found`),{success:!1,data:[{component:"",props:{}}],uri:t,title:r,section:o,breadCrumbs:[]})},rR=new Set(["mob-title","mob-paragraph","mob-list"]),oR=new Set(["mob-title","mob-paragraph"]),nR=new Set(["mob-list"]),D0=async({currentSearch:e=""})=>{let t=Uc.filter(({props:a})=>a?.source&&a?.title).map(({hash:a,props:c})=>({fn:tR({source:c.source??"",uri:a??"uri not forud",title:c.title??"title not found",section:c.section??"title not found",breadCrumbs:c.breadCrumbs??[]})})),r=await Promise.all(t.map(({fn:a})=>a)),o=[],n=r.filter(({success:a})=>a).map(({data:a,uri:c,title:l,section:p,breadCrumbs:h})=>{let v=a.reduce((y,T)=>{if(!T)return y;let{component:S}=T;return S?T.component==="html-content"?T?.props?.data?[...y,T.props.data]:y:[...y,T]:y},o).flat().filter(({component:y})=>rR.has(y)).flatMap(y=>oR.has(y?.component)?y.content:nR.has(y?.component)?y?.props?.links?y.props.items.map(({label:T})=>T):y.props.items:y);return{uri:c,title:l,section:p,breadCrumbs:h,data:v}}),s=e.split(" ");return n.filter(a=>{let c=a.data.join(" ");return s.every(l=>c.toLowerCase().includes(l.toLowerCase()))}).toSorted(a=>a.title.toLowerCase().includes(e.toLowerCase())?-1:1).map(({title:a,uri:c,section:l,breadCrumbs:p,data:h})=>{let f=h.join("").toLowerCase().split(e.toLowerCase()),d=p.length>0?p.reduce((v,y,T)=>{let S=T>0?"/":"";return`${v}${S}${y.title}`},""):a;return{title:a,uri:c,section:l,breadCrumbs:d,count:f?.length??0}})};var sR=({getRef:e})=>{let{screen:t,scroller:r,scrollbar:o}=e();o.addEventListener("input",()=>{c(o.value)});let n=ur({screen:t,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},F0=({getProxi:e,repeat:t,setRef:r,getRef:o,onMount:n,watch:s,addMethod:i,bindEffect:a,invalidate:c,bindProps:l})=>{let p=e();i("update",async f=>{p.loading||(p.loading=!0,p.noResult=!1,p.list=await D0({currentSearch:f}),p.loading=!1,p.noResult=p.list.length===0,p.updatePrentSearchKey(f))}),i("reset",()=>{p.updatePrentSearchKey(""),p.list=[]});let h;return n(()=>{let{destroy:f,updateScroller:d,move:v,refresh:y}=sR({getRef:o});return h=v,s(()=>p.list,async()=>{await m.tick(),y(),d(),h(0)}),()=>{f?.()}}),g`<div class="search-overlay-list" ${r("screen")}>
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
    </div>`};var Qc=()=>{m.useMethodByName(xc)?.toggle()};var iR=({uri:e})=>{m.loadUrl({url:e}),Qc()},B0=({getProxi:e,bindEffect:t,delegateEvents:r,bindObject:o})=>{let n=e();return g`
        <li
            class="search-overlay-list__item"
            ${t({toggleClass:{current:()=>n.active}})}
        >
            <button
                type="button"
                class="search-overlay-list__button"
                ${r({click:()=>{iR({uri:n.uri})}})}
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
    `;var H0=m.createComponent({tag:"test-scss-grid",component:z0});var vo=()=>{let{templateName:e}=m.getActiveRoute();return Hc.has(e)?0:40};var U0=()=>{m.useMethodByName(Tc)?.toggle()};var aR=["Alberto Navarro","Milan, Italy",'<a href="https://github.com/albnavarro/" target="_blank">[ github ]</a>','<a href="https://www.linkedin.com/in/alberto-navarro74/" target="_blank">[ linkedin ]</a>'],cR=()=>g`
        <ul class="l-footer__bio">
            ${aR.map(e=>g` <li class="l-footer__bio__item">${e}</li> `).join("")}
        </ul>
    `,G0=({delegateEvents:e,getProxi:t,onMount:r,bindEffect:o})=>{let n=t();return r(()=>{u.useFrameIndex(()=>{n.isMounted=!0},vo())}),g`
        <footer
            class="l-footer"
            ${o({toggleClass:{"is-visible":()=>n.isMounted}})}
        >
            <div class="l-footer__container">
                ${cR()}
                <div class="l-footer__debug">
                    <debug-button
                        class="c-button-debug"
                        ${e({click:()=>{U0()}})}
                    >
                        Debug App</debug-button
                    >
                    <debug-button
                        class="c-button-console"
                        ${e({click:()=>{Gc()}})}
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
    `;var J0=m.createComponent({tag:"debug-button",component:q0});var Y0=m.createComponent({tag:"mob-footer",component:G0,child:[J0],state:{isMounted:()=>({value:!1,type:Boolean})}});var Zc=()=>{m.useMethodByName(hi)?.scrollTop()},el=()=>{m.useMethodByName(hi)?.refresh()};var ns=({fireCallback:e=!0}={})=>{m.useMethodByName(Sc)?.closeAllAccordion({fireCallback:e})};function lR(){m.loadUrl({url:"home"}),ns(),ee.set("navigationIsOpen",!1),Zc()}var X0=({delegateEvents:e,bindEffect:t,getProxi:r,onMount:o,addMethod:n})=>{let s=r();return o(({element:i})=>{n("getHeaderHeight",()=>le(i)),u.useFrameIndex(()=>{s.isMounted=!0},vo())}),g`
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
                        ${e({click:()=>{lR()}})}
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
    `};var K0=({delegateEvents:e,bindEffect:t,getProxi:r,onMount:o})=>{let n=r();return o(()=>{u.useFrameIndex(()=>{n.isMounted=!0},vo())}),g`
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
    `};var Q0=m.createComponent({tag:"mob-header-toggle",component:K0,bindStore:ee,state:{isMounted:()=>({value:!1,type:Boolean})}});var uR=({event:e})=>{let t=e.target;console.log(t);let{url:r}=t?.dataset??"";m.loadUrl({url:r}),ee.set("navigationIsOpen",!1)};function pR({delegateEvents:e}){let t=ar().header,{links:r}=t,o={github:Gn().gitHubIcon};return r.map(n=>{let{svg:s,url:i,internal:a}=n;return g`<li class="l-header__sidenav__item">
                ${a?g`
                          <button
                              type="button"
                              data-url="${i}"
                              class="l-header__sidenav__link"
                              ${e({click:c=>{uR({event:c})}})}
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
                <search-cta></search-cta>
            </li>
            ${pR({delegateEvents:e})}
        </ul>
    `;var mR=()=>{Qc(),x0()},eC=({delegateEvents:e})=>{let t=Gn().searchIcons;return g`<button
        type="button"
        class="search-cta"
        ${e({click:()=>{mR()}})}
    >
        ${t}
    </button>`};var tC=m.createComponent({tag:"search-cta",component:eC});var rC=m.createComponent({tag:"mob-header-utils",component:Z0,child:[tC]});var hR=({delegateEvents:e,staticProps:t})=>ar().footer.nav.map(({label:o,url:n,section:s})=>g`<li class="header-main-menu__item">
                <header-main-menu-button
                    ${e({click:()=>{m.loadUrl({url:n}),ee.set("navigationIsOpen",!1)}})}
                    ${t({label:o,section:s})}
                ></header-main-menu-button>
            </li> `).join(""),oC=({delegateEvents:e,staticProps:t,getProxi:r,onMount:o,bindEffect:n})=>{let s=r();return o(()=>{u.useFrameIndex(()=>{"isMounted"in s&&(s.isMounted=!0)},10)}),g`
        <ul
            class="header-main-menu"
            ${n({toggleClass:{"is-visible":()=>s.isMounted}})}
        >
            ${hR({delegateEvents:e,staticProps:t})}
        </ul>
    `};var nC=({getProxi:e,bindEffect:t,computed:r})=>{let o=e();return r(()=>o.active,()=>o.section===o.activeNavigationSection),g`
        <button
            type="button"
            class="header-main-menu__button"
            ${t({toggleClass:{current:()=>o.active}})}
        >
            ${o.label}
        </button>
    `};var sC=m.createComponent({tag:"header-main-menu-button",component:nC,bindStore:ee,props:{label:()=>({value:"",type:String}),section:()=>({value:"",type:String})},state:{active:()=>({value:!1,type:Boolean})}});var iC=m.createComponent({tag:"header-main-menu",component:oC,child:[sC],state:{isMounted:()=>({value:!1,type:Boolean})}});var aC=m.createComponent({tag:"mob-header",component:X0,state:{isMounted:()=>({value:!1,type:Boolean})},child:[iC,rC,Q0]});var Np=0,cC=({root:e})=>{let t=e.querySelector(".l-navcontainer__wrap"),r=e.querySelector(".l-navcontainer__scroll"),o=e.querySelector(".l-navcontainer__percent"),n=200,s=new _t({screen:t,scroller:r,direction:"vertical",drag:!0,scopedEvent:!1,onUpdate:({percent:i})=>{let{navigationIsOpen:a}=ee.get();a&&(Np=Math.round(i)/100,o.style.transform=`translateZ(0) scaleX(${Np})`)}});return s.init(),ee.watch("activeNavigationSection",i=>{let a=document.querySelector(`[data-sectionname='${i}']`);if(!a)return;let c=document.querySelector(".l-header"),l=document.querySelector(".l-footer"),p=le(r),h=le(c),f=le(l),v=100*a.offsetTop/(p-window.innerHeight+h+f);setTimeout(()=>{ee.getProp("navigationIsOpen")||s.set(v)},400)}),ee.watch("navigationIsOpen",i=>{if(i){o.style.transform=`translateZ(0) scaleX(${Np})`;return}o.style.transform="translateZ(0) scaleX(0)"}),{scrollNativationToTop:()=>{setTimeout(()=>{s.move(0).catch(()=>{}),o.style.transform="translateZ(0) scaleX(0)"},n)},refreshScroller:()=>{s.refresh()}}};function dR({main:e,proxi:t}){t.isOpen=!1,u.useFrame(()=>{document.body.style.overflow="",e.classList.remove("shift")})}function fR({main:e,proxi:t}){el(),t.isOpen=!0,u.useFrame(()=>{document.body.style.overflow="hidden",e.classList.add("shift")})}function gR({main:e}){e.addEventListener("click",()=>{ee.set("navigationIsOpen",!1),Ut()})}var bR=()=>{Zc(),ns();let{navigationIsOpen:e}=ee.get();e||Nr.to(0)},lC=({onMount:e,addMethod:t,delegateEvents:r,bindEffect:o,getProxi:n})=>{let s=n();return e(({element:i})=>{let a=document.querySelector("main.main");ee.watch("navigationIsOpen",p=>{if(p&&a){fR({main:a,proxi:s});return}dR({main:a,proxi:s})}),gR({main:a});let{scrollNativationToTop:c,refreshScroller:l}=cC({root:i});return t("scrollTop",c),t("refresh",l),u.useFrameIndex(()=>{s.isMounted=!0},vo()),()=>{}}),g`
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
                    ${r({click:()=>{bR()}})}
                ></button>
            </div>
            <div class="l-navcontainer__wrap">
                <div class="l-navcontainer__scroll">
                    <mob-navigation
                        name="${Sc}"
                    ></mob-navigation>
                </div>
            </div>
        </div>
    `};function vR({data:e,staticProps:t,bindProps:r,proxi:o}){return e.map((n,s)=>{let{label:i,url:a,activeId:c,children:l,section:p,sectioName:h,scrollToSection:f,forceChildren:d,hide:v}=n;return p?g`
                    <mob-navigation-label
                        ${t({label:i,sectioName:h,hide:!!v})}
                    ></mob-navigation-label>
                `:l?g`
                      <mob-navigation-submenu
                          ${t({headerButton:{label:i,url:a,id:s},children:l,callback:({forceClose:y=!1})=>{if(y){o.currentAccordionId=-1;return}o.currentAccordionId=s}})}
                          ${r(()=>({isOpen:o.currentAccordionId===s}))}
                      >
                      </mob-navigation-submenu>
                  `:g`
                      <li class="l-navigation__item">
                          <mob-navigation-button
                              ${t({label:i,url:a,scrollToSection:f??"no-scroll",activeId:c??-1,forceChildren:d??[]})}
                          ></mob-navigation-button>
                      </li>
                  `}).join("")}var uC=({staticProps:e,setState:t,bindProps:r,addMethod:o,getProxi:n})=>{let s=n(),{navigation:i}=ar();return o("closeAllAccordion",({fireCallback:a=!0}={})=>{t(()=>s.currentAccordionId,-1,{emit:a})}),g`
        <nav class="l-navigation">
            <ul class="l-navigation__list">
                ${vR({data:i,staticProps:e,bindProps:r,proxi:s})}
            </ul>
        </nav>
    `};var pC=({bindEffect:e,getProxi:t})=>{let r=t();return g`
        <div
            class="l-navigation__label"
            data-sectionname="${r.sectioName}"
            ${e({toggleClass:{active:()=>r.sectioName===r.activeNavigationSection,hide:()=>!!r.hide}})}
        >
            ${r.label}
        </div>
    `};var mC=m.createComponent({tag:"mob-navigation-label",component:pC,bindStore:ee,props:{label:()=>({value:"",type:String}),sectioName:()=>({value:"",type:String}),hide:()=>({value:!1,type:Boolean})}});function yR({proxi:e,staticProps:t}){return e.children.map(r=>{let{label:o,url:n,scrollToSection:s,activeId:i}=r;return g`
                <li class="l-navigation__submenu__item">
                    <mob-navigation-button
                        ${t({label:o,url:n,subMenuClass:"l-navigation__link--submenu",scrollToSection:s,activeId:i??-1,callback:()=>{e.callback({forceClose:!1})}})}
                    ></mob-navigation-button>
                </li>
            `}).join("")}var hC=({onMount:e,staticProps:t,bindProps:r,watch:o,setRef:n,getRef:s,getProxi:i})=>{let a=i(),{label:c,url:l,activeId:p}=a.headerButton;return e(()=>{let{content:h}=s();return Pr.subscribe(h),Pr.reset(h),o(()=>a.isOpen,async f=>{await Pr[f?"down":"up"](h),el(),!f&&ns({fireCallback:!1})},{immediate:!0}),()=>{}}),g`
        <li class="l-navigation__item has-child">
            <mob-navigation-button
                ${t({label:c,url:l,arrowClass:"l-navigation__link--arrow",fireRoute:!1,activeId:p??-1,callback:()=>{a.callback({forceClose:a.isOpen})}})}
                ${r(()=>({isOpen:a.isOpen}))}
            ></mob-navigation-button>
            <ul class="l-navigation__submenu" ${n("content")}>
                ${yR({proxi:a,staticProps:t})}
            </ul>
        </li>
    `};var dC=({delegateEvents:e,getProxi:t,bindEffect:r})=>{let o=t(),{label:n,url:s,arrowClass:i,subMenuClass:a,fireRoute:c,callback:l,scrollToSection:p,activeId:h,forceChildren:f}=o;return m.afterRouteChange(({currentRoute:d})=>{u.useFrame(()=>{let y=s.split("?")?.[0]??"",T=m.getActiveParams(),S=h===-1||T?.activeId===`${h}`,_=d===y&&S,w=f.includes(d);o.isCurrent=_||w,_&&c&&(l(),ee.set("activeNavigationSection",p))})}),g`
        <button
            type="button"
            class="l-navigation__link  ${i} ${a}"
            ${e({click:()=>{l(),c&&(m.loadUrl({url:s}),ee.set("navigationIsOpen",!1))}})}
            ${r({toggleClass:{active:()=>o.isOpen,current:()=>o.isCurrent}})}
        >
            ${n}
        </button>
    `};var tl=m.createComponent({tag:"mob-navigation-button",component:dC,props:{label:()=>({value:"",type:String}),url:()=>({value:"",type:String}),arrowClass:()=>({value:"",type:String}),subMenuClass:()=>({value:"",type:String}),fireRoute:()=>({value:!0,type:Boolean}),callback:()=>({value:()=>{},type:Function}),isOpen:()=>({value:!1,type:Boolean}),scrollToSection:()=>({value:"",type:String}),activeId:()=>({value:-1,type:Number}),forceChildren:()=>({value:[],type:Array})},state:{isCurrent:()=>({value:!1,type:Boolean})}});var fC=m.createComponent({tag:"mob-navigation-submenu",component:hC,props:{callback:()=>({value:()=>{},type:Function}),headerButton:()=>({value:{},type:"Any"}),children:()=>({value:[],type:Array}),isOpen:()=>({value:!1,type:Boolean})},child:[tl]});var gC=m.createComponent({tag:"mob-navigation",component:uC,state:{currentAccordionId:()=>({value:-1,type:Number,skipEqual:!1})},child:[mC,fC,tl]});var bC=m.createComponent({tag:"mob-navigation-container",component:lC,child:[gC],state:{isOpen:()=>({value:!1,type:Boolean}),isMounted:()=>({value:!1,type:Boolean})}});m.useComponent([aC,bC,Y0,g0,T0,S0,d0,u0,H0,j0,v0]);var vC=async()=>g`
        ${""}
        <debug-overlay name="${Tc}"></debug-overlay>
        <mob-header name="${wT}"></mob-header>
        <mob-navigation-container
            name="${hi}"
        ></mob-navigation-container>
        <main class="main">
            <div class="container">
                <div class="inner-wrap">
                    <div id="content"></div>
                </div>
            </div>
        </main>
        <mob-footer> </mob-footer>
        <quick-nav name="${ui}"></quick-nav>
        <route-loader name="${Ec}"></route-loader>
        <scroll-down-label name="${pi}"></scroll-down-label>
        <links-mobjs></links-mobjs>
        <right-sidebar name="${Cc}"></right-sidebar>
        <search-overlay name="${xc}"></search-overlay>
    `;var Pp=0,Ap=document.querySelector(".js-main-loader-track"),yC=(e=60)=>{let t=()=>{if(Pp++,!Ap)return;let r=100*Pp/e;if(Ap.style.transform=`scaleX(${r/100})`,Pp>=e){Ap=null;return}u.useNextFrame(()=>{t()})};u.useFrame(()=>{t()})};var TC=e=>{m.useMethodByName(Ec).skip(e)};var _C=60,SC=()=>ue.mq("max","desktop"),TR=()=>{u.useResize(()=>{SC()&&m.loadUrl({url:"onlyDesktop"})})},ol=document.body.querySelector(".js-main-loader"),nl=document.body.querySelector(".js-main-loader-background"),rl=U.createTimeTween({data:{opacity:1},duration:1e3});ol&&nl&&[ol,nl].forEach(e=>{rl?.subscribe(({opacity:t})=>{e.style.opacity=t})});var _R=async()=>{await jy(),await zy(),yC(_C),await u.useFps({duration:_C,force:!0}),m.inizializeApp({rootId:"#root",contentId:"#content",wrapper:vC,routes:Uc,index:"home",pageNotFound:"pageNotFound",beforePageTransition:$x,pageTransition:Lx,afterInit:async()=>{await rl.goTo({opacity:0}),rl.destroy(),rl=null,ol?.remove(),nl?.remove(),ol=null,nl=null,Fx(),TR(),TC(!1)},redirect:({route:e})=>SC()?"onlyDesktop":e,restoreScroll:!0,componentDefaultProps:{scoped:!1,maxParseIteration:1e4,debug:!1}})};u.useLoad(()=>{Fy(),ue.setDefault({deferredNextTick:!0,throttle:100}),_R(),Dy()});})();
//# sourceMappingURL=main.js.map
