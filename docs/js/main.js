(()=>{var Nd=Object.create;var Qs=Object.defineProperty;var Md=Object.getOwnPropertyDescriptor;var Ld=Object.getOwnPropertyNames;var Fd=Object.getPrototypeOf,Vd=Object.prototype.hasOwnProperty;var Dd=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),Ri=(e,t)=>{for(var r in t)Qs(e,r,{get:t[r],enumerable:!0})},$d=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Ld(t))!Vd.call(e,s)&&s!==r&&Qs(e,s,{get:()=>t[s],enumerable:!(o=Md(t,s))||o.enumerable});return e};var Wd=(e,t,r)=>(r=e!=null?Nd(Fd(e)):{},$d(t||!e||!e.__esModule?Qs(r,"default",{value:e,enumerable:!0}):r,e));var ah=Dd((kA,ih)=>{function Jp(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{let r=e[t],o=typeof r;(o==="object"||o==="function")&&!Object.isFrozen(r)&&Jp(r)}),e}var Us=class{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}};function Yp(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function Gt(e,...t){let r=Object.create(null);for(let o in e)r[o]=e[o];return t.forEach(function(o){for(let s in o)r[s]=o[s]}),r}var Of="</span>",Bp=e=>!!e.scope,Nf=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){let r=e.split(".");return[`${t}${r.shift()}`,...r.map((o,s)=>`${o}${"_".repeat(s+1)}`)].join(" ")}return`${t}${e}`},di=class{constructor(t,r){this.buffer="",this.classPrefix=r.classPrefix,t.walk(this)}addText(t){this.buffer+=Yp(t)}openNode(t){if(!Bp(t))return;let r=Nf(t.scope,{prefix:this.classPrefix});this.span(r)}closeNode(t){Bp(t)&&(this.buffer+=Of)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}},zp=(e={})=>{let t={children:[]};return Object.assign(t,e),t},mi=class e{constructor(){this.rootNode=zp(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){let r=zp({scope:t});this.add(r),this.stack.push(r)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,r){return typeof r=="string"?t.addText(r):r.children&&(t.openNode(r),r.children.forEach(o=>this._walk(t,o)),t.closeNode(r)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(r=>typeof r=="string")?t.children=[t.children.join("")]:t.children.forEach(r=>{e._collapse(r)}))}},fi=class extends mi{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,r){let o=t.root;r&&(o.scope=`language:${r}`),this.add(o)}toHTML(){return new di(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}};function Oo(e){return e?typeof e=="string"?e:e.source:null}function Xp(e){return cr("(?=",e,")")}function Mf(e){return cr("(?:",e,")*")}function Lf(e){return cr("(?:",e,")?")}function cr(...e){return e.map(r=>Oo(r)).join("")}function Ff(e){let t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function bi(...e){return"("+(Ff(e).capture?"":"?:")+e.map(o=>Oo(o)).join("|")+")"}function Kp(e){return new RegExp(e.toString()+"|").exec("").length-1}function Vf(e,t){let r=e&&e.exec(t);return r&&r.index===0}var Df=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function yi(e,{joinWith:t}){let r=0;return e.map(o=>{r+=1;let s=r,n=Oo(o),i="";for(;n.length>0;){let a=Df.exec(n);if(!a){i+=n;break}i+=n.substring(0,a.index),n=n.substring(a.index+a[0].length),a[0][0]==="\\"&&a[1]?i+="\\"+String(Number(a[1])+s):(i+=a[0],a[0]==="("&&r++)}return i}).map(o=>`(${o})`).join(t)}var $f=/\b\B/,Zp="[a-zA-Z]\\w*",vi="[a-zA-Z_]\\w*",Qp="\\b\\d+(\\.\\d+)?",eh="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",th="\\b(0b[01]+)",Wf="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",jf=(e={})=>{let t=/^#![ ]*\//;return e.binary&&(e.begin=cr(t,/.*\b/,e.binary,/\b.*/)),Gt({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(r,o)=>{r.index!==0&&o.ignoreMatch()}},e)},No={begin:"\\\\[\\s\\S]",relevance:0},Bf={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[No]},zf={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[No]},Hf={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Gs=function(e,t,r={}){let o=Gt({scope:"comment",begin:e,end:t,contains:[]},r);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});let s=bi("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:cr(/[ ]+/,"(",s,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},Uf=Gs("//","$"),qf=Gs("/\\*","\\*/"),Gf=Gs("#","$"),Jf={scope:"number",begin:Qp,relevance:0},Yf={scope:"number",begin:eh,relevance:0},Xf={scope:"number",begin:th,relevance:0},Kf={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[No,{begin:/\[/,end:/\]/,relevance:0,contains:[No]}]},Zf={scope:"title",begin:Zp,relevance:0},Qf={scope:"title",begin:vi,relevance:0},eg={begin:"\\.\\s*"+vi,relevance:0},tg=function(e){return Object.assign(e,{"on:begin":(t,r)=>{r.data._beginMatch=t[1]},"on:end":(t,r)=>{r.data._beginMatch!==t[1]&&r.ignoreMatch()}})},Hs=Object.freeze({__proto__:null,APOS_STRING_MODE:Bf,BACKSLASH_ESCAPE:No,BINARY_NUMBER_MODE:Xf,BINARY_NUMBER_RE:th,COMMENT:Gs,C_BLOCK_COMMENT_MODE:qf,C_LINE_COMMENT_MODE:Uf,C_NUMBER_MODE:Yf,C_NUMBER_RE:eh,END_SAME_AS_BEGIN:tg,HASH_COMMENT_MODE:Gf,IDENT_RE:Zp,MATCH_NOTHING_RE:$f,METHOD_GUARD:eg,NUMBER_MODE:Jf,NUMBER_RE:Qp,PHRASAL_WORDS_MODE:Hf,QUOTE_STRING_MODE:zf,REGEXP_MODE:Kf,RE_STARTERS_RE:Wf,SHEBANG:jf,TITLE_MODE:Zf,UNDERSCORE_IDENT_RE:vi,UNDERSCORE_TITLE_MODE:Qf});function rg(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function og(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function sg(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=rg,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function ng(e,t){Array.isArray(e.illegal)&&(e.illegal=bi(...e.illegal))}function ig(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function ag(e,t){e.relevance===void 0&&(e.relevance=1)}var lg=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");let r=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=r.keywords,e.begin=cr(r.beforeMatch,Xp(r.begin)),e.starts={relevance:0,contains:[Object.assign(r,{endsParent:!0})]},e.relevance=0,delete r.beforeMatch},cg=["of","and","for","in","not","or","if","then","parent","list","value"],ug="keyword";function rh(e,t,r=ug){let o=Object.create(null);return typeof e=="string"?s(r,e.split(" ")):Array.isArray(e)?s(r,e):Object.keys(e).forEach(function(n){Object.assign(o,rh(e[n],t,n))}),o;function s(n,i){t&&(i=i.map(a=>a.toLowerCase())),i.forEach(function(a){let l=a.split("|");o[l[0]]=[n,pg(l[0],l[1])]})}}function pg(e,t){return t?Number(t):hg(e)?0:1}function hg(e){return cg.includes(e.toLowerCase())}var Hp={},lr=e=>{console.error(e)},Up=(e,...t)=>{console.log(`WARN: ${e}`,...t)},Yr=(e,t)=>{Hp[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Hp[`${e}/${t}`]=!0)},qs=new Error;function oh(e,t,{key:r}){let o=0,s=e[r],n={},i={};for(let a=1;a<=t.length;a++)i[a+o]=s[a],n[a+o]=!0,o+=Kp(t[a-1]);e[r]=i,e[r]._emit=n,e[r]._multi=!0}function dg(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw lr("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),qs;if(typeof e.beginScope!="object"||e.beginScope===null)throw lr("beginScope must be object"),qs;oh(e,e.begin,{key:"beginScope"}),e.begin=yi(e.begin,{joinWith:""})}}function mg(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw lr("skip, excludeEnd, returnEnd not compatible with endScope: {}"),qs;if(typeof e.endScope!="object"||e.endScope===null)throw lr("endScope must be object"),qs;oh(e,e.end,{key:"endScope"}),e.end=yi(e.end,{joinWith:""})}}function fg(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function gg(e){fg(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),dg(e),mg(e)}function bg(e){function t(i,a){return new RegExp(Oo(i),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(a?"g":""))}class r{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(a,l){l.position=this.position++,this.matchIndexes[this.matchAt]=l,this.regexes.push([l,a]),this.matchAt+=Kp(a)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);let a=this.regexes.map(l=>l[1]);this.matcherRe=t(yi(a,{joinWith:"|"}),!0),this.lastIndex=0}exec(a){this.matcherRe.lastIndex=this.lastIndex;let l=this.matcherRe.exec(a);if(!l)return null;let p=l.findIndex((m,d)=>d>0&&m!==void 0),u=this.matchIndexes[p];return l.splice(0,p),Object.assign(l,u)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(a){if(this.multiRegexes[a])return this.multiRegexes[a];let l=new r;return this.rules.slice(a).forEach(([p,u])=>l.addRule(p,u)),l.compile(),this.multiRegexes[a]=l,l}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(a,l){this.rules.push([a,l]),l.type==="begin"&&this.count++}exec(a){let l=this.getMatcher(this.regexIndex);l.lastIndex=this.lastIndex;let p=l.exec(a);if(this.resumingScanAtSamePosition()&&!(p&&p.index===this.lastIndex)){let u=this.getMatcher(0);u.lastIndex=this.lastIndex+1,p=u.exec(a)}return p&&(this.regexIndex+=p.position+1,this.regexIndex===this.count&&this.considerAll()),p}}function s(i){let a=new o;return i.contains.forEach(l=>a.addRule(l.begin,{rule:l,type:"begin"})),i.terminatorEnd&&a.addRule(i.terminatorEnd,{type:"end"}),i.illegal&&a.addRule(i.illegal,{type:"illegal"}),a}function n(i,a){let l=i;if(i.isCompiled)return l;[og,ig,gg,lg].forEach(u=>u(i,a)),e.compilerExtensions.forEach(u=>u(i,a)),i.__beforeBegin=null,[sg,ng,ag].forEach(u=>u(i,a)),i.isCompiled=!0;let p=null;return typeof i.keywords=="object"&&i.keywords.$pattern&&(i.keywords=Object.assign({},i.keywords),p=i.keywords.$pattern,delete i.keywords.$pattern),p=p||/\w+/,i.keywords&&(i.keywords=rh(i.keywords,e.case_insensitive)),l.keywordPatternRe=t(p,!0),a&&(i.begin||(i.begin=/\B|\b/),l.beginRe=t(l.begin),!i.end&&!i.endsWithParent&&(i.end=/\B|\b/),i.end&&(l.endRe=t(l.end)),l.terminatorEnd=Oo(l.end)||"",i.endsWithParent&&a.terminatorEnd&&(l.terminatorEnd+=(i.end?"|":"")+a.terminatorEnd)),i.illegal&&(l.illegalRe=t(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map(function(u){return yg(u==="self"?i:u)})),i.contains.forEach(function(u){n(u,l)}),i.starts&&n(i.starts,a),l.matcher=s(l),l}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=Gt(e.classNameAliases||{}),n(e)}function sh(e){return e?e.endsWithParent||sh(e.starts):!1}function yg(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return Gt(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:sh(e)?Gt(e,{starts:e.starts?Gt(e.starts):null}):Object.isFrozen(e)?Gt(e):e}var vg="11.9.0",gi=class extends Error{constructor(t,r){super(t),this.name="HTMLInjectionError",this.html=r}},hi=Yp,qp=Gt,Gp=Symbol("nomatch"),Sg=7,nh=function(e){let t=Object.create(null),r=Object.create(null),o=[],s=!0,n="Could not find the language '{}', did you forget to load/include a language module?",i={disableAutodetect:!0,name:"Plain text",contains:[]},a={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:fi};function l(y){return a.noHighlightRe.test(y)}function p(y){let v=y.className+" ";v+=y.parentNode?y.parentNode.className:"";let k=a.languageDetectRe.exec(v);if(k){let R=W(k[1]);return R||(Up(n.replace("{}",k[1])),Up("Falling back to no-highlight mode for this block.",y)),R?k[1]:"no-highlight"}return v.split(/\s+/).find(R=>l(R)||W(R))}function u(y,v,k){let R="",V="";typeof v=="object"?(R=y,k=v.ignoreIllegals,V=v.language):(Yr("10.7.0","highlight(lang, code, ...args) has been deprecated."),Yr("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),V=y,R=v),k===void 0&&(k=!0);let q={code:R,language:V};j("before:highlight",q);let K=q.result?q.result:m(q.language,q.code,k);return K.code=q.code,j("after:highlight",K),K}function m(y,v,k,R){let V=Object.create(null);function q(_,B){return _.keywords[B]}function K(){if(!U.keywords){Ie.addText(de);return}let _=0;U.keywordPatternRe.lastIndex=0;let B=U.keywordPatternRe.exec(de),J="";for(;B;){J+=de.substring(_,B.index);let le=He.case_insensitive?B[0].toLowerCase():B[0],ke=q(U,le);if(ke){let[St,_d]=ke;if(Ie.addText(J),J="",V[le]=(V[le]||0)+1,V[le]<=Sg&&(Lo+=_d),St.startsWith("_"))J+=B[0];else{let Od=He.classNameAliases[St]||St;he(B[0],Od)}}else J+=B[0];_=U.keywordPatternRe.lastIndex,B=U.keywordPatternRe.exec(de)}J+=de.substring(_),Ie.addText(J)}function Ce(){if(de==="")return;let _=null;if(typeof U.subLanguage=="string"){if(!t[U.subLanguage]){Ie.addText(de);return}_=m(U.subLanguage,de,!0,ki[U.subLanguage]),ki[U.subLanguage]=_._top}else _=f(de,U.subLanguage.length?U.subLanguage:null);U.relevance>0&&(Lo+=_.relevance),Ie.__addSublanguage(_._emitter,_.language)}function ie(){U.subLanguage!=null?Ce():K(),de=""}function he(_,B){_!==""&&(Ie.startScope(B),Ie.addText(_),Ie.endScope())}function _e(_,B){let J=1,le=B.length-1;for(;J<=le;){if(!_._emit[J]){J++;continue}let ke=He.classNameAliases[_[J]]||_[J],St=B[J];ke?he(St,ke):(de=St,K(),de=""),J++}}function Me(_,B){return _.scope&&typeof _.scope=="string"&&Ie.openNode(He.classNameAliases[_.scope]||_.scope),_.beginScope&&(_.beginScope._wrap?(he(de,He.classNameAliases[_.beginScope._wrap]||_.beginScope._wrap),de=""):_.beginScope._multi&&(_e(_.beginScope,B),de="")),U=Object.create(_,{parent:{value:U}}),U}function Oe(_,B,J){let le=Vf(_.endRe,J);if(le){if(_["on:end"]){let ke=new Us(_);_["on:end"](B,ke),ke.isMatchIgnored&&(le=!1)}if(le){for(;_.endsParent&&_.parent;)_=_.parent;return _}}if(_.endsWithParent)return Oe(_.parent,B,J)}function qe(_){return U.matcher.regexIndex===0?(de+=_[0],1):(Zs=!0,0)}function Ge(_){let B=_[0],J=_.rule,le=new Us(J),ke=[J.__beforeBegin,J["on:begin"]];for(let St of ke)if(St&&(St(_,le),le.isMatchIgnored))return qe(B);return J.skip?de+=B:(J.excludeBegin&&(de+=B),ie(),!J.returnBegin&&!J.excludeBegin&&(de=B)),Me(J,_),J.returnBegin?0:B.length}function yt(_){let B=_[0],J=v.substring(_.index),le=Oe(U,_,J);if(!le)return Gp;let ke=U;U.endScope&&U.endScope._wrap?(ie(),he(B,U.endScope._wrap)):U.endScope&&U.endScope._multi?(ie(),_e(U.endScope,_)):ke.skip?de+=B:(ke.returnEnd||ke.excludeEnd||(de+=B),ie(),ke.excludeEnd&&(de=B));do U.scope&&Ie.closeNode(),!U.skip&&!U.subLanguage&&(Lo+=U.relevance),U=U.parent;while(U!==le.parent);return le.starts&&Me(le.starts,_),ke.returnEnd?0:B.length}function vt(){let _=[];for(let B=U;B!==He;B=B.parent)B.scope&&_.unshift(B.scope);_.forEach(B=>Ie.openNode(B))}let Jt={};function Qr(_,B){let J=B&&B[0];if(de+=_,J==null)return ie(),0;if(Jt.type==="begin"&&B.type==="end"&&Jt.index===B.index&&J===""){if(de+=v.slice(B.index,B.index+1),!s){let le=new Error(`0 width match regex (${y})`);throw le.languageName=y,le.badRule=Jt.rule,le}return 1}if(Jt=B,B.type==="begin")return Ge(B);if(B.type==="illegal"&&!k){let le=new Error('Illegal lexeme "'+J+'" for mode "'+(U.scope||"<unnamed>")+'"');throw le.mode=U,le}else if(B.type==="end"){let le=yt(B);if(le!==Gp)return le}if(B.type==="illegal"&&J==="")return 1;if(Ks>1e5&&Ks>B.index*3)throw new Error("potential infinite loop, way more iterations than matches");return de+=J,J.length}let He=W(y);if(!He)throw lr(n.replace("{}",y)),new Error('Unknown language: "'+y+'"');let Mo=bg(He),Xs="",U=R||Mo,ki={},Ie=new a.__emitter(a);vt();let de="",Lo=0,Yt=0,Ks=0,Zs=!1;try{if(He.__emitTokens)He.__emitTokens(v,Ie);else{for(U.matcher.considerAll();;){Ks++,Zs?Zs=!1:U.matcher.considerAll(),U.matcher.lastIndex=Yt;let _=U.matcher.exec(v);if(!_)break;let B=v.substring(Yt,_.index),J=Qr(B,_);Yt=_.index+J}Qr(v.substring(Yt))}return Ie.finalize(),Xs=Ie.toHTML(),{language:y,value:Xs,relevance:Lo,illegal:!1,_emitter:Ie,_top:U}}catch(_){if(_.message&&_.message.includes("Illegal"))return{language:y,value:hi(v),illegal:!0,relevance:0,_illegalBy:{message:_.message,index:Yt,context:v.slice(Yt-100,Yt+100),mode:_.mode,resultSoFar:Xs},_emitter:Ie};if(s)return{language:y,value:hi(v),illegal:!1,relevance:0,errorRaised:_,_emitter:Ie,_top:U};throw _}}function d(y){let v={value:hi(y),illegal:!1,relevance:0,_top:i,_emitter:new a.__emitter(a)};return v._emitter.addText(y),v}function f(y,v){v=v||a.languages||Object.keys(t);let k=d(y),R=v.filter(W).filter(M).map(ie=>m(ie,y,!1));R.unshift(k);let V=R.sort((ie,he)=>{if(ie.relevance!==he.relevance)return he.relevance-ie.relevance;if(ie.language&&he.language){if(W(ie.language).supersetOf===he.language)return 1;if(W(he.language).supersetOf===ie.language)return-1}return 0}),[q,K]=V,Ce=q;return Ce.secondBest=K,Ce}function x(y,v,k){let R=v&&r[v]||k;y.classList.add("hljs"),y.classList.add(`language-${R}`)}function b(y){let v=null,k=p(y);if(l(k))return;if(j("before:highlightElement",{el:y,language:k}),y.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",y);return}if(y.children.length>0&&(a.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(y)),a.throwUnescapedHTML))throw new gi("One of your code blocks includes unescaped HTML.",y.innerHTML);v=y;let R=v.textContent,V=k?u(R,{language:k,ignoreIllegals:!0}):f(R);y.innerHTML=V.value,y.dataset.highlighted="yes",x(y,k,V.language),y.result={language:V.language,re:V.relevance,relevance:V.relevance},V.secondBest&&(y.secondBest={language:V.secondBest.language,relevance:V.secondBest.relevance}),j("after:highlightElement",{el:y,result:V,text:R})}function S(y){a=qp(a,y)}let w=()=>{$(),Yr("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function C(){$(),Yr("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let P=!1;function $(){if(document.readyState==="loading"){P=!0;return}document.querySelectorAll(a.cssSelector).forEach(b)}function N(){P&&$()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",N,!1);function I(y,v){let k=null;try{k=v(e)}catch(R){if(lr("Language definition for '{}' could not be registered.".replace("{}",y)),s)lr(R);else throw R;k=i}k.name||(k.name=y),t[y]=k,k.rawDefinition=v.bind(null,e),k.aliases&&X(k.aliases,{languageName:y})}function D(y){delete t[y];for(let v of Object.keys(r))r[v]===y&&delete r[v]}function H(){return Object.keys(t)}function W(y){return y=(y||"").toLowerCase(),t[y]||t[r[y]]}function X(y,{languageName:v}){typeof y=="string"&&(y=[y]),y.forEach(k=>{r[k.toLowerCase()]=v})}function M(y){let v=W(y);return v&&!v.disableAutodetect}function O(y){y["before:highlightBlock"]&&!y["before:highlightElement"]&&(y["before:highlightElement"]=v=>{y["before:highlightBlock"](Object.assign({block:v.el},v))}),y["after:highlightBlock"]&&!y["after:highlightElement"]&&(y["after:highlightElement"]=v=>{y["after:highlightBlock"](Object.assign({block:v.el},v))})}function G(y){O(y),o.push(y)}function oe(y){let v=o.indexOf(y);v!==-1&&o.splice(v,1)}function j(y,v){let k=y;o.forEach(function(R){R[k]&&R[k](v)})}function A(y){return Yr("10.7.0","highlightBlock will be removed entirely in v12.0"),Yr("10.7.0","Please use highlightElement now."),b(y)}Object.assign(e,{highlight:u,highlightAuto:f,highlightAll:$,highlightElement:b,highlightBlock:A,configure:S,initHighlighting:w,initHighlightingOnLoad:C,registerLanguage:I,unregisterLanguage:D,listLanguages:H,getLanguage:W,registerAliases:X,autoDetection:M,inherit:qp,addPlugin:G,removePlugin:oe}),e.debugMode=function(){s=!1},e.safeMode=function(){s=!0},e.versionString=vg,e.regex={concat:cr,lookahead:Xp,either:bi,optional:Lf,anyNumberOfTimes:Mf};for(let y in Hs)typeof Hs[y]=="object"&&Jp(Hs[y]);return Object.assign(e,Hs),e},Xr=nh({});Xr.newInstance=()=>nh({});ih.exports=Xr;Xr.HighlightJS=Xr;Xr.default=Xr});var Ii={};Ri(Ii,{animatedPatternN0Def:()=>gb,animatedPatternN1Def:()=>bb,caterpillarN0Def:()=>Sb,caterpillarN1Def:()=>Tb,caterpillarN2Def:()=>Ib,codeButtonComponentDef:()=>Jm,codeOverlayButtonDef:()=>Tf,codeOverlayDef:()=>Sf,degubButtonComponentDef:()=>xf,docScrollDef:()=>Og,docTopDef:()=>Ng,docsContainerComponentDef:()=>db,docsTitleComponentDef:()=>mb,docsTitleSmallComponentDef:()=>fb,dynamicCounterDef:()=>Yb,dynamicListButtonDef:()=>Xb,dynamicListCardDef:()=>qb,dynamicListDef:()=>Ub,dynamicListEmptyDef:()=>Jb,dynamicListLabelDef:()=>ty,dynamicListRepeaterDef:()=>ey,dynamicListSlotDef:()=>Gb,footerComponentDef:()=>jg,footerNavButtonDef:()=>qg,footerNavDef:()=>Ug,headerComponentDef:()=>eb,headerNavComponentDef:()=>tb,headerToggleComponentDef:()=>rb,homePageComponentDef:()=>Rb,horizontalScrollerButtonDef:()=>Lb,horizontalScrollerDef:()=>Mb,horizontalScrollerSectionDef:()=>Fb,htmlContentDef:()=>kf,listContentDef:()=>_f,loaderDef:()=>Ag,navigationButtonDef:()=>pb,navigationComponentDef:()=>lb,navigationDef:()=>cb,navigationLabelDef:()=>hb,navigationSubmenuDef:()=>ub,onlyDesktopDef:()=>Pg,pageTransitionComponentDef:()=>If,paragraphContentDef:()=>Pf,paramsMobJsButtonDef:()=>Wg,paramsMobJsDef:()=>$g,scrollToButtonDef:()=>Fg,scrollToDef:()=>Lg,scrollerN0Def:()=>Vb,scrollerN1Def:()=>Wb,snippetContentDef:()=>Ig,spacerContentDef:()=>kg,titleContentDef:()=>Rf});var en="animationStop",Pi=()=>{window.addEventListener("unhandledrejection",e=>{e.reason===en&&e.preventDefault()})};function ve(e){let t=e.offsetHeight,r=getComputedStyle(e);return t+=Number.parseInt(r.marginTop)+Number.parseInt(r.marginBottom),t}function rt(e){let t=e.offsetWidth,r=getComputedStyle(e);return t+=Number.parseInt(r.marginLeft)+Number.parseInt(r.marginRight),t}function se(e){let t=e.getBoundingClientRect();return{top:t.top+window.pageYOffset,left:t.left+window.pageXOffset}}function Je(e){return e.getBoundingClientRect()}function eo(e,t){let r=t?.parentNode;for(;r;){if(r===e)return!0;r=r?.parentNode}return!1}function hr(e){let t=window.getComputedStyle(e),r=t.transform||t.mozTransform;if(r==="none"||r===void 0)return{x:0,y:0,z:0};let o=r.includes("3d")?"3d":"2d",s=r.match(/matrix.*\((.+)\)/)[1].split(", ");if(o==="2d")return{x:s[4],y:s[5],z:0};if(o==="3d")return{x:s[12],y:s[13],z:s[14]}}function tn(e){return typeof Node=="object"?e instanceof Node:e&&typeof e=="object"&&typeof e.nodeType=="number"&&typeof e.nodeName=="string"}var be=()=>`_${Math.random().toString(36).slice(2,9)}`;var dr=e=>{setTimeout(()=>e())};var at="ANY",rn="UNTYPED",Ai="STRING",_i="NUMBER",Oi="OBJECT",Ni="FUNCTION",Fo="ARRAY",Mi="BOOLEAN",Li="ELEMENT",Fi="HTMLELEMENT",Vi="NODELIST",Vo="SET",Do="MAP",ce={isString:e=>Object.prototype.toString.call(e)==="[object String]",isNumber:e=>Object.prototype.toString.call(e)==="[object Number]"&&Number.isFinite(e),isObject:e=>Object.prototype.toString.call(e)==="[object Object]",isFunction:e=>Object.prototype.toString.call(e)==="[object Function]",isArray:e=>Object.prototype.toString.call(e)==="[object Array]",isBoolean:e=>Object.prototype.toString.call(e)==="[object Boolean]",isElement:e=>e instanceof Element||e instanceof Document,isHTMLElement:e=>e instanceof HTMLElement,isSet:e=>e instanceof Set,isMap:e=>e instanceof Map,isNodeList:e=>Object.prototype.isPrototypeOf.call(NodeList.prototype,e)},to=e=>{switch(e){case String:case Ai:return"String";case Number:case _i:return"Number";case Object:case Oi:return"Object";case Function:case Ni:return"Function";case Array:case Fo:return"Array";case Boolean:case Mi:return"Boolean";case Element:case Li:return"Element";case HTMLElement:case Fi:return"HTMLElement";case NodeList:case Vi:return"NodeList";case Set:case Vo:return"Set";case Map:case Do:return"Map";case at:return at;default:return rn}},Te=(e,t)=>{switch(e){case String:case Ai:return ce.isString(t);case Number:case _i:return ce.isNumber(t);case Object:case Oi:return ce.isObject(t);case Function:case Ni:return ce.isFunction(t);case Array:case Fo:return ce.isArray(t);case Boolean:case Mi:return ce.isBoolean(t);case Element:case Li:return ce.isElement(t);case HTMLElement:case Fi:return ce.isHTMLElement(t);case NodeList:case Vi:return ce.isNodeList(t);case Set:case Vo:return ce.isSet(t);case Map:case Do:return ce.isMap(t);case at:return!0;default:return!0}};var jd=(e,t)=>e.size===t.size&&[...e.keys()].every(r=>e.get(r)===t.get(r)),Bd=(e,t)=>e.size===t.size&&[...e].every(r=>t.has(r)),zd=(e,t)=>{if(e.length!==t.length)return!1;let r=new Set([...e,...t]);for(let o of r){let s=e.filter(i=>i===o).length,n=t.filter(i=>i===o).length;if(s!==n)return!1}return!0},Di=(e,t,r=!1)=>{if(e===null||t===null)return e===t;let s=e,n=t;if(r||(Array.isArray(e)&&(s=[...e].sort()),Array.isArray(t)&&(n=[...t].sort())),typeof s!="object"||typeof n!="object")return s===n;let i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertyNames(n);if(i.length!==a.length)return!1;for(let l of i){let p=s[l],u=n[l];if(typeof p=="object"&&typeof u=="object"){if(Di(p,u,r))continue;return!1}if(p!==u)return!1}return!0},on=(e,t,r)=>{switch(e){case at:return Di(t,r);case Fo:case Array:return zd(t,r);case Vo:case Set:return Bd(t,r);case Do:case Map:return jd(t,r);default:return t===r}};var sn=(e,t)=>{console.warn(`%c SimpleStore supports an object with a depth of up to 2 levels, set 'Any' type to use obj as value, the input object has ${e} level`,t)},$i=(e,t,r)=>{console.warn(`%c one of this key ${e} defined in computed method of prop to monitor '${t}' prop not exist`,r)},Wi=(e,t)=>{console.warn(`%c SimpleStore, trying to execute set() method: store.${e} not exist`,t)},ji=(e,t,r)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: setProp methods doesn't allow objects as value, ${JSON.stringify(t)} is an Object`,r)},Bi=(e,t)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: '${JSON.stringify(e)}' is an objects`,t)},zi=(e,t,r,o)=>{console.warn(`%c trying to execute setProp method on '${e}' propierties: ${t} is not a ${to(r)}`,o)},Hi=(e,t,r)=>{console.warn(`%c trying to execute setObj method on '${e}' propierties: setObj methods allow only objects as value, ${t} is not an Object`,r)},Ui=(e,t)=>{console.warn(`%c trying to execute setObj data method on '${e}' propierties: store propierties '${e}' is not an object`,t)},qi=(e,t,r)=>{console.warn(`%c trying to execute setObj data method: one of these keys '${e}' not exist in store.${t}`,r)},Gi=(e,t,r)=>{console.warn(`%c trying to execute setObj data method on '${e}' propierties: '${JSON.stringify(t)}' have a depth > 1, nested obj is not allowed`,r)},Ji=(e,t,r,o,s)=>{console.warn(`%c trying to execute setObj data method on ${e}.${t} propierties: ${r} is not a ${to(o)}`,s)},Yi=(e,t)=>{console.warn(`%c trying to execute get data method: store.${e} not exist`,t)},nn=(e,t)=>{console.warn(`%c trying to execute set data method: store.${e} not exist`,t)},Xi=(e,t)=>{console.warn(`%c one of the keys [${e}] is already used as a computed target, or one of the keys coincides with the prop to be changed.`,t)},Ki=(e,t)=>{console.warn(`%c SimpleStore error: the property ${e} to watch doesn't exist in store`,t)},Zi=(e,t)=>{console.warn(`%c Validation Object error: validation function return undefined or have you used Object instead '${t}' ?`,e)};var $o=e=>{if(!ce.isObject(e))return 0;let t=Object.values(e);return t.length===0?1:Math.max(...t.map(r=>$o(r)))+1},Qi=(e,t=!0)=>Object.entries(e).reduce((r,o)=>{let[s,n]=o,i=ce.isFunction(n)?n():{};return ce.isObject(n)&&t?{...r,[s]:Qi(n,!1)}:ce.isFunction(n)&&ce.isObject(i)&&"value"in i&&("validate"in i||"type"in i||"skipEqual"in i)?{...r,[s]:i.value}:{...r,[s]:n}},{}),ea=(e,t,r,o=!0)=>Object.entries(e).reduce((s,n)=>{let[i,a]=n,l=ce.isFunction(a)?a():{};if(ce.isObject(a)&&o)return{...s,[i]:ea(a,t,r,!1)};if(ce.isFunction(a)&&ce.isObject(l)&&"value"in l&&t in l){let p=ce.isString(l[t])?l[t].toUpperCase():l[t];return{...s,[i]:p}}return{...s,[i]:r}},{}),ta=({data:e,depth:t,logStyle:r})=>t>2?(sn(t,r),{}):Qi(e),ro=({data:e,prop:t,depth:r,logStyle:o,fallback:s})=>r>2?(sn(r,o),{}):ea(e,t,s),ra=({value:e})=>Te(Map,e)?new Map(e):Te(Set,e)?new Set(e):Te(Object,e)?{...e}:Te(Array,e)?[...e]:e;var mr=class{constructor(t={}){this.logStyle="padding: 10px;",this.callBackWatcher=new Map,this.callBackComputed=new Set,this.computedPropFired=new Set,this.computedWaitList=new Set,this.validationStatusObject={},this.dataDepth=$o(t),this.computedRunning=!1,this.store=ta({data:t,depth:this.dataDepth,logStyle:this.logStyle}),this.type=ro({data:t,prop:"type",depth:this.dataDepth,logStyle:this.logStyle,fallback:rn}),this.fnValidate=ro({data:t,prop:"validate",depth:this.dataDepth,logStyle:this.logStyle,fallback:()=>!0}),this.strict=ro({data:t,prop:"strict",depth:this.dataDepth,logStyle:this.logStyle,fallback:!1}),this.skipEqual=ro({data:t,prop:"skipEqual",depth:this.dataDepth,logStyle:this.logStyle,fallback:!0}),this.inizializeValidation()}inizializeValidation(){for(let t in this.store)ce.isObject(this.store[t])&&(this.validationStatusObject[t]={});Object.entries(this.store).forEach(t=>{let[r,o]=t;this.set(r,o,!1)})}runCallbackQueqe({prop:t,newValue:r,oldValue:o,validationValue:s}){for(let{prop:n,fn:i}of this.callBackWatcher.values())n===t&&i(r,o,s)}async runCallbackQueqeAsync({prop:t,newValue:r,oldValue:o,validationValue:s}){for(let{prop:n,fn:i}of this.callBackWatcher.values())n===t&&await i(r,o,s)}fireComputed(){this.computedWaitList.forEach(t=>{this.callBackComputed.forEach(r=>{let{prop:o,keys:s,fn:n}=r,i=Object.keys(this.store);if(!s.every(m=>i.includes(m))){$i(s,o,this.logStyle);return}if(!s.includes(t))return;let p=s.map(m=>this.store[m]);if(!this.computedPropFired.has(o)){let m=n(...p);this.set(o,m),this.computedPropFired.add(o)}})}),this.computedPropFired.clear(),this.computedWaitList.clear(),this.computedRunning=!1}addToComputedWaitLsit(t){this.callBackComputed.size!==0&&(this.computedWaitList.add(t),this.computedRunning||(this.computedRunning=!0,dr(()=>this.fireComputed())))}set(t,r,o=!0,s=!1){if(!(t in this.store)){Wi(t,this.logStyle);return}let n=s?ra({value:this.store[t]}):this.store[t],i=Te(Function,r)&&!Te(Function,n)&&this.type[t]!==Function?r(n):r,a=this.type[t]===at;ce.isObject(n)&&!a?this.setObj(t,i,o):this.setProp(t,i,o)}setProp(t,r,o=!0){let s=this.type[t]===at;if(ce.isObject(r)&&!s){ji(t,r,this.logStyle);return}if(ce.isObject(this.store[t])&&!s){Bi(t,this.logStyle);return}if(!Te(this.type[t],r)){zi(t,r,this.type[t],this.logStyle);return}let i=this.store[t],a=this.fnValidate[t]?.(r,i);this.strict[t]&&!a||(this.validationStatusObject[t]=a,this.skipEqual[t]?on(this.type[t],i,r):!1)||(this.store[t]=r,o&&this.runCallbackQueqe({prop:t,newValue:r,oldValue:i,validationValue:this.validationStatusObject[t]}),this.addToComputedWaitLsit(t))}setObj(t,r,o=!0){if(!ce.isObject(r)){Hi(t,r,this.logStyle);return}if(!ce.isObject(this.store[t])){Ui(t,this.logStyle);return}let s=Object.keys(r),n=Object.keys(this.store[t]);if(!s.every(b=>n.includes(b))){qi(s,t,this.logStyle);return}if(!Object.entries(r).map(b=>{let[S,w]=b,C=Te(this.type[t][S],w);return C||Ji(t,S,w,this.type[t][S],this.logStyle),C}).every(b=>b===!0))return;let l=Object.entries(r).map(b=>{let[S,w]=b,C=this.store[t][S];return this.strict[t][S]?{strictCheck:this.fnValidate[t][S]?.(w,C),item:b}:{strictCheck:!0,item:b}}).filter(({strictCheck:b})=>b===!0);if(l.length===0)return;let u=Object.fromEntries(l.map(({item:b})=>b).map(([b,S])=>[b,S]));Object.entries(u).forEach(b=>{let[S,w]=b,C=this.store[t][S],P=this.fnValidate[t][S]?.(w,C);P===void 0&&Zi(this.logStyle,at),this.validationStatusObject[t][S]=P});let m=this.store[t],d={...this.store[t],...u};Object.keys(u).every(b=>this.skipEqual[t][b]===!0)&&Object.entries(d).every(([b,S])=>{let w=this.type[t][b]===at;if($o(S)>1&&!w){Gi(t,r,this.logStyle);return}return on(this.type[t][b],m[b],S)})||(this.store[t]=d,o&&this.runCallbackQueqe({prop:t,newValue:this.store[t],oldValue:m,validationValue:this.validationStatusObject[t]}),this.addToComputedWaitLsit(t))}quickSetProp(t,r){let o=this.store[t];this.store[t]=r,this.runCallbackQueqe({prop:t,newValue:r,oldValue:o,validationValue:!0})}get(){return this.store}getProp(t){if(t in this.store)return this.store[t];Yi(t,this.logStyle)}getValidation(){return this.validationStatusObject}watch(t,r=()=>{}){if(!(t in this.store))return Ki(t,this.logStyle),()=>{};let o=be();return this.callBackWatcher.set(o,{fn:r,prop:t}),()=>this.callBackWatcher.delete(o)}emit(t){t in this.store?this.runCallbackQueqe({prop:t,newValue:this.store[t],oldValue:this.store[t],validationValue:this.validationStatusObject[t]}):nn(t,this.logStyle)}async emitAsync(t){return t in this.store?(await this.runCallbackQueqeAsync({prop:t,newValue:this.store[t],oldValue:this.store[t],validationValue:this.validationStatusObject[t]}),{success:!0}):(nn(t,this.logStyle),{success:!1})}debugStore(){console.log(this.store)}debugValidate(){console.log(this.validationStatusObject)}setStyle(t){this.logStyle=t}computed(t,r,o){if([...this.callBackComputed,{prop:t,keys:r,fn:o}].flatMap(a=>a.prop).some(a=>r.includes(a))){Xi(r,this.logStyle);return}this.callBackComputed.add({prop:t,keys:r,fn:o})}destroy(){this.callBackWatcher.clear(),this.callBackComputed.clear(),this.computedPropFired.clear(),this.computedWaitList.clear(),this.validationStatusObject={},this.store={},this.type={},this.fnValidate={},this.strict={},this.skipEqual={}}};var ae=new mr({usePassive:!0,currentFrame:0,instantFps:60,requestFrame:()=>{},fpsScalePercent:()=>({value:{0:1,30:2,50:3},type:"Any"}),useScaleFps:!0,deferredNextTick:!0,throttle:60});var an=!1,oo=new Map;function oa(){if(oo.size===0){window.removeEventListener("DOMContentLoaded",oa),an=!1;return}for(let e of oo.values())e();oo.clear()}function Hd(){an||(an=!0,window.addEventListener("DOMContentLoaded",oa,{passive:!1}))}var Ud=e=>{let t=be();return oo.set(t,e),typeof window<"u"&&Hd(),()=>oo.delete(t)},sa=Ud;function Wo(e){let t=0,r=0,o=0,s=0;return"detail"in e&&(r=e.detail),"wheelDelta"in e&&(r=-e.wheelDelta/120),"wheelDeltaY"in e&&(r=-e.wheelDeltaY/120),"wheelDeltaX"in e&&(t=-e.wheelDeltaX/120),"axis"in e&&e.axis===e.HORIZONTAL_AXIS&&(t=r,r=0),o=t*10,s=r*10,"deltaY"in e&&(s=e.deltaY),"deltaX"in e&&(o=e.deltaX),(o||s)&&e.deltaMode&&(e.deltaMode==1?(o*=40,s*=40):(o*=800,s*=800)),o&&!t&&(t=o<1?-1:1),s&&!r&&(r=s<1?-1:1),{spinX:t,spinY:r,pixelX:o,pixelY:s}}function qd({type:e,e:t}){return e==="touchend"&&t.changedTouches?t.changedTouches[0]:t.touches?t.touches[0]:t}function Gd({type:e,e:t}){return e==="touchend"&&t.changedTouches?t.changedTouches[0]:t.touches?t.touches[0]:t}function At(e){let t=!1,r=new Map,{usePassive:o}=ae.get();ae.watch("usePassive",()=>{window.removeEventListener(e,s),t=!1,n()});function s(a){if(r.size===0){window.removeEventListener(e,s),t=!1;return}let l=a.type,{pageX:p,pageY:u}=qd({type:l,e:a}),{clientX:m,clientY:d}=Gd({type:l,e:a}),f=a.target,x={page:{x:p,y:u},client:{x:m,y:d},target:f,type:l,preventDefault:()=>o?()=>{}:a.preventDefault()};if(l==="wheel"){let{spinX:b,spinY:S,pixelX:w,pixelY:C}=Wo(a);Object.assign(x,{spinX:b,spinY:S,pixelX:w,pixelY:C})}for(let b of r.values())b(x)}function n(){t||(t=!0,o=ae.getProp("usePassive"),window.addEventListener(e,s,{passive:o}))}return a=>{let l=be();return r.set(l,a),typeof window<"u"&&n(),()=>r.delete(l)}}var na=At("click"),ia=At("mousedown"),aa=At("touchstart"),la=At("mousemove"),ca=At("touchmove"),ua=At("mouseup"),pa=At("touchend"),ha=At("wheel");var ln=0,Xt=0,Le={},Jd=(e={},t=()=>{})=>{Le[ln]={el:e,fn:t,data:{}};let r=ln;return ln++,{id:r,unsubscribe:()=>{if(Le?.[r]){let o=Object.keys(Le[r].data).length;Xt=Xt-o,delete Le[r]}}}},Yd=({id:e,callBackObject:t,frame:r})=>{if(!Le[e])return;let{currentFrame:o}=ae.get(),{data:s}=Le[e];s[r+o]||(s[r+o]=t,Xt++)},Xd=e=>{e in Le&&delete Le[e]},Kd=e=>{let t=Le?.[e];if(!t)return;let r=Object.keys(t.data).length;Xt=Xt-r,t.data={}},Zd=e=>Le?.[e]??{},Qd=(e,t)=>{Object.values(Le).forEach(({data:r,fn:o,el:s})=>{let n=r?.[e];n&&(t&&o(n,s),r[e]=null,delete r[e],Xt--)})},em=({id:e,obj:t={}})=>{if(!Le?.[e])return;let{el:r,fn:o}=Le[e];o(t,r)},tm=()=>Xt,rm=e=>{Object.values(Le).forEach(({data:t})=>{Object.keys(t).forEach(r=>{delete Object.assign(t,{[`${Number.parseInt(r)-e}`]:t[r]})[r]})})},fr={add:Jd,get:Zd,update:Yd,remove:Xd,clean:Kd,fire:Qd,fireObject:em,getCacheCounter:tm,updateFrameId:rm};var cn=!1,jo=new Map;function da(){if(jo.size===0){window.removeEventListener("visibilitychange",da),cn=!1;return}let e={visibilityState:document.visibilityState};for(let t of jo.values())t(e)}function om(){cn||(cn=!0,window.addEventListener("visibilitychange",da,{passive:!1}))}var sm=e=>{let t=be();return jo.set(t,e),typeof window<"u"&&om(),()=>jo.delete(t)},Bo=sm;var so=[],nm=(e=()=>{},t=100)=>{so.push({cb:e,priority:t})},im=({time:e,fps:t,shouldRender:r})=>{so.length!==0&&(so.sort((o,s)=>o.priority-s.priority),so.forEach(({cb:o})=>o({time:e,fps:t,shouldRender:r})),so.length=0)},lt={add:nm,fire:im};var un=[],am=e=>{un.push(e)},lm=()=>{let e=[...un];return un.length=0,e},zo={add:am,get:lm};var Tt={},Ho=0,cm=e=>{Object.keys(Tt).forEach(t=>{delete Object.assign(Tt,{[`${Number.parseInt(t)-e}`]:Tt[t]})[t]})},um=({currentFrame:e,time:t,fps:r,shouldRender:o})=>{let s=Tt[e];s&&(s.forEach(n=>n({time:t,fps:r,shouldRender:o})),Tt[e]=null,delete Tt[e],Ho=Ho-1)},pm=(e,t)=>{let r=t+ae.getProp("currentFrame");Tt[r]?Tt[r].push(e):(Tt[r]=[e],Ho++),ae.emit("requestFrame")},hm=()=>Ho,gr={add:pm,fire:um,updateKeys:cm,getAmountOfFrameToFire:hm};var ma=!1,Uo=(e=30)=>{if(ma){let{instantFps:t}=ae.get();return new Promise(r=>{r({averageFPS:t})})}return new Promise(t=>{let r=[],s=0,n=0,i=0,a=0,l=0,p=u=>{u*=.001;let m=u-a;a=u;let d=Number.isFinite(1/m)?1/m:60,f=Math.max(d,60);i+=f-(r[s]||0),r[s++]=f,n=Math.max(n,s),s%=25;let x=Math.round(i/n);if(l++,l>=e){ae.quickSetProp("instantFps",x),ma=!0,t({averageFPS:x});return}requestAnimationFrame(p)};requestAnimationFrame(p)})};var ct=()=>typeof window>"u"?Date.now():window.performance.now(),fa=16.666666666666668;Uo();var pn=1e7,va=2e3,gn=!1,_t=[],Ee=ct(),ga=0,hn=0,dn=0,bn=0,mn=0,br=!1,Re=60,vr=Re,qo=0,Go=0,xt=0,fn=-1,yr=!0,Sa=ae.getProp("fpsScalePercent"),Ta=ae.getProp("useScaleFps"),Jo=!1,Yo=!1,dm=()=>Re<vr/5*3,mm=()=>Re<vr/5*4,fm=()=>{!dm()||Jo||(Jo=!0,setTimeout(()=>{Jo=!1},4e3))},gm=()=>{!mm()||Yo||(Yo=!0,setTimeout(()=>{Yo=!1},4e3))};Bo(({visibilityState:e})=>{br=e==="visible"});Pi();ae.watch("requestFrame",()=>{Xo()});var bm=()=>{if(!Ta)return!0;let e=Object.entries(Sa).reduce((t,[r,o])=>{let s=Math.abs(vr-Re);return Math.round(s*100/vr)>Number.parseInt(r)?o:t},1);return fn=(fn+1)%e,fn===0},ba=()=>{xt===pn&&(xt=0,ae.quickSetProp("currentFrame",xt),gr.updateKeys(pn),fr.updateFrameId(pn)),lt.fire({time:Ee,fps:Re,shouldRender:yr}),_t=[..._t,...zo.get()],gn=!1,_t.length>0||gr.getAmountOfFrameToFire()>0||fr.getCacheCounter()>0||Ee<va?Xo():(br=!0,xt=0,bn=Ee,ae.quickSetProp("currentFrame",xt))},ya=e=>{Ee=e,dn=Ee-hn,br&&(ga+=dn),hn+=dn,Ee=Math.round(hn-ga);let t=Math.round(1e3/Re);mn=Math.abs(Ee-bn-t);let r=mn>100?mn:0;Ee=Ee-r,bn=Ee,br?(Go=Ee,qo=0,Re=ae.getProp("instantFps")):qo++,Ee>Go+1e3&&!br&&(Re=Ee>va?Math.round(qo*1e3/(Ee-Go)):ae.getProp("instantFps"),Go=Ee,qo=0,Re=Re<30?ae.getProp("instantFps"):Re,Sa=ae.getProp("fpsScalePercent"),Ta=ae.getProp("useScaleFps")),Re>vr&&(vr=Re),yr=bm(),fm(),gm(),_t.forEach(s=>s({time:Ee,fps:Re,shouldRender:yr})),gr.fire({currentFrame:xt,time:Ee,fps:Re,shouldRender:yr}),fr.fire(xt,yr),xt++,ae.quickSetProp("currentFrame",xt),_t.length=0,br=!1,ae.getProp("deferredNextTick")?dr(()=>ba()):ba()},Xo=()=>{gn||(typeof window>"u"?setTimeout(()=>ya(ct()),fa):requestAnimationFrame(ya),gn=!0)},Ye={add:i=>{_t.push(i),Xo()},addMultiple:(i=[])=>{_t=[..._t,...i],Xo()},getFps:()=>Re,mustMakeSomething:()=>Jo,shouldMakeSomething:()=>Yo,getShouldRender:()=>yr};var Ko=function(t,r=200){let o;return function(){let s=()=>Reflect.apply(t,this,arguments);clearTimeout(o),o=setTimeout(s,r)}};var yn=!1,Zo=new Map,vn=()=>{},xa=window.innerHeight,wa=window.innerWidth;function ym(){if(Zo.size===0){window.removeEventListener("resize",vn),yn=!1;return}let e=window.innerHeight,t=window.innerWidth,r=e!==xa,o=t!==wa;xa=e,wa=t;let s={scrollY:window.pageYOffset,windowsHeight:e,windowsWidth:t,documentHeight:document.documentElement.scrollHeight,verticalResize:r,horizontalResize:o};for(let n of Zo.values())n(s)}function vm(){yn||(yn=!0,vn=Ko(()=>ym()),window.addEventListener("resize",vn,{passive:!1}))}var Sm=e=>{let t=be();return Zo.set(t,e),typeof window<"u"&&vm(),()=>Zo.delete(t)},Ca=Sm;var Sn=!1,Qo=new Map,Tm="UP",ka="DOWN",Ia=window.pageYOffset,no=window.pageYOffset,Tn=ka,Ea={scrollY:no,direction:Tn};function Ra(){if(Qo.size===0){window.removeEventListener("scroll",Ra),Sn=!1;return}Ia=no,no=window.scrollY,Tn=no>Ia?ka:Tm,Ea={scrollY:no,direction:Tn};for(let e of Qo.values())e(Ea)}function xm(){Sn||(Sn=!0,window.addEventListener("scroll",Ra,{passive:!0}))}var wm=e=>{let t=be();return Qo.set(t,e),typeof window<"u"&&xm(),()=>Qo.delete(t)},wt=wm;var xn=!1,es=new Map,Pa=()=>{};function Cm(e){if(es.size===0){Pa(),xn=!1;return}Ye.add(()=>{lt.add(()=>{for(let t of es.values())t(e)},0)})}function Im(){xn||(xn=!0,Pa=wt(Cm))}var Em=e=>{let t=be();return es.set(t,e),typeof window<"u"&&Im(),()=>es.delete(t)},Aa=Em;var _a=(e,t)=>{let r,o;return function(){let s=this,n=arguments;o?(clearTimeout(r),r=setTimeout(function(){ct()-o>=t&&(e.apply(s,n),o=ct())},t-(ct()-o))):(e.apply(s,n),o=ct())}};var wn=!1,ts=new Map,Oa,Na=()=>{};function km(e){if(ts.size===0){Na(),wn=!1;return}Ye.add(()=>{lt.add(()=>{for(let t of ts.values())t(e)},0)})}function Rm(){wn||(wn=!0,Oa=_a(e=>km(e),ae.getProp("throttle")),Na=wt(Oa))}var Pm=e=>{let t=be();return ts.set(t,e),typeof window<"u"&&Rm(),()=>ts.delete(t)},Ma=Pm;var La=()=>{},Fa=()=>{},Va=()=>{};function Da(e){let t=!1,r=new Map,o=!1;function s(){if(o=!1,r.size===0){Fa(),e==="START"&&La(),t=!1;return}Ye.add(()=>{lt.add(()=>{let a={scrollY:window.pageYOffset};if(e==="END")for(let l of r.values())l(a)},0)})}function n(){t||(t=!0,Va=Ko(()=>s()),Fa=wt(Va),e==="START"&&(La=wt(({scrollY:a})=>{let l={scrollY:a};if(!o){o=!0;for(let p of r.values())p(l)}})))}return a=>{let l=be();return r.set(l,a),typeof window<"u"&&n(),()=>r.delete(l)}}var $a=Da("START"),Wa=Da("END");var c={createStore(e={}){return new mr(e)},getInstantFps(){return ae.getProp("instantFps")},getFps(){return Ye.getFps()},getShouldRender(){return Ye.getShouldRender()},mustMakeSomething(){return Ye.mustMakeSomething()},shouldMakeSomething(){return Ye.shouldMakeSomething()},useFrame(e=()=>{}){return Ye.add(e)},useNextTick(e=()=>{}){return lt.add(e)},useNextFrame(e=()=>{}){return zo.add(e)},useFrameIndex(e=()=>{},t=0){return gr.add(e,t)},async useFps(e=()=>{}){let t=await Uo();return e(t),t},useLoad(e=()=>{}){return sa(e)},useCache:fr,useResize(e=()=>{}){return Ca(e)},useVisibilityChange(e=()=>{}){return Bo(e)},useMouseClick(e=()=>{}){return na(e)},useMouseDown(e=()=>{}){return ia(e)},useTouchStart(e=()=>{}){return aa(e)},useMouseMove(e=()=>{}){return la(e)},useTouchMove(e=()=>{}){return ca(e)},useMouseUp(e=()=>{}){return ua(e)},useTouchEnd(e=()=>{}){return pa(e)},useMouseWheel(e=()=>{}){return ha(e)},useScroll(e=()=>{}){return Aa(e)},useScrollImmediate(e=()=>{}){return wt(e)},useScrollThrottle(e=()=>{}){return Ma(e)},useScrollStart(e=()=>{}){return $a(e)},useScrollEnd(e=()=>{}){return Wa(e)},checkType(e,t){return Te(e,t)},getTypeName(e){return to(e)},getUnivoqueId(){return be()},getTime(){return ct()},useNextLoop(e){dr(e)},store:ae,normalizeWheel:Wo,ANIMATION_STOP_REJECT:en};var z=new Map;var rs=({id:e="",value:t})=>{if(!e||e==="")return;let r=z.get(e);r&&z.set(e,{...r,currentRepeaterState:t,isRepeater:!0})},Sr=({id:e=""})=>!e||e===""?!1:z.get(e)?.currentRepeaterState;var ja=({id:e="",newElement:t=document.createElement("div")})=>{if(!e||e==="")return;let r=z.get(e);r&&z.set(e,{...r,element:t})},ot=({id:e=""})=>!e||e===""?void 0:z.get(e)?.element,os=({element:e})=>[...z.values()].find(r=>r?.element===e)?.id??"",ss=({key:e="",parentId:t="",container:r=document.createElement("div")})=>{if(!e||e==="")return;let s=[...z.values()].find(({key:n,parentId:i,element:a})=>n===e&&i===t&&r.contains(a))?.element;if(!s){console.warn("getElementByKey failed no element found");return}return s};var ns="data-mobjs",Ba="mobjs",Ot="staticprops",Tr="bindprops",za="name",Ha="name",Ua="slot",is="repeatid",xr="repeaterchild",as="key",wr="currentlistvalue",ls="bindevents",ut="weakbindevents",Nt="parentid",cs="ref";var Cr={current:{},index:-1},pt="UNSET";var L=c.createStore({contentId:()=>({value:"",type:String}),rootElement:()=>({value:document.createElement("div"),type:HTMLElement}),index:()=>({value:"",type:String}),pageNotFound:()=>({value:"",type:String}),componentList:()=>({value:{},type:"any"}),routeList:()=>({value:{},type:"any"}),activeRoute:()=>({value:"",type:String}),beforeRouteLeave:()=>({value:"",type:String,skipEqual:!1}),beforeRouteChange:()=>({value:"",type:String,skipEqual:!1}),atfterRouteChange:()=>({value:"",type:String,skipEqual:!1}),repeaterParserRoot:()=>({value:document.createElement("div"),type:HTMLElement})});var qa=({contentId:e=""})=>{L.set("contentId",e)},Ga=()=>{let{contentId:e}=L.get();return e},Ja=()=>{let{rootElement:e}=L.get();return e},Ya=({element:e})=>{L.set("rootElement",e)};var Ir=new Map,Mt=new WeakMap,Cn=[],Xa=[],Ka=(e=[])=>{let t=Te(Object,e)?[e]:e,r=c.getUnivoqueId();return Ir.set(r,t),r},Am=e=>{let t=e?.parentNode;for(;t;){if(Mt.has(t))return{target:t,data:Mt.get(t)};t=t?.parentNode}return{target:null,data:null}},_m=e=>Mt.get(e)?{target:e,data:Mt.get(e)}:Am(e);function Om(e,t){let r=t.target,{target:o,data:s}=_m(r);if(!s||!document.contains(o))return;let n=s.find(({event:p})=>p===e);if(!n)return;let{callback:i}=n,a=os({element:o}),l=a?Sr({id:a}):Cr;Object.defineProperty(t,"target",{value:o}),i(t,l)}var Za=e=>{[...e.parentNode?.querySelectorAll(`[${ut}]`)??[]].forEach(s=>{let n=s.getAttribute(ut)??"";s.removeAttribute(ut);let i=Ir.get(n);Ir.delete(n);let a=i?.flatMap(l=>Object.entries(l).map(p=>{let[u,m]=p;return Cn.includes(u)||Cn.push(u),{event:u,callback:m}}));Mt.set(s,a)});let o=Ja();Cn.forEach(s=>{Xa.includes(s)||(Xa.push(s),o.addEventListener(s,Om.bind(null,s)))})};var Kt=new Map,us=(e={})=>{let t=c.getUnivoqueId();return Kt.set(t,e),t},ps=(e="")=>{let t=Kt.get(e);return Kt.delete(e),t??{}},Qa=({propsId:e})=>{e&&Kt.delete(e)},el=()=>{Kt.clear()};var g=(e,...t)=>String.raw({raw:e},...t);var In={isolateCreation:!1,isolateOnMount:!1,scoped:!1,maxParseIteration:5e3,debug:!1},En=e=>{In={...In,...e}},Lt=()=>In,E=({name:e="",component:t=()=>{},state:r={},exportState:o=[],isolateCreation:s=pt,isolateOnMount:n=pt,scoped:i=pt,constructorCallback:a=()=>{},connectedCallback:l=()=>{},disconnectedCallback:p=()=>{},adoptedCallback:u=()=>{},attributeToObserve:m=[],attributeChangedCallback:d=()=>{},style:f=""})=>({[e]:{componentFunction:t,componentParams:{exportState:o,isolateCreation:s,isolateOnMount:n,scoped:i,state:r,constructorCallback:a,connectedCallback:l,disconnectedCallback:p,adoptedCallback:u,attributeToObserve:m,attributeChangedCallback:d,styleSlot:f}}});var Er=new Map,tl=(e=[])=>{let t=Te(Object,e)?[e]:e,r=c.getUnivoqueId();return Er.set(r,t),r},rl=({element:e,componentId:t,bindEventsId:r})=>{let o=Er.get(r);o&&(o.forEach(s=>{let[n]=Object.keys(s),[i]=Object.values(s);!n||!i||e.addEventListener(n,a=>{let l=Sr({id:t});i(a,l)})}),Er.delete(r))},ol=()=>{Er.clear()};function*Fe(e){if(e){yield e;for(let t of e.children)yield*Fe(t)}}function Nm(e,t){let r=[];for(let o of Fe(e)){if(r.length>0&&t)break;o?.getIsPlaceholder?.()&&r.push(o)}return r}var hs=(e,t=!0)=>{let r=[],o=e||document.body;for(let s of o.children)r=[...r,...Nm(s,t)];return r};var sl=({currentChild:e,id:t="",componentName:r=""})=>{let o=e?.[r]??[];return e[r]=[...o,t],e},nl=({currentChild:e,id:t="",componentName:r=""})=>{let o=e?.[r]??[];return e[r]=o.filter(s=>t!==s),e},il=({props:e,store:t})=>{Object.entries(e).forEach(([r,o])=>{t.set(r,o)})};var kr=(e="")=>{if(!e||e==="")return;let r=z.get(e)?.parentId;if(r)return r},al=({id:e=""})=>{if(!e||e==="")return;let t=z.get(e),r=t?.parentId,o=t?.component??"";if(r)for(let[s,n]of z){let{child:i}=n;if(!i)break;s===r&&z.set(s,{...n,child:{...i,...sl({currentChild:i,id:e,componentName:o})}})}},ll=({componentId:e})=>{let t=z.get(e);if(!t)return;let{element:r,parentId:o}=t;if(o&&o.length>0)return;let n=r?.parentNode?.closest(`[${ns}]`),i=n&&(!o||o==="")?{...t,parentId:n?.dataset[Ba]??""}:t;z.set(e,i)},cl=({element:e,id:t})=>{hs(e,!1).forEach(o=>{o.setParentId(t)})};var ds=({id:e="",unWatchArray:t=[]})=>{let r=z.get(e);if(!r)return;let{parentPropsWatcher:o}=r;o&&z.set(e,{...r,parentPropsWatcher:[...o,...t]})},ul=({id:e=""})=>{if(!e||e==="")return;(z.get(e)?.parentPropsWatcher??[]).forEach(o=>{o()})};var ms=({componentName:e,currentProps:t={}})=>{let{componentList:r}=L.get(),o=r?.[e]?.componentParams?.exportState??[];return Object.entries(t).filter(([s])=>o.includes(s)).reduce((s,n)=>{let[i,a]=n;return{...s,[i]:a}},{})},pl=({componentName:e,propName:t})=>{let{componentList:r}=L.get();return(r?.[e]?.componentParams?.exportState??[]).includes(t)};var fs=({id:e="",prop:t})=>{if(!e||e==="")return;let r=z.get(e);if(!r)return;let{freezedPros:o}=r;o&&z.set(e,{...r,freezedPros:[...o,t]})},io=({id:e="",prop:t})=>{if(!e||e==="")return;let r=z.get(e);if(!r)return;let{freezedPros:o}=r;o&&z.set(e,{...r,freezedPros:o.filter(s=>s!==t)})},gs=({id:e="",prop:t})=>{if(!e||e==="")return!1;let o=z.get(e)?.freezedPros;return o?o.includes(t):!1};var kn=(e="")=>!e||e===""?void 0:z.get(e)?.state?.get(),Pe=(e="",t="",r,o=!0)=>{if((!e||e==="")&&(!t||t==="")&&!r||gs({id:e,prop:t}))return;let n=z.get(e),i=n?.state,a=n?.component??"";if(!pl({componentName:a,propName:t}))return console.warn(`setStateById failed ${t} in: ${a} is not exportable, maybe a slot bind state that not exist here?`),null;if(!i)return console.warn(`setStateById failed no id found on prop: ${t}`),null;i.set(t,r,o)};var ao=(e="",t="",r=()=>{})=>(!e||e==="")&&(!t||t==="")?void 0:z.get(e)?.state?.watch(t,r);var Xe=new Map,dl=e=>{if(!("bind"in e&&"props"in e)){console.warn("bindProps not valid");return}let r=c.getUnivoqueId();return Xe.set(r,{...e,componentId:"",propsId:r}),r},hl=({componentId:e,bind:t,props:r,currentParentId:o,fireCallback:s})=>{if(!o)return;let n=kn(o);if(!n)return;let i=Object.keys(n);t.every(d=>i.includes(d))||console.warn(`bind props error: Some prop ${JSON.stringify(t)} doesn't exist`);let l=t.map(d=>({[d]:n[d]})).reduce((d,f)=>({...d,...f}),{});if(!z.has(e))return;let u=Sr({id:e}),m=r?.({...l,_current:u.current,_index:u.index});m&&Object.entries(m).forEach(([d,f])=>{Pe(e,d,f,s)})},Rn=({propsId:e,componentId:t})=>{if(e){for(let[r,o]of Xe)r===e&&Xe.set(r,{...o,componentId:t});Pn({componentId:t,inizilizeWatcher:!1})}},ml=({componentId:e})=>{if(e)for(let[t,r]of Xe){let{componentId:o}=r;o===e&&Xe.delete(t)}},fl=({propsId:e})=>{e&&Xe.delete(e)},Pn=({componentId:e,inizilizeWatcher:t})=>{let r=[...Xe.values()].filter(o=>o?.componentId===e);if(r&&(r.forEach(o=>{let{bind:s,props:n,parentId:i}=o,a=i??kr(e);if(!t){hl({componentId:e,bind:s,props:n,currentParentId:a??"",fireCallback:!0});return}let l=!1,p=s.map(u=>ao(a,u,()=>{l||(l=!0,c.useNextLoop(()=>{hl({componentId:e,bind:s,props:n,currentParentId:a??"",fireCallback:!0}),l=!1}))}));ds({id:e,unWatchArray:p})}),!!t))for(let[o,s]of Xe){let{componentId:n}=s;n===e&&Xe.delete(o)}},gl=()=>{Xe.clear()};var Zt=new Map,bl=({repeatId:e,repeaterParentId:t,targetComponent:r})=>{Zt.has(e)||Zt.set(e,{repeatId:e,repeaterParentId:t,targetComponent:r})},An=({id:e})=>{let t=Zt.get(e);if(t)return t?.targetComponent},yl=({id:e})=>{for(let[t,r]of Zt){let{repeaterParentId:o}=r;o===e&&Zt.delete(t)}};var Ke=({id:e=""})=>{if(!e||e==="")return;let t=[...z.values()],{component:r,element:o}=t.find(({id:l})=>l===e)||{};if(!o||!r)return;let n=z.get(e)?.child??{};Object.values(n).flat().forEach(l=>{Ke({id:l})});let a=t.find(({child:l})=>(l?.[r]??[]).includes(e))?.id;for(let[l,p]of z){let{child:u}=p;if(!u)break;if(l===a&&z.set(l,{...p,child:{...u,...nl({currentChild:u,id:e,componentName:r})}}),l===e){let{state:m,destroy:d,parentPropsWatcher:f}=p;d(),m.destroy(),f&&f.forEach(x=>x()),yl({id:l}),ml({componentId:l})}}z.delete(e),o?.removeCustomComponent?.(),o?.remove()},vl=()=>{[...z.values()].filter(({isCancellable:t})=>t).forEach(({id:t})=>Ke({id:t}))},Rr=()=>{[...z.values()].filter(({element:t,isCancellable:r})=>r&&!document.body.contains(t)).forEach(({id:t})=>Ke({id:t})),el(),ol(),gl()},Sl=({cb:e=()=>{},id:t=null})=>{if(!t)return;let r=z.get(t);r&&z.set(t,{...r,destroy:e})};var _n=0,Tl=()=>{_n+=1},On=()=>(_n-=1,_n);function Mm(e){let t=[];for(let r of Fe(e))r?.isUserComponent&&r?.getSlotPosition?.()&&t.push(r);return t}var xl=e=>{let t=[],r=e||document.body;for(let o of r.children)t=[...t,...Mm(o)];return t};function Lm(e){let t=[];for(let r of Fe(e))r?.isSlot&&r?.getSlotName?.()&&t.push(r);return t}var wl=e=>{let t=[],r=e||document.body;for(let o of r.children)t=[...t,...Lm(o)];return t};function Fm(e,t){for(let r of Fe(e))if(r?.isSlot&&r?.getSlotName?.()===t)return r;return null}var Cl=(e,t)=>{let r=e||document.body;for(let o of r.children){let s=Fm(o,t);if(s)return s}return null};function Vm(e){for(let t of Fe(e))if(t?.isSlot&&!t?.getSlotName?.())return t;return null}var Il=e=>{let t=e||document.body;for(let r of t.children){let o=Vm(r);if(o)return o}return null};var Dm=({componentParsed:e,content:t})=>{if(e.parentNode)return e.insertAdjacentHTML("afterend",t),e.nextElementSibling},$m=({element:e})=>{wl(e).forEach(r=>{let o=r.getDynamicProps();o!==""&&fl({propsId:o});let s=r.getStaticProps();s!==""&&Qa({propsId:s}),r?.removeCustomComponent(),r?.remove()})},Wm=({element:e})=>{let t=xl(e);if(t.length===0)return;[...t].map(o=>{let s=o?.getSlotPosition(),n=Cl(e,s);if(!n)return{slot:null,elementMoved:null};n.parentNode?.insertBefore(o,n);let i=n.previousSibling;return{slot:n,elementMoved:i}}).forEach(({slot:o,elementMoved:s})=>{if(!o)return;let n=o.getStaticProps();n&&s?.setPropsFromSlotId?.(n);let i=o.getDynamicProps();i&&s?.setDynamicPropsFromSlotId?.(i),o?.removeCustomComponent(),o?.remove()})},El=({componentParsed:e,content:t})=>{let r=e.innerHTML,o=Dm({componentParsed:e,content:t});if(o){let s=e.getId(),n=e.getDelegateEventId(),i=Il(o);i?(i.insertAdjacentHTML("afterend",r),i.remove()):o.insertAdjacentHTML("afterbegin",r),Wm({element:o}),$m({element:o}),n&&o.setAttribute(ut,n);let{debug:a}=Lt();a&&o.setAttribute(ns,s??"")}return e.remove(),o},kl=({componentParsed:e,content:t,isolateCreation:r})=>(r===pt?Lt().isolateCreation:r)?new Promise(s=>{c.useFrame(()=>{let n=El({componentParsed:e,content:t});c.useNextTick(()=>{s({newElement:n})})})}):new Promise(s=>{let n=El({componentParsed:e,content:t});s({newElement:n})});var Rl=()=>{customElements.define("mobjs-repeater",class extends HTMLElement{#e;constructor(){super(),this.attachShadow({mode:"open"}),this.#e="",this.isRepeater=!0;let{dataset:e}=this.shadowRoot?.host??{};e&&(this.#e=this.shadowRoot?.host.getAttribute(is))}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}getRepeatId(){return this.#e}})};var Pl=()=>{customElements.define("mobjs-slot",class extends HTMLElement{#e;#t;#r;constructor(){super(),this.attachShadow({mode:"open"}),this.#e="",this.isSlot=!0;let{dataset:e}=this.shadowRoot?.host??{};e&&(this.#e=this.shadowRoot?.host.getAttribute(Ha),this.#t=this.shadowRoot?.host.getAttribute(Ot),this.#r=this.shadowRoot?.host.getAttribute(Tr))}removeCustomComponent(){this.shadowRoot&&this.parentElement?.removeChild(this)}getSlotName(){return this.#e}getStaticProps(){return this.#t}getDynamicProps(){return this.#r}})};var Al=e=>{Object.entries(e).forEach(([t,r])=>{let{constructorCallback:o,connectedCallback:s,disconnectedCallback:n,adoptedCallback:i,attributeChangedCallback:a,styleSlot:l,attributeToObserve:p}=r.componentParams;customElements.define(t,class extends HTMLElement{#e;#t;#r;#i;#o;#a;#l;#c;#u;#p;#h;#d;#m;#f;#g;#v;#S;#T;#x;#w;#C;#I;#E;#b;#k;#s;#n;#R;static get observedAttributes(){return p}constructor(){super(),this.attachShadow({mode:"open"}),this.active=!1,this.#t=c.getUnivoqueId(),this.#r=()=>{},this.#i=()=>{},this.#o=()=>{},this.#o=()=>{},this.#a=()=>{},this.#l=()=>{},this.#c=()=>{},this.#u=()=>{},this.#p=()=>{},this.#h=()=>{},this.#d=()=>{},this.#m=()=>{},this.#f=()=>{},this.#g=()=>{},this.#e=t,this.#v=!0,this.#S="",this.#T="",this.#x="",this.#w="",this.#C="",this.#I="",this.#E="",this.#b="",this.#k="",this.#s="",this.#n="",this.isUserComponent=!0;let u=this.shadowRoot.host;if(this.#S=u.getAttribute(za),this.#T=u.getAttribute(Ot),this.#x=u.getAttribute(Tr),this.#k=u.getAttribute(as),this.#w=u.getAttribute(ls),this.#E=u.getAttribute(wr),this.#b=u.getAttribute(Ua),this.#s=u.getAttribute(Nt)??"",this.#n=u.getAttribute(xr),this.#R=u.getAttribute(ut),this.#b&&!this.active&&(this.style.visibility="hidden"),this.#n&&this.#n!==""&&bl({repeatId:this.#n,repeaterParentId:this.#s,targetComponent:this.#e}),this.shadowRoot){let m=document.createElement("style");m.textContent=l,this.shadowRoot.append(m);let d=document.createElement("slot");this.shadowRoot.append(d),o({context:this})}}getComponentName(){return this.#e}setId(u){this.#t=u}getId(){return this.#t}getParentId(){return this.#s}setParentId(u){this.#s=u}getIsPlaceholder(){return this.#v}getInstanceName(){return this.#S}getStaticPropsId(){return this.#T}getDynamicPropsid(){return this.#x}getBindEventsId(){return this.#w}getCurrentKey(){return this.#k}setDynamicPropsFromSlotId(u){this.#C=u}getDynamicPropsFromSlotId(){return this.#C}setPropsFromSlotId(u){this.#I=u}getPropsFromSlotId(){return this.#I}getCurrentListValueId(){return this.#E}getSlotPosition(){return this.#b}getDelegateEventId(){return this.#R}#y(){return{componentId:this.#t,emit:this.#r,emitAsync:this.#i,freezeProp:this.#o,getChildren:this.#a,getParentId:this.#l,getState:this.#c,remove:this.#u,setState:this.#p,unBind:this.#h,unFreezeProp:this.#d,watch:this.#m,watchSync:this.#f,watchParent:this.#g}}resetData(){this.active=!1,this.#t="",this.#r=()=>{},this.#i=()=>{},this.#o=()=>{},this.#a=()=>{},this.#l=()=>{},this.#c=()=>{},this.#u=()=>{},this.#p=()=>{},this.#h=()=>{},this.#d=()=>{},this.#m=()=>{},this.#f=()=>{},this.#g=()=>{}}inizializeCustomComponent(u){this.active||(this.active=!0,this.#t=u.id,this.#r=u.emit,this.#i=u.emitAsync,this.#o=u.freezeProp,this.#a=u.getChildren,this.#l=u.getParentId,this.#c=u.getState,this.#u=u.remove,this.#p=u.setState,this.#h=u.unBind,this.#d=u.unFreezeProp,this.#m=u.watch,this.#f=u.watchSync,this.#g=u.watchParent,s({context:this,data:this.#y()}),this.#v=!1)}disconnectedCallback(){!this.shadowRoot||!this.active||(n({context:this,data:this.#y()}),this.resetData())}removeCustomComponent(){!this.shadowRoot||!this.active||this.parentElement?.removeChild(this)}adoptedCallback(){!this.shadowRoot||!this.active||i({context:this,data:this.#y()})}attributeChangedCallback(u,m,d){!this.shadowRoot||!this.active||a({name:u,oldValue:m,newValue:d,context:this,data:this.#y()})}})})};var _l=(e={})=>{let t=Object.values(e).reduce((r,o)=>({...r,...o}),{});L.set("componentList",t),Al(t),Rl(),Pl()},Nn=()=>{let{componentList:e}=L.get();return e};var Ol=({element:e,currentSelectors:t})=>{if(t.length>0){let r=t[0],o=t.slice(1);return{componentToParse:r,parseSourceArray:o}}else{let r=[...hs(e)],o=r?.[0],s=r.slice(1);return{componentToParse:o,parseSourceArray:s}}};var Nl=e=>[...e.querySelectorAll(`[${cs}]`)].reduce((r,o)=>{let s=o.getAttribute(cs);o.removeAttribute(cs);let n=s in r?[...r[s],o]:[o];return{...r,[s]:n}},{}),Ml=e=>Object.entries(e).map(([t,r])=>r.length===1?{[t]:r[0]}:{[t]:r}).reduce((t,r)=>({...t,...r}),{});var lo=new Map,Fl=({id:e,cb:t=()=>{}})=>{lo.set(e,t)},Ll=async({id:e,element:t,refsCollection:r})=>{let s=await lo.get(e)?.({element:t,refs:Ml(r)});Sl({cb:s,id:e}),lo.delete(e)};var Mn=({isolateOnMount:e,id:t,element:r,refsCollection:o})=>(e===pt?Lt().isolateOnMount:e)?(async()=>(await Ll({id:t,element:r,refsCollection:o}),new Promise(n=>{c.useNextLoop(()=>{c.useFrame(()=>{c.useNextTick(()=>{n({success:!0})})})})})))():Ll({id:t,element:r,refsCollection:o});function jm(e,t){for(let r of Fe(e))if(r?.isRepeater&&r?.getRepeatId?.()===t)return r;return null}var Vl=(e,t)=>{let r=e||document.body;for(let o of r.children){let s=jm(o,t);if(s)return s}return null};var Pr=new Set,Dl=({id:e,state:t,container:r})=>{Pr.add({id:e,state:t,container:r})},$l=({id:e,state:t,container:r})=>{Pr.forEach(o=>{e===o.id&&t===o.state&&r===o.container&&Pr.delete(o)})},Wl=({id:e="",state:t="",container:r})=>[...Pr].some(s=>e===s.id&&t===s.state&&r===s.container);var bs=({id:e="",component:t=""})=>{if(!e||e==="")return[];let o=z.get(e)?.child;return o?o?.[t]??[]:(console.warn("getChildIdById failed no id found"),[])},ys=({id:e,component:t,filterBy:r=[]})=>{if(!ot({id:e}))return;let n=bs({id:e,component:t}).map(l=>({id:l,element:ot({id:l})})).filter(({element:l})=>r.length>0?r.includes(l):!0).sort(function(l,p){let{element:u}=l,{element:m}=p;return u===m||!u||!m?0:u.compareDocumentPosition(m)&2?1:-1}).map(({id:l})=>l),i=z.get(e);if(!i)return;let{child:a}=i;z.set(e,{...i,child:{...a,[t]:n}})};var Bl=(e=[],t=[],r="")=>e.filter(o=>{let s=o?.[r];return!t.some(n=>n?.[r]===s)}),zl=(e,t,r)=>e.map((o,s)=>{let n=o?.[r];return!t.some(a=>a?.[r]===n)?{isNewElement:!0,key:o?.[r],index:s}:{isNewElement:!1,key:o?.[r],index:s}}),jl=({arr:e=[],key:t=""})=>e.every(r=>r?.[t]),Hl=({current:e,previous:t,key:r})=>jl({arr:e,key:r})&&jl({arr:t,key:r}),Ul=({data:e=[],key:t=""})=>e.filter((r,o,s)=>s.findIndex(n=>n?.[t]===r?.[t])===o),Ft=({component:e,getChildren:t,element:r})=>{let o=t(e);return!o||!r?[]:[...o].filter(s=>{let n=ot({id:s})??null;return r.contains(n)})};var co=new Map,vs=e=>{let t=c.getUnivoqueId();return co.set(t,e),t},ql=(e="")=>{let t=co.get(e);return co.delete(e),t??Cr};var Bm="beforebegin",zm="afterend";function Hm({key:e,currentUnique:t,index:r,render:o,id:s,repeatId:n}){let i=t?.[r],a=` ${as}="${e}"
    ${wr}="${vs({current:i,index:r})}"
    ${xr}="${n}" ${Nt}="${s}"`;return o({sync:a,html:(l,...p)=>g(l,...p)})}var Gl=({current:e=[],previous:t=[],containerList:r=document.createElement("div"),targetComponent:o="",getChildren:s=()=>{},key:n="",id:i="",render:a,repeatId:l})=>{let p=Ul({data:e,key:n}),m=Bl(t,p,n).map(w=>{let C=w?.[n];return ss({key:C,parentId:i,container:r})}),d=zl(p,t,n),f=d.filter(({isNewElement:w})=>!w).map(w=>ss({key:w.key,parentId:i,container:r})),x=f[0]?.parentNode??r;x&&(x.innerHTML=""),f.forEach(w=>{x&&w&&x.append(w)}),ys({id:i,component:o,filterBy:f});let b=Ft({component:o,getChildren:s,element:r}),S=d.reduce((w,C)=>C.isNewElement?(w.at(-1).push(C),w):[...w,[C]],[[]]);return S?.[0].length||S.shift(),S.forEach(w=>{let C=w[0],{isNewElement:P}=C,$=P?ot({id:b[0]}):ss({key:w[0]?.key,parentId:i,container:r}),N=w.filter(D=>D.isNewElement).map(D=>Hm({targetComponent:o,key:D.key,currentUnique:p,index:D.index,render:a,id:i,repeatId:l})).join(""),I=P?Bm:zm;$?$.insertAdjacentHTML(I,N):r.insertAdjacentHTML("afterbegin",N)}),m.forEach(w=>{let C=os({element:w});C&&Ke({id:C})}),p};var Jl=({current:e=[],previous:t=[],containerList:r=document.createElement("div"),targetComponent:o="",getChildren:s=()=>{},render:n,id:i,repeatId:a})=>{let l=e.length,p=t.length,u=l-p;if(u>0&&[...new Array(u).keys()].map((d,f)=>{let x=e?.[f+p],b=f+p,S=`${wr}="${vs({current:x,index:b})}"
            ${xr}="${a}" ${Nt}="${i}"`;return n({sync:S,html:(w,...C)=>g(w,...C)})}).forEach(d=>{r.insertAdjacentHTML("beforeend",d)}),u<0){let m=Ft({component:o,getChildren:s,element:r}),d=m.filter((x,b)=>b>=e.length),f=m.filter((x,b)=>b<e.length);r.textContent="",d.forEach(x=>{Ke({id:x})}),f.forEach(x=>{let b=ot({id:x});b&&r.append(b)})}return e};var Yl=async({containerList:e=document.createElement("div"),targetComponent:t="",current:r=[],previous:o=[],getChildren:s=()=>{},key:n="",id:i,render:a,repeatId:l})=>{let m=(Hl({current:r,previous:o,key:n})?Gl:Jl)({current:r,previous:o,containerList:e,targetComponent:t,getChildren:s,key:n,id:i,render:a,repeatId:l});return L.set("repeaterParserRoot",e,!1),await L.emitAsync("repeaterParserRoot"),ys({id:i,component:t}),m};var Xl=({state:e="",setState:t=()=>{},emit:r=()=>{},watch:o=()=>{},props:s={},bindEvents:n=[],clean:i=!1,dynamicProps:a,beforeUpdate:l=()=>{},afterUpdate:p=()=>{},getChildren:u=()=>{},key:m="",id:d="",containerList:f,repeatId:x="",render:b})=>{let S=Vl(f,x);S?.remove(),S?.removeCustomComponent();let w=ot({id:d}),C=!0;return o(e,async(P,$)=>{if(!c.checkType(Array,P))return;if(fs({id:d,prop:e}),Wl({id:d,state:e,container:f})){io({id:d,prop:e}),t(e,$,!1);return}let I=An({id:x});I&&(i||C)&&(Ft({component:I,getChildren:u,element:f}).forEach(M=>{Ke({id:M})}),f.textContent=""),Dl({id:d,state:e,container:f}),l({element:w,container:f,childrenId:Ft({component:I,getChildren:u,element:f})});let D=await Yl({state:e,containerList:f,targetComponent:I,current:P,previous:i||C?[]:$,getChildren:u,key:m,props:s,dynamicProps:a,bindEvents:n,id:d,render:b,repeatId:x});C=!1;let H=An({id:x}),W=Ft({component:H,getChildren:u,element:f});[...W].forEach((X,M)=>{let O=D?.[M];O&&rs({id:X,value:{current:O,index:M}})}),c.useNextLoop(async()=>{p({element:w,container:f,childrenId:W}),$l({id:d,state:e,container:f}),io({id:d,prop:e}),t(e,D,!1)})}),()=>r(e)};var Ar=new Map,Kl=({repeatId:e,obj:t})=>{Ar.set(e,t)};var Zl=({repeatId:e,placeholderListObj:t})=>{if(!e||!t||t.length===0)return;let r=Ar.get(e);if(!r)return;let o=t.find(({id:n})=>n===e),s=Xl({...r,repeatId:e,containerList:o?.parent??document.createElement("div")});return Ar.delete(e),s};var Ql=({componentParsed:e,instanceName:t="",props:r={},state:o={},key:s="",currentRepeaterState:n=Cr,isRepeater:i=!1,parentPropsWatcher:a=[],destroy:l=()=>{},freezedPros:p=[],isCancellable:u=!0,child:m={},parentId:d="",id:f="",componentName:x=""})=>{let b=c.createStore(o);return il({props:r,store:b}),z.set(f,{element:e,component:x,instanceName:t,destroy:l,parentPropsWatcher:a,key:s,currentRepeaterState:n,isRepeater:i,isCancellable:u,id:f,parentId:d,freezedPros:p,child:m,state:b}),{getState:()=>b.get(),setState:(S="",w={},C=!0)=>{gs({id:f,prop:S})||b.set(S,w,C)},emit:(S="")=>b.emit(S),emitAsync:async(S="")=>await b.emitAsync(S),computed:(S="",w=[],C=()=>{})=>b.computed(S,w,C),watch:(S="",w=()=>{})=>b.watch(S,w)}};var ec=({component:e})=>{let t=e.getId(),r=e.getInstanceName(),o=e.getParentId(),s=e.getStaticPropsId(),n=e.getDynamicPropsid(),i=e.getBindEventsId(),a=e.getDynamicPropsFromSlotId(),l=e.getPropsFromSlotId(),p=e.getCurrentListValueId(),u=ql(p),m=e.getCurrentKey()??"",d=e.getComponentName(),f=s?.split(" ").join(""),x=l?.split(" ").join(""),b=ps(f),S=ps(x),w={...e.dataset};return{component:e,props:{...ms({componentName:d,currentProps:w}),...ms({componentName:d,currentProps:b}),...ms({componentName:d,currentProps:S})},id:t,componentName:d,instanceName:r,key:m,dynamicPropsId:n,dynamicPropsIdFromSlot:a,bindEventsId:i,currentListValueReal:u,parentId:o}};var tc=({component:e,state:t={},isCancellable:r=!0})=>{let{component:o,props:s,id:n,componentName:i,instanceName:a,key:l,dynamicPropsId:p,dynamicPropsIdFromSlot:u,currentListValueReal:m,bindEventsId:d,parentId:f}=ec({component:e}),{getState:x,setState:b,emit:S,emitAsync:w,computed:C,watch:P}=Ql({component:e,componentParsed:o,props:s,state:t,destroy:()=>{},id:n,componentName:i,instanceName:a,key:l,isCancellable:r,parentId:f});ll({componentId:n}),al({id:n});let $=[],N=I=>bs({id:n,component:I});return m?.index!==-1&&rs({id:n,value:m}),Rn({propsId:p,componentId:n}),Rn({propsId:u,componentId:n}),{bindEventsId:d,key:l,id:n,componentParsed:o,getState:x,setState:b,emit:S,emitAsync:w,computed:C,watch:P,repeatId:$,getChildren:N,watchSync:(I,D)=>{let H=P(I,D);return S(I),H},freezeProp:I=>fs({id:n,prop:I}),unFreezeProp:I=>io({id:n,prop:I}),unBind:()=>ul({id:n}),bindProps:I=>`${Tr}="${dl({...I,parentId:I?.forceParent?void 0:n})}" `,staticProps:I=>` ${Ot}="${us(I)}" `,syncParent:` ${Nt}="${n}" `,remove:()=>{Ke({id:n}),Rr()},removeDOM:I=>{I.remove(),Rr()},getParentId:()=>kr(n),watchParent:(I,D)=>{let H=ao(kr(n),I,D);ds({id:n,unWatchArray:[H]})},html:(I,...D)=>({id:n,content:g(I,...D),componentParsed:o}),onMount:I=>Fl({id:n,cb:I}),bindEvents:I=>`${ls}="${tl(I)}"`,delegateEvents:I=>`${ut}="${Ka(I)}"`,repeat:({watch:I,clean:D=!1,beforeUpdate:H=()=>{},afterUpdate:W=()=>{},key:X,render:M})=>{let O=c.getUnivoqueId();return $.push(O),Kl({repeatId:O,obj:{state:I,setState:b,emit:S,watch:P,clean:D,beforeUpdate:H,afterUpdate:W,getChildren:N,key:X,id:n,render:M}}),`<mobjs-repeater ${is}="${O}" style="display:none;"/>`}}};function Um(e){let t=[];for(let r of Fe(e))r?.isRepeater&&r?.getRepeatId?.()&&t.push(r);return t}var rc=e=>{let t=[],r=e||document.body;for(let o of r.children)t=[...t,...Um(o)];return t};var Ss=async({element:e,functionToFireAtTheEnd:t=[],isCancellable:r=!0,currentIterationCounter:o=0,currentSelectors:s=[]})=>{if(!e)return;let n=Nn(),{componentToParse:i,parseSourceArray:a}=Ol({element:e,currentSelectors:s}),l=o===Lt().maxParseIteration;if(l&&console.warn(`dom parse reached max parse limit: ${o}`),!i||l){let M=On();for(let O of t.reverse()){let{onMount:G,fireDynamic:oe,fireFirstRepeat:j}=O;await G(),oe(),j()}t.length=0,s.length=0,Za(e);return}let p=i?.getComponentName(),u=n?.[p]?.componentFunction,m=n?.[p]?.componentParams,{isolateOnMount:d,isolateCreation:f,scoped:x}=m;if(!u){console.warn(`${p} component is not registered.`),i.remove(),await Ss({element:e,functionToFireAtTheEnd:t,isCancellable:r,currentIterationCounter:o+=1,currentSelectors:a});return}let b=tc({component:i,...m,isCancellable:r}),{content:S,componentParsed:w,id:C}=await u(b),{newElement:P}=await kl({content:S,componentParsed:w,isolateCreation:f}),$=P?Nl(P):{};if(cl({element:P,id:C}),!P){let M=On();return}ja({id:C,newElement:P});let I=[...rc(P)].map(M=>({parent:M.parentNode,id:M.getRepeatId()})),H=(b?.repeatId).map(M=>Zl({repeatId:M,placeholderListObj:I})),W=b?.bindEventsId;W&&rl({element:P,componentId:C,bindEventsId:W});let X=x===pt?Lt().scoped:x;X&&await Mn({isolateOnMount:d,id:C,element:P,refsCollection:$}),P?.inizializeCustomComponent?.(b),t.push({onMount:async()=>{X||await Mn({isolateOnMount:d,id:C,element:P,refsCollection:$})},fireDynamic:()=>{Pn({componentId:C,inizilizeWatcher:!0})},fireFirstRepeat:H.length>0?()=>{H.forEach(M=>{M?.()})}:()=>{}}),await Ss({element:e,functionToFireAtTheEnd:t,isCancellable:r,currentIterationCounter:o+=1,currentSelectors:a})};var _r=async({element:e,isCancellable:t=!0})=>{Tl(),await Ss({element:e,isCancellable:t,currentIterationCounter:0})},oc=()=>{L.watch("repeaterParserRoot",async e=>{await _r({element:e})})},uo=async e=>{await _r({element:e})};var sc=e=>{let t=Object.entries(e).reduce((r,o)=>{let[s,n]=o;return{...r,[s]:n}},{});L.set("routeList",t)},Ts=()=>{let{routeList:e}=L.get();return e},nc=({routeName:e=""})=>{L.set("index",e)};var ic=({routeName:e=""})=>{L.set("pageNotFound",e)};var ac=async({route:e=""})=>{let t=Ga(),r=document?.querySelector(t),{activeRoute:o}=L.get();L.set("beforeRouteLeave",o),L.set("beforeRouteChange",e);let s=!1,n=L.watch("beforeRouteChange",()=>{s=!0});Rr(),L.set("activeRoute",e);let i=Ts()?.[e]?.();r.innerHTML="",vl(),r.insertAdjacentHTML("afterbegin",i),await _r({element:r}),s||L.set("atfterRouteChange",e),document.body.dataset.route=e,n?.()};var lc=({url:e=""})=>{let{index:t,pageNotFound:r}=L.get();return e===""?t:e in Ts()?e:r};var cc=()=>{let e=window.location.hash.slice(1);ac({route:lc({url:e})})},uc=()=>{cc(),window.addEventListener("hashchange",()=>cc())},Ln=({url:e=""})=>{window.location.hash=e};var pc=()=>{L.watch("beforeRouteLeave",e=>{console.log("----------------"),console.log("before route leave",e)}),L.watch("beforeRouteChange",(e,t)=>{console.log("before route change:"),console.log("previous:",t),console.log("current:",e)}),L.watch("activeRoute",e=>{console.log("active route:",e)}),L.watch("atfterRouteChange",e=>{console.log("after route change",e),console.log("----------------")})};var Fn=async({rootId:e,wrapper:t,contentId:r,components:o={},pages:s={},afterInit:n=()=>{},index:i="home",pageNotFound:a="pageNotFound"})=>{let l=document.querySelector(e),p=t();!r||!l||(qa({contentId:r}),Ya({element:l}),oc(),_l(o),sc(s),nc({routeName:i}),ic({routeName:a}),l.insertAdjacentHTML("afterbegin",p),await _r({element:l,isCancellable:!1}),c.useFrameIndex(()=>{c.useNextTick(()=>{n()})},5),pc(),uc())};var Ue=(e="")=>{if(!e)return;let r=[...z.values()].find(({instanceName:o})=>o===e)?.id;if(!r){console.warn("getIdByName failed no name");return}return r};var T=(e={})=>`${Ot}="${us(e)}"`;var hc=`<?xml version="1.0" encoding="UTF-8"?>
<svg width="700pt" height="700pt" version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
 <g>
  <path d="m221.2 367.92-102.48-85.684 102.48-85.117c7.2812-6.1602 8.3984-16.801 2.2383-24.078-3.3594-3.9219-8.3984-6.1602-13.441-6.1602-3.9219 0-7.8398 1.1211-11.199 3.9219l-117.6 98.555c-3.9219 3.3594-6.1602 7.8398-6.1602 13.441 0 5.6016 2.2383 10.078 6.1602 13.441l118.16 98.559c3.3594 2.8008 6.7188 3.9219 11.199 3.9219 5.0391 0 10.078-2.2383 13.441-6.1602 5.6016-7.8438 4.4805-18.484-2.8008-24.641z"/>
  <path d="m623.28 288.96c0-5.0391-2.2383-10.078-6.1602-13.441l-118.72-98.559c-3.3594-2.8008-7.2812-3.9219-11.199-3.9219-5.0391 0-10.078 2.2383-13.441 6.1602-6.1602 7.2812-5.0391 17.922 2.2383 24.078l102.48 85.68-101.92 85.684c-7.2812 6.1602-8.3984 16.801-2.2383 24.078 3.3594 3.9219 7.8398 6.1602 13.441 6.1602 3.9219 0 7.8398-1.6797 11.199-3.9219l118.16-98.559c3.918-3.3594 6.1602-8.3984 6.1602-13.438z"/>
  <path d="m408.8 72.801c-1.6797-0.55859-3.3594-0.55859-5.0391-0.55859-7.2812 0-14 4.4805-16.238 12.32l-124.88 399.84c-2.8008 8.9609 2.2383 18.48 11.199 21.281 1.6797 0.55859 3.3594 0.55859 5.0391 0.55859 7.8398 0 14-5.0391 16.238-12.32l124.32-400.4c3.3633-8.3984-1.6758-17.918-10.637-20.719z"/>
 </g>
</svg>
`;var dc=({getState:e,onMount:t,html:r})=>{let{style:o,drawers:s}=e();return t(({element:n})=>(n.addEventListener("click",()=>{let i=Ue("codeOverlay");Pe(i,"urls",s),Pe(i,"activeContent","description")}),()=>{n.remove()})),r`
        <button class="c-code-btn c-code-btn--${o}">
            <span class="c-code-btn__icon">${hc}</span>
        </button>
    `};var Jm=E({name:"code-button",component:dc,exportState:["drawers","style"],state:{drawers:()=>({value:[],type:Array}),style:()=>({value:"",type:"String"})}});var ue=e=>{if(c.checkType(Number,e))return Math.round(e*1e4)/1e4||0;if(Math.abs(e)<1){let t=Number.parseInt(e.toString().split("e-")[1]);t&&(e*=Math.pow(10,t-1),e="0."+new Array(t).join("0")+e.toString().slice(2))}else{let t=Number.parseInt(e.toString().split("+")[1]);t>20&&(t-=20,e/=Math.pow(10,t),e+=new Array(t+1).join("0"))}return Number.parseFloat(Number.parseFloat(e).toFixed(4))},Ae=(e,t,r)=>Math.min(Math.max(e,t),r),mc=(e,t,r)=>(1-r)*e+r*t,Vt=(e,t)=>{let r=Object.keys(e).sort(),o=Object.keys(t).sort();return r.length===o.length&&r.every((s,n)=>s===o[n])},po=(e,t)=>{let r=[];for(let o=0;o<e.length;o+=t){let s=e.slice(o,o+t);r.push(s)}return r},fc=(e,t)=>e.map(r=>r[t]);var xs=e=>e.map(t=>(t.settled||(t.fromValue=t.currentValue),t)),Ct=e=>e.map(t=>(t.fromValue=t.toValue,t.currentValue=t.toValue,t)),Or=e=>e.map(t=>(t.toValue=t.currentValue,t.fromValue=t.currentValue,t)),Nr=(e,t)=>{let r=Object.keys(e);return t.map(o=>{if(r.includes(o.prop)){let s=o.fromValue,n=o.toValue;o.fromValue=n,o.toValue=s}return o})},ws=(e,t)=>e.map(r=>(r.toValue=t?r.toValue+r.currentValue:r.toValue,r));var gc=(e,t)=>e.map(r=>(r.shouldUpdate&&(r.toValProcessed=t?r.toValue+1e-5:r.toValue-r.fromValue+1e-5),r));var Ne=(e,t,r=!0)=>{e=(s=>{let n;try{n=JSON.parse(JSON.stringify(s))}catch{n=Object.assign({},s)}return n})(e);let o=s=>s&&typeof s=="object";return!o(e)||!o(t)?t:(Object.keys(t).forEach(s=>{let n=e[s],i=t[s];Array.isArray(n)&&Array.isArray(i)?r?(e[s]=n.map((a,l)=>i.length<=l?a:Ne(a,i[l],r)),i.length>n.length&&(e[s]=e[s].concat(i.slice(n.length)))):e[s]=n.concat(i):o(n)&&o(i)?e[s]=Ne(Object.assign({},n),i,r):e[s]=i}),e)};var ho="row",mo="col",Cs="radial",ht="start",Mr="end",Lr="center",Fr="edges",Vr="random",bc="MERGE_FROM_UP",Vn="MERGE_FROM_DOWN",Qt="equal",er="start",tr="end",rr="center",Dr={type:Qt,each:0,waitComplete:!1,from:ht,grid:{col:1,row:1,direction:mo}},xe={index:0,frame:0};var fo={default:{tension:20,mass:1,friction:5,velocity:0,precision:.01},gentle:{tension:120,mass:1,friction:14,velocity:0,precision:.01},wobbly:{tension:180,mass:1,friction:12,velocity:0,precision:.01},bounce:{tension:200,mass:3,friction:5,velocity:0,precision:.01},scroller:{tension:10,mass:1,friction:5,velocity:0,precision:.5}};var Z={easeLinear:"easeLinear",easeInQuad:"easeInQuad",easeOutQuad:"easeOutQuad",easeInOutQuad:"easeInOutQuad",easeInCubic:"easeInCubic",easeOutCubic:"easeOutCubic",easeInOutCubic:"easeInOutCubic",easeInQuart:"easeInQuart",easeOutQuart:"easeOutQuart",easeInOutQuart:"easeInOutQuart",easeInQuint:"easeInQuint",easeOutQuint:"easeOutQuint",easeInOutQuint:"easeInOutQuint",easeInSine:"easeInSine",easeOutSine:"easeOutSine",easeInOutSine:"easeInOutSine",easeInExpo:"easeInExpo",easeOutExpo:"easeOutExpo",easeInOutExpo:"easeInOutExpo",easeInCirc:"easeInCirc",easeOutCirc:"easeOutCirc",easeInOutCirc:"easeInOutCirc",easeInElastic:"easeInElastic",easeOutElastic:"easeOutElastic",easeInOutElastic:"easeInOutElastic",easeInBack:"easeInBack",easeOutBack:"easeOutBack",easeInOutBack:"easeInOutBack",easeInBounce:"easeInBounce",easeOutBounce:"easeOutBounce",easeInOutBounce:"easeInOutBounce"},yo="min",yc="max",$n="desktop",vo="easeLinear",go="default",Wn={xSmall:320,small:360,medium:600,tablet:768,desktop:992,large:1200,xLarge:1400},jn=10,bo=.06,Bn="#ff0000",zn="#14df3b",Hn=8,Un=10,qn=1e3,Gn=!1,Ym=!1,Xm=!1,Km=.01,Zm=.06,vc=e=>{let t=ge({prop:"fpsScalePercent",value:e?.fpsScalePercent,defaultValue:c.store.getProp("fpsScalePercent"),type:Object}),r=ge({prop:"useScaleFps",value:e?.useScaleFps,defaultValue:c.store.getProp("useScaleFps"),type:Boolean}),o=ge({prop:"deferredNextTick",value:e?.deferredNextTick,defaultValue:c.store.getProp("deferredNextTick"),type:Boolean}),s=ge({prop:"usePassive",value:e?.usePassive,defaultValue:c.store.getProp("usePassive"),type:Boolean}),n=ge({prop:"throttle",value:e?.throttle,defaultValue:c.store.getProp("throttle"),type:Number}),i=Qm(e?.mq),a=ge({prop:"defaultMq.value",value:e?.defaultMq?.value,defaultValue:$n,type:String}),l=ge({prop:"defaultMq.type",value:e?.defaultMq?.type,defaultValue:yo,type:String}),p=ge({prop:"sequencer.duration",value:e?.sequencer?.duration,defaultValue:jn,type:Number}),u=Dn(e?.sequencer?.ease,"sequencer"),m=ge({prop:"scrolTrigger.springConfig",value:e?.scrollTrigger?.springConfig,defaultValue:go,type:String}),d=ge({prop:"scrolTrigger.lerpConfig",value:e?.scrollTrigger?.lerpConfig,defaultValue:bo,type:Number}),f=ge({prop:"scrolTrigger.markerColor.startEnd",value:e?.scrollTrigger?.markerColor?.startEnd,defaultValue:Bn,type:String}),x=ge({prop:"scrolTrigger.markerColor.item",value:e?.scrollTrigger?.markerColor?.item,defaultValue:zn,type:String}),b=ge({prop:"parallax.defaultRange",value:e?.parallax?.defaultRange,defaultValue:Hn,type:Number}),S=ge({prop:"parallax.springConfig",value:e?.parallax?.springConfig,defaultValue:go,type:String}),w=ge({prop:"parallax.lerpConfig",value:e?.parallax?.lerpConfig,defaultValue:bo,type:Number}),C=ge({prop:"parallaxTween.duration",value:e?.parallaxTween?.duration,defaultValue:Un,type:Number}),P=Dn(e?.parallaxTween?.ease,"parallaxTween"),$=ge({prop:"tween.duration",value:e?.tween?.duration,defaultValue:qn,type:Number}),N=Dn(e?.tween?.ease,"tween"),I=ge({prop:"tween.relative",value:e?.tween?.relative,defaultValue:Gn,type:Boolean}),D=ge({prop:"spring.relative",value:e?.spring?.relative,defaultValue:Ym,type:Boolean}),H=ge({prop:"lerp.relative",value:e?.lerp?.relative,defaultValue:Xm,type:Boolean}),W=ge({prop:"lerp.precision",value:e?.lerp?.precision,defaultValue:Km,type:Number}),X=ge({prop:"lerp.velocity",value:e?.lerp?.velocity,defaultValue:Zm,type:Number});return{fpsScalePercent:t,useScaleFps:r,deferredNextTick:o,throttle:n,usePassive:s,mq:i,defaultMq:{value:a,type:l},sequencer:{duration:p,ease:u},scrollTrigger:{springConfig:m,lerpConfig:d,markerColor:{startEnd:f,item:x}},parallax:{defaultRange:b,springConfig:S,lerpConfig:w},parallaxTween:{duration:C,ease:P},tween:{duration:$,ease:N,relative:I},spring:{relative:D,config:e?.spring?.config?{...fo,...e.spring.config}:fo},lerp:{relative:H,precision:W,velocity:X}}},ge=({prop:e,value:t,defaultValue:r,type:o})=>{let s=c.checkType(o,t);return s||console.warn(`handleSetUp error: ${e}: ${t}, is not valid must be a ${c.getTypeName(o)}`),s?t:r},Qm=e=>{let t=c.checkType(Object,e)&&Object.values(e).every(r=>c.checkType(Number,r));return t||console.warn("handleSetUp error: mq must be an object as { ..., String: Number }"),t?e:Wn},Dn=(e,t)=>{let r=Object.keys(Z).includes(e);return!r&&e!==void 0&&e!==null&&console.warn(`handleSetUp error: ${t}.ease properties is not valid`),r?e:vo};function Sc(){return{fpsScalePercent:c.store.getProp("fpsScalePercent"),useScaleFps:c.store.getProp("useScaleFps"),deferredNextTick:c.store.getProp("deferredNextTick"),throttle:c.store.getProp("throttle"),usePassive:c.store.getProp("usePassive"),mq:Wn,defaultMq:{value:$n,type:yo},sequencer:{duration:jn,ease:vo},scrollTrigger:{springConfig:go,lerpConfig:bo,markerColor:{startEnd:Bn,item:zn}},parallax:{defaultRange:Hn,springConfig:go,lerpConfig:bo},parallaxTween:{duration:Un,ease:vo},tween:{duration:qn,ease:vo,relative:Gn},spring:{relative:!1,config:fo},lerp:{relative:!1,precision:.01,velocity:.06}}}var Y=(()=>{let e=Sc();return{set:s=>{e=vc(Ne(Sc(),s)),"usePassive"in s&&c.store.set("usePassive",e.usePassive),"fpsScalePercent"in s&&c.store.set("fpsScalePercent",e.fpsScalePercent),"useScaleFps"in s&&c.store.set("useScaleFps",e.useScaleFps),"deferredNextTick"in s&&c.store.set("deferredNextTick",e.deferredNextTick),"throttle"in s&&c.store.set("throttle",e.throttle)},get:s=>{if(s in e)return e[s];console.warn(`handleSetUp: ${s} is not a setup propierties`)},print:()=>{console.log("Writable props:"),console.log(e)}}})();var h={PX:"px",VH:"vh",VW:"vw",WPERCENT:"w",HPERCENT:"h",DEGREE:"deg",PLUS_HEIGHT:"+height",PLUS_HEIGHT_HALF:"+halfHeight",PLUS_WIDTH:"+width",PLUS_WIDTH_HALF:"+halfWidth",MINUS_HEIGHT:"-height",MINUS_HEIGHT_HALF:"-halfHeight",MINUS_WIDTH:"-width",MINUS_WIDTH_HALF:"-halfWidth",POSITION_BOTTOM:"bottom",POSITION_TOP:"top",POSITION_LEFT:"left",POSITION_RIGHT:"right",DIRECTION_VERTICAL:"vertical",DIRECTION_HORIZONTAL:"horizontal",TYPE_PARALLAX:"parallax",TYPE_SCROLLTRIGGER:"scrolltrigger",PROP_VERTICAL:"y",PROP_HORIZONTAL:"x",PROP_ROTATE:"rotate",PROP_ROTATEY:"rotateY",PROP_ROTATEX:"rotateX",PROP_ROTATEZ:"rotateZ",PROP_OPACITY:"opacity",PROP_SCALE:"scale",PROP_SCALE_X:"scaleX",PROP_SCALE_Y:"scaleY",PROP_TWEEN:"tween",TWEEN_TWEEN:"parallaxTween",TWEEN_TIMELINE:"sequencer",ALIGN_START:"start",ALIGN_TOP:"top",ALIGN_RIGHT:"right",ALIGN_CENTER:"center",ALIGN_BOTTOM:"bottom",ALIGN_LEFT:"left",ALIGN_END:"end",IN_STOP:"in-stop",IN_BACK:"in-back",OUT_STOP:"out-stop",OUT_BACK:"out-back",EASE_SPRING:"spring",EASE_LERP:"lerp",EASE_PRECISION:.001,SCROLL_UP:"up",SCROLL_DOWN:"down",ON_LEAVE:"ON_LEAVE",ON_LEAVE_BACK:"ON_LEAVE_BACK",ON_ENTER:"ON_ENTER",ON_ENTER_BACK:"ON_ENTER_BACK",ON_NOOP:"ON_NOOP"};var It=e=>e.map(t=>`${t} | `).join(""),Dt=(e,t,r)=>{console.warn(`${e}: ${JSON.stringify(t)} and to ${JSON.stringify(r)} is not equal`)},Ze=e=>{console.warn(`stagger col of grid is out of range, it must be less than ${e} ( staggers length )`)},Et=e=>{console.warn(`tween | sequencer: ${e} is not valid value, must be a number or a Function that return a number`)},Tc=e=>{console.warn(`sequencer, start option: ${e} value is not valid, must be a Number`)},xc=e=>{console.warn(`sequencer, end option: ${e} value is not valid, must be a Number`)},wc=()=>{console.warn("relative prop is not allowed inside a timeline")},Cc=e=>{console.warn(`Timeline Supend: ${e()} is not a valid value, must be a boolean`)},Ic=()=>{console.warn("SyncTimeline: in revese ( or yoyo mode) only goTo || goFromTo || set action is allowed. Using goFrom makes no sense in this context. Timeline will stopped.")},Ec=e=>{console.warn(`timeline setTween: ${e} is not an array of tween`)},kc=e=>{console.warn(`timeline setTween: ${e} is not a string`)},Rc=e=>{console.warn(`asyncTimeline.setTween() label: ${e} not found`)},Pc=()=>{console.warn("setTween fail")},Ac=e=>{console.warn(`label ${e} not founded`)},_c=e=>{console.warn(`sequencer.add(fn,time) ${e}: fn must be Function`)},Oc=e=>{console.warn(`sequencer.add(fn,time) ${e}: time must be a Number`)},Jn=e=>{console.warn(`${e} doesn't exist in spring configuration list`)},Nc=()=>{console.warn("Spring configProp: all prop must be a positive Number")},Mc=e=>{console.warn(`Spring config: ${e}: config must have friction/mass/precision/tesnion props and must be a number`)},or=e=>{console.warn(`${e} doesn't exist in tweens ease function`)},Is=()=>{console.warn("stagger each must be a Number ")},Lc=e=>{console.warn(`stagger, row/col: ${e} value is not valid, must be a Number`)},Fc=()=>{console.warn("Stagger error: waitComplete propierties must be a Boolean")},Vc=()=>{console.warn("Stagger error: in grid option direction should be a string radial/col/row")};var Dc=()=>{console.warn("Stagger error: in col/row direction 'from' propierties must be a string start/end/center/edges or a number")},$c=e=>{console.warn(`Stagger error: from: ${e} is not a valid value, must be a string start/end/center/edges or a number or a Object {x:Number,y:Number}`)},Wc=e=>{console.warn(`duration error: ${e} is not valid duration must be a number`)},jc=e=>{console.warn(`duration error: ${e} is not valid duration must be a number or a Function that return a number`)},Bc=e=>{console.warn(`repeat error: ${e} is not valid repeat value must be a Number`)};var zc=e=>{console.warn(`data inizializiation error; ${e} is not a valid value, must be a string`)},Hc=e=>{console.warn(`data inizializiation error; ${e} is not a valid value, must be a number`)},Uc=()=>{console.warn("createStaggers error: items array can not be empty")},qc=()=>{console.warn("createStaggers error: each element of the array must be an Element or an Object")},Gc=()=>{console.warn(`screateStaggers error: type should be: ${Qt} || ${ht} || ${tr} || ${rr}`)},Jc=e=>{console.warn(`createStagger:  each must be between 1 and ${e}`)},Yc=(e,t)=>{console.warn(`${t}: relative prop: ${e} is not a valid parameter, must be a boolean `)},Yn=(e,t)=>{console.warn(`${t}: '${e}' is not Boolean`)},Xc=(e,t)=>{console.warn(`${t}: '${e}' is not String`)},Kc=(e,t)=>{console.warn(`${t}: '${e}' is not Number`)},Zc=(e,t)=>{console.warn(`${t}: '${e}' is not Function`)},Qc=()=>{console.warn("Lerp error: velocity is not valid, must be a Number greater than 0 and less than 1")},eu=()=>{console.warn("Lerp error: precision is not valid, must be a number greater than 0")},sr=e=>{console.warn(`asyncTimeline error: ${e} cannot be used inside group`)},tu=e=>{console.warn(`${e} value must be a string`)},ru=()=>{console.warn("tween added to asyncTimeline or used inside sync() method must be instance of HandleLerp | HandleTween | HandleSpring")},ou=()=>{console.warn("asyncTimeline arror: delay must be a Number")},su=e=>{console.warn(`${e} not found`)},nu=e=>{console.warn(`timeline add async function, ${e} is not a function `)},iu=(e,t)=>{console.warn(`${t} direction: ${e} is not valid value: must be ${h.DIRECTION_VERTICAL} | ${h.DIRECTION_HORIZONTAL}`)},au=e=>{console.warn(`scrollTrigger error; ${e} propierties: value must be a Object like { position: top|bottom|left|right, value: () => { return Number} } `)},lu=()=>{console.warn("scrollTrigger error; dynamicRange propierties: value must be a Function that return a Number")},cu=()=>{console.warn("parallax|scrolTrigger error: tween is not valid, must be an instance of HandleSequencer || ParallaxTween")},uu=(e,t)=>{console.warn(`parallax error align propierties: ${e} is not valid must be one of ${It(t)} or a Number between 0 and 100`)},pu=(e,t)=>{console.warn(`parallax error align propierties: ${e} is not valid must be one of ${It(t)}`)},hu=(e,t)=>{console.warn(`${t}: '${e}' is not Number, must be a number between 0 and 100`)},du=(e,t)=>{console.warn(`parallax error type propierties: ${e} is not valid must be one of ${It(t)}`)},mu=(e,t)=>{console.warn(`parallax/scrollTrigger error propierties props: ${e} is not valid must be one of ${It(t)} or a custom css propierites like margin|line-height|...`)},fu=(e,t)=>{console.warn(`parallax error easeType props: ${e} is not valid must be one of ${It(t)}`)},gu=(e,t,r)=>{console.warn(`${r} error easeType props: ${e} is not valid must be one of ${It(t)}`)},bu=()=>{console.warn('Scrolltrigger warning: spring animation is only available for native properties and ParallaxTween, Check that with the "propierties" property set to "tween" no HandleSequencer is associated with the "tween" property')},yu=(e,t)=>{console.warn(`parallax/scrollTrigger error springConfig props: ${e} is not valid must be one of ${It(t)}`)},vu=e=>{console.warn(`parallax error range propierties, current value: ${e}, the value must be a number between 0 and 9.99`)},Su=e=>{console.warn(`scrollTrigger error range propierties: ${e} is not a String`)},Xn=(e,t,r,o)=>{console.warn(`${o} error ${r} propierties: ${e} is not valid must be one of ${It(t)}`)},Tu=()=>{console.warn("Parallax warning: if propierties is a tween the only choice is ParallaxTween, HandleSequencer or empty tween propierites is not allowed inside a parallax")},xu=()=>{console.warn("parallax/ScrollTrrigger error: velocity is not valid, must be a Number greater than 0 and less than 1")},wu=()=>{console.warn('parallax/ScrollTrrigger warning:  The property is "tween" but no tween has been associated, associate a tween with the "tween" property')},Cu=()=>{console.warn('parallax/ScrollTrrigger: there is tween associated but pros "propierties" is not set to "tween"')},Iu=(e,t)=>{console.warn(`${e}: ${t} is not a function`)},Kn=(e,t,r)=>{console.warn(`scrollTrigger error range : with '${t}' propierties ${e} is not valid, add one of the following unit misure: ${It(r)}, es: 45deg|100px|50vw etc..`)},Eu=e=>{console.warn(`scrollTrigger error range : with custom css propierties '${e}' no unit misure is necessary, the default unit misure will be used (px). Only '-' for negative value is allowed`)},ku=(e,t)=>{console.warn(`scrollTrigger error range : with '${t}' propierties ${e} is not valid no unit misure is necessary. Only '-' for negative value is allowed`)};var st={[Z.easeLinear]:(e,t,r,o)=>r*e/o+t,[Z.easeInQuad]:(e,t,r,o)=>r*(e/=o)*e+t,[Z.easeOutQuad]:(e,t,r,o)=>-r*(e/=o)*(e-2)+t,[Z.easeInOutQuad]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e+t:-r/2*(--e*(e-2)-1)+t,[Z.easeInCubic]:(e,t,r,o)=>r*(e/=o)*e*e+t,[Z.easeOutCubic]:(e,t,r,o)=>r*((e=e/o-1)*e*e+1)+t,[Z.easeInOutCubic]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e+t:r/2*((e-=2)*e*e+2)+t,[Z.easeInQuart]:(e,t,r,o)=>r*(e/=o)*e*e*e+t,[Z.easeOutQuart]:(e,t,r,o)=>-r*((e=e/o-1)*e*e*e-1)+t,[Z.easeInOutQuart]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e*e+t:-r/2*((e-=2)*e*e*e-2)+t,[Z.easeInQuint]:(e,t,r,o)=>r*(e/=o)*e*e*e*e+t,[Z.easeOutQuint]:(e,t,r,o)=>r*((e=e/o-1)*e*e*e*e+1)+t,[Z.easeInOutQuint]:(e,t,r,o)=>(e/=o/2)<1?r/2*e*e*e*e*e+t:r/2*((e-=2)*e*e*e*e+2)+t,[Z.easeInSine]:(e,t,r,o)=>-r*Math.cos(e/o*(Math.PI/2))+r+t,[Z.easeOutSine]:(e,t,r,o)=>r*Math.sin(e/o*(Math.PI/2))+t,[Z.easeInOutSine]:(e,t,r,o)=>-r/2*(Math.cos(Math.PI*e/o)-1)+t,[Z.easeInExpo]:(e,t,r,o)=>e===0?t:r*Math.pow(2,10*(e/o-1))+t,[Z.easeOutExpo]:(e,t,r,o)=>e===o?t+r:r*(-Math.pow(2,-10*e/o)+1)+t,[Z.easeInOutExpo]:(e,t,r,o)=>e===0?t:e===o?t+r:(e/=o/2)<1?r/2*Math.pow(2,10*(e-1))+t:r/2*(-Math.pow(2,-10*--e)+2)+t,[Z.easeInCirc]:(e,t,r,o)=>-r*(Math.sqrt(1-(e/=o)*e)-1)+t,[Z.easeOutCirc]:(e,t,r,o)=>r*Math.sqrt(1-(e=e/o-1)*e)+t,[Z.easeInOutCirc]:(e,t,r,o)=>(e/=o/2)<1?-r/2*(Math.sqrt(1-e*e)-1)+t:r/2*(Math.sqrt(1-(e-=2)*e)+1)+t,[Z.easeInElastic]:(e,t,r,o)=>{let s=1.70158,n=0,i=r;return e===0?t:(e/=o)===1?t+r:(n||(n=o*.3),i<Math.abs(r)?(i=r,s=n/4):s=n/(2*Math.PI)*Math.asin(r/i),-(i*Math.pow(2,10*(e-=1))*Math.sin((e*o-s)*(2*Math.PI)/n))+t)},[Z.easeOutElastic]:(e,t,r,o)=>{let s=1.70158,n=0,i=r;return e===0?t:(e/=o)===1?t+r:(n||(n=o*.3),i<Math.abs(r)?(i=r,s=n/4):s=n/(2*Math.PI)*Math.asin(r/i),i*Math.pow(2,-10*e)*Math.sin((e*o-s)*(2*Math.PI)/n)+r+t)},[Z.easeInOutElastic]:(e,t,r,o)=>{let s=1.70158,n=0,i=r;return e===0?t:(e/=o/2)===2?t+r:(n||(n=o*(.3*1.5)),i<Math.abs(r)?(i=r,s=n/4):s=n/(2*Math.PI)*Math.asin(r/i),e<1?-.5*(i*Math.pow(2,10*(e-=1))*Math.sin((e*o-s)*(2*Math.PI)/n))+t:i*Math.pow(2,-10*(e-=1))*Math.sin((e*o-s)*(2*Math.PI)/n)*.5+r+t)},[Z.easeInBack]:(e,t,r,o,s=1.70158)=>r*(e/=o)*e*((s+1)*e-s)+t,[Z.easeOutBack]:(e,t,r,o,s=1.70158)=>r*((e=e/o-1)*e*((s+1)*e+s)+1)+t,easeInOutBack:(e,t,r,o,s=1.70158)=>(e/=o/2)<1?r/2*(e*e*(((s*=1.525)+1)*e-s))+t:r/2*((e-=2)*e*(((s*=1.525)+1)*e+s)+2)+t,[Z.easeInBounce]:(e,t,r,o)=>r-st[Z.easeOutBounce](o-e,0,r,o)+t,[Z.easeOutBounce]:(e,t,r,o)=>(e/=o)<1/2.75?r*(7.5625*e*e)+t:e<2/2.75?r*(7.5625*(e-=1.5/2.75)*e+.75)+t:e<2.5/2.75?r*(7.5625*(e-=2.25/2.75)*e+.9375)+t:r*(7.5625*(e-=2.625/2.75)*e+.984375)+t,[Z.easeInOutBounce]:(e,t,r,o)=>e<o/2?st[Z.easeInBounce](e*2,0,r,o)*.5+t:st[Z.easeOutBounce](e*2-o,0,r,o)*.5+r*.5+t};var Ve=e=>e in st?st[e]:(or(e),st[Y.get("tween").ease]);var Ru=e=>e?e.replaceAll(/[\s#$()*+,.?[\\\]^{|}-]/g,"\\$&"):"",Zn=e=>/^[+-]?\d+(\.\d+)?$/.test(e),Pu=e=>/^\d+\.\d+$|^\d+$/.test(e),me=(e,t)=>{let r=new RegExp(`^${Ru(t)}$`,"i");return(e.match(r)||[]).length},dt=(e,t)=>{let r=new RegExp(`[0-9]${t}$`,"i");return(e.match(r)||[]).length},Qn=(e,t)=>e.some(r=>{let o=new RegExp(`[0-9]${r}$`,"i");return(t.match(o)||[]).length}),ei=(e,t)=>e.some(r=>{let o=new RegExp(`^${Ru(r)}$`,"i");return(t.match(o)||[]).length});var Au=e=>e&&(me(e,h.PROP_VERTICAL)?h.PROP_VERTICAL:me(e,h.PROP_HORIZONTAL)?h.PROP_HORIZONTAL:me(e,h.PROP_ROTATE)?h.PROP_ROTATE:me(e,h.PROP_ROTATEY)?h.PROP_ROTATEY:me(e,h.PROP_ROTATEX)?h.PROP_ROTATEX:me(e,h.PROP_OPACITY)?h.PROP_OPACITY:me(e,h.PROP_SCALE)?h.PROP_SCALE:me(e,h.PROP_SCALE_X)?h.PROP_SCALE_X:me(e,h.PROP_SCALE_Y)?h.PROP_SCALE_Y:me(e,h.PROP_TWEEN)?h.PROP_TWEEN:e),_u=e=>{if(e){if(dt(e,h.PX))return h.PX;if(dt(e,h.VH))return h.VH;if(dt(e,h.VW))return h.VW}return""},Es=e=>me(e,h.POSITION_TOP)?h.POSITION_TOP:me(e,h.POSITION_BOTTOM)?h.POSITION_BOTTOM:me(e,h.POSITION_LEFT)?h.POSITION_LEFT:me(e,h.POSITION_RIGHT)?h.POSITION_RIGHT:"",Ou=e=>dt(e,h.PX)?h.PX:dt(e,h.VH)?h.VH:dt(e,h.VW)?h.VW:dt(e,h.WPERCENT)?h.WPERCENT:dt(e,h.HPERCENT)?h.HPERCENT:dt(e,h.DEGREE)?h.DEGREE:h.PX;var nt=e=>c.checkType(Number,e)||c.checkType(Function,e)&&c.checkType(Number,e()),ks=({start:e,end:t})=>{let r=c.checkType(Number,e),o=c.checkType(Number,t);return r||Tc(e),o||xc(t),r&&o},$t=e=>{let t=c.checkType(Number,e);return!t&&e!==void 0&&e!==null&&Wc(e),t?e:Y.get("sequencer").duration},Rs=e=>{let t=c.checkType(Number,e);return!t&&e!==void 0&&e!==null&&Bc(e),t?e:1},Nu=e=>{let t=e in st;return!t&&e!==void 0&&e!==null&&or(e),t?e:Y.get("sequencer").ease},Mu=e=>{let t=e in st;return!t&&e!==void 0&&e!==null&&or(e),t?Ve(e):Ve(Y.get("parallaxTween").ease)},Lu=(e,t)=>{let r=c.checkType(String,e),o=c.checkType(Number,t);return r||zc(e),o||Hc(t),r&&o},Fu=e=>{if(!e)return null;let t=c.checkType(Number,e);return t||Is(),t},Vu=e=>{if(!e)return null;let r=[ht,Mr,Lr,Fr,Vr].includes(e),o=c.checkType(Number,e),s=c.checkType(Object,e),n=r||o||s;return n||$c(e),n},ti=e=>{if(!e)return null;let t=c.checkType(Number,e);return t||Lc(e),t},Du=e=>{if(!e)return null;let r=[Cs,ho,mo].includes(e);return r||Vc(e),r},$u=e=>{if(!e)return null;let t=c.checkType(Boolean,e);return t||Fc(e),t},Wu=(e=[])=>{let t=c.checkType(Array,[...e])&&e.length>0;return t||Uc(),t},ju=(e=[])=>c.checkType(Array,[...e])&&e.length>0?e:[],Bu=e=>{if(!e)return null;let r=[Qt,er,tr,rr].includes(e);return r||Gc()};var Wt=(e,t)=>{let r=c.checkType(Boolean,e);return!r&&e!==void 0&&e!==null&&Yc(e,t),r?e:Y.get(t).relative},Ps=e=>{let t=e in st;return!t&&e!==void 0&&e!==null&&or(e),t?Ve(e):Ve(Y.get("tween").ease)},As=e=>{let t=e in st;return!t&&e!==void 0&&e!==null&&or(e),t?e:Y.get("tween").ease},ri=e=>{let{config:t}=Y.get("spring"),r=e in t,o=r?t[e]:{},n=(r?c.checkType(Object,o)&&"tension"in o&&"mass"in o&&"friction"in o&&"velocity"in o&&"precision"in o:!1)?Object.values(o).every(i=>c.checkType(Number,i)&&i>=0):null;return!r&&e!==void 0&&e!==null&&Jn(e),!n&&r&&Mc(e),n?t[e]:t.default},zu=e=>{let{config:t}=Y.get("spring"),r=e in t;return!r&&e!==void 0&&e!==null&&Jn(e),r},oi=e=>{let t=c.checkType(Object,e)&&Object.values(e).every(r=>c.checkType(Number,r)&&r>=0);return!t&&e!==void 0&&e!==null&&Nc(),t?e:{}},si=e=>{let r=c.checkType(Function,e)?e():e,o=c.checkType(Number,r);return!o&&e!==void 0&&e!==null&&jc(e),o?r:Y.get("tween").duration},Qe=(e,t)=>{let r=c.checkType(Boolean,e);return!r&&e!==void 0&&e!==null&&Yn(e,t),r&&e===!0},Q=(e,t,r)=>{let o=c.checkType(Boolean,e);return!o&&e!==void 0&&e!==null&&Yn(e,t),o?e:r},_s=(e,t,r)=>{let o=c.checkType(String,e);return!o&&e!==void 0&&e!==null&&Xc(e,t),o?e:r},mt=(e,t,r)=>{let o=c.checkType(Number,Number.parseFloat(e));return!o&&e!==void 0&&e!==null&&Kc(e,t),o?e:r},De=(e,t,r)=>{let o=c.checkType(Function,e);return!o&&e!==void 0&&e!==null&&Zc(e,t),o?e:r},Os=e=>{let t=c.checkType(Number,e)&&e>0&&e<=1;return!t&&e!==void 0&&e!==null&&Qc(),t?e:Y.get("lerp").velocity},Ns=e=>{let t=c.checkType(Number,e);return!t&&e!==void 0&&e!==null&&eu(),t?e:Y.get("lerp").precision},Hu=(e,t)=>{let r=c.checkType(String,e);return!r&&e!==void 0&&e!==null&&tu(t),r},So=e=>{let t=c.checkType(Number,e);return!t&&e!==void 0&&e!==null&&ou(),t?e:null},nr=e=>{let t=e?.getType?.()&&(e.getType()==="LERP"||e.getType()==="SPRING"||e.getType()==="TWEEN");return!t&&e!==void 0&&e!==null&&ru(),t},Uu=(e,t)=>{e===-1&&su(t)},jt=(e,t,r)=>{let o=c.checkType(Function,e);return!o&&e!==void 0&&e!==null&&Iu(r,e),o?e:t},qu=e=>{let t=c.checkType(Function,e);return!t&&e!==void 0&&e!==null&&nu(e),t?e:({resolve:r})=>{r()}},Gu=e=>{let t=c.checkType(Array,e);return!t&&e!==void 0&&e!==null&&Ec(e),t},Ju=e=>{let t=c.checkType(String,e);return!t&&e!==void 0&&e!==null&&kc(e),t},$r=(e,t=!1)=>{let o=c.checkType(Element,e)?e:document.querySelector(e),s=o&&o!==void 0&&o!==null;return t?s?o:window:s?o:document.createElement("div")},ni=e=>{let r=c.checkType(Element,e)?e:document.querySelector(e);return r&&r!==void 0&&r!==null?r:null},To=(e,t)=>{let o=[h.DIRECTION_VERTICAL,h.DIRECTION_HORIZONTAL].includes(e);return!o&&e!==void 0&&e!==null&&iu(e,t),o?e:h.DIRECTION_VERTICAL},ii=(e,t)=>{let r=[h.POSITION_TOP,h.POSITION_LEFT,h.POSITION_RIGHT,h.POSITION_BOTTOM],o=c.checkType(Object,e),s=o&&c.checkType(String,e?.position)&&r.includes(e.position),n=o&&c.checkType(Function,e.value)&&c.checkType(Number,e.value()),i=o&&s&&n;return i||au(t),i?e:null},Yu=e=>{let t=c.checkType(Function,e)&&c.checkType(Number,e());return!t&&e!==void 0&&e!==null&&lu(),t?e:null},Xu=e=>{let t=e?.getType?.()&&(e.getType()===h.TWEEN_TWEEN||e.getType()===h.TWEEN_TIMELINE);return!t&&e!==void 0&&e!==null&&cu(),t?e:{}},Ku=e=>{let t=[h.ALIGN_START,h.ALIGN_TOP,h.ALIGN_RIGHT,h.ALIGN_CENTER,h.ALIGN_BOTTOM,h.ALIGN_LEFT,h.ALIGN_END],r=t.includes(e)||c.checkType(Number,Number.parseFloat(e));return!r&&e!==void 0&&e!==null&&uu(e,t),r?e:h.ALIGN_CENTER},Zu=e=>{let t=[h.IN_BACK,h.IN_STOP,h.OUT_BACK,h.OUT_STOP],r=t.includes(e);return!r&&e!==void 0&&e!==null&&pu(e,t),r?e:!1},ai=(e,t,r)=>{let o=c.checkType(Number,Number.parseFloat(e));return!o&&e!==void 0&&e!==null&&hu(e,t),o?e:r},Qu=e=>{let t=e?e.toLowerCase():null,r=[h.TYPE_PARALLAX,h.TYPE_SCROLLTRIGGER],o=r.includes(t);return!o&&t!==void 0&&t!==null&&du(t,r),o?t:h.TYPE_PARALLAX},ep=(e,t)=>(()=>{if(t===h.TYPE_PARALLAX){let o=Pu(e),s=c.checkType(Number,Number.parseFloat(e))&&o&&e>=0&&e<10;return!s&&e!==void 0&&e!==null&&vu(e),s?10-e:10-Y.get("parallax").defaultRange}else{let o=c.checkType(String,e);return!o&&e!==void 0&&e!==null&&Su(e),o?e:"0px"}})(),ir=(e,t,r)=>{let o=Y.get("mq"),s=Y.get("defaultMq").value,n=Object.keys(o),i=c.checkType(String,e)&&n.includes(e);return!i&&e!==void 0&&e!==null&&Xn(e,n,t,r),i?e:s},ar=(e,t,r)=>{let o=Y.get("defaultMq").type,s=[yc,yo],n=c.checkType(String,e)&&s.includes(e);return!n&&e!==void 0&&e!==null&&Xn(e,s,t,r),n?e:o},tp=(e,t,r,o)=>{let s=[h.PROP_VERTICAL,h.PROP_HORIZONTAL,h.PROP_ROTATE,h.PROP_ROTATEY,h.PROP_ROTATEX,h.PROP_ROTATEZ,h.PROP_OPACITY,h.PROP_SCALE,h.PROP_SCALE_X,h.PROP_SCALE_Y,h.PROP_TWEEN],n=c.checkType(String,e);!n&&e!==void 0&&e!==null&&mu(e,s);let i=t===h.TYPE_PARALLAX&&e===h.PROP_TWEEN&&!r;!r&&!o&&e===h.PROP_TWEEN&&wu(),(r||o)&&e!==h.PROP_TWEEN&&Cu(),i&&Tu();let a=i?h.PROP_VERTICAL:e,l=Au(a);return n?l:h.PROP_VERTICAL},rp=(e,t,r)=>{let o=[h.EASE_SPRING,h.EASE_LERP],s=t&&r&&e===h.EASE_SPRING,n=o.includes(e);!n&&e!==void 0&&e!==null&&fu(e,o),s&&bu();let i=n?e:h.EASE_LERP,a=s?h.EASE_LERP:i;return n?e:a},Ms=(e,t)=>{let r=[h.EASE_SPRING,h.EASE_LERP],o=r.includes(e);return!o&&e!==void 0&&e!==null&&gu(e,r,t),o?e:h.EASE_LERP},op=(e,t)=>{let r=Y.get("spring").config,o=Object.keys(r),s=t===h.TYPE_PARALLAX?Y.get("parallax").springConfig:Y.get("scrollTrigger").springConfig,n=o.includes(e);return!n&&e!==void 0&&e!==null&&yu(e,o),n?e:s},sp=(e,t)=>{let r=c.checkType(Number,Number.parseFloat(e))&&e>0&&e<=1;!r&&e!==void 0&&e!==null&&xu();let o=t===h.TYPE_PARALLAX?Y.get("parallax").lerpConfig:Y.get("scrollTrigger").lerpConfig;return r?Number.parseFloat(e):o},np=(e,t)=>{let r=[h.PX,h.VW,h.VH,h.WPERCENT,h.HPERCENT];if(t===h.PROP_VERTICAL||t===h.PROP_HORIZONTAL){let s=Qn(r,e);return s||Kn(e,t,r),s?e:"0px"}if(t===h.PROP_ROTATE||t===h.PROP_ROTATEX||t===h.PROP_ROTATEY||t===h.PROP_ROTATEZ){let s=Qn([h.DEGREE],e);return s||Kn(e,t,[h.DEGREE]),s?e:"0"}if(t===h.PROP_SCALE||t===h.PROP_SCALE_X||t===h.PROP_SCALE_Y){let s=Zn(e);return s||ku(e,t),s?e:"0"}let o=Zn(e);return o||Eu(t),o?e:"0"};var Ls=e=>{let{instantFps:t}=c.store.get(),r=Math.round(e*(t/60));return e===1&&r===0?e:r},et=e=>({type:Bu(e?.stagger?.type)?e.stagger.type:Dr.type,each:Fu(e?.stagger?.each)?e.stagger.each:Dr.each,from:Vu(e?.stagger?.from)?e?.stagger?.from:er,grid:{col:ti(e?.stagger?.grid?.col)?e.stagger.grid.col:Dr.grid.col,row:ti(e?.stagger?.grid?.row)?e.stagger.grid.row:Dr.grid.row,direction:Du(e?.stagger?.grid?.direction)?e.stagger.grid.direction:mo},waitComplete:$u(e?.stagger?.waitComplete)?e.stagger.waitComplete:Dr.waitComplete}),ft=(e,t)=>e.length>t.length?e:t;var xo=e=>e%2,ef=e=>Math.floor(Math.random()*e),tf=(e,t,r)=>{let o=new Set(e.slice(0,r).map(i=>i.frame));return e.map((i,a)=>a*t).filter(i=>!o.has(i))},rf=(e,t,r,o=[])=>{let{from:s,each:n}=r,i=Ls(n);if(s===Vr)return{index:e,frame:o[ef(o.length)]};if(s===ht)return{index:e,frame:e*i};if(s===Mr)return{index:e,frame:(t-1-e)*i};if(s===Lr){let a=Math.trunc(t/2);return e>a?{index:e,frame:(e-a)*i}:e<a?xo(t)===0&&a-e===1?{index:e,frame:0}:xo(t)===0?{index:e,frame:(a-e-1)*i}:{index:e,frame:(a-e)*i}:{index:e,frame:0}}if(s===Fr){let a=Math.trunc(t/2);return e>a?{index:e,frame:(t-a-1-(e-a))*i}:e<a?xo(t)===0&&a-e===1?{index:e,frame:(a-1)*i}:xo(t)===0?{index:e,frame:(t-a-(a-e))*i}:{index:e,frame:(t-a-1-(a-e))*i}:xo(t)?{index:e,frame:a*i}:{index:e,frame:(a-1)*i}}if(s&&Te(Number,s)){let a=s>=t?t-1:s;return e>a?{index:e,frame:(e-a)*n}:e<a?{index:e,frame:(a-e)*n}:{index:e,frame:0}}return{index:0,frame:0}},ip=(e,t,r)=>{if(t.grid.direction===ho){let o=po(e,r);return[...[...new Array(t.grid.col).keys()].reduce((n,i,a)=>[...n,...fc(o,a)],[])].flat()}else return e},ap=({arr:e,endArr:t,stagger:r,slowlestStagger:o,fastestStagger:s})=>{let n=r?.grid?.col<=1?e.length:r.grid.col,i=r?.grid?.row<=1?e.length:r.grid.row,l=ip(e,r,n).map(b=>b&&b!==void 0?b:{index:0,frame:0}),u=ip(t,r,n).map(b=>b&&b!==void 0?b:{index:0,frame:0}),m=r.grid.direction===ho?i:n,d=po(l,m),f=d[0];return f.forEach((b,S)=>{let{index:w,frame:C}=rf(S,d[0].length,r,tf(f,r.each,S));b.index=w,b.frame=C,C>=o.frame&&(o={index:w,frame:C}),C<=s.frame&&(s={index:w,frame:C})}),d.forEach(b=>{b.forEach((S,w)=>{S&&(S.index=d[0][w].index,S.frame=d[0][w].frame)})}),d.flat().forEach((b,S)=>{l[S].index=b.index,l[S].frame=b.frame,u.length>0&&(u[S].index=b.index,u[S].frame=b.frame)}),{staggerArray:l,staggerArrayOnComplete:u,fastestStagger:s,slowlestStagger:o}};var of=(e,t,r)=>e.reduce((o,s,n)=>{let i=Math.abs(n-r),a=s.reduce((l,p,u)=>u<t-i||u>t+i?l:[...l,p],[]);return[...o,a]},[]),sf=(e,t,r,o)=>e.reduce((s,n,i)=>{let a=Math.abs(i-r),l=[];if(i>=r&&i<=r*2)return[...s,l];let p=t-a,u=t+a;for(let d=0;d<a;d++)Fs(o,r+d,p)&&l.push(o[r+d][p]),Fs(o,r+d,u)&&l.push(o[r+d][u]),d>0&&(Fs(o,r-d,p)&&l.push(o[r-d][p]),Fs(o,r-d,u)&&l.push(o[r-d][u]));let m=l.filter(d=>d!=null);return[...s,m]},[]),Fs=(e,t,r)=>e[t]!==void 0&&e[t][r]!==void 0,li=(e,t)=>{let{col:r}=t.grid,{x:o,y:s}=t.from,n=po(e,r);[...new Array(r).keys()].forEach(()=>{n.push([])});let i=of(n,o,s),a=sf(i,o,s,n),l=i.reduce((f,x,b)=>{let S=[...i[b],...a[b]];return f.push(S),f},[]),p=l.length;return{cleanArray:((s>=p/2?bc:Vn)===Vn?l.reduce((f,x,b)=>{if(b<s)return f;if(b===s){let S=[...l[b]];return f.push(S),f}else{let S=l[s-(b-s)]??[],w=[...l[b],...S];return f.push(w),f}},[]):l.reduce((f,x,b)=>{if(b>s)return f;if(b===s){let S=[...l[b]];return f.push(S),f}else{let S=l[s+(s-b)]??[],w=[...l[b],...S];return f.push(w),f}},[]).reverse()).reduce((f,x)=>x.length===0?f:[...f,x],[])}};var nf=({arr:e,stagger:t,slowlestStagger:r,fastestStagger:o,endArr:s})=>{c.checkType(Object,t?.from)||(t.from={}),c.checkType(Number,t?.from?.x)||(t.from={...t.from,x:0}),c.checkType(Number,t?.from?.y)||(t.from={...t.from,y:0});let{cleanArray:n}=li(e,t),i=0;n.forEach((u,m)=>{u.forEach(d=>{let f=Ls(t.each),x=m*f;d.index=i,d.frame=x,x>=r.frame&&(r={index:i,frame:x}),x<=o.frame&&(o={index:i,frame:x}),i++})});let a=(()=>{if(s.length>0){let{cleanArray:u}=li(s,t);return u.flat()}else return[]})(),l=n.flat(),p=a.flat();return l.forEach((u,m)=>{p.length>0&&(p[m].index=u.index,p[m].frame=u.frame)}),{staggerArray:l,staggerArrayOnComplete:p,fastestStagger:o,slowlestStagger:r}},af=({arr:e,endArr:t,stagger:r,slowlestStagger:o,fastestStagger:s})=>{let n=[ht,Mr,Lr,Fr,Vr];return(!c.checkType(String,r?.from)&&!c.checkType(Number,r?.from)||c.checkType(String,r?.from)&&!n.includes(r?.from))&&(Dc(),r.from=ht),ap({arr:e,endArr:t,stagger:r,slowlestStagger:o,fastestStagger:s})},tt=({arr:e,endArr:t,stagger:r,slowlestStagger:o,fastestStagger:s})=>{let n=r?.grid?.direction===Cs?nf({arr:e,endArr:t,stagger:r,slowlestStagger:o,fastestStagger:s}):af({arr:e,endArr:t,stagger:r,slowlestStagger:o,fastestStagger:s}),i=n.staggerArray,a=n.staggerArrayOnComplete,l=n.fastestStagger,p=n.slowlestStagger;return{staggerArray:i,staggerArrayOnComplete:a,fastestStagger:l,slowlestStagger:p}};var Wr=({stagger:e,callback:t,callbackCache:r,callBackObject:o,useStagger:s})=>{if(e.each===0||!s){c.useFrame(()=>{t.forEach(({cb:n})=>{n(o)})}),c.useFrame(()=>{r.forEach(({cb:n})=>{c.useCache.fireObject({id:n,obj:o})})});return}t.forEach(({cb:n,frame:i})=>{c.useFrameIndex(()=>{n(o)},i)}),r.forEach(({cb:n,frame:i})=>{c.useCache.update({id:n,callBackObject:o,frame:i})})},jr=({onComplete:e,callback:t,callbackCache:r,callbackOnComplete:o,callBackObject:s,stagger:n,slowlestStagger:i,fastestStagger:a,useStagger:l})=>{if(n.each===0||!l){e(),c.useNextFrame(()=>{t.forEach(({cb:p})=>{p(s)}),r.forEach(({cb:p})=>{c.useCache.fireObject({id:p,obj:s})}),o.forEach(({cb:p})=>{p(s)})});return}t.forEach(({cb:p,frame:u},m)=>{c.useFrameIndex(()=>{if(n.waitComplete){m===i.index&&(p(s),e());return}m===a.index&&(p(s),e())},u)}),r.forEach(({cb:p,frame:u},m)=>{c.useFrameIndex(()=>{if(n.waitComplete){m===i.index&&(c.useCache.fireObject({id:p,obj:s}),e());return}m===a.index&&(c.useCache.fireObject({id:p,obj:s}),e())},u)}),o.forEach(({cb:p,frame:u})=>{c.useFrameIndex(()=>{p(s)},u+1)})};var wo=c.createStore({id:0});var we=(e,t)=>{let{id:r}=wo.get(),o=[...t,{cb:e,id:r,index:-1,frame:-1}],s=r;return wo.quickSetProp("id",r+1),{arrayOfCallbackUpdated:o,unsubscribeCb:n=>n.map(({id:i,cb:a,index:l,frame:p})=>(i===s&&(a=()=>{}),{id:i,cb:a,index:l,frame:p}))}},gt=(e,t,r,o)=>{let{id:s}=wo.get(),{id:n,unsubscribe:i}=c.useCache.add(e,t),a=[...r,{cb:n,id:s,index:-1,frame:-1}];o.push(i);let l=s;return wo.quickSetProp("id",s+1),{arrayOfCallbackUpdated:a,unsubscribeCache:o,unsubscribeCb:p=>(i(),p.map(({id:u,cb:m,index:d,frame:f})=>(u===l&&(m=-1),{id:u,cb:m,index:d,frame:f})))}};var Bt=e=>Object.keys(e).map(t=>{if(!nt(e[t]))return Et(`${t}: ${e[t]}`),{prop:t,toValue:0,toFn:()=>{},toIsFn:!1,settled:!1};let r=c.checkType(Number,e[t])?e[t]:e[t]();return{prop:t,toValue:r,toFn:e[t],toIsFn:c.checkType(Function,e[t]),settled:!1}}),Br=e=>Object.keys(e).map(t=>{if(!nt(e[t]))return Et(`${t}: ${e[t]}`),{prop:t,fromValue:0,currentValue:0,fromFn:()=>{},fromIsFn:!1,settled:!1};let r=c.checkType(Number,e[t])?e[t]:e[t]();return{prop:t,fromValue:r,currentValue:r,fromFn:e[t],fromIsFn:c.checkType(Function,e[t]),settled:!1}}),zr=(e,t)=>Object.keys(e).map(r=>{if(!nt(t[r])||!nt(e[r]))return Et(`${r}: ${t[r]} || ${r}: ${e[r]}`),{prop:r,fromValue:0,fromFn:()=>{},fromIsFn:!1,currentValue:0,toValue:0,toFn:()=>{},toIsFn:!1,settled:!1};let o=c.checkType(Number,e[r])?e[r]:e[r](),s=c.checkType(Number,t[r])?t[r]:t[r]();return{prop:r,fromValue:o,fromFn:e[r],fromIsFn:c.checkType(Function,e[r]),currentValue:o,toValue:s,toFn:t[r],toIsFn:c.checkType(Function,t[r]),settled:!1}}),Hr=e=>Object.keys(e).map(t=>{if(!nt(e[t]))return Et(`${t}: ${e[t]}`),{prop:t,fromValue:0,fromFn:()=>{},fromIsFn:!1,currentValue:0,toValue:0,toFn:()=>{},toIsFn:!1,settled:!1};let r=c.checkType(Number,e[t])?e[t]:e[t]();return{prop:t,fromValue:r,fromFn:e[t],fromIsFn:c.checkType(Function,e[t]),currentValue:r,toValue:r,toFn:e[t],toIsFn:c.checkType(Function,e[t]),settled:!1}});var Ur=(e,t,r,o)=>{c.useFrame(()=>{c.useNextTick(({time:s,fps:n})=>{let i=e.map(({cb:a})=>a()).includes(!0);t(s,n,o),i&&r()})})};var zt=(e,t)=>{console.log(`stagger on ${e} loaded at: ${t} fps`)};var qr=(e,t,r,o)=>(c.checkType(Number,e)||Is(),e>0&&t&&(r.length>0||o.length>0));var Vs=(e,t)=>{c.useFrame(()=>{c.useNextTick(({time:r,fps:o})=>{e(r,o,t)})})};var fe=(e,t)=>e.map(r=>({[r.prop]:Number.parseFloat(r[t])})).reduce((r,o)=>({...r,...o}),{}),Gr=e=>e.map(t=>t.toIsFn?{[t.prop]:t.toFn}:{[t.prop]:Number.parseFloat(t.toValue)}).reduce((t,r)=>({...t,...r}),{}),Jr=e=>e.map(t=>t.fromIsFn?{[t.prop]:t.fromFn}:{[t.prop]:Number.parseFloat(t.fromValue)}).reduce((t,r)=>({...t,...r}),{});var Ds=(e,t)=>t.map(r=>{let o=e.find(s=>s.prop===r.prop);return o?{...r,...o}:r}),lp=(e,t)=>t.map(r=>{let o=e.find(s=>s.prop===r.prop);return o?{...r,...o,shouldUpdate:!0}:{...r,shouldUpdate:!1}});var kt=class{constructor(t){this.stagger=et(t),this.relative=Wt(t?.relative,"lerp"),this.velocity=Os(t?.velocity),this.precision=Ns(t?.precision),this.uniqueId=c.getUnivoqueId(),this.isActive=!1,this.currentResolve=void 0,this.currentReject=void 0,this.promise=void 0,this.values=[],this.initialData=[],this.callback=[],this.callbackCache=[],this.callbackOnComplete=[],this.callbackStartInPause=[],this.unsubscribeCache=[],this.pauseStatus=!1,this.firstRun=!0,this.useStagger=!0,this.fpsInLoading=!1,this.defaultProps={reverse:!1,velocity:this.velocity,precision:this.precision,relative:this.relative,immediate:!1,immediateNoPromise:!1},this.slowlestStagger=xe,this.fastestStagger=xe;let r=t?.data||null;r&&this.setData(r)}draw(t,r,o=()=>{}){this.isActive=!0,this.values.forEach(i=>{i.settled||(i.currentValue=mc(i.currentValue,i.toValue,this.velocity/r*60),i.currentValue=ue(i.currentValue),i.settled=Number(Math.abs(i.toValue-i.currentValue).toFixed(4))<=this.precision,i.settled&&(i.currentValue=i.toValue))});let s=fe(this.values,"currentValue");if(Wr({stagger:this.stagger,callback:this.callback,callbackCache:this.callbackCache,callBackObject:s,useStagger:this.useStagger}),this.values.every(i=>i.settled===!0)){let i=()=>{this.isActive=!1,this.values.forEach(l=>{l.fromValue=l.toValue}),this.pauseStatus||(o(),this.promise=void 0,this.currentReject=void 0,this.currentResolve=void 0)},a=fe(this.values,"toValue");jr({onComplete:i,callback:this.callback,callbackCache:this.callbackCache,callbackOnComplete:this.callbackOnComplete,callBackObject:a,stagger:this.stagger,slowlestStagger:this.slowlestStagger,fastestStagger:this.fastestStagger,useStagger:this.useStagger})}else c.useFrame(()=>{c.useNextTick(({time:i,fps:a})=>{this.isActive&&this.draw(i,a,o)})})}onReuqestAnim(t,r,o){this.values.forEach(s=>{s.currentValue=Number.parseFloat(s.fromValue)}),this.draw(t,r,o)}async inzializeStagger(){if(qr(this.stagger.each,this.firstRun,this.callbackCache,this.callback)){let{averageFPS:t}=await c.useFps();zt("lerp",t);let r=ft(this.callbackCache,this.callback);if(this.stagger.grid.col>r.length){Ze(r.length),this.firstRun=!1;return}let{staggerArray:o,staggerArrayOnComplete:s,fastestStagger:n,slowlestStagger:i}=tt({arr:r,endArr:this.callbackOnComplete,stagger:this.stagger,slowlestStagger:this.slowlestStagger,fastestStagger:this.fastestStagger});this.callbackCache.length>this.callback.length?this.callbackCache=o:this.callback=o,this.callbackOnComplete=s,this.slowlestStagger=i,this.fastestStagger=n,this.firstRun=!1}return{ready:!0}}async startRaf(t,r){this.fpsInLoading||(this.currentResolve=t,this.currentReject=r,this.firstRun&&(this.fpsInLoading=!0,await this.inzializeStagger(),this.fpsInLoading=!1),Ur(this.callbackStartInPause,this.onReuqestAnim.bind(this),this.pause.bind(this),t))}stop({clearCache:t=!0}={}){this.pauseStatus&&(this.pauseStatus=!1),this.values=Or(this.values),this.isActive&&t&&this.callbackCache.forEach(({cb:r})=>c.useCache.clean(r)),this.currentReject&&(this.currentReject(c.ANIMATION_STOP_REJECT),this.promise=void 0,this.currentReject=void 0,this.currentResolve=void 0),this.isActive&&(this.isActive=!1)}pause(){this.pauseStatus||(this.pauseStatus=!0,this.isActive&&(this.isActive=!1),this.values=xs(this.values))}resume(){this.pauseStatus&&(this.pauseStatus=!1,!this.isActive&&this.currentResolve&&Vs(this.onReuqestAnim.bind(this),this.currentResolve))}setData(t){this.values=Object.entries(t).map(r=>{let[o,s]=r;return{prop:o,toValue:s,fromValue:s,currentValue:s,fromFn:()=>{},fromIsFn:!1,toFn:()=>{},toIsFn:!1,settled:!1}}),this.initialData=this.values.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue}))}resetData(){this.values=Ne(this.values,this.initialData)}mergeProps(t){let r={...this.defaultProps,...t},{velocity:o,precision:s,relative:n}=r;return this.relative=Wt(n,"lerp"),this.velocity=Os(o),this.precision=Ns(s),r}goTo(t,r={}){if(this.pauseStatus)return;this.useStagger=!0;let o=Bt(t);return this.doAction(o,r,t)}goFrom(t,r={}){if(this.pauseStatus)return;this.useStagger=!0;let o=Br(t);return this.doAction(o,r,t)}goFromTo(t,r,o={}){if(this.pauseStatus)return;if(this.useStagger=!0,!Vt(t,r))return Dt("lerp goFromTo:",t,r),this.promise;let s=zr(t,r);return this.doAction(s,o,t)}set(t,r={}){if(this.pauseStatus)return;this.useStagger=!1;let o=Hr(t);return this.doAction(o,r,t)}doAction(t,r,o){this.values=Ds(t,this.values);let{reverse:s,immediate:n,immediateNoPromise:i}=this.mergeProps(r);if(Qe(s,"reverse")&&(this.values=Nr(o,this.values)),this.values=ws(this.values,this.relative),Qe(n,"immediate "))return this.isActive=!1,this.values=Ct(this.values),Promise.resolve();if(Qe(i,"immediateNoPromise")){this.isActive=!1,this.values=Ct(this.values);return}if(this.isActive||(this.promise=new Promise((a,l)=>{this.startRaf(a,l)})),this.promise)return this.promise}get(){return fe(this.values,"currentValue")}getInitialData(){return fe(this.initialData,"currentValue")}getFrom(){return fe(this.values,"fromValue")}getTo(){return fe(this.values,"toValue")}getFromNativeType(){return Jr(this.values)}getToNativeType(){return Gr(this.values)}getType(){return"LERP"}getId(){return this.uniqueId}updateVelocity(t){this.velocity=Os(t),this.defaultProps=Ne(this.defaultProps,{velocity:this.velocity})}updatePrecision(t){this.velocity=Ns(t),this.defaultProps=Ne(this.defaultProps,{precision:this.precision})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=we(t,this.callback);return this.callback=r,()=>this.callback=o(this.callback)}onStartInPause(t){let{arrayOfCallbackUpdated:r}=we(t,this.callbackStartInPause);return this.callbackStartInPause=r,()=>this.callbackStartInPause=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=we(t,this.callbackOnComplete);return this.callbackOnComplete=r,()=>this.callbackOnComplete=o(this.callbackOnComplete)}subscribeCache(t,r){let{arrayOfCallbackUpdated:o,unsubscribeCb:s,unsubscribeCache:n}=gt(t,r,this.callbackCache,this.unsubscribeCache);return this.callbackCache=o,this.unsubscribeCache=n,()=>this.callbackCache=s(this.callbackCache)}destroy(){this.promise&&this.stop(),this.callbackOnComplete=[],this.callbackStartInPause=[],this.callback=[],this.callbackCache=[],this.values=[],this.promise=void 0,this.unsubscribeCache.forEach(t=>t()),this.unsubscribeCache=[]}};var it=class{constructor(t){this.stagger=et(t),this.relative=Wt(t?.relative,"spring"),this.configProps=ri(t?.config),this.updateConfigProp(t?.configProp),this.uniqueId=c.getUnivoqueId(),this.isActive=!1,this.currentResolve=void 0,this.currentReject=void 0,this.promise=void 0,this.values=[],this.initialData=[],this.callback=[],this.callbackCache=[],this.callbackOnComplete=[],this.callbackStartInPause=[],this.unsubscribeCache=[],this.pauseStatus=!1,this.firstRun=!0,this.useStagger=!0,this.fpsInLoading=!1,this.defaultProps={reverse:!1,configProps:this.configProps,relative:this.relative,immediate:!1,immediateNoPromise:!1},this.slowlestStagger=xe,this.fastestStagger=xe;let r=t?.data||null;r&&this.setData(r)}draw(t,r,o=()=>{},s,n,i,a){this.isActive=!0,this.values.forEach(u=>{let m=-s*(u.currentValue-u.toValue),d=-n*u.velocity,f=(m+d)/i;u.velocity=u.velocity+f*1/r,u.currentValue=u.currentValue+u.velocity*1/r,u.currentValue=ue(u.currentValue);let x=Math.abs(u.velocity)<=.1,b=s===0?!0:Math.abs(u.toValue-u.currentValue.toFixed(4))<=a;u.settled=x&&b});let l=fe(this.values,"currentValue");if(Wr({stagger:this.stagger,callback:this.callback,callbackCache:this.callbackCache,callBackObject:l,useStagger:this.useStagger}),this.values.every(u=>u.settled===!0)){let u=()=>{this.isActive=!1,this.values.forEach(d=>{d.fromValue=d.toValue}),this.pauseStatus||(o(),this.promise=void 0,this.currentReject=void 0,this.currentResolve=void 0)},m=fe(this.values,"toValue");jr({onComplete:u,callback:this.callback,callbackCache:this.callbackCache,callbackOnComplete:this.callbackOnComplete,callBackObject:m,stagger:this.stagger,slowlestStagger:this.slowlestStagger,fastestStagger:this.fastestStagger,useStagger:this.useStagger})}else c.useFrame(()=>{c.useNextTick(({time:u,fps:m})=>{this.isActive&&this.draw(u,m,o,s,n,i,a)})})}onReuqestAnim(t,r,o){this.values.forEach(l=>{l.velocity=Math.trunc(this.configProps.velocity)});let s=this.configProps.tension,n=this.configProps.friction,i=Math.max(1,this.configProps.mass),a=this.configProps.precision;this.draw(t,r,o,s,n,i,a)}async inzializeStagger(){if(qr(this.stagger.each,this.firstRun,this.callbackCache,this.callback)){let{averageFPS:t}=await c.useFps();zt("spring",t);let r=ft(this.callbackCache,this.callback);if(this.stagger.grid.col>r.length){Ze(r.length),this.firstRun=!1;return}let{staggerArray:o,staggerArrayOnComplete:s,fastestStagger:n,slowlestStagger:i}=tt({arr:r,endArr:this.callbackOnComplete,stagger:this.stagger,slowlestStagger:this.slowlestStagger,fastestStagger:this.fastestStagger});this.callbackCache.length>this.callback.length?this.callbackCache=o:this.callback=o,this.callbackOnComplete=s,this.slowlestStagger=i,this.fastestStagger=n,this.firstRun=!1}return{ready:!0}}async startRaf(t,r){this.fpsInLoading||(this.currentResolve=t,this.currentReject=r,this.firstRun&&(this.fpsInLoading=!0,await this.inzializeStagger(),this.fpsInLoading=!1),Ur(this.callbackStartInPause,this.onReuqestAnim.bind(this),this.pause.bind(this),t))}stop({clearCache:t=!0}={}){this.pauseStatus&&(this.pauseStatus=!1),this.values=Or(this.values),this.isActive&&t&&this.callbackCache.forEach(({cb:r})=>c.useCache.clean(r)),this.currentReject&&(this.currentReject(c.ANIMATION_STOP_REJECT),this.promise=void 0,this.currentReject=void 0,this.currentResolve=void 0),this.isActive&&(this.isActive=!1)}pause(){this.pauseStatus||(this.pauseStatus=!0,this.isActive&&(this.isActive=!1),this.values=xs(this.values))}resume(){this.pauseStatus&&(this.pauseStatus=!1,!this.isActive&&this.currentResolve&&Vs(this.onReuqestAnim.bind(this),this.currentResolve))}setData(t){this.values=Object.entries(t).map(r=>{let[o,s]=r;return{prop:o,toValue:s,fromValue:s,velocity:this.configProps.velocity,currentValue:s,fromFn:()=>{},fromIsFn:!1,toFn:()=>{},toIsFn:!1,settled:!1}}),this.initialData=this.values.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue}))}resetData(){this.values=Ne(this.values,this.initialData)}mergeProps(t){let o=Y.get("spring").config,s=zu(t?.config)?o[t.config]:this.defaultProps.configProps,n=oi(t?.configProp),i={...s,...n},a={...this.defaultProps,...t,configProps:i},{configProps:l,relative:p}=a;return this.configProps=l,this.relative=p,a}goTo(t,r={}){if(this.pauseStatus)return;this.useStagger=!0;let o=Bt(t);return this.doAction(o,r,t)}goFrom(t,r={}){if(this.pauseStatus)return;this.useStagger=!0;let o=Br(t);return this.doAction(o,r,t)}goFromTo(t,r,o={}){if(this.pauseStatus)return;if(this.useStagger=!0,!Vt(t,r))return Dt("spring goFromTo:",t,r),this.promise;let s=zr(t,r);return this.doAction(s,o,t)}set(t,r={}){if(this.pauseStatus)return;this.useStagger=!1;let o=Hr(t);return this.doAction(o,r,t)}doAction(t,r,o){this.values=Ds(t,this.values);let{reverse:s,immediate:n,immediateNoPromise:i}=this.mergeProps(r);if(Qe(s,"reverse")&&(this.values=Nr(o,this.values)),this.values=ws(this.values,this.relative),Qe(n,"immediate "))return this.isActive=!1,this.values=Ct(this.values),Promise.resolve();if(Qe(i,"immediateNoPromise")){this.isActive=!1,this.values=Ct(this.values);return}if(this.isActive||(this.promise=new Promise((a,l)=>{this.startRaf(a,l)})),this.promise)return this.promise}get(){return fe(this.values,"currentValue")}getInitialData(){return fe(this.initialData,"currentValue")}getFrom(){return fe(this.values,"fromValue")}getTo(){return fe(this.values,"toValue")}getFromNativeType(){return Jr(this.values)}getToNativeType(){return Gr(this.values)}getType(){return"SPRING"}getId(){return this.uniqueId}updateConfigProp(t={}){let r=oi(t);this.configProps={...this.configProps,...r},this.defaultProps=Ne(this.defaultProps,{configProps:r})}updateConfig(t){this.configProps=ri(t),this.defaultProps=Ne(this.defaultProps,{configProps:this.configProps})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=we(t,this.callback);return this.callback=r,()=>this.callback=o(this.callback)}onStartInPause(t){let{arrayOfCallbackUpdated:r}=we(t,this.callbackStartInPause);return this.callbackStartInPause=r,()=>this.callbackStartInPause=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=we(t,this.callbackOnComplete);return this.callbackOnComplete=r,()=>this.callbackOnComplete=o(this.callbackOnComplete)}subscribeCache(t,r){let{arrayOfCallbackUpdated:o,unsubscribeCb:s,unsubscribeCache:n}=gt(t,r,this.callbackCache,this.unsubscribeCache);return this.callbackCache=o,this.unsubscribeCache=n,()=>this.callbackCache=s(this.callbackCache)}destroy(){this.promise&&this.stop(),this.callbackOnComplete=[],this.callbackStartInPause=[],this.callback=[],this.callbackCache=[],this.values=[],this.promise=void 0,this.unsubscribeCache.forEach(t=>t()),this.unsubscribeCache=[]}};var lf=(e="desktop")=>window.innerWidth<Y.get("mq")[e],cf=(e="desktop")=>window.innerWidth>=Y.get("mq")[e],uf=(e="desktop")=>Y.get("mq")[e],ee={max:lf,min:cf,getBreackpoint:uf};var pe=()=>{},$s=(...e)=>t=>e.reduce((r,o)=>r.then(o),Promise.resolve(t));var Ht=class{constructor(t={}){if(this.propsIsValid=!0,this.endValue=0,this.percent=0,this.screenWidth=0,this.screenHeight=0,this.firstTouchValue=0,this.threshold=30,this.maxValue=0,this.minValue=0,this.dragEnable=null,this.touchend=null,this.touchmove=null,this.prevTouchVal=0,this.touchVal=0,this.onUpdateScrollBar=pe,this.subscribeResize=pe,this.subscribeScrollStart=pe,this.subscribeScrollEnd=pe,this.subscribeTouchStart=pe,this.subscribeTouchEnd=pe,this.subscribeMouseDown=pe,this.subscribeMouseUp=pe,this.subscribeMouseWheel=pe,this.subscribeMouseMove=pe,this.subscribeTouchMove=pe,this.subscribeMouseClick=pe,this.motion=null,this.unsubscribeMotion=pe,this.unsubscribeOnComplete=pe,this.scrollbarIsRunning=!1,this.direction=To(t?.direction,"SmoothScroller"),this.easeType=Ms(t?.easeType,"SmoothScroller"),this.breakpoint=ir(t?.breakpoint,"breakpoint","SmoothScroller"),this.queryType=ar(t?.queryType,"queryType","SmoothScroller"),this.scroller=c.checkType(String,t?.scroller)?document.querySelector(t.scroller):t.scroller,!this.scroller){console.warn("SmoothScroller: scroller node not found"),this.propsIsValid=!1;return}if(this.screen=t?.screen?c.checkType(String,t.screen)?document.querySelector(t.screen):t.screen:document.documentElement,!this.screen){this.propsIsValid=!1,console.warn("SmoothScroller: screen node not found");return}this.scopedEvent=Q(t?.scopedEvent,"SmoothScroller: scopedEvent",!1),this.speed=mt(t?.speed,"SmoothScroller: speed",60),this.drag=Q(t?.drag,"SmoothScroller: drag",!1),this.onTickCallback=De(t?.onTick,"SmoothScroller: onTick",null),this.onUpdateCallback=De(t?.onUpdate,"SmoothScroller: onUpdate",null),this.onAfterRefresh=De(t?.afterRefresh,"SmoothScroller: afterRefresh",pe),this.afterInit=De(t?.afterInit,"SmoothScroller: afterInit",pe),this.children=t?.children||[],this.children.forEach(r=>{r.setScroller(this.scroller),r.setDirection(this.direction),r.setScreen(this.screen),r.setBreakPoint(this.breakpoint),r.setQueryType(this.queryType),r.init()}),this.scopedWhell=r=>{let{spinY:o}=c.normalizeWheel(r);this.onScopedWhell({target:r.target,spinY:o})},this.scopedTouchMove=r=>{let{clientX:o,clientY:s}=r.touches?r.touches[0]:r;this.onScopedTouchMove({client:{x:o,y:s}})}}init(){if(this.propsIsValid){switch(this.easeType){case h.EASE_SPRING:{this.motion=new it;break}default:{this.motion=new kt;break}}this.scopedEvent?(this.scroller.addEventListener("wheel",this.scopedWhell,{passive:!0}),this.scroller.addEventListener("mousemove",this.scopedTouchMove,{passive:!0}),this.scroller.addEventListener("touchmove",this.scopedTouchMove,{passive:!0})):(this.subscribeMouseWheel=c.useMouseWheel(t=>this.onWhell(t)),this.subscribeMouseMove=c.useMouseMove(t=>this.onTouchMove(t)),this.subscribeTouchMove=c.useTouchMove(t=>this.onTouchMove(t))),this.subscribeResize=c.useResize(()=>this.refresh()),this.subscribeScrollStart=c.useScrollStart(()=>this.refreshScroller()),this.subscribeScrollEnd=c.useScrollEnd(()=>this.refreshScroller()),this.subscribeTouchStart=c.useTouchStart(t=>this.onMouseDown(t)),this.subscribeTouchEnd=c.useTouchEnd(t=>this.onMouseUp(t)),this.subscribeMouseDown=c.useMouseDown(t=>this.onMouseDown(t)),this.subscribeMouseUp=c.useMouseUp(t=>this.onMouseUp(t)),this.drag&&(this.subscribeMouseClick=c.useMouseClick(({target:t,preventDefault:r})=>{this.preventChecker({target:t,preventDefault:r})})),this.initMotion(),ee[this.queryType](this.breakpoint)&&(this.setScrolerStyle(),this.refreshScroller()),c.useFrameIndex(()=>{c.useNextTick(()=>{this.afterInit?.(),this.children.forEach(t=>{t.refresh()})})},3)}}setScrolerStyle(){this.scroller.style["user-select"]="none",[...this.scroller.querySelectorAll("a, button")].forEach(r=>{r.setAttribute("draggable",!1),r.style["user-select"]="none"})}removeScrolerStyle(){this.scroller.style["user-select"]="",[...this.scroller.querySelectorAll("a, button")].forEach(r=>{r.removeAttribute("draggable"),r.style["user-select"]=""})}initMotion(){this.motion.setData({val:0}),this.unsubscribeMotion=this.motion.subscribe(({val:t})=>{this.scroller.style.transform=this.direction==h.DIRECTION_VERTICAL?`translate3d(0px, 0px, 0px) translateY(${-t}px)`:`translate3d(0px, 0px, 0px) translateX(${-t}px)`,this.children.forEach(r=>{r.triggerScrollStart()}),c.useNextTick(()=>{this.onTickCallback&&this.onTickCallback({value:-t,percent:this.percent,parentIsMoving:!0}),this.children.forEach(r=>{r.move({value:-t,parentIsMoving:!0})})})}),this.unsubscribeOnComplete=this.motion.onComplete(({val:t})=>{this.scroller.style.transform=this.direction==h.DIRECTION_VERTICAL?`translateY(${-t}px)`:`translateX(${-t}px)`,c.useNextTick(()=>{this.onTickCallback&&this.onTickCallback({value:-t,percent:this.percent,parentIsMoving:!1}),this.children.forEach(r=>{r.triggerScrollEnd(),r.move({value:-t,parentIsMoving:!1})})})})}refreshScroller(){this.screenWidth=this.screen===document.documentElement?window.innerWidth:rt(this.screen),this.screenHeight=this.screen===document.documentElement?window.innerHeight:ve(this.screen),this.maxValue=this.direction===h.DIRECTION_VERTICAL?this.scroller.offsetHeight-this.screenHeight:this.scroller.offsetWidth-this.screenWidth,this.calculateValue()}onScopedTouchMove({client:t}){!this.dragEnable||!this.drag||(this.prevTouchVal=this.touchVal,this.touchVal=this.getMousePos(t),this.endValue+=Number.parseInt(this.prevTouchVal-this.touchVal),this.calculateValue(),this.scrollbarIsRunning=!1)}onScopedWhell({spinY:t}){ee[this.queryType](this.breakpoint)&&(this.dragEnable=!1,this.endValue+=t*this.speed,this.calculateValue(),this.scrollbarIsRunning=!1)}onMouseDown({target:t,client:r}){ee[this.queryType](this.breakpoint)&&(t===this.scroller||eo(this.scroller,t))&&(this.firstTouchValue=this.endValue,this.dragEnable=!0,this.prevTouchVal=this.getMousePos(r),this.touchVal=this.getMousePos(r),this.scrollbarIsRunning=!1)}onMouseUp(){this.dragEnable=!1,this.scrollbarIsRunning=!1}onTouchMove({target:t,client:r,preventDefault:o}){if((t===this.scroller||eo(this.scroller,t))&&this.dragEnable&&this.drag){o(),this.prevTouchVal=this.touchVal,this.touchVal=this.getMousePos(r);let s=Number.parseInt(this.prevTouchVal-this.touchVal);this.endValue+=s,this.calculateValue(),this.scrollbarIsRunning=!1}}onWhell({target:t,spinY:r,preventDefault:o}){let s=document.body.style.overflow==="hidden"&&this.direction===h.DIRECTION_VERTICAL;!ee[this.queryType](this.breakpoint)||s||(t===this.scroller||eo(this.scroller,t))&&(this.dragEnable=!1,o(),this.endValue+=r*this.speed,this.calculateValue(),this.scrollbarIsRunning=!1)}move(t){ee[this.queryType](this.breakpoint)&&(this.scrollbarIsRunning=!0,this.percent=t,this.endValue=this.percent*this.maxValue/100,this.motion.goTo({val:this.endValue}).catch(()=>{}))}set(t){ee[this.queryType](this.breakpoint)&&(this.scrollbarIsRunning=!0,this.percent=t,this.endValue=this.percent*this.maxValue/100,this.motion.set({val:this.endValue}).catch(()=>{}))}calculateValue(){let t=this.endValue*100/this.maxValue;this.percent=Ae(t,0,100),this.endValue=Ae(this.endValue,0,this.maxValue),this.motion.goTo({val:this.endValue}).catch(()=>{}),this.onUpdateCallback&&this.onUpdateCallback({value:-this.endValue,percent:this.percent,parentIsMoving:!0})}preventChecker({target:t,preventDefault:r}){ee[this.queryType](this.breakpoint)&&(t===this.scroller||eo(this.scroller,t))&&Math.abs(this.endValue-this.firstTouchValue)>this.threshold&&r()}getMousePos(t){let{x:r,y:o}=t;return this.direction===h.DIRECTION_VERTICAL?o:r}refresh(){if(!ee[this.queryType](this.breakpoint)){this.removeScrolerStyle(),this.motion?.stop?.(),c.useFrame(()=>{c.useNextTick(()=>{this.scroller.style.transform=""})});return}this.refreshScroller(),this.setScrolerStyle(),c.useFrameIndex(()=>{c.useNextTick(()=>{this.onAfterRefresh&&this.onAfterRefresh(),this.children.forEach(t=>{t?.refresh?.()})})},2)}destroy(){this.removeScrolerStyle(),this.subscribeResize(),this.subscribeScrollStart(),this.subscribeScrollEnd(),this.subscribeTouchStart(),this.subscribeTouchEnd(),this.subscribeMouseDown(),this.subscribeMouseUp(),this.subscribeMouseWheel(),this.subscribeMouseMove(),this.subscribeTouchMove(),this.subscribeMouseClick(),this.unsubscribeMotion(),this.unsubscribeOnComplete(),this.onUpdateScrollBar=()=>{},this.motion?.destroy(),this.motion=null,this.children.forEach(t=>{t?.destroy?.(),t=null}),this.children=[],this.onTickCallback=[],this.onUpdateCallback=[],this.onAfterRefresh=[],this.afterInit=[],this.scopedEvent&&(this.scroller.removeEventListener("wheel",this.scopedWhell),this.scroller.removeEventListener("mousemove",this.scopedTouchMove),this.scroller.removeEventListener("touchmove",this.scopedTouchMove)),c.useFrameIndex(()=>{c.useNextTick(()=>{this.afterDestroy?.(),this.afterDestroy=[],this.scroller=null,this.screen=null})},3)}};var Rt=class{constructor(t){this.ease=Ps(t?.ease),this.duration=si(t?.duration),this.relative=Wt(t?.relative,"tween"),this.stagger=et(t),this.uniqueId=c.getUnivoqueId(),this.isActive=!1,this.currentResolve=void 0,this.currentReject=void 0,this.promise=void 0,this.values=[],this.initialData=[],this.callback=[],this.callbackCache=[],this.callbackOnComplete=[],this.callbackStartInPause=[],this.unsubscribeCache=[],this.pauseStatus=!1,this.comeFromResume=!1,this.startTime=0,this.isRunning=!1,this.timeElapsed=0,this.pauseTime=0,this.firstRun=!0,this.useStagger=!0,this.fpsInLoading=!1,this.defaultProps={duration:this.duration,ease:As(t?.ease),relative:this.relative,reverse:!1,immediate:!1,immediateNoPromise:!1},this.slowlestStagger=xe,this.fastestStagger=xe;let r=t?.data||null;r&&this.setData(r)}draw(t,r=()=>{}){this.isActive=!0,this.pauseStatus&&(this.pauseTime=t-this.startTime-this.timeElapsed),this.timeElapsed=t-this.startTime-this.pauseTime,this.isRunning&&Math.round(this.timeElapsed)>=this.duration&&(this.timeElapsed=this.duration),this.values.forEach(n=>{n.shouldUpdate?(n.currentValue=this.ease(this.timeElapsed,n.fromValue,n.toValProcessed,this.duration),n.currentValue=ue(n.currentValue)):n.currentValue=n.fromValue});let o=Math.round(this.timeElapsed)===this.duration,s=fe(this.values,"currentValue");Wr({stagger:this.stagger,callback:this.callback,callbackCache:this.callbackCache,callBackObject:s,useStagger:this.useStagger}),this.isRunning=!0,o?jr({onComplete:()=>{this.isActive=!1,this.isRunning=!1,this.pauseTime=0,this.values.forEach(i=>{i.shouldUpdate&&(i.toValue=i.currentValue,i.fromValue=i.currentValue)}),this.pauseStatus||(r(),this.promise=void 0,this.currentReject=void 0,this.currentResolve=void 0)},callback:this.callback,callbackCache:this.callbackCache,callbackOnComplete:this.callbackOnComplete,callBackObject:s,stagger:this.stagger,slowlestStagger:this.slowlestStagger,fastestStagger:this.fastestStagger,useStagger:this.useStagger}):c.useFrame(()=>{c.useNextTick(({time:n})=>{this.isActive&&this.draw(n,r)})})}onReuqestAnim(t,r,o){this.startTime=t,this.draw(t,o)}async inzializeStagger(){if(qr(this.stagger.each,this.firstRun,this.callbackCache,this.callback)){let{averageFPS:t}=await c.useFps();zt("tween",t);let r=ft(this.callbackCache,this.callback);if(this.stagger.grid.col>r.length){Ze(r.length),this.firstRun=!1;return}let{staggerArray:o,staggerArrayOnComplete:s,fastestStagger:n,slowlestStagger:i}=tt({arr:r,endArr:this.callbackOnComplete,stagger:this.stagger,slowlestStagger:this.slowlestStagger,fastestStagger:this.fastestStagger});this.callbackCache.length>this.callback.length?this.callbackCache=o:this.callback=o,this.callbackOnComplete=s,this.slowlestStagger=i,this.fastestStagger=n,this.firstRun=!1}return{ready:!0}}async startRaf(t,r){this.fpsInLoading||(this.currentResolve=t,this.currentReject=r,this.firstRun&&(this.fpsInLoading=!0,await this.inzializeStagger(),this.fpsInLoading=!1),Ur(this.callbackStartInPause,this.onReuqestAnim.bind(this),this.pause.bind(this),t))}stop({clearCache:t=!0}={}){this.pauseTime=0,this.pauseStatus=!1,this.comeFromResume=!1,this.values=Or(this.values),this.isActive&&t&&this.callbackCache.forEach(({cb:r})=>c.useCache.clean(r)),this.currentReject&&(this.currentReject(c.ANIMATION_STOP_REJECT),this.promise=void 0,this.currentReject=void 0,this.currentResolve=void 0),this.isActive=!1}pause(){this.pauseStatus||(this.pauseStatus=!0)}resume(){this.pauseStatus&&(this.pauseStatus=!1,this.comeFromResume=!0)}setData(t){this.values=Object.entries(t).map(r=>{let[o,s]=r;return{prop:o,toValue:s,toValueOnPause:s,toValProcessed:s,fromValue:s,currentValue:s,shouldUpdate:!1,fromFn:()=>{},fromIsFn:!1,toFn:()=>{},toIsFn:!1,settled:!1}}),this.initialData=this.values.map(r=>({prop:r.prop,toValue:r.toValue,fromValue:r.fromValue,currentValue:r.currentValue,shouldUpdate:!1,fromFn:()=>{},fromIsFn:!1,toFn:()=>{},toIsFn:!1,settled:!1}))}resetData(){this.values=Ne(this.values,this.initialData)}updateDataWhileRunning(){this.isActive=!1,this.currentReject&&(this.currentReject(c.ANIMATION_STOP_REJECT),this.promise=void 0),this.values.forEach(t=>{t.shouldUpdate&&(t.fromValue=t.currentValue)})}mergeProps(t){let r={...this.defaultProps,...t},{ease:o,duration:s,relative:n}=r;return this.ease=Ps(o),this.relative=Wt(n,"tween"),this.duration=si(s),r}goTo(t,r={}){(this.pauseStatus||this.comeFromResume)&&this.stop(),this.useStagger=!0;let o=Bt(t);return this.doAction(o,r,t)}goFrom(t,r={}){(this.pauseStatus||this.comeFromResume)&&this.stop(),this.useStagger=!0;let o=Br(t);return this.doAction(o,r,t)}goFromTo(t,r,o={}){if((this.pauseStatus||this.comeFromResume)&&this.stop(),this.useStagger=!0,!Vt(t,r))return Dt("tween goFromTo:",t,r),this.promise;let s=zr(t,r);return this.doAction(s,o,t)}set(t,r={}){(this.pauseStatus||this.comeFromResume)&&this.stop(),this.useStagger=!1;let o=Hr(t);return r.duration=1,this.doAction(o,r,t)}doAction(t,r,o){this.values=lp(t,this.values),this.isActive&&this.updateDataWhileRunning();let{reverse:s,immediate:n,immediateNoPromise:i}=this.mergeProps(r);if(Qe(s,"reverse")&&(this.value=Nr(o,this.values)),this.values=gc(this.values,this.relative),Qe(n,"immediate "))return this.isActive=!1,this.values=Ct(this.values),Promise.resolve();if(Qe(i,"immediateNoPromise")){this.isActive=!1,this.values=Ct(this.values);return}if(this.isActive||(this.promise=new Promise((a,l)=>{this.startRaf(a,l)})),this.promise)return this.promise}get(){return fe(this.values,"currentValue")}getInitialData(){return fe(this.initialData,"currentValue")}getFrom(){return fe(this.values,"fromValue")}getTo(){return fe(this.values,"toValue")}getFromNativeType(){return Jr(this.values)}getToNativeType(){return Gr(this.values)}getType(){return"TWEEN"}getId(){return this.uniqueId}updateEase(t){this.ease=Ps(t),this.defaultProps=Ne(this.defaultProps,{ease:t})}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=we(t,this.callback);return this.callback=r,()=>this.callback=o(this.callback)}onStartInPause(t){let{arrayOfCallbackUpdated:r}=we(t,this.callbackStartInPause);return this.callbackStartInPause=r,()=>this.callbackStartInPause=[]}onComplete(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=we(t,this.callbackOnComplete);return this.callbackOnComplete=r,()=>this.callbackOnComplete=o(this.callbackOnComplete)}subscribeCache(t,r){let{arrayOfCallbackUpdated:o,unsubscribeCb:s,unsubscribeCache:n}=gt(t,r,this.callbackCache,this.unsubscribeCache);return this.callbackCache=o,this.unsubscribeCache=n,()=>this.callbackCache=s(this.callbackCache)}destroy(){this.promise&&this.stop(),this.callbackOnComplete=[],this.callbackStartInPause=[],this.callback=[],this.callbackCache=[],this.values=[],this.promise=void 0,this.unsubscribeCache.forEach(t=>t()),this.unsubscribeCache=[]}};var Pt=(()=>{let e="easeOutQuad",t=new Rt({ease:e,data:{val:0}}),r=!1,o=!1,s=e;t.subscribe(({val:a})=>{window.scrollTo({top:a,left:0,behavior:"auto"})});function n(){o&&(document.body.style.overflow=""),s&&t.updateEase(e)}c.useMouseWheel(()=>{r&&(t.stop(),n())}),c.useMouseDown(()=>{r&&(t.stop(),n())}),c.useTouchStart(()=>{r&&(t.stop(),n())});function i(a=null,l={}){if(typeof window<"u"){let p=a?tn(a)||c.checkType(Number,a)?tn(a)?se(a).top:a:(console.warn(`bodyScroll ${a} is not valid target, must be a node or a number`),0):0,u=mt(l?.duration,"bodyScroll: duration",500);o=Q(l?.overflow,"bodyScroll: overflow",!1),s=l?.ease?As(l?.ease):null,o&&(document.body.style.overflow="hidden"),s&&t?.updateEase?.(s);let m=window.pageYOffset;return new Promise((d,f)=>{r=!0,t.goFromTo({val:m},{val:p},{duration:u}).then(()=>{n(),r=!1,d()}).catch(()=>{r=!1,f(c.ANIMATION_STOP_REJECT)})})}}return{to:i}})();var Co=(()=>{let e=[],t=0;function r(l){let p=c.checkType(Element,l);return p||console.warn(`slide utils ${l} is not a valid Dom element`),p}function o(l){let p={};return p.item=l,p.id=t,p.tween=new Rt({ease:"easeOutQuad"}),p.unsubscribe=p.tween.subscribe(({val:u})=>{p.item.style.height=`${u}px`}),p.tween.setData({val:0}),p}function s(l){if(!r(l))return;if(e.find(({item:d})=>d===l)){console.warn(`slide utils ${l} is alredysubscribed`);return}let u=o(l);e.push(u);let m=t;return t++,e.push(u),()=>{u.unsubscribe(),u.tween=null,u.item=null,e=e.filter(({id:d})=>d!==m)}}function n(l){r(l)&&(l.style.height=0,l.style.overflow="hidden")}function i(l){return new Promise((p,u)=>{if(!r(l)){p();return}let m=e.find(({item:b})=>b===l);m||u(new Error("slide element not exist in slide store"));let{item:d,tween:f}=m,x=ve(d);f.goFromTo({val:x},{val:0},{duration:500}).then(()=>{p()})})}function a(l){return new Promise((p,u)=>{if(!r(l)){p();return}let m=e.find(({item:S})=>S===l);m||u(new Error("slide element not exist in slide store"));let{item:d,tween:f}=m,{val:x}=f.get();d.style.height="auto";let b=ve(d);d.style.height=`${x}px`,f.goTo({val:b},{duration:500}).then(()=>{d.style.height="auto",p()})})}return{subscribe:s,reset:n,up:i,down:a}})();function cp({prevValue:e,value:t,maxVal:r,onEnter:o,onEnterBack:s,onLeave:n,onLeaveBack:i}){let a=()=>t>=r&&e<=r&&r>=0||t<=r&&e>=r&&r<=0?h.ON_LEAVE:t>r&&e<=r&&r<=0||t<r&&e>=r&&r>=0?h.ON_ENTER_BACK:t>=0&&e<=0&&r<=0||t<=0&&e>=0&&r>=0?h.ON_LEAVE_BACK:t>0&&t<r&&e<=0&&r>=0||t<0&&e>=0&&r<=0?h.ON_ENTER:h.ON_NOOP;({[h.ON_LEAVE]:()=>{n&&n()},[h.ON_ENTER_BACK]:()=>{s&&s()},[h.ON_LEAVE_BACK]:()=>{i&&i()},[h.ON_ENTER]:()=>{o&&o()},[h.ON_NOOP]:()=>{}})[a()]()}var pf=({startMarker:e,endMarker:t,label:r})=>{if(!e&&!t){let o=r.replaceAll(/^[^a-z]+|[^\w.:-]+/gi,"-"),s=document.createElement("span");s.className+=`p-marker p-marker--start  p-marker-${o}`,s.innerHTML=`start ${o}`;let n=document.createElement("span");n.className+=`p-marker p-marker--end  p-marker-${o}`,n.innerHTML=`end ${o}`,document.body.append(s),document.body.append(n);let i=document.querySelector(`.p-marker--start.p-marker-${o}`),a=document.querySelector(`.p-marker--end.p-marker-${o}`);return{lastStartMarker:i??void 0,lastEndMarkerEl:a??void 0}}return{lastStartMarker:e,lastEndMarkerEl:t}},hf=({screen:e})=>{if(e===window)return{top:0,right:0,bottom:0,left:0};let t=e.getBoundingClientRect();return{top:t.top,right:document.documentElement.clientWidth-(t.left+e.offsetWidth),bottom:window.innerHeight-(t.top+e.offsetHeight),left:t.left}},df=({startPoint:e,direction:t,invertSide:r,top:o,bottom:s,left:n,right:i})=>t===h.DIRECTION_VERTICAL?r?{right:0,width:"100vw",height:"3px",top:`${e+o}px`,padding:"0 30px",pointerEvents:"none"}:{right:0,width:"100vw",height:"3px",bottom:`${e+s}px`,padding:"0 30px",pointerEvents:"none"}:r?{top:0,height:"100vw",width:"3px",left:`${e+n}px`,padding:"30px 0",pointerEvents:"none"}:{top:0,height:"100vw",width:"3px",right:`${e+i}px`,padding:"30px 0",pointerEvents:"none"},mf=({startPoint:e,endPoint:t,direction:r,invertSide:o,top:s,bottom:n,left:i,right:a})=>r===h.DIRECTION_VERTICAL?o?{right:0,width:"100vw",height:"3px",top:`${e+t+s}px`,padding:"0 30px",pointerEvents:"none"}:{right:0,width:"100vw",height:"3px",bottom:`${e+t+n}px`,padding:"0 30px",pointerEvents:"none"}:o?{top:0,height:"100vw",width:"3px",left:`${e+t+i}px`,padding:"30px 0",pointerEvents:"none"}:{top:0,height:"100vw",width:"3px",right:`${e+t+a}px`,padding:"30px 0",pointerEvents:"none"},up=({startMarker:e,endMarker:t,startPoint:r,endPoint:o,screen:s,direction:n,invertSide:i,label:a})=>{let{lastStartMarker:l,lastEndMarkerEl:p}=pf({startMarker:e,endMarker:t,label:a}),{top:u,right:m,bottom:d,left:f}=hf({screen:s}),x=df({startPoint:r,direction:n,invertSide:i,top:u,bottom:d,left:f,right:m}),b=mf({startPoint:r,endPoint:o,direction:n,invertSide:i,top:u,bottom:d,left:f,right:m}),S={position:"fixed",zIndex:"99999",background:Y.get("scrollTrigger")?.markerColor?.startEnd||"#ff0000",fontSize:"14px",whiteSpace:"nowrap",textTransform:"uppercase"};return c.useFrame(()=>{Object.assign(l?.style,{...S,...x}),Object.assign(p?.style,{...S,...b})}),{startMarker:l,endMarker:p}};var Ws=class{constructor(){this.parallaxInstance=void 0,this.trasponderActive=!1,this.scrollerHeight=0,this.start=0,this.startFromTop=0,this.scroller=window,this.invertSide=void 0,this.end=0,this.orientation=h.DIRECTION_VERTICAL,this.compesateValue=0,this.trigger=null,this.item=void 0,this.spring=void 0,this.wrapper=void 0,this.pin=void 0,this.isOver=!1,this.isInner=!1,this.isUnder=!1,this.unsubscribeScroll=()=>{},this.unsubscribeScrollStart=()=>{},this.unsubscribeSpring=()=>{},this.firstTime=!0,this.itemRequireStyleToWrapper=["flex","flex-shrink","flex-basis","float","display","grid-area","grid-column-start","grid-column-end","grid-row-start","grid-row-end","box-sizing","order","place-self","align-self","justify-self"],this.itemRequireStyleWhenTraspond=["font-size","padding","margin","line-height","white-space"],this.parentRequireStyle=["text-align"],this.itemRequireStyleToPin=["z-index","pointer-events"],this.styleToTranspond=["transform","position","translate","rotate","scale"],this.nonRelevantRule=["none","static"],this.isInizialized=!1,this.prevScroll=0,this.prevscrollY=0,this.animatePin=!1,this.anticipateFactor=1.5,this.forceTranspond=!1,this.justPinned=!1,this.afterPinCounter=0,this.lastStep=0,this.afterJustPinned=!1,this.afterJustPinnedCounter=0,this.numeCycleToFreeze=3}init({instance:t}){this.parallaxInstance=t,this.item=t.item,this.marker=t.marker,this.trigger=t.trigger||t.item,this.scroller=t.scroller,this.screen=t.screen,this.animatePin=t.animatePin,this.anticipatePinOnLoad=t.anticipatePinOnLoad,this.forceTranspond=t.forceTranspond,this.invertSide=t.invertSide,this.orientation=t.direction,this.prevscrollY=window.pageYOffset,this.scrollerHeight=t.scrollerHeight,this.refreshCollisionPoint(),this.collisionTranslateProp=this.orientation===h.DIRECTION_VERTICAL?"Y":"X",this.collisionStyleProp=this.orientation===h.DIRECTION_VERTICAL?"top":"left",this.isInizialized=!0,this.firstTime=!0,this.createPin(),this.addStyleFromPinToWrapper(),this.setPinSize(),this.setUpMotion(),this.unsubscribeScrollStart=c.useScrollStart(()=>{if(this.isInizialized&&this.screen!==window&&this.isInner&&this.pin){let r=()=>{this.pin&&(this.pin.style.transition="transform .85s cubic-bezier(0, 0.68, 0.45, 1.1)")};c.useFrame(()=>{r()})}}),this.unsubscribeScroll=c.useScroll(({scrollY:r})=>{if(this.isInizialized&&this.screen!==window){this.orientation===h.DIRECTION_VERTICAL&&this.refreshCollisionPoint();let o=r-this.prevscrollY;if(this.prevscrollY=r,this.isInner&&this.pin){let{verticalGap:s}=this.spring.get(),n=s-o;this.spring.setData({collision:0,verticalGap:n}),c.useFrame(()=>{this.pin&&(this.pin.style.transform=`translate(0px,${n}px)`)})}}})}setUpMotion(){this.spring=new it({data:{collision:0,verticalGap:0},config:"wobbly"}),this.unsubscribeSpring=this.spring.subscribe(({collision:t,verticalGap:r})=>{this.orientation===h.DIRECTION_VERTICAL&&this.pin?this.pin.style.transform=`translate(0px, ${t}px)`:this.pin&&(this.pin.style.transform=`translate(${t}px, ${r}px)`)})}resetSpring(){this.pin&&this.spring.set({collision:0,verticalGap:0}).catch(()=>{})}createPin(){this.item||(this.item=document.createElement("div"));let t=document.createElement("div");t.classList.add("pin-wrapper");let r=document.createElement("div");r.classList.add("pin"),t.append(r);let o=this.item?.parentNode;o&&o.insertBefore(t,this.item),r.append(this.item),this.wrapper=this.item.closest(".pin-wrapper"),this.pin=this.item.closest(".pin");let s=this.addRquiredStyle(),n=this.addPinStyleFromItem(),i=(()=>{if(!this.marker)return{};let p=`3px ${Y.get("scrollTrigger")?.markerColor?.item||"#14df3b"} solid`;return this.orientation===h.DIRECTION_VERTICAL?this.invertSide?{borderBottom:p}:{borderTop:p}:this.invertSide?{borderRight:p}:{borderLeft:p}})(),a={display:"table"};c.useFrame(()=>{!this.pin||!this.wrapper||(Object.assign(this.wrapper.style,{...i}),Object.assign(this.pin.style,{...a,...n,...s}))}),this.checkIfShouldTranspond()}setPinSize(){(()=>{if(!this.pin||!this.wrapper)return;let r=this.wrapper.offsetHeight,o=this.wrapper.offsetWidth;this.wrapper.style.height=`${r}px`,this.wrapper.style.width=`${o}px`,this.pin.style.height=`${r}px`,this.pin.style.width=`${o}px`})()}addStyleFromPinToWrapper(){if(!this.item)return;let t=window.getComputedStyle(this.item),r=this.itemRequireStyleToWrapper.reduce((o,s)=>({...o,[s]:t.getPropertyValue(s)}),{});c.useFrame(()=>{this.wrapper&&Object.assign(this.wrapper.style,r)})}findStyle(t,r){let o=t.parentNode;if(o)for(;o!==null&&o!==document;){let s=getComputedStyle(o);if(s[r]&&!this.nonRelevantRule.includes(s[r]))return{[r]:s[r]};o=o.parentNode}}addRquiredStyle(){return this.pin?this.parentRequireStyle.map(t=>this.findStyle(this.pin,t)).filter(t=>t!==null).reduce((t,r)=>({...t,...r}),{}):{}}checkIfShouldTranspond(){if(this.forceTranspond){this.shoulTranspond=!0;return}this.shoulTranspond=this.styleToTranspond.map(t=>{let r=this.findStyle(this.wrapper,t);if(!r)return!1;let[o]=Object.keys(r),[s]=Object.values(r);return o==="position"?s==="fixed"||s==="absolute":!0}).includes(!0)}refreshCollisionPoint(){this.start=this.parallaxInstance.startPoint,this.screen!==window&&(this.start-=this.parallaxInstance.direction===h.DIRECTION_VERTICAL?Je(this.screen).top:Je(this.screen).left),this.startFromTop=this.invertSide?this.start:this.scrollerHeight-this.start,this.end=this.parallaxInstance.endPoint,this.compesateValue=this.invertSide?-Math.trunc(this.end):Math.trunc(this.end)}destroy(){this.isInizialized&&(this.parallaxInstance=null,this.spring.stop(),this.unsubscribeSpring(),this.unsubscribeScroll(),this.unsubscribeScrollStart(),this.spring.destroy(),this.spring=null,this.afterPinCounter=0,this.justPinned=!1,this.isUnder=!1,this.isInner=!1,this.isOver=!1,this.pin&&this.wrapper&&(this.wrapper.parentNode?.insertBefore(this.item,this.wrapper),this.pin.remove(),this.wrapper.remove(),this.wrapper=void 0,this.pin=void 0,this.isInizialized=!1))}getGap(){return this.wrapper?this.orientation===h.DIRECTION_VERTICAL?Je(this.wrapper).top-this.startFromTop:Je(this.wrapper).left-this.startFromTop:0}animateCollision(){let t=this.getGap();this.tween(t)}animateCollisionBack(){let t=this.invertSide?this.getGap()-this.end:this.getGap()+this.end;this.tween(t)}tween(t){let r=()=>{!this.pin||!this.collisionStyleProp||(this.pin.style[this.collisionStyleProp]=`${this.startFromTop}px`)};c.useFrame(()=>r()),this.animatePin&&!this.firstTime&&this.pin&&this.spring.goFrom({collision:t}).then(()=>{this.resetPinTransform()}).catch(()=>{})}resetPinTransform(){let t=()=>{this.pin&&(this.pin.style.transform="translate(0px, 0px)")};c.useFrame(()=>{t()})}resetStyleWhenUnder(){this.resetSpring();let t=()=>{this.pin&&(this.pin.style.transition="",this.pin.style.position="relative",this.pin.style.top="",this.pin.style.left="")};c.useFrame(()=>{t()})}resetStyleWhenOver(){this.resetSpring();let t=()=>{this.pin&&(this.pin.style.transition="",this.pin.style.position="relative",this.orientation===h.DIRECTION_VERTICAL?(this.pin.style.left="",this.pin.style.top=`${this.compesateValue}px`):(this.pin.style.top="",this.pin.style.left=`${this.compesateValue}px`))};c.useFrame(()=>{t()})}setFixedPosition(){if(!this.pin)return;let t=this.orientation===h.DIRECTION_VERTICAL?Je(this.pin).left:Je(this.pin).top,r=this.orientation===h.DIRECTION_VERTICAL?"left":"top",o=()=>{this.pin&&(this.pin.style.position="fixed",this.pin.style[r]=`${t}px`,this.justPinned=!0,this.afterJustPinned=!0)};c.useFrame(()=>{o()})}addPinStyleFromItem(){if(!this.item)return{};let t=window.getComputedStyle(this.item);return this.itemRequireStyleToPin.reduce((r,o)=>({...r,[o]:t.getPropertyValue(o)}),{})}addStyleToItem(){if(!this.item)return{};let t=window.getComputedStyle(this.item);return this.itemRequireStyleWhenTraspond.reduce((r,o)=>({...r,[o]:t.getPropertyValue(o)}),{})}removeStyleToItem(){return this.itemRequireStyleWhenTraspond.reduce((t,r)=>({...t,[r]:""}),{})}activateTrasponder(){if(this.shoulTranspond){let t=this.addRquiredStyle(),r=this.addPinStyleFromItem(),o=this.addStyleToItem(),s=()=>{this.pin&&(Object.assign(this.pin.style,{...r,...t}),this.item&&Object.assign(this.item.style,o),document.body.append(this.pin))};c.useFrame(()=>{s()}),this.trasponderActive=!0}}deactivateTrasponder(){if(!this.shoulTranspond||!this.item||!this.wrapper)return;let t=()=>{this.pin&&(Object.assign(this.item.style,this.removeStyleToItem()),this.wrapper?.append(this.pin))};c.useFrame(()=>{t()}),this.trasponderActive=!1}getAnticipate(t){let r=this.afterJustPinned&&this.afterJustPinnedCounter<3?this.lastStep:Ae(Math.abs(t-this.prevScroll),0,250);return this.afterJustPinned&&this.afterJustPinnedCounter<this.numeCycleToFreeze?this.afterJustPinnedCounter++:(this.afterJustPinnedCounter=0,this.afterJustPinned=!1),this.lastStep=r,r*this.anticipateFactor}getAnticipateValue(t,r){if(this.animatePin&&!this.firstTime||this.firstTime&&!this.anticipatePinOnLoad)return{anticipateBottom:0,anticipateInnerIn:0,anticipateInnerOut:0};let o=this.getAnticipate(t),s=r===h.SCROLL_UP?0:o,n=r===h.SCROLL_UP?0:o*2,i=r===h.SCROLL_UP?o:0;return{anticipateBottom:s,anticipateInnerIn:n,anticipateInnerOut:i}}getAnticipateValueInverted(t,r){if(this.animatePin&&!this.firstTime||this.firstTime&&!this.anticipatePinOnLoad)return{anticipateBottom:0,anticipateInnerIn:0,anticipateInnerOut:0};let o=this.getAnticipate(t),s=r===h.SCROLL_UP?o:0,n=r===h.SCROLL_UP?o*2:0,i=r===h.SCROLL_UP?0:o;return{anticipateBottom:s,anticipateInnerIn:n,anticipateInnerOut:i}}onScroll(t){if(!this.isInizialized||!this.wrapper)return;if(this.justPinned&&this.afterPinCounter<this.numeCycleToFreeze){this.afterPinCounter++;return}else this.afterPinCounter=0,this.justPinned=!1;let r=this.prevScroll>t?h.SCROLL_UP:h.SCROLL_DOWN,o=this.orientation===h.DIRECTION_VERTICAL?Je(this.wrapper).top:Je(this.wrapper).left,{anticipateBottom:s,anticipateInnerIn:n,anticipateInnerOut:i}=this.invertSide?this.getAnticipateValueInverted(t,r):this.getAnticipateValue(t,r),a=this.invertSide?o<this.start-s:o>this.scrollerHeight-this.start+s,l=this.invertSide?o>=this.start-n&&o<=this.start+i+this.end:o<=this.scrollerHeight-this.start+n&&this.scrollerHeight-o<=this.end+i+this.start;if(a)this.isUnder||(this.resetStyleWhenUnder(),this.deactivateTrasponder(),this.isUnder=!0,this.isInner=!1,this.isOver=!1);else if(l){if(!this.isInner){this.setFixedPosition();let p=r===h.SCROLL_DOWN&&!this.invertSide||r===h.SCROLL_UP&&this.invertSide;this.activateTrasponder(),p?this.animateCollision():this.animateCollisionBack(),this.isUnder=!1,this.isInner=!0,this.isOver=!1}}else this.isOver||(this.resetStyleWhenOver(),this.deactivateTrasponder(),this.isUnder=!1,this.isInner=!1,this.isOver=!0);this.prevScroll=t,this.firstTime=!1}};var pp=()=>{console.warn("parallax prop checker: value in start or end prop with no unit misure is not allowed, failed operation, use vh in vertical mode or vw in horizontal or px")},hp=()=>{console.warn("parallax prop checker: value in start or end in vh is not allowed in horizontal mode, use vw or px")},dp=()=>{console.warn("parallax prop checker: value in start or end in vw is not allowed in vertical mode, use vh or px")};var ci=()=>({numberVal:0,unitMisure:"",additionalVal:"",position:""}),mp=({invert:e,endValInNumber:t,scrollerHeight:r,isNegative:o,startPoint:s,isFromTopLeft:n})=>{let i=t*o-s,a=r-t*o-s;return e?n?i:a:n?a:i},fp=({invert:e,scrollerHeight:t,screenUnit:r,endValInNumber:o,isNegative:s,startPoint:n,isFromTopLeft:i})=>e?i?t-r*(100-o*s)-n:r*(100-o*s)-n:i?t-r*o*s-n:r*o*s-n,gp=({offset:e,height:t,gap:r,wScrollTop:o,wHeight:s})=>e+t>o-r&&e<o+(s+r),bp=(e,t)=>{let r=e.find(l=>[...l].some(p=>!Number.isNaN(Number.parseFloat(p)))),o=_u(r);if(r&&!o)return pp(),ci();if(r&&o===h.VH&&t===h.DIRECTION_HORIZONTAL)return hp(),ci();if(r&&o===h.VW&&t===h.DIRECTION_VERTICAL)return dp(),ci();let s=[h.PLUS_HEIGHT,h.PLUS_HEIGHT_HALF,h.PLUS_WIDTH,h.PLUS_WIDTH_HALF,h.MINUS_HEIGHT,h.MINUS_HEIGHT_HALF,h.MINUS_WIDTH,h.MINUS_WIDTH_HALF],n=e.find(l=>ei(s,l)),i=[h.POSITION_BOTTOM,h.POSITION_TOP,h.POSITION_LEFT,h.POSITION_RIGHT],a=e.find(l=>ei(i,l));return{numberVal:r||0,unitMisure:o,additionalVal:n??"",position:a??h.POSITION_BOTTOM}},yp=(e,t,r)=>{let s=String(t).split(" "),{numberVal:n,unitMisure:i,additionalVal:a,position:l}=bp(s,r),u=String(n).charAt(0)==="-"?-1:1,d=Number.parseFloat(String(n).replaceAll(/^\D+/g,""))??0;return i===h.PX?{value:d*u,additionalVal:a,position:Es(l)}:{value:e*d*u,additionalVal:a,position:Es(l)}},vp=(e,t,r,o,s,n)=>{let a=String(t).split(" "),{numberVal:l,unitMisure:p,additionalVal:u,position:m}=bp(a,n),f=String(l).charAt(0)==="-"?-1:1,b=Number.parseFloat(String(l).replaceAll(/^\D+/g,""))??0,S=Es(m),w=S===h.POSITION_TOP||S===h.POSITION_LEFT;return p===h.PX?{value:mp(s?{invert:!0,endValInNumber:b,scrollerHeight:o,isNegative:f,startPoint:r,isFromTopLeft:w}:{invert:!1,endValInNumber:b,scrollerHeight:o,isNegative:f,startPoint:r,isFromTopLeft:w}),additionalVal:u,position:S}:{value:fp(s?{invert:!0,scrollerHeight:o,screenUnit:e,endValInNumber:b,isNegative:f,startPoint:r,isFromTopLeft:w}:{invert:!1,scrollerHeight:o,screenUnit:e,endValInNumber:b,isNegative:f,startPoint:r,isFromTopLeft:w}),additionalVal:u,position:S}},ui=(e,t,r,o)=>{let s=String(t);return me(s,h.PLUS_HEIGHT_HALF)?e+r/2:me(s,h.PLUS_HEIGHT)?e+r:me(s,h.PLUS_WIDTH_HALF)?e+o/2:me(s,h.PLUS_WIDTH)?e+o:me(s,h.MINUS_HEIGHT_HALF)?e-r/2:me(s,h.MINUS_HEIGHT)?e-r:me(s,h.MINUS_WIDTH_HALF)?e-o/2:me(s,h.MINUS_WIDTH)?e-o:e},Sp=({switchPropierties:e,isReverse:t,value:r})=>{switch(e){case h.IN_STOP:return!t&&r>0||t&&r<0?0:r;case h.IN_BACK:return!t&&r>0||t&&r<0?-r:r;case h.OUT_STOP:return!t&&r<0||t&&r>0?0:r;case h.OUT_BACK:return!t&&r<0||t&&r>0?-r:r;default:return r}},Tp=(e,t)=>{switch(e){case h.PROP_OPACITY:return 1-t;default:return-t}};var Ut=class{constructor(t){this.isInzialized=!1,this.firstScroll=!1,this.willChangeIsActive=!1,this.offset=0,this.screenPosition=0,this.endValue=0,this.height=0,this.width=0,this.scrollerScroll=0,this.scrollerHeight=0,this.windowInnerWidth=window.innerWidth,this.windowInnerHeight=window.innerHeight,this.gap=150,this.numericRange=0,this.unsubscribeResize=()=>{},this.unsubscribeScroll=()=>{},this.unsubscribeScrollStart=()=>{},this.unsubscribeScrollEnd=()=>{},this.unsubscribeMarker=()=>{},this.startMarker=void 0,this.endMarker=void 0,this.lastValue=void 0,this.prevFixedRawValue=0,this.fixedShouldRender=!1,this.prevFixedClamp=void 0,this.firstTime=!0,this.isInViewport=!1,this.iSControlledFromOutside=!1,this.force3D=!1,this.pinInstance=void 0,this.unitMisure="",this.startPoint=0,this.endPoint=0,this.unsubscribeMotion=()=>{},this.unsubscribeOnComplete=()=>{},this.pin=Q(t?.pin,"Scrolltrigger pin propierties error:",!1),this.animatePin=Q(t?.animatePin,"Scrolltrigger animatePin propierties error:",!1),this.forceTranspond=Q(t?.forceTranspond,"Scrolltrigger forceTranspond propierties error:",!1),this.anticipatePinOnLoad=Q(t?.anticipatePinOnLoad,"Scrolltrigger anticipatePinOnLoad propierties error:",!1),this.start=_s(t?.start,"Scrolltrigger start propierties error:","bottom 0px"),this.end=_s(t?.end,"Scrolltrigger end propierties error:","top"),this.fromTo=Q(t?.fromTo,"Scrolltrigger fromTo propierties error:",!1),this.invertSide=Q(t?.invertSide,"Scrolltrigger invertSide propierties error:",!1),this.marker=_s(t?.marker,"Scrolltrigger marker propierties error:",null),this.dynamicStart=t?.dynamicStart?ii(t.dynamicStart,"dynamicStart"):null,this.dynamicEnd=t?.dynamicEnd?ii(t.dynamicEnd,"dynamicEnd"):null,this.dynamicRange=Yu(t?.dynamicRange),this.animateAtStart=Q(t?.animateAtStart,"Scrolltrigger animateAtStart propierties error:",!1),this.onEnter=jt(t?.onEnter,!1,"Scrolltrigger onEnter propierties error"),this.onEnterBack=jt(t?.onEnterBack,!1,"Scrolltrigger onEnterBack propierties error"),this.onLeave=jt(t?.onLeave,!1,"Scrolltrigger onLeave propierties error"),this.onLeaveBack=jt(t?.onLeaveBack,!1,"Scrolltrigger onLeaveBack propierties error"),this.onTickCallback=jt(t?.onTick,!1,"Scrolltrigger onTickCallback propierties error"),this.align=Ku(t?.align),this.onSwitch=Zu(t?.onSwitch),this.reverse=Q(t?.reverse,"Parallax reverse propierties error:",!1),this.opacityStart=ai(t?.opacityStart,"Parallax opacityStart propierties error:",100),this.opacityEnd=ai(t?.opacityEnd,"Parallax opacityEnd propierties error:",0),this.limiterOff=Q(t?.limiterOff,"Parallax|Scrolltrigger limiterOff propierties error:",!1),this.useWillChange=t?.useWillChange,this.tween=Xu(t?.tween);let r=this.tween?.getType&&this.tween.getType()===h.TWEEN_TIMELINE,o=this.tween?.getType&&this.tween.getType()===h.TWEEN_TWEEN;this.item=$r(t?.item,!1),this.scroller=$r(t?.scroller,!0),this.screen=$r(t?.screen,!0),this.trigger=ni(t?.trigger),this.applyTo=ni(t?.applyTo),this.direction=To(t?.direction,"Parallax/Scrolltrigger"),this.disableForce3D=Q(t?.disableForce3D,"Parallax|Scrolltrigger disableForce3D propierties error:",!1),this.useThrottle=Q(t?.useThrottle,"Parallax|Scrolltrigger useThrottle propierties error:",!1),this.type=Qu(t?.type),this.range=ep(t?.range,this.type),this.perspective=mt(t?.perspective,"Parallax|Scrolltrigger perspective propierties error:",0),this.breakpoint=ir(t?.breakpoint,"breakpoint","parallax/scrolltrigger"),this.queryType=ar(t?.queryType,"queryType","parallax/scrolltrigger"),this.propierties=tp(t?.propierties,this.type,o,r),this.ease=Q(t?.ease,"Parallax|Scrolltrigger ease propierties error:",!1),this.easeType=rp(t?.easeType,r,this.type===h.TYPE_SCROLLTRIGGER),this.springConfig=op(t?.springConfig,this.type),this.lerpConfig=sp(t?.lerpConfig,this.type),this.motionParameters=this.easeType===h.EASE_SPRING?{configProp:{precision:h.EASE_PRECISION}}:{precision:h.EASE_PRECISION},this.motion=(r&&(this.easeType=h.EASE_LERP,this.motionParameters={precision:h.EASE_PRECISION}),this.easeType===h.EASE_SPRING?new it:new kt)}init(){if(this.isInzialized){console.warn("Parallax/scrollTrigger: The init() method cannot be launched more than once. If you are passing the instance to components like horizontalScroller or smoothScroller via the children property, they will initialize the instance.");return}this.isInzialized=!0,this.setMotion(),this.calcScreenPosition(),this.calcOffset(),this.calcHeight(),this.calcWidth(),this.getScreenHeight(),this.setPerspective(),this.propierties===h.PROP_TWEEN&&(this.range=this?.tween?.getDuration?this.tween.getDuration():0,this.dynamicRange=()=>this.range,this.tween?.inzializeStagger?.()),this.type==h.TYPE_SCROLLTRIGGER&&(this.limiterOff=!0,this.calcRangeAndUnitMiusure(),this.calcFixedLimit());let t=r=>{if(this.pin)return this.unsubscribeScroll=c.useScrollImmediate(r),c.useScrollImmediate;this.ease&&this.useThrottle?(this.unsubscribeScroll=c.useScrollThrottle(r),c.useScrollThrottle):(this.unsubscribeScroll=c.useScroll(r),c.useScroll)};this.ease?(this.unsubscribeScrollStart=c.useScrollStart(()=>{this.firstScroll=!0,this.disableForce3D||(this.force3D=!0)}),this.unsubscribeScrollEnd=c.useScrollEnd(()=>{c.useFrame(()=>{c.useNextTick(()=>{this.smoothParallaxJs()})})}),this.scroller===window&&t(()=>{!c.getShouldRender()&&!this.firstScroll||(this.firstScroll=!1,this.smoothParallaxJs())}),this.smoothParallaxJs()):(this.scroller===window&&t(()=>{this.computeValue(),this.noEasingRender()}),this.computeValue(),this.noEasingRender(),this.unsubscribeScrollEnd=c.useScrollEnd(()=>{this.noEasingRender({forceRender:!0})})),this.scroller!==window&&this.marker&&(this.unsubscribeMarker=c.useScroll(()=>{this.calcFixedLimit()})),this.unsubscribeResize=c.useResize(({horizontalResize:r})=>{r&&this.refresh()}),this.pin&&(this.pinInstance=new Ws,ee[this.queryType](this.breakpoint)&&c.useNextTick(()=>{this.getScrollerOffset(),this.pinInstance?.init({instance:this}),this.pinInstance?.onScroll(this.scrollerScroll)}))}setScroller(t){this.scroller=$r(t,!0)}setScreen(t){this.screen=$r(t,!0)}setDirection(t){this.direction=To(t,"Parallax/Scrolltrigger")}setBreakPoint(t){this.breakpoint=ir(t,"breakpoint","Parallax/Scrolltrigger")}setQueryType(t){this.queryType=ar(t,"queryType","Parallax/Scrolltrigger")}setPerspective(){if(this.perspective&&this.item&&this.item.parentNode){let t={perspective:`${this.perspective}px`,"transform-style":"preserve-3d"},r=this.item.parentNode;Object.assign(r.style,t)}}setMotion(){let t=h.PROP_SCALE||h.PROP_SCALE_X||h.PROP_SCALE_Y||h.PROP_OPACITY?1:0;switch(this.motion.setData({val:t}),this.unsubscribeMotion=this.motion.subscribe(({val:r})=>{r!==this.lastValue&&(this.propierties===h.PROP_TWEEN&&this.tween?.draw?(this.tween.draw({partial:r,isLastDraw:!1,useFrame:!1}),this.lastValue=r,this.firstTime=!1):this.updateStyle(r),c.useNextTick(()=>{this.onTickCallback&&this.onTickCallback({value:r,parentIsMoving:!0})}))}),this.unsubscribeOnComplete=this.motion.onComplete(({val:r})=>{this.force3D=!1,this.propierties===h.PROP_TWEEN&&this.tween?.draw?this.tween.draw({partial:r,isLastDraw:!0,useFrame:!1}):this.updateStyle(r),c.useNextTick(()=>{this.onTickCallback&&this.onTickCallback({value:r,parentIsMoving:!1})})}),this.easeType){case h.EASE_LERP:{this.lerpConfig&&this.motion.updateVelocity(this.lerpConfig);break}case h.EASE_SPRING:{this.springConfig&&this.motion.updateConfig(this.springConfig);break}}}calcRangeAndUnitMiusure(){if(this.dynamicRange){let t=this.dynamicRange();this.numericRange=Number.isNaN(t)?0:Number.parseFloat(t),this.unitMisure=h.PX}else{let t=String(this.range),o=t.charAt(0)==="-"?-1:1,s=np(t,this.propierties);this.numericRange=Number.parseFloat(s.replaceAll(/^\D+/g,""))*o,this.unitMisure=Ou(s)}}calcFixedLimit(){let t=this.scrollerHeight/100;if(this.dynamicStart&&this.dynamicStart?.position&&this.dynamicStart?.value?.()){let{position:p,value:u}=this.dynamicStart,m=u();Number.isNaN(m)||(this.start=`${p} ${m}px`)}let{value:r,additionalVal:o,position:s}=yp(t,this.start,this.direction);if(this.invertSide=s===h.POSITION_TOP||s===h.POSITION_LEFT,this.startPoint=ui(r,o,this.direction===h.DIRECTION_VERTICAL?this.height:this.width,this.direction===h.DIRECTION_VERTICAL?this.width:this.height),this.dynamicEnd&&this.dynamicEnd?.position&&this.dynamicEnd?.value?.()){let{position:p,value:u}=this.dynamicEnd,m=u();Number.isNaN(m)||(this.end=`${p} ${m}px`)}let{value:n,additionalVal:i,position:a}=vp(t,this.end,this.startPoint,this.scrollerHeight,this.invertSide,this.direction),l=this.invertSide?a===h.POSITION_BOTTOM||a===h.POSITION_RIGHT?-1:1:a===h.POSITION_BOTTOM||a===h.POSITION_RIGHT?1:-1;this.endPoint=ui(n,i,this.direction===h.DIRECTION_VERTICAL?this.height*l:this.width*l,this.direction===h.DIRECTION_VERTICAL?this.width*l:this.height*l),this.setMarker(),this.invertSide&&(this.startPoint-=this.height)}setMarker(){if(this.marker){let{startMarker:t,endMarker:r}=up({startMarker:this.startMarker,endMarker:this.endMarker,startPoint:this.startPoint,endPoint:this.endPoint,screen:this.screen,direction:this.direction,invertSide:this.invertSide,label:this.marker});this.startMarker=t,this.endMarker=r}}calcOffset(){let t=this.trigger===null?this.item:this.trigger;if(!t)return;let r=0,o=0,s=0;this.trigger&&(r=hr(this.trigger).x,o=hr(this.trigger).y,s=hr(this.trigger).z),t.style.transform="",this.direction===h.DIRECTION_VERTICAL?this.offset=this.scroller===window?Math.trunc(se(t).top):Math.trunc(se(t).top)-se(this.scroller).top:this.offset=this.scroller===window?Math.trunc(se(t).left):Math.trunc(se(t).left)-se(this.scroller).left,this.screen!==window&&(this.direction===h.DIRECTION_VERTICAL?this.offset-=Math.trunc(se(this.screen).top):this.offset-=Math.trunc(Je(this.screen).left)),this.trigger&&(r!==0||o!==0||s!==0)&&(this.trigger.style.transform=`translate3D(${r}px, ${o}px, ${s}px)`)}calcScreenPosition(){this.screen!==window&&(this.screenPosition=this.direction===h.DIRECTION_VERTICAL?Number.parseInt(se(this.screen).top):Number.parseInt(Je(this.screen).left))}calcHeight(){let t=this.trigger===null?this.item:this.trigger;t&&(this.height=this.direction===h.DIRECTION_VERTICAL?Math.trunc(t.offsetHeight):Math.trunc(t.offsetWidth))}calcWidth(){let t=this.trigger===null?this.item:this.trigger;t&&(this.width=this.direction===h.DIRECTION_VERTICAL?Math.trunc(t.offsetWidth):Math.trunc(t.offsetHeight))}getScrollerOffset(){this.scroller===window?this.scrollerScroll=this.direction===h.DIRECTION_VERTICAL?this.scroller.scrollY:this.scroller.scrollX:this.scrollerScroll=this.direction===h.DIRECTION_VERTICAL?-se(this.scroller).top:-se(this.scroller).left}getScreenHeight(){this.windowInnerWidth=window.innerWidth,this.windowInnerHeight=window.innerHeight,this.screen===window?this.scrollerHeight=this.direction===h.DIRECTION_VERTICAL?window.innerHeight:window.innerWidth:this.scrollerHeight=this.direction===h.DIRECTION_VERTICAL?Math.trunc(this.screen.offsetHeight):Math.trunc(this.screen.offsetWidth)}refresh(){this.pin&&this.pinInstance&&this.pinInstance.destroy(),this.calcScreenPosition(),this.calcOffset(),this.calcHeight(),this.calcWidth(),this.getScreenHeight(),this.type==h.TYPE_SCROLLTRIGGER&&(this.calcFixedLimit(),this.dynamicRange&&this.calcRangeAndUnitMiusure(),this.pin&&this.pinInstance&&ee[this.queryType](this.breakpoint)&&this.pinInstance.init({instance:this})),this.lastValue=void 0,this.firstTime=!0,this.firstScroll=!1,ee[this.queryType](this.breakpoint)?this.ease?this.smoothParallaxJs():(this.computeValue(),this.noEasingRender({forceRender:!0})):(this.ease&&this.motion?.stop?.(),c.useFrameIndex(()=>{this.applyTo?(this.resetTweenStyle(this.applyTo),Object.assign(this.applyTo.style,this.getResetStyle())):(this.resetTweenStyle(this.item),this.item&&Object.assign(this.item.style,this.getResetStyle()))},3))}move({value:t,parentIsMoving:r=!1}){if(!ee[this.queryType](this.breakpoint)||!t)return;this.iSControlledFromOutside=!0;let o=this.getScrollValueOnMove(t);if(this.ease)this.smoothParallaxJs(o);else{this.computeValue(o);let s=this.isInViewport||this.firstTime||void 0;this.noEasingRender({forceRender:s,parentIsMoving:r})}}triggerScrollStart(){this.ease&&(this.firstScroll=!0,this.disableForce3D||(this.force3D=!0))}triggerScrollEnd(){this.ease||this.noEasingRender({forceRender:!0})}getScrollValueOnMove(t){if(t!==void 0)return this.screen!==window?t+this.screenPosition:t}stopMotion(){this.motion?.stop?.()}smoothParallaxJs(t){if(!ee[this.queryType](this.breakpoint)||(this.computeValue(t),!this.fixedShouldRender&&!this.firstTime&&this.type===h.TYPE_SCROLLTRIGGER)||!this.isInViewport&&!this.firstTime&&this.type===h.TYPE_PARALLAX)return;let r=this.firstTime&&!this.animateAtStart?"set":"goTo";this.motion&&this.motion[r]({val:this.endValue},this.motionParameters).catch(()=>{})}computeValue(t){if(!ee[this.queryType](this.breakpoint)||(t?this.scrollerScroll=-t:this.getScrollerOffset(),this.isInViewport=gp({offset:this.offset,height:this.height,gap:this.gap,wScrollTop:this.scrollerScroll,wHeight:this.scrollerHeight}),!this.isInViewport&&!this.limiterOff&&this.type===h.TYPE_PARALLAX))return;switch(this.pin&&this.pinInstance&&this.pinInstance.onScroll(this.scrollerScroll),this.type){case h.TYPE_SCROLLTRIGGER:{this.endValue=ue(this.getFixedValue());break}default:switch(this.propierties){case h.PROP_OPACITY:{this.endValue=ue(this.getOpacityValue());break}default:{this.endValue=Number.isNaN(Number.parseInt(this.align))?ue(this.getIsNaNValue()/2):ue(this.getIsANumberValue()/2);break}}}let r=this.reverse&&this.type!==h.TYPE_SCROLLTRIGGER?Tp(this.propierties,this.endValue):this.endValue;this.endValue=this.type===h.TYPE_SCROLLTRIGGER?r:this.getSwitchAfterZeroValue(r)}noEasingRender({forceRender:t=!1,parentIsMoving:r=!1}={}){ee[this.queryType](this.breakpoint)&&c.useFrame(()=>{this.cleanRender({forceRender:t,parentIsMoving:r})})}cleanRender({forceRender:t=!1,parentIsMoving:r=!1}={}){this.endValue===this.lastValue&&!t||!this.isInViewport&&!t||(!this.disableForce3D&&!this.iSControlledFromOutside&&(this.force3D=!t),!this.disableForce3D&&this.iSControlledFromOutside&&(this.force3D=r&&this.isInViewport),this.propierties===h.PROP_TWEEN?(this.tween.draw({partial:this.endValue,isLastDraw:!this.force3D,useFrame:!1}),this.lastValue=this.endValue,this.firstTime=!1):this.updateStyle(this.endValue),c.useNextTick(()=>{this.onTickCallback&&this.onTickCallback({value:this.endValue,parentIsMoving:this.force3D})}))}updateStyle(t){this.applyTo?Object.assign(this.applyTo.style,this.getStyle(t)):this.item&&Object.assign(this.item.style,this.getStyle(t)),this.lastValue=t,this.firstTime=!1}getFixedValue(){let t=this.invertSide?-(this.scrollerScroll+this.startPoint+this.endPoint-(this.offset+this.endPoint)):-(this.scrollerScroll+this.scrollerHeight-this.startPoint-(this.offset+this.endPoint)),r=this.endPoint/100*this.numericRange,o=t/100*this.numericRange,s=this.fromTo?this.invertSide?r-o:o:this.invertSide?o:r-o,n=r>0?-Ae(s,0,r):-Ae(s,r,0);if(this.fixedShouldRender=this.prevFixedClamp!==n,this.prevFixedClamp=n,!this.fixedShouldRender&&!this.firstTime)return this.endValue;let i=n*100/this.endPoint;switch((this.onEnter||this.onEnterBack||this.onLeave||this.onLeaveBack)&&cp({prevValue:this.prevFixedRawValue,value:s,maxVal:r,onEnter:this.onEnter,onEnterBack:this.onEnterBack,onLeave:this.onLeave,onLeaveBack:this.onLeaveBack}),this.prevFixedRawValue=s,this.propierties){case h.PROP_HORIZONTAL:case h.PROP_VERTICAL:return this.getHVval(i);case h.PROP_SCALE:case h.PROP_SCALE_X:case h.PROP_SCALE_Y:case h.PROP_OPACITY:return 1-i;default:return-i}}getHVval(t){switch(this.unitMisure){case h.VW:return this.windowInnerWidth/100*-t;case h.VH:return this.windowInnerHeight/100*-t;case h.WPERCENT:return this.direction===h.DIRECTION_VERTICAL?this.width/100*-t:this.height/100*-t;case h.HPERCENT:return this.direction===h.DIRECTION_VERTICAL?this.height/100*-t:this.width/100*-t;default:return-t}}getOpacityValue(){let t=this.scrollerHeight/100*this.opacityEnd,r=this.scrollerHeight-this.scrollerHeight/100*this.opacityStart,o=this.align==h.ALIGN_START?-this.scrollerScroll*-1:(this.scrollerScroll+t-this.offset)*-1,s=this.align==h.ALIGN_START?1-o/this.offset:1-o/(this.scrollerHeight-r-t);return Ae(s,0,1)}getIsNaNValue(){let t=Number(this.range)??0,r=this.direction===h.DIRECTION_VERTICAL?document.documentElement.scrollHeight:document.documentElement.scrollWidth;switch(this.align){case h.ALIGN_START:return this.scrollerScroll/t;case h.ALIGN_TOP:case h.ALIGN_LEFT:return(this.scrollerScroll-this.offset)/t;case h.ALIGN_CENTER:return(this.scrollerScroll+(this.scrollerHeight/2-this.height/2)-this.offset)/t;case h.ALIGN_BOTTOM:case h.ALIGN_RIGHT:return(this.scrollerScroll+(this.scrollerHeight-this.height)-this.offset)/t;case h.ALIGN_END:return-(r-(this.scrollerScroll+this.scrollerHeight))/t;default:return 0}}getIsANumberValue(){let t=Number(this.align),r=Number(this.range);return(this.scrollerScroll+this.scrollerHeight/100*t-this.offset)/r}getSwitchAfterZeroValue(t){return Sp({switchPropierties:this.onSwitch,isReverse:this.reverse,value:t})}getStyle(t){let r=this.force3D?"translate3D(0px, 0px, 0px)":"";this.willChangeIsActive=this.useWillChange?c.mustMakeSomething():!1;let o=this.willChangeIsActive&&this.force3D?"transform":"",s=c.shouldMakeSomething()?Math.round(t):t;switch(this.propierties){case h.PROP_VERTICAL:return{transform:`${r} translateY(${s}px)`,willChange:o};case h.PROP_HORIZONTAL:return{transform:`${r} translateX(${s}px)`,willChange:o};case h.PROP_ROTATE:return{transform:`${r} rotate(${s}deg)`,willChange:o};case h.PROP_ROTATEY:return{transform:`${r} rotateY(${s}deg)`,willChange:o};case h.PROP_ROTATEX:return{transform:`${r} rotateX(${s}deg)`,willChange:o};case h.PROP_ROTATEZ:return{transform:`${r} rotateZ(${s}deg)`,willChange:o};case h.PROP_OPACITY:return{opacity:`${t}`};case h.PROP_SCALE:{let n=this.type===h.TYPE_SCROLLTRIGGER?t:1+t/1e3;return{transform:`${r} scale(${n})`,willChange:o}}case h.PROP_SCALE_X:{let n=this.type===h.TYPE_SCROLLTRIGGER?t:1+t/1e3;return{transform:`${r} scaleX(${n})`,willChange:o}}case h.PROP_SCALE_Y:{let n=this.type===h.TYPE_SCROLLTRIGGER?t:1+t/1e3;return{transform:`${r} scaleY(${n})`,willChange:o}}default:return{[this.propierties.toLowerCase()]:`${t}px`}}}resetTweenStyle(t){this.tween&&(t.style="")}getResetStyle(){switch(this.propierties){case h.PROP_VERTICAL:case h.PROP_HORIZONTAL:case h.PROP_ROTATE:case h.PROP_ROTATEY:case h.PROP_ROTATEX:case h.PROP_ROTATEZ:case h.PROP_SCALE:return{transform:""};case h.PROP_OPACITY:return{opacity:""};default:return{[this.propierties.toLowerCase()]:""}}}destroy(){this.motion?.stop?.(),this.unsubscribeScroll(),this.unsubscribeScrollStart(),this.unsubscribeScrollEnd(),this.unsubscribeResize(),this.unsubscribeMotion(),this.unsubscribeOnComplete(),this.unsubscribeMarker(),this.motion?.destroy?.(),this.dynamicRange=()=>{},this.onEnter=()=>{},this.onEnterBack=()=>{},this.onLeave=()=>{},this.onLeaveBack=()=>{},this.onTickCallback=()=>{},this.pin&&this.pinInstance&&this.pinInstance?.destroy?.(),this.startMarker&&this.startMarker?.remove?.(),this.endMarker&&this.endMarker?.remove?.(),this.motion=null,this.startMarker=void 0,this.endMarker=void 0,this.pinInstance=null,this.endValue=0;let t=this.applyTo??this.item;t&&"style"in t&&(t.style=""),this.item=null,this.scroller=null,this.screen=null,this.trigger=null,this.applyTo=null}};var Io={END:"END",START:"START",CENTER:"CENTER"};var ff=e=>{switch(e){case Io.END:return"align-items:flex-end;";case Io.CENTER:return"align-items:center;";default:return"align-items:flex-start;"}},xp=({mainContainer:e,queryType:t,breakpoint:r,container:o,trigger:s,row:n,column:i,shadow:a,useSticky:l,columnHeight:p,columnWidth:u,columnAlign:m})=>{let d=ee.getBreackpoint(r),f="user-select:none",x=l?"relative":"absolute",b=l?"position:sticky;top:0;":"",S=ff(m),w=u?`width:${u}vw;`:"",C=`
      @media (${t}-width:${d}px){${o}{position:relative;${f}}}@media (${t}-width:${d}px){${s}{z-index:10;position:${x};pointer-events:none;overflow:hidden;top:0;left:0;right:0}}@media (${t}-width:${d}px){${n}{--sectionheight:${p}vh}}@media (${t}-width:${d}px){${n}{display:flex;height:100vh;${b}${S}}}@media (${t}-width:${d}px){${i}{height:var(--sectionheight);flex:0 0 auto;${w}}}.${a}{display:none}@media (${t}-width:${d}px){.${a}{width:100%;display:block;pointer-events:none}}.${a}{display:none}@media (${t}-width:${d}px){.${a}{pointer-events:none;display:block;position:absolute;left:0;right:0}.${a}--end,.${a}--in-center,.${a}--left,.${a}--out-center{opacity:0;border:1px red dashed;width:25%}.${a}--end.debug,.${a}--in-center.debug,.${a}--left.debug,.${a}--out-center.debug{opacity:1}.${a}--in-center{position:absolute;top:0;right:0;padding:0 40px;text-align:center}.${a}--out-center{position:absolute;top:0;right:0;padding:0 40px;text-align:center}.${a}--left{position:absolute;top:0;left:50%;transform:translateX(-50%);padding:0 40px;text-align:center}.${a}--end{position:absolute;top:0;left:0;padding-left:40px}}`,P=document.createElement("div");P.classList.add("scroller-style");let $=document.createElement("style");$.append(document.createTextNode(C)),P.append($),e.prepend(P)};var Eo=class{constructor(t={}){if(this.propsisValid=!0,this.triggerTopPosition=0,this.touchActive=!1,this.lastTouchValueX=0,this.dragSecureAreaBottom=100,this.dragSecureAreaTop=100,this.shouldDragValue=!1,this.button=[],this.scrollValue=0,this.unsubscribeScroll=()=>{},this.useDrag=Q(t?.useDrag,"HorizontalScroller: useDrag",!1),this.threshold=mt(t?.threshold,"HorizontalScroller: threshold",30),this.useWillChange=Q(t?.useWillChange,"HorizontalScroller: useWillChange",!1),this.breakpoint=ir(t?.breakpoint,"breakpoint","horizontalScroller"),this.queryType=ar(t?.queryType,"queryType","horizontalScroller"),this.forceTranspond=Q(t?.forceTranspond,"HorizontalScroller: forceTranspond",!1),this.addCss=Q(t?.addCss,"HorizontalScroller: addCss",!0),this.animateAtStart=Q(t?.animateAtStart,"HorizontalScroller: animateAtStart",!1),this.ease=Q(t?.ease,"HorizontalScroller: ease",!1),this.easeType=Ms(t?.easeType,"HorizontalScroller"),this.useSticky=Q(t?.useSticky,"HorizontalScroller: useSticky",!1),this.animatePin=Q(t?.animatePin,"HorizontalScroller: animatePin",!1),this.reverse=Q(t?.reverse,"HorizontalScroller: reverse",!1),this.useThrottle=Q(t?.useThrottle,"HorizontalScroller: useThrottle",!1),this.columnHeight=mt(t?.columnHeight,"HorizontalScroller: columnHeight",100),this.columnWidth=mt(t?.columnWidth,"HorizontalScroller: columnWidth",null),this.columnAlign=t?.columnAlign?t.columnAlign.toUpperCase():Io.START,this.onEnter=De(t?.onEnter,"HorizontalScroller: onEnter",pe),this.onEnterBack=De(t?.onEnterBack,"HorizontalScroller: onEnterBack",pe),this.onLeave=De(t?.onLeave,"HorizontalScroller: onLeave",pe),this.onLeaveBack=De(t?.onLeaveBack,"HorizontalScroller: onLeaveBack",pe),this.afterInit=De(t?.afterInit,"HorizontalScroller: afterInit",pe),this.afterRefresh=De(t?.afterRefresh,"HorizontalScroller: afterRefresh",pe),this.afterDestroy=De(t?.afterDestroy,"HorizontalScroller: afterDestroy",pe),this.onTick=De(t?.onTick,"HorizontalScroller: onTick",null),this.mainContainer=document.querySelector(t.root),!this.mainContainer){this.propsisValid=!1,console.warn("horizontal custom: root node not found");return}if(this.container=t?.container,!this.mainContainer.querySelector(this.container)){this.propsisValid=!1,console.warn("horizontal custom: container node not found");return}if(this.trigger=this.mainContainer.querySelector(t.trigger),!this.trigger){this.propsisValid=!1,console.warn("horizontal custom: trigger node not found");return}if(this.row=this.mainContainer.querySelector(t.row),!this.row){this.propsisValid=!1,console.warn("horizontal custom: row node not found");return}if(this.column=this.mainContainer.querySelectorAll(t.column),this.column.length===0){this.propsisValid=!1,console.warn("horizontal custom: column nodeList not found");return}this.shadow=this.mainContainer.querySelectorAll("[data-shadow]");let o=t?.shadowClass||"shadow";this.shadowMainClassTransition=o.replace(".",""),this.button=this.row.querySelectorAll("a, button"),this.moduleisActive=!1,this.horizontalWidth=0,this.scrollTriggerInstance={},this.percentRange=0,this.children=t?.children||[],this.children.forEach(s=>{s.setScroller(this.row),s.setDirection("horizontal"),s.setBreakPoint(this.breakpoint),s.setQueryType(this.queryType),s.init()}),this.addCss&&xp({mainContainer:this.mainContainer,queryType:this.queryType,breakpoint:this.breakpoint,container:this.container,trigger:t?.trigger??"trigger",row:t.row,column:t.column,shadow:this.shadowMainClassTransition,useSticky:this.useSticky,columnHeight:this.columnHeight,columnWidth:this.columnWidth,columnAlign:this.columnAlign}),this.onMouseMove=s=>{if(!this.touchActive)return;let{movementX:n}=s,i=this.reverse?n:-n;this.onDrag(i),this.touchStart=!1},this.onMouseDown=()=>{ee[this.queryType](this.breakpoint)&&(this.shouldDragValue&&(this.row.style.cursor="move"),this.touchActive=!0,this.firstTouchValue=this.scrollValue)},this.onMouseUp=()=>{this.touchActive=!1,c.useFrame(()=>this.row.style.cursor="")},this.onMouseLeave=()=>{this.touchActive=!1,c.useFrame(()=>this.row.style.cursor="")},this.onTouchStart=s=>{ee[this.queryType](this.breakpoint)&&(this.lastTouchValueX=-s.touches[0].clientX,this.touchActive=!0,this.firstTouchValue=this.scrollValue)},this.onTouchEnd=()=>{this.touchActive=!1},this.onTouchMove=s=>{let n=-s.touches[0].clientX,i=this.reverse?-n+this.lastTouchValueX:n-this.lastTouchValueX;this.onDrag(i),this.lastTouchValueX=n,this.shouldDragValue&&s.cancelable&&s.preventDefault()},this.preventFireClick=s=>{Math.abs(this.scrollValue-this.firstTouchValue)>this.threshold&&s.preventDefault()}}init(){this.propsisValid&&$s(this.getWidth.bind(this),this.setDimension.bind(this),this.createShadow.bind(this),this.updateShadow.bind(this))().then(()=>{this.initScroller(),this.useDrag&&this.addDragListener(),c.useResize(({horizontalResize:t})=>this.onResize(t)),c.useFrameIndex(()=>{c.useNextTick(()=>{this.afterInit?.(),this.children.forEach(t=>{t.refresh()})})},3)})}setLinkAttribute(){[...this.button].forEach(t=>t.setAttribute("draggable",!1))}removeLinkAttribute(){[...this.button].forEach(t=>t.removeAttribute("draggable"))}onDrag(t){this.shouldDragValue&&c.useFrame(()=>window.scrollBy({top:t,left:0,behavior:"instant"}))}shouldDrag(){let t=window.scrollY;this.shouldDragValue=this.triggerTopPosition-this.dragSecureAreaTop<t&&this.triggerTopPosition+this.dragSecureAreaBottom+this.horizontalWidth>t+window.innerHeight}addDragListener(){this.unsubscribeScroll=c.useScroll(()=>this.shouldDrag()),this.shouldDrag(),this.row.addEventListener("click",this.preventFireClick,{passive:!1}),this.row.addEventListener("mousedown",this.onMouseDown,{passive:!0}),this.row.addEventListener("mouseup",this.onMouseUp,{passive:!0}),this.row.addEventListener("mouseleave",this.onMouseLeave,{passive:!0}),this.row.addEventListener("touchstart",this.onTouchStart,{passive:!0}),this.row.addEventListener("touchend",this.onTouchEnd,{passive:!0}),this.row.addEventListener("mousemove",this.onMouseMove,{passive:!0}),this.row.addEventListener("touchmove",this.onTouchMove,{passive:!0})}removeDragListener(){this.unsubscribeScroll(),this.row.removeEventListener("click",this.preventFireClick),this.row.removeEventListener("mousedown",this.onMouseDown),this.row.removeEventListener("mouseup",this.onMouseUp),this.row.removeEventListener("mouseleave",this.onMouseLeave),this.row.removeEventListener("touchstart",this.onTouchStart),this.row.removeEventListener("touchend",this.onTouchEnd),this.row.removeEventListener("mousemove",this.onMouseMove),this.row.removeEventListener("touchmove",this.onTouchMove)}setDimension(){return!this.trigger||!this.mainContainer||!this.row?new Promise(t=>{t()}):new Promise(t=>{c.useFrame(()=>{let r=this.horizontalWidth;this.percentRange=100*(r-window.innerWidth)/r,r>0&&(this.trigger.style.height=`${r}px`,this.mainContainer.style.height=`${r}px`,this.row.style.width=`${r}px`),t()})})}getWidth(){return new Promise(t=>{c.useFrame(()=>{if(!ee[this.queryType](this.breakpoint)){t();return}this.horizontalWidth=[...this.column].map(r=>rt(r)).reduce((r,o)=>r+o,0),t()})})}createShadow(){return this.trigger?new Promise(t=>{c.useFrame(()=>{if(!ee[this.queryType](this.breakpoint)){t();return}let r=[...this.shadow].map(o=>{let s=o.dataset.shadow,n=o.dataset.debug?"debug":"",i=o.dataset.debug?`left left : ${s}`:"",a=o.dataset.debug?`in center : ${s}`:"",l=o.dataset.debug?`center out : ${s}`:"",p=o.dataset.debug?`in out : ${s}`:"";return`
                            <div class='${this.shadowMainClassTransition} ${this.shadowMainClassTransition}--${s}' data-shadow='${s}'>
                                <span class="${this.shadowMainClassTransition}--in-center ${n}">
                                    ${a}
                                </span>
                                <span class="${this.shadowMainClassTransition}--out-center ${n}">
                                    ${l}
                                </span>
                                <span class="${this.shadowMainClassTransition}--left ${n}">
                                    ${i}
                                </span>
                                <span class="${this.shadowMainClassTransition}--end ${n}">
                                    ${p}
                                </span>
                            </div>`}).join("");this.trigger.innerHTML=r,t()})}):new Promise(t=>{t()})}removeShadow(){this.trigger&&(this.trigger.innerHTML="")}updateShadow(){return new Promise(t=>{if(!ee[this.queryType](this.breakpoint)){t();return}c.useFrame(()=>{[...this.shadow].forEach(r=>{let o=this.percentRange/100,s=r.dataset.shadow,n=rt(r),i=ve(this.row),{x:a}=hr(this.row),l=this.reverse?this.horizontalWidth-(r.getBoundingClientRect().right-a):r.getBoundingClientRect().left-a,p=window.innerWidth/window.innerHeight,u=window.innerWidth-window.innerHeight,m=l/p,d=l-l/p,f=this.mainContainer.querySelector(`.${this.shadowMainClassTransition}[data-shadow="${s}"]`),x=f.querySelector(`.${this.shadowMainClassTransition}--in-center`),b=f.querySelector(`.${this.shadowMainClassTransition}--out-center`),S=f.querySelector(`.${this.shadowMainClassTransition}--left`),w=f.querySelector(`.${this.shadowMainClassTransition}--end`),C=window.innerWidth>window.innerHeight?window.innerHeight:0,P=window.innerWidth>window.innerHeight?window.innerHeight/2:0,$=(()=>{switch(l){case 0:return 0;default:return m+d/o-u/o}})(),N=(()=>{let H=window.innerWidth>window.innerHeight?u/o:u/o+window.innerWidth/p;switch(l){case 0:return 0;default:return H}})(),I=(()=>{let H=n/p,W=(n-n/p)/o;return H+W+N})(),D=I/2+P;this.useSticky&&(this.trigger.style["margin-top"]=`-${i}px`),f.style.top=`${$}px`,x.style.height=`${D}px`,b.style.height=`${D}px`,b.style.top=`${D}px`,S.style.height=`${N}px`,w.style.height=`${I+C}px`,f.style.height=`${N}px`}),t()})})}initScroller(){if(!this.trigger||!ee[this.queryType](this.breakpoint))return;let t=new Ut({type:"scrolltrigger",item:this.row,useWillChange:this.useWillChange,trigger:this.trigger,propierties:"x",breakpoint:"xSmall",pin:!this.useSticky,animatePin:this.animatePin,ease:this.ease,forceTranspond:this.forceTranspond,useThrottle:this.useThrottle,easeType:this.easeType,springConfig:"scroller",animateAtStart:this.animateAtStart,fromTo:this.reverse,dynamicRange:()=>-(this.horizontalWidth-window.innerWidth),dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>this.horizontalWidth},onTick:({value:r,parentIsMoving:o})=>{let s=Math.abs(-Number.parseInt(r*100/(this.horizontalWidth-window.innerWidth)));this.scrollValue=r,this.onTick&&this.onTick({value:r,parentIsMoving:o,percent:this.reverse?100-s:s}),this.children.forEach(n=>{n.move({value:r,parentIsMoving:o})})},onEnter:this.onEnter,onEnterBack:this.onEnterBack,onLeave:this.onLeave,onLeaveBack:this.onLeaveBack});t.init(),this.moduleisActive=!0,this.scrollTriggerInstance=t,this.triggerTopPosition=se(this.trigger).top,this.setLinkAttribute()}createScroller(){$s(this.getWidth.bind(this),this.setDimension.bind(this),this.createShadow.bind(this),this.updateShadow.bind(this))().then(()=>{this.initScroller(),this.refreshChildren()})}refreshChildren(){c.useFrameIndex(()=>{c.useNextTick(()=>{this.afterRefresh?.(),this.children.forEach(t=>{t?.refresh?.()})})},3)}refresh(){if(!(!this.moduleisActive||!ee[this.queryType](this.breakpoint)))return new Promise(t=>{$s(this.getWidth.bind(this),this.setDimension.bind(this),this.updateShadow.bind(this))().then(()=>{this.scrollTriggerInstance?.stopMotion?.(),this.triggerTopPosition=se(this.trigger).top,this.moduleisActive&&(this.scrollTriggerInstance?.refresh?.(),this.refreshChildren()),t()})})}killScroller({destroyAll:t=!1}){(this.moduleisActive||t)&&(this.scrollTriggerInstance?.destroy?.(),this.scrollTriggerInstance=null,this.trigger&&(this.trigger.style.height=""),this.mainContainer&&(this.mainContainer.style.height=""),this.trigger&&(this.trigger.style.marginTop=""),this.removeShadow(),this.removeLinkAttribute(),this.moduleisActive=!1,c.useFrameIndex(()=>{if(this.row.style="",t&&this.mainContainer){this.useDrag&&this.removeDragListener();let r=this.mainContainer.querySelector(".scroller-style");r&&r.remove(),this.mainContainer=null,this.trigger=null,this.row=[],this.column=[],this.shadow=[],this.afterInit=null,this.afterRefresh=null,this.onTick=null,this.onEnter=null,this.onEnterBack=null,this.onLeave=null,this.onLeaveBack=null,this.scrollTriggerInstance=null,this.moduleisActive=!1,this.button=[],this.mainContainer=null,this.container=null,this.trigger=null,this.row=null,c.useNextTick(()=>{this.afterDestroy?.(),this.afterDestroy=null,this.children.forEach(o=>{o?.destroy?.(),o=null}),this.children=[]})}},3))}onResize(t){this.moduleisActive&&ee[this.queryType](this.breakpoint)?t&&this.refresh():!this.moduleisActive&&ee[this.queryType](this.breakpoint)?this.createScroller():this.moduleisActive&&!ee[this.queryType](this.breakpoint)&&this.killScroller({destroyAll:!1})}destroy(){this.killScroller({destroyAll:!0})}};var wp=({screen:e,scroller:t,scrollbar:r})=>{let o=new Ht({screen:e,scroller:t,direction:"vertical",drag:!0,scopedEvent:!0,breakpoint:"xSmall",onTick:({percent:s})=>{r.value=s}});return o.init(),{updateScroller:()=>{let s=ve(t),n=ve(e),i=rt(r),a=n/s*i;r.style.setProperty("--thumb-width",`${a}px`),o.refresh()},move:s=>o.move(s),goToTop:()=>o.set(0)}};var Cp=`<?xml version="1.0" encoding="UTF-8" standalone="no"?><!-- Generator: Gravit.io --><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 466.726 466.722" width="466.726pt" height="466.722pt"><defs><clipPath id="_clipPath_NGPjDQvH1wIrClzh8RPwl8j4Z0sPfcPA"><rect width="466.726" height="466.722"/></clipPath></defs><g clip-path="url(#_clipPath_NGPjDQvH1wIrClzh8RPwl8j4Z0sPfcPA)"><path d=" M 64.164 0 C 28.918 0 0 28.918 0 64.164 L 0 306.614 C 0 341.86 28.918 370.778 64.164 370.778 L 306.614 370.778 C 341.86 370.778 370.778 341.86 370.778 306.614 L 370.778 64.164 C 370.778 28.918 341.86 0 306.614 0 L 64.164 0 Z  M 64.164 34.969 L 306.614 34.969 C 323.075 34.969 335.723 47.703 335.723 64.164 L 335.723 306.614 C 335.723 323.075 323.075 335.723 306.614 335.723 L 64.164 335.723 C 47.703 335.723 34.969 323.075 34.969 306.614 L 34.969 64.164 C 34.969 47.703 47.703 34.969 64.164 34.969 Z " fill-rule="evenodd" /><path d=" M 353.214 95.945 C 348.577 95.949 344.132 97.793 340.855 101.07 C 337.578 104.347 335.734 108.793 335.73 113.429 C 335.734 118.062 337.578 122.507 340.855 125.784 C 344.132 129.061 348.578 130.905 353.214 130.913 L 402.566 130.913 C 418.882 130.913 431.675 143.792 431.675 160.108 L 431.675 402.558 C 431.675 418.874 418.882 431.667 402.566 431.667 L 160.116 431.667 C 143.8 431.667 130.921 418.874 130.921 402.558 L 130.917 353.292 C 130.937 348.643 129.105 344.175 125.823 340.878 C 122.542 337.581 118.085 335.726 113.432 335.722 C 108.78 335.726 104.323 337.581 101.045 340.878 C 97.764 344.175 95.928 348.643 95.948 353.292 L 95.948 402.558 C 95.948 437.792 124.882 466.722 160.112 466.722 L 402.562 466.722 C 437.796 466.722 466.726 437.788 466.726 402.558 L 466.726 160.108 C 466.726 124.874 437.792 95.944 402.562 95.944 L 353.214 95.945 Z " /></g></svg>
`;var bf=({getState:e})=>{let{rawContent:t}=e();navigator.clipboard.writeText(t)};function yf({sync:e,bindProps:t,setState:r,delegateEvents:o}){return g`
        <code-overlay-button
            ${e}
            ${t({bind:["currentButtonState"],props:({currentButtonState:s,_current:n})=>{let{label:i,source:a}=n;return{key:i,disable:!a||a.length===0,selected:i===s}}})}
            ${o({click:(s,{current:n})=>{let{label:i}=n;r("activeContent",i)}})}
        >
        </code-overlay-button>
    `}var vf=async({setState:e,getState:t,codeEl:r,currentKey:o,updateScroller:s,goToTop:n,syncParent:i})=>{let{urls:a}=t(),p=a.find(({label:m})=>m===o)?.source;if(!p?.length)return;let u=g`<html-content
        ${T({source:p,useMinHeight:!0})}
        ${i}
    ></html-content>`;r.insertAdjacentHTML("afterbegin",u),await uo(r),e("rawContent",r.textContent),s(),n()},Ip=({codeEl:e,removeDOM:t})=>{e.textContent="";let r=e.firstElementChild;r&&t(r)},Ep=({onMount:e,setState:t,getState:r,repeat:o,html:s,bindProps:n,delegateEvents:i,staticProps:a,computed:l,watch:p,removeDOM:u,syncParent:m})=>(e(({element:d,refs:f})=>{let{screenEl:x,scrollerEl:b,codeEl:S,scrollbar:w}=f,{updateScroller:C,move:P,goToTop:$}=wp({screen:x,scroller:b,scrollbar:w});w.addEventListener("input",()=>{P(w.value)}),L.watch("beforeRouteLeave",()=>{console.log("oooo"),t("urls",[])}),l("currentButtonState",["urls","activeContent"],(I,D)=>(I.length>0?(d.classList.add("active"),document.body.style.overflow="hidden"):(d.classList.remove("active"),document.body.style.overflow="",Ip({codeEl:S,removeDOM:u}),t("activeContent",""),$()),D));let N=p("activeContent",I=>{Ip({codeEl:S,removeDOM:u}),vf({setState:t,getState:r,codeEl:S,currentKey:I,updateScroller:C,goToTop:$,staticProps:a,syncParent:m})});return()=>{N()}}),s`
        <div class="code-overlay js-overlay">
            <span
                class="code-overlay__background"
                ${i({click:()=>{t("urls",[])}})}
            ></span>
            <div class="code-overlay__wrap js-overlay-wrap">
                <button
                    type="button"
                    class="code-overlay__close"
                    ${i({click:()=>{t("urls",[])}})}
                ></button>
                <button
                    type="button"
                    class="code-overlay__copy"
                    ${i({click:()=>{bf({getState:r})}})}
                >
                    ${Cp}
                </button>
                <div class="code-overlay__header">
                    ${o({clean:!0,watch:"urls",render:({sync:d})=>yf({sync:d,bindProps:n,delegateEvents:i,setState:t})})}
                </div>
                <input
                    type="range"
                    id="test"
                    name="test"
                    min="0"
                    max="100"
                    value="0"
                    step=".5"
                    ref="scrollbar"
                    class="code-overlay__scrollbar"
                />
                <div class="code-overlay__content" ref="screenEl">
                    <div ref="scrollerEl">
                        <div
                            class="code-overlay__content__description"
                            ref="codeEl"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    `);var kp=({onMount:e,watch:t,getState:r,html:o})=>{let{key:s,disable:n}=r();return e(({element:a})=>{let l=t("selected",p=>{a.classList.toggle("selected",p)});return()=>{l()}}),o`
        <button class="code-overlay__button ${n?"disable":""}">${s}</button>
    `};var Sf=E({name:"code-overlay",component:Ep,isolateOnMount:!0,isolateCreation:!0,exportState:["urls","activeContent"],state:{urls:()=>({value:[],type:Array,skipEqual:!1}),activeContent:()=>({value:"",type:String,skipEqual:!0}),rawContent:()=>({value:"",type:String}),currentButtonState:()=>({value:String,type:"",skipEqual:!0})}}),Tf=E({name:"code-overlay-button",component:kp,exportState:["key","selected","disable"],state:{key:"",selected:()=>({value:!1,type:Boolean}),disable:()=>({value:!0,type:Boolean})}});var Rp=({html:e,delegateEvents:t})=>e`
        <button
            type="button"
            class="c-btn-debug"
            ${t({click:()=>{L.debugStore(),console.log(z),console.log("bindEventMap",Er),console.log("currentListValueMap",co),console.log("activeRepeatMap",Pr),console.log("repeatMap",Ar),console.log("onMountCallbackMap",lo),console.log("staticPropsMap",Kt),console.log("dynamicPropsMap",Xe),console.log("repeaterTargetComponent",Zt),console.log("eventDelegationMap",Mt),console.log("tempDelegateEventMap",Ir)}})}
        >
            Debug
        </button>
    `;var xf=E({name:"debug-button",component:Rp});var te={setDefault(e){Y.set(e)},getDefault(e){return Y.get(e)},printDefault(){Y.print()},mq(e,t){switch(e){case"min":return ee.min(t);case"max":return ee.max(t);case"get":return ee.getBreackpoint(t)}}};var js=({each:e,useStagger:t,isLastDraw:r,callBackObject:o,callback:s,callbackCache:n,callbackOnStop:i})=>{e===0||t===!1?(c.useFrame(()=>{s.forEach(({cb:a})=>a(o))}),c.useFrame(()=>{n.forEach(({cb:a})=>{c.useCache.fireObject({id:a,obj:o})})})):(s.forEach(({cb:a,frame:l})=>{c.useFrameIndex(()=>a(o),l)}),n.forEach(({cb:a,frame:l})=>{c.useCache.update({id:a,callBackObject:o,frame:l})})),r&&(e===0||t===!1?c.useFrame(()=>{i.forEach(({cb:a})=>a(o))}):i.forEach(({cb:a,frame:l})=>{c.useFrameIndex(()=>a(o),l+1)}))};var ko=class{constructor(t){this.ease=Mu(t?.ease),this.duration=$t(t?.duration),this.stagger=et(t),this.values=[],this.callbackOnStop=[],this.callback=[],this.callbackCache=[],this.unsubscribeCache=[],this.type="parallaxTween";let r=t?.from||null;r&&this.setData(r),t?.to&&this.goTo(t.to)}inzializeStagger(){if(this.stagger.each>0&&(this.callbackCache.length>0||this.callback.length>0)){let t=ft(this.callbackCache,this.callback);if(this.stagger.grid.col>t.length){Ze(t.length);return}let{staggerArray:r,staggerArrayOnComplete:o}=tt({arr:t,endArr:this.callbackOnStop,stagger:this.stagger,slowlestStagger:xe,fastestStagger:xe});this.callbackCache.length>this.callback.length?this.callbackCache=r:this.callback=r,this.callbackOnStop=o}}draw({partial:t,isLastDraw:r}){let o=()=>{this.values.forEach(n=>{let i=n.toIsFn?n.toFn():n.toValue,a=n.fromIsFn?n.fromFn():n.fromValue,l=i-a;n.currentValue=this.ease(t,a,l,this.duration),n.currentValue=ue(n.currentValue)});let s=fe(this.values,"currentValue");js({each:this.stagger.each,useStagger:!0,isLastDraw:r,callBackObject:s,callback:this.callback,callbackCache:this.callbackCache,callbackOnStop:this.callbackOnStop})};c.useNextTick(()=>o())}setData(t){let r=Object.entries(t);return this.values=r.map(o=>{let[s,n]=o;return{prop:s,toValue:n,toValProcessed:n,fromValue:n,currentValue:n,settled:!1}}),this}mergeData(t){this.values=this.values.map(r=>{let o=t.find(s=>s.prop===r.prop);return o?{...r,...o}:{...r}})}goTo(t){let r=Bt(t);return this.mergeData(r),this}subscribe(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=we(t,this.callback);return this.callback=r,()=>this.callback=o(this.callback)}onStop(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=we(t,this.callbackOnStop);return this.callbackOnStop=r,()=>this.callbackOnStop=o(this.callbackOnStop)}subscribeCache(t,r){let{arrayOfCallbackUpdated:o,unsubscribeCb:s,unsubscribeCache:n}=gt(t,r,this.callbackCache,this.unsubscribeCache);return this.callbackCache=o,this.unsubscribeCache=n,()=>this.callbackCache=s(this.callbackCache)}getDuration(){return this.duration}getType(){return this.type}destroy(){this.values=[],this.callbackOnStop=[],this.callback=[],this.callbackCache=[],this.unsubscribeCache.forEach(t=>t()),this.unsubscribeCache=[]}};var Ro=class{constructor(){this.type="sequencer",this.children=[]}draw({partial:t,isLastDraw:r,useFrame:o}){this.children.forEach(s=>{s.draw({partial:t,isLastDraw:r,useFrame:o})})}add(t){this.children.push(t)}inzializeStagger(){this.children.forEach(t=>{t.inzializeStagger()})}setDuration(t){this.children.forEach(r=>{r.setDuration(t)})}getDuration(){return this.children.length>0?this.children[0].getDuration():0}setStretchFactor(t){this.children.forEach(r=>{r.setStretchFactor(t)})}getLabels(){return this.children.flatMap(t=>t.getLabels())}resetLastValue(){this.children.forEach(t=>t.resetLastValue())}disableStagger(){this.children.forEach(t=>{t.disableStagger()})}cleanCachedId(){this.children.forEach(t=>{t.cleanCachedId()})}getType(){return this.type}destroy(){this.children.forEach(t=>{t.destroy()}),this.children=[]}};var Pp=(e,t)=>Object.keys(e).map(r=>nt(e[r])?{prop:r,toValue:e[r],ease:Ve(t)}:(Et(`${r}: ${e[r]}`),{prop:r,toValue:0,ease:Ve(t)})),Ap=(e,t)=>Object.keys(e).map(r=>nt(e[r])?{prop:r,fromValue:e[r],ease:Ve(t)}:(Et(`${r}: ${e[r]}`),{prop:r,fromValue:0,ease:Ve(t)})),_p=(e,t,r)=>Object.keys(e).map(o=>!nt(t[o])||!nt(e[o])?(Et(`${o}: ${t[o]} || ${o}: ${e[o]}`),{prop:o,fromValue:0,toValue:0,ease:Ve(r)}):{prop:o,fromValue:e[o],toValue:t[o],ease:Ve(r)});var pi={fromValue:{get:"toValue",set:"fromValue"},toValue:{get:"fromValue",set:"toValue"}},Op=(e,t,r,o)=>e.slice(0,t).reduceRight((s,{values:n})=>{let i=n.find(({prop:a,active:l})=>l&&a===r);return i&&s===null?i[pi[o].get]:s},null),Np=(e,t,r,o)=>e.slice(t+1,e.length).reduce((s,{start:n,values:i})=>i.find(l=>l.prop===r&&l.active)&&n<=o?!1:s,!0);var Se={BACKWARD:"backward",FORWARD:"forward",NONE:"none"};var Po=class{constructor(t){this.values=[],this.timeline=[],this.labels=[],this.callback=[],this.callbackCache=[],this.callbackOnStop=[],this.callbackAdd=[],this.unsubscribeCache=[],this.duration=$t(t?.duration),this.type="sequencer",this.defaultProp={start:0,end:this.duration,ease:Nu(t?.ease)},this.firstRun=!0,this.forceAddFnAtFirstRun=!0,this.direction=void 0,this.lastPartial=0,this.lastDirection=void 0,this.stagger=et(t),this.useStagger=!0,this.staggerIsReady=!1;let r=t?.data||null;r&&this.setData(r)}inzializeStagger(){if(!this.staggerIsReady){if(this.stagger.each>0&&(this.callbackCache.length>0||this.callback.length>0)){let t=ft(this.callbackCache,this.callback);if(this.stagger.grid.col>t.length){Ze(t.length);return}let{staggerArray:r,staggerArrayOnComplete:o}=tt({arr:t,endArr:this.callbackOnStop,stagger:this.stagger,slowlestStagger:xe,fastestStagger:xe});this.callbackCache.length>this.callback.length?this.callbackCache=r:this.callback=r,this.callbackOnStop=o}this.staggerIsReady=!0}}draw({partial:t=0,isLastDraw:r=!1,useFrame:o=!1,direction:s=Se.NONE}){let n=()=>{this.firstRun&&(this.lastPartial=t,this.actionAtFirstRender(t)),!this.firstRun&&this.lastPartial&&(!s||s===Se.NONE)&&(this.direction=t>=this.lastPartial?Se.FORWARD:Se.BACKWARD),!this.firstRun&&(s===Se.BACKWARD||s===Se.FORWARD)&&(this.direction=s),this.values.forEach(a=>{a.settled=!1}),this.timeline.forEach(({start:a,end:l,values:p},u)=>{p.forEach(m=>{let d=this.values.find(({prop:C})=>C===m.prop);if(!d||d.settled||!m.active||!Np(this.timeline,u,m.prop,t))return;let x=c.checkType(Number,m.toValue)?m.toValue:m.toValue(),b=c.checkType(Number,m.fromValue)?m.fromValue:m.fromValue(),S=l-a,w=t<l?b:x;m.currentValue=t>=a&&t<=l?m.ease(t-a,b,x-b,S):w,m.currentValue=ue(m.currentValue),d.currentValue=m.currentValue,d.settled=!0})});let i=fe(this.values,"currentValue");js({each:this.stagger.each,useStagger:this.useStagger,isLastDraw:r,callBackObject:i,callback:this.callback,callbackCache:this.callbackCache,callbackOnStop:this.callbackOnStop}),this.fireAddCallBack(t),this.useStagger=!0,this.lastPartial=t,this.lastDirection=this.direction,this.firstRun=!1};o?n():c.useNextTick(()=>n())}resetLastValue(){this.firstRun=!0,this.lastPartial=0,this.lastDirection=void 0}actionAtFirstRender(t=0){this.forceAddFnAtFirstRun&&(this.callbackAdd.forEach(({fn:r,time:o})=>{let s={shouldFire:t>=o,direction:Se.FORWARD},n={shouldFire:t<=o,direction:Se.BACKWARD};if(!(s.shouldFire||n.shouldFire))return;let a=s.shouldFire?s.direction:n.direction;r({direction:a,value:t,isForced:!0})}),this.forceAddFnAtFirstRun=!1)}fireAddCallBack(t=0){this.callbackAdd.forEach(({fn:r,time:o})=>{let s=this.direction===Se.FORWARD&&t>o&&this.lastPartial<=o,n=this.direction===Se.BACKWARD&&t<o&&this.lastPartial>=o;(s||n)&&r({direction:this.direction,value:t,isForced:!1})})}setStretchFactor(t=0){let r=t/this.duration;this.timeline.forEach(({start:o,end:s},n)=>{this.timeline[n].start=ue(o*r),this.timeline[n].end=ue(s*r)}),this.labels.forEach(({time:o},s)=>{this.labels[s].time=ue(o*r)}),this.callbackAdd.forEach(({time:o},s)=>{this.callbackAdd[s].time=ue(o*r)})}setData(t={}){return this.values=Object.entries(t).map(r=>{let[o,s]=r,n=Lu(o,s),i=n?s:0;return{prop:n?o:"invalidProp",toValue:i,fromValue:i,currentValue:i,active:!1,settled:!1,ease:Ve(Y.get("sequencer").ease)}}),this}mergeArray(t,r){return r.map(o=>{let s=t.find(i=>i.prop===o.prop),n={prop:o.prop,active:!1};return s?{...o,...s,active:!0}:n})}orderByStart(t){return t.sort((r,o)=>r.start-o.start)}setPropFromAncestor(t){this.timeline.forEach(({values:r},o)=>{r.forEach(({prop:s,active:n},i)=>{if(!n)return;let a=Op(this.timeline,o,s,t);a!==null&&(r[i][pi[t].set]=a)})})}goTo(t,r){let o={...this.defaultProp,...r},{start:s,end:n,ease:i}=o;if(!ks({start:s,end:n}))return this;let a=Pp(t,i),l=this.mergeArray(a,this.values);return this.timeline.push({values:l,start:s??0,end:n??this.duration}),this.timeline=this.orderByStart(this.timeline),this.setPropFromAncestor("fromValue"),this}goFrom(t,r){let o={...this.defaultProp,...r},{start:s,end:n,ease:i}=o;if(!ks({start:s,end:n}))return this;let a=Ap(t,i),l=this.mergeArray(a,this.values);return this.timeline.push({values:l,start:s??0,end:n??this.duration}),this.timeline=this.orderByStart(this.timeline),this.setPropFromAncestor("toValue"),this}goFromTo(t,r,o){let s={...this.defaultProp,...o},{start:n,end:i,ease:a}=s;if(!ks({start:n,end:i}))return this;if(!Vt(t,r)){Dt("lerp goFromTo:",t,r);return}let l=_p(t,r,a),p=this.mergeArray(l,this.values);return this.timeline.push({values:p,start:n??0,end:i??this.duration}),this.timeline=this.orderByStart(this.timeline),this}label(t="",r=0){return this.labels.push({name:t,time:r}),this}getLabels(){return this.labels}add(t=()=>{},r=0){let o=c.checkType(Function,t),s=c.checkType(Number,r),n=o&&s;return o||_c(t),s||Oc(r),n?(this.callbackAdd.push({fn:t,time:r}),this):this}subscribe(t=()=>{}){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=we(t,this.callback);return this.callback=r,()=>this.callback=o(this.callback)}onStop(t){let{arrayOfCallbackUpdated:r,unsubscribeCb:o}=we(t,this.callbackOnStop);return this.callbackOnStop=r,()=>this.callbackOnStop=o(this.callbackOnStop)}subscribeCache(t,r=()=>{}){let{arrayOfCallbackUpdated:o,unsubscribeCb:s,unsubscribeCache:n}=gt(t,r,this.callbackCache,this.unsubscribeCache);return this.callbackCache=o,this.unsubscribeCache=n,()=>this.callbackCache=s(this.callbackCache)}getDuration(){return this.duration}setDuration(t=0){this.duration=t}getType(){return this.type}cleanCachedId(){this.callbackCache.forEach(({cb:t})=>c.useCache.clean(t))}disableStagger(){this.useStagger=!1}destroy(){this.values=[],this.timeline=[],this.callback=[],this.callbackCache=[],this.callbackOnStop=[],this.callbackAdd=[],this.unsubscribeCache.forEach(t=>t()),this.unsubscribeCache=[]}};var wf=({each:e,duration:t,numItem:r,index:o,eachByNumItem:s})=>{if(e===1){let m=t/r,d=ue(o*m),f=ue(d+m);return{start:d,end:f}}let i=t/r*s,a=t-i,l=r-1>0?r-1:1,u=a/l*o;return{start:ue(u),end:ue(i+u)}},Cf=({duration:e,numItem:t,index:r,eachByNumItem:o,type:s})=>{let i=e/t*r,l=(e-(e-i))/t*o;if(s===er)return{start:0,end:ue(e-(i-l))};if(s===rr){let p=(i-l)/2;return{start:ue(p),end:ue(e-p)}}return s===tr?{start:ue(i-l),end:ue(e)}:{start:0,end:e}},Mp=e=>{let t=ju(e?.items),r=et(e),o=$t(e?.duration),s=10,n=r?.each||1,i=[...t].map((f,x)=>({item:f,start:0,end:o,index:x}));if(!Wu(t))return i;r.grid?.col>t.length&&(Ze(t.length),n=1),c.checkType(Number,n)&&(n>s||n<1)&&(Jc(s),n=1);let{staggerArray:a}=tt({arr:[...t].map(f=>({item:f})),endArr:[],stagger:r,slowlestStagger:xe,fastestStagger:xe}),l=a.filter(({item:f})=>c.checkType(Element,f)||c.checkType(Object,f));if(l.length===0)return qc(),i;let p=l.map(({frame:f})=>f),u=[...new Set(p)].sort((f,x)=>f-x),m=u.length;return l.map(({item:f,frame:x})=>{let b=u.indexOf(x),S=n*m/s,{start:w,end:C}=r.type===Qt?wf({each:n,duration:o,numItem:m,index:b,eachByNumItem:S}):r.type===er||r.type===tr||r.type===rr?Cf({duration:o,numItem:m,index:b,eachByNumItem:S,type:r.type}):{start:0,end:o};return{item:f,start:w,end:C,index:b}})};var re={createScrollerTween(e){return new ko(e)},createSequencer(e){return new Po(e)},createMasterSequencer(){return new Ro},createStaggers(e){return Mp(e)},createTween(e){return new Rt(e)},createSpring(e){return new it(e)},createLerp(e){return new kt(e)}};var Bs=(e,t)=>Object.entries(e).map(r=>{let[o,s]=r,n=o in t;return{data:{[o]:s},active:n}}).filter(({active:r})=>r).map(({data:r})=>r).reduce((r,o)=>({...r,...o}),{});var zs=(e,t,r)=>{let o=t?.getId?.(),s=t?.getInitialData?.()||{};return e.slice(0,r).reduce((n,i)=>{let a=i[0].data;if(a.action==="sync"){let d=a?.syncProp,f={tween:d.from,id:d.from?.getId?.()},x={tween:d.to,id:d.to?.getId?.()};f.id===o&&(o=x.id)}let p=i.find(({data:d})=>d?.tween?.getId?.()===o);p?.data?.tween?.set?.(p?.data?.valuesTo,{immediateNoPromise:!0});let u=p?.data?.tween?.getToNativeType?.(),m=u&&p?Bs(u,p.data.valuesTo):{};return{...n,...m}},s)};var Ao=class{constructor(t){this.repeat=Rs(t?.repeat),this.yoyo=Q(t?.yoyo,"asyncTimeline: yoyo",!1),this.freeMode=Q(t?.freeMode,"asyncTimeline: freeMode",!1),this.autoSet=Q(t?.autoSet,"asyncTimeline: autoSet",!1),this.tweenList=[],this.currentTween=[],this.tweenStore=[],this.waitComplete=!1,this.defaultObj={id:-1,tween:void 0,action:"",valuesFrom:{},valuesTo:{},prevValueTo:{},prevValueSettled:!1,tweenProps:{},groupProps:{},syncProp:{to:{getId:()=>{},set:()=>{},goTo:()=>{},goFromTo:()=>{},getToNativeType:()=>{},destroy:()=>{},onStartInPause:()=>{},resetData:()=>{},getInitialData:()=>{},stop:()=>{},pause:()=>{},resume:()=>{}},from:{getId:()=>{},set:()=>{},goTo:()=>{},goFromTo:()=>{},getToNativeType:()=>{},destroy:()=>{},onStartInPause:()=>{},resetData:()=>{},getInitialData:()=>{},stop:()=>{},pause:()=>{},resume:()=>{}}},labelProps:{}},this.labelState={active:!1,index:-1,isReverse:!1},this.starterFunction={fn:()=>{},active:!1},this.groupCounter=1,this.groupId=void 0,this.currentTweenCounter=0,this.currentIndex=0,this.loopCounter=1,this.isReverseNext=!1,this.forceYoyo=!1,this.isReverse=!1,this.isInPause=!1,this.isInSuspension=!1,this.addAsyncIsActive=!1,this.isStopped=!0,this.delayIsRunning=!1,this.startOnDelay=!1,this.actionAfterReject={active:!1,fn:()=>{}},this.sessionId=0,this.activetweenCounter=0,this.timeOnPause=0,this.autoSetIsJustCreated=!1,this.currentAction=[],this.fpsIsInLoading=!1,this.id=0,this.callbackLoop=[],this.callbackComplete=[],this.currentResolve=void 0,this.currentReject=void 0}run(){let t=this.tweenList[this.currentIndex],r=this.currentAction;if(this.currentAction=[],!t)return;this.tweenList[this.currentIndex]=t.map(i=>{let{data:a}=i,{tween:l,valuesTo:p,prevValueSettled:u}=a;if(l&&l?.getToNativeType&&!u){let m=l.getToNativeType(),d=Bs(m,p);return{...i,data:{...a,prevValueTo:d,prevValueSettled:!0}}}return i});let o=t.map(i=>{let{data:a}=i,{tween:l,action:p,valuesFrom:u,valuesTo:m,tweenProps:d,syncProp:f,id:x}=a,b={...d};delete b.delay;let{active:S,index:w}=this.labelState,C=S&&w&&this.currentIndex<w;C&&(b.immediate=!0),d&&"relative"in d&&d.relative&&(d.relative=!1,wc()),this.currentAction.push({id:x,action:p});let P=r.find(({id:N,action:I})=>N===x&&I===p),$={set:()=>l?.[p](u,b),goTo:()=>l?.[p](m,b),goFrom:()=>l?.[p](u,b),goFromTo:()=>l?.[p](u,m,b),sync:()=>new Promise(N=>{let{from:I,to:D}=f;D?.set(I?.getToNativeType(),{immediate:!0}).then(()=>N({resolve:!0}))}),add:()=>P?new Promise(N=>N({resolve:!0})):new Promise(N=>{if(C)N({resolve:!0});else{let I=this.getDirection();l({direction:I,loop:this.loopCounter}),N({resolve:!0})}}),addAsync:()=>{this.addAsyncIsActive=!0;let N=this.sessionId;return P?new Promise(I=>I({resolve:!0})):new Promise((I,D)=>{if(C)I({resolve:!0});else{let H=this.getDirection();l({direction:H,loop:this.loopCounter,resolve:()=>{N===this.sessionId?I({resolve:!0}):D()}})}})},createGroup:()=>new Promise(N=>N({resolve:!0})),closeGroup:()=>new Promise(N=>N({resolve:!0})),label:()=>new Promise(N=>N({resolve:!0})),suspend:()=>{if(P)return new Promise(D=>D({resolve:!0}));let N=c.checkType(Boolean,l());N||Cc(l);let I=N?l():!0;return new Promise(D=>{!C&&I&&(this.isInSuspension=!0),D({resolve:!0})})}};return new Promise((N,I)=>{let D=C?!1:d?.delay,H=this.sessionId,W=()=>{if(this.isStopped||this.startOnDelay||H!==this.sessionId){I();return}let X=this.addToActiveTween(l),M=l&&l?.onStartInPause?l.onStartInPause(()=>this.isInPause):pe;$[p]().then(()=>N({resolve:!0})).catch(()=>{}).finally(()=>{X(),M()})};if(D){let X=c.getTime();this.delayIsRunning=!0;let M=0,O=()=>{let G=c.getTime(),oe=G-X;if(this.isInPause&&(M=G-this.timeOnPause),this.actionAfterReject.active&&(M=0,oe=D),oe-M>=D||this.isStopped||this.isReverseNext){this.delayIsRunning=!1,W();return}requestAnimationFrame(O)};requestAnimationFrame(O)}else W()})}),n=this.tweenList[this.currentIndex].some(i=>i.data.groupProps?.waitComplete)?"all":"race";Promise[n](o).then(()=>{if(this.isInSuspension||this.isStopped)return;let{active:i,index:a,isReverse:l}=this.labelState,{fn:p,active:u}=this.starterFunction;if(u&&i&&this.currentIndex===a-1){this.starterFunction.active=!1,this.disableLabel(),this.loopCounter++,p();return}if(i&&l&&this.currentIndex===a-1&&this.reverseNext(),this.isReverseNext){this.isReverseNext=!1,this.currentIndex=this.tweenList.length-this.currentIndex-1,this.disableLabel(),this.revertTween(),this.run();return}if(this.currentIndex<this.tweenList.length-1){this.currentIndex++,this.run();return}if(this.loopCounter<this.repeat||this.repeat===-1){let m=()=>{if(this.loopCounter>0){let d=this.getDirection();this.callbackLoop.forEach(({cb:f})=>f({direction:d,loop:this.loopCounter}))}this.loopCounter++,this.currentIndex=0,this.disableLabel(),(this.yoyo||this.forceYoyo)&&this.revertTween(),this.forceYoyo=!1,this.run()};if(i&&a===this.tweenList.length&&!this.freeMode){let d=this.tweenStore.map(({tween:f})=>{let x=zs(this.tweenList,f,this.tweenList.length);return new Promise((b,S)=>{f.set(x).then(()=>b({resolve:!0})).catch(()=>S())})});Promise.all(d).then(()=>{m()}).catch(()=>{});return}m();return}this.callbackComplete.forEach(({cb:m})=>m()),this.isStopped=!0,this.currentResolve&&this.currentResolve({resolve:!0})}).catch(()=>{if(this.actionAfterReject.active){console.log("actionAfterReject fired"),this.actionAfterReject.fn(),this.actionAfterReject.fn=()=>{},this.actionAfterReject.active=!1;return}}).finally(()=>{this.addAsyncIsActive=!1})}addToActiveTween(t){let r=t?.getId&&t.getId();if(!r)return pe;let o=this.activetweenCounter;return this.activetweenCounter++,this.currentTween.push({tween:t,uniqueId:r,id:o}),()=>{this.currentTween=this.currentTween.filter(({id:s})=>s!==o)}}revertTween(){this.isReverse=!this.isReverse,this.tweenList=this.tweenList.reverse().map(t=>t.reverse().map(r=>{let{data:o}=r,{action:s,valuesFrom:n,syncProp:i,prevValueTo:a,valuesTo:l}=o,p=l,{from:u,to:m}=i;switch(s){case"goTo":return{...r,data:{...o,valuesTo:a,prevValueTo:p}};case"goFromTo":return{...r,data:{...o,valuesFrom:l,valuesTo:n}};case"sync":return{...r,data:{...o,syncProp:{...i,from:m,to:u}}};case"goFrom":Ic(),this.stop()}return r}))}addToMainArray(t){let r=this.tweenList.findIndex(o=>o[0]?.group&&o[0].group===this.groupId);r>=0?this.tweenList[r].push({group:this.groupId,data:t}):this.tweenList.push([{group:this.groupId,data:t}])}addTweenToStore(t){let r=t?.getId?.();if(this.tweenStore.find(({id:n})=>n===r))return;let s={id:r,tween:t};this.tweenStore.push(s)}resetAllTween(){this.tweenStore.forEach(({tween:t})=>t.resetData())}set(t,r={},o={}){if(!nr(t))return this;o.delay=So(o?.delay);let s={id:this.currentTweenCounter,tween:t,action:"set",valuesTo:r,valuesFrom:r,tweenProps:o,groupProps:{waitComplete:this.waitComplete}};this.currentTweenCounter++;let n={...this.defaultObj,...s};return this.addToMainArray(n),this.addTweenToStore(t),this}goTo(t,r={},o={}){if(!nr(t))return this;o.delay=So(o?.delay);let s={id:this.currentTweenCounter,tween:t,action:"goTo",valuesTo:r,tweenProps:o??{},groupProps:{waitComplete:this.waitComplete}};this.currentTweenCounter++;let n={...this.defaultObj,...s};return this.addToMainArray(n),this.addTweenToStore(t),this}goFrom(t,r={},o={}){if(!nr(t))return this;o.delay=So(o?.delay);let s={id:this.currentTweenCounter,tween:t,action:"goFrom",valuesFrom:r,tweenProps:o,groupProps:{waitComplete:this.waitComplete}};this.currentTweenCounter++;let n={...this.defaultObj,...s};return this.addToMainArray(n),this.addTweenToStore(t),this}goFromTo(t,r={},o={},s={}){if(!nr(t))return this;s.delay=So(s?.delay);let n={id:this.currentTweenCounter,tween:t,action:"goFromTo",valuesFrom:r,valuesTo:o,tweenProps:s,groupProps:{waitComplete:this.waitComplete}};this.currentTweenCounter++;let i={...this.defaultObj,...n};return this.addToMainArray(i),this.addTweenToStore(t),this}add(t=pe){let r=jt(t,()=>{},"timeline add function");if(this.groupId)return sr("add"),this;let o={id:this.currentTweenCounter,tween:r,action:"add",groupProps:{waitComplete:this.waitComplete}};this.currentTweenCounter++;let s={...this.defaultObj,...o};return this.addToMainArray(s),this}addAsync(t){let r=qu(t);if(this.groupId)return sr("addAsync"),this;let o={id:this.currentTweenCounter,tween:r,action:"addAsync",groupProps:{waitComplete:this.waitComplete}};this.currentTweenCounter++;let s={...this.defaultObj,...o};return this.addToMainArray(s),this}sync(t){if(this.groupId)return sr("sync"),this;let r=nr(t?.from);if(!nr(t?.to)||!r)return this;let s={id:this.currentTweenCounter,action:"sync",groupProps:{waitComplete:this.waitComplete},syncProp:t};this.currentTweenCounter++;let n={...this.defaultObj,...s};return this.addToMainArray(n),this}createGroup(t={}){if(this.groupId)return sr("createGroup"),this;let r={id:this.currentTweenCounter,action:"createGroup",groupProps:t};this.currentTweenCounter++;let o={...this.defaultObj,...r};return this.addToMainArray(o),this.waitComplete=t?.waitComplete??!1,this.groupId=this.groupCounter++,this}closeGroup(){this.groupId=void 0;let t={id:this.currentTweenCounter,action:"closeGroup"};this.currentTweenCounter++;let r={...this.defaultObj,...t};return this.addToMainArray(r),this.waitComplete=!1,this}suspend(t=()=>!0){if(this.groupId)return sr("suspend"),this;let r={id:this.currentTweenCounter,tween:t,action:"suspend",groupProps:{waitComplete:this.waitComplete}};this.currentTweenCounter++;let o={...this.defaultObj,...r};return this.addToMainArray(o),this}label(t={}){if(this.groupId)return sr("label"),this;if(!Hu(t?.name,"asyncTimeline label:"))return this;let r={id:this.currentTweenCounter,action:"label",labelProps:t,groupProps:{waitComplete:this.waitComplete}};this.currentTweenCounter++;let o={...this.defaultObj,...r};return this.addToMainArray(o),this}addSetBlocks(){this.autoSetIsJustCreated||(this.autoSetIsJustCreated=!0,this.tweenStore.forEach(({tween:t})=>{let r=t.getInitialData(),o={id:this.currentTweenCounter,tween:t,action:"set",valuesFrom:r,valuesTo:r,groupProps:{waitComplete:this.waitComplete}};this.currentTweenCounter++;let s={...this.defaultObj,...o};this.tweenList=[[{group:void 0,data:s}],...this.tweenList]}),this.tweenStore.forEach(({tween:t})=>{let r=zs(this.tweenList,t,this.tweenList.length),o={id:this.currentTweenCounter,tween:t,action:"set",valuesFrom:r,valuesTo:r,groupProps:{waitComplete:this.waitComplete}};this.currentTweenCounter++;let s={...this.defaultObj,...o};this.tweenList.push([{group:void 0,data:s}])}))}setTween(t="",r=[]){this.stop();let o=Gu(r),s=Ju(t);if(!o||!s)return Promise.reject(new Error("timeline setTween: props is wrong"));let n=new Set(r.map(l=>l?.getId?.())),i=this.tweenStore.filter(({id:l})=>n.has(l)),a=this.tweenList.findIndex(l=>{let[p]=l;return p.data.labelProps?.name===t});return a===-1?(Rc(t),Promise.reject(new Error(`asyncTimeline.setTween() label: ${t} not found`))):new Promise(l=>{let p=i.map(({tween:u})=>{let m=zs(this.tweenList,u,a);return new Promise((d,f)=>{u.set(m).then(()=>d({resolve:!0})).catch(()=>f())})});Promise.all(p).then(()=>{l({resolve:!0})}).catch(()=>{Pc()})})}rejectPromise(){this.currentReject&&(this.currentReject(c.ANIMATION_STOP_REJECT),this.currentReject=void 0)}play(){return new Promise((t,r)=>{this.fpsIsInLoading||(this.fpsIsInLoading=!0,c.useFps(()=>{if(this.fpsIsInLoading=!1,this.autoSet&&this.addSetBlocks(),this.freeMode){if(this.tweenList.length===0||this.addAsyncIsActive)return;if(this.delayIsRunning&&!this.actionAfterReject.active){this.startOnDelay=!0,this.actionAfterReject.fn=()=>this.play(),this.actionAfterReject.active=!0;return}this.startOnDelay=!1,this.stop(),this.isStopped=!1,this.isReverse&&this.revertTween(),this.sessionId++,c.useFrameIndex(()=>{this.currentReject=r,this.currentResolve=t,this.run()},1)}else{let o=()=>{this.stop(),this.isStopped=!1;let s=this.tweenStore.map(({tween:n})=>{let i=n.getInitialData();return new Promise((a,l)=>{n.set(i).then(()=>a({resolve:!0})).catch(()=>l())})});Promise.all(s).then(()=>{this.currentReject=r,this.currentResolve=t,this.run()}).catch(()=>{})};this.starterFunction.fn=()=>o(),this.starterFunction.active=!0,this.playReverse({forceYoYo:!0})}}))})}playFromLabel({isReverse:t=!1,label:r=null}){this.tweenList.length===0||this.addAsyncIsActive||(this.isReverse&&this.revertTween(),this.currentIndex=0,this.labelState.isReverse=t,this.labelState.active=!0,this.labelState.index=c.checkType(String,r)?this.tweenList.findIndex(o=>{let[s]=o;return s.data.labelProps?.name===r}):r,c.checkType(String,r)&&Uu(this.labelState.index,r),this.run())}playFrom(t){return new Promise((r,o)=>{this.fpsIsInLoading||(this.fpsIsInLoading=!0,c.useFps(()=>{this.fpsIsInLoading=!1,this.starterFunction.fn=()=>this.playFromLabel({isReverse:!1,label:t}),this.starterFunction.active=!0,this.playReverse({forceYoYo:!1,resolve:r,reject:o})}))})}playFromReverse(t){return new Promise((r,o)=>{this.fpsIsInLoading||(this.fpsIsInLoading=!0,c.useFps(()=>{this.fpsIsInLoading=!1,this.starterFunction.fn=()=>this.playFromLabel({isReverse:!0,label:t}),this.starterFunction.active=!0,this.playReverse({forceYoYo:!1,resolve:r,reject:o})}))})}playReverse({forceYoYo:t=!0,resolve:r=null,reject:o=null}={}){return new Promise((s,n)=>{let i=r||s,a=o||n;this.fpsIsInLoading||(this.fpsIsInLoading=!0,c.useFps(()=>{this.fpsIsInLoading=!1,this.autoSet&&this.addSetBlocks();let l=t;if(!(this.tweenList.length===0||this.addAsyncIsActive)){if(this.delayIsRunning&&!this.actionAfterReject.active){this.startOnDelay=!0,this.actionAfterReject.fn=()=>this.playReverse({forceYoYo:l}),this.actionAfterReject.active=!0;return}this.startOnDelay=!1,this.stop(),this.isStopped=!1,l&&(this.forceYoyo=!0),this.labelState.active=!0,this.labelState.index=this.tweenList.length,this.loopCounter--,this.sessionId++,c.useFrameIndex(()=>{this.currentResolve=i,this.currentReject=a,this.run()},1)}}))})}reverseNext(){this.isReverseNext=!0}stop({clearCache:t=!0}={}){this.isStopped=!0,this.currentIndex=0,this.loopCounter=1,this.rejectPromise(),this.isReverseNext=!1,this.disableLabel(),this.forceYoyo=!1,this.isInPause=!1,this.isInSuspension=!1,this.addAsyncIsActive=!1,this.timeOnPause=0,this.labelState.isReverse=!1,this.tweenStore.forEach(({tween:r})=>{r?.stop?.({clearCache:t})}),this.isReverse&&this.revertTween(),this.isReverse=!1,this.freeMode||this.resetAllTween()}pause(){this.isInPause=!0,this.timeOnPause=c.getTime(),this.currentTween.forEach(({tween:t})=>{t?.pause?.()})}resume(){this.isInPause&&(this.isInPause=!1,this.timeOnPause=0,this.resumeEachTween()),this.isInSuspension&&(this.isInSuspension=!1,this.timeOnPause=0,this.currentIndex<=this.tweenList.length-2?(this.currentIndex++,this.run()):this.currentIndex===this.tweenList.length-1&&(this.currentIndex=this.yoyo&&!this.isReverse?1:0,this.disableLabel(),this.yoyo&&this.revertTween(),this.loopCounter++,this.run()))}disableLabel(){this.labelState.active=!1,this.labelState.index=-1}resumeEachTween(){this.currentTween.forEach(({tween:t})=>{t?.resume?.()})}get(){return this.currentTween}isActive(){return!this.isStopped}isPaused(){return this.isInPause}isSuspended(){return this.isInSuspension}getDirection(){return this.isStopped?Se.NONE:this.isReverse?Se.BACKWARD:Se.FORWARD}onLoopEnd(t){this.callbackLoop.push({cb:t,id:this.id});let r=this.id;return()=>{this.callbackLoop=this.callbackLoop.filter(o=>o.id!==r)}}onComplete(t){this.callbackComplete.push({cb:t,id:this.id});let r=this.id;return this.id++,()=>{this.callbackComplete=this.callbackComplete.filter(o=>o.id!==r)}}destroy(){this.tweenStore.forEach(({tween:t})=>{t?.destroy?.()}),this.tweenList=[],this.currentTween=[],this.callbackComplete=[],this.callbackLoop=[],this.tweenStore=[],this.currentIndex=0,this.actionAfterReject={active:!1,fn:()=>{}}}};var _o=class{constructor(t={}){this.duration=$t(t?.duration),this.yoyo=Q(t?.yoyo,"syncTimeline: yoyo",!1),this.repeat=Rs(t?.repeat),this.sequencers=[],this.startTime=0,this.timeElapsed=0,this.currentTime=0,this.pauseTime=0,this.timeAtReverse=0,this.timeAtReverseBack=0,this.isReverse=!1,this.startReverse=!1,this.isPlayngReverse=!1,this.loopCounter=0,this.loopIteration=0,this.minLoopIteration=10,this.isStopped=!0,this.skipFirstRender=!1,this.completed=!1,this.fpsIsInLoading=!1,this.isInPause=!1,this.callbackId=0,this.callbackLoop=[],this.callbackComplete=[],this.callbackOnUpdate=[],this.currentResolve=void 0,this.currentReject=void 0}updateTime(t,r){if(this.isStopped||this.fpsIsInLoading)return;let o=!this.repeat||this.repeat>=2&&this.loopCounter===this.repeat-1?0:1e3/r/2;this.isInPause&&(this.pauseTime=t-this.startTime-this.timeElapsed-this.timeAtReverseBack),this.timeElapsed=Math.trunc(t-this.startTime-this.pauseTime-this.timeAtReverseBack);let s=this.isReverse?this.timeAtReverse-(this.timeElapsed-this.timeAtReverse):this.timeElapsed;if(this.isInPause||(this.currentTime=Ae(s,0,this.duration),this.skipFirstRender||(this.sequencers.forEach(i=>{i.draw({partial:this.currentTime,isLastDraw:!1,useFrame:!0,direction:this.getDirection()})}),this.callbackOnUpdate.forEach(({cb:i})=>{i({time:this.currentTime,direction:this.getDirection()})}))),this.skipFirstRender=!1,this.loopIteration++,s<=this.duration-o&&s>=0+o&&!this.isStopped){this.completed=!1,this.goToNextFrame();return}if(this.resetSequencerLastValue(),this.startReverse){this.isReverse=!0,this.timeAtReverse=0,this.timeAtReverseBack=0,this.startReverse=!1,this.goToNextFrame();return}let n=this.getDirection();if(c.useNextFrame(()=>{!this.fpsIsInLoading&&!this.completed&&this.loopIteration>this.minLoopIteration&&(this.completed=!0,this.loopCounter++,this.loopIteration=0,this.callbackLoop.forEach(({cb:i})=>i({direction:n,loop:this.loopCounter})))}),!this.repeat||this.loopCounter===this.repeat-1&&this.loopIteration>this.minLoopIteration){let i=this.currentTime;this.sequencers.forEach(a=>{a.draw({partial:i,isLastDraw:!0,useFrame:!0,direction:this.getDirection()})}),this.isStopped=!0,this.resetTime(),this.startTime=t,this.isReverse&&(this.isReverse=!1),this.callbackComplete.forEach(({cb:a})=>a()),this.currentResolve&&this.currentResolve();return}if(this.yoyo){this.reverse(),this.goToNextFrame();return}if(this.isPlayngReverse){this.resetTime(),this.startTime=t,this.isReverse||(this.isPlayngReverse=!this.isPlayngReverse),this.timeElapsed=this.duration,this.currentTime=this.duration,this.pauseTime=this.duration,this.goToNextFrame();return}this.resetTime(),this.startTime=t,this.isReverse&&(this.isPlayngReverse=!this.isPlayngReverse),this.goToNextFrame()}goToNextFrame(){c.useFrame(()=>{c.useNextTick(({time:t,fps:r})=>{this.fpsIsInLoading||this.updateTime(t,r)})})}resetTime(){this.timeElapsed=0,this.pauseTime=0,this.currentTime=0,this.timeAtReverse=0,this.timeAtReverseBack=0}getTimeFromLabel(t){let r=this.sequencers.reduce((o,s)=>s.getLabels().find(({name:a})=>a===t)||o,{name:"",time:0});return r||Ac(t),r.time}rejectPromise(){this.currentReject&&(this.currentReject(c.ANIMATION_STOP_REJECT),this.currentReject=void 0)}play(t={}){return new Promise((r,o)=>{let s=t?.useCurrent;if(!this.fpsIsInLoading&&(this.rejectPromise(),this.currentResolve=r,this.currentReject=o,!(!this.isStopped&&!this.isReverse&&s))){if(!this.isStopped&&this.isReverse&&s){this.reverse();return}this.playFromTime()}})}playFrom(t=0){return new Promise((r,o)=>{if(this.fpsIsInLoading)return;let n=c.checkType(Number,t)?t:this.getTimeFromLabel(t);this.rejectPromise(),this.currentResolve=r,this.currentReject=o,this.playFromTime(n)})}playFromTime(t=0){this.resetSequencerLastValue(),this.resetTime(),this.currentTime=t,this.timeAtReverseBack=-this.currentTime,this.isPlayngReverse=!1,this.loopIteration=0,this.fpsIsInLoading=!0,this.startAnimation(t)}playFromReverse(t){return new Promise((r,o)=>{if(this.fpsIsInLoading)return;let n=c.checkType(Number,t)?t:this.getTimeFromLabel(t);this.rejectPromise(),this.currentResolve=r,this.currentReject=o,this.playFromTimeReverse(n,!0)})}playReverse(t={}){return new Promise((r,o)=>{let s=t?.useCurrent;if(!this.fpsIsInLoading&&(this.rejectPromise(),this.currentResolve=r,this.currentReject=o,!(!this.isStopped&&this.isReverse&&s))){if(!this.isStopped&&!this.isReverse&&s){this.reverse();return}this.playFromTimeReverse(this.duration,!0)}})}playFromTimeReverse(t=0){this.resetSequencerLastValue(),this.timeElapsed=t,this.currentTime=t,this.pauseTime=t,this.timeAtReverse=0,this.timeAtReverseBack=0,this.startReverse=!0,this.isPlayngReverse=!0,this.skipFirstRender=!0,this.loopIteration=0,this.fpsIsInLoading=!0,this.startAnimation(t)}async startAnimation(t){if(this.repeat===0)return;let{averageFPS:r}=await c.useFps();zt("sequencer",r),this.isReverse=!1,this.sequencers.forEach(o=>{o.inzializeStagger(),o.disableStagger(),o.draw({partial:t,isLastDraw:!1,useFrame:!0,direction:this.getDirection()})}),c.useFrame(()=>{c.useNextTick(({time:o,fps:s})=>{this.startTime=o,this.fpsIsInLoading=!1,this.isStopped=!1,this.isInPause=!1,this.loopCounter=0,this.updateTime(o,s)})})}pause(){this.isStopped||this.isInPause||this.fpsIsInLoading||(this.isStopped=!1,this.isInPause=!0)}resume(){this.isStopped||!this.isInPause||this.fpsIsInLoading||(this.isStopped=!1,this.isInPause=!1)}reverse(){this.isStopped||this.isInPause||this.fpsIsInLoading||(this.resetSequencerLastValue(),this.isReverse=!this.isReverse,this.isReverse?this.timeAtReverse=this.timeElapsed:this.timeAtReverseBack+=this.timeElapsed-this.currentTime)}stop({clearCache:t=!0}={}){if(this.isStopped=!0,this.isInPause=!1,this.rejectPromise(),t){this.sequencers.forEach(r=>{r.cleanCachedId()});return}this.sequencers.forEach(r=>{r.draw({partial:this.currentTime,isLastDraw:!0,useFrame:!0,direction:this.getDirection()})})}add(t){return t.setStretchFactor(this.duration),this.sequencers.push(t),this}setDuration(t){return this.duration=t,this}resetSequencerLastValue(){this.sequencers.forEach(t=>t.resetLastValue())}isActive(){return!this.isStopped}isPaused(){return this.isInPause}getDirection(){return this.isStopped?Se.NONE:this.isReverse?Se.BACKWARD:Se.FORWARD}getTime(){return this.currentTime}onLoopEnd(t=()=>{}){this.callbackLoop.push({cb:t,id:this.callbackId});let r=this.callbackId;return this.callbackId++,()=>{this.callbackLoop=this.callbackLoop.filter(o=>o.id!==r)}}onComplete(t=()=>{}){this.callbackComplete.push({cb:t,id:this.callbackId});let r=this.callbackId;return this.callbackId++,()=>{this.callbackComplete=this.callbackComplete.filter(o=>o.id!==r)}}onUpdate(t=()=>{}){this.callbackOnUpdate.push({cb:t,id:this.callbackId});let r=this.callbackId;return this.callbackId++,()=>{this.callbackOnUpdate=this.callbackOnUpdate.filter(o=>o.id!==r)}}destroy(){this.stop(),this.sequencers.forEach(t=>t.destroy()),this.sequencers=[],this.callbackOnUpdate=[],this.callbackLoop=[],this.callbackComplete=[]}};var $e={createSyncTimeline(e){return new _o(e)},createAsyncTimeline(e){return new Ao(e)}};var qt={createParallax(e){return new Ut({...e,type:h.TYPE_PARALLAX})},createScrollTrigger(e){return new Ut({...e,type:h.TYPE_SCROLLTRIGGER})}};var Lp=({onMount:e,watch:t,html:r})=>(e(({element:o})=>{let s="",n=!1,i=[{xIn:0,xOut:0},{xIn:0,xOut:0}],a=()=>{let{xIn:u}=i[0],{xIn:m}=i[1],{xOut:d}=i[0],{xOut:f}=i[1];o.style.clipPath=`polygon(${d}% 0%, ${u}% 0%, ${m}% 100%, ${f}% 100%)`},l=re.createTween({data:{xIn:0,xOut:0},stagger:{each:8}});i.forEach(u=>{l.subscribe(({xIn:m,xOut:d})=>{u.xIn=m,u.xOut=d,a()})});let p=$e.createAsyncTimeline({repeat:1,autoSet:!0});return p.goTo(l,{xIn:100},{ease:"easeInOutCirc",duration:500}).add(()=>Ln({url:s})).goTo(l,{xOut:100},{ease:"easeInCubic",duration:500}),t("url",async u=>{n||(n=!0,s=u,await p.play(),n=!1)}),()=>{}}),r`<div class="c-page-transiotion"></div>`);var If=E({name:"page-transition",component:Lp,isolateOnMount:!0,isolateCreation:!0,exportState:["url"],state:{url:()=>({value:"",type:String,skipEqual:!1})}});function ne(){let e=navigator.userAgent,t=e.includes("Safari");return e.includes("Chrome")&&t&&(t=!1),t}function We(){let e=navigator.userAgent,t=e.includes("Firefox");return e.includes("Chrome")&&t&&(t=!1),t}var Fp=async({source:e})=>{let t=await fetch(e);return t.ok?{success:!0,data:await t.text()}:(console.warn(`${e} not found`),{success:!1,data:""})},Vp=async({source:e})=>{let t=await fetch(e);return t.ok?{success:!0,data:await t.json()}:(console.warn(`${e} not found`),{success:!1,data:""})};var Ef=({data:e,staticProps:t})=>e.map(r=>{let{component:o,props:s,content:n}=r;return g`
                <${o} ${t(s)}>
                    ${n??""}
                </${o}>
            `}).join(""),Dp=async({html:e,getState:t,setState:r,staticProps:o,bindProps:s,onMount:n})=>{let{source:i}=t(),{success:a,data:l}=await Vp({source:i});if(!a)return e`
            <section class="html-content">something went wrong</section>
        `;let{useMinHeight:p,useMaxWidth:u}=t(),m=p?"is-min-100":"",d=u?"is-max-width":"";return n(async()=>{r("contentIsLoaded",!0)}),e`
        <section class="html-content ${m} ${d}">
            <mob-loader
                ${s({bind:["contentIsLoaded"],props:({contentIsLoaded:f})=>({shouldRemove:f})})}
            ></mob-loader>
            ${Ef({data:l.data,staticProps:o})}
        </section>
    `};var kf=E({name:"html-content",component:Dp,exportState:["source","useMinHeight","useMaxWidth"],state:{source:()=>({value:"",type:String}),contentIsLoaded:()=>({value:!1,type:Boolean}),useMinHeight:()=>({value:!1,type:Boolean}),useMaxWidth:()=>({value:!1,type:Boolean})}});var $p=({html:e,getState:t})=>{let{tag:r,color:o,isBold:s}=t(),n=`is-${o}`;return e`<${r} class="mob-title ${n} ${s?"is-bold":""}">
        <mobjs-slot/>
    </${r}>`};var Rf=E({name:"mob-title",component:$p,exportState:["tag","color","isBold"],state:{tag:()=>({value:"h1",type:String}),color:()=>({value:"white",type:String,validate:e=>["white","green"].includes(e)}),isBold:()=>({value:!1,type:Boolean})}});var Wp=({html:e,getState:t})=>{let{style:r,color:o}=t(),s=`is-${o}`;return e`<p class="p p--${r} ${s}">
        <mobjs-slot />
    </p>`};var Pf=E({name:"mob-paragraph",component:Wp,exportState:["style","color"],state:{style:()=>({value:"medium",type:String,validate:e=>["small","medium","big"].includes(e),strict:!0}),color:()=>({value:"grey",type:String,validate:e=>["white","grey","green"].includes(e)})}});var Af=({items:e})=>e.map(t=>g` <li>${t}</li> `).join(""),jp=({html:e,getState:t})=>{let{style:r,color:o,items:s,dots:n}=t(),i=`is-${o}`;return e`<ul class="ul ul--${r} ${i} ${n?"":"hide-dots"}">
        ${Af({items:s})}
    </ul>`};var _f=E({name:"mob-list",component:jp,exportState:["style","color","items","dots"],state:{style:()=>({value:"medium",type:String,validate:e=>["small","medium","big"].includes(e),strict:!0}),dots:()=>({value:!0,type:Boolean}),color:()=>({value:"grey",type:String,validate:e=>["white","grey","green"].includes(e)}),items:()=>({value:[],type:Array})}});var lh=Wd(ah(),1);var Si=lh.default;var ch="[A-Za-z$_][0-9A-Za-z$_]*",Tg=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],xg=["true","false","null","undefined","NaN","Infinity"],uh=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],ph=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],hh=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],wg=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],Cg=[].concat(hh,uh,ph);function dh(e){let t=e.regex,r=(v,{after:k})=>{let R="</"+v[0].slice(1);return v.input.indexOf(R,k)!==-1},o=ch,s={begin:"<>",end:"</>"},n=/<[A-Za-z0-9\\._:-]+\s*\/>/,i={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(v,k)=>{let R=v[0].length+v.index,V=v.input[R];if(V==="<"||V===","){k.ignoreMatch();return}V===">"&&(r(v,{after:R})||k.ignoreMatch());let q,K=v.input.substring(R);if(q=K.match(/^\s*=/)){k.ignoreMatch();return}if((q=K.match(/^\s+extends\s+/))&&q.index===0){k.ignoreMatch();return}}},a={$pattern:ch,keyword:Tg,literal:xg,built_in:Cg,"variable.language":wg},l="[0-9](_?[0-9])*",p=`\\.(${l})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",m={className:"number",variants:[{begin:`(\\b(${u})((${p})|\\.)?|(${p}))[eE][+-]?(${l})\\b`},{begin:`\\b(${u})\\b((${p})\\b|\\.)?|(${p})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},d={className:"subst",begin:"\\$\\{",end:"\\}",keywords:a,contains:[]},f={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,d],subLanguage:"xml"}},x={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,d],subLanguage:"css"}},b={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,d],subLanguage:"graphql"}},S={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,d]},C={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},P=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,f,x,b,S,{match:/\$\d+/},m];d.contains=P.concat({begin:/\{/,end:/\}/,keywords:a,contains:["self"].concat(P)});let $=[].concat(C,d.contains),N=$.concat([{begin:/\(/,end:/\)/,keywords:a,contains:["self"].concat($)}]),I={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:N},D={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},H={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...uh,...ph]}},W={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},X={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[I],illegal:/%/},M={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function O(v){return t.concat("(?!",v.join("|"),")")}let G={match:t.concat(/\b/,O([...hh,"super","import"]),o,t.lookahead(/\(/)),className:"title.function",relevance:0},oe={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},j={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},I]},A="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",y={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(A)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[I]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:a,exports:{PARAMS_CONTAINS:N,CLASS_REFERENCE:H},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),W,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,f,x,b,S,C,{match:/\$\d+/},m,H,{className:"attr",begin:o+t.lookahead(":"),relevance:0},y,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[C,e.REGEXP_MODE,{className:"function",begin:A,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:N}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:s.begin,end:s.end},{match:n},{begin:i.begin,"on:begin":i.isTrulyOpeningTag,end:i.end}],subLanguage:"xml",contains:[{begin:i.begin,end:i.end,skip:!0,contains:["self"]}]}]},X,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[I,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},oe,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[I]},G,M,D,j,{match:/\$[(.]/}]}}Si.registerLanguage("javascript",dh);var mh=({html:e,onMount:t,getState:r})=>{let{source:o,isFull:s,hasBorder:n,hasOverflow:i}=r(),a=s?"is-full":"",l=n?"has-border":"",p=i?"has-overflow":"";return t(async({refs:u})=>{let{codeEl:m}=u,{success:d,data:f}=await Fp({source:o});if(!d){m.textContent="something went wrong";return}return m.textContent=f,Si.highlightElement(m,{language:"javascript"}),()=>{}}),e`<div class="snippet">
        <code class="${a} ${l}">
            <pre class="${a} ${p}" ref="codeEl">
Loading snippet ...
            </pre
            >
        </code>
    </div>`};var Ig=E({name:"mob-snippet",component:mh,exportState:["source","isFull","hasOverflow","hasBorder"],state:{source:()=>({value:"",type:String}),contentIsLoaded:()=>({value:!1,type:Boolean}),isFull:()=>({value:!1,type:Boolean}),hasOverflow:()=>({value:!0,type:Boolean}),hasBorder:()=>({value:!1,type:Boolean})}});function Eg({id:e,label:t}){return e&&e.length>0?`data-scroll=${e} data-label=${t}`:""}var fh=async({html:e,getState:t})=>{let{style:r,line:o,id:s,label:n}=t(),i=o?"spacer--line":"";return e`<div
        ${Eg({id:s,label:n})}
        class="spacer spacer--${r} ${i}"
    ></div>`};var kg=E({name:"mob-spacer",component:fh,exportState:["style","line","id","label"],state:{style:()=>({value:"medium",type:String,validate:e=>["small","medium","big"].includes(e),strict:!0}),line:()=>({value:!1,type:Boolean}),id:()=>({value:"",type:String}),label:()=>({value:"",type:String})}});var Rg=g`
    <div class="only-desktop">
        <h3>This content is available only on desktop</h3>
        <h4>Need page reload on a screen size up to 1024px</h4>
    </div>
`,gh=({element:e})=>{e.textContent="",!te.mq("min","desktop")&&(e.textContent="",e.insertAdjacentHTML("afterbegin",Rg))},bh=({html:e,onMount:t})=>(t(({element:r})=>{gh({element:r}),c.useResize(()=>{gh({element:r})})}),e` <div class="only-desktop-container" ref="container"></div> `);var Pg=E({name:"only-desktop",component:bh,state:{}});var yh=({onMount:e,html:t,watch:r,remove:o,getState:s})=>{let{position:n}=s();return e(({element:i})=>{let a=re.createTween({data:{opacity:1,scale:1},duration:500});return a.subscribe(({opacity:l,scale:p})=>{i.style.opacity=l,i.style.transform=`scale(${p})`}),r("shouldRemove",async l=>{l&&(await a.goTo({opacity:0,scale:.9}),o())}),()=>{a.destroy(),a=null}}),t`
        <div class="c-loader ${n}">
            <span class="c-loader__inner"></span>
        </div>
    `};var Ag=E({name:"mob-loader",component:yh,exportState:["position","shouldRemove"],state:{shouldRemove:()=>({value:!1,type:Boolean}),position:()=>({value:"center-viewport",type:String,validate:e=>["center-viewport","center-component"].includes(e)})}});var _g=({scrollY:e,element:t})=>{c.useNextTick(()=>{let r=e,o=document.documentElement.scrollHeight-window.innerHeight,s=Math.round(r/o*100);c.useNextFrame(()=>{t.style.setProperty("--delta",`${s}%`)})})},vh=({html:e,onMount:t})=>(t(({element:r})=>{if(te.mq("max","large"))return;r.style.setProperty("--delta","0");let o=c.useScroll(({scrollY:s})=>{c.useFrame(()=>{_g({scrollY:s,element:r})})});return()=>{o()}}),e` <div class="c-doc-scroll"></div> `);var Og=E({name:"doc-scroll",component:vh});var Sh=({html:e,delegateEvents:t})=>e`
        <div
            class="c-doc-top"
            ${t({click:()=>Pt.to(0,{duration:2e3})})}
        ></div>
    `;var Ng=E({name:"doc-top",component:Sh});function Mg({targets:e,delegateEvents:t,syncParent:r,staticProps:o,setState:s,bindProps:n}){return e.map((i,a)=>{let{label:l,scroll:p}=i.dataset;return g`<li>
                <scroll-to-button
                    ${t({click:()=>{let u=p==="start"?0:se(i).top-50;Pt.to(u),s("activeId",a)}})}
                    ${n({bind:["activeId"],props:({activeId:u})=>({active:u===a})})}
                    ${o({label:l})}
                    ${r}
                >
                </scroll-to-button>
            </li> `}).join("")}var Th=({html:e,onMount:t,delegateEvents:r,syncParent:o,staticProps:s,bindProps:n,setState:i})=>(t(({refs:a})=>{if(te.mq("max","large"))return;let{list:l}=a,p=document.querySelectorAll("[data-scroll]");l.insertAdjacentHTML("beforeend",Mg({targets:[...p],delegateEvents:r,syncParent:o,staticProps:s,bindProps:n,setState:i})),uo(l);let u=c.useMouseWheel(()=>{i("activeId",-1)});return()=>{u()}}),e` <div class="c-scroll-to"><ul ref="list"></ul></div> `);var Lg=E({name:"scroll-to",component:Th,exportState:["activeId"],state:{activeId:()=>({value:0,type:Number})}});var xh=({html:e,getState:t,onMount:r,watchSync:o})=>{let{label:s}=t();return r(({element:n})=>{o("active",i=>{n.classList.toggle("active",i)})}),e`
        <button type="button">
            <span> ${s} </span>
        </button>
    `};var Fg=E({name:"scroll-to-button",component:xh,exportState:["label","active"],state:{label:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean})}});var wh=[{label:"html",url:"mobJs_html"},{label:"onMount",url:"mobJs_onMount"},{label:"getState",url:"mobJs_getState"},{label:"setState",url:"mobJs_setState"},{label:"watch",url:"mobJs_watch"},{label:"watchSync",url:"mobJs_watchSync"},{label:"staticProps",url:"mobJs_staticProps"},{label:"bindProps",url:"mobJs_bindProps"},{label:"bindEvents",url:"mobJs_bindEvents"},{label:"delegateEvents",url:"mobJs_delegateEvents"},{label:"reactive list: (repeat)",url:"mobJs_repeat"},{label:"unBind",url:"mobJs_unBind"},{label:"emit",url:"mobJs_emit"},{label:"emitAsync",url:"mobJs_emitAsync"},{label:"computed",url:"mobJs_computed"},{label:"remove",url:"mobJs_remove"},{label:"removeDOM",url:"mobJs_removeDom"},{label:"getChildren",url:"mobJs_getChildren"},{label:"freezeProp",url:"mobJs_freezeProp"},{label:"unFreezeProp",url:"mobJs_unFreezeProp"},{label:"getParentId",url:"mobJs_getParentId"},{label:"watchParent",url:"mobJs_watchParent"},{label:"syncParent",url:"mobJs_syncParent"}];var Vg={mobjs:wh},Dg=({data:e,staticProps:t})=>e.map(r=>{let{label:o,url:s}=r;return g`<li>
                <links-mobjs-button
                    ${t({label:o,url:s})}
                ></links-mobjs-button>
            </li>`}).join(""),Ch=({html:e,staticProps:t,getState:r})=>{let{section:o}=r();return e`<div class="c-params-mobjs">
        <ul>
            ${Dg({staticProps:t,data:Vg?.[o]??[]})}
        </ul>
    </div>`};var Ih=({html:e,getState:t})=>{let{label:r,url:o}=t(),{activeRoute:s}=L.get();return e`<a href="./#${o}" class="${s===o?"current":""}">${r}</a>`};var $g=E({name:"links-mobjs",component:Ch,exportState:["section"],state:{section:()=>({value:"",type:String})}}),Wg=E({name:"links-mobjs-button",component:Ih,exportState:["label","url"],state:{label:()=>({value:"",type:String}),url:()=>({value:"",type:String})}});var Eh=({html:e})=>e`
        <footer class="l-footer">
            <div class="l-footer__container">
                <footer-nav></footer-nav>
                <mobjs-slot name="debug"></mobjs-slot>
            </div>
        </footer>
    `;var jg=E({name:"mob-footer",component:Eh});var F=c.createStore({closeAllAccordion:()=>{},refreshScroller:()=>{},openNavigation:()=>{},closeNavigation:()=>{},goToTop:()=>{},activeSection:()=>({value:"",type:String,skipEqual:!1}),navigationIsOpen:()=>({value:!1,type:Boolean})});var kh=({html:e,onMount:t,getState:r})=>{let{label:o,section:s}=r();return t(({element:n})=>{F.watch("activeSection",i=>{let a=i===s;console.log(a),n.classList.toggle("current",a)})}),e`
        <button type="button" class="footer-nav__button">${o}</button>
    `};var Bg=[{label:"about",url:"about",section:"about"},{label:"canvas 2d",url:"canvas_overview",section:"canvas"},{label:"mobCore",url:"mobCore_overview",section:"mobCore"},{label:"mobJs",url:"mobJs_overview",section:"mobJs"},{label:"mobMotion",url:"mobMotion_overview",section:"mobMotion"},{label:"plugin",url:"plugin_overview",section:"plugin"}];function zg({url:e}){let t=Ue("page-transition");Pe(t,"url",e)}var Hg=({delegateEvents:e,staticProps:t})=>Bg.map(({label:r,url:o,section:s})=>g`<li class="footer-nav__item">
                <footer-nav-button
                    ${e({click:()=>{zg({url:o})}})}
                    ${t({label:r,section:s})}
                ></footer-nav-button>
            </li> `).join(""),Rh=({html:e,delegateEvents:t,staticProps:r})=>te.mq("max","desktop")?e` <span></span> `:e`
        <ul class="footer-nav">
            ${Hg({delegateEvents:t,staticProps:r})}
        </ul>
    `;var Ug=E({name:"footer-nav",component:Rh}),qg=E({name:"footer-nav-button",component:kh,exportState:["label","section"],state:{label:()=>({value:"",type:String}),section:()=>({value:"",type:String})}});function Gg({navInfo:e}){c.useFrame(()=>{e.classList.add("open")})}function Jg({navInfo:e}){c.useFrame(()=>{e.classList.remove("open")})}function Yg(){let e=Ue("page-transition");Pe(e,"url","#home"),F.set("navigationIsOpen",!1),F.emit("closeNavigation"),F.emit("closeAllAccordion"),F.emit("goToTop")}var Ph=({html:e,onMount:t,delegateEvents:r})=>(t(({refs:o})=>{let{navInfo:s,title:n,beta:i}=o;return F.watch("openNavigation",()=>Gg({navInfo:s})),F.watch("closeNavigation",()=>Jg({navInfo:s})),L.watch("beforeRouteChange",a=>{n.classList.toggle("visible",a!=="home"),i.classList.toggle("visible",a!=="home")}),()=>{}}),e`
        <header class="l-header">
            <div class="l-header__container">
                <div class="l-header__grid">
                    <div class="l-header__toggle">
                        <mob-header-toggle></mob-header-toggle>
                    </div>
                    <button
                        type="button"
                        class="l-header__title"
                        ref="titleLink"
                        ${r({click:()=>{Yg()}})}
                    >
                        <div class="l-header__title-container">
                            <h3 ref="title"><span>Mob</span>Project</h3>
                            <h5 ref="beta">beta 0.0.1</h5>
                        </div>
                    </button>
                    <div class="l-header__utils">
                        <mob-header-nav></mob-header-nav>
                    </div>
                </div>
                <div class="l-header__navinfo" ref="navInfo">
                    <p class="p--small"></p>
                </div>
            </div>
        </header>
    `);var Ah=`<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>

`;var _h={},Oh={},Js=()=>_h,ye=()=>Oh,Nh=async()=>{_h=await fetch("./data/common.json").then(e=>e.json()).then(e=>e).catch(e=>console.warn("Something went wrong.",e)),Oh=await fetch("./data/legend.json").then(e=>e.json()).then(e=>e).catch(e=>console.warn("Something went wrong.",e))};var Mh={github:Ah},Kg=({event:e})=>{let t=e.target;console.log(t);let{url:r}=t.dataset,o=Ue("page-transition");Pe(o,"url",r);let{navigationIsOpen:s}=F.get();s&&(F.set("navigationIsOpen",!1),F.emit("closeNavigation"))};function Zg({delegateEvents:e}){let{header:t}=Js(),{links:r}=t;return r.map(o=>{let{svg:s,url:n,internal:i}=o;return g`<li class="l-header__sidenav__item">
                ${i?g`
                          <button
                              type="button"
                              data-url="${n}"
                              class="l-header__sidenav__link"
                              ${e({click:a=>{console.log("click"),Kg({event:a})}})}
                          >
                              ${Mh[s]}
                          </button>
                      `:g`
                          <a
                              href="${n}"
                              target="_blank"
                              class="l-header__sidenav__link"
                          >
                              ${Mh[s]}
                          </a>
                      `}
            </li>`}).join("")}var Lh=({html:e,delegateEvents:t})=>e`
        <ul class="l-header__sidenav">
            ${Zg({delegateEvents:t})}
        </ul>
    `;var Qg=()=>{let{navigationIsOpen:e}=F.get("navigationIsOpen");if(F.set("navigationIsOpen",t=>!t),e){F.emit("closeNavigation");return}F.emit("openNavigation")},Fh=({onMount:e,html:t,delegateEvents:r})=>(e(({element:o})=>{F.watch("closeNavigation",()=>{c.useFrame(()=>{o.classList.remove("is-open")})}),F.watch("openNavigation",()=>{c.useFrame(()=>{o.classList.add("is-open")})})}),t`
        <button
            class="hamburger hamburger--squeeze"
            type="button"
            ${r({click:()=>Qg()})}
        >
            <div class="hamburger-box">
                <div class="hamburger-inner"></div>
            </div>
        </button>
    `);var eb=E({name:"mob-header",component:Ph}),tb=E({name:"mob-header-nav",component:Lh}),rb=E({name:"mob-header-toggle",component:Fh});var Ti=0,Vh=({root:e})=>{let t=e.querySelector(".l-navcontainer__wrap"),r=e.querySelector(".l-navcontainer__scroll"),o=e.querySelector(".l-navcontainer__percent"),s=200,n=new Ht({screen:t,scroller:r,direction:"vertical",drag:!0,scopedEvent:!0,breakpoint:"tablet",onUpdate:({percent:i})=>{let{navigationIsOpen:a}=F.get();a&&(Ti=Number.parseInt(i)/100,o.style.transform=`translateZ(0) scaleX(${Ti})`)}});n.init(),F.watch("activeSection",i=>{let a=document.querySelector(`[data-sectionname='${i}']`);if(!a)return;let l=document.querySelector(".l-header"),p=ve(r),u=ve(l),m=100*a.offsetTop/(p-window.innerHeight+u),d=Math.min(m,100);n.move(d)}),F.watch("refreshScroller",()=>n.refresh()),F.watch("closeNavigation",()=>{o.style.transform="translateZ(0) scaleX(0)"}),F.watch("openNavigation",()=>{o.style.transform=`translateZ(0) scaleX(${Ti})`}),F.watch("goToTop",()=>{setTimeout(()=>{n.set(0),F.set("activeSection","no-section")},s)})};function ob({element:e,main:t}){c.useFrame(()=>{document.body.style.overflow="",e.classList.remove("active"),t.classList.remove("shift")})}function sb({element:e,main:t}){F.emit("refreshScroller"),c.useFrame(()=>{document.body.style.overflow="hidden",e.classList.add("active"),t.classList.add("shift")})}function nb({main:e,toTopBtn:t}){e.addEventListener("click",()=>{let{navigationIsOpen:r}=F.get();r&&(F.set("navigationIsOpen",!1),F.emit("closeNavigation"))}),t.addEventListener("click",()=>{F.emit("closeAllAccordion"),F.emit("goToTop");let{navigationIsOpen:r}=F.get();r||Pt.to(0)})}var Dh=({html:e,onMount:t})=>(t(({element:r,refs:o})=>{let s=document.querySelector("main.main"),n="",{toTopBtn:i,wrap:a}=o;return F.watch("openNavigation",()=>sb({element:r,main:s})),F.watch("closeNavigation",()=>ob({element:r,main:s})),c.useResize(()=>{let p=te.mq("max","desktop")?"desk":"mob";p!==n&&a.scrollTo(0,0),n=p}),nb({main:s,toTopBtn:i}),Vh({root:r}),()=>{}}),e`
        <div class="l-navcontainer">
            <div class="l-navcontainer__side">
                <div class="l-navcontainer__percent"></div>
                <button class="l-navcontainer__totop" ref="toTopBtn"></button>
            </div>
            <div class="l-navcontainer__wrap" ref="wrap">
                <div class="l-navcontainer__scroll">
                    <mob-navigation name="main_navigation"></mob-navigation>
                </div>
            </div>
        </div>
    `);function ib({data:e,staticProps:t,setState:r,bindProps:o,bindEvents:s}){return e.map((n,i)=>{let{label:a,url:l,children:p,section:u,sectioName:m,scrollToSection:d}=n;return u?g`
                    <mob-navigation-label
                        ${t({label:a,sectioName:m})}
                    ></mob-navigation-label>
                `:p?g`
                      <mob-navigation-submenu
                          ${t({headerButton:{label:a,url:l},children:p,callback:()=>r("currentAccordionId",i)})}
                          ${o({bind:["currentAccordionId"],props:({currentAccordionId:f})=>({isOpen:f===i})})}
                      >
                      </mob-navigation-submenu>
                  `:g`
                      <li class="l-navigation__item">
                          <mob-navigation-button
                              ${s({click:()=>{}})}
                              ${t({label:a,url:l,scrollToSection:d??"no-scroll"})}
                          ></mob-navigation-button>
                      </li>
                  `}).join("")}var $h=({html:e,staticProps:t,setState:r,bindProps:o,bindEvents:s})=>{let{navigation:n}=Js();return F.watch("closeAllAccordion",()=>{r("currentAccordionId",-1)}),e`
        <nav class="l-navigation">
            <ul class="l-navigation__list">
                ${ib({data:n,staticProps:t,setState:r,bindProps:o,bindEvents:s})}
            </ul>
        </nav>
    `};var Wh=({getState:e,html:t,onMount:r,watch:o,delegateEvents:s})=>{let{label:n,url:i,arrowClass:a,subMenuClass:l,fireRoute:p,callback:u,scrollToSection:m}=e();return r(({element:d})=>(o("isOpen",f=>{c.useFrame(()=>{d.classList.toggle("active",f)})}),L.watch("activeRoute",f=>{c.useFrame(()=>{let x=f===i;d.classList.toggle("current",x),x&&p&&(u(),F.set("activeSection",m))})}),()=>{})),t`
        <button
            type="button"
            class="l-navigation__link  ${a} ${l}"
            ${s({click:()=>{if(u(),!p)return;let d=Ue("page-transition");Pe(d,"url",i),F.set("navigationIsOpen",!1),F.emit("closeNavigation")}})}
        >
            ${n}
        </button>
    `};var jh=({getState:e,html:t})=>{let{label:r,sectioName:o}=e();return t`
        <div class="l-navigation__label" data-sectionname="${o}">
            ${r}
        </div>
    `};function ab({children:e,staticProps:t,callback:r}){return e.map(o=>{let{label:s,url:n,scrollToSection:i}=o;return g`
                <li class="l-navigation__submenu__item">
                    <mob-navigation-button
                        ${t({callback:r,label:s,url:n,subMenuClass:"l-navigation__link--submenu",scrollToSection:i})}
                    ></mob-navigation-button>
                </li>
            `}).join("")}var Bh=({onMount:e,html:t,getState:r,setState:o,staticProps:s,bindProps:n,watch:i})=>{let{children:a,headerButton:l,callback:p}=r(),{label:u,url:m}=l;return e(({refs:d})=>{let{content:f}=d;return Co.subscribe(f),Co.reset(f),i("isOpen",async x=>{if(await Co[x?"down":"up"](f),F.emit("refreshScroller"),!x){let S=Ue("main_navigation");Pe(S,"currentAccordionId",-1,!1)}}),()=>{}}),t`
        <li class="l-navigation__item has-child">
            <mob-navigation-button
                ${s({label:u,url:m,arrowClass:"l-navigation__link--arrow",fireRoute:!1,callback:()=>{o("isOpen",f=>!f);let{isOpen:d}=r("isOpen");d&&p()}})}
                ${n({bind:["isOpen"],props:({isOpen:d})=>({isOpen:d})})}
            ></mob-navigation-button>
            <ul class="l-navigation__submenu" ref="content">
                ${ab({children:a,staticProps:s,callback:p})}
            </ul>
        </li>
    `};var lb=E({name:"mob-navigation-container",component:Dh,isolateOnMount:!0,isolateCreation:!0}),cb=E({name:"mob-navigation",component:$h,exportState:["currentAccordionId"],state:{currentAccordionId:()=>({value:-1,type:Number,skipEqual:!1})}}),ub=E({name:"mob-navigation-submenu",component:Bh,isolateOnMount:!0,isolateCreation:!0,exportState:["children","headerButton","isOpen","callback"],state:{callback:()=>({value:()=>{},type:Function}),headerButton:()=>({value:{},type:"Any"}),children:()=>({value:[],type:Array}),isOpen:()=>({value:!1,type:Boolean})}}),pb=E({name:"mob-navigation-button",type:"button",component:Wh,exportState:["label","url","arrowClass","subMenuClass","fireRoute","callback","isOpen","scrollToSection"],state:{label:()=>({value:"",type:String}),url:()=>({value:"",type:String}),scrollToSection:()=>({value:"",type:String}),arrowClass:()=>({value:"",type:String}),subMenuClass:()=>({value:"",type:String}),fireRoute:()=>({value:!0,type:Boolean}),callback:()=>({value:()=>{},type:Function}),isOpen:()=>({value:!1,type:Boolean})}}),hb=E({name:"mob-navigation-label",component:jh,exportState:["label","sectioName"],state:{label:()=>({value:"",type:String}),sectioName:()=>({value:"",type:String})}});var zh=({html:e,onMount:t})=>(t(({refs:r})=>{window.scrollTo(0,0);let{side:o}=r;o.classList.add("active")}),e`
        <div class="c-doc-container">
            <div class="c-doc-container__content">
                <mobjs-slot name="docs"></mobjs-slot>
            </div>
            <div class="c-doc-container__side" ref="side">
                <doc-scroll></doc-scroll>
                <doc-top></doc-top>
                <mobjs-slot name="section-title-small"></mobjs-slot>
                <mobjs-slot name="section-title"></mobjs-slot>
                <mobjs-slot name="section-links"></mobjs-slot>
            </div>
        </div>
    `);var db=E({name:"doc-container",component:zh});var Hh=({html:e})=>e`
        <div class="c-doc-title">
            <h2><mobjs-slot /></h2>
        </div>
    `;var mb=E({name:"doc-title",component:Hh,state:{}});var Uh=({html:e})=>e`
        <div class="c-doc-title-small">
            <mobjs-slot />
        </div>
    `;var fb=E({name:"doc-title-small",component:Uh,state:{}});var je=({disableOffcanvas:e})=>{let t="OffscreenCanvas"in window&&!e;return{useOffscreen:t,context:t?"bitmaprenderer":"2d"}},Be=({useOffscreen:e,canvas:t})=>{let r=e?new OffscreenCanvas(t.width,t.height):null,o=e?r.getContext("2d"):null;return{offscreen:r,offScreenCtx:o}},ze=({useOffscreen:e,offscreen:t,ctx:r})=>{if(e){let o=t.transferToImageBitmap();r.transferFromImageBitmap(o)}},bt=e=>"roundRect"in e,qh=(e,t,r,o,s,n)=>{o<2*n&&(n=o/2),s<2*n&&(n=s/2),e.beginPath(),e.moveTo(t+n,r),e.arcTo(t+o,r,t+o,r+s,n),e.arcTo(t+o,r+s,t,r+s,n),e.arcTo(t,r+s,t,r,n),e.arcTo(t,r,t+o,r,n),e.closePath()},Kr=({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:s,gutter:n})=>[...new Array(t*r+t).keys()].reduce(i=>{let{row:a,col:l,items:p}=i,u=l<r?l+1:0,m=u===0?a+1:a,d=(o+n)*u,f=(s+n)*m;return{row:m,col:u,items:[...p,{width:o,height:s,x:d,y:f,centerX:d+o/2,centerY:f+s/2,offsetXCenter:ur({canvasWidth:e.width,width:o,gutter:n,numberOfColumn:r}),offsetYCenter:pr({canvasHeight:e.height,height:s,gutter:n,numberOfRow:t}),gutter:n,numberOfColumn:r}]}},{row:0,col:-1,items:[]}),ur=({canvasWidth:e,width:t,gutter:r,numberOfColumn:o})=>e/2-(t+r)*o/2-t/2,pr=({canvasHeight:e,height:t,gutter:r,numberOfRow:o})=>e/2-(t+r)*(o+1)/2-t/2;var Gh=({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:s,gutter:n,fill:i,disableOffcanvas:a,stagger:l,reorder:p})=>{let{useOffscreen:u,context:m}=je({disableOffcanvas:a}),d=!0,f=[],x=[],b={},S={},w=e.getContext(m,{alpha:!1}),C="#000",P="#fff",{activeRoute:$}=L.get(),{offscreen:N,offScreenCtx:I}=Be({useOffscreen:u,canvas:e});e.width=e.clientWidth,e.height=e.clientHeight,f=Kr({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:s,gutter:n}).items,x=p?f.map((O,G)=>({...O,scale:1,rotate:0,hasFill:i.includes(G)})).sort(O=>O.hasFill?-1:1).reverse():f.map((O,G)=>{let oe=i.includes(G);return{...O,scale:1,rotate:0,hasFill:oe}}),b=re.createTween({ease:"easeInOutQuad",stagger:l,data:{scale:1,rotate:0}}),x.forEach(O=>{b.subscribeCache(O,({scale:G,rotate:oe})=>{O.rotate=oe,O.scale=G})});let D=()=>{if(!w)return;u&&(N.width=e.width,N.height=e.height);let O=u?I:w;O.fillStyle="#1a1b26",O.fillRect(0,0,e.width,e.height),x.forEach(({x:G,y:oe,centerX:j,centerY:A,width:y,height:v,rotate:k,scale:R,hasFill:V,offsetXCenter:q,offsetYCenter:K})=>{let Ce=Math.PI/180*k,ie=Math.cos(Ce)*R,he=Math.sin(Ce)*R;O.setTransform(ie,he,-he,ie,Math.round(j+q),Math.round(A+K)),O.beginPath(),O.rect(Math.round(-j+G),Math.round(-A+oe),y,v),O.fillStyle=V?P:C,O.fill(),O.setTransform(1,0,0,1,0,0)}),ze({useOffscreen:u,offscreen:N,ctx:w})};S=$e.createAsyncTimeline({repeat:-1,yoyo:!0}).label({name:"label1"}).goTo(b,{scale:1.5,rotate:90},{duration:1e3}).goTo(b,{scale:.5},{duration:500}).goTo(b,{rotate:180,scale:1.2},{duration:500}).goTo(b,{scale:1.3},{duration:500}).goTo(b,{scale:1},{duration:1200}),S.onLoopEnd(({direction:O,loop:G})=>{console.log(`loop end: ${O}, ${G}`)}),S.play();let H=()=>{D(),d&&c.useNextFrame(()=>H())};c.useFrame(({time:O})=>{H({time:O})});let W=c.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,x.forEach(O=>{let{width:G,height:oe,gutter:j,numberOfColumn:A}=O;O.offsetXCenter=ur({canvasWidth:e.width,width:G,gutter:j,numberOfColumn:A}),O.offsetYCenter=pr({canvasHeight:e.height,height:oe,gutter:j,numberOfRow:t})}),c.useFrame(()=>D())}),X=F.watch("openNavigation",()=>{S?.stop(),d=!1}),M=F.watch("closeNavigation",()=>setTimeout(async()=>{d=!0;let{activeRoute:O}=L.get();O===$&&(S?.play(),c.useFrame(()=>H()))},500));return()=>{b.destroy(),S.destroy(),W(),M(),X(),b=null,S=null,w=null,N=null,I=null,f=[],x=[],d=!1}};var Jh=({onMount:e,html:t,getState:r,staticProps:o})=>{e(({refs:i})=>{if(te.mq("max","desktop"))return;let{canvas:a}=i,l=Gh({canvas:a,...r()});return()=>{l()}});let{animatedPatternN0:s}=ye(),{source:n}=s;return t`
        <div>
            <only-desktop></only-desktop>
            <code-button
                ${o({drawers:[{label:"description",source:n.description},{label:"definition",source:n.definition},{label:"component",source:n.component},{label:"animation",source:n.animation}],style:"legend"})}
            >
            </code-button>
            <div class="c-canvas">
                <div class="c-canvas__wrap">
                    <canvas ref="canvas"></canvas>
                </div>
            </div>
        </div>
    `};var gb=E({name:"animatedpattern-n0",component:Jh,exportState:["numberOfRow","numberOfColumn","cellWidth","cellHeight","gutter","fill","stagger","reorder","disableOffcanvas"],state:{numberOfRow:()=>({value:10,type:Number}),numberOfColumn:()=>({value:10,type:Number}),cellWidth:()=>({value:65,type:Number}),cellHeight:()=>({value:65,type:Number}),gutter:()=>({value:1,type:Number}),fill:()=>({value:[16,27,38,49,60,71,82,93],type:Array}),stagger:()=>({value:{each:5,grid:{col:11,row:11,direction:"row"},waitComplete:!1},type:"any"}),reorder:()=>({value:!0,type:Boolean}),disableOffcanvas:!!(We()||ne())}});var Yh=({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:s,gutter:n,fill:i,disableOffcanvas:a})=>{let{useOffscreen:l,context:p}=je({disableOffcanvas:a}),u=!0,m=[],d=[],f={},x={},b={},{top:S,left:w}=se(e),C=e.getContext(p,{alpha:!1}),P="#000",$="#fff",{activeRoute:N}=L.get(),{offscreen:I,offScreenCtx:D}=Be({useOffscreen:l,canvas:e});e.width=e.clientWidth,e.height=e.clientHeight,m=Kr({canvas:e,numberOfRow:t,numberOfColumn:r,cellWidth:o,cellHeight:s,gutter:n}).items,d=m.map((A,y)=>({...A,scale:0,mouseX:0,mouseY:0,hasFill:i.includes(y)})).sort(A=>A.hasFill?-1:1),f=re.createLerp({data:{mouseX:0,mouseY:0}}),d.forEach(A=>{f.subscribeCache(A,({mouseX:y,mouseY:v})=>{A.mouseX=y,A.mouseY=v})}),x=re.createTween({ease:"easeInOutSine",stagger:{each:5,from:"center",waitComplete:!1},data:{scale:0}}),d.forEach(A=>{x.subscribeCache(A,({scale:y})=>{A.scale=y})});let H=()=>{if(!C)return;l&&(I.width=e.width,I.height=e.height);let A=l?D:C;A.fillStyle="#1a1b26",A.fillRect(0,0,e.width,e.height),d.forEach(({x:y,y:v,centerX:k,centerY:R,width:V,height:q,mouseX:K,mouseY:Ce,scale:ie,hasFill:he,offsetXCenter:_e,offsetYCenter:Me})=>{let Oe=K-(e.width-(V+n)*r)/2,qe=Ce-(e.height-(q+n)*t)/2,Ge=(y-Oe)/250,yt=(v-qe)/250,vt=Math.sqrt(Math.pow(Math.abs(Ge),2)+Math.pow(Math.abs(yt),2)),Jt=Ae(Math.abs(vt),0,2),Qr=0,He=Math.cos(Qr)*(Jt+ie),Mo=Math.sin(Qr)*(Jt+ie);A.setTransform(He,Mo,-Mo,He,Math.round(k+_e),Math.round(R+Me)),A.beginPath(),A.rect(Math.round(-k+y),Math.round(-R+v),V,q),A.fillStyle=he?$:P,A.fill(),A.setTransform(1,0,0,1,0,0)}),ze({useOffscreen:l,offscreen:I,ctx:C})};b=$e.createAsyncTimeline({repeat:-1,yoyo:!0}).goTo(x,{scale:.3},{duration:1e3}),b.play();let W=({x:A,y})=>{f.goTo({mouseX:A-w,mouseY:y-S})},X=c.useMouseMove(({client:A})=>{let{x:y,y:v}=A;W({x:y,y:v})}),M=c.useTouchMove(({client:A})=>{let{x:y,y:v}=A;W({x:y,y:v})}),O=()=>{H(),u&&c.useNextFrame(()=>O())};c.useFrame(({time:A})=>{O({time:A})});let G=c.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,S=se(e).top,w=se(e).left,d.forEach(A=>{let{width:y,height:v,gutter:k,numberOfColumn:R}=A;A.offsetXCenter=ur({canvasWidth:e.width,width:y,gutter:k,numberOfColumn:R}),A.offsetYCenter=pr({canvasHeight:e.height,height:v,gutter:k,numberOfRow:t})}),c.useFrame(()=>H())}),oe=F.watch("openNavigation",()=>{b?.stop(),u=!1}),j=F.watch("closeNavigation",()=>setTimeout(async()=>{u=!0;let{activeRoute:A}=L.get();A===N&&(b?.play(),c.useFrame(()=>O()))},500));return()=>{x.destroy(),b.destroy(),f.destroy(),G(),X(),M(),j(),oe(),x=null,b=null,f=null,C=null,I=null,D=null,m=[],d=[],u=!1}};var Xh=({onMount:e,html:t,getState:r,staticProps:o})=>{e(({refs:i})=>{if(te.mq("max","desktop"))return;let{canvas:a}=i,l=Yh({canvas:a,...r()});return()=>{l()}});let{animatedPatternN1:s}=ye(),{source:n}=s;return t`
        <div>
            <only-desktop></only-desktop>
            <code-button
                ${o({drawers:[{label:"description",source:n.description},{label:"definition",source:n.definition},{label:"component",source:n.component},{label:"animation",source:n.animation}],style:"legend"})}
            >
            </code-button>
            <div class="c-canvas">
                <div class="c-canvas__wrap">
                    <canvas ref="canvas"></canvas>
                </div>
            </div>
        </div>
    `};var bb=E({name:"animatedpattern-n1",component:Xh,isolateCreation:!0,isolateOnMount:!0,exportState:["numberOfRow","numberOfColumn","cellWidth","cellHeight","gutter","fill","disableOffcanvas"],state:{numberOfRow:7,numberOfColumn:15,cellWidth:70,cellHeight:70,gutter:10,fill:[21,22,23,24,25,25,26,37,42,53,58,69,74,85,86,87,88,89,90,44,60,65,66],disableOffcanvas:!!(We()||ne())}});function yb({width:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}function vb({height:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}var Kh=({canvas:e,amountOfPath:t,width:r,height:o,fill:s,stroke:n,opacity:i,spacerY:a,intialRotation:l,perpetualRatio:p,mouseMoveRatio:u,disableOffcanvas:m})=>{let{useOffscreen:d,context:f}=je({disableOffcanvas:m}),x=!0,b=e.getContext(f,{alpha:!1}),S=[],w=[],C={},{left:P}=se(e),{activeRoute:$}=L.get(),{offscreen:N,offScreenCtx:I}=Be({useOffscreen:d,canvas:e}),D=d?I:b,H=bt(D)&&!ne();D=null,e.width=e.clientWidth,e.height=e.clientHeight,S=[...new Array(t).keys()].map((y,v)=>{let k=v,R=k<t/2?t-k:k,V=R-(t-R);return{width:Math.floor(yb({width:r,relativeIndex:V,amountOfPath:t})),height:Math.floor(vb({height:o,relativeIndex:V,amountOfPath:t})),fill:s,stroke:n,opacity:V*i,rotate:0,y:0,relativeIndex:V,index:v}}),w=S.splice(0,S.length/2).concat(S.reverse()),C=re.createSpring({data:{rotate:0,y:0},stagger:{each:5,from:"center"}}),[...w].forEach(y=>{C.subscribeCache(y,({rotate:v})=>{y.rotate=v})});let W=({time:y=0})=>{if(!b)return;d&&(N.width=e.width,N.height=e.height);let v=d?I:b,k=e.width/2,R=e.height/2;v.fillStyle="#1a1b26",v.fillRect(0,0,e.width,e.height),w.forEach(({width:V,height:q,opacity:K,rotate:Ce,relativeIndex:ie,index:he})=>{let _e=Math.sin(y/1e3)*p*ie,Me=he<t/2?_e+15*ie/2:-_e-15*ie/2,Oe=he<t/2?-1:1,qe=1,Ge=Math.PI/180*(Ce-l),yt=Math.cos(Ge)*qe,vt=Math.sin(Ge)*qe;v.setTransform(yt,vt,-vt,yt,k,R+q/2),H?(v.beginPath(),v.roundRect(-(V*Oe)/2,-q/2+Me+a(he<t/2),V,q,[200,0])):(v.beginPath(),v.rect(-(V*Oe)/2,-q/2+Me+a(he<t/2),V,q)),v.strokeStyle=`rgba(255, 255, 255, ${K})`,v.fillStyle=`rgba(26, 27, 38, ${K})`,v.stroke(),v.fill(),v.setTransform(1,0,0,1,0,0)}),ze({useOffscreen:d,offscreen:N,ctx:b})},X=({time:y=0})=>{W({time:y}),x&&c.useNextFrame(({time:v})=>X({time:v}))};c.useFrame(({time:y})=>{X({time:y})});let M=c.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,P=se(e).left,c.useFrame(({time:y})=>{W({time:y})})}),O=({x:y})=>{let v=y-e.width/2-P;C.goTo({rotate:v/u})},G=c.useMouseMove(({client:y})=>{let{x:v}=y;O({x:v})}),oe=c.useTouchMove(({client:y})=>{let{x:v}=y;O({x:v})}),j=F.watch("openNavigation",()=>{x=!1}),A=F.watch("closeNavigation",()=>{setTimeout(()=>{x=!0;let{activeRoute:y}=L.get();y===$&&c.useFrame(({time:v})=>X({time:v}))},500)});return()=>{C.destroy(),M(),G(),oe(),A(),j(),b=null,N=null,I=null,C=null,w=[],S=[],x=!1}};var Zh=({onMount:e,html:t,getState:r,staticProps:o})=>{e(({refs:a})=>{if(te.mq("max","desktop"))return;let{canvas:l}=a,p=Kh({canvas:l,...r()});return()=>{p()}});let{caterpillarN0:s}=ye(),{source:n}=s,i=ne()?"c-canvas__wrap--wrapped":"";return t`
        <div>
            <only-desktop></only-desktop>
            <code-button
                ${o({drawers:[{label:"description",source:n.description},{label:"definition",source:n.definition},{label:"component",source:n.component},{label:"animation",source:n.animation}],style:"legend"})}
            >
            </code-button>
            <div class="c-canvas">
                <div class="c-canvas__wrap ${i}">
                    <canvas ref="canvas"></canvas>
                </div>
            </div>
        </div>
    `};var Sb=E({name:"caterpillar-n0",component:Zh,isolateOnMount:!0,isolateCreation:!0,exportState:["amountOfPath","width","height","radius","fill","stroke","opacity","spacerY","intialRotation","perpetualRatio","mouseMoveRatio","disableOffcanvas"],state:{amountOfPath:17,width:40,height:40,radius:0,fill:"",stroke:"#fff",opacity:.05,spacerY:e=>e?300:-400,intialRotation:33,perpetualRatio:6,mouseMoveRatio:10,disableOffcanvas:!!(We()||ne())}});var Qh=({canvas:e,numItems:t,width:r,height:o,fill:s,opacity:n,radius:i,rotationDuration:a,rotationEach:l,centerEach:p,disableOffcanvas:u})=>{let{useOffscreen:m,context:d}=je({disableOffcanvas:u}),f=!0,x=e.getContext(d,{alpha:!1}),b=[],S={},w={},C={},{top:P,left:$}=se(e),{activeRoute:N}=L.get(),{offscreen:I,offScreenCtx:D}=Be({useOffscreen:m,canvas:e}),H=m?D:x,W=bt(H)&&!ne();H=null,e.width=e.clientWidth,e.height=e.clientHeight,b=[...new Array(t).keys()].map((v,k)=>{let R=k>=t/2?t/2+(t/2-k):k,V=s.includes(k)?1:R*n;return{width:R*r,height:R*o,x:0,y:0,hasFill:s.includes(k),opacity:V,radius:i,rotate:0,relativeIndex:R}}),S=re.createTween({data:{rotate:0},stagger:{each:l,from:"center"},ease:"easeLinear",relative:!0}),[...b].forEach(v=>{S.subscribeCache(v,({rotate:k})=>{v.rotate=k})}),w=re.createSpring({data:{x:0,y:0},stagger:{each:p,from:"end"}}),[...b].forEach(v=>{w.subscribeCache(v,({x:k,y:R})=>{v.x=k,v.y=R})});let X=()=>{if(!x)return;m&&(I.width=e.width,I.height=e.height);let v=m?D:x;v.fillStyle="#1a1b26",v.fillRect(0,0,e.width,e.height),b.forEach(({width:k,height:R,x:V,y:q,opacity:K,rotate:Ce,hasFill:ie},he)=>{let _e=b.length-he,Me=e.width/2,Oe=e.height/2,qe=1,Ge=Math.PI/180*Ce,yt=Math.cos(Ge)*qe,vt=Math.sin(Ge)*qe;v.setTransform(yt,vt,-vt,yt,Me+V+_e*V/20,Oe+q+_e*q/20),W?(v.beginPath(),v.roundRect(Number.parseInt(-k/2),Number.parseInt(-R/2),k,R,[200,0])):(v.beginPath(),v.rect(Number.parseInt(-k/2),Number.parseInt(-R/2),k,R)),ie?v.fillStyle="rgba(255, 255, 255, 1)":(v.fillStyle=`rgba(26, 27, 38, ${K})`,v.strokeStyle=`rgba(255, 255, 255, ${K})`,v.stroke()),v.fill(),v.setTransform(1,0,0,1,0,0)}),ze({useOffscreen:m,offscreen:I,ctx:x})};C=$e.createAsyncTimeline({repeat:-1,yoyo:!1}),C.goTo(S,{rotate:360},{duration:a}),C.play();let M=()=>{X(),f&&c.useNextFrame(()=>M())};c.useFrame(()=>M());let O=c.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,P=se(e).top,$=se(e).left,X()}),G=({x:v,y:k})=>{let R=window.innerWidth,V=window.innerHeight,q=v-e.width/2-$,K=k-e.height/2-P;w.goTo({x:Ae(q,-R/2+400+$,R/2-400-$),y:Ae(K,-V/2+200+P,V/2-200-P)})},oe=c.useMouseMove(({client:v})=>{let{x:k,y:R}=v;G({x:k,y:R})}),j=c.useTouchMove(({client:v})=>{let{x:k,y:R}=v;G({x:k,y:R})}),A=F.watch("openNavigation",()=>{f=!1,C?.pause()}),y=F.watch("closeNavigation",()=>setTimeout(()=>{f=!0;let{activeRoute:v}=L.get();v===N&&(C?.resume(),c.useFrame(()=>M()))},500));return()=>{S.destroy(),w.destroy(),C.destroy(),O(),oe(),j(),A(),y(),S=null,w=null,C=null,x=null,I=null,D=null,b=[],f=!1}};var ed=({onMount:e,html:t,getState:r,staticProps:o})=>{e(({refs:a})=>{if(te.mq("max","desktop"))return;let{canvas:l}=a,p=Qh({canvas:l,...r()});return()=>{p()}});let{caterpillarN1:s}=ye(),{source:n}=s,i=ne()?"c-canvas__wrap--wrapped":"";return t`
        <div>
            <only-desktop></only-desktop>
            <code-button
                ${o({drawers:[{label:"description",source:n.description},{label:"definition",source:n.definition},{label:"component",source:n.component},{label:"animation",source:n.animation}],style:"legend"})}
            >
            </code-button>
            <div class="c-canvas">
                <div class="c-canvas__wrap ${i}">
                    <canvas ref="canvas"></canvas>
                </div>
            </div>
        </div>
    `};var Tb=E({name:"caterpillar-n1",component:ed,isolateCreation:!0,isolateOnMount:!0,exportState:["numItems","width","height","fill","opacity","radius","rotationEach","centerEach","rotationDuration","disableOffcanvas"],state:{numItems:20,width:40,height:40,fill:[14],opacity:.05,radius:0,rotationEach:15,centerEach:3,rotationDuration:5e3,disableOffcanvas:!!(We()||ne())}});var xi=({value:e,direction:t,isForced:r})=>{r||console.log(`current: ${e}, direction: ${t}`)},td=({canvas:e,numItems:t,width:r,height:o,radius:s,fill:n,opacity:i,xAmplitude:a,yAmplitude:l,duration:p,friction:u,rotationDefault:m,disableOffcanvas:d})=>{let{useOffscreen:f,context:x}=je({disableOffcanvas:d}),b=!0,S=e.getContext(x,{alpha:!1}),w=[],C=m,{activeRoute:P}=L.get(),{offscreen:$,offScreenCtx:N}=Be({useOffscreen:f,canvas:e}),I=f?N:S,D=bt(I)&&!ne();I=null,w=[...new Array(t).keys()].map((j,A)=>{let y=A>=t/2?t/2+(t/2-A):A,v=r+r/3*y,k=o+o/3*y,R=n.includes(A)?1:(t-A)*i;return{width:v,height:k,x:0,y:0,hasFill:n.includes(A),opacity:R,radius:s,rotate:0}}),e.width=e.clientWidth,e.height=e.clientHeight;let H=re.createSequencer({stagger:{each:6},data:{x:p/4,rotate:0},duration:p}).goTo({x:p+p/4},{start:0,end:p,ease:"easeLinear"}).goTo({rotate:()=>-C},{start:0,end:5,ease:"easeInOutBack"}).goTo({rotate:0},{start:5,end:p,ease:"easeInOutBack"}).label("mylabel",2).add(({isForced:j,direction:A})=>{xi({isForced:j,direction:A,value:1})},1).add(({isForced:j,direction:A})=>{xi({isForced:j,direction:A,value:5})},5).add(({isForced:j,direction:A})=>{xi({isForced:j,direction:A,value:9})},9);w.forEach(j=>{H.subscribeCache(j,({x:A,rotate:y})=>{let v=A/u,k=2/(3-Math.cos(2*v)),R=k*Math.cos(v)*a,V=k*Math.sin(2*v)/2*l;j.x=R,j.y=V,j.rotate=y})});let W=$e.createSyncTimeline({repeat:-1,yoyo:!1,duration:4e3}).add(H);W.onLoopEnd(({loop:j,direction:A})=>{console.log(`loop end: ${j} , ${A}`)});let X=()=>{if(!S)return;f&&($.width=e.width,$.height=e.height);let j=f?N:S;j.fillStyle="#1a1b26",j.fillRect(0,0,e.width,e.height),w.forEach(({width:A,height:y,x:v,y:k,radius:R,rotate:V,hasFill:q,opacity:K})=>{let Ce=e.width/2,ie=e.height/2,he=1,_e=Math.PI/180*V,Me=Math.cos(_e)*he,Oe=Math.sin(_e)*he;j.setTransform(Me,Oe,-Oe,Me,Ce+v,ie+k),D?(j.beginPath(),j.roundRect(Number.parseInt(-A/2),Number.parseInt(-y/2),A,y,[150,0])):(j.beginPath(),j.rect(Number.parseInt(-A/2),Number.parseInt(-y/2),A,y,R)),q?j.fillStyle="rgba(255, 255, 255, 1)":(j.fillStyle=`rgba(26, 27, 38, ${K})`,j.strokeStyle=`rgba(255, 255, 255, ${K})`,j.stroke()),j.fill(),j.setTransform(1,0,0,1,0,0)}),ze({useOffscreen:f,offscreen:$,ctx:S})},M=()=>{X(),b&&c.useNextFrame(()=>M())};c.useFrame(()=>M()),W.play();let O=c.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,X()}),G=F.watch("openNavigation",()=>{b=!1,W?.pause()}),oe=F.watch("closeNavigation",()=>setTimeout(()=>{b=!0;let{activeRoute:j}=L.get();j===P&&(W?.resume(),c.useFrame(()=>M()))},500));return{destroy:()=>{b=!1,O(),G(),oe(),H.destroy(),W.destroy(),S=null,$=null,N=null,w=[]},play:()=>{W.stop(),W.play()},playReverse:()=>{W.stop(),W.playReverse()},playUseCurrent:()=>W.play({useCurrent:!0}),playReverseUseCurrent:()=>W.playReverse({useCurrent:!0}),playFromLabel:()=>{W.stop(),W.playFrom("mylabel")},plaFromLabelReverse:()=>{W.stop(),W.playFromReverse("mylabel")},stop:()=>W.stop(),pause:()=>W.pause(),resume:()=>W.resume(),reverse:()=>W.reverse(),setRotation:j=>C=j}};function xb({buttons:e}){return Object.entries(e).map(([t,r])=>{let{label:o}=r;return g` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn ${t}"
                >
                    ${o}
                </button>
            </li>`}).join("")}var rd=({onMount:e,html:t,getState:r,staticProps:o})=>{let{buttons:s,rotationDefault:n}=r();e(({element:p,refs:u})=>{if(te.mq("max","desktop"))return;let{canvas:m,rangeValue:d,rotationButton:f}=u,x=td({canvas:m,...r()}),{destroy:b,setRotation:S}=x;return Object.entries(s).forEach(([w,C])=>{let{method:P}=C;p.querySelector(`.${w}`).addEventListener("click",()=>x?.[P]())}),f.addEventListener("change",()=>{let w=f.value;S(w),d.textContent=w}),()=>{b()}});let{caterpillarN2:i}=ye(),{source:a}=i,l=ne()?"c-canvas__wrap--wrapped":"";return t`
        <div>
            <only-desktop></only-desktop>
            <code-button
                ${o({drawers:[{label:"description",source:a.description},{label:"definition",source:a.definition},{label:"component",source:a.component},{label:"animation",source:a.animation}],style:"legend"})}
            >
            </code-button>
            <div class="c-canvas">
                <ul class="c-canvas__controls">
                    ${xb({buttons:s})}
                    <li class="c-canvas__controls__item">
                        <label class="c-canvas__controls__label">
                            change rotation:
                            <span class="js-range-value" ref="rangeValue"
                                >${n}</span
                            >
                        </label>
                        <div class="c-canvas__controls__range">
                            <input
                                type="range"
                                min="0"
                                max="720"
                                value="${n}"
                                step="1"
                                ref="rotationButton"
                            />
                        </div>
                    </li>
                </ul>
                <div class="c-canvas__wrap ${l}">
                    <canvas ref="canvas"></canvas>
                </div>
            </div>
        </div>
    `};var wb=10,Cb={"js-CN2-play":{label:"play",method:"play"},"js-CN2-playReverse":{label:"play reverse",method:"playReverse"},"js-CN2-play-current":{label:"go forward if is backward",method:"playUseCurrent"},"js-CN2-playReverse-current":{label:"go backward if is forward",method:"playReverseUseCurrent"},"js-CN2-play-label":{label:"play from label",method:"playFromLabel"},"js-CN2-playReverse-label":{label:"play from label reverse",method:"plaFromLabelReverse"},"js-CN2-reverse":{label:"reverse",method:"reverse"},"js-CN2-stop":{label:"stop",method:"stop"},"js-CN2-pause":{label:"pause",method:"pause"},"js-CN2-resume":{label:"resume",method:"resume"}},Ib=E({name:"caterpillar-n2",component:rd,isolateCreation:!0,isolateOnMount:!0,exportState:["numItems","width","height","radius","fill","opacity","xAmplitude","yAmplitude","duration","rotationDefault","friction","disableOffcanvas"],state:{numItems:ne()?20:30,width:80,height:80,radius:0,fill:[2,10],opacity:.02,xAmplitude:500,yAmplitude:400,duration:10,rotationDefault:360,friction:wb/2/Math.PI,disableOffcanvas:!!(We()||ne()),buttons:()=>({value:Cb,type:"Any"})}});var od=`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Generator: Gravit.io -->

<svg
   style="isolation:isolate"
   viewBox="0 0 258.50191 139.49488"
   width="258.50192pt"
   height="139.49487pt"
   version="1.1"
   id="svg314"
   sodipodi:docname="logo2.svg"
   inkscape:version="1.1.1 (3bf5ae0d25, 2021-09-20)"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <sodipodi:namedview
     id="namedview316"
     pagecolor="#ffffff"
     bordercolor="#666666"
     borderopacity="1.0"
     inkscape:pageshadow="2"
     inkscape:pageopacity="0.0"
     inkscape:pagecheckerboard="0"
     inkscape:document-units="pt"
     showgrid="false"
     inkscape:zoom="2.8284271"
     inkscape:cx="179.7819"
     inkscape:cy="112.42998"
     inkscape:window-width="1920"
     inkscape:window-height="1011"
     inkscape:window-x="0"
     inkscape:window-y="0"
     inkscape:window-maximized="1"
     inkscape:current-layer="block10" />
  <defs
     id="defs195">
    <clipPath
       id="_clipPath_VL4lQNFTekCiBlrKs3lIcRmLPUe8LF3L">
      <rect
         width="257.70001"
         height="131.14999"
         id="rect192"
         x="0"
         y="0" />
    </clipPath>
  </defs>
  <g
     inkscape:groupmode="layer"
     id="layer1"
     inkscape:label="background"
     style="display:none"
     transform="translate(0.80192417,0.34883055)"
     sodipodi:insensitive="true">
    <rect
       style="fill:#a0a0b1;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:0.775327"
       id="rect421"
       width="258.50269"
       height="140.24139"
       x="-0.80192417"
       y="-0.34883055" />
  </g>
  <g
     clip-path="url(#_clipPath_VL4lQNFTekCiBlrKs3lIcRmLPUe8LF3L)"
     id="g312"
     transform="translate(0.80192417,0.34883055)">
    <clipPath
       id="_clipPath_2R05YMjZbD0UgsZZwA9G1NSyA91KCKEh">
      <rect
         x="0"
         y="0"
         width="257.70001"
         height="131.14999"
         fill="#ffffff"
         id="rect199" />
    </clipPath>
    <g
       clip-path="url(#_clipPath_2R05YMjZbD0UgsZZwA9G1NSyA91KCKEh)"
       id="g294">
      <g
         id="g292">
        <g
           id="g274">
          <g
             id="g272">
            <g
               id="g206" />
            <g
               id="g214" />
            <g
               id="g228" />
            <g
               id="g234" />
            <g
               id="g240" />
            <g
               id="g246" />
            <g
               id="g252" />
            <g
               id="g258" />
            <g
               id="g264" />
            <g
               id="g270" />
          </g>
        </g>
      </g>
    </g>
  </g>
  <g
     inkscape:groupmode="layer"
     id="block4"
     inkscape:label="green right c"
     style="display:inline"
     transform="translate(0.80192417,0.34883055)"
     sodipodi:insensitive="true"
     ref="block1">
    <path
       d="m 226.941,40.239 -0.675,37.949 2.425,-3.449 q 0.25,-0.437 0.187,-0.937 -0.062,-0.5 -1.937,-33.563 z"
       fill="#000000"
       id="path260"
       style="display:inline;isolation:isolate" />
    <path
       d="M 227.003,40.227 V 75.88 l 2,-2 7,-33.653 z"
       fill="#9ece6a"
       id="path262"
       style="display:inline;isolation:isolate" />
  </g>
  <g
     inkscape:groupmode="layer"
     id="block3"
     inkscape:label="green right b"
     style="display:inline"
     transform="translate(0.80192417,0.34883055)"
     sodipodi:insensitive="true"
     ref="block2">
    <path
       d="m 215.972,40.27 -0.281,1.032 7.059,42.932 2.222,-6.839 -0.188,-1.031 z"
       fill="#000000"
       id="path254"
       style="display:inline;isolation:isolate" />
    <path
       d="m 216.003,40.227 7,40.653 2,-4 V 40.227 Z"
       fill="#9ece6a"
       id="path256"
       style="display:inline;isolation:isolate" />
  </g>
  <g
     inkscape:groupmode="layer"
     id="block2"
     inkscape:label="green right a"
     style="display:inline"
     transform="translate(0.80192417,0.34883055)"
     sodipodi:insensitive="true"
     ref="block3">
    <path
       d="m 204.253,40.114 -0.125,1.438 q 15.505,46.697 15.669,47.182 l 2.081,-5.245 v -1.375 z"
       fill="#000000"
       id="path248"
       style="display:inline;isolation:isolate" />
    <path
       d="m 204.003,39.88 16,46.154 2,-3.654 -9,-42.5 z"
       fill="#9ece6a"
       id="path250"
       style="display:inline;isolation:isolate" />
  </g>
  <g
     inkscape:groupmode="layer"
     id="block1"
     inkscape:label="green right"
     style="display:inline"
     transform="translate(0.80192417,0.34883055)"
     sodipodi:insensitive="true"
     ref="block4">
    <path
       d="M 146.46212,93.889417 178.003,75.38 v -6 l -5,2 1,-6 21,-31 c 3.38867,2.111333 5.05533,3.444667 5,4 -0.018,0.182667 5.982,16.67 18,49.462 l -2,3.538 -6,-3.846 -66.747,14.73873 z"
       fill="#9ece6a"
       id="path202"
       style="isolation:isolate"
       sodipodi:nodetypes="cccccccccccc" />
    <path
       d="m 143.256,102.27273 0.52664,1.61634 66.34536,-15.27507 5.75,2.625 -5.625,-3.75 c -22.33127,4.933316 -66.997,14.78373 -66.997,14.78373 z"
       fill="#000000"
       id="path204"
       style="isolation:isolate"
       sodipodi:nodetypes="cccccc" />
    <path
       d="m 169.825,75.638 q -10.737,6.278 -10.831,6.278 0.153,0.014 0.305,0.029 c 19.312,1.818 28.926,2.716 28.843,2.693 z"
       fill="#8ab55d"
       id="path266"
       style="isolation:isolate" />
    <path
       d="m 159.025,81.912 0.772,1.719 3.644,0.258 2.262,-1.336 z"
       fill="#000000"
       id="path288"
       style="isolation:isolate" />
    <path
       d="m 173,71.381 1.063,1.532 3.937,-1.61 0.063,-2.078 z"
       fill="#080000"
       id="path290"
       style="isolation:isolate" />
  </g>
  <g
     inkscape:groupmode="layer"
     id="block8"
     inkscape:label="green left c"
     style="display:inline"
     transform="translate(0.80192417,0.34883055)"
     sodipodi:insensitive="true"
     ref="block5">
    <path
       d="m 56.55,124.505 3.078,1.734 7.75,-2.906 15.82,-31.078 -0.257,-2.297 z"
       fill="#000000"
       id="path230"
       style="display:inline;isolation:isolate" />
    <path
       d="m 83.003,89.88 -16.5,31.539 -10,3 23.5,-33.539 z"
       fill="#9ece6a"
       id="path232"
       style="display:inline;isolation:isolate" />
  </g>
  <g
     inkscape:groupmode="layer"
     id="block7"
     inkscape:label="green left b"
     style="display:inline"
     transform="translate(0.80192417,0.34883055)"
     sodipodi:insensitive="true"
     ref="block6">
    <path
       d="m 68.081,120.848 1.36,2.016 9.046,-3.141 0.808,-2.276 9.692,-27.302 -0.093,-2.203 z"
       fill="#000000"
       id="path242"
       style="display:inline;isolation:isolate" />
    <path
       d="m 89.003,87.842 -11,30.038 -10,3 16.32,-31.438 z"
       fill="#9ece6a"
       id="path244"
       style="display:inline;isolation:isolate" />
  </g>
  <g
     inkscape:groupmode="layer"
     id="block6"
     inkscape:label="green left a"
     style="display:inline"
     transform="translate(0.80192417,0.34883055)"
     sodipodi:insensitive="true"
     ref="block7">
    <path
       d="m 79.191,117.567 0.75,1.922 8.906,-3.141 5.156,-28.218 0.047,-1.688 z"
       fill="#000000"
       id="path236"
       style="display:inline;isolation:isolate" />
    <path
       d="m 94.003,86.38 -5.437,28.234 -9.422,2.953 10.859,-30.033 z"
       fill="#9ece6a"
       id="path238"
       style="display:inline;isolation:isolate" />
  </g>
  <g
     inkscape:groupmode="layer"
     id="block5"
     inkscape:label="green left"
     style="display:inline"
     transform="translate(0.80192417,0.34883055)"
     sodipodi:insensitive="true"
     ref="block8">
    <path
       d="M 91.089733,59.564906 120.93928,78.788936 107.99979,107.81712 90.795969,114.07214 96.003,86.38 l 6,-4 -15.779206,-22.760093 z"
       fill="#9ece6a"
       id="path218"
       style="isolation:isolate"
       sodipodi:nodetypes="cccccccc" />
    <path
       d="m 90.795969,114.07214 0.460815,1.54784 17.425356,-6.58819 -0.68235,-1.21467 z"
       fill="#0f0000"
       id="path222"
       style="isolation:isolate"
       sodipodi:nodetypes="ccccc" />
    <path
       d="M 86.223794,59.619907 102.054,82.45 101.43222,82.787669 86.552529,60.731257 Z"
       fill="#000000"
       id="path224"
       style="isolation:isolate"
       sodipodi:nodetypes="ccccc" />
    <path
       style="fill:#0f0000;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 107.99979,107.81712 c 0,0 12.93949,-29.028186 12.93949,-29.028186 l 0.0463,1.038075 -12.30341,29.204781 z"
       id="path17874" />
  </g>
  <g
     inkscape:groupmode="layer"
     id="block9"
     inkscape:label="M-left"
     style="display:inline"
     transform="translate(0.80192417,0.34883055)"
     sodipodi:insensitive="true"
     ref="M_left">
    <path
       d="m 132.60144,68.324268 1.19925,0.711139 L 86.77,78.08 63.36,108.95 70.927966,113.93207 -0.29,131.63 -0.08,87.41 6.4,84.87 l 4.45,3.17 51.11,-15.63 4.47,4.92 59.97,-11.32 7.33,-20.11 7.73,-6.53 -7.65931,29.665407 -1.19925,-0.711139 L 140.35,41.63 134.58,46.49 127.15,66.88 66.07,78.42 61.65,73.56 10.67,89.14 6.26,85.99 0.92,88.09 0.71,130.35 68.424083,113.58302 61.94,109.16 86.2,77.17 Z"
       fill="#ffffff"
       id="path308"
       style="isolation:isolate"
       sodipodi:nodetypes="ccccccccccccccccccccccccccccc" />
    <path
       style="display:inline;isolation:isolate;fill:#658a3f;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m -0.29,131.63 12.442143,4.078 73.471952,-12.47364 -14.696129,-9.30229 z"
       id="path24700"
       sodipodi:nodetypes="ccccc" />
    <path
       style="display:inline;isolation:isolate;fill:#3c5c1d;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:0.971079"
       d="M 74.117472,116.07143 88.55736,82.292835 86.769998,78.080002 63.36,108.95 Z"
       id="path25252"
       sodipodi:nodetypes="ccccc" />
    <path
       style="display:inline;isolation:isolate;fill:#658a3f;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 88.55736,82.292835 44.89722,-11.478017 0.34611,-1.779411 -47.030692,9.044595 z"
       id="path25254"
       sodipodi:nodetypes="ccccc" />
    <path
       style="display:inline;isolation:isolate;fill:#3c5c1d;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 142.26193,39.718831 1.5687,2.320079 -9.57413,29.124739 0.34611,-1.779411 z"
       id="path102660"
       sodipodi:nodetypes="ccccc"
       transform="translate(-0.80192417,-0.34883055)" />
    <path
       style="fill:#2a2c41;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 127.15,66.88 7.43,-20.39 5.77,-4.86 -7.74856,26.694268 -46.401437,8.845731 -5.060032,6.590303 -6.816415,1.888909 -5.449455,-3.431757 -6.460677,0.628969 L 58.64704,74.517854 61.65,73.56 l 4.42,4.86 17.015736,-3.221712 z"
       id="path14922"
       sodipodi:nodetypes="cccccccccccccc" />
    <path
       style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 58.64704,74.517854 3.766384,8.328565 6.460677,-0.628965 5.449457,3.43176 6.816413,-1.888912 -1.283484,1.837883 -5.486064,1.484941 -5.426177,-3.683604 -6.565477,0.34834 z"
       id="path16710"
       sodipodi:nodetypes="cccccccccc" />
  </g>
  <g
     inkscape:groupmode="layer"
     id="block10"
     inkscape:label="M-right"
     style="display:inline"
     transform="translate(0.80192417,0.34883055)"
     sodipodi:insensitive="true"
     ref="M_right">
    <path
       d="m 147.516,80.156 47.487,45.724 -2,4 h 62 l -57,-49 -3,3 v 4.154 l -33,-16.154 20,-59 v -7 L 165.688,36.5 165.25,35.25 183,1.85 V 13.04 L 163.23,71.37 194,86.43 v -2.96 l 3.95,-3.95 20.873,17.942 38.877,33.418 h -66.31 l 2.41,-4.82 -46.706,-44.779 z"
       fill="#ffffff"
       id="path208"
       style="isolation:isolate" />
    <path
       d="m 149.122,77.19 -2.356,-2.659 18.047,-36.187 -19.407,36.281 3.212,3.488 z"
       fill="#ffffff"
       id="path210"
       style="isolation:isolate" />
    <path
       d="m 133.43,104.198 1.589,-0.318 16.54,-31.698 -15.873,32.588 -2.878,0.575 z"
       fill="#ffffff"
       id="path278"
       style="isolation:isolate" />
    <path
       d="M 128.37035,79.348672 145.452,35.507 155.871,31.039 144.773,69.258 140.17735,79.053435 154.195,33.047 l -8.07,3.578 z"
       fill="#ffffff"
       id="path298"
       style="isolation:isolate"
       sodipodi:nodetypes="cccccccc" />
    <path
       d="m 164.78,65.29 -0.32,-0.38 0.76,-0.65 0.33,0.39 5.8,6.87 0.22,3.76 0.03,0.49 -1,0.06 -0.03,-0.5 -0.2,-3.42 z"
       fill="#ffffff"
       id="path306"
       style="isolation:isolate" />
    <path
       d="m 142,74.125 21.969,-42.437 2.594,6.75 -2.761,-4.846 -23.62465,45.461435 z"
       fill="#ffffff"
       id="path276"
       style="isolation:isolate"
       sodipodi:nodetypes="cccccc" />
    <path
       style="display:inline;isolation:isolate;fill:#3c5c1d;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 183.80192,13.38883 -0.31998,6.28036 -14.19744,48.810436 -3.26258,-3.870795 z"
       id="path94622"
       transform="translate(-0.80192417,-0.34883055)"
       sodipodi:nodetypes="ccccc" />
    <path
       style="display:inline;isolation:isolate;fill:#658a3f;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 258.50192,131.22883 -5.22567,4.25823 -59.06214,4.00781 -2.02218,-8.26604 z"
       id="path68566"
       sodipodi:nodetypes="ccccc"
       transform="translate(-0.80192417,-0.34883055)" />
    <path
       style="display:inline;isolation:isolate;fill:#3c5c1d;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 148.6615,82.384643 45.94042,44.024187 -1.90625,3.83703 -44.46532,-46.934067 z"
       id="path72600"
       sodipodi:nodetypes="ccccc"
       transform="translate(-0.80192417,-0.34883055)" />
    <path
       style="display:inline;isolation:isolate;fill:#3c5c1d;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 156.67292,31.387831 -11.098,38.219 4.60965,-9.545491 7.54395,-23.38092 z"
       id="path68384"
       sodipodi:nodetypes="ccccc"
       transform="translate(-0.80192417,-0.34883055)" />
    <path
       style="display:inline;isolation:isolate;fill:#658a3f;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 108.12793,127.53083 1.57037,3.87664 9.46967,-1.57305 -1.14705,-3.75459 z"
       id="path46914"
       sodipodi:nodetypes="ccccc"
       transform="translate(-0.80192417,-0.34883055)" />
    <path
       style="display:inline;isolation:isolate;fill:#658a3f;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 123.20192,117.45883 1.54995,4.4326 4.59687,-1.46013 -0.57781,-4.84046 z"
       id="path54417"
       sodipodi:nodetypes="ccccc"
       transform="translate(-0.80192417,-0.34883055)" />
    <path
       style="display:inline;isolation:isolate;fill:#3c5c1d;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 128.77093,115.59084 4.95949,-9.92294 0.72197,1.79328 -5.10365,12.97012 z"
       id="path58189"
       sodipodi:nodetypes="ccccc"
       transform="translate(-0.80192417,-0.34883055)" />
    <path
       style="display:inline;isolation:isolate;fill:#658a3f;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 133.73042,105.6679 0.72197,1.79328 2.97545,-0.38407 -0.93992,-1.95829 z"
       id="path62263"
       sodipodi:nodetypes="ccccc"
       transform="translate(-0.80192417,-0.34883055)" />
    <path
       style="display:inline;isolation:isolate;fill:#3c5c1d;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 136.48793,105.11883 11.408,-23.489002 0.76557,0.754815 -11.23366,24.692467 z"
       id="path65322"
       sodipodi:nodetypes="ccccc"
       transform="translate(-0.80192417,-0.34883055)" />
    <path
       style="fill:#2a2c41;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 146.125,36.625 8.07,-3.578 -14.01765,46.006437 -6.55873,3.124498 -22.37032,43.171535 -1.7713,0.22853 z"
       id="path9034"
       sodipodi:nodetypes="ccccccc" />
    <path
       style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 111.2483,125.34947 1.35607,-0.24557 22.00413,-41.706112 4.92465,-2.447944 0.6442,-1.896377 -6.55873,3.1245 z"
       id="path12512"
       sodipodi:nodetypes="ccccccc" />
    <path
       style="fill:#2a2c41;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="M 166.563,38.438 165.688,36.5 182.003,5.88 v 7 l -20,59 27.82452,13.629235 -1.40776,0.299722 -30.07458,-12.03997 -4.26477,-6.369893 -4.4944,1.301645 L 164.813,38.344 146.3228,72.884339 146.3162,67.166374 163.802,33.592 Z"
       id="path22020"
       sodipodi:nodetypes="ccccccccccccccc" />
    <path
       style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 148.28413,71.521199 1.30188,-2.82046 4.4944,-1.301645 4.26477,6.369893 30.07458,12.03997 1.40776,-0.299723 v 0 l -1.5e-4,0.477398 -1.44158,0.458025 -30.66964,-11.722778 -4.4531,-5.257495 z"
       id="path28971"
       sodipodi:nodetypes="cccccccccccc" />
    <path
       style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 146.3162,67.166374 -0.46239,0.867793 0.0431,5.741758 0.42584,-0.891586 z"
       id="path36474"
       sodipodi:nodetypes="ccccc" />
    <path
       style="display:inline;isolation:isolate;fill:#3c5c1d;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 119.16797,129.83442 4.9773,-9.52463 -0.94335,-2.85096 -0.0923,0.01 9.33888,-19.181722 -14.42759,27.793022 z"
       id="path51124"
       sodipodi:nodetypes="ccccccc"
       transform="translate(-0.80192417,-0.34883055)" />
    <path
       d="m 140.484,90.211 -12.515,25.031 -5.569,1.868 10.13564,-20.940641 v 0 L 124.219,115.172 l 3.328,-1.125 z"
       fill="#ffffff"
       id="path296"
       style="isolation:isolate"
       sodipodi:nodetypes="cccccccc" />
    <path
       d="m 132.53564,96.169359 v 0 L 126.46896,109.01183 117.219,125.731 107.326,127.182 132.60144,68.324268 146.125,36.625 l -36.648,88.953 7.171,-1.055 z"
       fill="#ffffff"
       id="path300"
       style="isolation:isolate"
       sodipodi:nodetypes="cccccccccc" />
    <path
       style="color:#000000;fill:#ffffff;-inkscape-stroke:none"
       d="m 133.21875,67.802734 -0.69922,0.15625 -12.66797,2.826172 0.91797,11.494141 3.99414,3.30664 0.85356,0.663188 z m -1.23438,1.042969 -6.61132,16.273438 -0.13086,-0.109375 -3.75,-3.105469 L 120.65234,71.375 Z"
       id="path23708"
       sodipodi:nodetypes="ccccccccccccc" />
    <path
       style="fill:#2a2c41;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 131.98437,68.845703 c -0.27047,0 -11.33203,2.529297 -11.33203,2.529297 l 0.29558,3.960799 5.43467,2.371403 2.27682,-0.648195 z"
       id="path24120"
       sodipodi:nodetypes="cccccc" />
    <path
       style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 120.94792,75.335799 5.43467,2.371403 2.27682,-0.648195 -0.51727,1.205107 -1.78794,0.819675 -5.30456,-2.583075 z"
       id="path32756"
       sodipodi:nodetypes="ccccccc" />
    <path
       style="fill:#658a3f;fill-opacity:1;stroke:none;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 120.76448,82.281693 0.75208,3.713594 2.12823,3.186817 1.41676,-3.362979 z"
       id="path33282"
       sodipodi:nodetypes="ccccc" />
  </g>
</svg>
`;var wi=`<?xml version="1.0" encoding="UTF-8"?>
<!-- Generator: Gravit.io -->
<svg width="284.24pt" height="233.03pt" style="isolation:isolate" inkscape:version="1.1.1 (3bf5ae0d25, 2021-09-20)" sodipodi:docname="piece-arrow.svg" version="1.1" viewBox="0 0 284.24 233.03" xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd">
 <sodipodi:namedview bordercolor="#666666" borderopacity="1.0" inkscape:current-layer="layer7" inkscape:cx="162.01632" inkscape:cy="179.9568" inkscape:document-units="pt" inkscape:pagecheckerboard="0" inkscape:pageopacity="0.0" inkscape:pageshadow="2" inkscape:window-height="1011" inkscape:window-maximized="1" inkscape:window-width="1920" inkscape:window-x="0" inkscape:window-y="0" inkscape:zoom="1.8115459" pagecolor="#ffffff" showgrid="false"/>
 <g inkscape:groupmode="layer" inkscape:label="arrow 1" ref="around" sodipodi:insensitive="true">
  <g style="isolation:isolate">
   <path d="m211.03 87.241-42.935-65.658c-0.194-1.657 6.209-8.036 18.17-9.225q19.63-1.403 36.821 18.292 17.692 22.733 13.584 61.622-2.968 21.509 7.863 25.16l0.509-5.517 8.032-0.505 31.164 34.127-6.421 4.378-39.845-4.648-0.906-7.733 4.397-4.39q-20.026-10.604-14.335-40.928 3.313-29.648-10.952-46.566-13.09-14.289-21.02-7.988-1.506 1.173-2.405 2.79c-4.718 8.494 9.385 25.057 23.908 48.772z"/>
  </g>
 </g>
 <g inkscape:groupmode="layer" inkscape:label="main" ref="around" sodipodi:insensitive="true">
  <path d="m166.44 14.353 78.094 103.08-27.817 85.879-124.74 18.388-91.093-41.101 14-113.5 68-67z" style="isolation:isolate"/>
 </g>
 <g inkscape:groupmode="layer" inkscape:label="piece1" ref="around" sodipodi:insensitive="true">
  <path d="m92.944 223.39 123.56-18.187-2.625 8.25-117.38 12z" style="isolation:isolate"/>
 </g>
 <g inkscape:groupmode="layer" inkscape:label="piece2" ref="around" sodipodi:insensitive="true">
  <path d="m106.56 226.25 106.5-11.505-2.522 6.984-100.99 6.407z" style="isolation:isolate"/>
 </g>
 <g inkscape:groupmode="layer" inkscape:label="piece3" ref="around" sodipodi:insensitive="true">
  <path d="m115.27 229.72 94.158-5.6234-2.513 6.0363-89.099 1.372z" stroke-width=".88056" style="isolation:isolate"/>
 </g>
</svg>
`;var sd=({logoRefs:e,around:t})=>{let r=e.map(p=>{let[u,m]=Object.entries(p)[0];return{key:u,item:m}}),o=re.createTween({data:{opacity:0,scale:.5,x:-10},duration:2e3,ease:"easeOutQuart",stagger:{each:8,from:"end"}}),s=re.createTween({data:{scale:1,x:0},duration:4e3,ease:"easeInOutQuad",stagger:{each:40,from:"end"}}),n=re.createTween({data:{scale:.5,opacity:0},duration:1e3,ease:"easeInOutQuad",stagger:{each:4}}),i=re.createTween({data:{scale:1},duration:4e3,ease:"easeInOutQuad",stagger:{each:20}});r.forEach(({key:p,item:u})=>{s.subscribe(({scale:m,x:d})=>{if(u.style.scale=`${m}`,p!=="M_right"&&p!=="M_left")return;let f=p==="M_right"?-d:d;u.style.translate=`${f}px 0px`})}),r.forEach(({key:p,item:u})=>{o.subscribe(({scale:m,x:d,opacity:f})=>{if(u.style.scale=`${m}`,u.style.opacity=f,p!=="M_right"&&p!=="M_left")return;let x=p==="M_right"?-d:d;u.style.translate=`${x}px 0px`})}),t.forEach(p=>{n.subscribe(({scale:u,opacity:m})=>{p.style.scale=`${u}`,p.style.opacity=m})}),t.forEach(p=>{i.subscribe(({scale:u})=>{p.style.scale=`${u}`})});let a=$e.createAsyncTimeline({repeat:1}).createGroup({waitComplete:!0}).goTo(o,{opacity:1,scale:1,x:0}).goTo(n,{opacity:1,scale:1}).closeGroup(),l=$e.createAsyncTimeline({repeat:-1,yoyo:!0}).createGroup({waitComplete:!1}).goTo(s,{scale:.95,x:.5}).goTo(i,{scale:.95}).closeGroup().createGroup({waitComplete:!1}).goTo(s,{scale:1.05,x:-.5}).goTo(i,{scale:1.05}).closeGroup();return{playIntro:async()=>a.play(),playSvg:()=>l.play(),destroySvg:()=>{s.destroy(),l.destroy(),a.destroy(),n.destroy(),s=null,o=null,i=null,n=null,l=null,a=null}}};var nd=({refs:e})=>{let t=re.createTween({data:{y:100},duration:500,ease:"easeOutCubic",stagger:{each:10}});return e.forEach(r=>{t.subscribe(({y:o})=>{r.style.translate=`0px ${o}%`})}),{playText:()=>t.goTo({y:0}),destroyText:()=>{t.destroy(),t=null}}};var id=({html:e,onMount:t,staticProps:r})=>{t(async({element:n,refs:i})=>{let{textStagger:a,block1:l,block2:p,block3:u,block4:m,block5:d,block6:f,block7:x,block8:b,M_left:S,M_right:w,around:C}=i,{playIntro:P,playSvg:$,destroySvg:N}=sd({element:n,logoRefs:[{block1:l},{block2:p},{block3:u},{block4:m},{block5:d},{block6:f},{block7:x},{block8:b},{M_left:S},{M_right:w}],around:C}),{playText:I,destroyText:D}=nd({refs:a});return I(),await P(),$(),()=>{N(),D()}});let{home:o}=ye(),{source:s}=o;return e`<div>
        <code-button
            ${r({drawers:[{label:"description",source:s.description},{label:"definition",source:s.definition},{label:"component",source:s.component},{label:"Logo animation",source:s.logoAnimation},{label:"text animation",source:s.textAnimation}],style:"legend"})}
        >
        </code-button>
        <div class="l-index__content">
            <a class="l-index__item" href="./#mobCore_overview">
                <div class="l-index__inner-content">
                    <h1 class="l-index__stagger" ref="textStagger">
                        <span>Mob</span>Core
                    </h1>
                </div>
                <div class="l-index__inner-content">
                    <h2 class="l-index__stagger" ref="textStagger">
                        store & window events
                    </h2>
                </div>
            </a>
            <a class="l-index__item" href="./#mobJs_overview">
                <div class="l-index__inner-content">
                    <h1 class="l-index__stagger" ref="textStagger">
                        <span>Mob</span>Js
                    </h1>
                </div>
                <div class="l-index__inner-content">
                    <h2 class="l-index__stagger" ref="textStagger">
                        js component library
                    </h2>
                </div>
            </a>
            <a class="l-index__item" href="./#mobMotion_overview">
                <div class="l-index__inner-content">
                    <h1 class="l-index__stagger" ref="textStagger">
                        <span>Mob</span>Motion
                    </h1>
                </div>
                <div class="l-index__inner-content">
                    <h2 class="l-index__stagger" ref="textStagger">
                        js animation library
                    </h2>
                </div>
            </a>
        </div>

        <div class="l-index__top-left">${wi}</div>
        <div class="l-index__logo">${od}</div>
        <div class="l-index__top-right">${wi}</div>
    </div>`};var Rb=E({name:"home-component",component:id});var Ci=0,Pb=({indicators:e,setState:t})=>[...e].map((r,o)=>qt.createScrollTrigger({item:r,pin:!0,animateAtStart:!1,range:"0.1px",animatePin:!0,dynamicStart:{position:"right",value:()=>window.innerWidth+Ci-rt(r)*(o+1)},dynamicEnd:{position:"right",value:()=>{let s=e.length-(o-2);return window.innerWidth/10*9*s}},onEnter:()=>{t("currentId",-1),t("currentIdFromScroll",o)},onLeaveBack:()=>{t("currentIdFromScroll",o-1)}})),Ab=({pins:e})=>{e.forEach(t=>t.refresh())},_b=({titles:e})=>[...e].map(t=>qt.createParallax({item:t,propierties:"x",reverse:!0,range:9})),ad=({nav:e})=>{e.classList.add("active"),[...document.querySelectorAll(".js-indicator")].forEach(r=>{r.classList.add("active")})},ld=({nav:e})=>{e.classList.remove("active"),[...document.querySelectorAll(".js-indicator")].forEach(r=>{r.classList.remove("active")})},cd=({indicators:e,titles:t,nav:r,animatePin:o,setState:s})=>{let n=Pb({indicators:e,setState:s}),i=_b({titles:t}),a=document.querySelector(".l-navcontainer__side");Ci=rt(a)/2;let l=c.useResize(()=>{Ci=rt(a)/2}),p=new Eo({root:".js-root",container:".js-container",row:".js-row",column:".js-column",trigger:".js-trigger",shadowClass:".shadowClass",useWillChange:!0,useDrag:!0,useSticky:!o,animateAtStart:!1,ease:!0,addCss:!0,columnHeight:70,columnWidth:100,columnAlign:"center",pin:o,animatePin:o,breakpoint:"tablet",children:[...n,...i],onEnter:()=>{ad({nav:r,indicators:e})},onEnterBack:()=>{Ab({pins:n}),ad({nav:r,indicators:e})},onLeave:()=>{ld({nav:r,indicators:e})},onLeaveBack:()=>{ld({nav:r,indicators:e})}});return p.init(),{destroy:()=>{n.forEach(u=>{u?.destroy()}),n=[],i.forEach(u=>{u?.destroy()}),i=[],p.destroy(),p=null,l()},refresh:()=>p.refresh()}};var Ob=({numOfCol:e,pinIsVisible:t,staticProps:r})=>{let o=t?"":"hidden";return[...new Array(e).keys()].map((s,n)=>g`
                <horizontal-scroller-section
                    ${r({id:n,pinClass:o})}
                ></horizontal-scroller-section>
            `).join("")},Nb=({numOfCol:e,setState:t,bindProps:r,staticProps:o,delegateEvents:s})=>[...new Array(e).keys()].map((n,i)=>g`
                <horizontal-scroller-button
                    ${o({id:i})}
                    ${s({click:()=>t("currentId",i)})}
                    ${r({bind:["currentId","currentIdFromScroll"],props:({currentId:a,currentIdFromScroll:l})=>({active:a===i||l===i})})}
                ></horizontal-scroller-button>
            `).join(""),ud=({onMount:e,html:t,getState:r,setState:o,watch:s,staticProps:n,bindProps:i,delegateEvents:a})=>{let{animatePin:l}=r();e(({element:m})=>{if(te.mq("max","desktop"))return;let d=m.querySelectorAll(".js-indicator"),f=m.querySelector(".js-nav"),x=m.querySelectorAll(".js-title h1"),{destroy:b}=cd({indicators:d,titles:x,nav:f,...r(),setState:o});return window.scrollTo(0,0),s("currentId",S=>{if(S===-1)return;let w=m.querySelector(`.shadowClass--section-${S} .shadowClass--in-center`),{top:C}=se(w),P=ve(w),$=Number.parseInt(S)===0?window.innerHeight+1:C+P-window.innerHeight;Pt.to($,{duration:2e3})}),()=>{b()}});let{horizontalScroller:p}=ye(),{source:u}=p;return te.mq("max","desktop")?t`<div><only-desktop></only-desktop></div>`:t`<div class="l-h-scroller">
        <only-desktop></only-desktop>
        <div class="l-h-scroller__top">scroll down</div>
        <code-button
            ${n({drawers:[{label:"description",source:u.description},{label:"definition",source:u.definition},{label:"scroller",source:u.scroller},{label:"section",source:u.section},{label:"buttons",source:u.buttons},{label:"animation",source:u.animation}],style:"legend"})}
        >
        </code-button>
        <ul class="l-h-scroller__nav js-nav">
            ${Nb({numOfCol:10,setState:o,bindProps:i,staticProps:n,delegateEvents:a})}
        </ul>
        <div class="l-h-scroller__root js-root">
            <div class="l-h-scroller__container js-container">
                <div class="l-h-scroller__row js-row">
                    ${Ob({numOfCol:10,pinIsVisible:!l,staticProps:n})}
                    <section
                        class="l-h-scroller__fakeColumn js-column"
                    ></section>
                </div>
                <div class="l-h-scroller__trigger js-trigger"></div>
            </div>
        </div>
        <div class="l-h-scroller__bottom">scroll up</div>
    </div>`};var Mb=E({name:"horizontal-scroller",component:ud,isolateOnMount:!0,isolateCreation:!0,exportState:["currentId","currentIdFromScroll","animatePin"],state:{currentId:()=>({value:0,type:Number}),currentIdFromScroll:()=>({value:0,type:Number}),animatePin:()=>({value:!1,type:Boolean})}});var pd=({getState:e,watch:t,html:r,onMount:o})=>{let{id:s}=e();return o(({element:n})=>{let i=n.querySelector(".js-nav-button");return t("active",a=>{i.classList.toggle("active",a)}),()=>{}}),r`
        <li>
            <button
                type="button"
                data-id="${s}"
                class="l-h-scroller__nav__btn js-nav-button"
            >
                ${s}
            </button>
        </li>
    `};var Lb=E({name:"horizontal-scroller-button",component:pd,exportState:["id","active"],state:{id:()=>({value:-1,type:Number}),active:()=>({value:!1,type:Boolean})}});var hd=({html:e,getState:t})=>{let{id:r,pinClass:o}=t();return e`
        <section
            class="l-h-scroller__column js-column"
            data-shadow="section-${r}"
        >
            <div class="l-h-scroller__wrap">
                <span class="l-h-scroller__indicator js-indicator ${o}">
                    <span></span>
                </span>
                <div class="l-h-scroller__title js-title">
                    <h1>${r}</h1>
                </div>
            </div>
        </section>
    `};var Fb=E({name:"horizontal-scroller-section",component:hd,exportState:["id","pinClass"],state:{id:()=>({id:-1,type:Number}),pinClass:()=>({id:"",type:String})}});var dd=({canvas:e,canvasScroller:t,numberOfRow:r,numberOfColumn:o,cellWidth:s,cellHeight:n,gutter:i,fill:a,stagger:l,reorder:p,disableOffcanvas:u})=>{let{useOffscreen:m,context:d}=je({disableOffcanvas:u}),f=!0,x=[],b=[],S=re.createMasterSequencer(),w=e.getContext(d,{alpha:!1}),C="#000",P="#fff",{activeRoute:$}=L.get(),{offscreen:N,offScreenCtx:I}=Be({useOffscreen:m,canvas:e}),D=m?I:w,H=bt(D);D=null,e.width=e.clientWidth,e.height=e.clientHeight,x=Kr({canvas:e,numberOfRow:r,numberOfColumn:o,cellWidth:s,cellHeight:n,gutter:i}).items,b=p?x.map((y,v)=>({...y,scale:0,rotate:0,hasFill:a.includes(v)})).sort(y=>y.hasFill?-1:1):x.map((y,v)=>({...y,scale:0,rotate:0,hasFill:a.includes(v)}));let W=re.createStaggers({items:b,stagger:l}),X=W.map(({item:y,start:v,end:k})=>{let R=y.hasFill?1.1:1,V=re.createSequencer({data:{scale:0}}).goTo({scale:R},{start:v,end:k,ease:"easeOutBack"}),q=V.subscribe(({scale:K})=>{y.scale=K});return S.add(V),{sequencer:V,unsubscribe:q}}),M=()=>{if(!w)return;m&&(N.width=e.width,N.height=e.height);let y=m?I:w;y.fillStyle="#1a1b26",y.fillRect(0,0,e.width,e.height),b.forEach(({x:v,y:k,centerX:R,centerY:V,width:q,height:K,rotate:Ce,scale:ie,hasFill:he,offsetXCenter:_e,offsetYCenter:Me})=>{let Oe=Math.PI/180*Ce,qe=Math.cos(Oe)*ie,Ge=Math.sin(Oe)*ie;y.setTransform(qe,Ge,-Ge,qe,Math.round(R+_e),Math.round(V+Me)),qh(y,Math.round(-R+v),Math.round(-V+k),q,K,5),H?(y.beginPath(),y.roundRect(Math.round(-R+v),Math.round(-V+k),q,K,5)):(y.beginPath(),y.rect(Math.round(-R+v),Math.round(-V+k),q,K)),y.fillStyle=he?P:C,y.fill(),y.setTransform(1,0,0,1,0,0)}),ze({useOffscreen:m,offscreen:N,ctx:w})},O=qt.createScrollTrigger({trigger:t,propierties:"tween",tween:S,dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>ve(t)},ease:!0,easeType:"lerp"});O.init();let G=()=>{M(),f&&c.useNextFrame(()=>G())};c.useFrame(({time:y})=>{G({time:y})});let oe=c.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,b.forEach(y=>{let{width:v,height:k,gutter:R,numberOfColumn:V}=y;y.offsetXCenter=ur({canvasWidth:e.width,width:v,gutter:R,numberOfColumn:V}),y.offsetYCenter=pr({canvasHeight:e.height,height:k,gutter:R,numberOfRow:r})}),c.useFrame(()=>M())}),j=F.watch("openNavigation",()=>{f=!1}),A=F.watch("closeNavigation",()=>setTimeout(async()=>{f=!0;let{activeRoute:y}=L.get();y===$&&c.useFrame(()=>G())},500));return()=>{oe(),A(),j(),X.forEach(({sequencer:y,unsubscribe:v})=>{y.destroy(),v()}),X=[],S.destroy(),S=null,W=[],O.destroy(),O=null,w=null,N=null,I=null,x=[],b=[],f=!1}};var md=({onMount:e,html:t,getState:r,staticProps:o})=>{e(({refs:i})=>{if(te.mq("max","desktop"))return;let{canvas:a,canvasScroller:l}=i;window.scrollTo(0,0);let p=dd({canvas:a,canvasScroller:l,...r()});return()=>{p()}});let{scrollerN0:s}=ye(),{source:n}=s;return te.mq("max","desktop")?t`<div><only-desktop></only-desktop></div>`:t`
        <div>
            <only-desktop></only-desktop>
            <div class="c-canvas c-canvas--fixed ">
                <code-button
                    ${o({drawers:[{label:"description",source:n.description},{label:"definition",source:n.definition},{label:"component",source:n.component},{label:"animation",source:n.animation}],style:"legend"})}
                >
                </code-button>
                <div class="c-canvas__wrap">
                    <canvas ref="canvas"></canvas>
                </div>
            </div>
            <div class="canvas-scroller" ref="canvasScroller"></div>
            <div class="canvas-scroller-title">
                <h1>Scroll down</h1>
            </div>
        </div>
    `};var Vb=E({name:"scroller-n0",component:md,isolateOnMount:!0,isolateCreation:!0,exportState:["numberOfRow","numberOfColumn","cellWidth","cellHeight","gutter","fill","stagger","reorder","disableOffcanvas"],state:{numberOfRow:()=>({value:10,type:Number}),numberOfColumn:()=>({value:10,type:Number}),cellWidth:()=>({value:65,type:Number}),cellHeight:()=>({value:65,type:Number}),gutter:()=>({value:1,type:Number}),fill:()=>({value:[36,37,38,39,40,47,51,58,62,69,73,80,81,82,83,84],type:Array}),stagger:()=>({value:{type:"equal",each:6,from:"random"},type:"Any"}),reorder:()=>({value:!0,type:Boolean}),disableOffcanvas:!!(We()||ne())}});function Db({width:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}function $b({height:e,relativeIndex:t,amountOfPath:r}){return Math.sqrt(Math.pow(e*t,2)-Math.pow(e*t/r*t,2))*2}var fd=({canvas:e,canvasScroller:t,amountOfPath:r,width:o,height:s,radius:n,opacity:i,intialRotation:a,endRotation:l,disableOffcanvas:p})=>{let{useOffscreen:u,context:m}=je({disableOffcanvas:p}),d=!0,f=e.getContext(m,{alpha:!1}),x=[],{activeRoute:b}=L.get(),{offscreen:S,offScreenCtx:w}=Be({useOffscreen:u,canvas:e}),C=u?w:f,P=bt(C)&&!ne();C=null,e.width=e.clientWidth,e.height=e.clientHeight,x=[...new Array(r).keys()].map((M,O)=>{let G=O>=r/2?r/2+(r/2-O):O;return{width:Math.floor(Db({width:o,relativeIndex:G,amountOfPath:r})),height:Math.floor($b({height:s,relativeIndex:G,amountOfPath:r})),opacity:G*i,rotate:0,relativeIndex:G,index:O}});let $=re.createScrollerTween({from:{rotate:0},to:{rotate:l},stagger:{each:5,from:"center"}});[...x].forEach(M=>{$.subscribeCache(M,({rotate:O})=>{M.rotate=O})});let N=()=>{if(!f)return;u&&(S.width=e.width,S.height=e.height);let M=u?w:f,O=e.width/2,G=e.height/2;M.fillStyle="#1a1b26",M.fillRect(0,0,e.width,e.height),x.forEach(({width:oe,height:j,opacity:A,rotate:y,index:v})=>{let k=x.length/2-v,R=1,V=Math.PI/180*(y-a),q=Math.cos(V)*R,K=Math.sin(V)*R;M.setTransform(q,K,-K,q,O,G+k*19),P?(M.beginPath(),M.roundRect(-oe/2,-j/2+k*19,oe,j,150)):(M.beginPath(),M.rect(Number.parseInt(-oe/2),Number.parseInt(-j/2),oe,j,n)),M.strokeStyle=`rgba(255, 255, 255, ${A})`,M.fillStyle=`rgba(26, 27, 38, ${A})`,M.stroke(),M.fill(),M.setTransform(1,0,0,1,0,0)}),ze({useOffscreen:u,offscreen:S,ctx:f})},I=qt.createScrollTrigger({trigger:t,propierties:"tween",tween:$,dynamicStart:{position:"bottom",value:()=>window.innerHeight},dynamicEnd:{position:"bottom",value:()=>ve(t)},ease:!0,easeType:"spring"});I.init();let D=({time:M=0})=>{N({time:M}),d&&c.useNextFrame(({time:O})=>D({time:O}))};c.useFrame(({time:M})=>{D({time:M})});let H=c.useResize(()=>{e.width=e.clientWidth,e.height=e.clientHeight,c.useFrame(()=>{N()})}),W=F.watch("openNavigation",()=>{d=!1}),X=F.watch("closeNavigation",()=>{setTimeout(()=>{d=!0;let{activeRoute:M}=L.get();M===b&&c.useFrame(({time:O})=>D({time:O}))},500)});return()=>{$.destroy(),H(),X(),W(),$.destroy(),$=null,I.destroy(),I=null,f=null,S=null,w=null,$=null,x=[],d=!1}};var gd=({onMount:e,html:t,getState:r,staticProps:o})=>{e(({refs:a})=>{if(te.mq("max","desktop"))return;let{canvas:l,canvasScroller:p}=a,u=fd({canvas:l,canvasScroller:p,...r()});return()=>{u()}});let{scrollerN1:s}=ye(),{source:n}=s,i=ne()?"c-canvas__wrap--wrapped":"";return te.mq("max","desktop")?t`<div><only-desktop></only-desktop></div>`:t`
        <div>
            <only-desktop></only-desktop>
            <div class="c-canvas c-canvas--fixed ">
                <code-button
                    ${o({drawers:[{label:"description",source:n.description},{label:"definition",source:n.definition},{label:"component",source:n.component},{label:"animation",source:n.animation}],style:"legend"})}
                >
                </code-button>
                <div class="c-canvas__wrap ${i}">
                    <canvas ref="canvas"></canvas>
                </div>
            </div>
            <div class="canvas-scroller" ref="canvasScroller"></div>
            <div class="canvas-scroller-title">
                <h1>Scroll down</h1>
            </div>
        </div>
    `};var Wb=E({name:"caterpillar-n3",component:gd,isolateOnMount:!0,isolateCreation:!0,exportState:["amountOfPath","width","height","radius","opacity","intialRotation","endRotation","disableOffcanvas"],state:{amountOfPath:17,width:15,height:40,radius:0,opacity:.05,intialRotation:33,endRotation:720,disableOffcanvas:!!(We()||ne())}});var Ys=[{key:"a",label:"A"},{key:"b",label:"B"},{key:"c",label:"C"},{key:"d",label:"D"}],bd=[{key:"f",label:"F"},{key:"b",label:"B"},{key:"e",label:"E"},{key:"c",label:"C"},{key:"a",label:"A"},{key:"g",label:"G"},{key:"h",label:"H"},{key:"d",label:"D"},{key:"b",label:"B"}],yd=[{key:"m",label:"M"},{key:"q",label:"Q"},{key:"z",label:"Z"},{key:"i",label:"I"},{key:"b",label:"B"},{key:"e",label:"E"},{key:"n",label:"N"},{key:"a",label:"A"},{key:"g",label:"G"},{key:"h",label:"H"},{key:"l",label:"L"},{key:"j",label:"J"},{key:"d",label:"D"}],vd=[{key:"h",label:"H"},{key:"f",label:"F"},{key:"a",label:"A"},{key:"d",label:"D"}];var jb=[{buttonLabel:"sample1",data:bd},{buttonLabel:"salmple2",data:yd},{buttonLabel:"sample3",data:vd},{buttonLabel:"Initial",data:Ys}],Bb=[{label:"dynamic list with key",key:"key",clean:!1},{label:"dynamic list without key",key:"",clean:!1},{label:"dynamic list clear",key:"",clean:!0}];function zb({setState:e,staticProps:t,delegateEvents:r,bindProps:o}){return jb.map((s,n)=>{let{data:i,buttonLabel:a}=s;return g`
                <dynamic-list-button
                    ${t({label:a})}
                    ${r({click:()=>{e("data",i),e("activeSample",n)}})}
                    ${o({bind:["activeSample"],props:({activeSample:l})=>({active:n===l})})}
                ></dynamic-list-button>
            `}).join("")}function Hb({bindProps:e,staticProps:t}){return Bb.map((r,o)=>{let{key:s,clean:n,label:i}=r;return g`
                <dynamic-list-repeater
                    ${t({listId:o,key:s,clean:n,label:i})}
                    ${e({bind:["data","counter"],props:({data:a,counter:l})=>({data:a,counter:l})})}
                ></dynamic-list-repeater>
            `}).join("")}var Sd=async({setState:e,html:t,onMount:r,staticProps:o,bindProps:s,delegateEvents:n,watchSync:i})=>{r(({refs:p})=>{let{counterEl:u}=p;i("counter",m=>{u.textContent=m})});let{repeater:a}=ye(),{source:l}=a;return t`
        <dynamic-list class="dynamic-list">
            <div class="dynamic-list__header">
                <div class="dynamic-list__top">
                    ${zb({setState:e,delegateEvents:n,staticProps:o,bindProps:s})}
                    <dynamic-list-button
                        ${o({label:"increase counter"})}
                        ${n({click:()=>{e("counter",p=>p+=1)}})}
                    ></dynamic-list-button>
                </div>
            </div>

            <div class="dynamic-list__counter">
                <h4>List counter</h4>
                <span ref="counterEl"></span>
            </div>

            <div class="dynamic-list__container">
                <div class="dynamic-list__grid">
                    ${Hb({bindProps:s,staticProps:o})}
                </div>
            </div>

            <code-button
                ${o({drawers:[{label:"description",source:l.description},{label:"definition",source:l.definition},{label:"main",source:l.mainComponent},{label:"repeater",source:l.repeaters},{label:"buttons",source:l.buttons},{label:"cards",source:l.cards},{label:"data",source:l.data}],style:"legend"})}
            >
            </code-button>
        </dynamic-list>
    `};var Ub=E({name:"dynamic-list",component:Sd,state:{counter:()=>({value:0,type:Number}),data:()=>({value:Ys,type:Array}),activeSample:()=>({value:3,type:Number})}});function Zr(e,t){return`${e}: ${t}`}var Td=async({getState:e,html:t,onMount:r,key:o,staticProps:s,bindProps:n,watch:i,id:a})=>{let{isFull:l,parentListId:p,index:u,label:m,counter:d}=e();return r(({element:x,refs:b})=>{let{indexEl:S,labelEl:w,counterEl:C}=b;x.addEventListener("click",()=>{x.classList.toggle("is-selected")}),i("index",P=>{S.textContent=Zr("index",P)}),i("label",P=>{w.textContent=Zr("label",P)}),i("counter",P=>{C.textContent=Zr("counter",P)}),c.useFrame(()=>{x.classList.add("active")})}),t`
        <div class="dynamic-card ${l?"is-full":""}">
            <div class="dynamic-card__container">
                <p class="dynamic-card__title">card content</p>
                <div class="id">id: ${a}</div>
                <div class="parentId">list index: ${p}</div>
                <div class="index" ref="indexEl">
                    ${Zr("index",u)}
                </div>
                <div class="label" ref="labelEl">
                    ${Zr("label",m)}
                </div>
                <div class="counter" ref="counterEl">
                    ${Zr("counter",d)}
                </div>
                <div class="key">key: ${o.length>0?o:"no-key"}</div>
                <mobjs-slot name="card-label-slot"></mobjs-slot>
                <mobjs-slot
                    name="card-slot"
                    ${s({staticFromSlot:"static prop from card"})}
                    ${n({bind:["counter","label","index"],props:()=>({parentState:`${JSON.stringify(e(),null,4)}`})})}
                ></mobjs-slot>
                <dynamic-list-empty>
                    <dynamic-list-counter
                        slot="empty-slot"
                        ${s({parentListId:p})}
                        ${n({bind:["counter"],props:({counter:x})=>({counter:x})})}
                    />
                </dynamic-list-empty>
            </div>
        </div>
    `};var qb=E({name:"dynamic-list-card",component:Td,exportState:["isFull","label","index","counter","parentListId"],state:{parentListId:()=>({value:-1,type:Number}),isFull:()=>({value:!1,type:Boolean}),label:()=>({value:"-",type:String}),index:()=>({value:-1,type:Number}),counter:()=>({value:0,type:Number})}});function xd(e){return g`<pre>${e}</pre>`}var wd=({getState:e,html:t,onMount:r,watchSync:o})=>{let{staticFromSlot:s,staticFromComponent:n}=e();return r(({refs:i})=>{let{tEl:a,t2El:l}=i;o("parentParentState",p=>{a.textContent="",a.insertAdjacentHTML("afterbegin",xd(p))}),o("parentState",p=>{l.textContent="",l.insertAdjacentHTML("afterbegin",xd(p))})}),t`
        <div class="dynamic-slot">
            <h3 class="dynamic-slot__label">Component inside slot</h3>
            <div>${s}</div>
            <div>${n}</div>
            <h3 class="dynamic-slot__label">
                Reactive state from parent component scope (dynamicList):
            </h3>
            <div ref="tEl"></div>
            <h3 class="dynamic-slot__label">
                Reactive state from parent slot scope (dynamicCard):
            </h3>
            <div ref="t2El"></div>
        </div>
    `};var Gb=E({name:"dynamic-list-slot",component:wd,exportState:["staticFromSlot","staticFromComponent","parentParentState","parentState"],state:{staticFromSlot:()=>({value:"",type:"any"}),staticFromComponent:()=>({value:"",type:"any"}),parentParentState:()=>({value:"",type:"any"}),parentState:()=>({value:"",type:"any"})}});var Cd=async({html:e})=>e`<div class="dynamic-list-empty">
        <p>empty comp</p>
        <mobjs-slot name="empty-slot"></mobjs-slot>
    </div>`;var Jb=E({name:"dynamic-list-empty",component:Cd});var Id=async({watch:e,onMount:t,html:r,getState:o})=>{let{parentListId:s,counter:n}=o();return t(({refs:i})=>{let{counterValueEl:a}=i;e("counter",l=>{a.textContent=l})}),r`<div class="dynamic-counter">
        <p class="dynamic-counter__title">Nested:</p>
        <p class="dynamic-counter__subtitle">(slotted)</p>
        <p class="dynamic-counter__list">list index: ${s}</p>
        <span ref="counterValueEl">${n}</span>
    </div>`};var Yb=E({name:"dynamic-list-counter",component:Id,exportState:["counter","parentListId"],state:{parentListId:()=>({value:-1,type:Number}),counter:()=>({value:0,type:Number})}});var Ed=({html:e,getState:t,onMount:r,watchSync:o})=>{let{label:s}=t();return r(({element:n})=>{o("active",i=>{n.classList.toggle("active",i)})}),e`
        <button type="button" class="dynamic-list-button">${s}</button>
    `};var Xb=E({name:"dynamic-list-button",component:Ed,exportState:["active","label"],state:{label:()=>({value:"",type:String}),active:()=>({value:!1,type:Boolean})}});function Kb({sync:e,staticProps:t,bindProps:r,listId:o,delegateEvents:s}){return g`
        <dynamic-list-card
            ${t({parentListId:o})}
            ${r({bind:["counter","data"],props:({counter:n,_current:i,_index:a})=>({counter:n,label:i.label,index:a})})}
            ${s({mousedown:(n,{current:i,index:a})=>console.log(i,a)})}
            ${e}
        >
            <dynamic-slotted-label
                slot="card-label-slot"
                ${r({bind:["label"],forceParent:!0,props:({label:n})=>({label:n})})}
            >
            </dynamic-slotted-label>
        </dynamic-list-card>
    `}function Zb(e){return`<strong>Current cards id:</strong> ${e.join(",").replaceAll(","," | ")}`}function Qb({element:e,className:t,childrenId:r}){let o=e.querySelector(t);o.textContent="",o.insertAdjacentHTML("afterbegin",Zb(r))}var kd=({getState:e,html:t,repeat:r,staticProps:o,bindProps:s,delegateEvents:n})=>{let{listId:i,key:a,clean:l,label:p}=e(),u=a.length>0?a:null;return t`
        <div class="dynamic-list-repeater">
            <h4 class="dynamic-list-repeater__title">${p}</h4>
            <p class="dynamic-list-repeater__new js-list"></p>
            <div class="dynamic-list-repeater__list">
                ${r({watch:"data",clean:l,key:u,afterUpdate:({childrenId:m,element:d})=>{Qb({className:".js-list",childrenId:m,element:d})},render:({sync:m})=>Kb({sync:m,staticProps:o,bindProps:s,delegateEvents:n,listId:i})})}
            </div>
        </div>
    `};var ey=E({name:"dynamic-list-repeater",component:kd,exportState:["label","clean","data","listId","key","listId","counter"],state:{data:()=>({value:[],type:Array}),key:()=>({value:"",type:String}),clean:()=>({value:!1,type:Boolean}),listId:()=>({value:-1,type:Number}),counter:()=>({value:-1,type:Number}),label:()=>({value:"",type:String})}});function Rd(e){return`slotted: ${e}`}var Pd=async({html:e,onMount:t,watch:r,getState:o})=>{let{label:s}=o();return t(({refs:n})=>{let{contentEl:i}=n;r("label",a=>{i.textContent=Rd(a)})}),e`<div class="dynamic-list-slotted-label">
        <p class="content" ref="contentEl">${Rd(s)}</p>
    </div>`};var ty=E({name:"dynamic-slotted-label",component:Pd,exportState:["label"],state:{label:()=>({value:void 0,type:"Any"})}});var Ei={};Ri(Ei,{about:()=>fy,animatedPatternN0v1:()=>oy,animatedPatternN0v2:()=>sy,animatedPatternN0v3:()=>ny,animatedPatternN0v4:()=>iy,animatedPatternN0v5:()=>ay,animatedPatternN0v6:()=>ly,animatedPatternN0v7:()=>cy,animatedPatternN1:()=>uy,canvas_overview:()=>vy,caterpillarN0:()=>py,caterpillarN1:()=>hy,caterpillarN2:()=>dy,dynamic_list:()=>Ey,home:()=>my,horizontalScrollerV1:()=>by,horizontalScrollerV2:()=>yy,mobCore_defaults:()=>u0,mobCore_events:()=>l0,mobCore_overview:()=>a0,mobCore_store:()=>c0,mobJs_bindEvents:()=>Ky,mobJs_bindProps:()=>Jy,mobJs_component:()=>Ay,mobJs_computed:()=>Vy,mobJs_debug:()=>s0,mobJs_delegateEvents:()=>Zy,mobJs_emit:()=>Ly,mobJs_emitAsync:()=>Fy,mobJs_freezeProp:()=>zy,mobJs_getChildren:()=>By,mobJs_getParentId:()=>Uy,mobJs_getState:()=>Ny,mobJs_html:()=>_y,mobJs_initialization:()=>Ry,mobJs_instanceName:()=>i0,mobJs_onMount:()=>Oy,mobJs_overview:()=>ky,mobJs_refs:()=>e0,mobJs_remove:()=>Wy,mobJs_removeDom:()=>jy,mobJs_repeat:()=>Qy,mobJs_routing:()=>Py,mobJs_runtime:()=>n0,mobJs_setState:()=>My,mobJs_slot:()=>t0,mobJs_staticProps:()=>Gy,mobJs_syncParent:()=>Xy,mobJs_unBind:()=>Yy,mobJs_unFreezeProp:()=>Hy,mobJs_utils:()=>r0,mobJs_watch:()=>Dy,mobJs_watchParent:()=>qy,mobJs_watchSync:()=>$y,mobJs_web_component:()=>o0,mobMotion_async_timeline:()=>p0,mobMotion_create_stagger:()=>h0,mobMotion_defaults:()=>T0,mobMotion_overview:()=>d0,mobMotion_parallax:()=>m0,mobMotion_plugin:()=>S0,mobMotion_scrolltrigger:()=>f0,mobMotion_sequencer:()=>g0,mobMotion_stagger:()=>b0,mobMotion_sync_timeline:()=>y0,mobMotion_tween_spring_lerp:()=>v0,pageNotFound:()=>ry,plugin_overview:()=>gy,scrollerN0v1:()=>Sy,scrollerN0v2:()=>Ty,scrollerN0v3:()=>xy,scrollerN0v4:()=>wy,scrollerN0v5:()=>Cy,scrollerN1:()=>Iy});var ry=()=>g` <div>page not found</div> `;var oy=()=>g`<div class="l-padding">
        <animatedpattern-n0></animatedpattern-n0>
    </div>`;var sy=()=>g`<div class="l-padding">
        <animatedpattern-n0
            ${T({fill:[0,13,20,45,65,71,72,73,74,75,76,77,83,92,96,113,117,134,138,155,156,157,158,159,189,209],gutter:1,numberOfColumn:20,numberOfRow:10,cellWidth:50,cellHeight:50,stagger:{each:2,from:"random",waitComplete:!1},reorder:!1})}
        ></animatedpattern-n0>
    </div>`;var ny=()=>g`<div class="l-padding">
        <animatedpattern-n0
            ${T({fill:[0,13,20,45,65,71,72,73,74,75,76,77,83,92,96,113,117,134,138,155,156,157,158,159,189,209],gutter:1,numberOfColumn:10,numberOfRow:10,cellWidth:50,cellHeight:50,stagger:{each:10,from:"edges",waitComplete:!1},reorder:!1})}
        ></animatedpattern-n0>
    </div>`;var iy=()=>g`<div class="l-padding">
        <animatedpattern-n0
            ${T({fill:[0,13,20,45,65,71,72,73,74,75,76,77,83,92,96,113,117,134,138,155,156,157,158,159,189,209],gutter:1,numberOfColumn:10,numberOfRow:10,cellWidth:50,cellHeight:50,stagger:{each:5,from:"start",waitComplete:!1},reorder:!1})}
        ></animatedpattern-n0>
    </div>`;var ay=()=>g`<div class="l-padding">
        <animatedpattern-n0
            ${T({fill:[0,13,20,45,65,71,72,73,74,75,76,77,83,92,96,113,117,134,138,155,156,157,158,159,189,209],gutter:1,numberOfColumn:10,numberOfRow:10,cellWidth:50,cellHeight:50,stagger:{each:5,from:"start",grid:{col:11,row:10,direction:"row"},waitComplete:!1},reorder:!1})}
        ></animatedpattern-n0>
    </div>`;var ly=()=>g`<div class="l-padding">
        <animatedpattern-n0
            ${T({fill:[0,13,20,45,65,71,72,73,74,75,76,77,83,92,96,113,117,134,138,155,156,157,158,159,189,209],gutter:1,numberOfColumn:10,numberOfRow:10,cellWidth:50,cellHeight:50,stagger:{each:5,from:"start",grid:{col:11,row:10,direction:"col"},waitComplete:!1},reorder:!1})}
        ></animatedpattern-n0>
    </div>`;var cy=()=>g`<div class="l-padding">
        <animatedpattern-n0
            ${T({fill:[],gutter:1,numberOfColumn:12,numberOfRow:13,cellWidth:50,cellHeight:50,stagger:{each:20,from:{x:6,y:6},grid:{col:13,row:13,direction:"radial"},waitComplete:!1},reorder:!1})}
        ></animatedpattern-n0>
    </div>`;var uy=()=>g`<div class="l-padding">
        <animatedpattern-n1></animatedpattern-n1>
    </div>`;var py=()=>g`<div class="l-padding">
        <caterpillar-n0></caterpillar-n0>
    </div>`;var hy=()=>g`<div class="l-padding">
        <caterpillar-n1></caterpillar-n1>
    </div>`;var dy=()=>g`<div class="l-padding">
        <caterpillar-n2></caterpillar-n2>
    </div>`;var my=()=>g`<div class="l-index">
        <home-component></home-component>
    </div>`;var fy=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/about.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >About 
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">About</doc-title>
    </doc-container>`;var gy=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/plugin/overview.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >Plugin 
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Plugin</doc-title>
    </doc-container>`;var by=()=>g`<div>
        <horizontal-scroller></horizontal-scroller>
    </div>`;var yy=()=>g`<div>
        <horizontal-scroller
            ${T({animatePin:!0})}
        ></horizontal-scroller>
    </div>`;var vy=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/canvas/overview.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >Canvas 
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Canvas</doc-title>
    </doc-container>`;var Sy=()=>g`<div>
        <scroller-n0></scroller-n0>
    </div>`;var Ty=()=>g`<div>
        <scroller-n0
            ${T({stagger:{type:"end",each:1,from:{x:0,y:0},grid:{col:11,row:10,direction:"radial"}},reorder:!1})}
        ></scroller-n0>
    </div>`;var xy=()=>g`<div>
        <scroller-n0
            ${T({stagger:{type:"equal",each:7,from:"center",grid:{col:11,row:10,direction:"col"}},reorder:!1})}
        ></scroller-n0>
    </div>`;var wy=()=>g`<div>
        <scroller-n0
            ${T({stagger:{type:"equal",each:3,from:"end",grid:{col:11,row:10,direction:"row"}},reorder:!1})}
        ></scroller-n0>
    </div>`;var Cy=()=>g`<div>
        <scroller-n0
            ${T({stagger:{type:"equal",each:3,from:"end"},reorder:!1})}
        ></scroller-n0>
    </div>`;var Iy=()=>g`<div class="l-padding">
        <caterpillar-n3></caterpillar-n3>
    </div>`;var Ey=()=>g` <dynamic-list> </dynamic-list> `;var ky=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobJs/overview.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >mobjs 
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">mobJs</doc-title>
    </doc-container>`;var Ry=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobJs/initialization.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> / <span>initialization</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Initialization</doc-title>
    </doc-container>`;var Py=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobJs/routing.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> / <span>routing</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">routing</doc-title>
    </doc-container>`;var Ay=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobJs/component.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> / <span>component</span>
        </doc-title-small>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Component</doc-title>
    </doc-container>`;var _y=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobJs/html.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>html</span></doc-title-small
        >
        <links-mobjs
            ${T({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">HTML</doc-title>
    </doc-container>`;var Oy=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobJs/onMount.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>onMount</span></doc-title-small
        >
        <links-mobjs
            ${T({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">onMount</doc-title>
    </doc-container>`;var Ny=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobJs/getState.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>getState</span></doc-title-small
        >
        <links-mobjs
            ${T({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">getState</doc-title>
    </doc-container>`;var My=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobJs/setState.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>setState</span></doc-title-small
        >
        <links-mobjs
            ${T({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">setState</doc-title>
    </doc-container>`;var Ly=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobJs/emit.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>emit</span></doc-title-small
        >
        <links-mobjs
            ${T({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">emit</doc-title>
    </doc-container>`;var Fy=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobJs/emitAsync.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>emitAsync</span></doc-title-small
        >
        <links-mobjs
            ${T({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">emitAsync</doc-title>
    </doc-container>`;var Vy=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobJs/computed.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>computed</span></doc-title-small
        >
        <links-mobjs
            ${T({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">computed</doc-title>
    </doc-container>`;var Dy=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobJs/watch.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>watch</span></doc-title-small
        >
        <links-mobjs
            ${T({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">watch</doc-title>
    </doc-container>`;var $y=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobJs/watchSync.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>watchSync</span></doc-title-small
        >
        <links-mobjs
            ${T({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">watchSync</doc-title>
    </doc-container>`;var Wy=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobJs/remove.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>remove</span></doc-title-small
        >
        <links-mobjs
            ${T({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">remove</doc-title>
    </doc-container>`;var jy=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobJs/removeDom.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>removeDom</span></doc-title-small
        >
        <links-mobjs
            ${T({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">removeDom</doc-title>
    </doc-container>`;var By=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobJs/getChildren.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>getChildren</span></doc-title-small
        >
        <links-mobjs
            ${T({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">getChildren</doc-title>
    </doc-container>`;var zy=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobJs/freezeProp.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>freezeProp</span></doc-title-small
        >
        <links-mobjs
            ${T({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">freezeProp</doc-title>
    </doc-container>`;var Hy=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobJs/unFreezeProp.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>unFreezeProp</span></doc-title-small
        >
        <links-mobjs
            ${T({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">unFreezeProp</doc-title>
    </doc-container>`;var Uy=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobJs/getParentId.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>getParentId</span></doc-title-small
        >
        <links-mobjs
            ${T({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">getParentId</doc-title>
    </doc-container>`;var qy=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobJs/watchParent.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>watchParent</span></doc-title-small
        >
        <links-mobjs
            ${T({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">watchParent</doc-title>
    </doc-container>`;var Gy=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobJs/staticProps.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>staticProps</span></doc-title-small
        >
        <links-mobjs
            ${T({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">staticProps</doc-title>
    </doc-container>`;var Jy=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobJs/bindProps.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>bindProps</span></doc-title-small
        >
        <links-mobjs
            ${T({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">bindProps</doc-title>
    </doc-container>`;var Yy=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobJs/unBind.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>unBind</span></doc-title-small
        >
        <links-mobjs
            ${T({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">unBind</doc-title>
    </doc-container>`;var Xy=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobJs/syncParent.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>syncParent</span></doc-title-small
        >
        <links-mobjs
            ${T({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">syncParent</doc-title>
    </doc-container>`;var Ky=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobJs/bindEvents.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>bindEvents</span></doc-title-small
        >
        <links-mobjs
            ${T({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">bindEvents</doc-title>
    </doc-container>`;var Zy=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobJs/delegateEvents.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>delegateEvents</span></doc-title-small
        >
        <links-mobjs
            ${T({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">delegateEvents</doc-title>
    </doc-container>`;var Qy=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobJs/repeat.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>repeat</span></doc-title-small
        >
        <links-mobjs
            ${T({section:"mobjs"})}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">repeat</doc-title>
    </doc-container>`;var e0=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobJs/refs.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> / <span>refs</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">refs</doc-title>
    </doc-container>`;var t0=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobJs/slot.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> / <span>slot</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">slot</doc-title>
    </doc-container>`;var r0=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobJs/utils.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> / <span>utils</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Utils</doc-title>
    </doc-container>`;var o0=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobJs/webComponent.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> / <span>webComponent</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">WebComponent</doc-title>
    </doc-container>`;var s0=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobJs/debug.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> / <span>debug</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Debug</doc-title>
    </doc-container>`;var n0=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobJs/runtime.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> / <span>runtime</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Runtime</doc-title>
    </doc-container>`;var i0=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobJs/instanceName.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> / <span>instanceName</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">InstanceName</doc-title>
    </doc-container>`;var a0=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobCore/overview.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >mobCore 
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">mobCore</doc-title>
    </doc-container>`;var l0=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobCore/events.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobCore_overview">mobCore</a> / <span>Events</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Events</doc-title>
    </doc-container>`;var c0=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobCore/store.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobCore_overview">mobCore</a> / <span>Store</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Store</doc-title>
    </doc-container>`;var u0=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobCore/defaults.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobCore_overview">mobCore</a> / <span>Defaults</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Defaults</doc-title>
    </doc-container>`;var p0=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobMotion/asyncTimeline.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobMotion_overview">mobMotion</a> /
            <span>Async timeline</span></doc-title-small
        >
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Async timeline</doc-title>
    </doc-container>`;var h0=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobMotion/createStagger.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobMotion_overview">mobMotion</a> /
            <span>CreateStagger</span></doc-title-small
        >
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">CreateStagger</doc-title>
    </doc-container>`;var d0=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobMotion/overview.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >mobMotion 
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">mobMotion</doc-title>
    </doc-container>`;var m0=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobMotion/parallax.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobMotion_overview">mobMotion</a> /
            <span>Parallax</span></doc-title-small
        >
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Parallax</doc-title>
    </doc-container>`;var f0=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobMotion/scrollTrigger.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobMotion_overview">mobMotion</a> /
            <span>ScrollTrigger</span></doc-title-small
        >
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">ScrollTrigger</doc-title>
    </doc-container>`;var g0=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobMotion/sequencer.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobMotion_overview">mobMotion</a> /
            <span>Sequencer</span></doc-title-small
        >
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Sequencer</doc-title>
    </doc-container>`;var b0=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobMotion/stagger.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobMotion_overview">mobMotion</a> /
            <span>Stagger</span></doc-title-small
        >
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Stagger</doc-title>
    </doc-container>`;var y0=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobMotion/syncTimeline.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobMotion_overview">mobMotion</a> /
            <span>Sync timeline</span></doc-title-small
        >
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Sync timeline</doc-title>
    </doc-container>`;var v0=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobMotion/tweenSpringLerp.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobMotion_overview">mobMotion</a> /
            <span>Tween Spring Lerp</span></doc-title-small
        >
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Tweens</doc-title>
    </doc-container>`;var S0=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobMotion/plugin.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobMotion_overview">mobMotion</a> /
            <span>Plugin</span></doc-title-small
        >
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Plugin</doc-title>
    </doc-container>`;var T0=()=>g` <doc-container>
        <html-content
            slot="docs"
            ${T({source:"./data/mobMotion/defaults.json",useMaxWidth:!0})}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobMotion_overview">mobMotion</a> /
            <span>Defaults</span></doc-title-small
        >
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Defaults</doc-title>
    </doc-container>`;var Ad=()=>g`
        <code-overlay name="codeOverlay"></code-overlay>
        <mob-header></mob-header>
        <mob-navigation-container></mob-navigation-container>
        <main class="main">
            <div class="container">
                <div class="inner-wrap">
                    <div id="content"></div>
                </div>
            </div>
        </main>
        <mob-footer>
            <debug-button slot="debug"></debug-button>
        </mob-footer>
        <page-transition name="page-transition"></page-transition>
    `;c.useLoad(()=>{c.store.set("fpsScalePercent",{0:1,50:2,70:3}),te.setDefault({deferredNextTick:!0,useScaleFps:!0,usePassive:!0,mq:{desktop:1024},spring:{config:{customSpring:{friction:1,mass:1,precision:.01,tension:180,velocity:0}}}}),te.printDefault(),(async()=>{let t=document.body.querySelector(".js-main-loader"),r=document.body.querySelector(".js-main-loader-background"),o=re.createTween({data:{opacity:1,scale:1},duration:1e3});t&&r&&[t,r].forEach(s=>{o.subscribe(({opacity:n,scale:i})=>{s.style.opacity=n,s.style.transform=`scale(${i})`})}),await Nh(),En({isolateCreation:!1,isolateOnMount:!1,scoped:!1,maxParseIteration:1e3,debug:!0}),Fn({rootId:"#root",contentId:"#content",wrapper:Ad,components:Ii,pages:Ei,index:"home",pageNotFound:"pageNotFound",afterInit:async()=>{await o.goTo({opacity:0,scale:.9}),t?.remove(),r?.remove(),o=null}})})()});})();
//# sourceMappingURL=main.js.map
