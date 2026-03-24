"use strict";(()=>{var EC=Object.create;var al=Object.defineProperty;var wC=Object.getOwnPropertyDescriptor;var IC=Object.getOwnPropertyNames;var MC=Object.getPrototypeOf,kC=Object.prototype.hasOwnProperty;var RC=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),To=(t,e)=>{for(var r in e)al(t,r,{get:e[r],enumerable:!0})},NC=(t,e,r,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of IC(e))!kC.call(t,n)&&n!==r&&al(t,n,{get:()=>e[n],enumerable:!(o=wC(e,n))||o.enumerable});return t};var PC=(t,e,r)=>(r=t!=null?EC(MC(t)):{},NC(e||!t||!t.__esModule?al(r,"default",{value:t,enumerable:!0}):r,t));var gT=RC((MJ,fT)=>{function oT(t){return t instanceof Map?t.clear=t.delete=t.set=function(){throw new Error("map is read-only")}:t instanceof Set&&(t.add=t.clear=t.delete=function(){throw new Error("set is read-only")}),Object.freeze(t),Object.getOwnPropertyNames(t).forEach(e=>{let r=t[e],o=typeof r;(o==="object"||o==="function")&&!Object.isFrozen(r)&&oT(r)}),t}var gc=class{constructor(e){e.data===void 0&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}};function nT(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function ho(t,...e){let r=Object.create(null);for(let o in t)r[o]=t[o];return e.forEach(function(o){for(let n in o)r[n]=o[n]}),r}var YI="</span>",Ky=t=>!!t.scope,XI=(t,{prefix:e})=>{if(t.startsWith("language:"))return t.replace("language:","language-");if(t.includes(".")){let r=t.split(".");return[`${e}${r.shift()}`,...r.map((o,n)=>`${o}${"_".repeat(n+1)}`)].join(" ")}return`${e}${t}`},tp=class{constructor(e,r){this.buffer="",this.classPrefix=r.classPrefix,e.walk(this)}addText(e){this.buffer+=nT(e)}openNode(e){if(!Ky(e))return;let r=XI(e.scope,{prefix:this.classPrefix});this.span(r)}closeNode(e){Ky(e)&&(this.buffer+=YI)}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}},Qy=(t={})=>{let e={children:[]};return Object.assign(e,t),e},rp=class t{constructor(){this.rootNode=Qy(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){let r=Qy({scope:e});this.add(r),this.stack.push(r)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,r){return typeof r=="string"?e.addText(r):r.children&&(e.openNode(r),r.children.forEach(o=>this._walk(e,o)),e.closeNode(r)),e}static _collapse(e){typeof e!="string"&&e.children&&(e.children.every(r=>typeof r=="string")?e.children=[e.children.join("")]:e.children.forEach(r=>{t._collapse(r)}))}},op=class extends rp{constructor(e){super(),this.options=e}addText(e){e!==""&&this.add(e)}startScope(e){this.openNode(e)}endScope(){this.closeNode()}__addSublanguage(e,r){let o=e.root;r&&(o.scope=`language:${r}`),this.add(o)}toHTML(){return new tp(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}};function ai(t){return t?typeof t=="string"?t:t.source:null}function sT(t){return zo("(?=",t,")")}function KI(t){return zo("(?:",t,")*")}function QI(t){return zo("(?:",t,")?")}function zo(...t){return t.map(r=>ai(r)).join("")}function ZI(t){let e=t[t.length-1];return typeof e=="object"&&e.constructor===Object?(t.splice(t.length-1,1),e):{}}function sp(...t){return"("+(ZI(t).capture?"":"?:")+t.map(o=>ai(o)).join("|")+")"}function iT(t){return new RegExp(t.toString()+"|").exec("").length-1}function eM(t,e){let r=t&&t.exec(e);return r&&r.index===0}var tM=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function ip(t,{joinWith:e}){let r=0;return t.map(o=>{r+=1;let n=r,s=ai(o),i="";for(;s.length>0;){let a=tM.exec(s);if(!a){i+=s;break}i+=s.substring(0,a.index),s=s.substring(a.index+a[0].length),a[0][0]==="\\"&&a[1]?i+="\\"+String(Number(a[1])+n):(i+=a[0],a[0]==="("&&r++)}return i}).map(o=>`(${o})`).join(e)}var rM=/\b\B/,aT="[a-zA-Z]\\w*",ap="[a-zA-Z_]\\w*",cT="\\b\\d+(\\.\\d+)?",lT="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",uT="\\b(0b[01]+)",oM="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",nM=(t={})=>{let e=/^#![ ]*\//;return t.binary&&(t.begin=zo(e,/.*\b/,t.binary,/\b.*/)),ho({scope:"meta",begin:e,end:/$/,relevance:0,"on:begin":(r,o)=>{r.index!==0&&o.ignoreMatch()}},t)},ci={begin:"\\\\[\\s\\S]",relevance:0},sM={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[ci]},iM={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[ci]},aM={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},vc=function(t,e,r={}){let o=ho({scope:"comment",begin:t,end:e,contains:[]},r);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});let n=sp("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:zo(/[ ]+/,"(",n,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},cM=vc("//","$"),lM=vc("/\\*","\\*/"),uM=vc("#","$"),pM={scope:"number",begin:cT,relevance:0},mM={scope:"number",begin:lT,relevance:0},hM={scope:"number",begin:uT,relevance:0},dM={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[ci,{begin:/\[/,end:/\]/,relevance:0,contains:[ci]}]},fM={scope:"title",begin:aT,relevance:0},gM={scope:"title",begin:ap,relevance:0},bM={begin:"\\.\\s*"+ap,relevance:0},vM=function(t){return Object.assign(t,{"on:begin":(e,r)=>{r.data._beginMatch=e[1]},"on:end":(e,r)=>{r.data._beginMatch!==e[1]&&r.ignoreMatch()}})},fc=Object.freeze({__proto__:null,APOS_STRING_MODE:sM,BACKSLASH_ESCAPE:ci,BINARY_NUMBER_MODE:hM,BINARY_NUMBER_RE:uT,COMMENT:vc,C_BLOCK_COMMENT_MODE:lM,C_LINE_COMMENT_MODE:cM,C_NUMBER_MODE:mM,C_NUMBER_RE:lT,END_SAME_AS_BEGIN:vM,HASH_COMMENT_MODE:uM,IDENT_RE:aT,MATCH_NOTHING_RE:rM,METHOD_GUARD:bM,NUMBER_MODE:pM,NUMBER_RE:cT,PHRASAL_WORDS_MODE:aM,QUOTE_STRING_MODE:iM,REGEXP_MODE:dM,RE_STARTERS_RE:oM,SHEBANG:nM,TITLE_MODE:fM,UNDERSCORE_IDENT_RE:ap,UNDERSCORE_TITLE_MODE:gM});function yM(t,e){t.input[t.index-1]==="."&&e.ignoreMatch()}function TM(t,e){t.className!==void 0&&(t.scope=t.className,delete t.className)}function _M(t,e){e&&t.beginKeywords&&(t.begin="\\b("+t.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",t.__beforeBegin=yM,t.keywords=t.keywords||t.beginKeywords,delete t.beginKeywords,t.relevance===void 0&&(t.relevance=0))}function SM(t,e){Array.isArray(t.illegal)&&(t.illegal=sp(...t.illegal))}function xM(t,e){if(t.match){if(t.begin||t.end)throw new Error("begin & end are not supported with match");t.begin=t.match,delete t.match}}function CM(t,e){t.relevance===void 0&&(t.relevance=1)}var EM=(t,e)=>{if(!t.beforeMatch)return;if(t.starts)throw new Error("beforeMatch cannot be used with starts");let r=Object.assign({},t);Object.keys(t).forEach(o=>{delete t[o]}),t.keywords=r.keywords,t.begin=zo(r.beforeMatch,sT(r.begin)),t.starts={relevance:0,contains:[Object.assign(r,{endsParent:!0})]},t.relevance=0,delete r.beforeMatch},wM=["of","and","for","in","not","or","if","then","parent","list","value"],IM="keyword";function pT(t,e,r=IM){let o=Object.create(null);return typeof t=="string"?n(r,t.split(" ")):Array.isArray(t)?n(r,t):Object.keys(t).forEach(function(s){Object.assign(o,pT(t[s],e,s))}),o;function n(s,i){e&&(i=i.map(a=>a.toLowerCase())),i.forEach(function(a){let c=a.split("|");o[c[0]]=[s,MM(c[0],c[1])]})}}function MM(t,e){return e?Number(e):kM(t)?0:1}function kM(t){return wM.includes(t.toLowerCase())}var Zy={},jo=t=>{console.error(t)},eT=(t,...e)=>{console.log(`WARN: ${t}`,...e)},qn=(t,e)=>{Zy[`${t}/${e}`]||(console.log(`Deprecated as of ${t}. ${e}`),Zy[`${t}/${e}`]=!0)},bc=new Error;function mT(t,e,{key:r}){let o=0,n=t[r],s={},i={};for(let a=1;a<=e.length;a++)i[a+o]=n[a],s[a+o]=!0,o+=iT(e[a-1]);t[r]=i,t[r]._emit=s,t[r]._multi=!0}function RM(t){if(Array.isArray(t.begin)){if(t.skip||t.excludeBegin||t.returnBegin)throw jo("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),bc;if(typeof t.beginScope!="object"||t.beginScope===null)throw jo("beginScope must be object"),bc;mT(t,t.begin,{key:"beginScope"}),t.begin=ip(t.begin,{joinWith:""})}}function NM(t){if(Array.isArray(t.end)){if(t.skip||t.excludeEnd||t.returnEnd)throw jo("skip, excludeEnd, returnEnd not compatible with endScope: {}"),bc;if(typeof t.endScope!="object"||t.endScope===null)throw jo("endScope must be object"),bc;mT(t,t.end,{key:"endScope"}),t.end=ip(t.end,{joinWith:""})}}function PM(t){t.scope&&typeof t.scope=="object"&&t.scope!==null&&(t.beginScope=t.scope,delete t.scope)}function AM(t){PM(t),typeof t.beginScope=="string"&&(t.beginScope={_wrap:t.beginScope}),typeof t.endScope=="string"&&(t.endScope={_wrap:t.endScope}),RM(t),NM(t)}function OM(t){function e(i,a){return new RegExp(ai(i),"m"+(t.case_insensitive?"i":"")+(t.unicodeRegex?"u":"")+(a?"g":""))}class r{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(a,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,a]),this.matchAt+=iT(a)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);let a=this.regexes.map(c=>c[1]);this.matcherRe=e(ip(a,{joinWith:"|"}),!0),this.lastIndex=0}exec(a){this.matcherRe.lastIndex=this.lastIndex;let c=this.matcherRe.exec(a);if(!c)return null;let l=c.findIndex((h,f)=>f>0&&h!==void 0),p=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,p)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(a){if(this.multiRegexes[a])return this.multiRegexes[a];let c=new r;return this.rules.slice(a).forEach(([l,p])=>c.addRule(l,p)),c.compile(),this.multiRegexes[a]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(a,c){this.rules.push([a,c]),c.type==="begin"&&this.count++}exec(a){let c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(a);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){let p=this.getMatcher(0);p.lastIndex=this.lastIndex+1,l=p.exec(a)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function n(i){let a=new o;return i.contains.forEach(c=>a.addRule(c.begin,{rule:c,type:"begin"})),i.terminatorEnd&&a.addRule(i.terminatorEnd,{type:"end"}),i.illegal&&a.addRule(i.illegal,{type:"illegal"}),a}function s(i,a){let c=i;if(i.isCompiled)return c;[TM,xM,AM,EM].forEach(p=>p(i,a)),t.compilerExtensions.forEach(p=>p(i,a)),i.__beforeBegin=null,[_M,SM,CM].forEach(p=>p(i,a)),i.isCompiled=!0;let l=null;return typeof i.keywords=="object"&&i.keywords.$pattern&&(i.keywords=Object.assign({},i.keywords),l=i.keywords.$pattern,delete i.keywords.$pattern),l=l||/\w+/,i.keywords&&(i.keywords=pT(i.keywords,t.case_insensitive)),c.keywordPatternRe=e(l,!0),a&&(i.begin||(i.begin=/\B|\b/),c.beginRe=e(c.begin),!i.end&&!i.endsWithParent&&(i.end=/\B|\b/),i.end&&(c.endRe=e(c.end)),c.terminatorEnd=ai(c.end)||"",i.endsWithParent&&a.terminatorEnd&&(c.terminatorEnd+=(i.end?"|":"")+a.terminatorEnd)),i.illegal&&(c.illegalRe=e(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map(function(p){return $M(p==="self"?i:p)})),i.contains.forEach(function(p){s(p,c)}),i.starts&&s(i.starts,a),c.matcher=n(c),c}if(t.compilerExtensions||(t.compilerExtensions=[]),t.contains&&t.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return t.classNameAliases=ho(t.classNameAliases||{}),s(t)}function hT(t){return t?t.endsWithParent||hT(t.starts):!1}function $M(t){return t.variants&&!t.cachedVariants&&(t.cachedVariants=t.variants.map(function(e){return ho(t,{variants:null},e)})),t.cachedVariants?t.cachedVariants:hT(t)?ho(t,{starts:t.starts?ho(t.starts):null}):Object.isFrozen(t)?ho(t):t}var LM="11.11.1",np=class extends Error{constructor(e,r){super(e),this.name="HTMLInjectionError",this.html=r}},ep=nT,tT=ho,rT=Symbol("nomatch"),DM=7,dT=function(t){let e=Object.create(null),r=Object.create(null),o=[],n=!0,s="Could not find the language '{}', did you forget to load/include a language module?",i={disableAutodetect:!0,name:"Plain text",contains:[]},a={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:op};function c(C){return a.noHighlightRe.test(C)}function l(C){let M=C.className+" ";M+=C.parentNode?C.parentNode.className:"";let B=a.languageDetectRe.exec(M);if(B){let V=A(B[1]);return V||(eT(s.replace("{}",B[1])),eT("Falling back to no-highlight mode for this block.",C)),V?B[1]:"no-highlight"}return M.split(/\s+/).find(V=>c(V)||A(V))}function p(C,M,B){let V="",F="";typeof M=="object"?(V=C,B=M.ignoreIllegals,F=M.language):(qn("10.7.0","highlight(lang, code, ...args) has been deprecated."),qn("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),F=C,V=M),B===void 0&&(B=!0);let z={code:V,language:F};k("before:highlight",z);let te=z.result?z.result:h(z.language,z.code,B);return te.code=z.code,k("after:highlight",te),te}function h(C,M,B,V){let F=Object.create(null);function z(W,G){return W.keywords[G]}function te(){if(!Y.keywords){Ve.addText(xe);return}let W=0;Y.keywordPatternRe.lastIndex=0;let G=Y.keywordPatternRe.exec(xe),me="";for(;G;){me+=xe.substring(W,G.index);let Ce=$e.case_insensitive?G[0].toLowerCase():G[0],nt=z(Y,Ce);if(nt){let[mr,xC]=nt;if(Ve.addText(me),me="",F[Ce]=(F[Ce]||0)+1,F[Ce]<=DM&&(_i+=xC),mr.startsWith("_"))me+=G[0];else{let CC=$e.classNameAliases[mr]||mr;ne(G[0],CC)}}else me+=G[0];W=Y.keywordPatternRe.lastIndex,G=Y.keywordPatternRe.exec(xe)}me+=xe.substring(W),Ve.addText(me)}function ae(){if(xe==="")return;let W=null;if(typeof Y.subLanguage=="string"){if(!e[Y.subLanguage]){Ve.addText(xe);return}W=h(Y.subLanguage,xe,!0,$r[Y.subLanguage]),$r[Y.subLanguage]=W._top}else W=d(xe,Y.subLanguage.length?Y.subLanguage:null);Y.relevance>0&&(_i+=W.relevance),Ve.__addSublanguage(W._emitter,W.language)}function q(){Y.subLanguage!=null?ae():te(),xe=""}function ne(W,G){W!==""&&(Ve.startScope(G),Ve.addText(W),Ve.endScope())}function re(W,G){let me=1,Ce=G.length-1;for(;me<=Ce;){if(!W._emit[me]){me++;continue}let nt=$e.classNameAliases[W[me]]||W[me],mr=G[me];nt?ne(mr,nt):(xe=mr,te(),xe=""),me++}}function ce(W,G){return W.scope&&typeof W.scope=="string"&&Ve.openNode($e.classNameAliases[W.scope]||W.scope),W.beginScope&&(W.beginScope._wrap?(ne(xe,$e.classNameAliases[W.beginScope._wrap]||W.beginScope._wrap),xe=""):W.beginScope._multi&&(re(W.beginScope,G),xe="")),Y=Object.create(W,{parent:{value:Y}}),Y}function Oe(W,G,me){let Ce=eM(W.endRe,me);if(Ce){if(W["on:end"]){let nt=new gc(W);W["on:end"](G,nt),nt.isMatchIgnored&&(Ce=!1)}if(Ce){for(;W.endsParent&&W.parent;)W=W.parent;return W}}if(W.endsWithParent)return Oe(W.parent,G,me)}function Je(W){return Y.matcher.regexIndex===0?(xe+=W[0],1):(il=!0,0)}function Z(W){let G=W[0],me=W.rule,Ce=new gc(me),nt=[me.__beforeBegin,me["on:begin"]];for(let mr of nt)if(mr&&(mr(W,Ce),Ce.isMatchIgnored))return Je(G);return me.skip?xe+=G:(me.excludeBegin&&(xe+=G),q(),!me.returnBegin&&!me.excludeBegin&&(xe=G)),ce(me,W),me.returnBegin?0:G.length}function ye(W){let G=W[0],me=M.substring(W.index),Ce=Oe(Y,W,me);if(!Ce)return rT;let nt=Y;Y.endScope&&Y.endScope._wrap?(q(),ne(G,Y.endScope._wrap)):Y.endScope&&Y.endScope._multi?(q(),re(Y.endScope,W)):nt.skip?xe+=G:(nt.returnEnd||nt.excludeEnd||(xe+=G),q(),nt.excludeEnd&&(xe=G));do Y.scope&&Ve.closeNode(),!Y.skip&&!Y.subLanguage&&(_i+=Y.relevance),Y=Y.parent;while(Y!==Ce.parent);return Ce.starts&&ce(Ce.starts,W),nt.returnEnd?0:G.length}function ke(){let W=[];for(let G=Y;G!==$e;G=G.parent)G.scope&&W.unshift(G.scope);W.forEach(G=>Ve.openNode(G))}let Ae={};function Ye(W,G){let me=G&&G[0];if(xe+=W,me==null)return q(),0;if(Ae.type==="begin"&&G.type==="end"&&Ae.index===G.index&&me===""){if(xe+=M.slice(G.index,G.index+1),!n){let Ce=new Error(`0 width match regex (${C})`);throw Ce.languageName=C,Ce.badRule=Ae.rule,Ce}return 1}if(Ae=G,G.type==="begin")return Z(G);if(G.type==="illegal"&&!B){let Ce=new Error('Illegal lexeme "'+me+'" for mode "'+(Y.scope||"<unnamed>")+'"');throw Ce.mode=Y,Ce}else if(G.type==="end"){let Ce=ye(G);if(Ce!==rT)return Ce}if(G.type==="illegal"&&me==="")return xe+=`
`,1;if(sl>1e5&&sl>G.index*3)throw new Error("potential infinite loop, way more iterations than matches");return xe+=me,me.length}let $e=A(C);if(!$e)throw jo(s.replace("{}",C)),new Error('Unknown language: "'+C+'"');let Or=OM($e),$t="",Y=V||Or,$r={},Ve=new a.__emitter(a);ke();let xe="",_i=0,yo=0,sl=0,il=!1;try{if($e.__emitTokens)$e.__emitTokens(M,Ve);else{for(Y.matcher.considerAll();;){sl++,il?il=!1:Y.matcher.considerAll(),Y.matcher.lastIndex=yo;let W=Y.matcher.exec(M);if(!W)break;let G=M.substring(yo,W.index),me=Ye(G,W);yo=W.index+me}Ye(M.substring(yo))}return Ve.finalize(),$t=Ve.toHTML(),{language:C,value:$t,relevance:_i,illegal:!1,_emitter:Ve,_top:Y}}catch(W){if(W.message&&W.message.includes("Illegal"))return{language:C,value:ep(M),illegal:!0,relevance:0,_illegalBy:{message:W.message,index:yo,context:M.slice(yo-100,yo+100),mode:W.mode,resultSoFar:$t},_emitter:Ve};if(n)return{language:C,value:ep(M),illegal:!1,relevance:0,errorRaised:W,_emitter:Ve,_top:Y};throw W}}function f(C){let M={value:ep(C),illegal:!1,relevance:0,_top:i,_emitter:new a.__emitter(a)};return M._emitter.addText(C),M}function d(C,M){M=M||a.languages||Object.keys(e);let B=f(C),V=M.filter(A).filter(N).map(q=>h(q,C,!1));V.unshift(B);let F=V.sort((q,ne)=>{if(q.relevance!==ne.relevance)return ne.relevance-q.relevance;if(q.language&&ne.language){if(A(q.language).supersetOf===ne.language)return 1;if(A(ne.language).supersetOf===q.language)return-1}return 0}),[z,te]=F,ae=z;return ae.secondBest=te,ae}function v(C,M,B){let V=M&&r[M]||B;C.classList.add("hljs"),C.classList.add(`language-${V}`)}function y(C){let M=null,B=l(C);if(c(B))return;if(k("before:highlightElement",{el:C,language:B}),C.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",C);return}if(C.children.length>0&&(a.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(C)),a.throwUnescapedHTML))throw new np("One of your code blocks includes unescaped HTML.",C.innerHTML);M=C;let V=M.textContent,F=B?p(V,{language:B,ignoreIllegals:!0}):d(V);C.innerHTML=F.value,C.dataset.highlighted="yes",v(C,B,F.language),C.result={language:F.language,re:F.relevance,relevance:F.relevance},F.secondBest&&(C.secondBest={language:F.secondBest.language,relevance:F.secondBest.relevance}),k("after:highlightElement",{el:C,result:F,text:V})}function T(C){a=tT(a,C)}let S=()=>{x(),qn("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function _(){x(),qn("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let w=!1;function x(){function C(){x()}if(document.readyState==="loading"){w||window.addEventListener("DOMContentLoaded",C,!1),w=!0;return}document.querySelectorAll(a.cssSelector).forEach(y)}function E(C,M){let B=null;try{B=M(t)}catch(V){if(jo("Language definition for '{}' could not be registered.".replace("{}",C)),n)jo(V);else throw V;B=i}B.name||(B.name=C),e[C]=B,B.rawDefinition=M.bind(null,t),B.aliases&&$(B.aliases,{languageName:C})}function I(C){delete e[C];for(let M of Object.keys(r))r[M]===C&&delete r[M]}function P(){return Object.keys(e)}function A(C){return C=(C||"").toLowerCase(),e[C]||e[r[C]]}function $(C,{languageName:M}){typeof C=="string"&&(C=[C]),C.forEach(B=>{r[B.toLowerCase()]=M})}function N(C){let M=A(C);return M&&!M.disableAutodetect}function R(C){C["before:highlightBlock"]&&!C["before:highlightElement"]&&(C["before:highlightElement"]=M=>{C["before:highlightBlock"](Object.assign({block:M.el},M))}),C["after:highlightBlock"]&&!C["after:highlightElement"]&&(C["after:highlightElement"]=M=>{C["after:highlightBlock"](Object.assign({block:M.el},M))})}function O(C){R(C),o.push(C)}function D(C){let M=o.indexOf(C);M!==-1&&o.splice(M,1)}function k(C,M){let B=C;o.forEach(function(V){V[B]&&V[B](M)})}function L(C){return qn("10.7.0","highlightBlock will be removed entirely in v12.0"),qn("10.7.0","Please use highlightElement now."),y(C)}Object.assign(t,{highlight:p,highlightAuto:d,highlightAll:x,highlightElement:y,highlightBlock:L,configure:T,initHighlighting:S,initHighlightingOnLoad:_,registerLanguage:E,unregisterLanguage:I,listLanguages:P,getLanguage:A,registerAliases:$,autoDetection:N,inherit:tT,addPlugin:O,removePlugin:D}),t.debugMode=function(){n=!1},t.safeMode=function(){n=!0},t.versionString=LM,t.regex={concat:zo,lookahead:sT,either:sp,optional:QI,anyNumberOfTimes:KI};for(let C in fc)typeof fc[C]=="object"&&oT(fc[C]);return Object.assign(t,fc),t},Jn=dT({});Jn.newInstance=()=>dT({});fT.exports=Jn;Jn.HighlightJS=Jn;Jn.default=Jn});var u={};To(u,{ANIMATION_STOP_REJECT:()=>_l,checkType:()=>Re,createStore:()=>DE,debounce:()=>_o,getFps:()=>BE,getInstantFps:()=>FE,getTime:()=>Lt,getTypeName:()=>is,getUnivoqueId:()=>we,mustMakeSomething:()=>VE,normalizeWheel:()=>ms,shouldMakeSomething:()=>WE,store:()=>gw,throttle:()=>Si,useCache:()=>JE,useDebounce:()=>_o,useFps:()=>GE,useFrame:()=>jE,useFrameIndex:()=>UE,useLinkedList:()=>bw,useLoad:()=>qE,useMouseClick:()=>KE,useMouseDown:()=>QE,useMouseMove:()=>ew,useMouseUp:()=>rw,useMouseWheel:()=>nw,useNextFrame:()=>HE,useNextLoop:()=>Dt,useNextTick:()=>zE,usePointerDown:()=>pw,usePointerLeave:()=>fw,usePointerMove:()=>mw,usePointerOut:()=>dw,usePointerOver:()=>uw,usePointerUp:()=>hw,useResize:()=>YE,useScroll:()=>sw,useScrollEnd:()=>lw,useScrollImmediate:()=>iw,useScrollStart:()=>cw,useScrollThrottle:()=>aw,useTouchEnd:()=>ow,useTouchMove:()=>tw,useTouchStart:()=>ZE,useVisibilityChange:()=>XE});var Lt=()=>typeof globalThis>"u"?Date.now():globalThis.performance.now(),Op=16.666666666666668;var Si=(t,e)=>{let r,o;return function(){let n=this,s=arguments;o?(clearTimeout(r),r=setTimeout(function(){Lt()-o>=e&&(t.apply(n,s),o=Lt())},e-(Lt()-o))):(t.apply(n,s),o=Lt())}};var _o=function(e,r=200){let o;return function(){let n=()=>Reflect.apply(e,this,arguments);clearTimeout(o),o=setTimeout(n,r)}};function le(t){if(!t)return 0;let e=t.offsetHeight,r=getComputedStyle(t);return e+=Number.parseInt(r.marginTop)+Number.parseInt(r.marginBottom),e}function je(t){if(!t)return 0;let e=t.offsetWidth,r=getComputedStyle(t);return e+=Number.parseInt(r.marginLeft)+Number.parseInt(r.marginRight),e}function be(t){if(!t)return{top:0,left:0};let e=t.getBoundingClientRect();return{top:e.top+window.scrollY,left:e.left+window.scrollY}}function St(t){return t?t.getBoundingClientRect():{bottom:0,height:0,left:0,right:0,top:0,width:0,x:0,y:0}}function ss(t,e){let r=e?.parentNode;for(;r;){if(r===t)return!0;r=r?.parentNode}return!1}function So(t){let e=globalThis.getComputedStyle(t),r=e.transform||e.mozTransform;if(r==="none"||r===void 0)return{x:0,y:0,z:0};let o=r.includes("3d")?"3d":"2d",n=r.match(/matrix.*\((.+)\)/)[1].split(", ");if(o==="2d")return{x:n[4],y:n[5],z:0};if(o==="3d")return{x:n[12],y:n[13],z:n[14]}}function cl(t){return typeof Node=="object"?t instanceof Node:t&&typeof t=="object"&&typeof t.nodeType=="number"&&typeof t.nodeName=="string"}var we=()=>`_${Math.random().toString(36).slice(2,9)}`;function $p(t){var e=t.getBoundingClientRect();return e.top>=0&&e.bottom<=window.innerHeight}var ll=(t,e,r)=>Math.min(Math.max(t,e),r);var xi=new Set,Dt=t=>{xi.add(t),xi.size===1&&setTimeout(()=>{xi.forEach(e=>{e()}),xi.clear()})};var ul="UNTYPED",Lp="STRING",Dp="NUMBER",Fp="OBJECT",Bp="FUNCTION",Ci="ARRAY",Vp="BOOLEAN",Wp="ELEMENT",jp="HTMLELEMENT",zp="NODELIST";var Ie={isString:t=>Object.prototype.toString.call(t)==="[object String]",isNumber:t=>Object.prototype.toString.call(t)==="[object Number]"&&Number.isFinite(t),isObject:t=>Object.prototype.toString.call(t)==="[object Object]",isFunction:t=>Object.prototype.toString.call(t)==="[object Function]",isArray:t=>Object.prototype.toString.call(t)==="[object Array]",isBoolean:t=>Object.prototype.toString.call(t)==="[object Boolean]",isElement:t=>t instanceof Element||t instanceof Document,isHTMLElement:t=>t instanceof HTMLElement,isSet:t=>t instanceof Set,isMap:t=>t instanceof Map,isNodeList:t=>Object.prototype.isPrototypeOf.call(NodeList.prototype,t)},is=t=>{switch(t){case String:case Lp:return"String";case Number:case Dp:return"Number";case Object:case Fp:return"Object";case Function:case Bp:return"Function";case Array:case Ci:return"Array";case Boolean:case Vp:return"Boolean";case Element:case Wp:return"Element";case HTMLElement:case jp:return"HTMLElement";case NodeList:case zp:return"NodeList";case Set:case"SET":return"Set";case Map:case"MAP":return"Map";case"ANY":return"ANY";default:return ul}},Re=(t,e)=>{switch(t){case String:case Lp:return Ie.isString(e);case Number:case Dp:return Ie.isNumber(e);case Object:case Fp:return Ie.isObject(e);case Function:case Bp:return Ie.isFunction(e);case Array:case Ci:return Ie.isArray(e);case Boolean:case Vp:return Ie.isBoolean(e);case Element:case Wp:return Ie.isElement(e);case HTMLElement:case jp:return Ie.isHTMLElement(e);case NodeList:case zp:return Ie.isNodeList(e);case Set:case"SET":return Ie.isSet(e);case Map:case"MAP":return Ie.isMap(e);case"ANY":return!0;default:return!0}};var $C=(t,e)=>t.size===e.size&&[...t.keys()].every(r=>t.get(r)===e.get(r)),LC=(t,e)=>t.size===e.size&&[...t].every(r=>e.has(r)),DC=(t,e)=>{if(t.length!==e.length)return!1;for(let[r,o]of t.entries())if(!as(o,e[r]))return!1;return!0},as=(t,e,r=new WeakMap)=>{if(t===e)return!0;if(t==null||e==null)return!1;let o=typeof t;if(o!==typeof e||o!=="object")return!1;if(r.has(t)&&r.get(t)?.has(e))return!0;r.has(t)||r.set(t,new WeakSet),r.get(t)?.add(e);let s=Array.isArray(t),i=Array.isArray(e);if(s!==i)return!1;if(s){if(t.length!==e.length)return!1;for(let[l,p]of t.entries())if(!as(p,e[l],r))return!1;return!0}if(t instanceof Date&&e instanceof Date)return t.getTime()===e.getTime();if(t instanceof Date||e instanceof Date)return!1;if(t instanceof RegExp&&e instanceof RegExp)return t.source===e.source&&t.flags===e.flags;if(t instanceof RegExp||e instanceof RegExp)return!1;if(t instanceof Map&&e instanceof Map){if(t.size!==e.size)return!1;for(let[l,p]of t)if(!e.has(l)||!as(p,e.get(l),r))return!1;return!0}if(t instanceof Map||e instanceof Map)return!1;if(t instanceof Set&&e instanceof Set){if(t.size!==e.size)return!1;for(let l of t)if(!e.has(l))return!1;return!0}if(t instanceof Set||e instanceof Set)return!1;let a=Object.keys(t),c=Object.keys(e);if(a.length!==c.length)return!1;for(let l of a)if(!Object.prototype.hasOwnProperty.call(e,l)||!as(t[l],e[l],r))return!1;return!0},Ei=(t,e,r)=>{switch(t){case"ANY":return as(e,r);case Ci:case Array:return DC(e,r);case"SET":case Set:return LC(e,r);case"MAP":case Map:return $C(e,r);default:return e===r}};var wi="UPDATE";var Pe={};To(Pe,{extractKeysFromArray:()=>hl,extractkeyFromProp:()=>Lr,getCurrentDependencies:()=>pl,getFirstCurrentDependencies:()=>ml,initializeCurrentDependencies:()=>cs,setCurrentDependencies:()=>Mi});var Go=[],Ii=!1,cs=()=>{Ii=!0,Go.length=0},pl=()=>(Ii=!1,[...Go]),ml=()=>(Ii=!1,[...Go]?.[0]??"missing_prop"),Mi=t=>{!Ii||!t||Go.includes(t)||(Go=[...Go,t])},Lr=t=>Re(String,t)?t:(cs(),t(),ml()),hl=t=>t.map(e=>Re(String,e)?e:(cs(),e(),ml()));var ls=new Map,Hp=t=>{ls.delete(t)},qo=({watcherByProp:t,prop:e,newValue:r,oldValue:o,validationValue:n,instanceId:s})=>{let i=t?.get(e);if(!(!i||i.size===0)){for(let{fn:a,wait:c}of i.values())if(c||a(r,o,n),s&&c){let l=ls.get(s)??new Map,p=!l.has(e),h=p?[]:l.get(e)?.callbacks??[],f=l.get(e);l.set(e,{newValue:r,oldValue:f?.oldValue??o,validationValue:n,callbacks:[...new Set([...h,a])]}),ls.set(s,l),p&&Dt(()=>{let d=ls.get(s),v=d?.get(e);if(v&&v.newValue!==void 0&&v.newValue!==null)for(let y of v.callbacks)y(v.newValue,v.oldValue,v.validationValue);d?.delete(e),d?.size===0&&ls.delete(s)})}}},Up=async({watcherByProp:t,prop:e,newValue:r,oldValue:o,validationValue:n})=>{let s=t?.get(e);if(!(!s||s.size===0))for(let{fn:i}of s.values())await i(r,o,n)};var FC="padding: 10px;",ze=()=>FC;var dl="store_shallow_copy",Gp=dl;var Ge=new Map,se=t=>{if(Gp===dl){let e=Ge.get(t);return e?{...e}:void 0}return Ge.get(t)},Le=(t,e)=>{Ge.set(t,e)},qp=t=>{Ge.delete(t)};var fl=(t,e)=>{console.warn(`%c MobStore supports an object with a depth of up to 2 levels, set 'Any' type to use obj as value, the input object has ${t} level`,e)};var Jp=(t,e)=>{console.warn(`%c MobStore, trying to execute set() method: store.${t} not exist`,e)},Yp=(t,e,r)=>{console.warn(`%c trying to execute setProp method on '${t}' propierties: setProp methods doesn't allow objects as value, ${JSON.stringify(e)} is an Object, use 'Any' type for custom object`,r)},Xp=(t,e)=>{console.warn(`%c trying to execute setProp method on '${t}' propierties: '${JSON.stringify(t)}' is an objects`,e)},Kp=(t,e,r,o)=>{console.warn(`%c trying to execute setProp method on '${t}' propierties: ${e} is not a ${is(r)}`,o)},Qp=(t,e,r)=>{console.warn(`%c trying to execute setObj method on '${t}' propierties: setObj methods allow only objects as value, ${e} is not an Object`,r)},Zp=(t,e)=>{console.warn(`%c trying to execute setObj data method on '${t}' propierties: store propierties '${t}' is not an object`,e)},em=(t,e,r)=>{console.warn(`%c trying to execute setObj data method: one of these keys '${t}' not exist in store.${e}`,r)},tm=(t,e,r)=>{console.warn(`%c trying to execute setObj data method on '${t}' propierties: '${JSON.stringify(e)}' have a depth > 1, nested obj is not allowed, use 'any' type for deep nested object`,r)},rm=(t,e,r,o,n)=>{console.warn(`%c trying to execute setObj data method on ${t}.${e} propierties: ${r} is not a ${is(o)}`,n)},om=(t,e)=>{console.warn(`%c trying to execute get data method: store.${t} not exist`,e)},gl=(t,e)=>{console.warn(`%c trying to execute set data method: store.${t} not exist`,e)},nm=(t,e)=>{console.warn(`%c one of the keys [${t}] is already used as a computed target, or there is a circular dependencies`,e)},sm=(t,e)=>{console.warn(`%c MobStore error: the property ${t} to watch doesn't exist in store`,e)},im=(t,e)=>{console.warn(`%c Validation Object error: validation function return undefined or have you used Object instead '${e}' ?`,t)};var am=(t,e)=>{console.warn(`%c MobStore error: the property ${t} should readOnly with proxi, maybe is a mobJs props.`,e)},bl=(t,e)=>{console.warn(`%c MobStore error: the property ${t} fail validation during definition.`,e)};var us=t=>{if(!Ie.isObject(t))return 0;let e=Object.values(t);return e.length===0?1:Math.max(...e.map(r=>us(r)))+1},cm=(t,e=!0)=>Object.fromEntries(Object.entries(t).map(([r,o])=>{if(Ie.isObject(o)&&e)return[r,cm(o,!1)];if(Ie.isFunction(o)){let n=o();if(Ie.isObject(n)&&"value"in n&&["validate","type","skipEqual","strict"].some(s=>s in n))return[r,n.value]}return[r,o]})),lm=(t,e,r,o=!0)=>Object.fromEntries(Object.entries(t).map(([n,s])=>{if(Ie.isObject(s)&&o)return[n,lm(s,e,r,!1)];if(Ie.isFunction(s)){let i=s();if(Ie.isObject(i)&&"value"in i&&e in i){let a=Ie.isString(i[e])?i[e].toUpperCase():i[e];return[n,a]}}return[n,r]})),um=({data:t,depth:e,logStyle:r})=>e>2?(fl(e,r),{}):cm(t),Jo=({data:t,prop:e,depth:r,logStyle:o,fallback:n})=>r>2?(fl(r,o),{}):lm(t,e,n),pm=({value:t})=>Re(Map,t)?new Map(t):Re(Set,t)?new Set(t):Re(Object,t)?{...t}:Re(Array,t)?[...t]:t,Dr=({instanceId:t,prop:e})=>{let r=se(t);if(!r)return!1;let{callBackComputed:o}=r,n=[...o].some(({prop:s})=>e===s);return n&&console.warn(`${e} is used as computed target, set and multiple computed on same prop is blocked.`),n};var BC=({instanceId:t,prop:e,val:r,fireCallback:o=!0,useStrict:n=!0,initalizeStep:s=!1})=>{let i=se(t);if(!i)return;let{type:a,fnTransformation:c,store:l,fnValidate:p,strict:h,validationStatusObject:f,skipEqual:d,watcherByProp:v,bindInstanceBy:y}=i,T=ze(),S=a[e]==="ANY";if(Ie.isObject(r)&&!S){Yp(e,r,T);return}if(Ie.isObject(l[e])&&!S){Xp(e,T);return}let _=l[e],w=c[e]?.(r,_)??r;if(!Re(a[e],w)){Kp(e,w,a[e],T);return}let E=p[e]?.(w,_);!E&&s&&bl(e,T),!(h[e]&&!E&&n||(f[e]=E,(d[e]?Ei(a[e],_,w):!1)&&!s))&&(l[e]=w,Le(t,{...i,store:l,validationStatusObject:f}),o&&!s&&(qo({watcherByProp:v,prop:e,newValue:w,oldValue:_,validationValue:f[e],instanceId:t}),hr({instanceId:t,prop:e}),y.forEach(P=>{hr({instanceId:P,prop:e})})))},VC=({instanceId:t,prop:e,val:r,fireCallback:o=!0,useStrict:n=!0,initalizeStep:s=!1})=>{let i=se(t);if(!i)return;let{store:a,type:c,strict:l,fnTransformation:p,fnValidate:h,validationStatusObject:f,skipEqual:d,watcherByProp:v,bindInstanceBy:y}=i,T=ze();if(!Ie.isObject(r)){Qp(e,r,T);return}if(!Ie.isObject(a[e])){Zp(e,T);return}let S=Object.keys(r),_=Object.keys(a[e]);if(!S.every(k=>_.includes(k))){em(S,e,T);return}let x=Object.fromEntries(Object.entries(r).map(k=>{let[L,C]=k,M=a[e][L];return!s&&Ei(c[e][L],C,M)?[L,C]:[L,p[e][L]?.(C,M)??C]}));if(!Object.entries(x).map(k=>{let[L,C]=k,M=Re(c[e][L],C);return M||rm(e,L,C,c[e][L],T),M}).every(k=>k===!0))return;let I=Object.entries(x).map(k=>{let[L,C]=k,M=a[e][L];return l[e][L]&&n?{strictCheck:h[e][L]?.(C,M),item:k}:{strictCheck:!0,item:k}}).filter(({strictCheck:k})=>k===!0);if(I.length===0)return;let A=Object.fromEntries(I.map(({item:k})=>k).map(([k,L])=>[k,L]));Object.entries(A).forEach(k=>{let[L,C]=k,M=a[e][L],B=h[e][L]?.(C,M);!B&&s&&bl(e,T),B===void 0&&im(T,"ANY"),f[e][L]=B});let $=a[e],N={...a[e],...A},R=Object.keys(A).every(k=>d[e][k]===!0),O=!0;for(let[k,L]of Object.entries(A)){let C=c[e][k]==="ANY";us(L)>1&&!C&&(tm(e,x,T),f[e][k]=!1,O=!1)}if(!O){Le(t,{...i,validationStatusObject:f});return}R&&Object.entries(N).every(([k,L])=>Ei(c[e][k],$[k],L))&&!s||(a[e]=N,Le(t,{...i,store:a,validationStatusObject:f}),o&&!s&&(qo({watcherByProp:v,prop:e,newValue:a[e],oldValue:$,validationValue:f[e],instanceId:t}),hr({instanceId:t,prop:e}),y.forEach(k=>{hr({instanceId:k,prop:e})})))},dr=({instanceId:t,prop:e,value:r,fireCallback:o=!0,clone:n=!1,useStrict:s=!0,action:i,initalizeStep:a=!1})=>{let c=se(t);if(!c)return;let{store:l,type:p}=c;if(!l)return;let h=ze();if(!(e in l)){Jp(e,h);return}let f=n?pm({value:l[e]}):l[e],d=i===wi?r(f):r,v=p[e]==="ANY";if(Ie.isObject(f)&&!v){VC({instanceId:t,prop:e,val:d,fireCallback:o,useStrict:s,initalizeStep:a});return}BC({instanceId:t,prop:e,val:d,fireCallback:o,useStrict:s,initalizeStep:a})},mm=({instanceId:t,prop:e,value:r})=>{let o=se(t);if(!o)return;let{store:n,watcherByProp:s}=o;if(!(e in n))return;let i=n[e];n[e]=r,Le(t,{...o,store:n}),qo({watcherByProp:s,prop:e,newValue:r,oldValue:i,validationValue:!0,instanceId:t})},hm=({store:t,bindInstance:e})=>e.reduce((r,o)=>{let n=se(o);if(!n)return r;let{store:s}=n;return{...r,...s}},t),WC=t=>{let e=se(t);if(!e)return;let{computedPropsQueque:r,callBackComputed:o,store:n,bindInstance:s}=e,i=[...o??[]].filter(({keys:l})=>[...r].find(p=>l.includes(p))),a=hm({store:n,bindInstance:s}),c=i.map(({prop:l,keys:p,fn:h})=>{let f=Object.fromEntries(p.map(d=>[d,a[d]]));return{prop:l,value:h(f)}});Le(t,{...e,computedPropsQueque:new Set,computedRunning:!1}),c.forEach(({prop:l,value:p})=>{dr({instanceId:t,prop:l,value:p,action:"SET"})})},hr=({instanceId:t,prop:e})=>{let r=se(t);if(!r)return;let{callBackComputed:o,computedPropsQueque:n,computedRunning:s}=r;if(!(!o||o.size===0)&&(n.add(e),Le(t,{...r,computedPropsQueque:n}),!s)){let i=se(t);if(!i)return;Le(t,{...i,computedRunning:!0}),Dt(()=>WC(t))}},jC=({instanceId:t,prop:e,keys:r,fn:o})=>{let n=se(t);if(!n)return;let{callBackComputed:s}=n,i=[...s].reduce((a,{prop:c,keys:l})=>l.includes(e)&&r.includes(c)&&!a,!1);if(r.includes(e)||i){nm(r,ze());return}s.add({prop:e,keys:r,fn:o}),Le(t,{...n,callBackComputed:s})},zC=({instanceId:t,prop:e,keys:r,callback:o})=>{let n=se(t);if(!n)return;let{store:s,bindInstance:i}=n,a=hm({store:s,bindInstance:i}),c=Object.fromEntries(r.map(p=>{if(p in a)return[p,a[p]]}).filter(p=>p!==void 0)),l=o(c);dr({instanceId:t,prop:e,value:l,fireCallback:!1,clone:!1,action:"SET"})},dm=({instanceId:t,prop:e,keys:r,callback:o})=>{if(Dr({instanceId:t,prop:e}))return;let s=r.length===0?(cs(),o({}),pl()):r;zC({instanceId:t,prop:e,keys:s,callback:o}),jC({instanceId:t,prop:e,keys:s,fn:o})};var fm=t=>{let{store:e}=t,r=Object.entries(e).reduce((o,n)=>{let[s,i]=n;return Ie.isObject(i)?{...o,[s]:{}}:o},{});return{...t,validationStatusObject:r}},gm=(t,e)=>{let{store:r}=e;Object.entries(r).forEach(o=>{let[n,s]=o;dr({instanceId:t,prop:n,value:s,fireCallback:!1,useStrict:!1,action:"SET",initalizeStep:!0})})};var HC=({state:t,prop:e,callback:r,wait:o})=>{let{store:n,watcherByProp:s,watcherMetadata:i}=t,a=ze();if(!n)return{state:void 0,unsubscribeId:""};if(!(e in n))return sm(e,a),{state:void 0,unsubscribeId:""};let c=we();return s.has(e)||s.set(e,new Map),s.get(e)?.set(c,{fn:r,wait:o}),i.set(c,e),{state:{...t,watcherByProp:s,watcherMetadata:i},unsubscribeId:c}},UC=({instanceId:t,unsubscribeId:e})=>{let r=se(t);if(!r)return;let{watcherByProp:o,watcherMetadata:n}=r;if(!o||!n)return;let s=n.get(e);s&&(o.get(s)?.delete(e),n.delete(e),o.get(s)?.size===0&&o.delete(s),Le(t,{...r,watcherByProp:o,watcherMetadata:n}))},bm=({instanceId:t,prop:e,callback:r,wait:o})=>{let n=se(t);if(!n)return()=>{};let{state:s,unsubscribeId:i}=HC({state:n,prop:e,callback:r,wait:o});return s?(Le(t,s),()=>{UC({instanceId:t,unsubscribeId:i})}):()=>{}},vm=({instanceId:t,prop:e,callback:r,wait:o})=>{let n=se(t);if(!n)return()=>{};let{bindInstance:s,unsubscribeBindInstance:i}=n;if(!s||s.length===0)return bm({instanceId:t,prop:e,callback:r,wait:o});let a=[t,...s].find(p=>{let h=se(p)?.store;return h&&e in h})??"",c=bm({instanceId:a,prop:e,callback:r,wait:o}),l=se(t);return l?(Le(t,{...l,unsubscribeBindInstance:[...i,c]}),()=>{c();let p=se(t);p&&Le(t,{...p,unsubscribeBindInstance:p.unsubscribeBindInstance.filter(h=>h!==c)})}):()=>{}};var ym=t=>{let e=us(t);return{watcherByProp:new Map,watcherMetadata:new Map,callBackComputed:new Set,computedPropsQueque:new Set,validationStatusObject:{},dataDepth:e,computedRunning:!1,store:um({data:t,depth:e,logStyle:ze()}),type:Jo({data:t,prop:"type",depth:e,logStyle:ze(),fallback:ul}),fnTransformation:Jo({data:t,prop:"transform",depth:e,logStyle:ze(),fallback:r=>r}),fnValidate:Jo({data:t,prop:"validate",depth:e,logStyle:ze(),fallback:()=>!0}),strict:Jo({data:t,prop:"strict",depth:e,logStyle:ze(),fallback:!1}),skipEqual:Jo({data:t,prop:"skipEqual",depth:e,logStyle:ze(),fallback:!0}),proxiObject:void 0,bindInstance:[],bindInstanceBy:[],unsubscribeBindInstance:[],proxiReadOnlyProp:new Set}};var Tm=t=>{let e=se(t);if(!e)return{};let{store:r}=e;return r??{}},Sm=t=>{let e=se(t);if(!e)return{};let{bindInstance:r}=e;return!r||r.length===0?Tm(t):Object.fromEntries([...r,t].flatMap(o=>Object.entries(Tm(o))))},_m=({instanceId:t,prop:e})=>{let r=se(t);if(!r)return;let o=r?.store;if(o&&e in o)return o[e];om(e,ze())},xm=({instanceId:t,prop:e})=>{let r=se(t);if(!r)return;let{bindInstance:o}=r;if(!o||o.length===0)return _m({instanceId:t,prop:e});let n=[t,...o].find(s=>{let i=Ge.get(s)?.store;return i&&e in i})??"";return _m({instanceId:n,prop:e})};var Cm=({instanceId:t,prop:e})=>{let r=se(t);if(!r)return;let{store:o,watcherByProp:n,validationStatusObject:s,bindInstanceBy:i}=r;o&&(e in o?(qo({watcherByProp:n,prop:e,newValue:o[e],oldValue:o[e],validationValue:s[e],instanceId:t}),hr({instanceId:t,prop:e}),i.forEach(a=>{hr({instanceId:a,prop:e})})):gl(e,ze()))},ki=({instanceId:t,prop:e})=>{let r=se(t);if(!r)return;let{bindInstance:o}=r;if(!o||o.length===0){Cm({instanceId:t,prop:e});return}let n=[t,...o].find(s=>{let i=Ge.get(s)?.store;return i&&e in i})??"";Cm({instanceId:n,prop:e})},Em=async({instanceId:t,prop:e})=>{let r=se(t);if(!r)return new Promise(a=>a({success:!1}));let{store:o,watcherByProp:n,validationStatusObject:s,bindInstanceBy:i}=r;return o?e in o?(await Up({watcherByProp:n,prop:e,newValue:o[e],oldValue:o[e],validationValue:s[e]}),hr({instanceId:t,prop:e}),i.forEach(a=>{hr({instanceId:a,prop:e})}),{success:!0}):(gl(e,ze()),{success:!1}):new Promise(a=>a({success:!1}))},wm=async({instanceId:t,prop:e})=>{let r=se(t);if(!r)return new Promise(s=>s(""));let{bindInstance:o}=r;if(!o||o.length===0)return Em({instanceId:t,prop:e});let n=[t,...o].find(s=>{let i=Ge.get(s)?.store;return i&&e in i})??"";return Em({instanceId:n,prop:e})};var Im=({instanceId:t})=>{let e=se(t);if(!e)return;let{validationStatusObject:r}=e;return r},Mm=({instanceId:t})=>{let e=se(t);if(!e)return;let{store:r}=e;console.log(r)},km=({instanceId:t})=>{let e=se(t);if(!e)return;let{validationStatusObject:r}=e;console.log(r)},Rm=({instanceId:t})=>{let e=se(t);console.log(e)};var GC=t=>!(t==null||!Re(Object,t)||Re(Map,t)||Re(Set,t)||Re(Function,t)),qC=t=>{let e=ze();return new Proxy({},{set(r,o,n){let s=Ge.get(t);if(!s||!(o in s.store))return!1;let i=Dr({instanceId:t,prop:o}),a=s.proxiReadOnlyProp.has(o);return a&&am(o,e),i||a?!1:(dr({instanceId:t,prop:o,value:n,fireCallback:!0,clone:!1,action:"SET"}),!0)},get(r,o){if(!Ge.has(t))return;let n=Ge.get(t);if(!n)return;let s;if(o in n.store&&(s=n.store[o],Mi(o)),!(o in n.store))for(let i of n.bindInstance){let a=Ge.get(i);if(a&&o in a.store){s=a.store[o],Mi(o);break}}if(s!==void 0)return GC(s)?Array.isArray(s)?Object.freeze([...s]):Object.freeze({...s}):s},has(r,o){if(!Ge.has(t))return!1;let n=Ge.get(t);if(!n)return!1;if(o in n.store)return!0;for(let s of n.bindInstance){let i=Ge.get(s);if(i&&o in i.store)return!0}return!1}})},Nm=({instanceId:t})=>{let e=Ge.get(t);if(!e)return{};if(e.proxiObject)return e.proxiObject;let r=qC(t);return Le(t,{...e,proxiObject:r}),r};var JC=({selfId:t,bindId:e})=>{let r=se(e);if(!r)return;let{bindInstanceBy:o}=r,n=[...o,t];Le(e,{...r,bindInstanceBy:n})},Pm=({selfId:t,bindId:e})=>{let r=se(e);if(!r)return;let{bindInstanceBy:o}=r,n=o.filter(s=>s!==t);Le(e,{...r,bindInstanceBy:n})},YC=({bindStores:t,selfStore:e})=>{let o=[...Re(Array,t)?t.map(n=>n.get()):[t.get()],e.store];o.forEach((n,s)=>{o.forEach((i,a)=>{if(s<=a)return;let c=Object.keys(n).filter(l=>Object.keys(i).includes(l));c.length>0&&console.warn(`bindStore: prop conflict on following prop: '${c}', bind store key must be univoque'`)})})},Am=({value:t,instanceId:e})=>{let r=se(e);if(!r)return;YC({bindStores:t,selfStore:r});let{bindInstance:o,bindInstanceBy:n}=r;if(!o)return;let s=Re(Array,t)?t.map(p=>p.getId()):[t.getId()],i=n.every(p=>!s.includes(p)),a=s.every(p=>!o.includes(p)),c=s.includes(e);if(!i||c){console.warn(`${e}, binding store failed, circular dependencies found.`);return}if(!a){console.warn(`${e}, binding store failed, store is binded more than once.`);return}let l=[...o,...s];Le(e,{...r,bindInstance:l}),s.forEach(p=>{JC({selfId:e,bindId:p})})};var Om=t=>{let e=Ge.get(t);if(!e)return;e.bindInstanceBy.length>0&&console.warn(`${t} store will be destroyed but is used by another store.`),e.callBackComputed.clear(),e.computedPropsQueque.clear(),e.watcherByProp.clear(),e.watcherMetadata.clear(),e.store={},e.proxiObject=null;let{unsubscribeBindInstance:r,bindInstance:o}=e;[...r].toReversed().forEach(n=>{n?.()}),e.unsubscribeBindInstance.length=0,o.forEach(n=>{Pm({selfId:t,bindId:n})}),Hp(t),qp(t)};var $m=({instanceId:t,values:e})=>{let r=se(t);if(!r)return;let{proxiReadOnlyProp:o}=r;e.forEach(n=>{o.add(n)}),Le(t,r)};var Ri=(t={})=>{let e=we(),r=ym(t),o=fm(r);return Le(e,o),gm(e,r),{getId:()=>e,bindStore:n=>{Am({value:n,instanceId:e})},get:()=>Sm(e),getProp:n=>xm({instanceId:e,prop:n}),set:(n,s,{emit:i=!0,usePropAsString:a=!1}={})=>{let c=a?n:Lr(n);Dr({instanceId:e,prop:c})||dr({instanceId:e,prop:c,value:s,fireCallback:i??!0,clone:!1,action:"SET"})},update:(n,s,{emit:i=!0,clone:a=!1,usePropAsString:c=!1}={})=>{let l=c?n:Lr(n);Dr({instanceId:e,prop:l})||dr({instanceId:e,prop:l,value:s,fireCallback:i??!0,clone:a,action:wi})},getProxi:()=>Nm({instanceId:e}),quickSetProp:(n,s)=>{Dr({instanceId:e,prop:n})||mm({instanceId:e,prop:n,value:s})},watch:(n,s,{wait:i=!1,immediate:a=!1}={})=>{let c=Lr(n),l=vm({instanceId:e,prop:c,callback:s,wait:i});return a&&Dt(()=>{ki({instanceId:e,prop:c})}),l},computed:(n,s,i=[],{usePropAsString:a=!1}={})=>{let c=a?n:Lr(n),l=hl(i);dm({instanceId:e,prop:c,keys:l,callback:s}),Dt(()=>{ki({instanceId:e,prop:c})})},emit:n=>{let s=Lr(n);ki({instanceId:e,prop:s})},emitAsync:async n=>{let s=Lr(n);return wm({instanceId:e,prop:s})},setProxiReadOnlyProp:n=>{$m({instanceId:e,values:n})},getValidation:()=>Im({instanceId:e}),debug:()=>{Rm({instanceId:e})},debugStore:()=>{Mm({instanceId:e})},debugValidate:()=>{km({instanceId:e})},destroy:()=>{Om(e)}}};var Ee=Ri({usePassive:()=>({value:!1,type:Boolean}),currentFrame:()=>({value:0,type:Number}),instantFps:()=>({value:60,type:Number}),requestFrame:()=>({value:()=>{},type:Function}),deferredNextTick:()=>({value:!0,type:Boolean}),throttle:()=>({value:60,type:Number}),spinYMaxValue:()=>({value:2.5,type:Number}),spinXMaxValue:()=>({value:2.5,type:Number})});var vl=!1,ps=new Map;function Lm(){if(ps.size===0){globalThis.removeEventListener("DOMContentLoaded",Lm),vl=!1;return}for(let t of ps.values())t();ps.clear()}function XC(){vl||(vl=!0,globalThis.addEventListener("DOMContentLoaded",Lm,{passive:!1}))}var KC=t=>{let e=we();return ps.set(e,t),typeof globalThis<"u"&&XC(),()=>ps.delete(e)},Dm=KC;function ms(t){let e=0,r=0,o=0,n=0;return"detail"in t&&(r=t.detail),"wheelDelta"in t&&(r=-t.wheelDelta/120),"wheelDeltaY"in t&&(r=-t.wheelDeltaY/120),"wheelDeltaX"in t&&(e=-t.wheelDeltaX/120),"axis"in t&&t.axis===t.HORIZONTAL_AXIS&&(e=r,r=0),o=e*10,n=r*10,"deltaY"in t&&(n=t.deltaY),"deltaX"in t&&(o=t.deltaX),(o||n)&&t.deltaMode&&(t.deltaMode==1?(o*=40,n*=40):(o*=800,n*=800)),o&&!e&&(e=o<1?-1:1),n&&!r&&(r=n<1?-1:1),{spinX:e,spinY:r,pixelX:o,pixelY:n}}function QC({type:t,event:e}){let r=e;return t==="touchend"&&"changedTouches"in e?r.changedTouches[0]:"touches"in r?r.touches[0]:e}function Br(t){let e=!1,r=new Map,{usePassive:o}=Ee.get();Ee.watch("usePassive",()=>{globalThis.removeEventListener(t,n),e=!1,s()});function n(a){if(r.size===0){globalThis.removeEventListener(t,n),e=!1;return}let c=a.type,{pageX:l,pageY:p,clientX:h,clientY:f}=QC({type:c,event:a}),d=a.target,v={page:{x:l,y:p},client:{x:h,y:f},target:d,type:c,preventDefault:()=>o?()=>{}:a.preventDefault(),spinX:0,spinY:0,pixelX:0,pixelY:0};if(c==="wheel"){let y=Ee.getProp("spinYMaxValue"),T=Ee.getProp("spinXMaxValue"),{spinX:S,spinY:_,pixelX:w,pixelY:x}=ms(a);v.spinX=ll(S,-T,T),v.spinY=ll(_,-y,y),v.pixelX=w,v.pixelY=x}for(let y of r.values())y(v)}function s(){e||(e=!0,o=Ee.getProp("usePassive"),globalThis.addEventListener(t,n,{passive:o}))}return a=>{if(globalThis.window===void 0)return()=>{};let c=we();return r.set(c,a),s(),()=>{r.delete(c),r.size===0&&e&&(globalThis.removeEventListener(t,n),e=!1)}}}var Fm=Br("click"),Bm=Br("mousedown"),Vm=Br("touchstart"),Wm=Br("mousemove"),jm=Br("touchmove"),zm=Br("mouseup"),Hm=Br("touchend"),Um=Br("wheel");var xo=0,Ze=new Map,ZC=(t=()=>{})=>{let e=we();return Ze.set(e,{fn:t,data:new Map,freeze:{active:!1,atFrame:0}}),{id:e,unsubscribe:()=>{if(Ze.has(e)){let r=Ze.get(e);if(!r)return;let o=r.data.size;if(Ze.delete(e),!o)return;xo=xo-o}}}},eE=({id:t,callBackObject:e,frame:r})=>{if(!Ze.has(t))return;let o=Math.max(r,0),{currentFrame:n}=Ee.get(),s=Ze.get(t);if(!s?.data)return;let{data:i}=s;i.has(o+n)||(i.set(o+n,e),xo++)},tE=t=>{Ze.has(t)&&Ze.delete(t)},rE=t=>{let e=Ze.get(t);if(!e||e.freeze.active)return;let{currentFrame:r}=Ee.get();e.freeze={active:!0,atFrame:r}},oE=({id:t,update:e=!0})=>{let r=Ze.get(t);if(!r||!r.freeze.active)return;if(!e){r.freeze={active:!1,atFrame:0};return}let{currentFrame:o}=Ee.get(),{atFrame:n}=r.freeze,s=[];for(let[i,a]of r.data){let c=i+o-n;r.data.delete(i),s.push({frame:c,value:a})}s.forEach(({frame:i,value:a})=>{r.data.set(i,a)}),s.length=0,r.freeze={active:!1,atFrame:0}},nE=t=>{let e=Ze.get(t);if(!e)return;let r=e.data.size;xo=xo-r,e.data.clear()},sE=t=>Ze.get(t)??{},iE=t=>{for(let e of Ze.values()){let{data:r,fn:o,freeze:n}=e,s=r.get(t);s&&!n.active&&(o(s),r.delete(t),xo--)}},aE=({id:t,obj:e={}})=>{if(!Ze.has(t))return;let r=Ze.get(t);if(!r)return;let{fn:o,freeze:n}=r;n.active||o(e)},cE=()=>xo,lE=t=>{for(let[e,r]of Ze){let{data:o,fn:n,freeze:s}=r,i=new Map;for(let[a,c]of o)i.set(a-t,c),o.delete(a);Ze.set(e,{data:i,fn:n,freeze:s.active?{...s,atFrame:s.atFrame-t}:s})}},Yo={add:ZC,get:sE,update:eE,remove:tE,clean:nE,fire:iE,fireObject:aE,getCacheCounter:cE,updateFrameId:lE,freeze:rE,unFreeze:oE};var yl=!1,Ni=new Map;function Gm(){if(Ni.size===0){globalThis.removeEventListener("visibilitychange",Gm),yl=!1;return}let t={visibilityState:document.visibilityState};for(let e of Ni.values())e(t)}function uE(){yl||(yl=!0,globalThis.addEventListener("visibilitychange",Gm,{passive:!1}))}var pE=t=>{let e=we();return Ni.set(e,t),typeof globalThis<"u"&&uE(),()=>Ni.delete(e)},Pi=pE;var hs=[],mE=(t=()=>{},e=100)=>{hs.push({cb:t,priority:e})},hE=({time:t,fps:e})=>{hs.length!==0&&(hs.sort((r,o)=>r.priority-o.priority),hs.forEach(({cb:r})=>r({time:t,fps:e})),hs.length=0)},xt={add:mE,fire:hE};var Tl=[],dE=t=>{Tl.push(t)},fE=()=>{let t=[...Tl];return Tl.length=0,t},Xo={add:dE,get:fE};var Vr=new Map,gE=t=>{let e=[...Vr.entries()];Vr.clear(),e.forEach(([r,o])=>{Vr.set(r-t,o)})},bE=({currentFrame:t,time:e,fps:r})=>{let o=Vr.get(t)??[];!o||o.length===0||(o.forEach(n=>n({time:e,fps:r})),Vr.delete(t))},vE=(t,e)=>{let o=Math.max(e,0)+Ee.getProp("currentFrame"),n=Vr.get(o)??[];Vr.set(o,[...n,t]),Ee.emit("requestFrame")},yE=()=>Vr.size,Ko={add:vE,fire:bE,updateKeys:gE,getAmountOfFrameToFire:yE};var _l="animationStop",qm=()=>{globalThis.addEventListener("unhandledrejection",t=>{t.reason===_l&&t.preventDefault()})};var Jm=!1,Ai=({force:t=!1,duration:e=30}={})=>{if(Jm&&!t){let{instantFps:r}=Ee.get();return new Promise(o=>{o({averageFPS:r})})}return new Promise(r=>{let o=[],s=0,i=0,a=0,c=0,l=0,p=h=>{if(h*=.001,c===0){c=h,requestAnimationFrame(p);return}let f=h-c;c=h;let d=Number.isFinite(1/f)?1/f:60,v=Math.max(d,60);a+=v-(o[s]||0),o[s++]=v,i=Math.max(i,s),s%=25;let y=Math.round(a/i);if(l++,l>=e){Ee.quickSetProp("instantFps",y),Jm=!0,r({averageFPS:y});return}requestAnimationFrame(p)};requestAnimationFrame(p)})};Ai();var El=1e7,Qm=2e3,wl=!1,Co=[],et=Lt(),Ym=0,Sl=Lt(),xl=0,Il=0,Cl=0,Qo=!1,Ct=60,Fi=Ct,Oi=0,$i=0,fr=0,Li=!1,Di=!1,TE=()=>Ct<Fi/5*3,_E=()=>Ct<Fi/5*4,SE=()=>{!TE()||Li||(Li=!0,setTimeout(()=>{Li=!1},4e3))},xE=()=>{!_E()||Di||(Di=!0,setTimeout(()=>{Di=!1},4e3))},CE=()=>{fr=0,Ee.quickSetProp("currentFrame",fr),Ko.updateKeys(El),Yo.updateFrameId(El)};Pi(({visibilityState:t})=>{Qo=t!=="visible"});qm();Ee.watch("requestFrame",()=>{Bi()});var Xm=()=>{fr>=El&&CE(),xt.fire({time:et,fps:Ct});let t=Xo.get();if(t.length>0)for(let e of t)Co.push(e);wl=!1,Co.length>0||Ko.getAmountOfFrameToFire()>0||Yo.getCacheCounter()>0||et<Qm?Bi():(Qo=!0,fr=0,Il=et,Ee.quickSetProp("currentFrame",fr))},Km=t=>{et=t,xl=et-Sl,Qo&&(Ym+=xl),Sl+=xl,et=Math.round(Sl-Ym);let e=Math.round(1e3/Ct);Cl=Math.abs(et-Il-e);let r=Cl>100?Cl:0;et=et-r,Il=et,Qo?($i=et,Oi=0,Ct=Ee.getProp("instantFps")):Oi++,et>$i+1e3&&!Qo&&(Ct=et>Qm?Math.round(Oi*1e3/(et-$i)):Ee.getProp("instantFps"),$i=et,Oi=0),Ct>Fi&&(Fi=Ct),SE(),xE(),Co.forEach(n=>n({time:et,fps:Ct})),Ko.fire({currentFrame:fr,time:et,fps:Ct}),Yo.fire(fr),fr++,Ee.quickSetProp("currentFrame",fr),Co.length=0,Qo=!1,Ee.getProp("deferredNextTick")?Dt(()=>Xm()):Xm()},Bi=()=>{wl||(typeof globalThis>"u"?setTimeout(()=>Km(Lt()),Op):requestAnimationFrame(Km),wl=!0)},Ft={add:s=>{Co.push(s),Bi()},addMultiple:(s=[])=>{Co=[...Co,...s],Bi()},getFps:()=>Ct,mustMakeSomething:()=>Li,shouldMakeSomething:()=>Di};var fs=!1,ds=new Map,Vi=()=>{},Ml=0,kl=0;function EE(){if(ds.size===0){globalThis.removeEventListener("resize",Vi),fs=!1;return}let t=globalThis.innerHeight,e=globalThis.innerWidth,r=t!==Ml,o=e!==kl;Ml=t,kl=e;let n={scrollY:globalThis.scrollY,windowsHeight:t,windowsWidth:e,documentHeight:document.documentElement.scrollHeight,verticalResize:r,horizontalResize:o};for(let s of ds.values())s(n)}function wE(){fs||(fs=!0,Ml=globalThis.window.innerHeight,kl=globalThis.window.innerWidth,Vi=_o(()=>EE()),globalThis.addEventListener("resize",Vi,{passive:!1}))}var IE=t=>{if(globalThis.window===void 0)return()=>{};let e=we();return ds.set(e,t),wE(),()=>{ds.delete(e),ds.size===0&&fs&&(globalThis.removeEventListener("resize",Vi),fs=!1)}},Zm=IE;var bs=!1,gs=new Map,ME="UP",th="DOWN",Rl=0,Zo=0,Nl=th,eh={scrollY:Zo,direction:Nl};function Pl(){if(gs.size===0){globalThis.removeEventListener("scroll",Pl),bs=!1;return}Rl=Zo,Zo=globalThis.scrollY,Nl=Zo>Rl?th:ME,eh={scrollY:Zo,direction:Nl};for(let t of gs.values())t(eh)}function kE(){bs||(bs=!0,Rl=globalThis.scrollY,Zo=globalThis.scrollY,window.addEventListener("scroll",Pl,{passive:!0}))}var RE=t=>{if(globalThis.window===void 0)return()=>{};let e=we();return gs.set(e,t),kE(),()=>{gs.delete(e),gs.size===0&&bs&&(globalThis.removeEventListener("scroll",Pl),bs=!1)}},gr=RE;var ys=!1,vs=new Map,Al=()=>{};function NE(t){if(vs.size===0){Al(),ys=!1;return}Ft.add(()=>{xt.add(()=>{for(let e of vs.values())e(t)},0)})}function PE(){ys||(ys=!0,Al=gr(NE))}var AE=t=>{if(globalThis.window===void 0)return()=>{};let e=we();return vs.set(e,t),PE(),()=>{vs.delete(e),vs.size===0&&ys&&(Al(),ys=!1)}},rh=AE;var _s=!1,Ts=new Map,oh=()=>{},Ol=()=>{};function OE(t){if(Ts.size===0){Ol(),_s=!1;return}Ft.add(()=>{xt.add(()=>{for(let e of Ts.values())e(t)},0)})}function $E(){_s||(_s=!0,oh=Si(t=>OE(t),Ee.getProp("throttle")),Ol=gr(oh))}var LE=t=>{if(globalThis.window===void 0)return()=>{};let e=we();return Ts.set(e,t),$E(),()=>{Ts.delete(e),Ts.size===0&&_s&&(Ol(),_s=!1)}},nh=LE;function sh(t){let e=()=>{},r=()=>{},o=()=>{},n=!1,s=new Map,i=!1;function a(){if(i=!1,s.size===0){r(),t==="START"&&e(),n=!1;return}Ft.add(()=>{xt.add(()=>{let p={scrollY:globalThis.scrollY};if(t==="END")for(let h of s.values())h(p)},0)})}function c(){n||(n=!0,o=_o(()=>a()),r=gr(o),t==="START"&&(e=gr(({scrollY:p})=>{let h={scrollY:p};if(!i){i=!0;for(let f of s.values())f(h)}})))}return p=>{if(globalThis.window===void 0)return()=>{};let h=we();return s.set(h,p),c(),()=>{s.delete(h),s.size===0&&n&&a()}}}var ih=sh("START"),ah=sh("END");function en(t){let e=!1,r=new Map;function o(i){if(r.size===0){globalThis.removeEventListener(t,o),e=!1;return}for(let a of r.values())a(i)}function n(){e||(e=!0,globalThis.addEventListener(t,o))}return i=>{if(globalThis.window===void 0)return()=>{};let a=we();return r.set(a,i),n(),()=>{r.delete(a),r.size===0&&e&&(globalThis.removeEventListener(t,o),e=!1)}}}var ch=en("pointerover"),lh=en("pointerdown"),uh=en("pointermove"),ph=en("pointerup"),mh=en("pointerout"),hh=en("pointerleave");var He=Symbol("LinkedList.setNext"),Ue=Symbol("LinkedList.setPrev"),Wi="after",$l="before",tn=class{#n=null;#t=null;constructor(e){this.data=e}get next(){return this.#n}[He](e){this.#n=e}get prev(){return this.#t}[Ue](e){this.#t=e}dispose(){this.data=null,this.#n=null,this.#t=null}},ji=class t{#n=null;#t=null;#i=0;#l=new WeakSet;addLast(e){let r=new tn(e);return this.#l.add(r),this.#n?(this.#t&&this.#t[He](r),r[Ue](this.#t),this.#t=r,this.#i++,this):(this.#n=r,this.#t=r,this.#i++,this)}addFirst(e){let r=new tn(e);return this.#l.add(r),this.#n?(r[He](this.#n),this.#n[Ue](r),this.#n=r,this.#i++,this):(this.#n=r,this.#t=r,this.#i++,this)}removeNode(e){return!e||!this.#l.has(e)?this:e===this.#n?this.removeFirst():e===this.#t?this.removeLast():(e.prev&&e.prev[He](e.next),e.next&&e.next[Ue](e.prev),e.dispose(),this.#i--,this)}removeFirst(){if(this.#n===null)return this;let e=this.#n;return this.#n=this.#n.next,this.#n&&this.#n[Ue](null),this.#n===null&&(this.#t=null),e.dispose(),this.#i--,this}removeLast(){if(this.#t===null)return this;let e=this.#t;return this.#t=this.#t.prev,this.#t&&this.#t[He](null),this.#t===null&&(this.#n=null),e.dispose(),this.#i--,this}insertAfter(e,r){if(!e||!this.#l.has(e))return this;let o=new tn(r);return this.#l.add(o),o[Ue](e),o[He](e.next),e.next&&e.next[Ue](o),e[He](o),e===this.#t&&(this.#t=o),this.#i++,this}insertBefore(e,r){if(!e||!this.#l.has(e))return this;let o=new tn(r);return this.#l.add(o),o[He](e),o[Ue](e.prev),e.prev&&e.prev[He](o),e[Ue](o),e===this.#n&&(this.#n=o),this.#i++,this}move(e,r,o=Wi){return!this.#l.has(e)||!this.#l.has(r)?this:e===r?this:o===Wi&&r.next===e?this:o===$l&&r.prev===e?this:(e.prev&&e.prev[He](e.next),e.next&&e.next[Ue](e.prev),e===this.#n&&(this.#n=e.next),e===this.#t&&(this.#t=e.prev),o==Wi&&(e[Ue](r),e[He](r.next),r.next&&r.next[Ue](e),r[He](e),r===this.#t&&(this.#t=e)),o==$l&&(e[Ue](r.prev),e[He](r),r.prev&&r.prev[He](e),r[Ue](e),r===this.#n&&(this.#n=e)),this)}moveAfter(e,r){return this.move(e,r,Wi)}moveBefore(e,r){return this.move(e,r,$l)}swap(e,r){if(!this.#l.has(e)||!this.#l.has(r))return this;if(e===r)return this;if(e.next===r)return this.moveAfter(e,r);if(r.next===e)return this.moveAfter(r,e);let o=e.prev,n=e.next,s=r.prev,i=r.next,a=e===this.#n,c=e===this.#t,l=r===this.#n,p=r===this.#t;return o&&o[He](n),n&&n[Ue](o),s&&s[He](i),i&&i[Ue](s),e[Ue](s),e[He](i),r[Ue](o),r[He](n),s&&s[He](e),i&&i[Ue](e),o&&o[He](r),n&&n[Ue](r),a?this.#n=r:l&&(this.#n=e),c?this.#t=r:p&&(this.#t=e),this}find(e){let r=this.#n,o;for(;r!==null;){if(e(r)){o=r;break}r=r.next}return o}filter(e){let r=this.#n,o=new t,n=0;for(;r!==null;)e(r,n)&&o.addLast(r.data),r=r.next,n++;return o}map(e){let r=this.#n,o=new t,n=0;for(;r!==null;)o.addLast(e(r,n)),r=r.next,n++;return o}*[Symbol.iterator](){let e=this.#n;for(;e;)yield e,e=e.next}traverse(e){let r=this.#n;for(;r!==null;)e(r),r=r.next;return this}async traverseAsync(e){let r=this.#n;for(;r!==null;)await e(r),r=r.next;return this}traverseReverse(e){let r=this.#t;for(;r!==null;)e(r),r=r.prev;return this}async traverseReverseAsync(e){let r=this.#t;for(;r!==null;)await e(r),r=r.prev;return this}execute(e){return e(this),this}async executeAsync(e){return await e(this),this}print(){let e=this.#n,r=[];for(;e!==null;)r.push(e.data),e=e.next;return console.log(r),this}clear(){let e=this.#n,r=[];for(;e!==null;)r.push(e),e=e.next;for(let o of r)o.dispose();return this.#n=null,this.#t=null,this.#i=0,r.length=0,this}reverse(){let e=this.#n;for(this.#n=this.#t,this.#t=e;e!==null;){let r=e.next,o=e.prev;e[He](o),e[Ue](r),e=r}return this}toArray(){let e=[],r=this.#n;for(;r!==null;)e.push(r.data),r=r.next;return e}toArrayReverse(){let e=[],r=this.#t;for(;r!==null;)e.push(r.data),r=r.prev;return e}get first(){return this.#n}get last(){return this.#t}get size(){return this.#i}};function DE(t){return Ri(t)}function FE(){return Ee.getProp("instantFps")}function BE(){return Ft.getFps()}function VE(){return Ft.mustMakeSomething()}function WE(){return Ft.shouldMakeSomething()}function jE(t=()=>{}){return Ft.add(t)}function zE(t=()=>{}){return xt.add(t)}function HE(t=()=>{}){return Xo.add(t)}function UE(t=()=>{},e=0){return Ko.add(t,e)}async function GE({force:t=!1,duration:e=30}={}){return await Ai({force:t,duration:e})}function qE(t=()=>{}){return Dm(t)}var JE=Yo;function YE(t=()=>{}){return Zm(t)}function XE(t=()=>{}){return Pi(t)}function KE(t=()=>{}){return Fm(t)}function QE(t=()=>{}){return Bm(t)}function ZE(t=()=>{}){return Vm(t)}function ew(t=()=>{}){return Wm(t)}function tw(t=()=>{}){return jm(t)}function rw(t=()=>{}){return zm(t)}function ow(t=()=>{}){return Hm(t)}function nw(t=()=>{}){return Um(t)}function sw(t=()=>{}){return rh(t)}function iw(t=()=>{}){return gr(t)}function aw(t=()=>{}){return nh(t)}function cw(t=()=>{}){return ih(t)}function lw(t=()=>{}){return ah(t)}function uw(t=()=>{}){return ch(t)}function pw(t=()=>{}){return lh(t)}function mw(t=()=>{}){return uh(t)}function hw(t=()=>{}){return ph(t)}function dw(t=()=>{}){return mh(t)}function fw(t=()=>{}){return hh(t)}var gw=Ee;function bw(){return new ji}var m={};To(m,{afterRouteChange:()=>vh,beforeRouteChange:()=>bh,componentMap:()=>j,createComponent:()=>Kd,eventDelegationMap:()=>Sn,getActiveParams:()=>_h,getActiveRoute:()=>Th,getChildrenIdByName:()=>zi,getComponentNameById:()=>Rh,getDebugMode:()=>Xd,getIdByInstanceName:()=>Jt,getNumberOfActiveInvalidate:()=>sb,getNumberOfActiveRepeater:()=>ib,getParentIdById:()=>Ss,getPropsFromParent:()=>wa,getRoot:()=>ya,getStateById:()=>Yt,getStateByName:()=>Kh,getTree:()=>Oh,inizializeApp:()=>nb,loadUrl:()=>ob,mainStore:()=>fe,onRouteLoading:()=>yh,removeAndDestroyById:()=>st,setStateById:()=>gn,setStateByName:()=>Gd,staticProps:()=>Ia,tempDelegateEventMap:()=>ks,tick:()=>_r,updateStateByName:()=>Jd,useComponent:()=>aa,useMethodArrayByName:()=>Fh,useMethodByName:()=>Dh,watchById:()=>Et});var rn="activeRoute",on="activeParams",Eo="beforeRouteChange",nn="afterRouteChange",qt="routeIsLoading",ut="parserAsync",Wr="default",dh="repeater",fh="invalidate",gh="render_component";var fe=u.createStore({[rn]:()=>({value:{route:"",templateName:""},type:"any",skipEqual:!1}),[on]:()=>({value:{},type:"any",skipEqual:!1}),[Eo]:()=>({value:{currentRoute:"",currentTemplate:"",nextRoute:"",nextTemplate:""},type:"any",skipEqual:!1}),[nn]:()=>({value:{currentRoute:"",currentTemplate:"",previousRoute:"",previousTemplate:""},type:"any",skipEqual:!1}),[qt]:()=>({value:!1,type:Boolean}),[ut]:{element:()=>({value:document.createElement("div"),type:HTMLElement,skipEqual:!1}),persistent:()=>({value:!1,type:Boolean,skipEqual:!1}),source:()=>({value:Wr,type:String,skipEqual:!1})}}),sn=()=>{fe.set(ut,{element:document.createElement("div"),persistent:!1,source:Wr},{emit:!1})};var bh=t=>fe.watch(Eo,({currentRoute:e,currentTemplate:r,nextRoute:o,nextTemplate:n})=>{t({currentRoute:e,currentTemplate:r,nextRoute:o,nextTemplate:n})}),vh=t=>fe.watch(nn,({currentRoute:e,currentTemplate:r,previousRoute:o,previousTemplate:n})=>{t({currentRoute:e,currentTemplate:r,previousRoute:o,previousTemplate:n})}),yh=t=>fe.watch(qt,e=>{t(e)}),Th=()=>{let{activeRoute:t}=fe.get();return t},_h=()=>{let{activeParams:t}=fe.get();return t};var j=new Map;var zi=({id:t="",componentName:e=""})=>{if(!t||t==="")return[];let o=j.get(t)?.child;return o?o?.[e]??[]:(console.warn("getChildIdById failed no id found"),[])};var Sh="",xh,Ch=({contentId:t=""})=>{Sh=t};var Eh=()=>{xh=document?.querySelector(Sh)},Hi=()=>xh;var jr=new Map,wh=({instanceName:t,id:e})=>{let r=jr.get(t)??[];jr.set(t,[...r,e])},Ih=({instanceName:t,id:e})=>{let r=jr.get(t);if(!r)return;let o=r.filter(n=>n!==e);o.length===0&&jr.delete(t),o.length>0&&jr.set(t,o)},Ll=({instanceName:t})=>jr.get(t)??[];var Mh=new WeakMap,kh=({element:t,id:e})=>{Mh.set(t,e)},an=({element:t})=>Mh.get(t);var Rh=(t="")=>{if(!t||t==="")return;let r=j.get(t)?.componentName;return r||(console.warn("getComponentNameById failed no id found"),null)},Nh=t=>{if(!t)return"name-not-found";let e=an({element:t})??"",r=j.get(e);return r?r.componentName:"name-not-found"},Jt=(t="")=>t?Ll({instanceName:t})?.[0]:void 0,Ph=(t="")=>t?Ll({instanceName:t})??[]:[];var Ui=(t="")=>{if(!t||t==="")return!1;let r=j.get(t)?.element;return r?!Hi()?.contains(r):!1};var Ah=({chunk:t})=>t.reduce((e,r)=>{let[o,n]=r,{child:s,componentName:i,instanceName:a}=n,c=new Set(Object.values(s??{}).flat()),l=[];for(let p of j.entries()){let[h]=p;c.has(h)&&l.push(p)}return[...e,{id:o,componentName:i,instanceName:a,children:Ah({chunk:l})}]},[]),Oh=()=>{let t=[...j.entries()].filter(([,e])=>!e?.parentId||e?.parentId==="");return Ah({chunk:t})};var $h=({id:t,name:e,fn:r})=>{if(!t||t==="")return;let o=j.get(t),n=o?.methods;if(n){if(e in n){console.warn(`Method ${e}, is already used by ${t}`);return}j.set(t,{...o,methods:{...n,[e]:r}})}},Lh=({id:t})=>{if(!t||t==="")return{};let r=j.get(t)?.methods;return r?Object.keys(r).length===0?(console.warn(`no methods available for ${t} component`),{}):r:{}},Dh=t=>{let e=Jt(t);if(!e||e==="")return;let r=Lh({id:e});if(Object.keys(r).length===0){console.warn(`no methods available for ${t} component`);return}return r},Fh=t=>Ph(t).flatMap(r=>{let o=Lh({id:r});return Object.keys(o).length===0?[]:[o]});var Bh=({currentChild:t,id:e="",componentName:r=""})=>{let o=t?.[r];return o?o.push(e):t[r]=[e],t},Vh=({currentChild:t,id:e="",componentName:r=""})=>{let o=t?.[r]??[];return{...t,[r]:o.filter(n=>n!==e)}},Wh=({props:t,store:e})=>{Object.entries(t).forEach(([r,o])=>{e.set(r,o)})},Gi=({prop:t,componentName:e,action:r})=>{console.warn(`Props: ${t}, component: ${e}, action: ${r}: Props can only be modified from outside the component."`)};var Ss=(t="")=>{if(!t||t==="")return;let r=j.get(t)?.parentId;if(r)return r},jh=({id:t=""})=>{if(!t||t==="")return;let e=j.get(t),r=e?.parentId,o=e?.componentName??"";if(!r)return;let n=j.get(r);if(!n)return;let{child:s}=n;s&&j.set(r,{...n,child:Bh({currentChild:s,id:t,componentName:o})})},qi=({element:t})=>{if(!t)return;let e=t.parentNode,r;for(;e&&!r;)r=an({element:e}),r||(e=e.parentNode);return r??""},Dl=({moduleScopeId:t,targetComponentId:e})=>{if(t===e)return!0;let r=j.get(t);if(!r)return!1;let o=r?.parentId??"";return Dl({moduleScopeId:o,targetComponentId:e})};var yt=new Map,xs=new Map;var zh=({componentId:t})=>{if(t)for(let[e,r]of yt){let{componentId:o}=r;o===t&&yt.delete(e)}};var tt=new Map;var Te=new Map;var Hh=({id:t})=>{if(tt.has(t)){let e=tt.get(t);if(!e)return;e.forEach(({invalidateId:r})=>{Te.has(r)&&Te.delete(r)}),tt.delete(t)}};var rt=new Map;var J=new Map;var Uh=({id:t})=>{if(rt.has(t)){let e=rt.get(t);if(!e)return;e.forEach(({repeatId:r})=>{J.has(r)&&J.delete(r)}),rt.delete(t)}};var Gh=({id:t,parentId:e,componentName:r})=>{if(!t||!e)return;let o=j.get(e);o?.child&&j.set(e,{...o,child:Vh({currentChild:o.child,id:t,componentName:r})})};var qh=({componentId:t,repeatId:e})=>{let r=J.get(e);if(!r)return;let{componentChildren:o}=r;J.set(e,{...r,componentChildren:[...o,t]})},Jh=({componentId:t,repeatId:e})=>{let r=J.get(e);if(!r)return;let{componentChildren:o}=r;J.set(e,{...r,componentChildren:o.filter(n=>n!==t)})},Cs=({repeatId:t})=>{let e=J.get(t);if(!e)return[];let{componentChildren:r}=e;return r},Yh=({repeatId:t})=>{let e=J.get(t);if(!e)return!1;let{componentChildren:r}=e;return r.length>0};var cn=new Set;var Xh=t=>{cn.delete(t)};var st=({id:t=""})=>{if(!t||t==="")return;let e=j.get(t);if(!e)return;let{parentId:r,componentName:o,child:n,element:s,state:i,destroy:a,parentPropsWatcher:c,componentRepeatId:l,instanceName:p,persistent:h}=e;Object.values(n??{}).flat().forEach(f=>{st({id:f})}),Gh({id:t,parentId:r,componentName:o}),a?.(),i.destroy(),c&&c.forEach(f=>f()),Hh({id:t}),Uh({id:t}),l&&l.length>0&&Jh({componentId:t,repeatId:l}),p&&p.length>0&&Ih({instanceName:p,id:t}),h||Xh(t),zh({componentId:t}),s?.removeCustomComponent?.(),s?.remove(),e.methods=null,e.refs=null,e.repeaterInnerWrap=null,e.element=null,e.currentRepeaterState=null,e.state=null,j.delete(t)};var Yt=(t="")=>!t||t===""?void 0:j.get(t)?.state?.get();var Kh=(t="")=>{let e=Jt(t);return e||console.warn(`component ${t}, not found`),Yt(e)};var ln=({id:t="",prop:e})=>{if(!t||t==="")return;let r=j.get(t);if(!r)return;let{freezedPros:o}=r;o&&j.set(t,{...r,freezedPros:[...new Set([...o,e])]})},zr=({id:t="",prop:e})=>{if(!t||t==="")return;let r=j.get(t);if(!r)return;let{freezedPros:o}=r;o&&j.set(t,{...r,freezedPros:o.filter(n=>n!==e)})},wo=({id:t="",prop:e})=>{if(!t||t==="")return!1;let o=j.get(t)?.freezedPros;return o?o.includes(e):!1};var Hr=new Map;var Qh=({repeatId:t,host:e})=>{let r=J.get(t);if(!r)return;let o=e.parentNode;r.initialRenderWithoutSync.forEach(n=>{o.append(n)}),J.set(t,{...r,element:o,initialRenderWithoutSync:[]}),Hr.set(t,e)};var Zh="data-mobjs",Io="componentid",Ji="bindtextid",Yi="bindobjectid";var un="staticprops",Xi="bindprops",ed="name",td="name",rd="slot",br="repeaterchild";var Ur="currentRepeaterValue",Gr="repeatPropBind",Ki="bindevents",Xt="weakbindevents",pn="bindeffect",od="parentid";var Kt="bindrefid",vr="bindrefname",Qi="invalidateid",Zi="mobjsrepeat";var Qt={current:{},index:-1},nd="QUEQUE_BINDPROPS",Fl="QUEQUE_REPEATER",Bl="QUEQUE_INVALIDATE";var mn=new Set,sd=!1,id=t=>{mn.add(t)},ad=t=>{mn.delete(t)},Vl=t=>{let e;for(let r of mn)if(t?.contains(r)&&r.getIsPlaceholder()){e=r;break}if(e)return mn.delete(e),e};var cd=({element:t})=>[...mn].filter(e=>t.contains(e)&&t!==e&&e.getIsPlaceholder?.()&&e?.getSlotPosition?.())??[],ld=()=>mn.size;var it=t=>{sd=t},Bt=()=>sd;var ud=()=>{customElements.define("mobjs-repeat",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){if(Bt())return;let{dataset:e}=this.shadowRoot?.host??{};if(e){let r=this.shadowRoot?.host,o=r?.getAttribute(Zi)??"";Qh({repeatId:o,host:r})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var qr=new Map;var pd=({invalidateId:t,host:e})=>{let r=Te.get(t);if(!r)return;let o=e.parentNode;Te.set(t,{...r,element:o}),qr.set(t,e)};var md=()=>{customElements.define("mobjs-invalidate",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:t}=this.shadowRoot?.host??{};if(t){let e=this.shadowRoot?.host,r=e.getAttribute(Qi)??"";pd({invalidateId:r,host:e})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var Jr=new Set,hd=t=>{Jr.add(t)},dd=()=>{Jr.clear()},fd=({element:t})=>[...Jr].find(e=>{let r=!e?.getSlotName?.()&&t.contains(e);return r&&Jr.delete(e),r}),gd=({name:t,element:e})=>[...Jr].find(r=>{let o=r?.getSlotName?.()===t&&e.contains(r);return o&&Jr.delete(r),o}),bd=()=>[...Jr],ea=()=>Jr.size;var vd=()=>{customElements.define("mobjs-slot",class extends HTMLElement{#n;constructor(){super(),this.attachShadow({mode:"open"}),this.#n="",this.isSlot=!0;let{dataset:t}=this.shadowRoot?.host??{};t&&(this.#n=this.shadowRoot?.host.getAttribute(td))}connectedCallback(){let t=this.shadowRoot?.host;t&&hd(t)}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}getSlotName(){return this.#n}})};var Wl=new Set,yd=t=>{Wl.add(t)},ta=()=>[...Wl],ra=t=>Wl.delete(t);var Td=t=>{Object.entries(t).forEach(([e,r])=>{let{connectedCallback:o,disconnectedCallback:n,adoptedCallback:s,attributeChangedCallback:i,style:a,attributeToObserve:c}=r.componentParams;customElements.define(e,class extends HTMLElement{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#S;static get observedAttributes(){return c}constructor(){super(),this.attachShadow({mode:"open"}),this.active=!1,this.#t=u.getUnivoqueId(),this.#i={},this.#n=e,this.#l=!0,this.isUserComponent=!0,this.#o="",this.#e="";let l=this.shadowRoot?.host;if(!l)return;if(Bt()){yd(l);return}if(this.#a&&!this.active&&(this.style.visibility="hidden"),!this.shadowRoot)return;if(a){let f=document.createElement("style");f.textContent=a,this.shadowRoot.append(f)}let h=document.createElement("slot");this.shadowRoot.append(h)}getComponentName(){return this.#n}setId(l){this.#t=l}getId(){return this.#t}getParentId(){return this.#f}setParentId(l){this.#f=l}getIsPlaceholder(){return this.#l}getInstanceName(){return this.#h}getStaticPropsId(){return this.#u}getDynamicPropsid(){return this.#s}getBindEventsId(){return this.#c}getCurrentKey(){return this.#d}setDynamicPropsFromSlotId(l){this.#o=l}getDynamicPropsFromSlotId(){return this.#o}setPropsFromSlotId(l){this.#e=l}getPropsFromSlotId(){return this.#e}setRepeatValue(l){this.#p=l}getRepeatValue(){return this.#p}getSlotPosition(){return this.#a}getDelegateEventId(){return this.#g}getRepeaterPropBind(){return this.#m??void 0}setRepeaterPropBind(l){this.#m=l}getComponentRepeatId(){return this.#r}getBindRefId(){return this.#C}getBindRefName(){return this.#S}resetParams(){this.active=!1,this.#t="",this.#i={}}disablePlaceHolderState(){this.#l=!1}inizializeCustomComponent(l){this.active||(this.active=!0,this.#t=l.id,this.#i=l,this.#l=!1,o?.({context:this,params:this.#i}))}connectedCallback(){if(!Bt()&&this.#l){let p=this.shadowRoot?.host;p&&([this.#h,this.#u,this.#s,this.#d,this.#c,this.#p,this.#a,this.#f,this.#r,this.#g,this.#m,this.#C,this.#S]=[ed,un,Xi,"key",Ki,Ur,rd,od,br,Xt,Gr,Kt,vr].map(h=>p.getAttribute(h)??"")),id(p);return}}disconnectedCallback(){if(!this.shadowRoot)return;let l=this.shadowRoot?.host;ad(l),ra(l),this.active&&(n?.({context:this,params:this.#i}),this.resetParams())}removeCustomComponent(){!this.shadowRoot||!this.active||this.parentElement?.removeChild(this)}adoptedCallback(){!this.shadowRoot||!this.active||s?.({context:this,params:this.#i})}attributeChangedCallback(l,p,h){!this.shadowRoot||!this.active||i?.({name:l,oldValue:p,newValue:h,context:this,params:this.#i})}})})};var Et=(t="",e="",r=()=>{},{wait:o=!1}={})=>(!t||t==="")&&(!e||e==="")?void 0:j.get(t)?.state?.watch(e,r,{wait:o??!1});function Xr(){return new Promise(t=>u.useNextLoop(()=>t()))}var Mo=new Map,xd=()=>Mo.size===0,_d=1e3,Cd=t=>{if(Mo.size>=_d)return console.warn(`InvalidateTick: maximum queue size reached (${_d}). Likely an infinite watch loop. Queue force-cleared. `),Mo.clear(),()=>{};let e=u.getUnivoqueId();return Mo.set(e,t),()=>Mo.delete(e)},Sd=()=>Mo.size===0,wt=async({debug:t=!1,previousResolve:e}={})=>{if(await Xr(),t&&Mo.forEach(r=>{console.log(r)}),Sd()&&e){e();return}return new Promise(r=>{if(Sd()){r();return}wt({debug:t,previousResolve:e??r})})};var ko=new Map,Id=()=>ko.size===0,Ed=1e3,Md=t=>{if(ko.size>=Ed)return console.warn(`RepeaterTick: maximum queue size reached (${Ed}). Likely an infinite watch loop. Queue force-cleared. `),ko.clear(),()=>{};let e=u.getUnivoqueId();return ko.set(e,t),()=>ko.delete(e)},wd=()=>ko.size===0,It=async({debug:t=!1,previousResolve:e}={})=>{if(await Xr(),t&&ko.forEach(r=>{console.log(r)}),wd()&&e){e();return}return new Promise(r=>{if(wd()){r();return}It({debug:t,previousResolve:e??r})})};var dn=({id:t})=>{let e=tt.get(t);return e?e.flatMap(({invalidateId:r})=>Te.get(r)?.observed??[]):[]};var fn=({id:t})=>{let e=rt.get(t);return e?e.flatMap(({repeatId:r})=>{let o=J.get(r)?.observed;return o?[o]:[]}):[]};var oa=new Map,kd=(t,e)=>{oa.set(t,e)},na=new Map,Rd=({host:t,componentId:e,bindTextId:r})=>{na.set(t,{componentId:e,bindTextId:r})},Nd=t=>t.match(/(?<=\[).+?(?=])/g),Pd=t=>t.split("[")?.[0],vw=({previous:t,current:e})=>{let r=Nd(e);return r&&r?.length>0?r.reduce((n,s)=>n?.[s],t[Pd(e)]):t?.[e]},Ad=(t,e,...r)=>{let o=Yt(t),n=r.map(s=>s.split(".").reduce((a,c)=>vw({previous:a,current:c})??a,o));return e.raw.reduce((s,i,a)=>s+i+(n?.[a]??""),"")},Od=()=>{[...na].forEach(([t,{bindTextId:e}])=>{let r=t.parentElement;if(!r){oa.delete(e);return}let o=oa.get(e);o&&(oa.delete(e),yw({...o,element:r}),t?.removeCustomComponent?.(),t?.remove(),r=null)}),na.clear()},$d=()=>na.size,yw=({id:t,render:e,props:r,element:o})=>{let n=!1,s=new WeakRef(o),i=fn({id:t}),a=dn({id:t}),l=[...new Set([...r,...i,...a])].map(p=>{let f=p.split(".")?.[0],d=Nd(f),y=d&&d?.length>0?Pd(f):f;if(y)return Et(t,y,async()=>{await It(),await wt(),!n&&(n=!0,u.useNextLoop(()=>{u.useFrame(()=>{s.deref()&&!s.deref()?.isConnected&&(l.forEach(T=>{T&&T()}),l.length=0),s.deref()&&s.deref()?.isConnected&&(s.deref().textContent="",s.deref().insertAdjacentHTML("afterbegin",e())),n=!1})}))})})};var Ld=()=>{customElements.define("mobjs-bind-text",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:t}=this.shadowRoot?.host??{};if(t){let e=this.shadowRoot?.host??document.createElement("div"),r=e?.getAttribute(Io)??"",o=e?.getAttribute(Ji)??"";Rd({host:e,componentId:r,bindTextId:o})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var sa=new Map,Dd=(t,e)=>{sa.set(t,e)},jl=new Map,Fd=({host:t,componentId:e,bindObjectId:r})=>{jl.set(t,{componentId:e,bindObjectId:r})},Bd=t=>t.map(e=>"observe"in e?Pe.extractkeyFromProp(e.observe):(Pe.initializeCurrentDependencies(),"value"in e?e?.value():e(),Pe.getFirstCurrentDependencies())),Vd=(t,...e)=>t.raw.reduce((r,o,n)=>e?.[n]&&"value"in e[n]?r+o+(e?.[n]?.value?.()??""):r+o+(e?.[n]?.()??""),""),Wd=()=>{[...jl].forEach(([t,{bindObjectId:e}])=>{let r=t.parentElement;if(!r){sa.delete(e);return}let o=sa.get(e);o&&(sa.delete(e),Tw({...o,element:r}),t?.removeCustomComponent?.(),t?.remove(),r=null)}),jl.clear()},Tw=({id:t,keys:e,render:r,element:o})=>{let n=!1,s=new WeakRef(o),i=fn({id:t}),a=dn({id:t}),l=[...new Set([...e,...i,...a])].map(p=>Et(t,p,async()=>{await It(),await wt(),!n&&(n=!0,u.useNextLoop(()=>{u.useFrame(()=>{s.deref()&&!s.deref()?.isConnected&&(l.forEach(h=>{h&&h()}),l.length=0),s.deref()&&s.deref()?.isConnected&&(s.deref().textContent="",s.deref().insertAdjacentHTML("afterbegin",r())),n=!1})}))}))};var jd=()=>{customElements.define("mobjs-bind-object",class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{dataset:t}=this.shadowRoot?.host??{};if(t){let e=this.shadowRoot?.host??document.createElement("div"),r=e?.getAttribute(Io)??"",o=e?.getAttribute(Yi)??"";Fd({host:e,componentId:r,bindObjectId:o})}}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}})};var ia={},Ro=()=>ia,zd=new Set,Hd=()=>{ia=Object.fromEntries([...zd.values()].flatMap(t=>Object.entries(t))),console.log(`component loaded:${Object.keys(ia).length}`),Td(ia),vd(),md(),ud(),Ld(),jd()},aa=t=>{!t||t?.length===0||t.forEach(e=>{zd.add(e)})};var ca=({componentName:t,propName:e})=>(Ro()?.[t]?.componentParams?.exportState??[]).includes(e),Ud=({componentName:t})=>Ro()?.[t]?.componentParams?.exportState??[];var gn=(t="",e="",r,{emit:o=!0}={})=>{if((!t||t==="")&&(!e||e==="")&&!r||wo({id:t,prop:e}))return;let s=j.get(t),i=s?.state,a=s?.componentName??"";if(!ca({componentName:a,propName:e})){console.warn(`setStateById failed ${e} in: ${a} is not exportable, maybe a slot bind state that not exist here?`);return}if(!i){console.warn(`setStateById failed no id found on prop: ${e}`);return}i.set(e,r,{emit:o})};var Gd=(t="")=>{let e=Jt(t);return e||console.warn(`component ${t}, not found`),(r,o,{emit:n=!0}={})=>gn(e,r,o,{emit:n})};var qd=(t="",e="",r,{emit:o=!0,clone:n=!1}={})=>{if((!t||t==="")&&(!e||e==="")&&!r||wo({id:t,prop:e}))return;let i=j.get(t),a=i?.state,c=i?.componentName??"";if(!ca({componentName:c,propName:e})){console.warn(`updateStateById failed ${e} in: ${c} is not exportable, maybe a slot bind state that not exist here?`);return}if(!a){console.warn(`updateStateById failed no id found on prop: ${e}`);return}a.update(e,r,{emit:o,clone:n})};var Jd=(t="")=>{let e=Jt(t);return e||console.warn(`component ${t}, not found`),(r,o,{emit:n=!0,clone:s=!1}={})=>qd(e,r,o,{emit:n,clone:s})};var zl={scoped:!1,maxParseIteration:5e3,debug:!1},Yd=t=>{zl={...zl,...t}},Mt=()=>zl,Xd=()=>{let{debug:t}=Mt();return t},Kd=({tag:t="",component:e=()=>"",props:r={},state:o={},bindStore:n,scoped:s,connectedCallback:i=()=>{},disconnectedCallback:a=()=>{},adoptedCallback:c=()=>{},attributeToObserve:l=[],attributeChangedCallback:p=()=>{},style:h="",child:f=[]})=>(aa(f),{[t]:{componentFunction:e,componentParams:{exportState:Object.keys(r),scoped:s,state:{...r,...o},bindStore:n,connectedCallback:i,disconnectedCallback:a,adoptedCallback:c,attributeToObserve:l,attributeChangedCallback:p,style:h,child:f}}});var Qd=[],Zd="",ef="",tf=t=>{Qd=[...t]},bn=({hash:t=""})=>Qd.find(({hash:e})=>t===e),rf=({hash:t=""})=>{Zd=t},la=()=>Zd,of=({hash:t=""})=>{ef=t},nf=()=>ef;var sf=({id:t="",newElement:e=document.createElement("div")})=>{if(!t||t==="")return;let r=j.get(t);r&&(j.set(t,{...r,element:e}),kh({element:e,id:t}))},ua=({id:t=""})=>!t||t===""?void 0:j.get(t)?.element,af=({element:t})=>t?an({element:t}):"",Hl=({keyValue:t="",repeatId:e=""})=>t?.length===0?[]:Cs({repeatId:e}).flatMap(o=>{let n=j.get(o);if(!n)return[];let{element:s,key:i}=n;return`${i}`==`${t}`?[{element:s,id:o}]:[]});function*yr(t){if(t){yield t;for(let e of t.children)yield*yr(e)}}function _w(t){let e=[];for(let r of yr(t))r?.isUserComponent&&r?.getSlotPosition?.()&&e.push(r);return e}var cf=t=>{let e=[],r=t||document.body;for(let o of r.children)e=[...e,..._w(o)];return e};function Sw(t){let e=[];for(let r of yr(t))r?.isSlot&&r?.getSlotName?.()&&e.push(r);return e}var lf=t=>{let e=[],r=t||document.body;for(let o of r.children)e=[...e,...Sw(o)];return e};function xw(t,e){for(let r of yr(t))if(r?.isSlot&&r?.getSlotName?.()===e)return r;return null}var uf=(t,e)=>{let r=t||document.body;for(let o of r.children){let n=xw(o,e);if(n)return n}return null};function Cw(t){for(let e of yr(t))if(e?.isSlot&&!e?.getSlotName?.())return e;return null}var pf=t=>{let e=t||document.body;for(let r of e.children){let o=Cw(r);if(o)return o}return null};var Es=new Map,vn=t=>{let e=u.getUnivoqueId();return Es.set(e,t),e},mf=(t="")=>{if(!t)return Qt;let e=Es.get(t);return Es.delete(t),e??Qt};var g=(t,...e)=>t.reduce((r,o,n)=>r+o+(e[n]===void 0?"":e[n]),"").replaceAll(/>\s+</g,"><").trim();var pa=({components:t,current:e,index:r,observe:o,repeatId:n,key:s})=>{t.forEach(i=>{if(i.hasAttribute(br)){ra(i);return}i.setAttribute(Ur,vn({current:e,index:r})),i.setAttribute("key",`${s}`),i.setAttribute(Gr,`${o}`),i.setAttribute(br,`${n}`)})},Kr=({stringDOM:t,parent:e,position:r})=>{it(!0);let o=document.createRange().createContextualFragment(t);it(!1),o&&(r==="afterend"&&e.after(o),r==="beforebegin"&&e.before(o),r==="afterbegin"&&e.prepend(o),r==="beforeend"&&e.append(o))},ws=({elements:t,parent:e,position:r})=>{let o=new DocumentFragment;it(!0),t.forEach(n=>{n&&o.append(n)}),it(!1),r==="afterend"&&e.after(o),r==="beforebegin"&&e.before(o),r==="afterbegin"&&e.prepend(o),r==="beforeend"&&e.append(o)};var ww=({element:t,content:e})=>{let{debug:r}=Mt();if(t.parentNode){let o=document.createElement("template");o.innerHTML=e;let n=o.content.firstElementChild;return n?.disablePlaceHolderState?.(),n&&t.after(n),r&&t.insertAdjacentHTML("afterend",`<!--  ${t.tagName.toLowerCase()} --> `),n}},Iw=({element:t})=>{bd().forEach(r=>{r?.removeCustomComponent(),r?.remove()})},Mw=({element:t})=>{if(!!1&&ea()===0)return;let e=cf(t);e.length!==0&&[...e].forEach(r=>{let o=r?.getSlotPosition(),n=gd({name:o,element:t});n&&(n.parentNode?.insertBefore(r,n),n?.removeCustomComponent(),n?.remove())})},kw=({element:t,content:e})=>{let r=ww({element:t,content:e});if(r){let o=t.getId(),n=t?.getDelegateEventId(),s=t?.getBindRefId(),i=t?.getBindRefName(),a=fd({element:r});a&&(ws({parent:a,elements:[...t.childNodes],position:"afterend"}),a.remove()),a||ws({parent:r,elements:[...t.childNodes],position:"afterbegin"}),Mw({element:r}),Iw({element:r}),n&&n.length>0&&r.setAttribute(Xt,n),s&&s.length>0&&r.setAttribute(Kt,s),i&&i.length>0&&r.setAttribute(vr,i);let{debug:c}=Mt();c&&r.setAttribute(Zh,o??"")}return t.remove(),r},hf=({element:t,content:e})=>({newElement:kw({element:t,content:e})});var Ul=0,df=()=>{Ul+=1},Gl=()=>Ul,ff=()=>{Ul=0};var gf=({cb:t=()=>{},id:e})=>{if(!e)return;let r=j.get(e);r&&j.set(e,{...r,destroy:t})};var Is=new Map,bf=({id:t,cb:e=()=>{}})=>{Is.set(t,e)},ql=async({id:t,element:e})=>{let o=await Is.get(t)?.({element:e});gf({cb:o,id:t}),Is.delete(t)};var Jl=({id:t})=>{if(Hr.has(t)){let e=Hr.get(t);e?.removeCustomComponent(),e?.remove(),Hr.delete(t)}},ma=({id:t})=>J.has(t)?(Jl({id:t}),J.get(t)?.element):void 0;var ha=({id:t="",value:e})=>{if(!t||t==="")return;let r=j.get(t);r&&j.set(t,{...r,currentRepeaterState:e})},vf=({rootNode:t,currentNode:e})=>{if(!(!e||!t.contains(e)))return e.parentElement===t?e:vf({rootNode:t,currentNode:e.parentElement})},Rw=({rootNode:t,node:e})=>{if(t)return vf({rootNode:t,currentNode:e.parentElement})},Tr=({id:t=""})=>{if(!t||t==="")return Qt;let r=j.get(t)?.currentRepeaterState;return r||Qt};var yf=({id:t="",repeatId:e="",element:r})=>{if(!t||t==="")return;let o=j.get(t);if(!o)return;let n=ma({id:e}),s=Rw({rootNode:n,node:r});j.set(t,{...o,repeaterInnerWrap:s})},Ms=({id:t})=>!t||t===""?void 0:j.get(t)?.repeaterInnerWrap;var yn=new Map,Tf=1e5,Tn=t=>{if(yn.size>=Tf)return console.warn(`Tick: maximum queue size reached (${Tf}). Likely an infinite watch loop. Queue force-cleared. `),yn.clear(),()=>{};let e=u.getUnivoqueId();return yn.set(e,t),()=>yn.delete(e)},_f=()=>yn.size===0,_r=async({debug:t=!1,previousResolve:e}={})=>{if(await Xr(),t&&yn.forEach(r=>{console.log(r)}),_f()&&e){e();return}return new Promise(r=>{if(_f()){r();return}_r({debug:t,previousResolve:e??r})})};var Yl=!0,da=()=>{Yl=!0},fa=()=>{Yl=!1},ga=()=>Yl;var _n=new Map,Sf=(t=[])=>{let e=Re(Object,t)?[t]:t,r=u.getUnivoqueId();return _n.set(r,e),r},xf=({element:t,componentId:e,bindEventsId:r})=>{let o=_n.get(r);o&&(o.forEach(n=>{let[s]=Object.keys(n),[i]=Object.values(n);!s||!i||t.addEventListener(s,async a=>{if(!ga())return;fa(),await _r(),da();let c=Tr({id:e});i(a,c?.current,c?.index)})}),_n.delete(r))},Cf=()=>{_n.clear()};var ba=({id:t="",unWatchArray:e=[]})=>{let r=j.get(t);if(!r)return;let{parentPropsWatcher:o}=r;o&&j.set(t,{...r,parentPropsWatcher:[...o,...e]})},Ef=({id:t=""})=>{if(!t||t==="")return;(j.get(t)?.parentPropsWatcher??[]).forEach(o=>{o()})};var wf=t=>{if(!("props"in t)){console.warn("bindProps not valid");return}let r=t?.observe?t.observe.map(s=>Pe.extractkeyFromProp(s)):(Pe.initializeCurrentDependencies(),u.checkType(Function,t.props)&&t.props({},{},0),Pe.getCurrentDependencies());if(r.length===0){console.warn("bindProps not valid, no dependencies found");return}let o={...t,observe:r},n=u.getUnivoqueId();return yt.set(n,{...o,componentId:"",propsId:n}),n},va=({componentId:t,observe:e,props:r,currentParentId:o,fireCallback:n})=>{if(!o)return;let s=Yt(o);if(!s)return;let i=Object.keys(s);if(e.every(h=>i.includes(h))||console.warn(`bind props error: Some prop ${JSON.stringify(e)} doesn't exist`),!j.has(t))return;let l=Tr({id:t}),p=r?.(s,l.current,l?.index);p&&Object.entries(p).forEach(([h,f])=>{gn(t,h,f,{emit:n})})},If=({propsId:t,repeatPropBind:e,componentId:r})=>{if(!t)return;let o=yt.get(t);o&&(yt.set(t,{...o,componentId:r}),xs.set(r,t),Xl({componentId:r,repeatPropBind:e,inizilizeWatcher:!1}))};var Xl=async({componentId:t,repeatPropBind:e,inizilizeWatcher:r})=>{let o=xs.get(t);if(!o)return;r&&xs.delete(t);let n=yt.get(o);if(!n)return;let{observe:s,props:i,parentId:a}=n,c=e&&e?.length>0&&!s.includes(e)?[...s,e]:[...s];if(r||va({componentId:t,observe:c,props:i,currentParentId:a??"",fireCallback:!1}),!r&&!Id()&&(await It(),va({componentId:t,observe:c,props:i,currentParentId:a??"",fireCallback:!0})),!r&&!xd()&&(await wt(),va({componentId:t,observe:c,props:i,currentParentId:a??"",fireCallback:!0})),!r)return;let l=!1,p=c.map(h=>Et(a,h,async()=>{if(await It(),await wt(),l)return;let f=Tn({state:h,componentId:t,moduleId:"",type:nd});l=!0,u.useNextLoop(()=>{va({componentId:t,observe:c,props:i,currentParentId:a??"",fireCallback:!0}),l=!1,f()})}));if(ba({id:t,unWatchArray:p.filter(h=>h!==void 0)}),!!r)for(let[h,f]of yt){let{componentId:d}=f;d===t&&yt.delete(h)}},Mf=()=>{yt.clear(),xs.clear()};var Zt=({id:t,container:e})=>{let o=j.get(t)?.child;if(!o)return;Object.values(o??{}).flat().forEach(s=>{let i=j.get(s),a=i?.element,c=i?.id??"";if(a&&e?.contains(a)&&a!==e){st({id:s});return}else Zt({id:c,container:e})})};var Kl=new Map,Nw=t=>(u.checkType(Array,t)?t:[t]).map(r=>Pe.extractkeyFromProp(r)),Pw=({toggleClass:t,toggleStyle:e,toggleAttribute:r})=>(Pe.initializeCurrentDependencies(),Object.values(e).forEach(o=>o()),Object.values(t).forEach(o=>o()),Object.values(r).forEach(o=>o()),Pe.getCurrentDependencies()),Pf=({data:t,id:e})=>{let o=(u.checkType(Array,t)?t:[t]).map(({observe:i,toggleClass:a,toggleStyle:c,toggleAttribute:l})=>({observe:i?Nw(i):Pw({toggleStyle:c??{fake:()=>""},toggleClass:a??{fake:()=>{}},toggleAttribute:l??{fake:()=>{}}}),toggleClass:a??{},toggleStyle:c??{},toggleAttribute:l??{}})),n={parentId:e,items:o},s=u.getUnivoqueId();return Kl.set(s,n),s},Af=t=>{[...t.querySelectorAll(`[${pn}]`)].forEach(r=>{let o=r.getAttribute(pn);if(!o)return;let n=Kl.get(o);n&&(r.removeAttribute(pn),Aw({data:n,element:r}),Kl.delete(o))})},kf=({ref:t,data:e})=>{e&&Object.entries(e).forEach(([r,o])=>{t.deref()&&t.deref().classList.toggle(r,o?.())})},Rf=({ref:t,data:e})=>{Object.entries(e).forEach(([r,o])=>{t.deref()&&(t.deref().style[r]=o?.()??"")})},Nf=({ref:t,data:e})=>{Object.entries(e).forEach(([r,o])=>{if(!t.deref())return;let n=o?.();if(u.checkType(Boolean,n)){t.deref()[r]=n;return}if(!n){t.deref().removeAttribute(r);return}t.deref()?.setAttribute(r,n)})},Aw=({data:t,element:e})=>{let r=new WeakRef(e),{parentId:o}=t,{items:n}=t,s=n.flatMap(({observe:i,toggleClass:a,toggleStyle:c,toggleAttribute:l})=>{let p=!1,h=fn({id:o}),f=dn({id:o});return[...new Set([...i,...h,...f])].map(v=>(a&&u.useFrame(()=>{kf({ref:r,data:a})}),c&&u.useFrame(()=>{Rf({ref:r,data:c})}),l&&u.useFrame(()=>{Nf({ref:r,data:l})}),Et(o,v,async()=>{if(await It(),await wt(),r.deref()&&!r.deref()?.isConnected){s.forEach(y=>{y&&y()}),s.length=0;return}p||(p=!0,u.useNextLoop(()=>{u.useFrame(()=>{a&&r.deref()&&kf({ref:r,data:a}),c&&r.deref()&&Rf({ref:r,data:c}),l&&r.deref()&&Nf({ref:r,data:l}),p=!1})}))})))})};var Of=({element:t})=>{let e=t.querySelectorAll(`[${Kt}]`),r={};return[...e].reduce((o,n)=>{let s=n.getAttribute(Kt),i=n.getAttribute(vr);if(n.removeAttribute(Kt),n.removeAttribute(vr),!i)return o;let a=i in o?[...o[i],{element:n,scopeId:s}]:[{element:n,scopeId:s}];return{...o,[i]:a}},r)},Ow=t=>[...new Set(t.toSorted((e,r)=>e===r||!e||!r?0:e.compareDocumentPosition(r)&2?1:-1))],$w=({refs:t,refName:e,element:r})=>({...t,[e]:Ow([...t[e],r])}),$f=t=>{Object.entries(t).forEach(([e,r])=>{r.forEach(({element:o,scopeId:n})=>{let s=j.get(n);if(!s)return;let{refs:i}=s;if(!i)return;let a=e in i?$w({refs:i,refName:e,element:o}):{...i,[e]:[o]};j.set(n,{...s,refs:a})})})},Ql=({id:t})=>{let e=j.get(t);if(!e)return{};let{refs:r,element:o}=e;if(!r)return{};let n=Object.entries(r).map(([s,i])=>({name:s,collection:i.filter(a=>o.contains(a))})).reduce((s,i)=>({...s,[i.name]:i.collection}),{});return j.set(t,{...e,refs:n}),n},Lf=({id:t})=>{let e=Ql({id:t});return Object.entries(e).reduce((r,[o,n])=>({...r,[o]:n?.[0]}),{})};var Df=document.createElement("div"),Ff=({element:t})=>{Df=t},ya=()=>Df;var Bf=":FORCE",ks=new Map,Sn=new WeakMap,Zl=[],Vf=[],Wf=(t=[])=>{let e=Re(Object,t)?[t]:t,r=u.getUnivoqueId();return ks.set(r,e),r},Lw=t=>{let e=t?.parentNode;for(;e;){if(Sn.has(e))return{target:e,data:Sn.get(e)};e=e?.parentNode}return{target:void 0,data:void 0}},Dw=t=>{let e=Sn.get(t);return e?{target:t,data:e}:Lw(t)};async function Fw(t,e){let r=e?.target;if(!r)return;let{target:o,data:n}=Dw(r);if(!n||!document.contains(o))return;let s=n.find(({event:p})=>p===t);if(!s)return;let{callback:i,force:a}=s;if(!ga()&&!a||(fa(),await _r(),da(),!document.contains(o)))return;let c=af({element:o}),l=c?Tr({id:c}):Qt;Object.defineProperty(e,"target",{value:r}),Object.defineProperty(e,"currentTarget",{value:o}),i(e,l?.current,l?.index)}var jf=async t=>{await It(),await wt(),[...t.parentNode?.querySelectorAll(`[${Xt}]`)??[]].forEach(n=>{let s=n.getAttribute(Xt)??"";n.removeAttribute(Xt);let i=ks.get(s);ks.delete(s);let a=i?.flatMap(c=>Object.entries(c).map(l=>{let[p,h]=l,f=p.toUpperCase().endsWith(Bf),d=p.toUpperCase().replaceAll(Bf,"").toLowerCase();return Zl.includes(d)||Zl.push(d),{event:d,callback:h,force:f}}));Sn.set(n,a)});let o=ya();Zl.forEach(n=>{Vf.includes(n)||(Vf.push(n),o.addEventListener(n,Fw.bind(null,n)))})};var xn="repeater",Ta="invalidate",Qr=({moduleParentElement:t,skipInitialized:e=!1,onlyInitialized:r=!1,componentId:o,module:n})=>{let s=n===xn?J.entries():Te.entries(),i=[];for(let a of s){let[c,{element:l,initialized:p,scopeId:h,initializeModule:f,unsubscribe:d}]=a;if(o&&!Dl({moduleScopeId:h??"",targetComponentId:o})||e&&p||r&&!p)continue;l&&t?.contains(l)&&t!==l&&i.push({moduleId:c,initializeModule:f,unsubscribe:n===xn?[d]:d})}return i};var zf=({id:t,repeatId:e})=>{if(!rt.has(t))return;let r=rt.get(t);if(!r)return;let o=r.filter(n=>n.repeatId!==e);J.has(e)&&J.delete(e),rt.set(t,o)};var Zr=({id:t,repeatParent:e})=>{Qr({moduleParentElement:e,skipInitialized:!1,onlyInitialized:!0,componentId:t,module:xn}).forEach(({unsubscribe:o,moduleId:n})=>{o.forEach(s=>{s()}),zf({id:t,repeatId:n})})};var _a=({repeatParent:t,id:e})=>{if(!t)return;Qr({moduleParentElement:t,skipInitialized:!0,onlyInitialized:!1,componentId:e,module:xn}).forEach(({initializeModule:o})=>{o()})};var Hf=({invalidateId:t,unsubscribe:e})=>{let r=Te.get(t);r&&Te.set(t,{...r,unsubscribe:e})};var Uf=({id:t,invalidateId:e})=>{if(!tt.has(t))return;let r=tt.get(t);if(!r)return;let o=r.filter(n=>n.invalidateId!==e);Te.has(e)&&Te.delete(e),tt.set(t,o)};var eo=({id:t,invalidateParent:e})=>{Qr({moduleParentElement:e,skipInitialized:!1,onlyInitialized:!0,componentId:t,module:Ta}).forEach(({unsubscribe:o,moduleId:n})=>{o.forEach(s=>{s()}),Uf({id:t,invalidateId:n})})};var eu=({id:t})=>{if(!Te.has(t))return;if(qr.has(t)){let r=qr.get(t);r?.removeCustomComponent(),r?.remove(),qr.delete(t)}return Te.get(t)?.element};var Sa=({invalidateParent:t,id:e})=>{if(!t)return;Qr({moduleParentElement:t,skipInitialized:!0,onlyInitialized:!1,componentId:e,module:Ta}).forEach(({initializeModule:o})=>{o()})};var Gf=async({observe:t=[],beforeUpdate:e=()=>Promise.resolve(),afterUpdate:r=()=>{},watch:o,id:n,invalidateId:s,persistent:i=!1,renderFunction:a})=>{let c=!1,l=qi({element:eu({id:s})});r();let p=t.map(h=>o(h,async()=>{if(c)return;ln({id:n,prop:h});let d=eu({id:s}),v=Tn({state:h,componentId:n,moduleId:s,type:Bl}),y=Cd({state:h,componentId:n,invalidateId:s,type:Bl});c=!0,u.useNextLoop(async()=>{if(!d){zr({id:n,prop:h});return}await e(),eo({id:n,invalidateParent:d}),Zr({id:n,repeatParent:d}),Zt({id:l??n,container:d}),d.textContent="",Kr({stringDOM:a(),parent:d,position:"afterbegin"}),fe.set(ut,{element:d,persistent:i,source:fh},{emit:!1}),await fe.emitAsync(ut),sn(),c=!1,v(),y(),Sa({invalidateParent:d,id:n}),_a({repeatParent:d,id:n}),zr({id:n,prop:h}),r()})}));Hf({invalidateId:s,unsubscribe:p})};var qf=t=>(u.checkType(Array,t)?t:[t]).map(r=>Pe.extractkeyFromProp(r));var Jf=({invalidateId:t,initializeModule:e})=>{let r=Te.get(t);r&&Te.set(t,{...r,initializeModule:e,unsubscribe:[()=>{}]})};var Yf=({invalidateId:t})=>{let e=Te.get(t);e&&Te.set(t,{...e,initialized:!0,initializeModule:()=>{}})};var Xf=({invalidateId:t,scopeId:e,observe:r})=>{Te.set(t,{element:void 0,initialized:!1,observed:r,scopeId:e,initializeModule:()=>{},unsubscribe:[()=>{}]})};var Kf=({repeatId:t,unsubscribe:e})=>{let r=J.get(t);r&&J.set(t,{...r,unsubscribe:e})};var Cn=new Set,Qf=({id:t,state:e,container:r})=>{Cn.add({id:t,state:e,container:r})},Zf=({id:t,state:e,container:r})=>{r&&Cn.forEach(o=>{t===o.id&&e===o.state&&r===o.container&&Cn.delete(o)})},eg=({id:t="",state:e="",container:r})=>[...Cn].some(n=>t===n.id&&e===n.state&&r===n.container);var rg=(t=[],e=[],r="")=>{let o=new Set(e.map(n=>n?.[r]));return t.filter(n=>!o.has(n?.[r]))},og=(t=[],e=[],r="")=>{let o=new Set(e.map(n=>n?.[r]));return t.map((n,s)=>({isNewElement:!o.has(n?.[r]),keyValue:n?.[r],index:s}))},tg=({arr:t=[],key:e=""})=>t.every(r=>u.checkType(Object,r)&&e in r),ng=({current:t,previous:e,key:r})=>tg({arr:t,key:r})&&tg({arr:e,key:r}),xa=({data:t=[],key:e=""})=>{let r=new Set;return t.filter(o=>{let n=o?.[e];return r.has(n)?!1:(r.add(n),!0)})},Ca=({children:t,previousChildren:e=[],hasKey:r})=>{let o=new Set(e),n=e.length>0,s={};for(let i of t){let{index:a}=Tr({id:i}),c=r&&n&&!o.has(i)?`_${a}`:a;s[c]?s[c].push(i):s[c]=[i]}return Object.values(s)},sg=({children:t,key:e,data:r})=>{if(!t?.length||!r?.length)return[];let o=new Map(t.map(n=>{let{current:s}=Tr({id:n[0]});return[s[e],n]}));return r.map(n=>o.get(n[e])).filter(n=>n!==void 0)};var En=new Map,Ea=(t={})=>{let e=u.getUnivoqueId();return En.set(e,t),e},wa=(t="")=>{let e=En.get(t);return En.delete(t),e??{}};var ig=()=>{En.clear()};var Ia=(t={})=>`${un}="${Ea(t)}"`,Ma=(t,e,r)=>Math.min(Math.max(t,e),r);var tu=({repeatId:t})=>{let e=J.get(t);return e?e.currentData:[]};var Bw="index",No=({observe:t,hasKey:e,key:r="",keyValue:o="",index:n,repeatId:s})=>{let i=tu({repeatId:s}),a=e?i?.find(p=>p[r]===o):i?.[n],c=a,l=a;return new Proxy({},{get(p,h){Pe.setCurrentDependencies(t);let f=tu({repeatId:s}),d=Math.max(f?.length-1,0);if(h===Bw){if(e){let v=f?.findIndex(y=>y[r]===o);return Ma(v,0,d)}return Ma(n,0,d)}return e?(l=c??l,c=f?.find(v=>v[r]===o),c??l):(l=c??l,c=f?.[Ma(n,0,d)],c??l)},set(){return!1}})};var ag=({diff:t,current:e,previousLenght:r,render:o,state:n,repeatId:s})=>{let i=document.createRange();return[...Array.from({length:t}).keys()].map((c,l)=>{let p=e?.[l+r],h=l+r,f=No({observe:n,hasKey:!1,index:h,repeatId:s}),d=o({initialIndex:h,initialValue:p,current:f,sync:()=>""}),v=Bt();it(!0);let y=i.createContextualFragment(d);return it(v),pa({components:ta(),current:p,index:h,observe:n,repeatId:s,key:void 0}),y.firstElementChild}).filter(c=>c!==null)},Vw=({initialIndex:t,initialValue:e,state:r,repeatId:o})=>`${Ur}="${vn({current:e,index:t})}"
    ${Gr}="${r}" ${br}="${o}"`,cg=({diff:t,previousLenght:e,current:r,state:o,repeatId:n,render:s})=>[...Array.from({length:t}).keys()].map((i,a)=>{let c=a+e,l=r?.[c]?{...r?.[c]}:{},p=No({observe:o,hasKey:!1,index:c,repeatId:n});return s({sync:()=>Vw({initialIndex:c,initialValue:l,repeatId:n,state:o}),initialIndex:c,initialValue:l,current:p})}).join(""),lg=({currentValue:t,index:e,state:r,repeatId:o,key:n,keyValue:s,render:i})=>{let a=No({observe:r,hasKey:!0,key:n,keyValue:s,index:e,repeatId:o}),c=Bt();it(!0);let l=document.createRange().createContextualFragment(i({initialIndex:e,initialValue:t,current:a,sync:()=>""}));return it(c),pa({components:ta(),current:t,index:e,observe:r,repeatId:o,key:s}),l.firstElementChild},Ww=({keyValue:t,index:e,currentValue:r,state:o,repeatId:n})=>` ${"key"}="${t}"
    ${Gr}="${o}"
    ${Ur}="${vn({current:r,index:e})}"
    ${br}="${n}"`,ug=({currentValue:t,index:e,state:r,repeatId:o,key:n,keyValue:s,render:i})=>{let a={...t},c=No({observe:r,hasKey:!0,key:n,keyValue:s,index:e,repeatId:o});return i({initialIndex:e,initialValue:a,current:c,sync:()=>Ww({currentValue:a,index:e,keyValue:s,repeatId:o,state:r})})},pg=({currentUnique:t,render:e,observe:r,repeatId:o,key:n="",hasKey:s})=>{let i=document.createRange();return t.map((c,l)=>{let p=No({observe:r,hasKey:s,key:n,keyValue:s?c?.[n]:"",index:l,repeatId:o}),h=Bt();it(!0);let f=i.createContextualFragment(e({initialIndex:l,initialValue:c,current:p,sync:()=>""}));return it(h),pa({components:ta(),current:c,index:l,observe:r,repeatId:o,key:s?c?.[n]:""}),f.firstElementChild}).filter(c=>c!==null)},mg=({currentUnique:t,key:e="",observe:r,repeatId:o,hasKey:n,render:s})=>t.map((a,c)=>{let l=()=>`${Ur}="${vn({current:a,index:c})}"
                            ${"key"}="${n?a?.[e]:""}"
                            ${Gr}="${r}"
                            ${br}="${o}"`,p=No({observe:r,hasKey:n,key:e,keyValue:n?a?.[e]:"",index:c,repeatId:o});return s({sync:l,initialIndex:c,initialValue:a,current:p})}).join("");var ka=({repeatId:t,id:e})=>{let r=J.get(t);if(!r)return;let{element:o,observed:n}=r;if(!o)return;let s=[...o.children],a=Yt(e)[n];J.set(t,{...r,nativeDOMChildren:s.map((c,l)=>({index:l,value:a[l],element:c}))})},Rs=({repeatId:t})=>{let e=J.get(t);if(!e)return[];let{nativeDOMChildren:r}=e;return r};var wn=({repeatId:t,currentData:e})=>{let r=J.get(t);r&&J.set(t,{...r,currentData:e})};var jw=({element:t,container:e})=>{let r=Nh(t);e.insertAdjacentHTML("beforeend",`<!-- ${r} --> `)},hg=({state:t="",current:e=[],previous:r=[],repeaterParentElement:o=document.createElement("div"),key:n="",id:s="",render:i,repeatId:a,useSync:c})=>{let l=xa({data:e,key:n});wn({repeatId:a,currentData:l});let p=rg(r,l,n),h=p.map(T=>Hl({keyValue:T?.[n],repeatId:a})).filter(T=>T.length>0),f=h.length>0;h.forEach(T=>{let S=T[0].element,_=T[0].id;if(!_)return;let w=Ms({id:_}),x=w??S;eo({id:s,invalidateParent:x}),Zr({id:s,repeatParent:x}),T.forEach(({id:E})=>{st({id:E})}),w&&w.remove()}),f||Rs({repeatId:a}).filter(_=>p.map(w=>w?.[n]).includes(_.value?.[n])).forEach(_=>{let{element:w}=_;eo({id:s,invalidateParent:w}),Zr({id:s,repeatParent:w}),Zt({id:s,container:w})});let d=og(l,r,n).map(({keyValue:T,isNewElement:S,index:_})=>{if(S)return{keyValue:T,isNewElement:S,index:_,wrapper:void 0};let w=Hl({keyValue:T,repeatId:a}),x=w[0]?.element?Ms({id:w[0]?.id??""}):Rs({repeatId:a}).find(I=>I.value?.[n]===T)?.element;return{keyValue:T,isNewElement:S,index:_,persistentElement:w,persistentDOMwrapper:x}});o.replaceChildren();let v=document.createRange(),y=new DocumentFragment;return d.forEach(({isNewElement:T,keyValue:S,index:_,persistentElement:w,persistentDOMwrapper:x})=>{if(!T){let{debug:A}=Mt();x&&y.append(x);let $=w?.[0]?.element;!x&&$&&(y.append($),A&&jw({element:w[0]?.element,container:o}));return}let E=l?.[_],I=c?ug({currentValue:E,index:_,state:t,repeatId:a,key:n,keyValue:S,render:i}):lg({currentValue:E,index:_,state:t,repeatId:a,key:n,keyValue:S,render:i}),P=Bt();if(it(!0),c){let A=v.createContextualFragment(I);y.append(A)}!c&&I&&y.append(I),it(P)}),o.append(y),l};var zw=t=>{let e=t.lastElementChild;if(!e)return;let r=e.nextSibling;for(;r;){let o=r.nextSibling;r.nodeType===Node.COMMENT_NODE&&r.remove(),r=o}},dg=({state:t="",current:e=[],previous:r=[],repeaterParentElement:o=document.createElement("div"),render:n,repeatId:s,id:i,useSync:a,currentChildren:c})=>{wn({repeatId:s,currentData:e});let l=e.length,p=r.length,h=l-p;if(h>0){let f=a?cg({diff:h,previousLenght:p,current:e,state:t,repeatId:s,render:n}):ag({diff:h,current:e,previousLenght:p,render:n,state:t,repeatId:s});a&&Kr({stringDOM:f,parent:o,position:"beforeend"}),a||ws({elements:f,parent:o,position:"beforeend"})}if(h<0){let f=Ca({children:c,hasKey:!1});f.filter((S,_)=>_>=e.length).forEach(S=>{S.forEach(_=>{let w=ua({id:_}),x=Ms({id:_}),E=x??w;eo({id:i,invalidateParent:E}),Zr({id:i,repeatParent:E}),st({id:_}),x&&x.remove()})});let{debug:v}=Mt();if(v&&zw(o),f.length>0)return e;let y=Rs({repeatId:s});if(!y)return e;y.filter(({index:S})=>S>=e.length).forEach(S=>{let{element:_}=S;eo({id:i,invalidateParent:_}),Zr({id:i,repeatParent:_}),Zt({id:i,container:_}),_.remove()})}return e};var fg=async({state:t="",persistent:e,repeaterParentElement:r=document.createElement("div"),current:o=[],previous:n=[],key:s="",id:i,render:a,repeatId:c,useSync:l,currentChildren:p=[]})=>{let d=(ng({current:o,previous:n,key:s})?hg:dg)({state:t,current:o,previous:n,repeaterParentElement:r,key:s,id:i,render:a,repeatId:c,useSync:l,currentChildren:p});return fe.set(ut,{element:r,persistent:e,source:dh},{emit:!1}),await fe.emitAsync(ut),sn(),d};var gg=({state:t="",setState:e,persistent:r=!1,watch:o,clean:n=!1,beforeUpdate:s,afterUpdate:i,key:a="",id:c="",repeatId:l="",render:p,useSync:h=!1})=>{let f=ua({id:c});return Jl({id:l}),i(),o(t,async(v,y)=>{if(!u.checkType(Array,v))return;let T=ma({id:l}),S=Tn({state:t,componentId:c,moduleId:l,type:Fl}),_=Md({state:t,componentId:c,repeatId:l,type:Fl});if(ln({id:c,prop:t}),eg({id:c,state:t,container:T})){zr({id:c,prop:t}),e(t,y,{emit:!1}),S(),_();return}let x=Cs({repeatId:l});f&&await s(),n&&(x.forEach(R=>{st({id:R})}),T&&(T.textContent="")),T&&Qf({id:c,state:t,container:T});let E=await fg({state:t,persistent:r,repeaterParentElement:T??document.createElement("div"),current:v,previous:n?[]:y,key:a,id:c,render:p,repeatId:l,useSync:h,currentChildren:n?[]:x}),I=Cs({repeatId:l}),P=!!a,A=Ca({children:I,previousChildren:x,hasKey:P}),$=P?[...sg({children:A,key:a,data:E})]:A,N=P?new Map(v.map((R,O)=>[`${R?.[a]}`,O])):new Map;$.forEach((R,O)=>{let D=E?.[O];if(!D)return;let k=P?N.get(`${D?.[a]}`)??-1:O;R.forEach(L=>{ha({id:L,value:{current:D,index:k}})})}),u.useNextLoop(async()=>{f&&i(),Zf({id:c,state:t,container:T}),zr({id:c,prop:t}),S(),_(),Sa({invalidateParent:T,id:c}),_a({repeatParent:T,id:c}),$.length===0&&ka({repeatId:l,id:c})})})};var bg=({repeatId:t,persistent:e,state:r,setState:o,emit:n,watch:s,clean:i,beforeUpdate:a,afterUpdate:c,key:l,id:p,render:h,useSync:f})=>{let d=gg({state:r,setState:o,persistent:e,emit:n,watch:s,clean:i,beforeUpdate:a,afterUpdate:c,key:l,id:p,repeatId:t,render:h,useSync:f});Kf({repeatId:t,unsubscribe:d})};var vg=({repeatId:t,initializeModule:e})=>{let r=J.get(t);r&&J.set(t,{...r,initializeModule:e,unsubscribe:()=>{}})};var yg=({repeatId:t})=>{let e=J.get(t);e&&J.set(t,{...e,initialized:!0,initializeModule:()=>{}})};var Tg=({repeatId:t,initialDOMRender:e})=>{let r=J.get(t);r&&J.set(t,{...r,initialRenderWithoutSync:e})};var _g=({repeatId:t,scopeId:e,observe:r})=>{J.set(t,{element:void 0,initialized:!1,scopeId:e,observed:r,nativeDOMChildren:[],componentChildren:[],currentData:[],initialRenderWithoutSync:[],initializeModule:()=>{},unsubscribe:()=>{}})};var Sg=({repeatId:t,scopeId:e})=>{let r=rt.get(e)??[];rt.set(e,[...r,{repeatId:t}])};var xg=({invalidateId:t,scopeId:e})=>{let r=tt.get(e)??[];tt.set(e,[...r,{invalidateId:t}])};var Cg=({getState:t,setState:e,updateState:r,getProxi:o,emit:n,emitAsync:s,computed:i,watch:a,id:c,key:l,bindEventsId:p,debug:h})=>({bindEventsId:p,key:l,id:c,getState:t,setState:e,updateState:r,getProxi:o,emit:n,emitAsync:s,computed:i,watch:a,debug:h,repeatIdArray:[],renderComponent:async({attachTo:d,component:v,position:y="afterbegin",clean:T=!0})=>{T&&(Zt({id:c,container:d}),d.textContent=""),d.insertAdjacentHTML(y,v),fe.set(ut,{element:d,persistent:Ui(c),source:gh},{emit:!1}),await fe.emitAsync(ut),sn()},getChildren:d=>zi({id:c,componentName:d}),freezeProp:d=>{let v=Pe.extractkeyFromProp(d);return ln({id:c,prop:v.toString()})},unFreezeProp:d=>{let v=Pe.extractkeyFromProp(d);return zr({id:c,prop:v.toString()})},unBind:()=>Ef({id:c}),bindProps:d=>{let v="props"in d?d:{props:d};return`${Xi}="${wf({...v,parentId:c})}" `},staticProps:d=>` ${un}="${Ea(d)}" `,remove:()=>{st({id:c})},removeDOM:d=>{Zt({id:c,container:d}),d.textContent=""},getParentId:()=>Ss(c),watchParent:(d,v)=>{let y=Et(Ss(c),d,v);y&&ba({id:c,unWatchArray:[y]})},onMount:d=>bf({id:c,cb:d}),bindEvents:d=>`${Ki}="${Sf(d)}"`,delegateEvents:d=>`${Xt}="${Wf(d)}"`,bindEffect:d=>`${pn}="${Pf({data:d,id:c})}"`,addMethod:(d,v)=>{$h({id:c,name:d,fn:v})},setRef:d=>`${Kt}="${c}" ${vr}="${d}"`,getRef:()=>Lf({id:c}),getRefs:()=>Ql({id:c}),bindText:(d,...v)=>{let y=u.getUnivoqueId(),T=()=>Ad(c,d,...v);return kd(y,{id:c,render:T,props:v}),`<mobjs-bind-text ${Io}="${c}" ${Ji}="${y}"></mobjs-bind-text>${T()}`},bindObject:(d,...v)=>{let y=Bd(v),T=u.getUnivoqueId(),S=()=>Vd(d,...v);return Dd(T,{id:c,keys:y,render:S}),`<mobjs-bind-object ${Io}="${c}" ${Yi}="${T}"></mobjs-bind-object>${S()}`},invalidate:({observe:d,render:v,beforeUpdate:y=()=>Promise.resolve(),afterUpdate:T=()=>{}})=>{let S=qf(d),_=u.getUnivoqueId(),w=`${Qi}=${_}`,x=()=>v(),E=!1;return xg({invalidateId:_,scopeId:c}),Xf({invalidateId:_,scopeId:c,observe:S}),Jf({invalidateId:_,initializeModule:()=>{E||(Gf({observe:S,watch:a,beforeUpdate:y,afterUpdate:T,persistent:Ui(c),id:c,invalidateId:_,renderFunction:x}),E=!0,Yf({invalidateId:_}))}}),`<mobjs-invalidate ${w} style="display:none;"></mobjs-invalidate>${x()}`},repeat:({observe:d,clean:v=!1,beforeUpdate:y=()=>Promise.resolve(),afterUpdate:T=()=>{},key:S="",render:_,useSync:w=!1})=>{let x=Pe.extractkeyFromProp(d),E=u.getUnivoqueId(),I=S!=="";Sg({repeatId:E,scopeId:c}),_g({repeatId:E,scopeId:c,observe:x});let P=t()?.[x],A=I?xa({data:P,key:S}):P;wn({repeatId:E,currentData:A});let $=w?mg({currentUnique:A,key:S,observe:x,repeatId:E,hasKey:I,render:_}):"",N=w?[]:pg({currentUnique:A,render:_,observe:x,repeatId:E,key:S,hasKey:I}),R=!1;return Tg({repeatId:E,initialDOMRender:N}),vg({repeatId:E,initializeModule:()=>{R||(bg({repeatId:E,persistent:Ui(c),state:x,setState:e,emit:n,watch:a,clean:v,beforeUpdate:y,afterUpdate:T,key:S,id:c,render:_,useSync:w}),R=!0,yg({repeatId:E}),Yh({repeatId:E})||ka({repeatId:E,id:c}))}}),`<mobjs-repeat ${Zi}="${E}" style="display:none;"></mobjs-repeat>${$}`}});var ru=({componentName:t,currentProps:e={}})=>{let o=Ro()?.[t]?.componentParams?.exportState??[];return Object.fromEntries(Object.entries(e).filter(([n])=>o.includes(n)))};var Eg=({element:t})=>{let e=t.getId(),r=t.getInstanceName(),o=qi({element:t}),n=t.getStaticPropsId(),s=t.getDynamicPropsid(),i=t.getBindEventsId(),a=t.getRepeatValue(),c=t.getComponentRepeatId(),l=t.getCurrentKey()??"",p=t.getComponentName(),h=n?.split(" ").join(""),f=wa(h),d={...t.dataset},v=t.getRepeaterPropBind(),y=mf(a);return{element:t,props:{...ru({componentName:p,currentProps:d}),...ru({componentName:p,currentProps:f})},id:e,componentName:p,instanceName:r,key:l,dynamicPropsId:s,repeatPropBind:v,bindEventsId:i,currentRepeatValue:y,parentId:o,componentRepeatId:c}};var wg=t=>{cn.add(t)};var Ig=({element:t,instanceName:e="",props:r={},state:o={},bindStore:n,methods:s={},key:i="",currentRepeaterState:a=Qt,repeaterInnerWrap:c,repeatPropBind:l="",componentRepeatId:p="",parentPropsWatcher:h=[()=>{}],refs:f={},destroy:d=()=>{},freezedPros:v=[],persistent:y=!1,child:T={},parentId:S="",id:_="",componentName:w=""})=>{let x=u.createStore(o);Wh({props:r,store:x}),n&&x.bindStore(n),y||wg(_),p&&p.length>0&&qh({componentId:_,repeatId:p}),e&&e.length>0&&wh({instanceName:e,id:_});let E=Ud({componentName:w}),I=new Set(E);return x.setProxiReadOnlyProp(E),j.set(_,{element:t,componentName:w,instanceName:e,destroy:d,parentPropsWatcher:h,refs:f,methods:s,key:i,currentRepeaterState:a,repeaterInnerWrap:c,repeatPropBind:l,componentRepeatId:p,persistent:y,id:_,parentId:S,freezedPros:v,child:T,state:x}),{getState:()=>x.get(),setState:(P="",A={},{emit:$=!0}={})=>{let N=wo({id:_,prop:P}),R=Pe.extractkeyFromProp(P),O=I.has(R);O&&Gi({prop:R,componentName:w,action:"updateState"}),!(N||O)&&x.set(R,A,{emit:$??!0,usePropAsString:!0})},updateState:(P="",A=()=>({}),{emit:$=!0,clone:N=!1}={})=>{let R=wo({id:_,prop:P}),O=Pe.extractkeyFromProp(P),D=I.has(O);D&&Gi({prop:O,componentName:w,action:"updateState"}),!(R||D)&&x.update(O,A,{emit:$??!0,clone:N??!1,usePropAsString:!0})},getProxi:()=>x.getProxi(),emit:(P="")=>x.emit(P),emitAsync:async(P="")=>await x.emitAsync(P),computed:(P="",A=()=>{},$=[])=>{let N=Pe.extractkeyFromProp(P);if(I.has(N)){Gi({prop:N,componentName:w,action:"computed"});return}return x.computed(N,A,$,{usePropAsString:!0})},watch:(P="",A=()=>{},{wait:$=!1,immediate:N=!1}={})=>x.watch(P,A,{wait:$??!1,immediate:N??!1}),debug:()=>x.debug()}};var Mg=({id:t})=>(tt.get(t)??[]).map(({invalidateId:r})=>{let o=Te.get(r);if(o)return{invalidateId:r,initializeModule:o.initializeModule}}).filter(r=>r!==void 0);var kg=({id:t})=>(rt.get(t)??[]).map(({repeatId:r})=>{let o=J.get(r);if(o)return{repeatId:r,initializeModule:o.initializeModule}}).filter(r=>r!==void 0);var Rg=async({element:t,persistent:e=!1,source:r=Wr})=>{let{debug:o}=Mt();o&&console.log("parse source:",r);let n=Ro(),s=[],i=Vl(t);for(;i;){let c=i.getComponentName(),l=n?.[c]?.componentFunction,p=n?.[c]?.componentParams,{scoped:h,bindStore:f}=p,{props:d,id:v,componentName:y,instanceName:T,key:S,dynamicPropsId:_,currentRepeatValue:w,bindEventsId:x,parentId:E,componentRepeatId:I,repeatPropBind:P}=Eg({element:i}),A=p?.state??{},{getState:$,setState:N,updateState:R,getProxi:O,emit:D,emitAsync:k,computed:L,watch:C,debug:M}=Ig({element:i,props:d,state:A,id:v,componentName:y,instanceName:T,key:S,repeatPropBind:P,persistent:e,parentId:E,componentRepeatId:I,bindStore:f});jh({id:v}),I&&I?.length>0&&(ha({id:v,value:w}),yf({id:v,repeatId:I,element:i})),If({propsId:_,repeatPropBind:P,componentId:v});let B=Cg({getState:$,setState:N,updateState:R,getProxi:O,emit:D,emitAsync:k,computed:L,watch:C,id:v,key:S,bindEventsId:x,debug:M}),V=await l(B),F=i.classList,{newElement:z}=hf({content:V,element:i});if(dd(),F.length>0&&z?.classList.add(...F),!z)return;sf({id:v,newElement:z});let te=Mg({id:v}),ae=kg({id:v});x&&xf({element:z,componentId:v,bindEventsId:x});let q=h??Mt().scoped;q&&await ql({id:v,element:z}),z?.inizializeCustomComponent?.(B),s.push({onMount:async()=>{q||await ql({id:v,element:z})},initializeBindPropsWatcher:()=>{Xl({componentId:v,repeatPropBind:P,inizilizeWatcher:!0})},fireInvalidateFunction:te.length>0?()=>{te.forEach(({initializeModule:re})=>{re?.()})}:()=>{},fireRepeatFunction:ae.length>0?()=>{ae.forEach(({initializeModule:re})=>{re?.()})}:()=>{}}),i=Vl(t);let ne=Gl()===Mt().maxParseIteration;if(df(),ne){console.warn(`dom parse reached max parse limit: ${Gl()}`);break}}let a=Of({element:t});Object.keys(a).length>0&&$f(a);for(let c of s.toReversed()){let{onMount:l,initializeBindPropsWatcher:p,fireInvalidateFunction:h,fireRepeatFunction:f}=c;await l(),f(),h(),p()}s.length=0,i=null,jf(t),Af(t),Od(),Wd()};var Ns=async({element:t,persistent:e=!1,source:r=Wr})=>{await Rg({element:t,persistent:e,source:r}),ff()},Ng=()=>{fe.watch(ut,async({element:t,persistent:e=!1,source:r=Wr})=>{await Ns({element:t,persistent:e,source:r})})};var Pg=()=>{ig(),Cf(),Mf()};var Ag,Og,$g=({fn:t})=>{t&&(Og=t)},Lg=({fn:t})=>{t&&(Ag=t)},Dg=()=>Og,Fg=()=>Ag;var Bg=!0,Vg=t=>{Bg=t},Wg=()=>Bg;var jg=()=>{for(let t of cn)st({id:t})};var zg=new Map,Hg=({route:t,params:e})=>Object.entries(e).reduce((r,[o,n])=>`${r}-${o}-${n}`,t),Ug=async({route:t="",templateName:e="",isBrowserNavigation:r=!1,params:o={},skipTransition:n})=>{fe.set(qt,!0),await _r();let s=Hi();if(!s||!(s instanceof HTMLElement))return;let{activeRoute:i,activeParams:a}=fe.get(),c=Hg({route:t,params:o}),l=Hg({route:i.route,params:a}),p=window.scrollY;zg.set(l,p);let h=zg.get(c)??0;fe.set(Eo,{currentRoute:i.route,currentTemplate:i.templateName,nextRoute:t,nextTemplate:e});let f=!1,d=fe.watch(Eo,()=>{f=!0});Pg(),fe.set(rn,{route:t,templateName:e}),fe.set(on,o);let v=bn({hash:t}),y=n||v?.skipTransition,T=v?.props??{},S=await v?.layout?.({params:o,props:T})??"",_=Dg(),w=s.cloneNode(!0);_&&w&&!y&&(await _({oldNode:w,oldRoute:i.route,newRoute:t,oldTemplateName:i.templateName,newTemplateName:e}),s?.parentNode?.insertBefore(w,s)),s.replaceChildren(),jg(),Kr({stringDOM:S,parent:s,position:"afterbegin"}),await Ns({element:s}),y||(s.style.visibility=""),f||fe.set(nn,{currentRoute:t,currentTemplate:e,previousRoute:i.route,previousTemplate:i.templateName}),Wg()&&r?scrollTo(0,h):scrollTo(0,0),document.body.dataset.route=t,document.body.dataset.template=e;let x=Fg();x&&!y&&(await x({oldNode:w,newNode:s,oldRoute:i.route,newRoute:t,oldTemplateName:i.templateName,newTemplateName:e}),w.remove()),w=null,d?.(),fe.set(qt,!1)};var Gg=({route:t})=>t,qg=t=>{Gg=t},Jg=({route:t})=>{let e=Gg({route:t});return{route:e,isRedirect:e!==t}};var Yg=({hash:t=""})=>{let e=la(),r=nf();return t===""?e:bn({hash:t})?t:r},Xg=({hash:t=""})=>bn({hash:t})?.templateName??"",Kg=({hash:t=""})=>bn({hash:t})?.restoreScroll??!0;var Qg="",Zg=!0,Sr="",eb="",to,ou,Ps,nu=t=>t.replace("?","").replace("/",""),tb=t=>t.replace("#","").replace("/","").replace(".",""),Hw=t=>t.split("&").reduce((e,r)=>{let o=r.split("="),n=nu(o?.[0]??""),s=o?.[1];return n&&n.length>0?{...e,[n]:s}:e},{}),Uw=t=>t&&Object.entries(t).reduce((e,[r,o],n)=>`${e}${n===0?"":"&"}${r}=${o}`,"");document.addEventListener("click",t=>{if(!t.target)return;t.target.closest("a")&&fe.getProp(qt)&&t.preventDefault()},{passive:!1});var Ra=async({shouldLoadRoute:t=!0}={})=>{let e=globalThis.location.hash,r={hash:e},{routeIsLoading:o}=fe.get();if(o){globalThis.location.hash=Qg.replace("#","");return}Ps||history.replaceState({nextId:r},"",e);let{route:n,isRedirect:s}=Jg({route:e});s&&history.replaceState({nextId:r},"",`#${n}`);let i=n.split("?"),a=nu(i?.[1]??"");eb=Sr,Sr=tb(i?.[0]??"");let c=Hw(to??a),l=to||Object.keys(a).length>0?`?${to??a}`:"";to=void 0;let p=Yg({hash:Sr}),h=Xg({hash:Sr&&Sr.length>0?Sr:la()}),f=Sr===eb&&l.length===0&&!Zg;t&&!f&&(Qg=`#${Sr}${l}`,await Ug({route:p,templateName:h,isBrowserNavigation:Kg({hash:Sr})&&!!Ps,params:c,skipTransition:!!(Ps??ou)})),t||(fe.set(rn,{route:p,templateName:h}),fe.set(on,c)),ou=void 0,u.useNextLoop(()=>{Zg=!1})},rb=()=>{Ra(),globalThis.history.scrollRestoration="manual",globalThis.addEventListener("popstate",t=>{Ps=t?.state?.nextId}),globalThis.addEventListener("hashchange",async()=>{await Xr(),Ra()})},ob=({url:t,params:e,skipTransition:r})=>{if(!t||fe.getProp(qt))return;ou=r;let o=t.split("?"),n=tb(o?.[0]??""),s=Uw(e),i=nu(o?.[1]??""),a=s??i;to=a.length>0?a:"",Ps=void 0,globalThis.location.hash=to&&to.length>0?`${n}?${to}`:n,globalThis.dispatchEvent(new HashChangeEvent("hashchange"))};var nb=async({rootId:t,wrapper:e,contentId:r,routes:o=[],afterInit:n=()=>{},redirect:s=({route:f})=>f,index:i="home",pageNotFound:a="pageNotFound",beforePageTransition:c,pageTransition:l,restoreScroll:p=!0,componentDefaultProps:h={scoped:!1,maxParseIteration:1e4,debug:!1}})=>{Yd(h);let f=document.querySelector(t),d=await e();qg(s),!(!r||!f)&&(Ch({contentId:r}),Ff({element:f}),Lg({fn:l}),$g({fn:c}),Vg(p),Ng(),Hd(),tf(o),rf({hash:i}),of({hash:a}),Kr({stringDOM:d,parent:f,position:"afterbegin"}),Eh(),Ra({shouldLoadRoute:!1}),await Ns({element:f,persistent:!0}),u.useFrameIndex(()=>{u.useNextTick(()=>{n()})},5),rb())};var sb=()=>Te.size;var ib=()=>J.size;var ue={};To(ue,{clamp:()=>ot,getDefault:()=>yI,mq:()=>SI,printDefault:()=>TI,setDefault:()=>vI,useVelocity:()=>_I});var Po={default:{tension:20,mass:1,friction:5,velocity:0,precision:.01},gentle:{tension:120,mass:1,friction:14,velocity:0,precision:.01},wobbly:{tension:180,mass:1,friction:12,velocity:0,precision:.01},bounce:{tension:200,mass:3,friction:5,velocity:0,precision:.01},scroller:{tension:10,mass:1,friction:5,velocity:0,precision:.5}};var ge={easeLinear:"easeLinear",easeInQuad:"easeInQuad",easeOutQuad:"easeOutQuad",easeInOutQuad:"easeInOutQuad",easeInCubic:"easeInCubic",easeOutCubic:"easeOutCubic",easeInOutCubic:"easeInOutCubic",easeInQuart:"easeInQuart",easeOutQuart:"easeOutQuart",easeInOutQuart:"easeInOutQuart",easeInQuint:"easeInQuint",easeOutQuint:"easeOutQuint",easeInOutQuint:"easeInOutQuint",easeInSine:"easeInSine",easeOutSine:"easeOutSine",easeInOutSine:"easeInOutSine",easeInExpo:"easeInExpo",easeOutExpo:"easeOutExpo",easeInOutExpo:"easeInOutExpo",easeInCirc:"easeInCirc",easeOutCirc:"easeOutCirc",easeInOutCirc:"easeInOutCirc",easeInElastic:"easeInElastic",easeOutElastic:"easeOutElastic",easeInOutElastic:"easeInOutElastic",easeInBack:"easeInBack",easeOutBack:"easeOutBack",easeInOutBack:"easeInOutBack",easeInBounce:"easeInBounce",easeOutBounce:"easeOutBounce",easeInOutBounce:"easeInOutBounce"},$s="min",ab="max",iu="desktop",Ls="easeLinear",As="default",au={xSmall:320,small:360,medium:600,tablet:768,desktop:992,large:1200,xLarge:1600,xxLarge:1980},cu=10,Os=.06,lu="#ff0000",uu="#14df3b",pu=8,mu=10,hu=1e3,du=!1,qw=!1,Jw=!1,Yw=.01,Xw=.06,cb=t=>{let e=qe({prop:"deferredNextTick",value:t?.deferredNextTick,defaultValue:u.store.getProp("deferredNextTick"),type:Boolean}),r=qe({prop:"usePassive",value:t?.usePassive,defaultValue:u.store.getProp("usePassive"),type:Boolean}),o=qe({prop:"throttle",value:t?.throttle,defaultValue:u.store.getProp("throttle"),type:Number}),n=Kw(t?.mq??{}),s=qe({prop:"defaultMq.value",value:t?.defaultMq?.value,defaultValue:iu,type:String}),i=qe({prop:"defaultMq.type",value:t?.defaultMq?.type,defaultValue:$s,type:String}),a=qe({prop:"sequencer.duration",value:t?.sequencer?.duration,defaultValue:cu,type:Number}),c=su(t?.sequencer?.ease,"sequencer"),l=qe({prop:"scrolTrigger.springConfig",value:t?.scrollTrigger?.springConfig,defaultValue:As,type:String}),p=qe({prop:"scrolTrigger.lerpConfig",value:t?.scrollTrigger?.lerpConfig,defaultValue:Os,type:Number}),h=qe({prop:"scrolTrigger.markerColor.startEnd",value:t?.scrollTrigger?.markerColor?.startEnd,defaultValue:lu,type:String}),f=qe({prop:"scrolTrigger.markerColor.item",value:t?.scrollTrigger?.markerColor?.item,defaultValue:uu,type:String}),d=qe({prop:"parallax.defaultRange",value:t?.parallax?.defaultRange,defaultValue:pu,type:Number}),v=qe({prop:"parallax.springConfig",value:t?.parallax?.springConfig,defaultValue:As,type:String}),y=qe({prop:"parallax.lerpConfig",value:t?.parallax?.lerpConfig,defaultValue:Os,type:Number}),T=qe({prop:"parallaxTween.duration",value:t?.parallaxTween?.duration,defaultValue:mu,type:Number}),S=su(t?.parallaxTween?.ease,"parallaxTween"),_=qe({prop:"tween.duration",value:t?.tween?.duration,defaultValue:hu,type:Number}),w=su(t?.tween?.ease,"tween"),x=qe({prop:"tween.relative",value:t?.tween?.relative,defaultValue:du,type:Boolean}),E=qe({prop:"spring.relative",value:t?.spring?.relative,defaultValue:qw,type:Boolean}),I=qe({prop:"lerp.relative",value:t?.lerp?.relative,defaultValue:Jw,type:Boolean}),P=qe({prop:"lerp.precision",value:t?.lerp?.precision,defaultValue:Yw,type:Number}),A=qe({prop:"lerp.velocity",value:t?.lerp?.velocity,defaultValue:Xw,type:Number});return{deferredNextTick:e,throttle:o,usePassive:r,mq:n,defaultMq:{value:s,type:i},sequencer:{duration:a,ease:c},scrollTrigger:{springConfig:l,lerpConfig:p,markerColor:{startEnd:h,item:f}},parallax:{defaultRange:d,springConfig:v,lerpConfig:y},parallaxTween:{duration:T,ease:S},tween:{duration:_,ease:w,relative:x},spring:{relative:E,config:t?.spring?.config?{...Po,...t.spring.config}:Po},lerp:{relative:I,precision:P,velocity:A}}},qe=({prop:t,value:e,defaultValue:r,type:o})=>{let n=u.checkType(o,e);return n||console.warn(`handleSetUp error: ${t}: ${e}, is not valid must be a ${u.getTypeName(o)}`),n?e:r},Kw=t=>{let e=u.checkType(Object,t)&&Object.values(t).every(r=>u.checkType(Number,r));return e||console.warn("handleSetUp error: mq must be an object as { ..., String: Number }"),e?t:au},su=(t,e)=>{let r=Object.keys(ge).includes(t);return!r&&t!==void 0&&t!==null&&console.warn(`handleSetUp error: ${e}.ease properties is not valid`),r?t:Ls};var at=(t,e,r=!0)=>{t=(n=>{let s;try{s=JSON.parse(JSON.stringify(n))}catch{s=Object.assign({},n)}return s})(t);let o=n=>n&&typeof n=="object";return!o(t)||!o(e)?e:(Object.keys(e).forEach(n=>{let s=t[n],i=e[n];Array.isArray(s)&&Array.isArray(i)?r?(t[n]=s.map((a,c)=>i.length<=c?a:at(a,i[c],r)),i.length>s.length&&(t[n]=t[n].concat(i.slice(s.length)))):t[n]=s.concat(i):o(s)&&o(i)?t[n]=at(Object.assign({},s),i,r):t[n]=i}),t)};function lb(){return{deferredNextTick:u.store.getProp("deferredNextTick"),throttle:u.store.getProp("throttle"),usePassive:u.store.getProp("usePassive"),mq:au,defaultMq:{value:iu,type:$s},sequencer:{duration:cu,ease:Ls},scrollTrigger:{springConfig:As,lerpConfig:Os,markerColor:{startEnd:lu,item:uu}},parallax:{defaultRange:pu,springConfig:As,lerpConfig:Os},parallaxTween:{duration:mu,ease:Ls},tween:{duration:hu,ease:Ls,relative:du},spring:{relative:!1,config:Po},lerp:{relative:!1,precision:.01,velocity:.06}}}var he=(()=>{let t=lb();return{set:n=>{t=cb(at(lb(),n)),"usePassive"in n&&u.store.set("usePassive",t.usePassive),"deferredNextTick"in n&&u.store.set("deferredNextTick",t.deferredNextTick),"throttle"in n&&u.store.set("throttle",t.throttle)},get:n=>(n in t||console.warn(`handleSetUp: ${n} is not a setup propierties`),t[n]),print:()=>{console.log("Writable props:"),console.log(t)}}})();var Qw=(t="desktop")=>window.innerWidth<he.get("mq")[t],Zw=(t="desktop")=>window.innerWidth>=he.get("mq")[t],eI=(t="desktop")=>he.get("mq")[t],ve={max:Qw,min:Zw,getBreackpoint:eI};var _e=t=>{if(u.checkType(Number,t))return Math.round(t*1e4)/1e4||0;if(Math.abs(t)<1){let e=Number.parseInt(t.toString().split("e-")[1]);e&&(t*=Math.pow(10,e-1),t="0."+Array.from({length:e}).join("0")+t.toString().slice(2))}else{let e=Number.parseInt(t.toString().split("+")[1]);e>20&&(e-=20,t/=Math.pow(10,e),t+=Array.from({length:e+1}).join("0"))}return Number.parseFloat(Number.parseFloat(t).toFixed(4))},ot=(t,e,r)=>Math.min(Math.max(t,e),r),ub=(t,e,r)=>(1-r)*t+r*e,ro=(t,e)=>{let r=Object.keys(t).toSorted(),o=Object.keys(e).toSorted();return r.length===o.length&&r.every((n,s)=>n===o[s])},Ds=(t,e)=>{let r=[];for(let o=0;o<t.length;o+=e){let n=t.slice(o,o+e);r.push(n)}return r},pb=(t,e)=>t.map(r=>r[e]);var Na=t=>t.map(e=>(e.settled||(e.fromValue=e.currentValue),e)),xr=t=>t.map(e=>(e.fromValue=e.toValue,e.currentValue=e.toValue,e)),In=t=>t.map(e=>(e.toValue=e.currentValue,e.fromValue=e.currentValue,e)),Cr=(t,e)=>{let r=Object.keys(t);return e.map(o=>{if(r.includes(o.prop)){let n=o.fromValue,s=o.toValue;o.fromValue=s,o.toValue=n}return o})},Mn=(t,e)=>t.map(r=>(r.toValue=e?r.toValue+r.currentValue:r.toValue,r));var fu=(t,e)=>t.map(r=>(r.shouldUpdate&&(r.toValProcessed=e?r.toValue+1e-5:r.toValue-r.fromValue+1e-5),r));var Pa="radial",er="start";var kn="center",Rn="edges",Nn="random",mb="MERGE_FROM_UP",gu="MERGE_FROM_DOWN",Ao="equal",Oo="start";var $o="center",Pn={type:Ao,each:0,waitComplete:!1,from:er,grid:{col:1,row:1,direction:"col"}},Xe={index:0,frame:0};var b={PX:"px",VH:"vh",VW:"vw",WPERCENT:"w",HPERCENT:"h",DEGREE:"deg",PLUS_HEIGHT:"+height",PLUS_HEIGHT_HALF:"+halfHeight",PLUS_WIDTH:"+width",PLUS_WIDTH_HALF:"+halfWidth",MINUS_HEIGHT:"-height",MINUS_HEIGHT_HALF:"-halfHeight",MINUS_WIDTH:"-width",MINUS_WIDTH_HALF:"-halfWidth",POSITION_BOTTOM:"bottom",POSITION_TOP:"top",POSITION_LEFT:"left",POSITION_RIGHT:"right",DIRECTION_VERTICAL:"vertical",DIRECTION_HORIZONTAL:"horizontal",TYPE_PARALLAX:"parallax",TYPE_SCROLLTRIGGER:"scrolltrigger",PROP_VERTICAL:"y",PROP_HORIZONTAL:"x",PROP_ROTATE:"rotate",PROP_ROTATEY:"rotateY",PROP_ROTATEX:"rotateX",PROP_ROTATEZ:"rotateZ",PROP_OPACITY:"opacity",PROP_SCALE:"scale",PROP_SCALE_X:"scaleX",PROP_SCALE_Y:"scaleY",PROP_TWEEN:"tween",TWEEN_TWEEN:"parallaxTween",TWEEN_TIMELINE:"sequencer",ALIGN_START:"start",ALIGN_TOP:"top",ALIGN_RIGHT:"right",ALIGN_CENTER:"center",ALIGN_BOTTOM:"bottom",ALIGN_LEFT:"left",ALIGN_END:"end",IN_STOP:"in-stop",IN_BACK:"in-back",OUT_STOP:"out-stop",OUT_BACK:"out-back",EASE_SPRING:"spring",EASE_LERP:"lerp",EASE_PRECISION:.001,SCROLL_UP:"up",SCROLL_DOWN:"down",ON_LEAVE:"ON_LEAVE",ON_LEAVE_BACK:"ON_LEAVE_BACK",ON_ENTER:"ON_ENTER",ON_ENTER_BACK:"ON_ENTER_BACK",ON_NOOP:"ON_NOOP"};var Er=t=>t.map(e=>`${e} | `).join(""),oo=(t,e,r)=>{console.warn(`${t}: ${JSON.stringify(e)} and to ${JSON.stringify(r)} is not equal`)},kt=t=>{console.warn(`stagger col of grid is out of range, it must be less than ${t} ( staggers length )`)},wr=t=>{console.warn(`tween | sequencer: ${t} is not valid value, must be a number or a Function that return a number`)},hb=t=>{console.warn(`sequencer, start option: ${t} value is not valid, must be a Number`)},db=t=>{console.warn(`sequencer, end option: ${t} value is not valid, must be a Number`)},fb=()=>{console.warn("relative prop is not allowed inside a timeline")},gb=t=>{console.warn(`Timeline Supend: ${t()} is not a valid value, must be a boolean`)},bb=()=>{console.warn("SyncTimeline: in revese ( or yoyo mode) only goTo || goFromTo || set action is allowed. Using goFrom makes no sense in this context. Enable forceFromTo to use from action in reverse mode")},vb=t=>{console.warn(`timeline setTween: ${t} is not an array of tween`)},yb=t=>{console.warn(`timeline setTween: ${t} is not a string`)},Tb=t=>{console.warn(`asyncTimeline.setTween() label: ${t} not found`)},_b=()=>{console.warn("setTween fail")},Sb=t=>{console.warn(`label ${t} not founded`)},xb=t=>{console.warn(`sequencer.add(fn,time) ${t}: fn must be Function`)},Cb=t=>{console.warn(`sequencer.add(fn,time) ${t}: time must be a Number`)},bu=t=>{console.warn(`${t} doesn't exist in spring configuration list`)},Eb=()=>{console.warn("Spring configProps: all prop must be a positive Number")},wb=t=>{console.warn(`Spring config: ${t}: config must have friction/mass/precision/tesnion props and must be a number`)},Lo=t=>{console.warn(`${t} doesn't exist in tweens ease function`)},Aa=()=>{console.warn("stagger each must be a Number ")},Ib=t=>{console.warn(`stagger, row/col: ${t} value is not valid, must be a Number`)},Mb=()=>{console.warn("Stagger error: waitComplete propierties must be a Boolean")},kb=()=>{console.warn("Stagger error: in grid option direction should be a string radial/col/row")};var Rb=()=>{console.warn("Stagger error: in col/row direction 'from' propierties must be a string start/end/center/edges or a number")},Nb=t=>{console.warn(`Stagger error: from: ${t} is not a valid value, must be a string start/end/center/edges or a number or a Object {x:Number,y:Number}`)},Pb=t=>{console.warn(`duration error: ${t} is not valid duration must be a number`)},Ab=t=>{console.warn(`duration error: ${t} is not valid duration must be a number or a Function that return a number`)},Ob=t=>{console.warn(`repeat error: ${t} is not valid repeat value must be a Number`)};var $b=t=>{console.warn(`data inizializiation error; ${t} is not a valid value, must be a string`)},Lb=t=>{console.warn(`data inizializiation error; ${t} is not a valid value, must be a number`)},Db=()=>{console.warn("createStaggers error: items array can not be empty")},Fb=()=>{console.warn("createStaggers error: each element of the array must be an Element or an Object")},Bb=()=>{console.warn(`screateStaggers error: type should be: ${Ao} || ${er} || ${"end"} || ${$o}`)},Vb=t=>{console.warn(`createStagger:  each must be between 1 and ${t}`)},Wb=(t,e)=>{console.warn(`${e}: relative prop: ${t} is not a valid parameter, must be a boolean `)},vu=(t,e)=>{console.warn(`${e}: '${t}' is not Boolean`)},jb=(t,e)=>{console.warn(`${e}: '${t}' is not String`)},zb=(t,e)=>{console.warn(`${e}: '${t}' is not Number`)},Hb=(t,e)=>{console.warn(`${e}: '${t}' is not Function`)},Ub=(t,e)=>{console.warn(`${e}: '${t}' is not a Array`)},Gb=()=>{console.warn("Lerp error: velocity is not valid, must be a Number greater than 0 and less than 1")},qb=()=>{console.warn("Lerp error: precision is not valid, must be a number greater than 0")},On=t=>{console.warn(`asyncTimeline error: ${t} cannot be used inside group`)},Jb=t=>{console.warn(`${t} value must be a string`)},Yb=()=>{console.warn("tween added to asyncTimeline or used inside sync() method must be instance of HandleLerp | HandleTween | HandleSpring")},Xb=()=>{console.warn("asyncTimeline arror: delay must be a Number")},Kb=t=>{console.warn(`${t} not found`)},Qb=t=>{console.warn(`timeline add async function, ${t} is not a function `)},Zb=(t,e)=>{console.warn(`${e} direction: ${t} is not valid value: must be ${b.DIRECTION_VERTICAL} | ${b.DIRECTION_HORIZONTAL}`)},ev=t=>{console.warn(`scrollTrigger error; ${t} propierties: value must be a Object like { position: top|bottom|left|right, value: () => { return Number} } `)},tv=()=>{console.warn("scrollTrigger error; dynamicRange propierties: value must be a Function that return a Number")},rv=()=>{console.warn("parallax|scrolTrigger error: tween is not valid, must be an instance of HandleSequencer || ParallaxTween")},ov=(t,e)=>{console.warn(`parallax error align propierties: ${t} is not valid must be one of ${Er(e)} or a Number between 0 and 100`)},nv=(t,e)=>{console.warn(`parallax error align propierties: ${t} is not valid must be one of ${Er(e)}`)},sv=(t,e)=>{console.warn(`${e}: '${t}' is not Number, must be a number between 0 and 100`)},iv=(t,e)=>{console.warn(`parallax error type propierties: ${t} is not valid must be one of ${Er(e)}`)},av=(t,e)=>{console.warn(`parallax/scrollTrigger error propierties props: ${t} is not valid must be one of ${Er(e)} or a custom css propierites like margin|line-height|...`)},cv=(t,e)=>{console.warn(`parallax error easeType props: ${t} is not valid must be one of ${Er(e)}`)},lv=(t,e,r)=>{console.warn(`${r} error easeType props: ${t} is not valid must be one of ${Er(e)}`)},uv=()=>{console.warn('Scrolltrigger warning: spring animation is only available for native properties and scrollerTween, Check that with the "propierties" property set to "tween" no HandleSequencer is associated with the "tween" property')},pv=(t,e)=>{console.warn(`parallax/scrollTrigger error springConfig props: ${t} is not valid must be one of ${Er(e)}`)},mv=t=>{console.warn(`parallax error range propierties, current value: ${t}, the value must be a number between 0 and 9.99`)},hv=t=>{console.warn(`scrollTrigger error range propierties: ${t} is not a String`)},yu=(t,e,r,o)=>{console.warn(`${o} error ${r} propierties: ${t} is not valid must be one of ${Er(e)}`)},dv=()=>{console.warn("Parallax warning: if propierties is a tween the only choice is ParallaxTween, HandleSequencer or empty tween propierites is not allowed inside a parallax")},fv=()=>{console.warn("parallax/ScrollTrrigger error: velocity is not valid, must be a Number greater than 0 and less than 1")},gv=()=>{console.warn('parallax/ScrollTrrigger warning:  The property is "tween" but no tween has been associated, associate a tween with the "tween" property')},bv=()=>{console.warn('parallax/ScrollTrrigger: there is tween associated but pros "propierties" is not set to "tween"')},vv=(t,e)=>{console.warn(`${t}: ${e} is not a function`)},Tu=(t,e,r)=>{console.warn(`scrollTrigger error range : with '${e}' propierties ${t} is not valid, add one of the following unit misure: ${Er(r)}, es: 45deg|100px|50vw etc..`)},yv=t=>{console.warn(`scrollTrigger error range : with custom css propierties '${t}' no unit misure is necessary, the default unit misure will be used (px). Only '-' for negative value is allowed`)},Tv=(t,e)=>{console.warn(`scrollTrigger error range : with '${e}' propierties ${t} is not valid no unit misure is necessary. Only '-' for negative value is allowed`)};var Vt={[ge.easeLinear]:(t,e,r,o)=>r*t/o+e,[ge.easeInQuad]:(t,e,r,o)=>r*(t/=o)*t+e,[ge.easeOutQuad]:(t,e,r,o)=>-r*(t/=o)*(t-2)+e,[ge.easeInOutQuad]:(t,e,r,o)=>(t/=o/2)<1?r/2*t*t+e:-r/2*(--t*(t-2)-1)+e,[ge.easeInCubic]:(t,e,r,o)=>r*(t/=o)*t*t+e,[ge.easeOutCubic]:(t,e,r,o)=>r*((t=t/o-1)*t*t+1)+e,[ge.easeInOutCubic]:(t,e,r,o)=>(t/=o/2)<1?r/2*t*t*t+e:r/2*((t-=2)*t*t+2)+e,[ge.easeInQuart]:(t,e,r,o)=>r*(t/=o)*t*t*t+e,[ge.easeOutQuart]:(t,e,r,o)=>-r*((t=t/o-1)*t*t*t-1)+e,[ge.easeInOutQuart]:(t,e,r,o)=>(t/=o/2)<1?r/2*t*t*t*t+e:-r/2*((t-=2)*t*t*t-2)+e,[ge.easeInQuint]:(t,e,r,o)=>r*(t/=o)*t*t*t*t+e,[ge.easeOutQuint]:(t,e,r,o)=>r*((t=t/o-1)*t*t*t*t+1)+e,[ge.easeInOutQuint]:(t,e,r,o)=>(t/=o/2)<1?r/2*t*t*t*t*t+e:r/2*((t-=2)*t*t*t*t+2)+e,[ge.easeInSine]:(t,e,r,o)=>-r*Math.cos(t/o*(Math.PI/2))+r+e,[ge.easeOutSine]:(t,e,r,o)=>r*Math.sin(t/o*(Math.PI/2))+e,[ge.easeInOutSine]:(t,e,r,o)=>-r/2*(Math.cos(Math.PI*t/o)-1)+e,[ge.easeInExpo]:(t,e,r,o)=>t===0?e:r*Math.pow(2,10*(t/o-1))+e,[ge.easeOutExpo]:(t,e,r,o)=>t===o?e+r:r*(-Math.pow(2,-10*t/o)+1)+e,[ge.easeInOutExpo]:(t,e,r,o)=>t===0?e:t===o?e+r:(t/=o/2)<1?r/2*Math.pow(2,10*(t-1))+e:r/2*(-Math.pow(2,-10*--t)+2)+e,[ge.easeInCirc]:(t,e,r,o)=>-r*(Math.sqrt(1-(t/=o)*t)-1)+e,[ge.easeOutCirc]:(t,e,r,o)=>r*Math.sqrt(1-(t=t/o-1)*t)+e,[ge.easeInOutCirc]:(t,e,r,o)=>(t/=o/2)<1?-r/2*(Math.sqrt(1-t*t)-1)+e:r/2*(Math.sqrt(1-(t-=2)*t)+1)+e,[ge.easeInElastic]:(t,e,r,o)=>{let n=1.70158,s=0,i=r;return t===0?e:(t/=o)===1?e+r:(s||(s=o*.3),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),-(i*Math.pow(2,10*(t-=1))*Math.sin((t*o-n)*(2*Math.PI)/s))+e)},[ge.easeOutElastic]:(t,e,r,o)=>{let n=1.70158,s=0,i=r;return t===0?e:(t/=o)===1?e+r:(s||(s=o*.3),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),i*Math.pow(2,-10*t)*Math.sin((t*o-n)*(2*Math.PI)/s)+r+e)},[ge.easeInOutElastic]:(t,e,r,o)=>{let n=1.70158,s=0,i=r;return t===0?e:(t/=o/2)===2?e+r:(s||(s=o*(.3*1.5)),i<Math.abs(r)?(i=r,n=s/4):n=s/(2*Math.PI)*Math.asin(r/i),t<1?-.5*(i*Math.pow(2,10*(t-=1))*Math.sin((t*o-n)*(2*Math.PI)/s))+e:i*Math.pow(2,-10*(t-=1))*Math.sin((t*o-n)*(2*Math.PI)/s)*.5+r+e)},[ge.easeInBack]:(t,e,r,o,n=1.70158)=>r*(t/=o)*t*((n+1)*t-n)+e,[ge.easeOutBack]:(t,e,r,o,n=1.70158)=>r*((t=t/o-1)*t*((n+1)*t+n)+1)+e,easeInOutBack:(t,e,r,o,n=1.70158)=>(t/=o/2)<1?r/2*(t*t*(((n*=1.525)+1)*t-n))+e:r/2*((t-=2)*t*(((n*=1.525)+1)*t+n)+2)+e,[ge.easeInBounce]:(t,e,r,o)=>r-Vt[ge.easeOutBounce](o-t,0,r,o)+e,[ge.easeOutBounce]:(t,e,r,o)=>(t/=o)<1/2.75?r*(7.5625*t*t)+e:t<2/2.75?r*(7.5625*(t-=1.5/2.75)*t+.75)+e:t<2.5/2.75?r*(7.5625*(t-=2.25/2.75)*t+.9375)+e:r*(7.5625*(t-=2.625/2.75)*t+.984375)+e,[ge.easeInOutBounce]:(t,e,r,o)=>t<o/2?Vt[ge.easeInBounce](t*2,0,r,o)*.5+e:Vt[ge.easeOutBounce](t*2-o,0,r,o)*.5+r*.5+e};var pt=t=>t in Vt?Vt[t]:(Lo(t),Vt[he.get("tween").ease]);var _v=t=>t?t.replaceAll(/[\s#$()*+,.?[\\\]^{|}-]/g,String.raw`\$&`):"",_u=t=>/^[+-]?\d+(\.\d+)?$/.test(t),Sv=t=>/^\d+\.\d+$|^\d+$/.test(t),De=(t,e)=>{let r=new RegExp(`^${_v(e)}$`,"i");return(t.match(r)||[]).length},tr=(t,e)=>{let r=new RegExp(`[0-9]${e}$`,"i");return(t.match(r)||[]).length},Su=(t,e)=>t.some(r=>{let o=new RegExp(`[0-9]${r}$`,"i");return(e.match(o)||[]).length}),xu=(t,e)=>t.some(r=>{let o=new RegExp(`^${_v(r)}$`,"i");return(e.match(o)||[]).length});var xv=t=>t&&(De(t,b.PROP_VERTICAL)?b.PROP_VERTICAL:De(t,b.PROP_HORIZONTAL)?b.PROP_HORIZONTAL:De(t,b.PROP_ROTATE)?b.PROP_ROTATE:De(t,b.PROP_ROTATEY)?b.PROP_ROTATEY:De(t,b.PROP_ROTATEX)?b.PROP_ROTATEX:De(t,b.PROP_OPACITY)?b.PROP_OPACITY:De(t,b.PROP_SCALE)?b.PROP_SCALE:De(t,b.PROP_SCALE_X)?b.PROP_SCALE_X:De(t,b.PROP_SCALE_Y)?b.PROP_SCALE_Y:De(t,b.PROP_TWEEN)?b.PROP_TWEEN:t),Cv=t=>{if(t){if(tr(t,b.PX))return b.PX;if(tr(t,b.VH))return b.VH;if(tr(t,b.VW))return b.VW}return""},Oa=t=>De(t,b.POSITION_TOP)?b.POSITION_TOP:De(t,b.POSITION_BOTTOM)?b.POSITION_BOTTOM:De(t,b.POSITION_LEFT)?b.POSITION_LEFT:De(t,b.POSITION_RIGHT)?b.POSITION_RIGHT:"",Ev=t=>tr(t,b.PX)?b.PX:tr(t,b.VH)?b.VH:tr(t,b.VW)?b.VW:tr(t,b.WPERCENT)?b.WPERCENT:tr(t,b.HPERCENT)?b.HPERCENT:tr(t,b.DEGREE)?b.DEGREE:b.PX;var Wt=t=>u.checkType(Number,t)||u.checkType(Function,t)&&u.checkType(Number,t()),La=({start:t,end:e})=>{let r=u.checkType(Number,t),o=u.checkType(Number,e);return r||hb(t),o||db(e),r&&o},no=t=>{let e=u.checkType(Number,t);return!e&&t&&Pb(t),e?t:he.get("sequencer").duration},Da=t=>{let e=u.checkType(Number,t);return!e&&t&&Ob(t),e&&t?t:1},wv=t=>{let e=t&&t in Vt;return!e&&t&&Lo(t),e?t:he.get("sequencer").ease},Iv=t=>{let e=t&&t in Vt;return!e&&t&&Lo(t),e?pt(t):pt(he.get("parallaxTween").ease)},Mv=(t,e)=>{let r=u.checkType(String,t),o=u.checkType(Number,e);return r||$b(t),o||Lb(e),r&&o},kv=t=>{if(!t)return;let e=u.checkType(Number,t);return e||Aa(),e},Rv=t=>{if(!t)return;let r=[er,"end",kn,Rn,Nn].includes(t),o=u.checkType(Number,t),n=u.checkType(Object,t),s=r||o||n;return s||Nb(t),s},Eu=t=>{if(!t)return;let e=u.checkType(Number,t);return e||Ib(t),e},Nv=t=>{if(!t)return;let r=[Pa,"row","col"].includes(t);return r||kb(),r},Pv=t=>{if(!t)return;let e=u.checkType(Boolean,t);return e||Mb(),e},Av=(t=[])=>{let e=u.checkType(Array,[...t])&&t.length>0;return e||Db(),e},Ov=(t=[])=>u.checkType(Array,[...t])&&t.length>0?t:[],$v=t=>{if(!t)return;let r=[Ao,Oo,"end",$o].includes(t);if(!r){Bb();return}return r};var so=(t,e)=>{let r=u.checkType(Boolean,t);return!r&&t&&Wb(t,e),r?t:he.get(e).relative},Fa=t=>{let e=t&&t in Vt;return!e&&t&&Lo(t),e?pt(t):pt(he.get("tween").ease)},Ba=t=>{let e=t&&t in Vt;return!e&&t&&Lo(t),e?t:he.get("tween").ease},wu=t=>{let{config:e}=he.get("spring"),r=t&&t in e,o=r?e[t]:{},s=(r?u.checkType(Object,o)&&"tension"in o&&"mass"in o&&"friction"in o&&"velocity"in o&&"precision"in o:!1)?Object.values(o).every(i=>u.checkType(Number,i)&&i>=0):null;return!r&&t&&bu(t),!s&&r&&wb(t),s?e[t]:e.default},Lv=t=>{let{config:e}=he.get("spring"),r=t&&t in e;return!r&&t&&bu(t),r},Iu=t=>{let e=u.checkType(Object,t)&&Object.values(t).every(r=>u.checkType(Number,r)&&r>=0);return!e&&t&&Eb(),e?t:{}},Mu=t=>{let r=u.checkType(Function,t)?t():t,o=u.checkType(Number,r);return!o&&t&&Ab(t),o?r:he.get("tween").duration},Rt=(t,e)=>{let r=u.checkType(Boolean,t);return!r&&t&&vu(t,e),r&&t===!0},de=(t,e,r)=>{let o=u.checkType(Boolean,t);return!o&&t&&vu(t,e),o?t:r},Va=(t,e,r)=>{let o=u.checkType(String,t);return!o&&t&&jb(t,e),o?t:r},rr=(t,e,r)=>{let o=u.checkType(Number,t);return!o&&t&&zb(t,e),o?t:r},mt=(t,e,r)=>{let o=u.checkType(Function,t);return!o&&t&&Hb(t,e),o?t:r},Dv=(t,e,r)=>{let o=u.checkType(Array,t);return!o&&t&&Ub(t,e),o?t:r},Wa=t=>{let e=u.checkType(Number,t)&&t>0&&t<=1;return!e&&t&&Gb(),e?t:he.get("lerp").velocity},ja=t=>{let e=u.checkType(Number,t);return!e&&t&&qb(),e?t:he.get("lerp").precision},Fv=(t,e)=>{let r=u.checkType(String,t);return!r&&t&&Jb(e),r},Bs=t=>{let e=u.checkType(Number,t);return!e&&t&&Xb(),e?t:void 0},Vs=t=>{let e=t?.getType?.()&&(t.getType()==="LERP"||t.getType()==="SPRING"||t.getType()==="TWEEN");return!e&&t&&Yb(),e},Bv=(t,e)=>{t===-1&&Kb(e)},io=(t,e,r)=>{let o=u.checkType(Function,t);return!o&&t&&vv(r,t),o?t:e},Vv=t=>{let e=u.checkType(Function,t);return!e&&t&&Qb(t),e?t:({resolve:r})=>{r()}},Wv=t=>{let e=u.checkType(Array,t);return!e&&t&&vb(t),e},jv=t=>{let e=u.checkType(String,t);return!e&&t&&yb(t),e},$n=(t,e=!1)=>{let o=u.checkType(Element,t)?t:document.querySelector(t);return e?o??globalThis:o??document.createElement("div")},ku=t=>u.checkType(Element,t)?t:document.querySelector(t),Ws=(t,e)=>{if(!t)return b.DIRECTION_VERTICAL;let o=[b.DIRECTION_VERTICAL,b.DIRECTION_HORIZONTAL].includes(t);return!o&&t&&Zb(t,e),o?t:b.DIRECTION_VERTICAL},Ru=(t,e)=>{let r=[b.POSITION_TOP,b.POSITION_LEFT,b.POSITION_RIGHT,b.POSITION_BOTTOM],o=u.checkType(Object,t),n=o&&u.checkType(String,t?.position)&&r.includes(t.position),s=o&&u.checkType(Function,t.value)&&u.checkType(Number,t.value()),i=o&&n&&s;return i||ev(e),i?t:null},zv=t=>{let e=u.checkType(Function,t)&&u.checkType(Number,t?.());return!e&&t&&tv(),e?t:void 0},Hv=t=>{let e=t?.getType?.()&&(t.getType()===b.TWEEN_TWEEN||t.getType()===b.TWEEN_TIMELINE);return!e&&t&&rv(),e?t:{}},Uv=t=>{if(!t&&t!==0)return b.ALIGN_CENTER;let e=[b.ALIGN_START,b.ALIGN_TOP,b.ALIGN_RIGHT,b.ALIGN_CENTER,b.ALIGN_BOTTOM,b.ALIGN_LEFT,b.ALIGN_END],r=e.includes(t)||u.checkType(Number,t);return!r&&t&&ov(t,e),r?t:b.ALIGN_CENTER},Gv=t=>{if(!t)return!1;let e=[b.IN_BACK,b.IN_STOP,b.OUT_BACK,b.OUT_STOP],r=e.includes(t);return!r&&t&&nv(t,e),r?t:!1},Nu=(t,e,r)=>{if(t==null)return r;let o=u.checkType(Number,t);return!o&&t&&sv(t,e),o?t:r},qv=t=>{if(!t)return b.TYPE_PARALLAX;let e=t?.toLowerCase(),r=[b.TYPE_PARALLAX,b.TYPE_SCROLLTRIGGER],o=r.includes(e);return!o&&e&&iv(e,r),o?e:b.TYPE_PARALLAX},Jv=(t,e)=>(()=>{if(e===b.TYPE_PARALLAX){let o=Sv(t),n=u.checkType(Number,Number(t))&&o&&t>=0&&t<10;return!n&&t&&mv(t),n?10-t:10-he.get("parallax").defaultRange}else{let o=u.checkType(String,t);return!o&&t&&hv(t),o?t:"0px"}})(),Do=(t,e,r)=>{let o=he.get("defaultMq").value;if(!t)return o;let n=he.get("mq"),s=Object.keys(n),i=u.checkType(String,t)&&s.includes(t);return!i&&t&&yu(t,s,e,r),i?t:o},Fo=(t,e,r)=>{let o=he.get("defaultMq").type;if(!t)return o;let n=[ab,$s],s=u.checkType(String,t)&&n.includes(t);return!s&&t&&yu(t,n,e,r),s?t:o},Yv=(t,e,r,o)=>{if(!t&&o)return{propierties:b.PROP_VERTICAL,shouldTrackOnlyEvents:!0};if(!t&&r)return{propierties:b.PROP_VERTICAL,shouldTrackOnlyEvents:!1};let n=e===b.TYPE_SCROLLTRIGGER&&!t,s=[b.PROP_VERTICAL,b.PROP_HORIZONTAL,b.PROP_ROTATE,b.PROP_ROTATEY,b.PROP_ROTATEX,b.PROP_ROTATEZ,b.PROP_OPACITY,b.PROP_SCALE,b.PROP_SCALE_X,b.PROP_SCALE_Y,b.PROP_TWEEN],i=u.checkType(String,t);!i&&t&&av(t,s);let a=e===b.TYPE_PARALLAX&&t===b.PROP_TWEEN&&!r;!r&&!o&&t===b.PROP_TWEEN&&gv(),(r||o)&&t!==b.PROP_TWEEN&&bv(),a&&dv();let c=a?b.PROP_VERTICAL:t,l=xv(c);return{propierties:i?l??b.PROP_VERTICAL:b.PROP_VERTICAL,shouldTrackOnlyEvents:n}},Xv=t=>{if(!t)return b.EASE_LERP;let e=[b.EASE_SPRING,b.EASE_LERP],r=e.includes(t);r||cv(t,e);let o=r?t:b.EASE_LERP;return r?t:o},za=(t,e)=>{let r=[b.EASE_SPRING,b.EASE_LERP],o=r.includes(t);return!o&&t&&lv(t,r,e),o?t:b.EASE_LERP},Kv=(t,e)=>{let r=e===b.TYPE_PARALLAX?he.get("parallax").springConfig:he.get("scrollTrigger").springConfig;if(!t)return r;let o=he.get("spring").config,n=Object.keys(o),s=n.includes(t);return!s&&t&&pv(t,n),s?t:r},Qv=(t,e)=>{let r=u.checkType(Number,Number(t))&&t>0&&t<=1;!r&&t&&fv();let o=e===b.TYPE_PARALLAX?he.get("parallax").lerpConfig:he.get("scrollTrigger").lerpConfig;return r?t:o},Zv=(t,e)=>{let r=[b.PX,b.VW,b.VH,b.WPERCENT,b.HPERCENT];if(e===b.PROP_VERTICAL||e===b.PROP_HORIZONTAL){let n=Su(r,t);return n||Tu(t,e,r),n?t:"0px"}if(e===b.PROP_ROTATE||e===b.PROP_ROTATEX||e===b.PROP_ROTATEY||e===b.PROP_ROTATEZ){let n=Su([b.DEGREE],t);return n||Tu(t,e,[b.DEGREE]),n?t:"0"}if(e===b.PROP_SCALE||e===b.PROP_SCALE_X||e===b.PROP_SCALE_Y){let n=_u(t);return n||Tv(t,e),n?t:"0"}let o=_u(t);return o||yv(e),o?t:"0"};var Ha=t=>{let{instantFps:e}=u.store.get(),r=Math.round(t*(e/60));return t===1&&r===0?t:r},Nt=t=>({type:$v(t?.stagger?.type)?t.stagger.type:Pn.type,each:kv(t?.stagger?.each)?t.stagger.each:Pn.each,from:Rv(t?.stagger?.from)?t?.stagger?.from:Oo,grid:{col:Eu(t?.stagger?.grid?.col)?t.stagger.grid.col:Pn.grid.col,row:Eu(t?.stagger?.grid?.row)?t.stagger.grid.row:Pn.grid.row,direction:Nv(t?.stagger?.grid?.direction)?t.stagger.grid.direction:"col"},waitComplete:Pv(t?.stagger?.waitComplete)?t.stagger.waitComplete:Pn.waitComplete}),or=(t,e)=>t.length>e.length?t:e;var js=t=>t%2,tI=t=>Math.floor(Math.random()*t),rI=(t,e,r)=>{let o=new Set(t.slice(0,r).map(i=>i.frame));return t.map((i,a)=>a*e).filter(i=>!o.has(i))},oI=(t,e,r,o=[])=>{let{from:n,each:s}=r,i=Ha(s);if(n===Nn)return{index:t,frame:o[tI(o.length)]};if(n===er)return{index:t,frame:t*i};if(n==="end")return{index:t,frame:(e-1-t)*i};if(n===kn){let a=Math.trunc(e/2);return t>a?{index:t,frame:(t-a)*i}:t<a?js(e)===0&&a-t===1?{index:t,frame:0}:js(e)===0?{index:t,frame:(a-t-1)*i}:{index:t,frame:(a-t)*i}:{index:t,frame:0}}if(n===Rn){let a=Math.trunc(e/2);return t>a?{index:t,frame:(e-a-1-(t-a))*i}:t<a?js(e)===0&&a-t===1?{index:t,frame:(a-1)*i}:js(e)===0?{index:t,frame:(e-a-(a-t))*i}:{index:t,frame:(e-a-1-(a-t))*i}:js(e)?{index:t,frame:a*i}:{index:t,frame:(a-1)*i}}if(n&&Re(Number,n)){let a=n>=e?e-1:n;return t>a?{index:t,frame:(t-a)*s}:t<a?{index:t,frame:(a-t)*s}:{index:t,frame:0}}return{index:0,frame:0}},ey=(t,e,r)=>{if(e.grid.direction==="row"){let o=Ds(t,r);return[...[...Array.from({length:e.grid.col}).keys()].reduce((s,i,a)=>[...s,...pb(o,a)],[])].flat()}else return t},ty=({arrayDefault:t,arrayOnStop:e,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=r?.grid?.col<=1?t.length:r.grid.col,i=r?.grid?.row<=1?t.length:r.grid.row,c=ey(t,r,s).map(y=>y&&y!==void 0?y:{index:0,frame:0}),p=ey(e,r,s).map(y=>y&&y!==void 0?y:{index:0,frame:0}),h=r.grid.direction==="row"?i:s,f=Ds(c,h),d=f[0];return d.forEach((y,T)=>{let{index:S,frame:_}=oI(T,f[0].length,r,rI(d,r.each,T));y.index=S,y.frame=_,_>=o.frame&&(o={index:S,frame:_}),_<=n.frame&&(n={index:S,frame:_})}),f.forEach(y=>{y.forEach((T,S)=>{T&&(T.index=f[0][S].index,T.frame=f[0][S].frame)})}),f.flat().forEach((y,T)=>{c[T].index=y.index,c[T].frame=y.frame,p.length>0&&(p[T].index=y.index,p[T].frame=y.frame)}),{staggerArray:c,staggerArrayOnComplete:p,fastestStagger:n,slowlestStagger:o}};var nI=(t,e,r)=>t.reduce((o,n,s)=>{let i=Math.abs(s-r),a=n.reduce((c,l,p)=>p<e-i||p>e+i?c:[...c,l],[]);return[...o,a]},[]),sI=(t,e,r,o)=>t.reduce((n,s,i)=>{let a=Math.abs(i-r),c=[];if(i>=r&&i<=r*2)return[...n,c];let l=e-a,p=e+a;for(let f=0;f<a;f++)Ua(o,r+f,l)&&c.push(o[r+f][l]),Ua(o,r+f,p)&&c.push(o[r+f][p]),f>0&&(Ua(o,r-f,l)&&c.push(o[r-f][l]),Ua(o,r-f,p)&&c.push(o[r-f][p]));let h=c.filter(f=>f!=null);return[...n,h]},[]),Ua=(t,e,r)=>t[e]!==void 0&&t[e][r]!==void 0,Pu=(t,e)=>{let{col:r}=e.grid,{x:o,y:n}=e.from,s=Ds(t,r);[...Array.from({length:r}).keys()].forEach(()=>{s.push([])});let i=nI(s,o,n),a=sI(i,o,n,s),c=i.reduce((d,v,y)=>{let T=[...i[y],...a[y]];return d.push(T),d},[]),l=c.length;return{cleanArray:((n>=l/2?mb:gu)===gu?c.reduce((d,v,y)=>{if(y<n)return d;if(y===n){let T=[...c[y]];return d.push(T),d}else{let T=c[n-(y-n)]??[],S=[...c[y],...T];return d.push(S),d}},[]):c.reduce((d,v,y)=>{if(y>n)return d;if(y===n){let T=[...c[y]];return d.push(T),d}else{let T=c[n+(n-y)]??[],S=[...c[y],...T];return d.push(S),d}},[]).toReversed()).reduce((d,v)=>v.length===0?d:[...d,v],[])}};var iI=({arrayDefault:t,arrayOnStop:e,stagger:r,slowlestStagger:o,fastestStagger:n})=>{u.checkType(Object,r?.from)||(r.from={}),u.checkType(Number,r?.from?.x)||(r.from={...r.from,x:0}),u.checkType(Number,r?.from?.y)||(r.from={...r.from,y:0});let{cleanArray:s}=Pu(t,r),i=0;s.forEach((p,h)=>{p.forEach(f=>{let d=Ha(r.each),v=h*d;f.index=i,f.frame=v,v>=o.frame&&(o={index:i,frame:v}),v<=n.frame&&(n={index:i,frame:v}),i++})});let a=(()=>{if(e.length>0){let{cleanArray:p}=Pu(e,r);return p.flat()}else return[]})(),c=s.flat(),l=a.flat();return c.forEach((p,h)=>{l.length>0&&(l[h].index=p.index,l[h].frame=p.frame)}),{staggerArray:c,staggerArrayOnComplete:l,fastestStagger:n,slowlestStagger:o}},aI=({arrayDefault:t,arrayOnStop:e,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=[er,"end",kn,Rn,Nn];return(!u.checkType(String,r?.from)&&!u.checkType(Number,r?.from)||u.checkType(String,r?.from)&&!s.includes(r?.from))&&(Rb(),r.from=er),ty({arrayDefault:t,arrayOnStop:e,stagger:r,slowlestStagger:o,fastestStagger:n})},Pt=({arrayDefault:t,arrayOnStop:e,stagger:r,slowlestStagger:o,fastestStagger:n})=>{let s=r?.grid?.direction===Pa?iI({arrayDefault:t,arrayOnStop:e,stagger:r,slowlestStagger:o,fastestStagger:n}):aI({arrayDefault:t,arrayOnStop:e,stagger:r,slowlestStagger:o,fastestStagger:n}),i=s.staggerArray,a=s.staggerArrayOnComplete,c=s.fastestStagger,l=s.slowlestStagger;return{staggerArray:i,staggerArrayOnComplete:a,fastestStagger:c,slowlestStagger:l}};var Ln=({stagger:t,callback:e,callbackCache:r,callBackObject:o,useStagger:n})=>{if(t.each===0||!n){u.useFrame(()=>{e.forEach(({cb:s})=>{s(o)})}),u.useFrame(()=>{r.forEach(({cb:s})=>{u.useCache.fireObject({id:s,obj:o})})});return}e.forEach(({cb:s,frame:i})=>{u.useFrameIndex(()=>{s(o)},i)}),r.forEach(({cb:s,frame:i})=>{u.useCache.update({id:s,callBackObject:o,frame:i})})},Dn=({onComplete:t,callback:e,callbackCache:r,callbackOnComplete:o,callBackObject:n,stagger:s,slowlestStagger:i,fastestStagger:a,useStagger:c})=>{if(s.each===0||!c){t(),u.useNextFrame(()=>{e.forEach(({cb:l})=>{l(n)}),r.forEach(({cb:l})=>{u.useCache.fireObject({id:l,obj:n})}),o.forEach(({cb:l})=>{l(n)})});return}e.forEach(({cb:l,frame:p},h)=>{u.useFrameIndex(()=>{if(s.waitComplete){h===i.index&&(l(n),t());return}h===a.index&&(l(n),t())},p)}),r.forEach(({cb:l,frame:p},h)=>{u.useFrameIndex(()=>{if(s.waitComplete){h===i.index&&(u.useCache.fireObject({id:l,obj:n}),t());return}h===a.index&&(u.useCache.fireObject({id:l,obj:n}),t())},p)}),o.forEach(({cb:l,frame:p})=>{u.useFrameIndex(()=>{l(n)},p+1)})};var ct=(t,e)=>{let r=u.getUnivoqueId();return{arrayOfCallbackUpdated:[...e,{cb:t,id:r,index:-1,frame:-1}],unsubscribeCb:o=>o.map(({id:n,cb:s,index:i,frame:a})=>n===r?{id:n,cb:()=>{},index:i,frame:a}:{id:n,cb:s,index:i,frame:a})}},nr=(t,e,r)=>{let o=u.getUnivoqueId(),{id:n,unsubscribe:s}=u.useCache.add(t);return{arrayOfCallbackUpdated:[...e,{cb:n,id:o,index:-1,frame:-1}],unsubscribeCache:[...r,s],unsubscribeCb:i=>(s(),i.map(({id:a,cb:c,index:l,frame:p})=>a===o?{id:a,cb:"",index:l,frame:p}:{id:a,cb:c,index:l,frame:p}))}};var ao=t=>Object.keys(t).map(e=>{if(!Wt(t[e]))return wr(`${e}: ${t[e]}`),{prop:e,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let r=u.checkType(Number,t[e])?t[e]:t[e]?.()??0;return{prop:e,toValue:r,toFn:t[e],toIsFn:u.checkType(Function,t[e]),settled:!1}}),Fn=t=>Object.keys(t).map(e=>{if(!Wt(t[e]))return wr(`${e}: ${t[e]}`),{prop:e,fromValue:0,currentValue:0,fromFn:()=>0,fromIsFn:!1,settled:!1};let r=u.checkType(Number,t[e])?t[e]:t[e]?.()??0;return{prop:e,fromValue:r,currentValue:r,fromFn:t[e],fromIsFn:u.checkType(Function,t[e]),settled:!1}}),Bn=(t,e)=>Object.keys(t).map(r=>{if(!Wt(e[r])||!Wt(t[r]))return wr(`${r}: ${e[r]} || ${r}: ${t[r]}`),{prop:r,fromValue:0,fromFn:()=>0,fromIsFn:!1,currentValue:0,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let o=u.checkType(Number,t[r])?t[r]:t[r]?.()??0,n=u.checkType(Number,e[r])?e[r]:e[r]?.()??0;return{prop:r,fromValue:o,fromFn:t[r],fromIsFn:u.checkType(Function,t[r]),currentValue:o,toValue:n,toFn:e[r],toIsFn:u.checkType(Function,e[r]),settled:!1}}),Ir=t=>Object.keys(t).map(e=>{if(!Wt(t[e]))return wr(`${e}: ${t[e]}`),{prop:e,fromValue:0,fromFn:()=>0,fromIsFn:!1,currentValue:0,toValue:0,toFn:()=>0,toIsFn:!1,settled:!1};let r=u.checkType(Number,t[e])?t[e]:t[e]?.()??0;return{prop:e,fromValue:r,fromFn:t[e],fromIsFn:u.checkType(Function,t[e]),currentValue:r,toValue:r,toFn:t[e],toIsFn:u.checkType(Function,t[e]),settled:!1}});var Vn=({validationFunction:t,defaultRafInit:e})=>{u.useFrame(()=>{u.useNextTick(({time:r,fps:o})=>{let n=t.findLast(({validation:s})=>s());if(e(r,o),n){n?.callback(),console.log("custom tween run function extrecuted");return}})})};var co=(t,e)=>{console.log(`stagger on ${t} loaded at: ${e} fps`)};var Wn=(t,e,r,o)=>(u.checkType(Number,t)||Aa(),t>0&&e&&(r.length>0||o.length>0));var Ga=t=>{u.useFrame(()=>{u.useNextTick(({time:e,fps:r})=>{t(e,r)})})};var Fe=(t,e)=>Object.fromEntries(t.map(r=>{let o=r[e];return[r.prop,typeof o=="number"?o:Number.parseFloat(o)]})),jn=t=>t.map(e=>e.toIsFn?{[e.prop]:e.toFn}:{[e.prop]:Number.parseFloat(e.toValue)}).reduce((e,r)=>({...e,...r}),{}),zn=t=>t.map(e=>e.fromIsFn?{[e.prop]:e.fromFn}:{[e.prop]:Number.parseFloat(e.fromValue)}).reduce((e,r)=>({...e,...r}),{});var Hn=(t,e)=>e.map(r=>{let o=t.find(n=>n.prop===r.prop);return o?{...r,...o}:r}),Au=(t,e)=>e.map(r=>{let o=t.find(n=>n.prop===r.prop);return o?{...r,...o,shouldUpdate:!0}:{...r,shouldUpdate:!1}});var ry=({values:t,tension:e,friction:r,mass:o,precision:n,fps:s})=>t.map(i=>{let{currentValue:a,toValue:c,velocity:l}=i,p=-e*(a-c),h=-r*l,f=(p+h)/o,d=l+f*1/s,v=a+d*1/s,y=_e(v),T=Math.abs(d)<=.1,S=e===0?!0:Math.abs(c-y)<=n;return T&&S?{...i,currentValue:c,velocity:d,settled:!0}:{...i,currentValue:y,velocity:d,settled:!1}});var Tt=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#S;#y;#v;#T;#k;constructor(e){this.#n=Nt(e??{}),this.#t=so(e?.relative,"spring"),this.#i=wu(e?.config),this.updateConfigProp(e?.configProps??{}),this.#l=u.getUnivoqueId(),this.#h=!1,this.#u=void 0,this.#s=void 0,this.#c=void 0,this.#o=[],this.#e=[],this.#p=[],this.#a=[],this.#d=[],this.#f=[],this.#r=[],this.#g=!1,this.#m=!0,this.#C=!0,this.#S=!1,this.#y=!1,this.#v={reverse:!1,configProps:this.#i,relative:this.#t,immediate:!1},this.#T=Xe,this.#k=Xe;let r=e?.data;r&&this.setData(r)}#x(e,r,o,n,s,i){this.#h=!0,this.#o=ry({values:this.#o,tension:o,friction:n,mass:s,precision:i,fps:r});let a=Fe(this.#o,"currentValue");if(this.#g||Ln({stagger:this.#n,callback:this.#p,callbackCache:this.#a,callBackObject:a,useStagger:this.#C}),this.#o.every(l=>l.settled===!0)){let l=()=>{for(let h of this.#o)h.fromValue=h.toValue;this.#u?.(!0),this.#c=void 0,this.#s=void 0,this.#u=void 0,this.#g=!1,this.#h=!1},p=Fe(this.#o,"toValue");Dn({onComplete:l,callback:this.#p,callbackCache:this.#a,callbackOnComplete:this.#d,callBackObject:p,stagger:this.#n,slowlestStagger:this.#T,fastestStagger:this.#k,useStagger:this.#C});return}u.useFrame(()=>{u.useNextTick(({time:l,fps:p})=>{this.#h&&this.#x(l,p,o,n,s,i)})})}#I(e,r){for(let a of this.#o)a.velocity=Math.trunc(this.#i.velocity);let o=this.#i.tension,n=this.#i.friction,s=Math.max(1,this.#i.mass),i=this.#i.precision;this.#x(e,r,o,n,s,i)}async#P(){if(Wn(this.#n.each,this.#m,this.#a,this.#p)){let{averageFPS:e}=await u.useFps();co("spring",e);let r=or(this.#a,this.#p);if(this.#n.grid.col>r.length){kt(r.length),this.#m=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=Pt({arrayDefault:r,arrayOnStop:this.#d,stagger:this.#n,slowlestStagger:this.#T,fastestStagger:this.#k});this.#a.length>this.#p.length?this.#a=o:this.#p=o,this.#d=n,this.#T=i,this.#k=s,this.#m=!1}return{ready:!0}}async#R(e,r){this.#y||(this.#u=e,this.#s=r,this.#m&&(this.#y=!0,await this.#P(),this.#y=!1),Vn({validationFunction:this.#f,defaultRafInit:(o,n)=>this.#I(o,n)}))}clearCurretPromise(){this.#g||(this.#s?.(u.ANIMATION_STOP_REJECT),this.#c=void 0,this.#s=void 0,this.#u=void 0,this.#h=!1)}stop({clearCache:e=!0,updateValues:r=!0}={}){this.#g&&(this.#g=!1),r&&(this.#o=In(this.#o)),this.unFreezeStagger(),e&&this.#a.forEach(({cb:o})=>u.useCache.clean(o)),this.#s&&(this.#s(u.ANIMATION_STOP_REJECT),this.#c=void 0,this.#s=void 0,this.#u=void 0),this.#h=!1}freezeStagger(){this.#S||(this.#a.forEach(({cb:e})=>u.useCache.freeze(e)),this.#S=!0)}unFreezeStagger({updateFrame:e=!0}={}){this.#S&&(this.#a.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:e})),this.#S=!1)}pause(){this.#g||(this.#g=!0,this.#h=!1,this.#o=Na(this.#o),this.freezeStagger())}resume(){this.#g&&(this.#g=!1,this.unFreezeStagger(),!this.#h&&this.#u&&Ga((e,r)=>this.#I(e,r)))}setData(e){this.#o=Object.entries(e).map(r=>{let[o,n]=r;return{prop:o,toValue:n,fromValue:n,velocity:this.#i.velocity,currentValue:n,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#e=this.#o.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#o=at(this.#o,this.#e)}#O(e){let o=he.get("spring").config,n=Lv(e?.config)?o?.[e?.config??"default"]??Po.default:this.#v.configProps,s=Iu(e?.configProps),i={...n,...s},a={reverse:e?.reverse??this.#v.reverse,relative:e?.relative??this.#v.relative,immediate:e?.immediate??this.#v.immediate,configProps:i},{relative:c}=a;return this.#i=i,this.#t=c,a}goTo(e,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#C=!0;let o=ao(e);return this.#w(o,e,r)}goFrom(e,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#C=!0;let o=Fn(e);return this.#w(o,e,r)}goFromTo(e,r,o={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);if(this.#C=!0,!ro(e,r))return oo("spring goFromTo:",e,r),new Promise(s=>s);let n=Bn(e,r);return this.#w(n,e,o)}set(e,r={}){if(this.#g)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#C=!1;let o=Ir(e);return this.#w(o,e,r)}setImmediate(e,r={}){if(this.#h&&this.stop({clearCache:!1,updateValues:!1}),this.#g)return;this.#C=!1;let o=Ir(e);this.#o=Hn(o,this.#o);let{reverse:n}=this.#O(r??{});Rt(n,"reverse")&&(this.#o=Cr(e,this.#o)),this.#o=Mn(this.#o,this.#t),this.#o=xr(this.#o)}#w(e,r,o={}){this.#o=Hn(e,this.#o);let{reverse:n,immediate:s}=this.#O(o);if(Rt(n,"reverse")&&(this.#o=Cr(r,this.#o)),this.#o=Mn(this.#o,this.#t),Rt(s,"immediate "))return this.#h&&this.stop({updateValues:!1}),this.#o=xr(this.#o),Promise.resolve();let i=!this.#h&&!this.#c;return i&&(this.#c=new Promise((a,c)=>{this.#R(a,c)})),i&&this.#c?this.#c:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return Fe(this.#o,"currentValue")}getInitialData(){return Fe(this.#e,"currentValue")}getFrom(){return Fe(this.#o,"fromValue")}getTo(){return Fe(this.#o,"toValue")}getFromNativeType(){return zn(this.#o)}getToNativeType(){return jn(this.#o)}getType(){return"SPRING"}getId(){return this.#l}isActive(){return this.#h}updateConfigProp(e={}){let r=Iu(e);this.#i={...this.#i,...r},this.#v=at(this.#v,{configProps:r})}updateConfig(e){this.#i=wu(e),this.#v=at(this.#v,{configProps:this.#i})}subscribe(e){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(e,this.#p);return this.#p=r,()=>this.#p=o(this.#p)}subscribeCache(e){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=nr(e,this.#a,this.#r);return this.#a=r,this.#r=n,()=>this.#a=o(this.#a)}validateInitialization({validation:e,callback:r}){let o=[...this.#f,{validation:e,callback:r}];return this.#f=o,()=>this.#f=[]}onComplete(e){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(e,this.#d);return this.#d=r,()=>this.#d=o(this.#d)}destroy(){this.#c&&this.stop(),this.#d=[],this.#f=[],this.#p=[],this.#a=[],this.#o=[],this.#c=void 0,this.#r.forEach(e=>e()),this.#r=[]}};var qa=0,Ja=0,zs=0,Gs=!1,Ya=0,Xa=0,qs=!1,Bo=1,Vo=1,Wo=1,Js=1,Ys=!1,Qa=0,Za=0,Un=2,cI=.6,lI=60,Mr=Un,uI=.1,Ka=!1,Hs=null,pI=200,mI=120,lo=null,Ou=()=>{},$u=()=>{},Lu=()=>{},sr,Us=new Map,hI=t=>{if(t<=1)return Un;let e=Math.exp((t-1)*cI);return Math.min(Un*e,lI)},dI=({clientX:t,clientY:e})=>{if(!sr)return;Ya=t,Xa=e;let r=t-qa,o=e-Ja,n=u.getTime(),s=n-zs;if(Gs||s===0){qa=t,Ja=e,zs=n,Bo=1,Vo=1,Wo=1,Mr=Un,sr.goTo({speed:1,speedX:1,speedY:1});return}let i=Math.hypot(r,o);Js+=i;let a=r/s,c=o/s,l=Math.hypot(a,c),p=hI(l);p>Mr?Mr=p:Mr+=(p-Mr)*uI,Math.abs(r)>Mr&&(Qa=Math.sign(r)),Math.abs(o)>Mr&&(Za=Math.sign(o)),Bo=Math.max(1,Math.round((l+1)*1e4)/1e4),Vo=Math.max(1,Math.round((Math.abs(a)+1)*1e4)/1e4),Wo=Math.max(1,Math.round((Math.abs(c)+1)*1e4)/1e4),sr.goTo({speed:Bo,speedX:Vo,speedY:Wo}),qa=t,Ja=e,zs=n},ny=()=>{Ou=u.usePointerMove(()=>{Ou(),zs=u.getTime(),Ys=!1,lo?(clearTimeout(lo),lo=null):(Js=1,qs=!1),Gs=!0})},sy=()=>{Lu=u.usePointerMove(t=>{dI(t),Gs&&(Gs=!1)})},oy=()=>{Hs&&(clearTimeout(Hs),Hs=null)},fI=()=>{sr&&(sr.goTo({speed:1,speedX:1,speedY:1}),Qa=0,Za=0,Mr=Un,lo=setTimeout(()=>{lo=null,Ys=!0,Bo=1,Vo=1,Wo=1,qs=!0},mI),Lu(),$u(),ny(),sy(),iy())},iy=()=>{oy();let t=()=>{oy(),Hs=setTimeout(()=>{Hs=null,fI()},pI)};$u=u.usePointerMove(t)},gI=()=>{Ka||(Ka=!0,ny(),sy(),iy(),sr=new Tt({data:{speed:1,speedX:1,speedY:1}}),sr.subscribe(({speed:t,speedX:e,speedY:r})=>{u.useNextTick(()=>{for(let o of Us.values())o({speed:t,speedX:e,speedY:r,clientX:Ya,clientY:Xa,directionX:Qa,directionY:Za,distance:Js,completed:Ys,pointerEnd:qs,rawSpeed:Bo,rawSpeedX:Vo,rawSpeedY:Wo})})}),sr.onComplete(({speed:t,speedX:e,speedY:r})=>{u.useNextTick(()=>{for(let o of Us.values())o({speed:t,speedX:e,speedY:r,clientX:Ya,clientY:Xa,directionX:0,directionY:0,distance:Js,completed:Ys,pointerEnd:qs,rawSpeed:Bo,rawSpeedX:Vo,rawSpeedY:Wo})})}))},bI=t=>{if(globalThis.window===void 0)return()=>{};let e=we();return Us.set(e,t),gI(),()=>{Us.delete(e),Us.size===0&&Ka&&(lo&&(clearTimeout(lo),lo=null),Ou(),$u(),Lu(),sr.destroy(),sr=null,Ka=!1,qa=0,Ja=0,zs=0,Gs=!1,Qa=0,Za=0,Ya=0,Xa=0,Mr=Un,Js=1,Ys=!1,qs=!1,Bo=1,Vo=1,Wo=1)}},ay=bI;function vI(t){he.set(t)}function yI(t){return he.get(t)}function TI(){he.print()}function _I(t=()=>{}){return ay(t)}function SI(t,e){switch(t){case"min":return ve.min(e);case"max":return ve.max(e);case"get":return ve.getBreackpoint(e)}}var U={};To(U,{createLerp:()=>NI,createMasterSequencer:()=>II,createScrollerTween:()=>EI,createSequencer:()=>wI,createSpring:()=>RI,createStaggers:()=>MI,createTimeTween:()=>kI});var cy=({values:t,fps:e,velocity:r,precision:o})=>t.map(n=>{if(n.settled)return n;let{currentValue:s,toValue:i}=n,a=ub(s,i,r/e*60),c=_e(a);return Math.round(Math.abs(i-c)*1e4)/1e4<=o?{...n,currentValue:i,settled:!0}:{...n,currentValue:c,settled:!1}});var kr=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#S;#y;#v;#T;#k;#x;constructor(e){this.#n=Nt(e??{}),this.#t=so(e?.relative,"lerp"),this.#i=Wa(e?.velocity),this.#l=ja(e?.precision),this.#h=u.getUnivoqueId(),this.#u=!1,this.#s=void 0,this.#c=void 0,this.#o=void 0,this.#e=[],this.#p=[],this.#a=[],this.#d=[],this.#f=[],this.#r=[],this.#g=[],this.#m=!1,this.#C=!0,this.#S=!0,this.#y=!1,this.#v=!1,this.#T={reverse:!1,velocity:this.#i,precision:this.#l,relative:this.#t,immediate:!1},this.#k=Xe,this.#x=Xe;let r=e?.data;r&&this.setData(r)}#I(e,r){this.#u=!0,this.#e=cy({values:this.#e,fps:r,velocity:this.#i,precision:this.#l});let o=Fe(this.#e,"currentValue");if(this.#m||Ln({stagger:this.#n,callback:this.#a,callbackCache:this.#d,callBackObject:o,useStagger:this.#S}),this.#e.every(s=>s.settled===!0)){let s=()=>{this.#u=!1;for(let a of this.#e)a.fromValue=a.toValue;this.#s?.(!0),this.#o=void 0,this.#c=void 0,this.#s=void 0,this.#m=!1,this.#u=!1},i=Fe(this.#e,"toValue");Dn({onComplete:s,callback:this.#a,callbackCache:this.#d,callbackOnComplete:this.#f,callBackObject:i,stagger:this.#n,slowlestStagger:this.#k,fastestStagger:this.#x,useStagger:this.#S});return}u.useFrame(()=>{u.useNextTick(({time:s,fps:i})=>{this.#u&&this.#I(s,i)})})}#P(e,r){this.#I(e,r)}async#R(){if(Wn(this.#n.each,this.#C,this.#d,this.#a)){let{averageFPS:e}=await u.useFps();co("lerp",e);let r=or(this.#d,this.#a);if(this.#n.grid.col>r.length){kt(r.length),this.#C=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=Pt({arrayDefault:r,arrayOnStop:this.#f,stagger:this.#n,slowlestStagger:this.#k,fastestStagger:this.#x});this.#d.length>this.#a.length?this.#d=o:this.#a=o,this.#f=n,this.#k=i,this.#x=s,this.#C=!1}return{ready:!0}}async#O(e,r){this.#v||(this.#s=e,this.#c=r,this.#C&&(this.#v=!0,await this.#R(),this.#v=!1),Vn({validationFunction:this.#r,defaultRafInit:(o,n)=>this.#P(o,n)}))}clearCurretPromise(){this.#m||(this.#c?.(u.ANIMATION_STOP_REJECT),this.#o=void 0,this.#c=void 0,this.#s=void 0,this.#u=!1)}stop({clearCache:e=!0,updateValues:r=!0}={}){this.#m&&(this.#m=!1),r&&(this.#e=In(this.#e)),this.unFreezeStagger(),e&&this.#d.forEach(({cb:o})=>u.useCache.clean(o)),this.#c&&(this.#c(u.ANIMATION_STOP_REJECT),this.#o=void 0,this.#c=void 0,this.#s=void 0),this.#u=!1}freezeStagger(){this.#y||(this.#d.forEach(({cb:e})=>u.useCache.freeze(e)),this.#y=!0)}unFreezeStagger({updateFrame:e=!0}={}){this.#y&&(this.#d.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:e})),this.#y=!1)}pause(){this.#m||(this.#m=!0,this.#u=!1,this.#e=Na(this.#e),this.freezeStagger())}resume(){this.#m&&(this.#m=!1,this.unFreezeStagger(),!this.#u&&this.#s&&Ga((e,r)=>this.#P(e,r)))}setData(e){this.#e=Object.entries(e).map(r=>{let[o,n]=r;return{prop:o,toValue:n,fromValue:n,currentValue:n,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#p=this.#e.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#e=at(this.#e,this.#p)}#w(e){let r={...this.#T,...e},{velocity:o,precision:n,relative:s}=r;return this.#t=so(s,"lerp"),this.#i=Wa(o),this.#l=ja(n),r}goTo(e,r={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#S=!0;let o=ao(e);return this.#A(o,e,r)}goFrom(e,r={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#S=!0;let o=Fn(e);return this.#A(o,e,r)}goFromTo(e,r,o={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);if(this.#S=!0,!ro(e,r))return oo("lerp goFromTo:",e,r),new Promise(s=>s);let n=Bn(e,r);return this.#A(n,e,o)}set(e,r={}){if(this.#m)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#S=!1;let o=Ir(e);return this.#A(o,e,r)}setImmediate(e,r={}){if(this.#u&&this.stop({clearCache:!1,updateValues:!1}),this.#m)return;this.#S=!1;let o=Ir(e);this.#e=Hn(o,this.#e);let{reverse:n}=this.#w(r??{});Rt(n,"reverse")&&(this.#e=Cr(e,this.#e)),this.#e=Mn(this.#e,this.#t),this.#e=xr(this.#e)}#A(e,r,o={}){this.#e=Hn(e,this.#e);let{reverse:n,immediate:s}=this.#w(o??{});if(Rt(n,"reverse")&&(this.#e=Cr(r,this.#e)),this.#e=Mn(this.#e,this.#t),Rt(s,"immediate "))return this.#u&&this.stop({updateValues:!1}),this.#e=xr(this.#e),Promise.resolve();let i=!this.#u&&!this.#o;return i&&(this.#o=new Promise((a,c)=>{this.#O(a,c)})),i&&this.#o?this.#o:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return Fe(this.#e,"currentValue")}getInitialData(){return Fe(this.#p,"currentValue")}getFrom(){return Fe(this.#e,"fromValue")}getTo(){return Fe(this.#e,"toValue")}getFromNativeType(){return zn(this.#e)}getToNativeType(){return jn(this.#e)}getType(){return"LERP"}getId(){return this.#h}isActive(){return this.#u}updateVelocity(e){this.#i=Wa(e),this.#T=at(this.#T,{velocity:this.#i})}updatePrecision(e){this.#i=ja(e),this.#T=at(this.#T,{precision:this.#l})}subscribe(e){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(e,this.#a);return this.#a=r,()=>this.#a=o(this.#a)}subscribeCache(e){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=nr(e,this.#d,this.#g);return this.#d=r,this.#g=n,()=>this.#d=o(this.#d)}validateInitialization({validation:e,callback:r}){let o=[...this.#r,{validation:e,callback:r}];return this.#r=o,()=>this.#r=[]}onComplete(e){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(e,this.#f);return this.#f=r,()=>this.#f=o(this.#f)}destroy(){this.#o&&this.stop(),this.#f=[],this.#r=[],this.#a=[],this.#d=[],this.#e=[],this.#o=void 0,this.#g.forEach(e=>e()),this.#g=[]}};var ec=({each:t,useStagger:e,isLastDraw:r,callBackObject:o,callback:n,callbackCache:s,callbackOnStop:i})=>{t===0||e===!1?(u.useFrame(()=>{n.forEach(({cb:a})=>a(o))}),u.useFrame(()=>{s.forEach(({cb:a})=>{u.useCache.fireObject({id:a,obj:o})})})):(n.forEach(({cb:a,frame:c})=>{u.useFrameIndex(()=>a(o),c)}),s.forEach(({cb:a,frame:c})=>{u.useCache.update({id:a,callBackObject:o,frame:c})})),r&&(t===0||e===!1?u.useFrame(()=>{i.forEach(({cb:a})=>a(o))}):i.forEach(({cb:a,frame:c})=>{u.useFrameIndex(()=>a(o),c+1)}))};var Xs=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;constructor(e){this.#n=Iv(e?.ease),this.#t=no(e?.duration),this.#i=Nt(e),this.#l=[],this.#h=[],this.#u=[],this.#s=[],this.#c=[],this.#o="parallaxTween";let r=e?.from||null;r&&this.setData(r),e?.to&&this.goTo(e.to)}inzializeStagger(){if(this.#i.each>0&&(this.#s.length>0||this.#u.length>0)){let e=or(this.#s,this.#u);if(this.#i.grid.col>e.length){kt(e.length);return}let{staggerArray:r,staggerArrayOnComplete:o}=Pt({arrayDefault:e,arrayOnStop:this.#h,stagger:this.#i,slowlestStagger:Xe,fastestStagger:Xe});this.#s.length>this.#u.length?this.#s=r:this.#u=r,this.#h=o}}draw({partial:e,isLastDraw:r}){for(let n of this.#l){let{toIsFn:s,toFn:i,toValue:a,fromIsFn:c,fromFn:l,fromValue:p}=n,h=s?i():a,f=c?l():p,d=h-f,v=this.#n(e,f,d,this.#t);n.currentValue=_e(v)}let o=Fe(this.#l,"currentValue");u.useNextTick(()=>{ec({each:this.#i.each,useStagger:!0,isLastDraw:r,callBackObject:o,callback:this.#u,callbackCache:this.#s,callbackOnStop:this.#h})})}setData(e){let r=Object.entries(e);return this.#l=r.map(o=>{let[n,s]=o;return{prop:n,toValue:s,toValProcessed:s,fromValue:s,currentValue:s,settled:!1,fromFn:()=>0,toFn:()=>0}}),this}#e(e){this.#l=this.#l.map(r=>{let o=e.find(n=>n.prop===r.prop);return o?{...r,...o}:{...r}})}goTo(e){let r=ao(e);return this.#e(r),this}subscribe(e){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(e,this.#u);return this.#u=r,()=>this.#u=o(this.#u)}onStop(e){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(e,this.#h);return this.#h=r,()=>this.#h=o(this.#h)}subscribeCache(e){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=nr(e,this.#s,this.#c);return this.#s=r,this.#c=n,()=>this.#s=o(this.#s)}getDuration(){return this.#t}getType(){return this.#o}destroy(){this.#l=[],this.#h=[],this.#u=[],this.#s=[],this.#c.forEach(e=>e()),this.#c=[]}};var Ks=class{#n="sequencer";#t;constructor(){this.#t=[]}draw({partial:e,isLastDraw:r,useFrame:o}){this.#t.forEach(n=>{n.draw({partial:e,isLastDraw:r,useFrame:o})})}add(e){this.#t.push(e)}inzializeStagger(){this.#t.forEach(e=>{e.inzializeStagger()})}setDuration(e){this.#t.forEach(r=>{r.setDuration(e)})}getDuration(){return this.#t.length>0?this.#t[0].getDuration():0}setStretchFactor(e){this.#t.forEach(r=>{r.setStretchFactor(e)})}getLabels(){return this.#t.flatMap(e=>e.getLabels())}resetLastValue(){this.#t.forEach(e=>e.resetLastValue())}disableStagger(){this.#t.forEach(e=>{e.disableStagger()})}cleanCachedId(){this.#t.forEach(e=>{e.cleanCachedId()})}freezeCachedId(){this.#t.forEach(e=>{e.freezeCachedId()})}unFreezeCachedId(){this.#t.forEach(e=>{e.unFreezeCachedId()})}getType(){return this.#n}destroy(){this.#t.forEach(e=>{e.destroy()}),this.#t=[]}};var ly=(t,e)=>Object.keys(t).map(r=>Wt(t[r])?{prop:r,toValue:t[r],ease:pt(e)}:(wr(`${r}: ${t[r]}`),{prop:r,toValue:0,ease:pt(e)})),uy=(t,e)=>Object.keys(t).map(r=>Wt(t[r])?{prop:r,fromValue:t[r],ease:pt(e)}:(wr(`${r}: ${t[r]}`),{prop:r,fromValue:0,ease:pt(e)})),py=(t,e,r)=>Object.keys(t).map(o=>!Wt(e[o])||!Wt(t[o])?(wr(`${o}: ${e[o]} || ${o}: ${t[o]}`),{prop:o,fromValue:0,toValue:0,ease:pt(r)}):{prop:o,fromValue:t[o],toValue:e[o],ease:pt(r)});var We={BACKWARD:"backward",FORWARD:"forward",NONE:"none"};var Du={fromValue:{get:"toValue",set:"fromValue"},toValue:{get:"toValue",set:"toValue"}},my=(t,e,r,o)=>t.slice(0,e).reduceRight((n,{values:s})=>{let i=s.find(({prop:a,active:c})=>c&&a===r);return i&&!n&&n!==0?i[Du[o].get]:n},void 0),hy=(t,e,r,o)=>{for(let n=e+1;n<t.length;n++){let{start:s,values:i}=t[n];for(let a of i)if(a.prop===r&&a.active&&s<=o)return!1}return!0};var dy=({timeline:t,valuesState:e,partial:r})=>{for(let o of e){o.settled=!1;let n=null;for(let T=0;T<t.length;T++){let{start:S,end:_,values:w}=t[T],x=null;for(let P of w)if(P.prop===o.prop){x=P;break}if(!x||!x.active)continue;let{prop:E}=x;if(hy(t,T,E,r)){n={toValue:x.toValue,fromValue:x.fromValue,start:S,end:_,ease:x.ease};break}}if(!n)continue;let{start:s,end:i,toValue:a,fromValue:c,ease:l}=n,p=u.checkType(Number,a)?a:a(),h=u.checkType(Number,c)?c:c(),f=i-s,d=r<i?h:p,v;r>=s&&r<=i?v=l(r-s,h,p-h,f):v=d;let y=Number.isNaN(v)?d:v;o.currentValue=_e(y),o.settled=!0}return e};var Fu=({timeline:t,activeProp:e})=>t.map((r,o)=>{let{values:n,propToFind:s}=r,i=n.map(a=>{let{prop:c,active:l}=a;if(!l||!e.includes(c)||!s||s.length===0)return a;let p=my(t,o,c,s);return!p&&p!==0?a:{...a,[Du[s].set]:p}});return{...r,values:i}});var Bu=(t,e)=>t.toSorted((r,o)=>r?.[e]-o?.[e]);var tc=({timeline:t,values:e,start:r,end:o,duration:n,propToFind:s})=>{let i=t.length===0?0:1,a=[...t,{values:e,start:r??0,end:o??n,priority:i,propToFind:s}],c=Bu(a,"start");return Bu(c,"priority")};var rc=({data:t,values:e})=>e.map(r=>{let o=t.find(n=>n.prop===r.prop);return o?{...r,...o,active:!0}:{prop:r.prop,active:!1}});var Qs=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;constructor(e){this.#n=[],this.#t=[],this.#i=[],this.#l=[],this.#h=[],this.#u=[],this.#s=[],this.#c=[],this.#o=no(e?.duration),this.#e="sequencer",this.#p={start:0,end:this.#o,ease:wv(e?.ease)},this.#a=!0,this.#d=!0,this.#f="none",this.#r=0,this.#g=Nt(e),this.#m=!0,this.#C=!1;let r=e?.data||null;r&&this.setData(r)}inzializeStagger(){if(!this.#C){if(this.#g.each>0&&(this.#h.length>0||this.#l.length>0)){let e=or(this.#h,this.#l);if(this.#g.grid.col>e.length){kt(e.length);return}let{staggerArray:r,staggerArrayOnComplete:o}=Pt({arrayDefault:e,arrayOnStop:this.#u,stagger:this.#g,slowlestStagger:Xe,fastestStagger:Xe});this.#h.length>this.#l.length?this.#h=r:this.#l=r,this.#u=o}this.#C=!0}}draw({partial:e=0,isLastDraw:r=!1,useFrame:o=!1,direction:n=We.NONE}){if(o){this.#S({partial:e,isLastDraw:r,direction:n});return}u.useNextTick(()=>this.#S({partial:e,isLastDraw:r,direction:n}))}#S({partial:e=0,isLastDraw:r=!1,direction:o=We.NONE}){this.#a&&(this.#r=e,this.#y(e)),!this.#a&&this.#r&&(!o||o===We.NONE)&&(this.#f=e>=this.#r?We.FORWARD:We.BACKWARD),!this.#a&&(o===We.BACKWARD||o===We.FORWARD)&&(this.#f=o),this.#n=dy({timeline:this.#t,valuesState:this.#n,partial:e});let n=Fe(this.#n,"currentValue");ec({each:this.#g.each,useStagger:this.#m,isLastDraw:r,callBackObject:n,callback:this.#l,callbackCache:this.#h,callbackOnStop:this.#u}),this.#v(e),this.#m=!0,this.#r=e,this.#a=!1}resetLastValue(){this.#a=!0,this.#r=0}#y(e=0){this.#d&&(this.#s.forEach(({fn:r,time:o})=>{let n={shouldFire:e>=o,direction:We.FORWARD},s={shouldFire:e<=o,direction:We.BACKWARD};if(!(n.shouldFire||s.shouldFire))return;let a=n.shouldFire?n.direction:s.direction;r({direction:a,value:e,isForced:!0})}),this.#d=!1)}#v(e=0){this.#s.forEach(({fn:r,time:o})=>{let n=this.#f===We.FORWARD&&e>o&&this.#r<=o,s=this.#f===We.BACKWARD&&e<o&&this.#r>=o;(n||s)&&r({direction:this.#f,value:e,isForced:!1})})}setStretchFactor(e=0){let r=e/this.#o;this.#t=[...this.#t].map(o=>{let{start:n,end:s}=o;return{...o,start:_e(n*r),end:_e(s*r)}}),this.#i=[...this.#i].map(o=>{let{time:n}=o;return{...o,time:_e(n*r)}}),this.#s=[...this.#s].map(o=>{let{time:n}=o;return{...o,time:_e(n*r)}})}setData(e={}){return this.#n=Object.entries(e).map(r=>{let[o,n]=r,s=Mv(o,n),i=s?n:0;return{prop:s?o:"invalidProp",toValue:i,fromValue:i,currentValue:i,active:!1,settled:!1,ease:pt(he.get("sequencer").ease)}}),this.goTo(e,{start:0,end:0}),this}goTo(e,r){let o={...this.#p,...r},{start:n,end:s,ease:i}=o;if(!La({start:n,end:s}))return this;let a=ly(e,i),c=rc({data:a,values:this.#n}),l=Object.keys(e),p=tc({timeline:this.#t,values:c,start:n,end:s,duration:this.#o,propToFind:"fromValue"});return this.#t=Fu({timeline:p,activeProp:l}),this}goFrom(e,r){let o={...this.#p,...r},{start:n,end:s,ease:i}=o;if(!La({start:n,end:s}))return this;let a=uy(e,i),c=rc({data:a,values:this.#n}),l=Object.keys(e),p=tc({timeline:this.#t,values:c,start:n,end:s,duration:this.#o,propToFind:"toValue"});return this.#t=Fu({timeline:p,activeProp:l}),this}goFromTo(e,r,o){let n={...this.#p,...o},{start:s,end:i,ease:a}=n;if(!La({start:s,end:i}))return this;if(!ro(e,r))return oo("sequencer goFromTo:",e,r),this;let c=py(e,r,a),l=rc({data:c,values:this.#n});return this.#t=tc({timeline:this.#t,values:l,start:s,end:i,duration:this.#o,propToFind:""}),this}label(e="",r=0){return this.#i.push({name:e,time:r}),this}getLabels(){return this.#i}add(e=()=>{},r=0){let o=u.checkType(Function,e),n=u.checkType(Number,r),s=o&&n;return o||xb(e),n||Cb(r),s?(this.#s.push({fn:e,time:r}),this):this}subscribe(e=()=>{}){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(e,this.#l);return this.#l=r,()=>this.#l=o(this.#l)}onStop(e){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(e,this.#u);return this.#u=r,()=>this.#u=o(this.#u)}subscribeCache(e=()=>{}){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=nr(e,this.#h,this.#c);return this.#h=r,this.#c=n,()=>this.#h=o(this.#h)}getDuration(){return this.#o}setDuration(e=0){this.#o=e}getType(){return this.#e}cleanCachedId(){this.#h.forEach(({cb:e})=>u.useCache.clean(e))}freezeCachedId(){this.#h.forEach(({cb:e})=>u.useCache.freeze(e))}unFreezeCachedId(){this.#h.forEach(({cb:e})=>u.useCache.unFreeze({id:e,update:!0}))}disableStagger(){this.#m=!1}destroy(){this.#n=[],this.#t=[],this.#l=[],this.#h=[],this.#u=[],this.#s=[],this.#c.forEach(e=>e()),this.#c=[]}};var fy=({values:t,timeElapsed:e,duration:r,ease:o})=>t.map(n=>{if(n.shouldUpdate){let s=o(e,n.fromValue,n.toValProcessed,r);return{...n,currentValue:_e(s)}}return{...n,currentValue:n.fromValue}});var Rr=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#S;#y;#v;#T;#k;#x;#I;#P;#R;constructor(e){this.#n=Fa(e?.ease),this.#t=Mu(e?.duration),this.#i=so(e?.relative,"tween"),this.#l=Nt(e??{}),this.#h=u.getUnivoqueId(),this.#u=!1,this.#s=void 0,this.#c=void 0,this.#o=void 0,this.#e=[],this.#p=[],this.#a=[],this.#d=[],this.#f=[],this.#r=[],this.#g=[],this.#m=!1,this.#C=0,this.#S=0,this.#y=0,this.#v=!0,this.#T=!0,this.#k=!1,this.#x=!1,this.#I={duration:this.#t,ease:Ba(e?.ease),relative:this.#i,reverse:!1,immediate:!1},this.#P=Xe,this.#R=Xe;let r=e?.data;r&&this.setData(r)}#O(e){this.#u=!0,this.#m&&(this.#y=e-this.#C-this.#S),this.#S=e-this.#C-this.#y,Math.round(this.#S)>=this.#t&&(this.#S=this.#t),this.#e=fy({values:this.#e,timeElapsed:this.#S,duration:this.#t,ease:this.#n});let r=Math.round(this.#S)===this.#t,o=Fe(this.#e,"currentValue");if(this.#m||Ln({stagger:this.#l,callback:this.#a,callbackCache:this.#d,callBackObject:o,useStagger:this.#T}),r){Dn({onComplete:()=>{for(let s of this.#e)s.shouldUpdate&&(s.toValue=s.currentValue,s.fromValue=s.currentValue);this.#s?.(!0),this.#o=void 0,this.#c=void 0,this.#s=void 0,this.#y=0,this.#m=!1,this.#u=!1},callback:this.#a,callbackCache:this.#d,callbackOnComplete:this.#f,callBackObject:o,stagger:this.#l,slowlestStagger:this.#P,fastestStagger:this.#R,useStagger:this.#T});return}u.useFrame(()=>{u.useNextTick(({time:n})=>{this.#u&&this.#O(n)})})}#w(e){this.#C=e,this.#O(e)}async#A(){if(Wn(this.#l.each,this.#v,this.#d,this.#a)){let{averageFPS:e}=await u.useFps();co("tween",e);let r=or(this.#d,this.#a);if(this.#l.grid.col>r.length){kt(r.length),this.#v=!1;return}let{staggerArray:o,staggerArrayOnComplete:n,fastestStagger:s,slowlestStagger:i}=Pt({arrayDefault:r,arrayOnStop:this.#f,stagger:this.#l,slowlestStagger:this.#P,fastestStagger:this.#R});this.#d.length>this.#a.length?this.#d=o:this.#a=o,this.#f=n,this.#P=i,this.#R=s,this.#v=!1}return{ready:!0}}async#N(e,r){this.#x||(this.#s=e,this.#c=r,this.#v&&(this.#x=!0,await this.#A(),this.#x=!1),Vn({validationFunction:this.#r,defaultRafInit:o=>this.#w(o)}))}clearCurretPromise(){this.#m||(this.#c?.(u.ANIMATION_STOP_REJECT),this.#o=void 0,this.#c=void 0,this.#s=void 0,this.#u=!1)}stop({clearCache:e=!0,updateValues:r=!0}={}){this.#y=0,this.#m=!1,r&&(this.#e=In(this.#e)),this.unFreezeStagger(),e&&this.#d.forEach(({cb:o})=>u.useCache.clean(o)),this.#c&&(this.#c(u.ANIMATION_STOP_REJECT),this.#o=void 0,this.#c=void 0,this.#s=void 0),this.#u=!1}freezeStagger(){this.#k||(this.#d.forEach(({cb:e})=>u.useCache.freeze(e)),this.#k=!0)}unFreezeStagger({updateFrame:e=!0}={}){this.#k&&(this.#d.forEach(({cb:r})=>u.useCache.unFreeze({id:r,update:e})),this.#k=!1)}pause(){this.#m||(this.#m=!0,this.freezeStagger())}resume(){this.#m&&(this.#m=!1,this.unFreezeStagger())}setData(e){this.#e=Object.entries(e).map(r=>{let[o,n]=r;return{prop:o,toValue:n,toValueOnPause:n,toValProcessed:n,fromValue:n,currentValue:n,shouldUpdate:!1,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}}),this.#p=this.#e.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,shouldUpdate:!1,fromFn:()=>0,fromIsFn:!1,toFn:()=>0,toIsFn:!1,settled:!1}))}resetData(){this.#e=at(this.#e,this.#p)}#b(){for(let e of this.#e)e.shouldUpdate&&(e.fromValue=e.currentValue)}#D(e){let r={...this.#I,...e},{ease:o,duration:n,relative:s}=r;return this.#n=Fa(o),this.#i=so(s,"tween"),this.#t=Mu(n),r}goTo(e,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!0;let o=ao(e);return this.#L(o,e,r)}goFrom(e,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!0;let o=Fn(e);return this.#L(o,e,r)}goFromTo(e,r,o={}){if(this.stop({clearCache:!1,updateValues:!0}),this.#T=!0,!ro(e,r))return oo("tween goFromTo:",e,r),new Promise(s=>s);let n=Bn(e,r);return this.#L(n,e,o)}set(e,r={}){this.stop({clearCache:!1,updateValues:!0}),this.#T=!1;let o=Ir(e),n=r?{...r,duration:1}:{duration:1};return this.#L(o,e,n)}setImmediate(e,r={}){if(this.stop({clearCache:!1,updateValues:!1}),this.#m)return;this.#T=!1;let o=Ir(e),n=r?{...r,duration:1}:{duration:1};this.#e=Au(o,this.#e);let{reverse:s}=this.#D(n);Rt(s,"reverse")&&(this.#e=Cr(e,this.#e)),this.#e=fu(this.#e,this.#i),this.#e=xr(this.#e)}#L(e,r,o={}){this.#e=Au(e,this.#e);let{reverse:n,immediate:s}=this.#D(o);if(Rt(n,"reverse")&&(this.#e=Cr(r,this.#e)),this.#e=fu(this.#e,this.#i),Rt(s,"immediate "))return this.#u&&(this.stop({clearCache:!1,updateValues:!1}),this.#b()),this.#e=xr(this.#e),Promise.resolve();let i=!this.#u&&!this.#o;return i&&(this.#o=new Promise((a,c)=>{this.#N(a,c)})),i&&this.#o?this.#o:Promise.reject(u.ANIMATION_STOP_REJECT)}get(){return Fe(this.#e,"currentValue")}getInitialData(){return Fe(this.#p,"currentValue")}getFrom(){return Fe(this.#e,"fromValue")}getTo(){return Fe(this.#e,"toValue")}getFromNativeType(){return zn(this.#e)}getToNativeType(){return jn(this.#e)}getType(){return"TWEEN"}getId(){return this.#h}isActive(){return this.#u}updateEase(e){this.#n=Fa(e),this.#I=at(this.#I,{ease:e})}subscribe(e){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(e,this.#a);return this.#a=r,()=>this.#a=o(this.#a)}subscribeCache(e){let{arrayOfCallbackUpdated:r,unsubscribeCb:o,unsubscribeCache:n}=nr(e,this.#d,this.#g);return this.#d=r,this.#g=n,()=>this.#d=o(this.#d)}validateInitialization({validation:e,callback:r}){let o=[...this.#r,{validation:e,callback:r}];return this.#r=o,()=>this.#r=[]}onComplete(e){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=ct(e,this.#f);return this.#f=r,()=>this.#f=o(this.#f)}destroy(){this.#o&&this.stop(),this.#f=[],this.#r=[],this.#a=[],this.#d=[],this.#e=[],this.#o=void 0,this.#g.forEach(e=>e()),this.#g=[]}};var xI=({each:t,duration:e,numItem:r,index:o,eachByNumItem:n})=>{if(t===1){let h=e/r,f=_e(o*h),d=_e(f+h);return{start:f,end:d}}let i=e/r*n,a=e-i,c=r-1>0?r-1:1,p=a/c*o;return{start:_e(p),end:_e(i+p)}},CI=({duration:t,numItem:e,index:r,eachByNumItem:o,type:n})=>{let i=t/e*r,c=(t-(t-i))/e*o;if(n===Oo)return{start:0,end:_e(t-(i-c))};if(n===$o){let l=(i-c)/2;return{start:_e(l),end:_e(t-l)}}return n==="end"?{start:_e(i-c),end:_e(t)}:{start:0,end:t}},gy=t=>{let e=Ov(t?.items),r=Nt(t),o=no(t?.duration),n=10,s=r?.each||1,i=[...e].map((d,v)=>({item:d,start:0,end:o,index:v}));if(!Av(e))return i;r.grid?.col>e.length&&(kt(e.length),s=1),u.checkType(Number,s)&&(s>n||s<1)&&(Vb(n),s=1);let{staggerArray:a}=Pt({arrayDefault:[...e].map(d=>({item:d})),arrayOnStop:[],stagger:r,slowlestStagger:Xe,fastestStagger:Xe}),c=a.filter(({item:d})=>u.checkType(Element,d)||u.checkType(Object,d)||u.checkType(Element,d?.deref?.()));if(c.length===0)return Fb(),i;let l=c.map(({frame:d})=>d),p=[...new Set(l)].toSorted((d,v)=>d-v),h=p.length;return c.map(({item:d,frame:v})=>{let y=p.indexOf(v),T=s*h/n,{start:S,end:_}=r.type===Ao?xI({each:s,duration:o,numItem:h,index:y,eachByNumItem:T}):r.type===Oo||r.type==="end"||r.type===$o?CI({duration:o,numItem:h,index:y,eachByNumItem:T,type:r.type}):{start:0,end:o};return{item:d,start:S,end:_,index:y}})};function EI(t){return new Xs(t)}function wI(t){return new Qs(t)}function II(){return new Ks}function MI(t){return gy(t)}function kI(t){return new Rr(t)}function RI(t){return new Tt(t)}function NI(t){return new kr(t)}var Me={};To(Me,{createAsyncTimeline:()=>AI,createSyncTimeline:()=>PI});var X=()=>{},oc=(...t)=>e=>t.reduce((r,o)=>r.then(o),Promise.resolve(e));var nc=({data:t,filterBy:e})=>Object.entries(t).map(r=>{let[o,n]=r,s=o in e;return{data:{[o]:n},active:s}}).filter(({active:r})=>r).map(({data:r})=>r).reduce((r,o)=>({...r,...o}),{});var uo=({timeline:t,tween:e,index:r})=>{let o=e?.getId?.(),n=e?.getInitialData?.()||{},s=t.slice(0,r).reduce((i,a)=>{let c=a.find(({data:h})=>h?.tween?.getId?.()===o);c?.data?.tween?.setImmediate?.(c?.data?.valuesTo);let l=c?.data?.tween?.getToNativeType?.(),p=l&&c?nc({data:l,filterBy:c.data.valuesTo}):{};return{...i,...p}},n);return e.setImmediate(n),s};var Vu=({mainReject:t,mainResolve:e,isStopped:r,previousSessionId:o,currentSessionId:n,isInPause:s,tween:i,stepFunction:a,action:c,addToActiveTween:l})=>{if(r()||o!==n()){t();return}let p=l(i),h=i&&i?.validateInitialization?i.validateInitialization({validation:()=>s(),callback:()=>i.pause?.()}):X;a[c]().then(()=>e({resolve:!0})).catch(()=>{}).finally(()=>{p(),h()})};var Zs=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#S;#y;#v;#T;#k;#x;#I;#P;#R;#O;#w;#A;#N;#b;#D;#L;#M;constructor(e){this.#n=Da(e?.repeat),this.#t=de(e?.yoyo,"asyncTimeline: yoyo",!1),this.#i=de(e?.freeMode,"asyncTimeline: freeMode",!1),this.#l=de(e?.autoSet,"asyncTimeline: autoSet",!0),this.#h=de(e?.inheritProps,"asyncTimeline: inheritProps",!0),this.#u=de(e?.forceFromTo,"asyncTimeline: forceFromTo",!1),this.#s=[],this.#c=[],this.#o=[],this.#e=!1,this.#p={id:-1,tween:void 0,callback:()=>{},action:"",valuesFrom:{},valuesTo:{},prevValueTo:{},prevValueSettled:!1,tweenProps:{},groupProps:{},labelProps:{}},this.#a={active:!1,index:-1,isReverse:!1,callback:void 0},this.#d=1,this.#f=void 0,this.#r=0,this.#g=0,this.#m=1,this.#C=!1,this.#S=!1,this.#y=!1,this.#v=!1,this.#T=!1,this.#k=!1,this.#x=!0,this.#I=0,this.#P=0,this.#R=0,this.#O=!1,this.#w=[],this.#A=!1,this.#N=0,this.#b=[],this.#D=[],this.#L=void 0,this.#M=void 0}#F(){let e=this.#s[this.#g],r=this.#w;if(this.#w=[],!e)return;this.#s[this.#g]=e.map(i=>{let{data:a}=i,{tween:c,valuesTo:l,prevValueSettled:p}=a;if(c&&c?.getToNativeType&&!p){let h=c.getToNativeType(),f=nc({data:h,filterBy:l});return{...i,data:{...a,prevValueTo:f,prevValueSettled:!0}}}return i});let o=e.map(i=>{let{data:a}=i,{tween:c,callback:l,action:p,valuesFrom:h,valuesTo:f,tweenProps:d,id:v}=a,y={...d};delete y.delay;let{active:T,index:S}=this.#a,_=Number.isNaN(S)?!1:T&&S&&this.#g<S;_&&(y.immediate=!0),d&&"relative"in d&&d.relative&&(d.relative=!1,fb()),this.#w.push({id:v,action:p});let w=r.find(({id:E,action:I})=>E===v&&I===p),x={set:()=>(this.#v||c?.clearCurretPromise?.(),c?.[p](h,y)),goTo:()=>(this.#v||c?.clearCurretPromise?.(),c?.[p](f,y)),goFrom:()=>(this.#v||c?.clearCurretPromise?.(),c?.[p](h,y)),goFromTo:()=>(this.#v||c?.clearCurretPromise?.(),c?.[p](h,f,y)),add:()=>w?new Promise(E=>E({resolve:!0})):new Promise(E=>{if(_){E({resolve:!0});return}let I=this.getDirection();l({direction:I,loop:this.#m}),E({resolve:!0})}),addAsync:()=>{this.#k=!0;let E=this.#I;return w?new Promise(I=>I({resolve:!0})):new Promise((I,P)=>{if(_){I({resolve:!0});return}let A=this.getDirection();l({direction:A,loop:this.#m,resolve:()=>{if(E===this.#I){I({resolve:!0});return}P()}})})},createGroup:()=>new Promise(E=>E({resolve:!0})),closeGroup:()=>new Promise(E=>E({resolve:!0})),label:()=>new Promise(E=>E({resolve:!0})),suspend:()=>{if(w)return new Promise(P=>P({resolve:!0}));let E=u.checkType(Boolean,l());E||gb(l);let I=E?l():!0;return new Promise(P=>{!_&&I&&(this.#T=!0),P({resolve:!0})})}};return new Promise((E,I)=>{let P=_?!1:d?.delay,A=this.#I;if(P){let $=u.getTime();requestAnimationFrame(()=>{this.#$({start:$,deltaTimeOnpause:0,delay:P,mainReject:I,mainResolve:E,previousSessionId:A,tween:c,stepFunction:x,action:p})});return}Vu({mainReject:I,mainResolve:E,isStopped:()=>this.#x,isInPause:()=>this.#v,addToActiveTween:$=>this.#X($),currentSessionId:()=>this.#I,previousSessionId:A,tween:c,stepFunction:x,action:p})})}),s=this.#s[this.#g].some(i=>i.data.groupProps?.waitComplete)?"all":"race";Promise[s](o).then(()=>{if(this.#T||this.#x)return;let{active:i,index:a,isReverse:c,callback:l}=this.#a;if(l&&i&&this.#g===a-1){this.#Q(),this.#m++,l();return}if(i&&c&&this.#g===a-1&&this.reverseNext(),this.#C){this.#C=!1,this.#g=this.#s.length-this.#g-1,this.#Q(),this.#j(),this.#F();return}if(this.#g<this.#s.length-1){this.#g++,this.#F();return}if(this.#m<this.#n||this.#n===-1){if(i&&a===this.#s.length&&!this.#i){let p=this.#o.map(({tween:h})=>{let f=uo({timeline:this.#s,tween:h,index:this.#s.length});return new Promise((d,v)=>{h.set(f).then(()=>d({resolve:!0})).catch(()=>v())})});Promise.all(p).then(()=>{this.#_()}).catch(()=>{});return}this.#_();return}this.#D.forEach(({cb:p})=>p()),this.#x=!0,this.#L&&Xo.add(()=>{xt.add(()=>{this.#L?.({resolve:!0})})})}).catch(i=>{i&&console.log(i)}).finally(()=>{this.#k=!1})}#$({start:e,deltaTimeOnpause:r,delay:o,mainReject:n,mainResolve:s,previousSessionId:i,tween:a,stepFunction:c,action:l}){let p=u.getTime(),h=p-e;if(this.#v&&(r=p-this.#R),h-r>=o||this.#x||this.#C){Vu({mainReject:n,mainResolve:s,isStopped:()=>this.#x,isInPause:()=>this.#v,addToActiveTween:f=>this.#X(f),currentSessionId:()=>this.#I,previousSessionId:i,tween:a,stepFunction:c,action:l});return}requestAnimationFrame(()=>{this.#$({start:e,deltaTimeOnpause:r,delay:o,mainReject:n,mainResolve:s,previousSessionId:i,tween:a,stepFunction:c,action:l})})}#_(){if(this.#m>0){let e=this.getDirection();this.#b.forEach(({cb:r})=>r({direction:e,loop:this.#m}))}this.#m++,this.#g=0,this.#Q(),(this.#t||this.#S)&&this.#j(),this.#S=!1,this.#F()}#X(e){let r=e?.getId&&e.getId();if(!r)return X;let o=this.#P;return this.#P++,this.#c.push({tween:e,uniqueId:r,id:o}),()=>{this.#c=this.#c.filter(({id:n})=>n!==o)}}#j(){this.#y=!this.#y,this.#s=this.#s.toReversed().map(e=>e.toReversed().map(r=>{let{data:o}=r,{action:n,valuesFrom:s,prevValueTo:i,valuesTo:a}=o,c=a;switch(n){case"goTo":return{...r,data:{...o,valuesTo:i,prevValueTo:c}};case"goFromTo":return{...r,data:{...o,valuesFrom:a,valuesTo:s}};case"goFrom":return this.#u||(bb(),this.stop()),{...r,data:{...o,valuesFrom:a,valuesTo:s}}}return r}))}#E(e){let r=this.#s.findIndex(o=>o[0]?.group&&o[0].group===this.#f);if(r!==-1){this.#s[r].push({group:this.#f,data:e});return}this.#s.push([{group:this.#f,data:e}])}#W(e){let r=e?.getId?.();if(this.#o.find(({id:s})=>s===r))return;let n={id:r,tween:e};this.#o.push(n)}#B(){this.#o.forEach(({tween:e})=>e.resetData())}set(e,r={},o={}){if(!Vs(e))return this;o.delay=Bs(o?.delay);let n=this.#h?uo({timeline:this.#s,tween:e,index:this.#s.length}):{};return this.#r++,this.#E({...this.#p,id:this.#r,tween:e,action:"set",valuesTo:{...n,...r},valuesFrom:{...n,...r},tweenProps:o,groupProps:{waitComplete:this.#e}}),this.#W(e),this}goTo(e,r={},o={}){if(!Vs(e))return this;o.delay=Bs(o?.delay);let n=uo({timeline:this.#s,tween:e,index:this.#s.length}),s=this.#h||this.#u?n:{};return this.#r++,this.#u?this.#E({...this.#p,id:this.#r,tween:e,action:"goFromTo",valuesFrom:{...s},valuesTo:{...s,...r},tweenProps:o??{},groupProps:{waitComplete:this.#e}}):this.#E({...this.#p,id:this.#r,tween:e,action:"goTo",valuesTo:{...s,...r},tweenProps:o??{},groupProps:{waitComplete:this.#e}}),this.#W(e),this}goFrom(e,r={},o={}){if(!Vs(e))return this;o.delay=Bs(o?.delay);let n=uo({timeline:this.#s,tween:e,index:this.#s.length}),s=this.#h||this.#u?n:{};return this.#r++,this.#u?this.#E({...this.#p,id:this.#r,tween:e,action:"goFromTo",valuesFrom:{...s,...r},valuesTo:{...s},tweenProps:o??{},groupProps:{waitComplete:this.#e}}):this.#E({...this.#p,id:this.#r,tween:e,action:"goFrom",valuesFrom:{...s,...r},tweenProps:o,groupProps:{waitComplete:this.#e}}),this.#W(e),this}goFromTo(e,r={},o={},n={}){if(!Vs(e))return this;n.delay=Bs(n?.delay);let s=this.#h?uo({timeline:this.#s,tween:e,index:this.#s.length}):{};return this.#r++,this.#E({...this.#p,id:this.#r,tween:e,action:"goFromTo",valuesFrom:{...s,...r},valuesTo:{...s,...o},tweenProps:n,groupProps:{waitComplete:this.#e}}),this.#W(e),this}add(e=X){let r=io(e,()=>{},"timeline add function");return this.#f?(On("add"),this):(this.#r++,this.#E({...this.#p,id:this.#r,callback:r,action:"add",groupProps:{waitComplete:this.#e}}),this)}addAsync(e){let r=Vv(e);return this.#f?(On("addAsync"),this):(this.#r++,this.#E({...this.#p,id:this.#r,callback:r,action:"addAsync",groupProps:{waitComplete:this.#e}}),this)}createGroup(e={}){return this.#f?(On("createGroup"),this):(this.#r++,this.#E({...this.#p,id:this.#r,action:"createGroup",groupProps:e}),this.#e=e?.waitComplete??!1,this.#f=this.#d++,this)}closeGroup(){return this.#f=void 0,this.#r++,this.#E({...this.#p,id:this.#r,action:"closeGroup"}),this.#e=!1,this}suspend(e=()=>!0){return this.#f?(On("suspend"),this):(this.#r++,this.#E({...this.#p,id:this.#r,callback:e,action:"suspend",groupProps:{waitComplete:this.#e}}),this)}label(e={}){return this.#f?(On("label"),this):Fv(e?.name,"asyncTimeline label:")?(this.#r++,this.#E({...this.#p,id:this.#r,action:"label",labelProps:e,groupProps:{waitComplete:this.#e}}),this):this}#U(){this.#O||(this.#O=!0,this.#o.forEach(({tween:e})=>{let r=e.getInitialData();this.#r++,this.#s=[[{group:void 0,data:{...this.#p,id:this.#r,tween:e,action:"set",valuesFrom:r,valuesTo:r,groupProps:{waitComplete:this.#e}}}],...this.#s]}),this.#o.forEach(({tween:e})=>{let r=uo({timeline:this.#s,tween:e,index:this.#s.length});this.#r++,this.#s.push([{group:void 0,data:{...this.#p,id:this.#r,tween:e,action:"set",valuesFrom:r,valuesTo:r,groupProps:{waitComplete:this.#e}}}])}))}setTween(e="",r=[]){this.stop();let o=Wv(r),n=jv(e);if(!o||!n)return Promise.reject(new Error("timeline setTween: props is wrong"));let s=new Set(r.map(c=>c?.getId?.())),i=this.#o.filter(({id:c})=>s.has(c)),a=this.#s.findIndex(c=>{let[l]=c;return l.data.labelProps?.name===e});return a===-1?(Tb(e),Promise.reject(new Error(`asyncTimeline.setTween() label: ${e} not found`))):new Promise(c=>{let l=i.map(({tween:p})=>{let h=uo({timeline:this.#s,tween:p,index:a});return new Promise((f,d)=>{p.set(h).then(()=>f({resolve:!0})).catch(()=>d())})});Promise.all(l).then(()=>{c({resolve:!0})}).catch(()=>{_b()})})}#q(){this.#M&&(this.#M(u.ANIMATION_STOP_REJECT),this.#M=void 0)}async#ne(){if(this.#A)return Promise.reject(u.ANIMATION_STOP_REJECT);this.#A=!0,await u.useFps(),this.#A=!1}async playFrom(e){return await this.#ne(),this.#J(e,!1)}async playFromReverse(e){return await this.#ne(),this.#J(e,!0)}#J(e,r){return new Promise((o,n)=>{this.playReverse({forceYoYo:!1,resolve:o,reject:n,callback:()=>{this.#s.length===0||this.#k||(this.#y&&this.#j(),this.#g=0,this.#a={isReverse:r,active:!0,index:u.checkType(String,e)?this.#s.findIndex(s=>{let[i]=s;return i.data.labelProps?.name===e}):e,callback:void 0},u.checkType(String,e)&&Bv(this.#a.index,e),this.#F())}})})}async play(){return await this.#ne(),new Promise((e,r)=>{if(this.#l&&this.#U(),this.#i){if(this.#s.length===0||this.#k)return;this.stop(),this.#x=!1,this.#y&&this.#j(),this.#I++,u.useFrameIndex(()=>{this.#M=r,this.#L=e,this.#F()},1);return}this.playReverse({forceYoYo:!1,callback:()=>{this.stop(),this.#x=!1;let o=this.#o.map(({tween:n})=>{let s=n.getInitialData();return new Promise((i,a)=>{n.set(s).then(()=>i({resolve:!0})).catch(()=>a())})});Promise.all(o).then(()=>{this.#M=r,this.#L=e,this.#F()}).catch(()=>{})}})})}async playReverse({forceYoYo:e=!0,callback:r,resolve:o=null,reject:n=null}={}){return await this.#ne(),new Promise((s,i)=>{let a=o??s,c=n??i,l=e;this.#l&&this.#U(),!(this.#s.length===0||this.#k)&&(this.stop(),this.#x=!1,l&&(this.#S=!0),this.#a={active:!0,index:this.#s.length,isReverse:!1,callback:r},this.#m--,this.#I++,u.useFrameIndex(()=>{this.#L=a,this.#M=c,this.#F()},1))})}reverseNext(){this.#C=!0}stop({clearCache:e=!0}={}){this.#x=!0,this.#g=0,this.#m=1,this.#q(),this.#C=!1,this.#Q(),this.#S=!1,this.#v=!1,this.#T=!1,this.#k=!1,this.#R=0,this.#o.forEach(({tween:r})=>{r?.stop?.({clearCache:e})}),this.#y&&this.#j(),this.#y=!1,this.#i||this.#B()}pause(){this.#v||(this.#v=!0,this.#R=u.getTime(),this.#te())}resume(){if(this.#v&&(this.#v=!1,this.#R=0,this.#re()),this.#T){if(this.#T=!1,this.#R=0,this.#g<=this.#s.length-2){this.#g++,this.#F();return}this.#g===this.#s.length-1&&(this.#g=this.#t&&!this.#y?1:0,this.#Q(),this.#t&&this.#j(),this.#m++,this.#F())}}#te(){this.#c.forEach(({tween:e})=>{e?.pause?.()})}#re(){this.#c.forEach(({tween:e})=>{e?.resume?.()})}#Q(){this.#a={active:!1,index:-1,isReverse:!1,callback:void 0}}get(){return this.#c}isActive(){return!this.#x}isPaused(){return this.#v}isSuspended(){return this.#T}getDirection(){return this.#x?We.NONE:this.#y?We.BACKWARD:We.FORWARD}onLoopEnd(e){this.#b.push({cb:e,id:this.#N});let r=this.#N;return()=>{this.#b=this.#b.filter(o=>o.id!==r)}}onComplete(e){this.#D.push({cb:e,id:this.#N});let r=this.#N;return this.#N++,()=>{this.#D=this.#D.filter(o=>o.id!==r)}}destroy(){this.#o.forEach(({tween:e})=>{e?.destroy?.()}),this.#s=[],this.#c=[],this.#D=[],this.#b=[],this.#o=[],this.#g=0,this.#a={active:!1,callback:void 0,index:-1,isReverse:!1}}};var ei=class{#n;#t;#i;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#S;#y;#v;#T;#k;#x;#I;#P;#R;#O;#w;constructor(e={}){this.#n=no(e?.duration),this.#t=de(e?.yoyo,"syncTimeline: yoyo",!1),this.#i=Da(e?.repeat),this.#l=[],this.#h=0,this.#u=0,this.#s=0,this.#c=0,this.#o=0,this.#e=0,this.#p=!1,this.#a=!1,this.#d=!1,this.#f=0,this.#r=0,this.#g=10,this.#m=!0,this.#C=!1,this.#S=!1,this.#y=!1,this.#v=!1,this.#T=0,this.#k=[],this.#x=[],this.#I=[],this.#P=void 0,this.#R=void 0,this.#O={time:0,direction:We.NONE},this.#w={direction:We.NONE,loop:0}}#A(e,r){if(this.#m||this.#y)return;let o=!this.#i||this.#i>=2&&this.#f===this.#i-1?0:1e3/r/2;this.#v&&(this.#c=e-this.#h-this.#u-this.#e),this.#u=Math.trunc(e-this.#h-this.#c-this.#e);let n=this.#p?this.#o-(this.#u-this.#o):this.#u,s=this.getDirection();if(this.#v||(this.#s=ot(n,0,this.#n),this.#C||(this.#l.forEach(i=>{i.draw({partial:this.#s,isLastDraw:!1,useFrame:!0,direction:s})}),this.#O.time=this.#s,this.#O.direction=s,this.#I.forEach(({cb:i})=>{i(this.#O)}))),this.#C=!1,this.#r++,n<=this.#n-o&&n>=0+o&&!this.#m){this.#S=!1,this.#N();return}if(this.#_(),this.#a){this.#p=!0,this.#o=0,this.#e=0,this.#a=!1,this.#N();return}if(u.useNextFrame(()=>{!this.#y&&!this.#S&&this.#r>this.#g&&(this.#S=!0,this.#f++,this.#r=0,this.#w.direction=s,this.#w.loop=this.#f,this.#k.forEach(({cb:i})=>i(this.#w)))}),!this.#i||this.#f===this.#i-1&&this.#r>this.#g){let i=this.#s;this.#l.forEach(a=>{a.draw({partial:i,isLastDraw:!0,useFrame:!0,direction:s})}),this.#m=!0,this.#b(),this.#h=e,this.#p&&(this.#p=!1),this.#x.forEach(({cb:a})=>a()),this.#P&&this.#P(!0);return}if(this.#t){this.reverse(),this.#N();return}if(this.#d){this.#b(),this.#h=e,this.#p||(this.#d=!this.#d),this.#u=this.#n,this.#s=this.#n,this.#c=this.#n,this.#N();return}this.#b(),this.#h=e,this.#p&&(this.#d=!this.#d),this.#N()}#N(){u.useFrame(()=>{u.useNextTick(({time:e,fps:r})=>{this.#y||this.#A(e,r)})})}#b(){this.#u=0,this.#c=0,this.#s=0,this.#o=0,this.#e=0}#D(e){let r=this.#l.reduce((o,n)=>n.getLabels().find(({name:a})=>a===e)||o,{name:"",time:0});return r||Sb(e),r.time}#L(){this.#R&&(this.#R(u.ANIMATION_STOP_REJECT),this.#R=void 0)}play(e={}){this.resume();let r=e?.useCurrent;return r||this.stop(),new Promise((o,n)=>{if(!this.#y&&(this.#L(),this.#P=o,this.#R=n,!(!this.#m&&!this.#p&&r))){if(!this.#m&&this.#p&&r){this.reverse();return}this.#M()}})}playFrom(e=0){return this.resume(),this.stop(),new Promise((r,o)=>{if(this.#y)return;let s=u.checkType(Number,e)?e:this.#D(e);this.#L(),this.#P=r,this.#R=o,this.#M(s)})}#M(e=0){this.#_(),this.#b(),this.#s=e,this.#e=-this.#s,this.#d=!1,this.#r=0,this.#y=!0,this.#$(e)}playFromReverse(e){return this.resume(),this.stop(),new Promise((r,o)=>{if(this.#y)return;let s=u.checkType(Number,e)?e:this.#D(e);this.#L(),this.#P=r,this.#R=o,this.#F(s,!0)})}playReverse(e={}){this.resume();let r=e?.useCurrent;return r||this.stop(),new Promise((o,n)=>{if(!this.#y&&(this.#L(),this.#P=o,this.#R=n,!(!this.#m&&this.#p&&r))){if(!this.#m&&!this.#p&&r){this.reverse();return}this.#F(this.#n,!0)}})}#F(e=0){this.#_(),this.#u=e,this.#s=e,this.#c=e,this.#o=0,this.#e=0,this.#a=!0,this.#d=!0,this.#C=!0,this.#r=0,this.#y=!0,this.#$(e)}async#$(e){if(this.#i===0)return;let{averageFPS:r}=await u.useFps();co("sequencer",r),this.#p=!1,this.#l.forEach(o=>{o.inzializeStagger(),o.disableStagger(),o.draw({partial:e,isLastDraw:!1,useFrame:!0,direction:this.getDirection()})}),u.useFrame(()=>{u.useNextTick(({time:o,fps:n})=>{this.#h=o,this.#y=!1,this.#m=!1,this.#v=!1,this.#f=0,this.#A(o,n)})})}pause({freezeCache:e=!0}={}){if(!(this.#m||this.#v||this.#y)&&(this.#m=!1,this.#v=!0,e)){this.#l.forEach(r=>{r.freezeCachedId()});return}}resume({unFreezeCache:e=!0}={}){if(!(this.#m||!this.#v||this.#y)&&(this.#v=!1,e)){this.#l.forEach(r=>{r.unFreezeCachedId()});return}}reverse(){this.#v&&this.resume(),!(this.#m||this.#y)&&(this.#_(),this.#p=!this.#p,this.#p?this.#o=this.#u:this.#e+=this.#u-this.#s)}stop({clearCache:e=!0}={}){if(this.resume(),this.#m=!0,this.#L(),e){this.#l.forEach(r=>{r.cleanCachedId()});return}this.#l.forEach(r=>{r.draw({partial:this.#s,isLastDraw:!0,useFrame:!0,direction:this.getDirection()})})}add(e){return e.setStretchFactor(this.#n),this.#l.push(e),this}setDuration(e){return this.#n=e,this}#_(){this.#l.forEach(e=>e.resetLastValue())}isActive(){return!this.#m}isPaused(){return this.#v}getDirection(){return this.#m?We.NONE:this.#p?We.BACKWARD:We.FORWARD}getTime(){return this.#s}onLoopEnd(e=()=>{}){this.#k.push({cb:e,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#k=this.#k.filter(o=>o.id!==r)}}onComplete(e=()=>{}){this.#x.push({cb:e,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#x=this.#x.filter(o=>o.id!==r)}}onUpdate(e=()=>{}){this.#I.push({cb:e,id:this.#T});let r=this.#T;return this.#T++,()=>{this.#I=this.#I.filter(o=>o.id!==r)}}destroy(){this.stop(),this.#l.forEach(e=>e.destroy()),this.#l=[],this.#I=[],this.#k=[],this.#x=[]}};function PI(t){return new ei(t)}function AI(t){return new Zs(t)}var Ke={};To(Ke,{createParallax:()=>BI,createScrollTrigger:()=>VI});var OI=({prevValue:t,value:e,maxVal:r})=>e>=r&&t<=r&&r>=0||e<=r&&t>=r&&r<=0?b.ON_LEAVE:e>r&&t<=r&&r<=0||e<r&&t>=r&&r>=0?b.ON_ENTER_BACK:e>=0&&t<=0&&r<=0||e<=0&&t>=0&&r>=0?b.ON_LEAVE_BACK:e>0&&e<r&&t<=0&&r>=0||e<0&&t>=0&&r<=0?b.ON_ENTER:b.ON_NOOP;function by({prevValue:t,value:e,maxVal:r,onEnter:o,onEnterBack:n,onLeave:s,onLeaveBack:i}){switch(OI({prevValue:t,value:e,maxVal:r})){case b.ON_LEAVE:{s&&s();break}case b.ON_ENTER_BACK:{n&&n();break}case b.ON_LEAVE_BACK:{i&&i();break}case b.ON_ENTER:{o&&o();break}}}var $I=({startMarker:t,endMarker:e,label:r})=>{if(!t&&!e){let o=r.replaceAll(/^[^a-z]+|[^\w.:-]+/gi,"-"),n=document.createElement("span");n.className+=`p-marker p-marker--start  p-marker-${o}`,n.innerHTML=`start ${o}`;let s=document.createElement("span");s.className+=`p-marker p-marker--end  p-marker-${o}`,s.innerHTML=`end ${o}`,document.body.append(n),document.body.append(s);let i=document.querySelector(`.p-marker--start.p-marker-${o}`),a=document.querySelector(`.p-marker--end.p-marker-${o}`);return{lastStartMarker:i??void 0,lastEndMarkerEl:a??void 0}}return{lastStartMarker:t,lastEndMarkerEl:e}},LI=({screen:t})=>{if(t===globalThis)return{top:0,right:0,bottom:0,left:0};let e=t.getBoundingClientRect();return{top:e.top,right:document.documentElement.clientWidth-(e.left+t.offsetWidth),bottom:window.innerHeight-(e.top+t.offsetHeight),left:e.left}},DI=({startPoint:t,direction:e,invertSide:r,top:o,bottom:n,left:s,right:i})=>e===b.DIRECTION_VERTICAL?r?{right:0,width:"100vw",height:"3px",top:`${t+o}px`,padding:"0 30px",pointerEvents:"none"}:{right:0,width:"100vw",height:"3px",bottom:`${t+n}px`,padding:"0 30px",pointerEvents:"none"}:r?{top:0,height:"100vw",width:"3px",left:`${t+s}px`,padding:"30px 0",pointerEvents:"none"}:{top:0,height:"100vw",width:"3px",right:`${t+i}px`,padding:"30px 0",pointerEvents:"none"},FI=({startPoint:t,endPoint:e,direction:r,invertSide:o,top:n,bottom:s,left:i,right:a})=>r===b.DIRECTION_VERTICAL?o?{right:0,width:"100vw",height:"3px",top:`${t+e+n}px`,padding:"0 30px",pointerEvents:"none"}:{right:0,width:"100vw",height:"3px",bottom:`${t+e+s}px`,padding:"0 30px",pointerEvents:"none"}:o?{top:0,height:"100vw",width:"3px",left:`${t+e+i}px`,padding:"30px 0",pointerEvents:"none"}:{top:0,height:"100vw",width:"3px",right:`${t+e+a}px`,padding:"30px 0",pointerEvents:"none"},vy=({startMarker:t,endMarker:e,startPoint:r,endPoint:o,screen:n,direction:s,invertSide:i,label:a})=>{let{lastStartMarker:c,lastEndMarkerEl:l}=$I({startMarker:t,endMarker:e,label:a}),{top:p,right:h,bottom:f,left:d}=LI({screen:n}),v=DI({startPoint:r,direction:s,invertSide:i,top:p,bottom:f,left:d,right:h}),y=FI({startPoint:r,endPoint:o,direction:s,invertSide:i,top:p,bottom:f,left:d,right:h}),T={position:"fixed",zIndex:"99999",background:he.get("scrollTrigger")?.markerColor?.startEnd||"#ff0000",fontSize:"14px",whiteSpace:"nowrap",textTransform:"uppercase"};return u.useFrame(()=>{Object.assign(c?.style,{...T,...v}),Object.assign(l?.style,{...T,...y})}),{startMarker:c,endMarker:l}};var yy=({marker:t,direction:e,invertSide:r})=>{if(!t)return{};let n=`3px ${he.get("scrollTrigger")?.markerColor?.item||"#14df3b"} solid`;return e===b.DIRECTION_VERTICAL?r?{borderBottom:n}:{borderTop:n}:r?{borderRight:n}:{borderLeft:n}};var sc=class{#n=0;#t=0;#i=0;#l;#h;#u;#s;#c;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#S;#y;#v;#T;#k;#x;#I;#P;#R;#O;#w;#A;#N;#b;#D;#L;#M;#F;#$;#_;#X;#j;#E;#W;#B;constructor(){this.#l=void 0,this.#h=0,this.#u=()=>0,this.#s=()=>0,this.#c=b.DIRECTION_VERTICAL,this.#o=0,this.#e=void 0,this.#p=void 0,this.#a=void 0,this.#r=void 0,this.#g=!1,this.#m=!1,this.#C=!1,this.#S=()=>{},this.#y=()=>{},this.#v=()=>{},this.#T=!0,this.#d=void 0,this.#f=globalThis,this.#E="left",this.#B=!0,this.#W=!1,this.#k=["flex","flex-shrink","flex-basis","float","display","grid-area","grid-column-start","grid-column-end","grid-row-start","grid-row-end","box-sizing","order","place-self","align-self","justify-self"],this.#x=["font-size","padding","margin","line-height","white-space"],this.#I=["text-align"],this.#P=["z-index","pointer-events"],this.#R=["transform","position","translate","rotate","scale"],this.#O=["none","static"],this.#w=!1,this.#A=0,this.#N=0,this.#b=!1,this.#D=1.5,this.#L=!1,this.#M=!1,this.#F=0,this.#$=0,this.#_=!1,this.#X=0,this.#j=3}init(e){this.#e=e.item,this.#d=e.marker,this.#f=e.screen,this.#b=e.animatePin,this.#B=e.anticipatePinOnLoad,this.#L=e.forceTranspond,this.#l=e.invertSide,this.#c=e.direction,this.#u=e.getStart,this.#s=e.getEnd,this.#t=this.#u(),this.#h=this.#s(),this.#N=window.scrollY,this.#n=e?.scrollerHeight,this.#Z(),this.#E=this.#c===b.DIRECTION_VERTICAL?"top":"left",this.#w=!0,this.#T=!0,this.#ne(),this.#te(),this.#J(),this.#U(),this.#y=u.useScrollStart(()=>{this.#w&&this.#f!==globalThis&&this.#m&&this.#r&&u.useFrame(()=>{this.#r&&(this.#r.style.transition="transform .85s cubic-bezier(0, 0.68, 0.45, 1.1)")})}),this.#S=u.useScroll(({scrollY:r})=>{if(this.#w&&this.#f!==globalThis&&this.#f!==document.documentElement){this.#c===b.DIRECTION_VERTICAL&&this.#Z();let o=r-this.#N;if(this.#N=r,this.#m&&this.#r&&this.#p){let{verticalGap:n}=this.#p.get(),s=n-o;this.#p.setData({collision:0,verticalGap:s}),u.useFrame(()=>{this.#r&&(this.#r.style.transform=`translate(0px,${s}px)`)})}}})}#U(){this.#p=new Tt({data:{collision:0,verticalGap:0},config:"wobbly"}),this.#v=this.#p.subscribe(({collision:e,verticalGap:r})=>{this.#c===b.DIRECTION_VERTICAL&&this.#r?this.#r.style.transform=`translate(0px, ${e}px)`:this.#r&&(this.#r.style.transform=`translate(${e}px, ${r}px)`)})}#q(){this.#r&&this.#p&&this.#p.set({collision:0,verticalGap:0}).catch(()=>{})}#ne(){this.#e||(this.#e=document.createElement("div"));let e=document.createElement("div");e.classList.add("pin-wrapper");let r=document.createElement("div");r.classList.add("pin"),e.append(r);let o=this.#e?.parentNode;o&&o.insertBefore(e,this.#e),r.append(this.#e),this.#a=this.#e.closest(".pin-wrapper"),this.#r=this.#e.closest(".pin");let n=this.#Q(),s=this.#H(),i=yy({marker:this.#d,invertSide:this.#l,direction:this.#c}),a={display:"table"};u.useFrame(()=>{!this.#r||!this.#a||(Object.assign(this.#a.style,{...i}),Object.assign(this.#r.style,{...a,...s,...n}))}),this.#oe()}#J(){if(!this.#r||!this.#a)return;let e=this.#a.offsetHeight,r=this.#a.offsetWidth;this.#a.style.height=`${e}px`,this.#a.style.width=`${r}px`,this.#r.style.height=`${e}px`,this.#r.style.width=`${r}px`}#te(){if(!this.#e)return;let e=globalThis.getComputedStyle(this.#e),r=this.#k.reduce((o,n)=>({...o,[n]:e.getPropertyValue(n)}),{});u.useFrame(()=>{this.#a&&Object.assign(this.#a.style,r)})}#re(e,r){let o=e.parentNode;if(o)for(;o!==null&&o!==document;){let n=getComputedStyle(o);if(n[r]&&!this.#O.includes(n[r]))return{[r]:n[r]};o=o.parentNode}}#Q(){return this.#r?this.#I.map(r=>this.#re(this.#r,r)).filter(Boolean).reduce((r,o)=>({...r,...o}),{})??{}:{}}#oe(){if(this.#L){this.#W=!0;return}this.#W=this.#R.map(e=>{let r=this.#re(this.#a,e);if(!r)return!1;let[o]=Object.keys(r),[n]=Object.values(r);return o==="position"?n==="fixed"||n==="absolute":!0}).includes(!0)}#ie(){this.#t=this.#u(),this.#h=this.#s()}#Z(){this.#ie(),this.#f!==globalThis&&(this.#t-=this.#c===b.DIRECTION_VERTICAL?St(this.#f).top:St(this.#f).left),this.#i=this.#l?this.#t:this.#n-this.#t,this.#o=this.#l?-Math.trunc(this.#h):Math.trunc(this.#h)}destroy(){this.#w&&(this.#p?.stop?.(),this.#v(),this.#S(),this.#y(),this.#p?.destroy?.(),this.#p=null,this.#F=0,this.#M=!1,this.#C=!1,this.#m=!1,this.#g=!1,this.#r&&this.#a&&(this.#a.parentNode?.insertBefore(this.#e,this.#a),this.#r.remove(),this.#a.remove(),this.#a=void 0,this.#r=void 0,this.#w=!1))}#ae(){return this.#a?this.#c===b.DIRECTION_VERTICAL?St(this.#a).top-this.#i:St(this.#a).left-this.#i:0}#ve(){let e=this.#ae();this.#be(e)}#fe(){let e=this.#l?this.#ae()-this.#h:this.#ae()+this.#h;this.#be(e)}#be(e){u.useFrame(()=>{if(!this.#r||!this.#E)return;let r=this.#r?.style??{};r[this.#E]=`${this.#i}px`}),this.#b&&!this.#T&&this.#r&&this.#p&&this.#p.goFrom({collision:e}).then(()=>{this.#ye()}).catch(()=>{})}#ye(){u.useFrame(()=>{this.#r&&(this.#r.style.transform="translate(0px, 0px)")})}#Y(){this.#q(),u.useFrame(()=>{this.#r&&(this.#r.style.transition="",this.#r.style.position="relative",this.#r.style.top="",this.#r.style.left="")})}#K(){this.#q(),u.useFrame(()=>{this.#r&&(this.#r.style.transition="",this.#r.style.position="relative",this.#c===b.DIRECTION_VERTICAL?(this.#r.style.left="",this.#r.style.top=`${this.#o}px`):(this.#r.style.top="",this.#r.style.left=`${this.#o}px`))})}#z(){if(!this.#r)return;let e=this.#c===b.DIRECTION_VERTICAL?St(this.#r).left:St(this.#r).top,r=this.#c===b.DIRECTION_VERTICAL?"left":"top";u.useFrame(()=>{this.#r&&(this.#r.style.position="fixed",this.#r.style[r]=`${e}px`,this.#M=!0,this.#_=!0)})}#H(){if(!this.#e)return{};let e=globalThis.getComputedStyle(this.#e);return this.#P.reduce((r,o)=>({...r,[o]:e.getPropertyValue(o)}),{})}#ee(){if(!this.#e)return{};let e=globalThis.getComputedStyle(this.#e);return this.#x.reduce((r,o)=>({...r,[o]:e.getPropertyValue(o)}),{})}#ce(){return this.#x.reduce((e,r)=>({...e,[r]:""}),{})}#V(){if(this.#W){let e=this.#Q(),r=this.#H(),o=this.#ee();u.useFrame(()=>{this.#r&&(Object.assign(this.#r.style,{...r,...e}),this.#e&&Object.assign(this.#e.style,o),document.body.append(this.#r))})}}#he(){!this.#W||!this.#e||!this.#a||u.useFrame(()=>{this.#r&&(Object.assign(this.#e.style,this.#ce()),this.#a?.append(this.#r))})}#de(e){let r=this.#_&&this.#X<3?this.#$:ot(Math.abs(e-this.#A),0,250);return this.#_&&this.#X<this.#j?this.#X++:(this.#X=0,this.#_=!1),this.#$=r,r*this.#D}#G(e,r){if(this.#b&&!this.#T||this.#T&&!this.#B)return{anticipateBottom:0,anticipateInnerIn:0,anticipateInnerOut:0};let o=this.#de(e),n=r===b.SCROLL_UP?0:o,s=r===b.SCROLL_UP?0:o*2,i=r===b.SCROLL_UP?o:0;return{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}}#ge(e,r){if(this.#b&&!this.#T||this.#T&&!this.#B)return{anticipateBottom:0,anticipateInnerIn:0,anticipateInnerOut:0};let o=this.#de(e),n=r===b.SCROLL_UP?o:0,s=r===b.SCROLL_UP?o*2:0,i=r===b.SCROLL_UP?0:o;return{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}}onScroll(e){if(!this.#w||!this.#a)return;if(this.#M&&this.#F<this.#j){this.#F++;return}else this.#F=0,this.#M=!1;let r=this.#A>e?b.SCROLL_UP:b.SCROLL_DOWN,o=this.#c===b.DIRECTION_VERTICAL?St(this.#a).top:St(this.#a).left,{anticipateBottom:n,anticipateInnerIn:s,anticipateInnerOut:i}=this.#l?this.#ge(e,r):this.#G(e,r),a=this.#l?o<this.#t-n:o>this.#n-this.#t+n,c=this.#l?o>=this.#t-s&&o<=this.#t+i+this.#h:o<=this.#n-this.#t+s&&this.#n-o<=this.#h+i+this.#t;if(a)this.#C||(this.#Y(),this.#he(),this.#C=!0,this.#m=!1,this.#g=!1);else if(c){if(!this.#m){this.#z();let l=r===b.SCROLL_DOWN&&!this.#l||r===b.SCROLL_UP&&this.#l;this.#V(),l?this.#ve():this.#fe(),this.#C=!1,this.#m=!0,this.#g=!1}}else this.#g||(this.#K(),this.#he(),this.#C=!1,this.#m=!1,this.#g=!0);this.#A=e,this.#T=!1}};var Ty=()=>{console.warn("parallax prop checker: value in start or end prop with no unit misure is not allowed, failed operation, use vh in vertical mode or vw in horizontal or px")},_y=()=>{console.warn("parallax prop checker: value in start or end in vh is not allowed in horizontal mode, use vw or px")},Sy=()=>{console.warn("parallax prop checker: value in start or end in vw is not allowed in vertical mode, use vh or px")};var Wu=()=>({numberVal:0,unitMisure:"",additionalVal:"",position:""}),xy=({invert:t,endValInNumber:e,scrollerHeight:r,startPoint:o,isFromTopLeft:n})=>{let s=e-o,i=r-e-o;return t?n?s:i:n?i:s},Cy=({invert:t,scrollerHeight:e,screenUnit:r,endValInNumber:o,startPoint:n,isFromTopLeft:s})=>t?s?e-r*(100-o)-n:r*(100-o)-n:s?e-r*o-n:r*o-n,Ey=({offset:t,height:e,gap:r,wScrollTop:o,wHeight:n})=>t+e>o-r&&t<o+(n+r),wy=(t,e)=>{let r=t.find(c=>[...c].some(l=>!Number.isNaN(Number.parseFloat(l)))),o=Cv(r);if(r&&!o)return Ty(),Wu();if(r&&o===b.VH&&e===b.DIRECTION_HORIZONTAL)return _y(),Wu();if(r&&o===b.VW&&e===b.DIRECTION_VERTICAL)return Sy(),Wu();let n=[b.PLUS_HEIGHT,b.PLUS_HEIGHT_HALF,b.PLUS_WIDTH,b.PLUS_WIDTH_HALF,b.MINUS_HEIGHT,b.MINUS_HEIGHT_HALF,b.MINUS_WIDTH,b.MINUS_WIDTH_HALF],s=t.find(c=>xu(n,c)),i=[b.POSITION_BOTTOM,b.POSITION_TOP,b.POSITION_LEFT,b.POSITION_RIGHT],a=t.find(c=>xu(i,c));return{numberVal:r||0,unitMisure:o,additionalVal:s??"",position:a??b.POSITION_BOTTOM}},Iy=(t,e,r)=>{let n=String(e).split(" "),{numberVal:s,unitMisure:i,additionalVal:a,position:c}=wy(n,r),l=Number.parseFloat(String(s)),p=Number.isNaN(l)?0:l;return i===b.PX?{value:p,additionalVal:a,position:Oa(c)}:{value:t*p,additionalVal:a,position:Oa(c)}},My=(t,e,r,o,n,s)=>{let a=String(e).split(" "),{numberVal:c,unitMisure:l,additionalVal:p,position:h}=wy(a,s),f=Number.parseFloat(String(c)),d=Number.isNaN(f)?0:f,v=Oa(h),y=v===b.POSITION_TOP||v===b.POSITION_LEFT;return l===b.PX?{value:xy(n?{invert:!0,endValInNumber:d,scrollerHeight:o,startPoint:r,isFromTopLeft:y}:{invert:!1,endValInNumber:d,scrollerHeight:o,startPoint:r,isFromTopLeft:y}),additionalVal:p,position:v}:{value:Cy(n?{invert:!0,scrollerHeight:o,screenUnit:t,endValInNumber:d,startPoint:r,isFromTopLeft:y}:{invert:!1,scrollerHeight:o,screenUnit:t,endValInNumber:d,startPoint:r,isFromTopLeft:y}),additionalVal:p,position:v}},ju=(t,e,r,o)=>{let n=String(e);return De(n,b.PLUS_HEIGHT_HALF)?t+r/2:De(n,b.PLUS_HEIGHT)?t+r:De(n,b.PLUS_WIDTH_HALF)?t+o/2:De(n,b.PLUS_WIDTH)?t+o:De(n,b.MINUS_HEIGHT_HALF)?t-r/2:De(n,b.MINUS_HEIGHT)?t-r:De(n,b.MINUS_WIDTH_HALF)?t-o/2:De(n,b.MINUS_WIDTH)?t-o:t},ky=({switchPropierties:t,isReverse:e,value:r})=>{switch(t){case b.IN_STOP:return!e&&r>0||e&&r<0?0:r;case b.IN_BACK:return!e&&r>0||e&&r<0?-r:r;case b.OUT_STOP:return!e&&r<0||e&&r>0?0:r;case b.OUT_BACK:return!e&&r<0||e&&r>0?-r:r;default:return r}},Ry=(t,e)=>t===b.PROP_OPACITY?1-e:-e,zu=({callback:t,pin:e,ease:r,useThrottle:o})=>e?u.useScrollImmediate(t):r&&o?u.useScrollThrottle(t):u.useScroll(t);var po=class{#n=!1;#t=!1;#i=0;#l=0;#h=0;#u=0;#s=0;#c=0;#o=0;#e;#p;#a;#d;#f;#r;#g;#m;#C;#S;#y;#v;#T;#k;#x;#I;#P;#R;#O;#w;#A;#N;#b;#D;#L;#M;#F;#$;#_;#X;#j;#E;#W;#B;#U;#q;#ne;#J;#te;#re;#Q;#oe;#ie;#Z;#ae;#ve;#fe;#be;#ye;#Y;#K;#z;#H;#ee;#ce;#V;#he;#de;#G;#ge;#se;#le;#ue;#Te;#_e;#pe;#Ee;#we;#Ie;#Re;#me;constructor(e){this.#e=window.innerWidth,this.#p=window.innerHeight,this.#a=800,this.#d=0,this.#f=()=>{},this.#r=()=>{},this.#g=()=>{},this.#m=()=>{},this.#C=()=>{},this.#S=void 0,this.#y=void 0,this.#v=void 0,this.#T=0,this.#k=!1,this.#x=void 0,this.#I=!0,this.#P=!1,this.#R=!1,this.#O=!1,this.#w=void 0,this.#A="",this.#N=0,this.#b=0,this.#D=()=>{},this.#L=()=>{},this.#E=!1,this.#M=de(e?.pin,"Scrolltrigger pin propierties error:",!1),this.#F=de(e?.animatePin,"Scrolltrigger animatePin propierties error:",!1),this.#$=de(e?.forceTranspond,"Scrolltrigger forceTranspond propierties error:",!1),this.#_=de(e?.anticipatePinOnLoad,"Scrolltrigger anticipatePinOnLoad propierties error:",!1),this.#X=Va(e?.start,"Scrolltrigger start propierties error:","bottom 0px"),this.#j=Va(e?.end,"Scrolltrigger end propierties error:","top"),this.#W=Va(e?.marker,"Scrolltrigger marker propierties error:",void 0),this.#B=e?.dynamicStart?Ru(e.dynamicStart,"dynamicStart"):null,this.#U=e?.dynamicEnd?Ru(e.dynamicEnd,"dynamicEnd"):null,this.#q=zv(e?.dynamicRange),this.#ne=de(e?.animateAtStart,"Scrolltrigger animateAtStart propierties error:",!1),this.#J=io(e?.onEnter,!1,"Scrolltrigger onEnter propierties error"),this.#te=io(e?.onEnterBack,!1,"Scrolltrigger onEnterBack propierties error"),this.#re=io(e?.onLeave,!1,"Scrolltrigger onLeave propierties error"),this.#Q=io(e?.onLeaveBack,!1,"Scrolltrigger onLeaveBack propierties error"),this.#oe=io(e?.onTick,!1,"Scrolltrigger onTickCallback propierties error"),this.#ie=Uv(e?.align),this.#Z=Gv(e?.onSwitch),this.#ae=de(e?.reverse,"Parallax reverse propierties error:",!1),this.#ve=Nu(e?.opacityStart,"Parallax opacityStart propierties error:",100),this.#fe=Nu(e?.opacityEnd,"Parallax opacityEnd propierties error:",0),this.#be=de(e?.limiterOff,"Parallax|Scrolltrigger limiterOff propierties error:",!1),this.#ye=e?.useWillChange,this.#Y=Hv(e?.tween);let r=this.#Y?.getType&&this.#Y.getType()===b.TWEEN_TIMELINE,o=this.#Y?.getType&&this.#Y.getType()===b.TWEEN_TWEEN;this.#K=$n(e?.item,!1),this.#z=$n(e?.scroller,!0),this.#H=$n(e?.screen,!0),this.#ee=ku(e?.trigger),this.#ce=ku(e?.applyTo),this.#V=Ws(e?.direction,"Parallax/Scrolltrigger"),this.#he=de(e?.disableForce3D,"Parallax|Scrolltrigger disableForce3D propierties error:",!1),this.#de=de(e?.useThrottle,"Parallax|Scrolltrigger useThrottle propierties error:",!1),this.#G=qv(e?.type),this.#ge=rr(e?.perspective,"Parallax|Scrolltrigger perspective propierties error:",0),this.#se=Do(e?.breakpoint,"breakpoint","parallax/scrolltrigger"),this.#le=Fo(e?.queryType,"queryType","parallax/scrolltrigger");let{propierties:n,shouldTrackOnlyEvents:s}=Yv(e?.propierties,this.#G,o,r);this.#ue=n,this.#Te=s,this.#_e=s?"100px":Jv(e?.range,this.#G),this.#pe=de(e?.ease,"Parallax|Scrolltrigger ease propierties error:",!1),r&&e?.easeType===b.EASE_SPRING&&uv(),this.#Ee=r?b.EASE_LERP:Xv(e?.easeType),this.#we=Kv(e?.springConfig,this.#G),this.#Ie=Qv(e?.lerpConfig,this.#G),this.#Re=this.#Ee===b.EASE_SPRING?{configProps:{precision:b.EASE_PRECISION}}:{precision:b.EASE_PRECISION},this.#me=this.#Ee===b.EASE_SPRING?new Tt:new kr}init(){if(this.#n){console.warn("Parallax/scrollTrigger: The init() method cannot be launched more than once. If you are passing the instance to components like horizontalScroller or smoothScroller via the children property, they will initialize the instance.");return}this.#n=!0,this.#We(),this.#Oe(),this.#Ae(),this.#$e(),this.#Le(),this.#Fe(),this.setPerspective(),this.#ue===b.PROP_TWEEN&&(this.#_e=this.#Y?.getDuration?this.#Y.getDuration():0,this.#q=()=>this.#_e,this.#Y?.inzializeStagger?.()),this.#G==b.TYPE_SCROLLTRIGGER&&(this.#be=!0,this.#Pe(),this.#Me()),this.#pe&&(this.#g=u.useScrollStart(()=>{this.#he||(this.#O=!0)}),this.#m=u.useScrollEnd(()=>{u.useFrame(()=>{u.useNextTick(()=>{this.#Ce()})})}),this.#z===globalThis&&(this.#r=zu({pin:this.#M,ease:this.#pe,useThrottle:this.#de,callback:()=>{this.#Ce()}})),this.#Ce()),this.#pe||(this.#z===globalThis&&(this.#r=zu({pin:this.#M,ease:this.#pe,useThrottle:this.#de,callback:()=>{this.#xe(),this.#Se()}})),this.#xe(),this.#Se(),this.#m=u.useScrollEnd(()=>{this.#Se({forceRender:!0})})),this.#z!==globalThis&&this.#W&&(this.#C=u.useScroll(()=>{this.#Me()})),this.#f=u.useResize(({horizontalResize:e})=>{e&&this.refresh()}),this.#M&&(this.#w=new sc,ve[this.#le](this.#se)&&u.useNextTick(()=>{this.#De(),this.#w?.init(this.#Ne()),this.#w?.onScroll(this.#c)}))}#Ne(){return{item:this.#K,marker:this.#W,screen:this.#H,animatePin:this.#F,anticipatePinOnLoad:this.#_,forceTranspond:this.#$,invertSide:this.#E,direction:this.#V,scrollerHeight:this.#o,getStart:()=>this.#N,getEnd:()=>this.#b}}setScroller(e){this.#z=$n(e,!0)}setScreen(e){this.#H=$n(e,!0)}setDirection(e){this.#V=Ws(e,"Parallax/Scrolltrigger")}setBreakPoint(e){this.#se=Do(e,"breakpoint","Parallax/Scrolltrigger")}setQueryType(e){this.#le=Fo(e,"queryType","Parallax/Scrolltrigger")}setPerspective(){if(this.#ge&&this.#K&&this.#K.parentNode){let e={perspective:`${this.#ge}px`,"transform-style":"preserve-3d"},r=this.#K.parentNode;Object.assign(r.style,e)}}#We(){let e=b.PROP_SCALE||b.PROP_SCALE_X||b.PROP_SCALE_Y||b.PROP_OPACITY?1:0;switch(this.#me.setData({val:e}),this.#D=this.#me.subscribe(({val:r})=>{r!==this.#v&&(this.#ue===b.PROP_TWEEN&&this.#Y?.draw?(this.#Y.draw({partial:r,isLastDraw:!1,useFrame:!1}),this.#v=r,this.#I=!1):this.#ke(r),u.useNextTick(()=>{this.#oe&&this.#oe({value:r,parentIsMoving:!0})}))}),this.#L=this.#me.onComplete(({val:r})=>{this.#O=!1,this.#ue===b.PROP_TWEEN&&this.#Y?.draw?this.#Y.draw({partial:r,isLastDraw:!0,useFrame:!1}):this.#ke(r),u.useNextTick(()=>{this.#oe&&this.#oe({value:r,parentIsMoving:!1})})}),this.#Ee){case b.EASE_LERP:{this.#Ie&&"updateVelocity"in this.#me&&this.#me?.updateVelocity?.(this.#Ie);break}case b.EASE_SPRING:{this.#we&&"updateConfig"in this.#me&&this.#me?.updateConfig?.(this.#we);break}}}#Pe(){if(this.#q){let e=this.#q();this.#d=Number.isNaN(e)?0:Number.parseFloat(e),this.#A=b.PX}else{let e=String(this.#_e),r=Zv(e,this.#ue),o=Number.parseFloat(e);this.#d=Number.isNaN(o)?0:o,this.#A=Ev(r)}}#Me(){let e=this.#o/100;if(this.#B&&this.#B?.position&&this.#B?.value?.()!==void 0){let{position:l,value:p}=this.#B,h=p();Number.isNaN(h)||(this.#X=`${l} ${h}px`)}let{value:r,additionalVal:o,position:n}=Iy(e,this.#X,this.#V);if(this.#E=n===b.POSITION_TOP||n===b.POSITION_LEFT,this.#N=ju(r,o,this.#V===b.DIRECTION_VERTICAL?this.#u:this.#s,this.#V===b.DIRECTION_VERTICAL?this.#s:this.#u),this.#U&&this.#U?.position&&this.#U?.value?.()!==void 0){let{position:l,value:p}=this.#U,h=p();Number.isNaN(h)||(this.#j=`${l} ${h}px`)}let{value:s,additionalVal:i,position:a}=My(e,this.#j,this.#N,this.#o,this.#E,this.#V),c=this.#E?a===b.POSITION_BOTTOM||a===b.POSITION_RIGHT?-1:1:a===b.POSITION_BOTTOM||a===b.POSITION_RIGHT?1:-1;this.#b=ju(s,i,this.#V===b.DIRECTION_VERTICAL?this.#u*c:this.#s*c,this.#V===b.DIRECTION_VERTICAL?this.#s*c:this.#u*c),this.#je(),this.#E&&(this.#N-=this.#u)}#je(){if(this.#W){let{startMarker:e,endMarker:r}=vy({startMarker:this.#S,endMarker:this.#y,startPoint:this.#N,endPoint:this.#b,screen:this.#H,direction:this.#V,invertSide:this.#E,label:this.#W});this.#S=e,this.#y=r}}#Ae(){let e=this.#ee??this.#K;if(!e)return;let r=0,o=0,n=0;this.#ee&&(r=So(this.#ee)?.x??0,o=So(this.#ee)?.y??0,n=So(this.#ee)?.z??0),e.style.transform="",this.#V===b.DIRECTION_VERTICAL?this.#i=this.#z===globalThis?Math.trunc(be(e).top):Math.trunc(be(e).top)-be(this.#z).top:this.#i=this.#z===globalThis?Math.trunc(be(e).left):Math.trunc(be(e).left)-be(this.#z).left,this.#H&&this.#H!==globalThis&&(this.#i-=this.#V===b.DIRECTION_VERTICAL?Math.trunc(be(this.#H).top):Math.trunc(St(this.#H).left)),this.#ee&&(r!==0||o!==0||n!==0)&&(this.#ee.style.transform=`translate3D(${r}px, ${o}px, ${n}px)`)}#Oe(){this.#H===globalThis||!this.#H||(this.#l=this.#V===b.DIRECTION_VERTICAL?Math.trunc(be(this.#H).top):Math.trunc(St(this.#H).left))}#$e(){let e=this.#ee??this.#K;e&&(this.#u=this.#V===b.DIRECTION_VERTICAL?Math.trunc(e.offsetHeight):Math.trunc(e.offsetWidth))}#Le(){let e=this.#ee??this.#K;e&&(this.#s=this.#V===b.DIRECTION_VERTICAL?Math.trunc(e.offsetWidth):Math.trunc(e.offsetHeight))}#De(){this.#z&&(this.#z===globalThis?this.#c=this.#V===b.DIRECTION_VERTICAL?this.#z.scrollY:this.#z.scrollX:this.#c=this.#V===b.DIRECTION_VERTICAL?-be(this.#z).top:-be(this.#z).left)}#Fe(){this.#H&&(this.#e=window.innerWidth,this.#p=window.innerHeight,this.#H===globalThis?this.#o=this.#V===b.DIRECTION_VERTICAL?window.innerHeight:window.innerWidth:this.#o=this.#V===b.DIRECTION_VERTICAL?Math.trunc(this.#H.offsetHeight):Math.trunc(this.#H.offsetWidth))}refresh(){this.#M&&this.#w&&this.#w.destroy(),this.#Oe(),this.#Ae(),this.#$e(),this.#Le(),this.#Fe(),this.#G==b.TYPE_SCROLLTRIGGER&&(this.#Me(),this.#q&&this.#Pe(),this.#M&&this.#w&&ve[this.#le](this.#se)&&this.#w?.init(this.#Ne())),this.#v=void 0,this.#I=!0,ve[this.#le](this.#se)?this.#pe?this.#Ce():(this.#xe(),this.#Se({forceRender:!0})):(this.#pe&&this.#me?.stop?.(),u.useFrameIndex(()=>{this.#ce?(this.#Be(this.#ce),Object.assign(this.#ce.style,this.#Ve())):(this.#Be(this.#K),this.#K&&Object.assign(this.#K.style,this.#Ve()))},3))}move({value:e,parentIsMoving:r=!1}){if(!ve[this.#le](this.#se)||!e)return;this.#R=!0;let o=this.#ze(e);if(this.#pe)this.#Ce(o);else{this.#xe(o);let n=this.#P||this.#I||void 0;this.#Se({forceRender:n,parentIsMoving:r})}}triggerScrollStart(){this.#pe&&(this.#he||(this.#O=!0))}triggerScrollEnd(){this.#pe||this.#Se({forceRender:!0})}#ze(e){if(e!==void 0)return this.#H!==globalThis?e+this.#l:e}stopMotion(){this.#me?.stop?.()}#xe(e){if(!ve[this.#le](this.#se)||(e?this.#c=-e:this.#De(),this.#P=Ey({offset:this.#i,height:this.#u,gap:this.#a,wScrollTop:this.#c,wHeight:this.#o}),!this.#P&&!this.#be&&this.#G===b.TYPE_PARALLAX))return;this.#M&&this.#w&&this.#w.onScroll(this.#c),this.#G===b.TYPE_SCROLLTRIGGER?this.#h=_e(this.#He()):this.#ue===b.PROP_OPACITY?this.#h=_e(this.#Ge()):this.#h=Number.isNaN(Number.parseInt(this.#ie))?_e(this.#qe()/2):_e(this.#Je()/2);let r=this.#ae&&this.#G!==b.TYPE_SCROLLTRIGGER?Ry(this.#ue,this.#h):this.#h;this.#h=this.#G===b.TYPE_SCROLLTRIGGER?r:this.#Ye(r)}#Ce(e){if(!ve[this.#le](this.#se)||(this.#xe(e),!this.#k&&!this.#I&&this.#G===b.TYPE_SCROLLTRIGGER)||!this.#P&&!this.#I&&this.#G===b.TYPE_PARALLAX)return;let r=this.#I&&!this.#ne?"set":"goTo";this.#me&&this.#me[r]({val:this.#h},this.#Re).catch(()=>{})}#Se({forceRender:e=!1,parentIsMoving:r=!1}={}){ve[this.#le](this.#se)&&u.useFrame(()=>{this.#h===this.#v&&!e||!this.#P&&!e||(!this.#he&&!this.#R&&(this.#O=!e),!this.#he&&this.#R&&(this.#O=r&&this.#P),this.#ue===b.PROP_TWEEN?(this.#Y.draw({partial:this.#h,isLastDraw:!this.#O,useFrame:!1}),this.#v=this.#h,this.#I=!1):this.#ke(this.#h),u.useNextTick(()=>{this.#oe&&this.#oe({value:this.#h,parentIsMoving:this.#O})}))})}#He(){let e=this.#E?-(this.#c+this.#N+this.#b-(this.#i+this.#b)):-(this.#c+this.#o-this.#N-(this.#i+this.#b)),r=this.#b/100*this.#d,o=e/100*this.#d,n=this.#ae?this.#E?r-o:o:this.#E?o:r-o,s=r>0?-ot(n,0,r):-ot(n,r,0);if(this.#k=this.#x!==s,this.#x=s,!this.#k&&!this.#I)return this.#h;let i=s*100/this.#b;switch((this.#J||this.#te||this.#re||this.#Q)&&by({prevValue:this.#T,value:n,maxVal:r,onEnter:this.#J,onEnterBack:this.#te,onLeave:this.#re,onLeaveBack:this.#Q}),this.#T=n,this.#ue){case b.PROP_HORIZONTAL:case b.PROP_VERTICAL:return this.#Ue(i);case b.PROP_SCALE:case b.PROP_SCALE_X:case b.PROP_SCALE_Y:case b.PROP_OPACITY:return 1-i;default:return-i}}#Ue(e){switch(this.#A){case b.VW:return this.#e/100*-e;case b.VH:return this.#p/100*-e;case b.WPERCENT:return this.#V===b.DIRECTION_VERTICAL?this.#s/100*-e:this.#u/100*-e;case b.HPERCENT:return this.#V===b.DIRECTION_VERTICAL?this.#u/100*-e:this.#s/100*-e;default:return-e}}#Ge(){let e=this.#o/100*this.#fe,r=this.#o-this.#o/100*this.#ve,o=this.#ie==b.ALIGN_START?-this.#c*-1:(this.#c+e-this.#i)*-1,n=this.#ie==b.ALIGN_START?1-o/this.#i:1-o/(this.#o-r-e);return ot(n,0,1)}#qe(){let e=Number(this.#_e),r=Number.isNaN(e)?0:e,o=this.#V===b.DIRECTION_VERTICAL?document.documentElement.scrollHeight:document.documentElement.scrollWidth;switch(this.#ie){case b.ALIGN_START:return(this.#c+this.#l)/r;case b.ALIGN_TOP:case b.ALIGN_LEFT:return(this.#c-this.#i)/r;case b.ALIGN_CENTER:return(this.#c+(this.#o/2-this.#u/2)-this.#i)/r;case b.ALIGN_BOTTOM:case b.ALIGN_RIGHT:return(this.#c+(this.#o-this.#u)-this.#i)/r;case b.ALIGN_END:return-(o-(this.#c+this.#o))/r;default:return 0}}#Je(){let e=Number(this.#ie),r=Number(this.#_e);return(this.#c+this.#o/100*e-this.#i)/r}#Ye(e){return ky({switchPropierties:this.#Z,isReverse:this.#ae,value:e})}#ke(e){this.#v=e,this.#I=!1;let r=this.#ce||this.#K;if(!r||this.#Te)return;let o=this.#O?"translate3D(0px, 0px, 0px)":"";this.#t=this.#ye?u.mustMakeSomething():!1;let n=this.#t&&this.#O?"transform":"",s=u.shouldMakeSomething()?Math.round(e):e;switch(this.#ue){case b.PROP_VERTICAL:{r.style.transform=`${o} translateY(${s}px)`,r.style.willChange=n;break}case b.PROP_HORIZONTAL:{r.style.transform=`${o} translateX(${s}px)`,r.style.willChange=n;break}case b.PROP_ROTATE:{r.style.transform=`${o} rotate(${s}deg)`,r.style.willChange=n;break}case b.PROP_ROTATEY:{r.style.transform=`${o} rotateY(${s}deg)`,r.style.willChange=n;break}case b.PROP_ROTATEX:{r.style.transform=`${o} rotateX(${s}deg)`,r.style.willChange=n;break}case b.PROP_ROTATEZ:{r.style.transform=`${o} rotateZ(${s}deg)`,r.style.willChange=n;break}case b.PROP_OPACITY:{r.style.opacity=`${e}`;break}case b.PROP_SCALE:{let i=this.#G===b.TYPE_SCROLLTRIGGER?e:1+e/1e3;r.style.transform=`${o} scale(${i})`,r.style.willChange=n;break}case b.PROP_SCALE_X:{let i=this.#G===b.TYPE_SCROLLTRIGGER?e:1+e/1e3;r.style.transform=`${o} scaleX(${i})`,r.style.willChange=n;break}case b.PROP_SCALE_Y:{let i=this.#G===b.TYPE_SCROLLTRIGGER?e:1+e/1e3;r.style.transform=`${o} scaleY(${i})`,r.style.willChange=n;break}default:{r.style[this.#ue.toLowerCase()]=`${e}px`;break}}}#Be(e){this.#Y&&e&&(e.style="")}#Ve(){if(!this.#Te)switch(this.#ue){case b.PROP_VERTICAL:case b.PROP_HORIZONTAL:case b.PROP_ROTATE:case b.PROP_ROTATEY:case b.PROP_ROTATEX:case b.PROP_ROTATEZ:case b.PROP_SCALE:return{transform:""};case b.PROP_OPACITY:return{opacity:""};default:return{[this.#ue.toLowerCase()]:""}}}destroy(){this.#me?.stop?.(),this.#r(),this.#g(),this.#m(),this.#f(),this.#D(),this.#L(),this.#C(),this.#me?.destroy?.(),this.#me=null,this.#q=()=>{},this.#B?.value&&(this.#B.value=()=>0),this.#U?.value&&(this.#U.value=()=>0),this.#J=()=>{},this.#te=()=>{},this.#re=()=>{},this.#Q=()=>{},this.#oe=()=>{},this.#M&&this.#w&&this.#w?.destroy?.(),this.#S&&this.#S?.remove?.(),this.#y&&this.#y?.remove?.(),this.#S=void 0,this.#y=void 0,this.#w=void 0,this.#h=0;let e=this.#ce??this.#K;e&&"style"in e&&(e.style=""),this.#K=null,this.#z=null,this.#H=null,this.#ee=null,this.#ce=null}};function BI(t){return new po({...t,type:b.TYPE_PARALLAX})}function VI(t){return new po({...t,type:b.TYPE_SCROLLTRIGGER})}var Hu=window.innerHeight,Uu=document.body.offsetHeight,mo=!1,Gu=!0,jt=window.scrollY,ti=!0,zt=!1,qu=()=>{},Ju=()=>{},ac=()=>{},ic,Ny=()=>{document.body.classList.remove("is-whelling")},WI=()=>{document.body.classList.add("is-whelling")};ue.setDefault({usePassive:!1});var jI=({velocity:t,rootElement:e})=>{let r=U.createLerp({data:{scrollValue:window.scrollY},precision:1,velocity:.1});ic=e;let o=r.subscribe(({scrollValue:h})=>{zt||window.scrollTo({top:Math.round(h),left:0,behavior:"instant"})});r.onComplete(()=>{jt=window.scrollY});let n=u.useMouseWheel(h=>{if(zt)return;h.preventDefault(),ti=!1,WI();let f=h.spinY??0,d=ue.clamp(f*t+jt,0,Uu-Hu);jt=d,r.goTo({scrollValue:d}).catch(()=>{})}),s=u.useMouseWheel(({preventDefault:h})=>{Gu&&h()}),i=u.useMouseWheel(u.debounce(()=>{Ny()},500)),a=u.useScrollEnd(()=>{let h=window.scrollY;jt=h,r.setImmediate({scrollValue:h})}),c=u.useScroll(()=>{if(!ti)return;let h=window.scrollY;jt=h,r.setImmediate({scrollValue:h})}),l=u.usePointerDown(()=>{zt||(Ny(),r.stop(),jt=window.scrollY,ti=!0)}),p=new ResizeObserver(()=>{r.stop(),r.setImmediate({scrollValue:window.scrollY}),jt=window.scrollY,Hu=window.innerHeight,Uu=document.body.offsetHeight});return p.observe(e),{destroy:()=>{mo=!1,jt=0,ti=!0,zt=!1,ic&&(p.unobserve(ic),p.disconnect()),r?.stop(),r?.destroy(),r=null,ic=null,o(),c(),a(),n(),l(),i(),s(),qu=()=>{},Ju=()=>{},ac=()=>{}},stop:()=>{r.stop(),jt=window.scrollY},update:()=>{r.setImmediate({scrollValue:window.scrollY})}}},cc=({velocity:t=100,rootElement:e=document.createElement("div")}={})=>{mo||(jt=window.scrollY,mo=!0,zt=!1,Hu=window.innerHeight,Uu=document.body.offsetHeight,Gu=!0,ti=!1,{destroy:qu,stop:Ju,update:ac}=jI({velocity:t,rootElement:e}))},ir=()=>{!mo||zt||(Ju(),zt=!0)},Ht=()=>{!mo||!zt||(zt=!1)},ri=()=>{!mo||!zt||(ac(),jt=window.scrollY,zt=!1)},Yu=()=>{mo&&ac()},Xu=()=>{qu()},Py=()=>{Gu=!0};var Ay=()=>mo;var Oy="easeOutQuad",oi=new Rr({ease:Oy,data:{val:0}}),lc=!1,Ku=!1;oi.subscribe(({val:t})=>{window.scrollTo({top:t,left:0,behavior:"auto"}),Yu()});var Qu=()=>{Ku&&(document.body.style.overflow=""),oi?.updateEase?.(Oy),ri()},Zu=()=>{lc&&(oi.stop(),Qu())};u.useMouseWheel(()=>{Zu()});u.useMouseDown(()=>{Zu()});u.useTouchStart(()=>{Zu()});var Nr={to:(e,r)=>{if(typeof globalThis>"u")return;let o=e?cl(e)||u.checkType(Number,e)?cl(e)?be(e).top:e:(console.warn(`bodyScroll ${e} is not valid target, must be a node or a number`),0):0,n=rr(r?.duration,"bodyScroll: duration",500);return Ku=de(r?.overflow,"bodyScroll: overflow",!1),Ba(r?.ease)&&oi?.updateEase?.(r?.ease),Ku&&(document.body.style.overflow="hidden"),new Promise(s=>{lc=!0,ir(),oi.goFromTo({val:window.scrollY},{val:o},{duration:n}).then(()=>{Qu(),lc=!1,s(!0)}).catch(()=>{Qu(),lc=!1,s(!0)})})}};var ni={END:"END",START:"START",CENTER:"CENTER"};var zI=t=>{switch(t){case ni.END:return"align-items:flex-end;";case ni.CENTER:return"align-items:center;";default:return"align-items:flex-start;"}},$y=({mainContainer:t,queryType:e,breakpoint:r,container:o,trigger:n,row:s,column:i,shadow:a,useSticky:c,columnHeight:l,columnWidth:p,columnAlign:h})=>{let f=ve.getBreackpoint(r),d="user-select:none",v=c?"relative":"absolute",y=c?"position:sticky;top:0;":"",T=zI(h),S=p?`width:${p}vw;`:"",_=`
      @media (${e}-width:${f}px){${o}{position:relative;${d}}}@media (${e}-width:${f}px){${n}{z-index:10;position:${v};pointer-events:none;overflow:hidden;top:0;left:0;right:0}}@media (${e}-width:${f}px){${s}{--sectionheight:${l}vh}}@media (${e}-width:${f}px){${s}{display:flex;height:100vh;${y}${T}}}@media (${e}-width:${f}px){${i}{height:var(--sectionheight);flex:0 0 auto;${S}}}.${a}{display:none}@media (${e}-width:${f}px){.${a}{width:100%;display:block;pointer-events:none}}.${a}{display:none}@media (${e}-width:${f}px){.${a}{pointer-events:none;display:block;position:absolute;left:0;right:0}.${a}--end,.${a}--in-center,.${a}--left,.${a}--out-center{opacity:0;border:1px red dashed;width:25%}.${a}--end.debug,.${a}--in-center.debug,.${a}--left.debug,.${a}--out-center.debug{opacity:1}.${a}--in-center{position:absolute;top:0;right:0;padding:0 40px;text-align:center}.${a}--out-center{position:absolute;top:0;right:0;padding:0 40px;text-align:center}.${a}--left{position:absolute;top:0;left:50%;transform:translateX(-50%);padding:0 40px;text-align:center}.${a}--end{position:absolute;top:0;left:0;padding-left:40px}}`,w=document.createElement("div");w.classList.add("scroller-style");let x=document.createElement("style");x.append(document.createTextNode(_)),w.append(x),t.prepend(w)};var si=class{#n=!0;#t=0;#i=!1;#l=0;#h=100;#u=100;#s=!1;#c=0;#o;#e;#p;#a;#d;#f;#r;#g;#m;#C;#S;#y;#v;#T;#k;#x;#I;#P;#R;#O;#w;#A;#N;#b;#D;#L;#M;#F;#$;#_;#X;#j;#E;#W;#B;#U;#q;#ne;#J;#te;#re;#Q;#oe;#ie;#Z;#ae;#ve;#fe;constructor(e){this.#o=()=>{},this.#fe=0,this.#F=e?.container??"",this.#W=[],this.#B=!1,this.#U=0,this.#q={},this.#ne=0,this.#J=e?.children||[],this.#e=de(e?.useDrag,"HorizontalScroller: useDrag",!1),this.#p=rr(e?.threshold,"HorizontalScroller: threshold",30),this.#a=de(e?.useWillChange,"HorizontalScroller: useWillChange",!1),this.#d=Do(e?.breakpoint,"breakpoint","horizontalScroller"),this.#f=Fo(e?.queryType,"queryType","horizontalScroller"),this.#r=de(e?.forceTranspond,"HorizontalScroller: forceTranspond",!1),this.#g=de(e?.addCss,"HorizontalScroller: addCss",!0),this.#m=de(e?.animateAtStart,"HorizontalScroller: animateAtStart",!1),this.#C=de(e?.ease,"HorizontalScroller: ease",!1),this.#S=za(e?.easeType??"","HorizontalScroller"),this.#y=de(e?.useSticky,"HorizontalScroller: useSticky",!1),this.#v=de(e?.animatePin,"HorizontalScroller: animatePin",!1),this.#T=de(e?.reverse,"HorizontalScroller: reverse",!1),this.#k=de(e?.useThrottle,"HorizontalScroller: useThrottle",!1),this.#x=rr(e?.columnHeight,"HorizontalScroller: columnHeight",100),this.#I=rr(e?.columnWidth,"HorizontalScroller: columnWidth",null),this.#P=e?.columnAlign?e.columnAlign.toUpperCase():ni.START,this.#R=mt(e?.onEnter,"HorizontalScroller: onEnter",X),this.#O=mt(e?.onEnterBack,"HorizontalScroller: onEnterBack",X),this.#w=mt(e?.onLeave,"HorizontalScroller: onLeave",X),this.#A=mt(e?.onLeaveBack,"HorizontalScroller: onLeaveBack",X),this.#N=mt(e?.afterInit,"HorizontalScroller: afterInit",X),this.#b=mt(e?.afterRefresh,"HorizontalScroller: afterRefresh",X),this.#D=mt(e?.afterDestroy,"HorizontalScroller: afterDestroy",X),this.#L=mt(e?.onTick,"HorizontalScroller: onTick",void 0),this.#M=u.checkType(String,e.root)?document.querySelector(e.root):e.root,this.#M||(this.#n=!1,console.warn("horizontal custom: root node not found")),this.#M.querySelector(this.#F)||(this.#n=!1,console.warn("horizontal custom: container node not found")),this.#$=this.#M.querySelector(e.trigger),this.#$||(this.#n=!1,console.warn("horizontal custom: trigger node not found")),this.#_=this.#M.querySelector(e.row),this.#_||(this.#n=!1,console.warn("horizontal custom: row node not found")),this.#X=this.#M.querySelectorAll(e.column),this.#X.length===0&&(this.#n=!1,console.warn("horizontal custom: column nodeList not found")),this.#j=this.#M.querySelectorAll("[data-shadow]");let o=e?.shadowClass||"shadow";this.#E=o.replace(".",""),this.#W=this.#_.querySelectorAll("a, button"),this.#J.forEach(n=>{this.#_&&n.setScroller(this.#_),n.setDirection("horizontal"),n.setBreakPoint(this.#d),n.setQueryType(this.#f),n.init()}),this.#g&&$y({mainContainer:this.#M,queryType:this.#f,breakpoint:this.#d,container:this.#F,trigger:e?.trigger??"trigger",row:e.row,column:e.column,shadow:this.#E,useSticky:this.#y,columnHeight:this.#x,columnWidth:this.#I,columnAlign:this.#P}),this.#te=n=>{if(!this.#i)return;let{movementX:s}=n,i=this.#T?s:-s;this.#Y(i)},this.#re=()=>{ve[this.#f](this.#d)&&(ir(),this.#s&&this.#_&&(this.#_.style.cursor="move"),this.#i=!0,this.#fe=this.#c)},this.#Q=()=>{Ht(),this.#i=!1,u.useFrame(()=>{this.#_&&(this.#_.style.cursor="")})},this.#oe=()=>{Ht(),this.#i=!1,u.useFrame(()=>{this.#_&&(this.#_.style.cursor="")})},this.#ie=n=>{ve[this.#f](this.#d)&&(ir(),this.#l=-n.touches[0].clientX,this.#i=!0,this.#fe=this.#c)},this.#Z=()=>{Ht(),this.#i=!1},this.#ae=n=>{let s=-n.touches[0].clientX,i=this.#T?-s+this.#l:s-this.#l;this.#Y(i),this.#l=s,this.#s&&n.cancelable&&n.defaultPrevented&&n.preventDefault()},this.#ve=n=>{Math.abs(this.#c-this.#fe)>this.#p&&n.preventDefault()}}init(){this.#n&&oc(this.#ce.bind(this),this.#ee.bind(this),this.#V.bind(this),this.#de.bind(this))().then(()=>{this.#G(),this.#e&&this.#z(),u.useResize(({horizontalResize:e})=>this.onResize(e)),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#N?.(),this.#J.forEach(e=>{e.refresh()})})},3)})}#be(){[...this.#W].forEach(e=>e.setAttribute("draggable","false"))}#ye(){[...this.#W].forEach(e=>e.removeAttribute("draggable"))}#Y(e){this.#s&&u.useFrame(()=>window.scrollBy({top:e,left:0,behavior:"instant"}))}#K(){let e=window.scrollY;this.#s=this.#t-this.#u<e&&this.#t+this.#h+this.#U>e+window.innerHeight}#z(){this.#o=u.useScroll(()=>this.#K()),this.#K(),this.#_.addEventListener("click",this.#ve,{passive:!1}),this.#_.addEventListener("mousedown",this.#re,{passive:!0}),this.#_.addEventListener("mouseup",this.#Q,{passive:!0}),this.#_.addEventListener("mouseleave",this.#oe,{passive:!0}),this.#_.addEventListener("touchstart",this.#ie,{passive:!0}),this.#_.addEventListener("touchend",this.#Z,{passive:!0}),this.#_.addEventListener("mousemove",this.#te,{passive:!0}),this.#_.addEventListener("touchmove",this.#ae,{passive:!0})}#H(){this.#o(),this.#_.removeEventListener("click",this.#ve),this.#_.removeEventListener("mousedown",this.#re),this.#_.removeEventListener("mouseup",this.#Q),this.#_.removeEventListener("mouseleave",this.#oe),this.#_.removeEventListener("touchstart",this.#ie),this.#_.removeEventListener("touchend",this.#Z),this.#_.removeEventListener("mousemove",this.#te),this.#_.removeEventListener("touchmove",this.#ae)}#ee(){return!this.#$||!this.#M||!this.#_?new Promise(e=>{e(!0)}):new Promise(e=>{u.useFrame(()=>{let r=this.#U;this.#ne=100*(r-window.innerWidth)/r,r>0&&(this.#$.style.height=`${r}px`,this.#M.style.height=`${r}px`,this.#_.style.width=`${r}px`),e(!0)})})}#ce(){return new Promise(e=>{u.useFrame(()=>{if(!ve[this.#f](this.#d)){e(!0);return}this.#U=[...this.#X].map(r=>je(r)).reduce((r,o)=>r+o,0),e(!0)})})}#V(){return this.#$?new Promise(e=>{u.useFrame(()=>{if(!ve[this.#f](this.#d)||!this.#j){e(!0);return}let r=[...this.#j].map(o=>{let n=o.dataset.shadow,s=Object.hasOwn(o.dataset,"debug"),i=s?"debug":"",a=s?`left left : ${n}`:"",c=s?`in center : ${n}`:"",l=s?`center out : ${n}`:"",p=s?`in out : ${n}`:"";return` <div
                            class="${this.#E} ${this.#E}--${n}"
                            data-shadow="${n}"
                        >
                            <span
                                class="${this.#E}--in-center ${i}"
                            >
                                ${c}
                            </span>
                            <span
                                class="${this.#E}--out-center ${i}"
                            >
                                ${l}
                            </span>
                            <span
                                class="${this.#E}--left ${i}"
                            >
                                ${a}
                            </span>
                            <span
                                class="${this.#E}--end ${i}"
                            >
                                ${p}
                            </span>
                        </div>`}).join("");this.#$.innerHTML=r,e(!0)})}):new Promise(e=>{e(!0)})}#he(){this.#$&&(this.#$.innerHTML="")}#de(){return new Promise(e=>{if(!ve[this.#f](this.#d)){e(!0);return}u.useFrame(()=>{this.#j&&([...this.#j].forEach(r=>{let o=this.#ne/100,n=r.dataset.shadow,s=je(r),i=le(this.#_),a=So(this.#_)?.x??0,c=this.#T?this.#U-(r.getBoundingClientRect().right-a):r.getBoundingClientRect().left-a,l=window.innerWidth/window.innerHeight,p=window.innerWidth-window.innerHeight,h=c/l,f=c-c/l,d=this.#M.querySelector(`.${this.#E}[data-shadow="${n}"]`),v=d?.querySelector(`.${this.#E}--in-center`),y=d?.querySelector(`.${this.#E}--out-center`),T=d?.querySelector(`.${this.#E}--left`),S=d?.querySelector(`.${this.#E}--end`),_=window.innerWidth>window.innerHeight?window.innerHeight:0,w=window.innerWidth>window.innerHeight?window.innerHeight/2:0,x=c===0?0:h+f/o-p/o,E=(()=>{let A=window.innerWidth>window.innerHeight?p/o:p/o+window.innerWidth/l;return c===0?0:A})(),I=(()=>{let A=s/l,$=(s-s/l)/o;return A+$+E})(),P=I/2+w;this.#y&&(this.#$.style["margin-top"]=`-${i}px`),d&&(d.style.top=`${x}px`),v&&(v.style.height=`${P}px`),y&&(y.style.height=`${P}px`),y&&(y.style.top=`${P}px`),T&&(T.style.height=`${E}px`),S&&(S.style.height=`${I+_}px`),d&&(d.style.height=`${E}px`)}),e(!0))})})}#G(){if(!this.#$||!ve[this.#f](this.#d))return;let e=new po({type:"scrolltrigger",item:this.#_,useWillChange:this.#a,trigger:this.#$,propierties:"x",breakpoint:"xSmall",pin:!this.#y,animatePin:this.#v,ease:this.#C,forceTranspond:this.#r,useThrottle:this.#k,easeType:this.#S,springConfig:"scroller",animateAtStart:this.#m,reverse:this.#T,dynamicRange:()=>-(this.#U-window.innerWidth),dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>this.#U},onTick:({value:r,parentIsMoving:o})=>{let n=r??0,s=Math.abs(-Math.round(n*100/(this.#U-window.innerWidth)));this.#c=n,this.#L&&this.#L({value:n,parentIsMoving:o,percent:this.#T?100-s:s}),this.#J.forEach(i=>{i.move({value:n,parentIsMoving:o})})},onEnter:this.#R,onEnterBack:this.#O,onLeave:this.#w,onLeaveBack:this.#A});e.init(),this.#B=!0,this.#q=e,this.#t=be(this.#$).top,this.#be()}#ge(){oc(this.#ce.bind(this),this.#ee.bind(this),this.#V.bind(this),this.#de.bind(this))().then(()=>{this.#G(),this.#se()})}#se(){u.useFrameIndex(()=>{u.useNextTick(()=>{this.#b?.(),this.#J.forEach(e=>{e?.refresh?.()})})},3)}refresh(){return!this.#B||!ve[this.#f](this.#d)?new Promise(e=>e(!0)):new Promise(e=>{oc(this.#ce.bind(this),this.#ee.bind(this),this.#de.bind(this))().then(()=>{this.#q?.stopMotion?.(),this.#t=be(this.#$).top,this.#B&&(this.#q?.refresh?.(),this.#se()),e(!0)})})}#le({destroyAll:e=!1}){(this.#B||e)&&(this.#q?.destroy?.(),this.#q=null,this.#$&&(this.#$.style.height=""),this.#M&&(this.#M.style.height=""),this.#$&&(this.#$.style.marginTop=""),this.#he(),this.#ye(),this.#B=!1,u.useFrameIndex(()=>{if(this.#_&&(this.#_.style.width="",this.#_.style.transform=""),e&&this.#M){this.#e&&this.#H();let r=this.#M.querySelector(".scroller-style");r&&r.remove(),this.#M=null,this.#$=null,this.#_=null,this.#X=[],this.#j=[],this.#N=X,this.#b=X,this.#L=X,this.#R=X,this.#O=X,this.#w=X,this.#A=X,this.#q=null,this.#B=!1,this.#W=[],this.#M=null,this.#F=null,this.#$=null,this.#_=null,u.useNextTick(()=>{this.#D?.(),this.#D=X,this.#J.forEach(o=>{o?.destroy?.(),o=null}),this.#J=[]})}},3))}onResize(e){this.#B&&ve[this.#f](this.#d)?e&&this.refresh():!this.#B&&ve[this.#f](this.#d)?this.#ge():this.#B&&!ve[this.#f](this.#d)&&this.#le({destroyAll:!1})}destroy(){this.#le({destroyAll:!0})}};var ii=new Map,uc=t=>{let e=u.checkType(Element,t);return e||console.warn(`slide utils ${t} is not a valid Dom element`),e},HI=t=>{let e=new Rr({ease:"easeOutQuad",data:{val:0}});return{tween:e,unsubscribe:e.subscribe(({val:r})=>{t.style.height=`${r}px`})}},Pr={subscribe:n=>{if(!uc(n))return()=>{};if(ii.has(n))return console.warn(`slide utils ${n} is alredysubscribed`),()=>{};let i=HI(n);return ii.set(n,i),()=>{i.unsubscribe();let{tween:a}=i;a.destroy(),ii.delete(n)}},reset:n=>{uc(n)&&(n.style.height="0",n.style.overflow="hidden")},up:async n=>{if(!uc(n))return new Promise(c=>c(!0));let s=ii.get(n);if(!s)return console.warn("slide element not exist in slide store"),new Promise(c=>c(!0));let{tween:i}=s,a=le(n);await i.goFromTo({val:a},{val:0},{duration:500})},down:async n=>{if(!uc(n))return new Promise(l=>l(!0));let s=ii.get(n);if(!s)return console.warn("slide element not exist in slide store"),new Promise(l=>l(!0));let{tween:i}=s,{val:a}=i.get();n.style.height="auto";let c=le(n);n.style.height=`${a}px`,await i.goTo({val:c},{duration:500}),u.useNextTick(()=>{n.style.height="auto"})}};var _t=class{#n=!0;#t=0;#i=0;#l=0;#h=0;#u=0;#s=30;#c=0;#o=!1;#e=0;#p=0;#a;#d;#f;#r;#g;#m;#C;#S;#y;#v;#T;#k;#x;#I;#P;#R;#O;#w;#A;#N;#b;#D;#L;#M;#F;#$;#_;#X;#j;#E;#W;#B;#U=0;#q=0;#ne;#J;#te=!1;#re=1;#Q=0;#oe=0;#ie=0;#Z=null;#ae=u.getTime();constructor(e){this.#a=X,this.#d=X,this.#f=X,this.#r=X,this.#g=X,this.#m=X,this.#C=X,this.#S=X,this.#y=X,this.#v=X,this.#T=X,this.#k=X,this.#x={updateVelocity:X,subscribe:X,onComplete:X,goTo:()=>Promise.resolve(),set:()=>Promise.resolve(),stop:X,destroy:X},this.#I=X,this.#P=X,this.#R=Ws(e?.direction,"SmoothScroller"),this.#O=!1,this.#w=za(e?.easeType??"","SmoothScroller"),this.#A=Do(e?.breakpoint,"breakpoint","SmoothScroller"),this.#N=Fo(e?.queryType,"queryType","SmoothScroller"),this.#b=u.checkType(String,e?.scroller)?document.querySelector(e.scroller):e.scroller,this.#b||(console.warn("SmoothScroller: scroller node not found"),this.#n=!1),this.#D=e?.screen?u.checkType(String,e.screen)?document.querySelector(e.screen):e.screen:document.documentElement,this.#D||(this.#n=!1,console.warn("SmoothScroller: screen node not found")),this.#L=de(e?.scopedEvent,"SmoothScroller: scopedEvent",!1),this.#M=rr(e?.speed,"SmoothScroller: speed",60),this.#F=de(e?.drag,"SmoothScroller: drag",!1),this.#$=mt(e?.onTick,"SmoothScroller: onTick",X),this.#_=mt(e?.onUpdate,"SmoothScroller: onUpdate",X),this.#ne=de(e?.useHorizontalScroll,"SmoothScroller: useBothAxis",!1),this.#X=mt(e?.afterRefresh,"SmoothScroller: afterRefresh",X),this.#j=mt(e?.afterInit,"SmoothScroller: afterInit",X),this.#J=Dv(e?.snapPoints,"SmoothScroller: snapPoints",[]),this.#E=e?.children||[],this.#E.forEach(r=>{r.setScroller(this.#b),r.setDirection(this.#R),r.setScreen(this.#D),r.setBreakPoint(this.#A),r.setQueryType(this.#N),r.init()}),this.#W=r=>{this.#fe();let{spinY:o}=u.normalizeWheel(r);this.#ce({spinY:o})},this.#B=r=>{let{clientX:o,clientY:n}=r.touches?r.touches[0]:r;this.#H({client:{x:o,y:n}})},this.#k=u.useMouseWheel(u.debounce(()=>{this.#ve()},500))}#ve(){this.#b&&this.#b.classList.remove("is-whelling")}#fe(){this.#b&&this.#b.classList.add("is-whelling")}#be(){return this.#c>0}init(){this.#n&&(this.#w===b.EASE_SPRING?this.#x=new Tt({data:{val:0},config:"scroller",configProps:{tension:15}}):(this.#x=new kr({data:{val:0}}),this.#x.updateVelocity(.1)),this.#L&&(this.#b.addEventListener("wheel",this.#W,{passive:!0}),this.#b.addEventListener("mousemove",this.#B,{passive:!0}),this.#b.addEventListener("touchmove",this.#B,{passive:!0})),this.#L||(this.#S=u.useMouseWheel(e=>{this.#G(e)}),this.#y=u.useMouseMove(e=>{this.#de(e)}),this.#v=u.useTouchMove(e=>{this.#de(e)})),this.#a=u.useResize(()=>this.refresh()),this.#d=u.useScrollStart(()=>this.#z()),this.#f=u.useScrollEnd(()=>this.#z()),this.#r=u.useTouchStart(e=>this.#V(e)),this.#g=u.useTouchEnd(e=>this.#he(e)),this.#m=u.useMouseDown(e=>this.#V(e)),this.#C=u.useMouseUp(e=>this.#he(e)),this.#b.addEventListener("mouseleave",()=>{Ht()}),this.#F&&(this.#T=u.useMouseClick(({target:e,preventDefault:r})=>{this.#_e({target:e,preventDefault:r})})),this.#K(),ve[this.#N](this.#A)&&(this.#ye(),this.#z()),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#O||(this.#j?.({shouldScroll:this.#be()}),this.#E.forEach(e=>{e.refresh()}))})},3))}#ye(){if(!this.#b)return;this.#b.style["user-select"]="none",[...this.#b.querySelectorAll("a, button")].forEach(r=>{r.setAttribute("draggable","false"),r.style["user-select"]="none"})}#Y(){if(!this.#b)return;this.#b.style["user-select"]="",[...this.#b.querySelectorAll("a, button")].forEach(r=>{r.removeAttribute("draggable"),r.style["user-select"]=""})}#K(){this.#x&&(this.#I=this.#x.subscribe(({val:e})=>{this.#b.style.transform=this.#R==b.DIRECTION_VERTICAL?`translate3d(0px, 0px, 0px) translateY(${-Math.trunc(e)}px)`:`translate3d(0px, 0px, 0px) translateX(${-Math.trunc(e)}px)`,this.#E.forEach(r=>{r.triggerScrollStart()}),u.useNextTick(()=>{this.#$({value:-e,percent:this.#i,parentIsMoving:!0}),this.#E.forEach(r=>{r.move({value:-e,parentIsMoving:!0})})})}),this.#P=this.#x.onComplete(({val:e})=>{this.#b.style.transform=this.#R==b.DIRECTION_VERTICAL?`translateY(${-Math.trunc(e)}px)`:`translateX(${-Math.trunc(e)}px)`,u.useNextTick(()=>{this.#$({value:-e,percent:this.#i,parentIsMoving:!1}),this.#E.forEach(r=>{r.triggerScrollEnd(),r.move({value:-e,parentIsMoving:!1})})})}))}#z(){this.#D&&(this.#l=this.#D===document.documentElement?window.innerWidth:je(this.#D),this.#h=this.#D===document.documentElement?window.innerHeight:le(this.#D),this.#c=this.#R===b.DIRECTION_VERTICAL?this.#b.offsetHeight-this.#h:this.#b.offsetWidth-this.#l,this.#Te())}#H({client:e}){!this.#o||!this.#F||(this.#e=this.#p,this.#p=this.#pe({x:e?.x??0,y:e?.y??0}),this.#t+=Math.round(this.#e-this.#p),this.#Te())}#ee(){let e=this.#R===b.DIRECTION_HORIZONTAL?this.#l/1920:this.#h/1080,r=60/u.getFps(),o=window.devicePixelRatio||1,n=o>1?Math.sqrt(o):1;return e*r/n}#ce({spinY:e=0}){if(!ve[this.#N](this.#A)||(this.#o=!1,this.#se()))return;let o=this.#ee(),n=ot(e,-1,1);this.#t+=n*this.#M*ot(o,1,10),this.#Te(),this.#ge()}#V({target:e,client:r}){ve[this.#N](this.#A)&&(e===this.#b||ss(this.#b,e))&&(this.#u=this.#t,this.#o=!0,this.#se(),this.#e=this.#pe({x:r?.x??0,y:r?.y??0}),this.#p=this.#pe({x:r?.x??0,y:r?.y??0}))}#he(){this.#o=!1,this.#le(),this.#ge()}#de({target:e,client:r,preventDefault:o}){if((e===this.#b||ss(this.#b,e))&&this.#o&&this.#F){o(),this.#e=this.#p,this.#p=this.#pe({x:r?.x??0,y:r?.y??0});let n=Math.round(this.#e-this.#p);this.#t+=n,this.#Te()}}#G({target:e,spinY:r=0,spinX:o=0,preventDefault:n}){if(ve[this.#N](this.#A)&&(this.#fe(),e===this.#b||ss(this.#b,e))){if(this.#o=!1,n?.(),ir(),this.#se())return;let i=Math.abs(this.#U-o),a=Math.abs(this.#q-r),c=this.#ne&&i>a?o:r;if(Math.abs(c)===0)return;let l=this.#ee();this.#t+=ot(c,-1,1)*this.#M*ot(l,1,10),this.#Te(),this.#q=r,this.#U=o,this.#ge()}}#ge(){this.#Z&&clearTimeout(this.#Z),this.#Z=setTimeout(()=>{this.#te=!1,this.#re=1,this.#Z=null},Math.ceil(1500/u.getFps()))}#se(){this.#Z&&(clearTimeout(this.#Z),this.#Z=null),this.#te&&(this.#te=!1);let e=!this.#o&&this.#le();return e&&this.#ge(),e}#le(){if(this.#J.length===0||this.#re<3||this.#te)return;let e=this.#ie===1?this.#J.find(r=>this.#i<=r):this.#J.findLast(r=>this.#i>=r);if(!(!e&&e!==0))return this.#te=!0,this.#ae=u.getTime(),this.move(e),!0}move(e){return ve[this.#N](this.#A)?(this.#i=e,this.#t=this.#i*this.#c/100,this.#x.goTo({val:this.#t})):new Promise(r=>r())}set(e){ve[this.#N](this.#A)&&(this.#i=e,this.#t=this.#i*this.#c/100,this.#x.set({val:this.#t}))}#ue(){let e=u.getTime(),r=e-this.#oe,o=this.#t-this.#Q;if(this.#ie=Math.sign(o),r<100){let s=Math.max(r,16.666666666666668),i=o/s;this.#re=Math.max(1,Math.round((Math.abs(i)+1)*1e4)/1e4)}r>100&&(this.#re=1),this.#oe=e,this.#Q=this.#t}#Te(){if(this.#te)return;let e=u.getTime();if(Math.abs(this.#ae-e)<100)return;let o=this.#t*100/this.#c;this.#i=ot(o,0,100),this.#t=ot(this.#t,0,this.#c),this.#ue(),this.#x.goTo({val:this.#t}).catch(()=>{}),this.#_?.({value:-this.#t,percent:this.#i,parentIsMoving:!0})}#_e({target:e,preventDefault:r}){ve[this.#N](this.#A)&&(e===this.#b||ss(this.#b,e))&&Math.abs(this.#t-this.#u)>this.#s&&r()}#pe({x:e,y:r}){return!e||!r?0:this.#R===b.DIRECTION_VERTICAL?r:e}refresh(){if(!ve[this.#N](this.#A)){this.#Y(),this.#x?.stop?.(),u.useFrame(()=>{u.useNextTick(()=>{this.#b.style.transform=""})});return}this.#z(),this.#ye(),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#X?.({shouldScroll:this.#be()}),this.#E.forEach(e=>{e.refresh()})})},2)}destroy(){this.#O=!0,this.#Y(),this.#a(),this.#d(),this.#f(),this.#r(),this.#g(),this.#m(),this.#C(),this.#S(),this.#y(),this.#v(),this.#T(),this.#I(),this.#P(),this.#k(),this.#x?.destroy(),this.#x=null,this.#E.forEach(e=>{e?.destroy?.()}),this.#E=[],this.#$=X,this.#_=X,this.#X=X,this.#j=X,this.#Z&&(clearTimeout(this.#Z),this.#Z=null),this.#L&&(this.#b?.removeEventListener("wheel",this.#W),this.#b?.removeEventListener("mousemove",this.#B),this.#b?.removeEventListener("touchmove",this.#B)),u.useFrameIndex(()=>{u.useNextTick(()=>{this.#b=null,this.#D=null})},3)}};var Ly=!1,UI=new Set(["scrollerN0","scrollerN1"]),Dy=()=>{let t=document.querySelector("#root");t&&(cc({rootElement:t}),m.mainStore.watch("beforeRouteChange",()=>{ir(),Py()}),m.mainStore.watch("afterRouteChange",()=>{let e=m.getActiveRoute()?.route;Ly=UI.has(e),u.useFrameIndex(()=>{if(Ly){Xu();return}!Ay()&&cc({rootElement:t}),ri()},30)}))};function Fy(){let t=navigator.userAgent,e=document.body;if(/chrome|chromium|crios/i.test(t)){e.classList.add("is-chrome");return}if(/firefox|fxios/i.test(t)){e.classList.add("is-firefox");return}if(/safari/i.test(t)){e.classList.add("is-safari");return}if(/edg/i.test(t)){e.classList.add("is-edge");return}}var oe=async({source:t})=>{let e=await fetch(t);if(!e.ok)return console.warn(`${t} not found`),{success:!1,data:""};let r={};try{r=await e.text()}catch(o){return console.warn(o),{success:!1,data:r}}return{success:!0,data:r}},At=async({source:t})=>{let e=await fetch(t);if(!e.ok)return console.warn(`${t} not found`),{success:!1,data:""};let r={};try{r=await e.json()}catch(o){return console.warn(o),{success:!1,data:r}}return{success:!0,data:r}};function Ut(t,e){return Math.floor(Math.random()*(e-t+1)+t)}var By=t=>new XMLSerializer().serializeToString(t).replaceAll(' xmlns="http://www.w3.org/1999/xhtml"',"");var Vy,Wy={},GI="./asset/svg/icons/",qI=[{name:"gitHubIcon",source:"icon-github.svg"},{name:"searchIcons",source:"search.svg"},{name:"historyIcons",source:"history.svg"},{name:"starOutline",source:"star-outline.svg"},{name:"previous",source:"previous.svg"},{name:"close",source:"close.svg"},{name:"up",source:"up.svg"},{name:"swap",source:"swap.svg"},{name:"selectAll",source:"select-all.svg"}],ar=()=>Vy,Gn=()=>Wy,jy=async()=>{let{success:t,data:e}=await At({source:"./data/common.json"});t||console.warn("data fail to load"),Vy=e},zy=async()=>{let t=qI.map(({name:r,source:o})=>oe({source:`${GI}${o}`}).then(n=>({name:r,result:n})));Wy=(await Promise.all(t)).map(({name:r,result:o})=>o.success?{name:r,data:o.data}:{name:r,data:"icon load error"}).reduce((r,{name:o,data:n})=>({...r,[o]:n}),{})};var Hy=()=>g`
        <div class="error-page">
            <div class="error-page__content">
                <h1 class="error-page__title title-big">Page not found</h1>
                <a class="error-page__link" href="./#home">back to home</a>
            </div>
        </div>
    `;var Uy=({screenElement:t,scrollerElement:e,hideControls:r})=>{let o=new _t({screen:t,scroller:e,direction:"horizontal",drag:!0,useHorizontalScroll:!0,easeType:"lerp",breakpoint:"small",afterInit:({shouldScroll:n})=>{r(n)},afterRefresh:({shouldScroll:n})=>{r(n)}});return o.init(),{destroy:()=>{o.destroy()},refresh:()=>{o.refresh()}}};var JI=t=>t<10?`0${t}`:`${t}`,Gy=({setRef:t,getRef:e,onMount:r,bindEffect:o,getProxi:n})=>{let s=n(),i=()=>{},a=()=>{};return r(()=>{let{screenElement:c,scrollerElement:l}=e();return{destroy:i,refresh:a}=Uy({screenElement:c,scrollerElement:l,hideControls:p=>{s.showControls=p}}),u.useNextLoop(()=>{a()}),setTimeout(()=>{"isMounted"in s&&(s.isMounted=!0)},500),()=>{i(),i=()=>{},a=()=>{}}}),g`<div class="l-links">
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
    </div>`};var qy=m.createComponent({tag:"layout-links",component:Gy,props:{title:()=>({value:"",type:String}),items:()=>({value:[],type:Array})},state:{isMounted:()=>({value:!1,type:Boolean}),showControls:()=>({value:!1,type:Boolean})}});m.useComponent([qy]);var pc=async({props:t})=>{let{source:e}=t,{data:r}=await At({source:e});return g` <div class="l-links">
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
    `;var dc=m.createComponent({tag:"doc-title-small",component:Xy,state:{}});var bT=PC(gT(),1);var cp=bT.default;var vT="[A-Za-z$_][0-9A-Za-z$_]*",FM=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],BM=["true","false","null","undefined","NaN","Infinity"],yT=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],TT=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],_T=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],VM=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],WM=[].concat(_T,yT,TT);function ST(t){let e=t.regex,r=(B,{after:V})=>{let F="</"+B[0].slice(1);return B.input.indexOf(F,V)!==-1},o=vT,n={begin:"<>",end:"</>"},s=/<[A-Za-z0-9\\._:-]+\s*\/>/,i={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(B,V)=>{let F=B[0].length+B.index,z=B.input[F];if(z==="<"||z===","){V.ignoreMatch();return}z===">"&&(r(B,{after:F})||V.ignoreMatch());let te,ae=B.input.substring(F);if(te=ae.match(/^\s*=/)){V.ignoreMatch();return}if((te=ae.match(/^\s+extends\s+/))&&te.index===0){V.ignoreMatch();return}}},a={$pattern:vT,keyword:FM,literal:BM,built_in:WM,"variable.language":VM},c="[0-9](_?[0-9])*",l=`\\.(${c})`,p="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",h={className:"number",variants:[{begin:`(\\b(${p})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${p})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},f={className:"subst",begin:"\\$\\{",end:"\\}",keywords:a,contains:[]},d={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,f],subLanguage:"xml"}},v={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,f],subLanguage:"css"}},y={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,f],subLanguage:"graphql"}},T={className:"string",begin:"`",end:"`",contains:[t.BACKSLASH_ESCAPE,f]},_={className:"comment",variants:[t.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),t.C_BLOCK_COMMENT_MODE,t.C_LINE_COMMENT_MODE]},w=[t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,d,v,y,T,{match:/\$\d+/},h];f.contains=w.concat({begin:/\{/,end:/\}/,keywords:a,contains:["self"].concat(w)});let x=[].concat(_,f.contains),E=x.concat([{begin:/(\s*)\(/,end:/\)/,keywords:a,contains:["self"].concat(x)}]),I={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:E},P={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,e.concat(o,"(",e.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},A={relevance:0,match:e.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...yT,...TT]}},$={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},N={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[I],illegal:/%/},R={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function O(B){return e.concat("(?!",B.join("|"),")")}let D={match:e.concat(/\b/,O([..._T,"super","import"].map(B=>`${B}\\s*\\(`)),o,e.lookahead(/\s*\(/)),className:"title.function",relevance:0},k={begin:e.concat(/\./,e.lookahead(e.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},L={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},I]},C="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+t.UNDERSCORE_IDENT_RE+")\\s*=>",M={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,e.lookahead(C)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[I]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:a,exports:{PARAMS_CONTAINS:E,CLASS_REFERENCE:A},illegal:/#(?![$_A-z])/,contains:[t.SHEBANG({label:"shebang",binary:"node",relevance:5}),$,t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,d,v,y,T,_,{match:/\$\d+/},h,A,{scope:"attr",match:o+e.lookahead(":"),relevance:0},M,{begin:"("+t.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[_,t.REGEXP_MODE,{className:"function",begin:C,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:t.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:E}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:n.begin,end:n.end},{match:s},{begin:i.begin,"on:begin":i.isTrulyOpeningTag,end:i.end}],subLanguage:"xml",contains:[{begin:i.begin,end:i.end,skip:!0,contains:["self"]}]}]},N,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+t.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[I,t.inherit(t.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},k,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[I]},D,R,P,L,{match:/\$[(.]/}]}}cp.registerLanguage("javascript",ST);var xT=async({ref:t,source:e})=>{if(!t)return;let{success:r,data:o}=await oe({source:e});if(!r){t.textContent="something went wrong";return}t.textContent=o,cp.highlightElement(t),t.style.height=""},jM=()=>getComputedStyle(document.documentElement).getPropertyValue("--snippet-line-height-value"),CT=({onMount:t,setRef:e,getRef:r,delegateEvents:o,bindEffect:n,getProxi:s,bindObject:i})=>{let a=s(),c=jM(),l="20rem",p=Number(a.numLines)>15,h=p?"use-expand":"",f=`${a.numLines*Number(c)}rem`;return t(async()=>{let{codeEl:d}=r();return a.awaitLoad?await xT({ref:d,source:a.source}):xT({ref:d,source:a.source}),()=>{}}),g`<div
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
    </div>`};var ET=m.createComponent({tag:"mob-snippet",component:CT,props:{source:()=>({value:"",type:String}),numLines:()=>({value:1,type:Number}),awaitLoad:()=>({value:!1,type:Boolean})},state:{contentIsLoaded:()=>({value:!1,type:Boolean}),isExpanded:()=>({value:!1,type:Boolean})}});var li="debug_component",yc="debug_filter_list",Tc="debug_overlay",_c="debug_tree",ui="quick_nav",pi="scroll_down_label",mi="scroll_to",wT="header",Sc="mob_navigation",hi="mob_navigation_container",xc="search_overlay",di="search_overlay_list",Ho="search_overlay_header",Cc="right-sidebar",Ec="route-loader";var IT=({id:t,label:e,element:r,isSection:o,isNote:n})=>{m.useMethodByName(mi)?.addItem?.({id:t,label:e,element:r,isSection:o,isNote:n})},MT=t=>{m.useMethodByName(mi)?.setActiveLabel?.(t)};function zM({label:t}){return t?.length>0}var HM=async({id:t,label:e,element:r,isSection:o,isNote:n})=>{await m.tick(),IT({id:t,label:e,element:r,isSection:o,isNote:n}),$p(r)&&!o&&MT(e)},kT=({getState:t,onMount:e})=>{let{style:r,line:o,id:n,label:s,isSection:i,isNote:a}=t(),c=o?"spacer--line":"";return e(({element:l})=>{zM({label:s})&&HM({id:n,label:s,element:l,isSection:i,isNote:a})}),g`<div id="${n}" class="spacer spacer--${r} ${c}">
        <span></span>
    </div>`};var RT=m.createComponent({tag:"mob-spacer",component:kT,props:{style:()=>({value:"x-small",type:String,validate:t=>["x-small","small","medium","big"].includes(t),strict:!0}),line:()=>({value:!1,type:Boolean}),id:()=>({value:"",type:String}),label:()=>({value:"",type:String}),isSection:()=>({value:!1,type:Boolean}),isNote:()=>({value:!1,type:Boolean})}});var NT=({getState:t,delegateEvents:e})=>{let{content:r,anchor:o}=t();return g`<div>
        <button
            type="button"
            class="anchor-button"
            ${e({click:()=>{let n=document.querySelector(o);if(!n)return;let s=be(n).top-50;Nr.to(s)}})}
        >
            ${r}
            <span class="anchor-button__arrow">
                <span class="anchor-button__arrow__start"></span>
                <span class="anchor-button__arrow__end"></span>
            </span>
        </button>
    </div>`};var PT=m.createComponent({tag:"anchor-button",component:NT,props:{anchor:()=>({value:"",type:String}),content:()=>({value:"",type:String})}});var UM=({items:t,links:e})=>e?t.map(({label:r,url:o})=>g`<li>
                          <a href="${o}" class="list-links">
                              ${r}
                              <span class="list-links__arrow">
                                  <span class="list-links__arrow__start"></span>
                                  <span class="list-links__arrow__end"></span>
                              </span>
                          </a>
                      </li>`).join(""):t.map(r=>g` <li>${r}</li> `).join(""),AT=({getState:t})=>{let{style:e,color:r,items:o,links:n}=t(),s=`is-${r}`;return g`<ul class="ul ul--${e} ${s} ${n?"use-links":"use-default"}">
        ${UM({items:o,links:n})}
    </ul>`};var OT=m.createComponent({tag:"mob-list",component:AT,props:{style:()=>({value:"medium",type:String,validate:t=>["small","medium","big"].includes(t),strict:!0}),dots:()=>({value:!0,type:Boolean}),links:()=>({value:!1,type:Boolean}),color:()=>({value:"black",type:String,validate:t=>["white","black","grey","hightlight"].includes(t)}),items:()=>({value:[],type:Array})}});var $T=({getState:t})=>{let{style:e,color:r,boxed:o,note:n}=t(),s=r==="inherit"?"":`is-${r}`;return g`<p
        class="p p--${e} ${o?"p--boxed":""} ${n?"p--note":""} ${s}"
    >
        <mobjs-slot></mobjs-slot>
    </p>`};var LT=m.createComponent({tag:"mob-paragraph",component:$T,props:{style:()=>({value:"medium",type:String,validate:t=>["small","medium","big"].includes(t),strict:!0}),color:()=>({value:"inherit",type:String,validate:t=>["inherit","white","hightlight","black"].includes(t)}),boxed:()=>({value:!1,type:Boolean}),note:()=>({value:!1,type:Boolean})}});var GM=t=>t.length>0?g`<span class="title-index">${t}</span>`:"",DT=({getProxi:t})=>{let e=t(),r=e.color==="inherit"?"":`is-${e.color}`,o=e.isBold?"is-bold":"",n=e.isSection?"is-section":"";return g`<${e.tag} class="${r} ${o} ${n}">
            ${GM(e.index)}
            <span class="title-content">
                <mobjs-slot></mobjs-slot>
            </span>
        </${e.tag}>`};var FT=m.createComponent({tag:"mob-title",component:DT,props:{tag:()=>({value:"h1",type:String}),color:()=>({value:"inherit",type:String,validate:t=>["inherit","white","black"].includes(t)}),isSection:()=>({value:!1,type:Boolean}),isBold:()=>({value:!1,type:Boolean}),index:()=>({value:"",type:String})}});var qM=({data:t,staticProps:e,awaitLoadSnippet:r})=>t.map(o=>{let{component:n,props:s,content:i}=o;return g`
                <${n} ${e({...s,awaitLoad:r})}>
                    ${i??""}
                </${n}>
            `}).join(""),JM=async({source:t,data:e})=>{if(e&&e.length>0)return e;let{success:r,data:o}=await At({source:t});return r?o.data:[]},BT=async({getState:t,staticProps:e})=>{let{source:r,data:o}=t(),n=await JM({source:r,data:o}),{awaitLoadSnippet:s,usePadding:i}=t();return g`
        <section class="html-content ${i?"use-padding":""}">
            ${qM({data:n,staticProps:e,awaitLoadSnippet:s})}
        </section>
    `};var YM=async({proxi:t})=>{let{success:e,data:r}=await oe({source:t.url});e&&(t.source=r)},VT=({getProxi:t,invalidate:e,onMount:r})=>{let o=t();return r(()=>{YM({proxi:o})}),g`
        <div class="c-doc-svg ${o.className}">
            ${e({observe:()=>o.source,render:()=>o.source})}
        </div>
    `};var WT=m.createComponent({tag:"doc-svg",component:VT,props:{className:()=>({value:"",type:String}),url:()=>({value:"",type:String})},state:{source:()=>({value:g`<span class="c-doc-svg__loading">
                    loading image ...
                </span>`,type:String})}});var wc=m.createComponent({tag:"html-content",component:BT,props:{source:()=>({value:"",type:String}),data:()=>({value:[],type:Array}),awaitLoadSnippet:()=>({value:!1,type:Boolean}),useTriangle:()=>({value:!0,type:Boolean}),usePadding:()=>({value:!0,type:Boolean})},child:[OT,LT,FT,ET,RT,PT,WT]});var jT=({bindEffect:t,getProxi:e})=>{let r=e(),o=r.isSection?"is-section":"",n=r.isNote?"is-note":"";return g`
        <button
            type="button"
            class="${o} ${n}"
            ${t({toggleClass:{active:()=>r.active}})}
        >
            <span>${r.label}</span>
        </button>
    `};var zT=m.createComponent({tag:"scroll-to-button",component:jT,props:{label:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean}),isSection:()=>({value:!1,type:Boolean}),isNote:()=>({value:!1,type:Boolean})}});var fi=!1;function XM({delegateEvents:t,bindProps:e,proxi:r}){return r.anchorItems.map(o=>{let n=o.isSection||o.isNote?"":t({click:async()=>{let{id:s,label:i,element:a}=o,c=s==="start"?0:be(a).top-50;fi=!0,r.activeLabel=i,await Nr.to(c),setTimeout(()=>{fi=!1},1e3)}});return g`
                <li>
                    <scroll-to-button
                        ${n}
                        ${e(()=>({active:r.activeLabel===o.label,label:o.label,isSection:o.isSection??!1,isNote:o.isNote??!1}))}
                    >
                    </scroll-to-button>
                </li>
            `}).join("")}var HT=({proxi:t,direction:e,winHeight:r})=>{u.useFrame(()=>{u.useNextTick(()=>{if("anchorItems"in t){if(e==="DOWN"){let o=t.anchorItems.findLast(({top:n,isNote:s})=>!s&&n<window.scrollY+r-200);t.activeLabel=o?o.label:""}if(e==="UP"){let o=t.anchorItems.findLast(({top:n,isNote:s})=>!s&&n<window.scrollY+200);t.activeLabel=o?o.label:""}}})})},UT=({onMount:t,delegateEvents:e,bindProps:r,invalidate:o,computed:n,addMethod:s,updateState:i,getProxi:a})=>{let c=a(),l="DOWN",p=window.innerHeight;return s("addItem",({id:h,label:f,element:d,isSection:v,isNote:y})=>{i("anchorItemsToBeComputed",T=>[...T,{id:h,label:f,element:d,isSection:v,isNote:y}])}),s("setActiveLabel",h=>{fi||(c.activeLabel=h)}),t(()=>{if(ue.mq("max","desktop"))return;n(()=>c.anchorItems,()=>c.anchorItemsToBeComputed.map(y=>({...y,top:be(y.element).top})));let h=u.useScrollThrottle(({direction:y})=>l=y),f=new ResizeObserver(u.debounce(()=>{u.useFrame(()=>{u.useNextTick(()=>{p=window.innerHeight})}),"anchorItems"in c&&c.anchorItems.forEach(y=>{y.top=be(y.element).top})},200));f.observe(m.getRoot());let d=c.updateAnchorOnWheel?u.useMouseWheel(u.debounce(()=>{fi||HT({proxi:c,direction:l,winHeight:p})},600)):()=>{},v=u.useScrollEnd(()=>{fi||HT({proxi:c,direction:l,winHeight:p})});return()=>{d(),h(),v(),f.unobserve(m.getRoot()),f.disconnect(),f=null}}),g`
        <div class="c-scroll-to">
            <ul>
                ${o({observe:()=>c.anchorItems,render:()=>XM({delegateEvents:e,bindProps:r,proxi:c})})}
            </ul>
        </div>
    `};var GT=m.createComponent({tag:"scroll-to",component:UT,state:{activeLabel:()=>({value:"",type:String}),updateAnchorOnWheel:()=>({value:!1,type:Boolean}),anchorItemsToBeComputed:()=>({value:[],type:Array}),anchorItems:()=>({value:[],type:Array,transform:t=>t.toSorted(function(e,r){let{element:o}=e,{element:n}=r;return o===n||!o||!n?0:o.compareDocumentPosition(n)&2?1:-1})})},child:[zT]});var Ic=({breadCrumbs:t})=>t.map((e,r)=>r===t.length-1?g`<a href="${e.url}" class="breadcrumbs__arrow">
                          <div class="breadcrumbs__arrow__start"></div>
                          <div class="breadcrumbs__arrow__end"></div>
                      </a>
                      <a class="breadcrumbs__link" href="${e.url}"
                          >${e.title}</a
                      >`:g`<a class="breadcrumbs__link" href="${e.url}"
                      >${e.title}</a
                  >`).join("");var Mc=t=>{m.useMethodByName(Cc)?.updateList(t??[])};m.useComponent([mc,dc,GT,hc,wc]);var Be=async({props:t})=>{let{source:e,title:r,breadCrumbs:o,rightSidebar:n}=t,{data:s}=await At({source:e});return Mc(n??[]),g` <doc-container>
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
    </doc-container>`};m.useComponent([mc,dc,hc,wc]);var ie=async({props:t})=>{let{source:e,title:r,breadCrumbs:o,rightSidebar:n}=t,{data:s}=await At({source:e});return Mc(n??[]),g`<doc-container>
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
    </doc-container>`};var qT=({weakPathElement:t,weakScrollerElement:e,wrapElement:r,setActiveItem:o,weakScreenElement:n})=>{let s={ax:53,ay:70,bx:64,by:80,cx:89,cy:87,dx:100,dy:100,ex:0,ey:100,fx:10,fy:77,gx:17,gy:84},i={ax:-1,ay:-1,bx:1,by:1,cx:-1,cy:-1,dx:1,dy:1,ex:1,ey:1,fx:-1,fy:-1,gx:1,gy:1},a=U.createSequencer({data:{...s}});a.goTo({fy:90,ay:90,cy:70},{start:0,end:3.5}).goTo({gy:70,by:80},{start:2,end:5}).goTo({fy:90,ay:100,cy:90},{start:4,end:7.5}).goTo({ay:120,fy:80,cy:80},{start:7.5,end:10}).goTo({gy:100,by:100},{start:6,end:10}).add(()=>{o(1)},0).add(({direction:d,isForced:v})=>{v||d==="backward"||o(2)},1.5).add(({direction:d,isForced:v})=>{v||d==="backward"||o(3)},5.5).add(({direction:d,isForced:v})=>{v||d==="backward"||o(4)},9.5).add(({direction:d,isForced:v})=>{v||d==="forward"||o(1)},1.5).add(({direction:d,isForced:v})=>{v||d==="forward"||o(2)},5).add(({direction:d,isForced:v})=>{v||d==="forward"||o(3)},9),a.subscribe(({ax:d,ay:v,bx:y,by:T,cx:S,cy:_,dx:w,dy:x,ex:E,ey:I,fx:P,fy:A,gx:$,gy:N})=>{s.ax=d,s.ay=v,s.bx=y,s.by=T,s.cx=S,s.cy=_,s.dx=w,s.dy=x,s.ex=E,s.ey=I,s.fx=P,s.fy=A,s.gx=$,s.gy=N});let c=U.createTimeTween({data:{...i}});c.subscribe(({ax:d,ay:v,bx:y,by:T,cx:S,cy:_,dx:w,dy:x,ex:E,ey:I,fx:P,fy:A,gx:$,gy:N})=>{i.ax=d,i.ay=v,i.bx=y,i.by=T,i.cx=S,i.cy=_,i.dx=w,i.dy=x,i.ex=E,i.ey=I,i.fx=P,i.fy=A,i.gx=$,i.gy=N});let l=Me.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(c,{ax:()=>Ut(-3,3),ay:()=>Ut(-3,3),bx:()=>Ut(-3,3),by:()=>Ut(-3,3),cx:()=>Ut(-3,3),cy:()=>Ut(-3,3),dx:()=>0,dy:()=>0,ex:()=>0,ey:()=>0,fx:()=>Ut(-3,3),fy:()=>Ut(-3,3),gx:()=>Ut(-3,3),gy:()=>Ut(-3,3)},{duration:3e3});l.play();let p=!0,h=()=>{if(!p)return;let d={x:s.ax+i.ax,y:s.ay+i.ay},v={x:s.bx+i.bx,y:s.by+i.by},y={x:s.cx+i.cx,y:s.cy+i.cy},T={x:s.dx+i.dx,y:s.dy+i.dy},S={x:s.ex+i.ex,y:s.ey+i.ey},_={x:s.fx+i.fx,y:s.fy+i.fy},w={x:s.gx+i.gx,y:s.gy+i.gy};t.deref()&&(t.deref().style.clipPath=`polygon(${d.x}% ${d.y}%, ${v.x}% ${v.y}%, ${y.x}% ${y.y}%, ${T.x}% ${T.y}%,${S.x}% ${S.y}%,${_.x}% ${_.y}%,${w.x}% ${w.y}%)`,u.useNextFrame(()=>h()))};u.useFrame(()=>h());let f=Ke.createScrollTrigger({item:r,dynamicStart:{position:"right",value:()=>je(n?.deref()??document.createElement("div"))},dynamicEnd:{position:"right",value:()=>je(e?.deref()??document.createElement("div"))??0},reverse:!1,propierties:"tween",ease:!1,tween:a});return{pathScroller:f,pathSequencer:a,pathTween:c,pathTimeline:l,stopLoop:()=>{p=!1},destroy:()=>{f.destroy(),f=null,a.destroy(),a=null,c.destroy(),c=null,l.destroy(),l=null}}};var JT=({title_1:t,title_2:e})=>{let r=U.createScrollerTween({from:{x:0},to:{x:30}});r.subscribe(({x:i})=>{t.style.transform=`translate3d(0,0,0) translate(${i}px, 0px)`}),r.onStop(({x:i})=>{t.style.transform=`translate(${i}px, 0px)`});let o=Ke.createParallax({item:t,propierties:"tween",tween:r,ease:!1,align:"start"}),n=U.createScrollerTween({from:{x:0},to:{x:-30}});n.subscribe(({x:i})=>{e.style.transform=`translate3d(0,0,0) translateX(${i}px)`}),n.onStop(({x:i})=>{e.style.transform=`translateX(${i}px)`});let s=Ke.createParallax({item:e,propierties:"tween",tween:n,ease:!1,align:"start"});return{title1parallax:o,title2parallax:s,title1tween:r,title2tween:n}};var kc=({title:t})=>{let e=U.createScrollerTween({from:{x:0},to:{x:-60}});e.subscribe(({x:o})=>{t.deref()&&(t.deref().style.transform=`translate3d(0,0,0) translateX(${o}px)`)}),e.onStop(({x:o})=>{t.deref()&&(t.deref().style.transform=`translateX(${o}px)`)});let r=Ke.createParallax({item:t.deref(),propierties:"tween",tween:e,ease:!1,align:"center"});return{sectionContentScroller:r,destroy:()=>{r.destroy(),r=null}}};var YT=({screenElement:t,scrollerElement:e,pathElement:r,wrapElement:o,title_1:n,title_2:s,section2_title:i,section3_title:a,section4_title:c,setActiveItem:l,onMove:p,onScrollEnd:h,snapPoints:f})=>{let d=new WeakRef(e),v=new WeakRef(i),y=new WeakRef(a),T=new WeakRef(c),S=new WeakRef(r),_=new WeakRef(t),{pathScroller:w,pathSequencer:x,pathTimeline:E,pathTween:I,stopLoop:P,destroy:A}=qT({weakPathElement:S,weakScrollerElement:d,wrapElement:o,setActiveItem:l,weakScreenElement:_}),{title1parallax:$,title2parallax:N,title1tween:R,title2tween:O}=JT({title_1:n,title_2:s}),{sectionContentScroller:D,destroy:k}=kc({title:v}),{sectionContentScroller:L,destroy:C}=kc({title:y}),{sectionContentScroller:M,destroy:B}=kc({title:T}),V=new _t({screen:t,scroller:e,direction:"horizontal",drag:!0,easeType:"spring",breakpoint:"small",useHorizontalScroll:!0,snapPoints:f,children:[w,$,N,D,L,M],onUpdate:({value:F})=>{p(F),h()}});return V.init(),setTimeout(()=>{V?.refresh?.()},500),{goTo:F=>{!F&&F!==0||V?.move?.(F).catch(()=>{})},destroy:()=>{V.destroy(),V=null,x.destroy(),w.destroy(),E.destroy(),I.destroy(),$.destroy(),N.destroy(),R.destroy(),O.destroy(),D.destroy(),L.destroy(),P(),A(),k(),C(),B()}}};var XT=({elements:t})=>{let e=U.createSpring({data:{x:0},stagger:{each:5}});return t.map(o=>o.querySelector("svg")).forEach(o=>{o&&(e.subscribe(({x:n})=>{o.style.transform=`translate3D(0,0,0) translateY(${-n}px)`}),e.onComplete(({x:n})=>{o.style.transform=`translateY(${-n}px)`}))}),{svgSpring:e,destroySvgSpring:()=>{e.destroy(),e=null}}};var bi=()=>{},gi=t=>Promise.resolve(t),Rc=()=>{},Nc={1:0,2:100/3,3:100/3*2,4:100},KM=({setRef:t,getState:e})=>{let{titleTop:r,titleBottom:o}=e().block_1;return g`
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
    `},QM=({setRef:t,getState:e})=>{let{title:r,copy:o}=e().block_2;return g`
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
    `},ZM=({setRef:t,getState:e})=>{let{title:r,copy:o}=e().block_3;return g`
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
    `},ek=({setRef:t,getState:e})=>{let{title:r,items:o}=e().block_4;return g`
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
    `},tk=({proxi:t,delegateEvents:e,bindEffect:r})=>g`
        <ul class="l-about__nav">
            ${t.navItem.map(({index:o,label:n})=>g`
                        <li class="l-about__nav__item">
                            <button
                                class="l-about__nav__button"
                                ${e({click:()=>{bi(Nc[o]),Rc()}})}
                                ${r({toggleClass:{active:()=>t.activenavItem===o}})}
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
    `,KT=({onMount:t,setRef:e,getRef:r,getRefs:o,getState:n,bindEffect:s,delegateEvents:i,getProxi:a})=>{let c=a(),l=4,p=!1;return t(()=>{let{screenElement:h,scrollerElement:f,wrapElement:d,title_1:v,title_2:y,section2_title:T,section3_title:S,section4_title:_,pathElement:w}=r(),{svg:x}=o(),E=0,I=!1,P=0,{svgSpring:A,destroySvgSpring:$}=XT({elements:x});gi=async O=>{if(u.shouldMakeSomething()||p){A.stop(),p=!0,setTimeout(()=>{p=!1},2e3);return}let k=-Math.abs(O/30);Number.isNaN(k)||await A.goTo({x:k}).catch(()=>{})},Rc=()=>{gi(3e3),setTimeout(()=>{gi(0)},500)};let{destroy:N,goTo:R}=YT({screenElement:h,scrollerElement:f,pathElement:w,wrapElement:d,title_1:v,title_2:y,section2_title:T,section3_title:S,section4_title:_,snapPoints:Object.values(Nc),setActiveItem:O=>{c.activenavItem=O},onMove:O=>{I||(E=O),I=!0,P=E-O,gi(P)},onScrollEnd:u.useDebounce(()=>{I=!1,P=0,gi(P)},500)});return bi=R,c.isMounted=!0,()=>{bi=()=>{},N(),$()}}),g`<div
        class="l-about"
        style="--number-of-section:${l}"
        ${s({toggleClass:{active:()=>c.isMounted}})}
    >
        <div class="l-about__sqaure-container">${rk()}</div>
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
                    ${KM({setRef:e,getState:n})}
                    ${QM({setRef:e,getState:n})}
                    ${ZM({setRef:e,getState:n})}
                    ${ek({setRef:e,getState:n})}
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
    </div>`};var QT=m.createComponent({tag:"about-component",component:KT,props:{block_1:()=>({value:{titleTop:"",titleBottom:""},type:"any"}),block_2:()=>({value:{title:"",copy:""},type:"any"}),block_3:()=>({value:{title:"",copy:""},type:"any"}),block_4:()=>({value:{title:"",items:[""]},type:"any"}),aboutSvg:()=>({value:"",type:String})},state:{navItem:()=>({value:[{index:1,label:"about"},{index:2,label:"why"},{index:3,label:"what"},{index:4,label:"inspiration"}],type:Array}),activenavItem:()=>({value:1,type:Number,transform:t=>ue.clamp(t,1,4)}),isMounted:()=>({value:!1,type:Boolean})}});m.useComponent([QT]);var ZT=async()=>{let{data:t}=await At({source:"./data/about/index.json"}),{data:e}=await oe({source:"./asset/svg/about.svg?v=0.1"});return g`<about-component
        ${m.staticProps({block_1:t.block_1,block_2:t.block_2,block_3:t.block_3,block_4:t.block_4,aboutSvg:e})}
    ></about-component> `};var e_=({getProxi:t,bindObject:e,delegateEvents:r,onMount:o,id:n,bindEffect:s})=>{let i=t();return o(()=>()=>{}),g`<div
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
    </div> `};var Pc=m.createComponent({tag:"benchmark-fake-component",component:e_,props:{counter:0,label:"",index:0},state:{isSelected:!1}});var ht=(t=1001)=>({state:{counter:()=>({value:0,type:Number}),data:()=>({value:[],type:Array,validate:e=>e.length<t,strict:!0,skipEqual:!1}),time:()=>({value:0,type:Number,transform:e=>Math.round(e),skipEqual:!1}),isLoading:()=>({value:!1,type:Boolean}),currentIndex:()=>({value:-1,type:Number})},child:[Pc]});var up=t=>{for(let e=t.length-1;e>0;e--){let r=Math.floor(Math.random()*(e+1));[t[e],t[r]]=[t[r],t[e]]}return t},vi=t=>{let e=u.checkType(Number,t)?t:0;return[...Array.from({length:e}).keys()].map(r=>({label:`comp-${r+1}`}))},lp=({proxi:t,value:e,useShuffle:r=!1})=>{t.isLoading=!0,u.useFrameIndex(()=>{u.useNextTick(async()=>{let o=performance.now();t.data=r?up(vi(e)):vi(e),await m.tick();let s=performance.now()-o;t.time=s,t.isLoading=!1})},2)},dt=({delegateEvents:t,setRef:e,getRef:r,bindEffect:o,proxi:n})=>g`
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
                ${t({keydown:s=>{if(s.keyCode===13){s.preventDefault();let i=Number(s.currentTarget?.value??0);lp({proxi:n,value:i})}}})}
            />
            <button
                type="button"
                class="benchmark__head__button"
                ${t({click:()=>{let{input:s}=r(),i=Number(s?.value??0);lp({proxi:n,value:i})}})}
            >
                Generate components
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${t({click:()=>{lp({proxi:n,value:n.data.length,useShuffle:!0})}})}
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
    `;var t_=({onMount:t,delegateEvents:e,bindText:r,invalidate:o,getState:n,staticProps:s,setRef:i,getRef:a,bindProps:c,bindEffect:l,getProxi:p})=>{let h=p();return t(()=>()=>{a()?.input.remove()}),g`<div class="benchmark">
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
                        ${f.map(({label:d},v)=>g`
                                    <benchmark-fake-component
                                        ${s({label:d,index:v})}
                                        ${c(()=>({counter:h.counter}))}
                                    ></benchmark-fake-component>
                                `).join("")}
                    `}})}
        </div>
    </div>`};var r_=m.createComponent({tag:"benchmark-invalidate",component:t_,...ht()});var Ac=(t=1e3)=>g`
        <p>
            Generates and updates a large list of components with 5 reactive
            elements inside.<br />
            ( max component <strong>${t}</strong> ).
        </p>
    `;var o_=({onMount:t,delegateEvents:e,bindObject:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindEffect:a,getProxi:c})=>{let l=c();return t(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">Repeat ( with key ):</h3>
            <h2 class="benchmark__head__title">
                Generate components performance
            </h2>
            ${Ac()}
            ${dt({setRef:o,getRef:n,delegateEvents:e,bindEffect:a,proxi:l})}

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
    </div>`};var n_=m.createComponent({tag:"benchmark-repeat-key",component:o_,...ht()});var s_=({onMount:t,delegateEvents:e,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindObject:a,bindEffect:c,getProxi:l})=>{let p=l();return t(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
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
    </div>`};var i_=m.createComponent({tag:"benchmark-repeat-key-nested",component:s_,...ht(31)});var a_=({onMount:t,delegateEvents:e,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindEffect:a,getProxi:c})=>{let l=c();return t(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">Repeat ( without key ):</h3>
            <h2 class="benchmark__head__title">
                Generate components performance
            </h2>
            ${Ac()}
            ${dt({setRef:o,getRef:n,delegateEvents:e,bindEffect:a,proxi:l})}

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
    </div>`};var c_=m.createComponent({tag:"benchmark-repeat-no-key",component:a_,...ht()});var Ot=u.createStore({data:()=>({value:[],type:Array,validate:t=>t.length<1001,strict:!0,skipEqual:!1}),counter:()=>({value:0,type:Number}),time:()=>({value:0,type:Number,transform:t=>Math.round(t),skipEqual:!1}),isLoading:()=>({value:!1,type:Boolean})});var pp=({value:t,useShuffle:e=!1})=>{Ot.set("isLoading",!0),u.useFrameIndex(()=>{u.useNextTick(async()=>{let r=performance.now();Ot.set("data",e?up(vi(t)):vi(t)),await m.tick();let n=performance.now()-r;Ot.set("time",n),Ot.set("isLoading",!1)})},2)},l_=({delegateEvents:t,setRef:e,getRef:r,getState:o,bindEffect:n})=>g`
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
                ${t({keydown:s=>{if(s.code.toLowerCase()==="enter"){s.preventDefault();let i=Number(s.currentTarget?.value??0);pp({value:i})}}})}
            />
            <button
                type="button"
                class="benchmark__head__button"
                ${t({click:()=>{let{input:s}=r(),i=Number(s?.value??0);pp({value:i})}})}
            >
                Generate components
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${t({click:()=>{let{data:s}=o();pp({value:s.length,useShuffle:!0})}})}
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
    `;var u_=({onMount:t,delegateEvents:e,bindText:r,setRef:o,getRef:n,getState:s,bindProps:i,repeat:a,bindEffect:c,getProxi:l})=>{let p=l();return t(()=>()=>{n()?.input.remove(),Ot.set("data",[]),Ot.set("time",0),Ot.set("counter",0)}),g`<div class="benchmark">
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
            ${l_({setRef:o,getRef:n,delegateEvents:e,getState:s,bindEffect:c})}

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
    </div>`};var p_=m.createComponent({tag:"benchmark-repeat-no-key-bind-store",component:u_,bindStore:Ot,child:[Pc]});var m_=({onMount:t,delegateEvents:e,bindText:r,setRef:o,getRef:n,bindProps:s,repeat:i,bindObject:a,bindEffect:c,getProxi:l})=>{let p=l();return t(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
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
    </div>`};var h_=m.createComponent({tag:"benchmark-repeat-key-no-nested",component:m_,...ht(31)});var Oc=(t=1e3)=>g`
        <p>
            Generates and updates a large list of vanilla HTML element with 4
            reactive elements inside.<br />
            ( max component <strong>${t}</strong> ).
        </p>
    `;var d_=({onMount:t,delegateEvents:e,bindText:r,setRef:o,getRef:n,repeat:s,bindEffect:i,bindObject:a,getProxi:c})=>{let l=c();return t(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat no component ( without key ):
            </h3>
            <h2 class="benchmark__head__title">
                Generate vanilla html performance
            </h2>
            ${Oc(1e3)}
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
    </div>`};var f_=m.createComponent({tag:"benchmark-repeat-no-component-no-key",component:d_,...ht(1001)});var g_=({onMount:t,delegateEvents:e,bindText:r,setRef:o,getRef:n,repeat:s,bindEffect:i,bindObject:a,getProxi:c})=>{let l=c();return t(()=>()=>{n()?.input.remove()}),g`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat no component ( with key ):
            </h3>
            <h2 class="benchmark__head__title">
                Generate vanilla html performance
            </h2>
            ${Oc(1e3)}
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
    </div>`};var b_=m.createComponent({tag:"benchmark-repeat-no-component-with-key",component:g_,...ht(1001)});m.useComponent([r_,c_,n_,i_,h_,p_,f_,b_]);var Ar=async({props:t})=>{let{rootComponent:e}=t;return g`<div class="l-benchMark"><${e}></${e}></div>`};var Se=({active:t=!0,nextRoute:e="",prevRoute:r="",backRoute:o=""})=>{let n=m.useMethodByName(ui);n.update("active",t),n.update("nextRoute",e),n.update("prevRoute",r),n.update("backRoute",o)};m.beforeRouteChange(()=>{let t=m.useMethodByName(ui);t.update("active",!1),t.update("nextRoute",""),t.update("prevRoute",""),t.update("backRoute","")});var ee=u.createStore({activeNavigationSection:()=>({value:"",type:String,skipEqual:!1}),navigationIsOpen:()=>({value:!1,type:Boolean})});ee.set("activeNavigationSection","");var ft=({disableOffcanvas:t})=>{let e="OffscreenCanvas"in globalThis&&!t;return{useOffscreen:e,context:e?"bitmaprenderer":"2d"}},gt=({useOffscreen:t,canvas:e})=>{let r=t?new OffscreenCanvas(e.width,e.height):null,o=t?r?.getContext("2d"):null;return{offscreen:r,offScreenCtx:o}},bt=({useOffscreen:t,offscreen:e,ctx:r})=>{if(t&&e&&r){let o=e.transferToImageBitmap();r.transferFromImageBitmap(o)}},fo=t=>"roundRect"in t;var go=({canvas:t,numberOfRow:e,numberOfColumn:r,cellWidth:o,cellHeight:n,gutter:s})=>{let i={row:0,col:-1,items:[]};return[...Array.from({length:e*r+e}).keys()].reduce(a=>{let{row:c,col:l,items:p}=a,h=l<r?l+1:0,f=h===0?c+1:c,d=(o+s)*h,v=(n+s)*f;return{row:f,col:h,items:[...p,{width:o,height:n,x:d,y:v,centerX:d+o/2,centerY:v+n/2,offsetXCenter:ok({canvasWidth:t.width,width:o,gutter:s,numberOfColumn:r}),offsetYCenter:nk({canvasHeight:t.height,height:n,gutter:s,numberOfRow:e}),gutter:s,numberOfColumn:r}]}},i)},ok=({canvasWidth:t,width:e,gutter:r,numberOfColumn:o})=>t/2-(e+r)*o/2,nk=({canvasHeight:t,height:e,gutter:r,numberOfRow:o})=>t/2-(e+r)*(o+1)/2;var v_=({canvas:t,numberOfRow:e,numberOfColumn:r,fill:o,disableOffcanvas:n,stagger:s,reorder:i,animationType:a})=>{let c=window.innerWidth/20,l=window.innerHeight/20,p=1,{useOffscreen:h,context:f}=ft({disableOffcanvas:n}),d=!0,v=t.getContext(f,{alpha:!0}),y=m.getActiveRoute(),{offscreen:T,offScreenCtx:S}=gt({useOffscreen:h,canvas:t}),_=h?S:v,w=fo(_);_=null,t.width=t.clientWidth,t.height=t.clientHeight;let x=go({canvas:t,numberOfRow:e,numberOfColumn:r,cellWidth:c,cellHeight:l,gutter:p}).items,E=i?x.map((R,O)=>({...R,scale:1,rotate:0,hasFill:o.includes(O)})).toSorted(R=>R.hasFill?-1:1).toReversed():x.map((R,O)=>{let D=o.includes(O);return{...R,scale:1,rotate:0,hasFill:D}}),I=U.createTimeTween({ease:"easeInOutQuad",stagger:s,data:{scale:1,rotate:0}});E.forEach(R=>{I.subscribeCache(({scale:O,rotate:D})=>{R.rotate=D,R.scale=O})});let P=()=>{if(!v)return;let R=t.width,O=t.height,D=h?S:v;D&&(h&&T?(T.width=R,T.height=O):D.reset(),E.forEach(({x:k,y:L,width:C,height:M,rotate:B,scale:V,hasFill:F,offsetXCenter:z,offsetYCenter:te})=>{let ae=Math.PI/180*B,q=Math.cos(ae)*V,ne=Math.sin(ae)*V;D.setTransform(q,ne,-ne,q,Math.floor(z+k),Math.floor(te+L));let re=Math.round(-C/2),ce=Math.round(-M/2);w?(D.beginPath(),D.roundRect(re,ce,C,M,150)):(D.beginPath(),D.rect(re,ce,C,M)),F?(D.fillStyle="#000000",D.fill()):(D.fillStyle="rgba(255, 255, 255, 1)",D.fill())}),bt({useOffscreen:h,offscreen:T,ctx:v}))},A=Me.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).label({name:"label1"});(a==="asymmetric"||a==="random")&&A.goTo(I,{scale:.2,rotate:90},{duration:1e3}).goTo(I,{scale:1},{duration:500}).goTo(I,{rotate:180,scale:1.2},{duration:500}).goTo(I,{scale:.3,rotate:0},{duration:500}).goTo(I,{scale:1},{duration:1200}),(a==="edges"||a==="radial")&&A.goTo(I,{scale:.3,rotate:0},{duration:1e3}).goTo(I,{scale:1},{duration:1e3}),A.onLoopEnd(({direction:R,loop:O})=>{console.log(`loop end: ${R}, ${O}`)}),A.play();let $=()=>{P(),d&&u.useNextFrame(()=>$())};u.useFrame(()=>{$()});let N=ee.watch("navigationIsOpen",R=>{if(R){A?.pause(),d=!1;return}setTimeout(async()=>{d=!0,m.getActiveRoute().route===y.route&&(A?.resume(),u.useFrame(()=>$()))},500)});return()=>{I.destroy(),A.destroy(),N(),I=null,A=null,v=null,T=null,S=null,x=[],d=!1,E=null,f=null}};var mp=[{label:"asymmetric row",params:{animationType:"asymmetric",fill:[16,27,38,49,60,71,82,93],numberOfColumn:10,numberOfRow:10,stagger:{each:5,grid:{col:10,row:1,direction:"row"},waitComplete:!1},reorder:!0}},{label:"random",params:{animationType:"random",fill:[16,27,38,49,60,71,82,93],numberOfColumn:10,numberOfRow:10,stagger:{each:2,from:"random",waitComplete:!1},reorder:!1}},{label:"edges",params:{animationType:"edges",fill:[0,13,20,45,65,71,72,73,74,75,76,77,83,92,96,113,117,134,138,155,156,157,158,159,189,209],numberOfColumn:10,numberOfRow:10,stagger:{each:10,from:"edges",waitComplete:!1},reorder:!1}},{label:"radial",params:{animationType:"radial",fill:[],numberOfColumn:8,numberOfRow:9,stagger:{each:20,from:{x:4,y:4},grid:{col:9,row:9,direction:"radial"},waitComplete:!1},reorder:!1}}];var hp=({proxi:t,getRef:e})=>{t.destroy(),t.destroy=v_({canvas:e().canvas,...mp[t.currentParamsId].params,disableOffcanvas:!0})};function sk({delegateEvents:t,bindEffect:e,proxi:r,getRef:o}){return mp.map(({label:n},s)=>g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn"
                    ${t({click:()=>{r.currentParamsId=s,hp({proxi:r,getRef:o})}})}
                    ${e({toggleClass:{active:()=>r.currentParamsId===s}})}
                >
                    ${n}
                </button>
            </li>`).join("")}var y_=({onMount:t,setRef:e,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s})=>{let i=n();return t(()=>{u.useFrame(()=>{u.useNextTick(()=>{hp({proxi:i,getRef:r})})});let a=u.useResize(()=>{hp({proxi:i,getRef:r})});return u.useFrame(()=>{"isMounted"in i&&(i.isMounted=!0)}),()=>{i.destroy(),i.destroy=()=>{},a()}}),g`
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
                    <canvas ${e("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var T_=m.createComponent({tag:"animatedpattern-n0",component:y_,props:{background:()=>({value:"",type:String})},state:{isMounted:()=>({value:!1,type:Boolean}),controlsActive:()=>({value:!1,type:Boolean}),destroy:()=>({value:()=>{},type:Function}),currentParamsId:()=>({value:0,type:Number})}});m.useComponent([T_]);var __=async()=>{let{data:t}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"#async-timeline",nextRoute:"#animatedPatternN1",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <animatedpattern-n0
            ${m.staticProps({background:t})}
        ></animatedpattern-n0>
    </div>`};var dp=({canvas:t,disableOffcanvas:e})=>{let r=window.innerHeight>=700?window.innerHeight/16:window.innerHeight/20,o=window.innerHeight>=700?window.innerHeight/16:window.innerHeight/20,n=7,s=15,i=window.innerHeight/150,a=[2,18,10,27,21,22,23,24,25,25,26,37,42,53,58,69,74,85,86,87,88,89,90,44,60,65,98,108],{useOffscreen:c,context:l}=ft({disableOffcanvas:e}),p=!0,{top:h,left:f}=be(t),d=t.getContext(l,{alpha:!0}),v=m.getActiveRoute(),{offscreen:y,offScreenCtx:T}=gt({useOffscreen:c,canvas:t});t.width=t.clientWidth,t.height=t.clientHeight;let S=go({canvas:t,numberOfRow:n,numberOfColumn:s,cellWidth:r,cellHeight:o,gutter:i}).items,_=S.map((O,D)=>({...O,scale:0,mouseX:0,mouseY:0,hasFill:a.includes(D)})).toSorted(O=>O.hasFill?-1:1),w=U.createLerp({data:{mouseX:0,mouseY:0}});_.forEach(O=>{w.subscribeCache(({mouseX:D,mouseY:k})=>{O.mouseX=D,O.mouseY=k})});let x=U.createTimeTween({ease:"easeInOutSine",stagger:{each:5,from:"center",waitComplete:!1},data:{scale:0}});_.forEach(O=>{x.subscribeCache(({scale:D})=>{O.scale=D})});let E=()=>{if(!d)return;let O=t.width,D=t.height,k=c?T:d;k&&(c&&y?(y.width=O,y.height=D):k.reset(),_.forEach(({x:L,y:C,width:M,height:B,mouseX:V,mouseY:F,scale:z,hasFill:te,offsetXCenter:ae,offsetYCenter:q})=>{if(!te)return;let ne=V-(t.width-(M+i)*s)/2,re=F-(t.height-(B+i)*n)/2,ce=(L-ne)/250,Oe=(C-re)/250,Je=Math.sqrt(Math.pow(Math.abs(ce),2)+Math.pow(Math.abs(Oe),2)),Z=ue.clamp(Math.abs(Je),0,2),ye=0,ke=Math.cos(ye)*(Z+z),Ae=Math.sin(ye)*(Z+z);k.setTransform(ke,Ae,-Ae,ke,Math.floor(ae+L),Math.floor(q+C)),k.beginPath(),k.rect(Math.floor(-M/2),Math.floor(-B/2),M,B),k.fillStyle="#000000",k.fill()}),k.globalCompositeOperation="destination-out",_.forEach(({x:L,y:C,width:M,height:B,mouseX:V,mouseY:F,scale:z,hasFill:te,offsetXCenter:ae,offsetYCenter:q})=>{if(te)return;let ne=V-(t.width-(M+i)*s)/2,re=F-(t.height-(B+i)*n)/2,ce=(L-ne)/250,Oe=(C-re)/250,Je=Math.sqrt(Math.pow(Math.abs(ce),2)+Math.pow(Math.abs(Oe),2)),Z=ue.clamp(Math.abs(Je),0,2),ye=0,ke=Math.cos(ye)*(Z+z),Ae=Math.sin(ye)*(Z+z);k.setTransform(ke,Ae,-Ae,ke,Math.floor(ae+L),Math.floor(q+C)),k.beginPath(),k.rect(Math.floor(-M/2),Math.floor(-B/2),M,B),k.fill()}),bt({useOffscreen:c,offscreen:y,ctx:d}))},I=Me.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(x,{scale:.3},{duration:1e3});I.play();let P=({x:O,y:D})=>{w.goTo({mouseX:O-f,mouseY:D-h}).catch(()=>{})},A=u.useMouseMove(({client:O})=>{let{x:D,y:k}=O;P({x:D,y:k})}),$=u.useTouchMove(({client:O})=>{let{x:D,y:k}=O;P({x:D,y:k})}),N=()=>{E(),p&&u.useNextFrame(()=>N())};u.useFrame(()=>{N()});let R=ee.watch("navigationIsOpen",O=>{if(O){I?.stop(),p=!1;return}setTimeout(async()=>{p=!0,m.getActiveRoute().route===v.route&&(I?.play(),u.useFrame(()=>N()))},500)});return()=>{x.destroy(),I.destroy(),w.destroy(),A(),$(),R(),x=null,I=null,w=null,d=null,y=null,T=null,S=[],p=!1,_=null,l=null}};var S_=({onMount:t,getState:e,setRef:r,getRef:o,bindEffect:n,getProxi:s})=>{let i=s(),a=()=>{};return t(()=>{let{canvas:c}=o();u.useFrame(()=>{u.useNextTick(()=>{a(),a=dp({canvas:c,...e()})})});let l=u.useResize(()=>{a(),a=dp({canvas:c,...e()})});return u.useFrame(()=>{"isMounted"in i&&(i.isMounted=!0)}),()=>{l(),a(),a=null}}),g`
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
    `};var x_=m.createComponent({tag:"animatedpattern-n1",component:S_,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1}});m.useComponent([x_]);var C_=async()=>{let{data:t}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"#animatedPatternN0",nextRoute:"#scrollerN0",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <animatedpattern-n1
            ${m.staticProps({background:t})}
        ></animatedpattern-n1>
    </div>`};var E_=({canvas:t,disableOffcanvas:e})=>{let o=window.innerHeight/30,n=window.innerHeight/60,s=[14,5],i=.1,a=0,c=10,l=3,p=5e3,h=1,{useOffscreen:f,context:d}=ft({disableOffcanvas:e}),v=!0,y=t.getContext(d,{alpha:!0}),{top:T,left:S}=be(t),_=m.getActiveRoute(),{offscreen:w,offScreenCtx:x}=gt({useOffscreen:f,canvas:t}),E=!0;t.width=t.clientWidth,t.height=t.clientHeight;let I=[...Array.from({length:19}).keys()].map((V,F)=>{let z=F>=9.5?9.5+(9.5-F):F,te=s.includes(F)?1:z*i;return{width:z*o,height:z*n,x:0,y:0,hasFill:s.includes(F),opacity:te,radius:a,rotate:0,relativeIndex:z,scale:1}}),P=U.createTimeTween({data:{rotate:0},stagger:{each:c,from:"center"},ease:"easeLinear",relative:!0}),A=I.map(V=>P.subscribeCache(({rotate:F})=>{V.rotate=F})),$=U.createSpring({data:{x:0,y:0},stagger:{each:l,from:"end"}});I.forEach(V=>{$.subscribeCache(({x:F,y:z})=>{V.x=F,V.y=z,V.scale=h})});let N=()=>{if(!y)return;let V=t.width,F=t.height,z=t.width/2,te=t.height/2,ae=I.length,q=f?x:y;q&&(f&&w?(w.width=V,w.height=F):q.reset(),I.forEach(({width:ne,height:re,x:ce,y:Oe,rotate:Je,hasFill:Z,opacity:ye,scale:ke},Ae)=>{let Ye=ae-Ae,$e=Math.max(1,ke/4),Or=1,$t=Math.PI/180*Je,Y=Math.cos($t)*Or,$r=Math.sin($t)*Or;q.setTransform(Y,$r,-$r,Y,z+ce+Ye*ce/20,te+Oe+Ye*Oe/20);let Ve=Math.round(-ne/2)*$e,xe=Math.round(-re/2)*$e;E?(q.beginPath(),q.roundRect(Ve,xe,ne*$e,re*$e,130)):(q.beginPath(),q.rect(Ve,xe,ne*$e,re*$e)),Z?q.fillStyle="#000":(q.fillStyle=`rgba(238, 238, 238, ${ye})`,q.strokeStyle=`rgba(0, 0, 0, ${ye})`,q.stroke()),q.fill()}),bt({useOffscreen:f,offscreen:w,ctx:y}))},R=Me.createAsyncTimeline({repeat:-1,yoyo:!1,autoSet:!1});R.goTo(P,{rotate:360},{duration:p}),R.play();let O=()=>{N(),v&&u.useNextFrame(()=>O())};u.useFrame(()=>O());let D=u.useResize(()=>{t.width=t.clientWidth,t.height=t.clientHeight,T=be(t).top,S=be(t).left,N()}),k=ue.useVelocity(({speed:V})=>{h=V}),L=({x:V,y:F})=>{let z=window.innerWidth,te=window.innerHeight,ae=V-t.width/2-S,q=F-t.height/2-T;$.goTo({x:ue.clamp(ae,-z/2+400+S,z/2-400-S),y:ue.clamp(q,-te/2+200+T,te/2-200-T)}).catch(()=>{})},C=u.useMouseMove(({client:V})=>{let{x:F,y:z}=V;L({x:F,y:z})}),M=u.useTouchMove(({client:V})=>{let{x:F,y:z}=V;L({x:F,y:z})}),B=ee.watch("navigationIsOpen",V=>{if(V){v=!1,R?.pause(),P?.pause(),$?.pause();return}setTimeout(()=>{v=!0,m.getActiveRoute().route===_.route&&(R?.resume(),P?.resume(),$?.resume(),u.useFrame(()=>O()))},500)});return{destroy:()=>{P.destroy(),$.destroy(),R.destroy(),D(),C(),M(),k(),B(),A.forEach(V=>{V()}),A.length=0,P=null,$=null,R=null,y=null,w=null,x=null,v=!1,I=null,d=null},stopBlackOne:()=>{s.forEach(V=>{A[V]?.()})}}};function ik({delegateEvents:t,bindEffect:e,bindObject:r,proxi:o}){return g` <li class="c-canvas__controls__item">
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
    </li>`}var w_=({onMount:t,getRef:e,setRef:r,bindEffect:o,getProxi:n,delegateEvents:s,bindObject:i})=>{let a=n();return t(()=>{let{canvas:c}=e(),l={destroy:()=>{},stopBlackOne:()=>{}};return u.useFrame(()=>{u.useNextTick(()=>{a.destroy(),l=E_({canvas:c,disableOffcanvas:a.disableOffcanvas}),a.destroy=l.destroy,a.stopBlackOne=l.stopBlackOne})}),u.useFrame(()=>{"isMounted"in a&&(a.isMounted=!0)}),()=>{a.destroy(),a.destroy=()=>{},a.stopBlackOne=()=>{},l=null}}),g`
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
    `};var I_=m.createComponent({tag:"caterpillar-n1",component:w_,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1,controlsActive:()=>({value:!1,type:Boolean}),destroy:()=>({value:()=>{},type:Function}),stopBlackOne:()=>({value:()=>{},type:Function}),blackOneIsStopped:()=>({value:!1,type:Boolean})}});m.useComponent([I_]);var M_=async()=>{let{data:t}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"",nextRoute:"#scrollerN1",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <caterpillar-n1 ${m.staticProps({background:t})}>
        </caterpillar-n1>
    </div>`};var fp=({value:t,direction:e,isForced:r})=>{r||console.log(`current: ${t}, direction: ${e}`)},k_=({canvas:t,proxi:e})=>{let o=window.innerHeight/13,n=window.innerHeight/13,s=[2],i=.03,a=500,c=400,l=10,p=l/2/Math.PI,{useOffscreen:h,context:f}=ft({disableOffcanvas:e.disableOffcanvas}),d=!0,v=t.getContext(f,{alpha:!0}),y=m.getActiveRoute(),{offscreen:T,offScreenCtx:S}=gt({useOffscreen:h,canvas:t}),_=!0,w=[...Array.from({length:20}).keys()].map((N,R)=>{let O=R>=10?10+(10-R):R,D=o+o/3*O,k=n+n/3*O,L=s.includes(R)?1:(20-R)*i;return{width:D,height:k,x:0,y:0,hasFill:s.includes(R),opacity:L,rotate:0}});t.width=t.clientWidth,t.height=t.clientHeight;let x=U.createSequencer({stagger:{each:7},data:{x:l/4,rotate:0},duration:l}).goTo({x:l+l/4},{start:0,end:l,ease:"easeLinear"}).goTo({rotate:()=>-e.rotation},{start:0,end:5,ease:"easeInOutBack"}).goTo({rotate:0},{start:5,end:l,ease:"easeInOutBack"}).label("mylabel",2).add(({isForced:N,direction:R})=>{fp({isForced:N,direction:R,value:1})},1).add(({isForced:N,direction:R})=>{fp({isForced:N,direction:R,value:5})},5).add(({isForced:N,direction:R})=>{fp({isForced:N,direction:R,value:9})},9);w.forEach(N=>{x.subscribeCache(({x:R,rotate:O})=>{let D=R/p,k=2/(3-Math.cos(2*D)),L=k*Math.cos(D)*a,C=k*Math.sin(2*D)/2*c;N.x=L,N.y=C,N.rotate=O})});let E=Me.createSyncTimeline({repeat:-1,yoyo:!1,duration:4e3}).add(x);E.onLoopEnd(({loop:N,direction:R})=>{console.log(`loop end: ${N} , ${R}`)});let I=()=>{if(!v)return;let N=t.width,R=t.height,O=t.width/2,D=t.height/2,k=h?S:v;k&&(h&&T?(T.width=N,T.height=R):k.reset(),w.forEach(({width:L,height:C,x:M,y:B,rotate:V,hasFill:F,opacity:z})=>{let ae=Math.PI/180*V,q=Math.cos(ae)*1,ne=Math.sin(ae)*1;k.setTransform(q,ne,-ne,q,O+M,D+B);let re=Math.round(-L/2),ce=Math.round(-C/2);_?(k.beginPath(),k.roundRect(re,ce,L,C,[40,40])):(k.beginPath(),k.rect(re,ce,L,C)),F?k.fillStyle="#000000":(k.strokeStyle=`rgba(0, 0, 0, ${z})`,k.fillStyle="rgba(238, 238, 238, 0)",k.stroke()),k.fill()}),bt({useOffscreen:h,offscreen:T,ctx:v}))},P=()=>{I(),d&&u.useNextFrame(()=>P())};u.useFrame(()=>P()),E.play();let A=u.useResize(()=>{t.width=t.clientWidth,t.height=t.clientHeight,I()}),$=ee.watch("navigationIsOpen",N=>{if(N){d=!1,E?.pause();return}setTimeout(()=>{d=!0,m.getActiveRoute().route===y.route&&(E?.resume(),u.useFrame(()=>P()))},500)});return{destroy:()=>{d=!1,A(),$(),x.destroy(),x=null,E.destroy(),E=null,v=null,T=null,S=null,w=null,f=null},play:()=>{E.play()},playReverse:()=>{E.playReverse()},playUseCurrent:()=>{E.play({useCurrent:!0})},playReverseUseCurrent:()=>{E.playReverse({useCurrent:!0})},playFromLabel:()=>{E.playFrom("mylabel")},plaFromLabelReverse:()=>{E.playFromReverse("mylabel")},stop:()=>E.stop(),pause:()=>E.pause(),resume:()=>E.resume(),reverse:()=>E.reverse()}};function ak({buttons:t}){return Object.entries(t).map(([e,r])=>{let{label:o}=r;return g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn ${e}"
                >
                    ${o}
                </button>
            </li>`}).join("")}var R_=({onMount:t,setRef:e,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s,bindObject:i})=>{let a=n(),c=u.getUnivoqueId();return t(({element:l})=>{let{canvas:p}=r(),h=()=>{},f=k_({canvas:p,proxi:a});return u.useFrame(()=>{u.useNextTick(()=>{({destroy:h}=f)})}),Object.entries(a.buttons).forEach(([d,v])=>{let{method:y}=v;l.querySelector(`.${d}`)?.addEventListener("click",()=>f?.[y]())}),u.useFrame(()=>{"isMounted"in a&&(a.isMounted=!0)}),()=>{h(),h=null}}),g`
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
                    <canvas ${e("canvas")}></canvas>
                </div>
            </div>
        </div>
    `};var ck={"js-CN2-play":{label:"play",method:"play"},"js-CN2-playReverse":{label:"play reverse",method:"playReverse"},"js-CN2-play-current":{label:"go forward if is backward",method:"playUseCurrent"},"js-CN2-playReverse-current":{label:"go backward if is forward",method:"playReverseUseCurrent"},"js-CN2-play-label":{label:"play from label",method:"playFromLabel"},"js-CN2-playReverse-label":{label:"play from label reverse",method:"plaFromLabelReverse"},"js-CN2-reverse":{label:"reverse",method:"reverse"},"js-CN2-stop":{label:"stop",method:"stop"},"js-CN2-pause":{label:"pause",method:"pause"},"js-CN2-resume":{label:"resume",method:"resume"}},N_=m.createComponent({tag:"caterpillar-n2",component:R_,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1,rotation:()=>({value:166,type:Number}),rotationlabel:()=>({value:166,type:Number}),controlsActive:()=>({value:!1,type:Boolean}),buttons:()=>({value:ck,type:"Any"})}});m.useComponent([N_]);var P_=async()=>{let{data:t}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"#scrollerN1",nextRoute:"#async-timeline",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <caterpillar-n2
            ${m.staticProps({background:t})}
        ></caterpillar-n2>
    </div>`};var $c=()=>{m.useMethodByName(pi).update(!0)},Lc=()=>{m.useMethodByName(pi).update(!1)};var A_=({canvas:t,canvasScroller:e,stagger:r,disableOffcanvas:o})=>{let n=window.innerWidth/20,s=window.innerHeight/20,i=1,a=10,c=10,l=!1,p=[36,37,38,39,40,47,51,58,62,69,73,80,81,82,83,84],{useOffscreen:h,context:f}=ft({disableOffcanvas:o}),d=!0,v=U.createMasterSequencer(),y=t.getContext(f,{alpha:!0}),T=m.getActiveRoute(),{offscreen:S,offScreenCtx:_}=gt({useOffscreen:h,canvas:t}),w=h?_:y,x=fo(w);w=null,t.width=t.clientWidth,t.height=t.clientHeight;let E=go({canvas:t,numberOfRow:a,numberOfColumn:c,cellWidth:n,cellHeight:s,gutter:i}).items,I=l?E.map((D,k)=>({...D,scale:1,rotate:0,hasFill:p.includes(k)})).toSorted(D=>D.hasFill?-1:1):E.map((D,k)=>({...D,scale:1,rotate:0,hasFill:p.includes(k)})),P=U.createStaggers({items:I,stagger:r}),A=P.map(({item:D,start:k,end:L})=>{let C=U.createSequencer({data:{scale:1}}).goTo({scale:0},{start:k,end:L,ease:"easeInOutQuad"}),M=C.subscribe(({scale:B})=>{D.scale=B});return v.add(C),{sequencer:C,unsubscribe:M}}),$=()=>{if(!y)return;let D=t.width,k=t.height,L=h?_:y;L&&(h&&S?(S.width=D,S.height=k):L.reset(),I.forEach(({x:C,y:M,width:B,height:V,rotate:F,scale:z,hasFill:te,offsetXCenter:ae,offsetYCenter:q})=>{let ne=Math.PI/180*F,re=Math.cos(ne)*z,ce=Math.sin(ne)*z;L.setTransform(re,ce,-ce,re,Math.floor(ae+C),Math.floor(q+M));let Oe=Math.round(-B/2),Je=Math.round(-V/2);x?(L.beginPath(),L.roundRect(Oe,Je,B,V,150)):(L.beginPath(),L.rect(Oe,Je,B,V)),te?(L.fillStyle="#000000",L.fill()):(L.strokeStyle="#000",L.fillStyle="rgb(238, 238, 238)",L.fill(),x||(L.strokeStyle="#ccc"))}),bt({useOffscreen:h,offscreen:S,ctx:y}))},N=Ke.createScrollTrigger({trigger:e,propierties:"tween",tween:v,dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>le(e)},reverse:!1,ease:!0,easeType:"lerp"});N.init();let R=()=>{$(),d&&u.useNextFrame(()=>R())};u.useFrame(()=>{R()});let O=ee.watch("navigationIsOpen",D=>{if(D){d=!1;return}setTimeout(async()=>{d=!0,m.getActiveRoute().route===T.route&&u.useFrame(()=>R())},500)});return()=>{O(),A.forEach(({sequencer:D,unsubscribe:k})=>{D.destroy(),k()}),A=[],v.destroy(),v=null,P=[],N.destroy(),N=null,y=null,S=null,_=null,E=[],d=!1,I=null,f=null}};var gp=[{label:"random",params:{stagger:{type:"equal",each:6,from:"random"}}},{label:"column",params:{stagger:{type:"equal",each:7,from:"center",grid:{col:11,row:10,direction:"col"}}}},{label:"row",params:{stagger:{type:"equal",each:3,from:"start",grid:{col:11,row:10,direction:"row"}}}},{label:"sequential",params:{stagger:{type:"equal",each:2,from:"end"}}}];var bp=({proxi:t,getRef:e,resetScroll:r=!0})=>{r&&window.scrollTo(0,0),t.destroy(),t.destroy=A_({canvas:e().canvas,canvasScroller:e().canvasScroller,...gp[t.currentParamsId].params,disableOffcanvas:!0})};function lk({delegateEvents:t,bindEffect:e,proxi:r,getRef:o}){return gp.map(({label:n},s)=>g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn"
                    ${t({click:()=>{r.currentParamsId=s,bp({proxi:r,getRef:o})}})}
                    ${e({toggleClass:{active:()=>r.currentParamsId===s}})}
                >
                    ${n}
                </button>
            </li>`).join("")}var O_=({onMount:t,setRef:e,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s})=>{let i=n();return t(()=>{$c(),u.useFrame(()=>{u.useNextTick(()=>{bp({proxi:i,getRef:r})})});let a=u.useResize(()=>{bp({proxi:i,getRef:r,resetScroll:!1})});return u.useFrame(()=>{"isMounted"in i&&(i.isMounted=!0)}),()=>{i.destroy(),i.destroy=()=>{},Lc(),a()}}),g`
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
                    <canvas ${e("canvas")}></canvas>
                </div>
            </div>
            <div class="c-canvas-scroller" ${e("canvasScroller")}></div>
        </div>
    `};var $_=m.createComponent({tag:"scroller-n0",component:O_,props:{background:()=>({value:"",type:String})},state:{isMounted:()=>({value:!1,type:Boolean}),controlsActive:()=>({value:!1,type:Boolean}),destroy:()=>({value:()=>{},type:Function}),currentParamsId:()=>({value:0,type:Number})}});m.useComponent([$_]);var L_=async()=>{let{data:t}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"#animatedPatternN1",nextRoute:"",backRoute:"#canvas-overview"}),g`<div>
        <scroller-n0
            ${m.staticProps({background:t})}
        ></scroller-n0>
    </div>`};function uk({width:t,relativeIndex:e,amountOfPath:r}){return Math.sqrt(Math.pow(t*e,2)-Math.pow(t*e/r*e,2))*2}function pk({height:t,relativeIndex:e,amountOfPath:r}){return Math.sqrt(Math.pow(t*e,2)-Math.pow(t*e/r*e,2))*2}var D_=({canvas:t,canvasScroller:e,disableOffcanvas:r,proxi:o})=>{let l=new Set([14,5]),{useOffscreen:p,context:h}=ft({disableOffcanvas:r}),f=!0,d=t.getContext(h,{alpha:!0}),v=m.getActiveRoute(),{offscreen:y,offScreenCtx:T}=gt({useOffscreen:p,canvas:t}),S=p?T:d,_=fo(S);S=null,t.width=t.clientWidth,t.height=t.clientHeight;let w=[...Array.from({length:17}).keys()].map((N,R)=>{let O=R>=8.5?8.5+(8.5-R):R;return{width:Math.floor(uk({width:15,relativeIndex:O,amountOfPath:17})),height:Math.floor(pk({height:30,relativeIndex:O,amountOfPath:17})),opacity:O*.09,hasFill:l.has(R),rotate:0,relativeIndex:O,index:R}}),x=U.createScrollerTween({from:{rotate:0},to:{rotate:()=>o.rotation},stagger:{each:2,from:"center"}});w.forEach(N=>{x.subscribeCache(({rotate:R})=>{N.rotate=R})});let E=()=>{if(!d)return;let N=t.width,R=t.height,O=t.width/2,D=t.height/2,k=p?T:d;k&&(p&&y?(y.width=N,y.height=R):k.reset(),w.forEach(({width:L,height:C,opacity:M,rotate:B,index:V,hasFill:F})=>{let z=w.length/2-V,te=1,ae=Math.PI/180*(B-33),q=Math.cos(ae)*te,ne=Math.sin(ae)*te;k.setTransform(q,ne,-ne,q,O,D+z*19),_?(k.beginPath(),k.roundRect(-L/2,-C/2+z*19,L,C,150)):(k.beginPath(),k.rect(Math.round(-L/2),Math.round(-C/2),L,C)),F?k.fillStyle="#000":(k.fillStyle=`rgba(238, 238, 238, ${M})`,k.strokeStyle=`rgba(0, 0, 0, ${M})`,k.stroke()),k.fill()}),bt({useOffscreen:p,offscreen:y,ctx:d}))},I=Ke.createScrollTrigger({trigger:e,propierties:"tween",tween:x,dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>le(e)},ease:!0,easeType:"spring"});I.init();let P=()=>{E(),f&&u.useNextFrame(()=>P())};u.useFrame(()=>{P()});let A=u.useResize(()=>{t.width=t.clientWidth,t.height=t.clientHeight,u.useFrame(()=>{E()})}),$=ee.watch("navigationIsOpen",N=>{if(N){f=!1;return}setTimeout(()=>{f=!0,m.getActiveRoute().route===v.route&&u.useFrame(()=>P())},500)});return()=>{x.destroy(),A(),$(),x.destroy(),x=null,I.destroy(),I=null,d=null,y=null,T=null,x=null,f=!1,w=null,h=null}};function mk({proxi:t,delegateEvents:e,bindObject:r}){let o=u.getUnivoqueId();return g` <li class="c-canvas__controls__item">
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
    </li>`}var F_=({onMount:t,setRef:e,getRef:r,bindEffect:o,getProxi:n,delegateEvents:s,bindObject:i})=>{let a=n();return t(()=>{let c=()=>{};$c();let{canvas:l,canvasScroller:p}=r();return u.useFrame(()=>{u.useNextTick(()=>{c(),c=D_({canvas:l,canvasScroller:p,disableOffcanvas:a.disableOffcanvas,proxi:a})})}),u.useFrame(()=>{"isMounted"in a&&(a.isMounted=!0)}),()=>{c(),Lc(),c=null}}),g`
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
                    <canvas ${e("canvas")}></canvas>
                </div>
            </div>
            <div class="c-canvas-scroller" ${e("canvasScroller")}></div>
        </div>
    `};var B_=m.createComponent({tag:"scroller-n1",component:F_,props:{background:()=>({value:"",type:String}),disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1,controlsActive:()=>({value:!1,type:Boolean}),rotation:()=>({value:720,type:Number}),rotationlabel:()=>({value:720,type:Number})}});m.useComponent([B_]);var V_=async()=>{let{data:t}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"#caterpillarN1",nextRoute:"#caterpillarN2",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <scroller-n1 ${m.staticProps({background:t})}></scroller-n1>
    </div>`};var W_=({getProxi:t,bindEffect:e})=>{let r=t();return g`
        <button
            type="button"
            class="c-dynamic-list-button"
            ${e({observe:"active",toggleClass:{active:()=>r.active}})}
        >
            ${r.label}
        </button>
    `};var Yn=m.createComponent({tag:"dynamic-list-button",component:W_,props:{label:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean})}});var Dc=[{key:"a",label:"A"},{key:"b",label:"B"},{key:"c",label:"C"},{key:"d",label:"D"}],j_=[{key:"f",label:"F"},{key:"b",label:"B"},{key:"e",label:"E"},{key:"c",label:"C"},{key:"b",label:"B"},{key:"a",label:"A"},{key:"g",label:"G"},{key:"h",label:"H"},{key:"d",label:"D"},{key:"b",label:"B"}],z_=[{key:"m",label:"M"},{key:"q",label:"Q"},{key:"z",label:"Z"},{key:"i",label:"I"},{key:"b",label:"B"},{key:"e",label:"E"},{key:"n",label:"N"},{key:"a",label:"A"},{key:"g",label:"G"},{key:"h",label:"H"},{key:"l",label:"L"},{key:"j",label:"J"},{key:"d",label:"D"}],H_=[{key:"h",label:"H"},{key:"f",label:"F"},{key:"a",label:"A"},{key:"d",label:"D"}],Xn=[[{key:4}],[{key:20},{key:10},{key:10},{key:6},{key:10},{key:10},{key:30}],[{key:3},{key:20},{key:5},{key:20},{key:5},{key:5},{key:5},{key:5},{key:60},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:5},{key:10},{key:5}]];var hk=[{buttonLabel:"sample1",data:j_},{buttonLabel:"salmple2",data:z_},{buttonLabel:"sample3",data:H_},{buttonLabel:"Initial",data:Dc}],dk=[{label:"repeater with key",key:"key",clean:!1},{label:"repeater without key",key:"",clean:!1},{label:"repeater clear",key:"",clean:!0}];function fk({staticProps:t,delegateEvents:e,bindProps:r,proxi:o}){return hk.map((n,s)=>{let{data:i,buttonLabel:a}=n;return g`
                <dynamic-list-button
                    class="c-dynamic-list__top__button"
                    ${t({label:a})}
                    ${e({click:async()=>{o.data=i,o.activeSample=s}})}
                    ${r(()=>({active:s===o.activeSample}))}
                ></dynamic-list-button>
            `}).join("")}function gk({bindProps:t,staticProps:e,proxi:r}){return dk.map((o,n)=>{let{key:s,clean:i,label:a}=o;return g`
                <dynamic-list-repeater
                    ${e({listId:n,key:s,clean:i,label:a})}
                    ${t(()=>({data:r.data,counter:r.counter}))}
                ></dynamic-list-repeater>
            `}).join("")}var U_=({updateState:t,staticProps:e,bindProps:r,delegateEvents:o,invalidate:n,bindText:s,getProxi:i})=>{let a=i();return g`
        <div class="c-dynamic-list">
            <div class="c-dynamic-list__header">
                <div class="c-dynamic-list__top">
                    ${fk({delegateEvents:o,staticProps:e,bindProps:r,proxi:a})}
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
                    ${gk({bindProps:r,staticProps:e,proxi:a})}
                </div>
            </div>
        </div>
    `};function bk({staticProps:t,bindProps:e,delegateEvents:r,current:o,proxi:n}){return g`
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
    `}var G_=({staticProps:t,bindProps:e,delegateEvents:r,repeat:o,getProxi:n})=>{let s=n(),i=s.key.length>0?s.key:void 0;return g`
        <div class="c-dynamic-list-repeater">
            <h4 class="c-dynamic-list-repeater__title">${s.label}</h4>
            <div class="c-dynamic-list-repeater__list">
                ${o({observe:()=>s.data,clean:s.clean,key:i,afterUpdate:()=>{console.log("repeater updated")},render:({current:a})=>bk({staticProps:t,bindProps:e,delegateEvents:r,current:a,proxi:s})})}
            </div>
        </div>
    `};function vk(t){return[...Array.from({length:t}).keys()].map(e=>e+1)}var yk=({staticProps:t,delegateEvents:e,proxi:r})=>g`
        ${vk(r.counter).map(o=>g`
                    <div class="validate-test-wrapper">
                        <dynamic-list-card-inner
                            ${t({key:`${o}`})}
                            ${e({click:()=>{console.log("invalidate inside reepater click")}})}
                        >
                        </dynamic-list-card-inner>
                    </div>
                `).join("")}
    `,q_=({onMount:t,key:e,staticProps:r,bindProps:o,id:n,delegateEvents:s,invalidate:i,repeat:a,bindText:c,bindEffect:l,getProxi:p,computed:h})=>{let f=p(),d=0;h(()=>f.innerDataUnivoque,()=>f.innerData.filter((y,T,S)=>S.map(({key:_})=>_).indexOf(y.key)===T)),t(async()=>((async()=>(await m.tick(),"isMounted"in f&&(f.isMounted=!0)))(),()=>{}));let v=f.isFull?"is-full":"";return g`
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
    `};var J_=({bindText:t})=>g`<span class="dynamic-list-card-inner">
        <span>${t`${"key"}`}</span>
    </span>`;var Fc=m.createComponent({tag:"dynamic-list-card-inner",component:J_,props:{key:()=>({value:"",type:String})}});var Y_=({getState:t,bindText:e})=>{let{parentListId:r}=t();return g`<div class="dynamic-counter">
        <p class="c-dynamic-counter__title">Nested:</p>
        <p class="c-dynamic-counter__subtitle">(slotted)</p>
        <p class="c-dynamic-counter__list">list index: ${r}</p>
        <span>${e`${"counter"}`}</span>
    </div>`};var X_=m.createComponent({tag:"dynamic-list-counter",component:Y_,props:{parentListId:()=>({value:-1,type:Number}),counter:()=>({value:0,type:Number})}});var K_=()=>g`<div class="c-dynamic-list-empty">
        <p>empty comp</p>
        <mobjs-slot name="empty-slot"></mobjs-slot>
    </div>`;var Q_=m.createComponent({tag:"dynamic-list-empty",component:K_});var Z_=m.createComponent({tag:"dynamic-list-card",component:q_,props:{parentListId:()=>({value:-1,type:Number}),isFull:()=>({value:!1,type:Boolean}),label:()=>({value:"-",type:String}),index:()=>({value:-1,type:Number}),counter:()=>({value:1,type:Number})},state:{innerData:()=>({value:Xn[0],type:Array}),innerDataUnivoque:()=>({value:Xn[0],type:Array}),isSelected:()=>({value:!1,type:Boolean}),isMounted:()=>({value:!1,type:Boolean})},child:[X_,Q_,Fc,Yn]});var eS=({bindText:t})=>g`<div class="c-dynamic-list-slotted-label">
        <p class="content">${t`slotted: ${"label"}`}</p>
    </div>`;var tS=m.createComponent({tag:"dynamic-slotted-label",component:eS,props:{label:()=>({value:"",type:String})}});var rS=m.createComponent({tag:"dynamic-list-repeater",component:G_,props:{data:()=>({value:[],type:Array}),key:()=>({value:"",type:String}),clean:()=>({value:!1,type:Boolean}),listId:()=>({value:-1,type:Number}),counter:()=>({value:-1,type:Number}),label:()=>({value:"",type:String})},child:[Z_,tS]});var oS=m.createComponent({tag:"dynamic-list",component:U_,state:{counter:()=>({value:1,type:Number,validate:t=>t<=10&&t>=0,strict:!0}),data:()=>({value:Dc,type:Array}),activeSample:()=>({value:3,type:Number})},child:[Yn,rS,Fc]});m.useComponent([oS]);var nS=()=>g` <dynamic-list> </dynamic-list> `;var sS=({refs:t})=>{let e=U.createTimeTween({data:{scale:0},duration:3e3,ease:"easeOutBack",stagger:{each:8,from:"end"}}),r=U.createTimeTween({data:{scale:1},duration:6e3,ease:"easeInOutQuad",stagger:{each:12,from:"end"}});t.forEach(i=>{e.subscribeCache(({scale:a})=>{i.style.scale=`${a}`}),r.subscribeCache(({scale:a})=>{i.style.scale=`${a}`})});let o=Me.createAsyncTimeline({repeat:1,autoSet:!1}).goTo(e,{scale:1}),n=Me.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1}).goTo(r,{scale:1.1}),s=ee.watch("navigationIsOpen",i=>{if(i){o.isActive()&&o.pause(),n.isActive()&&n.pause();return}o.isActive()&&o.resume(),n.isActive()&&n.resume()});return{playIntro:()=>o?.play(),playSvg:()=>{n?.play()},destroy:()=>{s(),e.destroy(),e=null,o.destroy(),o=null,r.destroy(),r=null,n.destroy(),n=null}}};var Tk=async({playIntro:t,playSvg:e})=>{await t(),e()},iS=({onMount:t,getProxi:e})=>{let r=e(),{svg:o}=r;return t(({element:n})=>{let s=[...n.querySelectorAll("svg")],{destroy:i,playIntro:a,playSvg:c}=sS({refs:s});return setTimeout(()=>{Tk({playIntro:a,playSvg:c})},500),()=>{i()}}),g`<div class="l-index">
        <div class="l-index__logo">
            ${o.map(n=>g`${n}`).join("")}
        </div>
    </div>`};var aS=m.createComponent({tag:"home-component",component:iS,props:{svg:()=>({value:[],type:Array})},state:{isMounted:()=>({value:!1,type:Boolean})}});var bo=({svg:t,id:e})=>{let r=document.createRange().createContextualFragment(t),o=r.querySelectorAll('[type="layer"]'),n=r.querySelectorAll('[type="delete"]');return[...o].forEach(i=>{i.id!==e&&i.remove()}),[...n].forEach(i=>{i.remove()}),By(r)};m.useComponent([aS]);var cS=async()=>{let{data:t}=await oe({source:"./asset/svg/ms_nord_type.svg?v=1.4"}),{data:e}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"}),[r,o,n,s,i,a,c,l,p,h,f]=["due","tre","quattro","cinque","sei","sette","otto","nove","dieci","undici","dodici"].map(d=>bo({svg:t,id:d}));return g`
        <div>
            <div class="background-shape">${e}</div>
            <home-component
                ${m.staticProps({svg:[r,o,n,s,i,a,c,l,p,h,f]})}
            ></home-component>
        </div>
    `};var lS=[{state:"level1",maxItem:10,ref:"level1_counter",label_plus:"level1 +",label_minus:"level1 -"},{state:"level2",maxItem:10,ref:"level2_counter",label_plus:"level2 +",label_minus:"level2 -"},{state:"level3",maxItem:6,ref:"level3_counter",label_plus:"level3 +",label_minus:"level3 -"}];function _k(t){return Math.floor(Math.random()*t)}var Bc=({delegateEvents:t,updateState:e,invalidate:r,proxi:o})=>g`
        ${lS.map(n=>g` <div class="matrioska__head__item">
                    <dynamic-list-button
                        class="matrioska__button"
                        ${t({click:async()=>{e(n.state,s=>s.slice(0,-1))}})}
                        >${n.label_minus}</dynamic-list-button
                    >
                    <dynamic-list-button
                        class="matrioska__button"
                        ${t({click:async()=>{e(n.state,s=>[...s,{key:_k(1e3),value:u.getUnivoqueId()}])}})}
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
    `;var Kn=t=>{m.useMethodByName(t).toggleActive()};var uS=({repeat:t,staticProps:e,bindProps:r,delegateEvents:o,proxi:n})=>g`
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
                                ${o({click:()=>{Kn(i)}})}
                            >
                            </matrioska-item>
                            <matrioska-item
                                class="matrioska-item--3"
                                name="${a}"
                                ${e({level:"level 3"})}
                                ${r(()=>({key:`${s.value.key}`,value:`${s.value.value}`,index:s.index,counter:n.counter}))}
                                ${o({click:()=>{Kn(a)}})}
                            >
                            </matrioska-item>
                        </div>
                    `}})}
        </div>
    `;var pS=({repeat:t,staticProps:e,bindProps:r,delegateEvents:o,proxi:n})=>g`
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
                                ${uS({repeat:t,staticProps:e,delegateEvents:o,bindProps:r,proxi:n})}
                            </matrioska-item>
                        </div>
                    `})}
        </div>
    `;var mS=({delegateEvents:t,updateState:e,repeat:r,staticProps:o,bindProps:n,invalidate:s,getProxi:i})=>{let a=i();return g`<div class="matrioska">
        <div class="matrioska__head">
            ${Bc({delegateEvents:t,updateState:e,invalidate:s,proxi:a})}
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
                                    ${pS({repeat:r,staticProps:o,bindProps:n,delegateEvents:t,proxi:a})}
                                </matrioska-item>
                            </div>
                        `})}
            </div>
        </div>
    </div>`};var hS=({getProxi:t,bindText:e,id:r,bindEffect:o,addMethod:n})=>{let s=t();return n("toggleActive",()=>{s.active=!s.active}),g`<matrioska-item
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
    </matrioska-item>`};var dS=m.createComponent({tag:"matrioska-item",component:hS,props:{level:()=>({value:"",type:String}),key:()=>({value:"",strict:!0,type:String}),index:()=>({value:0,strict:!0,type:Number}),value:()=>({value:"",type:String}),counter:()=>({value:-1,type:Number})},state:{active:()=>({value:!1,type:Boolean})},style:":host { display: block; } "});var fS=({staticProps:t,delegateEvents:e,invalidate:r,bindProps:o,proxi:n})=>g` <div class="matrioska__level matrioska__level--3">
        ${r({observe:"level3",render:()=>n.level3.map((s,i)=>{let a=u.getUnivoqueId(),c=u.getUnivoqueId();return g`
                            <div
                                class="matrioska__item-wrap matrioska__item-wrap--3"
                            >
                                <matrioska-item
                                    class="matrioska-item--3"
                                    name="${a}"
                                    ${t({level:"level 3",value:s.value,index:i,key:`${s.key}`})}
                                    ${o(()=>({counter:n.counter}))}
                                    ${e({click:()=>{Kn(a)}})}
                                >
                                </matrioska-item>
                                <matrioska-item
                                    class="matrioska-item--3"
                                    name="${c}"
                                    ${t({level:"level 3",index:i,value:s.value,key:`${s.key}`})}
                                    ${o(()=>({counter:n.counter}))}
                                    ${e({click:()=>{Kn(c)}})}
                                >
                                </matrioska-item>
                            </div>
                        `}).join("")})}
    </div>`;var gS=({staticProps:t,bindProps:e,delegateEvents:r,invalidate:o,proxi:n})=>g`
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
                                        ${fS({staticProps:t,delegateEvents:r,invalidate:o,bindProps:e,proxi:n})}
                                    </matrioska-item>
                                </div>
                            `).join("")})}
        </div>
    `;var bS=({delegateEvents:t,updateState:e,staticProps:r,bindProps:o,invalidate:n,getProxi:s})=>{let i=s();return g`<div class="matrioska">
        <div class="matrioska__head">
            ${Bc({delegateEvents:t,updateState:e,invalidate:n,proxi:i})}
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
                                            ${gS({staticProps:r,bindProps:o,delegateEvents:t,invalidate:n,proxi:i})}
                                        </matrioska-item>
                                    </div>
                                `).join("")})}
            </div>
        </div>
    </div>`};var Sk=t=>{for(let e=t.length-1;e>0;e--){let r=Math.floor(Math.random()*(e+1));[t[e],t[r]]=[t[r],t[e]]}return t},vS={state:{level1:()=>({value:[{key:1,value:u.getUnivoqueId()}],type:Array,validate:t=>t.length<=10,strict:!0}),level2:()=>({value:[{key:1,value:u.getUnivoqueId()},{key:2,value:u.getUnivoqueId()}],type:Array,validate:t=>t.length<=10,strict:!0}),level3:()=>({value:[{key:1,value:u.getUnivoqueId()},{key:2,value:u.getUnivoqueId()}],type:Array,transform:(t,e)=>t>e?Sk(t):t,validate:t=>t.length<=6,strict:!0}),counter:()=>({value:0,type:Number})},child:[Yn,dS]},yS=m.createComponent({tag:"page-matrioska-repeat",component:mS,...vS}),TS=m.createComponent({tag:"page-matrioska-invalidate",component:bS,...vS});m.useComponent([yS,TS]);var _S=()=>g` <page-matrioska-repeat> </page-matrioska-repeat> `,SS=()=>g` <page-matrioska-invalidate> </page-matrioska-invalidate> `;var vp=0,xk=({indicators:t,proxi:e})=>[...t].map((r,o)=>Ke.createScrollTrigger({item:r,pin:!0,animateAtStart:!1,animatePin:!0,useThrottle:!0,ease:!1,dynamicStart:{position:"right",value:()=>window.innerWidth+vp-je(r)*(o+1)},dynamicEnd:{position:"right",value:()=>{let n=t.length-(o-2);return window.innerWidth/10*9*n}},onEnter:()=>{e.currentIdFromScroll=o},onLeaveBack:()=>{e.currentIdFromScroll=o-1}})),xS=({pins:t})=>{t.forEach(e=>e.refresh())},Ck=({titles:t})=>[...t].map(e=>Ke.createParallax({item:e,propierties:"x",reverse:!0,range:9})),CS=({nav:t})=>{t.classList.add("active"),[...document.querySelectorAll(".js-indicator")].forEach(r=>{r.classList.add("active")})},ES=({nav:t})=>{t.classList.remove("active"),[...document.querySelectorAll(".js-indicator")].forEach(r=>{r.classList.remove("active")})},wS=({indicators:t,titles:e,nav:r,animatePin:o,proxi:n,rootRef:s})=>{let i=xk({indicators:t,proxi:n}),a=Ck({titles:e}),c=document.querySelector(".l-navcontainer__side");vp=je(c)/2;let l=u.useResize(()=>{vp=je(c)/2}),p=new si({root:s,container:".js-container",row:".js-row",column:".js-column",trigger:".js-trigger",shadowClass:".shadowClass",useWillChange:!0,useDrag:!0,useSticky:!o,useThrottle:!0,animateAtStart:!1,ease:!0,easeType:"lerp",addCss:!0,columnHeight:70,columnWidth:100,columnAlign:"center",animatePin:o,breakpoint:"tablet",children:[...i,...a],onEnter:()=>{xS({pins:i}),CS({nav:r})},onEnterBack:()=>{xS({pins:i}),CS({nav:r})},onLeave:()=>{ES({nav:r})},onLeaveBack:()=>{ES({nav:r})}});return p.init(),{destroy:()=>{i.forEach(h=>{h?.destroy()}),i=[],a.forEach(h=>{h?.destroy()}),a=[],p.destroy(),p=null,l()},refresh:()=>p.refresh()}};var Ek=(t,e)=>t===0?1:t===e-1?-1:0,wk=({numOfCol:t,pinIsVisible:e,staticProps:r})=>{let o=e?"":"hidden";return[...Array.from({length:t}).keys()].map((n,s)=>g`
                <horizontal-scroller-section
                    ${r({id:s,pinClass:o})}
                ></horizontal-scroller-section>
            `).join("")},Ik=({numOfCol:t,proxi:e,staticProps:r,delegateEvents:o})=>[...Array.from({length:t}).keys()].map((n,s)=>g`
                <horizontal-scroller-button
                    ${r({id:s})}
                    ${o({click:()=>e.currentId=s})}
                ></horizontal-scroller-button>
            `).join(""),IS=({onMount:t,watch:e,staticProps:r,delegateEvents:o,setRef:n,getRef:s,getProxi:i})=>{let a=i();return t(({element:c})=>{if(ue.mq("max","desktop"))return;let l=10,p=[...c.querySelectorAll(".js-indicator")],h=c.querySelector(".js-nav"),f=[...c.querySelectorAll(".js-title h1")],{destroy:d}=wS({rootRef:s().js_root,indicators:p,titles:f,nav:h,animatePin:a.animatePin,proxi:a});return window.scrollTo(0,0),e(()=>a.currentId,(v,y)=>{let T=c.querySelector(`.shadowClass--section-${v} .shadowClass--in-center`),{top:S}=be(T),_=le(T),w=Number.parseInt(v)===0?window.innerHeight+1:S+_-window.innerHeight,x=Math.max(1,Math.abs(v-y)),E=2e3,P=1+(l-x)/l*.9,A=x/l*E*P;Nr.to(w+Ek(v,l),{duration:A})}),()=>{d()}}),ue.mq("max","desktop")?g`<div><only-desktop></only-desktop></div>`:g`<div class="l-h-scroller">
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
    </div>`};var MS=({getProxi:t})=>{let e=t();return g`
        <li>
            <button
                type="button"
                data-id="${e.id}"
                class="l-h-scroller__nav__btn"
            >
                ${e.id}
            </button>
        </li>
    `};var kS=m.createComponent({tag:"horizontal-scroller-button",component:MS,props:{id:()=>({value:-1,type:Number})}});var RS=({getState:t})=>{let{id:e,pinClass:r}=t();return g`
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
    `};var NS=m.createComponent({tag:"horizontal-scroller-section",component:RS,props:{id:()=>({value:-1,type:Number}),pinClass:()=>({value:"",type:String})}});var PS=m.createComponent({tag:"horizontal-scroller",component:IS,props:{animatePin:()=>({value:!1,type:Boolean})},state:{currentId:()=>({value:0,type:Number,skipEqual:!1}),currentIdFromScroll:()=>({value:0,type:Number})},child:[kS,NS]});m.useComponent([PS]);var AS=async()=>(Se({active:!0,prevRoute:"",nextRoute:"",backRoute:""}),g`<div>
        <horizontal-scroller
            ${m.staticProps({animatePin:!1})}
        ></horizontal-scroller>
    </div>`);var OS=({getState:t})=>{let{fill:e}=t();return g`
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
    `};var $S=m.createComponent({tag:"svg-star",component:OS,props:{fill:()=>({value:"#000000",type:String})}});var Mk=({delegateEvents:t,bindEffect:e,bindObject:r,proxi:o})=>g`<div
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
    </div>`,LS=({bindProps:t,delegateEvents:e,bindObject:r,getProxi:o,bindEffect:n})=>{let s=o();return g`<div>
        <button
            type="button"
            class="c-move3d-page__controls__open"
            ${e({click:()=>{s.controlsActive=!0}})}
        >
            show controls
        </button>
        ${Mk({delegateEvents:e,bindEffect:n,bindObject:r,proxi:s})}
        <move-3d
            ${t(()=>({shape:s.data,xDepth:s.xDepth,yDepth:s.yDepth,xLimit:s.xLimit,yLimit:s.yLimit,factor:s.factor,debug:s.debug,drag:s.drag}))}
        ></move-3d>
    </div>`};var kk=({debug:t,id:e})=>t?g`<span class="c-move3d-item__debug">${e}</span>`:"",yp=({data:t,root:e,childrenId:r,debug:o})=>t.map(({children:n,props:s})=>g`<move-3d-item
                name="${r}"
                ${m.staticProps({root:e,...s})}
            >
                ${kk({debug:o,id:s.id})}
                ${yp({data:n??[],root:!1,childrenId:r,debug:o})}
            </move-3d-item>`).join("");var Tp=({element:t})=>({height:le(t),width:je(t),offSetLeft:be(t).left,offSetTop:be(t).top}),DS=({childrenId:t})=>m.useMethodArrayByName(t).map(r=>o=>r?.move?.(o)),FS=({ratio:t})=>({get3dItemUnit:e=>`min(${e}px, calc((((100vw) * ${e}) / ${t} )))`});var Qn=()=>{},BS=({onMount:t,setRef:e,getRef:r,watch:o,computed:n,invalidate:s,getProxi:i,bindEffect:a})=>{let c=u.getUnivoqueId(),l=i(),p=0,h=0,f=0,d=0,v=0,y=0,T=0,S=0,_=!1,w=!1,x={x:0,y:0},E=0,I=Qn,P=Qn,A=Qn,$=Qn,N=Qn,R=Qn,O=[],D=U.createSpring({data:{delta:0,ax:0,ay:0}}),k=()=>{_=!1},L=()=>{let{vw:F,vh:z}=l.centerToViewoport||l.drag?{vw:window.innerWidth,vh:window.innerHeight}:{vw:h,vh:p},te=x.x,ae=x.y,{xgap:q,ygap:ne}=_?w?(w=!1,{xgap:0,ygap:0}):{xgap:te-v,ygap:ae-T}:{xgap:0,ygap:0};_&&(y+=q,S+=ne);let{xInMotion:re,yInMotion:ce}=_?{xInMotion:y,yInMotion:S}:{xInMotion:te,yInMotion:ae},{ax:Oe,ay:Je}=l.centerToViewoport||l.drag?{ax:-(F/2-re)/l.xDepth,ay:(z/2-ce)/l.yDepth}:{ax:-(F/2-(re-f))/l.xDepth,ay:(z/2-(ce-d))/l.yDepth};v=te,T=ae;let Z=Oe>l.xLimit||Oe<-l.xLimit,ye=Je>l.yLimit||Je<-l.yLimit;Z&&(y-=q),ye&&(S-=ne);let ke=ue.clamp(Oe,-l.xLimit,l.xLimit),Ae=ue.clamp(Je,-l.yLimit,l.yLimit),Ye=Math.hypot(Math.abs(Ae),Math.abs(ke));D.goTo({delta:Ye,ax:ke,ay:Ae}).catch(()=>{}),O.forEach($e=>{$e({delta:Ye,factor:l.factor})})},C=F=>{E!==F&&(x.y-=E,E=F,x.y+=E),L()},M=({page:F})=>F.y>d&&F.y<d+p&&F.x>f&&F.x<f+h,B=({page:F})=>{M({page:F})&&(_=!0,w=!0)},V=()=>{R(),R=l.useScroll?u.useScroll(({scrollY:F})=>{C(F)}):()=>{}};return t(({element:F})=>{let{container:z}=r();l.afterInit(F);let te=D.subscribe(({delta:re,ax:ce,ay:Oe})=>{z.style.transform=`translate3D(0,0,0) rotateY(${ce}deg) rotateX(${Oe}deg)`,"onUpdate"in l&&l.onUpdate({delta:re,deltaX:ce,deltaY:Oe})}),ae=D.onComplete(({ax:re,ay:ce})=>{z.style.transform=`rotateY(${re}deg) rotateX(${ce}deg)`}),q=u.useMouseMove(({page:re})=>{x={x:re.x,y:re.y},L()}),ne=u.useResize(()=>{({height:p,width:h,offSetTop:d,offSetLeft:f}=Tp({element:F}))});return o(()=>l.drag,re=>{if(N(),$(),A(),P(),I(),re){y=window.innerWidth/2,S=window.innerHeight/2,I=u.useTouchStart(({page:ce})=>{B({page:ce})}),P=u.useTouchEnd(()=>{k()}),A=u.useMouseDown(({page:ce})=>{B({page:ce})}),$=u.useMouseUp(()=>{k()}),N=u.useTouchMove(({page:ce})=>{x={x:ce.x,y:ce.y},L()});return}},{immediate:!0}),o(()=>l.useScroll,(re,ce)=>{if(re){V();return}re!==ce&&R()}),n(()=>l.useScroll,()=>!l.drag&&!l.centerToViewoport),u.useNextLoop(()=>{({height:p,width:h,offSetTop:d,offSetLeft:f}=Tp({element:F})),x={x:window.innerWidth/2,y:window.innerHeight/2},L()}),()=>{te(),ae(),ne(),q(),R(),I(),P(),A(),$(),N(),D.destroy(),O=[],D=null,p=null,h=null,f=null,d=null,v=null,y=null,T=null,S=null,_=null,w=null,x=null,E=null}}),g`<div
        class="c-move-3d"
        ${a({toggleClass:{"move3D--drag":()=>l.drag}})}
    >
        <div
            class="c-move-3d__scene"
            ${a({toggleStyle:{perspective:()=>`${l.perspective}px`}})}
        >
            <div class="c-move-3d__container" ${e("container")}>
                ${s({observe:[()=>l.shape,()=>l.debug],afterUpdate:()=>{O=DS({childrenId:c})},render:()=>yp({data:l.shape,root:!0,childrenId:c,debug:l.debug})})}
            </div>
        </div>
    </div>`};var _p=({startRotation:t,range:e,delta:r,limit:o})=>Number.parseFloat((e*r/o-t).toFixed(2)),VS=({rotate:t,anchorPoint:e,baseRotateX:r,baseRotateY:o})=>{if(!t||!e)return{rotateX:0,rotateY:0};switch(t.toUpperCase()){case"X":return(()=>{switch(e.toUpperCase()){case"BOTTOM":return{rotateX:r,rotateY:0};case"TOP":return{rotateX:-r,rotateY:0};default:return{rotateX:0,rotateY:0}}})();case"Y":return(()=>{switch(e.toUpperCase()){case"LEFT":return{rotateX:0,rotateY:o};case"RIGHT":return{rotateX:0,rotateY:-o};default:return{rotateX:0,rotateY:0}}})();case"XY":return(()=>{switch(e.toUpperCase()){case"TOP-LEFT":return{rotateX:-r,rotateY:o};case"TOP-RIGHT":return{rotateX:-r,rotateY:-o};case"BOTTOM-LEFT":return{rotateX:r,rotateY:o};case"BOTTOM-RIGHT":return{rotateX:r,rotateY:-o};default:return{rotateX:0,rotateY:0}}})();default:return{rotateX:0,rotateY:0}}};var Rk=t=>t?.tagName.length===0?"":g`
        <div class="c-move3d-item__component ${t?.className}">
            <${t.tagName} ${m.staticProps(t?.props??{})}>
            </${t.tagName}>
        </div>`,Nk=({delta:t,factor:e,initialRotate:r,depth:o,range:n,rotate:s,anchorPoint:i,lerp:a})=>{let c=Math.round(o*t/e),l={startRotation:r??0,range:n??20,delta:t,limit:e},p=_p(l),h=_p(l),f={rotate:s??"center",anchorPoint:i,baseRotateX:p,baseRotateY:h},{rotateX:d,rotateY:v}=VS(f);a.goTo({depth:c,rotateX:d,rotateY:v}).catch(()=>{})},WS=({getState:t,addMethod:e,onMount:r})=>{let{root:o,anchorPoint:n,animate:s,depth:i,rotate:a,width:c,height:l,offsetX:p,offsetY:h,range:f,initialRotate:d,initialDepth:v,classList:y,component:T}=t(),S=o?"is-root":"is-children",_=`--item-width:${c};`,w=`--item-height:${l};`,x=`--offset-x:${p};`,E=`--offset-y:${h};`,I=U.createLerp({data:{depth:0,rotateX:0,rotateY:0}});return e("move",({delta:P,factor:A})=>{s&&Nk({delta:P,factor:A,initialRotate:d,depth:i,range:f,rotate:a,anchorPoint:n,lerp:I})}),r(({element:P})=>{let A=I.subscribe(({depth:R,rotateX:O,rotateY:D})=>{let k=R+v;P.style.transform=`translate3D(0,0,${k}px) rotateX(${O}deg) rotateY(${D}deg)`}),$=I.onComplete(({depth:R,rotateX:O,rotateY:D})=>{let k=R+v;P.style.transform=`translateZ(${k}px) rotateX(${O}deg) rotateY(${D}deg)`}),N=v;return P.style.transform=`translateZ(${N}px)`,()=>{A(),$(),I.destroy(),I=null}}),g`<div
        class="c-move3d-item ${S} anchor-${n}"
        style="${_}${w}${x}${E}"
    >
        <div class="c-move3d-item__content ${y}"></div>
        ${Rk({tagName:T?.tagName??"",className:T?.className??"",props:T?.props??{}})}
        <mobjs-slot></mobjs-slot>
    </div>`};var jS=m.createComponent({tag:"move-3d-item",component:WS,props:{root:()=>({value:!0,type:Boolean}),depth:()=>({value:0,type:Number}),rotate:()=>({value:"x",type:String}),width:()=>({value:"0px",type:String}),height:()=>({value:"0px",type:String}),offsetX:()=>({value:"0px",type:String}),offsetY:()=>({value:"0px",type:String}),range:()=>({value:20,type:Number}),anchorPoint:()=>({value:"center",type:String}),animate:()=>({value:!0,type:Boolean}),initialRotate:()=>({value:0,type:Number}),initialDepth:()=>({value:0,type:Number}),classList:()=>({value:"",type:String}),component:{tagName:()=>({value:"",type:String}),className:()=>({value:"",type:String}),props:()=>({value:"",type:"any"})}},state:{id:()=>({value:"",type:String})}});var Zn=m.createComponent({tag:"move-3d",component:BS,props:{drag:()=>({value:!1,type:Boolean}),centerToViewoport:()=>({value:!1,type:Boolean}),perspective:()=>({value:700,type:Number}),xDepth:()=>({value:20,type:Number,validate:t=>t>1,strict:!0}),yDepth:()=>({value:20,type:Number,validate:t=>t>1,strict:!0}),xLimit:()=>({value:1e4,type:Number}),yLimit:()=>({value:1e4,type:Number}),factor:()=>({value:45,type:Number,validate:t=>t>1,strict:!0}),shape:()=>({value:[],type:Array}),debug:()=>({value:!1,type:Boolean}),afterInit:()=>({value:()=>{},type:Function}),onUpdate:()=>({value:()=>{},type:Function})},state:{useScroll:()=>({value:!0,type:Boolean})},child:[jS]});var zS=m.createComponent({tag:"move-3d-page",component:LS,props:{data:()=>({value:[],type:Array}),drag:()=>({value:!0,type:Boolean})},state:{xDepth:()=>({value:20,type:Number}),yDepth:()=>({value:20,type:Number}),xLimit:()=>({value:1e3,type:Number}),yLimit:()=>({value:1e3,type:Number}),perspective:()=>({value:700,type:Number}),debug:()=>({value:!1,type:Boolean}),factor:()=>({value:45,type:Number,validate:t=>t>1,strict:!0}),controlsActive:()=>({value:!1,type:Boolean})},child:[Zn]});m.useComponent([zS,$S]);var HS=async({props:t})=>{let{data:e,drag:r,prevRoute:o,nextRoute:n}=t,{data:s}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:o,nextRoute:n,backRoute:"#plugin-overview"}),g` <div>
        <div class="background-shape">${s}</div>
        <move-3d-page
            ${m.staticProps({data:e,drag:r})}
        ></move-3d-page>
    </div>`};var{get3dItemUnit:H}=FS({ratio:1980}),US=[{props:{id:0,depth:0,anchorPoint:"center",classList:"move3d-square",animate:!0,width:H(150),height:H(150)},children:[{props:{id:1,depth:200,width:H(150),height:H(150),rotate:"",anchorPoint:"center",initialDepth:100,classList:"move3d-square has-star pippo",component:{tagName:"svg-star",className:"move3d-square__star",props:{fill:"#f28f3b"}},animate:!0},children:[]},{props:{id:2,depth:200,width:H(80),height:H(80),offsetX:H(40),offsetY:H(40),rotate:"",initialDepth:200,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:3,depth:200,width:H(80),height:H(80),offsetX:H(-10),offsetY:H(80),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:4,depth:200,width:H(80),height:H(80),offsetX:H(80),offsetY:H(80),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:5,depth:200,width:H(80),height:H(80),offsetX:H(-10),offsetY:H(-10),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:6,depth:200,width:H(80),height:H(80),offsetX:H(80),offsetY:H(-10),rotate:"",initialDepth:50,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]},{props:{id:7,depth:100,width:H(150),height:H(150),rotate:"x",range:20,anchorPoint:"bottom",classList:"move3d-square",animate:!0},children:[{props:{id:8,depth:0,width:H(150),height:H(150),rotate:"x",range:30,anchorPoint:"bottom",classList:"move3d-square",animate:!0},children:[]}]},{props:{id:9,depth:100,width:H(150),height:H(150),rotate:"x",range:20,anchorPoint:"top",classList:"move3d-square",animate:!0},children:[{props:{id:10,depth:0,width:H(150),height:H(150),rotate:"x",range:20,anchorPoint:"top",classList:"move3d-square",animate:!0},children:[]}]},{props:{id:11,depth:100,width:H(150),height:H(150),rotate:"y",range:20,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[{props:{id:12,depth:0,width:H(150),height:H(150),rotate:"y",range:30,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[{props:{id:13,depth:0,width:H(150),height:H(150),rotate:"y",range:40,anchorPoint:"left",classList:"move3d-square",animate:!0},children:[]}]}]},{props:{id:13,depth:100,width:H(150),height:H(150),rotate:"y",range:20,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[{props:{id:14,depth:0,width:H(150),height:H(150),rotate:"y",range:30,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[{props:{id:15,depth:0,width:H(150),height:H(150),rotate:"y",range:40,anchorPoint:"right",classList:"move3d-square",animate:!0},children:[]}]}]},{props:{id:16,depth:150,rotate:"xy",width:H(150),height:H(150),offsetX:H(20),offsetY:H(20),range:20,anchorPoint:"bottom-left",classList:"move3d-square",animate:!0},children:[{props:{id:17,depth:100,rotate:"",width:H(150),height:H(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:18,depth:150,rotate:"xy",width:H(150),height:H(150),offsetX:H(20),offsetY:H(20),range:20,anchorPoint:"bottom-right",classList:"move3d-square",animate:!0},children:[{props:{id:19,depth:100,rotate:"",width:H(150),height:H(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:20,depth:150,rotate:"xy",width:H(150),height:H(150),offsetX:H(20),offsetY:H(20),range:20,anchorPoint:"top-left",classList:"move3d-square",animate:!0},children:[{props:{id:21,depth:100,rotate:"",width:H(150),height:H(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]},{props:{id:22,depth:150,rotate:"xy",width:H(150),height:H(150),offsetX:H(20),offsetY:H(20),range:20,anchorPoint:"top-right",classList:"move3d-square",animate:!0},children:[{props:{id:23,depth:100,rotate:"",width:H(150),height:H(150),range:100,anchorPoint:"center",classList:"move3d-square is-small is-white is-center",animate:!0},children:[]}]}]}];var GS={shape1:{prevRoute:"",nextRoute:"#plugin-dragger",data:US,drag:!0}};var qS=({getState:t})=>{let{content:e}=t();return g`${e}`};var es=m.createComponent({tag:"any-component",component:qS,props:{content:()=>({value:"",type:String})}});var JS=({elements:t})=>{let e=180/Math.PI,r=window.innerWidth,o=window.innerHeight,n=0,s=0,i=0,a=U.createSpring({data:{x:0,y:0},stagger:{each:3,from:"start"}});t.forEach(h=>{a.subscribe(({x:f,y:d})=>{h.style.translate=`${f}px ${d}px`})});let c=U.createSpring({data:{rotation:0},stagger:{each:8,from:"start"}});t.forEach(h=>{h&&c.subscribeCache(({rotation:f})=>{h.style.rotate=`${f}deg`})});let l=u.useResize(()=>{r=window.innerWidth,o=window.innerHeight}),p=u.useMouseMove(({client:h})=>{let{x:f,y:d}=h,v=d-n,y=f-s;if(Math.hypot(y,v)>10){n=d,s=f;let _=Math.atan2(v,y)*e+180+90-i;for(;_>180;)_-=360;for(;_<-180;)_+=360;i+=_,c.goTo({rotation:i})}a.goTo({x:f-r/2,y:d-o/2})});return{destroy:()=>{a.destroy(),a=null,c.destroy(),c=null,l(),p(),r=null,o=null,n=null,s=null,i=null}}};var Pk=5,YS=({onMount:t,getRefs:e,setRef:r})=>{let{starOutline:o}=Gn(),n=[...Array.from({length:Pk}).keys()].map(()=>`<span class='mouse-trail__item' ${r("star")}>${o}</span>`).join("");return t(()=>{let{star:s}=e(),{destroy:i}=JS({elements:s});return()=>{i()}}),g`<div class="mouse-trail">${n}</div>`};var Vc=m.createComponent({tag:"mouse-trail",component:YS});var XS=({u0:t,u1:e,o:r,o_b:o,m1:n,m2:s,m3:i,m4:a,b1:c,b1_b:l,b3:p,b4:h,b5:f,sign:d,m1_b:v,m3_b:y,m4_b:T,b1_stone:S,m1_stone:_})=>[{props:{id:0,depth:200,anchorPoint:"center",classList:"",animate:!0},children:[{props:{id:1,depth:-500,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:t}}},children:[]},{props:{id:1,depth:-50,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:e}}},children:[]},{props:{id:2,depth:20,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:r}}},children:[{props:{id:2,depth:21,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:o}}},children:[]},{props:{id:3,depth:100,anchorPoint:"right",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:n}}},children:[{props:{id:3,depth:20,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:v}}},children:[]},{props:{id:6,depth:45,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:a}}},children:[]},{props:{id:6,depth:20,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:T}}},children:[]},{props:{id:6,depth:20,initialDepth:0,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:_}}},children:[]},{props:{id:4,depth:65,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:s}}},children:[]},{props:{id:4,depth:20,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:d}}},children:[]},{props:{id:5,depth:30,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:i}}},children:[]},{props:{id:5,depth:20,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:y}}},children:[]}]},{props:{id:6,depth:100,anchorPoint:"left",initialDepth:0,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:l}}},children:[{props:{id:6,depth:51,anchorPoint:"center",initialDepth:1,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:c}}},children:[]},{props:{id:7,depth:120,anchorPoint:"center",initialDepth:20,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:S}}},children:[]},{props:{id:8,depth:70,initialDepth:10,anchorPoint:"center",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:p}}},children:[]},{props:{id:10,depth:170,anchorPoint:"center",initialDepth:10,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:h}}},children:[]},{props:{id:11,depth:100,anchorPoint:"center",initialDepth:1,classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-mob-01__block",props:{content:f}}},children:[]}]}]}]}];m.useComponent([Zn,es,Vc]);var KS=async()=>{let{data:t}=await oe({source:"./asset/svg/lettering-mob.svg?v=0.9"}),{data:e}=await oe({source:"./asset/svg/rdp.svg?v=1.3"}),[r,o,n,s,i,a,c,l,p,h,f,d,v,y,T,S,_,w,x]=["U0_block","U1_block","O_block","O_b_block","M1_block","M1_b_block","M2_block","M3_block","M3_b_block","M4_block","M4_b_block","B1_block","B1_b_block","B3_block","B4_block","B5_block","sign","Bstone_1_block","Mstone_1_block"].map(E=>bo({svg:t,id:E}));return Se({active:!0,prevRoute:"#rdp-01",nextRoute:"#mob-02",backRoute:"#svg-overview"}),g`<div class="l-mob-01">
        <div class="background-shape">${e}</div>
        <mouse-trail></mouse-trail>
        <move-3d
            ${m.staticProps({shape:XS({u0:r,u1:o,o:n,o_b:s,m1:i,m2:c,m3:l,m4:h,b1:d,b1_b:v,b3:y,b4:T,b5:S,sign:_,m1_b:a,m3_b:p,m4_b:f,b1_stone:w,m1_stone:x}),xDepth:100,yDepth:30,factor:20,xLimit:10,yLimit:20,drag:!0,perspective:1e3})}
        ></move-3d>
    </div>`};var QS=()=>ue.mq("min","desktop"),ZS="#home",Sp=null;m.afterRouteChange(({currentRoute:t})=>{t!=="onlyDesktop"&&(Sp=m.getActiveParams(),ZS=t)});var ex=({onMount:t,getProxi:e,bindEffect:r,watch:o})=>{let n=e();return n.active=QS(),t(()=>{let s=u.useResize(()=>{n.active=QS()});return o(()=>n.active,i=>{i&&m.loadUrl({url:ZS,params:Sp??{}})}),()=>{s(),Sp=null}}),g`
        <a
            href="#home"
            class="l-only-desktop__link"
            ${r({toggleClass:{active:()=>n.active}})}
        >
            home page
        </a>
    `};var tx=m.createComponent({tag:"only-desktop-cta",component:ex,state:{active:()=>({value:!1,type:Boolean,skipEqual:!1})}});m.useComponent([tx]);var rx=async()=>{let{data:t}=await oe({source:"./asset/svg/lettering-mob-only-desktop.svg?v=0.1"}),{data:e}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});return g`
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
    `};var xp=({canvas:t,disableOffcanvas:e})=>{let{useOffscreen:r,context:o}=ft({disableOffcanvas:e}),n=!0,s=t.getContext(o,{alpha:!0}),i=m.getActiveRoute(),{offscreen:a,offScreenCtx:c}=gt({useOffscreen:r,canvas:t}),l=r?c:s,p=fo(l);l=null,t.width=t.clientWidth,t.height=t.clientHeight;let h=10,f=10,d=window.innerWidth/20,v=window.innerHeight/20,T=go({canvas:t,numberOfRow:h,numberOfColumn:f,cellWidth:d,cellHeight:v,gutter:1}).items,S=T.map(L=>({...L,scale:1,rotate:0})),_=({row:L,col:C})=>{let M=(f+1)*L;return S[M+C]},x={..._({row:1,col:1}),scale:1,rotate:0},I={..._({row:4,col:5}),scale:1,rotate:0},P=U.createTimeTween({ease:"easeInOutQuad",stagger:{each:10,from:"edges"},data:{scale:1,rotate:0}}),A=U.createTimeTween({data:x,duration:1e3,ease:"easeInOutBack"}),$=U.createSpring({data:I});S.forEach(L=>{P.subscribeCache(({scale:C,rotate:M})=>{L.rotate=M,L.scale=C})}),A.subscribe(L=>{x=L}),$.subscribe(L=>{I=L});let N=Me.createAsyncTimeline({repeat:-1,autoSet:!1,yoyo:!0});N.goTo(P,{scale:.2,rotate:90},{duration:1e3});let R=Me.createAsyncTimeline({repeat:-1,yoyo:!0,autoSet:!1});R.goTo(A,{x:_({row:1,col:8}).x,rotate:360,scale:2}).createGroup({waitComplete:!1}).goTo(A,{y:_({row:8,col:8}).y,rotate:180}).goTo($,{y:_({row:0,col:8}).y},{delay:500}).closeGroup().label({name:"my-label"}).createGroup({waitComplete:!1}).goTo(A,{x:_({row:8,col:1}).x,rotate:0,scale:1},{ease:"easeOutQuad",duration:500}).goTo($,{rotate:360,scale:2},{delay:0}).closeGroup().createGroup({waitComplete:!1}).goTo(A,{y:_({row:1,col:1}).y,rotate:-180},{duration:1e3}).goTo($,{rotate:0,y:_({row:8,col:8}).y,scale:1},{delay:200}).closeGroup();let O=()=>{if(!s)return;let L=t.width,C=t.height,M=r?c:s;if(M){r&&a?(a.width=L,a.height=C):M.reset(),S.forEach(({x:B,y:V,width:F,height:z,rotate:te,scale:ae,offsetXCenter:q,offsetYCenter:ne},re)=>{if(re===40){let ke=Math.PI/180*x.rotate,Ae=Math.cos(ke)*x.scale,Ye=Math.sin(ke)*x.scale;M.setTransform(Ae,Ye,-Ye,Ae,Math.floor(x.offsetXCenter+x.x),Math.floor(x.offsetYCenter+x.y)),p?(M.beginPath(),M.roundRect(Math.floor(-x.width/2),Math.floor(-x.height/2),Math.floor(x.width),x.height,150)):(M.beginPath(),M.rect(Math.floor(-x.width/2),Math.floor(-x.height/2),Math.floor(x.width),Math.floor(x.height))),M.fillStyle="#000000",M.fill()}let ce=Math.PI/180*te,Oe=Math.cos(ce)*ae,Je=Math.sin(ce)*ae;M.setTransform(Oe,Je,-Je,Oe,Math.floor(q+B),Math.floor(ne+V));let Z=Math.round(-F/2),ye=Math.round(-z/2);p?(M.beginPath(),M.roundRect(Z,ye,F,z,150)):(M.beginPath(),M.rect(Z,ye,F,z)),M.fillStyle="rgba(238, 238, 238, 0.9)",M.fill()});{let B=Math.PI/180*I.rotate,V=Math.cos(B)*I.scale,F=Math.sin(B)*I.scale;M.setTransform(V,F,-F,V,Math.floor(I.offsetXCenter+I.x),Math.floor(I.offsetYCenter+I.y)),p?(M.beginPath(),M.roundRect(Math.floor(-I.width/2),Math.floor(-I.height/2),Math.floor(I.width),Math.floor(I.height),150)):(M.beginPath(),M.rect(Math.floor(-I.width/2),Math.floor(-I.height/2),Math.floor(I.width),Math.floor(I.height))),M.fillStyle="#a86464",M.fill()}bt({useOffscreen:r,offscreen:a,ctx:s})}},D=()=>{O(),n&&u.useNextFrame(()=>D())};u.useFrame(()=>{D()});let k=ee.watch("navigationIsOpen",u.useDebounce(L=>{if(L){R.pause(),N.pause(),n=!1;return}setTimeout(async()=>{m.getActiveRoute().route===i.route&&(R.resume(),N.resume(),n=!0,u.useFrame(()=>D()))},200)},200));return{destroy:()=>{k(),s=null,a=null,c=null,T=[],n=!1,P?.destroy?.(),A?.destroy?.(),$?.destroy?.(),R?.destroy?.(),N?.destroy?.(),S=null,x=null,I=null,o=null,P=null,A=null,$=null,R=null,N=null},play:()=>{R.play(),N.isActive()||N.play()},playReverse:()=>{R.playReverse(),N.isActive()||N.play()},playFromLabel:()=>{R.setTween("my-label",[A,$]).then(()=>{R.playFrom("my-label").then(()=>{console.log("resolve promise playFrom")})}),N.isActive()||N.play()},playFromLabelReverse:()=>{R.setTween("my-label",[A,$]).then(()=>{R.playFromReverse("my-label").then(()=>{console.log("resolve promise playFrom")})}),N.isActive()||N.play()},revertNext:()=>{R.reverseNext()},pause:()=>{R.pause(),N.pause()},resume:()=>{R.resume(),N.resume()},stop:()=>{R.stop(),N.stop()}}};function Ak({buttons:t}){return Object.entries(t).map(([e,r])=>{let{label:o}=r;return g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn ${e}"
                >
                    ${o}
                </button>
            </li>`}).join("")}var ox=({onMount:t,getState:e,setRef:r,getRef:o,bindEffect:n,getProxi:s,delegateEvents:i})=>{let a=s(),c={},l=()=>{};return t(({element:p})=>{let{canvas:h}=o();u.useFrame(()=>{u.useNextTick(()=>{l(),c=xp({canvas:h,...e()}),l=c.destroy,c?.play?.()})});let f=u.useResize(()=>{l(),c=xp({canvas:h,...e()}),l=c.destroy,c?.play?.()});return Object.entries(a.buttons).forEach(([d,v])=>{let{method:y}=v;p.querySelector(`.${d}`)?.addEventListener("click",()=>c?.[y]())}),u.useFrame(()=>{"isMounted"in a&&(a.isMounted=!0)}),()=>{f(),l()}}),g`
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
    `};var Ok={"js-async-timeline-play":{label:"play",method:"play"},"js-async-timeline-playReverse":{label:"play reverse",method:"playReverse"},"js-async-timeline-play-label":{label:"play from label",method:"playFromLabel"},"js-async-timeline-playReverse-label":{label:"play from label reverse",method:"playFromLabelReverse"},"js-async-timeline-pause":{label:"pause",method:"pause"},"js-async-timeline-resume":{label:"resume",method:"resume"},"js-async-timeline-revert-next":{label:"revert next",method:"revertNext"},"js-async-timeline-stop":{label:"stop",method:"stop"}},nx=m.createComponent({tag:"async-timeline",component:ox,props:{background:"",disableOffcanvas:()=>({value:!0,type:Boolean})},state:{isMounted:!1,controlsActive:()=>({value:!1,type:Boolean}),buttons:()=>({value:Ok,type:"Any"})}});m.useComponent([nx]);var sx=async()=>{let{data:t}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});return Se({active:!0,prevRoute:"#caterpillarN2",nextRoute:"#animatedPatternN0?version=0&activeId=0",backRoute:"#canvas-overview"}),g`<div class="l-padding">
        <async-timeline
            ${m.staticProps({background:t})}
        ></async-timeline>
    </div>`};var ix=({letter_d:t,letter_p:e,letter_r:r,letter_r_shadow:o,letter_d_shadow:n,letter_p_shadow:s,letter_r_pieces:i,letter_d_pieces:a,letter_p_pieces:c,letter_r_fill:l,letter_d_fill:p,letter_p_fill:h})=>[{props:{id:0,depth:200,anchorPoint:"center",classList:"",animate:!0},children:[{props:{id:0,depth:100,offsetX:"-2",offsetY:"-2",anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:t}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:n}}},children:[]},{props:{id:0,depth:40,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:a}}},children:[]},{props:{id:0,depth:100,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:p}}},children:[]},{props:{id:0,depth:-100,initialDepth:-1,offsetX:"-10",anchorPoint:"right",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:r}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:o}}},children:[]},{props:{id:0,depth:20,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:i}}},children:[]},{props:{id:0,depth:30,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:l}}},children:[]}]},{props:{id:0,depth:100,initialDepth:0,anchorPoint:"left",classList:"",animate:!0,rotate:"y",component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:e}}},children:[{props:{id:0,depth:-10,initialDepth:-1,anchorPoint:"center",rotate:"y",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:s}}},children:[]},{props:{id:0,depth:20,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:c}}},children:[]},{props:{id:0,depth:30,initialDepth:1,anchorPoint:"center",classList:"",animate:!0,component:{tagName:"any-component",className:"u-any-center-svg l-rdp-01__block",props:{content:h}}},children:[]}]}]}]}];m.useComponent([Zn,es,Vc]);var ax=async()=>{let{data:t}=await oe({source:"./asset/svg/rdp.svg?v=0.4"}),{data:e}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"}),[r,o,n,s,i,a,c,l,p,h,f,d]=["letter_d","letter_r","letter_p","letter_r_shadow","letter_d_shadow","letter_p_shadow","letter_r_pieces","letter_d_pieces","letter_p_pieces","letter_r_fill","letter_d_fill","letter_p_fill"].map(v=>bo({svg:t,id:v}));return Se({active:!0,prevRoute:"",nextRoute:"#mob-01",backRoute:"#svg-overview"}),g`<div class="l-rdp-01">
        <div class="background-shape">${e}</div>
        <mouse-trail></mouse-trail>
        <move-3d
            ${m.staticProps({shape:ix({letter_d:r,letter_r:o,letter_p:n,letter_r_shadow:s,letter_d_shadow:i,letter_p_shadow:a,letter_r_pieces:c,letter_d_pieces:l,letter_p_pieces:p,letter_r_fill:h,letter_d_fill:f,letter_p_fill:d}),xDepth:100,yDepth:30,factor:20,xLimit:10,yLimit:20,drag:!0,perspective:1e3})}
        ></move-3d>
    </div>`};var cx=({screenElement:t,scrollerElement:e,layer02:r})=>{let o=Ke.createParallax({item:r,align:"center",range:8,propierties:"x",ease:!1}),n=new _t({screen:t,scroller:e,direction:"horizontal",drag:!0,useHorizontalScroll:!0,easeType:"spring",breakpoint:"small",children:[o]});return n.init(),n.set(55),{destroy:()=>{n.destroy(),o.destroy(),n=null,o=null}}};var lx=({getState:t,onMount:e,setRef:r,getRef:o})=>{let{layer02:n,layer03:s}=t();return e(()=>{let{screen:i,scroller:a,layer02:c}=o(),{destroy:l}=cx({screenElement:i,scrollerElement:a,layer02:c});return()=>{l()}}),g`<div class="mobbu2025">
        <div class="mobbu2025__screen" ${r("screen")}>
            <div class="mobbu2025__scroller" ${r("scroller")}>
                <div class="mobbu2025__layer">${s}</div>
                <div class="mobbu2025__layer" ${r("layer02")}>
                    ${n}
                </div>
            </div>
        </div>
    </div>`};var ux=m.createComponent({tag:"mobbu-2025",component:lx,props:{layer02:()=>({value:"",type:String}),layer03:()=>({value:"",type:String})}});m.useComponent([ux]);var px=async()=>{let{data:t}=await oe({source:"./asset/svg/lettering-mob-2025-pure-optimized.svg?v=0.3"}),{data:e}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.4"}),[r,o]=["layer-02","layer-03"].map(n=>bo({svg:t,id:n}));return Se({active:!0,prevRoute:"#mob-01",nextRoute:"",backRoute:"#svg-overview"}),g`<div class="l-mob-02">
        <div class="background-shape">${e}</div>
        <h3 class="l-mob-02__title">Scroll or Drag</h3>
        <mobbu-2025
            ${Ia({layer02:r,layer03:o})}
        ></mobbu-2025>
    </div>`};var mx="TOP-LEFT",hx="TOP-RIGHT",dx="BOTTOM-LEFT",fx="BOTTOM-RIGHT",gx="CENTER";var $k=t=>{let r=globalThis.getComputedStyle(t).transform;if(r==="none")return 0;let o=r.match(/matrix3d\(([^)]+)\)/);return o&&o[1].split(",").map(Number)[14]||0},bx=({align:t,root:e,child:r,containerClass:o,childrenClass:n,perspective:s,usePrespective:i,maxLowDepth:a=-200,maxHightDepth:c=200,onDepthChange:l=()=>{},depthFactor:p=30,hideThreshold:h=1})=>{let f=document.querySelector(o);f&&(f.style.cursor="grab");let d=[...f.querySelectorAll(n)],v=d.map(Z=>{let ye=window.innerWidth,ke=window.innerHeight,Ae=Z.offsetWidth,Ye=Z.offsetHeight,$e=$k(Z),Or=s-s*Ae/(ye*h)-$e,$t=s-s*Ye/(ke*h)-$e;return Math.min(Or,$t)}),y=()=>{d.forEach((Z,ye)=>{let ke=_>v[ye];Z.classList.toggle("hide",ke)})},T=0,S=0,_=0,w=0,x=0,E=r.offsetWidth,I=r.offsetHeight,P=e.offsetWidth,A=e.offsetHeight,$=(E-P)/2,N=(I-A)/2,R={x:0,y:0},O=!1,D=!1,k=30,L=()=>{if(i&&s>0){let Z=s/(s-_);$=(E-P/Z)/2,N=(I-A/Z)/2}else $=(E-P)/2,N=(I-A)/2};L();let C={xValue:0,yValue:0},M=U.createSpring({data:{x:0,y:0,z:0}});switch(t){case mx:{C={xValue:$,yValue:N},S=E,T=I;break}case hx:{C={xValue:-$,yValue:N},S=-E,T=I;break}case dx:{C={xValue:$,yValue:-N},S=E,T=-I;break}case fx:{C={xValue:-$,yValue:-N},S=-E,T=-I;break}}let B=M.subscribe(({x:Z,y:ye,z:ke})=>{r&&(r.style.transform=`translate3D(${Z}px, ${ye}px, ${ke}px)`)});M.set({x:C.xValue,y:C.yValue}),[...e.querySelectorAll("a, button")].forEach(Z=>{Z.setAttribute("draggable","false"),Z.style.userSelect="none"});let F=({page:Z})=>{O=!0,D=!0,R={x:Z.x,y:Z.y}},z=({page:Z})=>{let{x:ye,y:ke}=Z,{xgap:Ae,ygap:Ye}=O?D?(D=!1,{xgap:0,ygap:0}):{xgap:ye-w,ygap:ke-x}:{xgap:0,ygap:0},$e=$>0?ue.clamp(S+Ae,-$,$):ue.clamp(S+Ae,$,-$),Or=N>0?ue.clamp(T+Ye,-N,N):ue.clamp(T+Ye,N,-N),$t=O?$e:S,Y=O?Or:T,{xComputed:$r,yComputed:Ve}=O?{xComputed:$t,yComputed:Y}:{xComputed:ye,yComputed:ke};S=$t,T=Y,w=ye,x=ke,O&&(C={xValue:$r,yValue:Ve},M.goTo({x:$r,y:Ve}).catch(()=>{}))},te=u.useTouchStart(({page:Z,target:ye})=>{F({page:Z,target:ye})}),ae=u.useMouseDown(({page:Z,target:ye})=>{F({page:Z,target:ye})}),q=u.useTouchEnd(()=>{O=!1}),ne=u.useMouseUp(()=>{O=!1}),re=u.useMouseMove(({page:Z})=>{z({page:Z})}),ce=u.useTouchMove(({page:Z})=>{z({page:Z})});f&&f.addEventListener("click",Z=>{let{x:ye,y:ke}=R,Ae=Math.abs(w-ye)>k,Ye=Math.abs(x-ke)>k;(Ae||Ye)&&Z.preventDefault()},!1),i&&f&&f.addEventListener("wheel",Z=>{let{spinY:ye}=u.normalizeWheel(Z);_=ue.clamp(_+ye*p,a,c),L(),S=$>0?ue.clamp(S,-$,$):ue.clamp(S,$,-$),T=N>0?ue.clamp(T,-N,N):ue.clamp(T,N,-N),l({depth:_}),M.goTo({x:S,y:T,z:_}).catch(()=>{})},{passive:!0});let Oe=u.useMouseWheel(u.useDebounce(()=>{y()},100)),Je=u.useResize(()=>{E=r.offsetWidth,I=r.offsetHeight,P=e.offsetWidth,A=e.offsetHeight,L()});return{destroy:()=>{B(),te(),q(),ae(),ne(),re(),ce(),Je(),Oe(),M.destroy(),M=null,f=null,d=null,e=null,r=null}}};var vx=({getProxi:t,setRef:e,getRef:r,bindEffect:o,onMount:n})=>{let s=t();return n(({element:i})=>{let{child:a}=r(),c=a.firstChild;if(!c)return;let l=bx({align:s.align,root:i,child:c,usePrespective:s.usePrespective,perspective:s.perspective,maxLowDepth:s.maxLowDepth,maxHightDepth:s.maxHightDepth,depthFactor:s.depthFactor,onDepthChange:s.onDepthChange,containerClass:s.containerClass,childrenClass:s.childrenClass,hideThreshold:s.hideThreshold});return s.afterInit({root:i}),()=>{l.destroy(),i.remove(),a.remove(),a=null,c=null,i=null}}),g`<div class="c-dragger ${s.rootClass}">
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
    </div>`};var yx=m.createComponent({tag:"c-dragger",component:vx,props:{rootClass:()=>({value:"",type:String}),childrenClass:()=>({value:"",type:String}),containerClass:()=>({value:"",type:String}),initialZoom:()=>({value:1,type:Number}),ease:()=>({value:!0,type:Boolean}),align:()=>({value:gx,type:String,transform:t=>t.toUpperCase()}),usePrespective:()=>({value:!0,type:Boolean}),perspective:()=>({value:600,type:Number}),hideThreshold:()=>({value:1,type:Number}),depthFactor:()=>({value:30,type:Number}),maxLowDepth:()=>({value:-200,type:Number}),maxHightDepth:()=>({value:200,type:Number}),afterInit:()=>({value:()=>{},type:Function}),onDepthChange:()=>({value:()=>{},type:Function})}});m.useComponent([yx,es]);var Tx=!1,_x=async()=>{let{data:t}=await oe({source:"./asset/svg/ms_nord_compact.svg?v=1.3"}),{data:e}=await oe({source:"./asset/svg/lettering-mob.svg?v=1.3"});Se({active:!0,prevRoute:"#move3D-shape1",nextRoute:"#math-animation-01",backRoute:"#plugin-overview"});let r=g`
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
    </div>`};var Sx=({targets:t,container:e,canvas:r}={})=>{if(!t||!e||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=(le(e)-100)/2,s=3,i=2*Math.PI*s,a=0,c=(n-a)/i,l=1e3*s,p=t.map(y=>le(y)/2),h=U.createSequencer({ease:"easeLinear",stagger:{each:6},data:{angleInRadian:0,scale:0}}).goTo({angleInRadian:i},{start:0,end:10,ease:"easeLinear"}).goTo({scale:1},{start:0,end:4,ease:"easeOutQuad"}).goTo({scale:0},{start:9,end:10,ease:"easeOutQuad"});t.forEach((y,T)=>{let S=y.firstChild;h.subscribeCache(({angleInRadian:_,scale:w})=>{let x=a+c*_,E=x*Math.cos(_),I=x*Math.sin(_);y.style.transform=`translate3D(0px,0px,0px) translate(${E-p[T]}px, ${I-p[T]}px)`,S&&(S.style.scale=`${w}`)})});let f=Me.createSyncTimeline({repeat:-1,yoyo:!1,duration:l}).add(h);function d(){if(!o||!r)return;let y=r.width/2,T=r.height/2,S=200;o.clearRect(0,0,r.width,r.height),o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let _=0;_<=S;_++){let w=i/S*_,x=a+c*w,E=y+x*Math.cos(w),I=T+x*Math.sin(w);_===0?o.moveTo(E,I):o.lineTo(E,I)}o.stroke()}let v=u.useResize(()=>{r.width=r.clientWidth,r.height=r.clientHeight,d()});return d(),{play:()=>{f.play()},resume:()=>{f.resume()},stop:()=>{f.pause()},destroy:()=>{f.stop(),h.destroy(),f.destroy(),v(),o=null,h=null,f=null,t=null}}};var xx=({targets:t,container:e,canvas:r}={})=>{if(!t||!e||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=U.createSpring({stagger:{each:6},data:{x:0}}),s=.06,i=le(e)/2-100,a=t.map(d=>le(d)/2);t.forEach((d,v)=>{n.subscribeCache(({x:y})=>{let T=Math.sin(y*s)*i,S=Math.cos(y*s)*i;d.style.transform=`translate3D(0px,0px,0px) translate(${T-a[v]}px, ${S-a[v]}px)`})}),n.set({x:0});let c=0,l=!1,p=()=>{let d=60/u.getFps();c+=d,n&&(n.goTo({x:c}).catch(()=>{}),l&&u.useNextFrame(()=>p()))};function h(){if(!o||!r)return;r.width=r.width;let d=r.width/2,v=r.height/2;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath(),o.arc(d,v,Math.abs(i),0,2*Math.PI),o.stroke()}let f=u.useResize(()=>{h()});return h(),{play:()=>{l||(l=!0,p())},resume:()=>{l||(l=!0,p())},stop:()=>{l=!1},destroy:()=>{n.destroy(),f(),o=null,n=null,t=null,c=null,l=null}}};var Cx=({targets:t,container:e,canvas:r}={})=>{if(!t||!e||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=t.map(d=>le(d)/2),s=je(e)/2-100,i=le(e),a=10,c=a/2/Math.PI,l=U.createSequencer({stagger:{each:5},data:{x:a/4,scale:0},duration:a}).goTo({x:a+a/4},{start:0,end:a,ease:"easeLinear"}).goTo({scale:1},{start:0,end:1.5,ease:"easeOutQuad"}).goTo({scale:0},{start:1.5,end:5,ease:"easeInQuad"}).goTo({scale:1},{start:5,end:8.5,ease:"easeOutQuad"}).goTo({scale:0},{start:8.5,end:10,ease:"easeInQuad"});t.forEach((d,v)=>{let y=d.firstChild;l.subscribeCache(({x:T,scale:S})=>{let _=T/c,w=2/(3-Math.cos(2*_)),x=w*Math.cos(_)*s,E=w*Math.sin(2*_)/2*i;d.style.transform=`translate3D(0px,0px,0px) translate(${x-n[v]}px, ${E-n[v]}px)`,y&&(y.style.scale=`${S}`)})});let p=Me.createSyncTimeline({repeat:-1,yoyo:!1,duration:3e3}).add(l);function h(){if(!o||!r)return;r.width=r.width;let d=r.width/2,v=r.height/2,y=200;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let T=0;T<=y;T++){let S=T/y*2*Math.PI,_=2/(3-Math.cos(2*S)),w=_*Math.cos(S)*s,x=_*Math.sin(2*S)/2*i;T===0?o.moveTo(d+w,v+x):o.lineTo(d+w,v+x)}o.stroke()}let f=u.useResize(()=>{h()});return h(),{play:()=>{p.play()},resume:()=>{p.resume()},stop:()=>{p.pause()},destroy:()=>{p.stop(),l.destroy(),p.destroy(),f(),o=null,l=null,p=null,t=null}}};function Lk(t,e,r,o=2e3){let n=0,s=t,i=0;for(let a=1;a<=o;a++){let c=r/o*a,l=t*Math.cos(e*c),p=l*Math.cos(c),h=l*Math.sin(c),f=p-s,d=h-i;n+=Math.hypot(f,d),s=p,i=h}return n}var Ex=(t,e)=>e===0?t:Ex(e,t%e);function Dk(t,e){let r=Ex(t,e),o=e/r;return 2*Math.PI*o}var wx=({targets:t,container:e,canvas:r}={},...o)=>{let[n,s,i,a]=o;if(!t||!e||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let c=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let l=(le(e)-100)/2,p=n/s,h=Dk(n,s),f=Lk(l,p,h),d=i*(f/l),v=t.map(P=>le(P)/2),y=U.createSequencer({ease:"easeLinear",stagger:{each:a},data:{angleInRadian:0,scale:1}}).goTo({angleInRadian:h},{start:0,end:10,ease:"easeLinear"}),T=[],S=0,_=0;for(;_<h&&h>0&&p>0;)_=(Math.PI/2+S*Math.PI)/p,_>=0&&T.push(_),S++;let w=0;T.forEach(P=>{let A=P/h*10,$=Math.abs((A-w)/2);w=A;let N=Math.max(0,A-$),R=A,O=Math.min(10,A+$);O>N&&(y.goTo({scale:0},{start:N,end:R,ease:"easeInQuad"}),y.goTo({scale:1},{start:R,end:O,ease:"easeOutQuad"}))}),t.forEach((P,A)=>{let $=P.firstChild;y.subscribeCache(({angleInRadian:N,scale:R})=>{let O=l*Math.cos(p*N),D=O*Math.cos(N),k=O*Math.sin(N);P.style.transform=`translate3D(0px,0px,0px) translate(${D-v[A]}px, ${k-v[A]}px)`,$&&($.style.scale=`${R}`)})});let x=Me.createSyncTimeline({repeat:-1,yoyo:!1,duration:d}).add(y);function E(){if(!c||!r)return;let P=r.width/2,A=r.height/2,$=2e3*s;c.clearRect(0,0,r.width,r.height),c.setLineDash([3,7]),c.lineDashOffset=3,c.strokeStyle="rgba(0, 0, 0, 0.5)",c.lineWidth=1,c.beginPath();for(let N=0;N<=$;N++){let R=h/$*N,O=l*Math.cos(p*R),D=P+O*Math.cos(R),k=A+O*Math.sin(R);N===0?c.moveTo(D,k):c.lineTo(D,k)}c.stroke()}let I=u.useResize(()=>{r.width=r.clientWidth,r.height=r.clientHeight,E()});return E(),{play:()=>{x.play()},resume:()=>{x.resume()},stop:()=>{x.pause()},destroy:()=>{x.stop(),y.destroy(),x.destroy(),I(),c=null,y=null,x=null,t=null}}};var Ix=({targets:t,container:e,canvas:r}={})=>{if(!t||!e||!r)return{play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}};let o=r.getContext("2d",{alpha:!0,willReadFrequently:!1});r.width=r.clientWidth,r.height=r.clientHeight;let n=je(e)-200,s=le(e)/3,i=2,a=n/(2*Math.PI*i),c=1500*i,l=t.map(v=>le(v)/2),p=U.createSequencer({ease:"easeLinear",stagger:{each:6},data:{x:0,scale:0}}).goTo({x:n},{start:0,end:10,ease:"easeLinear"}).goTo({scale:1},{start:0,end:10/i/2,ease:"easeOutQuad"}).goTo({scale:0},{start:10-10/i/2,end:10,ease:"easeOutQuad"});t.forEach((v,y)=>{let T=0,S=v.firstChild,_=-l[y]-n/2;p.subscribeCache(({x:w,scale:x})=>{let E=Math.sign(w-T)||1,I=Math.sin(w/a)*s*E;v.style.transform=`translate3D(0px,0px,0px) translate(${w+_}px, ${I-l[y]}px)`,S&&(S.style.scale=`${x}`),T=w})});let h=Me.createSyncTimeline({repeat:-1,yoyo:!0,duration:c}).add(p);function f(){if(!o||!r)return;r.width=r.width;let v=r.width/2,y=r.height/2,T=200,S=T*2;o.setLineDash([2,5,2,5]),o.strokeStyle="rgba(0, 0, 0, 0.5)",o.lineWidth=1,o.beginPath();for(let _=0;_<=S;_++){let{x:w,y:x}=(()=>{if(_<=T){let E=_/T*n,I=Math.sin(E/a)*s;return{x:E,y:I}}if(_>T){let I=(S-_)/T*n,P=Math.sin(I/a)*s*-1;return{x:I,y:P}}return{x:0,y:0}})();_===0?o.moveTo(v+w-n/2,y+x):o.lineTo(v+w-n/2,y+x)}o.stroke()}let d=u.useResize(()=>{f()});return f(),{play:()=>{h.play()},resume:()=>{h.resume()},stop:()=>{h.pause()},destroy:()=>{h.stop(),p.destroy(),h.destroy(),d(),o=null,p=null,h=null,t=null}}};var Cp={sin:Ix,circle:xx,infinite:Cx,archimede:Sx,rosaDiGrandi:wx};var Mx=()=>({play:()=>{},resume:()=>{},stop:()=>{},destroy:()=>{}});var kx=({getProxi:t,setRef:e,getRef:r,getRefs:o,delegateEvents:n,onMount:s})=>{let i=t(),a=i.showNavigation?"active":"",c=3,l=c/i.numberOfStaggers,p=Array.from({length:i.numberOfStaggers}).map((T,S)=>({size:c-l*S,opacity:1/S})),h=Mx(),{destroy:f,play:d,stop:v,resume:y}=h;return s(({element:T})=>{let{target:S}=o(),{canvas:_}=r();u.useFrame(()=>{({destroy:f,play:d,stop:v,resume:y}=Cp[i.name]({targets:S,container:T,canvas:_},...i.args)),d()});let w=u.useResize(()=>{v(),f(),{destroy:f,play:d,stop:v,resume:y}=Cp[i.name]({targets:S,container:T,canvas:_},...i.args),d()});return()=>{f(),w(),f=null,d=null,v=null,y=null}}),g`<div class="c-math">
        <canvas class="c-math__canvas" ${e("canvas")}></canvas>
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
                        ${e("target")}
                        style="width:${T}rem;height:${T}rem;opacity:${S}"
                        ><span class="c-math__circle__inner"></span
                    ></span>`).join("")}
        </div>
    </div>`};var Wc=m.createComponent({tag:"math-animation",component:kx,props:{name:()=>({value:"",type:String}),showNavigation:()=>({value:!0,type:Boolean}),numberOfStaggers:()=>({value:5,type:Number}),args:()=>({value:[],type:Array})}});m.useComponent([Wc]);var Rx=async({props:t})=>{let{names:e}=t;return e.length>4&&console.warn("math layout, max item excedded"),Se({active:!0,prevRoute:"#plugin-dragger",nextRoute:"#rosa-di-grandi",backRoute:"#plugin-overview"}),g`<div class="l-math">
        ${e.map(r=>g`<div class="l-math__item">
                    <math-animation
                        ${m.staticProps({name:r})}
                    ></math-animation>
                </div>`).join("")}
    </div>`};var Fk=({proxi:t,delegateEvents:e,bindObject:r})=>g`
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
    `,Nx=({getProxi:t,delegateEvents:e,invalidate:r,bindEffect:o,getRef:n,setRef:s,bindObject:i})=>{let a=t();return g`<div class="l-rosa">
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
            ${Fk({proxi:a,getRef:n,setRef:s,delegateEvents:e,bindObject:i})}
        </ul>
        <div class="l-rosa__wrap">
            ${r({observe:[()=>a.numerators,()=>a.denominator],render:()=>g`
                        <math-animation
                            ${m.staticProps({name:"rosaDiGrandi",showNavigation:!1,numberOfStaggers:10,args:[a.numerators,a.denominator,a.duration,a.staggerEach]})}
                        ></math-animation>
                    `})}
        </div>
    </div>`};var Px=m.createComponent({tag:"rosa-di-grandi-page",component:Nx,state:{numerators:()=>({value:2,type:Number}),denominator:()=>({value:3,type:Number}),numeratorsLabel:()=>({value:2,type:Number}),denominatorLabel:()=>({value:3,type:Number}),duration:()=>({value:500,type:Number}),staggerEach:()=>({value:4,type:Number}),controlsActive:()=>({value:!1,type:Boolean})},child:[Wc]});m.useComponent([Px]);var Ax=async()=>(Se({active:!0,prevRoute:"#math-animation-01",nextRoute:"",backRoute:"#plugin-overview"}),g`<rosa-di-grandi-page></rosa-di-grandi-page>`);var wp="home",zc="about",Q="template-mobJs-component",Ne="template-doc-default",ts="template-listing",lt="template-animation",vt="template-test",Hc=new Set([Q,Ne]),pe=[{url:"./#mobJs-overview",title:"mobJs"},{url:"./#mobJs-component",title:"component"}],Qe=[{url:"./#mobJs-overview",title:"mobJs"}],Ep=[{url:"./#mobCore-overview",title:"mobCore"}],cr=[{url:"./#mobMotion-overview",title:"mobMotion"}],jc=[{label:"store",url:"#mobCore-store"},{label:"events",url:"#mobCore-events"},{label:"defaults",url:"#mobCore-defaults"}],K=[{label:"initialization",url:"#mobJs-initialization"},{label:"component",url:"#mobJs-component"},{label:"routing",url:"#mobJs-routing"},{label:"tick",url:"#mobJs-tick"},{label:"memory management",url:"#mobJs-memory-management"},{label:"utils",url:"#mobJs-utils"},{label:"debug",url:"#mobJs-debug"}],Gt=[{label:"tween/spring/lerp",url:"#mobMotion-tween-spring-lerp"},{label:"AsyncTimeline",url:"#mobMotion-async-timeline"},{label:"sequencer",url:"#mobMotion-sequencer"},{label:"SyncTimeline",url:"#mobMotion-sync-timeline"},{label:"CreateStagger",url:"#mobMotion-create-stagger"},{label:"ScrollTrigger",url:"#mobMotion-scrolltrigger"},{label:"Parallax",url:"#mobMotion-parallax"},{label:"Stagger",url:"#mobMotion-stagger"},{label:"Default",url:"#mobMotion-defaults"},{label:"Utils",url:"#mobMotion-utils"}],Uc=[{hash:"pageNotFound",layout:Hy,props:{}},{hash:"onlyDesktop",layout:rx,props:{}},{hash:"about",layout:ZT,templateName:zc,props:{}},{hash:"canvas-overview",layout:pc,templateName:ts,props:{source:"./data/canvas/data.json"}},{hash:"animatedPatternN0",layout:__,templateName:lt,props:{}},{hash:"animatedPatternN1",layout:C_,templateName:lt,props:{}},{hash:"caterpillarN1",layout:M_,templateName:lt,props:{}},{hash:"caterpillarN2",layout:P_,templateName:lt,props:{}},{hash:"async-timeline",layout:sx,templateName:lt,props:{}},{hash:"scrollerN0",layout:L_,templateName:lt,props:{}},{hash:"scrollerN1",layout:V_,templateName:lt,props:{}},{hash:"dynamic-list",layout:nS,templateName:vt,skipTransition:!0,props:{source:"./data/mob-js/general-repeat-test.json",breadCrumbs:Qe,title:"( test ) repeat & invalidate",section:"mobJs"}},{hash:"matrioska-repeat",layout:_S,templateName:vt,skipTransition:!0,props:{source:"./data/mob-js/matrioska.json",breadCrumbs:Qe,title:"( test ) matrioska repeat",section:"mobJs"}},{hash:"matrioska-invalidate",layout:SS,templateName:vt,skipTransition:!0,props:{source:"./data/mob-js/matrioska.json",breadCrumbs:Qe,title:"( test ) matrioska invalidate",section:"mobJs"}},{hash:"home",layout:cS,templateName:wp,props:{}},{hash:"mobCore-overview",layout:Be,skipTransition:!0,templateName:Ne,props:{source:"./data/mob-core/overview.json",title:"mobCore",breadCrumbs:[],section:"mobCore",rightSidebar:jc}},{hash:"mobCore-defaults",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-core/defaults.json",title:"Defaults",breadCrumbs:Ep,section:"mobCore",rightSidebar:jc}},{hash:"mobCore-events",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-core/events.json",title:"Events",breadCrumbs:Ep,section:"mobCore",rightSidebar:jc}},{hash:"mobCore-store",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-core/store.json",title:"Store",breadCrumbs:Ep,section:"mobCore",rightSidebar:jc}},{hash:"mobJs-overview",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/overview.json",title:"mobJs",breadCrumbs:[],section:"mobJs",rightSidebar:K}},{hash:"mobJs-initialization",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/initialization.json",title:"initialization",breadCrumbs:Qe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-component",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/component.json",title:"component",breadCrumbs:Qe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-routing",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/routing.json",title:"routing",breadCrumbs:Qe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-benchmark-invalidate",layout:Ar,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-invalidate",breadCrumbs:Qe,source:"./data/mob-js/benchmark-invalidate.json",title:"( test ) benchmark invalidate",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-key",layout:Ar,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-key",breadCrumbs:Qe,source:"./data/mob-js/benchmark-repeat-without-key.json",title:"( test ) benchmark repeat without key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key",layout:Ar,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key",breadCrumbs:Qe,source:"./data/mob-js/benchmark-repeat-key.json",title:"( test ) benchmark repeat key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-component-no-key",layout:Ar,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-component-no-key",breadCrumbs:Qe,source:"./data/mob-js/benchmark-repeat-no-component-no-key.json",title:"( test ) benchmark repeat no component no key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-component-with-key",layout:Ar,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-component-with-key",breadCrumbs:Qe,source:"./data/mob-js/benchmark-repeat-no-component-with-key.json",title:"( test ) benchmark repeat no component with key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-no-key-nested",layout:Ar,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key-no-nested",breadCrumbs:Qe,source:"./data/mob-js/benchmark-repeat-without-key-nested.json",title:"( test ) benchmark repeat nested without key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key-nested",layout:Ar,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-key-nested",breadCrumbs:Qe,source:"./data/mob-js/benchmark-repeat-key-nested.json",title:"( test ) benchmark repeat nested with key",section:"mobJs"}},{hash:"mobJs-benchmark-repeat-key-bind-store",layout:Ar,templateName:vt,skipTransition:!0,props:{rootComponent:"benchmark-repeat-no-key-bind-store",breadCrumbs:Qe,source:"./data/mob-js/benchmark-repeat-external.json",title:"( test ) benchmark repeat bindStore",section:"mobJs"}},{hash:"mobJs-tick",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/tick.json",title:"tick",breadCrumbs:Qe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-utils",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/utils.json",title:"utils",breadCrumbs:Qe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-memory-management",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/memory-management.json",title:"memory management",breadCrumbs:Qe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-debug",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-js/debug.json",title:"debug",breadCrumbs:Qe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-onMount",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/on-mount.json",title:"onMount",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-getState",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/get-state.json",title:"getState",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-setState",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/set-state.json",title:"setState",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-updateState",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/update-state.json",title:"updateState",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-getProxi",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/get-proxi.json",title:"getProxi",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-watch",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/watch.json",title:"watch",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-staticProps",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/static-props.json",title:"staticProps",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-dataAttribute",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/data-attribute.json",title:"dataAttribute",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-bindProps",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/bind-props.json",title:"bindProps",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-bindEvents",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/bind-events.json",title:"bindEvents",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-delegateEvents",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/delegate-events.json",title:"delegateEvents",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-bindtext",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/bind-text.json",title:"bindText",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-bindObject",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/bind-object.json",title:"bindObject",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-bind-effect",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/bind-effect.json",title:"bindEffect",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-methods",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/methods.json",title:"add methods",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-useMethodByName",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/use-method-by-name.json",title:"useMethodByName",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-useMethodArrayByName",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/use-method-array-by-name.json",title:"useMethodArrayByName",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-setStateByName",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/set-state-by-name.json",title:"setStateByName",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-updateStateByName",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/update-state-by-name.json",title:"updateStateByName",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-refs",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/refs.json",title:"refs",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-runtime",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/runtime.json",title:"renderComponent",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-repeat",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/repeat.json",title:"repeat",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-invalidate",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/invalidate.json",title:"invalidate",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-invalidate-vs-repeater",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/invalidate-vs-repeater.json",title:"invalidate vs repeater",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-web-component",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/web-component.json",title:"webComponent",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-slot",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/slot.json",title:"slot",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-unBind",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/unbind.json",title:"unBind",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-emit",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/emit.json",title:"emit",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-emitAsync",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/emit-async.json",title:"emitAsync",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-computed",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/computed.json",title:"computed",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-bindStore",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/bind-store.json",title:"bindStore",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-removeDom",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/remove-dom.json",title:"removeDom",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-remove",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/remove.json",title:"remove",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-getChildren",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/get-children.json",title:"getChildren",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-freezeProp",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/freeze-prop.json",title:"freezeProp",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-unFreezeProp",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/unfreeze-prop.json",title:"unFreezeProp",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-getParentId",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/get-parent-id.json",title:"getParentId",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-watchParent",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/watch-parent.json",title:"watchParent",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-instanceName",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/instance-name.json",title:"instanceName",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobJs-class-list",templateName:Q,layout:ie,skipTransition:!0,props:{source:"./data/mob-js/class-list.json",title:"classList",breadCrumbs:pe,section:"mobJs",rightSidebar:K}},{hash:"mobMotion-stagger",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/stagger.json",title:"Stagger",breadCrumbs:cr,section:"mobMotion",rightSidebar:Gt}},{hash:"mobMotion-defaults",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/defaults.json",title:"Defaults",breadCrumbs:cr,section:"mobMotion",rightSidebar:Gt}},{hash:"mobMotion-utils",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/utils.json",title:"Utils",breadCrumbs:cr,section:"mobMotion",rightSidebar:Gt}},{hash:"mobMotion-overview",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/overview.json",title:"mobMotion",breadCrumbs:[],section:"mobMotion",rightSidebar:Gt}},{hash:"mobMotion-parallax",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/parallax.json",title:"Parallax",breadCrumbs:cr,section:"mobMotion",rightSidebar:Gt}},{hash:"mobMotion-sequencer",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/sequencer.json",title:"Sequencer",breadCrumbs:cr,section:"mobMotion",rightSidebar:Gt}},{hash:"mobMotion-scrolltrigger",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/scroll-trigger.json",title:"ScrollTrigger",breadCrumbs:cr,section:"mobMotion",rightSidebar:Gt}},{hash:"mobMotion-sync-timeline",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/sync-timeline.json",title:"Synctimeline",breadCrumbs:cr,section:"mobMotion",rightSidebar:Gt}},{hash:"mobMotion-create-stagger",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/create-stagger.json",title:"CreateStagger",breadCrumbs:cr,section:"mobMotion",rightSidebar:Gt}},{hash:"mobMotion-async-timeline",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/async-timeline.json",title:"Asynctimeline",breadCrumbs:cr,section:"mobMotion",rightSidebar:Gt}},{hash:"mobMotion-tween-spring-lerp",layout:Be,templateName:Ne,skipTransition:!0,props:{source:"./data/mob-motion/tween-spring-lerp.json",title:"TimeTween Spring Lerp",breadCrumbs:cr,section:"mobMotion",rightSidebar:Gt}},{hash:"horizontalScroller",layout:AS,templateName:lt,restoreScroll:!1,props:{source:"./data/plugin/horizontal-scroller.json",title:"HorizontalScroller"}},{hash:"move3D-shape1",templateName:lt,layout:HS,props:GS.shape1},{hash:"plugin-dragger",layout:_x,templateName:lt,props:{}},{hash:"math-animation-01",layout:Rx,templateName:lt,props:{names:["circle","sin","infinite","archimede"]}},{hash:"rosa-di-grandi",layout:Ax,templateName:lt,props:{}},{hash:"plugin-overview",layout:pc,templateName:ts,props:{source:"./data/plugin/data.json"}},{hash:"svg-overview",layout:pc,templateName:ts,props:{source:"./data/svg/data.json"}},{hash:"mob-01",layout:KS,templateName:lt,props:{}},{hash:"mob-02",layout:px,templateName:lt,props:{}},{hash:"rdp-01",layout:ax,templateName:lt,props:{}}];var Ox=0;m.beforeRouteChange(()=>{Ox=window.scrollY});var Bk=new Set([Q,Ne,ts,zc,vt]),Vk=new Set([Q,Ne,ts,zc,wp,vt]),$x=async({oldNode:t,oldTemplateName:e})=>{t.classList.remove("current-route"),t.classList.add("fake-content"),t.style.position="fixed",t.style.zIndex="10",t.style.top=Bk.has(e)?"var(--header-height)":"0",t.style.left=Vk.has(e)?"calc(var(--header-height)/2)":"0",t.style.right="0",t.style.transform=`translateY(-${Ox}px)`,t.style.minHeight="calc(100vh - var(--header-height) - var(--footer-height))"},Lx=async({oldNode:t,newNode:e,oldRoute:r,newRoute:o})=>{if(r===o)return;let n=m.getRoot();n.style.pointerEvents="none",e.style.opacity="0";let s=U.createTimeTween({data:{opacity:1},duration:200}),i=U.createTimeTween({data:{opacity:0},duration:300});s.subscribe(({opacity:c})=>{t.style.opacity=c}),i.subscribe(({opacity:c})=>{e.style.opacity=c});let a=Me.createAsyncTimeline({repeat:1}).createGroup({waitComplete:!0}).goTo(s,{opacity:0}).goTo(i,{opacity:1}).closeGroup();await a.play(),a.destroy(),a=null,e.style.removeProperty("opacity"),e.classList.add("current-route"),u.useFrameIndex(()=>{n.style.pointerEvents=""},10)};var Dx=()=>{let t=window.innerWidth-document.documentElement.clientWidth;document.documentElement.style.setProperty("--scrollbar-with",`${t}px`)},Fx=()=>{Dx(),u.useResize(()=>{Dx()})};var rs="reset",lr="tree",Ti="filter_component";var ur=({screen:t,scroller:e,scrollbar:r})=>{let o;return{init:()=>{o||(o=new _t({screen:t,scroller:e,direction:"vertical",drag:!0,scopedEvent:!1,breakpoint:"desktop",onTick:({percent:n})=>{r.value=`${n}`},afterRefresh:({shouldScroll:n})=>{r?.classList.toggle("hide-scrollbar",!n)}}),o.init())},destroy:()=>{o?.destroy(),o=null},refresh:()=>{o?.refresh()},updateScroller:()=>{if(!o)return;let n=le(e),s=le(t),i=je(r),a=s/n*i;r.style.setProperty("--thumb-width",`${a}px`),o?.refresh()},move:n=>{o&&o.move(n).catch(()=>{})},goToTop:()=>{o?.set(0)}}};var os=u.createStore({currentId:()=>({value:"",type:String})});var Bx=t=>t?[...t].reduce((e,r)=>`${e}.${r}`,""):"",Vx=t=>Object.keys(t).reduce((e,r)=>`${e} ${r},`,""),Wk=t=>Object.entries(t).map(([e,r])=>g`<div>
                <strong>${e}:</strong>
                ${r.map(o=>g`${o}, `).join(".")}
            </div>`).join(""),jk=t=>t?t.map(e=>`${e}, `).join(""):"",Wx=t=>Object.entries(t).map(([e,r])=>g`<div>
                <strong>${e}:</strong>
                ${JSON.stringify(r)}
            </div>`).join(""),zk=({getState:t})=>{let{id:e}=t();if(e===rs)return"";let r=m.componentMap.get(e);return r?g`<div>
        <!-- Basic props -->
        <div><strong>id</strong>: ${e}</div>
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
    </div>`:"component not found"},Hk=({getRef:t})=>{let{screen:e,scroller:r,scrollbar:o}=t();o.addEventListener("input",()=>{c(o.value)});let n=ur({screen:e,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},jx=({onMount:t,addMethod:e,getState:r,invalidate:o,setRef:n,getRef:s,watch:i,getProxi:a,emit:c})=>{let l=a();e("updateId",h=>{l.id=h,os.set("currentId",h)}),e("refreshId",()=>{c(()=>l.id)});let p;return t(()=>{let{destroy:h,updateScroller:f,move:d,refresh:v}=Hk({getRef:s});return p=d,i(()=>l.id,async()=>{await m.tick(),v(),f(),p(0)}),()=>{h?.()}}),g`<div class="c-debug-component" ${n("screen")}>
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
    </div>`};var zx=m.createComponent({tag:"debug-component",component:jx,state:{id:()=>({value:rs,type:String,skipEqual:!1})}});var Hx=t=>{m.useMethodByName(yc)?.refreshList?.({testString:t})};var Ip=async(t="")=>{await m.tick(),Hx(t)},Ux=({onMount:t,setRef:e,getRef:r,delegateEvents:o})=>(t(()=>(Ip(),()=>{r()?.input.remove()})),g`<div class="c-debug-filter-head">
        <span class="c-debug-filter-head__title">Filter by tag</span>
        <input
            type="text"
            class="c-debug-filter-head__input"
            value=""
            ${e("input")}
            ${o({keydown:n=>{if(n.code.toLowerCase()==="enter"){n.preventDefault();let s=n.currentTarget.value;Ip(s)}}})}
        />
        <button
            class="c-debug-filter-head__button"
            type="button"
            ${o({click:()=>{let{input:n}=r(),s=n.value;Ip(s)}})}
        >
            find
        </button>
    </div>`);var Gx=m.createComponent({tag:"debug-filter-head",component:Ux});var Uk=async({getRef:t})=>{await m.tick();let{screen:e,scroller:r,scrollbar:o}=t(),n=ur({screen:e,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},qx=t=>`~${t}`,Gk=({testString:t})=>{let e=t.replaceAll("~","").split(" ").filter(r=>r!=="")??"";return(()=>{let r=[];for(let o of m.componentMap.values())e.every(s=>o.componentName.includes(s))&&r.push(o);return r})().map(({id:r,componentName:o,instanceName:n})=>({id:r,active:!1,tag:(()=>{let s=e.reduce((i,a,c)=>i.replaceAll(new RegExp(`(?<!~)${a.toLowerCase()}`,"g"),`${qx(c)}`),o);return e.reduce((i,a,c)=>i.replaceAll(`${qx(c)}`,`<span class="match-string">${a}</span>`),s)})(),name:n}))},Jx=({onMount:t,setRef:e,getRef:r,addMethod:o,repeat:n,staticProps:s,bindProps:i,bindEffect:a,getProxi:c,computed:l})=>{let p=c(),h=()=>{},f=()=>{},d=()=>{},v=()=>{};return l(()=>p.noResult,()=>p.data.length===0&&!p.isLoading),o("refreshList",async({testString:y})=>{p.isLoading=!0,await m.tick(),u.useNextTick(async()=>{p.data=Gk({testString:y}),await m.tick(),d?.(),v?.(),p.isLoading=!1})}),t(()=>{let{scrollbar:y}=r();return y.addEventListener("input",()=>{f(y.value)}),(async()=>({destroy:h,move:f,refresh:d,updateScroller:v}=await Uk({getRef:r})))(),()=>{h?.(),h=()=>{},d=()=>{},v=()=>{},f=()=>{}}}),g`
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
    `};var pr=t=>{m.useMethodByName(li)?.updateId(t)},Yx=()=>{m.useMethodByName(li)?.refreshId()};var Xx=({delegateEvents:t,bindText:e,bindEffect:r,getProxi:o,computed:n})=>{let s=o();return n(()=>s.active,()=>s.id===s.currentId),g`
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
                ${t({click:()=>{pr(s.id)}})}
            >
                [ > ]
            </button>
            <span
                class="c-debug-tree-item__selected"
                ${r({toggleClass:{active:()=>s.active}})}
            ></span>
        </div>
    `};var Kx=m.createComponent({tag:"debug-filter-list-item",component:Xx,bindStore:os,props:{id:()=>({value:"",type:String}),tag:()=>({value:"",type:String}),name:()=>({value:"",type:String})},state:{active:()=>({value:!1,type:Boolean})}});var Qx=m.createComponent({tag:"debug-filter-list",component:Jx,state:{data:()=>({value:[],type:Array}),isLoading:()=>({value:!0,type:Boolean}),noResult:()=>({value:!1,type:Boolean})},child:[Kx]});var Zx=({invalidate:t,getProxi:e})=>{let r=e();return g`<div class="c-debug-head">
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
    </div>`};var e0=({setRef:t,getRef:e,delegateEvents:r})=>g`<div class="c-debug-search">
        <div>
            <span class="c-debug-search__label">
                <strong>Search by ID:</strong>
            </span>
            <input
                class="c-debug-search__input"
                type="text"
                ${t("id_input")}
                ${r({keydown:o=>{if(o.code.toLowerCase()==="enter"){o.preventDefault();let n=o.currentTarget.value;pr(n??"")}}})}
            />
            <button
                class="c-debug-search__button"
                type="button"
                ${r({click:()=>{let{id_input:o}=e(),n=o.value;pr(n??"")}})}
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
                ${r({keydown:o=>{if(o.code.toLowerCase()==="enter"){o.preventDefault();let n=o.currentTarget.value,s=m.getIdByInstanceName(n);pr(s??"")}}})}
            />
            <button
                class="c-debug-search__button"
                type="button"
                ${r({click:()=>{let{instance_input:o}=e(),n=o.value,s=m.getIdByInstanceName(n);pr(s??"")}})}
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
                    ${r({click:()=>{let{instance_input:o,id_input:n}=e();o.value="",n.value="",pr(rs)}})}
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
    </div>`;var t0=m.createComponent({tag:"debug-search",component:e0});var r0=m.createComponent({tag:"debug-head",component:Zx,props:{active:()=>({value:!1,type:Boolean})},state:{shouldUpdate:()=>({value:!0,type:Boolean,skipEqual:!1})},child:[t0]});var Gc=()=>{m.mainStore.debugStore(),console.log("componentMap",m.componentMap),console.log("Tree structure:",m.getTree()),console.log("bindEventMap",_n),console.log("currentListValueMap",Es),console.log("activeRepeatMap",Cn),console.log("onMountCallbackMap",Is),console.log("staticPropsMap",En),console.log("dynamicPropsMap",yt),console.log("eventDelegationMap",m.eventDelegationMap),console.log("tempDelegateEventMap",m.tempDelegateEventMap),console.log("invalidateIdHostMap",qr.size),console.log("invalidateIdsMap",tt),console.log("invalidateInstancesMap",Te),console.log("repeatIdHostMap",Hr),console.log("repeatIdsMap",rt),console.log("repeatInstancesMap",J),console.log("userChildPlaceholderSize",ld()),console.log("slotPlaceholderSize",ea()),console.log("bindTextPlaceholderMapSize",$d()),console.log("instanceMap",jr)};var o0=({delegateEvents:t,addMethod:e,bindProps:r,invalidate:o,bindEffect:n,getProxi:s,onMount:i})=>{let a=s();return e("toggle",()=>{a.active=!a.active}),i(()=>{let c=m.beforeRouteChange(()=>{a.active=!1,a.listType=lr});return()=>{c()}}),g`<div
        class="c-debug-overlay"
        ${n({toggleClass:{active:()=>a.active}})}
    >
        <button
            class="c-debug-overlay__background"
            type="button"
            ${t({click:()=>{a.active=!1,a.listType=lr}})}
        ></button>
        <button
            type="button"
            class="c-debug-overlay__close"
            ${t({click:()=>{a.active=!1,a.listType=lr}})}
        ></button>
        <div class="c-debug-overlay__grid">
            <button
                type="button"
                class="c-debug-overlay__log"
                ${t({click:()=>{Gc()}})}
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
                            ${t({click:()=>{a.listType=lr}})}
                            ${n({toggleClass:{active:()=>a.listType===lr}})}
                        >
                            Tree
                        </button>
                        <button
                            type="button"
                            class="c-debug-overlay__list__toggle"
                            ${t({click:()=>{a.listType=Ti}})}
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
    </div>`};var qc=({data:t,staticProps:e})=>t.map(({id:r,componentName:o,instanceName:n,children:s})=>g`<debug-tree-item
                ${e({id:r,componentName:o,instanceName:n,children:s})}
            ></debug-tree-item>`).join("");var qk=async({getRef:t})=>{await m.tick();let{screen:e,scroller:r,scrollbar:o}=t(),n=ur({screen:e,scroller:r,scrollbar:o}),s=n.destroy,i=n.refresh,a=n.move,c=n.updateScroller;return n.init(),c(),a(0),{destroy:s,refresh:i,move:a,updateScroller:c}},n0=({onMount:t,invalidate:e,staticProps:r,setRef:o,getRef:n,addMethod:s,bindEffect:i,getProxi:a})=>{let c=a(),l=()=>{},p=()=>{},h=()=>{},f=()=>{};return t(()=>{let{scrollbar:d}=n();return d.addEventListener("input",()=>{f(d.value)}),s("refresh",()=>{p?.(),h?.()}),(async()=>(c.isLoading=!0,await m.tick(),l?.(),c.data=m.getTree(),{destroy:l,move:f,refresh:p,updateScroller:h}=await qk({getRef:n}),c.isLoading=!1))(),()=>{l?.(),l=()=>{},p=()=>{},h=()=>{},f=()=>{}}}),g`
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
                    ${e({observe:()=>c.data,render:()=>qc({data:c.data,staticProps:r})})}
                </div>
            </div>
        </div>
    `};var s0=()=>{m.useMethodByName(_c)?.refresh()};var Jk=t=>t>0?`( ${t} ) `:"",i0=({id:t,value:e})=>{let o=m.componentMap.get(t)?.child;if(!o)return!1;let n=Object.values(o).flat();return n.includes(e)?!0:n.some(i=>i0({id:i,value:e}))},a0=({onMount:t,staticProps:e,getRef:r,setRef:o,delegateEvents:n,watch:s,bindEffect:i,getProxi:a,computed:c})=>{let l=a(),p=l.children.length>0?"has-children":"";return c(()=>l.isActive,()=>l.id===l.currentId),c(()=>l.hasActiveChildren,()=>i0({id:l.id,value:l.currentId})),t(()=>{let{content:h}=r(),f=Pr.subscribe(h);return Pr.reset(h),s(()=>l.isOpen,async d=>{await Pr[d?"down":"up"](h),s0()}),()=>{f()}}),g`<div class="c-debug-tree-item">
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
            ${qc({data:l.children,staticProps:e})}
        </div>
    </div>`};var c0=m.createComponent({tag:"debug-tree-item",component:a0,bindStore:os,props:{id:()=>({value:"",type:String}),componentName:()=>({value:"",type:String}),instanceName:()=>({value:"",type:String}),children:()=>({value:[],type:Array})},state:{isOpen:()=>({value:!1,type:Boolean}),isActive:()=>({value:!1,type:Boolean}),hasActiveChildren:()=>({value:!1,type:Boolean})}});var l0=m.createComponent({tag:"debug-tree",component:n0,state:{data:()=>({value:[],type:Array}),isLoading:()=>({value:!1,type:Boolean})},child:[c0]});var u0=m.createComponent({tag:"debug-overlay",component:o0,state:{active:()=>({value:!1,type:Boolean}),listType:()=>({value:lr,type:String})},child:[l0,zx,r0,Gx,Qx]});var Mp=()=>{},Jc=()=>{},Yc=()=>{},Xc=()=>{},Yk=({staticProps:t,bindProps:e,proxi:r})=>r.data.map(o=>{let{label:n,url:s,isLabel:i}=o;return i?g`<p class="c-params-mobjs__label">${n}</p>`:g`<li>
                      <links-mobjs-button
                          ${t({label:n,url:s})}
                          ${e(()=>({active:r.activeSection===s}))}
                      ></links-mobjs-button>
                  </li>`}).join(""),p0=({staticProps:t,setRef:e,getRef:r,onMount:o,bindProps:n,invalidate:s,bindEffect:i,getProxi:a})=>{let c=ar(),l=a(),p={[Q]:c.sideBarLinks.mobJsComponentParams};return o(()=>{let{screenEl:h,scrollerEl:f,scrollbar:d}=r(),v=!1;d.addEventListener("input",()=>{Yc?.(d.value)}),ee.watch("navigationIsOpen",T=>{let{templateName:S}=m.getActiveRoute();S in p&&(l.shift=T)});let y=m.afterRouteChange(async({currentTemplate:T,currentRoute:S})=>{let _=p?.[T]??[];if(l.data=_,await m.tick(),l.activeSection=S,_.length>0){if(l.hide=!1,v){Xc();return}({init:Mp,destroy:Jc,move:Yc,updateScroller:Xc}=ur({screen:h,scroller:f,scrollbar:d})),v=!0,Mp(),Xc(),Yc(0)}_.length===0&&(l.hide=!0,Jc?.(),v=!1)});return()=>{Jc?.(),y(),Mp=()=>{},Jc=()=>{},Yc=()=>{},Xc=()=>{}}}),g`<div
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
            ${s({observe:()=>l.data,render:()=>Yk({staticProps:t,bindProps:n,proxi:l})})}
        </ul>
    </div>`};var m0=({getProxi:t,bindEffect:e})=>{let r=t();return g` <a
        href="./#${r.url}"
        ${e({toggleClass:{current:()=>r.active}})}
        ><span>${r.label}</span></a
    >`};var h0=m.createComponent({tag:"links-mobjs-button",component:m0,props:{label:()=>({value:"",type:String}),url:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean})}});var d0=m.createComponent({tag:"links-mobjs",component:p0,child:[h0],state:{data:()=>({value:[],type:Array}),activeSection:()=>({value:"",type:String}),hide:()=>({value:!0,type:Boolean}),shift:()=>({value:!1,type:Boolean})}});var f0=({getProxi:t,bindEffect:e,addMethod:r,setRef:o,getRef:n,onMount:s,watch:i})=>{let a=t();r("update",(l,p)=>{a[l]=p});let c=U.createTimeTween({data:{y:0,yContainer:100},duration:300,ease:"easeOutQuad"});return i(()=>a.currentLabelId,l=>{if(l===-1){c.goTo({yContainer:100});return}c.goTo({y:100/3*-l,yContainer:0})}),s(({element:l})=>{let{back:p,next:h,previous:f,labelList:d,labels:v}=n();return c.subscribe(({y,yContainer:T})=>{d.style.transform=`translateY(${y}%)`,v.style.transform=`translateY(${T}%)`}),l.addEventListener("mouseleave",()=>{a.currentLabelId=-1}),f.addEventListener("mouseenter",()=>{a.currentLabelId=0}),p.addEventListener("mouseenter",()=>{a.currentLabelId=1}),h.addEventListener("mouseenter",()=>{a.currentLabelId=2}),()=>{c.destroy(),c=null,f=null,p=null,h=null,d=null,v=null}}),g`<div
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
    </div>`};var g0=m.createComponent({tag:"quick-nav",component:f0,state:{active:()=>({value:!1,type:Boolean}),backRoute:()=>({value:"",type:String}),prevRoute:()=>({value:"",type:String}),nextRoute:()=>({value:"",type:String}),currentLabelId:()=>({value:-1,type:Number})}});var Xk=({proxi:t,bindEffect:e})=>t.data.map(({label:r,url:o})=>{let n=o.replaceAll("#","");return g`
                <li class="right-sidebar__item">
                    <a
                        href="${o}"
                        class="right-sidebar__link"
                        ${e({toggleClass:{active:()=>t.activeRoute.route===n}})}
                        >${r}</a
                    >
                </li>
            `}).join(""),b0=({getProxi:t,invalidate:e,addMethod:r,computed:o,bindEffect:n})=>{let s=t();return r("updateList",i=>{s.data=i}),m.afterRouteChange(({currentTemplate:i})=>{Hc.has(i)||(s.data=[])}),o(()=>s.isVisible,()=>s.data.length>0),g`<div
        class="right-sidebar"
        ${n({toggleClass:{visible:()=>s.isVisible}})}
    >
        <div class="right-sidebar__title">Sections:</div>
        <ul class="right-sidebar__list">
            ${e({observe:()=>s.data,render:()=>Xk({proxi:s,bindEffect:n})})}
        </ul>
    </div>`};var v0=m.createComponent({tag:"right-sidebar",component:b0,bindStore:[m.mainStore],state:{data:()=>({value:[],type:Array}),isVisible:()=>({value:!1,type:Boolean})}});var y0=({onMount:t,getProxi:e,bindEffect:r,addMethod:o})=>{let n=e();return o("skip",()=>{n.skip=!1}),t(({element:s})=>{n.isDisable=!0;let i=U.createTimeTween({data:{opacity:1,scale:1},duration:500});i.subscribe(({opacity:l,scale:p})=>{s.style.opacity=l,s.style.transform=`scale(${p})`});let a=m.beforeRouteChange(async()=>{n.skip||(n.isDisable=!1,await i.set({opacity:1}),i.goTo({scale:1}))}),c=m.afterRouteChange(async()=>{await i.goTo({opacity:0,scale:.9}).catch(()=>{}),n.isDisable=!0});return()=>{i.destroy(),i=null,a(),c()}}),g`
        <div
            class="c-loader center-viewport"
            ${r({toggleClass:{disable:()=>n.isDisable}})}
        >
            <span class="c-loader__inner"></span>
        </div>
    `};var T0=m.createComponent({tag:"route-loader",component:y0,state:{isLoading:()=>({value:!1,type:Boolean}),isDisable:()=>({value:!1,type:Boolean}),skip:()=>({value:!0,type:Boolean})}});var _0=({getProxi:t,bindEffect:e,addMethod:r})=>{let o=t();return r("update",n=>{o.active=n}),g`
        <h3
            class="c-scroller-down-label"
            ${e({toggleClass:{active:()=>o.active}})}
        >
            Scroll down
        </h3>
    `};var S0=m.createComponent({tag:"scroll-down-label",component:_0,state:{active:()=>({value:!1,type:Boolean})}});var x0=()=>{m.useMethodByName(Ho)?.setInputFocus()},kp=t=>{m.useMethodByName(Ho)?.updateCurrentSearchFromSuggestion(t)},C0=t=>{m.useMethodByName(Ho)?.shouldCloseSuggestion(t)},Kc=()=>{m.useMethodByName(Ho)?.closeSuggestion()};var E0=({proxi:t})=>{t.active=!1,Kc()},Kk=({target:t})=>{t&&C0(t)},w0=({getProxi:t,delegateEvents:e,bindEffect:r,addMethod:o,bindObject:n,staticProps:s})=>{let i=t();return o("toggle",()=>{i.active=!i.active}),g`<div
        class="search-overlay"
        ${r({toggleClass:{active:()=>i.active}})}
    >
        <button
            class="search-overlay__background"
            type="button"
            ${e({click:()=>{E0({proxi:i})}})}
        ></button>
        <button
            type="button"
            class="search-overlay__close"
            ${e({click:()=>{E0({proxi:i})}})}
        ></button>

        <!-- Main content -->
        <div
            class="search-overlay__grid"
            ${e({click:a=>{Kk({target:a.target})}})}
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
    </div>`};var I0=t=>{m.useMethodByName(di)?.update(t)},M0=()=>{m.useMethodByName(di)?.reset()};var Qk=async({currentSearch:t})=>{I0(t)},Rp=({getRef:t})=>{let{search_input:e}=t(),r=e.value;Qk({currentSearch:r})},k0=({getRef:t,proxi:e})=>{M0();let{search_input:r}=t();r.value="",e.suggestionListData=[]},R0=t=>`~${t}`,Zk=({currentSearch:t,proxi:e})=>{let o=ar().suggestion;t.length===0&&(e.suggestionListData=[]);let s=t.split(" ").slice(-1).join("").replaceAll("~","").split(" ").filter(i=>i!=="")??"";e.suggestionListData=(o.filter(({word:i})=>s.some(a=>i.toLowerCase().includes(a.toLowerCase())))??[]).map(({word:i})=>({word:i,wordHiglight:(()=>{let a=s.reduce((c,l,p)=>c.toLowerCase().replaceAll(new RegExp(`(?<!~)${l.toLowerCase()}`,"g"),`${R0(p)}`),i);return s.reduce((c,l,p)=>c.replaceAll(`${R0(p)}`,`<span class="match-string">${l}</span>`),a)})()}))},N0=({delegateEvents:t,getRef:e,setRef:r,getProxi:o,bindProps:n,addMethod:s,onMount:i,computed:a,bindEffect:c})=>{let l=o();return a(()=>l.suggestionListActive,()=>l.suggestionListData.length>0),i(()=>{let{search_input:p,suggestionElement:h}=e();s("updateCurrentSearchFromSuggestion",f=>{let v=p.value.split(" "),y=v.length===0?f:`${v.slice(0,-1).join(" ")} ${f}`;p.value=y.trimStart(),l.suggestionListData=[],p.focus()}),s("shouldCloseSuggestion",f=>{h!==f&&!h.contains(f)&&(l.suggestionListData=[])}),s("closeSuggestion",()=>{l.suggestionListData=[]}),s("setInputFocus",async()=>{setTimeout(()=>{p.focus()},300)})}),g`<div class="search-overlay-header">
        <div class="search-overlay-header__input-container">
            <input
                type="text"
                class="search-overlay-header__input"
                ${r("search_input")}
                ${t({keyup:u.useDebounce(p=>{if(p.code.toLowerCase()==="enter"){p.preventDefault(),Rp({getRef:e,proxi:l}),l.suggestionListData=[];return}if(p.code.toLowerCase()==="escape"){p.preventDefault(),l.suggestionListData=[];return}let h=p.currentTarget.value;Zk({currentSearch:h,proxi:l})},60)})}
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
            ${t({click:()=>{Rp({getRef:e,proxi:l})},keydown:p=>{p.code.toLowerCase()==="enter"&&Rp({getRef:e,proxi:l})}})}
        >
            submit
        </button>

        <!-- Reset -->
        <button
            type="button"
            class="search-overlay-header__button"
            ${t({click:()=>{k0({getRef:e,proxi:l})},keydown:p=>{p.code.toLowerCase()==="enter"&&k0({getRef:e,proxi:l})}})}
        >
            reset
        </button>
    </div>`};var P0=({getProxi:t,repeat:e,bindProps:r})=>{let o=t();return g`<div>
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
    </div>`};var eR=({code:t,word:e})=>{if(t.toLowerCase()==="enter"){kp(e);return}if(t.toLowerCase()==="escape"){Kc();return}},A0=({getProxi:t,delegateEvents:e,bindObject:r})=>{let o=t();return g`
        <li class="search-overlay-suggestion__item">
            <button
                type="button"
                class="search-overlay-suggestion__button"
                ${e({click:()=>{kp(o.word)},keydown:n=>{n.preventDefault(),eR({code:n.code,word:o.word})}})}
            >
                ${r`${()=>o.wordHiglight}`}
            </button>
        </li>
    `};var O0=m.createComponent({tag:"search-overlay-suggestion-item",component:A0,props:{word:()=>({value:"",type:String}),wordHiglight:()=>({value:"",type:String})}});var $0=m.createComponent({tag:"search-overlay-suggestion",component:P0,props:{list:()=>({value:[],type:Array})},child:[O0]});var L0=m.createComponent({tag:"search-overlay-header",component:N0,state:{suggestionListActive:()=>({value:!1,type:Boolean}),suggestionListData:()=>({value:[],type:Array})},child:[$0]});var tR=async({source:t,uri:e,title:r,section:o,breadCrumbs:n})=>{let s=await fetch(t);return s.ok?{success:!0,data:(await s.json()).data,uri:e,title:r,section:o,breadCrumbs:n}:(console.warn(`${t} not found`),{success:!1,data:[{component:"",props:{}}],uri:e,title:r,section:o,breadCrumbs:[]})},rR=new Set(["mob-title","mob-paragraph","mob-list"]),oR=new Set(["mob-title","mob-paragraph"]),nR=new Set(["mob-list"]),D0=async({currentSearch:t=""})=>{let e=Uc.filter(({props:a})=>a?.source&&a?.title).map(({hash:a,props:c})=>({fn:tR({source:c.source??"",uri:a??"uri not forud",title:c.title??"title not found",section:c.section??"title not found",breadCrumbs:c.breadCrumbs??[]})})),r=await Promise.all(e.map(({fn:a})=>a)),o=[],n=r.filter(({success:a})=>a).map(({data:a,uri:c,title:l,section:p,breadCrumbs:h})=>{let v=a.reduce((y,T)=>{if(!T)return y;let{component:S}=T;return S?T.component==="html-content"?T?.props?.data?[...y,T.props.data]:y:[...y,T]:y},o).flat().filter(({component:y})=>rR.has(y)).flatMap(y=>oR.has(y?.component)?y.content:nR.has(y?.component)?y?.props?.links?y.props.items.map(({label:T})=>T):y.props.items:y);return{uri:c,title:l,section:p,breadCrumbs:h,data:v}}),s=t.split(" ");return n.filter(a=>{let c=a.data.join(" ");return s.every(l=>c.toLowerCase().includes(l.toLowerCase()))}).toSorted(a=>a.title.toLowerCase().includes(t.toLowerCase())?-1:1).map(({title:a,uri:c,section:l,breadCrumbs:p,data:h})=>{let f=h.join("").toLowerCase().split(t.toLowerCase()),d=p.length>0?p.reduce((v,y,T)=>{let S=T>0?"/":"";return`${v}${S}${y.title}`},""):a;return{title:a,uri:c,section:l,breadCrumbs:d,count:f?.length??0}})};var sR=({getRef:t})=>{let{screen:e,scroller:r,scrollbar:o}=t();o.addEventListener("input",()=>{c(o.value)});let n=ur({screen:e,scroller:r,scrollbar:o}),s=n.init,i=n.destroy,a=n.refresh,c=n.move,l=n.updateScroller;return s(),l(),c(0),{destroy:i,move:c,refresh:a,updateScroller:l}},F0=({getProxi:t,repeat:e,setRef:r,getRef:o,onMount:n,watch:s,addMethod:i,bindEffect:a,invalidate:c,bindProps:l})=>{let p=t();i("update",async f=>{p.loading||(p.loading=!0,p.noResult=!1,p.list=await D0({currentSearch:f}),p.loading=!1,p.noResult=p.list.length===0,p.updatePrentSearchKey(f))}),i("reset",()=>{p.updatePrentSearchKey(""),p.list=[]});let h;return n(()=>{let{destroy:f,updateScroller:d,move:v,refresh:y}=sR({getRef:o});return h=v,s(()=>p.list,async()=>{await m.tick(),y(),d(),h(0)}),()=>{f?.()}}),g`<div class="search-overlay-list" ${r("screen")}>
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
    </div>`};var Qc=()=>{m.useMethodByName(xc)?.toggle()};var iR=({uri:t})=>{m.loadUrl({url:t}),Qc()},B0=({getProxi:t,bindEffect:e,delegateEvents:r,bindObject:o})=>{let n=t();return g`
        <li
            class="search-overlay-list__item"
            ${e({toggleClass:{current:()=>n.active}})}
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
    `;var H0=m.createComponent({tag:"test-scss-grid",component:z0});var vo=()=>{let{templateName:t}=m.getActiveRoute();return Hc.has(t)?0:40};var U0=()=>{m.useMethodByName(Tc)?.toggle()};var aR=["Alberto Navarro","Milan, Italy",'<a href="https://github.com/albnavarro/" target="_blank">[ github ]</a>','<a href="https://www.linkedin.com/in/alberto-navarro74/" target="_blank">[ linkedin ]</a>'],cR=()=>g`
        <ul class="l-footer__bio">
            ${aR.map(t=>g` <li class="l-footer__bio__item">${t}</li> `).join("")}
        </ul>
    `,G0=({delegateEvents:t,getProxi:e,onMount:r,bindEffect:o})=>{let n=e();return r(()=>{u.useFrameIndex(()=>{n.isMounted=!0},vo())}),g`
        <footer
            class="l-footer"
            ${o({toggleClass:{"is-visible":()=>n.isMounted}})}
        >
            <div class="l-footer__container">
                ${cR()}
                <div class="l-footer__debug">
                    <debug-button
                        class="c-button-debug"
                        ${t({click:()=>{U0()}})}
                    >
                        Debug App</debug-button
                    >
                    <debug-button
                        class="c-button-console"
                        ${t({click:()=>{Gc()}})}
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
    `;var J0=m.createComponent({tag:"debug-button",component:q0});var Y0=m.createComponent({tag:"mob-footer",component:G0,child:[J0],state:{isMounted:()=>({value:!1,type:Boolean})}});var Zc=()=>{m.useMethodByName(hi)?.scrollTop()},el=()=>{m.useMethodByName(hi)?.refresh()};var ns=({fireCallback:t=!0}={})=>{m.useMethodByName(Sc)?.closeAllAccordion({fireCallback:t})};function lR(){m.loadUrl({url:"home"}),ns(),ee.set("navigationIsOpen",!1),Zc()}var X0=({delegateEvents:t,bindEffect:e,getProxi:r,onMount:o,addMethod:n})=>{let s=r();return o(({element:i})=>{n("getHeaderHeight",()=>le(i)),u.useFrameIndex(()=>{s.isMounted=!0},vo())}),g`
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
                        ${t({click:()=>{lR()}})}
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
    `};var K0=({delegateEvents:t,bindEffect:e,getProxi:r,onMount:o})=>{let n=r();return o(()=>{u.useFrameIndex(()=>{n.isMounted=!0},vo())}),g`
        <button
            class="hamburger"
            type="button"
            ${t({click:()=>{ee.update("navigationIsOpen",s=>!s),n.navigationIsOpen||Ht()}})}
            ${e([{toggleClass:{"is-open":()=>n.navigationIsOpen}},{toggleClass:{"is-mounted":()=>n.isMounted}}])}
        >
            <div class="hamburger__box">
                <div class="hamburger-inner"></div>
            </div>
        </button>
    `};var Q0=m.createComponent({tag:"mob-header-toggle",component:K0,bindStore:ee,state:{isMounted:()=>({value:!1,type:Boolean})}});var uR=({event:t})=>{let e=t.target;console.log(e);let{url:r}=e?.dataset??"";m.loadUrl({url:r}),ee.set("navigationIsOpen",!1)};function pR({delegateEvents:t}){let e=ar().header,{links:r}=e,o={github:Gn().gitHubIcon};return r.map(n=>{let{svg:s,url:i,internal:a}=n;return g`<li class="l-header__sidenav__item">
                ${a?g`
                          <button
                              type="button"
                              data-url="${i}"
                              class="l-header__sidenav__link"
                              ${t({click:c=>{uR({event:c})}})}
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
            </li>`}).join("")}var Z0=({delegateEvents:t})=>g`
        <ul class="l-header__sidenav">
            <li class="l-header__sidenav__item">
                <search-cta></search-cta>
            </li>
            ${pR({delegateEvents:t})}
        </ul>
    `;var mR=()=>{Qc(),x0()},eC=({delegateEvents:t})=>{let e=Gn().searchIcons;return g`<button
        type="button"
        class="search-cta"
        ${t({click:()=>{mR()}})}
    >
        ${e}
    </button>`};var tC=m.createComponent({tag:"search-cta",component:eC});var rC=m.createComponent({tag:"mob-header-utils",component:Z0,child:[tC]});var hR=({delegateEvents:t,staticProps:e})=>ar().footer.nav.map(({label:o,url:n,section:s})=>g`<li class="header-main-menu__item">
                <header-main-menu-button
                    ${t({click:()=>{m.loadUrl({url:n}),ee.set("navigationIsOpen",!1)}})}
                    ${e({label:o,section:s})}
                ></header-main-menu-button>
            </li> `).join(""),oC=({delegateEvents:t,staticProps:e,getProxi:r,onMount:o,bindEffect:n})=>{let s=r();return o(()=>{u.useFrameIndex(()=>{"isMounted"in s&&(s.isMounted=!0)},10)}),g`
        <ul
            class="header-main-menu"
            ${n({toggleClass:{"is-visible":()=>s.isMounted}})}
        >
            ${hR({delegateEvents:t,staticProps:e})}
        </ul>
    `};var nC=({getProxi:t,bindEffect:e,computed:r})=>{let o=t();return r(()=>o.active,()=>o.section===o.activeNavigationSection),g`
        <button
            type="button"
            class="header-main-menu__button"
            ${e({toggleClass:{current:()=>o.active}})}
        >
            ${o.label}
        </button>
    `};var sC=m.createComponent({tag:"header-main-menu-button",component:nC,bindStore:ee,props:{label:()=>({value:"",type:String}),section:()=>({value:"",type:String})},state:{active:()=>({value:!1,type:Boolean})}});var iC=m.createComponent({tag:"header-main-menu",component:oC,child:[sC],state:{isMounted:()=>({value:!1,type:Boolean})}});var aC=m.createComponent({tag:"mob-header",component:X0,state:{isMounted:()=>({value:!1,type:Boolean})},child:[iC,rC,Q0]});var Np=0,cC=({root:t})=>{let e=t.querySelector(".l-navcontainer__wrap"),r=t.querySelector(".l-navcontainer__scroll"),o=t.querySelector(".l-navcontainer__percent"),n=200,s=new _t({screen:e,scroller:r,direction:"vertical",drag:!0,scopedEvent:!1,onUpdate:({percent:i})=>{let{navigationIsOpen:a}=ee.get();a&&(Np=Math.round(i)/100,o.style.transform=`translateZ(0) scaleX(${Np})`)}});return s.init(),ee.watch("activeNavigationSection",i=>{let a=document.querySelector(`[data-sectionname='${i}']`);if(!a)return;let c=document.querySelector(".l-header"),l=document.querySelector(".l-footer"),p=le(r),h=le(c),f=le(l),v=100*a.offsetTop/(p-window.innerHeight+h+f);setTimeout(()=>{ee.getProp("navigationIsOpen")||s.set(v)},400)}),ee.watch("navigationIsOpen",i=>{if(i){o.style.transform=`translateZ(0) scaleX(${Np})`;return}o.style.transform="translateZ(0) scaleX(0)"}),{scrollNativationToTop:()=>{setTimeout(()=>{s.move(0).catch(()=>{}),o.style.transform="translateZ(0) scaleX(0)"},n)},refreshScroller:()=>{s.refresh()}}};function dR({main:t,proxi:e}){e.isOpen=!1,u.useFrame(()=>{document.body.style.overflow="",t.classList.remove("shift")})}function fR({main:t,proxi:e}){el(),e.isOpen=!0,u.useFrame(()=>{document.body.style.overflow="hidden",t.classList.add("shift")})}function gR({main:t}){t.addEventListener("click",()=>{ee.set("navigationIsOpen",!1),Ht()})}var bR=()=>{Zc(),ns();let{navigationIsOpen:t}=ee.get();t||Nr.to(0)},lC=({onMount:t,addMethod:e,delegateEvents:r,bindEffect:o,getProxi:n})=>{let s=n();return t(({element:i})=>{let a=document.querySelector("main.main");ee.watch("navigationIsOpen",p=>{if(p&&a){fR({main:a,proxi:s});return}dR({main:a,proxi:s})}),gR({main:a});let{scrollNativationToTop:c,refreshScroller:l}=cC({root:i});return e("scrollTop",c),e("refresh",l),u.useFrameIndex(()=>{s.isMounted=!0},vo()),()=>{}}),g`
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
    `};function vR({data:t,staticProps:e,bindProps:r,proxi:o}){return t.map((n,s)=>{let{label:i,url:a,activeId:c,children:l,section:p,sectioName:h,scrollToSection:f,forceChildren:d,hide:v}=n;return p?g`
                    <mob-navigation-label
                        ${e({label:i,sectioName:h,hide:!!v})}
                    ></mob-navigation-label>
                `:l?g`
                      <mob-navigation-submenu
                          ${e({headerButton:{label:i,url:a,id:s},children:l,callback:({forceClose:y=!1})=>{if(y){o.currentAccordionId=-1;return}o.currentAccordionId=s}})}
                          ${r(()=>({isOpen:o.currentAccordionId===s}))}
                      >
                      </mob-navigation-submenu>
                  `:g`
                      <li class="l-navigation__item">
                          <mob-navigation-button
                              ${e({label:i,url:a,scrollToSection:f??"no-scroll",activeId:c??-1,forceChildren:d??[]})}
                          ></mob-navigation-button>
                      </li>
                  `}).join("")}var uC=({staticProps:t,setState:e,bindProps:r,addMethod:o,getProxi:n})=>{let s=n(),{navigation:i}=ar();return o("closeAllAccordion",({fireCallback:a=!0}={})=>{e(()=>s.currentAccordionId,-1,{emit:a})}),g`
        <nav class="l-navigation">
            <ul class="l-navigation__list">
                ${vR({data:i,staticProps:t,bindProps:r,proxi:s})}
            </ul>
        </nav>
    `};var pC=({bindEffect:t,getProxi:e})=>{let r=e();return g`
        <div
            class="l-navigation__label"
            data-sectionname="${r.sectioName}"
            ${t({toggleClass:{active:()=>r.sectioName===r.activeNavigationSection,hide:()=>!!r.hide}})}
        >
            ${r.label}
        </div>
    `};var mC=m.createComponent({tag:"mob-navigation-label",component:pC,bindStore:ee,props:{label:()=>({value:"",type:String}),sectioName:()=>({value:"",type:String}),hide:()=>({value:!1,type:Boolean})}});function yR({proxi:t,staticProps:e}){return t.children.map(r=>{let{label:o,url:n,scrollToSection:s,activeId:i}=r;return g`
                <li class="l-navigation__submenu__item">
                    <mob-navigation-button
                        ${e({label:o,url:n,subMenuClass:"l-navigation__link--submenu",scrollToSection:s,activeId:i??-1,callback:()=>{t.callback({forceClose:!1})}})}
                    ></mob-navigation-button>
                </li>
            `}).join("")}var hC=({onMount:t,staticProps:e,bindProps:r,watch:o,setRef:n,getRef:s,getProxi:i})=>{let a=i(),{label:c,url:l,activeId:p}=a.headerButton;return t(()=>{let{content:h}=s();return Pr.subscribe(h),Pr.reset(h),o(()=>a.isOpen,async f=>{await Pr[f?"down":"up"](h),el(),!f&&ns({fireCallback:!1})},{immediate:!0}),()=>{}}),g`
        <li class="l-navigation__item has-child">
            <mob-navigation-button
                ${e({label:c,url:l,arrowClass:"l-navigation__link--arrow",fireRoute:!1,activeId:p??-1,callback:()=>{a.callback({forceClose:a.isOpen})}})}
                ${r(()=>({isOpen:a.isOpen}))}
            ></mob-navigation-button>
            <ul class="l-navigation__submenu" ${n("content")}>
                ${yR({proxi:a,staticProps:e})}
            </ul>
        </li>
    `};var dC=({delegateEvents:t,getProxi:e,bindEffect:r})=>{let o=e(),{label:n,url:s,arrowClass:i,subMenuClass:a,fireRoute:c,callback:l,scrollToSection:p,activeId:h,forceChildren:f}=o;return m.afterRouteChange(({currentRoute:d})=>{u.useFrame(()=>{let y=s.split("?")?.[0]??"",T=m.getActiveParams(),S=h===-1||T?.activeId===`${h}`,_=d===y&&S,w=f.includes(d);o.isCurrent=_||w,_&&c&&(l(),ee.set("activeNavigationSection",p))})}),g`
        <button
            type="button"
            class="l-navigation__link  ${i} ${a}"
            ${t({click:()=>{l(),c&&(m.loadUrl({url:s}),ee.set("navigationIsOpen",!1))}})}
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
    `;var Pp=0,Ap=document.querySelector(".js-main-loader-track"),yC=(t=60)=>{let e=()=>{if(Pp++,!Ap)return;let r=100*Pp/t;if(Ap.style.transform=`scaleX(${r/100})`,Pp>=t){Ap=null;return}u.useNextFrame(()=>{e()})};u.useFrame(()=>{e()})};var TC=t=>{m.useMethodByName(Ec).skip(t)};var _C=60,SC=()=>ue.mq("max","desktop"),TR=()=>{u.useResize(()=>{SC()&&m.loadUrl({url:"onlyDesktop"})})},ol=document.body.querySelector(".js-main-loader"),nl=document.body.querySelector(".js-main-loader-background"),rl=U.createTimeTween({data:{opacity:1},duration:1e3});ol&&nl&&[ol,nl].forEach(t=>{rl?.subscribe(({opacity:e})=>{t.style.opacity=e})});var _R=async()=>{await jy(),await zy(),yC(_C),await u.useFps({duration:_C,force:!0}),m.inizializeApp({rootId:"#root",contentId:"#content",wrapper:vC,routes:Uc,index:"home",pageNotFound:"pageNotFound",beforePageTransition:$x,pageTransition:Lx,afterInit:async()=>{await rl.goTo({opacity:0}),rl.destroy(),rl=null,ol?.remove(),nl?.remove(),ol=null,nl=null,Fx(),TR(),TC(!1)},redirect:({route:t})=>SC()?"onlyDesktop":t,restoreScroll:!0,componentDefaultProps:{scoped:!1,maxParseIteration:1e4,debug:!1}})};u.useLoad(()=>{Fy(),ue.setDefault({deferredNextTick:!0,throttle:100}),_R(),Dy()});})();
//# sourceMappingURL=main.js.map
